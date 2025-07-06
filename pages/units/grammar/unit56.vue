<!--
  File: @/pages/units/grammar/2.vue
  Description: An advanced grammar practice page for Unit 2: "Verb + -ing or to … 2 (try, need, help)", 
  inspired by Raymond Murphy's "English Grammar in Use". This page provides in-depth explanations,
  challenging exercises, and a sophisticated validation system with detailed feedback to enhance
  the student's grammatical understanding.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, Lightbulb, Repeat } from 'lucide-vue-next'

// --- Component Imports (assuming a shadcn-vue or similar setup) ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: "Intermediate English Grammar Practice",
  testDescription: "Based on 'English Grammar in Use' by Raymond Murphy",
  unitTitle: "Unit 2: Verb + -ing or to … (try, need, help)",
  unitDescription: "Master the nuanced differences between verb patterns like 'try to do' vs. 'try doing', 'need to do' vs. 'need doing', and the uses of 'help'.",
  categories: ['Verbs', 'Gerunds', 'Infinitives', 'Verb Patterns']
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Assuming a logical previous unit exists at this path
  router.push("/units/grammar/1")
}
function goToNextUnit() {
  // Assuming a logical next unit exists at this path
  router.push("/units/grammar/3")
}

// --- Reactive State for the Quiz ---
const showResult = ref(false)

interface Question {
  id: number
  type: 'fill-in' | 'choice' | 'rewrite'
  prompt: string
  context?: string
  options?: { value: string; label: string }[]
  userAnswer: string
  correctAnswer: string | string[] // Can accept multiple correct variants
  isCorrect: boolean | null
  explanation: string
}

const quizState = reactive<{ questions: Question[] }>({
  questions: [
    {
      id: 1,
      type: 'choice',
      prompt: "The new software kept crashing, so as a last resort, I tried ________ the entire system. It was a simple experiment to see if it would solve the problem.",
      context: "",
      options: [
        { value: 'to restart', label: 'to restart' },
        { value: 'restarting', label: 'restarting' }
      ],
      userAnswer: '',
      correctAnswer: 'restarting',
      isCorrect: null,
      explanation: "Correct. We use 'try + -ing' to mean doing something as an experiment to solve a problem. 'Try + to-infinitive' implies making an effort to do something difficult. Here, the action is an experiment, not an effort or a struggle."
    },
    {
      id: 2,
      type: 'fill-in',
      prompt: "I really need ________ (get) more sleep. I've been exhausted all week.",
      context: "Complete the sentence with the correct form of the verb in parentheses.",
      userAnswer: '',
      correctAnswer: 'to get',
      isCorrect: null,
      explanation: "Correct. 'Need + to-infinitive' is used when the subject of the sentence needs to perform the action. 'I' am the one who needs 'to get' more sleep."
    },
    {
      id: 3,
      type: 'rewrite',
      prompt: "Rewrite the following sentence using the 'need + -ing' structure: 'Someone ought to clean these windows.'",
      context: "Your new sentence should start with 'These windows...'",
      userAnswer: '',
      correctAnswer: ['These windows need cleaning.', 'these windows need cleaning.'],
      isCorrect: null,
      explanation: "Excellent. The structure 'need + -ing' has a passive meaning, equivalent to 'need + to be done'. So, 'These windows need cleaning' means 'These windows need to be cleaned'."
    },
    {
      id: 4,
      type: 'fill-in',
      prompt: "Even though I was on a diet, the cake looked so delicious that I couldn't help ________ (have) a small piece.",
      context: "Complete the sentence with the correct form of the verb in parentheses.",
      userAnswer: '',
      correctAnswer: 'having',
      isCorrect: null,
      explanation: "Perfect. The expression 'can't help + -ing' means you cannot stop yourself from doing something. The infinitive form is never used here."
    },
    {
      id: 5,
      type: 'choice',
      prompt: "Could you please help me ________ this heavy sofa? I can't move it on my own.",
      context: "Choose the most common and correct form in modern English.",
      options: [
        { value: 'carry', label: 'carry' },
        { value: 'to carry', label: 'to carry' },
        { value: 'Both are correct', label: 'Both are correct' }
      ],
      userAnswer: '',
      correctAnswer: 'Both are correct',
      isCorrect: null,
      explanation: "Correct. Both 'help somebody do' and 'help somebody to do' are grammatically correct. However, the form without 'to' ('help me carry') is more common, especially in spoken English."
    },
    {
      id: 6,
      type: 'fill-in',
      prompt: "I tried ________ (persuade) him not to resign, but he had already made up his mind. It was a difficult conversation.",
      context: "Complete the sentence with the correct form of the verb in parentheses.",
      userAnswer: '',
      correctAnswer: 'to persuade',
      isCorrect: null,
      explanation: "Correct. We use 'try + to-infinitive' here because it signifies an attempt or effort to do something challenging. The speaker made an effort, but failed. It wasn't an experiment."
    },
    {
      id: 7,
      type: 'rewrite',
      prompt: "Rewrite the sentence to express a passive need: 'The managers must update the company policy.'",
      context: "Your new sentence should start with 'The company policy...'",
      userAnswer: '',
      correctAnswer: ['The company policy needs updating.', 'the company policy needs updating.'],
      isCorrect: null,
      explanation: "Correct. 'The company policy needs updating' is the correct transformation. It carries the passive meaning that the policy is the object that requires the action of updating."
    },
    {
      id: 8,
      type: 'choice',
      prompt: "My car is making a strange noise. I think the engine ________.",
      context: "Choose the option that correctly describes the situation.",
      options: [
        { value: 'needs to check', label: 'needs to check' },
        { value: 'needs checking', label: 'needs checking' }
      ],
      userAnswer: '',
      correctAnswer: 'needs checking',
      isCorrect: null,
      explanation: "Correct. We use 'need + -ing' because the engine is the object that requires the action of being checked. The alternative correct form would be the passive infinitive: 'needs to be checked'."
    }
  ]
})

// --- Computed Properties for Scoring ---
const score = computed(() => {
  return quizState.questions.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => {
  return quizState.questions.length
})

const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

// --- Core Logic Functions ---
function validateAnswers() {
  quizState.questions.forEach(question => {
    const userAnswerCleaned = question.userAnswer.trim()
    if (Array.isArray(question.correctAnswer)) {
      question.isCorrect = question.correctAnswer.some(ans => ans.trim() === userAnswerCleaned);
    } else {
      question.isCorrect = userAnswerCleaned.toLowerCase() === question.correctAnswer.toLowerCase()
    }
  })
  showResult.value = true
}

function resetQuiz() {
  quizState.questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
  showResult.value = false
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: In-depth explanations of the grammar points.                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Lightbulb class="text-yellow-500" />Try to do vs. Try -ing</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><code class="font-bold">try to do</code> = to attempt something, to make an effort. This often implies the action is difficult or may not succeed.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Please <strong class="text-primary">try to be</strong> quiet when you come home. (Make an effort to be quiet)</li>
            <li>I <strong class="text-primary">tried to lift</strong> the suitcase, but it was far too heavy. (I attempted it, but failed)</li>
          </ul>
          <p><code class="font-bold">try -ing</code> = to do something as an experiment to see what will happen or to solve a problem.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>The photocopier isn't working. <strong class="text-primary">Try pressing</strong> the green button. (This is a suggestion, an experiment)</li>
            <li>A: 'I have a terrible headache.' B: '<strong class="text-primary">Try taking</strong> an aspirin.' (See if an aspirin will help)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Lightbulb class="text-yellow-500" />Need to do vs. Need -ing</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><code class="font-bold">need to do</code> = It is necessary for the subject to do something.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>He <strong class="text-primary">needs to work</strong> harder if he wants a promotion. (He must perform the action)</li>
            <li>I <strong class="text-primary">need to go</strong> to the supermarket.</li>
          </ul>
          <p><code class="font-bold">need -ing</code> = This structure has a passive meaning. It means 'something needs to be done'.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>My hair <strong class="text-primary">needs cutting</strong>. (= my hair needs to be cut)</li>
            <li>The batteries in the remote control <strong class="text-primary">need changing</strong>. (= the batteries need to be changed)</li>
          </ul>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Lightbulb class="text-yellow-500" />Help and Can't Help</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><code class="font-bold">help (to) do</code> = You can use 'help' with or without 'to' before the verb. The form without 'to' is more common.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Can you <strong class="text-primary">help me to find</strong> my keys? (Correct)</li>
            <li>Can you <strong class="text-primary">help me find</strong> my keys? (Correct and more common)</li>
          </ul>
          <p><code class="font-bold">can't help -ing</code> = This fixed expression means 'cannot stop myself from doing something'.</p>
          <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>I <strong class="text-primary">couldn't help laughing</strong> when he fell over. (I couldn't stop myself)</li>
            <li>She <strong class="text-primary">can't help biting</strong> her nails when she's nervous.</li>
          </ul>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice: Interactive questions for the student to answer.             -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Apply your knowledge. Choose the correct form, fill in the blank, or rewrite the sentence. Pay close attention to the context.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in quizState.questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.prompt }}</p>
            <p v-if="question.context" class="text-sm text-muted-foreground italic">{{ question.context }}</p>
            
            <div v-if="question.type === 'fill-in' || question.type === 'rewrite'">
              <Input
                v-model="question.userAnswer"
                :disabled="showResult"
                placeholder="Your answer here..."
              />
            </div>

            <div v-if="question.type === 'choice'">
              <RadioGroup v-model="question.userAnswer" :disabled="showResult" class="gap-2">
                <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${question.id}-${option.value}`" :value="option.value" />
                  <Label :for="`q${question.id}-${option.value}`">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full" @click="validateAnswers">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: Detailed feedback and scoring after validation.                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance and read the explanations to solidify your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between font-medium">
              <span>Overall Score</span>
              <span>{{ score }} / {{ totalQuestions }}</span>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>

          <div class="space-y-6">
            <Alert
              v-for="(question, index) in quizState.questions"
              :key="`result-${question.id}`"
              :variant="question.isCorrect ? 'default' : 'destructive'"
            >
              <div class="flex items-start gap-3">
                 <div class="mt-1">
                    <CheckCircle2 v-if="question.isCorrect" class="h-5 w-5 text-green-500" />
                    <XCircle v-else class="h-5 w-5" />
                 </div>
                <div class="flex-1 space-y-2">
                  <AlertTitle>Question {{ index + 1 }}</AlertTitle>
                  <AlertDescription>
                    <p class="mb-2 font-mono text-sm p-2 rounded-md" :class="question.isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
                      <span class="font-semibold">Your Answer:</span> {{ question.userAnswer || ' (No answer)' }}
                    </p>
                    <p v-if="!question.isCorrect" class="mb-2 font-mono text-sm p-2 rounded-md bg-green-100 dark:bg-green-900/30">
                       <span class="font-semibold">Correct Answer:</span> {{ Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer }}
                    </p>
                    <p class="border-l-4 border-yellow-500 pl-3 text-foreground">{{ question.explanation }}</p>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" variant="outline" @click="resetQuiz">
            <Repeat class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
