<!--
  File: @/pages/units/grammar/37.vue
  Description: An advanced grammar practice module for Unit 37: Phrasal Verbs (away/back), 
  inspired by Raymond Murphy's "English Grammar In Use".
  This page is designed to provide a deep, challenging, and educational experience.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI & Component Imports ---
// Assuming a 'shadcn-vue' like component library is installed.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default layout.
})

// --- State Management ---
const showResult = ref(false)
const isSubmitting = ref(false)

// The core of the learning experience: a reactive array of challenging questions.
const questions = reactive([
  {
    id: 1,
    text: "The old photographs brought ______ so many happy memories of my childhood in the countryside.",
    userAnswer: '',
    correctAnswer: 'back',
    isCorrect: false,
    explanation: "The phrasal verb 'bring back' means to cause something (like memories) to be remembered. 'Away' would not fit the context of recalling past events.",
    type: 'fill-in-the-blank',
  },
  {
    id: 2,
    text: "After the argument, he turned and stormed ______ without another word.",
    userAnswer: '',
    correctAnswer: 'away',
    isCorrect: false,
    explanation: "'Storm away' signifies leaving a place angrily and abruptly. 'Storm back' would mean returning angrily, which contradicts 'without another word'.",
    type: 'fill-in-the-blank',
  },
  {
    id: 3,
    text: "Could you please ______ me ______ that book I lent you last month? I need it for a report.",
    userAnswer: '',
    correctAnswer: 'give back',
    isCorrect: false,
    explanation: "'Give something back' means to return an item to its owner. This is a separable phrasal verb, so 'give the book back' is also correct. The core meaning is 'return'.",
    type: 'fill-in-the-blank-multi',
  },
  {
    id: 4,
    text: "The sudden noise frightened the birds, and they all flew ______.",
    userAnswer: '',
    correctAnswer: 'away',
    isCorrect: false,
    explanation: "'Fly away' indicates movement from the current location to a distant one, typically out of sight. 'Fly back' would mean they returned, which is unlikely if frightened.",
    type: 'fill-in-the-blank',
  },
  {
    id: 5,
    text: "I promise I'll pay you ______ as soon as I get my salary at the end of the week.",
    userAnswer: '',
    correctAnswer: 'back',
    isCorrect: false,
    explanation: "'Pay someone back' is a specific phrasal verb meaning to repay a debt or return money that you borrowed. 'Pay away' is not a standard phrasal verb in this context.",
    type: 'fill-in-the-blank',
  },
  {
    id: 6,
    text: "Please put ______ your toys now, the living room is a complete mess.",
    userAnswer: '',
    correctAnswer: 'away',
    isCorrect: false,
    explanation: "'Put something away' means to store something in its proper place after using it. This phrasal verb is crucial for indicating tidiness and order.",
    type: 'fill-in-the-blank',
  },
  {
    id: 7,
    text: "She kept looking ______ at her watch during the meeting, clearly anxious to leave.",
    userAnswer: '',
    correctAnswer: 'back',
    isCorrect: false,
    explanation: "'Look back' in this context means to turn your head to see something behind you. It can also mean to think about the past, but here the physical action is implied by 'at her watch'. 'Look away' would mean she's avoiding eye contact, which doesn't fit as well.",
    type: 'fill-in-the-blank',
  },
  {
    id: 8,
    text: "The thieves managed to get ______ with over a million dollars in jewelry before the police arrived.",
    userAnswer: '',
    correctAnswer: 'away',
    isCorrect: false,
    explanation: "'Get away' means to escape. The longer form, 'get away with something', specifically means to escape punishment for a crime or misdeed.",
    type: 'fill-in-the-blank',
  },
  {
    id: 9,
    text: "He's on another call at the moment, but I'll ask him to call you ______ as soon as he's free.",
    userAnswer: '',
    correctAnswer: 'back',
    isCorrect: false,
    explanation: "'Call someone back' means to return a phone call. This is a very common and essential phrasal verb in business and daily communication.",
    type: 'fill-in-the-blank',
  },
  {
    id: 10,
    text: "The company had to throw ______ thousands of products due to a manufacturing defect.",
    userAnswer: '',
    correctAnswer: 'away',
    isCorrect: false,
    explanation: "'Throw something away' means to discard it as waste or rubbish. It signifies permanent disposal. 'Throw back' would mean to return something by throwing it, which is not the meaning here.",
    type: 'fill-in-the-blank',
  },
])

// --- Computed Properties for Dynamic Data ---
const totalQuestions = computed(() => questions.length)
const score = computed(() => questions.filter(q => q.isCorrect).length)
const scorePercentage = computed(() => totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0)

// --- Navigation & Page Logic ---
const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/36")
}

function goToNextUnit() {
  router.push("/units/grammar/38")
}

function validateAnswers() {
  isSubmitting.value = true
  questions.forEach(q => {
    // Normalize answers for robust comparison (case-insensitive, trim whitespace)
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase()
    const correctAnswerCleaned = q.correctAnswer.trim().toLowerCase()
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned
  })
  showResult.value = true
  isSubmitting.value = false
  // Scroll to results for better UX on mobile
  setTimeout(() => {
    const resultElement = document.getElementById('results-section');
    if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

function resetTest() {
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = false
  })
   // Scroll to top for better UX
   window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="Interactive exercises based on the legendary grammar book by Raymond Murphy."
    unit-title="Unit 37: Phrasal Verbs 9 (away/back)"
    unit-description="Mastering the concepts of distance, departure, return, and reversal with 'away' and 'back'."
    :categories="['Phrasal Verbs', 'Intermediate', 'Vocabulary']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL - The Core Concepts and Explanations                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts: `away` and `back`</CardTitle>
          <CardDescription>
            Understanding the fundamental direction and meaning these particles add to a verb.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h3 class="font-semibold text-base mb-2">The Particle `away`</h3>
            <p class="text-muted-foreground mb-2">
              `Away` generally signifies movement from a person or place, or disappearance. It adds a sense of distance or removal.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Movement/Distance:</strong> <span class="font-mono">go away, run away, drive away, walk away</span></li>
              <li><strong>Disappearance/Hiding:</strong> <span class="font-mono">look away, turn away</span></li>
              <li><strong>Storing/Disposing:</strong> <span class="font-mono">put something away, throw something away</span></li>
              <li><strong>Escaping:</strong> <span class="font-mono">get away</span></li>
            </ul>
            <p class="mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md border border-amber-300 dark:border-amber-700">
              <strong>Example:</strong> "She put her books <span class="font-bold">away</span> and turned off the light." (The books are stored, removed from sight).
            </p>
          </div>
          <hr/>
          <div>
            <h3 class="font-semibold text-base mb-2">The Particle `back`</h3>
            <p class="text-muted-foreground mb-2">
              `Back` signifies a return to a previous place or person. It can also mean doing something in return or reversing an action.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Returning to a place:</strong> <span class="font-mono">go back, come back, get back, drive back</span></li>
              <li><strong>Returning an item:</strong> <span class="font-mono">give something back, take something back, send something back</span></li>
              <li><strong>Doing something in return:</strong> <span class="font-mono">call someone back, write back, pay someone back</span></li>
              <li><strong>Looking behind/to the past:</strong> <span class="font-mono">look back</span></li>
            </ul>
             <p class="mt-2 p-2 bg-sky-100 dark:bg-sky-900/30 rounded-md border border-sky-300 dark:border-sky-700">
              <strong>Example:</strong> "If you don't like the jacket, you can take it <span class="font-bold">back</span> to the shop." (The jacket is returned to its origin).
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE - The Interactive Exercise Section                     -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Type only the missing word(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-6">
            <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
              <label :for="`q-${question.id}`" class="text-sm font-medium">
                {{ index + 1 }}. {{ question.text.split('______')[0] }}
                <Input
                  :id="`q-${question.id}`"
                  v-model="question.userAnswer"
                  type="text"
                  :placeholder="question.type === 'fill-in-the-blank-multi' ? 'verb particle' : 'particle'"
                  class="inline-block w-auto mx-1 h-8"
                  :disabled="showResult"
                  autocomplete="off"
                />
                {{ question.text.split('______')[1] }}
              </label>
            </div>
            <div class="flex gap-4">
              <Button type="submit" :disabled="showResult" class="w-full sm:w-auto">
                {{ isSubmitting ? 'Checking...' : 'Check Answers' }}
              </Button>
               <Button v-if="showResult" type="button" variant="outline" @click="resetTest" class="w-full sm:w-auto">
                Try Again
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT - The Detailed Feedback and Score                        -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
              Review your answers below. Great teachers believe that understanding mistakes is the key to mastery.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="flex flex-col sm:flex-row items-center gap-4 rounded-lg border p-4">
               <div class="flex flex-col">
                  <span class="text-sm text-muted-foreground">Your Score</span>
                  <span class="text-4xl font-bold">{{ score }} / {{ totalQuestions }}</span>
                </div>
                <div class="flex-1 w-full">
                  <Progress :model-value="scorePercentage" class="w-full" />
                  <p class="text-sm text-center mt-2 text-muted-foreground">
                    {{ scorePercentage === 100 ? 'Excellent work! Perfect score!' : `You answered ${scorePercentage.toFixed(0)}% correctly.` }}
                  </p>
                </div>
            </div>

            <!-- Detailed Answer Review -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Detailed Review</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                <Alert :variant="question.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="{'border-green-500': question.isCorrect, 'border-red-500': !question.isCorrect}">
                  <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                  <AlertTitle class="font-bold flex items-center gap-2">
                    Question {{ index + 1 }}
                    <span
                      class="text-xs font-mono px-2 py-0.5 rounded-full"
                      :class="question.isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                    >
                      {{ question.isCorrect ? 'Correct' : 'Incorrect' }}
                    </span>
                  </AlertTitle>
                  <AlertDescription class="mt-2 space-y-2">
                    <p class="text-base">
                      {{ question.text.replace('______', `<strong>${question.correctAnswer}</strong>`) }}
                    </p>
                    <div v-if="!question.isCorrect" class="p-2 rounded-md bg-red-500/10">
                      <p><span class="font-semibold">Your answer:</span> <span class="font-mono line-through">{{ question.userAnswer || ' (no answer)' }}</span></p>
                      <p><span class="font-semibold">Correct answer:</span> <span class="font-mono">{{ question.correctAnswer }}</span></p>
                    </div>
                    <div class="flex items-start gap-2 p-3 rounded-md bg-gray-500/10 mt-2">
                      <HelpCircle class="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                      <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
             <Button variant="outline" @click="resetTest" class="w-full">
                Practice Again
              </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
