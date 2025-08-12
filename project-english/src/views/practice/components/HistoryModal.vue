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
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
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
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col max-h-[80vh] transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('flashcard.history.title', 'Practice History') }}</span>
                  </h3>
                  <button 
                    @click="emit('close')"
                    :aria-label="t('common.close', 'Close')"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-soft"
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
                  <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ t('flashcard.history.empty.title', 'No History Yet') }}</h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-white/70">{{ t('flashcard.history.empty.description', 'Complete a practice session to see your history here.') }}</p>
                </div>

                <div v-else class="space-y-4">
                  <div v-for="session in history" :key="session.id" class="bg-gray-50 dark:bg-gray-custom rounded-lg p-4">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                          <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getModeColor(session.mode)">
                            {{ getModeText(session.mode) }}
                          </span>
                          <span class="text-sm text-gray-500 dark:text-white/70">{{ formatDate(session.date) }}</span>
                          <button
                            class="inline-flex items-center ml-1 px-2 py-1 rounded-md border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition
                                  dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800 dark:hover:bg-blue-900/40 dark:hover:text-blue-200"
                            :class="!hasSessionDetails(session.id, session.hasDetails) ? 'opacity-50' : ''"
                            :aria-disabled="!hasSessionDetails(session.id, session.hasDetails)"
                            :title="hasSessionDetails(session.id, session.hasDetails) ? t('flashcard.history.viewDetails', 'View details') : t('flashcard.history.noDetails', 'No details available')"
                            :aria-label="t('flashcard.history.viewDetails', 'View details')"
                            @click="emit('open-details', session.id)"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            </svg>
                          </button>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.totalCards', 'Total Cards') }}:</span>
                            <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ session.totalCards }}</span>
                          </div>
                          <div>
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.correct', 'Correct') }}:</span>
                            <span class="ml-1 font-medium text-green-600 dark:text-green-400">{{ session.correctAnswers }}</span>
                          </div>
                          <div>
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.incorrect', 'Incorrect') }}:</span>
                            <span class="ml-1 font-medium text-red-600 dark:text-red-400">{{ session.incorrectAnswers }}</span>
                          </div>
                          <div>
                            <span class="text-gray-500 dark:text-white/70">{{ t('flashcard.history.duration', 'Duration') }}:</span>
                            <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatDuration(session.duration) }}</span>
                          </div>
                        </div>

                        <div class="mt-2">
                          <span class="text-gray-500 dark:text-white/70 text-sm">{{ t('flashcard.history.categories', 'Categories') }}:</span>
                          <div class="flex flex-wrap gap-1 mt-1">
                            <span v-for="category in session.categories" :key="category" class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                              {{ getCategoryDisplay(category) }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="text-right">
                        <div class="text-lg font-bold text-gray-900 dark:text-white">
                          {{ Math.round((session.correctAnswers / session.totalCards) * 100) }}%
                        </div>
                        <div class="text-xs text-gray-500 dark:text-white/70">{{ t('flashcard.history.accuracy', 'Accuracy') }}</div>
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

const emit = defineEmits(['close', 'open-details']);

const { t } = useI18n();

// Show eye icon if either hasDetails flag is true or session details key exists
const hasSessionDetails = (sessionId: string, flag?: boolean) => {
  if (flag) return true
  try {
    return !!localStorage.getItem(`flashcard-session-details:${sessionId}`)
  } catch {
    return false
  }
}

// Helper function to translate category names
const getCategoryDisplay = (category: string): string => {
  // Check if it's a translation key
  if (category.includes('.')) {
    // Try to get the last part of the key as fallback
    const parts = category.split('.');
    const fallback = parts[parts.length - 1];
    
    // Handle common flashcard mode keys
    if (category === 'flashcard.modes.flashcard') return t(category, 'Flashcard');
    if (category === 'flashcard.modes.quiz') return t(category, 'Quiz');
    if (category === 'flashcard.modes.typing') return t(category, 'Typing');
    if (category === 'flashcard.modes.listening') return t(category, 'Listening');
    if (category === 'flashcard.modes.image') return t(category, 'Image');
    if (category === 'flashcard.modes.pronunciation') return t(category, 'Pronunciation');
    
    // For other translation keys, use the general pattern
    return t(category, fallback.charAt(0).toUpperCase() + fallback.slice(1));
  }
  
  // If it's not a translation key, return as is
  return category;
};
</script> 