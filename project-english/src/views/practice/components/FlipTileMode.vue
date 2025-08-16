<template>
  <div
    class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[560px] select-none"
    @copy.prevent
    @cut.prevent
    @contextmenu.prevent
    @mousedown="enforceInputFocus"
  >
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Category Badge -->
      <div class="mb-4 flex items-center justify-center gap-3">
        <span class="px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
          {{ card?.category ? getTopicName(card.category) : '' }}
        </span>
        <!-- Flipped tiles counter -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-600 dark:text-white/70">
            {{ t('flashcard.flipTile.tilesFlipped', 'Tiles flipped') }}: {{ flippedCount }}/{{ maxFlips }}
          </span>
        </div>
      </div>

      <!-- Hint Display: Image or Definition -->
      <div class="flex-1 flex items-center justify-center mb-4 min-h-0">
        <!-- Show image if available -->
        <div v-if="card?.image" class="relative">
          <img
            :src="card.image"
            :alt="t('flashcard.flipTile.imageAlt', 'Flip tile image')"
            class="max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute filter blur-sm"
            @error="handleImageError"
          />
          <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ t('flashcard.image.imageError', 'Could not load image.') }}</p>
            </div>
          </div>
        </div>
        <!-- Fallback to definition if no image -->
        <div v-else-if="card?.meaning" class="flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6 w-full max-w-lg border border-teal-200 dark:border-teal-700/50 shadow-sm">
          <div class="text-center space-y-3">
            <div class="mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-800/50 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="max-h-32 overflow-y-auto">
              <p class="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                {{ card?.meaning || t('flashcard.flipTile.noDefinition', 'No definition available') }}
              </p>
            </div>
          </div>
        </div>
        <!-- No content fallback -->
        <div v-else class="flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm">
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ t('flashcard.flipTile.noContent', 'No content available for this card.') }}</p>
          </div>
        </div>
      </div>

      <!-- Letter tiles -->
      <div class="flex-shrink-0 mb-4">
        <div class="flex flex-wrap gap-3 justify-center items-center">
          <div v-for="(tile, idx) in tiles" :key="idx">
            <div v-if="tile.separator" class="px-1 text-lg text-gray-700 dark:text-white/80 select-none">
              {{ tile.char }}
            </div>
            <div
              v-else
              class="relative w-12 h-14 sm:w-14 sm:h-16 transition-all duration-500 tile-3d"
              :class="[ { 'cursor-pointer': !tile.flipped && canFlipMore }, tile.flipped ? 'is-flipped' : 'hover:shadow-xl hover:scale-105' ]"
              @click="onTileClick(idx)"
            >
              <!-- Front face (hidden) -->
              <div 
                class="tile-face absolute inset-0 flex items-center justify-center rounded-lg border-2 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 border-blue-400 dark:border-blue-500 shadow-lg"
              >
                <div class="text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>

              <!-- Back face (revealed) -->
              <div 
                class="tile-face tile-back absolute inset-0 flex items-center justify-center rounded-lg border-2 bg-white dark:bg-dark-bg-soft border-green-400 dark:border-green-500 shadow-lg text-2xl font-bold text-gray-900 dark:text-white"
              >
                {{ tile.char.toUpperCase() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Answer Input -->
      <div v-if="!flipTileAnswered" class="flex-shrink-0 mb-4">
        <div class="max-w-md mx-auto">
          <div class="relative">
            <input
              ref="answerInput"
              v-model="userAnswer"
              type="text"
              :placeholder="t('flashcard.flipTile.answerPlaceholder', 'Type your answer...')"
              class="w-full px-4 py-3 text-lg font-medium text-center rounded-xl border-2 bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/50 transition-all duration-200"
              :disabled="flipTileAnswered"
              @keydown.enter="checkAnswer"
              @input="onAnswerInput"
            />
            <button
              v-if="userAnswer.trim()"
              @click="checkAnswer"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              {{ t('flashcard.flipTile.check', 'Check') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div v-if="flipTileAnswered" class="text-center space-y-2 max-h-32 overflow-y-auto">
        <div
          :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            flipTileCorrect
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
          ]"
        >
          <svg v-if="flipTileCorrect" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          {{ flipTileCorrect ? t('common.correct', 'Correct') : t('common.incorrect', 'Incorrect') }}
        </div>
        <div v-if="!flipTileCorrect" class="text-center">
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
      <p v-if="!flipTileAnswered" class="text-center text-sm text-gray-500 dark:text-white/60 mt-3">
        {{ t('flashcard.flipTile.instruction', `Click on tiles to reveal letters (max ${maxFlips}), then type your answer and press Enter.`) }}
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
import { ref, watch, onMounted, defineAsyncComponent, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { useVoiceStore } from '../../../stores/voiceStore'

interface Props {
  card: Vocabulary | null
  flipTileAnswer: string
  flipTileAnswered: boolean
  flipTileCorrect: boolean
  getTopicName: (id: string) => string
}

interface Emits {
  (e: 'update:flip-tile-answer', value: string): void
  (e: 'check-answer'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()
const { playAudio } = useVoiceStore()

const imageError = ref(false)
const answerInput = ref<HTMLInputElement | null>(null)
const userAnswer = ref('')

// Import effect component lazily
const FireworkSoundEffect = defineAsyncComponent(() => import('./FireworkSoundEffect.vue'))
// Effect triggers
const triggerFirework = ref(false)
const triggerSound = ref(false)
const isCorrectAnswer = ref(false)
const fireworkEffect = ref()

type Tile = { char: string; flipped: boolean; separator?: boolean }
const tiles = ref<Tile[]>([])

const normalizeWord = (w: string) => w.normalize('NFKC')

const buildTiles = (word: string) => {
  const letters = normalizeWord(word)
  const arr: Tile[] = []
  const isAlpha = (c: string) => /^[a-z]$/i.test(c)

  for (let i = 0; i < letters.length; i++) {
    const c = letters[i]
    if (!isAlpha(c)) {
      // keep separators (space, hyphen, apostrophe)
      arr.push({ char: c, flipped: true, separator: true })
      continue
    }
    // All alphabetic characters start as hidden (not flipped)
    arr.push({ char: c, flipped: false })
  }
  tiles.value = arr
}

const flippedCount = computed(() => {
  return tiles.value.filter(tile => tile.flipped && !tile.separator).length
})

// Total letter tiles (exclude separators like space, hyphen, etc.)
const totalLetterTiles = computed(() => tiles.value.filter(tile => !tile.separator).length)

// Dynamic max flips: if word has 4 letters or fewer, allow only 1 flip; otherwise allow 2 flips
const maxFlips = computed(() => (totalLetterTiles.value <= 4 ? 1 : 2))

const canFlipMore = computed(() => flippedCount.value < maxFlips.value)

const onTileClick = (idx: number) => {
  const tile = tiles.value[idx]
  if (!tile || tile.separator || tile.flipped || props.flipTileAnswered) return
  
  if (canFlipMore.value) {
    tile.flipped = true
  }
}

const onAnswerInput = () => {
  emit('update:flip-tile-answer', userAnswer.value)
}

const checkAnswer = () => {
  if (!userAnswer.value.trim()) return
  emit('check-answer')
}

const handleImageError = () => {
  imageError.value = true
}

// Reset effect triggers
const resetTriggers = () => {
  triggerFirework.value = false
  triggerSound.value = false
}

// Watch answer completion to trigger effects
watch(() => props.flipTileAnswered, (newVal) => {
  if (newVal) {
    // Reveal all remaining tiles regardless of correctness
    tiles.value.forEach(tile => {
      if (!tile.separator) tile.flipped = true
    })

    if (!triggerFirework.value) {
      isCorrectAnswer.value = props.flipTileCorrect
      setTimeout(() => {
        triggerFirework.value = true
        triggerSound.value = true
      }, 50)
    }
  }
  // When answered correctly, pronounce the word using project voice settings
  if (newVal && props.flipTileCorrect && props.card?.word) {
    // Fire and forget; ignore errors if TTS unsupported
    Promise.resolve(playAudio(props.card.word)).catch(() => {})
  }
})

// Watch for new card
watch(() => props.card, (c) => {
  imageError.value = false
  userAnswer.value = ''
  if (c?.word) {
    buildTiles(c.word)
  }
  // Focus input on new card
  nextTick(() => {
    answerInput.value?.focus()
  })
})

// Watch flip tile answer from parent
watch(() => props.flipTileAnswer, (newVal) => {
  if (newVal !== userAnswer.value) {
    userAnswer.value = newVal
  }
})

onMounted(() => {
  if (props.card?.word) {
    buildTiles(props.card.word)
  }
  nextTick(() => {
    answerInput.value?.focus()
  })
})

// Keep input focused regardless of where the user clicks inside the component (when not answered)
const enforceInputFocus = () => {
  if (!props.flipTileAnswered) {
    // Defer to allow other click handlers (e.g., tile flip) to run first
    setTimeout(() => {
      answerInput.value?.focus()
    }, 0)
  }
}
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.rotate-y-0 {
  transform: rotateY(0deg);
}

/* Flip tile container and faces */
.tile-3d {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.tile-3d.is-flipped {
  transform: rotateY(180deg);
}

.tile-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari */
}

.tile-back {
  transform: rotateY(180deg);
}

/* Add 3D flip animation support */
@media (prefers-reduced-motion: no-preference) {
  .preserve-3d {
    perspective: 1000px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preserve-3d {
    perspective: none;
  }
  
  .rotate-y-180,
  .rotate-y-0 {
    transform: none;
  }
}
</style>
