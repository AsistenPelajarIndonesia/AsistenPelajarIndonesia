<!--
  File: @/pages/units/grammar/35.vue
  Unit: 35 - So and Such
  Description: An advanced practice module on the usage of 'so' and 'such' to express
  cause and effect, and degree. This page integrates learning materials, challenging
  exercises, and a detailed feedback system within the GrammarLayout.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

// --- Component Imports ---
// We import the main layout and the UI components needed for this specific unit.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// --- Page & Unit Metadata ---
// This information is passed as props to the GrammarLayout component.
const testTitle = "Intermediate English Grammar Practice"
const testDescription = "Based on 'English Grammar in Use' by Raymond Murphy"
const unitTitle = "Unit 35: So and Such"
const unitDescription = "Learn to use 'so' and 'such' to emphasize adjectives, adverbs, and nouns, and to show a result or consequence."
const categories = ['Adjectives and Adverbs', 'Degree', 'Clauses of Result']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Assuming unit 34 is the previous logical unit
  router.push("/units/grammar/34")
}
function goToNextUnit() {
  // Assuming unit 36 is the next logical unit
  router.push("/units/grammar/36")
}

// --- Reactive State Management ---
// Interface for our question structure to ensure type safety.
interface PracticeQuestion {
  id: number
  question: string
  options: string[]
  userAnswer: string | null
  correctAnswer: string
  explanation: string
  isCorrect?: boolean
}

// A reactive reference to hold the state of our practice questions.
const practiceQuestions = ref<PracticeQuestion[]>([
  {
    id: 1,
    question: "The problem was ____ complicated that none of the engineers could solve it.",
    options: ['so', 'such', 'so a', 'such a'],
    userAnswer: null,
    correctAnswer: 'so',
    explanation: "We use 'so' before an adjective ('complicated') when it is not followed by a noun. The structure is 'so + adjective + that-clause'."
  },
  {
    id: 2,
    question: "She is ____ a diligent student that she has won multiple scholarships.",
    options: ['so', 'such', 'so a', 'such a'],
    userAnswer: null,
    correctAnswer: 'such a',
    explanation: "We use 'such a' before an adjective + singular countable noun ('diligent student'). The structure is 'such + a/an + adjective + noun'."
  },
  {
    id: 3,
    question: "I had never seen ____ beautiful scenery before I visited the national park.",
    options: ['so', 'such', 'so much', 'such a'],
    userAnswer: null,
    correctAnswer: 'such',
    explanation: "'Scenery' is an uncountable noun. We use 'such' before an adjective + uncountable noun ('beautiful scenery'). We do not use 'a/an'."
  },
  {
    id: 4,
    question: "He spoke ____ quickly that I had trouble understanding his main points.",
    options: ['so', 'such', 'very', 'such a'],
    userAnswer: null,
    correctAnswer: 'so',
    explanation: "We use 'so' before an adverb ('quickly') to add emphasis and introduce a result with 'that'. The structure is 'so + adverb + that-clause'."
  },
  {
    id: 5,
    question: "It was ____ pity you couldn't come to the party; everyone missed you.",
    options: ['so', 'such', 'so a', 'such a'],
    userAnswer: null,
    correctAnswer: 'such a',
    explanation: "This is a common fixed expression. We say 'it's such a pity' or 'what a pity'. 'Pity' here is treated as a singular countable noun."
  },
  {
    id: 6,
    question: "Why did you spend ____ money on a single jacket? It's beautiful, but very expensive.",
    options: ['so', 'such', 'so much', 'such a lot'],
    userAnswer: null,
    correctAnswer: 'so much',
    explanation: "'Money' is an uncountable noun. To emphasize the quantity, we use 'so much' with uncountable nouns and 'so many' with plural countable nouns. 'Such' would require a different structure, like 'such a lot of money'."
  },
  {
    id: 7,
    question: "They have ____ a lot of work to do that they'll be staying late tonight.",
    options: ['so', 'such', 'so many', 'much'],
    userAnswer: null,
    correctAnswer: 'such',
    explanation: "The phrase is 'a lot of work'. We use 'such' before this entire noun phrase. The structure is 'such + a lot of + noun'. 'So a lot of' is incorrect."
  },
  {
    id: 8,
    question: "I was surprised to see ____ people at the concert; I didn't realize the band was that popular.",
    options: ['so much', 'so', 'such many', 'so many'],
    userAnswer: null,
    correctAnswer: 'so many',
    explanation: "'People' is a plural countable noun. We use 'so many' to emphasize the quantity of plural countable nouns. 'Such many' is grammatically incorrect."
  },
  {
    id: 9,
    question: "The movie's plot was ____ convoluted; I'm not surprised it received poor reviews.",
    options: ['so', 'such', 'such a', 'so a'],
    userAnswer: null,
    correctAnswer: 'so',
    explanation: "Here, 'so' is used for emphasis to mean 'very'. It modifies the adjective 'convoluted'. While a 'that' clause could follow, it's not required. 'Such' would need a noun (e.g., 'such a convoluted plot')."
  },
  {
    id: 10,
    question: "Don't be in ____ a hurry; we have plenty of time before the train leaves.",
    options: ['so', 'such', 'so much', 'many'],
    userAnswer: null,
    correctAnswer: 'such',
    explanation: "This is another common expression: 'to be in a hurry'. To add emphasis, we modify the noun phrase 'a hurry' with 'such'. The structure is 'in such a hurry'."
  }
])

// --- State for Results ---
const showResult = ref(false)
const score = ref(0)
const motivationalMessage = ref('')

// --- Computed Properties ---
// These automatically recalculate when their dependencies change.
const allQuestionsAnswered = computed(() => {
  return practiceQuestions.value.every(q => q.userAnswer !== null)
})

const scorePercentage = computed(() => {
  return (score.value / practiceQuestions.value.length) * 100
})

// --- Core Logic ---
function checkAnswers() {
  if (!allQuestionsAnswered.value) return

  let correctCount = 0
  practiceQuestions.value.forEach(q => {
    q.isCorrect = q.userAnswer === q.correctAnswer
    if (q.isCorrect) {
      correctCount++
    }
  })
  score.value = correctCount
  setMotivationalMessage(correctCount)
  showResult.value = true
}

function setMotivationalMessage(correctCount: number) {
  const percentage = (correctCount / practiceQuestions.value.length) * 100
  if (percentage === 100) {
    motivationalMessage.value = "Perfect Score! You have an exceptional command of 'so' and 'such'. Outstanding work!"
  } else if (percentage >= 80) {
    motivationalMessage.value = "Excellent! Your understanding is very strong. Review the explanations for any missed questions to perfect your knowledge."
  } else if (percentage >= 50) {
    motivationalMessage.value = "Good effort! You have a solid foundation. Pay close attention to the explanations to clarify the trickier rules."
  } else {
    motivationalMessage.value = "Keep practicing! This is a challenging topic. Carefully reread the material and the detailed feedback for each question. Every mistake is a learning opportunity."
  }
}

function resetTest() {
  practiceQuestions.value.forEach(q => {
    q.userAnswer = null
    q.isCorrect = undefined
  });
  showResult.value = false
  score.value = 0
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
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
    <!-- ======================================================================= -->
    <!-- SLOT: material                                                          -->
    <!-- Learning content explaining the rules of 'So' and 'Such'.               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Rule: Adjectives & Adverbs</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold text-primary">Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">so</code> + adjective / adverb.</p>
          <p>We use 'so' to add emphasis to an adjective or an adverb. It often introduces a result, typically with a 'that' clause.</p>
          <ul class="ml-6 list-disc [&>li]:mt-2">
            <li>The weather was <span class="font-bold text-blue-600">so cold</span> that the lake froze over. (so + adjective)</li>
            <li>He drives <span class="font-bold text-blue-600">so dangerously</span> that I refuse to be his passenger. (so + adverb)</li>
            <li>Why are you <span class="font-bold text-blue-600">so tired</span>? You should rest. (Used alone for emphasis)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Rule: Nouns</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold text-primary">Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">such</code> + (a/an) + (adjective) + noun.</p>
          <p>'Such' modifies a noun or a noun phrase. Remember to use 'a/an' with singular countable nouns.</p>
          <ul class="ml-6 list-disc [&>li]:mt-2">
            <li>It was <span class="font-bold text-green-600">such a beautiful day</span> that we went for a picnic. (such + a + adj + singular noun)</li>
            <li>They have <span class="font-bold text-green-600">such lovely children</span>. (such + adj + plural noun)</li>
            <li>I can't believe they serve <span class="font-bold text-green-600">such terrible food</span> here. (such + adj + uncountable noun)</li>
          </ul>
          <Alert variant="destructive">
            <Lightbulb class="h-4 w-4" />
            <AlertTitle>Common Mistake!</AlertTitle>
            <AlertDescription>
              Never say <del>"so beautiful day"</del>. The noun 'day' requires 'such'. Correct: <span class="font-semibold">"so beautiful a day"</span> (very formal/literary) or more commonly, <span class="font-semibold">"such a beautiful day"</span>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Special Cases: Quantity</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>When emphasizing quantity, the choice depends on the noun type.</p>
          <p class="font-semibold text-primary">Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">so much / so many</code>.</p>
          <ul class="ml-6 list-disc [&>li]:mt-2">
            <li>There was <span class="font-bold text-purple-600">so much</span> noise I couldn't sleep. (with uncountable nouns)</li>
            <li>There were <span class="font-bold text-purple-600">so many</span> people we couldn't find a seat. (with plural countable nouns)</li>
          </ul>
           <p class="font-semibold text-primary">Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">such a lot of</code>.</p>
          <ul class="ml-6 list-disc [&>li]:mt-2">
             <li>She has <span class="font-bold text-purple-600">such a lot of</span> friends. (an alternative for so many/much)</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice                                                          -->
    <!-- Interactive questions for the student to answer.                        -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>
              Choose the best option to complete each sentence. Think carefully about the word that follows the gap.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(q, index) in practiceQuestions" :key="q.id">
              <div class="flex flex-col space-y-3">
                <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
                <RadioGroup v-model="q.userAnswer" :disabled="showResult" class="grid grid-cols-2 gap-4">
                  <div v-for="option in q.options" :key="option">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" class="peer sr-only" />
                    <Label
                      :for="`${q.id}-${option}`"
                      class="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {{ option }}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || showResult" class="w-full">
              {{ showResult ? 'Answers Submitted' : 'Check My Answers' }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result                                                            -->
    <!-- Displays the score and detailed explanations after submission.          -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>{{ motivationalMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center gap-4">
            <span class="font-bold text-lg">Score: {{ score }} / {{ practiceQuestions.length }}</span>
            <Progress :model-value="scorePercentage" class="flex-1" />
            <span class="font-bold text-lg">{{ scorePercentage.toFixed(0) }}%</span>
          </div>

          <Separator />
          
          <div class="space-y-8">
            <div v-for="(q, index) in practiceQuestions" :key="`result-${q.id}`">
              <div class="flex flex-col space-y-3">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-6 w-6 items-center justify-center rounded-full"
                    :class="[q.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
                  >
                    {{ index + 1 }}
                  </span>
                  <p class="font-semibold">{{ q.question }}</p>
                </div>
                <div class="pl-9 space-y-3">
                  <div 
                    class="flex items-center gap-2 rounded-md p-3"
                    :class="[q.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200']"
                  >
                    <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 flex-shrink-0" :class="[q.isCorrect ? 'text-green-600' : 'text-red-600']" />
                    <p>
                      Your answer: <span class="font-bold">{{ q.userAnswer }}</span>.
                      <span v-if="!q.isCorrect">Correct answer: <span class="font-bold">{{ q.correctAnswer }}</span></span>
                    </p>
                  </div>
                  <Alert v-if="!q.isCorrect" class="border-amber-300 bg-amber-50">
                    <Lightbulb class="h-4 w-4 !text-amber-700" />
                    <AlertTitle class="font-bold text-amber-800">Explanation</AlertTitle>
                    <AlertDescription class="text-amber-700">
                      {{ q.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />

          <div class="flex justify-center">
            <Button @click="resetTest" variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
