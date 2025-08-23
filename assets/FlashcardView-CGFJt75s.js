const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LazyLoadComponent-DUQ86Zk1.js","assets/vendor-CKTvmtu5.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/LazyLoadComponent-DWULbbXY.css","assets/VoiceSelector-s8mzgr_N.js","assets/index-JwMkyzcu.js","assets/vendor-toast-Blf0QbeM.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DUQRsKJD.css","assets/voiceStore-DiHiYd9f.js","assets/FlashcardHeader-Dcs6y_ZH.js","assets/FlashcardProgress-DD584FuT.js","assets/FlashcardDateFilter-BhtbJIeR.js","assets/dateUtils-B2zqIzJj.js","assets/FlashcardCard-D-QxtB_h.js","assets/topicUtils-Ix3geJ7R.js","assets/FlashcardCard-BbkuZRmo.css","assets/FlashcardQuiz-Dr2ZD7ix.js","assets/FlashcardTyping-XHLrMmxq.js","assets/FlashcardImage-DGMNlCUe.js","assets/FlashcardControls-DK9PB2WG.js","assets/PracticeTimer-CfpmHD-x.js","assets/PracticeTimer-DnI5CziQ.css","assets/ExitWarningModal-3D4z3ENM.js","assets/CompletionModal-CaoFSNSz.js","assets/CompletionModal-f93s1iQw.css","assets/HistoryModal-DjiZdLIj.js","assets/SessionDetailModal-CMrDEwo4.js","assets/SettingsModal-Bf2hDbh_.js","assets/useVocabularyStore-C5HdnbWt.js","assets/PronunciationMode-Cr1aHBMr.js","assets/ListeningMode-AKcOqVSa.js","assets/ListeningMode-DLNJ-re-.css","assets/PracticeStats-DvVETQv8.js","assets/FlashcardEmptyState-qXRoipI8.js","assets/PictionaryMode-btu1fvAg.js","assets/PictionaryMode-C7ygRu9K.css","assets/FlipTileMode-C80qyQap.js","assets/FlipTileMode-8oi-F0Q8.css","assets/BubbleShooterMode-C50Fokwe.js","assets/useAudioSystem-CpzX5TW1.js","assets/BubbleShooterMode-CI5dIgp2.css","assets/SnakeGameMode-CeHmgCOT.js","assets/SnakeGameMode-CoB0bMog.css","assets/ConfirmToast-DsZYvMEQ.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, u as useModalStore } from "./index-JwMkyzcu.js";
import { G as defineAsyncComponent, O as useRouter, z as ref, P as watch, D as computed, A as onMounted, d as defineComponent, M as useI18n, B as onUnmounted, l as resolveComponent, c as createElementBlock, v as openBlock, V as createStaticVNode, y as createVNode, f as createBaseVNode, u as unref, w as withCtx, e as createCommentVNode, b as createBlock, F as Fragment, t as toDisplayString } from "./vendor-CKTvmtu5.js";
import { u as useToast } from "./vendor-toast-Blf0QbeM.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import { a as getDateKey } from "./dateUtils-B2zqIzJj.js";
import { u as useVoiceStore } from "./voiceStore-DiHiYd9f.js";
import { u as useFlashcardHistory } from "./useFlashcardHistory-DZ_k7wT9.js";
import { a as getTopicName } from "./topicUtils-Ix3geJ7R.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const LazyLoadComponent = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-DUQ86Zk1.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
const VoiceSelector = defineAsyncComponent(() => __vitePreload(() => import("./VoiceSelector-s8mzgr_N.js"), true ? __vite__mapDeps([4,5,1,6,7,8,9]) : void 0));
const FlashcardHeader = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardHeader-Dcs6y_ZH.js"), true ? __vite__mapDeps([10,1]) : void 0));
const FlashcardProgress = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardProgress-DD584FuT.js"), true ? __vite__mapDeps([11,1]) : void 0));
const FlashcardDateFilter = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardDateFilter-BhtbJIeR.js"), true ? __vite__mapDeps([12,1,13]) : void 0));
const FlashcardCard = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardCard-D-QxtB_h.js"), true ? __vite__mapDeps([14,5,1,6,7,8,15,9,2,16]) : void 0));
const FlashcardQuiz = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardQuiz-Dr2ZD7ix.js"), true ? __vite__mapDeps([17,5,1,6,7,8,15]) : void 0));
const FlashcardTyping = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardTyping-XHLrMmxq.js"), true ? __vite__mapDeps([18,5,1,6,7,8,15]) : void 0));
const FlashcardImage = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardImage-DGMNlCUe.js"), true ? __vite__mapDeps([19,5,1,6,7,8,15]) : void 0));
const FlashcardControls = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardControls-DK9PB2WG.js"), true ? __vite__mapDeps([20,1]) : void 0));
const PracticeTimer = defineAsyncComponent(() => __vitePreload(() => import("./PracticeTimer-CfpmHD-x.js"), true ? __vite__mapDeps([21,1,2,22]) : void 0));
const ExitWarningModal = defineAsyncComponent(() => __vitePreload(() => import("./ExitWarningModal-3D4z3ENM.js"), true ? __vite__mapDeps([23,1]) : void 0));
const CompletionModal = defineAsyncComponent(() => __vitePreload(() => import("./CompletionModal-CaoFSNSz.js"), true ? __vite__mapDeps([24,1,2,25]) : void 0));
const HistoryModal = defineAsyncComponent(() => __vitePreload(() => import("./HistoryModal-DjiZdLIj.js"), true ? __vite__mapDeps([26,1]) : void 0));
const SessionDetailModal = defineAsyncComponent(() => __vitePreload(() => import("./SessionDetailModal-CMrDEwo4.js"), true ? __vite__mapDeps([27,5,1,6,7,8]) : void 0));
const SettingsModal = defineAsyncComponent(() => __vitePreload(() => import("./SettingsModal-Bf2hDbh_.js"), true ? __vite__mapDeps([28,1,29,15]) : void 0));
const PronunciationMode = defineAsyncComponent(() => __vitePreload(() => import("./PronunciationMode-Cr1aHBMr.js"), true ? __vite__mapDeps([30,5,1,6,7,8]) : void 0));
const ListeningMode = defineAsyncComponent(() => __vitePreload(() => import("./ListeningMode-AKcOqVSa.js"), true ? __vite__mapDeps([31,5,1,6,7,8,2,32]) : void 0));
const PracticeStats = defineAsyncComponent(() => __vitePreload(() => import("./PracticeStats-DvVETQv8.js"), true ? __vite__mapDeps([33,1]) : void 0));
const FlashcardEmptyState = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardEmptyState-qXRoipI8.js"), true ? __vite__mapDeps([34,1]) : void 0));
const PictionaryMode = defineAsyncComponent(() => __vitePreload(() => import("./PictionaryMode-btu1fvAg.js"), true ? __vite__mapDeps([35,5,1,6,7,8,9,2,36]) : void 0));
const FlipTileMode = defineAsyncComponent(() => __vitePreload(() => import("./FlipTileMode-C80qyQap.js"), true ? __vite__mapDeps([37,5,1,6,7,8,9,2,38]) : void 0));
const BubbleShooterMode = defineAsyncComponent(() => __vitePreload(() => import("./BubbleShooterMode-C50Fokwe.js"), true ? __vite__mapDeps([39,1,9,40,2,41]) : void 0));
const SnakeGameMode = defineAsyncComponent(() => __vitePreload(() => import("./SnakeGameMode-CeHmgCOT.js"), true ? __vite__mapDeps([42,1,9,2,43]) : void 0));
const AsyncComponents = {
  LazyLoadComponent,
  VoiceSelector,
  FlashcardHeader,
  FlashcardProgress,
  FlashcardDateFilter,
  FlashcardCard,
  FlashcardQuiz,
  FlashcardTyping,
  FlashcardImage,
  FlashcardControls,
  PracticeTimer,
  ExitWarningModal,
  CompletionModal,
  HistoryModal,
  SessionDetailModal,
  SettingsModal,
  PronunciationMode,
  ListeningMode,
  PracticeStats,
  FlashcardEmptyState,
  PictionaryMode,
  FlipTileMode,
  BubbleShooterMode,
  SnakeGameMode
};
function useFlashcardGame(flashcards) {
  const router = useRouter();
  const PRACTICE_MODE_STORAGE_KEY = "flashcard-practice-mode";
  const loadPracticeModeFromStorage = () => {
    try {
      const saved = localStorage.getItem(PRACTICE_MODE_STORAGE_KEY);
      if (saved && ["flashcard", "quiz", "typing", "image", "listening", "pronunciation", "pictionary", "flip-tile", "bubble-shooter", "snake-game"].includes(saved)) {
        return saved;
      }
    } catch (error) {
      console.error("Error loading practice mode from localStorage:", error);
    }
    return "flashcard";
  };
  const savePracticeModeToStorage = (mode) => {
    try {
      localStorage.setItem(PRACTICE_MODE_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Error saving practice mode to localStorage:", error);
    }
  };
  const currentIndex = ref(0);
  const isFlipped = ref(false);
  const practiceMode = ref(loadPracticeModeFromStorage());
  const showSettings = ref(false);
  const showCompletionModal = ref(false);
  const isCompleted = ref(false);
  const settings = ref({
    cardCount: 20,
    difficulty: "all",
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: "female",
    practiceMode: loadPracticeModeFromStorage()
  });
  const stats = ref({
    easy: 0,
    difficult: 0,
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: /* @__PURE__ */ new Date(),
    endTime: null,
    mode: "flashcard"
  });
  stats.value.mode = practiceMode.value;
  watch(practiceMode, (mode) => {
    stats.value.mode = mode;
  });
  const currentCard = computed(() => {
    if (flashcards.value.length === 0) return null;
    return flashcards.value[currentIndex.value];
  });
  const nextCard = () => {
    if (currentIndex.value < flashcards.value.length - 1) {
      currentIndex.value++;
      resetCurrentCard();
    } else {
      completeSession();
    }
  };
  const previousCard = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      resetCurrentCard();
    }
  };
  const flipCard = () => {
    isFlipped.value = !isFlipped.value;
  };
  const resetCurrentCard = () => {
    isFlipped.value = false;
  };
  const completeSession = () => {
    isCompleted.value = true;
    stats.value.endTime = /* @__PURE__ */ new Date();
    showCompletionModal.value = true;
  };
  const restartSession = () => {
    currentIndex.value = 0;
    isCompleted.value = false;
    showCompletionModal.value = false;
    stats.value = {
      easy: 0,
      difficult: 0,
      reviewed: 0,
      correct: 0,
      incorrect: 0,
      total: 0,
      startTime: /* @__PURE__ */ new Date(),
      endTime: null,
      mode: practiceMode.value
    };
    resetCurrentCard();
  };
  const changePracticeMode = (mode) => {
    practiceMode.value = mode;
    settings.value.practiceMode = mode;
    savePracticeModeToStorage(mode);
    resetCurrentCard();
  };
  const applySettings = () => {
    showSettings.value = false;
  };
  const goBack = () => {
    router.push("/");
  };
  const goToVocabulary = () => {
    router.push("/practice/flashcard");
  };
  const markEasy = () => {
    nextCard();
  };
  const markDifficult = () => {
    nextCard();
  };
  let autoFlipTimer = null;
  watch([currentIndex, isFlipped], () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer);
    }
    if (settings.value.autoFlip && !isFlipped.value) {
      autoFlipTimer = window.setTimeout(() => {
        if (!isFlipped.value) {
          flipCard();
        }
      }, settings.value.flipDelay * 1e3);
    }
  });
  const cleanup = () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer);
    }
  };
  return {
    // State
    currentIndex,
    isFlipped,
    practiceMode,
    showSettings,
    showCompletionModal,
    isCompleted,
    settings,
    stats,
    // Computed
    flashcards,
    currentCard,
    // Methods
    nextCard,
    previousCard,
    flipCard,
    resetCurrentCard,
    completeSession,
    restartSession,
    changePracticeMode,
    applySettings,
    goBack,
    goToVocabulary,
    markEasy,
    markDifficult,
    cleanup
  };
}
function useFlashcardModes(currentCard, flashcards, allVocabularies, onCorrectAnswer, onIncorrectAnswer) {
  const { playAudio: playVoiceAudio } = useVoiceStore();
  const quizOptions = ref([]);
  const selectedAnswer = ref("");
  const quizAnswered = ref(false);
  const typingAnswer = ref("");
  const typingAnswered = ref(false);
  const typingCorrect = ref(false);
  const typingQuizEnabled = ref(false);
  const typingQuizOptions = ref([]);
  const typingQuizSelected = ref("");
  const typingQuizAnswered = ref(false);
  const listeningAnswer = ref("");
  const listeningAnswered = ref(false);
  const listeningCorrect = ref(false);
  const listeningQuizEnabled = ref(false);
  const listeningQuizOptions = ref([]);
  const listeningQuizSelected = ref("");
  const listeningQuizAnswered = ref(false);
  const imageAnswer = ref("");
  const imageAnswered = ref(false);
  const imageCorrect = ref(false);
  const imageQuizEnabled = ref(false);
  const imageQuizOptions = ref([]);
  const imageQuizSelected = ref("");
  const imageQuizAnswered = ref(false);
  const pictionaryAnswer = ref("");
  const pictionaryAnswered = ref(false);
  const pictionaryCorrect = ref(false);
  const flipTileAnswer = ref("");
  const flipTileAnswered = ref(false);
  const flipTileCorrect = ref(false);
  const bubbleShooterVietnameseMode = ref(false);
  const STORAGE_KEYS = {
    image: "pe_imageQuizEnabled",
    listening: "pe_listeningQuizEnabled",
    typing: "pe_typingQuizEnabled",
    bubbleShooterVietnamese: "pe_bubbleShooterVietnameseMode",
    imagePos: "pe_imageQuiz_correct_pos",
    listeningPos: "pe_listeningQuiz_correct_pos",
    typingPos: "pe_typingQuiz_correct_pos"
  };
  const readBool = (key, def = false) => {
    try {
      const v = localStorage.getItem(key);
      return v === null ? def : v === "true";
    } catch {
      return def;
    }
  };
  imageQuizEnabled.value = readBool(STORAGE_KEYS.image, false);
  listeningQuizEnabled.value = readBool(STORAGE_KEYS.listening, false);
  typingQuizEnabled.value = readBool(STORAGE_KEYS.typing, false);
  bubbleShooterVietnameseMode.value = readBool(STORAGE_KEYS.bubbleShooterVietnamese, false);
  const writeBool = (key, val) => {
    try {
      localStorage.setItem(key, String(val));
    } catch {
    }
  };
  const readNumber = (key, def = 0) => {
    try {
      const v = localStorage.getItem(key);
      const n = v === null ? def : Number(v);
      return Number.isFinite(n) && n >= 0 ? n : def;
    } catch {
      return def;
    }
  };
  const writeNumber = (key, val) => {
    try {
      localStorage.setItem(key, String(val));
    } catch {
    }
  };
  watch(imageQuizEnabled, (v) => writeBool(STORAGE_KEYS.image, v));
  watch(listeningQuizEnabled, (v) => writeBool(STORAGE_KEYS.listening, v));
  watch(typingQuizEnabled, (v) => writeBool(STORAGE_KEYS.typing, v));
  watch(bubbleShooterVietnameseMode, (v) => writeBool(STORAGE_KEYS.bubbleShooterVietnamese, v));
  const imageCorrectPos = ref(readNumber(STORAGE_KEYS.imagePos, Math.floor(Math.random() * 4)));
  const listeningCorrectPos = ref(readNumber(STORAGE_KEYS.listeningPos, Math.floor(Math.random() * 4)));
  const typingCorrectPos = ref(readNumber(STORAGE_KEYS.typingPos, Math.floor(Math.random() * 4)));
  watch(imageCorrectPos, (n) => writeNumber(STORAGE_KEYS.imagePos, n));
  watch(listeningCorrectPos, (n) => writeNumber(STORAGE_KEYS.listeningPos, n));
  watch(typingCorrectPos, (n) => writeNumber(STORAGE_KEYS.typingPos, n));
  const placeWithRotation = (correct, wrongs, posRef) => {
    const options = new Array(4);
    const idx = posRef.value % 4;
    options[idx] = correct;
    const shuffledWrongs = [...wrongs].sort(() => Math.random() - 0.5);
    let wi = 0;
    for (let i = 0; i < 4; i++) {
      if (i === idx) continue;
      options[i] = shuffledWrongs[wi++] ?? "";
    }
    posRef.value = (posRef.value + 1) % 4;
    return options;
  };
  const isRecording = ref(false);
  const pronunciationResult = ref("");
  const pronunciationAnswered = ref(false);
  const pronunciationCorrect = ref(false);
  let recognition = null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechRecognitionSupported = !!SpeechRecognition;
  if (isSpeechRecognitionSupported) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      pronunciationResult.value = transcript;
      checkPronunciationAnswer(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      isRecording.value = false;
    };
    recognition.onend = () => {
      isRecording.value = false;
    };
  }
  const startRecording = () => {
    if (isRecording.value || !isSpeechRecognitionSupported) return;
    pronunciationResult.value = "";
    pronunciationAnswered.value = false;
    pronunciationCorrect.value = false;
    isRecording.value = true;
    recognition.start();
  };
  const checkPronunciationAnswer = (transcript) => {
    if (!currentCard.value) return false;
    pronunciationAnswered.value = true;
    const userAnswer = transcript.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const correctAnswer = currentCard.value.word.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    pronunciationCorrect.value = userAnswer === correctAnswer;
    if (pronunciationCorrect.value) ;
    return pronunciationCorrect.value;
  };
  const generateQuizOptions = () => {
    if (!currentCard.value) return;
    const correctAnswer = getShortMeaning(currentCard.value.meaning);
    const allOptions = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => getShortMeaning(card.meaning)).filter((meaning) => meaning !== correctAnswer).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allOptions.length >= 3 ? allOptions.slice(0, 3) : allOptions;
    quizOptions.value = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
  };
  const selectQuizAnswer = (answer) => {
    if (quizAnswered.value) return;
    selectedAnswer.value = answer;
    quizAnswered.value = true;
    const correctAnswer = currentCard.value ? getShortMeaning(currentCard.value.meaning) : "";
    const isCorrect = answer === correctAnswer;
    return isCorrect;
  };
  const generateImageQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    imageQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, imageCorrectPos);
  };
  const selectImageQuizAnswer = (answer) => {
    if (imageQuizAnswered.value) return;
    imageQuizSelected.value = answer;
    imageQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    imageAnswered.value = true;
    imageCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkTypingAnswer = () => {
    if (!currentCard.value || typingAnswered.value) return;
    typingAnswered.value = true;
    const userAnswer = typingAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    typingCorrect.value = userAnswer === correctAnswer;
    if (typingCorrect.value) ;
    return typingCorrect.value;
  };
  const generateTypingQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    typingQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, typingCorrectPos);
  };
  const selectTypingQuizAnswer = (answer) => {
    if (typingQuizAnswered.value) return;
    typingQuizSelected.value = answer;
    typingQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    typingAnswered.value = true;
    typingCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkListeningAnswer = () => {
    if (!currentCard.value || listeningAnswered.value) return;
    listeningAnswered.value = true;
    const userAnswer = listeningAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    listeningCorrect.value = userAnswer === correctAnswer;
    if (listeningCorrect.value) ;
    return listeningCorrect.value;
  };
  const generateListeningQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    listeningQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, listeningCorrectPos);
  };
  const selectListeningQuizAnswer = (answer) => {
    if (listeningQuizAnswered.value) return;
    listeningQuizSelected.value = answer;
    listeningQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    listeningAnswered.value = true;
    listeningCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkImageAnswer = () => {
    if (!currentCard.value || imageAnswered.value) return;
    imageAnswered.value = true;
    const userAnswer = imageAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    imageCorrect.value = userAnswer === correctAnswer;
    if (imageCorrect.value) ;
    return imageCorrect.value;
  };
  const checkPictionaryAnswer = () => {
    if (!currentCard.value || pictionaryAnswered.value) return;
    pictionaryAnswered.value = true;
    const userAnswer = pictionaryAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    pictionaryCorrect.value = userAnswer === correctAnswer;
    if (pictionaryCorrect.value) ;
    return pictionaryCorrect.value;
  };
  const checkFlipTileAnswer = () => {
    if (!currentCard.value || flipTileAnswered.value) return;
    flipTileAnswered.value = true;
    const userAnswer = flipTileAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    flipTileCorrect.value = userAnswer === correctAnswer;
    if (flipTileCorrect.value) ;
    return flipTileCorrect.value;
  };
  const playAudio = async () => {
    if (!currentCard.value) return;
    try {
      await playVoiceAudio(currentCard.value.word);
    } catch (error) {
      console.error("Error playing audio:", error);
      const utterance = new SpeechSynthesisUtterance(currentCard.value.word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };
  const resetQuizMode = () => {
    quizOptions.value = [];
    selectedAnswer.value = "";
    quizAnswered.value = false;
  };
  const resetTypingMode = () => {
    typingAnswer.value = "";
    typingAnswered.value = false;
    typingCorrect.value = false;
    typingQuizOptions.value = [];
    typingQuizSelected.value = "";
    typingQuizAnswered.value = false;
  };
  const resetListeningMode = () => {
    listeningAnswer.value = "";
    listeningAnswered.value = false;
    listeningCorrect.value = false;
    listeningQuizOptions.value = [];
    listeningQuizSelected.value = "";
    listeningQuizAnswered.value = false;
  };
  const resetImageMode = () => {
    imageAnswer.value = "";
    imageAnswered.value = false;
    imageCorrect.value = false;
    imageQuizOptions.value = [];
    imageQuizSelected.value = "";
    imageQuizAnswered.value = false;
  };
  const resetPictionaryMode = () => {
    pictionaryAnswer.value = "";
    pictionaryAnswered.value = false;
    pictionaryCorrect.value = false;
  };
  const resetFlipTileMode = () => {
    flipTileAnswer.value = "";
    flipTileAnswered.value = false;
    flipTileCorrect.value = false;
  };
  const resetPronunciationMode = () => {
    if (recognition && isRecording.value) {
      recognition.stop();
    }
    isRecording.value = false;
    pronunciationResult.value = "";
    pronunciationAnswered.value = false;
    pronunciationCorrect.value = false;
  };
  const resetAllModes = () => {
    resetQuizMode();
    resetTypingMode();
    resetListeningMode();
    resetImageMode();
    resetPronunciationMode();
    resetPictionaryMode();
    resetFlipTileMode();
  };
  const getCanProceed = () => {
    return {
      flashcard: true,
      quiz: quizAnswered.value,
      typing: typingAnswered.value,
      listening: listeningAnswered.value,
      image: imageAnswered.value,
      pronunciation: pronunciationAnswered.value,
      pictionary: pictionaryAnswered.value,
      "flip-tile": flipTileAnswered.value,
      "snake-game": true,
      "bubble-shooter": true
    };
  };
  const getShortMeaning = (meaning) => {
    return meaning.split(" - ")[0].trim();
  };
  return {
    // Quiz mode
    quizOptions,
    selectedAnswer,
    quizAnswered,
    generateQuizOptions,
    selectQuizAnswer,
    resetQuizMode,
    // Typing mode
    typingAnswer,
    typingAnswered,
    typingCorrect,
    checkTypingAnswer,
    resetTypingMode,
    // Typing-Quiz (within Typing mode)
    typingQuizEnabled,
    typingQuizOptions,
    typingQuizSelected,
    typingQuizAnswered,
    generateTypingQuizOptions,
    selectTypingQuizAnswer,
    // Listening mode
    listeningAnswer,
    listeningAnswered,
    listeningCorrect,
    checkListeningAnswer,
    playAudio,
    resetListeningMode,
    // Listening-Quiz (within Listening mode)
    listeningQuizEnabled,
    listeningQuizOptions,
    listeningQuizSelected,
    listeningQuizAnswered,
    generateListeningQuizOptions,
    selectListeningQuizAnswer,
    // Image mode
    imageAnswer,
    imageAnswered,
    imageCorrect,
    checkImageAnswer,
    resetImageMode,
    // Image-Quiz (within Image mode)
    imageQuizEnabled,
    imageQuizOptions,
    imageQuizSelected,
    imageQuizAnswered,
    generateImageQuizOptions,
    selectImageQuizAnswer,
    // Pictionary mode
    pictionaryAnswer,
    pictionaryAnswered,
    pictionaryCorrect,
    checkPictionaryAnswer,
    resetPictionaryMode,
    // Flip tile mode
    flipTileAnswer,
    flipTileAnswered,
    flipTileCorrect,
    checkFlipTileAnswer,
    resetFlipTileMode,
    // Bubble Shooter mode
    bubbleShooterVietnameseMode,
    // Pronunciation mode
    isRecording,
    pronunciationResult,
    pronunciationAnswered,
    pronunciationCorrect,
    isSpeechRecognitionSupported,
    startRecording,
    resetPronunciationMode,
    // General
    resetAllModes,
    getCanProceed,
    getShortMeaning
  };
}
function useFlashcardSettings() {
  const showSettings = ref(false);
  const defaultSettings = {
    cardCount: 20,
    difficulty: "all",
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: "female",
    practiceMode: "flashcard",
    category: "",
    level: "",
    useFlipTileHints: true
  };
  const settings = ref({ ...defaultSettings });
  const localSettings = ref({ ...defaultSettings });
  const loadSettings = () => {
    const saved = localStorage.getItem("flashcard-settings");
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        settings.value = { ...defaultSettings, ...parsedSettings };
        localSettings.value = { ...settings.value };
      } catch (error) {
        console.error("Error loading settings:", error);
        settings.value = { ...defaultSettings };
        localSettings.value = { ...defaultSettings };
      }
    }
  };
  const saveSettings = () => {
    localStorage.setItem("flashcard-settings", JSON.stringify(settings.value));
  };
  const applySettings = () => {
    settings.value = { ...localSettings.value };
    saveSettings();
    showSettings.value = false;
  };
  const resetSettings = () => {
    settings.value = { ...defaultSettings };
    localSettings.value = { ...defaultSettings };
    saveSettings();
  };
  const cancelSettings = () => {
    localSettings.value = { ...settings.value };
    showSettings.value = false;
  };
  const openSettings = () => {
    localSettings.value = { ...settings.value };
    showSettings.value = true;
  };
  const validateSettings = (settingsToValidate) => {
    const errors = [];
    if (settingsToValidate.cardCount < 1 || settingsToValidate.cardCount > 100) {
      errors.push("Số lượng thẻ phải từ 1 đến 100");
    }
    if (settingsToValidate.flipDelay < 1 || settingsToValidate.flipDelay > 10) {
      errors.push("Thời gian lật thẻ phải từ 1 đến 10 giây");
    }
    return errors;
  };
  const getDifficultyLevels = () => {
    return [
      { value: "all", label: "Tất cả" },
      { value: "easy", label: "Dễ" },
      { value: "medium", label: "Trung bình" },
      { value: "hard", label: "Khó" }
    ];
  };
  const getFlipDelayOptions = () => {
    return [
      { value: 1, label: "1 giây" },
      { value: 2, label: "2 giây" },
      { value: 3, label: "3 giây" },
      { value: 4, label: "4 giây" },
      { value: 5, label: "5 giây" },
      { value: 10, label: "10 giây" }
    ];
  };
  const getCardCountOptions = () => {
    return [
      { value: 10, label: "10 thẻ" },
      { value: 20, label: "20 thẻ" },
      { value: 30, label: "30 thẻ" },
      { value: 50, label: "50 thẻ" },
      { value: 100, label: "100 thẻ" }
    ];
  };
  const getVoiceTypeOptions = () => {
    return [
      { value: "female", label: "Giọng nữ", icon: "👩" },
      { value: "male", label: "Giọng nam", icon: "👨" }
    ];
  };
  const getSettingsPresets = () => {
    return {
      beginner: {
        ...defaultSettings,
        cardCount: 10,
        difficulty: "easy",
        autoFlip: true,
        flipDelay: 5,
        showDefinition: true,
        showExample: true,
        showPronunciation: true
      },
      intermediate: {
        ...defaultSettings,
        cardCount: 20,
        difficulty: "medium",
        autoFlip: false,
        showDefinition: true,
        showExample: true,
        showPronunciation: false
      },
      advanced: {
        ...defaultSettings,
        cardCount: 50,
        difficulty: "hard",
        autoFlip: false,
        showDefinition: false,
        showExample: false,
        showPronunciation: false
      }
    };
  };
  const applyPreset = (presetName) => {
    const presets = getSettingsPresets();
    localSettings.value = { ...presets[presetName] };
  };
  watch(settings, () => {
    saveSettings();
  }, { deep: true });
  onMounted(() => {
    loadSettings();
  });
  return {
    showSettings,
    settings,
    localSettings,
    applySettings,
    resetSettings,
    cancelSettings,
    openSettings,
    validateSettings,
    getDifficultyLevels,
    getFlipDelayOptions,
    getCardCountOptions,
    getVoiceTypeOptions,
    getSettingsPresets,
    applyPreset
  };
}
function useFlashcardStats(stats) {
  const sessionStats = ref({
    totalCards: 0,
    currentCard: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
    streak: 0,
    maxStreak: 0,
    timeSpent: 0,
    averageTimePerCard: 0,
    score: 0
  });
  const currentStreak = ref(0);
  const maxStreak = ref(0);
  const cardStartTime = ref(null);
  const cardTimes = ref([]);
  const initializeStats = (totalCards) => {
    sessionStats.value = {
      totalCards,
      currentCard: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
      streak: 0,
      maxStreak: 0,
      timeSpent: 0,
      averageTimePerCard: 0,
      score: 0
    };
    currentStreak.value = 0;
    maxStreak.value = 0;
    cardTimes.value = [];
    cardStartTime.value = /* @__PURE__ */ new Date();
  };
  const recordAnswer = (isCorrect) => {
    if (isCorrect) {
      sessionStats.value.correctAnswers++;
      stats.value.correct++;
      currentStreak.value++;
      if (currentStreak.value > maxStreak.value) {
        maxStreak.value = currentStreak.value;
      }
    } else {
      sessionStats.value.incorrectAnswers++;
      stats.value.incorrect++;
      currentStreak.value = 0;
    }
    stats.value.total++;
    if (cardStartTime.value) {
      const timeSpent = (/* @__PURE__ */ new Date()).getTime() - cardStartTime.value.getTime();
      cardTimes.value.push(timeSpent);
      cardStartTime.value = /* @__PURE__ */ new Date();
    }
    nextCardStats();
  };
  const nextCardStats = () => {
    stats.value.reviewed++;
    sessionStats.value.currentCard++;
    cardStartTime.value = /* @__PURE__ */ new Date();
  };
  const getPerformanceLevel = computed(() => {
    const accuracy = sessionStats.value.accuracy;
    if (accuracy >= 90) return { level: "Xuất sắc", color: "text-green-600 dark:text-green-400" };
    if (accuracy >= 80) return { level: "Tốt", color: "text-blue-600 dark:text-blue-400" };
    if (accuracy >= 70) return { level: "Khá", color: "text-yellow-600 dark:text-yellow-400" };
    if (accuracy >= 60) return { level: "Trung bình", color: "text-orange-600 dark:text-orange-400" };
    return { level: "Cần cải thiện", color: "text-red-600 dark:text-red-400" };
  });
  const getStreakMessage = computed(() => {
    const streak = currentStreak.value;
    if (streak === 0) return "";
    if (streak < 3) return "Bắt đầu tốt!";
    if (streak < 5) return "Đang tiến bộ!";
    if (streak < 10) return "Tuyệt vời!";
    return "Xuất sắc!";
  });
  const getSpeedRating = computed(() => {
    const avgTime = sessionStats.value.averageTimePerCard / 1e3;
    if (avgTime === 0) return { rating: "", color: "" };
    if (avgTime < 2) return { rating: "Rất nhanh", color: "text-green-600 dark:text-green-400" };
    if (avgTime < 4) return { rating: "Nhanh", color: "text-blue-600 dark:text-blue-400" };
    if (avgTime < 6) return { rating: "Trung bình", color: "text-yellow-600 dark:text-yellow-400" };
    if (avgTime < 10) return { rating: "Chậm", color: "text-orange-600 dark:text-orange-400" };
    return { rating: "Rất chậm", color: "text-red-600 dark:text-red-400" };
  });
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${remainingSeconds}s`;
  };
  const getDetailedStats = computed(() => {
    return {
      ...sessionStats.value,
      performanceLevel: getPerformanceLevel.value,
      streakMessage: getStreakMessage.value,
      speedRating: getSpeedRating.value,
      timeSpentFormatted: formatTime(sessionStats.value.timeSpent),
      averageTimeFormatted: formatTime(sessionStats.value.averageTimePerCard),
      completion: sessionStats.value.totalCards > 0 ? Math.round(sessionStats.value.currentCard / sessionStats.value.totalCards * 100) : 0
    };
  });
  return {
    sessionStats,
    currentStreak,
    maxStreak,
    initializeStats,
    recordAnswer,
    nextCardStats,
    getPerformanceLevel,
    getStreakMessage,
    getSpeedRating,
    formatTime,
    getDetailedStats
  };
}
const makeKey = (sessionId) => `flashcard-session-details:${sessionId}`;
function usePracticeSessionDetails() {
  const currentSessionId = ref(null);
  const currentMode = ref("");
  const startSessionDetails = (sessionId, mode) => {
    currentSessionId.value = sessionId;
    currentMode.value = mode;
    const initial = {
      sessionId,
      mode,
      total: 0,
      correct: 0,
      incorrect: 0,
      entries: []
    };
    try {
      localStorage.setItem(makeKey(sessionId), JSON.stringify(initial));
    } catch {
    }
  };
  const appendAnswer = (payload) => {
    if (!currentSessionId.value) return;
    const key = makeKey(currentSessionId.value);
    let data = null;
    try {
      const raw = localStorage.getItem(key);
      data = raw ? JSON.parse(raw) : null;
    } catch {
    }
    if (!data) {
      data = {
        sessionId: currentSessionId.value,
        mode: currentMode.value,
        total: 0,
        correct: 0,
        incorrect: 0,
        entries: []
      };
    }
    const entry = {
      ...payload,
      timestamp: payload.timestamp || (/* @__PURE__ */ new Date()).toISOString()
    };
    data.entries.push(entry);
    data.total += 1;
    if (entry.isCorrect) data.correct += 1;
    else data.incorrect += 1;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
    }
  };
  const loadDetails = (sessionId) => {
    try {
      const raw = localStorage.getItem(makeKey(sessionId));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const clearDetails = (sessionId) => {
    try {
      localStorage.removeItem(makeKey(sessionId));
    } catch {
    }
  };
  return {
    currentSessionId,
    currentMode,
    startSessionDetails,
    appendAnswer,
    loadDetails,
    clearDetails
  };
}
const _hoisted_1 = { class: "min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg-soft dark:to-dark-bg-mute relative" };
const _hoisted_2 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" };
const _hoisted_3 = { class: "group bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5" };
const _hoisted_4 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" };
const _hoisted_5 = { class: "group relative overflow-visible bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5" };
const _hoisted_6 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8" };
const _hoisted_7 = {
  key: 0,
  class: "relative"
};
const _hoisted_8 = { class: "group relative overflow-hidden bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 p-3 sm:p-4 md:p-6" };
const _hoisted_9 = { class: "space-y-4 sm:space-y-5 md:space-y-6" };
const _hoisted_10 = { class: "flex justify-center max-w-md mx-auto" };
const _hoisted_11 = { key: 0 };
const STORAGE_KEY = "flashcard-date-filter";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ components: AsyncComponents },
  __name: "FlashcardView",
  setup(__props) {
    const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-DsZYvMEQ.js"), true ? __vite__mapDeps([44,1]) : void 0));
    const { t } = useI18n();
    const router = useRouter();
    const toast = useToast();
    const { allVocabularies } = useVocabularyStore();
    const modalStore = useModalStore();
    const {
      startSessionDetails,
      appendAnswer,
      loadDetails
    } = usePracticeSessionDetails();
    const activeSessionId = ref(null);
    const showSessionDetail = ref(false);
    const selectedSessionDetails = ref(null);
    const latestPictionarySnapshot = ref(null);
    const onPictionarySnapshot = (payload) => {
      latestPictionarySnapshot.value = payload;
    };
    const openHistoryDetails = (sessionId) => {
      const details = loadDetails(sessionId);
      selectedSessionDetails.value = details;
      showSessionDetail.value = true;
    };
    const handleDeleteSession = (sessionId) => {
      const toastId = toast(
        {
          component: ConfirmToast,
          props: {
            message: t("flashcard.history.confirmDelete.message", "Are you sure you want to delete this practice session? This action cannot be undone."),
            confirmText: t("flashcard.history.confirmDelete.confirm", "Delete"),
            cancelText: t("flashcard.history.confirmDelete.cancel", "Cancel"),
            onConfirm: () => {
              deleteSession(sessionId);
              toast.success(t("flashcard.history.confirmDelete.success", "Session deleted successfully"));
              toast.dismiss(toastId);
            },
            onCancel: () => {
              toast.dismiss(toastId);
            }
          }
        },
        {
          timeout: 0,
          closeOnClick: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true
        }
      );
    };
    const loadDateFilterState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            selectedDate: parsed.selectedDate || ""
          };
        }
      } catch (error) {
        console.error("Error loading date filter state:", error);
      }
      return { selectedDate: "" };
    };
    const saveDateFilterState = () => {
      try {
        const state = { selectedDate: selectedDate.value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Error saving date filter state:", error);
      }
    };
    const initialState = loadDateFilterState();
    const dateFilterEnabled = ref(true);
    const selectedDate = ref(initialState.selectedDate);
    watch(selectedDate, () => {
      saveDateFilterState();
    });
    const bubbleShooterVietnameseMode = ref(false);
    const snakeDoubleBaitMode = ref(false);
    const pictionaryDefinitionMode = ref(false);
    const scrambleWordsEnabled = ref(false);
    const wordsCrushEnabled = ref(false);
    const loadBubbleShooterVietnameseModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_bubbleShooterVietnameseMode");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveBubbleShooterVietnameseModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_bubbleShooterVietnameseMode", String(enabled));
      } catch {
      }
    };
    const loadSnakeDoubleBaitModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_snakeDoubleBaitMode");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveSnakeDoubleBaitModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_snakeDoubleBaitMode", String(enabled));
      } catch {
      }
    };
    const loadPictionaryDefinitionModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_pictionaryDefinitionMode");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const savePictionaryDefinitionModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_pictionaryDefinitionMode", String(enabled));
      } catch {
      }
    };
    const loadScrambleWordsModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_scrambleWordsEnabled");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveScrambleWordsModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_scrambleWordsEnabled", String(enabled));
      } catch {
      }
    };
    const loadWordsCrushModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_wordsCrushEnabled");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveWordsCrushModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_wordsCrushEnabled", String(enabled));
      } catch {
      }
    };
    bubbleShooterVietnameseMode.value = loadBubbleShooterVietnameseModeFromStorage();
    snakeDoubleBaitMode.value = loadSnakeDoubleBaitModeFromStorage();
    pictionaryDefinitionMode.value = loadPictionaryDefinitionModeFromStorage();
    scrambleWordsEnabled.value = loadScrambleWordsModeFromStorage();
    wordsCrushEnabled.value = loadWordsCrushModeFromStorage();
    watch(bubbleShooterVietnameseMode, (newVal) => {
      saveBubbleShooterVietnameseModeToStorage(newVal);
    });
    watch(snakeDoubleBaitMode, (newVal) => {
      saveSnakeDoubleBaitModeToStorage(newVal);
    });
    watch(pictionaryDefinitionMode, (newVal) => {
      savePictionaryDefinitionModeToStorage(newVal);
    });
    watch(scrambleWordsEnabled, (newVal) => {
      saveScrambleWordsModeToStorage(newVal);
    });
    watch(wordsCrushEnabled, (newVal) => {
      saveWordsCrushModeToStorage(newVal);
    });
    const {
      showSettings: showSettingsDialog,
      settings: flashcardSettings,
      localSettings,
      applySettings: applyGameSettings,
      cancelSettings
    } = useFlashcardSettings();
    const filteredVocabularies = computed(() => {
      let vocabularies = allVocabularies.value;
      if (selectedDate.value) {
        vocabularies = vocabularies.filter((vocab) => {
          const vocabDateKey = getDateKey(vocab.createdAt);
          return vocabDateKey === selectedDate.value;
        });
      }
      if (flashcardSettings.value.category) {
        vocabularies = vocabularies.filter((vocab) => vocab.category === flashcardSettings.value.category);
      }
      return vocabularies;
    });
    const baseFlashcards = computed(() => {
      return filteredVocabularies.value.filter((vocab) => {
        const category = flashcardSettings.value.category;
        const difficulty = flashcardSettings.value.difficulty;
        const categoryMatch = !category || vocab.category === category;
        const levelMatch = !difficulty || difficulty === "all" || vocab.level === difficulty;
        return categoryMatch && levelMatch;
      });
    });
    const imageModeAvailable = computed(() => {
      const cards = baseFlashcards.value;
      if (cards.length === 0) return false;
      return cards.every((v) => {
        const img = v.image;
        if (img == null) return false;
        const s = typeof img === "string" ? img : String(img);
        return s.trim().length > 0;
      });
    });
    const pictionaryModeAvailable = computed(() => {
      const cards = baseFlashcards.value;
      if (cards.length === 0) return false;
      return cards.every((v) => {
        const img = v.image;
        if (img == null) return false;
        const s = typeof img === "string" ? img : String(img);
        return s.trim().length > 0;
      });
    });
    const flipTileModeAvailable = computed(() => {
      const cards = baseFlashcards.value;
      if (cards.length === 0) return false;
      return cards.every((v) => {
        const img = v.image;
        if (img == null) return false;
        const s = typeof img === "string" ? img : String(img);
        return s.trim().length > 0;
      });
    });
    const bubbleShooterModeAvailable = computed(() => {
      if (!selectedDate.value) {
        return filteredVocabularies.value.length <= 8;
      }
      const dateFilteredVocabs = allVocabularies.value.filter((vocab) => {
        const vocabDateKey = getDateKey(vocab.createdAt);
        return vocabDateKey === selectedDate.value;
      });
      return dateFilteredVocabs.length <= 8;
    });
    const practiceStarted = ref(false);
    const practiceTimerRef = ref();
    const showExitWarning = ref(false);
    const allowExit = ref(false);
    const handlePracticeStart = () => {
      practiceStarted.value = true;
      console.log("Practice started!");
      activeSessionId.value = `${Date.now()}`;
      startSessionDetails(activeSessionId.value, practiceMode.value);
    };
    const handleExitPractice = () => {
      if (practiceStarted.value && !allowExit.value) {
        showExitWarning.value = true;
      } else {
        router.push("/practice/flashcard");
      }
    };
    const handleTimeout = () => {
      console.log("Time out for current card!");
    };
    const handleTimerRestart = () => {
      console.log("Timer restarted: restarting from the first card");
      practiceStarted.value = true;
      if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
        shuffleFlashcards();
      }
      cardStateStorage.value = {};
      currentIndex.value = 0;
      resetAndRestoreCard();
      if (practiceTimerRef.value) {
        practiceTimerRef.value.startTimer();
      }
    };
    const handleSkip = () => {
      console.log("Skip current card");
      practiceStarted.value = false;
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
      restartSession();
      router.push("/practice/flashcard");
    };
    const continueSession = () => {
      showExitWarning.value = false;
    };
    const confirmExit = () => {
      allowExit.value = true;
      showExitWarning.value = false;
      practiceStarted.value = false;
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
      removeNavigationGuard();
      router.push("/practice/flashcard");
    };
    let unregisterGuard = null;
    const setupNavigationGuard = () => {
      if (unregisterGuard) {
        unregisterGuard();
      }
      unregisterGuard = router.beforeEach((to, from, next) => {
        if (practiceStarted.value && !allowExit.value && from.path.includes("/practice/flashcard")) {
          showExitWarning.value = true;
          return false;
        }
        next();
      });
    };
    const removeNavigationGuard = () => {
      if (unregisterGuard) {
        unregisterGuard();
        unregisterGuard = null;
      }
    };
    const handleImageAnswer = () => {
      checkImageAnswer();
      recordAnswer(imageCorrect.value);
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleBeforeUnload = (event) => {
      if (practiceStarted.value && !allowExit.value) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    const {
      showHistory,
      practiceHistory,
      saveSessionToHistory,
      getModeColor,
      getModeText,
      formatDate,
      formatDuration,
      deleteSession
    } = useFlashcardHistory();
    const {
      currentIndex,
      isFlipped,
      practiceMode,
      showCompletionModal,
      settings,
      stats,
      flashcards,
      nextCard,
      flipCard,
      completeSession,
      restartSession,
      changePracticeMode,
      goBack,
      goToVocabulary,
      cleanup
    } = useFlashcardGame(baseFlashcards);
    watch(imageModeAvailable, (available) => {
      if (practiceMode.value === "image" && !available) {
        if (practiceStarted.value) {
          console.log("[Flashcard] Image mode became unavailable but practice is active; not switching mode.");
          return;
        }
        console.log("[Flashcard] Image mode unavailable for current filter; switching to flashcard mode.");
        changePracticeMode("flashcard");
      }
    }, { immediate: true });
    watch(pictionaryModeAvailable, (available) => {
      if (practiceMode.value === "pictionary" && !available) {
        if (practiceStarted.value) {
          console.log("[Flashcard] Pictionary mode became unavailable but practice is active; not switching mode.");
          return;
        }
        console.log("[Flashcard] Pictionary mode unavailable for current filter; switching to flashcard mode.");
        changePracticeMode("flashcard");
      }
    }, { immediate: true });
    const {
      initializeStats,
      recordAnswer
    } = useFlashcardStats(stats);
    const currentFlashcards = computed(() => {
      if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0) {
        return shuffledFlashcards.value;
      }
      return baseFlashcards.value;
    });
    const currentShuffledCard = computed(() => {
      if (currentFlashcards.value.length === 0) return null;
      return currentFlashcards.value[currentIndex.value];
    });
    const currentProgressPercentage = computed(() => {
      if (currentFlashcards.value.length === 0) return 0;
      if (typeof currentIndex.value !== "number" || isNaN(currentIndex.value)) return 0;
      if (currentIndex.value >= currentFlashcards.value.length) return 100;
      return (currentIndex.value + 1) / currentFlashcards.value.length * 100;
    });
    const shuffleEnabled = computed(() => flashcardSettings.value.shuffleCards);
    const shuffledFlashcards = ref([]);
    const shuffleFlashcards = (cards = baseFlashcards.value) => {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffledFlashcards.value = shuffled;
    };
    const {
      quizOptions,
      selectedAnswer,
      quizAnswered,
      generateQuizOptions,
      selectQuizAnswer,
      typingAnswer,
      typingAnswered,
      typingCorrect,
      checkTypingAnswer,
      // Typing-quiz
      typingQuizEnabled,
      typingQuizOptions,
      typingQuizSelected,
      typingQuizAnswered,
      generateTypingQuizOptions,
      selectTypingQuizAnswer,
      listeningAnswer,
      listeningAnswered,
      listeningCorrect,
      checkListeningAnswer,
      playAudio,
      imageAnswer,
      imageAnswered,
      imageCorrect,
      checkImageAnswer,
      resetImageMode,
      // Pictionary mode
      pictionaryAnswer,
      pictionaryAnswered,
      pictionaryCorrect,
      checkPictionaryAnswer,
      // Flip tile mode
      flipTileAnswer,
      flipTileAnswered,
      flipTileCorrect,
      checkFlipTileAnswer,
      imageQuizEnabled,
      imageQuizOptions,
      imageQuizSelected,
      imageQuizAnswered,
      generateImageQuizOptions,
      selectImageQuizAnswer,
      resetAllModes,
      getCanProceed,
      getShortMeaning,
      // Pronunciation mode
      isRecording,
      pronunciationResult,
      pronunciationAnswered,
      pronunciationCorrect,
      isSpeechRecognitionSupported,
      startRecording,
      listeningQuizEnabled,
      listeningQuizOptions,
      listeningQuizSelected,
      listeningQuizAnswered,
      generateListeningQuizOptions,
      selectListeningQuizAnswer
    } = useFlashcardModes(currentShuffledCard, currentFlashcards, allVocabularies);
    const cardStateStorage = ref({});
    const saveCurrentCardState = () => {
      if (!currentShuffledCard.value) return;
      const cardId = currentShuffledCard.value.id;
      cardStateStorage.value[cardId] = {
        // Quiz mode
        quizAnswer: selectedAnswer.value,
        quizAnswered: quizAnswered.value,
        quizOptions: quizOptions.value,
        // Typing mode
        typingAnswer: typingAnswer.value || void 0,
        typingAnswered: typingAnswered.value || void 0,
        typingCorrect: typingCorrect.value || void 0,
        // Typing-quiz
        typingQuizOptions: typingQuizOptions.value || void 0,
        typingQuizSelected: typingQuizSelected.value || void 0,
        typingQuizAnswered: typingQuizAnswered.value || void 0,
        // Listening mode
        listeningAnswer: listeningAnswer.value || void 0,
        listeningAnswered: listeningAnswered.value || void 0,
        listeningCorrect: listeningCorrect.value || void 0,
        // Listening-quiz
        listeningQuizOptions: listeningQuizOptions.value || void 0,
        listeningQuizSelected: listeningQuizSelected.value || void 0,
        listeningQuizAnswered: listeningQuizAnswered.value || void 0,
        // Image mode
        imageAnswer: imageAnswer.value || void 0,
        imageAnswered: imageAnswered.value || void 0,
        imageCorrect: imageCorrect.value || void 0,
        imageQuizOptions: imageQuizOptions.value && imageQuizOptions.value.length ? imageQuizOptions.value : void 0,
        imageQuizSelected: imageQuizSelected.value || void 0,
        imageQuizAnswered: imageQuizAnswered.value || void 0,
        // Pronunciation mode
        pronunciationResult: pronunciationResult.value || void 0,
        pronunciationAnswered: pronunciationAnswered.value || void 0,
        pronunciationCorrect: pronunciationCorrect.value || void 0,
        // Pictionary mode
        pictionaryAnswer: pictionaryAnswer.value || void 0,
        pictionaryAnswered: pictionaryAnswered.value || void 0,
        pictionaryCorrect: pictionaryCorrect.value || void 0,
        // Flip tile mode
        flipTileAnswer: flipTileAnswer.value || void 0,
        flipTileAnswered: flipTileAnswered.value || void 0,
        flipTileCorrect: flipTileCorrect.value || void 0
      };
    };
    const restoreCardState = () => {
      if (!currentShuffledCard.value) return;
      const cardId = currentShuffledCard.value.id;
      const savedState = cardStateStorage.value[cardId];
      if (savedState) {
        if (savedState.quizOptions) {
          quizOptions.value = savedState.quizOptions;
        }
        if (savedState.quizAnswer !== void 0) {
          selectedAnswer.value = savedState.quizAnswer;
        }
        if (savedState.quizAnswered !== void 0) {
          quizAnswered.value = savedState.quizAnswered;
        }
        if (savedState.typingAnswer !== void 0) {
          typingAnswer.value = savedState.typingAnswer;
        }
        if (savedState.typingAnswered !== void 0) {
          typingAnswered.value = savedState.typingAnswered;
        }
        if (savedState.typingCorrect !== void 0) {
          typingCorrect.value = savedState.typingCorrect;
        }
        if (savedState.typingQuizOptions !== void 0) {
          typingQuizOptions.value = savedState.typingQuizOptions;
        }
        if (savedState.typingQuizSelected !== void 0) {
          typingQuizSelected.value = savedState.typingQuizSelected;
        }
        if (savedState.typingQuizAnswered !== void 0) {
          typingQuizAnswered.value = savedState.typingQuizAnswered;
        }
        if (savedState.listeningAnswer !== void 0) {
          listeningAnswer.value = savedState.listeningAnswer;
        }
        if (savedState.listeningAnswered !== void 0) {
          listeningAnswered.value = savedState.listeningAnswered;
        }
        if (savedState.listeningCorrect !== void 0) {
          listeningCorrect.value = savedState.listeningCorrect;
        }
        if (savedState.listeningQuizOptions !== void 0) {
          listeningQuizOptions.value = savedState.listeningQuizOptions;
        }
        if (savedState.listeningQuizSelected !== void 0) {
          listeningQuizSelected.value = savedState.listeningQuizSelected;
        }
        if (savedState.listeningQuizAnswered !== void 0) {
          listeningQuizAnswered.value = savedState.listeningQuizAnswered;
        }
        if (savedState.imageAnswer !== void 0) {
          imageAnswer.value = savedState.imageAnswer;
        }
        if (savedState.imageAnswered !== void 0) {
          imageAnswered.value = savedState.imageAnswered;
        }
        if (savedState.imageCorrect !== void 0) {
          imageCorrect.value = savedState.imageCorrect;
        }
        if (savedState.imageQuizOptions !== void 0) {
          imageQuizOptions.value = savedState.imageQuizOptions;
        }
        if (savedState.imageQuizSelected !== void 0) {
          imageQuizSelected.value = savedState.imageQuizSelected;
        }
        if (savedState.imageQuizAnswered !== void 0) {
          imageQuizAnswered.value = savedState.imageQuizAnswered;
        }
        if (savedState.pronunciationResult !== void 0) {
          pronunciationResult.value = savedState.pronunciationResult;
        }
        if (savedState.pronunciationAnswered !== void 0) {
          pronunciationAnswered.value = savedState.pronunciationAnswered;
        }
        if (savedState.pronunciationCorrect !== void 0) {
          pronunciationCorrect.value = savedState.pronunciationCorrect;
        }
        if (savedState.pictionaryAnswer !== void 0) {
          pictionaryAnswer.value = savedState.pictionaryAnswer;
        }
        if (savedState.pictionaryAnswered !== void 0) {
          pictionaryAnswered.value = savedState.pictionaryAnswered;
        }
        if (savedState.pictionaryCorrect !== void 0) {
          pictionaryCorrect.value = savedState.pictionaryCorrect;
        }
        if (savedState.flipTileAnswer !== void 0) {
          flipTileAnswer.value = savedState.flipTileAnswer;
        }
        if (savedState.flipTileAnswered !== void 0) {
          flipTileAnswered.value = savedState.flipTileAnswered;
        }
        if (savedState.flipTileCorrect !== void 0) {
          flipTileCorrect.value = savedState.flipTileCorrect;
        }
      }
    };
    const handleQuizAnswer = (answer) => {
      const isCorrect = selectQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: getShortMeaning(currentShuffledCard.value.meaning),
          isCorrect: !!isCorrect,
          mode: "quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleTypingAnswer = () => {
      checkTypingAnswer();
      recordAnswer(typingCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: typingAnswer.value,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!typingCorrect.value,
          mode: "typing"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleTypingQuizAnswer = (answer) => {
      const isCorrect = selectTypingQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "typing-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleListeningAnswer = () => {
      checkListeningAnswer();
      recordAnswer(listeningCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: listeningAnswer.value,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!listeningCorrect.value,
          mode: "listening"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleListeningQuizAnswer = (answer) => {
      const isCorrect = selectListeningQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "listening-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const onToggleImageQuiz = (enabled) => {
      imageQuizEnabled.value = enabled;
      resetImageMode();
      if (enabled) {
        generateImageQuizOptions();
      }
    };
    const handleImageQuizAnswer = (answer) => {
      const isCorrect = selectImageQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "image-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleFlipTileAnswer = () => {
      checkFlipTileAnswer();
      recordAnswer(flipTileCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: flipTileAnswer.value || "",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!flipTileCorrect.value,
          mode: "flip-tile"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handlePictionaryAnswer = () => {
      checkPictionaryAnswer();
      recordAnswer(pictionaryCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: pictionaryAnswer.value || "",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!pictionaryCorrect.value,
          mode: "pictionary",
          extra: {
            pictionary: {
              image: currentShuffledCard.value.image,
              slots: latestPictionarySnapshot.value?.slots || []
            }
          }
        });
        latestPictionarySnapshot.value = null;
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleScrambleAnswer = (isCorrect) => {
      recordAnswer(isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: "scrambled",
          // User assembled the scrambled word
          correctAnswer: currentShuffledCard.value.word,
          isCorrect,
          mode: "scramble-words"
        });
      }
    };
    const handleBubbleShooterComplete = () => {
      recordAnswer(true);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: "completed",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: true,
          mode: "bubble-shooter"
        });
      }
      handleSessionComplete();
    };
    const handleWordsCrushCompleted = (isCorrect) => {
      recordAnswer(isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: isCorrect ? currentShuffledCard.value.word : "incomplete",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect,
          mode: "words-crush"
        });
      }
      pronunciationAnswered.value = true;
      pronunciationCorrect.value = isCorrect;
      const isSmallScreen = window.innerWidth < 768;
      if (isSmallScreen) {
        setTimeout(() => {
          nextCard();
        }, 2e3);
      }
    };
    const resetAndRestoreCard = () => {
      resetAllModes();
      restoreCardState();
      if (practiceMode.value === "quiz" && currentShuffledCard.value) {
        const cardId = currentShuffledCard.value.id;
        const savedState = cardStateStorage.value[cardId];
        if (!savedState || savedState.quizAnswer === void 0) {
          generateQuizOptions();
        }
      }
      if (practiceMode.value === "image" && imageQuizEnabled.value && currentShuffledCard.value) {
        if (!imageQuizOptions.value || imageQuizOptions.value.length === 0) {
          generateImageQuizOptions();
        }
      }
      if (practiceMode.value === "typing" && typingQuizEnabled.value && currentShuffledCard.value) {
        if (!typingQuizOptions.value || typingQuizOptions.value.length === 0) {
          generateTypingQuizOptions();
        }
      }
      if (practiceMode.value === "listening" && listeningQuizEnabled.value && currentShuffledCard.value) {
        if (!listeningQuizOptions.value || listeningQuizOptions.value.length === 0) {
          generateListeningQuizOptions();
        }
      }
    };
    const toggleShuffle = () => {
      flashcardSettings.value.shuffleCards = !flashcardSettings.value.shuffleCards;
      if (flashcardSettings.value.shuffleCards) {
        shuffleFlashcards();
      } else {
        shuffledFlashcards.value = [];
      }
      cardStateStorage.value = {};
      currentIndex.value = 0;
      resetAndRestoreCard();
    };
    const enhancedNextCard = () => {
      saveCurrentCardState();
      if (practiceMode.value === "pronunciation" && pronunciationAnswered.value) {
        recordAnswer(pronunciationCorrect.value);
        if (currentShuffledCard.value && activeSessionId.value) {
          appendAnswer({
            cardId: currentShuffledCard.value.id,
            word: currentShuffledCard.value.word,
            meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
            userAnswer: pronunciationResult.value,
            correctAnswer: currentShuffledCard.value.word,
            isCorrect: !!pronunciationCorrect.value,
            mode: "pronunciation"
          });
        }
      }
      if (currentIndex.value < currentFlashcards.value.length - 1) {
        currentIndex.value++;
        resetAndRestoreCard();
        if (practiceStarted.value && practiceTimerRef.value) {
          practiceTimerRef.value.nextCard();
        }
      } else {
        handleSessionComplete();
      }
    };
    const enhancedPreviousCard = () => {
      saveCurrentCardState();
      if (currentIndex.value > 0) {
        currentIndex.value--;
        resetAndRestoreCard();
        if (practiceStarted.value && practiceTimerRef.value) {
          practiceTimerRef.value.stopTimer();
        }
      }
    };
    const enhancedMarkEasy = () => {
      recordAnswer(true);
      enhancedNextCard();
    };
    const enhancedMarkDifficult = () => {
      recordAnswer(false);
      enhancedNextCard();
    };
    const handleSessionComplete = () => {
      completeSession();
      const totalCards = currentFlashcards.value.length;
      const id = saveSessionToHistory(stats.value, totalCards, activeSessionId.value || void 0);
      if (!activeSessionId.value) {
        activeSessionId.value = id;
      }
    };
    const handleRestartSession = () => {
      restartSession();
      practiceStarted.value = false;
      cardStateStorage.value = {};
      modalStore.setCompletionModal(false);
      if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
        shuffleFlashcards();
      }
      resetAndRestoreCard();
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
    };
    const handleCompletionGoBack = () => {
      modalStore.setCompletionModal(false);
      goBack();
    };
    const handleSnakeGameComplete = () => {
      const expectedCorrect = currentFlashcards.value.length;
      const actualCorrect = stats.value.correct;
      if (actualCorrect < expectedCorrect) {
        recordAnswer(true);
      }
      handleSessionComplete();
    };
    const handleSnakeCorrectFoodEaten = (details) => {
      console.log("[DEBUG] Snake correct food eaten, recording answer true");
      console.log("[DEBUG] Stats before:", { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total });
      recordAnswer(true);
      console.log("[DEBUG] Stats after:", { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total });
      if (details && activeSessionId.value) {
        console.log("[DEBUG] FlashcardView - Recording snake correct food:", details);
        console.log("[DEBUG] FlashcardView - Snake body to save:", details.snakeBody);
        console.log("[DEBUG] FlashcardView - Snake direction to save:", details.direction);
        appendAnswer({
          cardId: Date.now(),
          // Unique numeric ID for snake game food eaten
          word: details.word,
          meaningShort: details.meaningShort,
          userAnswer: details.word,
          // Correct food eaten
          correctAnswer: details.word,
          isCorrect: true,
          mode: "snake-game",
          extra: {
            snakeGame: {
              position: details.position,
              wasCorrect: true,
              foodType: "primary",
              // Correct food is always primary target
              snakeLength: details.snakeLength,
              gameScore: details.gameScore,
              wordsCompleted: details.wordsCompleted,
              wrongEatenCount: details.wrongEatenCount,
              snakeBody: details.snakeBody,
              direction: details.direction,
              timelineFrames: details.timelineFrames
            }
          }
        });
      }
    };
    const handleSnakeWrongFoodEaten = (details) => {
      recordAnswer(false);
      if (details && activeSessionId.value) {
        appendAnswer({
          cardId: Date.now(),
          // Unique numeric ID for snake game food eaten
          word: details.word,
          meaningShort: details.meaningShort,
          userAnswer: details.word,
          // Wrong food eaten
          correctAnswer: "",
          // No specific correct answer for wrong food
          isCorrect: false,
          mode: "snake-game",
          extra: {
            snakeGame: {
              position: details.position,
              wasCorrect: false,
              foodType: "secondary",
              // Wrong food is secondary/decoy
              snakeLength: details.snakeLength,
              gameScore: details.gameScore,
              wordsCompleted: details.wordsCompleted,
              wrongEatenCount: details.wrongEatenCount,
              snakeBody: details.snakeBody,
              direction: details.direction,
              timelineFrames: details.timelineFrames
            }
          }
        });
      }
    };
    let autoFlipTimer = null;
    watch([currentIndex, isFlipped], () => {
      if (autoFlipTimer) {
        clearTimeout(autoFlipTimer);
      }
      if (flashcardSettings.value.autoFlip && !isFlipped.value) {
        autoFlipTimer = setTimeout(() => {
          isFlipped.value = true;
        }, 3e3);
      }
    });
    watch(practiceMode, () => {
      resetAndRestoreCard();
      if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length === 0) {
        shuffleFlashcards();
      }
    });
    watch(showCompletionModal, (newValue) => {
      if (newValue) {
        if (practiceTimerRef.value) {
          practiceTimerRef.value.stopTimer();
        }
        modalStore.setCompletionModal(true);
      } else {
        modalStore.setCompletionModal(false);
      }
    });
    watch(showHistory, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showSessionDetail, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showSettingsDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(dateFilterEnabled, () => {
      saveDateFilterState();
    });
    watch(selectedDate, () => {
      saveDateFilterState();
    });
    watch(baseFlashcards, (newCards) => {
      if (flashcardSettings.value.shuffleCards && newCards.length > 0) {
        shuffleFlashcards(newCards);
        currentIndex.value = 0;
        resetAndRestoreCard();
      } else if (flashcardSettings.value.shuffleCards && newCards.length === 0) {
        shuffledFlashcards.value = [];
        currentIndex.value = 0;
      }
    }, { immediate: false });
    const handleFlipTileHintsToggle = (enabled) => {
      flashcardSettings.value.useFlipTileHints = enabled;
    };
    onMounted(() => {
      console.log("FlashcardView mounted");
      initializeStats(currentFlashcards.value.length);
      if (practiceMode.value === "quiz") {
        generateQuizOptions();
      }
      if (flashcardSettings.value.shuffleCards) {
        shuffleFlashcards();
      }
      setupNavigationGuard();
      window.addEventListener("beforeunload", handleBeforeUnload);
    });
    onUnmounted(() => {
      document.body.classList.remove("modal-open");
      cleanup();
      removeNavigationGuard();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });
    return (_ctx, _cache) => {
      const _component_FlashcardHeader = resolveComponent("FlashcardHeader");
      const _component_FlashcardProgress = resolveComponent("FlashcardProgress");
      const _component_LazyLoadComponent = resolveComponent("LazyLoadComponent");
      const _component_VoiceSelector = resolveComponent("VoiceSelector");
      const _component_FlashcardDateFilter = resolveComponent("FlashcardDateFilter");
      const _component_PracticeTimer = resolveComponent("PracticeTimer");
      const _component_FlashcardCard = resolveComponent("FlashcardCard");
      const _component_PictionaryMode = resolveComponent("PictionaryMode");
      const _component_FlashcardQuiz = resolveComponent("FlashcardQuiz");
      const _component_FlashcardTyping = resolveComponent("FlashcardTyping");
      const _component_FlashcardImage = resolveComponent("FlashcardImage");
      const _component_ListeningMode = resolveComponent("ListeningMode");
      const _component_PronunciationMode = resolveComponent("PronunciationMode");
      const _component_BubbleShooterMode = resolveComponent("BubbleShooterMode");
      const _component_SnakeGameMode = resolveComponent("SnakeGameMode");
      const _component_FlipTileMode = resolveComponent("FlipTileMode");
      const _component_FlashcardControls = resolveComponent("FlashcardControls");
      const _component_PracticeStats = resolveComponent("PracticeStats");
      const _component_FlashcardEmptyState = resolveComponent("FlashcardEmptyState");
      const _component_SettingsModal = resolveComponent("SettingsModal");
      const _component_HistoryModal = resolveComponent("HistoryModal");
      const _component_SessionDetailModal = resolveComponent("SessionDetailModal");
      const _component_CompletionModal = resolveComponent("CompletionModal");
      const _component_ExitWarningModal = resolveComponent("ExitWarningModal");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[24] || (_cache[24] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-b1cf9130><div class="floating-shapes" data-v-b1cf9130><div class="absolute top-24 left-8 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-b1cf9130></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-b1cf9130></div><div class="absolute -bottom-10 left-24 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-b1cf9130></div></div></div>', 1)),
        createVNode(_component_FlashcardHeader, {
          "current-index": unref(currentIndex),
          "total-cards": currentFlashcards.value.length,
          "practice-mode": unref(practiceMode),
          "shuffle-enabled": shuffleEnabled.value,
          "practice-started": practiceStarted.value,
          "image-quiz-enabled": unref(imageQuizEnabled),
          "listening-quiz-enabled": unref(listeningQuizEnabled),
          "typing-quiz-enabled": unref(typingQuizEnabled),
          "image-mode-available": imageModeAvailable.value,
          "pictionary-mode-available": pictionaryModeAvailable.value,
          "flip-tile-mode-available": flipTileModeAvailable.value,
          "bubble-shooter-mode-available": bubbleShooterModeAvailable.value,
          "bubble-shooter-vietnamese-mode": bubbleShooterVietnameseMode.value,
          "snake-double-bait-enabled": snakeDoubleBaitMode.value,
          "pictionary-definition-mode": pictionaryDefinitionMode.value,
          "scramble-words-enabled": scrambleWordsEnabled.value,
          "words-crush-enabled": wordsCrushEnabled.value,
          "use-flip-tile-hints": unref(flashcardSettings).useFlipTileHints,
          onGoBack: unref(goBack),
          onShowHistory: _cache[0] || (_cache[0] = ($event) => showHistory.value = true),
          onChangePracticeMode: _cache[1] || (_cache[1] = ($event) => unref(changePracticeMode)($event)),
          onShowSettings: _cache[2] || (_cache[2] = ($event) => showSettingsDialog.value = true),
          onToggleShuffle: toggleShuffle,
          "onUpdate:imageQuizEnabled": _cache[3] || (_cache[3] = ($event) => imageQuizEnabled.value = $event),
          "onUpdate:listeningQuizEnabled": _cache[4] || (_cache[4] = ($event) => listeningQuizEnabled.value = $event),
          "onUpdate:typingQuizEnabled": _cache[5] || (_cache[5] = ($event) => typingQuizEnabled.value = $event),
          "onUpdate:bubbleShooterVietnameseMode": _cache[6] || (_cache[6] = ($event) => bubbleShooterVietnameseMode.value = $event),
          "onUpdate:snakeDoubleBaitEnabled": _cache[7] || (_cache[7] = ($event) => snakeDoubleBaitMode.value = $event),
          "onUpdate:pictionaryDefinitionMode": _cache[8] || (_cache[8] = ($event) => pictionaryDefinitionMode.value = $event),
          "onUpdate:scrambleWordsEnabled": _cache[9] || (_cache[9] = ($event) => scrambleWordsEnabled.value = $event),
          "onUpdate:wordsCrushEnabled": _cache[10] || (_cache[10] = ($event) => wordsCrushEnabled.value = $event),
          "onUpdate:useFlipTileHints": handleFlipTileHintsToggle
        }, null, 8, ["current-index", "total-cards", "practice-mode", "shuffle-enabled", "practice-started", "image-quiz-enabled", "listening-quiz-enabled", "typing-quiz-enabled", "image-mode-available", "pictionary-mode-available", "flip-tile-mode-available", "bubble-shooter-mode-available", "bubble-shooter-vietnamese-mode", "snake-double-bait-enabled", "pictionary-definition-mode", "scramble-words-enabled", "words-crush-enabled", "use-flip-tile-hints", "onGoBack"]),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "slide-left",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createVNode(_component_FlashcardProgress, { "progress-percentage": currentProgressPercentage.value }, null, 8, ["progress-percentage"])
          ]),
          _: 1
        }),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "scale",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_VoiceSelector, { "show-voice-info": false })
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "slide-right",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_FlashcardDateFilter, {
                  vocabularies: unref(allVocabularies),
                  selectedDate: selectedDate.value,
                  "practice-started": practiceStarted.value,
                  "onUpdate:selectedDate": _cache[11] || (_cache[11] = ($event) => selectedDate.value = $event)
                }, null, 8, ["vocabularies", "selectedDate", "practice-started"])
              ])
            ])
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_6, [
          currentFlashcards.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createVNode(_component_LazyLoadComponent, {
                  "animation-type": "fade-up",
                  threshold: 0.1,
                  "root-margin": "-50px"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_10, [
                      unref(practiceMode) === "bubble-shooter" || unref(practiceMode) === "snake-game" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        !practiceStarted.value ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: handlePracticeStart,
                          class: "px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        }, toDisplayString(unref(t)("practice.startGame", "Start Game")), 1)) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock(_component_PracticeTimer, {
                        key: 1,
                        ref_key: "practiceTimerRef",
                        ref: practiceTimerRef,
                        "max-time": 30,
                        onStart: handlePracticeStart,
                        onTimeout: handleTimeout,
                        onRestart: handleTimerRestart,
                        onSkip: handleSkip
                      }, null, 512))
                    ])
                  ]),
                  _: 1
                }),
                practiceStarted.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "scale",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      unref(practiceMode) === "flashcard" ? (openBlock(), createBlock(_component_FlashcardCard, {
                        key: 0,
                        "current-card": currentShuffledCard.value,
                        "is-flipped": unref(isFlipped),
                        "scramble-words-enabled": scrambleWordsEnabled.value,
                        "current-index": unref(currentIndex),
                        "total-cards": currentFlashcards.value.length,
                        onFlipCard: unref(flipCard),
                        onNextCard: enhancedNextCard,
                        onShowResults: unref(completeSession),
                        onScrambleAnswer: handleScrambleAnswer
                      }, null, 8, ["current-card", "is-flipped", "scramble-words-enabled", "current-index", "total-cards", "onFlipCard", "onShowResults"])) : unref(practiceMode) === "pictionary" ? (openBlock(), createBlock(_component_PictionaryMode, {
                        key: 1,
                        card: currentShuffledCard.value,
                        "pictionary-answer": unref(pictionaryAnswer),
                        "pictionary-answered": unref(pictionaryAnswered),
                        "pictionary-correct": unref(pictionaryCorrect),
                        "definition-mode": pictionaryDefinitionMode.value,
                        "get-topic-name": unref(getTopicName),
                        "onUpdate:pictionaryAnswer": _cache[12] || (_cache[12] = ($event) => pictionaryAnswer.value = $event),
                        onCheckAnswer: handlePictionaryAnswer,
                        onPictionarySnapshot
                      }, null, 8, ["card", "pictionary-answer", "pictionary-answered", "pictionary-correct", "definition-mode", "get-topic-name"])) : unref(practiceMode) === "quiz" ? (openBlock(), createBlock(_component_FlashcardQuiz, {
                        key: 2,
                        "current-card": currentShuffledCard.value,
                        "quiz-options": unref(quizOptions),
                        "selected-answer": unref(selectedAnswer),
                        "quiz-answered": unref(quizAnswered),
                        onSelectAnswer: handleQuizAnswer
                      }, null, 8, ["current-card", "quiz-options", "selected-answer", "quiz-answered"])) : unref(practiceMode) === "typing" ? (openBlock(), createBlock(_component_FlashcardTyping, {
                        key: 3,
                        "current-card": currentShuffledCard.value,
                        "typing-answer": unref(typingAnswer),
                        "typing-answered": unref(typingAnswered),
                        "typing-correct": unref(typingCorrect),
                        "typing-quiz-enabled": unref(typingQuizEnabled),
                        "typing-quiz-options": unref(typingQuizOptions),
                        "typing-quiz-selected": unref(typingQuizSelected),
                        "typing-quiz-answered": unref(typingQuizAnswered),
                        "onUpdate:typingAnswer": _cache[13] || (_cache[13] = ($event) => typingAnswer.value = $event),
                        onCheckAnswer: handleTypingAnswer,
                        onSelectTypingQuizAnswer: _cache[14] || (_cache[14] = ($event) => handleTypingQuizAnswer($event))
                      }, null, 8, ["current-card", "typing-answer", "typing-answered", "typing-correct", "typing-quiz-enabled", "typing-quiz-options", "typing-quiz-selected", "typing-quiz-answered"])) : unref(practiceMode) === "image" ? (openBlock(), createBlock(_component_FlashcardImage, {
                        key: 4,
                        "current-card": currentShuffledCard.value,
                        "image-answer": unref(imageAnswer),
                        "image-answered": unref(imageAnswered),
                        "image-correct": unref(imageCorrect),
                        "image-quiz-enabled": unref(imageQuizEnabled),
                        "image-quiz-options": unref(imageQuizOptions),
                        "image-quiz-selected": unref(imageQuizSelected),
                        "image-quiz-answered": unref(imageQuizAnswered),
                        "onUpdate:imageAnswer": _cache[15] || (_cache[15] = ($event) => imageAnswer.value = $event),
                        onCheckAnswer: handleImageAnswer,
                        "onUpdate:imageQuizEnabled": _cache[16] || (_cache[16] = ($event) => onToggleImageQuiz($event)),
                        onSelectImageQuizAnswer: _cache[17] || (_cache[17] = ($event) => handleImageQuizAnswer($event))
                      }, null, 8, ["current-card", "image-answer", "image-answered", "image-correct", "image-quiz-enabled", "image-quiz-options", "image-quiz-selected", "image-quiz-answered"])) : unref(practiceMode) === "listening" ? (openBlock(), createBlock(_component_ListeningMode, {
                        key: 5,
                        card: currentShuffledCard.value,
                        "listening-answer": unref(listeningAnswer),
                        "onUpdate:listeningAnswer": _cache[18] || (_cache[18] = ($event) => listeningAnswer.value = $event),
                        "listening-answered": unref(listeningAnswered),
                        "listening-correct": unref(listeningCorrect),
                        "listening-quiz-enabled": unref(listeningQuizEnabled),
                        "listening-quiz-options": unref(listeningQuizOptions),
                        "listening-quiz-selected": unref(listeningQuizSelected),
                        "listening-quiz-answered": unref(listeningQuizAnswered),
                        "get-topic-name": unref(getTopicName),
                        onCheckAnswer: handleListeningAnswer,
                        onPlayAudio: unref(playAudio),
                        onSelectListeningQuizAnswer: _cache[19] || (_cache[19] = ($event) => handleListeningQuizAnswer($event))
                      }, null, 8, ["card", "listening-answer", "listening-answered", "listening-correct", "listening-quiz-enabled", "listening-quiz-options", "listening-quiz-selected", "listening-quiz-answered", "get-topic-name", "onPlayAudio"])) : unref(practiceMode) === "pronunciation" ? (openBlock(), createBlock(_component_PronunciationMode, {
                        key: 6,
                        card: currentShuffledCard.value,
                        "is-recording": unref(isRecording),
                        "pronunciation-result": unref(pronunciationResult),
                        "pronunciation-answered": unref(pronunciationAnswered),
                        "pronunciation-correct": unref(pronunciationCorrect),
                        "is-speech-recognition-supported": unref(isSpeechRecognitionSupported),
                        "get-topic-name": unref(getTopicName),
                        "words-crush-enabled": wordsCrushEnabled.value,
                        onStartRecording: unref(startRecording),
                        onGameCompleted: handleWordsCrushCompleted,
                        onPlayAudio: unref(playAudio)
                      }, null, 8, ["card", "is-recording", "pronunciation-result", "pronunciation-answered", "pronunciation-correct", "is-speech-recognition-supported", "get-topic-name", "words-crush-enabled", "onStartRecording", "onPlayAudio"])) : unref(practiceMode) === "bubble-shooter" ? (openBlock(), createBlock(_component_BubbleShooterMode, {
                        key: 7,
                        words: currentFlashcards.value,
                        "vietnamese-mode": bubbleShooterVietnameseMode.value,
                        onGameComplete: handleBubbleShooterComplete
                      }, null, 8, ["words", "vietnamese-mode"])) : unref(practiceMode) === "snake-game" ? (openBlock(), createBlock(_component_SnakeGameMode, {
                        key: 8,
                        words: currentFlashcards.value,
                        "vietnamese-mode": bubbleShooterVietnameseMode.value,
                        "double-bait-mode": snakeDoubleBaitMode.value,
                        "record-timeline": true,
                        onGameComplete: handleSnakeGameComplete,
                        onCorrectFoodEaten: handleSnakeCorrectFoodEaten,
                        onWrongFoodEaten: handleSnakeWrongFoodEaten
                      }, null, 8, ["words", "vietnamese-mode", "double-bait-mode"])) : unref(practiceMode) === "flip-tile" ? (openBlock(), createBlock(_component_FlipTileMode, {
                        key: 9,
                        card: currentShuffledCard.value,
                        "flip-tile-answer": unref(flipTileAnswer),
                        "flip-tile-answered": unref(flipTileAnswered),
                        "flip-tile-correct": unref(flipTileCorrect),
                        "get-topic-name": unref(getTopicName),
                        "use-hints": unref(flashcardSettings).useFlipTileHints,
                        "onUpdate:flipTileAnswer": _cache[20] || (_cache[20] = ($event) => flipTileAnswer.value = $event),
                        onCheckAnswer: handleFlipTileAnswer
                      }, null, 8, ["card", "flip-tile-answer", "flip-tile-answered", "flip-tile-correct", "get-topic-name", "use-hints"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "slide-left",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_FlashcardControls, {
                        "practice-mode": unref(practiceMode),
                        "current-index": unref(currentIndex),
                        "total-cards": currentFlashcards.value.length,
                        "can-proceed": unref(getCanProceed)()[unref(practiceMode)],
                        "practice-started": practiceStarted.value,
                        "scramble-words-enabled": scrambleWordsEnabled.value,
                        "typing-answer": unref(typingAnswer),
                        "typing-answered": unref(typingAnswered),
                        "listening-answer": unref(listeningAnswer),
                        "listening-answered": unref(listeningAnswered),
                        "image-answer": unref(imageAnswer),
                        "image-answered": unref(imageAnswered),
                        onMarkDifficult: enhancedMarkDifficult,
                        onMarkEasy: enhancedMarkEasy,
                        onPreviousCard: enhancedPreviousCard,
                        onNextCard: enhancedNextCard,
                        onCheckTypingAnswer: handleTypingAnswer,
                        onCheckListeningAnswer: handleListeningAnswer,
                        onCheckImageAnswer: handleImageAnswer,
                        onExitPractice: handleExitPractice
                      }, null, 8, ["practice-mode", "current-index", "total-cards", "can-proceed", "practice-started", "scramble-words-enabled", "typing-answer", "typing-answered", "listening-answer", "listening-answered", "image-answer", "image-answered"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "scale",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_PracticeStats, {
                        stats: unref(stats),
                        mode: unref(practiceMode)
                      }, null, 8, ["stats", "mode"])
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ])
            ])
          ])) : createCommentVNode("", true),
          createVNode(_component_LazyLoadComponent, {
            "animation-type": "fade-up",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              currentFlashcards.value.length === 0 ? (openBlock(), createBlock(_component_FlashcardEmptyState, {
                key: 0,
                onGoToVocabulary: unref(goToVocabulary)
              }, null, 8, ["onGoToVocabulary"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        createVNode(_component_SettingsModal, {
          show: unref(showSettingsDialog),
          settings: unref(settings),
          "local-settings": unref(localSettings),
          "date-filter-enabled": dateFilterEnabled.value,
          "selected-date": selectedDate.value,
          "onUpdate:localSettings": _cache[21] || (_cache[21] = ($event) => localSettings.value = $event),
          onCancel: unref(cancelSettings),
          onApply: unref(applyGameSettings)
        }, null, 8, ["show", "settings", "local-settings", "date-filter-enabled", "selected-date", "onCancel", "onApply"]),
        createVNode(_component_HistoryModal, {
          show: unref(showHistory),
          history: unref(practiceHistory),
          "get-mode-color": unref(getModeColor),
          "get-mode-text": unref(getModeText),
          "format-date": unref(formatDate),
          "format-duration": unref(formatDuration),
          onClose: _cache[22] || (_cache[22] = ($event) => showHistory.value = false),
          onOpenDetails: openHistoryDetails,
          onDeleteSession: handleDeleteSession
        }, null, 8, ["show", "history", "get-mode-color", "get-mode-text", "format-date", "format-duration"]),
        createVNode(_component_SessionDetailModal, {
          show: showSessionDetail.value,
          details: selectedSessionDetails.value,
          onClose: _cache[23] || (_cache[23] = ($event) => showSessionDetail.value = false)
        }, null, 8, ["show", "details"]),
        createVNode(_component_CompletionModal, {
          show: unref(showCompletionModal),
          stats: unref(stats),
          "card-count": unref(flashcards).length,
          onRestart: handleRestartSession,
          onGoBack: handleCompletionGoBack
        }, null, 8, ["show", "stats", "card-count"]),
        createVNode(_component_ExitWarningModal, {
          show: showExitWarning.value,
          onContinue: continueSession,
          onConfirm: confirmExit
        }, null, 8, ["show"])
      ]);
    };
  }
});
const FlashcardView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1cf9130"]]);
export {
  FlashcardView as default
};
//# sourceMappingURL=FlashcardView-CGFJt75s.js.map
