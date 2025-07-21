<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
      <span>{{ t('quiz.progress.question') }} {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
      <span>{{ Math.round(progressPercentage) }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div class="bg-purple-500 h-2 rounded-full transition-all duration-300" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  currentQuestionIndex: number
  totalQuestions: number
  progressPercentage: number
}

defineProps<Props>()

const { t } = useI18n()
</script>
