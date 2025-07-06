<!--
  File: @/pages/units/grammar/7.vue
  Description: A deep-dive practice module for Unit 7 of 'English Grammar In Use',
  focusing on the nuanced use of the definite article 'the' with institutions.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

// --- Component Imports ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: "English Grammar In Use Practice",
  testDescription: "Advanced exercises based on Raymond Murphy's Bestseller",
  unit: 7,
  unitTitle: "Unit 7: The 2 (school / the school etc.)",
  unitDescription: "Mastering the use of the definite article 'the' with institutions like school, prison, and hospital versus their physical buildings.",
  categories: ["Articles", "Nouns", "Contextual Usage"]
}

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push(`/units/grammar/${unitDetails.unit - 1}`)
const goToNextUnit = () => router.push(`/units/grammar/${unitDetails.unit + 1}`)

// --- Reactive State Management ---
interface Question {
  id: number
  sentence: string[] // [ 'part 1', 'part 2' ]
  correctAnswer: string // 'the' or ''
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    sentence: ["Carol is 10 years old. Every day she goes to", "by bicycle. She enjoys her lessons."],
    correctAnswer: '',
    explanation: "We say 'go to school' when referring to the general idea of attending school as a student for the purpose of learning. No article is needed.",
  },
  {
    id: 2,
    sentence: ["Carol's mother wanted to speak to her daughter's teacher, so she went to", "to see her after classes."],
    correctAnswer: 'the',
    explanation: "Here, Carol's mother is not a student. She is a visitor going to the specific school building for a particular reason (to see a teacher). We use 'the' to refer to the specific place.",
  },
  {
    id: 3,
    sentence: ["Ken's brother is an architect. He is currently in", "for embezzling company funds."],
    correctAnswer: '',
    explanation: "'In prison' is an institutional state, like being sick is a state. It means he is an inmate. We don't use an article when talking about this general state or purpose.",
  },
  {
    id: 4,
    sentence: ["I wouldn't want to work as a guard in", "that you see on the hill; it looks very grim."],
    correctAnswer: 'the',
    explanation: "We are referring to a specific, identifiable prison building ('that you see on the hill'). The context points to a particular physical location, so 'the' is required.",
  },
  {
    id: 5,
    sentence: ["David usually goes to", "on Sundays to pray. He is very religious."],
    correctAnswer: '',
    explanation: "'Go to church' means to attend a religious service. It refers to the activity and the institution's purpose, not a specific building.",
  },
  {
    id: 6,
    sentence: ["The workmen went to", "to repair the roof which was damaged in the storm."],
    correctAnswer: 'the',
    explanation: "The workmen are not going to church to worship. They are going to the specific church building to perform a job (repairing the roof). 'The' specifies the location of their work.",
  },
  {
    id: 7,
    sentence: ["When I was younger, I had to stay in", "for two weeks after a minor surgery."],
    correctAnswer: '',
    explanation: "'In hospital' (British English) or 'in the hospital' (American English, but for this exercise, we follow the British convention from the book) means being there as a patient for treatment. The focus is on the state of being hospitalized.",
  },
  {
    id: 8,
    sentence: ["Excuse me, can you tell me how to get to", "? My friend was admitted last night and I want to visit him."],
    correctAnswer: 'the',
    explanation: "The speaker is a visitor asking for directions to a specific hospital building. They are not a patient. Therefore, 'the' is used to specify the destination.",
  },
  {
    id: 9,
    sentence: ["After graduating, Sarah wants to go to", "to study astrophysics."],
    correctAnswer: '',
    explanation: "'Go to university' or 'go to college' refers to the general idea of pursuing higher education as a student. It's a stage of life and learning, not just a place.",
  },
  {
    id: 10,
    sentence: ["The conference will be held at", "of Cambridge, in the main lecture hall."],
    correctAnswer: 'the',
    explanation: "We are specifying a particular university ('of Cambridge') as a venue for an event (a conference). The context is about the location, not about being a student there.",
  },
  {
    id: 11,
    sentence: ["It's late, you look tired. You should go to", "now."],
    correctAnswer: '',
    explanation: "'Go to bed' is a fixed expression meaning to go to sleep. It doesn't refer to a specific piece of furniture but to the act of retiring for the night.",
  },
  {
    id: 12,
    sentence: ["He sat down on the edge of", "and took off his socks."],
    correctAnswer: 'the',
    explanation: "Here, we are referring to a specific piece of furniture in the room ('the bed'). The focus is on the physical object, not the act of sleeping.",
  },
]);

const userAnswers = ref<string[]>(Array(questions.value.length).fill(''))
const isSubmitted = ref(false)
const score = ref(0)

const checkAnswers = () => {
  let correctCount = 0
  questions.value.forEach((q, index) => {
    const userAnswer = userAnswers.value[index]?.trim().toLowerCase() || ''
    const correctAnswer = q.correctAnswer.toLowerCase()
    if (userAnswer === correctAnswer) {
      correctCount++
    }
  })
  score.value = Math.round((correctCount / questions.value.length) * 100)
  isSubmitted.value = true
}

const resetPractice = () => {
  isSubmitted.value = false;
  userAnswers.value = Array(questions.value.length).fill('');
  score.value = 0;
  // Scroll to the top of the practice section
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}

const scoreColor = computed(() => {
  if (score.value >= 80) return 'text-green-500'
  if (score.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: Learning Content                                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Core Principle: Purpose vs. Place</CardTitle>
          <CardDescription>
            The key is to ask: are we talking about the <em class="font-semibold">purpose</em> of the institution or a specific <em class="font-semibold">place/building</em>?
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h3 class="font-semibold text-base mb-2">No Article ('school', 'prison')</h3>
            <p class="text-muted-foreground mb-2">Use no article when referring to the institution in a general, abstract sense, connected to its primary purpose.</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong class="font-medium">She goes to school.</strong> (Purpose: She is a student.)</li>
              <li><strong class="font-medium">He is in prison.</strong> (Purpose: He is an inmate.)</li>
              <li><strong class="font-medium">My aunt is in hospital.</strong> (Purpose: She is a patient.)</li>
              <li><strong class="font-medium">We go to church every week.</strong> (Purpose: We go to worship.)</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">With 'The' ('the school', 'the prison')</h3>
            <p class="text-muted-foreground mb-2">Use 'the' when you are thinking of a specific, concrete building or location. The person involved is often a visitor or someone there for a different reason.</p>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong class="font-medium">I went to the school to meet a teacher.</strong> (Place: A specific school building.)</li>
              <li><strong class="font-medium">The prison is five miles from here.</strong> (Place: A specific building at a location.)</li>
              <li><strong class="font-medium">I met a nurse outside the hospital.</strong> (Place: A specific hospital building.)</li>
              <li><strong class="font-medium">The architect admired the church.</strong> (Place: A specific building's design.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Alert variant="default">
        <AlertTriangle class="h-4 w-4" />
        <AlertTitle>Special Cases: 'Home', 'Work', 'Bed'</AlertTitle>
        <AlertDescription>
          These words follow similar logic. 'Go home', 'be at work', and 'go to bed' are idiomatic expressions about a state or activity. If you refer to the specific house or physical workplace, you might use 'the', e.g., "We need to fix the roof of <strong class="font-medium">the</strong> house."
        </AlertDescription>
      </Alert>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Interactive Questions                                        -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Type <strong class="font-medium">'the'</strong> if necessary. If no article is needed, leave the box empty.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-2">
            <p class="text-sm font-medium leading-none">
              Question {{ index + 1 }}
            </p>
            <div class="flex flex-wrap items-baseline gap-2 text-base">
              <span>{{ q.sentence[0] }}</span>
              <Input
                :id="`q${q.id}`"
                v-model="userAnswers[index]"
                :disabled="isSubmitted"
                class="inline-flex h-8 w-24 shrink-0 rounded-md border px-2 py-1 text-center font-semibold"
                placeholder="the / -"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
              />
              <span>{{ q.sentence[1] }}</span>
            </div>
          </div>
          <Button @click="checkAnswers" :disabled="isSubmitted" class="w-full">
            Check My Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: Score and Detailed Feedback                                    -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your answers and the explanations to master the concept.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center gap-4 rounded-lg border p-4">
            <div class="flex-1 space-y-2">
              <p class="text-sm font-medium">Overall Score</p>
              <Progress :model-value="score" class="h-2" />
            </div>
            <span class="text-3xl font-bold" :class="scoreColor">{{ score }}%</span>
          </div>

          <Separator />
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Review</h3>
            <div
              v-for="(q, index) in questions"
              :key="`result-${q.id}`"
              class="rounded-md border p-4 transition-colors"
              :class="userAnswers[index]?.trim().toLowerCase() === q.correctAnswer.toLowerCase() ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'"
            >
              <div class="flex items-start gap-3">
                 <div class="mt-1">
                  <CheckCircle2 v-if="userAnswers[index]?.trim().toLowerCase() === q.correctAnswer.toLowerCase()" class="h-5 w-5 text-green-600 dark:text-green-400" />
                  <XCircle v-else class="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-sm">
                    {{ q.sentence[0] }}
                    <span class="font-bold underline decoration-2 decoration-dotted" 
                      :class="userAnswers[index]?.trim().toLowerCase() === q.correctAnswer.toLowerCase() ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
                      {{ userAnswers[index] || '___' }}
                    </span>
                    {{ q.sentence[1] }}
                  </p>
                   <p v-if="userAnswers[index]?.trim().toLowerCase() !== q.correctAnswer.toLowerCase()" class="text-xs text-green-800 dark:text-green-300 mt-1">
                      Correct answer: "{{ q.correctAnswer || '(no article)' }}"
                   </p>
                  <p class="mt-2 text-xs text-muted-foreground bg-background/50 p-2 rounded-md">
                    <strong class="font-semibold">Explanation:</strong> {{ q.explanation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Button @click="resetPractice" variant="outline" class="w-full">
            Try Again
          </Button>

        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
