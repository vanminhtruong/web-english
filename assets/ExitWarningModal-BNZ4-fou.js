import { d as defineComponent, H as useI18n, c as createElementBlock, e as createCommentVNode, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-BIIJCJs6.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
};
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl p-8 max-w-md mx-4 text-center" };
const _hoisted_3 = { class: "text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2" };
const _hoisted_4 = { class: "text-sm sm:text-base text-gray-600 dark:text-white/80 mb-6" };
const _hoisted_5 = { class: "flex gap-2 sm:gap-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExitWarningModal",
  props: {
    show: { type: Boolean }
  },
  emits: ["continue", "confirm"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return _ctx.show ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-orange-500 mb-4" }, [
            createBaseVNode("svg", {
              class: "w-16 h-16 mx-auto",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                "clip-rule": "evenodd"
              })
            ])
          ], -1)),
          createBaseVNode("h3", _hoisted_3, toDisplayString(unref(t)("practice.exitWarning.title", "Leave Practice?")), 1),
          createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("practice.exitWarning.message", "Are you sure you want to leave? Your progress will be lost.")), 1),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => emit("continue")),
              class: "flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
            }, toDisplayString(unref(t)("practice.exitWarning.continue", "Stay")), 1),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => emit("confirm")),
              class: "flex-1 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
            }, toDisplayString(unref(t)("practice.exitWarning.exit", "Leave")), 1)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ExitWarningModal-BNZ4-fou.js.map
