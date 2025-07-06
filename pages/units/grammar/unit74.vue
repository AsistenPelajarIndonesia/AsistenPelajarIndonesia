<!--
  File: @/pages/units/grammar/8.vue
  Unit: 8 - The vs. Zero Article (General vs. Specific)
  Description: A deep-dive into the usage of the definite article 'the' with plural and uncountable nouns
               to distinguish between general concepts and specific instances. This page provides detailed
               learning material, a challenging practice exercise, and an in-depth results analysis.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

// --- Component Imports ---
// Layout
import GrammarLayout from '@/layouts/GrammarLayout.vue'
// UI Components (assuming a shadcn-vue setup)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// Icons
import { CheckCircle2, XCircle, BookOpen, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Assuming the previous unit is Unit 7
  router.push("/units/grammar/7")
}
function goToNextUnit() {
  // Assuming the next unit is Unit 9
  router.push("/units/grammar/9")
}

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: "Intermediate Grammar Practice",
  testDescription: "Based on 'English Grammar In Use' by Raymond Murphy.",
  unitTitle: "Unit 8: The vs. Zero Article (e.g., children vs. the children)",
  unitDescription: "Master the crucial difference between speaking about things in general and referring to specific things. This is a foundational concept for fluent, natural-sounding English.",
  categories: ['Articles', 'Nouns', 'Determiners', 'Advanced']
}

// --- Reactive State for the Quiz ---
const showResult = ref(false)
const isSubmitted = ref(false)

const questions = reactive([
  {
    id: 1,
    text: "I believe ______ education is essential for progress, but ______ education I received in my hometown was unfortunately subpar.",
    options: ['education / the education', 'the education / education', 'education / education', 'the education / the education'],
    correctAnswer: 'education / the education',
    userAnswer: null as string | null,
    explanation: "The first blank refers to 'education' as a general, abstract concept, so no article is needed. The second blank refers to the *specific* education that 'I' received, making 'the education' correct."
  },
  {
    id: 2,
    text: "She has a deep interest in ______ history, especially ______ history of the Roman Empire.",
    options: ['history / the history', 'the history / history', 'history / history', 'the history / the history'],
    correctAnswer: 'history / the history',
    explanation: "'History' in the first part is the general academic subject. 'The history of the Roman Empire' is a specific, defined period and subject of history, thus requiring 'the'."
  },
  {
    id: 3,
    text: "______ life would be very different without ______ technology. In fact, ______ life of a 19th-century farmer was incredibly difficult.",
    options: ['Life / technology / the life', 'The life / the technology / the life', 'Life / the technology / life', 'The life / technology / a life'],
    correctAnswer: 'Life / technology / the life',
    explanation: "'Life' and 'technology' are used here in their broadest, most general sense. However, 'the life of a 19th-century farmer' refers to a specific type of life, defined by its context ('of a... farmer'), so it requires 'the'."
  },
  {
    id: 4,
    text: "Our tour guide told us that ______ Swiss Alps are beautiful, but he warned us that ______ bad weather can arrive very suddenly there.",
    options: ['the Swiss Alps / the bad weather', 'Swiss Alps / bad weather', 'the Swiss Alps / bad weather', 'Swiss Alps / the bad weather'],
    correctAnswer: 'the Swiss Alps / bad weather',
    explanation: "'the' is used with mountain ranges (the Alps, the Rockies). 'Bad weather' is used in a general sense; we are not talking about a specific storm that has been previously mentioned. It's a general warning about the kind of weather one can expect."
  },
  {
    id: 5,
    text: "You can't buy ______ happiness, but you can buy a ticket to Japan, which is kind of the same thing. ______ happiness of the local people was evident in their welcoming smiles.",
    options: ['The happiness / The happiness', 'Happiness / The happiness', 'Happiness / Happiness', 'The happiness / Happiness'],
    correctAnswer: 'Happiness / The happiness',
    explanation: "The first 'happiness' is the abstract concept in general. The second 'happiness' is specific—it belongs to 'the local people'—so it requires 'the'."
  },
  {
    id: 6,
    text: "______ people who live in glass houses shouldn't throw stones. This proverb means ______ people in general should not criticize others for faults they have themselves.",
    options: ['The people / the people', 'People / people', 'The people / people', 'People / the people'],
    correctAnswer: 'People / people',
    explanation: "This is a tricky one. The first part, 'People who live in glass houses,' feels specific, but it's actually a *general category* of people. The proverb applies to *any* person who fits this description. Therefore, we are speaking generally in both cases. 'The people' would imply specific, known individuals."
  },
  {
    id: 7,
    text: "In his lecture, the professor discussed ______ crime in modern society and then focused on ______ crime that was committed last Tuesday.",
    options: ['crime / the crime', 'the crime / crime', 'crime / crime', 'the crime / the crime'],
    correctAnswer: 'crime / the crime',
    explanation: "'Crime' as a social issue is a general, uncountable concept. 'The crime that was committed last Tuesday' is a specific, singular event, which requires 'the'."
  },
  {
    id: 8,
    text: "My grandfather loves listening to ______ classical music, but he can't stand ______ music my sister plays on her electric guitar.",
    options: ['the classical music / the music', 'classical music / the music', 'classical music / music', 'the classical music / music'],
    correctAnswer: 'classical music / the music',
    explanation: "'Classical music' is a genre, a general category, so no article is used. 'The music my sister plays' is very specific—it refers to a particular set of sounds—and is therefore preceded by 'the'."
  }
])

// --- Computed Properties for Validation & Scoring ---
const totalQuestions = computed(() => questions.length)
const score = computed(() => {
  return questions.filter(q => q.userAnswer === q.correctAnswer).length
})
const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

const feedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: "Flawless Victory!", message: "Exceptional work. You have a deep, intuitive understanding of this complex topic.", variant: 'success' }
  if (percentage >= 75) return { title: "Excellent Job!", message: "You have a strong grasp of the material. Review the explanations for any missed questions to perfect your knowledge.", variant: 'default' }
  if (percentage >= 50) return { title: "Good Effort!", message: "You're on the right track. This is a tricky unit. Carefully read the explanations to solidify the core concepts.", variant: 'default' }
  return { title: "Needs Review", message: "Don't be discouraged! This is a fundamental concept worth mastering. Go over the material and the answer explanations carefully.", variant: 'destructive' }
})

// --- Control Functions ---
function submitAnswers() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  questions.forEach(q => q.userAnswer = null)
  isSubmitted.value = false
  showResult.value = false
}

// --- Dynamic Styling ---
function getOptionClass(question: any, option: string) {
  if (!isSubmitted.value) return ''
  const isCorrect = option === question.correctAnswer
  const isSelected = option === question.userAnswer

  if (isCorrect) return 'text-emerald-600 font-bold'
  if (isSelected && !isCorrect) return 'text-red-600 line-through'
  return 'text-muted-foreground'
}
</script>

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
    <!-- ======================= -->
    <!--  LEARNING MATERIAL SLOT -->
    <!-- ======================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6" />
            <span>A: The Core Principle: General vs. Specific</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-base">
          <p>The choice between using a plural/uncountable noun with <code class="font-mono bg-muted px-1 py-0.5 rounded">the</code> or without it (zero article) depends entirely on context. This is one of the most common areas of difficulty for English learners.</p>
          <div class="rounded-md border p-4">
            <p><strong>RULE 1: Use NO article (Zero Article) to talk about something IN GENERAL.</strong></p>
            <ul class="mt-2 list-disc pl-6 space-y-1">
              <li><em>"I love <strong>books</strong>."</em> (Books in general, all books in the world)</li>
              <li><em>"<strong>Information</strong> is powerful."</em> (The concept of information in general)</li>
              <li><em>"<strong>Children</strong> need a lot of attention."</em> (Children in general)</li>
            </ul>
          </div>
          <div class="rounded-md border p-4">
            <p><strong>RULE 2: Use <code class="font-mono bg-muted px-1 py-0.5 rounded">THE</code> to talk about something SPECIFIC.</strong></p>
            <p class="text-sm text-muted-foreground">The listener/reader knows which specific thing(s) you are talking about.</p>
            <ul class="mt-2 list-disc pl-6 space-y-1">
              <li><em>"I loved <strong>the books</strong> you lent me."</em> (Specific books: the ones you lent me)</li>
              <li><em>"<strong>The information</strong> in this report is incorrect."</em> (Specific information: the info in this report)</li>
              <li><em>"We took <strong>the children</strong> to the park."</em> (Specific children: our children, the children we know)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>B: Common Contexts for 'The'</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
            <p>Specificity is often created by an identifying phrase that comes after the noun, usually with <code class="bg-muted px-1 py-0.5 rounded">'of'</code> or a clause with <code class="bg-muted px-1 py-0.5 rounded">'that/which/who'</code>.</p>
            <p>Compare:</p>
            <ul class="list-none space-y-2">
              <li><strong>General:</strong> "He studies <strong>history</strong>." <br> <strong>Specific:</strong> "He studies <strong>the history</strong> <em>of ancient Greece</em>."</li>
              <li><strong>General:</strong> "I enjoy <strong>music</strong>." <br> <strong>Specific:</strong> "I enjoyed <strong>the music</strong> <em>that you played last night</em>."</li>
              <li><strong>General:</strong> "<strong>Problems</strong> are a part of life." <br> <strong>Specific:</strong> "<strong>The problems</strong> <em>we face today</em> are complex."</li>
            </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================= -->
    <!--   PRACTICE QUIZ SLOT    -->
    <!-- ======================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6" />
            <span>Practice Exercise</span>
          </CardTitle>
          <CardDescription>Choose the most natural-sounding option to complete each sentence. Think carefully about the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. <span v-html="question.text.replace('______', '<span class=text-muted-foreground>[...]</span>')"></span></p>
            <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" :class="getOptionClass(question, option)" class="transition-colors">
                  {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            <Button @click="submitAnswers" class="w-full sm:w-auto" :disabled="isSubmitted">Check Answers</Button>
            <Button @click="resetQuiz" variant="outline" class="w-full sm:w-auto">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================= -->
    <!--      RESULTS SLOT       -->
    <!-- ======================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Here is a breakdown of your performance. Review the explanations to learn from your mistakes.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="flex items-center gap-4 rounded-lg border p-4">
              <div class="flex-shrink-0">
                <p class="text-4xl font-bold">{{ Math.round(scorePercentage) }}<span class="text-xl text-muted-foreground">%</span></p>
                <p class="text-center text-sm font-medium">{{ score }} / {{ totalQuestions }} correct</p>
              </div>
              <div class="flex-grow space-y-2">
                 <Progress :model-value="scorePercentage" class="w-full" />
                 <Alert :variant="feedback.variant">
                   <AlertTitle>{{ feedback.title }}</AlertTitle>
                   <AlertDescription>{{ feedback.message }}</AlertDescription>
                 </Alert>
              </div>
            </div>

            <!-- Detailed Answer Review -->
            <div>
              <h3 class="text-lg font-semibold mb-4">Detailed Review</h3>
              <div class="space-y-6">
                <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                   <div class="p-4 rounded-md" :class="question.userAnswer === question.correctAnswer ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'">
                    <p class="font-semibold">{{ index + 1 }}. <span v-html="question.text.replace('______', '[...]')"></span></p>
                    <div class="mt-3 flex items-start gap-3">
                      <div class="flex-shrink-0">
                        <CheckCircle2 v-if="question.userAnswer === question.correctAnswer" class="h-5 w-5 text-emerald-600" />
                        <XCircle v-else class="h-5 w-5 text-red-600" />
                      </div>
                      <div class="flex-grow">
                        <p class="text-sm">
                          Your answer: 
                          <span :class="question.userAnswer === question.correctAnswer ? 'text-emerald-700' : 'text-red-700'">
                            {{ question.userAnswer || 'Not answered' }}
                          </span>
                        </p>
                        <p v-if="question.userAnswer !== question.correctAnswer" class="text-sm">
                          Correct answer: 
                          <span class="font-medium text-emerald-700">{{ question.correctAnswer }}</span>
                        </p>
                         <Alert class="mt-3 bg-background">
                            <AlertTitle class="font-bold">Explanation</AlertTitle>
                            <AlertDescription>
                              {{ question.explanation }}
                            </AlertDescription>
                          </Alert>
                      </div>
                    </div>
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

<style>
/* Add a simple fade transition for the results */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
