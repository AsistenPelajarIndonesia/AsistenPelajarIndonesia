<!--
  File: @/pages/units/grammar/4.vue
  Unit: 4 - "Even"
  Description: An advanced grammar practice module focusing on the correct usage of the adverb "even".
  This page leverages the GrammarLayout to provide a rich learning experience with theoretical material,
  challenging exercises, and an exceptionally detailed results validator.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are globally available or imported as needed.
// For this example, we'll import them directly for clarity.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle, Award } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigates to the preceding unit.
  router.push("/units/grammar/3")
}
function goToNextUnit() {
  // Navigates to the subsequent unit.
  router.push("/units/grammar/5")
}

// --- COMPONENT STATE ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string>>({})

// --- DATA: QUESTIONS & MATERIAL ---
// This data structure is the core of the learning module.
// It's designed to be challenging and comprehensive, inspired by common learner errors.
const questions = reactive([
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: "Select the sentence where 'even' correctly emphasizes that the surprising fact is *who* did the action (Tom).",
    options: [
      "Tom even forgot my birthday.",
      "Even Tom forgot my birthday.",
      "Tom forgot even my birthday.",
      "Tom forgot my birthday even.",
    ],
    correctAnswer: "Even Tom forgot my birthday.",
    explanation: "The word 'even' is like a spotlight; it illuminates and emphasizes the word or phrase that directly follows it. To emphasize the surprising person (Tom), 'even' must be placed directly before his name. The other options change the meaning: A suggests forgetting the birthday was one of several surprising things Tom did. C suggests the birthday was one of many things he forgot."
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank',
    prompt: "She's a workaholic. She works on Saturdays, and sometimes she ______ works on Sundays.",
    correctAnswer: "even",
    explanation: "'Even' is used here to introduce an extreme or surprising example (working on Sundays) that goes beyond the already mentioned fact (working on Saturdays). It strengthens the initial statement about her being a workaholic."
  },
  {
    id: 'q3',
    type: 'sentence-rewrite',
    prompt: "Rewrite the following sentence using 'even though' to connect the two ideas: 'He is highly qualified. He didn't get the job.'",
    correctAnswer: "Even though he is highly qualified, he didn't get the job.",
    explanation: "'Even though' is a concessive conjunction used to introduce a fact that makes the main clause surprising. It's similar to 'although' but adds a stronger sense of surprise or contrast. The structure is 'Even though [surprising condition], [unexpected result].'"
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    prompt: "Which sentence is grammatically correct and most natural?",
    options: [
      "He can't even to tie his own shoelaces.",
      "He can't to even tie his own shoelaces.",
      "He can't even tie his own shoelaces.",
      "He even can't tie his own shoelaces.",
    ],
    correctAnswer: "He can't even tie his own shoelaces.",
    explanation: "In negative sentences with a modal verb (like 'can't', 'won't', 'didn't'), 'even' typically comes after the modal verb and before the main verb. The structure is [subject] [modal + not] even [base verb]. Options A and B incorrectly use 'to', and option D has unnatural word order."
  },
  {
    id: 'q5',
    type: 'fill-in-the-blank',
    prompt: "The instructions were so simple that ______ a child could understand them.",
    correctAnswer: "even",
    explanation: "Here, 'even' emphasizes the most unlikely or extreme case ('a child') to highlight how simple the instructions were. It implies that if a child can do it, then certainly any adult can."
  },
  {
    id: 'q6',
    type: 'sentence-rewrite',
    prompt: "Combine these ideas using 'not even': 'He didn't call. He didn't send a text.' (Focus on the minimal action he failed to do: call).",
    correctAnswer: "He didn't even call.",
    explanation: "'Not even' is used to express surprise that someone failed to do the most basic or expected thing. By saying 'he didn't even call,' you emphasize that calling would have been the minimum effort, and he failed to do it."
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    prompt: "What does the following sentence imply? 'I don't know anyone who has met the president, not even my boss who knows everyone.'",
    options: [
      "My boss has probably met the president.",
      "It's especially surprising that my boss hasn't met the president.",
      "The president doesn't know my boss.",
      "My boss knows the president but I don't know that.",
    ],
    correctAnswer: "It's especially surprising that my boss hasn't met the president.",
    explanation: "The phrase 'not even' singles out the most likely candidate (the boss who knows everyone) to emphasize the totality of the negative statement. The surprise lies in the fact that the one person you'd expect to have met the president, has not."
  },
]);

// --- COMPUTED PROPERTIES ---
const score = computed(() => {
  return questions.reduce((correctCount, question) => {
    const userAnswer = userAnswers[question.id]?.trim()
    const correctAnswer = question.correctAnswer.trim()
    
    // Case-insensitive comparison for written answers
    if (userAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.length === 0) return 0
  return Math.round((score.value / questions.length) * 100)
})

const performanceFeedback = computed(() => {
  if (scorePercentage.value === 100) {
    return {
      title: "Exceptional Mastery!",
      message: "Perfect score! You have a sophisticated and nuanced understanding of 'even'. Congratulations!",
      variant: 'success' as const,
      icon: Award
    }
  } else if (scorePercentage.value >= 75) {
    return {
      title: "Excellent Work!",
      message: "You have a strong grasp of the concept. Review the explanations for any missed questions to perfect your knowledge.",
      variant: 'default' as const,
      icon: CheckCircle2
    }
  } else if (scorePercentage.value >= 50) {
    return {
      title: "Good Foundation.",
      message: "A solid attempt. The nuances of 'even' can be tricky. Pay close attention to the explanations below.",
      variant: 'default' as const,
      icon: AlertCircle
    }
  } else {
    return {
      title: "Needs Review",
      message: "This is a challenging topic. Please carefully study the material and the detailed answer explanations to build your confidence.",
      variant: 'destructive' as const,
      icon: XCircle
    }
  }
})

// --- METHODS ---
function checkAnswers() {
  // A simple validation to ensure all questions are attempted.
  if (Object.keys(userAnswers).length < questions.length) {
    alert("Please attempt all questions before checking your answers.")
    return;
  }
  showResult.value = true
  // Scroll to results for better UX
  setTimeout(() => {
     const resultElement = document.getElementById('results-section');
     resultElement?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function isCorrect(question: typeof questions[0]): boolean {
  const userAnswer = userAnswers[question.id]?.trim()
  const correctAnswer = question.correctAnswer.trim()
  return userAnswer?.toLowerCase() === correctAnswer.toLowerCase()
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on Raymond Murphy's renowned methodology."
    unit-title="Unit 4: Even"
    unit-description="Mastering the use of 'even' to express surprise, contrast, and emphasis."
    :categories="['Adverbs', 'Emphasis', 'Conjunctions']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>The Power of 'Even'</CardTitle>
          <CardDescription>
            Think of 'even' as a tool for highlighting the unexpected. It tells your listener: "Pay attention, this part is surprising."
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">1. The Core Idea: Surprise</h4>
            <p class="text-muted-foreground">'Even' is used to refer to a situation that is unusual or surprising. It often introduces an extreme example.</p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li><span class="font-mono bg-muted px-1 rounded">She has a very difficult job. She <strong>even</strong> works on national holidays.</span> (Working on holidays is the extreme example of her difficult job).</li>
              <li><span class="font-mono bg-muted px-1 rounded">He can't cook. He can't <strong>even</strong> boil an egg.</span> (Boiling an egg is the most basic cooking skill, making his inability surprising).</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">2. The Placement Principle: A Spotlight</h4>
            <p class="text-muted-foreground">The position of 'even' is critical because it modifies the word or phrase that immediately follows it. Changing its position changes the entire meaning of the sentence.</p>
            <ul class="mt-2 ml-4 list-disc space-y-2">
              <li><span class="font-mono bg-muted px-1 rounded"><strong>Even</strong> I ate the salad.</span> (Emphasis on 'I'. Surprising that *I* ate it, maybe I hate salad).</li>
              <li><span class="font-mono bg-muted px-1 rounded">I <strong>even</strong> ate the salad.</span> (Emphasis on the verb 'ate'. Surprising that I *ate* it, maybe I just planned to look at it).</li>
              <li><span class="font-mono bg-muted px-1 rounded">I ate <strong>even</strong> the salad.</span> (Emphasis on 'the salad'. Surprising that I ate the salad *in addition to other things*).</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">3. Key Structures</h4>
            <p class="text-muted-foreground">Mastering these common patterns will significantly improve your fluency.</p>
            <dl class="mt-2 space-y-2">
              <dt class="font-semibold">even though / even if</dt>
              <dd class="ml-4 text-muted-foreground"><span class="font-mono bg-muted px-1 rounded"><strong>Even though</strong> she studied hard, she failed the exam.</span> (Used for a real, surprising contrast).</dd>
              <dd class="ml-4 text-muted-foreground"><span class="font-mono bg-muted px-1 rounded">I will not forgive him, <strong>even if</strong> he apologizes.</span> (Used for a hypothetical, imagined contrast).</dd>
              <dt class="font-semibold mt-2">not even</dt>
              <dd class="ml-4 text-muted-foreground"><span class="font-mono bg-muted px-1 rounded">Nobody helped him. <strong>Not even</strong> his best friend.</span> (Emphasizes that the most expected person/thing also failed to act).</dd>
            </dl>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Apply your knowledge. Read each question carefully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="checkAnswers" class="space-y-8">
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
              <p class="font-semibold">{{ index + 1 }}. {{ q.prompt }}</p>
              
              <!-- Multiple Choice -->
              <div v-if="q.type === 'multiple-choice'">
                <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
                  <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                    <Label :for="`${q.id}-${option}`" class="font-normal">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <!-- Fill in the Blank -->
              <div v-if="q.type === 'fill-in-the-blank'">
                 <Input 
                   v-model="userAnswers[q.id]" 
                   type="text" 
                   placeholder="Type your answer..."
                   class="max-w-sm"
                 />
              </div>

              <!-- Sentence Rewrite -->
              <div v-if="q.type === 'sentence-rewrite'">
                <Input 
                  v-model="userAnswers[q.id]" 
                  type="text" 
                  placeholder="Rewrite the sentence..."
                />
              </div>
            </div>

            <Button type="submit" class="w-full" :disabled="showResult">
              Check Answers
            </Button>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="bg-gradient-to-br from-card to-muted/30">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>An analysis of your performance.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Summary -->
            <Alert :variant="performanceFeedback.variant">
              <component :is="performanceFeedback.icon" class="h-5 w-5" />
              <AlertTitle>{{ performanceFeedback.title }}</AlertTitle>
              <AlertDescription>{{ performanceFeedback.message }}</AlertDescription>
            </Alert>
            
            <!-- Score Bar -->
            <div class="space-y-2">
              <div class="flex justify-between items-baseline">
                <p class="text-sm font-medium">Overall Score</p>
                <p class="text-xl font-bold">{{ score }} / {{ questions.length }}</p>
              </div>
              <Progress :model-value="scorePercentage" />
            </div>

            <!-- Detailed Breakdown -->
            <div>
              <h3 class="text-lg font-semibold mb-4 border-b pb-2">Detailed Answer Review</h3>
              <div class="space-y-6">
                <div v-for="q in questions" :key="`result-${q.id}`">
                  <p class="font-semibold mb-2">{{ q.prompt }}</p>
                  <div class="border rounded-md p-4 space-y-3" :class="isCorrect(q) ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'">
                    <!-- User's Answer -->
                    <div class="flex items-start gap-3">
                      <template v-if="isCorrect(q)">
                        <CheckCircle2 class="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p class="font-medium text-green-800 dark:text-green-300">Your answer (Correct)</p>
                          <p class="text-sm text-muted-foreground">{{ userAnswers[q.id] }}</p>
                        </div>
                      </template>
                      <template v-else>
                        <XCircle class="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                           <p class="font-medium text-red-800 dark:text-red-300">Your answer</p>
                           <p class="text-sm text-muted-foreground line-through">{{ userAnswers[q.id] || "No answer provided" }}</p>
                           <p class="font-medium text-gray-800 dark:text-gray-300 mt-2">Correct answer</p>
                           <p class="text-sm text-muted-foreground">{{ q.correctAnswer }}</p>
                        </div>
                      </template>
                    </div>
                    <!-- Explanation -->
                    <div class="p-3 rounded-md bg-background/50 border border-dashed">
                      <p class="font-semibold text-sm mb-1 text-sky-800 dark:text-sky-300">Explanation</p>
                      <p class="text-sm text-muted-foreground">{{ q.explanation }}</p>
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

<style>
/* Optional: Add a subtle transition for the results section */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
