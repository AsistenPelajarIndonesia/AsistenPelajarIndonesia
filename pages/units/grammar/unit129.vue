<!--
  File: @/pages/units/grammar/22.vue
  Unit: 22 - Adjective + preposition 1
  Description: An advanced practice module based on Raymond Murphy's "English Grammar in Use".
  This page provides in-depth learning materials, challenging exercises, and a detailed
  results validator to help students master common adjective-preposition collocations.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these are Shadcn-Vue components. We'll import what we need.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// --- Component State & Data ---

const isSubmitted = ref(false)
const userAnswers = reactive<Record<number, string>>({})

const unitData = {
  testTitle: "English Grammar In Use: Practice",
  testDescription: "Advanced exercises inspired by Raymond Murphy's best-selling grammar book.",
  unitNumber: 22,
  unitTitle: "Adjective + preposition 1",
  unitDescription: "Mastering the first set of essential adjective and preposition combinations. These collocations are fixed and must be memorized through practice.",
  categories: ["Adjectives", "Prepositions", "Collocations", "Intermediate"],
}

// --- Navigation ---

const router = useRouter()
function goToPreviousUnit() {
  router.push(`/units/grammar/${unitData.unitNumber - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${unitData.unitNumber + 1}`)
}

// --- Questions & Practice Logic ---

const questions = ref([
  {
    id: 1,
    sentence: ["I'm not very good", "playing tennis. I always seem to miss the ball."],
    options: ["at", "in", "on", "for"],
    correctAnswer: "at",
    explanation: "The collocation 'good at' is used to talk about skill or ability in a particular activity. 'Good in' is sometimes used for subjects (e.g., 'good in class'), but 'at' is standard for activities like sports or hobbies."
  },
  {
    id: 2,
    sentence: ["The city is famous", "its vibrant nightlife and historical architecture."],
    options: ["for", "of", "with", "about"],
    correctAnswer: "for",
    explanation: "We use 'famous for' to state the reason for someone's or something's fame. 'Famous of' is a common mistake and is incorrect."
  },
  {
    id: 3,
    sentence: ["My parents were very pleased", "my exam results; they took me out for dinner."],
    options: ["by", "at", "with", "of"],
    correctAnswer: "with",
    explanation: "When you are happy or satisfied with a person, an object, or a result, the correct preposition is 'pleased with'. 'Pleased by' is sometimes used for an action (e.g., 'pleased by what you did'), but 'with' is more common for results and things."
  },
  {
    id: 4,
    sentence: ["Why are you always so jealous", "other people's success? You should focus on your own journey."],
    options: ["of", "from", "about", "against"],
    correctAnswer: "of",
    explanation: "'Jealous of' is the standard and fixed expression to describe the feeling of envy towards someone or their possessions/achievements."
  },
  {
    id: 5,
    sentence: ["I feel sorry", "Mark. He lost his job and his dog ran away in the same week."],
    options: ["with", "about", "to", "for"],
    correctAnswer: "for",
    explanation: "To express sympathy or pity for someone, we use 'sorry for (someone)'. 'Sorry about' is used for a situation or action (e.g., 'I'm sorry about the mess')."
  },
  {
    id: 6,
    sentence: ["Are you aware", "the potential risks involved in this investment?"],
    options: ["with", "of", "about", "in"],
    correctAnswer: "of",
    explanation: "The correct collocation is 'aware of', meaning having knowledge or perception of a situation or fact."
  },
  {
    id: 7,
    sentence: ["He's married", "a famous actress, but he prefers to stay out of the limelight."],
    options: ["with", "to", "in", "on"],
    correctAnswer: "to",
    explanation: "In English, you are 'married to' someone. 'Married with' is a common error for learners, often from direct translation from their native language."
  },
  {
    id: 8,
    sentence: ["This software is not compatible", "older operating systems. You need to update first."],
    options: ["to", "for", "with", "from"],
    correctAnswer: "with",
    explanation: "The adjective 'compatible' is always followed by 'with' when it refers to things (or people) that can exist or work together without problems."
  },
  {
    id: 9,
    sentence: ["She was deeply shocked", "the news of the accident."],
    options: ["by", "of", "with", "from"],
    correctAnswer: "by",
    explanation: "Both 'shocked at' and 'shocked by' are correct and often interchangeable. 'By' is frequently preferred when the cause is an event or news, as in this case. It implies the agent that caused the shock."
  },
  {
    id: 10,
    sentence: ["The children are very excited", "going to the theme park tomorrow."],
    options: ["for", "with", "to", "about"],
    correctAnswer: "about",
    explanation: "'Excited about' is the standard collocation used to express enthusiasm for a future event or a topic. 'Excited for' is becoming more common in informal American English, but 'about' remains the universally accepted preposition."
  }
])

// --- Computed Properties for Validation ---

const scoreDetails = computed(() => {
  const correctCount = questions.value.reduce((count, question) => {
    return userAnswers[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
  return {
    correct: correctCount,
    total: questions.value.length,
    percentage: Math.round((correctCount / questions.value.length) * 100)
  }
})

const detailedResults = computed(() => {
  return questions.value.map(question => {
    const userAnswer = userAnswers[question.id] || "No Answer"
    const isCorrect = userAnswer === question.correctAnswer
    const fullSentence = `${question.sentence[0]} ${question.correctAnswer} ${question.sentence[1]}`
    return {
      ...question,
      userAnswer,
      isCorrect,
      fullSentence
    }
  })
})

function checkAnswers() {
  // Fill in any unanswered questions to avoid undefined errors
  questions.value.forEach(q => {
    if (!userAnswers[q.id]) {
      userAnswers[q.id] = "" // Mark as explicitly unanswered
    }
  })
  isSubmitted.value = true
}

// Initialize userAnswers object
questions.value.forEach(q => {
  userAnswers[q.id] = ''
})
</script>

<template>
  <GrammarLayout
    :test-title="unitData.testTitle"
    :test-description="unitData.testDescription"
    :unit-title="`Unit ${unitData.unitNumber}: ${unitData.unitTitle}`"
    :unit-description="unitData.unitDescription"
    :categories="unitData.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- Learning content, rules, and examples.                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Core Concepts: Collocations</CardTitle>
          <CardDescription>
            Certain adjectives are naturally followed by specific prepositions. There isn't always a logical rule; these pairings, or collocations, should be learned as complete phrases.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6 p-6">
          <div>
            <h4 class="mb-2 font-semibold text-foreground">Common Patterns with 'of'</h4>
            <p class="text-sm text-muted-foreground">Often related to feelings, traits, or awareness.</p>
            <ul class="mt-2 list-disc space-y-1 pl-6">
              <li><code>afraid of</code>, <code>scared of</code></li>
              <li><code>ashamed of</code>, <code>proud of</code></li>
              <li><code>jealous of</code>, <code>fond of</code></li>
              <li><code>aware of</code>, <code>conscious of</code></li>
              <li><code>capable of</code>, <code>tired of</code></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="mb-2 font-semibold text-foreground">Common Patterns with 'for'</h4>
            <p class="text-sm text-muted-foreground">Often related to reason, purpose, or responsibility.</p>
            <ul class="mt-2 list-disc space-y-1 pl-6">
              <li><code>famous for</code>, <code>known for</code></li>
              <li><code>responsible for</code></li>
              <li><code>sorry for</code> (a person or a situation)</li>
              <li><code>grateful for</code></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="mb-2 font-semibold text-foreground">Common Patterns with 'with' and 'to'</h4>
            <p class="text-sm text-muted-foreground">Often related to relationships, connections, and reactions.</p>
            <ul class="mt-2 list-disc space-y-1 pl-6">
              <li><code>pleased with</code>, <code>happy with</code>, <code>satisfied with</code></li>
              <li><code>angry with</code> (someone), <code>annoyed with</code> (someone)</li>
              <li><code>bored with</code>, <code>crowded with</code></li>
              <li><code>married to</code>, <code>engaged to</code></li>
              <li><code>similar to</code>, <code>kind to</code></li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="mb-2 font-semibold text-foreground">Patterns with 'at', 'in', 'about'</h4>
            <p class="text-sm text-muted-foreground">Often related to skills, emotional responses, or topics.</p>
            <ul class="mt-2 list-disc space-y-1 pl-6">
              <li><code>good at</code>, <code>bad at</code>, <code>terrible at</code></li>
              <li><code>surprised at/by</code>, <code>shocked at/by</code></li>
              <li><code>interested in</code></li>
              <li><code>angry about</code> (something), <code>sorry about</code> (something)</li>
              <li><code>excited about</code>, <code>worried about</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- Interactive questions for the student.                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle>Unit 22: Exercises</CardTitle>
          <CardDescription>
            Complete the sentences with the correct preposition. Choose the best option.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <form @submit.prevent="checkAnswers">
            <fieldset :disabled="isSubmitted" class="grid gap-8">
              <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-4">
                <p class="font-medium">
                  {{ index + 1 }}. {{ question.sentence[0] }}
                  <span class="mx-1 inline-block h-5 w-20 rounded-md border-b-2 border-dashed border-primary/50 align-middle" />
                  {{ question.sentence[1] }}
                </p>
                <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <label v-for="option in question.options" :key="option" class="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      v-model="userAnswers[question.id]"
                      type="radio"
                      :name="`question-${question.id}`"
                      :value="option"
                      class="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary"
                    >
                    <code>{{ option }}</code>
                  </label>
                </div>
              </div>
            </fieldset>

            <div v-if="!isSubmitted" class="mt-8 flex justify-end">
              <Button type="submit" size="lg">
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- Shows the score and detailed explanations after submission.             -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-t-4" :class="scoreDetails.percentage > 70 ? 'border-green-500' : 'border-amber-500'">
        <CardHeader>
          <CardTitle class="text-2xl">
            Results & Explanations
          </CardTitle>
          <CardDescription class="text-base">
            You scored
            <strong class="font-bold text-primary">{{ scoreDetails.correct }} / {{ scoreDetails.total }}</strong>
            ({{ scoreDetails.percentage }}%). Review the explanations below to improve.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 p-6">
          <div
            v-for="(result, index) in detailedResults"
            :key="result.id"
            class="rounded-lg border p-4"
            :class="result.isCorrect ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/20'"
          >
            <p class="font-semibold">
              Question {{ index + 1 }}:
              <span
                class="ml-2"
                :class="result.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
              >
                {{ result.isCorrect ? 'Correct' : 'Incorrect' }}
              </span>
            </p>
            <p class="mt-2 text-muted-foreground">
              <span class="italic">"{{ result.fullSentence }}"</span>
            </p>
            <div class="mt-3 text-sm">
              <span class="font-medium">Your answer:</span>
              <code class="ml-2 rounded bg-muted px-2 py-1" :class="!result.isCorrect ? 'text-red-600 line-through dark:text-red-400' : 'text-green-600 dark:text-green-400'">{{ result.userAnswer || '—' }}</code>
              <template v-if="!result.isCorrect">
                <span class="mx-2 font-medium">Correct answer:</span>
                <code class="ml-1 rounded bg-muted px-2 py-1 text-green-600 dark:text-green-400">{{ result.correctAnswer }}</code>
              </template>
            </div>
            <Separator class="my-3" />
            <div>
              <p class="font-semibold">Explanation:</p>
              <p class="mt-1 text-sm text-muted-foreground">{{ result.explanation }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>

<style scoped>
/* A simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
