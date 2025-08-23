import { d as defineComponent, M as useI18n, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, n as normalizeClass, u as unref, a as normalizeStyle } from "./vendor-CKTvmtu5.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-dark-bg-mute" };
const _hoisted_2 = { class: "h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center" };
const _hoisted_3 = { class: "text-center text-white" };
const _hoisted_4 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_5 = { class: "p-6" };
const _hoisted_6 = { class: "flex items-center justify-between mb-3" };
const _hoisted_7 = { class: "text-sm text-gray-500 dark:text-white/70" };
const _hoisted_8 = { class: "text-gray-600 dark:text-white/80 text-sm mb-4 line-clamp-3" };
const _hoisted_9 = { class: "flex items-center justify-between mb-4" };
const _hoisted_10 = { class: "text-xs text-gray-500 dark:text-white/60" };
const _hoisted_11 = { class: "flex items-center" };
const _hoisted_12 = { class: "text-sm text-gray-600 dark:text-white/80" };
const _hoisted_13 = { class: "mb-4" };
const _hoisted_14 = { class: "flex justify-between text-sm text-gray-600 dark:text-white/80 mb-1" };
const _hoisted_15 = { class: "w-full bg-gray-200 dark:bg-dark-bg-mute rounded-full h-2" };
const _hoisted_16 = { class: "flex space-x-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarCard",
  props: {
    lesson: {}
  },
  emits: ["view-lesson", "practice-lesson", "edit-lesson", "delete-lesson"],
  setup(__props) {
    const { t } = useI18n();
    const getLevelColor = (level) => {
      switch (level) {
        case "beginner":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "intermediate":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "advanced":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-dark-bg-mute dark:text-white/80";
      }
    };
    const getLevelText = (level) => {
      const fallbackMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      };
      return t(`grammar.levels.${level}`, fallbackMap[level] || "Level");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[4] || (_cache[4] = createBaseVNode("svg", {
              class: "w-16 h-16 mx-auto mb-2",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", { d: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" })
            ], -1)),
            createBaseVNode("h3", _hoisted_4, toDisplayString(_ctx.lesson.title), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("span", {
              class: normalizeClass([getLevelColor(_ctx.lesson.level), "px-2 py-1 text-xs font-medium rounded-full"])
            }, toDisplayString(getLevelText(_ctx.lesson.level)), 3),
            createBaseVNode("span", _hoisted_7, toDisplayString(_ctx.lesson.duration) + " " + toDisplayString(unref(t)("grammar.duration", "mins")), 1)
          ]),
          createBaseVNode("p", _hoisted_8, toDisplayString(_ctx.lesson.description), 1),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("span", _hoisted_10, toDisplayString(_ctx.lesson.category), 1),
            createBaseVNode("div", _hoisted_11, [
              _cache[5] || (_cache[5] = createBaseVNode("svg", {
                class: "w-4 h-4 text-yellow-400 mr-1",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
              ], -1)),
              createBaseVNode("span", _hoisted_12, toDisplayString(_ctx.lesson.rating), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("span", null, toDisplayString(unref(t)("grammar.progress", "Progress")), 1),
              createBaseVNode("span", null, toDisplayString(_ctx.lesson.progress) + "%", 1)
            ]),
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", {
                class: "bg-blue-500 h-2 rounded-full transition-all duration-300",
                style: normalizeStyle({ width: _ctx.lesson.progress + "%" })
              }, null, 4)
            ])
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("view-lesson", _ctx.lesson)),
              class: "flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
            }, toDisplayString(_ctx.lesson.progress > 0 ? unref(t)("grammar.continue", "Continue") : unref(t)("grammar.start", "Start")), 1),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("practice-lesson", _ctx.lesson)),
              class: "bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
            }, _cache[6] || (_cache[6] = [
              createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("edit-lesson", _ctx.lesson)),
              class: "text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white p-2"
            }, _cache[7] || (_cache[7] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
              ], -1)
            ])),
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("delete-lesson", _ctx.lesson)),
              class: "text-red-500 hover:text-red-700 p-2"
            }, _cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z",
                  "clip-rule": "evenodd"
                }),
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ]))
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=GrammarCard-BMfrA6HG.js.map
