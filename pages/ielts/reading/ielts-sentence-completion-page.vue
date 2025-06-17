<script setup lang="ts">
import { ref, onMounted } from "vue";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-vue-next";

// --- Configuration & Initialization ---
const config = useRuntimeConfig();
const groqApiKey = "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"; // Replace with your actual key or config
let groq: Groq | null = null;

if (groqApiKey && typeof groqApiKey === "string") {
  groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });
} else {
  console.error("GROQ_API_KEY is not configured or is invalid.");
}

// --- Interfaces ---
interface SentenceCompletionQuestion {
  id: string; // e.g., "q1"
  sentenceParts: [string, string]; // Text before gap, text after gap. e.g. ["The element called ", " had..."]
  questionNumber: string; // e.g., "1", "2"
  correctAnswer: string; // Single word
}

interface SentenceCompletionData {
  passageTitle: string;
  passageText: string;
  taskTitle: string;
  questions: SentenceCompletionQuestion[];
  wordLimit: 1;
}

// --- Reactive State ---
const pageData = ref<SentenceCompletionData | null>(null);
const userAnswers = ref<{ [key: string]: string }>({}); // e.g., { "q1": "user's answer" }
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<
  Array<{
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    sentenceParts: [string, string];
    questionNumber: string;
  }>
>([]);
const score = ref(0);

// --- Functions ---
async function fetchSentenceCompletionMaterial() {
  if (!groq) {
    error.value = "Groq SDK not initialized. Check API key configuration.";
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
          role: "system",
          content: `You are an IELTS test content generator. Create a 'Sentence Completion' task. Provide a reading passage (around 300-400 words) and 5-7 sentences to complete. Each sentence must have one gap, and the answer must be ONE WORD ONLY from the passage. For each sentence, provide a unique 'id', 'questionNumber' (e.g., "1"), 'sentenceParts' (an array of two strings: the part before the gap, and the part after the gap), and 'correctAnswer' (the single word). Format the output as a JSON object with keys: "passageTitle", "passageText", "taskTitle" (e.g., "Complete the sentences below."), "questions" (array of question objects), and "wordLimit" (fixed to 1). Example for a question object: { "id": "q1", "questionNumber": "1", "sentenceParts": ["Marie Curie found that the element called ", " had the same property."], "correctAnswer": "polonium" }. Ensure the sentences are distinct and test comprehension of different parts of the passage.`,
        },
        {
          role: "user",
          content:
            'Generate an IELTS sentence completion task about the life and work of Marie Curie. Ensure all answers are ONE WORD ONLY and directly from the provided passage. Provide 5 questions.',
        },
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.6,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      const parsedData = JSON.parse(responseContent) as SentenceCompletionData;
      if (parsedData.wordLimit !== 1) {
        // Enforce word limit if AI doesn't adhere
        console.warn("AI did not set wordLimit to 1, overriding.");
        parsedData.wordLimit = 1;
      }
      pageData.value = parsedData;
      const initialUserAnswers: { [key: string]: string } = {};
      parsedData.questions.forEach(q => {
        initialUserAnswers[q.id] = '';
      });
      userAnswers.value = initialUserAnswers;
    } else {
      throw new Error("No content received from API.");
    }
  } catch (e: any) {
    console.error("Error fetching sentence completion material:", e);
    error.value = `Failed to fetch material: ${e.message}`;
    pageData.value = null;
  }
  loading.value = false;
}

function submitAnswers() {
  if (!pageData.value) return;

  let correctCount = 0;
  const feedback: typeof answerFeedback.value = [];

  pageData.value.questions.forEach((q) => {
    const userAnswer = userAnswers.value[q.id]?.trim() || "";
    const isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
    
    // Basic check for ONE WORD ONLY
    if (userAnswer.split(' ').filter(Boolean).length > 1) {
        // Optionally, you can add specific feedback for this error
        // For now, it will just be marked incorrect if it's not the exact one-word answer
    }

    if (isCorrect) correctCount++;
    feedback.push({
      questionId: q.id,
      userAnswer: userAnswer || "Not Answered",
      correctAnswer: q.correctAnswer,
      isCorrect,
      sentenceParts: q.sentenceParts,
      questionNumber: q.questionNumber,
    });
  });

  answerFeedback.value = feedback;
  score.value =
    feedback.length > 0 ? (correctCount / feedback.length) * 100 : 0;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchSentenceCompletionMaterial();
}

onMounted(() => {
  if (groq) fetchSentenceCompletionMaterial();
});
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-900">
    <Card class="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-primary dark:text-sky-400">
          IELTS Reading: Sentence Completion
        </CardTitle>
        <CardDescription class="text-center text-lg text-muted-foreground dark:text-slate-400">
          {{ pageData?.taskTitle || "Complete the sentences below." }}
          <span v-if="pageData?.wordLimit" class="font-semibold">
            Choose ONE WORD ONLY from the passage for each answer.
          </span>
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <Loader2 class="h-16 w-16 animate-spin text-primary dark:text-sky-500" />
      <p class="ml-4 mt-4 text-xl text-muted-foreground dark:text-slate-300">
        Generating your IELTS task...
      </p>
    </div>

    <Alert v-if="error && !loading" variant="destructive" class="mb-8 shadow-md">
      <AlertTitle class="text-xl">Error</AlertTitle>
      <AlertDescription class="text-md">{{ error }}</AlertDescription>
      <Button @click="fetchSentenceCompletionMaterial" class="mt-4">Try Again</Button>
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
          <div v-html="pageData.passageText"></div> <!-- Assuming passage might contain HTML -->
        </CardContent>
      </Card>

      <!-- Sentence Completion Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">
            Questions
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in pageData.questions" :key="question.id" class="flex items-start space-x-2">
            <span class="font-semibold text-muted-foreground dark:text-slate-400 pt-2">{{ question.questionNumber }}.</span>
            <div class="flex-grow flex flex-wrap items-baseline">
              <p class="text-slate-700 dark:text-slate-300 mr-1" v-html="question.sentenceParts[0]"></p>
              <Input
                :id="question.id"
                v-model="userAnswers[question.id]"
                type="text"
                class="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-primary dark:focus:ring-sky-500 w-40 md:w-48 mx-1"
                placeholder="Answer..."
                :disabled="showResults"
              />
              <p class="text-slate-700 dark:text-slate-300 ml-1" v-html="question.sentenceParts[1]"></p>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end pt-6">
          <Button 
            @click="submitAnswers" 
            :disabled="showResults || Object.values(userAnswers).some(ans => !ans?.trim()) || loading"
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
                v-for="feedback in answerFeedback" 
                :key="feedback.questionId" 
                class="shadow-sm"
                :class="feedback.isCorrect ? 'border-green-500 dark:border-green-600' : 'border-red-500 dark:border-red-600'"
              >
                <CardHeader>
                    <CardTitle class="text-lg" :class="feedback.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                        Question {{ feedback.questionNumber }}: {{ feedback.isCorrect ? "Correct" : "Incorrect" }}
                    </CardTitle>
                </CardHeader>
                <CardContent class="text-sm space-y-1">
                  <p class="text-slate-600 dark:text-slate-400">
                    <span v-html="feedback.sentenceParts[0]"></span>
                    <strong :class="feedback.isCorrect ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{ feedback.userAnswer }}</strong>
                    <span v-html="feedback.sentenceParts[1]"></span>
                  </p>
                  <p v-if="!feedback.isCorrect" class="text-slate-600 dark:text-slate-400">
                    Correct answer: <strong class="text-green-600 dark:text-green-500">{{ feedback.correctAnswer }}</strong>
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
/* Add any page-specific styles here if needed */
.prose p {
  margin-bottom: 1em;
}
</style>