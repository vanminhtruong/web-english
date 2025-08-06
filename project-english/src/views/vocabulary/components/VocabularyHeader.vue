<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow border-b border-gray-200 dark:border-gray-700" data-vocabulary-header>
    <div class="max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-4 px-2 xs:py-5 xs:px-3 sm:py-6 sm:px-4 lg:px-8">
      <div class="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-0">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('vocabulary.title', 'Vocabulary') }}</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ t('vocabulary.description', 'Manage and learn English vocabulary') }}</p>
        </div>
        <button @click="$emit('add-vocabulary')" data-original-add-button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg transition-colors">
          <svg class="w-4 h-4 xs:w-5 xs:h-5 inline mr-1 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          {{ t('vocabulary.addNew', 'Add New Word') }}
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
