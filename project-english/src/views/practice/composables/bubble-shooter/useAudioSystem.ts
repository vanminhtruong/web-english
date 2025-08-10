import type { IAudioSystem } from './interfaces'
import { useVoiceStore } from '@/stores/voiceStore'

export class AudioSystem implements IAudioSystem {
  private voiceStore = useVoiceStore()
  public createAudioContext(): AudioContext | null {
    try {
      return new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.log('Audio context not available')
      return null
    }
  }

  public playImpactSound(): void {
    const audioContext = this.createAudioContext()
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

  public playExplosionSound(): void {
    const audioContext = this.createAudioContext()
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

  public playBounceSound(): void {
    const audioContext = this.createAudioContext()
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

  public playVocabularySound(text: string, language: 'en' | 'vi' = 'en'): void {
    try {
      // Kiểm tra xem browser có hỗ trợ Speech Synthesis API không
      if (!('speechSynthesis' in window)) {
        console.log('Speech Synthesis not supported')
        return
      }

      // Hủy bỏ bất kỳ speech nào đang phát
      window.speechSynthesis.cancel()

      // Use voice store to create utterance with user's selected voice settings
      const utterance = this.voiceStore.createUtterance(text)
      
      // Override language if Vietnamese is requested
      if (language === 'vi') {
        utterance.lang = 'vi-VN'
        // For Vietnamese, find a Vietnamese voice if available
        const vietnameseVoices = window.speechSynthesis.getVoices().filter(voice => 
          voice.lang.startsWith('vi')
        )
        if (vietnameseVoices.length > 0) {
          utterance.voice = vietnameseVoices[0]
        }
      }

      // Phát âm thanh với voice settings từ voice selector
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.log('Vocabulary sound failed:', error)
    }
  }
}

export const useAudioSystem = (): IAudioSystem => {
  return new AudioSystem()
}
