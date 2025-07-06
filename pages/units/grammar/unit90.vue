<!--
  File: @/pages/units/grammar/24.vue
  Unit: 24 - Each and Every
  Description: An advanced, interactive grammar drill focusing on the nuanced usage of 'each' and 'every'.
  This page integrates learning material, challenging practice questions, and a detailed results validator
  within the sophisticated GrammarLayout.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a UI library like shadcn-vue
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-vue-next'

const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  // English Grammar in Use, Unit 23 is "all, every, whole"
  router.push("/units/grammar/23")
}
function goToNextUnit() {
  // English Grammar in Use, Unit 25 is "both, either, neither"
  router.push("/units/grammar/25")
}

// --- State Management ---
const showResult = ref(false)
const userAnswers = reactive<Record<number, string | null>>({})

interface Question {
  id: number
  type: 'multiple-choice' | 'fill-in-the-blank'
  text: string
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
}

// --- Content: Questions & Explanations ---
// The questions are designed to be progressively difficult, testing subtle distinctions.
const questions = reactive<Question[]>([
  {
    id: 1,
    type: 'multiple-choice',
    text: "The business was failing. ____ day brought fresh anxieties and fewer customers.",
    prompt: "Choose the word that emphasizes the continuous, uninterrupted sequence of days.",
    options: ['Each', 'Every'],
    correctAnswer: 'Every',
    explanation: "We use 'every' to talk about things that happen repeatedly or at regular intervals (every day, every week). It emphasizes the collective sequence of events, painting a picture of relentless, daily decline."
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "The detective interviewed the five witnesses and gave ____ of them a chance to tell their story.",
    prompt: "Which word is required when followed by 'of the' to refer to members of a specific, defined group?",
    options: ['Each', 'Every'],
    correctAnswer: 'Each',
    explanation: "A critical rule: 'every' cannot be directly followed by 'of'. When referring to an individual member of a specific group (like 'the five witnesses'), you must use 'each of'. 'Every one of' is a possible alternative, but 'each of' is more common and direct."
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "Holding a trophy in ____ hand, the champion beamed at the crowd.",
    prompt: "Select the only possible word when referring to a set of two.",
    options: ['Each', 'Every'],
    correctAnswer: 'Each',
    explanation: "'Each' can be used for two or more items, but 'every' must be used for three or more. Since a person has only two hands, 'each' is the only correct choice. Think of it as focusing on the individual items in a small, countable set."
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: "____ seat in the massive stadium, which holds 80,000 people, was sold out.",
    prompt: "Which word is more natural for describing a large, almost indefinite number of items within a group?",
    options: ['Each', 'Every'],
    correctAnswer: 'Every',
    explanation: "While 'each' is not grammatically wrong here, 'every' is far more natural and idiomatic when talking about large numbers. 'Every' treats the items as a collective group ('all the seats'), while 'each' would imply an unnatural focus on seat 1, seat 2, seat 3, and so on."
  },
  {
    id: 5,
    type: 'multiple-choice',
    text: "The tour guide gave the tourists a map. ____ was advised to keep it safe.",
    prompt: "Which word can function as a standalone pronoun?",
    options: ['Each', 'Every'],
    correctAnswer: 'Each',
    explanation: "'Each' can stand alone as a pronoun. 'Every' cannot; it must always be followed by a noun (every person) or use a compound form like 'everyone' or 'everybody'. Here, 'Each' is a pronoun referring back to 'each tourist'."
  },
  {
    id: 6,
    type: 'multiple-choice',
    text: "I get my car serviced ____ six months without fail.",
    prompt: "Choose the word used to denote regular, recurring intervals.",
    options: ['each', 'every'],
    correctAnswer: 'every',
    explanation: "'Every' is the standard choice for expressing frequency (every ten minutes, every three weeks). It signals a regular, repeating pattern. 'Each six months' is not idiomatic in this context."
  },
  {
    id: 7,
    type: 'multiple-choice',
    text: "He carefully examined the paintings. He spent ten minutes on ____ one.",
    prompt: "Which option correctly completes the phrase that emphasizes individual consideration?",
    options: ['each', 'every'],
    correctAnswer: 'each',
    explanation: "The phrase 'each one' is used to emphasize individuality and separate action. While 'every one' exists, 'each one' is more common for highlighting the distinct, item-by-item focus, which fits the context of careful examination."
  },
  {
    id: 8,
    type: 'multiple-choice',
    text: "The concert tickets were expensive, costing over £100 ____.",
    prompt: "Select the word that can be used adverbially at the end of a phrase to mean 'per item'.",
    options: ['each', 'every'],
    correctAnswer: 'each',
    explanation: "Only 'each' can be used as an adverb in this way, typically after a price or quantity, to mean 'for one item'. You can say 'The apples are 50p each', but not '50p every'."
  }
])

// --- Computed Properties for Results ---
const results = computed(() => {
  return questions.map(q => {
    const userAnswer = userAnswers[q.id]
    const isCorrect = userAnswer === q.correctAnswer
    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })
})

const score = computed(() => {
  const correctAnswers = results.value.filter(r => r.isCorrect).length
  return Math.round((correctAnswers / questions.length) * 100)
})

const scoreColor = computed(() => {
  if (score.value < 40) return 'bg-red-500'
  if (score.value < 75) return 'bg-yellow-500'
  return 'bg-green-500'
})

const scoreFeedback = computed(() => {
  if (score.value < 40) return "A challenging start. Review the material, especially the core differences, and try again."
  if (score.value < 75) return "Good effort! You're grasping some key concepts, but some nuances need more attention. The explanations below will be very helpful."
  if (score.value < 100) return "Excellent work! You have a strong command of this topic. Review the few missed points to achieve mastery."
  return "Perfect Score! You've demonstrated a masterful understanding of 'each' and 'every'. Congratulations!"
})

// --- Methods ---
function checkAnswers() {
  // Ensure all questions are answered
  if (Object.keys(userAnswers).length !== questions.length) {
    alert("Please answer all questions before submitting.")
    return
  }
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  // Clear user answers by iterating through the keys
  Object.keys(userAnswers).forEach(key => {
    const numericKey = parseInt(key, 10);
    if (!isNaN(numericKey)) {
        userAnswers[numericKey] = null;
    }
  });
  showResult.value = false
  // Scroll back to the top of the practice section
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Initialize userAnswers object
questions.forEach(q => {
  userAnswers[q.id] = null
})
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="An advanced interactive workout to master the intricacies of English grammar."
    unit-title="Unit 24: Each and Every"
    unit-description="Exploring the subtle yet crucial differences between two common determiners. Pay close attention to singular nouns, group vs. individual focus, and usage with 'of'."
    :categories="['Determiners', 'Quantifiers', 'Singular Nouns', 'Common Mistakes']"
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
          <CardTitle>Core Principle: Singular Focus</CardTitle>
          <CardDescription>
            Both 'each' and 'every' are followed by a singular countable noun and a singular verb.
            This is the foundational rule that trips up many learners.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <p class="font-mono bg-muted p-2 rounded-md text-sm">
            <span class="text-green-600 font-bold">CORRECT:</span> Every student <strong>has</strong> a textbook.
          </p>
          <p class="font-mono bg-muted p-2 rounded-md text-sm">
            <span class="text-green-600 font-bold">CORRECT:</span> Each child <strong>was</strong> given a prize.
          </p>
          <p class="font-mono bg-muted p-2 rounded-md text-sm">
            <span class="text-red-600 font-bold">INCORRECT:</span> <del>Each of the students have a book.</del> (Verb must be 'has')
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Differences: When to Use Which</CardTitle>
          <CardDescription>
            The choice between 'each' and 'every' depends on perspective: are you seeing a group or its individuals?
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">1. Group Size & Focus</h4>
            <ul class="list-disc pl-5 mt-1 text-sm text-muted-foreground">
              <li><strong>Each:</strong> Use for a small, specific number of items. It emphasizes the individuality of each member. Think of a one-by-one action. <br><em>Example: She kissed <strong>each</strong> of her two children on the forehead.</em></li>
              <li><strong>Every:</strong> Use for a large, general, or indefinite number. It emphasizes the collective whole; all members are included. <br><em>Example: <strong>Every</strong> citizen has the right to vote.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">2. The "Of" Construction</h4>
            <ul class="list-disc pl-5 mt-1 text-sm text-muted-foreground">
              <li><strong>Each:</strong> Can be followed by 'of' when referring to a specific, definite group (usually preceded by 'the', 'my', 'these'). <br><em>Example: <strong>Each of</strong> the team members received a medal.</em></li>
              <li><strong>Every:</strong> Cannot be used with 'of'. You must use "every one of". <br><em>Example: <strong>Every one of</strong> the paintings was a masterpiece.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">3. Standalone Pronouns</h4>
            <ul class="list-disc pl-5 mt-1 text-sm text-muted-foreground">
              <li><strong>Each:</strong> Can function as a pronoun on its own. <br><em>Example: Two books were offered. He took <strong>each</strong>.</em></li>
              <li><strong>Every:</strong> Cannot function as a pronoun. It must modify a noun. Use 'everyone' or 'everybody' instead. <br><em>Example: <del>He greeted every.</del> He greeted <strong>everyone</strong>.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">4. Adverbial Use</h4>
            <ul class="list-disc pl-5 mt-1 text-sm text-muted-foreground">
              <li><strong>Each:</strong> Can be used at the end of a sentence to mean "per item". <br><em>Example: The donuts cost $2 <strong>each</strong>.</em></li>
              <li><strong>Every:</strong> Cannot be used this way.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section">
        <Card>
          <CardHeader>
            <CardTitle>Practice Questions</CardTitle>
            <CardDescription>
              Read each sentence carefully. Consider the subtle rules of group size, individuality, and sentence structure you've just reviewed.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <p class="font-semibold">Question {{ index + 1 }}</p>
              <p class="text-muted-foreground italic text-sm">{{ question.prompt }}</p>
              <p class="text-base leading-relaxed">{{ question.text }}</p>
              <RadioGroup v-model="userAnswers[question.id]" class="grid grid-cols-2 gap-4">
                <div v-for="option in question.options" :key="option">
                  <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" class="peer sr-only" />
                  <Label
                    :for="`q${question.id}-${option}`"
                    class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    {{ option }}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button v-if="!showResult" class="w-full" size="lg" @click="checkAnswers">
              Check Answers & See Score
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-primary/50 border-2">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>
              An analysis of your performance. Use the explanations to reinforce your understanding.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="space-y-2">
              <div class="flex justify-between items-baseline">
                <p class="text-lg font-medium">Final Score:</p>
                <p class="text-3xl font-bold" :class="score > 75 ? 'text-green-600' : 'text-yellow-600'">{{ score }}%</p>
              </div>
              <Progress :model-value="score" :class="scoreColor" class="h-3" />
              <p class="text-sm text-muted-foreground">{{ scoreFeedback }}</p>
            </div>

            <!-- Detailed Breakdown -->
            <div class="space-y-6">
              <div v-for="result in results" :key="result.id" class="p-4 rounded-lg" :class="result.isCorrect ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-red-500/10 border-l-4 border-red-500'">
                <div class="flex items-start gap-4">
                  <div>
                    <CheckCircle v-if="result.isCorrect" class="h-6 w-6 text-green-500" />
                    <XCircle v-else class="h-6 w-6 text-red-500" />
                  </div>
                  <div class="flex-1 space-y-2">
                    <p class="font-semibold">{{ result.text.replace('____', `[${result.correctAnswer}]`) }}</p>
                    <div class="text-sm">
                      <p v-if="!result.isCorrect">
                        <span class="font-medium">Your answer:</span>
                        <span class="font-mono bg-red-200/50 text-red-800 px-1 py-0.5 rounded">{{ result.userAnswer }}</span>
                      </p>
                      <p>
                        <span class="font-medium">Correct answer:</span>
                        <span class="font-mono bg-green-200/50 text-green-800 px-1 py-0.5 rounded">{{ result.correctAnswer }}</span>
                      </p>
                    </div>
                    <div class="mt-2 p-3 bg-background/50 rounded-md border">
                      <p class="flex items-center gap-2 font-semibold text-primary/90"><AlertCircle class="h-4 w-4" /> Explanation</p>
                      <p class="text-sm text-muted-foreground mt-1">{{ result.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <Button class="w-full" size="lg" variant="outline" @click="resetQuiz">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
