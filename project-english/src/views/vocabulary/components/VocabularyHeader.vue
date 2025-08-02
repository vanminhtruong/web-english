<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow border-b border-gray-200 dark:border-gray-700" data-vocabulary-header>
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('vocabulary.title') || 'Vocabulary' }}</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ t('vocabulary.description') || 'Manage and learn English vocabulary' }}</p>
        </div>
        <button @click="$emit('add-vocabulary')" data-original-add-button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          {{ t('vocabulary.addNew') || 'Add New Word' }}
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
