
<!--
  File: @/pages/units/grammar/32.vue
  Unit: 32 - Adjectives: A nice new house; You look tired
  Description: An advanced practice module for English grammar, focusing on the complex rules of
  adjective order and the use of adjectives after linking verbs. This page is designed to challenge
  students, identify common errors, and provide detailed, instructive feedback to ensure
  measurable improvement in grammatical accuracy.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports from a UI Library like shadcn-vue ---
// These are assumed to be installed and configured in the project.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push('/units/grammar/31')
const goToNextUnit = () => router.push('/units/grammar/33')

// --- Reactive State Management ---
const isSubmitted = ref(false)

interface Question {
  id: number
  type: 'multiple-choice' | 'reorder' | 'fill-in'
  prompt: string
  instructions?: string
  options?: string[]
  userAnswer: string | null
  correctAnswer: string
  explanation: string
  category: 'Order' | 'Linking Verbs' | 'Mixed'
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    prompt: 'Which sentence uses the correct adjective order?',
    category: 'Order',
    options: [
      'She bought a fantastic new red Italian sports car.',
      'She bought an Italian fantastic red new sports car.',
      'She bought a fantastic red new sports Italian car.',
      'She bought a new sports fantastic Italian red car.',
    ],
    userAnswer: ref(null),
    correctAnswer: 'She bought a fantastic new red Italian sports car.',
    explanation: 'The correct order for adjectives is generally: Opinion (fantastic) -> Age (new) -> Color (red) -> Origin (Italian) -> Purpose (sports). This is often remembered by mnemonics like OSASCOMP (Opinion, Size, Age, Shape, Color, Origin, Material, Purpose). The correct option follows this sequence precisely.',
  },
  {
    id: 2,
    type: 'fill-in',
    prompt: "The chef's new dish tasted _____, but he remained _____ despite the compliments.",
    category: 'Linking Verbs',
    instructions: 'Fill in the blanks with the correct form of "delicious" and "humble".',
    userAnswer: ref(''),
    correctAnswer: 'delicious, humble',
    explanation: "'Tasted' and 'remained' are both linking verbs here. They connect the subject to an adjective that describes it. The dish tasted *delicious* (adjective describing the dish), not *deliciously* (adverb). The chef remained *humble* (adjective describing the chef), not *humbly* (adverb).",
  },
  {
    id: 3,
    type: 'reorder',
    prompt: 'Arrange the adjectives to correctly describe the object: a table (dining, old, beautiful, wooden, French, large).',
    category: 'Order',
    instructions: 'Type the full phrase "a ... table" with adjectives in the correct order.',
    userAnswer: ref(''),
    correctAnswer: 'a beautiful large old French wooden dining table',
    explanation: 'The established order is Opinion (beautiful) -> Size (large) -> Age (old) -> Origin (French) -> Material (wooden) -> Purpose (dining). Any other combination disrupts the natural flow and standard English syntax.',
  },
  {
    id: 4,
    type: 'multiple-choice',
    prompt: 'After the long hike, the path home seemed _____ and the air felt surprisingly _____.',
    category: 'Linking Verbs',
    options: [
      'endlessly, coolly',
      'endless, cool',
      'endless, coolly',
      'endlessly, cool',
    ],
    userAnswer: ref(null),
    correctAnswer: 'endless, cool',
    explanation: "'Seemed' and 'felt' are linking verbs in this context. They describe the state of the subject ('path' and 'air'). Therefore, they must be followed by adjectives ('endless', 'cool'), not adverbs ('endlessly', 'coolly'). An adverb would describe the action itself, which doesn't make sense here (e.g., *how* the air felt).",
  },
  {
    id: 5,
    type: 'fill-in',
    prompt: 'He uncovered a ____ ____ ____ ____ artifact. (stone, ancient, priceless, round)',
    category: 'Order',
    instructions: 'Place the adjectives in the correct order.',
    userAnswer: ref(''),
    correctAnswer: 'priceless ancient round stone',
    explanation: "Following the OSASCOMP model: Opinion (priceless - this is a value judgment) -> Age (ancient) -> Shape (round) -> Material (stone). This order is critical for creating a standard, understandable noun phrase.",
  },
  {
    id: 6,
    type: 'multiple-choice',
    prompt: "The defendant's story sounded _____ at first, but under cross-examination, it proved _____.",
    category: 'Mixed',
    options: [
      'plausibly, falsely',
      'plausible, false',
      'plausible, falsely',
      'plausibly, false',
    ],
    userAnswer: ref(null),
    correctAnswer: 'plausible, false',
    explanation: "'Sounded' and 'proved' are both used as linking verbs here, connecting the subject ('story') to a descriptive adjective. The story sounded *plausible* (adjective). It proved *false* (adjective). Using adverbs like 'plausibly' or 'falsely' would incorrectly modify the verbs of sounding and proving, rather than describing the subject.",
  },
  {
    id: 7,
    type: 'reorder',
    prompt: 'Rewrite the sentence with the adjectives in the correct order: The company launched a (Swiss, revolutionary, small, black, time-keeping) device.',
    category: 'Order',
    instructions: 'Type the full noun phrase starting with "a".',
    userAnswer: ref(''),
    correctAnswer: 'a revolutionary small black Swiss time-keeping device',
    explanation: "The correct sequence is: Opinion (revolutionary) -> Size (small) -> Color (black) -> Origin (Swiss) -> Purpose (time-keeping). 'Time-keeping' acts as a purpose adjective, defining what the device is for, and thus comes last before the noun.",
  },
])

// --- Computed Properties for Validation & Feedback ---
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    const userAnswer = typeof question.userAnswer === 'string' ? question.userAnswer.trim().toLowerCase() : ''
    const correctAnswer = question.correctAnswer.toLowerCase()
    return userAnswer === correctAnswer ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  const totalQuestions = questions.value.length
  return totalQuestions > 0 ? Math.round((score.value / totalQuestions) * 100) : 0
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Exceptional! You have a masterful command of these adjective rules."
  if (percentage >= 80) return "Excellent work! You have a strong understanding. Review the explanations for any missed questions."
  if (percentage >= 60) return "Good effort. You're on the right track, but there are some key areas to review. The explanations below are crucial."
  if (percentage >= 40) return "There are some significant gaps in understanding. Please study the material and the detailed explanations carefully."
  return "This unit requires more study. Go over the material again, analyze the explanations, and then try the exercise once more."
})

// --- Control Functions ---
const checkAnswers = () => {
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const resetQuiz = () => {
  isSubmitted.value = false
  questions.value.forEach(q => q.userAnswer = (q.type === 'multiple-choice' ? null : ''))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the book by Raymond Murphy"
    unit-title="Unit 32: Adjectives"
    unit-description="Mastering adjective order and the use of adjectives with linking verbs."
    :categories="['Adjectives', 'Syntax', 'Word Order', 'Linking Verbs']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Learning Material Slot                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> The Royal Order of Adjectives</CardTitle>
          <CardDescription>When multiple adjectives modify a noun, they follow a specific, unwritten order. Violating this order sounds unnatural to a native speaker.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">The conventional sequence is:</p>
          <ol class="list-decimal space-y-2 pl-6 font-mono text-sm">
            <li><strong>Opinion/Value:</strong> beautiful, ugly, amazing, priceless</li>
            <li><strong>Size:</strong> large, small, tiny, huge</li>
            <li><strong>Age/Temperature:</strong> old, new, ancient, hot</li>
            <li><strong>Shape:</strong> round, square, long</li>
            <li><strong>Color:</strong> red, blue, dark, black</li>
            <li><strong>Origin:</strong> Italian, French, lunar</li>
            <li><strong>Material:</strong> wooden, stone, silk, plastic</li>
            <li><strong>Purpose:</strong> dining (table), sports (car), time-keeping (device)</li>
          </ol>
          <Alert variant="destructive">
             <AlertTitle>Example Breakdown</AlertTitle>
             <AlertDescription>
               <span class="font-bold">"a <span class="text-green-600">gorgeous</span> <span class="text-blue-600">old</span> <span class="text-purple-600">Italian</span> <span class="text-orange-600">silk</span> tie"</span><br/>
               (Opinion -> Age -> Origin -> Material)
             </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> Adjectives After Linking Verbs</CardTitle>
          <CardDescription>Some verbs connect a subject to an adjective that describes it, rather than describing an action.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>These verbs, known as <strong>linking verbs</strong>, function like an equals sign (=). The adjective that follows describes the subject.</p>
          <p class="font-semibold">Common Linking Verbs:</p>
          <p class="text-sm text-muted-foreground">be, seem, appear, look, feel, taste, smell, sound, become, get, grow, remain, prove, turn</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Alert>
              <AlertTitle>Correct (Adjective)</AlertTitle>
              <AlertDescription>
                <p>You look <strong class="text-green-600">tired</strong>.</p>
                <p class="text-xs italic">(Tired describes 'You')</p>
                <p>The soup tastes <strong class="text-green-600">wonderful</strong>.</p>
                <p class="text-xs italic">(Wonderful describes 'The soup')</p>
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Incorrect (Adverb)</AlertTitle>
              <AlertDescription>
                <p>You look <s class="text-red-600">tiredly</s>.</p>
                <p class="text-xs italic">(This would mean the action of looking was tired)</p>
                <p>The soup tastes <s class="text-red-600">wonderfully</s>.</p>
                 <p class="text-xs italic">(This would mean the soup has a mouth and is good at tasting)</p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Choose or type the best answer for each question.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <div class="flex items-start gap-3">
              <p class="font-bold">{{ index + 1 }}.</p>
              <div class="flex-1">
                <p class="font-semibold leading-snug" v-html="question.prompt"></p>
                <p v-if="question.instructions" class="text-sm text-muted-foreground italic">{{ question.instructions }}</p>
              </div>
              <div v-if="isSubmitted" class="ml-auto">
                <CheckCircle2 v-if="question.userAnswer?.trim().toLowerCase() === question.correctAnswer.toLowerCase()" class="h-6 w-6 text-green-500" />
                <XCircle v-else class="h-6 w-6 text-red-500" />
              </div>
            </div>
            
            <!-- Multiple Choice -->
            <div v-if="question.type === 'multiple-choice'" class="pl-7">
              <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="leading-snug">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Fill-in / Reorder -->
            <div v-if="question.type === 'fill-in' || question.type === 'reorder'" class="pl-7">
              <Input v-model="question.userAnswer" type="text" :disabled="isSubmitted" placeholder="Your answer..." />
            </div>

             <!-- Post-Submission Feedback per question -->
            <div v-if="isSubmitted && question.userAnswer?.trim().toLowerCase() !== question.correctAnswer.toLowerCase()" class="pl-7">
                <Alert variant="destructive" class="mt-2">
                    <AlertTitle class="font-semibold">Correct Answer</AlertTitle>
                    <AlertDescription class="font-mono text-sm">{{ question.correctAnswer }}</AlertDescription>
                </Alert>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" class="w-full" @click="checkAnswers">Submit Answers</Button>
          <p v-else class="text-sm text-muted-foreground text-center w-full">Scroll down to see your detailed results and explanations.</p>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Results and Explanations Slot                                           -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>{{ feedbackMessage }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
             <div class="flex items-center gap-4">
                <span class="font-bold text-2xl">{{ score }} / {{ questions.length }}</span>
                <Progress :model-value="scorePercentage" class="w-full" />
                <span class="font-bold text-2xl">{{ scorePercentage }}%</span>
             </div>
          </CardContent>
       </Card>

       <Card>
          <CardHeader>
            <CardTitle>Detailed Explanations</CardTitle>
            <CardDescription>Reviewing why an answer is correct is the best way to learn. Analyze each explanation below.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="question in questions" :key="`explanation-${question.id}`" class="rounded-lg border bg-card p-4">
              <p class="font-bold mb-2">{{ question.id }}. {{ question.prompt }}</p>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                    <span class="font-semibold w-28">Your Answer:</span>
                    <span 
                      :class="[question.userAnswer?.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? 'text-green-600' : 'text-red-600', 'font-mono']"
                    >
                      {{ question.userAnswer || 'No answer' }}
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-semibold w-28">Correct Answer:</span>
                    <span class="font-mono text-blue-600">{{ question.correctAnswer }}</span>
                </div>
                <Alert class="mt-3">
                  <AlertTitle class="font-bold flex items-center gap-2">
                    <BrainCircuit class="h-4 w-4" /> Explanation
                  </AlertTitle>
                  <AlertDescription>
                    {{ question.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full" variant="outline" @click="resetQuiz">Try Again</Button>
          </CardFooter>
       </Card>
    </template>
  </GrammarLayout>
</template>
