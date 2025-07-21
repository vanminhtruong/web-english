import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Define vocabulary interface
export interface Vocabulary {
  id: number
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  example: string
  category: string
  level: string
  synonyms?: string[]
  antonyms?: string[]
  notes?: string
  favorite?: boolean
  image?: string // Base64 encoded image or URL
  createdAt?: string
  updatedAt?: string
}

// Global vocabulary store
const vocabularies = ref<Vocabulary[]>([])
let nextId = 1
let isInitialized = false

// Reactive flag to track initialization status
const isStoreReady = ref(false)

// Reactive custom topics to fix category update issue
const customTopics = ref<{key: string, vi: string, en: string}[]>([])

// Load custom topics from localStorage into reactive ref
const loadCustomTopics = () => {
  try {
    const saved = localStorage.getItem('customTopics')
    if (saved) {
      const parsedTopics = JSON.parse(saved)
      if (Array.isArray(parsedTopics)) {
        customTopics.value = parsedTopics
      }
    }
  } catch (error) {
    console.error('Error loading custom topics:', error)
    customTopics.value = []
  }
}

// Load from localStorage immediately when module is imported
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('vocabularies')
    const savedNextId = localStorage.getItem('nextVocabId')
    
    if (saved) {
      const parsedVocabs = JSON.parse(saved)
      if (Array.isArray(parsedVocabs)) {
        vocabularies.value = parsedVocabs
      }
    }
    
    if (savedNextId) {
      nextId = parseInt(savedNextId, 10) || 1
    }
    
    // Load custom topics as well
    loadCustomTopics()
    
    isInitialized = true
    isStoreReady.value = true
  } catch (error) {
    console.error('Error loading vocabularies from localStorage:', error)
    isInitialized = true
    isStoreReady.value = true
  }
}

// Save to localStorage
const saveToLocalStorage = () => {
  try {
    localStorage.setItem('vocabularies', JSON.stringify(vocabularies.value))
    localStorage.setItem('nextVocabId', nextId.toString())
    // Also save custom topics
    localStorage.setItem('customTopics', JSON.stringify(customTopics.value))
  } catch (error) {
    console.error('Error saving data to localStorage:', error)
  }
}

function normalizeCategoryKeys() {
  const categoryKeys = [
    'technology', 'business', 'travel', 'food', 'health', 'education', 'sports', 'entertainment',
    'science', 'art', 'music', 'literature', 'politics', 'environment', 'fashion', 'finance'
  ];
  // Danh sách các bản dịch tiếng Anh/Việt cho từng key
  const translationMap: { [key: string]: string[] } = {
    technology: ['Technology', 'Công nghệ'],
    business: ['Business', 'Kinh doanh'],
    travel: ['Travel', 'Du lịch'],
    food: ['Food', 'Ẩm thực'],
    health: ['Health', 'Sức khỏe'],
    education: ['Education', 'Giáo dục'],
    sports: ['Sports', 'Thể thao'],
    entertainment: ['Entertainment', 'Giải trí'],
    science: ['Science', 'Khoa học'],
    art: ['Art', 'Nghệ thuật'],
    music: ['Music', 'Âm nhạc'],
    literature: ['Literature', 'Văn học'],
    politics: ['Politics', 'Chính trị'],
    environment: ['Environment', 'Môi trường'],
    fashion: ['Fashion', 'Thời trang'],
    finance: ['Finance', 'Tài chính']
  };
  vocabularies.value.forEach(vocab => {
    for (const key of categoryKeys) {
      if (
        vocab.category === key ||
        translationMap[key].includes(vocab.category)
      ) {
        vocab.category = key;
        break;
      }
    }
  });
  saveToLocalStorage();
}

// Initialize immediately if in browser environment
if (typeof window !== 'undefined') {
  loadFromLocalStorage()
  normalizeCategoryKeys()
}

export function useVocabularyStore() {
  // Computed properties
  const allVocabularies = computed(() => vocabularies.value)
  const totalCount = computed(() => vocabularies.value.length)
  
  // Get vocabulary by ID
  const getVocabularyById = (id: number | string): Vocabulary | undefined => {
    return vocabularies.value.find(vocab => vocab.id === Number(id))
  }
  
  // Add new vocabulary
  const addVocabulary = (vocabularyData: Omit<Vocabulary, 'id' | 'createdAt'>): Vocabulary => {
    const newVocabulary: Vocabulary = {
      ...vocabularyData,
      id: nextId++,
      createdAt: new Date().toISOString()
    }
    
    vocabularies.value.unshift(newVocabulary) // Add to beginning of array
    
    // Save to localStorage for persistence
    saveToLocalStorage()
    
    return newVocabulary
  }
  
  // Update vocabulary
  const updateVocabulary = (id: number, updates: Partial<Vocabulary>): boolean => {
    const index = vocabularies.value.findIndex(vocab => vocab.id === id)
    if (index !== -1) {
      vocabularies.value[index] = {
        ...vocabularies.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      saveToLocalStorage()
      return true
    }
    return false
  }
  
  // Delete vocabulary
  const deleteVocabulary = (id: number): boolean => {
    const index = vocabularies.value.findIndex(vocab => vocab.id === id)
    if (index !== -1) {
      vocabularies.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }
  
  // Import vocabularies (merge with existing)
  const importVocabularies = (newVocabularies: Vocabulary[]): boolean => {
    try {
      let importedCount = 0
      let updatedCount = 0
      
      newVocabularies.forEach((importedVocab) => {
        // Check if vocabulary already exists (by word, case-insensitive)
        const existingIndex = vocabularies.value.findIndex(
          vocab => vocab.word.toLowerCase() === importedVocab.word.toLowerCase()
        )
        
        if (existingIndex !== -1) {
          // Update existing vocabulary
          const existingVocab = vocabularies.value[existingIndex]
          vocabularies.value[existingIndex] = {
            ...existingVocab, // Keep original id and createdAt
            ...importedVocab, // Override with imported data
            id: existingVocab.id, // Preserve original ID
            createdAt: existingVocab.createdAt, // Preserve original creation date
            updatedAt: new Date().toISOString() // Update modification time
          }
          updatedCount++
        } else {
          // Add new vocabulary
          const newVocab = {
            ...importedVocab,
            id: nextId++,
            createdAt: importedVocab.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          vocabularies.value.unshift(newVocab) // Add to beginning
          importedCount++
        }
      })
      
      // Save to localStorage
      saveToLocalStorage()
      
      console.log(`Import completed: ${importedCount} new vocabularies added, ${updatedCount} existing vocabularies updated`)
      return true
    } catch (error) {
      console.error('Error importing vocabularies:', error)
      return false
    }
  }
  
  // Filter vocabularies
  const filterVocabularies = (filters: {
    search?: string
    category?: string
    level?: string
  }) => {
    return computed(() => {
      return vocabularies.value.filter(vocab => {
        const matchesSearch = !filters.search || 
          vocab.word.toLowerCase().includes(filters.search.toLowerCase()) ||
          vocab.meaning.toLowerCase().includes(filters.search.toLowerCase())
        
        const matchesCategory = !filters.category || vocab.category === filters.category
        const matchesLevel = !filters.level || vocab.level === filters.level
        
        return matchesSearch && matchesCategory && matchesLevel
      })
    })
  }
  
  // Get categories (including custom topics)
  const getCategories = computed(() => {
    // Define the standard category keys - ALWAYS include all 16 built-in topics
    const standardCategories = [
      'technology', 'business', 'travel', 'food', 'health', 'education', 'sports', 'entertainment',
      'science', 'art', 'music', 'literature', 'politics', 'environment', 'fashion', 'finance'
    ]
    
    // Use reactive custom topics - this will trigger reactivity when topics change
    const customTopicKeys = customTopics.value.map(topic => topic.key)
    
    // Get unique categories from vocabularies that are not in standard or custom
    const usedCategories = new Set(vocabularies.value.map(vocab => vocab.category))
    const additionalCategories = Array.from(usedCategories).filter(cat => 
      !standardCategories.includes(cat) && !customTopicKeys.includes(cat)
    )
    
    // Always return ALL standard categories + custom topics + any additional ones
    return [...standardCategories, ...customTopicKeys, ...additionalCategories].sort()
  })
  
  // Get category usage count for topic manager
  const getCategoryUsage = computed(() => {
    const usage: Record<string, number> = {}
    vocabularies.value.forEach(vocab => {
      usage[vocab.category] = (usage[vocab.category] || 0) + 1
    })
    return usage
  })
  
  // Get levels
  const getLevels = computed(() => {
    const levels = new Set(vocabularies.value.map(vocab => vocab.level))
    return Array.from(levels).sort()
  })
  
  // Toggle favorite status
  const toggleFavorite = (id: number): boolean => {
    const index = vocabularies.value.findIndex(vocab => vocab.id === id)
    if (index !== -1) {
      vocabularies.value[index] = {
        ...vocabularies.value[index],
        favorite: !vocabularies.value[index].favorite,
        updatedAt: new Date().toISOString()
      }
      
      saveToLocalStorage()
      return true
    }
    return false
  }
  
  // Get favorite vocabularies
  const favoriteVocabularies = computed(() => {
    return vocabularies.value.filter(vocab => vocab.favorite)
  })
  
  // Initialize store - ensure data is loaded
  const initializeStore = () => {
    if (!isInitialized) {
      loadFromLocalStorage()
    }
    return isStoreReady
  }
  
  // Functions to manage custom topics reactivity
  const refreshCustomTopics = () => {
    loadCustomTopics()
  }
  
  const addCustomTopic = (topic: {key: string, vi: string, en: string}) => {
    customTopics.value.push(topic)
    saveToLocalStorage()
  }
  
  const updateCustomTopic = (oldKey: string, topic: {key: string, vi: string, en: string}) => {
    const index = customTopics.value.findIndex(t => t.key === oldKey)
    if (index !== -1) {
      customTopics.value[index] = topic
      saveToLocalStorage()
    }
  }
  
  const deleteCustomTopic = (key: string) => {
    const index = customTopics.value.findIndex(t => t.key === key)
    if (index !== -1) {
      customTopics.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  return {
    // State
    allVocabularies,
    totalCount,
    favoriteVocabularies,
    isStoreReady,
    
    // Getters
    getVocabularyById,
    getCategories,
    getLevels,
    getCategoryUsage,
    
    // Actions
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    importVocabularies,
    toggleFavorite,
    filterVocabularies,
    initializeStore,
    
    // Utils
    saveToLocalStorage,
    
    // Custom topics management
    customTopics,
    refreshCustomTopics,
    addCustomTopic,
    updateCustomTopic,
    deleteCustomTopic
  }
}
