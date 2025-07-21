<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96">
    <div class="text-center h-full flex flex-col justify-center">
      <div class="mb-6">
        <span class="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
      </div>
      <div class="mb-8">
        <button
          @click="emit('play-audio')"
          class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full transition-colors"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zm-2 6a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">{{ t('flashcard.listening.instruction') }}</p>

      <div class="max-w-md mx-auto">
        <input
          :value="listeningAnswer"
          @input="onInput"
          @keyup.enter="emit('check-answer')"
          type="text"
          :disabled="listeningAnswered"
          class="w-full p-4 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="t('flashcard.listening.placeholder')"
        />
        <div v-if="listeningAnswered" class="mt-4">
          <p v-if="listeningCorrect" class="text-green-600 dark:text-green-400 font-medium">{{ t('flashcard.listening.correct') }}</p>
          <p v-else class="text-red-600 dark:text-red-400 font-medium">{{ t('flashcard.listening.incorrect') }} {{ card?.word }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ card?.meaning }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Vocabulary } from '../../../composables/useVocabularyStore';

defineProps<{
  card: Vocabulary | null;
  listeningAnswer: string;
  listeningAnswered: boolean;
  listeningCorrect: boolean;
  getTopicName: (topic: string) => string;
}>();

const emit = defineEmits(['update:listeningAnswer', 'check-answer', 'play-audio']);

const onInput = (event: Event) => {
  emit('update:listeningAnswer', (event.target as HTMLInputElement).value)
}

const { t } = useI18n();
</script> 