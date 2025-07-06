<!--
  File: @/pages/units/grammar/3.vue
  Description: A deep-dive practice module for Unit 3: "Can/could/would you...?"
  Inspired by Raymond Murphy's "English Grammar In Use", this page offers a robust
  learning experience with contextual exercises and a sophisticated validation system.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Award, BookOpen, Repeat } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: "Intermediate English Grammar Practice",
  testDescription: "Based on 'English Grammar In Use' by Raymond Murphy.",
  unitTitle: "Unit 3: Can/could/would you …? (Requests, offers, permission and invitations)",
  unitDescription: "Mastering modals for polite and effective communication. This unit explores the subtle differences between 'can', 'could', and 'would' in various social contexts.",
  categories: ["Modals", "Politeness", "Functional Language", "Intermediate"],
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigate to the previous unit's page
  router.push("/units/grammar/2")
}
function goToNextUnit() {
  // Navigate to the next unit's page
  router.push("/units/grammar/4")
}

// --- Learning Material (The "Teacher's Notes") ---
// This data structure provides the core teaching content for the '#material' slot.
const learningSections = [
  {
    title: 'A. Requests: Asking for something',
    icon: 'Hand', // Placeholder for a potential icon component
    points: [
      {
        concept: "`Can you ...?` / `Could you ...?`",
        explanation: "Both are used to ask someone to do something. `Could you ...?` is generally more polite and less direct than `Can you ...?`.",
        examples: [
          { sentence: "`Can you` turn the music down a bit?", context: "(Informal, to a friend)" },
          { sentence: "`Could you` please tell me where the nearest bank is?", context: "(More formal, to a stranger)" },
        ],
      },
      {
        concept: "`Would you mind -ing ...?`",
        explanation: "This is a very polite way to make a request. Note the use of the `-ing` form of the verb after `mind`.",
        examples: [
          { sentence: "`Would you mind closing` the window? It's a bit cold.", context: "(Very polite)" },
          { sentence: "Incorrect: `Would you mind to close...` or `Would you mind close...`", context: "(Common error to avoid)" }
        ],
      },
    ],
  },
  {
    title: 'B. Permission: Asking to do something',
    icon: 'Key',
    points: [
      {
        concept: "`Can I ...?` / `Could I ...?` / `May I ...?`",
        explanation: "Used to ask for permission. `Can I` is the most common. `Could I` is more polite. `May I` is the most formal and is often used in more traditional or official settings.",
        examples: [
          { sentence: "`Can I` borrow your dictionary?", context: "(Common, general use)" },
          { sentence: "`Could I` possibly ask you a personal question?", context: "(Polite, tentative)" },
          { sentence: "`May I` be excused?", context: "(Very formal, e.g., in a courtroom or formal meeting)" }
        ],
      },
    ],
  },
  {
    title: 'C. Offers & Invitations',
    icon: 'Gift',
    points: [
      {
        concept: "Offers: `Can I ...?`",
        explanation: "Used when you offer to do something for someone.",
        examples: [
          { sentence: "'I'm so thirsty.' '`Can I` get you a glass of water?'", context: "(Offering help)" },
        ],
      },
      {
        concept: "Invitations/Offers: `Would you like ...?`",
        explanation: "The standard and polite way to invite someone or offer them something. It is followed by a noun or a `to + infinitive`.",
        examples: [
          { sentence: "`Would you like` another biscuit?", context: "(Offering a thing)" },
          { sentence: "`Would you like to` join us for dinner on Saturday?", context: "(Invitation to an activity)" },
        ],
      },
    ],
  },
]

// --- Practice Questions & Validator ---
// The core of the interactive exercise, with complex scenarios and detailed explanations.
const questions = ref([
  {
    id: 1,
    type: 'multiple-choice',
    context: "You are in a quiet library and need to ask the librarian a question. Which is the MOST appropriate and polite way to get their attention?",
    question: "You say:",
    options: [
      { text: "Can you help me?", value: "a" },
      { text: "Excuse me, could you possibly help me for a moment?", value: "b" },
      { text: "Would you like to help me?", value: "c" },
      { text: "Help me.", value: "d" }
    ],
    userAnswer: null,
    correctAnswer: "b",
    explanation: "`Could you possibly...?` is the most polite and tentative form, suitable for a formal, quiet environment. 'Can you...?' is too direct. 'Would you like to...?' is an offer/invitation, which doesn't fit the context. 'Help me' is an impolite command."
  },
  {
    id: 2,
    type: 'multiple-choice',
    context: "You want to offer your elderly neighbour a ride to the supermarket. What do you say?",
    question: "You say:",
    options: [
      { text: "Can you take a ride with me?", value: "a" },
      { text: "Would you mind getting in my car?", value: "b" },
      { text: "Would you like a lift? I'm heading to the supermarket.", value: "c" },
      { text: "Could I give you a lift?", value: "d" }
    ],
    userAnswer: null,
    correctAnswer: "c",
    explanation: "`Would you like...?` is the classic, polite structure for offers and invitations. 'Can you...?' is a request, not an offer. 'Would you mind...?' is a request and sounds awkward here. 'Could I...?' is asking for permission for yourself, which is not the intention."
  },
  {
    id: 3,
    type: 'error-correction',
    context: "A colleague is struggling with a heavy box. You want to offer help. Identify the grammatically incorrect offer:",
    question: "Which sentence is WRONG?",
    options: [
      { text: "Can I give you a hand with that?", value: "a" },
      { text: "Would you like some help?", value: "b" },
      { text: "I can help you, if you want.", value: "c" },
      { text: "Would you mind to help you?", value: "d" }
    ],
    userAnswer: null,
    correctAnswer: "d",
    explanation: "The phrase `Would you mind...?` is used for polite requests, not offers. Furthermore, it must be followed by an `-ing` verb (e.g., 'Would you mind helping me?'). The other options are all correct ways to offer assistance."
  },
  {
    id: 4,
    type: 'function-identification',
    context: "Analyse the function of the modal verb in the following sentence spoken by an employee to their manager.",
    question: "'Could I perhaps leave an hour early today to attend a doctor's appointment?' What is the function of 'Could I...' here?",
    options: [
      { text: "Making a request for the manager to do something.", value: "a" },
      { text: "Making an offer to the manager.", value: "b" },
      { text: "Politely asking for permission for oneself.", value: "c" },
      { text: "Making a formal invitation.", value: "d" }
    ],
    userAnswer: null,
    correctAnswer: "c",
    explanation: "`Could I...?` is a polite form used to ask for permission to do something yourself. The speaker is not asking the manager to do something (a request), nor are they offering or inviting. The word 'perhaps' further emphasizes the tentative, polite nature of the permission-seeking."
  },
  {
    id: 5,
    type: 'multiple-choice',
    context: "You are having dinner at a friend's house. Your friend asks you:",
    question: "'______ you pass the salt, please?' - Which word is LEAST likely to be used by your friend?",
    options: [
      { text: "Can", value: "a" },
      { text: "Could", value: "b" },
      { text: "Would", value: "c" }
    ],
    userAnswer: null,
    correctAnswer: "c",
    explanation: "For requests, both `Can` (informal) and `Could` (more polite) are very common. `Would you pass...?` is grammatically possible but much less common for this type of simple request than `Can` or `Could`. `Would you mind passing...?` would be a very polite alternative. The most common structure with `Would` for a request is `Would you be so kind as to pass...`, which is very formal."
  }
])

// --- Reactive State for Quiz Logic ---
const isSubmitted = ref(false)
const showResult = ref(false)

const score = computed(() => {
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Exceptional!", message: "Perfect score! You have a masterful command of these polite forms.", variant: "success" }
  if (percentage >= 75) return { title: "Excellent Work!", message: "You have a strong understanding of the nuances. Great job!", variant: "success" }
  if (percentage >= 50) return { title: "Good Effort!", message: "You're on the right track. Review the explanations to solidify your knowledge.", variant: "warning" }
  return { title: "Needs Review", message: "These concepts can be tricky. Carefully read the explanations and the material again.", variant: "destructive" }
})

// --- Control Functions ---
function handleSubmit() {
  // Check if all questions are answered
  const allAnswered = questions.value.every(q => q.userAnswer !== null)
  if (!allAnswered) {
    alert("Please answer all questions before submitting.")
    return
  }
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the result section for better UX
  // In a real app, you might use a more sophisticated scroll-to-element method
  setTimeout(() => {
     const resultElement = document.getElementById('result-section');
     resultElement?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function resetQuiz() {
  questions.value.forEach(q => q.userAnswer = null)
  isSubmitted.value = false
  showResult.value = false
}
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material: The Core Learning Content                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            <span>Teacher's Notes: Functions & Politeness</span>
          </CardTitle>
          <CardDescription>
            Understanding the situation is key to choosing the right word.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(section, index) in learningSections" :key="index" class="border-l-4 pl-4" :class="[`border-blue-500`, `border-green-500`, `border-amber-500`][index % 3]">
            <h3 class="font-bold text-md mb-2">{{ section.title }}</h3>
            <div v-for="point in section.points" :key="point.concept" class="flex flex-col gap-2">
              <p class="font-semibold text-primary">{{ point.concept }}</p>
              <p class="text-sm text-muted-foreground">{{ point.explanation }}</p>
              <ul class="list-none pl-4">
                <li v-for="example in point.examples" :key="example.sentence" class="text-sm italic">
                  <span class="font-mono text-slate-800 dark:text-slate-200">{{ example.sentence }}</span>
                  <span class="text-xs text-muted-foreground ml-2"> ({{ example.context }})</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice: Interactive Exercises                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 3: Practice Exercises</CardTitle>
          <CardDescription>
            Read the context carefully and choose the best answer.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <fieldset :disabled="isSubmitted">
              <p class="mb-1 text-sm font-semibold text-muted-foreground">Question {{ index + 1 }} of {{ questions.length }}</p>
              <p v-if="q.context" class="mb-2 text-sm italic bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
                <strong>Context:</strong> {{ q.context }}
              </p>
              <p class="mb-4 font-medium">{{ q.question }}</p>
              <RadioGroup v-model="q.userAnswer">
                <div v-for="option in q.options" :key="option.value" class="flex items-center space-x-2 mb-3">
                  <RadioGroupItem :id="`${q.id}-${option.value}`" :value="option.value" />
                  <Label :for="`${q.id}-${option.value}`" class="flex-1 cursor-pointer">{{ option.text }}</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" class="w-full" @click="handleSubmit">Check My Answers</Button>
          <Button v-else class="w-full" disabled>Answers Submitted</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result: The Awesome Validator and Feedback System               -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="result-section" class="border-t-4 border-primary">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>An analysis of your performance.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score Summary -->
          <div class="flex flex-col sm:flex-row items-center gap-4 rounded-lg bg-muted p-4">
            <div class="flex-shrink-0">
               <Award v-if="scorePercentage === 100" class="h-16 w-16 text-yellow-500" />
               <CheckCircle2 v-else-if="scorePercentage >= 50" class="h-16 w-16 text-green-600" />
               <XCircle v-else class="h-16 w-16 text-red-600" />
            </div>
            <div class="flex-1 w-full">
              <div class="flex justify-between mb-1">
                <span class="font-bold text-lg">Score: {{ score }} / {{ questions.length }}</span>
                <span class="font-bold text-lg">{{ scorePercentage }}%</span>
              </div>
              <Progress :model-value="scorePercentage" />
            </div>
          </div>
          <Alert :variant="feedbackMessage.variant">
            <AlertTitle>{{ feedbackMessage.title }}</AlertTitle>
            <AlertDescription>{{ feedbackMessage.message }}</AlertDescription>
          </Alert>

          <!-- Detailed Question-by-Question Breakdown -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Detailed Breakdown</h3>
            <div class="space-y-6">
              <div
                v-for="(q, index) in questions"
                :key="`result-${q.id}`"
                class="rounded-lg border p-4"
                :class="{
                  'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20': q.userAnswer === q.correctAnswer,
                  'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20': q.userAnswer !== q.correctAnswer
                }"
              >
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <CheckCircle2 v-if="q.userAnswer === q.correctAnswer" class="h-6 w-6 text-green-600" />
                    <XCircle v-else class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="flex-1">
                    <p class="font-bold mb-2">Question {{ index + 1 }}: <span class="font-normal">{{ q.question }}</span></p>
                    <div class="text-sm space-y-2">
                      <p><strong>Your Answer:</strong> <span :class="{'text-green-700 dark:text-green-400': q.userAnswer === q.correctAnswer, 'text-red-700 dark:text-red-400 line-through': q.userAnswer !== q.correctAnswer}">{{ q.options.find(o => o.value === q.userAnswer)?.text }}</span></p>
                      <p><strong>Correct Answer:</strong> <span class="font-semibold text-green-800 dark:text-green-300">{{ q.options.find(o => o.value === q.correctAnswer)?.text }}</span></p>
                      <div class="mt-3 pt-3 border-t border-slate-300 dark:border-slate-700">
                        <p class="font-semibold text-primary">Explanation:</p>
                        <p class="text-muted-foreground">{{ q.explanation }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="resetQuiz" variant="outline" class="w-full">
            <Repeat class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
