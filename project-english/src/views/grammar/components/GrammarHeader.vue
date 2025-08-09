<template>
  <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6">
    <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-3 sm:p-4 md:p-5 lg:p-6">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center mb-1">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5"></div>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{{ t('grammar.title', 'Grammar') }}</h1>
          </div>
          <p class="mt-1 text-sm text-gray-700 dark:text-white/70">{{ t('grammar.description', 'Master English grammar with structured lessons and practice') }}</p>
        </div>
        <button @click="$emit('add-lesson')" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow">
          <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          {{ t('grammar.addLesson', 'Add Lesson') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits<{
  'add-lesson': []
}>()
</script>
