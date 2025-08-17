import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, e as createCommentVNode, i as withModifiers, n as normalizeClass } from "./vendor-DoTKyHPB.js";
import { g as getTopicName, a as _export_sfc } from "./index-Dw2e3y1H.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "perspective-1000" };
const _hoisted_2 = { class: "flashcard-face flashcard-front absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8" };
const _hoisted_3 = { class: "text-center" };
const _hoisted_4 = { class: "mb-3 sm:mb-4 md:mb-5" };
const _hoisted_5 = { class: "px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base font-medium rounded-full" };
const _hoisted_6 = { class: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5" };
const _hoisted_7 = { class: "text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6" };
const _hoisted_8 = { class: "text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400" };
const _hoisted_9 = { class: "flashcard-face flashcard-back absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8" };
const _hoisted_10 = { class: "text-center text-white" };
const _hoisted_11 = { class: "text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5" };
const _hoisted_12 = {
  key: 0,
  class: "text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5"
};
const _hoisted_13 = {
  key: 1,
  class: "text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5 leading-relaxed"
};
const _hoisted_14 = { class: "text-xs sm:text-sm md:text-base opacity-75" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardCard",
  props: {
    currentCard: {},
    isFlipped: { type: Boolean }
  },
  emits: ["flip-card"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass([["flashcard", { "flipped": _ctx.isFlipped }], "relative w-full cursor-pointer h-80 sm:h-96 md:h-[28rem] select-none"]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("flip-card")),
          onCopy: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["prevent"])),
          onCut: _cache[2] || (_cache[2] = withModifiers(() => {
          }, ["prevent"])),
          onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["prevent"]))
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("span", _hoisted_5, toDisplayString(unref(getTopicName)(_ctx.currentCard.category)), 1)
              ]),
              createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.currentCard.word), 1),
              createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.currentCard.pronunciation), 1),
              createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("flashcard.card.flip_to_meaning", "Click to see meaning")), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("h3", _hoisted_11, toDisplayString(_ctx.currentCard.meaning), 1),
              _ctx.currentCard.partOfSpeech ? (openBlock(), createElementBlock("p", _hoisted_12, toDisplayString(unref(t)(`vocabulary.wordTypes.${_ctx.currentCard.partOfSpeech}`, _ctx.currentCard.partOfSpeech)), 1)) : createCommentVNode("", true),
              _ctx.currentCard.example ? (openBlock(), createElementBlock("p", _hoisted_13, toDisplayString(_ctx.currentCard.example), 1)) : createCommentVNode("", true),
              createBaseVNode("p", _hoisted_14, toDisplayString(unref(t)("flashcard.card.flip_back", "Click to flip back")), 1)
            ])
          ])
        ], 34)
      ]);
    };
  }
});
const FlashcardCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5edf4e3b"]]);
export {
  FlashcardCard as default
};
//# sourceMappingURL=FlashcardCard-Ckkjcecb.js.map
