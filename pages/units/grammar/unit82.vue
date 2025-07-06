<!--
  File: @/pages/units/grammar/16.vue
  Description: An advanced grammar practice module for Unit 16.
  This page integrates learning material, challenging exercises, and a detailed
  results validator to provide a comprehensive learning experience for English students.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
})

const router = useRouter()

const showResult = ref(false)

const questions = ref([
  {
    id: 1,
    type: 'Fill-in-the-blank',
    prompt: 'I ran into an old teacher _________ the other day at the supermarket. It was a pleasant surprise.',
    hint: 'Use the double possessive form for "me".',
    answers: ['of mine'],
    userAnswer: '',
    isCorrect: null,
    explanation: 'The structure "a/an + noun + of + possessive pronoun" is used here. "An old teacher of me" is incorrect. We must use the possessive pronoun "mine". The phrase "an old teacher of mine" means "one of my old teachers".'
  },
  {
    id: 2,
    type: 'Sentence Transformation',
    prompt: 'Rewrite the following sentence to emphasize that the decision belonged exclusively to her.',
    initialSentence: 'She made the decision to move abroad.',
    hint: 'Use "her own".',
    answers: ['it was her own decision to move abroad.', 'the decision to move abroad was her own.'],
    userAnswer: '',
    isCorrect: null,
    explanation: 'Using "own" (e.g., my own, your own, her own) adds strong emphasis, clarifying that something belongs to someone and no one else. Both "It was her own decision..." and "...the decision was her own" are excellent ways to add this emphasis.'
  },
  {
    id: 3,
    type: 'Fill-in-the-blank',
    prompt: 'He didn\'t want any help with the project; he was determined to complete it _________.',
    hint: 'Meaning "without help". Two answers are possible.',
    answers: ['by himself', 'on his own'],
    userAnswer: '',
    isCorrect: null,
    explanation: 'Both "by himself" and "on his own" mean to do something alone or without assistance. "By himself" often emphasizes the action itself, while "on his own" can also imply a state of independence. In this context, they are interchangeable.'
  },
  {
    id: 4,
    type: 'Error Correction',
    prompt: 'Find and correct the grammatical error in the sentence below.',
    errorSentence: 'That\'s a brilliant idea of you. You should propose it at the meeting.',
    answers: ["that's a brilliant idea of yours."],
    userAnswer: '',
    isCorrect: null,
    explanation: 'Similar to "a friend of mine," when using "of" to show possession with pronouns, we must use the possessive pronoun form (mine, yours, his, hers, ours, theirs), not the object pronoun (me, you, him, etc.).'
  },
  {
    id: 5,
    type: 'Fill-in-the-blank (Advanced)',
    prompt: 'The children have to learn to solve problems _________ and not always rely on their parents.',
    hint: 'Meaning "independently".',
    answers: ['on their own'],
    userAnswer: '',
    isCorrect: null,
    explanation: '"On their own" is the most idiomatic choice here as it strongly implies developing independence and self-reliance, which is the core meaning of the sentence. "By themselves" is grammatically correct but "on their own" fits the context of personal development better.'
  },
  {
    id: 6,
    type: 'Sentence Transformation',
    prompt: 'Rewrite the sentence using the "a ... of ...\'s" structure.',
    initialSentence: 'I borrowed John\'s car last night.',
    hint: 'The sentence should start with "I borrowed a car..."',
    answers: ["i borrowed a car of john's last night."],
    userAnswer: '',
    isCorrect: null,
    explanation: 'This is the "double genitive" or "post-genitive" with a proper noun. We use "of + noun\'s" (of John\'s, of Mary\'s). This structure often implies "one of John\'s cars," suggesting he may have more than one, or it simply sounds more natural in casual conversation.'
  },
  {
    id: 7,
    type: 'Fill-in-the-blank',
    prompt: 'After his flatmate moved out, he lived _________ for a year before finding a new one.',
    hint: 'Meaning "alone".',
    answers: ['on his own'],
    userAnswer: '',
    isCorrect: null,
    explanation: '"On his own" is the most common and natural way to say that someone lives alone, emphasizing the state of being solitary. While "by himself" is not strictly wrong, "on his own" is more idiomatic for describing a living situation.'
  },
  {
    id: 8,
    type: 'Fill-in-the-blank',
    prompt: 'Stop helping me! I\'d rather make my _________ mistakes than have someone else do it for me.',
    hint: 'Use the emphatic possessive.',
    answers: ['own'],
    userAnswer: '',
    isCorrect: null,
    explanation: 'The structure is "my own + noun". Here, "my own mistakes" emphasizes that the speaker wants to be responsible for their personal errors and learn from them, rejecting outside interference. It adds a strong sense of personal ownership.'
  }
])

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (score.value / totalQuestions.value) * 100
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { title: 'Exceptional Work!', message: 'Perfect score! You have a masterful command of these structures. Well done.' }
  if (percentage >= 75) return { title: 'Excellent Effort!', message: 'You have a very strong understanding. Review the explanations for the few you missed to perfect your knowledge.' }
  if (percentage >= 50) return { title: 'Good Progress!', message: 'A solid attempt. You\'re getting the hang of it. Pay close attention to the detailed explanations to clear up any confusion.' }
  return { title: 'Needs Review', message: 'This is a tricky unit. Take your time to review the material and the explanations for each question. Practice makes perfect!' }
})

const checkAnswers = () => {
  questions.value.forEach(q => {
    const userAnswerCleaned = q.userAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '')
    const isAnswerCorrect = q.answers.some(answer => answer.toLowerCase().replace(/[.,!?;:]/g, '') === userAnswerCleaned)
    q.isCorrect = isAnswerCorrect
  })
  showResult.value = true
}

const resetTest = () => {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
}

function goToPreviousUnit() {
  router.push("/units/grammar/15")
}
function goToNextUnit() {
  router.push("/units/grammar/17")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Intermediate Level - Based on the book by Raymond Murphy"
    unit-title="Unit 16: A friend of mine; My own house; On my own / by myself"
    unit-description="Mastering possessive and reflexive expressions for natural, native-like speech."
    :categories="['Possessives', 'Emphasis', 'Reflexive Pronouns', 'Idiomatic Expressions']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL                                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Rule 1: The Double Possessive (a friend of mine)</CardTitle>
          <CardDescription>This structure, also known as the post-genitive, is essential for sounding natural.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>We use the form <code class="bg-muted px-1 py-0.5 rounded">a/an/that/some + noun + of + possessive pronoun</code> or <code class="bg-muted px-1 py-0.5 rounded">noun's</code>.</p>
          <ul class="list-disc list-inside space-y-2">
            <li>We met <span class="font-semibold text-primary">a cousin of hers</span> at the party. (NOT <s class="text-destructive">a her cousin</s>)</li>
            <li>Is that <span class="font-semibold text-primary">an old colleague of yours</span>?</li>
            <li><span class="font-semibold text-primary">That brilliant idea of John's</span> saved the project.</li>
          </ul>
          <p class="pt-2 text-muted-foreground"><span class="font-semibold">Teacher's Insight:</span> While "my friend" and "a friend of mine" can be similar, "a friend of mine" often implies "one of my friends" (you have more than one). It's also used when you can't say "a my friend".</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 2: Emphatic Possessive (my own house)</CardTitle>
          <CardDescription>Use "own" to emphasize that something belongs to someone and nobody else.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The structure is <code class="bg-muted px-1 py-0.5 rounded">my/your/his/her/its/our/their + own + noun</code>.</p>
          <ul class="list-disc list-inside space-y-2">
            <li>I'm tired of sharing a room. I want <span class="font-semibold text-primary">my own room</span>.</li>
            <li>She's the director of <span class="font-semibold text-primary">her own company</span>.</li>
            <li>Don't tell me the answer. I want to figure it out in <span class="font-semibold text-primary">my own way</span>.</li>
          </ul>
           <p class="pt-2 text-muted-foreground"><span class="font-semibold">Teacher's Insight:</span> Adding "own" is never just for decoration; it carries a strong feeling of independence, autonomy, or personal connection. It answers the unasked question: "And whose is it?" with a firm "Mine!".</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rule 3: Alone or Without Help (on my own / by myself)</CardTitle>
          <CardDescription>These two phrases are similar but have subtle, important differences.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>Both phrases can mean "alone" or "without any help".</p>
          <ul class="list-disc list-inside space-y-2">
            <li><span class="font-semibold">Meaning "alone":</span> He's lived <span class="font-semibold text-primary">on his own</span> since he was 18.</li>
            <li><span class="font-semibold">Meaning "without help":</span> I can't believe she built that entire website <span class="font-semibold text-primary">by herself</span>.</li>
          </ul>
          <p class="pt-2 text-muted-foreground"><span class="font-semibold">Teacher's Insight:</span> There's a nuance. <code class="bg-muted px-1 py-0.5 rounded">On my own</code> often suggests a state of being, independence, or self-reliance (e.g., living on your own). <code class="bg-muted px-1 py-0.5 rounded">By myself</code> often focuses more on completing a specific task without assistance (e.g., fixing a car by myself). In many cases, they are interchangeable.</p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the following exercises. Pay close attention to the context.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <div class="flex flex-col gap-3">
              <p class="text-sm font-medium">
                {{ index + 1 }}. ({{ question.type }})
                <span class="font-normal text-muted-foreground ml-1">{{ question.prompt }}</span>
              </p>
              <p v-if="question.initialSentence" class="italic text-muted-foreground pl-4 border-l-2 border-primary">"{{ question.initialSentence }}"</p>
              <p v-if="question.errorSentence" class="italic text-muted-foreground pl-4 border-l-2 border-destructive">"{{ question.errorSentence }}"</p>

              <div class="flex items-center gap-2">
                <Input
                  v-model="question.userAnswer"
                  :placeholder="question.hint"
                  :disabled="showResult"
                  :class="{
                    'border-green-500 focus-visible:ring-green-400': question.isCorrect === true,
                    'border-red-500 focus-visible:ring-red-400': question.isCorrect === false
                  }"
                  @keyup.enter="checkAnswers"
                />
              </div>
            </div>
            <Separator v-if="index < questions.length - 1" class="mt-6" />
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" @click="checkAnswers" class="w-full">Check Answers</Button>
          <Button v-else @click="resetTest" variant="secondary" class="w-full">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS & EXPLANATIONS                                                  -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here's a breakdown of your performance.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between items-baseline">
              <p class="text-sm font-medium">{{ feedbackMessage.title }}</p>
              <p class="text-2xl font-bold">{{ score }} / {{ totalQuestions }}</p>
            </div>
            <Progress :model-value="scorePercentage" />
            <p class="text-sm text-muted-foreground">{{ feedbackMessage.message }}</p>
          </div>
          
          <Separator />
          
          <div class="space-y-4">
             <h3 class="text-md font-semibold tracking-tight">Detailed Review</h3>
             <div v-for="question in questions.filter(q => !q.isCorrect)" :key="`result-${question.id}`">
              <Alert variant="destructive">
                <div class="flex items-start gap-4">
                  <XCircle class="h-5 w-5 mt-0.5" />
                  <div class="flex-1 space-y-2">
                    <AlertTitle>Question #{{ question.id }}</AlertTitle>
                    <AlertDescription>
                      <p class="font-medium">{{ question.prompt }}</p>
                      <p>Your answer: <span class="font-mono p-1 bg-red-100 dark:bg-red-900/50 rounded text-red-700 dark:text-red-300">{{ question.userAnswer || '""' }}</span></p>
                      <p>Correct answer(s): <span class="font-mono p-1 bg-green-100 dark:bg-green-900/50 rounded text-green-700 dark:text-green-300">{{ question.answers.join(' or ') }}</span></p>
                      <div class="mt-3 pt-3 border-t border-red-200 dark:border-red-900/60 flex gap-2 items-start">
                        <Lightbulb class="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <p class="text-xs">{{ question.explanation }}</p>
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
             </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style>
/* Add a subtle fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
