import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVocabularyStore } from '@/composables/useVocabularyStore'

export interface GameSettings {
  cardCount: number
  difficulty: string
  autoFlip: boolean
  flipDelay: number
  showDefinition: boolean
  showExample: boolean
  showPronunciation: boolean
  shuffleCards: boolean
  voiceType: 'male' | 'female'
}

export interface GameStats {
  correct: number
  incorrect: number
  total: number
  startTime: Date
  endTime: Date | null
  mode: string
  categories?: string[]
  easy?: number
  difficult?: number
  reviewed?: number
}

export function useFlashcardGame() {
  const router = useRouter()
  const vocabularyStore = useVocabularyStore()

  // Practice mode localStorage key
  const PRACTICE_MODE_STORAGE_KEY = 'flashcard-practice-mode'

  // Load practice mode from localStorage
  const loadPracticeModeFromStorage = (): string => {
    try {
      const saved = localStorage.getItem(PRACTICE_MODE_STORAGE_KEY)
      if (saved && ['flashcard', 'quiz', 'typing', 'image', 'listening'].includes(saved)) {
        return saved
      }
    } catch (error) {
      console.error('Error loading practice mode from localStorage:', error)
    }
    return 'flashcard' // fallback to default
  }

  // Save practice mode to localStorage
  const savePracticeModeToStorage = (mode: string) => {
    try {
      localStorage.setItem(PRACTICE_MODE_STORAGE_KEY, mode)
    } catch (error) {
      console.error('Error saving practice mode to localStorage:', error)
    }
  }

  // Game state
  const currentIndex = ref(0)
  const isFlipped = ref(false)
  const practiceMode = ref(loadPracticeModeFromStorage()) // Initialize from localStorage
  const showSettings = ref(false)
  const showCompletionModal = ref(false)
  const isCompleted = ref(false)

  // Game settings
  const settings = ref<GameSettings>({
    cardCount: 20,
    difficulty: 'all',
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: 'female'
  })

  // Game stats
  const stats = ref<GameStats>({
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: new Date(),
    endTime: null,
    mode: 'flashcard'
  })

  // Get flashcards from vocabulary store
  const flashcards = computed(() => vocabularyStore.allVocabularies.value)

  // Current card
  const currentCard = computed(() => {
    if (flashcards.value.length === 0) return null
    return flashcards.value[currentIndex.value]
  })

  // Progress
  const progressPercentage = computed(() => {
    if (flashcards.value.length === 0) return 0
    return ((currentIndex.value + 1) / flashcards.value.length) * 100
  })

  // Game controls
  const nextCard = () => {
    if (currentIndex.value < flashcards.value.length - 1) {
      currentIndex.value++
      resetCurrentCard()
    } else {
      completeSession()
    }
  }

  const previousCard = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
      resetCurrentCard()
    }
  }

  const flipCard = () => {
    isFlipped.value = !isFlipped.value
  }

  const resetCurrentCard = () => {
    isFlipped.value = false
    // Reset mode-specific states will be handled by mode composables
  }

  const completeSession = () => {
    isCompleted.value = true
    stats.value.endTime = new Date()
    showCompletionModal.value = true
  }

  const restartSession = () => {
    currentIndex.value = 0
    isCompleted.value = false
    showCompletionModal.value = false
    stats.value = {
      correct: 0,
      incorrect: 0,
      total: 0,
      startTime: new Date(),
      endTime: null,
      mode: practiceMode.value
    }
    resetCurrentCard()
  }

  const changePracticeMode = (mode: string) => {
    practiceMode.value = mode
    stats.value.mode = mode
    savePracticeModeToStorage(mode) // Save to localStorage
    resetCurrentCard()
  }

  const applySettings = () => {
    showSettings.value = false
    // Apply settings logic here
  }

  const goBack = () => {
    router.push('/vocabulary')
  }

  const goToVocabulary = () => {
    router.push('/vocabulary')
  }

  const markEasy = () => {
    // Mark current card as easy - recordAnswer will be called externally
    nextCard()
  }

  const markDifficult = () => {
    // Mark current card as difficult - recordAnswer will be called externally
    nextCard()
  }

  // Auto flip functionality
  let autoFlipTimer: number | null = null

  watch([currentIndex, isFlipped], () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer)
    }
    
    if (settings.value.autoFlip && !isFlipped.value) {
      autoFlipTimer = window.setTimeout(() => {
        if (!isFlipped.value) {
          flipCard()
        }
      }, settings.value.flipDelay * 1000)
    }
  })

  // Cleanup
  const cleanup = () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer)
    }
  }

  return {
    // State
    currentIndex,
    isFlipped,
    practiceMode,
    showSettings,
    showCompletionModal,
    isCompleted,
    settings,
    stats,
    
    // Computed
    flashcards,
    currentCard,
    progressPercentage,
    
    // Methods
    nextCard,
    previousCard,
    flipCard,
    resetCurrentCard,
    completeSession,
    restartSession,
    changePracticeMode,
    applySettings,
    goBack,
    goToVocabulary,
    markEasy,
    markDifficult,
    cleanup
  }
}
