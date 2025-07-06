<!--
  File: @/pages/units/grammar/28.vue
  Description: An advanced grammar practice page for Unit 28, focusing on nuanced verb-preposition combinations.
  Inspired by Raymond Murphy's "English Grammar In Use".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components for a rich interface
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/27")
const goToNextUnit = () => router.push("/units/grammar/29")

// --- Component State Management ---
const showResult = ref(false)
const userAnswers = ref<Record<string, string>>({})
const score = ref(0)
const isSubmitted = ref(false)

// --- Data Structures for Learning and Assessment ---
// This structure is designed to be pedagogical. Each question includes a detailed explanation
// that addresses not just the correct answer, but potential points of confusion.
const questions = ref([
  {
    id: 'q1',
    questionText: 'The ambitious entrepreneur poured her life savings ______ her new tech startup, hoping it would revolutionize the industry.',
    options: ['in', 'into', 'with', 'on'],
    correctAnswer: 'into',
    explanation: 'We use "pour (something) into (something)" to describe investing a significant amount of resources, like money or effort, in a project or business. "In" is too static; "into" correctly implies transformation and investment.',
  },
  {
    id: 'q2',
    questionText: 'After a lengthy investigation, the detective couldn\'t find anyone who believed ______ the suspect\'s convoluted alibi.',
    options: ['to', 'with', 'in', 'on'],
    correctAnswer: 'in',
    explanation: '"Believe in" means to have faith or trust in the truth or existence of something or someone. "Believe" on its own can mean accepting a fact, but "believe in" implies a deeper level of trust, which fits the context of an alibi.',
  },
  {
    id: 'q3',
    questionText: 'The logistics company prides itself on its ability to provide all its international clients ______ real-time tracking information.',
    options: ['to', 'on', 'with', 'into'],
    correctAnswer: 'with',
    explanation: 'The correct phrasal structure is "provide somebody with something". It\'s a common and important collocation to remember. "Provide something to somebody" is also correct, but the sentence structure here requires "with".',
  },
  {
    id: 'q4',
    questionText: 'Despite the initial public outcry, what eventually happened ______ the controversial new city ordinance remains a topic of debate.',
    options: ['with', 'to', 'on', 'in'],
    correctAnswer: 'to',
    explanation: 'When describing an event or consequence affecting a person or thing, we use "happen to". A common mistake is using "happen with". The ordinance is the recipient of the action, hence "to" is the correct preposition.',
  },
  {
    id: 'q5',
    questionText: 'The project manager insisted ______ having a final review meeting, even though the team felt the product was ready for launch.',
    options: ['on', 'with', 'to', 'in'],
    correctAnswer: 'on',
    explanation: '"Insist on (something/doing something)" means to demand something forcefully and not accept refusal. This is a fixed prepositional phrase. The other options do not form a correct collocation with "insist".',
  },
  {
    id: 'q6',
    questionText: 'The old manuscript was so delicate it looked as if it might disintegrate ______ dust if not handled with extreme care.',
    options: ['in', 'to', 'into', 'with'],
    correctAnswer: 'into',
    explanation: '"Disintegrate into" signifies a transformation from one state (a manuscript) to another (dust). "Into" is used to show a change of state or form, making it the most precise choice here.',
  },
  {
    id: 'q7',
    questionText: 'When asked to choose between a secure job and a risky venture, I would always prefer financial stability ______ the thrill of the unknown.',
    options: ['with', 'on', 'than', 'to'],
    correctAnswer: 'to',
    explanation: 'The structure for comparison with "prefer" is "prefer something to something else". A very common error is to use "than", which is used with comparatives like "better than" or "more than", but not with "prefer".',
  },
  {
    id: 'q8',
    questionText: 'To succeed ______ this highly competitive field, you must be willing to constantly adapt and learn new skills.',
    options: ['on', 'with', 'at', 'in'],
    correctAnswer: 'in',
    explanation: 'We use "succeed in (a field/an activity)" to denote achievement within a specific area or discipline. While one might be good "at" a skill, one succeeds "in" a broader context like a career field or a difficult task.',
  },
  {
    id: 'q9',
    questionText: 'The two vehicles collided ______ each other at the intersection, but miraculously, no one was seriously injured.',
    options: ['to', 'into', 'with', 'against'],
    correctAnswer: 'with',
    explanation: '"Collide with" is the standard collocation for two objects hitting each other. While "crash into" is also common and correct, when using the verb "collide", "with" is the idiomatic preposition to use.',
  },
  {
    id: 'q10',
    questionText: 'She decided to concentrate all her efforts ______ mastering the violin, practicing for over six hours every day.',
    options: ['in', 'on', 'to', 'with'],
    correctAnswer: 'on',
    explanation: 'The fixed phrase is "concentrate on something". It means to direct your attention or effort towards a particular activity, subject, or problem. "On" indicates the target of the focus.',
  },
]);

// --- Core Logic: The Validator ---
const checkAnswers = () => {
  if (isSubmitted.value) return;

  let correctCount = 0;
  questions.value.forEach(q => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  score.value = Math.round((correctCount / questions.value.length) * 100);
  isSubmitted.value = true;
  showResult.value = true;
};

const resultFeedback = computed(() => {
  if (score.value === 100) return { title: 'Exceptional Work!', message: 'A perfect score! Your command of these prepositions is outstanding. You have a deep, intuitive understanding of their nuanced usage.', color: 'text-green-500' };
  if (score.value >= 80) return { title: 'Excellent!', message: 'You have a strong grasp of these verb-preposition pairs. Review the explanations for any you missed to perfect your knowledge.', color: 'text-blue-500' };
  if (score.value >= 60) return { title: 'Good Effort!', message: 'You\'re on the right track. This is a tricky area of English. Pay close attention to the explanations below to see where you can improve.', color: 'text-yellow-500' };
  return { title: 'Time to Review', message: 'These prepositions can be challenging. Don\'t worry! Carefully read the learning material and the detailed answer explanations to build a stronger foundation.', color: 'text-red-500' };
});

const getResultForQuestion = (questionId: string) => {
  const question = questions.value.find(q => q.id === questionId);
  if (!question) return { isCorrect: false, userAnswer: 'N/A' };
  const userAnswer = userAnswers.value[questionId] || 'Not answered';
  return {
    isCorrect: userAnswer === question.correctAnswer,
    userAnswer,
  };
};

</script>

<template>
  <GrammarLayout
    test-title="Intermediate-Advanced Grammar Practice"
    test-description="Based on 'English Grammar In Use' by Raymond Murphy"
    unit-title="Unit 28: Verb + preposition (5)"
    unit-description="Mastering complex verb and preposition collocations: in/into/with/to/on. These combinations often carry specific, idiomatic meanings that must be learned in context."
    :categories="['Verbs', 'Prepositions', 'Collocations', 'Idiomatic Expressions']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts & Examples</CardTitle>
          <CardDescription>
            Understanding when to use these prepositions often depends on the verb and the specific meaning you wish to convey.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">1. IN / INTO</h4>
            <p class="mb-2 text-muted-foreground">
              <strong class="text-primary">IN</strong> often suggests a state or inclusion. <strong class="text-primary">INTO</strong> suggests movement, transformation, or change of state.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>believe in</strong> sb/sth: <em>Do you <strong class="font-mono">believe in</strong> ghosts?</em></li>
              <li><strong>specialize in</strong> sth: <em>She <strong class="font-mono">specializes in</strong> corporate law.</em></li>
              <li><strong>succeed in</strong> sth/doing sth: <em>He finally <strong class="font-mono">succeeded in</strong> solving the puzzle.</em></li>
              <li><strong>crash/drive/bump into</strong> sb/sth: <em>He lost control and <strong class="font-mono">crashed into</strong> a wall.</em></li>
              <li><strong>translate (from one language) into</strong> another: <em>The book was <strong class="font-mono">translated into</strong> fifteen languages.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">2. WITH</h4>
            <p class="mb-2 text-muted-foreground">
              <strong class="text-primary">WITH</strong> often suggests connection, accompaniment, or possession.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>collide with</strong> sb/sth: <em>The cyclist <strong class="font-mono">collided with</strong> a parked car.</em></li>
              <li><strong>fill sth with</strong> sth: <em>She <strong class="font-mono">filled the glass with</strong> water.</em></li>
              <li><strong>provide/supply sb with</strong> sth: <em>The school <strong class="font-mono">provides students with</strong> textbooks.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">3. TO</h4>
            <p class="mb-2 text-muted-foreground">
              <strong class="text-primary">TO</strong> often suggests direction, destination, or relationship.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>happen to</strong> sb/sth: <em>What <strong class="font-mono">happened to</strong> your car? It's a wreck!</em></li>
              <li><strong>invite sb to</strong> a place/event: <em>They <strong class="font-mono">invited me to</strong> their wedding.</em></li>
              <li><strong>prefer sth/sb to</strong> sth/sb else: <em>I <strong class="font-mono">prefer coffee to</strong> tea.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">4. ON</h4>
            <p class="mb-2 text-muted-foreground">
              <strong class="text-primary">ON</strong> often suggests a topic, focus, or reliance.
            </p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>concentrate on</strong> sth: <em>Please <strong class="font-mono">concentrate on</strong> your driving.</em></li>
              <li><strong>insist on</strong> sth/doing sth: <em>He <strong class="font-mono">insisted on</strong> paying for the meal.</em></li>
              <li><strong>spend (money) on</strong> sth: <em>She <strong class="font-mono">spends a lot of money on</strong> clothes.</em></li>
            </ul>
          </div>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-md">
            <h4 class="font-bold text-amber-800">Teacher's Note: Common Pitfalls</h4>
            <p class="text-amber-700">A frequent error is confusing `prefer...to` with `prefer...than`. Remember: <strong>I prefer A to B.</strong> Also, distinguish `happen to me` (something affected me) from `happen with me` (incorrect) or `happen around me` (events occurring nearby).</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Choose the correct preposition.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              {{ index + 1 }}. {{ question.questionText.split('______')[0] }}
              <span class="inline-block bg-slate-200 rounded-md w-20 h-5 align-middle"></span>
              {{ question.questionText.split('______')[1] }}
            </p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted" class="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div v-for="option in question.options" :key="option">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" class="peer sr-only" />
                <Label
                  :for="`${question.id}-${option}`"
                  class="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button v-if="!isSubmitted" @click="checkAnswers" class="w-full" size="lg">
            Submit & Check Answers
          </Button>
          <p v-else class="text-center font-semibold text-primary">
            Scroll down to see your detailed results.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS & EXPLANATIONS SLOT                                             -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle :class="resultFeedback.color" class="text-2xl">
            {{ resultFeedback.title }}
          </CardTitle>
          <CardDescription>{{ resultFeedback.message }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold">Your Score: {{ score }}%</span>
              <span class="text-sm text-muted-foreground">{{ score / 10 }} / 10 Correct</span>
            </div>
            <Progress :model-value="score" class="w-full" />
          </div>

          <div class="border-t pt-6">
            <h3 class="text-xl font-bold mb-4">Detailed Review</h3>
            <div class="space-y-6">
              <div v-for="question in questions" :key="`result-${question.id}`"
                   class="flex flex-col md:flex-row gap-4 p-4 rounded-lg"
                   :class="getResultForQuestion(question.id).isCorrect ? 'bg-green-50 border-green-200 border' : 'bg-red-50 border-red-200 border'">

                <div class="flex-shrink-0">
                  <CheckCircle2 v-if="getResultForQuestion(question.id).isCorrect" class="h-6 w-6 text-green-600" />
                  <XCircle v-else class="h-6 w-6 text-red-600" />
                </div>

                <div class="flex-1">
                  <p class="text-muted-foreground">
                    {{ question.questionText.replace('______', `<strong>${question.correctAnswer}</strong>`) }}
                  </p>
                  <div class="mt-2 text-sm">
                    <span :class="getResultForQuestion(question.id).isCorrect ? 'text-green-700' : 'text-red-700'">
                      Your answer: <strong>{{ getResultForQuestion(question.id).userAnswer }}</strong>
                    </span>
                    <span v-if="!getResultForQuestion(question.id).isCorrect" class="ml-4 text-green-700">
                      Correct answer: <strong>{{ question.correctAnswer }}</strong>
                    </span>
                  </div>
                  <div class="mt-3 p-3 bg-background/50 rounded-md border text-sm">
                    <p class="font-semibold">Explanation:</p>
                    <p class="text-muted-foreground">{{ question.explanation }}</p>
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
