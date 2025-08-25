const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-C8A7QfHx.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, e as createCommentVNode, F as Fragment, j as renderList, n as normalizeClass, g as createTextVNode, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] max-h-[500px] flex flex-col select-none" };
const _hoisted_3 = { class: "text-center mb-3 sm:mb-4" };
const _hoisted_4 = { class: "px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-purple-300 text-xs xs:text-sm font-medium rounded-full truncate" };
const _hoisted_5 = { class: "text-center mb-4 sm:mb-6" };
const _hoisted_6 = { class: "text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 break-words px-2" };
const _hoisted_7 = {
  key: 0,
  class: "text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300"
};
const _hoisted_8 = {
  key: 1,
  class: "text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300"
};
const _hoisted_9 = { class: "flex-1 flex flex-col justify-center min-h-0" };
const _hoisted_10 = {
  key: 0,
  class: "max-w-xs xs:max-w-sm sm:max-w-lg mx-auto w-full px-2"
};
const _hoisted_11 = { class: "relative" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { class: "absolute right-2 xs:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" };
const _hoisted_14 = {
  key: 0,
  class: "text-green-500"
};
const _hoisted_15 = {
  key: 1,
  class: "text-red-500"
};
const _hoisted_16 = {
  key: 0,
  class: "mt-2 xs:mt-3 text-center"
};
const _hoisted_17 = { class: "text-sm xs:text-base sm:text-lg md:text-xl font-bold text-green-600 dark:text-green-400 break-words" };
const _hoisted_18 = {
  key: 1,
  class: "w-full px-2 sm:px-3 md:px-0"
};
const _hoisted_19 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 justify-items-stretch w-full" };
const _hoisted_20 = { class: "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0" };
const _hoisted_21 = { class: "truncate overflow-hidden min-w-0" };
const _hoisted_22 = { class: "mt-3 sm:mt-4 text-center px-2" };
const _hoisted_23 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium text-sm sm:text-base"
};
const _hoisted_24 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium text-sm sm:text-base break-words"
};
const _hoisted_25 = { class: "font-bold" };
const _hoisted_26 = { class: "text-center mt-4 flex-shrink-0" };
const _hoisted_27 = {
  key: 0,
  disabled: "",
  class: "bg-gray-300 text-white px-6 py-2 rounded-full font-medium cursor-not-allowed text-sm"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TypingDetail",
  props: {
    entry: {}
  },
  setup(__props) {
    const ResultSummary = defineAsyncComponent(() => __vitePreload(() => import("./ResultSummary-B87l5N3_.js"), true ? __vite__mapDeps([0,1]) : void 0));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("span", _hoisted_4, toDisplayString(_ctx.entry.extra.typing.category ? unref(getTopicName)(_ctx.entry.extra.typing.category) : "Unknown Category"), 1)
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.entry.extra.typing.question), 1),
            !_ctx.entry.extra.typing.isQuizMode ? (openBlock(), createElementBlock("p", _hoisted_7, "Type the corresponding English word:")) : (openBlock(), createElementBlock("p", _hoisted_8, "Choose the correct English word:"))
          ]),
          createBaseVNode("div", _hoisted_9, [
            !_ctx.entry.extra.typing.isQuizMode ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("input", {
                  value: _ctx.entry.extra.typing.userAnswer || "",
                  type: "text",
                  disabled: "",
                  readonly: "",
                  class: "w-full px-8 xs:px-10 sm:px-12 py-2 xs:py-3 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed",
                  placeholder: "Type the word..."
                }, null, 8, _hoisted_12),
                createBaseVNode("div", _hoisted_13, [
                  _ctx.entry.isCorrect === true ? (openBlock(), createElementBlock("span", _hoisted_14, _cache[0] || (_cache[0] = [
                    createBaseVNode("svg", {
                      class: "w-4 h-4 xs:w-5 xs:h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)
                  ]))) : (openBlock(), createElementBlock("span", _hoisted_15, _cache[1] || (_cache[1] = [
                    createBaseVNode("svg", {
                      class: "w-4 h-4 xs:w-5 xs:h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)
                  ])))
                ])
              ]),
              _ctx.entry.isCorrect !== true ? (openBlock(), createElementBlock("div", _hoisted_16, [
                _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-gray-600 dark:text-gray-400 text-xs xs:text-sm" }, "Correct answer:", -1)),
                createBaseVNode("p", _hoisted_17, toDisplayString(_ctx.entry.extra.typing.correctAnswer), 1)
              ])) : createCommentVNode("", true)
            ])) : (openBlock(), createElementBlock("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.typing.options || [], (opt, idx) => {
                  return openBlock(), createElementBlock("div", {
                    key: idx,
                    class: normalizeClass(["px-3 py-1.5 sm:py-2 rounded-md border text-[13px] sm:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-2 w-full min-w-0", [
                      opt === _ctx.entry.extra.typing.correctAnswer ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : opt === _ctx.entry.extra.typing.selectedOption ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60"
                    ]])
                  }, [
                    createBaseVNode("span", _hoisted_20, toDisplayString(String.fromCharCode(65 + idx)), 1),
                    createBaseVNode("span", _hoisted_21, toDisplayString(opt), 1)
                  ], 2);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_22, [
                _ctx.entry.isCorrect === true ? (openBlock(), createElementBlock("p", _hoisted_23, "✓ Correct!")) : (openBlock(), createElementBlock("p", _hoisted_24, [
                  _cache[3] || (_cache[3] = createTextVNode("✗ Correct answer: ")),
                  createBaseVNode("span", _hoisted_25, toDisplayString(_ctx.entry.extra.typing.correctAnswer), 1)
                ]))
              ])
            ]))
          ]),
          createBaseVNode("div", _hoisted_26, [
            !_ctx.entry.extra.typing.isQuizMode ? (openBlock(), createElementBlock("button", _hoisted_27, " Check ")) : createCommentVNode("", true)
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": _ctx.entry.extra.typing.isQuizMode ? _ctx.entry.extra.typing.selectedOption || "No answer" : _ctx.entry.extra.typing.userAnswer || "No answer",
          "correct-answer": _ctx.entry.extra.typing.correctAnswer,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=TypingDetail-DaceDfr8.js.map
