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
    // Exact tangency threshold: centers are one diameter apart
    return distance <= this.BUBBLE_SIZE
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
            console.log('Collision detected! Stopping animation immediately')
            // Reposition to exact tangency to avoid visual overlap
            let dx = bubble.x - existing.x
            let dy = bubble.y - existing.y
            let dist = Math.sqrt(dx * dx + dy * dy)
            if (dist === 0) {
              // Use reverse of velocity or default up if zero
              const rvx = -currentVx
              const rvy = -currentVy
              const norm = Math.hypot(rvx, rvy) || 1
              dx = rvx / norm
              dy = rvy / norm
              dist = 1
            }
            const scale = this.BUBBLE_SIZE / dist
            const newX = existing.x + dx * scale
            const newY = existing.y + dy * scale
            // Clamp to boundaries and half-pixel align for crisp render
            bubble.x = Math.round(Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasWidth - this.BUBBLE_SIZE / 2, newX)) * 2) / 2
            bubble.y = Math.round(Math.max(this.BUBBLE_SIZE / 2, Math.min(canvasHeight - this.BUBBLE_SIZE / 2, newY)) * 2) / 2
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
    
    // Find the closest valid grid position to where the bubble currently is
    // This ensures bubble lands exactly where it should, not "sượt sang chỗ khác"
    
    // Calculate target row based on Y position using exact hex spacing (sqrt(3)/2 * d)
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    let targetRow = Math.max(0, Math.round((bubble.y - this.BUBBLE_SIZE / 2 - 5) / verticalSpacing))
    const baseX = this.BUBBLE_SIZE / 2 + 5

    // Determine the effective horizontal stagger (0 or B/2) for a given row
    const getEffectiveOffsetForRow = (row: number): number => {
      // Infer row membership from Y to avoid relying on possibly stale b.row after insert
      const baseY = this.BUBBLE_SIZE / 2 + 5
      const rowBubbles = existingBubbles.filter(b => {
        const r = Math.round((b.y - baseY) / verticalSpacing)
        return r === row
      })
      if (rowBubbles.length === 0) {
        // Fallback to nominal parity when no bubbles in this row yet
        return row % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
      }
      let devEven = 0, devOdd = 0
      for (const b of rowBubbles) {
        const colEven = Math.round((b.x - (baseX + 0)) / this.BUBBLE_SIZE)
        const snapEven = baseX + colEven * this.BUBBLE_SIZE
        devEven += Math.abs(b.x - snapEven)

        const colOdd = Math.round((b.x - (baseX + this.BUBBLE_SIZE / 2)) / this.BUBBLE_SIZE)
        const snapOdd = baseX + this.BUBBLE_SIZE / 2 + colOdd * this.BUBBLE_SIZE
        devOdd += Math.abs(b.x - snapOdd)
      }
      return devEven <= devOdd ? 0 : this.BUBBLE_SIZE / 2
    }
    
    // If we just collided and are close to a neighbor, prefer an adjacent cell to that neighbor
    const baseY = this.BUBBLE_SIZE / 2 + 5
    let closest: Bubble | null = null
    let closestDist = Infinity
    for (const ex of existingBubbles) {
      const dx = ex.x - bubble.x
      const dy = ex.y - bubble.y
      const d = Math.hypot(dx, dy)
      if (d < closestDist) { closestDist = d; closest = ex }
    }
    if (closest && closestDist <= this.BUBBLE_SIZE + 1) {
      // Determine neighbor's grid coords
      const rowC = Math.max(0, Math.round((closest.y - baseY) / verticalSpacing))
      const offC = getEffectiveOffsetForRow(rowC)
      const colC = Math.max(0, Math.round((closest.x - (baseX + offC)) / this.BUBBLE_SIZE))
      // Neighbor candidates around (rowC,colC) depending on row parity
      const isOdd = offC !== 0
      const deltas = isOdd
        ? [ [0,-1],[0,1], [-1,0],[-1,1], [1,0],[1,1] ]
        : [ [0,-1],[0,1], [-1,-1],[-1,0], [1,-1],[1,0] ]
      let bestX = 0, bestY = 0, bestRow = 0, bestCol = 0
      let bestScore = Infinity
      for (const [dr, dc] of deltas) {
        const rr = Math.max(0, rowC + dr)
        const offR = getEffectiveOffsetForRow(rr)
        const cc = Math.max(0, colC + dc)
        const tx = Math.round((baseX + offR + cc * this.BUBBLE_SIZE) * 2) / 2
        const ty = Math.round((baseY + rr * verticalSpacing) * 2) / 2
        // Skip if occupied
        const occ = existingBubbles.some(e => Math.hypot(e.x - tx, e.y - ty) < this.BUBBLE_SIZE * 0.8)
        if (occ) continue
        const score = Math.hypot(bubble.x - tx, bubble.y - ty)
        if (score < bestScore) {
          bestScore = score; bestX = tx; bestY = ty; bestRow = rr; bestCol = cc
        }
      }
      if (bestScore < Infinity) {
        bubble.row = bestRow
        bubble.col = bestCol
        bubble.x = bestX
        bubble.y = bestY
        console.log('Snapped relative to neighbor for exact adjacency')
        return
      }
    }

    // Calculate target column based on X position and the effective row offset
    const offsetX = getEffectiveOffsetForRow(targetRow)
    let targetCol = Math.max(0, Math.round((bubble.x - baseX - offsetX) / this.BUBBLE_SIZE))
    
    // Calculate exact grid position
    const gridX = Math.round((baseX + offsetX + targetCol * this.BUBBLE_SIZE) * 2) / 2
    const gridY = Math.round((this.BUBBLE_SIZE / 2 + 5 + targetRow * verticalSpacing) * 2) / 2
    
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
            const testOffsetX = getEffectiveOffsetForRow(testRow)
            const testCol = Math.max(0, targetCol + dc)
            
            const testX = Math.round((baseX + testOffsetX + testCol * this.BUBBLE_SIZE) * 2) / 2
            const testY = Math.round((this.BUBBLE_SIZE / 2 + 5 + testRow * verticalSpacing) * 2) / 2
            
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
      
      // Final fallback - place at top with correct effective offset for row 0
      if (!foundSpot) {
        console.log('No spot found, placing at top')
        const offset0 = getEffectiveOffsetForRow(0)
        bubble.row = 0
        bubble.col = targetCol
        bubble.x = Math.round((baseX + offset0 + targetCol * this.BUBBLE_SIZE) * 2) / 2
        bubble.y = Math.round((this.BUBBLE_SIZE / 2 + 5) * 2) / 2
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
