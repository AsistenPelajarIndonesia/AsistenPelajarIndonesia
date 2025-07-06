
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Components ---
// Assuming these are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, BrainCircuit, BookOpen, Repeat } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const unitNumber = 33
const testTitle = 'English Grammar In Use Practice'
const testDescription = 'Intermediate exercises based on the Raymond Murphy series.'
const unitTitle = `Unit ${unitNumber}: Adjectives and adverbs 1 (quick/quickly)`
const unitDescription = "Mastering the fundamental difference between describing nouns (adjectives) and modifying verbs, adjectives, or other adverbs (adverbs)."
const categories = ['Adjectives', 'Adverbs', 'Word Forms', 'Common Mistakes']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push(`/units/grammar/${unitNumber - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${unitNumber + 1}`)
}

// --- Question & Answer Data Structure ---
// This structure is designed to be extensible and provide rich feedback.
// The questions are crafted to be challenging, targeting common points of confusion.
interface Question {
  id: number
  sentence: string
  options: [string, string]
  correctAnswer: string
  explanation: string
  type: 'core' | 'sensation' | 'good-well' | 'irregular'
}

const questions = ref<Question[]>([
  {
    id: 1,
    sentence: "The new chef's soup tastes absolutely ____.",
    options: ['wonderful', 'wonderfully'],
    correctAnswer: 'wonderful',
    explanation: "Verbs of sensation (taste, feel, smell, sound, look) are typically followed by an adjective that describes the subject (the soup), not an adverb. The soup itself is wonderful.",
    type: 'sensation'
  },
  {
    id: 2,
    sentence: "She adapted to the new system ____, which impressed her manager.",
    options: ['quick', 'quickly'],
    correctAnswer: 'quickly',
    explanation: "An adverb is needed here to describe *how* she adapted. The verb 'adapted' is being modified. 'Quick' is an adjective and would describe 'she', not her action.",
    type: 'core'
  },
  {
    id: 3,
    sentence: "He is a very ____ tennis player and he plays tennis exceptionally ____.",
    options: ['good/well', 'well/good'],
    correctAnswer: 'good/well',
    explanation: "'Good' is an adjective describing the noun 'player'. 'Well' is the corresponding adverb, describing *how* he plays the verb 'plays'. This is a classic distinction.",
    type: 'good-well'
  },
  {
    id: 4,
    sentence: "You look ____. Did you sleep ____ last night?",
    options: ['terrible/badly', 'terribly/bad'],
    correctAnswer: 'terrible/badly',
    explanation: "After the sensation verb 'look', we use the adjective 'terrible' to describe the subject 'you'. The adverb 'badly' is used to modify the action verb 'sleep'.",
    type: 'sensation'
  },
  {
    id: 5,
    sentence: "It's a ____ train, and it always arrives ____.",
    options: ['fast/late', 'fast/lately'],
    correctAnswer: 'fast/late',
    explanation: "'Fast' and 'late' are irregular words that serve as both adjectives and adverbs. 'Fast' describes the noun 'train', and 'late' describes the verb 'arrives'. 'Lately' is an adverb but means 'recently'.",
    type: 'irregular'
  },
  {
    id: 6,
    sentence: "I've been working very ____, so I ____ have any free time.",
    options: ['hard/hard', 'hard/hardly'],
    correctAnswer: 'hard/hardly',
    explanation: "'Hard' as an adverb means 'with a lot of effort'. 'Hardly' is also an adverb but has a completely different, negative meaning: 'almost not at all'. This is a common point of confusion.",
    type: 'irregular'
  },
  {
    id: 7,
    sentence: "The room became ____ as the professor began to speak.",
    options: ['quiet', 'quietly'],
    correctAnswer: 'quiet',
    explanation: "The verb 'became' acts as a linking verb here, similar to 'is' or 'seems'. It connects the subject ('the room') to an adjective ('quiet') that describes its state.",
    type: 'sensation'
  },
  {
    id: 8,
    sentence: "He considered the proposal ____ before making a decision.",
    options: ['careful', 'carefully'],
    correctAnswer: 'carefully',
    explanation: "The adverb 'carefully' is required to modify the verb 'considered', explaining *how* he performed the action of considering.",
    type: 'core'
  },
  {
    id: 9,
    sentence: "How are you? I'm doing ____, thank you.",
    options: ['good', 'well'],
    correctAnswer: 'well',
    explanation: "When referring to health, 'well' is used as an adjective. While 'I'm good' is common in informal speech, 'I'm well' is the grammatically precise answer for health.",
    type: 'good-well'
  },
  {
    id: 10,
    sentence: "The decision, made ____, had ____ consequences for the entire team.",
    options: ['hastily/serious', 'hasty/seriously'],
    correctAnswer: 'hastily/serious',
    explanation: "Two parts: 'hastily' is an adverb modifying the past participle 'made' (describing how the decision was made). 'Serious' is an adjective describing the noun 'consequences'.",
    type: 'core'
  }
])

// --- Reactive State Management ---
const userAnswers = ref<Record<number, string>>({})
const showResult = ref(false)

// --- Computed Properties for Validation & Scoring ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const progressValue = computed(() => (score.value / questions.value.length) * 100)

const detailedResults = computed(() => {
  if (!showResult.value) return []
  return questions.value.map(question => {
    const userAnswer = userAnswers.value[question.id]
    const isCorrect = userAnswer === question.correctAnswer
    
    // Deconstruct the sentence for rich display
    const sentenceParts = question.sentence.split('____')

    return {
      ...question,
      userAnswer,
      isCorrect,
      sentenceStart: sentenceParts[0],
      sentenceEnd: sentenceParts[1] || ''
    }
  })
})

const isTestComplete = computed(() => {
    return Object.keys(userAnswers.value).length === questions.value.length
})

// --- Control Functions ---
function checkAnswers() {
  showResult.value = true
  // Scroll to results for better UX on mobile
  // Wait for DOM update before scrolling
  setTimeout(() => {
    const resultElement = document.getElementById('results-section');
    if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function retryTest() {
  userAnswers.value = {}
  showResult.value = false
  // Scroll to the top of the practice section
  setTimeout(() => {
    const practiceElement = document.getElementById('practice-section');
    if (practiceElement) {
        practiceElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <!-- #material: The Learning Content                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-3">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Core Principle: The Role of Words</CardTitle>
            <CardDescription>Understanding what a word *does* in a sentence.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            An <strong class="text-blue-600">adjective</strong> describes a noun or pronoun. It answers questions like 'What kind?' or 'Which one?'.
            <br>
            Example: She is a <code class="bg-muted px-1 py-0.5 rounded">careful</code> driver. ('careful' describes the noun 'driver')
          </p>
          <p>
            An <strong class="text-purple-600">adverb</strong> modifies a verb, an adjective, or another adverb. It answers questions like 'How?', 'When?', or 'To what extent?'.
            <br>
            Example: She drives <code class="bg-muted px-1 py-0.5 rounded">carefully</code>. ('carefully' describes the verb 'drives')
          </p>
        </CardContent>
      </Card>

      <Card class="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
          <CardTitle class="text-amber-800 dark:text-amber-300">⚠️ Special Case: Verbs of Sensation</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <p>Verbs like <code class="font-semibold">look, feel, smell, sound, taste, seem, appear, become</code> often act as "linking verbs". They link the subject to an adjective that describes the subject's state, not an adverb describing an action.</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="text-green-600">Correct:</span> The music sounds <strong class="text-blue-600">beautiful</strong>. (The music itself is beautiful)</li>
            <li><span class="text-red-600">Incorrect:</span> The music sounds <s class="text-red-500">beautifully</s>.</li>
            <li><span class="text-green-600">Correct:</span> I feel <strong class="text-blue-600">good</strong> about our chances. (My state is good)</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card class="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardHeader>
          <CardTitle class="text-green-800 dark:text-green-300">Key Distinction: Good vs. Well</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <p><strong class="text-blue-600">Good</strong> is an adjective: He has <code class="bg-muted px-1 py-0.5 rounded">good</code> English.</p>
          <p><strong class="text-purple-600">Well</strong> is the corresponding adverb: He speaks English <code class="bg-muted px-1 py-0.5 rounded">well</code>.</p>
          <p><strong>Exception:</strong> <strong class="text-blue-600">Well</strong> can also be an adjective meaning 'in good health'. <br>Example: How are you? I'm <code class="bg-muted px-1 py-0.5 rounded">well</code>, thanks.</p>
        </CardContent>
      </Card>
      
      <Card class="bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
        <CardHeader>
          <CardTitle class="text-red-800 dark:text-red-300">Irregular Forms & Common Traps</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <p><strong class="font-semibold">Fast, hard, late, early</strong> are both adjectives and adverbs. They do not add '-ly'.</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>It was a <strong class="text-blue-600">hard</strong> test. (adj.) / I studied <strong class="text-purple-600">hard</strong>. (adv.)</li>
            <li>He caught the <strong class="text-blue-600">late</strong> train. (adj.) / He arrived <strong class="text-purple-600">late</strong>. (adv.)</li>
          </ul>
          <p class="pt-2 border-t"><strong>Warning:</strong> <strong class="text-purple-600">Hardly</strong> and <strong class="text-purple-600">Lately</strong> exist, but have different meanings:</p>
          <ul class="list-disc pl-5 space-y-1">
             <li><strong class="font-semibold">Hardly</strong> = almost not at all. (e.g., I <code class="bg-muted px-1 py-0.5 rounded">hardly</code> know him.)</li>
             <li><strong class="font-semibold">Lately</strong> = recently. (e.g., Have you seen him <code class="bg-muted px-1 py-0.5 rounded">lately</code>?)</li>
          </ul>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Questions                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-m-20">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercise</CardTitle>
            <CardDescription>Choose the correct word to complete each sentence. Your answers will be validated.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <p class="font-medium leading-none">
                {{ index + 1 }}. {{ question.sentence.replace('____', '___') }}
              </p>
              <RadioGroup v-model="userAnswers[question.id]" class="flex items-center gap-4">
                  <div class="flex items-center space-x-2">
                      <RadioGroupItem :id="`q${question.id}-opt1`" :value="question.options[0].split('/')[0]" />
                      <Label :for="`q${question.id}-opt1`">{{ question.options[0] }}</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                      <RadioGroupItem :id="`q${question.id}-opt2`" :value="question.options[1].split('/')[0]" />
                      <Label :for="`q${question.id}-opt2`">{{ question.options[1] }}</Label>
                  </div>
              </RadioGroup>
            </div>
            <Button @click="checkAnswers" class="w-full" :disabled="!isTestComplete">
              <BrainCircuit class="mr-2 h-4 w-4" />
              Check My Answers
            </Button>
            <p v-if="!isTestComplete" class="text-center text-sm text-muted-foreground">Please answer all questions to check your results.</p>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The "Awesome Validator"                                      -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section" class="scroll-m-20">
        <Card class="border-primary/50">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>Here's a detailed breakdown of your performance.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between items-baseline">
                <p class="font-medium">Overall Score:</p>
                <p class="text-2xl font-bold" :class="[progressValue > 70 ? 'text-green-600' : progressValue > 40 ? 'text-amber-500' : 'text-red-600']">
                  {{ score }} / {{ questions.length }}
                </p>
              </div>
              <Progress :model-value="progressValue" />
            </div>
            
            <div class="space-y-4">
              <Alert v-for="result in detailedResults" :key="result.id" :variant="result.isCorrect ? 'default' : 'destructive'" class="bg-card">
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 mt-1" :class="result.isCorrect ? 'text-green-500' : 'text-red-500'" />
                <div class="ml-2">
                  <AlertTitle>Question {{ result.id }}</AlertTitle>
                  <AlertDescription>
                    <p class="font-mono text-base mb-2">
                      {{ result.sentenceStart }}<strong class="underline decoration-wavy" :class="result.isCorrect ? 'decoration-green-500' : 'decoration-red-500'">{{ result.correctAnswer }}</strong>{{ result.sentenceEnd }}
                    </p>
                    <div v-if="!result.isCorrect" class="text-xs mb-2 p-2 bg-red-500/10 rounded-md border border-red-500/20">
                      Your answer: <code class="font-semibold">{{ result.userAnswer || "No Answer" }}</code>
                    </div>
                    <p class="text-sm">{{ result.explanation }}</p>
                  </AlertDescription>
                </div>
              </Alert>
            </div>
            
            <Button @click="retryTest" variant="outline" class="w-full">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
