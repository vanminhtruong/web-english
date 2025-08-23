import { d as defineComponent, M as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-CKTvmtu5.js";
const _hoisted_1 = {
  key: 0,
  class: "grid grid-cols-3 gap-4 mt-8"
};
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800" };
const _hoisted_3 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_4 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_5 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800" };
const _hoisted_6 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_7 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_8 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800" };
const _hoisted_9 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_10 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_11 = {
  key: 1,
  class: "grid grid-cols-2 gap-4 mt-8"
};
const _hoisted_12 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800" };
const _hoisted_13 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_14 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_15 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg p-4 text-center shadow border border-gray-200 dark:border-gray-800" };
const _hoisted_16 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_17 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PracticeStats",
  props: {
    stats: {},
    mode: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return _ctx.mode === "flashcard" ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.stats.easy), 1),
          createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("common.easy", "Easy")), 1)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.stats.reviewed), 1),
          createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("common.reviewed", "Reviewed")), 1)
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.stats.difficult), 1),
          createBaseVNode("p", _hoisted_10, toDisplayString(unref(t)("common.difficult", "Difficult")), 1)
        ])
      ])) : (openBlock(), createElementBlock("div", _hoisted_11, [
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("p", _hoisted_13, toDisplayString(_ctx.stats.correct), 1),
          createBaseVNode("p", _hoisted_14, toDisplayString(unref(t)("common.correct", "Correct")), 1)
        ]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("p", _hoisted_16, toDisplayString(_ctx.stats.incorrect), 1),
          createBaseVNode("p", _hoisted_17, toDisplayString(unref(t)("common.incorrect", "Incorrect")), 1)
        ])
      ]));
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=PracticeStats-DvVETQv8.js.map
