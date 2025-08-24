import { ref } from 'vue'

export interface SessionDetailEntry {
  cardId: number
  word: string
  meaningShort: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  mode: string
  timestamp: string
  notes?: string
  // Optional extra data for mode-specific details (backward-compatible)
  extra?: SessionDetailEntryExtra
}

export interface SessionDetails {
  sessionId: string
  mode: string
  total: number
  correct: number
  incorrect: number
  entries: SessionDetailEntry[]
}

// Mode-specific extra payloads stored alongside entries
export interface SessionDetailEntryExtra {
  pictionary?: {
    image?: string
    slots: { char: string; fixed: boolean; separator?: boolean }[]
  }
  flipTile?: {
    image?: string
    useHints: boolean
    tiles: { char: string; flipped: boolean; separator?: boolean }[]
    maxFlips: number
    flippedCount: number
    finalUserAnswer: string
    targetWord: string
    meaning?: string
    category?: string
  }
  quiz?: {
    question: string
    pronunciation?: string
    options: string[]
    selectedAnswer: string
    correctAnswer: string
    category?: string
  }
  typing?: {
    question: string
    isQuizMode: boolean
    userAnswer: string
    correctAnswer: string
    options?: string[]
    selectedOption?: string
    category?: string
  }
  listening?: {
    isQuizMode: boolean
    userAnswer: string
    correctAnswer: string
    options?: string[]
    selectedOption?: string
    category?: string
  }
  image?: {
    image?: string
    isQuizMode: boolean
    userAnswer: string
    correctAnswer: string
    options?: string[]
    selectedOption?: string
    category?: string
  }
  pronunciation?: {
    targetWord: string
    pronunciation?: string
    userPronunciation: string
    isCorrect: boolean
    category?: string
    meaning?: string
    isWordscrushMode?: boolean
  }
  snakeGame?: {
    position: { x: number; y: number }
    wasCorrect: boolean
    foodType: 'primary' | 'secondary'
    snakeLength: number
    gameScore: number
    wordsCompleted: number
    wrongEatenCount: number
    snakeBody: { x: number; y: number }[]
    direction: { x: number; y: number }
    // Optional timeline frames for accurate replay (when recording is enabled)
    timelineFrames?: Array<{
      body: { x: number; y: number }[]
      direction: { x: number; y: number }
    }>
  }
  flashcard?: {
    word: string
    meaning: string
    pronunciation?: string
    category?: string
    partOfSpeech?: string
    example?: string
    markedAs: 'easy' | 'difficult'
    isFlipped?: boolean
  }
  scrambleWords?: {
    targetWord: string
    scrambledLetters: string[]
    assembledWord: string[]
    userAnswer: string
    isCorrect: boolean
    category?: string
    meaning?: string
    pronunciation?: string
    partOfSpeech?: string
    example?: string
  }
}

const makeKey = (sessionId: string) => `flashcard-session-details:${sessionId}`

export function usePracticeSessionDetails() {
  const currentSessionId = ref<string | null>(null)
  const currentMode = ref<string>('')

  const startSessionDetails = (sessionId: string, mode: string) => {
    currentSessionId.value = sessionId
    currentMode.value = mode
    const initial: SessionDetails = {
      sessionId,
      mode,
      total: 0,
      correct: 0,
      incorrect: 0,
      entries: [],
    }
    try {
      localStorage.setItem(makeKey(sessionId), JSON.stringify(initial))
    } catch {}
  }

  const appendAnswer = (payload: Omit<SessionDetailEntry, 'timestamp'> & { timestamp?: string }) => {
    if (!currentSessionId.value) return
    const key = makeKey(currentSessionId.value)
    let data: SessionDetails | null = null
    try {
      const raw = localStorage.getItem(key)
      data = raw ? (JSON.parse(raw) as SessionDetails) : null
    } catch {}
    if (!data) {
      data = {
        sessionId: currentSessionId.value,
        mode: currentMode.value,
        total: 0,
        correct: 0,
        incorrect: 0,
        entries: [],
      }
    }
    const entry: SessionDetailEntry = {
      ...payload,
      timestamp: payload.timestamp || new Date().toISOString(),
    }
    data.entries.push(entry)
    data.total += 1
    if (entry.isCorrect) data.correct += 1
    else data.incorrect += 1

    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {}
  }

  const loadDetails = (sessionId: string): SessionDetails | null => {
    try {
      const raw = localStorage.getItem(makeKey(sessionId))
      return raw ? (JSON.parse(raw) as SessionDetails) : null
    } catch {
      return null
    }
  }

  const clearDetails = (sessionId: string) => {
    try {
      localStorage.removeItem(makeKey(sessionId))
    } catch {}
  }

  return {
    currentSessionId,
    currentMode,
    startSessionDetails,
    appendAnswer,
    loadDetails,
    clearDetails,
  }
}
