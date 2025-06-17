<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Groq from 'groq-sdk';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
interface ClassificationCategory {
  letter: string; // "A", "B", "C"
  description: string;
}

interface ClassificationItem {
  id: string; // e.g., "item14"
  questionNumber: string; // e.g., "14"
  statement: string;
  correctCategoryLetter: string; // "A", "B", or "C"
}

interface ClassificationData {
  passageTitle: string;
  passageText: string;
  taskTitle: string;
  instructions: string;
  categories: ClassificationCategory[];
  itemsToClassify: ClassificationItem[];
}

// --- Reactive State ---
const pageData = ref<ClassificationData | null>(null);
const userSelections = ref<{ [key: string]: string }>({}); // { "item14": "A" }
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<Array<{
  itemId: string;
  questionNumber: string;
  statement: string;
  userSelection: string;
  correctAnswer: string;
  isCorrect: boolean;
}>>([]);
const score = ref(0);

// --- Functions ---
async function fetchClassificationMaterial() {
  if (!groq) {
    error.value = 'Groq SDK not initialized. Check API key configuration.';
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  pageData.value = null;
  userSelections.value = {};
  showResults.value = false;
  answerFeedback.value = [];
  score.value = 0;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an IELTS test content generator. Create a 'Classification' task. Provide a reading passage (around 350-500 words). Then, provide a list of 3 categories (e.g., A, B, C) with descriptions. Finally, provide 7-9 statements/items that need to be classified into these categories based on the passage. For each item, provide a unique 'id', 'questionNumber', 'statement', and the 'correctCategoryLetter' (A, B, or C). Format the output as a JSON object with keys: "passageTitle", "passageText", "taskTitle" (e.g., "Classify the following..."), "instructions" (e.g., "Write the correct letter, A, B or C..."), "categories" (array of {letter, description}), and "itemsToClassify" (array of {id, questionNumber, statement, correctCategoryLetter}). Ensure the classification requires careful reading of the passage.`,
        },
        {
          role: 'user',
          content: 'Generate an IELTS classification task about different theories of motivation in psychology. Provide 3 categories and 8 statements to classify.',
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.65,
      response_format: { type: 'json_object' },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      const parsedData = JSON.parse(responseContent) as ClassificationData;
      pageData.value = parsedData;
      const initialSelections: { [key: string]: string } = {};
      parsedData.itemsToClassify.forEach(item => {
        initialSelections[item.id] = ''; // Initialize with no selection
      });
      userSelections.value = initialSelections;
    } else {
      throw new Error('No content received from API.');
    }
  } catch (e: any) {
    console.error('Error fetching classification material:', e);
    error.value = `Failed to fetch material: ${e.message}`;
    pageData.value = null;
  }
  loading.value = false;
}

function submitAnswers() {
  if (!pageData.value) return;

  let correctCount = 0;
  const feedback: typeof answerFeedback.value = [];

  pageData.value.itemsToClassify.forEach(item => {
    const userChoice = userSelections.value[item.id] || "";
    const isCorrect = userChoice === item.correctCategoryLetter;
    if (isCorrect) correctCount++;

    feedback.push({
      itemId: item.id,
      questionNumber: item.questionNumber,
      statement: item.statement,
      userSelection: userChoice || 'Not Answered',
      correctAnswer: item.correctCategoryLetter,
      isCorrect,
    });
  });

  answerFeedback.value = feedback;
  score.value = feedback.length > 0 ? (correctCount / feedback.length) * 100 : 0;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchClassificationMaterial();
}

const allQuestionsAnswered = computed(() => {
  if (!pageData.value) return false;
  return pageData.value.itemsToClassify.every(item => !!userSelections.value[item.id]);
});

onMounted(() => {
  if (groq) fetchClassificationMaterial();
});

</script>

<template>
  <div class="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-900">
    <Card class="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-primary dark:text-sky-400">
          IELTS Reading: Classification
        </CardTitle>
        <CardDescription v-if="pageData?.taskTitle || pageData?.instructions" class="text-center text-lg text-muted-foreground dark:text-slate-400 space-y-1">
          <p v-if="pageData?.taskTitle">{{ pageData.taskTitle }}</p>
          <p v-if="pageData?.instructions">{{ pageData.instructions }}</p>
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
      <Button @click="fetchClassificationMaterial" class="mt-4">Try Again</Button>
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
          <div v-html="pageData.passageText"></div>
        </CardContent>
      </Card>

      <!-- Classification Task Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">
            Categories & Statements
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Categories Display -->
          <div class="mb-6 p-4 border rounded-md bg-slate-100 dark:bg-slate-800">
            <h3 class="text-lg font-semibold mb-2 text-slate-800 dark:text-sky-300">Categories:</h3>
            <ul class="space-y-1 list-none pl-0">
              <li v-for="cat in pageData.categories" :key="cat.letter" class="text-slate-700 dark:text-slate-300">
                <span class="font-bold">{{ cat.letter }}:</span> {{ cat.description }}
              </li>
            </ul>
          </div>

          <!-- Items to Classify -->
          <div class="space-y-4">
            <div v-for="item in pageData.itemsToClassify" :key="item.id" class="p-4 border rounded-md dark:border-slate-700">
              <p class="mb-3 text-slate-700 dark:text-slate-300">
                <span class="font-semibold">{{ item.questionNumber }}.</span> {{ item.statement }}
              </p>
              <RadioGroup v-model="userSelections[item.id]" :disabled="showResults" class="flex space-x-4 md:space-x-6">
                <div v-for="cat in pageData.categories" :key="cat.letter" class="flex items-center space-x-2">
                  <RadioGroupItem :value="cat.letter" :id="`${item.id}-${cat.letter}`" />
                  <Label :for="`${item.id}-${cat.letter}`" class="font-medium text-slate-800 dark:text-slate-200">{{ cat.letter }}</Label>
                </div>
              </RadioGroup>
            </div>
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
                :key="feedbackItem.itemId" 
                class="shadow-sm"
                :class="feedbackItem.isCorrect ? 'border-green-500 dark:border-green-600' : 'border-red-500 dark:border-red-600'"
              >
                <CardHeader>
                  <CardTitle class="text-lg" :class="feedbackItem.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                    Statement {{ feedbackItem.questionNumber }}: {{ feedbackItem.isCorrect ? "Correctly Classified" : "Incorrectly Classified" }}
                  </CardTitle>
                </CardHeader>
                <CardContent class="text-sm space-y-1">
                  <p class="text-slate-600 dark:text-slate-400 italic">"{{ feedbackItem.statement }}"</p>
                  <p class="text-slate-600 dark:text-slate-400">
                    Your answer: <strong :class="feedbackItem.isCorrect ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{ feedbackItem.userSelection || 'N/A' }}</strong>
                  </p>
                  <p v-if="!feedbackItem.isCorrect" class="text-slate-600 dark:text-slate-400">
                    Correct classification: <strong class="text-green-600 dark:text-green-500">{{ feedbackItem.correctAnswer }}</strong>
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