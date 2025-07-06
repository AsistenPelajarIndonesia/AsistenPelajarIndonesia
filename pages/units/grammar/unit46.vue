<!--
  File: @/pages/units/grammar/3.vue
  Description: A dedicated practice page for "Reported Speech 1 (he said that …)".
  This page integrates learning material, challenging exercises, and a detailed
  validation system to provide a comprehensive learning experience.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports from a UI Library like shadcn-vue ---
// Assuming these components are globally available or imported from a UI library.
// For this example, we'll list them to show dependencies.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Info, RefreshCcw, Lightbulb } from 'lucide-vue-next'

// --- Page & Layout Configuration ---
const pageMeta = reactive({
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy',
  unitTitle: 'Unit 3: Reported Speech 1 (he said that …)',
  unitDescription: 'Learn how to report what someone else has said by changing tenses, pronouns, and expressions of time and place.',
  categories: ['Reported Speech', 'Tense Changes', 'Intermediate', 'B1/B2 Level'],
})

// --- Navigation ---
const router = useRouter()

function goToPreviousUnit() {
  // Assuming the previous unit is 2
  router.push('/units/grammar/2')
}

function goToNextUnit() {
  // Assuming the next unit is 4
  router.push('/units/grammar/4')
}

// --- State Management for Practice ---
const isSubmitted = ref(false)
const showResult = ref(false)

/**
 * @typedef {Object} Question
 * @property {number} id - Unique identifier for the question.
 * @property {'TRANSFORMATION'} type - The type of question.
 * @property {string} directSpeech - The original sentence in direct speech.
 * @property {string} prompt - The beginning of the reported speech sentence.
 * @property {string} userAnswer - The student's input, managed by v-model.
 * @property {string[]} correctAnswers - An array of all valid answers.
 * @property {string} explanation - Detailed feedback on the grammar rule.
 * @property {'unchecked' | 'correct' | 'incorrect'} validationState - The result of the validation.
 */

/** @type {Question[]} */
const questions = reactive([
  {
    id: 1,
    type: 'TRANSFORMATION',
    directSpeech: "I'm feeling very tired today.",
    prompt: 'She said that',
    userAnswer: '',
    correctAnswers: [
      "she was feeling very tired that day.",
    ],
    explanation: "The Present Continuous ('am feeling') backshifts to the Past Continuous ('was feeling'). The pronoun 'I' changes to 'she', and the time adverb 'today' changes to 'that day'.",
    validationState: 'unchecked',
  },
  {
    id: 2,
    type: 'TRANSFORMATION',
    directSpeech: "I've lost my keys.",
    prompt: 'He told me that',
    userAnswer: '',
    correctAnswers: [
      "he had lost his keys.",
    ],
    explanation: "The Present Perfect ('have lost') backshifts to the Past Perfect ('had lost'). 'I' changes to 'he' and 'my' changes to 'his'. Note that 'told' is used with an object ('me').",
    validationState: 'unchecked',
  },
  {
    id: 3,
    type: 'TRANSFORMATION',
    directSpeech: "We will be here tomorrow.",
    prompt: 'They said',
    userAnswer: '',
    correctAnswers: [
      "they would be there the next day.",
      "they would be there the following day.",
    ],
    explanation: "'will' changes to 'would'. The pronoun 'We' becomes 'they', the place adverb 'here' becomes 'there', and the time adverb 'tomorrow' becomes 'the next day' or 'the following day'.",
    validationState: 'unchecked',
  },
  {
    id: 4,
    type: 'TRANSFORMATION',
    directSpeech: "You must finish your report.",
    prompt: 'The manager insisted that',
    userAnswer: '',
    correctAnswers: [
      "I had to finish my report.",
      "we had to finish our report.",
    ],
    explanation: "The modal 'must' (for obligation) changes to 'had to'. The pronoun 'You' can be interpreted as singular ('I') or plural ('we'), so both 'my' and 'our' are acceptable.",
    validationState: 'unchecked',
  },
  {
    id: 5,
    type: 'TRANSFORMATION',
    directSpeech: "I bought this car last week.",
    prompt: 'He mentioned that',
    userAnswer: '',
    correctAnswers: [
      "he had bought that car the week before.",
      "he had bought that car the previous week.",
    ],
    explanation: "The Past Simple ('bought') backshifts to the Past Perfect ('had bought'). The determiner 'this' changes to 'that', and the time phrase 'last week' becomes 'the week before' or 'the previous week'.",
    validationState: 'unchecked',
  },
  {
    id: 6,
    type: 'TRANSFORMATION',
    directSpeech: "I can't help you right now.",
    prompt: 'She explained that',
    userAnswer: '',
    correctAnswers: [
      "she couldn't help me right then.",
      "she couldn't help me at that moment.",
    ],
    explanation: "The modal 'can't' changes to 'couldn't'. 'You' becomes 'me' (assuming she spoke to me), and 'now' changes to 'then' or 'at that moment'.",
    validationState: 'unchecked',
  },
]);

// --- Computed Properties for Results ---
const totalQuestions = computed(() => questions.length)
const score = computed(() => {
  return questions.filter(q => q.validationState === 'correct').length
})
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})
const resultFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: 'Excellent!', message: "Perfect score! You have mastered the backshift and other changes in reported speech." }
  if (percentage >= 70) return { title: 'Great Job!', message: "A very strong performance. Review the explanations for the few you missed to solidify your knowledge." }
  if (percentage >= 40) return { title: 'Good Effort!', message: "You're on the right track. Pay close attention to the explanations below to understand the key rules." }
  return { title: 'Needs Review', message: "This is a tricky topic. Go over the learning material again and carefully analyze the feedback for each question." }
})

// --- Core Logic Functions ---
function checkAnswers() {
  questions.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().replace(/\s+/g, ' ').replace(/\.$/, '');
    const isCorrect = q.correctAnswers.some(
      correctAnswer => userAnswerCleaned.toLowerCase() === correctAnswer.replace(/\.$/, '').toLowerCase()
    );

    q.validationState = isCorrect ? 'correct' : 'incorrect';
  })
  isSubmitted.value = true
  showResult.value = true
}

function resetTest() {
  questions.forEach(q => {
    q.userAnswer = ''
    q.validationState = 'unchecked'
  })
  isSubmitted.value = false
  showResult.value = false
}
</script>

<template>
  <GrammarLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Lightbulb class="h-5 w-5 text-yellow-500" />
            <span>Core Concept: Reporting Speech</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            When we want to report what someone else said, we usually do not use the speaker's exact words (direct speech). Instead, we use reported speech (or indirect speech). This often involves changes to tenses, pronouns, and adverbs of time and place.
          </p>
          <p class="font-semibold">
            Direct: <span class="font-mono text-blue-600">"I am living in London."</span><br>
            Reported: <span class="font-mono text-purple-600">He said that he was living in London.</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tense "Backshift"</CardTitle>
          <CardDescription>The most common rule is to move the verb tense one step into the past.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="font-semibold">
                <tr class="border-b">
                  <th class="p-2 text-left">Direct Speech Tense</th>
                  <th class="p-2 text-left">Reported Speech Tense</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">Present Simple (I <span class="text-blue-600">work</span>)</td>
                  <td class="p-2">Past Simple (he <span class="text-purple-600">worked</span>)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Present Continuous (I <span class="text-blue-600">am working</span>)</td>
                  <td class="p-2">Past Continuous (he <span class="text-purple-600">was working</span>)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Past Simple (I <span class="text-blue-600">worked</span>)</td>
                  <td class="p-2">Past Perfect (he <span class="text-purple-600">had worked</span>)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Present Perfect (I <span class="text-blue-600">have worked</span>)</td>
                  <td class="p-2">Past Perfect (he <span class="text-purple-600">had worked</span>)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2"><span class="text-blue-600">will</span></td>
                  <td class="p-2"><span class="text-purple-600">would</span></td>
                </tr>
                <tr class="border-b">
                  <td class="p-2"><span class="text-blue-600">can</span></td>
                  <td class="p-2"><span class="text-purple-600">could</span></td>
                </tr>
                <tr>
                  <td class="p-2"><span class="text-blue-600">must</span> (obligation)</td>
                  <td class="p-2"><span class="text-purple-600">had to</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Essential Changes</CardTitle>
          <CardDescription>Pronouns and expressions of time/place also shift.</CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <ul class="space-y-1">
            <li><strong>now</strong> &rarr; then / at that moment</li>
            <li><strong>today</strong> &rarr; that day</li>
            <li><strong>here</strong> &rarr; there</li>
            <li><strong>this</strong> &rarr; that</li>
          </ul>
          <ul class="space-y-1">
            <li><strong>tomorrow</strong> &rarr; the next day / the following day</li>
            <li><strong>yesterday</strong> &rarr; the day before / the previous day</li>
            <li><strong>last week</strong> &rarr; the week before / the previous week</li>
            <li><strong>ago</strong> &rarr; before / previously</li>
          </ul>
        </CardContent>
         <CardFooter class="text-xs text-muted-foreground">
          Note: 'say' is used without a personal object (He said...). 'tell' must have an object (He told me...).
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Transform the sentences from direct to reported speech. Pay close attention to all necessary changes.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium">
              {{ index + 1 }}. <span class="font-mono bg-slate-100 p-1 rounded-md text-slate-800">"{{ question.directSpeech }}"</span>
            </p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground whitespace-nowrap">{{ question.prompt }}</span>
              <div class="relative w-full">
                <Input
                  v-model="question.userAnswer"
                  type="text"
                  placeholder="...your reported sentence here."
                  :disabled="isSubmitted"
                  :class="{
                    'ring-2 ring-green-500 focus-visible:ring-green-500': question.validationState === 'correct',
                    'ring-2 ring-red-500 focus-visible:ring-red-500': question.validationState === 'incorrect',
                  }"
                />
                <div v-if="isSubmitted" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle2 v-if="question.validationState === 'correct'" class="h-5 w-5 text-green-500" />
                    <XCircle v-else class="h-5 w-5 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
          <Button v-if="isSubmitted" variant="outline" @click="resetTest">
            <RefreshCcw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button :disabled="isSubmitted" @click="checkAnswers">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS & FEEDBACK SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-border/60">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
            You scored {{ score }} out of {{ totalQuestions }}.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <Progress :model-value="scorePercentage" class="w-full" />
            <Alert :variant="scorePercentage === 100 ? 'default' : 'destructive'" class="mt-4 bg-opacity-10">
              <component :is="scorePercentage === 100 ? CheckCircle2 : Info" class="h-4 w-4" />
              <AlertTitle>{{ resultFeedback.title }}</AlertTitle>
              <AlertDescription>{{ resultFeedback.message }}</AlertDescription>
            </Alert>
          </div>

          <!-- Detailed Explanations for Incorrect Answers -->
          <div v-if="score < totalQuestions" class="space-y-4">
             <h3 class="text-lg font-semibold tracking-tight border-b pb-2">
              Review Your Answers
            </h3>
            <div v-for="question in questions.filter(q => q.validationState === 'incorrect')" :key="`result-${question.id}`" class="p-4 border rounded-lg bg-muted/50">
              <p class="text-sm text-muted-foreground">Original sentence:</p>
              <p class="mb-2 font-mono text-sm">"{{ question.directSpeech }}"</p>
              
              <p class="font-medium text-red-600">Your answer:</p>
              <p class="mb-2 line-through">
                {{ question.prompt }} {{ question.userAnswer || ' (no answer provided)' }}
              </p>

              <p class="font-medium text-green-700">Correct answer(s):</p>
              <ul class="list-disc list-inside mb-3">
                <li v-for="answer in question.correctAnswers" :key="answer" class="text-green-700">
                  {{ question.prompt }} {{ answer }}
                </li>
              </ul>
              
              <Alert variant="default" class="bg-blue-50 border-blue-200 text-blue-800">
                <Info class="h-4 w-4 text-blue-600" />
                <AlertTitle class="font-semibold">Explanation</AlertTitle>
                <AlertDescription class="text-blue-700">{{ question.explanation }}</AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Optional: Add some subtle transitions for a smoother UI feel */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
