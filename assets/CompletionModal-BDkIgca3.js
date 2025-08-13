import { d as defineComponent, H as useI18n, b as createBlock, v as openBlock, w as withCtx, c as createElementBlock, e as createCommentVNode, i as withModifiers, y as createVNode, M as Transition, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-CuoIYBVZ.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_2 = { class: "flex items-center justify-between" };
const _hoisted_3 = { class: "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_4 = { class: "px-6 py-6" };
const _hoisted_5 = {
  class: "text-center mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_6 = { class: "text-gray-600 dark:text-gray-300" };
const _hoisted_7 = { class: "grid grid-cols-1 gap-4 mb-6" };
const _hoisted_8 = {
  class: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_9 = { class: "flex items-center justify-between" };
const _hoisted_10 = { class: "flex items-center space-x-2" };
const _hoisted_11 = { class: "font-medium text-green-700 dark:text-green-300" };
const _hoisted_12 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_13 = {
  class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_14 = { class: "flex items-center justify-between" };
const _hoisted_15 = { class: "flex items-center space-x-2" };
const _hoisted_16 = { class: "font-medium text-red-700 dark:text-red-300" };
const _hoisted_17 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_18 = {
  class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_19 = { class: "flex items-center justify-between mb-2" };
const _hoisted_20 = { class: "flex items-center space-x-2" };
const _hoisted_21 = { class: "font-medium text-blue-700 dark:text-blue-300" };
const _hoisted_22 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_23 = { class: "flex items-center justify-between" };
const _hoisted_24 = { class: "font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_25 = { class: "space-y-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CompletionModal",
  props: {
    show: { type: Boolean },
    stats: {},
    cardCount: {}
  },
  emits: ["restart", "go-back"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        "enter-active-class": "transition-all duration-500 ease-out",
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "leave-active-class": "transition-all duration-300 ease-in",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [
          _ctx.show ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm",
            onWheel: _cache[4] || (_cache[4] = withModifiers(() => {
            }, ["prevent"])),
            onTouchmove: _cache[5] || (_cache[5] = withModifiers(() => {
            }, ["prevent"]))
          }, [
            createVNode(Transition, {
              "enter-active-class": "transition-all duration-500 ease-out",
              "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
              "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
              "leave-active-class": "transition-all duration-300 ease-in",
              "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
              "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
            }, {
              default: withCtx(() => [
                _ctx.show ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "w-full max-w-md sm:max-w-lg bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform",
                  onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                  }, ["stop"]))
                }, [
                  createBaseVNode("div", _hoisted_1, [
                    createBaseVNode("div", _hoisted_2, [
                      createBaseVNode("h2", _hoisted_3, [
                        _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }, null, -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("flashcard.completion.title", "Completed!")), 1)
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = ($event) => emit("go-back")),
                        class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      }, _cache[7] || (_cache[7] = [
                        createBaseVNode("svg", {
                          class: "w-6 h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createBaseVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ], -1)
                      ]))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_4, [
                    _cache[11] || (_cache[11] = createBaseVNode("div", {
                      class: "flex justify-center mb-6 animate-fade-in-up",
                      style: { "animation-delay": "0.1s" }
                    }, [
                      createBaseVNode("div", { class: "flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 shadow-lg transform hover:scale-110 transition-all duration-300" }, [
                        createBaseVNode("svg", {
                          class: "h-8 w-8 text-green-600 dark:text-green-400",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                            "clip-rule": "evenodd"
                          })
                        ])
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_5, [
                      createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("flashcard.completion.description", { count: _ctx.cardCount }, `You have completed ${_ctx.cardCount} flashcards.`)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("div", _hoisted_9, [
                          createBaseVNode("div", _hoisted_10, [
                            _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full" }, null, -1)),
                            createBaseVNode("span", _hoisted_11, toDisplayString(unref(t)("flashcard.completion.correct", "Correct")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_12, toDisplayString(_ctx.stats.correct), 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_13, [
                        createBaseVNode("div", _hoisted_14, [
                          createBaseVNode("div", _hoisted_15, [
                            _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-2 h-2 bg-red-500 rounded-full" }, null, -1)),
                            createBaseVNode("span", _hoisted_16, toDisplayString(unref(t)("flashcard.completion.incorrect", "Incorrect")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.stats.incorrect), 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_18, [
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, [
                            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full" }, null, -1)),
                            createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("flashcard.completion.accuracy", "Accuracy")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_22, toDisplayString(_ctx.stats.correct + _ctx.stats.incorrect > 0 ? Math.round(_ctx.stats.correct / (_ctx.stats.correct + _ctx.stats.incorrect) * 100) : 0) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_23, [
                          createBaseVNode("span", _hoisted_24, toDisplayString(unref(t)("flashcard.completion.result", "Result")) + ":", 1),
                          createBaseVNode("span", {
                            class: normalizeClass(["px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105", _ctx.stats.correct + _ctx.stats.incorrect > 0 && Math.round(_ctx.stats.correct / (_ctx.stats.correct + _ctx.stats.incorrect) * 100) >= 70 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shadow-green-200 dark:shadow-green-900" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shadow-red-200 dark:shadow-red-900"])
                          }, toDisplayString(_ctx.stats.correct + _ctx.stats.incorrect > 0 && Math.round(_ctx.stats.correct / (_ctx.stats.correct + _ctx.stats.incorrect) * 100) >= 70 ? unref(t)("flashcard.history.pass", "Pass") : unref(t)("flashcard.history.fail", "Fail")), 3)
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_25, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = ($event) => emit("restart")),
                        class: "w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 animate-fade-in-up",
                        style: { "animation-delay": "0.6s" }
                      }, toDisplayString(unref(t)("common.restart", "Practice Again")), 1),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = ($event) => emit("go-back")),
                        class: "w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 animate-fade-in-up",
                        style: { "animation-delay": "0.7s" }
                      }, toDisplayString(unref(t)("common.back", "Back")), 1)
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 32)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
const CompletionModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ac791bd"]]);
export {
  CompletionModal as default
};
//# sourceMappingURL=CompletionModal-BDkIgca3.js.map
