<!--
  File: @/pages/units/grammar/0.vue
  Unit: 0
  Topic: Verb (+ object) + to … (I want you to …)
  Description: A deep-dive into constructing sentences with verbs followed by an infinitive,
  both with and without a direct object. This page is designed for intermediate to advanced
  learners, focusing on subtle distinctions and common errors.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Award, BookOpen } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own custom layout component, not a Nuxt layout file
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real app, you might navigate to an index or handle this disabled state more gracefully.
  // For unit 0, there is no previous unit.
  alert("You are at the first unit.")
}
function goToNextUnit() {
  router.push("/units/grammar/1")
}

// --- UNIT DATA & STATE MANAGEMENT ---

interface Question {
  id: number
  type: 'fill-in-the-blank' | 'multiple-choice' | 'sentence-rewrite' | 'error-correction'
  prompt: string
  // For fill-in-the-blank
  structure?: string
  // For multiple-choice
  options?: { value: string; label: string }[]
  // The logic to validate the answer
  validator: (answer: string) => boolean
  // The definitive correct answer for display
  correctAnswerDisplay: string
  // The pedagogical explanation for the result
  explanation: string
}

// --- QUESTIONS DATABASE ---
// Designed to be challenging, covering various verbs and contexts.
const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'sentence-rewrite',
    prompt: "Rewrite the following sentence using the verb 'persuade'. Original: 'I talked to my manager for an hour and, in the end, he agreed to give me a promotion.'",
    validator: (answer) => {
      const lowerAnswer = answer.toLowerCase().trim()
      return lowerAnswer.includes('persuaded my manager to give me') || lowerAnswer.includes('persuaded him to give me')
    },
    correctAnswerDisplay: "I persuaded my manager to give me a promotion.",
    explanation: "The verb 'persuade' means to make someone agree to do something by talking to them a lot about it. The correct structure is `persuade + object + to-infinitive`. Your sentence must include 'persuaded my manager' followed by 'to give'."
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: "The new company policy doesn't ______ staff to work from home more than two days a week.",
    options: [
      { value: 'let', label: 'let' },
      { value: 'allow', label: 'allow' },
      { value: 'make', label: 'make' }
    ],
    validator: (answer) => answer === 'allow',
    correctAnswerDisplay: "allow",
    explanation: "This question tests the verb pattern. 'Let' uses the bare infinitive (`let staff work`), but the sentence has a `to-infinitive` (`to work`). 'Make' implies force (`make staff work`) and also uses the bare infinitive. 'Allow' correctly uses the structure `allow + object + to-infinitive` (`allow staff to work`)."
  },
  {
    id: 3,
    type: 'error-correction',
    prompt: "Find and correct the grammatical error in this sentence: 'My lawyer suggested me to review the contract carefully before signing.'",
    validator: (answer) => {
      const lowerAnswer = answer.toLowerCase().trim()
      // Correct forms: suggest that I review... OR advise me to review...
      return lowerAnswer.includes('suggested that i review') || lowerAnswer.includes('advised me to review')
    },
    correctAnswerDisplay: "My lawyer suggested that I review the contract... OR My lawyer advised me to review the contract...",
    explanation: "This is a very common mistake. The verb 'suggest' cannot be followed by `object + to-infinitive`. The correct patterns are `suggest + that-clause` (e.g., 'suggested that I review') or `suggest + gerund` (e.g., 'suggested reviewing'). To use the `object + to-infinitive` structure, you must change the verb to 'advise' ('advised me to review')."
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    prompt: "Despite the initial refusal, we eventually ______ the board to approve the new budget.",
    structure: "(managed / the board / approve)",
    validator: (answer) => {
      const lowerAnswer = answer.toLowerCase().trim().replace(/\s+/g, ' ')
      return lowerAnswer === 'managed to get the board to approve' || lowerAnswer === 'managed to persuade the board to approve'
    },
    correctAnswerDisplay: "managed to get the board to approve",
    explanation: "The phrase 'managed to' is followed directly by an infinitive (e.g., 'we managed to convince them'). To insert an object ('the board'), you need a causative verb like 'get' or 'persuade'. The correct structure becomes `managed to + [verb like get/persuade] + object + to-infinitive`."
  },
  {
    id: 5,
    type: 'multiple-choice',
    prompt: "I would ______ you not to invest in that company; it's too risky.",
    options: [
      { value: 'advise', label: 'advise' },
      { value: 'warn', label: 'warn' },
      { value: 'forbid', label: 'forbid' }
    ],
    validator: (answer) => answer === 'warn',
    correctAnswerDisplay: "warn",
    explanation: "'Advise' is possible (`advise you not to...`), but 'warn' is stronger and fits the context of risk better. 'Forbid' (`forbid you to...`) is too strong, as it implies using authority to stop an action completely. 'Warn' best captures the sense of cautioning someone against a potential danger, using the structure `warn + object + not + to-infinitive`."
  },
  {
    id: 6,
    type: 'error-correction',
    prompt: "Find and correct the error: 'She told to her assistant to reschedule the meeting.'",
    validator: (answer) => {
      const lowerAnswer = answer.toLowerCase().trim()
      return lowerAnswer.includes('told her assistant to reschedule') && !lowerAnswer.includes('told to her')
    },
    correctAnswerDisplay: "She told her assistant to reschedule the meeting.",
    explanation: "The verb 'tell' in this structure is a transitive verb that takes a direct object without a preposition. The pattern is `tell + object + to-infinitive`. The preposition 'to' is incorrect. We say 'tell someone', not 'tell to someone'. Compare this with 'say', where you might say 'I said to him...'"
  }
])

// --- REACTIVE STATE FOR THE QUIZ ---
const userAnswers = ref<string[]>(Array(questions.length).fill(''))
const validationResults = ref<any[]>([])
const submitted = ref(false)

// --- COMPUTED PROPERTIES FOR RESULTS ---
const score = computed(() => {
  return validationResults.value.filter(res => res.isCorrect).length
})

const totalQuestions = computed(() => questions.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

const scoreFeedback = computed(() => {
  if (!submitted.value) return ""
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Perfect Score!", message: "Outstanding! You have a masterful command of this complex grammatical structure.", variant: "success" }
  if (percentage >= 80) return { title: "Excellent Work!", message: "You have a strong understanding of these verb patterns. Review the explanations for any missed questions to achieve mastery.", variant: "success" }
  if (percentage >= 60) return { title: "Good Effort!", message: "A solid performance. This is a tricky topic. Focus on the detailed explanations to clear up any confusion.", variant: "info" }
  return { title: "Needs Review", message: "This unit is challenging. Please carefully re-read the learning material and the explanations for each question. Practice makes perfect!", variant: "warning" }
})

// --- CORE LOGIC FUNCTIONS ---
function handleSubmit() {
  if (submitted.value) return

  const results = questions.map((question, index) => {
    const userAnswer = userAnswers.value[index] || ""
    const isCorrect = question.validator(userAnswer)
    return {
      ...question,
      userAnswer,
      isCorrect,
    }
  })
  validationResults.value = results
  submitted.value = true
  
  // Scroll to results
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  userAnswers.value = Array(questions.length).fill('')
  validationResults.value = []
  submitted.value = false
  
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced English Grammar Practice"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 0: Verb (+ object) + to … (I want you to …)"
    unit-description="Mastering the use of infinitives after verbs, with a focus on structures that include an object."
    :categories="['Verbs', 'Infinitives', 'Sentence Structure', 'Advanced']"
    :show-result="submitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: The Learning Section                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            <span>Core Concept: The Infinitive Complement</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <p>Many English verbs can be followed by another action. When this second action is expressed with a <strong class="text-primary">'to-infinitive'</strong> (to + base verb), it's called an infinitive complement. We will explore two primary patterns.</p>
          
          <div class="rounded-md border border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <p><strong>Pattern 1: Verb + to-infinitive</strong> (No object between verbs)</p>
            <p class="text-muted-foreground">The subject of the main verb is also the one doing the second action.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li>I <strong class="font-semibold">decided to leave</strong> early. (I decided, and I will leave)</li>
              <li>She <strong class="font-semibold">offered to help</strong> us. (She offered, and she would help)</li>
              <li>They are <strong class="font-semibold">planning to travel</strong> next year. (They are planning, and they will travel)</li>
            </ul>
            <p class="mt-2 text-xs text-muted-foreground">Common verbs: hope, plan, decide, agree, offer, refuse, seem, appear, promise, threaten.</p>
          </div>

          <div class="rounded-md border border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
            <p><strong>Pattern 2: Verb + object + to-infinitive</strong> (The core of this unit)</p>
            <p class="text-muted-foreground">The subject of the main verb causes, requests, or wants the <strong class="text-primary">object</strong> to do the second action.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li>I <strong class="font-semibold">want you to listen</strong> carefully. (I want, but you will listen)</li>
              <li>The teacher <strong class="font-semibold">told the students to be</strong> quiet. (The teacher told, the students will be quiet)</li>
              <li>He <strong class="font-semibold">persuaded me to change</strong> my mind. (He persuaded, I changed my mind)</li>
            </ul>
            <p class="mt-2 text-xs text-muted-foreground">Common verbs: want, ask, tell, advise, allow, expect, persuade, teach, order, warn, invite, remind.</p>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Award class="h-6 w-6 text-amber-500" />
            <span>Advanced Nuances & Common Errors</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <div>
            <h4 class="font-semibold">Advise vs. Suggest</h4>
            <p class="text-muted-foreground">This is a frequent point of confusion for learners.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li><strong class="text-green-600 dark:text-green-400">Correct:</strong> He <strong class="font-semibold">advised me to see</strong> a doctor. (advise + object + to-infinitive)</li>
              <li><strong class="text-green-600 dark:text-green-400">Correct:</strong> He <strong class="font-semibold">suggested that I see</strong> a doctor. (suggest + that-clause)</li>
              <li><strong class="text-red-600 dark:text-red-400">Incorrect:</strong> <span class="line-through">He suggested me to see a doctor.</span></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">Let vs. Allow</h4>
            <p class="text-muted-foreground">Both mean 'permit', but their grammar is different.</p>
             <ul class="mt-2 list-inside list-disc space-y-1">
              <li><strong class="font-semibold">Let</strong> uses the <strong class="text-primary">bare infinitive</strong> (no 'to'): My boss <strong class="font-semibold">let me go</strong> home early.</li>
              <li><strong class="font-semibold">Allow</strong> uses the <strong class="text-primary">to-infinitive</strong>: My boss <strong class="font-semibold">allowed me to go</strong> home early.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">Forming the Negative</h4>
            <p class="text-muted-foreground">Place <strong class="text-primary">'not'</strong> directly before the to-infinitive.</p>
             <ul class="mt-2 list-inside list-disc space-y-1">
              <li>The doctor <strong class="font-semibold">advised me not to worry</strong>.</li>
              <li>They <strong class="font-semibold">warned us not to be</strong> late.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Quiz Section                               -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section" class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Type your answers carefully. Punctuation is not graded.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.prompt }}</p>
            
            <!-- Fill-in-the-blank / Rewrite / Error Correction -->
            <div v-if="['fill-in-the-blank', 'sentence-rewrite', 'error-correction'].includes(question.type)">
              <Input
                v-model="userAnswers[index]"
                :placeholder="question.type === 'error-correction' ? 'Rewrite the corrected sentence...' : 'Your answer...'"
                :disabled="submitted"
                class="text-base"
              />
              <p v-if="question.structure" class="text-xs text-muted-foreground mt-1">Use the words: {{ question.structure }}</p>
            </div>
            
            <!-- Multiple Choice -->
            <div v-if="question.type === 'multiple-choice'">
              <RadioGroup v-model="userAnswers[index]" :disabled="submitted" class="gap-3">
                <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${question.id}-${option.value}`" :value="option.value" />
                  <Label :for="`q${question.id}-${option.value}`" class="text-base font-normal">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div class="flex justify-end gap-4 mt-8">
            <Button v-if="submitted" variant="outline" @click="resetQuiz">Try Again</Button>
            <Button @click="handleSubmit" :disabled="submitted">Check Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: The Validation and Explanation Section                       -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section" class="w-full">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance below. The explanations are key to improving.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score Summary -->
          <Alert :variant="scoreFeedback.variant">
            <AlertTitle class="font-bold text-lg">{{ scoreFeedback.title }}</AlertTitle>
            <AlertDescription>{{ scoreFeedback.message }}</AlertDescription>
            <div class="mt-4">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium">Score: {{ score }} / {{ totalQuestions }}</span>
                <span class="text-sm font-medium">{{ scorePercentage }}%</span>
              </div>
              <Progress :model-value="scorePercentage" class="w-full" />
            </div>
          </Alert>

          <!-- Detailed Question Breakdown -->
          <div v-for="(result, index) in validationResults" :key="`res-${result.id}`" class="rounded-lg border p-4">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <CheckCircle2 v-if="result.isCorrect" class="h-6 w-6 text-green-500" />
                <XCircle v-else class="h-6 w-6 text-red-500" />
              </div>
              <div class="flex-grow space-y-3">
                <p class="font-semibold">{{ index + 1 }}. {{ result.prompt }}</p>
                
                <!-- User's Answer -->
                <div class="flex items-center gap-3">
                  <span class="font-medium text-sm w-28 text-right">Your answer:</span>
                  <span 
                    class="flex-1 rounded-md px-3 py-1 text-sm"
                    :class="[result.isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300']"
                  >
                    {{ result.userAnswer || 'No answer provided' }}
                  </span>
                </div>

                <!-- Correct Answer -->
                <div class="flex items-center gap-3">
                  <span class="font-medium text-sm w-28 text-right">Correct answer:</span>
                  <span class="flex-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {{ result.correctAnswerDisplay }}
                  </span>
                </div>
                
                <!-- Explanation -->
                <div class="mt-2 rounded-md bg-muted/50 p-3">
                  <h4 class="font-semibold text-sm mb-1">Explanation:</h4>
                  <p class="text-sm text-muted-foreground">{{ result.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end pt-4">
             <Button variant="outline" @click="resetQuiz">Practice Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>
