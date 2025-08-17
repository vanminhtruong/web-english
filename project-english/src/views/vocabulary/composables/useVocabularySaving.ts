import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast, POSITION } from 'vue-toastification';
import { useVocabularyStore } from '../../../composables/useVocabularyStore';
import { getCustomTopics } from '../../../utils/topicUtils';
import { useGoogleDriveAuth } from '../../../services/googleDriveAuth';
import { useGoogleDriveApi } from '../../../services/googleDriveApi';

const ConfirmToast = defineAsyncComponent(() => import("../../../components/common/ConfirmToast.vue"));

export function useVocabularySaving() {
  const { t } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();
  const googleAuth = useGoogleDriveAuth();
  const googleDriveApi = useGoogleDriveApi();

  const autoSaveEnabled = ref(true);
  const isSaving = ref(false);
  const lastSaveTime = ref('');
  const saveStatus = ref<'idle' | 'saving' | 'success' | 'error'>('idle');
  const autoSaveFileHandle = ref<any>(null);
  const hasAutoSaveFile = ref<boolean>(false);
  const hasGoogleDriveFile = ref<boolean>(false);
  const storageType = ref<'local' | 'google-drive'>('local');
  const autoSaveFileName = 'vocabulary-auto-backup.json';
  let autoSaveTimer: number | null = null;
  let debounceTimer: number | null = null;

  // Add a new ref to store the file path for debugging
  const autoSaveFilePath = ref<string>('');
  
  // IndexedDB setup for persisting file handles
  const DB_NAME = 'vocabulary-file-handles';
  const DB_VERSION = 1;
  const STORE_NAME = 'file-handles';
  const FILE_HANDLE_KEY = 'auto-save-file-handle';
  
  // IndexedDB operations
  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  };
  
  const saveFileHandleToIDB = async (fileHandle: any): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await new Promise<void>((resolve, reject) => {
        const request = store.put(fileHandle, FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log('File handle saved to IndexedDB');
    } catch (error) {
      console.error('Error saving file handle to IndexedDB:', error);
    }
  };
  
  const loadFileHandleFromIDB = async (): Promise<any | null> => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      return new Promise<any | null>((resolve, reject) => {
        const request = store.get(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    } catch (error) {
      console.error('Error loading file handle from IndexedDB:', error);
      return null;
    }
  };
  
  const clearFileHandleFromIDB = async (): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log('File handle cleared from IndexedDB');
    } catch (error) {
      console.error('Error clearing file handle from IndexedDB:', error);
    }
  };

  const getStoredValue = (key: string, defaultValue: any) => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const setStoredValue = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  autoSaveEnabled.value = getStoredValue('vocabulary-auto-save-enabled', true);
  hasAutoSaveFile.value = getStoredValue('vocabulary-has-auto-save-file', false);
  hasGoogleDriveFile.value = getStoredValue('vocabulary-has-google-drive-file', false);
  storageType.value = getStoredValue('vocabulary-storage-type', 'local');
  lastSaveTime.value = getStoredValue('vocabulary-last-save-time', '');
  
  // Restore file handle from IndexedDB on mount
  const initializeAutoSave = async () => {
    console.log('🔧 Initializing auto-save, hasAutoSaveFile:', hasAutoSaveFile.value);
    
    if (hasAutoSaveFile.value && 'showSaveFilePicker' in window) {
      try {
        console.log('🔍 Attempting to restore file handle from IndexedDB...');
        const savedFileHandle = await loadFileHandleFromIDB();
        
        if (savedFileHandle) {
          console.log('✅ Found saved file handle in IndexedDB');
          // Verify the file handle is still valid
          try {
            const opts = { mode: 'readwrite' as const };
            const permission = await savedFileHandle.queryPermission(opts);
            console.log('🔐 File handle permission:', permission);
            
            if (permission === 'granted' || permission === 'prompt') {
              autoSaveFileHandle.value = savedFileHandle;
              console.log('✅ File handle restored to autoSaveFileHandle');
              
              // Try to get file info for display
              try {
                const fileProps = await savedFileHandle.getFile();
                autoSaveFilePath.value = fileProps.name;
                console.log('📁 File handle restored successfully:', fileProps.name);
                
                // If permission is prompt, request it silently
                if (permission === 'prompt') {
                  console.log('🔄 Requesting permission for file handle...');
                  await savedFileHandle.requestPermission(opts);
                }
              } catch (e) {
                console.log('⚠️ Could not get file properties, but handle seems valid:', e);
              }
            } else {
              console.log('❌ File handle permission denied, clearing stored handle');
              await clearFileHandleFromIDB();
              hasAutoSaveFile.value = false;
              setStoredValue('vocabulary-has-auto-save-file', false);
            }
          } catch (error) {
            console.log('❌ Saved file handle is invalid, clearing:', error);
            await clearFileHandleFromIDB();
            hasAutoSaveFile.value = false;
            setStoredValue('vocabulary-has-auto-save-file', false);
          }
        } else {
          console.log('❌ No file handle found in IndexedDB');
          hasAutoSaveFile.value = false;
          setStoredValue('vocabulary-has-auto-save-file', false);
        }
      } catch (error) {
        console.error('❌ Error initializing auto-save:', error);
        hasAutoSaveFile.value = false;
        setStoredValue('vocabulary-has-auto-save-file', false);
      }
    } else {
      console.log('ℹ️ Auto-save not enabled or File System API not supported');
    }
  };

  const saveToFileSystem = async (data: any) => {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: `vocabulary-backup-${new Date().toISOString().split('T')[0]}.json`,
        types: [{
          description: 'JSON files',
          accept: { 'application/json': ['.json'] }
        }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      autoSaveFileHandle.value = fileHandle;
      hasAutoSaveFile.value = true;
      setStoredValue('vocabulary-has-auto-save-file', true);
      
      // Save file handle to IndexedDB for persistence
      await saveFileHandleToIDB(fileHandle);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        await downloadJsonFile(data);
      }
    }
  };

  const downloadJsonFile = async (data: any) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vocabulary-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getVocabularyData = () => {
    const getGroupTopics = (): Record<string, string> => {
        try {
            const stored = localStorage.getItem('vocabulary-group-topics');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            return {};
        }
    };
    
    // Get vocabulary notes
    const getVocabularyNotes = (): Record<string, string> => {
        try {
            const stored = localStorage.getItem('vocabulary-notes');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            return {};
        }
    };
    
    // Get marked vocabulary words
    const getMarkedWords = (): Record<string, string[]> => {
        try {
            const stored = localStorage.getItem('vocabulary-marked-words');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            return {};
        }
    };
    
    // Helper function to get grammar rules
    const getGrammarRules = (): any[] => {
        try {
            const stored = localStorage.getItem('grammar-rules');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    };
    
    // Helper function to get category name without Vue composables
    const getCategoryName = (categoryKey: string): string => {
      // Check custom topics first
      const customTopics = getCustomTopics()
      const customTopic = customTopics.find(topic => topic.key === categoryKey)
      
      if (customTopic) {
        // Default to English name for export
        return customTopic.en
      }
      
      // Built-in categories mapping
      const builtInCategories: { [key: string]: string } = {
        'technology': 'Technology',
        'business': 'Business',
        'travel': 'Travel',
        'food': 'Food',
        'health': 'Health',
        'education': 'Education',
        'sports': 'Sports',
        'entertainment': 'Entertainment',
        'science': 'Science',
        'art': 'Art',
        'music': 'Music',
        'literature': 'Literature',
        'politics': 'Politics',
        'environment': 'Environment',
        'fashion': 'Fashion',
        'finance': 'Finance'
      }
      
      return builtInCategories[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    }
    
    // Enhance vocabularies with category names
    const enhancedVocabularies = vocabularyStore.allVocabularies.value.map(vocab => ({
        ...vocab,
        categoryName: getCategoryName(vocab.category) // Add category name alongside category key
    }));
    
    return {
        vocabularies: enhancedVocabularies,
        customTopics: vocabularyStore.customTopics.value,
        groupTopics: getGroupTopics(),
        vocabularyNotes: getVocabularyNotes(),
        markedWords: getMarkedWords(),
        grammarRules: getGrammarRules(), // Include grammar rules in export
        accordionState: JSON.parse(localStorage.getItem('vocabulary-accordion-state') || '{}'),
        useGrouping: JSON.parse(localStorage.getItem('vocabulary-use-grouping') || 'false'), // Save grouping state
        exportDate: new Date().toISOString(),
        version: '1.5', // Increment version to indicate grammar rules support
        totalCount: vocabularyStore.totalCount.value
    };
  };

  const manualSave = async () => {
    if (isSaving.value) return;
    isSaving.value = true;
    saveStatus.value = 'saving';
    try {
      const vocabularyData = getVocabularyData();
      if ('showSaveFilePicker' in window) {
        await saveToFileSystem(vocabularyData);
      } else {
        await downloadJsonFile(vocabularyData);
      }
      vocabularyStore.saveToLocalStorage();
      const now = new Date().toLocaleString('vi-VN');
      lastSaveTime.value = now;
      setStoredValue('vocabulary-last-save-time', now);
      saveStatus.value = 'success';
      setTimeout(() => { if (saveStatus.value === 'success') saveStatus.value = 'idle'; }, 2000);
    } catch (error) {
      saveStatus.value = 'error';
      setTimeout(() => { if (saveStatus.value === 'error') saveStatus.value = 'idle'; }, 3000);
    } finally {
      isSaving.value = false;
    }
  };

  const performAutoSave = async () => {
    if (!autoSaveEnabled.value) return;
    try {
      saveStatus.value = 'saving';
      const vocabularyData = getVocabularyData();
      
      // First, save to localStorage
      vocabularyStore.saveToLocalStorage();
      
      // Then, try to save based on storage type
      let saveSuccess = false;
      if (storageType.value === 'google-drive') {
        saveSuccess = await tryAutoSaveToGoogleDrive(vocabularyData);
      } else if (storageType.value === 'local' && hasAutoSaveFile.value) {
        saveSuccess = await tryAutoSaveToFile(vocabularyData);
      } else {
        // For localStorage only, consider it successful
        saveSuccess = true;
      }
      
      // Update timestamps and status based on actual save result
      const now = new Date().toLocaleString('vi-VN');
      lastSaveTime.value = now;
      setStoredValue('vocabulary-last-save-time', now);
      
      if (saveSuccess) {
        saveStatus.value = 'success';
        console.log('⚡ Ultra-fast auto-save completed successfully');
        setTimeout(() => { 
          if (saveStatus.value === 'success') {
            saveStatus.value = 'idle';
          }
        }, 500); // Faster status reset for better UX
      } else {
        saveStatus.value = 'error';
        console.error('❌ Ultra-fast auto-save failed');
        setTimeout(() => { 
          if (saveStatus.value === 'error') {
            saveStatus.value = 'idle';
          }
        }, 1500); // Faster error reset
      }
      
      return saveSuccess;
    } catch (error) {
      console.error("Ultra-fast auto-save error:", error);
      saveStatus.value = 'error';
      setTimeout(() => { 
        if (saveStatus.value === 'error') {
          saveStatus.value = 'idle';
        }
      }, 1500); // Faster error recovery
      return false;
    }
  };

  const tryAutoSaveToFile = async (data: any) => {
    if (!('showSaveFilePicker' in window)) {
      console.log("Browser doesn't support File System Access API");
      return false;
    }
    
    if (!autoSaveFileHandle.value) {
      console.log("No auto-save file handle available");
      return false;
    }
    
    try {
      console.log("Attempting to auto-save to file...", autoSaveFilePath.value);
      
      // Verify the file handle is valid by checking permissions
      const opts = { mode: 'readwrite' as const };
      const permission = await autoSaveFileHandle.value.queryPermission(opts);
      
      if (permission !== 'granted') {
        console.log("Requesting permission to write to file...");
        const newPermission = await autoSaveFileHandle.value.requestPermission(opts);
        if (newPermission !== 'granted') {
          console.error("Permission to write to file denied");
          toast.error(t('vocabulary.save.errors.permissionDenied', 'Permission denied'));
          return false;
        }
      }
      
      // Create a writable stream
      console.log("Creating writable stream...");
      const writable = await autoSaveFileHandle.value.createWritable();
      
      // Convert data to JSON string
      const jsonString = JSON.stringify(data, null, 2);
      console.log(`Writing ${jsonString.length} characters to file...`);
      
      // Write the data
      await writable.write(jsonString);
      
      // Close the stream
      console.log("Closing writable stream...");
      await writable.close();
      
      console.log("Auto-save to file completed successfully:", autoSaveFilePath.value);
      
      // Update last save time after successful file save
      const now = new Date().toLocaleString('vi-VN');
      lastSaveTime.value = now;
      setStoredValue('vocabulary-last-save-time', now);
      
      return true;
    } catch (error) {
      console.error("Error auto-saving to file:", error);
      
      // Check if it's a permission error
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        toast.error(t('vocabulary.save.errors.permissionDenied', 'Permission denied'));
      } else {
        toast.error(t('vocabulary.save.errors.autoSaveFileFailed', 'Auto save file failed'));
      }
      
      // Reset file handle only if it's not a permission error
      if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
        autoSaveFileHandle.value = null;
        hasAutoSaveFile.value = false;
        setStoredValue('vocabulary-has-auto-save-file', false);
        // Clear from IndexedDB as well
        await clearFileHandleFromIDB();
      }
      
      return false;
    }
  };

  // Ultra-fast auto save with different speeds based on storage type
  const debounceAutoSave = (immediate = false) => {
    if (!autoSaveEnabled.value) {
      console.log("Auto-save is disabled, skipping debounce");
      return;
    }
    
    console.log("Setting up ultra-fast debounce auto-save timer...");
    
    // Clear any existing debounce timer
    if (debounceTimer) {
      console.log("Clearing existing debounce timer");
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    
    // For immediate save (no debounce)
    if (immediate) {
      console.log("Immediate auto-save triggered");
      performAutoSaveWithFallback();
      return;
    }
    
    // Ultra-fast debounce times based on storage type
    const debounceDelay = storageType.value === 'google-drive' ? 100 : 150; // Super fast for Google Drive
    
    console.log(`Creating ultra-fast debounce timer (${debounceDelay}ms)`);
    debounceTimer = setTimeout(async () => {
      console.log("Ultra-fast debounce timer triggered, performing auto-save...");
      await performAutoSaveWithFallback();
    }, debounceDelay) as unknown as number;
  };
  
  // Optimized auto save with intelligent fallback
  const performAutoSaveWithFallback = async () => {
    // For localStorage only save
    if (storageType.value === 'local' && !hasAutoSaveFile.value) {
      console.log("No auto-save file selected, saving to localStorage only");
      vocabularyStore.saveToLocalStorage();
      updateTimestamp();
      return;
    }
    
    // For Google Drive, check authentication
    if (storageType.value === 'google-drive' && !googleAuth.isSignedIn()) {
      console.log("Google Drive selected but not signed in, saving to localStorage only");
      vocabularyStore.saveToLocalStorage();
      updateTimestamp();
      return;
    }
    
    const result = await performAutoSave();
    console.log("Ultra-fast auto-save result:", result ? "Success" : "Failed");
    
    if (!result) {
      // If auto-save failed, show appropriate retry message
      const retryMessage = storageType.value === 'google-drive' 
        ? t('vocabulary.save.googleDriveRetry', 'Google Drive save failed. Check connection.') || 'Google Drive save failed. Check connection.'
        : t('vocabulary.save.autoSaveRetry', 'Auto save failed. Click to select a new file.') || 'Auto save failed. Click to select a new file.';
      
      toast.info(retryMessage, {
        timeout: 3000, // Shorter timeout for faster UX
        onClick: () => {
          if (storageType.value === 'local') {
            setupAutoSaveFile();
          }
        }
      });
    }
  };
  
  // Helper to update timestamp
  const updateTimestamp = () => {
    const now = new Date().toLocaleString('vi-VN');
    lastSaveTime.value = now;
    setStoredValue('vocabulary-last-save-time', now);
  };

  // Ultra-fast scheduled auto save with adaptive intervals
  const scheduleAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    
    // Super fast intervals based on storage type
    const autoSaveInterval = storageType.value === 'google-drive' ? 2000 : 3000; // 2s for Google Drive, 3s for local
    
    console.log(`Scheduling ultra-fast auto-save every ${autoSaveInterval}ms`);
    autoSaveTimer = window.setTimeout(() => {
      if (autoSaveEnabled.value) {
        console.log("Scheduled ultra-fast auto-save executing...");
        performAutoSave();
        scheduleAutoSave(); // Reschedule for continuous ultra-fast saving
      }
    }, autoSaveInterval);
  };

  const setupAutoSaveFile = async () => {
    if ('showSaveFilePicker' in window) {
      try {
        console.log("Setting up auto-save file...");
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: autoSaveFileName,
          types: [{ description: 'JSON files', accept: { 'application/json': ['.json'] } }]
        });
        
        // Store the file handle
        autoSaveFileHandle.value = fileHandle;
        
        // Save file handle to IndexedDB for persistence
        await saveFileHandleToIDB(fileHandle);
        
        // Try to get the file name/path for debugging
        try {
          const fileProps = await fileHandle.getFile();
          autoSaveFilePath.value = fileProps.name;
          console.log("Selected auto-save file:", fileProps.name);
        } catch (e) {
          console.log("Could not get file properties:", e);
        }
        
        hasAutoSaveFile.value = true;
        setStoredValue('vocabulary-has-auto-save-file', true);
        
        // Perform an immediate auto-save to verify the file handle works
        const vocabularyData = getVocabularyData();
        
        console.log("Testing auto-save with file handle:", autoSaveFileHandle.value);
        const saveResult = await tryAutoSaveToFile(vocabularyData);
        
        if (saveResult) {
          toast.success(t('vocabulary.save.autoSaveFileSetup', 'Auto save file setup'));
          console.log("Auto-save file setup successful!");
        } else {
          toast.error(t('vocabulary.save.errors.autoSaveFileFailed', 'Auto save file failed'));
          console.error("Auto-save file setup failed!");
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error("Error setting up auto-save file:", error);
          toast.error(t('vocabulary.save.errors.fileSelectError', { error: (error as Error).message }) || `File selection error: ${(error as Error).message}`);
        }
      }
    } else {
      toast.error(t('vocabulary.save.errors.browserNotSupported', 'Browser not supported'));
    }
  };

  const handleFileImport = (file: File) => {
    if (!file || !file.name.endsWith('.json')) {
      toast.error(t('vocabulary.save.errors.invalidFile', 'Invalid file'));
      return;
    }

    const toastId = toast(
      {
        component: ConfirmToast,
        props: {
          message: t('vocabulary.save.import.confirmMessage', { filename: file.name }, `Import ${file.name}? This will replace all current vocabulary.`),
          confirmText: t('common.confirm', 'Confirm'),
          cancelText: t('common.cancel', 'Cancel'),
          onConfirm: () => {
            // Read the file after confirmation
            const reader = new FileReader();
            reader.onload = (e) => {
              isSaving.value = true;
              try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                if (!data.vocabularies || !Array.isArray(data.vocabularies)) {
                  toast.error(t('vocabulary.save.errors.invalidFile', 'Invalid file'));
                  isSaving.value = false;
                  return;
                }
                vocabularyStore.importVocabularies(data.vocabularies);
                            // Import custom topics if they exist
               if (data.customTopics && Array.isArray(data.customTopics)) {
                 // Clear existing custom topics and replace with imported ones
                 localStorage.setItem('customTopics', JSON.stringify(data.customTopics));
                 // Refresh the vocabulary store's custom topics
                 vocabularyStore.refreshCustomTopics();
                 console.log("Imported custom topics:", data.customTopics);
               }
               
               // Also handle legacy 'topics' format for backward compatibility
               if (data.topics && Array.isArray(data.topics)) {
                 // Clear existing custom topics and replace with imported ones (legacy format)
                 localStorage.setItem('customTopics', JSON.stringify(data.topics));
                 // Refresh the vocabulary store's custom topics
                 vocabularyStore.refreshCustomTopics();
                 console.log("Imported legacy topics:", data.topics);
               }
              
              // Import group topics (date group topics)
              if (data.groupTopics && typeof data.groupTopics === 'object') {
                localStorage.setItem('vocabulary-group-topics', JSON.stringify(data.groupTopics));
                console.log("Imported group topics:", data.groupTopics);
              }
              
              // Import accordion state
              if (data.accordionState && typeof data.accordionState === 'object') {
                localStorage.setItem('vocabulary-accordion-state', JSON.stringify(data.accordionState));
                console.log("Imported accordion state:", data.accordionState);
              }
              
              // Import grouping state
              if (typeof data.useGrouping === 'boolean') {
                localStorage.setItem('vocabulary-use-grouping', JSON.stringify(data.useGrouping));
                console.log("Imported grouping state:", data.useGrouping);
              }
              
              // Import vocabulary notes
              if (data.vocabularyNotes && typeof data.vocabularyNotes === 'object') {
                localStorage.setItem('vocabulary-notes', JSON.stringify(data.vocabularyNotes));
                console.log("Imported vocabulary notes:", data.vocabularyNotes);
              }
              
              // Import marked vocabulary words
              if (data.markedWords && typeof data.markedWords === 'object') {
                localStorage.setItem('vocabulary-marked-words', JSON.stringify(data.markedWords));
                console.log("Imported marked words:", data.markedWords);
              }
              
              // Import grammar rules
              if (data.grammarRules && Array.isArray(data.grammarRules)) {
                localStorage.setItem('grammar-rules', JSON.stringify(data.grammarRules));
                console.log("Imported grammar rules:", data.grammarRules);
              }
              
              isSaving.value = false;
              
              // Show detailed import success message
              let importMessage = t('vocabulary.save.import.successMessage', { count: data.vocabularies.length }, `Successfully imported ${data.vocabularies.length} vocabulary words`);
              if (data.customTopics?.length > 0) {
                importMessage += ` + ${data.customTopics.length} custom categories`;
              }
              if (data.groupTopics && Object.keys(data.groupTopics).length > 0) {
                importMessage += ` + ${Object.keys(data.groupTopics).length} group topics`;
              }
              if (typeof data.useGrouping === 'boolean') {
                importMessage += ` + grouping preference`;
              }
              if (data.vocabularyNotes && Object.keys(data.vocabularyNotes).length > 0) {
                importMessage += ` + ${Object.keys(data.vocabularyNotes).length} vocabulary notes`;
              }
              if (data.markedWords && Object.keys(data.markedWords).length > 0) {
                let totalMarkedWords = 0;
                Object.values(data.markedWords).forEach(words => {
                  if (Array.isArray(words)) {
                    totalMarkedWords += words.length;
                  }
                });
                importMessage += ` + ${totalMarkedWords} marked words`;
              }
              if (data.grammarRules && data.grammarRules.length > 0) {
                importMessage += ` + ${data.grammarRules.length} grammar rules`;
              }
              
              toast.success(importMessage);
              
              // Emit custom event to signal import completion
              window.dispatchEvent(new CustomEvent('vocabularyImportComplete', {
                detail: { useGrouping: data.useGrouping }
              }));
              
              if (autoSaveEnabled.value) {
                debounceAutoSave();
              }
              } catch (error) {
                isSaving.value = false;
                console.error(t('vocabulary.save.errors.invalidFile'), error);
                toast.error(t('vocabulary.save.errors.invalidFile', 'Invalid file'));
              }
            };
            reader.onerror = () => {
              isSaving.value = false;
              console.error('Error reading file');
              toast.error(t('vocabulary.save.errors.fileReadError', { error: reader.error?.message || 'Unknown error' }) || `Error reading file: ${reader.error?.message || 'Unknown error'}`);
            };
            reader.readAsText(file);
            toast.dismiss(toastId);
          },
          onCancel: () => {
            isSaving.value = false;
            toast.dismiss(toastId);
          },
        },
      },
      {
        position: POSITION.TOP_CENTER,
        timeout: false,
        closeButton: false,
        draggable: false,
        icon: false,
      }
    );
  };

  // Google Drive auto-save functions
  // Ultra-fast Google Drive save with optimized error handling
  const tryAutoSaveToGoogleDrive = async (data: any): Promise<boolean> => {
    try {
      if (!googleAuth.isSignedIn()) {
        console.log('❌ Not signed in to Google Drive');
        // Don't show toast for ultra-fast saves to avoid spam
        return false;
      }

      console.log('⚡ Ultra-fast auto-save to Google Drive...');
      const result = await googleDriveApi.uploadVocabularyData(data);
      
      if (result.success) {
        console.log('⚡ Ultra-fast Google Drive save completed!');
        hasGoogleDriveFile.value = true;
        setStoredValue('vocabulary-has-google-drive-file', true);
        return true;
      } else {
        console.error('❌ Ultra-fast Google Drive save failed:', result.error);
        // Only show error toast occasionally to avoid spam
        if (Math.random() < 0.1) { // Show error 10% of the time
          toast.error(t('vocabulary.save.errors.googleDriveFailed', 'Google Drive save failed') || 'Google Drive save failed', {
            timeout: 2000
          });
        }
        return false;
      }
    } catch (error) {
      console.error('❌ Ultra-fast Google Drive error:', error);
      // Reduced error toast frequency for better UX
      if (Math.random() < 0.1) {
        toast.error(t('vocabulary.save.errors.googleDriveFailed', 'Google Drive save failed') || 'Google Drive error', {
          timeout: 2000
        });
      }
      return false;
    }
  };

  const setupGoogleDrive = async (): Promise<boolean> => {
    try {
      console.log('Setting up Google Drive auto-save...');
      
      if (!googleAuth.isSignedIn()) {
        const signInResult = await googleAuth.signIn();
        if (!signInResult) {
          toast.error(t('vocabulary.save.errors.googleSignInFailed', 'Google sign-in failed') || 'Google sign-in failed');
          return false;
        }
      }

      // Test upload with current data
      const vocabularyData = getVocabularyData();
      const result = await googleDriveApi.uploadVocabularyData(vocabularyData);
      
      if (result.success) {
        hasGoogleDriveFile.value = true;
        setStoredValue('vocabulary-has-google-drive-file', true);
        toast.success(t('vocabulary.save.googleDriveSetup', 'Google Drive setup successful') || 'Google Drive setup successful');
        return true;
      } else {
        toast.error(t('vocabulary.save.errors.googleDriveSetupFailed', 'Google Drive setup failed') || 'Google Drive setup failed');
        return false;
      }
    } catch (error) {
      console.error('Error setting up Google Drive:', error);
      toast.error(t('vocabulary.save.errors.googleDriveSetupFailed', 'Google Drive setup failed') || 'Google Drive setup failed');
      return false;
    }
  };

  const syncFromGoogleDrive = async (): Promise<boolean> => {
    try {
      if (!googleAuth.isSignedIn()) {
        toast.error(t('vocabulary.save.errors.notSignedIn', 'Not signed in to Google') || 'Not signed in to Google');
        return false;
      }

      console.log('Syncing from Google Drive...');
      const result = await googleDriveApi.downloadVocabularyData();
      
      if (result.success && result.data) {
        // Import the data
        if (result.data.vocabularies && Array.isArray(result.data.vocabularies)) {
          vocabularyStore.importVocabularies(result.data.vocabularies);
          
          // Import other data similar to handleFileImport
          if (result.data.customTopics && Array.isArray(result.data.customTopics)) {
            localStorage.setItem('customTopics', JSON.stringify(result.data.customTopics));
            vocabularyStore.refreshCustomTopics();
          }
          
          if (result.data.groupTopics && typeof result.data.groupTopics === 'object') {
            localStorage.setItem('vocabulary-group-topics', JSON.stringify(result.data.groupTopics));
          }
          
          if (result.data.grammarRules && Array.isArray(result.data.grammarRules)) {
            localStorage.setItem('grammar-rules', JSON.stringify(result.data.grammarRules));
          }
          
          toast.success(t('vocabulary.save.syncFromDriveSuccess', 'Successfully synced from Google Drive') || 'Successfully synced from Google Drive');
          return true;
        }
      } else {
        toast.error(result.error || t('vocabulary.save.errors.syncFailed', 'Sync failed') || 'Sync failed');
        return false;
      }
    } catch (error) {
      console.error('Error syncing from Google Drive:', error);
      toast.error(t('vocabulary.save.errors.syncFailed', 'Sync failed') || 'Sync failed');
      return false;
    }
    return false;
  };

  const handleGoogleSignIn = async (): Promise<boolean> => {
    try {
      console.log('Initiating Google sign-in...');
      const result = await googleAuth.signIn();
      
      if (result) {
        toast.success(t('vocabulary.save.googleSignInSuccess', 'Successfully signed in to Google') || 'Successfully signed in to Google');
        
        // Check if backup exists
        const backupInfo = await googleDriveApi.getVocabularyBackupInfo();
        if (backupInfo.exists) {
          hasGoogleDriveFile.value = true;
          setStoredValue('vocabulary-has-google-drive-file', true);
        }
        
        // 🚀 IMMEDIATE AUTO SAVE after successful Google sign-in
        console.log('⚡ Triggering immediate auto-save after Google sign-in...');
        if (autoSaveEnabled.value && storageType.value === 'google-drive') {
          // Use immediate save (no debounce) for instant response
          debounceAutoSave(true);
          
          // Also schedule regular auto-save to start immediately
          if (autoSaveTimer) clearTimeout(autoSaveTimer);
          scheduleAutoSave();
          
          console.log('✅ Immediate auto-save triggered after Google sign-in');
        }
      } else {
        toast.error(t('vocabulary.save.errors.googleSignInFailed', 'Google sign-in failed') || 'Google sign-in failed');
      }
      
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error(t('vocabulary.save.errors.googleSignInFailed', 'Google sign-in failed') || 'Google sign-in failed');
      return false;
    }
  };

  const handleGoogleSignOut = async (): Promise<void> => {
    try {
      await googleAuth.signOut();
      hasGoogleDriveFile.value = false;
      setStoredValue('vocabulary-has-google-drive-file', false);
      toast.success(t('vocabulary.save.googleSignOutSuccess', 'Successfully signed out from Google') || 'Successfully signed out from Google');
    } catch (error) {
      console.error('Google sign-out error:', error);
      toast.error(t('vocabulary.save.errors.googleSignOutFailed', 'Google sign-out failed') || 'Google sign-out failed');
    }
  };

  const resetAutoSaveFile = async () => {
    autoSaveFileHandle.value = null;
    hasAutoSaveFile.value = false;
    setStoredValue('vocabulary-has-auto-save-file', false);
    autoSaveFilePath.value = '';
    
    // Clear file handle from IndexedDB
    await clearFileHandleFromIDB();
    
    console.log('Auto-save file reset completed');
  };

  const getSaveStatusColor = computed(() => {
    switch (saveStatus.value) {
      case 'saving': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  });

  const getSaveStatusText = computed(() => {
    switch (saveStatus.value) {
      case 'saving': return autoSaveEnabled.value ? t('vocabulary.save.status.autoSaving', 'Auto Saving...') : t('vocabulary.save.status.saving', 'Saving...');
      case 'success':
        if (autoSaveEnabled.value) {
          if (storageType.value === 'google-drive' && hasGoogleDriveFile.value) {
            return t('vocabulary.save.status.autoGoogleDrive', 'Auto saved to Google Drive');
          } else if (storageType.value === 'local' && hasAutoSaveFile.value) {
            return t('vocabulary.save.status.autoWithFile', 'Auto saved to file');
          } else {
            return t('vocabulary.save.status.autoLocalStorage', 'Auto saved locally');
          }
        }
        return t('vocabulary.save.status.fileSaved', 'Saved to file');
      case 'error': return t('vocabulary.save.status.error', 'Save error');
      default:
        if (autoSaveEnabled.value) {
          if (storageType.value === 'google-drive') {
            return googleAuth.isSignedIn() ? t('vocabulary.save.status.googleDriveReady', 'Google Drive ready') : t('vocabulary.save.status.googleDriveSignIn', 'Sign in to Google Drive');
          } else {
            return hasAutoSaveFile.value ? t('vocabulary.save.status.autoFile', 'Auto save ready') : t('vocabulary.save.status.autoNoFile', 'Auto save (no file)');
          }
        }
        return t('vocabulary.save.manual', 'Manual save');
    }
  });

  // Initialize auto-save and Google APIs on component mount
  onMounted(async () => {
    console.log('🚀 Component mounted, initializing auto-save...');
    await initializeAutoSave();
    
    // Always initialize Google APIs to restore saved auth state if available
    console.log('📱 Initializing Google APIs...');
    try {
      await googleAuth.initialize();
      console.log('✅ Google APIs initialized');
      
      // Check if we have restored Google Drive authentication
      if (googleAuth.isSignedIn()) {
        console.log('✅ Google Drive authentication restored from localStorage');
        // Check if backup exists to set hasGoogleDriveFile
        try {
          const backupInfo = await googleDriveApi.getVocabularyBackupInfo();
          if (backupInfo.exists) {
            hasGoogleDriveFile.value = true;
            setStoredValue('vocabulary-has-google-drive-file', true);
            console.log('✅ Google Drive backup file found');
          }
        } catch (error) {
          console.warn('⚠️ Could not check Google Drive backup status:', error);
        }
      }
    } catch (error) {
      console.error('❌ Failed to initialize Google APIs:', error);
    }
  });

  onUnmounted(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    if (debounceTimer) clearTimeout(debounceTimer);
  });

  return {
    autoSaveEnabled,
    isSaving,
    lastSaveTime,
    hasAutoSaveFile,
    hasGoogleDriveFile,
    storageType,
    autoSaveFilePath,
    saveStatus,
    getSaveStatusColor,
    getSaveStatusText,
    manualSave,
    debounceAutoSave,
    scheduleAutoSave,
    setupAutoSaveFile,
    setupGoogleDrive,
    syncFromGoogleDrive,
    handleGoogleSignIn,
    handleGoogleSignOut,
    handleFileImport,
    resetAutoSaveFile,
    // Google auth states  
    isGoogleSignedIn: computed(() => googleAuth.isSignedIn()),
    googleAuthError: googleAuth.authError,
  };
} 