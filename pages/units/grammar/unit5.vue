<!--
  File: @/pages/units/grammar/2.vue
  Unit: 2 - Past Continuous (I was doing)
  Description: An advanced grammar practice page for English language learners,
  focusing on the correct usage of the past continuous tense. This page includes
  detailed explanations, challenging exercises, and a robust feedback system.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are available in your project
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, HelpCircle, BookOpen } from 'lucide-vue-next'

definePageMeta({
  // This ensures the custom layout is applied to this page.
  layout: false,
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigates to the preceding unit.
  router.push("/units/grammar/1")
}
function goToNextUnit() {
  // Navigates to the subsequent unit.
  router.push("/units/grammar/3")
}

// --- STATE MANAGEMENT ---
const isSubmitted = ref(false)

// --- DATA STRUCTURE FOR QUESTIONS & ANSWERS ---
// This structure is designed to be highly detailed, providing rich context and explanations.
const questions = ref([
  {
    id: 'q1',
    type: 'fill-in-the-blank',
    instruction: 'Complete the sentence using the verb in brackets in the Past Continuous.',
    context: 'A simple action in progress at a specific past time.',
    prompt: "At 10:30 last night, you called me, but I didn't answer. I ______ (have) a shower.",
    correctAnswers: ['was having'],
    explanation: 'We use the Past Continuous (was/were + verb-ing) for an action in progress at a specific time in the past. The time is "10:30 last night". "I" requires "was".'
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank-dual',
    instruction: 'Put the verbs into the correct form, Past Continuous or Past Simple.',
    context: 'An action in progress interrupted by a shorter action.',
    prompt: 'While I ______ (drive) home, I ______ (see) a serious accident on the motorway.',
    correctAnswers: ['was driving', 'saw'],
    explanation: 'The longer, background action ("drive") uses the Past Continuous. The shorter, interrupting action ("see") uses the Past Simple. The driving was already in progress when the seeing happened.'
  },
  {
    id: 'q3',
    type: 'fill-in-the-blank',
    instruction: 'Form a question for the given situation.',
    context: 'You see a friend with a black eye. You want to know what happened.',
    prompt: 'You: "What ______ (you / do) when you got that black eye?"',
    correctAnswers: ['were you doing'],
    explanation: 'To form a question in the Past Continuous, we use the structure: (Wh-word) + was/were + subject + verb-ing? Here, "you" requires "were".'
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank-dual',
    instruction: 'Put the verbs into the correct form, Past Continuous or Past Simple.',
    context: 'Two parallel actions happening simultaneously.',
    prompt: 'The office was busy. I ______ (prepare) the report while my colleague ______ (talk) to clients on the phone.',
    correctAnswers: ['was preparing', 'was talking'],
    explanation: 'When two or more actions were happening at the same time in the past, we use the Past Continuous for both. The word "while" often signals this parallel structure.'
  },
  {
    id: 'q5',
    type: 'fill-in-the-blank',
    instruction: 'Complete the sentence using the verb in brackets in the correct form (Past Continuous or Past Simple).',
    context: 'This question tests your knowledge of stative verbs.',
    prompt: "I couldn't call the hotel because I ______ (not know) their number.",
    correctAnswers: ['did not know', "didn't know"],
    explanation: '"Know" is a stative verb, which describes a state, not an action. Stative verbs (like know, want, need, believe) are not typically used in continuous tenses. Therefore, the Past Simple is correct.'
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank-dual',
    instruction: 'Put the verbs into the correct form, Past Continuous or Past Simple.',
    context: 'A sequence of completed actions versus a background action.',
    prompt: 'Yesterday evening, the phone ______ (ring) three times while we ______ (have) dinner.',
    correctAnswers: ['rang', 'were having'],
    explanation: '"Having dinner" was the long background action in progress, so it takes the Past Continuous. The phone ringing happened three separate, completed times during that period, so it takes the Past Simple.'
  },
  {
    id: 'q7',
    type: 'fill-in-the-blank',
    instruction: 'Complete the sentence using the verb in brackets in the negative Past Continuous.',
    context: 'Clarifying what was NOT happening.',
    prompt: 'I saw them at the library, so I know they ______ (not play) football at that time.',
    correctAnswers: ['were not playing', "weren't playing"],
    explanation: 'This requires the negative form of the Past Continuous. The subject "they" is plural, so we use "were". The negative is formed as "were not + verb-ing" or the contraction "weren\'t + verb-ing".'
  },
  {
    id: 'q8',
    type: 'fill-in-the-blank-complex',
    instruction: 'Complete the complex sentence. Choose wisely between Past Simple and Past Continuous.',
    context: 'Describing a scene from a story.',
    prompt: 'The wind ______ (blow) hard and rain ______ (fall) heavily when the detective finally ______ (find) the clue he ______ (look) for.',
    correctAnswers: ['was blowing', 'was falling', 'found', 'was looking'],
    explanation: 'The wind "blowing" and rain "falling" are background actions setting the scene, so they use the Past Continuous. The detective "looking" for the clue was also an ongoing action. The moment he "found" it is a short, completed action that interrupts the searching process, so it takes the Past Simple.'
  },
])

// Initialize userAnswers with empty strings for each input field.
const userAnswers = ref(
  questions.value.flatMap(q => {
    if (q.type === 'fill-in-the-blank-dual') return ['', '']
    if (q.type === 'fill-in-the-blank-complex') return ['', '', '', '']
    return ['']
  })
)

// --- VALIDATION & SCORING LOGIC ---
function isAnswerCorrect(userAnswer: string, correctAnswers: string[]): boolean {
  if (typeof userAnswer !== 'string') return false
  const cleanedUserAnswer = userAnswer.trim().toLowerCase().replace(/[.]$/, '') // Remove trailing period
  return correctAnswers.some(correct => correct.toLowerCase() === cleanedUserAnswer)
}

const validationResults = computed(() => {
  let answerIndex = 0
  return questions.value.map(q => {
    if (q.type === 'fill-in-the-blank-dual') {
      const isCorrect1 = isAnswerCorrect(userAnswers.value[answerIndex], [q.correctAnswers[0]])
      const isCorrect2 = isAnswerCorrect(userAnswers.value[answerIndex + 1], [q.correctAnswers[1]])
      answerIndex += 2
      return { isCorrect: isCorrect1 && isCorrect2, details: [isCorrect1, isCorrect2] }
    }
    if (q.type === 'fill-in-the-blank-complex') {
      const isCorrect1 = isAnswerCorrect(userAnswers.value[answerIndex], [q.correctAnswers[0]])
      const isCorrect2 = isAnswerCorrect(userAnswers.value[answerIndex + 1], [q.correctAnswers[1]])
      const isCorrect3 = isAnswerCorrect(userAnswers.value[answerIndex + 2], [q.correctAnswers[2]])
      const isCorrect4 = isAnswerCorrect(userAnswers.value[answerIndex + 3], [q.correctAnswers[3]])
      answerIndex += 4
      return { isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4, details: [isCorrect1, isCorrect2, isCorrect3, isCorrect4] }
    }
    const isCorrectSingle = isAnswerCorrect(userAnswers.value[answerIndex], q.correctAnswers)
    answerIndex += 1
    return { isCorrect: isCorrectSingle }
  })
})

const score = computed(() => validationResults.value.filter(r => r.isCorrect).length)
const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => (score.value / totalQuestions.value) * 100)

const resultSummary = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) {
    return { title: 'Exceptional!', message: 'Perfect score! You have mastered the nuances of the Past Continuous. Outstanding work.' }
  } else if (percentage >= 75) {
    return { title: 'Excellent Work!', message: 'You have a strong understanding of the Past Continuous. Review the explanations for any missed questions to solidify your knowledge.' }
  } else if (percentage >= 50) {
    return { title: 'Good Effort!', message: 'You\'re on the right track! The Past Continuous can be tricky. Carefully read the explanations to understand the key concepts.' }
  } else {
    return { title: 'Needs Review', message: 'This unit is challenging. We highly recommend reviewing the learning material again before retaking the exercise. Pay close attention to the difference between Past Simple and Past Continuous.' }
  }
})

// --- ACTIONS ---
function checkAnswers() {
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  isSubmitted.value = false
  userAnswers.value = userAnswers.value.map(() => '')
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper to get the correct answer index for the v-model
let answerInputIndex = -1;
function getAnswerIndex() {
  answerInputIndex++
  return answerInputIndex
}
function resetAnswerIndex() {
  answerInputIndex = -1
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Based on the book by Raymond Murphy"
    unit-title="Unit 2: Past Continuous (I was doing)"
    unit-description="Practice using the past continuous for actions in progress in the past, interrupted actions, and setting scenes."
    :categories="['Tense', 'Past Tense', 'Continuous Aspect', 'B1 Intermediate']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            <span>Usage and Structure</span>
          </CardTitle>
          <CardDescription>
            The Past Continuous describes an action or event that was in progress at a specific time in the past.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p class="font-semibold">Structure: <span class="font-mono bg-muted px-2 py-1 rounded">subject + was/were + verb(-ing)</span></p>
          <ul class="list-disc space-y-2 pl-5">
            <li><span class="font-semibold">I / he / she / it</span> <span class="text-muted-foreground">+</span> <span class="font-bold">was</span> working.</li>
            <li><span class="font-semibold">You / we / they</span> <span class="text-muted-foreground">+</span> <span class="font-bold">were</span> working.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <HelpCircle class="h-6 w-6 text-primary" />
            <span>Key Use Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <h4 class="font-semibold text-md mb-2">1. Interrupted Past Actions</h4>
            <p class="text-sm text-muted-foreground">Use the Past Continuous for a longer action that was interrupted by a shorter action (which uses the Past Simple).</p>
            <p class="text-sm mt-2 p-3 bg-muted rounded-md border">I <span class="font-bold text-primary">was walking</span> home when I <span class="font-bold text-secondary-foreground">met</span> Sarah.</p>
          </div>
          <div>
            <h4 class="font-semibold text-md mb-2">2. Specific Time as Interruption</h4>
            <p class="text-sm text-muted-foreground">To describe what was happening at a precise moment in the past.</p>
            <p class="text-sm mt-2 p-3 bg-muted rounded-md border">Last night at 7 PM, we <span class="font-bold text-primary">were eating</span> dinner.</p>
          </div>
          <div>
            <h4 class="font-semibold text-md mb-2">3. Parallel Actions</h4>
            <p class="text-sm text-muted-foreground">To describe two or more actions happening at the same time.</p>
            <p class="text-sm mt-2 p-3 bg-muted rounded-md border">He <span class="font-bold text-primary">was studying</span> in his room while his brother <span class="font-bold text-primary">was playing</span> video games.</p>
          </div>
          <div>
            <h4 class="font-semibold text-md mb-2">4. Setting a Scene in a Story</h4>
            <p class="text-sm text-muted-foreground">To provide background information and create atmosphere.</p>
            <p class="text-sm mt-2 p-3 bg-muted rounded-md border">The sun <span class="font-bold text-primary">was shining</span> and the birds <span class="font-bold text-primary">were singing</span>. Maria opened the window.</p>
          </div>
          <Alert variant="destructive">
            <AlertTitle>Important: Stative Verbs</AlertTitle>
            <AlertDescription>
              Verbs describing states or feelings (e.g., <span class="font-mono">know, believe, want, need, love</span>) are generally NOT used in continuous tenses. Use the Past Simple instead.
              <br>Incorrect: <span class="line-through">I was wanting a coffee.</span>
              <br>Correct: I <span class="font-semibold">wanted</span> a coffee.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      {{ resetAnswerIndex() }}
      <Card v-for="(question, qIndex) in questions" :key="question.id" class="w-full">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Question {{ qIndex + 1 }}</CardTitle>
          <CardDescription class="text-sm italic">"{{ question.context }}"</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <p class="text-sm font-medium leading-relaxed">{{ question.instruction }}</p>
            <div class="space-y-2 text-base">
              <template v-if="question.type === 'fill-in-the-blank'">
                <Label :for="question.id">Your Answer</Label>
                <p>
                  <span v-for="(part, index) in question.prompt.split('______')" :key="index">
                    {{ part }}
                    <Input
                      v-if="index < question.prompt.split('______').length - 1"
                      :id="question.id"
                      v-model="userAnswers[getAnswerIndex()]"
                      type="text"
                      class="inline-block w-48 mx-1"
                      :disabled="isSubmitted"
                    />
                  </span>
                </p>
              </template>
              <template v-if="question.type === 'fill-in-the-blank-dual'">
                <p>
                  <span v-for="(part, index) in question.prompt.split('______')" :key="index">
                    {{ part }}
                    <Input
                      v-if="index < question.prompt.split('______').length - 1"
                      :id="`${question.id}-${index}`"
                      v-model="userAnswers[getAnswerIndex()]"
                      type="text"
                      class="inline-block w-48 mx-1"
                      :disabled="isSubmitted"
                    />
                  </span>
                </p>
              </template>
              <template v-if="question.type === 'fill-in-the-blank-complex'">
                <p>
                   <span v-for="(part, index) in question.prompt.split('______')" :key="index">
                    {{ part }}
                    <Input
                      v-if="index < question.prompt.split('______').length - 1"
                      :id="`${question.id}-${index}`"
                      v-model="userAnswers[getAnswerIndex()]"
                      type="text"
                      class="inline-block w-48 mx-1"
                      :disabled="isSubmitted"
                    />
                  </span>
                </p>
              </template>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div v-if="!isSubmitted" class="flex justify-end">
        <Button size="lg" @click="checkAnswers">Check Answers</Button>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      {{ resetAnswerIndex() }}
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Results Summary</CardTitle>
          <CardDescription>Here's how you did. Review the detailed explanations below.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="text-center">
            <h3 class="text-2xl font-bold">{{ resultSummary.title }}</h3>
            <p class="text-muted-foreground">{{ resultSummary.message }}</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-lg font-bold">{{ score }} / {{ totalQuestions }} Correct</span>
            <Progress :model-value="scorePercentage" class="w-full" />
            <span class="text-lg font-bold">{{ scorePercentage.toFixed(0) }}%</span>
          </div>
          <div class="text-center mt-4">
            <Button @click="resetTest">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 class="text-xl font-bold mt-4">Detailed Feedback</h3>
      <Card v-for="(question, qIndex) in questions" :key="`result-${question.id}`" class="w-full">
        <CardHeader :class="validationResults[qIndex].isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'">
          <div class="flex justify-between items-start">
            <div>
              <CardTitle class="text-base font-semibold">Question {{ qIndex + 1 }} Review</CardTitle>
              <p class="text-sm mt-2">
                <span class="font-semibold">Your Answer(s): </span>
                <span class="font-mono text-sm">
                  <template v-if="question.type === 'fill-in-the-blank'">
                    '{{ userAnswers[getAnswerIndex()] || 'empty' }}'
                  </template>
                  <template v-else-if="question.type === 'fill-in-the-blank-dual'">
                    '{{ userAnswers[getAnswerIndex()] || 'empty' }}', '{{ userAnswers[getAnswerIndex()] || 'empty' }}'
                  </template>
                   <template v-else-if="question.type === 'fill-in-the-blank-complex'">
                    '{{ userAnswers[getAnswerIndex()] || 'empty' }}', '{{ userAnswers[getAnswerIndex()] || 'empty' }}', '{{ userAnswers[getAnswerIndex()] || 'empty' }}', '{{ userAnswers[getAnswerIndex()] || 'empty' }}'
                  </template>
                </span>
              </p>
            </div>
            <div class="flex items-center gap-2" :class="validationResults[qIndex].isCorrect ? 'text-green-600' : 'text-red-600'">
              <CheckCircle2 v-if="validationResults[qIndex].isCorrect" class="h-8 w-8" />
              <XCircle v-else class="h-8 w-8" />
              <span class="font-bold text-lg">{{ validationResults[qIndex].isCorrect ? 'Correct' : 'Incorrect' }}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent class="pt-6">
          <Alert :variant="validationResults[qIndex].isCorrect ? 'default' : 'destructive'">
            <AlertTitle class="font-bold">Explanation</AlertTitle>
            <AlertDescription class="space-y-2">
              <p>{{ question.explanation }}</p>
              <div v-if="!validationResults[qIndex].isCorrect">
                <p class="font-semibold">Correct Answer(s): <span class="font-mono bg-background p-1 rounded">{{ question.correctAnswers.join(' / ') }}</span></p>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
