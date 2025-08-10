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

  constructor() {
    // Initialize all dependencies
    this.stateManager = useGameStateManager()
    this.audioSystem = useAudioSystem()
    this.physicsEngine = usePhysicsEngine()
    this.visualEffects = useVisualEffects()
    this.canvasRenderer = useCanvasRenderer()
    this.inputHandler = useInputHandler()
    this.gameLogic = useGameLogic()
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
  }

  public startGameLoop(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    
    const gameLoop = () => {
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
          this.stateManager.currentShooterColor.value
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
  }

  public updateAim(event: MouseEvent): void {
    const canvas = this.canvasRenderer.gameCanvas.value
    if (!canvas || this.stateManager.shootingBubble.value) return
    
    const aimPosition = this.inputHandler.updateAim(event, canvas)
    this.stateManager.updateAimLine(aimPosition)
  }

  public shootBubble(event: MouseEvent): void {
    const canvas = this.canvasRenderer.gameCanvas.value
    if (!canvas || this.stateManager.shootingBubble.value || !this.stateManager.currentShooterWord.value) {
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
    
    // Create shooting bubble with Vietnamese mode support
    const currentWordVocab = this.currentWords.find(vocab => vocab.word === this.stateManager.currentShooterWord.value)
    const bubble: Bubble = {
      x: this.stateManager.shooterPosition.value.x,
      y: this.stateManager.shooterPosition.value.y,
      word: this.stateManager.currentShooterWord.value,
      color: this.stateManager.currentShooterColor.value,
      id: `shooting-${Date.now()}`,
      row: -1,
      col: -1,
      vietnameseMeaning: currentWordVocab?.meaning || '',
      displayText: this.stateManager.currentShooterWord.value.charAt(0).toUpperCase() // Shooter bubble always shows English first letter
    }
    
    // Set as shooting bubble
    this.stateManager.setShootingBubble(bubble)
    
    // Animate bubble with physics - CRITICAL FIX: Pass existing bubbles for collision detection
    this.physicsEngine.animateShootingBubble(
      bubble,
      shootingVector.vx,
      shootingVector.vy,
      (landedBubble: Bubble) => this.handleBubbleLanded(landedBubble),
      this.stateManager.bubbles.value // Pass existing bubbles for immediate collision detection
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
        // Switch to Vietnamese first letter
        bubble.displayText = bubble.vietnameseMeaning.charAt(0).toUpperCase()
      } else {
        // Switch back to English first letter
        bubble.displayText = bubble.word.charAt(0).toUpperCase()
      }
    })
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
    
    // VIETNAMESE MODE: Convert bubble to show Vietnamese first letter when landed
    if (this.vietnameseMode && bubble.vietnameseMeaning) {
      bubble.displayText = bubble.vietnameseMeaning.charAt(0).toUpperCase()
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
