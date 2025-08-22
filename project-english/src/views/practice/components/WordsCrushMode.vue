<template>
  <div class="text-center w-full h-full flex flex-col justify-center items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 overflow-hidden"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
      <!-- Topic Badge -->
      <div class="mb-1">
        <span class="px-2 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-xs font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl font-bold text-purple-900 dark:text-purple-300 mb-1 px-1 text-center">
        {{ t('flashcard.pronunciation.wordsCrush.title', 'Words Crush: Anagram Challenge') }}
      </h2>
      
      <!-- Instructions -->
      <p class="text-xs sm:text-sm xl:text-sm 2xl:text-sm text-gray-600 dark:text-white/70 mb-1 max-w-sm px-1 text-center">
        {{ t('flashcard.pronunciation.wordsCrush.instruction', 'Fill in the missing letters to complete the word') }}
      </p>

      <!-- Pronunciation & Meaning Hint -->
      <div class="text-center mb-2">
        <p class="text-sm sm:text-base md:text-lg xl:text-base 2xl:text-lg text-gray-500 dark:text-white/70 break-words px-1">{{ card?.pronunciation }}</p>
        <p class="text-xs sm:text-sm text-gray-400 dark:text-white/60 mt-1">{{ card?.meaning }}</p>
      </div>

      <!-- Hidden Word Display -->
      <div class="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-2 px-2 max-w-full">
        <div
          v-for="(slot, index) in wordSlots"
          :key="index"
          class="relative"
        >
          <!-- Letter Slot -->
          <div
            v-if="!slot.separator"
            class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 border-2 border-purple-300 dark:border-purple-600 rounded-lg flex items-center justify-center text-sm sm:text-lg md:text-xl xl:text-lg 2xl:text-xl font-bold transition-all duration-200"
            :class="{
              'border-green-500 bg-green-50 dark:bg-green-900/20': slot.correct,
              'border-red-500 bg-red-50 dark:bg-red-900/20': slot.incorrect,
              'bg-white dark:bg-dark-bg': !slot.correct && !slot.incorrect && !slot.filled,
              'bg-purple-50 dark:bg-purple-900/20 border-purple-500': slot.filled,
              'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400': slot.revealed && !gameCompleted
            }"
          >
            <!-- Input Field -->
            <input
              v-if="!slot.filled && !slot.revealed"
              v-model="slot.userInput"
              @input="handleLetterInput(index, $event)"
              @keydown="handleKeyDown(index, $event)"
              type="text"
              maxlength="1"
              class="w-full h-full bg-transparent text-center text-sm sm:text-lg md:text-xl xl:text-lg 2xl:text-xl font-bold uppercase border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              ref="letterInput"
              placeholder="?"
            />
            <!-- Filled Letter -->
            <span v-else-if="slot.filled" class="uppercase text-purple-700 dark:text-purple-300">{{ slot.char }}</span>
            <!-- Revealed Letter -->
            <span v-else class="uppercase text-yellow-600 dark:text-yellow-400">{{ slot.char }}</span>
          </div>
          <!-- Space Separator -->
          <div v-else class="w-2 sm:w-3"></div>
        </div>
      </div>

      <!-- Audio Button -->
      <div class="mb-0.5 xl:mb-0.5 2xl:mb-1">
        <button
          @click="playPronunciation"
          class="px-2 py-0.5 md:px-3 md:py-1 xl:px-3 xl:py-1 2xl:px-3 2xl:py-1 text-xs sm:text-sm xl:text-sm 2xl:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded font-medium transition-colors flex items-center gap-1"
        >
          <svg class="w-3 h-3 xl:w-3 xl:h-3 2xl:w-3 2xl:h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.773l-4.146-3.382a.5.5 0 00-.319-.118H2a1 1 0 01-1-1V8a1 1 0 011-1h1.918a.5.5 0 00.319-.118l4.146-3.382zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1zm2.025 1.13a1 1 0 011.414.057 7 7 0 010 9.816 1 1 0 11-1.471-1.358 5 5 0 000-7.1 1 1 0 01.057-1.415zM16.5 8.5a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          {{ t('flashcard.pronunciation.wordsCrush.playSound', 'Play Sound') }}
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap justify-center gap-2 px-1 mb-2">
        <button
          v-if="!gameCompleted"
          @click="checkAnswer"
          :disabled="!canCheckAnswer"
          class="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {{ t('flashcard.pronunciation.wordsCrush.checkAnswer', 'Check Answer') }}
        </button>

        <button
          v-if="!gameCompleted && hintsUsed < maxHints"
          @click="revealHint"
          class="px-3 py-1.5 text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg"
        >
          {{ t('flashcard.pronunciation.wordsCrush.hint', 'Hint') }} ({{ hintsUsed }}/{{ maxHints }})
        </button>

        <button
          @click="resetGame"
          class="px-3 py-1.5 text-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg"
        >
          {{ t('flashcard.pronunciation.wordsCrush.reset', 'Reset') }}
        </button>
      </div>

      <!-- Result Message -->
      <div v-if="gameCompleted" class="px-1 text-center mt-0.5 xl:mt-0 2xl:mt-0.5 bg-gray-50 dark:bg-dark-bg-soft rounded py-1 xl:py-0.5 2xl:py-1">
        <p v-if="isCorrect" class="text-sm sm:text-base xl:text-base 2xl:text-lg font-bold text-green-600 dark:text-green-400 mb-0.5 xl:mb-0.5 2xl:mb-1">
          {{ t('flashcard.pronunciation.wordsCrush.correct', ' Correct!') }}
        </p>
        <p v-else class="text-sm sm:text-base xl:text-base 2xl:text-lg font-bold text-red-600 dark:text-red-400 mb-0.5 xl:mb-0.5 2xl:mb-1">
          {{ t('flashcard.pronunciation.wordsCrush.tryAgain', 'Try Again!') }}
        </p>
        <div class="space-y-0.5 xl:space-y-0 2xl:space-y-0.5 border-t border-gray-200 dark:border-dark-bg-mute pt-0.5 xl:pt-0 2xl:pt-0.5">
          <p class="text-sm xl:text-sm 2xl:text-base text-gray-700 dark:text-white/80">
            <span class="font-semibold">{{ t('flashcard.pronunciation.wordsCrush.correctWord', 'Word') }}:</span> 
            <span class="font-bold text-blue-600 dark:text-blue-400">{{ card?.word }}</span>
          </p>
          <p class="text-sm xl:text-sm 2xl:text-base text-gray-700 dark:text-white/80">
            <span class="font-semibold">{{ t('flashcard.pronunciation.wordsCrush.meaning', 'Meaning') }}:</span> 
            <span class="font-medium text-gray-900 dark:text-white">{{ card?.meaning }}</span>
          </p>
        </div>
      </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Card {
  id: number
  word: string
  meaning: string
  pronunciation: string
  category?: string
}

interface WordSlot {
  char: string
  separator: boolean
  filled: boolean
  userInput: string
  correct: boolean
  incorrect: boolean
  revealed: boolean
}

const props = defineProps<{
  card: Card | null
  getTopicName: (category: string) => string
}>()

const emit = defineEmits<{
  'game-completed': [isCorrect: boolean]
  'play-audio': [audioType: string, text: string]
}>()

const { t } = useI18n()

// Game state
const wordSlots = ref<WordSlot[]>([])
const gameCompleted = ref(false)
const isCorrect = ref(false)
const hintsUsed = ref(0)
const maxHints = 2
const letterInputs = ref<HTMLInputElement[]>([])

// Create word slots from card word
const createWordSlots = () => {
  if (!props.card?.word) return []
  
  const word = props.card.word.toLowerCase()
  const slots: WordSlot[] = []
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (char === ' ') {
      slots.push({
        char: ' ',
        separator: true,
        filled: false,
        userInput: '',
        correct: false,
        incorrect: false,
        revealed: false
      })
    } else {
      slots.push({
        char: char,
        separator: false,
        filled: false,
        userInput: '',
        correct: false,
        incorrect: false,
        revealed: false
      })
    }
  }
  
  // Get all letter slots (not separators)
  const letterSlots = slots.filter(slot => !slot.separator)
  const hideCount = Math.ceil(letterSlots.length * 0.5)
  
  // Randomly select which letters to hide
  const indicesToHide: number[] = []
  while (indicesToHide.length < hideCount) {
    const randomIndex = Math.floor(Math.random() * letterSlots.length)
    const actualIndex = slots.findIndex(slot => slot === letterSlots[randomIndex])
    if (!indicesToHide.includes(actualIndex)) {
      indicesToHide.push(actualIndex)
    }
  }
  
  // Get letters that will be shown (not hidden)
  const shownLetterIndices: number[] = []
  slots.forEach((slot, index) => {
    if (!slot.separator && !indicesToHide.includes(index)) {
      shownLetterIndices.push(index)
    }
  })
  
  // Create a shuffled array of the letters that will be shown
  const shownLetters: string[] = shownLetterIndices.map(index => slots[index].char)
  const shuffledLetters: string[] = [...shownLetters].sort(() => Math.random() - 0.5)
  
  // Assign shuffled letters to shown positions
  let shuffleIndex = 0
  slots.forEach((slot, index) => {
    if (!slot.separator) {
      if (indicesToHide.includes(index)) {
        // Keep empty for user input
      } else {
        slot.filled = true
        slot.userInput = shuffledLetters[shuffleIndex]
        shuffleIndex++
      }
    }
  })
  
  return slots
}

// Computed properties
const canCheckAnswer = computed(() => {
  return wordSlots.value.filter(slot => !slot.separator && !slot.filled).every(slot => slot.userInput.trim() !== '')
})

// Initialize game
const initializeGame = () => {
  if (!props.card?.word) return
  
  wordSlots.value = createWordSlots()
  gameCompleted.value = false
  isCorrect.value = false
  hintsUsed.value = 0
  letterInputs.value = []
}

// Input handling
const handleLetterInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.toLowerCase()
  
  if (value && /^[a-zA-Z]$/.test(value)) {
    wordSlots.value[index].userInput = value
    // Move to next empty input
    const nextEmptyIndex = wordSlots.value.findIndex((slot, i) => 
      i > index && !slot.separator && !slot.filled && slot.userInput === ''
    )
    if (nextEmptyIndex !== -1 && letterInputs.value[nextEmptyIndex]) {
      nextTick(() => {
        letterInputs.value[nextEmptyIndex].focus()
      })
    }
  } else if (value === '') {
    wordSlots.value[index].userInput = ''
  } else {
    // Invalid input, clear and stay
    target.value = ''
    wordSlots.value[index].userInput = ''
  }
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && wordSlots.value[index].userInput === '') {
    // Move to previous empty input
    const prevEmptyIndex = wordSlots.value.findIndex((slot, i) => 
      i < index && !slot.separator && !slot.filled
    )
    if (prevEmptyIndex !== -1) {
      const reversedIndex = [...wordSlots.value]
        .reverse()
        .findIndex((slot, i) => {
          const originalIndex = wordSlots.value.length - 1 - i
          return originalIndex < index && !slot.separator && !slot.filled
        })
      if (reversedIndex !== -1) {
        const actualIndex = wordSlots.value.length - 1 - reversedIndex
        if (letterInputs.value[actualIndex]) {
          nextTick(() => {
            letterInputs.value[actualIndex].focus()
          })
        }
      }
    }
  } else if (event.key === 'Enter') {
    checkAnswer()
  }
}

// Game actions
const checkAnswer = () => {
  if (!canCheckAnswer.value) return
  
  let allCorrect = true
  
  wordSlots.value.forEach(slot => {
    if (!slot.separator && !slot.filled) {
      const isLetterCorrect = slot.userInput.toLowerCase() === slot.char.toLowerCase()
      slot.correct = isLetterCorrect
      slot.incorrect = !isLetterCorrect
      if (!isLetterCorrect) allCorrect = false
    }
  })
  
  gameCompleted.value = true
  isCorrect.value = allCorrect
  
  emit('game-completed', allCorrect)
}

const revealHint = () => {
  if (hintsUsed.value >= maxHints) return
  
  const emptySlots = wordSlots.value.filter(slot => !slot.separator && !slot.filled && slot.userInput === '')
  if (emptySlots.length === 0) return
  
  const randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)]
  randomSlot.revealed = true
  randomSlot.userInput = randomSlot.char
  hintsUsed.value++
}

const resetGame = () => {
  initializeGame()
}

const playPronunciation = () => {
  if (props.card?.word) {
    emit('play-audio', 'vocabulary', props.card.word)
  }
}

// Initialize on mount and when card changes
onMounted(() => {
  initializeGame()
})

watch(() => props.card, () => {
  initializeGame()
}, { deep: true })
</script>

<style scoped>
/* Drag and drop visual effects */
.cursor-grab:active {
  cursor: grabbing;
}

/* Smooth transitions for drag elements */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Purple theme customizations */
.gradient-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}
</style>
