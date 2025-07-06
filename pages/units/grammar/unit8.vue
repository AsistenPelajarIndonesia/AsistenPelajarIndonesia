<!--
  File: @/pages/units/grammar/2.vue
  Unit: Present perfect continuous (I have been doing)
  Description: An advanced grammar practice page for Nuxt 3.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/1")
}

function goToNextUnit() {
  router.push("/units/grammar/3")
}

const isSubmitted = ref(false)

interface Question {
  id: number
  type: 'fill-in-the-blank' | 'choose-correct'
  sentence: string
  context?: string
  options?: string[]
  userAnswer: string
  correctAnswer: string[]
  explanation: string
  hint: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    sentence: "You're out of breath. ______ (you / run)?",
    userAnswer: '',
    correctAnswer: ['Have you been running'],
    explanation: "We use the Present Perfect Continuous to ask about a recent activity that has a clear result in the present (being out of breath). The focus is on the action of running itself, not its completion.",
    hint: "Think about an action that just finished and has a present result."
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    context: "Paul is a professional tennis player.",
    sentence: "He ______ (play) since he was ten years old.",
    userAnswer: '',
    correctAnswer: ['has been playing'],
    explanation: "This describes an unfinished action that started in the past and continues to the present. 'Since' is a strong indicator for the Present Perfect Continuous, emphasizing the duration of the ongoing activity.",
    hint: "The action started in the past and is still happening now."
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    context: "The ground is wet and there are puddles everywhere.",
    sentence: "It ______ (rain) all night.",
    userAnswer: '',
    correctAnswer: ['has been raining'],
    explanation: "The present result (wet ground) is caused by a continuous action that occurred over a period (all night). The action might have just stopped or may still be happening.",
    hint: "Look at the evidence in the present."
  },
  {
    id: 4,
    type: 'choose-correct',
    sentence: "She's a novelist. She ______ books her entire life. So far, she ______ five of them.",
    options: ["has been writing / has written", "has written / has been writing"],
    userAnswer: '',
    correctAnswer: ['has been writing / has written'],
    explanation: "The first part ('has been writing') emphasizes the continuous, ongoing activity of being a writer. The second part ('has written') focuses on the completed result—the specific number of books finished.",
    hint: "Which part focuses on the activity, and which on the result?"
  },
  {
    id: 5,
    type: 'fill-in-the-blank',
    context: "Sarah looks exhausted.",
    sentence: "She ______ (work) 12-hour days for the past two weeks to meet a deadline.",
    userAnswer: '',
    correctAnswer: ['has been working'],
    explanation: "This tense is perfect for describing a temporary but intense period of activity that has led to a present state (exhaustion). 'For the past two weeks' highlights the duration.",
    hint: "This is a temporary, intense situation leading to a current state."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    context: "I called you earlier, but you didn't answer.",
    sentence: "What ______ (you / do)?",
    userAnswer: '',
    correctAnswer: ['have you been doing'],
    explanation: "This is a common way to ask someone what activity they were engaged in recently. It implies curiosity about the ongoing action that prevented them from answering the phone.",
    hint: "Ask about a recent, unspecified activity."
  },
  {
    id: 7,
    type: 'choose-correct',
    sentence: "I ______ this car for three years, and I've never had a problem with it.",
    options: ["have been having", "have had"],
    userAnswer: '',
    correctAnswer: ['have had'],
    explanation: "'To have' in the sense of possession is a state verb. State verbs (like know, believe, own, have) are generally not used in continuous tenses. We use the Present Perfect Simple instead.",
    hint: "Is 'to have' (meaning 'to own') an action or a state?"
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    context: "The kitchen is a complete mess!",
    sentence: "My brother ______ (try) to bake a cake, and it seems he failed spectacularly.",
    userAnswer: '',
    correctAnswer: ['has been trying'],
    explanation: "The focus is on the recent, messy activity of 'trying to bake,' not on the finished result (which, in this case, is a mess, not a cake). The continuous form perfectly captures the chaotic process.",
    hint: "Focus on the process, not the final product."
  },
])

const checkAnswers = () => {
  isSubmitted.value = true
}

const score = computed(() => {
  const correctCount = questions.value.filter(isQuestionCorrect).length
  return Math.round((correctCount / questions.value.length) * 100)
})

const isQuestionCorrect = (question: Question) => {
  const userAnswer = question.userAnswer.trim().toLowerCase()
  const correctAnswers = question.correctAnswer.map(ans => ans.toLowerCase())
  return correctAnswers.includes(userAnswer)
}

const getScoreMessage = computed(() => {
  if (score.value === 100) return { title: "Perfect Score!", message: "Outstanding! You have mastered the nuances of the Present Perfect Continuous. A truly exceptional performance.", variant: "success" }
  if (score.value >= 80) return { title: "Excellent Work!", message: "You have a strong command of this tense. Review the explanations for any missed questions to solidify your knowledge.", variant: "success" }
  if (score.value >= 60) return { title: "Good Effort!", message: "A solid attempt. This is a tricky tense. Pay close attention to the contrast between activity and result.", variant: "default" }
  if (score.value >= 40) return { title: "Needs Improvement.", message: "You're on the right track, but there are some key concepts to review. Focus on the material section, especially the state verbs and simple/continuous contrast.", variant: "warning" }
  return { title: "Let's Review.", message: "This unit is challenging. Don't be discouraged. The best approach is to carefully re-read the explanations and try again. Repetition is key.", variant: "destructive" }
})
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced Exercises from the Raymond Murphy Series"
    unit-title="Unit 10: Present perfect continuous (I have been doing)"
    unit-description="This unit explores the tense used for unfinished actions or recent continuous activities that have a result in the present. Mastering this requires understanding the subtle difference between focusing on an activity versus its completion."
    :categories="['Tense', 'Perfect Aspect', 'Continuous Aspect', 'B1/B2 Intermediate']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-primary" />
            Core Concept: Activity + Result
          </CardTitle>
          <CardDescription>
            We use the Present Perfect Continuous for an activity that has recently stopped or just stopped, which has a result in the present.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">Study this situation:</p>
          <div class="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <p class="italic">It is raining. Maria's clothes are covered in yellow and blue paint. She has a paintbrush in her hand.</p>
            <p class="mt-2">
              <span class="font-bold">She has been painting the ceiling.</span>
            </p>
            <p class="text-sm text-muted-foreground">
              This means the action of painting is recent, continuous, and explains her present appearance. The activity itself is the focus.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contrast: Continuous vs. Simple</CardTitle>
          <CardDescription>This is the most critical and challenging aspect of this tense.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-md border p-4">
              <h4 class="font-bold">Present Perfect Continuous</h4>
              <p class="text-sm text-muted-foreground">Focus on the <span class="font-semibold text-primary">ACTIVITY</span>. The action may not be finished.</p>
              <hr class="my-2">
              <p class="italic">My hands are dirty. <span class="font-semibold">I have been repairing</span> the bike.</p>
              <p class="italic"><span class="font-semibold">She has been reading</span> for two hours.</p>
            </div>
            <div class="rounded-md border p-4">
              <h4 class="font-bold">Present Perfect Simple</h4>
              <p class="text-sm text-muted-foreground">Focus on the <span class="font-semibold text-primary">RESULT</span>. The action is completed.</p>
              <hr class="my-2">
              <p class="italic">The bike is working now. <span class="font-semibold">I have repaired</span> it.</p>
              <p class="italic"><span class="font-semibold">She has read</span> 100 pages.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-amber-900 dark:text-amber-300">
            <Info class="h-5 w-5" />
            Important: State Verbs
          </CardTitle>
        </CardHeader>
        <CardContent class="text-amber-800 dark:text-amber-400">
          <p>We do not normally use the continuous form with state verbs (verbs describing a state, not an action). Common examples: <span class="font-mono">know, like, believe, have (possess), need, belong, understand.</span></p>
          <ul class="mt-2 list-inside list-disc space-y-1">
            <li><span class="text-red-600 line-through">I have been knowing him for years.</span> (Incorrect)</li>
            <li><span class="text-green-600">I have known him for years.</span> (Correct)</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Use the verb in parentheses or choose the correct option.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <Label :for="`q${question.id}`">
              <span class="font-semibold">Question {{ index + 1 }}:</span>
              <span v-if="question.context" class="ml-2 text-sm italic text-muted-foreground">{{ question.context }}</span>
            </Label>
            <p class="text-lg">{{ question.sentence.split('______')[0] }}
              <span class="font-bold text-primary">______</span>
              {{ question.sentence.split('______')[1] }}
            </p>
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                :id="`q${question.id}`"
                v-model="question.userAnswer"
                :placeholder="question.hint"
                :disabled="isSubmitted"
                class="mt-1"
                @keyup.enter="checkAnswers"
              />
            </div>
            <div v-if="question.type === 'choose-correct'" class="flex flex-wrap gap-2">
              <Button
                v-for="option in question.options" :key="option"
                :variant="question.userAnswer === option ? 'default' : 'outline'"
                :disabled="isSubmitted"
                size="sm"
                @click="question.userAnswer = option"
              >
                {{ option }}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" class="w-full" size="lg" @click="checkAnswers">
            Check Answers
          </Button>
          <Button v-else class="w-full" size="lg" @click="isSubmitted = false">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Results & Explanations</CardTitle>
          <CardDescription>Your score is {{ score }}%. Review each question below for a detailed analysis.</CardDescription>
          <Progress :model-value="score" class="mt-4" />
        </CardHeader>
        <CardContent>
          <Alert :variant="getScoreMessage.value.variant" class="mb-6">
            <component :is="score >= 60 ? CheckCircle2 : XCircle" class="h-4 w-4" />
            <AlertTitle>{{ getScoreMessage.value.title }}</AlertTitle>
            <AlertDescription>{{ getScoreMessage.value.message }}</AlertDescription>
          </Alert>
          
          <div class="space-y-4">
            <div v-for="question in questions" :key="`res-${question.id}`">
              <Alert :variant="isQuestionCorrect(question) ? 'default' : 'destructive'" class="p-4">
                <div class="flex items-start gap-4">
                  <component :is="isQuestionCorrect(question) ? CheckCircle2 : XCircle" class="h-6 w-6 flex-shrink-0" :class="isQuestionCorrect(question) ? 'text-green-500' : 'text-red-500'" />
                  <div class="flex-1">
                    <p class="font-semibold">{{ question.sentence.replace('______', '...') }}</p>
                    <div class="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                      <div>
                        <p class="font-medium">Your Answer:</p>
                        <p :class="['font-mono', { 'text-red-600 dark:text-red-400': !isQuestionCorrect(question) }]">{{ question.userAnswer || 'No answer' }}</p>
                      </div>
                      <div>
                        <p class="font-medium">Correct Answer:</p>
                        <p class="font-mono text-green-700 dark:text-green-400">{{ question.correctAnswer.join(' / ') }}</p>
                      </div>
                    </div>
                    <Alert v-if="!isQuestionCorrect(question)" variant="default" class="mt-3 bg-background">
                      <Info class="h-4 w-4" />
                      <AlertTitle>Teacher's Note</AlertTitle>
                      <AlertDescription>{{ question.explanation }}</AlertDescription>
                    </Alert>
                     <Alert v-else variant="default" class="mt-3 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CheckCircle2 class="h-4 w-4 text-green-600" />
                      <AlertTitle class="text-green-800 dark:text-green-300">Excellent!</AlertTitle>
                      <AlertDescription class="text-green-700 dark:text-green-400">{{ question.explanation }}</AlertDescription>
                    </Alert>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
