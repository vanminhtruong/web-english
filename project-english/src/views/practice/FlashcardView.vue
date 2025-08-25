<template>
  <div class="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg-soft dark:to-dark-bg-mute relative">
    <!-- Animated Background Elements (match Dashboard) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shapes">
        <div class="absolute top-24 left-8 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-10 left-24 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
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
      :pictionary-mode-available="pictionaryModeAvailable"
      :flip-tile-mode-available="flipTileModeAvailable"
      :bubble-shooter-mode-available="bubbleShooterModeAvailable"
      :bubble-shooter-vietnamese-mode="bubbleShooterVietnameseMode"
      :snake-double-bait-enabled="snakeDoubleBaitMode"
      :pictionary-definition-mode="pictionaryDefinitionMode"
      :scramble-words-enabled="scrambleWordsEnabled"
      :words-crush-enabled="wordsCrushEnabled"
      :use-flip-tile-hints="flashcardSettings.useFlipTileHints"
      @go-back="goBack"
      @show-history="showHistory = true"
      @change-practice-mode="changePracticeMode($event)"
      @show-settings="showSettingsDialog = true"
      @toggle-shuffle="toggleShuffle"
      @update:image-quiz-enabled="imageQuizEnabled = $event"
      @update:listening-quiz-enabled="listeningQuizEnabled = $event"
      @update:typing-quiz-enabled="typingQuizEnabled = $event"
      @update:bubble-shooter-vietnamese-mode="bubbleShooterVietnameseMode = $event"
      @update:snake-double-bait-enabled="snakeDoubleBaitMode = $event"
      @update:pictionary-definition-mode="pictionaryDefinitionMode = $event"
      @update:scramble-words-enabled="scrambleWordsEnabled = $event"
      @update:words-crush-enabled="wordsCrushEnabled = $event"
      @update:use-flip-tile-hints="handleFlipTileHintsToggle"
    />

    <!-- Progress Bar -->
    <LazyLoadComponent animation-type="slide-left" :threshold="0.1" root-margin="-50px">
      <FlashcardProgress :progress-percentage="currentProgressPercentage" />
    </LazyLoadComponent>

    <!-- Voice Settings -->
    <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
      <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div class="group bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5">
          <VoiceSelector :show-voice-info="false" />
        </div>
      </div>
    </LazyLoadComponent>

    <!-- Date Filter -->
    <LazyLoadComponent animation-type="slide-right" :threshold="0.1" root-margin="-50px">
      <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div class="group relative overflow-visible bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5">
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
        <!-- Practice Glass Container -->
        <div class="group relative overflow-hidden bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 p-3 sm:p-4 md:p-6">
          <div class="space-y-4 sm:space-y-5 md:space-y-6">
            <!-- Practice Timer / Start Button -->
            <LazyLoadComponent animation-type="fade-up" :threshold="0.1" root-margin="-50px">
              <div class="flex justify-center max-w-md mx-auto">
                <!-- Simple Start Button for Bubble Shooter & Snake modes (no countdown timer) -->
                <template v-if="practiceMode === 'bubble-shooter' || practiceMode === 'snake-game'">
                  <button
                    v-if="!practiceStarted"
                    @click="handlePracticeStart"
                    class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {{ t('practice.startGame', 'Start Game') }}
                  </button>
                </template>
                <!-- Normal Timer for Other Modes -->
                <template v-else>
                  <PracticeTimer
                    ref="practiceTimerRef"
                    :max-time="30"
                    @start="handlePracticeStart"
                    @timeout="handleTimeout"
                    @restart="handleTimerRestart"
                    @skip="handleSkip"
                  />
                </template>
              </div>
            </LazyLoadComponent>

            <!-- Practice Content (only show after started) -->
            <div v-if="practiceStarted">
              <LazyLoadComponent animation-type="scale" :threshold="0.1" root-margin="-50px">
                <template v-if="practiceMode === 'flashcard'">
                  <FlashcardCard
                    :current-card="currentShuffledCard"
                    :is-flipped="isFlipped"
                    :scramble-words-enabled="scrambleWordsEnabled"
                    :current-index="currentIndex"
                    :total-cards="currentFlashcards.length"
                    @flip-card="flipCard"
                    @next-card="enhancedNextCard"
                    @show-results="completeSession"
                    @scramble-answer="handleScrambleAnswer"
                  />
                </template>
                <template v-else-if="practiceMode === 'pictionary'">
                  <PictionaryMode
                    :card="currentShuffledCard"
                    :pictionary-answer="pictionaryAnswer"
                    :pictionary-answered="pictionaryAnswered"
                    :pictionary-correct="pictionaryCorrect"
                    :definition-mode="pictionaryDefinitionMode"
                    :get-topic-name="getTopicName"
                    @update:pictionary-answer="pictionaryAnswer = $event"
                    @check-answer="handlePictionaryAnswer"
                    @pictionary-snapshot="onPictionarySnapshot"
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
                    :words-crush-enabled="wordsCrushEnabled"
                    @start-recording="startRecording"
                    @game-completed="handleWordsCrushCompleted"
                    @play-audio="playAudio"
                  />
                </template>
                <template v-else-if="practiceMode === 'bubble-shooter'">
                  <BubbleShooterMode
                    :words="currentFlashcards"
                    :vietnamese-mode="bubbleShooterVietnameseMode"
                    @game-complete="handleBubbleShooterComplete"
                  />
                </template>
                <template v-else-if="practiceMode === 'snake-game'">
                  <SnakeGameMode
                    :words="currentFlashcards"
                    :vietnamese-mode="bubbleShooterVietnameseMode"
                    :double-bait-mode="snakeDoubleBaitMode"
                    :record-timeline="true"
                    @game-complete="handleSnakeGameComplete"
                    @correct-food-eaten="handleSnakeCorrectFoodEaten"
                    @wrong-food-eaten="handleSnakeWrongFoodEaten"
                  />
                </template>
                <template v-else-if="practiceMode === 'flip-tile'">
                  <FlipTileMode
                    :card="currentShuffledCard"
                    :flip-tile-answer="flipTileAnswer"
                    :flip-tile-answered="flipTileAnswered"
                    :flip-tile-correct="flipTileCorrect"
                    :get-topic-name="getTopicName"
                    :use-hints="flashcardSettings.useFlipTileHints"
                    @update:flip-tile-answer="flipTileAnswer = $event"
                    @check-answer="handleFlipTileAnswer"
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
                  :scramble-words-enabled="scrambleWordsEnabled"
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
      @open-details="openHistoryDetails"
      @delete-session="handleDeleteSession"
    />

    <!-- Session Detail Modal -->
    <SessionDetailModal
      :show="showSessionDetail"
      :details="selectedSessionDetails"
      @close="showSessionDetail = false"
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
import { useToast } from 'vue-toastification'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import type { Vocabulary } from '../../composables/useVocabularyStore'
import { getDateKey } from '../../utils/dateUtils'
import { useModalStore } from '../../stores/modalStore'

const ConfirmToast = defineAsyncComponent(() => import('../../components/common/ConfirmToast.vue'))

// Initialize i18n and toast
const { t } = useI18n()
const router = useRouter()
const toast = useToast()

// Single-line import of all async components (local composable)
import AsyncComponents from './composables/asyncComponents'

// Register all async components for template usage
defineOptions({ components: AsyncComponents })

// Composables
import { useFlashcardGame } from './composables/useFlashcardGame'
import { useFlashcardModes } from './composables/useFlashcardModes'
import { useFlashcardHistory } from './composables/useFlashcardHistory'
import { useFlashcardSettings } from './composables/useFlashcardSettings'
import { useFlashcardStats } from './composables/useFlashcardStats'
import { getTopicName } from '../../utils/topicUtils'
import { usePracticeSessionDetails } from './composables/usePracticeSessionDetails'
// Local composables
import { useFlashcardDateFilter } from './composables/useFlashcardDateFilter'
import { useFlashcardModeToggles } from './composables/useFlashcardModeToggles'
import { useFlashcardCardState } from './composables/useFlashcardCardState'
import { useFlashcardNavigation } from './composables/useFlashcardNavigation'
import { useFlashcardModeAvailability } from './composables/useFlashcardModeAvailability'
import { useFlashcardShuffle } from './composables/useFlashcardShuffle'

// Vocabulary store
const { allVocabularies } = useVocabularyStore()

// Modal store for controlling back to top and body scroll
const modalStore = useModalStore()

// Session details logging
const {
  startSessionDetails,
  appendAnswer,
  loadDetails,
} = usePracticeSessionDetails()
const activeSessionId = ref<string | null>(null)
const showSessionDetail = ref(false)
const selectedSessionDetails = ref<ReturnType<typeof loadDetails>>(null)

// Capture pictionary slot snapshots emitted by PictionaryMode for detailed history
const latestPictionarySnapshot = ref<{ slots: { char: string; fixed: boolean; separator?: boolean }[] } | null>(null)
const onPictionarySnapshot = (payload: { slots: { char: string; fixed: boolean; separator?: boolean }[] }) => {
  latestPictionarySnapshot.value = payload
}

// Open details modal from history list
const openHistoryDetails = (sessionId: string) => {
  const details = loadDetails(sessionId)
  selectedSessionDetails.value = details
  showSessionDetail.value = true
}

// Handle delete session from history modal with confirmation
const handleDeleteSession = (sessionId: string) => {
  const toastId = toast(
    {
      component: ConfirmToast,
      props: {
        message: t('flashcard.history.confirmDelete.message', 'Are you sure you want to delete this practice session? This action cannot be undone.'),
        confirmText: t('flashcard.history.confirmDelete.confirm', 'Delete'),
        cancelText: t('flashcard.history.confirmDelete.cancel', 'Cancel'),
        onConfirm: () => {
          deleteSession(sessionId)
          toast.success(t('flashcard.history.confirmDelete.success', 'Session deleted successfully'))
          toast.dismiss(toastId)
        },
        onCancel: () => {
          toast.dismiss(toastId)
        }
      }
    },
    {
      timeout: 0,
      closeOnClick: false,
      showCloseButtonOnHover: false,
      hideProgressBar: true
    }
  )
}

// Date filter composable
const {
  dateFilterEnabled,
  selectedDate,
  filterVocabulariesByDate
} = useFlashcardDateFilter()

// Mode toggles composable
const {
  bubbleShooterVietnameseMode,
  snakeDoubleBaitMode,
  pictionaryDefinitionMode,
  scrambleWordsEnabled,
  wordsCrushEnabled,
  initializeToggles,
  toggleBubbleShooterVietnameseMode
} = useFlashcardModeToggles()

// Initialize toggles from localStorage
initializeToggles()

// Event handlers for FlashcardHeader events - using existing implementations

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

// Filter vocabularies by date first, then by category
const filteredVocabularies = computed(() => {
  // First filter by date using composable
  let vocabularies = filterVocabulariesByDate(allVocabularies.value)

  // Then filter by category if selected
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

// Mode availability composable
const {
  imageModeAvailable,
  pictionaryModeAvailable,
  flipTileModeAvailable,
  bubbleShooterModeAvailable
} = useFlashcardModeAvailability(baseFlashcards, filteredVocabularies, allVocabularies, selectedDate)

// Practice Timer State
const practiceStarted = ref(false)
const practiceTimerRef = ref()

// Modal states (showSettingsDialog and showHistory are imported from composables)

// Timer Event Handlers
const handlePracticeStart = () => {
  // Reset navigation state for fresh practice session
  resetNavigationState()
  
  practiceStarted.value = true
  console.log('Practice started!')
  // Start a new session details log
  activeSessionId.value = `${Date.now()}`
  startSessionDetails(activeSessionId.value, practiceMode.value)
}

// handleExitPractice now provided by navigation composable

const handleTimeout = () => {
  console.log('Time out for current card!')
  // Timer modal will handle the UI
}

const handleTimerRestart = () => {
  // Restart the session from the FIRST card when user clicks "Try again" in the Time's Up modal
  // If shuffle is enabled, reshuffle to get a new random order, then go back to index 0.
  // Clear any per-card saved states and reset the practice timer and card UI state.
  console.log('Timer restarted: restarting from the first card')
  
  // Ensure we are in practice mode
  practiceStarted.value = true

  // If shuffle is enabled, reshuffle to provide a new order for the new attempt
  if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
    shuffleFlashcards()
  }

  // Clear saved states and reset to first card
  cardStateStorage.value = {}
  currentIndex.value = 0
  resetAndRestoreCard()

  // Start the timer immediately (avoid showing the Start button)
  if (practiceTimerRef.value) {
    // Start the timer directly - hasStarted will be set internally
    practiceTimerRef.value.startTimer()
  }
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

// Exit Warning Handlers now provided by navigation composable

// Navigation guard functions now provided by navigation composable

// Image Answer Handler
const handleImageAnswer = () => {
  checkImageAnswer()
  recordAnswer(imageCorrect.value)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: imageAnswer.value || '',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!imageCorrect.value,
      mode: 'image',
      extra: {
        image: {
          image: currentShuffledCard.value.image,
          isQuizMode: false,
          userAnswer: imageAnswer.value || '',
          correctAnswer: currentShuffledCard.value.word,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Image mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
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
  formatDuration,
  deleteSession
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

// Auto-switch away from Pictionary mode if it becomes unavailable
watch(pictionaryModeAvailable, (available) => {
  if (practiceMode.value === 'pictionary' && !available) {
    // Respect rule: do not change mode during active session
    if (practiceStarted.value) {
      console.log('[Flashcard] Pictionary mode became unavailable but practice is active; not switching mode.')
      return
    }
    console.log('[Flashcard] Pictionary mode unavailable for current filter; switching to flashcard mode.')
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

// Shuffle composable - must be initialized before using currentFlashcards
const {
  shuffledFlashcards,
  currentFlashcards,
  shuffleEnabled,
  shuffleFlashcards,
  toggleShuffle,
  setupShuffleWatcher,
  initializeShuffle,
  reshuffleForRestart,
  resetShuffleState
} = useFlashcardShuffle(baseFlashcards, flashcardSettings, currentIndex, () => resetAndRestoreCard())

// Navigation composable - must be after shuffle to access resetShuffleState
const {
  showExitWarning,
  allowExit,
  continueSession,
  confirmExit,
  handleExitPractice,
  initializeNavigation,
  cleanupNavigation,
  resetNavigationState
} = useFlashcardNavigation(router, practiceStarted, practiceTimerRef, resetShuffleState)

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
  // Pictionary mode
  pictionaryAnswer,
  pictionaryAnswered,
  pictionaryCorrect,
  checkPictionaryAnswer,
  resetPictionaryMode,
  // Flip tile mode
  flipTileAnswer,
  flipTileAnswered,
  flipTileCorrect,
  checkFlipTileAnswer,
  resetFlipTileMode,
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

  // Pictionary mode
  pictionaryAnswer?: string
  pictionaryAnswered?: boolean
  pictionaryCorrect?: boolean
  
  // Flip tile mode
  flipTileAnswer?: string
  flipTileAnswered?: boolean
  flipTileCorrect?: boolean
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

    // Pictionary mode
    pictionaryAnswer: pictionaryAnswer.value || undefined,
    pictionaryAnswered: pictionaryAnswered.value || undefined,
    pictionaryCorrect: pictionaryCorrect.value || undefined,
    
    // Flip tile mode
    flipTileAnswer: flipTileAnswer.value || undefined,
    flipTileAnswered: flipTileAnswered.value || undefined,
    flipTileCorrect: flipTileCorrect.value || undefined,
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

    // Restore pictionary mode
    if (savedState.pictionaryAnswer !== undefined) {
      pictionaryAnswer.value = savedState.pictionaryAnswer
    }
    if (savedState.pictionaryAnswered !== undefined) {
      pictionaryAnswered.value = savedState.pictionaryAnswered
    }
    if (savedState.pictionaryCorrect !== undefined) {
      pictionaryCorrect.value = savedState.pictionaryCorrect
    }
    
    // Restore flip tile mode
    if (savedState.flipTileAnswer !== undefined) {
      flipTileAnswer.value = savedState.flipTileAnswer
    }
    if (savedState.flipTileAnswered !== undefined) {
      flipTileAnswered.value = savedState.flipTileAnswered
    }
    if (savedState.flipTileCorrect !== undefined) {
      flipTileCorrect.value = savedState.flipTileCorrect
    }
  }
}

// Override resetCurrentCard to use modes composable
const handleQuizAnswer = (answer: string) => {
  const isCorrect = selectQuizAnswer(answer)
  recordAnswer(!!isCorrect)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: answer || '',
      correctAnswer: currentShuffledCard.value.meaning,
      isCorrect: !!isCorrect,
      mode: 'quiz',
      extra: {
        quiz: {
          question: currentShuffledCard.value.word,
          pronunciation: currentShuffledCard.value.pronunciation,
          options: quizOptions.value || [],
          selectedAnswer: answer || '',
          correctAnswer: currentShuffledCard.value.meaning,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Quiz mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}

const handleTypingAnswer = () => {
  checkTypingAnswer()
  recordAnswer(typingCorrect.value)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: typingAnswer.value || '',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!typingCorrect.value,
      mode: 'typing',
      extra: {
        typing: {
          question: getShortMeaning(currentShuffledCard.value.meaning),
          isQuizMode: false,
          userAnswer: typingAnswer.value || '',
          correctAnswer: currentShuffledCard.value.word,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Typing mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}
// Typing-quiz handlers

const handleTypingQuizAnswer = (answer: string) => {
  const isCorrect = selectTypingQuizAnswer(answer)
  recordAnswer(!!isCorrect)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: answer,
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!isCorrect,
      mode: 'typing',
      extra: {
        typing: {
          question: getShortMeaning(currentShuffledCard.value.meaning),
          isQuizMode: true,
          userAnswer: '',
          correctAnswer: currentShuffledCard.value.word,
          options: typingQuizOptions.value || [],
          selectedOption: answer,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Typing-quiz
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}

const handleListeningAnswer = () => {
  checkListeningAnswer()
  recordAnswer(listeningCorrect.value)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: listeningAnswer.value || '',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!listeningCorrect.value,
      mode: 'listening',
      extra: {
        listening: {
          isQuizMode: false,
          userAnswer: listeningAnswer.value || '',
          correctAnswer: currentShuffledCard.value.word,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Listening mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
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
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: answer,
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!isCorrect,
      mode: 'listening',
      extra: {
        listening: {
          isQuizMode: true,
          userAnswer: '',
          correctAnswer: currentShuffledCard.value.word,
          options: listeningQuizOptions.value || [],
          selectedOption: answer,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Listening-quiz
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
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
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: answer,
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!isCorrect,
      mode: 'image',
      extra: {
        image: {
          image: currentShuffledCard.value.image,
          isQuizMode: true,
          userAnswer: '',
          correctAnswer: currentShuffledCard.value.word,
          options: imageQuizOptions.value || [],
          selectedOption: answer,
          category: currentShuffledCard.value.category
        }
      }
    })
  }

  // Auto-advance on xs/sm only (viewport < md) for Image-quiz
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}

const handleFlipTileAnswer = () => {
  checkFlipTileAnswer()
  recordAnswer(flipTileCorrect.value)
  if (currentShuffledCard.value && activeSessionId.value) {
    // Calculate flip tile game state
    const word = currentShuffledCard.value.word
    const tiles = []
    const normalizeWord = (w: string) => w.normalize('NFKC')
    const letters = normalizeWord(word)
    const isAlpha = (c: string) => /^[a-z]$/i.test(c)
    
    // Build tiles array to match FlipTileMode logic
    for (let i = 0; i < letters.length; i++) {
      const c = letters[i]
      if (!isAlpha(c)) {
        tiles.push({ char: c, flipped: true, separator: true })
      } else {
        tiles.push({ char: c, flipped: true }) // All revealed after answer
      }
    }
    
    const totalLetterTiles = tiles.filter(tile => !tile.separator).length
    const maxFlips = totalLetterTiles <= 4 ? 1 : 2
    
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: flipTileAnswer.value || '',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!flipTileCorrect.value,
      mode: 'flip-tile',
      extra: {
        flipTile: {
          image: currentShuffledCard.value.image,
          useHints: flashcardSettings.value.useFlipTileHints ?? false,
          tiles: tiles,
          maxFlips: maxFlips,
          flippedCount: totalLetterTiles, // All revealed after answer check
          finalUserAnswer: flipTileAnswer.value || '',
          targetWord: currentShuffledCard.value.word,
          meaning: currentShuffledCard.value.meaning,
          category: currentShuffledCard.value.category
        }
      }
    })
  }
  
  // Auto-advance on xs/sm only (viewport < md) for Flip Tile mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}

const handlePictionaryAnswer = () => {
  checkPictionaryAnswer()
  recordAnswer(pictionaryCorrect.value)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: pictionaryAnswer.value || '',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: !!pictionaryCorrect.value,
      mode: 'pictionary',
      extra: {
        pictionary: {
          image: currentShuffledCard.value.image,
          slots: latestPictionarySnapshot.value?.slots || [],
        }
      }
    })
    // Clear snapshot after recording
    latestPictionarySnapshot.value = null
  }

  // Auto-advance on xs/sm only (viewport < md) for Pictionary mode
  if (
    practiceStarted.value &&
    typeof window !== 'undefined' &&
    window.innerWidth < 768
  ) {
    // Slight delay so feedback is visible before advancing
    setTimeout(() => {
      enhancedNextCard()
    }, 2100)
  }
}

const handleScrambleAnswer = (data: { isCorrect: boolean; assembledWord: string[]; availableLetters: string[]; userAnswer: string }) => {
  recordAnswer(data.isCorrect)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: data.userAnswer,
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: data.isCorrect,
      mode: 'scramble-words',
      extra: {
        scrambleWords: {
          targetWord: currentShuffledCard.value.word,
          scrambledLetters: data.availableLetters,
          assembledWord: data.assembledWord,
          userAnswer: data.userAnswer,
          isCorrect: data.isCorrect,
          category: currentShuffledCard.value.category,
          meaning: currentShuffledCard.value.meaning,
          pronunciation: currentShuffledCard.value.pronunciation,
          partOfSpeech: currentShuffledCard.value.partOfSpeech,
          example: currentShuffledCard.value.example
        }
      }
    })
  }
}

// Bubble Shooter mode handler
const handleBubbleShooterComplete = () => {
  // Record completion as successful
  recordAnswer(true)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: 'completed',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: true,
      mode: 'bubble-shooter',
    })
  }
  // Complete the session since Bubble Shooter is a complete game mode
  handleSessionComplete()
}

// Words Crush mode handler
const handleWordsCrushCompleted = (isCorrect: boolean) => {
  // Record the answer result
  recordAnswer(isCorrect)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: isCorrect ? currentShuffledCard.value.word : 'incomplete',
      correctAnswer: currentShuffledCard.value.word,
      isCorrect: isCorrect,
      mode: 'words-crush',
    })
  }
  
  // Set pronunciation answered state to enable Next button for large screens
  pronunciationAnswered.value = true
  pronunciationCorrect.value = isCorrect
  
  // Auto-advance only for small screens (xs, sm)
  // For large screens (md+), user needs to manually click next
  const isSmallScreen = window.innerWidth < 768 // md breakpoint
  if (isSmallScreen) {
    setTimeout(() => {
      nextCard()
    }, 2000)
  }
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

// toggleShuffle function now provided by shuffle composable

// Override navigation functions to work with shuffled cards
const enhancedNextCard = () => {
  // Save current card state before navigation
  saveCurrentCardState()
  
  // For pronunciation mode, record the answer just before proceeding.
  if (practiceMode.value === 'pronunciation' && pronunciationAnswered.value) {
    recordAnswer(pronunciationCorrect.value)
    if (currentShuffledCard.value && activeSessionId.value) {
      appendAnswer({
        cardId: currentShuffledCard.value.id,
        word: currentShuffledCard.value.word,
        meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
        userAnswer: pronunciationResult.value,
        correctAnswer: currentShuffledCard.value.word,
        isCorrect: !!pronunciationCorrect.value,
        mode: 'pronunciation',
        extra: {
          pronunciation: {
            targetWord: currentShuffledCard.value.word,
            pronunciation: currentShuffledCard.value.pronunciation,
            userPronunciation: pronunciationResult.value || '',
            isCorrect: !!pronunciationCorrect.value,
            category: currentShuffledCard.value.category,
            meaning: currentShuffledCard.value.meaning
          }
        }
      })
    }
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
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: 'marked as easy',
      correctAnswer: currentShuffledCard.value.meaning,
      isCorrect: true,
      mode: 'flashcard',
      extra: {
        flashcard: {
          word: currentShuffledCard.value.word,
          meaning: currentShuffledCard.value.meaning,
          pronunciation: currentShuffledCard.value.pronunciation,
          category: currentShuffledCard.value.category,
          partOfSpeech: currentShuffledCard.value.partOfSpeech,
          example: currentShuffledCard.value.example,
          markedAs: 'easy',
          isFlipped: isFlipped.value
        }
      }
    })
  }
  enhancedNextCard()
}

const enhancedMarkDifficult = () => {
  recordAnswer(false)
  if (currentShuffledCard.value && activeSessionId.value) {
    appendAnswer({
      cardId: currentShuffledCard.value.id,
      word: currentShuffledCard.value.word,
      meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
      userAnswer: 'marked as difficult',
      correctAnswer: currentShuffledCard.value.meaning,
      isCorrect: false,
      mode: 'flashcard',
      extra: {
        flashcard: {
          word: currentShuffledCard.value.word,
          meaning: currentShuffledCard.value.meaning,
          pronunciation: currentShuffledCard.value.pronunciation,
          category: currentShuffledCard.value.category,
          partOfSpeech: currentShuffledCard.value.partOfSpeech,
          example: currentShuffledCard.value.example,
          markedAs: 'difficult',
          isFlipped: isFlipped.value
        }
      }
    })
  }
  enhancedNextCard()
}

// Enhanced completion handling
const handleSessionComplete = () => {
  completeSession()
  const totalCards = currentFlashcards.value.length
  const id = saveSessionToHistory(stats.value, totalCards, activeSessionId.value || undefined)
  if (!activeSessionId.value) {
    activeSessionId.value = id
  }
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

// Snake Game completion handler
const handleSnakeGameComplete = () => {
  // Handle snake game completion similar to bubble shooter
  // Ensure final word is recorded if missed due to race condition
  const expectedCorrect = currentFlashcards.value.length
  const actualCorrect = stats.value.correct
  
  if (actualCorrect < expectedCorrect) {
    // Missing the last word due to race condition, record it
    recordAnswer(true)
  }
  
  // Complete the session to finalize stats before showing modal
  handleSessionComplete()
}

// Snake Game food eaten handlers
const handleSnakeCorrectFoodEaten = (details?: {
  word: string
  meaningShort: string
  position: { x: number; y: number }
  snakeLength: number
  gameScore: number
  wordsCompleted: number
  wrongEatenCount: number
  snakeBody: { x: number; y: number }[]
  direction: { x: number; y: number }
  timelineFrames?: Array<{ body: { x: number; y: number }[]; direction: { x: number; y: number } }>
}) => {
  // Count as a correct answer in practice stats
  console.log('[DEBUG] Snake correct food eaten, recording answer true')
  console.log('[DEBUG] Stats before:', { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total })
  recordAnswer(true)
  console.log('[DEBUG] Stats after:', { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total })
  
  // Record detailed session history if details provided
  if (details && activeSessionId.value) {
    console.log('[DEBUG] FlashcardView - Recording snake correct food:', details)
    console.log('[DEBUG] FlashcardView - Snake body to save:', details.snakeBody)
    console.log('[DEBUG] FlashcardView - Snake direction to save:', details.direction)
    
    appendAnswer({
      cardId: Date.now(), // Unique numeric ID for snake game food eaten
      word: details.word,
      meaningShort: details.meaningShort,
      userAnswer: details.word, // Correct food eaten
      correctAnswer: details.word,
      isCorrect: true,
      mode: 'snake-game',
      extra: {
        snakeGame: {
          position: details.position,
          wasCorrect: true,
          foodType: 'primary', // Correct food is always primary target
          snakeLength: details.snakeLength,
          gameScore: details.gameScore,
          wordsCompleted: details.wordsCompleted,
          wrongEatenCount: details.wrongEatenCount,
          snakeBody: details.snakeBody,
          direction: details.direction,
          timelineFrames: details.timelineFrames
        }
      }
    })
  }
}

const handleSnakeWrongFoodEaten = (details?: {
  word: string
  meaningShort: string
  position: { x: number; y: number }
  snakeLength: number
  gameScore: number
  wordsCompleted: number
  wrongEatenCount: number
  snakeBody: { x: number; y: number }[]
  direction: { x: number; y: number }
  timelineFrames?: Array<{ body: { x: number; y: number }[]; direction: { x: number; y: number } }>
}) => {
  // Count as an incorrect answer in practice stats
  recordAnswer(false)
  
  // Record detailed session history if details provided
  if (details && activeSessionId.value) {
    appendAnswer({
      cardId: Date.now(), // Unique numeric ID for snake game food eaten
      word: details.word,
      meaningShort: details.meaningShort,
      userAnswer: details.word, // Wrong food eaten
      correctAnswer: '', // No specific correct answer for wrong food
      isCorrect: false,
      mode: 'snake-game',
      extra: {
        snakeGame: {
          position: details.position,
          wasCorrect: false,
          foodType: 'secondary', // Wrong food is secondary/decoy
          snakeLength: details.snakeLength,
          gameScore: details.gameScore,
          wordsCompleted: details.wordsCompleted,
          wrongEatenCount: details.wrongEatenCount,
          snakeBody: details.snakeBody,
          direction: details.direction,
          timelineFrames: details.timelineFrames
        }
      }
    })
  }
}

// Snake Game food eaten handler -> count as a correct answer in practice stats
const handleSnakeFoodEaten = () => {
  recordAnswer(true)
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
  if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length === 0) {
    shuffleFlashcards()
  }
})

// Ensure fresh shuffle after exiting a session (component may be reused by router)
watch(practiceStarted, (started) => {
  if (!started && flashcardSettings.value.shuffleCards) {
    // Reset shuffle state and re-initialize order for next entry
    resetShuffleState()
    initializeShuffle()
    // Reset to first card and clear any per-card state
    currentIndex.value = 0
    resetAndRestoreCard()
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
  } else {
    // Reset modal store when completion modal is closed
    modalStore.setCompletionModal(false)
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

// Prevent body scroll when session detail modal is open
watch(showSessionDetail, (newValue) => {
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
  // Sync with modal store for dropdown auto-hide
  modalStore.setSettingsModal(newValue)
})

// Sync exit warning modal with modal store for dropdown auto-hide
watch(showExitWarning, (newValue) => {
  modalStore.setExitWarningModal(newValue)
})

// Sync history modal with modal store
watch(showHistory, (newValue) => {
  modalStore.setHistoryModal(newValue)
})

// Sync session detail modal with modal store
watch(showSessionDetail, (newValue) => {
  modalStore.setSessionDetailModal(newValue)
})

// Watch date filter state changes - handled by composable internally

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

// Event handlers for toggle options  
const onToggleBubbleShooterVietnameseMode = (enabled: boolean) => {
  bubbleShooterVietnameseMode.value = enabled
}

const handleFlipTileHintsToggle = (enabled: boolean) => {
  flashcardSettings.value.useFlipTileHints = enabled
}

// Initialize on mount
onMounted(() => {
  console.log('FlashcardView mounted - forcing fresh shuffle state')
  
  // Force complete shuffle state reset on every mount (navigation or refresh)
  resetShuffleState()
  
  // Initialize stats
  initializeStats(currentFlashcards.value.length)
  
  // Initialize quiz options if in quiz mode
  if (practiceMode.value === 'quiz') {
    generateQuizOptions()
  }
  
  // Initialize shuffle if enabled - use composable function for proper fresh shuffle
  initializeShuffle()
  
  // Setup navigation guard for exit warning
  initializeNavigation()
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.classList.remove('modal-open')
  cleanup()
  
  // Remove navigation guard and event listeners
  cleanupNavigation()
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
