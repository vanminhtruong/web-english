import { d as defineComponent, H as useI18n, a2 as reactive, K as watch, L as onUnmounted, b as createBlock, v as openBlock, w as withCtx, c as createElementBlock, e as createCommentVNode, y as createVNode, N as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, O as vModelText, P as vModelSelect, F as Fragment, j as renderList, r as resolveDynamicComponent, n as normalizeClass } from "./vendor-BIIJCJs6.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b-0 dark:border-b dark:border-gray-custom flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_7 = { class: "space-y-6" };
const _hoisted_8 = {
  class: "bg-white dark:bg-gray-custom border-0 dark:border dark:border-gray-custom rounded-lg p-4 animate-fade-in-up ring-1 ring-gray-100 dark:ring-0",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_9 = { class: "text-md font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_11 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_12 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_13 = ["placeholder"];
const _hoisted_14 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_15 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_16 = ["placeholder"];
const _hoisted_17 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_18 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_19 = ["placeholder"];
const _hoisted_20 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_21 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_22 = { value: "easy" };
const _hoisted_23 = { value: "medium" };
const _hoisted_24 = { value: "hard" };
const _hoisted_25 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_26 = ["placeholder"];
const _hoisted_27 = {
  class: "flex justify-end mt-4 animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_28 = { class: "text-md font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_29 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_30 = { class: "flex items-start justify-between" };
const _hoisted_31 = { class: "flex-1" };
const _hoisted_32 = { class: "flex items-center space-x-2 mb-2" };
const _hoisted_33 = { class: "font-medium text-gray-900 dark:text-white" };
const _hoisted_34 = { class: "text-sm text-gray-600 dark:text-white/60 mb-2" };
const _hoisted_35 = { class: "flex items-center space-x-4 text-xs text-gray-500 dark:text-white/60" };
const _hoisted_36 = { class: "flex items-center space-x-2 ml-4" };
const _hoisted_37 = ["onClick", "title"];
const _hoisted_38 = ["onClick", "title"];
const _hoisted_39 = ["onClick", "title"];
const _hoisted_40 = { class: "px-6 py-4 border-t-0 dark:border-t dark:border-gray-custom flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_41 = { class: "flex justify-end space-x-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExerciseManager",
  props: {
    modelValue: { type: Boolean },
    exerciseTypes: {}
  },
  emits: ["update:modelValue", "add-exercise", "edit-exercise", "delete-exercise", "save-exercises", "open-question-manager"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      const translated = params ? t(key, params) : t(key);
      const text = typeof translated === "string" ? translated : String(translated);
      if (text === key) return fallback;
      return text;
    };
    const newExercise = reactive({
      type: "",
      title: "",
      description: "",
      difficulty: "easy",
      duration: "",
      icon: "BookOpenIcon",
      colorClass: "bg-gray-500"
    });
    const closeModal = () => {
      emit("update:modelValue", false);
    };
    const addExerciseType = () => {
      if (!newExercise.type || !newExercise.title || !newExercise.description) {
        return;
      }
      const exerciseToAdd = {
        ...newExercise,
        icon: getIconForType(newExercise.type),
        colorClass: getColorForType(newExercise.type)
      };
      emit("add-exercise", exerciseToAdd);
      Object.assign(newExercise, {
        type: "",
        title: "",
        description: "",
        difficulty: "easy",
        duration: "",
        icon: "BookOpenIcon",
        colorClass: "bg-gray-500"
      });
    };
    const editExerciseType = (index) => {
      const exercise = props.exerciseTypes[index];
      Object.assign(newExercise, exercise);
      emit("edit-exercise", index, exercise);
    };
    const deleteExerciseType = (index) => {
      if (confirm(t("common.confirmDelete", "Are you sure you want to delete this?"))) {
        emit("delete-exercise", index);
      }
    };
    const saveExerciseTypes = () => {
      emit("save-exercises");
      closeModal();
    };
    const openQuestionManager = (exerciseType) => {
      emit("open-question-manager", exerciseType);
    };
    const getIconForType = (type) => {
      const iconMap = {
        "multiple-choice": "CheckCircleIcon",
        "fill-blank": "PencilIcon",
        "writing": "DocumentTextIcon",
        "listening": "SpeakerWaveIcon",
        "reading": "BookOpenIcon",
        "grammar": "AcademicCapIcon"
      };
      return iconMap[type] || "BookOpenIcon";
    };
    const getColorForType = (type) => {
      const colorMap = {
        "multiple-choice": "bg-gray-500",
        "fill-blank": "bg-green-500",
        "writing": "bg-purple-500",
        "listening": "bg-orange-500",
        "reading": "bg-indigo-500",
        "grammar": "bg-red-500"
      };
      return colorMap[type] || "bg-gray-500";
    };
    watch(() => props.modelValue, (newValue) => {
      if (!newValue) {
        Object.assign(newExercise, {
          type: "",
          title: "",
          description: "",
          difficulty: "easy",
          duration: "",
          icon: "BookOpenIcon",
          colorClass: "bg-gray-500"
        });
      }
    });
    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };
    watch(() => props.modelValue, (open) => {
      if (open) lockBodyScroll();
      else unlockBodyScroll();
    }, { immediate: true });
    onUnmounted(() => {
      unlockBodyScroll();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        appear: "",
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
              appear: "",
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
                    class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border-0 dark:border dark:border-gray-custom flex flex-col h-full overflow-hidden transform transform-gpu will-change-transform",
                    onClick: _cache[5] || (_cache[5] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_3, [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("h3", _hoisted_5, [
                          _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                          createBaseVNode("span", null, toDisplayString(unref(t)("grammar.practice.exerciseManager.title", "Exercise Manager")), 1)
                        ]),
                        createBaseVNode("button", {
                          onClick: closeModal,
                          class: "text-gray-400 hover:text-gray-600 dark:text-white/60 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10",
                          "aria-label": "Close"
                        }, _cache[7] || (_cache[7] = [
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
                          createBaseVNode("h4", _hoisted_9, toDisplayString(unref(t)("grammar.practice.exerciseManager.addNew", "Add new exercise type")), 1),
                          createBaseVNode("div", _hoisted_10, [
                            createBaseVNode("div", _hoisted_11, [
                              createBaseVNode("label", _hoisted_12, toDisplayString(unref(t)("grammar.practice.exerciseManager.exerciseType", "Exercise type")), 1),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newExercise.type = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("grammar.practice.exerciseManager.typePlaceholder", "e.g. multiple-choice")
                              }, null, 8, _hoisted_13), [
                                [vModelText, newExercise.type]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_14, [
                              createBaseVNode("label", _hoisted_15, toDisplayString(unref(t)("grammar.practice.exerciseManager.title", "Title")), 1),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newExercise.title = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("grammar.practice.exerciseManager.titlePlaceholder", "Enter exercise title")
                              }, null, 8, _hoisted_16), [
                                [vModelText, newExercise.title]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_17, [
                              createBaseVNode("label", _hoisted_18, toDisplayString(unref(t)("grammar.practice.exerciseManager.description", "Description")), 1),
                              withDirectives(createBaseVNode("textarea", {
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newExercise.description = $event),
                                rows: "3",
                                class: "w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("grammar.practice.exerciseManager.descriptionPlaceholder", "Briefly describe this exercise")
                              }, null, 8, _hoisted_19), [
                                [vModelText, newExercise.description]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_20, [
                              createBaseVNode("label", _hoisted_21, toDisplayString(unref(t)("grammar.practice.exerciseManager.difficulty", "Difficulty")), 1),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => newExercise.difficulty = $event),
                                class: "w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02] cursor-pointer"
                              }, [
                                createBaseVNode("option", _hoisted_22, toDisplayString(unref(t)("grammar.practice.settings.levels.easy", "Easy")), 1),
                                createBaseVNode("option", _hoisted_23, toDisplayString(unref(t)("grammar.practice.settings.levels.medium", "Medium")), 1),
                                createBaseVNode("option", _hoisted_24, toDisplayString(unref(t)("grammar.practice.settings.levels.hard", "Hard")), 1)
                              ], 512), [
                                [vModelSelect, newExercise.difficulty]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              createBaseVNode("label", _hoisted_25, toDisplayString(unref(t)("grammar.practice.exerciseManager.duration", "Duration")), 1),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => newExercise.duration = $event),
                                type: "text",
                                class: "w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                placeholder: unref(t)("grammar.practice.exerciseManager.durationPlaceholder", "e.g. 10-15 min")
                              }, null, 8, _hoisted_26), [
                                [vModelText, newExercise.duration]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_27, [
                            createBaseVNode("button", {
                              onClick: addExerciseType,
                              class: "px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            }, toDisplayString(unref(t)("grammar.practice.exerciseManager.add", "Add")), 1)
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("h4", _hoisted_28, toDisplayString(unref(t)("grammar.practice.exerciseManager.existing", "Existing exercise types")), 1),
                          createBaseVNode("div", _hoisted_29, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.exerciseTypes, (exercise, index) => {
                              return openBlock(), createElementBlock("div", {
                                key: exercise.type,
                                class: "bg-white dark:bg-gray-custom border-0 dark:border dark:border-gray-custom rounded-lg p-4 ring-1 ring-gray-100 dark:ring-0"
                              }, [
                                createBaseVNode("div", _hoisted_30, [
                                  createBaseVNode("div", _hoisted_31, [
                                    createBaseVNode("div", _hoisted_32, [
                                      (openBlock(), createBlock(resolveDynamicComponent(exercise.icon), {
                                        class: normalizeClass(["w-5 h-5", exercise.colorClass.replace("bg-", "text-")])
                                      }, null, 8, ["class"])),
                                      createBaseVNode("h5", _hoisted_33, toDisplayString(tf(`grammar.practice.exercises.${exercise.type}.title`, exercise.title)), 1)
                                    ]),
                                    createBaseVNode("p", _hoisted_34, toDisplayString(tf(`grammar.practice.exercises.${exercise.type}.description`, exercise.description)), 1),
                                    createBaseVNode("div", _hoisted_35, [
                                      createBaseVNode("span", null, toDisplayString(exercise.difficulty), 1),
                                      createBaseVNode("span", null, toDisplayString(exercise.duration), 1)
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_36, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => openQuestionManager(exercise.type),
                                      class: "p-1 rounded text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors",
                                      title: unref(t)("grammar.practice.exerciseManager.manageQuestions", "Manage questions")
                                    }, _cache[8] || (_cache[8] = [
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
                                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        })
                                      ], -1)
                                    ]), 8, _hoisted_37),
                                    createBaseVNode("button", {
                                      onClick: ($event) => editExerciseType(index),
                                      class: "p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors",
                                      title: unref(t)("common.edit", "Edit")
                                    }, _cache[9] || (_cache[9] = [
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
                                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        })
                                      ], -1)
                                    ]), 8, _hoisted_38),
                                    createBaseVNode("button", {
                                      onClick: ($event) => deleteExerciseType(index),
                                      class: "p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",
                                      title: unref(t)("common.delete", "Delete")
                                    }, _cache[10] || (_cache[10] = [
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
                                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        })
                                      ], -1)
                                    ]), 8, _hoisted_39)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_40, [
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("button", {
                          onClick: closeModal,
                          class: "px-6 py-2 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-custom hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: saveExerciseTypes,
                          class: "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        }, toDisplayString(unref(t)("common.save", "Save")), 1)
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
      });
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ExerciseManager-VpKeUNHz.js.map
