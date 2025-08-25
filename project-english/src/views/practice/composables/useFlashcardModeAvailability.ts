import { computed, type Ref, type ComputedRef } from 'vue'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { getDateKey } from '../../../utils/dateUtils'

export function useFlashcardModeAvailability(
  baseFlashcards: ComputedRef<Vocabulary[]>,
  filteredVocabularies: ComputedRef<Vocabulary[]>,
  allVocabularies: Ref<Vocabulary[]>,
  selectedDate: Ref<string>
) {
  // Determine if Image mode is available for the CURRENT effective set (date + category + difficulty)
  // This ensures that when a date contains multiple topics, Image mode is only enabled if the selected
  // topic (and difficulty) actually has images.
  const imageModeAvailable = computed(() => {
    const cards = baseFlashcards.value
    if (cards.length === 0) return false
    // Image mode is available only if ALL cards in the current effective set have a non-empty image
    return cards.every((v: Vocabulary) => {
      const img: any = (v as any).image
      if (img == null) return false
      const s = typeof img === 'string' ? img : String(img)
      return s.trim().length > 0
    })
  })

  // Determine if Pictionary mode is available for the CURRENT effective set (date + category + difficulty)
  // This ensures that when a date contains multiple topics, Pictionary mode is only enabled if the selected
  // topic (and difficulty) actually has images.
  const pictionaryModeAvailable = computed(() => {
    const cards = baseFlashcards.value
    if (cards.length === 0) return false
    // Pictionary mode is available only if ALL cards in the current effective set have a non-empty image
    return cards.every((v: Vocabulary) => {
      const img: any = (v as any).image
      if (img == null) return false
      const s = typeof img === 'string' ? img : String(img)
      return s.trim().length > 0
    })
  })

  // Determine if Flip Tile mode is available for the CURRENT effective set (date + category + difficulty)
  // This ensures that when a date contains multiple topics, Flip Tile mode is only enabled if the selected
  // topic (and difficulty) actually has images.
  const flipTileModeAvailable = computed(() => {
    const cards = baseFlashcards.value
    if (cards.length === 0) return false
    // Flip Tile mode is available only if ALL cards in the current effective set have a non-empty image
    return cards.every((v: Vocabulary) => {
      const img: any = (v as any).image
      if (img == null) return false
      const s = typeof img === 'string' ? img : String(img)
      return s.trim().length > 0
    })
  })

  // Determine if Bubble Shooter mode is available based on vocabulary count
  // Bubble Shooter mode is disabled when the selected date contains more than 8 vocabulary words
  // to avoid gameplay issues with too many balls
  const bubbleShooterModeAvailable = computed(() => {
    // If no date is selected, count all vocabularies
    if (!selectedDate.value) {
      return filteredVocabularies.value.length <= 8
    }
    
    // Count vocabularies for the selected date (before category/difficulty filtering)
    const dateFilteredVocabs = allVocabularies.value.filter((vocab: Vocabulary) => {
      const vocabDateKey = getDateKey(vocab.createdAt)
      return vocabDateKey === selectedDate.value
    })
    
    return dateFilteredVocabs.length <= 8
  })

  // Helper function to check if image is valid and non-empty
  const hasValidImage = (vocabulary: Vocabulary): boolean => {
    const img: any = (vocabulary as any).image
    if (img == null) return false
    const s = typeof img === 'string' ? img : String(img)
    return s.trim().length > 0
  }

  // Check if specific vocabulary has valid image
  const vocabularyHasImage = (vocabulary: Vocabulary): boolean => {
    return hasValidImage(vocabulary)
  }

  // Get count of vocabularies with images in current set
  const vocabulariesWithImagesCount = computed(() => {
    return baseFlashcards.value.filter(hasValidImage).length
  })

  // Get count of vocabularies without images in current set
  const vocabulariesWithoutImagesCount = computed(() => {
    return baseFlashcards.value.filter(v => !hasValidImage(v)).length
  })

  return {
    // Mode availability computed properties
    imageModeAvailable,
    pictionaryModeAvailable,
    flipTileModeAvailable,
    bubbleShooterModeAvailable,

    // Helper functions
    hasValidImage,
    vocabularyHasImage,

    // Statistics
    vocabulariesWithImagesCount,
    vocabulariesWithoutImagesCount
  }
}
