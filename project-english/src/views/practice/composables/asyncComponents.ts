import { defineAsyncComponent } from 'vue'

// Shared components (from src/components)
export const LazyLoadComponent = defineAsyncComponent(() => import('../../../components/LazyLoadComponent.vue'))
export const VoiceSelector = defineAsyncComponent(() => import('../../../components/VoiceSelector.vue'))

// Practice components (from ../components)
export const FlashcardHeader = defineAsyncComponent(() => import('../components/FlashcardHeader.vue'))
export const FlashcardProgress = defineAsyncComponent(() => import('../components/FlashcardProgress.vue'))
export const FlashcardDateFilter = defineAsyncComponent(() => import('../components/FlashcardDateFilter.vue'))
export const FlashcardCard = defineAsyncComponent(() => import('../components/FlashcardCard.vue'))
export const FlashcardQuiz = defineAsyncComponent(() => import('../components/FlashcardQuiz.vue'))
export const FlashcardTyping = defineAsyncComponent(() => import('../components/FlashcardTyping.vue'))
export const FlashcardImage = defineAsyncComponent(() => import('../components/FlashcardImage.vue'))
export const FlashcardControls = defineAsyncComponent(() => import('../components/FlashcardControls.vue'))
export const PracticeTimer = defineAsyncComponent(() => import('../components/PracticeTimer.vue'))

// Modals and additional features
export const ExitWarningModal = defineAsyncComponent(() => import('../components/ExitWarningModal.vue'))
export const CompletionModal = defineAsyncComponent(() => import('../components/CompletionModal.vue'))
export const HistoryModal = defineAsyncComponent(() => import('../components/HistoryModal.vue'))
export const SessionDetailModal = defineAsyncComponent(() => import('../components/SessionDetailModal.vue'))
export const SettingsModal = defineAsyncComponent(() => import('../components/SettingsModal.vue'))
export const PronunciationMode = defineAsyncComponent(() => import('../components/PronunciationMode.vue'))
export const ListeningMode = defineAsyncComponent(() => import('../components/ListeningMode.vue'))
export const PracticeStats = defineAsyncComponent(() => import('../components/PracticeStats.vue'))
export const FlashcardEmptyState = defineAsyncComponent(() => import('../components/FlashcardEmptyState.vue'))
export const PictionaryMode = defineAsyncComponent(() => import('../components/PictionaryMode.vue'))
export const BubbleShooterMode = defineAsyncComponent(() => import('../components/BubbleShooterMode.vue'))
export const SnakeGameMode = defineAsyncComponent(() => import('../components/SnakeGameMode.vue'))

// Default aggregate export for one-line import convenience
export default {
  LazyLoadComponent,
  VoiceSelector,
  FlashcardHeader,
  FlashcardProgress,
  FlashcardDateFilter,
  FlashcardCard,
  FlashcardQuiz,
  FlashcardTyping,
  FlashcardImage,
  FlashcardControls,
  PracticeTimer,
  ExitWarningModal,
  CompletionModal,
  HistoryModal,
  SessionDetailModal,
  SettingsModal,
  PronunciationMode,
  ListeningMode,
  PracticeStats,
  FlashcardEmptyState,
  PictionaryMode,
  BubbleShooterMode,
  SnakeGameMode,
}
