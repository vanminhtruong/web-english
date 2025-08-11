import { ref } from 'vue'
import type { Vocabulary } from '../../../../composables/useVocabularyStore'
import type { ISnakeStateManager, Snake, Food, Position } from './types'

class SnakeStateManager implements ISnakeStateManager {
  snake = ref<Snake>({
    body: [{ x: 10, y: 10 }],
    direction: { x: 0, y: 0 },
    currentWord: ''
  })
  
  food = ref<Food | null>(null)
  secondaryFood = ref<Food | null>(null)
  score = ref(0)
  gameOver = ref(false)
  gameRunning = ref(false)
  currentTargetWord = ref('')
  wordsCompleted = ref(0)
  gameSpeed = ref(150) // milliseconds between moves
  lastEatenFoodPos = ref<Position | null>(null)
  lastEatenWord = ref<string | null>(null)
  doubleBaitMode = ref(false)
  wrongEatenCount = ref(0)

  private words: Vocabulary[] = []           
  private vietnameseMode: boolean = false
  private usedWords: Set<string> = new Set()

  // Audio context for sound effects
  private audioContext: AudioContext | null = null

  resetGame() {
    this.snake.value = {
      body: [{ x: 10, y: 10 }],
      direction: { x: 0, y: 0 },
      currentWord: ''
    }
    this.food.value = null
    this.secondaryFood.value = null
    this.score.value = 0
    this.gameOver.value = false
    this.gameRunning.value = false
    this.currentTargetWord.value = ''
    this.wordsCompleted.value = 0
    this.usedWords.clear()
    this.lastEatenFoodPos.value = null
    this.lastEatenWord.value = null
    this.doubleBaitMode.value = false
    this.wrongEatenCount.value = 0
  }

  updateDirection(direction: Position) {
    // Prevent reverse direction
    const currentDir = this.snake.value.direction
    if (direction.x !== -currentDir.x || direction.y !== -currentDir.y) {
      this.snake.value.direction = direction
    }
  }

  moveSnake() {
    if (!this.gameRunning.value || this.gameOver.value) return

    const snake = this.snake.value
    const head = { ...snake.body[0] }
    
    // Move head in current direction
    head.x += snake.direction.x
    head.y += snake.direction.y

    // Wrap-around on walls (canvas 30x20 grid)
    if (head.x < 0) head.x = 29
    else if (head.x >= 30) head.x = 0
    if (head.y < 0) head.y = 19
    else if (head.y >= 20) head.y = 0

    // Check self collision after wrapping
    if (this.checkCollision()) {
      this.setGameOver()
      return
    }

    snake.body.unshift(head)

    // Handle collisions with primary/secondary foods for single or double bait modes
    const headNow = this.snake.value.body[0]
    const hitPrimary = this.food.value && headNow.x === this.food.value.position.x && headNow.y === this.food.value.position.y
    const hitSecondary = this.secondaryFood.value && headNow.x === this.secondaryFood.value.position.x && headNow.y === this.secondaryFood.value.position.y

    if (hitPrimary) {
      // Correct food eaten
      this.incrementScore()
      this.wordsCompleted.value++
      if (this.food.value) {
        this.lastEatenFoodPos.value = { ...this.food.value.position }
        this.lastEatenWord.value = this.food.value.word
      }
      this.playEatFoodSound()
      // Grow snake (no tail pop)
      this.generateFood(this.words, this.vietnameseMode)
    } else if (hitSecondary) {
      // Wrong food eaten
      this.wrongEatenCount.value++
      if (this.secondaryFood.value) {
        this.lastEatenFoodPos.value = { ...this.secondaryFood.value.position }
        this.lastEatenWord.value = this.secondaryFood.value.word
      }
      // Do not grow snake: remove tail
      snake.body.pop()
      // Regenerate foods
      this.generateFood(this.words, this.vietnameseMode)
    } else {
      // No food eaten -> move normally
      snake.body.pop()
    }
  }

  generateFood(words: Vocabulary[], vietnameseMode: boolean) {
    this.words = words
    this.vietnameseMode = vietnameseMode

    if (words.length === 0) return

    // Filter unused words
    const availableWords = words.filter(w => !this.usedWords.has(w.word))
    if (availableWords.length === 0) {
      // All words used, complete game
      this.setGameOver()
      return
    }

    // Select target word
    const targetWord = availableWords[Math.floor(Math.random() * availableWords.length)]
    this.usedWords.add(targetWord.word)
    this.currentTargetWord.value = targetWord.word

    // Utility: random free position not on snake and not conflicting with provided list
    const randomFreePos = (blocked: Position[] = []): Position => {
      let pos: Position
      do {
        pos = {
          x: Math.floor(Math.random() * 25) + 2, // Grid 30x20, avoid edges
          y: Math.floor(Math.random() * 15) + 2
        }
      } while (
        this.snake.value.body.some(seg => seg.x === pos.x && seg.y === pos.y) ||
        blocked.some(b => b.x === pos.x && b.y === pos.y)
      )
      return pos
    }

    // Create primary (correct) food
    const primaryPos = randomFreePos()
    this.food.value = {
      position: primaryPos,
      word: targetWord.word,
      firstLetter: vietnameseMode && targetWord.meaning
        ? targetWord.meaning.charAt(0).toUpperCase()
        : targetWord.word.charAt(0).toUpperCase(),
      meaning: targetWord.meaning
    }

    // If double bait disabled -> clear secondary and exit
    if (!this.doubleBaitMode.value) {
      this.secondaryFood.value = null
      return
    }

    // Choose a wrong word distinct from target
    const others = words.filter(w => w.word !== targetWord.word)
    if (others.length === 0) {
      this.secondaryFood.value = null
      return
    }
    const wrong = others[Math.floor(Math.random() * others.length)]

    // Generate secondary food position distinct from primary
    const secondaryPos = randomFreePos([primaryPos])
    this.secondaryFood.value = {
      position: secondaryPos,
      word: wrong.word,
      firstLetter: vietnameseMode && wrong.meaning
        ? wrong.meaning.charAt(0).toUpperCase()
        : wrong.word.charAt(0).toUpperCase(),
      meaning: wrong.meaning
    }
  }

  checkCollision(): boolean {
    const head = this.snake.value.body[0]

    // Only self collision (walls wrap-around handled in moveSnake)
    for (let i = 1; i < this.snake.value.body.length; i++) {
      if (head.x === this.snake.value.body[i].x && head.y === this.snake.value.body[i].y) {
        return true
      }
    }

    return false
  }

  checkFoodCollision(): boolean {
    if (!this.food.value) return false
    
    const head = this.snake.value.body[0]
    return head.x === this.food.value.position.x && head.y === this.food.value.position.y
  }

  incrementScore() {
    this.score.value += 10
  }

  setGameOver() {
    this.gameOver.value = true
    this.gameRunning.value = false
  }

  setGameRunning(running: boolean) {
    this.gameRunning.value = running
  }

  setDoubleBaitMode(enabled: boolean, words?: Vocabulary[], vietnameseMode?: boolean) {
    this.doubleBaitMode.value = enabled
    // If words/mode provided, regenerate immediately (handles pre-start toggle)
    if (words && typeof vietnameseMode === 'boolean') {
      this.generateFood(words, vietnameseMode)
      return
    }
    // Otherwise, when toggled during a running game, regenerate with existing state
    if (this.gameRunning.value && !this.gameOver.value) {
      this.generateFood(this.words, this.vietnameseMode)
    }
  }

  private initializeAudioContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.warn('Web Audio API not supported:', error)
      }
    }
  }

  private playEatFoodSound() {
    this.initializeAudioContext()
    
    if (!this.audioContext) return

    try {
      // Create a pleasant eating sound - ascending notes (C-E-G major chord)
      const currentTime = this.audioContext.currentTime
      const gainNode = this.audioContext.createGain()
      gainNode.connect(this.audioContext.destination)

      // Play three quick notes in sequence (major chord)
      const frequencies = [261.63, 329.63, 392.00] // C4, E4, G4
      
      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext!.createOscillator()
        const noteGain = this.audioContext!.createGain()
        
        oscillator.connect(noteGain)
        noteGain.connect(gainNode)
        
        oscillator.frequency.setValueAtTime(freq, currentTime)
        oscillator.type = 'sine' // Pleasant sine wave
        
        // Quick attack and decay for each note
        const startTime = currentTime + (index * 0.08)
        const endTime = startTime + 0.15
        
        noteGain.gain.setValueAtTime(0, startTime)
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.02)
        noteGain.gain.exponentialRampToValueAtTime(0.01, endTime)
        
        oscillator.start(startTime)
        oscillator.stop(endTime)
      })
      
    } catch (error) {
      console.warn('Error playing eat food sound:', error)
    }
  }
}

export default SnakeStateManager
