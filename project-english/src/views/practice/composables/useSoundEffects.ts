import { ref } from 'vue'

export function useSoundEffects() {
  // Use synthetic audio instead of external URLs for reliability
  let audioContext: AudioContext | null = null

  const initializeAudio = () => {
    // Initialize Web Audio Context for synthetic sounds
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  const playCorrectSound = () => {
    if (!audioContext) return
    
    try {
      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Create success sound: ascending chord progression
      const now = audioContext.currentTime
      const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5
      
      frequencies.forEach((freq, index) => {
        if (!audioContext) return
        
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        const startTime = now + (index * 0.15)
        oscillator.frequency.setValueAtTime(freq, startTime)
        oscillator.type = 'sine'
        
        // Smooth envelope
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02)
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + 0.5)
        
        // Clean up
        oscillator.onended = () => {
          oscillator.disconnect()
          gainNode.disconnect()
        }
      })
    } catch (e) {
      console.warn('Synthetic correct sound failed:', e)
    }
  }

  const playIncorrectSound = () => {
    if (!audioContext) return
    
    try {
      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Create error sound: descending tone
      const now = audioContext.currentTime
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Descending frequency
      oscillator.frequency.setValueAtTime(400, now)
      oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.8)
      oscillator.type = 'sawtooth'
      
      // Smooth envelope
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
      
      oscillator.start(now)
      oscillator.stop(now + 0.8)
      
      // Clean up
      oscillator.onended = () => {
        oscillator.disconnect()
        gainNode.disconnect()
      }
    } catch (e) {
      console.warn('Synthetic incorrect sound failed:', e)
    }
  }

  const cleanup = () => {
    if (audioContext && audioContext.state !== 'closed') {
      // Let current sounds finish before closing
      setTimeout(() => {
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close()
          audioContext = null
        }
      }, 1000)
    }
  }

  return {
    initializeAudio,
    playCorrectSound,
    playIncorrectSound,
    cleanup
  }
}
