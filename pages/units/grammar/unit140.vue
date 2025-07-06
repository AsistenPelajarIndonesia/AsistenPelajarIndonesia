<!--
  File: @/pages/units/grammar/33.vue
  Unit: 33 - Phrasal Verbs 5: On/off (2)
  Description: An advanced practice module for nuanced uses of phrasal verbs with 'on' and 'off'.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = "English Grammar In Use: Practice"
const testDescription = "Advanced exercises based on the book by Raymond Murphy."
const unitTitle = "Unit 33: Phrasal Verbs 5 - On / Off (2)"
const unitDescription = "This unit explores the more abstract and idiomatic meanings of phrasal verbs using 'on' and 'off', focusing on continuation, cancellation, departure, and states of being."
const categories = ['Phrasal Verbs', 'Advanced Vocabulary', 'Idiomatic Expressions']

// --- Router for Navigation ---
const router = useRouter()

function goToPreviousUnit() {
  // Assuming the previous unit is 32. Adjust if necessary.
  router.push("/units/grammar/32")
}

function goToNextUnit() {
  // Assuming the next unit is 34. Adjust if necessary.
  router.push("/units/grammar/34")
}

// --- Reactive State for the Quiz ---
interface Question {
  id: number
  type: 'fill-in-the-blank' | 'multiple-choice' | 'sentence-transformation'
  prompt: string
  context?: string
  options?: string[]
  userAnswer: string
  correctAnswer: string | string[]
  explanation: string
  isCorrect: boolean
}

const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    prompt: "The meeting was scheduled for Tuesday, but due to the director's sudden illness, they had to ______.",
    options: ['call it off', 'see it off', 'set it on', 'wear it off'],
    userAnswer: '',
    correctAnswer: 'call it off',
    explanation: "'To call something off' is the correct phrasal verb meaning to cancel an event. 'See off' is for saying goodbye, 'set on' is incorrect, and 'wear off' means for an effect to diminish.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 2,
    type: 'sentence-transformation',
    prompt: "The initial excitement of living in a new city has gradually disappeared.",
    context: "Complete the sentence using a phrasal verb: The novelty has started to ______.",
    userAnswer: '',
    correctAnswer: 'wear off',
    explanation: "'To wear off' is an idiomatic phrasal verb that means the effect or feeling of something gradually fades or disappears over time. It's perfect for describing diminishing novelty or excitement.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    prompt: "What time are you planning to ______ tomorrow morning for your trip to the mountains?",
    userAnswer: '',
    correctAnswer: 'set off',
    explanation: "'To set off' means to begin a journey. It's a common phrasal verb used for departures, especially for long trips.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 4,
    type: 'multiple-choice',
    prompt: "Even though everyone told her to stop, she decided to ______ arguing her point.",
    options: ['go on', 'carry on', 'drive on', 'get on'],
    userAnswer: '',
    correctAnswer: 'carry on',
    explanation: "Both 'go on' and 'carry on' mean to continue. However, 'carry on' often implies continuing despite difficulties, opposition, or interruptions, which fits this context best. 'Drive on' is for journeys, and 'get on' means to manage or make progress.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 5,
    type: 'fill-in-the-blank',
    prompt: "The new medication worked well at first, but its effects started to ______ after a few hours.",
    userAnswer: '',
    correctAnswer: 'wear off',
    explanation: "Similar to question 2, 'wear off' is used here to describe the diminishing effect of the medication.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 6,
    type: 'sentence-transformation',
    prompt: "The bomb exploded without any warning.",
    context: "Complete the sentence using a phrasal verb: The bomb ______ without warning.",
    userAnswer: '',
    correctAnswer: 'went off',
    explanation: "'To go off' has several meanings. In this context, it means to explode (for a bomb) or to ring (for an alarm).",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 7,
    type: 'fill-in-the-blank',
    prompt: "I'm not sure what's ______ at the theatre tonight, but I can check the listings online.",
    userAnswer: '',
    correctAnswer: 'on',
    explanation: "The expression 'what's on' is used to ask what is being shown, performed, or is happening at a venue like a cinema, theatre, or on a TV channel.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
  {
    id: 8,
    type: 'multiple-choice',
    prompt: "My parents came to the airport to ______ me ______ when I left for my year abroad.",
    options: ['set ... off', 'see ... off', 'put ... on', 'take ... on'],
    userAnswer: '',
    correctAnswer: 'see ... off',
    explanation: "The phrasal verb 'to see somebody off' means to go to the place where someone is departing (like an airport or train station) to say goodbye to them. It is a separable phrasal verb.",
    get isCorrect() { return this.userAnswer.trim().toLowerCase() === this.correctAnswer; }
  },
])

const showResult = ref(false)
const isSubmitted = ref(false)

const score = computed(() => questions.filter(q => q.isCorrect).length)
const totalQuestions = computed(() => questions.length)
const scorePercentage = computed(() => (score.value / totalQuestions.value) * 100)

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return { title: "Flawless Victory!", message: "Your mastery of these phrasal verbs is truly impressive. Excellent work!", variant: 'default' as 'default' };
  if (percentage >= 75) return { title: "Excellent Grasp!", message: "You have a strong understanding of these nuanced verbs. Review the incorrect answers to perfect your knowledge.", variant: 'default' as 'default' };
  if (percentage >= 50) return { title: "Good Effort!", message: "You're on the right track! The explanations below will help clarify the more complex uses.", variant: 'destructive' as 'destructive' };
  return { title: "Needs Review", message: "These phrasal verbs are tricky. Carefully study the explanations for each question to build a stronger foundation.", variant: 'destructive' as 'destructive' };
})


function handleSubmit() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the results section for better UX
  // The element needs to exist in the DOM first
  setTimeout(() => {
    const resultElement = document.getElementById('results-section');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- MATERIAL SLOT: Learning Content                                         -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts: ON</CardTitle>
          <CardDescription>Beyond turning things on, 'on' often implies continuation or occurrence.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p class="font-semibold">1. To Continue: <code class="bg-muted px-1 py-0.5 rounded">go on</code>, <code class="bg-muted px-1 py-0.5 rounded">carry on</code>, <code class="bg-muted px-1 py-0.5 rounded">drive on</code></p>
            <p class="text-muted-foreground mt-1">These verbs signify continuing an action. <code class="font-semibold">Carry on</code> often suggests persistence despite difficulty.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"The show must <span class="font-bold text-primary">go on</span>." (Continue happening)</li>
              <li>"She had to <span class="font-bold text-primary">carry on</span> working despite the headache." (Continue with difficulty)</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">2. To Happen or Be Scheduled: <code class="bg-muted px-1 py-0.5 rounded">be on</code></p>
            <p class="text-muted-foreground mt-1">Used to ask or state what is scheduled or currently showing.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"What's <span class="font-bold text-primary">on</span> at the cinema this week?"</li>
              <li>"The match is <span class="font-bold text-primary">on</span> Channel 4."</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts: OFF</CardTitle>
          <CardDescription>'Off' frequently relates to departure, cancellation, or cessation.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p class="font-semibold">1. To Depart / Start a Journey: <code class="bg-muted px-1 py-0.5 rounded">set off</code>, <code class="bg-muted px-1 py-0.5 rounded">see (somebody) off</code></p>
            <p class="text-muted-foreground mt-1">These are key verbs for travel and goodbyes.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"We <span class="font-bold text-primary">set off</span> for Paris at dawn." (Begin journey)</li>
              <li>"Her family came to <span class="font-bold text-primary">see</span> her <span class="font-bold text-primary">off</span> at the station." (Say goodbye)</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">2. To Be Cancelled: <code class="bg-muted px-1 py-0.5 rounded">be off</code>, <code class="bg-muted px-1 py-0.5 rounded">call off</code></p>
            <p class="text-muted-foreground mt-1">Used to indicate that a planned event will not happen.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"The picnic is <span class="font-bold text-primary">off</span> because of the rain."</li>
              <li>"They had to <span class="font-bold text-primary">call off</span> the search." (Active cancellation)</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">3. To Diminish or Disappear (effect): <code class="bg-muted px-1 py-0.5 rounded">wear off</code></p>
            <p class="text-muted-foreground mt-1">Describes a feeling or effect that gradually fades.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"The anaesthetic is starting to <span class="font-bold text-primary">wear off</span>."</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">4. To Explode or Ring: <code class="bg-muted px-1 py-0.5 rounded">go off</code></p>
            <p class="text-muted-foreground mt-1">A specific idiom for bombs, alarms, or fireworks.</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>"My alarm clock didn't <span class="font-bold text-primary">go off</span> this morning."</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE SLOT: Interactive Questions                                    -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the following tasks to test your understanding.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-8">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <p class="font-medium text-sm">
                <span class="font-bold mr-2">{{ index + 1 }}.</span>
                {{ question.prompt }}
              </p>
              
              <!-- Multiple Choice -->
              <div v-if="question.type === 'multiple-choice'">
                <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                    <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <!-- Fill in the blank / Sentence Transformation -->
              <div v-if="question.type === 'fill-in-the-blank' || question.type === 'sentence-transformation'">
                <p v-if="question.context" class="text-muted-foreground text-sm italic mb-2">{{ question.context }}</p>
                <Input
                  v-model="question.userAnswer"
                  placeholder="Your answer..."
                  :disabled="isSubmitted"
                  @keyup.enter="handleSubmit"
                />
              </div>
            </div>
            
            <Button v-if="!isSubmitted" @click="handleSubmit" class="w-full">Check Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULT SLOT: Score and Explanations                                     -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>You scored {{ score }} out of {{ totalQuestions }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <span class="font-bold text-2xl">{{ Math.round(scorePercentage) }}%</span>
              <Progress :model-value="scorePercentage" class="w-full" />
            </div>

            <Alert :variant="scoreFeedback.variant">
              <AlertCircle v-if="scoreFeedback.variant === 'destructive'" class="h-4 w-4" />
              <CheckCircle2 v-else class="h-4 w-4" />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>
                {{ scoreFeedback.message }}
              </AlertDescription>
            </Alert>

            <div class="space-y-6 pt-4 border-t">
              <h3 class="text-lg font-semibold tracking-tight">Detailed Breakdown</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                <div class="flex items-start gap-3">
                    <span
                        class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        :class="[question.isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900']"
                    >
                        <CheckCircle2 v-if="question.isCorrect" class="h-4 w-4 text-green-600 dark:text-green-400" />
                        <XCircle v-else class="h-4 w-4 text-red-600 dark:text-red-400" />
                    </span>
                    <div class="flex-1">
                        <p class="font-medium text-sm">{{ index + 1 }}. {{ question.prompt }}</p>
                        <p v-if="question.context" class="text-muted-foreground text-sm italic">{{ question.context }}</p>
                        <p 
                            class="mt-2 text-sm" 
                            :class="[question.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400']"
                        >
                            Your answer: <span class="font-semibold">{{ question.userAnswer || 'No answer' }}</span>
                        </p>
                        <p v-if="!question.isCorrect" class="mt-1 text-sm text-primary">
                            Correct answer: <span class="font-semibold">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer }}</span>
                        </p>
                        <Alert class="mt-3">
                            <AlertCircle class="h-4 w-4" />
                            <AlertTitle class="font-semibold">Explanation</AlertTitle>
                            <AlertDescription class="text-sm">
                                {{ question.explanation }}
                            </AlertDescription>
                        </Alert>
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
