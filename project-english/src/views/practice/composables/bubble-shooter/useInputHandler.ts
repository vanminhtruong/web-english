import type { IInputHandler, Position } from './interfaces'

export class InputHandler implements IInputHandler {
  public updateAim(event: MouseEvent, canvas: HTMLCanvasElement): Position | null {
    // Get canvas bounding rect for accurate positioning across all screen sizes
    const rect = canvas.getBoundingClientRect()
    
    // Calculate mouse position relative to canvas with responsive scaling
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    // Accurate mouse coordinates for xs/sm/md/lg/xl screens
    const mouseX = (event.clientX - rect.left) * scaleX
    const mouseY = (event.clientY - rect.top) * scaleY
    
    console.log(`Mouse: ${event.clientX}, ${event.clientY} | Canvas: ${mouseX}, ${mouseY} | Scale: ${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}`)
    
    // Calculate shooter position (assuming it's at bottom center)
    const shooterX = canvas.width / 2
    const shooterY = canvas.height - 50
    
    // Calculate distance for aim line
    const dx = mouseX - shooterX
    const dy = mouseY - shooterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Only show aim if mouse is above shooter (can't shoot backwards)
    if (mouseY < shooterY - 20 && distance > 20) {
      return {
        x: mouseX,
        y: mouseY
      }
    }
    
    return null
  }

  public getShootingVector(
    event: MouseEvent, 
    canvas: HTMLCanvasElement, 
    shooterPosition: Position
  ): { vx: number; vy: number } | null {
    // Get canvas bounding rect for accurate positioning across all screen sizes  
    const rect = canvas.getBoundingClientRect()
    if (!rect) return null
    
    // Calculate responsive mouse position with proper scaling
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    // Accurate target coordinates for xs/sm/md/lg/xl screens
    const targetX = (event.clientX - rect.left) * scaleX
    const targetY = (event.clientY - rect.top) * scaleY
    
    console.log(`Shooting at: ${targetX}, ${targetY} (scaled from ${event.clientX}, ${event.clientY})`)
    
    // Compute reflected aim identical to the on-screen preview (max 2 bounces)
    const BUBBLE_SIZE = 40
    const leftX = BUBBLE_SIZE / 2
    const rightX = canvas.width - BUBBLE_SIZE / 2
    const topY = BUBBLE_SIZE / 2

    // Initial direction towards the mouse
    let vx = targetX - shooterPosition.x
    let vy = targetY - shooterPosition.y
    const len0 = Math.sqrt(vx * vx + vy * vy) || 1
    vx /= len0
    vy /= len0
    if (vy > -0.01) vy = -0.01 // ensure upward

    // Simulate to find the first segment endpoint (earliest hit with wall or top)
    let px = shooterPosition.x
    let py = shooterPosition.y
    let bounces = 0
    const maxBounces = 2
    let endX = targetX
    let endY = targetY
    while (bounces <= maxBounces) {
      const tTop = (topY - py) / vy // vy < 0
      let tWall = Number.POSITIVE_INFINITY
      let hitRight = false
      if (vx > 0) {
        tWall = (rightX - px) / vx
        hitRight = true
      } else if (vx < 0) {
        tWall = (leftX - px) / vx
        hitRight = false
      }
      const tMin = Math.min(
        tTop > 0 ? tTop : Number.POSITIVE_INFINITY,
        tWall > 0 ? tWall : Number.POSITIVE_INFINITY
      )
      endX = px + vx * tMin
      endY = py + vy * tMin
      // Stop at first intersection (we only need the initial segment for launch)
      break
    }

    // Final launch vector aims to the first-segment endpoint
    const dx = endX - shooterPosition.x
    const dy = endY - shooterPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy) || 1
    const speed = 8
    const normalizedDx = (dx / distance) * speed
    const normalizedDy = (dy / distance) * speed

    console.log(`Direction (reflected): dx=${normalizedDx.toFixed(2)}, dy=${normalizedDy.toFixed(2)}`)

    return { vx: normalizedDx, vy: normalizedDy }
  }
}

export const useInputHandler = (): IInputHandler => {
  return new InputHandler()
}
