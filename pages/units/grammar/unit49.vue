<!--
  File: @/pages/units/grammar/0.vue
  Unit: 0 - Questions 2 (do you know where …? / he asked me where …)
  Description: An advanced practice module on forming indirect and reported questions.
  This page provides a detailed learning section, a challenging interactive exercise,
  and a robust validation system with explanatory feedback to ensure genuine improvement.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

// --- NAVIGATION ---
function goToPreviousUnit() {
  // As this is unit 0, "back" could lead to an index or be disabled.
  // For this example, we'll navigate to a hypothetical grammar index.
  router.push('/units/grammar')
}

function goToNextUnit() {
  // Navigate to the next unit in the sequence.
  router.push('/units/grammar/1')
}

// --- COMPONENT STATE ---
const showResult = ref(false)

interface Question {
  id: number
  prompt: string
  stem: string
  userAnswer: string
  correctAnswers: string[]
  explanation: string
  isCorrect: boolean | null
  type: 'interrogative' | 'reported'
}

const questions = ref<Question[]>([
  {
    id: 1,
    prompt: 'Direct Question: "Where has Tom gone?"',
    stem: 'Do you know',
    userAnswer: '',
    correctAnswers: ['where tom has gone'],
    explanation: "In an indirect question, the word order changes from question form (verb before subject: 'has Tom') to statement form (subject before verb: 'Tom has'). The auxiliary verb 'has' is retained.",
    isCorrect: null,
    type: 'interrogative',
  },
  {
    id: 2,
    prompt: 'Direct Question: "What time do the shops close?"',
    stem: 'Could you tell me',
    userAnswer: '',
    correctAnswers: ['what time the shops close'],
    explanation: "When the direct question uses 'do', 'does', or 'did', we remove it in the indirect question. The tense from 'do' is absorbed into the main verb, but since 'close' is already in its base form, no change is needed.",
    isCorrect: null,
    type: 'interrogative',
  },
  {
    id: 3,
    prompt: 'Direct Question: "Did she pass the exam?"',
    stem: 'I was wondering',
    userAnswer: '',
    correctAnswers: ['if she passed the exam', 'whether she passed the exam'],
    explanation: "For Yes/No questions, we introduce 'if' or 'whether'. The auxiliary 'did' is removed, and its past tense is transferred to the main verb, changing 'pass' to 'passed'.",
    isCorrect: null,
    type: 'interrogative',
  },
  {
    id: 4,
    prompt: 'He asked me: "How are you?"',
    stem: 'He asked me',
    userAnswer: '',
    correctAnswers: ['how i was'],
    explanation: "This is a reported question. The tense 'backshifts': 'are' (present) becomes 'was' (past). The pronoun also changes from 'you' to 'I' to fit the new context.",
    isCorrect: null,
    type: 'reported',
  },
  {
    id: 5,
    prompt: 'The police officer said to us: "Where do you live?"',
    stem: 'The police officer asked us',
    userAnswer: '',
    correctAnswers: ['where we lived'],
    explanation: "In this reported question, 'do' is removed, and its tense moves to the main verb, changing 'live' to 'lived' (tense backshift). The pronoun 'you' changes to 'we'.",
    isCorrect: null,
    type: 'reported',
  },
  {
    id: 6,
    prompt: 'Clare asked me: "What time did you get home last night?"',
    stem: 'Clare asked me what time',
    userAnswer: '',
    correctAnswers: ['i had got home the night before', 'i had gotten home the night before'],
    explanation: "A challenging one! The direct question is in the Past Simple ('did get'). In reported speech, Past Simple often backshifts to Past Perfect ('had got' / 'had gotten'). Also, 'last night' changes to 'the night before'.",
    isCorrect: null,
    type: 'reported',
  },
  {
    id: 7,
    prompt: 'Direct Question: "Is there a problem with the computer?"',
    stem: 'I want to know',
    userAnswer: '',
    correctAnswers: ['if there is a problem with the computer', 'whether there is a problem with the computer'],
    explanation: "A Yes/No question using 'if' or 'whether'. Note the word order: 'is there' (question) becomes 'there is' (statement). Since the introductory phrase 'I want to know' is in the present, there is no tense backshift.",
    isCorrect: null,
    type: 'interrogative',
  },
  {
    id: 8,
    prompt: 'My friend asked: "Why didn\'t you tell me about the meeting?"',
    stem: 'My friend asked me why',
    userAnswer: '',
    correctAnswers: ["i hadn't told him about the meeting", "i had not told him about the meeting"],
    explanation: "Past Simple Negative ('didn\'t tell') backshifts to Past Perfect Negative ('hadn\'t told'). The pronoun context also requires changing 'you' to 'I' and 'me' to 'him' (assuming the friend is male).",
    isCorrect: null,
    type: 'reported',
  },
])

// --- COMPUTED PROPERTIES for results ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(q => q.isCorrect).length)
const scorePercentage = computed(() => (totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0))

function getMotivationalMessage(percentage: number): string {
  if (percentage === 100) return "Flawless! A truly masterful performance. You have a deep understanding of this structure."
  if (percentage >= 80) return "Excellent work! You have a strong command of indirect questions. Review the few tricky points below."
  if (percentage >= 60) return "Good effort! You're on the right track. Focus on the explanations for the questions you missed."
  if (percentage >= 40) return "A solid attempt. This is a complex topic. Repetition and careful study of the rules will lead to improvement."
  return "Don't be discouraged! This is one of the more difficult areas of English grammar. Review the material and try again."
}

// --- VALIDATION & CONTROL ---
function normalizeAnswer(answer: string): string {
  if (!answer) return ''
  // Lowercase, trim whitespace, and remove the final punctuation if it exists.
  return answer.toLowerCase().trim().replace(/[.?]$/, '')
}

function checkAnswers() {
  questions.value.forEach((q) => {
    const normalizedUserAnswer = normalizeAnswer(q.userAnswer)
    q.isCorrect = q.correctAnswers.some(correct => normalizeAnswer(correct) === normalizedUserAnswer)
  })
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  showResult.value = false
  questions.value.forEach((q) => {
    q.userAnswer = ''
    q.isCorrect = null
  })
  // Scroll back to the top of the practice section
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar"
    test-description="Based on 'English Grammar In Use' by Raymond Murphy"
    unit-title="Unit 0: Questions 2"
    unit-description="Forming indirect questions (Do you know where...?) and reported questions (He asked me where...)."
    :categories="['Questions', 'Reported Speech', 'Syntax', 'Word Order']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: LEARNING MATERIAL                                                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principle: Statement Word Order</CardTitle>
          <CardDescription>
            The most important rule for indirect questions is that the word order is like a statement (Subject + Verb), not a question (Verb + Subject).
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p class="font-semibold">Direct Question:</p>
            <p class="pl-4">Where <span class="text-red-500 font-bold">is</span> <span class="text-blue-500 font-bold">the post office</span>?</p>
            <p class="pl-4 text-xs">(Verb <span class="text-red-500">is</span> before Subject <span class="text-blue-500">the post office</span>)</p>
          </div>
          <div>
            <p class="font-semibold">Indirect Question:</p>
            <p class="pl-4">Could you tell me where <span class="text-blue-500 font-bold">the post office</span> <span class="text-red-500 font-bold">is</span>?</p>
            <p class="pl-4 text-xs">(Subject <span class="text-blue-500">the post office</span> is before Verb <span class="text-red-500">is</span>)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Handling `do`, `does`, and `did`</CardTitle>
          <CardDescription>These auxiliary verbs are removed. The tense they carry is transferred to the main verb.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p>Direct: What time <span class="text-red-500 font-bold">does</span> the train <span class="text-blue-500 font-bold">leave</span>?</p>
            <p>Indirect: Do you know what time the train <span class="text-blue-500 font-bold">leaves</span>?</p>
            <p class="text-xs text-muted-foreground pl-4">('does' is removed, and its '-s' ending moves to 'leave')</p>
          </div>
          <div>
            <p>Direct: Why <span class="text-red-500 font-bold">did</span> you <span class="text-blue-500 font-bold">say</span> that?</p>
            <p>Indirect: I'd like to know why you <span class="text-blue-500 font-bold">said</span> that.</p>
            <p class="text-xs text-muted-foreground pl-4">('did' is removed, and its past tense moves to 'say')</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yes/No Questions & Reported Speech</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p class="font-semibold">Using `if` or `whether`</p>
            <p>Direct: <span class="text-red-500 font-bold">Is</span> anybody here?</p>
            <p>Indirect: I wonder <span class="text-blue-500 font-bold">if / whether</span> anybody <span class="text-red-500 font-bold">is</span> here.</p>
          </div>
          <div>
            <p class="font-semibold">Tense Backshift in Reported Questions</p>
            <p class="text-muted-foreground">When reporting a question asked in the past (e.g., He asked...), the tense usually moves one step back into the past.</p>
            <p>Direct: "What <span class="text-red-500">are</span> you doing?" (Present Continuous)</p>
            <p>Reported: He asked me what I <span class="text-red-500 font-bold">was</span> doing. (Past Continuous)</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE QUESTIONS                                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the second sentence so that it has a similar meaning to the first. Type only the missing words.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
            <p class="text-sm font-medium">
              <span class="font-bold text-primary mr-2">{{ index + 1 }}.</span>
              {{ q.prompt }}
            </p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground whitespace-nowrap">{{ q.stem }}</span>
              <Input
                v-model="q.userAnswer"
                :placeholder="q.type === 'interrogative' ? '...?' : '... .'"
                class="flex-grow"
                @keyup.enter="checkAnswers"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full md:w-auto" @click="checkAnswers">
            Check My Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULTS & FEEDBACK                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>{{ getMotivationalMessage(scorePercentage) }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-2xl font-bold">{{ score }} / {{ totalQuestions }}</span>
              <Progress :model-value="scorePercentage" class="w-full" />
              <span class="text-2xl font-bold">{{ scorePercentage.toFixed(0) }}%</span>
            </div>
            <div class="text-center">
              <Button variant="outline" @click="resetTest">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>

        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-semibold tracking-tight">
            Detailed Feedback
          </h3>
          <div v-for="q in questions" :key="`result-${q.id}`">
            <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
              <component :is="q.isCorrect ? CheckCircle2 : (q.isCorrect === false ? XCircle : HelpCircle)" class="h-5 w-5" />
              <AlertTitle class="font-bold">
                Question {{ q.id }}: {{ q.isCorrect ? 'Correct!' : 'Needs Review' }}
              </AlertTitle>
              <AlertDescription class="mt-2 space-y-3 text-sm">
                <div>
                  <p><span class="font-semibold">Your Answer:</span> {{ q.stem }} <span class="italic" :class="{'text-green-700 dark:text-green-400': q.isCorrect, 'text-red-700 dark:text-red-400': !q.isCorrect}">{{ q.userAnswer || '[No answer]' }}</span></p>
                </div>
                <div v-if="!q.isCorrect">
                  <p><span class="font-semibold">Correct Answer(s):</span> {{ q.stem }} <span class="font-medium text-green-800 dark:text-green-300">{{ q.correctAnswers[0] }}{{ q.type === 'interrogative' ? '?' : '.' }}</span></p>
                  <p v-if="q.correctAnswers.length > 1" class="text-xs text-muted-foreground">(Alternative: ...{{ q.correctAnswers[1] }}...)</p>
                </div>
                <div class="mt-2 rounded-md bg-muted/50 p-3">
                  <p class="font-semibold text-foreground">💡 Explanation:</p>
                  <p class="text-muted-foreground">{{ q.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </template>
  </GrammarLayout>
</template>
