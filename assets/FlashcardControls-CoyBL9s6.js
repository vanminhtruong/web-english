import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, e as createCommentVNode, F as Fragment, f as createBaseVNode, u as unref, t as toDisplayString, n as normalizeClass } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = { class: "flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8" };
const _hoisted_2 = ["title"];
const _hoisted_3 = ["disabled", "title"];
const _hoisted_4 = ["title"];
const _hoisted_5 = ["title"];
const _hoisted_6 = ["disabled", "title"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["title"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardControls",
  props: {
    practiceMode: {},
    currentIndex: {},
    totalCards: {},
    canProceed: { type: Boolean },
    practiceStarted: { type: Boolean },
    scrambleWordsEnabled: { type: Boolean },
    typingAnswer: {},
    typingAnswered: { type: Boolean },
    listeningAnswer: {},
    listeningAnswered: { type: Boolean },
    imageAnswer: {},
    imageAnswered: { type: Boolean }
  },
  emits: ["mark-difficult", "mark-easy", "previous-card", "next-card", "exit-practice"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _ctx.practiceMode === "flashcard" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("mark-difficult")),
            class: "bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors",
            title: unref(t)("practice.controls.difficult", "Mark as difficult")
          }, _cache[8] || (_cache[8] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_2),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("previous-card")),
            disabled: _ctx.currentIndex === 0,
            class: "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors",
            title: unref(t)("practice.controls.previous", "Previous")
          }, _cache[9] || (_cache[9] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_3),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("next-card")),
            class: normalizeClass(["bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base", _ctx.scrambleWordsEnabled ? "hidden md:inline-flex" : ""])
          }, toDisplayString(_ctx.currentIndex === _ctx.totalCards - 1 ? unref(t)("practice.controls.complete", "Complete") : unref(t)("practice.controls.next", "Next")), 3),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("mark-easy")),
            class: "bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors",
            title: unref(t)("practice.controls.easy", "Mark as easy")
          }, _cache[10] || (_cache[10] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_4),
          _ctx.practiceStarted ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("exit-practice")),
            class: "bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors ml-2 sm:ml-3 md:ml-4",
            title: unref(t)("practice.controls.exit", "Exit Practice")
          }, _cache[11] || (_cache[11] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_5)) : createCommentVNode("", true)
        ], 64)) : ["quiz", "typing", "listening", "image", "pronunciation", "pictionary", "flip-tile"].includes(_ctx.practiceMode) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("previous-card")),
            disabled: _ctx.currentIndex === 0,
            class: "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors",
            title: unref(t)("practice.controls.previous", "Previous")
          }, _cache[12] || (_cache[12] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_6),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("next-card")),
            disabled: !_ctx.canProceed,
            class: normalizeClass(["bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base", ["quiz", "typing", "listening", "image", "pictionary", "flip-tile"].includes(_ctx.practiceMode) ? "hidden md:inline-flex" : ""])
          }, toDisplayString(_ctx.currentIndex === _ctx.totalCards - 1 ? unref(t)("practice.controls.complete", "Complete") : unref(t)("practice.controls.next", "Next")), 11, _hoisted_7),
          _ctx.practiceStarted ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("exit-practice")),
            class: "bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors ml-2 sm:ml-3 md:ml-4",
            title: unref(t)("practice.controls.exit", "Exit Practice")
          }, _cache[13] || (_cache[13] = [
            createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",
                "clip-rule": "evenodd"
              })
            ], -1)
          ]), 8, _hoisted_8)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FlashcardControls-CoyBL9s6.js.map
