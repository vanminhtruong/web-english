const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-BOLeRPvc.js","assets/vendor-DoTKyHPB.js","assets/index-2m4mqVDb.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DDTyTv33.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-2m4mqVDb.js";
import { d as defineComponent, A as ref, H as useI18n, K as watch, I as onMounted, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, e as createCommentVNode, C as withDirectives, S as vModelText, Z as withKeys, F as Fragment, j as renderList, n as normalizeClass, g as createTextVNode, D as defineAsyncComponent, i as withModifiers, q as nextTick } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "h-full flex flex-col overflow-hidden" };
const _hoisted_2 = { class: "mb-4 text-center" };
const _hoisted_3 = { class: "px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "flex-1 flex items-center justify-center mb-4 min-h-0" };
const _hoisted_5 = {
  key: 0,
  class: "relative"
};
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg"
};
const _hoisted_8 = { class: "text-center" };
const _hoisted_9 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_10 = {
  key: 1,
  class: "flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm"
};
const _hoisted_11 = { class: "text-center" };
const _hoisted_12 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_13 = { class: "space-y-3 flex-shrink-0" };
const _hoisted_14 = { key: 0 };
const _hoisted_15 = ["disabled", "placeholder"];
const _hoisted_16 = { key: 1 };
const _hoisted_17 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center sm:justify-items-center justify-center mx-auto max-w-[560px] sm:max-w-[520px]" };
const _hoisted_18 = ["onClick", "disabled"];
const _hoisted_19 = { class: "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80" };
const _hoisted_20 = { class: "truncate" };
const _hoisted_21 = {
  key: 2,
  class: "text-center space-y-2 max-h-32 overflow-y-auto"
};
const _hoisted_22 = {
  key: 0,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_23 = {
  key: 1,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_24 = {
  key: 0,
  class: "text-center"
};
const _hoisted_25 = { class: "text-sm text-gray-600 dark:text-white/70" };
const _hoisted_26 = { class: "font-semibold text-gray-900 dark:text-white" };
const _hoisted_27 = { class: "text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2" };
const _hoisted_28 = {
  key: 1,
  class: "text-center"
};
const _hoisted_29 = { class: "text-sm text-gray-600 dark:text-white/70 line-clamp-2" };
const _hoisted_30 = {
  key: 3,
  class: "text-center text-sm text-gray-500 dark:text-white/60"
};
const _hoisted_31 = {
  key: 4,
  class: "text-center text-sm text-gray-500 dark:text-white/60"
};
const STORAGE_KEY_IMAGE_QUIZ = "flashcard_image_quiz_enabled";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardImage",
  props: {
    currentCard: {},
    imageAnswer: {},
    imageAnswered: { type: Boolean },
    imageCorrect: { type: Boolean },
    imageQuizEnabled: { type: Boolean },
    imageQuizOptions: {},
    imageQuizSelected: {},
    imageQuizAnswered: { type: Boolean }
  },
  emits: ["update:imageAnswer", "checkAnswer", "update:imageQuizEnabled", "select-image-quiz-answer"],
  setup(__props, { emit: __emit }) {
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-BOLeRPvc.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const userAnswer = ref("");
    const imageError = ref(false);
    const imageTypingInput = ref(null);
    watch(() => props.imageAnswer, (newValue) => {
      userAnswer.value = newValue;
    });
    const stripDiacritics = (s) => s.replace(/[ưừứửữự]/g, "w").replace(/[ƯỪỨỬỮỰ]/g, "W").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    watch(userAnswer, (newValue) => {
      const sanitized = stripDiacritics(newValue);
      if (sanitized !== newValue) {
        userAnswer.value = sanitized;
      }
      emit("update:imageAnswer", sanitized);
    });
    watch(() => props.currentCard, () => {
      imageError.value = false;
    });
    const handleImageError = () => {
      imageError.value = true;
    };
    const checkAnswer = () => {
      if (!props.imageAnswered && userAnswer.value.trim()) {
        emit("checkAnswer");
        setTimeout(() => {
          isCorrectAnswer.value = props.imageCorrect;
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 100);
      }
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.imageAnswered, (newValue) => {
      if (newValue && !triggerFirework.value) {
        isCorrectAnswer.value = props.imageCorrect;
        setTimeout(() => {
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 50);
      }
    });
    onMounted(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_IMAGE_QUIZ);
        if (saved !== null) {
          const val = saved === "true";
          if (val !== props.imageQuizEnabled) {
            emit("update:imageQuizEnabled", val);
          }
        }
      } catch (e) {
      }
      ensureImageTypingFocus();
    });
    watch(() => props.imageQuizEnabled, (newVal) => {
      try {
        localStorage.setItem(STORAGE_KEY_IMAGE_QUIZ, String(newVal));
      } catch (e) {
      }
      if (!newVal) ensureImageTypingFocus();
    });
    const onSelectImageOption = (opt) => {
      if (!props.imageQuizAnswered) {
        emit("select-image-quiz-answer", opt);
      }
    };
    const isOptionSelected = (opt) => props.imageQuizSelected === opt;
    const isOptionCorrect = (opt) => props.currentCard ? opt.trim().toLowerCase() === props.currentCard.word.trim().toLowerCase() : false;
    const focusImageTypingInput = async () => {
      await nextTick();
      try {
        imageTypingInput.value?.focus({ preventScroll: true });
      } catch {
        imageTypingInput.value?.focus();
      }
    };
    const ensureImageTypingFocus = () => {
      if (!props.imageQuizEnabled && !props.imageAnswered) {
        if (document.activeElement !== imageTypingInput.value) {
          focusImageTypingInput();
        }
      }
    };
    const onImageTypingBlur = () => {
      ensureImageTypingFocus();
    };
    watch(() => props.imageAnswered, (answered) => {
      if (!answered) ensureImageTypingFocus();
    });
    watch(() => props.currentCard, () => {
      ensureImageTypingFocus();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[500px] select-none",
        onCopy: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.currentCard?.category ? unref(getTopicName)(_ctx.currentCard.category) : ""), 1)
          ]),
          createBaseVNode("div", _hoisted_4, [
            _ctx.currentCard?.image ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("img", {
                src: _ctx.currentCard.image,
                alt: unref(t)("flashcard.image.imageAlt", "Flashcard image"),
                class: "max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute",
                onError: handleImageError
              }, null, 40, _hoisted_6),
              imageError.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  _cache[4] || (_cache[4] = createBaseVNode("svg", {
                    class: "mx-auto h-12 w-12 text-gray-400 dark:text-white/50",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ], -1)),
                  createBaseVNode("p", _hoisted_9, toDisplayString(unref(t)("flashcard.image.imageError", "Could not load image.")), 1)
                ])
              ])) : createCommentVNode("", true)
            ])) : (openBlock(), createElementBlock("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                _cache[5] || (_cache[5] = createBaseVNode("svg", {
                  class: "mx-auto h-16 w-16 text-gray-400 dark:text-white/50",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ], -1)),
                createBaseVNode("p", _hoisted_12, toDisplayString(unref(t)("flashcard.image.noImage", "No image available for this card.")), 1)
              ])
            ]))
          ]),
          createBaseVNode("div", _hoisted_13, [
            !_ctx.imageQuizEnabled ? (openBlock(), createElementBlock("div", _hoisted_14, [
              withDirectives(createBaseVNode("input", {
                ref_key: "imageTypingInput",
                ref: imageTypingInput,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userAnswer.value = $event),
                onKeyup: withKeys(checkAnswer, ["enter"]),
                type: "text",
                disabled: _ctx.imageAnswered,
                placeholder: unref(t)("flashcard.image.placeholder", "Enter your answer..."),
                class: "w-full px-4 py-3 text-center text-lg border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed select-text",
                inputmode: "text",
                autocapitalize: "none",
                autocomplete: "off",
                spellcheck: "false",
                onBlur: onImageTypingBlur
              }, null, 40, _hoisted_15), [
                [vModelText, userAnswer.value]
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_16, [
              createBaseVNode("div", _hoisted_17, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.imageQuizOptions, (opt, idx) => {
                  return openBlock(), createElementBlock("button", {
                    key: idx,
                    onClick: ($event) => onSelectImageOption(opt),
                    disabled: _ctx.imageQuizAnswered,
                    translate: "no",
                    class: normalizeClass(["notranslate px-3 py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full max-w-[260px] sm:max-w-[240px]", [
                      _ctx.imageQuizAnswered ? isOptionCorrect(opt) ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : isOptionSelected(opt) ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5"
                    ]])
                  }, [
                    createBaseVNode("span", _hoisted_19, toDisplayString(String.fromCharCode(65 + idx)), 1),
                    createBaseVNode("span", _hoisted_20, toDisplayString(opt), 1)
                  ], 10, _hoisted_18);
                }), 128))
              ])
            ])),
            _ctx.imageAnswered ? (openBlock(), createElementBlock("div", _hoisted_21, [
              createBaseVNode("div", {
                class: normalizeClass([
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                  _ctx.imageCorrect ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                ])
              }, [
                _ctx.imageCorrect ? (openBlock(), createElementBlock("svg", _hoisted_22, _cache[6] || (_cache[6] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_23, _cache[7] || (_cache[7] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ]))),
                createTextVNode(" " + toDisplayString(_ctx.imageCorrect ? unref(t)("common.correct", "Correct") : unref(t)("common.incorrect", "Incorrect")), 1)
              ], 2),
              !_ctx.imageCorrect ? (openBlock(), createElementBlock("div", _hoisted_24, [
                createBaseVNode("p", _hoisted_25, [
                  createTextVNode(toDisplayString(unref(t)("flashcard.image.correctAnswer", "Correct answer")) + ": ", 1),
                  createBaseVNode("span", _hoisted_26, toDisplayString(_ctx.currentCard?.word), 1)
                ]),
                createBaseVNode("p", _hoisted_27, toDisplayString(_ctx.currentCard?.meaning), 1)
              ])) : (openBlock(), createElementBlock("div", _hoisted_28, [
                createBaseVNode("p", _hoisted_29, toDisplayString(_ctx.currentCard?.meaning), 1)
              ]))
            ])) : createCommentVNode("", true),
            !_ctx.imageAnswered && !_ctx.imageQuizEnabled ? (openBlock(), createElementBlock("p", _hoisted_30, toDisplayString(unref(t)("flashcard.image.instruction", "Type the word for the image above and press Enter.")), 1)) : createCommentVNode("", true),
            !_ctx.imageAnswered && _ctx.imageQuizEnabled ? (openBlock(), createElementBlock("p", _hoisted_31, toDisplayString(unref(t)("flashcard.image.instructionQuiz", "Choose the correct word for the image.")), 1)) : createCommentVNode("", true)
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
//# sourceMappingURL=FlashcardImage-CNdQrwH8.js.map
