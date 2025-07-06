<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally registered or imported from your library
// Example imports for clarity:
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Progress } from '@/components/ui/progress'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Unit Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Unit 37 would be the previous unit
  router.push("/units/grammar/37")
}
function goToNextUnit() {
  // Unit 39 would be the next unit
  router.push("/units/grammar/39")
}

// --- Question & Answer State Management ---
type ValidationStatus = 'unanswered' | 'correct' | 'incorrect'

interface Question {
  id: number
  type: 'fill' | 'rewrite'
  prompt: string
  sentence: string
  correctAnswers: string[]
  userAnswer: string
  explanation: string
  status: ValidationStatus
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'fill',
    prompt: 'Complete the sentence using the comparative form of the adjective in brackets.',
    sentence: "Travelling by train is expensive, but flying is much ____. (expensive)",
    correctAnswers: ['more expensive'],
    userAnswer: '',
    explanation: "For adjectives with two or more syllables (like 'ex-pen-sive'), we form the comparative by adding 'more' before the adjective. 'expensiver' is incorrect.",
    status: 'unanswered',
  },
  {
    id: 2,
    type: 'fill',
    prompt: 'Complete the sentence with the correct comparative form.',
    sentence: "I was feeling tired last night, but I feel a bit ____ today. (good)",
    correctAnswers: ['better'],
    userAnswer: '',
    explanation: "'Good' is an irregular adjective. Its comparative form is 'better'. The superlative form is 'best'. 'Gooder' is a common mistake but is always incorrect.",
    status: 'unanswered',
  },
  {
    id: 3,
    type: 'rewrite',
    prompt: "Rewrite the second sentence using the word in brackets so it means the same.",
    sentence: "The first exam was difficult. The second exam was very difficult. (MUCH)",
    correctAnswers: ['the second exam was much more difficult.', 'the second exam was much harder.'],
    userAnswer: '',
    explanation: "'Much' is used to modify and emphasize a comparative adjective. 'Difficult' is a long adjective, so its comparative is 'more difficult'. 'Much' is placed before 'more'. 'Hard' is a valid synonym, and its comparative is 'harder'.",
    status: 'unanswered',
  },
  {
    id: 4,
    type: 'fill',
    prompt: 'Complete the comparison.',
    sentence: "Your computer is very slow. My old one was far ____. (slow)",
    correctAnswers: ['slower'],
    userAnswer: '',
    explanation: "For short, one-syllable adjectives like 'slow', we form the comparative by adding '-er'. Modifiers like 'far', 'a lot', or 'much' can be used for emphasis but do not change the base comparative form.",
    status: 'unanswered',
  },
  {
    id: 5,
    type: 'fill',
    prompt: 'Find the mistake and correct the adjective.',
    sentence: "The weather wasn't very good yesterday, but it's ____ today. (bad)",
    correctAnswers: ['worse'],
    userAnswer: '',
    explanation: "'Bad' is another common irregular adjective. Its comparative form is 'worse'. 'Worser' or 'badder' are incorrect.",
    status: 'unanswered',
  },
  {
    id: 6,
    type: 'fill',
    prompt: 'Complete the sentence using the comparative.',
    sentence: "It's too noisy here. Can we go somewhere a little ____? (quiet)",
    correctAnswers: ['quieter', 'more quiet'],
    userAnswer: '',
    explanation: "For two-syllable adjectives like 'quiet', both '-er' and 'more' are often acceptable. 'Quieter' is more common in everyday speech, but 'more quiet' is also grammatically correct.",
    status: 'unanswered',
  },
  {
    id: 7,
    type: 'rewrite',
    prompt: 'Rewrite the sentence starting with the words given.',
    sentence: "New York is not as old as Rome. (Rome is...)",
    correctAnswers: ['rome is older than new york.'],
    userAnswer: '',
    explanation: "This tests the transformation from 'not as...as' to a direct comparative. If New York is 'not as old as' Rome, it means Rome is the older one. The structure is 'Subject + be + comparative adjective + than + object'.",
    status: 'unanswered',
  },
  {
    id: 8,
    type: 'fill',
    prompt: 'Complete the sentence with a comparative form.',
    sentence: "Health and happiness are ____ than money. (important)",
    correctAnswers: ['more important'],
    userAnswer: '',
    explanation: "'Important' is a three-syllable adjective, so we must use 'more' to form the comparative. The sentence structure requires 'than' to connect the two items being compared (health/happiness and money).",
    status: 'unanswered',
  },
]);

// --- Component State ---
const showResult = ref(false)
const isSubmitted = ref(false)

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.filter(q => q.status === 'correct').length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

// --- Core Logic Functions ---
function checkAnswers() {
  isSubmitted.value = true
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/\.$/, '')
    const isCorrect = q.correctAnswers.some(correct => userAnswerCleaned === correct.trim().toLowerCase().replace(/\.$/, ''))
    q.status = isCorrect ? 'correct' : 'incorrect'
  })
  showResult.value = true
  // Scroll to the results section for better UX
  // This requires the element to have an id="results-section"
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  showResult.value = false
  isSubmitted.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.status = 'unanswered'
  })
  // Scroll to the top of the practice for better UX
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// --- Dynamic Styling ---
const getInputBorderClass = (status: ValidationStatus) => {
  if (!isSubmitted.value) return 'border-input'
  switch (status) {
    case 'correct': return 'border-green-500 focus-visible:ring-green-500'
    case 'incorrect': return 'border-red-500 focus-visible:ring-red-500'
    default: return 'border-input'
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate level exercises based on Raymond Murphy's B1-B2 curriculum."
    unit-title="Unit 38: Comparatives 1 (cheaper, more expensive etc.)"
    unit-description="This unit covers the formation and use of comparative adjectives to compare two people, places, things, or ideas."
    :categories="['Adjectives', 'Comparatives', 'B1 Level']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. Formation of Comparatives</CardTitle>
          <CardDescription>We use comparatives to say that one thing has more of a quality than another.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <p class="font-semibold">1. Short Adjectives (1 syllable): Add <code class="bg-muted px-1 py-0.5 rounded">-er</code></p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>cheap → cheap<span class="font-bold text-primary">er</span></li>
              <li>fast → fast<span class="font-bold text-primary">er</span></li>
              <li>large → larg<span class="font-bold text-primary">er</span> (adjective ends in -e, just add -r)</li>
              <li>hot → ho<span class="font-bold text-primary">tter</span> (C-V-C rule: double the final consonant)</li>
              <li>easy → eas<span class="font-bold text-primary">ier</span> (ends in -y, change to -i and add -er)</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">2. Long Adjectives (2+ syllables): Use <code class="bg-muted px-1 py-0.5 rounded">more</code></p>
            <p class="text-muted-foreground">We use <code class="bg-muted px-1 py-0.5 rounded">more</code> before the adjective. Do not add <code class="bg-muted px-1 py-0.5 rounded">-er</code>.</p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li><span class="font-bold text-primary">more</span> expensive (<s>NOT</s> expensiver)</li>
              <li><span class="font-bold text-primary">more</span> comfortable (<s>NOT</s> comfortabler)</li>
              <li><span class="font-bold text-primary">more</span> interesting</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>B. Using `than` and Irregular Forms</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
           <div>
            <p class="font-semibold">1. Comparing with <code class="bg-muted px-1 py-0.5 rounded">than</code></p>
            <p class="text-muted-foreground">To compare two items directly, use the structure: <span class="font-mono text-primary/80">comparative + than</span>.</p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>Rome is old<span class="font-bold text-primary">er than</span> New York.</li>
              <li>Hotels are <span class="font-bold text-primary">more expensive than</span> hostels.</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold">2. Irregular Comparatives</p>
            <p class="text-muted-foreground">Some common adjectives have special comparative forms you must memorize.</p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>good → <span class="font-bold text-primary">better</span></li>
              <li>bad → <span class="font-bold text-primary">worse</span></li>
              <li>far → <span class="font-bold text-primary">farther</span> (for physical distance) or <span class="font-bold text-primary">further</span> (for metaphorical distance)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>C. Modifying Comparatives</CardTitle>
          <CardDescription>You can specify the degree of difference using modifiers.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
            <p class="font-semibold">Use <code class="bg-muted px-1 py-0.5 rounded">much</code> / <code class="bg-muted px-1 py-0.5 rounded">a lot</code> / <code class="bg-muted px-1 py-0.5 rounded">far</code> for a big difference.</p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>Flying is <span class="font-bold text-primary">much more expensive</span> than driving.</li>
              <li>She feels <span class="font-bold text-primary">a lot better</span> today.</li>
            </ul>
            <p class="font-semibold pt-2">Use <code class="bg-muted px-1 py-0.5 rounded">a bit</code> / <code class="bg-muted px-1 py-0.5 rounded">a little</code> for a small difference.</p>
            <ul class="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
              <li>My bag is <span class="font-bold text-primary">a bit heavier</span> than yours.</li>
            </ul>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
       <div id="practice-section" class="grid auto-rows-max items-start gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Complete the sentences. Your answers will be validated after submission.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-8">
              <div v-for="(q, index) in questions" :key="q.id" class="grid gap-2 relative">
                <label :for="`q-${q.id}`" class="text-sm font-medium">
                  {{ index + 1 }}. {{ q.prompt }}
                </label>
                <p class="text-sm text-muted-foreground italic">"{{ q.sentence }}"</p>
                <div v-if="q.type === 'rewrite'" class="text-sm text-muted-foreground flex items-center gap-2">
                  <span class="font-bold text-primary">{{ q.sentence.split('(')[1].replace(')','') }}</span>
                </div>

                <div class="relative">
                  <Input 
                    :id="`q-${q.id}`" 
                    v-model="q.userAnswer" 
                    :placeholder="q.type === 'fill' ? 'Type the comparative form...' : 'Rewrite the sentence...'"
                    :class="getInputBorderClass(q.status)"
                    class="pr-10 transition-colors"
                    :disabled="isSubmitted"
                  />
                  <span v-if="isSubmitted" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle2 v-if="q.status === 'correct'" class="h-5 w-5 text-green-500" />
                    <XCircle v-if="q.status === 'incorrect'" class="h-5 w-5 text-red-500" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter class="border-t px-6 py-4">
             <Button @click="checkAnswers" :disabled="isSubmitted">Check Answers</Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review your performance below. Understanding your mistakes is key to improvement.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4 rounded-lg border p-4">
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium tracking-tight">Overall Score</p>
                <p class="text-3xl font-bold">{{ score }} / {{ totalQuestions }}</p>
              </div>
              <div class="w-24 h-24 flex items-center justify-center relative">
                <Progress :model-value="scorePercentage" class="absolute w-full h-full" />
                <span class="font-bold text-lg">{{ Math.round(scorePercentage) }}%</span>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Detailed Review</h3>
              <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="border-l-4 p-4 rounded-r-md" :class="q.status === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'">
                <p class="text-sm font-medium mb-2">Question {{ index + 1 }}: {{ q.prompt }}</p>
                <p class="text-sm italic text-muted-foreground mb-3">"{{ q.sentence }}"</p>
                
                <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
                  <span class="font-semibold">Your Answer:</span>
                  <span :class="q.status === 'incorrect' ? 'text-red-700 line-through' : 'text-green-700'">
                    {{ q.userAnswer || 'No answer' }}
                  </span>

                  <span class="font-semibold">Correct Answer:</span>
                  <span class="font-bold text-gray-800">{{ q.correctAnswers[0] }}</span>
                  
                  <template v-if="q.status === 'incorrect'">
                    <span class="font-semibold self-start">Explanation:</span>
                    <p class="text-muted-foreground">{{ q.explanation }}</p>
                  </template>
                </div>
              </div>
            </div>
            
          </CardContent>
          <CardFooter class="border-t px-6 py-4">
            <Button @click="resetQuiz" variant="outline">Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Assuming a global CSS setup (like Tailwind) for most styles. 
   These are just fallbacks or fine-tunings. */
code {
  @apply rounded bg-gray-100 px-1 py-0.5 font-mono text-sm;
}
.dark code {
    @apply bg-gray-800;
}
</style>
