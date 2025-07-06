<!--
  File: @/pages/units/grammar/3.vue
  Description: An advanced grammar practice unit focusing on "Still, Yet, Already, Any more".
  This page integrates learning material and a challenging quiz within the GrammarLayout,
  providing detailed feedback to foster deep understanding.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

// --- State Management ---
const showResult = ref(false)
const quizSubmitted = ref(false)

// --- Navigation ---
function goToPreviousUnit() {
  // In a real application, you might have a dynamic way to determine the previous unit.
  router.push("/units/grammar/2")
}

function goToNextUnit() {
  // For now, we hardcode the next unit's path.
  router.push("/units/grammar/4")
}

// --- Quiz Data and Logic ---
const questions = ref([
  {
    id: 1,
    type: 'fill-in-the-blank',
    questionText: "It's nearly midnight, but my daughter is {input} awake watching a movie.",
    userAnswer: '',
    correctAnswer: 'still',
    isCorrect: null as boolean | null,
    explanation: "We use 'still' to show that a situation is continuing, especially when it's longer than expected. The daughter continuing to be awake late at night is the key context here."
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    questionText: "A: Is your report finished? B: No, I haven't completed the conclusion {input}.",
    userAnswer: '',
    correctAnswer: 'yet',
    isCorrect: null as boolean | null,
    explanation: "'Yet' is used in negative sentences and questions to talk about something that is expected to happen but hasn't happened. It almost always comes at the end of the sentence."
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    questionText: "You don't need to remind me. I've {input} paid the electricity bill.",
    userAnswer: '',
    correctAnswer: 'already',
    isCorrect: null as boolean | null,
    explanation: "'Already' indicates that something has happened sooner than expected or before the present moment. Here, the payment was made before the reminder was necessary."
  },
  {
    id: 4,
    type: 'rewrite',
    questionText: "Rewrite this sentence using 'no longer'. Original: 'He doesn't work for that company any more.'",
    userAnswer: '',
    correctAnswer: 'He no longer works for that company.',
    isCorrect: null as boolean | null,
    explanation: "'No longer' is a more formal way of saying 'not... any more'. It is placed in the mid-position of the sentence, before the main verb ('works'), and the verb becomes positive."
  },
  {
    id: 5,
    type: 'error-correction',
    questionText: "Correct the grammatical error in this sentence: 'I'm very busy, so I didn't call her still.'",
    userAnswer: '',
    correctAnswer: "I'm very busy, so I still haven't called her.",
    isCorrect: null as boolean | null,
    explanation: "This is a complex correction. First, 'still' in negative sentences should come before the auxiliary verb ('haven't'). Second, since the action of calling (or not calling) relates to the present moment ('I'm very busy'), the present perfect tense ('haven't called') is more appropriate than the simple past ('didn't call'). 'I still haven't called her' is the most natural construction."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    questionText: "I used to be fluent in French, but I don't speak it very well {input}.",
    userAnswer: '',
    correctAnswer: 'any more',
    isCorrect: null as boolean | null,
    explanation: "'Not... any more' is used at the end of a negative sentence to indicate that a past action or state has stopped. It is the common counterpart to the more formal 'no longer'."
  },
  {
    id: 7,
    type: 'multiple-fill-in',
    questionText: "I've been waiting for an hour, and the bus {inputA} hasn't come. Have you seen it {inputB}?",
    userAnswerA: '',
    userAnswerB: '',
    correctAnswerA: 'still',
    correctAnswerB: 'yet',
    isCorrect: null as boolean | null,
    explanation: "Part A uses 'still' to emphasize the continuing, frustrating wait ('still hasn't come'). Part B uses 'yet' because it's a standard question about whether an expected event has occurred ('Have you seen it yet?'). This contrast is a key test of understanding."
  },
  {
    id: 8,
    type: 'rewrite',
    questionText: "Rewrite this sentence using 'already'. Original: 'It's only 8 AM, but she has finished her workout.'",
    userAnswer: '',
    correctAnswer: "It's only 8 AM, but she has already finished her workout.",
    isCorrect: null as boolean | null,
    explanation: "'Already' is inserted into the sentence to emphasize that the action happened sooner than might be expected. Its standard position is between the auxiliary verb ('has') and the main verb ('finished')."
  }
])

const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(q => q.isCorrect).length)

const progressValue = computed(() => {
  if (!quizSubmitted.value) return 0
  return (score.value / totalQuestions.value) * 100
})

function normalizeAnswer(answer: string): string {
  if (typeof answer !== 'string') return ''
  // Removes extra spaces, converts to lowercase, and removes trailing punctuation.
  return answer.trim().toLowerCase().replace(/[.,!?;]$/, '')
}

function validateAnswers() {
  questions.value.forEach(q => {
    if (q.type === 'multiple-fill-in') {
      const isA_Correct = normalizeAnswer(q.userAnswerA!) === normalizeAnswer(q.correctAnswerA!)
      const isB_Correct = normalizeAnswer(q.userAnswerB!) === normalizeAnswer(q.correctAnswerB!)
      q.isCorrect = isA_Correct && isB_Correct
    } else {
      q.isCorrect = normalizeAnswer(q.userAnswer) === normalizeAnswer(q.correctAnswer)
    }
  })
  quizSubmitted.value = true
  showResult.value = true
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced English Grammar In Use Practice"
    test-description="Based on the methodology of Raymond Murphy"
    unit-title="Unit 3: Still, Yet, Already, Any more"
    unit-description="Mastering the nuances of time-related adverbs and their placement in sentences."
    :categories="['Adverbs', 'Tense', 'Sentence Structure', 'Intermediate']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts & Rules</CardTitle>
          <CardDescription>Understanding the function and placement of each adverb is crucial.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div class="prose prose-sm dark:prose-invert max-w-none">
            <h4>1. <strong>Still</strong> (Continuation)</h4>
            <p>Indicates an action or situation continues, often implying surprise or impatience. It suggests the situation has not changed.</p>
            <ul>
              <li><strong>Position:</strong> Usually in the middle of the sentence (after 'to be', before other verbs).</li>
              <li><strong>Positive:</strong> "He is <strong>still</strong> in the meeting."</li>
              <li><strong>Negative:</strong> "She <strong>still</strong> hasn't found her keys." (Emphasizes frustration).</li>
            </ul>

            <h4>2. <strong>Yet</strong> (Expectation)</h4>
            <p>Used for something that is expected, but has not happened up to the present moment. Primarily for negatives and questions.</p>
            <ul>
              <li><strong>Position:</strong> Almost always at the end of the sentence or clause.</li>
              <li><strong>Negative:</strong> "They haven't announced the winner <strong>yet</strong>."</li>
              <li><strong>Question:</strong> "Have you spoken to the manager <strong>yet</strong>?"</li>
            </ul>

            <h4>3. <strong>Already</strong> (Sooner than Expected)</h4>
            <p>Indicates an action happened before now, often earlier than was expected. Primarily for positive sentences.</p>
            <ul>
              <li><strong>Position:</strong> Usually in the middle (like 'still') or at the end for emphasis.</li>
              <li><strong>Mid-position:</strong> "I've <strong>already</strong> eaten lunch."</li>
              <li><strong>End-position:</strong> "He's only 25, but he's a director <strong>already</strong>!"</li>
            </ul>

            <h4>4. <strong>Not ... any more</strong> / <strong>No longer</strong> (Cessation)</h4>
            <p>These express that a past situation or habit has stopped.</p>
            <ul>
              <li><strong>Not ... any more:</strong> More common, especially in speech. Used with a negative verb, at the end of the sentence.</li>
              <li>Example: "I don't live there <strong>any more</strong>."</li>
              <li><strong>No longer:</strong> More formal. Used with a positive verb, in a mid-sentence position.</li>
              <li>Example: "I <strong>no longer</strong> live there."</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the following tasks. Pay close attention to context and sentence structure.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <p class="mb-2 font-semibold">{{ index + 1 }}. {{ q.questionText.split('{input}')[0] }}
              <template v-if="q.type === 'fill-in-the-blank'">
                <Input
                  v-model="q.userAnswer"
                  :disabled="quizSubmitted"
                  class="inline-block w-32 h-8 mx-1"
                  placeholder=".........."
                />
                <span>{{ q.questionText.split('{input}')[1] }}</span>
              </template>
            </p>
            <template v-if="q.type === 'rewrite' || q.type === 'error-correction'">
               <Input
                  v-model="q.userAnswer"
                  :disabled="quizSubmitted"
                  class="w-full h-9"
                  placeholder="Your complete sentence..."
                />
            </template>
            <template v-if="q.type === 'multiple-fill-in'">
               <p class="mb-2 font-semibold">
                {{ q.questionText.split('{inputA}')[0] }}
                <Input
                  v-model="q.userAnswerA"
                  :disabled="quizSubmitted"
                  class="inline-block w-28 h-8 mx-1"
                  placeholder="word A"
                />
                {{ q.questionText.split('{inputA}')[1].split('{inputB}')[0] }}
                 <Input
                  v-model="q.userAnswerB"
                  :disabled="quizSubmitted"
                  class="inline-block w-28 h-8 mx-1"
                  placeholder="word B"
                />
                {{ q.questionText.split('{inputB}')[1] }}
               </p>
            </template>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="quizSubmitted">
            Check Answers & See Results
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your answers and read the explanations to improve.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="flex items-center gap-4">
            <div class="text-3xl font-bold">{{ score }} / {{ totalQuestions }}</div>
            <div class="flex-1">
              <Progress :model-value="progressValue" class="w-full" />
            </div>
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-6">
            <div
              v-for="(q, index) in questions"
              :key="`result-${q.id}`"
              class="p-4 rounded-md"
              :class="q.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                   <CheckCircle2 v-if="q.isCorrect" class="h-5 w-5 text-green-600" />
                   <XCircle v-else class="h-5 w-5 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-muted-foreground">Question {{ index + 1 }}</p>
                  <p v-if="q.type === 'multiple-fill-in'" class="font-semibold text-foreground">Your Answers: '{{ q.userAnswerA || '...' }}' / '{{ q.userAnswerB || '...' }}'</p>
                  <p v-else class="font-semibold text-foreground">Your Answer: "{{ q.userAnswer || 'No answer provided' }}"</p>
                  
                  <div v-if="!q.isCorrect" class="mt-2 text-sm">
                    <span class="font-bold">Correct Answer: </span>
                    <span v-if="q.type === 'multiple-fill-in'" class="italic">"{{ q.correctAnswerA }}" / "{{ q.correctAnswerB }}"</span>
                    <span v-else class="italic">"{{ q.correctAnswer }}"</span>
                  </div>

                  <Alert class="mt-3 bg-background/50">
                    <Lightbulb class="h-4 w-4" />
                    <AlertTitle class="font-bold">Explanation</AlertTitle>
                    <AlertDescription>
                      {{ q.explanation }}
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

<style scoped>
/* Scoped styles can be added here if needed for further customization */
.prose ul {
  padding-left: 1.25rem;
  list-style-type: disc;
}
.prose h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
