<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: #material - Learning Content                                      -->
    <!-- Inspired by clear, structured teaching methods.                         -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Golden Rule: Preposition + Gerund (-ing)</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-muted-foreground">
          <p>
            In English grammar, a core principle governs the interaction between prepositions and verbs. When a verb immediately follows a preposition (such as <code class="font-mono text-sm">in, on, at, for, about, after, before, by, without</code>), the verb must take its <strong class="text-foreground">-ing</strong> form, also known as a gerund.
          </p>
          <div class="rounded-md border border-l-4 border-green-500 bg-green-50/50 p-3 dark:bg-green-900/10">
            <p><strong class="text-green-600 dark:text-green-400">Correct:</strong> I apologized <strong class="text-foreground">for being</strong> late.</p>
            <p><strong class="text-green-600 dark:text-green-400">Correct:</strong> He is good <strong class="text-foreground">at solving</strong> puzzles.</p>
          </div>
          <div class="rounded-md border border-l-4 border-red-500 bg-red-50/50 p-3 dark:bg-red-900/10">
            <p><strong class="text-red-600 dark:text-red-400">Incorrect:</strong> I apologized <span class="line-through">for to be</span> late.</p>
            <p><strong class="text-red-600 dark:text-red-400">Incorrect:</strong> He is good <span class="line-through">at solve</span> puzzles.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Structures & Expressions</CardTitle>
          <CardDescription>Familiarize yourself with these common patterns to build fluency.</CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <ul class="space-y-2">
            <li><strong class="text-foreground">apologize for...</strong> She apologized for making a noise.</li>
            <li><strong class="text-foreground">succeed in...</strong> They succeeded in finding the lost keys.</li>
            <li><strong class="text-foreground">insist on...</strong> He insisted on paying for the meal.</li>
            <li><strong class="text-foreground">think of/about...</strong> I'm thinking about moving to a new city.</li>
            <li><strong class="text-foreground">dream of...</strong> She dreams of becoming an astronaut.</li>
            <li><strong class="text-foreground">approve of...</strong> My parents don't approve of me staying out late.</li>
          </ul>
          <ul class="space-y-2">
            <li><strong class="text-foreground">decide against...</strong> We decided against buying the car.</li>
            <li><strong class="text-foreground">feel like...</strong> I don't feel like cooking tonight.</li>
            <li><strong class="text-foreground">accuse someone of...</strong> He was accused of stealing the documents.</li>
            <li><strong class="text-foreground">congratulate someone on...</strong> I congratulated her on passing her exam.</li>
            <li><strong class="text-foreground">stop someone from...</strong> The rain stopped us from playing tennis.</li>
            <li><strong class="text-foreground">thank someone for...</strong> Thank you for helping me.</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="border-amber-500 dark:border-amber-400">
        <CardHeader>
          <CardTitle>The "to" Conundrum: Preposition vs. Infinitive</CardTitle>
          <CardDescription>This is a frequent point of confusion for many learners.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-muted-foreground">
          <p>
            The word <code class="font-mono text-sm">to</code> can be a preposition OR part of an infinitive verb (e.g., <code class="font-mono text-sm">to go, to see, to learn</code>). You must identify its role in the sentence.
          </p>
          <div>
            <h4 class="font-semibold text-foreground">When 'to' is part of an infinitive:</h4>
            <p>It usually follows verbs expressing intention, desire, or plan.</p>
            <p class="mt-1 rounded-md bg-muted p-2"><strong class="text-foreground">Example:</strong> We decided <strong class="text-foreground">to travel</strong>. ('decide' is followed by an infinitive)</p>
            <p class="mt-1 rounded-md bg-muted p-2"><strong class="text-foreground">Example:</strong> I want <strong class="text-foreground">to help</strong>. ('want' is followed by an infinitive)</p>
          </div>
          <div>
            <h4 class="font-semibold text-foreground">When 'to' is a preposition:</h4>
            <p>It is part of a phrasal verb or expression. In these cases, it must be followed by <strong class="text-foreground">-ing</strong>.</p>
            <p class="mt-1 rounded-md bg-muted p-2"><strong class="text-foreground">Example:</strong> I look forward <strong class="text-foreground">to hearing</strong> from you. ('look forward to' is a phrasal verb)</p>
            <p class="mt-1 rounded-md bg-muted p-2"><strong class="text-foreground">Example:</strong> She is committed <strong class="text-foreground">to improving</strong> her skills. ('committed to' is an expression)</p>
            <p class="mt-1 rounded-md bg-muted p-2"><strong class="text-foreground">Example:</strong> What's the secret <strong class="text-foreground">to being</strong> so successful? ('secret to' is an expression)</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: #practice - Interactive Questions                                 -->
    <!-- Questions designed to be challenging and cover various nuances.         -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 5 Practice Exercise</CardTitle>
          <CardDescription>
            Complete the sentences. Use a preposition (in, for, about, etc.) + the correct form of the verb in brackets.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
            <label :for="`q${q.id}`" class="text-sm font-medium">
              {{ index + 1 }}. {{ q.sentenceStart }}
              <span class="inline-block h-6 w-48 rounded-md border border-dashed align-middle">
                <input
                  :id="`q${q.id}`"
                  v-model="q.userAnswer"
                  type="text"
                  :placeholder="q.placeholder"
                  class="h-full w-full bg-transparent px-2 text-sm outline-none"
                  :disabled="showResult"
                >
              </span>
              {{ q.sentenceEnd }}
            </label>
            <!-- Inline feedback shown after checking answers -->
            <Transition name="fade">
              <div v-if="showResult" class="text-xs">
                <p v-if="q.isCorrect" class="text-green-600 dark:text-green-400">
                  <CheckCircle2 class="mr-1 inline h-3 w-3" />
                  Correct!
                </p>
                <p v-else class="text-red-600 dark:text-red-400">
                  <XCircle class="mr-1 inline h-3 w-3" />
                  Incorrect. The correct answer is: <strong class="text-foreground">{{ q.correctAnswer }}</strong>
                </p>
              </div>
            </Transition>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p v-if="showResult" class="text-sm text-muted-foreground">The test is complete. Review your results below.</p>
          <p v-else class="text-sm text-muted-foreground">Enter your answers and click "Check Answers".</p>
          <div class="flex gap-2">
            <Button v-if="showResult" variant="outline" @click="resetTest">
              <RotateCcw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button :disabled="showResult" @click="checkAnswers">
              <FileCheck class="mr-2 h-4 w-4" />
              Check Answers
            </Button>
          </div>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: #result - Detailed Score and Explanations                         -->
    <!-- Provides in-depth feedback, a hallmark of great teaching.               -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results & Detailed Explanations</CardTitle>
          <CardDescription>
            You scored <strong class="text-primary">{{ score }} out of {{ totalQuestions }} ({{ scorePercentage.toFixed(0) }}%)</strong>.
            Review the explanations to master this topic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="q in questions" :key="q.id" class="rounded-md border p-4">
              <p class="text-sm text-muted-foreground">{{ q.sentenceStart }} <span :class="q.isCorrect ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'" class="rounded px-1 py-0.5 font-mono line-through">{{ q.userAnswer.trim() === '' ? '...' : q.userAnswer }}</span> <strong :class="q.isCorrect ? 'hidden' : 'inline-block'" class="rounded bg-green-100 px-1 py-0.5 font-mono text-green-700 dark:bg-green-900/40 dark:text-green-300">{{ q.correctAnswer }}</strong> {{ q.sentenceEnd }}</p>
              <Separator class="my-3" />
              <p class="text-sm">
                <strong class="font-semibold text-primary">Explanation:</strong>
                <span class="text-muted-foreground"> {{ q.explanation }}</span>
              </p>
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
import { CheckCircle2, XCircle, FileCheck, RotateCcw } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// --- Component State ---
const showResult = ref(false)

const pageDetails = {
  testTitle: "English Grammar In Use Practice",
  testDescription: "Advanced exercises based on the book by Raymond Murphy.",
  unitTitle: "Unit 5: Preposition (in/for/about etc.) + -ing",
  unitDescription: "This unit focuses on the critical rule of using the -ing form of a verb (a gerund) after a preposition. Mastering this is essential for natural-sounding English.",
  categories: ["Grammar", "Verbs", "Prepositions", "Gerunds", "Intermediate"]
}

interface Question {
  id: number;
  sentenceStart: string;
  sentenceEnd: string;
  placeholder: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean | null;
  explanation: string;
}

const getInitialQuestions = (): Question[] => [
  {
    id: 1,
    sentenceStart: "Are you interested",
    sentenceEnd: "to the cinema tonight? (in/go)",
    placeholder: "in going",
    correctAnswer: "in going",
    userAnswer: "",
    isCorrect: null,
    explanation: "The preposition 'in' must be followed by the -ing form of the verb 'go'. The structure is 'interested in doing something'."
  },
  {
    id: 2,
    sentenceStart: "I'm not very good",
    sentenceEnd: "history. (at/remember)",
    placeholder: "at remembering",
    correctAnswer: "at remembering",
    userAnswer: "",
    isCorrect: null,
    explanation: "The expression 'good at' is a fixed collocation that requires a gerund (-ing form). We are good at an activity."
  },
  {
    id: 3,
    sentenceStart: "We have decided",
    sentenceEnd: "a new car. (against/buy)",
    placeholder: "against buying",
    correctAnswer: "against buying",
    userAnswer: "",
    isCorrect: null,
    explanation: "The preposition 'against' follows the verb 'decide' to show a negative choice, and it must be followed by the -ing form."
  },
  {
    id: 4,
    sentenceStart: "You can't live",
    sentenceEnd: "mistakes. (without/make)",
    placeholder: "without making",
    correctAnswer: "without making",
    userAnswer: "",
    isCorrect: null,
    explanation: "'Without' is a preposition indicating absence. The action that is absent ('make') must be in its -ing form."
  },
  {
    id: 5,
    sentenceStart: "He was fined",
    sentenceEnd: "the speed limit. (for/exceed)",
    placeholder: "for exceeding",
    correctAnswer: "for exceeding",
    userAnswer: "",
    isCorrect: null,
    explanation: "The preposition 'for' is used here to give the reason for the fine. The reason is an action, so it takes the -ing form."
  },
  {
    id: 6,
    sentenceStart: "I'm looking forward",
    sentenceEnd: "you again soon. (to/see)",
    placeholder: "to seeing",
    correctAnswer: "to seeing",
    userAnswer: "",
    isCorrect: null,
    explanation: "This is a key test case. 'Look forward to' is a phrasal verb where 'to' is a preposition, not part of an infinitive. Therefore, it requires the -ing form."
  },
  {
    id: 7,
    sentenceStart: "What are the advantages",
    sentenceEnd: "a car? (of/have)",
    placeholder: "of having",
    correctAnswer: "of having",
    userAnswer: "",
    isCorrect: null,
    explanation: "The preposition 'of' is used to connect 'advantages' with the related action ('have'), which must be in its gerund form."
  },
    {
    id: 8,
    sentenceStart: "She's fed up",
    sentenceEnd: "the same food every day. (with/eat)",
    placeholder: "with eating",
    correctAnswer: "with eating",
    userAnswer: "",
    isCorrect: null,
    explanation: "The expression 'fed up with' is a common phrasal adjective that describes being tired of an activity. The activity ('eat') must be in the -ing form."
  },
];

const questions = ref<Question[]>(getInitialQuestions())

// --- Computed Properties for Scoring ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(q => q.isCorrect).length)
const scorePercentage = computed(() => (totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0))


// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/4")
}
function goToNextUnit() {
  router.push("/units/grammar/6")
}

// --- Core Logic ---
function checkAnswers() {
  questions.value.forEach(q => {
    // Normalize answers for robust comparison: trim whitespace and convert to lower case.
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase()
    const correctAnswerCleaned = q.correctAnswer.trim().toLowerCase()
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned
  })
  showResult.value = true
  // Scroll to the top of the results section for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  questions.value = getInitialQuestions()
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
/* Smooth transition for result and feedback visibility */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
