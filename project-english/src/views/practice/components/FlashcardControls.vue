<template>
  <div class="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
    <!-- Flashcard Mode Controls -->
    <template v-if="practiceMode === 'flashcard'">
      <button
        @click="$emit('mark-difficult')"
        class="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors"
        :title="t('practice.controls.difficult', 'Mark as difficult')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <button
        @click="$emit('previous-card')"
        :disabled="currentIndex === 0"
        class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors" :title="t('practice.controls.previous', 'Previous')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <button
        @click="$emit('next-card')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base"
      >
        {{ currentIndex === totalCards - 1 ? t('practice.controls.complete', 'Complete') : t('practice.controls.next', 'Next') }}
      </button>

      <button
        @click="$emit('mark-easy')"
        class="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors"
        :title="t('practice.controls.easy', 'Mark as easy')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Exit Button (only when practice started) -->
      <button
        v-if="practiceStarted"
        @click="$emit('exit-practice')"
        class="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors ml-2 sm:ml-3 md:ml-4"
        :title="t('practice.controls.exit', 'Exit Practice')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
        </svg>
      </button>
    </template>

    <!-- Controls for Quiz, Typing, Listening, Image, Pronunciation, and Pictionary Modes -->
    <template v-else-if="['quiz', 'typing', 'listening', 'image', 'pronunciation', 'pictionary', 'flip-tile'].includes(practiceMode)">
      <button
        @click="$emit('previous-card')"
        :disabled="currentIndex === 0"
        class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors" :title="t('practice.controls.previous', 'Previous')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <button
        @click="$emit('next-card')"
        :disabled="!canProceed"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base"
        :class="(['quiz','typing','listening','image','pictionary','flip-tile'].includes(practiceMode)) ? 'hidden md:inline-flex' : ''"
      >
        {{ currentIndex === totalCards - 1 ? t('practice.controls.complete', 'Complete') : t('practice.controls.next', 'Next') }}
      </button>

      <!-- Exit Button (only when practice started) -->
      <button
        v-if="practiceStarted"
        @click="$emit('exit-practice')"
        class="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors ml-2 sm:ml-3 md:ml-4"
        :title="t('practice.controls.exit', 'Exit Practice')"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  practiceMode: 'flashcard' | 'quiz' | 'typing' | 'listening' | 'image' | 'pronunciation' | 'pictionary' | 'bubble-shooter' | 'snake-game'
  currentIndex: number
  totalCards: number
  canProceed: boolean
  practiceStarted: boolean
  typingAnswer?: string
  typingAnswered?: boolean
  listeningAnswer?: string
  listeningAnswered?: boolean
  imageAnswer?: string
  imageAnswered?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
  'mark-difficult': []
  'mark-easy': []
  'previous-card': []
  'next-card': []
  'exit-practice': []
}>()
</script>
