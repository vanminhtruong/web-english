import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString } from "./vendor-vEVloz7Q.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] shadow" };
const _hoisted_2 = { class: "max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8" };
const _hoisted_3 = { class: "flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center" };
const _hoisted_5 = { class: "flex items-center space-x-4" };
const _hoisted_6 = { class: "text-right" };
const _hoisted_7 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_8 = { class: "text-right" };
const _hoisted_9 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizHeader",
  props: {
    timeRemaining: {},
    score: {}
  },
  emits: ["go-back"],
  setup(__props, { emit: __emit }) {
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("go-back")),
                class: "mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }, _cache[1] || (_cache[1] = [
                createBaseVNode("svg", {
                  class: "w-6 h-6",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ])),
              _cache[2] || (_cache[2] = createBaseVNode("div", null, [
                createBaseVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white" }, "Quiz"),
                createBaseVNode("p", { class: "mt-2 text-sm text-gray-600 dark:text-gray-400" }, "Kiểm tra kiến thức của bạn")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Thời gian", -1)),
                createBaseVNode("p", _hoisted_7, toDisplayString(formatTime(_ctx.timeRemaining)), 1)
              ]),
              createBaseVNode("div", _hoisted_8, [
                _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Điểm", -1)),
                createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.score), 1)
              ])
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
//# sourceMappingURL=QuizHeader-CzIxvuv4.js.map
