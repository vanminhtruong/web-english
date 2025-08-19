<template>
  <div class="space-y-4">
    <div
      v-for="(group, topicKey) in groupedVocabulary"
      :key="topicKey"
      class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.002]"
    >
      <!-- Topic Header with Accordion Toggle -->
      <div 
        @click="toggleGroup(topicKey)"
        class="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-[#0a0a0a]/20 rounded-t-2xl transition-all duration-300"
      >
        <div class="flex items-center space-x-3">
          <div class="animate-pulse-slow">
            <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          <div>
            <h3 class="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {{ getTopicName(topicKey) }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ group.length }} {{ group.length === 1 ? t('vocabulary.word', 'word') : t('vocabulary.words', 'words') }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Examples count -->
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ getTotalExamplesForTopic(group) }} {{ t('vocabulary.examples.examples', 'examples') }}
          </span>
          
          <!-- Accordion toggle icon -->
          <svg 
            class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300"
            :class="{ 'rotate-180': expandedGroups[topicKey] }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Vocabulary Content (Collapsible) -->
      <transition
        name="accordion"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-if="expandedGroups[topicKey]" class="accordion-content border-t border-gray-200/50 dark:border-gray-700/50">
          <div class="p-4 space-y-4">
            <div
              v-for="vocab in group"
              :key="vocab.id"
              class="bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-4 hover:shadow-lg transition-all duration-300"
            >
              <!-- Vocabulary Header -->
              <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200/30 dark:border-gray-700/30">
                <div class="flex items-center space-x-3">
                  <div class="animate-pulse-slow">
                    <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <h4 class="text-base font-bold text-gray-900 dark:text-white">{{ vocab.word }}</h4>
                      <button
                        @click="playVocabularyAudio(vocab.word)"
                        class="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded transition-all duration-300 group"
                        :title="t('vocabulary.examples.playPronunciation', 'Play pronunciation')"
                      >
                        <svg class="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z" />
                        </svg>
                      </button>
                      <!-- Examples Toggle Button -->
                      <button
                        v-if="getVocabExampleCount(vocab.id) > 0"
                        @click="toggleVocabExamples(vocab.id)"
                        class="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded transition-all duration-300 group"
                        :title="expandedVocabExamples[vocab.id] ? t('vocabulary.examples.hideExamples', 'Hide examples') : t('vocabulary.examples.showExamples', 'Show examples')"
                      >
                        <svg 
                          class="w-3.5 h-3.5 group-hover:scale-110 transition-all duration-200" 
                          :class="{ 'rotate-180': expandedVocabExamples[vocab.id] }"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ vocab.meaning }}</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        {{ vocab.partOfSpeech }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ getVocabExampleCount(vocab.id) }} {{ getVocabExampleCount(vocab.id) === 1 ? 'example' : 'examples' }}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  @click="$emit('add-example', vocab)"
                  class="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-sm">{{ t('vocabulary.examples.addExample', 'Add Example') }}</span>
                </button>
              </div>

              <!-- Examples for this vocabulary (Collapsible) -->
              <transition
                name="vocab-examples-accordion"
                @enter="vocabExamplesEnter"
                @after-enter="vocabExamplesAfterEnter"
                @leave="vocabExamplesLeave"
                @after-leave="vocabExamplesAfterLeave"
              >
                <div v-if="expandedVocabExamples[vocab.id]" class="vocab-examples-accordion-content space-y-2">
                  <div v-if="getVocabExamples(vocab.id).length === 0" class="text-center py-3 text-gray-500 dark:text-gray-400">
                    <svg class="mx-auto h-6 w-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-xs">{{ t('vocabulary.examples.noExamplesForWord', 'No examples yet') }}</p>
                  </div>

                  <div
                    v-for="example in getPaginatedVocabExamples(vocab.id)"
                    :key="example.id"
                    class="bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 p-3 hover:shadow-md transition-all duration-300"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                :class="getTypeColorClass(example.type)">
                            {{ getTypeLabel(example.type) }}
                          </span>
                          <span v-if="example.difficulty" class="text-sm" :class="getDifficultyColorClass(example.difficulty)">
                            {{ getDifficultyLabel(example.difficulty) }}
                          </span>
                        </div>
                        
                        <div class="mb-2">
                          <div class="flex items-center justify-between">
                            <p class="text-gray-900 dark:text-white font-medium text-sm">{{ example.title }}</p>
                            <button
                              @click="playExampleAudio(example.content)"
                              class="p-1 text-green-600 hover:text-green-700 hover:bg-green-50/50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 rounded transition-all duration-300 group"
                              :title="t('vocabulary.examples.playExample', 'Play example')"
                            >
                              <svg class="w-3 h-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z" />
                              </svg>
                            </button>
                          </div>
                          <p class="text-gray-700 dark:text-gray-300 mt-1 text-sm">{{ example.content }}</p>
                          <p v-if="example.translation" class="text-gray-600 dark:text-gray-400 text-xs mt-1 italic">
                            {{ example.translation }}
                          </p>
                        </div>

                        <div v-if="example.tags && example.tags.length > 0" class="flex flex-wrap gap-1">
                          <span
                            v-for="tag in example.tags"
                            :key="tag"
                            class="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                      
                      <div class="flex items-center gap-1.5 ml-3">
                        <button
                          @click="$emit('edit-example', example)"
                          class="px-2 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-all duration-300 text-sm"
                        >
                          {{ t('common.edit', 'Edit') }}
                        </button>
                        <button
                          @click="deleteExample(example)"
                          class="px-2 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-md transition-all duration-300 text-sm"
                        >
                          {{ t('common.delete', 'Delete') }}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Examples Pagination -->
                  <div v-if="getVocabExamplePages(vocab.id) > 1" class="border-t border-white/20 dark:border-white/10 px-3 py-2 mt-3">
                    <div class="flex items-center justify-between">
                      <!-- Mobile Pagination (Simple) -->
                      <div class="flex sm:hidden items-center gap-2">
                        <button
                          @click="previousExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasPrevious"
                          class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.previous', 'Previous') }}
                        </button>
                        <span class="text-xs text-slate-600 dark:text-slate-400">
                          {{ getExamplePaginationInfo(vocab.id).currentPage }} / {{ getExamplePaginationInfo(vocab.id).totalPages }}
                        </span>
                        <button
                          @click="nextExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasNext"
                          class="px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.next', 'Next') }}
                        </button>
                      </div>
                      
                      <!-- Desktop Pagination (Full) -->
                      <div class="hidden sm:flex items-center gap-2">
                        <button
                          @click="previousExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasPrevious"
                          class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.previous', 'Previous') }}
                        </button>
                        
                        <div class="flex gap-1">
                          <button
                            v-for="page in Math.min(getExamplePaginationInfo(vocab.id).totalPages, 5)"
                            :key="page"
                            @click="goToExamplePage(vocab.id, page)"
                            :class="[
                              'px-3 py-1.5 text-sm rounded transition-colors',
                              getExamplePaginationInfo(vocab.id).currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                            ]"
                          >
                            {{ page }}
                          </button>
                        </div>
                        
                        <button
                          @click="nextExamplePage(vocab.id)"
                          :disabled="!getExamplePaginationInfo(vocab.id).hasNext"
                          class="px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          {{ t('common.next', 'Next') }}
                        </button>
                      </div>
                      
                      <!-- Examples count info -->
                      <div class="text-xs text-slate-500 dark:text-slate-400">
                        {{ t('vocabulary.examples.showingExamples', { start: getExamplePaginationInfo(vocab.id).start, end: getExamplePaginationInfo(vocab.id).end, total: getExamplePaginationInfo(vocab.id).totalExamples }, 'Showing {start} to {end} of {total} examples') }}
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- Pagination for Grouped View -->
    <div v-if="paginationInfo.totalPages > 1" class="mt-6 group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-4">
      <div class="flex items-center justify-between">
        <!-- Mobile pagination -->
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="previousPage" 
            :disabled="!paginationInfo.hasPrevious" 
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.previous', 'Previous') }}
          </button>
          <button 
            @click="nextPage" 
            :disabled="!paginationInfo.hasNext" 
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.next', 'Next') }}
          </button>
        </div>
        
        <!-- Desktop pagination -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ t('vocabulary.examples.showingTopics', { 
                start: paginationInfo.startIndex, 
                end: paginationInfo.endIndex, 
                total: paginationInfo.totalTopics 
              }, `Showing ${paginationInfo.startIndex} to ${paginationInfo.endIndex} of ${paginationInfo.totalTopics} topics`) }}
            </p>
          </div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <!-- Previous button -->
            <button 
              @click="previousPage" 
              :disabled="!paginationInfo.hasPrevious" 
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">{{ t('common.previous', 'Previous') }}</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Page numbers -->
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                page === currentPage
                  ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300'
                  : 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              ]"
            >
              {{ page }}
            </button>
            
            <!-- Next button -->
            <button 
              @click="nextPage" 
              :disabled="!paginationInfo.hasNext" 
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">{{ t('common.next', 'Next') }}</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TopicGroupAccordion">
import { ref, computed, watch, onMounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast, POSITION } from 'vue-toastification'
import { useVocabularyStore } from '../../../composables/useVocabularyStore'
import { useAudioSystem } from '../../practice/composables/bubble-shooter/useAudioSystem'
import { useTopicName } from '../../../utils/topicUtils'
const ExampleFormDialog = defineAsyncComponent(() => import('./ExampleFormDialog.vue'))
const ConfirmToast = defineAsyncComponent(() => import('../../../components/common/ConfirmToast.vue'))

interface Example {
  id: string
  vocabularyId: string
  vocabulary?: {
    id: string
    word: string
  }
  title: string
  content: string
  translation?: string
  context?: string
  type: 'sentence' | 'dialogue' | 'phrase' | 'context'
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
  createdAt: string
  updatedAt: string
}

interface Vocabulary {
  id: string
  word: string
  meaning: string
  partOfSpeech: string
  category: string
  level: string
}

interface Props {
  vocabularyList: Vocabulary[]
  examples: Example[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'add-example': [vocab: Vocabulary]
  'edit-example': [example: Example]
  'delete-example': [example: Example]
}>()

const { t } = useI18n()
const toast = useToast()
const vocabularyStore = useVocabularyStore()
const audioSystem = useAudioSystem()
const { getTopicName } = useTopicName()

// State for expanded groups - each topic can be expanded/collapsed independently
const expandedGroups = ref<Record<string, boolean>>({})

// State for expanded vocabularies examples - each vocabulary can expand/collapse its examples independently
const expandedVocabExamples = ref<Record<string, boolean>>({})

// Pagination state for examples within each vocabulary
const examplePages = ref<Record<string, number>>({})
const examplesPerPage = ref(5) // 5 examples per page

// Pagination state for grouped view
const currentPage = ref(1)
const topicsPerPage = ref(3) // 3 topics per page in grouped view

// Audio functions
const playVocabularyAudio = (word: string) => {
  audioSystem.playVocabularySound(word, 'en')
}

const playExampleAudio = (text: string) => {
  audioSystem.playVocabularySound(text, 'en')
}



// Load expanded state from localStorage
const loadExpandedState = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-expanded-topics')
    if (saved) {
      const parsed = JSON.parse(saved)
      expandedGroups.value = { ...parsed }
    }
  } catch (error) {
    console.error('Error loading expanded state:', error)
  }
}

// Save expanded state to localStorage
const saveExpandedState = () => {
  try {
    localStorage.setItem('vocabulary-examples-expanded-topics', JSON.stringify(expandedGroups.value))
  } catch (error) {
    console.error('Error saving expanded state:', error)
  }
}

// Load expanded vocabulary examples state from localStorage
const loadExpandedVocabExamplesState = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-expanded-vocab-grouped')
    if (saved) {
      const parsed = JSON.parse(saved)
      expandedVocabExamples.value = { ...parsed }
    }
  } catch (error) {
    console.error('Error loading expanded vocabulary examples state:', error)
  }
}

// Save expanded vocabulary examples state to localStorage
const saveExpandedVocabExamplesState = () => {
  try {
    localStorage.setItem('vocabulary-examples-expanded-vocab-grouped', JSON.stringify(expandedVocabExamples.value))
  } catch (error) {
    console.error('Error saving expanded vocab examples state:', error)
  }
}

// Load example pages state from localStorage
const loadExamplePagesState = () => {
  try {
    const saved = localStorage.getItem('vocabulary-examples-pages-grouped')
    if (saved) {
      const parsed = JSON.parse(saved)
      examplePages.value = { ...parsed }
    }
  } catch (error) {
    console.error('Error loading example pages state:', error)
  }
}

// Save example pages state to localStorage
const saveExamplePagesState = () => {
  try {
    localStorage.setItem('vocabulary-examples-pages-grouped', JSON.stringify(examplePages.value))
  } catch (error) {
    console.error('Error saving example pages state:', error)
  }
}

// Group vocabulary by topic/category with pagination
const allGroupedVocabulary = computed(() => {
  const groups: Record<string, Vocabulary[]> = {}
  
  props.vocabularyList.forEach(vocab => {
    const topicKey = vocab.category || 'uncategorized'
    if (!groups[topicKey]) {
      groups[topicKey] = []
    }
    groups[topicKey].push(vocab)
  })

  // Sort each group by word alphabetically
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => a.word.localeCompare(b.word))
  })

  return groups
})

// Paginated grouped vocabulary
const groupedVocabulary = computed(() => {
  const allGroups = allGroupedVocabulary.value
  const topicKeys = Object.keys(allGroups)
  
  const start = (currentPage.value - 1) * topicsPerPage.value
  const end = start + topicsPerPage.value
  const paginatedTopics = topicKeys.slice(start, end)
  
  const paginatedGroups: Record<string, Vocabulary[]> = {}
  paginatedTopics.forEach(topicKey => {
    paginatedGroups[topicKey] = allGroups[topicKey]
  })
  
  return paginatedGroups
})

// Pagination info for grouped view
const paginationInfo = computed(() => {
  const totalTopics = Object.keys(allGroupedVocabulary.value).length
  const totalPages = Math.ceil(totalTopics / topicsPerPage.value)
  const startIndex = (currentPage.value - 1) * topicsPerPage.value + 1
  const endIndex = Math.min(currentPage.value * topicsPerPage.value, totalTopics)
  
  return {
    totalTopics,
    totalPages,
    currentPage: currentPage.value,
    startIndex,
    endIndex,
    hasNext: currentPage.value < totalPages,
    hasPrevious: currentPage.value > 1
  }
})

// Visible pages for pagination
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const totalP = paginationInfo.value.totalPages
  
  if (totalP <= maxVisible) {
    for (let i = 1; i <= totalP; i++) {
      pages.push(i)
    }
  } else {
    const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    const end = Math.min(totalP, start + maxVisible - 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// Initialize expanded state for vocabularies in current page topics
const initializeExpandedVocabExamplesState = () => {
  Object.values(groupedVocabulary.value).forEach(group => {
    group.forEach(vocab => {
      if (expandedVocabExamples.value[vocab.id] === undefined) {
        expandedVocabExamples.value[vocab.id] = true // Default to expanded
      }
      if (examplePages.value[vocab.id] === undefined) {
        examplePages.value[vocab.id] = 1 // Default to page 1
      }
    })
  })
  saveExpandedVocabExamplesState()
  saveExamplePagesState()
}

// Vocabulary examples accordion animation functions
const vocabExamplesEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.overflow = 'hidden'
}

const vocabExamplesAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const vocabExamplesLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'
  // Force reflow
  element.offsetHeight
  element.style.height = '0'
}

const vocabExamplesAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

// Get examples for a vocabulary
const getVocabExamples = (vocabId: string) => {
  return props.examples.filter(e => e.vocabularyId === vocabId)
}

// Get paginated examples for a vocabulary
const getPaginatedVocabExamples = (vocabId: string) => {
  const allExamples = getVocabExamples(vocabId)
  const currentPage = examplePages.value[vocabId] || 1
  const start = (currentPage - 1) * examplesPerPage.value
  const end = start + examplesPerPage.value
  return allExamples.slice(start, end)
}

// Get total pages for vocabulary examples
const getVocabExamplePages = (vocabId: string) => {
  const totalExamples = getVocabExamples(vocabId).length
  return Math.ceil(totalExamples / examplesPerPage.value)
}

// Navigate example pages
const goToExamplePage = (vocabId: string, page: number) => {
  const totalPages = getVocabExamplePages(vocabId)
  if (page >= 1 && page <= totalPages) {
    examplePages.value[vocabId] = page
    saveExamplePagesState()
  }
}

// Previous/next example page
const previousExamplePage = (vocabId: string) => {
  const currentPage = examplePages.value[vocabId] || 1
  if (currentPage > 1) {
    goToExamplePage(vocabId, currentPage - 1)
  }
}

const nextExamplePage = (vocabId: string) => {
  const currentPage = examplePages.value[vocabId] || 1
  const totalPages = getVocabExamplePages(vocabId)
  if (currentPage < totalPages) {
    goToExamplePage(vocabId, currentPage + 1)
  }
}

// Get example pagination info
const getExamplePaginationInfo = (vocabId: string) => {
  const totalExamples = getVocabExamples(vocabId).length
  const currentPage = examplePages.value[vocabId] || 1
  const totalPages = getVocabExamplePages(vocabId)
  const start = (currentPage - 1) * examplesPerPage.value + 1
  const end = Math.min(currentPage * examplesPerPage.value, totalExamples)
  
  return {
    totalExamples,
    totalPages,
    currentPage,
    start,
    end,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1
  }
}

// Get example count for a vocabulary
const getVocabExampleCount = (vocabId: string) => {
  return props.examples.filter(e => e.vocabularyId === vocabId).length
}

// Get total examples for a topic group
const getTotalExamplesForTopic = (group: Vocabulary[]) => {
  return group.reduce((total, vocab) => total + getVocabExampleCount(vocab.id), 0)
}

// Example type and difficulty helpers
const getTypeLabel = (type: string) => {
  const labels = {
    'sentence': t('vocabulary.examples.types.sentence', 'Sentence'),
    'dialogue': t('vocabulary.examples.types.dialogue', 'Dialogue'),
    'phrase': t('vocabulary.examples.types.phrase', 'Phrase'),
    'context': t('vocabulary.examples.types.context', 'Context')
  }
  return labels[type as keyof typeof labels] || type
}

const getTypeColorClass = (type: string) => {
  const classes = {
    'sentence': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'dialogue': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'phrase': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'context': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const getDifficultyLabel = (difficulty: string) => {
  const labels = {
    'easy': t('common.easy', 'Easy'),
    'medium': t('vocabulary.examples.difficulty.medium', 'Medium'),
    'hard': t('common.difficult', 'Difficult')
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

const getDifficultyColorClass = (difficulty: string) => {
  const classes = {
    'easy': 'text-green-600 dark:text-green-400',
    'medium': 'text-yellow-600 dark:text-yellow-400',
    'hard': 'text-red-600 dark:text-red-400'
  }
  return classes[difficulty as keyof typeof classes] || 'text-gray-600 dark:text-gray-400'
}

// Accordion animation functions
const enter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.overflow = 'hidden'
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const leave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'
  // Force reflow
  element.offsetHeight
  element.style.height = '0'
}

const afterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

// Initialize with all groups expanded by default
const initializeExpandedState = () => {
  const topicKeys = Object.keys(groupedVocabulary.value)
  topicKeys.forEach(key => {
    if (expandedGroups.value[key] === undefined) {
      expandedGroups.value[key] = true // Default to expanded
    }
  })
  saveExpandedState()
}

// Watch for changes in grouped vocabulary to initialize new topics and vocab examples
watch(() => groupedVocabulary.value, () => {
  initializeExpandedState()
  initializeExpandedVocabExamplesState()
}, { immediate: true })

// Load expanded state on mount
onMounted(() => {
  loadExpandedState()
  loadExpandedVocabExamplesState()
  loadExamplePagesState()
})

const deleteExample = (example: any) => {
  const toastId = toast(
    {
      component: ConfirmToast,
      props: {
        message: t('vocabulary.examples.confirmDelete', 'Are you sure you want to delete this example?'),
        confirmText: t('common.confirm', 'Confirm'),
        cancelText: t('common.cancel', 'Cancel'),
        onConfirm: () => {
          emit('delete-example', example)
          toast.dismiss(toastId)
          toast.success(t('vocabulary.examples.deleteSuccess', 'Example deleted successfully'))
        },
        onCancel: () => {
          toast.dismiss(toastId)
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
  )
}


// Navigation functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= paginationInfo.value.totalPages) {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (paginationInfo.value.hasPrevious) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (paginationInfo.value.hasNext) {
    currentPage.value++
  }
}

// Toggle group expanded state
const toggleGroup = (topicKey: string) => {
  expandedGroups.value[topicKey] = !expandedGroups.value[topicKey]
  saveExpandedState()
}

// Toggle vocabulary examples visibility
const toggleVocabExamples = (vocabId: string) => {
  expandedVocabExamples.value[vocabId] = !expandedVocabExamples.value[vocabId]
  saveExpandedVocabExamplesState()
}
</script>

<script lang="ts">
export default {
  name: 'TopicGroupAccordion'
}
</script>

<style scoped>
/* Accordion animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  overflow: hidden;
}

.accordion-content {
  overflow: hidden;
}

/* Vocabulary examples accordion animation */
.vocab-examples-accordion-enter-active,
.vocab-examples-accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.vocab-examples-accordion-enter-from,
.vocab-examples-accordion-leave-to {
  height: 0;
  overflow: hidden;
}

.vocab-examples-accordion-content {
  overflow: hidden;
}

/* Smooth hover effects */
.group:hover .animate-pulse-slow > div {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
