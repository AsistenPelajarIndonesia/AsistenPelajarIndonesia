<!--
  File: @/pages/units/grammar/36.vue
  Unit: 36 - Phrasal Verbs 8: Up (2)
  Description: An advanced grammar practice module focusing on complex phrasal verbs with 'up'.
  This page provides in-depth learning material, challenging exercises, and a detailed results validator.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, AlertTriangle, MessageCircleQuestion } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

definePageMeta({
  layout: false, // We are using our custom full-page GrammarLayout component
})

const router = useRouter()

const showResult = ref(false)
const isSubmitted = ref(false)
const userAnswers = ref<{ [key: string]: string }>({})

const unitData = {
  title: 'Unit 36: Phrasal verbs 8 - Up (2)',
  description: "Exploring complex meanings of phrasal verbs ending in 'up', focusing on creation, cessation, arrival, and completion.",
  categories: ['Phrasal Verbs', 'Advanced Vocabulary', 'C1 Level'],
  phrasalVerbs: [
    {
      verb: 'make up',
      meanings: [
        {
          definition: "To invent a story, excuse, or plan.",
          example: "He was late, so he had to **make up** a story about his car breaking down.",
          isSeparable: "Separable: You can 'make a story up'."
        },
        {
          definition: "To form something; to constitute.",
          example: "Women **make up** 55% of the student population at this university.",
          isSeparable: "Inseparable in this meaning."
        },
        {
          definition: "To reconcile after an argument.",
          example: "They always argue, but they **make up** again very quickly.",
          isSeparable: "Inseparable in this meaning."
        }
      ]
    },
    {
      verb: 'take up',
      meanings: [
        {
          definition: "To start a new hobby or activity.",
          example: "I've decided to **take up** photography in my free time.",
          isSeparable: "Separable: 'She took it up last year.'"
        },
        {
          definition: "To occupy space, time, or attention.",
          example: "This old desk **takes up** too much room in the study.",
          isSeparable: "Inseparable in this meaning."
        }
      ]
    },
    {
      verb: 'bring up',
      meanings: [
        {
          definition: "To raise a child.",
          example: "She was **brought up** by her grandparents after her parents passed away.",
          isSeparable: "Separable: 'They brought her up well.'"
        },
        {
          definition: "To mention or introduce a topic.",
          example: "Don't **bring up** the budget issue during the client meeting; it's too sensitive.",
          isSeparable: "Separable: 'He brought it up at the meeting.'"
        }
      ]
    },
    {
      verb: 'show up / turn up',
      meanings: [
        {
          definition: "To arrive or appear, especially unexpectedly or after a delay.",
          example: "We waited for an hour, but he never **showed up**.",
          isSeparable: "Inseparable."
        },
        {
          definition: "For something lost to be found unexpectedly.",
          example: "My keys finally **turned up** in the pocket of my other coat.",
          isSeparable: "Inseparable."
        }
      ]
    },
    {
      verb: 'end up',
      meanings: [
        {
          definition: "To finally be in a particular place or situation, often unexpectedly.",
          example: "We got lost and **ended up** on the other side of the city.",
          isSeparable: "Inseparable."
        }
      ]
    },
    {
      verb: 'use up',
      meanings: [
        {
          definition: "To finish the complete supply of something.",
          example: "I can't print the report because we've **used up** all the ink.",
          isSeparable: "Separable: 'We used it all up.'"
        }
      ]
    }
  ]
}

const questions = ref([
  {
    id: 'q1',
    type: 'fill-in-the-blank',
    prompt: "The marketing team needs to __________ a more compelling slogan if they want to capture the youth demographic.",
    correctAnswer: 'make up',
    explanation: "Here, **'make up'** means to invent or create. The team needs to create a new slogan. Other verbs like 'take up' (start a hobby) or 'bring up' (mention) do not fit the creative context of devising a slogan."
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    prompt: "After weeks of searching, the missing documents finally __________ in a mislabeled file cabinet.",
    options: ['brought up', 'ended up', 'turned up', 'made up'],
    correctAnswer: 'turned up',
    explanation: "**'Turned up'** (or 'showed up') is used when something lost is found unexpectedly. 'Ended up' describes a final situation, which is close, but 'turned up' specifically implies that the item was previously missing and has now reappeared."
  },
  {
    id: 'q3',
    type: 'sentence-rewrite',
    prompt: "Rewrite the following sentence using the phrasal verb 'bring up': 'During the negotiation, Sarah was the one who introduced the topic of overtime pay.'",
    correctAnswer: "Sarah was the one who brought up the topic of overtime pay.",
    alternativeAnswer: "Sarah was the one who brought the topic of overtime pay up.",
    explanation: "**'Bring up'** means to introduce a topic for discussion. It is a separable phrasal verb, so both 'brought up the topic' and 'brought the topic up' are correct. The key is to replace 'introduced the topic' with the phrasal verb correctly."
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank',
    prompt: "I'm trying to save money, but unexpected car repairs seem to __________ all my savings each month.",
    correctAnswer: 'use up',
    explanation: "The correct phrasal verb is **'use up'**, which means to consume or finish a supply completely. The context of 'all my savings' implies a complete depletion, which is precisely what 'use up' conveys. 'Take up' would mean the repairs 'occupy' the savings, which is less idiomatic."
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    prompt: "Despite his privileged background, he was __________ to be humble and appreciate the value of hard work.",
    options: ['made up', 'brought up', 'taken up', 'ended up'],
    correctAnswer: 'brought up',
    explanation: "**'Brought up'** is the correct choice, as it means to raise or rear a child. The sentence describes the values instilled in him during his upbringing. The other options are contextually incorrect."
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank',
    prompt: "If you don't follow the map carefully in this vast forest, you could __________ miles away from the designated campsite.",
    correctAnswer: 'end up',
    explanation: "**'End up'** is used to describe a final, often unexpected, situation or location. Getting lost and finding yourself in a different place is a classic scenario for using 'end up'. It signifies the final result of a series of actions (in this case, not following the map)."
  },
  {
    id: 'q7',
    type: 'sentence-rewrite',
    prompt: "Rewrite this sentence using 'take up': 'My new project management role consumes a significant portion of my day.'",
    correctAnswer: "My new project management role takes up a significant portion of my day.",
    explanation: "In this context, **'takes up'** means to occupy or consume time. The structure is 'X takes up Y'. It's the most natural and idiomatic way to express that something is time-consuming. This usage is inseparable."
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    prompt: "International students __________ nearly a third of the university's total enrollment.",
    options: ['bring up', 'end up', 'show up', 'make up'],
    correctAnswer: 'make up',
    explanation: "This question tests the secondary meaning of **'make up'**, which is to constitute or form a part of a whole. Here, the students form a part of the total enrollment. This is a common and important distinction from the 'invent' meaning."
  }
])

const validationResults = computed(() => {
  if (!isSubmitted.value) return []
  return questions.value.map(q => {
    const userAnswer = (userAnswers.value[q.id] || '').trim()
    let isCorrect
    if (q.type === 'sentence-rewrite') {
        const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[.,]/g, '')
        const normalizedCorrectAnswer = q.correctAnswer.toLowerCase().replace(/[.,]/g, '')
        const normalizedAlternativeAnswer = q.alternativeAnswer?.toLowerCase().replace(/[.,]/g, '')
        isCorrect = normalizedUserAnswer === normalizedCorrectAnswer || (normalizedAlternativeAnswer && normalizedUserAnswer === normalizedAlternativeAnswer);
    } else {
        isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()
    }
    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })
})

const score = computed(() => {
  return validationResults.value.filter(r => r.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const scoreFeedback = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) {
    return { title: 'Exceptional!', message: "Perfect score! You have an excellent command of these complex phrasal verbs. Your understanding of their nuances is outstanding.", variant: 'default' }
  } else if (percentage >= 75) {
    return { title: 'Excellent Work!', message: "You have a strong grasp of these phrasal verbs. Review the explanations for any missed questions to perfect your knowledge.", variant: 'default' }
  } else if (percentage >= 50) {
    return { title: 'Good Effort!', message: "You're on the right track, but there's room for improvement. Pay close attention to the detailed explanations to understand the subtle differences in meaning.", variant: 'destructive' }
  } else {
    return { title: 'Needs Review', message: "These phrasal verbs are tricky. It's highly recommended to go over the learning material again and then retake the practice.", variant: 'destructive' }
  }
})

function checkAnswers() {
  isSubmitted.value = true
  showResult.value = true
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetPractice() {
  userAnswers.value = {}
  isSubmitted.value = false
  showResult.value = false
}

function goToPreviousUnit() {
  router.push("/units/grammar/35")
}

function goToNextUnit() {
  router.push("/units/grammar/37")
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Based on the works of Raymond Murphy"
    :unit-title="unitData.title"
    :unit-description="unitData.description"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Learning Material: Phrasal Verbs with 'Up'</CardTitle>
          <CardDescription>
            This unit continues our exploration of 'up' phrasal verbs, focusing on those related to invention, constitution, introduction, arrival, and completion. Understanding the subtle context is key.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="verb in unitData.phrasalVerbs" :key="verb.verb">
            <h3 class="mb-2 text-lg font-semibold tracking-tight">{{ verb.verb }}</h3>
            <div class="flex flex-col gap-4 pl-4 border-l-2">
              <div v-for="(meaning, index) in verb.meanings" :key="index">
                <p class="font-medium text-primary">{{ meaning.definition }}</p>
                <p class="text-sm text-muted-foreground italic">"{{ meaning.example }}"</p>
                <p v-if="meaning.isSeparable" class="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1">{{ meaning.isSeparable }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the following exercises to test your understanding. Choose the best option or fill in the blank with the correct form of a phrasal verb from the material.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <label :for="question.id" class="text-sm font-medium">
              <span class="font-bold mr-2">{{ index + 1 }}.</span>
              {{ question.prompt }}
            </label>
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                :id="question.id"
                v-model="userAnswers[question.id]"
                placeholder="Type the phrasal verb..."
                class="w-full"
                :disabled="isSubmitted"
              />
            </div>
            <div v-if="question.type === 'multiple-choice'">
              <Select v-model="userAnswers[question.id]" :disabled="isSubmitted">
                <SelectTrigger :id="question.id">
                  <SelectValue placeholder="Select an answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="option in question.options" :key="option" :value="option">
                    {{ option }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div v-if="question.type === 'sentence-rewrite'">
              <Input
                :id="question.id"
                v-model="userAnswers[question.id]"
                placeholder="Rewrite the sentence here..."
                class="w-full"
                :disabled="isSubmitted"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
              <Button v-if="isSubmitted" variant="secondary" @click="resetPractice">Try Again</Button>
              <Button @click="checkAnswers" :disabled="isSubmitted">Check Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #result>
      <div id="results-section">
        <Card class="border-border/60">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review your performance below. The explanations are key to improving.</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-6">
            <div class="p-4 rounded-lg bg-muted">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-lg font-bold">Overall Score: {{ score }} / {{ questions.length }}</span>
                    <span class="text-xl font-bold text-primary">{{ scorePercentage.toFixed(0) }}%</span>
                </div>
                <Progress :model-value="scorePercentage" class="w-full h-3" />
                <Alert :variant="scoreFeedback.variant" class="mt-4">
                  <AlertTriangle v-if="scoreFeedback.variant === 'destructive'" class="h-4 w-4" />
                  <CheckCircle2 v-else class="h-4 w-4" />
                  <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
                  <AlertDescription>
                    {{ scoreFeedback.message }}
                  </AlertDescription>
                </Alert>
            </div>

            <div v-for="result in validationResults" :key="result.id" class="p-4 rounded-md" :class="[result.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500']">
              <div class="flex items-start gap-3">
                <div class="mt-1">
                  <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-600" />
                  <XCircle v-else class="h-5 w-5 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-sm">{{ result.prompt }}</p>
                  <div class="mt-2 text-xs p-2 rounded-md" :class="[result.isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30']">
                    <p>Your answer: <span class="font-mono p-1 rounded bg-background/50">{{ result.userAnswer || 'No answer provided' }}</span></p>
                  </div>
                   <div v-if="!result.isCorrect" class="mt-2 text-xs p-2 rounded-md bg-green-100 dark:bg-green-900/30">
                    <p>Correct answer: <span class="font-mono p-1 rounded bg-background/50">{{ result.correctAnswer }}</span></p>
                    <p v-if="result.alternativeAnswer">Alternative: <span class="font-mono p-1 rounded bg-background/50">{{ result.alternativeAnswer }}</span></p>
                  </div>
                  <Alert class="mt-3">
                    <MessageCircleQuestion class="h-4 w-4" />
                    <AlertTitle class="font-bold text-sm">Explanation</AlertTitle>
                    <AlertDescription class="text-sm">
                      <span v-html="result.explanation"></span>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

