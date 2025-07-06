<!--
  File: @/pages/units/grammar/23.vue
  Description: An advanced grammar practice page for Unit 23: "All, Every, Whole".
  This page leverages the GrammarLayout to provide a structured learning experience,
  combining in-depth theoretical material with challenging practical exercises and
  a sophisticated feedback mechanism.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/22")
}
function goToNextUnit() {
  router.push("/units/grammar/24")
}

const showResult = ref(false)
const userAnswers = ref<{ [key: number]: string }>({})

const questions = [
  {
    id: 1,
    text: "He visits his grandmother ______ week without fail; his dedication is admirable.",
    options: ["all", "every", "whole"],
    correctAnswer: "every",
    explanation: "We use 'every' with singular countable nouns (like 'week') to talk about frequency or how often something happens. 'Every week' means the action is repeated weekly. 'All week' would imply the entire duration of one week, which doesn't fit the context of a recurring visit. 'Whole week' is grammatically incorrect in this frequency context."
  },
  {
    id: 2,
    text: "The fire alarm went off, and ______ the guests evacuated the hotel in under three minutes.",
    options: ["all", "every", "whole"],
    correctAnswer: "all",
    explanation: "'All' is used with a plural noun phrase ('the guests') to refer to the entire group collectively. 'Every guest evacuated...' is also grammatically correct and has a very similar meaning, but 'all' emphasizes the group as a single unit, which is natural in this context. 'Whole the guests' is incorrect."
  },
  {
    id: 3,
    text: "She dedicated her ______ life to scientific research, eventually winning a Nobel Prize.",
    options: ["all", "every", "whole"],
    correctAnswer: "whole",
    explanation: "'Whole' is used to mean 'the complete' or 'the entire' of a single item. It is very commonly used with possessive adjectives like 'my', 'his', 'her'. 'Her whole life' emphasizes the entirety of her life as one continuous block of time. While 'all her life' is also possible, 'whole' is often preferred for this specific, powerful emphasis."
  },
  {
    id: 4,
    text: "Not ______ information you find on the internet is reliable; you must verify your sources.",
    options: ["all", "every", "whole"],
    correctAnswer: "all",
    explanation: "'All' is used here with an uncountable noun ('information'). The structure 'Not all...' is a common way to express that only some of a group or quantity has a certain quality. 'Not every piece of information...' would be an alternative, but 'every' cannot be used directly with the uncountable noun 'information'. 'Whole information' is incorrect."
  },
  {
    id: 5,
    text: "I've been working on this single report ______ day and I'm still not finished.",
    options: ["all", "every", "whole"],
    correctAnswer: "all",
    explanation: "The expression 'all day' (or 'all morning', 'all week') refers to the entire continuous duration of that period. 'Every day' would mean the action happens repeatedly, once per day, which doesn't fit the context of working on a single report within one day. 'The whole day' is a possible alternative with a very similar meaning."
  },
  {
    id: 6,
    text: "The teacher made sure that ______ single student understood the complex equation before moving on.",
    options: ["all", "every", "whole"],
    correctAnswer: "every",
    explanation: "'Every' is used for emphasis with 'single' to highlight each individual member of a group. The phrase 'every single...' is a strong, common collocation. 'All single student' is grammatically incorrect as 'all' requires a plural noun. 'Whole single student' makes no sense."
  },
  {
    id: 7,
    text: "The ______ of the village attended the founder's day celebration.",
    options: ["all", "everybody", "whole"],
    correctAnswer: "whole",
    explanation: "The structure 'the whole of...' is used specifically with places (cities, countries, villages) or with some organizations. 'The whole of the village' means everyone from the village. 'All of the village' is also possible. 'Everybody' is a pronoun and cannot be followed by 'of the village' in this way."
  },
  {
    id: 8,
    text: "Is that ______ you have to contribute to the discussion? I was expecting a more detailed analysis.",
    options: ["all", "every", "whole"],
    correctAnswer: "all",
    explanation: "In this abstract, idiomatic question, 'all' functions as a pronoun meaning 'the only thing'. 'Is that all?' is a very common expression. 'Every' and 'whole' are not used in this way and would be incorrect."
  },
  {
    id: 9,
    text: "The ______ team, from the star player to the coach, deserved credit for the championship win.",
    options: ["all", "every", "whole"],
    correctAnswer: "whole",
    explanation: "'The whole team' refers to the team as a single, complete unit. This is the most natural choice here. 'All the team' is used in British English, but 'the whole team' is more common in both British and American English. 'Every team' would refer to multiple different teams, which is not the meaning here."
  },
  {
    id: 10,
    text: "He checked his phone virtually ______ five minutes, anxiously waiting for a reply.",
    options: ["all", "every", "whole"],
    correctAnswer: "every",
    explanation: "'Every' is used to indicate frequency with plural time periods, as in 'every ten minutes', 'every two weeks', etc. It signifies a recurring interval. 'All five minutes' would mean the entire duration of a specific five-minute block. 'Whole five minutes' is not used in this context."
  }
]
const totalQuestions = questions.length

const score = computed(() => {
  return questions.reduce((correctCount, question) => {
    if (userAnswers.value[question.id] === question.correctAnswer) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (totalQuestions === 0) return 0
  return (score.value / totalQuestions) * 100
})

function checkAnswers() {
  if (Object.keys(userAnswers.value).length < totalQuestions) {
    alert("Please answer all questions before checking your results.")
    return
  }
  showResult.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetQuiz() {
  userAnswers.value = {}
  showResult.value = false
}

function getAlertVariant(questionId: number, correctAnswer: string) {
    if (userAnswers.value[questionId] === correctAnswer) {
        return 'default'
    }
    return 'destructive'
}

</script>

<template>
  <GrammarLayout
    test-title="Intermediate & Advanced Grammar"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 23: All / Every / Whole"
    unit-description="Mastering determiners that refer to total quantities. This unit explores the subtle but critical differences between 'all', 'every', and 'whole'."
    :categories="['Determiners', 'Quantifiers', 'Nouns']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Core Concepts: All, Every, Whole</CardTitle>
          <CardDescription>Understanding when and why to use each word is key to sounding natural.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div class="space-y-2">
            <h3 class="font-semibold text-base text-card-foreground">1. All (+ plural/uncountable noun)</h3>
            <p><strong class="font-medium">Usage:</strong> Refers to the total number of items in a group (plural) or the total amount of something (uncountable). It treats the group as a collective.</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><span class="font-mono bg-muted px-1 rounded-sm">All children</span> need love. (Plural, general)</li>
              <li>I've used <span class="font-mono bg-muted px-1 rounded-sm">all the milk</span>. (Uncountable, specific)</li>
              <li><span class="font-mono bg-muted px-1 rounded-sm">All (of) the students</span> passed the exam. (Plural, specific group)</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-base text-card-foreground">2. Every (+ singular noun)</h3>
            <p><strong class="font-medium">Usage:</strong> Refers to all members of a group, but considers them individually. It's used for distribution and frequency.</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><span class="font-mono bg-muted px-1 rounded-sm">Every student</span> has a laptop. (= All students individually have one)</li>
              <li>I brush my teeth <span class="font-mono bg-muted px-1 rounded-sm">every day</span>. (Frequency)</li>
              <li><strong class="text-destructive">Incorrect:</strong> <s class="text-muted-foreground">Every students...</s> / <s class="text-muted-foreground">Every information...</s></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-base text-card-foreground">3. Whole (+ singular noun)</h3>
            <p><strong class="font-medium">Usage:</strong> Means 'complete' or 'entire'. It emphasizes the totality of a single item or unit. It usually follows an article (the, a) or a possessive (my, her).</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>He ate <span class="font-mono bg-muted px-1 rounded-sm">the whole pizza</span>. (= the entire, complete pizza)</li>
              <li>She told me <span class="font-mono bg-muted px-1 rounded-sm">her whole life story</span>.</li>
              <li><span class="font-mono bg-muted px-1 rounded-sm">The whole of Spain</span> was on holiday. (Used with places)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Distinctions & Pitfalls</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
            <p><strong class="font-medium">All day vs. Every day:</strong></p>
            <p>'<span class="font-mono bg-muted px-1 rounded-sm">All day</span>' refers to one entire day (duration). '<span class="font-mono bg-muted px-1 rounded-sm">Every day</span>' refers to a repeated action that happens daily (frequency).</p>
            <p class="pl-4 italic">I worked <strong class="text-primary">all day</strong>. (From morning until night today) vs. I work <strong class="text-primary">every day</strong>. (Monday, Tuesday, Wednesday...)</p>
            
            <p><strong class="font-medium">All the people vs. Everybody/Everyone:</strong></p>
            <p>'<span class="font-mono bg-muted px-1 rounded-sm">All the people</span>' and '<span class="font-mono bg-muted px-1 rounded-sm">Everybody</span>' are very similar. 'Everybody' is a single pronoun and often more common in spoken English. 'All the people' specifies a particular group.</p>
            <p class="pl-4 italic"><strong class="text-primary">Everybody</strong> enjoyed the concert. = <strong class="text-primary">All the people</strong> at the concert enjoyed it.</p>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card v-show="!showResult">
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Choose the best option to complete the sentence. Consider the subtle shades of meaning.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <div class="flex flex-col space-y-3">
              <Label :for="`q${q.id}`" class="font-medium">
                {{ index + 1 }}. {{ q.text }}
              </Label>
              <RadioGroup
                :id="`q${q.id}`"
                v-model="userAnswers[q.id]"
                class="flex flex-col space-y-1"
              >
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-3">
                  <RadioGroupItem :id="`q${q.id}-${option}`" :value="option" />
                  <Label :for="`q${q.id}-${option}`" class="font-normal capitalize">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" class="w-full">
            Check Answers & See Explanations
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>You scored <strong class="text-primary">{{ score }} out of {{ totalQuestions }}</strong>. Review the detailed explanations below to master this unit.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <Progress :model-value="scorePercentage" class="w-full" />
          </div>
          <div v-for="(q, index) in questions" :key="`result-${q.id}`">
             <Alert :variant="getAlertVariant(q.id, q.correctAnswer)">
                <component :is="userAnswers[q.id] === q.correctAnswer ? CheckCircle2 : XCircle" class="h-4 w-4" />
                <AlertTitle class="font-bold">Question {{ index + 1 }}</AlertTitle>
                <AlertDescription class="space-y-2 mt-2">
                  <p class="text-base font-normal text-foreground">{{ q.text.replace('______', `<strong><span class="capitalize">${q.correctAnswer}</span></strong>`) }}</p>
                  <div class="text-xs p-2 rounded-md" :class="userAnswers[q.id] === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
                    Your answer: <span class="font-semibold capitalize">{{ userAnswers[q.id] }}</span>
                    <span v-if="userAnswers[q.id] !== q.correctAnswer"> | Correct answer: <span class="font-semibold capitalize">{{ q.correctAnswer }}</span></span>
                  </div>
                  <p class="pt-2 border-t border-border/50"><strong class="font-medium">Explanation:</strong> {{ q.explanation }}</p>
                </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button @click="resetQuiz" variant="secondary">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
