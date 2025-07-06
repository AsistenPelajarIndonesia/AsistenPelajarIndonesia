<!--
  File: pages/units/grammar/3.vue
  Description: An advanced grammar practice module for Unit 3: "Adjective + to ...".
  This page integrates learning material, challenging exercises, and a detailed results
  validator within the GrammarLayout. It aims to significantly enhance student
  comprehension of this grammatical structure.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports (assumed to exist) ---
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle, Award, Target } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = 'Intermediate & Advanced English Grammar Practice'
const testDescription = 'Based on "English Grammar in Use" by Raymond Murphy'
const unitTitle = 'Unit 3: Adjective + to-infinitive'
const unitDescription = 'Mastering the common English pattern where an adjective is followed by a to-infinitive. This unit explores its uses for expressing feelings, opinions, and judgements, and differentiates it from similar, often confused, structures.'
const categories = ['Adjectives', 'Infinitives', 'Sentence Structure', 'Prepositions']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real application, you would have logic to handle the first unit.
  router.push('/units/grammar/2')
}
function goToNextUnit() {
  // In a real application, you would have logic to handle the last unit.
  router.push('/units/grammar/4')
}

// --- Exercise State Management ---
const isSubmitted = ref(false)
const userAnswers = reactive<Record<string, string>>({})

interface Question {
  id: number
  type: 'mcq' | 'sentence-completion'
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'mcq',
    question: 'It was very insightful ___ him to analyze the problem from that perspective.',
    options: ['of', 'for', 'to', 'with'],
    correctAnswer: 'of',
    explanation: 'When making a judgement about a person\'s character based on their action, we use the structure "It is/was + adjective + OF + person + to-infinitive". Common adjectives include "kind", "generous", "clever", "stupid", "insightful". The structure with "FOR" is used when the adjective describes the action itself, not the person (e.g., "It was difficult for him to solve").',
  },
  {
    id: 2,
    type: 'sentence-completion',
    question: 'You are ___ to get a promotion if you keep exceeding your targets. It\'s almost a certainty.',
    options: ['bound', 'likely', 'afraid', 'easy'],
    correctAnswer: 'bound',
    explanation: 'While "likely" suggests a high probability, "bound" implies certainty or inevitability. Given the context "It\'s almost a certainty", "bound" is the strongest and most appropriate choice. "Afraid" and "easy" do not fit the meaning of the sentence.',
  },
  {
    id: 3,
    type: 'sentence-completion',
    question: 'I was tremendously relieved ___ that my lost wallet had been handed in to the police.',
    options: ['to hear', 'of hearing', 'for hearing', 'at hearing'],
    correctAnswer: 'to hear',
    explanation: 'Many adjectives describing feelings and reactions (relieved, happy, sad, disappointed, surprised) are followed by a to-infinitive. The infinitive explains the reason for the feeling. "I was relieved... why? ...to hear the news."',
  },
  {
    id: 4,
    type: 'mcq',
    question: 'The child won\'t go near the dog. He seems to be afraid ___ bitten.',
    options: ['of being', 'to be', 'of to be', 'to being'],
    correctAnswer: 'of being',
    explanation: 'This is a crucial distinction. "Afraid to do" something means you choose not to do it because you are scared (e.g., "I\'m afraid to jump"). "Afraid of [verb]-ing" refers to a fear of something happening to you, often something out of your control. The child fears the possibility of the dog biting him, so "afraid of being bitten" is correct.',
  },
  {
    id: 5,
    type: 'mcq',
    question: 'It is simply impossible ___ anyone to master a language in three months.',
    options: ['for', 'of', 'to', 'with'],
    correctAnswer: 'for',
    explanation: 'When an adjective like "impossible", "difficult", or "easy" describes the task itself, we use "for + person" to specify who is affected. The structure is "It is + adjective + FOR + person + to-infinitive".',
  },
  {
    id: 6,
    type: 'mcq',
    question: 'I\'m ___ to interrupt your meeting, but Mr. Evans is on the line and he says it\'s urgent.',
    options: ['sorry', 'disappointed', 'pleased', 'lucky'],
    correctAnswer: 'sorry',
    explanation: '"Sorry to + infinitive" is a standard polite formula for apologizing as you are doing something, like interrupting, or for something you are about to do. "I\'m sorry to inform you..." is another common example.',
  },
  {
    id: 7,
    type: 'sentence-completion',
    question: 'The shareholders were interested ___ why the CEO had resigned so suddenly.',
    options: ['to learn', 'in learning', 'of learning', 'for learning'],
    correctAnswer: 'to learn',
    explanation: '"Interested to learn/hear/see" is used when you want to find out about something specific, often new information. It implies a sense of discovery. "Interested in learning" is more general, referring to a broader subject or hobby (e.g., "I\'m interested in learning Japanese"). Here, the focus is on discovering a specific reason.',
  },
  {
    id: 8,
    type: 'mcq',
    question: 'Which of the following sentences is grammatically correct and most natural?',
    options: [
      'It is difficult of me to wake up early.',
      'He was proud for winning the first prize.',
      'She is certain to be offered the job.',
      'They were amazed of seeing the magician\'s trick.'
    ],
    correctAnswer: 'She is certain to be offered the job.',
    explanation: 'A) is incorrect; it should be "difficult for me". B) is incorrect; the correct structure is "proud of winning" or "proud to have won". D) is incorrect; it should be "amazed to see" or "amazed at seeing". C) is correct; "certain", like "sure" and "likely", is commonly followed by a to-infinitive to express a confident prediction.',
  },
])

// --- Validation & Scoring Logic ---
const results = computed(() => {
  if (!isSubmitted.value) return []
  return questions.value.map(q => {
    const userAnswer = userAnswers[q.id]
    const isCorrect = userAnswer === q.correctAnswer
    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })
})

const score = computed(() => {
  return results.value.filter(r => r.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { message: 'Exceptional Work!', description: 'A perfect score! You have a masterful command of this structure.', icon: Award }
  if (percentage >= 75) return { message: 'Excellent!', description: 'You have a strong understanding of the key concepts. Review the explanations for any mistakes.', icon: CheckCircle2 }
  if (percentage >= 50) return { message: 'Good Effort!', description: 'A solid attempt. Pay close attention to the explanations below to refine your knowledge.', icon: Target }
  return { message: 'Needs Review', description: 'This unit was challenging. Please review the material and the detailed feedback carefully.', icon: XCircle }
})

function submitQuiz() {
  // A simple check to ensure all questions are answered
  if (Object.keys(userAnswers).length !== questions.value.length) {
    alert('Please answer all questions before submitting.')
    return
  }
  isSubmitted.value = true
  // Scroll to the results section for better UX
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetQuiz() {
  isSubmitted.value = false
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL                                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A: Feelings & Reactions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <p>We often use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Adjective + to-infinitive</code> to explain the reason for a feeling.</p>
          <p>Common adjectives: <span class="font-semibold">happy, glad, pleased, sorry, disappointed, surprised, amazed, relieved, sad.</span></p>
          <ul class="list-disc space-y-2 pl-5">
            <li>She was <span class="font-medium text-primary">happy to see</span> her friends again.</li>
            <li>We were <span class="font-medium text-primary">sorry to hear</span> about your accident.</li>
            <li>I was <span class="font-medium text-primary">surprised to find</span> the office empty.</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>B: Judgements & Opinions (It is...)</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <p>This structure is common for giving opinions about an action. Notice the use of <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">of</code> or <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">for</code>.</p>
          <p>Use <span class="font-semibold">OF + person</span> when the adjective describes the person's character (e.g., kind, nice, generous, silly, stupid, clever).</p>
          <ul class="list-disc space-y-2 pl-5">
            <li>It was <span class="font-medium text-primary">kind of you to help</span>. (You are kind)</li>
            <li>I think it was <span class="font-medium text-primary">stupid of him to quit</span> his job. (He is stupid)</li>
          </ul>
          <p class="pt-2">Use <span class="font-semibold">FOR + person</span> when the adjective describes the action itself (e.g., easy, difficult, hard, impossible, dangerous, expensive).</p>
           <ul class="list-disc space-y-2 pl-5">
            <li>It is <span class="font-medium text-primary">difficult for me to understand</span> the rules. (Understanding is difficult)</li>
            <li>It would be <span class="font-medium text-primary">impossible for us to finish</span> on time. (Finishing is impossible)</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>C: Expert Corner - Subtle Distinctions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <p class="font-semibold">afraid to do vs. afraid of doing</p>
          <ul class="list-disc space-y-2 pl-5">
            <li><span class="font-medium">afraid to do:</span> You don't do something because you are scared. It's a choice. <br><em>e.g., He was afraid to jump from the wall.</em></li>
            <li><span class="font-medium">afraid of doing:</span> You are scared that something might happen to you (often accidental). <br><em>e.g., I don't like high places. I'm afraid of falling.</em></li>
          </ul>
           <p class="pt-2 font-semibold">sorry to do vs. sorry for/about doing</p>
           <ul class="list-disc space-y-2 pl-5">
            <li><span class="font-medium">sorry to do:</span> Used to apologize for a current action or to give bad news. <br><em>e.g., I'm sorry to interrupt. / I'm sorry to tell you that you failed.</em></li>
            <li><span class="font-medium">sorry for/about doing:</span> Used to apologize for something that happened in the past. <br><em>e.g., I'm sorry for shouting at you yesterday.</em></li>
          </ul>
        </CardContent>
      </Card>
    </template>
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitQuiz">
            <fieldset :disabled="isSubmitted" class="space-y-8">
              <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
                <p class="font-semibold leading-none tracking-tight">{{ index + 1 }}. {{ q.question }}</p>
                <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
                  <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`" class="cursor-pointer">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>
            </fieldset>
          </form>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" type="submit" class="w-full" @click="submitQuiz">Check Answers</Button>
          <Button v-else variant="outline" class="w-full" @click="resetQuiz">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
    <!-- ======================================================================= -->
    <!-- RESULTS & VALIDATION                                                    -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-xl md:text-2xl">Your Results</CardTitle>
              <div class="font-bold text-2xl" :class="scorePercentage >= 50 ? 'text-green-600' : 'text-red-600'">
                {{ score }} / {{ questions.length }}
              </div>
            </div>
            <Progress :model-value="scorePercentage" class="mt-2" />
          </CardHeader>
          <CardContent>
            <Alert :class="scorePercentage >= 75 ? 'border-green-500' : scorePercentage >= 50 ? 'border-yellow-500' : 'border-red-500'">
              <component :is="scoreFeedback.icon" class="h-5 w-5" />
              <AlertTitle>{{ scoreFeedback.message }}</AlertTitle>
              <AlertDescription>{{ scoreFeedback.description }}</AlertDescription>
            </Alert>
            <div class="mt-6 space-y-6">
              <h3 class="text-lg font-bold">Detailed Breakdown:</h3>
              <div v-for="(result, index) in results" :key="result.id">
                <div class="rounded-lg border p-4" :class="result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
                  <div class="flex items-start gap-3">
                    <span class="flex h-8 w-8 items-center justify-center rounded-full" :class="result.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                      <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5" />
                      <XCircle v-else class="h-5 w-5" />
                    </span>
                    <div class="flex-1">
                      <p class="font-semibold">{{ index + 1 }}. {{ result.question }}</p>
                      <p class="mt-1 text-sm text-muted-foreground">Your answer: 
                        <span :class="result.isCorrect ? 'text-green-800 font-bold' : 'text-red-800 font-bold line-through'">
                          {{ result.userAnswer }}
                        </span>
                      </p>
                      <p v-if="!result.isCorrect" class="mt-1 text-sm text-muted-foreground">
                        Correct answer: <span class="font-bold text-green-800">{{ result.correctAnswer }}</span>
                      </p>
                      <div class="mt-3 rounded-md bg-background p-3 text-sm">
                        <p class="font-bold text-primary/80">Teacher's Explanation:</p>
                        <p class="mt-1 text-muted-foreground">{{ result.explanation }}</p>
                      </div>
                    </div>
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

<style scoped>
/* A simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
