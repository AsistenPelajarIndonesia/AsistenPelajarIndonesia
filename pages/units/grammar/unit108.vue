<!--
  File: pages/units/grammar/1.vue
  Unit: 1 - Word order 1: Verb + object; Place and time
  Description: An advanced, interactive grammar practice page for Nuxt 3.
  This page provides in-depth learning material, challenging exercises, and a
  sophisticated validation system with detailed feedback to help students master
  English word order.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

// --- Layout & Component Imports ---
// We're using the custom GrammarLayout and UI components from a library like shadcn-vue.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = 'English Grammar In Use Practice'
const testDescription = 'Based on the curriculum by Raymond Murphy'
const unitTitle = 'Unit 1: Word order 1: Verb + object; place and time'
const unitDescription = 'This unit focuses on the fundamental structure of English sentences, specifically the arrangement of the verb, its object, and adverbial phrases of place and time. Mastering this is crucial for clear and natural communication.'
const categories = ['Sentence Structure', 'Word Order', 'Adverbials']

// --- Navigation ---
const router = useRouter()
// Note: In a real app, you would have logic to determine if these units exist.
function goToPreviousUnit() {
  // Unit 1 is the first, so this might navigate to an index page or be disabled.
  // For this example, we'll just log it. A real implementation could be:
  // router.push('/units/grammar')
  console.log('Attempting to go to the previous unit (index).')
}
function goToNextUnit() {
  router.push('/units/grammar/2')
}

// --- Question & Answer State Management ---
// A comprehensive structure for each question.
interface Question {
  id: number
  type: 'scramble' | 'error-correction'
  prompt: string
  elements: string[] | string // Scrambled words or incorrect sentence
  correctAnswer: string
  explanation: string
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'scramble',
    prompt: 'Arrange the words to form a grammatically correct sentence.',
    elements: ['(every morning)', '(the newspaper)', '(in the kitchen)', '(my father)', '(reads)'],
    correctAnswer: 'My father reads the newspaper in the kitchen every morning.',
    explanation: "The standard word order is Subject (My father) + Verb (reads) + Object (the newspaper) + Place (in the kitchen) + Time (every morning). 'Place' almost always precedes 'Time' in neutral sentences."
  },
  {
    id: 2,
    type: 'error-correction',
    prompt: 'Find and correct the word order error in the following sentence.',
    elements: 'She bought at the new mall a beautiful dress yesterday.',
    correctAnswer: 'She bought a beautiful dress at the new mall yesterday.',
    explanation: "The direct object ('a beautiful dress') must come immediately after the verb ('bought'). The structure is Verb + Object. Adverbial phrases of place ('at the new mall') and time ('yesterday') follow the object."
  },
  {
    id: 3,
    type: 'scramble',
    prompt: 'This sentence includes a longer time phrase. Arrange the words correctly.',
    elements: ['(we)', '(for three hours)', '(walked)', '(in the park)', '(on Sunday afternoon)'],
    correctAnswer: 'We walked in the park for three hours on Sunday afternoon.',
    explanation: "Here we have a verb without a direct object ('walked'). The order is Verb + Place (in the park) + Time. When multiple time phrases exist, the more specific ('for three hours') often follows the general one ('on Sunday afternoon'), but in this verb-of-motion context, Place -> Duration -> Time is most natural."
  },
  {
    id: 4,
    type: 'error-correction',
    prompt: 'This sentence has a common word order mistake. Correct it.',
    elements: 'I send every week an email to my clients.',
    correctAnswer: 'I send an email to my clients every week.',
    explanation: "While frequency adverbs like 'often' or 'always' can go before the verb, longer time phrases like 'every week' are typically placed at the end of the clause, after the object and any prepositional phrases (like 'to my clients')."
  },
  {
    id: 5,
    type: 'scramble',
    prompt: 'This one is tricky and involves a verb of motion and a specific destination.',
    elements: ['(I)', '(have to go)', '(early tomorrow morning)', '(to the airport)'],
    correctAnswer: 'I have to go to the airport early tomorrow morning.',
    explanation: "With verbs of motion ('go', 'travel', 'drive'), the destination (place) is crucial and comes first. The structure is Verb + Place (to the airport) + Time (early tomorrow morning). Reversing them would sound unnatural."
  },
  {
    id: 6,
    type: 'error-correction',
    prompt: 'Correct the word order. Think about the flow of information.',
    elements: 'He built over two years a successful company from his garage.',
    correctAnswer: 'He built a successful company from his garage over two years.',
    explanation: "The core idea is 'He built a company'. The direct object ('a successful company') should follow the verb. The 'where' ('from his garage') and 'how long' ('over two years') follow the core idea. Place ('from his garage') before Time ('over two years') is the standard sequence."
  }
])

// --- Reactive State for User Interaction ---
const userAnswers = ref<string[]>(Array(questions.length).fill(''))
const results = ref<Array<{ id: number; userAnswer: string; correctAnswer: string; isCorrect: boolean; explanation: string }>>([])
const showResult = ref(false)

const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.length) * 100)
})

const isAllQuestionsAnswered = computed(() => {
  return userAnswers.value.every(answer => answer.trim() !== '')
})

// --- Core Logic: The Validator ---
function validateAnswers() {
  if (!isAllQuestionsAnswered.value) return

  const validationResults = questions.map((question, index) => {
    const userAnswer = userAnswers.value[index].trim()
    // Normalize by removing punctuation for a more robust check, but keep case sensitivity for 'I'
    const normalizedUserAnswer = userAnswer.replace(/[.,!?]/g, '')
    const normalizedCorrectAnswer = question.correctAnswer.replace(/[.,!?]/g, '')
    
    // A simple but effective check for word order
    const isCorrect = normalizedUserAnswer.toLowerCase() === normalizedCorrectAnswer.toLowerCase()

    return {
      id: question.id,
      userAnswer: userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation
    }
  })

  results.value = validationResults
  showResult.value = true
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material - The Learning Content                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Core Principle: S-V-O</CardTitle>
          <CardDescription>Subject - Verb - Object</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">In English, the verb and its object usually go together. You should not put other words between them.</p>
          <ul class="list-disc space-y-2 pl-5 text-sm">
            <li>
              <span class="text-green-600 dark:text-green-400">✔ She speaks English fluently.</span>
            </li>
            <li>
              <span class="text-red-600 dark:text-red-400">✘ She speaks fluently English.</span> (Incorrect: Adverb between verb and object)
            </li>
            <li>
              <span class="text-green-600 dark:text-green-400">✔ Did you see the film yesterday?</span>
            </li>
            <li>
              <span class="text-red-600 dark:text-red-400">✘ Did you see yesterday the film?</span> (Incorrect: Time between verb and object)
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card class="border-blue-500/50">
        <CardHeader>
          <CardTitle>The Golden Rule: Place before Time</CardTitle>
          <CardDescription>Where before When</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">When you have both a place and a time expression in a sentence, the standard order is: <br> <code class="rounded bg-muted px-2 py-1 font-mono">... + place + time</code></p>
          <p>Think of it as moving from a specific location to a specific point in time.</p>
          <div class="rounded-md border bg-muted/50 p-4">
            <p>They arrived <strong class="text-blue-600 dark:text-blue-400">at the hotel</strong> <strong class="text-purple-600 dark:text-purple-400">late at night</strong>.</p>
            <p class="text-sm">
              <span class="text-blue-600 dark:text-blue-400">[PLACE]</span> before <span class="text-purple-600 dark:text-purple-400">[TIME]</span>
            </p>
          </div>
          <div class="rounded-md border bg-muted/50 p-4">
            <p>I wouldn't like to live <strong class="text-blue-600 dark:text-blue-400">in that house</strong>.</p>
            <p class="text-sm">
              No time expression needed. The structure remains logical.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Exception: Emphasis</CardTitle>
          <CardDescription>Changing order for stylistic effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can put the time expression at the beginning of the sentence for emphasis or to set the scene. This is common in writing and speaking.</p>
          <p class="mt-2 rounded-md border border-dashed p-4">
            <strong class="text-purple-600 dark:text-purple-400">Every evening</strong>, he walks his dog <strong class="text-blue-600 dark:text-blue-400">in the park</strong>.
          </p>
          <p class="mt-2 text-sm text-muted-foreground">Notice that the <span class="text-blue-600 dark:text-blue-400">[PLACE]</span> expression still follows the verb/object.</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice - The Interactive Exercises                             -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Apply what you've learned. Type your answers in the boxes below.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <label :for="`question-${question.id}`" class="text-sm font-medium">
              Question {{ index + 1 }}: {{ question.prompt }}
            </label>
            <div v-if="question.type === 'scramble'" class="flex flex-wrap gap-2">
              <Badge v-for="part in question.elements" :key="part" variant="secondary">{{ part }}</Badge>
            </div>
            <p v-if="question.type === 'error-correction'" class="rounded-md bg-destructive/10 p-2 italic text-destructive dark:text-red-400">
              "{{ question.elements }}"
            </p>
            <Input
              :id="`question-${question.id}`"
              v-model="userAnswers[index]"
              type="text"
              placeholder="Your answer..."
              :disabled="showResult"
              @keyup.enter="validateAnswers"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button :disabled="!isAllQuestionsAnswered || showResult" @click="validateAnswers">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result - The Validation and Feedback Panel                       -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4">
            <p class="text-muted-foreground">Overall Score: {{ score }}%</p>
            <Progress :model-value="score" class="w-[60%]" />
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <Alert v-if="score === 100" variant="default" class="border-green-500 bg-green-500/10 text-green-700 dark:text-green-300">
            <CheckCircle2 class="h-4 w-4 !text-green-500" />
            <AlertTitle>Excellent Work!</AlertTitle>
            <AlertDescription>You have a perfect understanding of this unit's concepts. Your command of English word order is superb!</AlertDescription>
          </Alert>
          <Alert v-else-if="score >= 60" variant="default" class="border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
            <AlertTriangle class="h-4 w-4 !text-yellow-500" />
            <AlertTitle>Good Progress!</AlertTitle>
            <AlertDescription>You're on the right track. Review the explanations for the questions you missed to solidify your understanding.</AlertDescription>
          </Alert>
          <Alert v-else variant="destructive">
            <XCircle class="h-4 w-4" />
            <AlertTitle>Needs Review</AlertTitle>
            <AlertDescription>Don't worry! This is a foundational concept. Carefully read through the explanations below and try to internalize the SVO-Place-Time rule.</AlertDescription>
          </Alert>

          <div class="space-y-4">
            <div v-for="(result, index) in results" :key="result.id" class="rounded-lg border p-4">
              <h4 class="font-semibold">Question {{ index + 1 }}</h4>
              <p class="mt-2 text-sm text-muted-foreground">Your answer:</p>
              <p 
                class="rounded-md p-2"
                :class="result.isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'"
              >
                <span :class="result.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-400'">
                  {{ result.userAnswer || 'No answer provided.' }}
                </span>
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="ml-2 inline-block h-4 w-4" />
              </p>
              
              <template v-if="!result.isCorrect">
                <p class="mt-2 text-sm text-muted-foreground">Correct answer:</p>
                <p class="rounded-md bg-gray-100 p-2 dark:bg-gray-800">{{ result.correctAnswer }}</p>
              </template>
              
              <div class="mt-3 rounded-md bg-muted/50 p-3">
                <h5 class="text-sm font-bold">Explanation</h5>
                <p class="mt-1 text-sm">{{ result.explanation }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
