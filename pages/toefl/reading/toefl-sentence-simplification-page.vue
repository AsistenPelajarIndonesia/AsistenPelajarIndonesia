<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  AlertCircle, CheckCircle2, ChevronsUpDown, RefreshCw
} from "lucide-vue-next";

// --- Interfaces ---
interface SentenceSimplificationData {
  passageTitle: string;
  passageText: string;
  originalSentence: string;
  questionText: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

interface SimplificationResult {
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
  explanation: string;
  originalSentence: string;
}

// --- Reactive State ---
const isLoading           = ref(true);
const apiError            = ref<string | null>(null);
const questionData        = ref<SentenceSimplificationData | null>(null);
const userAnswer          = ref<string | null>(null);
const result              = ref<SimplificationResult | null>(null);
const showResults         = ref(false);
const isExplanationOpen   = ref(false);

// 1) fetch helper
async function fetchSentenceSimplificationQuestion() {
  // reset everything
  isLoading.value          = true;
  apiError.value           = null;
  questionData.value       = null;
  userAnswer.value         = null;
  result.value             = null;
  showResults.value        = false;
  isExplanationOpen.value  = false;

  try {
    questionData.value = await $fetch<SentenceSimplificationData>(
      "https://flatlystudio.github.io/questions/TOEFL/READING_SENTENCE_SIMPLIFICATION.output.getter.json"
    );
  } catch (err: any) {
    apiError.value = err.message || "Failed to load question";
  } finally {
    isLoading.value = false;
  }
}

function submitAnswer() {
  if (!userAnswer.value || !questionData.value) return;
  const correct = userAnswer.value === questionData.value.correctOptionId;
  result.value = {
    isCorrect: correct,
    selectedOptionId: userAnswer.value,
    correctOptionId: questionData.value.correctOptionId,
    explanation: questionData.value.explanation,
    originalSentence: questionData.value.originalSentence,
  };
  showResults.value       = true;
  isExplanationOpen.value = true;
}

const passageWithHighlight = computed(() => {
  if (!questionData.value) return "";
  const { passageText, originalSentence } = questionData.value;
  const esc = originalSentence.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re  = new RegExp(`(${esc})`, "g");
  return passageText.replace(
    re,
    `<span class="bg-red-900 text-white px-1 rounded">$1</span>`
  );
});

onMounted(() => {
  fetchSentenceSimplificationQuestion();
});

useHead({
  title: "TOEFL Reading: Sentence Simplification Practice | Akademi Pelajar",
  meta: [
    {
      name: "description",
      content:
        "Practice TOEFL sentence simplification questions with AI-generated passages and detailed explanations.",
    },
  ],
});
</script>

<template>
  <div
    class="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl bg-slate-100 dark:bg-slate-900 min-h-screen"
  >
    <Card
      class="mb-6 shadow-lg border-t-4 border-blue-600 dark:border-blue-500"
    >
      <CardHeader>
        <CardTitle
          class="text-2xl sm:text-3xl font-bold text-center text-blue-700 dark:text-blue-400"
        >
          TOEFL Reading: Sentence Simplification
        </CardTitle>
        <CardDescription
          v-if="!isLoading && questionData && questionData.passageTitle"
          class="text-center text-muted-foreground pt-1"
        >
          {{ questionData.passageTitle }}
        </CardDescription>
        <CardDescription
          v-else-if="!isLoading && questionData"
          class="text-center text-muted-foreground pt-1"
        >
          Read the passage and answer the question about the highlighted
          sentence.
        </CardDescription>
      </CardHeader>
    </Card>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="space-y-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow"
    >
      <Skeleton class="h-8 w-3/4 mx-auto" />
      <Skeleton class="h-6 w-1/2 mx-auto mb-4" />
      <div class="space-y-2">
        <Skeleton
          v-for="i in 15"
          :key="`skel-passage-${i}`"
          class="h-4 w-full"
        />
      </div>
      <Skeleton class="h-10 w-1/3 mt-6" />
      <div class="space-y-3 pt-4">
        <Skeleton v-for="i in 4" :key="`skel-option-${i}`" class="h-8 w-full" />
      </div>
      <Skeleton class="h-10 w-1/4 mt-4" />
    </div>

    <!-- Error State -->
    <Alert v-if="apiError && !isLoading" variant="destructive" class="mb-6">
      <AlertCircle class="h-5 w-5" />
      <AlertTitle>Error Fetching Question</AlertTitle>
      <AlertDescription>
        {{ apiError }}
        <Button
          @click="fetchSentenceSimplificationQuestion"
          variant="outline"
          size="sm"
          class="mt-2 ml-2"
        >
          <RefreshCw class="w-4 h-4 mr-2" /> Try Again
        </Button>
      </AlertDescription>
    </Alert>

    <!-- Content Display -->
    <div v-if="!isLoading && !apiError && questionData">
      <Card class="mb-6 bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <CardTitle
            class="text-xl font-semibold text-slate-800 dark:text-slate-200"
            >Passage</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div
            class="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed text-justify"
            v-html="passageWithHighlight"
          ></div>
        </CardContent>
      </Card>

      <Card class="mb-6 bg-white dark:bg-slate-800 shadow-md">
        <CardHeader>
          <CardTitle
            class="text-lg font-semibold text-slate-800 dark:text-slate-200"
            >Question</CardTitle
          >
          <CardDescription class="text-slate-600 dark:text-slate-400">
            {{ questionData.questionText }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            v-model="userAnswer"
            :disabled="showResults"
            class="space-y-3"
          >
            <div
              v-for="option in questionData.options"
              :key="option.id"
              class="flex items-center space-x-3 p-3 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              :class="{
                'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400':
                  userAnswer === option.id && !showResults,
              }"
            >
              <RadioGroupItem :id="`option-${option.id}`" :value="option.id" />
              <Label
                :for="`option-${option.id}`"
                class="flex-1 cursor-pointer text-sm text-slate-800 dark:text-slate-200"
              >
                <span class="font-semibold">{{ option.id }}.</span>
                {{ option.text }}
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter
          class="flex flex-col sm:flex-row justify-between items-center pt-4"
        >
          <Button
            @click="submitAnswer"
            :disabled="!userAnswer || showResults"
            class="w-full sm:w-auto mb-2 sm:mb-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit Answer
          </Button>
          <Button
            v-if="showResults"
            @click="fetchSentenceSimplificationQuestion"
            variant="outline"
            class="w-full sm:w-auto"
          >
            <RefreshCw class="w-4 h-4 mr-2" /> Try Another Question
          </Button>
        </CardFooter>
      </Card>

      <!-- Results and Explanation -->
      <div v-if="showResults && result">
        <Alert
          :variant="result.isCorrect ? 'default' : 'destructive'"
          class="mb-6 border-l-4"
          :class="
            result.isCorrect
              ? 'border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-600'
              : 'border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-600'
          "
        >
          <component
            :is="result.isCorrect ? CheckCircle2 : AlertCircle"
            class="h-6 w-6"
            :class="
              result.isCorrect
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            "
          />
          <AlertTitle
            class="text-lg font-semibold"
            :class="
              result.isCorrect
                ? 'text-green-800 dark:text-green-300'
                : 'text-red-800 dark:text-red-300'
            "
          >
            {{ result.isCorrect ? "Correct!" : "Incorrect" }}
          </AlertTitle>
          <AlertDescription
            class="mt-1 text-sm"
            :class="
              result.isCorrect
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            "
          >
            You selected option {{ result.selectedOptionId }}. The correct
            option was {{ result.correctOptionId }}.
          </AlertDescription>
        </Alert>

        <Collapsible
          v-model:open="isExplanationOpen"
          class="bg-white dark:bg-slate-800 rounded-lg shadow-md"
        >
          <CollapsibleTrigger as-child>
            <Button
              variant="ghost"
              class="w-full flex justify-between items-center p-4 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            >
              <span class="font-semibold">View Detailed Explanation</span>
              <ChevronsUpDown
                class="h-5 w-5 transition-transform"
                :class="[isExplanationOpen && 'rotate-180']"
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent
            class="p-4 border-t border-slate-200 dark:border-slate-700"
          >
            <h4
              class="font-semibold text-md mb-2 text-slate-800 dark:text-slate-200"
            >
              Original Sentence:
            </h4>
            <p class="italic mb-3 text-slate-600 dark:text-slate-400">
              "{{ result.originalSentence }}"
            </p>
            <h4
              class="font-semibold text-md mb-2 text-slate-800 dark:text-slate-200"
            >
              Explanation:
            </h4>
            <div
              class="prose prose-sm max-w-none dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed"
              v-html="result.explanation"
            ></div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>

    <!-- Fallback for no data and no error (should ideally not happen if API call is made on mount) -->
    <div
      v-if="!isLoading && !apiError && !questionData"
      class="text-center py-10"
    >
      <p class="text-slate-500 dark:text-slate-400">
        No question data available. Try refreshing.
      </p>
      <Button
        @click="fetchSentenceSimplificationQuestion"
        variant="outline"
        class="mt-4"
      >
        <RefreshCw class="w-4 h-4 mr-2" /> Load Question
      </Button>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles can be added here if needed */
.prose :where(mark):not(:where([class~="not-prose"] *)) {
  @apply bg-yellow-300 dark:bg-yellow-500/70 px-1 py-0.5 rounded font-semibold;
}
</style>
