<!--
  File: @/pages/units/grammar/39.vue
  Description: An advanced grammar practice page for Unit 39, focusing on complex comparative structures.
  This page integrates learning material, challenging exercises, and a detailed answer validator
  to provide a comprehensive learning experience, inspired by Raymond Murphy's "English Grammar in Use".
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, Lightbulb, Repeat } from 'lucide-vue-next'

import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

definePageMeta({
  // Assuming the layout is registered globally or in the `app.vue`
  // If not, you might need a local import and component registration.
  layout: false, // We are using the layout component directly
})

const router = useRouter()

// --- NAVIGATION ---
function goToPreviousUnit() {
  router.push("/units/grammar/38")
}
function goToNextUnit() {
  router.push("/units/grammar/40")
}

// --- STATE MANAGEMENT ---
const showResult = ref(false)

interface Question {
  id: number
  type: 'fill-in' | 'rewrite' | 'select-modifier'
  prompt: string
  sentence: string
  options?: string[]
  userAnswer: string
  correctAnswer: string | string[] // Can have multiple correct variants
  isCorrect?: boolean
  explanation: string
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'fill-in',
    prompt: "Complete the sentence using 'the ... the ...' structure with the words in brackets.",
    sentence: " (much I travelled),  (little I realised) I actually knew about the world.",
    userAnswer: '',
    correctAnswer: 'The more I travelled, the less I realised',
    explanation: "This sentence requires the 'the + comparative, the + comparative' structure to show a cause-and-effect relationship between two changing actions. 'Much' becomes 'the more' and 'little' becomes 'the less' to indicate that as the amount of travel increased, the perceived amount of knowledge decreased."
  },
  {
    id: 2,
    type: 'select-modifier',
    prompt: "Choose the most appropriate modifier. The context implies a very significant difference.",
    sentence: "The new quantum computer is ______ faster than any supercomputer that came before it.",
    options: ['a bit', 'slightly', 'far', 'a little'],
    userAnswer: '',
    correctAnswer: 'far',
    explanation: "While 'much' or 'a lot' could also fit, 'far' is the strongest and most idiomatic choice here to emphasize a vast, almost incomparable difference in speed, which is appropriate for a quantum computer breakthrough."
  },
  {
    id: 3,
    type: 'rewrite',
    prompt: "Rewrite the following sentence using 'no + comparative'.",
    sentence: "The quality of this new phone is exactly the same as the old one.",
    userAnswer: '',
    correctAnswer: "This new phone is no better than the old one.",
    explanation: "'No + comparative' (e.g., 'no better', 'no faster') is a powerful structure used to state that there is zero difference between two things. It's more emphatic than saying 'it isn't any better'."
  },
  {
    id: 4,
    type: 'fill-in',
    prompt: "Complete the sentence to show a continuous process of change.",
    sentence: "As the deadline approached, the team worked ______.",
    userAnswer: '',
    correctAnswer: 'harder and harder',
    explanation: "To describe a continuous increase in an action or quality, we use the 'comparative + and + comparative' structure. Here, 'hard' becomes 'harder and harder' to show the escalating effort."
  },
  {
    id: 5,
    type: 'fill-in',
    prompt: "Complete the question using 'any'.",
    sentence: "I've edited your essay. Does it flow ______ now?",
    userAnswer: '',
    correctAnswer: 'any better',
    explanation: "'Any' is used with comparatives in questions and negative sentences to ask about or deny the existence of a difference. 'Is it better?' is a general question, but 'Is it any better?' specifically asks if the editing has made a difference."
  },
  {
    id: 6,
    type: 'rewrite',
    prompt: "Rewrite the sentence using 'a bit' and a comparative.",
    sentence: "He feels slightly more optimistic today than he did yesterday.",
    userAnswer: '',
    correctAnswer: "He feels a bit more optimistic today.",
    explanation: "'A bit' and 'a little' are used before a comparative to indicate a small difference. They are often interchangeable with 'slightly', but are very common in spoken English."
  },
  {
    id: 7,
    type: 'fill-in',
    prompt: "Complete the second sentence so it means the same as the first, using 'the ... the ...'.",
    sentence: "If you study a subject in great depth, you will appreciate its complexities more. ______ you study, ______ you will appreciate its complexities.",
    userAnswer: '',
    correctAnswer: 'The more deeply you study, the more you will appreciate its complexities.',
    explanation: "This complex transformation requires turning the adverb 'deeply' into a comparative ('more deeply') to fit the structure. It links the depth of study directly to the level of appreciation."
  },
  {
    id: 8,
    type: 'select-modifier',
    prompt: "The two candidates were almost identical. Choose the best modifier.",
    sentence: "The final vote count was ______ closer than anyone had predicted.",
    options: ['far', 'a lot', 'considerably', 'even'],
    userAnswer: '',
    correctAnswer: 'even',
    explanation: "'Even' is used as a modifier to add an element of surprise. The prediction was for a close race, but the reality was 'even closer', which was unexpected. The other options imply a large difference, which contradicts the context."
  }
])

// --- COMPUTED PROPERTIES ---
const score = computed(() => {
  return questions.reduce((count, q) => count + (q.isCorrect ? 1 : 0), 0)
})

const scorePercentage = computed(() => {
  if (questions.length === 0) return 0
  return Math.round((score.value / questions.length) * 100)
})

// --- METHODS ---
function checkAnswers() {
  questions.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().replace(/\.$/, '')
    if (Array.isArray(q.correctAnswer)) {
      q.isCorrect = q.correctAnswer.some(ans => ans.toLowerCase() === userAnswerCleaned.toLowerCase())
    } else {
      q.isCorrect = userAnswerCleaned.toLowerCase() === q.correctAnswer.toLowerCase()
    }
  })
  showResult.value = true
  // Scroll to results
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetPractice() {
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = undefined
  })
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on Raymond Murphy's Bestseller"
    unit-title="Unit 39: Comparative 2 (much better / any better etc.)"
    unit-description="Mastering modifiers with comparatives and advanced comparative structures."
    :categories="['Comparatives', 'Adjectives', 'Adverbs', 'Sentence Structure', 'Modifiers']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-blue-600">Core Concepts: Modifying Comparatives</CardTitle>
          <CardDescription>Before a comparative adjective or adverb, you can use modifiers to express the degree of difference.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-bold text-md">1. Emphasizing a BIG difference:</h4>
            <p class="text-sm text-muted-foreground">Use <code class="bg-muted px-1 rounded">much</code>, <code class="bg-muted px-1 rounded">a lot</code>, or <code class="bg-muted px-1 rounded">far</code>.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>New York is <span class="font-semibold text-primary">much bigger</span> than Boston.</li>
              <li>His new film was <span class="font-semibold text-primary">far more interesting</span> than his last one.</li>
              <li>The journey took <span class="font-semibold text-primary">a lot longer</span> than we expected.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-md">2. Expressing a SMALL difference:</h4>
            <p class="text-sm text-muted-foreground">Use <code class="bg-muted px-1 rounded">a little</code> or <code class="bg-muted px-1 rounded">a bit</code> (more informal).</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>I'm feeling <span class="font-semibold text-primary">a bit better</span> today, thanks.</li>
              <li>The price was <span class="font-semibold text-primary">a little higher</span> than I wanted to pay.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-md">3. Using <code class="text-base">any</code> and <code class="text-base">no</code> with comparatives:</h4>
            <p class="text-sm text-muted-foreground"><code class="bg-muted px-1 rounded">any</code> is used in questions and negative statements. <code class="bg-muted px-1 rounded">no</code> is more emphatic.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Is your headache <span class="font-semibold text-primary">any better</span>?</li>
              <li>This hotel isn't <span class="font-semibold text-primary">any more expensive</span> than the other one.</li>
              <li>This hotel is <span class="font-semibold text-primary">no more expensive</span>. (It means the price difference is zero)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-blue-600">Advanced Comparative Structures</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-bold text-md">1. Continuous Change: <code class="text-base">...er and ...er</code></h4>
            <p class="text-sm text-muted-foreground">This structure shows something is continuously increasing or decreasing.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Since she started her new job, she has become <span class="font-semibold text-primary">busier and busier</span>.</li>
              <li>As the storm approached, the sky grew <span class="font-semibold text-primary">darker and darker</span>.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-md">2. Proportionality: <code class="text-base">The ..., the ...</code></h4>
            <p class="text-sm text-muted-foreground">This structure links two comparatives to show that as one thing changes, another changes in a related way.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><span class="font-semibold text-primary">The more</span> you practice, <span class="font-semibold text-primary">the better</span> you'll become.</li>
              <li><span class="font-semibold text-primary">The sooner</span> we leave, <span class="font-semibold text-primary">the earlier</span> we'll arrive.</li>
              <li><span class="font-semibold text-primary">The more complex</span> the problem, <span class="font-semibold text-primary">the more satisfying</span> the solution.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the following sentences. Pay close attention to the context provided.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id">
            <p class="font-semibold mb-2">{{ index + 1 }}. {{ q.prompt }}</p>
            <p class="italic text-muted-foreground mb-3 bg-slate-50 p-2 rounded border border-slate-200">"{{ q.sentence }}"</p>
            <div v-if="q.type === 'fill-in' || q.type === 'rewrite'">
              <Input
                v-model="q.userAnswer"
                placeholder="Your answer here..."
                class="w-full"
                :disabled="showResult"
              />
            </div>
            <div v-if="q.type === 'select-modifier'" class="flex flex-wrap gap-2">
              <Button
                v-for="option in q.options"
                :key="option"
                :variant="q.userAnswer === option ? 'default' : 'outline'"
                :disabled="showResult"
                @click="q.userAnswer = option"
              >
                {{ option }}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full" @click="checkAnswers">
            Check Answers & Get Feedback
          </Button>
          <Button v-else class="w-full" variant="secondary" @click="resetPractice">
            <Repeat class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>You scored {{ score }} out of {{ questions.length }} correct.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-base font-medium text-blue-700">Mastery</span>
              <span class="text-sm font-medium text-blue-700">{{ scorePercentage }}%</span>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>

          <div v-for="(q, index) in questions" :key="`result-${q.id}`">
            <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
              <div class="flex items-start">
                <div class="pr-3 pt-1">
                  <CheckCircle2 v-if="q.isCorrect" class="h-5 w-5 text-green-500" />
                  <XCircle v-else class="h-5 w-5 text-red-500" />
                </div>
                <div class="flex-1">
                  <AlertTitle>Question {{ index + 1 }} - {{ q.isCorrect ? 'Correct' : 'Needs Review' }}</AlertTitle>
                  <AlertDescription class="mt-2 space-y-2">
                    <p><strong class="text-foreground">Your answer:</strong> <span :class="q.isCorrect ? 'text-green-700' : 'text-red-700 line-through'">"{{ q.userAnswer || 'No answer provided' }}"</span></p>
                    <p><strong class="text-foreground">Correct answer:</strong> <span class="text-green-700 font-semibold">"{{ Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer }}"</span></p>
                    
                    <div v-if="!q.isCorrect" class="mt-3 flex items-start gap-3 rounded-lg border bg-muted/50 p-3">
                       <Lightbulb class="h-5 w-5 flex-shrink-0 text-yellow-500 mt-1" />
                       <div>
                         <h5 class="font-semibold text-foreground">Teacher's Note:</h5>
                         <p class="text-sm text-foreground/80">{{ q.explanation }}</p>
                       </div>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        </CardContent>
        <CardFooter>
           <Button class="w-full" variant="secondary" @click="resetPractice">
            <Repeat class="mr-2 h-4 w-4" />
            Practice Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
