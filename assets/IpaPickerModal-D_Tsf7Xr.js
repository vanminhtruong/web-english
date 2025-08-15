import { d as defineComponent, H as useI18n, A as ref, K as watch, b as createBlock, v as openBlock, y as createVNode, w as withCtx, c as createElementBlock, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, F as Fragment, j as renderList, a0 as Teleport } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60000] backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-2xl" };
const _hoisted_3 = { class: "px-5 py-4 border-b border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-bg-soft dark:to-dark-bg-soft flex items-center justify-between" };
const _hoisted_4 = { class: "text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_5 = ["title", "aria-label"];
const _hoisted_6 = { class: "px-5 py-4 space-y-4" };
const _hoisted_7 = { class: "p-3 rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-gray-custom" };
const _hoisted_8 = { class: "text-2xl md:text-3xl font-mono text-gray-900 dark:text-white break-words min-h-[2.5rem]" };
const _hoisted_9 = { class: "flex flex-wrap gap-2" };
const _hoisted_10 = ["title", "aria-label"];
const _hoisted_11 = ["title", "aria-label"];
const _hoisted_12 = ["title", "aria-label"];
const _hoisted_13 = ["title", "aria-label"];
const _hoisted_14 = { class: "space-y-4" };
const _hoisted_15 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2" };
const _hoisted_16 = { class: "flex flex-wrap gap-2" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2" };
const _hoisted_19 = { class: "flex flex-wrap gap-2" };
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2" };
const _hoisted_22 = { class: "flex flex-wrap gap-2" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2" };
const _hoisted_25 = { class: "flex flex-wrap gap-2" };
const _hoisted_26 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IpaPickerModal",
  props: {
    modelValue: { type: Boolean },
    initialValue: { default: "" }
  },
  emits: ["update:modelValue", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const ipaDraft = ref("");
    const IPA_VOWELS = [
      // Monophthongs (short/long where applicable)
      "i",
      "iː",
      "ɪ",
      "e",
      "ɛ",
      "æ",
      "u",
      "uː",
      "ʊ",
      "o",
      "ɔ",
      "ɒ",
      "ɑ",
      "ʌ",
      "ɜ",
      "ɜː",
      "ɝ",
      "ɚ",
      "ə"
    ];
    const IPA_DIPHTHONGS = [
      // Common diphthongs (BrE/AmE variants included)
      "eɪ",
      "aɪ",
      "ɔɪ",
      "aʊ",
      "əʊ",
      "oʊ",
      "ɪə",
      "eə",
      "ʊə"
    ];
    const IPA_CONSONANTS = [
      // Plosives
      "p",
      "b",
      "t",
      "d",
      "k",
      "g",
      // Fricatives
      "f",
      "v",
      "θ",
      "ð",
      "s",
      "z",
      "ʃ",
      "ʒ",
      "h",
      // Affricates
      "tʃ",
      "dʒ",
      // Nasals
      "m",
      "n",
      "ŋ",
      // Liquids
      "l",
      "ɫ",
      "r",
      "ɹ",
      // Glides
      "w",
      "j",
      // Other
      "ʔ",
      "ɾ",
      "ʍ"
    ];
    const IPA_MARKS = ["ˈ", "ˌ", "ː", ".", " "];
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        ipaDraft.value = props.initialValue || "";
      }
    });
    const closeModal = () => {
      emit("update:modelValue", false);
    };
    const appendIpa = (symbol) => {
      ipaDraft.value += symbol;
    };
    const clearIpa = () => {
      ipaDraft.value = "";
    };
    const backspaceIpa = () => {
      if (!ipaDraft.value) return;
      ipaDraft.value = ipaDraft.value.slice(0, -1);
    };
    const wrapWithSlashes = () => {
      const trimmed = ipaDraft.value.trim();
      if (!trimmed) {
        ipaDraft.value = "/ /";
        return;
      }
      const alreadyWrapped = trimmed.startsWith("/") && trimmed.endsWith("/");
      ipaDraft.value = alreadyWrapped ? trimmed : `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
    };
    const applyIpa = () => {
      emit("apply", ipaDraft.value.trim());
      closeModal();
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-500 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-300 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            _ctx.modelValue ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
                      class: "bg-white dark:bg-dark-bg-soft shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute overflow-hidden transform",
                      onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("h3", _hoisted_4, [
                          _cache[1] || (_cache[1] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                          createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.pronunciation.ipaPickerTitle", "IPA Picker")), 1)
                        ]),
                        createBaseVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800",
                          title: unref(t)("common.close", "Close"),
                          "aria-label": unref(t)("common.close", "Close")
                        }, _cache[2] || (_cache[2] = [
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
                        ]), 8, _hoisted_5)
                      ]),
                      createBaseVNode("div", _hoisted_6, [
                        createBaseVNode("div", _hoisted_7, [
                          createBaseVNode("div", _hoisted_8, toDisplayString(ipaDraft.value || unref(t)("vocabulary.pronunciation.previewPlaceholder", "Start building IPA...")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_9, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: wrapWithSlashes,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom",
                            title: unref(t)("vocabulary.pronunciation.wrap", "Wrap with slashes"),
                            "aria-label": unref(t)("vocabulary.pronunciation.wrap", "Wrap with slashes")
                          }, " /.../ ", 8, _hoisted_10),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: backspaceIpa,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom",
                            title: unref(t)("common.backspace", "Backspace"),
                            "aria-label": unref(t)("common.backspace", "Backspace")
                          }, toDisplayString(unref(t)("common.backspace", "Backspace")), 9, _hoisted_11),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: clearIpa,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom",
                            title: unref(t)("common.clear", "Clear"),
                            "aria-label": unref(t)("common.clear", "Clear")
                          }, toDisplayString(unref(t)("common.clear", "Clear")), 9, _hoisted_12),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: applyIpa,
                            class: "ml-auto px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white",
                            title: unref(t)("common.apply", "Apply"),
                            "aria-label": unref(t)("common.apply", "Apply")
                          }, toDisplayString(unref(t)("common.apply", "Apply")), 9, _hoisted_13)
                        ]),
                        createBaseVNode("div", _hoisted_14, [
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_15, toDisplayString(unref(t)("vocabulary.pronunciation.vowels", "Vowels")), 1),
                            createBaseVNode("div", _hoisted_16, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(IPA_VOWELS, (s) => {
                                return createBaseVNode("button", {
                                  key: "v-" + s,
                                  type: "button",
                                  onClick: ($event) => appendIpa(s),
                                  class: "px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                                }, toDisplayString(s), 9, _hoisted_17);
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_18, toDisplayString(unref(t)("vocabulary.pronunciation.diphthongs", "Diphthongs")), 1),
                            createBaseVNode("div", _hoisted_19, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(IPA_DIPHTHONGS, (s) => {
                                return createBaseVNode("button", {
                                  key: "d-" + s,
                                  type: "button",
                                  onClick: ($event) => appendIpa(s),
                                  class: "px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                                }, toDisplayString(s), 9, _hoisted_20);
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("vocabulary.pronunciation.consonants", "Consonants")), 1),
                            createBaseVNode("div", _hoisted_22, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(IPA_CONSONANTS, (s) => {
                                return createBaseVNode("button", {
                                  key: "c-" + s,
                                  type: "button",
                                  onClick: ($event) => appendIpa(s),
                                  class: "px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                                }, toDisplayString(s), 9, _hoisted_23);
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_24, toDisplayString(unref(t)("vocabulary.pronunciation.marks", "Marks")), 1),
                            createBaseVNode("div", _hoisted_25, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(IPA_MARKS, (s) => {
                                return createBaseVNode("button", {
                                  key: "m-" + s,
                                  type: "button",
                                  onClick: ($event) => appendIpa(s),
                                  class: "px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                                }, toDisplayString(s === " " ? unref(t)("common.space", "Space") : s), 9, _hoisted_26);
                              }), 64))
                            ])
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
export {
  _sfc_main as default
};
//# sourceMappingURL=IpaPickerModal-D_Tsf7Xr.js.map
