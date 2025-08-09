<template>
  <div 
    class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    @mouseleave="handleVocabularyListMouseLeave"
    @mouseenter="handleVocabularyListMouseEnter"
  >
    <div class="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
        {{ t('vocabulary.vocabularyList', 'Vocabulary List') }} ({{ totalCount }})
      </h3>
    </div>

    <!-- Grouped vocabulary display with accordion -->
    <div v-if="useGrouping && groupedWords.length > 0">
      <DateGroupAccordion
        v-for="group in paginatedDateGroups" 
        :key="group.date"
        :group="group"
        :default-expanded="false"
        :accordion-state="accordionState"
        :hover-to-expand-enabled="hoverToExpandEnabled"
        :global-move-mode="globalMoveMode"
        @play-audio="$emit('play-audio', $event)"
        @edit-word="$emit('edit-word', $event)"
        @delete-word="$emit('delete-word', $event)"
        @toggle-favorite="$emit('toggle-favorite', $event)"
        @view-details="$emit('view-details', $event)"
        @date-group-previous="$emit('date-group-previous', $event)"
        @date-group-next="$emit('date-group-next', $event)"
        @accordion-toggle="handleAccordionToggle"
        @note-saved="handleNoteSaved"
        @open-note-dialog="$emit('open-note-dialog', $event.date, $event.words)"
        @open-add-vocabulary-dialog="$emit('open-add-vocabulary-dialog', $event)"
        @open-grammar-manager="$emit('open-grammar-manager', $event)"
        @move-vocabulary="handleMoveVocabulary"
        @request-available-dates="handleRequestAvailableDates"
        @batch-move-category="$emit('batch-move-category', $event)"
      />
      
      <!-- Date Group Pagination -->
      <div v-if="dateGroupPaginationInfo.totalPages > 1" class="bg-white dark:bg-[#0a0a0a] px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <!-- Mobile pagination -->
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="previousDateGroupPage" 
              :disabled="!dateGroupPaginationInfo.hasPrevious" 
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t('common.previous', 'Previous') }}
            </button>
            <button 
              @click="nextDateGroupPage" 
              :disabled="!dateGroupPaginationInfo.hasNext" 
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ t('common.next', 'Next') }}
            </button>
          </div>
          
          <!-- Desktop pagination -->
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{ t('vocabulary.showingDateGroups', { 
                  start: dateGroupPaginationInfo.startIndex, 
                  end: dateGroupPaginationInfo.endIndex, 
                  total: dateGroupPaginationInfo.totalGroups 
                }, `Showing ${dateGroupPaginationInfo.startIndex} to ${dateGroupPaginationInfo.endIndex} of ${dateGroupPaginationInfo.totalGroups} date groups`) }}
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <!-- Previous button -->
                <button 
                  @click="previousDateGroupPage" 
                  :disabled="!dateGroupPaginationInfo.hasPrevious" 
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">{{ t('common.previous', 'Previous') }}</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
                
                <!-- Page numbers -->
                <button
                  v-for="page in visibleDateGroupPages"
                  :key="page"
                  @click="page > 0 ? goToDateGroupPage(page) : null"
                  :disabled="page === -1"
                  :class="[
                    page === dateGroupPaginationInfo.currentPage
                      ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300'
                      : page === -1
                      ? 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-default'
                      : 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page === -1 ? '...' : page }}
                </button>
                
                <!-- Next button -->
                <button 
                  @click="nextDateGroupPage" 
                  :disabled="!dateGroupPaginationInfo.hasNext" 
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">{{ t('common.next', 'Next') }}</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Regular list display (when grouping is disabled) -->
    <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
      <VocabularyCard
        v-for="word in paginatedWords"
        :key="word.id"
        :word="word"
        @play-audio="$emit('play-audio', $event)"
        @edit-word="$emit('edit-word', $event)"
        @delete-word="$emit('delete-word', $event)"
        @toggle-favorite="$emit('toggle-favorite', $event)"
        @view-details="$emit('view-details', $event)"
      />
    </div>
    
    <!-- Pagination (hidden when grouping is enabled) -->
    <div v-if="!useGrouping" class="bg-white dark:bg-[#0a0a0a] px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="$emit('previous-page')" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ t('common.previous', 'Previous') }}
          </button>
          <button @click="$emit('next-page')" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ t('common.next', 'Next') }}
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ t('vocabulary.showingResults', { start: startIndex, end: endIndex, total: totalCount }, `Showing ${startIndex} to ${endIndex} of ${totalCount} results`) }}
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button @click="$emit('previous-page')" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">{{ t('common.previous', 'Previous') }}</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button 
                v-for="page in visiblePages" 
                :key="page" 
                @click="$emit('go-to-page', page)" 
                :class="page === currentPage 
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300' 
                  : 'bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'" 
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                {{ page }}
              </button>
              <button @click="$emit('next-page')" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="sr-only">{{ t('common.next', 'Next') }}</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../../utils/import-helper'
import { groupVocabulariesByDateAndTopic, type GroupedVocabulary } from '../../../utils/dateUtils'
import { useToast } from 'vue-toastification'

const { t, locale } = useI18n()
const toast = useToast()

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyCard = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyCard.vue'))
)

const DateGroupAccordion = defineAsyncComponent(
  loadComponentSafely(() => import('./DateGroupAccordion.vue'))
)

// Accordion state management with localStorage persistence
const accordionState = ref<Record<string, boolean>>({})

// Local storage key for accordion state
const ACCORDION_STATE_STORAGE_KEY = 'vocabulary-accordion-state'

// Load accordion state from localStorage
const getStoredAccordionState = (): Record<string, boolean> => {
  try {
    const stored = localStorage.getItem(ACCORDION_STATE_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('Failed to load accordion state from localStorage:', error)
    return {}
  }
}

// Save accordion state to localStorage
const setStoredAccordionState = (state: Record<string, boolean>) => {
  try {
    localStorage.setItem(ACCORDION_STATE_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save accordion state to localStorage:', error)
  }
}

// Initialize accordion state from localStorage
onMounted(() => {
  accordionState.value = getStoredAccordionState()
})

// Get group topics for save functionality
const getGroupTopicsForSave = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem('vocabulary-group-topics')
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('Failed to load group topics for save:', error)
    return {}
  }
}

// Restore group topics from loaded data
const restoreGroupTopics = (topics: Record<string, string>) => {
  try {
    localStorage.setItem('vocabulary-group-topics', JSON.stringify(topics))
  } catch (error) {
    console.warn('Failed to restore group topics:', error)
  }
}

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
  createdAt?: string
  updatedAt?: string
}

interface Props {
  paginatedWords: Word[]
  currentPage: number
  totalPages: number
  totalCount: number
  startIndex: number
  endIndex: number
  visiblePages: number[]
  useGrouping?: boolean
  allWords?: Word[] // Used for grouping when pagination is disabled
  dateGroupPages?: Record<string, number>
  itemsPerPageGrouped?: number
  hoverToExpandEnabled?: boolean
  globalMoveMode?: boolean
  recentlyAddedCategory?: string | null // Category to show at the top
}

const props = defineProps<Props>()

// Date group pagination state
const dateGroupCurrentPage = ref(1)
const dateGroupsPerPage = 7

// Computed for grouped words with pagination
const groupedWords = computed((): GroupedVocabulary[] => {
  if (!props.useGrouping) return []

  // Use allWords for grouping if provided, otherwise use paginatedWords
  const wordsToGroup = props.allWords || props.paginatedWords
  let allGroups = groupVocabulariesByDateAndTopic(wordsToGroup, locale.value, t)

  // Sort topics to put recently added category at the top
  if (props.recentlyAddedCategory) {
    allGroups = allGroups.map(group => {
      if (!group.topics) return group
      
      // Find the recently added category in topics
      const recentCategoryIndex = group.topics.findIndex(
        topic => topic.topic === props.recentlyAddedCategory
      )
      
      // If found, move it to the beginning
      if (recentCategoryIndex > -1) {
        const sortedTopics = [...group.topics]
        const [recentCategory] = sortedTopics.splice(recentCategoryIndex, 1)
        sortedTopics.unshift(recentCategory)
        
        return {
          ...group,
          topics: sortedTopics
        }
      }
      
      return group
    })
  }

  // Phân trang theo số lượng topic group (categories) cho mỗi group date
  if (props.dateGroupPages && props.itemsPerPageGrouped) {
    return allGroups.map(group => {
      const currentPage = props.dateGroupPages![group.date] || 1
      const itemsPerPage = props.itemsPerPageGrouped!
      const totalTopics = group.topics ? group.topics.length : 0
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return {
        ...group,
        topics: group.topics ? group.topics.slice(startIndex, endIndex) : [],
        currentPage,
        totalPages: Math.ceil(totalTopics / itemsPerPage),
        topicsTotal: totalTopics,
        totalItems: group.vocabularies.length, // giữ lại số lượng từ vựng gốc
      }
    })
  }

  return allGroups
})

// Computed for paginated date groups (7 groups per page)
const paginatedDateGroups = computed(() => {
  if (!props.useGrouping) return []
  
  const allGroups = groupedWords.value
  const startIndex = (dateGroupCurrentPage.value - 1) * dateGroupsPerPage
  const endIndex = startIndex + dateGroupsPerPage
  
  return allGroups.slice(startIndex, endIndex)
})

// Computed for date group pagination info
const dateGroupPaginationInfo = computed(() => {
  const totalGroups = groupedWords.value.length
  const totalPages = Math.ceil(totalGroups / dateGroupsPerPage)
  const startIndex = (dateGroupCurrentPage.value - 1) * dateGroupsPerPage + 1
  const endIndex = Math.min(startIndex + dateGroupsPerPage - 1, totalGroups)
  
  return {
    totalGroups,
    totalPages,
    currentPage: dateGroupCurrentPage.value,
    startIndex,
    endIndex,
    hasNext: dateGroupCurrentPage.value < totalPages,
    hasPrevious: dateGroupCurrentPage.value > 1
  }
})

// Date group pagination functions
const goToDateGroupPage = (page: number) => {
  if (page >= 1 && page <= dateGroupPaginationInfo.value.totalPages) {
    dateGroupCurrentPage.value = page
  }
}

const nextDateGroupPage = () => {
  if (dateGroupPaginationInfo.value.hasNext) {
    dateGroupCurrentPage.value++
  }
}

const previousDateGroupPage = () => {
  if (dateGroupPaginationInfo.value.hasPrevious) {
    dateGroupCurrentPage.value--
  }
}

// Generate visible page numbers for date group pagination
const visibleDateGroupPages = computed(() => {
  const totalPages = dateGroupPaginationInfo.value.totalPages
  const currentPage = dateGroupCurrentPage.value
  const pages: number[] = []
  
  if (totalPages <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show smart pagination
    if (currentPage <= 4) {
      // Show first 5 pages + ... + last page
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      if (totalPages > 6) {
        pages.push(-1) // ellipsis
        pages.push(totalPages)
      }
    } else if (currentPage >= totalPages - 3) {
      // Show first page + ... + last 5 pages
      pages.push(1)
      if (totalPages > 6) {
        pages.push(-1) // ellipsis
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first + ... + current-1, current, current+1 + ... + last
      pages.push(1)
      pages.push(-1) // ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push(-1) // ellipsis
      pages.push(totalPages)
    }
  }
  
  return pages
})

// Handle accordion toggle with localStorage persistence
const handleAccordionToggle = (date: string, expanded: boolean) => {
  accordionState.value[date] = expanded
  // Save updated state to localStorage
  setStoredAccordionState(accordionState.value)
  console.log(`Accordion for ${date} toggled to:`, expanded)
}

// Handle note saved event
const handleNoteSaved = (date: string, note: string, markedWords: string[]) => {
  toast.success(t('vocabulary.notes.saveSuccess', 'Notes saved successfully'), {
    timeout: 2000,
  });
  
  // Check if auto-save is enabled
  const autoSaveEnabled = localStorage.getItem('vocabulary-auto-save-enabled');
  if (autoSaveEnabled === 'true') {
    toast.info(t('vocabulary.notes.autoSaveNotice', 'Notes will be included in auto-save'), {
      timeout: 3000,
    });
  }
  
  // You can emit an event to the parent component if needed
  console.log(`Note saved for ${date} with ${markedWords.length} marked words`);
};

// Handle mouse leave from entire vocabulary list
const handleVocabularyListMouseLeave = () => {
  if (props.hoverToExpandEnabled) {
    // Emit event to close all expanded topics when mouse leaves vocabulary area
    window.dispatchEvent(new CustomEvent('vocabulary-list-mouse-leave'))
  }
}

// Handle mouse enter to vocabulary list
const handleVocabularyListMouseEnter = () => {
  if (props.hoverToExpandEnabled) {
    // Emit event when mouse enters vocabulary area
    window.dispatchEvent(new CustomEvent('vocabulary-list-mouse-enter'))
  }
}

const emit = defineEmits<{
  'play-audio': [word: string]
  'edit-word': [word: Word]
  'delete-word': [word: Word]
  'toggle-favorite': [word: Word]
  'view-details': [word: Word]
  'previous-page': []
  'next-page': []
  'go-to-page': [page: number]
  'date-group-previous': [date: string]
  'date-group-next': [date: string]
  'date-group-go-to-page': [date: string, page: number]
  'accordion-toggle': [date: string, expanded: boolean]
  'open-note-dialog': [date: string, words: any[]]
  'open-add-vocabulary-dialog': [date: string]
  'open-grammar-manager': [date: string]
  'move-vocabulary': [data: { word: any, targetDate: string, sourceDate?: string }]
  'batch-move-category': [data: { topic: string, words: any[], sourceDate: string }]
}>()

// Handle move vocabulary request
const handleMoveVocabulary = (data: { word: any, targetDate: string }) => {
  // Find the source date group for this word
  const sourceDate = groupedWords.value.find(group => 
    group.vocabularies.some(word => word.id === data.word.id)
  )?.date
  
  // Pass through to parent with source date info
  emit('move-vocabulary', {
    ...data,
    sourceDate
  })
}

// Handle request for available dates with same topic
const handleRequestAvailableDates = (data: { topic: string, currentDate: string }) => {
  // Find all date groups that have the same topic and are not the current date
  const availableDates = groupedWords.value
    .filter(group => {
      // Check if this group has words with the same topic
      const hasSameTopic = group.vocabularies.some(word => word.category === data.topic)
      return hasSameTopic && group.date !== data.currentDate
    })
    .map(group => ({
      date: group.date,
      count: group.vocabularies.filter(word => word.category === data.topic).length
    }))
    .filter(item => item.count > 0) // Only include dates that actually have words with this topic
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
  
  // Send available dates back to the DateGroupAccordion component
  // We'll use a custom event since Vue doesn't support direct child-to-parent communication in this case
  nextTick(() => {
    const event = new CustomEvent('available-dates-response', {
      detail: {
        topic: data.topic,
        currentDate: data.currentDate,
        availableDates
      }
    })
    window.dispatchEvent(event)
  })
}
</script>
