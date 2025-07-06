<!--
  File: @/pages/units/grammar/6.vue
  Unit: 6 - Be/get used to... (I'm used to...)
  Description: A comprehensive learning and practice module for a notoriously tricky grammar point.
  This page uses the GrammarLayout to present detailed material, challenging exercises, and an
  in-depth results analysis system designed for genuine comprehension and improvement.
-->
<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- This section provides the core teaching content, following a clear,     -->
    <!-- structured approach inspired by leading grammar pedagogies.             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. Understanding 'be used to + -ing'</CardTitle>
          <CardDescription>
            This structure means 'to be familiar with' or 'to be accustomed to'. It describes a state where something is no longer new or strange to you.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="font-mono text-sm rounded-md bg-muted p-4">
            Subject + <strong>be (am/is/are/was/were)</strong> + <strong>used to</strong> + <strong>noun / pronoun / -ing verb</strong>
          </div>
          <p class="leading-relaxed">
            Think of 'used to' here as an adjective phrase that means 'accustomed'. The 'to' is a preposition, not part of an infinitive, which is why it must be followed by a noun or a gerund (-ing form).
          </p>
          <ul class="list-disc space-y-2 pl-6">
            <li>"Sarah is a nurse, so she <strong>is used to seeing</strong> injuries. It doesn't shock her." <span class="text-muted-foreground ml-2">(...used to + -ing form)</span></li>
            <li>"I didn't like the city at first, but now I <strong>am used to the noise</strong>." <span class="text-muted-foreground ml-2">(...used to + noun)</span></li>
            <li>"They have lived in Alaska for 20 years, so they <strong>are used to it</strong>." <span class="text-muted-foreground ml-2">(...used to + pronoun)</span></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>B. Understanding 'get used to + -ing'</CardTitle>
          <CardDescription>
            This structure describes the <span class="font-semibold text-primary">process of becoming</span> familiar with something. It's about the change from something being strange to it being normal.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="font-mono text-sm rounded-md bg-muted p-4">
            Subject + <strong>get (get/gets/got/getting)</strong> + <strong>used to</strong> + <strong>noun / pronoun / -ing verb</strong>
          </div>
          <p class="leading-relaxed">
            'Get' signifies a change of state. You are not yet fully accustomed, but you are in the process.
          </p>
          <ul class="list-disc space-y-2 pl-6">
            <li>"It took me a while, but I eventually <strong>got used to driving</strong> on the left when I moved to the UK." <span class="text-muted-foreground ml-2">(The process is complete)</span></li>
            <li>"My new job is demanding, but I<strong>'m getting used to the pressure</strong>." <span class="text-muted-foreground ml-2">(The process is ongoing)</span></li>
            <li>"You'll find the spicy food very hot at first, but you will <strong>get used to it</strong>." <span class="text-muted-foreground ml-2">(The process will happen in the future)</span></li>
          </ul>
        </CardContent>
      </Card>

       <Card class="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle class="text-destructive">C. The Critical Distinction: vs. 'used to + infinitive'</CardTitle>
          <CardDescription class="text-destructive/90">
            This is the most common point of confusion. 'Used to + infinitive' refers exclusively to past habits or states that are no longer true. It has a completely different meaning and structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="rounded-lg border p-4">
              <h4 class="font-semibold">Be/Get Used To + -ING</h4>
              <p class="text-sm text-muted-foreground mb-2">Meaning: Accustomed to (Present/Past/Future)</p>
              <p>"I <strong>am used to living</strong> alone."</p>
              <p class="text-xs text-muted-foreground">(It's normal for me now)</p>
            </div>
            <div class="rounded-lg border p-4">
              <h4 class="font-semibold">Used To + Infinitive</h4>
              <p class="text-sm text-muted-foreground mb-2">Meaning: Past Habit/State (Only Past)</p>
              <p>"I <strong>used to live</strong> with my parents."</p>
              <p class="text-xs text-muted-foreground">(I did this in the past, but I don't now)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- A series of challenging questions designed to test nuanced understanding. -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Pay close attention to whether the situation is a current state of familiarity, a process of becoming familiar, or a past habit.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <Label :for="`q-${question.id}`">{{ index + 1 }}. {{ question.prompt }}</Label>
            <div v-if="question.type === 'fill-in'" class="flex items-center gap-2">
              <span v-if="question.prefix" class="text-sm text-muted-foreground">{{ question.prefix }}</span>
              <Input
                :id="`q-${question.id}`"
                v-model="question.userAnswer"
                type="text"
                :placeholder="question.placeholder"
                :disabled="showResult"
                class="flex-1"
                @keyup.enter="validateAnswers"
              />
               <span v-if="question.suffix" class="text-sm text-muted-foreground">{{ question.suffix }}</span>
            </div>
             <RadioGroup
              v-if="question.type === 'multiple-choice'"
              :id="`q-${question.id}`"
              v-model="question.userAnswer"
              :disabled="showResult"
            >
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2 mt-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" @click="validateAnswers">Check My Answers</Button>
          <Button v-else variant="secondary" @click="retry">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- The dynamic feedback and scoring system. This is where the learning     -->
    <!-- is reinforced.                                                          -->
    <!-- ======================================================================= -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
            Review your answers below. The explanations are key to improving your understanding.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="flex items-center gap-4">
            <p class="text-lg font-bold" :class="score.color">Score: {{ score.percentage.toFixed(0) }}%</p>
            <Progress :model-value="score.percentage" class="w-[60%]" />
            <span class="text-sm font-semibold">{{ score.text }}</span>
          </div>

          <!-- Detailed Feedback -->
          <div v-for="(question, index) in questions" :key="`res-${question.id}`" class="space-y-3 rounded-md border p-4">
            <p class="font-semibold">{{ index + 1 }}. {{ question.prompt }}</p>
            
            <div class="text-sm">
              <p>Your answer: <span :class="isCorrect(question) ? 'text-green-600' : 'text-red-600'" class="font-bold">{{ question.userAnswer || 'No answer' }}</span></p>
              <p v-if="!isCorrect(question)">Correct answer(s): <span class="font-bold text-green-700">{{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer }}</span></p>
            </div>
            
            <Alert :variant="isCorrect(question) ? 'default' : 'destructive'">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>{{ isCorrect(question) ? 'Well Done!' : 'Explanation' }}</AlertTitle>
              <AlertDescription>
                {{ question.explanation }}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/5")
}
function goToNextUnit() {
  router.push("/units/grammar/7")
}

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: "Unit 6: Be/get used to ... (I'm used to ...)",
  unitDescription: "Master the difference between being accustomed to something, the process of becoming accustomed, and past habits.",
  categories: ['Intermediate', 'Advanced', 'Common Mistakes', 'Gerunds & Infinitives'],
}

const showResult = ref(false)

const questions = reactive([
  {
    id: 1,
    type: 'fill-in',
    prompt: "When I first moved from the countryside to Tokyo, the constant crowds were a shock. Now, after three years, I ______ them.",
    prefix: "Now, after three years, I",
    suffix: "them.",
    placeholder: "am used to / got used to...",
    userAnswer: '',
    correctAnswer: "am used to",
    explanation: "The sentence describes a current state of familiarity. The speaker is now accustomed to the crowds. Therefore, 'am used to' (be + used to + noun) is correct. 'Got used to' would imply the process happened in the past, but 'am used to' better reflects the present state."
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: "Before he became a pilot, he was afraid of heights, but now he ______ in the cockpit.",
    userAnswer: '',
    options: ["is used to be", "used to being", "is used to being", "used to be"],
    correctAnswer: "is used to being",
    explanation: "This describes his current state. He is now familiar with 'being in the cockpit'. We need 'be used to + -ing'. 'Used to be' would mean he was in the cockpit in the past but isn't now, which is incorrect. 'Is used to be' incorrectly mixes the two structures."
  },
  {
    id: 3,
    type: 'fill-in',
    prompt: "I can't ______ up so early. I'm a night owl, and this 6 AM start time is killing me, but I hope I will soon.",
    prefix: "I can't",
    suffix: "up so early.",
    placeholder: "...",
    userAnswer: '',
    correctAnswer: "get used to waking",
    explanation: "The speaker is describing a difficult process of adaptation that they are currently in. 'Get used to' signifies this process. It must be followed by the -ing form, 'waking', because 'to' is a preposition here."
  },
  {
    id: 4,
    type: 'multiple-choice',
    prompt: "My grandmother ______ a computer, but now she sends emails to the entire family every day.",
    userAnswer: '',
    options: ["never used to use", "was not used to use", "did not get used to using", "never was used to using"],
    correctAnswer: "never used to use",
    explanation: "This sentence contrasts a past habit (or lack thereof) with the present. The structure for past habits is 'used to + infinitive'. The negative form is 'didn't use to' or 'never used to'. 'Was not used to use' is grammatically incorrect."
  },

  {
    id: 5,
    type: 'fill-in',
    prompt: "Although he's lived in Scotland for five years, he still hasn't ______ the cold, wet weather.",
    prefix: "he still hasn't",
    suffix: "the cold, wet weather.",
    placeholder: "...",
    userAnswer: '',
    correctAnswer: "got used to",
    explanation: "The use of 'hasn't' (present perfect) points to a process that started in the past and is still relevant. He has not completed the process of becoming familiar. Therefore, 'got used to' is the correct form to use with the present perfect to describe this incomplete adaptation."
  },
    {
    id: 6,
    type: 'multiple-choice',
    prompt: "When I was a child, I ______ spinach, but now I love it.",
    userAnswer: '',
    options: ["wasn't used to eating", "was not used to eat", "didn't use to eat", "didn't use to eating"],
    correctAnswer: "didn't use to eat",
    explanation: "This is a classic 'past habit vs. present' scenario. The correct structure for a past habit that is no longer true is the negative form 'didn't use to + infinitive (eat)'. 'Wasn't used to eating' would mean 'I wasn't accustomed to eating it', which has a slightly different, though plausible, meaning, but the most direct contrast to a past habit is 'didn't use to'."
  }
])

const isCorrect = (question: any) => {
  const userAnswer = question.userAnswer?.trim().toLowerCase();
  const correctAnswer = question.correctAnswer;
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.map(ans => ans.toLowerCase()).includes(userAnswer);
  }
  return userAnswer === correctAnswer.toLowerCase();
}

const score = computed(() => {
  const correctCount = questions.filter(isCorrect).length
  const totalCount = questions.length
  const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0

  let text = "Keep trying!"
  let color = "text-red-500"
  if (percentage > 99) {
    text = "Perfect Score!"
    color = "text-green-500"
  } else if (percentage >= 80) {
    text = "Excellent!"
    color = "text-green-500"
  } else if (percentage >= 60) {
    text = "Good Job!"
    color = "text-yellow-500"
  }

  return {
    percentage,
    text,
    color,
    correctCount,
    totalCount
  }
})

const validateAnswers = () => {
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const retry = () => {
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer = ''
  })
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style>
/* Smooth transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
