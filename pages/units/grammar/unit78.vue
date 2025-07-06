<!--
  File: @/pages/units/grammar/12.vue
  Unit: 12 - Singular and Plural
  Description: An advanced, interactive practice module on English noun plurality.
  This page leverages the GrammarLayout to provide a dual-pane learning experience,
  combining in-depth theoretical material with challenging practical exercises and
  a detailed, explanatory results validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming a 'shadcn-vue' or similar component library is set up.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

// --- Page-Specific Data and State ---

const showResult = ref(false)

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigates to the preceding unit, e.g., Unit 11.
  router.push("/units/grammar/11")
}
function goToNextUnit() {
  // Navigates to the subsequent unit, e.g., Unit 13.
  router.push("/units/grammar/13")
}

// --- Question and Answer Data Structure ---
// This is the core of the practice session. Each question is an object with all
// necessary data for rendering, interaction, and validation.
const questions = ref([
  {
    id: 1,
    type: 'fill-in-the-blank',
    text: 'Many economic ______ (crisis) have been caused by unstable financial markets.',
    userAnswer: '',
    correctAnswer: 'crises',
    isCorrect: null as boolean | null,
    explanation: "Nouns of Greek origin ending in '-is' often form their plural by changing '-is' to '-es'. Common examples include: crisis -> crises, analysis -> analyses, thesis -> theses.",
  },
  {
    id: 2,
    type: 'correction',
    prompt: 'Correct the noun error in the following sentence:',
    text: 'The police has received several important informations about the case.',
    userAnswer: '',
    correctAnswer: 'information',
    isCorrect: null as boolean | null,
    explanation: "'Information' is an uncountable noun, meaning it does not have a plural form. To refer to a specific item, you would say 'a piece of information'. The verb should also be 'have' to agree with 'The police' (treated as a plural noun). However, the primary error tested here is the noun form.",
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: 'Which sentence is grammatically correct?',
    options: [
      'The news are on at 10 p.m.',
      'The news is on at 10 p.m.',
      'A news is on at 10 p.m.'
    ],
    userAnswer: '',
    correctAnswer: 'The news is on at 10 p.m.',
    isCorrect: null as boolean | null,
    explanation: "'News' is a classic example of a noun that ends in '-s' but is singular and uncountable. Therefore, it takes a singular verb ('is' not 'are'). You cannot say 'a news'.",
  },
  {
    id: 4,
    type: 'fill-in-the-blank',
    text: 'The biologist is studying various ______ (bacterium) under the microscope.',
    userAnswer: '',
    correctAnswer: 'bacteria',
    isCorrect: null as boolean | null,
    explanation: "Nouns of Latin origin ending in '-um' often form their plural by changing '-um' to '-a'. Other examples include: curriculum -> curricula, datum -> data, medium -> media.",
  },
  {
    id: 5,
    type: 'fill-in-the-blank-complex',
    prompt: "Complete the sentence with the correct plural forms:",
    text: 'The two ______ (company) reported their ______ (half) year earnings, noting several new ______ (phenomenon) in the market.',
    userAnswer: { part1: '', part2: '', part3: '' },
    correctAnswer: { part1: 'companies', part2: 'half-year', part3: 'phenomena' },
    isCorrect: null as boolean | null,
    explanation: "1. 'Company' ends in a consonant + 'y', so the plural is formed by changing 'y' to 'ies'. 2. 'Half-year' is a compound adjective here modifying 'earnings' and does not get pluralized. If 'halves' were a noun, it would be plural. 3. 'Phenomenon' is another Greek-origin noun; its plural is 'phenomena'.",
  },
  {
    id: 6,
    type: 'correction',
    prompt: 'Correct the noun error in the following sentence:',
    text: 'My new jean is very comfortable, but the scissor I bought is not sharp.',
    userAnswer: '',
    correctAnswer: 'jeans are ... scissors are',
    isCorrect: null as boolean | null,
    explanation: "'Jeans' and 'scissors' are 'pair nouns' or 'pluralia tantum'—they are always plural and take a plural verb. You can say 'a pair of jeans/scissors' to refer to one item.",
  },
    {
    id: 7,
    type: 'multiple-choice',
    text: 'What do several species of ______ look like?',
    options: [
      'fishes',
      'fishs',
      'fish'
    ],
    userAnswer: '',
    correctAnswer: 'fish',
    isCorrect: null as boolean | null,
    explanation: "The noun 'fish' is irregular. The plural is usually also 'fish', especially when referring to them collectively. The form 'fishes' is used, but typically only when referring to multiple different *species* of fish. However, in the context 'species of ______', 'fish' is the standard collective term.",
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    text: 'The three ______ (attorney-general) met to discuss the new legislation.',
    userAnswer: '',
    correctAnswer: 'attorneys-general',
    isCorrect: null as boolean | null,
    explanation: "In compound nouns like 'attorney-general', the plural 's' is typically added to the principal word, which is 'attorney'. Other examples: passers-by, mothers-in-law.",
  },
]);

// --- Computed Properties for Results ---

const totalQuestions = computed(() => questions.value.length);
const correctAnswersCount = computed(() => questions.value.filter(q => q.isCorrect).length);
const score = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round((correctAnswersCount.value / totalQuestions.value) * 100);
});

const scoreMessage = computed(() => {
  if (score.value >= 90) return "Exceptional! You have a deep understanding of noun plurality.";
  if (score.value >= 75) return "Excellent work! You've mastered most of the concepts. Review the explanations for any tricky questions.";
  if (score.value >= 50) return "Good effort. This is a challenging topic. Pay close attention to the explanations to solidify your knowledge.";
  return "This unit requires more practice. Carefully study the material and the feedback provided, then try again.";
});

// --- Core Logic Functions ---

function validateAnswers() {
  questions.value.forEach(q => {
    let isMatch = false;
    if (q.type === 'fill-in-the-blank' || q.type === 'multiple-choice') {
      isMatch = q.userAnswer.toString().trim().toLowerCase() === q.correctAnswer.toString().toLowerCase();
    } else if (q.type === 'correction') {
      const userAnswerLower = q.userAnswer.toString().trim().toLowerCase();
      // Allow for some flexibility in correction answers
      if (q.id === 2) { // The 'informations' question
        isMatch = userAnswerLower.includes('information') && !userAnswerLower.includes('informations');
      } else if (q.id === 6) { // The 'jean/scissor' question
        isMatch = userAnswerLower.includes('jeans are') && userAnswerLower.includes('scissors are');
      }
    } else if (q.type === 'fill-in-the-blank-complex') {
        const userAnswer1 = q.userAnswer.part1.trim().toLowerCase();
        const userAnswer2 = q.userAnswer.part2.trim().toLowerCase();
        const userAnswer3 = q.userAnswer.part3.trim().toLowerCase();
        isMatch = userAnswer1 === q.correctAnswer.part1 && userAnswer2 === q.correctAnswer.part2 && userAnswer3 === q.correctAnswer.part3;
    }
    q.isCorrect = isMatch;
  });
  showResult.value = true;
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
  showResult.value = false;
  questions.value.forEach(q => {
    q.isCorrect = null;
    if (q.type === 'fill-in-the-blank-complex') {
        q.userAnswer = { part1: '', part2: '', part3: '' };
    } else {
        q.userAnswer = '';
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use"
    test-description="Advanced Practice inspired by Raymond Murphy"
    unit-title="Unit 12: Singular and Plural"
    unit-description="Mastering noun forms, from common rules to complex irregularities and uncountable nouns."
    :categories="['Nouns', 'Plurals', 'Countable', 'Uncountable']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material - The learning content                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Plural Nouns</CardTitle>
          <CardDescription>Understanding the fundamental rules and common exceptions for forming plurals.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-bold mb-2">Regular Plurals & Spelling Rules</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>Most nouns: add <code class="bg-muted px-1 rounded">-s</code> (e.g., car → cars, book → books).</li>
              <li>Nouns ending in -s, -sh, -ch, -x, -z: add <code class="bg-muted px-1 rounded">-es</code> (e.g., bus → buses, wish → wishes, match → matches).</li>
              <li>Nouns ending in consonant + -y: change <code class="bg-muted px-1 rounded">-y</code> to <code class="bg-muted px-1 rounded">-ies</code> (e.g., baby → babies, party → parties).</li>
              <li>Nouns ending in -f or -fe: often change to <code class="bg-muted px-1 rounded">-ves</code> (e.g., leaf → leaves, wife → wives).</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-2">Irregular Plurals</h4>
            <p>Some nouns have unique plural forms that must be memorized.</p>
            <ul class="list-disc pl-5 space-y-1 mt-1">
              <li>man → men, woman → women, child → children</li>
              <li>foot → feet, tooth → teeth, goose → geese</li>
              <li>mouse → mice, person → people</li>
              <li>Some are unchanged: sheep, deer, fish, species, series</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-2">Foreign Plurals</h4>
            <p>English has borrowed words with foreign pluralization rules.</p>
            <ul class="list-disc pl-5 space-y-1 mt-1">
              <li>-is → -es: crisis → crises, analysis → analyses</li>
              <li>-um → -a: bacterium → bacteria, curriculum → curricula</li>
              <li>-us → -i: cactus → cacti, fungus → fungi</li>
              <li>-on → -a: phenomenon → phenomena, criterion → criteria</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Advanced Concepts: Countability</CardTitle>
          <CardDescription>Distinguishing between nouns that can be counted and those that cannot.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
           <div>
            <h4 class="font-bold mb-2">Uncountable Nouns</h4>
            <p>These nouns are treated as a single mass or concept and do not have a plural form. They take a singular verb.</p>
            <p class="mt-1">Common examples: <code class="bg-muted px-1 rounded">information, advice, furniture, luggage, news, water, rice, money</code>.</p>
            <p class="mt-2 text-destructive">Incorrect: <span class="line-through">I need some advices.</span></p>
            <p class="text-green-600">Correct: I need some <span class="font-bold">advice</span>. (Or: I need a <span class="font-bold">piece of</span> advice.)</p>
          </div>
           <div>
            <h4 class="font-bold mb-2">Pluralia Tantum (Pair Nouns)</h4>
            <p>These nouns refer to items with two parts and are always plural, taking a plural verb.</p>
            <p class="mt-1">Common examples: <code class="bg-muted px-1 rounded">trousers, scissors, glasses, jeans, shorts, pyjamas</code>.</p>
            <p class="mt-2 text-destructive">Incorrect: <span class="line-through">Where is my scissors?</span></p>
            <p class="text-green-600">Correct: Where <span class="font-bold">are</span> my <span class="font-bold">scissors</span>? (Or: Where is my <span class="font-bold">pair of</span> scissors?)</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice - The interactive questions                              -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Precision is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}.
              <span v-if="q.prompt" class="font-normal italic">{{ q.prompt }}</span>
            </p>
            <p class="pl-5 text-muted-foreground" v-if="q.type !== 'multiple-choice'">{{ q.text }}</p>

            <!-- Fill-in-the-blank -->
            <div v-if="q.type === 'fill-in-the-blank'" class="pl-5">
              <Input
                :id="`q${q.id}`"
                v-model="q.userAnswer"
                placeholder="Type the correct form"
                class="max-w-sm"
                @keyup.enter="validateAnswers"
              />
            </div>
            
            <!-- Sentence Correction -->
            <div v-if="q.type === 'correction'" class="pl-5 space-y-2">
                <p class="border-l-4 border-primary/50 pl-3 py-1 bg-muted/50 rounded-r-md">"{{ q.text }}"</p>
                <Input
                    :id="`q${q.id}`"
                    v-model="q.userAnswer"
                    placeholder="Type the corrected sentence"
                    @keyup.enter="validateAnswers"
                />
            </div>

            <!-- Multiple Choice -->
            <div v-if="q.type === 'multiple-choice'" class="pl-5">
              <RadioGroup v-model="q.userAnswer" class="space-y-2">
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                  <Label :for="`${q.id}-${option}`" class="font-normal">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Complex Fill-in-the-blank -->
            <div v-if="q.type === 'fill-in-the-blank-complex'" class="pl-5 space-y-3">
                <div class="flex flex-col sm:flex-row gap-2 items-center">
                    <Input v-model="q.userAnswer.part1" placeholder="Company" class="flex-1" @keyup.enter="validateAnswers"/>
                    <Input v-model="q.userAnswer.part2" placeholder="Half" class="flex-1" @keyup.enter="validateAnswers"/>
                    <Input v-model="q.userAnswer.part3" placeholder="Phenomenon" class="flex-1" @keyup.enter="validateAnswers"/>
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers">Check Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result - The validation and feedback section                      -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance and learn from the detailed explanations.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score Summary -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Summary</h3>
            <div class="flex items-center gap-4">
              <span class="text-4xl font-bold">{{ score }}%</span>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground">{{ correctAnswersCount }} / {{ totalQuestions }} correct</p>
                <Progress :model-value="score" class="mt-1" />
              </div>
            </div>
            <Alert :variant="score >= 75 ? 'default' : 'destructive'" class="mt-4">
              <Lightbulb class="h-4 w-4" />
              <AlertTitle>Feedback</AlertTitle>
              <AlertDescription>{{ scoreMessage }}</AlertDescription>
            </Alert>
          </div>

          <!-- Detailed Question-by-Question Breakdown -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Detailed Breakdown</h3>
            <div v-for="q in questions" :key="q.id">
              <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
                <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                <AlertTitle class="mb-2">{{ q.isCorrect ? 'Correct' : 'Incorrect' }}</AlertTitle>
                <AlertDescription class="space-y-2">
                  <p><strong class="pr-2">Question:</strong><span class="italic text-muted-foreground">{{ q.text }}</span></p>
                  
                  <p v-if="q.type === 'fill-in-the-blank-complex'">
                    <strong class="pr-2">Your Answer:</strong>
                    <code class="bg-background px-1 rounded">{{ q.userAnswer.part1 || 'empty' }}</code>,
                    <code class="bg-background px-1 rounded">{{ q.userAnswer.part2 || 'empty' }}</code>,
                    <code class="bg-background px-1 rounded">{{ q.userAnswer.part3 || 'empty' }}</code>
                  </p>
                  <p v-else><strong class="pr-2">Your Answer:</strong><code class="bg-background px-1 rounded">{{ q.userAnswer || 'No answer' }}</code></p>
                  
                  <p v-if="!q.isCorrect">
                    <strong class="pr-2">Correct Answer:</strong>
                    <code v-if="q.type === 'fill-in-the-blank-complex'" class="bg-background px-1 rounded">{{ q.correctAnswer.part1 }}, {{ q.correctAnswer.part2 }}, {{ q.correctAnswer.part3 }}</code>
                    <code v-else class="bg-background px-1 rounded">{{ q.correctAnswer }}</code>
                  </p>
                  
                  <div class="!mt-4 pt-3 border-t border-current/20">
                    <p class="font-semibold text-foreground">Explanation:</p>
                    <p>{{ q.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="resetTest">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
