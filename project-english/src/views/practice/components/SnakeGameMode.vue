<template>
  <div class="snake-game h-full min-h-[600px] sm:min-h-[500px] md:min-h-0 flex flex-col">
    <!-- Game Header -->
    <div class="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-800 dark:to-emerald-800 text-white">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold">{{ t('flashcard.snakeGame.title', 'Snake Hunt') }}</h2>
          <p class="text-sm sm:text-base opacity-90">{{ t('flashcard.snakeGame.instruction', 'Guide the snake to catch vocabulary letters!') }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl sm:text-3xl font-bold">{{ score }}</div>
          <div class="text-xs sm:text-sm opacity-90">{{ t('flashcard.snakeGame.score', 'Score') }}</div>
        </div>
      </div>
    </div>

    <!-- Game Area -->
    <div class="flex-1 min-h-[450px] sm:min-h-[350px] md:min-h-0 relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#0a0a0a] dark:to-[#0f0f0f] overflow-hidden">
      <canvas
        ref="gameCanvas"
        class="w-full h-full border-2 border-gray-300 dark:border-[#0f0f0f]"
        tabindex="0"
        @keydown="handleKeyPress"
      ></canvas>
      
      <!-- Current Target Word Display (on snake head) -->
      <div 
        v-if="currentTargetWord && gameRunning && !gameOver"
        class="absolute bg-white dark:bg-[#0a0a0a] rounded-lg px-3 py-2 shadow-lg border-2 border-green-500 pointer-events-none"
        :style="snakeHeadDisplayStyle"
      >
        <div class="text-center">
          <div class="text-sm sm:text-base font-bold text-gray-800 dark:text-white">{{ currentTargetWord }}</div>
          <div v-if="currentTargetPronunciationDisplay" class="text-xs sm:text-sm text-gray-700 dark:text-white/80">{{ currentTargetPronunciationDisplay }}</div>
          <div class="text-[11px] sm:text-xs text-gray-600 dark:text-white/70">{{ t('flashcard.snakeGame.target', 'Target') }}</div>
        </div>
      </div>

      <!-- Controls Instruction -->
      <div v-if="!gameRunning && !gameOver" class="absolute top-4 left-4 bg-white/90 dark:bg-[#0a0a0a]/90 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-sm text-gray-700 dark:text-white">
          <div class="font-semibold mb-1">{{ t('flashcard.snakeGame.controls', 'Controls') }}:</div>
          <div class="text-xs space-y-1">
            <div>{{ t('flashcard.snakeGame.arrowKeys', 'Arrow Keys / WASD') }}</div>
            <div>{{ t('flashcard.snakeGame.clickToStart', 'Click START to begin') }}</div>
          </div>
        </div>
      </div>

      <!-- Game Stats -->
      <div class="absolute top-4 right-4 bg-white/90 dark:bg-[#0a0a0a]/90 rounded-lg p-3 backdrop-blur-sm">
        <div class="text-center text-sm">
          <div class="text-xs text-gray-600 dark:text-white/70">{{ t('flashcard.snakeGame.completed', 'Completed') }}</div>
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ wordsCompleted }}</div>
        </div>
      </div>

      <!-- Start Game Button -->
      <div v-if="!gameRunning && !gameOver" class="absolute inset-0 flex items-center justify-center">
        <button 
          @click="startGame"
          class="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-200 shadow-2xl"
        >
          {{ t('flashcard.snakeGame.start', 'START HUNT') }}
        </button>
      </div>

      <!-- Touch Controls (visible on xs/sm/md only) -->
      <div
        class="lg:hidden absolute bottom-3 left-0 right-0 flex items-center justify-center select-none"
        aria-hidden="false"
      >
        <div class="inline-flex flex-col items-center gap-2 bg-white/90 dark:bg-[#0a0a0a]/90 border border-gray-200 dark:border-[#0f0f0f] rounded-xl p-3 shadow-lg">
          <!-- Up -->
          <button
            type="button"
            :aria-label="t('flashcard.snakeGame.up', 'Up')"
            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition"
            @click="changeDirection(0, -1)"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 4a.75.75 0 01.53.22l5 5a.75.75 0 11-1.06 1.06L10.75 6.56V16a.75.75 0 01-1.5 0V6.56L5.53 10.28a.75.75 0 01-1.06-1.06l5-5A.75.75 0 0110 4z" clip-rule="evenodd"/></svg>
          </button>
          <!-- Middle row: Left / Down / Right -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              :aria-label="t('flashcard.snakeGame.left', 'Left')"
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition"
              @click="changeDirection(-1, 0)"
            >
              <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 10a.75.75 0 01.22-.53l5-5a.75.75 0 111.06 1.06L6.56 9.25H16a.75.75 0 010 1.5H6.56l3.72 3.72a.75.75 0 11-1.06 1.06l-5-5A.75.75 0 014 10z" clip-rule="evenodd"/></svg>
            </button>
            <button
              type="button"
              :aria-label="t('flashcard.snakeGame.down', 'Down')"
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition"
              @click="changeDirection(0, 1)"
            >
              <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 16a.75.75 0 01-.53-.22l-5-5a.75.75 0 111.06-1.06l3.72 3.72V4a.75.75 0 011.5 0v9.44l3.72-3.72a.75.75 0 111.06 1.06l-5 5A.75.75 0 0110 16z" clip-rule="evenodd"/></svg>
            </button>
            <button
              type="button"
              :aria-label="t('flashcard.snakeGame.right', 'Right')"
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow active:scale-95 transition"
              @click="changeDirection(1, 0)"
            >
              <svg class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16 10a.75.75 0 01-.22.53l-5 5a.75.75 0 11-1.06-1.06l3.72-3.72H4a.75.75 0 010-1.5h9.44L9.72 5.53a.75.75 0 111.06-1.06l5 5c.14.14.22.33.22.53z" clip-rule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Game Over Modal -->
      <transition name="modal" appear>
        <div v-if="gameOver" class="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-[#0f0f0f]">
            <!-- Animated Success Icon -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <h3 class="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {{ t('flashcard.snakeGame.gameComplete', 'Hunt Complete!') }}
            </h3>
            <p class="text-gray-600 dark:text-white/70 mb-4">
              {{ t('flashcard.snakeGame.finalScore', { score }, `Final Score: ${score}`) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-white/60 mb-6">
              {{ t('flashcard.snakeGame.wordsHunted', { count: wordsCompleted }, `Words hunted: ${wordsCompleted}`) }}
            </p>
            
            <div class="flex gap-3 justify-center">
              <button 
                @click="restartGame"
                class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
              >
                {{ t('flashcard.snakeGame.playAgain', 'Hunt Again') }}
              </button>
              <button 
                @click="$emit('game-complete')"
                class="px-6 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-[#0f0f0f] dark:hover:bg-[#1a1a1a] text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
              >
                {{ t('common.finish', 'Finish') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'
import { useSnakeGame, type ISnakeGame } from '../composables/snake-game'
import { useVoiceStore } from '../../../stores/voiceStore'

interface Props {
  words: Vocabulary[]
  vietnameseMode?: boolean
  // Enable dual-food mode (correct + incorrect bait)
  doubleBaitMode?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
  'game-complete': []
  'correct-food-eaten': []
  'wrong-food-eaten': []
}>()

// Initialize main game controller with OOP pattern
const game: ISnakeGame = useSnakeGame()

// Expose reactive properties for template binding
const gameCanvas = ref<HTMLCanvasElement>()
const canvasWidth = computed(() => game.canvasRenderer.canvasWidth.value)
const canvasHeight = computed(() => game.canvasRenderer.canvasHeight.value)
const gridSize = computed(() => game.canvasRenderer.gridSize.value)
const score = computed(() => game.stateManager.score.value)
const wordsCompleted = computed(() => game.stateManager.wordsCompleted.value)
const gameOver = computed(() => game.stateManager.gameOver.value)
const gameRunning = computed(() => game.stateManager.gameRunning.value)
const currentTargetWord = computed(() => game.stateManager.currentTargetWord.value)
const snakeHead = computed(() => game.stateManager.snake.value.body[0])

// Calculate snake head position for word display
const snakeHeadDisplayStyle = computed(() => {
  if (!snakeHead.value || !gameRunning.value) {
    return { display: 'none' }
  }
  
  const x = snakeHead.value.x * gridSize.value + gridSize.value / 2
  const y = snakeHead.value.y * gridSize.value - 40 // Above the head
  
  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translateX(-50%)',
    zIndex: '10'
  }
})

// Resolve pronunciation for the current target word
const currentTargetPronunciation = computed(() => {
  const w = currentTargetWord.value
  if (!w) return ''
  const found = props.words.find(v => v.word === w)
  return found?.pronunciation || ''
})

// Display pronunciation with exactly one leading and trailing slash
const currentTargetPronunciationDisplay = computed(() => {
  const raw = (currentTargetPronunciation.value || '').trim()
  if (!raw) return ''
  // Remove any leading/trailing slashes, brackets or whitespace
  const stripped = raw.replace(/^\s*[\/\[\]()]+|[\/\[\]()]+\s*$/g, '')
  return stripped ? `/${stripped}/` : ''
})

// Emit events whenever correct or wrong eaten counters increment
const prevWordsCompleted = ref<number>(0)
const stopWordsWatch = watch(
  () => game.stateManager.wordsCompleted.value,
  (newVal, oldVal) => {
    if (typeof oldVal === 'number' && newVal > oldVal) {
      emit('correct-food-eaten')
      // Speak the eaten word using selected voice
      const last = (game.stateManager as any).lastEatenWord?.value as string | undefined
      if (last) {
        const { playAudio } = useVoiceStore()
        // Fire and forget; internal store handles support/errors
        playAudio(last).catch(() => {})
      }
    }
    prevWordsCompleted.value = newVal
  }
)

// Watch wrong eaten counter
const prevWrongEaten = ref<number>(0)
const stopWrongWatch = watch(
  // wrongEatenCount was added to state manager for double bait mode
  () => (game.stateManager as any).wrongEatenCount?.value,
  (newVal, oldVal) => {
    if (typeof newVal === 'number' && typeof oldVal === 'number' && newVal > oldVal) {
      emit('wrong-food-eaten')
      // Speak the eaten word (wrong pick) too
      const last = (game.stateManager as any).lastEatenWord?.value as string | undefined
      if (last) {
        const { playAudio } = useVoiceStore()
        playAudio(last).catch(() => {})
      }
    }
    if (typeof newVal === 'number') prevWrongEaten.value = newVal
  }
)

// Watch for game over to emit completion event
const stopGameOverWatch = watch(
  () => game.stateManager.gameOver.value,
  (isGameOver) => {
    if (isGameOver) {
      emit('game-complete')
    }
  }
)

// Watch for Vietnamese mode changes during gameplay
watch(() => props.vietnameseMode, (newValue) => {
  game.updateVietnameseMode(newValue ?? false)
  // Regenerate food with new mode
  if (game.stateManager.gameRunning.value) {
    game.stateManager.generateFood(props.words, newValue ?? false)
  }
})

// Watch for double bait mode changes and update state manager
watch(() => props.doubleBaitMode, (enabled) => {
  if ((game.stateManager as any).setDoubleBaitMode) {
    ;(game.stateManager as any).setDoubleBaitMode(!!enabled, props.words, props.vietnameseMode ?? false)
  }
})

// Focus canvas for keyboard events
const focusCanvas = () => {
  if (gameCanvas.value) {
    gameCanvas.value.focus()
  }
}

const startGame = () => {
  game.startGame()
  focusCanvas()
}

const restartGame = () => {
  game.stopGame()
  game.stateManager.resetGame()
  if (gameCanvas.value) {
    game.initialize(gameCanvas.value, props.words, props.vietnameseMode)
    // Re-apply double bait mode on restart so both foods show immediately if enabled
    if ((game.stateManager as any).setDoubleBaitMode) {
      ;(game.stateManager as any).setDoubleBaitMode(!!props.doubleBaitMode, props.words, props.vietnameseMode ?? false)
    }
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  game.handleKeyPress(event)
}

// Touch controls direction change
const changeDirection = (dx: number, dy: number) => {
  if (gameOver.value) return
  // If not running, start the game first then set desired direction
  const notRunning = !gameRunning.value
  if (notRunning) {
    game.startGame()
  }
  game.stateManager.updateDirection({ x: dx, y: dy })
}

onMounted(async () => {
  await nextTick()
  if (!gameCanvas.value) return
  
  game.initialize(gameCanvas.value, props.words, props.vietnameseMode)
  // Initialize double bait mode on mount
  if ((game.stateManager as any).setDoubleBaitMode) {
    ;(game.stateManager as any).setDoubleBaitMode(!!props.doubleBaitMode, props.words, props.vietnameseMode ?? false)
  }
  
  // Add global keyboard listener
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  stopGameOverWatch()
  stopWordsWatch()
  stopWrongWatch()
  document.removeEventListener('keydown', handleKeyPress)
  game.cleanup()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.snake-game {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

canvas:focus {
  outline: 2px solid #10b981;
  outline-offset: -2px;
}
</style>
