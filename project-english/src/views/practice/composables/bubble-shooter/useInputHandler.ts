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
    
    // Calculate shooting direction with proper responsive coordinates
    const dx = targetX - shooterPosition.x
    const dy = targetY - shooterPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Normalize direction and set speed
    const speed = 8
    const normalizedDx = (dx / distance) * speed
    const normalizedDy = (dy / distance) * speed
    
    console.log(`Direction: dx=${normalizedDx.toFixed(2)}, dy=${normalizedDy.toFixed(2)}`)
    
    return {
      vx: normalizedDx,
      vy: normalizedDy
    }
  }
}

export const useInputHandler = (): IInputHandler => {
  return new InputHandler()
}
