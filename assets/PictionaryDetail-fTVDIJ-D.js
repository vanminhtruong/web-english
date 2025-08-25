import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, e as createCommentVNode, f as createBaseVNode, u as unref, F as Fragment, j as renderList, t as toDisplayString, n as normalizeClass } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2" };
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = { class: "uppercase tracking-wider" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PictionaryDetail",
  props: {
    entry: {}
  },
  emits: ["openZoom"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const openZoom = (entry) => {
      emit("openZoom", entry);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _ctx.entry.extra?.pictionary?.image ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "flex justify-center xs:justify-start items-center gap-2 xs:gap-3 cursor-zoom-in select-none",
          onClick: _cache[0] || (_cache[0] = ($event) => openZoom(_ctx.entry))
        }, [
          createBaseVNode("img", {
            src: _ctx.entry.extra.pictionary.image,
            alt: unref(t)("flashcard.pictionary.imageAlt", "Pictionary image"),
            class: "w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-contain rounded-md sm:rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-soft"
          }, null, 8, _hoisted_2)
        ])) : createCommentVNode("", true),
        _ctx.entry.extra?.pictionary?.slots && _ctx.entry.extra.pictionary.slots.length ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "flex flex-wrap gap-1 xs:gap-1.5 items-center justify-center xs:justify-start cursor-zoom-in select-none",
          onClick: _cache[1] || (_cache[1] = ($event) => openZoom(_ctx.entry))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.pictionary.slots, (slot, sIdx) => {
            return openBlock(), createElementBlock(Fragment, null, [
              slot.separator ? (openBlock(), createElementBlock("div", {
                key: `sep-${sIdx}`,
                class: "px-0.5 xs:px-1 text-sm xs:text-base text-gray-700 dark:text-white/80 select-none"
              }, toDisplayString(slot.char), 1)) : (openBlock(), createElementBlock("div", {
                key: `box-${sIdx}`,
                class: normalizeClass(["w-6 h-8 xs:w-7 xs:h-9 sm:w-8 sm:h-10 md:w-9 md:h-11 flex items-center justify-center rounded border text-sm xs:text-base sm:text-lg font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute", slot.fixed ? "opacity-90" : ""])
              }, [
                createBaseVNode("span", _hoisted_3, toDisplayString(slot.char || " "), 1)
              ], 2))
            ], 64);
          }), 256))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=PictionaryDetail-fTVDIJ-D.js.map
