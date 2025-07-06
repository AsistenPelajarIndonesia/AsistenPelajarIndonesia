<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Components (assuming they are globally registered or auto-imported by Nuxt) ---
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit, RefreshCw } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the methodology of Raymond Murphy.',
  unitTitle: 'Unit 0: Present Perfect 1 (I have done)',
  unitDescription: 'This unit focuses on the fundamental use of the Present Perfect tense to describe past actions with a result or connection in the present.',
  categories: ['Tense', 'Present Perfect', 'B1 Intermediate'],
  unitNumber: 0,
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real app, you might show a toast or alert. For now, it does nothing as it's the first unit.
  console.log("Already at the first unit.")
}
function goToNextUnit() {
  router.push(`/units/grammar/${unitDetails.unitNumber + 1}`)
}

// --- Question & Answer State ---
interface Question {
  id: number
  type: 'fill-in-the-blank' | 'choose-correct' | 'sentence-correction'
  prompt: string
  context?: string
  options?: string[]
  userAnswer: string
  correctAnswer: string | string[]
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: "I can't get into my house. I think I _______ (lose) my keys.",
    userAnswer: '',
    correctAnswer: 'have lost',
    explanation: "We use the Present Perfect ('have lost') because the focus is on the present result of a past action: I cannot get in *now* because of something that happened in the past. The Simple Past ('lost') would simply state the fact without this strong present connection.",
  },
  {
    id: 2,
    type: 'choose-correct',
    prompt: 'Choose the correct verb tense to complete the sentence.',
    context: "My sister is a very successful novelist. She _______ more than twenty books.",
    options: ['wrote', 'has written'],
    userAnswer: '',
    correctAnswer: 'has written',
    explanation: "'has written' (Present Perfect) is correct because her career as a novelist is ongoing. The action of writing books happened in the past but is part of a period of time (her life/career) that continues up to the present. 'Wrote' (Simple Past) would imply her career is over, as in 'Shakespeare wrote many plays'.",
  },
  {
    id: 3,
    type: 'sentence-correction',
    prompt: "Correct the grammatical error in the following sentence.",
    context: "'I have seen that film on television last night.'",
    userAnswer: '',
    correctAnswer: "I saw that film on television last night.",
    explanation: "The Present Perfect cannot be used with a specific, finished time expression like 'last night'. These expressions (yesterday, last week, in 1999) anchor the action entirely in the past, requiring the Simple Past ('saw').",
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    prompt: "Look! Somebody _______ (break) that window.",
    userAnswer: '',
    correctAnswer: 'has broken',
    explanation: "The evidence of the action is visible *now* ('Look!'), creating a direct link to the present. This is a classic situation for the Present Perfect. The focus is not on *when* it happened, but on the current state: the broken window.",
  },
  {
    id: 5,
    type: 'choose-correct',
    prompt: 'Choose the correct verb tense to complete the sentence.',
    context: "It's the first time he _______ a car. He's very nervous.",
    options: ['drove', 'has driven'],
    userAnswer: '',
    correctAnswer: 'has driven',
    explanation: "Expressions like 'It's the first time...', 'It's the second time...', etc., are followed by the Present Perfect because they describe an experience within a time period leading up to the present moment.",
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    prompt: "I'm looking for Sarah. Where _______ she _______ (go)?",
    userAnswer: '',
    correctAnswer: 'has gone',
    explanation: "We use 'has gone' to indicate that someone went somewhere and has not yet returned. The question is about her current whereabouts. If we asked 'Where did she go?', the focus would be on the past action of leaving, not her current location.",
  },
])

// --- UI & Validation Logic ---
const showResult = ref(false)
const isSubmitted = ref(false)

const score = computed(() => questions.value.filter(q => q.isCorrect).length)
const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => (totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0))

function checkAnswers() {
  if (isSubmitted.value) return

  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/[.']/g, '')
    const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer.map(a => a.toLowerCase()) : [q.correctAnswer.toLowerCase()]
    q.isCorrect = correctAnswer.includes(userAnswerCleaned)
  })

  isSubmitted.value = true
  showResult.value = true
  
  // Scroll to the result section for better UX
  setTimeout(() => {
    document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function tryAgain() {
  showResult.value = false
  isSubmitted.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = undefined
  })
}
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material (The Learning Content)                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader class="flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Concepts</CardTitle>
            <CardDescription>Understanding the Present Perfect</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="grid gap-6 text-sm">
          <div class="space-y-2">
            <h4 class="font-semibold">A. The Situation</h4>
            <p>
              Study this example: Tom is looking for his key. He can't find it.
              <br />
              He <strong class="text-primary">has lost</strong> his key.
            </p>
            <p class="text-muted-foreground">
              This means: He lost it sometime in the past, and as a <strong class="font-semibold">result</strong>, he doesn't have it <strong class="font-semibold">now</strong>. The action connects the past to the present.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="font-semibold">B. Structure</h4>
            <p>
              The present perfect is formed with the present tense of <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">have</code> + the <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">past participle</code>.
            </p>
            <ul class="list-disc list-inside text-muted-foreground pl-4">
              <li>I/we/you/they <strong class="text-foreground">have finished</strong>.</li>
              <li>He/she/it <strong class="text-foreground">has gone</strong>.</li>
            </ul>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-semibold">C. Crucial Contrast: Present Perfect vs. Simple Past</h4>
            <p>This is the most important distinction for mastering the tense.</p>
            <div class="grid grid-cols-2 gap-4 rounded-lg border p-4">
              <div>
                <h5 class="font-bold">Present Perfect</h5>
                <p class="text-muted-foreground">Past action, <strong class="text-foreground">present result/connection</strong>. Time is not specified or is an unfinished period (e.g., today, this week).</p>
                <p class="mt-2 font-mono text-xs bg-muted p-2 rounded">"I <strong class="text-primary">have broken</strong> my arm." <br/>(→ My arm is in a cast now.)</p>
              </div>
              <div>
                <h5 class="font-bold">Simple Past</h5>
                <p class="text-muted-foreground">Past action, <strong class="text-foreground">finished</strong>. Time is specified or understood to be in the past.</p>
                <p class="mt-2 font-mono text-xs bg-muted p-2 rounded">"I <strong class="text-destructive">broke</strong> my arm last year." <br/>(→ The event is over.)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: practice (The Interactive Questions)                              -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader class="flex-row items-center gap-4">
          <BrainCircuit class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Apply what you've learned. Be precise!</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold leading-none tracking-tight">
              {{ index + 1 }}. {{ question.prompt }}
            </p>
            <p v-if="question.context" class="text-muted-foreground italic">"{{ question.context }}"</p>
            
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                v-model="question.userAnswer"
                placeholder="Type the verb form..."
                :disabled="isSubmitted"
              />
            </div>

            <div v-if="question.type === 'choose-correct'" class="flex flex-col sm:flex-row gap-2">
              <Button
                v-for="option in question.options"
                :key="option"
                :variant="question.userAnswer === option ? 'default' : 'outline'"
                :disabled="isSubmitted"
                class="flex-1 justify-start"
                @click="question.userAnswer = option"
              >
                {{ option }}
              </Button>
            </div>

            <div v-if="question.type === 'sentence-correction'">
              <Input
                v-model="question.userAnswer"
                placeholder="Rewrite the sentence correctly..."
                :disabled="isSubmitted"
              />
            </div>
          </div>
          
          <div class="flex gap-4 mt-4">
            <Button @click="checkAnswers" :disabled="isSubmitted" class="w-full">
              Check Answers
            </Button>
            <Button v-if="isSubmitted" @click="tryAgain" variant="outline" class="w-full">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result (The Awesome Validator)                                    -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
              You scored {{ score }} out of {{ totalQuestions }}. Review the explanations below to improve.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <div class="flex items-center gap-4">
              <span class="text-2xl font-bold">{{ Math.round(scorePercentage) }}%</span>
              <Progress :model-value="scorePercentage" class="w-full" />
            </div>

            <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="space-y-3">
              <Alert :variant="question.isCorrect ? 'default' : 'destructive'">
                <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                <AlertTitle class="flex items-center justify-between">
                  <span>Question {{ index + 1 }}: {{ question.isCorrect ? 'Correct' : 'Incorrect' }}</span>
                </AlertTitle>
                <AlertDescription class="mt-2 space-y-3">
                  <p class="italic">"{{ question.context || question.prompt }}"</p>
                  <div class="text-xs">
                    <span class="font-semibold">Your answer:</span>
                    <span :class="question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'" class="ml-2 font-mono p-1 bg-background/50 rounded">
                      {{ question.userAnswer || '(No answer provided)' }}
                    </span>
                  </div>
                   <div v-if="!question.isCorrect" class="text-xs">
                    <span class="font-semibold">Correct answer:</span>
                    <span class="ml-2 font-mono p-1 bg-green-500/20 text-green-800 dark:text-green-300 rounded">
                      {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer }}
                    </span>
                  </div>
                  <div class="mt-3 pt-3 border-t border-border/50">
                    <p class="font-semibold text-sm mb-1">💡 Explanation</p>
                    <p class="text-xs leading-relaxed">{{ question.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
