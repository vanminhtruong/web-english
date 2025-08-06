<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <!-- Modal Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-w-4xl max-h-[80vh]">
            <!-- Modal Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh] transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('flashcard.history.title', 'Practice History') }}</span>
                  </h3>
                  <button 
                    @click="emit('close')"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">
                <div v-if="history.length === 0" class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('flashcard.history.empty.title', 'No History Yet') }}</h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('flashcard.history.empty.description', 'Complete a practice session to see your history here.') }}</p>
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
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.totalCards', 'Total Cards') }}:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ session.totalCards }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.correct', 'Correct') }}:</span>
                    <span class="ml-1 font-medium text-green-600 dark:text-green-400">{{ session.correctAnswers }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.incorrect', 'Incorrect') }}:</span>
                    <span class="ml-1 font-medium text-red-600 dark:text-red-400">{{ session.incorrectAnswers }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500 dark:text-gray-400">{{ t('flashcard.history.duration', 'Duration') }}:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatDuration(session.duration) }}</span>
                  </div>
                </div>

                <div class="mt-2">
                  <span class="text-gray-500 dark:text-gray-400 text-sm">{{ t('flashcard.history.categories', 'Categories') }}:</span>
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
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ t('flashcard.history.accuracy', 'Accuracy') }}</div>
                <div class="mt-1">
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded-full"
                    :class="Math.round((session.correctAnswers / session.totalCards) * 100) >= 70
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                  >
                    {{ Math.round((session.correctAnswers / session.totalCards) * 100) >= 70 ? t('flashcard.history.pass', 'Pass') : t('flashcard.history.fail', 'Fail') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
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