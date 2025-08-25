<template>
  <!-- Typing Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] max-h-[500px] flex flex-col select-none">
      <!-- Header -->
      <div class="text-center mb-3 sm:mb-4">
        <span class="px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-xs xs:text-sm font-medium rounded-full truncate">
          {{ entry.extra.typing.category ? getTopicName(entry.extra.typing.category) : 'Unknown Category' }}
        </span>
      </div>

      <!-- Question -->
      <div class="text-center mb-4 sm:mb-6">
        <h2 class="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 break-words px-2">{{ entry.extra.typing.question }}</h2>
        <p v-if="!entry.extra.typing.isQuizMode" class="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Type the corresponding English word:</p>
        <p v-else class="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Choose the correct English word:</p>
      </div>

      <!-- Input Area -->
      <div class="flex-1 flex flex-col justify-center min-h-0">
        <!-- Regular typing mode -->
        <div v-if="!entry.extra.typing.isQuizMode" class="max-w-xs xs:max-w-sm sm:max-w-lg mx-auto w-full px-2">
          <div class="relative">
            <input
              :value="entry.extra.typing.userAnswer || ''"
              type="text"
              disabled
              readonly
              class="w-full px-8 xs:px-10 sm:px-12 py-2 xs:py-3 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
              placeholder="Type the word..."
            />
            
            <!-- Result indicator -->
            <div class="absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <span v-if="entry.isCorrect === true" class="text-green-500">
                <svg class="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span v-else class="text-red-500">
                <svg class="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </span>
            </div>
          </div>
          
          <!-- Correct answer display -->
          <div v-if="entry.isCorrect !== true" class="mt-2 xs:mt-3 text-center">
            <p class="text-gray-600 dark:text-gray-400 text-xs xs:text-sm">Correct answer:</p>
            <p class="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-green-600 dark:text-green-400 break-words">{{ entry.extra.typing.correctAnswer }}</p>
          </div>
        </div>

        <!-- Quiz mode -->
        <div v-else class="w-full px-2 sm:px-3 md:px-0">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 justify-items-stretch w-full">
            <div
              v-for="(opt, idx) in entry.extra.typing.options || []"
              :key="idx"
              class="px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0"
              :class="[
                opt === entry.extra.typing.correctAnswer
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                  : (opt === entry.extra.typing.selectedOption
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
              ]"
            >
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0">
                {{ String.fromCharCode(65 + idx) }}
              </span>
              <span class="truncate overflow-hidden min-w-0">{{ opt }}</span>
            </div>
          </div>
          <div class="mt-3 sm:mt-4 text-center px-2">
            <p v-if="entry.isCorrect === true" class="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">✓ Correct!</p>
            <p v-else class="text-red-600 dark:text-red-400 font-medium text-sm sm:text-base break-words">✗ Correct answer: <span class="font-bold">{{ entry.extra.typing.correctAnswer }}</span></p>
          </div>
        </div>
      </div>

      <!-- Submit button (disabled, for visual completeness) -->
      <div class="text-center mt-4 flex-shrink-0">
        <button
          v-if="!entry.extra.typing.isQuizMode"
          disabled
          class="bg-gray-300 text-white px-6 py-2 rounded-full font-medium cursor-not-allowed text-sm"
        >
          Check
        </button>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.typing.isQuizMode ? (entry.extra.typing.selectedOption || 'No answer') : (entry.extra.typing.userAnswer || 'No answer')"
      :correct-answer="entry.extra.typing.correctAnswer"
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
