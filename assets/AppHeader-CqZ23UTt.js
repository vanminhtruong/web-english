const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ThemeToggle-BZkvQqjK.js","assets/index-CuT7CdFb.js","assets/vendor-DoTKyHPB.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-QWkG18kn.css","assets/ThemeToggle-DSsMUYxu.css","assets/LanguageSwitcher-DgoEowJh.js"])))=>i.map(i=>d[i]);
import { l as loadComponentSafely, _ as __vitePreload, a as _export_sfc } from "./index-CuT7CdFb.js";
import { d as defineComponent, H as useI18n, Q as useRoute, G as useRouter, A as ref, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, C as withDirectives, u as unref, Z as withKeys, i as withModifiers, y as createVNode, w as withCtx, g as createTextVNode, t as toDisplayString, n as normalizeClass, _ as RouterLink, D as defineAsyncComponent, E as vShow, a as normalizeStyle } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _imports_0 = "/web-english/assets/logo-BhsFdO8Y.svg";
const _hoisted_1 = { class: "w-full px-4 sm:px-6 lg:px-8" };
const _hoisted_2 = { class: "flex items-center justify-between h-16" };
const _hoisted_3 = { class: "flex items-center space-x-2 sm:space-x-4" };
const _hoisted_4 = ["title"];
const _hoisted_5 = ["title", "onKeydown"];
const _hoisted_6 = { class: "hidden xl:flex items-center space-x-4" };
const _hoisted_7 = { class: "flex space-x-1" };
const _hoisted_8 = { class: "xl:hidden flex items-center space-x-2" };
const _hoisted_9 = ["aria-expanded"];
const _hoisted_10 = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_11 = {
  key: 1,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_12 = { class: "px-2 pt-2 pb-3 space-y-1" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  setup(__props) {
    const ThemeToggle = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./ThemeToggle-BZkvQqjK.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0))
    );
    const LanguageSwitcher = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./LanguageSwitcher-DgoEowJh.js"), true ? __vite__mapDeps([7,1,2,3,4,5]) : void 0))
    );
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const isMobileMenuOpen = ref(false);
    const isScrolled = ref(false);
    const scrollProgress = ref(0);
    let hasAnimated = false;
    let lastScrollY = 0;
    const enhancedScroll = () => {
      const scrollY = window.scrollY;
      const header = document.querySelector("header");
      if (!header) return;
      if (scrollY === 0) {
        isScrolled.value = false;
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
        header.style.boxShadow = "none";
        hasAnimated = false;
        lastScrollY = 0;
        return;
      }
      const scrollingDown = scrollY > lastScrollY;
      if (scrollingDown && !hasAnimated && scrollY > 50) {
        hasAnimated = true;
        isScrolled.value = true;
        header.style.transform = "translateY(-64px)";
        header.style.opacity = "0.8";
        window.setTimeout(() => {
          header.style.transform = "translateY(0)";
          header.style.opacity = "1";
        }, 170);
        const progress = Math.min(scrollY / 100, 1);
        const shadowIntensity = Math.min(progress * 0.3, 0.2);
        header.style.boxShadow = `0 ${4 + progress * 8}px ${8 + progress * 16}px rgba(0, 0, 0, ${shadowIntensity})`;
      }
      lastScrollY = scrollY;
    };
    onMounted(() => {
      window.addEventListener("scroll", enhancedScroll, { passive: true });
      enhancedScroll();
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", enhancedScroll);
    });
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };
    const handleLogoClick = async () => {
      try {
        if (route.path === "/dashboard") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          if (isMobileMenuOpen.value) closeMobileMenu();
          await router.push("/dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (e) {
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        class: normalizeClass([
          "backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled.value ? "bg-white/95 dark:bg-black/95 shadow-xl shadow-black/10 dark:shadow-white/10 border-b border-gray-200/10 dark:border-gray-700/10" : "bg-transparent shadow-none border-transparent"
        ]),
        style: normalizeStyle({
          position: "fixed",
          top: 0,
          left: "0px",
          right: "0px",
          width: "100vw",
          maxWidth: "100vw",
          minWidth: "100vw",
          opacity: Math.max(0.9, 1 - scrollProgress.value * 0.1),
          backdropFilter: isScrolled.value ? "blur(12px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: isScrolled.value ? "blur(12px) saturate(180%)" : "blur(0px)",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          overflowX: "hidden"
        })
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("img", {
                alt: "Vue logo",
                src: _imports_0,
                class: "h-6 w-6 sm:h-8 sm:w-8 cursor-pointer",
                onClick: handleLogoClick,
                title: unref(t)("common.dashboard", "Dashboard")
              }, null, 8, _hoisted_4),
              createBaseVNode("h1", {
                class: "text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate cursor-pointer",
                onClick: handleLogoClick,
                title: unref(t)("common.dashboard", "Dashboard"),
                role: "button",
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers(handleLogoClick, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(handleLogoClick, ["prevent"]), ["space"])
                ]
              }, _cache[0] || (_cache[0] = [
                createBaseVNode("span", { class: "hidden sm:inline" }, "English Learning App", -1),
                createBaseVNode("span", { class: "sm:hidden" }, "English App", -1)
              ]), 40, _hoisted_5)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("nav", _hoisted_7, [
                createVNode(unref(RouterLink), {
                  to: "/dashboard",
                  class: normalizeClass([
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none",
                    unref(route).path === "/dashboard" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                  ])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.dashboard", "Dashboard")), 1)
                  ]),
                  _: 1
                }, 8, ["class"]),
                createVNode(unref(RouterLink), {
                  to: "/vocabulary",
                  class: normalizeClass([
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none",
                    unref(route).path === "/vocabulary" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                  ])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.vocabulary", "Vocabulary")), 1)
                  ]),
                  _: 1
                }, 8, ["class"]),
                createVNode(unref(RouterLink), {
                  to: "/grammar",
                  class: normalizeClass([
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none",
                    unref(route).path === "/grammar" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                  ])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.grammar", "Grammar")), 1)
                  ]),
                  _: 1
                }, 8, ["class"]),
                createVNode(unref(RouterLink), {
                  to: "/practice/flashcard",
                  class: normalizeClass([
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none",
                    unref(route).path === "/practice/flashcard" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                  ])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.practice", "Practice")), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              createVNode(unref(LanguageSwitcher)),
              createVNode(unref(ThemeToggle))
            ]),
            createBaseVNode("div", _hoisted_8, [
              createVNode(unref(LanguageSwitcher)),
              createVNode(unref(ThemeToggle)),
              createBaseVNode("button", {
                onClick: toggleMobileMenu,
                class: "inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95",
                "aria-expanded": isMobileMenuOpen.value,
                "aria-label": "Toggle navigation menu"
              }, [
                !isMobileMenuOpen.value ? (openBlock(), createElementBlock("svg", _hoisted_10, _cache[1] || (_cache[1] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 6h16M4 12h16M4 18h16"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_11, _cache[2] || (_cache[2] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  }, null, -1)
                ])))
              ], 8, _hoisted_9)
            ])
          ]),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 ease-out transform", isMobileMenuOpen.value ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"])
          }, [
            createBaseVNode("nav", _hoisted_12, [
              createVNode(unref(RouterLink), {
                to: "/dashboard",
                onClick: closeMobileMenu,
                class: normalizeClass([
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-out transform hover:translate-x-1 hover:scale-105 focus:outline-none",
                  unref(route).path === "/dashboard" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                ])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("common.dashboard", "Dashboard")), 1)
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(unref(RouterLink), {
                to: "/vocabulary",
                onClick: closeMobileMenu,
                class: normalizeClass([
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none",
                  unref(route).path === "/vocabulary" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                ])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("common.vocabulary", "Vocabulary")), 1)
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(unref(RouterLink), {
                to: "/grammar",
                onClick: closeMobileMenu,
                class: normalizeClass([
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none",
                  unref(route).path === "/grammar" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                ])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("common.grammar", "Grammar")), 1)
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(unref(RouterLink), {
                to: "/practice/flashcard",
                onClick: closeMobileMenu,
                class: normalizeClass([
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none",
                  unref(route).path === "/practice/flashcard" ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold" : ""
                ])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("common.practice", "Practice")), 1)
                ]),
                _: 1
              }, 8, ["class"])
            ])
          ], 2), [
            [vShow, isMobileMenuOpen.value]
          ])
        ])
      ], 6);
    };
  }
});
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd7c5622"]]);
export {
  AppHeader as default
};
//# sourceMappingURL=AppHeader-CqZ23UTt.js.map
