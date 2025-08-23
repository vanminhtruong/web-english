import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass, F as Fragment, j as renderList } from "./vendor-BIIJCJs6.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700" };
const _hoisted_2 = { class: "mb-8" };
const _hoisted_3 = { class: "flex items-center justify-between mb-4" };
const _hoisted_4 = { class: "px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full" };
const _hoisted_5 = { class: "text-xl font-semibold text-gray-900 dark:text-white mb-6" };
const _hoisted_6 = { class: "space-y-3" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "flex items-center" };
const _hoisted_9 = {
  key: 0,
  class: "text-white text-sm font-bold"
};
const _hoisted_10 = {
  key: 1,
  class: "text-gray-500 text-sm font-bold"
};
const _hoisted_11 = { class: "text-gray-900 dark:text-white" };
const _hoisted_12 = { class: "flex justify-between" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizQuestion",
  props: {
    question: {},
    selectedAnswer: {},
    isFirstQuestion: { type: Boolean },
    isLastQuestion: { type: Boolean }
  },
  emits: ["select-answer", "previous-question", "next-question"],
  setup(__props, { emit: __emit }) {
    const getLevelColor = (level) => {
      switch (level) {
        case "beginner":
          return "bg-green-100 text-green-800";
        case "intermediate":
          return "bg-yellow-100 text-yellow-800";
        case "advanced":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const { t } = useI18n();
    const getLevelText = (level) => {
      switch (level) {
        case "beginner":
          return t("levels.beginner");
        case "intermediate":
          return t("levels.intermediate");
        case "advanced":
          return t("levels.advanced");
        default:
          return level;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("span", _hoisted_4, toDisplayString(_ctx.question.type === "vocabulary" ? unref(t)("quiz.types.vocabulary") : unref(t)("quiz.types.grammar")), 1),
            createBaseVNode("span", {
              class: normalizeClass([getLevelColor(_ctx.question.level), "px-3 py-1 text-sm font-medium rounded-full"])
            }, toDisplayString(getLevelText(_ctx.question.level)), 3)
          ]),
          createBaseVNode("h3", _hoisted_5, toDisplayString(_ctx.question.question), 1),
          createBaseVNode("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.options, (option, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                onClick: ($event) => _ctx.$emit("select-answer", index),
                class: normalizeClass([
                  "p-4 border-2 rounded-lg cursor-pointer transition-all",
                  _ctx.selectedAnswer === index ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                ])
              }, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("div", {
                    class: normalizeClass([
                      "w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center",
                      _ctx.selectedAnswer === index ? "border-purple-500 bg-purple-500" : "border-gray-300"
                    ])
                  }, [
                    _ctx.selectedAnswer === index ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(String.fromCharCode(65 + index)), 1)) : (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(String.fromCharCode(65 + index)), 1))
                  ], 2),
                  createBaseVNode("span", _hoisted_11, toDisplayString(option), 1)
                ])
              ], 10, _hoisted_7);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("previous-question")),
            disabled: _ctx.isFirstQuestion,
            class: "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          }, toDisplayString(unref(t)("quiz.navigation.previous")), 9, _hoisted_13),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("next-question")),
            disabled: _ctx.selectedAnswer === null,
            class: "bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          }, toDisplayString(_ctx.isLastQuestion ? unref(t)("quiz.navigation.finish") : unref(t)("quiz.navigation.next")), 9, _hoisted_14)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizQuestion-BrBTDn4c.js.map
