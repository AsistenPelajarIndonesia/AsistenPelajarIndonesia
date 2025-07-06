<!--
  File: @/pages/units/grammar/13.vue
  Unit: 13 - Noun + noun (a bus driver / a headache)
  Description: An advanced practice module for understanding and using compound nouns.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming a component library like shadcn-vue is installed.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Lightbulb, BookOpen, Repeat } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default Nuxt layout
})

// --- Page & Navigation Logic ---
const router = useRouter()
const unitNumber = 13
function goToPreviousUnit() {
  router.push(`/units/grammar/${unitNumber - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${unitNumber + 1}`)
}

// --- Reactive State Management ---
const isSubmitted = ref(false)

const questions = ref([
  {
    id: 1,
    type: 'multiple-choice',
    text: 'My flight was delayed. I had to wait for three hours, so it was a ________.',
    options: ['three-hours delay', 'three-hour delay', 'three-hour\'s delay', 'three-hours\' delay'],
    correctAnswer: 'three-hour delay',
    explanation: 'When a number and a noun form a compound adjective before another noun (like "three-hour" before "delay"), the noun in the adjective is always singular. This is a crucial rule for measurements.',
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    text: 'I went to the doctor because I had a terrible ________. (Use: head, ache)',
    correctAnswer: 'headache',
    explanation: 'Some noun + noun combinations are so common that they have become single, closed compound words. "Headache" is a classic example.',
  },
  {
    id: 3,
    type: 'correction',
    text: 'He works in a shop that sells shoes. It\'s a shoes shop.',
    correctAnswer: 'shoe shop',
    explanation: 'The first noun in a compound noun phrase functions as an adjective, describing the type of the second noun. Like adjectives, these nouns are almost always in their singular form, even if the meaning is plural (the shop sells many shoes).',
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: 'In the city centre, there is a special lane just for buses. It\'s the ________.',
    options: ['buses lane', 'bus lane', 'bus\'s lane', 'buses\' lane'],
    correctAnswer: 'bus lane',
    explanation: 'We use "bus lane" to describe a type of lane (a lane for buses). The possessive \'s\' is not used for this kind of general purpose or type classification.',
  },
  {
    id: 5,
    type: 'fill-in-the-blank',
    text: 'The government plans to increase the tax on people\'s ________. (Use: income, tax)',
    correctAnswer: 'income tax',
    explanation: '"Income tax" is a standard compound noun referring to the type of tax levied on income. This is a fixed and widely recognized term.',
  },
  {
    id: 6,
    type: 'correction',
    text: 'The garden vegetables are growing well this year, especially the potatoes.',
    correctAnswer: 'No mistake',
    explanation: 'This sentence is correct. "Garden vegetables" correctly uses "garden" to describe the type of vegetables. This was a trick question to test your confidence in the rule!',
  },
  {
    id: 7,
    type: 'multiple-choice',
    text: 'Could you pass me ________? It\'s on the kitchen counter.',
    options: ['the key of the car', 'the car key', 'the car\'s key'],
    correctAnswer: 'the car key',
    explanation: '"Car key" is the most common and natural form. We use this noun + noun structure for common objects and their parts or accessories. While "the car\'s key" isn\'t strictly wrong, it\'s less idiomatic and implies a stronger sense of specific possession.',
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    text: 'She is a world-famous expert on the ________ of computers. (Use: history, computer)',
    correctAnswer: 'computer history',
    explanation: 'We use "computer history" to refer to the history *about* computers. The first noun specifies the subject or topic of the second noun.',
  },
  {
    id: 9,
    type: 'multiple-choice',
    text: 'The room for all teachers to relax in is called the ________.',
    options: ['teacher room', 'teachers room', 'teachers\' room'],
    correctAnswer: 'teachers\' room',
    explanation: 'This is a subtle but important distinction. "Teacher room" (noun+noun) is possible but less common. Because the room *belongs to* or is *for the use of* a group of people (the teachers), the plural possessive "teachers\'" is the most appropriate and standard choice. Compare with "staff room".',
  },
  {
    id: 10,
    type: 'correction',
    text: 'The company gave all employees a two-weeks bonus for their hard work.',
    correctAnswer: 'two-week bonus',
    explanation: 'Similar to question 1, when a measurement phrase ("two weeks") is used as an adjective before a noun ("bonus"), it becomes a singular compound adjective: "two-week".',
  },
])

const userAnswers = ref<string[]>(Array(questions.value.length).fill(''))

// --- Computed Properties for Validation ---
const results = computed(() => {
  if (!isSubmitted.value) return []
  return questions.value.map((q, index) => {
    const userAnswer = userAnswers.value[index]?.trim() || ''
    // Case-insensitive comparison for robustness
    const isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()
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

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

const resultAlert = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: 'Flawless Victory!', variant: 'default', description: 'Exceptional work! You have mastered the nuances of noun + noun structures.' }
  if (percentage >= 70) return { title: 'Excellent Effort!', variant: 'default', description: 'Great job! You have a strong grasp of the key concepts. Review the explanations for any missed questions.' }
  if (percentage >= 40) return { title: 'Good Attempt, Let\'s Review.', variant: 'destructive', description: 'You\'re on the right track. Pay close attention to the explanations to solidify your understanding.' }
  return { title: 'Needs More Practice.', variant: 'destructive', description: 'Don\'t worry. This is a tricky topic. Carefully study the material and explanations, then try again.' }
})

// --- Methods ---
function handleSubmit() {
  isSubmitted.value = true
  // Scroll to results for better UX on long pages
  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
}

function resetPractice() {
  isSubmitted.value = false
  userAnswers.value = Array(questions.value.length).fill('')
  // Scroll back to the top of the practice section
  document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar In Use"
    test-description="Practice based on the works of Raymond Murphy"
    :unit-title="`Unit ${unitNumber}: Noun + noun (a bus driver / a headache)`"
    unit-description="Explore how one noun can act as an adjective to describe another, a fundamental pattern for fluency."
    :categories="['Nouns', 'Compound Nouns', 'Adjectives', 'Vocabulary']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-3">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Concept: The First Noun as Adjective</CardTitle>
            <CardDescription>The first noun specifies the TYPE of thing, person, or purpose.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>In a 'noun + noun' structure, the first noun gives us more specific information about the second noun. It behaves very much like an adjective.</p>
          <ul class="list-disc space-y-2 pl-5">
            <li>What kind of driver? A <strong class="text-primary">bus</strong> driver. (drives a bus)</li>
            <li>What is the station for? For <strong class="text-primary">trains</strong>. It's a <strong class="text-primary">train</strong> station.</li>
            <li>What is the bottle made of? Of <strong class="text-primary">glass</strong>. It's a <strong class="text-primary">glass</strong> bottle.</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="border-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
        <CardHeader class="flex flex-row items-center gap-3">
          <Lightbulb class="h-8 w-8 text-amber-500" />
          <div>
            <CardTitle>The Golden Rule: Use the Singular Form</CardTitle>
            <CardDescription>This is the most common point of error for learners.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>Even if the logical meaning is plural, the first noun is almost always singular.</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-semibold text-green-600">Correct:</p>
              <ul class="list-disc space-y-1 pl-5">
                <li>a <strong class="text-green-700">shoe</strong> shop (sells many shoes)</li>
                <li>a <strong class="text-green-700">ten-pound</strong> note</li>
                <li>a <strong class="text-green-700">car</strong> factory (makes many cars)</li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-red-600">Incorrect:</p>
              <ul class="list-disc space-y-1 pl-5">
                <li>a <s class="text-red-700">shoes</s> shop</li>
                <li>a <s class="text-red-700">ten-pounds</s> note</li>
                <li>a <s class="text-red-700">cars</s> factory</li>
              </ul>
            </div>
          </div>
          <p class="pt-2 text-xs text-muted-foreground">Note: Some exceptions exist (e.g., <strong class="text-foreground">sports</strong> car, <strong class="text-foreground">clothes</strong> shop, <strong class="text-foreground">news</strong> agent), but the singular rule applies to the vast majority of cases.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distinguishing from Possessive 's</CardTitle>
          <CardDescription>Noun + Noun (General) vs. Possessive 's (Specific)</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><strong class="text-primary">Noun + Noun:</strong> Refers to a general type.</p>
          <p class="pl-4">e.g., <em class="font-semibold">"Have you seen the garden shears?"</em> (the type of tool used for gardens, not a specific pair)</p>
          <p><strong class="text-primary">Possessive 's:</strong> Refers to something belonging to a specific person, place, or group.</p>
          <p class="pl-4">e.g., <em class="font-semibold">"This is my brother's car."</em> (the specific car that belongs to my brother)</p>
          <p class="pl-4">e.g., <em class="font-semibold">"What was the government's decision?"</em> (the specific decision made by the government)</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Test your understanding. Choose the best option or fill in the blanks.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
              <p class="font-semibold">{{ index + 1 }}. {{ q.text }}</p>

              <!-- Multiple Choice Renderer -->
              <RadioGroup v-if="q.type === 'multiple-choice'" v-model="userAnswers[index]" class="space-y-2">
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                  <Label :for="`${q.id}-${option}`">{{ option }}</Label>
                </div>
              </RadioGroup>

              <!-- Fill-in-the-blank / Correction Renderer -->
              <Input
                v-if="q.type === 'fill-in-the-blank' || q.type === 'correction'"
                v-model="userAnswers[index]"
                :placeholder="q.type === 'correction' ? 'Type the corrected phrase' : 'Type your answer'"
                class="max-w-sm"
                @keyup.enter="handleSubmit"
              />
            </div>

            <Button v-if="!isSubmitted" class="w-full" size="lg" @click="handleSubmit">
              Check My Answers
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review your performance and read the explanations carefully.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <Alert :variant="resultAlert.variant" class="border-2">
              <AlertTitle class="text-lg font-bold">{{ resultAlert.title }}</AlertTitle>
              <AlertDescription>
                {{ resultAlert.description }} You scored <strong class="font-bold">{{ score }} / {{ totalQuestions }}</strong>.
              </AlertDescription>
            </Alert>
            
            <Progress :model-value="scorePercentage" class="w-full" />

            <div class="space-y-6 pt-4">
              <div v-for="(result, index) in results" :key="`result-${result.id}`" class="rounded-lg border p-4">
                <p class="font-semibold">{{ index + 1 }}. {{ result.text }}</p>
                <div class="mt-3 space-y-2 text-sm">
                  <div class="flex items-start gap-2">
                    <template v-if="result.isCorrect">
                      <CheckCircle2 class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <p><strong class="text-green-600">Your answer:</strong> {{ result.userAnswer }}</p>
                    </template>
                    <template v-else>
                      <XCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                      <div>
                        <p><strong class="text-red-600">Your answer:</strong> <span class="line-through">{{ result.userAnswer || ' (No answer given)' }}</span></p>
                        <p><strong class="text-green-600">Correct answer:</strong> {{ result.correctAnswer }}</p>
                      </div>
                    </template>
                  </div>
                  <div class="flex items-start gap-2 rounded-md bg-muted p-3">
                    <Lightbulb class="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                    <p><strong class="text-amber-600 dark:text-amber-500">Explanation:</strong> {{ result.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button class="w-full" size="lg" variant="outline" @click="resetPractice">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
