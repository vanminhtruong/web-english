declare module 'canvas-confetti' {
  export interface ConfettiOptions {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    drift?: number
    flat?: boolean
    ticks?: number
    origin?: {
      x?: number
      y?: number
    }
    colors?: string[]
    shapes?: string[]
    scalar?: number
    zIndex?: number
  }

  export default function confetti(options?: ConfettiOptions): Promise<void>
  export function create(canvas: HTMLCanvasElement): (options?: ConfettiOptions) => Promise<void>
}
