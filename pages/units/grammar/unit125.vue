<!--
  File: @/pages/units/grammar/18.vue
  Unit: 18 - "to, at, in, and into"
  Description: An advanced practice page for English prepositions of place and movement.
  This page provides detailed explanations followed by a challenging interactive quiz with
  in-depth feedback, designed to create a lasting improvement in the student's grammar.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally registered or auto-imported by Nuxt
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigate to the unit before 18
  router.push("/units/grammar/17")
}
function goToNextUnit() {
  // Navigate to the unit after 18
  router.push("/units/grammar/19")
}

// --- Page & Quiz State Management ---
const showResult = ref(false)
const isSubmitted = ref(false)

type QuestionStatus = 'unanswered' | 'correct' | 'incorrect'

const questions = ref([
  {
    id: 1,
    sentence_start: "The children love going",
    sentence_end: "the park on weekends to play on the swings.",
    user_answer: '',
    correct_answers: ['to'],
    status: 'unanswered' as QuestionStatus,
    explanation: "'to' is used to express movement towards a destination. The action is 'going', and the destination is 'the park'. 'Into' is less common here unless you are emphasizing entering the park's boundaries."
  },
  {
    id: 2,
    sentence_start: "He was so angry, he threw the book",
    sentence_end: "me instead of just handing it over.",
    user_answer: '',
    correct_answers: ['at'],
    status: 'unanswered' as QuestionStatus,
    explanation: "'at' is used to suggest an aggressive or targeted action. 'Throwing something at someone' implies hostility. 'Throwing something to someone' is a neutral act of passing an object."
  },
  {
    id: 3,
    sentence_start: "After unlocking the door, she stepped cautiously",
    sentence_end: "the dark, unfamiliar room.",
    user_answer: '',
    correct_answers: ['into'],
    status: 'unanswered' as QuestionStatus,
    explanation: "'into' is the correct preposition to show movement that results in being inside a contained space. The key is moving from outside to inside ('the room'). 'In' describes a static location (e.g., 'She was in the room')."
  },
  {
    id: 4,
    sentence_start: "Let's meet",
    sentence_end: "the new coffee shop at the corner of Main Street.",
    user_answer: '',
    correct_answers: ['at', 'in'],
    status: 'unanswered' as QuestionStatus,
    explanation: "Both 'at' and 'in' can be correct, but have subtle differences. 'at' refers to the coffee shop as a specific point or location for the meeting. 'in' emphasizes being inside the building. In this context, both are widely accepted."
  },
  {
    id: 5,
    sentence_start: "The delegates from France have just arrived",
    sentence_end: "London for the international conference.",
    user_answer: '',
    correct_answers: ['in'],
    status: 'unanswered' as QuestionStatus,
    explanation: "'in' is used for arriving in a large area like a city or country (e.g., London, France). 'at' is used for arriving at a smaller, specific place like an airport, station, or building (e.g., Heathrow Airport, the hotel)."
  },
  {
    id: 6,
    sentence_start: "Don't just stand at the poolside, jump",
    sentence_end: "the water! It's lovely and warm.",
    user_answer: '',
    correct_answers: ['into'],
    status: 'unanswered' as QuestionStatus,
    explanation: "'into' is essential here to show the movement from outside the water to inside it. 'Jumping in the water' implies you are already in the water and jumping up and down. 'Jumping into' describes the entry."
  },
  {
    id: 7,
    sentence_start: "I have to go",
    sentence_end: "the dentist this afternoon for a check-up.",
    user_answer: '',
    correct_answers: ['to'],
    status: 'unanswered' as QuestionStatus,
    explanation: "Use 'to' for movement towards a place for a specific purpose or appointment, such as 'the doctor', 'the dentist', or 'work'. It indicates the destination of a journey."
  },
])

// --- Computed Properties for Dynamic UI ---
const score = computed(() => {
  if (!isSubmitted.value) return 0
  const correctCount = questions.value.filter(q => q.status === 'correct').length
  return (correctCount / questions.value.length) * 100
})

const scoreColor = computed(() => {
  if (score.value >= 80) return 'text-green-500'
  if (score.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})

// --- Core Logic Functions ---
function validateAnswers() {
  questions.value.forEach(q => {
    const userAnswer = q.user_answer.trim().toLowerCase()
    if (q.correct_answers.includes(userAnswer)) {
      q.status = 'correct'
    } else {
      q.status = 'incorrect'
    }
  })
  isSubmitted.value = true
  showResult.value = true
}

function resetQuiz() {
  questions.value.forEach(q => {
    q.user_answer = ''
    q.status = 'unanswered'
  })
  isSubmitted.value = false
  showResult.value = false
}
</script>

<template>
  <GrammarLayout
    test-title="English Prepositions Practice"
    test-description="Based on Raymond Murphy's English Grammar In Use"
    unit-title="Unit 18: to, at, in, and into"
    unit-description="A deep dive into prepositions of place and movement, focusing on common areas of confusion for learners."
    :categories="['Prepositions', 'Place & Movement', 'B1/B2 Intermediate', 'Common Errors']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material - The Learning Content                                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Location vs. Movement</CardTitle>
          <CardDescription>
            Understanding the difference between being *somewhere* (location) and going *somewhere* (movement) is the key to this unit.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold">IN & AT (Location)</h4>
            <p class="text-muted-foreground">Used to describe a static position.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><strong>in:</strong> Used for enclosed spaces or larger defined areas.
                <br><em>Examples: in a room, in a box, in a garden, in London, in the water.</em>
              </li>
              <li><strong>at:</strong> Used for specific points, addresses, events, or buildings viewed as a whole.
                <br><em>Examples: at the bus stop, at the door, at a party, at the airport.</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">TO & INTO (Movement)</h4>
            <p class="text-muted-foreground">Used to describe movement from one place to another.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><strong>to:</strong> The most common preposition of movement, indicating the direction or destination.
                <br><em>Examples: go to London, walk to the office, drive to the sea.</em>
              </li>
              <li><strong>into:</strong> Specifically shows movement from outside to inside a contained space (3D).
                <br><em>Examples: walk into the room, jump into the pool, get into the car.</em>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Lightbulb class="h-5 w-5 text-blue-500" />
            Teacher's Insight: Common Mistakes
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <p>
            A classic point of confusion is <strong>'arrive in' vs. 'arrive at'</strong>. Use <strong>arrive in</strong> for cities and countries (large areas). Use <strong>arrive at</strong> for specific places like an airport, station, or building.
            <br><em>Example: "We arrived <strong class="text-blue-600">in</strong> Paris and then took a taxi <strong class="text-blue-600">to</strong> the hotel. We arrived <strong class="text-blue-600">at</strong> the hotel at 5pm."</em>
          </p>
          <p>
            Another is <strong>'throw to' vs. 'throw at'</strong>. <strong>Throw to</strong> is neutral (e.g., playing catch). <strong>Throw at</strong> is aggressive and implies intent to hit.
             <br><em>Example: "He threw the keys <strong class="text-blue-600">to</strong> me." vs "He threw a rock <strong class="text-blue-600">at</strong> me."</em>
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice - The Interactive Quiz                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences with: <strong>to, at, in, or into</strong>. Type your answer in the box.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-2">
              <label :for="`q-${q.id}`" class="text-sm font-medium">
                {{ index + 1 }}. {{ q.sentence_start }}
                <Input
                  :id="`q-${q.id}`"
                  v-model="q.user_answer"
                  :disabled="isSubmitted"
                  class="mx-2 inline-flex w-24 h-9 text-center"
                  placeholder="_____"
                  @keyup.enter="validateAnswers"
                />
                {{ q.sentence_end }}
              </label>
            </div>
            <div class="flex gap-4 mt-6">
              <Button v-if="!isSubmitted" class="w-full" @click="validateAnswers">Check Answers</Button>
              <Button v-if="isSubmitted" class="w-full" variant="secondary" @click="resetQuiz">Try Again</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result - The Validation and Feedback Section                      -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <h3 class="text-3xl font-bold" :class="scoreColor">{{ score.toFixed(0) }}%</h3>
            <div class="flex-1">
              <p class="text-sm text-muted-foreground">
                {{ score >= 80 ? 'Excellent work!' : (score >= 50 ? 'Good effort, review the explanations below.' : 'Needs improvement. Focus on the feedback.') }}
              </p>
              <Progress :model-value="score" class="mt-2" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <h4 class="font-semibold text-lg">Detailed Feedback</h4>
          <div v-for="q in questions" :key="q.id">
            <Alert :variant="q.status === 'correct' ? 'default' : 'destructive'">
              <component :is="q.status === 'correct' ? CheckCircle2 : XCircle" class="h-4 w-4" />
              <AlertTitle class="font-bold">
                Question {{ q.id }}: {{ q.status === 'correct' ? 'Correct' : 'Incorrect' }}
              </AlertTitle>
              <AlertDescription>
                <p class="font-mono text-base mt-2">
                  {{ q.sentence_start }} <strong :class="q.status === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 line-through'">{{ q.user_answer || '""' }}</strong> {{ q.sentence_end }}
                </p>
                <p v-if="q.status === 'incorrect'" class="font-mono text-base">
                  Correct Answer(s): <strong class="text-green-600 dark:text-green-400">{{ q.correct_answers.join(' / ') }}</strong>
                </p>
                <p class="mt-3 pt-3 border-t border-border/60 text-sm">
                  <strong>Explanation:</strong> {{ q.explanation }}
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles can be added here if needed, for example to fine-tune input appearance */
.font-mono {
  font-family: 'Courier New', Courier, monospace;
}
</style>
