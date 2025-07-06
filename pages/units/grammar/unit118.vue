<!--
  File: @/pages/units/grammar/11.vue
  Unit: 11 - For, During, and While
  Description: An advanced, interactive grammar practice page for Nuxt 3.
  This page leverages the GrammarLayout to provide a rich learning experience
  focused on the nuanced differences between 'for', 'during', and 'while'.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are globally available or auto-imported
// as is common in a Nuxt setup with the shadcn-vue CLI.
// If not, explicit imports are needed. For example:
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/10")
const goToNextUnit = () => router.push("/units/grammar/12")

// --- Reactive State Management ---
const showResult = ref(false)
const userAnswers = ref<{ [key: string]: string }>({})

// --- Core Learning Data: Questions & Explanations ---
// The questions are designed to be tricky, forcing students to distinguish
// between clauses (requiring 'while') and noun phrases (requiring 'during'),
// and to correctly identify periods of time ('for').
const practiceQuestions = ref([
  {
    id: 'q1',
    text: "Nobody came to see me ___ I was in the hospital. It was a lonely time.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'while',
    explanation: "Correct. 'while' is used before a clause (subject + verb), in this case 'I was in the hospital'. It emphasizes two actions or states happening simultaneously. 'During' would be incorrect because it requires a noun phrase, not a full clause. 'For' would be incorrect as it requires a period of time (e.g., 'for three weeks')."
  },
  {
    id: 'q2',
    text: "The fire alarm went off ___ the middle of the history lecture.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'during',
    explanation: "Correct. 'during' is used with a noun phrase ('the middle of the history lecture') to specify *when* something happened. We are naming the period, not measuring its length. 'While' is incorrect because 'the middle of the history lecture' is not a clause. 'For' is incorrect as it measures duration."
  },
  {
    id: 'q3',
    text: "She has been studying Mandarin ___ more than five years now.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'for',
    explanation: "Correct. 'for' is used to specify a duration or a period of time ('more than five years'). It answers the question 'How long?'. 'During' and 'while' do not fit this context of measuring time."
  },
  {
    id: 'q4',
    text: "I managed to fall asleep ___ the flight, but I woke up several times.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'during',
    explanation: "Correct. 'during' is used with the noun 'the flight' to indicate that the action (falling asleep) happened within that specific period. If you were watching a movie on the flight, you could say 'I watched a movie while I was flying'."
  },
  {
    id: 'q5',
    text: "Please try not to make any noise ___ the baby is sleeping.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'while',
    explanation: "Correct. We use 'while' here because it is followed by a clause ('the baby is sleeping'). It connects two simultaneous, ongoing actions: 'not making noise' and 'the baby sleeping'."
  },
  {
    id: 'q6',
    text: "We were in Paris ___ ten days, but it rained most of the time.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'for',
    explanation: "Correct. 'for' is the only option that correctly expresses the length of the stay. 'Ten days' is a specific duration of time. 'During our stay' would also be correct, but 'during ten days' is unnatural."
  },
  {
    id: 'q7',
    text: "Something woke me up ___ the night. I think it was a cat outside.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'during',
    explanation: "Correct. 'during the night' specifies that an event happened at some point within that named period. 'For the night' would imply you received something that lasted the entire night (e.g., 'a room for the night'). 'While' needs a clause."
  },
  {
    id: 'q8',
    text: "He broke his leg ___ he was skiing in the Alps.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'while',
    explanation: "Correct. 'while' connects the short action ('broke his leg') that happened in the middle of a longer, background action ('he was skiing'). The structure 'while + subject + verb' is key here."
  },
  {
    id: 'q9',
    text: "I haven't seen my cousin ___ his graduation party last year.",
    options: ['for', 'since', 'during'], // Note the deliberate inclusion of 'since' as a distractor
    correctAnswer: 'since',
    explanation: "This is a trick question to test deeper understanding. The correct answer is 'since'. 'Since' is used to connect a past event ('his graduation party') to a present state ('I haven't seen'). 'During' would imply you saw him *at* the party. 'For' is used for durations, not starting points. This highlights a common point of confusion."
  },
  {
    id: 'q10',
    text: "The shop will be closed ___ renovations. It will reopen next month.",
    options: ['for', 'during', 'while'],
    correctAnswer: 'for',
    explanation: "Correct. Although 'renovations' is a noun, in this context, the shop is closed for the *purpose* or *duration* of the renovations. 'For' is often used to express purpose or a period of time defined by an activity. 'During renovations' is also possible but 'for' is more common when explaining the reason for a closure."
  }
])

// --- Computed Properties for Validation and Scoring ---
const score = computed(() => {
  return practiceQuestions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  const total = practiceQuestions.value.length
  return total > 0 ? Math.round((score.value / total) * 100) : 0
})

const resultTitle = computed(() => {
  if (scorePercentage.value >= 90) return "Expert! A masterful performance."
  if (scorePercentage.value >= 70) return "Excellent Work! You have a strong grasp of the topic."
  if (scorePercentage.value >= 50) return "Good Effort. Review the explanations to solidify your knowledge."
  return "Needs Improvement. Let's review the concepts together."
})

// --- Methods ---
const handleSubmit = () => {
  // Simple validation to ensure all questions are answered
  if (Object.keys(userAnswers.value).length !== practiceQuestions.value.length) {
    alert('Please answer all questions before submitting.')
    return
  }
  showResult.value = true
  // Scroll to results for better UX
  // In a real app, you might use a ref on the result element
  setTimeout(() => {
     const resultElement = document.getElementById('results-card');
     if (resultElement) {
       resultElement.scrollIntoView({ behavior: 'smooth' });
     }
  }, 100);
}

const resetTest = () => {
  userAnswers.value = {}
  showResult.value = false
  // Scroll back to the top of the practice section
  setTimeout(() => {
     const practiceElement = document.getElementById('practice-card');
     if (practiceElement) {
       practiceElement.scrollIntoView({ behavior: 'smooth' });
     }
  }, 100);
}

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use"
    test-description="Advanced Practice Modules based on Raymond Murphy's teachings"
    unit-title="Unit 11: For, During, and While"
    unit-description="Mastering time expressions: understanding the critical difference between specifying a duration and identifying an activity or event."
    :categories="['Prepositions', 'Conjunctions', 'Time Expressions']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: The Core Teaching Content                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="text-lg flex items-center gap-2"><HelpCircle class="text-blue-500"/>Core Concepts: The Key Distinction</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The choice between <strong>for</strong>, <strong>during</strong>, and <strong>while</strong> depends entirely on what follows it in the sentence. This is the fundamental rule you must master.</p>
          <ul class="list-disc list-inside space-y-2 pl-2">
            <li><strong>FOR</strong> + <span class="font-semibold text-purple-600">a period of time</span> (how long?)
              <br><span class="text-xs text-muted-foreground pl-4">e.g., for three days, for ten minutes, for a long time</span>
            </li>
            <li><strong>DURING</strong> + <span class="font-semibold text-green-600">a noun</span> (when?)
              <br><span class="text-xs text-muted-foreground pl-4">e.g., during the film, during our holiday, during the night</span>
            </li>
            <li><strong>WHILE</strong> + <span class="font-semibold text-orange-600">a clause (subject + verb)</span> (simultaneous action)
              <br><span class="text-xs text-muted-foreground pl-4">e.g., while I was waiting, while you were sleeping</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Examples & Common Mistakes</CardTitle>
          <CardDescription>Pay close attention to the structure after the keyword.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-800">Comparing 'During' and 'While'</h4>
            <p class="text-sm text-muted-foreground">This is the most common area of confusion.</p>
            <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div class="rounded-md border border-green-200 bg-green-50 p-3">
                <p class="font-mono text-sm">We fell asleep <strong class="text-green-700">during</strong> the movie.</p>
                <p class="mt-1 text-xs text-green-800">Correct: 'the movie' is a noun phrase.</p>
              </div>
              <div class="rounded-md border border-orange-200 bg-orange-50 p-3">
                <p class="font-mono text-sm">We fell asleep <strong class="text-orange-700">while</strong> we were watching the movie.</p>
                <p class="mt-1 text-xs text-orange-800">Correct: 'we were watching' is a clause.</p>
              </div>
            </div>
             <div class="mt-2 rounded-md border border-red-200 bg-red-50 p-3">
                <p class="font-mono text-sm text-red-900"><del>We fell asleep <strong class="text-red-700">while</strong> the movie.</del></p>
                <p class="mt-1 text-xs text-red-800">Incorrect: 'the movie' is not a clause.</p>
              </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800">Comparing 'During' and 'For'</h4>
            <p class="text-sm text-muted-foreground">One names the time, the other measures it.</p>
            <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
               <div class="rounded-md border border-green-200 bg-green-50 p-3">
                <p class="font-mono text-sm">It rained <strong class="text-green-700">during</strong> the night.</p>
                <p class="mt-1 text-xs text-green-800">Correct: Specifies *when* it rained (within a named period).</p>
              </div>
              <div class="rounded-md border border-purple-200 bg-purple-50 p-3">
                <p class="font-mono text-sm">It rained <strong class="text-purple-700">for</strong> three hours.</p>
                <p class="mt-1 text-xs text-purple-800">Correct: Specifies *how long* it rained (a duration).</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Questions                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-card" class="transition-opacity duration-500" :class="{'opacity-50 pointer-events-none': showResult}">
        <CardHeader>
          <CardTitle>Unit 11: Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence. Think carefully about the grammar.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in practiceQuestions" :key="question.id" class="space-y-3">
            <p class="font-medium text-sm">
              {{ index + 1 }}. {{ question.text.split('___')[0] }}
              <span class="inline-block h-5 w-24 rounded-md border-b-2 border-dotted border-gray-400 align-bottom"></span>
              {{ question.text.split('___')[1] }}
            </p>
            <RadioGroup v-model="userAnswers[question.id]" class="flex items-center gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="capitalize cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="pt-4 border-t">
            <Button @click="handleSubmit" size="lg" class="w-full">Check My Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The Dynamic Validator and Scorecard                          -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-card">
        <CardHeader>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle class="text-xl md:text-2xl">{{ resultTitle }}</CardTitle>
              <CardDescription class="mt-1">
                You scored {{ score }} out of {{ practiceQuestions.length }} ({{ scorePercentage }}%)
              </CardDescription>
            </div>
            <Button @click="resetTest" variant="outline">Try Again</Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div v-for="(question, index) in practiceQuestions" :key="`result-${question.id}`"
            :class="[
              'p-4 rounded-lg border',
              userAnswers[question.id] === question.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            ]"
          >
            <div class="flex items-start gap-3">
              <span class="font-bold text-slate-600">{{ index + 1 }}.</span>
              <div class="flex-1">
                <p class="text-sm text-slate-800">
                  {{ question.text.split('___')[0] }}
                  <span
                    :class="[
                      'font-bold px-1 rounded-sm', 
                      userAnswers[question.id] === question.correctAnswer ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-900 line-through'
                    ]"
                  >{{ userAnswers[question.id] }}</span>
                  <span v-if="userAnswers[question.id] !== question.correctAnswer" class="font-bold px-1 rounded-sm bg-green-200 text-green-800 ml-1">{{ question.correctAnswer }}</span>
                  {{ question.text.split('___')[1] }}
                </p>

                <Alert class="mt-3" :variant="userAnswers[question.id] === question.correctAnswer ? 'default' : 'destructive'">
                   <component :is="userAnswers[question.id] === question.correctAnswer ? CheckCircle2 : XCircle" class="h-4 w-4" />
                   <AlertTitle>
                    {{ userAnswers[question.id] === question.correctAnswer ? 'Correct' : 'Correction' }}
                  </AlertTitle>
                  <AlertDescription class="text-xs leading-5">
                    {{ question.explanation }}
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
