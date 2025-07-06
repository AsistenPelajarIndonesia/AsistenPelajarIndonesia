<!--
  File: @/pages/units/grammar/30.vue
  Description: An advanced practice module for Unit 30: -ing and -ed Clauses.
  This page integrates with GrammarLayout to provide a rich learning experience
  with theoretical explanations, challenging exercises, and a detailed results validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, Lightbulb, RefreshCw } from 'lucide-vue-next'

// --- Component Imports ---
// We assume a component library (like shadcn-vue) is available for UI elements.
// These imports are illustrative of what would be needed.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

// --- Page & Unit Metadata ---
const pageMeta = {
  testTitle: "Advanced Grammar In Use",
  testDescription: "Based on 'English Grammar in Use' by Raymond Murphy",
  unitTitle: "Unit 30: -ing and -ed Clauses",
  unitDescription: "Mastering participle clauses (e.g., the woman talking to Tom, the boy injured in the accident) to write more concise and sophisticated English.",
  categories: ['Participle Clauses', 'Relative Clauses', 'Advanced English Syntax', 'Adjective Clauses']
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigate to the preceding unit
  router.push("/units/grammar/29")
}
function goToNextUnit() {
  // Navigate to the subsequent unit
  router.push("/units/grammar/31")
}

// --- Reactive State Management ---
const showResult = ref(false)
const isSubmitted = ref(false)

// --- Question Data Structure ---
// An array of question objects, designed to be challenging and cover various aspects of the grammar point.
const questions = ref([
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: "Police are trying to identify the body of a man ______ in the river.",
    verb: "find",
    userAnswer: '',
    correctAnswer: "found",
    status: 'unanswered',
    explanation: "We use the -ed form (past participle) 'found' because it has a passive meaning. The man was found by someone; he did not find something himself. It's a reduced form of '...the body of a man *that was found* in the river'."
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    prompt: "The road ______ the two villages is very narrow.",
    verb: "connect",
    userAnswer: '',
    correctAnswer: "connecting",
    status: 'unanswered',
    explanation: "We use the -ing form (present participle) 'connecting' because it has an active meaning. The road actively connects the two villages. It's a reduced form of 'The road *that connects* the two villages...'"
  },
  {
    id: 3,
    type: 'sentence-rewrite',
    prompt: "Rewrite this sentence using a participle clause: 'The window, which was broken in the storm, has now been repaired.'",
    userAnswer: '',
    correctAnswer: "The window broken in the storm has now been repaired.",
    status: 'unanswered',
    explanation: "The passive relative clause 'which was broken' can be reduced to just the past participle 'broken'. This creates a more elegant and concise sentence while retaining the passive meaning."
  },
  {
    id: 4,
    type: 'multiple-choice',
    prompt: "I was woken up by a bell ______.",
    options: ["ringing", "rung"],
    userAnswer: '',
    correctAnswer: "ringing",
    status: 'unanswered',
    explanation: "The bell was actively making a sound, so we use the active -ing form, 'ringing'. 'Rung' would imply something was done to the bell, e.g., 'The bell, rung by the watchman, echoed through the night.' In this context, 'ringing' describes the action of the bell itself."
  },
  {
    id: 5,
    type: 'fill-in-the-blank',
    prompt: "Most of the goods ______ in this factory are exported.",
    verb: "make",
    userAnswer: '',
    correctAnswer: "made",
    status: 'unanswered',
    explanation: "The goods are the object of the action; they are made by someone or something. Therefore, we use the passive -ed form, 'made'. This is short for '...the goods *that are made* in this factory...'"
  },
  {
    id: 6,
    type: 'sentence-rewrite',
    prompt: "Rewrite this sentence using a participle clause: 'A new factory, which will employ 500 people, is opening next year.'",
    userAnswer: '',
    correctAnswer: "A new factory employing 500 people is opening next year.",
    status: 'unanswered',
    explanation: "The active relative clause 'which will employ' can be reduced to the present participle 'employing'. The -ing form is used for active verbs, describing what the subject (the factory) does."
  },
  {
    id: 7,
    type: 'multiple-choice',
    prompt: "The conference was attended by many people, ______ a wide range of new ideas.",
    options: ["discussing", "discussed"],
    userAnswer: '',
    correctAnswer: "discussing",
    status: 'unanswered',
    explanation: "'Discussing' here modifies 'people'. The people were actively discussing ideas. 'Discussed' would modify 'ideas' (e.g., 'the ideas discussed were innovative'), but the structure of this sentence requires an active participle to describe what the people were doing."
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    prompt: "Half of the people ______ to the party didn't turn up.",
    verb: "invite",
    userAnswer: '',
    correctAnswer: "invited",
    status: 'unanswered',
    explanation: "The people were the recipients of the invitation; they were invited. This passive relationship requires the -ed participle 'invited'. This is a reduction of '...the people *who were invited*...'"
  }
]);

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.filter(q => q.status === 'correct').length;
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return Math.round((score.value / questions.value.length) * 100);
});

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return "Exceptional work! You have a sophisticated command of participle clauses.";
  if (percentage >= 75) return "Excellent! You have a strong understanding. Review the explanations for any mistakes to perfect your knowledge.";
  if (percentage >= 50) return "Good effort. You've grasped the basics, but there are some key distinctions to master. Pay close attention to the explanations below.";
  return "This is a challenging topic. Please review the material and the explanations carefully. Practice is key!";
});

// --- Core Logic: Validator & Reset ---
function checkAnswers() {
  questions.value.forEach(q => {
    // Normalize answers for reliable comparison
    const userAnswerCleaned = q.userAnswer.trim().replace(/\.$/, '').toLowerCase();
    const correctAnswerCleaned = q.correctAnswer.trim().replace(/\.$/, '').toLowerCase();

    if (userAnswerCleaned === correctAnswerCleaned) {
      q.status = 'correct';
    } else {
      q.status = 'incorrect';
    }
  });
  isSubmitted.value = true;
  showResult.value = true;
}

function resetQuiz() {
  showResult.value = false;
  isSubmitted.value = false;
  questions.value.forEach(q => {
    q.userAnswer = '';
    q.status = 'unanswered';
  });
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <GrammarLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: material - Theoretical Explanations                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Participle Clauses</CardTitle>
          <CardDescription>Participle clauses allow us to convey information more economically, replacing longer relative clauses.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-sm text-foreground">
            There are two main types of participle clauses used to give more information about a noun. They function like adjective clauses.
          </p>
          <Separator />
          <div>
            <h4 class="font-semibold text-base">1. The -ing Clause (Present Participle)</h4>
            <p class="text-sm text-muted-foreground mt-1">This has an <strong class="text-sky-600 dark:text-sky-400">active meaning</strong>. The noun we are describing is <strong class="text-sky-600 dark:text-sky-400">doing the action</strong>.</p>
            <div class="mt-2 p-3 bg-muted rounded-md text-sm">
              <p><span class="font-mono text-muted-foreground">Who is that man <strong class="text-foreground">talking</strong> to Anna?</span></p>
              <p class="text-xs text-muted-foreground italic">(...the man who is talking to Anna)</p>
              <hr class="my-2 border-dashed">
              <p><span class="font-mono text-muted-foreground">The road <strong class="text-foreground">leading</strong> to the city is congested.</span></p>
              <p class="text-xs text-muted-foreground italic">(...the road that leads to the city)</p>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-base">2. The -ed Clause (Past Participle)</h4>
            <p class="text-sm text-muted-foreground mt-1">This has a <strong class="text-amber-600 dark:text-amber-400">passive meaning</strong>. Something is <strong class="text-amber-600 dark:text-amber-400">being done to</strong> the noun we are describing.</p>
            <div class="mt-2 p-3 bg-muted rounded-md text-sm">
              <p><span class="font-mono text-muted-foreground">The boy <strong class="text-foreground">injured</strong> in the accident was taken to hospital.</span></p>
              <p class="text-xs text-muted-foreground italic">(...the boy who was injured in the accident)</p>
              <hr class="my-2 border-dashed">
              <p><span class="font-mono text-muted-foreground">The instructions <strong class="text-foreground">written</strong> for this product are unclear.</span></p>
              <p class="text-xs text-muted-foreground italic">(...the instructions that were written...)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: practice - Interactive Exercises                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Apply your knowledge. Complete the following tasks.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <form @submit.prevent="checkAnswers">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <p class="font-medium text-sm">
                <span class="font-bold text-primary mr-2">{{ index + 1 }}.</span>
                {{ question.prompt }}
              </p>
              
              <!-- Fill-in-the-Blank Questions -->
              <div v-if="question.type === 'fill-in-the-blank'">
                <Label :for="`q${question.id}`" class="sr-only">Your Answer</Label>
                <div class="flex items-center gap-2">
                  <Input 
                    :id="`q${question.id}`" 
                    v-model="question.userAnswer" 
                    :disabled="isSubmitted"
                    class="font-mono" 
                    :placeholder="`Use the verb: ${question.verb}`"
                  />
                </div>
              </div>
              
              <!-- Sentence Rewrite Questions -->
              <div v-if="question.type === 'sentence-rewrite'">
                <Label :for="`q${question.id}`" class="sr-only">Your rewritten sentence</Label>
                <Input 
                  :id="`q${question.id}`" 
                  v-model="question.userAnswer" 
                  :disabled="isSubmitted"
                  class="font-mono" 
                  placeholder="Rewrite the sentence here..."
                />
              </div>

              <!-- Multiple-Choice Questions -->
              <div v-if="question.type === 'multiple-choice'" class="flex flex-col sm:flex-row gap-3">
                <div v-for="option in question.options" :key="option" class="flex-1">
                  <Label 
                    :for="`q${question.id}-${option}`"
                    class="flex items-center gap-3 rounded-md border p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    :class="{ 
                      'bg-accent ring-2 ring-primary': question.userAnswer === option,
                      'cursor-not-allowed opacity-60': isSubmitted
                    }"
                  >
                    <input 
                      type="radio" 
                      :id="`q${question.id}-${option}`" 
                      :name="`q${question.id}`" 
                      :value="option" 
                      v-model="question.userAnswer"
                      :disabled="isSubmitted"
                      class="sr-only"
                    />
                    <span class="font-mono text-sm">{{ option }}</span>
                  </Label>
                </div>
              </div>
            </div>

            <!-- Submission Button -->
            <div class="mt-8 flex justify-end">
              <Button v-if="!isSubmitted" type="submit" size="lg">
                Check My Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: result - Detailed Validation and Feedback                       -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>{{ feedbackMessage }}</CardDescription>
            </div>
            <Button variant="outline" @click="resetQuiz">
              <RefreshCw class="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Score Summary -->
          <div class="p-4 bg-muted rounded-lg space-y-2">
            <div class="flex justify-between items-center text-sm font-medium">
              <p>Overall Score</p>
              <p>{{ score }} / {{ questions.length }}</p>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>

          <Separator />
          
          <!-- Detailed Question Breakdown -->
          <div class="space-y-6">
            <h3 class="text-md font-semibold">Detailed Breakdown:</h3>
            <div v-for="(question, index) in questions" :key="`result-${question.id}`" 
                 class="p-4 rounded-md border"
                 :class="{
                   'border-green-500 bg-green-500/5': question.status === 'correct',
                   'border-red-500 bg-red-500/5': question.status === 'incorrect'
                 }">
              
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <CheckCircle2 v-if="question.status === 'correct'" class="h-5 w-5 text-green-600" />
                  <XCircle v-else class="h-5 w-5 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">
                    <span class="mr-2">{{ index + 1 }}.</span>{{ question.prompt }}
                  </p>
                  
                  <div class="mt-3 text-xs space-y-2 font-mono">
                    <div v-if="question.status === 'incorrect'">
                      <p><span class="font-semibold text-red-600">Your answer:</span> <span class="line-through">{{ question.userAnswer || 'No answer' }}</span></p>
                      <p><span class="font-semibold text-green-600">Correct answer:</span> {{ question.correctAnswer }}</p>
                    </div>
                    <div v-else>
                      <p><span class="font-semibold text-green-600">Correct answer:</span> {{ question.correctAnswer }}</p>
                    </div>
                  </div>
                  
                  <div class="mt-3 p-3 bg-background/50 rounded-md border border-amber-500/30">
                    <div class="flex items-start gap-2">
                      <Lightbulb class="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                      <p class="text-xs text-muted-foreground">{{ question.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
