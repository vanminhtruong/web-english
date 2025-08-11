import type { IPhysicsEngine, IGameStateManager, Bubble } from './interfaces'

export class PhysicsEngine implements IPhysicsEngine {
  public readonly BUBBLE_SIZE = 40
  public readonly COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB347']
  // Small epsilon to treat tiny gaps as contact to avoid visible spacing
  public readonly CONTACT_EPS = 8

  private readonly wordColorMap = new Map<string, string>()
  private stateManager?: IGameStateManager

  constructor(stateManager?: IGameStateManager) {
    this.stateManager = stateManager
  }
  
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
    // Collision threshold at exactly one diameter - perfect tangency
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
          // Use stable positions during animation for collision detection
          const isAnimating = this.stateManager?.rowAnimationActive.value
          const existingX = isAnimating && existing.stableX !== undefined ? existing.stableX : existing.x
          const existingY = isAnimating && existing.stableY !== undefined ? existing.stableY : existing.y
          
          // Compute distance and detect collision or near-contact when approaching/slow
          const dx0 = bubble.x - existingX
          const dy0 = bubble.y - existingY
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0)
          // Near-contact detection - reduce threshold to avoid false collision with new rows
          const nearThreshold = this.BUBBLE_SIZE + this.CONTACT_EPS

          // Only consider near-contact if we are APPROACHING the existing bubble
          const approaching = (dx0 * currentVx + dy0 * currentVy) <= 0

          if (dist0 <= nearThreshold && approaching) {
            console.log('Collision/near-contact detected! Computing tangent and triple-contact placement')

            // Step 1: Find exact tangent direction relative to the collided bubble
            let dx = dx0
            let dy = dy0
            let dist = dist0

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

            // Step 2: Calculate perfect tangent position (centers one diameter apart)
            // Use stable position for tangent calculation during animation
            const tangentX = existingX + dx * this.BUBBLE_SIZE
            const tangentY = existingY + dy * this.BUBBLE_SIZE

            // Step 3: Use simple tangent position for now (disable triple-contact to fix grid alignment)
            bubble.x = tangentX
            bubble.y = tangentY

            // Always snap to proper hex grid position after collision
            if (existingBubbles) {
              this.snapToGrid(bubble, existingBubbles)
              // Force exact hex grid position to ensure proper alignment and avoid occupied seats
              this.forceToNearestFreeSeat(bubble, existingBubbles, canvasWidth, canvasHeight)
            } else {
              const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
              const baseX = this.BUBBLE_SIZE / 2
              const baseY = this.BUBBLE_SIZE / 2
              bubble.row = Math.max(0, Math.round((bubble.y - baseY) / verticalSpacing))
              bubble.col = Math.max(0, Math.round((bubble.x - baseX) / this.BUBBLE_SIZE))
            }

            // Stop all movement to prevent sliding
            currentVx = 0
            currentVy = 0
            
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
      
      // Top boundary - bubble sticks immediately (no bounce) with proper grid positioning
      if (bubble.y <= this.BUBBLE_SIZE / 2) {
        bubble.y = this.BUBBLE_SIZE / 2
        
        // ALWAYS snap to exact grid position for top row to ensure even spacing
        const baseX = this.BUBBLE_SIZE / 2
        const targetCol = Math.round((bubble.x - baseX) / this.BUBBLE_SIZE)
        bubble.x = baseX + targetCol * this.BUBBLE_SIZE
        bubble.row = 0
        bubble.col = Math.max(0, targetCol)
        
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
        // Before finalizing landing, if we're near any existing bubble, snap to tangency (and try triple-contact)
        if (existingBubbles && existingBubbles.length > 0) {
          const captureRadius = this.BUBBLE_SIZE + this.CONTACT_EPS // capture near-miss seats consistently
          let nearest: Bubble | null = null
          let bestDist = Number.POSITIVE_INFINITY
          for (const b of existingBubbles) {
            const dx = bubble.x - b.x
            const dy = bubble.y - b.y
            const d = Math.sqrt(dx * dx + dy * dy)
            // Only capture if approaching this bubble (avoid grabbing moving/retreating targets)
            const dot = dx * currentVx + dy * currentVy
            if (dot > 0) continue
            if (d < captureRadius && d < bestDist) {
              nearest = b
              bestDist = d
            }
          }

          if (nearest) {
            // Compute tangent point relative to the nearest bubble
            let ndx = bubble.x - nearest.x
            let ndy = bubble.y - nearest.y
            const nlen = Math.sqrt(ndx * ndx + ndy * ndy) || 1
            ndx /= nlen
            ndy /= nlen
            const tangentX = nearest.x + ndx * this.BUBBLE_SIZE
            const tangentY = nearest.y + ndy * this.BUBBLE_SIZE

            // Try triple-contact slide using the nearest as the collided reference
            const triple = this.findTripleContactPosition(
              nearest,
              existingBubbles,
              { x: tangentX, y: tangentY },
              canvasWidth,
              canvasHeight
            )
            const finalX = triple ? triple.x : tangentX
            const finalY = triple ? triple.y : tangentY

            bubble.x = finalX
            bubble.y = finalY
            this.snapToGrid(bubble, existingBubbles)
            // Force exact hex grid position to ensure proper alignment and avoid occupied seats
            this.forceToNearestFreeSeat(bubble, existingBubbles, canvasWidth, canvasHeight)
            
            onLand(bubble)
            return
          }
        }

        // Bubble has landed - trigger callback
        onLand(bubble)
        return
      }
      
      requestAnimationFrame(animate)
    }
    animate()
  }

  // Attempt to find a position where the new bubble touches the collided bubble
  // and one of its neighbors simultaneously (triple-contact). Returns null if none valid.
  private findTripleContactPosition(
    collided: Bubble,
    existingBubbles: Bubble[],
    tangentPoint: { x: number; y: number },
    canvasWidth: number,
    canvasHeight: number
  ): { x: number; y: number } | null {
    const R = this.BUBBLE_SIZE // We use center-to-center distance equal to diameter for tangency
    const rWall = this.BUBBLE_SIZE / 2

    // Helper: circle-circle intersections where both radii are R
    const intersections = (ax: number, ay: number, bx: number, by: number): { x: number; y: number }[] => {
      const dx = bx - ax
      const dy = by - ay
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 1e-6 || d > 2 * R) return []
      const a = d / 2
      const h2 = R * R - a * a
      if (h2 < -1e-6) return []
      const h = h2 > 0 ? Math.sqrt(Math.max(0, h2)) : 0
      const mx = ax + (a * dx) / d
      const my = ay + (a * dy) / d
      const rx = (-dy * h) / d
      const ry = (dx * h) / d
      return [
        { x: mx + rx, y: my + ry },
        { x: mx - rx, y: my - ry },
      ]
    }

    // Helper: within canvas bounds considering radius
    const inBounds = (x: number, y: number) => (
      x >= rWall && x <= canvasWidth - rWall && y >= rWall && y <= canvasHeight - rWall
    )

    // Helper: ensure no overlap with other bubbles (allow exact tangency)
    const positionFree = (x: number, y: number) => {
      for (const b of existingBubbles) {
        const dx = b.x - x
        const dy = b.y - y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < this.BUBBLE_SIZE - 0.1) return false
      }
      return true
    }

    // Consider neighbors of the collided bubble (those close to one diameter)
    const neighbors = existingBubbles.filter(b => b !== collided).filter(b => {
      const dx = b.x - collided.x
      const dy = b.y - collided.y
      const d = Math.sqrt(dx * dx + dy * dy)
      return d > 0.5 * this.BUBBLE_SIZE && d < 1.5 * this.BUBBLE_SIZE
    })

    let best: { x: number; y: number } | null = null
    let bestScore = Number.POSITIVE_INFINITY

    for (const nb of neighbors) {
      const pts = intersections(collided.x, collided.y, nb.x, nb.y)
      for (const p of pts) {
        if (!inBounds(p.x, p.y)) continue
        if (!positionFree(p.x, p.y)) continue
        // Score by proximity to tangent point (simulate sliding to nearest seat)
        const dx = p.x - tangentPoint.x
        const dy = p.y - tangentPoint.y
        const score = dx * dx + dy * dy
        if (score < bestScore) {
          best = p
          bestScore = score
        }
      }
    }

    return best
  }

  // Quantize the dynamic baseY to the nearest valid grid line to stabilize row/column mapping
  private getQuantizedBaseY(existingBubbles: Bubble[]): number {
    if (!existingBubbles || existingBubbles.length === 0) return this.BUBBLE_SIZE / 2
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    const baseRef = this.BUBBLE_SIZE / 2
    
    // CRITICAL FIX: Check if row animation is active
    const isAnimating = this.stateManager?.rowAnimationActive.value
    
    if (isAnimating) {
      // During animation: Use the stable reference Y position of row 0 bubbles
      // Filter out new row bubbles (negative row numbers) to get stable grid reference
      const stableRowBubbles = existingBubbles.filter(b => (b.row ?? 0) >= 0)
      if (stableRowBubbles.length === 0) return baseRef
      
      // Use the minimum actual row number (not animated position)
      const minRow = Math.min(...stableRowBubbles.map(b => b.row ?? 0))
      const quantized = baseRef + minRow * verticalSpacing
      
      console.log('getQuantizedBaseY (ANIMATION): minRow =', minRow, 'quantized baseY =', quantized)
      return quantized
    } else {
      // Normal operation: Use row-based calculation
      const minRow = Math.min(...existingBubbles.map(b => b.row ?? 0))
      const quantized = baseRef + minRow * verticalSpacing
      
      console.log('getQuantizedBaseY (NORMAL): minRow =', minRow, 'quantized baseY =', quantized)
      return quantized
    }
  }

  // Compute the pixel center for a given grid seat (row, col)
  private getSeatCenter(row: number, col: number, existingBubbles: Bubble[]): { x: number; y: number } {
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    const baseX = this.BUBBLE_SIZE / 2
    const baseY = this.getQuantizedBaseY(existingBubbles)
    const offsetX = row % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
    const x = baseX + offsetX + col * this.BUBBLE_SIZE
    const y = baseY + row * verticalSpacing
    return { x, y }
  }

  // Check if a seat (by center coords) is already occupied by an existing bubble
  private isSeatOccupied(x: number, y: number, existingBubbles: Bubble[]): boolean {
    const seatTol = 0.25 // tolerance for seat center equality
    const isAnimating = this.stateManager?.rowAnimationActive.value
    
    for (const b of existingBubbles) {
      // Use stable positions during animation for accurate seat occupancy check
      const bubbleX = isAnimating && b.stableX !== undefined ? b.stableX : b.x
      const bubbleY = isAnimating && b.stableY !== undefined ? b.stableY : b.y
      
      const dx = bubbleX - x
      const dy = bubbleY - y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d <= seatTol) return true
    }
    return false
  }

  // Force bubble to its computed seat or the nearest free seat to avoid overlaps/mis-seating
  private forceToNearestFreeSeat(
    bubble: Bubble,
    existingBubbles: Bubble[],
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const rWall = this.BUBBLE_SIZE / 2
    const inBounds = (x: number, y: number) => (
      x >= rWall && x <= canvasWidth - rWall && y >= rWall && y <= canvasHeight - rWall
    )

    // First try the intended seat
    let center = this.getSeatCenter(bubble.row!, bubble.col!, existingBubbles)
    if (inBounds(center.x, center.y) && !this.isSeatOccupied(center.x, center.y, existingBubbles)) {
      bubble.x = center.x
      bubble.y = center.y
      return
    }

    // Search nearby seats within a small window for a free slot nearest to current position
    let best: { row: number; col: number; x: number; y: number } | null = null
    let bestScore = Number.POSITIVE_INFINITY
    const MAX_DELTA = 2
    for (let dr = -MAX_DELTA; dr <= MAX_DELTA; dr++) {
      const rr = Math.max(0, bubble.row! + dr)
      for (let dc = -MAX_DELTA; dc <= MAX_DELTA; dc++) {
        const cc = Math.max(0, bubble.col! + dc)
        center = this.getSeatCenter(rr, cc, existingBubbles)
        if (!inBounds(center.x, center.y)) continue
        if (this.isSeatOccupied(center.x, center.y, existingBubbles)) continue
        const dx = center.x - bubble.x
        const dy = center.y - bubble.y
        const score = dx * dx + dy * dy
        if (score < bestScore) {
          bestScore = score
          best = { row: rr, col: cc, x: center.x, y: center.y }
        }
      }
    }

    if (best) {
      bubble.row = best.row
      bubble.col = best.col
      bubble.x = best.x
      bubble.y = best.y
    } else {
      // Fallback: clamp to bounds at least
      bubble.x = Math.max(rWall, Math.min(canvasWidth - rWall, center.x))
      bubble.y = Math.max(rWall, Math.min(canvasHeight - rWall, center.y))
    }
  }

  public snapToGrid(bubble: Bubble, existingBubbles: Bubble[]): void {
    console.log('Snapping bubble to grid. Current position:', bubble.x, bubble.y)
    
    // Simplified approach: Keep bubble at its collision-corrected position 
    // and only assign grid coordinates (row/col) without moving it
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    const baseX = this.BUBBLE_SIZE / 2  // Remove +5 to align with initial bubbles at edge
    
    // Use dynamic baseY to handle row insertion animation (same as collision logic)
    const baseY = this.getQuantizedBaseY(existingBubbles)
    
    // Calculate row/col based on current position
    const targetRow = Math.max(0, Math.round((bubble.y - baseY) / verticalSpacing))
    
    // Deterministic row parity for offset (avoid heuristic that can flip during row insertion)
    const offsetX = targetRow % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
    
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

export const usePhysicsEngine = (stateManager?: IGameStateManager): IPhysicsEngine => {
  return new PhysicsEngine(stateManager)
}
