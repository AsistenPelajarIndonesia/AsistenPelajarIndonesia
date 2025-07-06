<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components from shadcn-vue, as inferred from the layout
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  // This ensures the custom layout is used for this page
  layout: false, 
});

// --- NAVIGATION ---
const router = useRouter()
const currentUnit = 1
const previousUnit = null // No previous unit
const nextUnit = 2

function goToPreviousUnit() {
  // In a real app, you might navigate to a dashboard or show a message.
  // For this example, we simply do nothing as it's the first unit.
  console.log("No previous unit available.")
}

function goToNextUnit() {
  if (nextUnit) {
    router.push(`/units/grammar/${nextUnit}`)
  }
}

// --- UNIT DATA AND STATE MANAGEMENT ---

interface Question {
  id: number
  text: string
  options: { value: string; label: string }[]
  correctAnswer: string
  explanation: string
}

// The core data for the practice questions. These are designed to be tricky.
const questions = ref<Question[]>([
  {
    id: 1,
    text: "After hours of debugging, the developer finally stopped ____ for a coffee. He knew he'd have to resume the difficult task later.",
    options: [
      { value: 'coding', label: 'coding' },
      { value: 'to code', label: 'to code' },
    ],
    correctAnswer: 'to code',
    explanation: "We use 'stop + to-infinitive' to mean stopping one activity in order to do another. Here, the developer stopped his work *for the purpose of* getting a coffee. 'Stopped coding' would mean he quit coding permanently or for a long period.",
  },
  {
    id: 2,
    text: "I vividly remember ____ my grandmother's house as a child; the smell of baking bread was always in the air. Do you remember ____ the door when we left this morning?",
    options: [
      { value: 'visiting / locking', label: 'visiting / locking' },
      { value: 'to visit / to lock', label: 'to visit / to lock' },
      { value: 'visiting / to lock', label: 'visiting / to lock' },
      { value: 'to visit / locking', label: 'to visit / locking' },
    ],
    correctAnswer: 'visiting / to lock',
    explanation: "The first part requires 'remember + -ing' because it refers to a memory of a past event. The second part needs 'remember + to-infinitive' as it's a question about performing a necessary task or duty (did you perform the action of locking the door?).",
  },
  {
    id: 3,
    text: "The politician went on ____ about tax cuts for ten minutes, and then went on ____ the new infrastructure project.",
    options: [
      { value: 'talking / to introduce', label: 'talking / to introduce' },
      { value: 'to talk / introducing', label: 'to talk / introducing' },
      { value: 'talking / introducing', label: 'talking / introducing' },
      { value: 'to talk / to introduce', label: 'to talk / to introduce' },
    ],
    correctAnswer: 'talking / to introduce',
    explanation: "'Go on + -ing' means to continue doing the same activity. 'Go on + to-infinitive' means to finish one activity and start a new, different one. He continued talking, and then started the new topic of the infrastructure project.",
  },
  {
    id: 4,
    text: "I regret ____ you that your application has been unsuccessful. On a personal note, I also regret ____ so harshly to you during the interview.",
    options: [
      { value: 'informing / to speak', label: 'informing / to speak' },
      { value: 'to inform / speaking', label: 'to inform / speaking' },
      { value: 'to inform / to speak', label: 'to inform / to speak' },
      { value: 'informing / speaking', label: 'informing / speaking' },
    ],
    correctAnswer: 'to inform / speaking',
    explanation: "'Regret + to-infinitive' is used for formal announcements of bad news (e.g., 'we regret to inform you'). 'Regret + -ing' is used to express a feeling of sadness or remorse about something that happened in the past. The speaker is formally delivering news, then expressing personal remorse for a past action.",
  },
  {
    id: 5,
    text: "She tried ____ the heavy box, but it wouldn't budge. Then, she tried ____ a different lifting technique she saw on TV, but that didn't work either.",
    options: [
      { value: 'to lift / using', label: 'to lift / using' },
      { value: 'lifting / to use', label: 'lifting / to use' },
      { value: 'to lift / to use', label: 'to lift / to use' },
      { value: 'lifting / using', label: 'lifting / using' },
    ],
    correctAnswer: 'to lift / using',
    explanation: "'Try + to-infinitive' means to attempt something, often something difficult that you might fail at. 'Try + -ing' means to do something as an experiment to see if it solves a problem. She attempted to lift it, and then experimented with a new technique.",
  },
]);

// --- REACTIVE STATE FOR THE QUIZ ---
const userAnswers = ref<Record<number, string>>({})
const isSubmitted = ref(false)

// --- COMPUTED PROPERTIES FOR RESULTS ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

const results = computed(() => {
  return questions.value.map(question => ({
    ...question,
    userAnswer: userAnswers.value[question.id],
    isCorrect: userAnswers.value[question.id] === question.correctAnswer,
  }))
})

// --- METHODS ---
function handleSubmit() {
  // Check if all questions have been answered
  if (Object.keys(userAnswers.value).length !== questions.value.length) {
    alert('Please answer all questions before submitting.');
    return;
  }
  isSubmitted.value = true;
  // Scroll to the results section for better UX
  const resultElement = document.getElementById('results-section');
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetQuiz() {
  userAnswers.value = {}
  isSubmitted.value = false
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar Practice"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 1: Verb + -ing or to… (remember, regret, etc.)"
    unit-description="Mastering verbs that change meaning depending on whether they are followed by a gerund (-ing) or an infinitive (to...)."
    :categories="['Verbs', 'Gerunds', 'Infinitives', 'Advanced Grammar']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="bg-blue-50/30 dark:bg-blue-900/10">
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-blue-500" />
          <div>
            <CardTitle>Core Concepts: The Meaning Shift</CardTitle>
            <p class="text-sm text-muted-foreground">Understand the fundamental change in meaning.</p>
          </div>
        </CardHeader>
        <CardContent class="space-y-6 text-base">
          <div>
            <h3 class="font-semibold text-lg mb-2">1. Remember / Forget / Regret</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong class="text-blue-600 dark:text-blue-400">Verb + -ing:</strong> Refers to a <span class="font-bold">memory of a past action</span>. The action happened before the remembering/forgetting.
                <br><em class="text-muted-foreground pl-4 block">"I remember <span class="font-semibold">watching</span> the moon landing." (I have a memory of this event).</em>
              </li>
              <li><strong class="text-green-600 dark:text-green-400">Verb + to...:</strong> Refers to a <span class="font-bold">task or duty</span> you need to perform. The action happens after the remembering.
                <br><em class="text-muted-foreground pl-4 block">"Please remember <span class="font-semibold">to watch</span> the kids." (This is a task for you to do).</em>
              </li>
              <li><strong class="text-red-600 dark:text-red-400">Regret to inform/tell:</strong> A formal, polite way to give bad news.
                <br><em class="text-muted-foreground pl-4 block">"We regret <span class="font-semibold">to inform</span> you of the delay."</em>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">2. Try</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong class="text-blue-600 dark:text-blue-400">Try + -ing:</strong> To do something as an <span class="font-bold">experiment</span> to see if it solves a problem.
                <br><em class="text-muted-foreground pl-4 block">"The computer is frozen. Try <span class="font-semibold">restarting</span> it."</em>
              </li>
              <li><strong class="text-green-600 dark:text-green-400">Try + to...:</strong> To <span class="font-bold">make an effort</span> or attempt to do something difficult.
                <br><em class="text-muted-foreground pl-4 block">"I tried <span class="font-semibold">to lift</span> the sofa, but it was too heavy."</em>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">3. Stop / Go on</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong class="text-blue-600 dark:text-blue-400">Stop + -ing:</strong> To <span class="font-bold">quit an activity</span> permanently or at that moment.
                <br><em class="text-muted-foreground pl-4 block">"He stopped <span class="font-semibold">smoking</span> last year."</em>
              </li>
              <li><strong class="text-green-600 dark:text-green-400">Stop + to...:</strong> To <span class="font-bold">interrupt an activity</span> in order to do something else.
                <br><em class="text-muted-foreground pl-4 block">"She was reading, but stopped <span class="font-semibold">to answer</span> the phone."</em>
              </li>
              <li><strong class="text-blue-600 dark:text-blue-400">Go on + -ing:</strong> To <span class="font-bold">continue</span> the same action.
                <br><em class="text-muted-foreground pl-4 block">"He went on <span class="font-semibold">talking</span> for hours."</em>
              </li>
              <li><strong class="text-green-600 dark:text-green-400">Go on + to...:</strong> To finish one thing and <span class="font-bold">start something new</span>.
                <br><em class="text-muted-foreground pl-4 block">"After her degree, she went on <span class="font-semibold">to become</span> a famous lawyer."</em>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <BrainCircuit class="h-8 w-8 text-purple-500" />
          <div>
            <CardTitle>Practice Questions</CardTitle>
            <p class="text-sm text-muted-foreground">Apply what you've learned. Read the context carefully.</p>
          </div>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="font-normal cursor-pointer">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="pt-4">
            <Button v-if="!isSubmitted" @click="handleSubmit" size="lg" class="w-full">Check Answers</Button>
            <Button v-else @click="resetQuiz" size="lg" variant="outline" class="w-full">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-t-4 border-primary">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p class="text-muted-foreground">Your Score</p>
                <p class="text-4xl font-bold">{{ score }} / {{ questions.length }}</p>
              </div>
              <div class="w-1/2">
                <Progress :model-value="scorePercentage" />
                <p class="text-right text-sm text-muted-foreground mt-1">{{ scorePercentage.toFixed(0) }}%</p>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold mt-6 mb-2">Detailed Breakdown</h3>
              <div v-for="result in results" :key="result.id">
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="bg-card">
                  <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                  <AlertTitle class="font-bold">
                    Question {{ result.id }}: {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}
                  </AlertTitle>
                  <AlertDescription class="space-y-4 mt-2">
                    <p class="italic text-base">"{{ result.text }}"</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p>Your answer: <span :class="[result.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400', 'font-semibold']">{{ result.userAnswer || 'Not answered' }}</span></p>
                      <p>Correct answer: <span class="font-semibold text-green-600 dark:text-green-400">{{ result.correctAnswer }}</span></p>
                    </div>
                    <div class="mt-3 p-3 bg-muted/50 rounded-md border border-dashed">
                      <p class="font-semibold text-foreground">💡 Explanation:</p>
                      <p class="text-muted-foreground">{{ result.explanation }}</p>
                    </div>
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
