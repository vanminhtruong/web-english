<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-4 sm:p-6 md:p-8 min-h-96 h-auto select-none overflow-hidden"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
    <!-- Words Crush Mode -->
    <WordsCrushMode 
      v-if="wordsCrushEnabled && card"
      :card="card"
      :get-topic-name="getTopicName"
      @game-completed="handleGameCompleted"
      @play-audio="handlePlayAudio"
    />
    
    <!-- Traditional Pronunciation Mode -->
    <div v-else class="text-center h-full flex flex-col justify-start md:justify-center items-center gap-3 md:gap-4">
      <div class="mb-6">
        <span class="px-2.5 py-0.5 bg-blue-100 dark:bg-dark-bg-mute text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-900 dark:text-white mb-3 md:mb-4 break-words">{{ card?.word }}</h2>
      <p class="text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/70 mb-6 md:mb-8 break-words">{{ card?.pronunciation }}</p>

      <div v-if="!isSpeechRecognitionSupported" class="text-red-500 dark:text-red-400">
        {{ t('flashcard.pronunciation.microphoneError', 'Microphone error! Please check microphone access permissions.') }}
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
        <p v-if="pronunciationResult" class="text-gray-600 dark:text-white/80 text-sm sm:text-base break-words">{{ t('flashcard.pronunciation.yourRecording', 'Your Recording') }}: <span class="font-medium text-gray-800 dark:text-white">{{ pronunciationResult }}</span></p>
        <div v-if="pronunciationAnswered" class="mt-4">
          <p v-if="pronunciationCorrect" class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{{ t('flashcard.listening.correct', '✓ Correct!') }}</p>
          <p v-else class="text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">{{ t('flashcard.pronunciation.tryAgain', 'Try Again!') }}</p>
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
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore';

const { t } = useI18n()

// Import components using defineAsyncComponent to avoid "has no default export" error
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))
const WordsCrushMode = defineAsyncComponent(() => import('./WordsCrushMode.vue'))

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
  wordsCrushEnabled: boolean;
}>();

const emit = defineEmits(['start-recording', 'game-completed', 'play-audio']);

// Handle start recording with potential effects triggering
const handleStartRecording = () => {
  emit('start-recording')
}

// Handle Words Crush game completion
const handleGameCompleted = (isCorrect: boolean) => {
  // Trigger effects for Words Crush mode
  isCorrectAnswer.value = isCorrect
  setTimeout(() => {
    triggerFirework.value = true
    triggerSound.value = true
  }, 50)
  
  // Emit to parent for session tracking
  emit('game-completed', isCorrect)
}

// Handle audio playback request from Words Crush mode
const handlePlayAudio = () => {
  emit('play-audio')
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch for pronunciationAnswered changes to trigger effects after parent updates
// Only for traditional pronunciation mode, not Words Crush mode
watch(() => props.pronunciationAnswered, (newValue) => {
  if (newValue && !triggerFirework.value && !props.wordsCrushEnabled) {
    // Answer was just processed, trigger effects
    isCorrectAnswer.value = props.pronunciationCorrect
    
    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
})
</script>