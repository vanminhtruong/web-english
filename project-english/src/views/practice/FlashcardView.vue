<template>
  <div class="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg dark:to-dark-bg-soft">
    <!-- Header -->
    <FlashcardHeader
      :current-index="currentIndex"
      :total-cards="currentFlashcards.length"
      :practice-mode="practiceMode"
      :shuffle-enabled="shuffleEnabled"
      :practice-started="practiceStarted"
      :image-quiz-enabled="imageQuizEnabled"
      :listening-quiz-enabled="listeningQuizEnabled"
      :typing-quiz-enabled="typingQuizEnabled"
      :image-mode-available="imageModeAvailable"
      @go-back="handleExitPractice"
      @show-history="showHistory = true"
      @change-practice-mode="changePracticeMode"
      @show-settings="showSettingsDialog = true"
      @toggle-shuffle="toggleShuffle"
      @update:image-quiz-enabled="onToggleImageQuiz($event)"
      @update:listening-quiz-enabled="onToggleListeningQuiz($event)"
      @update:typing-quiz-enabled="onToggleTypingQuiz($event)"
    />

    <!-- Progress Bar -->
    <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-50px">
      <FlashcardProgress :progress-percentage="currentProgressPercentage" />
    </LazyLoadComponent>

    <!-- Voice Settings -->
    <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
      <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div class="bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-dark-bg-mute p-3 sm:p-4 md:p-5">
          <VoiceSelector :show-voice-info="false" />
        </div>
      </div>
    </LazyLoadComponent>

    <!-- Date Filter -->
    <LazyLoadComponent animation-type="slide-right" :threshold="0.1" root-margin="-50px">
      <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div class="bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-dark-bg-mute p-3 sm:p-4 md:p-5">
          <FlashcardDateFilter
            :vocabularies="allVocabularies"
            :selectedDate="selectedDate"
            :practice-started="practiceStarted"
            @update:selectedDate="selectedDate = $event"
          />
        </div>
      </div>
    </LazyLoadComponent>

    <!-- Practice Container -->
    <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div v-if="currentFlashcards.length > 0" class="relative">
        <!-- Practice Timer -->
        <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="-50px">
          <PracticeTimer
            ref="practiceTimerRef"
            :max-time="30"
            @start="handlePracticeStart"
            @timeout="handleTimeout"
            @restart="handleTimerRestart"
            @skip="handleSkip"
          />
        </LazyLoadComponent>

        <!-- Practice Content (only show after started) -->
        <div v-if="practiceStarted">
          <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
            <template v-if="practiceMode === 'flashcard'">
              <FlashcardCard
                :current-card="currentShuffledCard"
                :is-flipped="isFlipped"
                @flip-card="flipCard"
              />
            </template>
            <template v-else-if="practiceMode === 'quiz'">
              <FlashcardQuiz
                :current-card="currentShuffledCard"
                :quiz-options="quizOptions"
                :selected-answer="selectedAnswer"
                :quiz-answered="quizAnswered"
                @select-answer="handleQuizAnswer"
              />
            </template>
            <template v-else-if="practiceMode === 'typing'">
              <FlashcardTyping
                :current-card="currentShuffledCard"
                :typing-answer="typingAnswer"
                :typing-answered="typingAnswered"
                :typing-correct="typingCorrect"
                :typing-quiz-enabled="typingQuizEnabled"
                :typing-quiz-options="typingQuizOptions"
                :typing-quiz-selected="typingQuizSelected"
                :typing-quiz-answered="typingQuizAnswered"
                @update:typing-answer="typingAnswer = $event"
                @check-answer="handleTypingAnswer"
                @select-typing-quiz-answer="handleTypingQuizAnswer($event)"
              />
            </template>
            <template v-else-if="practiceMode === 'image'">
              <FlashcardImage
                :current-card="currentShuffledCard"
                :image-answer="imageAnswer"
                :image-answered="imageAnswered"
                :image-correct="imageCorrect"
                :image-quiz-enabled="imageQuizEnabled"
                :image-quiz-options="imageQuizOptions"
                :image-quiz-selected="imageQuizSelected"
                :image-quiz-answered="imageQuizAnswered"
                @update:image-answer="imageAnswer = $event"
                @check-answer="handleImageAnswer"
                @update:image-quiz-enabled="onToggleImageQuiz($event)"
                @select-image-quiz-answer="handleImageQuizAnswer($event)"
              />
            </template>
            <template v-else-if="practiceMode === 'listening'">
              <ListeningMode
                :card="currentShuffledCard"
                :listening-answer="listeningAnswer"
                @update:listening-answer="listeningAnswer = $event"
                :listening-answered="listeningAnswered"
                :listening-correct="listeningCorrect"
                :listening-quiz-enabled="listeningQuizEnabled"
                :listening-quiz-options="listeningQuizOptions"
                :listening-quiz-selected="listeningQuizSelected"
                :listening-quiz-answered="listeningQuizAnswered"
                :get-topic-name="getTopicName"
                @check-answer="handleListeningAnswer"
                @play-audio="playAudio"
                @select-listening-quiz-answer="handleListeningQuizAnswer($event)"
              />
            </template>
            <template v-else-if="practiceMode === 'pronunciation'">
              <PronunciationMode
                :card="currentShuffledCard"
                :is-recording="isRecording"
                :pronunciation-result="pronunciationResult"
                :pronunciation-answered="pronunciationAnswered"
                :pronunciation-correct="pronunciationCorrect"
                :is-speech-recognition-supported="isSpeechRecognitionSupported"
                :get-topic-name="getTopicName"
                @start-recording="startRecording"
              />
            </template>
          </LazyLoadComponent>

          <!-- Controls -->
          <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-50px">
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
          </LazyLoadComponent>

          <!-- Stats -->
          <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
            <PracticeStats :stats="stats" :mode="practiceMode" />
          </LazyLoadComponent>
        </div>
      </div>

      <!-- Empty State -->
      <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="-50px">
        <FlashcardEmptyState v-if="currentFlashcards.length === 0" @go-to-vocabulary="goToVocabulary" />
      </LazyLoadComponent>
    </div>

    <!-- Settings Modal -->
    <SettingsModal
      :show="showSettingsDialog"
      :settings="settings"
      :local-settings="localSettings"
      :date-filter-enabled="dateFilterEnabled"
      :selected-date="selectedDate"
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
      @go-back="handleCompletionGoBack"
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
import { useModalStore } from '../../stores/modalStore'

// Initialize i18n
const { t } = useI18n()
const router = useRouter()

// Component imports using defineAsyncComponent
const LazyLoadComponent = defineAsyncComponent(() => import('../../components/LazyLoadComponent.vue'))
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

// Modal store for controlling back to top and body scroll
const modalStore = useModalStore()

// Date filter state with localStorage persistence
const STORAGE_KEY = 'flashcard-date-filter'

// Load date filter state from localStorage (always enabled)
const loadDateFilterState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        selectedDate: parsed.selectedDate || ''
      }
    }
  } catch (error) {
    console.error('Error loading date filter state:', error)
  }
  return { selectedDate: '' }
}

// Save date filter state to localStorage (enabled is implicitly true)
const saveDateFilterState = () => {
  try {
    const state = { selectedDate: selectedDate.value }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving date filter state:', error)
  }
}

// Initialize state from localStorage
const initialState = loadDateFilterState()
// Keep ref for SettingsModal compatibility; always true
const dateFilterEnabled = ref(true)
const selectedDate = ref(initialState.selectedDate)

// Persist date filter changes
watch(selectedDate, () => {
  saveDateFilterState()
})

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

// Filter flashcards by date and category
const filteredVocabularies = computed(() => {
  let vocabularies = allVocabularies.value

  // Filter by date (always enabled)
  if (selectedDate.value) {
    vocabularies = vocabularies.filter((vocab: Vocabulary) => {
      const vocabDateKey = getDateKey(vocab.createdAt)
      return vocabDateKey === selectedDate.value
    })
  }

  // Filter by category if a category is selected
  if (flashcardSettings.value.category) {
    vocabularies = vocabularies.filter((vocab: Vocabulary) => vocab.category === flashcardSettings.value.category)
  }

  return vocabularies
})

// Combine filter and shuffle logic
const baseFlashcards = computed(() => {
  return filteredVocabularies.value.filter((vocab: Vocabulary) => {
    const category = flashcardSettings.value.category
    const difficulty = flashcardSettings.value.difficulty
    const categoryMatch = !category || vocab.category === category
    const levelMatch = !difficulty || difficulty === 'all' || vocab.level === difficulty
    return categoryMatch && levelMatch
  })
})

// Determine if Image mode is available for the CURRENT effective set (date + category + difficulty)
// This ensures that when a date contains multiple topics, Image mode is only enabled if the selected
// topic (and difficulty) actually has images.
const imageModeAvailable = computed(() => {
  const cards = baseFlashcards.value
  if (cards.length === 0) return false
  // Image mode is available only if ALL cards in the current effective set have a non-empty image
  return cards.every((v: Vocabulary) => {
    const img: any = (v as any).image
    if (img == null) return false
    const s = typeof img === 'string' ? img : String(img)
    return s.trim().length > 0
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
    router.push('/')
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
  // Reset game state and navigate back to the main flashcard page
  practiceStarted.value = false
  if (practiceTimerRef.value) {
    practiceTimerRef.value.resetPractice()
  }
  // Reset indices/state managed by composable
  restartSession()
  router.push('/practice/flashcard')
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
  if (practiceTimerRef.value) {
    practiceTimerRef.value.resetPractice()
  }
  // Remove navigation guard to allow exit
  removeNavigationGuard()
  // Navigate back to home page
  router.push('/')
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

// Main game composable - must be after baseFlashcards
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
} = useFlashcardGame(baseFlashcards)

// Auto-switch away from Image mode if it becomes unavailable
watch(imageModeAvailable, (available) => {
  if (practiceMode.value === 'image' && !available) {
    // Respect rule: do not change mode during active session
    if (practiceStarted.value) {
      console.log('[Flashcard] Image mode became unavailable but practice is active; not switching mode.')
      return
    }
    console.log('[Flashcard] Image mode unavailable for current filter; switching to flashcard mode.')
    changePracticeMode('flashcard')
  }
}, { immediate: true })

// Stats composable - must be after useFlashcardGame
const {
  sessionStats,
  initializeStats,
  recordAnswer,
  nextCardStats,
  getDetailedStats
} = useFlashcardStats(stats)

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
  // Typing-quiz
  typingQuizEnabled,
  typingQuizOptions,
  typingQuizSelected,
  typingQuizAnswered,
  generateTypingQuizOptions,
  selectTypingQuizAnswer,
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
  imageQuizEnabled,
  imageQuizOptions,
  imageQuizSelected,
  imageQuizAnswered,
  generateImageQuizOptions,
  selectImageQuizAnswer,
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
  listeningQuizEnabled,
  listeningQuizOptions,
  listeningQuizSelected,
  listeningQuizAnswered,
  generateListeningQuizOptions,
  selectListeningQuizAnswer,
} = useFlashcardModes(currentShuffledCard, currentFlashcards, allVocabularies)

// Card state storage for preserving answers when navigating back/forward
interface CardState {
  // Quiz mode
  quizAnswer?: string;
  quizAnswered?: boolean;
  quizOptions?: string[]; // The options shown for the quiz
  
  // Typing mode  
  typingAnswer?: string
  typingAnswered?: boolean
  typingCorrect?: boolean
  // Typing-quiz
  typingQuizOptions?: string[]
  typingQuizSelected?: string
  typingQuizAnswered?: boolean
  
  // Listening mode
  listeningAnswer?: string
  listeningAnswered?: boolean
  listeningCorrect?: boolean
  // Listening-quiz
  listeningQuizOptions?: string[]
  listeningQuizSelected?: string
  listeningQuizAnswered?: boolean
  
  // Image mode
  imageAnswer?: string
  imageAnswered?: boolean
  imageCorrect?: boolean
  // Image-quiz state (within image mode)
  imageQuizOptions?: string[]
  imageQuizSelected?: string
  imageQuizAnswered?: boolean
  
  // Pronunciation mode
  pronunciationResult?: string
  pronunciationAnswered?: boolean
  pronunciationCorrect?: boolean
}

const cardStateStorage = ref<Record<number, CardState>>({})

// Save current card state before navigation
const saveCurrentCardState = () => {
  if (!currentShuffledCard.value) return
  
  const cardId = currentShuffledCard.value.id
  cardStateStorage.value[cardId] = {
    // Quiz mode
    quizAnswer: selectedAnswer.value,
    quizAnswered: quizAnswered.value,
    quizOptions: quizOptions.value,
    
    // Typing mode
    typingAnswer: typingAnswer.value || undefined,
    typingAnswered: typingAnswered.value || undefined,
    typingCorrect: typingCorrect.value || undefined,
    // Typing-quiz
    typingQuizOptions: typingQuizOptions.value || undefined,
    typingQuizSelected: typingQuizSelected.value || undefined,
    typingQuizAnswered: typingQuizAnswered.value || undefined,
    
    // Listening mode
    listeningAnswer: listeningAnswer.value || undefined,
    listeningAnswered: listeningAnswered.value || undefined,
    listeningCorrect: listeningCorrect.value || undefined,
    // Listening-quiz
    listeningQuizOptions: listeningQuizOptions.value || undefined,
    listeningQuizSelected: listeningQuizSelected.value || undefined,
    listeningQuizAnswered: listeningQuizAnswered.value || undefined,
    
    // Image mode
    imageAnswer: imageAnswer.value || undefined,
    imageAnswered: imageAnswered.value || undefined,
    imageCorrect: imageCorrect.value || undefined,
    imageQuizOptions: imageQuizOptions.value && imageQuizOptions.value.length ? imageQuizOptions.value : undefined,
    imageQuizSelected: imageQuizSelected.value || undefined,
    imageQuizAnswered: imageQuizAnswered.value || undefined,
    
    // Pronunciation mode
    pronunciationResult: pronunciationResult.value || undefined,
    pronunciationAnswered: pronunciationAnswered.value || undefined,
    pronunciationCorrect: pronunciationCorrect.value || undefined,
  }
}

// Restore card state when navigating to a card
const restoreCardState = () => {
  if (!currentShuffledCard.value) return
  
  const cardId = currentShuffledCard.value.id
  const savedState = cardStateStorage.value[cardId]
  
  if (savedState) {
    // Restore quiz mode
    if (savedState.quizOptions) {
      quizOptions.value = savedState.quizOptions;
    }
    if (savedState.quizAnswer !== undefined) {
      selectedAnswer.value = savedState.quizAnswer;
    }
    if (savedState.quizAnswered !== undefined) {
      quizAnswered.value = savedState.quizAnswered;
    }
    
    // Restore typing mode
    if (savedState.typingAnswer !== undefined) {
      typingAnswer.value = savedState.typingAnswer
    }
    if (savedState.typingAnswered !== undefined) {
      typingAnswered.value = savedState.typingAnswered
    }
    if (savedState.typingCorrect !== undefined) {
      typingCorrect.value = savedState.typingCorrect
    }
    // Restore typing-quiz
    if (savedState.typingQuizOptions !== undefined) {
      typingQuizOptions.value = savedState.typingQuizOptions
    }
    if (savedState.typingQuizSelected !== undefined) {
      typingQuizSelected.value = savedState.typingQuizSelected
    }
    if (savedState.typingQuizAnswered !== undefined) {
      typingQuizAnswered.value = savedState.typingQuizAnswered
    }
    
    // Restore listening mode
    if (savedState.listeningAnswer !== undefined) {
      listeningAnswer.value = savedState.listeningAnswer
    }
    if (savedState.listeningAnswered !== undefined) {
      listeningAnswered.value = savedState.listeningAnswered
    }
    if (savedState.listeningCorrect !== undefined) {
      listeningCorrect.value = savedState.listeningCorrect
    }
    // Restore listening-quiz
    if (savedState.listeningQuizOptions !== undefined) {
      listeningQuizOptions.value = savedState.listeningQuizOptions
    }
    if (savedState.listeningQuizSelected !== undefined) {
      listeningQuizSelected.value = savedState.listeningQuizSelected
    }
    if (savedState.listeningQuizAnswered !== undefined) {
      listeningQuizAnswered.value = savedState.listeningQuizAnswered
    }
    
    // Restore image mode
    if (savedState.imageAnswer !== undefined) {
      imageAnswer.value = savedState.imageAnswer
    }
    if (savedState.imageAnswered !== undefined) {
      imageAnswered.value = savedState.imageAnswered
    }
    if (savedState.imageCorrect !== undefined) {
      imageCorrect.value = savedState.imageCorrect
    }
    if (savedState.imageQuizOptions !== undefined) {
      imageQuizOptions.value = savedState.imageQuizOptions
    }
    if (savedState.imageQuizSelected !== undefined) {
      imageQuizSelected.value = savedState.imageQuizSelected
    }
    if (savedState.imageQuizAnswered !== undefined) {
      imageQuizAnswered.value = savedState.imageQuizAnswered
    }
    
    // Restore pronunciation mode
    if (savedState.pronunciationResult !== undefined) {
      pronunciationResult.value = savedState.pronunciationResult
    }
    if (savedState.pronunciationAnswered !== undefined) {
      pronunciationAnswered.value = savedState.pronunciationAnswered
    }
    if (savedState.pronunciationCorrect !== undefined) {
      pronunciationCorrect.value = savedState.pronunciationCorrect
    }
  }
}

// Override resetCurrentCard to use modes composable
const handleQuizAnswer = (answer: string) => {
  const isCorrect = selectQuizAnswer(answer)
  recordAnswer(!!isCorrect)
}

const handleTypingAnswer = () => {
  checkTypingAnswer()
  recordAnswer(typingCorrect.value)
}
// Typing-quiz handlers
const onToggleTypingQuiz = (enabled: boolean) => {
  typingQuizEnabled.value = enabled
  resetTypingMode()
  if (enabled) {
    generateTypingQuizOptions()
  }
}

const handleTypingQuizAnswer = (answer: string) => {
  const isCorrect = selectTypingQuizAnswer(answer)
  recordAnswer(!!isCorrect)
}

const handleListeningAnswer = () => {
  checkListeningAnswer()
  recordAnswer(listeningCorrect.value)
}
// Listening-quiz handlers (within listening mode)
const onToggleListeningQuiz = (enabled: boolean) => {
  listeningQuizEnabled.value = enabled
  resetListeningMode()
  if (enabled) {
    generateListeningQuizOptions()
  }
}

const handleListeningQuizAnswer = (answer: string) => {
  const isCorrect = selectListeningQuizAnswer(answer)
  recordAnswer(!!isCorrect)
}
// Image-quiz handlers (image mode multiple-choice)
const onToggleImageQuiz = (enabled: boolean) => {
  imageQuizEnabled.value = enabled
  // Reset image mode state, but keep toggle as per composable's behavior
  resetImageMode()
  if (enabled) {
    // Prepare options for current card
    generateImageQuizOptions()
  }
}

const handleImageQuizAnswer = (answer: string) => {
  const isCorrect = selectImageQuizAnswer(answer)
  recordAnswer(!!isCorrect)
}
const resetAndRestoreCard = () => {
  // First, reset all modes to ensure a clean slate from the previous card.
  resetAllModes();

  // Second, restore the state for the new current card, if it exists.
  restoreCardState();

  // Third, generate new quiz options if needed (i.e., for a card seen for the first time).
  if (practiceMode.value === 'quiz' && currentShuffledCard.value) {
    const cardId = currentShuffledCard.value.id;
    const savedState = cardStateStorage.value[cardId];
    // Only generate options if the card hasn't been answered in a quiz before.
    if (!savedState || savedState.quizAnswer === undefined) {
      generateQuizOptions();
    }
  }
  // For image mode with quiz enabled, ensure options exist
  if (practiceMode.value === 'image' && imageQuizEnabled.value && currentShuffledCard.value) {
    if (!imageQuizOptions.value || imageQuizOptions.value.length === 0) {
      generateImageQuizOptions()
    }
  }
  // For typing mode with quiz enabled, ensure options exist
  if (practiceMode.value === 'typing' && typingQuizEnabled.value && currentShuffledCard.value) {
    if (!typingQuizOptions.value || typingQuizOptions.value.length === 0) {
      generateTypingQuizOptions()
    }
  }
  // For listening mode with quiz enabled, ensure options exist
  if (practiceMode.value === 'listening' && listeningQuizEnabled.value && currentShuffledCard.value) {
    if (!listeningQuizOptions.value || listeningQuizOptions.value.length === 0) {
      generateListeningQuizOptions()
    }
  }
};

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
  
  // Reset to first card after shuffle and clear state (order changed)
  cardStateStorage.value = {}
  currentIndex.value = 0
  resetAndRestoreCard() // Will reset and generate new quiz options as there's no state
}

// Override navigation functions to work with shuffled cards
const enhancedNextCard = () => {
  // Save current card state before navigation
  saveCurrentCardState()
  
  // For pronunciation mode, record the answer just before proceeding.
  if (practiceMode.value === 'pronunciation' && pronunciationAnswered.value) {
    recordAnswer(pronunciationCorrect.value)
  }

  if (currentIndex.value < currentFlashcards.value.length - 1) {
    currentIndex.value++
    resetAndRestoreCard()
    // Resume timer when moving to next card
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.nextCard()
    }
  } else {
    handleSessionComplete()
  }
}

const enhancedPreviousCard = () => {
  // Save current card state before navigation
  saveCurrentCardState()
  
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetAndRestoreCard()
    // Pause timer when going back to review previous card (timer display remains visible)
    if (practiceStarted.value && practiceTimerRef.value) {
      practiceTimerRef.value.stopTimer()
    }
  }
}

const enhancedMarkEasy = () => {
  recordAnswer(true)
  enhancedNextCard()
}

const enhancedMarkDifficult = () => {
  recordAnswer(false)
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
  
  // Clear all card state storage when restarting
  cardStateStorage.value = {}
  
  // Reset modal store when restarting (will hide completion modal, show back to top, enable body scroll)
  modalStore.setCompletionModal(false)
  
  // Re-shuffle cards if shuffle is enabled to get new random order
  if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
    shuffleFlashcards()
  }
  
  // Force reset without restoring state (new session)
  resetAndRestoreCard()
  
  if (practiceTimerRef.value) {
    practiceTimerRef.value.resetPractice()
  }
}

// Handle completion modal go back - reset modal store and navigate
const handleCompletionGoBack = () => {
  // Reset modal store first (hide completion modal, show back to top, enable body scroll)
  modalStore.setCompletionModal(false)
  // Then navigate back
  goBack()
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
  // When practice mode changes, reset the card.
  // No state will be restored because we are changing modes.
  resetAndRestoreCard();
  
  // Ensure shuffle is applied after mode switch (e.g., Image mode)
  // If shuffle is enabled but no shuffled list exists yet, generate it.
  if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length === 0) {
    shuffleFlashcards()
  }
})

// Save session to history when completed and stop timer
watch(showCompletionModal, (newValue) => {
  if (newValue) {
    // Stop the timer immediately when completion modal appears
    if (practiceTimerRef.value) {
      practiceTimerRef.value.stopTimer()
    }
    // Update modal store to hide back to top and control body scroll
    modalStore.setCompletionModal(true)
    saveSessionToHistory(stats.value, currentFlashcards.value.length)
  } else {
    // Reset modal store when completion modal is closed
    modalStore.setCompletionModal(false)
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

// Prevent body scroll when history modal is open
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
    resetAndRestoreCard()
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
