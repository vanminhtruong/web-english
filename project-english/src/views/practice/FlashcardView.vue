<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
    <!-- Header -->
    <FlashcardHeader
      :current-index="currentIndex"
      :total-cards="currentFlashcards.length"
      :practice-mode="practiceMode"
      :shuffle-enabled="shuffleEnabled"
      @go-back="goBack"
      @show-history="showHistory = true"
      @change-practice-mode="changePracticeMode"
      @show-settings="showSettingsDialog = true"
      @toggle-shuffle="toggleShuffle"
    />

    <!-- Progress Bar -->
    <FlashcardProgress :progress-percentage="currentProgressPercentage" />

    <!-- Voice Settings -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <VoiceSelector :show-voice-info="false" />
      </div>
    </div>

    <!-- Date Filter -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <FlashcardDateFilter
          :vocabularies="allVocabularies"
          :enabled="dateFilterEnabled"
          :selectedDate="selectedDate"
          @update:enabled="dateFilterEnabled = $event"
          @update:selectedDate="selectedDate = $event"
        />
      </div>
    </div>

    <!-- Practice Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="currentFlashcards.length > 0" class="relative">
        
        <!-- Practice Timer -->
        <PracticeTimer
          ref="practiceTimerRef"
          :max-time="30"
          @start="handlePracticeStart"
          @timeout="handleTimeout"
          @restart="handleTimerRestart"
          @skip="handleSkip"
        />

        <!-- Practice Content (only show after started) -->
        <div v-if="practiceStarted">
          <!-- Flashcard Mode -->
          <FlashcardCard
            v-if="practiceMode === 'flashcard'"
            :current-card="currentShuffledCard"
            :is-flipped="isFlipped"
            @flip-card="flipCard"
          />

          <!-- Quiz Mode -->
          <FlashcardQuiz
            v-else-if="practiceMode === 'quiz'"
            :current-card="currentShuffledCard"
            :quiz-options="quizOptions"
            :selected-answer="selectedAnswer"
            :quiz-answered="quizAnswered"
            @select-answer="handleQuizAnswer"
          />

          <!-- Typing Mode -->
          <FlashcardTyping
            v-else-if="practiceMode === 'typing'"
            :current-card="currentShuffledCard"
            :typing-answer="typingAnswer"
            :typing-answered="typingAnswered"
            :typing-correct="typingCorrect"
            @update:typing-answer="typingAnswer = $event"
            @check-answer="handleTypingAnswer"
          />

          <!-- Image Mode -->
          <FlashcardImage
            v-else-if="practiceMode === 'image'"
            :current-card="currentShuffledCard"
            :image-answer="imageAnswer"
            :image-answered="imageAnswered"
            :image-correct="imageCorrect"
            @update:image-answer="imageAnswer = $event"
            @check-answer="handleImageAnswer"
          />

          <!-- Pronunciation Mode -->
          <PronunciationMode
            v-else-if="practiceMode === 'pronunciation'"
            :card="currentShuffledCard"
            :is-recording="isRecording"
            :pronunciation-result="pronunciationResult"
            :pronunciation-answered="pronunciationAnswered"
            :pronunciation-correct="pronunciationCorrect"
            :is-speech-recognition-supported="isSpeechRecognitionSupported"
            :get-topic-name="getTopicName"
            @start-recording="startRecording"
          />

          <!-- Listening Mode -->
          <ListeningMode
            v-else-if="practiceMode === 'listening'"
            :card="currentShuffledCard"
            :listening-answer="listeningAnswer"
            @update:listening-answer="listeningAnswer = $event"
            :listening-answered="listeningAnswered"
            :listening-correct="listeningCorrect"
            :get-topic-name="getTopicName"
            @check-answer="handleListeningAnswer"
            @play-audio="playAudio"
          />

          <!-- Controls -->
          <FlashcardControls
          :practice-mode="practiceMode"
          :current-index="currentIndex"
          :total-cards="currentFlashcards.length"
          :can-proceed="getCanProceed()[practiceMode]"
          :practice-started="practiceStarted"
          :typing-answer="typingAnswer"
          :typing-answered="typingAnswered"
          :listening-answer="listeningAnswer"
          :listening-answered="listeningAnswered"
          :image-answer="imageAnswer"
          :image-answered="imageAnswered"
          @mark-difficult="enhancedMarkDifficult"
          @mark-easy="enhancedMarkEasy"
          @previous-card="enhancedPreviousCard"
          @next-card="enhancedNextCard"
          @check-typing-answer="handleTypingAnswer"
          @check-listening-answer="handleListeningAnswer"
          @check-image-answer="handleImageAnswer"
          @exit-practice="handleExitPractice"
        />

          <!-- Stats -->
          <PracticeStats :stats="stats" :mode="practiceMode" />
        </div>
      </div>

      <!-- Empty State -->
      <FlashcardEmptyState v-else @go-to-vocabulary="goToVocabulary" />
    </div>

    <!-- Settings Modal -->
    <SettingsModal
      :show="showSettingsDialog"
      :settings="settings"
      @update:settings="settings = $event"
      :local-settings="localSettings"
      @update:local-settings="localSettings = $event"
      @cancel="cancelSettings"
      @apply="applyGameSettings"
    />

    <!-- History Modal -->
    <HistoryModal
      :show="showHistory"
      :history="practiceHistory"
      :get-mode-color="getModeColor"
      :get-mode-text="getModeText"
      :format-date="formatDate"
      :format-duration="formatDuration"
      @close="showHistory = false"
    />

    <!-- Completion Modal -->
    <CompletionModal
      :show="showCompletionModal"
      :stats="stats"
      :card-count="flashcards.length"
      @restart="handleRestartSession"
      @go-back="goBack"
    />

    <!-- Exit Warning Modal -->
    <ExitWarningModal
      :show="showExitWarning"
      @continue="continueSession"
      @confirm="confirmExit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import type { Vocabulary } from '../../composables/useVocabularyStore'
import { getDateKey } from '../../utils/dateUtils'

// Initialize i18n
const { t } = useI18n()
const router = useRouter()

// Component imports using defineAsyncComponent
const FlashcardHeader = defineAsyncComponent(() => import('./components/FlashcardHeader.vue'))
const FlashcardProgress = defineAsyncComponent(() => import('./components/FlashcardProgress.vue'))
const FlashcardDateFilter = defineAsyncComponent(() => import('./components/FlashcardDateFilter.vue'))
const FlashcardCard = defineAsyncComponent(() => import('./components/FlashcardCard.vue'))
const FlashcardQuiz = defineAsyncComponent(() => import('./components/FlashcardQuiz.vue'))
const FlashcardTyping = defineAsyncComponent(() => import('./components/FlashcardTyping.vue'))
const FlashcardImage = defineAsyncComponent(() => import('./components/FlashcardImage.vue'))
const FlashcardControls = defineAsyncComponent(() => import('./components/FlashcardControls.vue'))
const PracticeTimer = defineAsyncComponent(() => import('./components/PracticeTimer.vue'))
const VoiceSelector = defineAsyncComponent(() => import('../../components/VoiceSelector.vue'))

// New component imports
const ExitWarningModal = defineAsyncComponent(() => import('./components/ExitWarningModal.vue'))
const CompletionModal = defineAsyncComponent(() => import('./components/CompletionModal.vue'))
const HistoryModal = defineAsyncComponent(() => import('./components/HistoryModal.vue'))
const SettingsModal = defineAsyncComponent(() => import('./components/SettingsModal.vue'))
const PronunciationMode = defineAsyncComponent(() => import('./components/PronunciationMode.vue'))
const ListeningMode = defineAsyncComponent(() => import('./components/ListeningMode.vue'))
const PracticeStats = defineAsyncComponent(() => import('./components/PracticeStats.vue'))
const FlashcardEmptyState = defineAsyncComponent(() => import('./components/FlashcardEmptyState.vue'))

// Composables
import { useFlashcardGame } from './composables/useFlashcardGame'
import { useFlashcardModes } from './composables/useFlashcardModes'
import { useFlashcardHistory } from './composables/useFlashcardHistory'
import { useFlashcardSettings } from './composables/useFlashcardSettings'
import { useFlashcardStats } from './composables/useFlashcardStats'
import { getTopicName } from '../../utils/topicUtils'

// Vocabulary store
const { allVocabularies } = useVocabularyStore()

// Date filter state with localStorage persistence
const STORAGE_KEY = 'flashcard-date-filter'

// Load date filter state from localStorage
const loadDateFilterState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        enabled: parsed.enabled || false,
        selectedDate: parsed.selectedDate || ''
      }
    }
  } catch (error) {
    console.error('Error loading date filter state:', error)
  }
  return { enabled: false, selectedDate: '' }
}

// Save date filter state to localStorage
const saveDateFilterState = () => {
  try {
    const state = {
      enabled: dateFilterEnabled.value,
      selectedDate: selectedDate.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving date filter state:', error)
  }
}

// Initialize state from localStorage
const initialState = loadDateFilterState()
const dateFilterEnabled = ref(initialState.enabled)
const selectedDate = ref(initialState.selectedDate)

// Filter flashcards by date if date filter is enabled
const filteredVocabularies = computed(() => {
  if (!dateFilterEnabled.value || !selectedDate.value) {
    return allVocabularies.value
  }
  
  return allVocabularies.value.filter((vocab: Vocabulary) => {
    const vocabDateKey = getDateKey(vocab.createdAt)
    return vocabDateKey === selectedDate.value
  })
})

// Practice Timer State
const practiceStarted = ref(false)
const practiceTimerRef = ref()

// Exit Warning State
const showExitWarning = ref(false)
const allowExit = ref(false)

// Modal states (showSettingsDialog and showHistory are imported from composables)

// Timer Event Handlers
const handlePracticeStart = () => {
  practiceStarted.value = true
  console.log('Practice started!')
}

const handleExitPractice = () => {
  if (practiceStarted.value && !allowExit.value) {
    showExitWarning.value = true
  } else {
    goBack()
  }
}

const handleTimeout = () => {
  console.log('Time out for current card!')
  // Timer modal will handle the UI
}

const handleTimerRestart = () => {
  console.log('Timer restarted for current card')
  // Card stays the same, timer restarts
}

const handleSkip = () => {
  console.log('Skip current card')
  // Move to next card
  enhancedNextCard()
}

// Exit Warning Handlers
const continueSession = () => {
  showExitWarning.value = false
}

const confirmExit = () => {
  allowExit.value = true
  showExitWarning.value = false
  // End the practice session
  practiceStarted.value = false
  // Remove navigation guard to allow exit
  removeNavigationGuard()
  // Navigate back or complete session
  goBack()
}

// Navigation guard to prevent leaving page during practice
let unregisterGuard: (() => void) | null = null

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

// Image Answer Handler
const handleImageAnswer = () => {
  checkImageAnswer()
  recordAnswer(imageCorrect.value)
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (practiceStarted.value && !allowExit.value) {
    event.preventDefault()
    event.returnValue = ''
    return ''
  }
}

// Main game composable - pass filtered vocabularies
const {
  currentIndex,
  isFlipped,
  practiceMode,
  showSettings,
  showCompletionModal,
  isCompleted,
  settings,
  stats,
  flashcards,
  currentCard,
  progressPercentage,
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
} = useFlashcardGame()

// Combine filter and shuffle logic
const baseFlashcards = computed(() => filteredVocabularies.value)

// Get current flashcards (filtered + shuffled if enabled)
const currentFlashcards = computed(() => {
  if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0) {
    return shuffledFlashcards.value
  }
  return baseFlashcards.value
})

// Current card (works with both filtered and shuffled)
const currentShuffledCard = computed(() => {
  if (currentFlashcards.value.length === 0) return null
  return currentFlashcards.value[currentIndex.value]
})

// Progress (works with current flashcards)
const currentProgressPercentage = computed(() => {
  if (currentFlashcards.value.length === 0) return 0
  if (typeof currentIndex.value !== 'number' || isNaN(currentIndex.value)) return 0
  if (currentIndex.value >= currentFlashcards.value.length) return 100
  return ((currentIndex.value + 1) / currentFlashcards.value.length) * 100
})

// Shuffle functionality
const shuffleEnabled = computed(() => flashcardSettings.value.shuffleCards)
const shuffledFlashcards = ref<any[]>([])

const toggleShuffle = () => {
  // Update settings through the settings composable to ensure localStorage persistence
  flashcardSettings.value.shuffleCards = !flashcardSettings.value.shuffleCards
  
  // If shuffle is enabled, create shuffled array
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards()
  } else {
    // Clear shuffled array when shuffle is disabled
    shuffledFlashcards.value = []
  }
  
  // Reset to first card after shuffle
  currentIndex.value = 0
  resetCurrentCardWithModes()
}

const shuffleFlashcards = (cards = baseFlashcards.value) => {
  // Fisher-Yates shuffle algorithm - use filtered flashcards
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  shuffledFlashcards.value = shuffled
}

// Modes composable
const {
  quizOptions,
  selectedAnswer,
  quizAnswered,
  generateQuizOptions,
  selectQuizAnswer,
  resetQuizMode,
  typingAnswer,
  typingAnswered,
  typingCorrect,
  checkTypingAnswer,
  resetTypingMode,
  listeningAnswer,
  listeningAnswered,
  listeningCorrect,
  checkListeningAnswer,
  playAudio,
  resetListeningMode,
  imageAnswer,
  imageAnswered,
  imageCorrect,
  checkImageAnswer,
  resetImageMode,
  resetAllModes,
  getCanProceed,
  getShortMeaning,
  // Pronunciation mode
  isRecording,
  pronunciationResult,
  pronunciationAnswered,
  pronunciationCorrect,
  isSpeechRecognitionSupported,
  startRecording,
  resetPronunciationMode,
} = useFlashcardModes(currentShuffledCard, currentFlashcards)

// History composable
const {
  showHistory,
  practiceHistory,
  saveSessionToHistory,
  getModeColor,
  getModeText,
  formatDate,
  formatDuration
} = useFlashcardHistory()

// Settings composable  
const {
  showSettings: showSettingsDialog,
  settings: flashcardSettings,
  localSettings,
  applySettings: applyGameSettings,
  resetSettings,
  cancelSettings,
  openSettings
} = useFlashcardSettings()

// Stats composable
const {
  sessionStats,
  initializeStats,
  recordAnswer,
  nextCard: nextCardStats,
  getDetailedStats
} = useFlashcardStats(stats)

// Synchronize settings
watch(flashcardSettings, (newSettings) => {
  settings.value = newSettings
}, { deep: true })

// Initialize stats when starting
watch(flashcards, (newFlashcards) => {
  if (newFlashcards.length > 0) {
    initializeStats(newFlashcards.length)
  }
}, { immediate: true })

// Watch for filter changes and update flashcards (after flashcardSettings is initialized)
watch(baseFlashcards, (newFlashcards) => {
  // Reset current index when filter changes
  currentIndex.value = 0
  
  // If shuffle is enabled, shuffle the new filtered cards
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards(newFlashcards)
  } else {
    shuffledFlashcards.value = []
  }
}, { immediate: true })

// Ensure currentIndex is valid for currentFlashcards
watch(currentFlashcards, (newFlashcards) => {
  if (newFlashcards.length === 0) {
    currentIndex.value = 0
  } else if (currentIndex.value >= newFlashcards.length) {
    currentIndex.value = Math.max(0, newFlashcards.length - 1)
  }
}, { immediate: true })

// Override resetCurrentCard to use modes composable
const handleQuizAnswer = (answer: string) => {
  const isCorrect = selectQuizAnswer(answer)
  recordAnswer(isCorrect)
}

const handleTypingAnswer = () => {
  checkTypingAnswer()
  recordAnswer(typingCorrect.value)
}

const handleListeningAnswer = () => {
  checkListeningAnswer()
  recordAnswer(listeningCorrect.value)
}

// Override resetCurrentCard to use modes composable
const resetCurrentCardWithModes = () => {
  resetCurrentCard()
  resetQuizMode()
  resetTypingMode()
  resetListeningMode()
  resetImageMode()  // Fix: Reset image mode state when moving to next card
  resetPronunciationMode()
  
  // Generate quiz options after reset if in quiz mode
  if (practiceMode.value === 'quiz') {
    generateQuizOptions()
  }
}

// Override navigation functions to work with shuffled cards
const enhancedNextCard = () => {
  // For pronunciation mode, record the answer just before proceeding.
  if (practiceMode.value === 'pronunciation' && pronunciationAnswered.value) {
    recordAnswer(pronunciationCorrect.value)
  }

  if (currentIndex.value < currentFlashcards.value.length - 1) {
    currentIndex.value++
    resetCurrentCardWithModes()
    // Reset timer for next card if practice started
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.nextCard()
    }
  } else {
    handleSessionComplete()
  }
}

const enhancedPreviousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetCurrentCardWithModes()
    // Reset timer for previous card if practice started
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.nextCard()
    }
  }
}

const enhancedMarkEasy = () => {
  recordAnswer(true)
  nextCardStats()
  enhancedNextCard()
}

const enhancedMarkDifficult = () => {
  recordAnswer(false)
  nextCardStats()
  enhancedNextCard()
}

// Enhanced completion handling
const handleSessionComplete = () => {
  completeSession()
  const totalCards = currentFlashcards.value.length
  saveSessionToHistory(stats.value, totalCards)
}

const handleRestartSession = () => {
  restartSession() // Call the original function from the composable
  practiceStarted.value = false
  if (practiceTimerRef.value) {
    practiceTimerRef.value.resetPractice()
  }
}

// Auto flip functionality
let autoFlipTimer: number | null = null

watch([currentIndex, isFlipped], () => {
  if (autoFlipTimer) {
    clearTimeout(autoFlipTimer)
  }
  
  if (flashcardSettings.value.autoFlip && !isFlipped.value) {
    autoFlipTimer = setTimeout(() => {
      isFlipped.value = true
    }, 3000) as unknown as number
  }
})

// Watch for practice mode changes
watch(practiceMode, () => {
  resetCurrentCardWithModes()
})

watch(currentIndex, () => {
  resetCurrentCardWithModes()
})

// Save session to history when completed
watch(showCompletionModal, (newValue) => {
  if (newValue) {
    saveSessionToHistory(stats.value, currentFlashcards.value.length)
  }
})

// Prevent body scroll when modal is open
watch(showHistory, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Prevent body scroll when settings modal is open
watch(showSettingsDialog, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Watch date filter state changes and save to localStorage
watch(dateFilterEnabled, () => {
  saveDateFilterState()
})

watch(selectedDate, () => {
  saveDateFilterState()
})

// Watch baseFlashcards changes and re-shuffle if shuffle is enabled
watch(baseFlashcards, (newCards) => {
  // If shuffle is enabled and we have cards, re-shuffle them
  if (flashcardSettings.value.shuffleCards && newCards.length > 0) {
    shuffleFlashcards(newCards)
    // Reset to first card after re-shuffle
    currentIndex.value = 0
    resetCurrentCardWithModes()
  }
  // If no cards and shuffle was enabled, clear shuffled array
  else if (flashcardSettings.value.shuffleCards && newCards.length === 0) {
    shuffledFlashcards.value = []
    currentIndex.value = 0
  }
}, { immediate: false })

// Initialize on mount
onMounted(() => {
  console.log('FlashcardView mounted')
  
  // Initialize stats
  initializeStats(currentFlashcards.value.length)
  
  // Initialize quiz options if in quiz mode
  if (practiceMode.value === 'quiz') {
    generateQuizOptions()
  }
  
  // Initialize shuffle if enabled
  if (flashcardSettings.value.shuffleCards) {
    shuffleFlashcards()
  }
  
  // Setup navigation guard for exit warning
  setupNavigationGuard()
  window.addEventListener('beforeunload', handleBeforeUnload)
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.classList.remove('modal-open')
  cleanup()
  
  // Remove navigation guard and event listeners
  removeNavigationGuard()
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
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

.flashcard-back {
  transform: rotateY(180deg);
}
</style>

<style>
/* Global styles for modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  overflow: hidden;
}

body.modal-open {
  overflow: hidden !important;
}
</style>
