<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the legendary book by Raymond Murphy."
    unit-title="Unit 1: Present perfect 2 (I have done)"
    unit-description="Mastering the connection between past actions and the present moment. This unit contrasts the Present Perfect with the Simple Past and explores key adverbs."
    :categories="['Tense', 'Present Perfect', 'Simple Past', 'Adverbs']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!--
      Slot #material:
      This section provides the core learning content. It's structured to emulate a masterclass,
      breaking down complex concepts into digestible parts with clear, contrasting examples.
    -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. The Finished Time vs. The Unfinished Time</CardTitle>
          <CardDescription>The core principle: Is the time period of the action over?</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-primary">Simple Past (Finished Time)</h4>
            <p class="text-muted-foreground">Used for actions in a completed time period (e.g., <code class="font-mono">yesterday</code>, <code class="font-mono">last week</code>, <code class="font-mono">1999</code>, when I was a child). The connection to the present is broken.</p>
            <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>Aristotle <span class="font-bold text-red-500">wrote</span> many influential books. <span class="text-xs text-muted-foreground">(His life is a finished time period.)</span></li>
              <li>We <span class="font-bold text-red-500">didn't have</span> a computer when I was young. <span class="text-xs text-muted-foreground">(My youth is a finished time period.)</span></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-primary">Present Perfect (Unfinished Time)</h4>
            <p class="text-muted-foreground">Used for actions in a time period that continues up to now (e.g., <code class="font-mono">today</code>, <code class="font-mono">this year</code>, <code class="font-mono">in my life</code>). The result of the action is still relevant.</p>
             <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>Science <span class="font-bold text-green-600">has made</span> incredible progress this century. <span class="text-xs text-muted-foreground">(This century is not over.)</span></li>
              <li>I <span class="font-bold text-green-600">haven't eaten</span> anything today. <span class="text-xs text-muted-foreground">(Today is not over; I am still hungry now.)</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>B. Adverbs: `just`, `already`, `yet`</CardTitle>
          <CardDescription>These adverbs are classic signals for the Present Perfect.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
           <p><code class="font-mono font-semibold">just</code> = a very short time ago. (e.g., "I've <span class="font-bold">just</span> finished the report.")</p>
           <p><code class="font-mono font-semibold">already</code> = sooner than expected. (e.g., "She's <span class="font-bold">already</span> left.")</p>
           <p><code class="font-mono font-semibold">yet</code> = until now. Used in questions and negative sentences. (e.g., "Have you spoken to him <span class="font-bold">yet</span>? / No, not <span class="font-bold">yet</span>.")</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>C. `gone to` vs. `been to`</CardTitle>
          <CardDescription>A common point of confusion, resolved by location.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
           <p><code class="font-mono font-semibold">He has gone to Japan.</code> = He is in Japan now, or on his way there.</p>
           <p><code class="font-mono font-semibold">He has been to Japan.</code> = He visited Japan at some point in his life and has returned.</p>
        </CardContent>
      </Card>
    </template>
    
    <!--
      Slot #practice:
      This is the interactive exercise section. It uses a v-for loop to render a series of
      challenging questions stored in the component's state. Different question types are
      handled to test grammar from multiple angles.
    -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Read each question carefully. The distinction can be subtle.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-8">
              <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
                <p class="font-semibold">{{ index + 1 }}. {{ q.questionText }}</p>
                
                <!-- Multiple Choice -->
                <RadioGroup v-if="q.type === 'multiple-choice'" v-model="q.userAnswer">
                  <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`">{{ option }}</Label>
                  </div>
                </RadioGroup>

                <!-- Fill in the blank -->
                <div v-if="q.type === 'fill-in-the-blank'" class="flex items-center gap-2">
                  <span v-if="q.prefix" class="text-muted-foreground">{{ q.prefix }}</span>
                  <Input v-model="q.userAnswer" class="max-w-xs" placeholder="Your answer..." />
                   <span v-if="q.suffix" class="text-muted-foreground">{{ q.suffix }}</span>
                </div>

              </div>
              <Button type="submit" class="w-full" :disabled="isSubmitted">
                <CheckCircle class="mr-2 h-4 w-4" />
                Check My Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!--
      Slot #result:
      The "awesome validator". This section appears after submission and provides a detailed
      breakdown of performance, including score, progress, and most importantly,
      a specific, pedagogical explanation for every single question.
    -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <Progress :model-value="scorePercentage" class="w-full" />
            <span class="font-bold text-lg whitespace-nowrap">{{ score }} / {{ questions.length }}</span>
          </div>
          <CardDescription>{{ scoreMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="q in questions" :key="`result-${q.id}`">
            <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
              <component :is="q.isCorrect ? CheckCircle : AlertTriangle" class="h-4 w-4" />
              <AlertTitle>Question: "{{ q.questionText }}"</AlertTitle>
              <AlertDescription class="mt-2 space-y-2">
                <p><strong>Your answer:</strong> <span :class="{'text-green-600 font-bold': q.isCorrect, 'text-red-600 font-bold': !q.isCorrect}">{{ q.userAnswer || 'No answer' }}</span></p>
                <p v-if="!q.isCorrect"><strong>Correct answer:</strong> <span class="font-bold text-green-700">{{ q.correctAnswer }}</span></p>
                <div class="mt-2 rounded-md border bg-muted/50 p-3 text-sm">
                  <p class="font-semibold">Explanation:</p>
                  <p class="text-foreground">{{ q.explanation }}</p>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import GrammarLayout from '@/layouts/GrammarLayout.vue';

// Assuming shadcn-vue or similar component library for UI
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle } from 'lucide-vue-next';

const router = useRouter();

function goToPreviousUnit() {
  // Since this is Unit 1, we can route to an overview page or disable this.
  // For this example, we'll route to a conceptual grammar index.
  router.push("/units/grammar");
}

function goToNextUnit() {
  // Navigate to the next logical unit.
  router.push("/units/grammar/2");
}

const showResult = ref(false);
const isSubmitted = ref(false);

const questions = ref([
  {
    id: 1,
    type: 'multiple-choice',
    questionText: "The composer Itzhak Perlman is a virtuoso violinist, and he _______ in concert halls all over the world.",
    options: ['played', 'has played'],
    userAnswer: ref(''),
    correctAnswer: 'has played',
    isCorrect: false,
    explanation: "We use the Present Perfect ('has played') because Itzhak Perlman is still alive. The period of his life in which he can play concerts is unfinished. The action of playing in halls continues into the present."
  },
  {
    id: 2,
    type: 'multiple-choice',
    questionText: "The ancient Babylonians _______ a sophisticated system of astronomy that greatly influenced later civilizations.",
    options: ['developed', 'have developed'],
    userAnswer: ref(''),
    correctAnswer: 'developed',
    isCorrect: false,
    explanation: "We use the Simple Past ('developed') because the ancient Babylonian civilization no longer exists. The time period in which they could develop things is finished and firmly in the past."
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    questionText: "A: 'Are you going to the cinema?' B: 'No, I _______ that film.'",
    prefix: "No, I've",
    suffix: "that film.",
    userAnswer: ref(''),
    correctAnswer: 'already seen',
    isCorrect: false,
    explanation: "'already' is used with the present perfect to indicate something happened sooner than expected. The structure is have + already + past participle. 'I've already seen that film' implies 'I saw it at some unspecified time before now, so I don't need to see it now'."
  },
  {
    id: 4,
    type: 'multiple-choice',
    questionText: "I can't find my keys anywhere. I think I _______ them.",
    options: ['lost', 'have lost'],
    userAnswer: ref(''),
    correctAnswer: 'have lost',
    isCorrect: false,
    explanation: "The Present Perfect ('have lost') is correct because the focus is on the present result of a past action. The past action is losing the keys; the present result is 'I can't find them now'."
  },
  {
    id: 5,
    type: 'multiple-choice',
    questionText: "Look! Somebody _______ that window. The glass is all over the floor.",
    options: ['broke', 'has broken'],
    userAnswer: ref(''),
    correctAnswer: 'has broken',
    isCorrect: false,
    explanation: "The evidence of the action is visible in the present ('The glass is all over the floor'). This strong connection to the present situation demands the Present Perfect."
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    questionText: "Where's Maria? I need to speak with her. B: Sorry, she's not here. She _______ to the bank.",
    prefix: "She",
    suffix: "to the bank.",
    userAnswer: ref(''),
    correctAnswer: 'has gone',
    isCorrect: false,
    explanation: "'has gone to' means she is currently at the bank or on her way there, and has not returned. This explains why she is 'not here' now."
  },
  {
    id: 7,
    type: 'multiple-choice',
    questionText: "The Titanic _______ an iceberg in 1912 and sank within hours.",
    options: ['hit', 'has hit'],
    userAnswer: ref(''),
    correctAnswer: 'hit',
    isCorrect: false,
    explanation: "The action occurred at a specific, finished time in the past ('in 1912'). This is a classic indicator for the Simple Past. There is no 'unfinished' time period."
  },
  {
    id: 8,
    type: 'fill-in-the-blank',
    questionText: "A: 'Have you finished your homework?' B: 'Not _______. I still have the last two questions to do.'",
    prefix: "Not",
    suffix: ".",
    userAnswer: ref(''),
    correctAnswer: 'yet',
    isCorrect: false,
    explanation: "'yet' is used in negative sentences and questions with the Present Perfect to talk about something that hasn't happened but is expected to happen. It typically comes at the end of the sentence."
  },
]);


const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length;
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return (score.value / questions.value.length) * 100;
});

const scoreMessage = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return "Perfect score! You have an excellent grasp of this concept.";
  if (percentage >= 75) return "Great job! You've understood most of the key distinctions.";
  if (percentage >= 50) return "Good effort. Review the explanations to solidify your understanding.";
  return "This is a tricky unit. Please review the material and explanations carefully.";
});


function handleSubmit() {
  questions.value.forEach(q => {
    // Trim and normalize the answer for better comparison
    const userAnswerCleaned = typeof q.userAnswer === 'string' ? q.userAnswer.trim().toLowerCase() : '';
    const correctAnswerCleaned = q.correctAnswer.trim().toLowerCase();
    
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned;
  });

  isSubmitted.value = true;
  showResult.value = true;
}
</script>

<style scoped>
/* A simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
