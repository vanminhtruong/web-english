import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode } from "./vendor-vEVloz7Q.js";
const _hoisted_1 = { class: "text-center py-12" };
const _hoisted_2 = { class: "mt-2 text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_3 = { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_4 = { class: "mt-6" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarEmptyState",
  emits: ["add-lesson"],
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[2] || (_cache[2] = createBaseVNode("svg", {
          class: "mx-auto h-12 w-12 text-gray-400 dark:text-gray-500",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          createBaseVNode("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          })
        ], -1)),
        createBaseVNode("h3", _hoisted_2, toDisplayString(unref(t)("grammar.emptyState.title", "No lessons yet")), 1),
        createBaseVNode("p", _hoisted_3, toDisplayString(unref(t)("grammar.emptyState.description", "Create your first grammar lesson to get started")), 1),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("add-lesson")),
            class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("svg", {
              class: "-ml-1 mr-2 h-5 w-5",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createTextVNode(" " + toDisplayString(unref(t)("grammar.addNewLesson", "Add New Lesson")), 1)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=GrammarEmptyState-D6JGqJCr.js.map
