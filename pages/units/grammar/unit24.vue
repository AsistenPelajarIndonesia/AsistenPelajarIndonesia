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
    <!-- Learning Material Slot -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Part A: Present Tenses for the Future</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none">
          <p>
            When discussing the future, we do not use <code>will</code> in time clauses. These clauses often begin with conjunctions like <code>when</code>, <code>while</code>, <code>before</code>, <code>after</code>, <code>as soon as</code>, and <code>until</code>. Instead, we use a present tense.
          </p>
          <blockquote>
            I will call you <strong>when I get</strong> home.
            <br>
            <em>(NOT <s class="text-red-500">when I will get</s>)</em>
          </blockquote>
          <blockquote>
            Please wait here <strong>until the rain stops</strong>.
            <br>
            <em>(NOT <s class="text-red-500">until the rain will stop</s>)</em>
          </blockquote>
          <p>This same rule applies to conditional clauses starting with <code>if</code>.</p>
           <blockquote>
            <strong>If I see</strong> him, I'll pass on your message.
            <br>
            <em>(NOT <s class="text-red-500">If I will see</s>)</em>
          </blockquote>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Part B: Present Simple vs. Present Perfect for Future</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none">
          <p>
            Both the Present Simple and Present Perfect can be used in time clauses to refer to a future event. However, there is a subtle but important difference in emphasis.
          </p>
          <ul>
            <li>
              <strong>Present Simple (e.g., <code>when I do</code>)</strong>: Focuses on the point in time when the action occurs.
            </li>
            <li>
              <strong>Present Perfect (e.g., <code>when I've done</code>)</strong>: Emphasizes the <strong>completion</strong> of the action. It highlights that the first action must be finished before the second one can begin.
            </li>
          </ul>
          <p>Compare these examples:</p>
          <blockquote>
            Call me <strong>when you finish</strong> your report. (Focus on the moment of finishing)
          </blockquote>
          <blockquote>
            Call me <strong>when you've finished</strong> your report. (Emphasizes that the report must be fully completed first)
          </blockquote>
          <p>The Present Perfect is often preferred when the first action is a task that takes time and its completion is a prerequisite for the next action.</p>
           <blockquote>
            You can have the car <strong>after I've repaired</strong> it. It's not safe to drive yet.
          </blockquote>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Part C: The Critical Difference between 'If' and 'When'</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none">
          <p>While both introduce a future situation, their meanings are distinct.</p>
           <ul>
            <li>
              <strong>When</strong>: Used for events that are <strong>certain</strong> to happen. It's a matter of timing, not possibility.
            </li>
            <li>
              <strong>If</strong>: Used for events that are <strong>possible but not certain</strong>. It introduces a condition.
            </li>
          </ul>
          <p>Consider the speaker's perspective:</p>
           <blockquote>
            <strong>When</strong> I graduate from university, I will look for a job in finance. (The speaker is certain they will graduate.)
          </blockquote>
           <blockquote>
            <strong>If</strong> I graduate with honors, my parents will buy me a car. (Graduating with honors is a possibility, not a certainty.)
          </blockquote>
        </CardContent>
      </Card>
    </template>

    <!-- Practice Questions Slot -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 18 Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence. Pay close attention to context and nuance.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-3">
            <p class="font-semibold text-sm">
              {{ index + 1 }}. {{ question.prompt }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="showResult">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="cursor-pointer">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || showResult">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- Results Slot -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <p :class="['text-2xl font-bold', scorePercentage < 50 ? 'text-red-500' : scorePercentage < 80 ? 'text-yellow-500' : 'text-green-500']">
              {{ score }} / {{ questions.length }} ({{ scorePercentage }}%)
            </p>
            <Progress :model-value="scorePercentage" class="w-[60%]" />
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="question in questions" :key="`result-${question.id}`" class="p-4 rounded-md border" :class="[question.userAnswer === question.correctAnswer ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50']">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0">
                <CheckCircle2 v-if="question.userAnswer === question.correctAnswer" class="h-5 w-5 text-green-600" />
                <XCircle v-else class="h-5 w-5 text-red-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-sm">{{ question.prompt }}</p>
                <p class="text-xs mt-2">Your answer: <span class="font-medium">{{ findOptionLabel(question, question.userAnswer) }}</span></p>
                <p v-if="question.userAnswer !== question.correctAnswer" class="text-xs">Correct answer: <span class="font-medium">{{ findOptionLabel(question, question.correctAnswer) }}</span></p>

                <div v-if="question.userAnswer !== question.correctAnswer" class="mt-3 bg-background p-3 rounded-lg border">
                  <p class="text-sm font-bold text-foreground">Explanation</p>
                  <p class="text-sm text-muted-foreground mt-1">{{ question.explanation }}</p>
                </div>
              </div>
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

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import GrammarLayout from '@/layouts/GrammarLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-vue-next';

definePageMeta({
  layout: false, 
});

const router = useRouter();

function goToPreviousUnit() {
  router.push("/units/grammar/17");
}

function goToNextUnit() {
  router.push("/units/grammar/19");
}

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 18: When I do and when I\'ve done; If and when',
  unitDescription: 'Understanding future time clauses with present tenses and the distinction between conditional and certain events.',
  categories: ['Tenses', 'Future Forms', 'Conjunctions', 'Conditionals'],
};

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: number;
  prompt: string;
  options: QuestionOption[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
}

const questions = reactive<Question[]>([
  {
    id: 1,
    prompt: "I can't go out tonight. I'll call you as soon as I ___ this project.",
    options: [
      { value: 'finish', label: 'finish' },
      { value: 'have finished', label: 'have finished' },
      { value: 'will finish', label: 'will finish' },
      { value: 'am finishing', label: 'am finishing' },
    ],
    correctAnswer: 'have finished',
    userAnswer: null,
    explanation: "The Present Perfect ('have finished') is best here because it emphasizes the completion of a significant task (the project) as a prerequisite for the next action (calling you). While 'finish' is grammatically possible, 'have finished' better conveys the sense of completing a job.",
  },
  {
    id: 2,
    prompt: "I'm not sure if I can afford a holiday this year. ___ I save enough money, I'll go to Spain.",
    options: [
      { value: 'When', label: 'When' },
      { value: 'If', label: 'If' },
      { value: 'Until', label: 'Until' },
      { value: 'As soon as', label: 'As soon as' },
    ],
    correctAnswer: 'If',
    userAnswer: null,
    explanation: "The first sentence, 'I'm not sure...', establishes that the situation is a possibility, not a certainty. Therefore, the conditional 'If' is required. 'When' would imply that saving enough money is a definite future event.",
  },
  {
    id: 3,
    prompt: "The new software is complex. Don't deploy it to the client ___ you have thoroughly tested every module.",
    options: [
      { value: 'when', label: 'when' },
      { value: 'before', label: 'before' },
      { value: 'after', label: 'after' },
      { value: 'if', label: 'if' },
    ],
    correctAnswer: 'before',
    userAnswer: null,
    explanation: "Both 'before' and 'after' can be used, but the sentence structure 'Don't do X ... you do Y' strongly implies 'Don't do X before you do Y'. Using 'after' would require restructuring: 'Deploy it only after you have tested it'. 'Before' fits the negative instruction perfectly.",
  },
  {
    id: 4,
    prompt: "My flight is at 8 PM. ___ I get to the airport, the first thing I'll do is check in my luggage.",
    options: [
      { value: 'If', label: 'If' },
      { value: 'When', label: 'When' },
      { value: 'Before', label: 'Before' },
      { value: 'Until', label: 'Until' },
    ],
    correctAnswer: 'When',
    userAnswer: null,
    explanation: "Getting to the airport is a certain future event in the speaker's plan, not a mere possibility. Therefore, 'When' is the correct choice to indicate the time this certain event will happen.",
  },
  {
    id: 5,
    prompt: "He promised to fix the leak. I'll pay him once he ___ a satisfactory job.",
    options: [
      { value: 'will do', label: 'will do' },
      { value: 'is doing', label: 'is doing' },
      { value: 'has done', label: 'has done' },
      { value: 'does', label: 'does' },
    ],
    correctAnswer: 'has done',
    userAnswer: null,
    explanation: "The Present Perfect ('has done') is ideal here. It strongly emphasizes that the job must be fully and satisfactorily completed before payment is made. 'Does' is also possible but lacks the same emphasis on completion and quality.",
  },
  {
    id: 6,
    prompt: "I'm expecting a very important email. Can you let me know ___ it arrives?",
    options: [
      { value: 'if', label: 'if' },
      { value: 'the moment', label: 'the moment' },
      { value: 'until', label: 'until' },
      { value: 'before', label: 'before' },
    ],
    correctAnswer: 'the moment',
    userAnswer: null,
    explanation: "'The moment' is a more emphatic and immediate version of 'as soon as' or 'when'. It perfectly captures the urgency of being notified immediately upon the email's arrival. 'If' would incorrectly imply the email might not arrive at all.",
  },
]);

const showResult = ref(false);

const allQuestionsAnswered = computed(() => {
  return questions.every(q => q.userAnswer !== null);
});

const score = computed(() => {
  return questions.reduce((count, question) => {
    return count + (question.userAnswer === question.correctAnswer ? 1 : 0);
  }, 0);
});

const scorePercentage = computed(() => {
  if (questions.length === 0) return 0;
  return Math.round((score.value / questions.length) * 100);
});

function checkAnswers() {
  showResult.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetTest() {
  questions.forEach(q => q.userAnswer = null);
  showResult.value = false;
}

function findOptionLabel(question: Question, value: string | null) {
  if (!value) return 'No answer';
  return question.options.find(o => o.value === value)?.label ?? '';
}

</script>

<style>
/* Scoped styles can be added here if necessary */
.prose {
  color: hsl(var(--foreground));
}
.prose blockquote {
  border-left-color: hsl(var(--primary));
  color: hsl(var(--muted-foreground));
}
.prose code {
  color: hsl(var(--primary));
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
