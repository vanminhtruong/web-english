import { ref, computed, watch } from 'vue'
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

export function useFlashcardModes(
  currentCard: Ref<VocabularyItem | null>, 
  flashcards: Ref<VocabularyItem[]>, 
  allVocabularies: Ref<VocabularyItem[]>,
  onCorrectAnswer?: () => void,
  onIncorrectAnswer?: () => void
) {
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
  // Typing-Quiz (multiple choice within Typing mode)
  const typingQuizEnabled = ref(false)
  const typingQuizOptions = ref<string[]>([])
  const typingQuizSelected = ref('')
  const typingQuizAnswered = ref(false)

  // Listening mode states
  const listeningAnswer = ref('')
  const listeningAnswered = ref(false)
  const listeningCorrect = ref(false)
  // Listening-Quiz (multiple choice within Listening mode)
  const listeningQuizEnabled = ref(false)
  const listeningQuizOptions = ref<string[]>([])
  const listeningQuizSelected = ref('')
  const listeningQuizAnswered = ref(false)

  // Image mode states
  const imageAnswer = ref('')
  const imageAnswered = ref(false)
  const imageCorrect = ref(false)

  // Image-Quiz (multiple choice within Image mode)
  const imageQuizEnabled = ref(false)
  const imageQuizOptions = ref<string[]>([])
  const imageQuizSelected = ref('')
  const imageQuizAnswered = ref(false)

  // Pictionary mode states
  const pictionaryAnswer = ref('')
  const pictionaryAnswered = ref(false)
  const pictionaryCorrect = ref(false)

  // Persist toggle states in localStorage
  const STORAGE_KEYS = {
    image: 'pe_imageQuizEnabled',
    listening: 'pe_listeningQuizEnabled',
    typing: 'pe_typingQuizEnabled',
    imagePos: 'pe_imageQuiz_correct_pos',
    listeningPos: 'pe_listeningQuiz_correct_pos',
    typingPos: 'pe_typingQuiz_correct_pos',
  } as const

  const readBool = (key: string, def = false) => {
    try {
      const v = localStorage.getItem(key)
      return v === null ? def : v === 'true'
    } catch {
      return def
    }
  }

  // Initialize from localStorage
  imageQuizEnabled.value = readBool(STORAGE_KEYS.image, false)
  listeningQuizEnabled.value = readBool(STORAGE_KEYS.listening, false)
  typingQuizEnabled.value = readBool(STORAGE_KEYS.typing, false)

  const writeBool = (key: string, val: boolean) => {
    try {
      localStorage.setItem(key, String(val))
    } catch {}
  }

  const readNumber = (key: string, def = 0) => {
    try {
      const v = localStorage.getItem(key)
      const n = v === null ? def : Number(v)
      return Number.isFinite(n) && n >= 0 ? n : def
    } catch {
      return def
    }
  }

  const writeNumber = (key: string, val: number) => {
    try {
      localStorage.setItem(key, String(val))
    } catch {}
  }

  watch(imageQuizEnabled, (v) => writeBool(STORAGE_KEYS.image, v))
  watch(listeningQuizEnabled, (v) => writeBool(STORAGE_KEYS.listening, v))
  watch(typingQuizEnabled, (v) => writeBool(STORAGE_KEYS.typing, v))

  // Rotating indices for correct-answer position (A,B,C,D => 0..3)
  const imageCorrectPos = ref(readNumber(STORAGE_KEYS.imagePos, Math.floor(Math.random() * 4)))
  const listeningCorrectPos = ref(readNumber(STORAGE_KEYS.listeningPos, Math.floor(Math.random() * 4)))
  const typingCorrectPos = ref(readNumber(STORAGE_KEYS.typingPos, Math.floor(Math.random() * 4)))

  watch(imageCorrectPos, (n) => writeNumber(STORAGE_KEYS.imagePos, n))
  watch(listeningCorrectPos, (n) => writeNumber(STORAGE_KEYS.listeningPos, n))
  watch(typingCorrectPos, (n) => writeNumber(STORAGE_KEYS.typingPos, n))

  const placeWithRotation = (correct: string, wrongs: string[], posRef: { value: number }) => {
    const options = new Array<string>(4)
    const idx = posRef.value % 4
    options[idx] = correct
    // Fill remaining slots with shuffled wrongs
    const shuffledWrongs = [...wrongs].sort(() => Math.random() - 0.5)
    let wi = 0
    for (let i = 0; i < 4; i++) {
      if (i === idx) continue
      options[i] = shuffledWrongs[wi++] ?? ''
    }
    // Advance rotation for next time
    posRef.value = (posRef.value + 1) % 4
    return options
  }

  // Pronunciation mode states
  const isRecording = ref(false)
  const pronunciationResult = ref('')
  const pronunciationAnswered = ref(false)
  const pronunciationCorrect = ref(false)
  let recognition: any = null

  const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
  const isSpeechRecognitionSupported = !!SpeechRecognition

  if (isSpeechRecognitionSupported) {
    recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      pronunciationResult.value = transcript
      checkPronunciationAnswer(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      isRecording.value = false
    }

    recognition.onend = () => {
      isRecording.value = false
    }
  }

  const startRecording = () => {
    if (isRecording.value || !isSpeechRecognitionSupported) return
    pronunciationResult.value = ''
    pronunciationAnswered.value = false
    pronunciationCorrect.value = false
    isRecording.value = true
    recognition.start()
  }

  const checkPronunciationAnswer = (transcript: string) => {
    if (!currentCard.value) return false
    pronunciationAnswered.value = true
    const userAnswer = transcript.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    const correctAnswer = currentCard.value.word.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    pronunciationCorrect.value = userAnswer === correctAnswer
    
    // Trigger effects
    if (pronunciationCorrect.value) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    
    return pronunciationCorrect.value
  }

  // Quiz mode methods
  const generateQuizOptions = () => {
    if (!currentCard.value) return
    
    const correctAnswer = getShortMeaning(currentCard.value.meaning)
    // Use allVocabularies instead of flashcards to get options from all vocabulary words
    const allOptions = allVocabularies.value
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
    const isCorrect = answer === correctAnswer
    
    // Trigger effects
    if (isCorrect) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    
    return isCorrect
  }

  // Image-Quiz methods (multiple choice answers are the WORDs)
  const generateImageQuizOptions = () => {
    if (!currentCard.value) return

    const correctWord = currentCard.value.word.trim()
    const allWrong = allVocabularies.value
      .filter(card => card.id !== currentCard.value?.id)
      .map(card => card.word.trim())
      .filter(word => word.toLowerCase() !== correctWord.toLowerCase())
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong
    // Place correct answer using rotating position to avoid repetition in the same slot
    const paddedWrongs = [...new Set(wrongOptions)]
    while (paddedWrongs.length < 3) paddedWrongs.push('')
    imageQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, imageCorrectPos)
  }

  const selectImageQuizAnswer = (answer: string) => {
    if (imageQuizAnswered.value) return

    imageQuizSelected.value = answer
    imageQuizAnswered.value = true

    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : ''
    const isCorrect = answer.trim().toLowerCase() === correctWord

    // Reflect into base Image mode state so existing flow/stats work
    imageAnswered.value = true
    imageCorrect.value = isCorrect

    if (isCorrect) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }

    return isCorrect
  }

  // Typing mode methods
  const checkTypingAnswer = () => {
    if (!currentCard.value || typingAnswered.value) return
    
    typingAnswered.value = true
    const userAnswer = typingAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    typingCorrect.value = userAnswer === correctAnswer
    
    // Trigger effects
    if (typingCorrect.value) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    
    return typingCorrect.value
  }

  // Typing-Quiz methods (multiple choice answers are the WORDs)
  const generateTypingQuizOptions = () => {
    if (!currentCard.value) return

    const correctWord = currentCard.value.word.trim()
    const allWrong = allVocabularies.value
      .filter(card => card.id !== currentCard.value?.id)
      .map(card => card.word.trim())
      .filter(word => word.toLowerCase() !== correctWord.toLowerCase())
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong
    const paddedWrongs = [...new Set(wrongOptions)]
    while (paddedWrongs.length < 3) paddedWrongs.push('')
    typingQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, typingCorrectPos)
  }

  const selectTypingQuizAnswer = (answer: string) => {
    if (typingQuizAnswered.value) return

    typingQuizSelected.value = answer
    typingQuizAnswered.value = true

    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : ''
    const isCorrect = answer.trim().toLowerCase() === correctWord

    // Reflect into base Typing mode state so existing flow/stats work
    typingAnswered.value = true
    typingCorrect.value = isCorrect

    if (isCorrect) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }

    return isCorrect
  }

  // Listening mode methods
  const checkListeningAnswer = () => {
    if (!currentCard.value || listeningAnswered.value) return
    
    listeningAnswered.value = true
    const userAnswer = listeningAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    listeningCorrect.value = userAnswer === correctAnswer
    
    // Trigger effects
    if (listeningCorrect.value) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    
    return listeningCorrect.value
  }

  // Listening-Quiz methods (multiple choice answers are the WORDs)
  const generateListeningQuizOptions = () => {
    if (!currentCard.value) return

    const correctWord = currentCard.value.word.trim()
    const allWrong = allVocabularies.value
      .filter(card => card.id !== currentCard.value?.id)
      .map(card => card.word.trim())
      .filter(word => word.toLowerCase() !== correctWord.toLowerCase())
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong
    const paddedWrongs = [...new Set(wrongOptions)]
    while (paddedWrongs.length < 3) paddedWrongs.push('')
    listeningQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, listeningCorrectPos)
  }

  const selectListeningQuizAnswer = (answer: string) => {
    if (listeningQuizAnswered.value) return

    listeningQuizSelected.value = answer
    listeningQuizAnswered.value = true

    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : ''
    const isCorrect = answer.trim().toLowerCase() === correctWord

    // Reflect into base Listening mode state so existing flow/stats work
    listeningAnswered.value = true
    listeningCorrect.value = isCorrect

    if (isCorrect) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }

    return isCorrect
  }

  // Image mode methods
  const checkImageAnswer = () => {
    if (!currentCard.value || imageAnswered.value) return
    
    imageAnswered.value = true
    const userAnswer = imageAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    
    imageCorrect.value = userAnswer === correctAnswer
    
    // Trigger effects
    if (imageCorrect.value) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    
    return imageCorrect.value
  }

  // Pictionary mode methods (answer by typing based on image hint)
  const checkPictionaryAnswer = () => {
    if (!currentCard.value || pictionaryAnswered.value) return
    pictionaryAnswered.value = true
    const userAnswer = pictionaryAnswer.value.toLowerCase().trim()
    const correctAnswer = currentCard.value.word.toLowerCase().trim()
    pictionaryCorrect.value = userAnswer === correctAnswer
    if (pictionaryCorrect.value) {
      onCorrectAnswer?.()
    } else {
      onIncorrectAnswer?.()
    }
    return pictionaryCorrect.value
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
    // Reset Typing-Quiz state but keep toggle as-is
    typingQuizOptions.value = []
    typingQuizSelected.value = ''
    typingQuizAnswered.value = false
  }

  const resetListeningMode = () => {
    listeningAnswer.value = ''
    listeningAnswered.value = false
    listeningCorrect.value = false
    // Reset Listening-Quiz state but keep toggle as-is; caller decides
    listeningQuizOptions.value = []
    listeningQuizSelected.value = ''
    listeningQuizAnswered.value = false
  }

  const resetImageMode = () => {
    imageAnswer.value = ''
    imageAnswered.value = false
    imageCorrect.value = false
    // Reset Image-Quiz, but keep the toggle value as-is; caller can decide
    imageQuizOptions.value = []
    imageQuizSelected.value = ''
    imageQuizAnswered.value = false
  }

  const resetPictionaryMode = () => {
    pictionaryAnswer.value = ''
    pictionaryAnswered.value = false
    pictionaryCorrect.value = false
  }

  const resetPronunciationMode = () => {
    if (recognition && isRecording.value) {
      recognition.stop()
    }
    isRecording.value = false
    pronunciationResult.value = ''
    pronunciationAnswered.value = false
    pronunciationCorrect.value = false
  }

  const resetAllModes = () => {
    resetQuizMode()
    resetTypingMode()
    resetListeningMode()
    resetImageMode()
    resetPronunciationMode()
    resetPictionaryMode()
  }

  // Helper to check if can proceed to next card
  const getCanProceed = () => {
    return {
      flashcard: true,
      quiz: quizAnswered.value,
      typing: typingAnswered.value,
      listening: listeningAnswered.value,
      image: imageAnswered.value,
      pronunciation: pronunciationAnswered.value,
      pictionary: pictionaryAnswered.value,
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
    // Typing-Quiz (within Typing mode)
    typingQuizEnabled,
    typingQuizOptions,
    typingQuizSelected,
    typingQuizAnswered,
    generateTypingQuizOptions,
    selectTypingQuizAnswer,
    
    // Listening mode
    listeningAnswer,
    listeningAnswered,
    listeningCorrect,
    checkListeningAnswer,
    playAudio,
    resetListeningMode,
    // Listening-Quiz (within Listening mode)
    listeningQuizEnabled,
    listeningQuizOptions,
    listeningQuizSelected,
    listeningQuizAnswered,
    generateListeningQuizOptions,
    selectListeningQuizAnswer,
    
    // Image mode
    imageAnswer,
    imageAnswered,
    imageCorrect,
    checkImageAnswer,
    resetImageMode,

    // Image-Quiz (within Image mode)
    imageQuizEnabled,
    imageQuizOptions,
    imageQuizSelected,
    imageQuizAnswered,
    generateImageQuizOptions,
    selectImageQuizAnswer,

    // Pictionary mode
    pictionaryAnswer,
    pictionaryAnswered,
    pictionaryCorrect,
    checkPictionaryAnswer,
    resetPictionaryMode,

    // Pronunciation mode
    isRecording,
    pronunciationResult,
    pronunciationAnswered,
    pronunciationCorrect,
    isSpeechRecognitionSupported,
    startRecording,
    resetPronunciationMode,
    
    // General
    resetAllModes,
    getCanProceed,
    getShortMeaning
  }
}
