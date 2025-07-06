
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI & Icon Imports for Practice & Results
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, Award } from 'lucide-vue-next'

definePageMeta({
  // This page will not use the GrammarLayout component directly,
  // but we define it so Nuxt knows about the intended structure.
  // The layout is applied in the <template> section.
  layout: false, 
})

useHead({
  title: 'Unit 44: Passive 3 | Advanced Grammar Practice',
  meta: [
    { name: 'description', content: 'Practice advanced passive structures like "It is said that..." and "(be) supposed to..." based on Raymond Murphy\'s English Grammar in Use.' }
  ],
})

const router = useRouter()
const currentUnit = 44

function goToPreviousUnit() {
  router.push(`/units/grammar/${currentUnit - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- State Management ---
const isSubmitted = ref(false)

interface Question {
  id: number
  type: 'rewrite' | 'fill-in' | 'context-choice'
  prompt: string
  context?: string
  startWith?: string
  options?: string[]
  userAnswer: string
  correctAnswers: string[]
  explanation: string
  isCorrect?: boolean
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'rewrite',
    prompt: 'People know that Japan produces a wide range of high-quality electronics.',
    startWith: 'Japan is known...',
    userAnswer: '',
    correctAnswers: ['japan is known to produce a wide range of high-quality electronics.'],
    explanation: 'The structure "is known to + infinitive" is the correct passive form for reporting a general fact. The active sentence "People know that Japan produces..." becomes "Japan is known to produce..." in the passive voice.'
  },
  {
    id: 2,
    type: 'fill-in',
    prompt: 'The meeting ______ at 10 AM, but the director is running late. We\'ll have to wait.',
    context: 'Use a form of "be supposed to" to indicate a planned event that is not happening as expected.',
    userAnswer: '',
    correctAnswers: ['was supposed to start', 'was supposed to begin'],
    explanation: 'We use "was supposed to + infinitive" to talk about something that was planned or scheduled in the past but didn\'t happen as intended. Since the meeting hasn\'t started yet, this form is perfect.'
  },
  {
    id: 3,
    type: 'rewrite',
    prompt: 'It is alleged that the politician accepted bribes from several corporations.',
    startWith: 'The politician...',
    userAnswer: '',
    correctAnswers: ['the politician is alleged to have accepted bribes from several corporations.'],
    explanation: 'When the reported action (accepting bribes) happened before the reporting (is alleged), we use "to have + past participle". This is called a perfect infinitive and is crucial for correct tense sequence.'
  },
  {
    id: 4,
    type: 'context-choice',
    prompt: 'A new sci-fi movie is out. You haven\'t seen it, but you\'ve heard many positive reviews. How would you most naturally express this?',
    options: [
      'The movie is great.',
      'The movie is supposed to be great.',
      'The movie must be great.'
    ],
    userAnswer: '',
    correctAnswers: ['the movie is supposed to be great.'],
    explanation: 'One of the primary uses of "is supposed to be" is to report a popular opinion or reputation. It conveys that you are reporting what others say, not stating your own direct experience.'
  },
  {
    id: 5,
    type: 'fill-in',
    prompt: 'This medicine ______ with food. The instructions are very clear on the bottle.',
    context: 'Use a form of "be supposed to" to indicate a rule or instruction.',
    userAnswer: '',
    correctAnswers: ['is supposed to be taken'],
    explanation: 'Here, "is supposed to" indicates a rule or the correct way of doing something. A passive infinitive ("be taken") is necessary because the medicine is the object of the action.'
  },
  {
    id: 6,
    type: 'rewrite',
    prompt: 'They thought that the ancient king had been buried with his treasures.',
    startWith: 'The ancient king...',
    userAnswer: '',
    correctAnswers: ['the ancient king was thought to have been buried with his treasures.'],
    explanation: 'This is a complex transformation. The reporting verb "thought" is in the past, so we use "was thought". The reported action "had been buried" is also in the past, requiring the perfect passive infinitive "to have been buried".'
  }
])

// --- Computed Properties for Validation & Scoring ---
const score = computed(() => questions.filter(q => q.isCorrect).length)
const totalQuestions = computed(() => questions.length)
const progress = computed(() => (score.value / totalQuestions.value) * 100)

const resultAlert = computed(() => {
  const percentage = progress.value
  if (percentage === 100) return {
    variant: 'default',
    title: 'Flawless Victory!',
    icon: Award,
    message: 'Exceptional work! You have a profound understanding of these advanced passive structures. Keep up the brilliant effort.'
  }
  if (percentage >= 70) return {
    variant: 'default',
    title: 'Excellent Performance!',
    icon: CheckCircle2,
    message: 'Great job! You have a strong grasp of the concepts. Review the explanations for any missed questions to perfect your knowledge.'
  }
  if (percentage >= 40) return {
    variant: 'destructive',
    title: 'Good Effort, More Practice Needed',
    icon: Lightbulb,
    message: 'You\'re on the right track, but there are some key areas to review. Carefully read the explanations to understand the logic.'
  }
  return {
    variant: 'destructive',
    title: 'Let\'s Review and Try Again',
    icon: RotateCcw,
    message: 'These are tricky concepts. Don\'t be discouraged. The detailed review below is your key to mastery. Go through it carefully.'
  }
})

// --- Methods ---
function validateAnswers() {
  questions.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\.$/, '')
    const correctAnswersCleaned = q.correctAnswers.map(ans => ans.trim().toLowerCase().replace(/\.$/, ''))
    q.isCorrect = correctAnswersCleaned.includes(userAnswerCleaned)
  })
  isSubmitted.value = true
  // Scroll to results
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  isSubmitted.value = false
  questions.forEach(q => {
    q.userAnswer = ''
    delete q.isCorrect
  })
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced Grammar Practice"
    test-description="Based on 'English Grammar In Use' by Raymond Murphy"
    unit-title="Unit 44: Passive 3"
    unit-description="Reporting with passive verbs: 'It is said that...', 'He is said to be...', '(be) supposed to...'"
    :categories="['Passive Voice', 'Reporting Verbs', 'Advanced Structures', 'Formal English']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Structure 1: `It is said that...` / `He is said to be...`</CardTitle>
          <CardDescription>
            Used to report opinions, beliefs, or rumors without citing a specific source. It creates a more formal and objective tone than 'People say...'.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-md mb-2">Basic Transformation</h4>
            <p class="text-sm text-muted-foreground">Active: People believe he is a genius.</p>
            <p class="text-sm">Passive A: <strong class="text-primary">It is believed that</strong> he is a genius.</p>
            <p class="text-sm">Passive B: <strong class="text-primary">He is believed to be</strong> a genius.</p>
          </div>
          <div>
            <h4 class="font-semibold text-md mb-2">With Past Tenses & Perfect Infinitives</h4>
            <p class="text-sm text-muted-foreground">When the reported action happened before the reporting time, use `to have + past participle`.</p>
            <p class="text-sm text-muted-foreground">Active: Historians think they <span class="underline">built</span> the monument centuries ago.</p>
            <p class="text-sm">Passive A: <strong class="text-primary">It is thought that</strong> they built the monument centuries ago.</p>
            <p class="text-sm">Passive B: <strong class="text-primary">They are thought to have built</strong> the monument centuries ago.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Structure 2: `(be) supposed to...`</CardTitle>
          <CardDescription>
            This versatile structure has two main meanings, both common in spoken and written English.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-md mb-2">Meaning A: Expectation, Plan, or Duty</h4>
            <p class="text-sm text-muted-foreground">It often implies that the expectation was not met.</p>
            <p class="text-sm">Example: "The flight <strong class="text-primary">was supposed to depart</strong> at 9 PM, but it was delayed." (It was planned, but it didn't happen on time.)</p>
            <p class="text-sm">Example: "You <strong class="text-primary">are not supposed to park</strong> here; it's a restricted area." (It's against the rules.)</p>
          </div>
          <div>
            <h4 class="font-semibold text-md mb-2">Meaning B: General Belief or Reputation</h4>
            <p class="text-sm text-muted-foreground">This is a less formal synonym for `It is said that...`.</p>
            <p class="text-sm">Example: "I've never tried that restaurant, but it<strong class="text-primary">'s supposed to be</strong> excellent." (People say it's excellent.)</p>
            <p class="text-sm">Example: "This new processor <strong class="text-primary">is supposed to be</strong> 50% faster than the previous one." (That's the claim or reputation.)</p>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the following tasks. Pay close attention to tenses and sentence structure.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="font-semibold mb-2">{{ index + 1 }}. {{ question.prompt }}</p>
            <p v-if="question.context" class="text-sm text-muted-foreground italic mb-2">{{ question.context }}</p>

            <div v-if="question.type === 'rewrite'">
              <p class="mb-2 bg-muted p-2 rounded-md font-mono text-sm">{{ question.startWith }}</p>
              <Input
                v-model="question.userAnswer"
                :placeholder="question.startWith + '...'"
                :disabled="isSubmitted"
              />
            </div>

            <div v-else-if="question.type === 'fill-in'">
              <Input
                v-model="question.userAnswer"
                placeholder="Type your answer here"
                :disabled="isSubmitted"
              />
            </div>
            
            <div v-else-if="question.type === 'context-choice'" class="space-y-2">
              <div v-for="option in question.options" :key="option">
                <label class="flex items-center gap-3 p-3 border rounded-md has-[:checked]:bg-muted has-[:checked]:border-primary transition-all">
                  <input type="radio" :name="`q${question.id}`" :value="option" v-model="question.userAnswer" :disabled="isSubmitted" class="accent-primary" />
                  <span>{{ option }}</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="isSubmitted" class="w-full">
            Check My Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here's a detailed breakdown of your performance.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <Alert :variant="resultAlert.variant" class="border-2">
            <component :is="resultAlert.icon" class="h-5 w-5" />
            <AlertTitle>{{ resultAlert.title }}</AlertTitle>
            <AlertDescription>{{ resultAlert.message }}</AlertDescription>
          </Alert>
          
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <p class="text-sm font-medium">Overall Score</p>
              <p class="text-lg font-bold">{{ score }} / {{ totalQuestions }}</p>
            </div>
            <Progress :model-value="progress" />
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Detailed Review</h3>
            <Accordion type="single" collapsible class="w-full">
              <AccordionItem v-for="(question, index) in questions" :key="`result-${question.id}`" :value="`item-${index}`">
                <AccordionTrigger class="text-left hover:no-underline">
                  <div class="flex items-start gap-3 w-full">
                    <template v-if="question.isCorrect">
                       <CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    </template>
                    <template v-else>
                      <XCircle class="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                    </template>
                    <div class="flex-1">
                      <p class="font-semibold">Question {{ index + 1 }}</p>
                      <p class="text-sm text-muted-foreground mt-1">Your answer: <span :class="question.isCorrect ? 'text-green-700' : 'text-red-700'" class="font-medium">"{{ question.userAnswer || 'No answer' }}"</span></p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div class="px-4 py-3 bg-muted/50 rounded-lg space-y-3">
                    <p class="text-sm font-medium">
                      <strong class="text-green-700">Correct Answer(s):</strong> "{{ question.correctAnswers.join('" or "') }}"
                    </p>
                    <div class="flex items-start gap-3 text-sm">
                      <Lightbulb class="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <strong class="text-blue-700">Explanation:</strong>
                        <p class="mt-1">{{ question.explanation }}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="resetTest" variant="outline" class="w-full">
            <RotateCcw class="mr-2 h-4 w-4"/>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
