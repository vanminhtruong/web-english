<template>
  <div 
    v-if="modelValue" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @keyup.esc="closeDialog"
  >
    <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ t('vocabulary.details.title') }}
        </h3>
        <button 
          @click="closeDialog"
          class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6" v-if="vocabulary">
        <!-- Word and pronunciation -->
        <div class="mb-6">
          <div class="flex items-center space-x-4 mb-2">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ vocabulary.word }}
            </h1>
            <button 
              @click="playAudio(vocabulary.word)"
              class="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              :title="t('vocabulary.details.playAudio')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 012-2v4a2 2 0 01-2-2z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button 
              @click="toggleFavorite"
              class="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              :class="vocabulary.favorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'"
              :title="vocabulary.favorite ? t('vocabulary.details.removeFavorite') : t('vocabulary.details.addFavorite')"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="vocabulary.favorite" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                <path v-else d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
          </div>
          
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
            {{ vocabulary.pronunciation }}
          </p>
          
          <div class="flex items-center space-x-3">
            <span :class="getLevelColor(vocabulary.level)" class="px-3 py-1 text-sm font-medium rounded-full">
              {{ t(`vocabulary.levels.${vocabulary.level}`) }}
            </span>
            <span class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
              {{ getTopicName(vocabulary.category) }}
            </span>
            <span class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
              {{ t(`vocabulary.wordTypes.${vocabulary.partOfSpeech}`) }}
            </span>
          </div>
        </div>

        <!-- Image Display -->
        <div class="mb-6" v-if="vocabulary.image">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {{ t('vocabulary.image.title') }}
          </h3>
          <div class="flex justify-center">
            <div class="max-w-md w-full">
              <div class="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg">
                <img
                  :src="vocabulary.image"
                  :alt="`${t('vocabulary.image.preview')} - ${vocabulary.word}`"
                  class="w-full h-auto max-h-80 object-cover"
                  @error="handleImageError"
                />
                <!-- Image overlay for better accessibility -->
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div class="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-3 py-1 rounded-full">
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ vocabulary.word }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Meaning -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('vocabulary.meaning') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300 text-lg">
            {{ vocabulary.meaning }}
          </p>
        </div>

        <!-- Example -->
        <div class="mb-6" v-if="vocabulary.example">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('vocabulary.example') }}
          </h3>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex items-start space-x-3">
              <div class="flex-1">
                <p class="text-gray-700 dark:text-gray-300 italic text-lg">
                  "{{ vocabulary.example }}"
                </p>
              </div>
              <button 
                @click="playAudio(vocabulary.example)"
                class="flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors flex-shrink-0"
                :title="t('vocabulary.details.playExample')"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 012-2v4a2 2 0 01-2-2z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Synonyms -->
        <div class="mb-6" v-if="vocabulary.synonyms && vocabulary.synonyms.length > 0">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('vocabulary.synonyms') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="synonym in vocabulary.synonyms" 
              :key="synonym"
              class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm"
            >
              {{ synonym }}
            </span>
          </div>
        </div>

        <!-- Antonyms -->
        <div class="mb-6" v-if="vocabulary.antonyms && vocabulary.antonyms.length > 0">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('vocabulary.antonyms') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="antonym in vocabulary.antonyms" 
              :key="antonym"
              class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm"
            >
              {{ antonym }}
            </span>
          </div>
        </div>

        <!-- Notes -->
        <div class="mb-6" v-if="vocabulary.notes">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t('vocabulary.note') }}
          </h3>
          <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 dark:border-yellow-500 p-4">
            <p class="text-gray-700 dark:text-gray-300">
              {{ vocabulary.notes }}
            </p>
          </div>
        </div>

        <!-- Metadata -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-2" v-if="vocabulary.createdAt">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              <span>{{ t('vocabulary.createdAt') }}: {{ getRelativeTime(vocabulary.createdAt, $i18n.locale) }}</span>
            </div>
            <div class="flex items-center space-x-2" v-if="vocabulary.updatedAt && vocabulary.updatedAt !== vocabulary.createdAt">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
              </svg>
              <span>{{ t('vocabulary.updatedAt') }}: {{ getRelativeTime(vocabulary.updatedAt, $i18n.locale) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-600">
        <button 
          @click="editVocabulary"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {{ t('common.edit') }}
        </button>
        <button 
          @click="closeDialog"
          class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          {{ t('common.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'
import { getRelativeTime } from '../../../utils/dateUtils'
import { getTopicName } from '../../../utils/topicUtils'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

const { t } = useI18n()

interface Props {
  modelValue: boolean
  vocabulary: Vocabulary | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'edit-vocabulary': [vocabulary: Vocabulary]
  'toggle-favorite': [vocabulary: Vocabulary]
}>()

// Audio playback
const { playAudio: playVoiceAudio } = useVoiceStore()

const playAudio = (text: string) => {
  playVoiceAudio(text)
}

// Dialog controls
const closeDialog = () => {
  emit('update:modelValue', false)
}

const editVocabulary = () => {
  if (props.vocabulary) {
    emit('edit-vocabulary', props.vocabulary)
    closeDialog()
  }
}

const toggleFavorite = () => {
  if (props.vocabulary) {
    emit('toggle-favorite', props.vocabulary)
  }
}

// Handle image loading error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn(`Failed to load image for vocabulary: ${props.vocabulary?.word}`, img.src)
  // Hide the entire image section if image fails to load
  const imageSection = img.closest('.mb-6') as HTMLElement
  if (imageSection) {
    imageSection.style.display = 'none'
  }
}

// Level color utility
const getLevelColor = (level: string): string => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog()
  }
}

// Watch for dialog open/close to handle body scroll
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})
</script>
