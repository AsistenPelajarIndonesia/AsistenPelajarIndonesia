<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Groq from 'groq-sdk'  // if you actually need it; otherwise remove
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertCircle, CheckCircle2, ChevronsUpDown, HelpCircle, RefreshCw
} from 'lucide-vue-next'

// --- Interfaces ---
interface NegativeFactualData {
  passageTitle: string;
  passageText: string;
  questionText: string;
  options: { id: string; text: string; }[];
  correctOptionId: string;
  explanation: string;
}

interface AnswerResult {
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
  explanation: string;
}

// --- Reactive State ---
const isLoading          = ref(true)
const apiError           = ref<string | null>(null)
const questionData       = ref<NegativeFactualData | null>(null)
const userAnswer         = ref<string | null>(null)
const result             = ref<AnswerResult | null>(null)
const showResults        = ref(false)
const isExplanationOpen  = ref(false)

// 1) fetch helper
async function fetchNegativeFactualQuestion() {
  // reset everything
  isLoading.value         = true
  apiError.value          = null
  questionData.value      = null
  userAnswer.value        = null
  result.value            = null
  showResults.value       = false
  isExplanationOpen.value = false

  try {
    // replace this path with your real API route
    questionData.value = await $fetch<NegativeFactualData>('https://flatlystudio.github.io/questions/TOEFL/READING_NEGATIVE_FACTUAL.output.getter.json')
  } catch (err: any) {
    apiError.value = err.message || 'Failed to load question'
  } finally {
    isLoading.value = false
  }
}

function submitAnswer() {
  if (!userAnswer.value || !questionData.value) return

  const isCorrect = userAnswer.value === questionData.value.correctOptionId
  result.value = {
    isCorrect,
    selectedOptionId: userAnswer.value,
    correctOptionId: questionData.value.correctOptionId,
    explanation: questionData.value.explanation,
  }
  showResults.value       = true
  isExplanationOpen.value = true
}

// --- Lifecycle Hooks ---
onMounted(() => {
  fetchNegativeFactualQuestion()
})

// --- SEO and Meta ---
useHead({
  title: "TOEFL Reading: Negative Factual Information | Akademi Pelajar",
  meta: [
    {
      name: "description",
      content:
        "Practice TOEFL Negative Factual Information questions (NOT/EXCEPT) with detailed explanations.",
    },
  ],
})
</script>

<template>
  <div
    class="min-h-screenp-4 sm:p-6 lg:p-8"
  >
    <div class="max-w-4xl mx-auto">
      <Card
        class="mb-6 shadow-xl border-t-4 border-red-600 dark:border-red-500"
      >
        <CardHeader>
          <CardTitle
            class="text-2xl sm:text-3xl font-bold text-center text-red-700 dark:text-red-400"
          >
            TOEFL Reading: Negative Factual Information
          </CardTitle>
          <CardDescription
            v-if="!isLoading && questionData?.passageTitle"
            class="text-center text-muted-foreground pt-1"
          >
            {{ questionData.passageTitle }}
          </CardDescription>
        </CardHeader>
      </Card>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="space-y-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
      >
        <Skeleton class="h-8 w-3/4 mx-auto" />
        <Skeleton class="h-6 w-1/2 mx-auto mb-6" />
        <div class="space-y-3">
          <Skeleton
            v-for="i in 18"
            :key="`skel-passage-${i}`"
            class="h-4 w-full"
          />
        </div>
        <Skeleton class="h-10 w-2/5 mt-8" />
        <div class="space-y-4 pt-5">
          <Skeleton
            v-for="i in 4"
            :key="`skel-option-${i}`"
            class="h-9 w-full"
          />
        </div>
        <Skeleton class="h-11 w-1/3 mt-5" />
      </div>

      <!-- Error State -->
      <Alert v-if="apiError && !isLoading" variant="destructive" class="mb-6">
        <AlertCircle class="h-5 w-5" />
        <AlertTitle>Error Fetching Question</AlertTitle>
        <AlertDescription>
          {{ apiError }}
          <Button
            @click="fetchNegativeFactualQuestion"
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
              >Reading Passage</CardTitle
            >
          </CardHeader>
          <CardContent>
            <div
              class="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed text-justify"
              v-html="questionData.passageText"
            ></div>
          </CardContent>
        </Card>

        <Card class="mb-6 bg-white dark:bg-slate-800 shadow-md">
          <CardHeader>
            <CardTitle
              class="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center"
            >
              Question
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="ghost" size="icon" class="ml-2 h-6 w-6">
                    <HelpCircle class="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-80 text-sm">
                  For Negative Factual Information questions, you need to find
                  the answer choice that is NOT mentioned in the passage, or is
                  stated INCORRECTLY according to the passage. Three of the
                  choices will be true, one will be the exception.
                </PopoverContent>
              </Popover>
            </CardTitle>
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
                  'border-red-500 dark:border-red-400 ring-2 ring-red-500 dark:ring-red-400':
                    userAnswer === option.id && !showResults,
                  'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-600':
                    showResults &&
                    option.id === questionData.correctOptionId &&
                    option.id === userAnswer,
                  'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-600':
                    showResults &&
                    option.id !== questionData.correctOptionId &&
                    option.id === userAnswer,
                  'border-green-500 dark:border-green-600':
                    showResults &&
                    option.id === questionData.correctOptionId &&
                    option.id !== userAnswer,
                }"
              >
                <RadioGroupItem
                  :id="`option-${option.id}`"
                  :value="option.id"
                />
                <Label
                  :for="`option-${option.id}`"
                  class="flex-1 cursor-pointer text-sm"
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
              class="w-full sm:w-auto mb-2 sm:mb-0 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Submit Answer
            </Button>
            <Button
              v-if="showResults"
              @click="fetchNegativeFactualQuestion"
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
              answer (the one NOT mentioned or an EXCEPTION) was option
              {{ result.correctOptionId }}.
            </AlertDescription>
          </Alert>

          <Collapsible
            v-model:open="isExplanationOpen"
            class="bg-white dark:bg-slate-800 rounded-lg shadow-md"
          >
            <CollapsibleTrigger as-child>
              <Button
                variant="ghost"
                class="w-full flex justify-between items-center p-4 hover:bg-slate-100 dark:hover:bg-slate-700/50"
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
              <div
                class="prose prose-sm max-w-none dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed"
                v-html="result.explanation"
              ></div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div
        v-if="!isLoading && !apiError && !questionData"
        class="text-center py-10"
      >
        <p class="text-slate-500 dark:text-slate-400">
          No question data available. Try refreshing.
        </p>
        <Button
          @click="fetchNegativeFactualQuestion"
          variant="outline"
          class="mt-4"
        >
          <RefreshCw class="w-4 h-4 mr-2" /> Load Question
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-bottom: 0.75em;
}
</style>
