<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced grammar exercises based on the book by Raymond Murphy."
    unit-title="Unit 20: Could (do) and could have (done)"
    unit-description="Mastering the distinction between past general ability, present/future possibility, and unfulfilled past possibilities or criticisms."
    :categories="['Modals', 'Past Tense', 'Conditionals', 'Possibility']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: In-depth Explanations                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>1. 'Could' for Possibility (Present & Future)</CardTitle>
          <CardDescription>
            We use 'could' to suggest a possible action now or in the future. It is a less direct, more hypothetical alternative to 'can'.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Dialogue Example</p>
            <p>A: "What should we do this evening?"</p>
            <p>B: "We <span class="font-bold text-primary">could go</span> to the cinema. The new sci-fi movie is out."</p>
          </div>
          <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Hypothetical Situation</p>
            <p>"If we had more money, we <span class="font-bold text-primary">could buy</span> a new car."</p>
          </div>
        </CardContent>
      </Card>

      <Card class="border-amber-500/50">
        <CardHeader>
          <CardTitle>2. 'Could' for General Ability in the Past</CardTitle>
          <CardDescription>
            'Could' describes a general skill or ability someone possessed in the past. It does not imply a single, successful action.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Example of a general skill</p>
            <p>"When I was younger, I <span class="font-bold text-amber-600">could run</span> for miles without getting tired."</p>
          </div>
           <div class="p-4 border-l-4 border-red-500 bg-red-50 text-red-800">
            <h4 class="font-bold">Crucial Distinction: 'could' vs. 'was/were able to'</h4>
            <p class="mt-2">
              For a <span class="font-semibold">specific successful action</span> in the past, we use <span class="font-bold">'was/were able to'</span> or <span class="font-bold">'managed to'</span>, not 'could'.
            </p>
            <p class="mt-2 font-mono text-sm">
              <span class="text-green-600">Correct:</span> "The fire spread through the building, but everyone <span class="font-bold">was able to escape</span>."
              <br>
              <span class="text-red-600">Incorrect:</span> "...everyone <s class="font-normal">could escape</s>." (This would imply they generally had the ability, not that they actually did it in that specific situation).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. 'Could have (done)' for Past Possibilities</CardTitle>
          <CardDescription>
            This form discusses possibilities in the past that <span class="font-semibold">did not happen</span>. It's often used for unchosen alternatives, regrets, or criticisms.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
           <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Unchosen Alternative</p>
            <p>"Why did you stay at a hotel? You <span class="font-bold text-primary">could have stayed</span> with me."</p>
          </div>
          <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Criticism or Regret</p>
            <p>"You were driving too fast. You <span class="font-bold text-primary">could have caused</span> a serious accident."</p>
          </div>
          <div class="font-mono text-sm">
            <p class="text-muted-foreground">// Expressing inability (negative)</p>
            <p>"The trip was amazing. It <span class="font-bold text-primary">couldn't have been</span> better."</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Challenging Questions                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete the sentence. Pay close attention to the context.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="checkAnswers">
            <div class="grid gap-8">
              <!-- Question Loop -->
              <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
                <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
                <RadioGroup v-model="userAnswers[q.id]" :disabled="isSubmitted">
                  <div v-for="option in q.options" :key="option.value" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${q.id}-${option.value}`" :value="option.value" />
                    <Label :for="`${q.id}-${option.value}`">{{ option.text }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <!-- Submission Button -->
              <div class="flex justify-end">
                <Button v-if="!isSubmitted" type="submit">Check Answers</Button>
                <Button v-else type="button" variant="outline" @click="reset">Try Again</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: The Awesome Validator                                     -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="bg-blue-50/50 border-blue-200">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <div class="flex-1">
              <p class="text-muted-foreground">Score: <span class="font-bold text-lg text-primary">{{ score }} / {{ questions.length }}</span></p>
              <Progress :model-value="scorePercentage" class="mt-2" />
            </div>
            <div class="text-center">
                <p v-if="scorePercentage === 100" class="text-2xl">🎉</p>
                <p v-else-if="scorePercentage >= 75" class="text-2xl">👍</p>
                <p v-else-if="scorePercentage >= 50" class="text-2xl">🤔</p>
                <p v-else class="text-2xl">📚</p>
                <p class="text-xs text-muted-foreground">{{ resultMessage }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div v-for="q in questions" :key="q.id" class="p-4 rounded-lg" :class="isCorrect(q.id) ? 'bg-green-100/50 border-l-4 border-green-500' : 'bg-red-100/50 border-l-4 border-red-500'">
            <p class="font-semibold">{{ q.question }}</p>
            <p class="mt-2 text-sm">Your answer: <span class="font-bold" :class="isCorrect(q.id) ? 'text-green-700' : 'text-red-700'">{{ getUserAnswerText(q.id) }}</span></p>
            
            <div v-if="!isCorrect(q.id)" class="mt-1 text-sm">
                Correct answer: <span class="font-bold text-green-700">{{ getCorrectAnswerText(q.id) }}</span>
            </div>

            <div class="mt-4 p-3 bg-background/70 rounded-md">
                <h4 class="font-bold text-sm text-foreground/80">Explanation:</h4>
                <p class="mt-1 text-sm text-muted-foreground">{{ q.explanation }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// --- Component Imports (assuming they are auto-imported or globally registered) ---
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// --- Page-specific types for clarity ---
interface QuestionOption {
  value: string
  text: string
}

interface Question {
  id: number
  question: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/19")
}
function goToNextUnit() {
  router.push("/units/grammar/21")
}

// --- State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<number, string>>({})

const questions = ref<Question[]>([
  {
    id: 1,
    question: "The concert hall was packed, and the doors were jammed. It was chaotic, but after a few minutes of pushing, we _______ get inside.",
    options: [
      { value: 'could', text: 'could' },
      { value: 'could have', text: 'could have' },
      { value: 'were able to', text: 'were able to' },
    ],
    correctAnswer: 'were able to',
    explanation: "We use 'were able to' (not 'could') for a specific successful action or achievement in the past. 'Could' is for general past ability. Here, the context describes a single, difficult, but successful event.",
  },
  {
    id: 2,
    question: "I'm so frustrated. I _______ passed the exam if I had studied just one more day. I was so close!",
    options: [
      { value: 'could', text: 'could' },
      { value: 'could have', text: 'could have' },
      { value: 'was able to', text: 'was able to' },
    ],
    correctAnswer: 'could have',
    explanation: "'Could have passed' expresses a past possibility that did not happen, often with a sense of regret. The person did not pass, but it was a possibility.",
  },
  {
    id: 3,
    question: "My grandfather was a brilliant linguist; he _______ speak five languages fluently before he was thirty.",
    options: [
      { value: 'could', text: 'could' },
      { value: 'could have', text: 'could have' },
      { value: 'was able to', text: 'was able to' },
    ],
    correctAnswer: 'could',
    explanation: "This sentence describes a general ability or skill the grandfather possessed over a long period in the past. 'Could' is the correct choice for general past abilities.",
  },
  {
    id: 4,
    question: "You _______ told me you were going to be late! I waited for an hour in the rain.",
    options: [
      { value: 'could', text: 'could' },
      { value: 'could have', text: 'could have' },
      { value: 'couldn\'t have', text: 'couldn\'t have' },
    ],
    correctAnswer: 'could have',
    explanation: "'Could have told' is used here as a criticism. It points out a past action that was possible and desirable but was not done. The speaker is annoyed that the other person didn't inform them.",
  },
  {
    id: 5,
    question: "A: 'The project failed badly.' B: 'I'm not surprised. With that budget, it _______ succeeded. It was impossible from the start.'",
    options: [
      { value: 'could', text: 'could' },
      { value: 'couldn\'t', text: 'couldn\'t' },
      { value: 'couldn\'t have', text: 'couldn\'t have' },
    ],
    correctAnswer: 'couldn\'t have',
    explanation: "'Couldn't have succeeded' expresses that success was an impossibility in the past, even hypothetically. It's the negative form for a past unrealized possibility.",
  },
   {
    id: 6,
    question: "A: 'I'm not sure what to get Sarah for her birthday.' B: 'Well, you _______ get her a voucher for that bookshop she loves.'",
    options: [
      { value: 'could', text: 'could' },
      { value: 'could have', text: 'could have' },
      { value: 'were able to', text: 'were able to' },
    ],
    correctAnswer: 'could',
    explanation: "'Could' is used here to make a suggestion about a present or future action. It's a less direct and more polite alternative to 'you can get her...'.",
  },
])

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const resultMessage = computed(() => {
    if(scorePercentage.value === 100) return "Perfect Score!"
    if(scorePercentage.value >= 75) return "Excellent Job!"
    if(scorePercentage.value >= 50) return "Good Effort!"
    return "Review the material and try again."
})

// --- Methods ---
function checkAnswers() {
  // Ensure all questions are answered before submitting
  if (Object.keys(userAnswers.value).length !== questions.value.length) {
    alert('Please answer all questions before checking your results.')
    return
  }
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function reset() {
  userAnswers.value = {}
  isSubmitted.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function isCorrect(questionId: number): boolean {
    const question = questions.value.find(q => q.id === questionId)
    return !!question && userAnswers.value[questionId] === question.correctAnswer
}

function getUserAnswerText(questionId: number): string {
    const question = questions.value.find(q => q.id === questionId)
    const answerValue = userAnswers.value[questionId]
    if (!question || !answerValue) return "No answer"
    return question.options.find(opt => opt.value === answerValue)?.text || "N/A"
}

function getCorrectAnswerText(questionId: number): string {
    const question = questions.value.find(q => q.id === questionId)
    if (!question) return ""
    return question.options.find(opt => opt.value === question.correctAnswer)?.text || "N/A"
}
</script>

<style scoped>
/* A simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
