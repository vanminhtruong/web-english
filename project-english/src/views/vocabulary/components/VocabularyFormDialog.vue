<template>
  <!-- Backdrop -->
  <div 
    v-if="modelValue" 
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
  >
    <!-- Dialog Container -->
    <div class="relative top-10 mx-auto p-5 w-full max-w-4xl">
      <!-- Dialog Content -->
      <div 
        class="bg-white dark:bg-[#0a0a0a] shadow-xl rounded-lg border border-gray-200 dark:border-gray-700"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
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
        <div class="px-6 py-4">
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
                <select
                  id="category"
                  v-model="form.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{{ t('vocabulary.selectCategory') }}</option>
                  <option v-for="key in categoryKeys" :key="key" :value="key">
                    {{ getTopicDisplayName(key) }}
                  </option>
                </select>
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
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.meaningPlaceholder')"
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
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="t('vocabulary.notePlaceholder')"
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
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
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

    <!-- Success Toast -->
    <div 
      v-if="showSuccessToast" 
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-60 transform transition-all duration-300"
    >
      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span>{{ isEditing ? t('vocabulary.updateSuccess') : t('vocabulary.addSuccess') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, withDefaults, defineProps, defineEmits, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore, type Vocabulary } from '../../../composables/useVocabularyStore'
import { getTopicName } from '../../../utils/topicUtils'

// Import ImageUpload component with defineAsyncComponent to avoid "has no default export" error
const ImageUpload = defineAsyncComponent(() => import('./ImageUpload.vue'))

interface Props {
  modelValue: boolean
  vocabulary?: Vocabulary | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'vocabulary-saved'): void
}

const props = withDefaults(defineProps<Props>(), {
  vocabulary: null
})

const emit = defineEmits<Emits>()
const { t } = useI18n()

const vocabularyStore = useVocabularyStore()

// Data
const isSubmitting = ref(false)
const showSuccessToast = ref(false)
const refreshTrigger = ref(0) // Trigger to force re-computation

// Define category keys - use computed to make it reactive
const categoryKeys = computed(() => {
  // Use refreshTrigger to force re-computation when topics change
  refreshTrigger.value // This creates a dependency
  // Get categories from vocabulary store (includes custom topics)
  return vocabularyStore.getCategories.value
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
      form.favorite = newVocabulary.favorite
      form.image = newVocabulary.image || null
    } else {
      // Reset form for new vocabulary
      resetForm()
    }
  },
  { immediate: true }
)

// Watch for dialog open/close to reset form and handle body scroll
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // Dialog opened
      if (!props.vocabulary) {
        resetForm()
      }
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

// Function to get topic display name
const getTopicDisplayName = (category: string): string => {
  return getTopicName(category)
}

// Listen for topics-updated events to refresh categories
const handleTopicsUpdated = () => {
  // Force re-computation of categories by incrementing trigger
  refreshTrigger.value++
  console.log('Topics updated, refreshing categories in form dialog')
}

// Lifecycle hooks
onMounted(() => {
  // Listen for custom topics updates
  window.addEventListener('topics-updated', handleTopicsUpdated)
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('topics-updated', handleTopicsUpdated)
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    // Process form data
    const vocabularyData = {
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
    } else {
      // Add new vocabulary
      const newVocabulary = vocabularyStore.addVocabulary(vocabularyData)
      console.log('Vocabulary added:', newVocabulary)
    }

    // Show success toast
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)

    // Emit success event
    emit('vocabulary-saved')

    // Close dialog after short delay
    setTimeout(() => {
      closeDialog()
    }, 500)
    
  } catch (error) {
    console.error('Error saving vocabulary:', error)
    alert('Có lỗi xảy ra khi lưu từ vựng. Vui lòng thử lại.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
