import { A as ref, B as computed, I as onMounted, d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, g as createTextVNode, n as normalizeClass, e as createCommentVNode, a as normalizeStyle } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-D3wsZHNF.js";
import "./vendor-toast-D1B2ty4j.js";
function useFlashcardDashboardStats() {
  const practiceHistory = ref([]);
  const isLoading = ref(true);
  const loadPracticeHistory = () => {
    try {
      const saved = localStorage.getItem("flashcard-practice-history");
      if (saved) {
        const parsed = JSON.parse(saved);
        practiceHistory.value = parsed;
      }
    } catch (error) {
      console.error("Error loading flashcard practice history:", error);
    } finally {
      isLoading.value = false;
    }
  };
  const getStreakDays = () => {
    if (practiceHistory.value.length === 0) return 0;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const practiceDates = [...new Set(
      practiceHistory.value.map((item) => {
        const date = new Date(item.date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    )].sort((a, b) => b - a);
    if (practiceDates.length === 0) return 0;
    const mostRecentDate = new Date(practiceDates[0]);
    const daysDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1e3 * 60 * 60 * 24));
    if (daysDiff > 1) return 0;
    let streak = 0;
    let expectedDate = today.getTime();
    for (const practiceDate of practiceDates) {
      const date = new Date(practiceDate);
      if (date.getTime() === expectedDate) {
        streak++;
        expectedDate -= 24 * 60 * 60 * 1e3;
      } else if (date.getTime() === expectedDate + 24 * 60 * 60 * 1e3 && streak === 0) {
        streak++;
        expectedDate -= 24 * 60 * 60 * 1e3;
      } else {
        break;
      }
    }
    return streak;
  };
  const getWeeklyProgress = () => {
    const now = /* @__PURE__ */ new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
    const thisWeekSessions = practiceHistory.value.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= weekAgo && itemDate <= now;
    });
    const weeklyProgress = Math.min(Math.round(thisWeekSessions.length / 7 * 100), 100);
    return {
      sessionsThisWeek: thisWeekSessions.length,
      weeklyProgress
    };
  };
  const getSessionsThisMonth = () => {
    const now = /* @__PURE__ */ new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
    return practiceHistory.value.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= monthAgo && itemDate <= now;
    }).length;
  };
  const getFavoriteMode = () => {
    if (practiceHistory.value.length === 0) return "";
    const modeCount = practiceHistory.value.reduce((acc, item) => {
      acc[item.mode] = (acc[item.mode] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(modeCount).sort(([, a], [, b]) => b - a)[0]?.[0] || "";
  };
  const stats = computed(() => {
    if (isLoading.value || practiceHistory.value.length === 0) {
      return {
        totalSessions: 0,
        totalPracticeTime: 0,
        averageAccuracy: 0,
        bestScore: 0,
        favoriteMode: "",
        totalCardsStudied: 0,
        streakDays: 0,
        weeklyProgress: 0,
        sessionsThisWeek: 0,
        sessionsThisMonth: 0
      };
    }
    const totalSessions = practiceHistory.value.length;
    const totalPracticeTime = practiceHistory.value.reduce((sum, item) => sum + item.duration, 0);
    const averageAccuracy = Math.round(
      practiceHistory.value.reduce((sum, item) => sum + item.accuracy, 0) / totalSessions
    );
    const bestScore = Math.max(...practiceHistory.value.map((item) => item.score));
    const totalCardsStudied = practiceHistory.value.reduce((sum, item) => sum + item.totalCards, 0);
    const favoriteMode = getFavoriteMode();
    const streakDays = getStreakDays();
    const { sessionsThisWeek, weeklyProgress } = getWeeklyProgress();
    const sessionsThisMonth = getSessionsThisMonth();
    return {
      totalSessions,
      totalPracticeTime: Math.round(totalPracticeTime / 60),
      // Convert to minutes
      averageAccuracy,
      bestScore,
      favoriteMode,
      totalCardsStudied,
      streakDays,
      weeklyProgress,
      sessionsThisWeek,
      sessionsThisMonth
    };
  });
  const getFormattedStats = computed(() => {
    const currentStats = stats.value;
    return {
      ...currentStats,
      totalPracticeTimeFormatted: formatDuration(currentStats.totalPracticeTime),
      favoriteModeFormatted: formatMode(currentStats.favoriteMode),
      accuracyLevel: getAccuracyLevel(currentStats.averageAccuracy),
      streakLevel: getStreakLevel(currentStats.streakDays),
      progressLevel: getProgressLevel(currentStats.weeklyProgress)
    };
  });
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };
  const formatMode = (mode) => {
    const modeNames = {
      "flashcard": "Flashcard",
      "quiz": "Quiz",
      "typing": "Typing",
      "listening": "Listening",
      "image": "Image",
      "pictionary": "Pictionary",
      "pronunciation": "Pronunciation",
      "bubble-shooter": "Bubble Shooter",
      "snake-game": "Snake Hunt"
    };
    return modeNames[mode] || mode;
  };
  const getAccuracyLevel = (accuracy) => {
    if (accuracy >= 90) return { level: "Excellent", color: "text-green-600 dark:text-green-400" };
    if (accuracy >= 80) return { level: "Good", color: "text-blue-600 dark:text-blue-400" };
    if (accuracy >= 70) return { level: "Fair", color: "text-yellow-600 dark:text-yellow-400" };
    if (accuracy >= 60) return { level: "Average", color: "text-orange-600 dark:text-orange-400" };
    return { level: "Needs Work", color: "text-red-600 dark:text-red-400" };
  };
  const getStreakLevel = (days) => {
    if (days >= 30) return { level: "Amazing", color: "text-purple-600 dark:text-purple-400" };
    if (days >= 14) return { level: "Great", color: "text-green-600 dark:text-green-400" };
    if (days >= 7) return { level: "Good", color: "text-blue-600 dark:text-blue-400" };
    if (days >= 3) return { level: "Building", color: "text-yellow-600 dark:text-yellow-400" };
    if (days >= 1) return { level: "Started", color: "text-orange-600 dark:text-orange-400" };
    return { level: "None", color: "text-gray-600 dark:text-gray-400" };
  };
  const getProgressLevel = (progress) => {
    if (progress >= 90) return { level: "Outstanding", color: "text-green-600 dark:text-green-400" };
    if (progress >= 70) return { level: "Strong", color: "text-blue-600 dark:text-blue-400" };
    if (progress >= 50) return { level: "Moderate", color: "text-yellow-600 dark:text-yellow-400" };
    if (progress >= 30) return { level: "Light", color: "text-orange-600 dark:text-orange-400" };
    return { level: "Minimal", color: "text-red-600 dark:text-red-400" };
  };
  const refreshStats = () => {
    loadPracticeHistory();
  };
  onMounted(() => {
    loadPracticeHistory();
  });
  return {
    stats,
    getFormattedStats,
    isLoading,
    refreshStats
  };
}
const _hoisted_1 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[420px] flex flex-col" };
const _hoisted_2 = { class: "px-6 py-8 sm:p-8 flex-1 flex flex-col" };
const _hoisted_3 = { class: "flex items-center mb-6" };
const _hoisted_4 = { class: "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" };
const _hoisted_5 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_6 = {
  key: 1,
  class: "flex-1 flex flex-col items-center justify-center text-center space-y-4"
};
const _hoisted_7 = { class: "text-sm font-medium text-gray-600 dark:text-gray-300" };
const _hoisted_8 = { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" };
const _hoisted_9 = {
  key: 2,
  class: "space-y-6 flex-1"
};
const _hoisted_10 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_11 = {
  class: "bg-white/50 dark:bg-white/5 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_12 = { class: "flex items-center justify-between mb-2" };
const _hoisted_13 = { class: "text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide" };
const _hoisted_14 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_15 = {
  class: "bg-white/50 dark:bg-white/5 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_16 = { class: "flex items-center justify-between mb-2" };
const _hoisted_17 = { class: "text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide" };
const _hoisted_18 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_19 = { class: "text-sm font-medium text-gray-600 dark:text-gray-300" };
const _hoisted_20 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_21 = {
  class: "bg-white/50 dark:bg-white/5 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_22 = { class: "flex items-center justify-between mb-2" };
const _hoisted_23 = { class: "text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide" };
const _hoisted_24 = { class: "space-y-1" };
const _hoisted_25 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_26 = {
  class: "bg-white/50 dark:bg-white/5 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_27 = { class: "flex items-center justify-between mb-2" };
const _hoisted_28 = { class: "text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide" };
const _hoisted_29 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_30 = { class: "space-y-3" };
const _hoisted_31 = {
  class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_32 = { class: "flex-1 min-w-0" };
const _hoisted_33 = { class: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_34 = { class: "text-xs text-purple-600 dark:text-purple-400 font-medium" };
const _hoisted_35 = {
  class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_36 = { class: "flex-1 min-w-0" };
const _hoisted_37 = { class: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_38 = { class: "text-xs text-pink-600 dark:text-pink-400 font-medium" };
const _hoisted_39 = {
  key: 0,
  class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_40 = { class: "flex-1 min-w-0" };
const _hoisted_41 = { class: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_42 = { class: "text-xs text-yellow-600 dark:text-yellow-400 font-medium" };
const _hoisted_43 = {
  class: "pt-4 border-t border-gray-200 dark:border-white/10",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_44 = { class: "flex items-center justify-between mb-2" };
const _hoisted_45 = { class: "text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide" };
const _hoisted_46 = { class: "w-full bg-gray-200 dark:bg-white/10 rounded-full h-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardStats",
  setup(__props) {
    const { t } = useI18n();
    const { stats, getFormattedStats: formattedStats, isLoading } = useFlashcardDashboardStats();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
              createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3" })
            ], -1)),
            createBaseVNode("h3", _hoisted_4, toDisplayString(unref(t)("dashboard.flashcardStats.title", "Flashcard Practice")), 1)
          ]),
          unref(isLoading) ? (openBlock(), createElementBlock("div", _hoisted_5, _cache[1] || (_cache[1] = [
            createBaseVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" }, null, -1)
          ]))) : unref(stats).totalSessions === 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center" }, [
              createBaseVNode("svg", {
                class: "w-8 h-8 text-purple-500 dark:text-purple-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                })
              ])
            ], -1)),
            createBaseVNode("div", null, [
              createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("dashboard.flashcardStats.noData", "No practice sessions yet")), 1),
              createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("dashboard.flashcardStats.startPracticing", "Start practicing to see your stats!")), 1)
            ])
          ])) : (openBlock(), createElementBlock("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("dashboard.flashcardStats.sessions", "Sessions")), 1),
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "w-6 h-6 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-purple-600 dark:text-purple-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                    ])
                  ], -1))
                ]),
                createBaseVNode("p", _hoisted_14, toDisplayString(unref(stats).totalSessions), 1)
              ]),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("dashboard.flashcardStats.streak", "Streak")), 1),
                  _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-orange-600 dark:text-orange-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" })
                    ])
                  ], -1))
                ]),
                createBaseVNode("p", _hoisted_18, [
                  createTextVNode(toDisplayString(unref(stats).streakDays) + " ", 1),
                  createBaseVNode("span", _hoisted_19, toDisplayString(unref(t)("dashboard.flashcardStats.days", "days")), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("div", _hoisted_22, [
                  createBaseVNode("span", _hoisted_23, toDisplayString(unref(t)("dashboard.flashcardStats.accuracy", "Accuracy")), 1),
                  _cache[5] || (_cache[5] = createBaseVNode("div", { class: "w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-green-600 dark:text-green-400",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])
                  ], -1))
                ]),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("p", _hoisted_25, toDisplayString(unref(stats).averageAccuracy) + "%", 1),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs font-medium", unref(formattedStats).accuracyLevel.color])
                  }, toDisplayString(unref(formattedStats).accuracyLevel.level), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_26, [
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("span", _hoisted_28, toDisplayString(unref(t)("dashboard.flashcardStats.bestScore", "Best Score")), 1),
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-blue-600 dark:text-blue-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                    ])
                  ], -1))
                ]),
                createBaseVNode("p", _hoisted_29, toDisplayString(unref(stats).bestScore), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_30, [
              createBaseVNode("div", _hoisted_31, [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "flex-shrink-0" }, [
                  createBaseVNode("div", { class: "w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-4 h-4 text-white",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("p", _hoisted_33, toDisplayString(unref(t)("dashboard.flashcardStats.totalTime", "Total Practice Time")), 1),
                  createBaseVNode("p", _hoisted_34, toDisplayString(unref(formattedStats).totalPracticeTimeFormatted), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_35, [
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "flex-shrink-0" }, [
                  createBaseVNode("div", { class: "w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-4 h-4 text-white",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
                    ])
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_36, [
                  createBaseVNode("p", _hoisted_37, toDisplayString(unref(t)("dashboard.flashcardStats.cardsStudied", "Cards Studied")), 1),
                  createBaseVNode("p", _hoisted_38, toDisplayString(unref(stats).totalCardsStudied.toLocaleString()), 1)
                ])
              ]),
              unref(stats).favoriteMode ? (openBlock(), createElementBlock("div", _hoisted_39, [
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "flex-shrink-0" }, [
                  createBaseVNode("div", { class: "w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-4 h-4 text-white",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                    ])
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("p", _hoisted_41, toDisplayString(unref(t)("dashboard.flashcardStats.favoriteMode", "Favorite Mode")), 1),
                  createBaseVNode("p", _hoisted_42, toDisplayString(unref(formattedStats).favoriteModeFormatted), 1)
                ])
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_43, [
              createBaseVNode("div", _hoisted_44, [
                createBaseVNode("span", _hoisted_45, toDisplayString(unref(t)("dashboard.flashcardStats.weeklyProgress", "This Week")), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["text-xs font-medium", unref(formattedStats).progressLevel.color])
                }, toDisplayString(unref(stats).sessionsThisWeek) + "/7 " + toDisplayString(unref(t)("dashboard.flashcardStats.sessions", "sessions")), 3)
              ]),
              createBaseVNode("div", _hoisted_46, [
                createBaseVNode("div", {
                  class: "bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 animate-progress-slide",
                  style: normalizeStyle({ width: `${unref(stats).weeklyProgress}%` })
                }, null, 4)
              ])
            ])
          ]))
        ])
      ]);
    };
  }
});
const FlashcardStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-56f500fe"]]);
export {
  FlashcardStats as default
};
//# sourceMappingURL=FlashcardStats-CqjNsnC1.js.map
