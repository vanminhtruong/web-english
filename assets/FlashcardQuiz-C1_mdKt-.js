const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-D9pwxm0k.js","assets/vendor-DoTKyHPB.js","assets/index-CVZ6Enfo.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-QWkG18kn.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-CVZ6Enfo.js";
import { d as defineComponent, H as useI18n, A as ref, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, e as createCommentVNode, D as defineAsyncComponent, i as withModifiers } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "h-full flex flex-col" };
const _hoisted_2 = { class: "text-center mb-4" };
const _hoisted_3 = { class: "px-4 py-2 bg-yellow-100 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "text-center mb-4 flex-shrink-0" };
const _hoisted_5 = { class: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" };
const _hoisted_6 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_7 = { class: "text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1" };
const _hoisted_8 = { class: "flex-1 flex flex-col justify-center min-h-0" };
const _hoisted_9 = { class: "flex items-center justify-center" };
const _hoisted_10 = { class: "grid grid-cols-2 gap-3 w-full max-w-lg" };
const _hoisted_11 = ["onClick", "disabled"];
const _hoisted_12 = { class: "absolute top-2 left-2 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80" };
const _hoisted_13 = { class: "text-center px-6" };
const _hoisted_14 = {
  key: 0,
  class: "absolute top-2 right-2 text-green-500"
};
const _hoisted_15 = {
  key: 1,
  class: "absolute top-2 right-2 text-red-500"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardQuiz",
  props: {
    currentCard: {},
    quizOptions: {},
    selectedAnswer: {},
    quizAnswered: { type: Boolean }
  },
  emits: ["select-answer"],
  setup(__props, { emit: __emit }) {
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-D9pwxm0k.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const { t } = useI18n();
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const props = __props;
    const emit = __emit;
    const getCorrectAnswer = () => {
      return props.currentCard.meaning.split(" - ")[0].trim();
    };
    const handleSelectAnswer = (answer) => {
      if (props.quizAnswered) return;
      emit("select-answer", answer);
      const correctAnswer = getCorrectAnswer();
      isCorrectAnswer.value = answer === correctAnswer;
      setTimeout(() => {
        triggerFirework.value = true;
        triggerSound.value = true;
      }, 100);
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
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
            createBaseVNode("h2", _hoisted_5, toDisplayString(_ctx.currentCard.word), 1),
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.currentCard.pronunciation), 1),
            createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("flashcard.quiz.instruction", "Choose the correct meaning:")), 1)
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.quizOptions, (option, index) => {
                  return openBlock(), createElementBlock("button", {
                    key: index,
                    onClick: ($event) => handleSelectAnswer(option),
                    class: normalizeClass([
                      "relative p-4 text-center rounded-lg border-2 transition-all duration-200 font-semibold text-sm min-h-[60px] flex items-center justify-center",
                      _ctx.quizAnswered ? option === getCorrectAnswer() ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : option === _ctx.selectedAnswer ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60 hover:shadow-sm hover:scale-[1.01] dark:hover:bg-white/5"
                    ]),
                    disabled: _ctx.quizAnswered
                  }, [
                    createBaseVNode("span", _hoisted_12, toDisplayString(String.fromCharCode(65 + index)), 1),
                    createBaseVNode("span", _hoisted_13, toDisplayString(option), 1),
                    _ctx.quizAnswered && option === getCorrectAnswer() ? (openBlock(), createElementBlock("span", _hoisted_14, _cache[3] || (_cache[3] = [
                      createBaseVNode("svg", {
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ], -1)
                    ]))) : _ctx.quizAnswered && option === _ctx.selectedAnswer && option !== getCorrectAnswer() ? (openBlock(), createElementBlock("span", _hoisted_15, _cache[4] || (_cache[4] = [
                      createBaseVNode("svg", {
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          "clip-rule": "evenodd"
                        })
                      ], -1)
                    ]))) : createCommentVNode("", true)
                  ], 10, _hoisted_11);
                }), 128))
              ])
            ])
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
//# sourceMappingURL=FlashcardQuiz-C1_mdKt-.js.map
