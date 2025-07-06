<!--
  File: @/pages/units/grammar/1.vue
  Description: An advanced grammar practice module for Unit 1, focusing on passive reporting structures.
  This page integrates with GrammarLayout to provide learning material, challenging exercises,
  and a detailed validation and results system.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  // As this is Unit 1, we'll navigate to a conceptual grammar home.
  // In a real app, you might disable this button or handle it differently.
  router.push('/units/grammar')
}
function goToNextUnit() {
  router.push('/units/grammar/2')
}

// --- Component State ---
const showResult = ref(false)

interface Question {
  id: number
  type: 'rewrite' | 'fill'
  prompt: string
  context?: string
  userAnswer: string
  correctAnswers: string[]
  isCorrect: boolean | null
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'rewrite',
    prompt: 'Rewrite the following sentence beginning with the words given:',
    context: 'Everyone alleges that the CEO has been avoiding taxes for years. -> The CEO...',
    userAnswer: '',
    correctAnswers: ['The CEO is alleged to have been avoiding taxes for years.'],
    isCorrect: null,
    explanation:
      "This question tests the transformation from an active reporting clause to a personal passive structure with a perfect continuous infinitive. Since the alleged action ('avoiding taxes') has been happening over a period of time up to the present, 'to have been avoiding' is the correct form to reflect this ongoing past action.",
  },
  {
    id: 2,
    type: 'rewrite',
    prompt: 'Rewrite the sentence using an impersonal passive structure starting with "It...".',
    context: 'Financial analysts expect that the interest rates will rise sharply next quarter.',
    userAnswer: '',
    correctAnswers: ['It is expected that the interest rates will rise sharply next quarter.'],
    isCorrect: null,
    explanation:
      "The impersonal structure 'It is said/expected/reported that...' is used for general beliefs or reports. The original sentence's tense ('expect' - present simple) determines the passive verb tense ('is expected'). The clause that follows remains unchanged.",
  },
  {
    id: 3,
    type: 'fill',
    prompt: 'Complete the sentence using the verb in brackets and "supposed to". Pay close attention to the tense and form.',
    context: 'The architect’s original plans were beautiful. This building ________ (be) much taller.',
    userAnswer: '',
    correctAnswers: ['was supposed to be'],
    isCorrect: null,
    explanation:
      "'Was supposed to' is used here to express a lost expectation or an original plan that did not happen. Since the context is in the past ('The plans were...'), the past form 'was' is required.",
  },
  {
    id: 4,
    type: 'rewrite',
    prompt: 'Rewrite the following sentence beginning with the words given:',
    context: 'Historians believe that the Vikings discovered America long before Columbus. -> The Vikings...',
    userAnswer: '',
    correctAnswers: ['The Vikings are believed to have discovered America long before Columbus.'],
    isCorrect: null,
    explanation:
      "This tests the use of the perfect infinitive ('to have discovered'). The main reporting verb is in the present ('believe' -> 'are believed'), but the action of discovering happened in the distant past. Therefore, we must use 'to have + past participle' to show the action occurred before the time of believing.",
  },
  {
    id: 5,
    type: 'fill',
    prompt: 'Complete the sentence using the verb in brackets and "supposed to".',
    context: 'Be quiet! You ________ (not/make) any noise in the library.',
    userAnswer: '',
    correctAnswers: ['are not supposed to make', "aren't supposed to make"],
    isCorrect: null,
    explanation:
      "Here, 'are not supposed to' conveys a rule, duty, or expectation. It's a prohibition, similar in meaning to 'You shouldn't make...'. The present tense 'are' is used because it's a current rule.",
  },
  {
    id: 6,
    type: 'rewrite',
    prompt: 'Rewrite the sentence using an impersonal passive structure.',
    context: 'People once thought that bathing was unhealthy.',
    userAnswer: '',
    correctAnswers: ['It was once thought that bathing was unhealthy.'],
    isCorrect: null,
    explanation:
      "This question requires recognizing the past tense of the original reporting verb ('thought'). Consequently, the impersonal passive structure must also be in the past: 'It was thought that...'. The rest of the clause remains the same.",
  },
  {
    id: 7,
    type: 'rewrite',
    prompt: 'Rewrite the following sentence beginning with the words given:',
    context: 'The police have confirmed that two men escaped from the high-security prison. -> Two men...',
    userAnswer: '',
    correctAnswers: ['Two men have been confirmed to have escaped from the high-security prison.'],
    isCorrect: null,
    explanation:
      "This is a complex transformation. The reporting verb is present perfect ('have confirmed'), so the passive form is 'have been confirmed'. The action of escaping also happened in the past relative to the confirmation, so a perfect infinitive 'to have escaped' is necessary.",
  },
  {
    id: 8,
    type: 'fill',
    prompt: 'Complete the sentence using a suitable passive reporting verb and the correct form of the verb in brackets.',
    context: 'The ancient manuscript is badly damaged. It ________ (consider) to be over two thousand years old.',
    userAnswer: '',
    correctAnswers: ['is considered'],
    isCorrect: null,
    explanation:
      "This question tests vocabulary and structure. 'Considered' is a common reporting verb used in this passive pattern. The sentence requires a present simple passive form ('is considered') to match the present state of the manuscript ('is badly damaged').",
  },
])

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  return questions.value.length > 0 ? (score.value / questions.value.length) * 100 : 0
})

// --- Methods ---
function checkAnswers() {
  questions.value.forEach((q) => {
    // Normalize user input and correct answers for more robust checking
    const normalizedUserAnswer = q.userAnswer.trim().replace(/\s+/g, ' ').toLowerCase()
    const normalizedCorrectAnswers = q.correctAnswers.map(a => a.trim().replace(/\s+/g, ' ').toLowerCase())
    q.isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer)
  })
  showResult.value = true
  // Scroll to results for better UX
  // In a real app, you might want a more sophisticated scroll-to-element solution
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function retry() {
  showResult.value = false
  questions.value.forEach((q) => {
    q.userAnswer = ''
    q.isCorrect = null
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced English Grammar In Use Practice"
    test-description="A series of challenging exercises based on the renowned Raymond Murphy grammar book."
    unit-title="Unit 1: Passive Reporting Structures"
    unit-description="Master the use of 'It is said that...', 'He is said to...', and 'He is supposed to...' to report information and express expectations impersonally."
    :categories="['Passive Voice', 'Reporting Verbs', 'Advanced Structures', 'Infinitive Forms']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL                                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Core Concepts: Passive Reporting</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-6 text-sm">
          <div class="prose prose-sm dark:prose-invert max-w-none">
            <p>
              These structures allow us to report opinions, beliefs, and facts without naming the specific source. They are very common in formal and academic writing, and news reporting. We will focus on two main patterns and a related expression.
            </p>
            
            <h4 class="font-semibold">Pattern 1: The Impersonal Passive</h4>
            <p class="font-mono bg-muted p-2 rounded">It + passive reporting verb + that-clause</p>
            <p>This pattern reports a general belief. The focus is on the information itself.</p>
            <ul>
              <li>Active: <em>People believe that the castle is haunted.</em></li>
              <li>Passive: <strong>It is believed that</strong> the castle is haunted.</li>
            </ul>
            <ul>
              <li>Active: <em>They reported that the talks had failed.</em></li>
              <li>Passive: <strong>It was reported that</strong> the talks had failed. (Note the tense change)</li>
            </ul>

            <h4 class="font-semibold">Pattern 2: The Personal Passive</h4>
            <p class="font-mono bg-muted p-2 rounded">Subject + passive reporting verb + to-infinitive</p>
            <p>This pattern focuses on the subject of the report. It often feels more direct.</p>
            <ul>
              <li>Active: <em>People believe that <strong>the castle</strong> is haunted.</em></li>
              <li>Passive: <strong>The castle is believed to be</strong> haunted.</li>
            </ul>
            <p><strong>Crucial Rule: Infinitive Tense</strong></p>
            <ul class="space-y-2">
              <li>If the reported action happens at the <em>same time or in the future</em>, use a <strong>simple infinitive</strong> (to be / to do).<br>
                <em>He is known <strong>to love</strong> spicy food. (he loves it now)</em>
              </li>
              <li>If the reported action happened in the <em>past</em>, use a <strong>perfect infinitive</strong> (to have been / to have done).<br>
                <em>She is thought <strong>to have left</strong> the country last week. (she left in the past)</em>
              </li>
            </ul>

            <h4 class="font-semibold">Related Expression: Be Supposed To</h4>
            <p>This versatile phrase has two distinct meanings:</p>
            <ol>
              <li>
                <strong>What is generally said or believed (Reputation):</strong>
                <p>This is very similar to 'is said to'.</p>
                <ul><li><em>I want to see that film. It’s <strong>supposed to be</strong> excellent.</em> (= It is said to be excellent)</li></ul>
              </li>
              <li>
                <strong>What is intended, arranged, or expected (Duty/Arrangement):</strong>
                <p>This often implies that the reality is different from the expectation.</p>
                <ul>
                  <li><em>The train was <strong>supposed to arrive</strong> at 11:30, but it was an hour late.</em> (The plan failed)</li>
                  <li><em>You are not <strong>supposed to park</strong> here. It's a private space.</em> (It's against the rules)</li>
                </ul>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Read each instruction carefully. Type your full answer in the box.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <label :for="`q${question.id}`" class="text-sm font-medium">
              <span class="font-bold">Question {{ index + 1 }}.</span>
              {{ question.prompt }}
            </label>
            <p v-if="question.context" class="text-sm text-muted-foreground italic bg-slate-100 dark:bg-slate-800 p-3 rounded-md">"{{ question.context }}"</p>
            <Input
              :id="`q${question.id}`"
              v-model="question.userAnswer"
              :disabled="showResult"
              placeholder="Type your answer here..."
              @keyup.enter="checkAnswers"
            />
          </div>
          <Button v-if="!showResult" class="w-full" @click="checkAnswers">
            Check Answers
          </Button>
           <Button v-else class="w-full" variant="secondary" @click="retry">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS & VALIDATION                                                    -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
            You scored {{ score }} out of {{ questions.length }}. Review the detailed explanations below to improve.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <span class="text-sm font-medium">Score: {{ Math.round(scorePercentage) }}%</span>
            <Progress :model-value="scorePercentage" class="w-full" />
          </div>

          <div v-for="question in questions" :key="`result-${question.id}`" class="space-y-3">
            <Alert :variant="question.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="[question.isCorrect ? 'border-green-500' : 'border-red-500']">
              <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
              <AlertTitle class="font-bold">Question: {{ question.context }}</AlertTitle>
              <AlertDescription class="flex flex-col gap-2 mt-2">
                <div>
                  <span class="font-semibold">Your answer:</span>
                  <span class="italic ml-2" :class="[question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400 line-through']">
                    {{ question.userAnswer || 'No answer provided' }}
                  </span>
                </div>
                <div>
                  <span class="font-semibold">Correct answer:</span>
                  <span class="italic ml-2 text-green-700 dark:text-green-400">{{ question.correctAnswers[0] }}</span>
                </div>
                <div class="mt-2 pt-2 border-t border-border/60">
                  <p class="font-semibold flex items-center gap-2">
                    <AlertCircle class="h-4 w-4" />
                    Explanation
                  </p>
                  <p class="text-xs text-muted-foreground leading-relaxed">{{ question.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
          
           <Button class="w-full" variant="secondary" @click="retry">
            Practice Again
          </Button>

        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
