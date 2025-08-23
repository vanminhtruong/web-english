const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ThemeToggle-CchOGgPe.js","assets/index-JwMkyzcu.js","assets/vendor-CKTvmtu5.js","assets/vendor-toast-Blf0QbeM.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DUQRsKJD.css","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/ThemeToggle-DSsMUYxu.css","assets/LanguageSwitcher-CSnDA6-U.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-JwMkyzcu.js";
import { d as defineComponent, M as useI18n, N as useRoute, O as useRouter, z as ref, A as onMounted, B as onUnmounted, P as watch, D as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, E as withDirectives, u as unref, Q as withKeys, i as withModifiers, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass, t as toDisplayString, y as createVNode, w as withCtx, g as createTextVNode, S as RouterLink, G as defineAsyncComponent, H as vShow } from "./vendor-CKTvmtu5.js";
import { l as loadComponentSafely } from "./import-helper-C3cN_M-4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-toast-Blf0QbeM.js";
const _imports_0 = "/web-english/assets/logo-BhsFdO8Y.svg";
const _hoisted_1 = { class: "w-full px-4 sm:px-6 lg:px-8 overflow-visible" };
const _hoisted_2 = { class: "flex items-center justify-between h-16 overflow-visible" };
const _hoisted_3 = { class: "flex items-center space-x-2 sm:space-x-4" };
const _hoisted_4 = ["title"];
const _hoisted_5 = ["title", "onKeydown"];
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = ["aria-label"];
const _hoisted_8 = { class: "hidden xl:flex items-center space-x-4 overflow-visible" };
const _hoisted_9 = { class: "flex space-x-1 relative overflow-visible" };
const _hoisted_10 = { class: "relative group overflow-visible" };
const _hoisted_11 = { class: "absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0 z-[9999] pointer-events-none group-hover:pointer-events-auto pt-1" };
const _hoisted_12 = { class: "bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-dark-bg-mute rounded-lg shadow-lg dark:shadow-black/20 py-2" };
const _hoisted_13 = { class: "flex items-center space-x-2" };
const _hoisted_14 = { class: "flex items-center space-x-2" };
const _hoisted_15 = { class: "flex items-center space-x-2" };
const _hoisted_16 = { class: "flex items-center space-x-2" };
const _hoisted_17 = { class: "xl:hidden flex items-center space-x-2" };
const _hoisted_18 = ["aria-expanded"];
const _hoisted_19 = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_20 = {
  key: 1,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_21 = { class: "px-2 pt-2 pb-3 space-y-1" };
const _hoisted_22 = { class: "space-y-1" };
const _hoisted_23 = ["aria-expanded", "onKeydown"];
const _hoisted_24 = { class: "ml-4 space-y-1" };
const _hoisted_25 = { class: "flex items-center space-x-2" };
const _hoisted_26 = { class: "flex items-center space-x-2" };
const _hoisted_27 = { class: "flex items-center space-x-2" };
const _hoisted_28 = { class: "flex items-center space-x-2" };
const _hoisted_29 = { class: "absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20 dark:bg-white/10" };
const appearStepMs = 120;
const hideStepMs = 80;
const cyclePauseMs = 1200;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  setup(__props) {
    const ThemeToggle = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./ThemeToggle-CchOGgPe.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0))
    );
    const LanguageSwitcher = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./LanguageSwitcher-CSnDA6-U.js"), true ? __vite__mapDeps([8,1,2,3,4,5]) : void 0))
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
    const scrollProgressPercentage = ref(0);
    let hasAnimated = false;
    let lastScrollY = 0;
    const enhancedScroll = () => {
      const scrollY = window.scrollY;
      const header = document.querySelector("header");
      if (!header) return;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressPercentage.value = documentHeight > 0 ? Math.min(scrollY / documentHeight * 100, 100) : 0;
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
    const isMobileVocabOpen = ref(false);
    const toggleMobileVocabSubmenu = () => {
      isMobileVocabOpen.value = !isMobileVocabOpen.value;
    };
    watch(isMobileMenuOpen, (open) => {
      if (open) {
        isMobileVocabOpen.value = false;
      }
    });
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
          overflow: "visible"
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
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none",
                    unref(route).path === "/dashboard" ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
                  ])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.dashboard", "Dashboard")), 1)
                  ]),
                  _: 1
                }, 8, ["class"]),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", {
                    class: normalizeClass([
                      "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none flex items-center space-x-1 select-none cursor-default",
                      unref(route).path.startsWith("/vocabulary") ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
                    ]),
                    "aria-haspopup": "true",
                    "aria-expanded": "false"
                  }, [
                    createBaseVNode("span", null, toDisplayString(unref(t)("common.vocabulary", "Vocabulary")), 1),
                    _cache[0] || (_cache[0] = createBaseVNode("svg", {
                      class: "w-4 h-4 transition-transform duration-200 group-hover:rotate-180",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 2),
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(unref(RouterLink), {
                        to: "/vocabulary",
                        class: normalizeClass([
                          "block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150",
                          unref(route).path === "/vocabulary" ? "bg-gray-100 dark:bg-gray-custom text-black dark:text-white font-medium" : ""
                        ])
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_13, [
                            _cache[1] || (_cache[1] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageWords", "Manage Words")), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      createVNode(unref(RouterLink), {
                        to: "/vocabulary/questions",
                        class: normalizeClass([
                          "block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150",
                          unref(route).path === "/vocabulary/questions" ? "bg-gray-100 dark:bg-gray-custom text-black dark:text-white font-medium" : ""
                        ])
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_14, [
                            _cache[2] || (_cache[2] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageQuestions", "Manage Questions")), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      createVNode(unref(RouterLink), {
                        to: "/vocabulary/examples",
                        class: normalizeClass([
                          "block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150",
                          unref(route).path === "/vocabulary/examples" ? "bg-gray-100 dark:bg-gray-custom text-black dark:text-white font-medium" : ""
                        ])
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_15, [
                            _cache[3] || (_cache[3] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageExamples", "Manage Examples")), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["class"]),
                      _cache[5] || (_cache[5] = createBaseVNode("div", { class: "border-t border-gray-200 dark:border-dark-bg-mute my-1" }, null, -1)),
                      createVNode(unref(RouterLink), {
                        to: "/vocabulary/generator",
                        class: normalizeClass([
                          "block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150",
                          unref(route).path === "/vocabulary/generator" ? "bg-gray-100 dark:bg-gray-custom text-black dark:text-white font-medium" : ""
                        ])
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_16, [
                            _cache[4] || (_cache[4] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.autoGenerator", "Auto Generator")), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ])
                  ])
                ]),
                createVNode(unref(RouterLink), {
                  to: "/grammar",
                  class: normalizeClass([
                    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none",
                    unref(route).path === "/grammar" ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
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
                    unref(route).path === "/practice/flashcard" ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
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
            createBaseVNode("div", _hoisted_17, [
              createVNode(unref(LanguageSwitcher)),
              createVNode(unref(ThemeToggle)),
              createBaseVNode("button", {
                onClick: toggleMobileMenu,
                class: "inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95",
                "aria-expanded": isMobileMenuOpen.value,
                "aria-label": "Toggle navigation menu"
              }, [
                !isMobileMenuOpen.value ? (openBlock(), createElementBlock("svg", _hoisted_19, _cache[6] || (_cache[6] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 6h16M4 12h16M4 18h16"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_20, _cache[7] || (_cache[7] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M6 18L18 6M6 6l12 12"
                  }, null, -1)
                ])))
              ], 8, _hoisted_18)
            ])
          ]),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(["xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 ease-out transform", isMobileMenuOpen.value ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"])
          }, [
            createBaseVNode("nav", _hoisted_21, [
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
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("div", {
                  class: normalizeClass([
                    "px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none select-none flex items-center justify-between",
                    unref(route).path.startsWith("/vocabulary") ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
                  ]),
                  "aria-haspopup": "true",
                  "aria-expanded": isMobileVocabOpen.value,
                  role: "button",
                  tabindex: "0",
                  onClick: toggleMobileVocabSubmenu,
                  onKeydown: [
                    withKeys(withModifiers(toggleMobileVocabSubmenu, ["prevent"]), ["enter"]),
                    withKeys(withModifiers(toggleMobileVocabSubmenu, ["prevent"]), ["space"])
                  ]
                }, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("common.vocabulary", "Vocabulary")), 1),
                  (openBlock(), createElementBlock("svg", {
                    class: normalizeClass(["w-4 h-4 ml-2 transform transition-transform duration-200", isMobileVocabOpen.value ? "rotate-180" : "rotate-0"]),
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, _cache[8] || (_cache[8] = [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    }, null, -1)
                  ]), 2))
                ], 42, _hoisted_23),
                withDirectives(createBaseVNode("div", _hoisted_24, [
                  createVNode(unref(RouterLink), {
                    to: "/vocabulary",
                    onClick: closeMobileMenu,
                    class: "block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_25, [
                        _cache[9] || (_cache[9] = createBaseVNode("svg", {
                          class: "w-3 h-3",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                        ], -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageWords", "Manage Words")), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(RouterLink), {
                    to: "/vocabulary/questions",
                    onClick: closeMobileMenu,
                    class: "block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_26, [
                        _cache[10] || (_cache[10] = createBaseVNode("svg", {
                          class: "w-3 h-3",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageQuestions", "Manage Questions")), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(RouterLink), {
                    to: "/vocabulary/examples",
                    onClick: closeMobileMenu,
                    class: "block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_27, [
                        _cache[11] || (_cache[11] = createBaseVNode("svg", {
                          class: "w-3 h-3",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.manageExamples", "Manage Examples")), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(RouterLink), {
                    to: "/vocabulary/generator",
                    onClick: closeMobileMenu,
                    class: "block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_28, [
                        _cache[12] || (_cache[12] = createBaseVNode("svg", {
                          class: "w-3 h-3",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.submenu.autoGenerator", "Auto Generator")), 1)
                      ])
                    ]),
                    _: 1
                  })
                ], 512), [
                  [vShow, isMobileVocabOpen.value]
                ])
              ]),
              createVNode(unref(RouterLink), {
                to: "/grammar",
                onClick: closeMobileMenu,
                class: normalizeClass([
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none",
                  unref(route).path === "/grammar" ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
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
                  "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none",
                  unref(route).path === "/practice/flashcard" ? "bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold" : ""
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
        ]),
        createBaseVNode("div", _hoisted_29, [
          createBaseVNode("div", {
            class: "h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 transition-all duration-150 ease-out",
            style: normalizeStyle({ width: `${scrollProgressPercentage.value}%` })
          }, null, 4)
        ])
      ], 6);
    };
  }
});
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d44f8080"]]);
export {
  AppHeader as default
};
//# sourceMappingURL=AppHeader-CwFBhjd6.js.map
