const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-CQfN1JwL.js","assets/vendor-DI3yOcyn.js","assets/index-BD3eql-a.js","assets/vendor-toast-BpLwVhAX.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DLpj-S53.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, a as _export_sfc } from "./index-BD3eql-a.js";
import { d as defineComponent, A as ref, I as onMounted, K as watch, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, e as createCommentVNode, Z as withKeys, F as Fragment, j as renderList, n as normalizeClass, D as defineAsyncComponent, i as withModifiers, q as nextTick } from "./vendor-DI3yOcyn.js";
import "./vendor-toast-BpLwVhAX.js";
const _hoisted_1 = { class: "text-center h-full flex flex-col justify-center" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full" };
const _hoisted_4 = { class: "mb-8" };
const _hoisted_5 = {
  key: 0,
  class: "text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
};
const _hoisted_6 = {
  key: 1,
  class: "text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
};
const _hoisted_7 = {
  key: 2,
  class: "max-w-md mx-auto"
};
const _hoisted_8 = ["value", "disabled", "placeholder"];
const _hoisted_9 = {
  key: 0,
  class: "mt-4"
};
const _hoisted_10 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium"
};
const _hoisted_11 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium"
};
const _hoisted_12 = { class: "text-sm text-gray-500 dark:text-gray-400 mt-2" };
const _hoisted_13 = {
  key: 3,
  class: "w-full px-2 sm:px-3 md:px-0"
};
const _hoisted_14 = { class: "grid grid-cols-1 grid-2-cols-480 sm:grid-cols-2 gap-1.5 sm:gap-3 justify-items-stretch w-full max-w-none" };
const _hoisted_15 = ["onClick", "disabled"];
const _hoisted_16 = { class: "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0" };
const _hoisted_17 = { class: "truncate overflow-hidden min-w-0" };
const _hoisted_18 = {
  key: 0,
  class: "mt-4 text-center"
};
const _hoisted_19 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium"
};
const _hoisted_20 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium"
};
const _hoisted_21 = { class: "text-sm text-gray-500 dark:text-gray-400 mt-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListeningMode",
  props: {
    card: {},
    listeningAnswer: {},
    listeningAnswered: { type: Boolean },
    listeningCorrect: { type: Boolean },
    listeningQuizEnabled: { type: Boolean },
    listeningQuizOptions: {},
    listeningQuizSelected: {},
    listeningQuizAnswered: { type: Boolean },
    getTopicName: { type: Function }
  },
  emits: ["update:listeningAnswer", "check-answer", "play-audio", "select-listening-quiz-answer"],
  setup(__props, { emit: __emit }) {
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-CQfN1JwL.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const props = __props;
    const emit = __emit;
    const stripDiacritics = (s) => s.replace(/[ưừứửữự]/g, "w").replace(/[ƯỪỨỬỮỰ]/g, "W").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    const listeningInput = ref(null);
    const focusListeningInput = async () => {
      await nextTick();
      try {
        listeningInput.value?.focus({ preventScroll: true });
      } catch {
        listeningInput.value?.focus();
      }
    };
    const ensureListeningFocus = () => {
      if (!props.listeningQuizEnabled && !props.listeningAnswered) {
        if (document.activeElement !== listeningInput.value) {
          focusListeningInput();
        }
      }
    };
    const onListeningBlur = () => {
      ensureListeningFocus();
    };
    const onInput = (event) => {
      const el = event.target;
      const sanitized = stripDiacritics(el.value);
      if (sanitized !== el.value) {
        el.value = sanitized;
      }
      emit("update:listeningAnswer", sanitized);
    };
    onMounted(() => {
      ensureListeningFocus();
    });
    const handleCheckAnswer = () => {
      if (props.listeningAnswered) return;
      emit("check-answer");
      setTimeout(() => {
        isCorrectAnswer.value = props.listeningCorrect;
        triggerFirework.value = true;
        triggerSound.value = true;
      }, 100);
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.listeningAnswered, (newValue) => {
      if (newValue && !triggerFirework.value) {
        isCorrectAnswer.value = props.listeningCorrect;
        setTimeout(() => {
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 50);
      }
    });
    watch(() => props.listeningAnswered, (answered) => {
      if (!answered) ensureListeningFocus();
    });
    watch(() => props.card, () => {
      ensureListeningFocus();
    });
    watch(() => props.listeningQuizEnabled, (val) => {
      if (!val) ensureListeningFocus();
    });
    const { t } = useI18n();
    const onSelectListeningOption = (opt) => {
      if (!props.listeningQuizAnswered) {
        emit("select-listening-quiz-answer", opt);
      }
    };
    const isOptionSelected = (opt) => props.listeningQuizSelected === opt;
    const isOptionCorrect = (opt) => props.card ? opt.trim().toLowerCase() === props.card.word.trim().toLowerCase() : false;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-auto sm:h-96 select-none",
        onCopy: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.card?.category ? _ctx.getTopicName(_ctx.card.category) : ""), 1)
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => emit("play-audio")),
              class: "bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full transition-colors"
            }, _cache[4] || (_cache[4] = [
              createBaseVNode("svg", {
                class: "w-8 h-8",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zm-2 6a4 4 0 100-8 4 4 0 000 8z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ]))
          ]),
          !_ctx.listeningQuizEnabled ? (openBlock(), createElementBlock("p", _hoisted_5, toDisplayString(unref(t)("flashcard.listening.instruction", "Listen and type the word you hear:")), 1)) : (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(unref(t)("flashcard.listening.instructionQuiz", "Choose the word you hear:")), 1)),
          !_ctx.listeningQuizEnabled ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("input", {
              ref_key: "listeningInput",
              ref: listeningInput,
              value: _ctx.listeningAnswer,
              onInput,
              onKeyup: withKeys(handleCheckAnswer, ["enter"]),
              type: "text",
              disabled: _ctx.listeningAnswered,
              class: "w-full p-4 text-center text-lg sm:text-xl md:text-2xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 select-text",
              placeholder: unref(t)("flashcard.listening.placeholder", "Type the word you hear..."),
              inputmode: "text",
              autocapitalize: "none",
              autocomplete: "off",
              spellcheck: "false",
              onBlur: onListeningBlur
            }, null, 40, _hoisted_8),
            _ctx.listeningAnswered ? (openBlock(), createElementBlock("div", _hoisted_9, [
              _ctx.listeningCorrect ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(unref(t)("flashcard.listening.correct", "✓ Correct!")), 1)) : (openBlock(), createElementBlock("p", _hoisted_11, toDisplayString(unref(t)("flashcard.listening.incorrect", "✗ Correct answer:")) + " " + toDisplayString(_ctx.card?.word), 1)),
              createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.card?.meaning), 1)
            ])) : createCommentVNode("", true)
          ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.listeningQuizOptions, (opt, idx) => {
                return openBlock(), createElementBlock("button", {
                  key: idx,
                  onClick: ($event) => onSelectListeningOption(opt),
                  disabled: _ctx.listeningQuizAnswered,
                  translate: "no",
                  class: normalizeClass(["notranslate px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0", [
                    _ctx.listeningQuizAnswered ? isOptionCorrect(opt) ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : isOptionSelected(opt) ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5"
                  ]])
                }, [
                  createBaseVNode("span", _hoisted_16, toDisplayString(String.fromCharCode(65 + idx)), 1),
                  createBaseVNode("span", _hoisted_17, toDisplayString(opt), 1)
                ], 10, _hoisted_15);
              }), 128))
            ]),
            _ctx.listeningAnswered ? (openBlock(), createElementBlock("div", _hoisted_18, [
              _ctx.listeningCorrect ? (openBlock(), createElementBlock("p", _hoisted_19, toDisplayString(unref(t)("flashcard.listening.correct", "✓ Correct!")), 1)) : (openBlock(), createElementBlock("p", _hoisted_20, toDisplayString(unref(t)("flashcard.listening.incorrect", "✗ Correct answer:")) + " " + toDisplayString(_ctx.card?.word), 1)),
              createBaseVNode("p", _hoisted_21, toDisplayString(_ctx.card?.meaning), 1)
            ])) : createCommentVNode("", true)
          ]))
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
const ListeningMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-849d04c0"]]);
export {
  ListeningMode as default
};
//# sourceMappingURL=ListeningMode-DqawTWm9.js.map
