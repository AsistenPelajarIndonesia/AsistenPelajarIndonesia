<!--
  File: @/pages/units/grammar/2.vue
  Unit: 2
  Topic: Would - Mastering Hypotheticals, Past Habits, and Politeness
  Description: An advanced grammar practice page focusing on the complex and varied uses of the modal verb 'would'.
  This unit is inspired by the clear, contextual approach of Raymond Murphy's "English Grammar in Use,"
  enhanced with challenging questions and detailed explanations that target common learner pitfalls.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Components ---
// Assuming these are globally available or auto-imported via Nuxt
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page & State Management ---

const router = useRouter()

// Reactive state for the entire quiz
const isSubmitted = ref(false)
const showResult = ref(false)

// Data structure for questions. Each question is an object containing
// all necessary information for rendering, interaction, and validation.
const questions = ref([
  {
    id: 'q1',
    type: 'mcq',
    text: "When we were children, our grandmother's house was our favorite place. She _______ always bake cookies for us, and my grandfather _______ a magnificent garden with the rarest flowers.",
    options: [
      { id: 'q1a', text: 'would / had', isCorrect: true },
      { id: 'q1b', text: 'would / would have', isCorrect: false },
      { id: 'q1c', text: 'used to / would have', isCorrect: false },
      { id: 'q1d', text: 'was used to / had', isCorrect: false },
    ],
    userAnswer: '',
    explanation: "The correct answer is 'would / had'. 'Would' is used here to describe a repeated past action (baking cookies). However, for the garden, we are describing a past state (he possessed a garden), not a repeated action. For past states, we must use the simple past ('had') or 'used to have', but not 'would'. This is a critical distinction between 'would' and 'used to' for past habits."
  },
  {
    id: 'q2',
    type: 'correction',
    text: "If I would have known about the traffic, I would have left an hour earlier to avoid being late.",
    correctAnswer: "If I had known",
    userAnswer: '',
    explanation: "The error is in the 'if' clause. In a third conditional sentence (discussing an unreal past situation), the 'if' clause uses the past perfect tense ('if I had known'), not 'would have'. 'Would have' belongs in the main clause, which is correctly used here ('I would have left'). This is one of the most common mistakes students make with conditionals."
  },
  {
    id: 'q3',
    type: 'mcq',
    text: "The engine made a strange noise and then stopped. I tried everything, but the car simply _______ start.",
    options: [
      { id: 'q3a', text: 'couldn\'t', isCorrect: false },
      { id: 'q3b', text: 'shouldn\'t', isCorrect: false },
      { id: 'q3c', text: 'wouldn\'t', isCorrect: true },
      { id: 'q3d', text: 'might not', isCorrect: false },
    ],
    userAnswer: '',
    explanation: "'Wouldn't' is the best choice here. It is used to express refusal or a lack of willingness, often from an inanimate object, giving it a sense of obstinance. 'The car refused to start.' While 'couldn't' is grammatically possible (implying a lack of ability), 'wouldn't' more strongly conveys the sense of frustration and the car's 'refusal' to operate, which is a key idiomatic use of 'would'."
  },
  {
    id: 'q4',
    type: 'fill-in',
    text: "He promised me last Tuesday that he _______ (call) me the following day, but I never heard from him.",
    correctAnswer: "would call",
    userAnswer: '',
    explanation: "This sentence requires 'would call' because it's an example of 'future in the past'. The action of calling was in the future from the perspective of last Tuesday (when the promise was made). We use 'would' + base verb to describe a future event from a past point in time, especially in reported speech."
  },
  {
    id: 'q5',
    type: 'mcq',
    text: "You are in a very formal client meeting. How would you ask for a glass of water most appropriately?",
    options: [
      { id: 'q5a', text: 'Can I have a glass of water?', isCorrect: false },
      { id: 'q5b', text: 'I would like a glass of water, please.', isCorrect: true },
      { id: 'q5c', text: 'I want a glass of water.', isCorrect: false },
      { id: 'q5d', text: 'Give me a glass of water.', isCorrect: false },
    ],
    userAnswer: '',
    explanation: "'I would like...' is the most polite and formal way to express a desire or make a request in this context. 'Can I have...' is more informal. 'I want...' is direct and can sound demanding or even rude in a formal setting. 'Give me...' is an imperative and is highly inappropriate."
  },
])

// --- Computed Properties for Results ---

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    let isAnswerCorrect = false;
    if (question.type === 'mcq') {
      const selectedOption = question.options.find(o => o.id === question.userAnswer);
      isAnswerCorrect = selectedOption?.isCorrect || false;
    } else if (question.type === 'fill-in' || question.type === 'correction') {
      isAnswerCorrect = question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    }
    return correctCount + (isAnswerCorrect ? 1 : 0);
  }, 0)
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round((score.value / totalQuestions.value) * 100);
})

const resultTitle = computed(() => {
  if (scorePercentage.value >= 90) return "Excellent Mastery!";
  if (scorePercentage.value >= 70) return "Very Good Understanding!";
  if (scorePercentage.value >= 50) return "Good Effort, More Practice Needed.";
  return "Let's Review This Unit Again.";
})

const resultDescription = computed(() => {
  return `You answered ${score.value} out of ${totalQuestions.value} questions correctly. Carefully review the explanations for each question to solidify your understanding.`
})

// --- Event Handlers ---

function handleSubmit() {
  isSubmitted.value = true
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function isCorrect(question: any): boolean {
  if (!isSubmitted.value) return false;
  if (question.type === 'mcq') {
    const selectedOption = question.options.find(o => o.id === question.userAnswer);
    return selectedOption?.isCorrect || false;
  }
  return question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
}

function isIncorrect(question: any): boolean {
  if (!isSubmitted.value || !question.userAnswer) return false;
  return !isCorrect(question);
}

// --- Navigation ---

function goToPreviousUnit() {
  // We are at unit 2, so the previous unit is 1.
  router.push("/units/grammar/1")
}

function goToNextUnit() {
  // We are at unit 2, so the next unit is 3.
  router.push("/units/grammar/3")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="Nuanced exercises designed to perfect your understanding of complex grammar points."
    unit-title="Unit 2: Would"
    unit-description="Exploring the multifaceted modal 'would' for past habits, conditionals, politeness, and future-in-the-past contexts."
    :categories="['Modal Verbs', 'Conditionals', 'Past Tenses', 'Politeness']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- This section provides the core learning content, like a textbook page.  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. Hypothetical & Conditional 'Would'</CardTitle>
          <CardDescription>For unreal situations in the present or past.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <p><span class="font-semibold text-primary">Second Conditional (Unreal Present/Future):</span> Used in the main clause. <br> <em class="text-muted-foreground">Example: If I had more time, I <strong class="text-foreground">would</strong> learn another language.</em></p>
          <p><span class="font-semibold text-primary">Third Conditional (Unreal Past):</span> Used in the main clause. <br> <em class="text-muted-foreground">Example: If she had asked me, I <strong class="text-foreground">would have helped</strong> her.</em></p>
          <Alert variant="destructive">
            <HelpCircle class="h-4 w-4" />
            <AlertTitle>Common Error!</AlertTitle>
            <AlertDescription>
              Never use 'would' in the 'if' clause of a conditional sentence. <br> Incorrect: <del>If I would have time...</del>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>B. Past Habit 'Would' vs. 'Used To'</CardTitle>
          <CardDescription>Describing repeated actions in the past.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <p><span class="font-semibold text-primary">'Would' for Actions:</span> Refers to typical, repeated past actions. <br> <em class="text-muted-foreground">Example: Every winter, my family <strong class="text-foreground">would</strong> go skiing in the mountains.</em></p>
          <p><span class="font-semibold text-primary">Key Distinction:</span> 'Would' cannot be used for past <strong class="text-foreground">states</strong> (unchanging situations). You must use 'used to' or the simple past for states. <br> <em class="text-muted-foreground">Correct: I <strong class="text-foreground">used to live</strong> in Paris. (A state)</em><br><em class="text-muted-foreground">Incorrect: <del>I would live in Paris.</del></em></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>C. The 'Polite' & 'Other' Uses of Would</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <p><strong class="text-primary">Requests/Offers:</strong> <em class="text-muted-foreground">"<strong class="text-foreground">Would</strong> you mind closing the door?" / "<strong class="text-foreground">Would</strong> you like some tea?"</em></p>
          <p><strong class="text-primary">Future in the Past:</strong> <em class="text-muted-foreground">She said she <strong class="text-foreground">would</strong> meet us at the station. (Future from her past perspective)</em></p>
          <p><strong class="text-primary">Refusal (often inanimate):</strong> <em class="text-muted-foreground">I pushed the button, but the elevator <strong class="text-foreground">wouldn't</strong> move.</em></p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- This section contains the interactive questions.                        -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Answer all questions, then check your results at the bottom.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>

            <!-- Multiple Choice Question Type -->
            <template v-if="question.type === 'mcq'">
              <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                <div v-for="option in question.options" :key="option.id" class="flex items-center space-x-2">
                  <RadioGroupItem :id="option.id" :value="option.id" />
                  <Label :for="option.id">{{ option.text }}</Label>
                </div>
              </RadioGroup>
            </template>

            <!-- Fill in the Blanks Question Type -->
            <template v-if="question.type === 'fill-in'">
              <Input
                v-model="question.userAnswer"
                placeholder="Type your answer here..."
                :disabled="isSubmitted"
                class="max-w-sm"
                @keyup.enter="handleSubmit"
              />
            </template>

            <!-- Sentence Correction Question Type -->
            <template v-if="question.type === 'correction'">
              <p class="text-sm text-muted-foreground italic">Identify and type the corrected part of the sentence.</p>
              <Input
                v-model="question.userAnswer"
                placeholder="Type the correction..."
                :disabled="isSubmitted"
                class="max-w-sm"
                @keyup.enter="handleSubmit"
              />
            </template>
            
            <!-- Dynamic Feedback Area -->
            <Transition name="fade" mode="out-in">
              <div v-if="isSubmitted" class="mt-2">
                <Alert v-if="isCorrect(question)" variant="default" class="border-green-500 bg-green-50 text-green-800">
                  <CheckCircle2 class="h-4 w-4 text-green-600" />
                  <AlertTitle>Correct!</AlertTitle>
                  <AlertDescription class="text-green-700">{{ question.explanation }}</AlertDescription>
                </Alert>
                <Alert v-else-if="isIncorrect(question)" variant="destructive">
                  <XCircle class="h-4 w-4" />
                  <AlertTitle>Incorrect</AlertTitle>
                  <AlertDescription>{{ question.explanation }}</AlertDescription>
                </Alert>
              </div>
            </Transition>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" @click="handleSubmit">
            Check Answers & See Results
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- This section appears after submission to show the final score.          -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-primary/50">
        <CardHeader>
          <CardTitle class="text-2xl">{{ resultTitle }}</CardTitle>
          <CardDescription>{{ resultDescription }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-center rounded-lg bg-muted p-6">
            <p class="text-6xl font-bold text-primary">{{ scorePercentage }}<span class="text-2xl text-muted-foreground">%</span></p>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
