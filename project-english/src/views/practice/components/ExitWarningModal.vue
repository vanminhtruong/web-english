<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-xl p-8 max-w-md mx-4 text-center">
      <div class="text-orange-500 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ t('practice.exitWarning.title', 'Leave Practice?') }}
      </h3>
      <p class="text-sm sm:text-base text-gray-600 dark:text-white/80 mb-6">
        {{ t('practice.exitWarning.message', 'Are you sure you want to leave? Your progress will be lost.') }}
      </p>
      <div class="flex gap-2 sm:gap-3">
        <button
          @click="emit('continue')"
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
        >
          {{ t('practice.exitWarning.continue', 'Stay') }}
        </button>
        <button
          @click="emit('confirm')"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
        >
          {{ t('practice.exitWarning.exit', 'Leave') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  show: boolean
}>()

const emit = defineEmits(['continue', 'confirm'])

const { t } = useI18n()
</script> 