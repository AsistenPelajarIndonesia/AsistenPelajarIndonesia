<!--
  File: @/pages/units/grammar/17.vue
  Description: An advanced grammar practice page for Unit 17: Future Continuous vs. Future Perfect.
  This page integrates learning material, challenging exercises, and a detailed results
  validator to provide a comprehensive learning experience.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Component Imports (assuming a shadcn-vue setup)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, BookOpen, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Reactive State Management ---

const showResult = ref(false)

const questions = ref([
  {
    id: 1,
    type: 'fill-in-the-blank',
    prompt: "Don't phone the office at 5:30 PM. Everyone _______ (leave) by then.",
    verb: 'leave',
    userAnswer: '',
    correctAnswer: 'will have left',
    explanation: 'The phrase "by then" indicates a point in time by which an action will be completed. Therefore, the Future Perfect tense ("will have left") is required to show that the action of leaving will be finished before 5:30 PM.'
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    prompt: "This time next month, we _______ (relax) on a tropical beach while you're still stuck in meetings.",
    verb: 'relax',
    userAnswer: '',
    correctAnswer: 'will be relaxing',
    explanation: 'The phrase "This time next month" specifies an exact moment in the future. We use the Future Continuous ("will be relaxing") to describe an action that will be in progress at that particular future moment.'
  },
  {
    id: 3,
    type: 'contextual-choice',
    prompt: "A project manager is discussing a critical software update with her team. She wants to assure them that the deployment will be finished before the client's review at 9 AM tomorrow. What is the most precise and professional way for her to say this?",
    options: [
      "We will be deploying the update by 9 AM tomorrow.",
      "We will deploy the update at 9 AM tomorrow.",
      "We will have deployed the update by 9 AM tomorrow."
    ],
    userAnswer: '',
    correctAnswer: "We will have deployed the update by 9 AM tomorrow.",
    explanation: 'The Future Perfect ("will have deployed") is the most precise choice. It emphasizes that the action of deploying will be 100% complete *before* the 9 AM deadline. Option A ("will be deploying") incorrectly suggests the action will be in progress, and Option B ("will deploy") is less specific about completion relative to the deadline.'
  },
  {
    id: 4,
    type: 'fill-in-the-blank-dual',
    prompt: "By the end of this decade, artificial intelligence _______ (transform) our society completely. Even then, ethicists _______ still _______ (debate) its implications.",
    verbs: ['transform', 'debate'],
    userAnswer: ['', ''],
    correctAnswer: ['will have transformed', 'will still be debating'],
    explanation: 'This question tests your ability to switch between tenses. "By the end of this decade" requires the Future Perfect ("will have transformed") for the completed action. "Even then" refers to that future point in time, where the action of debating will be ongoing, thus requiring the Future Continuous ("will still be debating").'
  },
  {
    id: 5,
    type: 'sentence-correction',
    prompt: "Correct the grammatical error in the following sentence to reflect the intended meaning: 'When the inspector arrives, the chefs will cook all the meals for the evening.' (Intention: The cooking is already finished when he arrives).",
    userAnswer: '',
    correctAnswer: "When the inspector arrives, the chefs will have cooked all the meals for the evening.",
    explanation: 'The original sentence uses the simple future ("will cook"), which implies the cooking starts upon the inspector\'s arrival. The Future Continuous ("will be cooking") would mean it\'s in progress. To convey that the cooking is completed *before* his arrival, the Future Perfect ("will have cooked") is necessary.'
  },
  {
    id: 6,
    type: 'fill-in-the-blank',
    prompt: "I can't lend you the car on Saturday afternoon. I _______ (use) it to help my brother move.",
    verb: 'use',
    userAnswer: '',
    correctAnswer: 'will be using',
    explanation: 'The Future Continuous ("will be using") is used here to describe a pre-arranged plan or an action that will be occupying a period of time in the future. It explains why the car is unavailable during that period.'
  },
  {
    id: 7,
    type: 'contextual-choice',
    prompt: "A student is talking about her long-term academic goals. Which sentence correctly describes the state of having completed her PhD by the year 2030?",
    options: [
      "By 2030, I will be finishing my PhD.",
      "By 2030, I will have finished my PhD.",
      "By 2030, I will finish my PhD."
    ],
    userAnswer: '',
    correctAnswer: "By 2030, I will have finished my PhD.",
    explanation: 'The key is describing the *state of completion*. The Future Perfect ("will have finished") precisely captures this idea. "will be finishing" refers to the final process, and "will finish" is less emphatic about completion *by* that date.'
  },
  {
    id: 8,
    type: 'fill-in-the-blank-dual',
    prompt: "In two hours, the concert _______ (start), and thousands of fans _______ (scream) for their favorite band. By the time it's over, the band _______ (play) over 20 songs.",
    verbs: ['start', 'scream', 'play'],
    userAnswer: ['', '', ''],
    correctAnswer: ['will have started', 'will be screaming', 'will have played'],
    explanation: 'A complex scenario: "In two hours" means by that point in the future, the concert will be a completed event (Future Perfect: "will have started"). At that moment, the fans will be in the middle of an action (Future Continuous: "will be screaming"). "By the time it\'s over" signals another completion point, requiring the Future Perfect ("will have played").'
  }
])

// --- Computed Properties for Score and Progress ---

const totalQuestions = computed(() => questions.value.length)

const isCorrect = (question: any): boolean => {
  if (Array.isArray(question.correctAnswer)) {
    return JSON.stringify(question.userAnswer.map(a => a.trim().toLowerCase())) === JSON.stringify(question.correctAnswer.map(a => a.trim().toLowerCase()))
  }
  return question.userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
}

const score = computed(() => {
  return questions.value.filter(q => isCorrect(q)).length
})

const progress = computed(() => {
  return (score.value / totalQuestions.value) * 100
})

// --- Methods for Interactivity ---

function checkAnswers() {
  if (questions.value.some(q => Array.isArray(q.userAnswer) ? q.userAnswer.some(a => !a) : !q.userAnswer)) {
    alert("Please answer all questions before submitting.")
    return;
  }
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  showResult.value = false
  questions.value.forEach(q => {
    if (Array.isArray(q.userAnswer)) {
      q.userAnswer = Array(q.correctAnswer.length).fill('');
    } else {
      q.userAnswer = ''
    }
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


// --- Navigation ---

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/16")
}
function goToNextUnit() {
  router.push("/units/grammar/18")
}
</script>

<template>
  <GrammarLayout
    test-title="Advanced English Grammar"
    test-description="Practice based on Raymond Murphy's 'English Grammar in Use'"
    unit-title="Unit 17: will be doing and will have done"
    unit-description="Mastering the Future Continuous and Future Perfect tenses to describe actions in progress versus actions completed in the future."
    :categories="['Future Tenses', 'Verb Forms', 'Advanced']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ========================= -->
    <!--     LEARNING MATERIAL     -->
    <!-- ========================= -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-10 w-10 text-primary" />
          <div>
            <CardTitle>Core Concepts: Future Actions</CardTitle>
            <CardDescription>Understanding the nuance between ongoing and completed future events.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <!-- Future Continuous -->
          <div class="space-y-2">
            <h3 class="font-semibold text-base text-primary">Future Continuous: `will be + verb-ing`</h3>
            <p class="text-muted-foreground">We use this tense to talk about an action that will be <strong class="font-medium text-foreground">in progress at a specific time</strong> in the future.</p>
            <ul class="list-disc space-y-1 pl-5">
              <li>
                <strong>Example:</strong> "At 10 PM tonight, I <strong class="font-semibold">will be studying</strong> for my exam." (The action of studying is ongoing at 10 PM).
              </li>
              <li>
                <strong>Example:</strong> "This time next year, she <strong class="font-semibold">will be working</strong> in London." (Describes her situation at that future point).
              </li>
            </ul>
          </div>
          <!-- Future Perfect -->
          <div class="space-y-2">
            <h3 class="font-semibold text-base text-primary">Future Perfect: `will have + past participle`</h3>
            <p class="text-muted-foreground">We use this tense to talk about an action that will be <strong class="font-medium text-foreground">completed before a specific time</strong> in the future. The keyword is often <strong class="font-medium text-foreground">"by"</strong> or <strong class="font-medium text-foreground">"by the time"</strong>.</p>
            <ul class="list-disc space-y-1 pl-5">
              <li>
                <strong>Example:</strong> "By 10 PM tonight, I <strong class="font-semibold">will have finished</strong> my homework." (The homework is finished *before* 10 PM).
              </li>
              <li>
                <strong>Example:</strong> "By the time you arrive, we <strong class="font-semibold">will have eaten</strong> dinner." (The action of eating is completed).
              </li>
            </ul>
          </div>
          <!-- The Contrast -->
          <Alert variant="default">
            <BrainCircuit class="h-4 w-4" />
            <AlertTitle>Critical Distinction</AlertTitle>
            <AlertDescription>
              Compare these two sentences:
              <ul class="list-decimal pl-5 mt-2">
                <li>When the guests arrive, we <strong class="font-semibold">will be making</strong> cocktails. (We start before they arrive, and they join us mid-activity).</li>
                <li>When the guests arrive, we <strong class="font-semibold">will have made</strong> the cocktails. (The cocktails are ready and waiting for them).</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ========================= -->
    <!--     PRACTICE QUESTIONS    -->
    <!-- ========================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 17 Exercises</CardTitle>
          <CardDescription>
            Complete the sentences using 'will be doing' or 'will have done'. Type your answers carefully.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium text-sm">
              <span class="text-primary font-bold mr-2">{{ index + 1 }}.</span>
              {{ question.prompt }}
            </p>
            
            <!-- Fill in the blank (single) -->
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                v-model="question.userAnswer"
                :placeholder="`Verb: ${question.verb}`"
                class="w-full"
                :disabled="showResult"
              />
            </div>
            
            <!-- Fill in the blank (dual/triple) -->
            <div v-if="question.type === 'fill-in-the-blank-dual' || question.type === 'fill-in-the-blank-triple'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <Input
                  v-for="(verb, i) in question.verbs"
                  :key="i"
                  v-model="question.userAnswer[i]"
                  :placeholder="`Verb: ${verb}`"
                  :disabled="showResult"
              />
            </div>

            <!-- Contextual Choice (Multiple Choice) -->
            <div v-if="question.type === 'contextual-choice'" class="space-y-2">
              <label 
                v-for="option in question.options" 
                :key="option" 
                class="flex items-center gap-3 p-3 border rounded-md has-[:checked]:bg-muted has-[:checked]:border-primary transition-colors"
                :class="{'cursor-pointer': !showResult, 'cursor-not-allowed': showResult}"
              >
                <input
                  type="radio"
                  :name="`q${question.id}`"
                  :value="option"
                  v-model="question.userAnswer"
                  class="h-4 w-4"
                  :disabled="showResult"
                />
                <span class="flex-1 text-sm">{{ option }}</span>
              </label>
            </div>

            <!-- Sentence Correction -->
            <div v-if="question.type === 'sentence-correction'">
               <Input
                v-model="question.userAnswer"
                placeholder="Type the corrected sentence"
                class="w-full"
                :disabled="showResult"
              />
            </div>
          </div>

          <div v-if="!showResult" class="pt-4">
            <Button @click="checkAnswers" class="w-full">Check My Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ========================= -->
    <!--     RESULTS & VALIDATOR   -->
    <!-- ========================= -->
    <template #result>
      <div id="results-section">
        <Card class="bg-card">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>Review your performance and read the explanations to improve.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between gap-4 mb-2">
                <h3 class="font-semibold text-lg">Overall Score: {{ score }} / {{ totalQuestions }}</h3>
                <span :class="['font-bold', progress > 70 ? 'text-green-600' : progress > 40 ? 'text-orange-500' : 'text-red-600']">
                  {{ Math.round(progress) }}%
                </span>
              </div>
              <Progress :model-value="progress" />
            </div>

            <!-- Detailed Breakdown -->
            <div class="space-y-6">
              <h3 class="font-semibold text-lg border-b pb-2">Detailed Answer Review</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                <Alert :variant="isCorrect(question) ? 'default' : 'destructive'" class="border-l-4" :class="isCorrect(question) ? 'border-green-500' : 'border-red-500'">
                  <div class="flex items-start gap-4">
                    <component :is="isCorrect(question) ? CheckCircle : XCircle" class="h-5 w-5 mt-1" :class="isCorrect(question) ? 'text-green-500' : 'text-red-500'" />
                    <div class="flex-1 space-y-2">
                      <p class="font-semibold">Question {{ index + 1 }}</p>
                      <p class="text-sm text-muted-foreground italic">"{{ question.prompt }}"</p>
                      
                      <div class="text-sm space-y-1">
                        <p><strong>Your Answer:</strong> 
                          <span :class="isCorrect(question) ? 'text-green-700' : 'text-red-700'">
                            {{ Array.isArray(question.userAnswer) ? question.userAnswer.join(', ') : question.userAnswer }}
                          </span>
                        </p>
                        <p v-if="!isCorrect(question)"><strong>Correct Answer:</strong> 
                          <span class="font-medium text-foreground">
                            {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer }}
                          </span>
                        </p>
                      </div>

                      <div class="p-3 bg-muted/50 rounded-md mt-2">
                        <p class="font-semibold text-sm mb-1 text-primary">Explanation:</p>
                        <p class="text-sm text-foreground/80">{{ question.explanation }}</p>
                      </div>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>

            <div class="pt-4">
              <Button @click="resetTest" class="w-full" variant="outline">Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
</style>
