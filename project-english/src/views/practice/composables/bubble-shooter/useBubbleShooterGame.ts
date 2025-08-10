import { ref } from 'vue'
import type { 
  IBubbleShooterGame,
  IGameStateManager,
  IAudioSystem,
  IPhysicsEngine,
  IVisualEffects,
  ICanvasRenderer,
  IInputHandler,
  IGameLogic,
  Bubble
} from './interfaces'
import type { Vocabulary } from '@/composables/useVocabularyStore'
import { useGameStateManager } from './useGameStateManager'
import { useAudioSystem } from './useAudioSystem'
import { usePhysicsEngine } from './usePhysicsEngine'
import { useVisualEffects } from './useVisualEffects'
import { useCanvasRenderer } from './useCanvasRenderer'
import { useInputHandler } from './useInputHandler'
import { useGameLogic } from './useGameLogic'

export class BubbleShooterGame implements IBubbleShooterGame {
  // Dependencies
  public readonly stateManager: IGameStateManager
  public readonly audioSystem: IAudioSystem
  public readonly physicsEngine: IPhysicsEngine
  public readonly visualEffects: IVisualEffects
  public readonly canvasRenderer: ICanvasRenderer
  public readonly inputHandler: IInputHandler
  public readonly gameLogic: IGameLogic

  // Private properties
  private animationFrame: number | null = null
  private currentWords: Vocabulary[] = []
  private vietnameseMode: boolean = false
  
  // Timed row insertion & animation state
  private rowInsertTimer: number | null = null
  private readonly ROW_INSERT_INTERVAL = 20000
  private rowAnimationActive = false
  private rowAnimationStart = 0
  private readonly rowAnimationDuration = 600 // ms
  private rowShiftAmount: number = 34 // will be recalculated in constructor
  private rowStartYMap = new Map<string, number>()
  private rowStartXMap = new Map<string, number>()
  private newRowBubbles: Bubble[] = []
  private newRowDelays = new Map<string, number>()

  constructor() {
    // Initialize all dependencies
    this.stateManager = useGameStateManager()
    this.audioSystem = useAudioSystem()
    this.physicsEngine = usePhysicsEngine()
    this.visualEffects = useVisualEffects()
    this.canvasRenderer = useCanvasRenderer()
    this.inputHandler = useInputHandler()
    this.gameLogic = useGameLogic()

    // Derive row shift from physics bubble size to match spacing
    this.rowShiftAmount = (this.physicsEngine.BUBBLE_SIZE * Math.sqrt(3)) / 2
  }

  // ===== Row Insertion Feature =====
  private triggerRowInsertion(): void {
    if (this.rowAnimationActive || this.stateManager.gameOver.value) return
    if (this.stateManager.shootingBubble.value) return
    // Prepare animation state
    this.rowAnimationActive = true
    this.rowAnimationStart = performance.now()
    this.rowStartYMap.clear()
    this.rowStartXMap.clear()
    this.newRowBubbles = []
    this.newRowDelays.clear()

    // Capture starting X,Y for existing bubbles
    this.stateManager.bubbles.value.forEach(b => {
      this.rowStartYMap.set(b.id, b.y)
      this.rowStartXMap.set(b.id, b.x)
    })

    // Decide desired offset for the new top row (row 0) to complement current top row (which will become row 1)
    const B = this.physicsEngine.BUBBLE_SIZE
    const baseX = B / 2 + 5
    const currentTop = this.stateManager.bubbles.value.filter(b => (b.row ?? 0) === 0)
    const nearestGridX = (x: number, offsetX: number) => {
      const colF = Math.round((x - (baseX + offsetX)) / B)
      return baseX + offsetX + colF * B
    }
    let sumEven = 0, sumOdd = 0
    if (currentTop.length > 0) {
      currentTop.forEach(b => {
        sumEven += Math.abs(b.x - nearestGridX(b.x, 0))
        sumOdd  += Math.abs(b.x - nearestGridX(b.x, B / 2))
      })
    }
    const effOffsetRow1 = currentTop.length === 0 ? 0 : (sumEven <= sumOdd ? 0 : B / 2)
    const desiredOffsetRow0 = effOffsetRow1 === 0 ? B / 2 : 0

    // Create new top row (left -> right staggered)
    // Compute columns to span full canvas width (respect 5px margins on both sides)
    const canvasW = this.canvasRenderer.canvasWidth.value || 800
    const offsetX = desiredOffsetRow0
    const Bsize = this.physicsEngine.BUBBLE_SIZE
    const bubblesPerRow = Math.max(1, Math.floor((canvasW - 10 - offsetX) / Bsize))
    for (let col = 0; col < bubblesPerRow; col++) {
      const vocab = this.currentWords[Math.floor(Math.random() * Math.max(1, this.currentWords.length))]
      const word = vocab?.word || '·'
      const color = this.physicsEngine.getColorForWord(word)
      const x = col * this.physicsEngine.BUBBLE_SIZE + this.physicsEngine.BUBBLE_SIZE / 2 + offsetX + 5
      const startY = -this.physicsEngine.BUBBLE_SIZE // start above view
      const bubble: Bubble = {
        x,
        y: startY,
        word,
        color,
        id: `row-${Date.now()}-${col}`,
        row: -1,
        col,
        vietnameseMeaning: vocab?.meaning || '',
        displayText: this.vietnameseMode && vocab?.meaning
          ? vocab.meaning.substring(0, 2).toUpperCase()
          : word.charAt(0).toUpperCase()
      }
      this.stateManager.addBubble(bubble)
      this.newRowBubbles.push(bubble)
      this.newRowDelays.set(bubble.id, col * 60) // ms stagger strictly left -> right
    }
  }

  private updateRowInsertionAnimation(): void {
    if (!this.rowAnimationActive) return

    const now = performance.now()
    const elapsed = now - this.rowAnimationStart
    const t = Math.min(1, elapsed / this.rowAnimationDuration)
    const ease = 1 - Math.pow(1 - t, 3) // easeOutCubic

    // Move existing bubbles down by eased shift amount and freeze X to starting value
    this.stateManager.bubbles.value.forEach(b => {
      if (this.newRowDelays.has(b.id)) return // skip newly inserted row here
      const startY = this.rowStartYMap.get(b.id)
      const startX = this.rowStartXMap.get(b.id)
      if (startY != null) {
        b.y = startY + ease * this.rowShiftAmount
      }
      if (startX != null) {
        b.x = startX // hard-freeze X to eliminate any lateral slide
      }
    })

    // Drop new row from above to top line, left->right stagger
    const targetTopY = this.physicsEngine.BUBBLE_SIZE / 2 + 5
    // Ensure the new row never overlaps the moving row beneath during animation using per-bubble nearest neighbor clamp
    const movingTopY = targetTopY + ease * this.rowShiftAmount
    const epsilon = 1.0 // safety to avoid any visual overlap due to AA
    const rowBelow = this.stateManager.bubbles.value.filter(b => !this.newRowDelays.has(b.id) && ((b.row ?? 0) === 0))
    let allNewSettled = true
    for (const nb of this.newRowBubbles) {
      const delay = this.newRowDelays.get(nb.id) || 0
      const localElapsed = Math.max(0, elapsed - delay)
      const tt = Math.min(1, localElapsed / Math.max(1, this.rowAnimationDuration - delay))
      const ease2 = 1 - Math.pow(1 - tt, 3)
      const startY = -this.physicsEngine.BUBBLE_SIZE
      const plannedY = startY + (targetTopY - startY) * ease2
      // Base clamp using ideal hex separation relative to moving row position
      let allowed = movingTopY - this.rowShiftAmount - epsilon
      // Refine clamp using the nearest bubble in the moving row below
      if (rowBelow.length > 0) {
        let nearest = rowBelow[0]
        let bestDx = Math.abs(nearest.x - nb.x)
        for (let i = 1; i < rowBelow.length; i++) {
          const dx = Math.abs(rowBelow[i].x - nb.x)
          if (dx < bestDx) {
            bestDx = dx
            nearest = rowBelow[i]
          }
        }
        const B = this.physicsEngine.BUBBLE_SIZE
        const dxClamped = Math.min(bestDx, B)
        const dyMin = dxClamped >= B ? 0 : Math.sqrt(B * B - dxClamped * dxClamped)
        allowed = Math.min(allowed, nearest.y - dyMin - epsilon)
      }
      nb.y = Math.round(Math.min(plannedY, allowed) * 2) / 2
      if (tt < 1) allNewSettled = false
    }

    // Finish
    if (t >= 1 && allNewSettled) {
      // Commit rows and exact positions
      // Existing bubbles: increase row by 1 and snap Y to exact grid (avoid cumulative float error)
      this.stateManager.bubbles.value.forEach(b => {
        if (this.newRowDelays.has(b.id)) return
        const prevRow = b.row ?? 0
        const nextRow = prevRow + 1
        // Restore exact starting X to guarantee no lateral drift
        const startX = this.rowStartXMap.get(b.id)
        if (startX != null) b.x = startX
        b.row = nextRow
        // Snap to exact Y grid based on row index (half-pixel aligned)
        const yExact = (this.physicsEngine.BUBBLE_SIZE / 2 + 5) + nextRow * this.rowShiftAmount
        b.y = Math.round(yExact * 2) / 2
        // Preserve X; recompute column under new parity based on current X
        const offsetX = nextRow % 2 === 0 ? 0 : this.physicsEngine.BUBBLE_SIZE / 2
        const colF = Math.round(
          (b.x - (this.physicsEngine.BUBBLE_SIZE / 2 + offsetX + 5)) / this.physicsEngine.BUBBLE_SIZE
        )
        b.col = Math.max(0, colF)
      })

      // New row: set row=0 and ensure exact Y; preserve X and compute col using the same desired offset
      const B2 = this.physicsEngine.BUBBLE_SIZE
      const baseX2 = B2 / 2 + 5
      const currentTop2 = this.stateManager.bubbles.value.filter(b => (b.row ?? 0) === 1)
      let sumEven2 = 0, sumOdd2 = 0
      if (currentTop2.length > 0) {
        currentTop2.forEach(b => {
          sumEven2 += Math.abs(b.x - (baseX2 + Math.round((b.x - baseX2) / B2) * B2))
          sumOdd2  += Math.abs(b.x - (baseX2 + B2 / 2 + Math.round((b.x - (baseX2 + B2 / 2)) / B2) * B2))
        })
      }
      const effOffsetRow1b = currentTop2.length === 0 ? 0 : (sumEven2 <= sumOdd2 ? 0 : B2 / 2)
      const desiredOffsetRow0b = effOffsetRow1b === 0 ? B2 / 2 : 0
      this.newRowBubbles.forEach((nb) => {
        const col0 = Math.round((nb.x - (baseX2 + desiredOffsetRow0b)) / B2)
        nb.col = Math.max(0, col0)
        nb.row = 0
        // Commit exactly to grid Y to ensure zero gap with neighbors
        nb.y = Math.round(targetTopY * 2) / 2
      })

      // Minor feedback
      this.stateManager.addScreenShake(4)
      this.audioSystem.playImpactSound()

      // Reset animation state
      this.rowAnimationActive = false
      this.rowStartYMap.clear()
      this.rowStartXMap.clear()
      this.newRowDelays.clear()
      this.newRowBubbles = []
    }
  }

  public initialize(canvas: HTMLCanvasElement, words: Vocabulary[], vietnameseMode: boolean = false): void {
    // Store canvas reference and words
    this.canvasRenderer.gameCanvas.value = canvas
    this.currentWords = words
    this.vietnameseMode = vietnameseMode
    
    // Initialize canvas
    if (!this.canvasRenderer.initializeCanvas()) {
      console.error('Failed to initialize canvas')
      return
    }

    // Update shooter position based on canvas size
    this.stateManager.shooterPosition.value = { 
      x: this.canvasRenderer.canvasWidth.value / 2, 
      y: this.canvasRenderer.canvasHeight.value - 50 
    }

    // Setup initial game state with Vietnamese mode support
    const initialBubbles = this.gameLogic.setupInitialBubbles(words, this.vietnameseMode)
    initialBubbles.forEach(bubble => this.stateManager.addBubble(bubble))
    
    this.stateManager.selectNextShooterWord(words)
    this.startGameLoop()

    // Start timed row insertion
    if (this.rowInsertTimer) window.clearInterval(this.rowInsertTimer)
    this.rowInsertTimer = window.setInterval(() => this.triggerRowInsertion(), this.ROW_INSERT_INTERVAL)
  }

  public startGameLoop(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    
    const gameLoop = () => {
      // Update timed row insertion animation
      this.updateRowInsertionAnimation()

      // Update explosions and particles
      this.stateManager.updateExplosions()
      
      // Clear and draw everything
      this.canvasRenderer.clearCanvas()
      
      // Apply screen shake
      const shake = this.stateManager.screenShake.value
      const ctx = this.canvasRenderer.gameCanvas.value?.getContext('2d')
      if (ctx) {
        ctx.save()
        ctx.translate(shake.x, shake.y)
        
        // Draw background
        this.canvasRenderer.drawBackground()
        
        // Draw all bubbles
        this.stateManager.bubbles.value.forEach(bubble => {
          this.canvasRenderer.drawBubble(bubble)
        })
        
        // Draw explosions
        this.canvasRenderer.drawExplosions(this.stateManager.explosions.value)
        
        // Draw shooter
        this.canvasRenderer.drawShooter(
          this.stateManager.shooterPosition.value,
          this.stateManager.currentShooterWord.value,
          this.stateManager.currentShooterColor.value,
          this.getShooterDisplayText()
        )
        
        // Draw shooting bubble if exists
        if (this.stateManager.shootingBubble.value) {
          this.canvasRenderer.drawShootingBubble(this.stateManager.shootingBubble.value)
        }
        
        // Draw aim line
        this.canvasRenderer.drawAimLine(
          this.stateManager.aimLine.value,
          this.stateManager.shooterPosition.value
        )
        
        ctx.restore()
      }
      
      // Check win condition
      if (this.gameLogic.isGameWon(this.stateManager.bubbles.value)) {
        setTimeout(() => {
          this.stateManager.setGameOver(true)
        }, 500)
        return
      }
      
      if (!this.stateManager.gameOver.value) {
        this.animationFrame = requestAnimationFrame(gameLoop)
      }
    }
    
    gameLoop()
  }

  public stopGameLoop(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
    if (this.rowInsertTimer) {
      window.clearInterval(this.rowInsertTimer)
      this.rowInsertTimer = null
    }
  }

  public updateAim(event: MouseEvent): void {
    const canvas = this.canvasRenderer.gameCanvas.value
    if (!canvas || this.stateManager.shootingBubble.value) return
    
    const aimPosition = this.inputHandler.updateAim(event, canvas)
    this.stateManager.updateAimLine(aimPosition)
  }

  public shootBubble(event: MouseEvent): void {
    const canvas = this.canvasRenderer.gameCanvas.value
    if (!canvas || this.stateManager.shootingBubble.value || !this.stateManager.currentShooterWord.value || this.rowAnimationActive) {
      return
    }
    
    const shootingVector = this.inputHandler.getShootingVector(
      event,
      canvas,
      this.stateManager.shooterPosition.value
    )
    
    if (!shootingVector) return
    
    // Hide aim line immediately after shooting
    this.stateManager.updateAimLine(null)
    
    // Get current shooter word BEFORE it changes
    const shooterWord = this.stateManager.currentShooterWord.value
    const currentWordVocab = this.currentWords.find(vocab => vocab.word === shooterWord)

    // Create shooting bubble with Vietnamese mode support
    const bubble: Bubble = {
      x: this.stateManager.shooterPosition.value.x,
      y: this.stateManager.shooterPosition.value.y,
      word: shooterWord,
      color: this.stateManager.currentShooterColor.value,
      id: `shooting-${Date.now()}`,
      row: -1,
      col: -1,
      vietnameseMeaning: currentWordVocab?.meaning || '',
      displayText: shooterWord.charAt(0).toUpperCase() // Shooter bubble always shows English first letter
    }
    
    // Set as shooting bubble
    this.stateManager.setShootingBubble(bubble)

    // Speak EXACTLY the created bubble's English word to avoid mismatch (independent of toggle)
    if (bubble.word) {
      this.audioSystem.playVocabularySound(bubble.word, 'en')
    }
    
    // Animate bubble with physics - CRITICAL FIX: Pass existing bubbles AND canvas dimensions
    this.physicsEngine.animateShootingBubble(
      bubble,
      shootingVector.vx,
      shootingVector.vy,
      (landedBubble: Bubble) => this.handleBubbleLanded(landedBubble),
      this.stateManager.bubbles.value, // Pass existing bubbles for immediate collision detection
      this.canvasRenderer.canvasWidth.value, // Pass actual canvas width for responsive boundaries
      this.canvasRenderer.canvasHeight.value // Pass actual canvas height for responsive boundaries
    )
    
    // Select next word for shooter
    this.stateManager.selectNextShooterWord(this.currentWords)
  }

  public restartGame(words: Vocabulary[]): void {
    this.stopGameLoop()
    this.currentWords = words
    this.stateManager.resetGame()
    
    // Setup initial bubbles
    const initialBubbles = this.gameLogic.setupInitialBubbles(words)
    initialBubbles.forEach(bubble => this.stateManager.addBubble(bubble))
    
    this.stateManager.selectNextShooterWord(words)
    this.startGameLoop()
  }

  public updateVietnameseMode(enabled: boolean): void {
    this.vietnameseMode = enabled
    // Update display text for existing bubbles based on mode
    this.stateManager.bubbles.value.forEach(bubble => {
      if (enabled && bubble.vietnameseMeaning) {
        // Switch to Vietnamese first 2 letters
        bubble.displayText = bubble.vietnameseMeaning.substring(0, 2).toUpperCase()
      } else {
        // Switch back to English first 1 letter
        bubble.displayText = bubble.word.charAt(0).toUpperCase()
      }
    })
  }

  private getShooterDisplayText(): string {
    const word = this.stateManager.currentShooterWord.value
    if (!word) return ''
    
    // Find the vocabulary item for this word to get Vietnamese meaning
    const vocab = this.currentWords.find(w => w.word === word)
    
    if (this.vietnameseMode && vocab?.meaning) {
      // Vietnamese mode: show first 2 letters of Vietnamese meaning
      return vocab.meaning.substring(0, 2).toUpperCase()
    } else {
      // Normal mode: show first 1 letter of English word
      return word.charAt(0).toUpperCase()
    }
  }

  public cleanup(): void {
    this.stopGameLoop()
  }

  private handleBubbleLanded(bubble: Bubble): void {
    // Create impact effect and play sound
    const impactEffect = this.visualEffects.createImpactEffect(bubble.x, bubble.y, bubble.color)
    this.stateManager.addExplosion(impactEffect)
    this.audioSystem.playImpactSound()
    
    // Clear the shooting bubble as it's about to land
    this.stateManager.setShootingBubble(null)
    
    // VIETNAMESE MODE: Convert bubble to show Vietnamese first 2 letters when landed
    if (this.vietnameseMode && bubble.vietnameseMeaning) {
      bubble.displayText = bubble.vietnameseMeaning.substring(0, 2).toUpperCase()
    } else {
      // NORMAL MODE: Show English first 1 letter
      bubble.displayText = bubble.word.charAt(0).toUpperCase()
    }
    
    // Snap to grid
    this.physicsEngine.snapToGrid(bubble, this.stateManager.bubbles.value)
    
    // Add bubble to game state
    this.stateManager.addBubble(bubble)
    
    // Check for matches
    const matchResult = this.gameLogic.checkForMatches(bubble, this.stateManager.bubbles.value)
    
    if (matchResult.shouldRemove) {
      // Create explosion effects for matched bubbles
      matchResult.matchedBubbles.forEach(matchedBubble => {
        const explosion = this.visualEffects.createExplosion(
          matchedBubble.x, 
          matchedBubble.y, 
          matchedBubble.color
        )
        this.stateManager.addExplosion(explosion)
      })
      
      // Remove matched bubbles
      const bubbleIds = matchResult.matchedBubbles.map(b => b.id)
      this.stateManager.removeBubbles(bubbleIds)
      
      // Update score and stats
      const matchScore = this.gameLogic.calculateScore(matchResult.matchedBubbles.length, 0)
      this.stateManager.updateScore(matchScore)
      this.stateManager.incrementWordsMatched()
      
      // Play explosion sound
      this.audioSystem.playExplosionSound()
      
      // Add screen shake
      this.stateManager.addScreenShake(8)
      
      // Check for floating bubbles
      this.handleFloatingBubbles()
    }
  }

  private handleFloatingBubbles(): void {
    const floatingResult = this.gameLogic.removeFloatingBubbles(this.stateManager.bubbles.value)
    
    if (floatingResult.removedBubbles.length > 0) {
      // Create effects for floating bubbles
      floatingResult.removedBubbles.forEach(floatingBubble => {
        const effect = this.visualEffects.createImpactEffect(
          floatingBubble.x,
          floatingBubble.y,
          floatingBubble.color
        )
        this.stateManager.addExplosion(effect)
      })
      
      // Update bubbles list
      this.stateManager.bubbles.value = floatingResult.remainingBubbles
      
      // Bonus points for floating bubbles
      const bonusScore = this.gameLogic.calculateScore(0, floatingResult.removedBubbles.length)
      this.stateManager.updateScore(bonusScore)
    }
  }
}

export const useBubbleShooterGame = (): IBubbleShooterGame => {
  return new BubbleShooterGame()
}
