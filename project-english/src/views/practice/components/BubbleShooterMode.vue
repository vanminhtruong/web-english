<template>
  <div class="bubble-shooter-game h-full flex flex-col">
    <!-- Game Header -->
    <div class="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 text-white">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold">{{ t('flashcard.bubbleShooter.title', 'Bubble Shooter') }}</h2>
          <p class="text-sm sm:text-base opacity-90">{{ t('flashcard.bubbleShooter.instruction', 'Shoot bubbles to match 4 or more words!') }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl sm:text-3xl font-bold">{{ score }}</div>
          <div class="text-xs sm:text-sm opacity-90">{{ t('flashcard.bubbleShooter.score', 'Score') }}</div>
        </div>
      </div>
    </div>

    <!-- Game Area -->
    <div class="flex-1 relative bg-gradient-to-b from-blue-100 to-blue-200 dark:from-[#0a0a0a] dark:to-[#0f0f0f] overflow-hidden">
      <canvas
        ref="gameCanvas"
        class="w-full h-full cursor-crosshair"
        @click="shootBubble"
        @mousemove="updateAim"
      ></canvas>
      
      <!-- Aim Line -->
      <svg 
        v-if="aimLine.visible"
        class="absolute inset-0 w-full h-full pointer-events-none"
        :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
      >
        <line 
          :x1="shooterPosition.x" 
          :y1="shooterPosition.y"
          :x2="aimLine.x" 
          :y2="aimLine.y"
          stroke="rgba(255,255,255,0.7)" 
          stroke-width="2" 
          stroke-dasharray="5,5"
        />
      </svg>

      <!-- Current Word Display -->
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-2 shadow-lg border-2 border-purple-500">
        <div class="text-center">
          <div class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{{ currentShooterWord }}</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-white/70">{{ t('flashcard.bubbleShooter.currentWord', 'Current Word') }}</div>
        </div>
      </div>

      <!-- Game Over Modal -->
      <transition name="modal" appear>
        <div v-if="gameOver" class="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-[#0f0f0f]">
            <!-- Animated Success Icon -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <h3 class="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {{ t('flashcard.bubbleShooter.gameComplete', 'Game Complete!') }}
            </h3>
            <p class="text-gray-600 dark:text-white/70 mb-4">
              {{ t('flashcard.bubbleShooter.finalScore', { score }) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-white/60 mb-6">
              {{ t('flashcard.bubbleShooter.wordsMatched', { count: wordsMatched }) }}
            </p>
            
            <div class="flex gap-3 justify-center">
              <button 
                @click="restartGame"
                class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
              >
                {{ t('flashcard.bubbleShooter.playAgain', 'Play Again') }}
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
import { useBubbleShooterGame, type IBubbleShooterGame, type Bubble } from '../composables/bubble-shooter'

interface Props {
  words: Vocabulary[]
  vietnameseMode?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
  'game-complete': []
}>()

// Initialize main game controller with OOP pattern
const game: IBubbleShooterGame = useBubbleShooterGame()

// Expose reactive properties for template binding (keeping original interface)
const gameCanvas = ref<HTMLCanvasElement>()
const canvasWidth = computed(() => game.canvasRenderer.canvasWidth.value)
const canvasHeight = computed(() => game.canvasRenderer.canvasHeight.value)
const score = computed(() => game.stateManager.score.value)
const wordsMatched = computed(() => game.stateManager.wordsMatched.value)
const gameOver = computed(() => game.stateManager.gameOver.value)
const currentShooterWord = computed(() => game.stateManager.currentShooterWord.value)
const aimLine = computed(() => game.stateManager.aimLine.value)
const shooterPosition = computed(() => game.stateManager.shooterPosition.value)

// Watch for game over to emit completion event
const stopGameOverWatch = watch(
  () => game.stateManager.gameOver.value,
  (isGameOver) => {
    if (isGameOver) {
      emit('game-complete')
    }
  }
)

onMounted(async () => {
  await nextTick()
  if (!gameCanvas.value) return
  game.initialize(gameCanvas.value, props.words, props.vietnameseMode)
})

// Watch for Vietnamese mode changes during gameplay
watch(() => props.vietnameseMode, (newValue) => {
  game.updateVietnameseMode(newValue ?? false)
})

onUnmounted(() => {
  stopGameOverWatch()
  game.cleanup()
})

const updateAim = (event: MouseEvent) => {
  game.updateAim(event)
}

const shootBubble = (event: MouseEvent) => {
  game.shootBubble(event)
}

const restartGame = () => {
  game.stopGameLoop()
  game.stateManager.resetGame()
  if (gameCanvas.value) {
    game.initialize(gameCanvas.value, props.words)
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.bubble-shooter-game {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
