import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  // Modal states
  const showVocabularyForm = ref(false)
  const showTopicManager = ref(false) 
  const showNoteDialog = ref(false)
  const showVocabularyDetail = ref(false)
  const showGrammarManager = ref(false)

  // Computed properties to determine what should be hidden
  const shouldHideBackToTop = computed(() => {
    return showVocabularyForm.value || showTopicManager.value || showNoteDialog.value || showGrammarManager.value || showVocabularyDetail.value
  })

  const shouldHideAddNewWord = computed(() => {
    return showTopicManager.value || showNoteDialog.value || showGrammarManager.value || showVocabularyDetail.value
  })

  // Actions to update modal states
  const setVocabularyForm = (show: boolean) => {
    showVocabularyForm.value = show
  }

  const setTopicManager = (show: boolean) => {
    showTopicManager.value = show
  }

  const setNoteDialog = (show: boolean) => {
    showNoteDialog.value = show
  }

  const setVocabularyDetail = (show: boolean) => {
    showVocabularyDetail.value = show
  }

  const setGrammarManager = (show: boolean) => {
    showGrammarManager.value = show
  }

  return {
    // States
    showVocabularyForm,
    showTopicManager,
    showNoteDialog,
    showVocabularyDetail,
    showGrammarManager,
    
    // Computed
    shouldHideBackToTop,
    shouldHideAddNewWord,
    
    // Actions
    setVocabularyForm,
    setTopicManager,
    setNoteDialog,
    setVocabularyDetail,
    setGrammarManager
  }
})
