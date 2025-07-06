<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Info } from 'lucide-vue-next'

interface RhetoricalPurposeData {
  passageTitle: string
  passageText: string
  highlightedSentence: string
  paragraphNumberContainingSentence: number
  questionText: string
  options: { id: string; text: string }[]
  correctOptionId: string
  explanationOfIntent: string
}

interface Result {
  isCorrect: boolean
  selectedOptionId: string
  correctOptionId: string
  explanation: string
}

const isLoading     = ref(true)
const apiError      = ref<string | null>(null)
const questionData  = ref<RhetoricalPurposeData | null>(null)
const userAnswer    = ref<string | null>(null)
const result        = ref<Result | null>(null)
const showResults   = ref(false)

// 1) fetch helper
async function fetchQuestionMaterial() {
  // reset all state
  isLoading.value    = true
  apiError.value     = null
  questionData.value = null
  userAnswer.value   = null
  result.value       = null
  showResults.value  = false

  try {
    // replace with your real endpoint
    questionData.value = await $fetch<RhetoricalPurposeData>('https://flatlystudio.github.io/questions/TOEFL/READING_RHETORICAL_PURPOSE.output.getter.json')
  } catch (err: any) {
    apiError.value = err.message || 'Failed to load question'
  } finally {
    isLoading.value = false
  }
}

function submitAnswer() {
  if (!userAnswer.value || !questionData.value) return

  const correct = userAnswer.value === questionData.value.correctOptionId
  result.value = {
    isCorrect: correct,
    selectedOptionId: userAnswer.value,
    correctOptionId: questionData.value.correctOptionId,
    explanation: questionData.value.explanationOfIntent,
  }
  showResults.value = true
}

const passageWithHighlight = computed(() => {
  if (!questionData.value) return ''
  const { passageText, highlightedSentence } = questionData.value
  return "&nbsp;&nbsp;&nbsp;&nbsp;" + passageText.replace(
    highlightedSentence,
    `<span class="bg-red-900 text-white px-1 rounded">${highlightedSentence}</span>`
  ).replaceAll("\n\n", "\n\n&nbsp;&nbsp;&nbsp;&nbsp;")
})

onMounted(() => {
  fetchQuestionMaterial()
})

useHead({
  title: 'TOEFL Reading: Rhetorical Purpose | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Practice TOEFL rhetorical purpose questions with detailed explanations.' }
  ]
})
</script>


<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl min-h-screen">
    <Card class="mb-6 shadow-xl border-t-4 border-primary">
      <CardHeader>
        <CardTitle class="text-2xl sm:text-3xl font-bold text-center text-primary">
          TOEFL Reading: Rhetorical Purpose
        </CardTitle>
        <CardDescription v-if="!isLoading && questionData" class="text-center text-muted-foreground pt-1">
          {{ questionData.passageTitle || 'Read the passage and answer the question below.' }}
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-if="isLoading" class="space-y-6 p-4">
      <Skeleton class="h-8 w-3/4 mx-auto" />
      <Skeleton class="h-6 w-1/2 mx-auto mb-4" />
      <div class="space-y-2">
        <Skeleton v-for="i in 15" :key="`skel-passage-${i}`" class="h-4 w-full" :class="{'w-5/6': i % 3 === 0, 'w-2/3': i % 5 === 0}"/>
      </div>
      <Skeleton class="h-10 w-full mt-6" />
      <div class="space-y-3 mt-4">
        <Skeleton v-for="i in 4" :key="`skel-option-${i}`" class="h-10 w-full" />
      </div>
      <Skeleton class="h-12 w-32 mx-auto mt-6" />
    </div>

    <Alert v-if="apiError" variant="destructive" class="mb-6">
      <AlertCircle class="h-4 w-4" />
      <AlertTitle>Error Fetching Data</AlertTitle>
      <AlertDescription>{{ apiError }}</AlertDescription>
      <Button @click="fetchQuestionMaterial" variant="outline" size="sm" class="mt-3">Try Again</Button>
    </Alert>

    <div v-if="!isLoading && questionData" class="space-y-6">
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-xl font-semibold text-gray-800 dark:text-gray-100">Reading Passage</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-line text-justify leading-relaxed" v-html="passageWithHighlight"></div>
        </CardContent>
      </Card>

      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-lg font-semibold text-gray-800 dark:text-gray-100">Question</CardTitle>
          <CardDescription class="pt-1 text-gray-600 dark:text-gray-300">
            In paragraph {{ questionData.paragraphNumberContainingSentence }}, why does the author include the sentence: <strong class="text-primary">"{{ questionData.highlightedSentence }}"</strong>?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup v-model="userAnswer" :disabled="showResults" class="space-y-3">
            <div v-for="option in questionData.options" :key="option.id">
              <Label 
                :for="`option-${option.id}`" 
                :class="['flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-muted/60 dark:hover:bg-muted/30', 
                         userAnswer === option.id ? 'bg-primary/10 border-primary dark:bg-primary/20' : 'border-gray-300 dark:border-gray-700',
                         showResults && option.id === questionData.correctOptionId ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : '',
                         showResults && userAnswer === option.id && option.id !== questionData.correctOptionId ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : ''
                        ]">
                <RadioGroupItem :id="`option-${option.id}`" :value="option.id" class="mr-3" />
                <span class="text-sm text-gray-700 dark:text-gray-200">{{ option.id }}. {{ option.text }}</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter class="flex-col items-start sm:flex-row sm:justify-between gap-4 pt-5">
          <Button @click="submitAnswer" :disabled="!userAnswer || showResults" class="w-full sm:w-auto">
            Submit Answer
          </Button>
          <Button v-if="showResults" @click="fetchQuestionMaterial" variant="outline" class="w-full sm:w-auto">
            Try Another Question
          </Button>
        </CardFooter>
      </Card>

      <div v-if="showResults && result">
        <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="shadow-md">
          <component :is="result.isCorrect ? CheckCircle2 : AlertCircle" class="h-5 w-5" />
          <AlertTitle class="font-semibold text-lg">
            {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}
          </AlertTitle>
          <AlertDescription class="mt-1">
            <span v-if="!result.isCorrect">
              You selected option {{ result.selectedOptionId }}. The correct option was {{ result.correctOptionId }}.
            </span>
            <span v-else>
              You correctly identified the author's purpose!
            </span>
          </AlertDescription>
        </Alert>

        <Alert variant="info" class="mt-4 shadow-md bg-blue-50 dark:bg-blue-900/30 border-blue-500">
            <Info class="h-5 w-5 text-blue-700 dark:text-blue-300" />
            <AlertTitle class="font-semibold text-blue-800 dark:text-blue-200">Author's Intent Explanation</AlertTitle>
            <AlertDescription class="mt-1 text-blue-700 dark:text-blue-300 prose prose-sm max-w-none">
                {{ result.explanation }}
            </AlertDescription>
        </Alert>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :deep(mark) {
  background-color: hsl(var(--primary) / 0.2);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  font-weight: 600;
}
.dark .prose :deep(mark) {
   background-color: hsl(var(--primary) / 0.3);
}
</style>