<!--
  File: @/pages/units/grammar/2.vue
  Description: An advanced grammar practice module for Unit 2: "To..., For..., and So that...".
  This page integrates rich educational content with a challenging, interactive quiz
  and a detailed results validator, all within the provided GrammarLayout.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// We'll leverage a rich set of UI components for a polished and intuitive user experience.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, HelpCircle, Repeat } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push('/units/grammar/1')
const goToNextUnit = () => router.push('/units/grammar/3')

// --- Reactive State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<string, string | null>>({})

interface Question {
  id: string
  type: 'mcq'
  questionText: string
  options: { value: string; label: string }[]
  correctAnswer: string
  explanation: string
}

// --- Content & Questions Data Store ---
// This is the core pedagogical content, structured for maximum learning impact.
const unitData = {
  title: 'Unit 2: Expressing Purpose',
  description: 'Mastering the art of explaining "why" with \'to\', \'for\', and \'so that\'.',
  categories: ['Purpose Clauses', 'Infinitives', 'Prepositions'],
  questions: ref<Question[]>([
    {
      id: 'q1',
      type: 'mcq',
      questionText: 'He\'s taking private lessons ___ his cello playing skills.',
      options: [
        { value: 'a', label: 'for to improve' },
        { value: 'b', label: 'to improve' },
        { value: 'c', label: 'for improving' },
        { value: 'd', label: 'so that improving' },
      ],
      correctAnswer: 'b',
      explanation: 'The infinitive of purpose \'to + verb\' is used to express the reason for an action. "For to..." is incorrect. "For improving" describes the purpose of a thing (e.g., "a course for improving skills"), not the direct purpose of a person\'s action.',
    },
    {
      id: 'q2',
      type: 'mcq',
      questionText: 'I wrote down the address ___ I wouldn\'t forget it.',
      options: [
        { value: 'a', label: 'for' },
        { value: 'b', label: 'to' },
        { value: 'c', label: 'so that' },
        { value: 'd', label: 'in order for' },
      ],
      correctAnswer: 'c',
      explanation: '\'So that\' is required here because the purpose clause has its own subject (\'I\') and a modal verb (\'wouldn\'t\'). It introduces a full clause explaining the purpose. \'To\' would be incorrect as it must be followed by a verb, not a new subject-verb clause.',
    },
    {
      id: 'q3',
      type: 'mcq',
      questionText: 'This digital keycard is used ___ access to the server room.',
      options: [
        { value: 'a', label: 'for gaining' },
        { value: 'b', label: 'to gain' },
        { value: 'c', label: 'so that gain' },
        { value: 'd', label: 'both a and b are correct' },
      ],
      correctAnswer: 'd',
      explanation: 'This is a challenging question. When describing the purpose of an *object*, both \'to + verb\' and \'for + -ing\' can be correct. "The keycard is used to gain access" (action) and "This is a keycard for gaining access" (purpose of the thing) are both idiomatic and correct structures.',
    },
    {
      id: 'q4',
      type: 'mcq',
      questionText: 'She moved to a smaller apartment ___ money.',
      options: [
        { value: 'a', label: 'for saving' },
        { value: 'b', label: 'for to save' },
        { value: 'c', label: 'to save' },
        { value: 'd', label: 'so that she saving' },
      ],
      correctAnswer: 'c',
      explanation: 'The purpose of her action (\'moved\') is directly stated with an infinitive of purpose: \'to save\'. \'For saving\' is less direct and would typically follow a noun, e.g., "She has a plan for saving money." It doesn\'t fit as the direct reason for the verb \'moved\'.',
    },
    {
      id: 'q5',
      type: 'mcq',
      questionText: 'He turned down the music ___ disturb the neighbours.',
      options: [
        { value: 'a', label: 'to not' },
        { value: 'b', label: 'not to' },
        { value: 'c', label: 'for not' },
        { value: 'd', label: 'so that not to' },
      ],
      correctAnswer: 'b',
      explanation: 'The correct negative form of the infinitive of purpose is \'not to + verb\'. Alternatives like "in order not to" or "so as not to" are also correct but \'not to\' is the most common and concise form.',
    },
     {
      id: 'q6',
      type: 'mcq',
      questionText: 'I\'ll need to buy some special glue ___ repairing this antique vase.',
      options: [
        { value: 'a', label: 'for' },
        { value:- 'b', label: 'to' },
        { value: 'c', label: 'so that' },
        { value: 'd', label: 'in order' },
      ],
      correctAnswer: 'a',
      explanation: '\'For + -ing\' is used to express the purpose or function of something, in this case, the glue. We are defining what the glue is for. You could also say "I need some glue to repair the vase", but the given sentence structure with the -ing form requires \'for\'.',
    },
  ]),
}

// --- Computed Properties for Validation & Scoring ---
const score = computed(() => {
  if (!isSubmitted.value) return 0
  const correctAnswers = unitData.questions.value.filter(q => userAnswers.value[q.id] === q.correctAnswer).length
  return Math.round((correctAnswers / unitData.questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  const s = score.value
  if (s === 100) return { title: 'Exceptional!', description: 'A perfect score! You have a masterful command of these structures.' }
  if (s >= 80) return { title: 'Excellent Work!', description: 'You have a strong understanding of how to express purpose. Review the explanations for any missed questions.' }
  if (s >= 60) return { title: 'Good Progress!', description: 'A solid attempt. You\'re getting the hang of it. Pay close attention to the result analysis below.' }
  if (s >= 40) return { title: 'Needs More Practice', description: 'Some concepts are clear, but there are key distinctions to review. The explanations will be very helpful.' }
  return { title: 'Let\'s Review', description: 'This is a tricky topic. Carefully read through the material and the explanations below to build a stronger foundation.' }
})

// --- Methods ---
const validateAnswers = () => {
  isSubmitted.value = true
  // Scroll to results for better UX
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetTest = () => {
  isSubmitted.value = false
  userAnswers.value = {}
  // Scroll back to the top of the practice section
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Advanced exercises based on the Raymond Murphy series."
    :unit-title="unitData.title"
    :unit-description="unitData.description"
    :categories="unitData.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Core Concepts: The 'Why' of Actions</CardTitle>
          <CardDescription>Understanding the different ways to explain purpose.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible class="w-full" default-value="'item-1'">
            <AccordionItem value="item-1">
              <AccordionTrigger class="text-base font-semibold">1. `To + Infinitive`: The Direct Arrow</AccordionTrigger>
              <AccordionContent class="space-y-2 text-sm">
                <p>Think of <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">to + verb</code> as a direct arrow pointing from an action to its immediate goal or intention. It answers the question "Why did the subject do the action?".</p>
                <ul class="list-disc space-y-1 pl-6">
                  <li><em>He ran <strong class="text-primary">to catch</strong> the bus.</em> (Why did he run?)</li>
                  <li><em>I'm calling <strong class="text-primary">to ask</strong> for some information.</em> (Why am I calling?)</li>
                </ul>
                <p class="font-bold">Negative form: <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">not to + verb</code></p>
                <p><em>He whispered <strong class="text-primary">not to wake</strong> the baby.</em></p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger class="text-base font-semibold">2. `For`: The Purpose Label</AccordionTrigger>
              <AccordionContent class="space-y-2 text-sm">
                <p>Think of <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">for</code> as a label on an object or a concept, describing its function or designated purpose.</p>
                <p class="font-bold">`for + noun`:</p>
                <ul class="list-disc space-y-1 pl-6">
                  <li><em>This room is <strong class="text-primary">for guests</strong>.</em></li>
                  <li><em>What did you do that <strong class="text-primary">for</strong>?</em></li>
                </ul>
                <p class="font-bold">`for + -ing form` (Gerund):</p>
                 <ul class="list-disc space-y-1 pl-6">
                  <li><em>This knife is <strong class="text-primary">for cutting</strong> bread.</em> (Describes the knife's function)</li>
                  <li><em>Thank you <strong class="text-primary">for helping</strong> me.</em> (The reason for the thanks)</li>
                </ul>
                 <Alert variant="destructive" class="mt-2">
                    <HelpCircle class="h-4 w-4" />
                    <AlertTitle>Common Pitfall</AlertTitle>
                    <AlertDescription>
                      Do not use `for + to + verb`. It's a very common error.
                      <br>
                      <span class="text-red-600 line-through">I went there for to see him.</span> &rarr; <span class="text-green-600">I went there to see him.</span>
                    </AlertDescription>
                  </Alert>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger class="text-base font-semibold">3. `So that`: The Connecting Bridge</AccordionTrigger>
              <AccordionContent class="space-y-2 text-sm">
                <p>Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">so that</code> as a bridge to a new clause, especially when the subject of the purpose is different from the main subject, or when you need to use a modal verb (can, could, will, would).</p>
                <ul class="list-disc space-y-1 pl-6">
                  <li><em>I gave him my key <strong class="text-primary">so that he could get</strong> in.</em> (I gave the key, but *he* is the one getting in).</li>
                  <li><em>We must leave early <strong class="text-primary">so that we will arrive</strong> on time.</em> (Using the modal 'will' to express future certainty).</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Unit 2: Practice Exercises</CardTitle>
            <CardDescription>Select the best option to complete each sentence. Think carefully about the context.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(question, index) in unitData.questions.value" :key="question.id" class="space-y-3">
              <p class="font-semibold">{{ index + 1 }}. {{ question.questionText }}</p>
              <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted">
                <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                  <Label :for="`${question.id}-${option.value}`" class="cursor-pointer">{{ option.label }}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button v-if="!isSubmitted" class="w-full" @click="validateAnswers">
              Submit & Check Answers
            </Button>
            <Button v-else class="w-full" variant="secondary" @click="resetTest">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS VALIDATOR SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section" class="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Results & Analysis</CardTitle>
            <CardDescription>Review your performance and master the concepts.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="rounded-lg border p-6 text-center">
              <p class="text-sm font-medium text-muted-foreground">YOUR SCORE</p>
              <p class="text-6xl font-bold tracking-tighter">{{ score }}%</p>
              <Progress :model-value="score" class="mt-4" />
              <div class="mt-4">
                <p class="font-semibold">{{ scoreFeedback.title }}</p>
                <p class="text-sm text-muted-foreground">{{ scoreFeedback.description }}</p>
              </div>
            </div>

            <!-- Detailed Breakdown -->
            <div v-for="(question, index) in unitData.questions.value" :key="`result-${question.id}`" class="space-y-4 rounded-md border p-4">
              <p class="font-semibold">{{ index + 1 }}. {{ question.questionText }}</p>
              
              <div v-for="option in question.options" :key="`res-opt-${option.value}`" class="flex items-start gap-3 rounded-md p-2 text-sm" :class="{
                  'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700': option.value === question.correctAnswer,
                  'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700': userAnswers[question.id] === option.value && option.value !== question.correctAnswer,
                }">
                <div class="flex-shrink-0">
                  <CheckCircle v-if="option.value === question.correctAnswer" class="h-5 w-5 text-green-600" />
                  <XCircle v-else-if="userAnswers[question.id] === option.value" class="h-5 w-5 text-red-600" />
                  <div v-else class="h-5 w-5"></div>
                </div>
                <div class="flex-grow">
                  <p :class="{ 'font-bold': userAnswers[question.id] === option.value || option.value === question.correctAnswer }">{{ option.label }}</p>
                   <p v-if="userAnswers[question.id] === option.value && option.value === question.correctAnswer" class="text-xs text-muted-foreground">Your correct answer.</p>
                   <p v-else-if="userAnswers[question.id] === option.value && option.value !== question.correctAnswer" class="text-xs text-muted-foreground">Your answer (incorrect).</p>
                   <p v-else-if="option.value === question.correctAnswer" class="text-xs text-muted-foreground">Correct answer.</p>
                </div>
              </div>

              <Alert class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <HelpCircle class="h-4 w-4 text-blue-600" />
                <AlertTitle class="font-bold text-blue-800 dark:text-blue-300">Explanation</AlertTitle>
                <AlertDescription class="text-blue-700 dark:text-blue-400">
                  {{ question.explanation }}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
             <Button class="w-full" variant="secondary" @click="resetTest">
              <Repeat class="mr-2 h-4 w-4" />
              Attempt Quiz Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
