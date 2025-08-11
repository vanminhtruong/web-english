import { ref } from 'vue'
import type { ISnakeGameEngine, ISnakeStateManager, ISnakeCanvasRenderer } from './types'

class SnakeGameEngine implements ISnakeGameEngine {
  gameLoopId = ref<number | null>(null)
  private lastTimestamp: number = 0
  private accumulatorMs: number = 0

  startGameLoop(stateManager: ISnakeStateManager, renderer: ISnakeCanvasRenderer) {
    if (this.gameLoopId.value) return

    this.lastTimestamp = performance.now()
    this.accumulatorMs = 0

    const frame = (ts: number) => {
      const dt = ts - this.lastTimestamp
      this.lastTimestamp = ts
      this.accumulatorMs += dt

      // Move the snake at its configured interval (can move multiple times if lag)
      while (
        stateManager.gameRunning.value &&
        !stateManager.gameOver.value &&
        this.accumulatorMs >= stateManager.gameSpeed.value
      ) {
        stateManager.moveSnake()
        this.accumulatorMs -= stateManager.gameSpeed.value
      }

      // Always render every frame for smooth particle animation
      renderer.render(stateManager)

      if (stateManager.gameRunning.value && !stateManager.gameOver.value) {
        this.gameLoopId.value = requestAnimationFrame(frame)
      } else {
        this.gameLoopId.value = null
      }
    }

    this.gameLoopId.value = requestAnimationFrame(frame)
  }

  stopGameLoop() {
    if (this.gameLoopId.value) {
      cancelAnimationFrame(this.gameLoopId.value)
      this.gameLoopId.value = null
    }
  }
}

export default SnakeGameEngine
