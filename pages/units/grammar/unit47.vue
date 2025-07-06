<!--
  File: @/pages/units/grammar/4.vue
  Description: An advanced practice module for Unit 4: Reported Speech 2.
  This page integrates with GrammarLayout to provide a rich learning experience,
  featuring contextualized exercises, a sophisticated validation system, and
  detailed explanations inspired by pedagogical best practices.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or auto-imported via Nuxt
// These are typical components from a library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- 1. NAVIGATION LOGIC ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/3")
const goToNextUnit = () => router.push("/units/grammar/5")

// --- 2. CORE REACTIVE STATE ---
const showResult = ref(false)
const questionsAttempted = ref(false)

// Data structure for the practice questions. Each question is an object
// with direct speech, context, user input, and validation logic.
const practiceQuestions = ref([
  {
    id: 'q1',
    context: 'A financial journalist is interviewing the Minister of Finance.',
    directSpeech: '"What are you implementing to combat the recent inflationary pressures?"',
    reportingHint: 'The journalist asked the minister...',
    userAnswer: '',
    // Accepts multiple valid answers for robustness
    correctAnswers: [
      'the journalist asked the minister what she was implementing to combat the recent inflationary pressures',
      'the journalist asked the minister what he was implementing to combat the recent inflationary pressures',
    ],
    isCorrect: false,
    // The "Awesome Validator" explanation
    explanation: 'In reported Wh-questions, the wh-word (what) acts as a conjunction. The primary grammatical shift is the word order: it must change from question form (are you implementing) to statement form (he/she was implementing). Note the essential tense backshift from Present Continuous (are implementing) to Past Continuous (was implementing). The pronoun "you" must also be changed to "he" or "she" to fit the new context.',
  },
  {
    id: 'q2',
    context: 'An employee is proposing a new initiative to their manager.',
    directSpeech: '"Have you considered adopting a hybrid work model for our department?"',
    reportingHint: 'The employee asked her manager...',
    userAnswer: '',
    correctAnswers: [
      'the employee asked her manager if she had considered adopting a hybrid work model for their department',
      'the employee asked her manager whether she had considered adopting a hybrid work model for their department',
      'the employee asked her manager if he had considered adopting a hybrid work model for their department',
      'the employee asked her manager whether he had considered adopting a hybrid work model for their department',
    ],
    isCorrect: false,
    explanation: 'For Yes/No questions, we introduce "if" or "whether". A crucial backshift occurs from Present Perfect (have you considered) to Past Perfect (if he/she had considered). Again, observe the word order inversion to a standard statement structure and the pronoun change from "you" to "he/she" and "our" to "their".',
  },
  {
    id: 'q3',
    context: 'A senior engineer is giving a critical instruction to a junior technician.',
    directSpeech: '"Do not, under any circumstances, reboot the main server without my explicit authorisation."',
    reportingHint: 'The engineer strictly warned the technician...',
    userAnswer: '',
    correctAnswers: [
      'the engineer strictly warned the technician not to reboot the main server without his explicit authorisation',
      'the engineer strictly warned the technician not to reboot the main server without her explicit authorisation',
    ],
    isCorrect: false,
    explanation: 'Reported commands, especially negative ones, use the structure: [reporting verb] + [object] + not + to-infinitive. Here, "warned the technician not to reboot" is the key structure. The possessive pronoun must also change from "my" to "his" or "her". The phrase "under any circumstances" is an adverbial and its position can be flexible, but the core structure is paramount.',
  },
  {
    id: 'q4',
    context: 'A project manager is making a suggestion during a team meeting.',
    directSpeech: '"Why don\'t we outsource the graphic design for this campaign to a specialized agency?"',
    reportingHint: 'The project manager suggested...',
    userAnswer: '',
    correctAnswers: [
      'the project manager suggested outsourcing the graphic design for that campaign to a specialized agency',
      'the project manager suggested that they outsource the graphic design for that campaign to a specialized agency',
    ],
    isCorrect: false,
    explanation: 'The verb "suggest" is a common but tricky reporting verb. It can be followed by a gerund ("suggested outsourcing") or a that-clause. Note the subjunctive mood in the that-clause: "that they outsource" (not "outsourced"). This is a feature of formal English. Also, the demonstrative pronoun changes from "this" to "that".',
  },
  {
    id: 'q5',
    context: 'A customer is complaining to a support agent about a delayed delivery.',
    directSpeech: '"I must insist on speaking to a supervisor immediately about this issue."',
    reportingHint: 'The customer insisted...',
    userAnswer: '',
    correctAnswers: [
      'the customer insisted on speaking to a supervisor immediately about that issue',
    ],
    isCorrect: false,
    explanation: '"Insist" is often followed by the preposition "on" and a gerund ("insisted on speaking"). This structure is more common and idiomatic than a that-clause in this context. Note the change of "this issue" to "that issue," a typical shift for place/proximity in reported speech.',
  },
  {
    id: 'q6',
    context: 'A CEO is making a firm commitment to the shareholders during an annual meeting.',
    directSpeech: '"I will personally oversee the restructuring, and I promise it will be completed by the next fiscal year."',
    reportingHint: 'The CEO promised the shareholders...',
    userAnswer: '',
    correctAnswers: [
      'the ceo promised the shareholders that she would personally oversee the restructuring and that it would be completed by the following fiscal year',
      'the ceo promised the shareholders that he would personally oversee the restructuring and that it would be completed by the following fiscal year',
    ],
    isCorrect: false,
    explanation: 'Here we see a shift in modal verbs: "will" becomes "would". The reporting verb "promise" is followed by a that-clause. The time expression "the next fiscal year" shifts to "the following fiscal year". Both clauses of the direct speech must be correctly reported, maintaining the logical connection with "and".',
  },
])

// --- 3. COMPUTED PROPERTIES for dynamic UI ---
const totalQuestions = computed(() => practiceQuestions.value.length)
const correctAnswersCount = computed(() => practiceQuestions.value.filter(q => q.isCorrect).length)
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (correctAnswersCount.value / totalQuestions.value) * 100
})
const progressText = computed(() => {
  if (!questionsAttempted.value) return 'Awaiting your attempt...'
  if (scorePercentage.value < 50) return "Needs more practice. Review the explanations carefully."
  if (scorePercentage.value < 80) return "Good effort! A few points to refine."
  if (scorePercentage.value < 100) return "Excellent work! Almost perfect."
  return "Perfect score! You've mastered this."
})

// --- 4. VALIDATION & CONTROL LOGIC ---

// Normalizes a string for comparison: lowercase, trim, remove final punctuation.
const normalizeString = (str: string): string => {
  return str.toLowerCase().trim().replace(/[.!?]$/, '')
}

const checkAnswers = () => {
  practiceQuestions.value.forEach(question => {
    const userNormalized = normalizeString(question.userAnswer)
    const isMatch = question.correctAnswers.some(correct => normalizeString(correct) === userNormalized)
    question.isCorrect = isMatch
  })
  questionsAttempted.value = true
  showResult.value = true
}

const resetPractice = () => {
  showResult.value = false
  questionsAttempted.value = false
  practiceQuestions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = false
  })
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series."
    unit-title="Unit 4: Reported Speech 2"
    unit-description="Mastering the reporting of questions, commands, and suggestions using a variety of advanced reporting verbs and structures."
    :categories="['Advanced Grammar', 'Reported Speech', 'Syntax', 'Verb Patterns']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concepts: Advanced Reporting</CardTitle>
          <CardDescription>Beyond basic statements, reporting speech involves transforming questions and commands, and using nuanced reporting verbs.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-1">1. Reporting Questions</h4>
            <ul class="list-disc pl-5 space-y-2">
              <li>
                <strong class="text-primary">Yes/No Questions:</strong> Introduce with <code class="bg-muted px-1 rounded">if</code> or <code class="bg-muted px-1 rounded">whether</code>. The word order becomes a standard statement (Subject + Verb).<br>
                <em>"<u>Are you</u> ready?" → He asked <u>if I was</u> ready.</em>
              </li>
              <li>
                <strong class="text-primary">Wh- Questions:</strong> Use the Wh-word (what, where, why, etc.) as the conjunction. The word order also changes to a statement.<br>
                <em>"What <u>is the time</u>?" → She asked what <u>the time was</u>.</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-1">2. Reporting Commands, Requests & Advice</h4>
            <p class="mb-2">These are typically reported using a <code class="bg-muted px-1 rounded">to-infinitive</code> structure, not a that-clause.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>
                <strong class="text-primary">Command/Order:</strong> Use verbs like <code class="bg-muted px-1 rounded">tell</code>, <code class="bg-muted px-1 rounded">order</code>.<br>
                <em>"Sit down." → He <u>told me to sit</u> down.</em>
              </li>
              <li>
                <strong class="text-primary">Request:</strong> Use verbs like <code class="bg-muted px-1 rounded">ask</code>.<br>
                <em>"Please help me." → She <u>asked him to help</u> her.</em>
              </li>
               <li>
                <strong class="text-primary">Negative Command:</strong> Use <code class="bg-muted px-1 rounded">not to + infinitive</code>.<br>
                <em>"Don't go." → They <u>warned us not to go</u>.</em>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-1">3. Special Reporting Verbs & Their Patterns</h4>
            <p class="mb-2">The choice of reporting verb adds significant meaning. Their grammatical patterns must be learned.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>suggest + gerund:</strong> <em>He <u>suggested going</u> for a walk.</em></li>
              <li><strong>suggest + that + subject + (should) + base verb:</strong> <em>He <u>suggested that we (should) go</u>...</em></li>
              <li><strong>insist on + gerund:</strong> <em>She <u>insisted on paying</u>.</em></li>
              <li><strong>promise + to-infinitive:</strong> <em>I <u>promise to call</u>.</em></li>
              <li><strong>promise + (that) clause:</strong> <em>I <u>promise (that) I will call</u>.</em></li>
              <li><strong>warn + someone + (not) to-infinitive:</strong> <em>He <u>warned them not to be</u> late.</em></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice SLOT: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Convert the direct speech into reported speech based on the context. Pay close attention to tense, pronouns, time/place adverbs, and word order.</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="checkAnswers" class="flex flex-col gap-6">
              <div v-for="(question, index) in practiceQuestions" :key="question.id" class="space-y-2">
                <p class="text-sm font-medium text-muted-foreground">{{ index + 1 }}. {{ question.context }}</p>
                <div class="p-3 border-l-4 border-primary bg-muted/50 rounded-r-md">
                  <p class="italic">"{{ question.directSpeech }}"</p>
                </div>
                <Label :for="question.id" class="font-semibold">{{ question.reportingHint }}</Label>
                <Input
                  :id="question.id"
                  v-model="question.userAnswer"
                  type="text"
                  placeholder="Type the full reported sentence here..."
                  :disabled="showResult"
                  class="text-base"
                />
              </div>

              <div v-if="!showResult" class="flex justify-end mt-4">
                <Button type="submit">Check My Answers</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: The Awesome Validator & Feedback                        -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Your Results & Detailed Feedback</CardTitle>
          <CardDescription>Review each question to understand your performance and master the concepts.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score Summary -->
          <div class="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
            <div class="flex items-center justify-between gap-4 mb-2">
              <h3 class="text-lg font-semibold">Overall Score: {{ correctAnswersCount }} / {{ totalQuestions }}</h3>
              <p class="font-medium" :class="{'text-green-600': scorePercentage > 80, 'text-yellow-600': scorePercentage >= 50, 'text-red-600': scorePercentage < 50 }">{{ progressText }}</p>
            </div>
            <Progress :model-value="scorePercentage" />
          </div>

          <!-- Detailed Feedback per Question -->
          <div v-for="question in practiceQuestions" :key="`result-${question.id}`" class="space-y-3">
            <div class="flex items-start gap-3">
              <component :is="question.isCorrect ? CheckCircle2 : XCircle" :class="[question.isCorrect ? 'text-green-500' : 'text-red-500', 'mt-1 h-5 w-5 flex-shrink-0']" />
              <div class="flex-1">
                <p class="font-semibold">Your Answer:</p>
                <p class="p-2 rounded-md text-sm" :class="[question.isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30 line-through']">
                  {{ question.userAnswer || 'No answer provided.' }}
                </p>
              </div>
            </div>

            <Alert v-if="!question.isCorrect" variant="default" class="bg-background">
               <Lightbulb class="h-4 w-4" />
              <AlertTitle class="font-semibold">Correction & Explanation</AlertTitle>
              <AlertDescription class="space-y-2">
                <p><strong>Correct Answer:</strong> <span class="italic text-primary">{{ question.correctAnswers[0] }}</span></p>
                <p>{{ question.explanation }}</p>
              </AlertDescription>
            </Alert>
             <Alert v-else variant="default" class="border-green-300 dark:border-green-700 bg-background">
               <Lightbulb class="h-4 w-4 text-green-500" />
              <AlertTitle class="font-semibold text-green-700 dark:text-green-400">Analysis of Correct Answer</AlertTitle>
              <AlertDescription>
                <p>{{ question.explanation }}</p>
              </AlertDescription>
            </Alert>
          </div>
          
          <div class="flex justify-end pt-4">
            <Button @click="resetPractice" variant="outline">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
