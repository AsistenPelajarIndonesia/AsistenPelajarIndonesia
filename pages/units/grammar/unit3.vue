<!--
  File: @/pages/units/grammar/0.vue
  Description: An advanced grammar practice module for Unit 2 of 'English Grammar In Use'.
  This page focuses on the complex differences between the Present Continuous and Present Simple,
  particularly with state and dynamic verbs. It features in-depth learning material,
  challenging exercises, and a detailed results validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports ---
// Assuming a Shadcn-like UI component library structure.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  // This ensures the layout is applied to this page
  layout: false, 
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Since this is the first unit (0), 'back' can lead to the main grammar index.
  router.push("/units/grammar/") 
}
function goToNextUnit() {
  router.push("/units/grammar/1")
}

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: 'English Grammar In Use: Advanced Practice',
  testDescription: 'Modules designed to master the nuances of English grammar.',
  unitTitle: 'Unit 2: Present continuous and present simple (2)',
  unitDescription: 'Mastering the crucial distinction between state verbs and action verbs.',
  categories: ['Tenses', 'State Verbs', 'Dynamic Verbs', 'Present Simple', 'Present Continuous', 'Advanced']
}

// --- Question & Quiz State ---
interface Question {
  id: number
  type: 'fill-in' | 'choose-correct'
  text: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    text: "I can't talk now, I ______ (have) dinner with my family.",
    correctAnswer: "am having",
    explanation: "Here, 'have' means to experience an event (dinner), which is an action. For actions happening now, we use the Present Continuous. The stative meaning, 'to possess', would use Present Simple (e.g., 'I have a car')."
  },
  {
    id: 2,
    type: 'fill-in',
    text: "What ______ (you / think) about? You seem distracted.",
    correctAnswer: "are you thinking",
    explanation: "The question is about the process of thinking, which is a mental activity happening now. We use Present Continuous for the action of thinking. For expressing an opinion, we use Present Simple (e.g., 'I think you are right')."
  },
  {
    id: 3,
    type: 'fill-in',
    text: "This fabric ______ (feel) like silk, but it's actually polyester.",
    correctAnswer: "feels",
    explanation: "'Feel' is used here as a linking verb to describe a quality of the fabric, which is a state. Therefore, Present Simple is correct. Present Continuous ('is feeling') would imply the fabric itself is actively performing the action of feeling, which is illogical."
  },
  {
    id: 4,
    type: 'choose-correct',
    text: 'Which sentence is grammatically correct and natural?',
    options: [
      "I am not understanding this concept at all.",
      "I do not understand this concept at all."
    ],
    correctAnswer: "I do not understand this concept at all.",
    explanation: "'Understand' is a classic state verb representing a mental state, not an action. State verbs are not normally used in continuous tenses. The state of not understanding is described with the Present Simple."
  },
  {
    id: 5,
    type: 'fill-in',
    text: "My manager is usually very calm, but today he ______ (be) incredibly unreasonable.",
    correctAnswer: "is being",
    explanation: "We use 'is being' to talk about temporary behavior that is different from a person's usual character. 'He is unreasonable' would imply it's a permanent personality trait. The context 'but today' signals a temporary change, requiring the Present Continuous."
  },
  {
    id: 6,
    type: 'fill-in',
    text: "The chef ______ (taste) the soup to see if it needs more seasoning.",
    correctAnswer: "is tasting",
    explanation: "This describes the action of tasting, a deliberate process happening right now. 'Taste' as an action uses the Present Continuous. The stative form describes the inherent quality of the food ('The soup tastes great')."
  },
  {
    id: 7,
    type: 'choose-correct',
    text: 'Select the most appropriate sentence for the context.',
    options: [
      "I am seeing my dentist this Friday.",
      "I see my dentist this Friday."
    ],
    correctAnswer: "I am seeing my dentist this Friday.",
    explanation: "While both can be used for future, Present Continuous ('am seeing') is very common and natural for fixed future arrangements or appointments. 'See' here means 'to meet', which is an action."
  },
  {
    id: 8,
    type: 'fill-in',
    text: "I ______ (see) exactly what you mean, but I must disagree with your conclusion.",
    correctAnswer: "see",
    explanation: "In this context, 'see' is a synonym for 'understand', which is a mental state. As a state verb, it takes the Present Simple. You cannot be 'in the process' of understanding in this way; you either understand or you don't."
  },
  {
    id: 9,
    type: 'fill-in',
    text: "Why ______ (you / smell) the milk? Do you think it has gone bad?",
    correctAnswer: "are you smelling",
    explanation: "This refers to the deliberate action of smelling something to check its quality. Actions are expressed with the Present Continuous. The stative form would be 'The milk smells bad', describing its inherent quality."
  },
  {
    id: 10,
    type: 'fill-in',
    text: "He ______ (appear) to be a bit stressed these days.",
    correctAnswer: "appears",
    explanation: "'Appear' here means 'seem', which describes a state or impression. It is a state verb and uses the Present Simple. The action form ('is appearing') would be used for a performance, e.g., 'He is appearing on stage tonight'."
  }
])

const userAnswers = ref<string[]>(Array(questions.value.length).fill(''))
const isSubmitted = ref(false)

function submitQuiz() {
  isSubmitted.value = true
  // Optional: Scroll to results
  // document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
}

const score = computed(() => {
  return questions.value.reduce((correctCount, question, index) => {
    const userAnswer = userAnswers.value[index]?.trim().toLowerCase()
    const correctAnswer = question.correctAnswer.toLowerCase()
    return userAnswer === correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const results = computed(() => {
  return questions.value.map((question, index) => {
    const userAnswer = userAnswers.value[index]?.trim()
    const isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
    return {
      ...question,
      userAnswer,
      isCorrect,
    }
  })
})
</script>

<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Learning Material Slot                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-primary" />
            Core Concepts: State vs. Action
          </CardTitle>
          <CardDescription>
            The key to this unit is knowing which verbs describe states (unchanging conditions)
            and which describe actions (dynamic activities).
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">1. State (Stative) Verbs</h4>
            <p class="text-muted-foreground mb-3">
              These verbs describe a state of being, thinking, or feeling rather than an action.
              They are almost never used in continuous tenses.
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Senses/Perception:</strong> see, hear, smell, taste, feel, look, appear, seem
                <br><em>Example: The music <strong class="text-green-600">sounds</strong> wonderful. (Not: <s class="text-red-600">is sounding</s>)</em>
              </li>
              <li>
                <strong>Opinion/Thought:</strong> think, believe, know, understand, doubt, remember, forget
                <br><em>Example: I <strong class="text-green-600">know</strong> the answer. (Not: <s class="text-red-600">am knowing</s>)</em>
              </li>
              <li>
                <strong>Feeling/Emotion:</strong> love, hate, like, dislike, want, need, prefer
                <br><em>Example: She <strong class="text-green-600">wants</strong> a new phone. (Not: <s class="text-red-600">is wanting</s>)</em>
              </li>
               <li>
                <strong>Possession/Being:</strong> have, own, belong, be, exist, contain
                <br><em>Example: This book <strong class="text-green-600">belongs</strong> to me. (Not: <s class="text-red-600">is belonging</s>)</em>
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h4 class="font-semibold text-base mb-2">2. Dual-Meaning Verbs (The Tricky Part)</h4>
            <p class="text-muted-foreground mb-3">
              Some verbs can be BOTH stative and dynamic, depending on the context. This is where mastery is tested.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-lg border p-4">
                <h5 class="font-bold">THINK</h5>
                <p><strong>State (Opinion):</strong> What do you <strong class="text-green-600">think</strong> of my plan?</p>
                <p><strong>Action (Process):</strong> Be quiet, I'<strong class="text-green-600">m thinking</strong>.</p>
              </div>
              <div class="rounded-lg border p-4">
                <h5 class="font-bold">HAVE</h5>
                <p><strong>State (Possession):</strong> We <strong class="text-green-600">have</strong> two children.</p>
                <p><strong>Action (Experience):</strong> We'<strong class="text-green-600">re having</strong> a great time.</p>
              </div>
              <div class="rounded-lg border p-4">
                <h5 class="font-bold">SEE</h5>
                <p><strong>State (Understand/Eyesight):</strong> I <strong class="text-green-600">see</strong> your point.</p>
                <p><strong>Action (Meet/Visit):</strong> I'<strong class="text-green-600">m seeing</strong> the doctor tomorrow.</p>
              </div>
              <div class="rounded-lg border p-4">
                <h5 class="font-bold">TASTE / SMELL</h5>
                <p><strong>State (Quality):</strong> This soup <strong class="text-green-600">tastes</strong> delicious.</p>
                <p><strong>Action (Deliberate act):</strong> The chef <strong class="text-green-600">is tasting</strong> the soup.</p>
              </div>
            </div>
          </div>
          <hr />
           <div>
            <h4 class="font-semibold text-base mb-2">3. Special Case: to be</h4>
            <p class="text-muted-foreground mb-3">
              Normally 'be' is a state verb. However, we use the Present Continuous to describe temporary behavior.
            </p>
             <div class="rounded-lg border p-4 bg-muted/50">
                <p><strong>State (Permanent Trait):</strong> He <strong class="text-green-600">is</strong> a very selfish person.</p>
                <p><strong>Action (Temporary Behaviour):</strong> Why <strong class="text-green-600">is he being</strong> so selfish about the snacks?</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Use the Present Simple or Present Continuous. For fill-in questions, do not use contractions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitQuiz" class="space-y-6">
            <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
              <label :for="`q-${question.id}`" class="text-sm font-medium">
                {{ index + 1 }}. {{ question.text }}
              </label>
              
              <div v-if="question.type === 'fill-in'">
                <Input 
                  :id="`q-${question.id}`" 
                  v-model="userAnswers[index]" 
                  placeholder="Your answer..."
                  :disabled="isSubmitted"
                  class="font-mono"
                />
              </div>

              <div v-if="question.type === 'choose-correct'" class="flex flex-col space-y-2">
                 <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                    <label 
                      class="flex items-center space-x-3 p-3 rounded-md border transition-colors hover:bg-muted"
                      :class="{'bg-muted': userAnswers[index] === option}"
                    >
                      <input 
                        type="radio" 
                        :name="`q-${question.id}`" 
                        :value="option" 
                        v-model="userAnswers[index]"
                        :disabled="isSubmitted"
                        class="h-4 w-4"
                      />
                      <span class="flex-1">{{ option }}</span>
                    </label>
                 </div>
              </div>
            </div>
            
            <Button v-if="!isSubmitted" type="submit" class="w-full">
              Check Answers & Get Feedback
            </Button>
            <Alert v-if="isSubmitted">
              <AlertTitle>Quiz Submitted!</AlertTitle>
              <AlertDescription>
                Scroll down to see your detailed results and explanations.
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- Results Slot                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
              Review your performance and read the explanations carefully to improve.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="p-4 rounded-lg border bg-muted flex flex-col items-center gap-2">
              <p class="text-lg font-medium">You scored</p>
              <p class="text-5xl font-bold tracking-tighter">{{ score }} / {{ questions.length }}</p>
              <Progress :model-value="score / questions.length * 100" class="w-full mt-2" />
            </div>

            <!-- Detailed Feedback -->
            <div v-for="result in results" :key="result.id" class="p-4 rounded-md border"
                 :class="result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'">
              
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <CheckCircle v-if="result.isCorrect" class="h-6 w-6 text-green-600" />
                  <XCircle v-else class="h-6 w-6 text-red-600" />
                </div>

                <div class="flex-1">
                  <p class="font-semibold text-sm">{{ result.text.replace('______', `<strong>${result.correctAnswer}</strong>`) }}</p>

                  <div class="mt-2 text-sm space-y-2">
                    <p>
                      <span class="font-medium">Your answer:</span>
                      <span :class="result.isCorrect ? 'text-green-700' : 'text-red-700 line-through'">
                        {{ result.userAnswer || 'No answer' }}
                      </span>
                    </p>
                    <p v-if="!result.isCorrect">
                      <span class="font-medium">Correct answer:</span>
                      <span class="text-green-700 font-semibold">{{ result.correctAnswer }}</span>
                    </p>

                    <Alert class="mt-3 bg-white">
                      <BrainCircuit class="h-4 w-4" />
                      <AlertTitle class="font-semibold text-sm">Explanation</AlertTitle>
                      <AlertDescription class="text-xs">
                        {{ result.explanation }}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
