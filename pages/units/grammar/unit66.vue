<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: LEARNING MATERIAL                                                 -->
    <!-- This section emulates a masterclass on the topic, breaking down       -->
    <!-- the concept with contrasting examples and advanced notes.             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Core Distinction: Complete vs. In-Progress</CardTitle>
          <CardDescription>Understanding the fundamental difference is key to mastering this structure.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div>
            <h4 class="font-semibold text-primary">1. Verb + Object + Bare Infinitive (do)</h4>
            <p class="text-sm text-muted-foreground">
              We use this structure when we observe the <strong class="text-foreground">entire action</strong> from its beginning to its end. The action is perceived as a complete, single event.
            </p>
            <Alert variant="default" class="mt-2">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>Example: A Complete Event</AlertTitle>
              <AlertDescription>
                "I saw the man <strong class="text-amber-600 dark:text-amber-400">fall</strong> off the ladder."
                <br>
                <span class="text-xs text-muted-foreground">(I witnessed the entire event: from him being on the ladder to him being on the ground.)</span>
              </AlertDescription>
            </Alert>
          </div>
          <div>
            <h4 class="font-semibold text-primary">2. Verb + Object + Present Participle (doing)</h4>
            <p class="text-sm text-muted-foreground">
              We use this structure when we observe an action <strong class="text-foreground">already in progress</strong>. We see, hear, or feel only a part of the action, not the whole thing.
            </p>
             <Alert variant="default" class="mt-2">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>Example: An Action in Progress</AlertTitle>
              <AlertDescription>
                "When I looked out the window, I saw the man <strong class="text-sky-600 dark:text-sky-400">falling</strong> off the ladder."
                <br>
                <span class="text-xs text-muted-foreground">(I only saw the process of him falling; he was already in the air when I saw him.)</span>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Extended Usage: Verbs of Perception</CardTitle>
            <CardDescription>This grammatical pattern is not limited to 'see'. It applies to a range of verbs related to the senses.</CardDescription>
        </CardHeader>
        <CardContent>
            <p class="mb-2 text-sm">The same logic applies to verbs like <strong class="text-foreground">hear, watch, feel, notice,</strong> and <strong class="text-foreground">listen to</strong>.</p>
            <ul class="list-disc space-y-2 pl-5 text-sm">
                <li>I <strong class="text-foreground">heard</strong> her <strong class="text-amber-600 dark:text-amber-400">slam</strong> the door. <span class="text-muted-foreground">(I heard the complete sound.)</span></li>
                <li>I could <strong class="text-foreground">hear</strong> her <strong class="text-sky-600 dark:text-sky-400">slamming</strong> the door repeatedly. <span class="text-muted-foreground">(I heard the ongoing action of slamming.)</span></li>
                <li>We <strong class="text-foreground">watched</strong> the team <strong class="text-amber-600 dark:text-amber-400">score</strong> the final goal. <span class="text-muted-foreground">(We watched the entire scoring sequence.)</span></li>
                <li>I could <strong class="text-foreground">feel</strong> the ground <strong class="text-sky-600 dark:text-sky-400">shaking</strong> during the earthquake. <span class="text-muted-foreground">(I felt the continuous tremor.)</span></li>
            </ul>
        </CardContent>
      </Card>
       <Card class="border-destructive">
        <CardHeader>
            <CardTitle>Advanced Point: The Passive Voice</CardTitle>
            <CardDescription>The structure changes in the passive voice, a common area for mistakes.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
            <p class="text-sm">When we change a sentence with a bare infinitive to the passive voice, the bare infinitive becomes a <strong class="text-foreground">full infinitive (to do)</strong>.</p>
            <p class="text-sm text-muted-foreground"><strong class="text-foreground">Active:</strong> We saw <strong class="text-primary">him leave</strong> the building.</p>
            <p class="text-sm text-muted-foreground"><strong class="text-foreground">Passive:</strong> He was seen <strong class="text-destructive">to leave</strong> the building.</p>
            <p class="text-sm mt-4">The present participle <strong class="text-foreground">(doing)</strong> remains unchanged in the passive voice.</p>
            <p class="text-sm text-muted-foreground"><strong class="text-foreground">Active:</strong> We saw <strong class="text-primary">him leaving</strong> the building.</p>
            <p class="text-sm text-muted-foreground"><strong class="text-foreground">Passive:</strong> He was seen <strong class="text-sky-600 dark:text-sky-400">leaving</strong> the building.</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE QUESTIONS                                                -->
    <!-- A series of challenging questions designed to test nuanced            -->
    <!-- understanding of the grammar point.                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 0: Practice Exercises</CardTitle>
          <CardDescription>Choose the most appropriate form to complete each sentence. Consider the context carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="font-medium mb-2">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[index]" :disabled="showResult">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2 mb-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="font-normal">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <Button @click="validateAnswers" :disabled="isSubmitDisabled" class="w-full">
            Check Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULTS & VALIDATION                                              -->
    <!-- An advanced validator that provides a score, visual feedback, and     -->
    <!-- detailed explanations for every single question.                      -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <span class="text-4xl font-bold">{{ score.correct }} / {{ score.total }}</span>
            <div class="flex-1">
              <p class="text-sm text-muted-foreground">Correct Answers</p>
              <Progress :model-value="score.percentage" class="mt-1" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div v-for="(result, index) in resultDetails" :key="index">
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                <AlertTitle>Question {{ index + 1 }}: {{ result.isCorrect ? 'Correct!' : 'Needs Review' }}</AlertTitle>
                <AlertDescription class="mt-2 space-y-2">
                  <p class="font-mono p-2 bg-muted rounded-md text-sm">"{{ result.questionText }}"</p>
                  <p>Your answer: <strong :class="result.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">{{ result.userAnswerLabel }}</strong></p>
                  <p v-if="!result.isCorrect">Correct answer: <strong class="text-green-600 dark:text-green-400">{{ result.correctAnswerLabel }}</strong></p>
                  <div class="border-t pt-2 mt-2">
                    <p class="text-xs font-semibold uppercase text-muted-foreground">Explanation</p>
                    <p class="text-sm">{{ result.explanation }}</p>
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
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

// Layout and UI Components
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: 'Intermediate & Advanced Grammar Practice',
  testDescription: 'Based on "English Grammar in Use" by Raymond Murphy',
  unitTitle: 'Unit 0: See somebody do and see somebody doing',
  unitDescription: 'Mastering the use of verbs of perception with the bare infinitive and the -ing form.',
  categories: ['Verbs', 'Infinitive', 'Present Participle', 'Syntax']
}

// --- Navigation ---
const router = useRouter()
const currentUnit = 0

function goToPreviousUnit() {
  // In a real app, you might want to disable this button or go to an index page
  // For this example, it will attempt to navigate to the previous unit number.
  router.push(`/units/grammar/${currentUnit - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Reactive State ---
const questions = ref([
  {
    id: 'q1',
    text: 'As I was walking home, I saw a car suddenly ______ at the traffic lights, narrowly avoiding a cyclist.',
    options: [
      { value: 'stop', label: 'stop' },
      { value: 'stopping', label: 'stopping' }
    ],
    correctAnswer: 'stop',
    explanation: 'The action of stopping was a single, complete event that the speaker witnessed from start to finish. The bare infinitive "stop" is used for such completed actions.'
  },
  {
    id: 'q2',
    text: 'The security guard noticed a suspicious figure ______ near the back entrance for several minutes before calling the police.',
    options: [
      { value: 'loiter', label: 'loiter' },
      { value: 'loitering', label: 'loitering' }
    ],
    correctAnswer: 'loitering',
    explanation: 'The action of loitering was in progress and continued for a period of time. The guard observed part of this ongoing action, making the "-ing" form "loitering" the correct choice.'
  },
  {
    id: 'q3',
    text: 'The defendant was seen ______ the bank at approximately 2:15 PM, just minutes after the robbery.',
    options: [
      { value: 'to enter', label: 'to enter' },
      { value: 'enter', label: 'enter' },
      { value: 'entering', label: 'entering' }
    ],
    correctAnswer: 'to enter',
    explanation: 'This is a passive voice construction ("was seen"). When the active sentence uses a bare infinitive (e.g., "They saw him enter"), the passive form requires the full infinitive ("to enter"). While "entering" could also be correct, "to enter" often implies the complete action was noted, which fits the context of an official report.'
  },
  {
    id: 'q4',
    text: 'Can you smell something ______? I think I might have left the oven on.',
    options: [
      { value: 'burn', label: 'burn' },
      { value: 'burning', label: 'burning' }
    ],
    correctAnswer: 'burning',
    explanation: 'The smell is a continuous, ongoing process that you are currently perceiving. The "-ing" form is used to describe this sensation in progress.'
  },
  {
    id: 'q5',
    text: 'From my apartment, I can often hear my neighbor ______ the violin late at night.',
    options: [
      { value: 'practice', label: 'practice' },
      { value: 'practicing', label: 'practicing' }
    ],
    correctAnswer: 'practicing',
    explanation: 'You are hearing the action "in the middle" of it happening. You don\'t hear the entire practice session from start to finish, just a portion of it. Therefore, the ongoing form "practicing" is more natural.'
  },
  {
    id: 'q6',
    text: 'Nobody felt the initial tremor, but several people felt the building ______ for a few seconds afterward.',
    options: [
      { value: 'shake', label: 'shake' },
      { value: 'shaking', label: 'shaking' }
    ],
    correctAnswer: 'shaking',
    explanation: 'The action of the building moving lasted for "a few seconds". This indicates an ongoing action that was in progress, making "shaking" the appropriate choice over the single, completed event "shake".'
  },
   {
    id: 'q7',
    text: 'The director watched the actor ______ the scene perfectly in a single take and then shouted "Cut!".',
    options: [
      { value: 'perform', label: 'perform' },
      { value: 'performing', label: 'performing' }
    ],
    correctAnswer: 'perform',
    explanation: 'The director watched the entire, complete performance of the scene ("in a single take"). The focus is on the completion of the action, so the bare infinitive "perform" is correct.'
  },
]);

const userAnswers = ref<(string | null)[]>(Array(questions.value.length).fill(null));
const showResult = ref(false);

// --- Computed Properties for Validation ---
const isSubmitDisabled = computed(() => {
  return userAnswers.value.some(answer => answer === null) || showResult.value;
});

const score = computed(() => {
  if (!showResult.value) return { correct: 0, total: questions.value.length, percentage: 0 };
  
  const correctCount = questions.value.reduce((count, question, index) => {
    return userAnswers.value[index] === question.correctAnswer ? count + 1 : count;
  }, 0);
  
  const total = questions.value.length;
  return {
    correct: correctCount,
    total: total,
    percentage: total > 0 ? (correctCount / total) * 100 : 0,
  };
});

const resultDetails = computed(() => {
  return questions.value.map((question, index) => {
    const userAnswer = userAnswers.value[index];
    const isCorrect = userAnswer === question.correctAnswer;
    const userAnswerLabel = question.options.find(opt => opt.value === userAnswer)?.label || 'No answer';
    const correctAnswerLabel = question.options.find(opt => opt.value === question.correctAnswer)?.label || 'N/A';
    const questionText = question.text.replace('______', `[${isCorrect ? correctAnswerLabel : userAnswerLabel}]`);

    return {
      isCorrect,
      questionText,
      userAnswerLabel,
      correctAnswerLabel,
      explanation: question.explanation,
    };
  });
});

// --- Methods ---
function validateAnswers() {
  if (isSubmitDisabled.value) return;
  showResult.value = true;
  // Scroll to results for better UX on mobile
  // In a real app, you might want a more robust solution
  setTimeout(() => {
      const resultEl = document.querySelector('[data-result-section]');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
  }, 100);
}
</script>

<style scoped>
/* Smooth transition for the results section */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
