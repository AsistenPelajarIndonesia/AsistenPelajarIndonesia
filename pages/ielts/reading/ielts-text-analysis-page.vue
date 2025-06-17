<script setup lang="ts">
import { ref, onMounted } from "vue";
import Groq from "groq-sdk";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Added for results

const groqApiKey = "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";

const groq = new Groq({
  apiKey: groqApiKey,
  dangerouslyAllowBrowser: true,
});

interface PassageData {
  title: string;
  paragraphs: string[];
  statements: string[];
  correctAnswers: string[]; // e.g., ["C", "A", "F", "B", "D"]
}

const passageData = ref<PassageData | null>(null);
const userAnswers = ref<string[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<
  Array<{ userAnswer: string; correctAnswer: string; isCorrect: boolean }>
>([]);
const score = ref(0);

async function fetchReadingMaterial() {
  loading.value = true;
  error.value = null;
  showResults.value = false; // Reset results display
  passageData.value = null;
  userAnswers.value = [];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an IELTS test content generator. Create a reading passage with exactly 6 paragraphs. The passage should be suitable for IELTS academic reading. After the passage, provide exactly 5 statements. Each statement must correspond to information found in one of the paragraphs. For each statement, also provide the letter (A-F) of the paragraph that contains the information. Format your response as a JSON object with four keys: "title" (a short title for the passage), "paragraphs" (an array of 6 strings, each being a paragraph), "statements" (an array of 5 strings, each being a statement), and "correctAnswers" (an array of 5 strings, where each string is the correct paragraph letter like "A", "B", "C", "D", "E", or "F" for the corresponding statement). Ensure the order of correctAnswers matches the order of statements.`,
        },
        {
          role: "user",
          content:
            "Generate an IELTS reading passage with 6 paragraphs, 5 statements, and their corresponding correct paragraph letters (A-F) about the impact of renewable energy sources.",
        },
      ],      model: 'llama-3.3-70b-versatile',

      temperature: 0.7,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      const parsedContent = JSON.parse(content) as PassageData;
      if (
        parsedContent.paragraphs &&
        parsedContent.paragraphs.length === 6 &&
        parsedContent.statements &&
        parsedContent.statements.length === 5 &&
        parsedContent.correctAnswers &&
        parsedContent.correctAnswers.length === 5 &&
        parsedContent.correctAnswers.every((ans) =>
          /^[A-F]$/.test(ans.toUpperCase())
        )
      ) {
        passageData.value = parsedContent;
        // Convert correct answers from AI to uppercase for consistent comparison
        passageData.value.correctAnswers = parsedContent.correctAnswers.map(
          (ans) => ans.toUpperCase()
        );
        userAnswers.value = Array(5).fill("");
      } else {
        throw new Error(
          "AI response did not match the expected format or content (6 paragraphs, 5 statements, 5 valid A-F correct answers)."
        );
      }
    } else {
      throw new Error("No content received from AI.");
    }
  } catch (e: any) {
    console.error("Error fetching reading material:", e);
    error.value =
      e.message ||
      "Failed to fetch reading material. Please ensure your API key is correct and try again.";
    passageData.value = null;
  }
  loading.value = false;
}

function validateInput(index: number) {
  let value = userAnswers.value[index].toUpperCase();
  if (!/^[A-F]?$/.test(value)) {
    value = value.slice(0, -1);
  }
  userAnswers.value[index] = value;
}

function submitAnswers() {
  if (userAnswers.value.some((answer) => answer === "")) {
    alert("Please answer all questions before submitting.");
    return;
  }

  if (!passageData.value) return;

  let currentScore = 0;
  const feedback: Array<{
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }> = [];

  for (let i = 0; i < passageData.value.statements.length; i++) {
    const userAns = userAnswers.value[i].toUpperCase();
    const correctAns = passageData.value.correctAnswers[i].toUpperCase();
    const isCorrect = userAns === correctAns;
    if (isCorrect) {
      currentScore++;
    }
    feedback.push({
      userAnswer: userAns,
      correctAnswer: correctAns,
      isCorrect: isCorrect,
    });
  }

  score.value = currentScore;
  answerFeedback.value = feedback;
  showResults.value = true;
}

function startNewTest() {
  fetchReadingMaterial();
}

onMounted(() => {
  fetchReadingMaterial();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 lg:p-8 text-gray-100"
  >
    <div class="max-w-4xl mx-auto">
      <header class="mb-8 text-center">
        <h1
          class="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:text-5xl"
        >
          IELTS Text Analysis
        </h1>
        <p class="mt-3 text-lg text-slate-400">
          Read the passage and answer the questions below.
        </p>
      </header>

      <div
        v-if="loading"
        class="loader-container my-10 flex justify-center items-center"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        ></div>
        <p class="ml-3 text-slate-300">Generating your reading passage...</p>
      </div>

      <div
        v-if="error && !loading"
        class="error-message my-10 p-4 bg-red-700 bg-opacity-50 rounded-lg text-center"
      >
        <p class="text-red-300 font-semibold">Oops! Something went wrong:</p>
        <p class="text-red-400">{{ error }}</p>
        <Button class="mt-4" @click="fetchReadingMaterial">Try Again</Button>
      </div>

      <div v-if="!loading && !error && passageData && !showResults">
        <Card class="mb-8 bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle class="text-2xl font-semibold text-purple-300">{{
              passageData.title || "Reading Passage"
            }}</CardTitle>
          </CardHeader>
          <CardContent class="prose prose-invert max-w-none text-slate-300">
            <div
              v-for="(paragraph, index) in passageData.paragraphs"
              :key="index"
              class="mb-4"
            >
              <strong class="text-pink-400"
                >Paragraph {{ String.fromCharCode(65 + index) }}</strong
              >
              <p>{{ paragraph }}</p>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle class="text-2xl font-semibold text-purple-300"
              >Questions</CardTitle
            >
            <CardDescription class="text-slate-400">
              Which paragraph contains the following information? Write the
              correct letter, A-F, in the boxes below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              v-for="(statement, index) in passageData.statements"
              :key="index"
              class="mb-6 p-4 bg-slate-700/50 rounded-lg flex items-center space-x-4"
            >
              <p class="flex-grow text-slate-300">
                {{ index + 1 }}. {{ statement }}
              </p>
              <Input
                type="text"
                v-model="userAnswers[index]"
                class="w-16 h-10 text-center bg-slate-700 border-slate-600 text-pink-300 placeholder-slate-500 focus:ring-pink-500 focus:border-pink-500 uppercase"
                maxlength="1"
                placeholder="A-F"
                @input="validateInput(index)"
                :disabled="showResults"
              />
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <Button
              @click="submitAnswers"
              class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Submit Answers
            </Button>
          </CardFooter>
        </Card>
      </div>

      <!-- Results Section -->
      <div v-if="showResults && passageData">
        <Alert class="mb-8 bg-slate-800 border-slate-700 text-slate-200">
          <AlertTitle class="text-2xl font-semibold text-purple-300"
            >Results</AlertTitle
          >
          <AlertDescription class="text-lg text-slate-300">
            You scored {{ score }} out of {{ passageData.statements.length }}.
          </AlertDescription>
        </Alert>

        <Card class="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle class="text-xl font-semibold text-purple-300"
              >Detailed Feedback</CardTitle
            >
          </CardHeader>
          <CardContent>
            <div
              v-for="(feedback, index) in answerFeedback"
              :key="index"
              class="mb-4 p-4 rounded-lg"
              :class="
                feedback.isCorrect
                  ? 'bg-green-700/30 border-green-600'
                  : 'bg-red-700/30 border-red-600'
              "
            >
              <p class="text-slate-300 font-medium">
                Statement {{ index + 1 }}: {{ passageData.statements[index] }}
              </p>
              <p
                :class="feedback.isCorrect ? 'text-green-300' : 'text-red-300'"
              >
                Your answer:
                <span class="font-bold">{{
                  feedback.userAnswer || "Not answered"
                }}</span>
                <span v-if="feedback.isCorrect"> (Correct)</span>
              </p>
              <p v-if="!feedback.isCorrect" class="text-yellow-400">
                Correct answer:
                <span class="font-bold">{{ feedback.correctAnswer }}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <Button
              @click="startNewTest"
              class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Try Another Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling, can be expanded with Tailwind utility classes directly in template or more specific CSS here */
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.loader-container {
  min-height: 200px; /* Ensure loader is visible during loading state */
}

/* Customizing input appearance slightly */
input[type="text"]:focus {
  box-shadow: 0 0 0 2px theme("colors.pink.500");
}
</style>
