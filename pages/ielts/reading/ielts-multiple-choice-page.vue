<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Groq from 'groq-sdk'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'

interface QuestionMCQ {
  id: string
  questionNumber: number
  questionText: string
  options: string[] // e.g., ["Option A text", "Option B text", ...]
  correctAnswerLetter: string // e.g., "A", "B"
}

interface MultipleChoiceData {
  passageTitle: string
  passageText: string
  taskTitle: string
  instructions: string
  questions: QuestionMCQ[]
}

interface ResultDetail {
  questionNumber: number
  questionText: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  correctAnswerText: string
  userAnswerText: string
}
const groqApiKey = "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"; 

const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true })

const isLoading = ref(true)
const error = ref<string | null>(null)
const passageData = ref<MultipleChoiceData | null>(null)
const userAnswers = ref<Record<string, string>>({}) // Stores questionId: selectedOptionLetter
const results = ref<ResultDetail[]>([])
const score = ref(0)
const showResults = ref(false)

const exampleUserPrompt = "Generate a challenging IELTS multiple-choice reading task. The passage should be about the psychological effects of social media on adolescents, around 700-900 words, and academically toned. Include 5-7 multiple-choice questions, each with 4 distinct options (A, B, C, D). Ensure questions require inference and careful reading, not just keyword matching."

async function fetchMultipleChoiceMaterial() {
  isLoading.value = true
  error.value = null
  showResults.value = false
  userAnswers.value = {}
  results.value = []
  score.value = 0

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for generating IELTS reading test materials. Create a multiple-choice question set based on a provided passage. The passage should be long (700-900 words) and complex, suitable for an IELTS academic reading test. Generate 5-7 multiple-choice questions, each with 4 distinct options (labeled A, B, C, D). The questions should test deep understanding, inference, and the ability to identify specific information within the complex text. Output the content in JSON format with the following structure: { "passageTitle": "String", "passageText": "String (700-900 words)", "taskTitle": "String", "instructions": "String", "questions": [ { "id": "String (unique identifier, e.g., q1)", "questionNumber": Number, "questionText": "String", "options": ["String (Option A text)", "String (Option B text)", "String (Option C text)", "String (Option D text)"], "correctAnswerLetter": "String (A, B, C, or D)" } ] }. Ensure the options are plausible distractors and the correct answer is clearly supported by the passage but not overly obvious. The passage should be challenging.`
        },
        {
          role: 'user',
          content: exampleUserPrompt,
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 4000,
      top_p: 1,
      stream: false,
      response_format: { type: 'json_object' },
    })

    const content = chatCompletion.choices[0]?.message?.content
    if (content) {
      const parsedContent = JSON.parse(content) as MultipleChoiceData
      // Validate structure
      if (
        !parsedContent.passageTitle ||
        !parsedContent.passageText ||
        !parsedContent.taskTitle ||
        !parsedContent.instructions ||
        !Array.isArray(parsedContent.questions) ||
        !parsedContent.questions.every(
          q => 
            q.id && 
            typeof q.questionNumber === 'number' && 
            q.questionText && 
            Array.isArray(q.options) && 
            q.options.length === 4 && // Ensure 4 options
            q.correctAnswerLetter &&
            ['A', 'B', 'C', 'D'].includes(q.correctAnswerLetter) // Validate correctAnswerLetter
        )
      ) {
        throw new Error('Invalid data structure received from API.')
      }
      passageData.value = parsedContent
      // Initialize userAnswers
      parsedContent.questions.forEach(q => {
        userAnswers.value[q.id] = '' // Initialize with empty selection
      })
    } else {
      throw new Error('No content received from API.')
    }
  } catch (e: any) {
    console.error('Failed to fetch multiple choice material:', e)
    error.value = e.message || 'An unknown error occurred.'
  } finally {
    isLoading.value = false
  }
}

function getOptionLetter(index: number): string {
  return String.fromCharCode(65 + index) // A, B, C, D
}

function submitAnswers() {
  if (!passageData.value) return

  let correctAnswersCount = 0
  const detailedResults: ResultDetail[] = []

  passageData.value.questions.forEach(question => {
    const userAnswerLetter = userAnswers.value[question.id]
    const correctAnswerLetter = question.correctAnswerLetter
    const isCorrect = userAnswerLetter === correctAnswerLetter

    if (isCorrect) {
      correctAnswersCount++
    }

    const getOptionTextByLetter = (letter: string, q: QuestionMCQ) => {
      const index = letter.charCodeAt(0) - 65
      return (index >= 0 && index < q.options.length) ? q.options[index] : 'N/A'
    }

    detailedResults.push({
      questionNumber: question.questionNumber,
      questionText: question.questionText,
      userAnswer: userAnswerLetter || 'Not Answered',
      correctAnswer: correctAnswerLetter,
      isCorrect,
      userAnswerText: userAnswerLetter ? getOptionTextByLetter(userAnswerLetter, question) : 'Not Answered',
      correctAnswerText: getOptionTextByLetter(correctAnswerLetter, question)
    })
  })

  score.value = (correctAnswersCount / passageData.value.questions.length) * 100
  results.value = detailedResults
  showResults.value = true
}

onMounted(() => {
  fetchMultipleChoiceMaterial()
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <Card class="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-center text-primary">
          IELTS Reading: Multiple Choice Questions
        </CardTitle>
        <CardDescription class="text-center text-muted-foreground">
          {{ passageData?.taskTitle || 'Read the passage and answer the questions.' }}
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-if="isLoading" class="space-y-6">
      <Skeleton class="h-12 w-3/4 mx-auto" />
      <Skeleton class="h-64 w-full" />
      <div class="space-y-4">
        <Skeleton v-for="i in 3" :key="`skel-q-${i}`" class="h-24 w-full" />
      </div>
      <Skeleton class="h-10 w-32 mx-auto" />
    </div>

    <Alert v-if="error" variant="destructive" class="mb-6">
      <AlertCircle class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ error }} Please try refreshing the data.</AlertDescription>
      <Button @click="fetchMultipleChoiceMaterial" variant="outline" class="mt-2">Try Again</Button>
    </Alert>

    <div v-if="!isLoading && passageData">
      <Card class="mb-6 shadow-md">
        <CardHeader>
          <CardTitle class="text-xl font-semibold">{{ passageData.passageTitle }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="prose max-w-none dark:prose-invert whitespace-pre-line text-justify">
            <p>{{ passageData.passageText }}</p>
          </div>
        </CardContent>
      </Card>

      <Card class="mb-6 shadow-md">
        <CardHeader>
          <CardTitle class="text-lg font-semibold">Questions</CardTitle>
          <CardDescription>{{ passageData.instructions }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, qIndex) in passageData.questions" :key="question.id" class="p-4 border rounded-md bg-muted/20">
            <p class="font-medium mb-3">{{ question.questionNumber }}. {{ question.questionText }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="showResults">
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center space-x-2 mb-2">
                <RadioGroupItem :id="`${question.id}-option-${oIndex}`" :value="getOptionLetter(oIndex)" />
                <Label :for="`${question.id}-option-${oIndex}`" class="cursor-pointer">
                  <span class="font-semibold">{{ getOptionLetter(oIndex) }}.</span> {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="submitAnswers" :disabled="showResults || Object.values(userAnswers).some(ans => !ans)" class="w-full md:w-auto">
            Submit Answers
          </Button>
        </CardFooter>
      </Card>

      <div v-if="showResults">
        <Card class="shadow-md">
          <CardHeader>
            <CardTitle class="text-xl font-semibold">Results</CardTitle>
            <CardDescription>Your overall score: <span class="font-bold text-lg">{{ score.toFixed(2) }}%</span></CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-for="result in results" :key="result.questionNumber"
                 :class="['p-4 border rounded-md', result.isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30']">
              <p class="font-medium mb-1">Question {{ result.questionNumber }}: {{ result.questionText }}</p>
              <p :class="[result.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300']">
                Your answer: <span class="font-semibold">{{ result.userAnswer }}</span> ({{ result.userAnswerText }})
                <span v-if="!result.isCorrect">- Incorrect</span>
                <span v-else>- Correct</span>
              </p>
              <p v-if="!result.isCorrect" class="text-blue-700 dark:text-blue-300">
                Correct answer: <span class="font-semibold">{{ result.correctAnswer }}</span> ({{ result.correctAnswerText }})
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="fetchMultipleChoiceMaterial" variant="outline" class="w-full md:w-auto">Try Another Test</Button>
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
</style>