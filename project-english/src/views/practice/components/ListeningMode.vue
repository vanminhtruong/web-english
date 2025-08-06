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
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">{{ t('flashcard.listening.instruction', 'Listen and type the word you hear:') }}</p>

      <div class="max-w-md mx-auto">
        <input
          :value="listeningAnswer"
          @input="onInput"
          @keyup.enter="handleCheckAnswer"
          type="text"
          :disabled="listeningAnswered"
          class="w-full p-4 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="t('flashcard.listening.placeholder', 'Type the word you hear...')"
        />
        <div v-if="listeningAnswered" class="mt-4">
          <p v-if="listeningCorrect" class="text-green-600 dark:text-green-400 font-medium">{{ t('flashcard.listening.correct', '✓ Correct!') }}</p>
          <p v-else class="text-red-600 dark:text-red-400 font-medium">{{ t('flashcard.listening.incorrect', '✗ Correct answer:') }} {{ card?.word }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ card?.meaning }}</p>
        </div>
      </div>
    </div>
    
    <!-- Firework Sound Effect -->
    <FireworkSoundEffect 
      ref="fireworkEffect"
      :trigger-firework="triggerFirework"
      :trigger-sound="triggerSound"
      :is-correct="isCorrectAnswer"
      @effect-complete="resetTriggers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import type { Vocabulary } from '../../../composables/useVocabularyStore';

// Import component using defineAsyncComponent to avoid "has no default export" error
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))

// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

const props = defineProps<{
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

// Handle check answer with effects
const handleCheckAnswer = () => {
  if (props.listeningAnswered) return
  
  // Emit the check answer first
  emit('check-answer')
  
  // Wait a bit for the answer to be processed, then trigger effects
  setTimeout(() => {
    // Use the listeningCorrect prop from parent
    isCorrectAnswer.value = props.listeningCorrect
    
    // Trigger effects
    triggerFirework.value = true
    triggerSound.value = true
  }, 100)
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch for listeningAnswered changes to trigger effects after parent updates
watch(() => props.listeningAnswered, (newValue) => {
  if (newValue && !triggerFirework.value) {
    // Answer was just processed, trigger effects
    isCorrectAnswer.value = props.listeningCorrect
    
    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
})

const { t } = useI18n();
</script>