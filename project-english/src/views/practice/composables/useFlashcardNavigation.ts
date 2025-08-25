import { ref, type Ref } from 'vue'
import type { Router } from 'vue-router'

export function useFlashcardNavigation(
  router: Router,
  practiceStarted: Ref<boolean>,
  practiceTimerRef: Ref<any>,
  resetShuffleState?: () => void
) {
  // Exit Warning State
  const showExitWarning = ref(false)
  const allowExit = ref(false)

  // Navigation guard reference
  let unregisterGuard: (() => void) | null = null

  // Exit warning handlers
  const continueSession = () => {
    showExitWarning.value = false
  }

  const confirmExit = () => {
    allowExit.value = true
    showExitWarning.value = false
    // End the practice session
    practiceStarted.value = false
    if (practiceTimerRef.value) {
      practiceTimerRef.value.resetPractice()
    }
    
    // Reset shuffle state to ensure fresh shuffle on re-entry
    if (resetShuffleState) {
      resetShuffleState()
      console.log('[Navigation] Shuffle state reset on exit confirmation')
    }
    
    // Remove navigation guard to allow exit
    removeNavigationGuard()
    // Navigate back to Flashcard main page
    router.push('/practice/flashcard')
  }

  const handleExitPractice = () => {
    if (practiceStarted.value && !allowExit.value) {
      showExitWarning.value = true
    } else {
      router.push('/practice/flashcard')
    }
  }

  // Navigation guard management
  const setupNavigationGuard = () => {
    if (unregisterGuard) {
      unregisterGuard()
    }
    
    unregisterGuard = router.beforeEach((to, from, next) => {
      if (practiceStarted.value && !allowExit.value && from.path.includes('/practice/flashcard')) {
        showExitWarning.value = true
        // Prevent navigation temporarily
        return false
      }
      next()
    })
  }

  const removeNavigationGuard = () => {
    if (unregisterGuard) {
      unregisterGuard()
      unregisterGuard = null
    }
  }

  // Browser beforeunload event handler
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (practiceStarted.value && !allowExit.value) {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }
  }

  // Initialize navigation protection
  const initializeNavigation = () => {
    // Reset navigation state for fresh session
    showExitWarning.value = false
    allowExit.value = false
    
    setupNavigationGuard()
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    console.log('[Navigation] Initialized with fresh state')
  }

  // Cleanup navigation protection
  const cleanupNavigation = () => {
    removeNavigationGuard()
    window.removeEventListener('beforeunload', handleBeforeUnload)
    
    // Reset state on cleanup to prevent modal from persisting
    showExitWarning.value = false
    allowExit.value = false
    
    console.log('[Navigation] Cleaned up and reset state')
  }

  // Reset navigation state - useful for manual resets
  const resetNavigationState = () => {
    showExitWarning.value = false
    allowExit.value = false
    console.log('[Navigation] State manually reset')
  }

  return {
    // State
    showExitWarning,
    allowExit,

    // Functions
    continueSession,
    confirmExit,
    handleExitPractice,
    setupNavigationGuard,
    removeNavigationGuard,
    handleBeforeUnload,
    initializeNavigation,
    cleanupNavigation,
    resetNavigationState
  }
}
