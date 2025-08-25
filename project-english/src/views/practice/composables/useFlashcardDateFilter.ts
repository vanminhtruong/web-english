import { ref, computed, watch } from 'vue'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { getDateKey } from '../../../utils/dateUtils'

const STORAGE_KEY = 'flashcard-date-filter'

export function useFlashcardDateFilter() {
  // Load date filter state from localStorage (always enabled)
  const loadDateFilterState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          selectedDate: parsed.selectedDate || ''
        }
      }
    } catch (error) {
      console.error('Error loading date filter state:', error)
    }
    return { selectedDate: '' }
  }

  // Save date filter state to localStorage (enabled is implicitly true)
  const saveDateFilterState = () => {
    try {
      const state = { selectedDate: selectedDate.value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Error saving date filter state:', error)
    }
  }

  // Initialize state from localStorage
  const initialState = loadDateFilterState()
  
  // Keep ref for SettingsModal compatibility; always true
  const dateFilterEnabled = ref(true)
  const selectedDate = ref(initialState.selectedDate)

  // Filter vocabularies by date
  const filterVocabulariesByDate = (vocabularies: Vocabulary[]) => {
    if (!selectedDate.value) {
      return vocabularies
    }

    return vocabularies.filter((vocab: Vocabulary) => {
      const vocabDateKey = getDateKey(vocab.createdAt)
      return vocabDateKey === selectedDate.value
    })
  }

  // Persist date filter changes
  watch(selectedDate, () => {
    saveDateFilterState()
  })

  return {
    dateFilterEnabled,
    selectedDate,
    filterVocabulariesByDate,
    saveDateFilterState,
    loadDateFilterState
  }
}
