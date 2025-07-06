<!--
  File: @/pages/units/grammar/15.vue
  Unit: 15 - Prepositions of Place: at, on, in
  Description: An advanced practice module for mastering the prepositions of place 'at', 'on', and 'in',
  based on the principles of "English Grammar in Use". This page provides detailed explanations,
  challenging contextual exercises, and an intelligent validation system with in-depth feedback.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Component Imports from our UI Library (e.g., shadcn-vue)
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

// --- Unit Static Data ---
// This object centralizes all the content for the unit, making it maintainable and clear.
const unitData = {
  unitNumber: 15,
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Interactive exercises based on the best-selling book by Raymond Murphy.',
  unitTitle: 'Unit 15: Prepositions of Place (at, on, in)',
  unitDescription: 'Master the use of "at", "on", and "in" for locations and positions. Pay close attention to the context of each sentence, as the rules can be nuanced.',
  categories: ['Prepositions', 'Place & Position', 'B1 Intermediate'],
  learningMaterial: [
    {
      title: 'Rule Set 1: Using "in"',
      points: [
        'Used for enclosed spaces or larger areas with defined boundaries.',
        'Think of being *inside* something: a container, a room, a building.',
        'Also used for geographical areas like cities, countries, and continents.',
      ],
      examples: [
        'Your keys are **in** the drawer.',
        'I live **in** London, which is **in** England.',
        'The children are playing **in** the garden.',
        'There is some water **in** the bottle.'
      ],
    },
    {
      title: 'Rule Set 2: Using "on"',
      points: [
        'Used for surfaces.',
        'Think of something resting *on top of* a flat area.',
        'Also used for floors in a building, public transport, and media (radio, TV, internet).',
      ],
      examples: [
        'The book is **on** the table.',
        'There is a beautiful painting **on** the wall.',
        'My apartment is **on** the third floor.',
        'I heard the news **on** the radio while I was **on** the bus.'
      ],
    },
    {
      title: 'Rule Set 3: Using "at"',
      points: [
        'Used for specific points or locations.',
        'Think of a precise place, not a general area or an enclosed space.',
        'Often used for events, specific addresses, and general locations like "the bus stop" or "the door".',
      ],
      examples: [
        'Let\'s meet **at** the entrance of the cinema.',
        'She is waiting **at** the bus stop.',
        'I was **at** a party last night.',
        'Turn left **at** the traffic lights.'
      ],
    },
    {
      title: 'Special Cases & Common Mistakes',
      points: [
        '**at** the top/bottom of the page vs. **on** the page (for general content)',
        '**in** a car/taxi vs. **on** a bus/train/plane (you can walk around on the latter)',
        '**at** work/home/school (general concept of the place)',
        '**in** bed (covered) vs. **on** the bed (sitting on top)',
      ],
      examples: [
        'Write your name **at** the top of the page.',
        'I read an interesting article **on** the internet.',
        'He\'s not **in** the office today; he\'s working **at** home.',
        'It\'s comfortable to read **in** bed.'
      ],
    }
  ],
  practiceQuestions: [
    {
      id: 1,
      sentence: 'I couldn\'t find my keys, but then I remembered I left them ___ the car.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'in',
      explanation: 'We use "in" for enclosed spaces where you are inside something. A car is an enclosed space. "On the car" would mean on the roof, and "at the car" would imply you are standing next to it.'
    },
    {
      id: 2,
      sentence: 'The CEO\'s office is ___ the top floor, with a fantastic view of the city.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'on',
      explanation: 'We use "on" to specify a floor within a building. "On the first floor," "on the ground floor," "on the top floor." "In the top floor" is grammatically incorrect in this context.'
    },
    {
      id: 3,
      sentence: 'There was a huge queue of people waiting ___ the bus stop this morning.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'at',
      explanation: 'We use "at" for a specific point or location. "The bus stop" is considered a precise point on a journey or map. You wait *at* the stop, and then you get *on* the bus.'
    },
    {
      id: 4,
      sentence: 'Look! There\'s a strange insect crawling ___ the ceiling.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'on',
      explanation: 'A ceiling is a surface. We use "on" for surfaces, regardless of their orientation (horizontal or vertical). The insect is on the surface of the ceiling.'
    },
    {
      id: 5,
      sentence: 'He lives ___ 42 Baker Street, a very famous address.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'at',
      explanation: 'For a specific, full address that includes the number, "at" is the correct preposition. We live "in" a city (London) or "on" a street (Baker Street), but "at" a specific address (42 Baker Street).'
    },
    {
      id: 6,
      sentence: 'I was sitting ___ my desk when I heard a loud noise outside.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'at',
      explanation: 'We use "at" when referring to the general location of a piece of furniture where an activity takes place. You sit "at a desk" to work, just as you sit "at a table" to eat. "On my desk" would imply you were sitting on top of the surface itself.'
    },
    {
      id: 7,
      sentence: 'The main headline ___ the front page of the newspaper caught my eye.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'on',
      explanation: 'A page, whether in a book or newspaper, is a surface. Therefore, content is located "on" the page. "In the page" is incorrect, and "at the front page" is only used for specific points, like "at the top of the page".'
    },
    {
      id: 8,
      sentence: 'It can be dangerous to stand ___ a balcony if you are afraid of heights.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'on',
      explanation: 'A balcony is treated as a surface or platform area, similar to a floor. Therefore, you stand "on" a balcony.'
    },
    {
      id: 9,
      sentence: 'The children spent the whole afternoon swimming ___ the pool.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'in',
      explanation: 'A pool is a container for water, an enclosed area. You swim "in" the water, and therefore "in" the pool. You might be "at the pool" to describe your general location, but the act of swimming happens "in" it.'
    },
    {
      id: 10,
      sentence: 'The actors are waiting ___ the wings before they go on stage.',
      options: ['in', 'at', 'on'],
      correctAnswer: 'in',
      explanation: 'This is a more idiomatic use. "The wings" of a theatre are considered an enclosed area off-stage. Actors wait "in the wings" before they appear "on stage" (a surface).'
    }
  ]
}

// --- Reactive State & Logic ---
const userAnswers = ref<Record<number, string>>({})
const isSubmitted = ref(false)

const totalQuestions = computed(() => unitData.practiceQuestions.length)
const showResult = computed(() => isSubmitted.value)

const score = computed(() => {
  if (!isSubmitted.value) return 0
  return unitData.practiceQuestions.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

const feedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: 'Perfect Score!', message: 'Outstanding! You have a deep understanding of these prepositions.', variant: 'default' }
  if (percentage >= 70) return { title: 'Great Job!', message: 'You have a solid grasp of the topic. Review the explanations for any missed questions to perfect your knowledge.', variant: 'default' }
  if (percentage >= 40) return { title: 'Good Effort!', message: 'You\'re on the right track. Pay close attention to the explanations to understand the nuances.', variant: 'destructive' }
  return { title: 'Needs Review', message: 'This is a tricky topic. Go over the learning material and the explanations carefully. Every mistake is a learning opportunity!', variant: 'destructive' }
})

const resultsData = computed(() => {
  return unitData.practiceQuestions.map(question => ({
    ...question,
    userAnswer: userAnswers.value[question.id] || 'Not Answered',
    isCorrect: userAnswers.value[question.id] === question.correctAnswer
  }))
})


// --- Functions ---
function handleSubmission() {
  isSubmitted.value = true
  // Scroll to results for better UX
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetPractice() {
  userAnswers.value = {}
  isSubmitted.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPreviousUnit() {
  router.push(`/units/grammar/${unitData.unitNumber - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${unitData.unitNumber + 1}`)
}

</script>

<template>
  <GrammarLayout
    :test-title="unitData.testTitle"
    :test-description="unitData.testDescription"
    :unit-title="unitData.unitTitle"
    :unit-description="unitData.unitDescription"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Learning Material                                                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(material, index) in unitData.learningMaterial" :key="index">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-base">
            <BrainCircuit class="h-5 w-5 text-primary" />
            {{ material.title }}
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 pl-8">
          <ul class="list-disc space-y-1 pl-4">
            <li v-for="(point, pIndex) in material.points" :key="pIndex" class="text-sm">
              {{ point }}
            </li>
          </ul>
          <div class="space-y-2">
             <p v-for="(example, eIndex) in material.examples" :key="eIndex" class="text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-3" v-html="example"></p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Practice Questions                                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="sticky top-24">
        <CardHeader>
          <CardTitle>Practice Exercise</CardTitle>
          <CardDescription>Choose the correct preposition to complete each sentence. Submit your answers when you are ready.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmission">
            <div class="space-y-6">
              <div v-for="(question, index) in unitData.practiceQuestions" :key="question.id" class="flex flex-col gap-3">
                <p>
                  <span class="font-semibold mr-2">{{ index + 1 }}.</span>
                  <span v-html="question.sentence.replace('___', '<span class=\'font-mono text-muted-foreground\'>[____]</span>')"></span>
                </p>
                <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted" class="flex items-center gap-4 pl-6">
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                    <Label :for="`q${question.id}-${option}`" class="font-mono text-base">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button class="w-full" :disabled="isSubmitted" @click="handleSubmission">
            Check Answers & See Score
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Results Display                                                   -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section" class="space-y-6">
        <!-- Summary Card -->
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Here is a summary of your performance.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Alert :variant="feedback.variant">
              <component :is="scorePercentage >= 70 ? CheckCircle : XCircle" class="h-4 w-4" />
              <AlertTitle>{{ feedback.title }}</AlertTitle>
              <AlertDescription>{{ feedback.message }}</AlertDescription>
            </Alert>
            <div class="flex items-center justify-between gap-4">
              <span class="font-bold text-2xl">Score: {{ score }} / {{ totalQuestions }}</span>
              <div class="w-1/2">
                <Progress :model-value="scorePercentage" class="w-full" />
                <p class="text-right text-sm text-muted-foreground mt-1">{{ scorePercentage.toFixed(0) }}% Correct</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full" @click="resetPractice">
              Try Again
            </Button>
          </CardFooter>
        </Card>

        <!-- Detailed Review Card -->
        <Card>
          <CardHeader>
            <CardTitle>Detailed Question Review</CardTitle>
            <CardDescription>Analyze each question to understand the correct logic.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-for="result in resultsData" :key="`result-${result.id}`">
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
                <component :is="result.isCorrect ? CheckCircle : XCircle" class="h-4 w-4"/>
                <AlertTitle class="flex justify-between items-center">
                  <span>Question {{ result.id }}</span>
                  <span :class="[result.isCorrect ? 'text-green-600' : 'text-red-600', 'font-bold text-sm']">
                    {{ result.isCorrect ? 'CORRECT' : 'INCORRECT' }}
                  </span>
                </AlertTitle>
                <AlertDescription class="space-y-4 mt-2">
                  <p class="text-base text-foreground" v-html="result.sentence.replace('___', `<strong class='underline underline-offset-4 decoration-2 ${result.isCorrect ? 'decoration-green-500' : 'decoration-red-500'}'>${result.correctAnswer}</strong>`)"></p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>Your Answer: <strong :class="[result.isCorrect ? 'text-green-700' : 'text-red-700']">{{ result.userAnswer }}</strong></p>
                    <p v-if="!result.isCorrect">Correct Answer: <strong class="text-green-700">{{ result.correctAnswer }}</strong></p>
                  </div>
                  <Card class="bg-muted/50">
                    <CardHeader class="flex flex-row items-center gap-2 p-3">
                      <Info class="h-4 w-4 text-blue-600"/>
                      <CardTitle class="text-sm font-semibold">Explanation</CardTitle>
                    </CardHeader>
                    <CardContent class="p-3 pt-0">
                      <p class="text-sm text-muted-foreground">{{ result.explanation }}</p>
                    </CardContent>
                  </Card>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
