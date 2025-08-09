<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[560px] select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
    @click="focusInput"
  >
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Category Badge -->
      <div class="mb-4 text-center">
        <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
      </div>

      <!-- Image Display as hint -->
      <div class="flex-1 flex items-center justify-center mb-4 min-h-0">
        <div v-if="card?.image" class="relative">
          <img
            :src="card.image"
            :alt="t('flashcard.pictionary.imageAlt', 'Pictionary image')"
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
        <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm">
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ t('flashcard.image.noImage', 'No image available for this card.') }}</p>
          </div>
        </div>
      </div>

      <!-- Letter slots -->
      <div class="flex-shrink-0">
        <div class="flex flex-wrap gap-2 justify-center items-center">
          <div v-for="(slot, idx) in slots" :key="idx">
            <div v-if="slot.separator" class="px-1 text-lg text-gray-700 dark:text-white/80 select-none">
              {{ slot.char }}
            </div>
            <div
              v-else
              class="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center rounded-md border text-xl sm:text-2xl font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute transition-all duration-200"
              :class="[
                slot.fixed ? 'opacity-90' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg-mute hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm'
              ]"
              @click="!slot.fixed && focusInput()"
            >
              <span v-if="slot.char" class="uppercase tracking-wider">{{ slot.char }}</span>
              <span
                v-else-if="isFocused && !pictionaryAnswered && idx === nextEditableIndex()"
                class="caret-block"
                aria-hidden="true"
              ></span>
              <span v-else class="uppercase tracking-wider">&nbsp;</span>
            </div>
          </div>
        </div>
        <!-- Hidden input to capture typing -->
        <input
          ref="hiddenInput"
          type="text"
          class="fixed top-0 left-0 w-px h-px opacity-0"
          tabindex="-1"
          aria-hidden="true"
          autocomplete="off"
          spellcheck="false"
          inputmode="text"
          @beforeinput.stop.prevent="handleBeforeInput"
          @input.stop.prevent="handleInput"
          @keydown.stop.prevent="handleKeydown"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>

      <!-- Feedback -->
      <div v-if="pictionaryAnswered" class="text-center space-y-2 max-h-32 overflow-y-auto mt-3">
        <div
          :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            pictionaryCorrect
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
          ]"
        >
          <svg v-if="pictionaryCorrect" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/>
          </svg>
          {{ pictionaryCorrect ? t('common.correct', 'Correct') : t('common.incorrect', 'Incorrect') }}
        </div>
        <div v-if="!pictionaryCorrect" class="text-center">
          <p class="text-sm text-gray-600 dark:text-white/70">
            {{ t('flashcard.image.correctAnswer', 'Correct answer') }}:
            <span class="font-semibold text-gray-900 dark:text-white">{{ card?.word }}</span>
          </p>
          <p class="text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2">
            {{ card?.meaning }}
          </p>
        </div>
        <div v-else class="text-center">
          <p class="text-sm text-gray-600 dark:text-white/70 line-clamp-2">
            {{ card?.meaning }}
          </p>
        </div>
      </div>

      <!-- Instruction -->
      <p v-if="!pictionaryAnswered" class="text-center text-sm text-gray-500 dark:text-white/60 mt-3">
        {{ t('flashcard.pictionary.instruction', 'Click the boxes and type to fill in the missing letters. Press Enter to check.') }}
      </p>
      
      <!-- Firework Sound Effect -->
      <FireworkSoundEffect 
        ref="fireworkEffect"
        :trigger-firework="triggerFirework"
        :trigger-sound="triggerSound"
        :is-correct="isCorrectAnswer"
        @effect-complete="resetTriggers"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

interface Props {
  card: Vocabulary | null
  pictionaryAnswer: string
  pictionaryAnswered: boolean
  pictionaryCorrect: boolean
  getTopicName: (id: string) => string
}

interface Emits {
  (e: 'update:pictionary-answer', value: string): void
  (e: 'check-answer'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

const imageError = ref(false)
const hiddenInput = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

// Import effect component lazily
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))
// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

type Slot = { char: string; fixed: boolean; separator?: boolean }
const slots = ref<Slot[]>([])

const normalizeWord = (w: string) => w.normalize('NFKC')

const buildSlots = (word: string) => {
  const letters = normalizeWord(word)
  const arr: Slot[] = []
  const isAlpha = (c: string) => /^[a-z]$/i.test(c)
  const meaningfulIndices: number[] = []
  for (let i = 0; i < letters.length; i++) {
    const c = letters[i]
    if (isAlpha(c)) {
      meaningfulIndices.push(i)
    }
  }
  // Determine number of hint letters: 1 for short words (<= 3 letters), else 2
  const alphaCount = meaningfulIndices.length
  const hintCount = alphaCount <= 3 ? 1 : 2
  // Randomly select hint positions among alphabetic letters
  const hintSet = new Set<number>()
  while (hintSet.size < Math.min(hintCount, alphaCount)) {
    const r = meaningfulIndices[Math.floor(Math.random() * alphaCount)]
    hintSet.add(r)
  }

  for (let i = 0; i < letters.length; i++) {
    const c = letters[i]
    if (!isAlpha(c)) {
      // keep separators (space, hyphen, apostrophe)
      arr.push({ char: c, fixed: true, separator: true })
      continue
    }
    if (hintSet.has(i)) {
      arr.push({ char: c.toUpperCase(), fixed: true })
    } else {
      arr.push({ char: '', fixed: false })
    }
  }
  slots.value = arr
  pushAnswer()
}

const pushAnswer = () => {
  // Emit string preserving separators; blanks are empty until filled
  const answer = slots.value
    .map(s => (s.separator ? s.char : (s.char || '')))
    .join('')
  emit('update:pictionary-answer', answer)
}

const focusInput = async () => {
  await nextTick()
  try {
    hiddenInput.value?.focus({ preventScroll: true })
  } catch {
    // Fallback for browsers not supporting FocusOptions
    hiddenInput.value?.focus()
  }
  isFocused.value = true
}

const nextEditableIndex = () => slots.value.findIndex(s => !s.fixed && !s.char)
const lastFilledEditableIndex = () => {
  for (let i = slots.value.length - 1; i >= 0; i--) {
    const s = slots.value[i]
    if (!s.fixed && s.char) return i
  }
  return -1
}

const handleKeydown = (e: KeyboardEvent) => {
  if (props.pictionaryAnswered) return
  const key = e.key
  // Support desktop physical keyboards
  if (/^[a-z]$/i.test(key)) {
    const idx = nextEditableIndex()
    if (idx !== -1) {
      slots.value[idx].char = key.toUpperCase()
      pushAnswer()
    }
    return
  }
  if (key === 'Backspace') {
    const idx = lastFilledEditableIndex()
    if (idx !== -1) {
      slots.value[idx].char = ''
      pushAnswer()
    }
  } else if (key === 'Enter') {
    emit('check-answer')
  }
}

const handleBeforeInput = (e: Event) => {
  if (props.pictionaryAnswered) return
  const ie = e as InputEvent
  const type = ie.inputType as string | undefined
  // Handle character insertion from soft keyboards (Android/iOS)
  if (type === 'insertText') {
    const data = (ie as any).data || ''
    if (/^[a-z]$/i.test(data)) {
      const idx = nextEditableIndex()
      if (idx !== -1) {
        slots.value[idx].char = data.toUpperCase()
        pushAnswer()
      }
    }
  } else if (type === 'deleteContentBackward') {
    const idx = lastFilledEditableIndex()
    if (idx !== -1) {
      slots.value[idx].char = ''
      pushAnswer()
    }
  } else if (type === 'insertLineBreak') {
    emit('check-answer')
  }
  // Always clear the hidden input value so it doesn't accumulate text
  if (hiddenInput.value) hiddenInput.value.value = ''
}

const handleInput = (e: Event) => {
  // Clear any stray value in the hidden input
  if (hiddenInput.value) hiddenInput.value.value = ''
}

watch(() => props.card, (c) => {
  imageError.value = false
  if (c?.word) buildSlots(c.word)
})

onMounted(() => {
  if (props.card?.word) buildSlots(props.card.word)
  focusInput()
})

const handleImageError = () => {
  imageError.value = true
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch answer completion to trigger effects
watch(() => props.pictionaryAnswered, (newVal) => {
  if (newVal && !triggerFirework.value) {
    isCorrectAnswer.value = props.pictionaryCorrect
    setTimeout(() => {
      triggerFirework.value = true
      triggerSound.value = true
    }, 50)
  }
  if (newVal) {
    // Hide caret when answered
    isFocused.value = false
  }
})
</script>

<style scoped>
@keyframes caret-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

.caret-block {
  display: block;
  width: 2px;
  height: 1.3em; /* match text height */
  background-color: currentColor; /* inherits from parent text color */
  border-radius: 1px;
  animation: caret-blink 1s step-end infinite;
}
</style>
