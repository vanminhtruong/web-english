<template>
  <div 
    v-if="modelValue" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 sm:p-6 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-0 sm:space-x-6">
        <div class="flex-1 min-w-0">
          <h2 class="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-2">
            {{ t('vocabulary.topicManager.title') }}
          </h2>
          <p class="text-sm sm:text-base md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed pr-0 sm:pr-4">
            The system has {{ builtInTopics.length }} built-in topics like Technology, Business, Travel... You can add custom topics here.
          </p>
        </div>
        <button
          @click="closeDialog"
          class="self-end sm:self-start flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 sm:p-6 md:p-6 lg:p-8 max-h-[calc(90vh-140px)] overflow-y-auto">
        <!-- Add New Topic Form -->
        <div class="mb-4 sm:mb-6 md:mb-5 lg:mb-6 p-3 sm:p-4 md:p-4 lg:p-5 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg">
          <h3 class="text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4">
            {{ editingTopic ? t('vocabulary.topicManager.editTopic') : t('vocabulary.topicManager.addNewTopic') }}
          </h3>
          
          <div class="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
            <div>
              <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('vocabulary.topicManager.topicKey') }}
              </label>
              <input
                v-model="newTopic.key"
                :disabled="editingTopic !== null"
                type="text"
                :placeholder="t('vocabulary.topicManager.topicKeyPlaceholder')"
                class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              />
              <p class="mt-1 text-xs md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                {{ t('vocabulary.topicManager.keyDescription') }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-3 lg:gap-4">
              <div>
                <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.topicManager.vietnameseName') }}
                </label>
                <input
                  v-model="newTopic.vi"
                  type="text"
                  :placeholder="t('vocabulary.topicManager.vietnameseNamePlaceholder')"
                  class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.topicManager.englishName') }}
                </label>
                <input
                  v-model="newTopic.en"
                  type="text"
                  :placeholder="t('vocabulary.topicManager.englishNamePlaceholder')"
                  class="w-full px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm md:text-sm lg:text-base
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div class="flex gap-2 sm:gap-3 md:gap-2 lg:gap-3">
              <button
                @click="saveTopic"
                :disabled="!canSaveTopic"
                class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                       text-white text-sm md:text-sm lg:text-base rounded-md transition-colors disabled:cursor-not-allowed"
              >
                {{ editingTopic ? t('common.update') : t('common.add') }}
              </button>
              
              <button
                v-if="editingTopic"
                @click="cancelEdit"
                class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm md:text-sm lg:text-base rounded-md transition-colors"
              >
                {{ t('common.cancel') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Topics List -->
        <div>
          <h3 class="text-base sm:text-lg md:text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-3 lg:mb-4">
            {{ t('vocabulary.topicManager.existingTopics') }}
          </h3>

          <div v-if="customTopics.length === 0" class="text-center py-6 sm:py-8 md:py-6 lg:py-8 text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
            {{ t('vocabulary.topicManager.noCustomTopics') }}
          </div>

          <div v-else class="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3">
            <div
              v-for="topic in customTopics"
              :key="topic.key"
              class="flex items-center justify-between p-3 sm:p-4 md:p-3 lg:p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-xs font-medium rounded">
                    {{ topic.key }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    ({{ getTopicUsageCount(topic.key) }} {{ t('vocabulary.words') }})
                  </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span class="font-medium">VI:</span> {{ topic.vi }}
                  </div>
                  <div>
                    <span class="font-medium">EN:</span> {{ topic.en }}
                  </div>
                </div>
              </div>

              <div class="flex gap-2 ml-4">
                <button
                  @click="editTopic(topic)"
                  class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 
                         hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md transition-colors"
                  :title="t('common.edit')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                <button
                  @click="confirmDeleteTopic(topic)"
                  :disabled="getTopicUsageCount(topic.key) > 0"
                  class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 
                         hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors
                         disabled:text-gray-400 disabled:cursor-not-allowed"
                  :title="getTopicUsageCount(topic.key) > 0 ? t('vocabulary.topicManager.cannotDeleteInUse') : t('common.delete')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Built-in Topics List -->
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ t('vocabulary.topicManager.builtInTopics') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('vocabulary.topicManager.builtInTopicsDescription') }}
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="topic in builtInTopics"
              :key="topic.key"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                               text-xs font-medium rounded">
                    {{ topic.key }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    ({{ getTopicUsageCount(topic.key) }} {{ t('vocabulary.words') }})
                  </span>
                </div>
                <div class="grid grid-cols-1 gap-1 text-sm">
                  <div>
                    <span class="font-medium">VI:</span> {{ topic.vi }}
                  </div>
                  <div>
                    <span class="font-medium">EN:</span> {{ topic.en }}
                  </div>
                </div>
              </div>
              
              <div class="ml-4">
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 
                             text-xs font-medium rounded">
                  {{ t('vocabulary.topicManager.builtIn') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="closeDialog"
          class="px-4 py-2 translate-y-[-10px] bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          {{ t('common.finish') }}
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="topicToDelete" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60"
    >
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ t('vocabulary.topicManager.confirmDeleteTitle') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ t('vocabulary.topicManager.confirmDeleteMessage', { topic: topicToDelete.vi }) }}
          </p>
          <div class="flex gap-3 justify-end">
            <button
              @click="topicToDelete = null"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              {{ t('common.cancel') }}
            </button>
            <button
              @click="deleteTopic"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              {{ t('common.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Topic {
  key: string
  vi: string
  en: string
}

interface Props {
  modelValue: boolean
  vocabularyUsage?: Record<string, number>
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'topic-added', topic: Topic): void
  (e: 'topic-updated', oldKey: string, topic: Topic): void
  (e: 'topic-deleted', key: string): void
}

const props = withDefaults(defineProps<Props>(), {
  vocabularyUsage: () => ({})
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

// State
const customTopics = ref<Topic[]>([])
const editingTopic = ref<Topic | null>(null)
const topicToDelete = ref<Topic | null>(null)

const newTopic = ref<Topic>({
  key: '',
  vi: '',
  en: ''
})

// Computed
const canSaveTopic = computed(() => {
  return newTopic.value.key.trim() && 
         newTopic.value.vi.trim() && 
         newTopic.value.en.trim()
})

const builtInTopics = computed(() => {
  return [
    { key: 'technology', vi: 'Công nghệ', en: 'Technology' },
    { key: 'business', vi: 'Kinh doanh', en: 'Business' },
    { key: 'travel', vi: 'Du lịch', en: 'Travel' },
    { key: 'food', vi: 'Ẩm thực', en: 'Food' },
    { key: 'health', vi: 'Sức khỏe', en: 'Health' },
    { key: 'education', vi: 'Giáo dục', en: 'Education' },
    { key: 'sports', vi: 'Thể thao', en: 'Sports' },
    { key: 'entertainment', vi: 'Giải trí', en: 'Entertainment' },
    { key: 'science', vi: 'Khoa học', en: 'Science' },
    { key: 'art', vi: 'Nghệ thuật', en: 'Art' },
    { key: 'music', vi: 'Âm nhạc', en: 'Music' },
    { key: 'literature', vi: 'Văn học', en: 'Literature' },
    { key: 'politics', vi: 'Chính trị', en: 'Politics' },
    { key: 'environment', vi: 'Môi trường', en: 'Environment' },
    { key: 'fashion', vi: 'Thời trang', en: 'Fashion' },
    { key: 'finance', vi: 'Tài chính', en: 'Finance' }
  ]
})

// Methods
const loadCustomTopics = () => {
  try {
    const saved = localStorage.getItem('customTopics')
    if (saved) {
      customTopics.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading custom topics:', error)
  }
}

const saveCustomTopics = () => {
  try {
    localStorage.setItem('customTopics', JSON.stringify(customTopics.value))
  } catch (error) {
    console.error('Error saving custom topics:', error)
  }
}

const saveTopic = () => {
  if (!canSaveTopic.value) return

  const topic: Topic = {
    key: newTopic.value.key.toLowerCase().replace(/\s+/g, '_'),
    vi: newTopic.value.vi.trim(),
    en: newTopic.value.en.trim()
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
    // Add new topic
    if (customTopics.value.find(t => t.key === topic.key)) {
      alert(t('vocabulary.topicManager.duplicateKey'))
      return
    }
    
    customTopics.value.push(topic)
    saveCustomTopics()
    emit('topic-added', topic)
    notifyTopicsUpdated() // Notify about topic addition
  }

  // Reset form
  newTopic.value = { key: '', vi: '', en: '' }
}

const editTopic = (topic: Topic) => {
  editingTopic.value = { ...topic }
  newTopic.value = { ...topic }
}

const cancelEdit = () => {
  editingTopic.value = null
  newTopic.value = { key: '', vi: '', en: '' }
}

const confirmDeleteTopic = (topic: Topic) => {
  topicToDelete.value = topic
}

const deleteTopic = () => {
  if (!topicToDelete.value) return

  const index = customTopics.value.findIndex(t => t.key === topicToDelete.value!.key)
  if (index !== -1) {
    const key = customTopics.value[index].key
    customTopics.value.splice(index, 1)
    saveCustomTopics()
    emit('topic-deleted', key)
    notifyTopicsUpdated() // Notify about topic deletion
  }

  topicToDelete.value = null
}

// Helper to notify about topic changes
const notifyTopicsUpdated = () => {
  // Dispatch a custom event to notify all components about topic changes
  window.dispatchEvent(new CustomEvent('topics-updated'))
  console.log('Topics updated, dispatching topics-updated event')
}

const getTopicUsageCount = (key: string): number => {
  return props.vocabularyUsage[key] || 0
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

// Lifecycle
onMounted(() => {
  if (props.modelValue) {
    loadCustomTopics()
    // Only disable body scroll if dialog is actually open
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  // Always restore body scroll on unmount
  document.body.style.overflow = ''
})

// Watch for dialog open/close
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    loadCustomTopics()
  } else {
    // Always restore body scroll when closing
    document.body.style.overflow = ''
    // Reset form when closing
    editingTopic.value = null
    newTopic.value = { key: '', vi: '', en: '' }
    topicToDelete.value = null
  }
}, { immediate: true })
</script>
