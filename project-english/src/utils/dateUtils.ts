import { useI18n } from 'vue-i18n'
import type { TopicGroup } from '../views/vocabulary/types'

export interface GroupedVocabulary {
  date: string
  displayDate: string
  vocabularies: any[]
  topics?: TopicGroup[]
  totalItems?: number
  currentPage?: number
  totalPages?: number
}

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string | undefined, locale: string = 'vi-VN'): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return ''
  }
}

/**
 * Format date and time to readable string
 */
export const formatDateTime = (dateString: string | undefined, locale: string = 'vi-VN'): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return ''
  }
}

/**
 * Get relative time from now (e.g., "2 hours ago", "yesterday", "3 days ago")
 */
export const getRelativeTime = (dateString: string | undefined, locale: string = 'vi-VN'): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      if (diffInMinutes < 1) {
        return locale === 'vi-VN' ? 'Vừa xong' : 'Just now'
      }
      return locale === 'vi-VN' ? `${diffInMinutes} phút trước` : `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return locale === 'vi-VN' ? `${diffInHours} giờ trước` : `${diffInHours} hours ago`
    } else if (diffInDays === 1) {
      return locale === 'vi-VN' ? 'Hôm qua' : 'Yesterday'
    } else if (diffInDays < 7) {
      return locale === 'vi-VN' ? `${diffInDays} ngày trước` : `${diffInDays} days ago`
    } else {
      return formatDate(dateString, locale)
    }
  } catch (error) {
    return ''
  }
}

/**
 * Get date key for grouping (YYYY-MM-DD)
 */
export const getDateKey = (dateString: string | undefined): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  } catch (error) {
    return ''
  }
}

/**
 * Group vocabularies by topic
 */
export const groupVocabulariesByTopic = (vocabularies: any[]): TopicGroup[] => {
  const grouped = new Map<string, any[]>()
  const uncategorizedKey = 'Uncategorized'

  vocabularies.forEach(vocab => {
    const topic = vocab.category || uncategorizedKey
    if (!grouped.has(topic)) {
      grouped.set(topic, [])
    }
    grouped.get(topic)!.push(vocab)
  })

  const result = Array.from(grouped.entries()).map(([topic, vocabs]) => ({
    topic,
    vocabularies: vocabs.sort((a, b) => {
        const timeA = new Date(a.createdAt || '').getTime()
        const timeB = new Date(b.createdAt || '').getTime()
        return timeB - timeA
      })
  }))

  return result.sort((a, b) => {
    if (a.topic === uncategorizedKey) return 1;
    if (b.topic === uncategorizedKey) return -1;
    return a.topic.localeCompare(b.topic);
  });
}

/**
 * Group vocabularies by date and then by topic
 */
export const groupVocabulariesByDateAndTopic = (vocabularies: any[], locale: string = 'vi-VN'): GroupedVocabulary[] => {
  const groupedByDate = groupVocabulariesByDate(vocabularies, locale)

  return groupedByDate.map(dateGroup => {
    return {
      ...dateGroup,
      topics: groupVocabulariesByTopic(dateGroup.vocabularies)
    }
  })
}

/**
 * Group vocabularies by date
 */
export const groupVocabulariesByDate = (vocabularies: any[], locale: string = 'vi-VN'): GroupedVocabulary[] => {
  const grouped = new Map<string, any[]>()
  
  // Group by date key
  vocabularies.forEach(vocab => {
    const dateKey = getDateKey(vocab.createdAt)
    if (!dateKey) return
    
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, [])
    }
    grouped.get(dateKey)!.push(vocab)
  })
  
  // Convert to array and sort by date (newest first)
  const result: GroupedVocabulary[] = Array.from(grouped.entries())
    .map(([dateKey, vocabs]) => ({
      date: dateKey,
      displayDate: getGroupDisplayDate(dateKey, locale),
      vocabularies: vocabs.sort((a, b) => {
        // Sort by creation time within the same date (newest first)
        const timeA = new Date(a.createdAt || '').getTime()
        const timeB = new Date(b.createdAt || '').getTime()
        return timeB - timeA
      })
    }))
    .sort((a, b) => {
      // Sort groups by date (newest first)
      return b.date.localeCompare(a.date)
    })
  
  return result
}

/**
 * Get display name for date group
 */
export const getGroupDisplayDate = (dateKey: string, locale: string = 'vi-VN'): string => {
  try {
    const date = new Date(dateKey + 'T00:00:00')
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    
    const todayKey = getDateKey(today.toISOString())
    const yesterdayKey = getDateKey(yesterday.toISOString())
    
    if (dateKey === todayKey) {
      return locale === 'vi-VN' ? 'Hôm nay' : 'Today'
    } else if (dateKey === yesterdayKey) {
      return locale === 'vi-VN' ? 'Hôm qua' : 'Yesterday'
    } else {
      return formatDate(date.toISOString(), locale)
    }
  } catch (error) {
    return dateKey
  }
}
