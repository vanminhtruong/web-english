<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="text-center mb-6">
        <span class="px-4 py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ getTopicName(currentCard.category) }}
        </span>
      </div>

      <!-- Question -->
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ getShortMeaning(currentCard.meaning) }}</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ t('flashcard.typing.instruction', 'Type the corresponding English word:') }}</p>
      </div>

      <!-- Input Area -->
      <div class="flex-1 flex flex-col justify-center">
        <div class="max-w-lg mx-auto w-full">
          <div class="relative">
            <input
              :value="typingAnswer"
              @input="handleInput"
              @keyup.enter="$emit('check-answer')"
              type="text"
              :disabled="typingAnswered"
              class="w-full p-3 text-center text-2xl border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              :placeholder="t('flashcard.typing.placeholder', 'Type the word...')"
            />
            
            <!-- Result indicator -->
            <div v-if="typingAnswered" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span v-if="typingAnswer.toLowerCase().trim() === currentCard.word.toLowerCase()" class="text-green-500">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span v-else class="text-red-500">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </span>
            </div>
          </div>
          
          <!-- Correct answer display -->
          <div v-if="typingAnswered && typingAnswer.toLowerCase().trim() !== currentCard.word.toLowerCase()" class="mt-4 text-center">
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('flashcard.typing.correctAnswer', 'Correct answer:') }}</p>
            <p class="text-xl font-bold text-green-600 dark:text-green-400">{{ currentCard.word }}</p>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="text-center mt-6">
        <button
          v-if="!typingAnswered"
          @click="$emit('check-answer')"
          :disabled="!typingAnswer.trim()"
          class="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {{ t('common.check', 'Check') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getTopicName } from '../../../utils/topicUtils'

const { t } = useI18n()

interface FlashcardData {
  word: string
  meaning: string
  pronunciation: string
  category: string
  partOfSpeech?: string
  example?: string
}

interface Props {
  currentCard: FlashcardData
  typingAnswer: string
  typingAnswered: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:typingAnswer': [value: string]
  'check-answer': []
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:typingAnswer', target.value)
}

const getShortMeaning = (meaning: string) => {
  return meaning.split(' - ')[0].trim()
}
</script>
