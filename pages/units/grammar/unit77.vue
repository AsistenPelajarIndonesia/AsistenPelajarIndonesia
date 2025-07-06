<!--
  File: @/pages/units/grammar/11.vue
  Description: A dedicated practice page for Unit 11 of English Grammar in Use,
  focusing on the complex rules of using the definite article "the" with names.
  This page integrates learning material, challenging exercises, and a detailed
  results validator to create a powerful educational experience.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import GrammarLayout from '@/layouts/GrammarLayout.vue';

// Component Imports from a hypothetical UI library (as per the layout)
// In a real project, these would be installed and configured.
// For example, using shadcn-vue:
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, BookOpen, BrainCircuit } from 'lucide-vue-next';

definePageMeta({
  layout: false, // We are using our own layout component directly
});

const router = useRouter();

// --- Navigation ---
// Functions to navigate to adjacent units as requested.
function goToPreviousUnit() {
  router.push("/units/grammar/10"); // Previous unit
}
function goToNextUnit() {
  router.push("/units/grammar/12"); // Next unit
}

// --- Page State Management ---
const showResult = ref(false);

// --- Questions and Answers Data ---
// The core data for the exercise. Each question includes a detailed explanation
// to provide insightful feedback, emulating a teacher's guidance.
// The `---` convention is used for no article.
const questions = ref([
  {
    id: 1,
    text: "During our trip to Europe, we crossed ___ Alps to get from France to Italy, and later we swam in ___ Lake Geneva.",
    answers: ["the", "---"],
    explanation: "We use 'the' with names of mountain ranges (the Alps, the Rockies), but not with names of single lakes (Lake Geneva, Lake Superior).",
  },
  {
    id: 2,
    text: "She got her degree from ___ University of California, while her brother attended ___ Harvard University.",
    answers: ["the", "---"],
    explanation: "Use 'the' for names with the pattern 'the University of [Place]' (the University of California). Do not use 'the' when the name starts with a place name (Harvard University, Oxford University).",
  },
  {
    id: 3,
    text: "The cargo ship sailed from ___ North Sea, through ___ English Channel, and into ___ Atlantic Ocean.",
    answers: ["the", "the", "the"],
    explanation: "We always use 'the' with the names of seas (the North Sea), channels (the English Channel), and oceans (the Atlantic Ocean).",
  },
  {
    id: 4,
    text: "My flight to ___ United States departed from ___ Heathrow Airport and had a layover in ___ Netherlands.",
    answers: ["the", "---", "the"],
    explanation: "We use 'the' with countries whose names are plural (the Netherlands) or include words like 'Kingdom', 'Republic', or 'States' (the United States). We do not use 'the' with names of airports (Heathrow Airport).",
  },
  {
    id: 5,
    text: "The tour included a visit to ___ Tower of London and a walk across ___ London Bridge, which spans ___ River Thames.",
    answers: ["the", "---", "the"],
    explanation: "Use 'the' with names of famous buildings or landmarks that contain 'of' (the Tower of London) and with rivers (the River Thames). Do not use 'the' with most bridges (London Bridge, Brooklyn Bridge).",
  },
  {
    id: 6,
    text: "He lives on ___ Baker Street, not far from ___ British Museum, which is a major tourist attraction in London.",
    answers: ["---", "the"],
    explanation: "We do not use 'the' with names of streets (Baker Street, Oxford Street). We usually use 'the' with names of museums and galleries (the British Museum, the Louvre).",
  },
  {
    id: 7,
    text: "They explored ___ Gobi Desert on camelback and then took a boat trip to ___ Canary Islands.",
    answers: ["the", "the"],
    explanation: "We use 'the' with the names of deserts (the Gobi Desert, the Sahara) and groups of islands (the Canary Islands, the Bahamas).",
  },
  {
    id: 8,
    text: "The Suez Canal connects ___ Mediterranean Sea to ___ Red Sea, providing a crucial shortcut for international shipping.",
    answers: ["the", "the"],
    explanation: "We use 'the' with the names of canals (the Suez Canal, the Panama Canal) and seas (the Mediterranean Sea, the Red Sea).",
  },
  {
    id: 9,
    text: "Is ___ Mount Everest, located in ___ Himalayas, the tallest mountain in ___ world?",
    answers: ["---", "the", "the"],
    explanation: "We do not use 'the' with single mountains (Mount Everest, Mount Fuji). We use 'the' with mountain ranges (the Himalayas). 'The world' is a fixed expression that always uses 'the'.",
  },
  {
    id: 10,
    text: "He took a train from ___ Victoria Station to visit ___ Buckingham Palace, the official residence of the monarch.",
    answers: ["---", "---"],
    explanation: "We do not use 'the' with names of railway stations (Victoria Station) or with many important public buildings, especially if they are named after a person or place (Buckingham Palace, Edinburgh Castle). Note: 'the White House' is a common exception."
  }
]);

// --- User Interaction and Validation Logic ---
// Initialize user answers based on the number of blanks in the questions.
const totalBlanks = computed(() => questions.value.reduce((acc, q) => acc + q.answers.length, 0));
const userAnswers = ref<string[]>(Array(totalBlanks.value).fill(''));

// A more structured results object for detailed feedback.
const results = ref({
  score: 0,
  details: [] as {
    questionId: number;
    questionText: string;
    isCorrect: boolean;
    userAnswers: string[];
    correctAnswers: string[];
    explanation: string;
  }[]
});

function getBlanksForQuestion(index: number) {
  let startIndex = 0;
  for (let i = 0; i < index; i++) {
    startIndex += questions.value[i].answers.length;
  }
  const endIndex = startIndex + questions.value[index].answers.length;
  return { startIndex, endIndex };
}

// The "Awesome Validator" function
function validateAnswers() {
  let correctCount = 0;
  const newDetails = [];

  questions.value.forEach((q, index) => {
    const { startIndex, endIndex } = getBlanksForQuestion(index);
    const questionUserAnswers = userAnswers.value.slice(startIndex, endIndex);

    const normalizedUserAnswers = questionUserAnswers.map(a => a.trim().toLowerCase());
    const normalizedCorrectAnswers = q.answers.map(a => a.trim().toLowerCase());

    // Handle "no article" case where user might leave it blank or type "---"
    const finalUserAnswers = normalizedUserAnswers.map(a => a === '' ? '---' : a);
    
    let isQuestionCorrect = true;
    for (let i = 0; i < finalUserAnswers.length; i++) {
        if (finalUserAnswers[i] !== normalizedCorrectAnswers[i]) {
            isQuestionCorrect = false;
        } else {
            correctCount++;
        }
    }

    newDetails.push({
      questionId: q.id,
      questionText: q.text,
      isCorrect: isQuestionCorrect,
      userAnswers: questionUserAnswers,
      correctAnswers: q.answers,
      explanation: q.explanation,
    });
  });

  results.value = {
    score: Math.round((correctCount / totalBlanks.value) * 100),
    details: newDetails,
  };

  showResult.value = true;
  // Scroll to results for better UX on mobile
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function resetTest() {
  userAnswers.value.fill('');
  showResult.value = false;
  results.value = { score: 0, details: [] };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestionText(text: string) {
    return text.split('___').map((part, i, arr) => {
        return i < arr.length - 1 ? [part, '___'] : [part];
    }).flat();
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate Grammar Practice"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 11: Names with and without 'the' (2)"
    unit-description="This unit covers the specific rules for using the definite article 'the' with geographical names, streets, buildings, and other proper nouns."
    :categories="['Articles', 'Nouns', 'Proper Names']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- Learning Material Slot -->
    <template #material>
      <Card class="w-full">
        <CardHeader class="flex-row items-center gap-3">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Concepts: When to Use 'the'</CardTitle>
            <CardDescription>Master the rules before you practice.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">Rule 1: Geographical Features</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Use <code class="bg-green-100 dark:bg-green-900 p-1 rounded">'the'</code> with:</strong> Oceans, Seas, Rivers, Canals, Deserts, Mountain Ranges, and Island Groups.
                <br><span class="text-muted-foreground">Examples: <strong>the</strong> Atlantic Ocean, <strong>the</strong> Nile, <strong>the</strong> Suez Canal, <strong>the</strong> Sahara, <strong>the</strong> Alps, <strong>the</strong> Philippines.</span>
              </li>
              <li><strong>Do NOT use <code class="bg-red-100 dark:bg-red-900 p-1 rounded">'the'</code> with:</strong> Single Mountains, Single Lakes, Single Islands, Continents, Countries, States, Cities.
                <br><span class="text-muted-foreground">Examples: Mount Everest, Lake Superior, Sicily, Asia, Spain, Texas, Paris.</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">Rule 2: Countries & Places</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Use <code class="bg-green-100 dark:bg-green-900 p-1 rounded">'the'</code> for plural names or names with 'Republic', 'Kingdom', 'States'.</strong>
                <br><span class="text-muted-foreground">Examples: <strong>the</strong> Netherlands, <strong>the</strong> United States, <strong>the</strong> United Kingdom, <strong>the</strong> Republic of Ireland.</span>
              </li>
              <li><strong>Use <code class="bg-green-100 dark:bg-green-900 p-1 rounded">'the'</code> for names using the structure 'the ... of ...'.</strong>
                <br><span class="text-muted-foreground">Examples: <strong>the</strong> University <strong>of</strong> Cambridge, <strong>the</strong> Tower <strong>of</strong> London, <strong>the</strong> Great Wall <strong>of</strong> China.</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">Rule 3: Buildings, Streets, and Locations</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Use <code class="bg-green-100 dark:bg-green-900 p-1 rounded">'the'</code> with:</strong> Most Hotels, Theatres, Cinemas, Museums, Galleries, and unique landmarks.
                <br><span class="text-muted-foreground">Examples: <strong>the</strong> Hilton, <strong>the</strong> National Theatre, <strong>the</strong> British Museum, <strong>the</strong> Eiffel Tower.</span>
              </li>
              <li><strong>Do NOT use <code class="bg-red-100 dark:bg-red-900 p-1 rounded">'the'</code> with:</strong> Streets, Squares, Parks, Airports, Stations, Universities (most), Castles, Cathedrals.
                <br><span class="text-muted-foreground">Oxford Street, Times Square, Heathrow Airport, Victoria Station, Harvard University, Edinburgh Castle.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- Practice Questions Slot -->
    <template #practice>
      <Card class="w-full">
        <CardHeader class="flex-row items-center gap-3">
          <BrainCircuit class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>
              Complete the sentences with 'the' or leave it blank.
              <strong class="text-primary">For blanks, type --- (three hyphens).</strong>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers">
            <div class="space-y-6">
              <div v-for="(question, qIndex) in questions" :key="question.id" class="flex flex-col gap-2">
                <label :for="'q' + question.id" class="text-base">
                  {{ question.id }}.
                    <template v-for="(part, pIndex) in renderQuestionText(question.text)">
                        <template v-if="part === '___'">
                             <Input
                                :id="`q${question.id}-${pIndex}`"
                                v-model="userAnswers[getBlanksForQuestion(qIndex).startIndex + (pIndex-1)/2]"
                                class="inline-block w-24 h-8 mx-1 p-1 text-center border-b-2 border-primary focus:border-ring"
                                placeholder="the / ---"
                                :disabled="showResult"
                            />
                        </template>
                        <template v-else>{{ part }}</template>
                    </template>
                </label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" @click="validateAnswers" class="w-full">Check My Answers</Button>
          <Button v-else @click="resetTest" variant="secondary" class="w-full">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- Results Slot -->
    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>Review your performance and learn from the explanations.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <Alert :class="results.score > 70 ? 'border-green-500' : 'border-amber-500'">
              <AlertTitle class="text-lg font-bold">Overall Score: {{ results.score }}%</AlertTitle>
              <AlertDescription>
                {{ results.score >= 80 ? 'Excellent work! You have a strong grasp of these rules.' : results.score >= 50 ? 'Good effort! Review the explanations below to improve.' : 'This is a tricky topic. Review the material and try again!' }}
              </AlertDescription>
            </Alert>
            
            <!-- Detailed Breakdown -->
            <div class="space-y-4">
              <div v-for="res in results.details" :key="res.questionId" class="p-4 rounded-md border" :class="res.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <CheckCircle2 v-if="res.isCorrect" class="h-6 w-6 text-green-600 dark:text-green-400" />
                    <XCircle v-else class="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div class="flex-grow">
                    <p class="font-semibold text-base mb-2">Question {{ res.questionId }}</p>
                    <p class="text-muted-foreground mb-3">{{ res.questionText }}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div class="bg-background/50 p-2 rounded">
                            <strong>Your Answer:</strong>
                            <span v-for="(answer, i) in res.userAnswers" :key="i"
                                class="font-mono p-1 rounded mx-1"
                                :class="answer.trim().toLowerCase().replace('---','') === res.correctAnswers[i].trim().toLowerCase().replace('---','') ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 line-through'">
                                {{ answer || '---' }}
                            </span>
                        </div>
                        <div class="bg-background/50 p-2 rounded">
                            <strong>Correct Answer:</strong>
                            <span v-for="answer in res.correctAnswers" :key="answer"
                                class="font-mono p-1 rounded mx-1 bg-green-200 dark:bg-green-800">
                                {{ answer }}
                            </span>
                        </div>
                    </div>

                    <div v-if="!res.isCorrect" class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-800">
                        <p class="font-semibold text-blue-800 dark:text-blue-300">💡 Explanation</p>
                        <p class="text-blue-700 dark:text-blue-200 text-sm">{{ res.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
             <Button @click="resetTest" variant="secondary" class="w-full">Practice Again</Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles for this component can be added here if needed */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
