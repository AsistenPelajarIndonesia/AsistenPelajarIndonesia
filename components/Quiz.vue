<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { PropType } from 'vue';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronLeft, ChevronRight, Check, X, RotateCcw } from 'lucide-vue-next';
import { useNuxtApp } from '#app';

// Types (assuming these are defined elsewhere or can be moved here if not)
interface Choice {
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  choices: Choice[];
  explanation: string;
}

interface QuizResult {
  questionId: string;
  selectedLabel: string | null;
  correctLabel: string;
  isCorrect: boolean;
}

const props = defineProps({
  // questions prop is removed as it will be fetched
  totalTime: { // Global time for the entire quiz
    type: Number,
    default: 1800 // Default 30 minutes in seconds
  }
});

const emit = defineEmits(['quizCompleted']);

// Get markdown renderer
const { $md } = useNuxtApp()

// Methods
const renderContent = (content: string): string => {
  return $md(content)
}

const questions = ref<Question[]>([]); // To store fetched questions
const currentQuestionIndex = ref(0);
const userAnswers = ref<Array<string | null>>([]); // Store all user answers
const showResults = ref(false);
const results = ref<QuizResult[]>([]);
const timeLeft = ref(props.totalTime);
let timer: NodeJS.Timeout | null = null;

// Initialize userAnswers array - moved to after questions are fetched

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const selectedAnswer = computed({
  get: () => userAnswers.value[currentQuestionIndex.value],
  set: (value) => {
    userAnswers.value[currentQuestionIndex.value] = value;
  }
});

const progressPercentage = computed(() => {
  if (props.totalTime <= 0) return 0;
  return ((props.totalTime - timeLeft.value) / props.totalTime) * 100;
});

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const selectAnswer = (choiceLabel: string) => {
  if (!showResults.value) { // Allow answer changes as long as results are not shown
    selectedAnswer.value = choiceLabel;
  }
};

const calculateResults = () => {
  results.value = questions.value.map((question, index) => {
    const userAnswer = userAnswers.value[index];
    const correctChoice = question.choices.find(c => c.isCorrect);
    return {
      questionId: question.id,
      selectedLabel: userAnswer,
      correctLabel: correctChoice ? correctChoice.label : '',
      isCorrect: userAnswer !== null && correctChoice ? userAnswer === correctChoice.label : false
    };
  });
};

const finishExam = () => {
  stopTimer();
  calculateResults();
  showResults.value = true;
  emit('quizCompleted', results.value);
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    finishExam();
  } else {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const startTimer = () => {
  if (timer) clearInterval(timer); // Clear existing timer if any
  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      finishExam(); // Auto-submit when time expires
    }
  }, 1000);
};

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = Array(questions.value.length).fill(null);
  showResults.value = false;
  results.value = [];
  timeLeft.value = props.totalTime;
  startTimer();
};

const correctAnswers = computed(() => {
  return results.value.filter(r => r.isCorrect).length;
});

const loadQuestions = async () => {
  try {
    const response = await fetch('/data/quiz.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData: JsonQuestion[] = await response.json();
    
    questions.value = jsonData.map(jq => ({
      id: jq.id,
      question: jq.question_text,
      choices: jq.options.map(opt => ({
        label: opt.id,
        text: opt.text,
        isCorrect: opt.id === jq.correct_answer_id
      })),
      explanation: jq.explanation
    }));

    // Initialize userAnswers array after questions are loaded
    userAnswers.value = Array(questions.value.length).fill(null);
    // Reset quiz state if needed, e.g., if this can be called multiple times
    currentQuestionIndex.value = 0;
    showResults.value = false;
    results.value = [];
    timeLeft.value = props.totalTime; // Reset timer to initial value
    startTimer(); // Restart timer with new questions

  } catch (error) {
    console.error("Failed to load questions:", error);
    // Handle error appropriately, e.g., show a message to the user
  }
};

onMounted(async () => {
  await loadQuestions();
  // Timer is started within loadQuestions after data is processed
});

onUnmounted(() => {
  stopTimer();
});

// Watch for changes in questions prop is no longer needed as it's fetched internally
// watch(() => props.questions, (newQuestions) => {
//   if (newQuestions) {
//     userAnswers.value = Array(newQuestions.length).fill(null);
//     // Optionally, reset other states if quiz content changes dynamically
//     // restartQuiz(); // Or a more nuanced reset
//   }
// }, { deep: true });

</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <!-- Header with Progress and Timer -->
    <div v-if="!showResults && questions.length > 0" class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Exam</h2> 
        <div class="text-sm text-muted-foreground">
          Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
        </div>
      </div>
      
      <!-- Progress Bar (Time Elapsed) -->
      <Progress 
        :model-value="progressPercentage" 
        class="mb-4"
        :aria-label="`Time elapsed: ${formatTime(props.totalTime - timeLeft)} of ${formatTime(props.totalTime)}`"
      />
      
      <!-- Timer -->
      <div class="flex justify-center mb-6">
        <div 
          class="flex items-center gap-2 px-4 py-2 rounded-lg border"
          :class="timeLeft <= 60 ? 'border-destructive bg-destructive/10' : 'border-border'"
        >
          <Clock class="w-4 h-4" />
          <span 
            class="font-mono text-lg font-semibold"
            :class="timeLeft <= 60 ? 'text-destructive' : 'text-foreground'"
            :aria-label="`Time remaining: ${timeLeft} seconds`"
          >
            {{ formatTime(timeLeft) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Question Card -->
    <Card v-if="!showResults && currentQuestion && questions.length > 0" class="mb-6">
      <div class="p-6">
        <div class="mb-6">
          <div 
            v-if="currentQuestion.question.includes('$') || currentQuestion.question.includes('**')"
            v-html="renderContent(currentQuestion.question)"
            class="prose prose-sm max-w-none"
          />
           <span v-else>{{ currentQuestion.question }}</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="choice in currentQuestion.choices"
            :key="choice.label"
            class="relative"
          >
            <button
              :class="[
                'w-full p-4 text-left rounded-lg border transition-all duration-200',
                'hover:bg-accent hover:border-accent-foreground/20',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                selectedAnswer === choice.label
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                  : 'border-border'
              ]"
              @click="selectAnswer(choice.label)"
              :aria-pressed="selectedAnswer === choice.label"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold"
                  :class="[
                    selectedAnswer === choice.label
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border'
                  ]"
                >
                  {{ choice.label }}
                </div>
                <div class="flex-1 min-w-0">
                  <div 
                    v-if="choice.text.includes('$') || choice.text.includes('**')"
                    v-html="renderContent(choice.text)"
                    class="prose prose-sm max-w-none"
                  />
                  <span v-else>{{ choice.text }}</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Card>

    <!-- Navigation Buttons -->
    <div v-if="!showResults && questions.length > 0" class="flex justify-between">
      <Button
        variant="outline"
        :disabled="currentQuestionIndex === 0"
        @click="previousQuestion"
        class="flex items-center gap-2"
      >
        <ChevronLeft class="w-4 h-4" />
        Previous
      </Button>
      
      <Button
        @click="nextQuestion" 
        class="flex items-center gap-2"
      >
        {{ isLastQuestion ? 'Finish Exam' : 'Next' }} <!-- Changed from Quiz to Exam -->
        <ChevronRight v-if="!isLastQuestion" class="w-4 h-4" />
        <Check v-else class="w-4 h-4" />
      </Button>
    </div>

    <!-- Results Page -->
    <div v-if="showResults && questions.length > 0" class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-2">Exam Complete!</h2>
        <p class="text-lg text-muted-foreground">
          You scored {{ correctAnswers }} out of {{ questions.length }} questions.
        </p>
        <div class="text-2xl font-semibold mt-2">
          {{ questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0 }}%
        </div>
      </div>

      <div class="space-y-4">
        <Card v-for="(question, index) in questions" :key="question.id">
          <div class="p-6">
            <div class="flex items-start gap-3 mb-4">
              <div class="flex-shrink-0">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="[
                    results[index]?.isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  ]"
                >
                  <Check v-if="results[index]?.isCorrect" class="w-4 h-4" />
                  <X v-else class="w-4 h-4" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold mb-2">Question {{ index + 1 }}</h3>
                <div 
                  v-if="question.question.includes('$') || question.question.includes('**')"
                  v-html="renderContent(question.question)"
                  class="prose prose-sm max-w-none mb-3"
                />
                <p v-else class="mb-3">{{ question.question }}</p>
                
                <div class="space-y-2">
                  <div class="text-sm">
                    <span class="font-medium">Your answer: </span>
                    <span 
                      :class="[
                        results[index]?.isCorrect ? 'text-green-700' : 'text-red-700'
                      ]"
                    >
                      {{ results[index]?.selectedLabel || 'No answer' }}
                    </span>
                  </div>
                  
                  <div class="text-sm">
                    <span class="font-medium">Correct answer: </span>
                    <span class="text-green-700">
                      {{ question.choices.find(c => c.isCorrect)?.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="question.explanation" class="mt-4 p-4 bg-muted rounded-lg">
              <h4 class="font-medium mb-2">Explanation:</h4>
              <div 
                v-if="question.explanation.includes('$') || question.explanation.includes('**')"
                v-html="renderContent(question.explanation)"
                class="prose prose-sm max-w-none"
              />
              <p v-else class="text-sm text-muted-foreground">{{ question.explanation }}</p>
            </div>
          </div>
        </Card>
      </div>

      <div class="text-center">
        <Button @click="restartQuiz" class="flex items-center gap-2 mx-auto">
          <RotateCcw class="w-4 h-4" />
          Take Exam Again 
        </Button>
      </div>
    </div>
    <div v-else-if="!showResults && questions.length === 0" class="text-center">
      <p class="text-lg text-muted-foreground">Loading questions or no questions available...</p>
      <!-- You could add a loading spinner here -->
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for math rendering */
:deep(.katex) {
  font-size: 1em;
}

:deep(.katex-display) {
  margin: 0.5em 0;
}

/* Ensure proper spacing in prose content */
:deep(.prose) {
  color: inherit;
}

:deep(.prose p) {
  margin: 0;
}

:deep(.prose strong) {
  font-weight: 600;
}

:deep(.prose em) {
  font-style: italic;
}
</style>