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
        accordionState: JSON.parse(localStorage.getItem('vocabulary-accordion-state') || '{}'),
        useGrouping: JSON.parse(localStorage.getItem('vocabulary-use-grouping') || 'false'), // Save grouping state
        exportDate: new Date().toISOString(),
        version: '1.3', // Increment version to indicate enhanced format with grouping state
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
      vocabularyStore.saveToLocalStorage();
      await tryAutoSaveToFile(vocabularyData);
      const now = new Date().toLocaleString('vi-VN');
      lastSaveTime.value = now;
      setStoredValue('vocabulary-last-save-time', now);
      saveStatus.value = 'success';
      setTimeout(() => { if (saveStatus.value === 'success') saveStatus.value = 'idle'; }, 1000);
    } catch (error) {
      saveStatus.value = 'error';
      setTimeout(() => { if (saveStatus.value === 'error') saveStatus.value = 'idle'; }, 2000);
    }
  };

  const tryAutoSaveToFile = async (data: any) => {
    if ('showSaveFilePicker' in window && autoSaveFileHandle.value) {
      try {
        const writable = await autoSaveFileHandle.value.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
      } catch (error) {
        autoSaveFileHandle.value = null;
        hasAutoSaveFile.value = false;
        setStoredValue('vocabulary-has-auto-save-file', false);
      }
    }
  };

  const debounceAutoSave = () => {
    if (!autoSaveEnabled.value) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performAutoSave();
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
        autoSaveFileHandle.value = await (window as any).showSaveFilePicker({
          suggestedName: autoSaveFileName,
          types: [{ description: 'JSON files', accept: { 'application/json': ['.json'] } }]
        });
        hasAutoSaveFile.value = true;
        setStoredValue('vocabulary-has-auto-save-file', true);
        await tryAutoSaveToFile(getVocabularyData());
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error(t('vocabulary.save.errors.fileSelectError', { error: (error as Error).message }));
        }
      }
    } else {
      toast.error(t('vocabulary.save.errors.browserNotSupported'));
    }
  };

  const handleFileImport = (file: File) => {
    if (!file || !file.name.endsWith('.json')) {
      toast.error(t('vocabulary.save.errors.invalidFile'));
      return;
    }

    const toastId = toast(
      {
        component: ConfirmToast,
        props: {
          message: t('vocabulary.save.import.confirmMessage', { count: '-', filename: file.name }),
          confirmText: t('common.confirm'),
          cancelText: t('common.cancel'),
          onConfirm: () => {
            // Read the file after confirmation
            const reader = new FileReader();
            reader.onload = (e) => {
              isSaving.value = true;
              try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                if (!data.vocabularies || !Array.isArray(data.vocabularies)) {
                  toast.error(t('vocabulary.save.errors.invalidFile'));
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
              
              isSaving.value = false;
              
              // Show detailed import success message
              let importMessage = t('vocabulary.save.import.successMessage', { count: data.vocabularies.length });
              if (data.customTopics?.length > 0) {
                importMessage += ` + ${data.customTopics.length} custom categories`;
              }
              if (data.groupTopics && Object.keys(data.groupTopics).length > 0) {
                importMessage += ` + ${Object.keys(data.groupTopics).length} group topics`;
              }
              if (typeof data.useGrouping === 'boolean') {
                importMessage += ` + grouping preference`;
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
                toast.error(t('vocabulary.save.errors.invalidFile'));
              }
            };
            reader.onerror = () => {
              isSaving.value = false;
              console.error('Lỗi khi nhập file');
              toast.error('Lỗi khi nhập file: ' + reader.error?.message);
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
      case 'saving': return autoSaveEnabled.value ? t('vocabulary.save.status.autoSaving') : t('vocabulary.save.status.saving');
      case 'success':
        if (autoSaveEnabled.value) {
          return hasAutoSaveFile.value ? t('vocabulary.save.status.autoWithFile') : t('vocabulary.save.status.autoLocalStorage');
        }
        return t('vocabulary.save.status.fileSaved');
      case 'error': return t('vocabulary.save.status.error');
      default:
        if (autoSaveEnabled.value) {
          return hasAutoSaveFile.value ? t('vocabulary.save.status.autoFile') : t('vocabulary.save.status.autoNoFile');
        }
        return t('vocabulary.save.manual');
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