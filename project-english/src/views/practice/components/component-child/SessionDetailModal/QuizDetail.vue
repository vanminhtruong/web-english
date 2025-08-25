<template>
  <!-- Quiz Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] xs:min-h-[350px] sm:h-96 select-none">
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="text-center mb-3 sm:mb-4">
          <span class="px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 bg-yellow-100 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 text-xs xs:text-sm font-medium rounded-full truncate">
            {{ entry.extra.quiz.category ? getTopicName(entry.extra.quiz.category) : 'Unknown Category' }}
          </span>
        </div>

        <!-- Question -->
        <div class="text-center mb-3 sm:mb-4 flex-shrink-0">
          <h2 class="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words px-2">{{ entry.extra.quiz.question }}</h2>
          <p class="text-xs xs:text-sm text-gray-600 dark:text-gray-300 break-words">{{ entry.extra.quiz.pronunciation }}</p>
          <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">Choose the correct meaning:</p>
        </div>

        <!-- Options -->
        <div class="flex-1 flex flex-col justify-center min-h-0">
          <div class="flex items-center justify-center px-1 xs:px-2">
            <div class="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 w-full max-w-xs xs:max-w-sm sm:max-w-lg">
              <div
                v-for="(option, index) in entry.extra.quiz.options"
                :key="index"
                :class="[
                  'relative p-2 xs:p-3 sm:p-4 text-center rounded-md sm:rounded-lg border-2 font-semibold text-xs xs:text-sm min-h-[50px] xs:min-h-[60px] flex items-center justify-center cursor-not-allowed',
                  option === entry.extra.quiz.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                    : (option === entry.extra.quiz.selectedAnswer
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                        : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                ]"
              >
                <!-- Letter badge -->
                <span class="absolute top-1.5 xs:top-2 left-1.5 xs:left-2 w-5 h-5 xs:w-6 xs:h-6 rounded-full text-xs font-semibold flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80">
                  {{ String.fromCharCode(65 + index) }}
                </span>

                <!-- Answer text -->
                <span class="text-center px-3 xs:px-4 sm:px-6 break-words">{{ option }}</span>

                <!-- Result icon -->
                <span v-if="option === entry.extra.quiz.correctAnswer" class="absolute top-2 right-2 text-green-500">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <span v-else-if="option === entry.extra.quiz.selectedAnswer && option !== entry.extra.quiz.correctAnswer" class="absolute top-2 right-2 text-red-500">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.quiz.selectedAnswer"
      :correct-answer="entry.extra.quiz.correctAnswer"
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
