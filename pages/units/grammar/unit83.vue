<!--
  File: @/pages/units/grammar/17.vue
  Description: An advanced grammar practice module for Unit 17: "There ... and it ...".
  This page leverages the GrammarLayout to provide a rich learning experience,
  combining theoretical explanations with challenging, context-based exercises
  and a sophisticated validation and feedback system.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
})

const router = useRouter()

const isSubmitted = ref(false)

const questions = ref([
  {
    id: 1,
    prompt: "I was looking for a place to sit, but ____ wasn't any space left on the train. ____ was completely full.",
    studentAnswer: '',
    correctAnswers: ['there', 'it'],
    explanation: "We use 'There' to introduce the new information that space did not exist ('there wasn't any space'). We then use 'it' as a pronoun to refer back to the specific, already-mentioned thing (the train)."
  },
  {
    id: 2,
    prompt: "____ seems to be a major misunderstanding about the project's deadline. ____'s vital that we clarify it immediately.",
    studentAnswer: '',
    correctAnswers: ['there', 'it'],
    explanation: "'There seems to be...' is a formal way to introduce the existence of a situation (a misunderstanding). 'It's vital...' is an impersonal expression used to state the importance or necessity of an action."
  },
  {
    id: 3,
    prompt: "____'s a long way to the nearest gas station from here, isn't ____?",
    studentAnswer: '',
    correctAnswers: ['it', 'there'],
    explanation: "We use 'It's a long way...' to talk about distance. The question tag for a 'There is/are' statement is 'is/are there?', so '...isn't there?' is the correct form here, referring back to the existence of the gas station implicitly."
  },
  {
    id: 4,
    prompt: "____ used to be a famous theatre on this street, but ____ was demolished to make way for a skyscraper.",
    studentAnswer: '',
    correctAnswers: ['there', 'it'],
    explanation: "'There used to be...' introduces something that existed in the past (a famous theatre). 'It' then acts as a pronoun to refer to that specific theatre that was mentioned."
  },
  {
    id: 5,
    prompt: "Look at the sky! ____'s going to be a storm soon. ____ are dark clouds gathering on the horizon.",
    studentAnswer: '',
    correctAnswers: ['it', 'there'],
    explanation: "'It's going to...' is used for weather predictions. 'There are...' is used to point out the existence of something new that we can see (the dark clouds)."
  },
  {
    id: 6,
    prompt: "____'s no use complaining about the decision. ____'s been made and we have to accept it.",
    studentAnswer: '',
    correctAnswers: ['it', 'it'],
    explanation: "'It's no use + -ing' is a fixed idiom to say an action is pointless. The second 'It' refers to the specific, abstract noun 'the decision' that was just mentioned."
  },
  {
    id: 7,
    prompt: "Why is ____ so expensive to live in this city? ____ are just too many people competing for housing.",
    studentAnswer: '',
    correctAnswers: ['it', 'there'],
    explanation: "'It is expensive to live...' is an impersonal structure to comment on a situation or activity. 'There are...' is used to state the existence of a reason (too many people)."
  },
  {
    id: 8,
    prompt: "Is ____ any wonder that the team lost? ____ was clear from the start that they weren't prepared.",
    studentAnswer: '',
    correctAnswers: ['it', 'it'],
    explanation: "'Is it any wonder...?' is a rhetorical, idiomatic expression. 'It was clear...' is another impersonal expression used to state a fact or an observation about a situation."
  }
])

const processStudentAnswer = (answer: string) => {
  return answer.toLowerCase().replace(/[^a-z,'\s]/g, '').split(',').map(s => s.trim()).filter(Boolean)
}

const checkAnswer = (question: typeof questions.value[0]) => {
  if (!isSubmitted.value) return null
  const studentAnswers = processStudentAnswer(question.studentAnswer)
  if (studentAnswers.length !== question.correctAnswers.length) return false
  return studentAnswers.every((ans, index) => ans === question.correctAnswers[index])
}

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    const isCorrect = checkAnswer(question)
    return isCorrect ? correctCount + 1 : correctCount
  }, 0)
})

const progressValue = computed(() => (score.value / questions.value.length) * 100)

function validateAnswers() {
  isSubmitted.value = true
}

function resetQuiz() {
  isSubmitted.value = false
  questions.value.forEach(q => q.studentAnswer = '')
}

function goToPreviousUnit() {
  router.push("/units/grammar/16")
}

function goToNextUnit() {
  router.push("/units/grammar/18")
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate & Advanced Grammar"
    test-description="Practice based on 'English Grammar In Use' by Raymond Murphy."
    unit-title="Unit 17: There … and it …"
    unit-description="Mastering the distinction between the existential 'there' and the pronoun/impersonal 'it'."
    :categories="['Pronouns', 'Sentence Structure', 'Common Confusions']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: The Existential 'There'</CardTitle>
          <CardDescription>We use <strong>'there' + 'be'</strong> to introduce new information—to say that something exists (or does not exist) in a particular place or situation.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <p><strong class="text-primary">Rule:</strong> 'There' acts as a "dummy" subject when the real subject (the new information) comes after the verb 'be'.</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>There is</strong> a serious flaw in your argument. <span class="text-muted-foreground ml-2">(Introduces the 'flaw')</span></li>
            <li><strong>There are</strong> many factors to consider. <span class="text-muted-foreground ml-2">(Introduces the 'factors')</span></li>
            <li>Suddenly, <strong>there was</strong> a loud bang. <span class="text-muted-foreground ml-2">(Introduces a sound)</span></li>
            <li>Is <strong>there</strong> a doctor on this flight? <span class="text-muted-foreground ml-2">(Asks about the existence of a doctor)</span></li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: The Versatile 'It'</CardTitle>
          <CardDescription>We use <strong>'it'</strong> in several distinct ways, but never to introduce the existence of something for the first time.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div>
            <h4 class="font-semibold">1. As a Pronoun:</h4>
            <p class="text-muted-foreground">Referring back to a specific, previously mentioned thing, idea, or situation.</p>
            <p class="mt-2 pl-4 border-l-2">I saw a fascinating documentary last night. <strong>It</strong> was about artificial intelligence. <span class="text-muted-foreground ml-2">('It' = the documentary)</span></p>
          </div>
          <div>
            <h4 class="font-semibold">2. For Time, Weather, and Distance:</h4>
            <p class="text-muted-foreground">Used as an "empty" subject in common expressions.</p>
             <ul class="list-disc pl-6 space-y-1 mt-2">
              <li><strong>It</strong>'s half past three.</li>
              <li><strong>It</strong> was raining heavily when we left.</li>
              <li><strong>It</strong>'s 50 kilometres from here to the coast.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">3. As an Impersonal Subject:</h4>
            <p class="text-muted-foreground">To introduce an opinion, comment, or fact about a situation or action.</p>
             <ul class="list-disc pl-6 space-y-1 mt-2">
              <li><strong>It</strong> is important to be honest.</li>
              <li><strong>It</strong> seems we've taken a wrong turn.</li>
              <li><strong>It</strong>'s a shame that you have to leave so soon.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card class="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <AlertTriangle class="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span>Key Distinction: 'There' vs. 'It'</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
            <div class="p-4 rounded-lg bg-background">
              <p class="font-mono text-primary"><strong>There</strong> used to be a castle on that hill.</p>
              <p class="text-muted-foreground mt-1">✓ Correct. Introduces the past existence of the castle.</p>
              <hr class="my-2">
              <p class="font-mono text-primary"><strong>It</strong> stood there for 500 years.</p>
              <p class="text-muted-foreground mt-1">✓ Correct. 'It' refers back to the specific castle.</p>
            </div>
             <div class="p-4 rounded-lg bg-background">
              <p class="font-mono text-destructive-foreground line-through"><strong>It</strong> used to be a castle on that hill.</p>
              <p class="text-muted-foreground mt-1">✗ Incorrect. 'It' cannot be used to introduce something new. This is the most common mistake.</p>
            </div>
        </CardContent>
      </Card>

    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences with 'there' or 'it'. For questions with two blanks, separate your answers with a comma (e.g., it, there).</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium text-sm">
              {{ index + 1 }}. <span v-html="question.prompt.replace(/____/g, '______')"></span>
            </p>
            <div class="flex items-center gap-2">
              <Input
                :id="`q${question.id}`"
                v-model="question.studentAnswer"
                type="text"
                placeholder="Your answer(s)..."
                :disabled="isSubmitted"
                class="flex-1"
                @keyup.enter="validateAnswers"
              />
              <template v-if="isSubmitted">
                <CheckCircle2 v-if="checkAnswer(question)" class="h-5 w-5 text-green-500" />
                <XCircle v-else class="h-5 w-5 text-red-500" />
              </template>
            </div>
            <p v-if="isSubmitted && !checkAnswer(question)" class="text-xs text-red-600 dark:text-red-400">
              Correct answer: {{ question.correctAnswers.join(', ') }}
            </p>
          </div>
          <div class="flex gap-4 pt-4">
            <Button @click="validateAnswers" :disabled="isSubmitted" class="w-full">Check Answers</Button>
            <Button @click="resetQuiz" variant="outline" class="w-full">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Results & Explanations</CardTitle>
          <CardDescription>
            You scored {{ score }} out of {{ questions.length }}. Review the detailed explanations below to solidify your understanding.
          </CardDescription>
          <Progress :model-value="progressValue" class="mt-4" />
        </CardHeader>
        <CardContent class="space-y-6">
          <Alert
            v-for="question in questions"
            :key="`res-${question.id}`"
            :variant="checkAnswer(question) ? 'default' : 'destructive'"
          >
            <component :is="checkAnswer(question) ? CheckCircle2 : XCircle" class="h-4 w-4" />
            <AlertTitle>Question {{ question.id }}</AlertTitle>
            <AlertDescription class="space-y-2">
              <p>
                <strong>Your Answer:</strong> 
                <span :class="checkAnswer(question) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  "{{ question.studentAnswer || 'No answer' }}"
                </span>
              </p>
              <p v-if="!checkAnswer(question)">
                <strong>Correct Answer:</strong> 
                <span class="font-semibold">{{ question.correctAnswers.join(', ') }}</span>
              </p>
              <p class="pt-2 border-t mt-2">
                <strong>Explanation:</strong> {{ question.explanation }}
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style>
/* Optional: for a smoother transition on the results */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
