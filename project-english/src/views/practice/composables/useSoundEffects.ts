import { ref } from 'vue'

export function useSoundEffects() {
  const correctSound = ref<HTMLAudioElement | null>(null)
  const incorrectSound = ref<HTMLAudioElement | null>(null)

  const initializeAudio = () => {
    // Valid HTML audio URLs for correct and incorrect sounds
    correctSound.value = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3')
    incorrectSound.value = new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-02.mp3')
    
    // Set volume
    if (correctSound.value) correctSound.value.volume = 0.3
    if (incorrectSound.value) incorrectSound.value.volume = 0.3
  }

  const playCorrectSound = () => {
    if (correctSound.value) {
      correctSound.value.currentTime = 0
      correctSound.value.play().catch(e => console.warn('Correct sound failed:', e))
    }
  }

  const playIncorrectSound = () => {
    if (incorrectSound.value) {
      incorrectSound.value.currentTime = 0
      incorrectSound.value.play().catch(e => console.warn('Incorrect sound failed:', e))
    }
  }

  const cleanup = () => {
    if (correctSound.value) {
      correctSound.value.pause()
      correctSound.value = null
    }
    if (incorrectSound.value) {
      incorrectSound.value.pause()
      incorrectSound.value = null
    }
  }

  return {
    initializeAudio,
    playCorrectSound,
    playIncorrectSound,
    cleanup
  }
}
