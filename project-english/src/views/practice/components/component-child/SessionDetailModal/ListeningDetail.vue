<template>
  <!-- Listening Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[280px] xs:min-h-[320px] sm:h-auto md:h-96 select-none">
      <div class="text-center h-full flex flex-col justify-center">
        <!-- Header -->
        <div class="mb-4 sm:mb-6">
          <span class="px-2 py-1 xs:px-3 xs:py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full truncate">
            {{ entry.extra.listening.category ? getTopicName(entry.extra.listening.category) : 'Unknown Category' }}
          </span>
        </div>

        <!-- Audio Play Button -->
        <div class="mb-6 sm:mb-8">
          <button
            disabled
            class="bg-gray-400 text-white p-4 xs:p-5 sm:p-6 rounded-full cursor-not-allowed"
          >
            <svg class="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Instructions -->
        <p v-if="!entry.extra.listening.isQuizMode" class="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2">Listen and type the word you hear:</p>
        <p v-else class="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2">Choose the word you hear:</p>

        <!-- Input Area -->
        <div v-if="!entry.extra.listening.isQuizMode" class="max-w-xs xs:max-w-sm sm:max-w-md mx-auto px-2">
          <input
            :value="entry.extra.listening.userAnswer || ''"
            type="text"
            disabled
            readonly
            class="w-full p-2 xs:p-3 sm:p-4 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
            placeholder="Type the word you hear..."
          />
          <div class="mt-3 xs:mt-4">
            <p v-if="entry.isCorrect === true" class="text-green-600 dark:text-green-400 font-medium text-xs xs:text-sm sm:text-base">✓ Correct!</p>
            <p v-else class="text-red-600 dark:text-red-400 font-medium text-xs xs:text-sm sm:text-base break-words">✗ Correct answer: {{ entry.extra.listening.correctAnswer }}</p>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 xs:mt-2 break-words">{{ entry.meaningShort }}</p>
          </div>
        </div>

        <!-- Quiz Options -->
        <div v-else class="w-full px-2 sm:px-3 md:px-0">
          <div class="grid grid-cols-1 xs:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3 justify-items-stretch w-full max-w-xs xs:max-w-sm">
            <div
              v-for="(opt, idx) in entry.extra.listening.options || []"
              :key="idx"
              class="px-2 xs:px-3 py-1.5 xs:py-2 rounded border text-xs xs:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-1.5 xs:gap-2 w-full min-w-0"
              :class="[
                opt === entry.extra.listening.correctAnswer
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                  : (opt === entry.extra.listening.selectedOption
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
              ]"
            >
              <span class="inline-flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0">
                {{ String.fromCharCode(65 + idx) }}
              </span>
              <span class="truncate overflow-hidden min-w-0">{{ opt }}</span>
            </div>
          </div>
          <div class="mt-3 xs:mt-4 text-center px-2">
            <p v-if="entry.isCorrect === true" class="text-green-600 dark:text-green-400 font-medium text-xs xs:text-sm sm:text-base">✓ Correct!</p>
            <p v-else class="text-red-600 dark:text-red-400 font-medium text-xs xs:text-sm sm:text-base break-words">✗ Correct answer: {{ entry.extra.listening.correctAnswer }}</p>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 xs:mt-2 break-words">{{ entry.meaningShort }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.listening.isQuizMode ? (entry.extra.listening.selectedOption || 'No answer') : (entry.extra.listening.userAnswer || 'No answer')"
      :correct-answer="entry.extra.listening.correctAnswer"
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
</script>
