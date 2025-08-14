<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-4 sm:p-6 md:p-8 h-auto md:h-96 select-none overflow-hidden"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
    <div class="text-center h-full flex flex-col justify-start md:justify-center items-center gap-3 md:gap-4">
      <div class="mb-6">
        <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-dark-bg-mute text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-900 dark:text-white mb-3 md:mb-4 break-words">{{ card?.word }}</h2>
      <p class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/70 mb-6 md:mb-8 break-words">{{ card?.pronunciation }}</p>

      <div v-if="!isSpeechRecognitionSupported" class="text-red-500 dark:text-red-400">
        Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.
      </div>
      <div v-else>
        <button
          @click="handleStartRecording"
          :disabled="isRecording"
          class="bg-red-500 hover:bg-red-600 text-white p-4 sm:p-5 md:p-6 rounded-full transition-colors disabled:opacity-50"
          :class="{ 'animate-pulse': isRecording }"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z" />
            <path d="M10 18a5 5 0 005-5h-1a4 4 0 01-4 4v1z" />
          </svg>
        </button>
      </div>

      <div class="mt-5 sm:mt-6 md:mt-8">
        <p v-if="pronunciationResult" class="text-gray-600 dark:text-white/80 text-sm sm:text-base break-words">Bạn đã nói: <span class="font-medium text-gray-800 dark:text-white">{{ pronunciationResult }}</span></p>
        <div v-if="pronunciationAnswered" class="mt-4">
          <p v-if="pronunciationCorrect" class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">Chính xác!</p>
          <p v-else class="text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">Hãy thử lại!</p>
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
  isRecording: boolean;
  pronunciationResult: string;
  pronunciationAnswered: boolean;
  pronunciationCorrect: boolean;
  isSpeechRecognitionSupported: boolean;
  getTopicName: (topic: string) => string;
}>();

const emit = defineEmits(['start-recording']);

// Handle start recording with potential effects triggering
const handleStartRecording = () => {
  emit('start-recording')
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch for pronunciationAnswered changes to trigger effects after parent updates
watch(() => props.pronunciationAnswered, (newValue) => {
  if (newValue && !triggerFirework.value) {
    // Answer was just processed, trigger effects
    isCorrectAnswer.value = props.pronunciationCorrect
    
    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
})
</script>