import { ref, computed, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import type { GameSettings, PracticeMode } from '../types'
import type { GameStats } from './useFlashcardStats'

export function useFlashcardGame(flashcards: Ref<Vocabulary[]>) {
  const router = useRouter()

  // Practice mode localStorage key
  const PRACTICE_MODE_STORAGE_KEY = 'flashcard-practice-mode'

  // Load practice mode from localStorage
  const loadPracticeModeFromStorage = (): string => {
    try {
      const saved = localStorage.getItem(PRACTICE_MODE_STORAGE_KEY)
      if (saved && ['flashcard', 'quiz', 'typing', 'image', 'listening', 'pronunciation', 'pictionary', 'flip-tile', 'bubble-shooter', 'snake-game'].includes(saved)) {
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
  const practiceMode = ref<PracticeMode>(loadPracticeModeFromStorage() as PracticeMode)
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
    voiceType: 'female',
    practiceMode: loadPracticeModeFromStorage() as PracticeMode,
  })

  // Game stats
  const stats = ref<GameStats>({
    easy: 0,
    difficult: 0,
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: new Date(),
    endTime: null,
    mode: 'flashcard'
  })

  // Ensure stats.mode always reflects the current practice mode
  // Initial sync (in case a saved mode is loaded from storage)
  stats.value.mode = practiceMode.value

  // Keep stats.mode in sync when practice mode changes
  watch(practiceMode, (mode) => {
    stats.value.mode = mode
  })

  // Current card
  const currentCard = computed(() => {
    if (flashcards.value.length === 0) return null
    return flashcards.value[currentIndex.value]
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
      easy: 0,
      difficult: 0,
      reviewed: 0,
      correct: 0,
      incorrect: 0,
      total: 0,
      startTime: new Date(),
      endTime: null,
      mode: practiceMode.value
    }
    resetCurrentCard()
  }

  const changePracticeMode = (mode: PracticeMode) => {
    practiceMode.value = mode
    settings.value.practiceMode = mode;
    savePracticeModeToStorage(mode) // Save to localStorage
    resetCurrentCard()
  }

  const applySettings = () => {
    showSettings.value = false
    // Apply settings logic here
  }

  const goBack = () => {
    router.push('/')
  }

  const goToVocabulary = () => {
    router.push('/practice/flashcard')
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
