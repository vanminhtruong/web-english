import type { Vocabulary } from '../../../../composables/useVocabularyStore'
import SnakeStateManager from './SnakeStateManager'
import SnakeCanvasRenderer from './SnakeCanvasRenderer'
import SnakeGameEngine from './SnakeGameEngine'
import type { ISnakeGame, ISnakeStateManager, ISnakeCanvasRenderer, ISnakeGameEngine } from './types'

class SnakeGame implements ISnakeGame {
  stateManager: ISnakeStateManager
  canvasRenderer: ISnakeCanvasRenderer
  gameEngine: ISnakeGameEngine

  constructor() {
    this.stateManager = new SnakeStateManager()
    this.canvasRenderer = new SnakeCanvasRenderer()
    this.gameEngine = new SnakeGameEngine()
  }

  initialize(canvas: HTMLCanvasElement, words: Vocabulary[], vietnameseMode: boolean = false) {
    this.canvasRenderer.initialize(canvas)
    this.stateManager.resetGame()
    this.stateManager.generateFood(words, vietnameseMode)
    this.canvasRenderer.render(this.stateManager)
  }

  startGame() {
    if (this.stateManager.gameRunning.value) return
    
    this.stateManager.setGameRunning(true)
    // Start moving right
    this.stateManager.updateDirection({ x: 1, y: 0 })
    this.gameEngine.startGameLoop(this.stateManager, this.canvasRenderer)
  }

  stopGame() {
    this.stateManager.setGameRunning(false)
    this.gameEngine.stopGameLoop()
  }

  handleKeyPress(event: KeyboardEvent) {
    if (!this.stateManager.gameRunning.value || this.stateManager.gameOver.value) return

    const directions = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 }
    }

    const direction = directions[event.key as keyof typeof directions]
    if (direction) {
      event.preventDefault()
      this.stateManager.updateDirection(direction)
    }
  }

  updateVietnameseMode(_vietnameseMode: boolean) {
    // Regenerate food with new mode if game is running
    if (this.stateManager.gameRunning.value && this.stateManager.food.value) {
      // We need words to regenerate food, but we don't store them in state
      // This will be handled by the component when mode changes
    }
  }

  cleanup() {
    this.stopGame()
  }
}

export default SnakeGame

export function useSnakeGameFactory(): ISnakeGame {
  return new SnakeGame()
}
