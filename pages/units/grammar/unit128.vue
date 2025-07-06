<!--
  File: @/pages/units/grammar/21.vue
  Unit: 21 - Noun + preposition (reason for, cause of etc.)
  Description: An advanced practice module based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth learning material, challenging exercises, and a robust
  validation system with detailed explanations to ensure students' grammar improves.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a UI library like shadcn-vue
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: "Advanced Grammar In Use Practice",
  testDescription: "Inspired by the methodologies of Raymond Murphy",
  unitTitle: "Unit 21: Noun + Preposition Collocations",
  unitDescription: "Master the subtle art of noun and preposition pairings. This unit focuses on common collocations that express relationships of reason, cause, connection, attitude, and more.",
  categories: ['Prepositions', 'Nouns', 'Collocations', 'Advanced', 'CEFR B2-C1'],
}

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/20")
const goToNextUnit = () => router.push("/units/grammar/22")

// --- Question & Answer State ---
interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const questions = ref([
  {
    id: 1,
    text: "The government's sudden increase ______ taxes was met with widespread public protest.",
    options: ['in', 'on', 'of', 'to'],
    correctAnswer: 'in',
    explanation: "We use 'an increase in' to talk about the quantity or number of something that has risen. 'On' is incorrect, although we say 'put a tax on something'. 'Of' might seem plausible but is not the standard collocation for 'increase'."
  },
  {
    id: 2,
    text: "Her complete lack ______ awareness for the feelings of others makes her difficult to work with.",
    options: ['of', 'for', 'in', 'with'],
    correctAnswer: 'of',
    explanation: "'Lack of' is a fixed collocation meaning that something is missing or does not exist. While one might have 'awareness for' a cause, the 'lack' itself is 'of' the awareness."
  },
  {
    id: 3,
    text: "Is there any real alternative ______ the current system? We've debated this for hours.",
    options: ['for', 'against', 'to', 'of'],
    correctAnswer: 'to',
    explanation: "When 'alternative' is a noun meaning a different choice or possibility, it is followed by 'to'. 'Alternative for' is a common mistake. Think of it as 'a different option *to* this one'."
  },
  {
    id: 4,
    text: "The primary cause ______ the building's collapse was a fundamental design flaw, not the earthquake.",
    options: ['for', 'of', 'behind', 'from'],
    correctAnswer: 'of',
    explanation: "'The cause of' is used to identify the agent or event that produces an effect. 'The reason for' explains why an action was taken. Here, we are identifying the direct agent of the collapse, making 'cause of' the precise choice."
  },
  {
    id: 5,
    text: "I have a very different attitude ______ politics than my parents do.",
    options: ['on', 'about', 'for', 'towards'],
    correctAnswer: 'towards',
    explanation: "'Attitude towards' (or 'to') is the correct collocation to express one's disposition or feeling in relation to a subject. 'Attitude about' is common in informal speech but 'towards' is more standard and precise in formal writing."
  },
  {
    id: 6,
    text: "His demand ______ a higher salary was rejected by the board of directors.",
    options: ['of', 'for', 'to', 'on'],
    correctAnswer: 'for',
    explanation: "We make a 'demand for' something we want or feel we are entitled to. You might 'demand something of someone', but the thing being demanded is preceded by 'for'."
  },
  {
    id: 7,
    text: "The police found no connection ______ the two crimes, despite their superficial similarities.",
    options: ['with', 'among', 'between', 'to'],
    correctAnswer: 'between',
    explanation: "'Connection between' is used to link two distinct things. 'Connection with' is also correct but is often used to show a relationship or association with a person or group ('his connection with the mafia'). 'Between' is more appropriate for linking two specific items like crimes."
  },
  {
    id: 8,
    text: "Her impressive answer ______ the journalist's difficult question showcased her expertise.",
    options: ['for', 'of', 'to', 'about'],
    correctAnswer: 'to',
    explanation: "The collocation is 'an answer to a question'. Similarly, we have 'a solution to a problem' or 'a key to a door'. 'For' and 'of' are incorrect in this context."
  }
])

const userAnswers = reactive<Record<number, string>>({})
const submitted = ref(false)
const showResult = ref(false)

// --- Computed Properties for Scoring and Progress ---
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    return userAnswers[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const allQuestionsAnswered = computed(() => {
  return Object.keys(userAnswers).length === questions.value.length
})

// --- Control Functions ---
function checkAnswers() {
  if (!allQuestionsAnswered.value) {
    // In a real app, you might show a toast or alert here.
    console.warn("Please answer all questions before submitting.")
    return
  }
  submitted.value = true
  showResult.value = true
}

function isCorrect(question: Question): boolean {
  return userAnswers[question.id] === question.correctAnswer
}

function getSelectionStatus(question: Question, option: string) {
  if (!submitted.value) return 'unanswered'
  const isSelectedAnswer = userAnswers[question.id] === option
  const isCorrectAnswer = question.correctAnswer === option

  if (isCorrectAnswer) return 'correct'
  if (isSelectedAnswer && !isCorrectAnswer) return 'incorrect'
  return 'not-selected'
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
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Teacher's Notes: Noun + Preposition</CardTitle>
          <CardDescription>
            Understanding collocations is key to fluency. A noun often has a "partner" preposition. Using the wrong one is a common mistake, even for advanced learners. This unit focuses on these essential pairs.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6 text-sm">
          <div>
            <h4 class="mb-2 font-semibold text-base">Reason & Cause</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Reason for (+ noun / -ing):</strong> Explains the motive behind an action.
                <br><em class="text-muted-foreground">Example: The main <span class="text-primary font-medium">reason for</span> his success was his dedication.</em>
              </li>
              <li><strong>Cause of:</strong> Identifies what makes something happen (often something negative).
                <br><em class="text-muted-foreground">Example: Investigators are still searching for the <span class="text-primary font-medium">cause of</span> the fire.</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-semibold text-base">Connection & Relationship</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Connection / Relationship / Contact between X and Y:</strong> Links two specific entities.
                <br><em class="text-muted-foreground">Example: Scientists studied the <span class="text-primary font-medium">connection between</span> diet and disease.</em>
              </li>
              <li><strong>Connection / Relationship / Contact with:</strong> Links a person/thing to another group or individual.
                <br><em class="text-muted-foreground">Example: He has a good <span class="text-primary font-medium">relationship with</span> his colleagues.</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-semibold text-base">Attitude & Reaction</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Attitude towards / to:</strong> Describes your general feeling or disposition.
                <br><em class="text-muted-foreground">Example: His <span class="text-primary font-medium">attitude towards</span> his work is very positive.</em>
              </li>
               <li><strong>Reaction to:</strong> Describes your response to a specific event or stimulus.
                <br><em class="text-muted-foreground">Example: What was her <span class="text-primary font-medium">reaction to</span> the news?</em>
              </li>
            </ul>
          </div>
           <div>
            <h4 class="mb-2 font-semibold text-base">Common Pairs to Memorise</h4>
            <ul class="list-disc space-y-1 pl-5">
               <li><strong>an answer/a reply/a solution <span class="text-primary font-medium">to</span></strong></li>
               <li><strong>a demand/a need/a reason <span class="text-primary font-medium">for</span></strong></li>
               <li><strong>an increase/a decrease/a rise/a fall <span class="text-primary font-medium">in</span></strong> (a quantity)</li>
               <li><strong>an advantage/a disadvantage <span class="text-primary font-medium">of</span></strong> (+ -ing)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the correct preposition to complete each sentence.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-8">
          <div v-for="(question, index) in questions" :key="question.id" class="relative">
            <fieldset :disabled="submitted">
              <legend class="mb-2 font-medium">
                Question {{ index + 1 }}
                <p class="font-normal text-lg text-foreground">{{ question.text }}</p>
              </legend>
              <RadioGroup v-model="userAnswers[question.id]" class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div v-for="option in question.options" :key="option">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" class="peer sr-only" />
                  <Label 
                    :for="`${question.id}-${option}`"
                    class="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:border-primary"
                  >
                    {{ option }}
                  </Label>
                </div>
              </RadioGroup>
            </fieldset>
            <div v-if="submitted" class="absolute right-0 top-0">
               <CheckCircle2 v-if="isCorrect(question)" class="h-6 w-6 text-green-600" />
               <XCircle v-else class="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" :disabled="!allQuestionsAnswered || submitted" @click="checkAnswers">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results & Detailed Feedback</CardTitle>
          <CardDescription>Review the explanations to understand the nuances of each choice.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="rounded-lg border bg-card p-4 text-card-foreground">
            <div class="flex items-center justify-between">
              <p class="text-lg font-bold">Total Score:</p>
              <p class="text-2xl font-bold" :class="scorePercentage > 70 ? 'text-green-600' : 'text-amber-600'">
                {{ score }} / {{ questions.length }}
              </p>
            </div>
            <Progress :model-value="scorePercentage" class="mt-2" />
            <p class="mt-1 text-right text-sm text-muted-foreground">{{ scorePercentage.toFixed(0) }}% Correct</p>
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-6">
            <div v-for="question in questions" :key="question.id" class="rounded-lg border p-4" :class="isCorrect(question) ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'">
              <p class="mb-2 font-medium">{{ question.text.replace('______', `_`) }}</p>
              <div class="space-y-2 text-sm">
                <p>Your answer: 
                  <span class="font-semibold" :class="isCorrect(question) ? 'text-green-700' : 'text-red-700'">
                    {{ userAnswers[question.id] }}
                  </span>
                  <CheckCircle2 v-if="isCorrect(question)" class="ml-1 inline h-4 w-4 text-green-700" />
                  <XCircle v-else class="ml-1 inline h-4 w-4 text-red-700" />
                </p>
                <p v-if="!isCorrect(question)">Correct answer: <span class="font-semibold text-green-700">{{ question.correctAnswer }}</span></p>
                <div class="mt-2 flex items-start gap-2 rounded-md bg-muted p-3">
                  <HelpCircle class="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                  <p class="text-muted-foreground">
                    <strong class="text-sky-800">Explanation:</strong> {{ question.explanation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>
