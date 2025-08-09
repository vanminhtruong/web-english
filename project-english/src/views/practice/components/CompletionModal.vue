<template>
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
      @wheel.prevent
      @touchmove.prevent
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
        <div 
          v-if="show"
          class="w-full max-w-md sm:max-w-lg bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
            <div class="flex items-center justify-between">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{{ t('flashcard.completion.title', 'Completed!') }}</span>
              </h2>
              <button 
                @click="emit('go-back')"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-6">
            <!-- Success Icon with Animation -->
            <div class="flex justify-center mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 shadow-lg transform hover:scale-110 transition-all duration-300">
                <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>

            <!-- Description -->
            <div class="text-center mb-6 animate-fade-in-up" style="animation-delay: 0.2s">
              <p class="text-gray-600 dark:text-gray-300">{{ t('flashcard.completion.description', { count: cardCount }, `You have completed ${cardCount} flashcards.`) }}</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 gap-4 mb-6">
              <!-- Correct Stats -->
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span class="font-medium text-green-700 dark:text-green-300">{{ t('flashcard.completion.correct', 'Correct') }}</span>
                  </div>
                  <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.correct }}</span>
                </div>
              </div>

              <!-- Incorrect Stats -->
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-fade-in-up" style="animation-delay: 0.4s">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span class="font-medium text-red-700 dark:text-red-300">{{ t('flashcard.completion.incorrect', 'Incorrect') }}</span>
                  </div>
                  <span class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.incorrect }}</span>
                </div>
              </div>

              <!-- Accuracy & Result -->
              <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-fade-in-up" style="animation-delay: 0.5s">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span class="font-medium text-blue-700 dark:text-blue-300">{{ t('flashcard.completion.accuracy', 'Accuracy') }}</span>
                  </div>
                  <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ (stats.correct + stats.incorrect) > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0 }}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ t('flashcard.completion.result', 'Result') }}:</span>
                  <span
                    class="px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105"
                    :class="(stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-green-200 dark:shadow-green-900'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shadow-red-200 dark:shadow-red-900'"
                  >
                    {{ (stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70 ? t('flashcard.history.pass', 'Pass') : t('flashcard.history.fail', 'Fail') }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button 
                @click="emit('restart')" 
                class="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 animate-fade-in-up"
                style="animation-delay: 0.6s"
              >
                {{ t('common.restart', 'Practice Again') }}
              </button>
              <button 
                @click="emit('go-back')" 
                class="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 animate-fade-in-up"
                style="animation-delay: 0.7s"
              >
                {{ t('common.back', 'Back') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  show: boolean
  stats: any
  cardCount: number
}>()

const emit = defineEmits(['restart', 'go-back'])

const { t } = useI18n()
</script>

<style scoped>
/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Button hover effects removed to let Tailwind hover utilities control transforms */

/* Custom scrollbar for dark mode */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #0f0f0f;
}

::-webkit-scrollbar-thumb {
  background-color: #0a0a0a;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #000000;
}

/* Enhanced focus states */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style> 