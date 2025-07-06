<!--
  File: pages/units/grammar/26.vue
  Description: An advanced grammar practice module for Unit 26: "Should 1", 
  focusing on advice, recommendations, and warnings with `should`, `ought to`, and `had better`.
-->
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
    <!-- ======================================================================= -->
    <!-- #material Slot: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(material, index) in pageData.materials" :key="index" class="w-full">
        <CardHeader>
          <CardTitle class="text-lg text-primary">{{ material.title }}</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p v-html="material.explanation" />
          <div v-if="material.examples && material.examples.length" class="mt-4">
            <h4 class="font-semibold">Examples:</h4>
            <ul class="ml-4 list-disc space-y-2">
              <li v-for="(example, exIndex) in material.examples" :key="exIndex" v-html="example" />
            </ul>
          </div>
          <Alert v-if="material.tip" variant="default" class="mt-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle class="font-semibold">Teacher's Note</AlertTitle>
            <AlertDescription v-html="material.tip" />
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence or dialogue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="space-y-8">
              <div v-for="(question, index) in pageData.questions" :key="question.id">
                <fieldset>
                  <legend class="mb-2 text-base font-medium">
                    Question {{ index + 1 }}
                  </legend>
                  <p class="mb-4 text-sm text-muted-foreground italic">
                    {{ question.scenario }}
                  </p>
                  <p class="mb-4 font-semibold" v-html="question.prompt" />
                  <RadioGroup v-model="userAnswers[question.id]" class="space-y-2">
                    <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                      <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                      <Label :for="`${question.id}-${option.value}`" class="flex-1 cursor-pointer">{{ option.label }}</Label>
                    </div>
                  </RadioGroup>
                </fieldset>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <Button type="submit" size="lg">Check My Answers</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result Slot: Detailed Feedback and Score                             -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle class="text-2xl">Your Results</CardTitle>
              <CardDescription>
                You scored <span class="font-bold text-primary">{{ score.correct }} out of {{ score.total }}</span>.
                Review the explanations below to master this topic.
              </CardDescription>
            </div>
            <Button variant="outline" @click="resetQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="result in results" :key="result.id" class="rounded-lg border p-4" :class="result.isCorrect ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20' : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'">
            <div class="flex items-start gap-3">
              <div class="mt-1">
                <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-600 dark:text-green-400" />
                <XCircle v-else class="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div class="flex-1">
                <p class="font-semibold" v-html="result.prompt" />
                <p class="mt-2 text-sm">Your answer: <span class="font-medium" :class="result.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'">{{ result.userAnswerLabel }}</span></p>
                <p v-if="!result.isCorrect" class="mt-1 text-sm">Correct answer: <span class="font-medium text-green-800 dark:text-green-300">{{ result.correctAnswerLabel }}</span></p>
                <div class="mt-3 rounded-md border border-slate-300 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-900/50">
                  <h5 class="mb-1 font-bold text-sm">Explanation</h5>
                  <p class="text-sm text-slate-600 dark:text-slate-300" v-html="result.explanation" />
                </div>
              </div>
            </div>
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-vue-next'

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/25")
}
function goToNextUnit() {
  router.push("/units/grammar/27")
}

const pageData = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Based on the units by Raymond Murphy',
  unitTitle: 'Unit 26: Should 1',
  unitDescription: 'Mastering the art of giving advice, making recommendations, and expressing obligations and expectations using `should`, `ought to`, and `had better`.',
  categories: ['Modals', 'Advice', 'Obligation', 'Opinion'],
  materials: [
    {
      title: "Should & Ought to: Advice and Opinion",
      explanation: "We use <b>`should`</b> and <b>`ought to`</b> to give advice or to say what we think is the right thing to do. They express a subjective opinion. `Should` is more common and slightly less formal than `ought to`.",
      examples: [
        "You look tired. You <b>should</b> go to bed.",
        "It's a fantastic film. You <b>ought to</b> see it.",
        "People <b>shouldn't</b> throw their litter in the streets."
      ],
      tip: "`Ought to` is often used when there's a sense of moral duty or a generally accepted rule, but in most cases, `should` and `ought to` are interchangeable."
    },
    {
      title: "Had Better: Strong Advice & Warnings",
      explanation: "<b>`Had better`</b> (usually contracted to `'d better`) is used for strong advice or warnings. It implies that there will be a negative consequence if the advice is not followed. It refers to a specific, immediate situation, not general opinions.",
      examples: [
        "The kitchen is on fire! We<b>'d better</b> call the fire brigade immediately!",
        "You<b>'d better not</b> be late for the interview tomorrow. They are very strict about time.",
        "I<b>'d better</b> go now, or I'll miss my train."
      ],
       tip: "A common mistake is to say `You had better to go`. Remember, `had better` is followed by the bare infinitive (the verb without `to`)."
    },
    {
      title: "Should have: Past Regrets & Criticism",
      explanation: "We use <b>`should have + past participle`</b> to talk about things that were a good idea in the past but did not happen. It is often used to express regret or criticism.",
      examples: [
        "I feel sick. I <b>shouldn't have eaten</b> so much cake.",
        "The party was great! You <b>should have come</b>.",
        "He failed the exam. He <b>should have studied</b> harder."
      ],
       tip: "Note that `had better` is not typically used to talk about the past in this way. For past regrets, `should have` is the correct form."
    }
  ],
  questions: [
    {
      id: 'q1',
      scenario: 'Your friend is complaining about a persistent toothache but is afraid of the dentist.',
      prompt: "You tell your friend: 'It's been hurting for a week now. I think you _______ see a dentist before it gets worse.'",
      options: [
        { value: 'a', label: 'had better to' },
        { value: 'b', label: 'ought' },
        { value: 'c', label: 'should' },
        { value: 'd', label: 'should have' }
      ],
      correctAnswer: 'c',
      explanation: "<b>`Should`</b> is the most appropriate choice here as you are giving standard, friendly advice. <br> - `had better to` is grammatically incorrect; `had better` is followed by the bare infinitive (verb without 'to'). <br> - `ought` is incomplete; it must be followed by `to` (`ought to`). <br> - `should have` is for past situations, but the advice is for the present/future."
    },
    {
      id: 'q2',
      scenario: 'You are with a friend in a restricted area of a military base. You hear a guard approaching.',
      prompt: "You whisper urgently: 'Someone's coming! We _______ get out of here, now!'",
      options: [
        { value: 'a', label: 'should' },
        { value: 'b', label: 'ought to' },
        { value: 'c', label: "'d better" },
        { value: 'd', label: 'are supposed to' }
      ],
      correctAnswer: 'c',
      explanation: "<b>`'d better`</b> (had better) is correct because it's a specific, urgent situation with a clear negative consequence (getting caught). It conveys a strong warning, which is necessary here. <br> - `Should` and `ought to` are too weak for this level of urgency. They are for general advice, not immediate danger. <br> - `are supposed to` describes an expectation or rule, not a frantic warning."
    },
    {
      id: 'q3',
      scenario: 'A colleague, Tom, didn\'t get a promotion. You know he was rude to the manager last month.',
      prompt: "Thinking about the situation, you believe: 'Tom _______ been so impolite to the manager. It clearly affected his chances.'",
      options: [
        { value: 'a', label: "had better not have" },
        { value: 'b', label: "shouldn't have" },
        { value: 'c', label: "ought not to had" },
        { value: 'd', label: "shouldn't" }
      ],
      correctAnswer: 'b',
      explanation: "<b>`Shouldn't have + past participle`</b> is the correct structure for criticising a past action. It means it was a bad idea to be impolite, but it happened. <br> - `had better not have` is grammatically awkward and rarely used for past criticism. <br> - `ought not to had` is an incorrect past form. The correct form is `ought not to have`. <br> - `shouldn't` is for present/future advice, not past events."
    },
    {
      id: 'q4',
      scenario: 'A manager is giving a final warning to an employee who is frequently late.',
      prompt: "The manager says sternly: 'This is the last time I'm telling you this. You _______ be late again, or you will be dismissed.'",
      options: [
        { value: 'a', label: "shouldn't" },
        { value: 'b', label: "ought not to" },
        { value: 'c', label: "don't have to" },
        { value: 'd', label: "'d better not" }
      ],
      correctAnswer: 'd',
      explanation: "<b>`'d better not`</b> (had better not) is the strongest and most suitable choice. It's a direct warning with a stated severe consequence (dismissal). <br> - `Shouldn't` and `ought not to` are forms of advice, but they lack the authoritative, warning tone required here. <br> - `Don't have to` means there is no obligation, which is the opposite of the intended meaning."
    },
    {
      id: 'q5',
      scenario: 'A government health agency is publishing general guidelines for a healthy lifestyle.',
      prompt: "One of the key recommendations states: 'For optimal health, adults _______ aim for at least 150 minutes of moderate exercise per week.'",
      options: [
        { value: 'a', label: 'should' },
        { value: 'b', label: 'had better' },
        { value: 'c', label: 'must' },
        { value: 'd', label: 'should have' }
      ],
      correctAnswer: 'a',
      explanation: "<b>`Should`</b> is perfect for this context. It's a formal recommendation or piece of general advice from an authority. <br> - `had better` is incorrect as it's for specific, immediate situations, not general, long-term advice. <br> - `must` implies a strict obligation or rule, which is too strong for a general health guideline. <br> - `should have` is for the past, but the guideline is for ongoing behaviour."
    }
  ]
}

const userAnswers = reactive<{ [key: string]: string }>({})
const showResult = ref(false)

const score = computed(() => {
  const correct = pageData.questions.filter(q => userAnswers[q.id] === q.correctAnswer).length
  return {
    correct,
    total: pageData.questions.length
  }
})

const results = computed(() => {
  return pageData.questions.map(question => {
    const userAnswer = userAnswers[question.id]
    const correctAnswer = question.correctAnswer
    const selectedOption = question.options.find(opt => opt.value === userAnswer)
    const correctOption = question.options.find(opt => opt.value === correctAnswer)

    return {
      ...question,
      userAnswer: userAnswer,
      userAnswerLabel: selectedOption ? selectedOption.label : 'Not answered',
      correctAnswerLabel: correctOption ? correctOption.label : '',
      isCorrect: userAnswer === correctAnswer
    }
  })
})

function handleSubmit() {
  const allAnswered = pageData.questions.every(q => userAnswers[q.id])
  if (!allAnswered) {
    // In a real app, you might show an alert here.
    // For this exercise, we'll allow partial submission.
    console.log("Not all questions answered, but showing results anyway.")
  }
  showResult.value = true
  // Scroll to results
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetQuiz() {
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
