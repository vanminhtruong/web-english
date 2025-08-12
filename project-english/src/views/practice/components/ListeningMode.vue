<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-auto sm:h-96 select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
    <div class="text-center h-full flex flex-col justify-center">
      <div class="mb-6">
        <span class="px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full">
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
      <p v-if="!listeningQuizEnabled" class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">{{ t('flashcard.listening.instruction', 'Listen and type the word you hear:') }}</p>
      <p v-else class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">{{ t('flashcard.listening.instructionQuiz', 'Choose the word you hear:') }}</p>

      <div v-if="!listeningQuizEnabled" class="max-w-md mx-auto">
        <input
          ref="listeningInput"
          :value="listeningAnswer"
          @input="onInput"
          @keyup.enter="handleCheckAnswer"
          type="text"
          :disabled="listeningAnswered"
          class="w-full p-4 text-center text-lg sm:text-xl md:text-2xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 select-text"
          :placeholder="t('flashcard.listening.placeholder', 'Type the word you hear...')"
          inputmode="text"
          autocapitalize="none"
          autocomplete="off"
          spellcheck="false"
          @blur="onListeningBlur"
        />
        <div v-if="listeningAnswered" class="mt-4">
          <p v-if="listeningCorrect" class="text-green-600 dark:text-green-400 font-medium">{{ t('flashcard.listening.correct', '✓ Correct!') }}</p>
          <p v-else class="text-red-600 dark:text-red-400 font-medium">{{ t('flashcard.listening.incorrect', '✗ Correct answer:') }} {{ card?.word }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ card?.meaning }}</p>
        </div>
      </div>
      <div v-else class="w-full px-2 sm:px-3 md:px-0">
        <div class="grid grid-cols-1 grid-2-cols-480 sm:grid-cols-2 gap-1.5 sm:gap-3 justify-items-stretch w-full max-w-none">
          <button
            v-for="(opt, idx) in listeningQuizOptions"
            :key="idx"
            @click="onSelectListeningOption(opt)"
            :disabled="listeningQuizAnswered"
            translate="no"
            class="notranslate px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0"
            :class="[
              listeningQuizAnswered
                ? (isOptionCorrect(opt)
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                    : isOptionSelected(opt)
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5'
            ]"
          >
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0">
              {{ String.fromCharCode(65 + idx) }}
            </span>
            <span class="truncate overflow-hidden min-w-0">{{ opt }}</span>
          </button>
        </div>
        <div v-if="listeningAnswered" class="mt-4 text-center">
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
import { ref, watch, defineAsyncComponent, onMounted, nextTick } from 'vue'
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
  listeningQuizEnabled: boolean;
  listeningQuizOptions: string[];
  listeningQuizSelected: string;
  listeningQuizAnswered: boolean;
  getTopicName: (topic: string) => string;
}>();

const emit = defineEmits(['update:listeningAnswer', 'check-answer', 'play-audio', 'select-listening-quiz-answer']);

// Remove Vietnamese diacritics so input is saved without accents
// Special-case: map all forms of 'ư' to 'w' so Unikey 'w' is preserved
const stripDiacritics = (s: string) => s
  .replace(/[ưừứửữự]/g, 'w')
  .replace(/[ƯỪỨỬỮỰ]/g, 'W')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')

// ---------------- Auto-focus listening input (variant OFF) ----------------
const listeningInput = ref<HTMLInputElement | null>(null)

const focusListeningInput = async () => {
  await nextTick()
  try {
    listeningInput.value?.focus({ preventScroll: true })
  } catch {
    listeningInput.value?.focus()
  }
}

const ensureListeningFocus = () => {
  if (!props.listeningQuizEnabled && !props.listeningAnswered) {
    if (document.activeElement !== listeningInput.value) {
      focusListeningInput()
    }
  }
}

const onListeningBlur = () => {
  ensureListeningFocus()
}

const onInput = (event: Event) => {
  const el = event.target as HTMLInputElement
  const sanitized = stripDiacritics(el.value)
  if (sanitized !== el.value) {
    el.value = sanitized
  }
  emit('update:listeningAnswer', sanitized)
}

onMounted(() => {
  ensureListeningFocus()
})

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

// Refocus when answer resets, card changes, or toggling back to typing
watch(() => props.listeningAnswered, (answered) => {
  if (!answered) ensureListeningFocus()
})
watch(() => props.card, () => {
  ensureListeningFocus()
})
watch(() => props.listeningQuizEnabled, (val) => {
  if (!val) ensureListeningFocus()
})

const { t } = useI18n();

// Helpers for options UI
const onSelectListeningOption = (opt: string) => {
  if (!props.listeningQuizAnswered) {
    emit('select-listening-quiz-answer', opt)
  }
}
const isOptionSelected = (opt: string) => props.listeningQuizSelected === opt
const isOptionCorrect = (opt: string) => props.card ? opt.trim().toLowerCase() === props.card.word.trim().toLowerCase() : false
</script>

<style scoped>
@media (min-width: 480px) {
  .grid-2-cols-480 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>