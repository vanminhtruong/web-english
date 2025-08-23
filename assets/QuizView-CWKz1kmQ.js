const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QuizHeader-C5tsa-LY.js","assets/vendor-CKTvmtu5.js","assets/QuizProgress-DpXWhvHC.js","assets/QuizSetup-ztHBMBA0.js","assets/QuizQuestion-aOh8t_OR.js","assets/QuizResults-hxvUl26T.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-NgYuwt7j.js";
import { d as defineComponent, O as useRouter, z as ref, D as computed, A as onMounted, P as watch, B as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, f as createBaseVNode, u as unref, G as defineAsyncComponent, b as createBlock } from "./vendor-CKTvmtu5.js";
import { l as loadComponentSafely } from "./import-helper-C3cN_M-4.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-[#0a0a0a]" };
const _hoisted_2 = { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuizView",
  setup(__props) {
    const QuizHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizHeader-C5tsa-LY.js"), true ? __vite__mapDeps([0,1]) : void 0))
    );
    const QuizProgress = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizProgress-DpXWhvHC.js"), true ? __vite__mapDeps([2,1]) : void 0))
    );
    const QuizSetup = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizSetup-ztHBMBA0.js"), true ? __vite__mapDeps([3,1]) : void 0))
    );
    const QuizQuestion = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizQuestion-aOh8t_OR.js"), true ? __vite__mapDeps([4,1]) : void 0))
    );
    const QuizResults = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizResults-hxvUl26T.js"), true ? __vite__mapDeps([5,1]) : void 0))
    );
    const router = useRouter();
    const vocabularyStore = useVocabularyStore();
    const quizStarted = ref(false);
    const quizCompleted = ref(false);
    const currentQuestionIndex = ref(0);
    const selectedAnswer = ref(null);
    const userAnswers = ref([]);
    const score = ref(0);
    const timeRemaining = ref(0);
    let timer = null;
    const quizSettings = ref({
      type: "vocabulary",
      level: "",
      questionCount: "10",
      timeLimit: "10"
    });
    const questions = ref([]);
    const generateQuestionsFromVocabulary = (vocabularies) => {
      console.log("Generating questions from", vocabularies.length, "vocabularies");
      if (vocabularies.length === 0) return [];
      const vocabQuestions = vocabularies.map((vocab, index) => {
        const otherVocabs = vocabularies.filter((v) => v.id !== vocab.id);
        let incorrectOptions = [];
        if (otherVocabs.length > 0) {
          incorrectOptions = otherVocabs.slice(0, 3).map((v) => v.meaning.split(" - ")[0]);
        }
        const genericOptions = ["Không có nghĩa", "Từ khác", "Khái niệm khác", "Nghĩa khác", "Ý nghĩa khác"];
        while (incorrectOptions.length < 3) {
          const randomGeneric = genericOptions[Math.floor(Math.random() * genericOptions.length)];
          if (!incorrectOptions.includes(randomGeneric)) {
            incorrectOptions.push(randomGeneric);
          }
        }
        const correctMeaning = vocab.meaning.split(" - ")[0];
        const allOptions = [correctMeaning, ...incorrectOptions.slice(0, 3)];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        const correctAnswer = shuffledOptions.indexOf(correctMeaning);
        return {
          id: vocab.id,
          type: "vocabulary",
          level: vocab.level,
          question: `What does "${vocab.word}" mean?`,
          options: shuffledOptions,
          correctAnswer,
          explanation: `"${vocab.word}" có nghĩa là: ${vocab.meaning}`
        };
      });
      return vocabQuestions.sort(() => Math.random() - 0.5);
    };
    const updateQuestions = () => {
      const vocabularies = vocabularyStore.allVocabularies.value;
      console.log("Updating questions from", vocabularies.length, "total vocabularies");
      const filteredVocabs = vocabularies.filter((vocab) => {
        if (quizSettings.value.level && vocab.level !== quizSettings.value.level) {
          return false;
        }
        return true;
      });
      console.log("Filtered to", filteredVocabs.length, "vocabularies for quiz");
      const generatedQuestions = generateQuestionsFromVocabulary(filteredVocabs);
      const questionCount = parseInt(quizSettings.value.questionCount);
      questions.value = generatedQuestions.slice(0, questionCount);
      console.log("Generated", questions.value.length, "questions");
    };
    const availableLevels = computed(() => {
      return vocabularyStore.getLevels.value;
    });
    const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {});
    const progressPercentage = computed(() => (currentQuestionIndex.value + 1) / questions.value.length * 100);
    const correctAnswers = computed(() => {
      return userAnswers.value.filter((answer, index) => answer === questions.value[index].correctAnswer).length;
    });
    const accuracy = computed(() => correctAnswers.value / questions.value.length * 100);
    const startQuiz = (settings) => {
      if (settings) {
        quizSettings.value = { ...settings };
      }
      if (questions.value.length === 0) {
        updateQuestions();
      }
      if (questions.value.length === 0) {
        alert("Không có từ vựng nào để luyện tập. Vui lòng thêm từ vựng trước!");
        return;
      }
      quizStarted.value = true;
      if (quizSettings.value.timeLimit !== "0") {
        timeRemaining.value = parseInt(quizSettings.value.timeLimit) * 60;
        startTimer();
      }
      userAnswers.value = new Array(questions.value.length).fill(-1);
    };
    const startTimer = () => {
      timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
          completeQuiz();
        }
      }, 1e3);
    };
    const selectAnswer = (index) => {
      selectedAnswer.value = index;
    };
    const nextQuestion = () => {
      if (selectedAnswer.value !== null) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
        if (currentQuestionIndex.value === questions.value.length - 1) {
          completeQuiz();
        } else {
          currentQuestionIndex.value++;
          selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 ? userAnswers.value[currentQuestionIndex.value] : null;
        }
      }
    };
    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value || -1;
        currentQuestionIndex.value--;
        selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 ? userAnswers.value[currentQuestionIndex.value] : null;
      }
    };
    const completeQuiz = () => {
      if (selectedAnswer.value !== null) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
      }
      score.value = correctAnswers.value * 10;
      quizCompleted.value = true;
      if (timer) {
        clearInterval(timer);
      }
    };
    const restartQuiz = () => {
      quizStarted.value = false;
      quizCompleted.value = false;
      currentQuestionIndex.value = 0;
      selectedAnswer.value = null;
      userAnswers.value = [];
      score.value = 0;
      timeRemaining.value = 0;
      updateQuestions();
      if (timer) {
        clearInterval(timer);
      }
    };
    const goBack = () => {
      router.back();
    };
    onMounted(async () => {
      const isReady = vocabularyStore.initializeStore();
      if (!isReady.value) {
        await new Promise(
          (resolve) => watch(isReady, (ready) => {
            if (ready) resolve(true);
          }, { immediate: true })
        );
      }
      updateQuestions();
      console.log("Quiz view mounted", vocabularyStore.allVocabularies.value.length, "vocabularies loaded");
    });
    watch(
      () => vocabularyStore.isStoreReady.value,
      (isReady) => {
        if (isReady) {
          updateQuestions();
        }
      },
      { immediate: true }
    );
    watch(
      () => vocabularyStore.allVocabularies.value,
      () => {
        if (vocabularyStore.isStoreReady.value) {
          updateQuestions();
        }
      },
      { deep: true }
    );
    watch(
      () => quizSettings.value,
      () => {
        updateQuestions();
      },
      { deep: true }
    );
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(unref(QuizHeader), {
          "time-remaining": timeRemaining.value,
          score: score.value,
          onGoBack: goBack
        }, null, 8, ["time-remaining", "score"]),
        createVNode(unref(QuizProgress), {
          "current-question-index": currentQuestionIndex.value,
          "total-questions": questions.value.length,
          "progress-percentage": progressPercentage.value
        }, null, 8, ["current-question-index", "total-questions", "progress-percentage"]),
        createBaseVNode("div", _hoisted_2, [
          !quizStarted.value ? (openBlock(), createBlock(unref(QuizSetup), {
            key: 0,
            settings: quizSettings.value,
            "available-levels": availableLevels.value,
            onStartQuiz: startQuiz
          }, null, 8, ["settings", "available-levels"])) : !quizCompleted.value ? (openBlock(), createBlock(unref(QuizQuestion), {
            key: 1,
            question: currentQuestion.value,
            "selected-answer": selectedAnswer.value,
            "is-first-question": currentQuestionIndex.value === 0,
            "is-last-question": currentQuestionIndex.value === questions.value.length - 1,
            onSelectAnswer: selectAnswer,
            onPreviousQuestion: previousQuestion,
            onNextQuestion: nextQuestion
          }, null, 8, ["question", "selected-answer", "is-first-question", "is-last-question"])) : (openBlock(), createBlock(unref(QuizResults), {
            key: 2,
            score: score.value,
            "correct-answers": correctAnswers.value,
            "total-questions": questions.value.length,
            accuracy: Math.round(accuracy.value),
            questions: questions.value,
            "user-answers": userAnswers.value,
            onRestartQuiz: restartQuiz,
            onGoBack: goBack
          }, null, 8, ["score", "correct-answers", "total-questions", "accuracy", "questions", "user-answers"]))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=QuizView-CWKz1kmQ.js.map
