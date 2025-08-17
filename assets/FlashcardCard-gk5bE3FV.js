const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-C-V76uop.js","assets/vendor-DMqe9Z5T.js","assets/index-BE8-4tPx.js","assets/vendor-toast-C02QcIAu.js","assets/vendor-toast-jG2HNJHr.css","assets/index-CW204AHq.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload, e as useVoiceStore, a as _export_sfc } from "./index-BE8-4tPx.js";
import { d as defineComponent, H as useI18n, A as ref, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, e as createCommentVNode, j as renderList, C as withDirectives, E as vShow, i as withModifiers, n as normalizeClass, D as defineAsyncComponent, q as nextTick } from "./vendor-DMqe9Z5T.js";
import "./vendor-toast-C02QcIAu.js";
const _hoisted_1 = { class: "perspective-1000" };
const _hoisted_2 = { class: "flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8" };
const _hoisted_3 = { class: "text-center" };
const _hoisted_4 = { class: "mb-3 sm:mb-4 md:mb-5" };
const _hoisted_5 = { class: "px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full" };
const _hoisted_6 = { class: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5" };
const _hoisted_7 = { class: "text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6" };
const _hoisted_8 = { class: "text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400" };
const _hoisted_9 = { class: "text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4" };
const _hoisted_10 = { class: "text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6" };
const _hoisted_11 = { class: "mb-4 sm:mb-5 md:mb-6" };
const _hoisted_12 = { class: "flex flex-wrap md:flex-nowrap justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 min-h-[3rem] max-w-full px-2 sm:px-0" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = {
  key: 0,
  class: "text-center"
};
const _hoisted_15 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base"
};
const _hoisted_16 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-semibold text-sm sm:text-base"
};
const _hoisted_17 = { class: "flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0 max-w-full" };
const _hoisted_18 = ["onClick", "disabled"];
const _hoisted_19 = { class: "flex justify-center gap-2 sm:gap-3 md:gap-4" };
const _hoisted_20 = ["disabled", "title"];
const _hoisted_21 = { class: "hidden sm:inline" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = ["disabled"];
const _hoisted_24 = { class: "flashcard-face flashcard-back absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8" };
const _hoisted_25 = { class: "text-center text-white" };
const _hoisted_26 = { class: "text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5" };
const _hoisted_27 = {
  key: 0,
  class: "text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5"
};
const _hoisted_28 = {
  key: 1,
  class: "text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 leading-relaxed"
};
const _hoisted_29 = { class: "text-xs sm:text-sm md:text-base opacity-75" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardCard",
  props: {
    currentCard: {},
    isFlipped: { type: Boolean },
    scrambleWordsEnabled: { type: Boolean },
    currentIndex: {},
    totalCards: {}
  },
  emits: ["flip-card", "next-card", "show-results"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-C-V76uop.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    const { playAudio } = useVoiceStore();
    let autoAdvanceTimer = null;
    const clearAutoAdvanceTimer = () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
    };
    const isSmallScreen = ref(false);
    const updateScreenSize = () => {
      if (typeof window !== "undefined") {
        isSmallScreen.value = window.innerWidth < 768;
      }
    };
    if (typeof window !== "undefined") {
      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
    }
    const assembledWord = ref([]);
    const availableLetters = ref([]);
    const scrambleAnswered = ref(false);
    const scrambleCorrect = ref(false);
    const initializeScrambledLetters = () => {
      if (!props.currentCard || !props.scrambleWordsEnabled) return;
      const word = props.currentCard.word.toLowerCase();
      const letters = word.split("");
      const letterObjects = letters.map((char, index) => ({
        char: char.toUpperCase(),
        used: false,
        originalIndex: index
      }));
      for (let i = letterObjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letterObjects[i], letterObjects[j]] = [letterObjects[j], letterObjects[i]];
      }
      availableLetters.value = letterObjects;
      assembledWord.value = [];
      scrambleAnswered.value = false;
      scrambleCorrect.value = false;
    };
    watch(() => props.currentCard, () => {
      clearAutoAdvanceTimer();
      if (props.scrambleWordsEnabled) {
        initializeScrambledLetters();
      }
    }, { immediate: true });
    watch(() => props.scrambleWordsEnabled, (enabled) => {
      clearAutoAdvanceTimer();
      if (enabled) {
        initializeScrambledLetters();
      } else {
        assembledWord.value = [];
        availableLetters.value = [];
        scrambleAnswered.value = false;
        scrambleCorrect.value = false;
      }
    });
    const selectLetter = (index) => {
      if (availableLetters.value[index].used) return;
      if (scrambleAnswered.value && scrambleCorrect.value) return;
      assembledWord.value.push(availableLetters.value[index].char);
      availableLetters.value[index].used = true;
      scrambleAnswered.value = false;
      scrambleCorrect.value = false;
    };
    const removeLetter = (assembledIndex) => {
      if (scrambleAnswered.value && scrambleCorrect.value) return;
      const removedChar = assembledWord.value[assembledIndex];
      assembledWord.value.splice(assembledIndex, 1);
      const availableIndex = availableLetters.value.findIndex(
        (letter) => letter.char === removedChar && letter.used
      );
      if (availableIndex !== -1) {
        availableLetters.value[availableIndex].used = false;
      }
      scrambleAnswered.value = false;
      scrambleCorrect.value = false;
    };
    const clearAssembledWord = () => {
      if (scrambleAnswered.value && scrambleCorrect.value) return;
      availableLetters.value.forEach((letter) => {
        letter.used = false;
      });
      assembledWord.value = [];
      scrambleAnswered.value = false;
      scrambleCorrect.value = false;
    };
    const backspaceAssembledWord = () => {
      if (scrambleAnswered.value && scrambleCorrect.value) return;
      if (assembledWord.value.length === 0) return;
      const removedChar = assembledWord.value.pop();
      const availableIndex = availableLetters.value.findIndex(
        (letter) => letter.char === removedChar && letter.used
      );
      if (availableIndex !== -1) {
        availableLetters.value[availableIndex].used = false;
      }
      scrambleAnswered.value = false;
      scrambleCorrect.value = false;
    };
    const checkScrambleAnswer = async () => {
      if (assembledWord.value.length !== props.currentCard.word.length) return;
      const userAnswer = assembledWord.value.join("").toLowerCase();
      const correctAnswer = props.currentCard.word.toLowerCase();
      scrambleAnswered.value = true;
      scrambleCorrect.value = userAnswer === correctAnswer;
      clearAutoAdvanceTimer();
      const isLastCard = props.currentIndex !== void 0 && props.totalCards !== void 0 && props.currentIndex + 1 >= props.totalCards;
      console.log("Scramble Check Debug:", {
        currentIndex: props.currentIndex,
        totalCards: props.totalCards,
        isLastCard,
        isSmallScreen: isSmallScreen.value,
        scrambleCorrect: scrambleCorrect.value
      });
      if (scrambleCorrect.value) {
        isCorrectAnswer.value = true;
        triggerFirework.value = true;
        triggerSound.value = true;
        try {
          await nextTick();
          await playAudio(props.currentCard.word);
        } catch (error) {
          console.warn("Voice playbook error:", error);
        }
        if (isSmallScreen.value) {
          console.log("Setting timer for correct answer:", isLastCard ? "show-results" : "next-card");
          autoAdvanceTimer = setTimeout(() => {
            console.log("Timer executed, emitting:", isLastCard ? "show-results" : "next-card");
            if (isLastCard) {
              emit("show-results");
            } else {
              emit("next-card");
            }
          }, 2500);
        }
      } else {
        isCorrectAnswer.value = false;
        triggerFirework.value = true;
        triggerSound.value = true;
        if (isSmallScreen.value) {
          console.log("Setting timer for incorrect answer:", isLastCard ? "show-results" : "next-card");
          autoAdvanceTimer = setTimeout(() => {
            console.log("Timer executed for incorrect, emitting:", isLastCard ? "show-results" : "next-card");
            if (isLastCard) {
              emit("show-results");
            } else {
              emit("next-card");
            }
          }, 2500);
        }
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass([["flashcard", { "flipped": _ctx.isFlipped }], "relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem] select-none"]),
          onClick: _cache[0] || (_cache[0] = ($event) => !_ctx.scrambleWordsEnabled && _ctx.$emit("flip-card")),
          onCopy: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["prevent"])),
          onCut: _cache[2] || (_cache[2] = withModifiers(() => {
          }, ["prevent"])),
          onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["prevent"]))
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("span", _hoisted_5, toDisplayString(unref(getTopicName)(_ctx.currentCard.category)), 1)
              ]),
              !_ctx.scrambleWordsEnabled ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.currentCard.word), 1),
                createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.currentCard.pronunciation), 1),
                createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("flashcard.card.flip_to_meaning", "Click to see meaning")), 1)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("h3", _hoisted_9, toDisplayString(unref(t)("flashcard.scrambleWords.instruction", "Arrange the letters to form the word")), 1),
                createBaseVNode("p", _hoisted_10, toDisplayString(_ctx.currentCard.pronunciation), 1),
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("div", _hoisted_12, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(assembledWord.value, (letter, index) => {
                      return openBlock(), createElementBlock("div", {
                        key: `assembled-${index}`,
                        class: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-300 dark:border-dark-bg-mute rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#0f0f0f] text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-[#1a1a1a] transition-colors",
                        onClick: ($event) => removeLetter(index)
                      }, toDisplayString(letter), 9, _hoisted_13);
                    }), 128)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(Math.max(0, _ctx.currentCard.word.length - assembledWord.value.length), (n) => {
                      return openBlock(), createElementBlock("div", {
                        key: `empty-${n}`,
                        class: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-dashed border-gray-300 dark:border-dark-bg-mute rounded-lg bg-gray-50 dark:bg-[#0f0f0f]"
                      });
                    }), 128))
                  ]),
                  scrambleAnswered.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
                    scrambleCorrect.value ? (openBlock(), createElementBlock("p", _hoisted_15, " ✅ " + toDisplayString(unref(t)("flashcard.scrambleWords.correct", "Correct!")), 1)) : (openBlock(), createElementBlock("p", _hoisted_16, " ❌ " + toDisplayString(unref(t)("flashcard.scrambleWords.incorrect", "Try again!")), 1))
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_17, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(availableLetters.value, (letter, index) => {
                    return withDirectives((openBlock(), createElementBlock("button", {
                      key: `scrambled-${index}`,
                      class: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-400 dark:border-dark-bg-soft rounded-lg flex items-center justify-center bg-white dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
                      onClick: ($event) => selectLetter(index),
                      disabled: scrambleAnswered.value && scrambleCorrect.value
                    }, toDisplayString(letter.char), 9, _hoisted_18)), [
                      [vShow, !letter.used]
                    ]);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("button", {
                    onClick: backspaceAssembledWord,
                    class: "px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-1 sm:gap-2",
                    disabled: assembledWord.value.length === 0 || scrambleAnswered.value && scrambleCorrect.value,
                    title: unref(t)("flashcard.scrambleWords.backspace", "Backspace")
                  }, [
                    _cache[4] || (_cache[4] = createBaseVNode("svg", {
                      class: "w-3 h-3 sm:w-4 sm:h-4",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 3.707a1 1 0 00-1.414-1.414L8 8.586 6.707 7.293a1 1 0 10-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)),
                    createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("flashcard.scrambleWords.backspace", "Backspace")), 1)
                  ], 8, _hoisted_20),
                  createBaseVNode("button", {
                    onClick: clearAssembledWord,
                    class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors",
                    disabled: assembledWord.value.length === 0 || scrambleAnswered.value && scrambleCorrect.value
                  }, toDisplayString(unref(t)("flashcard.scrambleWords.clear", "Clear")), 9, _hoisted_22),
                  createBaseVNode("button", {
                    onClick: checkScrambleAnswer,
                    class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-colors",
                    disabled: assembledWord.value.length !== _ctx.currentCard.word.length || scrambleAnswered.value && scrambleCorrect.value
                  }, toDisplayString(unref(t)("flashcard.scrambleWords.check", "Check")), 9, _hoisted_23)
                ])
              ], 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_24, [
            createBaseVNode("div", _hoisted_25, [
              createBaseVNode("h3", _hoisted_26, toDisplayString(_ctx.currentCard.meaning), 1),
              _ctx.currentCard.partOfSpeech ? (openBlock(), createElementBlock("p", _hoisted_27, toDisplayString(unref(t)(`vocabulary.wordTypes.${_ctx.currentCard.partOfSpeech}`, _ctx.currentCard.partOfSpeech)), 1)) : createCommentVNode("", true),
              _ctx.currentCard.example ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(_ctx.currentCard.example), 1)) : createCommentVNode("", true),
              createBaseVNode("p", _hoisted_29, toDisplayString(unref(t)("flashcard.card.flip_back", "Click to flip back")), 1)
            ])
          ])
        ], 34),
        createVNode(unref(FireworkSoundEffect), {
          ref_key: "fireworkEffect",
          ref: fireworkEffect,
          "trigger-firework": triggerFirework.value,
          "trigger-sound": triggerSound.value,
          "is-correct": isCorrectAnswer.value,
          onEffectComplete: resetTriggers
        }, null, 8, ["trigger-firework", "trigger-sound", "is-correct"])
      ]);
    };
  }
});
const FlashcardCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-185b7af3"]]);
export {
  FlashcardCard as default
};
//# sourceMappingURL=FlashcardCard-gk5bE3FV.js.map
