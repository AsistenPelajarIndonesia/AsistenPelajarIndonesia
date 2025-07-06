<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpenCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const router = useRouter()

// --- State Management ---
const userAnswers = ref<{ [key: string]: string | null }>({
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
})
const showResult = ref(false)

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/3")
}
function goToNextUnit() {
  router.push("/units/grammar/5")
}

// --- Question & Answer Data ---
const questions = ref([
  {
    id: 'q1',
    questionText: "Your friend Sarah is a musician. You see her with a violin, which is unusual. You ask:",
    options: [
      { id: 'q1o1', value: "How long have you been playing the violin?", label: "How long have you been playing the violin?" },
      { id: 'q1o2', value: "How long have you played the violin?", label: "How long have you played the violin?" },
      { id: 'q1o3', value: "How long are you playing the violin?", label: "How long are you playing the violin?" },
    ],
    correctAnswer: "How long have you been playing the violin?",
    explanation: "The Present Perfect Continuous ('have been playing') is ideal here. It emphasizes the ongoing, potentially recent, activity of playing. While 'have played' is not strictly incorrect, it is less common for this type of question about an active skill. The focus is on the continuous action rather than a completed achievement. 'Are you playing' is Present Continuous for actions happening *right now* or in the near future, not for duration from the past until now."
  },
  {
    id: 'q2',
    questionText: "Mark and Lisa got married in 2010. It is now 2024. Which sentence is the most natural and grammatically correct?",
    options: [
      { id: 'q2o1', value: "They have been being married for 14 years.", label: "They have been being married for 14 years." },
      { id: 'q2o2', value: "They are married for 14 years.", label: "They are married for 14 years." },
      { id: 'q2o3', value: "They have been married for 14 years.", label: "They have been married for 14 years." },
    ],
    correctAnswer: "They have been married for 14 years.",
    explanation: "This question tests your knowledge of 'stative' verbs. 'To be' (in the state of being married) is a stative verb, not an action verb. We do not use continuous tenses with stative verbs. Therefore, the Present Perfect Simple ('have been married') is the only correct choice to express a state that began in the past and continues to the present. 'Have been being' is grammatically incorrect and unnatural."
  },
  {
    id: 'q3',
    questionText: "A programmer is talking about her current project. She wants to emphasize the continuous effort and the fact that the work is not yet finished. What does she say?",
    options: [
      { id: 'q3o1', value: "I have been writing this code all week.", label: "I have been writing this code all week." },
      { id: 'q3o2', value: "I have written this code all week.", label: "I have written this code all week." },
      { id: 'q3o3', value: "I wrote this code all week.", label: "I wrote this code all week." },
    ],
    correctAnswer: "I have been writing this code all week.",
    explanation: "The key here is the desire to 'emphasize the continuous effort' on an 'unfinished' task. The Present Perfect Continuous ('have been writing') perfectly captures this nuance. It focuses on the activity and its duration. 'I have written...' suggests the task might be complete, focusing on the result. 'I wrote...' is Past Simple, implying the week is finished, which contradicts the context of an ongoing project."
  },
  {
    id: 'q4',
    questionText: "You notice your brother hasn't touched his new gaming console. You ask him about it. Which question is correct?",
    options: [
      { id: 'q4o1', value: "How long haven't you been playing it?", label: "How long haven't you been playing it?" },
      { id: 'q4o2', value: "How long haven't you played it?", label: "How long haven't you played it?" },
      { id: 'q4o3', value: "How long it's been since you played it?", label: "How long it's been since you played it?" },
    ],
    correctAnswer: "How long haven't you played it?",
    explanation: "Negative questions about duration are tricky. We typically use the Present Perfect Simple in the negative form ('haven't played') to ask about a period of non-activity. 'Haven't you been playing' is awkward and rarely used. A more natural alternative is 'How long has it been since you played it?', but the option provided has incorrect word order ('it's been' instead of 'has it been'). Therefore, 'How long haven't you played it?' is the best choice among the given options for a direct negative question."
  },
  {
    id: 'q5',
    questionText: "Situation: You meet a friend who is a successful author. You want to ask about the total number of books she has produced in her career. You ask:",
    options: [
      { id: 'q5o1', value: "How many books have you been writing?", label: "How many books have you been writing?" },
      { id: 'q5o2', value: "How many books have you written?", label: "How many books have you written?" },
      { id: 'q5o3', value: "How long have you written books?", label: "How long have you written books?" },
    ],
    correctAnswer: "How many books have you written?",
    explanation: "This question hinges on the distinction between duration ('how long') and quantity ('how many'). When we ask about the result or the completed number of items, we must use the Present Perfect Simple ('have you written'). 'Have you been writing' focuses on the recent, ongoing activity of writing, not the total produced. 'How long have you written' is grammatically awkward; we would say 'How long have you been writing books?' to ask about the duration of the career, not the quantity produced."
  },
  {
    id: 'q6',
    questionText: "Your boss asks for a project update. You have been working on a financial report nonstop since Monday and you are exhausted, but you also want to report that you have finished three out of five sections. Which statement best communicates BOTH the continuous effort and a partial result?",
    options: [
      { id: 'q6o1', value: "I have finished three sections, but I am still working.", label: "I have finished three sections, but I am still working." },
      { id: 'q6o2', value: "I have been working on this report all week, and so far I have finished three sections.", label: "I have been working on this report all week, and so far I have finished three sections." },
      { id: 'q6o3', value: "I have been finishing three sections of this report all week.", label: "I have been finishing three sections of this report all week." },
    ],
    correctAnswer: "I have been working on this report all week, and so far I have finished three sections.",
    explanation: "This is an advanced application where both tenses are used together to convey a complete picture. 'I have been working...' (Present Perfect Continuous) perfectly describes the uninterrupted, ongoing effort. '...I have finished...' (Present Perfect Simple) clearly states the completed result or achievement so far. Option 1 is too simplistic. Option 3 is incorrect because 'finish' is a verb that describes a moment of completion, not a continuous activity, so 'have been finishing' is unnatural in this context."
  }
])

// --- Computed Properties for Validation ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    if (userAnswers.value[question.id] === question.correctAnswer) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const isAllAnswered = computed(() => {
  return Object.values(userAnswers.value).every(answer => answer !== null)
})

const resultDetails = computed(() => {
  return questions.value.map(question => {
    const userAnswer = userAnswers.value[question.id]
    const isCorrect = userAnswer === question.correctAnswer
    return {
      ...question,
      userAnswer,
      isCorrect,
    }
  })
})

// --- Methods ---
function submitAnswers() {
  if (isAllAnswered.value) {
    showResult.value = true
    // Scroll to results for better UX on mobile
    const resultElement = document.getElementById('results-section')
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use - Practice"
    test-description="Advanced exercises based on the teachings of Raymond Murphy."
    unit-title="Unit 4: How long have you (been)…?"
    unit-description="Mastering duration with the Present Perfect Continuous and Present Perfect Simple."
    :categories="['Tense', 'Present Perfect', 'Duration', 'Stative Verbs']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpenCheck class="h-6 w-6 text-blue-500" /> Core Concepts</CardTitle>
          <CardDescription>Understanding when to use each form is key to sounding natural.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h3 class="font-semibold text-md mb-2">Present Perfect Continuous: have been + -ing</h3>
            <p class="text-sm text-muted-foreground">Use this to talk about an <strong class="text-primary">unfinished action or activity</strong> that started in the past and is still continuing. The focus is on the <strong class="text-primary">duration</strong> and the <strong class="text-primary">activity itself</strong>.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li><code class="bg-muted px-1 rounded">She's been talking on the phone for an hour.</code> (The talking has not stopped).</li>
              <li><code class="bg-muted px-1 rounded">I've been waiting for you since 9am!</code> (The waiting continues up to this moment).</li>
              <li>It can also be used for recent, finished actions that have a present result: <code class="bg-muted px-1 rounded">You're out of breath. Have you been running?</code></li>
            </ul>
          </div>
           <div>
            <h3 class="font-semibold text-md mb-2">Present Perfect Simple: have + past participle</h3>
            <p class="text-sm text-muted-foreground">Use this in two main situations for duration:</p>
            <ol class="mt-2 list-decimal pl-5 space-y-2 text-sm">
              <li>For <strong class="text-primary">states (not actions)</strong> that started in the past and are still true. These often involve <strong class="text-primary">stative verbs</strong> like <em>know, have (own), be, like, understand</em>.</li>
              <li class="pl-2">
                <p>Correct: <code class="bg-muted px-1 rounded">I've known him for ten years.</code></p>
                <p>Incorrect: <del>I've been knowing him for ten years.</del></p>
              </li>
              <li>To talk about <strong class="text-primary">how much/how many</strong> have been completed over a period of time. The focus is on the <strong class="text-primary">result or achievement</strong>, not the ongoing activity.</li>
              <li class="pl-2">
                <p>Correct: <code class="bg-muted px-1 rounded">She's written 50 pages of her novel this month.</code></p>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle>Key Distinction: Activity vs. State</CardTitle>
        </CardHeader>
        <CardContent>
           <p class="text-sm text-muted-foreground">Think of it like this: If you can't see someone "doing" it, it's probably a state. You can see someone <strong class="text-blue-600">running</strong>, but you can't see them <strong class="text-rose-600">knowing</strong> someone. This simple mental check helps you choose between the continuous (for actions) and the simple (for states).</p>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Read each scenario carefully. The context is crucial. Select the best possible answer.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.questionText }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="showResult">
              <div v-for="option in question.options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="option.id" :value="option.value" />
                <Label :for="option.id" class="flex-1">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="submitAnswers" :disabled="!isAllAnswered || showResult" class="w-full">
            {{ showResult ? 'Answers Submitted' : 'Check Answers' }}
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
              You scored <strong class="text-primary text-xl">{{ score }}</strong> out of <strong class="text-primary text-xl">{{ questions.length }}</strong>.
              Review the explanations below to understand any mistakes.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(result, index) in resultDetails" :key="result.id">
              <p class="font-semibold mb-2">{{ index + 1 }}. {{ result.questionText }}</p>
              <div class="space-y-2">
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="result.isCorrect ? 'border-green-500' : 'border-red-500'">
                  <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                  <AlertTitle>Your Answer: {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
                  <AlertDescription>{{ result.userAnswer }}</AlertDescription>
                </Alert>
                <Alert v-if="!result.isCorrect" variant="default" class="border-l-4 border-blue-500">
                  <BookOpenCheck class="h-4 w-4" />
                  <AlertTitle>Correct Answer & Explanation</AlertTitle>
                  <AlertDescription>
                    <p class="font-medium mb-2">{{ result.correctAnswer }}</p>
                    <p class="text-xs">{{ result.explanation }}</p>
                  </AlertDescription>
                </Alert>
                <Alert v-else variant="default" class="border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/20">
                   <BookOpenCheck class="h-4 w-4" />
                   <AlertTitle>Explanation</AlertTitle>
                   <AlertDescription class="text-xs">{{ result.explanation }}</AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
