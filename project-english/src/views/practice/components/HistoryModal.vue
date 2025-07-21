<template>
  <div v-if="show" class="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center h-full w-full z-50">
    <div class="relative mx-auto p-5 border w-full max-w-4xl max-h-[80vh] shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800 flex flex-col">
      <div class="flex justify-between items-center mb-4 flex-shrink-0">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('flashcard.history.title') }}</h3>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="history.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('flashcard.history.empty.title') }}</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('flashcard.history.empty.description') }}</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="session in history" :key="session.id" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getModeColor(session.mode)">
                    {{ getModeText(session.mode) }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(session.date) }}</span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.totalCards') }}:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ session.totalCards }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.correct') }}:</span>
                    <span class="ml-1 font-medium text-green-600 dark:text-green-400">{{ session.correctAnswers }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.incorrect') }}:</span>
                    <span class="ml-1 font-medium text-red-600 dark:text-red-400">{{ session.incorrectAnswers }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.duration') }}:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatDuration(session.duration) }}</span>
                  </div>
                </div>

                <div class="mt-2">
                  <span class="text-gray-500 dark:text-gray-400 text-sm">{{ t('flashcard.history.categories') }}:</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span v-for="category in session.categories" :key="category" class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {{ category }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <div class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ Math.round((session.correctAnswers / session.totalCards) * 100) }}%
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ t('flashcard.history.accuracy') }}</div>
                <div class="mt-1">
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded-full"
                    :class="Math.round((session.correctAnswers / session.totalCards) * 100) >= 70
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                  >
                    {{ Math.round((session.correctAnswers / session.totalCards) * 100) >= 70 ? t('flashcard.history.pass') : t('flashcard.history.fail') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  show: boolean;
  history: any[];
  getModeColor: (mode: string) => string;
  getModeText: (mode: string) => string;
  formatDate: (date: string) => string;
  formatDuration: (duration: number) => string;
}>();

const emit = defineEmits(['close']);

const { t } = useI18n();
</script> 