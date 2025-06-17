<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Groq from 'groq-sdk';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-vue-next';

// --- Configuration & Initialization ---
const config = useRuntimeConfig();
const groqApiKey = "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"; // Replace with your actual key or config
let groq: Groq | null = null;

if (groqApiKey && typeof groqApiKey === 'string') {
  groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });
} else {
  console.error('GROQ_API_KEY is not configured or is invalid.');
}

// --- Interfaces ---
interface ShortAnswerQuestion {
  id: string; // e.g., "q1"
  questionNumber: string; // e.g., "1"
  questionText: string;
  correctAnswer: string; // Can be a string or an array of acceptable short answers
  wordLimit: string; // e.g., "NO MORE THAN THREE WORDS AND/OR A NUMBER"
}

interface ShortAnswerData {
  passageTitle: string;
  passageText: string;
  taskTitle: string; // e.g., "Answer the questions below."
  overallInstructions: string; // e.g., "Choose NO MORE THAN THREE WORDS from the passage for each answer."
  questions: ShortAnswerQuestion[];
}

// --- Reactive State ---
const pageData = ref<ShortAnswerData | null>(null);
const userAnswers = ref<{ [key: string]: string }>({}); // { "q1": "some answer" }
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<Array<{
  questionId: string;
  questionNumber: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  wordLimit: string;
}>>([]);
const score = ref(0);

// --- Functions ---
async function fetchShortAnswerMaterial() {
  if (!groq) {
    error.value = 'Groq SDK not initialized. Check API key configuration.';
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  pageData.value = null;
  userAnswers.value = {};
  showResults.value = false;
  answerFeedback.value = [];
  score.value = 0;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an IELTS test content generator. Create a 'Short Answer Questions' task. Provide a reading passage (around 500-700 words, academic style). Then, provide a list of 5-7 short-answer questions based on the passage. For each question, specify a unique 'id', 'questionNumber', 'questionText', the 'correctAnswer' (which could be a few words or a number from the passage), and a 'wordLimit' instruction (e.g., "NO MORE THAN THREE WORDS AND/OR A NUMBER", "ONE WORD ONLY"). Format the output as a JSON object with keys: "passageTitle", "passageText", "taskTitle" (e.g., "Answer the questions below."), "overallInstructions" (e.g., "Choose NO MORE THAN X WORDS..."), and "questions" (array of {id, questionNumber, questionText, correctAnswer, wordLimit}). Ensure questions require locating specific information in the passage.`,
        },
        {
          role: 'user',
          content: 'Generate an IELTS short-answer question task about the history of renewable energy technologies. Provide 6 questions, each with a limit of NO MORE THAN THREE WORDS AND/OR A NUMBER.',
        },
      ],
      model: 'llama-3.3-70b-versatile', // Or your preferred model
      temperature: 0.6,
      response_format: { type: 'json_object' },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      const parsedData = JSON.parse(responseContent) as ShortAnswerData;
      pageData.value = parsedData;
      const initialAnswers: { [key: string]: string } = {};
      parsedData.questions.forEach(q => {
        initialAnswers[q.id] = ''; // Initialize with empty answers
      });
      userAnswers.value = initialAnswers;
    } else {
      throw new Error('No content received from API.');
    }
  } catch (e: any) {
    console.error('Error fetching short answer material:', e);
    error.value = `Failed to fetch material: ${e.message}`;
  } finally {
    loading.value = false;
  }
}

function submitAnswers() {
  if (!pageData.value) return;

  let correctCount = 0;
  const feedback: typeof answerFeedback.value = [];

  pageData.value.questions.forEach(q => {
    const userAnswerRaw = userAnswers.value[q.id]?.trim() || "";
    // Basic check: case-insensitive comparison. More sophisticated checking might be needed for variations.
    const isCorrect = userAnswerRaw.toLowerCase() === q.correctAnswer.toLowerCase(); 
    if (isCorrect) correctCount++;

    feedback.push({
      questionId: q.id,
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      userAnswer: userAnswerRaw || 'Not Answered',
      correctAnswer: q.correctAnswer,
      isCorrect,
      wordLimit: q.wordLimit,
    });
  });

  answerFeedback.value = feedback;
  score.value = feedback.length > 0 ? (correctCount / feedback.length) * 100 : 0;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchShortAnswerMaterial();
}

const allQuestionsAnswered = computed(() => {
  if (!pageData.value) return false;
  return pageData.value.questions.every(q => !!userAnswers.value[q.id]?.trim());
});

onMounted(() => {
  if (groq) fetchShortAnswerMaterial();
});

</script>

<template>
  <div class="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-900">
    <Card class="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-primary dark:text-sky-400">
          IELTS Reading: Short Answer Questions
        </CardTitle>
        <CardDescription v-if="pageData?.taskTitle || pageData?.overallInstructions" class="text-center text-lg text-muted-foreground dark:text-slate-400 space-y-1">
          <p v-if="pageData?.taskTitle">{{ pageData.taskTitle }}</p>
          <p v-if="pageData?.overallInstructions" class="font-semibold">{{ pageData.overallInstructions }}</p>
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <Loader2 class="h-16 w-16 animate-spin text-primary dark:text-sky-500" />
      <p class="ml-4 mt-4 text-xl text-muted-foreground dark:text-slate-300">
        Loading your IELTS Short Answer task...
      </p>
    </div>

    <Alert v-if="error && !loading" variant="destructive" class="mb-8 shadow-md">
      <AlertTitle class="text-xl">Error</AlertTitle>
      <AlertDescription class="text-md">{{ error }}</AlertDescription>
      <Button @click="fetchShortAnswerMaterial" class="mt-4">Try Again</Button>
    </Alert>

    <div v-if="pageData && !loading && !error" class="space-y-8">
      <!-- Reading Passage Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">
            {{ pageData.passageTitle }}
          </CardTitle>
        </CardHeader>
        <CardContent class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-justify">
          <div v-html="pageData.passageText.replace(/\n/g, '<br>')"></div>
        </CardContent>
      </Card>

      <!-- Questions Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">
            Questions
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in pageData.questions" :key="question.id" class="p-4 border rounded-md dark:border-slate-700">
            <p class="mb-2 text-slate-700 dark:text-slate-300">
              <span class="font-semibold">{{ question.questionNumber }}.</span> {{ question.questionText }}
            </p>
            <p class="mb-3 text-sm font-semibold text-muted-foreground dark:text-sky-400">({{ question.wordLimit }})</p>
            <Input 
              :id="`question-${question.id}`" 
              v-model="userAnswers[question.id]" 
              :disabled="showResults" 
              placeholder="Type your answer here"
              class="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
            />
          </div>
        </CardContent>
        <CardFooter class="flex justify-end pt-6">
          <Button 
            @click="submitAnswers" 
            :disabled="showResults || !allQuestionsAnswered || loading"
            class="min-w-[150px]"
          >
            {{ showResults ? "View Results Below" : "Submit Answers" }}
          </Button>
        </CardFooter>
      </Card>

      <!-- Results Section -->
      <div v-if="showResults" class="space-y-8">
        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-2xl text-center text-primary dark:text-sky-400">Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert 
              :variant="score >= 70 ? 'default' : (score >= 40 ? 'default' : 'destructive')" 
              class="mb-6 shadow"
              :class="{
                'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-800 dark:text-green-200': score >=70,
                'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200': score < 70 && score >= 40,
                'bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-700 text-red-800 dark:text-red-200': score < 40
              }"
            >
              <AlertTitle class="text-xl font-semibold">Your Score: {{ score.toFixed(0) }}%</AlertTitle>
              <AlertDescription>
                You answered {{ answerFeedback.filter(f => f.isCorrect).length }} out of {{ answerFeedback.length }} questions correctly.
              </AlertDescription>
            </Alert>

            <div class="space-y-4">
              <Card 
                v-for="feedbackItem in answerFeedback" 
                :key="feedbackItem.questionId" 
                class="shadow-sm"
                :class="feedbackItem.isCorrect ? 'border-green-500 dark:border-green-600' : 'border-red-500 dark:border-red-600'"
              >
                <CardHeader>
                  <CardTitle class="text-lg" :class="feedbackItem.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                    Question {{ feedbackItem.questionNumber }}: {{ feedbackItem.isCorrect ? "Correct" : "Incorrect" }}
                  </CardTitle>
                </CardHeader>
                <CardContent class="text-sm space-y-1">
                  <p class="text-slate-600 dark:text-slate-400 italic">{{ feedbackItem.questionText }}</p>
                  <p class="text-slate-600 dark:text-slate-400">
                    Your answer: <strong :class="feedbackItem.isCorrect ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{ feedbackItem.userAnswer || 'N/A' }}</strong>
                  </p>
                  <p v-if="!feedbackItem.isCorrect" class="text-slate-600 dark:text-slate-400">
                    Correct answer: <strong class="text-green-600 dark:text-green-500">{{ feedbackItem.correctAnswer }}</strong>
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter class="flex justify-center pt-6">
            <Button @click="tryAnotherTest" class="min-w-[150px]">Try Another Test</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose p {
  margin-bottom: 1em;
}

.prose ul,
.prose ol {
  margin-left: 1.5em;
}
</style>