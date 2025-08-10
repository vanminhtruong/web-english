import type { IVisualEffects, Explosion, Particle } from './interfaces'

export class VisualEffects implements IVisualEffects {
  private readonly BUBBLE_SIZE = 40

  public createBounceEffect(x: number, y: number): Explosion {
    const particlesArray: Particle[] = []
    
    // Create small bounce particles
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random(),
        color: '#87CEEB',
        life: 0.5,
        maxLife: 0.5,
        type: 'spark',
        rotation: 0,
        rotationSpeed: 0
      })
    }
    
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE / 3,
        intensity: 0.3
      }
    }
  }

  public createImpactEffect(x: number, y: number, color: string): Explosion {
    const particlesArray: Particle[] = []
    
    // Create impact particles
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 3
      
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color,
        life: 0.8,
        maxLife: 0.8,
        type: 'burst',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      })
    }
    
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE,
        intensity: 0.6
      }
    }
  }

  public createExplosion(x: number, y: number, color: string): Explosion {
    const particlesArray: Particle[] = []
    
    // Create burst particles (main explosion)
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15
      const speed = 3 + Math.random() * 5
      
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color,
        life: 1,
        maxLife: 1,
        type: 'burst',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3
      })
    }
    
    // Create spark particles (faster, smaller)
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 6 + Math.random() * 4
      
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        color: '#FFD700',
        life: 0.8,
        maxLife: 0.8,
        type: 'spark',
        rotation: 0,
        rotationSpeed: 0
      })
    }
    
    // Create glow particles (slower, bigger)
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      
      particlesArray.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 4,
        color: this.lightenColor(color, 0.3),
        life: 1.2,
        maxLife: 1.2,
        type: 'glow',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      })
    }
    
    return {
      x,
      y,
      particles: particlesArray,
      active: true,
      shockwave: {
        radius: 0,
        maxRadius: this.BUBBLE_SIZE * 2,
        intensity: 1
      }
    }
  }

  public updateParticles(particles: Particle[]): void {
    particles.forEach(particle => {
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
      }
    })
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

export const useVisualEffects = (): IVisualEffects => {
  return new VisualEffects()
}
