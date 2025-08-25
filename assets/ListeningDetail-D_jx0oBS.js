const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-DtybCwK3.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[280px] xs:min-h-[320px] sm:h-auto md:h-96 select-none" };
const _hoisted_3 = { class: "text-center h-full flex flex-col justify-center" };
const _hoisted_4 = { class: "mb-4 sm:mb-6" };
const _hoisted_5 = { class: "px-2 py-1 xs:px-3 xs:py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full truncate" };
const _hoisted_6 = {
  key: 0,
  class: "text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2"
};
const _hoisted_7 = {
  key: 1,
  class: "text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2"
};
const _hoisted_8 = {
  key: 2,
  class: "max-w-xs xs:max-w-sm sm:max-w-md mx-auto px-2"
};
const _hoisted_9 = ["value"];
const _hoisted_10 = { class: "mt-3 xs:mt-4" };
const _hoisted_11 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium text-xs xs:text-sm sm:text-base"
};
const _hoisted_12 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium text-xs xs:text-sm sm:text-base break-words"
};
const _hoisted_13 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 xs:mt-2 break-words" };
const _hoisted_14 = {
  key: 3,
  class: "w-full px-2 sm:px-3 md:px-0"
};
const _hoisted_15 = { class: "grid grid-cols-1 xs:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3 justify-items-stretch w-full max-w-xs xs:max-w-sm" };
const _hoisted_16 = { class: "inline-flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0" };
const _hoisted_17 = { class: "truncate overflow-hidden min-w-0" };
const _hoisted_18 = { class: "mt-3 xs:mt-4 text-center px-2" };
const _hoisted_19 = {
  key: 0,
  class: "text-green-600 dark:text-green-400 font-medium text-xs xs:text-sm sm:text-base"
};
const _hoisted_20 = {
  key: 1,
  class: "text-red-600 dark:text-red-400 font-medium text-xs xs:text-sm sm:text-base break-words"
};
const _hoisted_21 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 xs:mt-2 break-words" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListeningDetail",
  props: {
    entry: {}
  },
  setup(__props) {
    const ResultSummary = defineAsyncComponent(() => __vitePreload(() => import("./ResultSummary-B87l5N3_.js"), true ? __vite__mapDeps([0,1]) : void 0));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.entry.extra.listening.category ? unref(getTopicName)(_ctx.entry.extra.listening.category) : "Unknown Category"), 1)
            ]),
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "mb-6 sm:mb-8" }, [
              createBaseVNode("button", {
                disabled: "",
                class: "bg-gray-400 text-white p-4 xs:p-5 sm:p-6 rounded-full cursor-not-allowed"
              }, [
                createBaseVNode("svg", {
                  class: "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
                    "clip-rule": "evenodd"
                  })
                ])
              ])
            ], -1)),
            !_ctx.entry.extra.listening.isQuizMode ? (openBlock(), createElementBlock("p", _hoisted_6, "Listen and type the word you hear:")) : (openBlock(), createElementBlock("p", _hoisted_7, "Choose the word you hear:")),
            !_ctx.entry.extra.listening.isQuizMode ? (openBlock(), createElementBlock("div", _hoisted_8, [
              createBaseVNode("input", {
                value: _ctx.entry.extra.listening.userAnswer || "",
                type: "text",
                disabled: "",
                readonly: "",
                class: "w-full p-2 xs:p-3 sm:p-4 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed",
                placeholder: "Type the word you hear..."
              }, null, 8, _hoisted_9),
              createBaseVNode("div", _hoisted_10, [
                _ctx.entry.isCorrect === true ? (openBlock(), createElementBlock("p", _hoisted_11, "✓ Correct!")) : (openBlock(), createElementBlock("p", _hoisted_12, "✗ Correct answer: " + toDisplayString(_ctx.entry.extra.listening.correctAnswer), 1)),
                createBaseVNode("p", _hoisted_13, toDisplayString(_ctx.entry.meaningShort), 1)
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.listening.options || [], (opt, idx) => {
                  return openBlock(), createElementBlock("div", {
                    key: idx,
                    class: normalizeClass(["px-2 xs:px-3 py-1.5 xs:py-2 rounded border text-xs xs:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-1.5 xs:gap-2 w-full min-w-0", [
                      opt === _ctx.entry.extra.listening.correctAnswer ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : opt === _ctx.entry.extra.listening.selectedOption ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60"
                    ]])
                  }, [
                    createBaseVNode("span", _hoisted_16, toDisplayString(String.fromCharCode(65 + idx)), 1),
                    createBaseVNode("span", _hoisted_17, toDisplayString(opt), 1)
                  ], 2);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_18, [
                _ctx.entry.isCorrect === true ? (openBlock(), createElementBlock("p", _hoisted_19, "✓ Correct!")) : (openBlock(), createElementBlock("p", _hoisted_20, "✗ Correct answer: " + toDisplayString(_ctx.entry.extra.listening.correctAnswer), 1)),
                createBaseVNode("p", _hoisted_21, toDisplayString(_ctx.entry.meaningShort), 1)
              ])
            ]))
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": _ctx.entry.extra.listening.isQuizMode ? _ctx.entry.extra.listening.selectedOption || "No answer" : _ctx.entry.extra.listening.userAnswer || "No answer",
          "correct-answer": _ctx.entry.extra.listening.correctAnswer,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ListeningDetail-D_jx0oBS.js.map
