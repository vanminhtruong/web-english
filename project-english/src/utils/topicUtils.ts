import { useI18n } from 'vue-i18n'

export interface CustomTopic {
  key: string
  vi: string
  en: string
}

/**
 * Get the translated name of a topic/category based on current locale
 * Also accepts a vocabulary object with categoryName for imported data
 */
export function getTopicName(categoryKey: string, vocabularyItem?: any): string {
  const { t, locale } = useI18n()
  
  // If vocabulary item has categoryName from imported data, use it first
  if (vocabularyItem && vocabularyItem.categoryName) {
    return vocabularyItem.categoryName
  }
  
  // First check if it's a custom topic
  const customTopics = getCustomTopics()
  const customTopic = customTopics.find(topic => topic.key === categoryKey)
  
  if (customTopic) {
    // Return the name based on current locale
    return locale.value === 'vi' ? customTopic.vi : customTopic.en
  }
  
  // Check if it's a built-in category with translation
  const translationKey = `vocabulary.categories.${categoryKey}`
  const translatedName = t(translationKey)
  
  // If translation exists and is not the same as the key, return it
  if (translatedName && translatedName !== translationKey) {
    return translatedName
  }
  
  // Fallback to the category key itself (capitalized)
  return categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
}

/**
 * Get all available topics (built-in + custom) with their translated names
 */
export function getAllTopicsWithNames(): Array<{ key: string; name: string }> {
  const { t } = useI18n()
  
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
      name: getTopicName(key)
    })
  })
  
  // Add custom topics
  const customTopics = getCustomTopics()
  customTopics.forEach(topic => {
    result.push({
      key: topic.key,
      name: getTopicName(topic.key)
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
  const { locale } = useI18n()
  
  return {
    getTopicName: (categoryKey: string) => {
      // Re-compute when locale changes
      return getTopicName(categoryKey)
    },
    getAllTopicsWithNames: () => {
      // Re-compute when locale changes
      return getAllTopicsWithNames()
    },
    currentLocale: locale
  }
}
