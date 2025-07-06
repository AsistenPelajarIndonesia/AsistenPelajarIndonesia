<!--
  File: @/pages/units/grammar/23.vue
  Description: A dedicated Nuxt 3 page for Unit 23: Adjective + preposition 2.
  This page provides in-depth learning material, challenging practice exercises,
  and an advanced results validator to help students master complex adjective-preposition pairs.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// These components are assumed to be available in the project,
// likely from a library like shadcn-vue.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, HelpCircle, XCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Page & Unit Metadata ---
const testTitle = 'English Grammar In Use Practice'
const testDescription = 'Advanced exercises based on the book by Raymond Murphy.'
const unitTitle = 'Unit 23: Adjective + preposition 2'
const unitDescription = "This unit explores more complex adjective-preposition combinations, focusing on patterns related to people's actions, emotional reactions, and other common pairings."
const categories = ['Adjectives', 'Prepositions', 'Intermediate Grammar', 'Common Patterns']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/22")
}
function goToNextUnit() {
  router.push("/units/grammar/24")
}

// --- Reactive State for Practice & Results ---
const showResult = ref(false)

const questions = ref([
  {
    id: 1,
    sentence_start: 'It was very generous',
    sentence_end: 'you to pay for everything.',
    userAnswer: '',
    correctAnswer: 'of',
    explanation: "We use 'adjective + OF + person' (e.g., nice of you, silly of him) to comment on that person's action. The structure expresses an opinion about the person who performed the act.",
    isCorrect: null as boolean | null,
  },
  {
    id: 2,
    sentence_start: 'Why are you so angry',
    sentence_end: 'what happened yesterday?',
    userAnswer: '',
    correctAnswer: 'about',
    explanation: "We are 'angry ABOUT a thing' or 'angry WITH a person'. Since 'what happened' is a thing (an event), 'about' is the correct preposition.",
    isCorrect: null as boolean | null,
  },
  {
    id: 3,
    sentence_start: 'I was delighted',
    sentence_end: 'the present you gave me.',
    userAnswer: '',
    correctAnswer: 'with',
    explanation: "We use 'delighted/pleased/satisfied/disappointed WITH something'. This pattern is common for expressing feelings in reaction to an object or situation.",
    isCorrect: null as boolean | null,
  },
  {
    id: 4,
    sentence_start: 'The city was crowded',
    sentence_end: 'tourists during the festival.',
    userAnswer: '',
    correctAnswer: 'with',
    explanation: "'Crowded WITH' is a standard collocation used to describe a place full of people or things.",
    isCorrect: null as boolean | null,
  },
  {
    id: 5,
    sentence_start: 'Everyone was shocked',
    sentence_end: 'the news of the accident.',
    userAnswer: '',
    correctAnswer: ['at', 'by'],
    explanation: "For reactions like 'surprised', 'shocked', 'amazed', and 'astonished', both 'AT' and 'BY' are correct. 'At' often points to the cause, while 'by' can imply the agent or a more passive reaction.",
    isCorrect: null as boolean | null,
  },
  {
    id: 6,
    sentence_start: 'He is not very good',
    sentence_end: 'repairing things.',
    userAnswer: '',
    correctAnswer: 'at',
    explanation: "To describe skill or lack of skill in an activity, we use the pattern 'good/bad/terrible AT something/doing something'.",
    isCorrect: null as boolean | null,
  },
  {
    id: 7,
    sentence_start: 'I’m sorry',
    sentence_end: 'the mess. I’ll clear it up later.',
    userAnswer: '',
    correctAnswer: 'about',
    explanation: "We say 'sorry ABOUT something' to apologize for a situation (like the mess). We say 'sorry FOR doing something' to apologize for an action (e.g., 'sorry for making a mess'). Here, 'about' fits the noun 'mess'.",
    isCorrect: null as boolean | null,
  },
  {
    id: 8,
    sentence_start: "I'm a bit short",
    sentence_end: 'money. Can you lend me some?',
    userAnswer: '',
    correctAnswer: 'of',
    explanation: "The expression 'short OF something' is a fixed phrase meaning you do not have enough of it.",
    isCorrect: null as boolean | null,
  },
  {
    id: 9,
    sentence_start: 'The company is responsible',
    sentence_end: 'the damage to the environment.',
    userAnswer: '',
    correctAnswer: 'for',
    explanation: "The adjective 'responsible' is always followed by 'FOR' when indicating blame or credit for something.",
    isCorrect: null as boolean | null,
  },
  {
    id: 10,
    sentence_start: "Are you aware",
    sentence_end: 'the risks involved in this project?',
    userAnswer: '',
    correctAnswer: 'of',
    explanation: "The adjective 'aware' is followed by 'OF' to mean 'having knowledge or perception of a situation or fact'.",
    isCorrect: null as boolean | null,
  }
])

// --- Computed Properties for Scoring ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(q => q.isCorrect).length)
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

// --- Core Logic Functions ---
function validateAnswers() {
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase();
    if (Array.isArray(q.correctAnswer)) {
      q.isCorrect = q.correctAnswer.includes(userAnswerCleaned);
    } else {
      q.isCorrect = userAnswerCleaned === q.correctAnswer;
    }
  })
  showResult.value = true
}

function resetPractice() {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
  // Scroll to the top of the practice section for a better UX
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. nice OF you, angry WITH me</CardTitle>
          <CardDescription>
            This section covers patterns where the choice of preposition depends on whether you are referring to a person or a thing.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><strong>1. Adjective + OF + person</strong></p>
          <p>We use this structure to comment on someone's action. It expresses an opinion about the person.</p>
          <ul class="ml-6 list-disc space-y-2">
            <li>It was very <strong>kind of you</strong> to help us. Thank you very much.</li>
            <li>I think it was very <strong>unfair of him</strong> to criticise me.</li>
            <li>It's <strong>silly of me</strong> to worry so much.</li>
          </ul>
          <p class="mt-4">
            Compare this with <strong>FOR</strong>: We can say 'It was silly <strong>for me to worry</strong>' but the focus is on the action. 'Silly <strong>of me</strong>' focuses on me as a person.
          </p>
          
          <Separator class="my-4" />
          
          <p><strong>2. Angry WITH somebody / Angry ABOUT something</strong></p>
          <p>Many adjectives describing feelings use different prepositions for people and things.</p>
          <ul class="ml-6 list-disc space-y-2">
            <li>They are furious <strong>with me</strong> for not going to the party. <em>(person)</em></li>
            <li>They are furious <strong>about</strong> the decision. <em>(thing/situation)</em></li>
            <li>I'm delighted <strong>with</strong> my new home. <em>(thing)</em></li>
            <li>She was pleased <strong>with</strong> her exam results. <em>(thing)</em></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>B. Surprised AT / BY, etc.</CardTitle>
          <CardDescription>
            Some adjectives of reaction can take multiple prepositions.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>For adjectives like <strong>surprised, shocked, amazed, astonished, upset</strong>, you can generally use either <strong>AT</strong> or <strong>BY</strong>.</p>
          <ul class="ml-6 list-disc space-y-2">
            <li>Everybody was surprised <strong>at</strong> the news. (or ...<strong>by</strong> the news.)</li>
            <li>I was shocked <strong>at</strong> what I saw. (or ...<strong>by</strong> what I saw.)</li>
          </ul>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>C. Common Adjective + Preposition Collocations</CardTitle>
          <CardDescription>
            Memorizing these common pairings is essential for fluency.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <ul class="ml-6 list-disc grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
            <li>aware / conscious <strong>OF</strong></li>
            <li>capable / incapable <strong>OF</strong></li>
            <li>full <strong>OF</strong></li>
            <li>short <strong>OF</strong></li>
            <li>typical <strong>OF</strong></li>
            <li>good / bad / terrible <strong>AT</strong></li>
            <li>responsible <strong>FOR</strong></li>
            <li>crowded <strong>WITH</strong></li>
            <li>fed up <strong>WITH</strong></li>
            <li>sorry <strong>ABOUT</strong> a thing</li>
            <li>sorry <strong>FOR</strong> doing a thing</li>
            <li>impressed <strong>WITH / BY</strong></li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE EXERCISES SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences with the correct preposition.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
              <Label :for="`q${q.id}`">Question {{ index + 1 }}</Label>
              <div class="flex flex-wrap items-center gap-2">
                <p>{{ q.sentence_start }}</p>
                <Input
                  :id="`q${q.id}`"
                  v-model="q.userAnswer"
                  type="text"
                  class="w-24 flex-shrink-0"
                  autocomplete="off"
                  :disabled="showResult"
                />
                <p>{{ q.sentence_end }}</p>
              </div>
            </div>
            <div class="flex justify-end gap-4 pt-4">
              <Button type="submit" :disabled="showResult" size="lg">Check Answers</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS & VALIDATOR SLOT                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Results Analysis</CardTitle>
          <CardDescription class="text-base">
            Your score: <strong class="text-xl" :class="{'text-green-600': scorePercentage > 70, 'text-orange-500': scorePercentage >= 50 && scorePercentage <= 70, 'text-red-600': scorePercentage < 50}">{{ score }} / {{ totalQuestions }} ({{ scorePercentage }}%)</strong>
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>Review your answers below. The explanations will help you understand the rules better.</p>
          <Separator />
          <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="space-y-3">
            <h4 class="font-semibold">Question {{ index + 1 }}:</h4>
            <p class="text-muted-foreground"> 
              {{ q.sentence_start }} <span class="font-bold underline decoration-dotted" :class="q.isCorrect ? 'text-green-700' : 'text-red-700' ">{{ q.userAnswer || '...' }}</span> {{ q.sentence_end }}
            </p>
            <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
              <component :is="q.isCorrect ? CheckCircle : XCircle" class="h-4 w-4" />
              <AlertTitle>{{ q.isCorrect ? 'Correct!' : 'Needs Review' }}</AlertTitle>
              <AlertDescription>
                <p v-if="!q.isCorrect">
                  The correct answer is <strong class="uppercase">{{ Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer }}</strong>.
                </p>
                <p>{{ q.explanation }}</p>
              </AlertDescription>
            </Alert>
          </div>
          <div class="flex justify-end pt-4">
            <Button @click="resetPractice" variant="outline" size="lg">Try Again</Button>
          </div>
        </CardContent>
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
