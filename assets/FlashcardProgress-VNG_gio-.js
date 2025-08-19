import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, a as normalizeStyle } from "./vendor-kzGOnAa-.js";
const _hoisted_1 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" };
const _hoisted_2 = { class: "w-full bg-gray-200 dark:bg-[#0f0f0f] rounded-full h-1.5 sm:h-2 md:h-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardProgress",
  props: {
    progressPercentage: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", {
            class: "bg-blue-500 rounded-full transition-all duration-300 h-1.5 sm:h-2 md:h-3",
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
//# sourceMappingURL=FlashcardProgress-VNG_gio-.js.map
