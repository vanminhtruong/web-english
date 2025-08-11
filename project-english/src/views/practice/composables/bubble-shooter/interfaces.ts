import type { Ref } from 'vue'
import type { Vocabulary } from '@/composables/useVocabularyStore'

// Core Game Entities
export interface Bubble {
  x: number
  y: number
  word: string
  color: string
  id: string
  row: number
  col: number
  vietnameseMeaning?: string // For Vietnamese mode display
  displayText?: string // Text currently being displayed (English or Vietnamese first letter)
  isBomb?: boolean // Special bomb bubble that triggers massive explosion
  // Stable positions for collision detection during animations
  stableX?: number // Grid-based X position for collision
  stableY?: number // Grid-based Y position for collision
}

export interface AimLine {
  visible: boolean
  x: number
  y: number
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: 'spark' | 'burst' | 'glow'
  rotation: number
  rotationSpeed: number
}

export interface Explosion {
  x: number
  y: number
  particles: Particle[]
  active: boolean
  shockwave: {
    radius: number
    maxRadius: number
    intensity: number
  }
}

export interface Position {
  x: number
  y: number
}

export interface ScreenShake {
  x: number
  y: number
  intensity: number
}

// Game State Interface
export interface IGameStateManager {
  // State
  readonly score: Ref<number>
  readonly wordsMatched: Ref<number>
  readonly gameOver: Ref<boolean>
  readonly bubbles: Ref<Bubble[]>
  readonly shootingBubble: Ref<Bubble | null>
  readonly currentShooterWord: Ref<string>
  readonly currentShooterColor: Ref<string>
  readonly explosions: Ref<Explosion[]>
  readonly particles: Ref<Particle[]>
  readonly screenShake: Ref<ScreenShake>
  readonly aimLine: Ref<AimLine>
  readonly shooterPosition: Ref<Position>
  readonly rowAnimationActive: Ref<boolean>
  
  // Methods
  resetGame(): void
  updateScore(points: number): void
  incrementWordsMatched(): void
  setGameOver(gameOver: boolean): void
  setRowAnimationActive(active: boolean): void
  addBubble(bubble: Bubble): void
  removeBubbles(bubbleIds: string[]): void
  setShootingBubble(bubble: Bubble | null): void
  selectNextShooterWord(words: Vocabulary[]): void
  updateAimLine(position: Position | null): void
  addExplosion(explosion: Explosion): void
  updateExplosions(): void
  addScreenShake(intensity: number): void
  updateScreenShake(): void
}

// Audio System Interface
export interface IAudioSystem {
  playImpactSound(): void
  playExplosionSound(): void
  playBounceSound(): void
  playVocabularySound(text: string, language?: 'en' | 'vi'): void
  createAudioContext(): AudioContext | null
}

// Physics Engine Interface
export interface IPhysicsEngine {
  readonly BUBBLE_SIZE: number
  readonly COLORS: string[]
  
  animateShootingBubble(
    bubble: Bubble,
    vx: number,
    vy: number,
    onLand: (bubble: Bubble) => void,
    existingBubbles?: Bubble[],
    canvasWidth?: number,
    canvasHeight?: number
  ): void
  checkCollision(bubble1: Bubble, bubble2: Bubble): boolean
  snapToGrid(bubble: Bubble, existingBubbles: Bubble[]): void
  getColorForWord(word: string): string
  lightenColor(color: string, amount: number): string
}

// Visual Effects Interface
export interface IVisualEffects {
  createBounceEffect(x: number, y: number): Explosion
  createImpactEffect(x: number, y: number, color: string): Explosion
  createExplosion(x: number, y: number, color: string): Explosion
  updateParticles(particles: Particle[]): void
}

// Canvas Renderer Interface
export interface ICanvasRenderer {
  readonly canvasWidth: Ref<number>
  readonly canvasHeight: Ref<number>
  readonly gameCanvas: Ref<HTMLCanvasElement | undefined>
  
  initializeCanvas(): boolean
  clearCanvas(): void
  drawBubble(bubble: Bubble): void
  drawShooter(position: Position, word: string, color: string, displayText?: string): void
  drawShootingBubble(bubble: Bubble): void
  drawExplosions(explosions: Explosion[]): void
  drawAimLine(aimLine: AimLine, shooterPosition: Position): void
  drawBackground(): void
  setCanvasSize(width: number, height: number): void
}

// Input Handler Interface
export interface IInputHandler {
  updateAim(event: MouseEvent, canvas: HTMLCanvasElement): Position | null
  getShootingVector(
    event: MouseEvent, 
    canvas: HTMLCanvasElement, 
    shooterPosition: Position
  ): { vx: number; vy: number } | null
}

// Game Logic Interface
export interface IGameLogic {
  checkForMatches(newBubble: Bubble, bubbles: Bubble[]): {
    matchedBubbles: Bubble[]
    shouldRemove: boolean
  }
  removeFloatingBubbles(bubbles: Bubble[]): {
    remainingBubbles: Bubble[]
    removedBubbles: Bubble[]
  }
  setupInitialBubbles(words: Vocabulary[], vietnameseMode?: boolean): Bubble[]
  isGameWon(bubbles: Bubble[]): boolean
  calculateScore(matchedBubbles: number, floatingBubbles: number): number
}

// Main Game Controller Interface
export interface IBubbleShooterGame {
  // Dependencies
  readonly stateManager: IGameStateManager
  readonly audioSystem: IAudioSystem
  readonly physicsEngine: IPhysicsEngine
  readonly visualEffects: IVisualEffects
  readonly canvasRenderer: ICanvasRenderer
  readonly inputHandler: IInputHandler
  readonly gameLogic: IGameLogic
  
  // Main methods
  initialize(canvas: HTMLCanvasElement, words: Vocabulary[], vietnameseMode?: boolean): void
  startGameLoop(): void
  stopGameLoop(): void
  shootBubble(event: MouseEvent): void
  updateVietnameseMode(enabled: boolean): void
  updateAim(event: MouseEvent): void
  restartGame(words: Vocabulary[]): void
  cleanup(): void
}
