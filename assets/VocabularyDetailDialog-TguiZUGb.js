import { d as defineComponent, H as useI18n, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, Z as withKeys, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, n as normalizeClass, g as createTextVNode, F as Fragment, j as renderList } from "./vendor-DoTKyHPB.js";
import { u as useModalStore, g as getTopicName, d as getRelativeTime, e as useVoiceStore, a as _export_sfc } from "./index-B_vvULnT.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-lg" };
const _hoisted_2 = { class: "text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_3 = {
  key: 0,
  class: "p-6 overflow-y-auto flex-1"
};
const _hoisted_4 = {
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_5 = { class: "flex items-center space-x-4 mb-2" };
const _hoisted_6 = { class: "text-3xl font-bold text-gray-900 dark:text-white" };
const _hoisted_7 = ["title"];
const _hoisted_8 = ["title"];
const _hoisted_9 = {
  class: "w-6 h-6",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_10 = {
  key: 0,
  d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
};
const _hoisted_11 = {
  key: 1,
  d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_12 = { class: "text-lg text-gray-600 dark:text-gray-300 mb-1" };
const _hoisted_13 = { class: "flex items-center space-x-3" };
const _hoisted_14 = { class: "px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-300 hover:scale-105" };
const _hoisted_15 = { class: "px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full transition-all duration-300 hover:scale-105" };
const _hoisted_16 = {
  key: 0,
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_17 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center" };
const _hoisted_18 = { class: "flex justify-center" };
const _hoisted_19 = { class: "max-w-md w-full" };
const _hoisted_20 = { class: "relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg" };
const _hoisted_21 = ["src", "alt"];
const _hoisted_22 = { class: "absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100" };
const _hoisted_23 = { class: "bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-3 py-1 rounded-full" };
const _hoisted_24 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_25 = {
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_26 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center" };
const _hoisted_27 = { class: "text-gray-700 dark:text-gray-300 text-lg" };
const _hoisted_28 = {
  key: 1,
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_29 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center" };
const _hoisted_30 = { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4" };
const _hoisted_31 = { class: "flex items-start space-x-3" };
const _hoisted_32 = { class: "flex-1" };
const _hoisted_33 = { class: "text-gray-700 dark:text-gray-300 italic text-lg" };
const _hoisted_34 = ["title"];
const _hoisted_35 = {
  key: 2,
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_36 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center" };
const _hoisted_37 = { class: "flex flex-wrap gap-2" };
const _hoisted_38 = {
  key: 3,
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_39 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center" };
const _hoisted_40 = { class: "flex flex-wrap gap-2" };
const _hoisted_41 = {
  key: 4,
  class: "mb-6 animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_42 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center" };
const _hoisted_43 = { class: "bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 dark:border-yellow-500 p-4" };
const _hoisted_44 = { class: "text-gray-700 dark:text-gray-300" };
const _hoisted_45 = {
  class: "border-t border-gray-200 dark:border-gray-600 pt-4 animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_46 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_47 = {
  key: 0,
  class: "flex items-center space-x-2"
};
const _hoisted_48 = {
  key: 1,
  class: "flex items-center space-x-2"
};
const _hoisted_49 = { class: "flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-b-lg" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyDetailDialog",
  props: {
    modelValue: { type: Boolean },
    vocabulary: {}
  },
  emits: ["update:modelValue", "edit-vocabulary", "toggle-favorite"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    const modalStore = useModalStore();
    const props = __props;
    const emit = __emit;
    const { playAudio: playVoiceAudio } = useVoiceStore();
    const playAudio = (text) => {
      playVoiceAudio(text);
    };
    watch(() => props.modelValue, (newValue) => {
      modalStore.showVocabularyDetail = newValue;
    });
    const closeDialog = () => {
      window.dispatchEvent(new CustomEvent("vocabulary-modal-closed"));
      emit("update:modelValue", false);
    };
    const editVocabulary = () => {
      if (props.vocabulary) {
        emit("edit-vocabulary", props.vocabulary);
        closeDialog();
      }
    };
    const toggleFavorite = () => {
      if (props.vocabulary) {
        emit("toggle-favorite", props.vocabulary);
      }
    };
    const handleImageError = (event) => {
      const img = event.target;
      console.warn(`Failed to load image for vocabulary: ${props.vocabulary?.word}`, img.src);
      const imageSection = img.closest(".mb-6");
      if (imageSection) {
        imageSection.style.display = "none";
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
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        window.dispatchEvent(new CustomEvent("vocabulary-view-details"));
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeydown);
      } else {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeydown);
      }
    }, { immediate: true });
    onUnmounted(() => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
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
            _ctx.modelValue ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm",
              onKeyup: withKeys(closeDialog, ["esc"])
            }, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: "bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] border border-gray-200 dark:border-gray-700 transform overflow-hidden flex flex-col",
                    onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_1, [
                      createBaseVNode("h3", _hoisted_2, [
                        _cache[3] || (_cache[3] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.details.title", "Vocabulary Details")), 1)
                      ]),
                      createBaseVNode("button", {
                        onClick: closeDialog,
                        class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                      }, _cache[4] || (_cache[4] = [
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
                    ]),
                    _ctx.vocabulary ? (openBlock(), createElementBlock("div", _hoisted_3, [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("div", _hoisted_5, [
                          createBaseVNode("h1", _hoisted_6, toDisplayString(_ctx.vocabulary.word), 1),
                          createBaseVNode("button", {
                            onClick: _cache[0] || (_cache[0] = ($event) => playAudio(_ctx.vocabulary.word)),
                            class: "flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg transform hover:-translate-y-0.5",
                            title: unref(t)("vocabulary.details.playAudio", "Play Audio")
                          }, _cache[5] || (_cache[5] = [
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
                          ]), 8, _hoisted_7),
                          createBaseVNode("button", {
                            onClick: toggleFavorite,
                            class: normalizeClass(["flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 transform hover:-translate-y-0.5", _ctx.vocabulary.favorite ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-yellow-500"]),
                            title: _ctx.vocabulary.favorite ? unref(t)("vocabulary.details.removeFavorite", "Remove from favorites") : unref(t)("vocabulary.details.addFavorite", "Add to favorites")
                          }, [
                            (openBlock(), createElementBlock("svg", _hoisted_9, [
                              _ctx.vocabulary.favorite ? (openBlock(), createElementBlock("path", _hoisted_10)) : (openBlock(), createElementBlock("path", _hoisted_11))
                            ]))
                          ], 10, _hoisted_8)
                        ]),
                        createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.vocabulary.pronunciation), 1),
                        createBaseVNode("div", _hoisted_13, [
                          createBaseVNode("span", {
                            class: normalizeClass([getLevelColor(_ctx.vocabulary.level), "px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105"])
                          }, toDisplayString(unref(t)(`vocabulary.levels.${_ctx.vocabulary.level}`, _ctx.vocabulary.level)), 3),
                          createBaseVNode("span", _hoisted_14, toDisplayString(unref(getTopicName)(_ctx.vocabulary.category)), 1),
                          createBaseVNode("span", _hoisted_15, toDisplayString(unref(t)(`vocabulary.wordTypes.${_ctx.vocabulary.partOfSpeech}`, _ctx.vocabulary.partOfSpeech)), 1)
                        ])
                      ]),
                      _ctx.vocabulary.image ? (openBlock(), createElementBlock("div", _hoisted_16, [
                        createBaseVNode("h3", _hoisted_17, [
                          _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.image.title", "Image")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", _hoisted_19, [
                            createBaseVNode("div", _hoisted_20, [
                              createBaseVNode("img", {
                                src: _ctx.vocabulary.image,
                                alt: `${unref(t)("vocabulary.image.preview")} - ${_ctx.vocabulary.word}`,
                                class: "w-full h-auto max-h-80 object-cover transition-all duration-300 hover:scale-105",
                                onError: handleImageError
                              }, null, 40, _hoisted_21),
                              createBaseVNode("div", _hoisted_22, [
                                createBaseVNode("div", _hoisted_23, [
                                  createBaseVNode("span", _hoisted_24, toDisplayString(_ctx.vocabulary.word), 1)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_25, [
                        createBaseVNode("h3", _hoisted_26, [
                          _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-1 h-4 bg-indigo-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.meaning", "Meaning")), 1)
                        ]),
                        createBaseVNode("p", _hoisted_27, toDisplayString(_ctx.vocabulary.meaning), 1)
                      ]),
                      _ctx.vocabulary.example ? (openBlock(), createElementBlock("div", _hoisted_28, [
                        createBaseVNode("h3", _hoisted_29, [
                          _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.example", "Example")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_30, [
                          createBaseVNode("div", _hoisted_31, [
                            createBaseVNode("div", _hoisted_32, [
                              createBaseVNode("p", _hoisted_33, ' "' + toDisplayString(_ctx.vocabulary.example) + '" ', 1)
                            ]),
                            createBaseVNode("button", {
                              onClick: _cache[1] || (_cache[1] = ($event) => playAudio(_ctx.vocabulary.example)),
                              class: "flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 hover:scale-110 transform hover:-translate-y-0.5 flex-shrink-0",
                              title: unref(t)("vocabulary.details.playExample")
                            }, _cache[9] || (_cache[9] = [
                              createBaseVNode("svg", {
                                class: "w-4 h-4",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createBaseVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 8a2 2 0 012-2v4a2 2 0 01-2-2z",
                                  "clip-rule": "evenodd"
                                })
                              ], -1)
                            ]), 8, _hoisted_34)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      _ctx.vocabulary.synonyms && _ctx.vocabulary.synonyms.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_35, [
                        createBaseVNode("h3", _hoisted_36, [
                          _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.synonyms", "Synonyms")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_37, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.vocabulary.synonyms, (synonym) => {
                            return openBlock(), createElementBlock("span", {
                              key: synonym,
                              class: "px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                            }, toDisplayString(synonym), 1);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      _ctx.vocabulary.antonyms && _ctx.vocabulary.antonyms.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_38, [
                        createBaseVNode("h3", _hoisted_39, [
                          _cache[11] || (_cache[11] = createBaseVNode("span", { class: "w-1 h-4 bg-red-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.antonyms", "Antonyms")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_40, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.vocabulary.antonyms, (antonym) => {
                            return openBlock(), createElementBlock("span", {
                              key: antonym,
                              class: "px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                            }, toDisplayString(antonym), 1);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      _ctx.vocabulary.notes ? (openBlock(), createElementBlock("div", _hoisted_41, [
                        createBaseVNode("h3", _hoisted_42, [
                          _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.note", "Notes")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_43, [
                          createBaseVNode("p", _hoisted_44, toDisplayString(_ctx.vocabulary.notes), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_45, [
                        createBaseVNode("div", _hoisted_46, [
                          _ctx.vocabulary.createdAt ? (openBlock(), createElementBlock("div", _hoisted_47, [
                            _cache[13] || (_cache[13] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.createdAt", "Created")) + ": " + toDisplayString(unref(getRelativeTime)(_ctx.vocabulary.createdAt, unref(t))), 1)
                          ])) : createCommentVNode("", true),
                          _ctx.vocabulary.updatedAt && _ctx.vocabulary.updatedAt !== _ctx.vocabulary.createdAt ? (openBlock(), createElementBlock("div", _hoisted_48, [
                            _cache[14] || (_cache[14] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", { d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.updatedAt", "Updated")) + ": " + toDisplayString(unref(getRelativeTime)(_ctx.vocabulary.updatedAt, unref(t))), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_49, [
                      createBaseVNode("button", {
                        onClick: editVocabulary,
                        class: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
                      }, toDisplayString(unref(t)("common.edit", "Edit")), 1),
                      createBaseVNode("button", {
                        onClick: closeDialog,
                        class: "px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
                      }, toDisplayString(unref(t)("common.close", "Close")), 1)
                    ])
                  ])
                ]),
                _: 1
              })
            ], 32)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const VocabularyDetailDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3ed5305"]]);
export {
  VocabularyDetailDialog as default
};
//# sourceMappingURL=VocabularyDetailDialog-TguiZUGb.js.map
