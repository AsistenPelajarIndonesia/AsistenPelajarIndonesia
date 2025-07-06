<!--
  File: @/pages/units/grammar/10.vue
  Description: An advanced grammar practice module for "Like, As, and As if / As though".
  This page leverages the GrammarLayout to provide a comprehensive learning experience
  with detailed explanations, challenging questions, and insightful feedback.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Component State & Data ---

const showResult = ref(false)
const score = ref(0)
const userAnswers = reactive<Record<number, string | null>>({})

interface Question {
  id: number
  type: 'multiple-choice'
  questionText: string
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    questionText: "She's been working ___ a senior financial consultant for the past decade.",
    prompt: 'Choose the word that correctly describes her role or function.',
    options: ['like', 'as', 'as if', 'such as'],
    correctAnswer: 'as',
    explanation: "Correct. We use 'as' + noun to talk about a person's job, function, or the role something has. Her function is *as* a consultant.",
  },
  {
    id: 2,
    type: 'multiple-choice',
    questionText: 'He sprinted towards the finish line ___ a professional athlete.',
    prompt: 'Choose the word that makes a direct comparison to a noun.',
    options: ['as', 'as though', 'like', 'as he was'],
    correctAnswer: 'like',
    explanation: "Correct. We use 'like' + noun/pronoun to mean 'similar to'. Here, his sprinting is being compared to the sprinting of 'a professional athlete' (a noun phrase).",
  },
  {
    id: 3,
    type: 'multiple-choice',
    questionText: 'You should complete the report exactly ___ I showed you yesterday.',
    prompt: "Choose the conjunction that means 'in the same way that'.",
    options: ['like', 'as if', 'as', 'similar to'],
    correctAnswer: 'as',
    explanation: "Correct. 'As' is used as a conjunction to connect two clauses and means 'in the way that'. The two clauses are 'You should complete the report' and 'I showed you yesterday'. While 'like' is common in informal speech, 'as' is the formally correct choice.",
  },
  {
    id: 4,
    type: 'multiple-choice',
    questionText: "He struts around the office ___ he were the CEO, but he's just an intern.",
    prompt: 'Choose the phrase for a hypothetical, unreal situation.',
    options: ['like', 'as', 'as if', 'as though he is'],
    correctAnswer: 'as if',
    explanation: "Correct. We use 'as if' (or 'as though') followed by a past subjunctive verb ('were') to talk about an imaginary or unreal situation. He is not the CEO, so his behavior is contrary to reality.",
  },
  {
    id: 5,
    type: 'multiple-choice',
    questionText: "My goodness, you look pale! You look ___ you've seen a ghost.",
    prompt: 'Choose the phrase that describes an appearance which could be true.',
    options: ['like', 'as', 'as though', 'similar to'],
    correctAnswer: 'as though',
    explanation: "Correct. 'As though' (or 'as if') is used to describe an appearance. Since it's followed by a present perfect tense ('you have seen'), it implies a real possibility that explains the person's pale appearance. 'Like' would be too informal here.",
  },
  {
    id: 6,
    type: 'multiple-choice',
    questionText: "She talks to her dog ___ it could understand every word she says.",
    prompt: 'Choose the phrase for a situation that is clearly impossible.',
    options: ['as if', 'like', 'as', 'when'],
    correctAnswer: 'as if',
    explanation: "Correct. 'As if' (or 'as though') is perfect here. A dog cannot understand complex human language, so this is an unreal/imaginary situation. We are describing her manner of speaking.",
  },
  {
    id: 7,
    type: 'multiple-choice',
    questionText: '___ I mentioned in my previous email, the deadline has been extended.',
    prompt: 'Select the formal conjunction to introduce this clause.',
    options: ['As', 'Like', 'As if', 'How'],
    correctAnswer: 'As',
    explanation: "Correct. In formal writing and speech, 'As' is the standard conjunction to begin a clause like this, meaning 'in the way that' or referencing a prior statement. 'Like' is widely considered informal in this context.",
  },
  {
    id: 8,
    type: 'multiple-choice',
    questionText: 'From the detailed notes and highlighting, it looks ___ the student studied this chapter very carefully.',
    prompt: 'Choose the most appropriate phrase to describe a likely conclusion.',
    options: ['as', 'like', 'as if', 'how'],
    correctAnswer: 'as if',
    explanation: "Correct. 'As if' (or 'as though') is used to draw a conclusion based on evidence. The evidence (notes and highlighting) makes it seem true that 'the student studied'. This is a very common structure. For example: 'It smells as if something is burning'.",
  },
]

// --- Computed Properties for Validation & Results ---

const isAllAnswered = computed(() => {
  return questions.every(q => userAnswers[q.id] !== null && userAnswers[q.id] !== undefined)
})

const validationResults = computed(() => {
  return questions.map(question => {
    const userAnswer = userAnswers[question.id]
    const isCorrect = userAnswer === question.correctAnswer
    return {
      ...question,
      userAnswer,
      isCorrect,
    }
  })
})

// --- Methods & Event Handlers ---

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/9")
}

function goToNextUnit() {
  router.push("/units/grammar/11")
}

function initializeAnswers() {
  questions.forEach(q => {
    userAnswers[q.id] = null
  })
}

function submitAnswers() {
  if (!isAllAnswered.value) return
  
  let correctCount = 0
  validationResults.value.forEach(result => {
    if (result.isCorrect) {
      correctCount++
    }
  })
  score.value = Math.round((correctCount / questions.length) * 100)
  showResult.value = true
  
  // Scroll to results
  setTimeout(() => {
    const resultElement = document.getElementById('results-card');
    resultElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function resetTest() {
  showResult.value = false
  score.value = 0
  initializeAnswers()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Lifecycle Hooks ---

initializeAnswers()
</script>

<template>
  <GrammarLayout
    test-title="Intermediate & Advanced Grammar"
    test-description="English Grammar In Use Series"
    unit-title="Unit 10: Like, As, and As if / As though"
    unit-description="Mastering the subtle art of comparison and appearance. This unit demystifies the uses of 'like' and 'as', and explores the hypothetical world of 'as if' and 'as though'."
    :categories="['Comparison', 'Conjunctions', 'Prepositions', 'Subjunctive Mood']"
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
          <CardTitle>Part A: The Core Distinction - Like vs. As</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p class="font-semibold">1. Use <span class="text-primary font-bold">'like'</span> as a preposition to mean 'similar to'. It is followed by a noun or pronoun.</p>
          <ul class="list-disc space-y-1 pl-6">
            <li>What's that noise? It sounds <span class="font-mono text-blue-600">like</span> a baby crying.</li>
            <li>He looks just <span class="font-mono text-blue-600">like</span> his father.</li>
            <li>This city is nothing <span class="font-mono text-blue-600">like</span> I expected.</li>
          </ul>
          
          <p class="font-semibold">2. Use <span class="text-primary font-bold">'as'</span> as a preposition to talk about a job, role, or function.</p>
          <ul class="list-disc space-y-1 pl-6">
            <li>She works <span class="font-mono text-purple-600">as</span> a software engineer. (Her job)</li>
            <li>He used his coat <span class="font-mono text-purple-600">as</span> a blanket. (Its function)</li>
            <li>Please don't treat me <span class="font-mono text-purple-600">as</span> an idiot. (My perceived role)</li>
          </ul>

          <p class="font-semibold">3. Use <span class="text-primary font-bold">'as'</span> as a conjunction to mean 'in the same way that...'. It is followed by a clause (subject + verb).</p>
           <ul class="list-disc space-y-1 pl-6">
            <li>You should do <span class="font-mono text-purple-600">as</span> your parents advise.</li>
            <li><span class="font-mono text-purple-600">As</span> you know, the meeting is on Tuesday.</li>
          </ul>
          
          <div class="mt-4 flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3">
            <AlertTriangle class="h-5 w-5 flex-shrink-0 text-amber-500" />
            <div>
              <h4 class="font-semibold">Formal vs. Informal</h4>
              <p class="text-xs text-muted-foreground">In informal speech, 'like' is often used as a conjunction (e.g., "Do it like I do."). In formal writing and exams, it is safer to use 'as' when followed by a subject and verb.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Part B: The Hypothetical - As if / As though</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><span class="text-primary font-bold">'As if'</span> and <span class="text-primary font-bold">'as though'</span> are interchangeable. We use them to say how something or someone looks, sounds, or feels. The grammar that follows depends on whether the situation is real or unreal.</p>

          <p class="font-semibold">1. For situations that could be true (real possibilities):</p>
          <ul class="list-disc space-y-1 pl-6">
            <li>The ground is wet. It looks <span class="font-mono text-teal-600">as if it has been raining.</span> (It probably has been raining).</li>
            <li>She sounded <span class="font-mono text-teal-600">as though she was catching a cold.</span> (It's possible she was).</li>
          </ul>
          
          <p class="font-semibold">2. For situations that are unreal, impossible, or imaginary (contrary to fact):</p>
          <p>This is a key advanced point. We use a <span class="font-bold">past tense</span> (specifically the <span class="font-bold">subjunctive 'were'</span> for all persons) to indicate the situation is not real.</p>
           <ul class="list-disc space-y-1 pl-6">
            <li>He acts <span class="font-mono text-rose-600">as if he were the king.</span> (He is not the king).</li>
            <li>She spends money <span class="font-mono text-rose-600">as though she had a fortune.</span> (She does not have a fortune).</li>
            <li>You talk about the 19th century <span class="font-mono text-rose-600">as if you had lived there.</span> (You did not live there).</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              <span class="mr-2 text-primary">Q{{ index + 1 }}.</span>{{ question.questionText }}
            </p>
            <p class="pl-7 text-sm text-muted-foreground italic">"{{ question.prompt }}"</p>
            <RadioGroup v-model="userAnswers[question.id]" class="pl-7">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button @click="submitAnswers" :disabled="!isAllAnswered" class="w-full">
            {{ isAllAnswered ? 'Check My Answers' : 'Please Answer All Questions' }}
          </Button>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS & FEEDBACK                                                      -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-card">
        <CardHeader>
          <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Your Results</CardTitle>
              <p class="mt-1 text-sm text-muted-foreground">Detailed feedback to refine your understanding.</p>
            </div>
            <div :class="[
                'flex items-center gap-2 rounded-lg px-4 py-2 text-lg font-bold sm:text-xl',
                score >= 80 ? 'bg-green-100 text-green-800' : score >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              ]">
              Score: {{ score }}%
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(result, index) in validationResults" :key="result.id" class="rounded-lg border p-4">
            <p class="font-medium">
              <span class="mr-2">Q{{ index + 1 }}.</span>{{ result.questionText }}
            </p>
            <div class="mt-3 flex items-center gap-3">
              <template v-if="result.isCorrect">
                <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-green-600" />
                <p>Your answer: <span class="font-semibold text-green-700">{{ result.userAnswer }}</span></p>
              </template>
              <template v-else>
                <XCircle class="h-5 w-5 flex-shrink-0 text-red-600" />
                <div>
                  <p>Your answer: <span class="font-semibold text-red-700 line-through">{{ result.userAnswer }}</span></p>
                  <p>Correct answer: <span class="font-semibold text-green-700">{{ result.correctAnswer }}</span></p>
                </div>
              </template>
            </div>
            <div class="mt-3 rounded-md bg-muted p-3 text-sm">
              <p><span class="font-semibold">Explanation:</span> {{ result.explanation }}</p>
            </div>
          </div>
          
          <Button @click="resetTest" variant="outline" class="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
