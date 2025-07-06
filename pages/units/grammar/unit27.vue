<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports from UI Library (assuming shadcn-vue setup) ---
// These are necessary for rendering the UI elements within the slots.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, RefreshCw, Lightbulb } from 'lucide-vue-next'

// --- Page Configuration & Metadata ---
definePageMeta({
  layout: false, // We are directly using the layout component, so we disable the default layout.
})

// --- Navigation ---
const router = useRouter()
const currentUnit = 21

function goToPreviousUnit() {
  router.push(`/units/grammar/${currentUnit - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Reactive State Management ---
const showResult = ref(false)

interface Question {
  id: number
  type: 'fill-in-the-blank' | 'multiple-choice' | 'sentence-rewrite'
  prompt: string
  context?: string
  options?: { value: string; label: string }[]
  userAnswer: string
  correctAnswer: string | string[]
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    context: "You see someone stumble and fall after running a full marathon.",
    prompt: "She has been running for over four hours. She ______ be exhausted.",
    userAnswer: '',
    correctAnswer: 'must',
    explanation: "We use 'must' for strong positive logical deductions. The evidence (running a marathon) leads to the almost certain conclusion that she is exhausted. 'Can't' would imply it's impossible for her to be tired, which is illogical here."
  },
  {
    id: 2,
    type: 'multiple-choice',
    context: "Your friend, who is terrified of heights, is invited to go skydiving.",
    prompt: "He ______ want to go skydiving; he gets dizzy on a stepladder.",
    options: [
      { value: 'must', label: 'must' },
      { value: 'can\'t', label: 'can\'t' },
      { value: 'doesn\'t have to', label: 'doesn\'t have to' },
      { value: 'shouldn\'t', label: 'shouldn\'t' }
    ],
    userAnswer: '',
    correctAnswer: 'can\'t',
    explanation: "We use 'can't' for strong negative logical deductions. The evidence (fear of heights) makes the possibility of him wanting to skydive seem impossible. 'Doesn't have to' refers to a lack of obligation, and 'shouldn't' gives advice; neither fits the logical certainty implied here."
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    context: "The restaurant bill is $200. You know your friend only had a salad.",
    prompt: "That ______ be his bill. He only ordered a small salad and a water.",
    userAnswer: '',
    correctAnswer: 'can\'t',
    explanation: "This is a strong negative deduction. A bill of $200 for a small salad is logically impossible in a normal restaurant setting. Therefore, it 'can't' be his bill."
  },
  {
    id: 4,
    type: 'sentence-rewrite',
    context: "Rewrite the second sentence using 'must have' or 'can't have'.",
    prompt: "The ground is completely wet this morning. I am sure it rained last night.",
    userAnswer: '',
    correctAnswer: "It must have rained last night.",
    explanation: "For deductions about the past, we use 'must have + past participle'. The wet ground is the evidence for the deduction about the past event (rain). 'Can't have rained' would be the opposite and incorrect deduction."
  },
  {
    id: 5,
    type: 'multiple-choice',
    context: "A detective finds a plane ticket to Brazil in the suspect's trash, dated for yesterday.",
    prompt: "The suspect is still in the city. He ______ used the ticket.",
    options: [
      { value: 'must have', label: 'must have' },
      { value: 'can\'t have', label: 'can\'t have' },
      { value: 'didn\'t have to', label: 'didn\'t have to' },
      { value: 'should have', label: 'should have' }
    ],
    userAnswer: '',
    correctAnswer: 'can\'t have',
    explanation: "This is a past deduction. The evidence is that the suspect is still in the city. Therefore, it is logically impossible for him to have used a plane ticket to Brazil yesterday. We use 'can't have + past participle' for this strong negative deduction about the past. 'Didn't have to' implies no obligation, which is not the meaning here."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    context: "Your colleague is wearing a very expensive watch and driving a new sports car, but you know he has a low-paying job.",
    prompt: "He ______ be earning all that money from his job; he probably won the lottery.",
    userAnswer: '',
    correctAnswer: 'can\'t',
    explanation: "The evidence (low-paying job) contradicts the observation (expensive items). This creates a strong negative deduction: it's logically impossible for him to be affording these things from his salary. 'Can't' is the correct choice to express this impossibility."
  },
    {
    id: 7,
    type: 'multiple-choice',
    context: "Situation: The lights in your neighbours' house have been off for a week and their mailbox is overflowing.",
    prompt: "They ______ be on holiday.",
    options: [
      { value: 'can\'t', label: 'can\'t' },
      { value: 'must', label: 'must' },
      { value: 'have to', label: 'have to' },
      { value: 'don\'t have to', label: 'don\'t have to' }
    ],
    userAnswer: '',
    correctAnswer: 'must',
    explanation: "The combined evidence (lights off, full mailbox) strongly suggests they are away. 'Must' is used for this kind of strong, positive conclusion. 'Have to' expresses obligation (e.g., 'They have to leave for their flight'), which is a different meaning."
  },
  {
    id: 8,
    type: 'sentence-rewrite',
    context: "Rewrite the second sentence using 'must have' or 'can't have'.",
    prompt: "I can't find my keys anywhere. It's impossible that I left them at the office because I remember locking the door from the outside.",
    userAnswer: '',
    correctAnswer: "I can't have left them at the office.",
    explanation: "The speaker is making a strong negative deduction about a past action. The evidence is remembering locking the door from the outside. Therefore, leaving the keys inside is logically impossible. We use 'can't have + past participle' to express this past impossibility."
  },
])

// --- Computed Properties for Results ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(question.userAnswer.trim())
      : question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    return count + (isCorrect ? 1 : 0)
  }, 0)
})
const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Flawless! Your understanding of logical deductions is impeccable."
  if (percentage >= 80) return "Excellent work! You have a strong grasp of 'must' and 'can't'."
  if (percentage >= 60) return "Good job! Review the explanations for the ones you missed to solidify your knowledge."
  if (percentage >= 40) return "A solid attempt. Pay close attention to the difference between deduction and obligation."
  return "Keep practicing! The key is to look for the evidence in the sentence. Review the material and try again."
})

// --- Control Functions ---
function checkAnswers() {
  showResult.value = true
  // Scroll to results for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  showResult.value = false
  questions.value.forEach(q => q.userAnswer = '')
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Helper Functions ---
function isCorrect(question: Question): boolean {
  const userAnswer = question.userAnswer.trim().toLowerCase()
  const correctAnswer = question.correctAnswer
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.map(c => c.toLowerCase()).includes(userAnswer)
  }
  return userAnswer === correctAnswer.toLowerCase()
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series."
    unit-title="Unit 21: Must and Can't"
    unit-description="Mastering logical deductions for present and past situations."
    :categories="['Modals', 'Deduction', 'Certainty', 'B1/B2 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: The Learning Content                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Art of Deduction</CardTitle>
          <CardDescription>
            'Must' and 'can't' are not just about rules; they are tools for being a detective in everyday life. We use them to express how certain we are about something based on evidence.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div class="space-y-2">
            <h4 class="font-bold text-base">Rule 1: Certainty of Truth (must)</h4>
            <p><strong class="text-primary">'Must' + infinitive (without to)</strong> is used when you are almost 100% sure something is true because of the evidence you have.</p>
            <Alert variant="default">
              <Lightbulb class="h-4 w-4" />
              <AlertTitle>Example Scenario</AlertTitle>
              <AlertDescription class="mt-1">
                You hear beautiful piano music coming from your sister's room. She is a concert pianist.
                <br>
                <span class="font-semibold">Your thought:</span> "That <strong class="text-primary">must be</strong> my sister playing."
              </AlertDescription>
            </Alert>
          </div>
          <div class="space-y-2">
            <h4 class="font-bold text-base">Rule 2: Certainty of Falsity (can't)</h4>
            <p><strong class="text-destructive">'Can't' + infinitive (without to)</strong> is used when you are almost 100% sure something is impossible or not true because of the evidence.</p>
            <Alert variant="default">
              <Lightbulb class="h-4 w-4" />
              <AlertTitle>Example Scenario</AlertTitle>
              <AlertDescription class="mt-1">
                You see your colleague at the office. Someone calls and says he is in Paris.
                <br>
                <span class="font-semibold">Your thought:</span> "You <strong class="text-destructive">can't be</strong> in Paris. You're standing right here!"
              </AlertDescription>
            </Alert>
          </div>
          <div class="space-y-2">
            <h4 class="font-bold text-base">Common Confusion: Deduction vs. Obligation</h4>
            <p class="text-muted-foreground">Do not confuse 'must' (deduction) with 'have to' (obligation).</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong class="text-primary">Deduction:</strong> He is not answering his phone. He <strong class="text-primary">must be</strong> busy. (I am guessing he is busy).</li>
              <li><strong>Obligation:</strong> I <strong class="text-amber-600">have to</strong> finish this report by 5 PM. (It's a rule/necessity).</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-bold text-base">Deductions About the Past</h4>
            <p>To make deductions about a past event, the structure changes. This is a very common and important pattern.</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Positive Past Deduction:</strong> <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">must have + past participle</code>
                <br>
                <span class="text-muted-foreground">"The streets are wet. It <strong class="text-primary">must have rained</strong>."</span>
              </li>
              <li><strong>Negative Past Deduction:</strong> <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">can't have + past participle</code>
                <br>
                <span class="text-muted-foreground">"He passed the exam without studying. He <strong class="text-destructive">can't have found</strong> it very difficult."</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Questions                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Read each situation carefully. Use the evidence to make a logical deduction.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3 rounded-md border p-4">
            <p class="text-sm font-medium">
              Question {{ index + 1 }}
            </p>
            <p v-if="question.context" class="text-sm text-muted-foreground italic">
              Situation: {{ question.context }}
            </p>
            <div class="space-y-2">
              <Label :for="`q-${question.id}`">{{ question.prompt }}</Label>
              <!-- Fill-in-the-blank Input -->
              <Input
                v-if="question.type === 'fill-in-the-blank' || question.type === 'sentence-rewrite'"
                :id="`q-${question.id}`"
                v-model="question.userAnswer"
                :placeholder="question.type === 'sentence-rewrite' ? 'Rewrite the full sentence' : 'must / can\'t / etc.'"
                :disabled="showResult"
              />
              <!-- Multiple Choice Input -->
              <RadioGroup
                v-if="question.type === 'multiple-choice'"
                :id="`q-${question.id}`"
                v-model="question.userAnswer"
                :disabled="showResult"
                class="space-y-1"
              >
                <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q-${question.id}-${option.value}`" :value="option.value" />
                  <Label :for="`q-${question.id}-${option.value}`">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full" @click="checkAnswers">Check My Answers</Button>
          <Button v-else class="w-full" variant="secondary" @click="resetTest">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The Detailed Feedback                                        -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Results Analysis</CardTitle>
          <CardDescription>{{ feedbackMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="space-y-2">
            <div class="flex justify-between text-lg font-medium">
              <span>Your Score</span>
              <span>{{ score }} / {{ totalQuestions }}</span>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>
          <!-- Detailed Breakdown -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Breakdown</h3>
            <div v-for="question in questions" :key="`result-${question.id}`" class="rounded-lg border p-4 transition-all" :class="isCorrect(question) ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'">
              <div class="flex items-start justify-between">
                <p class="flex-1 text-sm font-medium pr-4">{{ question.prompt }}</p>
                <CheckCircle2 v-if="isCorrect(question)" class="h-5 w-5 flex-shrink-0 text-green-600" />
                <XCircle v-else class="h-5 w-5 flex-shrink-0 text-red-600" />
              </div>
              <div class="mt-2 text-sm">
                <p>Your answer: <span class="font-semibold" :class="isCorrect(question) ? 'text-green-800' : 'text-red-800'">{{ question.userAnswer || 'No answer' }}</span></p>
                <p v-if="!isCorrect(question)">Correct answer: <span class="font-semibold text-green-800">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer }}</span></p>
              </div>
              <Alert class="mt-4 bg-background/50">
                <Lightbulb class="h-4 w-4" />
                <AlertTitle class="font-bold">Explanation</AlertTitle>
                <AlertDescription class="text-sm">
                  {{ question.explanation }}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
         <CardFooter>
            <Button class="w-full" variant="secondary" @click="resetTest">
              <RefreshCw class="mr-2 h-4 w-4" />
              Take the Test Again
            </Button>
         </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
