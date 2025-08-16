import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, n as normalizeClass, C as withDirectives, S as vModelText, F as Fragment, j as renderList } from "./vendor-DoTKyHPB.js";
import { c as useVocabularyStore, g as getTopicName } from "./index-C_alvGXG.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-md" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "px-6 py-4" };
const _hoisted_7 = { class: "space-y-4" };
const _hoisted_8 = { class: "relative" };
const _hoisted_9 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_10 = {
  key: 0,
  class: "absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-md shadow-xl z-[99999] overflow-hidden"
};
const _hoisted_11 = { class: "p-3 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_12 = ["placeholder"];
const _hoisted_13 = { class: "max-h-[240px] overflow-y-auto" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  key: 0,
  class: "px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
};
const _hoisted_16 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_17 = ["value"];
const _hoisted_18 = { value: "" };
const _hoisted_19 = ["value"];
const _hoisted_20 = { class: "flex items-center" };
const _hoisted_21 = ["checked"];
const _hoisted_22 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_23 = { class: "flex items-center" };
const _hoisted_24 = ["checked"];
const _hoisted_25 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_26 = { class: "flex justify-end space-x-3 mt-6" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsModal",
  props: {
    show: { type: Boolean },
    settings: {},
    localSettings: {},
    dateFilterEnabled: { type: Boolean },
    selectedDate: {}
  },
  emits: ["update:settings", "update:local-settings", "cancel", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { getCategories, getLevels, allVocabularies } = useVocabularyStore();
    const levels = getLevels;
    const categoryDropdownOpen = ref(false);
    const categorySearchQuery = ref("");
    const categories = computed(() => {
      if (props.dateFilterEnabled && props.selectedDate) {
        const vocabulariesForDate = allVocabularies.value.filter((vocab) => {
          return vocab.createdAt && vocab.createdAt.startsWith(props.selectedDate);
        });
        const categoriesForDate = new Set(vocabulariesForDate.map((vocab) => vocab.category));
        return Array.from(categoriesForDate);
      }
      const categorySet = new Set(allVocabularies.value.map((v) => v.category));
      return Array.from(categorySet);
    });
    const filteredCategories = computed(() => {
      if (!categorySearchQuery.value) return categories.value;
      return categories.value.filter((category) => {
        const topicName = getTopicName(category).toLowerCase();
        return topicName.includes(categorySearchQuery.value.toLowerCase());
      });
    });
    const getSelectedCategoryDisplay = () => {
      if (!props.localSettings.category) {
        return t("flashcard.settings.all", "All");
      }
      return getTopicName(props.localSettings.category);
    };
    const toggleCategoryDropdown = () => {
      categoryDropdownOpen.value = !categoryDropdownOpen.value;
      if (categoryDropdownOpen.value) {
        categorySearchQuery.value = "";
      }
    };
    const selectCategory = (category) => {
      updateLocalSetting("category", { target: { value: category } });
      categoryDropdownOpen.value = false;
      categorySearchQuery.value = "";
    };
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".relative")) {
        categoryDropdownOpen.value = false;
      }
    };
    watch(() => props.show, (newShow) => {
      if (!newShow) {
        categoryDropdownOpen.value = false;
        categorySearchQuery.value = "";
      }
    });
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    const updateLocalSetting = (key, event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      emit("update:local-settings", { ...props.localSettings, [key]: value });
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
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 transform",
                      onClick: _cache[9] || (_cache[9] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h3", _hoisted_5, [
                            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("flashcard.settings.title", "Flashcard Settings")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[0] || (_cache[0] = ($event) => emit("cancel")),
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[11] || (_cache[11] = [
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
                      createBaseVNode("div", _hoisted_6, [
                        createBaseVNode("div", _hoisted_7, [
                          createBaseVNode("div", _hoisted_8, [
                            createBaseVNode("label", _hoisted_9, toDisplayString(unref(t)("flashcard.settings.category", "Category")), 1),
                            createBaseVNode("button", {
                              type: "button",
                              onClick: toggleCategoryDropdown,
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-left flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                            }, [
                              createBaseVNode("span", null, toDisplayString(getSelectedCategoryDisplay()), 1),
                              (openBlock(), createElementBlock("svg", {
                                class: normalizeClass(["w-4 h-4 transition-transform duration-200", categoryDropdownOpen.value ? "rotate-180" : ""]),
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, _cache[12] || (_cache[12] = [
                                createBaseVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z",
                                  "clip-rule": "evenodd"
                                }, null, -1)
                              ]), 2))
                            ]),
                            createVNode(Transition, {
                              "enter-active-class": "transition-all duration-200 ease-out",
                              "enter-from-class": "opacity-0 scale-95 translate-y-2",
                              "enter-to-class": "opacity-100 scale-100 translate-y-0",
                              "leave-active-class": "transition-all duration-150 ease-in",
                              "leave-from-class": "opacity-100 scale-100 translate-y-0",
                              "leave-to-class": "opacity-0 scale-95 translate-y-2"
                            }, {
                              default: withCtx(() => [
                                categoryDropdownOpen.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                                  createBaseVNode("div", _hoisted_11, [
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => categorySearchQuery.value = $event),
                                      type: "text",
                                      placeholder: unref(t)("common.search", "Search") + "...",
                                      class: "w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
                                      onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                                      }, ["stop"]))
                                    }, null, 8, _hoisted_12), [
                                      [vModelText, categorySearchQuery.value]
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_13, [
                                    createBaseVNode("div", {
                                      class: normalizeClass(["px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white transition-colors", _ctx.localSettings.category === "" ? "bg-blue-100 dark:bg-blue-900/30 font-medium" : ""]),
                                      onClick: _cache[3] || (_cache[3] = ($event) => selectCategory(""))
                                    }, toDisplayString(unref(t)("flashcard.settings.all", "All")), 3),
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCategories.value, (category) => {
                                      return openBlock(), createElementBlock("div", {
                                        key: category,
                                        class: normalizeClass(["px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white transition-colors", _ctx.localSettings.category === category ? "bg-blue-100 dark:bg-blue-900/30 font-medium" : ""]),
                                        onClick: ($event) => selectCategory(category)
                                      }, toDisplayString(unref(getTopicName)(category)), 11, _hoisted_14);
                                    }), 128)),
                                    filteredCategories.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_15, toDisplayString(unref(t)("common.noResults", "No results found")), 1)) : createCommentVNode("", true)
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("label", _hoisted_16, toDisplayString(unref(t)("flashcard.settings.level", "Level")), 1),
                            createBaseVNode("select", {
                              value: _ctx.localSettings.level,
                              onChange: _cache[4] || (_cache[4] = ($event) => updateLocalSetting("level", $event)),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
                            }, [
                              createBaseVNode("option", _hoisted_18, toDisplayString(unref(t)("flashcard.settings.all", "All")), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(levels), (level) => {
                                return openBlock(), createElementBlock("option", {
                                  key: level,
                                  value: level
                                }, toDisplayString(unref(t)(`flashcard.settings.${level.toLowerCase()}`, level)), 9, _hoisted_19);
                              }), 128))
                            ], 40, _hoisted_17)
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("label", _hoisted_20, [
                              createBaseVNode("input", {
                                type: "checkbox",
                                checked: _ctx.localSettings.autoFlip,
                                onChange: _cache[5] || (_cache[5] = ($event) => updateLocalSetting("autoFlip", $event)),
                                class: "mr-2"
                              }, null, 40, _hoisted_21),
                              createBaseVNode("span", _hoisted_22, toDisplayString(unref(t)("flashcard.settings.autoFlip", "Auto-flip after answering")), 1)
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("label", _hoisted_23, [
                              createBaseVNode("input", {
                                type: "checkbox",
                                checked: _ctx.localSettings.shuffleCards,
                                onChange: _cache[6] || (_cache[6] = ($event) => updateLocalSetting("shuffleCards", $event)),
                                class: "mr-2"
                              }, null, 40, _hoisted_24),
                              createBaseVNode("span", _hoisted_25, toDisplayString(unref(t)("flashcard.settings.shuffle", "Shuffle cards")), 1)
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_26, [
                          createBaseVNode("button", {
                            onClick: _cache[7] || (_cache[7] = ($event) => emit("cancel")),
                            class: "px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                          createBaseVNode("button", {
                            onClick: _cache[8] || (_cache[8] = ($event) => emit("apply")),
                            class: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                          }, toDisplayString(unref(t)("common.apply", "Apply")), 1)
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
//# sourceMappingURL=SettingsModal-BpWshGZ5.js.map
