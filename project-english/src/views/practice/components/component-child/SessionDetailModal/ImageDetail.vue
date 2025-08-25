<template>
  <!-- Image Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-3 sm:p-4 md:p-6 min-h-[280px] xs:min-h-[320px] sm:min-h-96 max-h-[500px] select-none">
      <div class="h-full flex flex-col overflow-hidden">
        <!-- Category Badge -->
        <div class="mb-3 sm:mb-4 text-center">
          <span class="px-2 py-1 xs:px-3 xs:py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-xs xs:text-sm font-medium rounded-full truncate">
            {{ entry.extra.image.category ? getTopicName(entry.extra.image.category) : 'Unknown Category' }}
          </span>
        </div>

        <!-- Image Display -->
        <div class="flex-1 flex items-center justify-center mb-3 sm:mb-4 min-h-0">
          <div v-if="entry.extra.image.image" class="relative">
            <img 
              :src="entry.extra.image.image" 
              alt="Flashcard image"
              class="max-w-full max-h-24 xs:max-h-28 sm:max-h-32 md:max-h-40 object-contain rounded-md sm:rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute"
            />
          </div>
          
          <!-- No Image State -->
          <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-md sm:rounded-lg p-4 xs:p-6 sm:p-8 w-full max-w-xs xs:max-w-sm">
            <div class="text-center">
              <svg class="mx-auto h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xs xs:text-sm text-gray-500 dark:text-white/60 mt-1 xs:mt-2">No image available for this card.</p>
            </div>
          </div>
        </div>

        <!-- Answer Area -->
        <div class="space-y-2 sm:space-y-3 flex-shrink-0">
          <!-- Typing input when quiz mode is OFF -->
          <div v-if="!entry.extra.image.isQuizMode">
            <input
              :value="entry.extra.image.userAnswer || ''"
              type="text"
              disabled
              readonly
              placeholder="Enter your answer..."
              class="w-full px-3 xs:px-4 py-2 xs:py-3 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-dark-bg-mute rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 cursor-not-allowed"
            />
          </div>

          <!-- Multiple choice when quiz mode is ON -->
          <div v-else>
            <div class="grid grid-cols-1 xs:grid-cols-2 gap-1.5 xs:gap-2 justify-items-stretch mx-auto max-w-xs xs:max-w-sm sm:max-w-lg">
              <div
                v-for="(opt, idx) in entry.extra.image.options || []"
                :key="idx"
                class="px-2 xs:px-3 py-1.5 xs:py-2 rounded border text-xs xs:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-1.5 xs:gap-2 w-full min-w-0"
                :class="[
                  opt === entry.extra.image.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                    : (opt === entry.extra.image.selectedOption
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                        : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                ]"
              >
                <span
                  class="inline-flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0"
                >
                  {{ String.fromCharCode(65 + idx) }}
                </span>
                <span class="truncate min-w-0">{{ opt }}</span>
              </div>
            </div>
          </div>

          <!-- Show result after answered -->
          <div class="text-center space-y-1 xs:space-y-2 max-h-24 xs:max-h-32 overflow-y-auto px-2">
            <div 
              :class="[
                'inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium',
                entry.isCorrect 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
              ]"
            >
              <svg v-if="entry.isCorrect === true" class="w-3 h-3 xs:w-4 xs:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-3 h-3 xs:w-4 xs:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              {{ entry.isCorrect === true ? 'Correct' : 'Incorrect' }}
            </div>
            
            <!-- Show correct answer if wrong -->
            <div v-if="entry.isCorrect !== true" class="text-center">
              <p class="text-xs xs:text-sm text-gray-600 dark:text-white/70">
                Correct answer:
                <span class="font-semibold text-gray-900 dark:text-white break-words">{{ entry.extra.image.correctAnswer }}</span>
              </p>
              <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2 break-words">
                {{ entry.meaningShort }}
              </p>
            </div>
            
            <!-- Show meaning if correct -->
            <div v-else class="text-center">
              <p class="text-xs xs:text-sm text-gray-600 dark:text-white/70 line-clamp-2 break-words">
                {{ entry.meaningShort }}
              </p>
            </div>
          </div>

          <!-- Instruction text -->
          <p v-if="!entry.extra.image.isQuizMode" class="text-center text-xs xs:text-sm text-gray-500 dark:text-white/60 px-2">
            Type the word for the image above and press Enter.
          </p>
          <p v-else class="text-center text-xs xs:text-sm text-gray-500 dark:text-white/60 px-2">
            Choose the correct word for the image.
          </p>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.image.isQuizMode ? (entry.extra.image.selectedOption || 'No answer') : (entry.extra.image.userAnswer || 'No answer')"
      :correct-answer="entry.extra.image.correctAnswer"
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
