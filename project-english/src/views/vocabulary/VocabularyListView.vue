<template>
  <div>
    <!-- Header -->
    <VocabularyHeader @add-vocabulary="openAddDialog" />

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
      
      <!-- Date Grouping Toggle -->
      <GroupingToggle :model-value="useGrouping" @update:model-value="toggleGrouping" />

      <!-- Voice Settings Panel -->
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <VoiceSelector :show-voice-info="true" />
      </div>

      <!-- Topic Management Panel -->
      <TopicManagerPanel @open="openTopicManager" />

      <!-- Save Control Panel -->
      <SaveControlPanel
        :auto-save-enabled="autoSaveEnabled"
        @update:auto-save-enabled="autoSaveEnabled = $event"
        :is-saving="isSaving"
        :has-auto-save-file="hasAutoSaveFile"
        :last-save-time="lastSaveTime"
        :save-status-color="getSaveStatusColor"
        :save-status-text="getSaveStatusText"
        @manual-save="manualSave"
        @setup-auto-save="setupAutoSaveFile"
        @reset-auto-save="resetAutoSaveFile"
        @import-file="handleFileImport"
      />

      <!-- Vocabulary List -->
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
      />
    </div>

    <!-- Vocabulary Form Dialog -->
    <VocabularyFormDialog
      v-model="showFormDialog"
      :vocabulary="selectedVocabulary"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast, POSITION } from 'vue-toastification';
import { useVoiceStore } from '../../stores/voiceStore';
import { useVocabularyStore } from '../../composables/useVocabularyStore';
import { groupVocabulariesByDate } from '../../utils/dateUtils';
import type { Vocabulary } from '../../composables/useVocabularyStore';

// Local components
const GroupingToggle = defineAsyncComponent(() => import('./components/GroupingToggle.vue'));
const TopicManagerPanel = defineAsyncComponent(() => import('./components/TopicManagerPanel.vue'));
const SaveControlPanel = defineAsyncComponent(() => import('./components/SaveControlPanel.vue'));
const VocabularyHeader = defineAsyncComponent(() => import('./components/VocabularyHeader.vue'));
const VocabularyFilters = defineAsyncComponent(() => import('./components/VocabularyFilters.vue'));
const VocabularyList = defineAsyncComponent(() => import('./components/VocabularyList.vue'));
const VocabularyFormDialog = defineAsyncComponent(() => import('./components/VocabularyFormDialog.vue'));
const VocabularyDetailDialog = defineAsyncComponent(() => import('./components/VocabularyDetailDialog.vue'));
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
  dateGroupPrevious,
  dateGroupNext,
  dateGroupGoToPage,
} = useVocabularyGrouping();

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
  onVocabularySaved,
  openDetailsDialog,
  openEditFromDetail,
} = useVocabularyDialogs();

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

onMounted(() => {
  vocabularyStore.initializeStore();
  if (autoSaveEnabled.value) {
    scheduleAutoSave();
  }
});

onUnmounted(() => {
  // Clear timers
});
</script>
