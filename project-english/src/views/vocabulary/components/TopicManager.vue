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

            <!-- Content -->
            <div class="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 overflow-y-auto min-h-0">
              <!-- Search Input -->
              <div class="mb-4 sm:mb-6 md:mb-5 lg:mb-6 animate-fade-in-up">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="t('vocabulary.topicManager.searchPlaceholder', 'Search topics by name...')"
                    class="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-dark-bg-mute rounded-lg 
                           bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Add New Topic Form -->
              <div class="mb-4 sm:mb-6 md:mb-5 lg:mb-6 p-3 sm:p-4 md:p-4 lg:p-5 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg animate-fade-in-up" style="animation-delay: 0.1s">
                <h3 class="text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4 flex items-center">
                  <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                  {{ editingTopic ? t('vocabulary.topicManager.editTopic', 'Edit Topic') : t('vocabulary.topicManager.addNewTopic', 'Add New Topic') }}
                </h3>
                
                <div class="space-y-4 sm:space-y-4 md:space-y-3 lg:space-y-4">
                  <!-- Topic Key is now auto-generated, hidden from UI -->

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-3 lg:gap-4">
                    <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                      <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-3 bg-purple-500 rounded mr-2"></span>
                        {{ t('vocabulary.topicManager.vietnameseName', 'Vietnamese Name') }}
                      </label>
                      <input
                        v-model="newTopic.vi"
                        type="text"
                        :placeholder="t('vocabulary.topicManager.vietnameseNamePlaceholder', 'Tên tiếng Việt')"
                        class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02]"
                      />
                    </div>

                    <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                      <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-3 bg-orange-500 rounded mr-2"></span>
                        {{ t('vocabulary.topicManager.englishName', 'English Name') }}
                      </label>
                      <input
                        v-model="newTopic.en"
                        type="text"
                        :placeholder="t('vocabulary.topicManager.englishNamePlaceholder', 'English name')"
                        class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                               focus:ring-2 focus:ring-orange-500 focus:border-transparent
                               transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]"
                      />
                    </div>

                    <div class="animate-fade-in-up" style="animation-delay: 0.5s">
                      <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-3 bg-green-500 rounded mr-2"></span>
                        {{ t('vocabulary.topicManager.koreanName', 'Korean Name') }}
                      </label>
                      <input
                        v-model="newTopic.ko"
                        type="text"
                        :placeholder="t('vocabulary.topicManager.koreanNamePlaceholder', '한국어 이름')"
                        class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                               focus:ring-2 focus:ring-green-500 focus:border-transparent
                               transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div class="flex gap-3 sm:gap-4 md:gap-3 lg:gap-4 animate-fade-in-up" style="animation-delay: 0.6s">
                    <button
                      @click="saveTopic"
                      :disabled="!canSaveTopic"
                      class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 
                             text-white text-sm md:text-sm lg:text-base rounded-lg transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg font-medium"
                    >
                      {{ editingTopic ? t('common.update', 'Update') : t('common.add', 'Add') }}
                    </button>
                    
                    <button
                      v-if="editingTopic"
                      @click="cancelEdit"
                      class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm md:text-sm lg:text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                    >
                      {{ t('common.cancel', 'Cancel') }}
                    </button>
                  </div>
                </div>
              </div>

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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Topic {
  key: string
  vi: string
  en: string
  ko: string
}

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

// Pagination constants
const ITEMS_PER_PAGE = 3

// State
const customTopics = ref<Topic[]>([])
const editingTopic = ref<Topic | null>(null)
const topicToDelete = ref<Topic | null>(null)
const searchQuery = ref('')
const currentCustomPage = ref(1)
const currentBuiltInPage = ref(1)

const newTopic = ref<Topic>({
  key: '',
  vi: '',
  en: '',
  ko: ''
})

// Computed
const canSaveTopic = computed(() => {
  return newTopic.value.vi?.trim() && 
         newTopic.value.en?.trim() &&
         newTopic.value.ko?.trim()
})

const builtInTopics = computed(() => {
  return [
    { key: 'technology', vi: 'Công nghệ', en: 'Technology', ko: '기술' },
    { key: 'business', vi: 'Kinh doanh', en: 'Business', ko: '비즈니스' },
    { key: 'travel', vi: 'Du lịch', en: 'Travel', ko: '여행' },
    { key: 'food', vi: 'Ẩm thực', en: 'Food', ko: '음식' },
    { key: 'health', vi: 'Sức khỏe', en: 'Health', ko: '건강' },
    { key: 'education', vi: 'Giáo dục', en: 'Education', ko: '교육' },
    { key: 'sports', vi: 'Thể thao', en: 'Sports', ko: '스포츠' },
    { key: 'entertainment', vi: 'Giải trí', en: 'Entertainment', ko: '엔터테인먼트' },
    { key: 'science', vi: 'Khoa học', en: 'Science', ko: '과학' },
    { key: 'art', vi: 'Nghệ thuật', en: 'Art', ko: '예술' },
    { key: 'music', vi: 'Âm nhạc', en: 'Music', ko: '음악' },
    { key: 'literature', vi: 'Văn học', en: 'Literature', ko: '문학' },
    { key: 'politics', vi: 'Chính trị', en: 'Politics', ko: '정치' },
    { key: 'environment', vi: 'Môi trường', en: 'Environment', ko: '환경' },
    { key: 'fashion', vi: 'Thời trang', en: 'Fashion', ko: '패션' },
    { key: 'finance', vi: 'Tài chính', en: 'Finance', ko: '금융' }
  ]
})

// Search and filter functionality
const filteredCustomTopics = computed(() => {
  if (!searchQuery.value.trim()) {
    return customTopics.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return customTopics.value.filter(topic => 
    (topic.key || '').toLowerCase().includes(query) ||
    (topic.vi || '').toLowerCase().includes(query) ||
    (topic.en || '').toLowerCase().includes(query) ||
    (topic.ko || '').toLowerCase().includes(query)
  )
})

const filteredBuiltInTopics = computed(() => {
  if (!searchQuery.value.trim()) {
    return builtInTopics.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return builtInTopics.value.filter(topic => 
    (topic.key || '').toLowerCase().includes(query) ||
    (topic.vi || '').toLowerCase().includes(query) ||
    (topic.en || '').toLowerCase().includes(query) ||
    (topic.ko || '').toLowerCase().includes(query)
  )
})

// Pagination for custom topics
const totalCustomPages = computed(() => {
  return Math.ceil(filteredCustomTopics.value.length / ITEMS_PER_PAGE)
})

const paginatedCustomTopics = computed(() => {
  const start = (currentCustomPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredCustomTopics.value.slice(start, end)
})

// Pagination for built-in topics
const totalBuiltInPages = computed(() => {
  return Math.ceil(filteredBuiltInTopics.value.length / ITEMS_PER_PAGE)
})

const paginatedBuiltInTopics = computed(() => {
  const start = (currentBuiltInPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredBuiltInTopics.value.slice(start, end)
})

// Windowed pagination - show max 3 page numbers
const visibleCustomPages = computed(() => {
  const total = totalCustomPages.value
  const current = currentCustomPage.value
  const maxVisible = 3
  
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const visibleBuiltInPages = computed(() => {
  const total = totalBuiltInPages.value
  const current = currentBuiltInPage.value
  const maxVisible = 3
  
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Debug computed property
const showDeleteModal = computed(() => {
  console.log('showDeleteModal computed - topicToDelete:', topicToDelete.value)
  return !!topicToDelete.value
})

// Auto-generate topic key from Vietnamese or English name
const generateTopicKey = (vi: string, en: string): string => {
  // Use Vietnamese name first, fall back to English if VI is empty
  const sourceName = vi.trim() || en.trim()
  
  if (!sourceName) return ''
  
  // Convert to lowercase, remove accents, replace spaces/special chars with underscores
  let key = sourceName.toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^a-z0-9]/g, '_') // Replace non-alphanumeric with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
  
  // Ensure uniqueness by checking against existing topics
  let counter = 1
  let originalKey = key
  
  while (isKeyTaken(key)) {
    key = `${originalKey}_${counter}`
    counter++
  }
  
  return key
}

// Check if a topic key is already taken
const isKeyTaken = (key: string): boolean => {
  // Check against built-in topics
  const builtInKeys = builtInTopics.value.map(topic => topic.key)
  if (builtInKeys.includes(key)) return true
  
  // Check against existing custom topics (excluding current editing topic)
  const existingKeys = customTopics.value
    .filter(topic => editingTopic.value ? topic.key !== editingTopic.value.key : true)
    .map(topic => topic.key)
  
  return existingKeys.includes(key)
}

// Methods
const loadCustomTopics = () => {
  try {
    const saved = localStorage.getItem('customTopics')
    console.log('Loading custom topics from localStorage:', saved)
    
    if (saved) {
      const parsed = JSON.parse(saved)
      console.log('Parsed custom topics:', parsed)
      
      if (Array.isArray(parsed)) {
        customTopics.value = parsed
        console.log('Custom topics loaded successfully:', customTopics.value)
      } else {
        console.log('Invalid data format, resetting to empty array')
        customTopics.value = []
        localStorage.removeItem('customTopics')
      }
    } else {
      console.log('No custom topics found in localStorage')
      customTopics.value = []
    }
    
    console.log('Final custom topics loaded:', customTopics.value)
  } catch (error) {
    console.error('Error loading custom topics:', error)
    customTopics.value = []
    localStorage.removeItem('customTopics')
  }
}

const saveCustomTopics = () => {
  try {
    console.log('Saving custom topics to localStorage:', customTopics.value)
    localStorage.setItem('customTopics', JSON.stringify(customTopics.value))
    console.log('Custom topics saved successfully')
  } catch (error) {
    console.error('Error saving custom topics:', error)
  }
}

const saveTopic = () => {
  if (!canSaveTopic.value) return

  // Auto-generate key based on Vietnamese/English names
  const generatedKey = editingTopic.value 
    ? editingTopic.value.key // Keep existing key when editing
    : generateTopicKey(newTopic.value.vi, newTopic.value.en)

  const topic: Topic = {
    key: generatedKey,
    vi: newTopic.value.vi.trim(),
    en: newTopic.value.en.trim(),
    ko: newTopic.value.ko.trim()
  }

  if (editingTopic.value) {
    // Update existing topic
    const index = customTopics.value.findIndex(t => t.key === editingTopic.value!.key)
    if (index !== -1) {
      const oldKey = customTopics.value[index].key
      customTopics.value[index] = topic
      saveCustomTopics()
      emit('topic-updated', oldKey, topic)
      notifyTopicsUpdated() // Notify about topic update
    }
    editingTopic.value = null
  } else {
    // Add new topic - key is auto-generated and unique
    customTopics.value.push(topic)
    saveCustomTopics()
    emit('topic-added', topic)
    notifyTopicsUpdated() // Notify about topic addition
  }

  // Reset form
  newTopic.value = { key: '', vi: '', en: '', ko: '' }
}

const editTopic = (topic: Topic) => {
  editingTopic.value = { ...topic }
  newTopic.value = { ...topic }
}

const cancelEdit = () => {
  editingTopic.value = null
  newTopic.value = { key: '', vi: '', en: '', ko: '' }
}

const confirmDeleteTopic = (topic: Topic) => {
  console.log('Confirming delete for topic:', topic)
  topicToDelete.value = topic
  console.log('topicToDelete set to:', topicToDelete.value)
}

const deleteTopic = () => {
  if (!topicToDelete.value) {
    console.log('No topic to delete')
    return
  }

  console.log('Attempting to delete topic:', topicToDelete.value)
  console.log('Current custom topics:', customTopics.value)

  const index = customTopics.value.findIndex(t => t.key === topicToDelete.value!.key)
  console.log('Found index:', index)

  if (index !== -1) {
    const key = customTopics.value[index].key
    console.log('Deleting topic with key:', key)
    
    // Force reactive update by creating a new array
    const updatedTopics = [...customTopics.value]
    updatedTopics.splice(index, 1)
    customTopics.value = updatedTopics
    
    console.log('Topics after deletion:', customTopics.value)
    
    saveCustomTopics()
    emit('topic-deleted', key)
    notifyTopicsUpdated() // Notify about topic deletion
    
    console.log('Topic deleted successfully')
  } else {
    console.log('Topic not found in custom topics')
  }

  topicToDelete.value = null
}

// Helper to notify about topic changes
const notifyTopicsUpdated = () => {
  // Dispatch a custom event to notify all components about topic changes
  window.dispatchEvent(new CustomEvent('topics-updated'))
  console.log('Topics updated, dispatching topics-updated event')
}

const getTopicUsageCount = (key: string): number => {
  return props.vocabularyUsage[key] || 0
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

// Force reload custom topics
const reloadCustomTopics = () => {
  console.log('Force reloading custom topics')
  loadCustomTopics()
  // Force a reactive update
  customTopics.value = [...customTopics.value]
}

// Clear all custom topics (for testing)
const clearAllCustomTopics = () => {
  console.log('Clearing all custom topics')
  customTopics.value = []
  localStorage.removeItem('customTopics')
  console.log('All custom topics cleared')
}

// Test delete modal
const testDeleteModal = () => {
  console.log('Testing delete modal')
  topicToDelete.value = {
    key: 'test',
    vi: 'Test Topic',
    en: 'Test Topic',
    ko: '테스트 토픽'
  }
  console.log('Test topic set:', topicToDelete.value)
}

// Lifecycle
onMounted(() => {
  if (props.modelValue) {
    loadCustomTopics()
    // Only disable body scroll if dialog is actually open
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  // Always restore body scroll on unmount
  document.body.style.overflow = ''
})

// Watch for search query changes - reset pagination
watch(searchQuery, () => {
  currentCustomPage.value = 1
  currentBuiltInPage.value = 1
})

// Watch for dialog open/close
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    loadCustomTopics()
  } else {
    // Always restore body scroll when closing
    document.body.style.overflow = ''
    // Reset form when closing
    editingTopic.value = null
    newTopic.value = { key: '', vi: '', en: '', ko: '' }
    topicToDelete.value = null
    // Reset search and pagination
    searchQuery.value = ''
    currentCustomPage.value = 1
    currentBuiltInPage.value = 1
  }
}, { immediate: true })
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
</style>
