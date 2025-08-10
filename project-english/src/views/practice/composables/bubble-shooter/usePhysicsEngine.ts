import type { IPhysicsEngine, Bubble } from './interfaces'

export class PhysicsEngine implements IPhysicsEngine {
  public readonly BUBBLE_SIZE = 40
  public readonly COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB347']

  private readonly wordColorMap = new Map<string, string>()
  
  public getColorForWord(word: string): string {
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

  public checkCollision(bubble1: Bubble, bubble2: Bubble): boolean {
    const dx = bubble2.x - bubble1.x
    const dy = bubble2.y - bubble1.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    // Collision threshold slightly before tangency to allow precise positioning
    return distance <= this.BUBBLE_SIZE * 0.95
  }

  public animateShootingBubble(
    bubble: Bubble,
    vx: number,
    vy: number,
    onLand: (bubble: Bubble) => void,
    existingBubbles?: Bubble[],
    canvasWidth: number = 800,
    canvasHeight: number = 600
  ): void {
    let bounceCount = 0
    const maxBounces = 3
    let currentVx = vx
    let currentVy = vy
    
    const animate = () => {
      bubble.x += currentVx
      bubble.y += currentVy
      
      // CRITICAL FIX: Check collision with existing bubbles FIRST
      if (existingBubbles) {
        for (const existing of existingBubbles) {
          if (this.checkCollision(bubble, existing)) {
            console.log('Collision detected! Placing at exact tangency grid position')
            
            // Step 1: Find exact tangent position relative to the collided bubble
            let dx = bubble.x - existing.x
            let dy = bubble.y - existing.y
            let dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < 0.01) {
              // Use velocity direction for separation
              dx = -currentVx || 0
              dy = -currentVy || -1
              const norm = Math.sqrt(dx * dx + dy * dy) || 1
              dx /= norm
              dy /= norm
            } else {
              dx /= dist
              dy /= dist
            }
            
            // Step 2: Calculate perfect tangent position (exactly one diameter away)
            const tangentX = existing.x + dx * this.BUBBLE_SIZE
            const tangentY = existing.y + dy * this.BUBBLE_SIZE
            
            // Step 3: Snap tangent position to nearest hex grid that maintains spacing
            const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
            const baseX = this.BUBBLE_SIZE / 2 + 5
            const baseY = this.BUBBLE_SIZE / 2 + 5
            
            const targetRow = Math.max(0, Math.round((tangentY - baseY) / verticalSpacing))
            
            // Determine row offset based on existing bubbles in target row
            const rowBubbles = existingBubbles.filter(b => {
              const r = Math.round((b.y - baseY) / verticalSpacing)
              return r === targetRow
            })
            
            let offsetX = targetRow % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
            if (rowBubbles.length > 0) {
              let devEven = 0, devOdd = 0
              for (const b of rowBubbles) {
                const colEven = Math.round((b.x - (baseX + 0)) / this.BUBBLE_SIZE)
                const snapEven = baseX + colEven * this.BUBBLE_SIZE
                devEven += Math.abs(b.x - snapEven)

                const colOdd = Math.round((b.x - (baseX + this.BUBBLE_SIZE / 2)) / this.BUBBLE_SIZE)
                const snapOdd = baseX + this.BUBBLE_SIZE / 2 + colOdd * this.BUBBLE_SIZE
                devOdd += Math.abs(b.x - snapOdd)
              }
              offsetX = devEven <= devOdd ? 0 : this.BUBBLE_SIZE / 2
            }
            
            const targetCol = Math.max(0, Math.round((tangentX - baseX - offsetX) / this.BUBBLE_SIZE))
            const finalX = baseX + offsetX + targetCol * this.BUBBLE_SIZE
            const finalY = baseY + targetRow * verticalSpacing
            
            // Verify this position maintains exactly one diameter distance from all neighbors
            const isValidPosition = existingBubbles.every(ex => {
              const dx = ex.x - finalX
              const dy = ex.y - finalY
              const dist = Math.sqrt(dx * dx + dy * dy)
              return dist >= this.BUBBLE_SIZE * 0.99 // At least 99% of diameter
            })
            
            if (isValidPosition) {
              bubble.x = finalX
              bubble.y = finalY
              bubble.row = targetRow
              bubble.col = targetCol
            } else {
              // Fallback: place at clamped tangent position
              bubble.x = Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasWidth - this.BUBBLE_SIZE / 2, tangentX))
              bubble.y = Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasHeight - this.BUBBLE_SIZE / 2, tangentY))
              bubble.row = targetRow
              bubble.col = targetCol
            }
            onLand(bubble)
            return
          }
        }
      }
      
      // Enhanced wall collision with bounce effect - FIXED: Use dynamic canvas dimensions
      if (bubble.x <= this.BUBBLE_SIZE / 2 || bubble.x >= canvasWidth - this.BUBBLE_SIZE / 2) {
        currentVx = -currentVx * 0.8 // Energy loss on bounce
        bounceCount++
        
        // Clamp position to prevent getting stuck in walls - FIXED: Use dynamic canvas width
        bubble.x = Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasWidth - this.BUBBLE_SIZE / 2, bubble.x))
      }
      
      // Top boundary - bubble sticks immediately (no bounce)
      if (bubble.y <= this.BUBBLE_SIZE / 2) {
        bubble.y = this.BUBBLE_SIZE / 2
        currentVy = 0
        bounceCount = maxBounces // Force bubble to land
      }
      
      // Bottom boundary check - prevent bubble from escaping - FIXED: Use dynamic canvas height
      if (bubble.y >= canvasHeight - this.BUBBLE_SIZE / 2) {
        // Force bubble to stick at bottom
        bubble.y = canvasHeight - this.BUBBLE_SIZE / 2
        currentVy = 0
        bounceCount = maxBounces // Force stop
      }
      
      // Remove problematic gravity - causes bubbles to bounce downward
      // Only apply minimal gravity if bubble is falling freely (not after wall bounce)
      if (bounceCount > 0 && currentVy > 2) {
        currentVy += 0.05 // Much reduced gravity, only when already falling fast
      }
      
      // Check if bubble should stick to walls (more aggressive sticking) - FIXED: Use dynamic canvas dimensions
      const slowMoving = Math.abs(currentVx) < 3 && Math.abs(currentVy) < 3
      const nearLeftWall = bubble.x <= this.BUBBLE_SIZE / 2 + 20
      const nearRightWall = bubble.x >= canvasWidth - this.BUBBLE_SIZE / 2 - 20
      const nearTopWall = bubble.y <= this.BUBBLE_SIZE / 2 + 20
      const stickToWall = bounceCount > 0 && (
        (slowMoving && (nearLeftWall || nearRightWall)) || 
        (nearTopWall && Math.abs(currentVy) < 2)
      )
      
      if ((bubble.y <= this.BUBBLE_SIZE / 2 && currentVy <= 0) || bounceCount >= maxBounces || stickToWall) {
        // Bubble has landed - trigger callback
        onLand(bubble)
        return
      }
      
      requestAnimationFrame(animate)
    }
    animate()
  }

  public snapToGrid(bubble: Bubble, existingBubbles: Bubble[]): void {
    console.log('Snapping bubble to grid. Current position:', bubble.x, bubble.y)
    
    // Simplified approach: Keep bubble at its collision-corrected position 
    // and only assign grid coordinates (row/col) without moving it
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    const baseX = this.BUBBLE_SIZE / 2 + 5
    const baseY = this.BUBBLE_SIZE / 2 + 5
    
    // Calculate row/col based on current position
    const targetRow = Math.max(0, Math.round((bubble.y - baseY) / verticalSpacing))
    
    // Determine effective offset for this row based on existing bubbles
    const rowBubbles = existingBubbles.filter(b => {
      const r = Math.round((b.y - baseY) / verticalSpacing)
      return r === targetRow
    })
    
    let offsetX = targetRow % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
    if (rowBubbles.length > 0) {
      let devEven = 0, devOdd = 0
      for (const b of rowBubbles) {
        const colEven = Math.round((b.x - (baseX + 0)) / this.BUBBLE_SIZE)
        const snapEven = baseX + colEven * this.BUBBLE_SIZE
        devEven += Math.abs(b.x - snapEven)

        const colOdd = Math.round((b.x - (baseX + this.BUBBLE_SIZE / 2)) / this.BUBBLE_SIZE)
        const snapOdd = baseX + this.BUBBLE_SIZE / 2 + colOdd * this.BUBBLE_SIZE
        devOdd += Math.abs(b.x - snapOdd)
      }
      offsetX = devEven <= devOdd ? 0 : this.BUBBLE_SIZE / 2
    }
    
    const targetCol = Math.max(0, Math.round((bubble.x - baseX - offsetX) / this.BUBBLE_SIZE))
    
    // Only assign grid coordinates, don't move the bubble from its collision-corrected position
    bubble.row = targetRow
    bubble.col = targetCol
    
    console.log('Grid coordinates assigned:', `row=${bubble.row}, col=${bubble.col}`, 'Position preserved:', bubble.x, bubble.y)
  }

  public lightenColor(color: string, amount: number): string {
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

export const usePhysicsEngine = (): IPhysicsEngine => {
  return new PhysicsEngine()
}
