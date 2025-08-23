import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { Topic } from './useTopicCRUD'

export function useTopicSearch(customTopics: Ref<Topic[]>, builtInTopics: ComputedRef<Topic[]>) {
  // State
  const searchQuery = ref('')

  // Computed - filtered topics based on search query
  const filteredCustomTopics = computed(() => {
    if (!searchQuery.value.trim()) {
      return customTopics.value
    }
    
    const query = searchQuery.value.toLowerCase().trim()
    return customTopics.value.filter(topic => 
      (topic.key || '').toLowerCase().includes(query) ||
      (topic.vi || '').toLowerCase().includes(query) ||
      (topic.en || '').toLowerCase().includes(query) ||
      (topic.ko || '').toLowerCase().includes(query)
    )
  })

  const filteredBuiltInTopics = computed(() => {
    if (!searchQuery.value.trim()) {
      return builtInTopics.value
    }
    
    const query = searchQuery.value.toLowerCase().trim()
    return builtInTopics.value.filter(topic => 
      (topic.key || '').toLowerCase().includes(query) ||
      (topic.vi || '').toLowerCase().includes(query) ||
      (topic.en || '').toLowerCase().includes(query) ||
      (topic.ko || '').toLowerCase().includes(query)
    )
  })

  // Reset search
  const resetSearch = () => {
    searchQuery.value = ''
  }

  return {
    // State
    searchQuery,
    
    // Computed
    filteredCustomTopics,
    filteredBuiltInTopics,
    
    // Methods
    resetSearch
  }
}
