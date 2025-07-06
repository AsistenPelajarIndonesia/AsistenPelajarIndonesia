<!--
  File: @/pages/units/grammar/1.vue
  Description: An advanced grammar practice page for Unit 1: -ing Clauses.
  This page integrates learning material, challenging exercises, and detailed
  feedback to create an effective learning experience, following the principles
  of renowned grammar pedagogues.
-->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are available in the project
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Component State & Logic ---
const router = useRouter()

const showResult = ref(false)
const userAnswers = ref<Record<string, string>>({
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
})
const submittedAnswers = ref<Record<string, string> | null>(null)

// --- Navigation ---
function goToPreviousUnit() {
  // Unit 1 is the first, so this might navigate to an index or be disabled.
  // For this example, we'll show an alert, but in a real app, it might go to '/units/grammar'
  alert("You are at the first unit!")
}

function goToNextUnit() {
  router.push("/units/grammar/2")
}

// --- Question Data & Validation Logic ---
// Inspired by the structure and difficulty of Cambridge University Press materials.
const questions = [
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: 'Which sentence correctly combines these two ideas? "The detective searched the room. He was looking for clues."',
    options: [
      { id: 'q1a', value: 'The detective searched the room, looking for clues.', label: 'The detective searched the room, looking for clues.' },
      { id: 'q1b', value: 'Looking for clues, the room was searched by the detective.', label: 'Looking for clues, the room was searched by the detective.' },
      { id: 'q1c', value: 'The detective, looking for clues, and he searched the room.', label: 'The detective, looking for clues, and he searched the room.' },
      { id: 'q1d', value: 'He searched the room and was looking for clues.', label: 'He searched the room and was looking for clues.' },
    ],
    correctAnswer: 'The detective searched the room, looking for clues.',
    explanation: `The -ing clause "looking for clues" directly describes what the detective was doing while searching the room. It describes a simultaneous action. Option B creates a dangling modifier (it sounds like the room was looking for clues). Option C is grammatically redundant. Option D is correct but doesn't use the target grammar structure.`
  },
  {
    id: 'q2',
    type: 'sentence-rewrite',
    prompt: 'Rewrite the following sentence using an -ing clause at the beginning. "Because he felt unwell, he decided not to go to the party."',
    correctAnswer: 'Feeling unwell, he decided not to go to the party.',
    explanation: `When an -ing clause starts a sentence, it often explains the reason for the action in the main clause. "Feeling unwell" provides the 'why' for his decision. The subject of the -ing clause ('he' who is feeling unwell) must be the same as the subject of the main clause ('he' who decided).`,
  },
  {
    id: 'q3',
    type: 'sentence-rewrite',
    prompt: 'Identify and correct the error in this sentence: "Being an important historical document, the museum guards it carefully."',
    correctAnswer: 'It being an important historical document, the museum guards it carefully.',
    explanation: `This is a challenging one! The original sentence has a dangling modifier. Who or what is "being an important historical document"? It's not the museum. To fix this, we use an absolute construction by giving the -ing clause its own subject: "it". This structure, "[noun/pronoun] + [-ing form]", allows the clause to modify the entire main clause that follows.`
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    prompt: 'Which sentence implies that the discovery was a direct result of the research?',
    options: [
      { id: 'q4a', value: 'The scientist published a paper, discovering a new particle.', label: 'The scientist published a paper, discovering a new particle.' },
      { id: 'q4b', value: 'Discovering a new particle, the scientist published a paper.', label: 'Discovering a new particle, the scientist published a paper.' },
      { id: 'q4c', value: 'The scientist published a paper and discovered a new particle.', label: 'The scientist published a paper and discovered a new particle.' },
      { id: 'q4d', value: 'The scientist who discovered a new particle published a paper.', label: 'The scientist who discovered a new particle published a paper.' },
    ],
    correctAnswer: 'Discovering a new particle, the scientist published a paper.',
    explanation: `When the -ing clause comes first, it strongly implies cause and effect or a sequence of events. The discovery led to the publication. Option A implies the discovery happened *while* publishing, which is less logical. Options C and D are grammatically fine but don't use the -ing clause to show this specific relationship of cause/result.`
  },
  {
    id: 'q5',
    type: 'sentence-rewrite',
    prompt: 'Combine the sentences using an -ing clause. Do not start the sentence with the -ing clause. "She stepped onto the stage. She was trembling with fear."',
    correctAnswer: 'She stepped onto the stage, trembling with fear.',
    explanation: `The clause "trembling with fear" describes the subject "She" at the same time as the main action "stepped onto the stage". Placing the -ing clause after the main clause is a very common and natural way to add descriptive detail about the subject's concurrent actions or feelings.`
  },
]

// --- Computed Properties for Validation & UI ---
const isAllAnswered = computed(() => {
  return questions.every(q => userAnswers.value[q.id]?.trim() !== '')
})

const score = computed(() => {
  if (!submittedAnswers.value) return 0
  return questions.reduce((correctCount, question) => {
    const userAnswer = submittedAnswers.value![question.id]?.trim().toLowerCase().replace(/[.,]$/, '')
    const correctAnswer = question.correctAnswer.toLowerCase().replace(/[.,]$/, '')
    return userAnswer === correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (!submittedAnswers.value) return 0
  return Math.round((score.value / questions.length) * 100)
})

// --- Methods ---
function checkAnswers() {
  submittedAnswers.value = { ...userAnswers.value }
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  userAnswers.value = { q1: '', q2: '', q3: '', q4: '', q5: '' }
  submittedAnswers.value = null
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function isCorrect(questionId: string): boolean {
  if (!submittedAnswers.value) return false
  const question = questions.find(q => q.id === questionId)
  if (!question) return false
  const userAnswer = submittedAnswers.value[questionId]?.trim().toLowerCase().replace(/[.,]$/, '')
  const correctAnswer = question.correctAnswer.toLowerCase().replace(/[.,]$/, '')
  return userAnswer === correctAnswer
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Advanced exercises based on the world's best-selling grammar book."
    unit-title="Unit 1: -ing Clauses"
    unit-description="He hurt his knee playing football. Mastering participial phrases for sophisticated sentence construction."
    :categories="['Clauses', 'Participles', 'Advanced Syntax']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>The Power of the -ing Clause</CardTitle>
          <CardDescription>
            An -ing clause (or present participle clause) is a versatile tool used to connect ideas without using simple conjunctions like 'and', 'so', or 'because'. It makes your writing more fluid and dynamic.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><strong class="text-primary">Rule 1: Simultaneous Actions.</strong> The -ing clause describes an action happening at the same time as the main verb.</p>
          <blockquote class="ml-4 border-l-2 pl-4 italic">
            "A man ran out of the house, <strong class="text-emerald-600">shouting</strong>." (He was running and shouting at the same time.)
          </blockquote>
          <p><strong class="text-primary">Rule 2: Reason for an Action.</strong> The -ing clause can explain *why* the main action occurred. It often starts the sentence.</p>
          <blockquote class="ml-4 border-l-2 pl-4 italic">
            "<strong class="text-emerald-600">Feeling tired</strong>, I went to bed early." (Because I felt tired...)
          </blockquote>
          <p><strong class="text-primary">Rule 3: Result of an Action.</strong> The -ing clause can describe something that happens as a direct result of the main action.</p>
          <blockquote class="ml-4 border-l-2 pl-4 italic">
            "The bomb exploded, <strong class="text-emerald-600">destroying the building</strong>." (The explosion caused the building's destruction.)
          </blockquote>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>The Golden Rule: Avoid Dangling Modifiers!</AlertTitle>
        <AlertDescription>
          The subject of the -ing clause must be the same as the subject of the main clause. If not, your sentence becomes illogical.
          <br>
          <strong class="text-red-600">Incorrect:</strong> <span class="line-through">Having finished the assignment, the TV was turned on.</span> (This implies the TV finished the assignment!)
          <br>
          <strong class="text-green-600">Correct:</strong> <span class="font-semibold">Having finished the assignment, Sarah turned on the TV.</span>
        </AlertDescription>
      </Alert>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Precision is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Question 1 -->
          <div v-if="questions[0]" class="space-y-3">
            <Label :for="questions[0].id" class="font-semibold">1. {{ questions[0].prompt }}</Label>
            <RadioGroup :id="questions[0].id" v-model="userAnswers.q1" :disabled="showResult">
              <div v-for="option in questions[0].options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="option.id" :value="option.value" />
                <Label :for="option.id" class="font-normal">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <!-- Question 2 -->
          <div v-if="questions[1]" class="space-y-3">
            <Label :for="questions[1].id" class="font-semibold">2. {{ questions[1].prompt }}</Label>
            <Input :id="questions[1].id" v-model="userAnswers.q2" placeholder="Your rewritten sentence..." :disabled="showResult" />
          </div>
          <!-- Question 3 -->
          <div v-if="questions[2]" class="space-y-3">
            <Label :for="questions[2].id" class="font-semibold">3. {{ questions[2].prompt }}</Label>
            <Input :id="questions[2].id" v-model="userAnswers.q3" placeholder="Your corrected sentence..." :disabled="showResult" />
          </div>
          <!-- Question 4 -->
          <div v-if="questions[3]" class="space-y-3">
            <Label :for="questions[3].id" class="font-semibold">4. {{ questions[3].prompt }}</Label>
            <RadioGroup :id="questions[3].id" v-model="userAnswers.q4" :disabled="showResult">
              <div v-for="option in questions[3].options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="option.id" :value="option.value" />
                <Label :for="option.id" class="font-normal">{{ option.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <!-- Question 5 -->
          <div v-if="questions[4]" class="space-y-3">
            <Label :for="questions[4].id" class="font-semibold">5. {{ questions[4].prompt }}</Label>
            <Input :id="questions[4].id" v-model="userAnswers.q5" placeholder="Your combined sentence..." :disabled="showResult" />
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" :disabled="!isAllAnswered || showResult" @click="checkAnswers">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card class="border-primary/50">
          <CardHeader>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle class="text-2xl">Your Results</CardTitle>
                <CardDescription>An analysis of your performance. Review the explanations carefully.</CardDescription>
              </div>
              <div class="flex items-center gap-4">
                 <div class="text-right">
                    <p class="text-4xl font-bold">{{ score }}/{{ questions.length }}</p>
                    <p class="text-sm text-muted-foreground">Score</p>
                  </div>
                  <Button @click="resetTest" size="sm" variant="outline">
                    <RefreshCw class="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-6">
            <div>
              <Label class="text-sm font-medium">Overall Performance: {{ scorePercentage }}%</Label>
              <Progress :model-value="scorePercentage" class="mt-2" />
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Detailed Breakdown</h3>
              <div v-for="q in questions" :key="`result-${q.id}`" class="rounded-lg border p-4" :class="[isCorrect(q.id) ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950']">
                <div class="flex items-start gap-4">
                  <div>
                    <CheckCircle2 v-if="isCorrect(q.id)" class="h-6 w-6 text-green-600" />
                    <XCircle v-else class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="flex-1 space-y-2">
                    <p class="font-semibold">{{ q.prompt }}</p>
                    <p class="text-sm">
                      <span class="font-medium text-muted-foreground">Your answer:</span>
                      <span :class="[isCorrect(q.id) ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300']">
                        "{{ submittedAnswers?.[q.id] || 'No answer' }}"
                      </span>
                    </p>
                    <template v-if="!isCorrect(q.id)">
                      <p class="text-sm">
                        <span class="font-medium text-muted-foreground">Correct answer:</span>
                        <span class="font-semibold text-primary">"{{ q.correctAnswer }}"</span>
                      </p>
                      <Alert variant="default" class="mt-2 border-l-4" :class="[isCorrect(q.id) ? 'border-green-500' : 'border-yellow-500']">
                        <AlertCircle class="h-4 w-4"/>
                        <AlertTitle class="font-bold">Explanation</AlertTitle>
                        <AlertDescription class="text-sm leading-relaxed">
                          {{ q.explanation }}
                        </AlertDescription>
                      </Alert>
                    </template>
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
