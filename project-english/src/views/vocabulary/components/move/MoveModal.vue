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
                  <p class="text-sm text-gray-500 dark:text-white/60 mb-1">
                    {{ t('vocabulary.movingWord', 'Moving word') }}:
                  </p>
                  <div class="mb-1">
                    <span class="text-lg font-medium text-gray-900 dark:text-white">{{ wordToMove.word }}</span>
                    <span class="text-gray-500 dark:text-white/60 ml-2">- {{ wordToMove.meaning }}</span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-white/60">
                    Topic: {{ getTopicName(wordToMove.category) }}
                  </p>
                </div>

                <div class="mb-4">
                  <label for="targetDate" class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                    Select target date group:
                  </label>
                  <select 
                    id="targetDate"
                    v-model="selectedTargetDate"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-white/10 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                  >
                    <option value="">
                      Select a date
                    </option>
                    <option 
                      v-for="dateGroup in availableDateGroups" 
                      :key="dateGroup.date" 
                      :value="dateGroup.date"
                    >
                      {{ formatDateForDisplay(dateGroup.date) }} ({{ dateGroup.count }} words)
                    </option>
                  </select>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="px-4 py-4 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 flex justify-end space-x-3">
                <button
                  @click="closeModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-black/40 rounded-md hover:bg-gray-200 dark:hover:bg-black/60 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  Cancel
                </button>
                <button
                  @click="confirmMove"
                  :disabled="!selectedTargetDate"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Move Word
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
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'confirm-move': [data: { word: Word, targetDate: string }]
}>()

const selectedTargetDate = ref('')

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
