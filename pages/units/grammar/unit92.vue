<!--
  File: ~/pages/units/grammar/26.vue
  Unit: 26 - Relative clauses 2: Clauses with and without who/that/which
  Description: An advanced grammar practice page based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth explanations and a challenging exercise to master the omission of relative pronouns.
-->
<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: In-depth learning content                                    -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Key Concepts: Omitting the Relative Pronoun</CardTitle>
          <CardDescription>
            Understanding when you can omit <strong>who</strong>, <strong>that</strong>, or <strong>which</strong> is key to sounding more natural in English. The rule depends on whether the pronoun is the <em>subject</em> or the <em>object</em> of the relative clause.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6 text-sm">
          <!-- Section A: When the pronoun is the OBJECT -->
          <div>
            <h4 class="mb-2 font-semibold text-base">A. When the Pronoun is the OBJECT</h4>
            <p class="mb-3">
              You can (and often should) omit <strong>who/that/which</strong> when it is the <strong>object</strong> of the verb in the relative clause. This means another noun or pronoun is performing the action.
            </p>
            <div class="space-y-2 rounded-md border p-4">
              <p>The woman <strong class="text-blue-600">who</strong> I wanted to see was on holiday.</p>
              <p>→ The woman I wanted to see was on holiday. <span class="text-green-600 font-semibold">(Correct, 'I' is the subject of 'wanted')</span></p>
              <hr class="my-2">
              <p>Have you found the keys <strong class="text-blue-600">that</strong> you lost?</p>
              <p>→ Have you found the keys you lost? <span class="text-green-600 font-semibold">(Correct, 'you' is the subject of 'lost')</span></p>
              <hr class="my-2">
              <p>The dress <strong class="text-blue-600">which</strong> Ann bought doesn't fit her.</p>
              <p>→ The dress Ann bought doesn't fit her. <span class="text-green-600 font-semibold">(Correct, 'Ann' is the subject of 'bought')</span></p>
            </div>
          </div>

          <!-- Section B: When the pronoun is the SUBJECT -->
          <div>
            <h4 class="mb-2 font-semibold text-base">B. When the Pronoun is the SUBJECT</h4>
            <p class="mb-3">
              You <strong>cannot</strong> omit <strong>who/that/which</strong> when it is the <strong>subject</strong> of the verb in the relative clause.
            </p>
            <div class="space-y-2 rounded-md border p-4">
              <p>I know a man <strong class="text-red-600">who</strong> can speak six languages.</p>
              <p>→ <span class="line-through">I know a man can speak six languages.</span> <span class="text-red-600 font-semibold">(Incorrect, 'who' is the subject of 'can speak')</span></p>
              <hr class="my-2">
              <p>The woman <strong class="text-red-600">who</strong> lives next door is a doctor.</p>
              <p>→ <span class="line-through">The woman lives next door is a doctor.</span> <span class="text-red-600 font-semibold">(Incorrect, 'who' is the subject of 'lives')</span></p>
              <hr class="my-2">
              <p>We have a car <strong class="text-red-600">that</strong> never breaks down.</p>
              <p>→ <span class="line-through">We have a car never breaks down.</span> <span class="text-red-600 font-semibold">(Incorrect, 'that' is the subject of 'breaks down')</span></p>
            </div>
          </div>
          
          <!-- Section C: Pronouns and Prepositions -->
          <div>
            <h4 class="mb-2 font-semibold text-base">C. Relative Clauses with Prepositions</h4>
            <p class="mb-3">
              When a preposition is involved, the object pronoun can still be omitted if the preposition is at the end of the clause. This is very common in spoken English.
            </p>
            <div class="space-y-2 rounded-md border p-4">
               <p>The hotel <strong class="text-blue-600">which</strong> we stayed <strong>at</strong> was very clean.</p>
              <p>→ The hotel we stayed <strong>at</strong> was very clean. <span class="text-green-600 font-semibold">(Correct, 'we' is the subject of 'stayed')</span></p>
               <hr class="my-2">
              <p>This is the music <strong class="text-blue-600">that</strong> I was telling you <strong>about</strong>.</p>
              <p>→ This is the music I was telling you <strong>about</strong>. <span class="text-green-600 font-semibold">(Correct, 'I' is the subject of 'was telling')</span></p>
               <hr class="my-2">
               <p class="font-bold">Formal structure (preposition at the beginning):</p>
               <p>The hotel <strong>at which</strong> we stayed... (Here, you cannot omit 'which'.)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Challenging interactive questions                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 26: Practice Exercises</CardTitle>
          <CardDescription>
            For each sentence, fill the gap with <strong>who/that/which</strong> if necessary. If a pronoun is <em>not</em> necessary, type a hyphen (<strong>-</strong>) in the box.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="grid gap-3">
            <Label :for="`q${question.id}`" class="font-medium">
              {{ index + 1 }}. {{ question.partA }}
              <Input
                :id="`q${question.id}`"
                v-model="userAnswers[index]"
                class="inline-block w-24 mx-2 border-dashed text-center font-semibold"
                :disabled="isSubmitted"
              />
              {{ question.partB }}
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" @click="validateAnswers">Check Answers</Button>
          <Button v-else variant="outline" @click="resetQuiz">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: Detailed validator and score display                           -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="bg-card">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <Progress :model-value="score" class="w-full" />
            <span class="font-bold text-lg whitespace-nowrap">{{ score.toFixed(0) }} %</span>
          </div>
          <CardDescription class="pt-2">{{ scoreMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div
            v-for="result in results"
            :key="result.id"
            class="rounded-lg border p-4"
            :class="result.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'"
          >
            <p class="font-semibold text-sm mb-2">
              <span v-if="result.isCorrect" class="text-green-600 dark:text-green-400">Correct:</span>
              <span v-else class="text-red-600 dark:text-red-400">Incorrect:</span>
              {{ result.question.partA }}...{{ result.question.partB }}
            </p>
            <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
              <span class="font-medium text-muted-foreground">Your answer:</span>
              <span class="font-mono" :class="result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-500'">
                '{{ result.userAnswer || ' ' }}'
              </span>
              
              <span class="font-medium text-muted-foreground">Correct answer(s):</span>
              <span class="font-mono text-green-700 dark:text-green-400">'{{ result.correctOptions.join("', '") }}'</span>
              
              <span class="font-medium text-muted-foreground col-span-2 pt-2">Explanation:</span>
              <p class="col-span-2 text-sm">{{ result.explanation }}</p>
            </div>
          </div>
        </CardContent>
       </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

// --- Page & Layout Configuration ---
const pageDetails = {
  testTitle: "English Grammar In Use Practice",
  testDescription: "Advanced exercises based on the world's best-selling grammar book by Raymond Murphy.",
  unitTitle: "Unit 26: Relative clauses 2",
  unitDescription: "Clauses with and without who/that/which. Mastering when to omit the relative pronoun.",
  categories: ['Grammar', 'Clauses', 'Advanced', 'Pronouns']
}

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/25")
const goToNextUnit = () => router.push("/units/grammar/27")

// --- Question & Answer State ---
interface Question {
  id: number
  partA: string
  partB: string
  correctAnswers: string[]
  explanation: string
  role: 'subject' | 'object'
}

const questions = ref<Question[]>([
  {
    id: 1,
    partA: 'The speech',
    partB: 'he made was very inspiring.',
    correctAnswers: ['-', 'that', 'which'],
    explanation: "The relative pronoun is the OBJECT of the verb 'made' (he made [the speech]). Therefore, it can be omitted, which is the most natural-sounding option. 'that' or 'which' are also grammatically correct.",
    role: 'object',
  },
  {
    id: 2,
    partA: 'What was the name of the person',
    partB: 'called you earlier?',
    correctAnswers: ['who', 'that'],
    explanation: "The relative pronoun is the SUBJECT of the verb 'called' ([the person] called you). Therefore, it CANNOT be omitted. 'who' is typically used for people.",
    role: 'subject',
  },
  {
    id: 3,
    partA: 'The restaurant',
    partB: 'we went to last night was exceptional.',
    correctAnswers: ['-', 'that', 'which'],
    explanation: "The relative pronoun is the OBJECT ('we went to [the restaurant]'). Because the preposition 'to' is at the end of the clause, the pronoun can be omitted. This is very common.",
    role: 'object',
  },
  {
    id: 4,
    partA: 'I don\'t like stories',
    partB: 'have unhappy endings.',
    correctAnswers: ['that', 'which'],
    explanation: "The relative pronoun is the SUBJECT of the verb 'have' ([stories] have unhappy endings). It cannot be omitted. 'that' or 'which' are correct for things.",
    role: 'subject',
  },
  {
    id: 5,
    partA: 'Is this the article',
    partB: 'you were interested in?',
    correctAnswers: ['-', 'that', 'which'],
    explanation: "The relative pronoun is the OBJECT of the preposition 'in' ('you were interested in [the article]'). Since the preposition is at the end, the pronoun can be omitted.",
    role: 'object',
  },
  {
    id: 6,
    partA: 'The architect',
    partB: 'designed this building is famous.',
    correctAnswers: ['who', 'that'],
    explanation: "The relative pronoun is the SUBJECT of the verb 'designed' ([the architect] designed this building). You cannot omit the subject pronoun.",
    role: 'subject',
  },
  {
    id: 7,
    partA: 'The money',
    partB: 'was on the table has disappeared.',
    correctAnswers: ['that', 'which'],
    explanation: "The relative pronoun is the SUBJECT of the verb 'was' ([the money] was on the table). It is essential and cannot be omitted.",
    role: 'subject',
  },
    {
    id: 8,
    partA: 'It was a machine',
    partB: 'I had never seen before.',
    correctAnswers: ['-', 'that', 'which'],
    explanation: "The relative pronoun is the OBJECT of the verb 'seen' ('I had never seen [the machine] before'). It is optional and best omitted for natural flow.",
    role: 'object',
  }
])

const userAnswers = ref<string[]>(Array(questions.value.length).fill(''))
const isSubmitted = ref(false)

// --- Result & Validation Logic ---
interface Result {
  id: number
  question: Question
  userAnswer: string
  isCorrect: boolean
  correctOptions: string[]
  explanation: string
}

const results = ref<Result[]>([])
const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return (correctCount / questions.value.length) * 100
})

const scoreMessage = computed(() => {
  const s = score.value
  if (s === 100) return "Perfect score! You have an excellent command of this topic."
  if (s >= 80) return "Great job! You have a strong understanding of when to omit relative pronouns."
  if (s >= 60) return "Good effort. Review the explanations below to solidify your knowledge."
  return "This is a tricky topic. Carefully read the explanations for each question to improve."
})

const normalizeAnswer = (answer: string) => answer.trim().toLowerCase()

function validateAnswers() {
  const validationResults: Result[] = []
  questions.value.forEach((q, index) => {
    const userAnswer = normalizeAnswer(userAnswers.value[index])
    const correctAnswersNormalized = q.correctAnswers.map(normalizeAnswer)

    let isCorrect = correctAnswersNormalized.includes(userAnswer)
    
    // Special check for omission: If the user correctly omits the pronoun ('-'),
    // but the best answer is a pronoun, we can guide them. Here we are strict.
    // The most important distinction is subject vs object.
    const isOmissionCorrect = q.role === 'object'
    const userOmitted = userAnswer === '-' || userAnswer === ''
    
    if (isOmissionCorrect && userOmitted) {
      isCorrect = true
    } else if (!isOmissionCorrect && userOmitted) {
      isCorrect = false
    } else {
      isCorrect = correctAnswersNormalized.includes(userAnswer)
    }

    validationResults.push({
      id: q.id,
      question: q,
      userAnswer: userAnswers.value[index].trim(),
      isCorrect,
      correctOptions: q.correctAnswers,
      explanation: q.explanation,
    })
  })
  results.value = validationResults
  isSubmitted.value = true
  
  // Scroll to the results section for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetQuiz() {
  isSubmitted.value = false
  userAnswers.value.fill('')
  results.value = []
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
/* A simple fade transition for the result block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
