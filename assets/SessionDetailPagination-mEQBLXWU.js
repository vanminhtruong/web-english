import { d as defineComponent, H as useI18n, c as createElementBlock, e as createCommentVNode, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = {
  key: 0,
  class: "flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-0 mb-3 sm:mb-4"
};
const _hoisted_2 = { class: "text-xs sm:text-sm text-gray-500 dark:text-white/70 text-center xs:text-left" };
const _hoisted_3 = { class: "flex items-center gap-1" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 dark:text-white" };
const _hoisted_6 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SessionDetailPagination",
  props: {
    currentPage: {},
    totalPages: {},
    startIndex: {},
    endIndex: {},
    totalEntries: {}
  },
  emits: ["update:current-page"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return _ctx.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, toDisplayString(unref(t)("common.showing", "Showing")) + " " + toDisplayString(_ctx.startIndex + 1) + "-" + toDisplayString(Math.min(_ctx.endIndex, _ctx.totalEntries)) + " " + toDisplayString(unref(t)("common.of", "of")) + " " + toDisplayString(_ctx.totalEntries) + " " + toDisplayString(unref(t)("common.entries", "entries")), 1),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:current-page", _ctx.currentPage - 1)),
            disabled: _ctx.currentPage === 1,
            class: "px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
          }, " ← ", 8, _hoisted_4),
          createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.currentPage) + " / " + toDisplayString(_ctx.totalPages), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:current-page", _ctx.currentPage + 1)),
            disabled: _ctx.currentPage === _ctx.totalPages,
            class: "px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
          }, " → ", 8, _hoisted_6)
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=SessionDetailPagination-mEQBLXWU.js.map
