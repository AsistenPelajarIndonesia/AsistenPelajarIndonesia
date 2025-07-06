<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const router = useRouter()

const showResult = ref(false)

interface Question {
  id: number
  type: 'mcq' | 'transform'
  questionText: string
  prompt?: string
  options?: { value: string; label: string }[]
  userAnswer: string | null
  correctAnswer: string | string[]
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'mcq',
    questionText: 'The rescue team searched for hours, but they found ______ who needed help. The area was completely deserted.',
    options: [
      { value: 'nobody', label: 'nobody' },
      { value: 'anybody', label: 'anybody' },
      { value: 'somebody', label: 'somebody' },
      { value: 'no one', label: 'A and D' },
    ],
    userAnswer: null,
    correctAnswer: 'nobody',
    explanation: "Both 'nobody' and 'no one' are correct as they are interchangeable. The verb 'found' is positive, so a negative pronoun is required to express the absence of people. 'Anybody' is used with negative verbs (e.g., 'they didn't find anybody').",
  },
  {
    id: 2,
    type: 'transform',
    questionText: "Transform the sentence to use a positive verb structure while keeping the same meaning: \"I don't want anything to eat, thank you.\"",
    prompt: 'I want ______ to eat, thank you.',
    userAnswer: null,
    correctAnswer: 'nothing',
    explanation: "To convey a negative meaning with a positive verb ('want'), you must use the negative pronoun 'nothing'. The structure 'verb + nothing' is equivalent to 'not + verb + anything'.",
  },
  {
    id: 3,
    type: 'mcq',
    questionText: "A: 'Which of these three consultants do you recommend?' B: '______, frankly. Their proposals were all disappointing.'",
    options: [
      { value: 'No one', label: 'No one' },
      { value: 'None', label: 'None' },
      { value: 'Nothing', label: 'Nothing' },
      { value: 'Anybody', label: 'Anybody' },
    ],
    userAnswer: null,
    correctAnswer: 'None',
    explanation: "'None' is the correct pronoun here. It is used to mean 'not one' of a specific, previously mentioned group of people or things (in this case, 'these three consultants'). 'No one' or 'nobody' refers to people in general, not a specific set.",
  },
  {
    id: 4,
    type: 'mcq',
    questionText: 'You can press ______ button to stop the alarm. It doesn\'t matter which one you choose.',
    options: [
      { value: 'no', label: 'no' },
      { value: 'none', label: 'none' },
      { value: 'any', label: 'any' },
      { value: 'some', label: 'some' },
    ],
    userAnswer: null,
    correctAnswer: 'any',
    explanation: "In an affirmative (positive) sentence, 'any' is used to signify 'it doesn't matter which'. It indicates a free choice from a set of options. 'No button' would mean it's impossible to stop the alarm.",
  },
  {
    id: 5,
    type: 'transform',
    questionText: 'Error Correction: "I searched all over the house, but my keys were nowhere to be found."',
    prompt: 'Is this sentence correct or incorrect? Explain why.',
    userAnswer: null,
    correctAnswer: 'correct',
    explanation: "This sentence is grammatically correct and idiomatic. 'Nowhere' is a negative adverb used with a positive verb ('were') to mean 'in no place'. An alternative, also correct, is '...my keys weren't anywhere to be found.' The key is to avoid the double negative: *'...weren't nowhere...' is incorrect.",
  },
  {
    id: 6,
    type: 'mcq',
    questionText: 'I’m sorry, but there is ______ reason to justify such behaviour. Your actions were completely unacceptable.',
    options: [
      { value: 'any', label: 'any' },
      { value: 'none', label: 'none' },
      { value: 'not a', label: 'not a' },
      { value: 'no', label: 'no' },
    ],
    userAnswer: null,
    correctAnswer: 'no',
    explanation: "'no' is a strong, emphatic determiner used directly before a noun. 'There is no reason' is a powerful and standard construction. While 'There isn't any reason' is also grammatically correct, 'no' provides more force and is often preferred in formal or emphatic statements.",
  },
  {
    id: 7,
    type: 'mcq',
    questionText: "He left the meeting without ______ word to ______. We were all shocked by his silence.",
    options: [
      { value: 'no / nobody', label: 'no / nobody' },
      { value: 'any / anyone', label: 'any / anyone' },
      { value: 'a / no one', label: 'a / no one' },
      { value: 'any / somebody', label: 'any / somebody' },
    ],
    userAnswer: null,
    correctAnswer: 'any / anyone',
    explanation: "The preposition 'without' creates a negative context. Therefore, we use 'any-' compounds. 'Without any word' and 'to anyone' are the correct forms. Using 'no' or 'nobody' would create a double negative (e.g., 'without no word'), which is incorrect.",
  },
  {
    id: 8,
    type: 'transform',
    questionText: 'Combine the ideas into one sentence using a compound pronoun: "He didn\'t say a single thing. He didn\'t look at a single person."',
    prompt: 'He said ______ and looked at ______.',
    userAnswer: null,
    correctAnswer: ['nothing / no one', 'nothing / nobody'],
    explanation: "To combine these negative ideas efficiently, we use positive verbs ('said', 'looked') with negative pronouns. 'He said nothing' is the natural equivalent of 'He didn't say anything'. 'He looked at no one/nobody' is the equivalent of 'He didn't look at anyone'.",
  },
]);

const checkAnswers = () => {
  questions.value.forEach((q) => {
    if (q.userAnswer) {
      const userAnswerCleaned = q.userAnswer.trim().toLowerCase();
      if (Array.isArray(q.correctAnswer)) {
        q.isCorrect = q.correctAnswer.includes(userAnswerCleaned);
      } else {
        q.isCorrect = userAnswerCleaned === q.correctAnswer.toLowerCase();
      }
    } else {
      q.isCorrect = false;
    }
  });
  showResult.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const resetTest = () => {
  showResult.value = false
  questions.value.forEach((q) => {
    q.userAnswer = null
    q.isCorrect = undefined
  })
}

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const totalQuestions = computed(() => questions.value.length)

const scorePercentage = computed(() => {
  return Math.round((score.value / totalQuestions.value) * 100)
})

function goToPreviousUnit() {
  router.push("/units/grammar/18")
}

function goToNextUnit() {
  router.push("/units/grammar/20")
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate-Advanced Grammar Practice"
    test-description="Based on 'English Grammar in Use' methodology"
    unit-title="Unit 19: No / none / any & Compounds"
    unit-description="Mastering negative and indefinite pronouns and determiners in complex contexts."
    :categories="['Pronouns', 'Determiners', 'Negation', 'Quantifiers']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: The Negative Spectrum</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>This unit tackles the often-confusing choice between 'no', 'none', and 'any', along with their compound forms (nothing, nobody, etc.). The key is understanding their roles and the type of sentence they appear in.</p>
          
          <div class="rounded-lg border bg-card p-4">
            <h4 class="font-bold">1. `no` (Determiner)</h4>
            <p class="text-muted-foreground">Use `no` directly before a noun in a sentence with a <span class="font-semibold text-primary">positive verb</span> to make the noun phrase negative. It is strong and direct.</p>
            <ul class="mt-2 list-inside list-disc pl-2 space-y-1">
              <li><span class="font-mono">I have <strong class="text-destructive">no</strong> time.</span> (Means: I don't have any time.)</li>
              <li><span class="font-mono">There is <strong class="text-destructive">no</strong> reason to worry.</span> (More emphatic than 'There isn't any reason...')</li>
            </ul>
          </div>

          <div class="rounded-lg border bg-card p-4">
            <h4 class="font-bold">2. `none` (Pronoun)</h4>
            <p class="text-muted-foreground">Use `none` alone, without a noun, to replace `no + noun`. It answers the question 'How much/many?'.</p>
            <ul class="mt-2 list-inside list-disc pl-2 space-y-1">
              <li><span class="font-mono">"How many tickets are left?" → "<strong class="text-destructive">None</strong>."</span></li>
              <li><span class="font-mono"><strong class="text-destructive">None</strong> of my friends understood the joke.</span> (Used with 'of' before a specific group).</li>
            </ul>
          </div>

          <div class="rounded-lg border bg-card p-4">
            <h4 class="font-bold">3. `any` (Determiner/Pronoun)</h4>
            <p class="text-muted-foreground">The function of `any` changes with sentence type.</p>
            <ul class="mt-2 list-inside list-disc pl-2 space-y-1">
              <li><strong>Negative Sentences:</strong> <span class="font-mono">I ca<strong class="text-destructive">n't</strong> find <strong class="text-blue-600">any</strong> flaws in your logic.</span></li>
              <li><strong>Questions:</strong> <span class="font-mono">Is there <strong class="text-blue-600">any</strong> milk?</span></li>
              <li><strong>Affirmative Sentences:</strong> Means 'it doesn't matter which'. <span class="font-mono">You can take <strong class="text-blue-600">any</strong> seat.</span></li>
            </ul>
          </div>

          <div class="rounded-lg border bg-card p-4">
            <h4 class="font-bold">4. Compound Words & The Golden Rule</h4>
            <p class="text-muted-foreground">Avoid double negatives. A single English clause should only have one negative element.</p>
            <ul class="mt-2 list-inside list-disc pl-2 space-y-1">
              <li><strong>With Positive Verbs (+):</strong> Use `no-` compounds: <span class="font-mono">She said <strong class="text-destructive">nothing</strong>.</span> <span class="font-mono"><strong class="text-destructive">Nobody</strong> came.</span></li>
              <li><strong>With Negative Verbs (-):</strong> Use `any-` compounds: <span class="font-mono">She did<strong class="text-destructive">n't</strong> say <strong class="text-blue-600">anything</strong>.</span> <span class="font-mono">I have<strong class="text-destructive">n't</strong> seen <strong class="text-blue-600">anyone</strong>.</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Read each question carefully and select the most appropriate answer. Precision is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ q.questionText }}</p>
            
            <div v-if="q.type === 'mcq'">
              <RadioGroup v-model="q.userAnswer" class="space-y-2">
                <div v-for="option in q.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${q.id}-${option.value}`" :value="option.value" />
                  <Label :for="`${q.id}-${option.value}`">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div v-if="q.type === 'transform'" class="flex flex-col space-y-2">
              <Label v-if="q.prompt" :for="`input-${q.id}`" class="text-muted-foreground italic">{{ q.prompt }}</Label>
              <input :id="`input-${q.id}`" v-model="q.userAnswer" type="text" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
          </div>
          
          <Button class="w-full" @click="checkAnswers">
            Check My Answers
          </Button>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <Card class="border-primary/50">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>You scored <span class="font-bold text-primary">{{ score }} out of {{ totalQuestions }}</span> ({{ scorePercentage }}%). Review the detailed explanations below to enhance your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="`result-${q.id}`">
            <Alert :variant="q.isCorrect ? 'default' : 'destructive'" class="bg-muted/30">
              <div class="flex items-start gap-3">
                <template v-if="q.isCorrect">
                  <CheckCircle2 class="h-5 w-5 text-green-500" />
                </template>
                <template v-else>
                   <XCircle class="h-5 w-5 text-destructive" />
                </template>
                <div class="flex-1">
                  <AlertTitle>Question {{ index + 1 }} - {{ q.isCorrect ? "Correct" : "Incorrect" }}</AlertTitle>
                  <AlertDescription class="mt-2 space-y-4">
                    <p class="italic">"{{ q.questionText }}"</p>
                    
                    <div class="rounded-md border p-3" :class="[q.isCorrect ? 'border-green-500/50' : 'border-destructive/50']">
                      <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your Answer</p>
                      <p class="font-semibold">{{ q.userAnswer || "No answer provided" }}</p>
                    </div>

                    <div v-if="!q.isCorrect" class="rounded-md border border-green-500/50 p-3">
                      <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Correct Answer</p>
                      <p class="font-semibold">{{ Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer }}</p>
                    </div>
                    
                    <div class="rounded-md border border-blue-500/30 bg-blue-500/10 p-3">
                      <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-blue-800 dark:text-blue-300">
                        <HelpCircle class="h-4 w-4" />
                        Explanation
                      </p>
                      <p class="mt-2 text-sm text-foreground">{{ q.explanation }}</p>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
          <Button variant="outline" class="w-full" @click="resetTest">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
.font-mono {
  font-family: 'Courier New', Courier, monospace;
  background-color: rgba(180, 180, 180, 0.1);
  padding: 0.1em 0.3em;
  border-radius: 4px;
}
</style>
