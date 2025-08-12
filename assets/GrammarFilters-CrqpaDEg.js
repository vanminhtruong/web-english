import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList } from "./vendor-vEVloz7Q.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6 mb-6" };
const _hoisted_2 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_3 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_4 = ["value", "placeholder"];
const _hoisted_5 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_6 = ["value"];
const _hoisted_7 = { value: "" };
const _hoisted_8 = { value: "beginner" };
const _hoisted_9 = { value: "intermediate" };
const _hoisted_10 = { value: "advanced" };
const _hoisted_11 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { value: "" };
const _hoisted_14 = ["value"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarFilters",
  props: {
    searchQuery: {},
    selectedLevel: {},
    selectedCategory: {},
    categories: {}
  },
  emits: ["update:searchQuery", "update:selectedLevel", "update:selectedCategory"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const handleSearchInput = (event) => {
      const target = event.target;
      emit("update:searchQuery", target.value);
    };
    const handleLevelChange = (event) => {
      const target = event.target;
      emit("update:selectedLevel", target.value);
    };
    const handleCategoryChange = (event) => {
      const target = event.target;
      emit("update:selectedCategory", target.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_3, toDisplayString(unref(t)("common.search", "Search")), 1),
            createBaseVNode("input", {
              value: _ctx.searchQuery,
              onInput: handleSearchInput,
              type: "text",
              placeholder: unref(t)("grammar.search", "Search grammar..."),
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            }, null, 40, _hoisted_4)
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_5, toDisplayString(unref(t)("grammar.level", "Level")), 1),
            createBaseVNode("select", {
              value: _ctx.selectedLevel,
              onChange: handleLevelChange,
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            }, [
              createBaseVNode("option", _hoisted_7, toDisplayString(unref(t)("common.all", "All")), 1),
              createBaseVNode("option", _hoisted_8, toDisplayString(unref(t)("grammar.levels.beginner", "Beginner")), 1),
              createBaseVNode("option", _hoisted_9, toDisplayString(unref(t)("grammar.levels.intermediate", "Intermediate")), 1),
              createBaseVNode("option", _hoisted_10, toDisplayString(unref(t)("grammar.levels.advanced", "Advanced")), 1)
            ], 40, _hoisted_6)
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_11, toDisplayString(unref(t)("grammar.category", "Category")), 1),
            createBaseVNode("select", {
              value: _ctx.selectedCategory,
              onChange: handleCategoryChange,
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            }, [
              createBaseVNode("option", _hoisted_13, toDisplayString(unref(t)("common.all", "All")), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.categories, (category) => {
                return openBlock(), createElementBlock("option", {
                  key: category,
                  value: category
                }, toDisplayString(category), 9, _hoisted_14);
              }), 128))
            ], 40, _hoisted_12)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=GrammarFilters-CrqpaDEg.js.map
