const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-DtybCwK3.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, g as createTextVNode, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-3 sm:p-4 md:p-6 min-h-[280px] xs:min-h-[320px] sm:min-h-96 max-h-[500px] select-none" };
const _hoisted_3 = { class: "h-full flex flex-col overflow-hidden" };
const _hoisted_4 = { class: "mb-3 sm:mb-4 text-center" };
const _hoisted_5 = { class: "px-2 py-1 xs:px-3 xs:py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-xs xs:text-sm font-medium rounded-full truncate" };
const _hoisted_6 = { class: "flex-1 flex items-center justify-center mb-3 sm:mb-4 min-h-0" };
const _hoisted_7 = {
  key: 0,
  class: "relative"
};
const _hoisted_8 = ["src"];
const _hoisted_9 = {
  key: 1,
  class: "flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-md sm:rounded-lg p-4 xs:p-6 sm:p-8 w-full max-w-xs xs:max-w-sm"
};
const _hoisted_10 = { class: "space-y-2 sm:space-y-3 flex-shrink-0" };
const _hoisted_11 = { key: 0 };
const _hoisted_12 = ["value"];
const _hoisted_13 = { key: 1 };
const _hoisted_14 = { class: "grid grid-cols-1 xs:grid-cols-2 gap-1.5 xs:gap-2 justify-items-stretch mx-auto max-w-xs xs:max-w-sm sm:max-w-lg" };
const _hoisted_15 = { class: "inline-flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80 shrink-0" };
const _hoisted_16 = { class: "truncate min-w-0" };
const _hoisted_17 = { class: "text-center space-y-1 xs:space-y-2 max-h-24 xs:max-h-32 overflow-y-auto px-2" };
const _hoisted_18 = {
  key: 0,
  class: "w-3 h-3 xs:w-4 xs:h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_19 = {
  key: 1,
  class: "w-3 h-3 xs:w-4 xs:h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_20 = {
  key: 0,
  class: "text-center"
};
const _hoisted_21 = { class: "text-xs xs:text-sm text-gray-600 dark:text-white/70" };
const _hoisted_22 = { class: "font-semibold text-gray-900 dark:text-white break-words" };
const _hoisted_23 = { class: "text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2 break-words" };
const _hoisted_24 = {
  key: 1,
  class: "text-center"
};
const _hoisted_25 = { class: "text-xs xs:text-sm text-gray-600 dark:text-white/70 line-clamp-2 break-words" };
const _hoisted_26 = {
  key: 2,
  class: "text-center text-xs xs:text-sm text-gray-500 dark:text-white/60 px-2"
};
const _hoisted_27 = {
  key: 3,
  class: "text-center text-xs xs:text-sm text-gray-500 dark:text-white/60 px-2"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageDetail",
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
              createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.entry.extra.image.category ? unref(getTopicName)(_ctx.entry.extra.image.category) : "Unknown Category"), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              _ctx.entry.extra.image.image ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("img", {
                  src: _ctx.entry.extra.image.image,
                  alt: "Flashcard image",
                  class: "max-w-full max-h-24 xs:max-h-28 sm:max-h-32 md:max-h-40 object-contain rounded-md sm:rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute"
                }, null, 8, _hoisted_8)
              ])) : (openBlock(), createElementBlock("div", _hoisted_9, _cache[0] || (_cache[0] = [
                createBaseVNode("div", { class: "text-center" }, [
                  createBaseVNode("svg", {
                    class: "mx-auto h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-white/50",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ]),
                  createBaseVNode("p", { class: "text-xs xs:text-sm text-gray-500 dark:text-white/60 mt-1 xs:mt-2" }, "No image available for this card.")
                ], -1)
              ])))
            ]),
            createBaseVNode("div", _hoisted_10, [
              !_ctx.entry.extra.image.isQuizMode ? (openBlock(), createElementBlock("div", _hoisted_11, [
                createBaseVNode("input", {
                  value: _ctx.entry.extra.image.userAnswer || "",
                  type: "text",
                  disabled: "",
                  readonly: "",
                  placeholder: "Enter your answer...",
                  class: "w-full px-3 xs:px-4 py-2 xs:py-3 text-center text-sm xs:text-base sm:text-lg border border-gray-300 dark:border-dark-bg-mute rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 cursor-not-allowed"
                }, null, 8, _hoisted_12)
              ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.image.options || [], (opt, idx) => {
                    return openBlock(), createElementBlock("div", {
                      key: idx,
                      class: normalizeClass(["px-2 xs:px-3 py-1.5 xs:py-2 rounded border text-xs xs:text-sm transition-all duration-150 opacity-70 cursor-not-allowed text-left flex items-center gap-1.5 xs:gap-2 w-full min-w-0", [
                        opt === _ctx.entry.extra.image.correctAnswer ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : opt === _ctx.entry.extra.image.selectedOption ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60"
                      ]])
                    }, [
                      createBaseVNode("span", _hoisted_15, toDisplayString(String.fromCharCode(65 + idx)), 1),
                      createBaseVNode("span", _hoisted_16, toDisplayString(opt), 1)
                    ], 2);
                  }), 128))
                ])
              ])),
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("div", {
                  class: normalizeClass([
                    "inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium",
                    _ctx.entry.isCorrect ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                  ])
                }, [
                  _ctx.entry.isCorrect === true ? (openBlock(), createElementBlock("svg", _hoisted_18, _cache[1] || (_cache[1] = [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    }, null, -1)
                  ]))) : (openBlock(), createElementBlock("svg", _hoisted_19, _cache[2] || (_cache[2] = [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    }, null, -1)
                  ]))),
                  createTextVNode(" " + toDisplayString(_ctx.entry.isCorrect === true ? "Correct" : "Incorrect"), 1)
                ], 2),
                _ctx.entry.isCorrect !== true ? (openBlock(), createElementBlock("div", _hoisted_20, [
                  createBaseVNode("p", _hoisted_21, [
                    _cache[3] || (_cache[3] = createTextVNode(" Correct answer: ")),
                    createBaseVNode("span", _hoisted_22, toDisplayString(_ctx.entry.extra.image.correctAnswer), 1)
                  ]),
                  createBaseVNode("p", _hoisted_23, toDisplayString(_ctx.entry.meaningShort), 1)
                ])) : (openBlock(), createElementBlock("div", _hoisted_24, [
                  createBaseVNode("p", _hoisted_25, toDisplayString(_ctx.entry.meaningShort), 1)
                ]))
              ]),
              !_ctx.entry.extra.image.isQuizMode ? (openBlock(), createElementBlock("p", _hoisted_26, " Type the word for the image above and press Enter. ")) : (openBlock(), createElementBlock("p", _hoisted_27, " Choose the correct word for the image. "))
            ])
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": _ctx.entry.extra.image.isQuizMode ? _ctx.entry.extra.image.selectedOption || "No answer" : _ctx.entry.extra.image.userAnswer || "No answer",
          "correct-answer": _ctx.entry.extra.image.correctAnswer,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ImageDetail-CEUl4sIR.js.map
