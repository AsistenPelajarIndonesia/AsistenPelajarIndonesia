<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components for rich feedback
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Core State Management ---

/**
 * @typedef {Object} PracticeQuestion
 * @property {number} id - Unique identifier for the question.
 * @property {'fill-in' | 'multiple-choice' | 'sentence-correction'} type - The type of question.
 * @property {string} prompt - The main question text, often with placeholders.
 * @property {string} [context] - Optional additional context or a lead-in sentence.
 * @property {Array<string>} [options] - An array of choices for multiple-choice questions.
 * @property {string | Array<string>} correctAnswer - The correct answer(s). Can be an array for multiple valid inputs.
 * @property {string} explanation - A detailed explanation of the grammar rule being tested.
 * @property {string} userAnswer - The user's submitted answer.
 * @property {boolean | null} isCorrect - Validation state: null=untouched, true=correct, false=incorrect.
 */

const questions = reactive<PracticeQuestion[]>([
  {
    id: 1,
    type: 'fill-in',
    context: 'Mount Everest is renowned globally. In fact, it is __________ (high) mountain in the world.',
    prompt: 'Complete the sentence using the superlative form of the adjective in parentheses.',
    userAnswer: '',
    correctAnswer: 'the highest',
    isCorrect: null,
    explanation: 'For one-syllable adjectives like "high", we form the superlative by adding "-est" and preceding it with "the". The structure is "the + adjective-est".',
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: 'Of all the movies I\'ve seen this year, this one was by far __________.',
    options: ['the most enjoyable', 'the enjoyablest', 'most enjoyable', 'more enjoyable'],
    userAnswer: '',
    correctAnswer: 'the most enjoyable',
    isCorrect: null,
    explanation: 'For adjectives with three or more syllables like "enjoyable", we form the superlative using "the most". "The enjoyablest" is incorrect. "Most enjoyable" without "the" can mean "very enjoyable" but is not the correct superlative form in this comparative context. "More enjoyable" is a comparative, not a superlative.',
  },
  {
    id: 3,
    type: 'sentence-correction',
    prompt: 'Identify and correct the error in the following sentence: "This is the goodest cake I have ever tasted."',
    userAnswer: '',
    correctAnswer: ['the best', 'This is the best cake I have ever tasted.'],
    isCorrect: null,
    explanation: '"Good" is an irregular adjective. Its comparative form is "better" and its superlative form is "the best". "Goodest" is a common error but is not a word in standard English.',
  },
  {
    id: 4,
    type: 'fill-in',
    context: 'The final exam was difficult, but the history section was __________ (challenging) part for me.',
    prompt: 'Complete the sentence with the correct superlative form.',
    userAnswer: '',
    correctAnswer: 'the most challenging',
    isCorrect: null,
    explanation: 'Adjectives ending in "-ing", like "challenging", are treated as long adjectives. Therefore, we use "the most" to form the superlative.',
  },
  {
    id: 5,
    type: 'multiple-choice',
    prompt: 'What is __________ river in Africa?',
    options: ['the longer', 'the long', 'the longest', 'a longest'],
    userAnswer: '',
    correctAnswer: 'the longest',
    isCorrect: null,
    explanation: 'When comparing more than two items (all rivers in Africa), the superlative form "the longest" is required. We use the preposition "in" for places or geographical areas (e.g., "in the world", "in our class", "in Africa").',
  },
  {
    id: 6,
    type: 'sentence-correction',
    prompt: 'Find and correct the grammatical mistake: "She is the most smart person in the room."',
    userAnswer: '',
    correctAnswer: ['the smartest', 'She is the smartest person in the room.'],
    isCorrect: null,
    explanation: '"Smart" is a one-syllable adjective. While some two-syllable adjectives can use "the most", one-syllable adjectives almost always take "-est". Therefore, "the smartest" is the standard and preferred form.',
  },
  {
    id: 7,
    type: 'fill-in',
    context: 'I\'ve had many bad days this month, but yesterday was __________ (bad) of all.',
    prompt: 'Complete the sentence using the correct irregular superlative.',
    userAnswer: '',
    correctAnswer: 'the worst',
    isCorrect: null,
    explanation: '"Bad" is an irregular adjective. Its superlative form is "the worst". The comparative is "worse".',
  },
  {
    id: 8,
    type: 'multiple-choice',
    prompt: 'My new laptop is powerful, but it\'s also __________ one I could find.',
    options: ['the least expensive', 'the less expensive', 'the non-expensive', 'the expensiveless'],
    userAnswer: '',
    correctAnswer: 'the least expensive',
    isCorrect: null,
    explanation: 'To form the "negative" superlative, we use "the least" followed by the adjective. This is the opposite of "the most". "The less expensive" is a comparative form.',
  },
])

const showResult = ref(false)
const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  // Unit 0 is the first, so this action is illustrative.
  // In a real app, this button might be disabled.
  alert('You are on the first unit.')
}

function goToNextUnit() {
  router.push('/units/grammar/1')
}

// --- Validation and Scoring Logic ---
function validateAnswers() {
  questions.forEach((q) => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\.$/, '')
    if (Array.isArray(q.correctAnswer)) {
      // If any of the possible correct answers match, it's correct
      q.isCorrect = q.correctAnswer.some(ans => userAnswerCleaned.includes(ans.toLowerCase()))
    }
    else {
      const correctAnswerCleaned = q.correctAnswer.trim().toLowerCase()
      q.isCorrect = userAnswerCleaned === correctAnswerCleaned
    }
  })
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

const score = computed(() => {
  return questions.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

const feedbackMessage = computed(() => {
  if (scorePercentage.value === 100) {
    return { title: 'Exceptional Work!', message: 'You have a masterful command of superlatives. Your understanding of regular, irregular, and nuanced forms is perfect.' }
  } else if (scorePercentage.value >= 80) {
    return { title: 'Excellent!', message: 'A very strong performance. Review the explanations for any missed questions to solidify your knowledge.' }
  } else if (scorePercentage.value >= 60) {
    return { title: 'Good Effort!', message: 'You have a solid foundation. Pay close attention to the detailed explanations to clear up any confusion, especially with irregular forms.' }
  } else {
    return { title: 'Needs Review', message: 'There are some key concepts to review. Go over the learning materials and the explanations below carefully. Practice makes perfect!' }
  }
})

// --- Layout Configuration ---
const layoutProps = {
  testTitle: 'English Grammar In Use: Practice',
  testDescription: 'Advanced exercises based on the teachings of Raymond Murphy and other grammar experts.',
  unitTitle: 'Unit 0: Superlatives (the longest, the most enjoyable etc.)',
  unitDescription: 'This unit focuses on forming and using superlative adjectives to compare three or more things, highlighting common rules, irregular forms, and contextual usage.',
  categories: ['Adjectives', 'Comparison', 'Superlatives', 'Intermediate'],
}
</script>

<template>
  <GrammarLayout
    v-bind="layoutProps"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Principle: Forming Superlatives</CardTitle>
            <CardDescription>The fundamental rules for creating the highest degree of an adjective.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold">Short Adjectives (1 syllable)</h4>
            <p class="text-muted-foreground">Add <code class="font-mono text-foreground">the ...-est</code>. If it ends in -e, just add -st. If it ends in consonant-vowel-consonant, double the final consonant.</p>
            <ul class="mt-2 list-inside list-disc pl-2">
              <li>old → <span class="font-semibold text-primary">the oldest</span></li>
              <li>large → <span class="font-semibold text-primary">the largest</span></li>
              <li>big → <span class="font-semibold text-primary">the biggest</span></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">Two-Syllable Adjectives ending in -y</h4>
            <p class="text-muted-foreground">Change -y to -i and add <code class="font-mono text-foreground">-est</code>.</p>
            <ul class="mt-2 list-inside list-disc pl-2">
              <li>happy → <span class="font-semibold text-primary">the happiest</span></li>
              <li>easy → <span class="font-semibold text-primary">the easiest</span></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">Long Adjectives (2+ syllables, not ending in -y)</h4>
            <p class="text-muted-foreground">Use <code class="font-mono text-foreground">the most ...</code> before the adjective. Do not change the adjective itself.</p>
            <ul class="mt-2 list-inside list-disc pl-2">
              <li>modern → <span class="font-semibold text-primary">the most modern</span></li>
              <li>expensive → <span class="font-semibold text-primary">the most expensive</span></li>
              <li>interesting → <span class="font-semibold text-primary">the most interesting</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card class="border-amber-500/50">
        <CardHeader class="flex flex-row items-center gap-4">
          <BrainCircuit class="h-8 w-8 text-amber-500" />
          <div>
            <CardTitle>Key Exceptions & Irregular Forms</CardTitle>
            <CardDescription>These do not follow the rules and must be memorized.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul class="list-inside space-y-2 text-sm">
            <li>good → <span class="font-semibold text-amber-600">the best</span></li>
            <li>bad → <span class="font-semibold text-amber-600">the worst</span></li>
            <li>far → <span class="font-semibold text-amber-600">the farthest / the furthest</span></li>
          </ul>
          <Alert variant="default" class="mt-4">
            <AlertTitle class="font-semibold">Contextual Nuance: `most` vs `the most`</AlertTitle>
            <AlertDescription>
              Be careful! "Most" without "the" often means "the majority of". <br>
              e.g., "<span class="italic">Most people</span> enjoy music." (Not a superlative) vs. "He is <span class="italic">the most popular</span> person." (Superlative)
            </AlertDescription>
          </Alert>
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
          <CardDescription>Apply your knowledge. Read each question carefully before answering.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-3">
            <p class="font-semibold">Question {{ index + 1 }}</p>
            <p v-if="question.context" class="text-muted-foreground italic">"{{ question.context }}"</p>
            <Label :for="`q-${question.id}`" class="text-base">{{ question.prompt }}</Label>
            
            <div v-if="question.type === 'fill-in' || question.type === 'sentence-correction'">
              <Input
                :id="`q-${question.id}`"
                v-model="question.userAnswer"
                placeholder="Your answer..."
                :disabled="showResult"
              />
            </div>
            
            <div v-if="question.type === 'multiple-choice'">
              <RadioGroup
                :id="`q-${question.id}`"
                v-model="question.userAnswer"
                :disabled="showResult"
                class="gap-3"
              >
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button v-if="!showResult" size="lg" @click="validateAnswers">
            Check Answers & Get Feedback
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="bg-card">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>Here is a detailed breakdown of your performance.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <Alert :class="scorePercentage === 100 ? 'border-green-500' : 'border-blue-500'">
              <AlertTitle class="text-lg font-bold">{{ feedbackMessage.title }}</AlertTitle>
              <AlertDescription>
                You scored <span class="font-bold">{{ score }} / {{ totalQuestions }} ({{ scorePercentage }}%)</span>.
                {{ feedbackMessage.message }}
              </AlertDescription>
            </Alert>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Detailed Answer Review</h3>
              <div
                v-for="(question, index) in questions"
                :key="`result-${question.id}`"
                class="rounded-lg border p-4"
                :class="[question.isCorrect ? 'border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800/40' : 'border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800/40']"
              >
                <div class="flex items-start justify-between gap-4">
                  <p class="flex-1 font-semibold">Q{{ index + 1 }}: {{ question.prompt }}</p>
                  <CheckCircle2 v-if="question.isCorrect" class="h-6 w-6 flex-shrink-0 text-green-600" />
                  <XCircle v-else class="h-6 w-6 flex-shrink-0 text-red-600" />
                </div>
                <div class="mt-3 space-y-3 pl-2 text-sm">
                  <div>
                    <span class="font-semibold text-muted-foreground">Your Answer: </span>
                    <span :class="[question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400', 'italic font-medium']">
                      "{{ question.userAnswer || 'No answer provided' }}"
                    </span>
                  </div>
                  <div v-if="!question.isCorrect">
                    <span class="font-semibold text-muted-foreground">Correct Answer: </span>
                    <span class="font-medium italic text-primary">
                      "{{ Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer }}"
                    </span>
                  </div>
                  <Separator class="my-3" />
                  <div>
                     <p class="font-semibold text-muted-foreground">Explanation:</p>
                     <p class="mt-1 text-foreground/90">{{ question.explanation }}</p>
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
