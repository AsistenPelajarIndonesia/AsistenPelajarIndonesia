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
    <!-- #material Slot: Explanations & Examples                                 -->
    <!-- Inspired by clear, contextual teaching methods.                         -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Two of Two</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p>
            <code>Both</code>, <code>either</code>, and <code>neither</code> are used to talk about <strong>two</strong> things or people. Understanding their specific functions is key to precise communication.
          </p>

          <h4 class="font-semibold">Both / Both of: The Inclusive Pair</h4>
          <p>Use <code>both</code> to refer to two things together (A and B).</p>
          <ul>
            <li><strong><code>Both + Noun (plural)</code></strong>: Used for general statements.
              <br><em>Example: "<strong>Both restaurants</strong> were excellent."</em>
            </li>
            <li><strong><code>Both of + the/these/my/etc. + Noun (plural)</code></strong>: Used for specific things. The 'of' is often optional after 'both'.
              <br><em>Example: "<strong>Both of the restaurants</strong> we visited were excellent." (or "<strong>Both the restaurants</strong>...")</em>
            </li>
            <li><strong><code>Both</code> as a Pronoun</strong>: Can stand alone or be followed by 'of'.
              <br><em>Example: "Did you like the films? I liked <strong>both</strong>." or "I liked <strong>both of them</strong>."</em>
            </li>
          </ul>

          <h4 class="font-semibold">Either / Either of: The Optional Choice</h4>
          <p>Use <code>either</code> to mean one or the other (A or B).</p>
          <ul>
            <li><strong><code>Either + Noun (singular)</code></strong>: Refers to one of two choices.
              <br><em>Example: "You can park on <strong>either side</strong> of the street." (one side or the other side)</em>
            </li>
            <li><strong><code>Either of + the/these/my/etc. + Noun (plural)</code></strong>:
              <br><em>Example: "I don't like <strong>either of those paintings</strong>." (I don't like the first one, and I don't like the second one).</em>
            </li>
            <li><strong>Verb Agreement</strong>: After 'either of', the verb is formally singular but often plural in informal speech.
              <br><em>Example: "I'm not sure if <strong>either of them is</strong> at home." (Formal) / "...<strong>are</strong> at home." (Informal)</em>
            </li>
          </ul>

          <h4 class="font-semibold">Neither / Neither of: The Negative Pair</h4>
          <p>Use <code>neither</code> to mean not one and not the other (not A and not B). It carries a negative meaning, so the verb is positive.</p>
          <ul>
            <li><strong><code>Neither + Noun (singular)</code></strong>:
              <br><em>Example: "<strong>Neither candidate</strong> was qualified." (Not the first one, and not the second one.)</em>
            </li>
            <li><strong><code>Neither of + the/these/my/etc. + Noun (plural)</code></strong>:
              <br><em>Example: "<strong>Neither of my parents</strong> speaks French."</em>
            </li>
             <li><strong>Verb Agreement</strong>: Like 'either of', the verb is formally singular.
              <br><em>Example: "<strong>Neither of the phones works</strong> properly." (Formal) / "...<strong>work</strong> properly." (Informal)</em>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card class="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900">
         <CardHeader>
           <CardTitle>Teacher's Corner: Common Pitfalls</CardTitle>
         </CardHeader>
         <CardContent class="prose prose-sm max-w-none dark:prose-invert">
            <p>Even advanced students make these mistakes. Pay close attention!</p>
            <ol>
              <li><strong>Double Negatives</strong>: Never use <code>not</code> with <code>neither</code>. The negativity is already built-in.
                <br><em>Incorrect: <del>"I didn't like neither of them."</del></em>
                <br><em>Correct: "I liked <strong>neither of them</strong>." OR "I didn't like <strong>either of them</strong>."</em>
              </li>
              <li><strong>Using 'of' Incorrectly</strong>: You only need 'of' before a determiner (the, my, these, etc.).
                <br><em>Incorrect: <del>"Both of windows are open."</del></em>
                <br><em>Correct: "<strong>Both windows</strong> are open." OR "<strong>Both of the windows</strong> are open."</em>
              </li>
               <li><strong>Subject-Verb Agreement</strong>: This is a classic trap. While informal speech allows plural verbs with 'neither of' / 'either of', formal and written English strongly prefers a singular verb.
                <br><em>Exam-safe: "Neither of my sisters <strong>is</strong> married."</em>
              </li>
            </ol>
         </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: The Interactive Quiz                                    -->
    <!-- Designed to be challenging and cover a range of contexts.               -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Choose the most appropriate word or phrase.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <label :for="`q${question.id}`" class="text-sm font-medium">
              {{ index + 1 }}. {{ question.text.split('___')[0] }}
              <span class="inline-block bg-slate-200 dark:bg-slate-700 rounded-md px-2 py-1 text-center min-w-[80px]">
                {{ question.userAnswer || '...' }}
              </span>
              {{ question.text.split('___')[1] }}
            </label>
            <RadioGroup
              :id="`q${question.id}`"
              v-model="question.userAnswer"
              class="flex flex-wrap gap-2"
            >
              <div v-for="option in question.options" :key="option">
                <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" class="sr-only" />
                <Label
                  :for="`q${question.id}-${option}`"
                  class="cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground border-primary': question.userAnswer === option
                  }"
                >
                  {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button @click="validateAnswers" :disabled="isSubmitDisabled">
            <Check class="h-4 w-4 mr-2" /> Check Answers
          </Button>
          <Button variant="ghost" @click="resetQuiz" v-if="showResult">
            <RefreshCw class="h-4 w-4 mr-2" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: The Validator & Explanations                              -->
    <!-- Provides immediate, detailed feedback for genuine learning.             -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
             <div class="flex items-baseline gap-2">
               <span class="text-4xl font-bold">{{ score }}</span>
               <span class="text-lg text-muted-foreground">/ {{ questions.length }}</span>
             </div>
             <Progress :model-value="scorePercentage" class="w-[60%]" />
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="question in questions"
            :key="`result-${question.id}`"
            class="rounded-lg border p-4"
            :class="{
              'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': question.isCorrect,
              'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800': !question.isCorrect,
            }"
          >
            <div class="flex items-start gap-3">
              <div class="mt-1">
                <CheckCircle2 v-if="question.isCorrect" class="h-5 w-5 text-green-600 dark:text-green-400" />
                <XCircle v-else class="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div class="flex-1">
                <p class="font-medium">
                  {{ question.text.replace('___', `[${question.userAnswer || 'No Answer'}]`) }}
                </p>
                <p v-if="!question.isCorrect" class="text-sm mt-1">
                  Correct answer: <strong class="font-semibold">{{ question.correctAnswer }}</strong>
                </p>
                <div class="mt-2 text-sm text-foreground/80 p-3 bg-background/50 rounded-md">
                  <p><strong class="font-semibold">Explanation:</strong> {{ question.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components exist in your project, likely from shadcn-vue
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Check, CheckCircle2, RefreshCw, XCircle } from 'lucide-vue-next'

const router = useRouter()

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the structure of Raymond Murphy\'s book.',
  unitTitle: 'Unit 22: Both / both of; Neither / neither of; Either / either of',
  unitDescription: 'Mastering the language of pairs. This unit focuses on making choices and descriptions involving two items.',
  categories: ['Determiners', 'Pronouns', 'Quantifiers', 'Subject-Verb Agreement']
}

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/21")
}
function goToNextUnit() {
  router.push("/units/grammar/23")
}

// --- Quiz State & Logic ---
const showResult = ref(false)

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  userAnswer: string;
  isCorrect: boolean | null;
}

const questions = reactive<Question[]>([
  {
    id: 1,
    text: "A: Which jacket do you prefer, the blue one or the black one? B: Actually, I don't like ___ of them.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'either',
    userAnswer: '',
    isCorrect: null,
    explanation: "With a negative verb ('don't like'), we use 'either' to mean 'not one and not the other'. Using 'neither' would create a double negative ('don't like neither'), which is incorrect."
  },
  {
    id: 2,
    text: "He had two job offers, but ___ was suitable, so he remained unemployed.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'neither',
    userAnswer: '',
    isCorrect: null,
    explanation: "The context ('remained unemployed') is negative. 'Neither' correctly conveys that not the first job and not the second job was suitable. It requires a positive verb ('was')."
  },
  {
    id: 3,
    text: "There are two main roads into the city. You can take ___ road; they lead to the same place.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'either',
    userAnswer: '',
    isCorrect: null,
    explanation: "'Either' is used to mean 'it doesn't matter which one of the two'. 'Both' would imply taking the two roads simultaneously, which is impossible."
  },
  {
    id: 4,
    text: "___ my parents are doctors, but ___ of them can agree on a diagnosis for my cold.",
    options: ['Both / neither', 'Both of / either', 'Both / either', 'Either / neither'],
    correctAnswer: 'Both / neither',
    userAnswer: '',
    isCorrect: null,
    explanation: "The first part needs 'Both' to mean 'My father and my mother'. The second part ('can agree' is a positive verb) needs 'neither' to convey the negative meaning that 'not one and not the other' can agree."
  },
  {
    id: 5,
    text: "The exam had two sections, and I'm afraid I failed ___ of them.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'both',
    userAnswer: '',
    isCorrect: null,
    explanation: "'To fail both' means you failed section A and section B. 'To fail either' would be unusual phrasing. 'To fail neither' would mean you passed both, which contradicts 'I'm afraid'."
  },
  {
    id: 6,
    text: "___ the players in the final match looked exhausted by the end.",
    options: ['Both of', 'Both', 'Either of'],
    correctAnswer: 'Both',
    userAnswer: '',
    isCorrect: null,
    explanation: "While 'Both of' is also correct here, 'Both' is the most common and concise form when a determiner ('the') follows. In many style guides, 'Both' is preferred over 'Both of' in this specific construction."
  },
  {
    id: 7,
    text: "I tried calling her on her home phone and her mobile, but ___ number was working.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'neither',
    userAnswer: '',
    isCorrect: null,
    explanation: "'Neither' is used with a singular noun ('number') and a positive verb ('was') to convey a negative meaning for two items. 'Neither number was working' means 'The home number was not working and the mobile number was not working'."
  },
  {
    id: 8,
    text: "To be honest, ___ of the proposed solutions seems very practical. We need to think again.",
    options: ['both', 'either', 'neither'],
    correctAnswer: 'neither',
    userAnswer: '',
    isCorrect: null,
    explanation: "This tests formal subject-verb agreement. 'Neither of + plural noun' takes a singular verb ('seems'). The meaning is negative ('not one and not the other seems practical'), fitting the context."
  }
])

const isSubmitDisabled = computed(() => {
  return questions.some(q => !q.userAnswer) || showResult.value;
});

const score = computed(() => {
  return questions.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.length === 0) return 0
  return (score.value / questions.length) * 100
})

function validateAnswers() {
  questions.forEach(q => {
    q.isCorrect = q.userAnswer === q.correctAnswer
  })
  showResult.value = true
  // Scroll to results on mobile
  // In a real app, you might use nextTick and find the element to scroll to.
}

function resetQuiz() {
  questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
  showResult.value = false
}
</script>

<style>
/* Add a simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
