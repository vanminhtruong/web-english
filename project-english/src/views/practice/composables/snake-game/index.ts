// Snake Game Interfaces (OOP pattern)
export * from './types'

// Snake Game Factory
import SnakeGame from './SnakeGame'

export function useSnakeGame() {
  return new SnakeGame()
}
