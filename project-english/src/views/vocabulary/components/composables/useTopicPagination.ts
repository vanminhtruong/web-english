import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import type { Topic } from './useTopicCRUD'

export function useTopicPagination(
  filteredCustomTopics: ComputedRef<Topic[]>,
  filteredBuiltInTopics: ComputedRef<Topic[]>,
  searchQuery: Ref<string>
) {
  // Constants
  const ITEMS_PER_PAGE = 3

  // State
  const currentCustomPage = ref(1)
  const currentBuiltInPage = ref(1)

  // Computed - pagination for custom topics
  const totalCustomPages = computed(() => {
    return Math.ceil(filteredCustomTopics.value.length / ITEMS_PER_PAGE)
  })

  const paginatedCustomTopics = computed(() => {
    const start = (currentCustomPage.value - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredCustomTopics.value.slice(start, end)
  })

  // Computed - pagination for built-in topics
  const totalBuiltInPages = computed(() => {
    return Math.ceil(filteredBuiltInTopics.value.length / ITEMS_PER_PAGE)
  })

  const paginatedBuiltInTopics = computed(() => {
    const start = (currentBuiltInPage.value - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredBuiltInTopics.value.slice(start, end)
  })

  // Windowed pagination - show max 3 page numbers for custom topics
  const visibleCustomPages = computed(() => {
    const total = totalCustomPages.value
    const current = currentCustomPage.value
    const maxVisible = 3
    
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
    
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(total, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  // Windowed pagination - show max 3 page numbers for built-in topics
  const visibleBuiltInPages = computed(() => {
    const total = totalBuiltInPages.value
    const current = currentBuiltInPage.value
    const maxVisible = 3
    
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
    
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(total, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  // Methods
  const goToCustomPage = (page: number) => {
    if (page >= 1 && page <= totalCustomPages.value) {
      currentCustomPage.value = page
    }
  }

  const goToBuiltInPage = (page: number) => {
    if (page >= 1 && page <= totalBuiltInPages.value) {
      currentBuiltInPage.value = page
    }
  }

  const nextCustomPage = () => {
    if (currentCustomPage.value < totalCustomPages.value) {
      currentCustomPage.value++
    }
  }

  const prevCustomPage = () => {
    if (currentCustomPage.value > 1) {
      currentCustomPage.value--
    }
  }

  const nextBuiltInPage = () => {
    if (currentBuiltInPage.value < totalBuiltInPages.value) {
      currentBuiltInPage.value++
    }
  }

  const prevBuiltInPage = () => {
    if (currentBuiltInPage.value > 1) {
      currentBuiltInPage.value--
    }
  }

  // Reset pagination
  const resetPagination = () => {
    currentCustomPage.value = 1
    currentBuiltInPage.value = 1
  }

  // Watch for search query changes - reset pagination
  watch(searchQuery, () => {
    resetPagination()
  })

  return {
    // Constants
    ITEMS_PER_PAGE,
    
    // State
    currentCustomPage,
    currentBuiltInPage,
    
    // Computed
    totalCustomPages,
    totalBuiltInPages,
    paginatedCustomTopics,
    paginatedBuiltInTopics,
    visibleCustomPages,
    visibleBuiltInPages,
    
    // Methods
    goToCustomPage,
    goToBuiltInPage,
    nextCustomPage,
    prevCustomPage,
    nextBuiltInPage,
    prevBuiltInPage,
    resetPagination
  }
}
