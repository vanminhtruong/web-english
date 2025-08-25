import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, n as normalizeClass } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = { class: "grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute" };
const _hoisted_3 = { class: "text-gray-500 dark:text-white/70 text-xs font-medium mb-1" };
const _hoisted_4 = { class: "font-semibold text-gray-900 dark:text-white break-words text-xs xs:text-sm" };
const _hoisted_5 = { class: "bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute" };
const _hoisted_6 = { class: "text-gray-500 dark:text-white/70 text-xs font-medium mb-1" };
const _hoisted_7 = { class: "font-semibold text-emerald-600 dark:text-emerald-400 break-words text-xs xs:text-sm" };
const _hoisted_8 = { class: "bg-white dark:bg-[#0a0a0a] rounded p-2 sm:p-3 border border-gray-200 dark:border-dark-bg-mute" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResultSummary",
  props: {
    userAnswer: {},
    correctAnswer: {},
    isCorrect: { type: Boolean },
    userAnswerLabel: {},
    correctAnswerLabel: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.userAnswerLabel), 1),
          createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.userAnswer || "No answer"), 1)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.correctAnswerLabel), 1),
          createBaseVNode("div", _hoisted_7, toDisplayString(_ctx.correctAnswer), 1)
        ]),
        createBaseVNode("div", _hoisted_8, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-gray-500 dark:text-white/70 text-xs font-medium mb-1" }, "Result", -1)),
          createBaseVNode("div", {
            class: normalizeClass(["font-semibold text-xs xs:text-sm", _ctx.isCorrect === true ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"])
          }, toDisplayString(_ctx.isCorrect === true ? "✓ Correct" : "✗ Incorrect"), 3)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ResultSummary-B87l5N3_.js.map
