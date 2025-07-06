<!--
  File: @/pages/units/grammar/9.vue
  Unit: 9 - Past Perfect Continuous (I had been doing)
  Description: An advanced-level practice page for the Past Perfect Continuous tense.
  This page combines theoretical explanations with challenging, context-based exercises
  and a detailed feedback system to ensure genuine learning and improvement.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are available from a library like shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BrainCircuit, BookOpen } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Navigation ---
const router = useRouter()
const currentUnit = 9

function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}

function goToNextUnit() {
  // Assuming there are more units to come
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Page State ---
const showResult = ref(false)

// --- Practice Questions Data ---
// These questions are designed to be challenging, requiring discrimination
// between similar tenses and understanding of context.
const questions = ref([
  {
    id: 1,
    type: 'fill-in',
    prompt: "The archaeologists were exhausted. They (dig) in the relentless desert sun for over twelve hours before they finally found the entrance to the tomb.",
    userAnswer: '',
    correctAnswer: 'had been digging',
    explanation: "The focus here is on the duration of the activity ('for over twelve hours') that was happening before another past event (finding the entrance). 'Had been digging' perfectly captures this continuous action leading up to a past point."
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: "When I walked into the office, the atmosphere was tense. My boss looked furious, and I soon found out that my colleagues ______ about the controversial new policy all morning.",
    options: ['argued', 'had argued', 'had been arguing'],
    userAnswer: '',
    correctAnswer: 'had been arguing',
    explanation: "The key phrase is 'all morning'. This emphasizes the duration of the argument. The tense atmosphere is the *result* of this long, continuous action. 'Had argued' (Past Perfect Simple) would imply the argument was completed, but 'had been arguing' better describes the ongoing nature of the event that caused the tension."
  },
  {
    id: 3,
    type: 'fill-in',
    prompt: "Before she published her breakthrough novel, the author (write) short stories for small, unknown magazines for nearly a decade, honing her craft in obscurity.",
    userAnswer: '',
    correctAnswer: 'had been writing',
    explanation: "This sentence highlights the long, preparatory period ('for nearly a decade') before a significant past achievement (publishing the novel). The Past Perfect Continuous is ideal for describing such background, ongoing activities."
  },
  {
    id: 4,
    type: 'tense-discrimination',
    prompt: "By the time the firefighters arrived, the flames had already consumed the roof. A witness said she saw smoke earlier and that the building ______ for at least thirty minutes.",
    options: ['was burning', 'had been burning', 'had burnt'],
    userAnswer: '',
    correctAnswer: 'had been burning',
    explanation: "'Was burning' (Past Continuous) describes an action in progress at a specific time, but 'had been burning' is better because it connects the duration ('for at least thirty minutes') to the later past event (the firefighters' arrival)."
  },
  {
    id: 5,
    type: 'fill-in',
    prompt: "His French was surprisingly fluent. It was clear he (not just / take) a few evening classes; he (live) in Paris for five years before moving to London.",
    userAnswer: '',
    // This requires two answers, making it more complex. We'll check for both parts.
    correctAnswer: 'had not just been taking / had been living',
    explanation: "This is a complex sentence requiring two instances of the tense. The first part negates a casual action, and the second provides the real reason—a long, continuous period of immersion ('living in Paris for five years') that happened before he moved to London."
  }
])

// --- Validation & Results Logic ---
const validationResults = ref<Array<{
  id: number
  isCorrect: boolean
  prompt: string
  userAnswer: string
  correctAnswer: string
  explanation: string
}>>([])

const score = computed(() => {
  if (!validationResults.value.length) return 0
  const correctCount = validationResults.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  const s = score.value
  if (s === 100) return { message: "Perfect Score! Masterful.", variant: "success" }
  if (s >= 80) return { message: "Excellent! You have a strong command of this tense.", variant: "info" }
  if (s >= 60) return { message: "Good effort. Review the explanations to solidify your understanding.", variant: "warning" }
  return { message: "Needs more practice. Don't worry, every master was once a beginner. Review the theory and try again.", variant: "destructive" }
})

function checkAnswers() {
  const results = questions.value.map(q => {
    // Normalize answers for comparison: lowercase and trim whitespace.
    // For Q5, we need a special check.
    let isCorrect = false;
    const normalizedUserAnswer = q.userAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    const normalizedCorrectAnswer = q.correctAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    
    if (q.id === 5) {
      // Split and check both parts for the complex answer
      const userParts = normalizedUserAnswer.split('/');
      const correctParts = normalizedCorrectAnswer.split('/');
      if(userParts.length === 2 && userParts[0].trim() === correctParts[0].trim() && userParts[1].trim() === correctParts[1].trim()) {
        isCorrect = true;
      }
    } else {
      isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    }

    return {
      id: q.id,
      isCorrect,
      prompt: q.prompt,
      userAnswer: q.userAnswer || 'No answer provided',
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }
  })
  validationResults.value = results
  showResult.value = true
  // Scroll to results
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function retryQuiz() {
  showResult.value = false
  validationResults.value = []
  questions.value.forEach(q => q.userAnswer = '')
  // Scroll to top of practice
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="Based on the methodology of Raymond Murphy"
    unit-title="Unit 9: Past Perfect Continuous"
    unit-description="I had been doing"
    :categories="['Tenses', 'Past Tenses', 'Advanced']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: The Teaching Section                                         -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Concept: The Long View of the Past</CardTitle>
            <CardDescription>Understanding the 'why' behind the tense.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            Think of the Past Perfect Continuous as a <strong class="text-primary">"background story"</strong> tense. It doesn't just state a past fact; it describes an activity that was in progress <strong class="text-primary">for a period of time</strong> leading up to another event in the past.
          </p>
          <p>Its primary job is to emphasize the <strong class="font-semibold">duration</strong> of an action and provide context or an explanation for a past situation.</p>
          <div class="rounded-md border border-l-4 border-blue-500 bg-muted p-3">
            <p class="font-mono text-xs md:text-sm">Structure: <span class="font-bold">had been + verb-ing</span></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Situational Usage & Examples</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <h4 class="font-semibold text-gray-800 dark:text-gray-200">1. Explaining a Past Situation</h4>
            <p class="text-muted-foreground">The past perfect continuous often answers the invisible question "Why?".</p>
            <p class="mt-2 rounded-md border p-3">
              <span class="font-semibold">Situation:</span> The kitchen was a mess when I got home.
              <br />
              <span class="font-semibold text-primary">Explanation:</span> My flatmates <strong class="font-bold">had been trying</strong> to cook a complicated seven-course meal.
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-gray-800 dark:text-gray-200">2. Emphasizing Duration Before a Past Event</h4>
            <p class="text-muted-foreground">Look for duration markers like 'for ten years', 'all day', 'since 2010'.</p>
            <p class="mt-2 rounded-md border p-3">
              <span class="font-semibold">Past Event:</span> He finally passed his driving test in 2023.
              <br />
              <span class="font-semibold text-primary">Background:</span> He <strong class="font-bold">had been taking</strong> lessons on and off for six years.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card class="border-amber-500/50 bg-amber-50/20 dark:bg-amber-900/10">
        <CardHeader class="flex flex-row items-center gap-4">
          <BrainCircuit class="h-8 w-8 text-amber-600" />
          <div>
            <CardTitle>Crucial Distinction: vs. Past Perfect Simple</CardTitle>
            <CardDescription>This is where true understanding is tested.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p class="font-bold text-primary">Past Perfect Continuous (Duration)</p>
              <p>Focuses on the <strong class="font-semibold">activity itself</strong>. It may or may not have been completed.</p>
              <p class="mt-2 rounded-md border p-3 text-xs">When the CEO resigned, he <strong class="font-bold">had been working</strong> on a secret merger plan. (We are focused on the work, not its completion).</p>
            </div>
            <div>
              <p class="font-bold text-indigo-500">Past Perfect Simple (Completion)</p>
              <p>Focuses on the <strong class="font-semibold">result or completion</strong> of an action before another past event.</p>
              <p class="mt-2 rounded-md border p-3 text-xs">By the time the news broke, the CEO <strong class="font-bold">had already prepared</strong> his resignation letter. (The action of preparing was finished).</p>
            </div>
          </div>
           <Alert variant="default" class="mt-4">
            <AlertTitle class="font-semibold">Stative Verb Warning!</AlertTitle>
            <AlertDescription>
              Verbs describing states, not actions (e.g., know, believe, own, seem, love), are generally NOT used in continuous tenses. Use the Past Perfect Simple instead.
              <br/>
              <span class="text-red-500">Incorrect:</span> <del>I had been knowing him for years.</del>
              <br/>
              <span class="text-green-500">Correct:</span> I <strong class="font-semibold">had known</strong> him for years.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Exercise Section                             -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Read each scenario carefully. Type the correct form of the verb in parentheses.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <form @submit.prevent="checkAnswers">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
              <p class="font-semibold">
                {{ index + 1 }}. {{ q.prompt.split('(')[0] }}
                <template v-if="q.type === 'fill-in'">
                   (<span class="italic text-primary">{{ q.prompt.match(/\((.*?)\)/)![1] }}</span>)
                  {{ q.prompt.split(')')[1] }}
                </template>
              </p>
              
              <!-- Fill in the blank -->
              <div v-if="q.type === 'fill-in'">
                <Label :for="`q${q.id}`" class="sr-only">Your Answer</Label>
                <Input
                  :id="`q${q.id}`"
                  v-model="q.userAnswer"
                  type="text"
                  placeholder="Type your answer here..."
                  class="text-base"
                />
                 <p v-if="q.id === 5" class="text-xs text-muted-foreground mt-1">For this question, separate the two verb phrases with a slash (e.g., verb one / verb two).</p>
              </div>

              <!-- Multiple Choice / Discrimination -->
              <div v-if="q.type === 'multiple-choice' || q.type === 'tense-discrimination'">
                 <RadioGroup v-model="q.userAnswer" class="gap-2">
                    <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                       <RadioGroupItem :id="`q${q.id}-${option}`" :value="option" />
                       <Label :for="`q${q.id}-${option}`" class="font-normal">{{ option }}</Label>
                    </div>
                 </RadioGroup>
              </div>
            </div>
            
            <Button v-if="!showResult" type="submit" class="mt-8 w-full">
              Check Answers
            </Button>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The Validation and Feedback Section                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section" class="border-2 border-primary/50">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review the feedback below to master the Past Perfect Continuous.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="space-y-2 rounded-lg border bg-muted p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">Overall Score: {{ score }}%</h3>
              <Alert :variant="scoreFeedback.variant" class="w-auto p-2 text-sm">
                {{ scoreFeedback.message }}
              </Alert>
            </div>
            <Progress :model-value="score" />
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-6">
            <div
              v-for="result in validationResults"
              :key="result.id"
              class="rounded-md border p-4"
              :class="result.isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'"
            >
              <div class="flex items-start gap-4">
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="mt-1 h-5 w-5 flex-shrink-0" :class="result.isCorrect ? 'text-green-600' : 'text-red-600'" />
                <div class="flex-1">
                  <p class="font-semibold">{{ questions.find(q=>q.id === result.id)?.prompt }}</p>
                  <div class="mt-2 space-y-2 text-sm">
                    <p>
                      <span class="font-semibold">Your answer:</span>
                      <span :class="!result.isCorrect && 'text-red-700 dark:text-red-400'">"{{ result.userAnswer }}"</span>
                    </p>
                    <p v-if="!result.isCorrect">
                      <span class="font-semibold">Correct answer:</span>
                      <span class="font-bold text-green-700 dark:text-green-400">"{{ result.correctAnswer }}"</span>
                    </p>
                  </div>
                  <Alert variant="default" class="mt-3">
                    <BrainCircuit class="h-4 w-4" />
                    <AlertTitle class="font-bold">Explanation</AlertTitle>
                    <AlertDescription>
                      {{ result.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
          
          <Button @click="retryQuiz" variant="outline" class="w-full">
            Retry Quiz
          </Button>

        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
