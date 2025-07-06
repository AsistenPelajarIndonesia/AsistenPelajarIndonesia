<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or imported from your UI library (e.g., shadcn-vue)
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

// --- Page & Unit Metadata ---
const pageData = reactive({
  testTitle: 'English Grammar In Use: Practice',
  testDescription: 'Interactive exercises based on the best-selling book by Raymond Murphy.',
  unitTitle: 'Unit 1: Past Simple (I did)',
  unitDescription: 'Used for finished actions, states, or habits in the past. We form it with the past tense of the verb (e.g., worked, saw, went). For negatives and questions, we use the auxiliary verb "did".',
  categories: ['Tense', 'Past Simple', 'A1-B1 Level'],
})

// --- Practice Questions Data ---
// These questions are designed to be challenging, testing irregular verbs, spelling, and auxiliary usage.
const questions = ref([
  {
    id: 1,
    prompt: "Wolfgang Amadeus Mozart (compose) more than 600 pieces of music. He (start) composing at the age of five and (write) his first symphony at eight.",
    blanks: 3,
    correctAnswers: [['composed'], ['started'], ['wrote']],
    explanation: "All three verbs describe completed actions in Mozart's life, which is finished. 'Compose' and 'start' are regular verbs (+ed). 'Write' is an irregular verb, and its past simple form is 'wrote'.",
  },
  {
    id: 2,
    prompt: "I was in a hurry, so I (not / have) time to phone you. Sorry!",
    blanks: 1,
    correctAnswers: [['did not have', "didn't have"]],
    explanation: "To make a negative sentence in the past simple, we use 'did not' (or 'didn't') followed by the base form of the verb (have), not the past form (had).",
  },
  {
    id: 3,
    prompt: "'(you / go) to the cinema alone?' 'No, I went with a friend.'",
    blanks: 1,
    correctAnswers: [['Did you go']],
    explanation: "For questions in the past simple, we start with 'Did', followed by the subject ('you'), and then the base form of the verb ('go'). The main verb does not change to the past tense.",
  },
  {
    id: 4,
    prompt: "The police (stop) me on my way home last night because one of my lights wasn't working.",
    blanks: 1,
    correctAnswers: [['stopped']],
    explanation: "This is a regular verb. For verbs ending in a single vowel + a single consonant (like 'stop'), we double the final consonant before adding -ed.",
  },
  {
    id: 5,
    prompt: "She (not / study) for the exam, which is why she (find) it very difficult.",
    blanks: 2,
    correctAnswers: [['did not study', "didn't study"], ['found']],
    explanation: "The first part is a negative, requiring 'did not' + the base verb 'study'. Note the spelling change from 'study' to 'studied' does not apply here. The second part is a positive statement with the irregular verb 'find', whose past form is 'found'.",
  },
  {
    id: 6,
    prompt: "It was a fantastic holiday. The hotel (be) very comfortable and the food (cost) very little.",
    blanks: 2,
    correctAnswers: [['was'], ['cost']],
    explanation: "The past simple of 'be' is 'was' (for I/he/she/it) or 'were' (for you/we/they). The verb 'cost' is an irregular verb where the past simple form is the same as the base form.",
  },
])

// --- Reactive State Management ---
const initializeAnswers = () => {
  const answers: string[][] = []
  questions.value.forEach(q => {
    answers.push(new Array(q.blanks).fill(''))
  })
  return answers
}

const userAnswers = ref<string[][]>(initializeAnswers())
const isSubmitted = ref(false)
const showResult = ref(false)

// --- Helper & Navigation Functions ---
function goToPreviousUnit() {
  // In a real app, this would check if unit 0 exists or go to an index
  alert('Navigating to the grammar index. (Unit 0 does not exist)')
  router.push("/units/grammar") 
}

function goToNextUnit() {
  router.push("/units/grammar/2")
}

function handleSubmit() {
  if (isSubmitted.value) return
  isSubmitted.value = true
  setTimeout(() => {
    showResult.value = true
  }, 100) // Small delay for a smoother transition
}

function resetTest() {
  userAnswers.value = initializeAnswers()
  isSubmitted.value = false
  showResult.value = false
}

const normalizeAnswer = (answer: string) => answer.trim().toLowerCase()

const checkAnswer = (userAnswer: string, correctAnswers: string[]) => {
  const normalizedUserAnswer = normalizeAnswer(userAnswer)
  return correctAnswers.some(correct => normalizeAnswer(correct) === normalizedUserAnswer)
}

// --- Computed Properties for Validation & Results ---
const results = computed(() => {
  if (!isSubmitted.value) return []

  return questions.value.map((q, qIndex) => {
    const questionResults = []
    let correctInQuestion = 0
    for (let i = 0; i < q.blanks; i++) {
      const isCorrect = checkAnswer(userAnswers.value[qIndex][i], q.correctAnswers[i])
      if (isCorrect) correctInQuestion++
      questionResults.push({
        userAnswer: userAnswers.value[qIndex][i],
        correctAnswers: q.correctAnswers[i],
        isCorrect: isCorrect,
      })
    }
    
    return {
      id: q.id,
      prompt: q.prompt,
      explanation: q.explanation,
      isCompletelyCorrect: correctInQuestion === q.blanks,
      breakdown: questionResults,
    }
  })
})

const totalBlanks = computed(() => questions.value.reduce((sum, q) => sum + q.blanks, 0))

const score = computed(() => {
  if (!isSubmitted.value) return 0
  return results.value.reduce((totalScore, result) => {
    return totalScore + result.breakdown.filter(b => b.isCorrect).length
  }, 0)
})

const scorePercentage = computed(() => {
  if (totalBlanks.value === 0) return 0
  return Math.round((score.value / totalBlanks.value) * 100)
})

const feedbackMessage = computed(() => {
  if (!isSubmitted.value) return { title: '', message: '', variant: 'default' }
  const percentage = scorePercentage.value
  if (percentage === 100) {
    return { title: 'Flawless!', message: 'Excellent work! You have a perfect understanding of the Past Simple. Keep this momentum going!', variant: 'success' }
  } else if (percentage >= 75) {
    return { title: 'Great Job!', message: 'You have a strong grasp of this topic. Review the explanations for any mistakes to solidify your knowledge.', variant: 'default' }
  } else if (percentage >= 50) {
    return { title: 'Good Effort!', message: 'You\'re on the right track. Pay close attention to the explanations below. Repetition is key!', variant: 'default' }
  } else {
    return { title: 'Needs Review', message: 'Don\'t worry, this is a learning opportunity. Carefully study the explanations for each question and try the exercise again.', variant: 'destructive' }
  }
})

</script>

<template>
  <GrammarLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> Core Concepts: Past Simple</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>We use the <strong>Past Simple</strong> to talk about actions and situations in the past. These are things that are now <strong>finished</strong>.</p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>Regular Verbs:</strong> Add <strong>-ed</strong> to the base form. <br><em>Example: work → <code class="font-semibold">worked</code>, stay → <code class="font-semibold">stayed</code>, arrive → <code class="font-semibold">arrived</code></em></li>
            <li><strong>Spelling Rules:</strong> For verbs ending in <strong>-y</strong>, change to <strong>-ied</strong> (study → <code class="font-semibold">studied</code>). For verbs ending in consonant-vowel-consonant, double the final consonant (stop → <code class="font-semibold">stopped</code>).</li>
            <li><strong>Irregular Verbs:</strong> These do not follow a rule and must be learned. <br><em>Example: go → <code class="font-semibold">went</code>, see → <code class="font-semibold">saw</code>, buy → <code class="font-semibold">bought</code>, know → <code class="font-semibold">knew</code></em></li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Negatives and Questions</CardTitle>
          <CardDescription>The structure changes when we use the auxiliary verb <strong>did</strong>.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p class="font-semibold">Key Rule:</p>
          <Alert variant="destructive">
            <Info class="h-4 w-4" />
            <AlertTitle>Important!</AlertTitle>
            <AlertDescription>
              After <strong>did</strong>, <strong>didn't</strong>, or in a question with <strong>Did...?</strong>, we always use the <strong>base form</strong> of the verb (e.g., go, see, play), NOT the past form (<s>went</s>, <s>saw</s>, <s>played</s>).
            </AlertDescription>
          </Alert>
          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-semibold">Negative (did not / didn't)</h4>
              <ul class="list-disc space-y-1 pl-5">
                <li>I <strong>didn't see</strong> you. (<em>not</em> <s>I didn't saw</s>)</li>
                <li>They <strong>didn't go</strong> out. (<em>not</em> <s>They didn't went</s>)</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Question (Did...?)</h4>
              <ul class="list-disc space-y-1 pl-5">
                <li><strong>Did you see</strong> him? (<em>not</em> <s>Did you saw</s>)</li>
                <li>When <strong>did they go</strong>? (<em>not</em> <s>When did they went</s>)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 1: Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. Use the verb in brackets to form the Past Simple.</CardDescription>
        </CardHeader>
        <form @submit.prevent="handleSubmit">
          <CardContent class="space-y-6">
            <div v-for="(question, qIndex) in questions" :key="question.id" class="space-y-2">
              <p>
                <span class="mr-2 font-semibold text-primary">{{ qIndex + 1 }}.</span>
                <template v-for="(part, pIndex) in question.prompt.split(/\((.*?)\)/)" :key="pIndex">
                  <template v-if="pIndex % 2 === 0">{{ part }}</template>
                  <template v-else>
                    <Input
                      :value="userAnswers[qIndex][Math.floor(pIndex/2)]"
                      @update:model-value="val => userAnswers[qIndex][Math.floor(pIndex/2)] = val"
                      :disabled="isSubmitted"
                      class="mx-1 inline-block w-32"
                      :placeholder="part"
                    />
                  </template>
                </template>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" :disabled="isSubmitted" class="w-full">
              Check Answers
            </Button>
          </CardFooter>
        </form>
      </Card>
    </template>

    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here's a detailed breakdown of your performance. Review the explanations to learn from your mistakes.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Alert :variant="feedbackMessage.variant">
            <component :is="feedbackMessage.variant === 'success' ? CheckCircle2 : feedbackMessage.variant === 'destructive' ? XCircle : Info" class="h-4 w-4" />
            <AlertTitle>{{ feedbackMessage.title }}</AlertTitle>
            <AlertDescription>{{ feedbackMessage.message }}</AlertDescription>
          </Alert>
          <div class="flex items-center gap-4">
            <span class="text-sm font-medium">Score: {{ score }} / {{ totalBlanks }}</span>
            <Progress :model-value="scorePercentage" class="flex-1" />
            <span class="text-lg font-bold">{{ scorePercentage }}%</span>
          </div>

          <Accordion type="single" collapsible class="w-full">
            <h3 class="my-4 text-lg font-semibold">Detailed Question Review</h3>
            <AccordionItem v-for="(result, index) in results" :key="result.id" :value="`item-${result.id}`">
              <AccordionTrigger 
                class="text-left" 
                :class="{
                  'text-green-600 hover:text-green-700': result.isCompletelyCorrect, 
                  'text-red-600 hover:text-red-700': !result.isCompletelyCorrect
                }"
              >
                <div class="flex items-center gap-2">
                  <component :is="result.isCompletelyCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 flex-shrink-0" />
                  <span>Question {{ index + 1 }}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent class="space-y-4 pt-4">
                <p class="text-sm text-muted-foreground">Original sentence with your answers:</p>
                <div class="rounded-md border bg-muted p-3 text-sm">
                  <template v-for="(part, pIndex) in result.prompt.split(/\(.*?\)/)" :key="pIndex">
                    {{ part }}
                    <strong v-if="pIndex < result.breakdown.length"
                      :class="{
                        'text-green-700': result.breakdown[pIndex].isCorrect,
                        'text-red-700': !result.breakdown[pIndex].isCorrect
                      }"
                    >
                      {{ result.breakdown[pIndex].userAnswer || '___' }}
                    </strong>
                  </template>
                </div>

                <div v-for="(breakdown, bIndex) in result.breakdown" :key="bIndex" class="border-l-4 pl-4" :class="[breakdown.isCorrect ? 'border-green-500' : 'border-red-500']">
                  <p>Your Answer (Blank #{{ bIndex + 1 }}): <code class="font-semibold">{{ breakdown.userAnswer || '(empty)' }}</code></p>
                  <p>Correct Answer(s): <code class="font-semibold text-green-700">{{ breakdown.correctAnswers.join(' / ') }}</code></p>
                </div>
                
                <Alert>
                  <Info class="h-4 w-4" />
                  <AlertTitle>Grammar Explanation</AlertTitle>
                  <AlertDescription>
                    {{ result.explanation }}
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </CardContent>
        <CardFooter>
          <Button @click="resetTest" variant="outline" class="w-full">
            Try This Unit Again
          </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
