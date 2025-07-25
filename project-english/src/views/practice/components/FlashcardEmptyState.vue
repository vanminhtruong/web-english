<template>
  <div class="text-center py-12">
    <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('flashcard.empty.title') }}</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('flashcard.empty.description') }}</p>
    <div class="mt-6">
      <button @click="emit('go-to-vocabulary')" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        {{ t('flashcard.empty.action') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['go-to-vocabulary']);

const { t } = useI18n();
</script> 