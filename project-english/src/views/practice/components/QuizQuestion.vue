<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full">
          {{ question.type === 'vocabulary' ? t('quiz.types.vocabulary') : t('quiz.types.grammar') }}
        </span>
        <span :class="getLevelColor(question.level)" class="px-3 py-1 text-sm font-medium rounded-full">
          {{ getLevelText(question.level) }}
        </span>
      </div>
      
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">{{ question.question }}</h3>
      
      <div class="space-y-3">
        <div 
          v-for="(option, index) in question.options" 
          :key="index"
          @click="$emit('select-answer', index)"
          :class="[
            'p-4 border-2 rounded-lg cursor-pointer transition-all',
            selectedAnswer === index 
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
          ]"
        >
          <div class="flex items-center">
            <div :class="[
              'w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center',
              selectedAnswer === index 
                ? 'border-purple-500 bg-purple-500' 
                : 'border-gray-300'
            ]">
              <span v-if="selectedAnswer === index" class="text-white text-sm font-bold">
                {{ String.fromCharCode(65 + index) }}
              </span>
              <span v-else class="text-gray-500 text-sm font-bold">
                {{ String.fromCharCode(65 + index) }}
              </span>
            </div>
            <span class="text-gray-900 dark:text-white">{{ option }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-between">
      <button 
        @click="$emit('previous-question')"
        :disabled="isFirstQuestion"
        class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        {{ t('quiz.navigation.previous') }}
      </button>
      
      <button 
        @click="$emit('next-question')"
        :disabled="selectedAnswer === null"
        class="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        {{ isLastQuestion ? t('quiz.navigation.finish') : t('quiz.navigation.next') }}
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
  question: QuizQuestion
  selectedAnswer: number | null
  isFirstQuestion: boolean
  isLastQuestion: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'select-answer': [index: number]
  'previous-question': []
  'next-question': []
}>()

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'advanced': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const { t } = useI18n()

const getLevelText = (level: string) => {
  switch (level) {
    case 'beginner': return t('levels.beginner')
    case 'intermediate': return t('levels.intermediate')
    case 'advanced': return t('levels.advanced')
    default: return level
  }
}
</script>
