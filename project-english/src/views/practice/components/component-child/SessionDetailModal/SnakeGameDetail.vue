<template>
  <!-- Snake Game Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[280px] xs:min-h-[320px] sm:h-auto md:h-96 select-none">
      <div class="text-center h-full flex flex-col justify-center">
        <!-- Header -->
        <div class="mb-4 sm:mb-6">
          <span class="px-2 py-1 xs:px-3 xs:py-1 bg-green-100 dark:bg-gray-800 text-green-800 dark:text-green-300 text-xs sm:text-sm font-medium rounded-full truncate">
            {{ entry.extra.snakeGame.category ? getTopicName(entry.extra.snakeGame.category) : 'Snake Game' }}
          </span>
        </div>

        <!-- Game Stats -->
        <div class="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <h3 class="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Game Completed</h3>
          
          <!-- Score and stats grid -->
          <div class="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 max-w-xs xs:max-w-sm mx-auto">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-2 xs:p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-xs xs:text-sm text-blue-600 dark:text-blue-400 font-medium">Score</p>
              <p class="text-lg xs:text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-300">{{ entry.extra.snakeGame.score || 0 }}</p>
            </div>
            
            <div class="bg-green-50 dark:bg-green-900/20 p-2 xs:p-3 rounded-lg border border-green-200 dark:border-green-800">
              <p class="text-xs xs:text-sm text-green-600 dark:text-green-400 font-medium">Words</p>
              <p class="text-lg xs:text-xl sm:text-2xl font-bold text-green-800 dark:text-green-300">{{ entry.extra.snakeGame.wordsCollected || 0 }}</p>
            </div>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 p-2 xs:p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <p class="text-xs xs:text-sm text-purple-600 dark:text-purple-400 font-medium">Time</p>
              <p class="text-lg xs:text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300">{{ formatTime(entry.extra.snakeGame.gameTime) }}</p>
            </div>
            
            <div class="bg-orange-50 dark:bg-orange-900/20 p-2 xs:p-3 rounded-lg border border-orange-200 dark:border-orange-800">
              <p class="text-xs xs:text-sm text-orange-600 dark:text-orange-400 font-medium">Level</p>
              <p class="text-lg xs:text-xl sm:text-2xl font-bold text-orange-800 dark:text-orange-300">{{ entry.extra.snakeGame.level || 1 }}</p>
            </div>
          </div>
        </div>

        <!-- Game Result -->
        <div class="mb-4 sm:mb-6">
          <div class="inline-flex items-center px-3 xs:px-4 py-2 rounded-full text-sm xs:text-base font-medium"
               :class="entry.isCorrect 
                 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                 : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'">
            <svg v-if="entry.isCorrect" class="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            {{ entry.isCorrect ? 'Great game!' : 'Game over!' }}
          </div>
        </div>

        <!-- Collected Words List (if available) -->
        <div v-if="entry.extra.snakeGame.collectedWords && entry.extra.snakeGame.collectedWords.length > 0" class="max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
          <h4 class="text-sm xs:text-base font-semibold text-gray-900 dark:text-white mb-2 xs:mb-3">Words Collected:</h4>
          <div class="flex flex-wrap gap-1 xs:gap-1.5 justify-center">
            <span 
              v-for="word in entry.extra.snakeGame.collectedWords.slice(0, 8)"
              :key="word"
              class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md"
            >
              {{ word }}
            </span>
            <span 
              v-if="entry.extra.snakeGame.collectedWords.length > 8"
              class="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded-md"
            >
              +{{ entry.extra.snakeGame.collectedWords.length - 8 }} more
            </span>
          </div>
        </div>

        <!-- Replay Button (disabled for history view) -->
        <div class="mt-4 xs:mt-6">
          <button
            disabled
            class="px-4 xs:px-6 py-2 xs:py-3 bg-gray-400 text-white text-sm xs:text-base font-medium rounded-lg cursor-not-allowed"
          >
            Replay Game
          </button>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="`Score: ${entry.extra.snakeGame.score || 0}, Words: ${entry.extra.snakeGame.wordsCollected || 0}`"
      :correct-answer="`Game completed in ${formatTime(entry.extra.snakeGame.gameTime)}`"
      :is-correct="entry.isCorrect"
    />
  </div>
</template>

<script setup lang="ts">
import { getTopicName } from '../../../../../utils/topicUtils'
import { defineAsyncComponent } from 'vue'
const ResultSummary = defineAsyncComponent(()=>import('./ResultSummary.vue'))

defineProps<{
  entry: any
}>()

const formatTime = (seconds: number | undefined): string => {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>
