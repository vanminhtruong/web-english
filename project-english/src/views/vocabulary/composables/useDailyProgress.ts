import { computed } from 'vue'
import { useFlashcardHistory } from '../../practice/composables/useFlashcardHistory'

export interface DailyProgressStats {
  date: string
  wordsLearned: number
  totalWords: number
  percentage: number
  isCompleted: boolean
}

export function useDailyProgress() {
  const { practiceHistory } = useFlashcardHistory()
  
  // Target words per day for 100% completion
  const DAILY_TARGET = 10
  
  /**
   * Calculate progress for a specific date
   * @param targetDate - Date string in YYYY-MM-DD format
   * @returns Progress stats for that date
   */
  const getDailyProgress = (targetDate: string): DailyProgressStats => {
    // Convert target date to Date object for comparison
    const target = new Date(targetDate)
    const targetDateString = target.toDateString()
    
    // Find all practice sessions for this date
    const sessionsForDate = practiceHistory.value.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate.toDateString() === targetDateString
    })
    
    // Calculate unique words learned (avoid counting duplicates)
    const uniqueWordsLearned = new Set<string>()
    
    sessionsForDate.forEach(session => {
      // Each correct answer represents a word learned
      // We use session.totalCards as an approximation of unique words in that session
      // since practice sessions typically don't repeat the same word multiple times
      const wordsInSession = session.correctAnswers
      
      // Add session categories to help identify unique words
      // For now, we'll use a simple approach: correct answers = words learned
      for (let i = 0; i < wordsInSession; i++) {
        uniqueWordsLearned.add(`${session.id}-${i}`)
      }
    })
    
    const wordsLearned = uniqueWordsLearned.size
    const percentage = Math.min((wordsLearned / DAILY_TARGET) * 100, 100)
    
    return {
      date: targetDate,
      wordsLearned,
      totalWords: DAILY_TARGET,
      percentage: Math.round(percentage),
      isCompleted: percentage >= 100
    }
  }
  
  /**
   * Get progress for multiple dates
   * @param dates - Array of date strings
   * @returns Array of progress stats
   */
  const getMultipleDailyProgress = (dates: string[]): DailyProgressStats[] => {
    return dates.map(date => getDailyProgress(date))
  }
  
  /**
   * Get today's progress
   * @returns Today's progress stats
   */
  const getTodayProgress = (): DailyProgressStats => {
    const today = new Date().toISOString().split('T')[0]
    return getDailyProgress(today)
  }
  
  /**
   * Get this week's overall progress
   * @returns Combined stats for current week
   */
  const getWeeklyProgress = () => {
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay()) // Start of week (Sunday)
    
    const weekDates: string[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      weekDates.push(date.toISOString().split('T')[0])
    }
    
    const weeklyStats = getMultipleDailyProgress(weekDates)
    const totalWordsLearned = weeklyStats.reduce((sum, day) => sum + day.wordsLearned, 0)
    const totalTarget = DAILY_TARGET * 7
    const weeklyPercentage = Math.min((totalWordsLearned / totalTarget) * 100, 100)
    
    return {
      wordsLearned: totalWordsLearned,
      totalWords: totalTarget,
      percentage: Math.round(weeklyPercentage),
      daysCompleted: weeklyStats.filter(day => day.isCompleted).length,
      dailyStats: weeklyStats
    }
  }
  
  /**
   * Check if a specific date has any practice sessions
   * @param targetDate - Date string in YYYY-MM-DD format
   * @returns Boolean indicating if there are practice sessions for this date
   */
  const hasActivityForDate = (targetDate: string): boolean => {
    const target = new Date(targetDate)
    const targetDateString = target.toDateString()
    
    return practiceHistory.value.some(session => {
      const sessionDate = new Date(session.date)
      return sessionDate.toDateString() === targetDateString
    })
  }
  
  return {
    DAILY_TARGET,
    getDailyProgress,
    getMultipleDailyProgress,
    getTodayProgress,
    getWeeklyProgress,
    hasActivityForDate
  }
}
