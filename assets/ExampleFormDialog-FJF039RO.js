import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, N as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, g as createTextVNode, P as vModelSelect, O as vModelText, Z as withKeys, F as Fragment, j as renderList } from "./vendor-DI3yOcyn.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = {
  key: 0,
  class: "mt-2 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
};
const _hoisted_7 = { class: "font-medium text-green-600 dark:text-green-400" };
const _hoisted_8 = { class: "font-semibold" };
const _hoisted_9 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_10 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_11 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_12 = { value: "" };
const _hoisted_13 = { value: "sentence" };
const _hoisted_14 = { value: "dialogue" };
const _hoisted_15 = { value: "phrase" };
const _hoisted_16 = { value: "context" };
const _hoisted_17 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_18 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_19 = ["placeholder"];
const _hoisted_20 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_21 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_22 = ["placeholder"];
const _hoisted_23 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_24 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_25 = ["placeholder"];
const _hoisted_26 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_27 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_28 = ["placeholder"];
const _hoisted_29 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_30 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_31 = { value: "" };
const _hoisted_32 = { value: "easy" };
const _hoisted_33 = { value: "medium" };
const _hoisted_34 = { value: "hard" };
const _hoisted_35 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_36 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_37 = { class: "space-y-3" };
const _hoisted_38 = ["placeholder", "onKeydown"];
const _hoisted_39 = {
  key: 0,
  class: "flex flex-wrap gap-2"
};
const _hoisted_40 = ["onClick"];
const _hoisted_41 = { class: "flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a] flex-shrink-0" };
const _hoisted_42 = ["disabled"];
const __default__ = {};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  ...{
    name: "ExampleFormDialog"
  },
  __name: "ExampleFormDialog",
  props: {
    show: { type: Boolean },
    example: {},
    vocabularyId: {},
    vocabularyList: {}
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const formData = ref({
      vocabularyId: "",
      title: "",
      content: "",
      translation: "",
      context: "",
      type: "sentence",
      difficulty: "easy",
      tags: []
    });
    const tagInput = ref("");
    const selectedVocab = computed(() => {
      return props.vocabularyList.find((v) => v.id === formData.value.vocabularyId);
    });
    const isFormValid = computed(() => {
      return formData.value.vocabularyId && formData.value.title.trim() && formData.value.content.trim() && formData.value.type;
    });
    const resetForm = () => {
      formData.value = {
        vocabularyId: props.vocabularyId || "",
        title: "",
        content: "",
        translation: "",
        context: "",
        type: "sentence",
        difficulty: "easy",
        tags: []
      };
      tagInput.value = "";
    };
    const loadExample = () => {
      if (props.example) {
        formData.value = {
          ...props.example,
          tags: props.example.tags ? [...props.example.tags] : []
        };
      } else {
        resetForm();
        if (props.vocabularyId) {
          formData.value.vocabularyId = props.vocabularyId;
        }
      }
    };
    const addTagFromInput = () => {
      if (tagInput.value.trim()) {
        const newTags = tagInput.value.split(",").map((tag) => tag.trim()).filter((tag) => tag && !formData.value.tags?.includes(tag));
        if (newTags.length > 0) {
          formData.value.tags = [...formData.value.tags || [], ...newTags];
          tagInput.value = "";
        }
      }
    };
    const removeTag = (index) => {
      if (formData.value.tags) {
        formData.value.tags.splice(index, 1);
      }
    };
    const handleSubmit = () => {
      if (!isFormValid.value) return;
      const exampleData = {
        ...formData.value,
        tags: formData.value.tags?.filter((tag) => tag.trim()) || []
      };
      emit("save", exampleData);
    };
    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };
    watch(() => props.show, (newShow) => {
      if (newShow) {
        loadExample();
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    });
    watch(() => props.example, () => {
      if (props.show) {
        loadExample();
      }
    });
    watch(() => props.vocabularyId, () => {
      if (props.show && !props.example) {
        formData.value.vocabularyId = props.vocabularyId || "";
      }
    });
    onMounted(() => {
      if (props.show) {
        loadExample();
        lockBodyScroll();
      }
    });
    onUnmounted(() => {
      unlockBodyScroll();
    });
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
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform",
                      onClick: _cache[9] || (_cache[9] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("div", null, [
                            createBaseVNode("h2", _hoisted_5, [
                              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }, null, -1)),
                              createBaseVNode("span", null, toDisplayString(_ctx.example ? unref(t)("vocabulary.examples.editExample", "Edit Example") : unref(t)("vocabulary.examples.addExample", "Add New Example")), 1)
                            ]),
                            selectedVocab.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
                              createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("common.vocabulary", "Vocabulary")) + ":", 1),
                              createBaseVNode("span", _hoisted_8, toDisplayString(selectedVocab.value.word), 1),
                              _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-gray-400" }, "•", -1)),
                              createBaseVNode("span", null, toDisplayString(selectedVocab.value.meaning), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[12] || (_cache[12] = [
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
                      createBaseVNode("div", _hoisted_9, [
                        createBaseVNode("form", {
                          onSubmit: withModifiers(handleSubmit, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createBaseVNode("div", _hoisted_10, [
                            createBaseVNode("label", _hoisted_11, [
                              _cache[13] || (_cache[13] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.exampleType", "Example Type")) + " ", 1),
                              _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.type = $event),
                              required: "",
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                            }, [
                              createBaseVNode("option", _hoisted_12, toDisplayString(unref(t)("vocabulary.examples.selectType", "Select example type...")), 1),
                              createBaseVNode("option", _hoisted_13, toDisplayString(unref(t)("vocabulary.examples.types.sentence", "Sentence")), 1),
                              createBaseVNode("option", _hoisted_14, toDisplayString(unref(t)("vocabulary.examples.types.dialogue", "Dialogue")), 1),
                              createBaseVNode("option", _hoisted_15, toDisplayString(unref(t)("vocabulary.examples.types.phrase", "Phrase")), 1),
                              createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("vocabulary.examples.types.context", "Context")), 1)
                            ], 512), [
                              [vModelSelect, formData.value.type]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_17, [
                            createBaseVNode("label", _hoisted_18, [
                              _cache[15] || (_cache[15] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("common.title", "Title")) + " ", 1),
                              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.title = $event),
                              type: "text",
                              required: "",
                              placeholder: unref(t)("vocabulary.examples.titlePlaceholder", "Brief title for this example..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02]"
                            }, null, 8, _hoisted_19), [
                              [vModelText, formData.value.title]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_20, [
                            createBaseVNode("label", _hoisted_21, [
                              _cache[17] || (_cache[17] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.content", "Example Content")) + " ", 1),
                              _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.content = $event),
                              required: "",
                              rows: "4",
                              placeholder: unref(t)("vocabulary.examples.contentPlaceholder", "Enter the example sentence or dialogue..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] resize-none"
                            }, null, 8, _hoisted_22), [
                              [vModelText, formData.value.content]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_23, [
                            createBaseVNode("label", _hoisted_24, [
                              _cache[19] || (_cache[19] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.translation", "Translation")), 1)
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.translation = $event),
                              rows: "2",
                              placeholder: unref(t)("vocabulary.examples.translationPlaceholder", "Optional translation in your native language..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02] resize-none"
                            }, null, 8, _hoisted_25), [
                              [vModelText, formData.value.translation]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_26, [
                            createBaseVNode("label", _hoisted_27, [
                              _cache[20] || (_cache[20] = createBaseVNode("span", { class: "w-1 h-4 bg-cyan-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.context", "Context")), 1)
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.context = $event),
                              rows: "2",
                              placeholder: unref(t)("vocabulary.examples.contextPlaceholder", "Optional context or situation where this example is used..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none"
                            }, null, 8, _hoisted_28), [
                              [vModelText, formData.value.context]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_29, [
                            createBaseVNode("label", _hoisted_30, [
                              _cache[21] || (_cache[21] = createBaseVNode("span", { class: "w-1 h-4 bg-pink-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.difficulty", "Difficulty")), 1)
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => formData.value.difficulty = $event),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]"
                            }, [
                              createBaseVNode("option", _hoisted_31, toDisplayString(unref(t)("vocabulary.examples.selectDifficulty", "Select difficulty...")), 1),
                              createBaseVNode("option", _hoisted_32, toDisplayString(unref(t)("common.easy", "Easy")), 1),
                              createBaseVNode("option", _hoisted_33, toDisplayString(unref(t)("vocabulary.examples.difficulty.medium", "Medium")), 1),
                              createBaseVNode("option", _hoisted_34, toDisplayString(unref(t)("common.difficult", "Difficult")), 1)
                            ], 512), [
                              [vModelSelect, formData.value.difficulty]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_35, [
                            createBaseVNode("label", _hoisted_36, [
                              _cache[22] || (_cache[22] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.examples.tags", "Tags")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_37, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => tagInput.value = $event),
                                type: "text",
                                placeholder: unref(t)("vocabulary.examples.tagsPlaceholder", "Enter tags separated by commas..."),
                                onKeydown: withKeys(withModifiers(addTagFromInput, ["prevent"]), ["enter"]),
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02]"
                              }, null, 40, _hoisted_38), [
                                [vModelText, tagInput.value]
                              ]),
                              formData.value.tags && formData.value.tags.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_39, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(formData.value.tags, (tag, index) => {
                                  return openBlock(), createElementBlock("span", {
                                    key: index,
                                    class: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100/50 text-green-800 dark:bg-green-900/20 dark:text-green-300 backdrop-blur-sm"
                                  }, [
                                    createTextVNode(toDisplayString(tag) + " ", 1),
                                    createBaseVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeTag(index),
                                      class: "ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-all duration-300 hover:scale-110"
                                    }, _cache[23] || (_cache[23] = [
                                      createBaseVNode("svg", {
                                        class: "w-3 h-3",
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
                                    ]), 8, _hoisted_40)
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ], 32)
                      ]),
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("button", {
                          onClick: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("close")),
                          type: "button",
                          class: "px-4 py-2 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100/50 dark:hover:bg-[#0a0a0a]/70 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: handleSubmit,
                          type: "submit",
                          disabled: !isFormValid.value,
                          class: "px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        }, toDisplayString(_ctx.example ? unref(t)("common.update", "Update") : unref(t)("common.add", "Add")), 9, _hoisted_42)
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
//# sourceMappingURL=ExampleFormDialog-FJF039RO.js.map
