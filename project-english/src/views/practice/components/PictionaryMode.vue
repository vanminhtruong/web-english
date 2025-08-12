<template>
  <div
    class="bg-white dark:bg-black rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[560px] select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
    @click="focusInput"
  >
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Category Badge -->
      <div class="mb-4 flex items-center justify-center gap-3">
        <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
        <!-- Drag mode toggle (local to Pictionary) -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-600 dark:text-white/70">{{ t('flashcard.pictionary.dragToggle', 'Drag & Drop') }}</span>
          <button
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors border border-gray-300 dark:border-dark-bg-mute"
            :class="dragMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-dark-bg-soft'"
            @click.stop="toggleDragMode"
            :aria-pressed="dragMode ? 'true' : 'false'"
            :title="t('flashcard.pictionary.dragToggle', 'Drag & Drop')"
          >
            <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', dragMode ? 'translate-x-5' : 'translate-x-1']" />
          </button>
        </div>
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
                slot.fixed
                  ? 'opacity-90'
                  : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg-mute hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm',
                dragMode && !slot.fixed ? 'ring-0' : ''
              ]"
              @click="onSlotClick(idx)"
              @dragover.prevent="onSlotDragOver(idx, $event)"
              @drop.prevent="onSlotDrop(idx, $event)"
            >
              <span v-if="slot.char" class="uppercase tracking-wider">{{ slot.char }}</span>
              <span
                v-else-if="!dragMode && isFocused && !pictionaryAnswered && idx === nextEditableIndex()"
                class="caret-block"
                aria-hidden="true"
              ></span>
              <span v-else class="uppercase tracking-wider">&nbsp;</span>
            </div>
          </div>
        </div>
        <!-- Letter bank filter & list for drag mode -->
        <div v-if="dragMode && !pictionaryAnswered" class="mt-3">
          <div class="mb-2 flex justify-center">
            <div class="relative w-48 sm:w-56">
              <input
                v-model="letterQuery"
                type="text"
                inputmode="text"
                autocomplete="off"
                spellcheck="false"
                placeholder="Find letter..."
                class="w-full px-3 pr-8 py-1.5 text-sm rounded-md border bg-white text-gray-900 border-gray-300 dark:bg-dark-bg-soft dark:text-white dark:border-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click.stop
              />
              <button
                type="button"
                class="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 p-1 rounded text-gray-500 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10"
                :class="{ 'opacity-40 pointer-events-none': !letterQuery }"
                @click.stop="clearLetterQuery"
                :aria-label="t('common.clear', 'Clear')"
                :title="t('common.clear', 'Clear')"
              >
                <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="ch in filteredLetterBank"
              :key="ch"
              class="w-8 h-10 sm:w-9 sm:h-11 inline-flex items-center justify-center rounded-md text-base sm:text-lg font-semibold border bg-blue-50 text-blue-700 border-blue-200 dark:bg-dark-bg-soft dark:text-blue-300 dark:border-blue-900/40 hover:shadow transition"
              draggable="true"
              @dragstart="onLetterDragStart(ch, $event)"
            >
              {{ ch }}
            </button>
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
          autocapitalize="off"
          spellcheck="false"
          inputmode="text"
          @beforeinput.stop.prevent="handleBeforeInput"
          @input.stop.prevent="handleInput"
          @keydown.stop.prevent="handleKeydown"
          @compositionstart="onCompositionStart"
          @compositionupdate="onCompositionUpdate"
          @compositionend="onCompositionEnd"
          @focus="isFocused = true"
          @blur="onHiddenBlur"
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
        {{ dragMode
          ? t('flashcard.pictionary.dragInstruction', 'Drag letters into the boxes, then press Enter to check.')
          : t('flashcard.pictionary.instruction', 'Click the boxes and type to fill in the missing letters. Press Enter to check.')
        }}
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
import { ref, watch, onMounted, onBeforeUnmount, nextTick, defineAsyncComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { useVoiceStore } from '../../../stores/voiceStore'

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
  (e: 'pictionary-snapshot', value: { slots: Slot[] }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()
const { playAudio } = useVoiceStore()

const imageError = ref(false)
const hiddenInput = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
// Track IME composition to avoid altering previous characters
const isComposing = ref(false)
let compositionBuffer = ''
// Drag & drop mode state
const dragMode = ref(false)
const letterBank = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
// Query to filter letter bank in drag mode
const letterQuery = ref('')
const filteredLetterBank = computed(() => {
  const q = letterQuery.value.trim().toUpperCase()
  if (!q) return letterBank
  // Allow entering multiple characters: show unique letters typed that exist in A-Z
  const onlyLetters = q.replace(/[^A-Z]/g, '')
  if (!onlyLetters) return letterBank
  const set = new Set(onlyLetters.split(''))
  return letterBank.filter(ch => set.has(ch))
})

const clearLetterQuery = () => {
  letterQuery.value = ''
}

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

const emitSnapshot = () => {
  // Emit a deep copy of slot states to avoid mutation by parent consumers
  const snapshot = slots.value.map(s => ({ char: s.char, fixed: s.fixed, separator: s.separator }))
  emit('pictionary-snapshot', { slots: snapshot })
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

// Ensure focus stays on the hidden input when in typing mode and not answered
const ensureFocusIfNeeded = () => {
  if (!props.pictionaryAnswered && !dragMode.value) {
    if (document.activeElement !== hiddenInput.value) {
      focusInput()
    }
  }
}

const onHiddenBlur = () => {
  isFocused.value = false
  // Immediately refocus if still eligible to type
  ensureFocusIfNeeded()
}

const nextEditableIndex = () => slots.value.findIndex(s => !s.fixed && !s.char)
const lastFilledEditableIndex = () => {
  for (let i = slots.value.length - 1; i >= 0; i--) {
    const s = slots.value[i]
    if (!s.fixed && s.char) return i
  }
  return -1
}

// Remove Vietnamese diacritics so input is handled without accents
// Special-case: map all forms of 'ư' to 'w' so Unikey 'w' is preserved
const stripDiacritics = (s: string) => s
  .replace(/[ưừứửữự]/g, 'w')
  .replace(/[ƯỪỨỬỮỰ]/g, 'W')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')

const handleKeydown = (e: KeyboardEvent) => {
  if (props.pictionaryAnswered) return
  // Ignore keydown while composing (IME in progress)
  if (isComposing.value) return
  const key = e.key
  // In drag mode, ignore typing except Enter
  if (dragMode.value) {
    if (key === 'Enter') {
      emitSnapshot()
      emit('check-answer')
    }
    return
  }
  // Support desktop physical keyboards (sanitize Vietnamese diacritics)
  const alpha = stripDiacritics(key)
  if (/^[a-z]$/i.test(alpha)) {
    const idx = nextEditableIndex()
    if (idx !== -1) {
      slots.value[idx].char = alpha.toUpperCase()
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
    emitSnapshot()
    emit('check-answer')
  }
}

const handleBeforeInput = (e: Event) => {
  if (props.pictionaryAnswered) return
  // Ignore programmatic updates while composing; we'll handle on compositionend
  if (isComposing.value) {
    return
  }
  if (dragMode.value) {
    // ignore text input events while in drag mode, but still clear input value
    if (hiddenInput.value) hiddenInput.value.value = ''
    return
  }
  const ie = e as InputEvent
  const type = ie.inputType as string | undefined
  // Handle character insertion from soft keyboards (Android/iOS)
  if (type === 'insertText') {
    const data = stripDiacritics(((ie as any).data || ''))
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
    emitSnapshot()
    emit('check-answer')
  }
  // Always clear the hidden input value so it doesn't accumulate text
  if (hiddenInput.value) hiddenInput.value.value = ''
}

const handleInput = (e: Event) => {
  // Clear any stray value in the hidden input
  if (isComposing.value) return
  if (hiddenInput.value) hiddenInput.value.value = ''
}

// IME composition handlers to prevent retroactive edits to previous letters
const onCompositionStart = () => {
  isComposing.value = true
  compositionBuffer = ''
}

const onCompositionUpdate = (e: CompositionEvent) => {
  // Keep a sanitized view of current composition text
  const data = (e.data || '').toString()
  compositionBuffer = stripDiacritics(data)
}

const onCompositionEnd = (e: CompositionEvent) => {
  // Finalize composition and insert letters sequentially without changing previous ones
  const dataRaw = (e.data || hiddenInput.value?.value || '').toString()
  const finalized = stripDiacritics(dataRaw).toUpperCase()
  for (const ch of finalized) {
    if (!/^[A-Z]$/.test(ch)) continue
    const idx = nextEditableIndex()
    if (idx === -1) break
    slots.value[idx].char = ch
  }
  pushAnswer()
  if (hiddenInput.value) hiddenInput.value.value = ''
  compositionBuffer = ''
  isComposing.value = false
}

// Determines if all editable, non-separator slots are filled
const allEditableFilled = () => {
  return slots.value.every(s => s.fixed || s.separator || !!s.char)
}

// In drag mode, auto-check when all letters are filled
const maybeAutoCheck = () => {
  if (dragMode.value && !props.pictionaryAnswered && allEditableFilled()) {
    emitSnapshot()
    emit('check-answer')
  }
}

watch(() => props.card, (c) => {
  imageError.value = false
  if (c?.word) buildSlots(c.word)
  // Focus on new card in typing mode
  ensureFocusIfNeeded()
})

onMounted(() => {
  if (props.card?.word) buildSlots(props.card.word)
  focusInput()
  // As a safeguard, re-focus on visibility regain (e.g., after dialogs)
  document.addEventListener('visibilitychange', ensureFocusIfNeeded)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', ensureFocusIfNeeded)
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
  // When answered correctly, pronounce the word using project voice settings
  if (newVal && props.pictionaryCorrect && props.card?.word) {
    // Fire and forget; ignore errors if TTS unsupported
    Promise.resolve(playAudio(props.card.word)).catch(() => {})
  }
  if (newVal) {
    // Hide caret when answered
    isFocused.value = false
  }
  // When the answer state resets (moving to next card), restore focus
  if (!newVal) {
    ensureFocusIfNeeded()
  }
})

// Drag & drop helpers (top-level)
const toggleDragMode = () => {
  dragMode.value = !dragMode.value
  if (!dragMode.value) {
    // when leaving drag mode, allow typing focus
    focusInput()
  } else {
    // leaving focus to avoid showing caret
    isFocused.value = false
  }
}

const onLetterDragStart = (ch: string, ev: DragEvent) => {
  ev.dataTransfer?.setData('text/plain', ch)
  ev.dataTransfer?.setDragImage?.(createDragImage(ch), 12, 12)
}

const onSlotDragOver = (idx: number, _ev: DragEvent) => {
  // Only allow drop on editable and non-fixed slots
  const s = slots.value[idx]
  if (!s || s.fixed || s.separator) return
}

const onSlotDrop = (idx: number, ev: DragEvent) => {
  const s = slots.value[idx]
  if (!s || s.fixed || s.separator) return
  const ch = (ev.dataTransfer?.getData('text/plain') || '').toUpperCase()
  if (/^[A-Z]$/.test(ch)) {
    s.char = ch
    pushAnswer()
    // Clear search query after successfully placing a letter
    clearLetterQuery()
    // After filling a letter via drag, auto-check if all slots are filled in drag mode
    maybeAutoCheck()
  }
}

const onSlotClick = (idx: number) => {
  const s = slots.value[idx]
  if (!s || s.separator || s.fixed) return
  if (dragMode.value) {
    // In drag mode: click toggles clear if filled
    if (s.char) {
      s.char = ''
      pushAnswer()
    }
  } else {
    // typing mode focuses input
    focusInput()
  }
}

// Create a lightweight drag image element
const createDragImage = (ch: string) => {
  const el = document.createElement('div')
  el.textContent = ch
  el.style.position = 'absolute'
  el.style.top = '-1000px'
  el.style.left = '-1000px'
  el.style.padding = '6px 8px'
  el.style.fontWeight = '700'
  el.style.fontSize = '16px'
  el.style.borderRadius = '8px'
  el.style.background = 'rgba(37,99,235,0.15)'
  el.style.color = '#1D4ED8'
  el.style.border = '1px solid rgba(37,99,235,0.35)'
  document.body.appendChild(el)
  setTimeout(() => document.body.removeChild(el), 0)
  return el
}
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
