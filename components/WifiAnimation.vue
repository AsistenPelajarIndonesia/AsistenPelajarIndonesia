<template>
  <div class="quiz-container p-4">
    <h1 class="text-2xl font-bold mb-6">Quiz App</h1>
    <TransitionGroup name="fade" mode="out-in">
      <Card v-if="currentQuestion && !quizCompleted" key="quiz">
        <CardTitle class="mb-4"
          >Question {{ currentQuestionIndex + 1 }} of
          {{ questions.length }}</CardTitle
        >
        <CardDescription class="text-lg mb-6">{{ currentQuestion.pertanyaan }}</CardDescription>

        <div class="flex flex-col space-y-4">
          <TransitionGroup name="list" tag="div" class="space-y-4">
            <Button
              v-for="(option, index) in currentQuestion.pilihan"
              :key="index"
              :variant="getButtonVariant(option)"
              class="justify-start text-left w-full transition-all duration-200 ease-in-out transform hover:scale-102"
              @click="selectAnswer(option)"
              :disabled="selectedAnswer !== null"
            >
              {{ option }}
            </Button>
          </TransitionGroup>

          <Transition name="fade">
            <div v-if="selectedAnswer" class="mt-4 space-y-4">
              <Alert :variant="isCorrect ? 'default' : 'destructive'" class="transition-all duration-300">
                <AlertTitle>{{ isCorrect ? "Correct!" : "Incorrect!" }}</AlertTitle>
                <AlertDescription>
                  {{
                    isCorrect
                      ? "Great job! You got it right."
                      : `The correct answer was: ${currentQuestion.pilihan.find((p) => p.startsWith(currentQuestion.jawaban))}`
                  }}
                </AlertDescription>
              </Alert>

              <Button
                class="w-full mt-4 transition-all duration-200 hover:scale-102"
                @click="currentQuestionIndex === questions.length - 1 ? finishQuiz() : nextQuestion()"
              >
                {{
                  currentQuestionIndex === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"
                }}
              </Button>
            </div>
          </Transition>
        </div>
      </Card>

      <Card v-if="quizCompleted" key="completion" class="completion-card">
        <CardTitle class="text-2xl font-bold text-center mb-6">Quiz Completed! 🎉</CardTitle>
        <div class="space-y-6">
          <div class="text-center">
            <span class="text-4xl font-bold text-primary">{{ correctAnswers }}</span>
            <span class="text-2xl"> / {{ questions.length }}</span>
            <p class="text-muted-foreground mt-2">Correct Answers</p>
          </div>

          <Progress :value="(correctAnswers / questions.length) * 100" class="w-full h-4" />

          <Alert class="bg-muted">
            <AlertTitle>Performance Summary</AlertTitle>
            <AlertDescription>
              <p class="mb-2">Score: {{ Math.round((correctAnswers / questions.length) * 100) }}%</p>
              <p>{{ getPerformanceMessage() }}</p>
            </AlertDescription>
          </Alert>

          <Button class="w-full transition-all duration-200 hover:scale-102" @click="restartQuiz">
            Try Again
          </Button>
        </div>
      </Card>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Progress } from '@/components/ui/progress';

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const correctAnswers = ref(0);
const quizCompleted = ref(false);

const questions = ref([
  {
    pertanyaan: "Apa yang dimaksud dengan integritas?",
    pilihan: [
      "A. Kemampuan untuk melakukan tindakan yang benar",
      "B. Konsistensi dan keteguhan dalam menjunjung tinggi nilai-nilai moral dan etika",
      "C. Kemampuan untuk memimpin orang lain",
      "D. Kemampuan untuk mengambil keputusan yang cepat",
    ],
    jawaban: "B",
    label: ["Integritas", "Etika", "Moral"],
  },
  {
    pertanyaan: "Mengapa integritas penting dalam CPNS?",
    pilihan: [
      "A. Karena integritas dapat meningkatkan gaji",
      "B. Karena integritas dapat membangun kepercayaan publik dan mencegah korupsi",
      "C. Karena integritas dapat membuat pekerjaan lebih mudah",
      "D. Karena integritas dapat membuat orang lain takut",
    ],
    jawaban: "B",
    label: ["Integritas", "CPNS", "Kepercayaan Publik"],
  },
  {
    pertanyaan: "Apa ciri-ciri orang yang berintegritas?",
    pilihan: [
      "A. Jujur, konsisten, dan bertanggung jawab",
      "B. Pembohong, tidak konsisten, dan tidak bertanggung jawab",
      "C. Sombong, egois, dan tidak peduli",
      "D. Lemah, takut, dan tidak berani",
    ],
    jawaban: "A",
    label: ["Integritas", "Ciri-ciri", "Orang Berintegritas"],
  },
]);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

const isCorrect = computed(() => {
  if (!selectedAnswer.value) return false;
  return selectedAnswer.value.startsWith(currentQuestion.value.jawaban);
});

function getButtonVariant(option) {
  if (!selectedAnswer.value) return "outline";
  if (option.startsWith(currentQuestion.value.jawaban)) return "default";
  if (option === selectedAnswer.value) return "destructive";
  return "outline";
}

function selectAnswer(answer) {
  selectedAnswer.value = answer;
  if (isCorrect.value) {
    correctAnswers.value++;
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    setTimeout(() => {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
    }, 500);
  }
}

function finishQuiz() {
  setTimeout(() => {
    quizCompleted.value = true;
  }, 500);
}

function getPerformanceMessage() {
  const score = (correctAnswers.value / questions.value.length) * 100;
  if (score === 100) return "Perfect score! Outstanding performance!";
  if (score >= 80) return "Excellent work! Keep it up!";
  if (score >= 60) return "Good effort! Room for improvement.";
  return "Keep practicing to improve your score.";
}

function restartQuiz() {
  quizCompleted.value = false;
  setTimeout(() => {
    currentQuestionIndex.value = 0;
    selectedAnswer.value = null;
    correctAnswers.value = 0;
  }, 300);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.completion-card {
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
