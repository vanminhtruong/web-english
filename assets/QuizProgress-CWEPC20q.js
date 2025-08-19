import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, a as normalizeStyle } from "./vendor-kzGOnAa-.js";
const _hoisted_1 = { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4" };
const _hoisted_2 = { class: "flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2" };
const _hoisted_3 = { class: "w-full bg-gray-200 rounded-full h-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizProgress",
  props: {
    currentQuestionIndex: {},
    totalQuestions: {},
    progressPercentage: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("span", null, toDisplayString(unref(t)("quiz.progress.question")) + " " + toDisplayString(_ctx.currentQuestionIndex + 1) + " / " + toDisplayString(_ctx.totalQuestions), 1),
          createBaseVNode("span", null, toDisplayString(Math.round(_ctx.progressPercentage)) + "%", 1)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", {
            class: "bg-purple-500 h-2 rounded-full transition-all duration-300",
            style: normalizeStyle({ width: _ctx.progressPercentage + "%" })
          }, null, 4)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizProgress-CWEPC20q.js.map
