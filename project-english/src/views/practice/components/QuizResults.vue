<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
    <div class="text-center mb-8">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
        <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ t('quiz.results.completed') }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ t('quiz.results.yourResults') }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ score }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('quiz.results.score') }}</p>
      </div>
      <div class="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ correctAnswers }}/{{ totalQuestions }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('quiz.results.correct') }}</p>
      </div>
      <div class="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ Math.round(accuracy) }}%</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('quiz.results.accuracy') }}</p>
      </div>
    </div>
    
    <!-- Pass/Fail Status -->
    <div class="text-center mb-8">
      <span 
        class="inline-block px-4 py-2 text-sm font-medium rounded-full" 
        :class="accuracy >= 70 
          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'"
      >
        {{ accuracy >= 70 ? t('quiz.results.passed') : t('quiz.results.failed') }} ({{ accuracy >= 70 ? t('quiz.results.above') : t('quiz.results.below') }} 70%)
      </span>
    </div>
    
    <!-- Review Answers -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('quiz.results.reviewAnswers') }}</h3>
      <div class="space-y-4">
        <div v-for="(question, index) in questions" :key="index" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div class="flex items-start justify-between mb-2">
            <p class="font-medium text-gray-900 dark:text-white">{{ index + 1 }}. {{ question.question }}</p>
            <span v-if="userAnswers[index] === question.correctAnswer" class="text-green-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </span>
            <span v-else class="text-red-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span class="font-medium">{{ t('quiz.results.correctAnswer') }}:</span> {{ question.options[question.correctAnswer] }}
          </p>
          <p v-if="userAnswers[index] !== question.correctAnswer" class="text-sm text-red-600">
            <span class="font-medium">{{ t('quiz.results.yourAnswer') }}:</span> {{ question.options[userAnswers[index]] || t('quiz.results.noAnswer') }}
          </p>
          <p v-if="question.explanation" class="text-sm text-gray-500 mt-2">
            <span class="font-medium">{{ t('quiz.results.explanation') }}:</span> {{ question.explanation }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="flex justify-center space-x-4">
      <button @click="$emit('restart-quiz')" class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
        {{ t('quiz.results.restartQuiz') }}
      </button>
      <button @click="$emit('go-back')" class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
        {{ t('common.goBack') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  type: 'vocabulary' | 'grammar'
  level: 'beginner' | 'intermediate' | 'advanced'
  explanation?: string
}

interface Props {
  questions: QuizQuestion[]
  userAnswers: number[]
  score: number
  correctAnswers: number
  totalQuestions: number
  accuracy: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'restart-quiz': []
  'go-back': []
}>()

const { t } = useI18n()
</script>
