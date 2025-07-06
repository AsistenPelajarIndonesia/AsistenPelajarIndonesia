<!--
  File: @/pages/units/grammar/34.vue
  Unit: Adjectives and adverbs 2 (well, fast, late, hard/hardly)
  Description: An advanced grammar practice module designed to deepen a student's
  understanding of confusing adjective/adverb pairs. This page combines theoretical
  explanations with challenging, context-based exercises and a detailed feedback system.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle, Award } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so we disable the default layout.
})

const router = useRouter()

// --- NAVIGATION ---
function goToPreviousUnit() {
  router.push("/units/grammar/33")
}
function goToNextUnit() {
  router.push("/units/grammar/35")
}

// --- STATE MANAGEMENT ---
const isSubmitted = ref(false)
const showResult = ref(false)

type QuestionStatus = 'unanswered' | 'correct' | 'incorrect'

interface Question {
  id: number
  type: 'multiple-choice' | 'fill-in-the-blank'
  text: string
  prompt?: string
  options: string[]
  userAnswer: string
  correctAnswer: string
  explanation: string
  status: QuestionStatus
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    text: "The new symphony was a resounding success. The orchestra played exceptionally ____ all evening, and the conductor's arrangements were particularly ____.",
    prompt: "Choose the correct pair to complete the sentence.",
    options: ['good / well', 'well / good', 'well / well', 'good / good'],
    userAnswer: '',
    correctAnswer: 'well / good',
    explanation: "The first blank describes how the orchestra played (modifying the verb 'played'), so the adverb 'well' is required. The second blank describes the arrangements themselves (modifying the noun 'arrangements'), so the adjective 'good' is needed. This contrast is a fundamental concept of this unit.",
    status: 'unanswered',
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "My grandfather, despite being in his eighties, still works very ____ on his farm, but since his illness last year, he can ____ lift the heavy sacks of grain.",
    prompt: "Select the words that fit the context.",
    options: ['hard / hard', 'hardly / hard', 'hard / hardly', 'hardly / hardly'],
    userAnswer: '',
    correctAnswer: 'hard / hardly',
    explanation: "'Hard' as an adverb means 'with a lot of effort'. 'Hardly' is also an adverb, but it has a negative meaning: 'almost not at all'. The sentence contrasts his diligent work ethic with his new physical limitations.",
    status: 'unanswered',
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "I haven't seen you ____. What have you been up to? I heard you arrived ____ to the conference yesterday and missed the keynote.",
    prompt: "Distinguish between the two time-related adverbs.",
    options: ['late / lately', 'lately / lately', 'lately / late', 'late / late'],
    userAnswer: '',
    correctAnswer: 'lately / late',
    explanation: "'Lately' means 'recently' and is often used with the present perfect tense ('have not seen'). 'Late' means 'after the expected time'. These two are often confused but have distinct meanings and grammatical use cases.",
    status: 'unanswered',
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: "The new sports car is incredibly ____. It corners so ____ that it feels like it's glued to the road.",
    prompt: "Identify the correct forms for the adjective and adverb.",
    options: ['fast / fast', 'fastly / fast', 'fast / fastly', 'fastly / fastly'],
    userAnswer: '',
    correctAnswer: 'fast / fast',
    explanation: "'Fast' is both an adjective (describing the car) and an adverb (describing how it corners). The word 'fastly' does not exist in standard English and is a common error among learners.",
    status: 'unanswered',
  },
  {
    id: 5,
    type: 'multiple-choice',
    text: "She's a very ____ student who tries ____ in all her subjects, which is why she feels ____ about her poor exam results.",
    prompt: "Choose the correct sequence of adjective and adverbs.",
    options: ['good / hard / bad', 'well / hard / badly', 'good / hardly / bad', 'good / hard / badly'],
    userAnswer: '',
    correctAnswer: 'good / hard / badly',
    explanation: "1. 'good student' (adjective modifying noun). 2. 'tries hard' (adverb modifying verb). 3. 'feels badly' (adverb modifying the verb 'feels'; while 'feels bad' is common, 'feels badly' is also formally correct when describing the action of feeling, especially in an emotional sense). This question tests multiple concepts simultaneously.",
    status: 'unanswered',
  },
])

// --- COMPUTED PROPERTIES ---
const score = computed(() => {
  return questions.reduce((count, q) => count + (q.status === 'correct' ? 1 : 0), 0)
})

const progress = computed(() => {
  return (score.value / questions.length) * 100
})

const allAnswered = computed(() => {
    return questions.every(q => q.userAnswer.trim() !== '');
});

// --- METHODS ---
function validateAnswers() {
  if (!allAnswered.value) {
    alert("Please answer all questions before submitting.");
    return;
  }
  isSubmitted.value = true
  questions.forEach((q) => {
    q.status = q.userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() ? 'correct' : 'incorrect'
  })
  showResult.value = true
  // Scroll to the result section for better UX
  setTimeout(() => {
    document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function resetTest() {
  isSubmitted.value = false
  showResult.value = false
  questions.forEach((q) => {
    q.userAnswer = ''
    q.status = 'unanswered'
  })
   // Scroll back to the top
   setTimeout(() => {
    document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function getBorderClass(status: QuestionStatus) {
  if (!isSubmitted.value) return 'border-border'
  return {
    correct: 'border-green-500',
    incorrect: 'border-red-500',
    unanswered: 'border-border',
  }[status]
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced Exercises based on the book by Raymond Murphy"
    unit-title="Unit 34: Adjectives and Adverbs 2"
    unit-description="A deep dive into well, fast, late, hard, and their tricky counterparts hardly and lately."
    :categories="['Adjectives', 'Adverbs', 'Common Mistakes', 'Word Usage']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: Theoretical explanations and examples                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Adjective vs. Adverb</CardTitle>
          <CardDescription>Understanding the fundamental roles of these word types.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>An <strong>adjective</strong> (e.g., <code class="bg-muted px-1 py-0.5 rounded">good</code>, <code class="bg-muted px-1 py-0.5 rounded">slow</code>) describes a noun or pronoun. It tells us more about a person or thing.</p>
          <blockquote class="border-l-2 pl-4 italic">"She is a <span class="font-semibold text-primary">careful</span> driver." (describes the noun 'driver')</blockquote>
          <p>An <strong>adverb</strong> (e.g., <code class="bg-muted px-1 py-0.5 rounded">well</code>, <code class="bg-muted px-1 py-0.5 rounded">slowly</code>) describes a verb, an adjective, or another adverb. It tells us how, when, or where an action happens.</p>
          <blockquote class="border-l-2 pl-4 italic">"She drives <span class="font-semibold text-primary">carefully</span>." (describes the verb 'drives')</blockquote>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Study 1: Good vs. Well</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><code class="bg-muted px-1 py-0.5 rounded">Good</code> is an adjective. <code class="bg-muted px-1 py-0.5 rounded">Well</code> is the corresponding adverb.</p>
          <blockquote class="border-l-2 pl-4 italic">"Your English is <span class="font-semibold text-primary">good</span>." but "You speak English <span class="font-semibold text-primary">well</span>."</blockquote>
          <p class="font-semibold">Important Exception:</p>
          <p><code class="bg-muted px-1 py-0.5 rounded">Well</code> can also be an adjective, meaning 'in good health'.</p>
          <blockquote class="border-l-2 pl-4 italic">"How are you?" "I'm very <span class="font-semibold text-primary">well</span>, thanks."</blockquote>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Case Study 2: Fast, Hard, Late</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>These words are unique because they have the <strong>same form</strong> for both the adjective and the adverb.</p>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Fast:</strong> "He drives a <span class="font-semibold text-primary">fast</span> car (adj.)." / "He drives very <span class="font-semibold text-primary">fast</span> (adv.)."</li>
            <li><strong>Hard:</strong> "It was a <span class="font-semibold text-primary">hard</span> exam (adj.)." / "She works very <span class="font-semibold text-primary">hard</span> (adv.)."</li>
            <li><strong>Late:</strong> "The train was <span class="font-semibold text-primary">late</span> (adj.)." / "I arrived <span class="font-semibold text-primary">late</span> (adv.)."</li>
          </ul>
          <Alert variant="destructive">
            <AlertTitle>Common Error Alert!</AlertTitle>
            <AlertDescription>The words 'fastly' and 'hardly' (in the sense of effort) are not correct. 'Hardly' has a completely different meaning.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Study 3: The Impostors - Hardly & Lately</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>These adverbs look related to 'hard' and 'late', but their meanings are completely different. This is a major source of confusion.</p>
          <p><code class="bg-muted px-1 py-0.5 rounded">Hardly</code> means 'almost not' or 'very little'. It has a negative connotation.</p>
          <blockquote class="border-l-2 pl-4 italic">"He was so tired, he could <span class="font-semibold text-primary">hardly</span> keep his eyes open." (He could almost not keep them open).</blockquote>
          <hr/>
          <p><code class="bg-muted px-1 py-0.5 rounded">Lately</code> means 'recently'. It is often used with perfect tenses.</p>
          <blockquote class="border-l-2 pl-4 italic">"Have you seen Tom <span class="font-semibold text-primary">lately</span>?" (Have you seen him recently?)</blockquote>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive exercises                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence. Think carefully about the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <Card :class="['transition-all', getBorderClass(q.status)]">
              <CardHeader>
                <p class="text-sm font-medium leading-none">
                  Question {{ index + 1 }}
                </p>
                <p class="text-base text-muted-foreground">{{ q.text }}</p>
              </CardHeader>
              <CardContent>
                 <p class="text-sm font-semibold mb-3">{{ q.prompt }}</p>
                <RadioGroup v-model="q.userAnswer" :disabled="isSubmitted">
                  <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`" class="text-sm">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Button @click="validateAnswers" :disabled="isSubmitted || !allAnswered" size="lg">
              <span v-if="!isSubmitted">Check My Answers</span>
              <span v-else>Answers Submitted</span>
            </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result Slot: Detailed feedback and scoring                           -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gradient-to-br from-background to-muted/50">
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
              <Award class="h-8 w-8 text-yellow-500" />
              Your Results
            </CardTitle>
            <CardDescription>A detailed analysis of your performance. Review the explanations to master the concepts.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <p class="text-lg font-medium">Overall Score: {{ score }} / {{ questions.length }}</p>
              <Progress :model-value="progress" class="w-full" />
              <p v-if="progress === 100" class="text-green-600 font-semibold">Excellent work! You have a strong grasp of these concepts.</p>
              <p v-else-if="progress >= 70" class="text-yellow-600 font-semibold">Good job! Review the incorrect answers to solidify your knowledge.</p>
              <p v-else class="text-red-600 font-semibold">Keep practicing. Review the explanations carefully to understand your mistakes.</p>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-xl font-semibold">Detailed Question Review</h3>
              <div v-for="q in questions" :key="`result-${q.id}`">
                <Alert :variant="q.status === 'correct' ? 'default' : 'destructive'" class="bg-background/80">
                  <component :is="q.status === 'correct' ? CheckCircle2 : XCircle" :class="[q.status === 'correct' ? 'text-green-500' : 'text-red-500', 'h-5 w-5']" />
                  <AlertTitle>
                    Question {{ q.id }}: {{ q.status === 'correct' ? 'Correct' : 'Incorrect' }}
                  </AlertTitle>
                  <AlertDescription class="space-y-3 mt-2">
                    <p class="font-mono text-sm p-2 bg-muted rounded-md">{{ q.text }}</p>
                    <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                      <span class="font-semibold">Your answer:</span>
                      <span :class="[q.status === 'correct' ? 'text-green-700' : 'text-red-700', 'font-mono']">{{ q.userAnswer }}</span>
                      <span class="font-semibold">Correct answer:</span>
                      <span class="text-green-700 font-mono">{{ q.correctAnswer }}</span>
                    </div>
                    <div class="mt-2 p-3 bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-md">
                      <p class="flex items-start gap-2">
                        <HelpCircle class="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5"/>
                        <span class="flex-1"><strong>Explanation:</strong> {{ q.explanation }}</span>
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

          </CardContent>
          <CardFooter class="flex justify-end">
            <Button @click="resetTest" variant="outline" size="lg">Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    </template>

  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles can be added here if needed for fine-tuning */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
