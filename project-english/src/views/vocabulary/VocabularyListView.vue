<template>
  <div>
    <!-- Header -->
    <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="0px">
      <VocabularyHeader @add-vocabulary="openAddDialog" />
    </LazyLoadComponent>

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-50px">
        <div class="mb-3 xs:mb-4 sm:mb-6">
          <VocabularyFilters
            :search-query="searchQuery"
            :selected-category="selectedCategory"
            :selected-level="selectedLevel"
            :categories="categories"
            :show-favorites-only="showFavoritesOnly"
            @update:searchQuery="updateSearchQuery"
            @update:selectedCategory="updateSelectedCategory"
            @update:selectedLevel="updateSelectedLevel"
            @update:showFavoritesOnly="updateShowFavoritesOnly"
          />
        </div>
      </LazyLoadComponent>
      
      <!-- Date Grouping Toggle -->
      <LazyLoadComponent animation-type="slide-right" :threshold="0.1" root-margin="-50px">
        <div class="mb-3 xs:mb-4 sm:mb-6">
          <GroupingToggle 
            :model-value="useGrouping" 
            :hover-enabled="hoverToExpandEnabled"
            @update:model-value="toggleGrouping" 
            @update:hover-enabled="hoverToExpandEnabled = $event"
          />
        </div>
      </LazyLoadComponent>

      <!-- Voice Settings Panel -->
      <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
        <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
          <VoiceSelector :show-voice-info="true" />
        </div>
      </LazyLoadComponent>

      <!-- Topic Management Panel -->
      <LazyLoadComponent animation-type="blur" :threshold="0.1" root-margin="-50px">
        <div class="mb-3 xs:mb-4 sm:mb-6">
          <TopicManagerPanel @open="openTopicManager" />
        </div>
      </LazyLoadComponent>

      <!-- Save Control Panel -->
      <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="-50px">
        <div class="mb-3 xs:mb-4 sm:mb-6">
          <SaveControlPanel
            :auto-save-enabled="autoSaveEnabled"
            @update:auto-save-enabled="autoSaveEnabled = $event"
            :is-saving="isSaving"
            :has-auto-save-file="hasAutoSaveFile"
            :auto-save-file-path="autoSaveFilePath"
            :last-save-time="lastSaveTime"
            :save-status-color="getSaveStatusColor"
            :save-status-text="getSaveStatusText"
            @manual-save="manualSave"
            @setup-auto-save="setupAutoSaveFile"
            @reset-auto-save="resetAutoSaveFile"
            @import-file="handleFileImportWithReload"
          />
        </div>
      </LazyLoadComponent>

      <!-- Vocabulary List -->
      <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-100px">
        <VocabularyList
          :paginated-words="useGrouping ? [] : paginatedVocabulary"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-count="filteredVocabulary.length"
          :start-index="startIndex"
          :end-index="endIndex"
          :visible-pages="visiblePages"
          :use-grouping="useGrouping"
          :all-words="useGrouping ? filteredVocabulary : undefined"
          :date-group-pages="dateGroupPages"
          :items-per-page-grouped="itemsPerPageGrouped"
          :hover-to-expand-enabled="hoverToExpandEnabled"
          @play-audio="playAudio"
          @edit-word="openEditDialog"
          @delete-word="deleteWord"
          @toggle-favorite="toggleFavorite"
          @view-details="openDetailsDialog"
          @previous-page="previousPage"
          @next-page="nextPage"
          @go-to-page="goToPage"
          @date-group-previous="(date) => dateGroupPrevious(date, filteredVocabulary)"
          @date-group-next="(date) => dateGroupNext(date, filteredVocabulary)"
          @date-group-go-to-page="dateGroupGoToPage"
          @open-note-dialog="openNoteDialog"
          @open-add-vocabulary-dialog="openAddVocabularyForDate"
        />
      </LazyLoadComponent>
    </div>

    <!-- Vocabulary Form Dialog -->
    <VocabularyFormDialog
      v-model="showFormDialog"
      :vocabulary="selectedVocabulary"
      :target-date="targetDateForNewVocabulary"
      @vocabulary-saved="onVocabularySaved"
    />

    <!-- Vocabulary Detail Dialog -->
    <VocabularyDetailDialog
      v-model="showDetailDialog"
      :vocabulary="selectedVocabularyForDetail"
      @edit-vocabulary="openEditFromDetail"
      @toggle-favorite="toggleFavorite"
    />

    <!-- Topic Manager Dialog -->
    <TopicManager
      v-model="showTopicManager"
      :vocabulary-usage="categoryUsage"
      @topic-added="onTopicAdded"
      @topic-updated="onTopicUpdated"
      @topic-deleted="onTopicDeleted"
    />

    <!-- Vocabulary Note Dialog -->
    <VocabularyNoteDialog
      v-model="showNoteDialog"
      :date="noteDialogDate"
      :today-words="noteDialogWords"
      @save-note="handleNoteSaved"
    />
    
    <!-- Sticky Floating Add Button -->
    <Transition name="fade-scale">
      <div 
        v-show="showStickyButton"
        class="fixed bottom-6 right-6 z-50"
      >
        <button 
          @click="openAddDialog"
          @mouseenter="showStickyTooltip = true"
          @mouseleave="showStickyTooltip = false"
          class="relative bg-blue-500 hover:bg-blue-600 text-white font-medium w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <svg 
            class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          
          <!-- Tooltip -->
          <div
            v-if="showStickyTooltip"
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-gray-600 rounded shadow-lg whitespace-nowrap z-50"
          >
            {{ t('vocabulary.addNew') }}
            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black"></div>
          </div>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast, POSITION } from 'vue-toastification';
import { useVoiceStore } from '../../stores/voiceStore';
import { useVocabularyStore } from '../../composables/useVocabularyStore';
import { groupVocabulariesByDate } from '../../utils/dateUtils';
import type { Vocabulary } from '../../composables/useVocabularyStore';

// Local components
const LazyLoadComponent = defineAsyncComponent(() => import('../../components/LazyLoadComponent.vue'));
const GroupingToggle = defineAsyncComponent(() => import('./components/GroupingToggle.vue'));
const TopicManagerPanel = defineAsyncComponent(() => import('./components/TopicManagerPanel.vue'));
const SaveControlPanel = defineAsyncComponent(() => import('./components/SaveControlPanel.vue'));
const VocabularyHeader = defineAsyncComponent(() => import('./components/VocabularyHeader.vue'));
const VocabularyFilters = defineAsyncComponent(() => import('./components/VocabularyFilters.vue'));
const VocabularyList = defineAsyncComponent(() => import('./components/VocabularyList.vue'));
const VocabularyFormDialog = defineAsyncComponent(() => import('./components/VocabularyFormDialog.vue'));
const VocabularyDetailDialog = defineAsyncComponent(() => import('./components/VocabularyDetailDialog.vue'));
const VocabularyNoteDialog = defineAsyncComponent(() => import('./components/VocabularyNoteDialog.vue'));
const VoiceSelector = defineAsyncComponent(() => import('../../components/VoiceSelector.vue'));
const TopicManager = defineAsyncComponent(() => import('./components/TopicManager.vue'));
const ConfirmToast = defineAsyncComponent(() => import('../../components/common/ConfirmToast.vue'));

// Composables
import { useVocabularyFilters } from './composables/useVocabularyFilters';
import { useVocabularyPagination } from './composables/useVocabularyPagination';
import { useVocabularyGrouping } from './composables/useVocabularyGrouping';
import { useVocabularyDialogs } from './composables/useVocabularyDialogs';
import { useTopicManager } from './composables/useTopicManager';
import { useVocabularySaving } from './composables/useVocabularySaving';

const { t } = useI18n();
const toast = useToast();
const vocabularyStore = useVocabularyStore();
const voiceStore = useVoiceStore();

const itemsPerPage = ref(5);

const {
  searchQuery,
  selectedCategory,
  selectedLevel,
  showFavoritesOnly,
  updateShowFavoritesOnly,
  updateSearchQuery,
  updateSelectedCategory,
  updateSelectedLevel,
} = useVocabularyFilters();

const {
  useGrouping,
  itemsPerPageGrouped,
  dateGroupPages,
  toggleGrouping,
  reloadGroupingState,
  dateGroupPrevious,
  dateGroupNext,
  dateGroupGoToPage,
} = useVocabularyGrouping();

// Hover to expand functionality with localStorage persistence
const HOVER_EXPAND_STORAGE_KEY = 'vocabulary-hover-expand-enabled';

const getStoredHoverState = (): boolean => {
  try {
    const stored = localStorage.getItem(HOVER_EXPAND_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    console.warn('Failed to load hover expand state from localStorage:', error);
    return false;
  }
};

const setStoredHoverState = (enabled: boolean) => {
  try {
    localStorage.setItem(HOVER_EXPAND_STORAGE_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.warn('Failed to save hover expand state to localStorage:', error);
  }
};

const hoverToExpandEnabled = ref(getStoredHoverState());

// Note dialog state
const showNoteDialog = ref(false);
const noteDialogDate = ref('');
const noteDialogWords = ref<any[]>([]);

const filteredVocabulary = computed(() => {
  return vocabularyStore.allVocabularies.value.filter(word => {
    const matchesSearch = !searchQuery.value ||
      word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || word.category === selectedCategory.value;
    const matchesLevel = !selectedLevel.value || word.level === selectedLevel.value;
    const matchesFavorite = !showFavoritesOnly.value || word.favorite === true;
    return matchesSearch && matchesCategory && matchesLevel && matchesFavorite;
  });
});

const {
  currentPage,
  totalPages,
  paginatedVocabulary,
  startIndex,
  endIndex,
  visiblePages,
  previousPage,
  nextPage,
  goToPage,
} = useVocabularyPagination(filteredVocabulary, useGrouping, itemsPerPage);

const {
  showFormDialog,
  selectedVocabulary,
  showDetailDialog,
  selectedVocabularyForDetail,
  openAddDialog,
  openEditDialog,
  onVocabularySaved: originalOnVocabularySaved,
  openDetailsDialog,
  openEditFromDetail,
} = useVocabularyDialogs();

// Override onVocabularySaved to reset target date and reload grouping
const onVocabularySaved = () => {
  originalOnVocabularySaved();
  targetDateForNewVocabulary.value = null;
  
  // Reload grouping state to ensure new vocabulary appears in correct date group
  if (useGrouping.value) {
    nextTick(() => {
      reloadGroupingState();
      console.log('Grouping state reloaded after vocabulary saved');
    });
  }
};

const {
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
  autoSaveFilePath,
} = useVocabularySaving();

const {
  showTopicManager,
  openTopicManager,
  onTopicAdded,
  onTopicUpdated,
  onTopicDeleted,
} = useTopicManager(debounceAutoSave);

const categories = computed(() => vocabularyStore.getCategories.value);
const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value);

// Computed property to control sticky button visibility
const showStickyButtonVisible = computed(() => {
  return showStickyButton.value && !showFormDialog.value;
});

const deleteWord = (word: any) => {
  const toastId = toast(
    {
      component: ConfirmToast,
      props: {
        message: t('vocabulary.confirmDelete', { word: word.word }),
        confirmText: t('common.confirm'),
        cancelText: t('common.cancel'),
        onConfirm: () => {
          vocabularyStore.deleteVocabulary(word.id);
          debounceAutoSave();
          toast.dismiss(toastId);
          toast.success(t('vocabulary.deleteSuccess', { word: word.word }));
        },
        onCancel: () => {
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

const toggleFavorite = (word: Vocabulary) => {
  vocabularyStore.toggleFavorite(word.id);

  // Manually toggle the favorite status on the vocabulary object
  // currently displayed in the detail dialog to make the change
  // immediately visible.
  if (selectedVocabularyForDetail.value && selectedVocabularyForDetail.value.id === word.id) {
      selectedVocabularyForDetail.value.favorite = !selectedVocabularyForDetail.value.favorite;
  }
  
  debounceAutoSave();
};

const playAudio = async (word: string) => {
  try {
    const utterance = voiceStore.createUtterance(word);
    await new Promise<void>((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);
      if ('speechSynthesis' in window) {
        speechSynthesis.speak(utterance);
      } else {
        reject(new Error('Speech synthesis not supported'));
      }
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }
};

watch(
  () => vocabularyStore.allVocabularies.value,
  (newVocabularies, oldVocabularies) => {
    const newCount = newVocabularies?.length || 0;
    const oldCount = oldVocabularies?.length || 0;
    if (autoSaveEnabled.value && newCount > 0 && oldCount !== undefined && newCount !== oldCount) {
      saveStatus.value = 'saving';
      debounceAutoSave();
    }
    
    // Reload grouping state when vocabulary count changes (new vocabulary added)
    if (useGrouping.value && newCount !== oldCount && newCount > 0) {
      nextTick(() => {
        reloadGroupingState();
        console.log('Grouping state reloaded due to vocabulary count change');
      });
    }
  },
  { deep: true, immediate: false }
);

watch(
  () => vocabularyStore.allVocabularies.value.map(v => ({ id: v.id, favorite: v.favorite, word: v.word, meaning: v.meaning })),
  (newData, oldData) => {
    if (autoSaveEnabled.value && newData.length > 0 && oldData && JSON.stringify(newData) !== JSON.stringify(oldData)) {
      debounceAutoSave();
    }
  },
  { deep: true }
);

// Watch hover expand state and save to localStorage
watch(
  hoverToExpandEnabled,
  (newValue) => {
    setStoredHoverState(newValue);
  }
);

// Prevent body scroll when dialogs are open
watch(showNoteDialog, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open');
  } else {
    // Only remove if form dialog is also closed
    if (!showFormDialog.value) {
      document.body.classList.remove('modal-open');
    }
  }
});

// Prevent body scroll when form dialog is open
watch(showFormDialog, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open');
    // Hide sticky tooltip when dialog opens
    showStickyTooltip.value = false;
  } else {
    // Only remove if note dialog is also closed
    if (!showNoteDialog.value) {
      document.body.classList.remove('modal-open');
    }
  }
});

onMounted(() => {
  vocabularyStore.initializeStore();
  if (autoSaveEnabled.value) {
    scheduleAutoSave();
  }
  
  // Listen for vocabulary notes updates
  window.addEventListener('vocabulary-notes-updated', () => {
    if (autoSaveEnabled.value) {
      debounceAutoSave();
    }
  });
  
  // Add scroll event listener for sticky button
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial call to set button state
  handleScroll();
});

const handleFileImportWithReload = (file: File) => {
  const handleImportComplete = (event: CustomEvent) => {
    nextTick(() => {
      reloadGroupingState();
      console.log('Grouping state reloaded after import');
    });
    window.removeEventListener('vocabularyImportComplete', handleImportComplete as EventListener);
  };
  
  window.addEventListener('vocabularyImportComplete', handleImportComplete as EventListener);
  
  handleFileImport(file);
};

// Sticky button state
const showStickyButton = ref(false);
const showStickyTooltip = ref(false);
const headerHeight = ref(0);
const isScrollingDown = ref(false);
const lastScrollY = ref(0);

// Scroll handler for sticky button
const handleScroll = () => {
  const scrollY = window.scrollY;
  const headerElement = document.querySelector('[data-vocabulary-header]') || document.querySelector('header');
  
  // Get header height if not cached
  if (headerHeight.value === 0 && headerElement) {
    headerHeight.value = (headerElement as HTMLElement).offsetHeight;
  }
  
  // Find the original add button position
  const originalAddButton = document.querySelector('[data-original-add-button]') || 
                           document.querySelector('.vocabulary-header button');
  
  let originalButtonVisible = false;
  if (originalAddButton) {
    const rect = originalAddButton.getBoundingClientRect();
    // Button is visible if it's in viewport (top part of screen)
    originalButtonVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;
  }
  
  // Show sticky button when scrolled past header and original button is not visible
  // Hide when original button becomes visible again (even partially)
  const headerBottom = headerHeight.value || 120;
  const shouldShowSticky = scrollY > headerBottom && !originalButtonVisible;
  showStickyButton.value = shouldShowSticky;
  
  lastScrollY.value = scrollY;
};

// Note dialog handlers
const openNoteDialog = (date: string, words: any[]) => {
  noteDialogDate.value = date;
  noteDialogWords.value = words;
  showNoteDialog.value = true;
};

// Store the target date for new vocabulary
const targetDateForNewVocabulary = ref<string | null>(null);

// Open add vocabulary dialog with specific date
const openAddVocabularyForDate = (date: string) => {
  // Store the target date
  targetDateForNewVocabulary.value = date;
  
  // Use the standard add dialog approach
  selectedVocabulary.value = null;
  showFormDialog.value = true;
  
  // Dispatch edit word event
  window.dispatchEvent(new CustomEvent('vocabulary-edit-word'));
};

const handleNoteSaved = (note: string, markedWords: string[]) => {
  toast.success(t('vocabulary.notes.saveSuccess'), {
    timeout: 2000,
  });
  
  // Check if auto-save is enabled
  if (autoSaveEnabled.value) {
    toast.info(t('vocabulary.notes.autoSaveNotice'), {
      timeout: 3000,
    });
    debounceAutoSave();
  }
  
  console.log(`Note saved for ${noteDialogDate.value} with ${markedWords.length} marked words`);
};

onUnmounted(() => {
  window.removeEventListener('vocabularyImportComplete', () => {});
  window.removeEventListener('vocabulary-notes-updated', () => {});
  window.removeEventListener('scroll', handleScroll);
  // Clean up modal-open class
  document.body.classList.remove('modal-open');
});
</script>

<style>
/* Global styles for modal */
body.modal-open {
  overflow: hidden !important;
}

/* Sticky button fade-scale transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
