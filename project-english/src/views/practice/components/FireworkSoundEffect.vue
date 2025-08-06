<template>
  <div class="firework-sound-effect"></div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue'
import confetti from 'canvas-confetti'

interface Props {
  triggerFirework?: boolean
  triggerSound?: boolean
  isCorrect?: boolean
  soundVolume?: number
}

interface Emits {
  (e: 'effect-complete'): void
}

const props = withDefaults(defineProps<Props>(), {
  triggerFirework: false,
  triggerSound: false,
  isCorrect: true,
  soundVolume: 0.5
})

const emit = defineEmits<Emits>()
const propsRefs = toRefs(props)

// Shared AudioContext to prevent audio context issues
let audioContextInstance: AudioContext | null = null

// Get or create shared audio context
const getAudioContext = () => {
  if (!audioContextInstance || audioContextInstance.state === 'closed') {
    audioContextInstance = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContextInstance
}

// Create synthetic audio sounds using Web Audio API
const createSuccessSound = () => {
  try {
    const audioContext = getAudioContext()
    
    // Resume context if suspended (required by some browsers)
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    
    // Create a cheerful success sound (ascending notes)
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, startTime)
      oscillator.type = 'sine'
      
      // Envelope - smoother gain curve
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.4, startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
      
      // Prevent memory leaks
      oscillator.onended = () => {
        oscillator.disconnect()
        gainNode.disconnect()
      }
    }
    
    const now = audioContext.currentTime
    // Play a cheerful chord progression: C-E-G (major chord) with longer duration
    playNote(523.25, now, 0.5)        // C5
    playNote(659.25, now + 0.15, 0.5)  // E5  
    playNote(783.99, now + 0.3, 0.6)  // G5
    
  } catch (error) {
    console.warn('Web Audio API not supported:', error)
  }
}

const createErrorSound = () => {
  try {
    const audioContext = getAudioContext()
    
    // Resume context if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    
    // Create a descending error sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Start high and slide down - longer duration
    const now = audioContext.currentTime
    oscillator.frequency.setValueAtTime(400, now)
    oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.8)
    oscillator.type = 'sawtooth'
    
    // Smoother gain envelope
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.5, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    
    oscillator.start(now)
    oscillator.stop(now + 0.8)
    
    // Prevent memory leaks
    oscillator.onended = () => {
      oscillator.disconnect()
      gainNode.disconnect()
    }
    
  } catch (error) {
    console.warn('Web Audio API not supported:', error)
  }
}

// Trigger firework effect
const triggerFireworkEffect = () => {
  if (!props.triggerFirework) return
  
  if (props.isCorrect) {
    // Hiệu ứng pháo hoa cho câu trả lời đúng
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ff00', '#32cd32', '#7cfc00', '#adff2f', '#9aff9a']
    })
    
    // Pháo hoa từ 2 bên
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ffd700', '#ffff00', '#ffffe0', '#fffacd']
      })
    }, 200)
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb']
      })
    }, 400)
  } else {
    // Hiệu ứng nhỏ cho câu trả lời sai
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa'],
      gravity: 1.2,
      scalar: 0.8
    })
  }
}

// Play sound effect using synthetic audio
const playSoundEffect = () => {
  if (!props.triggerSound) return
  
  try {
    if (props.isCorrect) {
      createSuccessSound()
    } else {
      createErrorSound()
    }
  } catch (error) {
    console.warn('Sound playback error:', error)
    playFallbackSound(props.isCorrect)
  }
}

// Fallback sound using Web Audio API
const playFallbackSound = (isCorrect: boolean) => {
  try {
    const audioContext = getAudioContext()
    
    // Resume context if suspended
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    
    const now = audioContext.currentTime
    
    if (isCorrect) {
      // Success sound: play multiple notes in sequence
      const frequencies = [523, 659, 784] // C5, E5, G5
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        const startTime = now + (index * 0.15)
        oscillator.frequency.setValueAtTime(freq, startTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.4, startTime + 0.02)
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + 0.4)
        
        oscillator.onended = () => {
          oscillator.disconnect()
          gainNode.disconnect()
        }
      })
    } else {
      // Error sound: single descending tone
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(400, now)
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.6)
      oscillator.type = 'sawtooth'
      
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.5, now + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
      
      oscillator.start(now)
      oscillator.stop(now + 0.6)
      
      oscillator.onended = () => {
        oscillator.disconnect()
        gainNode.disconnect()
      }
    }
  } catch (error) {
    console.warn('Web Audio API fallback failed:', error)
  }
}

// Main trigger function
const triggerEffects = () => {
  if (props.triggerFirework || props.triggerSound) {
    triggerFireworkEffect()
    playSoundEffect()
    
    // Emit completion event after animations
    setTimeout(() => {
      emit('effect-complete')
    }, 1000)
  }
}

// Watch for prop changes
const { triggerFirework, triggerSound, isCorrect } = toRefs(props)

watch([triggerFirework, triggerSound], ([newFirework, newSound]) => {
  if (newFirework || newSound) {
    triggerEffects()
  }
}, { immediate: false })

// Cleanup audio context when component unmounts
import { onUnmounted } from 'vue'

onUnmounted(() => {
  if (audioContextInstance && audioContextInstance.state !== 'closed') {
    // Don't close immediately, let current sounds finish
    setTimeout(() => {
      if (audioContextInstance && audioContextInstance.state !== 'closed') {
        audioContextInstance.close()
        audioContextInstance = null
      }
    }, 1000)
  }
})

// No need for onMounted/onUnmounted with synthetic audio

// Expose methods for manual triggering
defineExpose({
  triggerEffects,
  triggerFireworkEffect,
  playSoundEffect
})
</script>

<style scoped>
.firework-sound-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
</style>
