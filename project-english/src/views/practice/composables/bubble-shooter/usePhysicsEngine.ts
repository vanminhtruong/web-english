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
    return distance < this.BUBBLE_SIZE * 1.0
  }

  public animateShootingBubble(
    bubble: Bubble,
    vx: number,
    vy: number,
    onLand: (bubble: Bubble) => void,
    existingBubbles?: Bubble[]
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
            console.log('Collision detected! Stopping animation immediately')
            onLand(bubble)
            return
          }
        }
      }
      
      // Enhanced wall collision with bounce effect
      if (bubble.x <= this.BUBBLE_SIZE / 2 || bubble.x >= 800 - this.BUBBLE_SIZE / 2) {
        currentVx = -currentVx * 0.8 // Energy loss on bounce
        bounceCount++
        
        // Clamp position to prevent getting stuck in walls
        bubble.x = Math.max(this.BUBBLE_SIZE / 2, Math.min(800 - this.BUBBLE_SIZE / 2, bubble.x))
      }
      
      // Top boundary - bubble sticks immediately (no bounce)
      if (bubble.y <= this.BUBBLE_SIZE / 2) {
        bubble.y = this.BUBBLE_SIZE / 2
        currentVy = 0
        bounceCount = maxBounces // Force bubble to land
      }
      
      // Bottom boundary check - prevent bubble from escaping
      if (bubble.y >= 600 - this.BUBBLE_SIZE / 2) {
        // Force bubble to stick at bottom
        bubble.y = 600 - this.BUBBLE_SIZE / 2
        currentVy = 0
        bounceCount = maxBounces // Force stop
      }
      
      // Remove problematic gravity - causes bubbles to bounce downward
      // Only apply minimal gravity if bubble is falling freely (not after wall bounce)
      if (bounceCount > 0 && currentVy > 2) {
        currentVy += 0.05 // Much reduced gravity, only when already falling fast
      }
      
      // Check if bubble should stick to walls (more aggressive sticking)
      const slowMoving = Math.abs(currentVx) < 3 && Math.abs(currentVy) < 3
      const nearLeftWall = bubble.x <= this.BUBBLE_SIZE / 2 + 20
      const nearRightWall = bubble.x >= 800 - this.BUBBLE_SIZE / 2 - 20
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
    
    // Find the closest valid grid position to where the bubble currently is
    // This ensures bubble lands exactly where it should, not "sượt sang chỗ khác"
    
    // Calculate target row based on Y position
    let targetRow = Math.max(0, Math.round((bubble.y - this.BUBBLE_SIZE / 2 - 5) / this.BUBBLE_SIZE))
    
    // Calculate target column based on X position and row offset
    const offsetX = targetRow % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
    let targetCol = Math.max(0, Math.round((bubble.x - this.BUBBLE_SIZE / 2 - offsetX - 5) / this.BUBBLE_SIZE))
    
    // Calculate exact grid position
    const gridX = targetCol * this.BUBBLE_SIZE + this.BUBBLE_SIZE / 2 + offsetX + 5
    const gridY = targetRow * this.BUBBLE_SIZE + this.BUBBLE_SIZE / 2 + 5
    
    console.log(`Target grid position: row=${targetRow}, col=${targetCol}, x=${gridX}, y=${gridY}`)
    
    // Check if this exact position is occupied
    const occupied = existingBubbles.some(existing => {
      const dx = existing.x - gridX
      const dy = existing.y - gridY
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < this.BUBBLE_SIZE * 0.8 // Close enough to be considered occupied
    })
    
    if (!occupied) {
      // Perfect! Place bubble exactly where it should be
      console.log('Position available, placing bubble at target position')
      bubble.row = targetRow
      bubble.col = targetCol
      bubble.x = gridX
      bubble.y = gridY
    } else {
      // Position occupied, find nearest available spot
      console.log('Position occupied, finding nearest available spot')
      
      let foundSpot = false
      let searchRadius = 1
      
      while (!foundSpot && searchRadius <= 3) {
        // Try positions in expanding radius
        for (let dr = -searchRadius; dr <= searchRadius && !foundSpot; dr++) {
          for (let dc = -searchRadius; dc <= searchRadius && !foundSpot; dc++) {
            if (Math.abs(dr) !== searchRadius && Math.abs(dc) !== searchRadius) continue // Only check perimeter
            
            const testRow = Math.max(0, targetRow + dr)
            const testOffsetX = testRow % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
            const testCol = Math.max(0, targetCol + dc)
            
            const testX = testCol * this.BUBBLE_SIZE + this.BUBBLE_SIZE / 2 + testOffsetX + 5
            const testY = testRow * this.BUBBLE_SIZE + this.BUBBLE_SIZE / 2 + 5
            
            const testOccupied = existingBubbles.some(existing => {
              const dx = existing.x - testX
              const dy = existing.y - testY
              const distance = Math.sqrt(dx * dx + dy * dy)
              return distance < this.BUBBLE_SIZE * 0.8
            })
            
            if (!testOccupied) {
              console.log(`Found available spot at row=${testRow}, col=${testCol}`)
              bubble.row = testRow
              bubble.col = testCol
              bubble.x = testX
              bubble.y = testY
              foundSpot = true
            }
          }
        }
        searchRadius++
      }
      
      // Final fallback - place at top
      if (!foundSpot) {
        console.log('No spot found, placing at top')
        bubble.row = 0
        bubble.col = targetCol
        bubble.x = targetCol * this.BUBBLE_SIZE + this.BUBBLE_SIZE / 2 + 5
        bubble.y = this.BUBBLE_SIZE / 2 + 5
      }
    }
    
    console.log('Final bubble position:', bubble.x, bubble.y, `row=${bubble.row}, col=${bubble.col}`)
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
