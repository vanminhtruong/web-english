const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ThemeToggle-Czh627GW.js","assets/index-DMTlzOkx.js","assets/vendor-DoTKyHPB.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-l9w0-cqK.css","assets/ThemeToggle-DSsMUYxu.css","assets/LanguageSwitcher-ZIpjnZMw.js"])))=>i.map(i=>d[i]);
import { l as loadComponentSafely, _ as __vitePreload, a as _export_sfc } from "./index-DMTlzOkx.js";
import { d as defineComponent, H as useI18n, Q as useRoute, G as useRouter, A as ref, I as onMounted, L as onUnmounted, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, C as withDirectives, u as unref, Z as withKeys, i as withModifiers, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass, t as toDisplayString, y as createVNode, w as withCtx, g as createTextVNode, _ as RouterLink, D as defineAsyncComponent, E as vShow } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _imports_0 = "/web-english/assets/logo-BhsFdO8Y.svg";
const _hoisted_1 = { class: "w-full px-4 sm:px-6 lg:px-8" };
const _hoisted_2 = { class: "flex items-center justify-between h-16" };
const _hoisted_3 = { class: "flex items-center space-x-2 sm:space-x-4" };
const _hoisted_4 = ["title"];
const _hoisted_5 = ["title", "onKeydown"];
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = ["aria-label"];
const _hoisted_8 = { class: "hidden xl:flex items-center space-x-4" };
const _hoisted_9 = { class: "flex space-x-1" };
const _hoisted_10 = { class: "xl:hidden flex items-center space-x-2" };
const _hoisted_11 = ["aria-expanded"];
const _hoisted_12 = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_13 = {
  key: 1,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_14 = { class: "px-2 pt-2 pb-3 space-y-1" };
const appearStepMs = 120;
const hideStepMs = 80;
const cyclePauseMs = 1200;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  setup(__props) {
    const ThemeToggle = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./ThemeToggle-Czh627GW.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0))
    );
    const LanguageSwitcher = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./LanguageSwitcher-ZIpjnZMw.js"), true ? __vite__mapDeps([7,1,2,3,4,5]) : void 0))
    );
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const isMobileMenuOpen = ref(false);
    const isScrolled = ref(false);
    const scrollProgress = ref(0);
    const isSmallScreen = ref(false);
    const isHiding = ref(false);
    const animationCycleKey = ref(0);
    let cycleTimer = null;
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
      const media = window.matchMedia("(max-width: 639px)");
      const updateScreen = (e) => {
        isSmallScreen.value = e ? e.matches : media.matches;
      };
      updateScreen(media);
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", updateScreen);
      } else if (typeof media.addListener === "function") {
        media.addListener(updateScreen);
      }
      window.__headerMedia__ = { media, updateScreen };
      const runCycle = () => {
        isHiding.value = false;
        const wordsCount = isSmallScreen.value ? titleShortChars.value.length : titleFullChars.value.length;
        const appearDuration = appearStepMs * wordsCount + cyclePauseMs;
        cycleTimer = window.setTimeout(() => {
          isHiding.value = true;
          const hideDuration = hideStepMs * wordsCount + cyclePauseMs;
          cycleTimer = window.setTimeout(() => {
            animationCycleKey.value++;
            runCycle();
          }, hideDuration);
        }, appearDuration);
      };
      runCycle();
      window.__headerCycle__ = () => {
        if (cycleTimer) window.clearTimeout(cycleTimer);
      };
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", enhancedScroll);
      const refObj = window.__headerMedia__;
      if (refObj && refObj.media) {
        const { media, updateScreen } = refObj;
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", updateScreen);
        } else if (typeof media.removeListener === "function") {
          media.removeListener(updateScreen);
        }
        delete window.__headerMedia__;
      }
      const stopCycle = window.__headerCycle__;
      if (typeof stopCycle === "function") {
        stopCycle();
        delete window.__headerCycle__;
      }
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
    const fullTitle = computed(() => t("app.title", "English Learning App"));
    const shortTitle = computed(() => t("app.titleShort", "English App"));
    const titleFullChars = computed(() => Array.from(fullTitle.value));
    const titleShortChars = computed(() => Array.from(shortTitle.value));
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
                class: "header-logo h-6 w-6 sm:h-8 sm:w-8 cursor-pointer select-none",
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
              }, [
                !isSmallScreen.value ? (openBlock(), createElementBlock("span", {
                  class: "logo-words",
                  "aria-label": fullTitle.value,
                  key: `full-${animationCycleKey.value}`
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(titleFullChars.value, (char, index) => {
                    return openBlock(), createElementBlock(Fragment, null, [
                      char === " " ? (openBlock(), createElementBlock("span", {
                        key: `full-${index}-space`,
                        class: normalizeClass(["logo-char", "logo-space", isHiding.value ? "logo-char-hide" : ""]),
                        style: normalizeStyle({ animationDelay: `${index * (isHiding.value ? hideStepMs : appearStepMs)}ms` })
                      }, " ", 6)) : (openBlock(), createElementBlock("span", {
                        key: `full-${index}-${char}`,
                        class: normalizeClass(["logo-char", isHiding.value ? "logo-char-hide" : ""]),
                        style: normalizeStyle({ animationDelay: `${index * (isHiding.value ? hideStepMs : appearStepMs)}ms` })
                      }, toDisplayString(char), 7))
                    ], 64);
                  }), 256))
                ], 8, _hoisted_6)) : (openBlock(), createElementBlock("span", {
                  class: "logo-words",
                  "aria-label": shortTitle.value,
                  key: `short-${animationCycleKey.value}`
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(titleShortChars.value, (char, index) => {
                    return openBlock(), createElementBlock(Fragment, null, [
                      char === " " ? (openBlock(), createElementBlock("span", {
                        key: `short-${index}-space`,
                        class: normalizeClass(["logo-char", "logo-space", isHiding.value ? "logo-char-hide" : ""]),
                        style: normalizeStyle({ animationDelay: `${index * (isHiding.value ? hideStepMs : appearStepMs)}ms` })
                      }, " ", 6)) : (openBlock(), createElementBlock("span", {
                        key: `short-${index}-${char}`,
                        class: normalizeClass(["logo-char", isHiding.value ? "logo-char-hide" : ""]),
                        style: normalizeStyle({ animationDelay: `${index * (isHiding.value ? hideStepMs : appearStepMs)}ms` })
                      }, toDisplayString(char), 7))
                    ], 64);
                  }), 256))
                ], 8, _hoisted_7))
              ], 40, _hoisted_5)
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("nav", _hoisted_9, [
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
            createBaseVNode("div", _hoisted_10, [
              createVNode(unref(LanguageSwitcher)),
              createVNode(unref(ThemeToggle)),
              createBaseVNode("button", {
                onClick: toggleMobileMenu,
                class: "inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95",
                "aria-expanded": isMobileMenuOpen.value,
                "aria-label": "Toggle navigation menu"
              }, [
                !isMobileMenuOpen.value ? (openBlock(), createElementBlock("svg", _hoisted_12, _cache[0] || (_cache[0] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 6h16M4 12h16M4 18h16"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_13, _cache[1] || (_cache[1] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  }, null, -1)
                ])))
              ], 8, _hoisted_11)
            ])
          ]),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 ease-out transform", isMobileMenuOpen.value ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"])
          }, [
            createBaseVNode("nav", _hoisted_14, [
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
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fbd4d26c"]]);
export {
  AppHeader as default
};
//# sourceMappingURL=AppHeader-D57wugcA.js.map
