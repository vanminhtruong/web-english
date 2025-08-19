import { ref, computed, watch, onMounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore } from '../../../../composables/useVocabularyStore'
import { useAudioSystem } from '../../../practice/composables/bubble-shooter/useAudioSystem'
import { useTopicName } from '../../../../utils/topicUtils'

const ExampleFormDialog = defineAsyncComponent(() => import('../ExampleFormDialog.vue'))

export interface Example {
  id: string
  vocabularyId: string
  vocabulary?: { id: string; word: string }
  title: string
  content: string
  translation?: string
  context?: string
  type: 'sentence' | 'dialogue' | 'phrase' | 'context'
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Vocabulary {
  id: string
  word: string
  meaning: string
  partOfSpeech: string
  category: string
  level: string
}

export interface Props {
  vocabularyList: Vocabulary[]
  examples: Example[]
}

export function useTopicGroupAccordion(props: Props) {
  const { t } = useI18n()
  const vocabularyStore = useVocabularyStore()
  const audioSystem = useAudioSystem()
  const { getTopicName } = useTopicName()

  // State
  const expandedGroups = ref<Record<string, boolean>>({})
  const expandedVocabExamples = ref<Record<string, boolean>>({})
  const examplePages = ref<Record<string, number>>({})
  const examplesPerPage = ref(3)
  const currentPage = ref(1)
  const topicsPerPage = ref(3)
  const topicVocabPages = ref<Record<string, number>>({})
  const topicVocabPerPage = ref(3)

  // Audio functions
  const playVocabularyAudio = (word: string) => audioSystem.playVocabularySound(word, 'en')
  const playExampleAudio = (text: string) => audioSystem.playVocabularySound(text, 'en')

  // Local storage functions
  const loadExpandedState = () => {
    try {
      const saved = localStorage.getItem('vocabulary-examples-expanded-topics')
      if (saved) expandedGroups.value = { ...JSON.parse(saved) }
    } catch (error) {
      console.error('Error loading expanded state:', error)
    }
  }

  const saveExpandedState = () => {
    try {
      localStorage.setItem('vocabulary-examples-expanded-topics', JSON.stringify(expandedGroups.value))
    } catch (error) {
      console.error('Error saving expanded state:', error)
    }
  }

  const loadExpandedVocabExamplesState = () => {
    try {
      const saved = localStorage.getItem('vocabulary-examples-expanded-vocab-grouped')
      if (saved) expandedVocabExamples.value = { ...JSON.parse(saved) }
    } catch (error) {
      console.error('Error loading expanded vocabulary examples state:', error)
    }
  }

  const saveExpandedVocabExamplesState = () => {
    try {
      localStorage.setItem('vocabulary-examples-expanded-vocab-grouped', JSON.stringify(expandedVocabExamples.value))
    } catch (error) {
      console.error('Error saving expanded vocab examples state:', error)
    }
  }

  const loadExamplePagesState = () => {
    try {
      const saved = localStorage.getItem('vocabulary-examples-pages-grouped')
      if (saved) examplePages.value = { ...JSON.parse(saved) }
    } catch (error) {
      console.error('Error loading example pages state:', error)
    }
  }

  const saveExamplePagesState = () => {
    try {
      localStorage.setItem('vocabulary-examples-pages-grouped', JSON.stringify(examplePages.value))
    } catch (error) {
      console.error('Error saving example pages state:', error)
    }
  }

  const loadTopicVocabPagesState = () => {
    try {
      const saved = localStorage.getItem('vocabulary-topic-vocab-pages')
      if (saved) topicVocabPages.value = { ...JSON.parse(saved) }
    } catch (error) {
      console.error('Error loading topic vocab pages state:', error)
    }
  }

  const saveTopicVocabPagesState = () => {
    try {
      localStorage.setItem('vocabulary-topic-vocab-pages', JSON.stringify(topicVocabPages.value))
    } catch (error) {
      console.error('Error saving topic vocab pages state:', error)
    }
  }

  // Computed values
  const allGroupedVocabulary = computed(() => {
    const groups: Record<string, Vocabulary[]> = {}
    props.vocabularyList.forEach(vocab => {
      const topicKey = vocab.category || 'uncategorized'
      if (!groups[topicKey]) groups[topicKey] = []
      groups[topicKey].push(vocab)
    })
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.word.localeCompare(b.word))
    })
    return groups
  })

  const groupedVocabulary = computed(() => {
    const allGroups = allGroupedVocabulary.value
    // Ensure topics (categories) are displayed in a consistent alphabetical order
    // to match the behavior in `VocabularyListView.vue`
    const topicKeys = Object.keys(allGroups).sort((a, b) => a.localeCompare(b))
    const start = (currentPage.value - 1) * topicsPerPage.value
    const end = start + topicsPerPage.value
    const paginatedTopics = topicKeys.slice(start, end)
    const paginatedGroups: Record<string, Vocabulary[]> = {}
    paginatedTopics.forEach(topicKey => {
      paginatedGroups[topicKey] = allGroups[topicKey]
    })
    return paginatedGroups
  })

  const paginationInfo = computed(() => {
    const totalTopics = Object.keys(allGroupedVocabulary.value).length
    const totalPages = Math.ceil(totalTopics / topicsPerPage.value)
    const startIndex = (currentPage.value - 1) * topicsPerPage.value + 1
    const endIndex = Math.min(currentPage.value * topicsPerPage.value, totalTopics)
    return {
      totalTopics, totalPages, currentPage: currentPage.value, startIndex, endIndex,
      hasNext: currentPage.value < totalPages, hasPrevious: currentPage.value > 1
    }
  })

  const visiblePages = computed(() => {
    const pages: number[] = []
    const maxVisible = 5
    const totalP = paginationInfo.value.totalPages
    if (totalP <= maxVisible) {
      for (let i = 1; i <= totalP; i++) pages.push(i)
    } else {
      const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      const end = Math.min(totalP, start + maxVisible - 1)
      for (let i = start; i <= end; i++) pages.push(i)
    }
    return pages
  })

  // Data helpers
  const getVocabExamples = (vocabId: string) => props.examples.filter(e => e.vocabularyId === vocabId)
  const getPaginatedVocabExamples = (vocabId: string) => {
    const allExamples = getVocabExamples(vocabId)
    const totalPages = Math.max(1, Math.ceil(allExamples.length / examplesPerPage.value))
    const current = Math.min(examplePages.value[vocabId] || 1, totalPages)
    const start = (current - 1) * examplesPerPage.value
    return allExamples.slice(start, start + examplesPerPage.value)
  }

  const getPaginatedTopicVocabs = (topicKey: string) => {
    const group = allGroupedVocabulary.value[topicKey] || []
    const current = topicVocabPages.value[topicKey] || 1
    const start = (current - 1) * topicVocabPerPage.value
    return group.slice(start, start + topicVocabPerPage.value)
  }

  const getTopicVocabPagesCount = (topicKey: string) => {
    const total = (allGroupedVocabulary.value[topicKey] || []).length
    return Math.max(1, Math.ceil(total / topicVocabPerPage.value))
  }

  const getTopicVocabPaginationInfo = (topicKey: string) => {
    const totalVocab = (allGroupedVocabulary.value[topicKey] || []).length
    const totalPages = Math.max(1, Math.ceil(totalVocab / topicVocabPerPage.value))
    const current = Math.min(topicVocabPages.value[topicKey] || 1, totalPages)
    const start = totalVocab === 0 ? 0 : (current - 1) * topicVocabPerPage.value + 1
    const end = Math.min(current * topicVocabPerPage.value, totalVocab)
    return { totalVocab, totalPages, currentPage: current, start, end, hasNext: current < totalPages, hasPrevious: current > 1 }
  }

  const getVocabExamplePages = (vocabId: string) => Math.ceil(getVocabExamples(vocabId).length / examplesPerPage.value)

  const getExamplePaginationInfo = (vocabId: string) => {
    const totalExamples = getVocabExamples(vocabId).length
    const totalPages = getVocabExamplePages(vocabId)
    const safeTotalPages = Math.max(1, totalPages)
    const current = Math.min(examplePages.value[vocabId] || 1, safeTotalPages)
    const start = (current - 1) * examplesPerPage.value + 1
    const end = Math.min(current * examplesPerPage.value, totalExamples)
    return { totalExamples, totalPages, currentPage: current, start, end, hasNext: current < totalPages, hasPrevious: current > 1 }
  }

  const getVocabExampleCount = (vocabId: string) => props.examples.filter(e => e.vocabularyId === vocabId).length
  const getTotalExamplesForTopic = (group: Vocabulary[]) => group.reduce((total, vocab) => total + getVocabExampleCount(vocab.id), 0)

  const getTopicVisiblePages = (topicKey: string) => {
    const pages: number[] = []
    const maxVisible = 5
    const totalP = getTopicVocabPagesCount(topicKey)
    const current = (topicVocabPages.value[topicKey] || 1)
    if (totalP <= maxVisible) {
      for (let i = 1; i <= totalP; i++) pages.push(i)
    } else {
      const start = Math.max(1, current - Math.floor(maxVisible / 2))
      const end = Math.min(totalP, start + maxVisible - 1)
      for (let i = start; i <= end; i++) pages.push(i)
    }
    return pages
  }

  // Navigation functions
  const goToTopicVocabPage = (topicKey: string, page: number) => {
    const totalPages = getTopicVocabPagesCount(topicKey)
    if (page >= 1 && page <= totalPages) {
      topicVocabPages.value[topicKey] = page
      saveTopicVocabPagesState()
    }
  }

  const previousTopicVocabPage = (topicKey: string) => {
    const current = topicVocabPages.value[topicKey] || 1
    if (current > 1) goToTopicVocabPage(topicKey, current - 1)
  }

  const nextTopicVocabPage = (topicKey: string) => {
    const current = topicVocabPages.value[topicKey] || 1
    const totalPages = getTopicVocabPagesCount(topicKey)
    if (current < totalPages) goToTopicVocabPage(topicKey, current + 1)
  }

  const goToExamplePage = (vocabId: string, page: number) => {
    const totalPages = getVocabExamplePages(vocabId)
    if (page >= 1 && page <= totalPages) {
      examplePages.value[vocabId] = page
      saveExamplePagesState()
    }
  }

  const previousExamplePage = (vocabId: string) => {
    const current = examplePages.value[vocabId] || 1
    if (current > 1) goToExamplePage(vocabId, current - 1)
  }

  const nextExamplePage = (vocabId: string) => {
    const current = examplePages.value[vocabId] || 1
    const totalPages = getVocabExamplePages(vocabId)
    if (current < totalPages) goToExamplePage(vocabId, current + 1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationInfo.value.totalPages) currentPage.value = page
  }

  const previousPage = () => {
    if (paginationInfo.value.hasPrevious) currentPage.value--
  }

  const nextPage = () => {
    if (paginationInfo.value.hasNext) currentPage.value++
  }

  // Toggle functions
  const toggleGroup = (topicKey: string) => {
    expandedGroups.value[topicKey] = !expandedGroups.value[topicKey]
    saveExpandedState()
  }

  const toggleVocabExamples = (vocabId: string) => {
    expandedVocabExamples.value[vocabId] = !expandedVocabExamples.value[vocabId]
    saveExpandedVocabExamplesState()
  }

  // Styling helpers
  const getTypeLabel = (type: string) => {
    const labels = {
      'sentence': t('vocabulary.examples.types.sentence', 'Sentence'),
      'dialogue': t('vocabulary.examples.types.dialogue', 'Dialogue'),
      'phrase': t('vocabulary.examples.types.phrase', 'Phrase'),
      'context': t('vocabulary.examples.types.context', 'Context')
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTypeColorClass = (type: string) => {
    const classes = {
      'sentence': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'dialogue': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'phrase': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'context': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    }
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      'easy': t('common.easy', 'Easy'),
      'medium': t('vocabulary.examples.difficulty.medium', 'Medium'),
      'hard': t('common.difficult', 'Difficult')
    }
    return labels[difficulty as keyof typeof labels] || difficulty
  }

  const getDifficultyColorClass = (difficulty: string) => {
    const classes = {
      'easy': 'text-green-600 dark:text-green-400',
      'medium': 'text-yellow-600 dark:text-yellow-400',
      'hard': 'text-red-600 dark:text-red-400'
    }
    return classes[difficulty as keyof typeof classes] || 'text-gray-600 dark:text-gray-400'
  }

  // Animation functions
  const enter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = '0'
    element.style.overflow = 'hidden'
  }

  const afterEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.overflow = 'visible'
  }

  const leave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = element.scrollHeight + 'px'
    element.style.overflow = 'hidden'
    element.offsetHeight
    element.style.height = '0'
  }

  const afterLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.overflow = 'visible'
  }

  const vocabExamplesEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = '0'
    element.style.overflow = 'hidden'
  }

  const vocabExamplesAfterEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.overflow = 'visible'
  }

  const vocabExamplesLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = element.scrollHeight + 'px'
    element.style.overflow = 'hidden'
    element.offsetHeight
    element.style.height = '0'
  }

  const vocabExamplesAfterLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.overflow = 'visible'
  }

  // Action handlers
  const deleteExample = (example: any, emit: any) => {
    // Only emit the event. Parent handles confirmation and success toast.
    emit('delete-example', example)
  }

  // Initialization functions
  const initializeExpandedVocabExamplesState = () => {
    let examplesChanged = false, pagesChanged = false
    Object.values(groupedVocabulary.value).forEach(group => {
      group.forEach(vocab => {
        if (expandedVocabExamples.value[vocab.id] === undefined) {
          expandedVocabExamples.value[vocab.id] = true
          examplesChanged = true
        }
        if (examplePages.value[vocab.id] === undefined) {
          examplePages.value[vocab.id] = 1
          pagesChanged = true
        }
      })
    })
    if (examplesChanged) saveExpandedVocabExamplesState()
    if (pagesChanged) saveExamplePagesState()
  }

  const initializeTopicVocabPagesState = () => {
    let changed = false
    Object.keys(groupedVocabulary.value).forEach(topicKey => {
      if (topicVocabPages.value[topicKey] === undefined) {
        topicVocabPages.value[topicKey] = 1
        changed = true
      }
    })
    if (changed) saveTopicVocabPagesState()
  }

  const initializeExpandedState = () => {
    const topicKeys = Object.keys(groupedVocabulary.value)
    let changed = false
    topicKeys.forEach(key => {
      if (expandedGroups.value[key] === undefined) {
        expandedGroups.value[key] = true
        changed = true
      }
    })
    if (changed) saveExpandedState()
  }

  // Cleanup functions
  const cleanupOldTopicStates = () => {
    try {
      const currentTopicKeys = new Set(Object.keys(allGroupedVocabulary.value))
      const expandedKeys = Object.keys(expandedGroups.value)
      let expandedChanged = false
      expandedKeys.forEach(topicKey => {
        if (!currentTopicKeys.has(topicKey)) {
          delete expandedGroups.value[topicKey]
          expandedChanged = true
        }
      })
      
      const topicPageKeys = Object.keys(topicVocabPages.value)
      let topicPagesChanged = false
      topicPageKeys.forEach(topicKey => {
        if (!currentTopicKeys.has(topicKey)) {
          delete topicVocabPages.value[topicKey]
          topicPagesChanged = true
        }
      })

      Object.keys(allGroupedVocabulary.value).forEach(topicKey => {
        const totalPages = getTopicVocabPagesCount(topicKey)
        const current = topicVocabPages.value[topicKey] || 1
        if (current > totalPages) {
          topicVocabPages.value[topicKey] = totalPages
          topicPagesChanged = true
        }
      })

      if (expandedChanged) saveExpandedState()
      if (topicPagesChanged) saveTopicVocabPagesState()
    } catch (error) {
      console.error('Error cleaning up old topic states:', error)
    }
  }

  const cleanupOldVocabularyStates = () => {
    try {
      const currentVocabIds = new Set(props.vocabularyList.map(v => v.id))
      const expandedKeys = Object.keys(expandedVocabExamples.value)
      let expandedChanged = false
      expandedKeys.forEach(vocabId => {
        if (!currentVocabIds.has(vocabId)) {
          delete expandedVocabExamples.value[vocabId]
          expandedChanged = true
        }
      })
      
      const pagesKeys = Object.keys(examplePages.value)
      let pagesChanged = false
      pagesKeys.forEach(vocabId => {
        if (!currentVocabIds.has(vocabId)) {
          delete examplePages.value[vocabId]
          pagesChanged = true
        }
      })
      
      if (expandedChanged) saveExpandedVocabExamplesState()
      if (pagesChanged) saveExamplePagesState()
    } catch (error) {
      console.error('Error cleaning up old vocabulary states:', error)
    }
  }

  // Watchers
  watch(() => groupedVocabulary.value, () => {
    initializeExpandedState()
    initializeExpandedVocabExamplesState()
    initializeTopicVocabPagesState()
  })

  watch(() => allGroupedVocabulary.value, () => cleanupOldTopicStates(), { deep: true })
  watch(() => props.vocabularyList, () => cleanupOldVocabularyStates(), { deep: true })
  watch(() => expandedGroups.value, () => saveExpandedState(), { deep: true })
  watch(() => expandedVocabExamples.value, () => saveExpandedVocabExamplesState(), { deep: true })
  watch(() => examplePages.value, () => saveExamplePagesState(), { deep: true })
  watch(() => topicVocabPages.value, () => saveTopicVocabPagesState(), { deep: true })

  // Lifecycle
  onMounted(() => {
    loadExpandedState()
    loadExpandedVocabExamplesState()
    loadExamplePagesState()
    loadTopicVocabPagesState()
    initializeExpandedState()
    initializeExpandedVocabExamplesState()
    initializeTopicVocabPagesState()
    setTimeout(() => {
      cleanupOldTopicStates()
      cleanupOldVocabularyStates()
    }, 100)
  })

  return {
    // External dependencies
    ExampleFormDialog,
    getTopicName,
    t,
    
    // State
    expandedGroups,
    expandedVocabExamples,
    examplePages,
    examplesPerPage,
    currentPage,
    topicsPerPage,
    topicVocabPages,
    topicVocabPerPage,

    // Computed
    allGroupedVocabulary,
    groupedVocabulary,
    paginationInfo,
    visiblePages,

    // Audio
    playVocabularyAudio,
    playExampleAudio,

    // Data helpers
    getVocabExamples,
    getPaginatedVocabExamples,
    getPaginatedTopicVocabs,
    getTopicVocabPagesCount,
    getTopicVocabPaginationInfo,
    getVocabExamplePages,
    getExamplePaginationInfo,
    getVocabExampleCount,
    getTotalExamplesForTopic,
    getTopicVisiblePages,

    // Navigation
    goToTopicVocabPage,
    previousTopicVocabPage,
    nextTopicVocabPage,
    goToExamplePage,
    previousExamplePage,
    nextExamplePage,
    goToPage,
    previousPage,
    nextPage,

    // Toggle
    toggleGroup,
    toggleVocabExamples,

    // Styling
    getTypeLabel,
    getTypeColorClass,
    getDifficultyLabel,
    getDifficultyColorClass,

    // Animation
    enter,
    afterEnter,
    leave,
    afterLeave,
    vocabExamplesEnter,
    vocabExamplesAfterEnter,
    vocabExamplesLeave,
    vocabExamplesAfterLeave,

    // Actions
    deleteExample
  }
}
