import { ref, computed, watch, onUnmounted, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast, POSITION } from 'vue-toastification';
import { useVocabularyStore } from '../../../composables/useVocabularyStore';
import { getCustomTopics } from '../../../utils/topicUtils';

const ConfirmToast = defineAsyncComponent(() => import("../../../components/common/ConfirmToast.vue"));

export function useVocabularySaving() {
  const { t } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();

  const autoSaveEnabled = ref(true);
  const isSaving = ref(false);
  const lastSaveTime = ref('');
  const saveStatus = ref<'idle' | 'saving' | 'success' | 'error'>('idle');
  const autoSaveFileHandle = ref<any>(null);
  const hasAutoSaveFile = ref<boolean>(false);
  const autoSaveFileName = 'vocabulary-auto-backup.json';
  let autoSaveTimer: number | null = null;
  let debounceTimer: number | null = null;

  // Add a new ref to store the file path for debugging
  const autoSaveFilePath = ref<string>('');

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
  lastSaveTime.value = getStoredValue('vocabulary-last-save-time', '');

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
        accordionState: JSON.parse(localStorage.getItem('vocabulary-accordion-state') || '{}'),
        useGrouping: JSON.parse(localStorage.getItem('vocabulary-use-grouping') || 'false'), // Save grouping state
        exportDate: new Date().toISOString(),
        version: '1.4', // Increment version to indicate enhanced format with notes
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
      
      // Then, try to save to file if a file handle is available
      let fileSaveSuccess = false;
      if (hasAutoSaveFile.value) {
        fileSaveSuccess = await tryAutoSaveToFile(vocabularyData);
      }
      
      // Update timestamps and status
      const now = new Date().toLocaleString('vi-VN');
      lastSaveTime.value = now;
      setStoredValue('vocabulary-last-save-time', now);
      
      saveStatus.value = 'success';
      setTimeout(() => { 
        if (saveStatus.value === 'success') {
          saveStatus.value = 'idle';
        }
      }, 1000);
      
      return fileSaveSuccess;
    } catch (error) {
      console.error("Auto-save error:", error);
      saveStatus.value = 'error';
      setTimeout(() => { 
        if (saveStatus.value === 'error') {
          saveStatus.value = 'idle';
        }
      }, 2000);
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
      }
      
      return false;
    }
  };

  const debounceAutoSave = () => {
    if (!autoSaveEnabled.value) {
      console.log("Auto-save is disabled, skipping debounce");
      return;
    }
    
    console.log("Setting up debounce auto-save timer...");
    
    // Clear any existing debounce timer
    if (debounceTimer) {
      console.log("Clearing existing debounce timer");
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    
    // Set a new debounce timer
    console.log("Creating new debounce timer");
    debounceTimer = setTimeout(async () => {
      console.log("Debounce timer triggered, performing auto-save...");
      
      if (!hasAutoSaveFile.value) {
        console.log("No auto-save file selected, saving to localStorage only");
        vocabularyStore.saveToLocalStorage();
        return;
      }
      
      const result = await performAutoSave();
      console.log("Auto-save result:", result ? "Success" : "Failed");
      
      if (!result) {
        // If auto-save failed, try to prompt user to select a new file
        toast.info(t('vocabulary.save.autoSaveRetry', 'Auto save failed. Click to select a new file.') || 'Auto save failed. Click to select a new file.', {
          timeout: 5000,
          onClick: () => {
            setupAutoSaveFile();
          }
        });
      }
    }, 500) as unknown as number;
  };

  const scheduleAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(() => {
      if (autoSaveEnabled.value) {
        performAutoSave();
        scheduleAutoSave();
      }
    }, 10000);
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
          toast.error(t('vocabulary.save.errors.fileSelectError', { error: (error as Error).message }));
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
          message: t('vocabulary.save.import.confirmMessage', { count: '-', filename: file.name }) || `Import ${file.name}? This will replace all current vocabulary.`,
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
              
              isSaving.value = false;
              
              // Show detailed import success message
              let importMessage = t('vocabulary.save.import.successMessage', { count: data.vocabularies.length }) || `Successfully imported ${data.vocabularies.length} vocabulary words`;
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

  const resetAutoSaveFile = () => {
    autoSaveFileHandle.value = null;
    hasAutoSaveFile.value = false;
    setStoredValue('vocabulary-has-auto-save-file', false);
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
          return hasAutoSaveFile.value ? t('vocabulary.save.status.autoWithFile', 'Auto saved to file') : t('vocabulary.save.status.autoLocalStorage', 'Auto saved locally');
        }
        return t('vocabulary.save.status.fileSaved', 'Saved to file');
      case 'error': return t('vocabulary.save.status.error', 'Save error');
      default:
        if (autoSaveEnabled.value) {
          return hasAutoSaveFile.value ? t('vocabulary.save.status.autoFile', 'Auto save ready') : t('vocabulary.save.status.autoNoFile', 'Auto save (no file)');
        }
        return t('vocabulary.save.manual', 'Manual save');
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
    autoSaveFilePath,
    saveStatus,
    getSaveStatusColor,
    getSaveStatusText,
    manualSave,
    debounceAutoSave,
    scheduleAutoSave,
    setupAutoSaveFile,
    handleFileImport,
    resetAutoSaveFile,
  };
} 