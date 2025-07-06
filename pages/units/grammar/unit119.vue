<!--
  File: @/pages/units/grammar/12.vue
  Unit: 12 - Advanced Time Expressions: By, Until & By the Time
  Description: A deep dive into the usage of 'by', 'until', and the 'by the time' structure.
  This page combines theoretical explanations with challenging practical exercises and an intelligent validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleCheck, CircleX, BookOpen, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

const router = useRouter()

// --- Core State Management ---
const showResult = ref(false)
const userAnswers = ref<string[]>(['', '', '', '', ''])
const results = ref<{ isCorrect: boolean; user_answer: string; correct_answer: string; explanation: string; }[]>([])

// --- Unit Content and Data ---
const unitDetails = {
  testTitle: 'English Grammar In Use - Practice',
  testDescription: 'Advanced exercises based on the teachings of Raymond Murphy.',
  unitTitle: 'Unit 12: By and until; By the time …',
  unitDescription: 'Mastering deadlines, durations, and sequences of events.',
  categories: ['Time Expressions', 'Prepositions', 'Tense Usage', 'Advanced'],
}

const questions = [
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: "We need to have this report finalized ___ next Friday at 5 PM. The director won't accept any delays.",
    placeholder: 'by / until',
    correctAnswer: 'by',
    explanation: "The correct preposition here is 'by'. We are referring to a specific deadline—a single point in time by which the action (finalizing the report) must be completed. 'Until' would incorrectly imply the action of finalizing happens continuously up to Friday.",
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    prompt: "I'm staying in the library to study ___ it closes. I have a major exam tomorrow.",
    placeholder: 'by / until',
    correctAnswer: 'until',
    explanation: "Here, 'until' is correct because it describes a continuous action (studying) that will continue for a duration, stopping at a specific point in time (when the library closes). Using 'by' would be nonsensical, as it would mean the studying happens at some point before the closing time, not throughout the period.",
  },
  {
    id: 3,
    type: 'sentence-completion',
    prompt: "By the time the firefighters arrived, the old warehouse ______ completely.",
    placeholder: 'e.g., had burned down',
    correctAnswer: 'had burned down',
    explanation: "This sentence structure, 'By the time + [past event], ...', requires the past perfect tense ('had' + past participle) for the main clause. The burning of the warehouse happened *before* the firefighters arrived. The past perfect tense perfectly illustrates this sequence of past events.",
  },
  {
    id: 4,
    type: 'sentence-completion',
    prompt: "Don't worry, by the time you wake up tomorrow morning, I ______ the entire house.",
    placeholder: 'e.g., will have cleaned',
    correctAnswer: 'will have cleaned',
    explanation: "This structure, 'By the time + [present event], ...', is used to talk about a future event that will be completed before another future event. We use the future perfect tense ('will have' + past participle) to describe the completed action. The cleaning will be finished before you wake up.",
  },
  {
    id: 5,
    type: 'error-correction',
    prompt: "He promised he would have the car repaired until Wednesday, but I doubt it. (Find and correct the error)",
    placeholder: 'Correct the preposition...',
    correctAnswer: 'repaired by wednesday',
    explanation: "The error is the use of 'until'. Repairing a car is a single action with a deadline, not a continuous activity that lasts up to Wednesday. The correct preposition is 'by' to signify the deadline for the completion of the repair.",
  },
]

// --- Computed Properties for Dynamic UI ---
const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.length) * 100)
})

const scoreFeedback = computed(() => {
  const s = score.value
  if (s === 100) return { title: 'Perfection!', message: "Exceptional work! You have a deep and precise understanding of these complex time expressions.", icon: CircleCheck }
  if (s >= 75) return { title: 'Excellent!', message: "Great job! You have a strong grasp of the concepts. Review the explanations for any missed questions to solidify your knowledge.", icon: CircleCheck }
  if (s >= 50) return { title: 'Good Effort!', message: "A solid attempt. This is a tricky unit. Pay close attention to the explanations to understand the nuances.", icon: BrainCircuit }
  return { title: 'Needs Review', message: "This unit is challenging. Don't be discouraged! Carefully read through the material and the feedback for each question. Repetition is key.", icon: BookOpen }
})

// --- Navigation and Validation Logic ---
function goToPreviousUnit() {
  router.push("/units/grammar/11")
}

function goToNextUnit() {
  router.push("/units/grammar/13")
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, ' ')
}

function validateAnswers() {
  const validationResults = questions.map((q, index) => {
    const userAnswer = userAnswers.value[index]
    const normalizedUserAnswer = normalizeAnswer(userAnswer)
    const normalizedCorrectAnswer = normalizeAnswer(q.correctAnswer)
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer
    
    return {
      isCorrect,
      user_answer: userAnswer || 'No answer',
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
    }
  })
  results.value = validationResults
  showResult.value = true
  
  // Scroll to results for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

function resetTest() {
  showResult.value = false
  userAnswers.value.fill('')
  results.value = []
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpen class="h-6 w-6 text-primary" /> Core Concepts: Deadline vs. Duration</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-base">
          <div>
            <h3 class="font-semibold text-lg">Until (or Till)</h3>
            <p class="text-muted-foreground">Think of <span class="font-bold text-primary">'until'</span> as a continuous journey that stops at a specific time. It answers the question, "How long will this action/state last?". It's about duration.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><span class="font-mono bg-muted p-1 rounded">He will be away <span class="font-bold">until</span> Monday.</span> (He is continuously away from now up to Monday).</li>
              <li><span class="font-mono bg-muted p-1 rounded">Wait here <span class="font-bold">until</span> I get back.</span> (The action of waiting continues up to the moment I return).</li>
            </ul>
          </div>
          <div class="border-t pt-4">
            <h3 class="font-semibold text-lg">By</h3>
            <p class="text-muted-foreground">Think of <span class="font-bold text-primary">'by'</span> as a final deadline. It refers to a single action that must happen at any point *before* or *at* a specific time. It answers, "What is the latest this can happen?".</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><span class="font-mono bg-muted p-1 rounded">You must submit the form <span class="font-bold">by</span> Monday.</span> (The action of submitting can happen on Friday, Saturday, or Monday, but not later).</li>
              <li><span class="font-mono bg-muted p-1 rounded">I'll have finished the book <span class="font-bold">by</span> 10 PM.</span> (The single event of finishing will occur sometime before 10 PM).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> Advanced Structure: By the time...</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-base">
          <p class="text-muted-foreground">'By the time' is a powerful connector that establishes a clear sequence of events. The tense you use after it dramatically changes the meaning.</p>
          <div>
            <h3 class="font-semibold text-lg">Past Context: Past Simple + Past Perfect</h3>
            <p>Use this to show one past action was completed before another past action started.</p>
            <p class="mt-2 font-mono bg-muted p-2 rounded">By the time the police <span class="font-bold text-blue-600">arrived</span> (Past Simple), the thieves <span class="font-bold text-red-600">had already escaped</span> (Past Perfect).</p>
            <p class="text-sm text-muted-foreground mt-1">Sequence: 1st: Escape, 2nd: Arrival of police.</p>
          </div>
          <div class="border-t pt-4">
            <h3 class="font-semibold text-lg">Future Context: Present Simple + Future Perfect</h3>
            <p>Use this to show a future action will be completed before another future action begins.</p>
            <p class="mt-2 font-mono bg-muted p-2 rounded">By the time you <span class="font-bold text-blue-600">read</span> (Present Simple) this, I <span class="font-bold text-red-600">will have left</span> (Future Perfect).</p>
            <p class="text-sm text-muted-foreground mt-1">Sequence: 1st: Leaving, 2nd: Reading the message.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Read each sentence carefully and fill in the blank or correct the error. Pay close attention to context.</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-6" @submit.prevent="validateAnswers">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
              <label :for="`question-${question.id}`" class="font-medium text-sm">
                {{ question.id }}. {{ question.prompt }}
              </label>
              <Input
                :id="`question-${question.id}`"
                v-model="userAnswers[index]"
                :placeholder="question.placeholder"
                :disabled="showResult"
                autocomplete="off"
                class="font-mono"
              />
            </div>
            <div class="flex gap-4">
              <Button v-if="!showResult" type="submit" class="w-full">Check Answers</Button>
              <Button v-if="showResult" type="button" variant="outline" class="w-full" @click="resetTest">Try Again</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card class="bg-card">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <div class="flex items-center gap-4 pt-2">
              <Progress :model-value="score" class="w-full" />
              <span class="font-bold text-xl text-primary">{{ score }}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Alert class="border-2">
               <component :is="scoreFeedback.icon" class="h-5 w-5" />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>{{ scoreFeedback.message }}</AlertDescription>
            </Alert>

            <div class="mt-6 space-y-4">
              <h3 class="text-lg font-semibold">Detailed Feedback</h3>
              <div v-for="(result, index) in results" :key="index" class="border rounded-lg p-4" :class="result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'">
                <p class="font-medium">{{ index + 1 }}. {{ questions[index].prompt }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <span class="font-semibold">Your answer:</span>
                  <span
                    class="font-mono px-2 py-1 rounded"
                    :class="result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800 line-through'"
                  >
                    {{ result.user_answer }}
                  </span>
                  <component :is="result.isCorrect ? CircleCheck : CircleX" class="h-5 w-5 flex-shrink-0" :class="result.isCorrect ? 'text-green-600' : 'text-red-600'" />
                </div>
                <div v-if="!result.isCorrect" class="mt-2 flex items-center gap-2">
                  <span class="font-semibold">Correct answer:</span>
                  <span class="font-mono px-2 py-1 rounded bg-green-100 text-green-800">{{ result.correct_answer }}</span>
                </div>
                <div class="mt-3 border-t pt-2">
                  <p class="text-sm text-muted-foreground"><span class="font-semibold text-foreground">Explanation:</span> {{ result.explanation }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
