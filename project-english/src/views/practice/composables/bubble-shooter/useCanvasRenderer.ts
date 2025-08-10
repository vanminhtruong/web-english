import { ref, type Ref } from 'vue'
import type { ICanvasRenderer, Bubble, Explosion, AimLine, Position } from './interfaces'

export class CanvasRenderer implements ICanvasRenderer {
  public readonly canvasWidth: Ref<number> = ref(800)
  public readonly canvasHeight: Ref<number> = ref(600)
  public readonly gameCanvas: Ref<HTMLCanvasElement | undefined> = ref()

  private ctx: CanvasRenderingContext2D | null = null
  private readonly BUBBLE_SIZE = 40

  public initializeCanvas(): boolean {
    if (!this.gameCanvas.value) return false
    
    const canvas = this.gameCanvas.value
    this.ctx = canvas.getContext('2d')
    if (!this.ctx) return false

    // Set canvas size
    const container = canvas.parentElement
    if (container) {
      this.canvasWidth.value = container.clientWidth
      this.canvasHeight.value = container.clientHeight
      canvas.width = this.canvasWidth.value
      canvas.height = this.canvasHeight.value
    }

    return true
  }

  public setCanvasSize(width: number, height: number): void {
    this.canvasWidth.value = width
    this.canvasHeight.value = height
    if (this.gameCanvas.value) {
      this.gameCanvas.value.width = width
      this.gameCanvas.value.height = height
    }
  }

  public clearCanvas(): void {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.canvasWidth.value, this.canvasHeight.value)
  }

  public drawBackground(): void {
    if (!this.ctx) return
    
    // Draw background gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasHeight.value)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvasWidth.value, this.canvasHeight.value)
  }

  public drawBubble(bubble: Bubble): void {
    if (!this.ctx) return
    
    // Align to half-pixel to reduce anti-aliasing artifacts
    const cx = Math.round(bubble.x * 2) / 2
    const cy = Math.round(bubble.y * 2) / 2
    // Render radius strictly below physical radius to avoid visual overlap
    const r = this.BUBBLE_SIZE / 2 - 1
    
    // Add subtle bubble glow
    this.ctx.save()
    this.ctx.shadowColor = bubble.color
    this.ctx.shadowBlur = 6
    
    // Draw bubble with gradient
    const gradient = this.ctx.createRadialGradient(
      cx - this.BUBBLE_SIZE / 6, cy - this.BUBBLE_SIZE / 6, 0,
      cx, cy, r
    )
    gradient.addColorStop(0, this.lightenColor(bubble.color, 0.3))
    gradient.addColorStop(1, bubble.color)
    
    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2)
    this.ctx.fill()
    
    // Draw enhanced border with inner highlight
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 2
    this.ctx.stroke()
    
    // Inner highlight
    this.ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.arc(cx, cy, r - 3, 0, Math.PI * 2)
    this.ctx.stroke()
    
    this.ctx.restore()
    
    // Draw text with enhanced styling
    this.ctx.save()
    this.ctx.shadowColor = 'rgba(0,0,0,0.7)'
    this.ctx.shadowBlur = 3
    this.ctx.shadowOffsetX = 1
    this.ctx.shadowOffsetY = 1
    
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 16px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    // Show display text (supports both English and Vietnamese mode)
    const text = bubble.displayText || bubble.word.charAt(0).toUpperCase()
    
    this.ctx.fillText(text, cx, cy)
    this.ctx.restore()
  }

  public drawShooter(position: Position, word: string, color: string, displayText?: string): void {
    if (!this.ctx) return
    
    // Enhanced shooter with pulsing effect
    this.ctx.save()
    
    // Pulsing glow effect using current shooter color
    const pulseIntensity = 0.8 + 0.2 * Math.sin(Date.now() * 0.008)
    this.ctx.shadowColor = color
    this.ctx.shadowBlur = 15 * pulseIntensity
    
    // Draw shooter base with gradient using current shooter color
    const gradient = this.ctx.createRadialGradient(
      position.x - this.BUBBLE_SIZE / 6, position.y - this.BUBBLE_SIZE / 6, 0,
      position.x, position.y, this.BUBBLE_SIZE / 2
    )
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, color)
    
    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.arc(position.x, position.y, this.BUBBLE_SIZE / 2, 0, Math.PI * 2)
    this.ctx.fill()
    
    // Enhanced border
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 3
    this.ctx.stroke()
    
    // Inner highlight ring
    this.ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.arc(position.x, position.y, this.BUBBLE_SIZE / 2 - 4, 0, Math.PI * 2)
    this.ctx.stroke()
    
    this.ctx.restore()
    
    // Draw current word with enhanced text styling
    this.ctx.save()
    this.ctx.shadowColor = 'rgba(0,0,0,0.8)'
    this.ctx.shadowBlur = 4
    this.ctx.shadowOffsetX = 1
    this.ctx.shadowOffsetY = 1
    
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 18px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    // Use displayText if provided, otherwise fallback to first character
    const text = displayText || word.charAt(0).toUpperCase()
    
    this.ctx.fillText(text, position.x, position.y)
    this.ctx.restore()
  }

  public drawShootingBubble(bubble: Bubble): void {
    if (!this.ctx) return
    
    // Draw shooting bubble with enhanced glow to show it's active
    this.ctx.save()
    
    // Enhanced glow effect for shooting bubble
    this.ctx.shadowColor = bubble.color
    this.ctx.shadowBlur = 15
    
    // Pulsing effect (never exceeds static radius)
    const pulseIntensity = 0.98 + 0.02 * Math.sin(Date.now() * 0.01)
    
    // Draw bubble with extra bright gradient
    const sx = Math.round(bubble.x * 2) / 2
    const sy = Math.round(bubble.y * 2) / 2
    const r0 = this.BUBBLE_SIZE / 2 - 1
    const gradient = this.ctx.createRadialGradient(
      sx - this.BUBBLE_SIZE / 5, sy - this.BUBBLE_SIZE / 5, 0,
      sx, sy, r0
    )
    gradient.addColorStop(0, this.lightenColor(bubble.color, 0.5))
    gradient.addColorStop(1, bubble.color)
    
    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.arc(sx, sy, r0 * pulseIntensity, 0, Math.PI * 2)
    this.ctx.fill()
    
    // Enhanced border for shooting bubble
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 3
    this.ctx.stroke()
    
    // Extra bright inner highlight
    this.ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.arc(sx, sy, (r0 - 3) * pulseIntensity, 0, Math.PI * 2)
    this.ctx.stroke()
    
    this.ctx.restore()
    
    // Draw text with enhanced styling
    this.ctx.save()
    this.ctx.shadowColor = 'rgba(0,0,0,0.9)'
    this.ctx.shadowBlur = 5
    this.ctx.shadowOffsetX = 1
    this.ctx.shadowOffsetY = 1
    
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 17px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    // Use displayText if available, otherwise fallback to first character
    const text = bubble.displayText || bubble.word.charAt(0).toUpperCase()
    
    this.ctx.fillText(text, sx, sy)
    this.ctx.restore()
  }

  public drawExplosions(explosions: Explosion[]): void {
    if (!this.ctx) return
    
    explosions.forEach(explosion => {
      if (!explosion.active || !this.ctx) return
      
      // Draw shockwave
      if (explosion.shockwave.intensity > 0) {
        this.ctx.save()
        this.ctx.globalAlpha = explosion.shockwave.intensity * 0.3
        this.ctx.strokeStyle = '#FFD700'
        this.ctx.lineWidth = 2
        this.ctx.beginPath()
        this.ctx.arc(explosion.x, explosion.y, explosion.shockwave.radius, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.restore()
      }
      
      // Draw particles with enhanced effects
      explosion.particles.forEach(particle => {
        if (particle.life <= 0 || !this.ctx) return
        
        const alpha = particle.life / particle.maxLife
        this.ctx.save()
        this.ctx.translate(particle.x, particle.y)
        this.ctx.rotate(particle.rotation)
        this.ctx.globalAlpha = alpha
        
        // Different rendering based on particle type
        switch (particle.type) {
          case 'burst':
            // Main explosion particles with glow
            this.ctx.shadowColor = particle.color
            this.ctx.shadowBlur = particle.size * 2
            this.ctx.fillStyle = particle.color
            this.ctx.beginPath()
            this.ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2)
            this.ctx.fill()
            break
            
          case 'spark':
            // Fast, bright sparks
            this.ctx.strokeStyle = particle.color
            this.ctx.lineWidth = particle.size * alpha
            this.ctx.lineCap = 'round'
            this.ctx.beginPath()
            this.ctx.moveTo(-particle.size, 0)
            this.ctx.lineTo(particle.size, 0)
            this.ctx.stroke()
            break
            
          case 'glow':
            // Soft glowing particles
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * alpha)
            gradient.addColorStop(0, particle.color)
            gradient.addColorStop(1, 'transparent')
            this.ctx.fillStyle = gradient
            this.ctx.beginPath()
            this.ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2)
            this.ctx.fill()
            break
        }
        
        this.ctx.restore()
      })
    })
  }

  public drawAimLine(aimLine: AimLine, shooterPosition: Position): void {
    if (!this.ctx || !aimLine.visible) return
    
    this.ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    this.ctx.lineWidth = 2
    this.ctx.setLineDash([5, 5])
    this.ctx.beginPath()
    this.ctx.moveTo(shooterPosition.x, shooterPosition.y)
    this.ctx.lineTo(aimLine.x, aimLine.y)
    this.ctx.stroke()
    this.ctx.setLineDash([])
    
    // Add aim line glow effect
    this.ctx.shadowColor = '#fff'
    this.ctx.shadowBlur = 10
    this.ctx.stroke()
    this.ctx.shadowBlur = 0
  }

  private lightenColor(color: string, amount: number): string {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * amount * 100)
    const R = (num >> 16) + amt
    const G = (num >> 8 & 0x00FF) + amt
    const B = (num & 0x0000FF) + amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000
      + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100
      + (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1)
  }
}

export const useCanvasRenderer = (): ICanvasRenderer => {
  return new CanvasRenderer()
}
