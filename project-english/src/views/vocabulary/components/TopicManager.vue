<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
        <div 
         v-if="modelValue" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
       >
        <!-- Dialog Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="flex-shrink-0 flex flex-row items-center justify-between p-4 sm:p-6 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 space-x-4 sm:space-x-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
              <div class="flex-1 min-w-0">
                <h2 class="text-base sm:text-lg md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-0 flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>{{ t('vocabulary.topicManager.title', 'Topic Manager') }}</span>
                </h2>
              </div>
              <button
                @click="closeDialog"
                class="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 dark:bg-dark-bg-soft dark:text-white/70 dark:hover:text-white dark:hover:bg-dark-bg-mute transition-all duration-300 hover:scale-110 hover:rotate-90 hover:dark:bg-gray-800"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Compact Sticky Header -->
            <div class="sticky top-0 z-10 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-dark-bg-mute">
              <!-- Search Section -->
              <div class="px-4 py-3 border-b border-gray-100 dark:border-dark-bg-mute">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="t('vocabulary.topicManager.searchPlaceholder', 'Search topics by name...')"
                    class="w-full px-4 py-2.5 pl-10 border-2 animated-search-border rounded-lg 
                           bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm
                           focus:ring-2 focus:ring-blue-500/50
                           transition-all duration-300 shadow-sm"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Compact Add Topic Form -->
              <div class="px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a]">
                <div class="flex items-center gap-2 mb-2">
                  <span class="w-1 h-3 bg-blue-500 rounded"></span>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ editingTopic ? t('vocabulary.topicManager.editTopic', 'Edit Topic') : t('vocabulary.topicManager.addNewTopic', 'Add New Topic') }}
                  </h3>
                </div>
                
                <div class="flex flex-wrap gap-2">
                  <!-- Vietnamese Input -->
                  <div class="flex-1 min-w-[200px]">
                    <input
                      v-model="newTopic.vi"
                      type="text"
                      :placeholder="t('vocabulary.topicManager.vietnameseNamePlaceholder', 'Tên tiếng Việt')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm
                             focus:ring-1 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-300"
                    />
                  </div>

                  <!-- English Input -->
                  <div class="flex-1 min-w-[200px]">
                    <input
                      v-model="newTopic.en"
                      type="text"
                      :placeholder="t('vocabulary.topicManager.englishNamePlaceholder', 'English name')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm
                             focus:ring-1 focus:ring-orange-500 focus:border-transparent
                             transition-all duration-300"
                    />
                  </div>

                  <!-- Korean Input -->
                  <div class="flex-1 min-w-[200px]">
                    <input
                      v-model="newTopic.ko"
                      type="text"
                      :placeholder="t('vocabulary.topicManager.koreanNamePlaceholder', '한국어 이름')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm
                             focus:ring-1 focus:ring-green-500 focus:border-transparent
                             transition-all duration-300"
                    />
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-2">
                    <button
                      @click="saveTopic"
                      :disabled="!canSaveTopic"
                      class="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                             disabled:from-gray-400 disabled:to-gray-500 text-white text-sm rounded-md 
                             transition-all duration-300 disabled:cursor-not-allowed font-medium"
                    >
                      {{ editingTopic ? t('common.update', 'Update') : t('common.add', 'Add') }}
                    </button>
                    
                    <button
                      v-if="editingTopic"
                      @click="cancelEdit"
                      class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md 
                             transition-all duration-300 font-medium"
                    >
                      {{ t('common.cancel', 'Cancel') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 overflow-y-auto min-h-0">

              <!-- Topics List -->
              <div class="animate-fade-in-up" style="animation-delay: 0.6s">
                <h3 class="text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4 flex items-center">
                  <span class="w-1 h-4 bg-indigo-500 rounded mr-2"></span>
                  {{ t('vocabulary.topicManager.existingTopics', 'Custom Topics') }}
                </h3>

                <div v-if="customTopics.length === 0" class="text-center py-6 sm:py-8 md:py-6 lg:py-8 text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                  {{ t('vocabulary.topicManager.noCustomTopics', 'No custom topics created yet') }}
                </div>

                <div v-else class="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
                  <div
                    v-for="(topic, index) in paginatedCustomTopics"
                    :key="topic.key"
                    class="flex items-center justify-between p-3 sm:p-4 md:p-3 lg:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                    :style="{ animationDelay: `${0.7 + index * 0.1}s` }"
                  >
                    <div class="flex-1">
                      <div class="flex items-center gap-4 sm:gap-4 mb-2">
                        <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                                     text-xs font-medium rounded">
                          {{ topic.key }}
                        </span>
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                          ({{ getTopicUsageCount(topic.key) }} {{ t('vocabulary.words', 'words') }})
                        </span>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                        <div>
                          <span class="font-medium">VI:</span> {{ topic.vi }}
                        </div>
                        <div>
                          <span class="font-medium">EN:</span> {{ topic.en }}
                        </div>
                        <div>
                          <span class="font-medium">KO:</span> {{ topic.ko }}
                        </div>
                      </div>
                    </div>

                    <div class="flex gap-3 sm:gap-4 ml-4">
                      <button
                        @click="editTopic(topic)"
                        class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 
                               hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:scale-110"
                        :title="t('common.edit', 'Edit')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <button
                        @click="confirmDeleteTopic(topic)"
                        :disabled="getTopicUsageCount(topic.key) > 0"
                        class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 
                               hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:scale-110
                               disabled:text-gray-400 disabled:cursor-not-allowed"
                        :title="getTopicUsageCount(topic.key) > 0 ? t('vocabulary.topicManager.cannotDeleteInUse', 'Cannot delete topic in use') : t('common.delete', 'Delete')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Custom Topics Pagination -->
                  <div v-if="filteredCustomTopics.length > ITEMS_PER_PAGE" class="flex justify-center mt-6">
                    <div class="flex items-center space-x-1">
                      <button
                        @click="currentCustomPage--"
                        :disabled="currentCustomPage === 1"
                        class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 
                               hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-300"
                      >
                        ‹
                      </button>
                      
                      <button
                        v-for="page in visibleCustomPages"
                        :key="page"
                        @click="currentCustomPage = page"
                        :class="[
                          'px-3 py-2 rounded-lg text-sm transition-all duration-300',
                          currentCustomPage === page
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft'
                        ]"
                      >
                        {{ page }}
                      </button>
                      
                      <button
                        @click="currentCustomPage++"
                        :disabled="currentCustomPage === totalCustomPages"
                        class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 
                               hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-300"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Built-in Topics List -->
              <div class="mt-6 animate-fade-in-up" style="animation-delay: 0.8s">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <span class="w-1 h-4 bg-teal-500 rounded mr-2"></span>
                  {{ t('vocabulary.topicManager.builtInTopics', 'Built-in Topics') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {{ t('vocabulary.topicManager.builtInTopicsDescription', 'These are system-provided topics that cannot be modified') }}
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div
                    v-for="(topic, index) in paginatedBuiltInTopics"
                    :key="topic.key"
                    class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                    :style="{ animationDelay: `${0.9 + index * 0.05}s` }"
                  >
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                                     text-xs font-medium rounded">
                          {{ topic.key }}
                        </span>
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                          ({{ getTopicUsageCount(topic.key) }} {{ t('vocabulary.words', 'words') }})
                        </span>
                      </div>
                      <div class="grid grid-cols-1 gap-1 text-sm">
                        <div>
                          <span class="font-medium">VI:</span> {{ topic.vi }}
                        </div>
                        <div>
                          <span class="font-medium">EN:</span> {{ topic.en }}
                        </div>
                        <div>
                          <span class="font-medium">KO:</span> {{ topic.ko }}
                        </div>
                      </div>
                    </div>
                    
                    <div class="ml-4">
                      <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 
                                   text-xs font-medium rounded">
                        {{ t('vocabulary.topicManager.builtIn', 'Built-in') }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Built-in Topics Pagination -->
                <div v-if="filteredBuiltInTopics.length > ITEMS_PER_PAGE" class="flex justify-center mt-6">
                  <div class="flex items-center space-x-1">
                    <button
                      @click="currentBuiltInPage--"
                      :disabled="currentBuiltInPage === 1"
                      class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 
                             hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300"
                    >
                      ‹
                    </button>
                    
                    <button
                      v-for="page in visibleBuiltInPages"
                      :key="page"
                      @click="currentBuiltInPage = page"
                      :class="[
                        'px-3 py-2 rounded-lg text-sm transition-all duration-300',
                        currentBuiltInPage === page
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-bg-soft'
                      ]"
                    >
                      {{ page }}
                    </button>
                    
                    <button
                      @click="currentBuiltInPage++"
                      :disabled="currentBuiltInPage === totalBuiltInPages"
                      class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg-mute text-gray-600 dark:text-gray-400 
                             hover:bg-gray-200 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex-shrink-0 flex justify-end p-4 sm:p-6 border-t border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
              <button
                @click="closeDialog"
                class="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                       text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm sm:text-base
                       animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style="animation-delay: 0.1s"
              >
                {{ t('common.finish', 'Finish') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showDeleteModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm"
        @click.self="topicToDelete = null"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl max-w-md w-full" @click.stop>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <span class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                {{ t('vocabulary.topicManager.confirmDeleteTitle', 'Confirm Delete') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                {{ t('vocabulary.topicManager.confirmDeleteMessage', { topic: topicToDelete?.vi || topicToDelete?.en || 'this topic' }, `Are you sure you want to delete "${topicToDelete?.vi || topicToDelete?.en || 'this topic'}"?`) }}
              </p>
              <div class="flex gap-3 justify-end">
                <button
                  @click="topicToDelete = null"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  {{ t('common.cancel', 'Cancel') }}
                </button>
                <button
                  @click="deleteTopic"
                  class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                >
                  {{ t('common.delete', 'Delete') }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTopicCRUD, type Topic } from './composables/useTopicCRUD'
import { useTopicSearch } from './composables/useTopicSearch'
import { useTopicPagination } from './composables/useTopicPagination'
import { useTopicModal } from './composables/useTopicModal'
import { useBuiltInTopics } from './composables/useBuiltInTopics'

interface Props {
  modelValue: boolean
  vocabularyUsage?: Record<string, number>
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'topic-added', topic: Topic): void
  (e: 'topic-updated', oldKey: string, topic: Topic): void
  (e: 'topic-deleted', key: string): void
}

const props = withDefaults(defineProps<Props>(), {
  vocabularyUsage: () => ({})
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

// Convert modelValue to reactive ref for composables
const modelValueRef = toRef(props, 'modelValue')

// Initialize composables
const topicCRUD = useTopicCRUD(emit)
const { builtInTopics } = useBuiltInTopics()
const topicSearch = useTopicSearch(topicCRUD.customTopics, builtInTopics)
const topicPagination = useTopicPagination(
  topicSearch.filteredCustomTopics,
  topicSearch.filteredBuiltInTopics,
  topicSearch.searchQuery
)
const topicModal = useTopicModal(
  modelValueRef,
  emit,
  topicCRUD.resetForm,
  topicSearch.resetSearch,
  topicPagination.resetPagination,
  topicCRUD.loadCustomTopics
)

// Extract commonly used properties for template
const {
  customTopics,
  editingTopic,
  topicToDelete,
  newTopic,
  canSaveTopic,
  showDeleteModal,
  saveTopic,
  editTopic,
  cancelEdit,
  confirmDeleteTopic,
  deleteTopic,
  reloadCustomTopics,
  clearAllCustomTopics,
  testDeleteModal
} = topicCRUD

const { searchQuery, filteredCustomTopics, filteredBuiltInTopics } = topicSearch

const {
  ITEMS_PER_PAGE,
  currentCustomPage,
  currentBuiltInPage,
  totalCustomPages,
  totalBuiltInPages,
  paginatedCustomTopics,
  paginatedBuiltInTopics,
  visibleCustomPages,
  visibleBuiltInPages
} = topicPagination

const { closeDialog } = topicModal

// Helper function for getting topic usage count
const getTopicUsageCount = (key: string): number => {
  return props.vocabularyUsage[key] || 0
}
</script>

<style scoped>
/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Enhanced hover effects for form inputs */
input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Loading animation for submit button */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth dialog entrance */
.dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px) rotate(1deg);
}

.dialog-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0) rotate(0deg);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced focus states */
input:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Smooth scale transitions */
.transform {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button states */
button:active {
  transform: scale(0.95);
}

/* Smooth color transitions */
.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Enhanced border radius */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Enhanced hover effects for interactive elements */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth rotation effects */
.hover\:rotate-90:hover {
  transform: rotate(90deg);
}

/* Enhanced shadow on hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Disabled state styling */
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

/* Topic card hover effects */
.topic-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.topic-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Stagger animation delays for topic items */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
.animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
.animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
.animate-fade-in-up:nth-child(7) { animation-delay: 0.7s; }
.animate-fade-in-up:nth-child(8) { animation-delay: 0.8s; }
.animate-fade-in-up:nth-child(9) { animation-delay: 0.9s; }
.animate-fade-in-up:nth-child(10) { animation-delay: 1.0s; }
.animate-fade-in-up:nth-child(11) { animation-delay: 1.1s; }
.animate-fade-in-up:nth-child(12) { animation-delay: 1.2s; }

/* Enhanced form section styling */
.form-section {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

/* Enhanced button gradients */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.4);
}

/* Enhanced input styling */
.input-enhanced {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
}

.input-enhanced:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Dark mode enhancements */
.dark .input-enhanced {
  background: linear-gradient(#0a0a0a, #0a0a0a) padding-box,
              linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
}

/* Enhanced topic badges */
.topic-badge {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
  transition: all 0.3s ease;
}

.topic-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.dark .topic-badge {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border: 1px solid #3b82f6;
}

/* Enhanced built-in topic styling */
.built-in-badge {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #86efac;
  transition: all 0.3s ease;
}

.built-in-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.dark .built-in-badge {
  background: linear-gradient(135deg, #14532d 0%, #166534 100%);
  border: 1px solid #22c55e;
}

/* Animated Search Border */
@keyframes borderColorCycle {
  0% {
    border-color: #d1d5db; /* gray-300 */
  }
  25% {
    border-color: #3b82f6; /* blue-500 */
  }
  50% {
    border-color: #8b5cf6; /* purple-500 */
  }
  75% {
    border-color: #10b981; /* emerald-500 */
  }
  100% {
    border-color: #d1d5db; /* gray-300 */
  }
}

@keyframes borderColorCycleDark {
  0% {
    border-color: #0f0f0f; /* dark-bg-mute */
  }
  25% {
    border-color: #3b82f6; /* blue-500 */
  }
  50% {
    border-color: #8b5cf6; /* purple-500 */
  }
  75% {
    border-color: #10b981; /* emerald-500 */
  }
  100% {
    border-color: #0f0f0f; /* dark-bg-mute */
  }
}

.animated-search-border {
  animation: borderColorCycle 4s ease-in-out infinite;
}

.dark .animated-search-border {
  animation: borderColorCycleDark 4s ease-in-out infinite;
}

</style>
