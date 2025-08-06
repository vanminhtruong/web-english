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

// Create synthetic audio sounds using Web Audio API
const createSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Create a cheerful success sound (ascending notes)
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, startTime)
      oscillator.type = 'sine'
      
      // Envelope
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.3, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }
    
    const now = audioContext.currentTime
    // Play a cheerful chord progression: C-E-G (major chord)
    playNote(523.25, now, 0.3)        // C5
    playNote(659.25, now + 0.1, 0.3)  // E5  
    playNote(783.99, now + 0.2, 0.4)  // G5
    
    // Cleanup
    setTimeout(() => {
      audioContext.close()
    }, 1000)
    
  } catch (error) {
    console.warn('Web Audio API not supported:', error)
  }
}

const createErrorSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Create a descending error sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Start high and slide down
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5)
    oscillator.type = 'sawtooth'
    
    // Quick attack, longer decay
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.4, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
    
    // Cleanup
    setTimeout(() => {
      audioContext.close()
    }, 1000)
    
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
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    if (isCorrect) {
      // Success sound: ascending notes
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G5
    } else {
      // Error sound: descending notes
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime) // G4
      oscillator.frequency.setValueAtTime(350, audioContext.currentTime + 0.15) // F4
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.3) // D4
    }
    
    gainNode.gain.setValueAtTime(props.soundVolume, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
    
    oscillator.onended = () => {
      audioContext.close()
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
