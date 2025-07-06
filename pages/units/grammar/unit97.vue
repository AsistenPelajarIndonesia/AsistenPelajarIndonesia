
<!--
  File: @/pages/units/grammar/31.vue
  Unit: Adjectives ending in -ing and -ed (boring/bored etc.)
  Description: An advanced grammar practice page designed for English students.
  It provides in-depth explanations, challenging exercises, and a detailed
  results validator to ensure a deep understanding of the topic.
-->
<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component Imports (Assuming a shadcn-vue setup as per layout) ---
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle2, Award } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageMeta = {
  testTitle: 'Intermediate English Grammar Practice',
  testDescription: 'Based on "English Grammar In Use" by Raymond Murphy.',
  unitTitle: 'Unit 31: Adjectives ending in -ing and -ed',
  unitDescription: 'Master the difference between adjectives describing a cause (e.g., boring) and an effect or feeling (e.g., bored).',
  categories: ['Adjectives', 'Word Forms', 'Common Mistakes']
}

// --- Navigation Logic ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/30")
}
function goToNextUnit() {
  router.push("/units/grammar/32")
}

// --- Typescript Interface for Questions ---
interface PracticeQuestion {
  id: number;
  sentence: string;
  options: [string, string];
  correctAnswer: string;
  userAnswer: Ref<string | null>;
  explanation: string;
}

// --- Reactive State Management ---
const showResult = ref(false)
const isSubmitted = ref(false)

const questions: Ref<PracticeQuestion[]> = ref([
  {
    id: 1,
    sentence: "The documentary about climate change was deeply ___. I felt quite ___ afterwards about the future of our planet.",
    options: ['worrying', 'worried'],
    correctAnswer: 'worrying',
    userAnswer: ref(null),
    explanation: "The documentary itself is the cause of the feeling, so it is 'worrying' (describes the cause). The feeling experienced by the speaker is 'worried' (describes the effect/feeling). The first blank requires the adjective describing the cause."
  },
  {
    id: 2,
    sentence: "I find walking through a dense, quiet forest a very ___ experience; it leaves me feeling completely ___.",
    options: ['relaxing', 'relaxed'],
    correctAnswer: 'relaxing',
    userAnswer: ref(null),
    explanation: "The experience of walking through the forest causes relaxation, so the experience is 'relaxing'. This cause leads to the person feeling 'relaxed'. The sentence describes the experience itself."
  },
  {
    id: 3,
    sentence: "The instructions for the flat-pack furniture were so ___ that we were completely ___ by the end of the first step.",
    options: ['confusing', 'confused'],
    correctAnswer: 'confusing',
    userAnswer: ref(null),
    explanation: "'Confusing' describes the instructions (the thing that causes the confusion). 'Confused' describes how 'we' felt as a result of the instructions."
  },
  {
    id: 4,
    sentence: "It's ___ when people talk loudly on their phones in public. I get very ___ by it.",
    options: ['annoying', 'annoyed'],
    correctAnswer: 'annoying',
    userAnswer: ref(null),
    explanation: "The situation (people talking loudly) is the cause of the feeling, so it is 'annoying'. The speaker's feeling in response to this situation is 'annoyed'."
  },
  {
    id: 5,
    sentence: "The team's performance was bitterly ___. The ___ fans left the stadium in silence.",
    options: ['disappointing', 'disappointed'],
    correctAnswer: 'disappointing',
    userAnswer: ref(null),
    explanation: "The performance is the cause of the disappointment, so it was 'disappointing'. The fans experienced the feeling of disappointment, so they were 'disappointed'. The blank refers to the performance."
  },
  {
    id: 6,
    sentence: "His sudden resignation was ___ to everyone. We were all ___ to hear the news.",
    options: ['shocking', 'shocked'],
    correctAnswer: 'shocking',
    userAnswer: ref(null),
    explanation: "'Shocking' describes the resignation (the event that caused the shock). 'Shocked' describes the feeling of 'everyone' after hearing about the event."
  },
  {
    id: 7,
    sentence: "Climbing that mountain was the most ___ thing I've ever done. I was so ___ I could barely walk.",
    options: ['exhausting', 'exhausted'],
    correctAnswer: 'exhausting',
    userAnswer: ref(null),
    explanation: "The act of climbing the mountain was the cause of the tiredness, so it was 'exhausting'. The resulting feeling of the speaker was 'exhausted'."
  },
  {
    id: 8,
    sentence: "I was ___ by the magician's final trick. It was a truly ___ illusion.",
    options: ['amazing', 'amazed'],
    correctAnswer: 'amazed',
    userAnswer: ref(null),
    explanation: "Here, the sentence describes the speaker's feeling ('I was...'), so the correct form is the -ed adjective, 'amazed'. The illusion itself, the cause of the feeling, would be described as 'amazing'."
  },
  {
    id: 9,
    sentence: "The prospect of AI becoming more intelligent than humans is a ___ thought for many.",
    options: ['frightening', 'frightened'],
    correctAnswer: 'frightening',
    userAnswer: ref(null),
    explanation: "The 'thought' or 'prospect' is the source/cause of the fear, so it is 'frightening'. People who think this thought might feel 'frightened'."
  },
  {
    id: 10,
    sentence: "She's always ___ in art history. She finds the Renaissance period particularly ___.",
    options: ['interesting', 'interested'],
    correctAnswer: 'interested',
    userAnswer: ref(null),
    explanation: "The first part describes her feeling or state ('She's always...'), so 'interested' is correct. The second part describes the Renaissance period (the cause of her interest), which is 'interesting'."
  },
])

// --- Computed Properties for Validation ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return correctCount + (question.userAnswer.value === question.correctAnswer ? 1 : 0)
  }, 0)
})

const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => (score.value / totalQuestions.value) * 100)

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect Score! You've mastered this concept. Truly amazing!"
  if (percentage >= 80) return "Excellent work! You have a very strong grasp of -ing and -ed adjectives."
  if (percentage >= 60) return "Good job! A few tricky ones, but you're on the right track. Review the explanations below."
  if (percentage >= 40) return "A solid attempt. This can be a confusing topic. The explanations below will help clarify things."
  return "Don't be discouraged! This is a challenging topic. Read the material and explanations carefully and try again."
})

// --- Methods ---
function checkAnswers() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the result section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  questions.value.forEach(q => q.userAnswer.value = null)
  isSubmitted.value = false
  showResult.value = false
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
    <!-- #material: Learning Content                                           -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Core Principle: Cause vs. Feeling</CardTitle>
          <CardDescription>Understanding the fundamental difference is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The choice between an <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">-ing</code> and <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">-ed</code> adjective depends on what you are describing: the cause of a feeling, or the feeling itself.</p>
          <div class="rounded-md border border-l-4 border-blue-500 bg-muted/50 p-4">
            <h4 class="font-bold">Use <code class="font-mono">-ing</code> for the Cause</h4>
            <p class="mt-1 text-muted-foreground">An <code class="font-mono">-ing</code> adjective describes the person, thing, or situation that <span class="font-semibold text-primary">causes</span> the emotion.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li>My job is <span class="font-semibold text-blue-600">boring</span>. (The job causes the boredom)</li>
              <li>The film was <span class="font-semibold text-blue-600">disappointing</span>. (The film caused the disappointment)</li>
              <li>That was a <span class="font-semibold text-blue-600">shocking</span> accident. (The accident caused the shock)</li>
            </ul>
          </div>
          <div class="rounded-md border border-l-4 border-green-500 bg-muted/50 p-4">
            <h4 class="font-bold">Use <code class="font-mono">-ed</code> for the Feeling</h4>
            <p class="mt-1 text-muted-foreground">An <code class="font-mono">-ed</code> adjective describes the <span class="font-semibold text-primary">feeling or emotion</span> that someone experiences. It tells you how a person feels.</p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li>I am <span class="font-semibold text-green-600">bored</span> with my job. (This is how I feel)</li>
              <li>We were <span class="font-semibold text-green-600">disappointed</span> with the film. (This is how we felt)</li>
              <li>I was <span class="font-semibold text-green-600">shocked</span> when I saw the accident. (This is how I felt)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pro Tip: The Question Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">When you're unsure, ask yourself one of these two questions:</p>
          <ul class="mt-2 list-inside list-disc space-y-2 text-sm">
            <li>"What is it <span class="font-semibold">like</span>?" → The answer will be an <code class="font-mono">-ing</code> adjective. (e.g., What was the book like? It was <span class="font-semibold">interesting</span>.)</li>
            <li>"How do you <span class="font-semibold">feel</span>?" → The answer will be an <code class="font-mono">-ed</code> adjective. (e.g., How did you feel after reading it? I was <span class="font-semibold">interested</span>.)</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Interactive Questions                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the correct adjective to complete the sentence. Think carefully about the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="mb-3 font-medium">
              {{ index + 1 }}. <span v-html="question.sentence.replace('___', '<span class=\'font-bold\'>___</span>')"></span>
            </p>
            <RadioGroup v-model="question.userAnswer.value" :disabled="isSubmitted" class="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem :id="`q${question.id}-opt1`" :value="question.options[0]" />
                <Label :for="`q${question.id}-opt1`" class="ml-2 cursor-pointer">{{ question.options[0] }}</Label>
              </div>
              <div>
                <RadioGroupItem :id="`q${question.id}-opt2`" :value="question.options[1]" />
                <Label :for="`q${question.id}-opt2`" class="ml-2 cursor-pointer">{{ question.options[1] }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" class="w-full" @click="checkAnswers">
            Check Answers
          </Button>
          <Button v-else class="w-full" variant="outline" @click="resetTest">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: Detailed Validation & Score                                  -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gradient-to-br from-background to-muted/50">
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
              <Award class="h-8 w-8 text-yellow-500" />
              Your Results
            </CardTitle>
            <CardDescription>{{ scoreFeedback }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between rounded-lg border bg-background p-4">
              <div class="text-lg font-bold">Final Score</div>
              <div class="text-2xl font-extrabold text-primary">{{ score }} / {{ totalQuestions }}</div>
            </div>
            <Progress :model-value="scorePercentage" class="w-full" />
            <div class="space-y-4 pt-4">
              <h3 class="text-lg font-semibold">Detailed Breakdown</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="rounded-md border p-4">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <CheckCircle2 v-if="question.userAnswer.value === question.correctAnswer" class="h-5 w-5 text-green-500" />
                    <AlertCircle v-else class="h-5 w-5 text-red-500" />
                  </div>
                  <div class="flex-grow">
                    <p class="font-medium">
                      {{ index + 1 }}. <span v-html="question.sentence.replace('___', `<span class='font-bold underline'>${question.correctAnswer}</span>`)"></span>
                    </p>
                    <p class="mt-2 text-sm text-muted-foreground">
                      Your answer:
                      <span
                        :class="[
                          'font-semibold',
                          question.userAnswer.value === question.correctAnswer ? 'text-green-600' : 'text-red-600'
                        ]"
                      >
                        {{ question.userAnswer.value || 'Not answered' }}
                      </span>
                      <span v-if="question.userAnswer.value !== question.correctAnswer" class="ml-2 font-semibold text-green-600">
                        (Correct: {{ question.correctAnswer }})
                      </span>
                    </p>
                    <div class="mt-3 rounded-md bg-muted/70 p-3 text-sm">
                      <p class="font-semibold">Explanation:</p>
                      <p class="text-muted-foreground">{{ question.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
