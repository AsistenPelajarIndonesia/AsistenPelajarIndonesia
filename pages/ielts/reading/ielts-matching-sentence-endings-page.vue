<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Groq from 'groq-sdk';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-vue-next';

// --- Configuration & Initialization ---
const config = useRuntimeConfig();
// IMPORTANT: Replace with your actual Groq API key or use environment variables
const groqApiKey = "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"; 
let groq: Groq | null = null;

if (groqApiKey && typeof groqApiKey === 'string') {
  groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });
} else {
  console.error('GROQ_API_KEY is not configured or is invalid.');
  // Consider setting an error state here to inform the user on the UI
}

// --- Interfaces ---
interface SentenceEndingOption {
  letter: string; // e.g., "A", "B", "F"
  text: string;
}

interface SentenceBeginning {
  id: string; // e.g., "q11"
  questionNumber: string; // e.g., "11"
  beginningText: string;
  correctEndingLetter: string; // The letter of the correct SentenceEndingOption
}

interface MatchingSentenceEndingsData {
  passageTitle: string;
  passageText: string;
  taskTitle: string; // e.g., "Complete each sentence with the correct ending, A-F, below."
  instructions: string; // e.g., "Write the correct letter, A-F, in boxes 11-13 on your answer sheet."
  sentenceBeginnings: SentenceBeginning[];
  sentenceEndings: SentenceEndingOption[]; // Typically more endings than beginnings
}

// --- Reactive State ---
const pageData = ref<MatchingSentenceEndingsData | null>(null);
const userSelections = ref<{ [key: string]: string }>({}); // { "q11": "A" }
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<Array<{
  beginningId: string;
  questionNumber: string;
  beginningText: string;
  userSelectedEndingLetter: string;
  userSelectedEndingText: string;
  correctEndingLetter: string;
  correctEndingText: string;
  isCorrect: boolean;
}>>([]);
const score = ref(0);

// --- Functions ---
async function fetchMatchingMaterial() {
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
          content: `You are an IELTS test content generator. Create a 'Matching Sentence Endings' task. 
          Provide a reading passage (around 500-700 words, academic style). 
          Then, provide a list of 3-5 sentence beginnings (incomplete sentences). 
          Next, provide a list of 5-7 sentence endings (options A, B, C, etc.). There should be more endings than beginnings. 
          For each sentence beginning, specify a unique 'id', 'questionNumber', 'beginningText', and the 'correctEndingLetter' that matches one of the provided sentence endings. 
          Format the output as a JSON object with keys: "passageTitle", "passageText", "taskTitle" (e.g., "Complete each sentence with the correct ending..."), "instructions" (e.g., "Write the correct letter, A-F..."), "sentenceBeginnings" (array of {id, questionNumber, beginningText, correctEndingLetter}), and "sentenceEndings" (array of {letter, text}). 
          Ensure the task requires careful reading and understanding of the passage to find the correct matches.`,
        },
        {
          role: 'user',
          content: 'Generate an IELTS Matching Sentence Endings task about the impact of social media on interpersonal communication. Provide 4 sentence beginnings and 6 sentence endings.',
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.65,
      response_format: { type: 'json_object' },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      const parsedData = JSON.parse(responseContent) as MatchingSentenceEndingsData;
      pageData.value = parsedData;
      const initialSelections: { [key: string]: string } = {};
      parsedData.sentenceBeginnings.forEach(item => {
        initialSelections[item.id] = ''; // Initialize with no selection
      });
      userSelections.value = initialSelections;
    } else {
      throw new Error('No content received from API.');
    }
  } catch (e: any) {
    console.error('Error fetching matching sentence endings material:', e);
    error.value = `Failed to fetch material: ${e.message}`;
  } finally {
    loading.value = false;
  }
}

function getEndingTextByLetter(letter: string): string {
  return pageData.value?.sentenceEndings.find(e => e.letter === letter)?.text || 'N/A';
}

function submitAnswers() {
  if (!pageData.value) return;

  let correctCount = 0;
  const feedback: typeof answerFeedback.value = [];

  pageData.value.sentenceBeginnings.forEach(beginning => {
    const userChoiceLetter = userSelections.value[beginning.id] || "";
    const isCorrect = userChoiceLetter === beginning.correctEndingLetter;
    if (isCorrect) correctCount++;

    feedback.push({
      beginningId: beginning.id,
      questionNumber: beginning.questionNumber,
      beginningText: beginning.beginningText,
      userSelectedEndingLetter: userChoiceLetter || 'Not Answered',
      userSelectedEndingText: getEndingTextByLetter(userChoiceLetter),
      correctEndingLetter: beginning.correctEndingLetter,
      correctEndingText: getEndingTextByLetter(beginning.correctEndingLetter),
      isCorrect,
    });
  });

  answerFeedback.value = feedback;
  score.value = feedback.length > 0 ? (correctCount / feedback.length) * 100 : 0;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchMatchingMaterial();
}

const allQuestionsAnswered = computed(() => {
  if (!pageData.value) return false;
  return pageData.value.sentenceBeginnings.every(item => !!userSelections.value[item.id]);
});

onMounted(() => {
  if (groq) fetchMatchingMaterial();
  else error.value = 'Groq API key not configured. Cannot fetch questions.';
});

</script>

<template>
  <div class="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-900">
    <Card class="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-primary dark:text-sky-400">
          IELTS Reading: Matching Sentence Endings
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
        Loading your IELTS task...
      </p>
    </div>

    <Alert v-if="error && !loading" variant="destructive" class="mb-8 shadow-md">
      <AlertTitle class="text-xl">Error</AlertTitle>
      <AlertDescription class="text-md">{{ error }}</AlertDescription>
      <Button @click="fetchMatchingMaterial" class="mt-4">Try Again</Button>
    </Alert>

    <div v-if="pageData && !loading && !error" class="grid md:grid-cols-3 gap-8">
      <!-- Reading Passage Section (Left/Top) -->
      <Card class="md:col-span-2 shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">
            {{ pageData.passageTitle }}
          </CardTitle>
        </CardHeader>
        <CardContent class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-justify">
          <div v-html="pageData.passageText.replace(/\n/g, '<br>')"></div>
        </CardContent>
      </Card>

      <!-- Questions & Options Section (Right/Bottom) -->
      <div class="md:col-span-1 space-y-6">
        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-xl text-primary dark:text-sky-400">Sentence Endings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul class="space-y-2 list-none pl-0">
              <li v-for="ending in pageData.sentenceEndings" :key="ending.letter" class="p-2 border rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span class="font-semibold">{{ ending.letter }}.</span> {{ ending.text }}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-xl text-primary dark:text-sky-400">Complete the Sentences</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="beginning in pageData.sentenceBeginnings" :key="beginning.id" class="p-4 border rounded-md dark:border-slate-700">
              <p class="mb-3 text-slate-700 dark:text-slate-300">
                <span class="font-semibold">{{ beginning.questionNumber }}.</span> {{ beginning.beginningText }}...
              </p>
              <RadioGroup v-model="userSelections[beginning.id]" :disabled="showResults" class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div v-for="endingOption in pageData.sentenceEndings" :key="endingOption.letter" class="flex items-center space-x-2">
                  <RadioGroupItem :value="endingOption.letter" :id="`${beginning.id}-${endingOption.letter}`" />
                  <Label :for="`${beginning.id}-${endingOption.letter}`" class="font-medium text-slate-800 dark:text-slate-200">{{ endingOption.letter }}</Label>
                </div>
              </RadioGroup>
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
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="showResults && pageData" class="mt-8 space-y-8">
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
              You matched {{ answerFeedback.filter(f => f.isCorrect).length }} out of {{ answerFeedback.length }} sentences correctly.
            </AlertDescription>
          </Alert>

          <div class="space-y-4">
            <Card 
              v-for="feedbackItem in answerFeedback" 
              :key="feedbackItem.beginningId" 
              class="shadow-sm"
              :class="feedbackItem.isCorrect ? 'border-green-500 dark:border-green-600' : 'border-red-500 dark:border-red-600'"
            >
              <CardHeader>
                <CardTitle class="text-lg" :class="feedbackItem.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                  Sentence {{ feedbackItem.questionNumber }}: {{ feedbackItem.isCorrect ? "Correctly Matched" : "Incorrectly Matched" }}
                </CardTitle>
              </CardHeader>
              <CardContent class="text-sm space-y-2">
                <p class="text-slate-600 dark:text-slate-400">
                  <span class="font-semibold">Sentence:</span> {{ feedbackItem.beginningText }}...
                </p>
                <p class="text-slate-600 dark:text-slate-400">
                  Your answer: <strong :class="feedbackItem.isCorrect ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">{{ feedbackItem.userSelectedEndingLetter }}. {{ feedbackItem.userSelectedEndingText }}</strong>
                </p>
                <p v-if="!feedbackItem.isCorrect" class="text-slate-600 dark:text-slate-400">
                  Correct answer: <strong class="text-green-600 dark:text-green-500">{{ feedbackItem.correctEndingLetter }}. {{ feedbackItem.correctEndingText }}</strong>
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