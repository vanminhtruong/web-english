import { ref, computed } from 'vue'

export interface Topic {
  key: string
  vi: string
  en: string
  ko: string
}

export interface TopicCRUDEmits {
  (e: 'topic-added', topic: Topic): void
  (e: 'topic-updated', oldKey: string, topic: Topic): void
  (e: 'topic-deleted', key: string): void
}

export function useTopicCRUD(emit: TopicCRUDEmits) {
  // State
  const customTopics = ref<Topic[]>([])
  const editingTopic = ref<Topic | null>(null)
  const topicToDelete = ref<Topic | null>(null)
  
  const newTopic = ref<Topic>({
    key: '',
    vi: '',
    en: '',
    ko: ''
  })

  // Computed
  const canSaveTopic = computed(() => {
    return newTopic.value.vi?.trim() && 
           newTopic.value.en?.trim() &&
           newTopic.value.ko?.trim()
  })

  const showDeleteModal = computed(() => {
    console.log('showDeleteModal computed - topicToDelete:', topicToDelete.value)
    return !!topicToDelete.value
  })

  // Auto-generate topic key from Vietnamese or English name
  const generateTopicKey = (vi: string, en: string): string => {
    // Use Vietnamese name first, fall back to English if VI is empty
    const sourceName = vi.trim() || en.trim()
    
    if (!sourceName) return ''
    
    // Convert to lowercase, remove accents, replace spaces/special chars with underscores
    let key = sourceName.toLowerCase()
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .replace(/[^a-z0-9]/g, '_') // Replace non-alphanumeric with underscores
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    
    // Ensure uniqueness by checking against existing topics
    let counter = 1
    let originalKey = key
    
    while (isKeyTaken(key)) {
      key = `${originalKey}_${counter}`
      counter++
    }
    
    return key
  }

  // Check if a topic key is already taken
  const isKeyTaken = (key: string): boolean => {
    // Check against built-in topics
    const builtInKeys = [
      'technology', 'business', 'travel', 'food', 'health', 'education', 
      'sports', 'entertainment', 'science', 'art', 'music', 'literature', 
      'politics', 'environment', 'fashion', 'finance'
    ]
    if (builtInKeys.includes(key)) return true
    
    // Check against existing custom topics (excluding current editing topic)
    const existingKeys = customTopics.value
      .filter(topic => editingTopic.value ? topic.key !== editingTopic.value.key : true)
      .map(topic => topic.key)
    
    return existingKeys.includes(key)
  }

  // Load custom topics from localStorage
  const loadCustomTopics = () => {
    try {
      const saved = localStorage.getItem('customTopics')
      console.log('Loading custom topics from localStorage:', saved)
      
      if (saved) {
        const parsed = JSON.parse(saved)
        console.log('Parsed custom topics:', parsed)
        
        if (Array.isArray(parsed)) {
          customTopics.value = parsed
          console.log('Custom topics loaded successfully:', customTopics.value)
        } else {
          console.log('Invalid data format, resetting to empty array')
          customTopics.value = []
          localStorage.removeItem('customTopics')
        }
      } else {
        console.log('No custom topics found in localStorage')
        customTopics.value = []
      }
      
      console.log('Final custom topics loaded:', customTopics.value)
    } catch (error) {
      console.error('Error loading custom topics:', error)
      customTopics.value = []
      localStorage.removeItem('customTopics')
    }
  }

  // Save custom topics to localStorage
  const saveCustomTopics = () => {
    try {
      console.log('Saving custom topics to localStorage:', customTopics.value)
      localStorage.setItem('customTopics', JSON.stringify(customTopics.value))
      console.log('Custom topics saved successfully')
    } catch (error) {
      console.error('Error saving custom topics:', error)
    }
  }

  // Helper to notify about topic changes
  const notifyTopicsUpdated = () => {
    // Dispatch a custom event to notify all components about topic changes
    window.dispatchEvent(new CustomEvent('topics-updated'))
    console.log('Topics updated, dispatching topics-updated event')
  }

  // Save topic (add new or update existing)
  const saveTopic = () => {
    if (!canSaveTopic.value) return

    // Auto-generate key based on Vietnamese/English names
    const generatedKey = editingTopic.value 
      ? editingTopic.value.key // Keep existing key when editing
      : generateTopicKey(newTopic.value.vi, newTopic.value.en)

    const topic: Topic = {
      key: generatedKey,
      vi: newTopic.value.vi.trim(),
      en: newTopic.value.en.trim(),
      ko: newTopic.value.ko.trim()
    }

    if (editingTopic.value) {
      // Update existing topic
      const index = customTopics.value.findIndex(t => t.key === editingTopic.value!.key)
      if (index !== -1) {
        const oldKey = customTopics.value[index].key
        customTopics.value[index] = topic
        saveCustomTopics()
        emit('topic-updated', oldKey, topic)
        notifyTopicsUpdated() // Notify about topic update
      }
      editingTopic.value = null
    } else {
      // Add new topic - key is auto-generated and unique
      // Insert at beginning so newest topics appear first
      customTopics.value.unshift(topic)
      saveCustomTopics()
      emit('topic-added', topic)
      notifyTopicsUpdated() // Notify about topic addition
    }

    // Reset form
    newTopic.value = { key: '', vi: '', en: '', ko: '' }
  }

  // Edit topic
  const editTopic = (topic: Topic) => {
    editingTopic.value = { ...topic }
    newTopic.value = { ...topic }
  }

  // Cancel edit
  const cancelEdit = () => {
    editingTopic.value = null
    newTopic.value = { key: '', vi: '', en: '', ko: '' }
  }

  // Confirm delete topic
  const confirmDeleteTopic = (topic: Topic) => {
    console.log('Confirming delete for topic:', topic)
    topicToDelete.value = topic
    console.log('topicToDelete set to:', topicToDelete.value)
  }

  // Delete topic
  const deleteTopic = () => {
    if (!topicToDelete.value) {
      console.log('No topic to delete')
      return
    }

    console.log('Attempting to delete topic:', topicToDelete.value)
    console.log('Current custom topics:', customTopics.value)

    const index = customTopics.value.findIndex(t => t.key === topicToDelete.value!.key)
    console.log('Found index:', index)

    if (index !== -1) {
      const key = customTopics.value[index].key
      console.log('Deleting topic with key:', key)
      
      // Force reactive update by creating a new array
      const updatedTopics = [...customTopics.value]
      updatedTopics.splice(index, 1)
      customTopics.value = updatedTopics
      
      console.log('Topics after deletion:', customTopics.value)
      
      saveCustomTopics()
      emit('topic-deleted', key)
      notifyTopicsUpdated() // Notify about topic deletion
      
      console.log('Topic deleted successfully')
    } else {
      console.log('Topic not found in custom topics')
    }

    topicToDelete.value = null
  }

  // Force reload custom topics
  const reloadCustomTopics = () => {
    console.log('Force reloading custom topics')
    loadCustomTopics()
    // Force a reactive update
    customTopics.value = [...customTopics.value]
  }

  // Clear all custom topics (for testing)
  const clearAllCustomTopics = () => {
    console.log('Clearing all custom topics')
    customTopics.value = []
    localStorage.removeItem('customTopics')
    console.log('All custom topics cleared')
  }

  // Test delete modal
  const testDeleteModal = () => {
    console.log('Testing delete modal')
    topicToDelete.value = {
      key: 'test',
      vi: 'Test Topic',
      en: 'Test Topic',
      ko: '테스트 토픽'
    }
    console.log('Test topic set:', topicToDelete.value)
  }

  // Reset form state
  const resetForm = () => {
    editingTopic.value = null
    newTopic.value = { key: '', vi: '', en: '', ko: '' }
    topicToDelete.value = null
  }

  return {
    // State
    customTopics,
    editingTopic,
    topicToDelete,
    newTopic,
    
    // Computed
    canSaveTopic,
    showDeleteModal,
    
    // Methods
    loadCustomTopics,
    saveCustomTopics,
    saveTopic,
    editTopic,
    cancelEdit,
    confirmDeleteTopic,
    deleteTopic,
    reloadCustomTopics,
    clearAllCustomTopics,
    testDeleteModal,
    resetForm,
    generateTopicKey,
    isKeyTaken,
    notifyTopicsUpdated
  }
}
