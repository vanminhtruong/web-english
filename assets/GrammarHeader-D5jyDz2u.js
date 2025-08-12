import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode } from "./vendor-vEVloz7Q.js";
const _hoisted_1 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6" };
const _hoisted_2 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "flex items-center mb-1" };
const _hoisted_5 = { class: "text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" };
const _hoisted_6 = { class: "mt-1 text-sm text-gray-700 dark:text-white/70" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarHeader",
  emits: ["add-lesson"],
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_4, [
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                ], -1)),
                createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("grammar.title", "Grammar")), 1)
              ]),
              createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("grammar.description", "Master English grammar with structured lessons and practice")), 1)
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("add-lesson")),
              class: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow"
            }, [
              _cache[2] || (_cache[2] = createBaseVNode("svg", {
                class: "w-5 h-5 inline mr-2",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                  "clip-rule": "evenodd"
                })
              ], -1)),
              createTextVNode(" " + toDisplayString(unref(t)("grammar.addLesson", "Add Lesson")), 1)
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
//# sourceMappingURL=GrammarHeader-D5jyDz2u.js.map
