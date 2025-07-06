<!--
  File: @/pages/units/grammar/1.vue
  Unit: 1
  Topic: There's no point in -ing; It's worth -ing etc.
  Description: An advanced practice module focusing on common English expressions followed by a gerund (-ing form).
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'nuxt/app'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // In a real application, you might want to disable this or route to an index
  alert('You are at the first unit.')
  // router.push("/units/grammar/0") 
}
function goToNextUnit() {
  router.push("/units/grammar/2")
}

// --- UNIT DATA ---
const unitDetails = {
  testTitle: "Advanced English Grammar Practice",
  testDescription: "Based on 'English Grammar in Use' by Raymond Murphy.",
  unitTitle: "Unit 1: Gerunds after specific expressions",
  unitDescription: "Mastering structures like 'There's no point in -ing', 'It's worth -ing', and other common patterns.",
  categories: ['Gerunds', 'Verb Patterns', 'Advanced Structures']
}

// --- QUESTION & ANSWER STRUCTURE ---
interface Question {
  id: number;
  type: 'mcq' | 'fill-in' | 'transform';
  questionText: string;
  options?: string[];
  prompt?: string;
  initialSentence?: string;
  correctAnswer: string;
  explanation: string;
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'mcq',
    questionText: "The car keeps breaking down. Honestly, ______ trying to repair it anymore; we should just buy a new one.",
    options: ["it's no point", "it's no use", "it's worth", "it's busy"],
    correctAnswer: "it's no use",
    explanation: "Both 'It's no use' and 'There's no point in' are correct for expressing that an action is futile. They must be followed by a gerund (-ing form). 'It's no point' is grammatically incorrect; the correct phrasing is 'There's no point in'."
  },
  {
    id: 2,
    type: 'fill-in',
    questionText: "The exhibition was fascinating. It was definitely ______.",
    prompt: "Complete the sentence using 'worth' and the gerund of 'see'.",
    correctAnswer: "worth seeing",
    explanation: "'It's worth -ing' is used to say something is enjoyable or useful. The structure is [be] + worth + gerund. 'Worth seeing' correctly applies this pattern."
  },
  {
    id: 3,
    type: 'transform',
    questionText: "Rewrite the following sentence using the expression 'have difficulty'.",
    initialSentence: "I find it hard to understand his accent.",
    prompt: "Your new sentence:",
    correctAnswer: "I have difficulty understanding his accent.",
    explanation: "The pattern 'to have difficulty -ing' is a common way to express challenges. It replaces 'find it hard to + infinitive'. Note the use of the gerund 'understanding' directly after 'difficulty'."
  },
  {
    id: 4,
    type: 'mcq',
    questionText: "Don't bother him right now. He's ______ preparing for his final exams.",
    options: ["worth", "no use", "busy", "a problem"],
    correctAnswer: "busy",
    explanation: "The structure '(be) busy -ing' is used to say what someone is occupied with. 'He is busy preparing' is the correct and natural-sounding application of this rule."
  },
  {
    id: 5,
    type: 'fill-in',
    questionText: "We wanted to go to the concert, but ______ getting tickets was impossible as they sold out in minutes.",
    prompt: "Complete the sentence using 'there was no point in' and the gerund of 'try'.",
    correctAnswer: "there was no point in trying",
    explanation: "This tests the past tense. 'There's no point in' becomes 'There was no point in'. It signifies that the attempt would have been futile from the start. It is followed by the gerund 'trying'."
  },
  {
    id: 6,
    type: 'transform',
    questionText: "Rewrite the sentence to express that the action was not useful, using 'it was no good'.",
    initialSentence: "We warned them, but it didn't help.",
    prompt: "Your new sentence:",
    correctAnswer: "It was no good warning them.",
    explanation: " 'It was no good -ing' is the past tense form of 'It's no good -ing' and is a synonym for 'It was no use -ing'. It effectively conveys that the action of 'warning' had no positive outcome."
  }
]);

// --- REACTIVE STATE MANAGEMENT ---
const userAnswers = reactive<Record<number, string>>({});
const results = ref<Array<{ id: number; isCorrect: boolean; explanation: string; userAnswer: string; correctAnswer: string; }>>([]);
const showResult = ref(false);

const score = computed(() => {
  if (results.value.length === 0) return 0;
  const correctCount = results.value.filter(r => r.isCorrect).length;
  return Math.round((correctCount / questions.value.length) * 100);
});

const progressColor = computed(() => {
    if (score.value < 40) return 'bg-red-600';
    if (score.value < 75) return 'bg-yellow-500';
    return 'bg-green-600';
});

// --- CORE LOGIC ---
function validateAnswers() {
  const newResults = questions.value.map(q => {
    const userAnswer = userAnswers[q.id]?.trim() || '';
    const isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
    return {
      id: q.id,
      isCorrect,
      explanation: q.explanation,
      userAnswer: userAnswer || "No answer",
      correctAnswer: q.correctAnswer
    };
  });
  results.value = newResults;
  showResult.value = true;
  
  // Scroll to results
  setTimeout(() => {
    const resultElement = document.getElementById('results-section');
    resultElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function resetQuiz() {
  for (const key in userAnswers) {
    delete userAnswers[key];
  }
  results.value = [];
  showResult.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Initialize userAnswers object ---
questions.value.forEach(q => {
  userAnswers[q.id] = '';
});
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
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
          <CardTitle>Core Concepts: Expressions + Gerund</CardTitle>
          <CardDescription>
            Certain English expressions require the verb that follows them to be in the gerund (-ing) form. 
            Understanding these fixed patterns is crucial for fluent, natural-sounding English.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h3 class="font-semibold text-base mb-1">1. Expressing Futility</h3>
            <p><code class="font-mono bg-muted p-1 rounded">There's no point in -ing</code></p>
            <p><code class="font-mono bg-muted p-1 rounded">It's no use -ing</code></p>
            <p><code class="font-mono bg-muted p-1 rounded">It's no good -ing</code></p>
            <p class="mt-2 text-muted-foreground">These expressions mean an action is a waste of time or will not have a result.</p>
            <ul class="mt-2 list-disc list-inside space-y-1">
              <li>There's no point in <span class="font-semibold">arguing</span>. He's already made his decision.</li>
              <li>It's no use <span class="font-semibold">complaining</span>; nobody will do anything about it.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-base mb-1">2. Expressing Value or Benefit</h3>
            <p><code class="font-mono bg-muted p-1 rounded">(It's) worth -ing</code></p>
            <p class="mt-2 text-muted-foreground">This indicates that an action is useful, enjoyable, or recommended.</p>
            <ul class="mt-2 list-disc list-inside space-y-1">
              <li>Is this book worth <span class="font-semibold">reading</span>?</li>
              <li>The view from the top was amazing. It was worth <span class="font-semibold">climbing</span> all those stairs.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-base mb-1">3. Expressing Difficulty</h3>
            <p><code class="font-mono bg-muted p-1 rounded">(have) difficulty / trouble / a problem -ing</code></p>
            <p class="mt-2 text-muted-foreground">Used to describe challenges or problems with performing an action.</p>
            <ul class="mt-2 list-disc list-inside space-y-1">
              <li>I had a lot of trouble <span class="font-semibold">finding</span> the place.</li>
              <li>Did you have any difficulty <span class="font-semibold">getting</span> a visa?</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-base mb-1">4. Expressing Occupation</h3>
            <p><code class="font-mono bg-muted p-1 rounded">(be) busy -ing</code></p>
            <p class="mt-2 text-muted-foreground">This common pattern explains what a person is occupied with.</p>
            <ul class="mt-2 list-disc list-inside space-y-1">
              <li>She was busy <span class="font-semibold">writing</span> her report when I called.</li>
            </ul>
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
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Test your understanding. Complete the exercises below and check your answers.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold">
              {{ index + 1 }}. {{ q.questionText }}
            </p>
            
            <!-- MCQ Question Type -->
            <div v-if="q.type === 'mcq' && q.options">
              <RadioGroup v-model="userAnswers[q.id]" class="gap-2">
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                  <Label :for="`${q.id}-${option}`">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Fill-in Question Type -->
            <div v-if="q.type === 'fill-in'" class="space-y-2">
                <Label :for="`q-${q.id}`" class="text-sm text-muted-foreground italic">{{ q.prompt }}</Label>
                <Input :id="`q-${q.id}`" v-model="userAnswers[q.id]" type="text" placeholder="Your answer..." />
            </div>

            <!-- Transform Question Type -->
            <div v-if="q.type === 'transform'" class="space-y-2">
                <p class="italic bg-muted p-3 rounded-md">"{{ q.initialSentence }}"</p>
                <Label :for="`q-${q.id}`" class="text-sm text-muted-foreground">{{ q.prompt }}</Label>
                <Input :id="`q-${q.id}`" v-model="userAnswers[q.id]" type="text" placeholder="Rewrite the sentence..." />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" @click="validateAnswers">Check My Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <span class="text-2xl font-bold">{{ score }}%</span>
            <Progress :model-value="score" class="w-[60%]" :class="progressColor" />
          </div>
          <CardDescription>
            Review the detailed explanations below to understand your mistakes and reinforce your learning.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div 
            v-for="(result, index) in results" 
            :key="result.id"
            class="p-4 rounded-lg border"
            :class="result.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'"
          >
            <div class="flex items-start gap-3">
              <div class="mt-1">
                <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-600" />
                <AlertCircle v-else class="h-5 w-5 text-red-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-sm">Question {{ index + 1 }}</p>
                
                <p class="mt-2 text-sm">
                  <span class="font-medium">Your answer:</span>
                  <span :class="result.isCorrect ? 'text-green-800' : 'text-red-800'" class="italic"> "{{ result.userAnswer }}"</span>
                </p>

                <div v-if="!result.isCorrect" class="mt-1 text-sm">
                  <span class="font-medium">Correct answer:</span>
                  <span class="italic text-gray-700 dark:text-gray-300">"{{ result.correctAnswer }}"</span>
                </div>

                <div class="mt-3 pt-3 border-t border-dashed" :class="result.isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'">
                  <p class="text-xs font-semibold uppercase text-muted-foreground">Explanation</p>
                  <p class="mt-1 text-sm text-gray-800 dark:text-gray-200">{{ result.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full" @click="resetQuiz">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
