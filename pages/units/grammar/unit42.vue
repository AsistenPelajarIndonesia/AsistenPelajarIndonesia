<template>
  <GrammarLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: In-depth Explanations & Examples                           -->
    <!-- Inspired by pedagogical scaffolding: building from simple to complex. -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: The Passive Voice Structure</CardTitle>
          <CardDescription>Understanding the fundamental forms of the passive across different tenses.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <p class="text-sm text-muted-foreground">
            The passive voice is formed using the appropriate tense of the verb <b class="font-semibold text-primary">'to be'</b> followed by the <b class="font-semibold text-primary">past participle</b> of the main verb. The focus shifts from the doer of the action (the agent) to the recipient of the action.
          </p>
          <div class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tense</TableHead>
                  <TableHead>Passive Structure</TableHead>
                  <TableHead>Example Sentence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell class="font-medium">Present Continuous</TableCell>
                  <TableCell><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">is/are being + done</code></TableCell>
                  <TableCell>The new bridge <b class="text-green-600">is being built</b> right now.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-medium">Past Continuous</TableCell>
                  <TableCell><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">was/were being + done</code></TableCell>
                  <TableCell>The road <b class="text-green-600">was being repaired</b> when the accident happened.</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell class="font-medium">Present Perfect</TableCell>
                  <TableCell><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">has/have been + done</code></TableCell>
                  <TableCell>My car <b class="text-green-600">has just been stolen</b>!</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell class="font-medium">Past Perfect</TableCell>
                  <TableCell><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">had been + done</code></TableCell>
                  <TableCell>I realised the windows <b class="text-green-600">had been cleaned</b>.</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell class="font-medium">Modals</TableCell>
                  <TableCell><code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">modal + be + done</code></TableCell>
                  <TableCell>This work <b class="text-green-600">must be finished</b> by Friday.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Teacher's Insight: When and Why to Use the Passive</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
          <p><strong class="text-primary">1. Unknown or Unimportant Agent:</strong> Use the passive when the person or thing doing the action is unknown or not important.</p>
          <p class="pl-4 italic text-muted-foreground">My wallet <b class="text-purple-600">was taken</b> yesterday. (We don't know who took it.)</p>
          <p><strong class="text-primary">2. Obvious Agent:</strong> When the agent is so obvious from the context that it doesn't need to be stated.</p>
          <p class="pl-4 italic text-muted-foreground">The suspect <b class="text-purple-600">has been arrested</b>. (Obviously by the police.)</p>
          <p><strong class="text-primary">3. Formal or Scientific Writing:</strong> To create an objective and impersonal tone, common in reports and scientific papers.</p>
          <p class="pl-4 italic text-muted-foreground">The solution <b class="text-purple-600">was heated</b> to 100°C. (The process is more important than the researcher.)</p>
           <p><strong class="text-primary">4. Emphasizing the Recipient:</strong> To place emphasis on the person or thing affected by the action.</p>
          <p class="pl-4 italic text-muted-foreground">The Mona Lisa <b class="text-purple-600">was painted</b> by Leonardo da Vinci. (The focus is on the masterpiece, not the artist in this context.)</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Challenging Exercises to Test Understanding                -->
    <!-- A mix of transformation, gap-fill, and error correction.              -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the tasks below. Pay close attention to tense and context.</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-8" @submit.prevent="validateAnswers">
            <div v-for="(question, index) in questions" :key="question.id" class="grid gap-2">
              <Label :for="`q${question.id}`">
                <span class="font-semibold">Question {{ index + 1 }}:</span> {{ question.instruction }}
              </Label>
              <div class="prose prose-sm max-w-none rounded-md border bg-slate-50 p-3">
                <p v-html="question.text"></p>
              </div>
              <Input
                :id="`q${question.id}`"
                v-model="userAnswers[index]"
                :disabled="isSubmitted"
                placeholder="Type your answer here..."
                class="mt-2"
                autocomplete="off"
              />
            </div>
            <div class="flex justify-end gap-2">
               <Button type="button" variant="outline" :disabled="!canReset" @click="resetQuiz">Try Again</Button>
               <Button type="submit" :disabled="isSubmitted">Check Answers</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: The "Awesome Validator" with Detailed Feedback               -->
    <!-- Provides scores, explanations, and diagnoses common errors.           -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CheckCircle2 class="h-6 w-6 text-blue-600" />
            <span>Your Results</span>
          </CardTitle>
          <CardDescription>
            You scored <b class="text-primary">{{ score.correct }} out of {{ questions.length }} ({{ score.percentage }}%)</b>.
            Review the detailed feedback below to master this topic.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div v-for="result in detailedResults" :key="result.id">
            <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="relative">
              <component :is="result.isCorrect ? CheckCircle : AlertCircle" class="h-4 w-4" />
              <AlertTitle class="font-bold">Question {{ result.id }}</AlertTitle>
              <AlertDescription class="flex flex-col gap-3">
                <div class="prose prose-sm max-w-none rounded-md border bg-background/50 p-3" v-html="result.questionText"></div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Answer:</p>
                  <p class="font-mono" :class="[result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400']">{{ result.userAnswer || 'No answer given' }}</p>
                </div>
                <div v-if="!result.isCorrect">
                  <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Correct Answer(s):</p>
                  <p class="font-mono text-green-700 dark:text-green-400">{{ result.correctAnswer.join(' / ') }}</p>
                </div>
                 <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explanation:</p>
                  <p class="text-sm" v-html="result.explanation"></p>
                </div>
              </AlertDescription>
            </Alert>
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

// Assuming these are ShadCN-Vue components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table'
import { CheckCircle, AlertCircle, CheckCircle2 } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageData = {
  testTitle: "Raymond Murphy's Grammar Practice",
  testDescription: "Advanced exercises based on 'English Grammar In Use'.",
  unitTitle: "Unit 0: Passive 2 (be done / been done / being done)",
  unitDescription: "This unit focuses on continuous and perfect forms of the passive voice, and its use with modals. Mastering these structures is key to achieving fluency and a sophisticated style in English.",
  categories: ["Grammar", "Passive Voice", "Advanced", "B2/C1 Level"]
}

// --- Navigation ---
const router = useRouter()
const currentUnitNumber = 0

function goToPreviousUnit() {
  // On the first unit, 'back' could go to a main index page.
  router.push("/units/grammar")
}
function goToNextUnit() {
  router.push(`/units/grammar/${currentUnitNumber + 1}`)
}

// --- Question & Answer Data ---
interface IQuestion {
  id: number;
  type: 'transform' | 'gap-fill' | 'error-correction';
  instruction: string;
  text: string;
  correctAnswer: string[];
  explanation: string;
  errorDiagnosis?: Record<string, string>;
}

const questions = ref<IQuestion[]>([
  {
    id: 1,
    type: 'gap-fill',
    instruction: 'Complete the sentence with the correct passive form of the verb in brackets.',
    text: `Look at the state of this office! The documents are everywhere and the floor is filthy. It looks as if the room <i>(not clean)</i> for weeks.`,
    correctAnswer: ['hasn\'t been cleaned', 'has not been cleaned'],
    explanation: 'The phrase "for weeks" indicates a period of time continuing up to the present moment. This requires the <b>Present Perfect Passive</b> (has/have + been + past participle). Since the context is negative, the correct form is "hasn\'t been cleaned".',
    errorDiagnosis: {
      'wasn\'t cleaned': 'This is Past Simple Passive. While grammatically possible, the phrase "for weeks" strongly implies a connection to the present, making the Present Perfect a better choice.'
    }
  },
  {
    id: 2,
    type: 'transform',
    instruction: 'Rewrite the beginning of this sentence in the passive voice. Start with the underlined word.',
    text: `While they were interviewing her for the job, <u>she</u> realised they had already offered the position to someone else.`,
    correctAnswer: ['While she was being interviewed'],
    explanation: `The original active sentence is in the Past Continuous ("they were interviewing her"). To make it passive, we use the <b>Past Continuous Passive</b> structure (was/were + being + past participle). The subject "she" requires "was", leading to "was being interviewed".`,
     errorDiagnosis: {
      'was interviewed': 'This is Past Simple Passive. It misses the continuous nature of the original active verb "were interviewing".',
      'was being interviewing': 'A common error. Remember the structure is "be + being + PAST PARTICIPLE", not the -ing form.'
    }
  },
  {
    id: 3,
    type: 'error-correction',
    instruction: 'Find and correct the mistake in the passive construction of this sentence.',
    text: `The new regulations about data privacy must <s>are followed</s> by all employees without exception.`,
    correctAnswer: ['must be followed'],
    explanation: `After a modal verb (must, can, should, will, etc.), the passive is formed with <b>modal + be + past participle</b>. The auxiliary verb 'are' is incorrect and unnecessary here. The correct structure is "must be followed".`,
    errorDiagnosis: {
      'must followed': 'This is incorrect. The auxiliary "be" is essential for the passive voice after a modal.'
    }
  },
  {
    id: 4,
    type: 'gap-fill',
    instruction: 'Complete the sentence with the correct passive form of the verb in brackets.',
    text: `I couldn't use my computer yesterday because it <i>(repair)</i> at that exact moment.`,
    correctAnswer: ['was being repaired'],
    explanation: 'The context "at that exact moment" yesterday points to an ongoing action in the past. This requires the <b>Past Continuous Passive</b> (was/were + being + past participle). "It" is singular, so we use "was being repaired".',
    errorDiagnosis: {
      'was repaired': 'This is Past Simple Passive, which would imply the repair was completed at that moment, not in progress.',
      'is being repaired': 'This is Present Continuous Passive. The context "yesterday" clearly places the action in the past.'
    }
  },
  {
    id: 5,
    type: 'transform',
    instruction: 'Rewrite the sentence in the passive voice, starting with the words given.',
    text: `Someone should have told me that the meeting was cancelled. <br><b>I...</b>`,
    correctAnswer: ['I should have been told'],
    explanation: `The active structure uses a perfect modal ("should have told"). The passive form is <b>modal + have + been + past participle</b>. Therefore, "I" becomes the subject, and the verb phrase transforms into "should have been told".`,
    errorDiagnosis: {
      'should be told': 'This is a simple modal passive, but the original sentence is in the past ("should have..."), so the passive must also reflect this past, unfulfilled action.'
    }
  }
]);

// --- Reactivity & State Management ---
const userAnswers = ref<string[]>(Array(questions.value.length).fill(''));
const isSubmitted = ref(false);

const canReset = computed(() => isSubmitted.value || userAnswers.value.some(ans => ans !== ''));

const score = computed(() => {
  if (!isSubmitted.value) return { correct: 0, total: questions.value.length, percentage: 0 };
  const correctCount = detailedResults.value.filter(r => r.isCorrect).length;
  const percentage = Math.round((correctCount / questions.value.length) * 100);
  return {
    correct: correctCount,
    total: questions.value.length,
    percentage: percentage
  };
});

const detailedResults = computed(() => {
  return questions.value.map((q, index) => {
    const userAnswer = userAnswers.value[index]?.trim() ?? '';
    const isCorrect = q.correctAnswer.some(ans => ans.toLowerCase() === userAnswer.toLowerCase());
    
    let finalExplanation = q.explanation;
    if (!isCorrect && q.errorDiagnosis) {
      const diagnosis = q.errorDiagnosis[userAnswer.toLowerCase()];
      if (diagnosis) {
        finalExplanation += `<br/><br/><b class='text-destructive'>Specific Feedback:</b> ${diagnosis}`;
      }
    }

    return {
      id: q.id,
      questionText: q.text,
      userAnswer: userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: isCorrect,
      explanation: finalExplanation,
    };
  });
});

// --- Functions ---
function validateAnswers() {
  isSubmitted.value = true;
  // Scroll to results for better UX
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetQuiz() {
  userAnswers.value.fill('');
  isSubmitted.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>
