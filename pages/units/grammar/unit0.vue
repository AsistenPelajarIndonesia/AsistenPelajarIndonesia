<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Based on the reference book by Raymond Murphy"
    unit-title="Unit 1: Present continuous (I am doing)"
    unit-description="Master the tense for actions in progress, temporary situations, and future arrangements."
    :categories="['Present Tenses', 'Verbs', 'Core Concepts', 'A1-B1 Level']"
    :show-result="showResult"
    @back="goToGrammarIndex"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: #material - The Learning Core                                     -->
    <!-- This section provides a deep dive into the grammar rules, inspired      -->
    <!-- by the clear, contextual teaching style of Raymond Murphy.              -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-blue-50 dark:bg-blue-900/30">
          <CardTitle class="flex items-center gap-2 text-blue-800 dark:text-blue-300">
            <Sparkles class="h-5 w-5" />
            <span>A. The Core Concept: Actions in Progress</span>
          </CardTitle>
          <CardDescription class="text-blue-700 dark:text-blue-400">
            Use the present continuous for an action happening at or around the moment of speaking. The action is incomplete.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <p class="mb-4">
            Imagine a snapshot in time. The present continuous describes what is happening inside that picture.
          </p>
          <div class="rounded-md border border-dashed p-4">
            <p class="font-mono text-sm">
              - 'Where is Kate?' 'She <strong class="text-blue-600">is watching</strong> television.'
            </p>
            <p class="font-mono text-sm">
              - 'Look! That man <strong class="text-blue-600">is trying</strong> to steal your car.'
            </p>
            <p class="font-mono text-sm">
              - 'Let's go out now. It <strong class="text-blue-600">isn't raining</strong> anymore.'
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader class="bg-amber-50 dark:bg-amber-900/30">
          <CardTitle class="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <BookOpenCheck class="h-5 w-5" />
            <span>B. Temporary Situations</span>
          </CardTitle>
          <CardDescription class="text-amber-700 dark:text-amber-400">
            The action doesn't have to be at the exact moment of speaking. It can be happening 'around now'.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <p class="mb-4">
            Think of a period of time (today, this week, this year) where a temporary action is in progress.
          </p>
          <div class="rounded-md border border-dashed p-4">
            <p class="font-mono text-sm">
              - 'I <strong class="text-amber-600">am living</strong> with some friends until I find a place of my own.' (Temporary)
            </p>
            <p class="font-mono text-sm">
              - 'She<strong class="text-amber-600">'s studying</strong> hard this term to pass her exams.' (A period around now)
            </p>
            <p class="font-mono text-sm">
              - 'What <strong class="text-amber-600">are you reading</strong> at the moment?' (Not necessarily reading at this second)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader class="bg-red-50 dark:bg-red-900/30">
          <CardTitle class="flex items-center gap-2 text-red-800 dark:text-red-300">
            <Ban class="h-5 w-5" />
            <span>C. The Exception: State (Non-Continuous) Verbs</span>
          </CardTitle>
          <CardDescription class="text-red-700 dark:text-red-400">
            Some verbs describe states, not actions, and are not typically used in the continuous form. This is a common point of error.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <p class="mb-4">These verbs relate to thoughts, feelings, senses, possession, and being. Memorizing them is key to mastery.</p>
          <ul class="mb-4 list-inside list-disc space-y-1 text-sm font-semibold">
            <li><span class="font-bold">Thoughts:</span> know, believe, understand, remember, mean, think (opinion)</li>
            <li><span class="font-bold">Feelings:</span> like, love, hate, prefer, want, need</li>
            <li><span class="font-bold">Senses:</span> see, hear, smell, taste, seem, look (seem)</li>
            <li><span class="font-bold">Possession:</span> have, own, belong, possess</li>
          </ul>
          <div class="rounded-md border border-dashed p-4">
            <p class="font-mono text-sm text-red-500">
              <X class="mr-2 inline h-4 w-4" /> I am knowing the answer.
            </p>
            <p class="font-mono text-sm text-green-500">
              <Check class="mr-2 inline h-4 w-4" /> I <strong class="text-green-600">know</strong> the answer.
            </p>
            <Separator class="my-2" />
            <p class="font-mono text-sm text-red-500">
              <X class="mr-2 inline h-4 w-4" /> This food is tasting delicious.
            </p>
            <p class="font-mono text-sm text-green-500">
              <Check class="mr-2 inline h-4 w-4" /> This food <strong class="text-green-600">tastes</strong> delicious.
            </p>
          </div>
          <Alert variant="destructive" class="mt-4">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Critical Distinction</AlertTitle>
            <AlertDescription>
              Some verbs like 'think' and 'have' can be state or action verbs depending on context. <br>
              - I <strong class="font-bold">think</strong> (believe) you are right. (State) <br>
              - I <strong class="font-bold">am thinking</strong> about the problem. (Action/Process)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader class="bg-purple-50 dark:bg-purple-900/30">
          <CardTitle class="flex items-center gap-2 text-purple-800 dark:text-purple-300">
            <CalendarDays class="h-5 w-5" />
            <span>D. Future Arrangements</span>
          </CardTitle>
          <CardDescription class="text-purple-700 dark:text-purple-400">
            Use the present continuous for fixed plans in the near future, especially with other people.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <p class="mb-4">
            This implies that you have already made a decision and arranged to do it. A time expression is usually included.
          </p>
          <div class="rounded-md border border-dashed p-4">
            <p class="font-mono text-sm">
              - 'What <strong class="text-purple-600">are you doing</strong> on Saturday evening?'
            </p>
            <p class="font-mono text-sm">
              - 'I <strong class="text-purple-600">am meeting</strong> my friends at the cinema.'
            </p>
             <p class="font-mono text-sm">
              - 'She <strong class="text-purple-600">is not coming</strong> to the party tomorrow.'
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: #practice - The Interactive Exercises                              -->
    <!-- These questions are designed to be challenging, targeting common        -->
    <!-- pitfalls and nuanced distinctions of the present continuous.            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Use the correct form of the verb in brackets.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <Label :for="`q-${question.id}`" class="text-base">
              {{ index + 1 }}. {{ question.prompt }}
            </Label>
            <Input
              :id="`q-${question.id}`"
              v-model="question.userAnswer"
              type="text"
              placeholder="Your answer..."
              class="font-mono"
              :disabled="showResult"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" size="lg" :disabled="!allQuestionsAnswered || showResult" @click="validateAnswers">
            <CheckCircle class="mr-2 h-5 w-5" />
            Check Answers & See Score
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: #result - The Validation and Feedback Engine                      -->
    <!-- Provides not just a score, but detailed, pedagogical explanations for   -->
    <!-- each answer, reinforcing the learning material.                         -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-2 border-primary">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>An analysis of your performance. Review the explanations carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score and Feedback -->
          <div class="rounded-lg bg-muted p-6">
            <h3 class="text-lg font-semibold">Overall Score: {{ score }} / {{ questions.length }} ({{ scorePercentage }}%)</h3>
            <Progress :model-value="scorePercentage" class="my-3" />
            <p class="text-muted-foreground">{{ scoreFeedback }}</p>
          </div>

          <!-- Detailed Answer Breakdown -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Detailed Breakdown</h3>
            <div
              v-for="question in questions"
              :key="`result-${question.id}`"
              class="rounded-md border p-4"
              :class="question.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'"
            >
              <p class="mb-2 font-medium">{{ question.prompt }}</p>
              <div class="flex items-center gap-3">
                <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 flex-shrink-0" :class="question.isCorrect ? 'text-green-600' : 'text-red-600'" />
                <p class="flex-1 text-sm">
                  <span class="font-semibold">Your answer:</span>
                  <span :class="question.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-400 line-through'">
                    {{ question.userAnswer || 'No answer provided' }}
                  </span>
                </p>
              </div>
              <p v-if="!question.isCorrect" class="mt-1 flex items-center gap-3">
                 <Target class="h-5 w-5 flex-shrink-0 text-primary" />
                 <span class="flex-1 text-sm">
                  <span class="font-semibold">Correct answer:</span>
                  <span class="font-bold text-primary">{{ question.answer }}</span>
                </span>
              </p>
              <Separator class="my-3" />
              <div class="flex items-start gap-3">
                <Info class="h-5 w-5 flex-shrink-0 text-sky-600" />
                <p class="flex-1 text-sm text-muted-foreground">
                  <span class="font-semibold text-sky-800 dark:text-sky-300">Explanation:</span> {{ question.explanation }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
         <CardFooter>
            <Button variant="outline" class="w-full" @click="resetPractice">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Sparkles, BookOpenCheck, Ban, CalendarDays, CheckCircle, X, Check, AlertCircle, CheckCircle2, XCircle, Info, Target, RefreshCw } from 'lucide-vue-next'

const router = useRouter()

// --- Navigation ---
function goToGrammarIndex() {
  router.push("/units/grammar")
}
function goToNextUnit() {
  router.push("/units/grammar/1") // Corresponds to Unit 2
}

// --- Reactive State ---
const showResult = ref(false)

interface Question {
  id: number
  prompt: string
  answer: string
  explanation: string
  userAnswer: string
  isCorrect?: boolean
}

const getInitialQuestions = (): Question[] => [
  {
    id: 1,
    prompt: "A: 'Where's Tom?' B: 'He's in the garden. He ______ on the grass.' (lie)",
    answer: "is lying",
    explanation: "The action of lying on the grass is happening right now, at the moment of speaking. 'Lie' becomes 'lying' in the continuous form.",
    userAnswer: "",
  },
  {
    id: 2,
    prompt: "You ______ a lot of noise. Can you be quieter? I ______ to concentrate. (make, try)",
    answer: "are making, am trying",
    explanation: "Both actions are happening now. The first part is a direct observation of a current action. The second part describes a current, continuous effort.",
    userAnswer: "",
  },
  {
    id: 3,
    prompt: "A: 'What ______ about?' B: 'This grammar rule. I don't understand it.' (you / think)",
    answer: "are you thinking",
    explanation: "'Think' here is an action verb meaning 'to use your mind'. It's a process happening now. We use 'are you thinking' for the action, not 'do you think' which asks for an opinion.",
    userAnswer: "",
  },
  {
    id: 4,
    prompt: "I ______ this is a terrible idea. I don't support it. (think)",
    answer: "think",
    explanation: "This is a classic state verb trap. 'Think' here means 'to have an opinion' or 'believe', which is a state, not an action. Therefore, we use the present simple, not continuous.",
    userAnswer: "",
  },
  {
    id: 5,
    prompt: "The river ______ very fast today - much faster than usual. (flow)",
    answer: "is flowing",
    explanation: "This describes a situation happening 'around now' (today) which is different from the usual state. The present continuous emphasizes this temporary change.",
    userAnswer: "",
  },
  {
    id: 6,
    prompt: "A: 'Why are you putting on your coat?' B: 'I ______ out. Do you want to come?' (go)",
    answer: "am going",
    explanation: "This describes an immediate intention or an action that is about to start, which is a common use of the present continuous.",
    userAnswer: "",
  },
  {
    id: 7,
    prompt: "My parents ______ with us this week while their house is being redecorated. (stay)",
    answer: "are staying",
    explanation: "This describes a temporary situation. 'This week' clearly defines the limited time period. The present continuous is perfect for such temporary arrangements.",
    userAnswer: "",
  },
  {
    id: 8,
    prompt: "This sauce is great. It ______ wonderful! (taste)",
    answer: "tastes",
    explanation: "'Taste' here is a state verb describing the quality of the sauce, similar to 'smell' or 'sound'. It is not an action. Therefore, present simple is required.",
    userAnswer: "",
  },
  {
    id: 9,
    prompt: "I ______ to the cinema tonight with Sarah. We bought the tickets yesterday. (go)",
    answer: "am going",
    explanation: "This is a fixed future arrangement. The fact that tickets were bought confirms it's a plan, not a spontaneous decision. We use present continuous for such plans.",
    userAnswer: "",
  },
  {
    id: 10,
    prompt: "The population of the world ______ very fast. (increase)",
    answer: "is increasing",
    explanation: "The present continuous is used to describe changes happening over a long period that are currently in progress. The world population is continuously rising.",
    userAnswer: "",
  },
];

const questions = ref<Question[]>(getInitialQuestions())

// --- Computed Properties ---
const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => q.userAnswer.trim() !== '')
})

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect score! You have completely mastered the present continuous. Exceptional work!"
  if (percentage >= 80) return "Excellent! You have a very strong command of this tense. Review the few mistakes to achieve perfection."
  if (percentage >= 50) return "Good effort! You understand the basics, but some nuances are tricky. Focus on the explanations for state verbs and future use."
  return "This is a challenging topic. Don't be discouraged. Carefully review the material and the detailed explanations below. Repetition is key to success."
})

// --- Methods ---
function validateAnswers() {
  if (!allQuestionsAnswered.value) return

  questions.value.forEach(q => {
    // Normalizing answers for a more robust comparison
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/,/g, '');
    const correctAnswerCleaned = q.answer.trim().toLowerCase().replace(/,/g, '');
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned
  })
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function resetPractice() {
  questions.value = getInitialQuestions()
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* A subtle transition for the results block appearing */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
