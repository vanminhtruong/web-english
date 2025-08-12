import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "hidden xs:inline" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarManagerButton",
  props: {
    date: {}
  },
  emits: ["openGrammarManager"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const openGrammarManager = () => {
      emit("openGrammarManager", props.date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        onClick: openGrammarManager,
        class: "flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 rounded-full border border-dashed border-purple-300 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500",
        "aria-label": unref(t)("grammar.manager.manageGrammar", "Manage Grammar")
      }, [
        _cache[0] || (_cache[0] = createBaseVNode("svg", {
          class: "w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        }, [
          createBaseVNode("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          })
        ], -1)),
        createBaseVNode("span", _hoisted_2, toDisplayString(unref(t)("grammar.manager.manageGrammar", "Manage Grammar")), 1)
      ], 8, _hoisted_1);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=GrammarManagerButton-BlalyMdu.js.map
