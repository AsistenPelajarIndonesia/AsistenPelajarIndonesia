<!--
  File: @/pages/units/grammar/25.vue
  Unit: 25 - Relative clauses 1: Clauses with who/that/which
  Description: An advanced, interactive grammar practice page based on the principles of
  "English Grammar In Use". This page provides in-depth explanations, challenging exercises,
  and a detailed validator to help students master defining relative clauses.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

const router = useRouter()

// --- NAVIGATION ---
function goToPreviousUnit() {
  router.push("/units/grammar/24")
}
function goToNextUnit() {
  router.push("/units/grammar/26")
}

// --- COMPONENT STATE & DATA ---
const testData = {
  testTitle: "English Grammar In Use: Practice",
  testDescription: "Interactive exercises based on the world's best-selling grammar book by Raymond Murphy.",
  unitTitle: "Unit 25: Relative clauses 1",
  unitDescription: "Clauses with who/that/which. These are called 'defining' or 'identifying' relative clauses. They specify which person or thing we are talking about.",
  categories: ['Grammar', 'Clauses', 'B1 Intermediate', 'B2 Upper-Intermediate']
}

type QuestionType = 'gap-fill' | 'combination' | 'correction'

interface Question {
  id: number
  type: QuestionType
  prompt: string
  instructions?: string
  userAnswer: string
  correctAnswers: string[]
  isCorrect: boolean | null
  explanation: string
}

const showResult = ref(false)
const questions = ref<Question[]>([
  {
    id: 1,
    type: 'gap-fill',
    prompt: "The woman ______ lives next door is a doctor.",
    userAnswer: '',
    correctAnswers: ['who', 'that'],
    isCorrect: null,
    explanation: "For people (the woman), we use 'who' or 'that'. The clause 'who lives next door' is essential; it defines which woman we are talking about."
  },
  {
    id: 2,
    type: 'gap-fill',
    prompt: "Where are the keys ______ were on the table?",
    userAnswer: '',
    correctAnswers: ['which', 'that'],
    isCorrect: null,
    explanation: "For things (the keys), we use 'which' or 'that'. The clause 'which were on the table' identifies the specific keys being asked about."
  },
  {
    id: 3,
    type: 'correction',
    prompt: "I don't like people what never stop talking.",
    instructions: "Find and correct the single mistake in the sentence.",
    userAnswer: '',
    correctAnswers: ["i don't like people who never stop talking", "i don't like people that never stop talking"],
    isCorrect: null,
    explanation: "The word 'what' is not a relative pronoun in this context. 'What' means 'the thing(s) that'. To refer to 'people', you must use 'who' or 'that'. This is a very common error."
  },
  {
    id: 4,
    type: 'combination',
    prompt: "A machine has broken down. It is the one I use every day.",
    instructions: "Combine the sentences into one using a relative clause. Start with 'The machine...'",
    userAnswer: '',
    correctAnswers: ['the machine which i use every day has broken down', 'the machine that i use every day has broken down'],
    isCorrect: null,
    explanation: "The second sentence becomes a relative clause modifying 'the machine'. We use 'which' or 'that' for things. Note that the redundant pronoun 'it' is removed from the original sentence."
  },
  {
    id: 5,
    type: 'gap-fill',
    prompt: "What was the name of the man ______ lent you the money?",
    userAnswer: '',
    correctAnswers: ['who', 'that'],
    isCorrect: null,
    explanation: "The relative pronoun refers to 'the man' (a person), so 'who' or 'that' is correct. The pronoun also acts as the subject of the verb 'lent'."
  },
  {
    id: 6,
    type: 'correction',
    prompt: "The book what I'm reading is about astronomy.",
    instructions: "Find and correct the single mistake in the sentence.",
    userAnswer: '',
    correctAnswers: ["the book which i'm reading is about astronomy", "the book that i'm reading is about astronomy"],
    isCorrect: null,
    explanation: "Similar to question 3, 'what' is incorrect. 'What I'm reading' would be a noun clause (e.g., 'What I'm reading is interesting'). To modify 'The book', we must use 'which' or 'that'."
  },
  {
    id: 7,
    type: 'combination',
    prompt: "A thief stole the money. He has just been caught.",
    instructions: "Combine the sentences into one using a relative clause. Start with 'The thief...'",
    userAnswer: '',
    correctAnswers: ['the thief who stole the money has just been caught', 'the thief that stole the money has just been caught'],
    isCorrect: null,
    explanation: "We combine the sentences by turning the first one into a relative clause that defines 'the thief'. 'Who' or 'that' is used for the person. The pronoun 'He' is omitted to avoid redundancy."
  },
  {
    id: 8,
    type: 'gap-fill',
    prompt: "The hotel ______ we stayed at was very noisy.",
    userAnswer: '',
    correctAnswers: ['which', 'that'],
    isCorrect: null,
    explanation: "The relative pronoun refers to 'The hotel' (a thing), so 'which' or 'that' is correct. Here, the pronoun is the object of the preposition 'at'. In a later unit, you'll learn you can also say 'The hotel at which we stayed...'"
  },
  {
    id: 9,
    type: 'correction',
    prompt: "A greengrocer is someone which sells fruit and vegetables.",
    instructions: "Find and correct the single mistake in the sentence.",
    userAnswer: '',
    correctAnswers: ['a greengrocer is someone who sells fruit and vegetables', 'a greengrocer is someone that sells fruit and vegetables'],
    isCorrect: null,
    explanation: "Even though 'someone' is an indefinite pronoun, it refers to a person. Therefore, 'who' or 'that' must be used, not 'which'. 'Which' is reserved for things or animals."
  },
  {
    id: 10,
    type: 'combination',
    prompt: "I found a wallet on the street. It contained over £200.",
    instructions: "Combine the sentences into one using a relative clause. Start with 'The wallet...'",
    userAnswer: '',
    correctAnswers: ["the wallet which i found on the street contained over £200", "the wallet that i found on the street contained over £200"],
    isCorrect: null,
    explanation: "The first sentence is split. 'I found on the street' becomes the relative clause modifying 'The wallet'. The second sentence provides the main verb 'contained'. We use 'which' or 'that' for the object 'wallet'."
  }
])

// --- COMPUTED PROPERTIES ---
const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Perfect Score!", message: "Outstanding! You have a solid grasp of defining relative clauses.", variant: "success" }
  if (percentage >= 80) return { title: "Excellent Work!", message: "You've mastered most of the concepts. Review the explanations for any mistakes.", variant: "success" }
  if (percentage >= 60) return { title: "Good Effort!", message: "A solid attempt. Pay close attention to the explanations to clear up any confusion.", variant: "default" }
  return { title: "Needs Review", message: "This is a tricky topic. Go through the explanations carefully and try again after reviewing the material.", variant: "destructive" }
})

// --- METHODS ---
function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/[.,'"]/g, '')
}

function validateAnswers() {
  questions.value.forEach(q => {
    const userAns = normalizeAnswer(q.userAnswer)
    const correct = q.correctAnswers.some(ans => normalizeAnswer(ans) === userAns)
    q.isCorrect = correct
  })
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  showResult.value = false;
  questions.value.forEach(q => {
    q.userAnswer = '';
    q.isCorrect = null;
  });
  // Scroll to the top of the practice section
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <GrammarLayout
    :test-title="testData.testTitle"
    :test-description="testData.testDescription"
    :unit-title="testData.unitTitle"
    :unit-description="testData.unitDescription"
    :categories="testData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Section A: What is a Relative Clause?</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <p>A relative clause tells us more about a noun. It acts like an adjective. In this unit, we focus on <strong>defining relative clauses</strong>. They are essential because they identify exactly which person or thing we are talking about.</p>
          <div class="p-4 border rounded-md bg-muted">
            <p><span class="font-semibold">Example:</span> The woman <strong class="text-blue-600">who lives next door</strong> is a doctor.</p>
            <p class="mt-2 text-muted-foreground text-sm">Without the clause <strong class="text-blue-600">"who lives next door"</strong>, we wouldn't know which woman is being discussed. It defines her.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Section B: `who`, `which`, and `that`</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <p>We use different pronouns to start these clauses:</p>
          <ul class="space-y-3 list-disc list-inside">
            <li>
              <strong>who</strong> (for people)
              <p class="pl-6 mt-1 text-muted-foreground">An architect is someone <strong class="text-blue-600">who</strong> designs buildings.</p>
            </li>
            <li>
              <strong>which</strong> (for things & animals)
              <p class="pl-6 mt-1 text-muted-foreground">I like the jacket <strong class="text-blue-600">which</strong> you are wearing.</p>
            </li>
            <li>
              <strong>that</strong> (for people or things - often more common in spoken English)
              <p class="pl-6 mt-1 text-muted-foreground">An architect is someone <strong class="text-blue-600">that</strong> designs buildings. (same as 'who')</p>
              <p class="pl-6 mt-1 text-muted-foreground">I like the jacket <strong class="text-blue-600">that</strong> you are wearing. (same as 'which')</p>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card class="border-red-500/50">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><XCircle class="text-red-500"/>Common Pitfalls</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <div>
            <p class="font-semibold">1. Do not use 'what'.</p>
            <p class="text-destructive">Incorrect: <s class="opacity-70">The car what he bought was expensive.</s></p>
            <p class="text-green-600">Correct: The car <strong class="font-bold">which/that</strong> he bought was expensive.</p>
            <p class="mt-1 text-xs text-muted-foreground">'What' means 'the thing(s) that'. It cannot be used to modify a noun like 'car'.</p>
          </div>
          <div>
            <p class="font-semibold">2. Do not use a redundant pronoun.</p>
            <p class="text-destructive">Incorrect: <s class="opacity-70">The woman who lives next door, she is a doctor.</s></p>
            <p class="text-green-600">Correct: The woman <strong class="font-bold">who lives next door</strong> is a doctor.</p>
            <p class="mt-1 text-xs text-muted-foreground">The relative pronoun ('who') already connects the clause to the subject ('The woman'). The extra 'she' is unnecessary and incorrect.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Your answers will be checked for correctness, not for case or punctuation.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
            <p class="font-semibold">{{ index + 1 }}. {{ q.prompt }}</p>
            <p v-if="q.instructions" class="text-sm text-muted-foreground italic">
              {{ q.instructions }}
            </p>
            <div class="flex items-center gap-2">
               <Label :for="`q${q.id}`" class="sr-only">Answer for question {{ index + 1 }}</Label>
               <Input :id="`q${q.id}`" v-model="q.userAnswer" :disabled="showResult" type="text" placeholder="Your answer..." />
            </div>
          </div>
          <Button v-if="!showResult" class="w-full" @click="validateAnswers">Check Answers</Button>
          <Button v-else class="w-full" variant="secondary" @click="resetTest">Try Again</Button>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <Card class="bg-card">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance below. The explanations are key to your improvement.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold text-center">Score: {{ score }} / {{ questions.length }}</h3>
            <Progress :model-value="scorePercentage" class="my-2" />
            <Alert :variant="scoreFeedback.variant" class="mt-4">
              <component :is="scoreFeedback.variant === 'destructive' ? XCircle : CheckCircle2" class="h-4 w-4" />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>{{ scoreFeedback.message }}</AlertDescription>
            </Alert>
          </div>
          
          <!-- Detailed Breakdown -->
          <div>
            <h3 class="mb-4 text-lg font-semibold">Detailed Answer Review</h3>
            <div class="space-y-4">
              <div v-for="q in questions" :key="`result-${q.id}`" class="p-4 rounded-md border" :class="[q.isCorrect ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10' : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10']">
                <p class="text-sm text-muted-foreground">{{ q.prompt }}</p>
                <div class="mt-3 space-y-3">
                  <!-- User's Answer -->
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0">
                      <CheckCircle2 v-if="q.isCorrect" class="h-5 w-5 text-green-600" />
                      <XCircle v-else class="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p class="font-semibold" :class="[q.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300']">
                        Your answer: <span class="font-normal opacity-90">{{ q.userAnswer || ' (No answer given)' }}</span>
                      </p>
                    </div>
                  </div>
                   <!-- Correct Answer -->
                  <div v-if="!q.isCorrect" class="flex items-start gap-3">
                    <div class="flex-shrink-0">
                       <CheckCircle2 class="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                       <p class="font-semibold text-gray-800 dark:text-gray-300">
                        Correct answer(s): <span class="font-normal opacity-90">{{ q.correctAnswers.join(' / ') }}</span>
                       </p>
                    </div>
                  </div>
                  <!-- Explanation -->
                  <div class="flex items-start gap-3 pt-3 border-t" :class="[q.isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800']">
                    <div class="flex-shrink-0">
                       <HelpCircle class="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                       <p class="font-semibold text-blue-800 dark:text-blue-300">Explanation</p>
                       <p class="text-sm text-muted-foreground">{{ q.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
