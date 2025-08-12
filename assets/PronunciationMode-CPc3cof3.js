const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-D9pwxm0k.js","assets/vendor-DoTKyHPB.js","assets/index-CVZ6Enfo.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-QWkG18kn.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CVZ6Enfo.js";
import { d as defineComponent, A as ref, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, y as createVNode, t as toDisplayString, n as normalizeClass, e as createCommentVNode, g as createTextVNode, u as unref, D as defineAsyncComponent, i as withModifiers } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "text-center h-full flex flex-col justify-center" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "px-3 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "text-5xl font-bold text-gray-900 dark:text-white mb-4" };
const _hoisted_5 = { class: "text-xl text-gray-500 dark:text-gray-400 mb-8" };
const _hoisted_6 = {
  key: 0,
  class: "text-red-500 dark:text-red-400"
};
const _hoisted_7 = { key: 1 };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "mt-8" };
const _hoisted_10 = {
  key: 0,
  class: "text-gray-600 dark:text-gray-300"
};
const _hoisted_11 = { class: "font-medium text-gray-800 dark:text-white" };
const _hoisted_12 = {
  key: 1,
  class: "mt-4"
};
const _hoisted_13 = {
  key: 0,
  class: "text-2xl font-bold text-green-600 dark:text-green-400"
};
const _hoisted_14 = {
  key: 1,
  class: "text-2xl font-bold text-red-600 dark:text-red-400"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PronunciationMode",
  props: {
    card: {},
    isRecording: { type: Boolean },
    pronunciationResult: {},
    pronunciationAnswered: { type: Boolean },
    pronunciationCorrect: { type: Boolean },
    isSpeechRecognitionSupported: { type: Boolean },
    getTopicName: { type: Function }
  },
  emits: ["start-recording"],
  setup(__props, { emit: __emit }) {
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-D9pwxm0k.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const props = __props;
    const emit = __emit;
    const handleStartRecording = () => {
      emit("start-recording");
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.pronunciationAnswered, (newValue) => {
      if (newValue && !triggerFirework.value) {
        isCorrectAnswer.value = props.pronunciationCorrect;
        setTimeout(() => {
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 50);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 h-96 select-none",
        onCopy: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.card?.category ? _ctx.getTopicName(_ctx.card.category) : ""), 1)
          ]),
          createBaseVNode("h2", _hoisted_4, toDisplayString(_ctx.card?.word), 1),
          createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.card?.pronunciation), 1),
          !_ctx.isSpeechRecognitionSupported ? (openBlock(), createElementBlock("div", _hoisted_6, " Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói. ")) : (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("button", {
              onClick: handleStartRecording,
              disabled: _ctx.isRecording,
              class: normalizeClass(["bg-red-500 hover:bg-red-600 text-white p-6 rounded-full transition-colors disabled:opacity-50", { "animate-pulse": _ctx.isRecording }])
            }, _cache[3] || (_cache[3] = [
              createBaseVNode("svg", {
                class: "w-8 h-8",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", { d: "M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" }),
                createBaseVNode("path", { d: "M5.5 9.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z" }),
                createBaseVNode("path", { d: "M10 18a5 5 0 005-5h-1a4 4 0 01-4 4v1z" })
              ], -1)
            ]), 10, _hoisted_8)
          ])),
          createBaseVNode("div", _hoisted_9, [
            _ctx.pronunciationResult ? (openBlock(), createElementBlock("p", _hoisted_10, [
              _cache[4] || (_cache[4] = createTextVNode("Bạn đã nói: ")),
              createBaseVNode("span", _hoisted_11, toDisplayString(_ctx.pronunciationResult), 1)
            ])) : createCommentVNode("", true),
            _ctx.pronunciationAnswered ? (openBlock(), createElementBlock("div", _hoisted_12, [
              _ctx.pronunciationCorrect ? (openBlock(), createElementBlock("p", _hoisted_13, "Chính xác!")) : (openBlock(), createElementBlock("p", _hoisted_14, "Hãy thử lại!"))
            ])) : createCommentVNode("", true)
          ])
        ]),
        createVNode(unref(FireworkSoundEffect), {
          ref_key: "fireworkEffect",
          ref: fireworkEffect,
          "trigger-firework": triggerFirework.value,
          "trigger-sound": triggerSound.value,
          "is-correct": isCorrectAnswer.value,
          onEffectComplete: resetTriggers
        }, null, 8, ["trigger-firework", "trigger-sound", "is-correct"])
      ], 32);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=PronunciationMode-CPc3cof3.js.map
