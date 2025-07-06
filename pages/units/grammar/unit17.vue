<!--
  File: @/pages/units/grammar/11.vue
  Description: An advanced grammar practice module for the "Used to (do)" concept.
  This page integrates learning material, challenging exercises, and a detailed
  validation system within the GrammarLayout, designed to significantly
  enhance a student's grammatical proficiency.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpenCheck, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
});

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/10")
}
function goToNextUnit() {
  router.push("/units/grammar/12")
}

const unitData = {
  testTitle: "English Grammar In Use: Advanced Practice",
  testDescription: "Based on the methodology of Raymond Murphy",
  unitTitle: "Unit 11: Used to (do)",
  unitDescription: "Mastering past habits and states, and distinguishing them from similar structures.",
  categories: ['Past Tense', 'Habits', 'States', 'Common Confusions']
};

const questions = reactive([
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: "Before she became a famous novelist, she ______ (work) as a journalist for a local newspaper.",
    correctAnswer: "used to work",
    explanation: "We use 'used to + base verb' to talk about a past state or repeated action that is no longer true. Her work as a journalist is a past state that ended when she became a novelist."
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: "It took me years, but I finally ______ waking up early for my job on the farm.",
    options: ["used to", "am used to", "got used to", "use to"],
    correctAnswer: "got used to",
    explanation: "'Got used to' describes the process of becoming accustomed to something. 'Am used to' implies you are already accustomed. 'Used to' refers to a past habit that is no more. The sentence implies a process of adaptation."
  },
  {
    id: 3,
    type: 'sentence-correction',
    prompt: "Did you used to have a bicycle when you were a young boy?",
    correctAnswer: "Did you use to have a bicycle when you were a young boy?",
    explanation: "In questions and negatives with 'did' or 'didn't', the main verb 'use' is in its base form. The 'd' from 'used' is absorbed by 'did'. The correct structure is 'Did + subject + use to...?'"
  },
  {
    id: 4,
    type: 'fill-in-the-blank-negative',
    prompt: "People ______ (rely) so heavily on the internet for information twenty years ago; they went to libraries instead.",
    correctAnswer: "didn't use to rely",
    explanation: "For the negative form, we use 'didn't use to + base verb'. This indicates a past habit or state that was not true in the past but may be true now."
  },
  {
    id: 5,
    type: 'multiple-choice',
    prompt: "My grandfather ______ tell us stories about the war, but he doesn't anymore.",
    options: ["would", "used to", "Both are correct", "Neither is correct"],
    correctAnswer: "Both are correct",
    explanation: "Both 'would' and 'used to' can describe repeated past actions or habits. However, 'would' cannot be used for past states (e.g., you can't say 'I would live in Paris'). Since 'telling stories' is an action, both are grammatically correct here."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    prompt: "I find it difficult to live in Tokyo. I _______ (not / be) the hustle and bustle of a huge city.",
    correctAnswer: "am not used to",
    explanation: "This question tests the difference between 'used to do' and 'be used to doing/something'. 'To be used to something' means 'to be accustomed to it'. The sentence is in the present tense ('I find it difficult'), so the correct form is 'am not used to'."
  },
  {
    id: 7,
    type: 'sentence-correction',
    prompt: "I remember that he was used to smoke a pipe, which always filled the room with a unique aroma.",
    correctAnswer: "I remember that he used to smoke a pipe, which always filled the room with a unique aroma.",
    explanation: "'Was used to smoke' is incorrect. To describe a past habit, the structure is simply 'used to + smoke'. The structure 'was used to + -ing' (e.g., 'was used to smoking') means 'was accustomed to', which has a different meaning and doesn't fit the context of a simple past habit."
  },
  {
    id: 8,
    type: 'multiple-choice',
    prompt: "Which sentence is grammatically INCORRECT?",
    options: [
        "We used to live in a smaller house.",
        "I'm not used to this cold weather.",
        "She didn't use to be so shy.",
        "They use to go for a walk every morning."
    ],
    correctAnswer: "They use to go for a walk every morning.",
    explanation: "The structure 'used to' is a fixed expression for the past. In affirmative statements, it must always be 'used to' with a 'd'. The form 'use to' is only correct in questions and negatives with 'did/didn't'."
  }
]);

const userAnswers = ref<string[]>(Array(questions.length).fill(''));
const showResults = ref(false);
const submissionAttempted = ref(false);

const results = computed(() => {
  if (!showResults.value) return [];
  return questions.map((q, index) => {
    const userAnswer = userAnswers.value[index]?.trim() ?? '';
    const correctAnswer = q.correctAnswer.trim();
    // Case-insensitive comparison for fill-in-the-blank type questions
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    return {
      ...q,
      userAnswer,
      isCorrect,
    };
  });
});

const score = computed(() => {
  if (!results.value.length) return 0;
  const correctCount = results.value.filter(r => r.isCorrect).length;
  return Math.round((correctCount / questions.length) * 100);
});

function handleSubmit() {
  submissionAttempted.value = true;
  showResults.value = true;
  const resultsElement = document.getElementById('results-section');
  if (resultsElement) {
    resultsElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetTest() {
  userAnswers.value = Array(questions.length).fill('');
  showResults.value = false;
  submissionAttempted.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    :test-title="unitData.testTitle"
    :test-description="unitData.testDescription"
    :unit-title="unitData.unitTitle"
    :unit-description="unitData.unitDescription"
    :categories="unitData.categories"
    :show-result="showResults"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpenCheck class="h-6 w-6 text-blue-600" />
            <span>Core Concepts: "Used to"</span>
          </CardTitle>
          <CardDescription>
            Understanding the form and function for past habits and states.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">1. Affirmative: Past Habits & States</h4>
            <p class="text-muted-foreground">
              We use <code class="bg-muted px-1 py-0.5 rounded font-mono text-sm">used to + base verb</code> to describe something that happened regularly in the past but doesn't happen anymore, or for a state that was true in the past but is not true now.
            </p>
            <p class="mt-2 pl-4 border-l-2 border-blue-500">
              <em>Example (Habit):</em> He <strong class="text-blue-700">used to play</strong> the guitar every day. (He doesn't play daily now).
            </p>
            <p class="mt-2 pl-4 border-l-2 border-blue-500">
              <em>Example (State):</em> I <strong class="text-blue-700">used to believe</strong> in Santa Claus. (I don't believe now).
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-base mb-2">2. Negative & Question Forms</h4>
            <p class="text-muted-foreground">
              The auxiliary verb <code class="bg-muted px-1 py-0.5 rounded font-mono text-sm">did</code> is used for questions and negatives. Note that 'used' becomes <strong class="text-red-600">'use'</strong> (base form). This is a very common mistake.
            </p>
            <p class="mt-2 pl-4 border-l-2 border-red-500">
              <em>Negative:</em> She <strong class="text-red-700">didn't use to</strong> like broccoli.
            </p>
            <p class="mt-2 pl-4 border-l-2 border-red-500">
              <em>Question:</em> <strong class="text-red-700">Did</strong> you <strong class="text-red-700">use to</strong> live here?
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-base mb-2">3. The "Be/Get Used To" Trap</h4>
            <p class="text-muted-foreground">
              Do not confuse <code class="bg-muted px-1 py-0.5 rounded font-mono text-sm">used to do</code> with <code class="bg-muted px-1 py-0.5 rounded font-mono text-sm">be/get used to doing</code>. They are completely different.
            </p>
             <p class="mt-2 pl-4 border-l-2 border-green-500">
              <code class="font-semibold">be used to + -ing/noun</code>: To be familiar or accustomed to something.
              <br>
              <em>Example:</em> As a nurse, I <strong class="text-green-700">am used to working</strong> long hours. (It's normal for me).
            </p>
             <p class="mt-2 pl-4 border-l-2 border-amber-500">
              <code class="font-semibold">get used to + -ing/noun</code>: The process of becoming familiar or accustomed.
              <br>
              <em>Example:</em> It took him a while to <strong class="text-amber-700">get used to the spicy food</strong>. (The process of adaptation).
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Apply your knowledge. Choose the correct form or fill in the blanks.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              <span class="text-primary font-bold mr-2">{{ index + 1 }}.</span>
              {{ question.prompt.split('______')[0] }}
              <template v-if="question.type.includes('fill-in-the-blank')">
                <Input
                  :id="`q${question.id}`"
                  v-model="userAnswers[index]"
                  class="inline-block w-auto mx-1 h-8"
                  :placeholder="question.type === 'fill-in-the-blank-negative' ? 'e.g., didn\'t use to...' : 'e.g., used to...'"
                  :disabled="showResults"
                />
              </template>
              {{ question.prompt.split('______')[1] }}
            </p>
            
            <template v-if="question.type === 'multiple-choice'">
              <RadioGroup v-model="userAnswers[index]" :disabled="showResults" class="space-y-2">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                  <Label :for="`q${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                </div>
              </RadioGroup>
            </template>
            
            <template v-if="question.type === 'sentence-correction'">
               <Input
                  :id="`q${question.id}`"
                  v-model="userAnswers[index]"
                  placeholder="Rewrite the corrected part or the full sentence."
                  :disabled="showResults"
                />
            </template>

          </div>
        </CardContent>
        <CardFooter>
          <Button @click="handleSubmit" :disabled="showResults" class="w-full md:w-auto">
            Check Answers & Get Feedback
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle class="text-2xl">Your Results</CardTitle>
                <CardDescription>Detailed feedback on your performance.</CardDescription>
              </div>
              <div class="flex items-center gap-4 w-full md:w-auto">
                 <div class="flex-1 text-center">
                    <p class="text-sm font-medium text-muted-foreground">Your Score</p>
                    <p :class="['font-bold text-3xl', score >= 70 ? 'text-green-600' : 'text-red-600']">{{ score }}%</p>
                </div>
                <Progress :model-value="score" class="w-full md:w-48" />
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(result, index) in results" :key="`result-${result.id}`">
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="result.isCorrect ? 'border-green-500' : 'border-red-500'">
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 mt-1" :class="result.isCorrect ? 'text-green-600' : 'text-red-600'" />
                <div class="ml-2">
                  <AlertTitle class="font-bold text-lg mb-2">Question {{ index + 1 }}</AlertTitle>
                  <AlertDescription class="space-y-4">
                    <p class="text-base"><em>Original Question:</em> "{{ result.prompt.replace(/______/g, '...') }}"</p>
                    
                    <div class="p-3 rounded-md" :class="result.isCorrect ? 'bg-green-50' : 'bg-red-50'">
                      <p><strong class="font-semibold">Your answer:</strong> <span :class="result.isCorrect ? 'text-green-800' : 'text-red-800 line-through'">{{ result.userAnswer || 'No answer provided' }}</span></p>
                      <p v-if="!result.isCorrect"><strong class="font-semibold">Correct answer:</strong> <span class="text-green-800">{{ result.correctAnswer }}</span></p>
                    </div>

                    <div class="p-4 rounded-md bg-sky-50 border border-sky-200">
                       <p class="flex items-center gap-2 font-semibold text-sky-800"><HelpCircle class="h-5 w-5"/><span>Explanation</span></p>
                       <p class="mt-2 text-sky-900">{{ result.explanation }}</p>
                    </div>
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="resetTest" variant="outline">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
