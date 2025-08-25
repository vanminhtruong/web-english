<template>
  <!-- Pronunciation Mode-specific details -->
  <div class="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
    <!-- Exact recreation of PronunciationMode.vue traditional mode -->
    <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-2 xs:p-3 sm:p-6 md:p-8 min-h-80 xs:min-h-96 h-auto select-none overflow-hidden">
      <div class="text-center h-full flex flex-col justify-start md:justify-center items-center gap-3 md:gap-4">
        <!-- Category Badge (matching PronunciationMode exactly) -->
        <div class="mb-6">
          <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-dark-bg-mute text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
            {{ entry.extra.pronunciation.category ? getTopicName(entry.extra.pronunciation.category) : 'Unknown Category' }}
          </span>
        </div>
        
        <!-- Word (matching PronunciationMode exactly) -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-900 dark:text-white mb-3 md:mb-4 break-words">{{ entry.extra.pronunciation.word }}</h2>
        
        <!-- Pronunciation text (matching PronunciationMode exactly) -->
        <p class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/70 mb-6 md:mb-8 break-words">{{ entry.extra.pronunciation.pronunciation || entry.meaningShort || '' }}</p>

        <!-- Microphone Button (disabled, matching PronunciationMode structure) -->
        <div>
          <button
            disabled
            class="bg-gray-500 text-white p-4 sm:p-5 md:p-6 rounded-full cursor-not-allowed opacity-50"
          >
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
              <path d="M5.5 9.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z" />
              <path d="M10 18a5 5 0 005-5h-1a4 4 0 01-4 4v1z" />
            </svg>
          </button>
        </div>

        <!-- Result section (matching PronunciationMode structure) -->
        <div class="mt-5 sm:mt-6 md:mt-8">
          <!-- User's pronunciation result -->
          <p v-if="entry.extra.pronunciation.recognizedText" class="text-gray-600 dark:text-white/80 text-sm sm:text-base break-words">
            Your Recording: <span class="font-medium text-gray-800 dark:text-white">{{ entry.extra.pronunciation.recognizedText }}</span>
          </p>
          
          <!-- Answer feedback (matching PronunciationMode structure) -->
          <div class="mt-4">
            <p v-if="entry.isCorrect" class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">✓ Correct!</p>
            <p v-else class="text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">Try Again!</p>
          </div>
          
          <!-- Additional pronunciation details -->
          <div v-if="entry.extra.pronunciation.pronunciationScore !== undefined" class="mt-3 text-center">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-white/70">
              Score: <span class="font-semibold" :class="entry.extra.pronunciation.pronunciationScore >= 80 
                ? 'text-green-600 dark:text-green-400' 
                : (entry.extra.pronunciation.pronunciationScore >= 60 
                    ? 'text-orange-600 dark:text-orange-400' 
                    : 'text-red-600 dark:text-red-400')">{{ entry.extra.pronunciation.pronunciationScore }}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.pronunciation.recognizedText || 'No pronunciation attempt'"
      :correct-answer="entry.extra.pronunciation.word"
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
