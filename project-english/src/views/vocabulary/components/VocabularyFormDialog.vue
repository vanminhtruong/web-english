<template>
  <!-- Backdrop -->
  <div 
    v-if="modelValue" 
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <!-- Dialog Container -->
    <div class="w-full max-w-4xl max-h-[90vh] flex flex-col">
      <!-- Dialog Content -->
      <div 
        class="bg-white dark:bg-[#0a0a0a] shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ isEditing ? t('vocabulary.editVocabulary') : t('vocabulary.addVocabulary') }}
            </h2>
            <button 
              @click="closeDialog"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Word -->
              <div class="md:col-span-2">
                <label for="word" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.word') }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="word"
                  v-model="form.word"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.wordPlaceholder')"
                  @blur="validateWord"
                />
              </div>

              <!-- Pronunciation -->
              <div>
                <label for="pronunciation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.pronunciation') }}
                </label>
                <input
                  id="pronunciation"
                  v-model="form.pronunciation"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/ˈeksəmpl/"
                  @blur="validatePronunciation"
                />
              </div>

              <!-- Part of Speech -->
              <div>
                <label for="partOfSpeech" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.wordType') }} <span class="text-red-500">*</span>
                </label>
                <select
                  id="partOfSpeech"
                  v-model="form.partOfSpeech"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @change="validatePartOfSpeech"
                >
                  <option value="">{{ t('vocabulary.selectWordType') }}</option>
                  <option value="noun">{{ t('vocabulary.wordTypes.noun') }}</option>
                  <option value="verb">{{ t('vocabulary.wordTypes.verb') }}</option>
                  <option value="adjective">{{ t('vocabulary.wordTypes.adjective') }}</option>
                  <option value="adverb">{{ t('vocabulary.wordTypes.adverb') }}</option>
                  <option value="preposition">{{ t('vocabulary.wordTypes.preposition') }}</option>
                  <option value="conjunction">{{ t('vocabulary.wordTypes.conjunction') }}</option>
                  <option value="interjection">{{ t('vocabulary.wordTypes.interjection') }}</option>
                </select>
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.category') }} <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <!-- Add Category Button -->
                  <button
                    type="button"
                    @click="showTopicManager = true"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors z-10"
                    :title="t('vocabulary.addCategory')"
                  >
                    +
                  </button>
                  <select
                    id="category"
                    v-model="form.category"
                    required
                    class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @change="validateCategory"
                  >
                    <option value="">{{ t('vocabulary.selectCategory') }}</option>
                    <option v-for="key in categoryKeys" :key="key" :value="key">
                      {{ getTopicDisplayName(key) }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Level -->
              <div>
                <label for="level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.level') }} <span class="text-red-500">*</span>
                </label>
                <select
                  id="level"
                  v-model="form.level"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @change="validateLevel"
                >
                  <option value="">{{ t('vocabulary.selectLevel') }}</option>
                  <option value="beginner">{{ t('vocabulary.levels.beginner') }}</option>
                  <option value="intermediate">{{ t('vocabulary.levels.intermediate') }}</option>
                  <option value="advanced">{{ t('vocabulary.levels.advanced') }}</option>
                </select>
              </div>

              <!-- Meaning -->
              <div class="md:col-span-2">
                <label for="meaning" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.meaning') }} <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="meaning"
                  v-model="form.meaning"
                  required
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  :placeholder="t('vocabulary.meaningPlaceholder')"
                  @blur="validateMeaning"
                ></textarea>
              </div>

              <!-- Example -->
              <div class="md:col-span-2">
                <label for="example" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.example') }}
                </label>
                <textarea
                  id="example"
                  v-model="form.example"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.examplePlaceholder')"
                  @blur="validateExample"
                ></textarea>
              </div>

              <!-- Synonyms -->
              <div>
                <label for="synonyms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.synonyms') }}
                </label>
                <input
                  id="synonyms"
                  v-model="form.synonyms"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.separateByComma')"
                  @blur="validateSynonyms"
                />
              </div>

              <!-- Antonyms -->
              <div>
                <label for="antonyms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.antonyms') }}
                </label>
                <input
                  id="antonyms"
                  v-model="form.antonyms"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.separateByComma')"
                  @blur="validateAntonyms"
                />
              </div>

              <!-- Notes -->
              <div class="md:col-span-2">
                <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('vocabulary.note') }}
                </label>
                <textarea
                  id="notes"
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  :placeholder="t('vocabulary.notePlaceholder')"
                  @blur="validateNotes"
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div class="md:col-span-2">
                <ImageUpload v-model="form.image" />
              </div>

              <!-- Favorite -->
              <div class="md:col-span-2">
                <div class="flex items-center">
                  <input
                    id="favorite"
                    v-model="form.favorite"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label for="favorite" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {{ t('vocabulary.isFavorite') }}
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeDialog"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {{ t('common.cancel') }}
            </button>

            <button
              @click="submitForm"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center space-x-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSubmitting ? t('common.saving') : (isEditing ? t('common.update') : t('vocabulary.saveVocabulary')) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Topic Manager Modal -->
    <TopicManager
      v-model="showTopicManager"
      :vocabulary-usage="{}"
      @topic-added="onTopicAdded"
      @topic-updated="onTopicUpdated"
      @topic-deleted="onTopicDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, withDefaults, defineProps, defineEmits, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useVocabularyStore, type Vocabulary } from '../../../composables/useVocabularyStore'
import { getTopicName } from '../../../utils/topicUtils'

// Import components with defineAsyncComponent to avoid "has no default export" error
const ImageUpload = defineAsyncComponent(() => import('./ImageUpload.vue'))
const TopicManager = defineAsyncComponent(() => import('./TopicManager.vue'))

interface Props {
  modelValue: boolean
  vocabulary?: Vocabulary | null
  targetDate?: string | null
}

interface Emits {
  'update:modelValue': [value: boolean]
  'vocabulary-saved': []
}

const props = withDefaults(defineProps<Props>(), {
  vocabulary: null,
  targetDate: null
})

const emit = defineEmits<Emits>()
const { t } = useI18n()
const toast = useToast()



const vocabularyStore = useVocabularyStore()

// Data
const isSubmitting = ref(false)
const refreshTrigger = ref(0) // Trigger to force re-computation
const showTopicManager = ref(false) // State for TopicManager modal

// Define category keys - use computed to make it reactive
const categoryKeys = computed(() => {
  // Use refreshTrigger to force re-computation when topics change
  refreshTrigger.value // This creates a dependency
  // Get categories from vocabulary store (includes custom topics)
  const categories = vocabularyStore.getCategories.value
  console.log('Category keys computed with refreshTrigger:', refreshTrigger.value, 'Categories:', categories)
  return categories
})

const form = reactive({
  word: '',
  pronunciation: '',
  partOfSpeech: '',
  meaning: '',
  example: '',
  category: '',
  level: '',
  synonyms: '',
  antonyms: '',
  notes: '',
  favorite: false,
  image: null as string | null
})

// Computed
const isEditing = computed(() => !!props.vocabulary)

// Field-specific validation functions
const validateWord = (): boolean => {
  if (!form.word.trim()) {
    toast.error(t('vocabulary.validation.wordRequired'))
    return false
  } else if (form.word.trim().length > 100) {
    toast.error(t('vocabulary.validation.wordTooLong'))
    return false
  }
  return true
}

const validateMeaning = (): boolean => {
  if (!form.meaning.trim()) {
    toast.error(t('vocabulary.validation.meaningRequired'))
    return false
  } else if (form.meaning.trim().length > 500) {
    toast.error(t('vocabulary.validation.meaningTooLong'))
    return false
  }
  return true
}

const validatePartOfSpeech = (): boolean => {
  if (!form.partOfSpeech) {
    toast.error(t('vocabulary.validation.partOfSpeechRequired'))
    return false
  }
  return true
}

const validateCategory = (): boolean => {
  if (!form.category) {
    toast.error(t('vocabulary.validation.categoryRequired'))
    return false
  }
  return true
}

const validateLevel = (): boolean => {
  if (!form.level) {
    toast.error(t('vocabulary.validation.levelRequired'))
    return false
  }
  return true
}

const validateExample = (): boolean => {
  if (form.example.length > 500) {
    toast.error(t('vocabulary.validation.exampleTooLong'))
    return false
  }
  return true
}

const validateNotes = (): boolean => {
  if (form.notes.length > 500) {
    toast.error(t('vocabulary.validation.notesTooLong'))
    return false
  }
  return true
}

const validatePronunciation = (): boolean => {
  if (form.pronunciation.length > 100) {
    toast.error(t('vocabulary.validation.pronunciationTooLong'))
    return false
  }
  return true
}

const validateSynonyms = (): boolean => {
  if (form.synonyms && form.synonyms.trim()) {
    const synonyms = form.synonyms.split(',').map(s => s.trim()).filter(s => s)
    if (synonyms.length === 0) {
      toast.error(t('vocabulary.validation.synonymsInvalid'))
      return false
    }
  }
  return true
}

const validateAntonyms = (): boolean => {
  if (form.antonyms && form.antonyms.trim()) {
    const antonyms = form.antonyms.split(',').map(s => s.trim()).filter(s => s)
    if (antonyms.length === 0) {
      toast.error(t('vocabulary.validation.antonymsInvalid'))
      return false
    }
  }
  return true
}

// Overall form validation (silent - no toasts, just returns boolean)
const validateForm = (): boolean => {
  const isWordValid = !!(form.word.trim() && form.word.trim().length <= 100)
  const isMeaningValid = !!(form.meaning.trim() && form.meaning.trim().length <= 500)
  const isPartOfSpeechValid = !!form.partOfSpeech
  const isCategoryValid = !!form.category
  const isLevelValid = !!form.level
  const isExampleValid = form.example.length <= 500
  const isNotesValid = form.notes.length <= 500
  const isPronunciationValid = form.pronunciation.length <= 100
  
  let isSynonymsValid = true
  if (form.synonyms && form.synonyms.trim()) {
    const synonyms = form.synonyms.split(',').map(s => s.trim()).filter(s => s)
    isSynonymsValid = synonyms.length > 0
  }
  
  let isAntonymsValid = true
  if (form.antonyms && form.antonyms.trim()) {
    const antonyms = form.antonyms.split(',').map(s => s.trim()).filter(s => s)
    isAntonymsValid = antonyms.length > 0
  }

  return isWordValid && isMeaningValid && isPartOfSpeechValid && isCategoryValid && 
         isLevelValid && isExampleValid && isNotesValid && isPronunciationValid && 
         isSynonymsValid && isAntonymsValid
}

// Methods
const resetForm = () => {
  form.word = ''
  form.pronunciation = ''
  form.partOfSpeech = ''
  form.meaning = ''
  form.example = ''
  form.category = ''
  form.level = ''
  form.synonyms = ''
  form.antonyms = ''
  form.notes = ''
  form.favorite = false
}

// Watch for editing vocabulary changes
watch(
  () => props.vocabulary,
  (newVocabulary) => {
    if (newVocabulary) {
      // Populate form with existing data
      form.word = newVocabulary.word
      form.pronunciation = newVocabulary.pronunciation || ''
      form.partOfSpeech = newVocabulary.partOfSpeech
      form.meaning = newVocabulary.meaning
      form.example = newVocabulary.example || ''
      form.category = newVocabulary.category
      form.level = newVocabulary.level
      form.synonyms = newVocabulary.synonyms?.join(', ') || ''
      form.antonyms = newVocabulary.antonyms?.join(', ') || ''
      form.notes = newVocabulary.notes || ''
      form.favorite = !!newVocabulary.favorite
      form.image = newVocabulary.image || null
    } else {
      // Reset form for new vocabulary
      resetForm()
    }
  },
  { immediate: true }
)

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog()
  }
}

// Watch for dialog open/close
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // Dialog opened
    window.dispatchEvent(new CustomEvent('vocabulary-edit-word'))
    // Reset form when dialog opens
    if (!props.vocabulary) {
      resetForm()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    // Dialog closed
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Function to get topic display name
const getTopicDisplayName = (category: string): string => {
  return getTopicName(category)
}

// Topic event handlers
const onTopicAdded = (newTopic: any) => {
  // Force re-computation of categories
  refreshTrigger.value++
  // Refresh custom topics from store
  vocabularyStore.refreshCustomTopics()
  // Update form category if it was empty
  if (!form.category) {
    form.category = newTopic.key
  }
  console.log('Topic added, refreshing categories:', newTopic.key)
}

const onTopicUpdated = () => {
  // Force re-computation of categories
  refreshTrigger.value++
  // Refresh custom topics from store
  vocabularyStore.refreshCustomTopics()
  console.log('Topic updated, refreshing categories')
}

const onTopicDeleted = (deletedTopicId: string) => {
  // Force re-computation of categories
  refreshTrigger.value++
  // Refresh custom topics from store
  vocabularyStore.refreshCustomTopics()
  // If the current category was deleted, reset it
  if (form.category === deletedTopicId) {
    form.category = ''
  }
  console.log('Topic deleted, refreshing categories:', deletedTopicId)
}

// Listen for topics-updated events to refresh categories
const handleTopicsUpdated = () => {
  // Add a small delay to ensure localStorage has been updated
  setTimeout(() => {
    // Force re-computation of categories by incrementing trigger
    refreshTrigger.value++
    // Refresh custom topics from store
    vocabularyStore.refreshCustomTopics()
    console.log('Topics updated, refreshing categories in form dialog')
  }, 100)
}

// Lifecycle hooks
onMounted(() => {
  // Listen for custom topics updates
  window.addEventListener('topics-updated', handleTopicsUpdated)
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('topics-updated', handleTopicsUpdated)
})

const closeDialog = () => {
  // Dispatch modal closed event before emitting update
  window.dispatchEvent(new CustomEvent('vocabulary-modal-closed'))
  emit('update:modelValue', false)
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  // Validate form before submission - show toast for first invalid field
  if (!validateWord()) return
  if (!validatePronunciation()) return
  if (!validatePartOfSpeech()) return
  if (!validateCategory()) return
  if (!validateLevel()) return
  if (!validateMeaning()) return
  if (!validateExample()) return
  if (!validateSynonyms()) return
  if (!validateAntonyms()) return
  if (!validateNotes()) return
  
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    // Process form data
    const vocabularyData: any = {
      word: form.word.trim(),
      pronunciation: form.pronunciation.trim(),
      partOfSpeech: form.partOfSpeech,
      meaning: form.meaning.trim(),
      example: form.example.trim(),
      category: form.category,
      level: form.level,
      synonyms: form.synonyms ? form.synonyms.split(',').map(s => s.trim()).filter(s => s) : [],
      antonyms: form.antonyms ? form.antonyms.split(',').map(s => s.trim()).filter(s => s) : [],
      notes: form.notes.trim(),
      favorite: form.favorite,
      image: form.image
    }

    if (isEditing.value && props.vocabulary) {
      // Update existing vocabulary
      vocabularyStore.updateVocabulary(props.vocabulary.id, vocabularyData)
      console.log('Vocabulary updated:', props.vocabulary.id, vocabularyData)
      // Show success toast for update
      toast.success(t('vocabulary.validation.updateSuccess'))
    } else {
      // Add new vocabulary
      // If targetDate is provided, use it for createdAt and updatedAt
      if (props.targetDate) {
        const targetDateObj = new Date(props.targetDate)
        vocabularyData.createdAt = targetDateObj.toISOString()
        vocabularyData.updatedAt = targetDateObj.toISOString()
      }
      
      const newVocabulary = vocabularyStore.addVocabulary(vocabularyData)
      console.log('Vocabulary added:', newVocabulary)
      // Show success toast for save
      toast.success(t('vocabulary.validation.saveSuccess'))
    }

    // Emit success event
    emit('vocabulary-saved')

    // Close dialog after short delay
    setTimeout(() => {
      closeDialog()
    }, 500)
    
  } catch (error) {
    console.error('Error saving vocabulary:', error)
    // Show error toast instead of alert
    toast.error(t('vocabulary.validation.saveError'))
  } finally {
    isSubmitting.value = false
  }
}
</script>
