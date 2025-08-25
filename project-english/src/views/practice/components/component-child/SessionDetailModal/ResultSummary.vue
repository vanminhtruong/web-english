<template>
  <!-- Result Summary -->
  <div class="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
    <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
      <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">{{ userAnswerLabel }}</div>
      <div class="font-semibold text-gray-900 dark:text-white break-words text-xs xs:text-sm">
        {{ userAnswer || 'No answer' }}
      </div>
    </div>
    <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
      <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">{{ correctAnswerLabel }}</div>
      <div class="font-semibold text-emerald-600 dark:text-emerald-400 break-words text-xs xs:text-sm">
        {{ correctAnswer }}
      </div>
    </div>
    <div class="bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute">
      <div class="text-gray-500 dark:text-white/70 text-xs font-medium mb-1">Result</div>
      <div class="font-semibold text-xs xs:text-sm" :class="isCorrect === true ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
        {{ isCorrect === true ? '✓ Correct' : '✗ Incorrect' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userAnswer?: string
  correctAnswer: string
  isCorrect?: boolean
  userAnswerLabel?: string
  correctAnswerLabel?: string
}>()
</script>
