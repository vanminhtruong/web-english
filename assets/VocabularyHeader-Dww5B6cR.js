import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = {
  class: "bg-white dark:bg-[#0a0a0a] shadow border-b border-gray-200 dark:border-gray-700",
  "data-vocabulary-header": ""
};
const _hoisted_2 = { class: "max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-4 px-2 xs:py-5 xs:px-3 sm:py-6 sm:px-4 lg:px-8" };
const _hoisted_3 = { class: "flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-0" };
const _hoisted_4 = { class: "text-3xl font-bold text-gray-900 dark:text-white" };
const _hoisted_5 = { class: "mt-2 text-sm text-gray-600 dark:text-gray-300" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyHeader",
  emits: ["add-vocabulary"],
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("vocabulary.title", "Vocabulary")), 1),
              createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("vocabulary.description", "Manage and learn English vocabulary")), 1)
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("add-vocabulary")),
              "data-original-add-button": "",
              class: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg transition-colors"
            }, [
              _cache[1] || (_cache[1] = createBaseVNode("svg", {
                class: "w-4 h-4 xs:w-5 xs:h-5 inline mr-1 xs:mr-2",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                  "clip-rule": "evenodd"
                })
              ], -1)),
              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.addNew", "Add New Word")), 1)
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyHeader-Dww5B6cR.js.map
