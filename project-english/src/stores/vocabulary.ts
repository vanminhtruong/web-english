import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Vocabulary {
  id: string
  english: string
  vietnamese: string
  korean: string
  phonetic: string
  type: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  example: string
  createdAt: string
  updatedAt: string
}

export const useVocabularyStore = defineStore('vocabulary', () => {
  // State
  const vocabularies = ref<Vocabulary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const vocabularyCount = computed(() => vocabularies.value.length)
  
  const getVocabulariesByTopic = computed(() => (topic: string) => {
    return vocabularies.value.filter(vocab => vocab.topic === topic)
  })

  const getVocabularyById = computed(() => (id: string) => {
    return vocabularies.value.find(vocab => vocab.id === id)
  })

  // Actions
  const loadVocabularies = () => {
    try {
      loading.value = true
      const stored = localStorage.getItem('vocabularies')
      if (stored) {
        vocabularies.value = JSON.parse(stored)
      }
    } catch (err) {
      error.value = 'Failed to load vocabularies'
      console.error('Error loading vocabularies:', err)
    } finally {
      loading.value = false
    }
  }

  const saveVocabularies = () => {
    try {
      localStorage.setItem('vocabularies', JSON.stringify(vocabularies.value))
    } catch (err) {
      error.value = 'Failed to save vocabularies'
      console.error('Error saving vocabularies:', err)
    }
  }

  const addVocabulary = (vocabulary: Omit<Vocabulary, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newVocabulary: Vocabulary = {
      ...vocabulary,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    vocabularies.value.push(newVocabulary)
    saveVocabularies()
  }

  const updateVocabulary = (id: string, updates: Partial<Vocabulary>) => {
    const index = vocabularies.value.findIndex(vocab => vocab.id === id)
    if (index !== -1) {
      vocabularies.value[index] = {
        ...vocabularies.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveVocabularies()
    }
  }

  const deleteVocabulary = (id: string) => {
    const index = vocabularies.value.findIndex(vocab => vocab.id === id)
    if (index !== -1) {
      vocabularies.value.splice(index, 1)
      saveVocabularies()
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    vocabularies,
    loading,
    error,
    // Getters
    vocabularyCount,
    getVocabulariesByTopic,
    getVocabularyById,
    // Actions
    loadVocabularies,
    saveVocabularies,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    clearError
  }
})
