import { d as defineComponent, H as useI18n, K as watch, L as onUnmounted, A as ref, B as computed, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, N as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass } from "./vendor-Cr_Qcp9o.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-4xl max-h-[80vh]" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_8 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_9 = { class: "mt-2 text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_10 = { class: "mt-1 text-sm text-gray-500 dark:text-white/70" };
const _hoisted_11 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_12 = { class: "flex justify-between items-start" };
const _hoisted_13 = { class: "flex-1" };
const _hoisted_14 = { class: "flex items-center space-x-2 mb-2" };
const _hoisted_15 = { class: "text-sm text-gray-500 dark:text-white/70" };
const _hoisted_16 = ["aria-disabled", "title", "aria-label", "onClick"];
const _hoisted_17 = ["title", "aria-label", "onClick"];
const _hoisted_18 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" };
const _hoisted_19 = { class: "text-gray-500 dark:text-white/70" };
const _hoisted_20 = { class: "ml-1 font-medium text-gray-900 dark:text-white" };
const _hoisted_21 = { class: "text-gray-500 dark:text-white/70" };
const _hoisted_22 = { class: "ml-1 font-medium text-green-600 dark:text-green-400" };
const _hoisted_23 = { class: "text-gray-500 dark:text-white/70" };
const _hoisted_24 = { class: "ml-1 font-medium text-red-600 dark:text-red-400" };
const _hoisted_25 = { class: "text-gray-500 dark:text-white/70" };
const _hoisted_26 = { class: "ml-1 font-medium text-gray-900 dark:text-white" };
const _hoisted_27 = { class: "mt-2" };
const _hoisted_28 = { class: "text-gray-500 dark:text-white/70 text-sm" };
const _hoisted_29 = { class: "flex flex-wrap gap-1 mt-1" };
const _hoisted_30 = { class: "text-right" };
const _hoisted_31 = { class: "text-lg font-bold text-gray-900 dark:text-white" };
const _hoisted_32 = { class: "text-xs text-gray-500 dark:text-white/70" };
const _hoisted_33 = { class: "mt-1" };
const _hoisted_34 = {
  key: 0,
  class: "mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
};
const _hoisted_35 = { class: "text-sm text-gray-700 dark:text-white/70" };
const _hoisted_36 = { class: "flex sm:hidden gap-2" };
const _hoisted_37 = ["disabled"];
const _hoisted_38 = ["disabled"];
const _hoisted_39 = { class: "hidden sm:flex items-center gap-1" };
const _hoisted_40 = ["disabled"];
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["disabled"];
const itemsPerPage = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HistoryModal",
  props: {
    show: { type: Boolean },
    history: {},
    getModeColor: { type: Function },
    getModeText: { type: Function },
    formatDate: { type: Function },
    formatDuration: { type: Function },
    deleteSession: { type: Function }
  },
  emits: ["close", "open-details", "delete-session"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };
    watch(() => props.show, (newShow) => {
      if (newShow) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    }, { immediate: true });
    onUnmounted(() => {
      unlockBodyScroll();
    });
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil((props.history?.length || 0) / itemsPerPage);
    });
    const paginatedHistory = computed(() => {
      if (!props.history) return [];
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return props.history.slice(start, end);
    });
    const showingStart = computed(() => {
      if (!props.history?.length) return 0;
      return (currentPage.value - 1) * itemsPerPage + 1;
    });
    const showingEnd = computed(() => {
      if (!props.history?.length) return 0;
      return Math.min(currentPage.value * itemsPerPage, props.history.length);
    });
    const visiblePages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, currentPage.value + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const hasSessionDetails = (sessionId, flag) => {
      if (flag) return true;
      try {
        return !!localStorage.getItem(`flashcard-session-details:${sessionId}`);
      } catch {
        return false;
      }
    };
    const getCategoryDisplay = (category) => {
      if (category.includes(".")) {
        const parts = category.split(".");
        const fallback = parts[parts.length - 1];
        if (category === "flashcard.modes.flashcard") return t(category, "Flashcard");
        if (category === "flashcard.modes.quiz") return t(category, "Quiz");
        if (category === "flashcard.modes.typing") return t(category, "Typing");
        if (category === "flashcard.modes.listening") return t(category, "Listening");
        if (category === "flashcard.modes.image") return t(category, "Image");
        if (category === "flashcard.modes.pronunciation") return t(category, "Pronunciation");
        return t(category, fallback.charAt(0).toUpperCase() + fallback.slice(1));
      }
      return category;
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
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col max-h-[80vh] transform",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h3", _hoisted_5, [
                            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("flashcard.history.title", "Practice History")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[0] || (_cache[0] = ($event) => emit("close")),
                            "aria-label": unref(t)("common.close", "Close"),
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-white/80 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-soft"
                          }, _cache[3] || (_cache[3] = [
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
                          ]), 8, _hoisted_6)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7, [
                        _ctx.history.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
                          _cache[4] || (_cache[4] = createBaseVNode("svg", {
                            class: "mx-auto h-12 w-12 text-gray-400 dark:text-white/40",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createBaseVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ], -1)),
                          createBaseVNode("h3", _hoisted_9, toDisplayString(unref(t)("flashcard.history.empty.title", "No History Yet")), 1),
                          createBaseVNode("p", _hoisted_10, toDisplayString(unref(t)("flashcard.history.empty.description", "Complete a practice session to see your history here.")), 1)
                        ])) : (openBlock(), createElementBlock("div", _hoisted_11, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedHistory.value, (session) => {
                            return openBlock(), createElementBlock("div", {
                              key: session.id,
                              class: "bg-gray-50 dark:bg-dark-bg-mute rounded-lg p-4"
                            }, [
                              createBaseVNode("div", _hoisted_12, [
                                createBaseVNode("div", _hoisted_13, [
                                  createBaseVNode("div", _hoisted_14, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["px-2 py-1 text-xs font-medium rounded-full", _ctx.getModeColor(session.mode)])
                                    }, toDisplayString(_ctx.getModeText(session.mode)), 3),
                                    createBaseVNode("span", _hoisted_15, toDisplayString(_ctx.formatDate(session.date)), 1),
                                    createBaseVNode("button", {
                                      class: normalizeClass(["inline-flex items-center ml-1 px-2 py-1 rounded-md border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800 dark:hover:bg-blue-900/40 dark:hover:text-blue-200", !hasSessionDetails(session.id, session.hasDetails) ? "opacity-50" : ""]),
                                      "aria-disabled": !hasSessionDetails(session.id, session.hasDetails),
                                      title: hasSessionDetails(session.id, session.hasDetails) ? unref(t)("flashcard.history.viewDetails", "View details") : unref(t)("flashcard.history.noDetails", "No details available"),
                                      "aria-label": unref(t)("flashcard.history.viewDetails", "View details"),
                                      onClick: ($event) => emit("open-details", session.id)
                                    }, _cache[5] || (_cache[5] = [
                                      createBaseVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor"
                                      }, [
                                        createBaseVNode("path", { d: "M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" })
                                      ], -1)
                                    ]), 10, _hoisted_16),
                                    createBaseVNode("button", {
                                      class: "inline-flex items-center ml-1 px-2 py-1 rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/50 transition dark:text-red-300 dark:bg-red-900/30 dark:border-red-800 dark:hover:bg-red-900/40 dark:hover:text-red-200",
                                      title: unref(t)("flashcard.history.deleteSession", "Delete session"),
                                      "aria-label": unref(t)("flashcard.history.deleteSession", "Delete session"),
                                      onClick: ($event) => emit("delete-session", session.id)
                                    }, _cache[6] || (_cache[6] = [
                                      createBaseVNode("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor"
                                      }, [
                                        createBaseVNode("path", { d: "M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2m-6 5v6m4-6v6" })
                                      ], -1)
                                    ]), 8, _hoisted_17)
                                  ]),
                                  createBaseVNode("div", _hoisted_18, [
                                    createBaseVNode("div", null, [
                                      createBaseVNode("span", _hoisted_19, toDisplayString(unref(t)("flashcard.history.totalCards", "Total Cards")) + ":", 1),
                                      createBaseVNode("span", _hoisted_20, toDisplayString(session.totalCards), 1)
                                    ]),
                                    createBaseVNode("div", null, [
                                      createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("flashcard.history.correct", "Correct")) + ":", 1),
                                      createBaseVNode("span", _hoisted_22, toDisplayString(session.correctAnswers), 1)
                                    ]),
                                    createBaseVNode("div", null, [
                                      createBaseVNode("span", _hoisted_23, toDisplayString(unref(t)("flashcard.history.incorrect", "Incorrect")) + ":", 1),
                                      createBaseVNode("span", _hoisted_24, toDisplayString(session.incorrectAnswers), 1)
                                    ]),
                                    createBaseVNode("div", null, [
                                      createBaseVNode("span", _hoisted_25, toDisplayString(unref(t)("flashcard.history.duration", "Duration")) + ":", 1),
                                      createBaseVNode("span", _hoisted_26, toDisplayString(_ctx.formatDuration(session.duration)), 1)
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_27, [
                                    createBaseVNode("span", _hoisted_28, toDisplayString(unref(t)("flashcard.history.categories", "Categories")) + ":", 1),
                                    createBaseVNode("div", _hoisted_29, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(session.categories, (category) => {
                                        return openBlock(), createElementBlock("span", {
                                          key: category,
                                          class: "px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                                        }, toDisplayString(getCategoryDisplay(category)), 1);
                                      }), 128))
                                    ])
                                  ])
                                ]),
                                createBaseVNode("div", _hoisted_30, [
                                  createBaseVNode("div", _hoisted_31, toDisplayString(Math.round(session.correctAnswers / session.totalCards * 100)) + "% ", 1),
                                  createBaseVNode("div", _hoisted_32, toDisplayString(unref(t)("flashcard.history.accuracy", "Accuracy")), 1),
                                  createBaseVNode("div", _hoisted_33, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["text-xs font-medium px-2 py-0.5 rounded-full", Math.round(session.correctAnswers / session.totalCards * 100) >= 70 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"])
                                    }, toDisplayString(Math.round(session.correctAnswers / session.totalCards * 100) >= 70 ? unref(t)("flashcard.history.pass", "Pass") : unref(t)("flashcard.history.fail", "Fail")), 3)
                                  ])
                                ])
                              ])
                            ]);
                          }), 128)),
                          totalPages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_34, [
                            createBaseVNode("div", _hoisted_35, toDisplayString(unref(t)("flashcard.history.showingSessions", { start: showingStart.value, end: showingEnd.value, total: _ctx.history.length })), 1),
                            createBaseVNode("div", _hoisted_36, [
                              createBaseVNode("button", {
                                onClick: prevPage,
                                disabled: currentPage.value === 1,
                                class: normalizeClass([
                                  "px-3 py-2 text-sm border rounded-md transition-colors duration-200",
                                  currentPage.value === 1 ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-dark-bg-mute dark:text-white/40" : "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                ])
                              }, toDisplayString(unref(t)("common.previous", "Previous")), 11, _hoisted_37),
                              createBaseVNode("button", {
                                onClick: nextPage,
                                disabled: currentPage.value === totalPages.value,
                                class: normalizeClass([
                                  "px-3 py-2 text-sm border rounded-md transition-colors duration-200",
                                  currentPage.value === totalPages.value ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-dark-bg-mute dark:text-white/40" : "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                ])
                              }, toDisplayString(unref(t)("common.next", "Next")), 11, _hoisted_38)
                            ]),
                            createBaseVNode("div", _hoisted_39, [
                              createBaseVNode("button", {
                                onClick: prevPage,
                                disabled: currentPage.value === 1,
                                class: normalizeClass([
                                  "px-3 py-2 text-sm border rounded-md transition-colors duration-200",
                                  currentPage.value === 1 ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-dark-bg-mute dark:text-white/40" : "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                ])
                              }, toDisplayString(unref(t)("common.previous", "Previous")), 11, _hoisted_40),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                                return openBlock(), createElementBlock("button", {
                                  key: page,
                                  onClick: ($event) => goToPage(page),
                                  class: normalizeClass([
                                    "px-3 py-2 text-sm border rounded-md transition-colors duration-200",
                                    page === currentPage.value ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500" : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-dark-bg-mute dark:text-white/80 dark:hover:bg-[#0a0a0a]"
                                  ])
                                }, toDisplayString(page), 11, _hoisted_41);
                              }), 128)),
                              createBaseVNode("button", {
                                onClick: nextPage,
                                disabled: currentPage.value === totalPages.value,
                                class: normalizeClass([
                                  "px-3 py-2 text-sm border rounded-md transition-colors duration-200",
                                  currentPage.value === totalPages.value ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-dark-bg-mute dark:text-white/40" : "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                ])
                              }, toDisplayString(unref(t)("common.next", "Next")), 11, _hoisted_42)
                            ])
                          ])) : createCommentVNode("", true)
                        ]))
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
//# sourceMappingURL=HistoryModal-D107xvdt.js.map
