import { ref, type Ref } from 'vue'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

// Card state storage interface for preserving answers when navigating back/forward
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

export function useFlashcardCardState(
  currentShuffledCard: Ref<Vocabulary | null>,
  modeStates: {
    // Quiz mode states
    selectedAnswer: Ref<string>
    quizAnswered: Ref<boolean>
    quizOptions: Ref<string[]>
    
    // Typing mode states
    typingAnswer: Ref<string>
    typingAnswered: Ref<boolean>
    typingCorrect: Ref<boolean>
    typingQuizOptions: Ref<string[]>
    typingQuizSelected: Ref<string>
    typingQuizAnswered: Ref<boolean>
    
    // Listening mode states
    listeningAnswer: Ref<string>
    listeningAnswered: Ref<boolean>
    listeningCorrect: Ref<boolean>
    listeningQuizOptions: Ref<string[]>
    listeningQuizSelected: Ref<string>
    listeningQuizAnswered: Ref<boolean>
    
    // Image mode states
    imageAnswer: Ref<string>
    imageAnswered: Ref<boolean>
    imageCorrect: Ref<boolean>
    imageQuizOptions: Ref<string[]>
    imageQuizSelected: Ref<string>
    imageQuizAnswered: Ref<boolean>
    
    // Pronunciation mode states
    pronunciationResult: Ref<string>
    pronunciationAnswered: Ref<boolean>
    pronunciationCorrect: Ref<boolean>

    // Pictionary mode states
    pictionaryAnswer: Ref<string>
    pictionaryAnswered: Ref<boolean>
    pictionaryCorrect: Ref<boolean>
    
    // Flip tile mode states
    flipTileAnswer: Ref<string>
    flipTileAnswered: Ref<boolean>
    flipTileCorrect: Ref<boolean>
  }
) {
  const cardStateStorage = ref<Record<number, CardState>>({})

  // Save current card state before navigation
  const saveCurrentCardState = () => {
    if (!currentShuffledCard.value) return
    
    const cardId = currentShuffledCard.value.id
    cardStateStorage.value[cardId] = {
      // Quiz mode
      quizAnswer: modeStates.selectedAnswer.value,
      quizAnswered: modeStates.quizAnswered.value,
      quizOptions: modeStates.quizOptions.value,
      
      // Typing mode
      typingAnswer: modeStates.typingAnswer.value || undefined,
      typingAnswered: modeStates.typingAnswered.value || undefined,
      typingCorrect: modeStates.typingCorrect.value || undefined,
      // Typing-quiz
      typingQuizOptions: modeStates.typingQuizOptions.value || undefined,
      typingQuizSelected: modeStates.typingQuizSelected.value || undefined,
      typingQuizAnswered: modeStates.typingQuizAnswered.value || undefined,
      
      // Listening mode
      listeningAnswer: modeStates.listeningAnswer.value || undefined,
      listeningAnswered: modeStates.listeningAnswered.value || undefined,
      listeningCorrect: modeStates.listeningCorrect.value || undefined,
      // Listening-quiz
      listeningQuizOptions: modeStates.listeningQuizOptions.value || undefined,
      listeningQuizSelected: modeStates.listeningQuizSelected.value || undefined,
      listeningQuizAnswered: modeStates.listeningQuizAnswered.value || undefined,
      
      // Image mode
      imageAnswer: modeStates.imageAnswer.value || undefined,
      imageAnswered: modeStates.imageAnswered.value || undefined,
      imageCorrect: modeStates.imageCorrect.value || undefined,
      imageQuizOptions: modeStates.imageQuizOptions.value && modeStates.imageQuizOptions.value.length ? modeStates.imageQuizOptions.value : undefined,
      imageQuizSelected: modeStates.imageQuizSelected.value || undefined,
      imageQuizAnswered: modeStates.imageQuizAnswered.value || undefined,
      
      // Pronunciation mode
      pronunciationResult: modeStates.pronunciationResult.value || undefined,
      pronunciationAnswered: modeStates.pronunciationAnswered.value || undefined,
      pronunciationCorrect: modeStates.pronunciationCorrect.value || undefined,

      // Pictionary mode
      pictionaryAnswer: modeStates.pictionaryAnswer.value || undefined,
      pictionaryAnswered: modeStates.pictionaryAnswered.value || undefined,
      pictionaryCorrect: modeStates.pictionaryCorrect.value || undefined,
      
      // Flip tile mode
      flipTileAnswer: modeStates.flipTileAnswer.value || undefined,
      flipTileAnswered: modeStates.flipTileAnswered.value || undefined,
      flipTileCorrect: modeStates.flipTileCorrect.value || undefined,
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
        modeStates.quizOptions.value = savedState.quizOptions;
      }
      if (savedState.quizAnswer !== undefined) {
        modeStates.selectedAnswer.value = savedState.quizAnswer;
      }
      if (savedState.quizAnswered !== undefined) {
        modeStates.quizAnswered.value = savedState.quizAnswered;
      }
      
      // Restore typing mode
      if (savedState.typingAnswer !== undefined) {
        modeStates.typingAnswer.value = savedState.typingAnswer
      }
      if (savedState.typingAnswered !== undefined) {
        modeStates.typingAnswered.value = savedState.typingAnswered
      }
      if (savedState.typingCorrect !== undefined) {
        modeStates.typingCorrect.value = savedState.typingCorrect
      }
      // Restore typing-quiz
      if (savedState.typingQuizOptions !== undefined) {
        modeStates.typingQuizOptions.value = savedState.typingQuizOptions
      }
      if (savedState.typingQuizSelected !== undefined) {
        modeStates.typingQuizSelected.value = savedState.typingQuizSelected
      }
      if (savedState.typingQuizAnswered !== undefined) {
        modeStates.typingQuizAnswered.value = savedState.typingQuizAnswered
      }
      
      // Restore listening mode
      if (savedState.listeningAnswer !== undefined) {
        modeStates.listeningAnswer.value = savedState.listeningAnswer
      }
      if (savedState.listeningAnswered !== undefined) {
        modeStates.listeningAnswered.value = savedState.listeningAnswered
      }
      if (savedState.listeningCorrect !== undefined) {
        modeStates.listeningCorrect.value = savedState.listeningCorrect
      }
      // Restore listening-quiz
      if (savedState.listeningQuizOptions !== undefined) {
        modeStates.listeningQuizOptions.value = savedState.listeningQuizOptions
      }
      if (savedState.listeningQuizSelected !== undefined) {
        modeStates.listeningQuizSelected.value = savedState.listeningQuizSelected
      }
      if (savedState.listeningQuizAnswered !== undefined) {
        modeStates.listeningQuizAnswered.value = savedState.listeningQuizAnswered
      }
      
      // Restore image mode
      if (savedState.imageAnswer !== undefined) {
        modeStates.imageAnswer.value = savedState.imageAnswer
      }
      if (savedState.imageAnswered !== undefined) {
        modeStates.imageAnswered.value = savedState.imageAnswered
      }
      if (savedState.imageCorrect !== undefined) {
        modeStates.imageCorrect.value = savedState.imageCorrect
      }
      if (savedState.imageQuizOptions !== undefined) {
        modeStates.imageQuizOptions.value = savedState.imageQuizOptions
      }
      if (savedState.imageQuizSelected !== undefined) {
        modeStates.imageQuizSelected.value = savedState.imageQuizSelected
      }
      if (savedState.imageQuizAnswered !== undefined) {
        modeStates.imageQuizAnswered.value = savedState.imageQuizAnswered
      }
      
      // Restore pronunciation mode
      if (savedState.pronunciationResult !== undefined) {
        modeStates.pronunciationResult.value = savedState.pronunciationResult
      }
      if (savedState.pronunciationAnswered !== undefined) {
        modeStates.pronunciationAnswered.value = savedState.pronunciationAnswered
      }
      if (savedState.pronunciationCorrect !== undefined) {
        modeStates.pronunciationCorrect.value = savedState.pronunciationCorrect
      }

      // Restore pictionary mode
      if (savedState.pictionaryAnswer !== undefined) {
        modeStates.pictionaryAnswer.value = savedState.pictionaryAnswer
      }
      if (savedState.pictionaryAnswered !== undefined) {
        modeStates.pictionaryAnswered.value = savedState.pictionaryAnswered
      }
      if (savedState.pictionaryCorrect !== undefined) {
        modeStates.pictionaryCorrect.value = savedState.pictionaryCorrect
      }
      
      // Restore flip tile mode
      if (savedState.flipTileAnswer !== undefined) {
        modeStates.flipTileAnswer.value = savedState.flipTileAnswer
      }
      if (savedState.flipTileAnswered !== undefined) {
        modeStates.flipTileAnswered.value = savedState.flipTileAnswered
      }
      if (savedState.flipTileCorrect !== undefined) {
        modeStates.flipTileCorrect.value = savedState.flipTileCorrect
      }
    }
  }

  // Clear all card state storage
  const clearCardStateStorage = () => {
    cardStateStorage.value = {}
  }

  // Get saved state for a specific card
  const getCardState = (cardId: number): CardState | undefined => {
    return cardStateStorage.value[cardId]
  }

  // Check if card has saved state
  const hasCardState = (cardId: number): boolean => {
    return cardId in cardStateStorage.value
  }

  return {
    cardStateStorage,
    saveCurrentCardState,
    restoreCardState,
    clearCardStateStorage,
    getCardState,
    hasCardState
  }
}
