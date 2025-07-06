<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL - The learning content, rules, and examples.           -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Duration vs. Point in Time</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p>
            This unit focuses on expressing periods of time. The fundamental mistake students make is confusing a
            <em>duration</em> (a length of time) with a <em>specific point</em> in time.
          </p>

          <h4>1. Using <code>for</code> and <code>since</code> with Perfect Tenses</h4>
          <p>
            Both <code>for</code> and <code>since</code> are used to describe something that started in the past and
            continues to the present. They are most commonly used with the <strong>Present Perfect</strong> and
            <strong>Present Perfect Continuous</strong> tenses.
          </p>
          <ul>
            <li>
              <strong><code>for</code></strong> is followed by a <strong>period of time</strong> (e.g.,
              <em>three days, two years, ten minutes, a long time</em>).
            </li>
            <li>
              <strong><code>since</code></strong> is followed by a <strong>point in time</strong> (e.g.,
              <em>Monday, 9am, 2021, I was a child</em>).
            </li>
          </ul>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p class="font-semibold">Examples with `for` (Duration)</p>
              <ul>
                <li>Sarah has been living in Paris <strong>for</strong> three years.</li>
                <li>I haven't seen Tom <strong>for</strong> a few months.</li>
                <li>We've been waiting <strong>for</strong> over an hour.</li>
              </ul>
            </div>
            <div>
              <p class="font-semibold">Examples with `since` (Start Point)</p>
              <ul>
                <li>Sarah has been living in Paris <strong>since</strong> 2021.</li>
                <li>I haven't seen Tom <strong>since</strong> our graduation.</li>
                <li>We've been waiting <strong>since</strong> 9 o'clock.</li>
              </ul>
            </div>
          </div>
          <Alert variant="destructive">
             <AlertTitle>Common Error</AlertTitle>
             <AlertDescription>
                Do not use <code>for</code> or <code>since</code> with the Simple Past for actions that are finished.
                <br>
                <em class="line-through">I lived in London for two years.</em> (Implies I don't live there now, this is correct usage for finished periods)
                <br>
                <em class="font-bold">I have lived in London for two years.</em> (Implies I still live there now)
             </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Asking the Right Question</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h4>2. <code>When...?</code> vs. <code>How long...?</code></h4>
          <p>
            This is a critical distinction that even advanced learners struggle with. The question you ask determines
            the tense of the answer.
          </p>
          <ul>
            <li>
              <strong><code>When...?</code></strong> asks about the <strong>start point</strong>. The answer uses the
              <strong>Simple Past</strong> tense.
            </li>
            <li>
              <strong><code>How long...?</code></strong> asks about the <strong>duration</strong>. The answer uses the
              <strong>Present Perfect</strong> (or Continuous) tense.
            </li>
          </ul>

          <p class="font-semibold">Example Dialogue:</p>
          <blockquote>
            <p><strong>A:</strong> <strong>When</strong> did you start learning English?</p>
            <p><strong>B:</strong> I <strong>started</strong> learning English five years ago.</p>
            <p><strong>A:</strong> So, <strong>how long</strong> have you been learning English?</p>
            <p><strong>B:</strong> I'<strong>ve been learning</strong> English <strong>for</strong> five years.</p>
          </blockquote>

          <Alert>
             <AlertTitle>Teacher's Insight</AlertTitle>
             <AlertDescription>
                Think of it like this: <code>When?</code> is a snapshot camera, capturing a single moment in the past. <code>How long?</code> is a video camera, recording from the past all the way to the present moment.
             </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE - The interactive questions for the student.           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 5: Practice Exercises</CardTitle>
          <CardDescription>
            Read each question carefully. Some questions test your knowledge of tenses as well as
            <code>for/since</code>.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="mb-2 font-medium">
              {{ index + 1 }}.
              <span v-html="question.text"></span>
            </p>
            <!-- Fill-in-the-blank Input -->
            <Input
              v-if="question.type === 'fill-in'"
              v-model="question.userAnswer"
              :placeholder="question.placeholder"
              class="max-w-sm"
              :disabled="showResult"
            />
            <!-- Multiple Choice Radio Group -->
            <RadioGroup
              v-if="question.type === 'multiple-choice'"
              v-model="question.userAnswer"
              :disabled="showResult"
            >
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="flex gap-4">
             <Button @click="validateAnswers" :disabled="showResult">Check Answers</Button>
             <Button variant="outline" @click="resetTest" v-if="showResult">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT - The feedback and scoring section.                        -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
         <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
                <span v-if="scorePercentage === 100">Flawless victory! You have mastered this unit.</span>
                <span v-else-if="scorePercentage >= 70">Excellent work! A strong performance. Review the explanations below to perfect your knowledge.</span>
                <span v-else-if="scorePercentage >= 40">A good attempt. This is a challenging topic. Focus on the explanations to understand the key differences.</span>
                <span v-else>Don't be discouraged. Grammar is a journey. Carefully read each explanation to build a stronger foundation.</span>
            </CardDescription>
         </CardHeader>
         <CardContent>
           <div class="flex items-center gap-4 mb-6">
             <h3 class="text-xl font-bold">Score: {{ score }} / {{ questions.length }}</h3>
             <Progress :model-value="scorePercentage" class="w-[60%]" />
           </div>

           <div class="flex flex-col gap-4">
             <Alert
               v-for="question in questions"
               :key="`result-${question.id}`"
               :variant="question.isCorrect ? 'default' : 'destructive'"
             >
                <AlertTitle class="flex items-center gap-2">
                    <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                    Question {{ question.id }} - {{ question.isCorrect ? 'Correct' : 'Incorrect' }}
                </AlertTitle>
                <AlertDescription class="pl-7 mt-2">
                  <p class="mb-2" v-html="question.text"></p>
                  <p><strong>Your answer:</strong> <span :class="{'font-mono p-1 bg-red-100 dark:bg-red-900 rounded-md': !question.isCorrect, 'font-mono p-1 bg-green-100 dark:bg-green-900 rounded-md': question.isCorrect}">{{ formatUserAnswer(question) || 'No answer' }}</span></p>
                  <p v-if="!question.isCorrect"><strong>Correct answer:</strong> <span class="font-mono p-1 bg-green-100 dark:bg-green-900 rounded-md">{{ getCorrectAnswerLabel(question) }}</span></p>
                  <Separator class="my-2" />
                  <p class="text-sm"><strong>Explanation:</strong> {{ question.explanation }}</p>
                </AlertDescription>
             </Alert>
           </div>
         </CardContent>
       </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle } from 'lucide-vue-next'

import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

const router = useRouter()

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Intermediate Level - Based on the methodology of Raymond Murphy',
  unitTitle: 'Unit 5: For and since; When…? and How long…?',
  unitDescription: 'Master the difference between expressing durations and specific points in time.',
  categories: ['Tenses', 'Prepositions of Time', 'Question Forms'],
}

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/4")
}
function goToNextUnit() {
  router.push("/units/grammar/6")
}

// --- Question & Answer State ---

/**
 * @typedef {object} QuestionOption
 * @property {string} value - The actual value to be checked.
 * @property {string} label - The text displayed to the user.
 */

/**
 * @typedef {object} Question
 * @property {number} id
 * @property {'fill-in' | 'multiple-choice'} type
 * @property {string} text - The question text (can contain HTML).
 * @property {string} [placeholder] - Placeholder for fill-in inputs.
 * @property {string | string[]} correctAnswer - The correct answer(s).
 * @property {QuestionOption[]} [options] - Options for multiple-choice questions.
 * @property {string} explanation - Detailed feedback for the student.
 * @property {string} userAnswer - Reactive property to store user's input.
 * @property {boolean | null} isCorrect - Validation status.
 */

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    text: "It's been raining non-stop ___ yesterday afternoon.",
    placeholder: 'for / since',
    correctAnswer: 'since',
    userAnswer: '',
    isCorrect: null,
    explanation: "`yesterday afternoon` is a specific point in time when the rain started, so we must use `since`."
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "My brother is a pilot. He ___ to over fifty countries.",
    options: [
        { value: 'has travelled', label: 'has travelled' },
        { value: 'travelled', label: 'travelled' },
        { value: 'is travelling', label: 'is travelling' }
    ],
    correctAnswer: 'has travelled',
    userAnswer: '',
    isCorrect: null,
    explanation: "This sentence describes life experience up to the present without mentioning a specific finished time. The Present Perfect `has travelled` is the correct tense to use for this."
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "A: _______? B: I started it two weeks ago.",
    options: [
        { value: 'how-long', label: 'How long have you been working on this project?' },
        { value: 'when', label: 'When did you start this project?' },
        { value: 'since-when', label: 'Since when are you working on this project?' }
    ],
    correctAnswer: 'when',
    userAnswer: '',
    isCorrect: null,
    explanation: "The answer `two weeks ago` uses the Simple Past and specifies the start point. The question must therefore be `When...?` which also uses the Simple Past (`did you start`)."
  },
  {
    id: 4,
    type: 'fill-in',
    text: "She hasn't spoken to her best friend ___ more than a month.",
    placeholder: 'for / since',
    correctAnswer: 'for',
    userAnswer: '',
    isCorrect: null,
    explanation: "`more than a month` is a duration or period of time, not a specific starting point. Therefore, `for` is the correct preposition."
  },
  {
    id: 5,
    type: 'multiple-choice',
    text: "I ___ my keys. I can't find them anywhere. I last ___ them this morning.",
    options: [
        { value: 'lost-saw', label: 'lost / saw' },
        { value: 'have-lost-saw', label: 'have lost / saw' },
        { value: 'lost-have-seen', label: 'lost / have seen' }
    ],
    correctAnswer: 'have-lost-saw',
    userAnswer: '',
    isCorrect: null,
    explanation: "The first part (`I have lost my keys`) describes a past action with a present result (I can't find them now), requiring the Present Perfect. The second part (`I last saw them this morning`) refers to a specific, finished time in the past (`this morning`), which requires the Simple Past."
  },
  {
    id: 6,
    type: 'multiple-choice',
    text: "A: How long have you known each other? B: We've been friends ___ we were in university together.",
    options: [
        { value: 'for', label: 'for' },
        { value: 'since', label: 'since' },
        { value: 'ago', label: 'ago' }
    ],
    correctAnswer: 'since',
    userAnswer: '',
    isCorrect: null,
    explanation: "The clause `we were in university together` describes the point in time when the friendship started. `since` is used to introduce a starting point, even if that point is a whole clause."
  }
])

// --- Validation and Scoring Logic ---
const showResult = ref(false)

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

function validateAnswers() {
  questions.value.forEach(q => {
    const userAnswerCleaned = typeof q.userAnswer === 'string' ? q.userAnswer.trim().toLowerCase() : q.userAnswer
    const correctAnswerCleaned = typeof q.correctAnswer === 'string' ? q.correctAnswer.trim().toLowerCase() : q.correctAnswer
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned
  })
  showResult.value = true
  // Scroll to the top of the results for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetTest() {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
}

// --- Helper functions for display ---
function getCorrectAnswerLabel(question: Question): string {
  if (question.type === 'multiple-choice' && question.options) {
    const correctOption = question.options.find(opt => opt.value === question.correctAnswer)
    return correctOption ? correctOption.label : String(question.correctAnswer)
  }
  return String(question.correctAnswer)
}

function formatUserAnswer(question: Question): string {
    if (question.type === 'multiple-choice' && question.options && question.userAnswer) {
        const userAnswerOption = question.options.find(opt => opt.value === question.userAnswer);
        return userAnswerOption ? userAnswerOption.label : 'Invalid selection';
    }
    return question.userAnswer;
}
</script>

