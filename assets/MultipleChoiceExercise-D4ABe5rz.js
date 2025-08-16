import { d as defineComponent, H as useI18n, A as ref, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, F as Fragment, j as renderList, n as normalizeClass } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore } from "./index-BxypgJoH.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_4 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_5 = { class: "space-y-3 mb-8" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "flex items-center space-x-3" };
const _hoisted_8 = { class: "text-gray-900 dark:text-white" };
const _hoisted_9 = { class: "ml-auto" };
const _hoisted_10 = {
  key: 0,
  class: "w-5 h-5 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_11 = {
  key: 1,
  class: "w-5 h-5 text-red-600 dark:text-red-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_12 = {
  key: 0,
  class: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
};
const _hoisted_13 = { class: "font-medium text-yellow-800 dark:text-yellow-200 mb-2" };
const _hoisted_14 = { class: "text-yellow-700 dark:text-yellow-300 text-sm" };
const _hoisted_15 = { class: "flex justify-between items-center" };
const _hoisted_16 = { class: "flex items-center space-x-4" };
const _hoisted_17 = {
  key: 1,
  class: "text-sm text-blue-600 dark:text-blue-400"
};
const _hoisted_18 = { class: "flex space-x-4" };
const _hoisted_19 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultipleChoiceExercise",
  props: {
    question: {},
    questionIndex: {},
    totalQuestions: {}
  },
  emits: ["answer", "next", "complete"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      const translated = params ? t(key, params) : t(key);
      const text = typeof translated === "string" ? translated : String(translated);
      if (text === key) return fallback;
      return text;
    };
    const { playAudio } = useVoiceStore();
    const props = __props;
    const emit = __emit;
    const selectedOption = ref(null);
    const showAnswer = ref(false);
    const showHint = ref(false);
    const correctAnswerIndex = computed(() => {
      return props.question.options.findIndex((option) => option === props.question.correctAnswer);
    });
    const selectOption = (index) => {
      if (!showAnswer.value) {
        selectedOption.value = index;
      }
    };
    const checkAnswer = () => {
      if (selectedOption.value === null) return;
      showAnswer.value = true;
      const isCorrect = selectedOption.value === correctAnswerIndex.value;
      const userAnswer = props.question.options[selectedOption.value];
      emit("answer", {
        isCorrect,
        userAnswer,
        correctAnswer: props.question.correctAnswer
      });
    };
    const nextQuestion = () => {
      if (props.questionIndex === props.totalQuestions - 1) {
        emit("complete");
      } else {
        selectedOption.value = null;
        showAnswer.value = false;
        showHint.value = false;
        emit("next");
      }
    };
    const playQuestionAudio = async () => {
      if (props.question.audio) {
        try {
          await playAudio(props.question.question);
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h3", _hoisted_3, toDisplayString(_ctx.question.question), 1),
          _ctx.question.audio ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: playQuestionAudio,
              class: "flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            }, [
              _cache[1] || (_cache[1] = createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.playAudio", "Play audio")), 1)
            ])
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.options, (option, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              onClick: ($event) => selectOption(index),
              class: normalizeClass([
                "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                selectedOption.value === index ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gray-50 dark:bg-[#0a0a0a]/50",
                showAnswer.value && index === correctAnswerIndex.value ? "border-green-500 bg-green-50 dark:bg-green-900/30" : "",
                showAnswer.value && selectedOption.value === index && selectedOption.value !== correctAnswerIndex.value ? "border-red-500 bg-red-50 dark:bg-red-900/30" : ""
              ])
            }, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", {
                  class: normalizeClass([
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                    selectedOption.value === index ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 dark:border-white/10 text-gray-500 dark:text-white/60",
                    showAnswer.value && index === correctAnswerIndex.value ? "border-green-500 bg-green-500 text-white" : "",
                    showAnswer.value && selectedOption.value === index && selectedOption.value !== correctAnswerIndex.value ? "border-red-500 bg-red-500 text-white" : ""
                  ])
                }, toDisplayString(String.fromCharCode(65 + index)), 3),
                createBaseVNode("span", _hoisted_8, toDisplayString(option), 1),
                createBaseVNode("div", _hoisted_9, [
                  showAnswer.value && index === correctAnswerIndex.value ? (openBlock(), createElementBlock("svg", _hoisted_10, _cache[2] || (_cache[2] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    }, null, -1)
                  ]))) : showAnswer.value && selectedOption.value === index && selectedOption.value !== correctAnswerIndex.value ? (openBlock(), createElementBlock("svg", _hoisted_11, _cache[3] || (_cache[3] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    }, null, -1)
                  ]))) : createCommentVNode("", true)
                ])
              ])
            ], 10, _hoisted_6);
          }), 128))
        ]),
        showAnswer.value && _ctx.question.explanation ? (openBlock(), createElementBlock("div", _hoisted_12, [
          createBaseVNode("h4", _hoisted_13, toDisplayString(tf("grammar.practice.explanation", "Explanation")), 1),
          createBaseVNode("p", _hoisted_14, toDisplayString(_ctx.question.explanation), 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            !showAnswer.value && _ctx.question.hint ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => showHint.value = !showHint.value),
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white/80 transition-colors"
            }, [
              _cache[4] || (_cache[4] = createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.hint", "Hint")), 1)
            ])) : createCommentVNode("", true),
            showHint.value && _ctx.question.hint ? (openBlock(), createElementBlock("div", _hoisted_17, " 💡 " + toDisplayString(_ctx.question.hint), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_18, [
            !showAnswer.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: checkAnswer,
              disabled: selectedOption.value === null,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(tf("grammar.practice.checkAnswer", "Check answer")), 9, _hoisted_19)) : (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: nextQuestion,
              class: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            }, toDisplayString(_ctx.questionIndex === _ctx.totalQuestions - 1 ? tf("grammar.practice.finish", "Finish") : tf("grammar.practice.next", "Next")), 1))
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=MultipleChoiceExercise-D4ABe5rz.js.map
