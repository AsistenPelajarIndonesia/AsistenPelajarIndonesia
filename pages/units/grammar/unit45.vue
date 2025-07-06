<!--
  File: @/pages/units/grammar/2.vue
  Unit: 2 - The Causative: Have Something Done
  Description: An advanced, interactive grammar practice page for mastering the
  causative structure, inspired by Raymond Murphy's "English Grammar in Use".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are directly using the layout component as the root
})

const router = useRouter()
const showResult = ref(false)
const userAnswers = ref<{ [key: number]: string | null }>({})
const isSubmitting = ref(false)
const allQuestionsAnswered = computed(() => {
  return questions.value.length === Object.values(userAnswers.value).filter(v => v !== null).length
})

const questions = ref([
  {
    id: 1,
    question: "The roof of our house was damaged in a storm last week. We couldn't fix it ourselves, so we arranged for a builder to do the job. In other words, yesterday, we _______.",
    options: [
      { id: '1a', value: 'had the roof repair', label: 'had the roof repair' },
      { id: '1b', value: 'had repaired the roof', label: 'had repaired the roof' },
      { id: '1c', value: 'had the roof repaired', label: 'had the roof repaired' },
      { id: '1d', value: 'repaired the roof had', label: 'repaired the roof had' },
    ],
    correctAnswer: 'had the roof repaired',
    explanation: "The correct structure is **Subject + have (in the correct tense) + object + past participle**. The action happened 'yesterday', so we need the past simple tense of 'have', which is 'had'. The object is 'the roof', and the past participle of 'repair' is 'repaired'. Option '1a' incorrectly uses the base form 'repair'. Option '1b' is the past perfect active voice, implying 'we' did the repairing, which contradicts the context."
  },
  {
    id: 2,
    question: "Sarah's laptop has been running very slowly for weeks. She's not a tech expert, so she took it to a specialist this morning. Now she can finally work properly. It seems she _______.",
    options: [
      { id: '2a', value: 'is having her laptop fixed', label: 'is having her laptop fixed' },
      { id: '2b', value: 'has just had her laptop fixed', label: 'has just had her laptop fixed' },
      { id: '2c', value: 'has been having her laptop fixed', label: 'has been having her laptop fixed' },
      { id: '2d', value: 'had her laptop fix', label: 'had her laptop fix' },
    ],
    correctAnswer: 'has just had her laptop fixed',
    explanation: "The context implies a recent past action with a present result (her laptop works now). This points to the **present perfect tense**. The correct structure is 'has had her laptop fixed'. The phrase 'has just had' emphasizes the recency. Option '2a' (present continuous) would be for an ongoing action. Option '2c' (present perfect continuous) would imply the process of getting it fixed has been happening for a period, which is less fitting than the completed action. Option '2d' uses the incorrect base form 'fix'."
  },
  {
    id: 3,
    question: "I've been wearing glasses for years, but my eyesight is getting worse. I've booked an appointment with an optician for next Tuesday. So, next week, I _______.",
    options: [
      { id: '3a', value: 'will be have my eyes tested', label: 'will be have my eyes tested' },
      { id: '3b', value: 'am going to have my eyes test', label: 'am going to have my eyes test' },
      { id: '3c', value: 'have had my eyes tested', label: 'have had my eyes tested' },
      { id: '3d', value: 'am going to have my eyes tested', label: 'am going to have my eyes tested' },
    ],
    correctAnswer: 'am going to have my eyes tested',
    explanation: "The sentence refers to a future plan or intention ('I've booked an appointment'). The best structure for this is **'be going to'**. Therefore, 'I am going to have my eyes tested' is the correct choice. The structure is 'be going to + have + object + past participle'. Option '3a' is grammatically incorrect. Option '3b' uses the base form 'test' instead of the past participle 'tested'. Option '3c' is present perfect, which is for past actions."
  },
  {
    id: 4,
    question: "While David was on holiday in a crowded market, he wasn't paying attention to his belongings for a moment. He reached for his back pocket and realized his wallet was gone. He didn't give it away; a thief took it. What happened to David?",
    options: [
      { id: '4a', value: 'He had his wallet stolen.', label: 'He had his wallet stolen.' },
      { id: '4b', value: 'He had stolen his wallet.', label: 'He had stolen his wallet.' },
      { id: '4c', value: 'He got to steal his wallet.', label: 'He got to steal his wallet.' },
      { id: '4d', value: 'He has his wallet stolen.', label: 'He has his wallet stolen.' },
    ],
    correctAnswer: 'He had his wallet stolen.',
    explanation: "The causative 'have something done' can also describe something, often negative, that happens to you. The event occurred in the past ('while he was on holiday'), so we need the **past simple 'had'**. The structure describes the event from David's perspective as the recipient of the action. Option '4b' (past perfect active) illogically implies David stole his own wallet. Option '4c' is incorrect. Option '4d' is present simple, which doesn't fit the past narrative."
  },
  {
    id: 5,
    question: "The original paint on my classic car is fading. I want a professional to repaint it in its original cherry red color. I need to rephrase the sentence: 'A professional will repaint my car.' to focus on my role as the owner.",
    options: [
      { id: '5a', value: "I'm going to have my car repainting.", label: "I'm going to have my car repainting." },
      { id: '5b', value: "I will have my car repainted.", label: "I will have my car repainted." },
      { id: '5c', value: "I will have repainted my car.", label: "I will have repainted my car." },
      { id: '5d', value: "I will be had my car repainted.", label: "I will be had my car repainted." },
    ],
    correctAnswer: 'I will have my car repainted.',
    explanation: "The original sentence uses 'will', indicating a future intention. To transform this into the causative structure, we use **'will + have + object + past participle'**. The correct sentence is 'I will have my car repainted'. Option '5a' incorrectly uses the present participle 'repainting'. Option '5c' is the future perfect active tense, implying you will do the repainting yourself. Option '5d' is grammatically incorrect."
  },
])

const score = computed(() => {
  return questions.value.reduce((count, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const resultsData = computed(() => {
  return questions.value.map(q => ({
    ...q,
    userAnswer: userAnswers.value[q.id],
    isCorrect: userAnswers.value[q.id] === q.correctAnswer,
  }))
})

function checkAnswers() {
  if (!allQuestionsAnswered.value) return
  isSubmitting.value = true
  showResult.value = true
  
  // For better UX, scroll to the top of the results section after submission.
  // This requires the element to be in the DOM first.
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

function resetQuiz() {
  userAnswers.value = {}
  showResult.value = false
  isSubmitting.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPreviousUnit() {
  router.push('/units/grammar/1')
}

function goToNextUnit() {
  router.push('/units/grammar/3')
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 2: The Causative - Have Something Done"
    unit-description="Mastering the structure used when you arrange for someone else to do something for you."
    :categories="['Causative Verbs', 'Passive Voice', 'Services', 'Sentence Structure']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-slate-50 dark:bg-slate-800/50">
          <CardTitle class="flex items-center gap-2">
            <Lightbulb class="h-6 w-6 text-yellow-500" />
            <span>Core Concept: What is 'Have Something Done'?</span>
          </CardTitle>
          <CardDescription>This structure is used to talk about actions that you don't do yourself, but instead arrange for another person (usually a professional) to do for you.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-base">
          <p class="mb-4">Compare these two situations:</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p class="font-bold text-red-800 dark:text-red-300">I repaired my car.</p>
              <p class="text-sm text-red-600 dark:text-red-400">(This means I did the work myself. I am the mechanic.)</p>
            </div>
            <div class="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <p class="font-bold text-green-800 dark:text-green-300">I had my car repaired.</p>
              <p class="text-sm text-green-600 dark:text-green-400">(This means I paid a mechanic to do the work for me.)</p>
            </div>
          </div>
          <div class="mt-6">
            <h4 class="mb-2 font-semibold">The Formula:</h4>
            <div class="rounded-lg bg-muted p-4 font-mono text-sm">
              [Subject] + [have / get] + [Object] + [Past Participle]
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tense Variations & Advanced Usage</CardTitle>
          <CardDescription>The verb 'have' changes to fit the tense of the sentence. 'Get' can be used as a more informal alternative to 'have'.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <p><strong>Present Simple:</strong> I <span class="text-primary font-semibold">have my hair cut</span> every month.</p>
            <p><strong>Past Simple:</strong> We <span class="text-primary font-semibold">had our house painted</span> last year.</p>
            <p><strong>Present Continuous:</strong> She is in the garage; she<span class="text-primary font-semibold">'s having her tyres changed</span>.</p>
            <p><strong>Present Perfect:</strong> I can't find my keys! I think I<span class="text-primary font-semibold">'ve had them stolen</span>.</p>
            <p><strong>Future (will):</strong> We <span class="text-primary font-semibold">will have the documents translated</span> by tomorrow.</p>
            <p><strong>Future (going to):</strong> He<span class="text-primary font-semibold">'s going to get his suit cleaned</span> for the wedding.</p>
          </div>
          <Alert variant="destructive">
            <AlertTriangle class="h-4 w-4" />
            <AlertTitle>Common Pitfall</AlertTitle>
            <AlertDescription>
              A very common mistake is using the base form of the verb instead of the past participle. Always use the third form of the verb (e.g., done, seen, broken, repaired).
              <br>
              <span class="font-semibold text-red-600 dark:text-red-400">Incorrect:</span> I had my car <span class="line-through">repair</span>.
              <br>
              <span class="font-semibold text-green-600 dark:text-green-400">Correct:</span> I had my car <span class="underline">repaired</span>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>
    
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Read each scenario carefully and choose the most grammatically correct and contextually appropriate answer.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <fieldset :disabled="isSubmitting">
              <legend class="mb-2 font-medium">
                Question {{ index + 1 }} of {{ questions.length }}
              </legend>
              <p class="mb-4 rounded-md border bg-slate-50 p-4 dark:bg-slate-800/50">{{ q.question }}</p>
              <RadioGroup v-model="userAnswers[q.id]" class="gap-3">
                <div v-for="option in q.options" :key="option.id">
                  <RadioGroupItem :id="option.id" :value="option.value" />
                  <Label :for="option.id" class="ml-3 cursor-pointer text-base font-normal">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col items-stretch gap-4">
          <Alert v-if="!allQuestionsAnswered && !showResult" variant="default" class="border-amber-500/50 bg-amber-50/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
             <AlertTriangle class="h-4 w-4 !text-amber-500" />
            <AlertTitle>Incomplete</AlertTitle>
            <AlertDescription>Please answer all questions to see your results.</AlertDescription>
          </Alert>
          <Button v-if="!showResult" size="lg" :disabled="!allQuestionsAnswered" @click="checkAnswers">
            Check My Answers
          </Button>
          <Button v-if="showResult" size="lg" variant="secondary" @click="resetQuiz">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card class="border-primary/50">
          <CardHeader class="bg-muted/50">
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Here is a detailed breakdown of your performance. Review the explanations to solidify your understanding.</CardDescription>
          </CardHeader>
          <CardContent class="p-6">
            <div class="mb-6 flex flex-col items-center gap-4 rounded-lg border p-6 sm:flex-row">
              <div class="relative h-24 w-24">
                <svg class="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="15.9155" class="stroke-current text-slate-200 dark:text-slate-700" stroke-width="3" fill="transparent"></circle>
                  <circle cx="18" cy="18" r="15.9155" class="stroke-current text-primary" stroke-width="3" fill="transparent" :stroke-dasharray="`${scorePercentage}, 100`" stroke-linecap="round" transform="rotate(-90 18 18)"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold">{{ score }}/{{ questions.length }}</span>
                </div>
              </div>
              <div class="flex-1 text-center sm:text-left">
                <h3 class="text-xl font-semibold">
                  <template v-if="scorePercentage === 100">Excellent Work!</template>
                  <template v-else-if="scorePercentage >= 75">Great Job!</template>
                  <template v-else-if="scorePercentage >= 50">Good Effort!</template>
                  <template v-else>Keep Practicing!</template>
                </h3>
                <p class="text-muted-foreground">You correctly answered {{ score }} out of {{ questions.length }} questions. Review the detailed explanations below.</p>
                <Progress :model-value="scorePercentage" class="mt-2 h-2" />
              </div>
            </div>
            
            <div class="mt-8 space-y-6">
              <div v-for="result in resultsData" :key="result.id" class="rounded-lg border p-4" :class="result.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'">
                <p class="mb-3 font-semibold">{{ result.question }}</p>
                <div class="mb-3 flex items-start gap-3">
                  <component :is="result.isCorrect ? CheckCircle : XCircle" class="mt-1 h-5 w-5 flex-shrink-0" :class="result.isCorrect ? 'text-green-600' : 'text-red-600'" />
                  <div>
                    <p class="text-sm text-muted-foreground">Your answer:</p>
                    <p class="font-medium" :class="!result.isCorrect && 'line-through'">{{ result.userAnswer || 'No answer' }}</p>
                  </div>
                </div>

                <div v-if="!result.isCorrect" class="mb-4 flex items-start gap-3">
                   <CheckCircle class="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                   <div>
                    <p class="text-sm text-muted-foreground">Correct answer:</p>
                    <p class="font-medium text-green-700 dark:text-green-400">{{ result.correctAnswer }}</p>
                  </div>
                </div>

                <Alert class="bg-background/80">
                  <Lightbulb class="h-4 w-4" />
                  <AlertTitle class="font-bold">Explanation</AlertTitle>
                  <AlertDescription class="prose prose-sm max-w-none dark:prose-invert" v-html="result.explanation"></AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
