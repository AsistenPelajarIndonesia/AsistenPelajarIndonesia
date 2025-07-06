<!--
  File: @/pages/units/grammar/18.vue
  Description: An advanced grammar practice page for Unit 18: "Some and Any".
  This page integrates with GrammarLayout to provide a rich learning experience
  with detailed explanations and a challenging, multi-format quiz.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/17")
}

function goToNextUnit() {
  router.push("/units/grammar/19")
}

const showResult = ref(false)
const isSubmitted = ref(false)

type QuestionType = 'fill-in-the-blank' | 'multiple-choice' | 'contextual-dialogue'

interface Question {
  id: number
  type: QuestionType
  text: string
  context?: string
  options?: string[]
  userAnswer: string | null
  correctAnswer: string
  explanation: string
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'fill-in-the-blank',
    text: "I went to the bookstore, but I couldn't find ______ books on ancient history.",
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "We use 'any' in negative sentences. The sentence 'I couldn't find...' is negative, so 'any' is the correct choice to indicate the absence of books.",
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: 'Could you please lend me ______ sugar? I seem to have run out.',
    options: ['some', 'any', 'a'],
    userAnswer: null,
    correctAnswer: 'some',
    explanation: "In questions that are requests, we use 'some' instead of 'any'. Here, the speaker is asking for something, making it a request.",
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "He finished the race without ______ difficulty at all.",
    options: ['some', 'any', 'no'],
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "Words like 'without', 'never', or 'hardly' create a negative context. In these cases, we use 'any'. 'Without any difficulty' means 'with no difficulty'.",
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    text: "There's hardly ______ food left in the fridge; we should go shopping.",
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "'Hardly' is a semi-negative word that means 'almost no'. In sentences with 'hardly', we use 'any' to complete the negative idea.",
  },
  {
    id: 5,
    type: 'multiple-choice',
    text: "You can choose ______ topic for your presentation; I don't mind which one.",
    options: ['some', 'any', 'the'],
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "In a positive sentence, 'any' can be used to mean 'it doesn't matter which'. It emphasizes free choice from a range of options.",
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    text: "Would you like ______ more coffee? It's freshly brewed.",
    userAnswer: null,
    correctAnswer: 'some',
    explanation: "This question is an offer. We use 'some' in questions when we are offering something to someone.",
  },
  {
    id: 7,
    type: 'fill-in-the-blank',
    text: "I promise I won't tell ______ what you told me.",
    userAnswer: null,
    correctAnswer: 'anyone',
    explanation: "The compound pronoun 'anyone' (or 'anybody') is used in negative sentences like this one. 'I won't tell anyone' means I will tell no people.",
  },
  {
    id: 8,
    type: 'multiple-choice',
    text: "Is there ______ reason why you can't come to the party?",
    options: ['some', 'any', 'a'],
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "This is a standard neutral question where we don't necessarily expect a 'yes' or 'no' answer. In most general questions, 'any' is the correct choice.",
  },
  {
    id: 9,
    type: 'contextual-dialogue',
    context: "A: I'm going to the shops. Do we need ______?\nB: Yes, we don't have ______ milk left. And could you get ______ fresh bread while you're there?",
    text: "Fill in the blanks: (1)______ (2)______ (3)______",
    userAnswer: null,
    correctAnswer: 'anything any some',
    explanation: "1. 'anything' is used in the question 'Do we need anything?'. 2. 'any' is used in the negative statement 'we don't have any milk'. 3. 'some' is used in the request 'could you get some fresh bread'.",
  },
  {
    id: 10,
    type: 'fill-in-the-blank',
    text: "If you have ______ questions, please don't hesitate to ask.",
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "In 'if' clauses, we often use 'any' to refer to a potential or uncertain quantity. 'If you have any questions' means 'if the number of questions you have is greater than zero'.",
  },
])

const totalQuestions = computed(() => questions.length)
const correctAnswersCount = computed(() => {
  return questions.filter(q => q.userAnswer?.trim().toLowerCase() === q.correctAnswer.toLowerCase()).length
})
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (correctAnswersCount.value / totalQuestions.value) * 100
})

const getScoreMessage = computed(() => {
  const score = scorePercentage.value
  if (score === 100) return "Perfect Score! You have an excellent command of 'some' and 'any'."
  if (score >= 80) return "Great job! You have a solid understanding. Review the explanations to perfect your knowledge."
  if (score >= 50) return "Good effort. There are some tricky points you can master by studying the explanations below."
  return "It looks like this was a challenging topic. Please review the material and the detailed explanations carefully."
})

function validateAnswers() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the results section for better UX
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function getValidationClass(question: Question) {
  if (!isSubmitted.value) return ''
  return question.userAnswer?.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    ? 'border-green-500 ring-2 ring-green-500'
    : 'border-red-500 ring-2 ring-red-500'
}

function isCorrect(question: Question): boolean {
  return isSubmitted.value && question.userAnswer?.trim().toLowerCase() === question.correctAnswer.toLowerCase()
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate Level Grammar Exercises"
    unit-title="Unit 18: Some and Any"
    unit-description="Mastering the use of 'some' and 'any' with countable and uncountable nouns in various contexts, including positives, negatives, questions, offers, and requests."
    :categories="['Determiners', 'Quantifiers', 'Nouns']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Usage Rules</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">1. 'Some' for Positive Statements</h4>
            <p class="text-muted-foreground">Use 'some' when talking about a plural or uncountable noun in an affirmative sentence. It implies an indefinite quantity.</p>
            <ul class="mt-2 ml-6 list-disc space-y-1">
              <li>I need to buy <strong class="text-primary">some</strong> new shoes. (Plural countable)</li>
              <li>There is <strong class="text-primary">some</strong> water in the bottle. (Uncountable)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">2. 'Any' for Negative Statements & General Questions</h4>
            <p class="text-muted-foreground">Use 'any' in negative sentences and most questions.</p>
            <ul class="mt-2 ml-6 list-disc space-y-1">
              <li>He doesn't have <strong class="text-primary">any</strong> children. (Negative)</li>
              <li>I went shopping, but I didn't buy <strong class="text-primary">any</strong> clothes. (Negative)</li>
              <li>Do you have <strong class="text-primary">any</strong> brothers or sisters? (Question)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Advanced Rules & Exceptions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">3. 'Some' in Questions (Offers & Requests)</h4>
            <p class="text-muted-foreground">A key exception: when a question is an offer or a request, we use 'some' because we are expecting a positive response.</p>
            <ul class="mt-2 ml-6 list-disc space-y-1">
              <li>Would you like <strong class="text-primary">some</strong> cake? (Offer)</li>
              <li>Can I have <strong class="text-primary">some</strong> information, please? (Request)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">4. 'Any' in Positive Statements (It doesn't matter which)</h4>
            <p class="text-muted-foreground">When used in an affirmative sentence, 'any' means it is not important which one is chosen.</p>
            <ul class="mt-2 ml-6 list-disc space-y-1">
              <li>You can take <strong class="text-primary">any</strong> bus. They all go to the city center.</li>
              <li>"Which newspaper should I buy?" "<strong class="text-primary">Any</strong> one. I don't mind."</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">5. 'Any' with Negative-in-Meaning Words</h4>
            <p class="text-muted-foreground">Use 'any' with words that have a negative meaning, such as 'never', 'hardly', 'without'.</p>
            <ul class="mt-2 ml-6 list-disc space-y-1">
              <li>She <strong class="text-primary">never</strong> eats <strong class="text-primary">any</strong> meat.</li>
              <li>There is <strong class="text-primary">hardly any</strong> sugar left.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Complete the sentences. Your answers will be case-insensitive.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
            <div class="flex flex-col gap-2">
              <Label :for="`q-${question.id}`" class="text-base">
                <span class="font-semibold">Q{{ index + 1 }}:</span>
                <span v-if="question.context" class="block text-muted-foreground italic whitespace-pre-wrap">{{ question.context }}</span>
                <span>{{ question.text }}</span>
              </Label>
              
              <template v-if="question.type === 'fill-in-the-blank' || question.type === 'contextual-dialogue'">
                <Input 
                  :id="`q-${question.id}`" 
                  v-model="question.userAnswer"
                  :placeholder="question.type === 'contextual-dialogue' ? 'answer1 answer2 answer3...' : 'Type some or any...'"
                  :class="getValidationClass(question)"
                  :disabled="isSubmitted"
                />
              </template>

              <template v-if="question.type === 'multiple-choice'">
                <RadioGroup 
                  :id="`q-${question.id}`"
                  v-model="question.userAnswer"
                  :disabled="isSubmitted" 
                  class="flex flex-col gap-2"
                >
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`q-${question.id}-${option}`" :value="option" :class="getValidationClass(question)" />
                    <Label :for="`q-${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </template>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="isSubmitted" class="w-full">
            {{ isSubmitted ? 'Results Below' : 'Check Answers' }}
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>{{ getScoreMessage }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold">{{ correctAnswersCount }} / {{ totalQuestions }} Correct</span>
              <Progress :model-value="scorePercentage" class="w-full" />
              <span class="text-lg font-bold">{{ scorePercentage.toFixed(0) }}%</span>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-xl font-semibold border-b pb-2">Detailed Breakdown</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                <Alert :variant="isCorrect(question) ? 'default' : 'destructive'" class="border-l-4" :class="isCorrect(question) ? 'border-green-500' : 'border-red-500'">
                  <div class="flex items-start gap-4">
                    <component :is="isCorrect(question) ? CheckCircle2 : XCircle" class="h-5 w-5 mt-1 flex-shrink-0" :class="isCorrect(question) ? 'text-green-500' : 'text-red-500'" />
                    <div class="flex-grow">
                      <AlertTitle>Question {{ index + 1 }}</AlertTitle>
                      <AlertDescription class="space-y-2">
                        <p class="text-base text-foreground">{{ question.context }}</p>
                        <p class="text-base text-foreground">{{ question.text.replace(/______/g, `[___]`) }}</p>
                        <p>Your answer: <strong :class="isCorrect(question) ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">{{ question.userAnswer || 'No Answer' }}</strong></p>
                        <p v-if="!isCorrect(question)">Correct answer: <strong class="text-green-700 dark:text-green-400">{{ question.correctAnswer }}</strong></p>
                        <div class="mt-2 p-3 bg-muted/50 rounded-md flex items-start gap-2">
                          <Lightbulb class="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
