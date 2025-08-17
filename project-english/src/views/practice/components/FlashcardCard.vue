<template>
  <div class="perspective-1000">
    <div
      :class="['flashcard', { 'flipped': isFlipped }]"
      @click="!scrambleWordsEnabled && $emit('flip-card')"
      class="relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem] select-none"
      @copy.prevent
      @cut.prevent
      @contextmenu.prevent
    >
    <!-- Prevent click event when in scramble mode to avoid flipping -->
      <!-- Front Side -->
      <div class="flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div class="text-center">
          <div class="mb-3 sm:mb-4 md:mb-5">
            <span class="px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
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
            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
              {{ t('flashcard.scrambleWords.instruction', 'Arrange the letters to form the word') }}
            </h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6">
              {{ currentCard.pronunciation }}
            </p>
            
            <!-- User's assembled word -->
            <div class="mb-4 sm:mb-5 md:mb-6">
              <div class="flex flex-wrap md:flex-nowrap justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 min-h-[3rem] max-w-full px-2 sm:px-0">
                <div 
                  v-for="(letter, index) in assembledWord" 
                  :key="`assembled-${index}`"
                  class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-300 dark:border-dark-bg-mute rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#0f0f0f] text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  @click="removeLetter(index)"
                >
                  {{ letter }}
                </div>
                <!-- Empty slots -->
                <div 
                  v-for="n in Math.max(0, currentCard.word.length - assembledWord.length)" 
                  :key="`empty-${n}`"
                  class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-dashed border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-50 dark:bg-[#0f0f0f]"
                ></div>
              </div>
              
              <!-- Feedback -->
              <div v-if="scrambleAnswered" class="text-center">
                <p v-if="scrambleCorrect" class="text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
                  ✅ {{ t('flashcard.scrambleWords.correct', 'Correct!') }}
                </p>
                <p v-else class="text-red-600 dark:text-red-400 font-semibold text-sm sm:text-base">
                  ❌ {{ t('flashcard.scrambleWords.incorrect', 'Try again!') }}
                </p>
              </div>
            </div>
            
            <!-- Scrambled letters to choose from -->
            <div class="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0 max-w-full">
              <button 
                v-for="(letter, index) in availableLetters" 
                :key="`scrambled-${index}`"
                v-show="!letter.used"
                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-400 dark:border-dark-bg-soft rounded-lg flex items-center justify-center bg-white dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                @click="selectLetter(index)"
                :disabled="scrambleAnswered && scrambleCorrect"
              >
                {{ letter.char }}
              </button>
            </div>
            
            <!-- Control buttons -->
            <div class="flex justify-center gap-2 sm:gap-3 md:gap-4">
              <button 
                @click="backspaceAssembledWord"
                class="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-1 sm:gap-2"
                :disabled="assembledWord.length === 0 || (scrambleAnswered && scrambleCorrect)"
                :title="t('flashcard.scrambleWords.backspace', 'Backspace')"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 3.707a1 1 0 00-1.414-1.414L8 8.586 6.707 7.293a1 1 0 10-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293z" clip-rule="evenodd"/>
                </svg>
                <span class="hidden sm:inline">{{ t('flashcard.scrambleWords.backspace', 'Backspace') }}</span>
              </button>
              <button 
                @click="clearAssembledWord"
                class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors"
                :disabled="assembledWord.length === 0 || (scrambleAnswered && scrambleCorrect)"
              >
                {{ t('flashcard.scrambleWords.clear', 'Clear') }}
              </button>
              <button 
                @click="checkScrambleAnswer"
                class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors"
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
  
  // Shuffle the letters using Fisher-Yates algorithm
  for (let i = letterObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letterObjects[i], letterObjects[j]] = [letterObjects[j], letterObjects[i]]
  }
  
  availableLetters.value = letterObjects
  assembledWord.value = []
  scrambleAnswered.value = false
  scrambleCorrect.value = false
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
</style>
