import { watch, onMounted, onUnmounted, type Ref } from 'vue'

export interface TopicModalEmits {
  (e: 'update:modelValue', value: boolean): void
}

export function useTopicModal(
  modelValue: Ref<boolean>,
  emit: TopicModalEmits,
  resetForm: () => void,
  resetSearch: () => void,
  resetPagination: () => void,
  loadCustomTopics: () => void
) {
  // Close dialog
  const closeDialog = () => {
    emit('update:modelValue', false)
  }

  // Lock body scroll
  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  // Unlock body scroll
  const unlockBodyScroll = () => {
    document.body.style.overflow = ''
  }

  // Watch for dialog open/close
  watch(() => modelValue.value, (newValue) => {
    if (newValue) {
      lockBodyScroll()
      loadCustomTopics()
    } else {
      // Always restore body scroll when closing
      unlockBodyScroll()
      // Reset form when closing
      resetForm()
      // Reset search and pagination
      resetSearch()
      resetPagination()
    }
  }, { immediate: true })

  // Lifecycle hooks
  onMounted(() => {
    if (modelValue.value) {
      loadCustomTopics()
      // Only disable body scroll if dialog is actually open
      lockBodyScroll()
    }
  })

  onUnmounted(() => {
    // Always restore body scroll on unmount
    unlockBodyScroll()
  })

  return {
    // Methods
    closeDialog,
    lockBodyScroll,
    unlockBodyScroll
  }
}
