const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LazyLoadComponent-DUQ86Zk1.js","assets/vendor-CKTvmtu5.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/LazyLoadComponent-DWULbbXY.css","assets/GrammarHeader-AW5Vjfwy.js","assets/GrammarFilters-pzYKF5Tv.js","assets/GrammarCard-BMfrA6HG.js","assets/GrammarEmptyState-BBqzEc_8.js","assets/GrammarFormDialog-ClkI0FPU.js","assets/useGrammarStore-lzlTpdTs.js","assets/GrammarFormDialog-ebJCDif4.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-JwMkyzcu.js";
import { d as defineComponent, O as useRouter, M as useI18n, z as ref, D as computed, A as onMounted, c as createElementBlock, v as openBlock, V as createStaticVNode, y as createVNode, f as createBaseVNode, w as withCtx, u as unref, G as defineAsyncComponent, b as createBlock, F as Fragment, j as renderList } from "./vendor-CKTvmtu5.js";
import { l as loadComponentSafely } from "./import-helper-C3cN_M-4.js";
import { u as useGrammarStore } from "./useGrammarStore-lzlTpdTs.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2 = { class: "relative z-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" };
const _hoisted_3 = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrammarListView",
  setup(__props) {
    const LazyLoadComponent = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-DUQ86Zk1.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
    const GrammarHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarHeader-AW5Vjfwy.js"), true ? __vite__mapDeps([4,1]) : void 0))
    );
    const GrammarFilters = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarFilters-pzYKF5Tv.js"), true ? __vite__mapDeps([5,1]) : void 0))
    );
    const GrammarCard = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarCard-BMfrA6HG.js"), true ? __vite__mapDeps([6,1]) : void 0))
    );
    const GrammarEmptyState = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarEmptyState-BBqzEc_8.js"), true ? __vite__mapDeps([7,1]) : void 0))
    );
    const GrammarFormDialog = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarFormDialog-ClkI0FPU.js"), true ? __vite__mapDeps([8,1,9,2,10]) : void 0))
    );
    const router = useRouter();
    const { t } = useI18n();
    const grammarStore = useGrammarStore();
    const showFormDialog = ref(false);
    const currentEditId = ref("");
    const searchQuery = ref("");
    const selectedLevel = ref("");
    const selectedCategory = ref("");
    const categories = ref([
      "Tenses",
      "Conditionals",
      "Passive Voice",
      "Modal Verbs",
      "Reported Speech",
      "Articles",
      "Prepositions",
      "Adjectives & Adverbs",
      "Phrasal Verbs",
      "Gerunds & Infinitives"
    ]);
    const filteredLessons = computed(() => {
      return grammarStore.allLessons.value.filter((lesson) => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLevel = !selectedLevel.value || lesson.level === selectedLevel.value;
        const matchesCategory = !selectedCategory.value || lesson.category === selectedCategory.value;
        return matchesSearch && matchesLevel && matchesCategory;
      });
    });
    const openAddDialog = () => {
      currentEditId.value = "";
      showFormDialog.value = true;
    };
    const openEditDialog = (lesson) => {
      currentEditId.value = lesson.id;
      showFormDialog.value = true;
    };
    const onLessonSaved = (lesson) => {
      console.log("Lesson saved:", lesson);
    };
    const viewLesson = (lesson) => {
      router.push(`/grammar/${lesson.id}`);
    };
    const practiceLesson = (lesson) => {
      router.push(`/grammar/${lesson.id}/practice`);
    };
    const deleteLesson = (lesson) => {
      if (confirm(t("grammar.confirmDelete", { title: lesson.title }) || `Delete lesson "${lesson.title}"?`)) {
        grammarStore.deleteLesson(lesson.id);
      }
    };
    onMounted(() => {
      console.log("Grammar list mounted");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[4] || (_cache[4] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0" data-v-41de1874><div class="floating-shapes" data-v-41de1874><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-41de1874></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-41de1874></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-41de1874></div></div></div>', 1)),
        createVNode(unref(LazyLoadComponent), { "animation-type": "fade-up" }, {
          default: withCtx(() => [
            createVNode(unref(GrammarHeader), { onAddLesson: openAddDialog })
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2, [
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "slide-left",
            threshold: 0.2,
            "root-margin": "100px"
          }, {
            default: withCtx(() => [
              createVNode(unref(GrammarFilters), {
                searchQuery: searchQuery.value,
                selectedLevel: selectedLevel.value,
                selectedCategory: selectedCategory.value,
                categories: categories.value,
                "onUpdate:searchQuery": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                "onUpdate:selectedLevel": _cache[1] || (_cache[1] = ($event) => selectedLevel.value = $event),
                "onUpdate:selectedCategory": _cache[2] || (_cache[2] = ($event) => selectedCategory.value = $event)
              }, null, 8, ["searchQuery", "selectedLevel", "selectedCategory", "categories"])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent), {
            "animation-type": "scale",
            threshold: 0.2,
            "root-margin": "150px"
          }, {
            default: withCtx(() => [
              filteredLessons.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLessons.value, (lesson) => {
                  return openBlock(), createBlock(unref(GrammarCard), {
                    key: lesson.id,
                    lesson,
                    onViewLesson: viewLesson,
                    onPracticeLesson: practiceLesson,
                    onEditLesson: openEditDialog,
                    onDeleteLesson: deleteLesson
                  }, null, 8, ["lesson"]);
                }), 128))
              ])) : (openBlock(), createBlock(unref(GrammarEmptyState), {
                key: 1,
                onAddLesson: openAddDialog
              }))
            ]),
            _: 1
          })
        ]),
        createVNode(unref(GrammarFormDialog), {
          modelValue: showFormDialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showFormDialog.value = $event),
          "edit-id": currentEditId.value,
          onSaved: onLessonSaved
        }, null, 8, ["modelValue", "edit-id"])
      ]);
    };
  }
});
const GrammarListView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41de1874"]]);
export {
  GrammarListView as default
};
//# sourceMappingURL=GrammarListView-hccmLHII.js.map
