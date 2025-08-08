<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[500px] select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
  >
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Category Badge -->
      <div class="mb-4 text-center">
        <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ currentCard?.category ? getTopicName(currentCard.category) : '' }}
        </span>
      </div>

      <!-- Image Display -->
      <div class="flex-1 flex items-center justify-center mb-4 min-h-0">
        <div v-if="currentCard?.image" class="relative">
          <img 
            :src="currentCard.image" 
            :alt="t('flashcard.image.imageAlt', 'Flashcard image')"
            class="max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute"
            @error="handleImageError"
          />
          <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ t('flashcard.image.imageError', 'Could not load image.') }}</p>
            </div>
          </div>
        </div>
        
        <!-- No Image State -->
        <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm">
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ t('flashcard.image.noImage', 'No image available for this card.') }}</p>
          </div>
        </div>
      </div>

      <!-- Answer Area -->
      <div class="space-y-3 flex-shrink-0">
        <!-- Typing input when toggle is OFF -->
        <div v-if="!imageQuizEnabled">
          <input
            v-model="userAnswer"
            @keyup.enter="checkAnswer"
            type="text"
            :disabled="imageAnswered"
            :placeholder="t('flashcard.image.placeholder', 'Enter your answer...')"
            class="w-full px-4 py-3 text-center text-lg border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed select-text"
          />
        </div>

        <!-- Multiple choice when toggle is ON -->
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center sm:justify-items-center justify-center mx-auto max-w-[560px] sm:max-w-[520px]">
            <button
              v-for="(opt, idx) in imageQuizOptions"
              :key="idx"
              @click="onSelectImageOption(opt)"
              :disabled="imageQuizAnswered"
              translate="no"
              class="notranslate px-3 py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full max-w-[260px] sm:max-w-[240px]"
              :class="[
                imageQuizAnswered
                  ? (isOptionCorrect(opt)
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700'
                      : isOptionSelected(opt)
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700'
                        : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60')
                  : 'bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5'
              ]"
            >
              <span
                class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80"
              >
                {{ String.fromCharCode(65 + idx) }}
              </span>
              <span class="truncate">{{ opt }}</span>
            </button>
          </div>
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
            {{ imageCorrect ? t('common.correct', 'Correct') : t('common.incorrect', 'Incorrect') }}
          </div>
          
          <!-- Show correct answer if wrong -->
          <div v-if="!imageCorrect" class="text-center">
            <p class="text-sm text-gray-600 dark:text-white/70">
              {{ t('flashcard.image.correctAnswer', 'Correct answer') }}: 
              <span class="font-semibold text-gray-900 dark:text-white">{{ currentCard?.word }}</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2">
              {{ currentCard?.meaning }}
            </p>
          </div>
          
          <!-- Show meaning if correct -->
          <div v-else class="text-center">
            <p class="text-sm text-gray-600 dark:text-white/70 line-clamp-2">
              {{ currentCard?.meaning }}
            </p>
          </div>
        </div>

        <!-- Instruction text -->
        <p v-if="!imageAnswered && !imageQuizEnabled" class="text-center text-sm text-gray-500 dark:text-white/60">
          {{ t('flashcard.image.instruction', 'Type the word for the image above and press Enter.') }}
        </p>
        <p v-if="!imageAnswered && imageQuizEnabled" class="text-center text-sm text-gray-500 dark:text-white/60">
          {{ t('flashcard.image.instructionQuiz', 'Choose the correct word for the image.') }}
        </p>
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
import { ref, watch, defineAsyncComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { getTopicName } from '../../../utils/topicUtils'

// Import component using defineAsyncComponent to avoid "has no default export" error
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))

// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

interface Props {
  currentCard: Vocabulary | null
  imageAnswer: string
  imageAnswered: boolean
  imageCorrect: boolean
  imageQuizEnabled: boolean
  imageQuizOptions: string[]
  imageQuizSelected: string
  imageQuizAnswered: boolean
}

interface Emits {
  (e: 'update:imageAnswer', value: string): void
  (e: 'checkAnswer'): void
  (e: 'update:imageQuizEnabled', value: boolean): void
  (e: 'select-image-quiz-answer', value: string): void
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
    
    // Wait a bit for the answer to be processed, then trigger effects
    setTimeout(() => {
      // Use the imageCorrect prop from parent
      isCorrectAnswer.value = props.imageCorrect
      
      // Trigger effects
      triggerFirework.value = true
      triggerSound.value = true
    }, 100)
  }
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch for imageAnswered changes to trigger effects after parent updates
watch(() => props.imageAnswered, (newValue) => {
  if (newValue && !triggerFirework.value) {
    // Answer was just processed, trigger effects
    isCorrectAnswer.value = props.imageCorrect
    
    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
})

// Persist Image Quiz toggle in localStorage
const STORAGE_KEY_IMAGE_QUIZ = 'flashcard_image_quiz_enabled'

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_IMAGE_QUIZ)
    if (saved !== null) {
      const val = saved === 'true'
      if (val !== props.imageQuizEnabled) {
        emit('update:imageQuizEnabled', val)
      }
    }
  } catch (e) {
    // ignore storage errors
  }
})

watch(() => props.imageQuizEnabled, (newVal) => {
  try {
    localStorage.setItem(STORAGE_KEY_IMAGE_QUIZ, String(newVal))
  } catch (e) {
    // ignore storage errors
  }
})

// Toggle handled in FlashcardHeader dropdown; no local toggle UI here

// Helpers for options UI
const onSelectImageOption = (opt: string) => {
  if (!props.imageQuizAnswered) {
    emit('select-image-quiz-answer', opt)
  }
}
const isOptionSelected = (opt: string) => props.imageQuizSelected === opt
const isOptionCorrect = (opt: string) => props.currentCard ? opt.trim().toLowerCase() === props.currentCard.word.trim().toLowerCase() : false
</script>
