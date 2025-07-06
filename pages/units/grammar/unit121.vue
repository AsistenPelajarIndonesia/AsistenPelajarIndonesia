
<!--
  File: @/pages/units/grammar/14.vue
  Unit: 14 - Prepositional Time Phrases
  Topic: On time vs. In time; At the end vs. In the end
  Description: An advanced grammar practice module based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth explanations and challenging exercises to master nuanced time-related prepositions.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are available from a library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpenCheck, Trophy } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigates to the preceding unit
  router.push("/units/grammar/13")
}
function goToNextUnit() {
  // Navigates to the subsequent unit
  router.push("/units/grammar/15")
}

// --- COMPONENT STATE MANAGEMENT ---
const showResult = ref(false)
const userAnswers = ref<Record<number, string>>({})

// --- DATA: QUESTIONS & EXPLANATIONS ---
// The questions are designed to be challenging, with plausible distractors
// to test deep understanding rather than superficial knowledge.
const questions = ref([
  {
    id: 1,
    text: "The 11:45 train is very reliable. It almost always leaves exactly _______.",
    options: ["on time", "in time"],
    correctAnswer: "on time",
    explanation: "The phrase 'on time' means punctually, at the scheduled time. The sentence emphasizes the train's adherence to a precise schedule, making 'on time' the correct choice. 'In time' would imply leaving early enough for some other purpose, which doesn't fit the context of a scheduled departure."
  },
  {
    id: 2,
    text: "We were worried we would miss the start of the film, but we managed to get to the cinema just _______ to see the opening credits.",
    options: ["on time", "in time"],
    correctAnswer: "in time",
    explanation: "'In time' means with enough time to spare or before the last possible moment. The context of being 'worried' suggests a close call, not punctuality. They arrived before it was too late to see the credits, which is the core meaning of 'in time'."
  },
  {
    id: 3,
    text: "_______ of his long speech, the CEO announced a surprise bonus for all employees, which nobody was expecting.",
    options: ["At the end", "In the end"],
    correctAnswer: "At the end",
    explanation: "'At the end' refers to the specific point when something finishes. The speech is a defined event with a clear beginning and end. The announcement happened at the final point of that event. 'In the end' refers to a final outcome after a long process or period of uncertainty, which is not the meaning here."
  },
  {
    id: 4,
    text: "The project faced many budget cuts and delays. It seemed like it would be cancelled, but _______, we managed to complete it successfully.",
    options: ["at the end", "in the end"],
    correctAnswer: "in the end",
    explanation: "'In the end' means 'finally' or 'eventually,' highlighting a conclusion after a period of difficulty or uncertainty. The sentence describes a challenging process ('budget cuts and delays'), making the successful completion a final outcome. 'At the end' would require a specific noun, like 'at the end of the project'."
  },
  {
    id: 5,
    text: "I want to be there for my daughter's graduation ceremony. I have to make sure I arrive _______ to get a good seat.",
    options: ["on time", "in time"],
    correctAnswer: "in time",
    explanation: "The goal here is not just to be punctual for the start time ('on time') but to arrive early enough for a specific purpose (getting a good seat). This concept of having sufficient spare time for an activity is perfectly captured by 'in time'."
  },
  {
    id: 6,
    text: "He considered several career paths—medicine, law, and engineering. _______, he decided to become a teacher, which truly made him happy.",
    options: ["At the end", "In the end"],
    correctAnswer: "in the end",
    explanation: "This sentence describes a decision-making process over time. 'In the end' is used to signify the final outcome or conclusion of this process. It means 'eventually' or 'after much consideration'. 'At the end' would be incorrect as it doesn't refer to the final point of a specific, tangible event or object."
  },
  {
    id: 7,
    text: "Please submit your expense reports _______ of the fiscal month; any reports submitted after that will be processed in the next cycle.",
    options: ["at the end", "in the end"],
    correctAnswer: "at the end",
    explanation: "'At the end of...' is used to specify a point in time. 'The fiscal month' is a defined period, and 'at the end of' refers to the final part of it. 'In the end' would imply a concluding result, which doesn't fit the context of a simple deadline."
  },
  {
    id: 8,
    text: "The concert was scheduled to start at 8:00 PM. The band walked on stage _______ and played for three hours.",
    options: ["on time", "in time"],
    correctAnswer: "on time",
    explanation: "The sentence refers to a scheduled event (the concert start time). Arriving punctually for a schedule is described by 'on time'. There is no sense of urgency or 'just before it was too late,' so 'in time' is less appropriate."
  }
])

// --- COMPUTED PROPERTIES for dynamic UI and logic ---

// Calculates the number of correctly answered questions
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

// Calculates the score as a percentage
const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

// Checks if the user has provided an answer for every question
const allQuestionsAnswered = computed(() => {
  return questions.value.length === Object.keys(userAnswers.value).length
})

// Provides a dynamic, encouraging message based on the user's score
const resultMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Flawless Victory!", description: "Exceptional work! You have mastered the nuances of these phrases.", variant: "success" }
  if (percentage >= 75) return { title: "Excellent Effort!", description: "You have a strong grasp of the material. Review the explanations for any missed questions.", variant: "default" }
  if (percentage >= 50) return { title: "Good Progress!", description: "A solid attempt. Focus on the detailed explanations below to solidify your understanding.", variant: "default" }
  return { title: "Review Recommended", description: "This is a tricky topic. Carefully read the material and the explanations again to build your confidence.", variant: "destructive" }
})

// --- METHODS ---

// Submits the answers and reveals the results section
function checkAnswers() {
  if (allQuestionsAnswered.value) {
    showResult.value = true
  }
}

// Resets the quiz to its initial state for another attempt
function retryQuiz() {
  userAnswers.value = {}
  showResult.value = false
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Advanced exercises based on Raymond Murphy's renowned grammar book."
    unit-title="Unit 14: On time vs. In time / At the end vs. In the end"
    unit-description="Mastering the subtle but critical differences between these common prepositional phrases for time."
    :categories="['Prepositions', 'Time Phrases', 'Intermediate']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: In-depth explanations embodying a legendary teacher's style -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-xl">
            <BookOpenCheck class="h-6 w-6 text-blue-500" />
            Teacher's Notes: The Core Concepts
          </CardTitle>
          <CardDescription>
            Let's dissect these pairs. The difference is not just vocabulary; it's about perspective.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-base">
          <div>
            <h3 class="font-bold text-lg mb-2">On time vs. In time</h3>
            <p class="mb-3 text-muted-foreground">Think of 'On time' as hitting a specific point on a timeline. 'In time' is about arriving within a window of opportunity before it closes.</p>
            <ul class="space-y-2 list-disc pl-5">
              <li>
                <strong class="text-sky-600">On time</strong>: Punctual, not late. It relates to a pre-arranged schedule or appointment. The focus is on precision.
                <br>
                <em>Example: "The meeting is at 2:00 PM. Please be <span class="font-semibold">on time</span>." (Meaning: Arrive at 2:00 PM exactly, not after.)</em>
              </li>
              <li>
                <strong class="text-teal-600">In time (for something / to do something)</strong>: Soon enough. You have enough time to spare before it's too late. The focus is on opportunity.
                <br>
                <em>Example: "We arrived <span class="font-semibold">in time</span> to catch the last train." (Meaning: We arrived before the train left; we didn't miss our chance.)</em>
              </li>
            </ul>
          </div>
          <div class="border-t pt-4">
            <h3 class="font-bold text-lg mb-2">At the end vs. In the end</h3>
            <p class="mb-3 text-muted-foreground">Think of 'At the end' as a location in time or space. 'In the end' is a conclusion to a story or process.</p>
            <ul class="space-y-2 list-disc pl-5">
              <li>
                <strong class="text-sky-600">At the end (of something)</strong>: Refers to the specific point where something finishes. It needs an object ('of...').
                <br>
                <em>Example: "There's a summary <span class="font-semibold">at the end</span> of the chapter." (Meaning: At the final physical/temporal point of the chapter.)</em>
              </li>
              <li>
                <strong class="text-teal-600">In the end</strong>: Finally, eventually. It describes the final result of a situation, often after a long time, discussion, or difficulty.
                <br>
                <em>Example: "We had many arguments, but <span class="font-semibold">in the end</span>, we agreed." (Meaning: Eventually, after everything, this was the outcome.)</em>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Challenging, context-rich questions for the student       -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section" class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the most appropriate phrase to complete each sentence.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="showResult">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="text-base cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || showResult" class="w-full">
            {{ showResult ? 'Answers Submitted' : 'Check Answers' }}
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The "awesome validator" with scores and detailed feedback    -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-2xl">
            <Trophy class="h-7 w-7 text-yellow-500" />
            Your Results
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score Summary -->
          <div class="p-4 border rounded-lg bg-muted">
            <Alert :variant="resultMessage.variant" class="border-0">
               <component :is="scorePercentage === 100 ? CheckCircle2 : (scorePercentage >= 50 ? Trophy : XCircle)" class="h-4 w-4" />
              <AlertTitle>{{ resultMessage.title }}</AlertTitle>
              <AlertDescription>
                {{ resultMessage.description }}
              </AlertDescription>
            </Alert>
            <div class="mt-4">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-primary">Overall Score</span>
                <span class="text-sm font-medium text-primary">{{ score }} / {{ questions.length }} correct</span>
              </div>
              <Progress :model-value="scorePercentage" />
            </div>
          </div>

          <!-- Detailed Question-by-Question Breakdown -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Detailed Review</h3>
            <div class="space-y-6">
              <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="p-4 border rounded-lg" :class="[userAnswers[question.id] === question.correctAnswer ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20']">
                <p class="font-semibold mb-3">{{ index + 1 }}. {{ question.text }}</p>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                     <template v-if="userAnswers[question.id] === question.correctAnswer">
                       <CheckCircle2 class="h-5 w-5 text-green-600" />
                       <span class="text-green-800 dark:text-green-300">Your answer: <span class="font-bold">{{ userAnswers[question.id] }}</span> (Correct)</span>
                     </template>
                     <template v-else>
                       <XCircle class="h-5 w-5 text-red-600" />
                       <span class="text-red-800 dark:text-red-300">Your answer: <span class="font-bold">{{ userAnswers[question.id] }}</span> (Incorrect)</span>
                     </template>
                  </div>
                   <div v-if="userAnswers[question.id] !== question.correctAnswer" class="flex items-center gap-2">
                       <CheckCircle2 class="h-5 w-5 text-green-600" />
                       <span class="text-gray-800 dark:text-gray-300">Correct answer: <span class="font-bold">{{ question.correctAnswer }}</span></span>
                   </div>
                  <div class="pt-2 mt-2 border-t border-dashed" :class="[userAnswers[question.id] === question.correctAnswer ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700']">
                    <p class="text-sm text-muted-foreground"><strong class="font-semibold">Explanation:</strong> {{ question.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Retry Button -->
          <Button @click="retryQuiz" variant="outline" class="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
