
<!--
  File: @/pages/units/grammar/5.vue
  Unit: 5 - Conjunctions of Contrast
  Description: An advanced practice module for mastering contrast connectors,
  inspired by Raymond Murphy's "English Grammar in Use". This page provides
  in-depth explanations, challenging exercises, and a powerful validation system
  to foster deep grammatical understanding.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming these are Shadcn/ui components, which are excellent for this purpose.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BarChart, BookOpen, BrainCircuit, RefreshCw } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageMeta = {
  testTitle: 'Advanced English Grammar Practice',
  testDescription: 'Based on "English Grammar In Use" by Raymond Murphy',
  unitNumber: 5,
  unitTitle: 'Unit 5: Although, Though, Even though, In spite of, Despite',
  unitDescription: 'Mastering the art of expressing contrast and unexpected outcomes in complex sentences. This unit focuses on the structural and semantic differences between these crucial connectors.',
  categories: ['Conjunctions', 'Prepositions', 'Sentence Structure', 'Advanced Contrast'],
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real application, you would have a dynamic way to determine the previous unit.
  router.push(`/units/grammar/4`)
}
function goToNextUnit() {
  // Similarly, the next unit would be determined dynamically.
  router.push(`/units/grammar/6`)
}

// --- Question & State Management ---
// Type definition for a more robust and maintainable question structure.
type QuestionType = 'mcq' | 'rewrite' | 'fill'
interface Question {
  id: number
  type: QuestionType
  question: string
  prompt: string
  options?: { value: string; label: string }[]
  studentAnswer: string
  correctAnswers: string[]
  isCorrect?: boolean
  explanation: string
}

const isSubmitted = ref(false)

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'mcq',
    question: "Select the grammatically correct and most natural-sounding option to complete the sentence.",
    prompt: "______ a significant drop in profits, the company decided to give all its employees a bonus.",
    options: [
      { value: 'Although', label: 'Although' },
      { value: 'Despite', label: 'Despite' },
      { value: 'Even though', label: 'Even though' },
      { value: 'Despite of', label: 'Despite of' },
    ],
    studentAnswer: '',
    correctAnswers: ['Despite'],
    explanation: "The correct answer is 'Despite'. The phrase 'a significant drop in profits' is a noun phrase. 'Despite' and 'In spite of' are prepositions used before nouns or -ing forms. 'Although' and 'Even though' are conjunctions that must be followed by a clause (subject + verb). 'Despite of' is a common but incorrect formation; 'despite' is never followed by 'of'."
  },
  {
    id: 2,
    type: 'rewrite',
    question: "Rewrite the following sentence using the word in brackets. Do not change the meaning.",
    prompt: "She managed to write a bestselling novel although she had no previous writing experience. (in spite of)",
    studentAnswer: '',
    correctAnswers: [
        'in spite of having no previous writing experience, she managed to write a bestselling novel.', 
        'she managed to write a bestselling novel in spite of having no previous writing experience.',
        'in spite of her lack of previous writing experience, she managed to write a bestselling novel.'
    ],
    explanation: "This tests your ability to transform the structure. 'Although' is followed by a clause ('she had...'). 'In spite of' must be followed by a noun phrase or a gerund (-ing form). The clause 'she had no previous writing experience' can be transformed into the gerund phrase 'having no previous writing experience' or the noun phrase 'her lack of previous writing experience'."
  },
  {
    id: 3,
    type: 'fill',
    question: "Complete the sentence with ONE or TWO words that fit the grammatical structure.",
    prompt: "______ he had studied diligently for months, he found the final exam incredibly difficult.",
    studentAnswer: '',
    correctAnswers: ['although', 'even though'],
    explanation: "'Although' or 'Even though' are the correct choices. Both are subordinating conjunctions that introduce a contrast clause (subject 'he' + verb 'had studied'). 'Even though' adds more emphasis to the surprising contrast. 'Despite' or 'In spite of' would be incorrect as they cannot be followed by a full clause like this."
  },
  {
    id: 4,
    type: 'mcq',
    question: "Identify the sentence where 'though' is used as an adverb.",
    prompt: "",
    options: [
        { value: 'A', label: 'A) Though it was late, we continued to work.' },
        { value: 'B', label: 'B) The car is old. It\'s very reliable, though.' },
        { value: 'C', label: 'C) We went out, even though the weather was awful.' },
        { value: 'D', label: 'D) He decided to go, though I advised him not to.' }
    ],
    studentAnswer: '',
    correctAnswers: ['B'],
    explanation: "This is a subtle but important distinction. In sentence B, 'though' is used as an adverb, typically at the end of a sentence, meaning 'however' or 'nevertheless'. In sentences A and D, 'though' is a conjunction connecting two clauses. Sentence C uses 'even though', which is also a conjunction."
  },
  {
    id: 5,
    type: 'rewrite',
    question: "Combine the two sentences into one, starting with the word provided.",
    prompt: "The traffic was terrible. We arrived at the airport on time. (Despite)",
    studentAnswer: '',
    correctAnswers: ['despite the terrible traffic, we arrived at the airport on time.'],
    explanation: "To use 'Despite', you must convert the first sentence ('The traffic was terrible') into a noun phrase. The most direct conversion is 'the terrible traffic'. 'Despite' is then placed before this noun phrase to create the introductory contrast phrase."
  }
])

// --- Validation & Scoring Logic ---
const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

function validateAnswers() {
  questions.value.forEach(q => {
    const cleanedStudentAnswer = q.studentAnswer.trim().toLowerCase().replace(/\.$/, '')
    const isAnswerCorrect = q.correctAnswers.some(correct => cleanedStudentAnswer === correct.trim().toLowerCase().replace(/\.$/, ''))
    q.isCorrect = isAnswerCorrect
  })
  isSubmitted.value = true
  // Scroll to results for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetQuiz() {
  isSubmitted.value = false
  questions.value.forEach(q => {
    q.studentAnswer = ''
    q.isCorrect = undefined
  })
   window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <!-- ======================================================================= -->
    <!-- #material: The Core Concepts (The "Teacher's Lecture")                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Principle: Clause vs. Noun Phrase</CardTitle>
            <CardDescription>Understanding this distinction is the key to mastery.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">Rule 1: Use with Clauses (Subject + Verb)</h4>
            <p class="text-muted-foreground">
              <code class="font-bold text-primary">Although</code>, <code class="font-bold text-primary">Though</code>, and <code class="font-bold text-primary">Even though</code> are conjunctions. They connect two parts of a sentence and must be followed by a clause.
            </p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li><strong class="text-foreground">Although</strong> it rained, we enjoyed the picnic.</li>
              <li><strong class="text-foreground">Even though</strong> she studied hard, she failed the exam. (stronger emphasis)</li>
              <li>He felt unwell, <strong class="text-foreground">though</strong> he went to work. ('Though' is common in speaking and can come after the main clause).</li>
            </ul>
          </div>
          <div class="border-t pt-4">
            <h4 class="font-semibold text-base mb-2">Rule 2: Use with Nouns or Gerunds (-ing)</h4>
            <p class="text-muted-foreground">
              <code class="font-bold text-primary">In spite of</code> and <code class="font-bold text-primary">Despite</code> are prepositions. They must be followed by a noun, a pronoun, or a verb in its -ing form (a gerund).
            </p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li><strong class="text-foreground">In spite of</strong> the rain, we enjoyed the picnic.</li>
              <li><strong class="text-foreground">Despite</strong> her hard studies, she failed the exam. (Incorrect: <del>Despite of</del>)</li>
              <li>They went for a swim <strong class="text-foreground">despite</strong> being tired.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
       <Card class="w-full bg-amber-50 border-amber-200">
        <CardHeader class="flex flex-row items-center gap-4">
            <BrainCircuit class="h-8 w-8 text-amber-600" />
            <div>
              <CardTitle class="text-amber-900">Advanced Nuances & Common Errors</CardTitle>
              <CardDescription class="text-amber-700">Tips from seasoned instructors.</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="space-y-3 text-sm text-amber-800">
          <p><strong>'Though' as an Adverb:</strong> 'Though' can be used at the end of a sentence, meaning 'however'. Example: "His plan was risky. We tried it, <strong class="text-foreground">though</strong>."</p>
          <p><strong>The 'Despite of' Trap:</strong> A very common error. Remember: <strong class="text-foreground">NEVER</strong> use 'of' after 'despite'. It's 'in spite of' or simply 'despite'.</p>
          <p><strong>Transforming Clauses:</strong> A key skill is turning a clause into a noun phrase. "Although he was ill..." becomes "Despite his illness...". "Even though she had little money..." becomes "In spite of having little money...".</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Challenge                                    -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Unit 5 Practice Exercises</CardTitle>
          <CardDescription>Apply the concepts. Read each question carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-4">
            <p class="font-semibold text-md">{{ index + 1 }}. {{ q.question }}</p>
            <p class="text-lg font-mono bg-slate-100 p-4 rounded-md text-slate-800" v-if="q.prompt">{{ q.prompt }}</p>
            
            <!-- MCQ Renderer -->
            <div v-if="q.type === 'mcq'">
              <RadioGroup v-model="q.studentAnswer" :disabled="isSubmitted">
                <div v-for="option in q.options" :key="option.value" class="flex items-center space-x-2 mb-2">
                  <RadioGroupItem :id="`${q.id}-${option.value}`" :value="option.value" />
                  <Label :for="`${q.id}-${option.value}`" class="text-base">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Rewrite / Fill Renderer -->
            <div v-if="q.type === 'rewrite' || q.type === 'fill'">
              <Input
                type="text"
                v-model="q.studentAnswer"
                placeholder="Type your answer here..."
                :disabled="isSubmitted"
                class="text-base"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="isSubmitted" class="w-full" size="lg">
            Check My Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The "Awesome" Validator & Feedback Loop                      -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full border-blue-200 bg-blue-50">
        <CardHeader>
          <div class="flex items-center gap-4">
            <BarChart class="h-10 w-10 text-blue-600" />
            <div>
              <CardTitle class="text-2xl text-blue-900">Your Results & Analysis</CardTitle>
              <CardDescription class="text-blue-700">"The greatest mistake you can make is to be afraid of making one."</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="text-center p-6 bg-white rounded-lg shadow">
            <h3 class="text-lg font-medium text-slate-600">Your Score</h3>
            <p class="text-6xl font-bold text-blue-700 my-2">{{ score }} / {{ totalQuestions }}</p>
             <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: scorePercentage + '%' }"></div>
              </div>
            <p class="text-slate-500 mt-2">{{ scorePercentage }}% Correct</p>
          </div>
          
          <h3 class="text-xl font-semibold text-slate-800 border-t pt-6">Detailed Question Breakdown</h3>
          <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="p-4 rounded-lg border" :class="q.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
            <p class="font-semibold">{{ index + 1 }}. {{ q.prompt || q.question }}</p>
            <div class="mt-3 flex items-start gap-3">
              <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 mt-1 flex-shrink-0" :class="q.isCorrect ? 'text-green-600' : 'text-red-600'" />
              <div>
                <p class="text-sm font-medium" :class="q.isCorrect ? 'text-green-800' : 'text-red-800'">
                  Your answer: <code class="p-1 rounded bg-white/60">{{ q.studentAnswer || 'No answer' }}</code>
                </p>
                <p v-if="!q.isCorrect" class="text-sm font-medium mt-1 text-slate-800">
                  Correct answer(s): <code class="p-1 rounded bg-white/60">{{ q.correctAnswers.join(' or ') }}</code>
                </p>
              </div>
            </div>
            <Alert class="mt-4 bg-white">
              <BookOpen class="h-4 w-4" />
              <AlertTitle class="font-bold">Explanation</AlertTitle>
              <AlertDescription class="text-slate-700">
                {{ q.explanation }}
              </AlertDescription>
            </Alert>
          </div>

        </CardContent>
         <CardFooter class="flex justify-center">
            <Button @click="resetQuiz" variant="outline" size="lg">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try This Unit Again
            </Button>
          </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
