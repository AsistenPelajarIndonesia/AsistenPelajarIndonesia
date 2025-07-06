<!--
  File: @/pages/units/grammar/16.vue
  Unit: 16 - In/at/on (position) 2
  Description: An advanced practice module for nuanced prepositions of place,
  inspired by Raymond Murphy's "English Grammar in Use". This page provides
  in-depth learning material, challenging questions, and a detailed,
  educational results validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI & Icon Imports ---
// Assuming a 'shadcn-vue' setup as hinted by the layout component.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/15")
const goToNextUnit = () => router.push("/units/grammar/17")

// --- Reactive State Management ---
const questions = ref([
  {
    id: 'q1',
    text: 'He lives in a charming old house ___ the river.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: 'We use "on" a river, "on" a coast, or "on" a road to indicate that something is located alongside these linear features. "In the river" would mean he lives submerged in the water.'
  },
  {
    id: 'q2',
    text: 'I couldn\'t see her at first; she was sitting ___ the back of the theatre.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: 'Use "at" the front/back/side of a group of people, a building, or a room (like a theatre or classroom). It refers to a general location within that space from an observer\'s perspective. "In the back" is typically reserved for the inside of a car.'
  },
  {
    id: 'q3',
    text: 'There was an interesting article about urban gardening ___ the front page of the newspaper.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: 'We treat surfaces like a page, a screen, or a wall as platforms for information. Therefore, content is "on" the page. "In the newspaper" is also correct for general content, but "on the front page" is more specific and standard.'
  },
  {
    id: 'q4',
    text: 'Please write your name ___ the top of the form.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: '"At" is used to specify a point. "At the top/bottom of a page/stairs" refers to the specific end points. "On the top" would imply something is physically resting on the object, which is less precise here.'
  },
  {
    id: 'q5',
    text: 'For safety, children should always sit ___ the back of the car.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: 'This is a key distinction. For vehicles like cars and taxis, we use "in" the front/back to refer to the interior space. Compare this with "at the back of the bus," where you are in a larger, public space.'
  },
  {
    id: 'q6',
    text: 'The main office is ___ the third floor. Take the lift and turn right.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: 'We use "on" for floors of a building. Think of each floor as a large, flat surface on which the rooms are located.'
  },
  {
    id: 'q7',
    text: 'I met an old friend by chance while waiting ___ the queue for the checkout.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: 'We stand "in" a queue or "in" a line. This views the queue as a container or a file of people that you are a part of.'
  },
  {
    id: 'q8',
    text: 'Look at that beautiful horse ___ that field! It\'s magnificent.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: 'A field, a park, or a garden is a three-dimensional area with boundaries, even if they are not always visible. We are "in" such an enclosed space. "On the field" is used for sports, e.g., "The players are on the field."'
  },
  {
    id: 'q9',
    text: 'Is there anything good to watch ___ television tonight?',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: 'Content is "on" television, "on" the radio, or "on" the internet. We treat these media as platforms that broadcast or display information.'
  },
  {
    id: 'q10',
    text: 'The suspect was last seen ___ the corner of Elm Street and Maple Avenue.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: 'While both "at the corner" (referring to the point where streets meet) and "on the corner" (referring to the building located there) can be correct, "at" is more precise for the specific junction point, which is the context here.'
  }
])

const userAnswers = ref<Record<string, string>>({})
const showResult = ref(false)

// --- Computed Properties for Dynamic UI ---
const allQuestionsAnswered = computed(() => {
  return questions.value.length === Object.keys(userAnswers.value).length
})

const score = computed(() => {
  if (!showResult.value) return 0
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

const finalFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: 'Exceptional!', message: 'A perfect score! Your command of these prepositions is outstanding. Keep up the brilliant work.' }
  if (percentage >= 80) return { title: 'Excellent Work!', message: 'You have a strong grasp of these tricky prepositions. Review the explanations for the ones you missed to achieve mastery.' }
  if (percentage >= 50) return { title: 'Good Effort!', message: 'You\'re on the right track. This is a challenging unit. Carefully read the explanations to solidify your understanding.' }
  return { title: 'Keep Practicing!', message: 'These prepositions are tough, but don\'t be discouraged. Review the material and the explanations below. Every mistake is a learning opportunity.' }
})

// --- Methods ---
const checkAnswers = () => {
  if (allQuestionsAnswered.value) {
    showResult.value = true
    // Scroll to the results section for better UX
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}

const tryAgain = () => {
  userAnswers.value = {}
  showResult.value = false
  // Scroll back to the top of the practice section
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the world's best-selling grammar book by Raymond Murphy."
    unit-title="Unit 16: In/at/on (position) 2"
    unit-description="Mastering nuanced uses of prepositions for specific and abstract locations."
    :categories="['Prepositions', 'Place & Position', 'B1/B2 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!--  LEARNING MATERIAL SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Points, Surfaces, and Areas</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p class="font-semibold text-primary">A legendary teacher's secret is to simplify. Think of these prepositions in three ways:</p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>AT (A Specific Point):</strong> Use for precise locations or points of interest. <br><em>Examples: <strong>at</strong> the bus stop, <strong>at</strong> the door, <strong>at</strong> the top of the page, <strong>at</strong> the end of the street.</em></li>
            <li><strong>ON (A Surface or Line):</strong> Use for things on a surface, a line, or for media platforms. <br><em>Examples: <strong>on</strong> the wall, <strong>on</strong> the ceiling, <strong>on</strong> the floor, <strong>on</strong> a river, <strong>on</strong> the menu, <strong>on</strong> the internet.</em></li>
            <li><strong>IN (An Enclosed Space or Area):</strong> Use for something inside a 3D space with boundaries (real or imagined). <br><em>Examples: <strong>in</strong> a room, <strong>in</strong> a garden, <strong>in</strong> a city, <strong>in</strong> a car, <strong>in</strong> a book, <strong>in</strong> a picture.</em></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Cases & Common Confusion</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold">Transport:</h4>
            <p class="text-muted-foreground">You are <strong>in</strong> a private vehicle (in a car, in a taxi) but <strong>on</strong> public transport where you can stand and walk (on a bus, on a train, on a plane).</p>
          </div>
          <div>
            <h4 class="font-semibold">Relative Position:</h4>
            <p class="text-muted-foreground">It depends on the context! <br>
              - <strong>in</strong> the front/back of a car (interior) <br>
              - <strong>at</strong> the front/back of a cinema/class (general area) <br>
              - <strong>on</strong> the front/back of a piece of paper (surface)
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!--  PRACTICE QUESTIONS SLOT                                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Unit 16: Practice Questions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-3">
            <p><span class="font-bold">{{ index + 1 }}.</span> {{ question.text.split('___')[0] }}<span class="font-mono text-primary bg-muted rounded-md px-2 py-1 mx-1">___</span>{{ question.text.split('___')[1] }}</p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="showResult" class="flex items-center gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="text-base">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>

          <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || showResult" class="w-full">
            {{ showResult ? 'Results Below' : 'Check Answers' }}
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!--  RESULTS VALIDATOR SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2 text-center">
              <h3 class="text-2xl font-bold">{{ finalFeedback.title }}</h3>
              <p class="text-muted-foreground">{{ finalFeedback.message }}</p>
              <div class="flex items-center justify-center gap-4 pt-2">
                <p class="text-4xl font-bold">{{ score }} / {{ questions.length }}</p>
                <div class="w-full max-w-xs">
                  <Progress :model-value="scorePercentage" />
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-lg font-semibold">Detailed Review</h4>
              <div v-for="question in questions" :key="`result-${question.id}`" class="rounded-lg border p-4">
                <div class="flex items-start gap-4">
                  <div>
                    <CheckCircle2 v-if="userAnswers[question.id] === question.correctAnswer" class="h-6 w-6 text-green-500" />
                    <XCircle v-else class="h-6 w-6 text-red-500" />
                  </div>
                  <div class="flex-1">
                    <p class="mb-2">
                      {{ question.text.split('___')[0] }}
                      <span
                        :class="[
                          'font-bold rounded-md px-1',
                          userAnswers[question.id] === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800 line-through'
                        ]"
                      >
                        {{ userAnswers[question.id] }}
                      </span>
                      {{ question.text.split('___')[1] }}
                    </p>

                    <Alert :variant="userAnswers[question.id] === question.correctAnswer ? 'default' : 'destructive'">
                      <AlertTitle class="flex items-center gap-2">
                        <span v-if="userAnswers[question.id] !== question.correctAnswer">
                          Correct Answer: <strong class="font-mono">{{ question.correctAnswer }}</strong>
                        </span>
                        <span v-else>Explanation</span>
                      </AlertTitle>
                      <AlertDescription>
                        {{ question.explanation }}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </div>

            <Button @click="tryAgain" variant="outline" class="w-full">
              <RotateCcw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
