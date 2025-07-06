<!--
  File: @/pages/units/grammar/4.vue
  Description: An advanced grammar practice unit focusing on First and Second Conditionals.
  Inspired by Unit 38 of Raymond Murphy's "English Grammar in Use".
  This page leverages the GrammarLayout to provide a structured learning path:
  1.  Material: In-depth explanation of the rules and their nuances.
  2.  Practice: A challenging quiz with context-based questions.
  3.  Result: A detailed validator with scoring and corrective feedback.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly in the template
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigate to the previous logical unit.
  router.push("/units/grammar/3")
}
function goToNextUnit() {
  // Navigate to the next logical unit.
  router.push("/units/grammar/5")
}

// --- State Management ---
const showResult = ref(false)
const userAnswers = ref<Record<string, string>>({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
  q6: '',
})

// --- Core Content: Questions & Explanations ---
// The questions are designed to test deep understanding, not just rote memorization.
// The explanations emulate a teacher's feedback, clarifying the 'why'.
const questions = ref([
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: "A friend is considering quitting their job without another one lined up. You think it's a bad idea. You say: 'If I ___ you, I ___ for a new job before quitting.'",
    options: [
      'am / will look',
      'were / would look',
      'was / would look',
      'were / will look'
    ],
    answer: 'were / would look',
    explanation: "This is a classic 'advice' scenario, which is hypothetical. You are not your friend. Therefore, the Second Conditional is required. The structure is 'If + past simple, ... would + infinitive'. For hypothetical situations, 'were' is traditionally used for all subjects (I, he, she, it) instead of 'was' to emphasize the unreality of the situation."
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank',
    prompt: "Your boss is discussing a potential, but very uncertain, new project. She says: 'If the client ___ (to approve) the budget next week, we ___ (to start) development immediately.'",
    answer: 'approves, will start',
    explanation: "The context 'next week' points to a future possibility, not a current hypothetical dream. This is a real potential event. We use the First Conditional for such situations: 'If + present simple, ... will + infinitive'. The correct forms are 'approves' and 'will start'."
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    prompt: "Someone asks you what you would do if you could have any superpower. You reply: 'That's easy. If I ___ invisible, I ___ all the world's secret meetings.'",
    options: [
      'become / will attend',
      'became / attended',
      'became / would attend',
      'become / would attend'
    ],
    answer: 'became / would attend',
    explanation: "Having a superpower is a purely imaginary and hypothetical situation. The Second Conditional is necessary. The structure is 'If + past simple, ... would + infinitive'. Therefore, 'became' (past simple of become) and 'would attend' are the correct choices."
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank',
    prompt: "You are talking to a lazy student about their upcoming final exam. You warn them: 'You ___ (to fail) the exam if you ___ (not to study) harder.'",
    answer: 'will fail, do not study',
    // Note the reversed clause order to test flexibility.
    explanation: "This is a real and very likely consequence of a present action (or inaction). It's a warning about a possible future. The First Conditional is appropriate. The main clause uses 'will + infinitive' ('will fail') and the 'if' clause uses the present simple ('do not study')."
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    prompt: "A political debate: 'The economy would be much stronger if the government ___ taxes significantly last year. But they didn't.'",
    options: [
      'lowers',
      'would lower',
      'had lowered',
      'lowered'
    ],
    answer: 'lowered',
    explanation: "This sentence describes a hypothetical present result ('The economy would be much stronger') based on a hypothetical action. The action of lowering taxes is being imagined, so we need the Second Conditional's 'if' clause structure, which is the past simple: 'lowered'. Note: 'had lowered' would be for the Third Conditional, discussing a hypothetical past result."
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank',
    prompt: "Thinking about your finances: 'If I ___ (to have) more money, I wouldn't be living with my parents.' (The speaker implies they do not have more money).",
    answer: 'had',
    explanation: "The second part of the sentence, 'I wouldn't be living...', clearly signals a hypothetical situation governed by the Second Conditional. The speaker is imagining a different reality. The 'if' clause requires the past simple form, which is 'had'."
  }
])

// --- Computed Properties for Validation ---
const validationResults = computed(() => {
  return questions.value.map(q => {
    const userAnswer = userAnswers.value[q.id]?.trim().toLowerCase() || ''
    const correctAnswer = q.answer.trim().toLowerCase()
    // For fill-in-the-blank, accept answers with or without a comma.
    const isCorrect = userAnswer === correctAnswer || userAnswer.replace(',', '') === correctAnswer.replace(',', '')

    return {
      id: q.id,
      prompt: q.prompt,
      userAnswer: userAnswers.value[q.id] || '— No Answer —',
      correctAnswer: q.answer,
      isCorrect: isCorrect,
      explanation: q.explanation
    }
  })
})

const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

// --- Control Functions ---
function submitAnswers() {
  showResult.value = true
  // Scroll to results for better UX on mobile
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  for (const key in userAnswers.value) {
    userAnswers.value[key] = ''
  }
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate Grammar Challenge"
    test-description="A series of units designed to master the core concepts of English grammar."
    unit-title="Unit 4: Conditional Sentences - Type 1 & 2"
    unit-description="Distinguishing between real possibilities ('If I do...') and hypothetical situations ('If I did...')."
    :categories="['Conditionals', 'Verb Tense', 'Hypothetical Language']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Rule 1: The First Conditional (Real Possibility)</CardTitle>
          <CardDescription>Use this to talk about the results of a possible future action.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-mono text-sm bg-muted p-3 rounded-md">
            If + <span class="text-blue-600 font-semibold">Present Simple</span>, ... <span class="text-red-600 font-semibold">will</span> + <span class="text-green-600 font-semibold">infinitive</span>
          </p>
          <div>
            <p class="font-semibold">Example A:</p>
            <p class="ml-4 italic">"If it <span class="text-blue-600">rains</span> tomorrow, we <span class="text-red-600">will</span> <span class="text-green-600">postpone</span> the trip."</p>
            <p class="text-xs text-muted-foreground ml-4">This is a real possibility. It might rain.</p>
          </div>
          <div>
            <p class="font-semibold">Example B (clause order reversed):</p>
            <p class="ml-4 italic">"You <span class="text-red-600">will</span> <span class="text-green-600">succeed</span> if you <span class="text-blue-600">work</span> hard."</p>
            <p class="text-xs text-muted-foreground ml-4">This is a promise or a prediction based on a real condition.</p>
          </div>
          <Alert variant="destructive">
            <AlertTitle>Common Mistake!</AlertTitle>
            <AlertDescription>Never use 'will' in the 'if' clause. <br><span class="line-through">If it will rain...</span> is incorrect.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 2: The Second Conditional (Hypothetical/Unreal)</CardTitle>
          <CardDescription>Use this for imaginary situations in the present or future.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-mono text-sm bg-muted p-3 rounded-md">
            If + <span class="text-blue-600 font-semibold">Past Simple</span>, ... <span class="text-red-600 font-semibold">would</span> + <span class="text-green-600 font-semibold">infinitive</span>
          </p>
          <div>
            <p class="font-semibold">Example A (Imaginary):</p>
            <p class="ml-4 italic">"If I <span class="text-blue-600">had</span> a million dollars, I <span class="text-red-600">would</span> <span class="text-green-600">buy</span> a castle."</p>
            <p class="text-xs text-muted-foreground ml-4">The reality is I don't have a million dollars.</p>
          </div>
          <div>
            <p class="font-semibold">Example B (Advice):</p>
            <p class="ml-4 italic">"If I <span class="text-blue-600">were</span> you, I <span class="text-red-600">would</span> <span class="text-green-600">apologize</span>."</p>
            <p class="text-xs text-muted-foreground ml-4">The reality is I am not you. Using 'were' instead of 'was' is common for all subjects in this structure.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Read the context carefully. Is it real or imaginary?</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-medium">
              <span class="text-sm font-bold text-primary mr-2">{{ index + 1 }}.</span>
              {{ q.prompt.split('___')[0] }}
              <template v-if="q.type.includes('fill-in-the-blank')">
                <Input
                  v-model="userAnswers[q.id]"
                  :placeholder="q.prompt.includes(',') ? 'verb 1, verb 2' : 'verb'"
                  class="inline-flex w-auto mx-1 h-8"
                  :disabled="showResult"
                />
              </template>
              {{ q.prompt.split('___')[1] }}
            </p>
            
            <RadioGroup
              v-if="q.type === 'multiple-choice'"
              v-model="userAnswers[q.id]"
              :disabled="showResult"
              class="space-y-2 ml-6"
            >
              <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                <Label :for="`${q.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>

          <Button v-if="!showResult" class="w-full" size="lg" @click="submitAnswers">
            Check My Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle class="text-2xl">Your Results</CardTitle>
              <CardDescription>You scored {{ score }} out of {{ totalQuestions }}. Review the explanations below.</CardDescription>
            </div>
            <Button variant="outline" @click="resetQuiz">Try Again</Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="result in validationResults" :key="result.id">
            <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
              <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" :class="result.isCorrect ? 'text-green-500' : 'text-red-500'" />
              <AlertTitle class="font-bold text-base">{{ result.isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
              <AlertDescription class="space-y-3 mt-2">
                <p class="text-sm text-foreground">
                  Your answer: 
                  <span :class="[result.isCorrect ? 'text-green-700' : 'text-red-700', 'font-semibold italic']">
                    {{ result.userAnswer }}
                  </span>
                </p>
                <p v-if="!result.isCorrect" class="text-sm text-foreground">
                  Correct answer: <span class="font-semibold italic text-green-700">{{ result.correctAnswer }}</span>
                </p>
                <div class="flex items-start gap-2 p-3 bg-background/50 rounded-md border">
                  <HelpCircle class="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p class="text-sm text-muted-foreground"><span class="font-semibold text-foreground">Explanation: </span>{{ result.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
