<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, BookOpen } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Component State & Data ---

const unitDetails = {
  testTitle: "English Grammar In Use: Practice",
  testDescription: "Based on the series by Raymond Murphy",
  unitTitle: "Unit 9: The (the giraffe / the telephone / the old etc.)",
  unitDescription: "Mastering the definite article 'the' for general concepts like species, inventions, and groups of people.",
  categories: ['Articles', 'Nouns', 'General Concepts', 'Advanced'],
}

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/8")
const goToNextUnit = () => router.push("/units/grammar/10")

// --- Educational Content Structure ---
// Structured for clarity and easy rendering, reflecting a teacher's lesson plan.
const learningMaterials = [
  {
    title: "Rule 1: 'The' with Species and Inventions",
    explanation: "We use 'the' + a singular countable noun to talk about a type of animal, machine, or invention in a general sense.",
    examples: [
      { sentence: "The giraffe is the tallest of all land animals.", note: "Referring to the species as a whole." },
      { sentence: "Life has changed dramatically since the invention of the internet.", note: "Referring to the system/invention." },
      { sentence: "Who invented the telephone?", note: "Not a specific telephone, but the concept of it." }
    ],
    caution: "Contrast this with general plurals: 'Giraffes have long necks.' (General statement about giraffes) vs. 'The giraffe is a fascinating creature.' (Discussing the species type)."
  },
  {
    title: "Rule 2: 'The' + Adjective for Groups of People",
    explanation: "We can use 'the' + an adjective (without a noun) to talk about a specific group of people in society.",
    examples: [
      { sentence: "The government has a responsibility to care for the poor.", note: "Refers to all poor people." },
      { sentence: "The young often have very different perspectives from the old.", note: "Refers to young people and old people in general." },
      { sentence: "A new ramp will be installed to help the disabled.", note: "Refers to all disabled people." }
    ],
    caution: "These phrases are plural. We say 'The rich are...' not 'The rich is...'."
  },
  {
    title: "Rule 3: 'The' with Musical Instruments",
    explanation: "When we talk about the ability to play a musical instrument, we generally use 'the'.",
    examples: [
      { sentence: "She is learning to play the piano.", note: "Skill of playing the instrument." },
      { sentence: "How long have you been playing the guitar?", note: "General ability." }
    ],
    caution: "However, if you are talking about a specific, physical object, you might use 'a/an': 'My father bought me a beautiful guitar for my birthday.'"
  }
]

// --- Practice Questions & Validator Logic ---

interface Question {
  id: number
  type: 'fill-in' | 'mcq'
  text: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    text: "In many countries, ___ rich are getting richer while ___ poor struggle to survive.",
    correctAnswer: 'the/the',
    explanation: "We use 'the + adjective' (the rich, the poor) to talk about groups of people in society. Both blanks require 'the' to generalize these social classes."
  },
  {
    id: 2,
    type: 'mcq',
    text: "___ cheetah is known for being the fastest land animal on the planet.",
    options: ['A', 'An', 'The', '-(no article)'],
    correctAnswer: 'The',
    explanation: "We use 'the' with a singular countable noun to talk about an animal species in general. We are discussing the cheetah as a category."
  },
  {
    id: 3,
    type: 'fill-in',
    text: "Life was simpler before ___ computer became a household item.",
    correctAnswer: 'the',
    explanation: "We use 'the' to refer to an invention in a general sense. The question is about the concept of the computer, not a specific one."
  },
  {
    id: 4,
    type: 'mcq',
    text: "My sister is a talented musician; she can play ___ violin and ___ piano.",
    options: ['the / a', 'a / the', 'the / the', '-(no article) / -(no article)'],
    correctAnswer: 'the / the',
    explanation: "When discussing the skill or ability to play a musical instrument, we use 'the'. Since she can play both, 'the' is required for both violin and piano."
  },
  {
    id: 5,
    type: 'fill-in',
    text: "___ unemployed in this region require urgent government assistance.",
    correctAnswer: 'The',
    explanation: "Here, 'unemployed' is an adjective used as a noun to describe a group of people. 'The unemployed' refers to all people who are unemployed, so we must use 'the'."
  },
  {
    id: 6,
    type: 'mcq',
    text: "While ___ whale is a mammal, many people mistakenly think it's a fish.",
    options: ['A', 'An', 'The', '-(no article)'],
    correctAnswer: 'The',
    explanation: "Similar to the cheetah example, 'The whale' is used here to refer to the species as a whole, as a general type of animal."
  },
  {
    id: 7,
    type: 'fill-in',
    text: "This documentary explores the challenges faced by ___ homeless in urban areas.",
    correctAnswer: 'the',
    explanation: "We use 'the + adjective' (the homeless) to refer to a group of people sharing a common condition. 'Homeless' functions as an adjective here."
  }
])

const userAnswers = ref<Record<number, string>>({})
const results = ref<Array<any>>([])
const showResult = ref(false)

const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.value.length) * 100)
})

const isAnswerCorrect = (question: Question, answer: string): boolean => {
  if (!answer) return false
  const cleanedAnswer = answer.trim().toLowerCase()
  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.map(a => a.toLowerCase()).includes(cleanedAnswer)
  }
  return cleanedAnswer === question.correctAnswer.toLowerCase()
}

const checkAnswers = () => {
  const processedResults = questions.value.map(q => {
    const userAnswer = userAnswers.value[q.id] || ''
    const isCorrect = isAnswerCorrect(q, userAnswer)
    return { ...q, userAnswer, isCorrect }
  })
  results.value = processedResults
  showResult.value = true
  // Scroll to results for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const resetTest = () => {
  userAnswers.value = {}
  results.value = []
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(material, index) in learningMaterials" :key="index" class="overflow-hidden">
        <CardHeader class="bg-gray-50 dark:bg-gray-800/50">
          <CardTitle class="flex items-center gap-3 text-base">
            <BookOpen class="h-5 w-5 text-primary" />
            <span>{{ material.title }}</span>
          </CardTitle>
          <CardDescription class="pt-1">{{ material.explanation }}</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-sm">
          <div class="space-y-4">
            <div v-for="(example, exIndex) in material.examples" :key="exIndex" class="flex items-start gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p class="font-mono text-gray-800 dark:text-gray-200">"{{ example.sentence }}"</p>
                <p class="text-xs text-muted-foreground italic">{{ example.note }}</p>
              </div>
            </div>
            <div v-if="material.caution" class="mt-4 rounded-md border border-amber-500/50 bg-amber-50/50 p-3 dark:bg-amber-900/20">
              <p class="text-xs font-semibold text-amber-800 dark:text-amber-300">Important Distinction</p>
              <p class="text-xs text-amber-700 dark:text-amber-400">{{ material.caution }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Fill in the blanks or choose the correct option. Pay close attention to the rules.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="checkAnswers">
            <div class="space-y-8">
              <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
                <Label :for="`q-${question.id}`" class="text-base">
                  <span class="mr-2 font-bold text-primary">{{ index + 1 }}.</span>
                  <span v-html="question.text.replace(/___/g, '______')" />
                </Label>
                
                <!-- Fill-in-the-blank Input -->
                <div v-if="question.type === 'fill-in'">
                  <Input 
                    :id="`q-${question.id}`"
                    v-model="userAnswers[question.id]"
                    type="text"
                    placeholder="Type 'the' or your answer..."
                    class="font-mono"
                    :disabled="showResult"
                  />
                </div>

                <!-- Multiple Choice Input -->
                <div v-if="question.type === 'mcq'">
                  <RadioGroup :id="`q-${question.id}`" v-model="userAnswers[question.id]" :disabled="showResult">
                    <div class="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                      <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                        <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                        <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div class="pt-4">
                <Button v-if="!showResult" type="submit" class="w-full">
                  Check My Answers
                </Button>
                <Button v-else type="button" variant="secondary" class="w-full" @click="resetTest">
                  Try Again
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-primary/50">
        <CardHeader>
          <CardTitle>Your Results & Explanations</CardTitle>
          <CardDescription>Review your performance. Understanding *why* an answer is correct is the key to mastery.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="rounded-lg bg-muted p-4">
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold">Overall Score</span>
              <span :class="['text-2xl font-bold', score > 70 ? 'text-green-600' : 'text-amber-600']">{{ score }}%</span>
            </div>
            <Progress :model-value="score" class="mt-2 h-2" />
            <p class="mt-2 text-xs text-muted-foreground">
              {{ score > 80 ? 'Excellent work!' : (score > 50 ? 'Good effort, review the explanations below.' : 'Keep practicing! Review the material and try again.') }}
            </p>
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-6">
            <div v-for="(result, index) in results" :key="result.id" class="rounded-md border p-4" :class="[result.isCorrect ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/20']">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <CheckCircle v-if="result.isCorrect" class="h-6 w-6 text-green-600" />
                  <XCircle v-else class="h-6 w-6 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-800 dark:text-gray-200">
                    <span class="mr-2">{{ index + 1 }}.</span> {{ result.text }}
                  </p>
                  <div class="mt-3 space-y-2 text-sm">
                    <p>Your answer: 
                      <span class="font-mono p-1 rounded-md" :class="[result.isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900 line-through']">
                        {{ result.userAnswer || ' (no answer)' }}
                      </span>
                    </p>
                    <p v-if="!result.isCorrect">Correct answer: 
                      <span class="font-mono p-1 rounded-md bg-green-100 dark:bg-green-900">
                        {{ Array.isArray(result.correctAnswer) ? result.correctAnswer.join('/') : result.correctAnswer }}
                      </span>
                    </p>
                  </div>
                  <div class="mt-4 rounded-md border-l-4 p-3" :class="[result.isCorrect ? 'border-green-500 bg-white dark:bg-background' : 'border-red-500 bg-white dark:bg-background']">
                    <p class="text-sm font-semibold text-primary">Explanation:</p>
                    <p class="text-sm text-muted-foreground">{{ result.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>
