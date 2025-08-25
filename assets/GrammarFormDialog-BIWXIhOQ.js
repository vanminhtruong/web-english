import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, f as createBaseVNode, N as Transition, t as toDisplayString, u as unref, i as withModifiers, g as createTextVNode, C as withDirectives, O as vModelText, F as Fragment, j as renderList, P as vModelSelect, a as normalizeStyle } from "./vendor-Cr_Qcp9o.js";
import { m as useGrammarStore, a as _export_sfc } from "./index-DtybCwK3.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-50 overflow-hidden",
  "aria-labelledby": "modal-title",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_2 = { class: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" };
const _hoisted_3 = { class: "inline-block align-bottom bg-white dark:bg-[#0a0a0a] rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-200 dark:border-gray-700" };
const _hoisted_4 = { class: "bg-white dark:bg-[#0a0a0a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4" };
const _hoisted_5 = { class: "flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] -mx-4 -mt-5 px-4 pt-5 sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6" };
const _hoisted_6 = { class: "text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_7 = {
  class: "bg-white dark:bg-[#0f0f0f] shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_8 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center" };
const _hoisted_9 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_10 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_11 = {
  for: "title",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_12 = ["placeholder"];
const _hoisted_13 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_14 = {
  for: "category",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_15 = { value: "" };
const _hoisted_16 = ["value"];
const _hoisted_17 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_18 = {
  for: "level",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_19 = { value: "" };
const _hoisted_20 = { value: "beginner" };
const _hoisted_21 = { value: "intermediate" };
const _hoisted_22 = { value: "advanced" };
const _hoisted_23 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_24 = {
  for: "duration",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_25 = {
  class: "md:col-span-2 animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_26 = {
  for: "description",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_27 = ["placeholder"];
const _hoisted_28 = {
  class: "bg-white dark:bg-[#0f0f0f] shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_29 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center" };
const _hoisted_30 = { class: "space-y-6" };
const _hoisted_31 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_32 = {
  for: "theory",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_33 = ["placeholder"];
const _hoisted_34 = { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_35 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.9s" }
};
const _hoisted_36 = {
  for: "structure",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_37 = ["placeholder"];
const _hoisted_38 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "1.0s" }
};
const _hoisted_39 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_40 = { class: "space-y-2" };
const _hoisted_41 = { class: "flex-1" };
const _hoisted_42 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_43 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_44 = ["onClick", "disabled"];
const _hoisted_45 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "1.2s" }
};
const _hoisted_46 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_47 = { class: "space-y-2" };
const _hoisted_48 = { class: "flex-1" };
const _hoisted_49 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_50 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_51 = ["onClick"];
const _hoisted_52 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "1.4s" }
};
const _hoisted_53 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_54 = { class: "space-y-2" };
const _hoisted_55 = { class: "flex-1" };
const _hoisted_56 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_57 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_58 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_59 = ["onClick"];
const _hoisted_60 = { class: "bg-gray-50 dark:bg-[#0f0f0f] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_61 = ["disabled"];
const _hoisted_62 = {
  key: 0,
  class: "animate-spin h-4 w-4 mr-2",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarFormDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    editId: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "saved"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      const translated = params ? t(key, params) : t(key);
      const text = typeof translated === "string" ? translated : String(translated);
      if (text === key) {
        if (params) {
          return fallback.replace("{{index}}", String(params.index ?? ""));
        }
        return fallback;
      }
      return text;
    };
    const grammarStore = useGrammarStore();
    const isSubmitting = ref(false);
    const isEdit = computed(() => !!props.editId);
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    onUnmounted(() => {
      document.body.style.overflow = "";
    });
    const categories = ref([
      "Tenses",
      "Conditionals",
      "Passive Voice",
      "Modal Verbs",
      "Reported Speech",
      "Articles",
      "Prepositions",
      "Adjectives & Adverbs",
      "Phrasal Verbs",
      "Gerunds & Infinitives"
    ]);
    const form = ref({
      title: "",
      description: "",
      level: "",
      category: "",
      duration: 30,
      theory: "",
      structure: "",
      examples: [
        { text: "", translation: "" }
      ],
      usageRules: [
        { title: "", description: "" }
      ],
      commonMistakes: [
        { wrong: "", correct: "", explanation: "" }
      ]
    });
    const resetForm = () => {
      form.value = {
        title: "",
        description: "",
        level: "",
        category: "",
        duration: 30,
        theory: "",
        structure: "",
        examples: [{ text: "", translation: "" }],
        usageRules: [{ title: "", description: "" }],
        commonMistakes: [{ wrong: "", correct: "", explanation: "" }]
      };
    };
    watch(() => props.editId, (newId) => {
      if (newId) {
        const lesson = grammarStore.getLesson(newId);
        if (lesson) {
          form.value = {
            title: lesson.title,
            description: lesson.description,
            level: lesson.level,
            category: lesson.category,
            duration: lesson.duration,
            theory: lesson.theory,
            structure: lesson.structure || "",
            examples: lesson.examples.map((ex) => ({
              text: ex.text,
              translation: ex.translation
            })),
            usageRules: lesson.usageRules?.map((rule) => ({
              title: rule.title,
              description: rule.description
            })) || [{ title: "", description: "" }],
            commonMistakes: lesson.commonMistakes?.map((mistake) => ({
              wrong: mistake.wrong,
              correct: mistake.correct,
              explanation: mistake.explanation
            })) || [{ wrong: "", correct: "", explanation: "" }]
          };
        }
      } else {
        resetForm();
      }
    }, { immediate: true });
    const addExample = () => {
      form.value.examples.push({ text: "", translation: "" });
    };
    const removeExample = (index) => {
      if (form.value.examples.length > 1) {
        form.value.examples.splice(index, 1);
      }
    };
    const addRule = () => {
      form.value.usageRules.push({ title: "", description: "" });
    };
    const removeRule = (index) => {
      form.value.usageRules.splice(index, 1);
    };
    const addMistake = () => {
      form.value.commonMistakes.push({ wrong: "", correct: "", explanation: "" });
    };
    const removeMistake = (index) => {
      form.value.commonMistakes.splice(index, 1);
    };
    const closeDialog = () => {
      emit("update:modelValue", false);
    };
    const submitForm = () => {
      isSubmitting.value = true;
      const filteredUsageRules = form.value.usageRules.filter((rule) => rule.title.trim() !== "" || rule.description.trim() !== "");
      const filteredMistakes = form.value.commonMistakes.filter((mistake) => mistake.wrong.trim() !== "" || mistake.correct.trim() !== "" || mistake.explanation.trim() !== "");
      const rules = filteredUsageRules.map((rule, index) => ({
        id: index + 1,
        title: rule.title,
        description: rule.description
      }));
      const examples = form.value.examples.map((example, index) => ({
        id: index + 1,
        text: example.text,
        translation: example.translation
      }));
      const commonMistakes = filteredMistakes.map((mistake, index) => ({
        id: index + 1,
        wrong: mistake.wrong,
        correct: mistake.correct,
        explanation: mistake.explanation
      }));
      const lessonData = {
        id: isEdit.value ? props.editId : Date.now().toString(),
        title: form.value.title,
        description: form.value.description,
        level: form.value.level,
        category: form.value.category,
        duration: form.value.duration,
        rating: isEdit.value ? grammarStore.getLesson(props.editId)?.rating || 5 : 5,
        progress: isEdit.value ? grammarStore.getLesson(props.editId)?.progress || 0 : 0,
        exercises: Math.floor(form.value.duration / 5),
        theory: form.value.theory,
        structure: form.value.structure,
        examples,
        rules,
        usageRules: filteredUsageRules,
        commonMistakes
      };
      if (isEdit.value) {
        grammarStore.updateLesson(props.editId, lessonData);
      } else {
        grammarStore.addLesson(lessonData);
      }
      setTimeout(() => {
        isSubmitting.value = false;
        emit("saved", lessonData);
        emit("update:modelValue", false);
        resetForm();
      }, 500);
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
            __props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                _cache[36] || (_cache[36] = createBaseVNode("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" }, null, -1)),
                createVNode(Transition, {
                  "enter-active-class": "transition-all duration-500 ease-out",
                  "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                  "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                  "leave-active-class": "transition-all duration-300 ease-in",
                  "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                  "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("div", _hoisted_5, [
                          createBaseVNode("h3", _hoisted_6, [
                            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(isEdit.value ? unref(t)("grammar.editLesson", "Edit Lesson") : unref(t)("grammar.addNewLesson", "Add New Lesson")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeDialog,
                            class: "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[8] || (_cache[8] = [
                            createBaseVNode("svg", {
                              class: "h-6 w-6",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
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
                        createBaseVNode("form", {
                          onSubmit: withModifiers(submitForm, ["prevent"]),
                          class: "space-y-6 mt-4 max-h-[calc(100vh-200px)] overflow-y-auto px-2"
                        }, [
                          createBaseVNode("div", _hoisted_7, [
                            createBaseVNode("h3", _hoisted_8, [
                              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("common.title")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_9, [
                              createBaseVNode("div", _hoisted_10, [
                                createBaseVNode("label", _hoisted_11, [
                                  _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-1 h-3 bg-blue-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("common.title", "Title")) + " ", 1),
                                  _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("input", {
                                  id: "title",
                                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.value.title = $event),
                                  type: "text",
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]",
                                  placeholder: unref(t)("grammar.titlePlaceholder", "Enter lesson title")
                                }, null, 8, _hoisted_12), [
                                  [vModelText, form.value.title]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_13, [
                                createBaseVNode("label", _hoisted_14, [
                                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-1 h-3 bg-green-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.category", "Category")) + " ", 1),
                                  _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("select", {
                                  id: "category",
                                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.category = $event),
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02] cursor-pointer"
                                }, [
                                  createBaseVNode("option", _hoisted_15, toDisplayString(unref(t)("grammar.selectCategory", "Select category")), 1),
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (category) => {
                                    return openBlock(), createElementBlock("option", {
                                      key: category,
                                      value: category
                                    }, toDisplayString(category), 9, _hoisted_16);
                                  }), 128))
                                ], 512), [
                                  [vModelSelect, form.value.category]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_17, [
                                createBaseVNode("label", _hoisted_18, [
                                  _cache[14] || (_cache[14] = createBaseVNode("span", { class: "w-1 h-3 bg-purple-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.level", "Level")) + " ", 1),
                                  _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("select", {
                                  id: "level",
                                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.level = $event),
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer"
                                }, [
                                  createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("grammar.selectLevel", "Select level")), 1),
                                  createBaseVNode("option", _hoisted_20, toDisplayString(unref(t)("grammar.levels.beginner", "Beginner")), 1),
                                  createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("grammar.levels.intermediate", "Intermediate")), 1),
                                  createBaseVNode("option", _hoisted_22, toDisplayString(unref(t)("grammar.levels.advanced", "Advanced")), 1)
                                ], 512), [
                                  [vModelSelect, form.value.level]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_23, [
                                createBaseVNode("label", _hoisted_24, [
                                  _cache[16] || (_cache[16] = createBaseVNode("span", { class: "w-1 h-3 bg-orange-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.durationLabel", "Duration (minutes)")) + " ", 1),
                                  _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("input", {
                                  id: "duration",
                                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.duration = $event),
                                  type: "number",
                                  min: "1",
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]",
                                  placeholder: "30"
                                }, null, 512), [
                                  [
                                    vModelText,
                                    form.value.duration,
                                    void 0,
                                    { number: true }
                                  ]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_25, [
                                createBaseVNode("label", _hoisted_26, [
                                  _cache[18] || (_cache[18] = createBaseVNode("span", { class: "w-1 h-3 bg-indigo-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.description", "Description")) + " ", 1),
                                  _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("textarea", {
                                  id: "description",
                                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.description = $event),
                                  rows: "3",
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02] resize-none",
                                  placeholder: unref(t)("grammar.descriptionPlaceholder", "Enter a brief description")
                                }, null, 8, _hoisted_27), [
                                  [vModelText, form.value.description]
                                ])
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_28, [
                            createBaseVNode("h3", _hoisted_29, [
                              _cache[20] || (_cache[20] = createBaseVNode("span", { class: "w-1 h-4 bg-teal-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("grammar.lessonContent", "Lesson Content")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_30, [
                              createBaseVNode("div", _hoisted_31, [
                                createBaseVNode("label", _hoisted_32, [
                                  _cache[21] || (_cache[21] = createBaseVNode("span", { class: "w-1 h-3 bg-teal-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.theory", "Theory")) + " ", 1),
                                  _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("textarea", {
                                  id: "theory",
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.theory = $event),
                                  rows: "6",
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02] resize-none",
                                  placeholder: unref(t)("grammar.theoryPlaceholder", "Enter grammar theory")
                                }, null, 8, _hoisted_33), [
                                  [vModelText, form.value.theory]
                                ]),
                                createBaseVNode("p", _hoisted_34, toDisplayString(unref(t)("grammar.markdownSupported", "Markdown is supported")), 1)
                              ]),
                              createBaseVNode("div", _hoisted_35, [
                                createBaseVNode("label", _hoisted_36, [
                                  _cache[23] || (_cache[23] = createBaseVNode("span", { class: "w-1 h-3 bg-pink-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.structure", "Structure")) + " ", 1),
                                  _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                withDirectives(createBaseVNode("textarea", {
                                  id: "structure",
                                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.value.structure = $event),
                                  rows: "4",
                                  required: "",
                                  class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02] resize-none",
                                  placeholder: unref(t)("grammar.structurePlaceholder", "Enter structure")
                                }, null, 8, _hoisted_37), [
                                  [vModelText, form.value.structure]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_38, [
                                createBaseVNode("label", _hoisted_39, [
                                  _cache[25] || (_cache[25] = createBaseVNode("span", { class: "w-1 h-3 bg-yellow-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.examples", "Examples")) + " ", 1),
                                  _cache[26] || (_cache[26] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                                ]),
                                createBaseVNode("div", _hoisted_40, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(form.value.examples, (example, index) => {
                                    return openBlock(), createElementBlock("div", {
                                      key: index,
                                      class: "flex items-start space-x-2 animate-fade-in-up",
                                      style: normalizeStyle({ animationDelay: `${1.1 + index * 0.1}s` })
                                    }, [
                                      createBaseVNode("div", _hoisted_41, [
                                        withDirectives(createBaseVNode("input", {
                                          "onUpdate:modelValue": ($event) => example.text = $event,
                                          type: "text",
                                          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]",
                                          placeholder: tf("grammar.examplePlaceholder", "Example {{index}}", { index: index + 1 })
                                        }, null, 8, _hoisted_42), [
                                          [vModelText, example.text]
                                        ]),
                                        withDirectives(createBaseVNode("input", {
                                          "onUpdate:modelValue": ($event) => example.translation = $event,
                                          type: "text",
                                          class: "w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]",
                                          placeholder: tf("grammar.translationPlaceholder", "Translation {{index}}", { index: index + 1 })
                                        }, null, 8, _hoisted_43), [
                                          [vModelText, example.translation]
                                        ])
                                      ]),
                                      createBaseVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeExample(index),
                                        class: "mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900",
                                        disabled: form.value.examples.length <= 1
                                      }, _cache[27] || (_cache[27] = [
                                        createBaseVNode("svg", {
                                          class: "w-5 h-5",
                                          fill: "currentColor",
                                          viewBox: "0 0 20 20"
                                        }, [
                                          createBaseVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                                            "clip-rule": "evenodd"
                                          })
                                        ], -1)
                                      ]), 8, _hoisted_44)
                                    ], 4);
                                  }), 128))
                                ]),
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: addExample,
                                  class: "mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                                }, [
                                  _cache[28] || (_cache[28] = createBaseVNode("svg", {
                                    class: "w-4 h-4 mr-1",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20"
                                  }, [
                                    createBaseVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                                      "clip-rule": "evenodd"
                                    })
                                  ], -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.addExample", "Add example")), 1)
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_45, [
                                createBaseVNode("label", _hoisted_46, [
                                  _cache[29] || (_cache[29] = createBaseVNode("span", { class: "w-1 h-3 bg-cyan-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.usageRules", "Usage Rules")), 1)
                                ]),
                                createBaseVNode("div", _hoisted_47, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(form.value.usageRules, (rule, index) => {
                                    return openBlock(), createElementBlock("div", {
                                      key: index,
                                      class: "flex items-start space-x-2 animate-fade-in-up",
                                      style: normalizeStyle({ animationDelay: `${1.3 + index * 0.1}s` })
                                    }, [
                                      createBaseVNode("div", _hoisted_48, [
                                        withDirectives(createBaseVNode("input", {
                                          "onUpdate:modelValue": ($event) => rule.title = $event,
                                          type: "text",
                                          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02]",
                                          placeholder: tf("grammar.ruleTitlePlaceholder", "Rule {{index}} title", { index: index + 1 })
                                        }, null, 8, _hoisted_49), [
                                          [vModelText, rule.title]
                                        ]),
                                        withDirectives(createBaseVNode("textarea", {
                                          "onUpdate:modelValue": ($event) => rule.description = $event,
                                          rows: "2",
                                          class: "w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none",
                                          placeholder: tf("grammar.ruleDescriptionPlaceholder", "Rule {{index}} description", { index: index + 1 })
                                        }, null, 8, _hoisted_50), [
                                          [vModelText, rule.description]
                                        ])
                                      ]),
                                      createBaseVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeRule(index),
                                        class: "mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900"
                                      }, _cache[30] || (_cache[30] = [
                                        createBaseVNode("svg", {
                                          class: "w-5 h-5",
                                          fill: "currentColor",
                                          viewBox: "0 0 20 20"
                                        }, [
                                          createBaseVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                                            "clip-rule": "evenodd"
                                          })
                                        ], -1)
                                      ]), 8, _hoisted_51)
                                    ], 4);
                                  }), 128))
                                ]),
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: addRule,
                                  class: "mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                                }, [
                                  _cache[31] || (_cache[31] = createBaseVNode("svg", {
                                    class: "w-4 h-4 mr-1",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20"
                                  }, [
                                    createBaseVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                                      "clip-rule": "evenodd"
                                    })
                                  ], -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.addRule", "Add rule")), 1)
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_52, [
                                createBaseVNode("label", _hoisted_53, [
                                  _cache[32] || (_cache[32] = createBaseVNode("span", { class: "w-1 h-3 bg-red-500 rounded mr-2" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.commonMistakes", "Common Mistakes")), 1)
                                ]),
                                createBaseVNode("div", _hoisted_54, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(form.value.commonMistakes, (mistake, index) => {
                                    return openBlock(), createElementBlock("div", {
                                      key: index,
                                      class: "flex items-start space-x-2 animate-fade-in-up",
                                      style: normalizeStyle({ animationDelay: `${1.5 + index * 0.1}s` })
                                    }, [
                                      createBaseVNode("div", _hoisted_55, [
                                        withDirectives(createBaseVNode("input", {
                                          "onUpdate:modelValue": ($event) => mistake.wrong = $event,
                                          type: "text",
                                          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02]",
                                          placeholder: tf("grammar.wrongSentencePlaceholder", "Wrong sentence {{index}}", { index: index + 1 })
                                        }, null, 8, _hoisted_56), [
                                          [vModelText, mistake.wrong]
                                        ]),
                                        withDirectives(createBaseVNode("input", {
                                          "onUpdate:modelValue": ($event) => mistake.correct = $event,
                                          type: "text",
                                          class: "w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02]",
                                          placeholder: tf("grammar.correctSentencePlaceholder", "Correct sentence {{index}}", { index: index + 1 })
                                        }, null, 8, _hoisted_57), [
                                          [vModelText, mistake.correct]
                                        ]),
                                        withDirectives(createBaseVNode("textarea", {
                                          "onUpdate:modelValue": ($event) => mistake.explanation = $event,
                                          rows: "2",
                                          class: "w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 transform hover:scale-[1.02] resize-none",
                                          placeholder: tf("grammar.explanationPlaceholder", "Explanation {{index}}", { index: index + 1 })
                                        }, null, 8, _hoisted_58), [
                                          [vModelText, mistake.explanation]
                                        ])
                                      ]),
                                      createBaseVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeMistake(index),
                                        class: "mt-2 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900"
                                      }, _cache[33] || (_cache[33] = [
                                        createBaseVNode("svg", {
                                          class: "w-5 h-5",
                                          fill: "currentColor",
                                          viewBox: "0 0 20 20"
                                        }, [
                                          createBaseVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                                            "clip-rule": "evenodd"
                                          })
                                        ], -1)
                                      ]), 8, _hoisted_59)
                                    ], 4);
                                  }), 128))
                                ]),
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: addMistake,
                                  class: "mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                                }, [
                                  _cache[34] || (_cache[34] = createBaseVNode("svg", {
                                    class: "w-4 h-4 mr-1",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20"
                                  }, [
                                    createBaseVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                                      "clip-rule": "evenodd"
                                    })
                                  ], -1)),
                                  createTextVNode(" " + toDisplayString(unref(t)("grammar.addMistake", "Add mistake")), 1)
                                ])
                              ])
                            ])
                          ])
                        ], 32)
                      ]),
                      createBaseVNode("div", _hoisted_60, [
                        createBaseVNode("button", {
                          type: "button",
                          onClick: submitForm,
                          disabled: isSubmitting.value,
                          class: "w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        }, [
                          isSubmitting.value ? (openBlock(), createElementBlock("svg", _hoisted_62, _cache[35] || (_cache[35] = [
                            createBaseVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }, null, -1),
                            createBaseVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            }, null, -1)
                          ]))) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(isSubmitting.value ? unref(t)("common.saving", "Saving...") : isEdit.value ? unref(t)("common.update", "Update") : unref(t)("common.save", "Save")), 1)
                        ], 8, _hoisted_61),
                        createBaseVNode("button", {
                          type: "button",
                          onClick: closeDialog,
                          class: "mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-[#0a0a0a] text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1)
                      ])
                    ])
                  ]),
                  _: 1
                })
              ])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const GrammarFormDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c037500"]]);
export {
  GrammarFormDialog as default
};
//# sourceMappingURL=GrammarFormDialog-BIWXIhOQ.js.map
