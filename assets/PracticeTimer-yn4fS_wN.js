import { d as defineComponent, H as useI18n, B as computed, A as ref, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, e as createCommentVNode, b as createBlock, f as createBaseVNode, t as toDisplayString, n as normalizeClass, g as createTextVNode, u as unref, a0 as Teleport } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-B6eW4wCx.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "practice-timer" };
const _hoisted_2 = {
  key: 0,
  class: "flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-5"
};
const _hoisted_3 = { class: "font-mono font-bold text-sm sm:text-base md:text-lg" };
const _hoisted_4 = {
  key: 1,
  class: "text-center mb-4 sm:mb-5 md:mb-6"
};
const _hoisted_5 = { class: "text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2" };
const _hoisted_6 = {
  key: 0,
  class: "timeout-modal-overlay",
  style: { "position": "fixed !important", "top": "0 !important", "left": "0 !important", "right": "0 !important", "bottom": "0 !important", "z-index": "99999 !important", "background": "rgba(0,0,0,0.5) !important", "display": "flex !important", "align-items": "center !important", "justify-content": "center !important", "padding": "12px !important" }
};
const _hoisted_7 = {
  style: { "position": "relative !important", "z-index": "100000 !important" },
  class: "timeout-modal-content flex items-center justify-center z-[9999] p-3 sm:p-4 md:p-6"
};
const _hoisted_8 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto text-center w-full" };
const _hoisted_9 = { class: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4" };
const _hoisted_10 = { class: "text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed" };
const _hoisted_11 = { class: "flex gap-2 sm:gap-3 md:gap-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PracticeTimer",
  props: {
    maxTime: { default: 30 },
    autoStart: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["start", "timeout", "tick", "restart", "skip"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const timeLimitText = computed(() => {
      const translated = t("practice.timer.timeLimit", { seconds: props.maxTime });
      if (translated === "practice.timer.timeLimit") {
        return `Time limit: ${props.maxTime} seconds`;
      }
      return translated;
    });
    const remainingTime = ref(props.maxTime);
    const isActive = ref(false);
    const hasStarted = ref(false);
    const showTimeoutModal = ref(false);
    let timerId = null;
    computed(() => isActive.value && remainingTime.value > 0);
    const startPractice = () => {
      hasStarted.value = true;
      startTimer();
      emit("start");
    };
    const startTimer = () => {
      if (props.disabled) return;
      isActive.value = true;
      remainingTime.value = props.maxTime;
      timerId = setInterval(() => {
        if (remainingTime.value > 0) {
          remainingTime.value--;
          emit("tick", remainingTime.value);
        } else {
          handleTimeout();
        }
      }, 1e3);
    };
    const stopTimer = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };
    const resetTimer = () => {
      stopTimer();
      remainingTime.value = props.maxTime;
    };
    const handleTimeout = () => {
      stopTimer();
      showTimeoutModal.value = true;
      emit("timeout");
    };
    const restartPractice = () => {
      showTimeoutModal.value = false;
      resetTimer();
      startTimer();
      emit("restart");
    };
    const skipCard = () => {
      showTimeoutModal.value = false;
      stopTimer();
      isActive.value = false;
      emit("skip");
    };
    const nextCard = () => {
      if (hasStarted.value) {
        resetTimer();
        startTimer();
      }
    };
    const resetPractice = () => {
      stopTimer();
      isActive.value = false;
      hasStarted.value = false;
      remainingTime.value = props.maxTime;
      showTimeoutModal.value = false;
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const getTimerClass = () => {
      if (remainingTime.value <= 5) return "timer-critical";
      if (remainingTime.value <= 10) return "timer-warning";
      return "timer-normal";
    };
    watch(() => props.disabled, (disabled) => {
      if (disabled) {
        stopTimer();
      }
    });
    watch(() => props.autoStart, (autoStart) => {
      if (autoStart && !hasStarted.value) {
        startPractice();
      }
    });
    watch(showTimeoutModal, (visible) => {
      if (visible) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    onUnmounted(() => {
      stopTimer();
    });
    __expose({
      startTimer,
      stopTimer,
      resetTimer,
      nextCard,
      hasStarted,
      resetPractice
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        isActive.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["timer-display", getTimerClass()])
          }, [
            _cache[0] || (_cache[0] = createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createBaseVNode("span", _hoisted_3, toDisplayString(formatTime(remainingTime.value)), 1)
          ], 2)
        ])) : createCommentVNode("", true),
        !hasStarted.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createBaseVNode("button", {
            onClick: startPractice,
            class: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-colors shadow-lg hover:shadow-xl"
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("svg", {
              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block mr-1 sm:mr-2 md:mr-3",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
                "clip-rule": "evenodd"
              })
            ], -1)),
            createTextVNode(" " + toDisplayString(unref(t)("practice.timer.startPractice", "Start Practice")), 1)
          ]),
          createBaseVNode("div", _hoisted_5, toDisplayString(timeLimitText.value), 1)
        ])) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showTimeoutModal.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-red-500 mb-3 sm:mb-4 md:mb-5" }, [
                  createBaseVNode("svg", {
                    class: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                      "clip-rule": "evenodd"
                    })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_9, toDisplayString(unref(t)("practice.timer.timeUp", "Time is up!")), 1),
                createBaseVNode("p", _hoisted_10, toDisplayString(unref(t)("practice.timer.timeUpMessage", "Your time is up. Would you like to try again or skip this card?")), 1),
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("button", {
                    onClick: restartPractice,
                    class: "flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base"
                  }, toDisplayString(unref(t)("practice.timer.tryAgain", "Try Again")), 1),
                  createBaseVNode("button", {
                    onClick: skipCard,
                    class: "flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base"
                  }, toDisplayString(unref(t)("practice.timer.skip", "Skip")), 1)
                ])
              ])
            ])
          ])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
});
const PracticeTimer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1d84fe0e"]]);
export {
  PracticeTimer as default
};
//# sourceMappingURL=PracticeTimer-yn4fS_wN.js.map
