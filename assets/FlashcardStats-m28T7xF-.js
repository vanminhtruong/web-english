import { A as ref, B as computed, I as onMounted, d as defineComponent, $ as useCssVars, c as createElementBlock, v as openBlock, a as normalizeStyle, f as createBaseVNode, e as createCommentVNode, n as normalizeClass, x as renderSlot, t as toDisplayString, F as Fragment, j as renderList, H as useI18n, u as unref, y as createVNode, w as withCtx } from "./vendor-kzGOnAa-.js";
import { a as _export_sfc } from "./index-CVcMrQRh.js";
import "./vendor-toast-DUxYViPJ.js";
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
const _hoisted_1$1 = ["width", "height"];
const _hoisted_2$1 = ["id"];
const _hoisted_3$1 = ["id"];
const _hoisted_4$1 = ["id"];
const _hoisted_5$1 = ["cx", "cy", "r", "stroke", "stroke-width"];
const _hoisted_6$1 = ["cx", "cy", "r", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
const _hoisted_7$1 = ["cx", "cy", "r", "stroke-dashoffset"];
const _hoisted_8$1 = { class: "flex flex-col items-center justify-center text-center space-y-1 transform transition-all duration-300 group-hover:scale-105" };
const _hoisted_9$1 = {
  key: 0,
  class: "flex-shrink-0 mb-1 relative"
};
const _hoisted_10$1 = { class: "flex flex-col items-center justify-center" };
const _hoisted_11$1 = {
  key: 0,
  class: "absolute inset-0 pointer-events-none overflow-hidden rounded-full"
};
const __default__ = {
  name: "CircularProgress"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    value: {},
    max: {},
    size: { default: 120 },
    strokeWidth: { default: 8 },
    progressColor: { default: "#3b82f6" },
    progressColorSecondary: { default: "#60a5fa" },
    progressColorThertiary: { default: "#93c5fd" },
    backgroundColor: { default: "#e5e7eb" },
    label: {},
    unit: { default: "" },
    showIcon: { type: Boolean, default: false },
    valueClass: { default: "text-xl font-bold" },
    showShimmer: { type: Boolean, default: false },
    glowEffect: { type: Boolean, default: false },
    animationDelay: { default: 0 }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "bd8d57e4": _ctx.animationDelay + "ms"
    }));
    const props = __props;
    const animatedValue = ref(0);
    const animatedProgress = ref(0);
    const isAnimating = ref(false);
    const radius = computed(() => (props.size - props.strokeWidth) / 2);
    const circumference = computed(() => 2 * Math.PI * radius.value);
    const percentage = computed(() => Math.min(props.value / props.max * 100, 100));
    const strokeDashoffset = computed(
      () => circumference.value - animatedProgress.value / 100 * circumference.value
    );
    const displayValue = computed(() => {
      if (props.unit === "%") {
        return Math.round(animatedProgress.value);
      }
      return Math.round(animatedValue.value);
    });
    const animateValue = (from, to, duration = 1500) => {
      const startTime = Date.now();
      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        animatedValue.value = from + (to - from) * easeOutCubic;
        animatedProgress.value = from + (percentage.value - from) * easeOutCubic;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          isAnimating.value = false;
        }
      };
      isAnimating.value = true;
      requestAnimationFrame(update);
    };
    const circularProgressRef = ref();
    ref(false);
    const startAnimation = () => {
      setTimeout(() => {
        animateValue(0, props.value);
      }, props.animationDelay);
    };
    onMounted(() => {
      startAnimation();
      if (!circularProgressRef.value) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimating.value) {
              animatedValue.value = 0;
              animatedProgress.value = 0;
              startAnimation();
            }
          });
        },
        {
          threshold: 0.3,
          // Trigger when 30% visible
          rootMargin: "0px 0px -20px 0px"
        }
      );
      observer.observe(circularProgressRef.value);
      return () => observer.disconnect();
    });
    const iconSize = computed(() => {
      if (props.size >= 140) return "w-6 h-6";
      if (props.size >= 100) return "w-5 h-5";
      return "w-4 h-4";
    });
    const gradientId = computed(() => Math.random().toString(36).substr(2, 9));
    const shimmerOffset = computed(() => circumference.value);
    const progressColorTertiary = computed(() => props.progressColorThertiary);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "circularProgressRef",
        ref: circularProgressRef,
        class: "relative group cursor-pointer rounded-full overflow-hidden",
        style: normalizeStyle([{ "display": "inline-block", "background": "transparent !important", "box-shadow": "none !important" }, { width: _ctx.size + "px", height: _ctx.size + "px", clipPath: "circle(50% at 50% 50%)" }])
      }, [
        createBaseVNode("div", {
          class: "absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-0 group-hover:opacity-30 transition-all duration-700 blur-xl animate-pulse",
          style: normalizeStyle({
            background: `radial-gradient(circle, ${_ctx.progressColor}20, transparent 70%)`,
            transform: "scale(1.2)"
          })
        }, null, 4),
        (openBlock(), createElementBlock("svg", {
          width: _ctx.size,
          height: _ctx.size,
          class: "transform -rotate-90 transition-all duration-500 group-hover:scale-105 relative z-10",
          style: { "display": "block", "background": "transparent !important" }
        }, [
          createBaseVNode("defs", null, [
            createBaseVNode("linearGradient", {
              id: `progressGradient-${gradientId.value}`,
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%"
            }, [
              createBaseVNode("stop", {
                offset: "0%",
                style: normalizeStyle({ stopColor: _ctx.progressColor, stopOpacity: 1 })
              }, null, 4),
              createBaseVNode("stop", {
                offset: "50%",
                style: normalizeStyle({ stopColor: _ctx.progressColorSecondary, stopOpacity: 0.9 })
              }, null, 4),
              createBaseVNode("stop", {
                offset: "100%",
                style: normalizeStyle({ stopColor: progressColorTertiary.value, stopOpacity: 1 })
              }, null, 4)
            ], 8, _hoisted_2$1),
            createBaseVNode("linearGradient", {
              id: `backgroundGradient-${gradientId.value}`,
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%"
            }, [
              createBaseVNode("stop", {
                offset: "0%",
                style: normalizeStyle({ stopColor: _ctx.backgroundColor, stopOpacity: 0.1 })
              }, null, 4),
              createBaseVNode("stop", {
                offset: "100%",
                style: normalizeStyle({ stopColor: _ctx.backgroundColor, stopOpacity: 0.3 })
              }, null, 4)
            ], 8, _hoisted_3$1),
            createBaseVNode("filter", {
              id: `glow-${gradientId.value}`
            }, _cache[0] || (_cache[0] = [
              createBaseVNode("feGaussianBlur", {
                stdDeviation: "3",
                result: "coloredBlur"
              }, null, -1),
              createBaseVNode("feMerge", null, [
                createBaseVNode("feMergeNode", { in: "coloredBlur" }),
                createBaseVNode("feMergeNode", { in: "SourceGraphic" })
              ], -1)
            ]), 8, _hoisted_4$1)
          ]),
          createBaseVNode("circle", {
            cx: _ctx.size / 2,
            cy: _ctx.size / 2,
            r: radius.value,
            stroke: `url(#backgroundGradient-${gradientId.value})`,
            "stroke-width": _ctx.strokeWidth,
            fill: "transparent",
            class: "opacity-40"
          }, null, 8, _hoisted_5$1),
          createBaseVNode("circle", {
            cx: _ctx.size / 2,
            cy: _ctx.size / 2,
            r: radius.value,
            stroke: `url(#progressGradient-${gradientId.value})`,
            "stroke-width": _ctx.strokeWidth + 1,
            fill: "transparent",
            "stroke-dasharray": circumference.value,
            "stroke-dashoffset": strokeDashoffset.value,
            "stroke-linecap": "round",
            class: "transition-all duration-1500 ease-out transform-gpu",
            style: normalizeStyle({
              filter: _ctx.glowEffect ? `url(#glow-${gradientId.value})` : "none",
              animation: "progressShine 3s infinite linear"
            })
          }, null, 12, _hoisted_6$1),
          _ctx.showShimmer ? (openBlock(), createElementBlock("circle", {
            key: 0,
            cx: _ctx.size / 2,
            cy: _ctx.size / 2,
            r: radius.value,
            stroke: "rgba(255, 255, 255, 0.6)",
            "stroke-width": 1,
            fill: "transparent",
            "stroke-dasharray": "20 80",
            "stroke-dashoffset": shimmerOffset.value,
            "stroke-linecap": "round",
            class: "animate-spin",
            style: { "animation-duration": "4s" },
            opacity: "0.8"
          }, null, 8, _hoisted_7$1)) : createCommentVNode("", true)
        ], 8, _hoisted_1$1)),
        createBaseVNode("div", {
          class: "pointer-events-none absolute inset-0 flex items-center justify-center",
          style: normalizeStyle({
            width: _ctx.size + "px",
            height: _ctx.size + "px"
          })
        }, [
          createBaseVNode("div", _hoisted_8$1, [
            _ctx.showIcon ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
              createBaseVNode("div", {
                class: normalizeClass(["transition-all duration-300 group-hover:text-white", iconSize.value]),
                style: normalizeStyle({
                  color: _ctx.progressColor,
                  filter: `drop-shadow(0 0 8px ${_ctx.progressColor}40)`,
                  textShadow: `0 0 10px ${_ctx.progressColor}60`
                })
              }, [
                renderSlot(_ctx.$slots, "icon", {}, void 0, true)
              ], 6)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("div", {
                class: normalizeClass(["font-bold tracking-tight transition-all duration-300 group-hover:scale-110", _ctx.valueClass]),
                style: normalizeStyle({
                  color: "white",
                  textShadow: `0 0 15px ${_ctx.progressColor}50, 0 2px 4px rgba(0,0,0,0.3)`,
                  letterSpacing: "-0.02em"
                })
              }, toDisplayString(displayValue.value) + toDisplayString(_ctx.unit), 7),
              _ctx.label ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:text-white mt-1",
                style: normalizeStyle({
                  color: `${_ctx.progressColor}dd`,
                  textShadow: `0 0 8px ${_ctx.progressColor}40`,
                  letterSpacing: "0.05em"
                })
              }, toDisplayString(_ctx.label), 5)) : createCommentVNode("", true)
            ])
          ])
        ], 4),
        _ctx.showShimmer ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
          (openBlock(), createElementBlock(Fragment, null, renderList(3, (i) => {
            return createBaseVNode("div", {
              key: i,
              class: "absolute w-1 h-1 rounded-full animate-pulse",
              style: normalizeStyle({
                background: `radial-gradient(circle, ${_ctx.progressColor}, transparent)`,
                top: Math.random() * 80 + 10 + "%",
                left: Math.random() * 80 + 10 + "%",
                animationDelay: i * 0.5 + "s",
                animationDuration: "2s"
              })
            }, null, 4);
          }), 64))
        ])) : createCommentVNode("", true)
      ], 4);
    };
  }
});
const CircularProgress = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-621c8743"]]);
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
const _hoisted_10 = {
  class: "grid grid-cols-2 lg:grid-cols-4 place-items-center justify-center gap-8 lg:gap-6",
  style: { "background": "transparent !important" }
};
const _hoisted_11 = {
  class: "flex flex-col items-center text-center",
  style: { "background": "transparent !important" }
};
const _hoisted_12 = { style: { "background": "transparent !important" } };
const _hoisted_13 = {
  class: "flex flex-col items-center text-center",
  style: { "background": "transparent !important" }
};
const _hoisted_14 = {
  class: "flex flex-col items-center text-center",
  style: { "background": "transparent !important" }
};
const _hoisted_15 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" };
const _hoisted_16 = {
  class: "bg-white/50 dark:bg-[#0a0a0a]/30 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-[#0a0a0a]/50 transition-all duration-300",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_17 = { class: "flex items-center justify-between mb-2" };
const _hoisted_18 = { class: "text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide" };
const _hoisted_19 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_20 = {
  class: "bg-white/50 dark:bg-[#0a0a0a]/30 rounded-xl p-4 group/stat hover:bg-white/70 dark:hover:bg-[#0a0a0a]/50 transition-all duration-300",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_21 = { class: "flex items-center justify-between mb-2" };
const _hoisted_22 = { class: "text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide" };
const _hoisted_23 = { class: "text-2xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_24 = { class: "space-y-3" };
const _hoisted_25 = {
  class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-[#0a0a0a]/20 transition-all duration-300",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_26 = { class: "flex-1 min-w-0" };
const _hoisted_27 = { class: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_28 = { class: "text-xs text-purple-600 dark:text-purple-400 font-medium" };
const _hoisted_29 = {
  key: 0,
  class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-[#0a0a0a]/20 transition-all duration-300",
  style: { "animation-delay": "0.8s" }
};
const _hoisted_30 = { class: "flex-1 min-w-0" };
const _hoisted_31 = { class: "text-xs sm:text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_32 = { class: "text-xs text-yellow-600 dark:text-yellow-400 font-medium" };
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
                createVNode(CircularProgress, {
                  value: unref(stats).totalSessions,
                  max: Math.max(unref(stats).totalSessions + 10, 50),
                  size: 110,
                  "stroke-width": 7,
                  "progress-color": "#8b5cf6",
                  "progress-color-secondary": "#a855f7",
                  "progress-color-tertiary": "#c084fc",
                  "background-color": "#1e1b4b",
                  label: unref(t)("dashboard.flashcardStats.sessions", "Sessions"),
                  "show-icon": "",
                  "show-shimmer": true,
                  "glow-effect": true,
                  "value-class": "text-lg sm:text-xl font-bold",
                  "animation-delay": 100
                }, {
                  icon: withCtx(() => _cache[3] || (_cache[3] = [
                    createBaseVNode("svg", {
                      class: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                    ], -1)
                  ])),
                  _: 1
                }, 8, ["value", "max", "label"])
              ]),
              createBaseVNode("div", _hoisted_12, [
                createVNode(CircularProgress, {
                  value: unref(stats).streakDays,
                  max: Math.max(unref(stats).streakDays + 5, 30),
                  size: 110,
                  "stroke-width": 7,
                  "progress-color": "#f97316",
                  "progress-color-secondary": "#fb923c",
                  "progress-color-tertiary": "#fdba74",
                  "background-color": "#7c2d12",
                  label: unref(t)("dashboard.flashcardStats.streak", "Streak"),
                  unit: unref(t)("dashboard.flashcardStats.days", "days"),
                  "show-icon": "",
                  "show-shimmer": true,
                  "glow-effect": true,
                  "value-class": "text-lg sm:text-xl font-bold",
                  "animation-delay": 200
                }, {
                  icon: withCtx(() => _cache[4] || (_cache[4] = [
                    createBaseVNode("svg", {
                      class: "w-5 h-5",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M17.657 18.657A8 8 0 716.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" })
                    ], -1)
                  ])),
                  _: 1
                }, 8, ["value", "max", "label", "unit"])
              ]),
              createBaseVNode("div", _hoisted_13, [
                createVNode(CircularProgress, {
                  value: unref(stats).averageAccuracy,
                  max: 100,
                  size: 110,
                  "stroke-width": 7,
                  "progress-color": "#10b981",
                  "progress-color-secondary": "#34d399",
                  "progress-color-tertiary": "#6ee7b7",
                  "background-color": "#064e3b",
                  label: unref(t)("dashboard.flashcardStats.accuracy", "Accuracy"),
                  unit: "%",
                  "show-icon": "",
                  "show-shimmer": true,
                  "glow-effect": true,
                  "value-class": "text-lg sm:text-xl font-bold",
                  "animation-delay": 300
                }, {
                  icon: withCtx(() => _cache[5] || (_cache[5] = [
                    createBaseVNode("svg", {
                      class: "w-5 h-5",
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
                    ], -1)
                  ])),
                  _: 1
                }, 8, ["value", "label"]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs font-medium mt-1", unref(formattedStats).accuracyLevel.color])
                }, toDisplayString(unref(formattedStats).accuracyLevel.level), 3)
              ]),
              createBaseVNode("div", _hoisted_14, [
                createVNode(CircularProgress, {
                  value: unref(stats).sessionsThisWeek,
                  max: 7,
                  size: 110,
                  "stroke-width": 7,
                  "progress-color": "#3b82f6",
                  "progress-color-secondary": "#60a5fa",
                  "progress-color-tertiary": "#93c5fd",
                  "background-color": "#1e3a8a",
                  label: unref(t)("dashboard.flashcardStats.weeklyProgress", "This Week"),
                  "show-icon": "",
                  "show-shimmer": true,
                  "glow-effect": true,
                  "value-class": "text-lg sm:text-xl font-bold",
                  "animation-delay": 400
                }, {
                  icon: withCtx(() => _cache[6] || (_cache[6] = [
                    createBaseVNode("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ], -1)
                  ])),
                  _: 1
                }, 8, ["value", "label"]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs font-medium mt-1", unref(formattedStats).progressLevel.color])
                }, toDisplayString(unref(stats).sessionsThisWeek) + "/7 " + toDisplayString(unref(t)("dashboard.flashcardStats.sessions", "sessions")), 3)
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("span", _hoisted_18, toDisplayString(unref(t)("dashboard.flashcardStats.bestScore", "Best Score")), 1),
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-blue-600 dark:text-blue-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                    ])
                  ], -1))
                ]),
                createBaseVNode("p", _hoisted_19, toDisplayString(unref(stats).bestScore), 1)
              ]),
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("span", _hoisted_22, toDisplayString(unref(t)("dashboard.flashcardStats.cardsStudied", "Cards Studied")), 1),
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "w-6 h-6 bg-pink-100 dark:bg-pink-900/50 rounded-lg flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300" }, [
                    createBaseVNode("svg", {
                      class: "w-3 h-3 text-pink-600 dark:text-pink-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
                    ])
                  ], -1))
                ]),
                createBaseVNode("p", _hoisted_23, toDisplayString(unref(stats).totalCardsStudied.toLocaleString()), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_24, [
              createBaseVNode("div", _hoisted_25, [
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "flex-shrink-0" }, [
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
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("p", _hoisted_27, toDisplayString(unref(t)("dashboard.flashcardStats.totalTime", "Total Practice Time")), 1),
                  createBaseVNode("p", _hoisted_28, toDisplayString(unref(formattedStats).totalPracticeTimeFormatted), 1)
                ])
              ]),
              unref(stats).favoriteMode ? (openBlock(), createElementBlock("div", _hoisted_29, [
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "flex-shrink-0" }, [
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
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("p", _hoisted_31, toDisplayString(unref(t)("dashboard.flashcardStats.favoriteMode", "Favorite Mode")), 1),
                  createBaseVNode("p", _hoisted_32, toDisplayString(unref(formattedStats).favoriteModeFormatted), 1)
                ])
              ])) : createCommentVNode("", true)
            ])
          ]))
        ])
      ]);
    };
  }
});
const FlashcardStats = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4522b048"]]);
export {
  FlashcardStats as default
};
//# sourceMappingURL=FlashcardStats-m28T7xF-.js.map
