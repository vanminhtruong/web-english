<template>
  <div class="perspective-1000">
    <div
      :class="['flashcard', { 'flipped': isFlipped }]"
      @click="$emit('flip-card')"
      class="relative w-full h-96 cursor-pointer"
    >
      <!-- Front Side -->
      <div class="flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-8">
        <div class="text-center">
          <div class="mb-4">
            <span class="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
              {{ getTopicName(currentCard.category) }}
            </span>
          </div>
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ currentCard.word }}</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ currentCard.pronunciation }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Nhấn để xem nghĩa</p>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flashcard-face flashcard-back absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-8">
        <div class="text-center text-white">
          <h3 class="text-2xl font-bold mb-4">{{ currentCard.meaning }}</h3>
          <p class="text-lg mb-4" v-if="currentCard.partOfSpeech">{{ currentCard.partOfSpeech }}</p>
          <p class="text-base mb-4" v-if="currentCard.example">{{ currentCard.example }}</p>
          <p class="text-sm opacity-75">Nhấn để quay lại</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTopicName } from '../../../utils/topicUtils'

interface FlashcardData {
  word: string
  meaning: string
  pronunciation: string
  category: string
  partOfSpeech?: string
  example?: string
}

interface Props {
  currentCard: FlashcardData
  isFlipped: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'flip-card': []
}>()
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.flashcard {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  backface-visibility: hidden;
}

.flashcard-front {
  transform: rotateY(0deg);
}

.flashcard-back {
  transform: rotateY(180deg);
}
</style>
