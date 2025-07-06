<!--
  File: @/pages/units/grammar/31.vue
  Description: An advanced grammar practice page for "Phrasal Verbs 3: out", inspired by Raymond Murphy's "English Grammar In Use".
  This page leverages a sophisticated layout to provide a comprehensive learning experience, including detailed explanations,
  challenging exercises, and a powerful validation system with in-depth feedback.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or auto-imported by Nuxt
// We'll also use some extra components for a richer experience.
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/30")
}

function goToNextUnit() {
  router.push("/units/grammar/32")
}

interface Question {
  id: number
  type: 'fill-in-the-blank' | 'rewrite-sentence' | 'context-choice'
  prompt: string
  context?: string
  options?: string[]
  userAnswer: string
  correctAnswers: string[]
  explanation: string
  isCorrect: boolean | null
}

const showResult = ref(false)

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: 'The investigative committee is expected to ________ a detailed report next month.',
    userAnswer: '',
    correctAnswers: ['put out', 'bring out'],
    explanation: "Both 'put out' and 'bring out' can mean to publish or release something for the public. 'Put out' is very common for reports, statements, and official communications.",
    isCorrect: null,
  },
  {
    id: 2,
    type: 'rewrite-sentence',
    prompt: "Rewrite the following sentence using a phrasal verb with 'out': 'It took me a long time to understand what the contract actually meant.'",
    context: 'Your new sentence must convey the same meaning.',
    userAnswer: '',
    correctAnswers: [
        'it took me a long time to work out what the contract actually meant',
        'it took me a long time to figure out what the contract actually meant'
    ],
    explanation: "'Work out' or 'figure out' means to understand or find a solution to something complex through thought and effort. 'Find out' is less appropriate here as it implies discovering a simple fact rather than understanding a complex issue.",
    isCorrect: null,
  },
  {
    id: 3,
    type: 'context-choice',
    prompt: "A small fire started in the kitchen, but luckily I was able to ________ it ________ with the extinguisher.",
    options: ['put / out', 'go / out', 'leave / out'],
    userAnswer: '',
    correctAnswers: ['put / out'],
    explanation: "'Put out' means to extinguish a fire or light. 'Go out' is intransitive; the fire 'goes out' by itself. 'Leave out' means to omit, which makes no sense here.",
    isCorrect: null,
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    prompt: 'The ancient tradition has almost completely ________, with only a few remote villages still practicing it.',
    userAnswer: '',
    correctAnswers: ['died out'],
    explanation: "'Die out' specifically means to disappear or become extinct over time. It's the perfect phrasal verb for traditions, species, or customs that no longer exist.",
    isCorrect: null,
  },
  {
    id: 5,
    type: 'rewrite-sentence',
    prompt: "Rewrite using a phrasal verb with 'out': 'Please don't omit any details, no matter how minor they seem.'",
    context: 'Ensure the new sentence is grammatically correct and natural.',
    userAnswer: '',
    correctAnswers: ["please don't leave out any details, no matter how minor they seem"],
    explanation: "'Leave out' is the standard phrasal verb for omitting or not including something. 'Cross out' means to delete something already written, which is different.",
    isCorrect: null,

  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    prompt: "I've ________ the total cost, and it's much higher than we initially budgeted for.",
    userAnswer: '',
    correctAnswers: ['worked out', 'figured out'],
    explanation: "Both 'worked out' and 'figured out' can be used for calculation. 'Worked out' often implies a more formal or mathematical calculation process.",
    isCorrect: null,
  },
  {
    id: 7,
    type: 'context-choice',
    prompt: "The professor was ________ free copies of his latest research paper after the lecture.",
    options: ['finding out', 'working out', 'handing out'],
    userAnswer: '',
    correctAnswers: ['handing out'],
    explanation: "'Hand out' or 'give out' means to distribute things to a group of people. 'Finding out' (discovering) and 'working out' (calculating/solving) are incorrect in this context.",
    isCorrect: null,
  }
])

function cleanAnswer(answer: string): string {
    return answer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
}

function validateAnswers() {
  questions.value.forEach(q => {
    const cleanedUserAnswer = cleanAnswer(q.userAnswer)
    const isAnswerCorrect = q.correctAnswers.some(correct => cleanAnswer(correct) === cleanedUserAnswer);
    q.isCorrect = isAnswerCorrect;
  })
  showResult.value = true
}

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

const overallFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) {
    return {
      title: 'Exceptional!',
      message: 'A perfect score! You have a masterful command of these phrasal verbs. Your understanding of nuance and context is outstanding.',
      variant: 'success'
    }
  } else if (percentage >= 75) {
    return {
      title: 'Excellent Work!',
      message: 'A very strong performance. You have a solid grasp of the material. Review the explanations for the ones you missed to achieve perfection.',
      variant: 'info'
    }
  } else if (percentage >= 50) {
    return {
      title: 'Good Effort',
      message: 'A solid attempt. You understand the basics, but some of the finer points and contexts are tricky. The detailed feedback below is your key to improvement.',
      variant: 'warning'
    }
  } else {
    return {
      title: 'Needs Review',
      message: "This was a challenging unit. Don't be discouraged! Carefully read through the material and the explanations for each question. Repetition is crucial.",
      variant: 'destructive'
    }
  }
})
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="A series of challenging exercises designed to master the subtleties of English grammar."
    unit-title="Unit 31: Phrasal Verbs 3 (out)"
    unit-description="Exploring the multifaceted particle 'out', covering meanings from completion and exclusion to discovery and distribution."
    :categories="['Phrasal Verbs', 'Advanced Vocabulary', 'C1/C2 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-muted/50">
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> Core Concepts: The Particle 'out'</CardTitle>
        </CardHeader>
        <CardContent class="p-6 text-sm">
          <p class="mb-4 text-muted-foreground">The particle 'out' is incredibly versatile. Its core meaning often relates to moving from an enclosed space to an open one, but this extends metaphorically to concepts of completion, revelation, and exhaustion. Understanding the conceptual groups is key.</p>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-bold">1. Completion, Extinguishing & Solving</h4>
              <p><strong class="text-primary">put out:</strong> to extinguish (a fire, cigarette). <em>Firefighters worked to put out the forest fire.</em></p>
              <p><strong class="text-primary">blow out:</strong> to extinguish with breath (candles). <em>He blew out all 30 candles in one go.</em></p>
              <p><strong class="text-primary">turn out / switch out:</strong> to stop light. <em>Please turn out the lights.</em></p>
              <p><strong class="text-primary">work out / figure out:</strong> to solve, calculate, or understand. <em>I can't work out why the machine isn't functioning. We need to figure out a solution.</em></p>
            </div>
            <Separator />
            <div>
              <h4 class="font-bold">2. Revelation & Discovery</h4>
              <p><strong class="text-primary">find out:</strong> to discover a piece of information. <em>Can you find out what time the train leaves?</em></p>
              <p><strong class="text-primary">turn out:</strong> to prove to be the case. <em>The new employee turned out to be a great asset to the team.</em></p>
            </div>
            <Separator />
            <div>
              <h4 class="font-bold">3. Publication & Distribution</h4>
              <p><strong class="text-primary">put out / bring out:</strong> to publish or release. <em>The company is putting out a press release.</em></p>
              <p><strong class="text-primary">hand out / give out:</strong> to distribute. <em>Volunteers were handing out water to the marathon runners.</em></p>
            </div>
            <Separator />
            <div>
              <h4 class="font-bold">4. Omission & Exhaustion</h4>
              <p><strong class="text-primary">leave out:</strong> to omit. <em>You left out the most crucial part of the story.</em></p>
              <p><strong class="text-primary">cross out / rub out:</strong> to delete written text. <em>He crossed out his mistake and wrote the correct answer above it.</em></p>
              <p><strong class="text-primary">die out:</strong> to become extinct or disappear. <em>Many native languages are in danger of dying out.</em></p>
              <p><strong class="text-primary">run out (of):</strong> to exhaust a supply. <em>We've run out of milk.</em></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <div class="flex flex-col gap-2">
              <Label :for="`q-${question.id}`" class="text-base">Question {{ index + 1 }}</Label>
              <p class="text-sm text-muted-foreground">{{ question.prompt }}</p>
              <p v-if="question.context" class="text-xs italic text-muted-foreground">{{ question.context }}</p>
              
              <div v-if="question.type === 'fill-in-the-blank'">
                <Input :id="`q-${question.id}`" v-model="question.userAnswer" placeholder="Type your answer..." :disabled="showResult" />
              </div>

              <div v-if="question.type === 'rewrite-sentence'">
                 <Input :id="`q-${question.id}`" v-model="question.userAnswer" placeholder="Rewrite the full sentence..." :disabled="showResult" />
              </div>

              <div v-if="question.type === 'context-choice'" class="flex flex-col gap-2 pt-2">
                  <Label v-for="option in question.options" :key="option" :class="['flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-muted', {'cursor-not-allowed opacity-70': showResult}]">
                      <input type="radio" :name="`q-${question.id}`" :value="option" v-model="question.userAnswer" class="accent-primary" :disabled="showResult"/>
                      <span>{{ option }}</span>
                  </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="showResult" class="w-full">
            Check Answers & Get Feedback
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="pt-4">
            <Alert :variant="overallFeedback.variant">
              <AlertTitle class="font-bold">{{ overallFeedback.title }}</AlertTitle>
              <AlertDescription>
                {{ overallFeedback.message }} You scored {{ score }} out of {{ totalQuestions }}.
              </AlertDescription>
            </Alert>
            <div class="mt-4">
              <Label class="text-sm">Overall Progress</Label>
              <Progress :model-value="scorePercentage" class="w-full mt-1" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <Separator />
          <h3 class="text-lg font-semibold tracking-tight">Detailed Breakdown</h3>
          <div v-for="question in questions" :key="`result-${question.id}`">
            <div class="flex items-start gap-4">
              <div>
                <CheckCircle v-if="question.isCorrect" class="h-6 w-6 text-green-600" />
                <XCircle v-else class="h-6 w-6 text-red-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold">{{ question.prompt }}</p>
                <p class="text-sm" :class="[question.isCorrect ? 'text-green-700' : 'text-red-700']">
                  Your answer: <span class="font-mono p-1 rounded-md bg-muted">{{ question.userAnswer || 'No answer' }}</span>
                </p>
                <div v-if="!question.isCorrect" class="text-sm text-blue-700">
                  Correct answer(s): <span v-for="(ans, i) in question.correctAnswers" :key="i" class="font-mono p-1 rounded-md bg-blue-100">{{ ans }}<span v-if="i < question.correctAnswers.length - 1"> or </span></span>
                </div>
                <div class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div class="flex items-start gap-2">
                     <Info class="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                     <p class="text-sm text-yellow-800"><strong class="font-bold">Explanation:</strong> {{ question.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
            <Separator class="my-6" />
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
