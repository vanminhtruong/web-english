<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="text-center mb-4">
        <span class="px-4 py-2 bg-yellow-100 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full">
          {{ getTopicName(currentCard.category) }}
        </span>
      </div>

      <!-- Question -->
      <div class="text-center mb-4 flex-shrink-0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ currentCard.word }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ currentCard.pronunciation }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('flashcard.quiz.instruction', 'Choose the correct meaning:') }}</p>
      </div>

      <!-- Options -->
      <div class="flex-1 flex flex-col justify-center min-h-0">
        <div class="flex items-center justify-center">
          <div class="grid grid-cols-2 gap-3 w-full max-w-lg">
            <button
              v-for="(option, index) in quizOptions"
              :key="index"
              @click="handleSelectAnswer(option)"
              :class="[
                'relative p-4 text-center rounded-lg border-2 transition-all duration-200 font-semibold text-sm min-h-[60px] flex items-center justify-center',
                quizAnswered && option === getCorrectAnswer()
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200 shadow-lg'
                  : quizAnswered && option === selectedAnswer && option !== getCorrectAnswer()
                  ? 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200 shadow-lg'
                  : quizAnswered
                  ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600 text-gray-900 dark:text-white hover:from-blue-100 hover:to-blue-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transform hover:scale-105'
              ]"
              :disabled="quizAnswered"
            >
              <!-- Letter badge -->
              <span class="absolute top-2 left-2 w-6 h-6 bg-blue-500 dark:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {{ String.fromCharCode(65 + index) }}
              </span>

              <!-- Answer text -->
              <span class="text-center px-6">{{ option }}</span>

              <!-- Result icon -->
              <span v-if="quizAnswered && option === getCorrectAnswer()" class="absolute top-2 right-2 text-green-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span v-else-if="quizAnswered && option === selectedAnswer && option !== getCorrectAnswer()" class="absolute top-2 right-2 text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Firework Sound Effect -->
    <FireworkSoundEffect 
      ref="fireworkEffect"
      :trigger-firework="triggerFirework"
      :trigger-sound="triggerSound"
      :is-correct="isCorrectAnswer"
      @effect-complete="resetTriggers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTopicName } from '../../../utils/topicUtils'

// Import component using defineAsyncComponent to avoid "has no default export" error
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))

const { t } = useI18n()

// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

interface FlashcardData {
  word: string
  meaning: string
  pronunciation: string
  category: string
  partOfSpeech?: string
  example?: string
}

interface Props {
  currentCard: FlashcardData
  quizOptions: string[]
  selectedAnswer: string | null
  quizAnswered: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'select-answer': [answer: string]
}>()

const getCorrectAnswer = () => {
  return props.currentCard.meaning.split(' - ')[0].trim()
}

// Handle answer selection with effects
const handleSelectAnswer = (answer: string) => {
  if (props.quizAnswered) return
  
  // Emit the answer selection first
  emit('select-answer', answer)
  
  // Determine if answer is correct
  const correctAnswer = getCorrectAnswer()
  isCorrectAnswer.value = answer === correctAnswer
  
  // Trigger effects after a small delay to let the UI update
  setTimeout(() => {
    triggerFirework.value = true
    triggerSound.value = true
  }, 100)
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}
</script>
