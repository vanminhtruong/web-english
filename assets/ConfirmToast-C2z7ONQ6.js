import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = { class: "flex flex-col items-center p-4" };
const _hoisted_2 = { class: "text-center mb-4 text-base font-medium" };
const _hoisted_3 = { class: "flex space-x-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmToast",
  props: {
    message: {},
    confirmText: {},
    cancelText: {},
    onConfirm: { type: Function },
    onCancel: { type: Function }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.message), 1),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => _ctx.onConfirm && _ctx.onConfirm(...args)),
            class: "px-4 py-2 text-sm font-semibold text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          }, toDisplayString(_ctx.confirmText), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => _ctx.onCancel && _ctx.onCancel(...args)),
            class: "px-4 py-2 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          }, toDisplayString(_ctx.cancelText), 1)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ConfirmToast-C2z7ONQ6.js.map
