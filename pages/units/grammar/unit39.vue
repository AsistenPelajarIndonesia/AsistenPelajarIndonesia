<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpenCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false, 
})

const router = useRouter()

const unitDetails = {
  testTitle: "Advanced English Grammar in Use",
  testDescription: "Based on the methodology of Raymond Murphy's acclaimed series.",
  unitTitle: "Unit 6: If I had known …; I wish I had known …",
  unitDescription: "Mastering the Third Conditional and expressing past regrets with 'wish'. This unit focuses on hypothetical situations in the past that did not happen.",
  categories: ["Conditionals", "Past Perfect", "Hypothetical Past", "Regret"],
  unitNumber: 6
}

const questions = ref([
  {
    id: 1,
    type: 'multiple-choice',
    text: "I didn't see you when you passed me in the street. If I ____ you, I would have said hello.",
    options: [
      { value: 'saw', label: 'saw' },
      { value: 'had seen', label: 'had seen' },
      { value: 'would see', label: 'would see' },
      { value: 'have seen', label: 'have seen' }
    ],
    correctAnswer: 'had seen',
    userAnswer: '',
    explanation: "The Third Conditional is used for unreal past situations. The structure is 'If + Past Perfect (had + past participle), ...would have + past participle'. The situation is that I did not see you, so the correct unreal past condition is 'If I had seen you...'"
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "They crashed their car because the road was icy. They ____ if the road ____ so slippery.",
    options: [
      { value: 'wouldn\'t crash / wasn\'t', label: 'wouldn\'t crash / wasn\'t' },
      { value: 'didn\'t crash / hadn\'t been', label: 'didn\'t crash / hadn\'t been' },
      { value: 'wouldn\'t have crashed / hadn\'t been', label: 'wouldn\'t have crashed / hadn\'t been' },
      { value: 'hadn\'t crashed / wouldn\'t have been', label: 'hadn\'t crashed / wouldn\'t have been' }
    ],
    correctAnswer: 'wouldn\'t have crashed / hadn\'t been',
    userAnswer: '',
    explanation: "This question requires both clauses of the Third Conditional. The result clause is '...would not have crashed' and the condition clause is '...if the road had not been'. This correctly describes the unreal past scenario where the road was not slippery, leading to no crash."
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "I regret not accepting the job offer in London. I ____ I ____ it.",
    options: [
      { value: 'wish / had accepted', label: 'wish / had accepted' },
      { value: 'wished / accepted', label: 'wished / accepted' },
      { value: 'wish / accepted', label: 'wish / accepted' },
      { value: 'wished / would accept', label: 'wished / would accept' }
    ],
    correctAnswer: 'wish / had accepted',
    userAnswer: '',
    explanation: "To express regret about a past action (or inaction), we use 'I wish + Past Perfect (had + past participle)'. The regret is felt now ('I wish'), about something that happened in the past ('not accepting the job'). Therefore, 'I wish I had accepted it' is the correct form."
  },
  {
    id: 4,
    type: 'multiple-choice',
    text: "The presentation was a disaster. He was completely unprepared. He ____ a better impression if he ____ more.",
    options: [
      { value: 'could make / prepared', label: 'could make / prepared' },
      { value: 'might have made / had prepared', label: 'might have made / had prepared' },
      { value: 'would make / would have prepared', label: 'would make / would have prepared' },
      { value: 'had made / prepared', label: 'had made / prepared' }
    ],
    correctAnswer: 'might have made / had prepared',
    userAnswer: '',
    explanation: "'Might have' and 'could have' can be used instead of 'would have' in the result clause to express a past possibility, not a certainty. The sentence means there was a chance of a better impression if the past condition (preparation) had been met. The structure remains 'if + past perfect'."
  },
    {
    id: 5,
    type: 'multiple-choice',
    text: "She feels lonely now. She wishes she ____ to her new city last year.",
    options: [
      { value: 'didn\'t move', label: 'didn\'t move' },
      { value: 'wouldn\'t move', label: 'wouldn\'t move' },
      { value: 'hadn\'t moved', label: 'hadn\'t moved' },
      { value: 'hasn\'t moved', label: 'hasn\'t moved' }
    ],
    correctAnswer: 'hadn\'t moved',
    userAnswer: '',
    explanation: "This is another example of expressing past regret. The action of moving happened in the past ('last year'). To express a wish that this past event was different, we use 'wish + past perfect'. 'I wish I hadn't moved' means 'I regret moving'."
  }
])

const isSubmitted = ref(false)
const showResult = ref(false)

const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => q.userAnswer !== '')
})

const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.reduce((count, question) => {
    return count + (question.userAnswer === question.correctAnswer ? 1 : 0)
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

function checkAnswers() {
  if (allQuestionsAnswered.value) {
    isSubmitted.value = true
    showResult.value = true
    // Scroll to the results section for better UX
    setTimeout(() => {
        const resultElement = document.getElementById('results-section');
        if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  }
}

function resetQuiz() {
  isSubmitted.value = false
  showResult.value = false
  questions.value.forEach(q => q.userAnswer = '')
}

function goToPreviousUnit() {
  router.push(`/units/grammar/${unitDetails.unitNumber - 1}`)
}

function goToNextUnit() {
  router.push(`/units/grammar/${unitDetails.unitNumber + 1}`)
}
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-blue-900 dark:text-blue-300">
            <BookOpenCheck class="h-6 w-6" />
            Core Concept: The Third Conditional
          </CardTitle>
          <CardDescription>
            For imagining a different past. We use it to talk about things that <span class="font-semibold text-destructive">did not happen</span>.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">Structure:</h4>
            <p class="text-sm font-mono p-2 bg-muted rounded-md">If + <span class="text-purple-600 dark:text-purple-400">Past Perfect</span>, ... <span class="text-teal-600 dark:text-teal-400">would have</span> + <span class="text-orange-600 dark:text-orange-400">Past Participle</span>.</p>
          </div>
          <div>
            <h4 class="font-semibold">Example:</h4>
            <p class="italic text-muted-foreground">"If I <span class="text-purple-600 dark:text-purple-400">had studied</span>, I <span class="text-teal-600 dark:text-teal-400">would have</span> <span class="text-orange-600 dark:text-orange-400">passed</span> the exam."</p>
            <p class="text-xs mt-1">
              <span class="font-bold">Reality:</span> I didn't study, so I didn't pass.
            </p>
          </div>
          <div>
            <h4 class="font-semibold">Variations:</h4>
            <p class="text-sm">You can use <code class="font-semibold">could have</code> or <code class="font-semibold">might have</code> to show possibility instead of certainty.</p>
            <p class="italic text-muted-foreground text-sm">"If we had left earlier, we <span class="font-semibold">might have</span> caught the train."</p>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-green-900 dark:text-green-300">
            <BookOpenCheck class="h-6 w-6" />
            Core Concept: Expressing Regret with 'Wish'
          </CardTitle>
          <CardDescription>
            For saying you regret something that happened or didn't happen in the past.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <h4 class="font-semibold">Structure:</h4>
            <p class="text-sm font-mono p-2 bg-muted rounded-md">I wish + <span class="text-purple-600 dark:text-purple-400">Past Perfect</span>.</p>
          </div>
          <div>
            <h4 class="font-semibold">Example:</h4>
            <p class="italic text-muted-foreground">"I wish I <span class="text-purple-600 dark:text-purple-400">had known</span> you were ill."</p>
            <p class="text-xs mt-1">
              <span class="font-bold">Reality:</span> I didn't know you were ill, and I regret that.
            </p>
          </div>
           <div>
            <h4 class="font-semibold">Connection:</h4>
            <p class="text-sm">Notice the powerful link: "I wish I had known" carries the same core meaning as the 'if' clause "If I had known...". Both introduce a past condition that was not true.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Read each situation carefully and choose the most appropriate option.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p><span class="font-bold mr-2">{{ index + 1 }}.</span>{{ question.text }}</p>
            <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="option in question.options" :key="option.value">
                <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" class="peer sr-only" />
                <Label
                  :for="`${question.id}-${option.value}`"
                  class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {{ option.label }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || isSubmitted" class="w-full">
            {{ isSubmitted ? 'Answers Submitted' : 'Check Answers' }}
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review your performance below. Understanding your mistakes is the key to improvement.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-center gap-4 rounded-lg border p-4">
              <div class="flex-1 space-y-2">
                <p class="text-sm font-medium">Overall Score</p>
                <h3 class="text-2xl font-bold">{{ score }} / {{ questions.length }} correct</h3>
              </div>
              <div class="relative h-24 w-24">
                <svg class="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-gray-700" stroke-width="2"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-primary" stroke-width="2" stroke-dasharray="100" :stroke-dashoffset="100 - scorePercentage" stroke-linecap="round" transform="rotate(-90 18 18)"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {{ scorePercentage }}%
                </div>
              </div>
            </div>
            
            <div v-for="(question, index) in questions" :key="`result-${question.id}`">
              <Alert :variant="question.userAnswer === question.correctAnswer ? 'default' : 'destructive'" class="bg-opacity-20">
                <template v-if="question.userAnswer === question.correctAnswer">
                  <CheckCircle2 class="h-5 w-5 text-green-600" />
                  <AlertTitle class="text-green-800 dark:text-green-300">Correct!</AlertTitle>
                </template>
                <template v-else>
                  <XCircle class="h-5 w-5" />
                  <AlertTitle>Incorrect</AlertTitle>
                </template>
                
                <AlertDescription class="mt-2 space-y-3">
                  <p class="font-semibold text-foreground">{{ index + 1 }}. {{ question.text }}</p>
                  <div class="text-sm">
                    <p>Your answer: <span :class="question.userAnswer === question.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-destructive'">"{{ question.userAnswer }}"</span></p>
                    <p>Correct answer: <span class="font-bold text-primary">"{{ question.correctAnswer }}"</span></p>
                  </div>
                  <div class="mt-2 rounded-md border bg-muted p-3">
                    <h4 class="font-bold text-sm text-foreground">Teacher's Explanation:</h4>
                    <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="resetQuiz" variant="outline" class="w-full">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
