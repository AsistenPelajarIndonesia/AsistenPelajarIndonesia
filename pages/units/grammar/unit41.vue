<!--
  File: @/pages/units/grammar/1.vue
  Unit: 1 - Passive 1 (is done / was done)
  Description: A deep dive into the Present Simple and Past Simple passive forms.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are available from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle, Trophy } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using the GrammarLayout component directly
})

const router = useRouter()

// --- State Management ---
const showResult = ref(false)

// The core data for the practice session. Each question is an object with multiple properties
// to handle user interaction, validation, and feedback.
const questions = ref([
  {
    id: 1,
    type: 'Fill-in-the-Blank (Present Simple Passive)',
    prompt: 'This room looks much better now. It ____________ every day.',
    userAnswer: '',
    correctAnswers: ['is cleaned'],
    status: 'unchecked', // 'unchecked', 'correct', 'incorrect'
    explanation: 'The focus is on "The room", which receives the action. Because the action is a present, recurring habit ("every day"), we use the Present Simple Passive: is + past participle (cleaned).'
  },
  {
    id: 2,
    type: 'Sentence Transformation (Past Simple Passive)',
    prompt: 'The ancient Romans built this aqueduct.',
    context: 'Rewrite the sentence in the passive voice, starting with the word provided.',
    starter: 'This aqueduct',
    userAnswer: '',
    correctAnswers: ['was built by the ancient romans'],
    status: 'unchecked',
    explanation: 'The action happened in the past. The object of the active sentence ("this aqueduct") becomes the subject of the passive sentence. Since "aqueduct" is singular, we use the Past Simple Passive: was + past participle (built).'
  },
  {
    id: 3,
    type: 'Fill-in-the-Blank (Negative Past Simple Passive)',
    prompt: 'The two suspects were questioned by the police, but they ____________ .',
    userAnswer: '',
    correctAnswers: ['were not charged', "weren't charged"],
    status: 'unchecked',
    explanation: 'The context implies a negative outcome in the past. The subject is "they" (plural), so we use the negative Past Simple Passive: were + not + past participle (charged).'
  },
  {
    id: 4,
    type: 'Question Formation (Past Simple Passive)',
    prompt: "A: We can't use the main bridge today. B: Why not?",
    context: 'A: It ____________ yesterday during the storm.',
    userAnswer: '',
    correctAnswers: ['was damaged'],
    status: 'unchecked',
    explanation: 'The bridge ("It") is a singular object that received the action of being damaged in the past ("yesterday"). We use the Past Simple Passive: was + past participle (damaged).'
  },
  {
    id: 5,
    type: 'Contextual Fill-in-the-Blank (Present Simple Passive)',
    prompt: 'In the United States, presidential elections ____________ every four years.',
    userAnswer: '',
    correctAnswers: ['are held'],
    status: 'unchecked',
    explanation: 'The subject "elections" is plural and the action is a regular, scheduled event. This requires the Present Simple Passive: are + past participle (held).'
  },
  {
    id: 6,
    type: 'Complex Transformation (Present Simple Passive - Question)',
    prompt: "How do people learn languages?",
    context: 'Rewrite the question in the passive voice, starting with the words provided.',
    starter: 'How',
    userAnswer: '',
    correctAnswers: ['are languages learned'],
    status: 'unchecked',
    explanation: 'To form a wh-question in the passive, the structure is: Wh-word + am/is/are + subject + past participle. Here, the subject is "languages" (plural), so we use "are languages learned".'
  },
    {
    id: 7,
    type: 'Error Correction (Past Simple Passive)',
    prompt: "The book 'War and Peace' was wrote by Leo Tolstoy.",
    context: 'Find and correct the mistake in the sentence.',
    userAnswer: '',
    correctAnswers: ['was written'],
    status: 'unchecked',
    explanation: 'The passive voice requires the past participle form of the verb, not the simple past form. The past participle of "write" is "written", not "wrote". The correct structure is: was + written.'
  },
  {
    id: 8,
    type: 'Fill-in-the-Blank (Present Simple Passive - Plural)',
    prompt: 'Millions of photos ____________ to Instagram every single day.',
    userAnswer: '',
    correctAnswers: ['are uploaded'],
    status: 'unchecked',
    explanation: 'The subject here is "Millions of photos" (plural). The action is a present, daily occurrence. Therefore, we use the Present Simple Passive for a plural subject: are + past participle (uploaded).'
  },
])

// --- Computed Properties for a Dynamic UI ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(q => q.status === 'correct').length)
const progress = computed(() => (score.value / totalQuestions.value) * 100)

const scoreMessage = computed(() => {
  const percentage = progress.value
  if (percentage === 100) return "Perfect Score! You have mastered this unit."
  if (percentage >= 75) return "Excellent work! You have a strong understanding."
  if (percentage >= 50) return "Good effort! Review the explanations to solidify your knowledge."
  return "Keep practicing. Review the material and the explanations carefully."
})

// --- Core Logic & Methods ---

/**
 * Validates all user answers, updates the status of each question,
 * and reveals the results section.
 */
function checkAnswers() {
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\./g, '')
    const isAnswerCorrect = q.correctAnswers.some(correct => correct.toLowerCase() === userAnswerCleaned)
    q.status = isAnswerCorrect ? 'correct' : 'incorrect'
  })
  showResult.value = true
}

/**
 * Resets the entire exercise to its initial state for another attempt.
 */
function tryAgain() {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.status = 'unchecked'
  })
  // Scroll to the top of the practice section
  const practiceEl = document.getElementById('practice-section')
  if (practiceEl) {
    practiceEl.scrollIntoView({ behavior: 'smooth' })
  }
}

// --- Navigation ---
function goToPreviousUnit() {
  // In a real app, you might have a check here or disable the button.
  // For this example, we'll navigate to a conceptual home/list page.
  router.push("/units/grammar")
}

function goToNextUnit() {
  router.push("/units/grammar/2")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Interactive exercises based on the book by Raymond Murphy."
    unit-title="Unit 1: Passive 1 (is done / was done)"
    unit-description="Focusing on the structure and use of the Present Simple Passive and Past Simple Passive."
    :categories="['Passive Voice', 'Verb Tenses', 'Sentence Structure']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: Explanations and Examples                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Understanding the Passive</CardTitle>
          <CardDescription>When the action is more important than who does it.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>We use the passive voice when the person or thing doing the action (the agent) is unknown, obvious, or unimportant. The focus is on the person or thing affected by the action.</p>
          <div class="rounded-md border bg-muted/50 p-4">
            <p><span class="font-bold text-blue-600">Active:</span> Somebody cleans this office every day.</p>
            <p><span class="font-bold text-emerald-600">Passive:</span> This office <strong class="underline decoration-wavy">is cleaned</strong> every day.</p>
          </div>
          <div class="rounded-md border bg-muted/50 p-4">
            <p><span class="font-bold text-blue-600">Active:</span> Alexander Fleming discovered penicillin in 1928.</p>
            <p><span class="font-bold text-emerald-600">Passive:</span> Penicillin <strong class="underline decoration-wavy">was discovered</strong> in 1928 by Alexander Fleming.</p>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Structure: BE + Past Participle</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">The fundamental structure is always a form of the verb <code class="font-bold">to be</code> followed by the <code class="font-bold">past participle</code> (e.g., done, seen, broken, built).</p>
          <div>
            <h4 class="font-medium">Present Simple Passive</h4>
            <p class="text-muted-foreground">For habits, facts, and regular occurrences.</p>
            <p class="mt-1 rounded-md bg-gray-100 p-2 font-mono text-sm dark:bg-gray-800">
              Subject + <span class="text-sky-500">am / is / are</span> + Past Participle
            </p>
            <p class="mt-2 text-sm italic">Example: "English <strong class="text-sky-500">is spoken</strong> all over the world."</p>
          </div>
          <div>
            <h4 class="font-medium">Past Simple Passive</h4>
            <p class="text-muted-foreground">For completed actions in the past.</p>
            <p class="mt-1 rounded-md bg-gray-100 p-2 font-mono text-sm dark:bg-gray-800">
              Subject + <span class="text-orange-500">was / were</span> + Past Participle
            </p>
            <p class="mt-2 text-sm italic">Example: "The pyramids <strong class="text-orange-500">were built</strong> thousands of years ago."</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice SLOT: Interactive Questions                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-m-20">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Complete the sentences using the correct passive form.</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-8" @submit.prevent="checkAnswers">
              <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
                <label :for="`q${question.id}`" class="block text-sm font-medium">
                  <span class="font-bold">Question {{ index + 1 }}:</span> {{ question.type }}
                </label>
                <p class="text-sm text-muted-foreground italic" v-if="question.context">{{ question.context }}</p>
                <p class="mt-1 text-base text-card-foreground">{{ question.prompt }}</p>
                <div class="flex items-center gap-2">
                  <span v-if="question.starter" class="font-semibold text-muted-foreground">{{ question.starter }}</span>
                  <Input
                    :id="`q${question.id}`"
                    v-model="question.userAnswer"
                    type="text"
                    :placeholder="question.starter ? '...' : 'Your answer...'"
                    class="flex-1"
                    :disabled="showResult"
                  />
                </div>
              </div>

              <Button v-if="!showResult" type="submit" class="w-full">
                Check Answers
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: Score and Detailed Explanations                           -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex-1">
              <CardTitle class="flex items-center gap-2 text-2xl">
                <Trophy class="h-6 w-6 text-yellow-500" />
                Your Results
              </CardTitle>
              <CardDescription>{{ scoreMessage }}</CardDescription>
            </div>
            <Button @click="tryAgain">
              <HelpCircle class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm font-medium">
              <span>Overall Score</span>
              <span>{{ score }} / {{ totalQuestions }}</span>
            </div>
            <Progress :model-value="progress" />
          </div>

          <!-- Detailed Answer Breakdown -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Answer Review</h3>
            <div v-for="question in questions" :key="`result-${question.id}`">
              <Alert :variant="question.status === 'correct' ? 'default' : 'destructive'" class="bg-card">
                 <component :is="question.status === 'correct' ? CheckCircle2 : XCircle" class="h-5 w-5" :class="{'text-green-500': question.status === 'correct', 'text-red-500': question.status === 'incorrect'}"/>
                <AlertTitle class="font-bold">Question: {{ question.prompt }}</AlertTitle>
                <AlertDescription class="mt-2 space-y-2 text-foreground">
                  <p>
                    <span class="font-semibold">Your Answer:</span>
                    <span :class="{'text-green-600 dark:text-green-400': question.status === 'correct', 'text-red-600 dark:text-red-400 line-through': question.status === 'incorrect'}">
                      {{ question.userAnswer || 'No answer provided' }}
                    </span>
                  </p>
                  <p v-if="question.status === 'incorrect'">
                    <span class="font-semibold">Correct Answer(s):</span>
                    <span class="font-mono rounded bg-green-100 px-1 py-0.5 text-green-800 dark:bg-green-900/50 dark:text-green-300">{{ question.correctAnswers.join(' / ') }}</span>
                  </p>
                  <div class="mt-2 rounded-md border border-amber-500/30 bg-amber-50/50 p-3 dark:bg-amber-900/20">
                    <p class="text-sm font-semibold text-amber-800 dark:text-amber-300">Explanation:</p>
                    <p class="text-sm text-amber-700 dark:text-amber-400">{{ question.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>
