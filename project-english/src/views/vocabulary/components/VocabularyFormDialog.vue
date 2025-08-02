<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        @click="closeDialog"
      >
        <!-- Dialog Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-w-4xl max-h-[90vh] flex flex-col">
            <!-- Dialog Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ isEditing ? t('vocabulary.editVocabulary', 'Edit Vocabulary') : t('vocabulary.addVocabulary', 'Add Vocabulary') }}</span>
                  </h2>
                  <button 
                    @click="closeDialog"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
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
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.1s">
                      <label for="word" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                        {{ t('vocabulary.word', 'Word') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        id="word"
                        v-model="form.word"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.wordPlaceholder', 'Enter English word')"
                        @blur="validateWord"
                      />
                    </div>

                    <!-- Pronunciation -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                      <label for="pronunciation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                        {{ t('vocabulary.pronunciation', 'Pronunciation') }}
                      </label>
                      <input
                        id="pronunciation"
                        v-model="form.pronunciation"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                        placeholder="/ˈeksəmpl/"
                        @blur="validatePronunciation"
                      />
                    </div>

                    <!-- Part of Speech -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                      <label for="partOfSpeech" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                        {{ t('vocabulary.wordType', 'Word Type') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="partOfSpeech"
                        v-model="form.partOfSpeech"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer"
                        @change="validatePartOfSpeech"
                      >
                        <option value="">{{ t('vocabulary.selectWordType', 'Select word type') }}</option>
                        <option value="noun">{{ t('vocabulary.wordTypes.noun', 'Noun') }}</option>
                        <option value="verb">{{ t('vocabulary.wordTypes.verb', 'Verb') }}</option>
                        <option value="adjective">{{ t('vocabulary.wordTypes.adjective', 'Adjective') }}</option>
                        <option value="adverb">{{ t('vocabulary.wordTypes.adverb') }}</option>
                        <option value="preposition">{{ t('vocabulary.wordTypes.preposition') }}</option>
                        <option value="conjunction">{{ t('vocabulary.wordTypes.conjunction') }}</option>
                        <option value="interjection">{{ t('vocabulary.wordTypes.interjection') }}</option>
                      </select>
                    </div>

                    <!-- Category -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                      <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                        {{ t('vocabulary.category', 'Category') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <div class="relative">
                        <!-- Add Category Button -->
                        <button
                          type="button"
                          @click="showTopicManager = true"
                          class="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 hover:rotate-90 z-10 shadow-lg"
                          :title="t('vocabulary.addCategory', 'Add Category')"
                        >
                          +
                        </button>
                        <select
                          id="category"
                          v-model="form.category"
                          required
                          class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] cursor-pointer"
                          @change="validateCategory"
                        >
                          <option value="">{{ t('vocabulary.selectCategory', 'Select category') }}</option>
                          <option v-for="key in categoryKeys" :key="key" :value="key">
                            {{ getTopicDisplayName(key) }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!-- Level -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.5s">
                      <label for="level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-red-500 rounded mr-2"></span>
                        {{ t('vocabulary.level', 'Level') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="level"
                        v-model="form.level"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02] cursor-pointer"
                        @change="validateLevel"
                      >
                        <option value="">{{ t('vocabulary.selectLevel', 'Select level') }}</option>
                        <option value="beginner">{{ t('vocabulary.levels.beginner', 'Beginner') }}</option>
                        <option value="intermediate">{{ t('vocabulary.levels.intermediate', 'Intermediate') }}</option>
                        <option value="advanced">{{ t('vocabulary.levels.advanced', 'Advanced') }}</option>
                      </select>
                    </div>

                    <!-- Meaning -->
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.6s">
                      <label for="meaning" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-indigo-500 rounded mr-2"></span>
                        {{ t('vocabulary.meaning', 'Meaning') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        id="meaning"
                        v-model="form.meaning"
                        required
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.meaningPlaceholder', 'Enter meaning in Vietnamese')"
                        @blur="validateMeaning"
                      ></textarea>
                    </div>

                    <!-- Example -->
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.7s">
                      <label for="example" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-teal-500 rounded mr-2"></span>
                        {{ t('vocabulary.example', 'Example') }}
                      </label>
                      <textarea
                        id="example"
                        v-model="form.example"
                        rows="2"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.examplePlaceholder', 'Enter example sentence')"
                        @blur="validateExample"
                      ></textarea>
                    </div>

                    <!-- Synonyms -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.8s">
                      <label for="synonyms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-pink-500 rounded mr-2"></span>
                        {{ t('vocabulary.synonyms', 'Synonyms') }}
                      </label>
                      <input
                        id="synonyms"
                        v-model="form.synonyms"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.separateByComma', 'Separate by comma')"
                        @blur="validateSynonyms"
                      />
                    </div>

                    <!-- Antonyms -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.9s">
                      <label for="antonyms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-yellow-500 rounded mr-2"></span>
                        {{ t('vocabulary.antonyms', 'Antonyms') }}
                      </label>
                      <input
                        id="antonyms"
                        v-model="form.antonyms"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.separateByComma', 'Separate by comma')"
                        @blur="validateAntonyms"
                      />
                    </div>

                    <!-- Image URL -->
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 1.0s">
                      <label for="imageUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-cyan-500 rounded mr-2"></span>
                        {{ t('vocabulary.imageUrl', 'Image URL') }}
                      </label>
                      <textarea
                        id="imageUrl"
                        v-model="form.image"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02]"
                        :placeholder="t('vocabulary.imageUrlPlaceholder', 'Enter image URL (optional)')"

                      ></textarea>
                    </div>

                    <!-- Image Upload -->
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 1.1s">
                      <ImageUpload v-model="form.image" />
                    </div>

                    <!-- Favorite -->
                    <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 1.2s">
                      <div class="flex items-center p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                        <input
                          id="favorite"
                          v-model="form.favorite"
                          type="checkbox"
                          class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-all duration-300 hover:scale-110 cursor-pointer"
                        />
                        <label for="favorite" class="ml-3 block text-sm text-gray-700 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                          {{ t('vocabulary.isFavorite', 'Mark as favorite') }}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Footer Actions -->
              <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeDialog"
                    class="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                  >
                    {{ t('common.cancel', 'Cancel') }}
                  </button>

                  <button
                    @click="submitForm"
                    :disabled="isSubmitting"
                    class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium disabled:cursor-not-allowed"
                  >
                    <svg v-if="isSubmitting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSubmitting ? t('common.saving', 'Saving...') : (isEditing ? t('common.update', 'Update') : t('vocabulary.saveVocabulary', 'Save Vocabulary')) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

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
    toast.error(t('vocabulary.validation.wordRequired', 'Word is required'))
    return false
  } else if (form.word.trim().length > 100) {
    toast.error(t('vocabulary.validation.wordTooLong', 'Word is too long'))
    return false
  }
  return true
}

const validateMeaning = (): boolean => {
  if (!form.meaning.trim()) {
    toast.error(t('vocabulary.validation.meaningRequired', 'Meaning is required'))
    return false
  } else if (form.meaning.trim().length > 500) {
    toast.error(t('vocabulary.validation.meaningTooLong', 'Meaning is too long'))
    return false
  }
  return true
}

const validatePartOfSpeech = (): boolean => {
  if (!form.partOfSpeech) {
    toast.error(t('vocabulary.validation.partOfSpeechRequired', 'Part of speech is required'))
    return false
  }
  return true
}

const validateCategory = (): boolean => {
  if (!form.category) {
    toast.error(t('vocabulary.validation.categoryRequired', 'Category is required'))
    return false
  }
  return true
}

const validateLevel = (): boolean => {
  if (!form.level) {
    toast.error(t('vocabulary.validation.levelRequired', 'Level is required'))
    return false
  }
  return true
}

const validateExample = (): boolean => {
  if (form.example.length > 500) {
    toast.error(t('vocabulary.validation.exampleTooLong', 'Example is too long'))
    return false
  }
  return true
}

const validateNotes = (): boolean => {
  if (form.notes.length > 500) {
    toast.error(t('vocabulary.validation.notesTooLong', 'Notes are too long'))
    return false
  }
  return true
}

const validatePronunciation = (): boolean => {
  if (form.pronunciation.length > 100) {
    toast.error(t('vocabulary.validation.pronunciationTooLong', 'Pronunciation is too long'))
    return false
  }
  return true
}

const validateSynonyms = (): boolean => {
  if (form.synonyms && form.synonyms.trim()) {
    const synonyms = form.synonyms.split(',').map(s => s.trim()).filter(s => s)
    if (synonyms.length === 0) {
      toast.error(t('vocabulary.validation.synonymsInvalid', 'Synonyms are invalid'))
      return false
    }
  }
  return true
}

const validateAntonyms = (): boolean => {
  if (form.antonyms && form.antonyms.trim()) {
    const antonyms = form.antonyms.split(',').map(s => s.trim()).filter(s => s)
    if (antonyms.length === 0) {
      toast.error(t('vocabulary.validation.antonymsInvalid', 'Antonyms are invalid'))
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

<style scoped>
/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Enhanced hover effects for form inputs */
input:focus, textarea:focus, select:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Loading animation for submit button */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Stagger animation delays for form fields */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
.animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
.animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
.animate-fade-in-up:nth-child(7) { animation-delay: 0.7s; }
.animate-fade-in-up:nth-child(8) { animation-delay: 0.8s; }
.animate-fade-in-up:nth-child(9) { animation-delay: 0.9s; }
.animate-fade-in-up:nth-child(10) { animation-delay: 1.0s; }
.animate-fade-in-up:nth-child(11) { animation-delay: 1.1s; }
.animate-fade-in-up:nth-child(12) { animation-delay: 1.2s; }

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth dialog entrance */
.dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px) rotate(1deg);
}

.dialog-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0) rotate(0deg);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Gradient text effect for labels */
label {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced focus states */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Smooth scale transitions */
.transform {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button states */
button:active {
  transform: scale(0.95);
}

/* Loading spinner enhancement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced checkbox styling */
input[type="checkbox"] {
  transition: all 0.3s ease;
}

input[type="checkbox"]:checked {
  transform: scale(1.1);
}

/* Smooth color transitions */
.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Enhanced border radius */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Enhanced hover effects for interactive elements */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth rotation effects */
.hover\:rotate-90:hover {
  transform: rotate(90deg);
}

/* Enhanced shadow on hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Disabled state styling */
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
</style>
