<!-- 
  File: @/pages/units/grammar/0.vue
  Description: An advanced grammar practice page for the "Wish" unit, inspired by Raymond Murphy's "English Grammar In Use".
  This page leverages a sophisticated layout and provides in-depth, challenging exercises with a detailed validator
  to ensure a significant improvement in the student's grammatical understanding.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component & ShadCN/UI Imports ---
// These are assumed to be available in the project structure.
// If not, they would need to be installed and configured.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleCheck, CircleX, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom GrammarLayout directly
})

// --- Navigation ---
const router = useRouter()
const currentUnit = 0
function goToPreviousUnit() {
  // In a real app, this might go to an index or handle the edge case.
  // For this example, we'll just log it as there's no unit -1.
  console.warn("Attempted to go to a unit before the first one.")
}
function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Reactive State for the Quiz ---
const showResult = ref(false)
const isSubmitted = ref(false)

interface Question {
  id: number
  context: string
  prompt: string
  userAnswer: string
  correctAnswers: string[]
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    context: "You don't have a car and it takes you an hour to get to work. You're thinking about your daily commute.",
    prompt: "This commute is so long. I wish I ___ a car.",
    userAnswer: '',
    correctAnswers: ['had'],
    explanation: "We use 'wish + past simple' (had) to talk about a present situation that we want to be different. The reality is 'I don't have a car', so the hypothetical present is 'I wish I had a car'."
  },
  {
    id: 2,
    context: "You went to a party last night and drank too much coffee. Now you can't sleep.",
    prompt: "I feel so awake. I really wish I ___ so much coffee last night.",
    userAnswer: '',
    correctAnswers: ["hadn't drunk", "had not drunk"],
    explanation: "We use 'wish + past perfect' (hadn't drunk) to express regret about a past action. The action of drinking coffee happened in the past and you cannot change it now. This structure is for past regrets."
  },
  {
    id: 3,
    context: "Your neighbour plays loud music every night. It's really annoying you.",
    prompt: "It's midnight already! I wish he ___ that music down.",
    userAnswer: '',
    correctAnswers: ['would turn'],
    explanation: "We use 'wish + person + would + verb' to express dissatisfaction or annoyance about someone's current actions and to wish for them to change their behaviour. You are complaining about your neighbour's actions."
  },
  {
    id: 4,
    context: "You live in a very cold country, but you dream of living on a sunny beach.",
    prompt: "It's snowing again. I wish I ___ somewhere warm right now.",
    userAnswer: '',
    correctAnswers: ['lived', 'was living', 'were living'],
    explanation: "For present wishes, 'wish + past simple' (lived) is correct. For a continuous situation, 'wish + past continuous' (was/were living) is also suitable. 'Were' is often preferred in formal subjunctive mood, but 'was' is common in speech."
  },
  {
    id: 5,
    context: "You missed an important phone call because your phone was on silent. You're looking at the missed call notification.",
    prompt: "Oh no, it was the head office! I wish my phone ___ on silent.",
    userAnswer: '',
    correctAnswers: ["hadn't been", "had not been"],
    explanation: "This is a regret about a past situation. The state of the phone ('was on silent') is in the past, and you regret it. Therefore, 'wish + past perfect' (hadn't been) is the correct structure."
  },
  {
    id: 6,
    context: "You are trying to concentrate, but your colleague keeps tapping their pen on the desk.",
    prompt: "Could you please stop that? I wish you ___ tapping that pen.",
    userAnswer: '',
    correctAnswers: ['would stop'],
    explanation: "This is a direct complaint about another person's repeated, annoying action. 'Wish + would + verb' is used to request a change in behaviour. You can't say 'I wish I would...'"
  },
  {
    id: 7,
    context: "You see a job advertised that requires fluent Spanish, but you only know a few words.",
    prompt: "This is my dream job. If only I ___ Spanish more fluently.",
    userAnswer: '',
    correctAnswers: ['spoke', 'could speak'],
    explanation: "'If only' can be used instead of 'I wish' for stronger emphasis. The structure is the same: 'If only + past simple' (spoke) for a present wish. Using 'could speak' is also very common to talk about ability."
  },
  {
    id: 8,
    context: "You are giving advice to a friend who failed an exam because he didn't study.",
    prompt: "You look so disappointed. You probably wish you ___ more before the test.",
    userAnswer: '',
    correctAnswers: ['had studied'],
    explanation: "This is a wish about a past event (or lack of an event). The studying should have happened before the test. This is a classic example of regret, requiring 'wish + past perfect' (had studied)."
  }
])

// --- Computed Properties for Results ---
const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Perfect Score!", message: "Outstanding! You have a masterful command of the subjunctive mood with 'wish'.", variant: "success" }
  if (percentage >= 75) return { title: "Excellent Work!", message: "You have a strong understanding of these structures. Review the explanations for any mistakes to perfect your knowledge.", variant: "success" }
  if (percentage >= 50) return { title: "Good Effort!", message: "You're on the right track! Pay close attention to the difference between past regrets and present wishes.", variant: "warning" }
  return { title: "Needs Review", message: "This is a tricky topic. Carefully read all the explanations below to understand the core concepts. Repetition is key!", variant: "destructive" }
})

// --- Methods ---
function validateAnswers() {
  isSubmitted.value = false // Reset submission state to allow UI reactivity
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\s+/g, ' ')
    q.isCorrect = q.correctAnswers.includes(userAnswerCleaned)
  })
  isSubmitted.value = true
  showResult.value = true
  
  // Scroll to results
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function resetTest() {
  showResult.value = false
  isSubmitted.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    delete q.isCorrect
  })
}

function getInputBorderClass(question: Question) {
  if (!isSubmitted.value) return 'border-input'
  return question.isCorrect ? 'border-green-500 focus-visible:ring-green-500' : 'border-red-500 focus-visible:ring-red-500'
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced Exercises Inspired by Raymond Murphy"
    unit-title="Unit 0: I wish I knew..."
    unit-description="Mastering hypothetical situations, regrets, and complaints using 'wish' and 'if only'."
    :categories="['Subjunctive Mood', 'Hypothetical Situations', 'Regrets', 'Complaints']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts of 'Wish'</CardTitle>
          <CardDescription>
            'Wish' is used to express a desire for a situation to be different. The verb tense that follows 'wish' is crucial as it determines whether the wish is about the present, past, or a desired change in behavior.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-bold text-base mb-1">1. Wishes about the Present</h4>
            <p class="text-muted-foreground mb-2">To express a desire for a present situation to be different (something that is not true now).</p>
            <p class="font-mono bg-muted p-2 rounded-md"><code>wish + Past Simple</code></p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"I speak a little French." → "I <span class="font-bold text-primary">wish I spoke</span> French fluently."</li>
              <li>"It's raining." → "I <span class="font-bold text-primary">wish it wasn't raining</span>." (or <span class="italic">...it weren't raining.</span>)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-base mb-1">2. Wishes about the Past (Regrets)</h4>
            <p class="text-muted-foreground mb-2">To express regret that something did or did not happen in the past.</p>
            <p class="font-mono bg-muted p-2 rounded-md"><code>wish + Past Perfect</code></p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"I didn't go to the concert." → "I <span class="font-bold text-primary">wish I had gone</span> to the concert."</li>
              <li>"You made a mistake." → "I <span class="font-bold text-primary">wish I hadn't made</span> that mistake."</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-base mb-1">3. Wishes for a Change in Behaviour (Complaints)</h4>
            <p class="text-muted-foreground mb-2">To express impatience, annoyance, or dissatisfaction with someone else's actions (or lack thereof) and to desire a change.</p>
            <p class="font-mono bg-muted p-2 rounded-md"><code>wish + person/thing + would + infinitive</code></p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"You are always late." → "I <span class="font-bold text-primary">wish you would be</span> on time."</li>
              <li>"The car won't start." → "I <span class="font-bold text-primary">wish this car would start</span>."</li>
              <li><span class="font-semibold">Note:</span> You cannot use this form for yourself. <span class="line-through">I wish I would study more.</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences with the correct form of the verb in brackets.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
              <p class="text-sm text-muted-foreground">
                <span class="font-bold">{{ index + 1 }}.</span> {{ q.context }}
              </p>
              <div class="flex items-center gap-2">
                 <p class="font-mono text-sm md:text-base flex-grow">{{ q.prompt.split('___')[0] }}
                  <Input
                    :id="`q${q.id}`"
                    v-model="q.userAnswer"
                    type="text"
                    :disabled="isSubmitted"
                    placeholder="your answer"
                    class="mx-2 inline-block w-40 text-center transition-all duration-300"
                    :class="getInputBorderClass(q)"
                    autocomplete="off"
                  />{{ q.prompt.split('___')[1] }}
                 </p>
              </div>
            </div>
            <div class="flex gap-4">
               <Button type="submit" :disabled="isSubmitted" class="w-full">Check Answers</Button>
               <Button v-if="isSubmitted" @click="resetTest" variant="secondary" class="w-full">Try Again</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <div class="flex items-center gap-4 pt-2">
              <Progress :model-value="scorePercentage" class="w-[60%]" />
              <span class="font-bold text-lg">{{ score }} / {{ totalQuestions }} ({{ scorePercentage.toFixed(0) }}%)</span>
            </div>
          </CardHeader>
          <CardContent>
            <Alert :variant="scoreFeedback.variant" class="mb-6">
              <component
                :is="scoreFeedback.variant === 'destructive' ? CircleX : CircleCheck"
                class="h-4 w-4"
              />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>{{ scoreFeedback.message }}</AlertDescription>
            </Alert>
            
            <div class="space-y-6">
              <div v-for="q in questions" :key="q.id" class="border p-4 rounded-lg" :class="q.isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'">
                <p class="text-sm text-muted-foreground">{{ q.context }}</p>
                <p class="mt-2 text-gray-800">
                  <span class="font-bold">Q:</span> {{ q.prompt.replace('___', `[ ${q.correctAnswers[0]} ]`) }}
                </p>
                <div class="mt-2 text-sm">
                  <span class="font-bold">Your answer:</span>
                  <span :class="q.isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold line-through'">
                    {{ q.userAnswer || ' (no answer)' }}
                  </span>
                  <component :is="q.isCorrect ? CircleCheck : CircleX" class="inline-block h-5 w-5 ml-2" :class="q.isCorrect ? 'text-green-600' : 'text-red-600'"/>
                </div>
                 <div v-if="!q.isCorrect" class="mt-1 text-sm">
                  <span class="font-bold">Correct answer(s):</span>
                  <span class="text-green-800 font-semibold">{{ q.correctAnswers.join(' / ') }}</span>
                </div>
                <Alert class="mt-4">
                  <Lightbulb class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    {{ q.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles for this page */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
