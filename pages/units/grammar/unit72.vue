<!--
  File: @/pages/units/grammar/6.vue
  Description: An advanced grammar practice page for Unit 6: The Present Perfect (I have done).
  This page integrates learning material, challenging exercises, and a detailed results validator
  within the GrammarLayout, designed to foster a deep understanding of the tense.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from '#app'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components - Assuming these are globally available or imported as needed.
// This example uses shadcn-vue components, but you can adapt to any component library.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
const currentUnit = 6
function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}
function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}


// --- PEDAGOGICAL CONTENT & STATE MANAGEMENT ---

// This structure represents the core educational content, inspired by master educators.
// Each question includes a detailed 'explanation' that serves as a mini-lesson.
const questions = reactive([
  {
    id: 1,
    type: 'mcq',
    prompt: "I can't find my keys. I think I _______ them.",
    options: { a: 'lost', b: 'have lost', c: 'did lose' },
    correctAnswer: 'b',
    explanation: `We use the Present Perfect ('have lost') because the action of losing the keys happened in the past, but it has a direct consequence in the present: you cannot find your keys *now*. The Simple Past ('lost') would be used if the context was a finished past time, e.g., 'I lost my keys yesterday.'`
  },
  {
    id: 2,
    type: 'mcq',
    prompt: "Shakespeare _______ many famous plays. He was a brilliant writer.",
    options: { a: 'has written', b: 'wrote', c: 'was writing' },
    correctAnswer: 'b',
    explanation: `We use the Simple Past ('wrote') because Shakespeare is no longer alive. The time period in which he could write is finished. The Present Perfect ('has written') is used for actions by people who are still alive, e.g., 'J.K. Rowling has written many famous books.'`
  },
  {
    id: 3,
    type: 'fill',
    prompt: "A: Are you going to the cinema tonight? B: No, I _______ that film already. (see)",
    correctAnswer: 'have seen',
    explanation: `The Present Perfect ('have seen') is correct here because 'already' indicates the action happened at an unspecified time before now, and it's relevant to the present decision of not going to the cinema. The exact time isn't important, only the experience.`
  },
  {
    id: 4,
    type: 'mcq',
    prompt: "My sister _______ in New York for three years. She's moving back next month.",
    options: { a: 'lived', b: 'has lived', c: 'has been living' },
    correctAnswer: 'b',
    // Note: 'has been living' is also correct and often preferred, but 'has lived' is a valid choice focusing on the state over the period. We accept it here to focus on the Perfect vs. Past distinction.
    explanation: `The Present Perfect ('has lived' or 'has been living') is used because the period of living in New York continues up to the present (or very recent past). The Simple Past ('lived') would imply she no longer lives there, e.g., 'She lived in New York for three years before she moved to Chicago.'`
  },
  {
    id: 5,
    type: 'mcq',
    prompt: "The company's profits _______ dramatically in the last quarter.",
    options: { a: 'have increased', b: 'increased', c: 'did increase' },
    correctAnswer: 'a',
    explanation: `The phrase 'in the last quarter' refers to a recent, and often ongoing or just-finished, time period with relevance to the present financial state. Therefore, the Present Perfect ('have increased') is the most appropriate choice to report this recent news.`
  },
  {
    id: 6,
    type: 'fill',
    prompt: "It's the best holiday I _______ in a long time. (have)",
    correctAnswer: 'have had',
    explanation: `This superlative construction ('It's the best...') is a classic trigger for the Present Perfect ('have had'). It describes an experience within a time period that extends up to the present moment ('in a long time').`
  },
  {
    id: 7,
    type: 'mcq-complex',
    prompt: "Which sentence is grammatically correct and most natural?",
    options: {
      a: "I have visited Paris last summer.",
      b: "I visited Paris last summer.",
      c: "I did visit Paris last summer.",
    },
    correctAnswer: 'b',
    explanation: `The Simple Past ('visited') is required because of the specific, finished time marker 'last summer'. The Present Perfect cannot be used with finished past time adverbs like 'yesterday', 'last week', or 'in 2010'. This is a fundamental rule distinguishing the two tenses.`
  },
  {
    id: 8,
    type: 'fill',
    prompt: "Look! Somebody _______ that window. There's glass everywhere. (break)",
    correctAnswer: 'has broken',
    explanation: `The evidence in the present ('Look!', 'There's glass everywhere') is a direct result of a recent past action. The Present Perfect ('has broken') connects this past action to its present result, which is its primary function.`
  },
]);

// --- REACTIVE STATE FOR THE QUIZ ---
const userAnswers = reactive<Record<number, string>>({});
const showResult = ref(false);

// Initialize userAnswers
questions.forEach(q => {
  userAnswers[q.id] = '';
});

// --- VALIDATION & RESULTS LOGIC ---
interface ResultDetail {
  id: number;
  isCorrect: boolean;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  type: string;
  options?: Record<string, string>;
}

const results = ref<ResultDetail[]>([]);
const score = computed(() => {
  if (!results.value.length) return 0;
  return results.value.filter(r => r.isCorrect).length;
});

const scorePercentage = computed(() => {
  if (!questions.length) return 0;
  return Math.round((score.value / questions.length) * 100);
});

function checkAnswers() {
  const detailedResults: ResultDetail[] = questions.map(q => {
    const userAnswer = userAnswers[q.id]?.trim() || 'No answer';
    let isCorrect = false;

    if (q.type === 'fill') {
      // Case-insensitive check for fill-in-the-blanks
      isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
    } else {
      isCorrect = userAnswer === q.correctAnswer;
    }
    
    return {
      id: q.id,
      isCorrect,
      prompt: q.prompt,
      userAnswer: userAnswer,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      type: q.type,
      options: 'options' in q ? q.options : undefined,
    };
  });

  results.value = detailedResults;
  showResult.value = true;
  // Scroll to results for better UX
  setTimeout(() => {
      const resultEl = document.getElementById('results-section');
      if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth' });
      }
  }, 100);
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series"
    unit-title="Unit 6: Present Perfect (I have done)"
    unit-description="Master the connection between the past and the present. This tense is crucial for describing experiences, recent events, and situations that continue up to now."
    :categories="['Tenses', 'Present Perfect', 'Intermediate']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><HelpCircle class="text-blue-500" /> Core Concepts</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The <strong>Present Perfect</strong> is a bridge. It connects a past action to the present moment. The structure is <strong>HAVE / HAS + Past Participle</strong> (e.g., seen, gone, written).</p>
          <p>Think of it in three main ways:</p>
          <ul class="list-disc space-y-2 pl-6">
            <li><strong>Present Result:</strong> An action happened in the past, but the result is important <em>now</em>. (e.g., "I <strong>have lost</strong> my wallet." - The result is I don't have it now.)</li>
            <li><strong>Life Experience:</strong> An action happened at some point in your life up to now. The exact time is not important. (e.g., "She <strong>has visited</strong> Japan twice.")</li>
            <li><strong>Unfinished Time:</strong> The action happened in a time period that is not over yet. (e.g., "I <strong>haven't seen</strong> her today.")</li>
          </ul>
        </CardContent>
      </Card>

      <Card class="w-full border-red-200 dark:border-red-900/50">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><AlertCircle class="text-red-500" />Crucial Contrast: Present Perfect vs. Simple Past</CardTitle>
          <CardDescription>This is the most common point of confusion. Master this difference!</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-bold text-green-600 dark:text-green-400">Present Perfect</h4>
              <p class="text-xs text-muted-foreground">Unspecified / Unfinished Time</p>
              <ul class="mt-2 list-disc space-y-2 pl-4">
                <li>I <strong>have seen</strong> that movie. (sometime in my life)</li>
                <li>He <strong>has broken</strong> his leg. (it's broken now)</li>
                <li>We <strong>have worked</strong> hard this week. (the week is not over)</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-blue-600 dark:text-blue-400">Simple Past</h4>
              <p class="text-xs text-muted-foreground">Specified / Finished Time</p>
              <ul class="mt-2 list-disc space-y-2 pl-4">
                <li>I <strong>saw</strong> that movie <strong>last night</strong>.</li>
                <li>He <strong>broke</strong> his leg <strong>when he was a child</strong>.</li>
                <li>We <strong>worked</strong> hard <strong>last week</strong>.</li>
              </ul>
            </div>
          </div>
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Golden Rule</AlertTitle>
            <AlertDescription>
              NEVER use the Present Perfect with a finished time expression like <code class="font-mono rounded bg-muted px-1 py-0.5">yesterday</code>, <code class="font-mono rounded bg-muted px-1 py-0.5">last year</code>, or <code class="font-mono rounded bg-muted px-1 py-0.5">in 1999</code>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Unit 6 Exercises</CardTitle>
          <CardDescription>Complete the sentences. Choose the best option or fill in the blank with the correct form of the verb in parentheses.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.prompt }}</p>
            
            <!-- Multiple Choice Question Type -->
            <div v-if="question.type === 'mcq' || question.type === 'mcq-complex'" class="pl-2">
              <RadioGroup v-model="userAnswers[question.id]">
                <div v-for="(option, key) in question.options" :key="key" class="flex items-center space-x-2 py-1">
                  <RadioGroupItem :id="`${question.id}-${key}`" :value="key" />
                  <Label :for="`${question.id}-${key}`" class="cursor-pointer">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <!-- Fill-in-the-blank Question Type -->
            <div v-if="question.type === 'fill'" class="pl-2">
              <Input
                v-model="userAnswers[question.id]"
                placeholder="Type the verb form..."
                class="max-w-sm"
                @keyup.enter="checkAnswers"
              />
            </div>
          </div>
          <Button @click="checkAnswers" :disabled="showResult" class="w-full">
            Check My Answers
          </Button>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <div class="flex items-center gap-4 pt-2">
              <Progress :model-value="scorePercentage" class="w-full" />
              <span class="font-bold text-lg whitespace-nowrap">{{ score }} / {{ questions.length }}</span>
            </div>
             <CardDescription class="pt-2">
              Score: {{ scorePercentage }}%. Review the detailed explanations below to understand any mistakes. This is the most important part of learning!
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="result in results" :key="result.id">
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="{'border-green-500': result.isCorrect, 'border-red-500': !result.isCorrect}">
                <component :is="result.isCorrect ? CheckCircle : XCircle" class="h-5 w-5" :class="{'text-green-500': result.isCorrect, 'text-red-500': !result.isCorrect}" />
                <AlertTitle class="font-bold text-base">{{ result.isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
                <AlertDescription class="space-y-3 mt-2">
                  <p class="font-semibold text-foreground">{{ result.prompt }}</p>
                  
                  <div class="text-sm rounded-md p-3" :class="result.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'">
                    <p>Your answer: <span class="font-bold">{{ result.type.includes('mcq') ? result.options[result.userAnswer] || 'No answer' : result.userAnswer }}</span></p>
                    <p v-if="!result.isCorrect">Correct answer: <span class="font-bold text-green-700 dark:text-green-400">{{ result.type.includes('mcq') ? result.options[result.correctAnswer] : result.correctAnswer }}</span></p>
                  </div>
                  
                  <div class="text-sm text-muted-foreground border-t pt-3 mt-3">
                    <strong class="text-foreground">Explanation:</strong> {{ result.explanation }}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style>
/* Optional: Add a subtle transition for the results appearing */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
