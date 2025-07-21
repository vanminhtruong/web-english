<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <!-- Question -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ question.question }}
      </h3>
      
      <!-- Audio for question if available -->
      <div v-if="question.audio" class="mb-4">
        <button
          @click="playQuestionAudio"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
          </svg>
          <span>{{ t('grammar.practice.playAudio') }}</span>
        </button>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-3 mb-8">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        @click="selectOption(index)"
        :class="[
          'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
          selectedOption === index
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-[#0a0a0a]/50',
          showAnswer && index === correctAnswerIndex
            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
            : '',
          showAnswer && selectedOption === index && selectedOption !== correctAnswerIndex
            ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
            : ''
        ]"
      >
        <div class="flex items-center space-x-3">
          <div
            :class="[
              'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium',
              selectedOption === index
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400',
              showAnswer && index === correctAnswerIndex
                ? 'border-green-500 bg-green-500 text-white'
                : '',
              showAnswer && selectedOption === index && selectedOption !== correctAnswerIndex
                ? 'border-red-500 bg-red-500 text-white'
                : ''
            ]"
          >
            {{ String.fromCharCode(65 + index) }}
          </div>
          <span class="text-gray-900 dark:text-white">{{ option }}</span>
          
          <!-- Answer icons -->
          <div class="ml-auto">
            <svg
              v-if="showAnswer && index === correctAnswerIndex"
              class="w-5 h-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg
              v-else-if="showAnswer && selectedOption === index && selectedOption !== correctAnswerIndex"
              class="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div v-if="showAnswer && question.explanation" class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
      <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
        {{ t('grammar.practice.explanation') }}
      </h4>
      <p class="text-yellow-700 dark:text-yellow-300 text-sm">
        {{ question.explanation }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <!-- Hint button -->
        <button
          v-if="!showAnswer && question.hint"
          @click="showHint = !showHint"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>{{ t('grammar.practice.hint') }}</span>
        </button>
        
        <!-- Hint content -->
        <div v-if="showHint && question.hint" class="text-sm text-blue-600 dark:text-blue-400">
          💡 {{ question.hint }}
        </div>
      </div>

      <div class="flex space-x-4">
        <!-- Submit/Check Answer -->
        <button
          v-if="!showAnswer"
          @click="checkAnswer"
          :disabled="selectedOption === null"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ t('grammar.practice.checkAnswer') }}
        </button>
        
        <!-- Next Question -->
        <button
          v-else
          @click="nextQuestion"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {{ questionIndex === totalQuestions - 1 ? t('grammar.practice.finish') : t('grammar.practice.next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'

const { t } = useI18n()
const { playAudio } = useVoiceStore()

// Props
interface Props {
  question: {
    id: number
    question: string
    options: string[]
    correctAnswer: string
    explanation?: string
    hint?: string
    audio?: string
  }
  questionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  answer: [answer: { isCorrect: boolean; userAnswer: string; correctAnswer: string }]
  next: []
  complete: []
}>()

// State
const selectedOption = ref<number | null>(null)
const showAnswer = ref(false)
const showHint = ref(false)

// Computed
const correctAnswerIndex = computed(() => {
  return props.question.options.findIndex(option => option === props.question.correctAnswer)
})

// Methods
const selectOption = (index: number) => {
  if (!showAnswer.value) {
    selectedOption.value = index
  }
}

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  showAnswer.value = true
  const isCorrect = selectedOption.value === correctAnswerIndex.value
  const userAnswer = props.question.options[selectedOption.value]
  
  emit('answer', {
    isCorrect,
    userAnswer,
    correctAnswer: props.question.correctAnswer
  })
}

const nextQuestion = () => {
  if (props.questionIndex === props.totalQuestions - 1) {
    emit('complete')
  } else {
    // Reset for next question
    selectedOption.value = null
    showAnswer.value = false
    showHint.value = false
    emit('next')
  }
}

const playQuestionAudio = async () => {
  if (props.question.audio) {
    try {
      await playAudio(props.question.question)
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }
}
</script>
