<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpingHand } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

const router = useRouter()
const showResult = ref(false)
const isSubmitted = ref(false)

interface Question {
  id: number
  type: 'fill-in' | 'multiple-choice'
  text: string
  prompt: string
  options?: string[]
  userAnswer: string
  correctAnswer: string
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    text: 'Maria is learning Japanese. She started classes in December. She (learn) ___ Japanese for six months.',
    prompt: 'Complete the sentence with the correct form of the verb in brackets.',
    userAnswer: '',
    correctAnswer: 'has been learning',
    explanation: 'The correct answer is "has been learning" (Present Perfect Continuous) because the sentence emphasizes the duration of an activity ("for six months") that started in the past and is still ongoing. The focus is on the learning process itself, not a final result.',
  },
  {
    id: 2,
    type: 'fill-in',
    text: 'I\'m exhausted because I (paint) ___ the living room walls all day, and I still haven\'t finished.',
    prompt: 'Complete the sentence with the correct form of the verb in brackets.',
    userAnswer: '',
    correctAnswer: 'have been painting',
    explanation: 'We use "have been painting" (Present Perfect Continuous) to explain a present result (I\'m exhausted). The action of painting has been happening over a period of time ("all day") and is the direct cause of the current state of exhaustion. The activity itself is the focus.',
  },
  {
    id: 3,
    type: 'fill-in',
    text: 'Look! Somebody (break) ___ that window. We need to call the police.',
    prompt: 'Complete the sentence with the correct form of the verb in brackets.',
    userAnswer: '',
    correctAnswer: 'has broken',
    explanation: 'The correct answer is "has broken" (Present Perfect Simple). The focus is on the result of the action (the window is now broken), not the action itself. This is a completed action with a visible consequence in the present.',
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: 'How many pages of that report ___ so far?',
    prompt: 'Choose the most appropriate option to complete the question.',
    options: ['have you been writing', 'have you written'],
    userAnswer: '',
    correctAnswer: 'have you written',
    explanation: '"Have you written" (Present Perfect Simple) is correct because the question asks about a quantifiable result ("How many pages"). When we focus on the amount or number of things completed, we use the simple form, not the continuous.',
  },
  {
    id: 5,
    type: 'fill-in',
    text: 'She (read) ___ the book you gave her, but she (not finish) ___ it yet.',
    prompt: 'Use two different forms for the verbs in brackets.',
    userAnswer: '',
    correctAnswer: 'has been reading / has not finished',
    explanation: 'The first part uses "has been reading" (Present Perfect Continuous) to describe the ongoing activity. The second part uses "has not finished" (Present Perfect Simple) to talk about the result or completion status of that activity. This contrast is a classic use case.',
  },
  {
    id: 6,
    type: 'fill-in',
    text: 'I (know) ___ Alex for ten years. We met in college.',
    prompt: 'Complete the sentence with the correct form of the verb in brackets.',
    userAnswer: '',
    correctAnswer: 'have known',
    explanation: '"Have known" (Present Perfect Simple) is correct because "know" is a stative verb. Stative verbs (like know, believe, like, own) describe states, not actions, and are typically not used in continuous tenses. The duration ("for ten years") does not change this rule.',
  },
  {
    id: 7,
    type: 'multiple-choice',
    text: 'A: Your clothes are covered in mud! \nB: I know, I ___ in the garden.',
    prompt: 'Choose the best response to explain the situation.',
    options: ['have worked', 'have been working'],
    userAnswer: '',
    correctAnswer: 'have been working',
    explanation: '"Have been working" (Present Perfect Continuous) is the best choice because it explains the present evidence (muddy clothes). The focus is on the recent, continuous activity that caused the current result.',
  },
  {
    id: 8,
    type: 'fill-in',
    text: 'The company\'s profits (increase) ___ significantly this year, reaching a new record.',
    prompt: 'Complete the sentence with the correct form of the verb in brackets.',
    userAnswer: '',
    correctAnswer: 'have increased',
    explanation: '"Have increased" (Present Perfect Simple) is correct because the sentence focuses on the achievement and the completed result ("reaching a new record"). While the increase happened over time, the emphasis here is on the final outcome.',
  }
])

const userResults = ref<Array<{ id: number, isCorrect: boolean }>>([])

const score = computed(() => userResults.value.filter(r => r.isCorrect).length)
const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => totalQuestions.value > 0 ? Math.round((score.value / totalQuestions.value) * 100) : 0)

const validateAnswers = () => {
  const results = questions.value.map(q => {
    let isCorrect = false
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\s+/g, ' ')
    const correctAnswerCleaned = q.correctAnswer.toLowerCase().replace(/\s+/g, ' ')
    
    // For fill-in questions that might have two parts
    if (q.type === 'fill-in' && correctAnswerCleaned.includes('/')) {
        const correctParts = correctAnswerCleaned.split('/').map(p => p.trim())
        const userParts = userAnswerCleaned.split('/').map(p => p.trim())
        if (userParts.length === correctParts.length) {
            isCorrect = correctParts.every((part, index) => userParts[index] === part)
        }
    } else {
        isCorrect = userAnswerCleaned === correctAnswerCleaned
    }
    
    return { id: q.id, isCorrect }
  })
  userResults.value = results
  isSubmitted.value = true
  showResult.value = true
  
  // Scroll to the results section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-card');
    resultElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

const resetQuiz = () => {
  showResult.value = false
  isSubmitted.value = false
  userResults.value = []
  questions.value.forEach(q => q.userAnswer = '')
   const topElement = document.getElementById('practice-card');
    topElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const getQuestionStatus = (questionId: number) => {
  if (!isSubmitted.value) return null
  const result = userResults.value.find(r => r.id === questionId)
  return result?.isCorrect ? 'correct' : 'incorrect'
}

const goToPreviousUnit = () => {
  router.push("/units/grammar/2")
}

const goToNextUnit = () => {
  router.push("/units/grammar/4")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate Level Grammar Exercises based on Raymond Murphy's methodology."
    unit-title="Unit 3: Present Perfect Continuous and Simple"
    unit-description="Mastering the crucial difference between ongoing activities (I have been doing) and completed actions with present results (I have done)."
    :categories="['Tense', 'Aspect', 'Present Perfect', 'Intermediate']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: A Tale of Two Tenses</CardTitle>
          <CardDescription>Understanding when to use each tense is about understanding focus and context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <h4 class="font-semibold text-md">1. Present Perfect Simple (I have done)</h4>
            <p class="text-sm text-muted-foreground">Focuses on the **result** or **completion** of an action.</p>
            <ul class="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Completed Action, Present Result:</strong> <i>I <span class="font-bold text-primary">have lost</span> my keys.</i> (Result: I can't get in my house now).</li>
              <li><strong>Number/Quantity:</strong> <i>She <span class="font-bold text-primary">has written</span> three emails this morning.</i> (Focus is on 'how many').</li>
              <li><strong>Life Experience (or lack thereof):</strong> <i><span class="font-bold text-primary">Have</span> you ever <span class="font-bold text-primary">been</span> to Japan?</i></li>
              <li><strong>With Stative Verbs:</strong> <i>I <span class="font-bold text-primary">have known</span> him for a long time.</i> (Verbs like 'know', 'like', 'believe', 'own' are not used in continuous forms).</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-md">2. Present Perfect Continuous (I have been doing)</h4>
            <p class="text-sm text-muted-foreground">Focuses on the **duration** or **process** of an activity.</p>
            <ul class="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Duration of an Unfinished Action:</strong> <i>He <span class="font-bold text-primary/80">has been waiting</span> for over an hour.</i> (He is still waiting).</li>
              <li><strong>Explaining a Present Result:</strong> <i>Why are you so wet? — I <span class="font-bold text-primary/80">have been walking</span> in the rain.</i> (The activity explains the result).</li>
              <li><strong>Temporary or Recent Activity:</strong> <i>I <span class="font-bold text-primary/80">have been working</span> very hard recently.</i></li>
              <li><strong>Repetition/Process:</strong> <i>She <span class="font-bold text-primary/80">has been calling</span> me all day.</i> (Focus on the repeated action, not the number of calls).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Key Differences & Pro-Tips</CardTitle>
        </CardHeader>
        <CardContent>
           <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="font-semibold">
                <tr class="border-b">
                  <th class="p-2 text-left">Aspect</th>
                  <th class="p-2 text-left">Present Perfect Simple</th>
                  <th class="p-2 text-left">Present Perfect Continuous</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2 font-medium">Focus</td>
                  <td class="p-2">Result, Completion, 'How much/many'</td>
                  <td class="p-2">Duration, Process, 'How long'</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2 font-medium">Example</td>
                  <td class="p-2"><i>I've painted the fence. (It's finished)</i></td>
                  <td class="p-2"><i>I've been painting the fence. (I'm tired/covered in paint)</i></td>
                </tr>
                 <tr>
                  <td class="p-2 font-medium">Stative Verbs</td>
                  <td class="p-2 text-green-600 font-semibold">✔️ Used (e.g., have known)</td>
                  <td class="p-2 text-destructive font-semibold">❌ Not used (e.g., <s class="text-red-400">have been knowing</s>)</td>
                </tr>
              </tbody>
            </table>
           </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card id="practice-card">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Apply the concepts. Type your answers carefully. For question 5, separate answers with a forward slash (e.g., answer1 / answer2).</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <Label :for="`q${question.id}`" class="flex flex-col gap-1">
              <span class="font-semibold">Question {{ index + 1 }}</span>
              <span class="text-base text-card-foreground" v-html="question.text.replace('___', `<span class='font-mono text-muted-foreground'>[${question.prompt}]</span>`)"></span>
            </Label>
            
            <div v-if="question.type === 'fill-in'" class="relative">
              <Input
                :id="`q${question.id}`"
                v-model="question.userAnswer"
                :disabled="isSubmitted"
                placeholder="Type your answer here..."
                :class="{
                  'border-green-500 focus-visible:ring-green-500': getQuestionStatus(question.id) === 'correct',
                  'border-red-500 focus-visible:ring-red-500': getQuestionStatus(question.id) === 'incorrect'
                }"
              />
            </div>
            
            <RadioGroup
              v-if="question.type === 'multiple-choice'"
              :id="`q${question.id}`"
              v-model="question.userAnswer"
              :disabled="isSubmitted"
              class="flex flex-col gap-2"
            >
              <div
                v-for="option in question.options"
                :key="option"
                class="flex items-center space-x-2 p-3 rounded-md border transition-colors"
                :class="{
                  'border-green-500 bg-green-500/10': isSubmitted && option === question.correctAnswer,
                  'border-red-500 bg-red-500/10': isSubmitted && option !== question.correctAnswer && question.userAnswer === option,
                }"
              >
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="flex-1 cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button @click="validateAnswers" :disabled="isSubmitted" size="lg">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card id="results-card">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <Progress :model-value="scorePercentage" class="w-[60%]" />
            <span class="font-bold text-lg">{{ score }} / {{ totalQuestions }} ({{ scorePercentage }}%)</span>
          </div>
           <CardDescription>Review the detailed explanations below to understand any mistakes and reinforce your learning.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <h3 class="text-xl font-semibold tracking-tight">Detailed Breakdown</h3>
          <div v-for="question in questions" :key="`result-${question.id}`" class="p-4 border rounded-lg">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-shrink-0">
                <CheckCircle2 v-if="getQuestionStatus(question.id) === 'correct'" class="h-8 w-8 text-green-600" />
                <XCircle v-else class="h-8 w-8 text-destructive" />
              </div>
              <div class="flex-1 space-y-2">
                <p class="text-base font-medium" v-html="question.text.replace('___', `<strong>...</strong>`)"></p>
                <div class="text-sm space-y-1">
                   <p>Your Answer: <span :class="getQuestionStatus(question.id) === 'correct' ? 'text-green-700 font-semibold' : 'text-destructive font-semibold'">{{ question.userAnswer || 'No answer provided' }}</span></p>
                   <p v-if="getQuestionStatus(question.id) === 'incorrect'">Correct Answer: <span class="text-green-700 font-semibold">{{ question.correctAnswer }}</span></p>
                </div>
                <Alert class="mt-3" :variant="getQuestionStatus(question.id) === 'correct' ? 'default' : 'destructive'">
                  <HelpingHand class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    {{ question.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="resetQuiz" variant="outline" size="lg">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
