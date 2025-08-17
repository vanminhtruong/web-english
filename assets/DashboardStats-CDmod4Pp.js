import { d as defineComponent, H as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, J as createStaticVNode, t as toDisplayString, u as unref, g as createTextVNode } from "./vendor-DMqe9Z5T.js";
const _hoisted_1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8" };
const _hoisted_2 = {
  class: "group relative bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_3 = { class: "relative p-6" };
const _hoisted_4 = { class: "space-y-2" };
const _hoisted_5 = { class: "text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide" };
const _hoisted_6 = { class: "text-3xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_7 = {
  class: "group relative bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_8 = { class: "relative p-6" };
const _hoisted_9 = { class: "space-y-2" };
const _hoisted_10 = { class: "text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide" };
const _hoisted_11 = { class: "text-3xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_12 = {
  class: "group relative bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_13 = { class: "relative p-6" };
const _hoisted_14 = { class: "space-y-2" };
const _hoisted_15 = { class: "text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide" };
const _hoisted_16 = { class: "text-3xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_17 = { class: "text-lg font-medium" };
const _hoisted_18 = {
  class: "group relative bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_19 = { class: "relative p-6" };
const _hoisted_20 = { class: "space-y-2" };
const _hoisted_21 = { class: "text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide" };
const _hoisted_22 = { class: "text-3xl font-bold text-gray-900 dark:text-white counter-animate" };
const _hoisted_23 = { class: "text-lg font-medium" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DashboardStats",
  props: {
    stats: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20 dark:from-blue-400/20 dark:to-blue-500/30" }, null, -1)),
          createBaseVNode("div", _hoisted_3, [
            _cache[1] || (_cache[1] = createStaticVNode('<div class="flex items-center justify-between mb-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div></div></div>', 1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("dt", _hoisted_5, toDisplayString(unref(t)("dashboard.stats.vocabularyLearned", "Vocabulary Learned")), 1),
              createBaseVNode("dd", _hoisted_6, toDisplayString(_ctx.stats.vocabularyLearned), 1),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-2" }, [
                createBaseVNode("div", {
                  class: "bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-progress-slide",
                  style: { "width": "75%" }
                })
              ], -1))
            ])
          ]),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping" }, null, -1))
        ]),
        createBaseVNode("div", _hoisted_7, [
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/20 dark:from-green-400/20 dark:to-green-500/30" }, null, -1)),
          createBaseVNode("div", _hoisted_8, [
            _cache[5] || (_cache[5] = createStaticVNode('<div class="flex items-center justify-between mb-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div></div>', 1)),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("dt", _hoisted_10, toDisplayString(unref(t)("dashboard.stats.grammarLessons", "Grammar Lessons")), 1),
              createBaseVNode("dd", _hoisted_11, toDisplayString(_ctx.stats.grammarLessons), 1),
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2" }, [
                createBaseVNode("div", {
                  class: "bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-progress-slide",
                  style: { "width": "60%" }
                })
              ], -1))
            ])
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping" }, null, -1))
        ]),
        createBaseVNode("div", _hoisted_12, [
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/20 dark:from-yellow-400/20 dark:to-orange-500/30" }, null, -1)),
          createBaseVNode("div", _hoisted_13, [
            _cache[9] || (_cache[9] = createStaticVNode('<div class="flex items-center justify-between mb-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path></svg></div></div><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg></div></div></div>', 1)),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("dt", _hoisted_15, toDisplayString(unref(t)("dashboard.stats.currentStreak", "Current Streak")), 1),
              createBaseVNode("dd", _hoisted_16, [
                createTextVNode(toDisplayString(_ctx.stats.currentStreak) + " ", 1),
                createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("dashboard.stats.days", "days")), 1)
              ]),
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "w-full bg-orange-100 dark:bg-orange-900/30 rounded-full h-2" }, [
                createBaseVNode("div", {
                  class: "bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full animate-progress-slide",
                  style: { "width": "85%" }
                })
              ], -1))
            ])
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping" }, null, -1))
        ]),
        createBaseVNode("div", _hoisted_18, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/20 dark:from-purple-400/20 dark:to-purple-500/30" }, null, -1)),
          createBaseVNode("div", _hoisted_19, [
            _cache[13] || (_cache[13] = createStaticVNode('<div class="flex items-center justify-between mb-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2C5.03 2 1 6.03 1 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm.5-13H9v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg></div></div><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div></div>', 1)),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("dt", _hoisted_21, toDisplayString(unref(t)("dashboard.stats.totalTime", "Total Time")), 1),
              createBaseVNode("dd", _hoisted_22, [
                createTextVNode(toDisplayString(_ctx.stats.totalTime) + " ", 1),
                createBaseVNode("span", _hoisted_23, toDisplayString(unref(t)("dashboard.stats.hours", "hours")), 1)
              ]),
              _cache[12] || (_cache[12] = createBaseVNode("div", { class: "w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2" }, [
                createBaseVNode("div", {
                  class: "bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full animate-progress-slide",
                  style: { "width": "90%" }
                })
              ], -1))
            ])
          ]),
          _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping" }, null, -1))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DashboardStats-CDmod4Pp.js.map
