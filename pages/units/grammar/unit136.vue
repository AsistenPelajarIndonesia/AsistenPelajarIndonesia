<!--
  File: @/pages/units/grammar/29.vue
  Unit: Phrasal Verbs 1: Introduction (Unit 29)
  Description: An advanced, interactive grammar practice page for English students.
  This page combines pedagogical theory with challenging exercises and detailed feedback.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports (Assuming a shadcn-vue setup) ---
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CheckCircle2, XCircle, AlertTriangle, BookOpen } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageMeta = {
  testTitle: 'English Grammar In Use: Advanced Practice',
  testDescription: 'Interactive exercises based on the Raymond Murphy series.',
  unitTitle: 'Unit 29: Phrasal Verbs 1 - Introduction',
  unitDescription: 'Understanding the structure and meaning of verb + particle combinations.',
  categories: ['Verbs', 'Phrasal Verbs', 'Vocabulary', 'Intermediate']
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Assuming unit numbers are sequential in the routing
  router.push("/units/grammar/28")
}
function goToNextUnit() {
  router.push("/units/grammar/30")
}

// --- Exercise State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<string, string>>({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
  q6: '',
  q7: '',
})

// --- Questions & Answers Data Structure ---
// Questions are designed to test core concepts: separability, pronoun placement, and idiomatic meaning.
const questions = ref([
  {
    id: 'q1',
    type: 'multiple-choice',
    question: 'The noise was deafening, so I asked him to ___________.',
    options: ['turn it down', 'turn down it', 'it turn down', 'down turn it'],
    correctAnswer: 'turn it down',
    explanation: "This tests the crucial rule of separable phrasal verbs with pronoun objects. When the object is a pronoun (he, she, it, them, etc.), it MUST go between the verb and the particle. 'Turn down the music' is correct, but with 'it', only 'turn it down' is grammatically sound."
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    question: "I don't know the meaning of this word. I'll have to ___________ in the dictionary.",
    options: ['look it up', 'look for it', 'look it after', 'look up it'],
    correctAnswer: 'look it up',
    explanation: "'To look up' a word means to find its meaning in a reference book. It's a separable phrasal verb, so the pronoun 'it' must be placed in the middle. 'Look for it' implies searching for a lost physical object, which doesn't fit the context of a word's meaning."
  },
  {
    id: 'q3',
    type: 'sentence-transformation',
    prompt: "Rewrite the following sentence using the pronoun 'them': 'Could you please fill in these forms?'",
    question: 'Could you please _______________?',
    correctAnswer: 'fill them in',
    explanation: "Similar to Q1, 'fill in' is a separable phrasal verb. The object 'these forms' can be replaced by the pronoun 'them'. When this happens, 'them' must be positioned between the verb 'fill' and the particle 'in'. The structure 'fill in them' is incorrect."
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    question: "My car ___________ on the motorway this morning, and I was late for work.",
    options: ['broke down', 'broke up', 'broke in', 'broke out'],
    correctAnswer: 'broke down',
    explanation: "This question tests idiomatic meaning. 'To break down' means for a machine or vehicle to stop functioning. The other options have different meanings: 'break up' (end a relationship), 'break in' (enter a building by force), 'break out' (escape)."
  },
  {
    id: 'q5',
    type: 'sentence-transformation',
    prompt: "Rewrite the following sentence using the pronoun 'her'. Is it possible? 'I ran into my old teacher at the supermarket.'",
    question: 'I ________________ at the supermarket.',
    correctAnswer: 'ran into her',
    explanation: "This is a trick question to test inseparable phrasal verbs. 'To run into someone' (meaning to meet by chance) is INSEPARABLE. The object, whether it's a noun or a pronoun, must always come after the complete phrasal verb. You cannot say 'I ran her into'."
  },
  {
    id: 'q6',
    type: 'error-correction',
    question: "Identify and correct the error in the sentence: 'She promised to look after my cat, so I'm not worried about leave him.'",
    correctAnswer: "leave him -> leaving him",
    explanation: "The primary error here is a gerund vs. infinitive structure, a common adjacent mistake. The preposition 'about' must be followed by a gerund (-ing form), not a base verb. The phrasal verb 'look after' is used correctly as an inseparable verb."
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    question: "What time does your plane ___________?",
    options: ['take off', 'take on', 'take up', 'take out'],
    correctAnswer: 'take off',
    explanation: "'To take off' is an intransitive phrasal verb meaning for an aircraft to leave the ground and begin to fly. It doesn't take a direct object in this context. The other phrasal verbs are transitive and have different meanings: 'take on' (accept a challenge), 'take up' (start a hobby), 'take out' (remove something)."
  },
])

// --- Results Calculation & Display ---
const handleSubmit = () => {
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    const userAnswer = userAnswers.value[question.id]?.trim().toLowerCase()
    const correctAnswer = question.correctAnswer.toLowerCase()
    return userAnswer === correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

const getAnswerStatus = (questionId: string) => {
  const question = questions.value.find(q => q.id === questionId)
  if (!question) return 'incorrect'
  return userAnswers.value[questionId]?.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? 'correct' : 'incorrect'
}
</script>

<template>
  <GrammarLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL - The Theoretical Foundation                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpen class="h-6 w-6 text-primary"/> Core Concept: What is a Phrasal Verb?</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-base">
          <p>A phrasal verb is a compound verb created by combining a main verb (like <code class="font-semibold text-amber-600">go</code>, <code class="font-semibold text-amber-600">look</code>, <code class="font-semibold text-amber-600">put</code>) with a particle—an adverb or a preposition (like <code class="font-semibold text-sky-600">up</code>, <code class="font-semibold text-sky-600">out</code>, <code class="font-semibold text-sky-600">after</code>).</p>
          <p>The addition of the particle often changes the meaning of the main verb dramatically, creating an entirely new idiomatic expression.</p>
          <Alert>
            <AlertTriangle class="h-4 w-4" />
            <AlertTitle>The Golden Rule</AlertTitle>
            <AlertDescription>
              Don't try to understand the meaning by looking at the parts separately. Treat the phrasal verb as a new, single piece of vocabulary. For example, <code class="font-semibold">give up</code> means 'to quit', which is unrelated to 'giving' or 'up'.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Distinction: Separable vs. Inseparable</CardTitle>
          <CardDescription>This is the most challenging aspect for learners.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <h3 class="font-semibold text-lg mb-2">1. Separable Phrasal Verbs</h3>
            <p class="mb-2">The verb and particle can be separated by the object of the sentence.</p>
            <ul class="list-disc list-inside space-y-2 pl-4">
              <li>You can <code class="font-semibold">turn off</code> the lights.</li>
              <li>You can <code class="font-semibold">turn</code> the lights <code class="font-semibold">off</code>.</li>
            </ul>
            <Alert variant="destructive" class="mt-3">
              <AlertTriangle class="h-4 w-4" />
              <AlertTitle>Critical Pronoun Rule!</AlertTitle>
              <AlertDescription>
                When the object is a pronoun (it, them, her, him), it <span class="font-bold underline">MUST</span> go between the verb and particle.
                <br />
                <span class="text-green-600 font-semibold">Correct:</span> Please turn <code class="font-bold">it</code> off.
                <br />
                <span class="text-red-600 font-semibold">Incorrect:</span> <del>Please turn off it.</del>
              </AlertDescription>
            </Alert>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">2. Inseparable Phrasal Verbs</h3>
            <p class="mb-2">The verb and particle cannot be separated. The object always comes after the full phrasal verb.</p>
             <ul class="list-disc list-inside space-y-2 pl-4">
              <li>I will <code class="font-semibold">look after</code> the children.</li>
              <li>I will <code class="font-semibold">look after</code> them.</li>
              <li><span class="text-red-600 font-semibold">Incorrect:</span> <del>I will look the children after.</del></li>
            </ul>
          </div>
           <div>
            <h3 class="font-semibold text-lg mb-2">3. Intransitive Phrasal Verbs</h3>
            <p class="mb-2">These do not take an object and are therefore never separated.</p>
             <ul class="list-disc list-inside space-y-2 pl-4">
              <li>We had to <code class="font-semibold">check in</code> before 10 PM.</li>
              <li>My career finally <code class="font-semibold">took off</code>.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE - The Interactive Challenge                              -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the tasks below. Your answers will be validated.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
            
            <p v-if="q.type === 'sentence-transformation' || q.type === 'error-correction'" class="text-sm text-muted-foreground italic">
              {{ q.prompt }}
            </p>

            <div v-if="q.type === 'multiple-choice'">
              <RadioGroup v-model="userAnswers[q.id]" :disabled="isSubmitted">
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                  <Label :for="`${q.id}-${option}`" class="font-normal">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div v-if="q.type === 'sentence-transformation' || q.type === 'error-correction'">
              <Input
                type="text"
                v-model="userAnswers[q.id]"
                :placeholder="q.type === 'error-correction' ? 'Corrected phrase here...' : 'Your rewritten sentence part...'"
                :disabled="isSubmitted"
              />
            </div>
          </div>

          <Button @click="handleSubmit" :disabled="isSubmitted" class="w-full">
            Check Answers & Get Feedback
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT - The Detailed Feedback & Score                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results & Detailed Analysis</CardTitle>
          <CardDescription>Review the explanations to master the concepts.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xl">Overall Score: {{ score }} / {{ questions.length }}</span>
              <span :class="scorePercentage > 75 ? 'text-green-500' : scorePercentage > 40 ? 'text-amber-500' : 'text-red-500'" class="font-bold text-2xl">
                {{ scorePercentage.toFixed(0) }}%
              </span>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>

          <!-- Detailed Breakdown -->
          <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="space-y-2">
            <Alert :variant="getAnswerStatus(q.id) === 'correct' ? 'default' : 'destructive'">
              <component :is="getAnswerStatus(q.id) === 'correct' ? CheckCircle2 : XCircle" class="h-5 w-5" />
              <AlertTitle class="font-bold text-base">
                Question {{ index + 1 }}: {{ getAnswerStatus(q.id) === 'correct' ? 'Correct' : 'Incorrect' }}
              </AlertTitle>
              <AlertDescription class="space-y-3 pt-2">
                <p class="text-base">{{ q.question }}</p>
                <div class="p-3 rounded-md bg-muted/50 border border-dashed">
                  <p><span class="font-semibold">Your Answer:</span> <code :class="{ 'text-red-500 line-through': getAnswerStatus(q.id) === 'incorrect' }">{{ userAnswers[q.id] || 'No answer provided' }}</code></p>
                  <p v-if="getAnswerStatus(q.id) === 'incorrect'"><span class="font-semibold">Correct Answer:</span> <code class="text-green-500">{{ q.correctAnswer }}</code></p>
                </div>
                <div class="pt-2">
                  <p class="font-semibold text-foreground mb-1">💡 Explanation:</p>
                  <p class="text-sm">{{ q.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style>
/* Optional: Add some smooth transitions and better styling */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
code {
  @apply relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm;
}
</style>
