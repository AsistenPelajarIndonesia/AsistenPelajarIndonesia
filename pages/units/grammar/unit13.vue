<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are from a library like shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push('/units/grammar/6')
const goToNextUnit = () => router.push('/units/grammar/8')

// --- Page State ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<string, string>>({
  q1: '',
  q2_1: '',
  q2_2: '',
  q3: '',
  q4: '',
  q5_1: '',
  q5_2: '',
  q6: '',
})

// --- Question & Answer Data ---
// Inspired by legendary teaching methods: focus on context, contrast, and common pitfalls.
const questions = ref([
  {
    id: 'q1',
    type: 'fill-in-the-blank',
    prompt: "A: Where's your key? \nB: I don't know. I (lose) it.",
    placeholder: 'verb form...',
    correctAnswers: ['have lost', "'ve lost"],
    explanation:
      "Use the Present Perfect ('have lost') because the past action (losing the key) has a direct result in the present: you don't have the key *now*. The focus is on the current situation.",
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank-dual',
    prompt: 'Aristotle, the Greek philosopher, (write) a number of books that are still influential today. For example, he (influence) Western philosophy immensely.',
    placeholders: ['verb form 1...', 'verb form 2...'],
    ids: ['q2_1', 'q2_2'],
    correctAnswers: [['wrote'], ['has influenced', "'s influenced"]],
    explanation:
      "For the first blank, use Past Simple ('wrote') because Aristotle is no longer alive. His life and his action of writing are in a finished past time. For the second blank, use Present Perfect ('has influenced') because his influence continues *to this day* and is still relevant.",
  },
  {
    id: 'q3',
    type: 'fill-in-the-blank',
    prompt: "I'm exhausted. I (work) for ten hours straight without a break.",
    placeholder: 'verb form...',
    correctAnswers: ['have worked', "'ve worked", "have been working"],
    explanation:
      "Use Present Perfect ('have worked' or 'have been working') because the action of working has led to a present result: being exhausted *now*. The period of work extends up to the present moment.",
  },
  {
    id: 'q4',
    type: 'fill-in-the-blank',
    prompt: 'The industrial revolution (begin) in the 18th century and it completely changed society.',
    placeholder: 'verb form...',
    correctAnswers: ['began'],
    explanation:
      "Use Past Simple ('began') because 'in the 18th century' is a specific, finished time in the past. There is no direct connection being made to the immediate present moment, it's a historical fact.",
  },
  {
    id: 'q5',
    type: 'fill-in-the-blank-dual',
    prompt: "A: Is Maria in her office? \nB: No, she (go) out. \nA: Oh, really? What time (she / go) out?",
    placeholders: ['verb form 1...', 'question form 2...'],
    ids: ['q5_1', 'q5_2'],
    correctAnswers: [['has gone', "'s gone"], ['did she go']],
    explanation:
      "The first part ('has gone') is news with a present result (she is not here *now*), requiring Present Perfect. The second part ('did she go') asks *when* the action happened, demanding a specific past time. Therefore, use the Past Simple question form.",
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank',
    prompt: "This is the first time I (eat) real Japanese sushi. It's delicious!",
    placeholder: 'verb form...',
    correctAnswers: ['have eaten', "'ve eaten"],
    explanation:
      "The expression 'It's the first/second/best time...' is always followed by the Present Perfect because it connects a past experience (or lack thereof) to the present moment of speaking.",
  },
])

// --- Validation & Scoring Logic ---
const normalizeAnswer = (answer: string): string => answer.trim().toLowerCase().replace(/\s+/g, ' ')

const results = computed(() => {
  if (!isSubmitted.value) return { score: 0, total: 0, details: [], percentage: 0, feedbackMessage: '' }

  let score = 0
  const details = questions.value.map((q) => {
    if (q.type === 'fill-in-the-blank-dual') {
        const userAnswer1 = userAnswers.value[q.ids![0]]
        const userAnswer2 = userAnswers.value[q.ids![1]]
        const isCorrect1 = q.correctAnswers[0].includes(normalizeAnswer(userAnswer1))
        const isCorrect2 = q.correctAnswers[1].includes(normalizeAnswer(userAnswer2))
        const isFullyCorrect = isCorrect1 && isCorrect2
        if (isFullyCorrect) score++
        return {
            id: q.id,
            prompt: q.prompt,
            userAnswers: [userAnswer1, userAnswer2],
            correctAnswers: [q.correctAnswers[0].join(' / '), q.correctAnswers[1].join(' / ')],
            isCorrect: isFullyCorrect,
            explanation: q.explanation,
        }
    } else {
        const userAnswer = userAnswers.value[q.id]
        const isCorrect = q.correctAnswers.includes(normalizeAnswer(userAnswer))
        if (isCorrect) score++
        return {
            id: q.id,
            prompt: q.prompt,
            userAnswers: [userAnswer],
            correctAnswers: [q.correctAnswers.join(' / ')],
            isCorrect,
            explanation: q.explanation,
        }
    }
  })

  const total = questions.value.length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0
  
  let feedbackMessage = ''
  if (percentage === 100) feedbackMessage = "Flawless! You have an excellent command of these tenses."
  else if (percentage >= 75) feedbackMessage = "Great job! You have a strong understanding. Review the explanations for any mistakes."
  else if (percentage >= 50) feedbackMessage = "Good effort. This is a tricky topic. Carefully read the explanations below to solidify your knowledge."
  else feedbackMessage = "This unit is challenging. Don't be discouraged. The key is to study the explanations and understand the logic for each answer."

  return { score, total, details, percentage, feedbackMessage }
})

// --- Control Functions ---
const checkAnswers = () => {
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}
const retry = () => {
  isSubmitted.value = false
  for (const key in userAnswers.value) {
    userAnswers.value[key] = ''
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Based on the book by Raymond Murphy"
    unit-title="Unit 7: Present Perfect and Past 2 (I have done and I did)"
    unit-description="Mastering the crucial difference between actions with a present result and finished past actions."
    :categories="['Tense', 'Present Perfect', 'Past Simple', 'B1/B2 Intermediate']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concept: Connection to the Present</CardTitle>
          <CardDescription>Present Perfect links the past and present.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>
            We use the <strong class="text-primary">Present Perfect (I have done)</strong> to talk about past actions that have a result, relevance, or connection to the <strong class="text-primary">present moment</strong>.
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>Present Result:</strong> "I <strong class="text-green-600">have lost</strong> my wallet." (The result is: I don't have it *now*.)</li>
            <li><strong>Unfinished Time Period:</strong> "She <strong class="text-green-600">hasn't called</strong> me <strong class="underline">today</strong>." (Today is not over yet.)</li>
            <li><strong>Life Experience:</strong> "I <strong class="text-green-600">have never been</strong> to Japan." (In my life, up to this point.)</li>
          </ul>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Core Concept: Finished Past Time</CardTitle>
          <CardDescription>Past Simple is for actions completely in the past.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p>
            We use the <strong class="text-primary">Past Simple (I did)</strong> for actions and situations that started and finished in the past. The connection to the present is not the focus.
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>Specific Past Time:</strong> "I <strong class="text-red-600">lost</strong> my wallet <strong class="underline">yesterday</strong>." (The focus is on *when* it happened.)</li>
            <li><strong>Finished Period:</strong> "Leonardo da Vinci <strong class="text-red-600">painted</strong> the Mona Lisa." (His life is a finished time period.)</li>
            <li><strong>Sequence of Events:</strong> "He <strong class="text-red-600">woke up</strong>, <strong class="text-red-600">had</strong> a shower, and <strong class="text-red-600">left</strong> for work."</li>
          </ul>
        </CardContent>
      </Card>
      <Card class="w-full bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <CardHeader>
            <CardTitle class="flex items-center gap-2"><AlertTriangle class="h-5 w-5 text-amber-500" />Common Pitfall</CardTitle>
            <CardDescription>Never use Present Perfect with a finished time expression.</CardDescription>
        </CardHeader>
        <CardContent>
            <p><strong class="text-red-600 line-through">I have seen him yesterday.</strong> (Incorrect)</p>
            <p><strong class="text-green-600">I saw him yesterday.</strong> (Correct)</p>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences with the correct form of the verb in brackets: Present Perfect or Past Simple.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-medium leading-none whitespace-pre-line">
              {{ index + 1 }}. {{ q.prompt }}
            </p>
            <div v-if="q.type === 'fill-in-the-blank-dual'" class="flex flex-col gap-4 sm:flex-row">
                <Input :id="q.ids[0]" v-model="userAnswers[q.ids[0]]" :placeholder="q.placeholders[0]" :disabled="isSubmitted" />
                <Input :id="q.ids[1]" v-model="userAnswers[q.ids[1]]" :placeholder="q.placeholders[1]" :disabled="isSubmitted" />
            </div>
            <div v-else>
                <Input :id="q.id" v-model="userAnswers[q.id]" :placeholder="q.placeholder" :disabled="isSubmitted" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" :disabled="isSubmitted" class="w-full">Check Answers</Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
        <Card class="w-full">
            <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>{{ results.feedbackMessage }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <div class="space-y-2">
                    <div class="flex justify-between font-medium">
                        <span>Score: {{ results.score }} / {{ results.total }}</span>
                        <span>{{ results.percentage }}%</span>
                    </div>
                    <Progress :model-value="results.percentage" />
                </div>
                <Separator />
                <div class="space-y-8">
                    <div v-for="(item, index) in results.details" :key="item.id" class="space-y-4">
                        <div>
                            <div class="flex items-start gap-3">
                                <component :is="item.isCorrect ? CheckCircle2 : XCircle" :class="[item.isCorrect ? 'text-green-500' : 'text-red-500', 'mt-1 h-5 w-5 flex-shrink-0']" />
                                <div class="flex-1">
                                    <p class="font-semibold whitespace-pre-line">{{ index + 1 }}. {{ item.prompt }}</p>
                                    <div v-if="item.isCorrect" class="mt-2 text-sm text-green-700 dark:text-green-400">
                                        Your answer: <span class="font-mono p-1 bg-green-100 dark:bg-green-900 rounded-md">{{ item.userAnswers.join(', ') }}</span>
                                    </div>
                                    <div v-else class="mt-2 space-y-1 text-sm">
                                        <p class="text-red-700 dark:text-red-400">Your answer: <span class="font-mono p-1 bg-red-100 dark:bg-red-900 rounded-md">{{ item.userAnswers.join(', ') || '""' }}</span></p>
                                        <p class="text-primary">Correct answer(s): <span class="font-mono p-1 bg-primary/10 rounded-md">{{ item.correctAnswers.join(', ') }}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 rounded-md border bg-muted/50 p-4 pl-10 text-sm">
                                <p class="font-bold text-primary">Explanation</p>
                                <p class="text-muted-foreground">{{ item.explanation }}</p>
                            </div>
                        </div>
                        <Separator v-if="index < results.details.length - 1" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button @click="retry" variant="outline" class="w-full">Try Again</Button>
            </CardFooter>
        </Card>
    </template>
  </GrammarLayout>
</template>
