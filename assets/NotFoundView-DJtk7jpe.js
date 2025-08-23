import { d as defineComponent, O as useRouter, l as resolveComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, V as createStaticVNode, g as createTextVNode, y as createVNode, w as withCtx } from "./vendor-CKTvmtu5.js";
const _hoisted_1 = { class: "min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8" };
const _hoisted_2 = { class: "sm:mx-auto sm:w-full sm:max-w-md" };
const _hoisted_3 = { class: "text-center" };
const _hoisted_4 = { class: "mt-8 space-y-4" };
const _hoisted_5 = { class: "text-center" };
const _hoisted_6 = { class: "mt-4 flex justify-center space-x-6" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFoundView",
  setup(__props) {
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    const goHome = () => {
      router.push("/dashboard");
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[7] || (_cache[7] = createStaticVNode('<div class="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900"><svg class="h-12 w-12 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h1 class="mt-6 text-6xl font-bold text-gray-900 dark:text-white">404</h1><h2 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Không tìm thấy trang</h2><p class="mt-2 text-lg text-gray-600 dark:text-gray-300"> Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. </p>', 4)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", { class: "flex justify-center space-x-4" }, [
                createBaseVNode("button", {
                  onClick: goBack,
                  class: "bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, _cache[0] || (_cache[0] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ], -1),
                  createTextVNode(" Quay lại ")
                ])),
                createBaseVNode("button", {
                  onClick: goHome,
                  class: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, _cache[1] || (_cache[1] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })
                  ], -1),
                  createTextVNode(" Về trang chủ ")
                ]))
              ]),
              createBaseVNode("div", _hoisted_5, [
                _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Hoặc thử các liên kết hữu ích dưới đây: ", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_component_router_link, {
                    to: "/vocabulary",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(" Từ vựng ")
                    ])),
                    _: 1,
                    __: [2]
                  }),
                  createVNode(_component_router_link, {
                    to: "/grammar",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[3] || (_cache[3] = [
                      createTextVNode(" Ngữ pháp ")
                    ])),
                    _: 1,
                    __: [3]
                  }),
                  createVNode(_component_router_link, {
                    to: "/practice/flashcard",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode(" Luyện tập ")
                    ])),
                    _: 1,
                    __: [4]
                  }),
                  createVNode(_component_router_link, {
                    to: "/test",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Test Tailwind ")
                    ])),
                    _: 1,
                    __: [5]
                  })
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=NotFoundView-DJtk7jpe.js.map
