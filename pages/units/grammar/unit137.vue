<!--
  File: @/pages/units/grammar/30.vue
  Unit: 30 - Phrasal Verbs 2: In/out
  Description: An advanced, interactive practice module for mastering phrasal verbs with 'in' and 'out'.
  This page provides theoretical explanations, challenging exercises, and a detailed feedback system
  to ensure genuine learning and improvement for the student.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from '#app' // Using Nuxt's auto-imported router
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are auto-imported or globally registered via a Nuxt module like shadcn-nuxt
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, HelpCircle, BookOpen, BrainCircuit } from 'lucide-vue-next'

// --- Page Configuration ---
definePageMeta({
  layout: false, // We are consuming the layout component directly, so we disable the default layout.
})

// --- Navigation Logic ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/29")
}
function goToNextUnit() {
  router.push("/units/grammar/31")
}

// --- Reactive State Management ---

// A reactive object to hold the entire state of the practice session.
const practiceState = reactive({
  questions: [
    {
      id: 1,
      type: 'fill-in-the-blank',
      prompt: "The new fashion trend didn't last long; it will probably ______ within a few months.",
      userAnswer: '',
      correctAnswer: 'die out',
      isCorrect: false,
      explanation: "We use 'die out' to mean that something gradually disappears or stops existing completely, like a species, tradition, or trend."
    },
    {
      id: 2,
      type: 'sentence-rewrite',
      prompt: "The company distributed the free samples to everyone at the event. (Use 'hand out' and the pronoun 'them')",
      userAnswer: '',
      correctAnswer: 'The company handed them out.',
      isCorrect: false,
      explanation: "With separable phrasal verbs like 'hand out', a pronoun object (like 'them', 'it', 'him') MUST go between the verb and the particle. 'Handed out them' is incorrect."
    },
    {
      id: 3,
      type: 'fill-in-the-blank-context',
      prompt: "I spent an hour trying to ______ the solution to the complex puzzle.",
      userAnswer: '',
      correctAnswer: ['work out', 'figure out'],
      isCorrect: false,
      explanation: "Both 'work out' and 'figure out' can mean to find a solution through thinking. 'Work out' often implies a process or calculation, while 'figure out' implies a moment of understanding or discovery. In this context, both are acceptable."
    },
    {
      id: 4,
      type: 'fill-in-the-blank',
      prompt: "The police are investigating how the thieves managed to ______ the high-security bank.",
      userAnswer: '',
      correctAnswer: 'break into',
      isCorrect: false,
      explanation: "'Break in' or 'break into' specifically means to enter a building illegally and by force. The preposition 'into' is used here because a specific location ('the bank') is mentioned."
    },
    {
      id: 5,
      type: 'fill-in-the-blank',
      prompt: "She was so shy she didn't want to ______ the conversation, even though she had a great idea.",
      userAnswer: '',
      correctAnswer: 'join in',
      isCorrect: false,
      explanation: "'Join in' means to participate in an activity that is already happening, such as a game, conversation, or song."
    },
    {
      id: 6,
      type: 'fill-in-the-blank-context',
      prompt: "The fire alarm went off, and the manager shouted for everyone to ______ of the building immediately.",
      userAnswer: '',
      correctAnswer: 'get out',
      isCorrect: false,
      explanation: "'Get out' is a strong, often urgent, command to leave a place. 'Go out' is more neutral and can mean leaving for social reasons (e.g., 'Let's go out for dinner')."
    },
    {
      id: 7,
      type: 'sentence-rewrite',
      prompt: "You must complete this customs declaration. (Use 'fill in' and the pronoun 'it')",
      userAnswer: '',
      correctAnswer: 'You must fill it in.',
      isCorrect: false,
      explanation: "This is another critical test of object pronoun placement. The pronoun 'it' must be placed between 'fill' and 'in'. Saying 'fill in it' is a common mistake for learners."
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      prompt: "He was offered a promotion, but he decided to ______ because it involved too much travel.",
      userAnswer: '',
      correctAnswer: 'pull out',
      isCorrect: false,
      explanation: "'Pull out' means to withdraw from an undertaking, deal, or agreement that you were previously involved in."
    },
    {
      id: 9,
      type: 'fill-in-the-blank',
      prompt: "I'm not cooking tonight. Shall we ______ instead?",
      userAnswer: '',
      correctAnswer: 'eat out',
      isCorrect: false,
      explanation: "'Eat out' is a very common phrasal verb that means to have a meal in a restaurant rather than at home."
    },
    {
      id: 10,
      type: 'fill-in-the-blank-context',
      prompt: "I didn't want to ______ my friend to the authorities, but I had no choice.",
      userAnswer: '',
      correctAnswer: 'turn in',
      isCorrect: false,
      explanation: "'Turn someone in' means to report a criminal to the police or other authority. 'Hand in' is used for submitting work, like an assignment."
    }
  ]
})

const showResult = ref(false)
const isSubmitted = ref(false)

// --- Computed Properties for Dynamic Feedback ---
const score = computed(() => {
  return practiceState.questions.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (practiceState.questions.length === 0) return 0
  return Math.round((score.value / practiceState.questions.length) * 100)
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) {
    return { title: 'Exceptional Work!', message: "Perfect score! Your understanding of these phrasal verbs is outstanding. You've mastered the nuances of meaning and object placement.", variant: 'success' }
  } else if (percentage >= 80) {
    return { title: 'Excellent Effort!', message: "You have a strong command of these phrasal verbs. Review the incorrect answers to perfect your knowledge.", variant: 'default' }
  } else if (percentage >= 60) {
    return { title: 'Good Progress!', message: "A solid attempt. Pay close attention to the explanations for the questions you missed. Focus on the difference between similar verbs.", variant: 'default' }
  } else {
    return { title: 'Needs More Review', message: "This is a challenging topic. Go over the learning material again, focusing on the examples. Repetition is key to mastering phrasal verbs.", variant: 'destructive' }
  }
})

// --- Core Functions ---
function validateAnswers() {
  practiceState.questions.forEach(q => {
    // Normalize user input for case-insensitivity and remove extra whitespace/periods.
    const userAnswerCleaned = q.userAnswer.trim().replace(/\.$/, '').toLowerCase()
    
    if (Array.isArray(q.correctAnswer)) {
      // Handle multiple possible correct answers
      const correctOptions = q.correctAnswer.map(ans => ans.toLowerCase())
      q.isCorrect = correctOptions.includes(userAnswerCleaned)
    } else {
      // Handle a single correct answer
      q.isCorrect = userAnswerCleaned === q.correctAnswer.replace(/\.$/, '').toLowerCase()
    }
  })
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the results section for better UX
  // Using a timeout to ensure the DOM has updated
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetPractice() {
  practiceState.questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = false
  })
  isSubmitted.value = false
  showResult.value = false
}

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate/Advanced Verb Mastery"
    unit-title="Unit 30: Phrasal Verbs 2 (In / Out)"
    unit-description="Understanding the contextual nuances of phrasal verbs involving movement, completion, and distribution."
    :categories="['Phrasal Verbs', 'B2-C1 Level', 'Verb Patterns', 'Raymond Murphy']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL - The Teaching Section                                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpen class="h-6 w-6 text-primary"/> Core Concepts: In / Out</CardTitle>
          <CardDescription>
            Phrasal verbs with 'in' and 'out' often relate to movement, but they also have many abstract and idiomatic meanings. Pay close attention to the object placement.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-md">1. Movement & Location</h4>
            <p class="text-sm text-muted-foreground">
              <strong>IN:</strong> Suggests entering a place or joining an activity.
              <br><em>Examples:</em> Could you let the cat <strong>in</strong>? She just <strong>dropped in</strong> to say hello. Feel free to <strong>join in</strong>!
            </p>
            <p class="text-sm text-muted-foreground mt-2">
              <strong>OUT:</strong> Suggests leaving a place or activity.
              <br><em>Examples:</em> He <strong>walked out</strong> in the middle of the meeting. We like to <strong>eat out</strong> on Fridays. She <strong>got out</strong> of the car.
            </p>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-md">2. Completion & Distribution</h4>
            <p class="text-sm text-muted-foreground">
              <strong>IN:</strong> Can mean submitting or completing.
              <br><em>Examples:</em> Please <strong>fill in</strong> this form. I need to <strong>hand in</strong> my essay by noon.
            </p>
            <p class="text-sm text-muted-foreground mt-2">
              <strong>OUT:</strong> Can mean distributing or solving.
              <br><em>Examples:</em> The teacher <strong>gave out</strong> the worksheets. Can you help me <strong>work out</strong> this problem? She <strong>handed out</strong> flyers.
            </p>
          </div>
          <Separator />
          <Alert variant="destructive">
            <BrainCircuit class="h-4 w-4" />
            <AlertTitle>Crucial Rule: Object Pronouns</AlertTitle>
            <AlertDescription>
              For separable phrasal verbs, when the object is a pronoun (it, them, me, him, etc.), it <strong>MUST</strong> go between the verb and the particle.
              <ul class="list-disc pl-5 mt-2">
                <li>Correct: Fill <strong>it</strong> in. / Hand <strong>them</strong> out.</li>
                <li>Incorrect: <del>Fill in it.</del> / <del>Hand out them.</del></li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE - The Interactive Questions                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. For rewrites, follow the instructions precisely.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in practiceState.questions" :key="question.id" class="space-y-2">
            <Label :for="`q-${question.id}`">
              <span class="font-semibold">Q{{ index + 1 }}: </span>
              <span v-if="question.type === 'sentence-rewrite'" class="italic text-muted-foreground">[Rewrite the sentence]</span>
              {{ question.prompt }}
            </Label>
            <Input
              :id="`q-${question.id}`"
              v-model="question.userAnswer"
              :disabled="isSubmitted"
              type="text"
              placeholder="Your answer..."
              autocomplete="off"
              :class="{
                'border-green-500 focus-visible:ring-green-400': isSubmitted && question.isCorrect,
                'border-red-500 focus-visible:ring-red-400': isSubmitted && !question.isCorrect
              }"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" @click="validateAnswers" class="w-full">Check My Answers</Button>
          <Button v-else @click="resetPractice" variant="secondary" class="w-full">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT - The Feedback and Explanation Section                   -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Here's a detailed breakdown of your performance.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Overall Score Summary -->
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-lg border p-4">
              <div class="flex flex-col items-center">
                <span class="text-4xl font-bold">{{ score }} / {{ practiceState.questions.length }}</span>
                <span class="text-sm text-muted-foreground">Correct Answers</span>
              </div>
              <div class="w-full sm:w-px h-px sm:h-16 bg-border"></div>
              <div class="flex-1 w-full">
                <Progress :model-value="scorePercentage" class="w-full mb-2" />
                <Alert :variant="feedbackMessage.variant" class="border-2">
                  <component :is="feedbackMessage.variant === 'destructive' ? XCircle : CheckCircle" class="h-4 w-4"/>
                  <AlertTitle>{{ feedbackMessage.title }}</AlertTitle>
                  <AlertDescription>{{ feedbackMessage.message }}</AlertDescription>
                </Alert>
              </div>
            </div>

            <!-- Detailed Question Breakdown -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Answer Review</h3>
              <div
                v-for="(question, index) in practiceState.questions"
                :key="`result-${question.id}`"
                class="rounded-lg border p-4 transition-colors"
                :class="[question.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']"
              >
                <div class="flex items-start gap-3">
                  <component :is="question.isCorrect ? CheckCircle : XCircle" class="h-5 w-5 mt-1 flex-shrink-0" :class="[question.isCorrect ? 'text-green-600' : 'text-red-600']" />
                  <div class="flex-1">
                    <p class="font-semibold">Q{{ index + 1 }}: {{ question.prompt }}</p>
                    <p class="text-sm mt-2">
                      <span class="font-medium">Your answer: </span>
                      <span :class="[question.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300', question.userAnswer ? '' : 'italic']">
                        {{ question.userAnswer || 'No answer provided' }}
                      </span>
                    </p>
                    <div v-if="!question.isCorrect" class="text-sm mt-1">
                      <span class="font-medium">Correct answer: </span>
                      <span class="font-semibold text-green-800 dark:text-green-300">
                        {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer }}
                      </span>
                    </div>
                    <Alert class="mt-3 bg-background/70">
                      <HelpCircle class="h-4 w-4" />
                      <AlertTitle class="text-sm font-semibold">Explanation</AlertTitle>
                      <AlertDescription class="text-sm">{{ question.explanation }}</AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
             <Button @click="resetPractice" variant="secondary" class="w-full">Practice Again</Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
