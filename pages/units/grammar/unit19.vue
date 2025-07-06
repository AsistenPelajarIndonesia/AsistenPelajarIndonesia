<!--
  File: @/pages/units/grammar/13.vue
  Description: An advanced grammar practice page for Unit 13: "I'm going to (do)",
  inspired by Raymond Murphy's "English Grammar In Use". This page provides an
  in-depth lesson, challenging exercises, and a sophisticated validation system with
  detailed explanations to ensure students' grammatical understanding improves.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally registered or available for import
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle, GraduationCap } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

// --- Page & Unit Metadata ---
const pageData = reactive({
  testTitle: "English Grammar In Use: Practice",
  testDescription: "Advanced exercises based on the world's best-selling grammar book by Raymond Murphy.",
  unitTitle: "Unit 13: I'm going to (do)",
  unitDescription: "Mastering the expression of future plans, intentions, and predictions based on present evidence.",
  categories: ['Future Tenses', 'Intentions', 'Predictions', 'Intermediate'],
  currentUnit: 13,
})

// --- Navigation Logic ---
function goToPreviousUnit() {
  router.push(`/units/grammar/${pageData.currentUnit - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${pageData.currentUnit + 1}`)
}

// --- Exercise & State Management ---
const showResult = ref(false)
const userAnswers = ref<string[]>(['', '', '', '', ''])

const questions = reactive([
  {
    id: 'q1',
    type: 'fill-in',
    prompt: "You and a friend have decided to redecorate your apartment next month. You are discussing the plan. Complete your friend's sentence: 'We need a new color for the living room. I think I _______ (paint) it blue.'",
    correctAnswer: "am going to paint",
    explanation: "We use 'am/is/are going to' to express a future plan or intention that has already been decided upon. The context 'have decided to redecorate' clearly indicates a pre-existing plan, not a spontaneous decision made at the moment of speaking (which would use 'will').",
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    prompt: "Observe the situation: A man is running towards a bus stop, but the bus is already pulling away and accelerating. What is the most logical prediction to make?",
    options: [
      { id: 'q2o1', value: "He is going to catch the bus.", label: "He is going to catch the bus." },
      { id: 'q2o2', value: "He will miss the bus.", label: "He will miss the bus." },
      { id: 'q2o3', value: "He is not going to catch the bus.", label: "He is not going to catch the bus." },
    ],
    correctAnswer: "He is not going to catch the bus.",
    explanation: "'Be going to' is used for predictions based on clear, present evidence. The evidence—the bus pulling away and the man still running—strongly suggests he will fail. While 'will miss' is grammatically possible, 'is not going to catch' is the most direct prediction from the observable facts, which is the core concept of this structure for predictions.",
  },
  {
    id: 'q3',
    type: 'sentence-correction',
    prompt: "Your colleague is looking pale and holding their stomach. Correct the following sentence to express a prediction based on what you see: 'I think she will be sick.'",
    correctAnswer: "I think she is going to be sick.",
    explanation: "When a prediction is based on immediate, tangible evidence (the person looking pale and holding their stomach), 'is going to' is the preferred and more precise structure. 'Will' is used for predictions based on opinion or general belief, not direct observation. The evidence in front of you makes 'is going to' much stronger.",
  },
  {
    id: 'q4',
    type: 'scenario-analysis',
    prompt: "Read the dialogue. Which statement correctly describes the speaker's intention? --- A: 'I've had enough of this job. I handed in my resignation this morning.' B: 'Wow! What will you do now?' A: 'I _______ travel around Asia for six months.'",
    options: [
      { id: 'q4o1', value: "am going to", label: "'am going to' is correct because the decision was made before the conversation." },
      { id: 'q4o2', value: "will", label: "'will' is correct because it's a new decision." },
      { id: 'q4o3', value: "am travelling", label: "'am travelling' is correct because it's a fixed arrangement." },
    ],
    correctAnswer: "am going to",
    explanation: "The correct verb form to complete the sentence is 'am going to'. The speaker has already 'handed in my resignation', indicating that the decision to leave and subsequently travel is a pre-meditated intention. While 'am travelling' (Present Continuous) could be used if arrangements like flights were booked, 'am going to' perfectly expresses the established plan, which is the key point here.",
  },
  {
    id: 'q5',
    type: 'fill-in',
    prompt: "Careful with that vase! You're holding it so carelessly. You _______ (drop) it!",
    correctAnswer: "are going to drop",
    explanation: "This is a classic example of a prediction based on immediate evidence. The action of holding the vase carelessly is the evidence that leads to the logical, imminent conclusion that it will be dropped. 'Are going to drop' is the most natural and accurate way to express this warning.",
  },
])

// --- Computed Properties for Validation & Results ---
const results = computed(() => {
  return questions.map((q, index) => {
    const userAnswer = userAnswers.value[index]?.trim().toLowerCase()
    const correctAnswer = (typeof q.correctAnswer === 'string' ? q.correctAnswer : q.correctAnswer.value).toLowerCase()
    const isCorrect = userAnswer === correctAnswer
    
    // For fill-in, find the specific option label if applicable
    let userAnswerLabel = userAnswers.value[index]
    if (q.type === 'multiple-choice' || q.type === 'scenario-analysis') {
        const selectedOption = q.options?.find(opt => opt.value === userAnswers.value[index])
        userAnswerLabel = selectedOption ? selectedOption.label : 'No answer'
    }

    return {
      ...q,
      userAnswer: userAnswerLabel,
      isCorrect,
    }
  })
})

const score = computed(() => {
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.length) * 100)
})

const scoreColor = computed(() => {
  if (score.value >= 80) return 'bg-green-500'
  if (score.value >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
})

// --- Event Handlers ---
function handleSubmit() {
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader class="flex flex-row items-center gap-3">
            <GraduationCap class="h-8 w-8 text-blue-500" />
            <div>
              <CardTitle>Core Concepts: 'be going to'</CardTitle>
              <CardDescription>Understanding when and why to use this future form.</CardDescription>
            </div>
        </CardHeader>
        <CardContent class="grid gap-6 text-sm">
          <div>
            <h3 class="font-bold text-base mb-2">A. Expressing Intentions & Plans</h3>
            <p class="text-muted-foreground mb-3">
              We use <code class="bg-muted px-1 py-0.5 rounded">'I am going to do something'</code> when we have already decided to do it. The decision was made <span class="font-semibold italic">before</span> the moment of speaking.
            </p>
            <div class="rounded-md border border-l-4 border-blue-500 bg-muted/50 p-3 space-y-2">
              <p><span class="font-semibold">Example:</span> "I've saved enough money. I<span class="font-bold text-blue-600">'m going to buy</span> a new car next month." (The decision is made).</p>
              <p><span class="font-semibold">Compare with 'will':</span> "I'll buy it!" (A spontaneous decision made at the moment of seeing the car).</p>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-base mb-2">B. Making Predictions (with Evidence)</h3>
            <p class="text-muted-foreground mb-3">
              We use <code class="bg-muted px-1 py-0.5 rounded">'something is going to happen'</code> when there is clear, visible evidence in the present situation that makes us believe something is certain to happen in the future.
            </p>
            <div class="rounded-md border border-l-4 border-amber-500 bg-muted/50 p-3 space-y-2">
              <p><span class="font-semibold">Example:</span> "Look at those dark clouds! It<span class="font-bold text-amber-600">'s going to rain</span>." (The clouds are the evidence).</p>
              <p><span class="font-semibold">Example:</span> "The player is limping badly. He<span class="font-bold text-amber-600">'s not going to finish</span> the match." (The limp is the evidence).</p>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-base mb-2">Teacher's Insight: Common Pitfalls</h3>
            <p class="text-muted-foreground">
              A frequent mistake is confusing 'going to' with the Present Continuous for future plans. Use <span class="font-semibold">'going to'</span> for intentions, and <span class="font-semibold">Present Continuous</span> for fixed arrangements with other people (e.g., "I'm meeting Jane at 8pm."). The distinction is subtle but crucial for sounding natural.
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Unit 13: Exercises</CardTitle>
          <CardDescription>
            Apply your knowledge. Read each scenario carefully before answering.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-8">
          <!-- Question Loop -->
          <div v-for="(q, index) in questions" :key="q.id" class="flex flex-col gap-3">
            <p class="font-semibold leading-snug">
              {{ index + 1 }}. {{ q.prompt }}
            </p>
            <!-- Fill-in-the-blank -->
            <div v-if="q.type === 'fill-in' || q.type === 'sentence-correction'">
              <Input
                :id="q.id"
                v-model="userAnswers[index]"
                type="text"
                placeholder="Your answer..."
                :disabled="showResult"
                class="transition-all"
                :class="{'border-gray-300': !showResult, 'cursor-not-allowed bg-gray-100': showResult}"
              />
            </div>
            <!-- Multiple Choice -->
            <div v-if="q.type === 'multiple-choice' || q.type === 'scenario-analysis'">
              <RadioGroup
                v-model="userAnswers[index]"
                :disabled="showResult"
                class="grid gap-2"
              >
                <div v-for="option in q.options" :key="option.id">
                   <Label
                    :for="option.id"
                    class="flex items-center space-x-3 rounded-md border p-3 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70"
                    :class="{'hover:bg-accent hover:text-accent-foreground cursor-pointer': !showResult}"
                   >
                    <RadioGroupItem :id="option.id" :value="option.value" />
                    <span>{{ option.label }}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full md:w-auto" @click="handleSubmit">
            Check Answers & Get Feedback
          </Button>
           <p v-else class="text-sm text-muted-foreground italic">
             Scroll down to see your detailed results.
           </p>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="w-full">
        <CardHeader>
          <CardTitle>Your Results & Detailed Breakdown</CardTitle>
          <CardDescription>
            Learning happens here. Understand not just *what* you got wrong, but *why*.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Score Summary -->
          <div class="rounded-lg border bg-card text-card-foreground p-6 space-y-4">
             <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold tracking-tight">Overall Score: {{ score }}%</h3>
                <span v-if="score >= 80" class="flex items-center gap-2 text-green-600"><CheckCircle2 class="h-6 w-6"/>Excellent Work!</span>
                <span v-else-if="score >= 50" class="flex items-center gap-2 text-yellow-600"><HelpCircle class="h-6 w-6"/>Good Effort!</span>
                <span v-else class="flex items-center gap-2 text-red-600"><XCircle class="h-6 w-6"/>Needs Review</span>
             </div>
             <Progress :model-value="score" :class="scoreColor" class="h-3"/>
             <p class="text-sm text-muted-foreground">You answered {{ results.filter(r => r.isCorrect).length }} out of {{ questions.length }} questions correctly.</p>
          </div>
          
          <!-- Detailed Feedback Loop -->
          <div class="space-y-6">
            <div v-for="(result, index) in results" :key="`res-${result.id}`"
                 class="p-4 rounded-md transition-all"
                 :class="result.isCorrect ? 'bg-green-50 border-green-200 border' : 'bg-red-50 border-red-200 border'">
              <div class="flex items-start gap-4">
                  <div class="mt-1">
                    <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                    <XCircle v-else class="h-5 w-5 text-red-500" />
                  </div>
                  <div class="flex-1 space-y-3">
                    <p class="font-semibold text-sm">Question {{ index + 1 }}: {{ result.prompt }}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                        <div class="rounded-md p-2" :class="result.isCorrect ? 'bg-green-100' : 'bg-red-100'">
                            <p class="font-bold text-muted-foreground">Your Answer:</p>
                            <p class="font-mono">{{ result.userAnswer || 'No answer provided' }}</p>
                        </div>
                         <div class="rounded-md p-2" :class="result.isCorrect ? 'bg-green-100' : 'bg-green-100'">
                            <p class="font-bold text-muted-foreground">Correct Answer:</p>
                            <p class="font-mono">{{ result.correctAnswer }}</p>
                        </div>
                    </div>
                    
                    <Alert v-if="!result.isCorrect" variant="destructive" class="bg-white border-red-300">
                      <AlertTitle class="font-bold">Explanation</AlertTitle>
                      <AlertDescription class="text-red-900 leading-relaxed">
                        {{ result.explanation }}
                      </AlertDescription>
                    </Alert>
                     <Alert v-else variant="default" class="bg-white border-green-300">
                      <AlertTitle class="font-bold text-green-800">Explanation</AlertTitle>
                      <AlertDescription class="text-green-900 leading-relaxed">
                        {{ result.explanation }}
                      </AlertDescription>
                    </Alert>
                  </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
