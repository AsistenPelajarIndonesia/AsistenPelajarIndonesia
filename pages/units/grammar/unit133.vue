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
    <!-- This section provides the core teaching content, akin to the left-hand  -->
    <!-- page of a 'Grammar in Use' book. It breaks down complex rules into      -->
    <!-- digestible segments with clear examples.                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Rule 1: Verbs + OF</CardTitle>
          <CardDescription>
            'Of' often connects a verb to the direct object or the source of a feeling/action. It answers "What?" or "Whom?".
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <p class="font-semibold">Common Collocations:</p>
          <ul class="list-disc space-y-2 pl-5 text-sm">
            <li><strong>accuse / suspect (someone) of (something):</strong> The police <span class="text-primary font-medium">accused him of</span> theft.</li>
            <li><strong>approve / disapprove of (something):</strong> Her parents don't <span class="text-primary font-medium">approve of</span> her new boyfriend.</li>
            <li><strong>die of (an illness/cause):</strong> Many people in the 19th century <span class="text-primary font-medium">died of</span> tuberculosis.</li>
            <li><strong>consist of (parts):</strong> The United Kingdom <span class="text-primary font-medium">consists of</span> four countries.</li>
          </ul>
           <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Teacher's Insight</AlertTitle>
            <AlertDescription>
              Think of 'of' as a possessive or linking preposition. The action 'belongs' to the object that follows 'of'. He is accused *of* a crime (the crime is the essence of the accusation).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 2: Verbs + ABOUT</CardTitle>
          <CardDescription>
            'About' is used when talking or thinking on a subject or topic. It implies a broader area of discussion or concern.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <p class="font-semibold">Common Collocations:</p>
          <ul class="list-disc space-y-2 pl-5 text-sm">
            <li><strong>talk / read / know / hear about (a topic):</strong> I <span class="text-primary font-medium">read about</span> the new discovery in a science journal.</li>
            <li><strong>complain about (a problem):</strong> He's always <span class="text-primary font-medium">complaining about</span> the terrible traffic.</li>
            <li><strong>worry about (a concern):</strong> You shouldn't <span class="text-primary font-medium">worry about</span> things you can't control.</li>
            <li><strong>warn (someone) about (a danger):</strong> They <span class="text-primary font-medium">warned us about</span> the strong currents at the beach.</li>
          </ul>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Rule 3: The Nuanced Pairs</CardTitle>
          <CardDescription>
            Some verbs can use both prepositions, but the meaning changes subtly. This is a common area for mistakes.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div>
            <h4 class="font-semibold">Think of / Think about</h4>
            <ul class="list-disc space-y-2 pl-5 text-sm mt-2">
              <li><strong>Think of:</strong> To have an idea come to mind; to have an opinion; to remember.
                <br><em>Example: What do you <span class="text-primary font-medium">think of</span> my plan? (Opinion)</em>
                <br><em>Example: I can't <span class="text-primary font-medium">think of</span> his name right now. (Recall)</em>
              </li>
              <li class="mt-2"><strong>Think about:</strong> To consider something over time; to ponder or concentrate on a topic.
                <br><em>Example: We need to <span class="text-primary font-medium">think about</span> where to go on holiday. (Ponder)</em>
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">Hear of / Hear about</h4>
            <ul class="list-disc space-y-2 pl-5 text-sm mt-2">
              <li><strong>Hear of:</strong> To know that something or someone exists.
                <br><em>Example: I've never <span class="text-primary font-medium">heard of</span> that author. Is he famous?</em>
              </li>
              <li class="mt-2"><strong>Hear about:</strong> To be told news or details about something.
                <br><em>Example: I <span class="text-primary font-medium">heard about</span> the fire on the evening news.</em>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE QUESTIONS                                                -->
    <!-- This section contains the interactive exercises. Questions are designed -->
    <!-- to be challenging, testing not just rote memorization but also          -->
    <!-- contextual understanding of the nuanced rules.                         -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 26 Exercises</CardTitle>
          <CardDescription>Complete the sentences with 'of' or 'about'. Choose the preposition that best fits the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
              <p class="font-medium leading-none">
                {{ index + 1 }}. {{ q.text.split('___')[0] }}
                <span class="inline-block bg-muted rounded-md w-12 h-6 mx-1 border-b-2 border-dashed"></span>
                {{ q.text.split('___')[1] }}
              </p>
              <RadioGroup
                v-model="userAnswers[index]"
                :disabled="isSubmitted"
                class="flex items-center gap-4"
              >
                <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`">{{ option }}</Label>
                </div>
              </RadioGroup>
              <Separator v-if="index < questions.length - 1" class="mt-4!"/>
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="checkAnswers" v-if="!isSubmitted" class="w-full">Check Answers</Button>
            <Button @click="resetPractice" v-if="isSubmitted" class="w-full" variant="secondary">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULTS VALIDATOR                                                 -->
    <!-- This dynamic section appears after submission. It provides a score,     -->
    <!-- personalized feedback, and detailed explanations for every single       -->
    <!-- question, reinforcing the learning points from the material section.    -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>An analysis of your performance. Review the explanations to solidify your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="flex items-center gap-4 rounded-xl border bg-card p-4">
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Overall Score</p>
              <p class="text-sm text-muted-foreground">{{ scoreFeedback }}</p>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold">{{ score }}</span>
              <span class="text-lg text-muted-foreground">/ {{ questions.length }}</span>
            </div>
          </div>
          <Progress :model-value="scorePercentage" />

          <!-- Detailed Breakdown -->
          <div>
            <h3 class="text-md font-semibold mb-4">Detailed Question Review</h3>
            <div class="space-y-4">
              <div v-for="(result, index) in detailedResults" :key="index">
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
                    <component :is="result.isCorrect ? CheckCircle2 : AlertCircle" class="h-4 w-4" />
                    <AlertTitle class="flex items-center justify-between">
                      <span>Question {{ index + 1 }} - {{ result.isCorrect ? 'Correct' : 'Incorrect' }}</span>
                      <Badge v-if="!result.isCorrect" variant="secondary">Review this rule</Badge>
                    </AlertTitle>
                    <AlertDescription class="mt-2 space-y-2">
                      <p><strong>Your answer:</strong> "{{ result.questionText.replace('___', result.userAnswer || ' unanswered ') }}"</p>
                      <p v-if="!result.isCorrect"><strong>Correct answer:</strong> "{{ result.questionText.replace('___', result.correctAnswer) }}"</p>
                      <p class="border-l-2 pl-2 mt-1 text-xs">
                        <strong>Explanation:</strong> {{ result.explanation }}
                      </p>
                    </AlertDescription>
                </Alert>
              </div>
            </div>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-vue-next';

definePageMeta({
  layout: false, // We are using our own layout component directly
});

const router = useRouter();

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 26: Verb + preposition 3',
  unitDescription: "Mastering the distinction between verbs followed by 'about' and 'of'. This unit focuses on common collocations and nuanced pairs where meaning changes based on the preposition.",
  categories: ['Verbs', 'Prepositions', 'Collocations', 'Intermediate'],
};

const questions = ref([
  {
    id: 'q1',
    text: "The politician refused to talk ___ the recent scandal, citing an ongoing investigation.",
    options: ['of', 'about'],
    answer: 'about',
    explanation: "We 'talk about' a topic or subject. The scandal is the subject of the conversation.",
  },
  {
    id: 'q2',
    text: "My grandmother often speaks fondly ___ her childhood in the countryside.",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "'Speak of' is often used for memories or past events, similar to 'think of'. It's a slightly more formal or literary alternative to 'talk about'.",
  },
  {
    id: 'q3',
    text: "Have you heard ___ the new high-speed train? I heard ___ it on the news this morning.",
    options: ['of', 'about'],
    answer: 'about',
    explanation: "The second clause specifies gaining details ('on the news'), so 'hear about' is correct. The first clause could technically be 'heard of' (know it exists), but in this conversational context, 'heard about' is more natural as it implies recent news.",
  },
  {
    id: 'q4',
    text: "The entire defence strategy consists ___ a single, undeniable piece of evidence.",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "The verb 'consist' is almost always followed by 'of' to list the components or parts of something.",
  },
  {
    id: 'q5',
    text: "I really need to think ___ a new career path; I'm not happy with my current job.",
    options: ['of', 'about'],
    answer: 'about',
    explanation: "The speaker needs to ponder or consider the topic of a new career over time. 'Think about' is used for this kind of prolonged mental consideration.",
  },
  {
    id: 'q6',
    text: "The manager publicly disapproved ___ the team's lack of effort in the final quarter.",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "The correct collocation is 'disapprove of something'. The 'lack of effort' is the direct object of the disapproval.",
  },
  {
    id: 'q7',
    text: "What do you think ___ my new haircut? Be honest!",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "When asking for an opinion, the correct phrase is 'what do you think of...'.",
  },
  {
    id: 'q8',
    text: "The authorities warned the public ___ potential scams targeting elderly citizens.",
    options: ['of', 'about'],
    answer: 'about',
    explanation: "We 'warn someone about' a potential danger or problem. The scams are the topic of the warning.",
  },
  {
    id: 'q9',
    text: "The key witness was formally accused ___ perjury after changing her story multiple times.",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "The correct legal and grammatical collocation is 'accuse someone of a crime'. Perjury is the crime.",
  },
  {
    id: 'q10',
    text: "I've never heard ___ a 'capybara' before. Is it some kind of large rodent?",
    options: ['of', 'about'],
    answer: 'of',
    explanation: "The speaker is indicating they did not know this animal existed. 'Hear of' is used to express awareness of something's existence.",
  },
]);

const userAnswers = ref<Array<string | undefined>>(new Array(questions.value.length).fill(undefined));
const isSubmitted = ref(false);
const showResult = ref(false);

const score = computed(() => {
  return questions.value.reduce((correctCount, question, index) => {
    return userAnswers.value[index] === question.answer ? correctCount + 1 : correctCount;
  }, 0);
});

const scorePercentage = computed(() => {
    return (score.value / questions.value.length) * 100;
});

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return "Perfect score! You have an excellent command of this topic.";
  if (percentage >= 80) return "Excellent work! You have a strong grasp of these prepositions.";
  if (percentage >= 60) return "Good effort. Review the explanations to refine your understanding.";
  if (percentage >= 40) return "You're getting there. Pay close attention to the nuanced pairs.";
  return "This is a tricky topic. Let's review the material and try again.";
});

const detailedResults = computed(() => {
  return questions.value.map((question, index) => {
    const userAnswer = userAnswers.value[index];
    const correctAnswer = question.answer;
    return {
      questionText: question.text,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      isCorrect: userAnswer === correctAnswer,
      explanation: question.explanation,
    };
  });
});

function checkAnswers() {
  isSubmitted.value = true;
  setTimeout(() => {
    showResult.value = true;
  }, 300); // Small delay for a smoother UI transition
}

function resetPractice() {
  userAnswers.value.fill(undefined);
  isSubmitted.value = false;
  showResult.value = false;
}

function goToPreviousUnit() {
  router.push("/units/grammar/25");
}

function goToNextUnit() {
  router.push("/units/grammar/27");
}
</script>

<style scoped>
/* Scoped styles for transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
