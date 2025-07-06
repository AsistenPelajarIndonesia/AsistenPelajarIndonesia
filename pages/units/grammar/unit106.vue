<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or auto-imported in a Nuxt 3 project with shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/39")
}

function goToNextUnit() {
  router.push("/units/grammar/41")
}

const showResult = ref(false)

const questions = reactive([
  {
    id: 1,
    type: 'fill-in',
    prompt: "The new quantum processor is incredibly fast, but it isn't quite __________ the established model in terms of stability.",
    userAnswer: '',
    correctAnswer: 'as stable as',
    explanation: "We use 'as ... as' to make equal comparisons. In the negative form, 'not as ... as' is standard. 'not so ... as' is also possible but more formal. The structure requires an adjective or adverb between 'as' and 'as'."
  },
  {
    id: 2,
    type: 'rewrite',
    prompt: "Sentence to rewrite: 'The final exam was significantly more difficult than the midterm.'",
    instruction: "Rewrite the sentence using the structure 'not as ... as'.",
    userAnswer: '',
    correctAnswer: [
      'The midterm was not as difficult as the final exam.',
      'The midterm wasn\'t as difficult as the final exam.'
    ],
    explanation: "To invert a 'more ... than' comparison, the subject and object are swapped, and the structure changes to 'not as [adjective] as'. This conveys the same meaning from a different perspective."
  },
  {
    id: 3,
    type: 'mcq',
    prompt: "My cousin is a talented programmer, but I don't think he is any more capable __________.",
    options: ['than I am', 'as me', 'than me is', 'as I am'],
    userAnswer: '',
    correctAnswer: 'than I am',
    explanation: "After 'than', we can use a subject pronoun + verb ('I am') for formal or clear comparisons. 'than me' (using an object pronoun) is common in informal speech, but 'than I am' is grammatically more precise, especially in written English. 'as me' and 'as I am' are incorrect because the sentence uses the comparative 'more capable'."
  },
  {
    id: 4,
    type: 'fill-in',
    prompt: "This new electric car costs almost __________ my old petrol one, which is surprising given the technology.",
    userAnswer: '',
    correctAnswer: 'twice as much as',
    explanation: "For comparisons of quantity or degree, we use multipliers like 'twice' or 'three times' before the 'as ... as' structure. With cost (uncountable), we use 'as much as'."
  },
  {
    id: 5,
    type: 'error-correction',
    prompt: "Identify and correct the error: 'Your new apartment is much more spacious as mine.'",
    userAnswer: '',
    correctAnswer: 'Your new apartment is much more spacious than mine.',
    explanation: "The comparative adjective 'more spacious' must be followed by 'than' for the comparison, not 'as'. 'As' is used in structures like 'as spacious as'."
  },
  {
    id: 6,
    type: 'mcq',
    prompt: "She speaks French just __________ her mother, who is a native speaker.",
    options: ['as fluently as', 'more fluently as', 'as fluent as', 'so fluently than'],
    userAnswer: '',
    correctAnswer: 'as fluently as',
    explanation: "We need an adverb ('fluently') to describe the verb 'speaks'. The correct structure for an equal comparison is 'as [adverb] as'. 'As fluent as' is incorrect because 'fluent' is an adjective."
  },
  {
    id: 7,
    type: 'rewrite',
    prompt: "Sentence to rewrite: 'No other historical epic is as visually stunning as 'Lawrence of Arabia'.'",
    instruction: "Rewrite using a superlative or a 'than' comparison without changing the meaning.",
    userAnswer: '',
    correctAnswer: [
      "'Lawrence of Arabia' is more visually stunning than any other historical epic.",
      "'Lawrence of Arabia' is the most visually stunning historical epic."
    ],
    explanation: "This tests the relationship between different forms of comparison. A 'not as...as' comparison involving 'no other' can be powerfully rephrased using a standard comparative ('more ... than') or a superlative ('the most...')."
  },
  {
    id: 8,
    type: 'fill-in',
    prompt: "The quality of this fabric is exactly __________ the one we used for the previous collection.",
    userAnswer: '',
    correctAnswer: 'the same as',
    explanation: "To state that two things are identical in a certain aspect, we use the structure 'the same as'. It is a common and important alternative to 'as ... as'. For example, 'This is the same quality as that' means 'This is as high quality as that'."
  },
])

const score = computed(() => {
  return questions.reduce((correctCount, question) => {
    const userAnswer = question.userAnswer.trim().toLowerCase().replace(/[.']/g, '')
    if (Array.isArray(question.correctAnswer)) {
      if (question.correctAnswer.some(ans => ans.toLowerCase().replace(/[.']/g, '') === userAnswer)) {
        return correctCount + 1
      }
    } else if (userAnswer === question.correctAnswer.toLowerCase().replace(/[.']/g, '')) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const totalQuestions = computed(() => questions.length)

function checkAnswers() {
  showResult.value = true
}

const isCorrect = (question: any): boolean => {
  const userAnswer = question.userAnswer.trim().toLowerCase().replace(/[.']/g, '')
  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.some((ans: string) => ans.toLowerCase().replace(/[.']/g, '') === userAnswer)
  }
  return userAnswer === question.correctAnswer.toLowerCase().replace(/[.']/g, '')
}

</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the Raymond Murphy series."
    unit-title="Unit 40: Comparative 3 (as … as / than)"
    unit-description="This unit explores nuanced comparisons, including negative forms, quantifiers, and alternatives like 'the same as'."
    :categories="['Comparatives', 'Adjectives', 'Adverbs', 'Sentence Structure']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Rule 1: Equal & Unequal Comparisons with 'as'</CardTitle>
          <CardDescription>Use 'as ... as' to show that two things are equal in some way. Use 'not as ... as' or 'not so ... as' for inequality.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <p class="font-semibold">Structure: as + adjective/adverb + as</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              - The sequel was <span class="text-primary font-medium">as entertaining as</span> the original film.<br>
              - He can run <span class="text-primary font-medium">as quickly as</span> his brother.
            </p>
          </div>
          <div>
            <p class="font-semibold">Negative Structure: not as/so + adjective/adverb + as</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              - The train is <span class="text-destructive font-medium">not as expensive as</span> the plane.<br>
              - Their new proposal is <span class="text-destructive font-medium">not so well-structured as</span> the previous one. (more formal)
            </p>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Rule 2: Standard Comparison with 'than'</CardTitle>
          <CardDescription>Use 'than' after a comparative adjective (e.g., 'older', 'more expensive') or adverb (e.g., 'faster', 'more carefully').</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <p class="font-semibold">Structure: comparative + than</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              - The Amazon River is <span class="text-primary font-medium">longer than</span> the Nile.<br>
              - She performed <span class="text-primary font-medium">better on the test than</span> anyone else.
            </p>
          </div>
          <div>
            <p class="font-semibold">Pronoun Case after 'than'</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              In formal English, use a subject pronoun + verb. In informal English, an object pronoun is common. <br>
              - Formal: You are taller <span class="text-primary font-medium">than I am</span>.<br>
              - Informal: You are taller <span class="text-primary font-medium">than me</span>.
            </p>
          </div>
        </CardContent>
      </Card>
       <Card class="w-full">
        <CardHeader>
          <CardTitle>Rule 3: Advanced Structures</CardTitle>
          <CardDescription>Combining comparisons with multipliers and using alternative phrases.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <p class="font-semibold">Multipliers: twice as ... as / three times as ... as</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              - This laptop has <span class="text-primary font-medium">twice as much RAM as</span> my old one.<br>
              - The journey took <span class="text-primary font-medium">three times as long as</span> we expected.
            </p>
          </div>
           <div>
            <p class="font-semibold">The Same As</p>
            <p class="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1">
              This structure indicates two things are identical in a specific way. <br>
              - Your salary is <span class="text-primary font-medium">the same as</span> mine. (Means: Your salary is as high as mine).<br>
              - He has <span class="text-primary font-medium">the same car as</span> his neighbor.
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Complete the following exercises. Precision is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id">
            <div class="flex flex-col gap-2">
              <Label :for="`q-${q.id}`" class="text-base">
                {{ index + 1 }}. {{ q.prompt }}
              </Label>
              <p v-if="q.instruction" class="text-sm text-muted-foreground italic">
                {{ q.instruction }}
              </p>

              <div v-if="q.type === 'mcq'" class="pt-2">
                <RadioGroup v-model="q.userAnswer">
                  <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`q-${q.id}-${option}`" :value="option" />
                    <Label :for="`q-${q.id}-${option}`" class="font-normal">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <Input
                v-else
                :id="`q-${q.id}`"
                v-model="q.userAnswer"
                type="text"
                :placeholder="q.type === 'rewrite' ? 'Your rewritten sentence...' : 'Your answer...'"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" class="w-full">Check Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Results & Explanations</CardTitle>
          <CardDescription>
            You scored {{ score }} out of {{ totalQuestions }}. Review the detailed explanations below to master the concepts.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div v-for="(q, index) in questions" :key="`result-${q.id}`">
             <Alert :variant="isCorrect(q) ? 'default' : 'destructive'">
                <div class="flex items-center gap-3">
                   <CheckCircle2 v-if="isCorrect(q)" class="h-5 w-5 text-green-500" />
                   <XCircle v-else class="h-5 w-5" />
                   <AlertTitle class="flex-1 text-base font-semibold">Question {{ index + 1 }}</AlertTitle>
                </div>

                <AlertDescription class="mt-3 space-y-3 pl-8">
                    <p class="text-muted-foreground italic">"{{ q.prompt }}"</p>
                    <div class="text-sm">
                        <span class="font-semibold">Your answer:</span>
                        <span :class="[isCorrect(q) ? 'text-green-600' : 'text-destructive', 'italic ml-2']">
                          "{{ q.userAnswer || 'No answer provided' }}"
                        </span>
                    </div>
                     <div v-if="!isCorrect(q)" class="text-sm">
                        <span class="font-semibold">Correct answer(s):</span>
                        <span class="text-green-700 italic ml-2">"{{ Array.isArray(q.correctAnswer) ? q.correctAnswer.join('" or "') : q.correctAnswer }}"</span>
                    </div>
                    <div class="p-3 bg-muted/50 rounded-md">
                        <div class="flex items-start gap-2">
                            <AlertCircle class="h-4 w-4 mt-0.5 text-blue-600"/>
                            <div>
                                <p class="font-bold text-sm">Explanation</p>
                                <p class="text-muted-foreground text-sm">{{ q.explanation }}</p>
                            </div>
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
            <Separator v-if="index < questions.length - 1" class="my-6" />
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
