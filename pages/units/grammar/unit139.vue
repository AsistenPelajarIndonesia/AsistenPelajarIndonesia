<!--
  File: @/pages/units/grammar/32.vue
  Description: An advanced grammar practice page for Unit 32: Phrasal Verbs 4 - On/Off (1),
  inspired by Raymond Murphy's "English Grammar In Use". This page provides in-depth
  learning material, challenging exercises, and a detailed results validator to ensure
  a tangible improvement in a student's grammatical proficiency.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'

// --- Layout & UI Component Imports ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit, Repeat } from 'lucide-vue-next'

// --- Page State Management ---
const router = useRouter()
const showResult = ref(false)
const isSubmitted = ref(false)
const resultCardRef = ref<HTMLElement | null>(null)

// --- Navigation Logic ---
function goToPreviousUnit() {
  router.push("/units/grammar/31")
}
function goToNextUnit() {
  router.push("/units/grammar/33")
}

// --- Data Structures for Learning Content ---
interface PhrasalVerbConcept {
  verb: string
  meaning: string
  example: string
  nuance: string
}

const onConcepts: PhrasalVerbConcept[] = [
  { verb: 'go on / carry on', meaning: 'To continue an action.', example: 'Despite the interruption, the lecturer decided to carry on with the presentation.', nuance: 'Often implies resuming after a pause or persisting through difficulty.' },
  { verb: 'keep on', meaning: 'To continue an action, often repetitively or annoyingly.', example: 'He keeps on leaving the door open, no matter how many times I ask him to close it.', nuance: 'Carries a stronger sense of persistence, sometimes to the point of irritation.' },
  { verb: 'put on', meaning: 'To place something on oneself (e.g., clothes, weight, a performance).', example: 'She quickly put on a brave face, but I could tell she was upset.', nuance: 'Extends beyond clothing to metaphorical applications like emotions or characteristics.' },
  { verb: 'turn on / switch on', meaning: 'To activate a device or light.', example: 'Could you turn on the projector? The meeting is about to start.', nuance: 'Fundamentally about starting the flow of power or function.' },
  { verb: 'get on', meaning: '1. To make progress. 2. To have a good relationship.', example: 'How are you getting on with that complex report? / Luckily, I get on well with my new colleagues.', nuance: 'Highly contextual. The first meaning is about tasks, the second about social harmony.' },
]

const offConcepts: PhrasalVerbConcept[] = [
  { verb: 'put off', meaning: 'To postpone or delay an event.', example: 'Due to the key speaker\'s illness, we have to put off the conference until next month.', nuance: 'Implies rescheduling, not cancellation. A common point of confusion.' },
  { verb: 'call off', meaning: 'To cancel an event entirely.', example: 'They called off the search when it became too dark to see anything.', nuance: 'Signifies a definitive cancellation with no immediate plan to reschedule.' },
  { verb: 'take off', meaning: '1. To remove clothing. 2. For an aircraft to leave the ground. 3. To become successful suddenly.', example: 'Her career really took off after she published her first novel.', nuance: 'The third meaning, related to sudden success, is a crucial idiomatic usage.' },
  { verb: 'turn off / switch off', meaning: 'To deactivate a device or light.', example: 'Please switch off all electronic devices before the performance begins.', nuance: 'The direct opposite of "turn on/switch on".' },
  { verb: 'go off', meaning: '1. For an alarm to ring. 2. For a bomb to explode. 3. For food to spoil.', example: 'I didn\'t hear the alarm go off this morning. / Don\'t eat that yoghurt; it smells like it has gone off.', nuance: 'A versatile verb where context is critical to avoid misunderstanding (e.g., an alarm versus spoiled milk).' },
  { verb: 'set off', meaning: 'To begin a journey.', example: 'We need to set off early to avoid the morning traffic.', nuance: 'Focuses specifically on the commencement of travel.' },
]

// --- Practice Questions & Validator Logic ---
interface PracticeQuestion {
  id: number
  question: string
  context: string
  options: string[]
  userAnswer: Ref<string>
  correctAnswer: string
  explanation: string
}

const questions: Ref<PracticeQuestion[]> = ref([
  {
    id: 1,
    question: "Select the most appropriate phrasal verb to complete the sentence.",
    context: "The board meeting, which was scheduled for Tuesday, had to be moved to Friday because the quarterly reports weren't ready. The meeting was ______.",
    options: ['called off', 'put off', 'set off', 'taken off'],
    userAnswer: ref(''),
    correctAnswer: 'put off',
    explanation: "'Put off' means to postpone or delay to a later time. 'Called off' would mean it was cancelled entirely, which is incorrect as it was rescheduled. 'Set off' means to start a journey, and 'taken off' is irrelevant here."
  },
  {
    id: 2,
    question: "Which sentence uses 'go off' with the meaning of 'spoil' or 'become bad to eat'?",
    context: "Considering the various meanings of 'go off', identify its usage related to food.",
    options: [
      "The fire alarm will go off if it detects smoke.",
      "The expedition is set to go off at dawn.",
      "After being left out of the fridge for a day, the milk will probably go off.",
      "A bomb went off in the city centre, causing chaos."
    ],
    userAnswer: ref(''),
    correctAnswer: 'After being left out of the fridge for a day, the milk will probably go off.',
    explanation: "In this context, 'go off' refers to food becoming spoiled or rotten. The other options refer to an alarm ringing ('go off'), an event starting (a less common, almost interchangeable use with 'set off'), and an explosion."
  },
  {
    id: 3,
    question: "Complete the dialogue with the correct particle and pronoun placement.",
    context: "A: 'The television is too loud.' B: 'Okay, I'll ______ right now.'",
    options: ['turn off it', 'turn it off', 'it turn off', 'off turn it'],
    userAnswer: ref(''),
    correctAnswer: 'turn it off',
    explanation: "'Turn off' is a separable phrasal verb. When the object is a pronoun (like 'it', 'him', 'them'), it MUST come between the verb and the particle. Therefore, 'turn it off' is the only grammatically correct structure."
  },
  {
    id: 4,
    question: "What is the manager asking in this question: 'How are you getting on with the new software implementation?'",
    context: "Analyse the use of 'get on' in a professional context.",
    options: [
      "If you like the new software.",
      "If you are making good progress with the task.",
      "If you have a friendly relationship with the software.",
      "If you have activated the software."
    ],
    userAnswer: ref(''),
    correctAnswer: "If you are making good progress with the task.",
    explanation: "While 'get on' can mean to have a good relationship with someone, when used with 'with' followed by a task or project ('the new software implementation'), it means to ask about the progress or success of that task."
  },
  {
    id: 5,
    question: "Which phrasal verb correctly describes a sudden rise to fame or success?",
    context: "After her viral video, the singer's career is expected to ______.",
    options: ['set off', 'go on', 'carry on', 'take off'],
    userAnswer: ref(''),
    correctAnswer: 'take off',
    explanation: "In an idiomatic sense, 'take off' means to become successful or popular very quickly. 'Set off' is for journeys, while 'go on' and 'carry on' mean to continue, which doesn't fit the context of a sudden rise."
  },
  {
    id: 6,
    question: "The team leader was furious about the missed deadline and decided to ______ the junior analyst in front of everyone.",
    context: "Which phrasal verb means to scold or reprimand someone?",
    options: ['tell off', 'call off', 'put off', 'turn off'],
    userAnswer: ref(''),
    correctAnswer: 'tell off',
    explanation: "'Tell off' is an idiomatic phrasal verb that means to speak angrily to someone because they have done something wrong; to scold. The other options are incorrect: 'call off' (cancel), 'put off' (postpone), and 'turn off' (deactivate)."
  }
])

// --- Computed Properties for Results ---
const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.filter(q => {
    const userAnswer = typeof q.userAnswer.value === 'string' ? q.userAnswer.value.trim() : ''
    return userAnswer === q.correctAnswer
  }).length
})

const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

// --- Control Functions ---
function checkAnswers() {
  isSubmitted.value = true
  showResult.value = true
  setTimeout(() => {
    resultCardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

function resetTest() {
  isSubmitted.value = false
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer.value = ''
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series"
    unit-title="Unit 32: Phrasal Verbs 4 - On/Off (1)"
    unit-description="Mastering phrasal verbs with 'on' and 'off', focusing on concepts of continuation, activation, deactivation, and postponement."
    :categories="['Phrasal Verbs', 'Intermediate', 'Vocabulary', 'Idioms']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader class="flex-row items-center gap-3 space-y-0">
          <BookOpen class="h-6 w-6 text-blue-500" />
          <CardTitle>Core Concepts: Phrasal Verbs with ON</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div v-for="concept in onConcepts" :key="concept.verb" class="p-3 border rounded-md">
            <p class="font-semibold text-base">{{ concept.verb }}</p>
            <p class="text-sm text-muted-foreground italic">"{{ concept.meaning }}"</p>
            <p class="mt-2 text-sm">e.g., <span class="font-mono bg-muted p-1 rounded-sm">{{ concept.example }}</span></p>
            <p class="mt-1 text-xs text-sky-700 dark:text-sky-400"><strong>Nuance:</strong> {{ concept.nuance }}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex-row items-center gap-3 space-y-0">
          <BookOpen class="h-6 w-6 text-red-500" />
          <CardTitle>Core Concepts: Phrasal Verbs with OFF</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div v-for="concept in offConcepts" :key="concept.verb" class="p-3 border rounded-md">
            <p class="font-semibold text-base">{{ concept.verb }}</p>
            <p class="text-sm text-muted-foreground italic">"{{ concept.meaning }}"</p>
            <p class="mt-2 text-sm">e.g., <span class="font-mono bg-muted p-1 rounded-sm">{{ concept.example }}</span></p>
            <p class="mt-1 text-xs text-sky-700 dark:text-sky-400"><strong>Nuance:</strong> {{ concept.nuance }}</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card class="overflow-hidden">
        <CardHeader class="flex-row items-center gap-3 space-y-0">
          <BrainCircuit class="h-6 w-6 text-green-500" />
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Analyse the context carefully.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <p class="font-semibold mb-1">{{ index + 1 }}. {{ q.question }}</p>
            <p class="text-sm text-muted-foreground mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-md">
              {{ q.context }}
            </p>
            <RadioGroup v-model="q.userAnswer.value" :disabled="isSubmitted" class="grid gap-2">
              <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                <Label :for="`${q.id}-${option}`" class="leading-snug">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="border-t pt-6">
          <Button @click="checkAnswers" :disabled="isSubmitted" class="w-full">
            Check Answers & See Explanations
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div ref="resultCardRef">
        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>Review your performance and read the explanations to improve.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="text-center space-y-2">
              <p class="text-5xl font-bold">{{ score }} / {{ totalQuestions }}</p>
              <p class="text-muted-foreground">Correct Answers</p>
              <Progress :model-value="scorePercentage" class="w-full" />
            </div>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold border-b pb-2">Detailed Breakdown</h3>
              <div v-for="(q, index) in questions" :key="`result-${q.id}`">
                <Alert :variant="q.userAnswer.value === q.correctAnswer ? 'default' : 'destructive'">
                  <div class="flex items-start gap-4">
                    <CheckCircle2 v-if="q.userAnswer.value === q.correctAnswer" class="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <XCircle v-else class="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <div class="flex-grow">
                      <AlertTitle>Question {{ index + 1 }}</AlertTitle>
                      <AlertDescription class="space-y-2">
                        <p class="font-sans">"{{ q.context }}"</p>
                        <p><strong>Your Answer:</strong> <span :class="{'text-red-600 dark:text-red-400': q.userAnswer.value !== q.correctAnswer, 'text-green-600 dark:text-green-400': q.userAnswer.value === q.correctAnswer}">{{ q.userAnswer.value || 'Not Answered' }}</span></p>
                        <p v-if="q.userAnswer.value !== q.correctAnswer"><strong>Correct Answer:</strong> <span class="font-semibold">{{ q.correctAnswer }}</span></p>
                        <div class="mt-2 p-3 bg-background/50 rounded-lg border">
                          <p class="font-semibold text-sm">Explanation:</p>
                          <p class="text-sm">{{ q.explanation }}</p>
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="resetTest" variant="outline" class="w-full">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
