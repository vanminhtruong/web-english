import type { IGameLogic, Bubble } from './interfaces'
import type { Vocabulary } from '@/composables/useVocabularyStore'

export class GameLogic implements IGameLogic {
  private readonly BUBBLE_SIZE = 40
  private readonly COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB347']

  public checkForMatches(newBubble: Bubble, bubbles: Bubble[]): {
    matchedBubbles: Bubble[]
    shouldRemove: boolean
  } {
    console.log('Checking matches for bubble:', newBubble.word, newBubble.x, newBubble.y)
    
    // Find connected bubbles with same word (and implicitly same color)
    const visited = new Set<string>()
    const connectedBubbles: Bubble[] = []
    
    const findConnected = (bubble: Bubble) => {
      if (visited.has(bubble.id)) return
      visited.add(bubble.id)
      connectedBubbles.push(bubble)
      
      console.log('Found connected bubble:', bubble.word, bubble.x, bubble.y)
      
      // Find adjacent bubbles with same word
      bubbles.forEach(other => {
        if (other.id !== bubble.id && !visited.has(other.id) && other.word === bubble.word) {
          const dx = other.x - bubble.x
          const dy = other.y - bubble.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          console.log(`Distance between ${bubble.word} and ${other.word}: ${distance}, BUBBLE_SIZE: ${this.BUBBLE_SIZE}`)
          
          // Check if bubbles are adjacent (touching) - more generous threshold
          if (distance <= this.BUBBLE_SIZE * 1.2) {
            console.log('Found adjacent bubble:', other.word, other.x, other.y)
            findConnected(other)
          }
        }
      })
    }
    
    findConnected(newBubble)
    
    console.log(`Found ${connectedBubbles.length} connected bubbles:`, connectedBubbles.map(b => b.word))
    
    // If we found 3 or more connected bubbles with same word, remove them
    const shouldRemove = connectedBubbles.length >= 3
    if (shouldRemove) {
      console.log('MATCH FOUND! Removing bubbles:', connectedBubbles.map(b => b.word))
    } else {
      console.log('No match - not enough connected bubbles')
    }

    return {
      matchedBubbles: connectedBubbles,
      shouldRemove
    }
  }

  public removeFloatingBubbles(bubbles: Bubble[]): {
    remainingBubbles: Bubble[]
    removedBubbles: Bubble[]
  } {
    // Mark bubbles that are connected to top
    const topConnected = new Set<string>()
    
    const markTopConnected = (bubble: Bubble) => {
      if (topConnected.has(bubble.id)) return
      topConnected.add(bubble.id)
      
      // Find adjacent bubbles
      bubbles.forEach(other => {
        if (other.id !== bubble.id && !topConnected.has(other.id)) {
          const dx = other.x - bubble.x
          const dy = other.y - bubble.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance <= this.BUBBLE_SIZE * 1.1) {
            markTopConnected(other)
          }
        }
      })
    }
    
    // Start from top row bubbles
    bubbles.forEach(bubble => {
      if (bubble.row === 0) {
        markTopConnected(bubble)
      }
    })
    
    // Separate remaining and floating bubbles
    const remainingBubbles = bubbles.filter(bubble => topConnected.has(bubble.id))
    const removedBubbles = bubbles.filter(bubble => !topConnected.has(bubble.id))
    
    return {
      remainingBubbles,
      removedBubbles
    }
  }

  public setupInitialBubbles(words: Vocabulary[], vietnameseMode: boolean = false): Bubble[] {
    const bubbles: Bubble[] = []
    
    // Use EXACT same spacing calculations as PhysicsEngine to ensure perfect alignment
    const verticalSpacing = (this.BUBBLE_SIZE * Math.sqrt(3)) / 2
    const baseX = this.BUBBLE_SIZE / 2  // Remove +5 to make bubbles touch left edge
    const baseY = this.BUBBLE_SIZE / 2  // Remove +5 to make bubbles touch top edge
    const bubblesPerRow = 8 // Maximum bubbles per row to fit screen
    
    for (let i = 0; i < words.length; i++) {
      // Calculate row and column position
      const row = Math.floor(i / bubblesPerRow)
      const col = i % bubblesPerRow
      
      // Use EXACT same offset logic as PhysicsEngine
      const offsetX = row % 2 === 0 ? 0 : this.BUBBLE_SIZE / 2
      
      // Calculate position using EXACT same formula as PhysicsEngine
      const x = baseX + offsetX + col * this.BUBBLE_SIZE
      const y = baseY + row * verticalSpacing
      
      const bubble: Bubble = {
        x,
        y,
        word: words[i].word,
        color: this.getColorForWord(words[i].word), // Use consistent color for same word
        id: `initial-${i}`,
        row,
        col,
        vietnameseMeaning: words[i].meaning, // Store Vietnamese meaning
        displayText: vietnameseMode && words[i].meaning 
          ? words[i].meaning.substring(0, 2).toUpperCase() // Vietnamese first 2 letters if mode enabled
          : words[i].word.charAt(0).toUpperCase() // Default to English first 1 letter
      }
      
      bubbles.push(bubble)
    }
    
    return bubbles
  }

  public isGameWon(bubbles: Bubble[]): boolean {
    return bubbles.length === 0
  }

  public calculateScore(matchedBubbles: number, floatingBubbles: number): number {
    return (matchedBubbles * 10) + (floatingBubbles * 5)
  }

  private getColorForWord(word: string): string {
    // Use same logic as in GameStateManager for consistency
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash + word.charCodeAt(i)) & 0xffffffff
    }
    const colorIndex = Math.abs(hash) % this.COLORS.length
    return this.COLORS[colorIndex]
  }
}

export const useGameLogic = (): IGameLogic => {
  return new GameLogic()
}
