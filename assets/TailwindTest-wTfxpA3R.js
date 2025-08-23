import { a as useThemeStore } from "./index-NgYuwt7j.js";
import { d as defineComponent, c as createElementBlock, v as openBlock, f as createBaseVNode, V as createStaticVNode, t as toDisplayString, u as unref } from "./vendor-CKTvmtu5.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "max-w-4xl mx-auto space-y-8" };
const _hoisted_2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_3 = { class: "bg-white dark:bg-black rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700" };
const _hoisted_4 = { class: "p-6" };
const _hoisted_5 = { class: "mt-4" };
const _hoisted_6 = { class: "flex items-center space-x-2" };
const _hoisted_7 = { class: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TailwindTest",
  setup(__props) {
    const themeStore = useThemeStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-center" }, [
          createBaseVNode("h1", { class: "text-4xl font-bold text-gray-900 dark:text-white mb-4" }, " Tailwind CSS & Dark Mode Test "),
          createBaseVNode("p", { class: "text-lg text-gray-600 dark:text-gray-300" }, " Test các component với chế độ sáng/tối ")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          _cache[4] || (_cache[4] = createStaticVNode('<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"><div class="p-6"><div class="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold"> Tailwind CSS </div><h2 class="block mt-1 text-lg leading-tight font-medium text-gray-900 dark:text-white"> Dark Mode Support </h2><p class="mt-2 text-gray-500 dark:text-gray-400"> Tailwind CSS đã được cấu hình với dark mode sử dụng màu đen. </p><div class="mt-4 space-x-2"><button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"> Primary Button </button><button class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"> Secondary Button </button></div></div></div>', 1)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "uppercase tracking-wide text-sm text-green-500 dark:text-green-400 font-semibold" }, " Pinia Store ", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "block mt-1 text-lg leading-tight font-medium text-gray-900 dark:text-white" }, " Theme Management ", -1)),
              _cache[3] || (_cache[3] = createBaseVNode("p", { class: "mt-2 text-gray-500 dark:text-gray-400" }, " Sử dụng Pinia để quản lý state của theme. ", -1)),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-sm text-gray-600 dark:text-gray-300" }, "Current theme:", -1)),
                  createBaseVNode("span", _hoisted_7, toDisplayString(unref(themeStore).currentTheme()), 1)
                ])
              ])
            ])
          ])
        ]),
        _cache[6] || (_cache[6] = createStaticVNode('<div class="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Form Elements</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Text Input </label><input type="text" placeholder="Enter text..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"> Select </label><select class="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div></div></div><div class="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Color Palette</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center"><div class="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Blue</span></div><div class="text-center"><div class="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Green</span></div><div class="text-center"><div class="w-16 h-16 bg-red-500 dark:bg-red-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Red</span></div><div class="text-center"><div class="w-16 h-16 bg-purple-500 dark:bg-purple-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Purple</span></div></div></div>', 2))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=TailwindTest-wTfxpA3R.js.map
