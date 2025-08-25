<template>
  <!-- Summary -->
  <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
    <div class="bg-blue-50 dark:bg-blue-900/30 rounded-md sm:rounded-lg p-2 sm:p-3">
      <div class="text-gray-500 dark:text-white/70 text-xs sm:text-sm">{{ t('flashcard.history.totalCards', 'Total Cards') }}</div>
      <div class="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{{ details.total }}</div>
    </div>
    <div class="bg-green-50 dark:bg-green-900/30 rounded-md sm:rounded-lg p-2 sm:p-3">
      <div class="text-gray-500 dark:text-white/70 text-xs sm:text-sm">{{ t('flashcard.history.correct', 'Correct') }}</div>
      <div class="text-green-700 dark:text-green-400 font-semibold text-sm sm:text-base">{{ details.correct }}</div>
    </div>
    <div class="bg-red-50 dark:bg-red-900/30 rounded-md sm:rounded-lg p-2 sm:p-3">
      <div class="text-gray-500 dark:text-white/70 text-xs sm:text-sm">{{ t('flashcard.history.incorrect', 'Incorrect') }}</div>
      <div class="text-red-700 dark:text-red-400 font-semibold text-sm sm:text-base">{{ details.incorrect }}</div>
    </div>
    <div class="bg-indigo-50 dark:bg-indigo-900/30 rounded-md sm:rounded-lg p-2 sm:p-3 col-span-1 xs:col-span-2 md:col-span-1">
      <div class="text-gray-500 dark:text-white/70 text-xs sm:text-sm">{{ t('flashcard.modes.mode', 'Mode') }}</div>
      <div class="text-indigo-700 dark:text-indigo-300 font-semibold text-sm sm:text-base truncate">{{ details.mode }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SessionDetails } from '../../../composables/usePracticeSessionDetails'

defineProps<{
  details: SessionDetails
}>()

const { t } = useI18n()
</script>
