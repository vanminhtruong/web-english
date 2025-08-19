import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass, F as Fragment, j as renderList, e as createCommentVNode, g as createTextVNode } from "./vendor-kzGOnAa-.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700" };
const _hoisted_2 = { class: "text-center mb-8" };
const _hoisted_3 = { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" };
const _hoisted_4 = { class: "text-gray-600 dark:text-gray-400" };
const _hoisted_5 = { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" };
const _hoisted_6 = { class: "text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg" };
const _hoisted_7 = { class: "text-3xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_8 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_9 = { class: "text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg" };
const _hoisted_10 = { class: "text-3xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_11 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_12 = { class: "text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg" };
const _hoisted_13 = { class: "text-3xl font-bold text-purple-600 dark:text-purple-400" };
const _hoisted_14 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_15 = { class: "text-center mb-8" };
const _hoisted_16 = { class: "mb-8" };
const _hoisted_17 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_18 = { class: "space-y-4" };
const _hoisted_19 = { class: "flex items-start justify-between mb-2" };
const _hoisted_20 = { class: "font-medium text-gray-900 dark:text-white" };
const _hoisted_21 = {
  key: 0,
  class: "text-green-600"
};
const _hoisted_22 = {
  key: 1,
  class: "text-red-600"
};
const _hoisted_23 = { class: "text-sm text-gray-600 dark:text-gray-400 mb-1" };
const _hoisted_24 = { class: "font-medium" };
const _hoisted_25 = {
  key: 0,
  class: "text-sm text-red-600"
};
const _hoisted_26 = { class: "font-medium" };
const _hoisted_27 = {
  key: 1,
  class: "text-sm text-gray-500 mt-2"
};
const _hoisted_28 = { class: "font-medium" };
const _hoisted_29 = { class: "flex justify-center space-x-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizResults",
  props: {
    questions: {},
    userAnswers: {},
    score: {},
    correctAnswers: {},
    totalQuestions: {},
    accuracy: {}
  },
  emits: ["restart-quiz", "go-back"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4" }, [
            createBaseVNode("svg", {
              class: "h-8 w-8 text-green-600 dark:text-green-400",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                "clip-rule": "evenodd"
              })
            ])
          ], -1)),
          createBaseVNode("h2", _hoisted_3, toDisplayString(unref(t)("quiz.results.completed")), 1),
          createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("quiz.results.yourResults")), 1)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.score), 1),
            createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("quiz.results.score")), 1)
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("p", _hoisted_10, toDisplayString(_ctx.correctAnswers) + "/" + toDisplayString(_ctx.totalQuestions), 1),
            createBaseVNode("p", _hoisted_11, toDisplayString(unref(t)("quiz.results.correct")), 1)
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("p", _hoisted_13, toDisplayString(Math.round(_ctx.accuracy)) + "%", 1),
            createBaseVNode("p", _hoisted_14, toDisplayString(unref(t)("quiz.results.accuracy")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("span", {
            class: normalizeClass(["inline-block px-4 py-2 text-sm font-medium rounded-full", _ctx.accuracy >= 70 ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"])
          }, toDisplayString(_ctx.accuracy >= 70 ? unref(t)("quiz.results.passed") : unref(t)("quiz.results.failed")) + " (" + toDisplayString(_ctx.accuracy >= 70 ? unref(t)("quiz.results.above") : unref(t)("quiz.results.below")) + " 70%) ", 3)
        ]),
        createBaseVNode("div", _hoisted_16, [
          createBaseVNode("h3", _hoisted_17, toDisplayString(unref(t)("quiz.results.reviewAnswers")), 1),
          createBaseVNode("div", _hoisted_18, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.questions, (question, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "border border-gray-200 dark:border-gray-600 rounded-lg p-4"
              }, [
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("p", _hoisted_20, toDisplayString(index + 1) + ". " + toDisplayString(question.question), 1),
                  _ctx.userAnswers[index] === question.correctAnswer ? (openBlock(), createElementBlock("span", _hoisted_21, _cache[3] || (_cache[3] = [
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
                  ]))) : (openBlock(), createElementBlock("span", _hoisted_22, _cache[4] || (_cache[4] = [
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
                  ])))
                ]),
                createBaseVNode("p", _hoisted_23, [
                  createBaseVNode("span", _hoisted_24, toDisplayString(unref(t)("quiz.results.correctAnswer")) + ":", 1),
                  createTextVNode(" " + toDisplayString(question.options[question.correctAnswer]), 1)
                ]),
                _ctx.userAnswers[index] !== question.correctAnswer ? (openBlock(), createElementBlock("p", _hoisted_25, [
                  createBaseVNode("span", _hoisted_26, toDisplayString(unref(t)("quiz.results.yourAnswer")) + ":", 1),
                  createTextVNode(" " + toDisplayString(question.options[_ctx.userAnswers[index]] || unref(t)("quiz.results.noAnswer")), 1)
                ])) : createCommentVNode("", true),
                question.explanation ? (openBlock(), createElementBlock("p", _hoisted_27, [
                  createBaseVNode("span", _hoisted_28, toDisplayString(unref(t)("quiz.results.explanation")) + ":", 1),
                  createTextVNode(" " + toDisplayString(question.explanation), 1)
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_29, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("restart-quiz")),
            class: "bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          }, toDisplayString(unref(t)("quiz.results.restartQuiz")), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("go-back")),
            class: "bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          }, toDisplayString(unref(t)("common.goBack")), 1)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizResults-DRNIfOMF.js.map
