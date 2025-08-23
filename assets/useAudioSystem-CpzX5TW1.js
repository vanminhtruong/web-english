import { u as useVoiceStore } from "./voiceStore-DiHiYd9f.js";
class AudioSystem {
  voiceStore = useVoiceStore();
  createAudioContext() {
    try {
      return new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log("Audio context not available");
      return null;
    }
  }
  playImpactSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.type = "sine";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log("Impact sound failed:", error);
    }
  }
  playExplosionSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      filterNode.frequency.setValueAtTime(2e3, audioContext.currentTime);
      filterNode.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.3);
      filterNode.Q.setValueAtTime(3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.type = "sawtooth";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log("Explosion sound failed:", error);
    }
  }
  playBounceSound() {
    const audioContext = this.createAudioContext();
    if (!audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
      oscillator.type = "triangle";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
    } catch (error) {
      console.log("Bounce sound failed:", error);
    }
  }
  playVocabularySound(text, language = "en") {
    try {
      if (!("speechSynthesis" in window)) {
        console.log("Speech Synthesis not supported");
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = this.voiceStore.createUtterance(text);
      if (language === "vi") {
        utterance.lang = "vi-VN";
        const vietnameseVoices = window.speechSynthesis.getVoices().filter(
          (voice) => voice.lang.startsWith("vi")
        );
        if (vietnameseVoices.length > 0) {
          utterance.voice = vietnameseVoices[0];
        }
      } else if (language === "ko") {
        utterance.lang = "ko-KR";
        const koreanVoices = window.speechSynthesis.getVoices().filter(
          (voice) => voice.lang.startsWith("ko")
        );
        if (koreanVoices.length > 0) {
          utterance.voice = koreanVoices[0];
        }
      }
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log("Vocabulary sound failed:", error);
    }
  }
}
const useAudioSystem = () => {
  return new AudioSystem();
};
export {
  useAudioSystem as u
};
//# sourceMappingURL=useAudioSystem-CpzX5TW1.js.map
