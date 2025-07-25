<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 min-h-96 max-h-[500px]">
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Category Badge -->
      <div class="mb-4 text-center">
        <span class="px-3 py-1 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ currentCard?.category ? getTopicName(currentCard.category) : '' }}
        </span>
      </div>

      <!-- Image Display -->
      <div class="flex-1 flex items-center justify-center mb-4 min-h-0">
        <div v-if="currentCard?.image" class="relative">
          <img 
            :src="currentCard.image" 
            :alt="$t('flashcard.image.imageAlt')"
            class="max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            @error="handleImageError"
          />
          <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ $t('flashcard.image.imageError') }}</p>
            </div>
          </div>
        </div>
        
        <!-- No Image State -->
        <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-8 w-full max-w-sm">
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ $t('flashcard.image.noImage') }}</p>
          </div>
        </div>
      </div>

      <!-- Answer Input -->
      <div class="space-y-3 flex-shrink-0">
        <div>
          <input
            v-model="userAnswer"
            @keyup.enter="checkAnswer"
            type="text"
            :disabled="imageAnswered"
            :placeholder="$t('flashcard.image.placeholder')"
            class="w-full px-4 py-3 text-center text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <!-- Show result after answered -->
        <div v-if="imageAnswered" class="text-center space-y-2 max-h-32 overflow-y-auto">
          <div 
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              imageCorrect 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
            ]"
          >
            <svg v-if="imageCorrect" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            {{ imageCorrect ? $t('common.correct') : $t('common.incorrect') }}
          </div>
          
          <!-- Show correct answer if wrong -->
          <div v-if="!imageCorrect" class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('flashcard.image.correctAnswer') }}: 
              <span class="font-semibold text-gray-900 dark:text-white">{{ currentCard?.word }}</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {{ currentCard?.meaning }}
            </p>
          </div>
          
          <!-- Show meaning if correct -->
          <div v-else class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ currentCard?.meaning }}
            </p>
          </div>
        </div>

        <!-- Instruction text -->
        <p v-if="!imageAnswered" class="text-center text-sm text-gray-500 dark:text-gray-400">
          {{ $t('flashcard.image.instruction') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { getTopicName } from '../../../utils/topicUtils'

interface Props {
  currentCard: Vocabulary | null
  imageAnswer: string
  imageAnswered: boolean
  imageCorrect: boolean
}

interface Emits {
  (e: 'update:imageAnswer', value: string): void
  (e: 'checkAnswer'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

// Local reactive data
const userAnswer = ref('')
const imageError = ref(false)

// Watch for changes in imageAnswer prop to sync with local state
watch(() => props.imageAnswer, (newValue) => {
  userAnswer.value = newValue
})

// Watch for changes in local userAnswer to emit updates
watch(userAnswer, (newValue) => {
  emit('update:imageAnswer', newValue)
})

// Watch for card changes to reset error state
watch(() => props.currentCard, () => {
  imageError.value = false
})

// Handle image loading errors
const handleImageError = () => {
  imageError.value = true
}

// Check answer function
const checkAnswer = () => {
  if (!props.imageAnswered && userAnswer.value.trim()) {
    emit('checkAnswer')
  }
}
</script>
