<!--
  File: @/pages/units/grammar/8.vue
  Description: An advanced grammar practice module for the Past Perfect tense.
  This page is built upon the GrammarLayout, providing in-depth learning material,
  challenging practice questions, and a powerful validation system with detailed feedback.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a library like shadcn-vue
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()
const currentUnit = 8

function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}

function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

const showResult = ref(false)
const results = ref<any>(null)

interface Question {
  id: number
  type: 'fill-in' | 'mcq' | 'combine'
  questionText: string
  instructions?: string
  context?: string
  userAnswer: string | string[]
  correctAnswer: string | string[]
  explanation: string
  options?: string[]
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    instructions: "Complete the sentence with the Past Perfect or Simple Past form of the verb in brackets.",
    context: "The investigation revealed a critical detail.",
    questionText: "The suspect _______ (leave) the country by the time the police _______ (arrive) at his apartment.",
    userAnswer: ['', ''],
    correctAnswer: ['had left', 'arrived'],
    explanation: "The act of 'leaving' happened before the 'arrival' of the police. Therefore, the earlier action must use the Past Perfect ('had left'), and the subsequent past action uses the Simple Past ('arrived'). This establishes a clear sequence of past events."
  },
  {
    id: 2,
    type: 'mcq',
    instructions: "Choose the most appropriate option to complete the dialogue.",
    context: "A: Why were you so late for the meeting? B: I'm sorry.",
    questionText: "By the time I got to the station, the train _______.",
    userAnswer: '',
    correctAnswer: 'had already departed',
    options: ['already departed', 'was already departing', 'had already departed', 'has already departed'],
    explanation: "The correct choice is 'had already departed'. My arrival at the station is a past event. The train's departure happened *before* that past event. The Past Perfect is essential to convey this 'past-before-the-past' timeline. 'Already departed' (Simple Past) would be grammatically awkward, and the other tenses are incorrect for this context."
  },
  {
    id: 3,
    type: 'combine',
    instructions: "Combine the two sentences into one using the Past Perfect and the word in brackets. Punctuation matters.",
    context: "Event 1: She meticulously prepared the presentation. Event 2: She delivered it flawlessly.",
    questionText: "Combine: a) She delivered the presentation flawlessly. b) She prepared for it for weeks. [because]",
    userAnswer: '',
    correctAnswer: "She delivered the presentation flawlessly because she had prepared for it for weeks.",
    explanation: "The preparation occurred over a period of time *before* the delivery. The Past Perfect 'had prepared' correctly places the preparation phase as the background, completed action that enabled the success of the later past action, 'delivered'."
  },
  {
    id: 4,
    type: 'fill-in',
    instructions: "This question tests the negative form. Use Past Perfect or Simple Past.",
    context: "A student is explaining a failed exam.",
    questionText: "I _______ (fail) the test because I _______ (not study) the correct chapters. My friend _______ (tell) me the wrong information the day before.",
    userAnswer: ['', '', ''],
    correctAnswer: ['failed', 'hadn\'t studied', 'had told'],
    explanation: "The main past event is 'failed' (Simple Past). The reason for this failure was the lack of studying, which happened (or didn't happen) *before* the test. Therefore, 'hadn't studied' (Past Perfect Negative) is necessary. Similarly, the friend's action of telling wrong information also happened before the test, making 'had told' the correct choice."
  },
  {
    id: 5,
    type: 'mcq',
    instructions: "Identify the sentence where the Past Perfect is used INCORRECTLY or unnecessarily.",
    context: "Understanding when *not* to use the Past Perfect is a sign of mastery.",
    questionText: "Which sentence is grammatically flawed?",
    userAnswer: '',
    correctAnswer: 'He had gotten up at 7 AM and had taken a shower immediately.',
    options: [
      'She realized she had seen the film before.',
      'After the guests had left, we started to clean up.',
      'He had gotten up at 7 AM and had taken a shower immediately.',
      'They hadn\'t finished eating when the power went out.'
    ],
    explanation: "The sentence 'He had gotten up... and had taken...' is flawed because the sequence of events is clear and chronological ('immediately'). The Simple Past is sufficient and more natural: 'He got up at 7 AM and took a shower...'. The Past Perfect is overused here. In the other sentences, it correctly denotes an action that occurred before another past action or was interrupted."
  }
])

function cleanAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, ' ')
}

function validateAnswers() {
  let correctCount = 0
  const feedback = questions.map(q => {
    let isCorrect = false
    if (Array.isArray(q.correctAnswer)) {
      const userAnswersClean = (q.userAnswer as string[]).map(cleanAnswer);
      const correctAnswersClean = q.correctAnswer.map(cleanAnswer);
      isCorrect = JSON.stringify(userAnswersClean) === JSON.stringify(correctAnswersClean)
    } else {
      isCorrect = cleanAnswer(q.userAnswer as string) === cleanAnswer(q.correctAnswer as string)
    }
    
    if (isCorrect) correctCount++
    
    return {
      ...q,
      isCorrect,
      userAnswerDisplay: Array.isArray(q.userAnswer) ? q.userAnswer.join(', ') : q.userAnswer,
      correctAnswerDisplay: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
    }
  })

  const score = (correctCount / questions.length) * 100
  results.value = {
    score: Math.round(score),
    correctCount,
    totalCount: questions.length,
    feedback
  }
  showResult.value = true
  
  // Scroll to results
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const scoreMessage = computed(() => {
  if (!results.value) return { title: '', description: '', variant: 'default' };
  const score = results.value.score
  if (score === 100) return { title: 'Exceptional Mastery!', description: 'You have a perfect understanding of the Past Perfect. Your grasp of temporal sequence in past narratives is flawless.', variant: 'default' }
  if (score >= 75) return { title: 'Excellent Work!', description: 'You have a strong command of the Past Perfect. Pay close attention to the explanations for any missed questions to achieve perfection.', variant: 'default' }
  if (score >= 50) return { title: 'Good Progress.', description: 'You understand the basics, but there are some nuances to master. Review the material and the explanations carefully.', variant: 'destructive' }
  return { title: 'Needs Review', description: 'The Past Perfect can be tricky. It is highly recommended to study the material on this page again before re-attempting the exercises.', variant: 'destructive' }
})
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="A series of exercises based on the methodology of Raymond Murphy's essential grammar guide."
    unit-title="Unit 8: Past Perfect (I had done)"
    unit-description="Mastering the 'past before the past' to describe sequences of events with clarity and precision."
    :categories="['Tenses', 'Past Events', 'Advanced Grammar', 'Narrative Structure']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><HelpCircle class="text-sky-500" /> Core Concept: The Earlier Past</CardTitle>
          <CardDescription>
            The Past Perfect tense acts like a time machine for your narrative. It describes an action that was completed *before* another action or a specific time in the past.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">Compare these two scenarios:</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-lg border bg-card p-4">
              <p class="text-sm font-medium text-muted-foreground">Scenario A: Simple Past</p>
              <p class="font-mono">When I <span class="font-bold text-red-500">arrived</span>, Sarah <span class="font-bold text-red-500">left</span>.</p>
              <p class="mt-2 text-xs"><strong>Meaning:</strong> I arrived first, and then Sarah left. The actions happened chronologically.</p>
            </div>
            <div class="rounded-lg border bg-card p-4">
              <p class="text-sm font-medium text-muted-foreground">Scenario B: Past Perfect</p>
              <p class="font-mono">When I <span class="font-bold text-red-500">arrived</span>, Sarah <span class="font-bold text-blue-600">had left</span>.</p>
              <p class="mt-2 text-xs"><strong>Meaning:</strong> Sarah left first, and then I arrived. I missed her. The Past Perfect signals her departure was the *earlier* action.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Structure & Form</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-semibold">Positive: <code class="rounded bg-muted px-2 py-1 text-sm">subject + had + past participle</code></h4>
            <p class="pl-4 font-mono text-sm">She <span class="font-bold">had finished</span> the report.</p>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold">Negative: <code class="rounded bg-muted px-2 py-1 text-sm">subject + had not (hadn't) + past participle</code></h4>
            <p class="pl-4 font-mono text-sm">They <span class="font-bold">hadn't seen</span> the movie.</p>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold">Question: <code class="rounded bg-muted px-2 py-1 text-sm">had + subject + past participle</code></h4>
            <p class="pl-4 font-mono text-sm"><span class="font-bold">Had you</span> ever <span class="font-bold">visited</span> Paris before your trip last year?</p>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><AlertCircle class="text-amber-500" /> Common Pitfalls & Pro-Tips</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            <strong class="text-destructive">Avoid Overuse:</strong> If the sequence is clear from conjunctions like <code class="text-xs">before</code> or <code class="text-xs">after</code>, or from the logic of the sentence, the Simple Past is often more natural.
          </p>
          <p class="pl-4">
            <strong>Natural:</strong> After he <span class="font-bold">finished</span> his degree, he <span class="font-bold">moved</span> to London.
            <br>
            <strong class="text-muted-foreground">(Correct but formal/heavy):</strong> After he <span class="font-bold">had finished</span> his degree, he <span class="font-bold">moved</span> to London.
          </p>
          <p>
            <strong class="text-green-600">Use for Clarity:</strong> The Past Perfect is essential when the chronological order is not obvious and needs to be clarified to avoid confusion.
          </p>
          <p class="pl-4">
            <strong>Ambiguous:</strong> The man who <span class="font-bold">called</span> earlier <span class="font-bold">came</span> back to the office. (Did he call from the office?)
            <br>
            <strong>Clear:</strong> The man who <span class="font-bold">had called</span> earlier <span class="font-bold">came</span> back to the office. (The call definitely happened before he came back).
          </p>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Unit 8: Practice Exercises</CardTitle>
          <CardDescription>Read the instructions for each question carefully. Your goal is to demonstrate a deep understanding of the tense.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-8">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <p class="font-semibold">{{ index + 1 }}. {{ question.instructions }}</p>
              <div class="rounded-md border p-4">
                <p class="text-sm text-muted-foreground">{{ question.context }}</p>
                <p class="my-2 italic">"{{ question.questionText }}"</p>
                
                <div v-if="question.type === 'fill-in'" class="mt-4 flex flex-wrap gap-4">
                  <div v-for="(_, i) in question.correctAnswer" :key="i" class="flex-grow">
                    <Label :for="`q${question.id}-input-${i}`" class="text-xs">Blank {{ i + 1 }}</Label>
                    <Input :id="`q${question.id}-input-${i}`" v-model="(question.userAnswer as string[])[i]" type="text" placeholder="verb form" class="w-full" />
                  </div>
                </div>

                <div v-if="question.type === 'combine'" class="mt-4">
                  <Label :for="`q${question.id}-input`">Your combined sentence:</Label>
                  <Input :id="`q${question.id}-input`" v-model="question.userAnswer" type="text" placeholder="Type the full sentence" />
                </div>

                <div v-if="question.type === 'mcq'" class="mt-4">
                  <RadioGroup v-model="question.userAnswer" class="space-y-2">
                    <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                      <RadioGroupItem :id="`q${question.id}-option-${option}`" :value="option" />
                      <Label :for="`q${question.id}-option-${option}`" class="font-normal">{{ option }}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <Button type="submit" class="w-full">Check My Answers</Button>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <template #result>
      <Card v-if="results">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>An analysis of your performance on the Past Perfect exercises.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between font-bold">
              <span>Overall Score</span>
              <span>{{ results.score }}%</span>
            </div>
            <Progress :model-value="results.score" />
            <p class="text-right text-sm text-muted-foreground">{{ results.correctCount }} / {{ results.totalCount }} Correct</p>
          </div>
          <Alert :variant="scoreMessage.variant">
            <component :is="results.score >= 50 ? CheckCircle2 : XCircle" class="h-4 w-4" />
            <AlertTitle>{{ scoreMessage.title }}</AlertTitle>
            <AlertDescription>{{ scoreMessage.description }}</AlertDescription>
          </Alert>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Feedback</h3>
            <div v-for="(item, index) in results.feedback" :key="item.id" class="rounded-lg border p-4">
              <div class="flex items-start gap-4">
                <component :is="item.isCorrect ? CheckCircle2 : XCircle" :class="['h-5 w-5 flex-shrink-0 mt-1', item.isCorrect ? 'text-green-500' : 'text-red-500']" />
                <div class="flex-grow">
                  <p class="font-semibold">Question {{ index + 1 }}</p>
                  <p class="mt-1 text-sm italic text-muted-foreground">"{{ item.questionText }}"</p>
                  
                  <div class="mt-3 space-y-2 rounded-md bg-muted/50 p-3 text-sm">
                    <div class="flex gap-2">
                      <p class="w-24 flex-shrink-0 font-medium">Your Answer:</p>
                      <p :class="[!item.isCorrect && 'text-red-600', 'font-mono']">{{ item.userAnswerDisplay || 'No answer' }}</p>
                    </div>
                    <div v-if="!item.isCorrect" class="flex gap-2">
                      <p class="w-24 flex-shrink-0 font-medium">Correct Answer:</p>
                      <p class="font-mono text-green-700">{{ item.correctAnswerDisplay }}</p>
                    </div>
                  </div>

                  <div class="mt-3 rounded-md border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
                    <p class="font-bold">Explanation:</p>
                    <p>{{ item.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" @click="showResult = false; window.scrollTo({top: 0, behavior: 'smooth'})">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
