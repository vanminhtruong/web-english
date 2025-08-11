import { ref } from 'vue'
import type { ISnakeCanvasRenderer, ISnakeStateManager, Food, Snake } from './types'

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

  // Draw a small label with the food meaning above the tile
  private drawFoodLabel(food: Food, variant: 'primary' | 'secondary') {
    if (!this.ctx) return
    const ctx = this.ctx
    const gridSize = this.gridSize.value
    const x = food.position.x * gridSize
    const y = food.position.y * gridSize

    const text = (food.meaning || food.word || '').toString()
    if (!text) return

    ctx.save()
    // Style: background and stroke depend on variant, dark-mode safe
    const bg = variant === 'primary' ? '#065f46' : '#7c2d12' // emerald-800 / amber-900-like
    const stroke = variant === 'primary' ? '#10b981' : '#f59e0b' // emerald-500 / amber-500
    const textColor = '#ffffff'

    ctx.font = `${Math.max(10, Math.floor(gridSize * 0.6))}px sans-serif`
    const paddingX = 6
    const paddingY = 4
    const metrics = ctx.measureText(text)
    const textWidth = metrics.width
    const labelWidth = textWidth + paddingX * 2
    const labelHeight = Math.max(gridSize * 0.7, 16)
    const labelX = x + gridSize / 2 - labelWidth / 2
    const labelY = y - labelHeight - 6 // 6px above the tile

    // Background rounded rect
    const r = 6
    ctx.beginPath()
    ctx.moveTo(labelX + r, labelY)
    ctx.lineTo(labelX + labelWidth - r, labelY)
    ctx.quadraticCurveTo(labelX + labelWidth, labelY, labelX + labelWidth, labelY + r)
    ctx.lineTo(labelX + labelWidth, labelY + labelHeight - r)
    ctx.quadraticCurveTo(labelX + labelWidth, labelY + labelHeight, labelX + labelWidth - r, labelY + labelHeight)
    ctx.lineTo(labelX + r, labelY + labelHeight)
    ctx.quadraticCurveTo(labelX, labelY + labelHeight, labelX, labelY + labelHeight - r)
    ctx.lineTo(labelX, labelY + r)
    ctx.quadraticCurveTo(labelX, labelY, labelX + r, labelY)
    ctx.closePath()
    ctx.fillStyle = bg
    ctx.fill()
    ctx.strokeStyle = stroke
    ctx.lineWidth = 2
    ctx.stroke()

    // Text
    ctx.fillStyle = textColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(text, labelX + labelWidth / 2, labelY + labelHeight / 2)

    ctx.restore()
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
    // Draw primary and secondary foods if available
    this.drawFood(stateManager.food.value, 'primary')
    this.drawFood(stateManager.secondaryFood?.value || null, 'secondary')
    // If double bait mode is enabled, show meaning labels above foods
    if ((stateManager as any).doubleBaitMode?.value) {
      if (stateManager.food.value) this.drawFoodLabel(stateManager.food.value, 'primary')
      if (stateManager.secondaryFood?.value) this.drawFoodLabel(stateManager.secondaryFood.value, 'secondary')
    }
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
    // Dark mode compliant background (no gray). Use project dark base.
    this.ctx.fillStyle = '#0a0a0a'
    this.ctx.fillRect(0, 0, this.canvasWidth.value, this.canvasHeight.value)
  }

  private drawGrid() {
    if (!this.ctx) return
    
    // Subtle grid lines without using gray in dark mode
    this.ctx.strokeStyle = '#0f0f0f'
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

  private drawFood(food: Food | null, variant: 'primary' | 'secondary' = 'primary') {
    if (!this.ctx || !food) return
    
    const gridSize = this.gridSize.value
    const x = food.position.x * gridSize
    const y = food.position.y * gridSize

    // Food - tomato circle with glossy highlight
    // Use distinct color for secondary (wrong) food
    this.ctx.fillStyle = variant === 'secondary' ? '#f59e0b' : '#ef4444'
    this.ctx.beginPath()
    this.ctx.arc(x + gridSize / 2, y + gridSize / 2, gridSize * 0.35, 0, Math.PI * 2)
    this.ctx.fill()
    
    // Food glossy highlight
    this.ctx.fillStyle = 'rgba(255,255,255,0.8)'
    this.ctx.beginPath()
    this.ctx.arc(x + gridSize / 2 - 3, y + gridSize / 2 - 3, gridSize * 0.12, 0, Math.PI * 2)
    this.ctx.fill()

    // Letter inside food
    this.ctx.fillStyle = '#111827'
    this.ctx.font = `${Math.floor(gridSize * 0.6)}px Inter, system-ui, -apple-system, Segoe UI, Roboto`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      food.firstLetter,
      x + gridSize / 2,
      y + gridSize / 2
    )
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

export default SnakeCanvasRenderer
