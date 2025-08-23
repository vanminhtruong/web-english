import { d as defineComponent, M as useI18n, c as createElementBlock, v as openBlock, V as createStaticVNode, f as createBaseVNode, t as toDisplayString, u as unref } from "./vendor-CKTvmtu5.js";
const _hoisted_1 = { class: "relative bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-white/10 overflow-hidden" };
const _hoisted_2 = { class: "max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative" };
const _hoisted_3 = { class: "flex items-center space-x-4 mb-4" };
const _hoisted_4 = { class: "flex-1" };
const _hoisted_5 = { class: "text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-fade-in-up" };
const _hoisted_6 = { class: "flex items-center mt-2 space-x-2" };
const _hoisted_7 = { class: "text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DashboardHeader",
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[3] || (_cache[3] = createStaticVNode('<div class="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20"></div><div class="absolute top-0 left-0 w-full h-full"><div class="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-ping opacity-60"></div><div class="absolute top-4 right-1/3 w-1 h-1 bg-purple-400 dark:bg-purple-300 rounded-full animate-pulse"></div><div class="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-pink-400 dark:bg-pink-300 rounded-full animate-bounce"></div></div>', 2)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[1] || (_cache[1] = createStaticVNode('<div class="relative"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300"><svg class="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div></div>', 1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("dashboard.title", "Dashboard")), 1),
              createBaseVNode("div", _hoisted_6, [
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" })
                ], -1)),
                createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("dashboard.description", "Here is a summary of your learning progress.")), 1)
              ])
            ])
          ]),
          _cache[2] || (_cache[2] = createStaticVNode('<div class="relative"><div class="h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-progress-slide"></div></div><div class="absolute -top-1 left-0 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-bounce-slow"></div></div><div class="absolute inset-0 pointer-events-none"><div class="absolute top-1/4 left-1/6 w-1 h-1 bg-yellow-400 rounded-full animate-float"></div><div class="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-green-400 rounded-full animate-float-delay"></div><div class="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-slow"></div></div>', 2))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DashboardHeader-CgoRx0i6.js.map
