<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-vue-next'

// --- Component Imports ---
// We import the layout and all necessary UI components from our library (e.g., shadcn-vue).
// This modular approach keeps the page clean and focused on its logic and content.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

// --- Type Definitions ---
// Defining types for our data structures ensures type safety and improves code clarity.
interface Question {
  id: string
  text: string
  options: { value: string; label: string }[]
  correctAnswer: string
  explanation: string
}

interface MaterialSection {
  title: string
  explanation: string
  examples: string[]
}

// --- Page-Specific State ---
// This reactive object holds all the static content for the unit. Organizing content this way
// makes the template cleaner and the data easier to manage or even fetch from an API in the future.
const unitData = reactive({
  unitNumber: 4,
  title: 'Unit 4: Prefer and would rather',
  description: 'Mastering the nuances of expressing preference in English.',
  categories: ['Preferences', 'Verb Patterns', 'Conditionals & Hypotheticals'],
  material: [
    {
      title: 'General Preferences: `prefer`',
      explanation: 'We use `prefer` to talk about general preferences, things we like more than others all the time. The structure can be `prefer + to + infinitive` or `prefer + verb-ing`. When comparing two things, the structure is `prefer [thing/action] to [other thing/action]`.',
      examples: [
        'I prefer to drive rather than take the train. (prefer to-infinitive)',
        'She prefers reading books to watching movies. (prefer -ing to -ing)',
        'They prefer coffee to tea. (prefer noun to noun)',
      ],
    },
    {
      title: 'Specific Preferences: `would prefer`',
      explanation: 'We use `would prefer` to talk about a specific preference in a particular situation, not in general. The structure is almost always `would prefer + to + infinitive`.',
      examples: [
        '"Shall we go by train?" "Well, I\'d prefer to go by car."',
        'I\'d prefer to stay at home tonight rather than go to the cinema.',
      ],
    },
    {
      title: 'Specific Preferences: `would rather`',
      explanation: '`Would rather` has a similar meaning to `would prefer` but follows a different structure: `would rather + bare infinitive` (the infinitive without `to`).',
      examples: [
        'I\'d rather go by car. (NOT: I\'d rather to go)',
        'I\'m tired. I\'d rather not go out tonight.',
        'We\'d rather have dinner now.',
      ],
    },
    {
      title: 'Hypothetical Preferences about others: `would rather someone did...`',
      explanation: 'This is an advanced and often tricky structure. When you want someone else to do something, you use `would rather + subject + past tense verb`. Even though we use the past tense, the meaning is for the present or future.',
      examples: [
        'I\'d rather you didn\'t tell anyone what I said. (I want you not to tell them now/future)',
        'Should I tell them the news? I\'d rather you waited until tomorrow.',
        'My mother would rather we visited her on Sunday instead of Saturday.',
      ],
    },
  ] as MaterialSection[],
  questions: [
    {
      id: 'q1',
      text: 'My parents are very traditional. They _______ we got married before buying a house.',
      options: [
        { value: 'A', label: 'would rather' },
        { value: 'B', label: 'prefer' },
        { value: 'C', label: 'would prefer' },
        { value: 'D', label: 'rather' },
      ],
      correctAnswer: 'A',
      explanation: 'This sentence expresses a preference about someone else\'s actions (`we got married`). The correct structure for this is `would rather + subject + past simple verb`. "Prefer" and "would prefer" do not fit this grammatical pattern.',
    },
    {
      id: 'q2',
      text: '"Shall I open the window?" "I\'d rather you _______ . It\'s quite noisy outside."',
      options: [
        { value: 'A', label: 'don\'t' },
        { value: 'B', label: 'didn\'t' },
        { value: 'C', label: 'not to' },
        { value: 'D', label: 'wouldn\'t' },
      ],
      correctAnswer: 'B',
      explanation: 'This is a classic example of expressing a preference about someone else\'s immediate action. The structure `would rather + subject + past simple` is required. Even though the situation is in the present, the verb form is past (`didn\'t`).',
    },
    {
      id: 'q3',
      text: 'In general, I prefer _______ by bus, but on this specific rainy day, I\'d much rather _______ a taxi.',
      options: [
        { value: 'A', label: 'travelling / take' },
        { value: 'B', label: 'to travel / to take' },
        { value: 'C', label: 'travelling / to take' },
        { value: 'D', label: 'to travel / taking' },
      ],
      correctAnswer: 'A',
      explanation: 'This question tests the distinction between general and specific preferences. For general preferences, `prefer + verb-ing` (`travelling`) is correct. For specific preferences, `would rather + bare infinitive` (`take`) is used. Option A correctly combines both forms.',
    },
    {
      id: 'q4',
      text: 'If I had the choice, I think I\'d prefer _______ in the countryside _______ in a big, crowded city.',
      options: [
        { value: 'A', label: 'to live / than live' },
        { value: 'B', label: 'living / to living' },
        { value: 'C', label: 'to live / rather than live' },
        { value: 'D', label: 'live / than to live' },
      ],
      correctAnswer: 'C',
      explanation: 'When using `would prefer + to + infinitive` to compare two actions, the correct structure is `would prefer to do X rather than do Y`. The second verb (`live`) is also in its bare infinitive form. Using `than` alone is incorrect in this structure.',
    },
     {
      id: 'q5',
      text: 'He doesn\'t like conflict. He told me he\'d rather _______ about it anymore.',
      options: [
        { value: 'A', label: 'not to argue' },
        { value: 'B', label: 'not arguing' },
        { value: 'C', label: 'not argue' },
        { value: 'D', label: 'to not argue' },
      ],
      correctAnswer: 'C',
      explanation: 'The structure `would rather` is followed by the bare infinitive. For the negative form, we place `not` directly before the bare infinitive: `would rather not do something`. Therefore, `not argue` is the only correct option.',
    },
  ] as Question[],
})

// --- Interactive State ---
// These refs manage the dynamic aspects of the quiz, such as user input and visibility of sections.
const userAnswers = reactive<Record<string, string>>({})
const isSubmitted = ref(false)
const showResult = ref(false)

// --- Computed Properties for Dynamic Feedback ---
// Computed properties are efficient as they only re-calculate when their dependencies change.
const score = computed(() => {
  return unitData.questions.reduce((count, question) => {
    return count + (userAnswers[question.id] === question.correctAnswer ? 1 : 0)
  }, 0)
})

const scorePercentage = computed(() => {
  if (unitData.questions.length === 0) return 0
  return (score.value / unitData.questions.length) * 100
})

const progressMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect score! You've mastered this topic."
  if (percentage >= 75) return "Excellent work! Your understanding is very strong."
  if (percentage >= 50) return "Good effort! Review the explanations to solidify your knowledge."
  return "Keep practicing! Read the explanations carefully to understand the rules."
})

// --- Methods / Event Handlers ---
const router = useRouter()

function checkAnswers() {
  isSubmitted.value = true
  showResult.value = true
}

function resetTest() {
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  isSubmitted.value = false
  showResult.value = false
}

function goToPreviousUnit() {
  router.push("/units/grammar/3")
}

function goToNextUnit() {
  router.push("/units/grammar/5")
}

function getOptionLabel(question: Question, value: string): string {
    return question.options.find(opt => opt.value === value)?.label || 'Not answered'
}
</script>

<template>
  <GrammarLayout
    :test-title="'English Grammar In Use Practice'"
    :test-description="'Based on the methodology of Raymond Murphy'"
    :unit-title="unitData.title"
    :unit-description="unitData.description"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: Explanations and Examples                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(section, index) in unitData.material" :key="`material-${index}`">
        <CardHeader>
          <CardTitle class="text-base font-semibold text-primary">{{ section.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="mb-4 text-sm text-muted-foreground">{{ section.explanation }}</p>
          <div class="space-y-2">
            <p v-for="(example, exIndex) in section.examples" :key="`ex-${exIndex}`" class="rounded-md border-l-4 border-primary/50 bg-muted/50 p-2 text-sm italic">
              "{{ example }}"
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice SLOT: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, qIndex) in unitData.questions" :key="question.id">
            <p class="mb-3 font-medium">
              {{ qIndex + 1 }}. {{ question.text }}
            </p>
            <RadioGroup 
              v-model="userAnswers[question.id]" 
              :disabled="isSubmitted"
              class="gap-3"
            >
              <div 
                v-for="option in question.options" 
                :key="option.value" 
                class="flex items-center space-x-2"
              >
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="cursor-pointer">
                  {{ option.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
           <Button v-if="isSubmitted" variant="outline" @click="resetTest">Try Again</Button>
           <Button :disabled="isSubmitted" @click="checkAnswers">Check Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: Detailed Score and Explanations                         -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-xl">Your Results</CardTitle>
          <CardDescription>{{ progressMessage }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="mb-6 flex items-center gap-4">
            <span class="font-bold text-2xl text-primary">{{ score }} / {{ unitData.questions.length }}</span>
            <Progress :model-value="scorePercentage" class="w-full" />
             <span class="text-lg font-semibold">{{ scorePercentage.toFixed(0) }}%</span>
          </div>
          
          <Separator class="my-6" />

          <h3 class="mb-4 text-lg font-semibold">Detailed Breakdown</h3>
          <div class="space-y-6">
            <div v-for="(question, index) in unitData.questions" :key="`result-${question.id}`">
              <p class="mb-2">
                <span class="font-bold">Q{{ index + 1 }}:</span> {{ question.text }}
              </p>
              
              <div v-if="userAnswers[question.id] === question.correctAnswer" class="flex items-start gap-3 rounded-md border border-green-500 bg-green-50 p-4">
                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-green-600" />
                <div class="flex-grow">
                  <p class="font-semibold text-green-800">Correct!</p>
                  <p class="text-sm text-green-700">Your answer: <span class="font-medium">{{ getOptionLabel(question, userAnswers[question.id]) }}</span></p>
                </div>
              </div>
              
              <div v-else class="flex items-start gap-3 rounded-md border border-red-500 bg-red-50 p-4">
                <XCircle class="h-5 w-5 flex-shrink-0 text-red-600" />
                <div class="flex-grow">
                  <p class="font-semibold text-red-800">Incorrect</p>
                  <p class="text-sm text-red-700">Your answer: <span class="font-medium">{{ getOptionLabel(question, userAnswers[question.id]) }}</span></p>
                  <p class="text-sm text-red-700">Correct answer: <span class="font-medium">{{ getOptionLabel(question, question.correctAnswer) }}</span></p>
                  <Alert class="mt-3 border-blue-300 bg-blue-50 text-blue-800">
                    <BrainCircuit class="h-4 w-4 text-blue-600" />
                    <AlertTitle class="font-semibold text-blue-900">Explanation</AlertTitle>
                    <AlertDescription class="text-blue-800">
                      {{ question.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>
