<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-900 to-indigo-900 p-4 sm:p-6 lg:p-8 text-gray-100">
    <div class="max-w-5xl mx-auto">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 sm:text-5xl">
          IELTS Reading: Matching Headings
        </h1>
        <p class="mt-3 text-lg text-sky-300">Read the passage and choose the correct heading for each paragraph.</p>
      </header>

      <div class="loader-container my-10 flex justify-center items-center" v-show="loading">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        <p class="ml-3 text-sky-200">Generating your reading passage and headings...</p>
      </div>

      <div class="error-message my-10 p-4 bg-red-800 bg-opacity-60 rounded-lg text-center" v-show="error !== null">
        <p class="text-red-300 font-semibold">Oops! Something went wrong:</p>
        <p class="text-red-400">{{ error }}</p>
        <Button class="mt-4 bg-cyan-600 hover:bg-cyan-700" @click="fetchReadingMaterial">Try Again</Button>
      </div>

      <div v-if="!loading && !error && passageData" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Reading Passage -->
        <div class="md:col-span-2">
          <Card class="bg-slate-800 border-slate-700 shadow-xl h-full">
            <CardHeader>
              <CardTitle class="text-2xl font-semibold text-cyan-300">{{ passageData.title }}</CardTitle>
            </CardHeader>
            <CardContent class="prose prose-invert max-w-none text-slate-300 space-y-6">
              <div v-for="(paragraph, index) in passageData.paragraphs" :key="index">
                <strong class="block mb-1 text-sky-400">Paragraph {{ String.fromCharCode(65 + index) }}</strong>
                <p>{{ paragraph }}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Headings and Questions -->
        <div class="md:col-span-1 space-y-8">
          <Card class="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader>
              <CardTitle class="text-xl font-semibold text-cyan-300">List of Headings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-slate-300">
                <li v-for="(heading, index) in passageData.headings" :key="index">
                  <strong class="text-sky-400">{{ toRoman(index + 1) }}.</strong> {{ heading }}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card class="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader>
              <CardTitle class="text-xl font-semibold text-cyan-300">Match Headings to Paragraphs</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div v-for="(paragraph, pIndex) in passageData.paragraphs" :key="`q-${pIndex}`">
                <Label :for="`select-p${pIndex}`" class="block mb-1.5 text-sm font-medium text-sky-300">
                  Paragraph {{ String.fromCharCode(65 + pIndex) }}
                </Label>
                <Select v-model="userAnswers[pIndex]" :disabled="showResults">
                  <SelectTrigger class="w-full bg-slate-700 border-slate-600 text-sky-200 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-70 disabled:cursor-not-allowed">
                    <SelectValue placeholder="Select a heading" />
                  </SelectTrigger>
                  <SelectContent class="bg-slate-700 border-slate-600 text-sky-200">
                    <SelectGroup>
                      <SelectItem 
                        v-for="(heading, hIndex) in passageData.headings"
                        :key="`h-${hIndex}`" 
                        :value="toRoman(hIndex + 1)"
                        class="hover:bg-slate-600 focus:bg-slate-600"
                      >
                        {{ toRoman(hIndex + 1) }}. {{ heading }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter class="flex justify-end">
              <Button @click="submitAnswers" :disabled="showResults || userAnswers.some(ans => !ans)" class="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white">
                {{ showResults ? 'View Results Below' : 'Submit Answers' }}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="showResults && passageData" class="mt-10">
        <Alert class="mb-8 text-gray-100" :class="{'bg-green-700 bg-opacity-50 border-green-500': score >= 75, 'bg-yellow-700 bg-opacity-50 border-yellow-500': score >= 50 && score < 75, 'bg-red-700 bg-opacity-50 border-red-500': score < 50}">
          <AlertTitle class="text-2xl font-bold">Your Results</AlertTitle>
          <AlertDescription class="text-lg">
            You scored <strong class="text-xl">{{ score.toFixed(0) }}%</strong>.
          </AlertDescription>
        </Alert>

        <Card class="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle class="text-xl font-semibold text-cyan-300">Answer Breakdown</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-for="(feedbackItem, index) in answerFeedback" :key="index" 
                 class="p-4 rounded-md border"
                 :class="{'bg-green-800 bg-opacity-30 border-green-600': feedbackItem.isCorrect, 'bg-red-800 bg-opacity-30 border-red-600': !feedbackItem.isCorrect}">
              <h4 class="font-semibold text-sky-300">{{ feedbackItem.paragraph }}</h4>
              <p class="text-slate-300">Your answer: <span class="font-medium">{{ feedbackItem.userAnswer }}</span></p>
              <p v-if="!feedbackItem.isCorrect" class="text-slate-300">Correct answer: <span class="font-medium text-yellow-400">{{ feedbackItem.correctAnswer }}</span></p>
              <p class="mt-1 font-semibold" :class="{'text-green-400': feedbackItem.isCorrect, 'text-red-400': !feedbackItem.isCorrect}">
                {{ feedbackItem.isCorrect ? 'Correct!' : 'Incorrect.' }}
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end pt-6">
            <Button @click="tryAnotherTest" class="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white">
              Try Another Test
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Groq from 'groq-sdk';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Alert, 
  AlertDescription, 
  AlertTitle
} from '@/components/ui/alert';

const groqApiKey = 
  "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";

const groq = new Groq({
  apiKey: groqApiKey,
  dangerouslyAllowBrowser: true,
});

interface ReadingData {
  title: string;
  paragraphs: string[]; // 6 paragraphs
  headings: string[];   // e.g., 9 headings
  correctMatches: { [paragraphLetter: string]: string }; // e.g., { "A": "III", "B": "V", ... }
}

const passageData = ref<ReadingData | null>(null);
const userAnswers = ref<string[]>([]); // Stores selected Roman numeral for each paragraph
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<Array<{ paragraph: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }>>([]);
const score = ref(0);

// Helper function to convert number to Roman numeral (simplified)
function toRoman(num: number): string {
  const map: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let result = '';
  for (const key in map) {
    while (num >= map[key]) {
      result += key;
      num -= map[key];
    }
  }
  return result;
}

async function fetchReadingMaterial() {
  loading.value = true;
  error.value = null;
  passageData.value = null; // Reset passage data
  showResults.value = false; // Hide results section
  userAnswers.value = []; // Reset user answers

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an IELTS test content generator specializing in 'Matching Headings' questions. Create a reading passage with exactly 6 paragraphs. Then, provide a list of exactly 9 headings. Some headings should accurately describe a paragraph, while others should be plausible distractors. Ensure there are more headings than paragraphs. Finally, provide the correct matches as an object where keys are paragraph identifiers ('A' through 'F') and values are the Roman numerals of the correct headings (e.g., 'I', 'II', 'III', etc.). Format your response as a JSON object with four keys: "title" (a short, relevant title for the passage), "paragraphs" (an array of 6 strings, each being a paragraph), "headings" (an array of 9 strings, each being a heading option), and "correctMatches" (an object mapping paragraph letters to correct heading Roman numerals, e.g., {"A": "III", "B": "V"}). Do not label paragraphs (A-F) or headings (I-IX) in your "paragraphs" and "headings" arrays; the application will handle that.`
        },
        {
          role: 'user',
          content: 'Generate an IELTS reading passage about the impact of renewable energy sources, with 6 paragraphs, 9 headings, and their correct matches for a matching exercise.'
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      top_p: 1,
      stream: false,
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      const parsedContent = JSON.parse(content) as ReadingData;
      if (
        parsedContent.title &&
        parsedContent.paragraphs && parsedContent.paragraphs.length === 6 &&
        parsedContent.headings && parsedContent.headings.length === 9 &&
        parsedContent.correctMatches && Object.keys(parsedContent.correctMatches).length === 6
      ) {
        passageData.value = parsedContent;
        userAnswers.value = Array(parsedContent.paragraphs.length).fill('');
      } else {
        throw new Error('AI response did not match the expected format (title, 6 paragraphs, 9 headings, 6 correctMatches).');
      }
    } else {
      throw new Error('No content received from AI.');
    }
  } catch (e: any) {
    console.error('Error fetching reading material:', e);
    error.value = e.message || 'Failed to fetch reading material. Ensure API key is correct and try again.';
    passageData.value = null;
  }
  loading.value = false;
}

function submitAnswers() {
  if (!passageData.value || !passageData.value.correctMatches) {
    alert('Cannot submit answers. Data is missing.');
    return;
  }
  if (userAnswers.value.some(answer => answer === '')) {
    alert('Please attempt to match a heading to all paragraphs.');
    return;
  }

  const feedback: Array<{ paragraph: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }> = [];
  let correctCount = 0;
  const paragraphLetters = passageData.value.paragraphs.map((_, i) => String.fromCharCode(65 + i));

  paragraphLetters.forEach((pLetter, index) => {
    const userAnswerRoman = userAnswers.value[index];
    const correctAnswerRoman = passageData.value!.correctMatches[pLetter];
    const isCorrect = userAnswerRoman === correctAnswerRoman;
    if (isCorrect) {
      correctCount++;
    }
    feedback.push({
      paragraph: `Paragraph ${pLetter}`,
      userAnswer: userAnswerRoman || 'Not Answered',
      correctAnswer: correctAnswerRoman,
      isCorrect,
    });
  });

  answerFeedback.value = feedback;
  score.value = (correctCount / passageData.value.paragraphs.length) * 100;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchReadingMaterial();
}

onMounted(() => {
  fetchReadingMaterial();
});

</script>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

.loader-container {
  min-height: 200px;
}
</style>