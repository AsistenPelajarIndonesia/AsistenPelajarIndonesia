<!--
  File: @/pages/units/grammar/0.vue
  Description: An advanced grammar practice module for Unit 0: "Questions 1".
  This page focuses on the core principles of forming questions in English, including
  yes/no questions, wh-questions, subject/object questions, and negative questions.
  It is designed to be challenging and pedagogically sound, providing deep feedback.
-->
<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Advanced exercises based on the works of Raymond Murphy."
    unit-title="Unit 0: Questions 1 (Present & Past)"
    unit-description="Mastering the art of inquiry: word order, auxiliary verbs, and question words."
    :categories="['Questions', 'Word Order', 'Auxiliary Verbs', 'Tenses']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- This section provides a condensed, yet thorough, explanation of the     -->
    <!-- grammar rules before the student attempts the practice exercises.       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principle: The Inversion Rule</CardTitle>
          <CardDescription>Statements follow S-V-O. Questions invert the subject and auxiliary verb.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          <p class="mb-2">In standard English questions, the word order changes from the standard statement form (Subject-Verb). We place an <strong class="text-primary">auxiliary verb</strong> (like <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">be, do, have</code>) or a <strong class="text-primary">modal verb</strong> (like <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">can, will, should</code>) <em class="font-semibold">before</em> the subject.</p>
          <p class="font-mono text-xs md:text-sm">
            Statement: <span class="text-blue-600 dark:text-blue-400">You</span> <span class="text-red-600 dark:text-red-400">are</span> learning. ➔ Question: <span class="text-red-600 dark:text-red-400">Are</span> <span class="text-blue-600 dark:text-blue-400">you</span> learning?<br>
            Statement: <span class="text-blue-600 dark:text-blue-400">They</span> <span class="text-red-600 dark:text-red-400">work</span> hard. ➔ Question: <span class="text-red-600 dark:text-red-400">Do</span> <span class="text-blue-600 dark:text-blue-400">they</span> work hard?<br>
            Statement: <span class="text-blue-600 dark:text-blue-400">She</span> <span class="text-red-600 dark:text-red-400">has</span> finished. ➔ Question: <span class="text-red-600 dark:text-red-400">Has</span> <span class="text-blue-600 dark:text-blue-400">she</span> finished?
          </p>
          <p class="mt-3 text-muted-foreground">If there is no auxiliary/modal in the statement (e.g., simple present/past verbs), you <strong class="text-destructive">must</strong> introduce <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">do/does/did</code>.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wh-Questions: Seeking Information</CardTitle>
          <CardDescription>Using question words to ask for specific details.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          <p class="mb-2">Wh-words (<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">what, where, when, why, who, which, how</code>) are placed at the very beginning of the sentence, preceding the inverted auxiliary and subject.</p>
          <p class="font-mono text-xs md:text-sm">
            Structure: <strong class="text-purple-600 dark:text-purple-400">Wh-Word</strong> + <strong class="text-red-600 dark:text-red-400">Auxiliary</strong> + <strong class="text-blue-600 dark:text-blue-400">Subject</strong> + <strong class="text-green-600 dark:text-green-400">Main Verb</strong>?<br>
            Example: <span class="text-purple-600 dark:text-purple-400">Why</span> <span class="text-red-600 dark:text-red-400">did</span> <span class="text-blue-600 dark:text-blue-400">you</span> <span class="text-green-600 dark:text-green-400">leave</span> so early?
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-destructive">Advanced Point: Subject vs. Object Questions</CardTitle>
          <CardDescription>A common point of confusion for advanced learners.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          <p class="mb-2">When the Wh-word (<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">who</code>, <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">what</code>, <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">which</code>) <strong class="text-primary">is the subject</strong> of the question, we <strong class="text-destructive">do not</strong> use the auxiliary <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">do/does/did</code> and there is <strong class="text-destructive">no inversion</strong>. The word order is like a statement.</p>
          <p class="font-mono text-xs md:text-sm">
            <strong>Subject Question:</strong> <span class="text-purple-600 dark:text-purple-400">Who</span> <span class="text-red-600 dark:text-red-400">phoned</span> you? (Here, 'Who' is the one doing the phoning).<br>
            <strong>Object Question:</strong> <span class="text-purple-600 dark:text-purple-400">Who</span> <span class="text-red-600 dark:text-red-400">did</span> <span class="text-blue-600 dark:text-blue-400">you</span> <span class="text-green-600 dark:text-green-400">phone</span>? (Here, 'you' is the subject doing the phoning, 'who' is the object).
          </p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- A series of challenging questions designed to test the nuanced rules    -->
    <!-- of forming questions. Inputs are bound to the `userAnswers` ref.      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            You are a detective investigating a case. You need to ask the right questions.
            Type the full question for each scenario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-6" @submit.prevent="validateAnswers">
            <div v-for="(question, index) in unitData" :key="question.id" class="grid gap-2">
              <Label :for="`question-${question.id}`" class="text-sm font-medium">
                {{ index + 1 }}. {{ question.prompt }}
              </Label>
              <Input
                :id="`question-${question.id}`"
                v-model="userAnswers[index].answer"
                type="text"
                placeholder="Type the full question here..."
                class="font-mono"
                :disabled="showResult"
              />
              <p v-if="question.context" class="text-xs text-muted-foreground italic">
                {{ question.context }}
              </p>
            </div>
            <Button type="submit" class="w-full" :disabled="showResult">
              <Check class="mr-2 h-4 w-4" />
              Check My Answers
            </Button>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- This section is conditionally rendered to show a detailed breakdown of  -->
    <!-- the student's performance, with specific, actionable feedback.          -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>Review the feedback below to understand your mistakes and master the rules.</CardDescription>
            </div>
            <div class="flex w-full shrink-0 items-center justify-start gap-2 sm:w-auto sm:justify-end">
                <div class="text-xl font-bold tracking-tighter sm:text-2xl">
                    Score: {{ score }}%
                </div>
                <Progress :model-value="score" class="w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="divide-y divide-border">
            <div
              v-for="result in detailedResults"
              :key="result.id"
              class="py-4"
            >
              <div class="flex items-start gap-4">
                <div class="mt-1">
                    <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                    <XCircle v-else class="h-5 w-5 text-destructive" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold">{{ result.prompt }}</p>
                  <p :class="['mt-1 font-mono text-sm', result.isCorrect ? 'text-green-600' : 'text-destructive']">
                    Your answer: {{ result.userAnswer || 'No answer provided.' }}
                  </p>
                  <p v-if="!result.isCorrect" class="mt-1 font-mono text-sm text-blue-600 dark:text-blue-400">
                    Correct answer: {{ result.correctAnswer.join(' / ') }}
                  </p>
                  <div class="mt-2 rounded-md border bg-muted/50 p-3 text-xs">
                    <p class="font-bold text-primary">Explanation:</p>
                    <p class="text-muted-foreground">{{ result.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button @click="resetTest" variant="outline" class="mt-6 w-full">
            <RefreshCw class="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Check, CheckCircle2, XCircle, RefreshCw } from 'lucide-vue-next'

import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

definePageMeta({
  layout: false, 
})

const router = useRouter()

function goToPreviousUnit() {
  // In a real app, this would likely go to a unit index or handle edge cases.
  // For Unit 0, we'll navigate to a hypothetical main grammar page.
  router.push("/units/grammar")
}

function goToNextUnit() {
  router.push("/units/grammar/1")
}

const unitData = ref([
  {
    id: 1,
    prompt: "You want to know the reason for your colleague's absence yesterday. Ask him.",
    context: "Statement: He wasn't at the meeting yesterday.",
    correctAnswer: ["Why weren't you at the meeting yesterday?", "Why were you not at the meeting yesterday?"],
    explanation: "This is a Wh-question with the verb 'to be' in the past. The structure is Wh-word (Why) + auxiliary 'be' (weren't) + subject (you). Using 'did' here would be incorrect, as 'be' is its own auxiliary."
  },
  {
    id: 2,
    prompt: "You see that the lights are on in the office late at night. You want to know who is there. Ask the security guard.",
    context: "You are asking about the subject (the person who is working).",
    correctAnswer: ["Who is working so late?", "Who is still working?"],
    explanation: "This is a subject question. The Wh-word 'Who' is the subject of the verb 'is working'. Therefore, we do not use an auxiliary 'do/does/did' and we do not invert the word order. The structure is Who + Verb Phrase."
  },
  {
    id: 3,
    prompt: "A project failed. You need to know which specific factor caused the most damage. Ask the project manager.",
    context: "Statement: A specific factor caused the most damage.",
    correctAnswer: ["What caused the most damage?", "Which factor caused the most damage?"],
    explanation: "Another subject question. 'What' or 'Which factor' is the subject causing the damage. The verb 'caused' is in the simple past. No auxiliary 'did' is needed. 'What did cause...' would be incorrect."
  },
  {
    id: 4,
    prompt: "Your friend seems unhappy with a movie. You want to know their opinion. Ask them.",
    context: "Statement: You didn't like the film.",
    correctAnswer: ["Didn't you like the film?", "Did you not like the film?"],
    explanation: "This is a negative question, often used to confirm something you suspect is true. We invert the negative auxiliary 'Didn't' with the subject 'you'. The main verb 'like' remains in its base form."
  },
  {
    id: 5,
    prompt: "You need to find out how long your manager has been with the company. Ask a senior team member.",
    context: "Statement: She has worked here for a certain duration.",
    correctAnswer: ["How long has she been working here?", "How long has she worked here?"],
    explanation: "This question uses the present perfect or present perfect continuous tense. The structure is Wh-phrase (How long) + auxiliary 'have/has' (has) + subject (she) + main verb part (been working/worked)."
  },
  {
    id: 6,
    prompt: "You are surprised that your tech-savvy friend doesn't know about a new app. Express your surprise with a question.",
    context: "Statement: You haven't heard of this app.",
    correctAnswer: ["Haven't you heard of this app?", "Have you not heard of this app?"],
    explanation: "A negative question in the present perfect. It shows surprise. Structure: Negative auxiliary (Haven't) + subject (you) + past participle (heard)."
  },
  {
    id: 7,
    prompt: "Someone left a briefcase in the meeting room. You want to know who it belongs to. Ask your colleagues.",
    context: "You are asking about the owner of the briefcase.",
    correctAnswer: ["Whose briefcase is this?", "Who does this briefcase belong to?"],
    explanation: "This question can be formed in two common ways. With 'Whose', it modifies the noun 'briefcase' directly. With 'Who', we need the auxiliary 'does' because the verb is 'belong' (simple present) and the subject is 'this briefcase'."
  },
  {
    id: 8,
    prompt: "You know your team made a decision, but you don't know what it was. Ask about the decision.",
    context: "Statement: They decided something.",
    correctAnswer: ["What did they decide?"],
    explanation: "A classic object question. 'What' is the object of the verb 'decide'. The subject is 'they', so we need the auxiliary 'did' for the simple past, followed by the subject 'they' and the base form of the verb 'decide'."
  }
])

const userAnswers = ref(unitData.value.map(q => ({ id: q.id, answer: '' })))
const showResult = ref(false)

const normalizeAnswer = (answer: string): string => {
  return answer.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '')
}

const detailedResults = computed(() => {
  return unitData.value.map((question, index) => {
    const userAnswer = userAnswers.value[index].answer
    const isCorrect = question.correctAnswer.some(correct => normalizeAnswer(correct) === normalizeAnswer(userAnswer))
    
    return {
      ...question,
      userAnswer,
      isCorrect
    }
  })
})

const score = computed(() => {
  if (!showResult.value) return 0
  const correctCount = detailedResults.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / unitData.value.length) * 100)
})

function validateAnswers() {
  showResult.value = true
  // Scroll to top to see results summary
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetTest() {
  userAnswers.value = unitData.value.map(q => ({ id: q.id, answer: '' }))
  showResult.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
