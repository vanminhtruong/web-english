const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-DtybCwK3.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, e as createCommentVNode, t as toDisplayString, u as unref, n as normalizeClass, g as createTextVNode, F as Fragment, j as renderList, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 min-h-[280px] xs:min-h-[320px] sm:h-auto md:h-96 select-none" };
const _hoisted_3 = { class: "text-center h-full flex flex-col justify-center" };
const _hoisted_4 = { class: "mb-4 sm:mb-6" };
const _hoisted_5 = { class: "px-2 py-1 xs:px-3 xs:py-1 bg-green-100 dark:bg-gray-800 text-green-800 dark:text-green-300 text-xs sm:text-sm font-medium rounded-full truncate" };
const _hoisted_6 = { class: "mb-6 sm:mb-8 space-y-2 sm:space-y-3" };
const _hoisted_7 = { class: "grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 max-w-xs xs:max-w-sm mx-auto" };
const _hoisted_8 = { class: "bg-blue-50 dark:bg-blue-900/20 p-2 xs:p-3 rounded-lg border border-blue-200 dark:border-blue-800" };
const _hoisted_9 = { class: "text-lg xs:text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-300" };
const _hoisted_10 = { class: "bg-green-50 dark:bg-green-900/20 p-2 xs:p-3 rounded-lg border border-green-200 dark:border-green-800" };
const _hoisted_11 = { class: "text-lg xs:text-xl sm:text-2xl font-bold text-green-800 dark:text-green-300" };
const _hoisted_12 = { class: "bg-purple-50 dark:bg-purple-900/20 p-2 xs:p-3 rounded-lg border border-purple-200 dark:border-purple-800" };
const _hoisted_13 = { class: "text-lg xs:text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300" };
const _hoisted_14 = { class: "bg-orange-50 dark:bg-orange-900/20 p-2 xs:p-3 rounded-lg border border-orange-200 dark:border-orange-800" };
const _hoisted_15 = { class: "text-lg xs:text-xl sm:text-2xl font-bold text-orange-800 dark:text-orange-300" };
const _hoisted_16 = { class: "mb-4 sm:mb-6" };
const _hoisted_17 = {
  key: 0,
  class: "w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_18 = {
  key: 1,
  class: "w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_19 = {
  key: 0,
  class: "max-w-xs xs:max-w-sm sm:max-w-md mx-auto"
};
const _hoisted_20 = { class: "flex flex-wrap gap-1 xs:gap-1.5 justify-center" };
const _hoisted_21 = {
  key: 0,
  class: "px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded-md"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SnakeGameDetail",
  props: {
    entry: {}
  },
  setup(__props) {
    const ResultSummary = defineAsyncComponent(() => __vitePreload(() => import("./ResultSummary-B87l5N3_.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const formatTime = (seconds) => {
      if (!seconds) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.entry.extra.snakeGame.category ? unref(getTopicName)(_ctx.entry.extra.snakeGame.category) : "Snake Game"), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              _cache[4] || (_cache[4] = createBaseVNode("h3", { class: "text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white" }, "Game Completed", -1)),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  _cache[0] || (_cache[0] = createBaseVNode("p", { class: "text-xs xs:text-sm text-blue-600 dark:text-blue-400 font-medium" }, "Score", -1)),
                  createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.entry.extra.snakeGame.score || 0), 1)
                ]),
                createBaseVNode("div", _hoisted_10, [
                  _cache[1] || (_cache[1] = createBaseVNode("p", { class: "text-xs xs:text-sm text-green-600 dark:text-green-400 font-medium" }, "Words", -1)),
                  createBaseVNode("p", _hoisted_11, toDisplayString(_ctx.entry.extra.snakeGame.wordsCollected || 0), 1)
                ]),
                createBaseVNode("div", _hoisted_12, [
                  _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-xs xs:text-sm text-purple-600 dark:text-purple-400 font-medium" }, "Time", -1)),
                  createBaseVNode("p", _hoisted_13, toDisplayString(formatTime(_ctx.entry.extra.snakeGame.gameTime)), 1)
                ]),
                createBaseVNode("div", _hoisted_14, [
                  _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-xs xs:text-sm text-orange-600 dark:text-orange-400 font-medium" }, "Level", -1)),
                  createBaseVNode("p", _hoisted_15, toDisplayString(_ctx.entry.extra.snakeGame.level || 1), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_16, [
              createBaseVNode("div", {
                class: normalizeClass(["inline-flex items-center px-3 xs:px-4 py-2 rounded-full text-sm xs:text-base font-medium", _ctx.entry.isCorrect ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"])
              }, [
                _ctx.entry.isCorrect ? (openBlock(), createElementBlock("svg", _hoisted_17, _cache[5] || (_cache[5] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_18, _cache[6] || (_cache[6] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ]))),
                createTextVNode(" " + toDisplayString(_ctx.entry.isCorrect ? "Great game!" : "Game over!"), 1)
              ], 2)
            ]),
            _ctx.entry.extra.snakeGame.collectedWords && _ctx.entry.extra.snakeGame.collectedWords.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
              _cache[7] || (_cache[7] = createBaseVNode("h4", { class: "text-sm xs:text-base font-semibold text-gray-900 dark:text-white mb-2 xs:mb-3" }, "Words Collected:", -1)),
              createBaseVNode("div", _hoisted_20, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entry.extra.snakeGame.collectedWords.slice(0, 8), (word) => {
                  return openBlock(), createElementBlock("span", {
                    key: word,
                    class: "px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md"
                  }, toDisplayString(word), 1);
                }), 128)),
                _ctx.entry.extra.snakeGame.collectedWords.length > 8 ? (openBlock(), createElementBlock("span", _hoisted_21, " +" + toDisplayString(_ctx.entry.extra.snakeGame.collectedWords.length - 8) + " more ", 1)) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "mt-4 xs:mt-6" }, [
              createBaseVNode("button", {
                disabled: "",
                class: "px-4 xs:px-6 py-2 xs:py-3 bg-gray-400 text-white text-sm xs:text-base font-medium rounded-lg cursor-not-allowed"
              }, " Replay Game ")
            ], -1))
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": `Score: ${_ctx.entry.extra.snakeGame.score || 0}, Words: ${_ctx.entry.extra.snakeGame.wordsCollected || 0}`,
          "correct-answer": `Game completed in ${formatTime(_ctx.entry.extra.snakeGame.gameTime)}`,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=SnakeGameDetail-F6FjqbkU.js.map
