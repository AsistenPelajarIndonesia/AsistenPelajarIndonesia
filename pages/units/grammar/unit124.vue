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
    <!-- SLOT: MATERIAL                                                          -->
    <!-- This section contains the core learning content, inspired by the        -->
    <!-- clear, contextual explanations found in Raymond Murphy's work.          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: IN</CardTitle>
          <CardDescription>Using 'in' for enclosed spaces and larger areas.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-bold">1. Enclosed Spaces (3D)</h4>
            <p class="text-sm text-muted-foreground">Think of a container or an area with boundaries.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>There's some milk <span class="font-semibold text-primary">in</span> the fridge.</li>
              <li>Who is that man standing <span class="font-semibold text-primary">in</span> the doorway?</li>
              <li>I lost my keys somewhere <span class="font-semibold text-primary">in</span> the car.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">2. Geographic Areas & Cities</h4>
            <p class="text-sm text-muted-foreground">Used for towns, countries, and continents.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>My cousin lives <span class="font-semibold text-primary">in</span> Milan.</li>
              <li>The Amazon rainforest is <span class="font-semibold text-primary">in</span> South America.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">3. Abstract Locations</h4>
            <p class="text-sm text-muted-foreground">'In' can also refer to non-physical locations.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>I read an interesting article <span class="font-semibold text-primary">in</span> the newspaper.</li>
              <li>The main characters <span class="font-semibold text-primary">in</span> the book are very compelling.</li>
              <li>She has a small role <span class="font-semibold text-primary">in</span> the play.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: AT</CardTitle>
          <CardDescription>Using 'at' for specific points and events.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-bold">1. Specific Points or Locations</h4>
            <p class="text-sm text-muted-foreground">Think of a precise place or landmark.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>I'll meet you <span class="font-semibold text-primary">at</span> the bus stop.</li>
              <li>The car was waiting <span class="font-semibold text-primary">at</span> the traffic lights.</li>
              <li>Please leave your key <span class="font-semibold text-primary">at</span> the reception desk.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">2. Events and Gatherings</h4>
            <p class="text-sm text-muted-foreground">Used for social or public occasions.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>Were there many people <span class="font-semibold text-primary">at</span> the party?</li>
              <li>I saw him <span class="font-semibold text-primary">at</span> a conference last week.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">3. Addresses & Specific Buildings</h4>
            <p class="text-sm text-muted-foreground">Used with specific addresses or buildings when viewed as a point.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>The Prime Minister lives <span class="font-semibold text-primary">at</span> 10 Downing Street.</li>
              <li>We had lunch <span class="font-semibold text-primary">at</span> the airport before our flight.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: ON</CardTitle>
          <CardDescription>Using 'on' for surfaces and lines.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-bold">1. Surfaces (2D)</h4>
            <p class="text-sm text-muted-foreground">Think of something resting on top of another.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>Don't leave your dirty shoes <span class="font-semibold text-primary">on</span> the carpet.</li>
              <li>There is a new notice <span class="font-semibold text-primary">on</span> the notice board.</li>
              <li>He has a small tattoo <span class="font-semibold text-primary">on</span> his left arm.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">2. Lines and Paths</h4>
            <p class="text-sm text-muted-foreground">Used for rivers, roads, coasts, etc.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>Portsmouth is a city <span class="font-semibold text-primary">on</span> the south coast of England.</li>
              <li>Is your town <span class="font-semibold text-primary">on</span> the main road to London?</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">3. Public Transport & Media</h4>
            <p class="text-sm text-muted-foreground">A specific convention for these categories.</p>
            <ul class="mt-2 list-disc pl-6 text-sm">
              <li>I was the only person <span class="font-semibold text-primary">on</span> the bus. (But: <span class="italic">in</span> a car/taxi)</li>
              <li>I heard a great song <span class="font-semibold text-primary">on</span> the radio.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card class="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
          <CardTitle class="text-amber-800 dark:text-amber-200">Teacher's Notes: Common Points of Confusion</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <p><span class="font-bold">In the corner</span> vs. <span class="font-bold">At/On the corner</span></p>
            <ul class="mt-1 list-disc pl-6">
              <li><span class="font-semibold text-primary">In the corner</span> of a room (inside a 3D space).</li>
              <li><span class="font-semibold text-primary">At/On the corner</span> of a street (an outside point).</li>
            </ul>
          </div>
          <div>
            <p><span class="font-bold">In front of</span> vs. <span class="font-bold">At the front of</span></p>
            <ul class="mt-1 list-disc pl-6">
              <li><span class="font-semibold text-primary">In front of</span>: Outside and facing something. 'The car is parked in front of the house.'</li>
              <li><span class="font-semibold text-primary">At the front of</span>: Inside, near the entrance. 'I'll meet you at the front of the cinema.'</li>
            </ul>
          </div>
           <div>
            <p><span class="font-bold">In a car/taxi</span> vs. <span class="font-bold">On a bus/train/plane</span></p>
            <ul class="mt-1 list-disc pl-6">
              <li><span class="font-semibold text-primary">In</span> is for private, smaller vehicles you sit inside.</li>
              <li><span class="font-semibold text-primary">On</span> is for public, larger vehicles where you can walk around.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- This section contains the interactive exercises. Questions are crafted  -->
    <!-- to be challenging and require deep contextual understanding.            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 17: Practice Exercises</CardTitle>
          <CardDescription>Choose the correct preposition: IN, AT, or ON.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-3">
            <p class="text-sm font-medium leading-none">
              {{ index + 1 }}. {{ question.text_start }}
              <span class="inline-block h-5 w-20 rounded-md border border-dashed align-middle"></span>
              {{ question.text_end }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="showResult">
              <div class="flex items-center space-x-4">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="capitalize">{{ option }}</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
           <Button v-if="showResult" variant="outline" @click="resetTest">Try Again</Button>
           <Button @click="checkAnswers" :disabled="showResult">Check Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- This section displays the student's score and detailed, question-by-    -->
    <!-- question feedback, which is crucial for genuine learning.               -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
         <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
             You scored <span class="font-bold text-primary">{{ score.correct }} out of {{ score.total }}</span>.
             Review the explanations below to master these concepts.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="`result-${question.id}`"
               :class="['p-4 rounded-md border', question.isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950']"
          >
              <div class="flex items-start gap-4">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                     :class="question.isCorrect ? 'bg-green-500' : 'bg-red-500'">
                     <Check v-if="question.isCorrect" class="h-5 w-5 text-white" />
                     <X v-else class="h-5 w-5 text-white" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold">
                    {{ index + 1 }}. {{ question.text_start }}
                    <span :class="['font-bold px-1 rounded', question.isCorrect ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800']">{{ question.userAnswer || ' unanswered ' }}</span>
                    {{ question.text_end }}
                  </p>
                  <p v-if="!question.isCorrect" class="text-sm mt-1">
                    Correct answer: <span class="font-bold capitalize">{{ question.correctAnswer }}</span>
                  </p>
                  <div class="mt-3 pt-3 border-t text-xs" :class="question.isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'">
                    <p class="font-bold text-muted-foreground">EXPLANATION:</p>
                    <p class="text-muted-foreground">{{ question.explanation }}</p>
                  </div>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Check, X } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Component State ---
const showResult = ref(false)
const router = useRouter()

const pageDetails = reactive({
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 17: In / At / On (Position) 3',
  unitDescription: 'This unit covers more complex and nuanced situations for locational prepositions, helping you distinguish between similar-sounding but contextually different choices.',
  categories: ['Prepositions', 'Location', 'Intermediate', 'B1/B2 Level']
})

interface Question {
  id: number
  text_start: string
  text_end: string
  options: string[]
  correctAnswer: string
  explanation: string
  userAnswer: string | null
  isCorrect: boolean | null
}

const questions = ref<Question[]>([
  {
    id: 1,
    text_start: 'The suspect was last seen standing',
    text_end: 'the corner of Oak Street and Elm Avenue.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: "'At the corner' is the standard phrase for an intersection or the external corner of a street. 'In the corner' refers to the inside of a room.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 2,
    text_start: 'I couldn\'t find the article you mentioned',
    text_end: 'today\'s newspaper.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: "We use 'in' for content that is contained within a book, newspaper, or magazine. The article is part of the collection of content inside the paper.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 3,
    text_start: 'There was a huge spider crawling',
    text_end: 'the ceiling directly above me.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: "'On' is used for surfaces. A ceiling is treated as a surface that something can be on, similar to a wall or floor.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 4,
    text_start: 'It\'s not safe for children to play',
    text_end: 'the street; they should use the park.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: "'In the street' often implies being in the roadway itself, where cars travel. 'On the street' can mean this, but is also used to refer to a building's location (e.g., 'a shop on High Street'). 'In' emphasizes the danger here.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 5,
    text_start: 'I think I left my umbrella',
    text_end: 'the bus this morning.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: "We use 'on' for public transportation like buses, trains, and planes where you can typically stand and walk. We use 'in' for smaller, private vehicles like cars and taxis.",
    userAnswer: null,
    isCorrect: null,
  },
    {
    id: 6,
    text_start: 'He felt very uncomfortable as he stood',
    text_end: 'the back of the crowded lecture hall.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: "'At the back/front/side of' is used to describe a general position within a place or building. 'In the back' would typically be used for a vehicle (e.g., 'in the back of the car').",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 7,
    text_start: 'Our house is the one',
    text_end: 'the end of the cul-de-sac.',
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: "'At the end of' is the correct idiom for referring to the termination point of a road, path, or queue.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 8,
    text_start: "The name and address are written",
    text_end: "the back of the envelope.",
    options: ['in', 'at', 'on'],
    correctAnswer: 'on',
    explanation: "We use 'on' because the back of an envelope is a surface. The information is written on this surface.",
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 9,
    text_start: "She spent the entire afternoon sitting",
    text_end: "an armchair, reading a novel.",
    options: ['in', 'at', 'on'],
    correctAnswer: 'in',
    explanation: "For armchairs and sofas, which 'enclose' you with their arms and back, 'in' is the correct preposition. For a simple chair or stool with no arms, 'on' would be used.",
    userAnswer: null,
    isCorrect: null,
  },
   {
    id: 10,
    text_start: "I'll be waiting for you",
    text_end: "the main entrance of the museum.",
    options: ['in', 'at', 'on'],
    correctAnswer: 'at',
    explanation: "'At' is used for a specific meeting point. The main entrance is a precise point of rendezvous.",
    userAnswer: null,
    isCorrect: null,
  }
])

// --- Computed Properties ---
const score = computed(() => {
  const correct = questions.value.filter(q => q.isCorrect).length
  const total = questions.value.length
  return { correct, total }
})

// --- Methods ---
function goToPreviousUnit() {
  router.push("/units/grammar/16")
}

function goToNextUnit() {
  router.push("/units/grammar/18")
}

function checkAnswers() {
  questions.value.forEach(q => {
    q.isCorrect = q.userAnswer === q.correctAnswer
  })
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
      const resultElement = document.querySelector('[data-slot="result"]'); // Add a data attribute to the result slot wrapper if needed
      // A more robust way is to target a specific ID inside the result slot
      // For now, let's just scroll to the bottom of the page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 100)
}

function resetTest() {
  showResult.value = false;
  questions.value.forEach(q => {
    q.userAnswer = null;
    q.isCorrect = null;
  });
   window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
/* Smooth transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
