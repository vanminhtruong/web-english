<template>
  <div v-if="mode === 'flashcard'" class="grid grid-cols-3 gap-4 mt-8">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
      <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.easy }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('common.easy', 'Easy') }}</p>
    </div>
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
      <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.reviewed }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('common.reviewed', 'Reviewed') }}</p>
    </div>
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
      <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.difficult }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('common.difficult', 'Difficult') }}</p>
    </div>
  </div>

  <div v-else class="grid grid-cols-2 gap-4 mt-8">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
      <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.correct }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('common.correct', 'Correct') }}</p>
    </div>
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800">
      <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.incorrect }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('common.incorrect', 'Incorrect') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  stats: any;
  mode: string;
}>();

const { t } = useI18n();
</script> 