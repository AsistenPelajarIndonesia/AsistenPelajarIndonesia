<!--
  File: @/pages/units/grammar/0.vue
  Description: An advanced grammar practice page for "Should 2", focusing on past regrets,
  criticism, and opinions, inspired by Raymond Murphy's "English Grammar in Use".
  This page utilizes the GrammarLayout and provides a challenging, interactive learning experience.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Components ---
// These are assumed to be in @/components/ui and are used for a rich presentation.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, HelpingHand, Target } from 'lucide-vue-next'

definePageMeta({
  // This ensures the custom layout is applied to this page.
  layout: false, 
})

// --- Component State & Data ---

const unitNumber = 0
const router = useRouter()

// Reactive state for tracking exercise progress and results
const showResult = ref(false)
const userAnswers = ref<string[]>(['', '', '', '', '', ''])

// The core data for the practice questions. Each object represents a question.
// Answers can be an array to allow for multiple correct variations (e.g., contractions).
const questions = ref([
  {
    type: 'fill-in-the-blank',
    situation: "You were waiting for your friend, but he was very late. You were annoyed.",
    prompt: "You say to him: You're so late! You _______________ (be) here an hour ago.",
    verb: 'be',
    answers: ['should have been'],
    explanation: "We use 'should have + past participle' (been) to criticize a past action that didn't happen as desired. Your friend was not here, but it was the right thing for him to be."
  },
  {
    type: 'fill-in-the-blank',
    situation: "A colleague bought a very expensive phone and now has no money for rent.",
    prompt: "You think it was a bad idea. You think: He _______________ (buy) that phone.",
    verb: 'buy',
    answers: ["should not have bought", "shouldn't have bought"],
    explanation: "Use the negative form 'should not have + past participle' (bought) to express that a past action was a bad idea or a mistake."
  },
  {
    type: 'situation-response',
    situation: "You feel sick. You ate a whole pizza by yourself last night.",
    prompt: "What do you say to yourself reflecting on your past action?",
    prefix: "I ",
    answers: ["should not have eaten that whole pizza", "shouldn't have eaten that whole pizza"],
    explanation: "This is a classic example of expressing personal regret. 'Shouldn't have eaten' signifies that you now realize your past action was a mistake."
  },
  {
    type: 'opinion-formulation',
    situation: "Your friend is asking for your opinion on a new government policy you disagree with.",
    prompt: "Complete the sentence to express your critical opinion: 'To be honest, I think the government _______________ (reconsider) this policy before implementing it.'",
    verb: 'reconsider',
    answers: ['should have reconsidered'],
    explanation: "When expressing an opinion about a past decision, 'I think... should have + past participle' is a common and effective structure. It's softer than a direct accusation."
  },
  {
    type: 'contrast',
    situation: "Laura needs a change. She's been in the same job for 10 years and seems bored.",
    prompt: "What is your advice for her future? 'She _______________ (look) for a new job.'",
    verb: 'look',
    answers: ['should look'],
    explanation: "This question tests the contrast. Since the advice is for the present or future, we use the simple form 'should + base verb' (look). 'Should have looked' would imply she missed an opportunity in the past."
  },
  {
    type: 'fill-in-the-blank',
    situation: "The package was supposed to arrive yesterday, but it didn't.",
    prompt: "What was the expectation? The package _______________ (arrive) yesterday.",
    verb: 'arrive',
    answers: ['should have arrived'],
    explanation: "Here, 'should have arrived' is used to talk about a past expectation that was not met. It expresses that the expected outcome did not occur."
  }
])

// --- Computed Properties for Dynamic UI ---

// This structure holds the detailed results after the user submits their answers.
const validationResults = computed(() => {
  if (!showResult.value) return []
  return questions.value.map((q, index) => {
    const userAnswer = userAnswers.value[index].trim().toLowerCase()
    const correctAnswers = q.answers.map(a => a.toLowerCase())
    const isCorrect = correctAnswers.includes(userAnswer)
    return {
      ...q,
      userAnswer: userAnswers.value[index], // Keep original casing for display
      isCorrect,
    }
  })
})

// Calculates the final score based on the validation results.
const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

// --- Methods & Event Handlers ---

// The core logic for checking answers and revealing the results.
function checkAnswers() {
  showResult.value = true
  // Scroll to results for better user experience
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function retry() {
  showResult.value = false
  userAnswers.value.fill('')
  // Scroll back to the top of the practice section
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

// Navigation functions to be emitted to the layout.
function goToPreviousUnit() {
  // For unit 0, 'back' could go to a main index page.
  router.push(`/units/grammar`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${unitNumber + 1}`)
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on Raymond Murphy's renowned series."
    :unit-title="`Unit ${unitNumber}: Should 2`"
    unit-description="Mastering 'should have done' for past regrets, criticism, and unfulfilled expectations."
    :categories="['Modals', 'Past Tense', 'Opinion', 'Regret']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- This slot provides the core learning content.                           -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><HelpingHand class="text-blue-500" /> Core Concept: Past Regret & Criticism</CardTitle>
          <CardDescription>The primary use of this structure is to talk about the past. We imagine a different past, where something that was a good idea happened, or something that was a bad idea did not.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">Structure: <code class="bg-muted px-2 py-1 rounded">should / shouldn't + have + past participle</code></p>
          <div class="rounded-md border p-4">
            <h4 class="font-bold">Criticism (of others):</h4>
            <p class="text-muted-foreground">You were driving too fast. You <strong class="text-red-600">should have driven</strong> more slowly.</p>
            <p class="mt-2 text-muted-foreground">He failed the exam. He <strong class="text-green-600">should have studied</strong> harder.</p>
          </div>
          <div class="rounded-md border p-4">
            <h4 class="font-bold">Regret (about yourself):</h4>
            <p class="text-muted-foreground">I feel sick now. I <strong class="text-red-600">shouldn't have eaten</strong> so much cake.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Target class="text-purple-500" /> Key Contrast: Present vs. Past</CardTitle>
          <CardDescription>It is crucial not to confuse advice for the present/future with criticism about the past.</CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-md bg-green-50 border border-green-200 p-4">
            <h4 class="font-bold text-green-800">Present/Future Advice</h4>
            <p class="text-sm text-green-700">Structure: <code class="bg-green-100">should + base verb</code></p>
            <hr class="my-2">
            <p class="text-green-900">You look tired. You <strong class="text-green-600">should go</strong> to bed.</p>
          </div>
          <div class="rounded-md bg-orange-50 border border-orange-200 p-4">
            <h4 class="font-bold text-orange-800">Past Criticism/Regret</h4>
            <p class="text-sm text-orange-700">Structure: <code class="bg-orange-100">should have + past participle</code></p>
            <hr class="my-2">
            <p class="text-orange-900">You overslept this morning. You <strong class="text-orange-600">should have gone</strong> to bed earlier last night.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- This slot contains the interactive questions.                           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Use the verb in brackets. Pay close attention to whether the situation is in the present or the past.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="index" class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">
              <span class="font-bold">Situation {{ index + 1 }}:</span> {{ question.situation }}
            </p>
            <label :for="`q${index}`" class="font-semibold">{{ question.prompt }}</label>
            <div class="flex items-center gap-2">
              <span v-if="question.prefix" class="text-muted-foreground">{{ question.prefix }}</span>
              <Input
                :id="`q${index}`"
                v-model="userAnswers[index]"
                type="text"
                :placeholder="question.type === 'fill-in-the-blank' || question.type === 'contrast' ? `should... (${question.verb})` : 'Type your full response...'"
                class="flex-grow"
                :disabled="showResult"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full" @click="checkAnswers">Check My Answers</Button>
          <Button v-else class="w-full" variant="secondary" @click="retry">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- This slot displays the validation results. It's conditionally rendered. -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>You scored {{ score }} out of {{ totalQuestions }}. Review the detailed explanations below to improve.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress :model-value="(score / totalQuestions) * 100" class="w-full" />
            <div class="mt-6 space-y-4">
              <Alert
                v-for="(result, index) in validationResults"
                :key="`result-${index}`"
                :variant="result.isCorrect ? 'default' : 'destructive'"
                class="!border-l-4"
                :class="{ 'border-green-500': result.isCorrect, 'border-red-500': !result.isCorrect }"
              >
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                <AlertTitle class="font-bold text-base">Question {{ index + 1 }} - {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
                <AlertDescription class="space-y-3 mt-2">
                  <p><strong class="text-foreground">Your answer:</strong> <span :class="{'text-red-600': !result.isCorrect, 'text-green-600': result.isCorrect}">{{ result.userAnswer || ' (No answer given)' }}</span></p>
                  <div>
                    <strong class="text-foreground">Correct answer(s):</strong>
                    <ul class="list-disc list-inside">
                      <li v-for="ans in result.answers" :key="ans" class="text-green-600 font-mono">{{ ans }}</li>
                    </ul>
                  </div>
                  <div v-if="!result.isCorrect" class="p-3 bg-muted/50 rounded-md border">
                    <p class="font-semibold">💡 Explanation:</p>
                    <p class="text-muted-foreground">{{ result.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
