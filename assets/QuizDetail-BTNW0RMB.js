const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-DtybCwK3.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, e as createCommentVNode, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[300px] xs:min-h-[350px] sm:h-96 select-none" };
const _hoisted_3 = { class: "h-full flex flex-col" };
const _hoisted_4 = { class: "text-center mb-3 sm:mb-4" };
const _hoisted_5 = { class: "px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 bg-yellow-100 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 text-xs xs:text-sm font-medium rounded-full truncate" };
const _hoisted_6 = { class: "text-center mb-3 sm:mb-4 flex-shrink-0" };
const _hoisted_7 = { class: "text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 break-words px-2" };
const _hoisted_8 = { class: "text-xs xs:text-sm text-gray-600 dark:text-gray-300 break-words" };
const _hoisted_9 = { class: "flex-1 flex flex-col justify-center min-h-0" };
const _hoisted_10 = { class: "flex items-center justify-center px-1 xs:px-2" };
const _hoisted_11 = { class: "grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 w-full max-w-xs xs:max-w-sm sm:max-w-lg" };
const _hoisted_12 = { class: "absolute top-1.5 xs:top-2 left-1.5 xs:left-2 w-5 h-5 xs:w-6 xs:h-6 rounded-full text-xs font-semibold flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/80" };
const _hoisted_13 = { class: "text-center px-3 xs:px-4 sm:px-6 break-words" };
const _hoisted_14 = {
  key: 0,
  class: "absolute top-2 right-2 text-green-500"
};
const _hoisted_15 = {
  key: 1,
  class: "absolute top-2 right-2 text-red-500"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizDetail",
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
              createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.entry.extra.quiz.category ? unref(getTopicName)(_ctx.entry.extra.quiz.category) : "Unknown Category"), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("h2", _hoisted_7, toDisplayString(_ctx.entry.extra.quiz.question), 1),
              createBaseVNode("p", _hoisted_8, toDisplayString(_ctx.entry.extra.quiz.pronunciation), 1),
              _cache[0] || (_cache[0] = createBaseVNode("p", { class: "text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1" }, "Choose the correct meaning:", -1))
            ]),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.quiz.options, (option, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: normalizeClass([
                        "relative p-2 xs:p-3 sm:p-4 text-center rounded-md sm:rounded-lg border-2 font-semibold text-xs xs:text-sm min-h-[50px] xs:min-h-[60px] flex items-center justify-center cursor-not-allowed",
                        option === _ctx.entry.extra.quiz.correctAnswer ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700" : option === _ctx.entry.extra.quiz.selectedAnswer ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700" : "bg-white dark:bg-gray-custom text-gray-900 dark:text-white border-gray-300 dark:border-gray-custom/60"
                      ])
                    }, [
                      createBaseVNode("span", _hoisted_12, toDisplayString(String.fromCharCode(65 + index)), 1),
                      createBaseVNode("span", _hoisted_13, toDisplayString(option), 1),
                      option === _ctx.entry.extra.quiz.correctAnswer ? (openBlock(), createElementBlock("span", _hoisted_14, _cache[1] || (_cache[1] = [
                        createBaseVNode("svg", {
                          class: "w-5 h-5",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)
                      ]))) : option === _ctx.entry.extra.quiz.selectedAnswer && option !== _ctx.entry.extra.quiz.correctAnswer ? (openBlock(), createElementBlock("span", _hoisted_15, _cache[2] || (_cache[2] = [
                        createBaseVNode("svg", {
                          class: "w-5 h-5",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)
                      ]))) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ])
              ])
            ])
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": _ctx.entry.extra.quiz.selectedAnswer,
          "correct-answer": _ctx.entry.extra.quiz.correctAnswer,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizDetail-BTNW0RMB.js.map
