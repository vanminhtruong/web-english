<template>
  <div class="perspective-1000">
    <div
      :class="['flashcard', { 'flipped': isFlipped }]"
      @click="!scrambleWordsEnabled && $emit('flip-card')"
      class="relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem] xl:h-[30rem] 2xl:h-[32rem] select-none"
      @copy.prevent
      @cut.prevent
      @contextmenu.prevent
    >
    <!-- Prevent click event when in scramble mode to avoid flipping -->
      <!-- Front Side -->
      <div class="flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div class="text-center">
          <div class="mb-3 sm:mb-4 md:mb-5">
            <span class="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 xl:px-3 xl:py-1 2xl:px-3 2xl:py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base xl:text-sm 2xl:text-sm font-medium rounded-full">
              {{ getTopicName(currentCard.category) }}
            </span>
          </div>
          
          <!-- Normal Flashcard Mode -->
          <template v-if="!scrambleWordsEnabled">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5">
              {{ currentCard.word }}
            </h2>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
              {{ currentCard.pronunciation }}
            </p>
            <p class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
              {{ t('flashcard.card.flip_to_meaning', 'Click to see meaning') }}
            </p>
          </template>
          
          <!-- Scramble Words Mode -->
          <template v-else>
            <h3 class="text-base sm:text-lg md:text-xl xl:text-lg 2xl:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 xl:mb-3 2xl:mb-3">
              {{ t('flashcard.scrambleWords.instruction', 'Arrange the letters to form the word') }}
            </h3>
            <p class="text-sm sm:text-base md:text-lg xl:text-base 2xl:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 xl:mb-4 2xl:mb-5">
              {{ currentCard.pronunciation }}
            </p>
            
            <!-- User's assembled word -->
            <div class="mb-4 sm:mb-5 md:mb-6 xl:mb-4 2xl:mb-5">
              <div class="flex flex-wrap justify-center items-center gap-1 sm:gap-2 xl:gap-1.5 2xl:gap-2 mb-2 sm:mb-3 md:mb-4 xl:mb-3 2xl:mb-3 min-h-[3rem] xl:min-h-[2.5rem] 2xl:min-h-[3rem] max-w-full px-2 sm:px-0">
                <div 
                  v-for="(letter, index) in assembledWord" 
                  :key="`assembled-${index}`"
                  class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 border-2 border-gray-300 dark:border-dark-bg-mute rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#0f0f0f] text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  @click="removeLetter(index)"
                >
                  {{ letter }}
                </div>
                <!-- Empty slots -->
                <div 
                  v-for="n in Math.max(0, currentCard.word.length - assembledWord.length)" 
                  :key="`empty-${n}`"
                  class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 border-2 border-dashed border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-50 dark:bg-[#0f0f0f]"
                ></div>
              </div>
              
              <!-- Feedback -->
              <div v-if="scrambleAnswered" class="text-center max-w-full px-2">
                <div v-if="scrambleCorrect" class="text-green-600 dark:text-green-400">
                  <p class="font-semibold text-sm sm:text-base mb-2">
                    ✅ {{ t('flashcard.scrambleWords.correct', 'Correct!') }}
                  </p>
                  <div class="bg-green-50 dark:bg-[#0f0f0f] border border-green-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                    <p class="text-green-700 dark:text-green-400 font-medium text-sm sm:text-base">
                      {{ currentCard.meaning }}
                    </p>
                    <p v-if="currentCard.partOfSpeech" class="text-green-600 dark:text-green-500 text-xs sm:text-sm mt-1 opacity-80">
                      {{ t(`vocabulary.wordTypes.${currentCard.partOfSpeech}`, currentCard.partOfSpeech) }}
                    </p>
                  </div>
                </div>
                <div v-else class="text-red-600 dark:text-red-400">
                  <p class="font-semibold text-sm sm:text-base mb-2">
                    ❌ {{ t('flashcard.scrambleWords.incorrect', 'Try again!') }}
                  </p>
                  <div class="bg-red-50 dark:bg-[#0f0f0f] border border-red-200 dark:border-dark-bg-mute rounded-lg p-3 sm:p-4">
                    <p class="text-red-700 dark:text-red-400 font-bold text-base sm:text-lg mb-1">
                      {{ currentCard.word.toUpperCase() }}
                    </p>
                    <p class="text-red-600 dark:text-red-500 text-sm sm:text-base">
                      {{ currentCard.meaning }}
                    </p>
                    <p v-if="currentCard.partOfSpeech" class="text-red-500 dark:text-red-600 text-xs sm:text-sm mt-1 opacity-80">
                      {{ t(`vocabulary.wordTypes.${currentCard.partOfSpeech}`, currentCard.partOfSpeech) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Scrambled letters to choose from -->
            <div class="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 xl:gap-2 2xl:gap-2.5 mb-4 sm:mb-5 md:mb-6 xl:mb-4 2xl:mb-4 px-2 sm:px-4 md:px-6 xl:px-4 2xl:px-6 max-w-full">
              <button 
                v-for="(letter, index) in availableLetters" 
                :key="`scrambled-${index}`"
                v-show="!letter.used"
                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 border-2 border-gray-400 dark:border-dark-bg-soft rounded-lg flex items-center justify-center bg-white dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                @click="selectLetter(index)"
                :disabled="scrambleAnswered && scrambleCorrect"
              >
                {{ letter.char }}
              </button>
            </div>
            
            <!-- Control buttons -->
            <div class="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 xl:gap-2 2xl:gap-3 px-2 sm:px-4 xl:px-2 2xl:px-4 max-w-full">
              <button 
                @click="backspaceAssembledWord"
                class="px-2 py-1 xs:px-2 xs:py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2.5 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs sm:text-sm md:text-base xl:text-sm 2xl:text-base font-semibold rounded-md sm:rounded-lg transition-colors flex items-center gap-1 sm:gap-2 xl:gap-1 2xl:gap-2 min-w-0 flex-shrink-0"
                :disabled="assembledWord.length === 0 || (scrambleAnswered && scrambleCorrect)"
                :title="t('flashcard.scrambleWords.backspace', 'Backspace')"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 3.707a1 1 0 00-1.414-1.414L8 8.586 6.707 7.293a1 1 0 10-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293z" clip-rule="evenodd"/>
                </svg>
                <span class="hidden xs:hidden sm:inline">{{ t('flashcard.scrambleWords.backspace', 'Backspace') }}</span>
              </button>
              <button 
                @click="clearAssembledWord"
                class="px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white text-xs sm:text-sm md:text-base xl:text-sm 2xl:text-base font-semibold rounded-md sm:rounded-lg transition-colors min-w-0 flex-shrink-0"
                :disabled="assembledWord.length === 0 || (scrambleAnswered && scrambleCorrect)"
              >
                {{ t('flashcard.scrambleWords.clear', 'Clear') }}
              </button>
              <button 
                @click="checkScrambleAnswer"
                class="px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base xl:text-sm 2xl:text-base font-semibold rounded-md sm:rounded-lg transition-colors min-w-0 flex-shrink-0"
                :disabled="assembledWord.length !== currentCard.word.length || (scrambleAnswered && scrambleCorrect)"
              >
                {{ t('flashcard.scrambleWords.check', 'Check') }}
              </button>
            </div>
          </template>
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
    
    <!-- Fireworks + Sound effect (non-intrusive, fixed overlay) -->
    <FireworkSoundEffect 
      ref="fireworkEffect"
      :trigger-firework="triggerFirework"
      :trigger-sound="triggerSound"
      :is-correct="isCorrectAnswer"
      @effect-complete="resetTriggers"
    />
  </div>
</template>

<script setup lang="ts">
import { getTopicName } from '../../../utils/topicUtils'
import { useI18n } from 'vue-i18n'
import { ref, computed, watch, defineAsyncComponent, nextTick } from 'vue'
import { useVoiceStore } from '../../../stores/voiceStore'

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
  scrambleWordsEnabled?: boolean
  currentIndex?: number
  totalCards?: number
}

const { t } = useI18n()

const props = defineProps<Props>()

const emit = defineEmits<{
  'flip-card': []
  'next-card': []
  'show-results': []
  'scramble-answer': [data: { isCorrect: boolean; assembledWord: string[]; availableLetters: string[]; userAnswer: string }]
}>()

// Firework/Sound effect (reuse existing project component)
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Voice pronunciation
const { playAudio } = useVoiceStore()

// Auto-advance timer
let autoAdvanceTimer: number | null = null

const clearAutoAdvanceTimer = () => {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer)
    autoAdvanceTimer = null
  }
}

// Check if current screen is xs or sm (reactive to window resize)
const isSmallScreen = ref(false)

const updateScreenSize = () => {
  if (typeof window !== 'undefined') {
    isSmallScreen.value = window.innerWidth < 768 // Tailwind md breakpoint
  }
}

// Initialize and listen for resize
if (typeof window !== 'undefined') {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
}

// Scramble Words logic
interface ScrambledLetter {
  char: string
  used: boolean
  originalIndex: number
}

const assembledWord = ref<string[]>([])
const availableLetters = ref<ScrambledLetter[]>([])
const scrambleAnswered = ref(false)
const scrambleCorrect = ref(false)

// Track previous shuffle results to avoid repetition
const previousShuffles = ref<string[][]>([])
const MAX_SHUFFLE_HISTORY = 3

// Enhanced scramble algorithm with better randomization
const createAdvancedShuffle = (letters: string[]): string[] => {
  const shuffled = [...letters]
  
  // Multi-pass shuffle with different entropy sources
  const passes = Math.max(3, Math.floor(letters.length / 2) + 1)
  
  for (let pass = 0; pass < passes; pass++) {
    // Use different entropy sources for each pass
    const timeSeed = Date.now() + pass * 1000
    const randomSeed = Math.random() * 10000
    const passEntropy = (timeSeed + randomSeed) % 1
    
    // Enhanced Fisher-Yates with entropy injection
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Add multiple randomness sources
      const baseRandom = Math.random()
      const timeRandom = (Date.now() % 997) / 997 // Use prime number for better distribution
      const passRandom = (pass + 1) / passes
      const combinedRandom = (baseRandom + timeRandom + passRandom + passEntropy) % 1
      
      const j = Math.floor(combinedRandom * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Additional scrambling pass with reverse iteration
    if (pass % 2 === 0) {
      for (let i = 0; i < shuffled.length - 1; i++) {
        const entropy = (Math.random() + (Date.now() % 101) / 100) % 1
        if (entropy > 0.5) {
          const j = Math.min(i + 1 + Math.floor(Math.random() * 2), shuffled.length - 1)
          ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
      }
    }
  }
  
  return shuffled
}

// Check if current shuffle is too similar to previous ones
const isSimilarToPrevious = (current: string[], previous: string[][]): boolean => {
  if (previous.length === 0) return false
  
  return previous.some(prev => {
    if (prev.length !== current.length) return false
    
    // Count matching positions
    let matches = 0
    for (let i = 0; i < current.length; i++) {
      if (current[i] === prev[i]) matches++
    }
    
    // Consider similar if more than 60% positions match
    return (matches / current.length) > 0.6
  })
}

// Initialize scrambled letters when card changes
const initializeScrambledLetters = () => {
  if (!props.currentCard || !props.scrambleWordsEnabled) return
  
  const word = props.currentCard.word.toLowerCase()
  const letters = word.split('')
  
  // Create array of letter objects
  const letterObjects: ScrambledLetter[] = letters.map((char, index) => ({
    char: char.toUpperCase(),
    used: false,
    originalIndex: index
  }))
  
  // Try multiple shuffles until we get a sufficiently different result
  let attempts = 0
  let shuffledOrder: string[]
  const maxAttempts = 10
  
  do {
    shuffledOrder = createAdvancedShuffle(letters.map(char => char.toUpperCase()))
    attempts++
  } while (
    attempts < maxAttempts && 
    isSimilarToPrevious(shuffledOrder, previousShuffles.value)
  )
  
  // Update shuffle history
  previousShuffles.value.push(shuffledOrder)
  if (previousShuffles.value.length > MAX_SHUFFLE_HISTORY) {
    previousShuffles.value.shift()
  }
  
  // Apply the shuffle order to letter objects
  const shuffledLetterObjects: ScrambledLetter[] = []
  const usedIndices = new Set<number>()
  
  shuffledOrder.forEach((char) => {
    // Find the first unused letter object that matches this character
    const originalLetterIndex = letterObjects.findIndex((obj, idx) => 
      obj.char === char && !usedIndices.has(idx)
    )
    
    if (originalLetterIndex !== -1) {
      const originalLetterObj = letterObjects[originalLetterIndex]
      usedIndices.add(originalLetterIndex)
      
      shuffledLetterObjects.push({
        ...originalLetterObj,
        used: false
      })
    }
  })
  
  // Ensure we have all letters - if shuffle failed, use original order
  availableLetters.value = shuffledLetterObjects.length === letterObjects.length 
    ? shuffledLetterObjects 
    : letterObjects
    
  assembledWord.value = []
  scrambleAnswered.value = false
  scrambleCorrect.value = false
  
  // Debug logging
  console.log('🎲 New shuffle created:', {
    word: props.currentCard.word,
    original: letters,
    shuffled: shuffledOrder,
    attempts: attempts,
    historySize: previousShuffles.value.length
  })
}

// Watch for card changes to reinitialize
watch(() => props.currentCard, () => {
  clearAutoAdvanceTimer() // Clear timer when card changes
  if (props.scrambleWordsEnabled) {
    initializeScrambledLetters()
  }
}, { immediate: true })

// Watch for scramble mode toggle
watch(() => props.scrambleWordsEnabled, (enabled) => {
  clearAutoAdvanceTimer() // Clear timer when mode changes
  if (enabled) {
    initializeScrambledLetters()
  } else {
    // Reset state when disabled
    assembledWord.value = []
    availableLetters.value = []
    scrambleAnswered.value = false
    scrambleCorrect.value = false
    // Clear shuffle history when mode is disabled
    previousShuffles.value = []
  }
})

const selectLetter = (index: number) => {
  if (availableLetters.value[index].used) return
  if (scrambleAnswered.value && scrambleCorrect.value) return
  
  // Add letter to assembled word
  assembledWord.value.push(availableLetters.value[index].char)
  // Mark letter as used
  availableLetters.value[index].used = true
  
  // Reset feedback when user makes changes
  scrambleAnswered.value = false
  scrambleCorrect.value = false
}

const removeLetter = (assembledIndex: number) => {
  if (scrambleAnswered.value && scrambleCorrect.value) return
  
  const removedChar = assembledWord.value[assembledIndex]
  
  // Remove from assembled word
  assembledWord.value.splice(assembledIndex, 1)
  
  // Find the corresponding letter in available letters and mark as unused
  const availableIndex = availableLetters.value.findIndex(
    letter => letter.char === removedChar && letter.used
  )
  
  if (availableIndex !== -1) {
    availableLetters.value[availableIndex].used = false
  }
  
  // Reset feedback when user makes changes
  scrambleAnswered.value = false
  scrambleCorrect.value = false
}

const clearAssembledWord = () => {
  if (scrambleAnswered.value && scrambleCorrect.value) return
  
  // Mark all letters as unused
  availableLetters.value.forEach(letter => {
    letter.used = false
  })
  
  // Clear assembled word
  assembledWord.value = []
  
  // Reset feedback
  scrambleAnswered.value = false
  scrambleCorrect.value = false
}

const backspaceAssembledWord = () => {
  if (scrambleAnswered.value && scrambleCorrect.value) return
  if (assembledWord.value.length === 0) return
  
  // Remove last character from assembled word
  const removedChar = assembledWord.value.pop()
  
  // Find the corresponding letter in available letters and mark as unused
  const availableIndex = availableLetters.value.findIndex(
    letter => letter.char === removedChar && letter.used
  )
  
  if (availableIndex !== -1) {
    availableLetters.value[availableIndex].used = false
  }
  
  // Reset feedback when user makes changes
  scrambleAnswered.value = false
  scrambleCorrect.value = false
}

const checkScrambleAnswer = async () => {
  if (assembledWord.value.length !== props.currentCard.word.length) return
  
  const userAnswer = assembledWord.value.join('').toLowerCase()
  const correctAnswer = props.currentCard.word.toLowerCase()
  
  scrambleAnswered.value = true
  scrambleCorrect.value = userAnswer === correctAnswer

  // Clear any existing timer
  clearAutoAdvanceTimer()

  // Check if this is the last card
  const isLastCard = props.currentIndex !== undefined && props.totalCards !== undefined && 
                     (props.currentIndex + 1) >= props.totalCards
  
  // Debug logging
  console.log('Scramble Check Debug:', {
    currentIndex: props.currentIndex,
    totalCards: props.totalCards,
    isLastCard,
    isSmallScreen: isSmallScreen.value,
    scrambleCorrect: scrambleCorrect.value
  })

  // Emit scramble answer result to parent for stats tracking with detailed data
  const scrambleData = {
    isCorrect: scrambleCorrect.value,
    assembledWord: [...assembledWord.value],
    availableLetters: availableLetters.value.map(l => l.char),
    userAnswer: userAnswer
  }
  emit('scramble-answer', scrambleData)
  
  if (scrambleCorrect.value) {
    // Correct answer: green fireworks + voice + auto-advance
    isCorrectAnswer.value = true
    triggerFirework.value = true
    triggerSound.value = true

    // Play voice pronunciation
    try {
      await nextTick()
      await playAudio(props.currentCard.word)
    } catch (error) {
      console.warn('Voice playbook error:', error)
    }

    // Auto-advance on xs/sm screens after 2.5 seconds
    if (isSmallScreen.value) {
      console.log('Setting timer for correct answer:', isLastCard ? 'show-results' : 'next-card')
      autoAdvanceTimer = setTimeout(() => {
        console.log('Timer executed, emitting:', isLastCard ? 'show-results' : 'next-card')
        if (isLastCard) {
          emit('show-results')
        } else {
          emit('next-card')
        }
      }, 2500)
    }
  } else {
    // Incorrect answer: red fireworks only, no voice
    isCorrectAnswer.value = false
    triggerFirework.value = true
    triggerSound.value = true // Component handles red vs green based on isCorrectAnswer

    // Auto-advance on xs/sm screens after 2.5 seconds (last card shows results)
    if (isSmallScreen.value) {
      console.log('Setting timer for incorrect answer:', isLastCard ? 'show-results' : 'next-card')
      autoAdvanceTimer = setTimeout(() => {
        console.log('Timer executed for incorrect, emitting:', isLastCard ? 'show-results' : 'next-card')
        if (isLastCard) {
          emit('show-results')
        } else {
          emit('next-card')
        }
      }, 2500)
    }
  }
}
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

/* Remove tap highlight and touch effects on mobile for scramble mode elements */
.flashcard-front * {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
}

/* Specifically target clickable elements in scramble mode */
.flashcard-front button,
.flashcard-front [role="button"],
.flashcard-front .cursor-pointer {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  outline: none;
}

/* Remove focus outline on mobile for cleaner look */
@media (max-width: 767px) {
  .flashcard-front button:focus,
  .flashcard-front [role="button"]:focus,
  .flashcard-front .cursor-pointer:focus {
    outline: none;
    box-shadow: none;
  }
}
</style>
