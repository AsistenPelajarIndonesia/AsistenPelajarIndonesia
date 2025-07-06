<!--
  File: @/pages/units/grammar/13.vue
  Unit: 13 - Prepositions of Time: at/on/in
  Description: A deep-dive practice module for mastering the use of temporal prepositions, 
               inspired by Raymond Murphy's "English Grammar in Use".
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
const goToPreviousUnit = () => router.push('/units/grammar/12')
const goToNextUnit = () => router.push('/units/grammar/14')

// --- COMPONENT STATE ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string>>({})

interface Question {
  id: number
  text: string[]
  correctAnswer: 'at' | 'on' | 'in'
  explanation: string
}

interface Result {
  question: Question
  userAnswer: string
  isCorrect: boolean
}

const detailedResults = ref<Result[]>([])

// --- LAYOUT CONFIGURATION ---
const layoutProps = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Based on the book by Raymond Murphy',
  unitTitle: 'Unit 13: At / On / In (Time)',
  unitDescription: 'Mastering prepositions used to specify points and periods in time.',
  categories: ['Prepositions', 'Time', 'Intermediate'],
  showResult: showResult,
}

// --- QUESTIONS & VALIDATION LOGIC ---
// Questions are designed to be tricky, testing exceptions and complex contexts.
const questions: Question[] = [
  {
    id: 1,
    text: ['The industrial revolution began', 'the 18th century, with major developments happening', 'the latter half.'],
    correctAnswer: 'in',
    explanation: "'in' is used for long periods like centuries, decades, and years. 'in the latter half' refers to a non-specific period within the century.",
  },
  {
    id: 2,
    text: ['Please arrive promptly', '14:30. The keynote speech is scheduled to start', 'that exact moment.'],
    correctAnswer: 'at',
    explanation: "'at' is used for precise times on the clock (14:30) and for specific, precise points in time like 'at that moment'.",
  },
  {
    id: 3,
    text: ["I have a dentist appointment", "Friday morning, so I can't join the call.", ''],
    correctAnswer: 'on',
    explanation: "While we say 'in the morning', when the day is specified (Friday), the preposition 'on' takes precedence because the primary reference is the day.",
  },
  {
    id: 4,
    text: ['He felt a strange sense of unease', 'night, especially when he was alone', 'the house.'],
    correctAnswer: 'at',
    explanation: "'at night' is a fixed expression for the general period of darkness. 'in the night' is less common and often implies something happening *during* a specific night.",
  },
  {
    id: 5,
    text: ['The final decision will be announced', 'the end of the meeting, not', 'the beginning.'],
    correctAnswer: 'at',
    explanation: "'at the beginning' and 'at the end' are fixed phrases used to denote the specific points where an event or period starts or finishes.",
  },
  {
    id: 6,
    text: ["Let's meet for coffee", 'the weekend. Are you free', 'Saturday?'],
    correctAnswer: 'on',
    explanation: "In American English, 'on the weekend' is standard. For a specific day like Saturday, 'on' is always used. ('at the weekend' is common in British English). We use 'on' for consistency with the specific day.",
  },
  {
    id: 7,
    text: ['The entire project must be completed', 'the next two weeks. There are no extensions.', ''],
    correctAnswer: 'in',
    explanation: "'in' is used to express a period of time in the future during which something will happen. It answers the question 'how long will it take?'.",
  },
  {
    id: 8,
    text: ['The famous treaty was signed', 'a cold afternoon', 'December 1987.'],
    correctAnswer: 'on',
    explanation: "Similar to 'on Friday morning', when a general part of the day ('afternoon') is made specific by a date or day, 'on' is used. The full date makes it a specific day.",
  },
]

const validateAnswers = () => {
  const results: Result[] = questions.map(q => {
    const userAnswer = userAnswers[q.id] || ''
    return {
      question: q,
      userAnswer,
      isCorrect: userAnswer.toLowerCase() === q.correctAnswer.toLowerCase(),
    }
  })
  detailedResults.value = results
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const score = computed(() => {
  if (!detailedResults.value.length) return 0
  const correctCount = detailedResults.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.length) * 100)
})

const resetQuiz = () => {
  showResult.value = false
  detailedResults.value = []
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout v-bind="layoutProps" @back="goToPreviousUnit" @next="goToNextUnit">
    <!-- ======================================================================= -->
    <!-- #material: The Core Concepts & Rules                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principle: Specific vs. General</CardTitle>
          <CardDescription>
            The choice between 'at', 'on', and 'in' depends on the specificity of the time reference, moving from general (in) to specific (on) to very specific (at).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">Preposition</TableHead>
                <TableHead>Usage (Concept)</TableHead>
                <TableHead>Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-semibold">IN</TableCell>
                <TableCell>Enclosed, longer periods of time (non-specific).</TableCell>
                <TableCell><code class="font-mono">in May</code>, <code class="font-mono">in 2024</code>, <code class="font-mono">in the 90s</code>, <code class="font-mono">in the summer</code>, <code class="font-mono">in the morning</code>, <code class="font-mono">in two weeks</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-semibold">ON</TableCell>
                <TableCell>Surfaces of time (specific days and dates).</TableCell>
                <TableCell><code class="font-mono">on Sunday</code>, <code class="font-mono">on 6 June</code>, <code class="font-mono">on Christmas Day</code>, <code class="font-mono">on my birthday</code>, <code class="font-mono">on Tuesday morning</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-semibold">AT</TableCell>
                <TableCell>Points in time (precise, specific moments).</TableCell>
                <TableCell><code class="font-mono">at 8 o'clock</code>, <code class="font-mono">at noon</code>, <code class="font-mono">at bedtime</code>, <code class="font-mono">at the moment</code>, <code class="font-mono">at sunrise</code>, <code class="font-mono">at night</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card class="border-amber-500/50 bg-amber-50/20">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-amber-600" />
            Advanced Concepts & Common Pitfalls
          </CardTitle>
          <CardDescription>Pay close attention to these exceptions and special cases where the rules can be tricky.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><strong class="text-amber-700">Parts of a Specific Day:</strong> We say <code class="font-mono">in the morning</code>, but if the day is named, it becomes <code class="font-mono"><strong>on</strong> Monday morning</code> because the day is the primary time marker.</p>
          <p><strong class="text-amber-700">'At night' vs. 'In the morning/afternoon/evening':</strong> <code class="font-mono">at night</code> is a fixed phrase. For other parts of the day, we use <code class="font-mono">in the...</code>.</p>
          <p><strong class="text-amber-700">'At the end' vs. 'In the end':</strong> <code class="font-mono"><strong>At</strong> the end of something</code> refers to the point where something finishes (e.g., at the end of the film). <code class="font-mono"><strong>In</strong> the end</code> means 'finally' or 'after a long time' (e.g., In the end, we decided to go home).</p>
          <p><strong class="text-amber-700">Holidays:</strong> Use <code class="font-mono"><strong>at</strong> Christmas</code> to talk about the general holiday period. Use <code class="font-mono"><strong>on</strong> Christmas Day</code> to talk about the specific day (December 25th).</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Quiz                                       -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Choose the correct preposition for each blank. Your choices will be rigorously evaluated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-6" @submit.prevent="validateAnswers">
            <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-3">
              <label :for="`q${q.id}`" class="text-base">
                {{ index + 1 }}. {{ q.text[0] }}
                <Select v-model="userAnswers[q.id]">
                  <SelectTrigger :id="`q${q.id}`" class="inline-flex w-[90px] mx-2 -translate-y-1 font-semibold">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="at">at</SelectItem>
                    <SelectItem value="on">on</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
                {{ q.text[1] }}
                <template v-if="q.text[2]">
                  <Select v-model="userAnswers[q.id + '_2']" disabled>
                  </Select>
                  {{ q.text[2] }}
                </template>
              </label>
            </div>
            <div class="flex justify-end gap-4 pt-4">
              <Button v-if="showResult" type="button" variant="outline" @click="resetQuiz">
                Try Again
              </Button>
              <Button type="submit" :disabled="showResult">
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The Awesome Validator & Score Report                         -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-blue-500/50 bg-blue-50/20">
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>Here is a detailed breakdown of your performance. Review the explanations carefully to improve.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold">Overall Score: <span class="text-xl font-bold text-blue-700">{{ score }}%</span></p>
              <p v-if="score === 100" class="text-green-600 font-bold">Excellent work! Mastery achieved.</p>
              <p v-else-if="score >= 70" class="text-yellow-600 font-bold">Good effort! Almost there.</p>
              <p v-else class="text-red-600 font-bold">Needs review. Focus on the explanations.</p>
            </div>
            <Progress :model-value="score" class="w-full" />
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Feedback</h3>
            <Alert v-for="(result, index) in detailedResults" :key="result.question.id" :variant="result.isCorrect ? 'default' : 'destructive'" class="mb-4">
               <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
              <AlertTitle class="font-bold">Question {{ index + 1 }}</AlertTitle>
              <AlertDescription>
                <p class="mb-2 text-base text-black/80 dark:text-white/80">
                  <span v-html="result.question.text[0]"></span>
                  <span
                    :class="[
                      'font-bold p-1 rounded-md mx-1',
                      result.isCorrect ? 'bg-green-200/50 text-green-800' : 'bg-red-200/50 text-red-800 line-through'
                    ]"
                  >{{ result.userAnswer || ' unanswered ' }}</span>
                  <span v-html="result.question.text[1]"></span>
                </p>
                <div v-if="!result.isCorrect" class="text-sm font-semibold mb-2">
                  Correct Answer: <span class="p-1 rounded-md bg-green-200/50 text-green-900 font-bold">{{ result.question.correctAnswer }}</span>
                </div>
                <p class="text-sm text-foreground/80 border-l-2 pl-3 mt-2" :class="[result.isCorrect ? 'border-green-500' : 'border-red-500']">
                  <strong>Explanation:</strong> {{ result.question.explanation }}
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
