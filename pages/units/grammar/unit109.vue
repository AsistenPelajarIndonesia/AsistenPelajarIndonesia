<!--
  File: @/pages/units/grammar/2.vue
  Description: A comprehensive and challenging grammar practice module for Unit 2.
  This page utilizes the GrammarLayout to present instructional material,
  a rigorous set of practice questions, and a detailed results validator
  on the topic of "Word order 2: Adverbs with the verb".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = 'English Grammar In Use: Intermediate Practice'
const testDescription = 'Based on the works of Raymond Murphy, this is a series of advanced exercises.'
const unitTitle = 'Unit 2: Word order 2: Adverbs with the verb'
const unitDescription = 'Master the placement of adverbs of frequency, manner, place, time, and degree in relation to the verb. This unit will challenge your understanding of standard and emphatic sentence structures.'
const categories = ['Adverbs', 'Word Order', 'Sentence Structure', 'Intermediate']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real app, you might have a dynamic way to find the previous unit
  router.push("/units/grammar/1")
}
function goToNextUnit() {
  // In a real app, you might have a dynamic way to find the next unit
  router.push("/units/grammar/3")
}

// --- Question & Answer State ---
type QuestionType = 'multiple-choice' | 'reorder' | 'fill-in-the-blank' | 'error-correction';

interface Question {
  id: number
  type: QuestionType
  prompt: string
  detail?: string // Optional extra detail for the question
  parts?: string[] // For reorder questions
  options?: string[] // For multiple-choice questions
  userAnswer: any
  correctAnswer: string | string[] // Can have multiple correct answers
  explanation: string
  isCorrect: boolean | null
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'reorder',
    prompt: 'Organize the following words into a grammatically correct sentence.',
    parts: ['always', 'the team', 'the coach', 'before a major game', 'motivates', 'eloquently'],
    userAnswer: ref(''),
    correctAnswer: 'The coach always eloquently motivates the team before a major game.',
    explanation: 'The adverb of frequency "always" comes before the main verb "motivates". The adverb of manner "eloquently" can come before the main verb or after the object. Here, "always eloquently motivates" emphasizes the coach\'s consistent style.',
    isCorrect: null,
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: 'Which sentence has the most natural and standard word order?',
    options: [
      'She speaks fluently English.',
      'She speaks English fluently.',
      'She fluently speaks English.',
    ],
    userAnswer: ref(null),
    correctAnswer: 'She speaks English fluently.',
    explanation: 'Adverbs of manner, like "fluently", typically go after the direct object ("English"). Placing it before the verb ("fluently speaks") is possible but less common and more emphatic.',
    isCorrect: null,
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    prompt: 'Complete the sentence by placing the adverbs in the correct order: "He worked ... to meet the deadline."',
    detail: '(diligently / all night / in his office)',
    userAnswer: ref(''),
    correctAnswer: 'He worked diligently in his office all night to meet the deadline.',
    explanation: 'The standard order for adverbs at the end of a clause is Manner (diligently), Place (in his office), and then Time (all night). This is often remembered by the acronym MPT.',
    isCorrect: null,
  },
  {
    id: 4,
    type: 'error-correction',
    prompt: 'Find and correct the error in the following sentence. Rewrite the entire sentence.',
    detail: '"They have been to the new restaurant probably twice."',
    userAnswer: ref(''),
    correctAnswer: [
        'They have probably been to the new restaurant twice.',
        'They probably have been to the new restaurant twice.'
    ],
    explanation: 'Adverbs of probability like "probably" typically go in the mid-position: after the first auxiliary verb ("have") and before the main verb phrase ("been"). "Twice" is a definite frequency adverb, which correctly stays at the end.',
    isCorrect: null,
  },
  {
    id: 5,
    type: 'multiple-choice',
    prompt: 'The meaning of the sentence changes based on the position of "only". Which option means "He did not read the book, he just looked at it quickly"?',
    options: [
      'He only glanced at the book.',
      'Only he glanced at the book.',
      'He glanced only at the book.',
    ],
    userAnswer: ref(null),
    correctAnswer: 'He only glanced at the book.',
    explanation: '"Only" modifies the word or phrase that immediately follows it. "Only glanced" means glancing was the sole action. "Only he" would mean no one else glanced. "Only at the book" would mean he didn\'t glance at anything else.',
    isCorrect: null,
  },
  {
    id: 6,
    type: 'reorder',
    prompt: 'Arrange the sentence components for the most natural flow.',
    parts: ['the results', 'we', 'will announce', 'at the ceremony', 'tomorrow evening', 'officially'],
    userAnswer: ref(''),
    correctAnswer: 'We will officially announce the results at the ceremony tomorrow evening.',
    explanation: 'The mid-position adverb "officially" fits best between the auxiliary "will" and the main verb "announce". The adverbial phrases of Place ("at the ceremony") and Time ("tomorrow evening") correctly follow the object ("the results").',
    isCorrect: null,

  }
])

// --- Validation & Scoring Logic ---
const showResult = ref(false)

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const progress = computed(() => {
  const answeredCount = questions.value.filter(q => q.userAnswer.value !== null && q.userAnswer.value !== '').length
  return (answeredCount / questions.value.length) * 100
})

function validateAnswers() {
  questions.value.forEach(q => {
    // Standardize user input for comparison
    const userAnswerCleaned = typeof q.userAnswer.value === 'string'
      ? q.userAnswer.value.trim().replace(/\.$/, '').toLowerCase()
      : q.userAnswer.value?.toLowerCase()

    if (Array.isArray(q.correctAnswer)) {
      const correctAnswersCleaned = q.correctAnswer.map(ans => ans.trim().replace(/\.$/, '').toLowerCase())
      q.isCorrect = correctAnswersCleaned.includes(userAnswerCleaned)
    } else {
      const correctAnswerCleaned = q.correctAnswer.trim().replace(/\.$/, '').toLowerCase()
      q.isCorrect = userAnswerCleaned === correctAnswerCleaned
    }
  })
  showResult.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetTest() {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer.value = q.type === 'multiple-choice' ? null : ''
    q.isCorrect = null
  })
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
    <!-- Learning Material Slot                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principles of Adverb Placement</CardTitle>
          <CardDescription>Understanding these rules is key to natural-sounding English.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold">1. Adverbs of Frequency (always, often, sometimes, never)</h4>
            <ul class="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
              <li><strong>Before the main verb:</strong> He <span class="font-bold text-primary">often</span> goes to the cinema.</li>
              <li><strong>After the verb 'to be':</strong> She is <span class="font-bold text-primary">rarely</span> late.</li>
              <li><strong>Between auxiliary and main verb:</strong> You have <span class="font-bold text-primary">never</span> seen this film.</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">2. Adverbs of Manner, Place, and Time (The MPT Rule)</h4>
            <p class="mt-1 text-muted-foreground">When multiple adverbs appear after the verb, the standard, neutral order is:</p>
            <p class="mt-2 rounded-md bg-muted p-3">
              Manner (how) → Place (where) → Time (when)
            </p>
            <p class="mt-2 text-muted-foreground">
              Example: The child slept <span class="font-bold text-primary">soundly</span> <span class="font-bold text-green-600">in her bed</span> <span class="font-bold text-blue-600">all night</span>.
            </p>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">3. Adverbs like 'also', 'even', 'only'</h4>
            <p class="mt-1 text-muted-foreground">
              These adverbs are powerful and their position drastically changes the sentence's focus. They are typically placed immediately before the word or phrase they modify.
            </p>
            <ul class="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
              <li><span class="font-bold text-primary">Only I</span> heard the noise. (Nobody else did.)</li>
              <li>I <span class="font-bold text-primary">only heard</span> the noise. (I didn't see it.)</li>
              <li>I heard <span class="font-bold text-primary">only the noise</span>. (I didn't hear anything else.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Apply the principles. Read each question carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="font-semibold">Question {{ index + 1 }}: {{ question.prompt }}</p>
            <p v-if="question.detail" class="text-sm text-muted-foreground italic">"{{ question.detail }}"</p>

            <!-- Multiple Choice -->
            <div v-if="question.type === 'multiple-choice'" class="mt-4">
              <RadioGroup v-model="question.userAnswer.value" class="space-y-2">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="cursor-pointer">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Reorder -->
            <div v-if="question.type === 'reorder'" class="mt-4">
              <div class="mb-2 rounded-md border border-dashed p-3 text-center text-sm italic text-muted-foreground">
                {{ question.parts?.join(' / ') }}
              </div>
              <Input v-model="question.userAnswer.value" placeholder="Type the full, correct sentence..." />
            </div>

            <!-- Fill in the blank / Error Correction -->
            <div v-if="question.type === 'fill-in-the-blank' || question.type === 'error-correction'" class="mt-4">
              <Input v-model="question.userAnswer.value" placeholder="Type the full, correct sentence..." />
            </div>
            
            <Separator v-if="index < questions.length - 1" class="mt-8" />
          </div>
        </CardContent>
      </Card>
      
      <div class="sticky bottom-6">
        <Card class="shadow-lg">
          <CardContent class="flex flex-col gap-4 p-4 md:flex-row md:items-center">
            <div class="flex-1">
              <p class="text-sm font-medium">Your Progress</p>
              <div class="flex items-center gap-3">
                <Progress :model-value="progress" class="w-full" />
                <span class="text-sm font-bold text-muted-foreground">{{ Math.round(progress) }}%</span>
              </div>
            </div>
            <Button size="lg" class="w-full md:w-auto" @click="validateAnswers">
              Check My Answers
            </Button>
          </CardContent>
        </Card>
      </div>

    </template>

    <!-- ======================================================================= -->
    <!-- Results Slot                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-2 border-primary">
        <CardHeader>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle class="text-2xl">Your Results</CardTitle>
              <CardDescription>Review your answers and the explanations to improve.</CardDescription>
            </div>
            <div class="text-center">
              <p class="text-sm font-bold text-muted-foreground">SCORE</p>
              <p class="text-4xl font-extrabold">{{ score }} / {{ questions.length }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="`result-${question.id}`">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 v-if="question.isCorrect" class="h-6 w-6 text-green-500" />
                <XCircle v-else class="h-6 w-6 text-red-500" />
              </div>
              <div class="flex-1">
                <p class="font-semibold">Question {{ index + 1 }}: {{ question.prompt }}</p>
                <div class="mt-2 space-y-1 text-sm">
                  <p><span class="font-medium text-muted-foreground">Your answer:</span> <span :class="question.isCorrect ? 'text-green-700' : 'text-red-700'">{{ question.userAnswer.value || 'No answer provided' }}</span></p>
                  <p v-if="!question.isCorrect"><span class="font-medium text-muted-foreground">Correct answer:</span> <span class="text-blue-700">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' or ') : question.correctAnswer }}</span></p>
                </div>
                <Alert class="mt-3">
                  <HelpCircle class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>{{ question.explanation }}</AlertDescription>
                </Alert>
              </div>
            </div>
            <Separator v-if="index < questions.length - 1" class="my-6" />
          </div>
          <Separator class="my-6" />
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="resetTest">Try Again</Button>
            <Button @click="goToNextUnit">Continue to Next Unit</Button>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>

<style scoped>
/* Smooth fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
