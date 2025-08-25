import { ref, watch } from 'vue'

export function useFlashcardModeToggles() {
  // Bubble Shooter Vietnamese Mode Toggle State with localStorage support
  const bubbleShooterVietnameseMode = ref(false)
  
  // Snake Game Double Bait Mode Toggle State with localStorage support
  const snakeDoubleBaitMode = ref(false)
  
  // Pictionary Definition Mode Toggle State with localStorage support
  const pictionaryDefinitionMode = ref(false)
  
  // Scramble Words Mode Toggle State with localStorage support
  const scrambleWordsEnabled = ref(false)
  
  // Words Crush Mode Toggle State with localStorage support
  const wordsCrushEnabled = ref(false)

  // Load/Save helpers for Bubble Shooter Vietnamese mode
  const loadBubbleShooterVietnameseModeFromStorage = () => {
    try {
      const saved = localStorage.getItem('pe_bubbleShooterVietnameseMode')
      return saved === null ? false : saved === 'true'
    } catch {
      return false
    }
  }

  const saveBubbleShooterVietnameseModeToStorage = (enabled: boolean) => {
    try {
      localStorage.setItem('pe_bubbleShooterVietnameseMode', String(enabled))
    } catch {}
  }

  // Load/Save helpers for Snake Double Bait mode
  const loadSnakeDoubleBaitModeFromStorage = () => {
    try {
      const saved = localStorage.getItem('pe_snakeDoubleBaitMode')
      return saved === null ? false : saved === 'true'
    } catch {
      return false
    }
  }

  const saveSnakeDoubleBaitModeToStorage = (enabled: boolean) => {
    try {
      localStorage.setItem('pe_snakeDoubleBaitMode', String(enabled))
    } catch {}
  }

  // Load/Save helpers for Pictionary Definition mode
  const loadPictionaryDefinitionModeFromStorage = () => {
    try {
      const saved = localStorage.getItem('pe_pictionaryDefinitionMode')
      return saved === null ? false : saved === 'true'
    } catch {
      return false
    }
  }

  const savePictionaryDefinitionModeToStorage = (enabled: boolean) => {
    try {
      localStorage.setItem('pe_pictionaryDefinitionMode', String(enabled))
    } catch {}
  }

  // Load/Save helpers for Scramble Words mode
  const loadScrambleWordsModeFromStorage = () => {
    try {
      const saved = localStorage.getItem('pe_scrambleWordsEnabled')
      return saved === null ? false : saved === 'true'
    } catch {
      return false
    }
  }

  const saveScrambleWordsModeToStorage = (enabled: boolean) => {
    try {
      localStorage.setItem('pe_scrambleWordsEnabled', String(enabled))
    } catch {}
  }

  // Load/Save helpers for Words Crush mode
  const loadWordsCrushModeFromStorage = () => {
    try {
      const saved = localStorage.getItem('pe_wordsCrushEnabled')
      return saved === null ? false : saved === 'true'
    } catch {
      return false
    }
  }

  const saveWordsCrushModeToStorage = (enabled: boolean) => {
    try {
      localStorage.setItem('pe_wordsCrushEnabled', String(enabled))
    } catch {}
  }

  // Initialize from localStorage
  const initializeToggles = () => {
    bubbleShooterVietnameseMode.value = loadBubbleShooterVietnameseModeFromStorage()
    snakeDoubleBaitMode.value = loadSnakeDoubleBaitModeFromStorage()
    pictionaryDefinitionMode.value = loadPictionaryDefinitionModeFromStorage()
    scrambleWordsEnabled.value = loadScrambleWordsModeFromStorage()
    wordsCrushEnabled.value = loadWordsCrushModeFromStorage()
  }

  // Watch for changes and save to localStorage
  watch(bubbleShooterVietnameseMode, (newVal) => {
    saveBubbleShooterVietnameseModeToStorage(newVal)
  })
  
  watch(snakeDoubleBaitMode, (newVal) => {
    saveSnakeDoubleBaitModeToStorage(newVal)
  })
  
  watch(pictionaryDefinitionMode, (newVal) => {
    savePictionaryDefinitionModeToStorage(newVal)
  })
  
  watch(scrambleWordsEnabled, (newVal) => {
    saveScrambleWordsModeToStorage(newVal)
  })
  
  watch(wordsCrushEnabled, (newVal) => {
    saveWordsCrushModeToStorage(newVal)
  })

  // Toggle functions
  const toggleBubbleShooterVietnameseMode = () => {
    bubbleShooterVietnameseMode.value = !bubbleShooterVietnameseMode.value
  }

  return {
    // Reactive states
    bubbleShooterVietnameseMode,
    snakeDoubleBaitMode,
    pictionaryDefinitionMode,
    scrambleWordsEnabled,
    wordsCrushEnabled,

    // Functions
    initializeToggles,
    toggleBubbleShooterVietnameseMode,

    // Storage helpers (exported for potential direct use)
    loadBubbleShooterVietnameseModeFromStorage,
    saveBubbleShooterVietnameseModeToStorage,
    loadSnakeDoubleBaitModeFromStorage,
    saveSnakeDoubleBaitModeToStorage,
    loadPictionaryDefinitionModeFromStorage,
    savePictionaryDefinitionModeToStorage,
    loadScrambleWordsModeFromStorage,
    saveScrambleWordsModeToStorage,
    loadWordsCrushModeFromStorage,
    saveWordsCrushModeToStorage
  }
}
