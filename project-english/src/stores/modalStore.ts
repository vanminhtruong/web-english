import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  // Modal states
  const showVocabularyForm = ref(false)
  const showTopicManager = ref(false) 
  const showNoteDialog = ref(false)
  const showVocabularyDetail = ref(false)
  const showGrammarManager = ref(false)
  const showCompletionModal = ref(false)

  // Computed properties to determine what should be hidden
  const shouldHideBackToTop = computed(() => {
    return showVocabularyForm.value || showTopicManager.value || showNoteDialog.value || showGrammarManager.value || showVocabularyDetail.value || showCompletionModal.value
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

  const setCompletionModal = (show: boolean) => {
    showCompletionModal.value = show
    // Control body scroll when completion modal is open
    if (show) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }

  return {
    // States
    showVocabularyForm,
    showTopicManager,
    showNoteDialog,
    showVocabularyDetail,
    showGrammarManager,
    showCompletionModal,
    
    // Computed
    shouldHideBackToTop,
    shouldHideAddNewWord,
    
    // Actions
    setVocabularyForm,
    setTopicManager,
    setNoteDialog,
    setVocabularyDetail,
    setGrammarManager,
    setCompletionModal
  }
})
