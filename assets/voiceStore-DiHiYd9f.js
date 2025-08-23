import { z as ref, M as useI18n, P as watch } from "./vendor-CKTvmtu5.js";
const debugAvailableVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = speechSynthesis.getVoices();
    console.log("=== AVAILABLE VOICES DEBUG ====");
    console.log(`Total voices found: ${voices.length}`);
    voices.forEach((voice, index) => {
      console.log(`${index + 1}. Name: "${voice.name}" | Lang: ${voice.lang} | Local: ${voice.localService} | Default: ${voice.default}`);
    });
    const koreanVoices = voices.filter((voice) => voice.lang.startsWith("ko"));
    console.log("\n=== KOREAN VOICES DETAIL ====");
    console.log(`Korean voices found: ${koreanVoices.length}`);
    koreanVoices.forEach((voice, index) => {
      const name = voice.name.toLowerCase();
      const genderGuess = name.includes("female") || name.includes("woman") ? "👩 Female" : name.includes("male") || name.includes("man") ? "👨 Male" : "❓ Unknown";
      console.log(`🇰🇷 ${index + 1}. "${voice.name}" | ${genderGuess} | Lang: ${voice.lang}`);
    });
    console.log("===============================");
    return voices;
  }
  return [];
};
const defaultSettings = {
  "female-sweet": { rate: 0.85, pitch: 1.1, volume: 1 },
  "female-clear": { rate: 1, pitch: 0.95, volume: 1 },
  "female-professional": { rate: 0.9, pitch: 0.85, volume: 1 },
  "male-strong": { rate: 0.8, pitch: 0.7, volume: 1 },
  "male-gentle": { rate: 0.9, pitch: 0.9, volume: 1 },
  "male-deep": { rate: 0.75, pitch: 0.6, volume: 1 },
  "korean-female": { rate: 0.95, pitch: 1.15, volume: 1 },
  "korean-male": { rate: 0.85, pitch: 0.5, volume: 1 }
};
const voiceSettings = ref({ ...defaultSettings });
const currentVoiceType = ref("female-sweet");
const availableVoices = ref([]);
const selectedVoice = ref(null);
const loadVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = speechSynthesis.getVoices();
    console.log("Loading voices, total found:", voices.length);
    debugAvailableVoices();
    const englishVoices = voices.filter((voice) => voice.lang.startsWith("en"));
    const koreanVoices = voices.filter((voice) => voice.lang.startsWith("ko"));
    const allSupportedVoices = [...englishVoices, ...koreanVoices];
    console.log("English voices found:", englishVoices.length);
    console.log("Korean voices found:", koreanVoices.length);
    console.log("Total supported voices:", allSupportedVoices.length);
    availableVoices.value = allSupportedVoices;
    if (allSupportedVoices.length > 0) {
      updateSelectedVoice();
    }
  }
};
const updateSelectedVoice = () => {
  const voices = availableVoices.value;
  console.log("Updating voice selection, available voices:", voices.length);
  console.log("Current voice type:", currentVoiceType.value);
  if (voices.length === 0) {
    console.log("No voices available, loading voices...");
    loadVoices();
    return;
  }
  let targetVoice = null;
  const englishVoices = voices.filter((voice) => voice.lang.startsWith("en"));
  const koreanVoices = voices.filter((voice) => voice.lang.startsWith("ko"));
  const femaleVoices = englishVoices.filter((voice) => {
    const name = voice.name.toLowerCase();
    return name.includes("female") || name.includes("woman") || name.includes("zira") || name.includes("hazel") || name.includes("cortana") || name.includes("helena") || name.includes("susan") || name.includes("samantha") || name.includes("karen");
  });
  const maleVoices = englishVoices.filter((voice) => {
    const name = voice.name.toLowerCase();
    return name.includes("male") || name.includes("man") || name.includes("david") || name.includes("mark") || name.includes("daniel") || name.includes("richard") || name.includes("alex") || name.includes("tom") || name.includes("aaron");
  });
  const koreanFemaleVoices = koreanVoices.filter((voice) => {
    const name = voice.name.toLowerCase();
    if (name.includes("female") || name.includes("woman")) return true;
    if (name.includes("heami") || name.includes("yuna") || name.includes("seoyeon") || name.includes("sora") || name.includes("inha") || name.includes("nayeon") || name.includes("clara") || name.includes("aria")) return true;
    if (name.includes("male") || name.includes("man")) return false;
    return false;
  });
  const koreanMaleVoices = koreanVoices.filter((voice) => {
    const name = voice.name.toLowerCase();
    if (name.includes("male") || name.includes("man")) return true;
    if (name.includes("minho") || name.includes("woojin") || name.includes("taehyun") || name.includes("jun") || name.includes("alex") || name.includes("david") || name.includes("injoo")) return true;
    if (name.includes("female") || name.includes("woman")) return false;
    return false;
  });
  const remainingKoreanVoices = koreanVoices.filter(
    (voice) => !koreanFemaleVoices.includes(voice) && !koreanMaleVoices.includes(voice)
  );
  if (remainingKoreanVoices.length > 0) {
    const midPoint = Math.ceil(remainingKoreanVoices.length / 2);
    koreanFemaleVoices.push(...remainingKoreanVoices.slice(0, midPoint));
    koreanMaleVoices.push(...remainingKoreanVoices.slice(midPoint));
  }
  console.log(`English Female voices found: ${femaleVoices.length}`, femaleVoices.map((v) => v.name));
  console.log(`English Male voices found: ${maleVoices.length}`, maleVoices.map((v) => v.name));
  console.log(`Korean Female voices found: ${koreanFemaleVoices.length}`, koreanFemaleVoices.map((v) => v.name));
  console.log(`Korean Male voices found: ${koreanMaleVoices.length}`, koreanMaleVoices.map((v) => v.name));
  if (koreanFemaleVoices.length === 0 && koreanMaleVoices.length === 0 && koreanVoices.length > 0) {
    const halfPoint = Math.floor(koreanVoices.length / 2);
    koreanFemaleVoices.push(...koreanVoices.slice(0, halfPoint));
    koreanMaleVoices.push(...koreanVoices.slice(halfPoint));
    console.log("No Korean gender-specific voices found, splitting by index");
  }
  if (femaleVoices.length === 0 && maleVoices.length === 0 && englishVoices.length > 0) {
    const halfPoint = Math.floor(englishVoices.length / 2);
    femaleVoices.push(...englishVoices.slice(0, halfPoint));
    maleVoices.push(...englishVoices.slice(halfPoint));
    console.log("No English gender-specific voices found, splitting by index");
  }
  switch (currentVoiceType.value) {
    case "female-sweet":
      targetVoice = femaleVoices[0] || voices[0];
      console.log("Selected female-sweet:", targetVoice?.name);
      break;
    case "female-clear":
      targetVoice = femaleVoices[1] || femaleVoices[0] || voices[1] || voices[0];
      console.log("Selected female-clear:", targetVoice?.name);
      break;
    case "female-professional":
      targetVoice = femaleVoices[2] || femaleVoices[0] || voices[2] || voices[0];
      console.log("Selected female-professional:", targetVoice?.name);
      break;
    case "male-strong":
      targetVoice = maleVoices[0] || voices[Math.floor(voices.length / 2)] || voices[0];
      console.log("Selected male-strong:", targetVoice?.name);
      break;
    case "male-gentle":
      targetVoice = maleVoices[1] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 1] || voices[0];
      console.log("Selected male-gentle:", targetVoice?.name);
      break;
    case "male-deep":
      targetVoice = maleVoices[2] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 2] || voices[0];
      console.log("Selected male-deep:", targetVoice?.name);
      break;
    case "korean-female":
      targetVoice = koreanVoices[0] || voices[0];
      console.log("🇰🇷👩 KOREAN FEMALE - Selected voice:", targetVoice?.name, "Lang:", targetVoice?.lang);
      break;
    case "korean-male":
      if (koreanVoices.length >= 2) {
        targetVoice = koreanVoices[1];
        console.log("🇰🇷👨 KOREAN MALE - Using second Korean voice:", targetVoice?.name);
      } else if (koreanVoices.length === 1) {
        targetVoice = koreanVoices[0];
        console.log("🇰🇷👨 KOREAN MALE - Using same Korean voice with deep pitch (0.5):", targetVoice?.name);
      } else {
        targetVoice = maleVoices[0] || voices[0];
        console.log("🇰🇷👨 KOREAN MALE - No Korean voices, using male voice:", targetVoice?.name);
      }
      if (!targetVoice) {
        targetVoice = voices[0];
        console.log("⚠️ FALLBACK: Using first available voice:", targetVoice?.name);
      }
      console.log("🇰🇷 Total Korean voices:", koreanVoices.length, koreanVoices.map((v) => v.name));
      console.log("🎯 Final selected voice for Korean Male:", targetVoice?.name, "Lang:", targetVoice?.lang);
      break;
  }
  console.log(`Looking for ${currentVoiceType.value} voice, found:`, targetVoice?.name);
  const previousVoice = selectedVoice.value?.name;
  selectedVoice.value = targetVoice || voices[0] || null;
  console.log("Voice changed from", previousVoice, "to", selectedVoice.value?.name);
};
const loadSettings = () => {
  const saved = localStorage.getItem("voice-settings");
  const savedType = localStorage.getItem("voice-type");
  if (saved) {
    try {
      const parsedSettings = JSON.parse(saved);
      voiceSettings.value = {
        ...defaultSettings,
        ...Object.keys(parsedSettings).reduce((acc, key) => {
          const voiceType = key;
          if (defaultSettings[voiceType]) {
            acc[voiceType] = { ...defaultSettings[voiceType], ...parsedSettings[voiceType] };
          }
          return acc;
        }, {})
      };
    } catch (error) {
      console.error("Error loading voice settings:", error);
      voiceSettings.value = { ...defaultSettings };
    }
  }
  if (savedType) {
    currentVoiceType.value = savedType;
  }
};
const saveSettings = () => {
  localStorage.setItem("voice-settings", JSON.stringify(voiceSettings.value));
  localStorage.setItem("voice-type", currentVoiceType.value);
};
const createUtterance = (text) => {
  updateSelectedVoice();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  const settings = voiceSettings.value[currentVoiceType.value];
  utterance.rate = Math.max(0.1, Math.min(10, settings.rate));
  utterance.pitch = Math.max(0, Math.min(2, settings.pitch));
  utterance.volume = Math.max(0, Math.min(1, settings.volume));
  console.log("Creating utterance with voice type:", currentVoiceType.value);
  console.log("Selected voice for utterance:", selectedVoice.value?.name);
  if (selectedVoice.value) {
    utterance.voice = selectedVoice.value;
  }
  return utterance;
};
const playAudio = (text) => {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      reject(new Error("Speech synthesis not supported"));
      return;
    }
    const utterance = createUtterance(text);
    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(event.error);
    speechSynthesis.speak(utterance);
  });
};
const setVoiceType = (type) => {
  console.log("Setting voice type to:", type);
  currentVoiceType.value = type;
  if (availableVoices.value.length === 0) {
    loadVoices();
  }
  updateSelectedVoice();
  saveSettings();
  console.log("Voice updated to:", selectedVoice.value?.name);
};
const updateVoiceSettings = (type, newSettings) => {
  if (voiceSettings.value[type]) {
    voiceSettings.value[type] = { ...voiceSettings.value[type], ...newSettings };
    saveSettings();
  }
};
const resetVoiceSettings = (type) => {
  if (defaultSettings[type]) {
    voiceSettings.value[type] = { ...defaultSettings[type] };
    saveSettings();
  }
};
const getVoiceTypeOptions = () => {
  const { t } = useI18n();
  return [
    { value: "female-sweet", label: t("voice.types.female_sweet", "Female Sweet"), icon: "👩💖" },
    { value: "female-clear", label: t("voice.types.female_clear", "Female Clear"), icon: "👩💼" },
    { value: "female-professional", label: t("voice.types.female_professional", "Female Professional"), icon: "👩🎯" },
    { value: "male-strong", label: t("voice.types.male_strong", "Male Strong"), icon: "👨💪" },
    { value: "male-gentle", label: t("voice.types.male_gentle", "Male Gentle"), icon: "👨😊" },
    { value: "male-deep", label: t("voice.types.male_deep", "Male Deep"), icon: "👨🎭" },
    { value: "korean-female", label: t("voice.types.korean_female", "Korean Female"), icon: "🇰🇷👩" },
    { value: "korean-male", label: t("voice.types.korean_male", "Korean Male"), icon: "🇰🇷👨" }
  ];
};
const getCurrentVoiceInfo = () => {
  if (!selectedVoice.value) return null;
  const gender = currentVoiceType.value.includes("female") ? "female" : "male";
  return {
    name: selectedVoice.value.name,
    lang: selectedVoice.value.lang,
    gender
  };
};
watch(voiceSettings, () => {
  saveSettings();
}, { deep: true });
watch(currentVoiceType, (newType, oldType) => {
  if (newType !== oldType) {
    console.log("Voice type changed from", oldType, "to", newType);
    updateSelectedVoice();
    saveSettings();
  }
});
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}
loadSettings();
loadVoices();
const forceReloadVoices = () => {
  console.log("🔄 Force reloading voices...");
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    speechSynthesis.getVoices();
    loadVoices();
    debugAvailableVoices();
  }
};
function useVoiceStore() {
  return {
    voiceSettings,
    currentVoiceType,
    availableVoices,
    selectedVoice,
    setVoiceType,
    updateVoiceSettings,
    resetVoiceSettings,
    playAudio,
    createUtterance,
    getVoiceTypeOptions,
    getCurrentVoiceInfo,
    loadVoices,
    forceReloadVoices,
    debugAvailableVoices
  };
}
export {
  useVoiceStore as u
};
//# sourceMappingURL=voiceStore-DiHiYd9f.js.map
