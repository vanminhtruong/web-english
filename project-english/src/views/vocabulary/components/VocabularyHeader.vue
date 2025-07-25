<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-2">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 class="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white">{{ t('vocabulary.title') }}</h1>
          <p class="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">{{ t('vocabulary.description') }}</p>
        </div>
        <button @click="$emit('add-vocabulary')" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors flex items-center justify-center md:justify-start">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm md:text-base">{{ t('vocabulary.addNew') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits<{
  'add-vocabulary': []
}>()
</script>
