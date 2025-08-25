import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

export function useFlashcardShuffle(
  baseFlashcards: ComputedRef<Vocabulary[]>,
  flashcardSettings: Ref<any>,
  currentIndex: Ref<number>,
  resetAndRestoreCard: () => void
) {
  const shuffledFlashcards = ref<Vocabulary[]>([])
  
  // Force fresh session ID on every composable instantiation (new practice session)
  const sessionId = ref(Date.now() + Math.random().toString(36).substr(2, 9))
  
  console.log('[Shuffle] New composable instance created with session ID:', sessionId.value)

  // Shuffle functionality with strict duplicate prevention
  const shuffleFlashcards = (cards = baseFlashcards.value, forceNew = false) => {
    if (cards.length <= 1) {
      shuffledFlashcards.value = [...cards]
      return
    }

    // Step 1: Remove duplicates based on vocabulary ID to ensure unique cards
    const uniqueCards = cards.filter((card, index, array) => 
      array.findIndex(c => c.id === card.id) === index
    )
    
    if (uniqueCards.length !== cards.length) {
      console.warn('[Shuffle] Removed duplicate cards:', cards.length - uniqueCards.length)
    }

    // Step 2: Create shuffled copy using enhanced Fisher-Yates algorithm
    const shuffled = [...uniqueCards]
    
    // Enhanced Fisher-Yates shuffle with crypto-random if available
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Use crypto.getRandomValues for better randomness if available
      let j
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        j = array[0] % (i + 1)
      } else {
        j = Math.floor(Math.random() * (i + 1))
      }
      
      // Swap elements
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Step 3: Validate no duplicates in final result
    const uniqueIds = new Set(shuffled.map(card => card.id))
    if (uniqueIds.size !== shuffled.length) {
      console.error('[Shuffle] Duplicate IDs found after shuffle! Re-shuffling...')
      // Recursive call to fix duplicates
      return shuffleFlashcards(uniqueCards, true)
    }
    
    // Step 4: Ensure first card is different from original first card
    if (shuffled.length > 1 && shuffled[0].id === uniqueCards[0].id) {
      // Find a different card to swap with position 0
      const swapIndex = Math.floor(Math.random() * (shuffled.length - 1)) + 1
      ;[shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]]
    }
    
    // Step 5: Final validation before setting
    const finalUniqueIds = new Set(shuffled.map(card => card.id))
    if (finalUniqueIds.size !== shuffled.length) {
      console.error('[Shuffle] Critical error: Duplicates after final validation!')
      return
    }
    
    shuffledFlashcards.value = shuffled
    
    // Generate new session ID when shuffle changes to break persistence
    sessionId.value = Date.now() + Math.random().toString(36).substr(2, 9)
    
    console.log('[Shuffle] Cards shuffled with strict duplicate prevention:', {
      originalFirst: uniqueCards[0]?.word,
      shuffledFirst: shuffled[0]?.word,
      originalTotal: cards.length,
      uniqueTotal: uniqueCards.length,
      finalTotal: shuffled.length,
      sessionId: sessionId.value,
      allUnique: finalUniqueIds.size === shuffled.length
    })
  }

  // Get current flashcards (filtered + shuffled if enabled)
  const currentFlashcards = computed(() => {
    if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0) {
      return shuffledFlashcards.value
    }
    return baseFlashcards.value
  })

  // Shuffle enabled state
  const shuffleEnabled = computed(() => flashcardSettings.value.shuffleCards)

  // Toggle shuffle functionality
  const toggleShuffle = (clearCardState: () => void) => {
    // Update settings through the settings composable to ensure localStorage persistence
    flashcardSettings.value.shuffleCards = !flashcardSettings.value.shuffleCards
    
    // If shuffle is enabled, create shuffled array
    if (flashcardSettings.value.shuffleCards) {
      shuffleFlashcards()
    } else {
      // Clear shuffled array when shuffle is disabled
      shuffledFlashcards.value = []
    }
    
    // Reset to first card after shuffle and clear state (order changed)
    clearCardState()
    currentIndex.value = 0
    resetAndRestoreCard() // Will reset and generate new quiz options as there's no state
  }

  // Watch baseFlashcards changes and re-shuffle if shuffle is enabled
  const setupShuffleWatcher = (clearCardState: () => void) => {
    watch(baseFlashcards, (newCards) => {
      // If shuffle is enabled and we have cards, re-shuffle them
      if (flashcardSettings.value.shuffleCards && newCards.length > 0) {
        shuffleFlashcards(newCards)
        // Reset to first card after re-shuffle
        currentIndex.value = 0
        resetAndRestoreCard()
      }
      // If no cards and shuffle was enabled, clear shuffled array
      else if (flashcardSettings.value.shuffleCards && newCards.length === 0) {
        shuffledFlashcards.value = []
        currentIndex.value = 0
      }
    }, { immediate: false })
  }

  // Initialize shuffle if enabled - always create fresh shuffle for new sessions
  const initializeShuffle = () => {
    if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
      // Always create new shuffle when initializing (F5, page reload, navigation)
      // Clear any existing shuffle state first
      shuffledFlashcards.value = []
      
      // Force session ID refresh to break any potential caching
      sessionId.value = Date.now() + Math.random().toString(36).substr(2, 9)
      
      // Force a completely new shuffle with different seed
      const timestamp = Date.now()
      const randomSeed = Math.random() * 1000000
      
      // Multiple shuffle iterations to ensure randomness
      shuffleFlashcards(baseFlashcards.value, true)
      
      // Additional shuffle if same first card appears (ultra paranoid mode)
      const originalFirst = baseFlashcards.value[0]?.id
      let attempts = 0
      while (shuffledFlashcards.value[0]?.id === originalFirst && attempts < 5) {
        shuffleFlashcards(baseFlashcards.value, true)
        attempts++
      }
      
      console.log('[Shuffle] New session initialized with fresh shuffle', { 
        sessionId: sessionId.value,
        timestamp, 
        randomSeed,
        attempts,
        originalFirst: baseFlashcards.value[0]?.word,
        shuffledFirst: shuffledFlashcards.value[0]?.word,
        isActuallyDifferent: shuffledFlashcards.value[0]?.id !== baseFlashcards.value[0]?.id
      })
    }
  }

  // Re-shuffle for restart session
  const reshuffleForRestart = () => {
    if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
      // Force complete refresh for restart
      shuffledFlashcards.value = []
      sessionId.value = Date.now() + Math.random().toString(36).substr(2, 9)
      shuffleFlashcards()
      console.log('[Shuffle] Restart session with fresh shuffle')
    }
  }

  // Force reset shuffle state - clears everything
  const resetShuffleState = () => {
    shuffledFlashcards.value = []
    sessionId.value = Date.now() + Math.random().toString(36).substr(2, 9)
    console.log('[Shuffle] State forcefully reset with new session ID:', sessionId.value)
  }

  // Check if shuffle mode is active
  const isShuffleActive = computed(() => {
    return flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0
  })

  return {
    // State
    shuffledFlashcards,
    currentFlashcards,
    shuffleEnabled,
    isShuffleActive,

    // Functions
    shuffleFlashcards,
    toggleShuffle,
    setupShuffleWatcher,
    initializeShuffle,
    reshuffleForRestart,
    resetShuffleState
  }
}
