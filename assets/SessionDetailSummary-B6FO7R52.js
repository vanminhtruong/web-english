import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = { class: "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm" };
const _hoisted_2 = { class: "bg-blue-50 dark:bg-blue-900/30 rounded-md sm:rounded-lg p-2 sm:p-3" };
const _hoisted_3 = { class: "text-gray-500 dark:text-white/70 text-xs sm:text-sm" };
const _hoisted_4 = { class: "text-gray-900 dark:text-white font-semibold text-sm sm:text-base" };
const _hoisted_5 = { class: "bg-green-50 dark:bg-green-900/30 rounded-md sm:rounded-lg p-2 sm:p-3" };
const _hoisted_6 = { class: "text-gray-500 dark:text-white/70 text-xs sm:text-sm" };
const _hoisted_7 = { class: "text-green-700 dark:text-green-400 font-semibold text-sm sm:text-base" };
const _hoisted_8 = { class: "bg-red-50 dark:bg-red-900/30 rounded-md sm:rounded-lg p-2 sm:p-3" };
const _hoisted_9 = { class: "text-gray-500 dark:text-white/70 text-xs sm:text-sm" };
const _hoisted_10 = { class: "text-red-700 dark:text-red-400 font-semibold text-sm sm:text-base" };
const _hoisted_11 = { class: "bg-indigo-50 dark:bg-indigo-900/30 rounded-md sm:rounded-lg p-2 sm:p-3 col-span-1 xs:col-span-2 md:col-span-1" };
const _hoisted_12 = { class: "text-gray-500 dark:text-white/70 text-xs sm:text-sm" };
const _hoisted_13 = { class: "text-indigo-700 dark:text-indigo-300 font-semibold text-sm sm:text-base truncate" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SessionDetailSummary",
  props: {
    details: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, toDisplayString(unref(t)("flashcard.history.totalCards", "Total Cards")), 1),
          createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.details.total), 1)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, toDisplayString(unref(t)("flashcard.history.correct", "Correct")), 1),
          createBaseVNode("div", _hoisted_7, toDisplayString(_ctx.details.correct), 1)
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, toDisplayString(unref(t)("flashcard.history.incorrect", "Incorrect")), 1),
          createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.details.incorrect), 1)
        ]),
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("div", _hoisted_12, toDisplayString(unref(t)("flashcard.modes.mode", "Mode")), 1),
          createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.details.mode), 1)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=SessionDetailSummary-B6FO7R52.js.map
