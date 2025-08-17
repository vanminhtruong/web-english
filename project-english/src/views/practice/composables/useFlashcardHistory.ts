import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GameStats } from './useFlashcardStats'

export interface PracticeHistoryItem {
  id: string
  date: string
  mode: string
  totalCards: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  duration: number
  score: number
  categories?: string[]
  // Whether this session has detailed per-card logs stored
  hasDetails?: boolean
}

export function useFlashcardHistory() {
  const showHistory = ref(false)
  const practiceHistory = ref<PracticeHistoryItem[]>([])
  const { t, locale } = useI18n()

  // Load practice history from localStorage
  const loadPracticeHistory = () => {
    const saved = localStorage.getItem('flashcard-practice-history')
    if (saved) {
      const parsed: PracticeHistoryItem[] = JSON.parse(saved)
      // Backfill hasDetails for older sessions by checking stored details key
      practiceHistory.value = parsed.map((item) => {
        if (item.hasDetails === undefined) {
          const has = !!localStorage.getItem(`flashcard-session-details:${item.id}`)
          return { ...item, hasDetails: has }
        }
        return item
      })
      // Persist backfilled flags so future loads are consistent
      savePracticeHistory()
    }
  }

  // Save practice history to localStorage
  const savePracticeHistory = () => {
    localStorage.setItem('flashcard-practice-history', JSON.stringify(practiceHistory.value))
  }

  // Save current session to history and return the session id
  const saveSessionToHistory = (stats: GameStats, totalCards: number, sessionId?: string): string => {
    const duration = stats.endTime && stats.startTime 
      ? Math.round((stats.endTime.getTime() - stats.startTime.getTime()) / 1000)
      : 0
    
    const total = stats.correct + stats.incorrect
    const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0
    const score = Math.round(accuracy * (totalCards / 100))

    const id = sessionId || Date.now().toString()

    const historyItem: PracticeHistoryItem = {
      id,
      date: new Date().toISOString(),
      mode: stats.mode,
      totalCards,
      correctAnswers: stats.correct,
      incorrectAnswers: stats.incorrect,
      accuracy,
      duration,
      score,
      categories: stats.categories || [],
      hasDetails: true,
    }

    practiceHistory.value.unshift(historyItem)
    
    // Keep only last 50 sessions
    if (practiceHistory.value.length > 50) {
      practiceHistory.value = practiceHistory.value.slice(0, 50)
    }
    
    savePracticeHistory()
    return id
  }

  // Helper functions for history display
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'flashcard':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'quiz':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'typing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'listening':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'image':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'pictionary':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'pronunciation':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'bubble-shooter':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
      case 'snake-game':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        // Avoid gray in dark mode per UI rules
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    }
  }

  const getModeText = (mode: string) => {
    switch (mode) {
      case 'flashcard':
        return t('flashcard.modes.flashcard', 'Flashcard')
      case 'quiz':
        return t('flashcard.modes.quiz', 'Quiz')
      case 'typing':
        return t('flashcard.modes.typing', 'Typing')
      case 'listening':
        return t('flashcard.modes.listening', 'Listening')
      case 'image':
        return t('flashcard.modes.image', 'Image')
      case 'pictionary':
        return t('flashcard.modes.pictionary', 'Pictionary')
      case 'pronunciation':
        return t('flashcard.modes.pronunciation', 'Pronunciation')
      case 'bubble-shooter':
        return t('flashcard.modes.bubbleShooter', 'Bubble Shooter')
      case 'snake-game':
        return t('flashcard.modes.snakeGame', 'Snake Hunt')
      default:
        return 'Unknown'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    // Use the browser's locale based on the current i18n locale
    const currentLocale = locale.value === 'en' ? 'en-US' : 'vi-VN'
    
    if (diffDays === 0) {
      return locale.value === 'en' ? 'Today' : 'Hôm nay'
    } else if (diffDays === 1) {
      return locale.value === 'en' ? 'Yesterday' : 'Hôm qua'
    } else if (diffDays < 7) {
      return locale.value === 'en' 
        ? `${diffDays} days ago` 
        : `${diffDays} ngày trước`
    } else {
      return date.toLocaleDateString(currentLocale)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Clear history
  const clearHistory = () => {
    practiceHistory.value = []
    savePracticeHistory()
    // Also clear session details from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('flashcard-session-details:')) {
        localStorage.removeItem(key)
      }
    })
  }

  // Delete a specific session
  const deleteSession = (sessionId: string) => {
    practiceHistory.value = practiceHistory.value.filter(item => item.id !== sessionId)
    savePracticeHistory()
    // Also remove session details from localStorage
    localStorage.removeItem(`flashcard-session-details:${sessionId}`)
  }

  // Get statistics from history
  const getHistoryStats = () => {
    if (practiceHistory.value.length === 0) {
      return {
        totalSessions: 0,
        averageAccuracy: 0,
        totalCards: 0,
        totalTime: 0,
        bestScore: 0,
        favoriteMode: ''
      }
    }

    const totalSessions = practiceHistory.value.length
    const totalCards = practiceHistory.value.reduce((sum, item) => sum + item.totalCards, 0)
    const totalTime = practiceHistory.value.reduce((sum, item) => sum + item.duration, 0)
    const averageAccuracy = Math.round(
      practiceHistory.value.reduce((sum, item) => sum + item.accuracy, 0) / totalSessions
    )
    const bestScore = Math.max(...practiceHistory.value.map(item => item.score))
    
    // Find most used mode
    const modeCount = practiceHistory.value.reduce((acc, item) => {
      acc[item.mode] = (acc[item.mode] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const favoriteMode = Object.entries(modeCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || ''

    return {
      totalSessions,
      averageAccuracy,
      totalCards,
      totalTime,
      bestScore,
      favoriteMode
    }
  }

  onMounted(() => {
    loadPracticeHistory()
  })

  return {
    showHistory,
    practiceHistory,
    saveSessionToHistory,
    getModeColor,
    getModeText,
    formatDate,
    formatDuration,
    clearHistory,
    deleteSession,
    getHistoryStats
  }
}
