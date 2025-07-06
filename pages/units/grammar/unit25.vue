<!--
  File: @/pages/units/grammar/19.vue
  Unit: 19 - Can, could and (be) able to
  Description: An advanced practice module based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth explanations and challenging exercises to master the usage of
  'can', 'could', and '(be) able to' in various tenses and contexts.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/18")
}

function goToNextUnit() {
  router.push("/units/grammar/20")
}

interface Question {
  id: number
  type: 'multiple-choice' | 'fill-in-the-blank'
  text: string
  context?: string
  options?: { value: string; label: string }[]
  correctAnswer: string
  userAnswer: string | null
  explanation: string
  isCorrect: boolean | null
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    context: "A difficult past situation with a single, successful outcome.",
    text: "The fire spread through the building very quickly, but because the fire alarm worked correctly, everyone ___ escape.",
    options: [
      { value: 'could', label: 'could' },
      { value: 'was able to', label: 'was able to' },
      { value: 'can', label: 'can' },
    ],
    correctAnswer: 'was able to',
    userAnswer: null,
    isCorrect: null,
    explanation: "'Was/were able to' is used for a specific achievement or success in a particular past situation. 'Could' typically refers to a general ability in the past (e.g., 'He could swim when he was five'), not a single successful action. Here, escaping was a one-time successful event."
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    context: "Future perfect tense, indicating ability before a future point in time.",
    text: "I'm taking an intensive course. By the end of the year, I hope I will have ___ communicate fluently in Japanese.",
    correctAnswer: 'been able to',
    userAnswer: null,
    isCorrect: null,
    explanation: "'Can' and 'could' do not have future perfect forms. To express ability in tenses like the present perfect or future perfect, we must use the structure 'have/has/will have + been able to'. The sentence requires the future perfect form to describe an ability acquired by a future deadline."
  },
  {
    id: 3,
    type: 'multiple-choice',
    context: "Describing a general, repeated ability in the past.",
    text: "My grandfather was a brilliant chess player when he was younger. He ___ beat almost anyone he played against.",
    options: [
      { value: 'was able to', label: 'was able to' },
      { value: 'has been able to', label: 'has been able to' },
      { value: 'could', label: 'could' },
    ],
    correctAnswer: 'could',
    userAnswer: null,
    isCorrect: null,
    explanation: "For a general ability that someone possessed over a period in the past (e.g., 'he could play chess well'), 'could' is the correct choice. 'Was able to' would imply he succeeded in beating someone on one specific occasion, which doesn't fit the context of his general skill."
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    context: "A past unreal conditional (Third Conditional).",
    text: "If I had known your flight was delayed, I ___ have picked you up from the airport. I had no idea.",
    correctAnswer: 'could',
    userAnswer: null,
    isCorrect: null,
    explanation: "In the third conditional (if + past perfect, ... would/could/might have + past participle), 'could have' is used to talk about a past possibility or opportunity that did not happen. 'Would have' implies certainty, while 'could have' suggests the ability or opportunity existed."
  },
  {
    id: 5,
    type: 'multiple-choice',
    context: "Strong prohibition in a formal context.",
    text: "As per company policy, employees ___ access the server room without explicit permission from the IT department.",
    options: [
      { value: `couldn't`, label: `couldn't` },
      { value: `are not able to`, label: `are not able to` },
      { value: `cannot`, label: `cannot` },
    ],
    correctAnswer: 'cannot',
    userAnswer: null,
    isCorrect: null,
    explanation: "'Cannot' (or can't) is often used to express a strong rule, prohibition, or impossibility. While 'are not able to' is grammatically possible, 'cannot' is more idiomatic and forceful for stating a strict rule or policy."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    context: "Expressing ability using an infinitive structure after another verb.",
    text: "She has always wanted ___ speak in public without feeling nervous.",
    correctAnswer: 'to be able to',
    userAnswer: null,
    isCorrect: null,
    explanation: "After verbs like 'want', 'hope', 'need', or 'would like', we use the infinitive form ('to' + verb). 'Can' is a modal verb and does not have an infinitive form. Therefore, we must use the equivalent 'to be able to'."
  },
  {
    id: 7,
    type: 'multiple-choice',
    context: "A negative past situation where an action was impossible.",
    text: "He spoke so quickly and with such a strong accent that I ___ understand most of what he said.",
    options: [
      { value: `wasn't able to`, label: `wasn't able to` },
      { value: `couldn't`, label: `couldn't` },
      { value: `Both are correct`, label: `Both are correct and interchangeable here` },
    ],
    correctAnswer: 'Both are correct',
    userAnswer: null,
    isCorrect: null,
    explanation: "In the negative, 'couldn't' and 'wasn't/weren't able to' are often interchangeable to say that someone did not have the ability to do something, whether in a general sense or on a specific occasion. Both options fit perfectly here."
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    context: "Passive voice construction indicating possibility.",
    text: "It is believed that with further research, a cure for the disease ___ be found within the next decade.",
    correctAnswer: 'can',
    userAnswer: null,
    isCorrect: null,
    explanation: "'Can' is used here to express general possibility in the present or future. The structure is 'modal + be + past participle' (can be found). 'Could' is also possible, suggesting a slightly lower probability, but 'can' fits the optimistic tone of the sentence well."
  },
  {
    id: 9,
    type: 'multiple-choice',
    context: "Hypothetical past ability that was not used.",
    text: "He ___ have finished the project on time, but he decided to go on holiday instead. He had the skill and the time.",
    options: [
      { value: 'was able to', label: 'was able to' },
      { value: 'could', label: 'could' },
      { value: 'could have', label: 'could have' },
    ],
    correctAnswer: 'could have',
    userAnswer: null,
    isCorrect: null,
    explanation: "'Could have + past participle' is used to express that someone had the ability or opportunity to do something in the past, but did not do it. 'Was able to' implies he *did* finish it. 'Could' refers to general past ability, not a specific, unused opportunity."
  },
  {
    id: 10,
    type: 'fill-in-the-blank',
    context: "A past challenge that was overcome through effort.",
    text: "The marathon was grueling, especially the last five miles. With sheer determination, I ___ cross the finish line.",
    correctAnswer: 'was able to',
    userAnswer: null,
    isCorrect: null,
    explanation: "This is another classic example of 'was able to' being used for a single, difficult achievement in the past. It emphasizes the success in overcoming a specific challenge. 'Could' would not be appropriate as it refers to general past ability, not the successful completion of this one difficult task."
  },
])

const isSubmitted = ref(false)
const showResult = ref(false)

const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => q.userAnswer && q.userAnswer.trim() !== '')
})

function validateAnswers() {
  if (!allQuestionsAnswered.value) return

  questions.value.forEach(q => {
    const isMatch = q.userAnswer?.trim().toLowerCase() === q.correctAnswer.toLowerCase()
    
    // Special handling for question 7 where two answers are technically correct
    if (q.id === 7 && (q.userAnswer?.trim().toLowerCase() === 'couldn\'t' || q.userAnswer?.trim().toLowerCase() === 'wasn\'t able to')) {
        q.isCorrect = true
    } else {
        q.isCorrect = isMatch
    }
  })
  isSubmitted.value = true
  showResult.value = true
}

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

function resetTest() {
  questions.value.forEach(q => {
    q.userAnswer = null
    q.isCorrect = null
  })
  isSubmitted.value = false
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate-Advanced Grammar"
    test-description="Practice based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 19: Can, could and (be) able to"
    unit-description="Mastering the nuances of expressing ability, possibility, and permission in various tenses and situations."
    :categories="['Modal Verbs', 'Ability', 'Tenses']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts</CardTitle>
          <CardDescription>Understanding the fundamental differences is key to mastery.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">1. Can</h4>
            <ul class="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
              <li><strong>General Ability (Present):</strong> What you know how to do. <br><em>e.g., "I <strong>can</strong> play the guitar."</em></li>
              <li><strong>Possibility/Opportunity (Present):</strong> What is possible to do. <br><em>e.g., "You <strong>can</strong> see the sea from this window."</em></li>
              <li><strong>Informal Permission:</strong> <br><em>e.g., "You <strong>can</strong> borrow my car."</em></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-base">2. Could</h4>
            <ul class="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
              <li><strong>General Ability (Past):</strong> What you knew how to do over a period. <br><em>e.g., "When I was young, I <strong>could</strong> run for miles."</em></li>
              <li><strong>Polite Requests:</strong> <br><em>e.g., "<strong>Could</strong> you please pass the salt?"</em></li>
              <li><strong>Suggestions/Possibilities (Present/Future):</strong> <br><em>e.g., "We <strong>could</strong> go to the cinema tonight."</em></li>
              <li><strong>Conditional Sentences:</strong> <br><em>e.g., "If we had more time, we <strong>could</strong> visit the museum."</em></li>
            </ul>
          </div>
          <Separator />
           <div>
            <h4 class="font-semibold text-base">3. (be) able to</h4>
            <ul class="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
              <li><strong>The Most Important Rule:</strong> Use <strong>was/were able to</strong> (NOT 'could') for a <strong>single, specific successful action in the past</strong>, especially if it was difficult. <br><em>e.g., "The firefighters <strong>were able to</strong> save everyone from the burning house."</em></li>
              <li><strong>Flexibility with Tenses:</strong> Use 'be able to' for tenses where 'can/could' is impossible.
                <ul class="mt-1 list-disc space-y-1 pl-6">
                  <li><strong>Future:</strong> "She <strong>will be able to</strong> join us later."</li>
                  <li><strong>Present Perfect:</strong> "He hasn't <strong>been able to</strong> fix the leak."</li>
                  <li><strong>Infinitive:</strong> "I want <strong>to be able to</strong> speak French."</li>
                  <li><strong>Gerund:</strong> "I love <strong>being able to</strong> work from home."</li>
                </ul>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the most appropriate option or fill in the blank. Pay close attention to the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="mb-1 text-xs font-semibold uppercase text-muted-foreground">{{ question.context }}</p>
            <p class="mb-4 font-medium">
              {{ index + 1 }}. {{ question.text.split('___')[0] }}
              <template v-if="question.type === 'fill-in-the-blank'">
                <Input
                  :model-value="question.userAnswer"
                  @update:model-value="question.userAnswer = $event"
                  :disabled="isSubmitted"
                  class="inline-block w-48 h-8 mx-1 -translate-y-1"
                  placeholder="Type your answer"
                />
              </template>
              ___
              {{ question.text.split('___')[1] }}
            </p>
            
            <RadioGroup
              v-if="question.type === 'multiple-choice'"
              :model-value="question.userAnswer"
              @update:model-value="question.userAnswer = $event"
              :disabled="isSubmitted" 
              class="space-y-2"
            >
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="font-normal">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col items-stretch">
           <Button @click="validateAnswers" :disabled="!allQuestionsAnswered || isSubmitted" class="w-full">
            {{ isSubmitted ? 'Answers Submitted' : 'Check Answers' }}
          </Button>
          <p v-if="!allQuestionsAnswered && !isSubmitted" class="text-center text-sm text-muted-foreground mt-2">
            Please answer all questions to check your results.
          </p>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle class="text-2xl">Your Results</CardTitle>
              <CardDescription>Review your answers and the explanations to improve your understanding.</CardDescription>
            </div>
            <div class="text-center sm:text-right">
                <p class="text-4xl font-bold">{{ score }} / {{ questions.length }}</p>
                <p class="text-sm text-muted-foreground">Correct Answers</p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <Progress :model-value="scorePercentage" class="w-full" />
          </div>

          <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="space-y-3">
             <Separator v-if="index > 0" />
            <p class="font-medium">{{ index + 1 }}. {{ question.text.replace('___', '...') }}</p>
            <div class="flex items-start gap-3">
              <template v-if="question.isCorrect">
                <CheckCircle2 class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div class="flex-grow">
                  <p class="text-green-700 dark:text-green-400">Your answer: <span class="font-semibold">{{ question.userAnswer }}</span></p>
                </div>
              </template>
              <template v-else>
                <XCircle class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div class="flex-grow">
                  <p class="text-red-700 dark:text-red-400">Your answer: <span class="font-semibold line-through">{{ question.userAnswer || "No answer" }}</span></p>
                  <p class="text-green-700 dark:text-green-400">Correct answer: <span class="font-semibold">{{ question.correctAnswer }}</span></p>
                </div>
              </template>
            </div>
            <Alert class="bg-muted/50 border-l-4" :class="question.isCorrect ? 'border-blue-500' : 'border-amber-500'">
              <HelpCircle class="h-4 w-4" />
              <AlertTitle class="font-semibold">Explanation</AlertTitle>
              <AlertDescription class="text-sm leading-relaxed">
                {{ question.explanation }}
              </AlertDescription>
            </Alert>
          </div>
           <Separator />
           <div class="text-center pt-4">
              <Button @click="resetTest" variant="outline">
                Try Again
              </Button>
           </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
