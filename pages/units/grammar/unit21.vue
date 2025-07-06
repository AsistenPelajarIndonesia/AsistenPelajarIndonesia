<template>
  <GrammarLayout
    :test-title="testMeta.title"
    :test-description="testMeta.description"
    :unit-title="unitMeta.title"
    :unit-description="unitMeta.description"
    :categories="unitMeta.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Distinctions and Usage</CardTitle>
          <CardDescription>Mastering the subtle differences between future forms.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">1. Spontaneous Decisions vs. Prior Intentions</h4>
            <p class="text-muted-foreground">The choice between <code class="font-mono bg-muted px-1 py-0.5 rounded">'ll (will)</code> and <code class="font-mono bg-muted px-1 py-0.5 rounded">'be going to'</code> often depends on *when* the decision was made.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Use <strong>will</strong> for decisions made at the moment of speaking.
                <br><em>Example: "The phone is ringing." → "Okay, <strong>I'll get</strong> it."</em>
              </li>
              <li>Use <strong>be going to</strong> for intentions or plans that existed before the moment of speaking.
                <br><em>Example: "I've saved enough money. <strong>I'm going to buy</strong> a new laptop next week."</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">2. Predictions: Opinion vs. Evidence</h4>
            <p class="text-muted-foreground">How you predict the future changes the grammar.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Use <strong>will</strong> for predictions based on personal opinion, belief, or experience. Often used with verbs like <em>think, believe, expect, hope.</em>
                <br><em>Example: "I think the Conservative party <strong>will win</strong> the next election."</em>
              </li>
              <li>Use <strong>be going to</strong> for predictions based on present, visible, or audible evidence.
                <br><em>Example: "Look at those dark, heavy clouds! It<strong>'s going to rain</strong> any minute."</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">3. Offers, Promises, and Suggestions with 'shall'</h4>
            <p class="text-muted-foreground">'Shall' is more formal and primarily used with 'I' and 'we'.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Use <strong>Shall I...?</strong> or <strong>Shall we...?</strong> for offers and suggestions.
                <br><em>Example: "That suitcase looks heavy. <strong>Shall I carry</strong> it for you?"</em>
              </li>
               <li>Use <strong>will</strong> for making firm promises or threats.
                <br><em>Example: "I promise <strong>I won't tell</strong> anyone your secret."</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">4. Advanced Future Forms</h4>
            <p class="text-muted-foreground">Describing actions in progress or completed in the future.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Future Continuous (will be + -ing):</strong> An action in progress at a specific time in the future.
                <br><em>Example: "Don't call at 8 PM. <strong>I'll be watching</strong> the final match."</em>
              </li>
               <li><strong>Future Perfect (will have + past participle):</strong> An action that will be completed before a certain point in the future.
                <br><em>Example: "By the time you read this email, <strong>I will have already left</strong> the country."</em>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 15 Practice Exercises</CardTitle>
          <CardDescription>Choose the most appropriate future form for each context. Read carefully!</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-3">
             <p class="font-medium leading-none">
              Question {{ index + 1 }}: {{ question.text }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="flex items-center gap-4 mt-4">
            <Button @click="handleSubmit" :disabled="isSubmitted" class="w-full sm:w-auto">Check Answers</Button>
            <Button v-if="isSubmitted" @click="resetQuiz" variant="outline" class="w-full sm:w-auto">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: Validation and Explanations                             -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Results & Analysis</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <p class="text-lg font-bold">Your Score: {{ score }} / {{ totalQuestions }} ({{ scorePercentage.toFixed(0) }}%)</p>
            <Badge :variant="scorePercentage > 80 ? 'default' : 'destructive'">{{ feedbackMessage }}</Badge>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="`result-${question.id}`">
            <Alert :variant="question.userAnswer === question.correctAnswer ? 'default' : 'destructive'">
              <AlertTitle class="flex items-center gap-2">
                <component :is="question.userAnswer === question.correctAnswer ? CheckCircle2 : XCircle" class="h-5 w-5" />
                <span>Question {{ index + 1 }}: {{ question.userAnswer === question.correctAnswer ? 'Correct' : 'Incorrect' }}</span>
              </AlertTitle>
              <AlertDescription class="mt-2 pl-7 flex flex-col gap-3">
                <p class="font-semibold">{{ question.text }}</p>
                <p>Your answer: <strong class="font-mono p-1 rounded bg-background/50">{{ findLabel(question.options, question.userAnswer) || "Not answered" }}</strong></p>
                <p>Correct answer: <strong class="font-mono p-1 rounded bg-background/50">{{ findLabel(question.options, question.correctAnswer) }}</strong></p>
                <div class="mt-2 p-3 border-t border-border/50">
                  <h5 class="font-bold">Explanation:</h5>
                  <p class="text-sm">{{ question.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
       </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
}

const router = useRouter()

const testMeta = {
  title: 'English Grammar In Use Practice',
  description: 'Advanced exercises based on the structure by Raymond Murphy.',
}

const unitMeta = {
  title: 'Unit 15: Will and Shall (2)',
  description: 'This unit focuses on the nuanced differences between "will" and "be going to", the specific uses of "shall", and advanced future tenses like the future continuous and future perfect.',
  categories: ['Future Tenses', 'Modals', 'Intermediate', 'Advanced'],
}

const questions = ref<Question[]>([
  {
    id: 1,
    text: 'A: "The fire alarm is ringing! It\'s not a drill!" B: "Oh my goodness! I... call the fire department right now!"',
    options: [
      { value: 'am_going_to', label: 'am going to' },
      { value: 'will', label: 'will' },
      { value: 'shall', label: 'shall' },
    ],
    correctAnswer: 'will',
    userAnswer: null,
    explanation: 'The correct answer is "will" because speaker B is making a spontaneous decision at the moment of speaking, prompted by the sudden emergency. "Am going to" would imply a pre-existing plan, which is not the case here.',
  },
  {
    id: 2,
    text: 'A: "Have you seen the company\'s latest financial report? Profits are down 50% and two major clients just left." B: "Yes, it\'s dire. It looks like the company... lay off some staff."',
    options: [
      { value: 'will', label: 'will' },
      { value: 'is_going_to', label: 'is going to' },
      { value: 'will_be', label: 'will be' },
    ],
    correctAnswer: 'is_going_to',
    userAnswer: null,
    explanation: 'The correct answer is "is going to" because the prediction is based on clear, present evidence (the poor financial report and loss of clients). "Will" is typically used for predictions based on opinion or belief, not strong evidence.',
  },
  {
    id: 3,
    text: 'It\'s getting very warm in this meeting room. ... I open a window for some fresh air?',
    options: [
      { value: 'Will', label: 'Will' },
      { value: 'Am_I_going_to', label: 'Am I going to' },
      { value: 'Shall', label: 'Shall' },
    ],
    correctAnswer: 'Shall',
    userAnswer: null,
    explanation: 'The correct answer is "Shall". In questions with "I" or "we", "Shall" is the standard and most polite form for making an offer or a suggestion. "Will I...?" sounds like you are asking for a prediction about your own actions, which is awkward.',
  },
  {
    id: 4,
    text: 'Don\'t bother calling me around midnight. By then, I ... for several hours.',
    options: [
      { value: 'will_be_sleeping', label: 'will be sleeping' },
      { value: 'am_going_to_sleep', label: 'am going to sleep' },
      { value: 'will_sleep', label: 'will sleep' },
    ],
    correctAnswer: 'will_be_sleeping',
    userAnswer: null,
    explanation: 'The correct answer is "will be sleeping" (Future Continuous). This form is used to describe an action that will be in progress over a period of time in the future. The context "around midnight" indicates an ongoing action, not a single event.',
  },
  {
    id: 5,
    text: 'By the time my son graduates from university, I ... my mortgage completely.',
    options: [
      { value: 'will_pay_off', label: 'will pay off' },
      { value: 'will_be_paying_off', label: 'will be paying off' },
      { value: 'will_have_paid_off', label: 'will have paid off' },
    ],
    correctAnswer: 'will_have_paid_off',
    userAnswer: null,
    explanation: 'The correct answer is "will have paid off" (Future Perfect). The phrase "By the time..." sets a deadline in the future. The Future Perfect is used to describe an action that will be completed before this future point in time.',
  },
  {
    id: 6,
    text: 'A: "My partner and I have been discussing it for weeks, and we\'ve finally decided." B: "Decided what?" A: "We... move to Australia next year."',
    options: [
      { value: 'will', label: 'will' },
      { value: 'are_going_to', label: 'are going to' },
      { value: 'shall', label: 'shall' },
    ],
    correctAnswer: 'are_going_to',
    userAnswer: null,
    explanation: 'The correct answer is "are going to". Speaker A is announcing a decision that was made before the conversation ("we\'ve been discussing it for weeks"). This is a classic example of expressing a prior intention or plan.',
  },
  {
    id: 7,
    text: 'I\'m not sure about my weekend plans yet. Perhaps I... visit the new art gallery downtown.',
    options: [
      { value: 'will', label: 'will' },
      { value: 'am_going_to', label: 'am going to' },
      { value: 'will_have_visited', label: 'will have visited' },
    ],
    correctAnswer: 'will',
    userAnswer: null,
    explanation: 'The correct answer is "will". The speaker is expressing uncertainty ("I\'m not sure yet", "Perhaps"). In this context, "will" is used to express a possibility or a decision that is not yet firm, bordering on a spontaneous thought.',
  },
])

const isSubmitted = ref(false)
const showResult = ref(false)

const score = computed(() => {
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect Score! Masterful understanding."
  if (percentage >= 80) return "Excellent! You have a strong grasp of these concepts."
  if (percentage >= 60) return "Good effort. Review the explanations to refine your knowledge."
  if (percentage >= 40) return "More practice needed. Focus on the core differences."
  return "Let's review the material and try again. You can do it!"
})

const findLabel = (options: QuestionOption[], value: string | null) => {
  if (!value) return ''
  return options.find(o => o.value === value)?.label || ''
}

const handleSubmit = () => {
  isSubmitted.value = true
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const resetQuiz = () => {
  questions.value.forEach(q => q.userAnswer = null)
  isSubmitted.value = false
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPreviousUnit() {
  router.push("/units/grammar/14")
}

function goToNextUnit() {
  router.push("/units/grammar/16")
}
</script>

<style>
/* Add a subtle fade transition for the result slot */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
