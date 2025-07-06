<!--
  File: @/pages/units/grammar/14.vue
  Unit: 14 - Possessive Case: -'s (your sister's name) vs. of ... (the name of the book)
  Description: An advanced grammar practice page focusing on the correct application of possessive forms in English.
  This page integrates learning materials and challenging exercises with a detailed feedback system.
-->
<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="An interactive exercise series based on the world's best-selling grammar book by Raymond Murphy."
    unit-title="Unit 14: The Possessive: -'s and of..."
    unit-description="Mastering when to use the apostrophe 's' for possession versus the 'of' phrase is crucial for natural-sounding English. This unit tackles the core rules and, more importantly, the common exceptions and complex cases."
    :categories="['Nouns', 'Possessives', 'Structure']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- Learning Material Slot -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principle: Animate vs. Inanimate</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm text-muted-foreground">
          <p>The fundamental rule, as taught by most grammarians, distinguishes between living/animate entities and non-living/inanimate objects.</p>
          <ul class="list-disc space-y-2 pl-6">
            <li>
              Use <strong>-'s</strong> (or <strong>-s'</strong> for plurals) primarily for <strong>people and animals</strong>.
              <br>
              <code class="block rounded bg-muted p-2 mt-1">My <strong>brother's</strong> job is very demanding.</code>
              <code class="block rounded bg-muted p-2 mt-1">What is the <strong>cat's</strong> name?</code>
            </li>
            <li>
              Use <strong>of the...</strong> for <strong>inanimate things, objects, and abstract ideas</strong>.
              <br>
              <code class="block rounded bg-muted p-2 mt-1">We couldn't open the <strong>door of the car</strong>. (More natural than 'the car's door')</code>
              <code class="block rounded bg-muted p-2 mt-1">What is the <strong>cause of the problem</strong>?</code>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Critical Exceptions & Advanced Usage</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm text-muted-foreground">
          <p>True mastery comes from understanding the exceptions where <strong>-'s</strong> is preferred even for things:</p>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold">1. Organizations & Groups of People</h4>
              <p>Treat companies, governments, and teams as collective entities that can 'possess' things.</p>
              <code class="block rounded bg-muted p-2 mt-1">The <strong>company's</strong> success is due to its employees.</code>
              <code class="block rounded bg-muted p-2 mt-1">What is the <strong>government's</strong> latest decision?</code>
            </div>
            <div>
              <h4 class="font-semibold">2. Places & Locations</h4>
              <p>Cities, countries, and regions can also take the <strong>-'s</strong> form.</p>
              <code class="block rounded bg-muted p-2 mt-1"><strong>London's</strong> population is over 8 million.</code>
              <code class="block rounded bg-muted p-2 mt-1"><strong>France's</strong> largest city is Paris.</code>
            </div>
            <div>
              <h4 class="font-semibold">3. Time Expressions</h4>
              <p>This is a very common and important exception.</p>
              <code class="block rounded bg-muted p-2 mt-1">I need at least a <strong>week's</strong> notice.</code>
              <code class="block rounded bg-muted p-2 mt-1">Did you read <strong>today's</strong> newspaper?</code>
            </div>
            <div>
              <h4 class="font-semibold">4. Plural Nouns (s')</h4>
              <p>For plural nouns ending in -s, add only an apostrophe ('). For irregular plurals, add 's.</p>
              <code class="block rounded bg-muted p-2 mt-1">My <strong>parents'</strong> house is nearby. (two parents)</code>
              <code class="block rounded bg-muted p-2 mt-1">The <strong>children's</strong> toys were everywhere. (irregular plural)</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- Practice Questions Slot -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Choose the most natural-sounding and grammatically correct form.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium">
              {{ index + 1 }}. {{ question.prompt }}
            </p>
            <div v-if="question.type === 'rewrite'" class="flex items-center gap-2">
              <span class="text-muted-foreground text-sm">Rewrite:</span>
              <Input
                v-model="question.userAnswer"
                :disabled="isSubmitted"
                class="flex-grow"
                placeholder="Your answer..."
              />
            </div>
            <div v-if="question.type === 'choice'" class="space-y-2">
              <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div class="flex justify-end pt-4">
            <Button v-if="!isSubmitted" @click="validateAnswers">
              Check Answers & Get Feedback
            </Button>
            <Button v-else variant="secondary" @click="resetQuiz">
              <RotateCcw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- Results and Explanations Slot -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback & Results</CardTitle>
          <CardDescription>
            Your score is <strong>{{ score }} out of {{ questions.length }}</strong>. Review the detailed explanations below to master the concepts.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div
            v-for="(question, index) in questions"
            :key="`result-${question.id}`"
            class="rounded-lg border p-4 transition-colors"
            :class="[question.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20']"
          >
            <p class="font-semibold">
              {{ index + 1 }}. {{ question.prompt }}
            </p>
            <div class="mt-2 flex items-center gap-x-3">
              <span class="text-2xl">
                {{ question.isCorrect ? '✅' : '❌' }}
              </span>
              <div>
                <p class="text-sm">Your answer: <code class="font-mono">{{ question.userAnswer || 'No answer' }}</code></p>
                <p v-if="!question.isCorrect" class="text-sm">
                  Correct answer(s): <code class="font-mono">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' or ') : question.correctAnswer }}</code>
                </p>
              </div>
            </div>
            <Separator class="my-3" />
            <div>
              <h4 class="font-semibold text-sm">Explanation:</h4>
              <p class="text-sm text-muted-foreground" v-html="question.explanation" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
           <Button class="w-full" @click="goToNextUnit">
              Excellent! Proceed to Unit 15
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, RotateCcw } from 'lucide-vue-next'

// --- Component Imports (assuming they are auto-imported or globally registered by a UI library like shadcn-vue) ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

// --- Nuxt 3 Reactivity and Routing ---
const router = useRouter()
const isSubmitted = ref(false)

interface Question {
  id: number
  type: 'rewrite' | 'choice'
  prompt: string
  options?: string[]
  userAnswer: string
  correctAnswer: string | string[]
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'choice',
    prompt: "I found a wallet on the street. I'm going to take it to the police station in case _______ wants to claim it.",
    options: ["the owner of it", "its owner"],
    userAnswer: '',
    correctAnswer: "its owner",
    explanation: "While 'the owner of it' is grammatically possible, 'its owner' is far more natural and concise. 'It's' is a contraction for 'it is', whereas 'its' is the possessive pronoun, which is correct here.",
  },
  {
    id: 2,
    type: 'rewrite',
    prompt: "I have to go to the dentist. What is (the address of your dentist)?",
    userAnswer: '',
    correctAnswer: "your dentist's address",
    explanation: "For people (your dentist), the <strong>-'s</strong> form is the standard and most natural way to show possession.",
  },
  {
    id: 3,
    type: 'rewrite',
    prompt: "The meeting for tomorrow has been cancelled. Rewrite: (The meeting of tomorrow)",
    userAnswer: '',
    correctAnswer: "Tomorrow's meeting",
    explanation: "This tests a key exception. For <strong>time expressions</strong> (like 'tomorrow', 'yesterday', 'next week'), we use the <strong>-'s</strong> possessive form, not 'of'.",
  },
  {
    id: 4,
    type: 'choice',
    prompt: "The film was incredibly boring. I nearly fell asleep during _______.",
    options: ["the beginning of it", "its beginning"],
    userAnswer: '',
    correctAnswer: "the beginning of it",
    explanation: "For abstract concepts or parts of things (like 'the beginning' of a film), the <strong>'of...'</strong> structure is strongly preferred. 'Its beginning' sounds unnatural in this context.",
  },
  {
    id: 5,
    type: 'rewrite',
    prompt: "My parents own that car. That is (the car of my parents).",
    userAnswer: '',
    correctAnswer: "my parents' car",
    explanation: "This question tests the possessive for a <strong>plural noun ending in -s</strong> ('parents'). In this case, you only add an apostrophe (') after the 's', not another 's'.",
  },
  {
    id: 6,
    type: 'choice',
    prompt: "The decision made by the company was unpopular. We can also say:",
    options: ["The decision of the company", "The company's decision"],
    userAnswer: '',
    correctAnswer: "The company's decision",
    explanation: "This is another critical exception. For organizations and groups of people (like 'the company'), we use the <strong>-'s</strong> form, treating the group as a single entity.",
  },
  {
    id: 7,
    type: 'rewrite',
    prompt: "The views from the top of that mountain are incredible. Rewrite: (The views of the top of the mountain)",
    userAnswer: '',
    correctAnswer: "The mountain top's views",
    explanation: "This is a tricky case. While 'the views from the top of the mountain' is perfectly fine, if we are to use a possessive, <strong>'the mountain top's views'</strong> is the more concise and common structure. Note how 'mountain top' acts as a single compound noun.",
  },
  {
    id: 8,
    type: 'choice',
    prompt: "I admire the work of Shakespeare. This is a more formal way of saying:",
    options: ["Shakespeare's work", "The work of Shakespeare's"],
    userAnswer: '',
    correctAnswer: "Shakespeare's work",
    explanation: "'Shakespeare's work' is the standard possessive for a person. The phrase 'the work of Shakespeare' is also correct and often used in a more formal or academic context to emphasize the body of work itself. The second option is grammatically incorrect.",
  }
])

// --- Core Logic Functions ---
const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
}

function validateAnswers() {
  questions.value.forEach(q => {
    const user = normalizeAnswer(q.userAnswer)
    if (Array.isArray(q.correctAnswer)) {
      q.isCorrect = q.correctAnswer.some(ans => normalizeAnswer(ans) === user)
    } else {
      q.isCorrect = normalizeAnswer(q.correctAnswer) === user
    }
  })
  isSubmitted.value = true
  // In a real app, you might want to scroll to the results.
  // document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
  isSubmitted.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = undefined
  })
}

// --- Navigation Functions ---
function goToPreviousUnit() {
  router.push("/units/grammar/13")
}

function goToNextUnit() {
  router.push("/units/grammar/15")
}
</script>

<style scoped>
/* Optional: Add a fade transition for the results appearing */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
