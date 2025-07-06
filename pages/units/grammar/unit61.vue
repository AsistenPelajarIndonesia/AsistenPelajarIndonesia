<!--
  File: @/pages/units/grammar/0.vue
  Unit: 0 - Verb + preposition + -ing (succeed in -ing, etc.)
  Description: An advanced grammar practice page based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth learning material, challenging exercises, and a detailed
  results validator to ensure students master the topic.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI & Icon Imports ---
// Assuming a setup with shadcn-vue and lucide-vue-next
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle, PenLine } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- State Management ---
const showResult = ref(false)
const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  // Unit 0 is the first unit, so this action is disabled.
  // In a real application, you might navigate or show a message.
  alert("You are on the first unit.")
}

function goToNextUnit() {
  // Navigate to the next logical unit.
  router.push("/units/grammar/1")
}

// --- Exercise Data Structure ---
// This reactive array holds the state for the entire practice session.
// The questions are designed to be challenging and cover various contexts.
const questions = reactive([
  {
    id: 1,
    type: 'fill-in',
    prompt: 'After many attempts, the team finally succeeded',
    endPrompt: 'the complex algorithm.',
    verb: 'implement',
    userAnswer: '',
    correctAnswer: ['in implementing'],
    status: 'unanswered',
    explanation: "The verb 'succeed' is followed by the preposition 'in'. The verb following the preposition must be in the gerund (-ing) form. 'Succeed in doing something' means to achieve a desired outcome.",
  },
  {
    id: 2,
    type: 'fill-in',
    prompt: 'She has always dreamed',
    endPrompt: 'her own sustainable fashion brand.',
    verb: 'launch',
    userAnswer: '',
    correctAnswer: ['of launching'],
    status: 'unanswered',
    explanation: "We 'dream of' doing something. This structure expresses a hope or ambition. The preposition 'of' is required, followed by the gerund.",
  },
  {
    id: 3,
    type: 'fill-in-with-object',
    prompt: 'The manager congratulated the employee',
    endPrompt: 'the quarterly sales target.',
    verb: 'exceed',
    userAnswer: '',
    correctAnswer: ['on exceeding'],
    status: 'unanswered',
    explanation: "The structure is 'congratulate somebody on doing something'. The preposition 'on' is used to specify the reason for the congratulations. Don't forget the gerund form.",
  },
  {
    id: 4,
    type: 'fill-in',
    prompt: 'I must apologise',
    endPrompt: 'on time for our meeting yesterday.',
    verb: 'not arrive',
    userAnswer: '',
    correctAnswer: ['for not arriving'],
    status: 'unanswered',
    explanation: "We 'apologise for' something. To make a gerund negative, we place 'not' before it. The structure is 'apologise for not doing something'.",
  },
  {
    id: 5,
    type: 'fill-in-with-object',
    prompt: 'The new security system is designed to prevent unauthorised personnel',
    endPrompt: 'the restricted area.',
    verb: 'enter',
    userAnswer: '',
    correctAnswer: ['from entering'],
    status: 'unanswered',
    explanation: "The correct structure is 'prevent somebody from doing something'. The preposition 'from' indicates separation or stoppage. This is a very common and important pattern.",
  },
  {
    id: 6,
    type: 'fill-in',
    prompt: "I don't feel",
    endPrompt: "out tonight. I'd rather stay home.",
    verb: 'go',
    userAnswer: '',
    correctAnswer: ['like going'],
    status: 'unanswered',
    explanation: "'Feel like doing something' is a common idiomatic expression meaning 'to have a desire to do something'. The word 'like' here functions as a preposition requiring a gerund.",
  },
  {
    id: 7,
    type: 'rewrite',
    prompt: "He said, 'I will definitely pay for the broken window.'",
    instruction: "Rewrite the sentence using 'insist on'.",
    userAnswer: '',
    correctAnswer: ['he insisted on paying for the broken window'],
    status: 'unanswered',
    explanation: "'Insist on doing something' means to demand something forcefully and not accept refusal. The original quote shows strong intention, which is perfectly captured by 'insist on' + gerund.",
  },
  {
    id: 8,
    type: 'fill-in',
    prompt: 'We are very much looking forward',
    endPrompt: 'you again next summer.',
    verb: 'see',
    userAnswer: '',
    correctAnswer: ['to seeing'],
    status: 'unanswered',
    explanation: "This is a classic trap. In the phrasal verb 'look forward to', the 'to' is a preposition, not part of an infinitive. Therefore, it must be followed by a gerund (-ing form), not the base verb. Think of 'to' as specifying the *what* you are looking forward to.",
  },
  {
    id: 9,
    type: 'fill-in-with-object',
    prompt: 'The police suspected the man',
    endPrompt: 'the classified documents.',
    verb: 'steal',
    userAnswer: '',
    correctAnswer: ['of stealing'],
    status: 'unanswered',
    explanation: "The structure is 'suspect somebody of doing something'. The preposition 'of' links the person to the suspected action. This is common in legal and formal contexts.",
  },
  {
    id: 10,
    type: 'rewrite',
    prompt: 'Why don\'t you paint the room blue? That was my idea.',
    instruction: "Rewrite the sentence using 'think of'.",
    userAnswer: '',
    correctAnswer: ['i thought of painting the room blue', 'i thought about painting the room blue'],
    status: 'unanswered',
    explanation: "'Think of/about doing something' means to consider an idea or possibility. Both 'of' and 'about' are correct here and are followed by the gerund. The past tense 'thought' is required to match the context.",
  },
])

// --- Validation & Scoring Logic ---
function checkAnswers() {
  let correctCount = 0
  questions.forEach((q) => {
    // Normalize user input for more robust comparison
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\s+/g, ' ')

    // Check if the cleaned answer is in the array of correct answers
    const isCorrect = q.correctAnswer.includes(userAnswerCleaned)

    if (isCorrect) {
      q.status = 'correct'
      correctCount++
    } else {
      q.status = 'incorrect'
    }
  })
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

const score = computed(() => {
  const correct = questions.filter(q => q.status === 'correct').length
  return Math.round((correct / questions.length) * 100)
})

const scoreFeedback = computed(() => {
  if (score.value === 100) return { title: 'Exceptional!', message: 'A perfect score! You have mastered this structure.', variant: 'success' }
  if (score.value >= 80) return { title: 'Excellent Work!', message: 'You have a strong command of this topic. Review the few mistakes to achieve perfection.', variant: 'success' }
  if (score.value >= 60) return { title: 'Good Effort!', message: 'A solid performance. Pay close attention to the explanations to solidify your understanding.', variant: 'default' }
  return { title: 'Needs Review', message: "This was a tough unit. Please review the material and the explanations below carefully. Repetition is key!", variant: 'destructive' }
})

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on Raymond Murphy's classic."
    unit-title="Unit 0: Verb + Preposition + -ing"
    unit-description="Mastering the structure where a verb is followed by a specific preposition and a gerund (-ing form). This pattern is crucial for fluent and natural English."
    :categories="['Verbs', 'Prepositions', 'Gerunds', 'Intermediate', 'B2/C1 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Lightbulb class="text-yellow-500" /> Core Concept</CardTitle>
          <CardDescription>Understanding the fundamental pattern.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-base">
            In English, many verbs, when followed by a preposition (like <b class="text-primary">in, on, for, of, about</b>), must be followed by a verb in the <b>gerund</b> (-ing) form, not the infinitive (to + verb).
          </p>
          <div class="rounded-md bg-muted p-3">
            <p class="font-mono text-sm">
              [Subject] + [Verb] + <b class="text-primary">[Preposition]</b> + <b class="text-blue-600">[Verb-ing]</b> ...
            </p>
            <p class="mt-2 text-sm text-muted-foreground">
              Example: She <span class="font-semibold">succeeded</span> <b class="text-primary">in</b> <b class="text-blue-600">passing</b> the exam.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><AlertTriangle class="text-red-500" /> Common Pitfalls</CardTitle>
          <CardDescription>Avoid these frequent mistakes.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">1. Using the Infinitive</h4>
            <p><span class="text-red-600">Incorrect:</span> He insisted <b class="text-primary">on</b> <span class="line-through">to leave</span>.</p>
            <p><span class="text-green-600">Correct:</span> He insisted <b class="text-primary">on</b> <b class="text-blue-600">leaving</b>.</p>
          </div>
          <div>
            <h4 class="font-semibold">2. Using the Wrong Preposition</h4>
            <p><span class="text-red-600">Incorrect:</span> They accused him <span class="line-through">for</span> stealing.</p>
            <p><span class="text-green-600">Correct:</span> They accused him <b class="text-primary">of</b> <b class="text-blue-600">stealing</b>.</p>
          </div>
          <div>
            <h4 class="font-semibold">3. The 'to' Preposition Trap</h4>
            <p class="text-muted-foreground">Some phrases end with 'to' as a preposition, not as part of an infinitive. These require an -ing form.</p>
            <p><span class="text-red-600">Incorrect:</span> I look forward <b class="text-primary">to</b> <span class="line-through">meet</span> you.</p>
            <p><span class="text-green-600">Correct:</span> I look forward <b class="text-primary">to</b> <b class="text-blue-600">meeting</b> you.</p>
            <p class="mt-1 text-sm text-muted-foreground">Other examples: <i class="font-semibold">be used to -ing, object to -ing, get around to -ing.</i></p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><PenLine /> Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Type your answer in the box.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-2">
            <p class="text-sm font-medium">
              {{ index + 1 }}.
              <template v-if="q.type === 'rewrite'">
                {{ q.prompt }} <br>
                <span class="text-muted-foreground italic">({{ q.instruction }})</span>
              </template>
              <template v-else>
                {{ q.prompt }} <span class="inline-block h-5 w-48 border-b border-dashed align-middle" /> {{ q.endPrompt }}
              </template>
            </p>

            <template v-if="q.type === 'fill-in' || q.type === 'fill-in-with-object'">
              <Input
                v-model="q.userAnswer"
                :placeholder="`preposition + ${q.verb}(ing)`"
                :disabled="showResult"
                class="font-mono"
              />
            </template>
            <template v-else-if="q.type === 'rewrite'">
               <Input
                v-model="q.userAnswer"
                placeholder="Rewrite the full sentence here..."
                :disabled="showResult"
                class="font-mono"
              />
            </template>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" :disabled="showResult" class="w-full">
            Check Answers & See Score
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-2" :class="{'border-green-500': scoreFeedback.variant === 'success', 'border-yellow-500': scoreFeedback.variant === 'default', 'border-red-500': scoreFeedback.variant === 'destructive'}">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <Alert :variant="scoreFeedback.variant" class="mt-4">
              <component :is="score === 100 ? CheckCircle2 : score >= 60 ? Lightbulb : AlertTriangle" class="h-4 w-4" />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>
                {{ scoreFeedback.message }}
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold">{{ score }}%</span>
              <Progress :model-value="score" class="w-full" />
            </div>
            <p class="text-sm text-muted-foreground">You answered {{ questions.filter(q => q.status === 'correct').length }} out of {{ questions.length }} questions correctly.</p>
          </CardContent>
        </Card>

        <div class="mt-6 space-y-4">
          <h3 class="text-xl font-semibold">Detailed Feedback</h3>
          <Card v-for="(q, index) in questions" :key="`result-${q.id}`">
            <CardHeader>
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm text-muted-foreground">Question {{ index + 1 }}</p>
                  <p class="font-medium">
                    <template v-if="q.type === 'rewrite'">{{ q.prompt }}</template>
                    <template v-else>{{ q.prompt }} <b class="text-primary font-bold">{{ q.correctAnswer[0] }}</b> {{ q.endPrompt }}</template>
                  </p>
                </div>
                <Badge :variant="q.status === 'correct' ? 'default' : 'destructive'" class="flex-shrink-0">
                   <component :is="q.status === 'correct' ? CheckCircle2 : XCircle" class="mr-2 h-4 w-4" />
                   {{ q.status === 'correct' ? 'Correct' : 'Incorrect' }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
                <div class="space-y-3">
                    <div>
                        <p class="text-xs font-semibold uppercase text-muted-foreground">Your Answer</p>
                        <p class="font-mono p-2 rounded-md" :class="q.status === 'correct' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
                            {{ q.userAnswer || 'No answer provided' }}
                        </p>
                    </div>
                    <div v-if="q.status === 'incorrect'">
                        <p class="text-xs font-semibold uppercase text-muted-foreground">Correct Answer(s)</p>
                        <p class="font-mono p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                           {{ q.correctAnswer.join(' / ') }}
                        </p>
                    </div>
                     <div>
                        <p class="text-xs font-semibold uppercase text-muted-foreground">Explanation</p>
                        <Alert variant="default" class="mt-1 border-l-4 border-blue-500">
                          <Lightbulb class="h-4 w-4" />
                          <AlertDescription>
                            {{ q.explanation }}
                          </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Minor style adjustments for better presentation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
