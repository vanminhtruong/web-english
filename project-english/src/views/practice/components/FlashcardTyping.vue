<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96 select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="text-center mb-6">
        <span class="px-4 py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ getTopicName(currentCard.category) }}
        </span>
      </div>

      <!-- Question -->
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ getShortMeaning(currentCard.meaning) }}</h2>
        <p v-if="!typingQuizEnabled" class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">{{ t('flashcard.typing.instruction', 'Type the corresponding English word:') }}</p>
        <p v-else class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">{{ t('flashcard.typing.instructionQuiz', 'Choose the correct English word:') }}</p>
      </div>

      <!-- Input Area -->
      <div class="flex-1 flex flex-col justify-center">
        <div v-if="!typingQuizEnabled" class="max-w-lg mx-auto w-full">
          <div class="relative">
            <input
              ref="typingInput"
              :value="typingAnswer"
              @input="handleInput"
              @keyup.enter="handleCheckAnswer"
              type="text"
              :disabled="typingAnswered"
              class="w-full p-3 text-center text-xl sm:text-2xl md:text-3xl border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 select-text"
              :placeholder="t('flashcard.typing.placeholder', 'Type the word...')"
              inputmode="text"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              @blur="onTypingBlur"
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
            <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{{ currentCard.word }}</p>
          </div>
        </div>
        <div v-else class="w-full px-2 sm:px-3 md:px-0">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 justify-items-stretch w-full">
            <button
              v-for="(opt, idx) in typingQuizOptions"
              :key="idx"
              @click="onSelectTypingOption(opt)"
              :disabled="typingQuizAnswered"
              translate="no"
              class="notranslate px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0"
              :class="[
                typingQuizAnswered
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
          <div v-if="typingAnswered" class="mt-3 sm:mt-4 text-center px-2">
            <p v-if="typingCorrect" class="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">{{ t('flashcard.typing.correct', '✓ Correct!') }}</p>
            <p v-else class="text-red-600 dark:text-red-400 font-medium text-sm sm:text-base break-words">{{ t('flashcard.typing.incorrect', '✗ Correct answer:') }} <span class="font-bold">{{ currentCard.word }}</span></p>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="text-center mt-6">
        <button
          v-if="!typingAnswered && !typingQuizEnabled"
          @click="handleCheckAnswer"
          :disabled="!typingAnswer.trim()"
          class="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {{ t('common.check', 'Check') }}
        </button>
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
import { useI18n } from 'vue-i18n'
import { getTopicName } from '../../../utils/topicUtils'

// Import component using defineAsyncComponent to avoid "has no default export" error
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))

const { t } = useI18n()

// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

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
  typingCorrect?: boolean
  typingQuizEnabled?: boolean
  typingQuizOptions?: string[]
  typingQuizSelected?: string
  typingQuizAnswered?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:typingAnswer': [value: string]
  'check-answer': []
  'select-typing-quiz-answer': [answer: string]
}>()

// Remove Vietnamese diacritics so input is saved without accents
// Special-case: map all forms of 'ư' to 'w' so Unikey 'w' is preserved
const stripDiacritics = (s: string) => s
  // map ư-variants to w, before normalization removes marks
  .replace(/[ưừứửữự]/g, 'w')
  .replace(/[ƯỪỨỬỮỰ]/g, 'W')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const sanitized = stripDiacritics(target.value)
  if (sanitized !== target.value) {
    target.value = sanitized
  }
  emit('update:typingAnswer', sanitized)
}

const getShortMeaning = (meaning: string) => {
  return meaning.split(' - ')[0].trim()
}

// Handle check answer with effects
const handleCheckAnswer = () => {
  if (props.typingAnswered) return
  
  // Emit the check answer first
  emit('check-answer')
  
  // Wait a bit for the answer to be processed, then trigger effects
  setTimeout(() => {
    // Determine if answer is correct
    isCorrectAnswer.value = props.typingAnswer.toLowerCase().trim() === props.currentCard.word.toLowerCase()
    
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

// Watch for typingAnswered changes to trigger effects after parent updates
watch(() => props.typingAnswered, (newValue) => {
  if (newValue && !triggerFirework.value) {
    // Use typingCorrect from props (set by parent) to ensure consistency
    if (typeof props.typingCorrect === 'boolean') {
      isCorrectAnswer.value = props.typingCorrect
    } else {
      // Fallback compare for legacy input flow
      isCorrectAnswer.value = props.typingAnswer.toLowerCase().trim() === props.currentCard.word.toLowerCase()
    }

    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
})

// Helpers for options UI
const onSelectTypingOption = (opt: string) => {
  if (!props.typingQuizAnswered) emit('select-typing-quiz-answer', opt)
}
const isOptionSelected = (opt: string) => props.typingQuizSelected === opt
const isOptionCorrect = (opt: string) => opt.trim().toLowerCase() === props.currentCard.word.trim().toLowerCase()

// ---------------- Auto-focus typing input (variant OFF) ----------------
const typingInput = ref<HTMLInputElement | null>(null)

const focusTypingInput = async () => {
  await nextTick()
  try {
    typingInput.value?.focus({ preventScroll: true })
  } catch {
    typingInput.value?.focus()
  }
}

const ensureTypingFocus = () => {
  if (!props.typingQuizEnabled && !props.typingAnswered) {
    if (document.activeElement !== typingInput.value) {
      focusTypingInput()
    }
  }
}

const onTypingBlur = () => {
  // Refocus if still eligible
  ensureTypingFocus()
}

onMounted(() => {
  ensureTypingFocus()
})

// Focus when toggling back to typing mode
watch(() => props.typingQuizEnabled, (val) => {
  if (!val) ensureTypingFocus()
})

// Focus when answer resets (e.g., next card)
watch(() => props.typingAnswered, (answered) => {
  if (!answered) ensureTypingFocus()
})

// Focus on card change
watch(() => props.currentCard, () => {
  ensureTypingFocus()
})
</script>
