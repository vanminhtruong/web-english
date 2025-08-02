<template>
  <div>
    <div class="p-3 sm:p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" @click="viewDetails">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between xl:items-center xl:justify-between 2xl:items-center 2xl:justify-between space-y-3 lg:space-y-0">
        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-start xl:items-center 2xl:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <!-- Image Display -->
            <div v-if="word.image" class="flex-shrink-0 self-center sm:self-start xl:self-center 2xl:self-center">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                <img
                  :src="word.image"
                  :alt="`${t('vocabulary.image.preview', 'Image preview')} - ${word.word}`"
                  class="w-full h-full object-cover cursor-pointer"
                  @error="handleImageError"
                  @click.stop="openImageModal"
                />
              </div>
            </div>

            <div class="flex-1">
              <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{{ word.word }}</h4>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ word.pronunciation }}</p>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">{{ word.partOfSpeech }}</p>
              <!-- Date time information -->
              <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-1" v-if="word.createdAt">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ t('vocabulary.createdAt', 'Created at') }}: {{ getRelativeTime(word.createdAt, locale) }}</span>
                </div>
                <div class="flex items-center space-x-1" v-if="word.updatedAt && word.updatedAt !== word.createdAt">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
                  </svg>
                  <span>{{ t('vocabulary.updatedAt', 'Updated at') }}: {{ getRelativeTime(word.updatedAt, locale) }}</span>
                </div>
              </div>
            </div>

            <div class="flex-2">
              <p class="text-gray-700 dark:text-gray-300">{{ word.meaning }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" v-if="word.example">
                <span class="font-medium">{{ t('vocabulary.example', 'Example') }}:</span> {{ word.example }}
              </p>
            </div>
            
            <div class="flex-shrink-0">
              <span :class="getLevelColor(word.level)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ t(`vocabulary.levels.${word.level}`, word.level) }}
              </span>
              <p class="text-xs text-gray-500 mt-1">{{ getTopicName(word.category) }}</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-2 ml-4 xl:items-center 2xl:items-center">
          <button @click.stop="$emit('toggle-favorite', word)" class="text-gray-500 hover:text-yellow-500" :class="{ 'text-yellow-500': word.favorite }">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="word.favorite" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              <path v-else d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="none" stroke="currentColor" />
            </svg>
          </button>
          <button @click.stop="$emit('play-audio', word.word)" class="text-blue-500 hover:text-blue-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 012-2v4a2 2 0 01-2-2z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button @click.stop="$emit('edit-word', word)" class="text-gray-500 hover:text-gray-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </button>
          <button @click.stop="$emit('delete-word', word)" class="text-red-500 hover:text-red-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Image Zoom Modal -->
    <div v-if="isImageModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click="closeImageModal">
        <div class="max-w-4xl max-h-4xl">
            <img :src="word.image" :alt="`${t('vocabulary.image.preview', 'Image preview')} - ${word.word}`" class="max-w-full max-h-full rounded-lg">
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRelativeTime } from '../../../utils/dateUtils'
import { getTopicName } from '../../../utils/topicUtils'

const { t, locale } = useI18n()

const isImageModalOpen = ref(false)

const openImageModal = () => {
  isImageModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  isImageModalOpen.value = false
  document.body.style.overflow = ''
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
  image?: string
  createdAt?: string
  updatedAt?: string
}

interface Props {
  word: Word
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'play-audio': [word: string]
  'edit-word': [word: Word]
  'delete-word': [word: Word]
  'toggle-favorite': [word: Word]
  'view-details': [word: Word]
}>()


onUnmounted(() => {
  // Restore scroll if component is unmounted while modal is open
  if (isImageModalOpen.value) {
    document.body.style.overflow = ''
  }
})


const viewDetails = () => {
  emit('view-details', props.word)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn(`Failed to load image for word: ${props.word.word}`, img.src)
  // Hide the image container if image fails to load
  const container = img.closest('.flex-shrink-0') as HTMLElement
  if (container) {
    container.style.display = 'none'
  }
}

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


</script>
