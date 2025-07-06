<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

// --- Component Imports ---
// Assuming these are globally available or auto-imported by Nuxt.
// If not, explicit imports would be needed, e.g., from '@/components/ui/...'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

// --- Layout & Navigation ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/4")
}
function goToNextUnit() {
  router.push("/units/grammar/6")
}

// --- Page State Management ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string>>({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
})

// --- Content & Questions ---
// This structure is designed to be easily expanded or fetched from an API.
// Explanations are crafted to emulate a teacher's guidance.
const questions = ref([
  {
    id: 'q1',
    type: 'mcq',
    prompt: "Your colleague is constantly late for meetings, which annoys you. Which sentence best expresses your frustration and desire for a change in their behavior?",
    options: [
      "I wish my colleague wasn't late.",
      "I wish my colleague wouldn't be late.",
      "I wish my colleague weren't late.",
      "I wish my colleague wouldn't have been late."
    ],
    correctAnswer: "I wish my colleague wouldn't be late.",
    explanation: "We use 'wish + person + would' to express dissatisfaction or annoyance with someone's current actions and a desire for them to change. 'Wish + past simple' (wasn't/weren't) is used to express regret about a state or situation, not a repeated action you want someone to stop. 'Wouldn't have been' refers to a past regret (Third Conditional context).",
    commonMistake: "Many students confuse 'wish + past simple' for states ('I wish I was taller') with 'wish + would' for annoying actions ('I wish you would stop shouting')."
  },
  {
    id: 'q2',
    type: 'fill-in',
    prompt: "Complete the sentence with the correct forms of the verbs in brackets. 'If the politician ______ (be) more honest with the public, he ______ (not/need) to worry so much about the upcoming election; I wish he simply ______ (tell) the truth more often.'",
    correctAnswer: "were, wouldn't need, told",
    explanation: "The first two blanks form a classic Second Conditional sentence: 'If + Past Subjunctive (were), ... would + infinitive (wouldn't need)'. We use 'were' for all subjects in formal conditionals to express a hypothetical situation. The final blank uses 'wish + past simple (told)' to express a desire for a different present reality (that he tells the truth more often).",
    commonMistake: "Using 'was' instead of the subjunctive 'were', or incorrectly putting 'would' in the 'if' clause (e.g., *'If the politician would be...'*)."
  },
  {
    id: 'q3',
    type: 'transform',
    prompt: "Transform the following situation into a single sentence using the Second Conditional. Situation: I don't have a pilot's license, so I can't fly a plane around the world.",
    correctAnswer: "If I had a pilot's license, I could fly a plane around the world.",
    explanation: "This tests your ability to convert a real situation into a hypothetical one. The real situation is negative ('don't have', 'can't fly'), so the conditional becomes positive. 'Don't have' -> 'had' (past simple). 'Can't fly' -> 'could fly' ('could' is often used as the 'would' form of 'can').",
    commonMistake: "Simply translating word-for-word without changing the verb tense. For example, writing *'If I don't have a license, I can't fly...'* which is a First Conditional and changes the meaning entirely."
  },
  {
    id: 'q4',
    type: 'fill-in',
    prompt: "You see a fantastic car that is far too expensive for you. What do you say? 'I wish I ______ (can) afford that car.'",
    correctAnswer: "could",
    explanation: "'Wish' must be followed by a past tense form to indicate an unreal present. The past form of 'can' is 'could'. This expresses the sad reality that you are unable to afford the car right now.",
    commonMistake: "Using the present tense, such as *'I wish I can...'*. The key to 'I wish' for the present is to mentally 'go back' one tense."
  },
  {
    id: 'q5',
    type: 'transform',
    prompt: "Your friend is considering a job offer in another country. You are thinking about the possibility. Transform this thought: 'Maybe you'll take the job. Then you'll live abroad. That would be an amazing adventure.' into a Second Conditional sentence starting with 'If'.",
    correctAnswer: "If you took the job, you would live abroad, which would be an amazing adventure.",
    explanation: "This question requires you to chain together multiple hypothetical consequences. The structure is 'If + past simple (took), ... would + infinitive (would live)'. The second result logically follows the first, so it also uses 'would'. This shows an understanding of how to build complex hypothetical scenarios.",
    commonMistake: "Mixing tenses, for example: *'If you took the job, you will live abroad...'* This breaks the conditional structure."
  }
])

// --- Validation & Scoring ---
const results = computed(() => {
  return questions.value.map(q => {
    const userAnswer = userAnswers[q.id]?.trim().toLowerCase().replace(/[,.]/g, '') || ''
    const correctAnswer = q.correctAnswer.trim().toLowerCase().replace(/[,.]/g, '')
    const isCorrect = userAnswer === correctAnswer
    
    // For 'transform' type, we can allow for some flexibility if needed in a real app.
    // For this example, we'll stick to a strict match. A more advanced validator could
    // check for key phrases or verb forms.

    return {
      ...q,
      userAnswer: userAnswers[q.id] || '(No answer)',
      isCorrect,
    }
  })
})

const score = computed(() => {
  return results.value.filter(r => r.isCorrect).length
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => userAnswers[q.id] && userAnswers[q.id].trim() !== '')
})

function checkAnswers() {
  if (!allQuestionsAnswered.value) {
    alert("Please answer all questions before checking your results.")
    return
  }
  showResult.value = true
  // Scroll to results for better UX on long pages
  setTimeout(() => {
    document.getElementById('results-card')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on Raymond Murphy's methodology"
    unit-title="Unit 5: If I knew...; I wish I knew..."
    unit-description="Mastering the Second Conditional and expressing wishes about the present."
    :categories="['Conditionals', 'Subjunctive Mood', 'Wishes', 'Hypothetical Situations']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL                                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Unreal Present/Future</CardTitle>
          <CardDescription>
            This unit focuses on talking about situations that are not real now, or are unlikely to happen in the future. We are imagining a different reality.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-bold">1. The Second Conditional: If + Past, ... would + infinitive</h4>
            <p class="text-muted-foreground">Used to imagine the result of an unlikely or impossible present/future action.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li><span class="font-semibold">Structure:</span> If I <span class="text-blue-600 dark:text-blue-400">had</span> a map, I <span class="text-purple-600 dark:text-purple-400">would lend</span> it to you.</li>
              <li><span class="font-semibold">Reality:</span> I don't have a map, so I can't lend it.</li>
              <li><span class="font-semibold">Teacher's Note (was/were):</span> In formal grammar, we use <span class="font-bold">'were'</span> for all persons in the 'if-clause' (e.g., "If I <span class="italic">were</span> you..."). In informal speech, 'was' is common ("If I <span class="italic">was</span> rich..."). 'Were' is always the safer, more correct choice in exams.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">2. Wishes about the Present: I wish + Past Simple</h4>
            <p class="text-muted-foreground">Used to express regret that a present situation is not different.</p>
             <ul class="mt-2 list-inside list-disc space-y-1">
              <li><span class="font-semibold">Structure:</span> I wish I <span class="text-blue-600 dark:text-blue-400">knew</span> how to cook.</li>
              <li><span class="font-semibold">Reality:</span> I don't know how to cook, and I regret this.</li>
              <li><span class="font-semibold">Connection:</span> The feeling is linked to the Second Conditional: "If I knew how to cook, I would make a delicious meal."</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">3. Annoyance/Desire for Change: I wish + ... would</h4>
            <p class="text-muted-foreground">Used to complain about a situation or someone's behavior that you want to change.</p>
             <ul class="mt-2 list-inside list-disc space-y-1">
              <li><span class="font-semibold">Structure:</span> I wish you <span class="text-purple-600 dark:text-purple-400">would stop</span> making that noise.</li>
              <li><span class="font-semibold">Important:</span> You generally cannot use "I wish I would...". This structure is for wishing someone or something <span class="italic">else</span> would change their actions.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 5: Practice Exercises</CardTitle>
          <CardDescription>Read the material carefully, then test your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Question 1: MCQ -->
          <div v-if="questions[0]" class="space-y-3">
            <Label for="q1" class="font-semibold">1. {{ questions[0].prompt }}</Label>
            <RadioGroup v-model="userAnswers.q1" id="q1" class="space-y-2">
              <div v-for="option in questions[0].options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="option" :value="option" />
                <Label :for="option" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Question 2: Fill-in -->
          <div v-if="questions[1]" class="space-y-3">
            <Label for="q2" class="font-semibold">2. {{ questions[1].prompt }}</Label>
            <Input v-model="userAnswers.q2" id="q2" placeholder="verb, verb, verb" />
          </div>

          <!-- Question 3: Transform -->
          <div v-if="questions[2]" class="space-y-3">
            <Label for="q3" class="font-semibold">3. {{ questions[2].prompt }}</Label>
            <Input v-model="userAnswers.q3" id="q3" placeholder="If..." />
          </div>

          <!-- Question 4: Fill-in -->
          <div v-if="questions[3]" class="space-y-3">
            <Label for="q4" class="font-semibold">4. {{ questions[3].prompt }}</Label>
            <Input v-model="userAnswers.q4" id="q4" placeholder="could" />
          </div>

          <!-- Question 5: Transform -->
          <div v-if="questions[4]" class="space-y-3">
            <Label for="q5" class="font-semibold">5. {{ questions[4].prompt }}</Label>
            <Input v-model="userAnswers.q5" id="q5" placeholder="If..." />
          </div>

          <!-- Submission Button -->
          <Button @click="checkAnswers" class="w-full" :disabled="!allQuestionsAnswered">
            Check Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SECTION                                                         -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-card">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>You scored {{ score }} out of {{ questions.length }}. Review the detailed explanations below to improve.</CardDescription>
          <Progress :model-value="scorePercentage" class="mt-4" />
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(result, index) in results" :key="result.id">
            <h4 class="font-semibold">Question {{ index + 1 }}</h4>
            <p class="text-sm text-muted-foreground mb-2">{{ result.prompt }}</p>
            
            <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="mb-2">
              <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
              <AlertTitle>
                {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}
              </AlertTitle>
              <AlertDescription>
                Your answer: <span class="font-mono p-1 bg-muted rounded-md">{{ result.userAnswer }}</span>
                <template v-if="!result.isCorrect">
                  <br/>Correct answer: <span class="font-mono p-1 bg-muted rounded-md">{{ result.correctAnswer }}</span>
                </template>
              </AlertDescription>
            </Alert>
            
            <Alert variant="secondary">
              <AlertTriangle class="h-4 w-4" />
              <AlertTitle>Teacher's Explanation</AlertTitle>
              <AlertDescription>
                <p>{{ result.explanation }}</p>
                <p v-if="result.commonMistake" class="mt-2 text-xs italic">
                  <span class="font-bold">Common Pitfall:</span> {{ result.commonMistake }}
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
/* Add any page-specific styles if needed */
/* The layout and component styles are assumed to be handled by Tailwind/shadcn-vue */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
