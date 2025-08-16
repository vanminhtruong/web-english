import { d as defineComponent, H as useI18n, A as ref, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, S as vModelText } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-BuG_nsbx.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[10000] backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl" };
const _hoisted_3 = {
  class: "px-6 py-4 border-b border-gray-200 dark:border-[#0f0f0f] flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_7 = {
  for: "rate",
  class: "block text-sm font-medium text-gray-700 dark:text-white/80"
};
const _hoisted_8 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_9 = {
  for: "pitch",
  class: "block text-sm font-medium text-gray-700 dark:text-white/80"
};
const _hoisted_10 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_11 = {
  for: "volume",
  class: "block text-sm font-medium text-gray-700 dark:text-white/80"
};
const _hoisted_12 = {
  class: "px-6 py-4 border-t border-gray-200 dark:border-[#0f0f0f] flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_13 = { class: "flex justify-between items-center" };
const _hoisted_14 = { class: "space-x-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VoiceSettingsModal",
  props: {
    show: { type: Boolean },
    voiceType: {},
    voiceName: {},
    initialSettings: {}
  },
  emits: ["close", "save", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const localSettings = ref({ ...props.initialSettings });
    const modalContentRef = ref(null);
    watch(() => props.initialSettings, (newSettings) => {
      if (newSettings) {
        localSettings.value = { ...newSettings };
      }
    }, { deep: true, immediate: true });
    watch(() => props.show, (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }, { immediate: true });
    onUnmounted(() => {
      document.body.style.overflow = "";
    });
    const close = () => {
      emit("close");
    };
    const save = () => {
      emit("save", { voiceType: props.voiceType, settings: localSettings.value });
      close();
    };
    const resetToDefaults = () => {
      emit("reset", props.voiceType);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-500 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-300 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            _ctx.show ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, [
                    createBaseVNode("div", {
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-[#0f0f0f] flex flex-col h-full overflow-hidden transform",
                      onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h2", _hoisted_5, [
                            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("voice.settings.title", "Voice Settings")) + ": " + toDisplayString(_ctx.voiceName), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: close,
                            class: "text-gray-500 hover:text-gray-700 dark:text-white/70 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-black"
                          }, _cache[5] || (_cache[5] = [
                            createBaseVNode("svg", {
                              class: "w-6 h-6",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ], -1)
                          ]))
                        ])
                      ]),
                      createBaseVNode("div", {
                        ref_key: "modalContentRef",
                        ref: modalContentRef,
                        class: "px-6 py-4 flex-1 overflow-y-auto min-h-0 space-y-6"
                      }, [
                        createBaseVNode("div", _hoisted_6, [
                          createBaseVNode("label", _hoisted_7, toDisplayString(unref(t)("voice.settings.rate", "Rate")) + " (" + toDisplayString(localSettings.value.rate.toFixed(2)) + ")", 1),
                          withDirectives(createBaseVNode("input", {
                            id: "rate",
                            type: "range",
                            min: "0.5",
                            max: "2",
                            step: "0.1",
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localSettings.value.rate = $event),
                            class: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]"
                          }, null, 512), [
                            [
                              vModelText,
                              localSettings.value.rate,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_8, [
                          createBaseVNode("label", _hoisted_9, toDisplayString(unref(t)("voice.settings.pitch", "Pitch")) + " (" + toDisplayString(localSettings.value.pitch.toFixed(2)) + ")", 1),
                          withDirectives(createBaseVNode("input", {
                            id: "pitch",
                            type: "range",
                            min: "0",
                            max: "2",
                            step: "0.1",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => localSettings.value.pitch = $event),
                            class: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]"
                          }, null, 512), [
                            [
                              vModelText,
                              localSettings.value.pitch,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_10, [
                          createBaseVNode("label", _hoisted_11, toDisplayString(unref(t)("voice.settings.volume", "Volume")) + " (" + toDisplayString(localSettings.value.volume.toFixed(2)) + ")", 1),
                          withDirectives(createBaseVNode("input", {
                            id: "volume",
                            type: "range",
                            min: "0",
                            max: "1",
                            step: "0.1",
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => localSettings.value.volume = $event),
                            class: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#0f0f0f]"
                          }, null, 512), [
                            [
                              vModelText,
                              localSettings.value.volume,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ])
                      ], 512),
                      createBaseVNode("div", _hoisted_12, [
                        createBaseVNode("div", _hoisted_13, [
                          createBaseVNode("button", {
                            onClick: resetToDefaults,
                            class: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-[#0a0a0a] dark:text-white/80 dark:hover:bg-black border dark:border-[#0f0f0f] transition-colors"
                          }, toDisplayString(unref(t)("common.resetToDefault", "Reset to Default")), 1),
                          createBaseVNode("div", _hoisted_14, [
                            createBaseVNode("button", {
                              onClick: close,
                              class: "px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-[#0a0a0a] dark:text-white/80 dark:hover:bg-black border dark:border-[#0f0f0f] transition-colors"
                            }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                            createBaseVNode("button", {
                              onClick: save,
                              class: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            }, toDisplayString(unref(t)("common.save", "Save")), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const VoiceSettingsModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2954474a"]]);
export {
  VoiceSettingsModal as default
};
//# sourceMappingURL=VoiceSettingsModal-CXUXIAb0.js.map
