<!--
  File: @/pages/units/grammar/24.vue
  Unit: 24 - Verb + preposition 1: To and at
  Description: An advanced practice module based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth explanations and challenging exercises to master the use of
  prepositions 'to' and 'at' with various verbs, focusing on the subtle differences in meaning
  (e.g., movement vs. target, communication vs. aggression).
-->
<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the best-selling book by Raymond Murphy."
    unit-title="Unit 24: Verb + preposition 1: To and at"
    unit-description="Master the distinction between verbs that take 'to' (indicating direction, connection, or reception) and those that take 'at' (indicating a target or specific point). This unit focuses on the subtle changes in meaning these prepositions can create."
    :categories="['Verbs', 'Prepositions', 'Intermediate']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: LEARNING CONTENT                                        -->
    <!-- This section emulates the clear, example-driven style of top grammar books. -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Rule 1: Using 'to' for Movement and Connection</CardTitle>
          <CardDescription>
            We use <strong class="text-primary">'to'</strong> to express movement towards a destination or to connect an action/communication with a recipient. It answers the question "Where?" or "To whom?".
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">Movement Verbs:</h4>
            <ul class="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              <li><span class="font-mono text-foreground">go to, travel to, walk to, fly to, drive to, return to</span></li>
              <li>Example: "We are flying <strong class="text-primary">to</strong> Rome for our anniversary." (Destination)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">Communication & Transfer Verbs:</h4>
            <ul class="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              <li><span class="font-mono text-foreground">talk to, speak to, listen to, write to, explain to, describe to, apologise to</span></li>
              <li>Example: "Could you please explain the problem <strong class="text-primary">to</strong> me?" (Recipient)</li>
              <li>Example: "I really enjoy listening <strong class="text-primary">to</strong> classical music." (Object of attention)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rule 2: Using 'at' for Targets and Specific Points</CardTitle>
          <CardDescription>
            We use <strong class="text-primary">'at'</strong> when a verb is directed towards something or someone as a target, or when looking at a specific point. It often implies a more focused, and sometimes aggressive, action.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">Targeting Verbs:</h4>
            <ul class="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              <li><span class="font-mono text-foreground">shout at, laugh at, throw (something) at, point at, aim at, shoot at</span></li>
              <li>Example: "Please don't shout <strong class="text-primary">at</strong> me, I'm right here." (Aggressive target)</li>
              <li>Example: "He threw the rock <strong class="text-primary">at</strong> the window and broke it." (Target to hit)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">Direction of Eyes:</h4>
            <ul class="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              <li><span class="font-mono text-foreground">look at, stare at, glance at, wave at</span></li>
              <li>Example: "Why are you looking <strong class="text-primary">at</strong> me like that?" (Specific point of vision)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card class="border-amber-500/50 bg-amber-50/50 dark:bg-amber-900/10">
        <CardHeader>
          <CardTitle class="text-amber-700 dark:text-amber-500">Key Distinction: 'throw to' vs 'throw at'</CardTitle>
          <CardDescription>This is a classic test of understanding intent. The preposition changes the entire meaning of the action.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <p><strong class="font-mono">throw something to someone</strong> = A cooperative action. You want the person to catch it. <br><em>Example: "If you're ready, I'll throw the keys <strong class="text-primary">to</strong> you."</em></p>
          <p><strong class="font-mono">throw something at someone/something</strong> = An aggressive or hostile action. You want to hit them/it.<br><em>Example: "The protestors began to throw stones <strong class="text-primary">at</strong> the police."</em></p>
        </CardContent>
      </Card>
       <Card class="border-red-500/50 bg-red-50/50 dark:bg-red-900/10">
        <CardHeader>
          <CardTitle class="text-red-700 dark:text-red-500">Common Error: Verbs with No Preposition</CardTitle>
          <CardDescription>Many learners incorrectly add a preposition after these transitive verbs. They take a direct object.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm">Do not use a preposition with: <strong class="font-mono">phone, call, email, text, discuss, answer, ask, enter</strong>.</p>
          <ul class="mt-2 list-none space-y-1 pl-2 text-sm">
            <li><span class="text-green-600 dark:text-green-400">✓</span> I need to <strong class="font-semibold">phone my doctor</strong>.</li>
            <li><span class="text-destructive">✗</span> <s class="text-muted-foreground">I need to phone to my doctor.</s></li>
            <li><span class="text-green-600 dark:text-green-400">✓</span> Let's <strong class="font-semibold">discuss the report</strong>.</li>
            <li><span class="text-destructive">✗</span> <s class="text-muted-foreground">Let's discuss about the report.</s></li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice SLOT: INTERACTIVE QUESTIONS                                   -->
    <!-- These questions are designed to be challenging and test nuanced understanding. -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the correct preposition ('to', 'at', or '—' for no preposition). Pay close attention to the context of each sentence.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium">
              {{ index + 1 }}. {{ question.text.split('___')[0] }}
              <span class="inline-block h-5 w-20 rounded-md border-b-2 border-dotted border-foreground/50 align-bottom"></span>
              {{ question.text.split('___')[1] }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="submitted" class="flex flex-wrap items-center gap-4">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="cursor-pointer font-mono text-base">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button :disabled="!allQuestionsAnswered || submitted" @click="checkAnswers">
            <CheckCircle class="mr-2 h-4 w-4" />
            Check Answers
          </Button>
          <Button v-if="submitted" variant="outline" class="ml-4" @click="resetTest">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: VALIDATOR & EXPLANATIONS                                -->
    <!-- Provides immediate, detailed, and educational feedback for each question. -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance below. The explanations are key to improving your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center gap-4 rounded-lg border p-4">
            <div class="flex-1">
              <p class="text-lg font-bold">Score: {{ score }} / {{ questions.length }}</p>
              <Progress :model-value="scorePercentage" class="mt-2" />
            </div>
            <div class="text-center">
              <p class="text-3xl font-extrabold" :class="scorePercentage > 75 ? 'text-green-500' : 'text-amber-500'">{{ scorePercentage }}%</p>
              <p class="text-sm text-muted-foreground">{{ scoreMessage }}</p>
            </div>
          </div>

          <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="space-y-2">
             <Separator />
            <div class="mt-4">
              <p class="text-muted-foreground">Question {{ index + 1 }}: {{ question.text.replace('___', `[ ... ]`) }}</p>
              <div class="mt-2 flex items-center gap-4 rounded-lg p-3" :class="isCorrect(question) ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'">
                <div class="flex-shrink-0">
                  <Check v-if="isCorrect(question)" class="h-6 w-6 text-green-600" />
                  <X v-else class="h-6 w-6 text-red-600" />
                </div>
                <div class="flex-1">
                  <p>
                    Your answer: <strong :class="isCorrect(question) ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">{{ getOptionLabel(question, question.userAnswer) }}</strong>
                  </p>
                  <p v-if="!isCorrect(question)">
                    Correct answer: <strong class="text-green-700 dark:text-green-400">{{ getOptionLabel(question, question.correctAnswer) }}</strong>
                  </p>
                </div>
              </div>
              <Alert class="mt-2 border-l-4 border-sky-500 bg-sky-500/10 text-sky-900 dark:bg-sky-500/10 dark:text-sky-200">
                <AlertCircle class="h-4 w-4 !text-sky-500" />
                <AlertTitle class="font-bold !text-sky-600 dark:!text-sky-400">Explanation</AlertTitle>
                <AlertDescription>
                  {{ question.explanation }}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are in @/components/ui and auto-imported by Nuxt
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, RefreshCw, Check, X, AlertCircle } from 'lucide-vue-next'

// --- Page-specific Logic ---

const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/23")
}
function goToNextUnit() {
  router.push("/units/grammar/25")
}

// --- Types ---
interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
}

// --- Reactive State ---
const submitted = ref(false)
const showResult = ref(false)

const questions = ref<Question[]>([
  {
    id: 'q1',
    text: "The angry customer started shouting ___ the manager, who remained surprisingly calm.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'at',
    userAnswer: '',
    explanation: "We use 'shout at' to denote anger or aggression. 'Shout to' would be used to communicate over a distance, which doesn't fit the context of an 'angry customer'."
  },
  {
    id: 'q2',
    text: "Before you start, please listen carefully ___ all the instructions I'm about to give you.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'to',
    userAnswer: '',
    explanation: "The verb 'listen' is almost always followed by 'to' when specifying what is being heard. 'Listen at' is not standard English in this context."
  },
  {
    id: 'q3',
    text: "Could you please phone ___ the airline to confirm our flight details?",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'none',
    userAnswer: '',
    explanation: "'Phone' is a transitive verb that takes a direct object without a preposition. Saying 'phone to someone' is a common mistake. The correct form is simply 'phone the airline'."
  },
  {
    id: 'q4',
    text: "From the other side of the field, the coach threw the water bottle ___ the thirsty player.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'to',
    userAnswer: '',
    explanation: "The context implies a cooperative action: the coach wants the player to catch the bottle. Therefore, 'throw to' is correct. 'Throw at' would suggest the coach was trying to hit the player."
  },
  {
    id: 'q5',
    text: "It is considered rude to point ___ people.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'at',
    userAnswer: '',
    explanation: "'Point at' is the standard phrasal verb for indicating something or someone with your finger, often with a targeted, direct sense that can be perceived as impolite."
  },
  {
    id: 'q6',
    text: "I spent all morning writing a long email ___ my team explaining the new project strategy.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'to',
    userAnswer: '',
    explanation: "Verbs of communication and transfer like 'write', 'send', and 'explain' use 'to' to indicate the recipient of the message or item."
  },
  {
    id: 'q7',
    text: "The comedian was so bad that instead of laughing with him, the audience started to laugh ___ him.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'at',
    userAnswer: '',
    explanation: "'Laugh at' means to ridicule or mock someone, which fits the context of a bad comedian. 'Laugh with' (not an option here) means to share in the humor."
  },
  {
    id: 'q8',
    text: "We need to discuss ___ this problem immediately; it's getting worse.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'none',
    userAnswer: '',
    explanation: "Like 'phone', the verb 'discuss' is transitive and does not require a preposition before its object. A common error is to use 'about', but 'to' and 'at' are also incorrect."
  },
  {
    id: 'q9',
    text: "She glanced nervously ___ her watch, worried she was going to be late.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'at',
    userAnswer: '',
    explanation: "Verbs involving the direction of the eyes, such as 'look', 'stare', and 'glance', are followed by 'at' to specify the target of vision."
  },
  {
    id: 'q10',
    text: "I saw an old friend across the crowded room, so I waved ___ her to get her attention.",
    options: [{ value: 'to', label: 'to' }, { value: 'at', label: 'at' }, { value: 'none', label: '—' }],
    correctAnswer: 'at',
    userAnswer: '',
    explanation: "While 'wave to' is also very common and often interchangeable, 'wave at' is frequently used to mean 'wave in the direction of' as a signal. In formal grammar, 'at' is often preferred for targeting an action, even a friendly one, at a person."
  },
]);


// --- Computed Properties for Validation and Scoring ---
const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => q.userAnswer !== '');
});

const score = computed(() => {
  if (!submitted.value) return 0;
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length;
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return Math.round((score.value / questions.value.length) * 100);
});

const scoreMessage = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return "Perfect Score! Masterful.";
  if (percentage >= 80) return "Excellent! You have a strong grasp.";
  if (percentage >= 60) return "Good job! Review the explanations to solidify.";
  if (percentage >= 40) return "Not bad. There's room for improvement.";
  return "Keep practicing. Repetition is key!";
});

// --- Methods ---
function checkAnswers() {
  submitted.value = true;
  showResult.value = true;
  // Scroll to the results section for better UX
  // This requires the element to be in the DOM, so we use nextTick
  nextTick(() => {
    const resultElement = document.querySelector('#result-card'); // An ID would be needed on the result card
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function resetTest() {
  questions.value.forEach(q => q.userAnswer = '');
  submitted.value = false;
  showResult.value = false;
}

function isCorrect(question: Question): boolean {
  return question.userAnswer === question.correctAnswer;
}

function getOptionLabel(question: Question, value: string): string {
  if (value === 'none') return '— (no preposition)';
  return question.options.find(opt => opt.value === value)?.label || '';
}

</script>

