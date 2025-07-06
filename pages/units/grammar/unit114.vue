<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming these components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Component State Management ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string>>({})
const validationResults = ref<any[]>([])

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/6") // Navigate to the previous unit
}
function goToNextUnit() {
  router.push("/units/grammar/8") // Navigate to the next unit
}

// --- Core Data: Questions & Explanations ---
// Inspired by pedagogical methods that emphasize context, nuance, and active recall.
const questions = [
  {
    id: 'q1',
    type: 'fill-in-the-blank',
    question: "The negotiations will fail ___ both sides agree to a compromise on the key issues.",
    correctAnswer: 'unless',
    explanation: "Use 'unless' to introduce the only situation in which something will not happen. The negotiations will fail IF a compromise is NOT reached. 'Unless' effectively means 'if...not'.",
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank',
    question: "You are welcome to stay for dinner, ___ you don't mind eating leftovers from yesterday.",
    correctAnswers: ['as long as', 'provided', 'providing'],
    displayAnswer: 'as long as / provided / providing',
    explanation: "'As long as', 'provided', and 'providing' are used to state a condition that must be met for something to happen. They mean 'if' or 'only if'. In this informal context, all three are suitable, with 'as long as' being the most common.",
  },
  {
    id: 'q3',
    type: 'sentence-transformation',
    question: "Rewrite the following sentence using 'unless': 'If you do not have a valid ticket, you cannot board the train.'",
    correctAnswer: 'Unless you have a valid ticket, you cannot board the train.',
    explanation: "'Unless' replaces 'If...not'. The main clause remains the same. 'If you do not have...' becomes 'Unless you have...'. This tests your ability to transform conditional structures.",
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank',
    question: "The company will invest in the new technology, ___ it proves to be financially viable after the initial trials.",
    correctAnswers: ['provided', 'providing', 'as long as'],
    displayAnswer: 'provided / providing / as long as',
    explanation: "Here, a strong condition is being set for the investment. 'Provided' or 'providing' are slightly more formal and often preferred in business or legal contexts, making them an excellent fit. 'As long as' is also correct.",
  },
  {
    id: 'q5',
    type: 'error-correction',
    question: "Find and correct the error in the sentence: 'We're going for a hike on Saturday as long as it rains heavily.'",
    correctAnswer: "We're going for a hike on Saturday unless it rains heavily.",
    explanation: "The logic of the original sentence is flawed. 'As long as' implies that heavy rain is a *condition for* hiking. The intended meaning is that heavy rain is the one thing that will *prevent* the hike. Therefore, 'unless' is the correct conjunction.",
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank-complex',
    question: "The system is perfectly secure against external threats, ___ an employee from within compromises the security protocols.",
    correctAnswer: 'unless',
    explanation: "The sentence describes a state that is true in all situations *except one*. This exception—the one thing that can break the security—is introduced by 'unless'.",
  },
  {
    id: 'q7',
    type: 'sentence-transformation',
    question: "Rewrite the following sentence using 'as long as': 'You can use the company car, but you must return it with a full tank of petrol.'",
    correctAnswer: 'You can use the company car as long as you return it with a full tank of petrol.',
    explanation: "'As long as' is perfect for setting a condition or a rule for permission. It directly connects the permission ('use the car') with the requirement ('return it full').",
  },
  {
    id: 'q8',
    type: 'fill-in-the-blanks-dual',
    question: "___ you maintain a high grade point average, the scholarship will be renewed. It will be revoked, however, ___ you fail more than one class.",
    correctAnswer1: 'as long as',
    correctAnswer2: 'unless', // This is tricky, 'if' also works, but 'unless' fits the structure better in reverse. Let's make it strict.
    explanation: "The first blank sets a positive condition for renewal ('as long as' / 'provided'). The second blank introduces the single negative condition that would *prevent* the renewal from continuing, making 'unless' the most precise and powerful choice. It highlights the exception to the rule.",
  },
];

// Initialize userAnswers object
questions.forEach(q => {
  if (q.type === 'fill-in-the-blanks-dual') {
    userAnswers[`${q.id}-1`] = '';
    userAnswers[`${q.id}-2`] = '';
  } else {
    userAnswers[q.id] = '';
  }
});

// --- Validation Logic ---
function validateAnswers() {
  const results: any[] = [];
  questions.forEach(q => {
    let isCorrect = false;
    let userAnswerDisplay: string;

    if (q.type === 'fill-in-the-blanks-dual') {
      const userAnswer1 = userAnswers[`${q.id}-1`]?.trim().toLowerCase() ?? '';
      const userAnswer2 = userAnswers[`${q.id}-2`]?.trim().toLowerCase() ?? '';
      isCorrect = userAnswer1 === q.correctAnswer1 && userAnswer2 === q.correctAnswer2;
      userAnswerDisplay = `1: '${userAnswers[`${q.id}-1`]}' 2: '${userAnswers[`${q.id}-2`]}'`;
    } else {
      const userAnswer = userAnswers[q.id]?.trim().toLowerCase() ?? '';
      userAnswerDisplay = `'${userAnswers[q.id]}'`;
      if (Array.isArray(q.correctAnswers)) {
        isCorrect = q.correctAnswers.includes(userAnswer);
      } else {
        // For sentence transformations, allow for minor variations like missing periods.
        const simplifiedUserAnswer = userAnswer.replace(/\.$/, '');
        const simplifiedCorrectAnswer = q.correctAnswer.toLowerCase().replace(/\.$/, '');
        isCorrect = simplifiedUserAnswer === simplifiedCorrectAnswer;
      }
    }
    
    results.push({
      ...q,
      userAnswer: userAnswerDisplay,
      isCorrect,
    });
  });
  validationResults.value = results;
  showResult.value = true;
  // Scroll to results for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length;
});

const scorePercentage = computed(() => {
  if (questions.length === 0) return 0;
  return Math.round((score.value / questions.length) * 100);
});

function getCorrectAnswerForDisplay(question: any): string {
  if(question.type === 'fill-in-the-blanks-dual') {
    return `1: ${question.correctAnswer1}, 2: ${question.correctAnswer2}`;
  }
  return question.displayAnswer || question.correctAnswer;
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced Conditionals"
    test-description="Mastering the nuances of conditional conjunctions in English."
    unit-title="Unit 7: Unless; As long as; Provided/Providing"
    unit-description="Explore the specific conditions under which actions occur. This unit focuses on distinguishing between exceptions (Unless) and prerequisites (As long as, Provided)."
    :categories="['Conditionals', 'Conjunctions', 'Advanced Grammar']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts: Exceptions vs. Prerequisites</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-6 text-sm">
          <div>
            <h3 class="mb-2 font-semibold text-base text-primary">1. Unless (The Exception Clause)</h3>
            <p class="text-muted-foreground">
              <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Unless</code> is a powerful conjunction that means <strong class="text-foreground">'if...not'</strong> or <strong class="text-foreground">'except if'</strong>. It introduces the *single condition* that will prevent the main clause from being true.
            </p>
            <Alert variant="default" class="mt-3">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>Mental Model</AlertTitle>
              <AlertDescription>
                Think of it as a locked door. The door will remain locked <strong class="text-foreground">unless</strong> you have the key. The key is the one exception.
              </AlertDescription>
            </Alert>
            <ul class="mt-3 list-inside list-disc space-y-2 pl-2 text-muted-foreground">
              <li><strong class="text-foreground">Example:</strong> You will not get the job <strong class="text-primary">unless</strong> you perform well in the interview. (You will get the job only if you perform well).</li>
              <li><strong class="text-foreground">Example:</strong> The party will be outdoors <strong class="text-primary">unless</strong> it rains. (Rain is the only reason for it to be indoors).</li>
            </ul>
          </div>

          <hr/>
          
          <div>
            <h3 class="mb-2 font-semibold text-base text-primary">2. As long as / Provided / Providing (The Prerequisite Clause)</h3>
            <p class="text-muted-foreground">
              These phrases are used to emphasize a <strong class="text-foreground">necessary condition</strong> or a prerequisite for the main clause to be true. They all mean <strong class="text-foreground">'if'</strong> or <strong class="text-foreground">'only if'</strong>.
            </p>
            <ul class="mt-3 list-inside list-disc space-y-2 pl-2 text-muted-foreground">
              <li><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">As long as</code> is very common in spoken English.</li>
              <li><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Provided (that)</code> and <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Providing (that)</code> are slightly more formal and are often used in writing, contracts, or when setting firm rules.</li>
            </ul>
            <Alert variant="default" class="mt-3">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>Mental Model</AlertTitle>
              <AlertDescription>
                Think of this as a requirement. You can get a loan <strong class="text-foreground">provided that</strong> you have a good credit score. The good credit score is the prerequisite.
              </AlertDescription>
            </Alert>
            <ul class="mt-3 list-inside list-disc space-y-2 pl-2 text-muted-foreground">
              <li><strong class="text-foreground">Example:</strong> You can borrow my laptop <strong class="text-primary">as long as</strong> you are careful with it.</li>
              <li><strong class="text-foreground">Example:</strong> We can finish the project by Friday <strong class="text-primary">provided</strong> everyone works overtime. (More formal).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: practice                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the following tasks. Pay close attention to the context of each sentence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="flex flex-col gap-8" @submit.prevent="validateAnswers">
            <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-2">
              <label :for="q.id" class="text-sm font-medium">
                {{ index + 1 }}. {{ q.question }}
              </label>
              
              <div v-if="q.type === 'fill-in-the-blanks-dual'" class="flex flex-col gap-3 sm:flex-row">
                <Input :id="`${q.id}-1`" v-model="userAnswers[`${q.id}-1`]" placeholder="First blank" class="flex-1" />
                <Input :id="`${q.id}-2`" v-model="userAnswers[`${q.id}-2`]" placeholder="Second blank" class="flex-1" />
              </div>

              <Input v-else :id="q.id" v-model="userAnswers[q.id]" placeholder="Your answer here..." />

              <p v-if="q.type.includes('transformation')" class="text-xs text-muted-foreground italic">
                Write the full, transformed sentence.
              </p>
              <p v-if="q.type.includes('correction')" class="text-xs text-muted-foreground italic">
                Write the full, corrected sentence.
              </p>
            </div>
            
            <Button type="submit" class="w-full sm:w-auto self-end" :disabled="showResult">
              Check Answers & Get Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription class="text-base">
              You scored <strong class="text-primary">{{ score }} out of {{ questions.length }}</strong> ({{ scorePercentage }}%). Review the detailed explanations below to master the concepts.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-6">
            <div v-for="(result, index) in validationResults" :key="`result-${result.id}`">
              <div class="flex items-start gap-4">
                <div class="mt-1">
                   <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                   <XCircle v-else class="h-5 w-5 text-red-500" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-sm">{{ index + 1 }}. {{ result.question }}</p>
                  
                  <div class="mt-2 flex flex-col gap-2 rounded-md border p-3 text-sm">
                    <div class="flex items-center gap-2">
                      <Badge :variant="result.isCorrect ? 'default' : 'destructive'" class="whitespace-nowrap">Your Answer</Badge>
                      <span class="font-mono text-muted-foreground">{{ result.userAnswer }}</span>
                    </div>

                    <div v-if="!result.isCorrect" class="flex items-center gap-2">
                      <Badge variant="secondary" class="whitespace-nowrap">Correct Answer</Badge>
                      <span class="font-mono font-semibold">{{ getCorrectAnswerForDisplay(result) }}</span>
                    </div>
                  </div>

                  <Alert class="mt-3" :class="result.isCorrect ? 'border-green-200 dark:border-green-900' : 'border-amber-200 dark:border-amber-900'">
                    <AlertCircle class="h-4 w-4" />
                    <AlertTitle>Explanation</AlertTitle>
                    <AlertDescription class="text-xs md:text-sm">
                     {{ result.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
              <hr v-if="index < validationResults.length - 1" class="my-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
