<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series."
    unit-title="Unit 12: Present tenses (I am doing / I do) for the future"
    unit-description="Mastering the use of Present Continuous for arrangements and Present Simple for timetables."
    :categories="['Tenses', 'Future Forms', 'Present Continuous', 'Present Simple']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: Learning Content & Explanations                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Plans vs. Schedules</CardTitle>
          <CardDescription>
            The key to this unit is distinguishing between a personal arrangement and a fixed timetable.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-bold text-primary">1. Present Continuous (I am doing) for Future Arrangements</h4>
            <p class="mt-1 text-muted-foreground">
              We use the Present Continuous when we talk about something we have <span class="font-semibold text-foreground">already arranged to do</span> in the future. It implies a plan involving other people, places, or confirmed bookings. Think of it as an entry in your personal diary or calendar.
            </p>
            <ul class="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>"I <span class="font-semibold text-blue-600">am meeting</span> Jane at 8 pm tonight." (An arrangement between me and Jane).</li>
              <li>"What <span class="font-semibold text-blue-600">are you doing</span> on Saturday evening?" (Asking about their plans).</li>
              <li>"He <span class="font-semibold text-blue-600">is flying</span> to New York next week." (He has booked his ticket).</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-primary">2. Present Simple (I do) for Future Timetables</h4>
            <p class="mt-1 text-muted-foreground">
              We use the Present Simple when we talk about future events that are part of a <span class="font-semibold text-foreground">fixed schedule, timetable, or programme</span>. These are public, official, and impersonal times. Think of a train schedule or a cinema listing.
            </p>
            <ul class="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>"The train to London <span class="font-semibold text-green-600">leaves</span> at 7:45 am." (A published timetable).</li>
              <li>"The exhibition <span class="font-semibold text-green-600">opens</span> on May 1st and <span class="font-semibold text-green-600">finishes</span> in September." (Official dates).</li>
              <li>"What time <span class="font-semibold text-green-600">does the film start</span> tonight?" (A scheduled event).</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-destructive">Teacher's Note: The Common Trap</h4>
            <p class="mt-1 text-muted-foreground">
              A personal plan can be based on a public timetable. In these cases, both tenses can be used, but they carry slightly different meanings. The choice often depends on what you want to emphasize.
            </p>
            <ul class="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>"Our flight <span class="font-semibold text-green-600">leaves</span> at 11:30." (Focus on the timetable).</li>
              <li>"We <span class="font-semibold text-blue-600">are leaving</span> at 11:30." (Focus on our personal action/plan).</li>
              <li class="pt-2 text-foreground">
                <strong>Rule of Thumb:</strong> If it's a personal diary entry, use Present Continuous. If it's a public schedule, use Present Simple.
              </li>
            </ul>
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
          <CardDescription>Complete the sentences with the correct present tense form for the future.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-6">
              <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
                <Label :for="`q-${q.id}`">{{ index + 1 }}. {{ q.questionText }}</Label>
                <div class="flex items-center gap-2">
                  <Input
                    :id="`q-${q.id}`"
                    v-model="userAnswers[index].value"
                    :placeholder="`Type verb: '${q.prompt}'`"
                    :disabled="isSubmitted"
                    class="flex-1"
                    :class="{
                      'border-red-500 focus-visible:ring-red-500': isSubmitted && !results[index].isCorrect,
                      'border-green-500 focus-visible:ring-green-500': isSubmitted && results[index].isCorrect,
                    }"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <Button type="submit" :disabled="isSubmitted">
                <CheckCircle class="mr-2 h-4 w-4" />
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: Detailed Validation and Score                           -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Results & Explanations</CardTitle>
            <CardDescription>Review your answers and learn from the detailed feedback.</CardDescription>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold">{{ score }} / {{ questions.length }}</p>
            <p class="text-sm font-medium" :class="score > (questions.length / 2) ? 'text-green-600' : 'text-red-600'">
              {{ scoreMessage }}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <div v-for="(result, index) in results" :key="result.id" class="rounded-md border p-4" :class="result.isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'">
              <div class="flex items-start gap-4">
                <div class="mt-1">
                  <Check v-if="result.isCorrect" class="h-5 w-5 text-green-600" />
                  <X v-else class="h-5 w-5 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold">Question {{ index + 1 }}:</p>
                  <p class="text-muted-foreground">{{ questions[index].questionText }}</p>
                  <p class="mt-2 text-sm">
                    Your answer:
                    <span class="font-mono p-1 rounded-md" :class="result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ result.userAnswer || 'No answer' }}
                    </span>
                  </p>
                  <p v-if="!result.isCorrect" class="mt-1 text-sm">
                    Correct answer:
                    <span class="font-mono bg-green-100 p-1 text-green-800 rounded-md">{{ result.correctAnswer }}</span>
                  </p>
                  <div class="mt-3 border-l-4 p-3 text-sm" :class="result.isCorrect ? 'border-green-500 bg-green-100/60' : 'border-red-500 bg-red-100/60'">
                    <p class="font-bold">Explanation:</p>
                    <p class="text-muted-foreground">{{ result.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 text-center">
            <Button @click="resetTest">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Check, X, CheckCircle, RefreshCw } from 'lucide-vue-next'

import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

// --- Page-specific State & Data ---

interface Question {
  id: number
  questionText: string
  prompt: string
  correctAnswer: string[]
  explanation: string
}

interface UserAnswer {
  id: number
  value: string
}

interface Result {
  id: number
  isCorrect: boolean
  userAnswer: string
  correctAnswer: string
  explanation: string
}

const isSubmitted = ref(false)
const score = ref(0)

const questions = ref<Question[]>([
  {
    id: 1,
    questionText: "The academic conference is next week. It ___ on Monday morning at 9 sharp.",
    prompt: "start",
    correctAnswer: ["starts"],
    explanation: "We use the Present Simple ('starts') for scheduled, timetabled events like a conference. 'Is starting' would imply a personal arrangement, which is less precise for an official event time."
  },
  {
    id: 2,
    questionText: "I can't meet you tomorrow afternoon. I ___ my dentist for a check-up.",
    prompt: "see",
    correctAnswer: ["am seeing"],
    explanation: "This is a personal appointment that has been arranged in advance. The Present Continuous ('am seeing') is perfect for fixed personal plans and diary entries."
  },
  {
    id: 3,
    questionText: "According to the new TV guide, the documentary about polar bears ___ at 8:00 PM tonight.",
    prompt: "be",
    correctAnswer: ["is"],
    explanation: "TV schedules are fixed timetables. We use the Present Simple. The simple present form of 'be' is 'is'. This is a very common structure for scheduled programming."
  },
  {
    id: 4,
    questionText: "Hurry up! The bus ___ in five minutes, and it's the last one tonight!",
    prompt: "depart",
    correctAnswer: ["departs"],
    explanation: "Bus schedules are public timetables. Therefore, the Present Simple ('departs') is the most appropriate tense to use for this fixed, scheduled event."
  },
  {
    id: 5,
    questionText: "My brother has his ticket and is all packed. He ___ to Barcelona for a holiday next Tuesday.",
    prompt: "go",
    correctAnswer: ["is going"],
    explanation: "This is a definite personal plan for which preparations (packing, buying a ticket) have been made. The Present Continuous ('is going') correctly emphasizes this personal arrangement."
  },
  {
    id: 6,
    questionText: "What time ___ your flight tomorrow? I can give you a lift to the airport.",
    prompt: "arrive",
    correctAnswer: ["does your flight arrive"],
    explanation: "While the flight is a personal plan, the question is specifically about the scheduled time. 'What time does the flight arrive?' is the standard, natural way to ask about a timetable detail. 'is your flight arriving' is also possible but less common when asking for the specific time."
  },
  {
    id: 7,
    questionText: "Don't forget that your French class ___ a week later than usual next term.",
    prompt: "begin",
    correctAnswer: ["begins"],
    explanation: "Class schedules, even if they change, are still considered timetables. The new, official start time is a scheduled event, so Present Simple ('begins') is correct."
  },
  {
    id: 8,
    questionText: "We ___ a small party for Sarah's birthday on Saturday. Can you come?",
    prompt: "have",
    correctAnswer: ["are having"],
    explanation: "Organizing a party is a classic example of a social arrangement. The Present Continuous ('are having') is used to talk about this kind of planned event."
  }
])

const userAnswers = ref<UserAnswer[]>(
  questions.value.map(q => ({ id: q.id, value: '' }))
)

const results = ref<Result[]>([])

// --- Navigation ---

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/11")
}
function goToNextUnit() {
  router.push("/units/grammar/13")
}

// --- Logic & Methods ---

function handleSubmit() {
  score.value = 0
  const validationResults: Result[] = []

  questions.value.forEach((question, index) => {
    const userAnswer = userAnswers.value[index]
    // Normalize answer for comparison: lowercase and trim whitespace
    const cleanedUserAnswer = userAnswer.value.trim().toLowerCase()
    
    // Check if the user's answer is in the array of correct answers
    const isCorrect = question.correctAnswer.map(ans => ans.toLowerCase()).includes(cleanedUserAnswer)

    if (isCorrect) {
      score.value++
    }

    validationResults.push({
      id: question.id,
      isCorrect,
      userAnswer: userAnswer.value,
      correctAnswer: question.correctAnswer[0], // Display the primary correct answer
      explanation: question.explanation
    })
  })

  results.value = validationResults
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const scoreMessage = computed(() => {
  const percentage = (score.value / questions.value.length) * 100
  if (percentage === 100) return "Perfect Score! You are a master!"
  if (percentage >= 80) return "Excellent! You have a strong grasp of this."
  if (percentage >= 50) return "Good effort! Review the explanations to improve."
  return "Needs more practice. Don't worry, read the feedback carefully!"
})

function resetTest() {
  isSubmitted.value = false
  score.value = 0
  userAnswers.value.forEach(answer => (answer.value = ''))
  results.value = []
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
