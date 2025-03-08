<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div class="mb-8 space-y-4">
      <h1 class="text-2xl font-bold">Practice Question Generator</h1>
      <div class="flex gap-4">
        <Input
          v-model="topic"
          placeholder="Enter a topic (e.g., 'World War II', 'Photosynthesis')"
          class="flex-1"
        />
        <Button
          @click="generateQuestions"
          :disabled="isGenerating || !topic.trim()"
        >
          {{ isGenerating ? "Generating..." : "Generate Questions" }}
        </Button>
      </div>
    </div>

    <div v-if="isGenerating" class="flex justify-center items-center py-8">
      <div class="space-y-4 text-center">
        <SpinningBar />
        <p class="text-muted-foreground">Generating practice questions...</p>
      </div>
    </div>

    <TransitionGroup v-else name="fade" mode="out-in">
      <Card v-if="currentQuestion && !quizCompleted" key="quiz">
        <CardTitle class="mb-4"
          >Question {{ currentQuestionIndex + 1 }} of
          {{ questions.length }}</CardTitle
        >
        <CardDescription class="text-lg mb-6">{{
          currentQuestion.pertanyaan
        }}</CardDescription>

        <div class="flex flex-col space-y-4">
          <TransitionGroup name="list" tag="div" class="space-y-4">
            <Button
              v-for="(option, index) in currentQuestion.pilihan"
              :key="index"
              :variant="getButtonVariant(option)"
              class="justify-start text-left w-full transition-all duration-200 ease-in-out transform hover:scale-102 break-words whitespace-normal p-1"
              @click="selectAnswer(option)"
              :disabled="selectedAnswer !== null"
            >
              {{ option }}
            </Button>
          </TransitionGroup>

          <Transition name="fade">
            <div v-if="selectedAnswer" class="mt-4 space-y-4">
              <Alert
                :variant="isCorrect ? 'default' : 'destructive'"
                class="transition-all duration-300"
              >
                <AlertTitle>{{
                  isCorrect ? "Correct!" : "Incorrect!"
                }}</AlertTitle>
                <AlertDescription>
                  {{
                    isCorrect
                      ? "Great job! You got it right."
                      : `The correct answer was: ${currentQuestion.pilihan.find(
                          (p) => p.startsWith(currentQuestion.jawaban)
                        )}`
                  }}
                </AlertDescription>
              </Alert>

              <Button
                class="w-full mt-4 transition-all duration-200 hover:scale-102"
                @click="
                  currentQuestionIndex === questions.length - 1
                    ? finishQuiz()
                    : nextQuestion()
                "
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
        <CardTitle class="text-2xl font-bold text-center mb-6"
          >Quiz Completed! 🎉</CardTitle
        >
        <div class="space-y-6">
          <div class="text-center">
            <span class="text-4xl font-bold text-primary">{{
              correctAnswers
            }}</span>
            <span class="text-2xl"> / {{ questions.length }}</span>
            <p class="text-muted-foreground mt-2">Correct Answers</p>
          </div>

          <Progress
            :model-value="(correctAnswers / questions.length) * 100"
            class="w-full h-4"
          />

          <Alert class="bg-muted">
            <AlertTitle>Performance Summary</AlertTitle>
            <AlertDescription>
              <p class="mb-2">
                Score:
                {{ Math.round((correctAnswers / questions.length) * 100) }}%
              </p>
              <p>{{ getPerformanceMessage() }}</p>
            </AlertDescription>
          </Alert>

          <div class="space-y-4">
            <Button
              class="w-full transition-all duration-200 hover:scale-102"
              @click="restartQuiz"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              class="w-full transition-all duration-200 hover:scale-102"
              @click="generateNewQuestions"
            >
              Generate New Questions
            </Button>
          </div>
        </div>
      </Card>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const topic = ref("");
const isGenerating = ref(false);
const questions = ref([]);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const correctAnswers = ref(0);
const quizCompleted = ref(false);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

const isCorrect = computed(() => {
  if (!selectedAnswer.value) return false;
  return selectedAnswer.value.startsWith(currentQuestion.value.jawaban);
});

async function generateQuestions() {
  if (!topic.value.trim()) return;

  isGenerating.value = true;
  questions.value = [];
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  correctAnswers.value = 0;
  quizCompleted.value = false;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a teacher who will create practice questions and respond in JSON format",
        },
        {
          role: "user",
          content: `
            Create practice questions about: ${topic.value}
            Please follow this JSON format:
            {
              "soal": [
                {
                  "pertanyaan": "Put the question here",
                  "pilihan": [
                    "A. Put option A here",
                    "B. Put option B here",
                    "C. Put option C here",
                    "D. Put option D here"
                  ],
                  "jawaban": "A/B/C/D Just the letter",
                  "label": ["Topic-related label", "Difficulty level", "Subject area"]
                }
                ... and so on
              ]
            }
            Create as many challenging questions as possible and respond only with the JSON!
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_completion_tokens: 32768,
      top_p: 0.95,
      response_format: {
        type: "json_object",
      },
    });

    const response = JSON.parse(
      chatCompletion.choices[0]?.message?.content || ""
    );
    questions.value = response.soal;
  } catch (error) {
    console.error("Error generating questions:", error);
  } finally {
    isGenerating.value = false;
  }
}

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

function generateNewQuestions() {
  topic.value = "";
  questions.value = [];
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  correctAnswers.value = 0;
  quizCompleted.value = false;
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
