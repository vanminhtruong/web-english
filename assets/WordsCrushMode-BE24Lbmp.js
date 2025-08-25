import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, C as withDirectives, O as vModelText, g as createTextVNode, i as withModifiers, q as nextTick } from "./vendor-Cr_Qcp9o.js";
import { a as _export_sfc } from "./index-CNlkTkbP.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mb-1" };
const _hoisted_2 = { class: "px-2 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-xs font-medium rounded-full" };
const _hoisted_3 = { class: "text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl font-bold text-purple-900 dark:text-purple-300 mb-1 px-1 text-center" };
const _hoisted_4 = { class: "text-xs sm:text-sm xl:text-sm 2xl:text-sm text-gray-600 dark:text-white/70 mb-1 max-w-sm px-1 text-center" };
const _hoisted_5 = { class: "text-center mb-2" };
const _hoisted_6 = { class: "text-sm sm:text-base md:text-lg xl:text-base 2xl:text-lg text-gray-500 dark:text-white/70 break-words px-1" };
const _hoisted_7 = { class: "text-xs sm:text-sm text-gray-400 dark:text-white/60 mt-1" };
const _hoisted_8 = { class: "flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-2 px-2 max-w-full" };
const _hoisted_9 = ["onUpdate:modelValue", "onInput", "onKeydown"];
const _hoisted_10 = {
  key: 1,
  class: "uppercase text-purple-700 dark:text-purple-300"
};
const _hoisted_11 = {
  key: 2,
  class: "uppercase text-yellow-600 dark:text-yellow-400"
};
const _hoisted_12 = {
  key: 1,
  class: "w-2 sm:w-3"
};
const _hoisted_13 = { class: "mb-0.5 xl:mb-0.5 2xl:mb-1" };
const _hoisted_14 = { class: "flex flex-wrap justify-center gap-2 px-1 mb-2" };
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  key: 0,
  class: "px-1 text-center mt-0.5 xl:mt-0 2xl:mt-0.5 bg-gray-50 dark:bg-dark-bg-soft rounded py-1 xl:py-0.5 2xl:py-1"
};
const _hoisted_17 = {
  key: 0,
  class: "text-sm sm:text-base xl:text-base 2xl:text-lg font-bold text-green-600 dark:text-green-400 mb-0.5 xl:mb-0.5 2xl:mb-1"
};
const _hoisted_18 = {
  key: 1,
  class: "text-sm sm:text-base xl:text-base 2xl:text-lg font-bold text-red-600 dark:text-red-400 mb-0.5 xl:mb-0.5 2xl:mb-1"
};
const _hoisted_19 = { class: "space-y-0.5 xl:space-y-0 2xl:space-y-0.5 border-t border-gray-200 dark:border-dark-bg-mute pt-0.5 xl:pt-0 2xl:pt-0.5" };
const _hoisted_20 = { class: "text-sm xl:text-sm 2xl:text-base text-gray-700 dark:text-white/80" };
const _hoisted_21 = { class: "font-semibold" };
const _hoisted_22 = { class: "font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_23 = { class: "text-sm xl:text-sm 2xl:text-base text-gray-700 dark:text-white/80" };
const _hoisted_24 = { class: "font-semibold" };
const _hoisted_25 = { class: "font-medium text-gray-900 dark:text-white" };
const maxHints = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WordsCrushMode",
  props: {
    card: {},
    getTopicName: { type: Function }
  },
  emits: ["game-completed", "play-audio"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const wordSlots = ref([]);
    const gameCompleted = ref(false);
    const isCorrect = ref(false);
    const hintsUsed = ref(0);
    const letterInputs = ref([]);
    const createWordSlots = () => {
      if (!props.card?.word) return [];
      const word = props.card.word.toLowerCase();
      const slots = [];
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char === " ") {
          slots.push({
            char: " ",
            separator: true,
            filled: false,
            userInput: "",
            correct: false,
            incorrect: false,
            revealed: false
          });
        } else {
          slots.push({
            char,
            separator: false,
            filled: false,
            userInput: "",
            correct: false,
            incorrect: false,
            revealed: false
          });
        }
      }
      const letterSlots = slots.filter((slot) => !slot.separator);
      const hideCount = Math.ceil(letterSlots.length * 0.5);
      const indicesToHide = [];
      while (indicesToHide.length < hideCount) {
        const randomIndex = Math.floor(Math.random() * letterSlots.length);
        const actualIndex = slots.findIndex((slot) => slot === letterSlots[randomIndex]);
        if (!indicesToHide.includes(actualIndex)) {
          indicesToHide.push(actualIndex);
        }
      }
      const shownLetterIndices = [];
      slots.forEach((slot, index) => {
        if (!slot.separator && !indicesToHide.includes(index)) {
          shownLetterIndices.push(index);
        }
      });
      const shownLetters = shownLetterIndices.map((index) => slots[index].char);
      const shuffledLetters = [...shownLetters].sort(() => Math.random() - 0.5);
      let shuffleIndex = 0;
      slots.forEach((slot, index) => {
        if (!slot.separator) {
          if (indicesToHide.includes(index)) ;
          else {
            slot.filled = true;
            slot.userInput = shuffledLetters[shuffleIndex];
            shuffleIndex++;
          }
        }
      });
      return slots;
    };
    const canCheckAnswer = computed(() => {
      return wordSlots.value.filter((slot) => !slot.separator && !slot.filled).every((slot) => slot.userInput.trim() !== "");
    });
    const initializeGame = () => {
      if (!props.card?.word) return;
      wordSlots.value = createWordSlots();
      gameCompleted.value = false;
      isCorrect.value = false;
      hintsUsed.value = 0;
      letterInputs.value = [];
    };
    const handleLetterInput = (index, event) => {
      const target = event.target;
      const value = target.value.toLowerCase();
      if (value && /^[a-zA-Z]$/.test(value)) {
        wordSlots.value[index].userInput = value;
        const nextEmptyIndex = wordSlots.value.findIndex(
          (slot, i) => i > index && !slot.separator && !slot.filled && slot.userInput === ""
        );
        if (nextEmptyIndex !== -1 && letterInputs.value[nextEmptyIndex]) {
          nextTick(() => {
            letterInputs.value[nextEmptyIndex].focus();
          });
        }
      } else if (value === "") {
        wordSlots.value[index].userInput = "";
      } else {
        target.value = "";
        wordSlots.value[index].userInput = "";
      }
    };
    const handleKeyDown = (index, event) => {
      if (event.key === "Backspace" && wordSlots.value[index].userInput === "") {
        const prevEmptyIndex = wordSlots.value.findIndex(
          (slot, i) => i < index && !slot.separator && !slot.filled
        );
        if (prevEmptyIndex !== -1) {
          const reversedIndex = [...wordSlots.value].reverse().findIndex((slot, i) => {
            const originalIndex = wordSlots.value.length - 1 - i;
            return originalIndex < index && !slot.separator && !slot.filled;
          });
          if (reversedIndex !== -1) {
            const actualIndex = wordSlots.value.length - 1 - reversedIndex;
            if (letterInputs.value[actualIndex]) {
              nextTick(() => {
                letterInputs.value[actualIndex].focus();
              });
            }
          }
        }
      } else if (event.key === "Enter") {
        checkAnswer();
      }
    };
    const checkAnswer = () => {
      if (!canCheckAnswer.value) return;
      let allCorrect = true;
      wordSlots.value.forEach((slot) => {
        if (!slot.separator && !slot.filled) {
          const isLetterCorrect = slot.userInput.toLowerCase() === slot.char.toLowerCase();
          slot.correct = isLetterCorrect;
          slot.incorrect = !isLetterCorrect;
          if (!isLetterCorrect) allCorrect = false;
        }
      });
      gameCompleted.value = true;
      isCorrect.value = allCorrect;
      emit("game-completed", allCorrect);
    };
    const revealHint = () => {
      if (hintsUsed.value >= maxHints) return;
      const emptySlots = wordSlots.value.filter((slot) => !slot.separator && !slot.filled && slot.userInput === "");
      if (emptySlots.length === 0) return;
      const randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
      randomSlot.revealed = true;
      randomSlot.userInput = randomSlot.char;
      hintsUsed.value++;
    };
    const resetGame = () => {
      initializeGame();
    };
    const playPronunciation = () => {
      if (props.card?.word) {
        emit("play-audio", "vocabulary", props.card.word);
      }
    };
    onMounted(() => {
      initializeGame();
    });
    watch(() => props.card, () => {
      initializeGame();
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "text-center w-full h-full flex flex-col justify-center items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 overflow-hidden",
        onCopy: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("span", _hoisted_2, toDisplayString(_ctx.card?.category ? _ctx.getTopicName(_ctx.card.category) : ""), 1)
        ]),
        createBaseVNode("h2", _hoisted_3, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.title", "Words Crush: Anagram Challenge")), 1),
        createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.instruction", "Fill in the missing letters to complete the word")), 1),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.card?.pronunciation), 1),
          createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.card?.meaning), 1)
        ]),
        createBaseVNode("div", _hoisted_8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(wordSlots.value, (slot, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "relative"
            }, [
              !slot.separator ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 border-2 border-purple-300 dark:border-purple-600 rounded-lg flex items-center justify-center text-sm sm:text-lg md:text-xl xl:text-lg 2xl:text-xl font-bold transition-all duration-200", {
                  "border-green-500 bg-green-50 dark:bg-green-900/20": slot.correct,
                  "border-red-500 bg-red-50 dark:bg-red-900/20": slot.incorrect,
                  "bg-white dark:bg-dark-bg": !slot.correct && !slot.incorrect && !slot.filled,
                  "bg-purple-50 dark:bg-purple-900/20 border-purple-500": slot.filled,
                  "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400": slot.revealed && !gameCompleted.value
                }])
              }, [
                !slot.filled && !slot.revealed ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 0,
                  "onUpdate:modelValue": ($event) => slot.userInput = $event,
                  onInput: ($event) => handleLetterInput(index, $event),
                  onKeydown: ($event) => handleKeyDown(index, $event),
                  type: "text",
                  maxlength: "1",
                  class: "w-full h-full bg-transparent text-center text-sm sm:text-lg md:text-xl xl:text-lg 2xl:text-xl font-bold uppercase border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
                  ref_for: true,
                  ref: "letterInput",
                  placeholder: "?"
                }, null, 40, _hoisted_9)), [
                  [vModelText, slot.userInput]
                ]) : slot.filled ? (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(slot.char), 1)) : (openBlock(), createElementBlock("span", _hoisted_11, toDisplayString(slot.char), 1))
              ], 2)) : (openBlock(), createElementBlock("div", _hoisted_12))
            ]);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("button", {
            onClick: playPronunciation,
            class: "px-2 py-0.5 md:px-3 md:py-1 xl:px-3 xl:py-1 2xl:px-3 2xl:py-1 text-xs sm:text-sm xl:text-sm 2xl:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded font-medium transition-colors flex items-center gap-1"
          }, [
            _cache[3] || (_cache[3] = createBaseVNode("svg", {
              class: "w-3 h-3 xl:w-3 xl:h-3 2xl:w-3 2xl:h-3",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.773l-4.146-3.382a.5.5 0 00-.319-.118H2a1 1 0 01-1-1V8a1 1 0 011-1h1.918a.5.5 0 00.319-.118l4.146-3.382zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1zm2.025 1.13a1 1 0 011.414.057 7 7 0 010 9.816 1 1 0 11-1.471-1.358 5 5 0 000-7.1 1 1 0 01.057-1.415zM16.5 8.5a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createTextVNode(" " + toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.playSound", "Play Sound")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_14, [
          !gameCompleted.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: checkAnswer,
            disabled: !canCheckAnswer.value,
            class: "px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          }, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.checkAnswer", "Check Answer")), 9, _hoisted_15)) : createCommentVNode("", true),
          !gameCompleted.value && hintsUsed.value < maxHints ? (openBlock(), createElementBlock("button", {
            key: 1,
            onClick: revealHint,
            class: "px-3 py-1.5 text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg"
          }, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.hint", "Hint")) + " (" + toDisplayString(hintsUsed.value) + "/" + toDisplayString(maxHints) + ") ", 1)) : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: resetGame,
            class: "px-3 py-1.5 text-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg"
          }, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.reset", "Reset")), 1)
        ]),
        gameCompleted.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
          isCorrect.value ? (openBlock(), createElementBlock("p", _hoisted_17, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.correct", " Correct!")), 1)) : (openBlock(), createElementBlock("p", _hoisted_18, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.tryAgain", "Try Again!")), 1)),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("p", _hoisted_20, [
              createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.correctWord", "Word")) + ":", 1),
              createBaseVNode("span", _hoisted_22, toDisplayString(_ctx.card?.word), 1)
            ]),
            createBaseVNode("p", _hoisted_23, [
              createBaseVNode("span", _hoisted_24, toDisplayString(unref(t)("flashcard.pronunciation.wordsCrush.meaning", "Meaning")) + ":", 1),
              createBaseVNode("span", _hoisted_25, toDisplayString(_ctx.card?.meaning), 1)
            ])
          ])
        ])) : createCommentVNode("", true)
      ], 32);
    };
  }
});
const WordsCrushMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9d619f0"]]);
export {
  WordsCrushMode as default
};
//# sourceMappingURL=WordsCrushMode-BE24Lbmp.js.map
