import { ref, computed, type Ref } from 'vue'
import type { Vocabulary } from '../../../../composables/useVocabularyStore'

// Snake Game Interfaces (OOP pattern)
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

export interface ISnakeStateManager {
  snake: Ref<Snake>
  food: Ref<Food | null>
  score: Ref<number>
  gameOver: Ref<boolean>
  gameRunning: Ref<boolean>
  currentTargetWord: Ref<string>
  wordsCompleted: Ref<number>
  gameSpeed: Ref<number>
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

// Snake State Manager Implementation
class SnakeStateManager implements ISnakeStateManager {
  snake = ref<Snake>({
    body: [{ x: 10, y: 10 }],
    direction: { x: 0, y: 0 },
    currentWord: ''
  })
  
  food = ref<Food | null>(null)
  score = ref(0)
  gameOver = ref(false)
  gameRunning = ref(false)
  currentTargetWord = ref('')
  wordsCompleted = ref(0)
  gameSpeed = ref(150) // milliseconds between moves
  lastEatenFoodPos = ref<Position | null>(null)

  private words: Vocabulary[] = []
  private vietnameseMode: boolean = false
  private usedWords: Set<string> = new Set()

  resetGame() {
    this.snake.value = {
      body: [{ x: 10, y: 10 }],
      direction: { x: 0, y: 0 },
      currentWord: ''
    }
    this.food.value = null
    this.score.value = 0
    this.gameOver.value = false
    this.gameRunning.value = false
    this.currentTargetWord.value = ''
    this.wordsCompleted.value = 0
    this.usedWords.clear()
    this.lastEatenFoodPos.value = null
  }

  updateDirection(direction: Position) {
    // Prevent reverse direction
    const currentDir = this.snake.value.direction
    if (direction.x !== -currentDir.x || direction.y !== -currentDir.y) {
      this.snake.value.direction = direction
    }
  }

  moveSnake() {
    if (!this.gameRunning.value || this.gameOver.value) return

    const snake = this.snake.value
    const head = { ...snake.body[0] }
    
    // Move head in current direction
    head.x += snake.direction.x
    head.y += snake.direction.y

    // Check wall collision
    if (this.checkCollision()) {
      this.setGameOver()
      return
    }

    snake.body.unshift(head)

    // Check food collision
    if (this.checkFoodCollision()) {
      this.incrementScore()
      this.wordsCompleted.value++
      // Queue explosion at the eaten food position
      if (this.food.value) {
        this.lastEatenFoodPos.value = { ...this.food.value.position }
      }
      // Don't remove tail to grow snake
      this.generateFood(this.words, this.vietnameseMode)
    } else {
      // Remove tail if no food eaten
      snake.body.pop()
    }
  }

  generateFood(words: Vocabulary[], vietnameseMode: boolean) {
    this.words = words
    this.vietnameseMode = vietnameseMode

    if (words.length === 0) return

    // Filter unused words
    const availableWords = words.filter(w => !this.usedWords.has(w.word))
    if (availableWords.length === 0) {
      // All words used, complete game
      this.setGameOver()
      return
    }

    // Select random word
    const word = availableWords[Math.floor(Math.random() * availableWords.length)]
    this.usedWords.add(word.word)
    this.currentTargetWord.value = word.word

    // Generate food position
    let foodPosition: Position
    do {
      foodPosition = {
        x: Math.floor(Math.random() * 25) + 2, // Grid 30x20, avoid edges
        y: Math.floor(Math.random() * 15) + 2
      }
    } while (this.snake.value.body.some(segment => 
      segment.x === foodPosition.x && segment.y === foodPosition.y
    ))

    this.food.value = {
      position: foodPosition,
      word: word.word,
      firstLetter: vietnameseMode && word.meaning 
        ? word.meaning.charAt(0).toUpperCase()
        : word.word.charAt(0).toUpperCase(),
      meaning: word.meaning
    }
  }

  checkCollision(): boolean {
    const head = this.snake.value.body[0]
    
    // Wall collision (canvas 30x20 grid)
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20) {
      return true
    }

    // Self collision
    for (let i = 1; i < this.snake.value.body.length; i++) {
      if (head.x === this.snake.value.body[i].x && head.y === this.snake.value.body[i].y) {
        return true
      }
    }

    return false
  }

  checkFoodCollision(): boolean {
    if (!this.food.value) return false
    
    const head = this.snake.value.body[0]
    return head.x === this.food.value.position.x && head.y === this.food.value.position.y
  }

  incrementScore() {
    this.score.value += 10
  }

  setGameOver() {
    this.gameOver.value = true
    this.gameRunning.value = false
  }

  setGameRunning(running: boolean) {
    this.gameRunning.value = running
  }
}

// Snake Canvas Renderer Implementation
class SnakeCanvasRenderer implements ISnakeCanvasRenderer {
  canvasWidth = ref(600)
  canvasHeight = ref(400)
  gridSize = ref(20)
  
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null

  // Simple particle system for explosion effect
  private particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    radius: number
    color: string
  }> = []

  // Tomato juice splatter stains (fade on the floor)
  private stains: Array<{
    x: number
    y: number
    radius: number
    alpha: number
    decay: number
    color: string
  }> = []

  // Shock rings for a juicy burst feeling
  private rings: Array<{
    x: number
    y: number
    r: number
    maxR: number
    life: number
    maxLife: number
    color: string
  }> = []

  initialize(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = this.canvasWidth.value
    canvas.height = this.canvasHeight.value
    
    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      this.handleResize()
    })
    resizeObserver.observe(canvas.parentElement || canvas)
  }

  private handleResize() {
    if (!this.canvas) return
    
    const container = this.canvas.parentElement
    if (container) {
      const rect = container.getBoundingClientRect()
      const aspectRatio = 30 / 20 // Grid ratio
      
      let width = Math.min(rect.width - 40, 600)
      let height = width / aspectRatio
      
      if (height > rect.height - 40) {
        height = rect.height - 40
        width = height * aspectRatio
      }
      
      this.canvasWidth.value = width
      this.canvasHeight.value = height
      this.gridSize.value = width / 30
      
      this.canvas.width = width
      this.canvas.height = height
    }
  }

  render(stateManager: ISnakeStateManager) {
    if (!this.ctx) return
    
    this.clearCanvas()
    this.drawGrid()
    // Stains below food/snake so they look on the ground
    this.updateAndDrawStains()
    this.drawFood(stateManager.food.value)
    this.drawSnake(stateManager.snake.value)

    // Spawn explosion particles if a food was just eaten
    if (stateManager.lastEatenFoodPos.value) {
      const gs = this.gridSize.value
      const cx = stateManager.lastEatenFoodPos.value.x * gs + gs / 2
      const cy = stateManager.lastEatenFoodPos.value.y * gs + gs / 2
      this.spawnExplosion(cx, cy)
      this.spawnSplatStains(cx, cy)
      this.spawnShockRing(cx, cy)
      // Reset the flag so we only spawn once per eat
      stateManager.lastEatenFoodPos.value = null
    }

    // Update and draw particles on top
    this.updateAndDrawParticles()
    // Draw shock rings last
    this.updateAndDrawRings()
  }

  clearCanvas() {
    if (!this.ctx) return
    this.ctx.fillStyle = '#1a1a1a'
    this.ctx.fillRect(0, 0, this.canvasWidth.value, this.canvasHeight.value)
  }

  private drawGrid() {
    if (!this.ctx) return
    
    this.ctx.strokeStyle = '#333333'
    this.ctx.lineWidth = 1
    
    const gridSize = this.gridSize.value
    
    // Vertical lines
    for (let x = 0; x <= 30; x++) {
      this.ctx.beginPath()
      this.ctx.moveTo(x * gridSize, 0)
      this.ctx.lineTo(x * gridSize, this.canvasHeight.value)
      this.ctx.stroke()
    }
    
    // Horizontal lines  
    for (let y = 0; y <= 20; y++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y * gridSize)
      this.ctx.lineTo(this.canvasWidth.value, y * gridSize)
      this.ctx.stroke()
    }
  }

  private drawSnake(snake: Snake) {
    if (!this.ctx) return
    
    const gridSize = this.gridSize.value
    
    snake.body.forEach((segment, index) => {
      if (!this.ctx) return // Add null check inside loop
      
      // Snake body color
      if (index === 0) {
        // Head - brighter green
        this.ctx.fillStyle = '#10b981'
      } else {
        // Body - darker green
        this.ctx.fillStyle = '#059669'
      }
      
      this.ctx.fillRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      )
      
      // Add border
      this.ctx.strokeStyle = '#047857'
      this.ctx.lineWidth = 2
      this.ctx.strokeRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      )
    })
  }

  private drawFood(food: Food | null) {
    if (!this.ctx || !food) return
    
    const gridSize = this.gridSize.value
    const x = food.position.x * gridSize + 1
    const y = food.position.y * gridSize + 1
    
    // Food background - red circle
    this.ctx.fillStyle = '#ef4444'
    this.ctx.beginPath()
    this.ctx.arc(
      x + gridSize / 2,
      y + gridSize / 2,
      (gridSize - 4) / 2,
      0,
      2 * Math.PI
    )
    this.ctx.fill()
    
    // Food border
    if (this.ctx) {
      this.ctx.strokeStyle = '#dc2626'
      this.ctx.lineWidth = 2
      this.ctx.stroke()
      
      // Draw first letter
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = `bold ${Math.floor(gridSize * 0.6)}px Arial`
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(
        food.firstLetter,
        x + gridSize / 2,
        y + gridSize / 2
      )
    }
  }

  // Particle helpers
  private spawnExplosion(cx: number, cy: number) {
    // Emit a burst of particles with project-friendly colors (no gray)
    // Tomato palette: juicy reds with some amber highlights
    const colors = ['#ef4444', '#dc2626', '#f43f5e', '#f59e0b']
    const count = 20
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const speed = 5.0 + Math.random() * 3.0
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 6 + Math.floor(Math.random() * 5), // very short for instant burst
        radius: 1.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    // Cap total particles to keep performance good on mobile
    if (this.particles.length > 300) {
      this.particles.splice(0, this.particles.length - 300)
    }
  }

  private updateAndDrawParticles() {
    if (!this.ctx) return
    const gravity = 0.0
    const friction = 1.0
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      // Update
      p.vx *= friction
      p.vy = p.vy * friction + gravity
      p.x += p.vx
      p.y += p.vy
      p.life++

      // Draw with fade-out
      const alpha = Math.max(0, 1 - p.life / p.maxLife)
      this.ctx.globalAlpha = alpha
      this.ctx.fillStyle = p.color
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.globalAlpha = 1

      // Remove dead particles
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1)
      }
    }
  }

  private spawnSplatStains(cx: number, cy: number) {
    // A few larger stains that fade quickly (simulate tomato juice landing)
    const stainColors = ['#b91c1c', '#dc2626', '#ef4444']
    const splats = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < splats; i++) {
      const offsetR = Math.random() * 10
      const offsetA = Math.random() * Math.PI * 2
      const sx = cx + Math.cos(offsetA) * offsetR
      const sy = cy + Math.sin(offsetA) * offsetR
      this.stains.push({
        x: sx,
        y: sy,
        radius: 6 + Math.random() * 8,
        alpha: 0.6,
        decay: 0.06 + Math.random() * 0.06,
        color: stainColors[Math.floor(Math.random() * stainColors.length)]
      })
    }
    // Limit stain list
    if (this.stains.length > 80) {
      this.stains.splice(0, this.stains.length - 80)
    }
  }

  private updateAndDrawStains() {
    if (!this.ctx) return
    for (let i = this.stains.length - 1; i >= 0; i--) {
      const s = this.stains[i]
      // Draw blurred-like soft circle via alpha fill
      this.ctx.globalAlpha = Math.max(0, s.alpha)
      this.ctx.fillStyle = s.color
      this.ctx.beginPath()
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.globalAlpha = 1

      s.alpha -= s.decay
      if (s.alpha <= 0) {
        this.stains.splice(i, 1)
      }
    }
  }

  private spawnShockRing(cx: number, cy: number) {
    // Single quick ring that expands and fades
    this.rings.push({
      x: cx,
      y: cy,
      r: 2,
      maxR: 28,
      life: 0,
      maxLife: 10,
      color: '#ef4444'
    })
  }

  private updateAndDrawRings() {
    if (!this.ctx) return
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const ring = this.rings[i]
      ring.life++
      const t = ring.life / ring.maxLife
      ring.r = 2 + (ring.maxR - 2) * t
      const alpha = Math.max(0, 1 - t)
      this.ctx.globalAlpha = alpha
      this.ctx.strokeStyle = ring.color
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
      this.ctx.stroke()
      this.ctx.globalAlpha = 1
      if (ring.life >= ring.maxLife) {
        this.rings.splice(i, 1)
      }
    }
  }
}

// Snake Game Engine Implementation
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

// Main Snake Game Implementation
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

  updateVietnameseMode(vietnameseMode: boolean) {
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

// Factory function
export function useSnakeGame(): ISnakeGame {
  return new SnakeGame()
}
