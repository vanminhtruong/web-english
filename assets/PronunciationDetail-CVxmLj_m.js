const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResultSummary-B87l5N3_.js","assets/vendor-Cr_Qcp9o.js"])))=>i.map(i=>d[i]);
import { g as getTopicName, _ as __vitePreload } from "./index-ru3bFDmG.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, J as createStaticVNode, t as toDisplayString, u as unref, e as createCommentVNode, g as createTextVNode, n as normalizeClass, D as defineAsyncComponent } from "./vendor-Cr_Qcp9o.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "mt-2 sm:mt-3 space-y-2 sm:space-y-3" };
const _hoisted_2 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-2 xs:p-3 sm:p-6 md:p-8 min-h-80 xs:min-h-96 h-auto select-none overflow-hidden" };
const _hoisted_3 = { class: "text-center h-full flex flex-col justify-start md:justify-center items-center gap-3 md:gap-4" };
const _hoisted_4 = { class: "mb-6" };
const _hoisted_5 = { class: "px-2.5 py-0.5 bg-blue-100 dark:bg-dark-bg-mute text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full" };
const _hoisted_6 = { class: "text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-900 dark:text-white mb-3 md:mb-4 break-words" };
const _hoisted_7 = { class: "text-base sm:text-lg md:text-xl text-gray-500 dark:text-white/70 mb-6 md:mb-8 break-words" };
const _hoisted_8 = { class: "mt-5 sm:mt-6 md:mt-8" };
const _hoisted_9 = {
  key: 0,
  class: "text-gray-600 dark:text-white/80 text-sm sm:text-base break-words"
};
const _hoisted_10 = { class: "font-medium text-gray-800 dark:text-white" };
const _hoisted_11 = { class: "mt-4" };
const _hoisted_12 = {
  key: 0,
  class: "text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400"
};
const _hoisted_13 = {
  key: 1,
  class: "text-lg sm:text-xl md:text-2xl font-bold text-red-600 dark:text-red-400"
};
const _hoisted_14 = {
  key: 1,
  class: "mt-3 text-center"
};
const _hoisted_15 = { class: "text-xs sm:text-sm text-gray-500 dark:text-white/70" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PronunciationDetail",
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
              createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.entry.extra.pronunciation.category ? unref(getTopicName)(_ctx.entry.extra.pronunciation.category) : "Unknown Category"), 1)
            ]),
            createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.entry.extra.pronunciation.word), 1),
            createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.entry.extra.pronunciation.pronunciation || _ctx.entry.meaningShort || ""), 1),
            _cache[2] || (_cache[2] = createStaticVNode('<div><button disabled class="bg-gray-500 text-white p-4 sm:p-5 md:p-6 rounded-full cursor-not-allowed opacity-50"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path><path d="M5.5 9.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z"></path><path d="M10 18a5 5 0 005-5h-1a4 4 0 01-4 4v1z"></path></svg></button></div>', 1)),
            createBaseVNode("div", _hoisted_8, [
              _ctx.entry.extra.pronunciation.recognizedText ? (openBlock(), createElementBlock("p", _hoisted_9, [
                _cache[0] || (_cache[0] = createTextVNode(" Your Recording: ")),
                createBaseVNode("span", _hoisted_10, toDisplayString(_ctx.entry.extra.pronunciation.recognizedText), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_11, [
                _ctx.entry.isCorrect ? (openBlock(), createElementBlock("p", _hoisted_12, "✓ Correct!")) : (openBlock(), createElementBlock("p", _hoisted_13, "Try Again!"))
              ]),
              _ctx.entry.extra.pronunciation.pronunciationScore !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_14, [
                createBaseVNode("p", _hoisted_15, [
                  _cache[1] || (_cache[1] = createTextVNode(" Score: ")),
                  createBaseVNode("span", {
                    class: normalizeClass(["font-semibold", _ctx.entry.extra.pronunciation.pronunciationScore >= 80 ? "text-green-600 dark:text-green-400" : _ctx.entry.extra.pronunciation.pronunciationScore >= 60 ? "text-orange-600 dark:text-orange-400" : "text-red-600 dark:text-red-400"])
                  }, toDisplayString(_ctx.entry.extra.pronunciation.pronunciationScore) + "%", 3)
                ])
              ])) : createCommentVNode("", true)
            ])
          ])
        ]),
        createVNode(unref(ResultSummary), {
          "user-answer": _ctx.entry.extra.pronunciation.recognizedText || "No pronunciation attempt",
          "correct-answer": _ctx.entry.extra.pronunciation.word,
          "is-correct": _ctx.entry.isCorrect
        }, null, 8, ["user-answer", "correct-answer", "is-correct"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=PronunciationDetail-CVxmLj_m.js.map
