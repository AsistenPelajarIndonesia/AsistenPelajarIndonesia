<!--
  File: @/pages/units/grammar/22.vue
  Unit: 22 - May and might 1
  Description: An advanced practice module based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth learning material and a challenging, validated quiz on the
  modal verbs 'may' and 'might' for expressing possibility.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, Lightbulb, GraduationCap } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
})

const router = useRouter()

const questions = ref([
  {
    id: 'q1',
    type: 'fill-in-the-blank',
    prompt: "Don't phone Ann at 8:30. She ______ (have) dinner then.",
    userAnswer: '',
    validator: (answer: string) => /^(may|might)\sbe\shaving$/i.test(answer.trim()),
    correctAnswer: 'may be having / might be having',
    explanation: "For future possibilities, especially those happening at a specific time, we use the continuous form: 'may/might be + -ing'. This indicates an action possibly in progress at that future moment.",
  },
  {
    id: 'q2',
    type: 'rewrite',
    prompt: "Rewrite the sentence using 'may not' or 'might not': 'Perhaps Amy isn't at home.'",
    userAnswer: '',
    validator: (answer: string) => /amy\s(may|might)\snot\sbe\sat\shome/i.test(answer.trim().replace(/[.'"]+/g, '')),
    correctAnswer: 'Amy may not be at home. / Amy might not be at home.',
    explanation: "'Perhaps ... not' is a common equivalent for expressing negative possibility. 'May not' and 'might not' (or 'mightn't') are the standard modal forms to convey this idea. They mean 'it is possible that this is not true'.",
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    prompt: "Which sentence implies the speaker is considering an alternative plan?",
    options: [
      "I'm going to buy a new car.",
      "I will buy a new car soon.",
      "I might buy a new car, but I'm still looking at used ones.",
    ],
    userAnswer: '',
    validator: (answer: string) => answer === "I might buy a new car, but I'm still looking at used ones.",
    correctAnswer: "I might buy a new car, but I'm still looking at used ones.",
    explanation: "'Might' (and 'may') are perfect for expressing uncertainty or that a decision is not yet final. The additional context in this option makes it clear that other possibilities are being weighed, which is a core function of 'might'.",
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank-context',
    prompt: "A: 'What's that noise?' B: 'I'm not sure. It ______ (be) a plane.'",
    userAnswer: '',
    validator: (answer: string) => /^(may|might)\sbe$/i.test(answer.trim()),
    correctAnswer: 'may be / might be',
    explanation: "When you are uncertain about a present situation, you speculate using 'may be' or 'might be'. Both are correct and very common in this context of making a guess.",
  },
  {
    id: 'q5',
    type: 'rewrite-negative',
    prompt: "Rewrite the sentence to express a negative possibility: 'I'm sure that he doesn't know the address.'",
    userAnswer: '',
    validator: (answer: string) => /he\s(may|might)\snot\sknow\sthe\saddress/i.test(answer.trim().replace(/[.'"]+/g, '')),
    correctAnswer: 'He may not know the address. / He might not know the address.',
    explanation: "This question tests the difference between certainty ('I'm sure that...') and possibility. 'He doesn't know' is a statement of fact from the speaker's perspective. 'He may/might not know' correctly transforms it into a statement of possibility.",
  },
  {
    id: 'q6',
    type: 'multiple-choice-nuance',
    prompt: "A: 'Do you think it will rain?' B: 'I don't know. It ______.' Which word fits best to express a neutral, fifty-fifty possibility?",
    options: [
      "can",
      "may",
      "should",
    ],
    userAnswer: '',
    validator: (answer: string) => answer === 'may',
    correctAnswer: 'may',
    explanation: "While 'might' would also be correct, 'may' is often considered the most neutral term for possibility. 'Can' usually refers to general possibility or ability ('It can rain a lot in April'). 'Should' implies expectation or advice, which doesn't fit the context.",
  },
  {
    id: 'q7',
    type: 'fill-in-the-blank-formal',
    prompt: "To ask for permission formally, you would say: '______ I ask a question?'",
    userAnswer: '',
    validator: (answer: string) => /^may$/i.test(answer.trim()),
    correctAnswer: 'May',
    explanation: "Although this unit focuses on possibility, it's crucial to know that 'may' is the primary modal for asking for permission in a formal context. 'Might' is not used for this purpose, and 'can' is considered more informal.",
  },
]);

const showResult = ref(false)
const quizSubmitted = ref(false)

const validationResults = computed(() => {
  if (!quizSubmitted.value) return []
  return questions.value.map(q => ({
    ...q,
    isCorrect: q.validator(q.userAnswer),
  }))
})

const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

function checkAnswers() {
  quizSubmitted.value = true
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function tryAgain() {
  showResult.value = false
  quizSubmitted.value = false
  questions.value.forEach(q => q.userAnswer = '')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPreviousUnit() {
  router.push("/units/grammar/21")
}

function goToNextUnit() {
  router.push("/units/grammar/23")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate Level - Based on Raymond Murphy"
    unit-title="Unit 22: May and might 1"
    unit-description="Mastering the expression of possibility in present and future contexts."
    :categories="['Modal Verbs', 'Possibility', 'Speculation']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <GraduationCap class="h-6 w-6" />
            <span>Core Concepts: May & Might</span>
          </CardTitle>
          <CardDescription>
            'May' and 'might' are modal verbs used to express possibility, not certainty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible class="w-full" default-value="'item-1'">
            <AccordionItem value="item-1">
              <AccordionTrigger class="text-base font-semibold">1. Expressing Possibility (Present & Future)</AccordionTrigger>
              <AccordionContent class="text-base leading-relaxed">
                <p class="mb-4">We use <strong>may</strong> and <strong>might</strong> to say that something is possible or that it is possible something will happen. In this context, they are often interchangeable.</p>
                <ul class="ml-6 list-disc space-y-2">
                  <li>'Where's David?' 'He <strong>may be</strong> in his office.' (= Perhaps he is in his office)</li>
                  <li>'Take an umbrella with you. It <strong>might rain</strong> later.' (= Perhaps it will rain)</li>
                  <li>She's not here yet. She <strong>may have missed</strong> the train. (Possibility about the past)</li>
                </ul>
                <Alert class="mt-4">
                  <Lightbulb class="h-4 w-4" />
                  <AlertTitle>Teacher's Note</AlertTitle>
                  <AlertDescription>
                    Some traditionalists argue that <strong>'might'</strong> suggests a slightly smaller possibility than <strong>'may'</strong>, but in modern English, this distinction is very weak. Think of them as synonyms for possibility.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger class="text-base font-semibold">2. Structure</AccordionTrigger>
              <AccordionContent class="text-base leading-relaxed">
                <p class="mb-4">The structure is simple and does not change for the subject (I, you, he, she, it, we, they).</p>
                <p class="mb-2 rounded-md bg-muted p-3 font-mono text-sm">
                  Subject + <strong>may / might</strong> + <em>base form of verb</em>
                </p>
                <ul class="ml-6 list-disc space-y-2">
                  <li>She <strong>might know</strong> the answer. (<em>NOT</em> <s class="text-red-500">She might knows</s>)</li>
                  <li>They <strong>may arrive</strong> late. (<em>NOT</em> <s class="text-red-500">They may to arrive</s>)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger class="text-base font-semibold">3. Negative Forms: may not & might not</AccordionTrigger>
              <AccordionContent class="text-base leading-relaxed">
                <p class="mb-4">The negative forms are <strong>may not</strong> and <strong>might not</strong> (or the contraction <strong>mightn't</strong>).</p>
                <ul class="ml-6 list-disc space-y-2">
                  <li>'Is John coming to the party?' 'He <strong>might not</strong> come. He isn't feeling well.' (= Perhaps he will not come)</li>
                  <li>Even with a new strategy, the company <strong>may not</strong> be profitable this year. (= It's possible it won't be profitable)</li>
                </ul>
                <Alert variant="destructive" class="mt-4">
                   <XCircle class="h-4 w-4" />
                  <AlertTitle>Common Error</AlertTitle>
                  <AlertDescription>
                    There is no contraction for 'may not'. <strong>'Mayn't' is incorrect</strong> and not used in standard English.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Test your understanding. Complete the exercises below.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <Label :for="q.id" class="text-base">
              <strong>Question {{ index + 1 }}:</strong> {{ q.prompt }}
            </Label>
            
            <div v-if="q.type === 'fill-in-the-blank' || q.type === 'fill-in-the-blank-context' || q.type === 'fill-in-the-blank-formal'">
              <Input :id="q.id" v-model="q.userAnswer" placeholder="Type your answer here..." :disabled="quizSubmitted" />
            </div>

            <div v-if="q.type === 'rewrite' || q.type === 'rewrite-negative'">
               <Input :id="q.id" v-model="q.userAnswer" placeholder="Rewrite the full sentence..." :disabled="quizSubmitted" />
            </div>

            <div v-if="q.type === 'multiple-choice' || q.type === 'multiple-choice-nuance'">
              <RadioGroup :id="q.id" v-model="q.userAnswer" :disabled="quizSubmitted" class="gap-2">
                 <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`">{{ option }}</Label>
                  </div>
              </RadioGroup>
            </div>
          </div>

          <Button v-if="!quizSubmitted" @click="checkAnswers" class="w-full">
            Check My Answers
          </Button>
          <Button v-else @click="tryAgain" class="w-full" variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>You scored {{ score }} out of {{ totalQuestions }}.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <Progress :model-value="scorePercentage" class="w-full" />
            <p class="mt-2 text-center text-sm text-muted-foreground">{{ Math.round(scorePercentage) }}% Correct</p>
          </div>

          <div v-for="(result, index) in validationResults" :key="result.id" class="rounded-lg border p-4" :class="[result.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20']">
            <div class="flex items-start justify-between gap-4">
              <p class="flex-1 font-semibold text-foreground">Question {{ index + 1 }}: {{ result.prompt }}</p>
              <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-6 w-6 flex-shrink-0" :class="[result.isCorrect ? 'text-green-600' : 'text-red-600']" />
            </div>
            
            <div class="mt-3 space-y-3 border-t pt-3" :class="[result.isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800']">
              <p class="text-sm">
                <span class="font-medium text-muted-foreground">Your Answer:</span>
                <span class="ml-2 font-mono" :class="[result.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300']">
                  {{ result.userAnswer || 'No answer provided' }}
                </span>
              </p>
               <p v-if="!result.isCorrect" class="text-sm">
                <span class="font-medium text-muted-foreground">Correct Answer:</span>
                <span class="ml-2 font-mono text-foreground/80">
                  {{ result.correctAnswer }}
                </span>
              </p>
              <div class="mt-2 rounded-md bg-background/50 p-3">
                <h4 class="mb-1 font-semibold text-foreground/90">Explanation</h4>
                <p class="text-sm text-muted-foreground">{{ result.explanation }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
