<template>
  <div class="bubble-shooter-game h-full flex flex-col">
    <!-- Game Header -->
    <div class="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 text-white">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold">{{ t('flashcard.bubbleShooter.title', 'Bubble Shooter') }}</h2>
          <p class="text-sm sm:text-base opacity-90">{{ t('flashcard.bubbleShooter.instruction', 'Shoot bubbles to match 4 or more words!') }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl sm:text-3xl font-bold">{{ score }}</div>
          <div class="text-xs sm:text-sm opacity-90">{{ t('flashcard.bubbleShooter.score', 'Score') }}</div>
        </div>
      </div>
    </div>

    <!-- Game Area -->
    <div class="flex-1 relative bg-gradient-to-b from-blue-100 to-blue-200 dark:from-[#0a0a0a] dark:to-[#0f0f0f] overflow-hidden">
      <canvas
        ref="gameCanvas"
        class="w-full h-full cursor-crosshair"
        @click="shootBubble"
        @mousemove="updateAim"
      ></canvas>
      
      <!-- Aim Line -->
      <svg 
        v-if="aimLine.visible"
        class="absolute inset-0 w-full h-full pointer-events-none"
        :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
      >
        <line 
          :x1="shooterPosition.x" 
          :y1="shooterPosition.y"
          :x2="aimLine.x" 
          :y2="aimLine.y"
          stroke="rgba(255,255,255,0.7)" 
          stroke-width="2" 
          stroke-dasharray="5,5"
        />
      </svg>

      <!-- Current Word Display -->
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#0a0a0a] rounded-lg px-4 py-2 shadow-lg border-2 border-purple-500">
        <div class="text-center">
          <div class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{{ currentShooterWord }}</div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-white/70">{{ t('flashcard.bubbleShooter.currentWord', 'Current Word') }}</div>
        </div>
      </div>

      <!-- Game Over Modal -->
      <transition name="modal" appear>
        <div v-if="gameOver" class="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-200 dark:border-[#0f0f0f]">
            <!-- Animated Success Icon -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <h3 class="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {{ t('flashcard.bubbleShooter.gameComplete', 'Game Complete!') }}
            </h3>
            <p class="text-gray-600 dark:text-white/70 mb-4">
              {{ t('flashcard.bubbleShooter.finalScore', { score }) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-white/60 mb-6">
              {{ t('flashcard.bubbleShooter.wordsMatched', { count: wordsMatched }) }}
            </p>
            
            <div class="flex gap-3 justify-center">
              <button 
                @click="restartGame"
                class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
              >
                {{ t('flashcard.bubbleShooter.playAgain', 'Play Again') }}
              </button>
              <button 
                @click="$emit('game-complete')"
                class="px-6 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-[#0f0f0f] dark:hover:bg-[#1a1a1a] text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
              >
                {{ t('common.finish', 'Finish') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

interface Props {
  words: Vocabulary[]
}

interface Bubble {
  x: number
  y: number
  word: string
  color: string
  id: string
  row: number
  col: number
}

interface AimLine {
  visible: boolean
  x: number
  y: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: 'spark' | 'burst' | 'glow'
  rotation: number
  rotationSpeed: number
}

interface Explosion {
  x: number
  y: number
  particles: Particle[]
  active: boolean
  shockwave: {
    radius: number
    maxRadius: number
    intensity: number
  }
}

const props = defineProps<Props>()
const { t } = useI18n()

// Game state
const gameCanvas = ref<HTMLCanvasElement>()
const canvasWidth = ref(800)
const canvasHeight = ref(600)
const score = ref(0)
const wordsMatched = ref(0)
const gameOver = ref(false)
const screenShake = ref({ x: 0, y: 0, intensity: 0 })

// Bubbles and game objects
const bubbles = ref<Bubble[]>([])
const shootingBubble = ref<Bubble | null>(null) // Track the bubble currently being shot
const currentShooterWord = ref('')
const currentShooterColor = ref('#FF6B6B') // Track shooter color to prevent random color changes
const wordColorMap = new Map<string, string>() // Map words to consistent colors
const shooterPosition = ref({ x: 400, y: 550 })
const aimLine = ref<AimLine>({ visible: false, x: 0, y: 0 })
const explosions = ref<Explosion[]>([])
const particles = ref<Particle[]>([])

// Game constants
const BUBBLE_SIZE = 40
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB347']

// Game logic
let ctx: CanvasRenderingContext2D | null = null
let animationFrame: number | null = null

const emit = defineEmits<{
  'game-complete': []
}>()

onMounted(async () => {
  await nextTick()
  initializeGame()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

const initializeGame = () => {
  if (!gameCanvas.value) return
  
  const canvas = gameCanvas.value
  ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size
  const container = canvas.parentElement
  if (container) {
    canvasWidth.value = container.clientWidth
    canvasHeight.value = container.clientHeight
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
  }

  // Update shooter position
  shooterPosition.value = { 
    x: canvasWidth.value / 2, 
    y: canvasHeight.value - 50 
  }

  setupInitialBubbles()
  selectNextShooterWord()
  gameLoop()
}



// Get consistent color for a word - same word always gets same color
const getColorForWord = (word: string): string => {
  if (!wordColorMap.has(word)) {
    // Assign a consistent color based on word hash to avoid random changes
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash + word.charCodeAt(i)) & 0xffffffff
    }
    const colorIndex = Math.abs(hash) % COLORS.length
    wordColorMap.set(word, COLORS[colorIndex])
  }
  return wordColorMap.get(word)!
}

const selectNextShooterWord = () => {
  if (props.words.length > 0) {
    const randomWord = props.words[Math.floor(Math.random() * props.words.length)]
    currentShooterWord.value = randomWord.word
    // Use consistent color for the word - same word always same color
    currentShooterColor.value = getColorForWord(randomWord.word)
  }
}



const animateShootingBubble = (bubble: Bubble, vx: number, vy: number) => {
  let bounceCount = 0
  const maxBounces = 3
  let currentVx = vx
  let currentVy = vy
  
  // Set the shooting bubble to be drawn on top
  shootingBubble.value = bubble
  
  const animate = () => {
    bubble.x += currentVx
    bubble.y += currentVy
    
    // Enhanced wall collision with bounce effect
    if (bubble.x <= BUBBLE_SIZE / 2 || bubble.x >= canvasWidth.value - BUBBLE_SIZE / 2) {
      currentVx = -currentVx * 0.8 // Energy loss on bounce
      bounceCount++
      
      // Create bounce particles
      createBounceEffect(bubble.x, bubble.y)
      playBounceSound()
      
      // Clamp position to prevent getting stuck in walls
      bubble.x = Math.max(BUBBLE_SIZE / 2, Math.min(canvasWidth.value - BUBBLE_SIZE / 2, bubble.x))
    }
    
    // Top boundary - bubble sticks immediately (no bounce)
    if (bubble.y <= BUBBLE_SIZE / 2) {
      bubble.y = BUBBLE_SIZE / 2
      currentVy = 0
      bounceCount = maxBounces // Force bubble to land
    }
    
    // Bottom boundary check - prevent bubble from escaping
    if (bubble.y >= canvasHeight.value - BUBBLE_SIZE / 2) {
      // Force bubble to stick at bottom
      bubble.y = canvasHeight.value - BUBBLE_SIZE / 2
      currentVy = 0
      bounceCount = maxBounces // Force stop
    }
    
    // Remove problematic gravity - causes bubbles to bounce downward
    // Only apply minimal gravity if bubble is falling freely (not after wall bounce)
    if (bounceCount > 0 && currentVy > 2) {
      currentVy += 0.05 // Much reduced gravity, only when already falling fast
    }
    
    // Check collision with existing bubbles - improved detection
    const collisionBubble = bubbles.value.find(b => {
      const dx = b.x - bubble.x
      const dy = b.y - bubble.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < BUBBLE_SIZE * 1.0 // Proper collision distance - bubbles should touch
    })
    
    // Check if bubble should stick to walls (more aggressive sticking)
    const slowMoving = Math.abs(currentVx) < 3 && Math.abs(currentVy) < 3
    const nearLeftWall = bubble.x <= BUBBLE_SIZE / 2 + 20
    const nearRightWall = bubble.x >= canvasWidth.value - BUBBLE_SIZE / 2 - 20
    const nearTopWall = bubble.y <= BUBBLE_SIZE / 2 + 20
    const stickToWall = bounceCount > 0 && (
      (slowMoving && (nearLeftWall || nearRightWall)) || 
      (nearTopWall && Math.abs(currentVy) < 2)
    )
    
    if (collisionBubble || (bubble.y <= BUBBLE_SIZE / 2 && currentVy <= 0) || bounceCount >= maxBounces || stickToWall) {
      // Create impact effect
      createImpactEffect(bubble.x, bubble.y, bubble.color)
      playImpactSound()
      
      // Clear the shooting bubble as it's about to land
      shootingBubble.value = null
      
      // Snap to grid
      snapToGrid(bubble)
      bubbles.value.push(bubble)
      checkForMatches(bubble)
      return
    }
    
    requestAnimationFrame(animate)
  }
  animate()
}

// Sound Effects System
const createAudioContext = () => {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)()
  } catch (error) {
    console.log('Audio context not available')
    return null
  }
}

// Impact sound khi bubble chạm vào nhau
const playImpactSound = () => {
  const audioContext = createAudioContext()
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Âm thanh "thop" nhẹ khi chạm
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    
    oscillator.type = 'sine'
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  } catch (error) {
    console.log('Impact sound failed:', error)
  }
}

// Explosion sound khi bubble nổ (match)
const playExplosionSound = () => {
  const audioContext = createAudioContext()
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filterNode = audioContext.createBiquadFilter()
    
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Âm thanh "pop" to hơn khi nổ
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3)
    
    // Filter để tạo hiệu ứng nổ
    filterNode.frequency.setValueAtTime(2000, audioContext.currentTime)
    filterNode.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3)
    filterNode.Q.setValueAtTime(3, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.type = 'sawtooth'
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (error) {
    console.log('Explosion sound failed:', error)
  }
}

// Bounce sound khi bubble chạm tường
const playBounceSound = () => {
  const audioContext = createAudioContext()
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Âm thanh "ping" khi chạm tường
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.08)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08)
    
    oscillator.type = 'triangle'
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.08)
  } catch (error) {
    console.log('Bounce sound failed:', error)
  }
}

const checkForMatches = (newBubble: Bubble) => {
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
    bubbles.value.forEach(other => {
      if (other.id !== bubble.id && !visited.has(other.id) && other.word === bubble.word) {
        const dx = other.x - bubble.x
        const dy = other.y - bubble.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        console.log(`Distance between ${bubble.word} and ${other.word}: ${distance}, BUBBLE_SIZE: ${BUBBLE_SIZE}`)
        
        // Check if bubbles are adjacent (touching) - more generous threshold
        if (distance <= BUBBLE_SIZE * 1.2) {
          console.log('Found adjacent bubble:', other.word, other.x, other.y)
          findConnected(other)
        }
      }
    })
  }
  
  findConnected(newBubble)
  
  console.log(`Found ${connectedBubbles.length} connected bubbles:`, connectedBubbles.map(b => b.word))
  
  // If we found 3 or more connected bubbles with same word, remove them
  if (connectedBubbles.length >= 3) {
    console.log('MATCH FOUND! Removing bubbles:', connectedBubbles.map(b => b.word))
    
    // Create impact effects for each removed bubble
    connectedBubbles.forEach(bubble => {
      createImpactEffect(bubble.x, bubble.y, bubble.color)
    })
    
    // Remove matched bubbles from array
    connectedBubbles.forEach(matchedBubble => {
      const index = bubbles.value.findIndex(b => b.id === matchedBubble.id)
      if (index > -1) {
        bubbles.value.splice(index, 1)
      }
    })
    
    // Update score
    score.value += connectedBubbles.length * 10
    wordsMatched.value += 1
    
    // Play explosion sound for match success
    playExplosionSound()
    
    // Check for floating bubbles and remove them
    removeFloatingBubbles()
  } else {
    console.log('No match - not enough connected bubbles')
  }
}

const removeFloatingBubbles = () => {
  // Mark bubbles that are connected to top
  const topConnected = new Set<string>()
  
  const markTopConnected = (bubble: Bubble) => {
    if (topConnected.has(bubble.id)) return
    topConnected.add(bubble.id)
    
    // Find adjacent bubbles
    bubbles.value.forEach(other => {
      if (other.id !== bubble.id && !topConnected.has(other.id)) {
        const dx = other.x - bubble.x
        const dy = other.y - bubble.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance <= BUBBLE_SIZE * 1.1) {
          markTopConnected(other)
        }
      }
    })
  }
  
  // Start from top row bubbles
  bubbles.value.forEach(bubble => {
    if (bubble.row === 0) {
      markTopConnected(bubble)
    }
  })
  
  // Remove bubbles not connected to top
  const floatingBubbles = bubbles.value.filter(bubble => !topConnected.has(bubble.id))
  
  if (floatingBubbles.length > 0) {
    // Create impact effects for floating bubbles
    floatingBubbles.forEach(bubble => {
      createImpactEffect(bubble.x, bubble.y, bubble.color)
    })
    
    // Remove floating bubbles
    bubbles.value = bubbles.value.filter(bubble => topConnected.has(bubble.id))
    
    // Bonus points for floating bubbles
    score.value += floatingBubbles.length * 5
  }
}

const snapToGrid = (bubble: Bubble) => {
  console.log('Snapping bubble to grid. Current position:', bubble.x, bubble.y)
  
  // Find the closest valid grid position to where the bubble currently is
  // This ensures bubble lands exactly where it should, not "sượt sang chỗ khác"
  
  // Calculate target row based on Y position
  let targetRow = Math.max(0, Math.round((bubble.y - BUBBLE_SIZE / 2 - 5) / BUBBLE_SIZE))
  
  // Calculate target column based on X position and row offset
  const offsetX = targetRow % 2 === 0 ? 0 : BUBBLE_SIZE / 2
  let targetCol = Math.max(0, Math.round((bubble.x - BUBBLE_SIZE / 2 - offsetX - 5) / BUBBLE_SIZE))
  
  // Calculate exact grid position
  const gridX = targetCol * BUBBLE_SIZE + BUBBLE_SIZE / 2 + offsetX + 5
  const gridY = targetRow * BUBBLE_SIZE + BUBBLE_SIZE / 2 + 5
  
  console.log(`Target grid position: row=${targetRow}, col=${targetCol}, x=${gridX}, y=${gridY}`)
  
  // Check if this exact position is occupied
  const occupied = bubbles.value.some(existing => {
    const dx = existing.x - gridX
    const dy = existing.y - gridY
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < BUBBLE_SIZE * 0.8 // Close enough to be considered occupied
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
          const testOffsetX = testRow % 2 === 0 ? 0 : BUBBLE_SIZE / 2
          const testCol = Math.max(0, targetCol + dc)
          
          const testX = testCol * BUBBLE_SIZE + BUBBLE_SIZE / 2 + testOffsetX + 5
          const testY = testRow * BUBBLE_SIZE + BUBBLE_SIZE / 2 + 5
          
          const testOccupied = bubbles.value.some(existing => {
            const dx = existing.x - testX
            const dy = existing.y - testY
            const distance = Math.sqrt(dx * dx + dy * dy)
            return distance < BUBBLE_SIZE * 0.8
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
      bubble.x = targetCol * BUBBLE_SIZE + BUBBLE_SIZE / 2 + 5
      bubble.y = BUBBLE_SIZE / 2 + 5
    }
  }
  
  console.log('Final bubble position:', bubble.x, bubble.y, `row=${bubble.row}, col=${bubble.col}`)
}

// Enhanced visual effects
const createBounceEffect = (x: number, y: number) => {
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
  
  explosions.value.push({
    x,
    y,
    particles: particlesArray,
    active: true,
    shockwave: {
      radius: 0,
      maxRadius: BUBBLE_SIZE / 3,
      intensity: 0.3
    }
  })
}

const createImpactEffect = (x: number, y: number, color: string) => {
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
  
  // Add small screen shake
  addScreenShake(3)
  
  explosions.value.push({
    x,
    y,
    particles: particlesArray,
    active: true,
    shockwave: {
      radius: 0,
      maxRadius: BUBBLE_SIZE,
      intensity: 0.6
    }
  })
}

// Utility functions
const lightenColor = (color: string, amount: number): string => {
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

// Screen shake system
const addScreenShake = (intensity: number) => {
  screenShake.value.intensity = Math.max(screenShake.value.intensity, intensity)
}

const updateScreenShake = () => {
  if (screenShake.value.intensity > 0) {
    screenShake.value.x = (Math.random() - 0.5) * screenShake.value.intensity
    screenShake.value.y = (Math.random() - 0.5) * screenShake.value.intensity
    screenShake.value.intensity *= 0.9 // Decay
    
    if (screenShake.value.intensity < 0.1) {
      screenShake.value.intensity = 0
      screenShake.value.x = 0
      screenShake.value.y = 0
    }
  }
}

const createExplosion = (x: number, y: number, color: string) => {
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
      color: lightenColor(color, 0.3),
      life: 1.2,
      maxLife: 1.2,
      type: 'glow',
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1
    })
  }
  
  // Add screen shake
  addScreenShake(8)
  
  explosions.value.push({
    x,
    y,
    particles: particlesArray,
    active: true,
    shockwave: {
      radius: 0,
      maxRadius: BUBBLE_SIZE * 2,
      intensity: 1
    }
  })
}

const updateExplosions = () => {
  explosions.value.forEach(explosion => {
    if (!explosion.active) return
    
    // Update shockwave
    if (explosion.shockwave.radius < explosion.shockwave.maxRadius) {
      explosion.shockwave.radius += 2
      explosion.shockwave.intensity = Math.max(0, 1 - (explosion.shockwave.radius / explosion.shockwave.maxRadius))
    }
    
    let activeParticles = 0
    explosion.particles.forEach(particle => {
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
        
        activeParticles++
      }
    })
    
    // Deactivate explosion when all particles are dead and shockwave is done
    if (activeParticles === 0 && explosion.shockwave.radius >= explosion.shockwave.maxRadius) {
      explosion.active = false
    }
  })
  
  // Update screen shake
  updateScreenShake()
  
  // Remove inactive explosions
  explosions.value = explosions.value.filter(explosion => explosion.active)
}





// Responsive mouse tracking for aim cursor
const updateAim = (event: MouseEvent) => {
  if (!gameCanvas.value || shootingBubble.value) return
  
  // Get canvas bounding rect for accurate positioning across all screen sizes
  const rect = gameCanvas.value.getBoundingClientRect()
  
  // Calculate mouse position relative to canvas with responsive scaling
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  
  // Accurate mouse coordinates for xs/sm/md/lg/xl screens
  const mouseX = (event.clientX - rect.left) * scaleX
  const mouseY = (event.clientY - rect.top) * scaleY
  
  console.log(`Mouse: ${event.clientX}, ${event.clientY} | Canvas: ${mouseX}, ${mouseY} | Scale: ${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}`)
  
  // Update aim line from shooter to mouse position
  const shooterX = shooterPosition.value.x
  const shooterY = shooterPosition.value.y
  
  // Calculate angle and distance for aim line
  const dx = mouseX - shooterX
  const dy = mouseY - shooterY
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Only show aim if mouse is above shooter (can't shoot backwards)
  if (mouseY < shooterY - 20 && distance > 20) {
    aimLine.value = {
      visible: true,
      x: mouseX,
      y: mouseY
    }
  } else {
    aimLine.value.visible = false
  }
}

// Responsive bubble shooting with accurate targeting for all screen sizes
const shootBubble = (event: MouseEvent) => {
  if (shootingBubble.value || !currentShooterWord.value) return
  
  // Get canvas bounding rect for accurate positioning across all screen sizes  
  const rect = gameCanvas.value?.getBoundingClientRect()
  if (!rect) return
  
  // Calculate responsive mouse position with proper scaling
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  
  // Accurate target coordinates for xs/sm/md/lg/xl screens
  const targetX = (event.clientX - rect.left) * scaleX
  const targetY = (event.clientY - rect.top) * scaleY
  
  console.log(`Shooting at: ${targetX}, ${targetY} (scaled from ${event.clientX}, ${event.clientY})`)
  
  // Hide aim line immediately after shooting
  aimLine.value.visible = false
  
  // Calculate shooting direction with proper responsive coordinates
  const shooterX = shooterPosition.value.x
  const shooterY = shooterPosition.value.y
  
  const dx = targetX - shooterX
  const dy = targetY - shooterY
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Normalize direction and set speed
  const speed = 8
  const normalizedDx = (dx / distance) * speed
  const normalizedDy = (dy / distance) * speed
  
  console.log(`Direction: dx=${normalizedDx.toFixed(2)}, dy=${normalizedDy.toFixed(2)}`)
  
  // Create shooting bubble with current word and color
  const bubble: Bubble = {
    x: shooterX,
    y: shooterY,
    word: currentShooterWord.value,
    color: currentShooterColor.value,
    id: `shooting-${Date.now()}`,
    row: -1,
    col: -1
  }
  
  // Start animation with responsive targeting
  animateShootingBubble(bubble, normalizedDx, normalizedDy)
  
  // Select next word for shooter
  selectNextShooterWord()
}

const gameLoop = () => {
  if (!ctx || !gameCanvas.value) return
  
  // Update explosions
  updateExplosions()
  
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  // Apply screen shake
  ctx.save()
  ctx.translate(screenShake.value.x, screenShake.value.y)
  
  // Draw background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight.value)
  gradient.addColorStop(0, '#1a1a2e')
  gradient.addColorStop(1, '#16213e')
  ctx.fillStyle = gradient
  ctx.fillRect(-screenShake.value.x, -screenShake.value.y, canvasWidth.value, canvasHeight.value)
  
  // Draw bubbles with enhanced effects
  bubbles.value.forEach(bubble => {
    drawBubble(bubble)
  })
  
  // Draw explosions (particles)
  drawExplosions()
  
  // Draw shooter
  drawShooter()
  
  // Draw shooting bubble on top (if exists)
  if (shootingBubble.value) {
    drawShootingBubble(shootingBubble.value)
  }
  
  // Draw aim line if visible
  if (aimLine.value.visible) {
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(shooterPosition.value.x, shooterPosition.value.y)
    ctx.lineTo(aimLine.value.x, aimLine.value.y)
    ctx.stroke()
    ctx.setLineDash([])
    
    // Add aim line glow effect
    ctx.shadowColor = '#fff'
    ctx.shadowBlur = 10
    ctx.stroke()
    ctx.shadowBlur = 0
  }
  
  // Restore canvas transform (end screen shake)
  ctx.restore()
  
  // Check win condition
  if (bubbles.value.length === 0) {
    setTimeout(() => {
      gameOver.value = true
    }, 500)
  }
  
  if (!gameOver.value) {
    animationFrame = requestAnimationFrame(gameLoop)
  }
}

const drawBubble = (bubble: Bubble) => {
  if (!ctx) return
  
  // Add subtle bubble glow
  ctx.save()
  ctx.shadowColor = bubble.color
  ctx.shadowBlur = 8
  
  // Draw bubble with gradient
  const gradient = ctx.createRadialGradient(
    bubble.x - BUBBLE_SIZE / 6, bubble.y - BUBBLE_SIZE / 6, 0,
    bubble.x, bubble.y, BUBBLE_SIZE / 2
  )
  gradient.addColorStop(0, lightenColor(bubble.color, 0.3))
  gradient.addColorStop(1, bubble.color)
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(bubble.x, bubble.y, BUBBLE_SIZE / 2, 0, Math.PI * 2)
  ctx.fill()
  
  // Draw enhanced border with inner highlight
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.stroke()
  
  // Inner highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(bubble.x, bubble.y, BUBBLE_SIZE / 2 - 3, 0, Math.PI * 2)
  ctx.stroke()
  
  ctx.restore()
  
  // Draw text with enhanced styling
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowBlur = 3
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1
  
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 16px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Show only first character of the word
  const text = bubble.word.charAt(0).toUpperCase()
  
  ctx.fillText(text, bubble.x, bubble.y)
  ctx.restore()
}

const drawExplosions = () => {
  if (!ctx) return
  
  explosions.value.forEach(explosion => {
    if (!explosion.active || !ctx) return
    
    // Draw shockwave
    if (explosion.shockwave.intensity > 0) {
      ctx.save()
      ctx.globalAlpha = explosion.shockwave.intensity * 0.3
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(explosion.x, explosion.y, explosion.shockwave.radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
    
    // Draw particles with enhanced effects
    explosion.particles.forEach(particle => {
      if (particle.life <= 0 || !ctx) return
      
      const alpha = particle.life / particle.maxLife
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)
      ctx.globalAlpha = alpha
      
      // Different rendering based on particle type
      switch (particle.type) {
        case 'burst':
          // Main explosion particles with glow
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 2
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2)
          ctx.fill()
          break
          
        case 'spark':
          // Fast, bright sparks
          ctx.strokeStyle = particle.color
          ctx.lineWidth = particle.size * alpha
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(-particle.size, 0)
          ctx.lineTo(particle.size, 0)
          ctx.stroke()
          break
          
        case 'glow':
          // Soft glowing particles
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * alpha)
          gradient.addColorStop(0, particle.color)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(0, 0, particle.size * alpha, 0, Math.PI * 2)
          ctx.fill()
          break
      }
      
      ctx.restore()
    })
  })
}

const drawShooter = () => {
  if (!ctx) return
  
  // Enhanced shooter with pulsing effect
  ctx.save()
  
  // Pulsing glow effect using current shooter color
  const pulseIntensity = 0.8 + 0.2 * Math.sin(Date.now() * 0.008)
  ctx.shadowColor = currentShooterColor.value
  ctx.shadowBlur = 15 * pulseIntensity
  
  // Draw shooter base with gradient using current shooter color
  const gradient = ctx.createRadialGradient(
    shooterPosition.value.x - BUBBLE_SIZE / 6, shooterPosition.value.y - BUBBLE_SIZE / 6, 0,
    shooterPosition.value.x, shooterPosition.value.y, BUBBLE_SIZE / 2
  )
  gradient.addColorStop(0, currentShooterColor.value)
  gradient.addColorStop(1, currentShooterColor.value)
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(shooterPosition.value.x, shooterPosition.value.y, BUBBLE_SIZE / 2, 0, Math.PI * 2)
  ctx.fill()
  
  // Enhanced border
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 3
  ctx.stroke()
  
  // Inner highlight ring
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(shooterPosition.value.x, shooterPosition.value.y, BUBBLE_SIZE / 2 - 4, 0, Math.PI * 2)
  ctx.stroke()
  
  ctx.restore()
  
  // Draw current word with enhanced text styling
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.8)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1
  
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Show only first character of the current shooter word
  const text = currentShooterWord.value.charAt(0).toUpperCase()
  
  ctx.fillText(text, shooterPosition.value.x, shooterPosition.value.y)
  ctx.restore()
}

const drawShootingBubble = (bubble: Bubble) => {
  if (!ctx) return
  
  // Draw shooting bubble with enhanced glow to show it's active
  ctx.save()
  
  // Enhanced glow effect for shooting bubble
  ctx.shadowColor = bubble.color
  ctx.shadowBlur = 15
  
  // Pulsing effect
  const pulseIntensity = 0.9 + 0.1 * Math.sin(Date.now() * 0.01)
  
  // Draw bubble with extra bright gradient
  const gradient = ctx.createRadialGradient(
    bubble.x - BUBBLE_SIZE / 5, bubble.y - BUBBLE_SIZE / 5, 0,
    bubble.x, bubble.y, BUBBLE_SIZE / 2
  )
  gradient.addColorStop(0, lightenColor(bubble.color, 0.5))
  gradient.addColorStop(1, bubble.color)
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(bubble.x, bubble.y, (BUBBLE_SIZE / 2) * pulseIntensity, 0, Math.PI * 2)
  ctx.fill()
  
  // Enhanced border for shooting bubble
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 3
  ctx.stroke()
  
  // Extra bright inner highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(bubble.x, bubble.y, (BUBBLE_SIZE / 2 - 4) * pulseIntensity, 0, Math.PI * 2)
  ctx.stroke()
  
  ctx.restore()
  
  // Draw text with enhanced styling
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 5
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1
  
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 17px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Show only first character of the word
  const text = bubble.word.charAt(0).toUpperCase()
  
  ctx.fillText(text, bubble.x, bubble.y)
  ctx.restore()
}

const setupInitialBubbles = () => {
  // Clear existing bubbles
  bubbles.value = []
  
  // Create 3 initial bubbles with proper hexagonal grid spacing - no gaps
  const initialWords = props.words.slice(0, 3)
  
  for (let i = 0; i < Math.min(3, initialWords.length); i++) {
    // Position bubbles in top row with exact spacing to touch each other
    const row = 0
    const col = i
    const offsetX = row % 2 === 0 ? 0 : BUBBLE_SIZE / 2
    
    const bubble: Bubble = {
      x: col * BUBBLE_SIZE + BUBBLE_SIZE / 2 + offsetX + 5,
      y: row * BUBBLE_SIZE + BUBBLE_SIZE / 2 + 5,
      word: initialWords[i].word,
      color: getColorForWord(initialWords[i].word), // Use consistent color for same word
      id: `initial-${i}`,
      row,
      col
    }
    
    bubbles.value.push(bubble)
  }
}

const restartGame = () => {
  score.value = 0
  wordsMatched.value = 0
  gameOver.value = false
  shootingBubble.value = null // Clear any shooting bubble
  setupInitialBubbles()
  selectNextShooterWord()
  gameLoop()
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.bubble-shooter-game {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
