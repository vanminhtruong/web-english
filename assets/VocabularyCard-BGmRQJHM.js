import { d as defineComponent, H as useI18n, c as createElementBlock, e as createCommentVNode, v as openBlock, u as unref, i as withModifiers, f as createBaseVNode, A as ref, L as onUnmounted, b as createBlock, t as toDisplayString, y as createVNode, g as createTextVNode, n as normalizeClass, w as withCtx, M as Transition, a0 as Teleport } from "./vendor-DoTKyHPB.js";
import { d as getRelativeTime, g as getTopicName, a as _export_sfc } from "./index-CVZ6Enfo.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1$1 = ["title"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MoveButton",
  props: {
    word: {},
    moveMode: { type: Boolean }
  },
  emits: ["move-vocabulary"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const handleMoveClick = () => {
      emit("move-vocabulary", {
        word: props.word,
        targetDate: "",
        sourceDate: props.word.createdAt
      });
    };
    return (_ctx, _cache) => {
      return _ctx.moveMode ? (openBlock(), createElementBlock("button", {
        key: 0,
        onClick: withModifiers(handleMoveClick, ["stop"]),
        class: "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors",
        title: unref(t)("vocabulary.moveToDateGroup", "Move to another date group")
      }, _cache[0] || (_cache[0] = [
        createBaseVNode("svg", {
          class: "w-4 h-4",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        }, [
          createBaseVNode("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M13 7l5 5m0 0l-5 5m5-5H6"
          })
        ], -1)
      ]), 8, _hoisted_1$1)) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1 = { class: "flex flex-col lg:flex-row lg:items-center lg:justify-between xl:items-center xl:justify-between 2xl:items-center 2xl:justify-between space-y-3 lg:space-y-0" };
const _hoisted_2 = { class: "flex-1" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:items-start xl:items-center 2xl:items-center space-y-3 sm:space-y-0 sm:space-x-4" };
const _hoisted_4 = {
  key: 0,
  class: "flex-shrink-0 self-center sm:self-start xl:self-center 2xl:self-center"
};
const _hoisted_5 = { class: "w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600" };
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = { class: "flex-1" };
const _hoisted_8 = { class: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_9 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_10 = { class: "text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1" };
const _hoisted_11 = { class: "flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_12 = {
  key: 0,
  class: "flex items-center space-x-1"
};
const _hoisted_13 = {
  key: 1,
  class: "flex items-center space-x-1"
};
const _hoisted_14 = { class: "flex-2" };
const _hoisted_15 = { class: "flex items-center space-x-2" };
const _hoisted_16 = { class: "text-gray-700 dark:text-gray-300" };
const _hoisted_17 = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-gray-400 mt-1"
};
const _hoisted_18 = { class: "font-medium" };
const _hoisted_19 = { class: "flex-shrink-0" };
const _hoisted_20 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_21 = { class: "flex items-center space-x-2 ml-4 xl:items-center 2xl:items-center" };
const _hoisted_22 = {
  class: "w-5 h-5",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_23 = {
  key: 0,
  d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
};
const _hoisted_24 = {
  key: 1,
  d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
  fill: "none",
  stroke: "currentColor"
};
const _hoisted_25 = {
  key: 0,
  class: "fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
};
const _hoisted_26 = { class: "relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl h-[400px] sm:h-[500px] md:h-[600px] transform" };
const _hoisted_27 = { class: "w-full h-full flex items-center justify-center p-4" };
const _hoisted_28 = ["src", "alt"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyCard",
  props: {
    word: {},
    moveMode: { type: Boolean }
  },
  emits: ["play-audio", "edit-word", "delete-word", "toggle-favorite", "view-details", "move-vocabulary"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    const isImageModalOpen = ref(false);
    const openImageModal = () => {
      isImageModalOpen.value = true;
      document.body.style.overflow = "hidden";
    };
    const closeImageModal = () => {
      isImageModalOpen.value = false;
      document.body.style.overflow = "";
    };
    const props = __props;
    const emit = __emit;
    onUnmounted(() => {
      if (isImageModalOpen.value) {
        document.body.style.overflow = "";
      }
    });
    const viewDetails = () => {
      emit("view-details", props.word);
    };
    const handleImageError = (event) => {
      const img = event.target;
      console.warn(`Failed to load image for word: ${props.word.word}`, img.src);
      const container = img.closest(".flex-shrink-0");
      if (container) {
        container.style.display = "none";
      }
    };
    const getLevelColor = (level) => {
      switch (level) {
        case "beginner":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case "intermediate":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case "advanced":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: "p-3 sm:p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-custom cursor-pointer",
          onClick: viewDetails
        }, [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                _ctx.word.image ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("img", {
                      src: _ctx.word.image,
                      alt: `${unref(t)("vocabulary.image.preview", "Image preview")} - ${_ctx.word.word}`,
                      class: "w-full h-full object-cover cursor-pointer",
                      onError: handleImageError,
                      onClick: withModifiers(openImageModal, ["stop"])
                    }, null, 40, _hoisted_6)
                  ])
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("h4", _hoisted_8, toDisplayString(_ctx.word.word), 1),
                  createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.word.pronunciation), 1),
                  createBaseVNode("p", _hoisted_10, toDisplayString(_ctx.word.partOfSpeech), 1),
                  createBaseVNode("div", _hoisted_11, [
                    _ctx.word.createdAt ? (openBlock(), createElementBlock("div", _hoisted_12, [
                      _cache[5] || (_cache[5] = createBaseVNode("svg", {
                        class: "w-3 h-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                          "clip-rule": "evenodd"
                        })
                      ], -1)),
                      createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.createdAt", "Created at")) + ": " + toDisplayString(unref(getRelativeTime)(_ctx.word.createdAt, unref(locale))), 1)
                    ])) : createCommentVNode("", true),
                    _ctx.word.updatedAt && _ctx.word.updatedAt !== _ctx.word.createdAt ? (openBlock(), createElementBlock("div", _hoisted_13, [
                      _cache[6] || (_cache[6] = createBaseVNode("svg", {
                        class: "w-3 h-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", { d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" })
                      ], -1)),
                      createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.updatedAt", "Updated at")) + ": " + toDisplayString(unref(getRelativeTime)(_ctx.word.updatedAt, unref(locale))), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("p", _hoisted_16, toDisplayString(_ctx.word.meaning), 1),
                    createVNode(unref(_sfc_main$1), {
                      word: _ctx.word,
                      "move-mode": _ctx.moveMode,
                      onMoveVocabulary: _cache[0] || (_cache[0] = ($event) => emit("move-vocabulary", $event))
                    }, null, 8, ["word", "move-mode"])
                  ]),
                  _ctx.word.example ? (openBlock(), createElementBlock("p", _hoisted_17, [
                    createBaseVNode("span", _hoisted_18, toDisplayString(unref(t)("vocabulary.example", "Example")) + ":", 1),
                    createTextVNode(" " + toDisplayString(_ctx.word.example), 1)
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("span", {
                    class: normalizeClass([getLevelColor(_ctx.word.level), "px-2 py-1 text-xs font-medium rounded-full"])
                  }, toDisplayString(unref(t)(`vocabulary.levels.${_ctx.word.level}`, _ctx.word.level)), 3),
                  createBaseVNode("p", _hoisted_20, toDisplayString(unref(getTopicName)(_ctx.word.category)), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.$emit("toggle-favorite", _ctx.word), ["stop"])),
                class: normalizeClass(["text-gray-500 hover:text-yellow-500", { "text-yellow-500": _ctx.word.favorite }])
              }, [
                (openBlock(), createElementBlock("svg", _hoisted_22, [
                  _ctx.word.favorite ? (openBlock(), createElementBlock("path", _hoisted_23)) : (openBlock(), createElementBlock("path", _hoisted_24))
                ]))
              ], 2),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.$emit("play-audio", _ctx.word.word), ["stop"])),
                class: "text-blue-500 hover:text-blue-600"
              }, _cache[7] || (_cache[7] = [
                createBaseVNode("svg", {
                  class: "w-5 h-5",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 012-2v4a2 2 0 01-2-2z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ])),
              createBaseVNode("button", {
                onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.$emit("edit-word", _ctx.word), ["stop"])),
                class: "text-gray-500 hover:text-gray-600"
              }, _cache[8] || (_cache[8] = [
                createBaseVNode("svg", {
                  class: "w-5 h-5",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                ], -1)
              ])),
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = withModifiers(($event) => _ctx.$emit("delete-word", _ctx.word), ["stop"])),
                class: "text-red-500 hover:text-red-600"
              }, _cache[9] || (_cache[9] = [
                createBaseVNode("svg", {
                  class: "w-5 h-5",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z",
                    "clip-rule": "evenodd"
                  }),
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ]))
            ])
          ])
        ]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, {
            "enter-active-class": "transition-all duration-500 ease-out",
            "enter-from-class": "opacity-0",
            "enter-to-class": "opacity-100",
            "leave-active-class": "transition-all duration-300 ease-in",
            "leave-from-class": "opacity-100",
            "leave-to-class": "opacity-0"
          }, {
            default: withCtx(() => [
              isImageModalOpen.value ? (openBlock(), createElementBlock("div", _hoisted_25, [
                createVNode(Transition, {
                  "enter-active-class": "transition-all duration-500 ease-out",
                  "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                  "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                  "leave-active-class": "transition-all duration-300 ease-in",
                  "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                  "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_26, [
                      createBaseVNode("button", {
                        onClick: closeImageModal,
                        class: "absolute top-4 right-4 z-[10000] text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 bg-white dark:bg-[#0a0a0a] bg-opacity-80 dark:bg-opacity-80 rounded-full p-2 shadow-lg"
                      }, _cache[10] || (_cache[10] = [
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
                      ])),
                      createBaseVNode("div", _hoisted_27, [
                        createBaseVNode("img", {
                          src: _ctx.word.image,
                          alt: `${unref(t)("vocabulary.image.preview", "Image preview")} - ${_ctx.word.word}`,
                          class: "max-w-full max-h-full object-contain rounded-lg shadow-lg animate-fade-in-up",
                          style: { "animation-delay": "0.2s" }
                        }, null, 8, _hoisted_28)
                      ])
                    ])
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]))
      ]);
    };
  }
});
const VocabularyCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90ec8026"]]);
export {
  VocabularyCard as default
};
//# sourceMappingURL=VocabularyCard-BGmRQJHM.js.map
