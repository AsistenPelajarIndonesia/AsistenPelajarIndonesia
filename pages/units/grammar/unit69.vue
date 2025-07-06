<!--
  File: @/pages/units/grammar/3.vue
  Description: An advanced grammar practice page for "Unit 3: Countable and uncountable 2".
  This page integrates learning material, a challenging interactive quiz, and a detailed results
  validator within the sophisticated GrammarLayout. It is designed to provide a deep,
  contextual understanding of nouns that can be both countable and uncountable, along with
  tricky quantifiers and partitives.
-->
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are available from a library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page & Layout Configuration ---
const pageMeta = {
  testTitle: 'English Grammar In Use: Advanced Practice',
  testDescription: 'Based on the methodologies of Raymond Murphy',
  unitTitle: 'Unit 3: Countable and uncountable 2',
  unitDescription: 'Exploring the dual nature of nouns and the nuances of quantification. This unit focuses on nouns that change meaning when used as countable or uncountable, and the correct use of expressions of quantity.',
  categories: ['Nouns', 'Quantifiers', 'Advanced Grammar'],
  unitNumber: 3
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push(`/units/grammar/${pageMeta.unitNumber - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${pageMeta.unitNumber + 1}`)
}

// --- Quiz State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<string, string>>({})
const resultsRef = ref<HTMLElement | null>(null)

// --- Question & Answer Data ---
// These questions are designed to be challenging, testing subtle distinctions and common pitfalls.
const questions = ref([
  {
    id: 'q1',
    text: 'After the fire, the old building was just a pile of rubble. The investigators found ___ that the fire was started deliberately.',
    options: ['an evidence', 'evidence', 'evidences', 'a piece of an evidence'],
    correctAnswer: 'evidence',
    explanation: "The noun 'evidence' is almost always uncountable in English, similar to 'information' or 'advice'. It refers to the general body of facts or information indicating whether a belief or proposition is true or valid. You cannot have 'an evidence' or plural 'evidences'. To refer to a single item, you must use a partitive phrase like 'a piece of evidence'."
  },
  {
    id: 'q2',
    text: "I really need to find a new job. I'm not making much ___ in my current role.",
    options: ['progress', 'a progress', 'progresses', 'some progress'],
    correctAnswer: 'progress',
    explanation: "'Progress' is an uncountable noun that refers to forward or onward movement towards a destination or goal. You cannot say 'a progress' or 'progresses'. While 'some progress' is grammatically correct, 'making much progress' is the more natural and idiomatic choice in this negative construction."
  },
  {
    id: 'q3',
    text: "My grandfather has had many interesting jobs; you could say he's had a life full of ___.",
    options: ['experience', 'an experience', 'experiences', 'many experience'],
    correctAnswer: 'experiences',
    explanation: "This question tests the dual nature of 'experience'. When it means 'knowledge or skill from doing something', it's uncountable (e.g., 'I have 10 years of experience'). When it means 'an event or occurrence which leaves an impression', it's countable. The sentence refers to multiple interesting events throughout his life, so the plural countable form 'experiences' is correct."
  },
  {
    id: 'q4',
    text: "Could you get me ___ from the printer? I need to print my dissertation proposal.",
    options: ['a paper', 'paper', 'papers', 'a piece of papers'],
    correctAnswer: 'paper',
    explanation: "Here, 'paper' refers to the uncountable material used for writing or printing. 'A paper' typically means a newspaper or an academic essay. 'Papers' could refer to documents, but in the context of getting material for a printer, the uncountable form is the most appropriate and direct choice."
  },
  {
    id: 'q5',
    text: "There was ___ in the room; I couldn't see a thing until my eyes adjusted.",
    options: ['no light', 'not a light', 'no lights', 'none light'],
    correctAnswer: 'no light',
    explanation: "'Light' as general illumination is uncountable. The sentence describes a total absence of this illumination. 'No light' is the correct formulation. 'Not a light' would imply not even a single lamp was on, which is plausible but 'no light' is a more general and fitting description for the inability to see."
  },
  {
    id: 'q6',
    text: "Be careful with that antique table. It's a beautiful ___.",
    options: ['furniture', 'furnitures', 'piece of furniture', 'a furniture'],
    correctAnswer: 'piece of furniture',
    explanation: "'Furniture' is a classic uncountable noun. It refers to a collection of items like tables, chairs, and beds. You can never say 'a furniture' or 'furnitures'. To refer to a single item, you must use the partitive phrase 'a piece of furniture'."
  },
  {
    id: 'q7',
    text: "The politician's speech was just ___ and offered no concrete solutions.",
    options: ['a hot air', 'many hot airs', 'hot air', 'some hot air'],
    correctAnswer: 'hot air',
    explanation: "The idiomatic expression 'hot air' refers to empty, exaggerated, or pretentious talk or writing. In this figurative sense, 'air' is uncountable. Therefore, the correct answer is simply 'hot air'."
  },
  {
    id: 'q8',
    text: "Although he's very wealthy, he drives a modest car and shows ___ for his position.",
    options: ['little regard', 'a little regard', 'few regard', 'a few regard'],
    correctAnswer: 'little regard',
    explanation: "'Regard' (meaning consideration or care) is uncountable. The distinction between 'little' and 'a little' is crucial. 'A little' means 'a small amount' (positive connotation). 'Little' means 'almost no' (negative connotation). The sentence implies he shows almost no concern for displaying his wealth, so the negative 'little regard' is the correct choice."
  }
])

// --- Computed Properties for Validation ---
const results = computed(() => {
  if (!isSubmitted.value) return []
  return questions.value.map(q => {
    const userAnswer = userAnswers.value[q.id]
    const isCorrect = userAnswer === q.correctAnswer
    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })
})

const score = computed(() => {
  return results.value.filter(r => r.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { message: "Exceptional! A perfect score.", class: 'text-green-600' }
  if (percentage >= 75) return { message: "Excellent work! You have a strong grasp of these concepts.", class: 'text-blue-600' }
  if (percentage >= 50) return { message: "Good effort. Review the explanations to solidify your understanding.", class: 'text-yellow-600' }
  return { message: "This is a challenging topic. Please study the material and explanations carefully.", class: 'text-red-600' }
})

// --- Methods ---
async function submitAnswers() {
  isSubmitted.value = true
  // Wait for the DOM to update so the results section is visible
  await nextTick()
  // Scroll to the results for a smooth user experience
  resultsRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- Learning Material Slot -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concept: The Dual Nature of Nouns</CardTitle>
          <CardDescription>
            Many English nouns can be either countable or uncountable, but their meaning changes significantly. Mastering this distinction is key to advanced fluency.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="prose prose-sm max-w-none dark:prose-invert">
            <p><strong>General Rule:</strong> Uncountable nouns refer to abstract concepts, materials, or collections viewed as a whole. Countable nouns refer to individual, separable items.</p>
            
            <h4 class="font-semibold">Common Transformations:</h4>
            <ul>
              <li><strong>work</strong> (uncountable: effort, employment) vs. <strong>a work</strong> (countable: a piece of art/music, e.g., <em>a work of Shakespeare</em>).</li>
              <li><strong>hair</strong> (uncountable: the mass on your head) vs. <strong>a hair</strong> (countable: a single strand, e.g., <em>There's a hair in my soup!</em>).</li>
              <li><strong>experience</strong> (uncountable: skill/knowledge) vs. <strong>an experience</strong> (countable: a specific event, e.g., <em>It was an unforgettable experience</em>).</li>
              <li><strong>paper</strong> (uncountable: material) vs. <strong>a paper</strong> (countable: a newspaper or document).</li>
              <li><strong>light</strong> (uncountable: illumination) vs. <strong>a light</strong> (countable: a lamp or bulb).</li>
            </ul>

            <h4 class="font-semibold">Classic Uncountables to Memorize:</h4>
            <p>These nouns are almost always uncountable and are common sources of error. They cannot be pluralized and do not take 'a' or 'an'.</p>
            <p>
              <code>accommodation, advice, baggage, bread, chaos, evidence, furniture, homework, information, knowledge, luggage, money, news, progress, research, traffic, travel, weather, work.</code>
            </p>
             <h4 class="font-semibold">Quantifying the Uncountable:</h4>
            <p>To count or specify an amount of an uncountable noun, we use partitive expressions.</p>
            <ul>
                <li>a <strong>piece</strong> of advice / information / evidence / furniture</li>
                <li>an <strong>item</strong> of news / clothing / luggage</li>
                <li>a <strong>bar</strong> of chocolate / soap</li>
                <li>a <strong>flash</strong> of lightning, a <strong>clap</strong> of thunder</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- Practice Questions Slot -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Choose the best option to complete each sentence.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="submitAnswers" :disabled="isSubmitted" class="w-full">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- Results Slot -->
    <template #result>
      <div ref="resultsRef">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription :class="scoreFeedback.class" class="font-bold text-lg pt-2">{{ scoreFeedback.message }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-medium">Score: {{ score }} / {{ questions.length }}</span>
                <Progress :model-value="scorePercentage" class="w-[60%]" />
                <span class="text-sm font-bold">{{ scorePercentage.toFixed(0) }}%</span>
            </div>
            
            <hr class="my-4"/>

            <h3 class="text-lg font-semibold mt-6 mb-2">Detailed Breakdown:</h3>
            <div v-for="result in results" :key="`res-${result.id}`" class="mb-6 p-4 rounded-lg" :class="result.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'">
              <p class="mb-2 font-medium">{{ result.text.replace('___', `<strong><em>...</em></strong>`) }}</p>
              
              <div class="flex items-center gap-4 text-sm">
                 <div class="flex items-center gap-2">
                    <span class="font-semibold">Your answer:</span>
                    <span :class="result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                      {{ result.userAnswer || 'Not answered' }}
                    </span>
                    <CheckCircle2 v-if="result.isCorrect" class="h-4 w-4 text-green-600" />
                    <XCircle v-else class="h-4 w-4 text-red-600" />
                 </div>
                 <div v-if="!result.isCorrect" class="flex items-center gap-2">
                    <span class="font-semibold">Correct answer:</span>
                    <span class="text-green-700 dark:text-green-400">{{ result.correctAnswer }}</span>
                 </div>
              </div>
              
              <Alert class="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-500">
                  <HelpCircle class="h-4 w-4 text-blue-600" />
                  <AlertTitle class="text-blue-800 dark:text-blue-300">Explanation</AlertTitle>
                  <AlertDescription class="text-blue-700 dark:text-blue-400">
                    {{ result.explanation }}
                  </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
