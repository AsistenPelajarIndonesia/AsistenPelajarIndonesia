<!--
  File: @/pages/units/grammar/16.vue
  Unit: 16 - "I will" and "I'm going to"
  Description: An advanced grammar practice module for Nuxt 3. This page provides a deep dive 
  into the usage of 'will' and 'going to', featuring instructional content, a challenging quiz,
  and a detailed results validator with pedagogical explanations.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

// --- Component Imports ---
// Layout
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components (assuming a shadcn-vue setup)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// Icons
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = "Raymond Murphy's Grammar Practice"
const testDescription = "Intermediate English Grammar In Use"
const unitTitle = "Unit 16: I will and I'm going to"
const unitDescription = "Mastering the future: Differentiating between spontaneous decisions, plans, and predictions."
const categories = ['Future Tenses', 'Modals', 'Intentions', 'Predictions']

// --- Navigation ---
const router = useRouter()
const currentUnit = 16

function goToPreviousUnit() {
  router.push(`/units/grammar/${currentUnit - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Question & Answer Data Structure ---
interface Question {
  id: number
  text: string
  options: { value: string; label: string }[]
  correctAnswer: string
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    text: "A: 'The phone is ringing.' B: 'OK, I ________ answer it.'",
    options: [
      { value: 'will', label: 'will' },
      { value: 'am going to', label: 'am going to' }
    ],
    correctAnswer: 'will',
    explanation: "Correct. We use 'will' for spontaneous decisions, offers, and promises made at the moment of speaking. Here, person B decides to answer the phone right after hearing it ring."
  },
  {
    id: 2,
    text: "Look at those dark, heavy clouds in the sky! It ________ rain any minute now.",
    options: [
      { value: 'will', label: 'will' },
      { value: 'is going to', label: 'is going to' }
    ],
    correctAnswer: 'is going to',
    explanation: "Correct. We use 'be going to' for predictions based on present evidence that we can see or feel. The dark clouds are clear evidence that rain is imminent."
  },
  {
    id: 3,
    text: "A: 'Why did you buy all this paint and these brushes?' B: 'I ________ repaint my bedroom this weekend.'",
    options: [
      { value: 'will', label: 'will' },
      { value: 'am going to', label: 'am going to' }
    ],
    correctAnswer: 'am going to',
    explanation: "Correct. We use 'be going to' to talk about plans and intentions that were decided before the moment of speaking. Buying the paint shows a pre-existing plan."
  },
  {
    id: 4,
    text: "I'm sorry about what happened. I promise it ________ happen again.",
    options: [
      { value: 'won\'t', label: 'won\'t' },
      { value: 'isn\'t going to', label: 'isn\'t going to' }
    ],
    correctAnswer: 'won\'t',
    explanation: "Correct. 'Will' (and its negative form 'won\'t') is the standard structure for making promises."
  },
  {
    id: 5,
    text: "He's been studying for 12 hours a day for the past three months. He ________ pass his final exams.",
    options: [
      { value: 'will definitely', label: 'will definitely' },
      { value: 'is definitely going to', label: 'is definitely going to' }
    ],
    correctAnswer: 'is definitely going to',
    explanation: "Correct. While both can be used for predictions, 'is going to' is stronger here because the prediction is based on clear, present evidence (his intensive studying). It implies a near-certain outcome based on current actions."
  },
  {
    id: 6,
    text: "A: 'That suitcase looks incredibly heavy.' B: 'Don't worry, I ________ get it for you.'",
    options: [
      { value: 'will', label: 'will' },
      { value: 'am going to', label: 'am going to' }
    ],
    correctAnswer: 'will',
    explanation: "Correct. We use 'will' to offer help spontaneously at the moment of speaking."
  },
  {
    id: 7,
    text: "Experts believe that in the year 2050, technology ________ be even more integrated into our daily lives.",
    options: [
      { value: 'will', label: 'will' },
      { value: 'is going to', label: 'is going to' }
    ],
    correctAnswer: 'will',
    explanation: "Correct. For general predictions about the distant future, especially those based on opinion, belief, or general expectation (like 'I think...', 'Experts believe...'), we typically use 'will'."
  },
  {
    id: 8,
    text: "A: 'We're out of milk.' B: 'Oh, are we? In that case, I ________ pop to the shop and get some.'",
    options: [
      { value: 'will', label: 'will' },
      { value: 'am going to', label: 'am going to' }
    ],
    correctAnswer: 'will',
    explanation: "Correct. This is a classic example of a spontaneous decision. Person B was not planning to go to the shop; they decided to go only after learning there was no milk."
  },
  {
    id: 9,
    text: "I've tried to give my cat a pill, but she just ________ swallow it. She's so stubborn.",
    options: [
      { value: 'won\'t', label: 'won\'t' },
      { value: 'isn\'t going to', label: 'isn\'t going to' }
    ],
    correctAnswer: 'won\'t',
    explanation: "Correct. 'Won't' is often used to express refusal or a lack of willingness from someone (or something, like an animal or a machine). It's not just a future negative, but implies volition."
  },
  {
    id: 10,
    text: "A: 'What are your plans for your career after graduation?' B: 'I've already accepted a job offer. I ________ start working at a tech firm in July.'",
    options: [
      { value: 'will', label: 'will' },
      { value: 'am going to', label: 'am going to' }
    ],
    correctAnswer: 'am going to',
    explanation: "Correct. This is a firm plan or arrangement that has already been made. 'Am going to' is the correct choice to express this decided intention. Using the Present Continuous ('I'm starting...') would also be possible here for a fixed arrangement."
  }
])

// --- Reactive State Management ---
const userAnswers = reactive<Record<number, string>>({})
const isSubmitted = ref(false)
const showResult = ref(false)

const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.reduce((correctCount, question) => {
    return userAnswers[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

// --- Core Logic ---
function validateAnswers() {
  // Ensure every question has an answer before submitting
  if (Object.keys(userAnswers).length !== questions.value.length) {
    alert('Please answer all questions before submitting.')
    return
  }
  isSubmitted.value = true
  showResult.value = true
  
  // Scroll to results for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

function resetTest() {
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  isSubmitted.value = false
  showResult.value = false
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function isCorrect(question: Question): boolean {
  return userAnswers[question.id] === question.correctAnswer
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ========================= -->
    <!-- #material SLOT CONTENT  -->
    <!-- ========================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-muted/30">
          <CardTitle>Core Concepts: 'will' vs 'going to'</CardTitle>
          <CardDescription>Understanding the fundamental differences is key to mastering future tenses.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-sm">
          <div class="grid gap-4">
            <div>
              <h3 class="mb-2 text-base font-semibold text-primary">When to Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">will</code></h3>
              <ul class="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <strong>Spontaneous Decisions:</strong> For decisions made at the moment of speaking.
                  <br><em>Example: "I'm thirsty. I think I <strong>will</strong> buy a drink."</em>
                </li>
                <li>
                  <strong>Offers & Promises:</strong> To offer help or make a promise.
                  <br><em>Example: "That looks heavy. I'<strong>ll</strong> help you." / "I promise I <strong>won't</strong> tell anyone."</em>
                </li>
                <li>
                  <strong>General Predictions:</strong> For predictions based on opinion or belief, often with "I think", "I expect", "probably".
                  <br><em>Example: "I think it <strong>will</strong> be a difficult match."</em>
                </li>
                 <li>
                  <strong>Refusals:</strong> The negative form 'won't' can express refusal.
                  <br><em>Example: "The car <strong>won't</strong> start."</em>
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 class="mb-2 text-base font-semibold text-primary">When to Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">be going to</code></h3>
              <ul class="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <strong>Prior Plans & Intentions:</strong> For plans you decided on *before* the moment of speaking.
                  <br><em>Example: "I'<strong>m going to</strong> see a film tonight." (You had this plan already).</em>
                </li>
                <li>
                  <strong>Predictions with Evidence:</strong> When you can see, hear, or feel something now that makes the future event seem certain or likely.
                  <br><em>Example: "Look at the time! We'<strong>re going to</strong> be late."</em>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ========================= -->
    <!-- #practice SLOT CONTENT  -->
    <!-- ========================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the most natural-sounding option to complete each sentence.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers">
            <div class="space-y-8">
              <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
                <p class="font-medium">
                  {{ index + 1 }}. <span v-html="question.text.replace('________', '<span class=\'font-bold\'>________</span>')"></span>
                </p>
                <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted" class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div v-for="option in question.options" :key="option.value">
                    <RadioGroupItem :id="`q${question.id}-${option.value}`" :value="option.value" class="peer sr-only" />
                    <Label
                      :for="`q${question.id}-${option.value}`"
                      class="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      :class="{
                        'cursor-not-allowed opacity-70': isSubmitted,
                        'cursor-pointer': !isSubmitted
                      }"
                    >
                      {{ option.label }}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div class="flex justify-end gap-4">
                <Button v-if="isSubmitted" type="button" variant="outline" @click="resetTest">
                  Try Again
                </Button>
                <Button v-else type="submit">
                  Check My Answers
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ========================= -->
    <!-- #result SLOT CONTENT    -->
    <!-- ========================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-primary/50 shadow-lg">
          <CardHeader>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <Sparkles class="h-8 w-8 text-primary" />
                <div>
                  <CardTitle class="text-2xl">Your Results</CardTitle>
                  <CardDescription>Analysis of your performance on this unit.</CardDescription>
                </div>
              </div>
              <div class="text-right">
                 <p class="text-3xl font-bold tracking-tighter">{{ score }} / {{ questions.length }}</p>
                 <p class="text-sm text-muted-foreground">That's {{ scorePercentage.toFixed(0) }}% correct!</p>
              </div>
            </div>
             <Progress :model-value="scorePercentage" class="mt-4 h-2" />
          </CardHeader>
          <CardContent class="space-y-6 pt-2">
             <Separator />
            <div v-for="question in questions" :key="`result-${question.id}`" class="rounded-lg border p-4"
              :class="isCorrect(question) ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'">
              <div class="flex items-start gap-4">
                <div class="mt-1">
                  <CheckCircle2 v-if="isCorrect(question)" class="h-5 w-5 text-green-600 dark:text-green-500" />
                  <XCircle v-else class="h-5 w-5 text-red-600 dark:text-red-500" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold" v-html="question.text.replace('________', `<span class='font-bold underline decoration-dotted'>${question.correctAnswer}</span>`)"></p>
                  <p v-if="!isCorrect(question)" class="text-sm text-red-800 dark:text-red-400">
                    Your answer: <span class="font-semibold">{{ userAnswers[question.id] }}</span>
                  </p>
                   <div class="mt-3 flex items-start gap-3 rounded-md bg-background/50 p-3">
                      <AlertCircle class="h-4 w-4 flex-shrink-0 text-sky-600 dark:text-sky-400 mt-1" />
                      <p class="text-sm text-muted-foreground">
                        <span class="font-bold text-primary/80">Explanation: </span>{{ question.explanation }}
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
