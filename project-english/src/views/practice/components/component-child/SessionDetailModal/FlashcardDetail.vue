<template>
  <!-- Flashcard Mode detailed UI section -->
  <div class="space-y-3 sm:space-y-4">
    <div class="perspective-1000">
      <div
        :class="['flashcard-history', { 'flipped': flashcardFlipStates[`${cardKey}`] }]"
        @click="toggleFlashcardFlip(`${cardKey}`)"
        class="relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem] select-none"
      >
        <!-- Front Side (exactly matching FlashcardCard.vue) -->
        <div class="flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-2 sm:p-4 md:p-6">
          <div class="text-center w-full max-w-full h-full flex flex-col justify-center overflow-y-auto">
            <div class="mb-2 sm:mb-3 md:mb-4 w-full flex justify-center flex-shrink-0">
              <span class="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full max-w-[85%] truncate">
                {{ getCategoryName(entry) }}
              </span>
            </div>
            
            <!-- Normal Flashcard Mode -->
            <template v-if="entry.mode !== 'scramble-words'">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5">
                {{ getWord(entry) }}
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
                {{ getPronunciation(entry) }}
              </p>
              <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                {{ t('flashcard.card.flip_to_meaning', 'Click to see meaning') }}
              </p>
            </template>

            <!-- Scramble Words Mode -->
            <template v-else>
              <h3 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 flex-shrink-0">
                {{ t('flashcard.scrambleWords.instruction', 'Arrange the letters to form the word') }}
              </h3>
              <p class="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 flex-shrink-0">
                {{ entry.extra.scrambleWords?.pronunciation || '' }}
              </p>
              
              <!-- User's assembled word (read-only) -->
              <div class="mb-2 sm:mb-3 w-full flex-shrink-0">
                <div class="flex flex-wrap justify-center items-center gap-1 mb-1 sm:mb-2 min-h-[2.5rem] w-full px-1">
                  <div 
                    v-for="(letter, letterIdx) in (entry.extra.scrambleWords?.assembledWord || [])"
                    :key="`assembled-${letterIdx}`"
                    class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-2 border-gray-300 dark:border-dark-bg-mute rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#0f0f0f] text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-[#1a1a1a] transition-colors flex-shrink-0"
                  >
                    {{ letter }}
                  </div>
                  <!-- Empty slots -->
                  <div 
                    v-for="n in Math.max(0, (entry.extra.scrambleWords?.targetWord || entry.word).length - (entry.extra.scrambleWords?.assembledWord?.length || 0))"
                    :key="`empty-${n}`"
                    class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-2 border-dashed border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-50 dark:bg-[#0f0f0f] flex-shrink-0"
                  ></div>
                </div>
                
                <!-- Feedback (historical result) -->
                <div class="text-center w-full px-1 flex-shrink-0">
                  <div v-if="entry.isCorrect === true" class="text-green-600 dark:text-green-400">
                    <p class="font-semibold text-sm sm:text-base mb-2">
                      ✅ {{ t('flashcard.scrambleWords.correct', 'Correct!') }}
                    </p>
                    <div class="bg-green-50 dark:bg-[#0f0f0f] border border-green-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                      <p class="text-green-700 dark:text-green-400 font-medium text-sm sm:text-base">
                        {{ entry.extra.scrambleWords?.meaning || entry.meaningShort }}
                      </p>
                      <p v-if="entry.extra.scrambleWords?.partOfSpeech" class="text-green-600 dark:text-green-500 text-xs sm:text-sm mt-1 opacity-80">
                        {{ t(`vocabulary.wordTypes.${entry.extra.scrambleWords.partOfSpeech}`, entry.extra.scrambleWords.partOfSpeech) }}
                      </p>
                    </div>
                  </div>
                  <div v-else class="text-red-600 dark:text-red-400">
                    <p class="font-semibold text-sm sm:text-base mb-2">
                      ❌ {{ t('flashcard.scrambleWords.incorrect', 'Incorrect') }}
                    </p>
                    <div class="bg-red-50 dark:bg-[#0f0f0f] border border-red-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                      <p class="text-red-700 dark:text-red-400 font-bold text-base sm:text-lg mb-1">
                        {{ (entry.extra.scrambleWords?.targetWord || entry.word).toUpperCase() }}
                      </p>
                      <p class="text-red-600 dark:text-red-500 text-sm sm:text-base">
                        {{ entry.extra.scrambleWords?.meaning || entry.meaningShort }}
                      </p>
                      <p v-if="entry.extra.scrambleWords?.partOfSpeech" class="text-red-500 dark:text-red-600 text-xs sm:text-sm mt-1 opacity-80">
                        {{ t(`vocabulary.wordTypes.${entry.extra.scrambleWords.partOfSpeech}`, entry.extra.scrambleWords.partOfSpeech) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Scrambled letters to choose from -->
              <div class="flex justify-center flex-wrap gap-1 mb-2 sm:mb-3 w-full px-1 flex-shrink-0">
                <button 
                  v-for="(letter, letterIdx) in (entry.extra.scrambleWords?.scrambledLetters || [])"
                  :key="`scrambled-${letterIdx}`"
                  disabled
                  class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-2 border-gray-400 dark:border-dark-bg-soft rounded-lg flex items-center justify-center bg-white dark:bg-[#0f0f0f] text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white cursor-not-allowed opacity-75 transition-all duration-200 flex-shrink-0"
                >
                  {{ letter }}
                </button>
              </div>
              
              <!-- Control buttons -->
              <div class="flex justify-center gap-1 w-full px-1 flex-shrink-0 mt-auto">
                <button 
                  disabled
                  class="flex-1 max-w-[30%] min-w-[70px] px-1 py-1 sm:px-2 sm:py-1.5 bg-orange-500/50 hover:bg-orange-600/50 dark:bg-orange-600/50 dark:hover:bg-orange-700/50 text-white text-xs font-semibold rounded cursor-not-allowed flex items-center justify-center gap-1 truncate"
                  :title="t('flashcard.scrambleWords.backspace', 'Backspace')"
                >
                  <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 3.707a1 1 0 00-1.414-1.414L8 8.586 6.707 7.293a1 1 0 10-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293z" clip-rule="evenodd"/>
                  </svg>
                  <span class="hidden sm:inline text-xs truncate">{{ t('flashcard.scrambleWords.backspace', 'Backspace') }}</span>
                </button>
                <button 
                  disabled
                  class="flex-1 max-w-[30%] min-w-[50px] px-1 py-1 sm:px-2 sm:py-1.5 bg-gray-500/50 hover:bg-gray-600/50 dark:bg-gray-600/50 dark:hover:bg-gray-700/50 text-white text-xs font-semibold rounded cursor-not-allowed truncate"
                >
                  {{ t('flashcard.scrambleWords.clear', 'Clear') }}
                </button>
                <button 
                  disabled
                  class="flex-1 max-w-[30%] min-w-[50px] px-1 py-1 sm:px-2 sm:py-1.5 bg-blue-600/50 hover:bg-blue-700/50 text-white text-xs font-semibold rounded cursor-not-allowed truncate"
                >
                  {{ t('flashcard.scrambleWords.check', 'Check') }}
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- Back Side (exactly matching FlashcardCard.vue) -->
        <div class="flashcard-face flashcard-back absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div class="text-center text-white">
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5">
              {{ getMeaning(entry) }}
            </h3>
            <p class="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5" v-if="getPartOfSpeech(entry)">
              {{ t(`vocabulary.wordTypes.${getPartOfSpeech(entry)}`, getPartOfSpeech(entry)) }}
            </p>
            <p class="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5" v-if="getExample(entry)">
              "{{ getExample(entry) }}"
            </p>
            <p class="text-xs sm:text-sm md:text-base text-white/80">
              {{ t('flashcard.card.flip_back', 'Click to flip back') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <ResultSummary
      :user-answer="entry.extra.flashcard?.word || entry.word"
      :correct-answer="entry.extra.flashcard?.meaning || entry.meaningShort"
      :is-correct="entry.isCorrect"
      user-answer-label="Vocabulary"
      correct-answer-label="Meaning"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTopicName } from '../../../../../utils/topicUtils'
const ResultSummary = defineAsyncComponent(()=>import('./ResultSummary.vue'))


defineProps<{
  entry: any
  cardKey: string
  flashcardFlipStates: Record<string, boolean>
}>()

const emit = defineEmits<{
  toggleFlashcardFlip: [cardKey: string]
}>()

const { t } = useI18n()

const toggleFlashcardFlip = (cardKey: string) => {
  emit('toggleFlashcardFlip', cardKey)
}

const getCategoryName = (entry: any) => {
  const category = entry.extra.scrambleWords?.category || entry.extra.flashcard?.category
  return category ? getTopicName(category) : 'Unknown Category'
}

const getWord = (entry: any) => {
  return entry.extra.scrambleWords?.targetWord || entry.extra.flashcard?.word || entry.word
}

const getPronunciation = (entry: any) => {
  return entry.extra.scrambleWords?.pronunciation || entry.extra.flashcard?.pronunciation || ''
}

const getMeaning = (entry: any) => {
  return entry.extra.scrambleWords?.meaning || entry.extra.flashcard?.meaning || entry.meaningShort
}

const getPartOfSpeech = (entry: any) => {
  return entry.extra.scrambleWords?.partOfSpeech || entry.extra.flashcard?.partOfSpeech
}

const getExample = (entry: any) => {
  return entry.extra.scrambleWords?.example || entry.extra.flashcard?.example
}
</script>

<style scoped>
/* Flashcard flip animation styles (matching FlashcardCard.vue) */
.perspective-1000 {
  perspective: 1000px;
}

.flashcard-history {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flashcard-history.flipped {
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
