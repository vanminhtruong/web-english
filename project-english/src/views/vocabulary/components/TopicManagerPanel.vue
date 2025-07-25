<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.topicManager.title') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.topicManager.builtInTopicsDescription') }}</p>
        </div>
      </div>
      <button
        @click="emit('open')"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>{{ t('vocabulary.topicManager.manageTopics') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['open']);

const { t } = useI18n();
</script> 