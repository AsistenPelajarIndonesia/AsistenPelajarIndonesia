<!--
  File: @/pages/units/grammar/19.vue
  Description: An advanced grammar practice page for "English Grammar in Use" Unit 19.
  This page focuses on the nuanced and often-confusing "other uses" of the prepositions IN, ON, and AT.
  It leverages a sophisticated layout and provides in-depth, pedagogical feedback to students.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally registered or imported from a UI library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, BookOpen, Lightbulb, Repeat } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using the GrammarLayout component directly
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/18") // Assuming Unit 18 is the previous one
}
function goToNextUnit() {
  router.push("/units/grammar/20") // Assuming Unit 20 is the next one
}

// --- Reactive State Management ---
const showResult = ref(false)

interface Question {
  id: number
  sentence: string
  options: ['in', 'on', 'at']
  correctAnswer: 'in' | 'on' | 'at'
  userAnswer: 'in' | 'on' | 'at' | null
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    sentence: "I couldn't see the driver; he was sitting ___ a dark blue car, waiting for the signal to change.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'in',
    userAnswer: null,
    explanation: "Correct Answer: 'in'. For private, smaller vehicles like cars and taxis, we use 'in'. This signifies being enclosed within the vehicle's space. Contrast this with public or larger transport like buses or trains, where we use 'on' because you are a passenger on a scheduled service."
  },
  {
    id: 2,
    sentence: "The prime minister's statement will be broadcast live ___ television later this evening.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'on',
    userAnswer: null,
    explanation: "Correct Answer: 'on'. We use 'on' for electronic media and communication platforms like the radio, television, the internet, and the phone. Think of the information as being presented 'on' a surface or platform for you to consume."
  },
  {
    id: 3,
    sentence: "___ my opinion, the new policy will do more harm than good for small businesses.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'in',
    userAnswer: null,
    explanation: "Correct Answer: 'in'. 'In my opinion' is a fixed phrase used to express a personal viewpoint. It's an abstract use of 'in', placing your belief within the context of your personal thoughts."
  },
  {
    id: 4,
    sentence: "You'll find the fire extinguisher ___ the top of the stairs, just to your right.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'at',
    userAnswer: null,
    explanation: "Correct Answer: 'at'. We use 'at' to refer to a specific point or location. 'At the top of the stairs', 'at the bottom of the page', and 'at the end of the road' all denote precise positions."
  },
  {
    id: 5,
    sentence: "I read a fascinating article about artificial intelligence ___ a magazine while I was waiting.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'in',
    userAnswer: null,
    explanation: "Correct Answer: 'in'. For printed materials that you can open, such as a book, a newspaper, or a magazine, we use 'in'. You are reading content contained 'within' its pages."
  },
  {
    id: 6,
    sentence: "The entire building was ___ fire by the time the emergency services arrived.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'on',
    userAnswer: null,
    explanation: "Correct Answer: 'on'. 'On fire' is a fixed expression describing a state or condition. Other similar expressions include 'on holiday', 'on duty', or 'on sale'."
  },
  {
    id: 7,
    sentence: "It's not a good idea to go hiking alone ___ that part of the country; the terrain is very rugged.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'in',
    userAnswer: null,
    explanation: "Correct Answer: 'in'. We use 'in' for larger geographical areas that have defined, yet broad, boundaries, such as 'in a country', 'in a city', 'in a village', or 'in the countryside'."
  },
  {
    id: 8,
    sentence: "My apartment is ___ the third floor. Unfortunately, the elevator is broken today.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'on',
    userAnswer: null,
    explanation: "Correct Answer: 'on'. When referring to a specific floor or level of a building, we use 'on'. Imagine the floor as a flat surface upon which the apartment rests."
  },
  {
    id: 9,
    sentence: "She's a brilliant cardiologist; she is ___ a major conference in Vienna this week, presenting her research.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'at',
    userAnswer: null,
    explanation: "Correct Answer: 'at'. We use 'at' for events or group activities like 'at a party', 'at a concert', or 'at a conference'. It specifies the purpose of being in that location."
  },
  {
    id: 10,
    sentence: "Look at this photograph. That's me ___ the back row, standing next to my cousin.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'in',
    userAnswer: null,
    explanation: "Correct Answer: 'in'. When referring to being part of a line or row of people, we use 'in'. You are 'in the queue' or 'in the back row'. This is distinct from 'on the left/right'."
  },
  {
    id: 11,
    sentence: "I was so tired this morning that I accidentally left my wallet ___ home.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'at',
    userAnswer: null,
    explanation: "Correct Answer: 'at'. 'At home', 'at work', and 'at school' are common expressions where 'at' is used to denote a location associated with a primary activity or function, not just the building itself."
  },
  {
    id: 12,
    sentence: "The list of ingredients is usually printed ___ the side of the cereal box.",
    options: ['in', 'on', 'at'],
    correctAnswer: 'on',
    userAnswer: null,
    explanation: "Correct Answer: 'on'. We use 'on' to talk about a surface. A box has multiple sides (surfaces), so the information is 'on the side'. This is similar to 'on a page' or 'on a map'."
  }
]);

// --- Computed Properties ---
const score = computed(() => {
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length;
});

const totalQuestions = computed(() => questions.value.length);

const isPracticeComplete = computed(() => {
  return questions.value.every(q => q.userAnswer !== null);
});

// --- Methods ---
function submitAnswers() {
  if (isPracticeComplete.value) {
    showResult.value = true;
    // Scroll to the result section for better UX
    const resultElement = document.getElementById('result-section');
    if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    alert("Please answer all questions before checking your results.");
  }
}

function resetTest() {
  showResult.value = false;
  questions.value.forEach(q => q.userAnswer = null);
  const topElement = document.getElementById('practice-section');
  if(topElement) {
      topElement.scrollIntoView({ behavior: 'smooth'});
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced preposition exercises by Raymond Murphy"
    unit-title="Unit 19: In/on/at (other uses)"
    unit-description="Mastering prepositions for specific contexts: media, transport, abstract ideas, and locations."
    :categories="['Prepositions', 'Intermediate', 'Common Mistakes']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            <span>Core Concepts: In / On / At</span>
          </CardTitle>
          <CardDescription>
            Beyond simple time and place, these prepositions have nuanced uses. Understanding the underlying logic is key.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-bold text-base mb-2">Using 'IN' (Enclosed or Abstract Spaces)</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Enclosed Spaces:</strong> Private transport (<code class="font-mono">in a car</code>, <code class="font-mono">in a taxi</code>), printed material (<code class="font-mono">in a book</code>, <code class="font-mono">in a newspaper</code>), groups (<code class="font-mono">in a line</code>, <code class="font-mono">in a row</code>).</li>
              <li><strong>Geographical Areas:</strong> Large, general areas (<code class="font-mono">in the countryside</code>, <code class="font-mono">in London</code>, <code class="font-mono">in the world</code>).</li>
              <li><strong>Abstract Concepts:</strong> Expressing states or opinions (<code class="font-mono">in love</code>, <code class="font-mono">in my opinion</code>, <code class="font-mono">in trouble</code>).</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">Using 'ON' (Surfaces and Platforms)</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Surfaces:</strong> Literal surfaces (<code class="font-mono">on the floor</code>, <code class="font-mono">on the wall</code>, <code class="font-mono">on a page</code>, <code class="font-mono">on the coast</code>).</li>
              <li><strong>Platforms/Transport:</strong> Public transport (<code class="font-mono">on a bus</code>, <code class="font-mono">on a train</code>), media platforms (<code class="font-mono">on the radio</code>, <code class="font-mono">on the internet</code>).</li>
              <li><strong>State/Condition:</strong> Describing a current state (<code class="font-mono">on fire</code>, <code class="font-mono">on holiday</code>, <code class="font-mono">on sale</code>, <code class="font-mono">on duty</code>).</li>
              <li><strong>Direction/Position:</strong> Specific sides (<code class="font-mono">on the left/right</code>).</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">Using 'AT' (Specific Points and Events)</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><strong>Specific Points:</strong> Precise locations (<code class="font-mono">at the bus stop</code>, <code class="font-mono">at the top of the page</code>, <code class="font-mono">at the end of the street</code>).</li>
              <li><strong>Functional Locations:</strong> Places defined by their purpose (<code class="font-mono">at home</code>, <code class="font-mono">at work</code>, <code class="font-mono">at the airport</code>).</li>
              <li><strong>Events:</strong> Group activities (<code class="font-mono">at a party</code>, <code class="font-mono">at a concert</code>, <code class="font-mono">at a meeting</code>).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section" class="w-full">
        <CardHeader>
          <CardTitle>Unit 19: Practice Exercises</CardTitle>
          <CardDescription>Select the correct preposition to complete each sentence. Consider the context carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              {{ index + 1 }}. <span v-html="question.sentence.replace('___', '<span class=\'font-bold text-primary\'>___</span>')"></span>
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="showResult" class="flex flex-col sm:flex-row gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                <Label :for="`q${question.id}-${option}`" class="text-base font-mono cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="submitAnswers" :disabled="!isPracticeComplete || showResult" class="w-full sm:w-auto">
            Check My Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: Detailed Feedback and Score                             -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription class="text-lg">
              You scored <span class="font-bold text-primary">{{ score }} / {{ totalQuestions }}</span>. Review the explanations below to master the concepts.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(question, index) in questions" :key="`result-${question.id}`">
               <div class="p-4 rounded-md" :class="[question.userAnswer === question.correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500' : 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500']">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0">
                        <CheckCircle2 v-if="question.userAnswer === question.correctAnswer" class="h-6 w-6 text-green-600" />
                        <XCircle v-else class="h-6 w-6 text-red-600" />
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold text-gray-800 dark:text-gray-200">
                          {{ index + 1 }}. {{ question.sentence.replace('___', question.userAnswer || '___') }}
                        </p>
                        <div v-if="question.userAnswer !== question.correctAnswer" class="mt-1 text-sm">
                          Correct Answer: <span class="font-bold">{{ question.correctAnswer }}</span>
                        </div>
                        <div class="mt-3 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Lightbulb class="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p class="flex-1"><strong class="font-semibold text-gray-700 dark:text-gray-300">Explanation:</strong> {{ question.explanation }}</p>
                        </div>
                    </div>
                </div>
               </div>
              <Separator v-if="index < questions.length - 1" class="my-6" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="resetTest" variant="outline" class="w-full sm:w-auto">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style>
/* Optional: Add a subtle transition for the result feedback items */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
