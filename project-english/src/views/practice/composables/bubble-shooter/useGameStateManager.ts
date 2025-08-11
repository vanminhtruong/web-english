import { ref, type Ref } from 'vue'
import type { 
  IGameStateManager, 
  Bubble, 
  Explosion, 
  Particle, 
  ScreenShake, 
  AimLine, 
  Position 
} from './interfaces'
import type { Vocabulary } from '@/composables/useVocabularyStore'

export class GameStateManager implements IGameStateManager {
  // Game State
  public readonly score: Ref<number> = ref(0)
  public readonly wordsMatched: Ref<number> = ref(0)
  public readonly gameOver: Ref<boolean> = ref(false)
  public readonly bubbles: Ref<Bubble[]> = ref([])
  public readonly shootingBubble: Ref<Bubble | null> = ref(null)
  public readonly currentShooterWord: Ref<string> = ref('')
  public readonly currentShooterColor: Ref<string> = ref('#FF6B6B')
  public readonly explosions: Ref<Explosion[]> = ref([])
  public readonly particles: Ref<Particle[]> = ref([])
  public readonly screenShake: Ref<ScreenShake> = ref({ x: 0, y: 0, intensity: 0 })
  public readonly aimLine: Ref<AimLine> = ref({ visible: false, x: 0, y: 0 })
  public readonly shooterPosition: Ref<Position> = ref({ x: 400, y: 550 })
  public readonly rowAnimationActive: Ref<boolean> = ref(false)

  // Private state for color mapping
  private readonly wordColorMap = new Map<string, string>()
  private readonly COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB347']

  // Game Management Methods
  public resetGame(): void {
    this.score.value = 0
    this.wordsMatched.value = 0
    this.gameOver.value = false
    this.bubbles.value = []
    this.shootingBubble.value = null
    this.explosions.value = []
    this.particles.value = []
    this.screenShake.value = { x: 0, y: 0, intensity: 0 }
    this.aimLine.value = { visible: false, x: 0, y: 0 }
    this.currentShooterWord.value = ''
    this.currentShooterColor.value = '#FF6B6B'
  }

  public updateScore(points: number): void {
    this.score.value += points
  }

  public incrementWordsMatched(): void {
    this.wordsMatched.value += 1
  }

  public setGameOver(gameOver: boolean): void {
    this.gameOver.value = gameOver
  }

  public setRowAnimationActive(active: boolean): void {
    this.rowAnimationActive.value = active
  }

  // Bubble Management
  public addBubble(bubble: Bubble): void {
    this.bubbles.value.push(bubble)
  }

  public removeBubbles(bubbleIds: string[]): void {
    this.bubbles.value = this.bubbles.value.filter(
      bubble => !bubbleIds.includes(bubble.id)
    )
  }

  public setShootingBubble(bubble: Bubble | null): void {
    this.shootingBubble.value = bubble
  }

  public selectNextShooterWord(words: Vocabulary[]): void {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      this.currentShooterWord.value = randomWord.word
      this.currentShooterColor.value = this.getColorForWord(randomWord.word)
    }
  }

  // Visual Effects Management
  public updateAimLine(position: Position | null): void {
    if (position) {
      this.aimLine.value = {
        visible: true,
        x: position.x,
        y: position.y
      }
    } else {
      this.aimLine.value.visible = false
    }
  }

  public addExplosion(explosion: Explosion): void {
    this.explosions.value.push(explosion)
  }

  public updateExplosions(): void {
    this.explosions.value.forEach(explosion => {
      if (!explosion.active) return
      
      // Update shockwave
      if (explosion.shockwave.radius < explosion.shockwave.maxRadius) {
        explosion.shockwave.radius += 2
        explosion.shockwave.intensity = Math.max(0, 1 - (explosion.shockwave.radius / explosion.shockwave.maxRadius))
      }
      
      let activeParticles = 0
      explosion.particles.forEach(particle => {
        if (particle.life > 0) {
          // Update particle position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Update rotation
          particle.rotation += particle.rotationSpeed
          
          // Apply different physics based on particle type
          switch (particle.type) {
            case 'burst':
              particle.vy += 0.15 // More gravity
              particle.vx *= 0.96 // More friction
              particle.vy *= 0.96
              particle.life -= 0.025
              break
            case 'spark':
              particle.vy += 0.05 // Less gravity
              particle.vx *= 0.99 // Less friction
              particle.vy *= 0.99
              particle.life -= 0.04 // Faster decay
              break
            case 'glow':
              particle.vy += 0.08 // Medium gravity
              particle.vx *= 0.97
              particle.vy *= 0.97
              particle.life -= 0.015 // Slower decay
              break
          }
          
          activeParticles++
        }
      })
      
      // Deactivate explosion when all particles are dead and shockwave is done
      if (activeParticles === 0 && explosion.shockwave.radius >= explosion.shockwave.maxRadius) {
        explosion.active = false
      }
    })
    
    // Update screen shake
    this.updateScreenShake()
    
    // Remove inactive explosions
    this.explosions.value = this.explosions.value.filter(explosion => explosion.active)
  }

  // Screen Shake Management
  public addScreenShake(intensity: number): void {
    this.screenShake.value.intensity = Math.max(this.screenShake.value.intensity, intensity)
  }

  public updateScreenShake(): void {
    if (this.screenShake.value.intensity > 0) {
      this.screenShake.value.x = (Math.random() - 0.5) * this.screenShake.value.intensity
      this.screenShake.value.y = (Math.random() - 0.5) * this.screenShake.value.intensity
      this.screenShake.value.intensity *= 0.9 // Decay
      
      if (this.screenShake.value.intensity < 0.1) {
        this.screenShake.value.intensity = 0
        this.screenShake.value.x = 0
        this.screenShake.value.y = 0
      }
    }
  }

  // Private helper method for color mapping
  private getColorForWord(word: string): string {
    if (!this.wordColorMap.has(word)) {
      // Assign a consistent color based on word hash to avoid random changes
      let hash = 0
      for (let i = 0; i < word.length; i++) {
        hash = ((hash << 5) - hash + word.charCodeAt(i)) & 0xffffffff
      }
      const colorIndex = Math.abs(hash) % this.COLORS.length
      this.wordColorMap.set(word, this.COLORS[colorIndex])
    }
    return this.wordColorMap.get(word)!
  }
}

export const useGameStateManager = (): IGameStateManager => {
  return new GameStateManager()
}
