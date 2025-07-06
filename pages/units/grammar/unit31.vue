<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-vue-next'

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/24")
}

function goToNextUnit() {
  router.push("/units/grammar/26")
}

const unitData = reactive({
  material: [
    {
      type: 'heading',
      content: 'A. Must (Strong Obligation & Certainty)',
    },
    {
      type: 'paragraph',
      content: 'We use `must` when we believe something is necessary or very important. This often comes from the speaker\'s own feelings or authority.',
    },
    {
      type: 'examples',
      items: [
        { sentence: 'It\'s a fantastic film. You must see it.', explanation: 'A strong recommendation from the speaker.' },
        { sentence: 'I must stop at the store on my way home; we have no milk.', explanation: 'A personal, internal obligation.' },
        { sentence: 'To work here, all employees must sign a confidentiality agreement.', explanation: 'A firm rule or regulation.' },
      ],
    },
    {
      type: 'paragraph',
      content: '`Must` is also used for logical deduction – when you are certain something is true based on evidence.',
    },
    {
      type: 'examples',
      items: [
        { sentence: 'You haven\'t eaten all day. You must be hungry.', explanation: 'A logical conclusion.' },
        { sentence: 'The lights are on in their house, so they must be home.', explanation: 'Deduction based on observation.' },
      ],
    },
    {
      type: 'heading',
      content: 'B. Mustn\'t (Prohibition)',
    },
    {
      type: 'paragraph',
      content: '`Mustn\'t` (must not) means it is prohibited or forbidden to do something. It is very important *not* to do it.',
    },
    {
      type: 'examples',
      items: [
        { sentence: 'You are in a library. You mustn\'t shout.', explanation: 'It is against the rules.' },
        { sentence: 'You mustn\'t touch that switch. It\'s extremely dangerous.', explanation: 'A strong warning; doing so will have negative consequences.' },
        { sentence: 'I promised to keep it a secret. I mustn\'t tell anyone.', explanation: 'A strong personal commitment not to do something.' },
      ],
    },
    {
      type: 'heading',
      content: 'C. Needn\'t / Don\'t have to (Lack of Necessity)',
    },
    {
      type: 'paragraph',
      content: 'The most common point of confusion is between `mustn\'t` and `needn\'t` (or `don\'t have to`). `Needn\'t` means there is no obligation or necessity. You can do it if you want, but it is not required.',
    },
    {
      type: 'contrast',
      item1: {
        modal: 'Mustn\'t',
        sentence: 'You mustn\'t pay to enter. (It is forbidden to pay; perhaps entry is by invitation only.)',
      },
      item2: {
        modal: 'Needn\'t / Don\'t have to',
        sentence: 'You needn\'t pay to enter. (Entry is free. You can pay if you wish to donate, but it\'s not necessary.)',
      },
    },
    {
      type: 'examples',
      items: [
        { sentence: 'You can come with me, but you needn\'t come if you don\'t want to.', explanation: 'There is no obligation to come.' },
        { sentence: 'I can hear you clearly. You needn\'t shout.', explanation: 'It is not necessary to shout.' },
        { sentence: 'We have plenty of time. We needn\'t hurry.', explanation: 'There is no need to rush.' },
      ],
    },
     {
      type: 'heading',
      content: 'D. Advanced Point: Past Forms',
    },
    {
      type: 'paragraph',
      content: '`Needn\'t have + past participle` means you did something, but it was not necessary. Compare this with `didn\'t need to`, which can mean you didn\'t do it because it wasn\'t necessary.',
    },
    {
      type: 'examples',
      items: [
        { sentence: 'I needn\'t have cooked so much food. Nobody was hungry. (I cooked it, but it was a waste.)', explanation: 'Action was performed unnecessarily.' },
        { sentence: 'It started raining, so I didn\'t need to water the plants. (I did not water them because it was unnecessary.)', explanation: 'Action was not performed due to lack of necessity.' },
      ],
    },
  ],
  questions: [
    {
      id: 1,
      prompt: 'The museum entrance is free. You ___ pay to get in.',
      answers: ["needn't", "don't have to", "do not have to"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'The action (paying) is not necessary, but it is not forbidden. Therefore, `needn\'t` or `don\'t have to` is correct. `Mustn\'t` would imply that paying is prohibited.'
    },
    {
      id: 2,
      prompt: 'The baby is sleeping. We ___ make any noise.',
      answers: ["mustn't", "must not"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'Making noise is prohibited because it will have a negative consequence (waking the baby). This calls for the strong prohibition of `mustn\'t`.'
    },
    {
      id: 3,
      prompt: 'This is a valuable book. You ___ lose it. I\'ll be very upset.',
      answers: ["mustn't", "must not"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'The speaker is imposing a strong prohibition on losing the book. `Needn\'t lose it` would make no logical sense.'
    },
    {
      id: 4,
      prompt: 'He wears very expensive clothes and drives a sports car. He ___ have a lot of money.',
      answers: ["must"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'This is a logical deduction based on evidence. The speaker is almost certain that he has a lot of money, so `must` is the correct choice.'
    },
    {
      id: 5,
      prompt: 'I\'ve already finished all my tasks for the day, so I ___ stay at the office until 5 PM.',
      answers: ["needn't", "don't have to", "do not have to"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'There is no longer an obligation to stay. The speaker is free to leave, but it is not forbidden to stay. This is a classic case for `needn\'t` or `don\'t have to`.'
    },
    {
      id: 6,
      prompt: 'The sign says "No parking". You ___ leave your car here.',
      answers: ["mustn't", "must not"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'The sign indicates a clear rule or law. Parking here is forbidden, so `mustn\'t` is the only correct answer.'
    },
    {
      id: 7,
      prompt: 'I can give you a lift to the station, so you ___ take a taxi.',
      answers: ["needn't", "don't have to", "do not have to"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'Because a lift is available, taking a taxi is no longer a necessity. `Needn\'t` expresses this lack of necessity perfectly.'
    },
    {
      id: 8,
      prompt: '(Hard) I brought my umbrella, but it didn\'t rain. I ___ have bothered.',
      answers: ["needn't"],
      userAnswer: '',
      isCorrect: null,
      explanation: 'This question tests the past form. The action (bothering to bring the umbrella) was done, but in hindsight, it was unnecessary. This specific structure requires `needn\'t have + past participle`.'
    },
  ],
})

const isSubmitted = ref(false)
const showResult = ref(false)

const score = computed(() => {
  const correctAnswers = unitData.questions.filter(q => q.isCorrect).length
  return Math.round((correctAnswers / unitData.questions.length) * 100)
})

const scoreMessage = computed(() => {
  if (score.value === 100) return "Perfect Score! You have mastered this concept."
  if (score.value >= 75) return "Excellent work! You have a strong understanding."
  if (score.value >= 50) return "Good effort. Review the explanations to solidify your knowledge."
  return "Keep practicing. Read the explanations carefully to understand the rules."
})

function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim().replace(/\s+/g, ' ')
}

function validateAnswers() {
  isSubmitted.value = true
  unitData.questions.forEach(q => {
    const userAns = normalizeAnswer(q.userAnswer)
    const correctAnswers = q.answers.map(normalizeAnswer)
    q.isCorrect = correctAnswers.includes(userAns)
  })
  setTimeout(() => {
    showResult.value = true
  }, 500)
}

function resetTest() {
  isSubmitted.value = false
  showResult.value = false
  unitData.questions.forEach(q => {
    q.userAnswer = ''
    q.isCorrect = null
  })
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use - Practice"
    test-description="Based on the methodology of Raymond Murphy"
    unit-title="Unit 25: Must / Mustn't / Needn't"
    unit-description="Mastering obligation, prohibition, and lack of necessity."
    :categories="['Modal Verbs', 'Obligation', 'Intermediate B1/B2']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card v-for="(item, index) in unitData.material" :key="index">
        <CardHeader v-if="item.type === 'heading'">
          <CardTitle class="text-base font-semibold text-primary">{{ item.content }}</CardTitle>
        </CardHeader>
        <CardContent class="pt-4 text-sm">
          <p v-if="item.type === 'paragraph'" class="leading-relaxed">{{ item.content }}</p>

          <ul v-if="item.type === 'examples'" class="space-y-3">
            <li v-for="(ex, exIndex) in item.items" :key="exIndex" class="flex items-start">
              <Sparkles class="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-amber-500" />
              <div>
                <span class="font-mono text-muted-foreground">"{{ ex.sentence }}"</span>
                <p class="text-xs text-muted-foreground/80 italic pl-1">— {{ ex.explanation }}</p>
              </div>
            </li>
          </ul>

          <div v-if="item.type === 'contrast'" class="grid grid-cols-1 gap-4 md:grid-cols-2">
             <Alert variant="destructive">
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>{{ item.item1.modal }} (Prohibition)</AlertTitle>
              <AlertDescription>{{ item.item1.sentence }}</AlertDescription>
            </Alert>
             <Alert>
              <AlertCircle class="h-4 w-4" />
              <AlertTitle>{{ item.item2.modal }} (No Necessity)</AlertTitle>
              <AlertDescription>{{ item.item2.sentence }}</AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-6">
            <div v-for="(q, index) in unitData.questions" :key="q.id">
              <Label :for="`q-${q.id}`" class="block text-sm font-medium">
                {{ index + 1 }}. {{ q.prompt.split('___')[0] }}
                <Input
                  :id="`q-${q.id}`"
                  v-model="q.userAnswer"
                  type="text"
                  placeholder="type here"
                  class="inline-block w-40 mx-2"
                  :class="{
                    'border-green-500 focus-visible:ring-green-500': isSubmitted && q.isCorrect,
                    'border-red-500 focus-visible:ring-red-500': isSubmitted && !q.isCorrect
                  }"
                  :disabled="isSubmitted"
                />
                {{ q.prompt.split('___')[1] }}
              </Label>
            </div>
            <div class="flex gap-4 pt-4">
              <Button type="submit" :disabled="isSubmitted" class="w-full">
                Check Answers
              </Button>
              <Button v-if="isSubmitted" type="button" variant="outline" @click="resetTest" class="w-full">
                Try Again
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-base font-medium text-primary">{{ scoreMessage }}</span>
              <span class="text-sm font-medium text-primary">{{ score }}%</span>
            </div>
            <Progress :model-value="score" />
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Detailed Feedback</h3>
            <Alert
              v-for="q in unitData.questions"
              :key="`result-${q.id}`"
              :variant="q.isCorrect ? 'default' : 'destructive'"
              class="!border-l-4"
              :class="{
                '!border-green-600': q.isCorrect,
                '!border-red-600': !q.isCorrect
              }"
            >
              <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 mt-0.5" />
              <div class="ml-2">
                <AlertTitle class="font-bold">Question {{ q.id }}</AlertTitle>
                <AlertDescription>
                  <p class="text-sm font-mono bg-muted p-2 rounded-md my-2">
                    {{ q.prompt.replace('___', `[${q.userAnswer || 'no answer'}]`) }}
                  </p>
                  <div v-if="!q.isCorrect" class="text-xs mb-2">
                    <span class="font-semibold">Correct Answer(s):</span>
                    <span class="font-mono ml-1">{{ q.answers.join(' / ') }}</span>
                  </div>
                  <p class="text-sm leading-relaxed">{{ q.explanation }}</p>
                </AlertDescription>
              </div>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
