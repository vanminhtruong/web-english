import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-DI3yOcyn.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6" };
const _hoisted_2 = { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4" };
const _hoisted_3 = { class: "flex items-center space-x-4 sm:space-x-4" };
const _hoisted_4 = { class: "flex flex-col space-y-0.5 sm:space-y-1" };
const _hoisted_5 = { class: "text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_6 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TopicManagerPanel",
  emits: ["open"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[1] || (_cache[1] = createBaseVNode("svg", {
              class: "w-5 h-5 text-gray-500 dark:text-gray-400",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h3", _hoisted_5, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1),
              createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("vocabulary.topicManager.builtInTopicsDescription", "Manage built-in topics and categories")), 1)
            ])
          ]),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => emit("open")),
            class: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 self-start md:self-auto mt-3 sm:mt-3 md:mt-0 w-full md:w-auto"
          }, [
            _cache[2] || (_cache[2] = createBaseVNode("svg", {
              class: "h-4 w-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
              })
            ], -1)),
            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.topicManager.manageTopics", "Manage Topics")), 1)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=TopicManagerPanel-DQWxd9Fo.js.map
