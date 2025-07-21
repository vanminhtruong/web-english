import { ref, computed, type Ref } from 'vue'
import type { GameStats } from './useFlashcardGame'

export interface SessionStats {
  totalCards: number
  currentCard: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  streak: number
  maxStreak: number
  timeSpent: number
  averageTimePerCard: number
  score: number
}

export function useFlashcardStats(stats: Ref<GameStats>) {
  const sessionStats = ref<SessionStats>({
    totalCards: 0,
    currentCard: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
    streak: 0,
    maxStreak: 0,
    timeSpent: 0,
    averageTimePerCard: 0,
    score: 0
  })

  const currentStreak = ref(0)
  const maxStreak = ref(0)
  const cardStartTime = ref<Date | null>(null)
  const cardTimes = ref<number[]>([])

  // Initialize session stats
  const initializeStats = (totalCards: number) => {
    sessionStats.value = {
      totalCards,
      currentCard: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
      streak: 0,
      maxStreak: 0,
      timeSpent: 0,
      averageTimePerCard: 0,
      score: 0
    }
    currentStreak.value = 0
    maxStreak.value = 0
    cardTimes.value = []
    cardStartTime.value = new Date()
  }

  // Record answer
  const recordAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      sessionStats.value.correctAnswers++
      stats.value.correct++
      currentStreak.value++
      if (currentStreak.value > maxStreak.value) {
        maxStreak.value = currentStreak.value
      }
    } else {
      sessionStats.value.incorrectAnswers++
      stats.value.incorrect++
      currentStreak.value = 0
    }

    // Update total
    stats.value.total++

    // Record time spent on this card
    if (cardStartTime.value) {
      const timeSpent = new Date().getTime() - cardStartTime.value.getTime()
      cardTimes.value.push(timeSpent)
      cardStartTime.value = new Date()
    }

    updateStats()
  }

  // Move to next card
  const nextCard = () => {
    sessionStats.value.currentCard++
    cardStartTime.value = new Date()
  }

  // Update computed stats
  const updateStats = () => {
    const total = sessionStats.value.correctAnswers + sessionStats.value.incorrectAnswers
    sessionStats.value.accuracy = total > 0 ? Math.round((sessionStats.value.correctAnswers / total) * 100) : 0
    sessionStats.value.streak = currentStreak.value
    sessionStats.value.maxStreak = maxStreak.value
    sessionStats.value.timeSpent = cardTimes.value.reduce((sum, time) => sum + time, 0)
    sessionStats.value.averageTimePerCard = cardTimes.value.length > 0 
      ? Math.round(sessionStats.value.timeSpent / cardTimes.value.length)
      : 0
    sessionStats.value.score = calculateScore()
  }

  // Calculate score based on accuracy, speed, and streak
  const calculateScore = () => {
    const { accuracy, averageTimePerCard, maxStreak } = sessionStats.value
    
    // Base score from accuracy (0-100)
    let score = accuracy
    
    // Speed bonus (faster = higher score)
    const speedBonus = averageTimePerCard > 0 ? Math.max(0, 50 - Math.floor(averageTimePerCard / 1000)) : 0
    
    // Streak bonus (longer streak = higher score)
    const streakBonus = Math.min(50, maxStreak * 5)
    
    return Math.round(score + speedBonus + streakBonus)
  }

  // Get performance level
  const getPerformanceLevel = computed(() => {
    const accuracy = sessionStats.value.accuracy
    if (accuracy >= 90) return { level: 'Xuất sắc', color: 'text-green-600 dark:text-green-400' }
    if (accuracy >= 80) return { level: 'Tốt', color: 'text-blue-600 dark:text-blue-400' }
    if (accuracy >= 70) return { level: 'Khá', color: 'text-yellow-600 dark:text-yellow-400' }
    if (accuracy >= 60) return { level: 'Trung bình', color: 'text-orange-600 dark:text-orange-400' }
    return { level: 'Cần cải thiện', color: 'text-red-600 dark:text-red-400' }
  })

  // Get streak message
  const getStreakMessage = computed(() => {
    const streak = currentStreak.value
    if (streak === 0) return ''
    if (streak < 3) return 'Bắt đầu tốt!'
    if (streak < 5) return 'Đang tiến bộ!'
    if (streak < 10) return 'Tuyệt vời!'
    return 'Xuất sắc!'
  })

  // Get speed rating
  const getSpeedRating = computed(() => {
    const avgTime = sessionStats.value.averageTimePerCard / 1000 // Convert to seconds
    if (avgTime === 0) return { rating: '', color: '' }
    if (avgTime < 2) return { rating: 'Rất nhanh', color: 'text-green-600 dark:text-green-400' }
    if (avgTime < 4) return { rating: 'Nhanh', color: 'text-blue-600 dark:text-blue-400' }
    if (avgTime < 6) return { rating: 'Trung bình', color: 'text-yellow-600 dark:text-yellow-400' }
    if (avgTime < 10) return { rating: 'Chậm', color: 'text-orange-600 dark:text-orange-400' }
    return { rating: 'Rất chậm', color: 'text-red-600 dark:text-red-400' }
  })

  // Format time
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${remainingSeconds}s`
  }

  // Get detailed stats for modal
  const getDetailedStats = computed(() => {
    return {
      ...sessionStats.value,
      performanceLevel: getPerformanceLevel.value,
      streakMessage: getStreakMessage.value,
      speedRating: getSpeedRating.value,
      timeSpentFormatted: formatTime(sessionStats.value.timeSpent),
      averageTimeFormatted: formatTime(sessionStats.value.averageTimePerCard),
      completion: sessionStats.value.totalCards > 0 
        ? Math.round((sessionStats.value.currentCard / sessionStats.value.totalCards) * 100)
        : 0
    }
  })

  // Stats are now synchronized directly in recordAnswer

  return {
    sessionStats,
    currentStreak,
    maxStreak,
    initializeStats,
    recordAnswer,
    nextCard,
    getPerformanceLevel,
    getStreakMessage,
    getSpeedRating,
    formatTime,
    getDetailedStats
  }
}
