import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useVocabularyStore } from '../../../composables/useVocabularyStore'
import { groupVocabulariesByDate } from '../../../utils/dateUtils'

interface Word {
  id: number
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  example?: string
  level: string
  category: string
  favorite?: boolean
  image?: string
  createdAt?: string
  updatedAt?: string
  isBatchMove?: boolean
  batchWords?: Word[]
  categoryName?: string
}

interface DateGroup {
  date: string
  count: number
}

export function useMoveMode() {
  const { t, locale } = useI18n()
  const vocabularyStore = useVocabularyStore()
  const toast = useToast()

  // Move Mode State
  const globalMoveMode = ref(getStoredMoveMode())
  
  // Move Modal State
  const showMoveModal = ref(false)
  const wordToMove = ref<Word | null>(null)
  const selectedTargetDate = ref('')
  const availableDateGroups = ref<DateGroup[]>([])
  const currentSourceDate = ref('')

  // Local Storage helpers
  function getStoredMoveMode(): boolean {
    try {
      const stored = localStorage.getItem('vocabulary-global-move-mode-enabled')
      return stored ? JSON.parse(stored) : false
    } catch (error) {
      console.warn('Failed to parse stored move mode preference:', error)
      return false
    }
  }

  function setStoredMoveMode(enabled: boolean) {
    try {
      localStorage.setItem('vocabulary-global-move-mode-enabled', JSON.stringify(enabled))
    } catch (error) {
      console.warn('Failed to store move mode preference:', error)
    }
  }

  // Toggle Move Mode
  const toggleMoveMode = (enabled: boolean) => {
    globalMoveMode.value = enabled
    setStoredMoveMode(enabled)
  }

  // Handle move vocabulary request
  const handleMoveVocabulary = (data: { word: Word, targetDate: string, sourceDate?: string }) => {
    // If targetDate is empty, show the modal for date selection
    if (!data.targetDate) {
      // Ensure categoryName is set for single word move
      wordToMove.value = {
        ...data.word,
        categoryName: data.word.category,
        isBatchMove: false
      }
      currentSourceDate.value = data.sourceDate || ''
      loadAvailableDateGroups(data.word.category)
      showMoveModal.value = true
    } else {
      // Direct move with specified date
      performMoveVocabulary(data)
    }
  }

  // Load available date groups with same topic
  const loadAvailableDateGroups = (topic: string) => {
    // Get all vocabularies grouped by date (all vocabularies, not just same topic)
    // This allows moving to any existing date group
    const allDateGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value)
    
    // Filter out the current source date and map to count format
    availableDateGroups.value = allDateGroups
      .filter(group => group.date !== currentSourceDate.value) // Exclude current word's source date
      .map(group => ({
        date: group.date,
        count: group.vocabularies.length
      }))
      .sort((a: DateGroup, b: DateGroup) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
  }

  // Perform the actual move operation
  const performMoveVocabulary = async (data: { word: Word, targetDate: string }) => {
    try {
      // Find the word in store
      const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w: Word) => w.id === data.word.id)
      if (wordIndex !== -1) {
        // Update the word's dates
        const updatedWord = {
          ...data.word,
          createdAt: data.targetDate,
          updatedAt: data.targetDate
        }
        
        // Update in store
        vocabularyStore.allVocabularies.value[wordIndex] = updatedWord
        
        toast.success(
          t('vocabulary.moveSuccess', 
            { word: data.word.word, date: formatDateForDisplay(data.targetDate) },
            `Successfully moved "${data.word.word}" to ${formatDateForDisplay(data.targetDate)}`
          ),
          { timeout: 3000 }
        )
        
        console.log(`Moved vocabulary "${data.word.word}" to ${data.targetDate}`)
      } else {
        throw new Error('Word not found')
      }
    } catch (error) {
      console.error('Failed to move vocabulary:', error)
      toast.error(
        t('vocabulary.moveError', 
          { word: data.word.word, error: (error as Error).message },
          `Failed to move "${data.word.word}": ${(error as Error).message}`
        ),
        { timeout: 5000 }
      )
    }
  }

  // Format date for display
  const formatDateForDisplay = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale.value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Close move modal
  const closeMoveModal = () => {
    showMoveModal.value = false
    wordToMove.value = null
    selectedTargetDate.value = ''
    availableDateGroups.value = []
    currentSourceDate.value = ''
  }

  // Confirm move from modal
  const confirmMove = (data: { word: Word, targetDate: string }) => {
    if (data.word.isBatchMove) {
      performBatchMove(data.targetDate)
    } else {
      performMoveVocabulary(data)
    }
    closeMoveModal()
  }

  // Handle batch move for all words in a category
  const handleBatchMoveCategory = (data: { topic: string, words: Word[], sourceDate: string }) => {
    // Store batch info for move modal
    const batchWords = data.words
    const categoryName = data.topic
    
    // Use the first word as representative for the modal
    // But we'll handle all words when confirming
    wordToMove.value = {
      ...batchWords[0],
      isBatchMove: true,
      batchWords: batchWords,
      categoryName: categoryName
    }
    
    currentSourceDate.value = data.sourceDate
    
    // Load available date groups (excluding source date)
    const allGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value)
    
    // Filter out source date and convert to the format needed for the modal
    availableDateGroups.value = allGroups
      .filter(group => group.date !== data.sourceDate)
      .map(group => ({
        date: group.date,
        count: group.vocabularies.length
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Show move modal
    showMoveModal.value = true
  }

  // Perform batch move for category
  const performBatchMove = async (targetDate: string) => {
    try {
      const batchWords = wordToMove.value?.batchWords || []
      const categoryName = wordToMove.value?.categoryName || ''
      
      // Move all words in the batch
      batchWords.forEach((word: Word) => {
        const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w: Word) => w.id === word.id)
        if (wordIndex !== -1) {
          const updatedWord = {
            ...word,
            createdAt: targetDate,
            updatedAt: targetDate
          }
          vocabularyStore.allVocabularies.value[wordIndex] = updatedWord
        }
      })
      
      // Show success message
      toast.success(
        t('vocabulary.batchMoveSuccess', 
          { count: batchWords.length, category: categoryName, date: formatDateForDisplay(targetDate) },
          `Successfully moved ${batchWords.length} words from "${categoryName}" to ${formatDateForDisplay(targetDate)}`
        ),
        { timeout: 3000 }
      )
      
      console.log(`Batch moved ${batchWords.length} words from category "${categoryName}" to ${targetDate}`)
    } catch (error) {
      console.error('Failed to batch move vocabulary:', error)
      toast.error(
        t('vocabulary.batchMoveError', 
          { error: (error as Error).message },
          `Failed to batch move: ${(error as Error).message}`
        ),
        { timeout: 5000 }
      )
    }
  }

  return {
    // State
    globalMoveMode,
    showMoveModal,
    wordToMove,
    selectedTargetDate,
    availableDateGroups,
    currentSourceDate,
    
    // Actions
    toggleMoveMode,
    handleMoveVocabulary,
    handleBatchMoveCategory,
    loadAvailableDateGroups,
    performMoveVocabulary,
    performBatchMove,
    closeMoveModal,
    confirmMove,
    formatDateForDisplay,
    
    // Helpers
    getStoredMoveMode,
    setStoredMoveMode
  }
}
