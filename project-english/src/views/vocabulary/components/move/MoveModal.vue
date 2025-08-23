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
        v-if="showModal" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
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
          <div class="w-full max-w-md mx-4">
            <!-- Modal Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden transform"
              @click.stop
            >
              <!-- Modal Header -->
              <div class="bg-white dark:bg-[#0a0a0a] p-4 border-b border-gray-200 dark:border-white/10">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      {{ t('vocabulary.moveVocabulary', 'Move Vocabulary') }}
                    </h3>
                  </div>
                  <button 
                    @click="closeModal"
                    class="text-gray-400 dark:text-white/60 hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-black/20"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Modal Body -->
              <div class="p-4">
                <div v-if="wordToMove" class="mb-4">
                  <!-- Batch Move Display -->
                  <div v-if="wordToMove.isBatchMove" class="mb-4">
                    <p class="text-sm text-gray-500 dark:text-white/60 mb-1">
                      {{ t('vocabulary.movingCategory', 'Moving all words in category') }}:
                    </p>
                    <div class="mb-2">
                      <span class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ getTopicName(wordToMove.categoryName || wordToMove.category, t, locale, wordToMove) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-white/70 bg-gray-50 dark:bg-black/20 px-3 py-2 rounded-md">
                      <span class="font-medium">{{ wordToMove.batchWords?.length || 0 }}</span> 
                      {{ t('vocabulary.wordsWillBeMoved', 'words will be moved to the selected date') }}
                    </p>
                  </div>
                  <!-- Single Move Display -->
                  <div v-else>
                    <p class="text-sm text-gray-500 dark:text-white/60 mb-1">
                      {{ t('vocabulary.movingWord', 'Moving word') }}:
                    </p>
                    <div class="mb-1">
                      <span class="text-lg font-medium text-gray-900 dark:text-white">{{ wordToMove.word }}</span>
                      <span class="text-gray-500 dark:text-white/60 ml-2">- {{ wordToMove.meaning }}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-white/60">
                      Topic: {{ getTopicName(wordToMove.category, t, locale, wordToMove) }}
                    </p>
                  </div>
                </div>

                <!-- Filter Toggle -->
                <div class="mb-4">
                  <div class="flex items-center justify-between">
                    <label for="filterByTopic" class="text-sm font-medium text-gray-700 dark:text-white">
                      {{ t('vocabulary.filterBySameTopic', 'Filter by same topic') }}
                    </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        id="filterByTopic"
                        v-model="filterBySameTopic"
                        type="checkbox" 
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#0a0a0a] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white/20 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p v-if="filterBySameTopic" class="text-xs text-gray-500 dark:text-white/60 mt-1">
                    {{ t('vocabulary.showingDatesWithSameTopic', 'Showing only dates with same topic') }}: 
                    <span class="font-medium">{{ getTopicName(wordToMove?.categoryName || wordToMove?.category || '', t, locale, wordToMove) }}</span>
                  </p>
                </div>

                <div class="mb-4">
                  <label for="targetDate" class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                    {{ t('vocabulary.selectTargetDateGroup', 'Select target date group') }}:
                  </label>
                  <select 
                    id="targetDate"
                    v-model="selectedTargetDate"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
                  >
                    <option value="">
                      {{ t('vocabulary.selectDate', 'Select a date') }}
                    </option>
                    <option 
                      v-for="dateGroup in filteredDateGroups" 
                      :key="dateGroup.date" 
                      :value="dateGroup.date"
                    >
                      {{ formatDateForDisplay(dateGroup.date) }} ({{ dateGroup.count }} words)
                    </option>
                  </select>
                  <p v-if="filteredDateGroups.length === 0" class="text-sm text-gray-500 dark:text-white/60 mt-2">
                    {{ t('vocabulary.noMatchingDates', 'No dates found with this topic. Try disabling the filter.') }}
                  </p>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="px-4 py-4 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 flex justify-end space-x-3">
                <button
                  @click="closeModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-black/40 rounded-md hover:bg-gray-200 dark:hover:bg-black/60 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  {{ t('common.cancel', 'Cancel') }}
                </button>
                <button
                  @click="confirmMove"
                  :disabled="!selectedTargetDate"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  {{ wordToMove?.isBatchMove ? t('vocabulary.moveAll', 'Move All') : t('vocabulary.moveWord', 'Move Word') }}
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
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTopicName } from '../../../../utils/topicUtils'

const { t, locale } = useI18n()

interface Word {
  id: number
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  example?: string
  level: string
  category: string
  favorite?: boolean
  image?: string
  createdAt?: string
  updatedAt?: string
  isBatchMove?: boolean
  batchWords?: Word[]
  categoryName?: string
}

interface DateGroup {
  date: string
  count: number
}

interface Props {
  showModal: boolean
  wordToMove: Word | null
  availableDateGroups: DateGroup[]
  sourceDate?: string
  allVocabularies?: Word[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'confirm-move': [data: { word: Word, targetDate: string }]
}>()

const selectedTargetDate = ref('')

// Load filterBySameTopic state from localStorage
const getStoredFilterState = (): boolean => {
  try {
    const stored = localStorage.getItem('vocabulary-move-filter-by-topic')
    return stored ? JSON.parse(stored) : false
  } catch (error) {
    console.warn('Failed to parse stored filter state:', error)
    return false
  }
}

// Save filterBySameTopic state to localStorage
const setStoredFilterState = (value: boolean) => {
  try {
    localStorage.setItem('vocabulary-move-filter-by-topic', JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to store filter state:', error)
  }
}

const filterBySameTopic = ref(getStoredFilterState())

// Watch for changes and save to localStorage
watch(filterBySameTopic, (newValue) => {
  setStoredFilterState(newValue)
})

// Computed property to filter date groups based on toggle
const filteredDateGroups = computed(() => {
  console.log('Filter state:', {
    filterBySameTopic: filterBySameTopic.value,
    hasWordToMove: !!props.wordToMove,
    hasAllVocabularies: !!props.allVocabularies,
    allVocabulariesLength: props.allVocabularies?.length
  })
  
  // If toggle is off or no data, return all date groups
  if (!filterBySameTopic.value || !props.wordToMove || !props.allVocabularies) {
    return props.availableDateGroups
  }

  // Get the category of the word to move
  const currentCategory = props.wordToMove.categoryName || props.wordToMove.category
  console.log('Current category:', currentCategory)
  console.log('Word to move:', props.wordToMove)
  
  // If no category, return all date groups
  if (!currentCategory) {
    return props.availableDateGroups
  }

  // Log first few vocabularies to check structure
  console.log('Sample vocabularies:', props.allVocabularies.slice(0, 3))

  // Filter date groups to only show those containing words with the same category
  const filtered = props.availableDateGroups.filter(dateGroup => {
    // Parse the date group date
    const groupDate = new Date(dateGroup.date)
    const groupDateStr = groupDate.toISOString().split('T')[0]
    
    // Check if any vocabulary in allVocabularies matches this date and category
    const hasMatch = props.allVocabularies!.some(vocab => {
      // Skip if no date or different category
      if (vocab.category !== currentCategory) return false
      
      // Check date match
      const vocabDateStr = vocab.createdAt ? new Date(vocab.createdAt).toISOString().split('T')[0] : null
      const vocabUpdateDateStr = vocab.updatedAt ? new Date(vocab.updatedAt).toISOString().split('T')[0] : null
      
      // Match if either created or updated date matches the group date
      const matches = vocabDateStr === groupDateStr || vocabUpdateDateStr === groupDateStr
      
      if (matches) {
        console.log('Found match:', {
          vocab: vocab.word,
          category: vocab.category,
          vocabDate: vocabDateStr,
          groupDate: groupDateStr
        })
      }
      
      return matches
    })
    
    return hasMatch
  })
  
  console.log('Filtered result:', filtered.length, 'groups')
  return filtered
})

// Format date for display
const formatDateForDisplay = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Close modal and reset state
const closeModal = () => {
  selectedTargetDate.value = ''
  // Don't reset filterBySameTopic - keep the user's preference
  emit('close')
}

// Confirm move action
const confirmMove = () => {
  if (props.wordToMove && selectedTargetDate.value) {
    emit('confirm-move', {
      word: props.wordToMove,
      targetDate: selectedTargetDate.value
    })
    closeModal()
  }
}

// Watch for modal open/close to manage body scroll
watch(() => props.showModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
    selectedTargetDate.value = '' // Reset selection
    // Don't reset filterBySameTopic - keep the user's preference
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  document.body.classList.remove('modal-open')
})
</script>

<style scoped>
/* Animation keyframes */
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

/* Global styles for modal scroll lock */
:deep(body.modal-open) {
  overflow: hidden !important;
}
</style>
