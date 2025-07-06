<!--
  File: @/pages/units/grammar/23.vue
  Unit: 23 - May and might 2
  Description: An advanced practice page focusing on past speculation with may/might have,
  contrasting with could have, and using the idiom 'might as well'.
-->
<template>
  <GrammarLayout
    :test-title="'English Grammar In Use'"
    test-description="Advanced Practice Module by Raymond Murphy"
    unit-title="Unit 23: May and might 2"
    unit-description="Exploring past possibilities, speculation, and related expressions like `could have` and `might as well`."
    :categories="['Modals of Speculation', 'Past Possibility', 'Advanced Grammar', 'B2/C1 Level']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concepts: Speculating About the Past</CardTitle>
          <CardDescription>
            This unit builds on the basic use of 'may' and 'might' to discuss possibilities in the past.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div class="prose max-w-none dark:prose-invert">
            <h4 class="font-semibold text-lg">A. Past Possibility: `may have` / `might have`</h4>
            <p>We use <strong>may have (done)</strong> or <strong>might have (done)</strong> to express that it is possible something happened in the past. It's a form of educated guessing or speculation.</p>
            <ul>
              <li><em>"I can't find my keys anywhere."</em><br />→ <em>"You <strong>might have left</strong> them in the car."</em> (It's a possibility)</li>
              <li><em>"Why wasn't Amy at the meeting?"</em><br />→ <em>"I'm not sure. She <strong>may not have known</strong> about it."</em> (A possible negative reason)</li>
            </ul>
            <p>Compare this to present possibility:</p>
            <ul>
              <li><strong>Present:</strong> <em>"Where is David? He <strong>might be</strong> in his office."</em></li>
              <li><strong>Past:</strong> <em>"Where was David yesterday? He <strong>might have been</strong> sick."</em></li>
            </ul>

            <h4 class="font-semibold text-lg">B. The Nuance of `could have`</h4>
            <p>Sometimes, <strong>could have (done)</strong> can be used similarly to <strong>might have (done)</strong> to express past possibility. However, there's a key distinction:</p>
            <ul>
              <li><strong>`might have`</strong> simply states a possibility of what occurred.
                <br />→ <em>"The phone is ringing. It <strong>might be</strong> Tim."</em> (Possible, but unknown)
              </li>
              <li><strong>`could have`</strong> often implies a possibility that <em>did not</em> happen. It speaks of an unfulfilled potential.
                <br />→ <em>"He was reckless driving so fast. He <strong>could have crashed</strong>."</em> (But he didn't crash)
              </li>
            </ul>

            <h4 class="font-semibold text-lg">C. Past Impossibility: `couldn't have`</h4>
            <p>To express certainty that something was impossible in the past, we use <strong>couldn't have (done)</strong>.</p>
            <ul>
              <li><em>"Sarah <strong>couldn't have passed</strong> the exam. She didn't study at all and looked devastated afterwards."</em> (I'm certain it was impossible for her to pass)</li>
              <li><em>"He <strong>couldn't have been</strong> at the party; he was on a flight to Japan at that time."</em></li>
            </ul>
            <p>Note: We do not typically use `mustn't have` for this purpose. `mustn't` is for prohibition.</p>

            <h4 class="font-semibold text-lg">D. Idiomatic Use: `might as well` / `may as well`</h4>
            <p>This expression is used to suggest doing something because there is no better alternative or no good reason not to. It implies resignation or making the best of a situation.</p>
            <ul>
              <li><em>"All the restaurants are closed, and we're hungry. We <strong>might as well</strong> go home and cook."</em></li>
              <li><em>"Since you have to wait for two hours, you <strong>may as well</strong> get some coffee."</em></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Complete the sentences. Use the modal verb that best fits the context. Pay close attention to the nuances discussed.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(question, index) in questions" :key="question.id" class="flex flex-col gap-2">
            <p class="text-sm font-medium leading-none">
              <span class="font-bold mr-2">{{ index + 1 }}.</span>
              {{ question.prompt }}
            </p>
            <div class="flex items-center gap-2">
              <Input
                v-model="question.userAnswer"
                :placeholder="question.context || 'Type your answer here...'"
                class="flex-1"
                :disabled="isSubmitted"
                @keyup.enter="submitAnswers"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button :disabled="isSubmitted" class="w-full" @click="submitAnswers">
            <Check class="mr-2 h-4 w-4" />
            Check Answers & Get Feedback
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <div class="flex-1">
              <p class="text-muted-foreground">You scored <strong class="text-primary">{{ score }} out of {{ questions.length }}</strong> correct.</p>
              <Progress :model-value="progressPercentage" class="mt-2" />
            </div>
            <Button variant="outline" @click="resetPractice">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div v-for="(question, index) in questions" :key="question.id">
            <Alert :variant="isCorrect(question) ? 'default' : 'destructive'">
               <component :is="isCorrect(question) ? CheckCircle2 : XCircle" class="h-4 w-4" />
              <AlertTitle>Question {{ index + 1 }}: {{ isCorrect(question) ? 'Correct' : 'Needs Review' }}</AlertTitle>
              <AlertDescription class="mt-2 flex flex-col gap-3">
                <p><strong>Your answer:</strong> <span :class="{'line-through text-muted-foreground': !isCorrect(question)}">{{ question.userAnswer || 'No answer provided' }}</span></p>
                <div class="p-3 bg-muted/50 rounded-md border">
                  <p class="text-sm font-semibold">Correct Answer(s):</p>
                  <p class="text-sm font-mono text-emerald-600 dark:text-emerald-400">{{ question.acceptedAnswers.join(' / ') }}</p>
                  <Separator class="my-2" />
                  <p class="text-sm font-semibold">Explanation:</p>
                  <p class="text-sm">{{ question.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Check, CheckCircle2, RefreshCw, XCircle } from 'lucide-vue-next'

const router = useRouter()

const isSubmitted = ref(false)

type Question = {
  id: number
  prompt: string
  context?: string
  userAnswer: string
  acceptedAnswers: string[]
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    prompt: "I wonder why they are so late. They ______ the wrong turning on the motorway.",
    userAnswer: '',
    acceptedAnswers: ['may have taken', 'might have taken'],
    explanation: "Use 'may have + past participle' or 'might have + past participle' to speculate about a past event. 'Taking the wrong turning' is a possible reason for their lateness.",
  },
  {
    id: 2,
    prompt: "A: 'Why didn't James come to the party?' B: 'I'm not certain, but he ______ invited.'",
    userAnswer: '',
    acceptedAnswers: ['may not have been', 'might not have been', "mayn't have been", "mightn't have been"],
    explanation: "To express a past possibility in the negative passive voice, we use 'may/might not have been + past participle'. It's possible he wasn't invited.",
  },
  {
    id: 3,
    prompt: "That was a very dangerous climb. You ______ killed!",
    context: "Use 'could' to emphasize the avoided danger.",
    userAnswer: '',
    acceptedAnswers: ['could have been'],
    explanation: "'Could have been' is ideal here because it highlights a past potential that was fortunately not realized. It implies 'it was possible for you to be killed, but you weren't'.",
  },
  {
    id: 4,
    prompt: "The ground is soaking wet this morning. It ______ heavily overnight.",
    context: "Use 'must' for a logical conclusion.",
    userAnswer: '',
    acceptedAnswers: ['must have rained'],
    explanation: "This is a test of a related modal. The evidence (soaking wet ground) is very strong, so a logical deduction using 'must have rained' is more appropriate than the weaker possibility of 'might have rained'.",
  },
  {
    id: 5,
    prompt: "He ______ my message. I just realized his phone has been off all day.",
    userAnswer: '',
    acceptedAnswers: ["couldn't have seen", "could not have seen"],
    explanation: "When you are certain something was impossible in the past, use 'couldn't have + past participle'. If his phone was off, it was impossible for him to see the message.",
  },
  {
    id: 6,
    prompt: "The concert is sold out and we don't have tickets. I suppose we ______ watch it on TV instead.",
    userAnswer: '',
    acceptedAnswers: ['may as well', 'might as well'],
    explanation: "The idiom 'might/may as well' fits perfectly. It suggests that watching on TV is the only remaining, albeit less desirable, option.",
  },
  {
    id: 7,
    prompt: "A: 'I saw a light on in that 'abandoned' house last night.' B: 'You ______ things. It's been empty for years.'",
    userAnswer: '',
    acceptedAnswers: ['may have been seeing', 'might have been seeing'],
    explanation: "'May/might have been + -ing' is used to speculate about a continuous or repeated action in the past. It suggests the possibility that the person was imagining things.",
  },
  {
    id: 8,
    prompt: "It's a shame you didn't apply for the scholarship. With your grades, you ______ it.",
    userAnswer: '',
    acceptedAnswers: ['might have got', 'may have got', 'could have got'],
    explanation: "All three are possible. 'Might/may have got' expresses the possibility. 'Could have got' emphasizes the ability or potential that went unrealized because you didn't apply.",
  },
])

const normalizeAnswer = (answer: string): string => {
  return answer.trim().toLowerCase().replace(/\s+/g, ' ')
}

const isCorrect = (question: Question): boolean => {
  const userAnswer = normalizeAnswer(question.userAnswer)
  return question.acceptedAnswers.some(correctAnswer => normalizeAnswer(correctAnswer) === userAnswer)
}

const score = computed(() => {
  return questions.value.filter(q => isCorrect(q)).length
})

const progressPercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const submitAnswers = () => {
  isSubmitted.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const resetPractice = () => {
  isSubmitted.value = false
  questions.value.forEach(q => q.userAnswer = '')
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPreviousUnit() {
  router.push("/units/grammar/22")
}
function goToNextUnit() {
  router.push("/units/grammar/24")
}
</script>
