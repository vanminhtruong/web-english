import type { Ref } from 'vue'
import type { Vocabulary } from '../../../../composables/useVocabularyStore'

// Core data types
export interface Position {
  x: number
  y: number
}

export interface Food {
  position: Position
  word: string
  firstLetter: string
  meaning?: string
}

export interface Snake {
  body: Position[]
  direction: Position
  currentWord: string
}

// Public interfaces (OOP pattern)
export interface ISnakeStateManager {
  snake: Ref<Snake>
  food: Ref<Food | null>
  // Optional secondary food when double bait mode is enabled
  secondaryFood: Ref<Food | null>
  score: Ref<number>
  gameOver: Ref<boolean>
  gameRunning: Ref<boolean>
  currentTargetWord: Ref<string>
  wordsCompleted: Ref<number>
  gameSpeed: Ref<number>
  // Double bait toggle
  doubleBaitMode: Ref<boolean>
  // Count of wrong foods eaten (used to emit wrong-answer events)
  wrongEatenCount: Ref<number>
  // Position of the food just eaten (used to trigger explosion effect)
  lastEatenFoodPos: Ref<Position | null>
  resetGame(): void
  updateDirection(direction: Position): void
  moveSnake(): void
  generateFood(words: Vocabulary[], vietnameseMode: boolean): void
  checkCollision(): boolean
  checkFoodCollision(): boolean
  incrementScore(): void
  setGameOver(): void
  setGameRunning(running: boolean): void
  setDoubleBaitMode(enabled: boolean): void
}

export interface ISnakeCanvasRenderer {
  canvasWidth: Ref<number>
  canvasHeight: Ref<number>
  gridSize: Ref<number>
  initialize(canvas: HTMLCanvasElement): void
  render(stateManager: ISnakeStateManager): void
  clearCanvas(): void
}

export interface ISnakeGameEngine {
  gameLoopId: Ref<number | null>
  startGameLoop(stateManager: ISnakeStateManager, renderer: ISnakeCanvasRenderer): void
  stopGameLoop(): void
}

export interface ISnakeGame {
  stateManager: ISnakeStateManager
  canvasRenderer: ISnakeCanvasRenderer
  gameEngine: ISnakeGameEngine
  initialize(canvas: HTMLCanvasElement, words: Vocabulary[], vietnameseMode?: boolean): void
  startGame(): void
  stopGame(): void
  handleKeyPress(event: KeyboardEvent): void
  updateVietnameseMode(vietnameseMode: boolean): void
  cleanup(): void
}
