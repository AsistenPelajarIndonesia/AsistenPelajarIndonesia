<!--
  File: @/pages/units/grammar/37.vue
  Description: An advanced grammar practice page for Unit 37: "Quite, pretty, rather and fairly".
  This page uses the GrammarLayout to provide a structured learning experience,
  combining theoretical material with challenging, context-based exercises and
  instant, detailed feedback to ensure comprehension and skill improvement.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are available from your UI library (e.g., shadcn-vue)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

// --- State Management ---
const isSubmitted = ref(false)
const showResult = ref(false)

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/36") // Navigate to the previous unit
}
function goToNextUnit() {
  router.push("/units/grammar/38") // Navigate to the next unit
}

// --- Question & Answer Data Structure ---
// This reactive array holds the core of the exercise. Each question is designed
// to test a specific nuance of the adverbs.
const questions = reactive([
  {
    id: 1,
    prompt: "The solution he proposed was ________ ingenious; it solved a problem we'd had for years.",
    userAnswer: '',
    correctAnswer: 'quite',
    isCorrect: null as boolean | null,
    explanation: "Here, 'ingenious' is a non-gradable (or absolute) adjective. With such adjectives ('perfect', 'impossible', 'right', 'brilliant'), 'quite' means 'completely' or 'absolutely'. 'Rather' would be unnatural, and 'fairly'/'pretty' are too weak for the strong context provided by the second clause."
  },
  {
    id: 2,
    prompt: "I was expecting the play to be boring, but it turned out to be ________ a pleasant surprise.",
    userAnswer: '',
    correctAnswer: 'rather',
    isCorrect: null as boolean | null,
    explanation: "'Rather' is the ideal choice here because it's often used to express surprise or something unexpected, even with positive adjectives like 'pleasant'. The structure 'rather a/an + adjective' is also a key indicator. 'Quite a' would be possible but less expressive of the surprise."
  },
  {
    id: 3,
    prompt: "She speaks French ________ well, but she still makes a few mistakes with complex tenses.",
    userAnswer: '',
    correctAnswer: 'fairly',
    isCorrect: null as boolean | null,
    explanation: "'Fairly' is used here to mean 'to a moderate degree' with a neutral-to-positive connotation. The context 'but she still makes mistakes' suggests a level that is good, but not exceptionally so, which is precisely what 'fairly' conveys. 'Quite' would imply a slightly higher level, and 'rather' could imply a negative judgement, which isn't intended here."
  },
  {
    id: 4,
    prompt: "Be careful on that ladder; it feels ________ unsteady.",
    userAnswer: '',
    correctAnswer: 'rather',
    isCorrect: null as boolean | null,
    explanation: "'Rather' is the most common choice with negative ideas ('unsteady', 'difficult', 'disappointing'). While the informal 'pretty' could also be used in conversation ('pretty unsteady'), 'rather' is more fitting for a sentence that conveys a warning and is standard in both formal and informal English."
  },
  {
    id: 5,
    prompt: "It's a ________ difficult problem, but I think we can solve it. (Use the most common, formal choice)",
    userAnswer: '',
    correctAnswer: 'rather',
    isCorrect: null as boolean | null,
    explanation: "Both 'rather' and 'quite' can modify 'difficult'. However, 'rather' is more frequently used with negative adjectives like 'difficult'. 'Quite difficult' means 'moderately difficult', whereas 'rather difficult' often carries a stronger sense of challenge. Given the formal instruction, 'rather' is the superior choice."
  },
  {
    id: 6,
    prompt: "(Informal conversation) 'How was the new café?' 'Eh, the coffee was ________ good, but nothing special.'",
    userAnswer: '',
    correctAnswer: 'pretty',
    isCorrect: null as boolean | null,
    explanation: "'Pretty' is primarily informal and fits perfectly in this conversational context. It means 'moderately' or 'to some extent'. 'Fairly' is also possible but slightly more formal. 'Pretty' captures the casual, slightly dismissive tone of 'nothing special' better."
  },
  {
    id: 7,
    prompt: "Are you sure about your calculations? Because if you're wrong, the consequences will be disastrous. You need to be ________ certain.",
    userAnswer: '',
    correctAnswer: 'quite',
    isCorrect: null as boolean | null,
    explanation: "Similar to question 1, 'certain' can act as a non-gradable adjective in this context, meaning 'absolutely sure'. Therefore, 'quite' is the only word that means 'completely'. 'Fairly certain' would imply doubt, which is the opposite of what is required here."
  }
])

// --- Computed Properties for Scoring ---
const totalQuestions = computed(() => questions.length)
const score = computed(() => questions.filter(q => q.isCorrect).length)
const progressValue = computed(() => (score.value / totalQuestions.value) * 100)

// --- Core Logic ---
function validateAnswers() {
  if (isSubmitted.value) return

  questions.forEach(q => {
    // Trim and convert to lower case for robust comparison
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase()
    const correctAnswerCleaned = q.correctAnswer.trim().toLowerCase()
    q.isCorrect = userAnswerCleaned === correctAnswerCleaned
  })
  isSubmitted.value = true
  // Use a timeout to create a smooth transition effect
  setTimeout(() => {
    showResult.value = true
  }, 300)
}

function resetTest() {
  showResult.value = false
  isSubmitted.value = false
  questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
}

// --- Dynamic Feedback Message ---
const feedbackMessage = computed(() => {
  const percentage = progressValue.value
  if (percentage === 100) return { title: "Perfect Score!", message: "Excellent work! You have a complete and nuanced understanding of these adverbs.", variant: 'success' }
  if (percentage >= 70) return { title: "Great Job!", message: "You have a strong grasp of the material. Review the explanations for any incorrect answers to perfect your knowledge.", variant: 'default' }
  if (percentage >= 40) return { title: "Good Effort!", message: "You're on the right track. Pay close attention to the explanations below; they highlight the key distinctions you need to master.", variant: 'default' }
  return { title: "Needs Review", message: "These adverbs are tricky. Let's break it down. Carefully read through each explanation below to build a solid foundation.", variant: 'destructive' }
})
</script>

<template>
  <GrammarLayout
    test-title="Advanced English Grammar"
    test-description="Exercises based on 'English Grammar In Use' by Raymond Murphy"
    unit-title="Unit 37: Quite, pretty, rather and fairly"
    unit-description="Mastering adverbs of degree requires understanding their subtle differences in meaning, formality, and typical usage with positive or negative ideas."
    :categories="['Adverbs', 'Modifiers', 'Intermediate', 'B1/B2 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-primary" />
            <span>Core Concepts: Adverbs of Degree</span>
          </CardTitle>
          <CardDescription>
            These words modify adjectives or other adverbs, but they are not always interchangeable.
            Their meaning depends heavily on context and the word they modify.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">Adverb</TableHead>
                <TableHead>Primary Use & Connotation</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">fairly</TableCell>
                <TableCell>Moderately positive; weaker than the others. Suggests 'acceptable but not great'.</TableCell>
                <TableCell class="italic">The room was <span class="font-bold text-blue-600">fairly</span> clean.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">quite</TableCell>
                <TableCell>1. (With gradable adj.): 'to a certain extent', similar to fairly/rather. <br/> 2. (With non-gradable adj.): 'completely', 'absolutely'.</TableCell>
                <TableCell>1. It's <span class="font-bold text-blue-600">quite</span> warm today. <br/> 2. You're <span class="font-bold text-blue-600">quite</span> right.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">pretty</TableCell>
                <TableCell>Informal. Similar in meaning to 'rather' but used more in casual speech. Can be used with both positive and negative ideas.</TableCell>
                <TableCell class="italic">I'm <span class="font-bold text-blue-600">pretty</span> tired.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">rather</TableCell>
                <TableCell>Often used with negative ideas. Can also express surprise or something unexpected. More formal than 'pretty'. Used in the 'rather a/an...' pattern.</TableCell>
                <TableCell class="italic">The film was <span class="font-bold text-blue-600">rather</span> disappointing.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete each sentence with the most appropriate adverb:
            <strong>quite, pretty, rather,</strong> or <strong>fairly</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(q, index) in questions" :key="q.id" class="relative">
            <div class="flex flex-col gap-2">
              <label :for="`q-${q.id}`" class="text-sm font-medium">
                {{ index + 1 }}. {{ q.prompt }}
              </label>
              <div class="flex items-center gap-2">
                 <Input
                    :id="`q-${q.id}`"
                    v-model="q.userAnswer"
                    :disabled="isSubmitted"
                    placeholder="Type your answer..."
                    :class="{
                      'border-green-500 focus-visible:ring-green-500': isSubmitted && q.isCorrect,
                      'border-red-500 focus-visible:ring-red-500': isSubmitted && !q.isCorrect,
                    }"
                    @keyup.enter="validateAnswers"
                  />
                  <template v-if="isSubmitted">
                    <CheckCircle2 v-if="q.isCorrect" class="h-5 w-5 text-green-500" />
                    <XCircle v-else class="h-5 w-5 text-red-500" />
                  </template>
              </div>
            </div>
          </div>
          <Button @click="validateAnswers" :disabled="isSubmitted" class="mt-4 w-full">
            Check My Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS & EXPLANATIONS SLOT                                             -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here's a breakdown of your performance. Review the explanations to reinforce your learning.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <!-- Score Summary -->
          <Alert :variant="feedbackMessage.variant" class="bg-opacity-10">
            <AlertTitle class="flex items-center gap-2 text-lg font-bold">
              <Info class="h-5 w-5" />
              {{ feedbackMessage.title }}
            </AlertTitle>
            <AlertDescription>
              <p>{{ feedbackMessage.message }}</p>
              <div class="mt-4">
                <div class="flex justify-between mb-1">
                  <span class="text-base font-medium">Score: {{ score }} / {{ totalQuestions }}</span>
                  <span class="text-sm font-medium">{{ Math.round(progressValue) }}%</span>
                </div>
                <Progress :model-value="progressValue" class="w-full" />
              </div>
            </AlertDescription>
          </Alert>

          <!-- Detailed Explanations -->
          <div class="mt-4 flex flex-col gap-4">
            <h3 class="text-lg font-semibold">Detailed Answer Review</h3>
            <div v-for="q in questions" :key="`result-${q.id}`">
              <Alert :variant="q.isCorrect ? 'default' : 'destructive'">
                <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                <AlertTitle>Question {{ q.id }}</AlertTitle>
                <AlertDescription class="flex flex-col gap-2">
                  <p class="italic">"{{ q.prompt.replace('________', `[${q.userAnswer || '...'}]`) }}"</p>
                  <div>
                    <strong>Your Answer:</strong> <span :class="{'text-green-600 font-bold': q.isCorrect, 'text-red-600 font-bold line-through': !q.isCorrect}">{{ q.userAnswer || 'No answer' }}</span>
                  </div>
                  <div v-if="!q.isCorrect">
                    <strong>Correct Answer:</strong> <span class="text-green-600 font-bold">{{ q.correctAnswer }}</span>
                  </div>
                  <div class="mt-2 border-t pt-2">
                    <strong class="text-primary">Explanation:</strong> {{ q.explanation }}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex justify-end gap-2">
            <Button variant="outline" @click="resetTest">Try Again</Button>
            <Button @click="goToNextUnit">Continue to Next Unit</Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* A simple fade transition for the result block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
