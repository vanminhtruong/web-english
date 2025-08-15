import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, y as createVNode, u as unref, t as toDisplayString, n as normalizeClass, w as withCtx, F as Fragment, j as renderList, M as Transition, g as createTextVNode } from "./vendor-DoTKyHPB.js";
import { j as groupVocabulariesByDate } from "./index-1w8025Ge.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-dark-bg-mute" };
const _hoisted_2 = { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" };
const _hoisted_4 = { class: "flex flex-col sm:flex-row items-start sm:items-center gap-4" };
const _hoisted_5 = { class: "flex items-center gap-2" };
const _hoisted_6 = { class: "relative" };
const _hoisted_7 = ["disabled", "aria-disabled", "title"];
const _hoisted_8 = { class: "truncate" };
const _hoisted_9 = {
  key: 0,
  class: "absolute bottom-full mb-1 w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-soft dark:border-2 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto origin-bottom",
  style: { "z-index": "99999 !important" }
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "truncate" };
const _hoisted_12 = { class: "ml-2 text-xs text-gray-500 dark:text-white/60 flex-shrink-0" };
const _hoisted_13 = {
  key: 0,
  class: "text-sm text-gray-600 dark:text-white/70"
};
const _hoisted_14 = { class: "flex items-center gap-1" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardDateFilter",
  props: {
    vocabularies: {},
    enabled: { type: Boolean },
    selectedDate: {},
    practiceStarted: { type: Boolean }
  },
  emits: ["update:enabled", "update:selectedDate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t, locale } = useI18n();
    const isDropdownOpen = ref(false);
    computed(() => true);
    const localSelectedDate = computed({
      get: () => props.selectedDate,
      set: (value) => emit("update:selectedDate", value)
    });
    const availableDates = computed(() => {
      if (!props.vocabularies.length) return [];
      const grouped = groupVocabulariesByDate(props.vocabularies, locale.value);
      return grouped.map((group) => ({
        date: group.date,
        displayDate: group.displayDate,
        count: group.vocabularies.length
      }));
    });
    const toggleDropdown = () => {
      if (props.practiceStarted) return;
      isDropdownOpen.value = !isDropdownOpen.value;
    };
    const selectDate = (date) => {
      if (props.practiceStarted) return;
      localSelectedDate.value = date;
      isDropdownOpen.value = false;
    };
    const getSelectedDateDisplay = () => {
      if (!localSelectedDate.value) {
        return t("flashcard.dateFilter.allDates", "All dates");
      }
      const selectedGroup = availableDates.value.find((g) => g.date === localSelectedDate.value);
      if (!selectedGroup) {
        return t("flashcard.dateFilter.allDates", "All dates");
      }
      return `${selectedGroup.displayDate} (${selectedGroup.count})`;
    };
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".relative")) {
        isDropdownOpen.value = false;
      }
    };
    const getFilterInfo = () => {
      if (!localSelectedDate.value) return "";
      const selectedGroup = availableDates.value.find((g) => g.date === localSelectedDate.value);
      if (!selectedGroup) return "";
      return t(
        "flashcard.dateFilter.info",
        { count: selectedGroup.count, date: selectedGroup.displayDate },
        `Showing ${selectedGroup.count} words from ${selectedGroup.displayDate}`
      );
    };
    watch(availableDates, (newDates) => {
      if (localSelectedDate.value && !newDates.some((d) => d.date === localSelectedDate.value)) {
        localSelectedDate.value = "";
      }
    });
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[2] || (_cache[2] = createBaseVNode("svg", {
                  class: "w-4 h-4 text-gray-500 dark:text-white/60",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleDropdown,
                    disabled: _ctx.practiceStarted,
                    "aria-disabled": _ctx.practiceStarted ? "true" : "false",
                    title: _ctx.practiceStarted ? unref(t)("flashcard.dateFilter.disabledDuringPractice", "Date filter is disabled during practice") : "",
                    class: "px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-bg-soft dark:border-2 rounded-md bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between min-w-[200px] sm:min-w-[240px]"
                  }, [
                    createBaseVNode("span", _hoisted_8, toDisplayString(getSelectedDateDisplay()), 1),
                    (openBlock(), createElementBlock("svg", {
                      class: normalizeClass(["w-4 h-4 ml-2 transition-transform duration-200", { "rotate-180": isDropdownOpen.value }]),
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, _cache[1] || (_cache[1] = [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ]), 2))
                  ], 8, _hoisted_7),
                  createVNode(Transition, {
                    "enter-active-class": "transform transition duration-100 ease-out",
                    "enter-from-class": "scale-95 opacity-0 translate-y-2",
                    "enter-to-class": "scale-100 opacity-100 translate-y-0",
                    "leave-active-class": "transform transition duration-75 ease-in",
                    "leave-from-class": "scale-100 opacity-100 translate-y-0",
                    "leave-to-class": "scale-95 opacity-0 translate-y-2"
                  }, {
                    default: withCtx(() => [
                      isDropdownOpen.value && !_ctx.practiceStarted ? (openBlock(), createElementBlock("div", _hoisted_9, [
                        createBaseVNode("button", {
                          type: "button",
                          onClick: _cache[0] || (_cache[0] = ($event) => selectDate("")),
                          class: normalizeClass(["w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors duration-150", {
                            "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400": localSelectedDate.value === ""
                          }])
                        }, toDisplayString(unref(t)("flashcard.dateFilter.allDates", "All dates")), 3),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(availableDates.value, (group) => {
                          return openBlock(), createElementBlock("button", {
                            key: group.date,
                            type: "button",
                            onClick: ($event) => selectDate(group.date),
                            class: normalizeClass(["w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors duration-150 flex items-center justify-between", {
                              "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400": localSelectedDate.value === group.date
                            }])
                          }, [
                            createBaseVNode("span", _hoisted_11, toDisplayString(group.displayDate), 1),
                            createBaseVNode("span", _hoisted_12, " (" + toDisplayString(group.count) + ") ", 1)
                          ], 10, _hoisted_10);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            localSelectedDate.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
              createBaseVNode("span", _hoisted_14, [
                _cache[3] || (_cache[3] = createBaseVNode("svg", {
                  class: "w-4 h-4",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                createTextVNode(" " + toDisplayString(getFilterInfo()), 1)
              ])
            ])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FlashcardDateFilter-FLdKWpZ5.js.map
