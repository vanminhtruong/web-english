import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useVoiceStore } from '../../../stores/voiceStore'

export interface VocabularyItem {
  id: number
  word: string
  meaning: string
  pronunciation?: string
  example?: string
  category: string
  level: string
  partOfSpeech?: string
  synonyms?: string[]
  antonyms?: string[]
  notes?: string
  favorite?: boolean
  createdAt?: string
  updatedAt?: string
}

export function useFlashcardModes(currentCard: Ref<VocabularyItem | null>, flashcards: Ref<VocabularyItem[]>) {
  // Voice settings
  const { playAudio: playVoiceAudio } = useVoiceStore()
  
  // Quiz mode states
  const quizOptions = ref<string[]>([])
  const selectedAnswer = ref('')
  const quizAnswered = ref(false)

  // Typing mode states
  const typingAnswer = ref('')
  const typingAnswered = ref(false)
  const typingCorrect = ref(false)

  // Listening mode states
  const listeningAnswer = ref('')
  const listeningAnswered = ref(false)
  const listeningCorrect = ref(false)

  // Image mode states
  const imageAnswer = ref('')
  const imageAnswered = ref(false)
  const imageCorrect = ref(false)

  // Quiz mode methods
  const generateQuizOptions = () => {
    if (!currentCard.value) return
    
    const correctAnswer = getShortMeaning(currentCard.value.meaning)
    const allOptions = flashcards.value
      .filter(card => card.id !== currentCard.value?.id)
      .map(card => getShortMeaning(card.meaning))
      .filter(meaning => meaning !== correctAnswer) // Remove duplicates
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    // If not enough unique options, use the available ones
    const wrongOptions = allOptions.length >= 3 ? allOptions.slice(0, 3) : allOptions
    
    quizOptions.value = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5)
  }

  const selectQuizAnswer = (answer: string) => {
    if (quizAnswered.value) return
    
    selectedAnswer.value = answer
    quizAnswered.value = true
    
    // So sánh với short meaning thay vì full meaning
    const correctAnswer = currentCard.value ? getShortMeaning(currentCard.value.meaning) : ''
    if (answer === correctAnswer) {
      // Correct answer logic will be handled by parent
      return true
    } else {
      // Wrong answer logic will be handled by parent
      return false
    }
  }

  // Typing mode methods
  const checkTypingAnswer = () => {
    if (!currentCard.value || typingAnswered.value) return
    
    typingAnswered.value = true
    const userAnswer = typingAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    typingCorrect.value = userAnswer === correctAnswer
    
    return typingCorrect.value
  }

  // Listening mode methods
  const checkListeningAnswer = () => {
    if (!currentCard.value || listeningAnswered.value) return
    
    listeningAnswered.value = true
    const userAnswer = listeningAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    listeningCorrect.value = userAnswer === correctAnswer
    
    return listeningCorrect.value
  }

  // Image mode methods
  const checkImageAnswer = () => {
    if (!currentCard.value || imageAnswered.value) return
    
    imageAnswered.value = true
    const userAnswer = imageAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    imageCorrect.value = userAnswer === correctAnswer
    
    return imageCorrect.value
  }

  const playAudio = async () => {
    if (!currentCard.value) return
    
    try {
      // Use playVoiceAudio directly for immediate reactivity
      await playVoiceAudio(currentCard.value.word)
    } catch (error) {
      console.error('Error playing audio:', error)
      // Fallback to basic speech synthesis
      const utterance = new SpeechSynthesisUtterance(currentCard.value.word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  // Reset methods for each mode
  const resetQuizMode = () => {
    quizOptions.value = []
    selectedAnswer.value = ''
    quizAnswered.value = false
    // Don't generate options here, let the parent handle it
  }

  const resetTypingMode = () => {
    typingAnswer.value = ''
    typingAnswered.value = false
    typingCorrect.value = false
  }

  const resetListeningMode = () => {
    listeningAnswer.value = ''
    listeningAnswered.value = false
    listeningCorrect.value = false
  }

  const resetImageMode = () => {
    imageAnswer.value = ''
    imageAnswered.value = false
    imageCorrect.value = false
  }

  const resetAllModes = () => {
    resetQuizMode()
    resetTypingMode()
    resetListeningMode()
    resetImageMode()
  }

  // Helper to check if can proceed to next card
  const getCanProceed = () => {
    return {
      flashcard: true,
      quiz: quizAnswered.value,
      typing: typingAnswered.value,
      listening: listeningAnswered.value,
      image: imageAnswered.value
    }
  }

  // Helper to get short meaning
  const getShortMeaning = (meaning: string) => {
    return meaning.split(' - ')[0].trim()
  }

  return {
    // Quiz mode
    quizOptions,
    selectedAnswer,
    quizAnswered,
    generateQuizOptions,
    selectQuizAnswer,
    resetQuizMode,
    
    // Typing mode
    typingAnswer,
    typingAnswered,
    typingCorrect,
    checkTypingAnswer,
    resetTypingMode,
    
    // Listening mode
    listeningAnswer,
    listeningAnswered,
    listeningCorrect,
    checkListeningAnswer,
    playAudio,
    resetListeningMode,
    
    // Image mode
    imageAnswer,
    imageAnswered,
    imageCorrect,
    checkImageAnswer,
    resetImageMode,
    
    // General
    resetAllModes,
    getCanProceed,
    getShortMeaning
  }
}
