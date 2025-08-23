import { useI18n } from 'vue-i18n'

export interface CustomTopic {
  key: string
  vi: string
  en: string
  ko?: string
}

// Normalize locale to base language code used by the app
// Examples: 'vi-VN' -> 'vi', 'en-US' -> 'en', 'ko-KR' -> 'ko'
function normalizeLocale(input?: string): 'en' | 'vi' | 'ko' {
  const s = (input || '').toLowerCase()
  if (s.startsWith('vi')) return 'vi'
  if (s.startsWith('ko')) return 'ko'
  return 'en'
}

/**
 * Get the translated name of a topic/category based on current locale
 * This version accepts t and locale as parameters to avoid composable issues
 */
export function getTopicName(categoryKey: string, t?: any, locale?: any, vocabularyItem?: any): string {
  // Prepare helpers and sources
  const customTopics = getCustomTopics()
  const builtInKeys = [
    'technology', 'business', 'travel', 'food', 'health', 'education',
    'sports', 'entertainment', 'science', 'art', 'music', 'literature',
    'politics', 'environment', 'fashion', 'finance'
  ]

  // If vocabulary item has categoryName from imported data, prefer it ONLY when it looks like a human-readable name,
  // not when it is actually a topic key. This prevents showing raw keys like "technology" or custom keys.
  if (vocabularyItem && vocabularyItem.categoryName) {
    const cn = String(vocabularyItem.categoryName)
    const isKnownKey = builtInKeys.includes(cn) || customTopics.some(ct => ct.key === cn)
    if (!isKnownKey) {
      return cn
    }
  }

  // Normalize numeric-like keys by falling back to the vocabulary item's real category if available
  let key = String(categoryKey || '')
  const isNumericLike = /^\d+$/.test(key.trim())
  if (isNumericLike && vocabularyItem && vocabularyItem.category && !/^\d+$/.test(String(vocabularyItem.category))) {
    key = String(vocabularyItem.category)
  }

  // First check if it's a custom topic by key
  const customTopic = customTopics.find(topic => topic.key === key)
  
  if (customTopic) {
    // Return the name based on current locale (normalize vi-VN, en-US, ko-KR, ...)
    const rawLocale = typeof locale === 'string' ? locale : locale?.value
    const currentLocale = normalizeLocale(rawLocale)
    if (currentLocale === 'vi') {
      return customTopic.vi || customTopic.en || customTopic.ko || key
    }
    if (currentLocale === 'ko') {
      return customTopic.ko || customTopic.en || customTopic.vi || key
    }
    return customTopic.en || customTopic.vi || customTopic.ko || key
  }
  
  // Check if it's a built-in category with translation (if t function provided)
  if (t) {
    const translationKey = `vocabulary.categories.${key}`
    const translatedName = t(translationKey)
    
    // If translation exists and is not the same as the key, return it
    if (translatedName && translatedName !== translationKey) {
      return translatedName
    }
  }
  
  // For built-in categories, use hardcoded fallback
  const builtInCategories: { [key: string]: { vi: string, en: string, ko: string } } = {
    'technology': { vi: 'Công nghệ', en: 'Technology', ko: '기술' },
    'business': { vi: 'Kinh doanh', en: 'Business', ko: '비즈니스' },
    'travel': { vi: 'Du lịch', en: 'Travel', ko: '여행' },
    'food': { vi: 'Ẩm thực', en: 'Food', ko: '음식' },
    'health': { vi: 'Sức khỏe', en: 'Health', ko: '건강' },
    'education': { vi: 'Giáo dục', en: 'Education', ko: '교육' },
    'sports': { vi: 'Thể thao', en: 'Sports', ko: '스포츠' },
    'entertainment': { vi: 'Giải trí', en: 'Entertainment', ko: '엔터테인먼트' },
    'science': { vi: 'Khoa học', en: 'Science', ko: '과학' },
    'art': { vi: 'Nghệ thuật', en: 'Art', ko: '예술' },
    'music': { vi: 'Âm nhạc', en: 'Music', ko: '음악' },
    'literature': { vi: 'Văn học', en: 'Literature', ko: '문학' },
    'politics': { vi: 'Chính trị', en: 'Politics', ko: '정치' },
    'environment': { vi: 'Môi trường', en: 'Environment', ko: '환경' },
    'fashion': { vi: 'Thời trang', en: 'Fashion', ko: '패션' },
    'finance': { vi: 'Tài chính', en: 'Finance', ko: '금융' }
  }
  
  if (builtInCategories[key]) {
    const rawLocale = typeof locale === 'string' ? locale : locale?.value
    const currentLocale = normalizeLocale(rawLocale)
    if (currentLocale === 'vi') return builtInCategories[key].vi
    if (currentLocale === 'ko') return builtInCategories[key].ko
    return builtInCategories[key].en
  }
  
  // Fallback to the category key itself (capitalized)
  return key.charAt(0).toUpperCase() + key.slice(1)
}

/**
 * Get all available topics (built-in + custom) with their translated names
 */
export function getAllTopicsWithNames(t?: any, locale?: any): Array<{ key: string; name: string }> {
  // Built-in categories
  const builtInCategories = [
    'technology', 'business', 'travel', 'food', 'health', 'education', 
    'sports', 'entertainment', 'science', 'art', 'music', 'literature', 
    'politics', 'environment', 'fashion', 'finance'
  ]
  
  const result: Array<{ key: string; name: string }> = []
  
  // Add built-in categories
  builtInCategories.forEach(key => {
    result.push({
      key,
      name: getTopicName(key, t, locale)
    })
  })
  
  // Add custom topics
  const customTopics = getCustomTopics()
  customTopics.forEach(topic => {
    result.push({
      key: topic.key,
      name: getTopicName(topic.key, t, locale)
    })
  })
  
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Load custom topics from localStorage
 */
export function getCustomTopics(): CustomTopic[] {
  try {
    const saved = localStorage.getItem('customTopics')
    if (saved) {
      const topics = JSON.parse(saved)
      return Array.isArray(topics) ? topics : []
    }
  } catch (error) {
    console.error('Error loading custom topics:', error)
  }
  return []
}

/**
 * Save custom topics to localStorage
 */
export function saveCustomTopics(topics: CustomTopic[]): void {
  try {
    localStorage.setItem('customTopics', JSON.stringify(topics))
  } catch (error) {
    console.error('Error saving custom topics:', error)
  }
}

/**
 * Check if a topic key is built-in or custom
 */
export function isBuiltInTopic(categoryKey: string): boolean {
  const builtInCategories = [
    'technology', 'business', 'travel', 'food', 'health', 'education', 
    'sports', 'entertainment', 'science', 'art', 'music', 'literature', 
    'politics', 'environment', 'fashion', 'finance'
  ]
  
  return builtInCategories.includes(categoryKey)
}

/**
 * Get topic name for display in forms and lists
 * This function is reactive to locale changes
 */
export function useTopicName() {
  const { t, locale } = useI18n()
  
  return {
    getTopicName: (categoryKey: string) => {
      // Re-compute when locale changes
      return getTopicName(categoryKey, t, locale)
    },
    getAllTopicsWithNames: () => {
      // Re-compute when locale changes
      return getAllTopicsWithNames(t, locale)
    },
    currentLocale: locale
  }
}
