import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-DMqe9Z5T.js";
const _hoisted_1 = { class: "text-center py-12" };
const _hoisted_2 = { class: "mt-2 text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_3 = { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_4 = { class: "mt-6" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardEmptyState",
  emits: ["go-to-vocabulary"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[1] || (_cache[1] = createBaseVNode("svg", {
          class: "mx-auto h-12 w-12 text-gray-400 dark:text-gray-500",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          createBaseVNode("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          })
        ], -1)),
        createBaseVNode("h3", _hoisted_2, toDisplayString(unref(t)("flashcard.empty.title", "No flashcards to practice")), 1),
        createBaseVNode("p", _hoisted_3, toDisplayString(unref(t)("flashcard.empty.description", "Add some words to your vocabulary to get started.")), 1),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => emit("go-to-vocabulary")),
            class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          }, toDisplayString(unref(t)("flashcard.empty.action", "Add Vocabulary")), 1)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FlashcardEmptyState-pH-K18hw.js.map
