import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-DMqe9Z5T.js";
const _hoisted_1 = ["aria-label"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyNoteButton",
  props: {
    date: {},
    isToday: { type: Boolean }
  },
  emits: ["open-note-dialog"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const openNoteDialog = () => {
      emit("open-note-dialog", props.date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        onClick: openNoteDialog,
        class: "flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/50 rounded-full border border-dashed border-green-300 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500",
        "aria-label": unref(t)("vocabulary.notes.manageNotes", "Manage Notes")
      }, [
        _cache[0] || (_cache[0] = createBaseVNode("svg", {
          class: "w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4",
          fill: "currentColor",
          viewBox: "0 0 20 20"
        }, [
          createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
        ], -1)),
        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.notes.manageNotes", "Manage Notes")), 1)
      ], 8, _hoisted_1);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyNoteButton-BMRnaJSL.js.map
