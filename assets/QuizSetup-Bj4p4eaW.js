import { d as defineComponent, H as useI18n, A as ref, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, C as withDirectives, P as vModelSelect, F as Fragment, j as renderList } from "./vendor-DI3yOcyn.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700" };
const _hoisted_2 = { class: "text-center mb-8" };
const _hoisted_3 = { class: "text-2xl font-bold text-gray-900 dark:text-white mb-4" };
const _hoisted_4 = { class: "text-gray-600 dark:text-gray-400" };
const _hoisted_5 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" };
const _hoisted_6 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_7 = { value: "vocabulary" };
const _hoisted_8 = { value: "grammar" };
const _hoisted_9 = { value: "mixed" };
const _hoisted_10 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_11 = { value: "" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_14 = { value: "5" };
const _hoisted_15 = { value: "10" };
const _hoisted_16 = { value: "15" };
const _hoisted_17 = { value: "20" };
const _hoisted_18 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_19 = { value: "0" };
const _hoisted_20 = { value: "5" };
const _hoisted_21 = { value: "10" };
const _hoisted_22 = { value: "15" };
const _hoisted_23 = { class: "text-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizSetup",
  props: {
    settings: {},
    availableLevels: {}
  },
  emits: ["start-quiz"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const localSettings = ref({ ...props.settings });
    watch(localSettings, (newSettings) => {
      emit("start-quiz", newSettings);
    }, { deep: true });
    const handleStartQuiz = () => {
      emit("start-quiz", localSettings.value);
    };
    const getLevelText = (level) => {
      switch (level) {
        case "beginner":
          return t("levels.beginner");
        case "intermediate":
          return t("levels.intermediate");
        case "advanced":
          return t("levels.advanced");
        default:
          return level;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h2", _hoisted_3, toDisplayString(unref(t)("quiz.setup.title")), 1),
          createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("quiz.setup.description")), 1)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_6, toDisplayString(unref(t)("quiz.setup.type")), 1),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localSettings.value.type = $event),
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
            }, [
              createBaseVNode("option", _hoisted_7, toDisplayString(unref(t)("quiz.types.vocabulary")), 1),
              createBaseVNode("option", _hoisted_8, toDisplayString(unref(t)("quiz.types.grammar")), 1),
              createBaseVNode("option", _hoisted_9, toDisplayString(unref(t)("quiz.types.mixed")), 1)
            ], 512), [
              [vModelSelect, localSettings.value.type]
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_10, toDisplayString(unref(t)("quiz.setup.level")), 1),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => localSettings.value.level = $event),
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
            }, [
              createBaseVNode("option", _hoisted_11, toDisplayString(unref(t)("quiz.setup.allLevels")), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.availableLevels, (level) => {
                return openBlock(), createElementBlock("option", {
                  key: level,
                  value: level
                }, toDisplayString(getLevelText(level)), 9, _hoisted_12);
              }), 128))
            ], 512), [
              [vModelSelect, localSettings.value.level]
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_13, toDisplayString(unref(t)("quiz.setup.questionCount")), 1),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => localSettings.value.questionCount = $event),
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
            }, [
              createBaseVNode("option", _hoisted_14, "5 " + toDisplayString(unref(t)("quiz.progress.question").toLowerCase()), 1),
              createBaseVNode("option", _hoisted_15, "10 " + toDisplayString(unref(t)("quiz.progress.question").toLowerCase()), 1),
              createBaseVNode("option", _hoisted_16, "15 " + toDisplayString(unref(t)("quiz.progress.question").toLowerCase()), 1),
              createBaseVNode("option", _hoisted_17, "20 " + toDisplayString(unref(t)("quiz.progress.question").toLowerCase()), 1)
            ], 512), [
              [vModelSelect, localSettings.value.questionCount]
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_18, toDisplayString(unref(t)("quiz.setup.timeLimit")), 1),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => localSettings.value.timeLimit = $event),
              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
            }, [
              createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("quiz.setup.unlimited")), 1),
              createBaseVNode("option", _hoisted_20, "5 " + toDisplayString(unref(t)("common.minutes")), 1),
              createBaseVNode("option", _hoisted_21, "10 " + toDisplayString(unref(t)("common.minutes")), 1),
              createBaseVNode("option", _hoisted_22, "15 " + toDisplayString(unref(t)("common.minutes")), 1)
            ], 512), [
              [vModelSelect, localSettings.value.timeLimit]
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_23, [
          createBaseVNode("button", {
            onClick: handleStartQuiz,
            class: "bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          }, toDisplayString(unref(t)("quiz.setup.start")), 1)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizSetup-Bj4p4eaW.js.map
