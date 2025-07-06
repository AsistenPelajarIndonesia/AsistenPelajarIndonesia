<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'nuxt/app'

// --- Component Imports ---
// We import the main layout and the necessary UI components for a rich user experience.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Info, RefreshCw } from 'lucide-vue-next'

// --- Page Metadata ---
// Useful for SEO and browser tab information.
useHead({
  title: 'Grammar Practice: Unit 5 - A/An and The',
  meta: [
    { name: 'description', content: 'An advanced grammar exercise for mastering English articles, based on the principles of "English Grammar in Use".' }
  ]
})

// --- Navigation ---
// Router instance for programmatic navigation between units.
const router = useRouter()
const currentUnit = 5

function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}

function goToNextUnit() {
  // Assuming there are more units to come.
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Data Structures ---
// Defining the structure for our questions ensures type safety and consistency.
interface Question {
  id: number
  type: 'multiple-choice'
  text: string
  options: string[]
  userAnswer: string | null
  correctAnswer: string
  explanation: string
  isCorrect: boolean | null
}

// --- Reactive State Management ---
// All state is managed here, ensuring the component is fully reactive.
const isSubmitted = ref(false)
const showResult = ref(false)

// The core data for the exercise. Each question is crafted to test a specific rule or common error.
// The explanations are the "secret sauce", acting as a mini-lesson from a grammar expert.
const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    text: "My friend is ___ university professor, but he drives ___ old car. It's ___ honor to know him, as he is ___ truly honest man.",
    options: ['a / an / an / a', 'an / a / a / an', 'a / an / a / an', 'a / an / an / an'],
    userAnswer: null,
    correctAnswer: 'a / an / an / an',
    explanation: "This tests the sound rule, not just the letter. 'University' starts with a 'y' sound (a consonant sound), so we use 'a'. 'Old' starts with a vowel sound, so we use 'an'. 'Honor' and 'honest' start with a silent 'h', making the first sound a vowel, so we use 'an'. This is a classic trap for learners.",
    isCorrect: null,
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "We booked a trip to ___ United Kingdom and will also visit ___ Netherlands. We plan to cross ___ Atlantic Ocean by ___ plane.",
    options: ['the / the / the / a', 'the / the / the / Ø', 'Ø / Ø / the / a', 'the / Ø / Ø / Ø'],
    userAnswer: null,
    correctAnswer: 'the / the / the / Ø',
    explanation: "We use 'the' with plural country names ('the Netherlands'), countries with 'Kingdom', 'Republic', or 'States' ('the United Kingdom'), and with oceans ('the Atlantic Ocean'). However, for modes of transport in general phrases like 'by plane', 'by car', or 'by train', we use no article (the zero article 'Ø').",
    isCorrect: null,
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "I read ___ interesting article in ___ Guardian newspaper about ___ love and ___ happiness. ___ article argued that ___ happiness is a choice.",
    options: ['an / the / Ø / Ø / The / Ø', 'an / a / the / the / An / the', 'a / the / the / the / The / the', 'an / Ø / a / a / The / a'],
    userAnswer: null,
    correctAnswer: 'an / the / Ø / Ø / The / Ø',
    explanation: "1. 'an interesting article' (first mention, vowel sound). 2. 'the Guardian' (specific name of a newspaper). 3. 'love' and 'happiness' are used as abstract, uncountable concepts in a general sense, so no article (Ø) is needed. 4. 'The article' (now we are referring to the specific one mentioned earlier). 5. 'happiness' is again used as a general abstract concept.",
    isCorrect: null,
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: "___ Mount Fuji is ___ highest mountain in ___ Japan, but ___ Himalayas contain ___ highest peak in ___ world.",
    options: ['The / the / Ø / the / the / the', 'Ø / the / Ø / the / the / the', 'Ø / the / the / the / the / the', 'The / the / the / Ø / a / the'],
    userAnswer: null,
    correctAnswer: 'Ø / the / Ø / the / the / the',
    explanation: "We do not use 'the' with single mountains (Mount Fuji), but we do use 'the' with mountain ranges ('the Himalayas'). Superlatives ('the highest') always require 'the'. Most country names, like 'Japan', do not take an article. We say 'the world' as it is a unique entity.",
    isCorrect: null,
},
  {
    id: 5,
    type: 'multiple-choice',
    text: "For ___ lunch today, I'm having ___ salad. I hope ___ salad is fresh. ___ health is, after all, ___ most important thing.",
    options: ['Ø / a / the / Ø / the', 'the / a / the / The / the', 'a / a / the / A / the', 'Ø / the / the / The / Ø'],
    userAnswer: null,
    correctAnswer: 'Ø / a / the / Ø / the',
    explanation: "Names of meals like 'breakfast', 'lunch', and 'dinner' used generally do not take an article ('for lunch'). When we introduce a singular countable item, we use 'a' ('a salad'). When we refer back to that specific item, we use 'the' ('the salad'). 'Health' is an uncountable, abstract noun used generally, so it takes no article. 'most important' is a superlative and requires 'the'.",
    isCorrect: null,
  },
]);

// --- Computed Properties ---
// These automatically update when their dependencies change, simplifying the template logic.

// Calculates the number of correctly answered questions.
const score = computed(() => {
  return questions.filter(q => q.isCorrect).length
})

// Calculates the percentage of answered questions to drive the progress bar.
const questionsAnsweredCount = computed(() => {
    return questions.filter(q => q.userAnswer !== null).length
})

const progress = computed(() => {
  return (questionsAnsweredCount.value / questions.length) * 100
})

// Provides a dynamic, encouraging message based on the final score.
const scoreMessage = computed(() => {
  const percentage = (score.value / questions.length) * 100
  if (percentage === 100) return "Flawless! A perfect score. You have an excellent command of articles."
  if (percentage >= 80) return "Excellent work! You have a strong understanding of these rules. Review the explanations for any you missed."
  if (percentage >= 60) return "Good job. You're on the right track, but there are some key rules to review. Pay close attention to the explanations."
  return "This is a tough topic. Don't be discouraged! Carefully study the explanations below to build your foundation."
})

// --- Methods ---
// The functions that drive the interactivity of the component.

/**
 * The core validation logic. It checks each answer, updates the state,
 * and reveals the results section.
 */
function validateAnswers() {
  if (questionsAnsweredCount.value !== questions.length) {
    // A simple alert to ensure all questions are answered.
    alert('Please answer all questions before checking your results.')
    return
  }
  
  questions.forEach(q => {
    q.isCorrect = q.userAnswer === q.correctAnswer
  })
  isSubmitted.value = true
  showResult.value = true

  // Scroll to the results for a better user experience
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Resets the entire test to its initial state, allowing the student to try again.
 */
function resetTest() {
  isSubmitted.value = false
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer = null
    q.isCorrect = null
  })
  // Scroll back to the top of the practice section
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the methodology of Raymond Murphy"
    unit-title="Unit 5: A/an and The"
    unit-description="A deep dive into the use of definite, indefinite, and zero articles in complex sentences. This unit will test your understanding of specificity, general concepts, proper nouns, and phonetic rules."
    :categories="['Articles', 'Determiners', 'Nouns', 'Advanced']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- Slot #material: The learning content, summarizing the key rules. -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Info class="h-6 w-6 text-blue-500" /> Key Concepts: Articles</CardTitle>
          <CardDescription>Review these core principles before starting the exercise.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
            <div>
              <h3 class="font-bold text-base mb-1">A / An (Indefinite Article)</h3>
              <ul class="list-disc list-inside space-y-1 pl-2">
                <li>Use for singular, countable nouns mentioned for the <em>first time</em> or in a general sense.</li>
                <li><strong>Sound is key:</strong> <code class="bg-muted px-1 rounded">'a'</code> before consonant sounds (e.g., a user, a university), <code class="bg-muted px-1 rounded">'an'</code> before vowel sounds (e.g., an hour, an MBA).</li>
                <li>Use with jobs: "She is <strong>an</strong> engineer."</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-base mb-1">The (Definite Article)</h3>
              <ul class="list-disc list-inside space-y-1 pl-2">
                <li>Use when the listener/reader knows the <em>specific</em> item being discussed (previously mentioned, unique, or contextually obvious).</li>
                <li>Use for unique entities: the sun, the internet, the world.</li>
                <li>Use with superlatives: the best, the most difficult.</li>
                <li>Use with specific geographical features: mountain ranges (the Alps), oceans (the Pacific), rivers (the Nile), and plural/state-based country names (the USA, the Philippines).</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-base mb-1">Ø (Zero Article)</h3>
              <ul class="list-disc list-inside space-y-1 pl-2">
                <li>Use for plural or uncountable nouns in a <em>general sense</em>: "I like coffee.", "Information is power."</li>
                <li>Use with most proper nouns: names of people, most countries (France, Japan), cities, streets, and single mountains (Mount Everest).</li>
                <li>Use with general abstract concepts: "Love is complicated.", "Education is key."</li>
                <li>Use with general names for meals ('at breakfast') and transport ('by car').</li>
              </ul>
            </div>
        </CardContent>
      </Card>
    </template>

    <!-- Slot #practice: The interactive questions form. -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercise</CardTitle>
          <CardDescription>Select the best option to complete each sentence. All questions must be answered.</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-8" @submit.prevent="validateAnswers">
            <div v-for="(question, index) in questions" :key="question.id">
              <p class="mb-3 font-medium">
                {{ index + 1 }}. {{ question.text }}
              </p>
              <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted" class="space-y-2">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                  <Label :for="`q${question.id}-${option}`" class="font-normal cursor-pointer">
                    <code class="text-sm">{{ option.replace(/Ø/g, '[no article]') }}</code>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div class="mt-6 flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <Label for="progress" class="text-sm text-muted-foreground whitespace-nowrap">Your Progress</Label>
                <Progress id="progress" :model-value="progress" class="w-full" />
                <span class="text-sm font-semibold">{{ Math.round(progress) }}%</span>
              </div>
              <Button type="submit" :disabled="isSubmitted" class="w-full">
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- Slot #result: The detailed feedback and scoring section. -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your score and the detailed explanations for each question below.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="p-6 bg-muted rounded-lg text-center space-y-2">
            <p class="text-sm font-medium text-muted-foreground">YOUR SCORE</p>
            <p class="text-5xl font-bold tracking-tighter">{{ score }} / {{ questions.length }}</p>
            <p class="text-muted-foreground">{{ scoreMessage }}</p>
          </div>
          
          <div class="space-y-4">
            <Alert
              v-for="question in questions"
              :key="`result-${question.id}`"
              :variant="question.isCorrect ? 'default' : 'destructive'"
              class="transition-all duration-300"
            >
              <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
              <AlertTitle class="font-bold">Question {{ question.id }} - {{ question.isCorrect ? 'Correct' : 'Incorrect' }}</AlertTitle>
              <AlertDescription class="space-y-2 pt-2">
                <p><strong>Sentence:</strong> {{ question.text }}</p>
                <p><strong>Your Answer:</strong> <code class="text-sm">{{ question.userAnswer?.replace(/Ø/g, '[no article]') || 'Not answered' }}</code></p>
                <p v-if="!question.isCorrect"><strong>Correct Answer:</strong> <code class="text-sm">{{ question.correctAnswer.replace(/Ø/g, '[no article]') }}</code></p>
                <div class="mt-2 p-3 bg-background/50 border-l-4 rounded-r-md" :class="question.isCorrect ? 'border-green-500' : 'border-red-500'">
                  <p class="font-semibold">Explanation:</p>
                  <p class="text-sm">{{ question.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          <Button @click="resetTest" variant="outline" class="w-full">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
