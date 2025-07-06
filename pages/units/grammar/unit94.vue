<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming these are part of a component library like shadcn-vue
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/27")
}
function goToNextUnit() {
  router.push("/units/grammar/29")
}

// --- Page State Management ---
const showResult = ref(false)

type ValidationStatus = 'pending' | 'correct' | 'incorrect'
interface Question {
  id: number
  type: 'combine' | 'fill' | 'correct'
  prompt: string
  detail?: string
  userAnswer: string
  correctAnswers: string[]
  explanation: string
  status: ValidationStatus
}

// --- Practice Questions Data ---
// These questions are designed to be challenging, testing nuances of non-defining relative clauses.
const questions = ref<Question[]>([
  {
    id: 1,
    type: 'combine',
    prompt: 'Combine these two sentences into one, using an extra information (non-defining) relative clause.',
    detail: 'My neighbor has won the lottery. I don\'t know him very well.',
    userAnswer: '',
    correctAnswers: [
      'My neighbor, who I don\'t know very well, has won the lottery.',
      'My neighbor, whom I don\'t know very well, has won the lottery.'
    ],
    explanation: 'The extra information is "I don\'t know him very well". We place this inside commas after "My neighbor". Since "neighbor" is a person, we use "who" or the more formal "whom" as the object pronoun.',
    status: 'pending'
  },
  {
    id: 2,
    type: 'combine',
    prompt: 'Combine these two sentences into one, using an extra information (non-defining) relative clause.',
    detail: 'This hotel was recommended to me by Julia. It is a very luxurious hotel.',
    userAnswer: '',
    correctAnswers: [
      'This hotel, which was recommended to me by Julia, is very luxurious.',
    ],
    explanation: 'The extra information is "was recommended to me by Julia". We place this inside commas after "This hotel". Since "hotel" is a thing, we must use "which". Using "that" is incorrect in non-defining clauses.',
    status: 'pending'
  },
  {
    id: 3,
    type: 'correct',
    prompt: 'Find and correct the mistake in the following sentence.',
    detail: 'The professor that gave the lecture on astrophysics is my aunt.',
    userAnswer: '',
    correctAnswers: [
      'The professor, who gave the lecture on astrophysics, is my aunt.'
    ],
    explanation: 'This sentence provides extra, non-essential information about the professor. Therefore, it requires commas around the clause and the use of "who" instead of "that". "That" cannot be used in non-defining clauses.',
    status: 'pending'
  },
  {
    id: 4,
    type: 'combine',
    prompt: 'Combine these two sentences into one, using an extra information (non-defining) relative clause.',
    detail: 'I often visit the small town. I was born there.',
    userAnswer: '',
    correctAnswers: [
      'I often visit the small town, where I was born.',
    ],
    explanation: 'The relative clause modifies "the small town". Since the original sentence uses "there", we use "where" to refer to the place.',
    status: 'pending'
  },
  {
    id: 5,
    type: 'fill',
    prompt: 'Complete the sentence with the correct relative pronoun (who, whom, whose, which, where).',
    detail: 'Our new manager, __________ previous experience is in marketing, has some innovative ideas.',
    userAnswer: '',
    correctAnswers: ['whose'],
    explanation: 'We need a possessive relative pronoun here because we are talking about the manager\'s experience (the experience of the manager). "Whose" is the correct choice to show possession for people.',
    status: 'pending'
  },
  {
    id: 6,
    type: 'correct',
    prompt: 'Find and correct the mistake in the following sentence.',
    detail: 'We had fish and chips which is a popular meal in Britain.',
    userAnswer: '',
    correctAnswers: [
      'We had fish and chips, which is a popular meal in Britain.'
    ],
    explanation: 'The clause "which is a popular meal in Britain" is extra information about "fish and chips". It needs to be separated by a comma. In this case, "which" refers to the entire idea of having fish and chips.',
    status: 'pending'
  },
  {
    id: 7,
    type: 'combine',
    prompt: 'Combine these two sentences into one, using an extra information (non-defining) relative clause.',
    detail: 'Margaret is a very reliable person. I have known her for years.',
    userAnswer: '',
    correctAnswers: [
      'Margaret, who I have known for years, is a very reliable person.',
      'Margaret, whom I have known for years, is a very reliable person.'
    ],
    explanation: 'The extra information "I have known her for years" is placed after "Margaret". We use "who" or "whom" because Margaret is the object of the verb "known". Both are correct, with "whom" being more formal.',
    status: 'pending'
  }
])

// --- Validation and Scoring Logic ---

// Normalizes an answer for comparison (lowercase, trims whitespace, removes trailing punctuation).
const normalizeAnswer = (str: string) => {
  return str.trim().toLowerCase().replace(/[.,!?;]$/, '')
}

const validateAnswers = () => {
  questions.value.forEach(q => {
    const userNormalized = normalizeAnswer(q.userAnswer)
    const isCorrect = q.correctAnswers.some(correct => normalizeAnswer(correct) === userNormalized)
    q.status = isCorrect ? 'correct' : 'incorrect'
  })
  showResult.value = true
}

const resetTest = () => {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.status = 'pending'
  })
  // Scroll to the top of the practice section
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}

const score = computed(() => {
  return questions.value.filter(q => q.status === 'correct').length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

const resultTitle = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Excellent Work! A Perfect Score!"
  if (percentage >= 75) return "Great Job! You have a strong understanding."
  if (percentage >= 50) return "Good Effort! Review the explanations to improve."
  return "Keep Practicing. Repetition is key to mastery."
})

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the book by Raymond Murphy."
    unit-title="Unit 28: Relative clauses 4"
    unit-description="Extra information clauses (1) - Non-defining relative clauses."
    :categories="['Grammar', 'Clauses', 'Intermediate', 'Advanced']"
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
          <CardTitle>Core Concept: Extra Information</CardTitle>
          <CardDescription>Understanding non-defining relative clauses.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            An extra information clause, also known as a <strong>non-defining relative clause</strong>, gives us additional, non-essential information about a noun. If you remove this clause, the main sentence still makes complete sense.
          </p>
          <p class="font-semibold">
            Think of it as a side comment or a piece of trivia you add into a sentence.
          </p>
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>The Three Golden Rules</AlertTitle>
            <AlertDescription>
              <ol class="list-decimal pl-5 space-y-2 mt-2">
                <li><strong>Always use commas:</strong> These clauses are always separated from the rest of the sentence by commas.</li>
                <li><strong>Never use 'that':</strong> You must use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">who</code> (for people) or <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">which</code> (for things). You cannot use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">that</code>.</li>
                <li><strong>Never omit the pronoun:</strong> You cannot leave out the relative pronoun (<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">who</code>, <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">which</code>, <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">whose</code>, etc.).</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Examples in Context</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div class="p-4 border rounded-md">
            <p class="text-muted-foreground">Two sentences:</p>
            <p>My sister is a software engineer. She lives in San Francisco.</p>
            <p class="mt-2 text-muted-foreground">Combined sentence:</p>
            <p>My sister, <strong>who lives in San Francisco</strong>, is a software engineer.</p>
            <p class="text-xs mt-1 italic">The information "who lives in San Francisco" is extra. The main point is that my sister is a software engineer.</p>
          </div>
          <div class="p-4 border rounded-md">
            <p class="text-muted-foreground">Two sentences:</p>
            <p>The Eiffel Tower is one of the world's most famous landmarks. It was completed in 1889.</p>
            <p class="mt-2 text-muted-foreground">Combined sentence:</p>
            <p>The Eiffel Tower, <strong>which was completed in 1889</strong>, is one of the world's most famous landmarks.</p>
            <p class="text-xs mt-1 italic">We already know which tower we're talking about. The completion date is extra information.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Apply the rules. Pay close attention to pronouns and punctuation.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(question, index) in questions" :key="question.id">
              <div class="flex flex-col gap-2">
                <label :for="`q-${question.id}`" class="text-sm font-medium">
                  Question {{ index + 1 }}
                </label>
                <p class="text-sm text-muted-foreground">{{ question.prompt }}</p>
                <p v-if="question.detail" class="p-3 bg-muted rounded-md text-sm font-mono">{{ question.detail }}</p>
                <Textarea
                  :id="`q-${question.id}`"
                  v-model="question.userAnswer"
                  placeholder="Type your answer here..."
                  class="min-h-[60px]"
                  :disabled="showResult"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <Button v-if="showResult" variant="outline" @click="resetTest">Try Again</Button>
            <Button @click="validateAnswers" :disabled="showResult">Check Answers</Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">{{ resultTitle }}</CardTitle>
          <CardDescription>You scored {{ score }} out of {{ totalQuestions }} correctly.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <Progress :model-value="scorePercentage" class="w-full" />
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Feedback</h3>
            <div v-for="question in questions" :key="`result-${question.id}`">
              <Alert :variant="question.status === 'correct' ? 'default' : 'destructive'" class="bg-opacity-20">
                <component
                  :is="question.status === 'correct' ? CheckCircle : XCircle"
                  class="h-5 w-5"
                  :class="{ 'text-green-600': question.status === 'correct', 'text-red-600': question.status === 'incorrect' }"
                />
                <AlertTitle class="font-bold">
                  Question {{ question.id }}: {{ question.status === 'correct' ? 'Correct' : 'Incorrect' }}
                </AlertTitle>
                <AlertDescription class="space-y-3 mt-2">
                  <div>
                    <p class="text-xs font-semibold uppercase text-muted-foreground">Your Answer</p>
                    <p class="italic">"{{ question.userAnswer || 'No answer provided' }}"</p>
                  </div>
                  <div v-if="question.status === 'incorrect'">
                    <p class="text-xs font-semibold uppercase text-muted-foreground">Correct Answer(s)</p>
                    <ul class="list-disc pl-5">
                      <li v-for="ans in question.correctAnswers" :key="ans" class="font-medium text-green-700 dark:text-green-400">
                        {{ ans }}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p class="text-xs font-semibold uppercase text-muted-foreground">Explanation</p>
                    <p>{{ question.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button variant="outline" @click="resetTest">Practice Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* A simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
