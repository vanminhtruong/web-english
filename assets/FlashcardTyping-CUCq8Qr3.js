const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-CA03Wmo0.js","assets/vendor-Cr_Qcp9o.js","assets/index-C8A7QfHx.js","assets/vendor-toast-BrdXiWv_.js","assets/vendor-toast-jG2HNJHr.css","assets/index-Nx8oVRcP.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-C8A7QfHx.js";
import { d as defineComponent, H as useI18n, A as ref, K as watch, I as onMounted, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, e as createCommentVNode, Z as withKeys, F as Fragment, j as renderList, n as normalizeClass, g as createTextVNode, D as defineAsyncComponent, i as withModifiers, q as nextTick } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "h-full flex flex-col" };
const _hoisted_2 = { class: "text-center mb-6" };
const _hoisted_3 = { class: "px-4 py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "text-center mb-8" };
const _hoisted_5 = { class: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" };
const _hoisted_6 = {
  key: 0,
  class: "text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300"
};
const _hoisted_7 = {
  key: 1,
  class: "text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300"
};
const _hoisted_8 = { class: "flex-1 flex flex-col justify-center" };
const _hoisted_9 = {
  key: 0,
  class: "max-w-lg mx-auto w-full"
};
const _hoisted_10 = { class: "relative" };
const _hoisted_11 = ["value", "disabled", "placeholder"];
const _hoisted_12 = {
  key: 0,
  class: "absolute right-3 top-1/2 transform -translate-y-1/2"
};
const _hoisted_13 = {
  key: 0,
  class: "text-green-500"
};
const _hoisted_14 = {
  key: 1,
  class: "text-red-500"
};
const _hoisted_15 = {
  key: 0,
  class: "mt-4 text-center"
};
const _hoisted_16 = { class: "text-gray-600 dark:text-gray-400 text-sm" };
const _hoisted_17 = { class: "text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_18 = {
  key: 1,
  class: "w-full px-2 sm:px-3 md:px-0"
};
const _hoisted_19 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 justify-items-stretch w-full" };
const _hoisted_20 = ["onClick", "disabled"];
const _hoisted_21 = { class: "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0" };
const _hoisted_22 = { class: "truncate overflow-hidden min-w-0" };
const _hoisted_23 = {
  key: 0,
  class: "mt-3 sm:mt-4 text-center px-2"
};
const _hoisted_24 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium text-sm sm:text-base"
};
const _hoisted_25 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium text-sm sm:text-base break-words"
};
const _hoisted_26 = { class: "font-bold" };
const _hoisted_27 = { class: "text-center mt-6" };
const _hoisted_28 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardTyping",
  props: {
    currentCard: {},
    typingAnswer: {},
    typingAnswered: { type: Boolean },
    typingCorrect: { type: Boolean },
    typingQuizEnabled: { type: Boolean },
    typingQuizOptions: {},
    typingQuizSelected: {},
    typingQuizAnswered: { type: Boolean }
  },
  emits: ["update:typingAnswer", "check-answer", "select-typing-quiz-answer"],
  setup(__props, { emit: __emit }) {
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-CA03Wmo0.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const { t } = useI18n();
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const props = __props;
    const emit = __emit;
    const stripDiacritics = (s) => s.replace(/[ưừứửữự]/g, "w").replace(/[ƯỪỨỬỮỰ]/g, "W").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    const handleInput = (event) => {
      const target = event.target;
      const sanitized = stripDiacritics(target.value);
      if (sanitized !== target.value) {
        target.value = sanitized;
      }
      emit("update:typingAnswer", sanitized);
    };
    const getShortMeaning = (meaning) => {
      return meaning.split(" - ")[0].trim();
    };
    const handleCheckAnswer = () => {
      if (props.typingAnswered) return;
      emit("check-answer");
      setTimeout(() => {
        isCorrectAnswer.value = props.typingAnswer.toLowerCase().trim() === props.currentCard.word.toLowerCase();
        triggerFirework.value = true;
        triggerSound.value = true;
      }, 100);
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.typingAnswered, (newValue) => {
      if (newValue && !triggerFirework.value) {
        if (typeof props.typingCorrect === "boolean") {
          isCorrectAnswer.value = props.typingCorrect;
        } else {
          isCorrectAnswer.value = props.typingAnswer.toLowerCase().trim() === props.currentCard.word.toLowerCase();
        }
        setTimeout(() => {
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 50);
      }
    });
    const onSelectTypingOption = (opt) => {
      if (!props.typingQuizAnswered) emit("select-typing-quiz-answer", opt);
    };
    const isOptionSelected = (opt) => props.typingQuizSelected === opt;
    const isOptionCorrect = (opt) => opt.trim().toLowerCase() === props.currentCard.word.trim().toLowerCase();
    const typingInput = ref(null);
    const focusTypingInput = async () => {
      await nextTick();
      try {
        typingInput.value?.focus({ preventScroll: true });
      } catch {
        typingInput.value?.focus();
      }
    };
    const ensureTypingFocus = () => {
      if (!props.typingQuizEnabled && !props.typingAnswered) {
        if (document.activeElement !== typingInput.value) {
          focusTypingInput();
        }
      }
    };
    const onTypingBlur = () => {
      ensureTypingFocus();
    };
    onMounted(() => {
      ensureTypingFocus();
    });
    watch(() => props.typingQuizEnabled, (val) => {
      if (!val) ensureTypingFocus();
    });
    watch(() => props.typingAnswered, (answered) => {
      if (!answered) ensureTypingFocus();
    });
    watch(() => props.currentCard, () => {
      ensureTypingFocus();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96 select-none",
        onCopy: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(unref(getTopicName)(_ctx.currentCard.category)), 1)
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("h2", _hoisted_5, toDisplayString(getShortMeaning(_ctx.currentCard.meaning)), 1),
            !_ctx.typingQuizEnabled ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(unref(t)("flashcard.typing.instruction", "Type the corresponding English word:")), 1)) : (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(unref(t)("flashcard.typing.instructionQuiz", "Choose the correct English word:")), 1))
          ]),
          createBaseVNode("div", _hoisted_8, [
            !_ctx.typingQuizEnabled ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("input", {
                  ref_key: "typingInput",
                  ref: typingInput,
                  value: _ctx.typingAnswer,
                  onInput: handleInput,
                  onKeyup: withKeys(handleCheckAnswer, ["enter"]),
                  type: "text",
                  disabled: _ctx.typingAnswered,
                  class: "w-full p-3 text-center text-xl sm:text-2xl md:text-3xl border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 select-text",
                  placeholder: unref(t)("flashcard.typing.placeholder", "Type the word..."),
                  inputmode: "text",
                  autocomplete: "off",
                  autocapitalize: "none",
                  spellcheck: "false",
                  onBlur: onTypingBlur
                }, null, 40, _hoisted_11),
                _ctx.typingAnswered ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  _ctx.typingAnswer.toLowerCase().trim() === _ctx.currentCard.word.toLowerCase() ? (openBlock(), createElementBlock("span", _hoisted_13, _cache[3] || (_cache[3] = [
                    createBaseVNode("svg", {
                      class: "w-8 h-8",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)
                  ]))) : (openBlock(), createElementBlock("span", _hoisted_14, _cache[4] || (_cache[4] = [
                    createBaseVNode("svg", {
                      class: "w-8 h-8",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)
                  ])))
                ])) : createCommentVNode("", true)
              ]),
              _ctx.typingAnswered && _ctx.typingAnswer.toLowerCase().trim() !== _ctx.currentCard.word.toLowerCase() ? (openBlock(), createElementBlock("div", _hoisted_15, [
                createBaseVNode("p", _hoisted_16, toDisplayString(unref(t)("flashcard.typing.correctAnswer", "Correct answer:")), 1),
                createBaseVNode("p", _hoisted_17, toDisplayString(_ctx.currentCard.word), 1)
              ])) : createCommentVNode("", true)
            ])) : (openBlock(), createElementBlock("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.typingQuizOptions, (opt, idx) => {
                  return openBlock(), createElementBlock("button", {
                    key: idx,
                    onClick: ($event) => onSelectTypingOption(opt),
                    disabled: _ctx.typingQuizAnswered,
                    translate: "no",
                    class: normalizeClass(["notranslate px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0", [
                      _ctx.typingQuizAnswered ? isOptionCorrect(opt) ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : isOptionSelected(opt) ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5"
                    ]])
                  }, [
                    createBaseVNode("span", _hoisted_21, toDisplayString(String.fromCharCode(65 + idx)), 1),
                    createBaseVNode("span", _hoisted_22, toDisplayString(opt), 1)
                  ], 10, _hoisted_20);
                }), 128))
              ]),
              _ctx.typingAnswered ? (openBlock(), createElementBlock("div", _hoisted_23, [
                _ctx.typingCorrect ? (openBlock(), createElementBlock("p", _hoisted_24, toDisplayString(unref(t)("flashcard.typing.correct", "✓ Correct!")), 1)) : (openBlock(), createElementBlock("p", _hoisted_25, [
                  createTextVNode(toDisplayString(unref(t)("flashcard.typing.incorrect", "✗ Correct answer:")) + " ", 1),
                  createBaseVNode("span", _hoisted_26, toDisplayString(_ctx.currentCard.word), 1)
                ]))
              ])) : createCommentVNode("", true)
            ]))
          ]),
          createBaseVNode("div", _hoisted_27, [
            !_ctx.typingAnswered && !_ctx.typingQuizEnabled ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: handleCheckAnswer,
              disabled: !_ctx.typingAnswer.trim(),
              class: "bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
            }, toDisplayString(unref(t)("common.check", "Check")), 9, _hoisted_28)) : createCommentVNode("", true)
          ])
        ]),
        createVNode(unref(FireworkSoundEffect), {
          ref_key: "fireworkEffect",
          ref: fireworkEffect,
          "trigger-firework": triggerFirework.value,
          "trigger-sound": triggerSound.value,
          "is-correct": isCorrectAnswer.value,
          onEffectComplete: resetTriggers
        }, null, 8, ["trigger-firework", "trigger-sound", "is-correct"])
      ], 32);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FlashcardTyping-CUCq8Qr3.js.map
