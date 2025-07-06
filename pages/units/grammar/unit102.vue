<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

// --- Component Imports ---
// Assuming these components are globally available or auto-imported via Nuxt
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  // You can define meta information for the page here if needed
  title: 'Grammar Practice: Enough and Too',
})

// --- Page & Unit Configuration ---
const unitNumber = 36
const testTitle = 'English Grammar In Use Practice'
const testDescription = 'An advanced module for mastering intermediate English grammar, inspired by Raymond Murphy.'
const unitTitle = `Unit ${unitNumber}: Enough and Too`
const unitDescription = 'Explore the critical distinction between expressing sufficiency (enough) and excess (too). This unit challenges your understanding of their placement and usage with adjectives, adverbs, and nouns.'
const categories = ['Adjectives & Adverbs', 'Quantifiers', 'Sentence Structure', 'Infinitive Phrases']

// --- Navigation Logic ---
const router = useRouter()
const goToPreviousUnit = () => router.push(`/units/grammar/${unitNumber - 1}`)
const goToNextUnit = () => router.push(`/units/grammar/${unitNumber + 1}`)

// --- Core Reactive State ---
const showResult = ref(false)
const userAnswers = ref<Record<number, string>>({})

interface Question {
  id: number
  type: 'fill-in-the-blank' | 'rewrite' | 'multiple-choice'
  questionText: string
  prompt?: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    questionText: "I can't drink this coffee. It's ______ hot.",
    correctAnswer: 'too',
    explanation: 'We use "too" before an adjective (hot) to indicate an excessive, negative quality. The coffee has more heat than is desirable.'
  },
  {
    id: 2,
    type: 'rewrite',
    questionText: 'He couldn\'t reach the shelf because he wasn\'t tall. -> Rewrite the sentence using "enough".',
    prompt: "He wasn't ______ to reach the shelf.",
    correctAnswer: 'tall enough',
    explanation: '"Enough" comes *after* an adjective or adverb. The structure is `adjective + enough`. The meaning is that he lacked the sufficient height.'
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    questionText: 'Do you have ______ to pay for the tickets?',
    prompt: 'Do you have ______ money?',
    correctAnswer: 'enough money',
    explanation: '"Enough" comes *before* a noun (money). The structure is `enough + noun`. It asks if the amount of money is sufficient.'
  },
  {
    id: 4,
    type: 'rewrite',
    questionText: 'The car is very expensive. We can\'t afford to buy it. -> Combine these sentences using "too".',
    prompt: "The car is ______ for us to buy.",
    correctAnswer: 'too expensive',
    explanation: 'The structure `too + adjective + (for someone) + to-infinitive` is used to combine the idea of excess with a consequence. The price is excessive, and the consequence is our inability to buy it.'
  },
  {
    id: 5,
    type: 'fill-in-the-blank',
    questionText: 'There were ______ people at the concert, so it was difficult to move.',
    correctAnswer: 'too many',
    explanation: 'For countable nouns (people), we use "too many" to express an excessive quantity. "Too much" is used for uncountable nouns.'
  },
  {
    id: 6,
    type: 'rewrite',
    questionText: "The test was very hard. She couldn't finish it on time. -> Rewrite using 'too' and an appropriate adverb.",
    prompt: 'She did the test ______ to finish it on time.',
    correctAnswer: 'too slowly',
    explanation: 'This question requires inferring the adverb. Because she couldn\'t finish, she must have been working "too slowly". We use `too + adverb` to describe an action performed to an excessive degree.'
  },
  {
    id: 7,
    type: 'rewrite',
    questionText: "He isn't qualified for the job. -> Rewrite using 'enough' and the opposite adjective.",
    prompt: "He isn't experienced ______ for the job.",
    correctAnswer: 'experienced enough',
    explanation: 'A common and challenging structure involves negating "enough" with an adjective that is the opposite of the one implied. "Not qualified" is equivalent to "not experienced enough". "Enough" correctly follows the adjective "experienced".'
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    questionText: "Please don't put ______ in my tea. I don't like it very sweet.",
    prompt: "Please don't put ______ sugar in my tea.",
    correctAnswer: 'too much sugar',
    explanation: 'For uncountable nouns (sugar), we use "too much" to express an excessive quantity. The structure is `too much + uncountable noun`.'
  },
])

// --- Validation & Scoring Logic ---
const validationResults = ref<Array<{ id: number; isCorrect: boolean }>>([])

const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length
})

const totalQuestions = computed(() => questions.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

const getQuestionById = (id: number) => questions.find(q => q.id === id)

function validateAnswers() {
  const results = questions.map(question => ({
    id: question.id,
    isCorrect: userAnswers.value[question.id]?.trim().toLowerCase() === question.correctAnswer.toLowerCase()
  }))
  validationResults.value = results
  showResult.value = true
  // Scroll to results for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  userAnswers.value = {}
  validationResults.value = []
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <!-- #material: Detailed Explanations                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Sufficiency vs. Excess</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-muted-foreground">
          <p><strong class="text-foreground">Enough</strong> indicates a sufficient, positive, or necessary amount. It means 'the right amount'.</p>
          <p><strong class="text-foreground">Too</strong> indicates an excessive, negative, or problematic amount. It means 'more than is needed or good'.</p>
        </CardContent>
      </Card>

      <Card class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>Grammatical Pattern: <code class="text-blue-600 dark:text-blue-400">Enough</code></CardTitle>
          <CardDescription>The position of "enough" changes depending on the word it modifies.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-foreground">1. Adjective/Adverb + <code class="font-bold">enough</code></h4>
            <p class="text-sm text-muted-foreground">The weather isn't <strong class="text-blue-600">warm enough</strong> to go swimming.</p>
            <p class="text-sm text-muted-foreground">You didn't drive <strong class="text-blue-600">quickly enough</strong>.</p>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-foreground">2. <code class="font-bold">enough</code> + Noun</h4>
            <p class="text-sm text-muted-foreground">We have <strong class="text-blue-600">enough food</strong> for everyone.</p>
            <p class="text-sm text-muted-foreground">Is there <strong class="text-blue-600">enough time</strong> to finish?</p>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle>Grammatical Pattern: <code class="text-red-600 dark:text-red-400">Too</code></CardTitle>
          <CardDescription>"Too" always precedes the word it modifies and often suggests a problem.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-foreground">1. <code class="font-bold">too</code> + Adjective/Adverb</h4>
            <p class="text-sm text-muted-foreground">This box is <strong class="text-red-600">too heavy</strong> for me to lift.</p>
            <p class="text-sm text-muted-foreground">He speaks <strong class="text-red-600">too quietly</strong>.</p>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-foreground">2. <code class="font-bold">too much/many</code> + Noun</h4>
            <p class="text-sm text-muted-foreground">You've added <strong class="text-red-600">too much salt</strong> (uncountable).</p>
            <p class="text-sm text-muted-foreground">There are <strong class="text-red-600">too many mistakes</strong> in this essay (countable).</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Interactive Questions                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the following sentences. Pay close attention to word order and meaning.</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-8" @submit.prevent="validateAnswers">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
              <Label :for="`q-${q.id}`">
                <span class="font-semibold">Question {{ index + 1 }}:</span> {{ q.questionText }}
              </Label>
              <Input
                :id="`q-${q.id}`"
                v-model="userAnswers[q.id]"
                :placeholder="q.prompt || 'Type your answer here...'"
                class="text-base"
                :disabled="showResult"
              />
            </div>

            <div class="flex items-center justify-end gap-4 pt-4">
              <Button v-if="showResult" type="button" variant="outline" @click="resetTest">
                Try Again
              </Button>
              <Button v-else type="submit">
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: Advanced Validator & Explanations                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-t-4" :class="scorePercentage >= 75 ? 'border-green-500' : scorePercentage >= 40 ? 'border-yellow-500' : 'border-red-500'">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>You scored {{ score }} out of {{ totalQuestions }} correct.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between text-sm font-medium">
                <span>Overall Performance</span>
                <span :class="scorePercentage >= 75 ? 'text-green-600' : scorePercentage >= 40 ? 'text-yellow-600' : 'text-red-600'">
                  {{ scorePercentage }}%
                </span>
              </div>
              <Progress :model-value="scorePercentage" />
            </div>
            
            <Separator />
            
            <div class="space-y-6">
              <h3 class="text-lg font-semibold tracking-tight">
                Detailed Breakdown
              </h3>
              <div v-for="result in validationResults" :key="result.id">
                <div v-if="getQuestionById(result.id)" class="p-4 rounded-md" :class="result.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'">
                  <div class="flex items-start gap-4">
                     <div class="mt-1">
                      <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                      <XCircle v-else class="h-5 w-5 text-red-500" />
                    </div>
                    <div class="flex-1 space-y-2">
                      <p class="font-medium text-sm text-foreground">
                        {{ getQuestionById(result.id)?.questionText }}
                      </p>
                      <div class="text-sm border-l-2 pl-3" :class="result.isCorrect ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'">
                        <p class="text-muted-foreground">Your answer: <code class="font-mono p-1 rounded-sm" :class="result.isCorrect ? 'bg-green-100 dark:bg-green-800/50' : 'bg-red-100 dark:bg-red-800/50'">{{ userAnswers[result.id] || 'No answer' }}</code></p>
                        <p v-if="!result.isCorrect" class="text-muted-foreground">Correct answer: <code class="font-mono bg-green-100 dark:bg-green-800/50 p-1 rounded-sm">{{ getQuestionById(result.id)?.correctAnswer }}</code></p>
                      </div>
                      
                      <Alert class="mt-3" :variant="result.isCorrect ? 'default' : 'destructive'">
                        <AlertTriangle v-if="!result.isCorrect" class="h-4 w-4" />
                        <CheckCircle2 v-else class="h-4 w-4" />
                        <AlertTitle>Explanation</AlertTitle>
                        <AlertDescription>
                          {{ getQuestionById(result.id)?.explanation }}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

