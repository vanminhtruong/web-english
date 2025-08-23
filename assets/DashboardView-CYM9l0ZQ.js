const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LazyLoadComponent-DUQ86Zk1.js","assets/vendor-CKTvmtu5.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/LazyLoadComponent-DWULbbXY.css","assets/DashboardHeader-CgoRx0i6.js","assets/DashboardStats-Wdf23QNe.js","assets/FlashcardStats-CelkKvXE.js","assets/FlashcardStats-DJiXLtSB.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-NgYuwt7j.js";
import { d as defineComponent, O as useRouter, M as useI18n, D as computed, A as onMounted, c as createElementBlock, v as openBlock, V as createStaticVNode, y as createVNode, f as createBaseVNode, w as withCtx, u as unref, G as defineAsyncComponent, t as toDisplayString, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass } from "./vendor-CKTvmtu5.js";
import { l as loadComponentSafely } from "./import-helper-C3cN_M-4.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import { g as getRelativeTime } from "./dateUtils-B2zqIzJj.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative" };
const _hoisted_2 = { class: "max-w-7xl mx-auto py-3 sm:py-5 px-3 sm:px-6 lg:px-8 relative" };
const _hoisted_3 = { class: "mb-6 sm:mb-8" };
const _hoisted_4 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8" };
const _hoisted_5 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[360px] sm:min-h-[420px] flex flex-col" };
const _hoisted_6 = { class: "px-4 py-5 sm:p-8 flex-1 flex flex-col" };
const _hoisted_7 = { class: "flex items-center mb-6" };
const _hoisted_8 = { class: "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_9 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1" };
const _hoisted_10 = { class: "relative z-10 text-center" };
const _hoisted_11 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_12 = { class: "relative z-10 text-center" };
const _hoisted_13 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_14 = { class: "relative z-10 text-center" };
const _hoisted_15 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_16 = { class: "relative z-10 text-center" };
const _hoisted_17 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_18 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[420px] flex flex-col" };
const _hoisted_19 = { class: "px-6 py-8 sm:p-8 flex-1 flex flex-col" };
const _hoisted_20 = { class: "flex items-center mb-6" };
const _hoisted_21 = { class: "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_22 = { class: "space-y-4 flex-1" };
const _hoisted_23 = { class: "flex-shrink-0" };
const _hoisted_24 = { class: "flex-1 min-w-0" };
const _hoisted_25 = { class: "text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate" };
const _hoisted_26 = { class: "text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DashboardView",
  setup(__props) {
    const LazyLoadComponent = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./LazyLoadComponent-DUQ86Zk1.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0))
    );
    const DashboardHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./DashboardHeader-CgoRx0i6.js"), true ? __vite__mapDeps([4,1]) : void 0))
    );
    const DashboardStats = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./DashboardStats-Wdf23QNe.js"), true ? __vite__mapDeps([5,1]) : void 0))
    );
    const FlashcardStats = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./FlashcardStats-CelkKvXE.js"), true ? __vite__mapDeps([6,1,2,7]) : void 0))
    );
    const router = useRouter();
    const { t } = useI18n();
    const vocabularyStore = useVocabularyStore();
    const stats = computed(() => {
      const allVocabs = vocabularyStore.allVocabularies.value;
      const favoriteCount = vocabularyStore.favoriteVocabularies.value.length;
      const categories = vocabularyStore.getCategories.value.length;
      const today = /* @__PURE__ */ new Date();
      const todayStr = today.toISOString().split("T")[0];
      const todayVocabs = allVocabs.filter(
        (v) => v.createdAt && v.createdAt.split("T")[0] === todayStr
      ).length;
      return {
        vocabularyLearned: allVocabs.length,
        grammarLessons: categories,
        // Use categories count as grammar lessons
        currentStreak: Math.max(1, todayVocabs),
        // At least 1 if there are vocabularies
        totalTime: favoriteCount * 5
        // Estimate 5 minutes per favorite vocabulary
      };
    });
    const recentActivities = computed(() => {
      const allVocabs = vocabularyStore.allVocabularies.value;
      const activities = [];
      const recentVocabs = [...allVocabs].sort((a, b) => {
        const aTime = a.updatedAt || a.createdAt || "";
        const bTime = b.updatedAt || b.createdAt || "";
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      }).slice(0, 4);
      recentVocabs.forEach((vocab, index) => {
        const isUpdated = vocab.updatedAt && vocab.updatedAt !== vocab.createdAt;
        const timeStr = vocab.updatedAt || vocab.createdAt || "";
        const categoryTranslated = t(`categories.${vocab.category}`, vocab.category);
        activities.push({
          id: index + 1,
          title: isUpdated ? t("dashboard.activity.updated", { word: vocab.word, category: categoryTranslated }, `Updated '${vocab.word}' in ${categoryTranslated}`) : t("dashboard.activity.added", { word: vocab.word, category: categoryTranslated }, `Added '${vocab.word}' to ${categoryTranslated}`),
          time: timeStr ? getRelativeTime(timeStr, t) : t("dashboard.activity.justNow", "Just now"),
          iconColor: isUpdated ? "bg-blue-500" : "bg-green-500"
        });
      });
      if (activities.length === 0) {
        activities.push({
          id: 1,
          title: t("dashboard.activity.noActivity", "No recent activity"),
          time: t("dashboard.activity.addFirstVocab", "Add your first vocabulary to get started!"),
          iconColor: "bg-gray-500"
        });
      }
      return activities;
    });
    const navigateTo = (path) => {
      router.push(path);
    };
    onMounted(() => {
      vocabularyStore.initializeStore();
      console.log("Dashboard mounted with real data");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[20] || (_cache[20] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-20 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-8 left-20 w-56 h-56 sm:w-80 sm:h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div></div></div>', 1)),
        createVNode(unref(LazyLoadComponent), { "animation-type": "fade-up" }, {
          default: withCtx(() => [
            createVNode(unref(DashboardHeader))
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2, [
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-up",
            threshold: 0.2
          }, {
            default: withCtx(() => [
              createVNode(unref(DashboardStats), {
                stats: stats.value,
                class: "mb-8"
              }, null, 8, ["stats"])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-up",
            threshold: 0.15
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(FlashcardStats))
              ])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_4, [
            createVNode(unref(LazyLoadComponent), {
              "animation-type": "slide-left",
              threshold: 0.15
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                        createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3" })
                      ], -1)),
                      createBaseVNode("h3", _hoisted_8, toDisplayString(unref(t)("dashboard.quickActions", "Quick Actions")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("/vocabulary")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_10, [
                          _cache[5] || (_cache[5] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-180 transition-transform duration-500",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                              "clip-rule": "evenodd"
                            })
                          ], -1)),
                          createBaseVNode("span", _hoisted_11, toDisplayString(unref(t)("dashboard.actions.addVocabulary", "Add Vocabulary")), 1)
                        ]),
                        _cache[7] || (_cache[7] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("/practice/flashcard")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[9] || (_cache[9] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_12, [
                          _cache[8] || (_cache[8] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:scale-110 transition-transform duration-300",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
                          ], -1)),
                          createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("dashboard.actions.practiceFlashcard", "Practice Flashcard")), 1)
                        ]),
                        _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("/practice/quiz")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_14, [
                          _cache[11] || (_cache[11] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:bounce",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                              "clip-rule": "evenodd"
                            })
                          ], -1)),
                          createBaseVNode("span", _hoisted_15, toDisplayString(unref(t)("dashboard.actions.takeQuiz", "Take a Quiz")), 1)
                        ]),
                        _cache[13] || (_cache[13] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = ($event) => navigateTo("/grammar")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_16, [
                          _cache[14] || (_cache[14] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-12 transition-transform duration-300",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", { d: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" })
                          ], -1)),
                          createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("dashboard.actions.learnGrammar", "Learn Grammar")), 1)
                        ]),
                        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ])
                    ])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(unref(LazyLoadComponent), {
              "animation-type": "slide-up",
              threshold: 0.15
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      _cache[17] || (_cache[17] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                        createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3" })
                      ], -1)),
                      createBaseVNode("h3", _hoisted_21, toDisplayString(unref(t)("dashboard.recentActivity", "Recent Activity")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(recentActivities.value, (activity, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: activity.id,
                          class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105",
                          style: normalizeStyle({ animationDelay: `${index * 100}ms` })
                        }, [
                          createBaseVNode("div", _hoisted_23, [
                            createBaseVNode("div", {
                              class: normalizeClass(["w-10 h-10 rounded-full flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300", activity.iconColor])
                            }, _cache[18] || (_cache[18] = [
                              createBaseVNode("svg", {
                                class: "w-5 h-5 text-white",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createBaseVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                  "clip-rule": "evenodd"
                                })
                              ], -1)
                            ]), 2)
                          ]),
                          createBaseVNode("div", _hoisted_24, [
                            createBaseVNode("p", _hoisted_25, toDisplayString(activity.title), 1),
                            createBaseVNode("p", _hoisted_26, toDisplayString(activity.time), 1)
                          ]),
                          _cache[19] || (_cache[19] = createBaseVNode("div", { class: "opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300" }, [
                            createBaseVNode("svg", {
                              class: "w-5 h-5 text-blue-500 dark:text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ])
                          ], -1))
                        ], 4);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DashboardView-CYM9l0ZQ.js.map
