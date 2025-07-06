<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are available from your project setup (e.g., shadcn-vue)
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, Info, RefreshCw } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

const unitDetails = {
  testTitle: 'Intermediate English Grammar Practice',
  testDescription: 'Based on "English Grammar in Use" by Raymond Murphy.',
  unitTitle: 'Unit 3: Verb + -ing or to ... (like, would like, etc.)',
  unitDescription: 'Master the subtle differences between general preferences (like doing) and specific desires (would like to do). This unit focuses on common points of confusion to sharpen your accuracy.',
  categories: ['Verbs', 'Gerunds', 'Infinitives', 'Preferences', 'Desires'],
}

const quizSubmitted = ref(false)
const showResult = ref(false)

// --- Reactive State for Quiz Questions ---
// Each question is an object with its type, text, answer state, and a detailed explanation.
const questions = ref([
  {
    id: 1,
    type: 'fill-in-the-blank',
    text: "I'm not in the mood for a heavy meal. I think I'd prefer _______ (have) a salad for dinner.",
    userAnswer: '',
    correctAnswer: 'to have',
    explanation: "The structure 'would prefer' is used to state a specific preference at a particular moment. It is always followed by the to-infinitive. 'I'd prefer to have' means this is my choice right now.",
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "My grandfather is retired, but he stays active. He really loves _______ in his garden every morning.",
    options: ['to work', 'working', 'work'],
    userAnswer: '',
    correctAnswer: 'working',
    explanation: "The verb 'love', like 'like' and 'hate', expresses a general feeling or enjoyment. It is typically followed by the -ing form (gerund) when talking about a hobby or a general activity one enjoys. 'Working' describes the general activity he loves.",
  },
  {
    id: 3,
    type: 'fill-in-the-blank',
    text: "I used to hate _______ (go) to the dentist, but now I understand it's important for my health.",
    userAnswer: '',
    correctAnswer: 'going',
    explanation: "The verb 'hate' describes a general, ongoing feeling. Like 'like' and 'love', it's usually followed by the -ing form to describe an activity you dislike in general. 'Hating going' refers to the general experience.",
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: "A: The new Spielberg film is on tonight. B: Oh, great! I _______ to see that. I've heard it's fantastic.",
    options: ['like', 'would love', 'love'],
    userAnswer: '',
    correctAnswer: 'would love',
    explanation: "Speaker B is expressing a strong, specific desire to see the film *tonight*. 'Would love' (or 'would like') followed by a to-infinitive is the correct structure for this specific, immediate wish. 'I love to see...' would mean they enjoy the act of seeing films in general.",
  },
  {
    id: 5,
    type: 'sentence-correction',
    text: 'Do you feel like to go out for a walk this afternoon?',
    userAnswer: '',
    correctAnswer: 'Do you feel like going out for a walk this afternoon?',
    explanation: "The expression 'feel like' is a phrasal verb that means 'to have a desire for something at a particular moment'. It is always followed by the -ing form (gerund). The correct structure is 'feel like + -ing'.",
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    text: "She's very disciplined. She likes _______ (get) up early, even on weekends, because it makes her feel productive.",
    userAnswer: '',
    correctAnswer: 'to get',
    explanation: "While 'like + -ing' is common for general enjoyment, 'like + to-infinitive' is often used to express that someone thinks something is a good idea or a good habit. Here, getting up early is presented as a disciplined choice, making 'to get' the more suitable answer. 'getting' would also be grammatically acceptable but slightly less nuanced.",
  },
  {
    id: 7,
    type: 'multiple-choice',
    text: "I wouldn't like _______ in his position. He has far too much responsibility.",
    options: ['being', 'to be', 'be'],
    userAnswer: '',
    correctAnswer: 'to be',
    explanation: "The structure 'would not like' (or 'wouldn't like') expresses a specific dislike for a hypothetical or real situation. It functions the same as 'would like' and must be followed by the to-infinitive. The correct form is 'wouldn't like to be'.",
  },
])

const isCorrect = (question: any) => {
    if (!question.userAnswer) return false
    const userAnswerCleaned = question.userAnswer.trim().toLowerCase()
    const correctAnswerCleaned = question.correctAnswer.trim().toLowerCase()
    return userAnswerCleaned === correctAnswerCleaned
}

// --- Computed Properties for Results ---
const totalQuestions = computed(() => questions.value.length)
const score = computed(() => questions.value.filter(isCorrect).length)
const scorePercentage = computed(() => (totalQuestions.value > 0 ? Math.round((score.value / totalQuestions.value) * 100) : 0))

const feedbackMessage = computed(() => {
  if (scorePercentage.value === 100) return { title: 'Exceptional!', description: "Perfect score! You have an excellent command of these verb patterns." }
  if (scorePercentage.value >= 75) return { title: 'Great Work!', description: "You have a solid understanding. Review the explanations for any missed questions to perfect your knowledge." }
  if (scorePercentage.value >= 50) return { title: 'Good Effort!', description: "You're on the right track. Pay close attention to the explanations to clarify the rules." }
  return { title: 'Needs Review', description: "This is a tricky topic. Go through the learning material and the explanations carefully. Practice makes perfect!" }
})

// --- Control Methods ---
function checkAnswers() {
  quizSubmitted.value = true
  showResult.value = true
  // Scroll to results for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  questions.value.forEach(q => {
    q.userAnswer = ''
  })
  quizSubmitted.value = false
  showResult.value = false
}

function goToPreviousUnit() {
  router.push("/units/grammar/2") // Assuming a unit 2 exists
}

function goToNextUnit() {
  router.push("/units/grammar/4") // Assuming a unit 4 exists
}

</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- NAMED SLOT: 'material'                                                  -->
    <!-- Core learning content for the student.                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Core Concepts: Preferences and Desires</CardTitle>
          <CardDescription>Understanding the difference is key to sounding natural.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-bold text-base mb-2">1. General Preference: `like / love / hate / prefer + -ing`</h4>
            <p class="text-muted-foreground">Use this structure to talk about activities you enjoy or dislike in general, as a hobby or routine.</p>
            <ul class="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>I <span class="font-semibold text-blue-600">like walking</span> in the rain. (I enjoy it in general)</li>
              <li>She <span class="font-semibold text-blue-600">hates waiting</span> in queues. (A general dislike)</li>
              <li>They <span class="font-semibold text-blue-600">love visiting</span> new countries. (A general passion)</li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-base mb-2">2. Specific Desire: `would like / would love / would hate / would prefer + to ...`</h4>
            <p class="text-muted-foreground">Use this structure for a preference or desire <span class="font-bold">right now</span>, in the near future, or in a specific hypothetical situation. It's a polite way of saying "I want".</p>
            <ul class="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>(At a café) I<span class="font-semibold text-red-600">'d like to have</span> a coffee, please.</li>
              <li>I'm tired. I<span class="font-semibold text-red-600">'d love to go</span> home now.</li>
              <li>I <span class="font-semibold text-red-600">would hate to be</span> the one to tell him the bad news. (Hypothetical)</li>
            </ul>
          </div>

          <Alert variant="destructive">
            <Info class="h-4 w-4" />
            <AlertTitle class="font-bold">Crucial Distinction</AlertTitle>
            <AlertDescription>
              <span class="block">Compare:</span>
              <span class="block mt-1">"I <span class="font-semibold text-blue-600">like playing</span> tennis." (General enjoyment)</span>
              <span class="block">"I<span class="font-semibold text-red-600">'d like to play</span> tennis on Saturday." (Specific desire for this Saturday)</span>
              <span class="block mt-2 font-bold text-red-700">Never use `-ing` after `would like / would love`.</span>
            </AlertDescription>
          </Alert>

          <div>
            <h4 class="font-bold text-base mb-2">3. Nuance with `like + to ...`</h4>
            <p class="text-muted-foreground">Sometimes, `like + to-infinitive` is used to mean you think something is a good idea or a habit, not just for pure enjoyment.</p>
            <ul class="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>I <span class="font-semibold text-green-700">like to check</span> my emails when I first wake up. (It's my habit/system)</li>
              <li>He <span class="font-semibold text-green-700">likes to be</span> punctual for meetings. (He thinks it's the right thing to do)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- NAMED SLOT: 'practice'                                                  -->
    <!-- Interactive questions for the student.                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences with the correct verb form.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              <span class="font-bold text-primary mr-2">{{ index + 1 }}.</span>
              <span v-html="question.text.replace('_______', '______')"></span>
            </p>
            
            <!-- Fill-in-the-blank Input -->
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                v-model="question.userAnswer"
                placeholder="Type the verb form..."
                :disabled="quizSubmitted"
                class="transition-colors"
                :class="{
                  'border-green-500 focus-visible:ring-green-400': quizSubmitted && isCorrect(question),
                  'border-red-500 focus-visible:ring-red-400': quizSubmitted && !isCorrect(question)
                }"
              />
            </div>
            
            <!-- Multiple Choice Input -->
            <div v-if="question.type === 'multiple-choice'">
              <RadioGroup v-model="question.userAnswer" :disabled="quizSubmitted" class="gap-3">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="cursor-pointer" :class="{
                    'text-green-600 font-bold': quizSubmitted && option === question.correctAnswer,
                    'text-red-600': quizSubmitted && question.userAnswer === option && !isCorrect(question)
                  }">
                    {{ option }}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Sentence Correction Input -->
            <div v-if="question.type === 'sentence-correction'">
              <Input
                v-model="question.userAnswer"
                placeholder="Rewrite the sentence correctly..."
                :disabled="quizSubmitted"
                class="transition-colors"
                :class="{
                  'border-green-500 focus-visible:ring-green-400': quizSubmitted && isCorrect(question),
                  'border-red-500 focus-visible:ring-red-400': quizSubmitted && !isCorrect(question)
                }"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!quizSubmitted" class="w-full" size="lg" @click="checkAnswers">
            Check Answers
          </Button>
          <Button v-else class="w-full" size="lg" variant="secondary" @click="resetQuiz">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- NAMED SLOT: 'result'                                                    -->
    <!-- Detailed feedback and score analysis.                                   -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>{{ feedbackMessage.title }} {{ feedbackMessage.description }}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0">
                <p class="text-4xl font-bold text-primary">{{ score }} / {{ totalQuestions }}</p>
                <p class="text-sm text-center text-muted-foreground">Correct</p>
              </div>
              <div class="w-full">
                 <Progress :model-value="scorePercentage" class="h-4" />
                 <p class="text-right font-semibold mt-1 text-primary">{{ scorePercentage }}%</p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4 border-b pb-2">Detailed Review</h3>
              <div class="space-y-6">
                <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                  <Alert :variant="isCorrect(question) ? 'default' : 'destructive'" class="bg-opacity-50">
                     <component :is="isCorrect(question) ? CheckCircle : XCircle" class="h-5 w-5" />
                    <AlertTitle class="text-base font-bold">Question {{ index + 1 }}</AlertTitle>
                    <AlertDescription class="space-y-3 mt-2">
                       <p class="font-medium text-lg leading-tight">{{ question.text }}</p>
                       <div class="text-sm rounded-md p-3" :class="isCorrect(question) ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'">
                         <p>Your answer: <span class="font-bold" :class="isCorrect(question) ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">{{ question.userAnswer || 'No answer' }}</span></p>
                         <p v-if="!isCorrect(question)">Correct answer: <span class="font-bold text-green-700 dark:text-green-300">{{ question.correctAnswer }}</span></p>
                       </div>
                       <div class="text-sm p-3 rounded-md bg-sky-100 dark:bg-sky-900/50 border-l-4 border-sky-400">
                         <p class="font-semibold text-sky-800 dark:text-sky-200">Explanation:</p>
                         <p class="text-sky-700 dark:text-sky-300">{{ question.explanation }}</p>
                       </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full" @click="resetQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Reset and Practice Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
