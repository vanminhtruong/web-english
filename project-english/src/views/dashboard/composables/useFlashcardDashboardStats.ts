import { ref, computed, onMounted } from 'vue'
import type { PracticeHistoryItem } from '../../practice/composables/useFlashcardHistory'

export interface FlashcardDashboardStats {
  totalSessions: number
  totalPracticeTime: number
  averageAccuracy: number
  bestScore: number
  favoriteMode: string
  totalCardsStudied: number
  streakDays: number
  weeklyProgress: number
  sessionsThisWeek: number
  sessionsThisMonth: number
}

export function useFlashcardDashboardStats() {
  const practiceHistory = ref<PracticeHistoryItem[]>([])
  const isLoading = ref(true)

  // Load practice history from localStorage
  const loadPracticeHistory = () => {
    try {
      const saved = localStorage.getItem('flashcard-practice-history')
      if (saved) {
        const parsed: PracticeHistoryItem[] = JSON.parse(saved)
        practiceHistory.value = parsed
      }
    } catch (error) {
      console.error('Error loading flashcard practice history:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Calculate streak days (consecutive days with practice)
  const getStreakDays = (): number => {
    if (practiceHistory.value.length === 0) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get unique practice dates sorted descending
    const practiceDates = [...new Set(
      practiceHistory.value.map(item => {
        const date = new Date(item.date)
        date.setHours(0, 0, 0, 0)
        return date.getTime()
      })
    )].sort((a, b) => b - a)

    if (practiceDates.length === 0) return 0

    // Check if practiced today or yesterday
    const mostRecentDate = new Date(practiceDates[0])
    const daysDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff > 1) return 0 // Break in streak

    let streak = 0
    let expectedDate = today.getTime()

    for (const practiceDate of practiceDates) {
      const date = new Date(practiceDate)
      if (date.getTime() === expectedDate) {
        streak++
        expectedDate -= 24 * 60 * 60 * 1000 // Previous day
      } else if (date.getTime() === expectedDate + 24 * 60 * 60 * 1000 && streak === 0) {
        // Allow for practicing yesterday if we haven't practiced today yet
        streak++
        expectedDate -= 24 * 60 * 60 * 1000
      } else {
        break // Streak broken
      }
    }

    return streak
  }

  // Get sessions from last 7 days
  const getWeeklyProgress = (): { sessionsThisWeek: number; weeklyProgress: number } => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const thisWeekSessions = practiceHistory.value.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= weekAgo && itemDate <= now
    })

    // Calculate weekly progress (sessions completed vs target of 7)
    const weeklyProgress = Math.min(Math.round((thisWeekSessions.length / 7) * 100), 100)

    return {
      sessionsThisWeek: thisWeekSessions.length,
      weeklyProgress
    }
  }

  // Get sessions from last 30 days
  const getSessionsThisMonth = (): number => {
    const now = new Date()
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    return practiceHistory.value.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= monthAgo && itemDate <= now
    }).length
  }

  // Get most used mode
  const getFavoriteMode = (): string => {
    if (practiceHistory.value.length === 0) return ''

    const modeCount = practiceHistory.value.reduce((acc, item) => {
      acc[item.mode] = (acc[item.mode] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(modeCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || ''
  }

  // Main computed stats
  const stats = computed((): FlashcardDashboardStats => {
    if (isLoading.value || practiceHistory.value.length === 0) {
      return {
        totalSessions: 0,
        totalPracticeTime: 0,
        averageAccuracy: 0,
        bestScore: 0,
        favoriteMode: '',
        totalCardsStudied: 0,
        streakDays: 0,
        weeklyProgress: 0,
        sessionsThisWeek: 0,
        sessionsThisMonth: 0
      }
    }

    const totalSessions = practiceHistory.value.length
    const totalPracticeTime = practiceHistory.value.reduce((sum, item) => sum + item.duration, 0)
    const averageAccuracy = Math.round(
      practiceHistory.value.reduce((sum, item) => sum + item.accuracy, 0) / totalSessions
    )
    const bestScore = Math.max(...practiceHistory.value.map(item => item.score))
    const totalCardsStudied = practiceHistory.value.reduce((sum, item) => sum + item.totalCards, 0)
    
    const favoriteMode = getFavoriteMode()
    const streakDays = getStreakDays()
    const { sessionsThisWeek, weeklyProgress } = getWeeklyProgress()
    const sessionsThisMonth = getSessionsThisMonth()

    return {
      totalSessions,
      totalPracticeTime: Math.round(totalPracticeTime / 60), // Convert to minutes
      averageAccuracy,
      bestScore,
      favoriteMode,
      totalCardsStudied,
      streakDays,
      weeklyProgress,
      sessionsThisWeek,
      sessionsThisMonth
    }
  })

  // Get formatted stats for display
  const getFormattedStats = computed(() => {
    const currentStats = stats.value
    
    return {
      ...currentStats,
      totalPracticeTimeFormatted: formatDuration(currentStats.totalPracticeTime),
      favoriteModeFormatted: formatMode(currentStats.favoriteMode),
      accuracyLevel: getAccuracyLevel(currentStats.averageAccuracy),
      streakLevel: getStreakLevel(currentStats.streakDays),
      progressLevel: getProgressLevel(currentStats.weeklyProgress)
    }
  })

  // Helper formatting functions
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const formatMode = (mode: string): string => {
    const modeNames: Record<string, string> = {
      'flashcard': 'Flashcard',
      'quiz': 'Quiz',
      'typing': 'Typing',
      'listening': 'Listening',
      'image': 'Image',
      'pictionary': 'Pictionary',
      'pronunciation': 'Pronunciation',
      'bubble-shooter': 'Bubble Shooter',
      'snake-game': 'Snake Hunt'
    }
    return modeNames[mode] || mode
  }

  const getAccuracyLevel = (accuracy: number): { level: string; color: string } => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'text-green-600 dark:text-green-400' }
    if (accuracy >= 80) return { level: 'Good', color: 'text-blue-600 dark:text-blue-400' }
    if (accuracy >= 70) return { level: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' }
    if (accuracy >= 60) return { level: 'Average', color: 'text-orange-600 dark:text-orange-400' }
    return { level: 'Needs Work', color: 'text-red-600 dark:text-red-400' }
  }

  const getStreakLevel = (days: number): { level: string; color: string } => {
    if (days >= 30) return { level: 'Amazing', color: 'text-purple-600 dark:text-purple-400' }
    if (days >= 14) return { level: 'Great', color: 'text-green-600 dark:text-green-400' }
    if (days >= 7) return { level: 'Good', color: 'text-blue-600 dark:text-blue-400' }
    if (days >= 3) return { level: 'Building', color: 'text-yellow-600 dark:text-yellow-400' }
    if (days >= 1) return { level: 'Started', color: 'text-orange-600 dark:text-orange-400' }
    return { level: 'None', color: 'text-gray-600 dark:text-gray-400' }
  }

  const getProgressLevel = (progress: number): { level: string; color: string } => {
    if (progress >= 90) return { level: 'Outstanding', color: 'text-green-600 dark:text-green-400' }
    if (progress >= 70) return { level: 'Strong', color: 'text-blue-600 dark:text-blue-400' }
    if (progress >= 50) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' }
    if (progress >= 30) return { level: 'Light', color: 'text-orange-600 dark:text-orange-400' }
    return { level: 'Minimal', color: 'text-red-600 dark:text-red-400' }
  }

  // Refresh stats
  const refreshStats = () => {
    loadPracticeHistory()
  }

  onMounted(() => {
    loadPracticeHistory()
  })

  return {
    stats,
    getFormattedStats,
    isLoading,
    refreshStats
  }
}
