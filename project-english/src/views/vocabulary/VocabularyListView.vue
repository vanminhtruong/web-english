<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden">
    <!-- Animated Background Elements to match Dashboard style -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <!-- Extra decorative balls (responsive, subtle, non-intrusive) -->
        <div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div>
        <div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div>
        <div class="hidden md:block absolute top-1/3 right-1/3 w-36 h-36 bg-emerald-300 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-1500"></div>
        <div class="hidden md:block absolute -bottom-20 -right-10 w-96 h-96 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-20 animate-blob animation-delay-2500"></div>
        <div class="hidden lg:block absolute top-1/2 -left-16 w-72 h-72 bg-fuchsia-300 dark:bg-fuchsia-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3500"></div>
        <div class="hidden xl:block absolute top-6 right-1/4 w-44 h-44 bg-teal-300 dark:bg-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-500"></div>
        <!-- Even more subtle orbs for depth -->
        <div class="hidden sm:block absolute top-1/4 left-6 w-24 h-24 bg-sky-300 dark:bg-sky-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-4500"></div>
        <div class="hidden sm:block absolute bottom-8 left-1/3 w-28 h-28 bg-rose-300 dark:bg-rose-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-5500"></div>
        <div class="hidden md:block absolute top-16 right-1/3 w-20 h-20 bg-violet-300 dark:bg-violet-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-6500"></div>
        <div class="hidden md:block absolute bottom-1/3 right-6 w-24 h-24 bg-lime-300 dark:bg-lime-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-7500"></div>
        <div class="hidden lg:block absolute top-3/4 left-1/4 w-32 h-32 bg-amber-300 dark:bg-amber-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-8500"></div>
        <div class="hidden lg:block absolute top-8 right-8 w-16 h-16 bg-orange-300 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-md opacity-25 animate-blob animation-delay-1200"></div>
        <div class="hidden xl:block absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-cyan-200 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-2200"></div>
        <div class="hidden 2xl:block absolute top-1/5 right-1/5 w-40 h-40 bg-indigo-200 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-5200"></div>
        <!-- Ultra subtle background depth orbs (desktop only) -->
        <div class="hidden lg:block absolute -top-24 left-1/3 w-96 h-96 bg-blue-100 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-900"></div>
        <div class="hidden lg:block absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] bg-purple-100 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-1900"></div>
        <div class="hidden xl:block absolute top-1/3 left-[70%] w-48 h-48 bg-pink-200 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-3300"></div>
        <div class="hidden xl:block absolute bottom-1/4 right-[35%] w-32 h-32 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-6100"></div>
        <div class="hidden 2xl:block absolute top-[12%] left-[12%] w-56 h-56 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-7100"></div>
        <div class="hidden 2xl:block absolute bottom-[8%] right-[12%] w-64 h-64 bg-teal-200 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-9100"></div>
      </div>
    </div>
    <!-- Header -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6">
      <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="0px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5"></div>
            </div>
            <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {{ t('vocabulary.header.title', 'Vocabulary') }}
            </h1>
          </div>
          <VocabularyHeader @add-vocabulary="openAddDialog" />
        </div>
      </LazyLoadComponent>
    </div>

    <!-- Filters and Search -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-50px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2.5"></div>
            </div>
            <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {{ t('vocabulary.filters.title', 'Filters') }}
            </h3>
          </div>
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
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2.5"></div>
            </div>
            <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              {{ t('vocabulary.grouping.title', 'Grouping & Move Mode') }}
            </h3>
          </div>
          <GroupingToggle 
            :model-value="useGrouping" 
            :hover-enabled="hoverToExpandEnabled"
            :move-mode="globalMoveMode"
            @update:model-value="toggleGrouping" 
            @update:hover-enabled="hoverToExpandEnabled = $event"
            @update:move-mode="globalMoveMode = $event"
          />
        </div>
      </LazyLoadComponent>

      <!-- Voice Settings Panel (glassmorphism like Dashboard) -->
      <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.01] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6 overflow-x-hidden">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2.5"></div>
            </div>
            <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {{ t('voice.settings.title', 'Voice Settings') }}
            </h3>
          </div>
          <VoiceSelector :show-voice-info="true" />
        </div>
      </LazyLoadComponent>

      <!-- Topic Management Panel -->
      <LazyLoadComponent animation-type="blur" :threshold="0.1" root-margin="-50px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2.5"></div>
            </div>
            <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
              {{ t('vocabulary.topicManager.title', 'Topic Manager') }}
            </h3>
          </div>
          <TopicManagerPanel @open="openTopicManager" />
        </div>
      </LazyLoadComponent>

      <!-- Save Control Panel -->
      <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="-50px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div class="flex items-center mb-4">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-2.5"></div>
            </div>
            <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              {{ t('vocabulary.save.title', 'Save & Sync') }}
            </h3>
          </div>
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
      <LazyLoadComponent animation-type="slide-left" :threshold="0.05" root-margin="-50px">
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.003] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
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
            :global-move-mode="globalMoveMode"
            :recently-added-category="recentlyAddedCategory"
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
            @move-vocabulary="handleMoveVocabulary"
            @open-note-dialog="openNoteDialog"
            @open-add-vocabulary-dialog="openAddVocabularyForDate"
            @open-grammar-manager="openGrammarManagerForDate"
            @batch-move-category="handleBatchMoveCategory"
          />
        </div>
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

    <!-- Grammar Manager Modal -->
    <GrammarManagerModal
      v-model="showGrammarManagerModal"
      :selectedDate="grammarManagerDate"
    />
    
    <!-- Sticky Floating Add Button -->
    <Transition name="fade-scale">
      <div 
        v-show="showStickyButtonVisible"
        class="fixed bottom-6 z-50 left-1/2 translate-x-4 md:translate-x-4 lg:left-auto lg:right-6 lg:translate-x-0"
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
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-dark-bg-mute rounded shadow-lg whitespace-nowrap z-50"
          >
            {{ t('vocabulary.addNew', 'Add New Word') }}
            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black"></div>
          </div>
        </button>
      </div>
    </Transition>

    <!-- Move Modal Component -->
    <MoveModal
      :show-modal="showMoveModal"
      :word-to-move="wordToMove"
      :available-date-groups="availableDateGroups"
      :source-date="currentSourceDate"
      :all-vocabularies="vocabularyStore.allVocabularies.value"
      @close="closeMoveModal"
      @confirm-move="confirmMove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast, POSITION } from 'vue-toastification';
import { useVoiceStore } from '../../stores/voiceStore';
import { useVocabularyStore } from '../../composables/useVocabularyStore';
import { useModalStore } from '../../stores/modalStore';
import { groupVocabulariesByDate } from '../../utils/dateUtils';
import { getTopicName } from '../../utils/topicUtils';
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
const GrammarManagerModal = defineAsyncComponent(() => import('./components/GrammarManagerModal.vue'));
// Temporarily use sync import for debugging
// const MoveModal = defineAsyncComponent(() => import('./components/move').then(m => ({ default: m.MoveModal })));
import { MoveModal } from './components/move';
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
import { useMoveMode } from './composables/useMoveMode';

const { t, locale } = useI18n();
const toast = useToast();
const vocabularyStore = useVocabularyStore();
const voiceStore = useVoiceStore();
const modalStore = useModalStore();

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

// Global Move Mode functionality with localStorage persistence
// Move Mode functionality using composable
const {
  globalMoveMode,
  showMoveModal,
  wordToMove,
  selectedTargetDate,
  availableDateGroups,
  currentSourceDate,
  toggleMoveMode,
  handleMoveVocabulary,
  handleBatchMoveCategory,
  closeMoveModal,
  confirmMove,
  formatDateForDisplay
} = useMoveMode()

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

// Store the category that should be at the top
const recentlyAddedCategory = ref<string | null>(null);

// Override onVocabularySaved to reset target date and reload grouping
const onVocabularySaved = (data?: { category: string }) => {
  originalOnVocabularySaved();
  targetDateForNewVocabulary.value = null;
  
  // Store the category that was just added to move it to the top
  if (data?.category) {
    recentlyAddedCategory.value = data.category;
    console.log('Recently added category:', data.category);
  }
  
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

// Only show categories that are actually used in vocabularies
const categories = computed(() => {
  const usedCategories = new Set(vocabularyStore.allVocabularies.value.map(vocab => vocab.category));
  return Array.from(usedCategories).sort();
});
const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value);

// Computed property to control sticky button visibility
const showStickyButtonVisible = computed(() => {
  return showStickyButton.value && !showFormDialog.value && !modalStore.shouldHideAddNewWord;
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
          toast.success(t('vocabulary.deleteSuccess', { word: word.word }) || `Successfully deleted "${word.word}"`);
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
  // Sync with modal store
  modalStore.setNoteDialog(newValue);
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
  // Sync with modal store
  modalStore.setVocabularyForm(newValue);
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

// Grammar manager modal state
const showGrammarManagerModal = ref(false);
const grammarManagerDate = ref<string | null>(null);

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

// Open grammar manager modal for specific date
const openGrammarManagerForDate = (date: string) => {
  console.log('Opening grammar manager for date:', date);
  grammarManagerDate.value = date;
  showGrammarManagerModal.value = true;
  modalStore.setGrammarManager(true);
  console.log('Modal state:', showGrammarManagerModal.value);
};

// Prevent body scroll when grammar manager modal is open
watch(showGrammarManagerModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open');
  } else {
    // Only remove if other dialogs are also closed
    if (!showNoteDialog.value && !showFormDialog.value) {
      document.body.classList.remove('modal-open');
    }
  }
  // Sync with modal store
  modalStore.setGrammarManager(newValue);
});

const handleNoteSaved = (note: string, markedWords: string[]) => {
  toast.success(t('vocabulary.notes.saveSuccess', 'Notes saved successfully'), {
    timeout: 2000,
  });
  
  // Check if auto-save is enabled
  if (autoSaveEnabled.value) {
    toast.info(t('vocabulary.notes.autoSaveNotice', 'Notes will be included in auto-save'), {
      timeout: 3000,
    });
    debounceAutoSave();
  }
  
  console.log(`Note saved for ${noteDialogDate.value} with ${markedWords.length} marked words`);
};

// Perform move vocabulary between date groups  
const performMoveVocabulary = (data: { word: any, targetDate: string }) => {
  try {
    // Find and update the word's createdAt and updatedAt to match target date
    const wordIndex = vocabularyStore.allVocabularies.value.findIndex(w => w.id === data.word.id)
    
    if (wordIndex !== -1) {
      // Update the vocabulary array using store method
      vocabularyStore.updateVocabulary(data.word.id, {
        createdAt: data.targetDate,
        updatedAt: data.targetDate
      })
      
      // Show success message
      toast.success(
        t('vocabulary.moveSuccess', 
          { word: data.word.word, date: new Date(data.targetDate).toLocaleDateString() },
          `Successfully moved "${data.word.word}" to ${new Date(data.targetDate).toLocaleDateString()}`
        ),
        { timeout: 3000 }
      )
      
      // Trigger auto-save if enabled
      if (autoSaveEnabled.value) {
        debounceAutoSave()
        toast.info(t('vocabulary.moveAutoSaveNotice', 'Word moved and will be included in auto-save'), {
          timeout: 2000,
        })
      }
      
      console.log(`Moved vocabulary "${data.word.word}" to ${data.targetDate}`)
    } else {
      throw new Error('Word not found')
    }
  } catch (error) {
    console.error('Failed to move vocabulary:', error)
    toast.error(
      t('vocabulary.moveError', 
        { word: data.word.word, error: (error as Error).message },
        `Failed to move "${data.word.word}": ${(error as Error).message}`
      ),
      { timeout: 5000 }
    )
  }
};



// Watch for changes and persist to localStorage
watch(hoverToExpandEnabled, (newValue) => {
  setStoredHoverState(newValue);
});

watch(globalMoveMode, (newValue) => {
  toggleMoveMode(newValue);
});

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

/* XS: Override animation to include Add New Word positioning */
@media (max-width: 639px) {
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(10px) translateX(1rem);
  }
  
  .fade-scale-enter-to,
  .fade-scale-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0) translateX(1rem);
  }
}
</style>
