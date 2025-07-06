<!--
  File: @/pages/units/grammar/6.vue
  Description: An advanced grammar practice page for Unit 6: "In case".
  This page leverages the GrammarLayout to provide a comprehensive learning experience,
  including detailed explanations, challenging exercises, and a sophisticated validation system
  with personalized feedback, inspired by the pedagogical methods of renowned grammarians.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-vue-next'
import { Progress } from '@/components/ui/progress'

definePageMeta({
  layout: false, 
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/5")
}
function goToNextUnit() {
  router.push("/units/grammar/7")
}

const showResult = ref(false)

type QuestionType = 'mcq' | 'fill-in'

interface Question {
  id: number
  type: QuestionType
  questionText: string
  prompt: string
  options?: string[]
  userAnswer: string
  correctAnswer: string | string[]
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'mcq',
    questionText: "The flight might be delayed, so I'm going to take a book with me.",
    prompt: "Which sentence correctly rephrases the meaning above using 'in case' or 'if'?",
    options: [
      "I'll take a book if the flight is delayed.",
      "I'll take a book in case the flight is delayed.",
      "I'll take a book when the flight is delayed."
    ],
    userAnswer: '',
    correctAnswer: "I'll take a book in case the flight is delayed.",
    explanation: "Correct. 'In case' is used to talk about a precaution—an action you take *beforehand* because something *might* happen later. You take the book now as a preparation for a possible delay. Using 'if' would mean you would only grab the book at the moment you discover the flight is delayed, which doesn't match the original sentence's meaning."
  },
  {
    id: 2,
    type: 'fill-in',
    questionText: "You should write down the address ____ you forget it.",
    prompt: "Complete the sentence with the most appropriate word or phrase ('if', 'in case', 'in case of').",
    userAnswer: '',
    correctAnswer: 'in case',
    explanation: "Correct. The action is 'write down the address' and it's a precaution. The reason for this precaution is the possibility that 'you forget it' later. 'If you forget it' would imply a consequence, not a prior preventative measure. 'In case of' must be followed by a noun (e.g., 'in case of emergency'), not a clause (subject + verb)."
  },
  {
    id: 3,
    type: 'mcq',
    questionText: "____ fire, leave the building by the nearest emergency exit.",
    prompt: "Choose the correct option for this official instruction.",
    options: [
      "In case",
      "If",
      "In case of"
    ],
    userAnswer: '',
    correctAnswer: "In case of",
    explanation: "Correct. 'In case of' is a formal prepositional phrase followed by a noun ('fire'). It's commonly used in official notices and instructions to state what to do when a specific situation occurs. 'In case' must be followed by a clause (e.g., 'in case there is a fire')."
  },
  {
    id: 4,
    type: 'fill-in',
    questionText: "I didn't think I would need to send any emails, but I took my laptop with me on holiday ____ I changed my mind.",
    prompt: "Complete the sentence. This sentence is about a past situation.",
    userAnswer: '',
    correctAnswer: 'in case',
    explanation: "Correct. 'In case' is used here to explain the reason for a past action ('I took my laptop'). The reason was a future possibility from that past perspective ('I changed my mind'). Notice the tense pattern: main clause in the past ('took'), and the 'in case' clause also in the past ('changed')."
  },
  {
    id: 5,
    type: 'mcq',
    questionText: "She'll be very disappointed ____ you don't come to the party.",
    prompt: "This sentence describes a direct consequence, not a precaution. Choose the correct word.",
    options: [
      "in case",
      "if",
      "in case of"
    ],
    userAnswer: '',
    correctAnswer: "if",
    explanation: "Correct. This is a classic conditional sentence. The disappointment is a direct result or consequence of the condition 'you don't come'. We use 'if' for conditions and consequences. Using 'in case' would incorrectly imply she is already disappointed as a precaution for the possibility of you not coming."
  },
  {
    id: 6,
    type: 'fill-in',
    questionText: "We have installed a comprehensive security system with backup power ____ there is a power outage.",
    prompt: "Complete the sentence with the most precise phrase.",
    userAnswer: '',
    correctAnswer: ['in case', 'in the event that'],
    explanation: "Correct. 'In case' is the most common and fitting answer, indicating the security system is a precaution against a potential power outage. 'In the event that' is a more formal but equally correct alternative, serving the same function. The key is recognizing the precautionary nature of the main clause."
  }
])

const score = computed(() => {
  if (!showResult.value) return 0
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (!questions.value.length) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

const scoreRemark = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect Score! You have an excellent grasp of this concept."
  if (percentage >= 75) return "Great job! You have a solid understanding."
  if (percentage >= 50) return "Good effort. Review the explanations to solidify your knowledge."
  return "Keep practicing. Pay close attention to the feedback for each question."
})

const checkAnswers = () => {
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase()
    if (Array.isArray(q.correctAnswer)) {
      q.isCorrect = q.correctAnswer.includes(userAnswerCleaned)
    } else {
      q.isCorrect = userAnswerCleaned === q.correctAnswer.toLowerCase()
    }
  })
  showResult.value = true
}

const tryAgain = () => {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    delete q.isCorrect
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="Exercises based on the methodology of Raymond Murphy's renowned series."
    unit-title="Unit 6: In case"
    unit-description="Understanding and using 'in case' for precautions versus 'if' for conditions."
    :categories="['Conditionals', 'Conjunctions', 'Precautionary Language']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center gap-3">
            <Lightbulb class="h-6 w-6 text-yellow-500" />
            <CardTitle>Core Concept: The Language of Precaution</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="p-6 text-base">
          <p class="mb-4">
            The phrase <code class="font-mono bg-muted px-1.5 py-0.5 rounded">'in case'</code> is used to express a precaution. You do something (Action A) now, because of a future possibility (Situation B). The action is a preparation or a safeguard.
          </p>
          <p class="font-semibold">Formula: I will do A <span class="text-primary font-bold">in case</span> B happens.</p>
          <ul class="mt-4 list-disc pl-6 space-y-2">
            <li>
              <span class="font-semibold">Example:</span> I'll take an umbrella <strong class="text-primary">in case</strong> it rains.
            </li>
            <li>
              <span class="font-semibold">Meaning:</span> I am taking the umbrella now because it might rain later. Taking the umbrella is my precaution.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader class="bg-red-50 dark:bg-red-900/20">
          <div class="flex items-center gap-3">
            <AlertTriangle class="h-6 w-6 text-red-500" />
            <CardTitle>Crucial Distinction: 'in case' vs. 'if'</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <h4 class="font-bold text-lg mb-2">'in case' (Precaution)</h4>
            <p class="mb-3 text-muted-foreground">The action in the main clause happens <strong class="text-foreground">before</strong> the action in the 'in case' clause.</p>
            <p class="border-l-4 border-primary pl-4 py-2 bg-muted rounded-r-md">
              I wrote down her address <strong class="text-primary">in case</strong> I forgot it.
              <br>
              <em class="text-sm">(First I wrote it, then later I might forget.)</em>
            </p>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-2">'if' (Condition)</h4>
            <p class="mb-3 text-muted-foreground">The action in the main clause happens <strong class="text-foreground">only if/when</strong> the condition in the 'if' clause is met.</p>
            <p class="border-l-4 border-blue-500 pl-4 py-2 bg-muted rounded-r-md">
              I will be sad <strong class="text-blue-500">if</strong> you leave.
              <br>
              <em class="text-sm">(First you leave, then I become sad. The sadness is a direct result.)</em>
            </p>
          </div>
        </CardContent>
        <CardFooter class="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-4">
          A common mistake is using 'if' when a precaution is intended. Always ask: Is this action a preparation for a future possibility? If yes, use 'in case'.
        </CardFooter>
      </Card>

      <Card class="overflow-hidden">
        <CardHeader class="bg-gray-50 dark:bg-gray-800/50">
          <CardTitle>Structural Note: 'in case' vs. 'in case of'</CardTitle>
          <CardDescription>The grammar that follows each phrase is different.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-base">
          <p class="mb-2"><strong class="text-primary">'In case'</strong> is followed by a <strong class="text-primary">clause</strong> (a subject + verb).</p>
          <p class="ml-4 mb-4 p-2 bg-muted rounded">Example: You can call me <strong class="text-primary">in case you need</strong> help.</p>
          
          <p class="mb-2"><strong class="text-blue-500">'In case of'</strong> is followed by a <strong class="text-blue-500">noun</strong>.</p>
          <p class="ml-4 p-2 bg-muted rounded">Example: <strong class="text-blue-500">In case of emergency</strong>, dial 112.</p>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card v-if="!showResult">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Apply your knowledge. Choose or type the best answer for each scenario.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
             <div class="space-y-3">
              <p class="font-semibold text-base">
                <span class="text-primary font-bold mr-2">{{ index + 1 }}.</span>
                {{ question.questionText }}
              </p>
              <p class="text-sm text-muted-foreground pl-6">{{ question.prompt }}</p>

              <div v-if="question.type === 'mcq'" class="pl-6 pt-2">
                <RadioGroup v-model="question.userAnswer">
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2 mb-2">
                    <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                    <Label :for="`${question.id}-${option}`" class="text-base font-normal">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div v-if="question.type === 'fill-in'" class="pl-6 pt-2">
                 <Input 
                   v-model="question.userAnswer" 
                   type="text" 
                   placeholder="Type your answer..."
                   class="max-w-sm"
                  />
              </div>
            </div>
            <Separator v-if="index < questions.length - 1" class="mt-8"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" class="w-full">Check Answers & Get Feedback</Button>
        </CardFooter>
      </Card>
      <div v-else class="text-center p-6 bg-background rounded-lg border">
        <h3 class="text-2xl font-bold">Practice Complete</h3>
        <p>You can now review your results below or try again.</p>
        <Button @click="tryAgain" variant="outline" class="mt-4">Try Again</Button>
      </div>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results & Detailed Feedback</CardTitle>
          <CardDescription>{{ scoreRemark }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-primary">Score</span>
                <span class="text-sm font-medium text-primary">{{ score }} / {{ questions.length }}</span>
              </div>
              <Progress :model-value="scorePercentage" />
            </div>
            <div class="text-4xl font-bold text-right" :class="{'text-green-600': scorePercentage > 75, 'text-yellow-600': scorePercentage >= 50, 'text-red-600': scorePercentage < 50}">
              {{ scorePercentage }}%
            </div>
          </div>

          <Separator class="my-6" />

          <div class="space-y-6">
            <div v-for="question in questions" :key="question.id" class="p-4 rounded-lg border" :class="question.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'">
              <div class="flex items-start gap-4">
                <div class="mt-1">
                  <CheckCircle v-if="question.isCorrect" class="h-6 w-6 text-green-600 dark:text-green-500" />
                  <XCircle v-else class="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold">{{ question.questionText }}</p>
                  <div class="mt-2 text-sm">
                    <p>Your answer: <span class="font-mono p-1 rounded bg-background/50" :class="question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400 line-through'">{{ question.userAnswer || 'No answer' }}</span></p>
                    <p v-if="!question.isCorrect">Correct answer: <span class="font-mono p-1 rounded bg-background/50 text-green-700 dark:text-green-400">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer }}</span></p>
                  </div>
                  <div class="mt-4 p-4 rounded-md bg-background/60">
                    <p class="font-semibold text-sm mb-2 flex items-center gap-2"><Lightbulb class="h-4 w-4 text-yellow-500" />Teacher's Explanation:</p>
                    <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="tryAgain" class="w-full" variant="secondary">Reset and Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
