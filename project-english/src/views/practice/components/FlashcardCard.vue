<template>
  <div class="perspective-1000">
    <div
      :class="['flashcard', { 'flipped': isFlipped }]"
      @click="$emit('flip-card')"
      class="relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem]"
    >
      <!-- Front Side -->
      <div class="flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div class="text-center">
          <div class="mb-3 sm:mb-4 md:mb-5">
            <span class="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
              {{ getTopicName(currentCard.category) }}
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5">
            {{ currentCard.word }}
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
            {{ currentCard.pronunciation }}
          </p>
          <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
            {{ t('flashcard.card.flip_to_meaning', 'Click to see meaning') }}
          </p>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flashcard-face flashcard-back absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div class="text-center text-white">
          <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5">
            {{ currentCard.meaning }}
          </h3>
          <p class="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5" v-if="currentCard.partOfSpeech">
            {{ t(`vocabulary.wordTypes.${currentCard.partOfSpeech}`, currentCard.partOfSpeech) }}
          </p>
          <p class="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 leading-relaxed" v-if="currentCard.example">
            {{ currentCard.example }}
          </p>
          <p class="text-xs sm:text-sm md:text-base opacity-75">
            {{ t('flashcard.card.flip_back', 'Click to flip back') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTopicName } from '../../../utils/topicUtils'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()

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
