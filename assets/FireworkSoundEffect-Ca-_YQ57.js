import { d as defineComponent, a4 as toRefs, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, a5 as confetti } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-Bw-NEAY_.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "firework-sound-effect" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FireworkSoundEffect",
  props: {
    triggerFirework: { type: Boolean, default: false },
    triggerSound: { type: Boolean, default: false },
    isCorrect: { type: Boolean, default: true },
    soundVolume: { default: 0.5 }
  },
  emits: ["effect-complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    toRefs(props);
    let audioContextInstance = null;
    const getAudioContext = () => {
      if (!audioContextInstance || audioContextInstance.state === "closed") {
        audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioContextInstance;
    };
    const createSuccessSound = () => {
      try {
        const audioContext = getAudioContext();
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const playNote = (frequency, startTime, duration) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.setValueAtTime(frequency, startTime);
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.4, startTime + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(1e-3, startTime + duration);
          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
          oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
          };
        };
        const now = audioContext.currentTime;
        playNote(523.25, now, 0.5);
        playNote(659.25, now + 0.15, 0.5);
        playNote(783.99, now + 0.3, 0.6);
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    };
    const createErrorSound = () => {
      try {
        const audioContext = getAudioContext();
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        const now = audioContext.currentTime;
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.8);
        oscillator.type = "sawtooth";
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.5, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(1e-3, now + 0.8);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
        oscillator.onended = () => {
          oscillator.disconnect();
          gainNode.disconnect();
        };
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    };
    const triggerFireworkEffect = () => {
      if (!props.triggerFirework) return;
      if (props.isCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00ff00", "#32cd32", "#7cfc00", "#adff2f", "#9aff9a"]
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ["#ffd700", "#ffff00", "#ffffe0", "#fffacd"]
          });
        }, 200);
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb"]
          });
        }, 400);
      } else {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 },
          colors: ["#ff4444", "#ff6666", "#ff8888", "#ffaaaa"],
          gravity: 1.2,
          scalar: 0.8
        });
      }
    };
    const playSoundEffect = () => {
      if (!props.triggerSound) return;
      try {
        if (props.isCorrect) {
          createSuccessSound();
        } else {
          createErrorSound();
        }
      } catch (error) {
        console.warn("Sound playback error:", error);
        playFallbackSound(props.isCorrect);
      }
    };
    const playFallbackSound = (isCorrect2) => {
      try {
        const audioContext = getAudioContext();
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const now = audioContext.currentTime;
        if (isCorrect2) {
          const frequencies = [523, 659, 784];
          frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            const startTime = now + index * 0.15;
            oscillator.frequency.setValueAtTime(freq, startTime);
            oscillator.type = "sine";
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.4, startTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(1e-3, startTime + 0.4);
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
            oscillator.onended = () => {
              oscillator.disconnect();
              gainNode.disconnect();
            };
          });
        } else {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.setValueAtTime(400, now);
          oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.6);
          oscillator.type = "sawtooth";
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(props.soundVolume * 0.5, now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(1e-3, now + 0.6);
          oscillator.start(now);
          oscillator.stop(now + 0.6);
          oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
          };
        }
      } catch (error) {
        console.warn("Web Audio API fallback failed:", error);
      }
    };
    const triggerEffects = () => {
      if (props.triggerFirework || props.triggerSound) {
        triggerFireworkEffect();
        playSoundEffect();
        setTimeout(() => {
          emit("effect-complete");
        }, 1e3);
      }
    };
    const { triggerFirework, triggerSound, isCorrect } = toRefs(props);
    watch([triggerFirework, triggerSound], ([newFirework, newSound]) => {
      if (newFirework || newSound) {
        triggerEffects();
      }
    }, { immediate: false });
    onUnmounted(() => {
      if (audioContextInstance && audioContextInstance.state !== "closed") {
        setTimeout(() => {
          if (audioContextInstance && audioContextInstance.state !== "closed") {
            audioContextInstance.close();
            audioContextInstance = null;
          }
        }, 1e3);
      }
    });
    __expose({
      triggerEffects,
      triggerFireworkEffect,
      playSoundEffect
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1);
    };
  }
});
const FireworkSoundEffect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-146028e4"]]);
export {
  FireworkSoundEffect as default
};
//# sourceMappingURL=FireworkSoundEffect-Ca-_YQ57.js.map
