<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!--
      SLOT: material
      ------------------------------------------------------------------------
      This section provides the core learning content. It breaks down the
      complex topic of Present Perfect vs. Simple Past into digestible,
      concept-driven segments, inspired by Raymond Murphy's clear,
      contextual approach.
    -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. The Core Distinction: Connection to the Present</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <p>The fundamental difference between the Present Perfect (<span class="font-semibold text-primary">I have done</span>) and the Simple Past (<span class="font-semibold text-primary">I did</span>) lies in a concept we call "connection to the present."</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-lg border bg-card p-4">
              <h4 class="font-semibold">Present Perfect (have/has + past participle)</h4>
              <p class="text-muted-foreground">Used for actions where the time is <span class="font-bold">not specific</span> or the action has a <span class="font-bold">result or relevance now</span>.</p>
              <ul class="mt-2 list-inside list-disc space-y-1">
                <li><span class="font-mono text-primary">I've lost my passport.</span> (Result: I can't find it now.)</li>
                <li><span class="font-mono text-primary">She has written three emails.</span> (Result: The emails are ready now.)</li>
                <li><span class="font-mono text-primary">Have you ever been to Canada?</span> (Experience: In your life up until now.)</li>
              </ul>
            </div>
            <div class="rounded-lg border bg-card p-4">
              <h4 class="font-semibold">Simple Past</h4>
              <p class="text-muted-foreground">Used for actions that are <span class="font-bold">completely finished</span> and occurred at a <span class="font-bold">specific, stated or implied time</span> in the past.</p>
              <ul class="mt-2 list-inside list-disc space-y-1">
                <li><span class="font-mono text-primary">I lost my passport last week.</span> (Finished event at a specific time.)</li>
                <li><span class="font-mono text-primary">She wrote three emails this morning.</span> (Finished period: "this morning" is over if said in the afternoon.)</li>
                <li><span class="font-mono text-primary">Did you go to Canada in 2019?</span> (Specific past event.)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>B. Time Expressions: The Ultimate Clue</CardTitle>
          <CardDescription>Pay close attention to time words. They often dictate which tense you must use.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-semibold">Typically with Present Perfect:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge variant="secondary">just</Badge>
                <Badge variant="secondary">already</Badge>
                <Badge variant="secondary">yet</Badge>
                <Badge variant="secondary">ever / never</Badge>
                <Badge variant="secondary">recently</Badge>
                <Badge variant="secondary">so far</Badge>
                <Badge variant="secondary">in the last few days</Badge>
                <Badge variant="secondary">since</Badge>
                <Badge variant="secondary">for</Badge>
              </div>
            </div>
            <div>
              <h4 class="mb-2 font-semibold">Typically with Simple Past:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge>yesterday</Badge>
                <Badge>last week/month/year</Badge>
                <Badge>in 1999 / on Monday</Badge>
                <Badge>five minutes ago</Badge>
                <Badge>when I was a child</Badge>
                <Badge>then</Badge>
                <Badge>for (with a finished period)</Badge>
              </div>
            </div>
          </div>
          <Alert variant="destructive" class="mt-4">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Critical Rule</AlertTitle>
            <AlertDescription>
              Never use the Present Perfect with a finished time expression.
              <br>
              <span class="line-through">I have seen the movie yesterday.</span> (Incorrect)
              <br>
              <span class="text-green-600 dark:text-green-400">I saw the movie yesterday.</span> (Correct)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>C. Famous Figures: A Special Case</CardTitle>
          <CardDescription>The tense changes depending on whether the person is alive or not.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <p><span class="font-semibold">Living Person (Life isn't finished):</span> Use Present Perfect for life accomplishments.</p>
          <p class="font-mono text-primary">J.K. Rowling <span class="font-bold">has written</span> many successful books.</p>
          <p><span class="font-semibold">Deceased Person (Life is finished):</span> Use Simple Past for life accomplishments.</p>
          <p class="font-mono text-primary">William Shakespeare <span class="font-bold">wrote</span> many famous plays.</p>
        </CardContent>
      </Card>
    </template>

    <!--
      SLOT: practice
      ------------------------------------------------------------------------
      This section contains the interactive quiz. Questions are designed to be
      tricky, requiring a deep understanding of context, not just keyword
      spotting.
    -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best verb form to complete the sentence or dialogue. Think carefully about the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium">
              {{ index + 1 }}. {{ question.text }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                <Label :for="`${question.id}-${option.value}`" class="font-mono">{{ option.label }}</Label>
              </div>
            </RadioGroup>
            
            <Transition name="fade">
              <div v-if="isSubmitted">
                <Alert :variant="question.isCorrect ? 'default' : 'destructive'" class="mt-2">
                  <component :is="question.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                  <AlertTitle>{{ question.isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
                  <AlertDescription class="prose prose-sm dark:prose-invert">
                    <p v-html="question.explanation"></p>
                  </AlertDescription>
                </Alert>
              </div>
            </Transition>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
            <Button v-if="isSubmitted" variant="secondary" @click="resetQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button @click="checkAnswers" :disabled="isSubmitted">
              <GraduationCap class="mr-2 h-4 w-4" />
              Check Answers
            </Button>
        </CardFooter>
      </Card>
    </template>

    <!--
      SLOT: result
      ------------------------------------------------------------------------
      This section appears after submission, providing an overall score and
      performance summary. It uses a progress bar for a quick visual cue.
    -->
    <template #result>
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>You correctly answered {{ score }} out of {{ totalQuestions }} questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-4">
              <span class="text-2xl font-bold">{{ Math.round((score / totalQuestions) * 100) }}%</span>
              <Progress :model-value="(score / totalQuestions) * 100" class="flex-1" />
            </div>
            <p class="mt-2 text-sm text-muted-foreground">Review the explanations above for any questions you missed. Repetition and understanding context are key to mastery.</p>
          </CardContent>
        </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle2, XCircle, GraduationCap, RefreshCw } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const router = useRouter()

const pageDetails = {
  testTitle: "English Grammar In Use Practice",
  testDescription: "Based on the units by Raymond Murphy",
  unitTitle: "Unit 6: Present perfect and past 1",
  unitDescription: "Comparing 'I have done' and 'I did'. Focus on the connection between past actions and their present relevance.",
  categories: ['Tense', 'Present Perfect', 'Simple Past', 'Intermediate'],
}

const questions = ref([
  {
    id: 'q1',
    text: 'A: "Are you hungry?" B: "No, I ___ lunch."',
    options: [
      { label: 'just had', value: 'just had' },
      { label: 'have just had', value: 'have just had' },
    ],
    correctAnswer: 'have just had',
    userAnswer: null,
    explanation: `The action ('having lunch') is very recent and has a direct result in the present (I am not hungry 'now'). This strong connection to the present calls for the <strong>Present Perfect</strong>. 'Just' is a classic indicator for this tense.`,
  },
  {
    id: 'q2',
    text: 'Leonardo da Vinci ___ many masterpieces, including the Mona Lisa.',
    options: [
      { label: 'has painted', value: 'has painted' },
      { label: 'painted', value: 'painted' },
    ],
    correctAnswer: 'painted',
    userAnswer: null,
    explanation: `Leonardo da Vinci is no longer alive. His life and work are finished. Therefore, we must use the <strong>Simple Past</strong> to talk about his completed actions. If he were a living artist, 'has painted' would be correct to describe his life's work up to the present.`,
  },
  {
    id: 'q3',
    text: 'I can\'t find my keys. I think I ___ them.',
    options: [
      { label: 'lost', value: 'lost' },
      { label: 'have lost', value: 'have lost' },
    ],
    correctAnswer: 'have lost',
    userAnswer: null,
    explanation: `The first sentence, "I can't find my keys," establishes a present problem. The reason for this problem is the action of losing them. Because the past action has a clear result in the present, the <strong>Present Perfect</strong> is required.`,
  },
  {
    id: 'q4',
    text: '___ to the new café on Main Street yet? I heard it\'s great.',
    options: [
      { label: 'Have you been', value: 'Have you been' },
      { label: 'Did you go', value: 'Did you go' },
    ],
    correctAnswer: 'Have you been',
    userAnswer: null,
    explanation: `The word 'yet' signals that we are asking about an experience within a time period that continues up to now. We are asking about any time in the person's life up to this moment. This requires the <strong>Present Perfect</strong>. 'Did you go' would need a specific past time frame, like '...yesterday?'`,
  },
  {
    id: 'q5',
    text: 'My parents ___ in this house since 1995, and they have no plans to move.',
    options: [
      { label: 'lived', value: 'lived' },
      { label: 'have lived', value: 'have lived' },
    ],
    correctAnswer: 'have lived',
    userAnswer: null,
    explanation: `The word 'since' indicates an action that started in the past and continues to the present. The phrase "they have no plans to move" confirms this ongoing situation. For actions that bridge the past and present, we must use the <strong>Present Perfect</strong>.`,
  },
  {
    id: 'q6',
    text: 'I ___ to my boss about the issue yesterday, and she said she would handle it.',
    options: [
      { label: 'spoke', value: 'spoke' },
      { label: 'have spoken', value: 'have spoken' },
    ],
    correctAnswer: 'spoke',
    userAnswer: null,
    explanation: `The time expression 'yesterday' specifies a completed, finished time in the past. When a specific past time is mentioned, you must use the <strong>Simple Past</strong>. Using Present Perfect with 'yesterday' is a common but significant grammatical error.`,
  },
].map(q => reactive({ ...q, isCorrect: computed(() => q.userAnswer === q.correctAnswer) })))

const isSubmitted = ref(false)

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

function checkAnswers() {
  // Simple validation to ensure all questions are answered
  const allAnswered = questions.value.every(q => q.userAnswer !== null)
  if (!allAnswered) {
    // In a real app, you might show a toast or alert here.
    alert("Please answer all questions before submitting.")
    return
  }
  isSubmitted.value = true
}

function resetQuiz() {
  questions.value.forEach(q => {
    q.userAnswer = null
  })
  isSubmitted.value = false
}

function goToPreviousUnit() {
  router.push("/units/grammar/5")
}

function goToNextUnit() {
  router.push("/units/grammar/7")
}
</script>

<style>
/* Smooth transition for result and explanation visibility */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
