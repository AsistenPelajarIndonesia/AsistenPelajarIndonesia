<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="An advanced grammar module for serious English students."
    unit-title="Unit 2: Question Tags (do you? isn't it? etc.)"
    unit-description="Master the art of forming and using question tags in various tenses and contexts. Pay close attention to exceptions and intonation."
    :categories="['Intermediate', 'Advanced', 'Sentence Structure', 'Conversation']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. The Fundamental Rule: Inversion</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>Question tags are short questions at the end of statements. They are mainly used in speech when we want to confirm that something is true or to encourage a reply. The core principle is inversion: a positive statement is followed by a negative tag, and a negative statement is followed by a positive tag.</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Positive Statement &#8594; Negative Tag:</strong><br>
              <span class="text-muted-foreground">The auxiliary/modal verb is repeated and negated. The pronoun matches the subject.</span><br>
              <em class="font-semibold">It is cold, <strong>isn't it?</strong></em><br>
              <em class="font-semibold">You have finished your work, <strong>haven't you?</strong></em>
            </li>
            <li>
              <strong>Negative Statement &#8594; Positive Tag:</strong><br>
              <span class="text-muted-foreground">The negative auxiliary/modal verb is repeated in its positive form.</span><br>
              <em class="font-semibold">It isn't cold, <strong>is it?</strong></em><br>
              <em class="font-semibold">You can't drive, <strong>can you?</strong></em>
            </li>
            <li>
              <strong>No Auxiliary Verb (Simple Present/Past):</strong><br>
              <span class="text-muted-foreground">Use the appropriate form of <strong class="font-mono">do/does/did</strong>.</span><br>
              <em class="font-semibold">You live in Paris, <strong>don't you?</strong></em><br>
              <em class="font-semibold">She studied hard for the exam, <strong>didn't she?</strong></em>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>B. Advanced Rules and Exceptions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>True mastery of question tags requires understanding these critical exceptions and special cases.</p>
          <dl class="space-y-3">
            <div>
              <dt class="font-semibold">Statement with 'I am'</dt>
              <dd class="pl-4 text-muted-foreground">The tag is <strong class="text-primary font-mono">aren't I?</strong>. <br><em>Example: I'm late, <strong>aren't I?</strong></em></dd>
            </div>
            <div>
              <dt class="font-semibold">Imperatives (Commands/Requests)</dt>
              <dd class="pl-4 text-muted-foreground">The tag is usually <strong class="text-primary font-mono">will you?</strong>. It can also be <em class="font-mono">won't you?</em>, <em class="font-mono">can you?</em>, or <em class="font-mono">could you?</em>.<br><em>Example: Open the window, <strong>will you?</strong></em></dd>
            </div>
            <div>
              <dt class="font-semibold">Statement with 'Let's ...'</dt>
              <dd class="pl-4 text-muted-foreground">The tag is always <strong class="text-primary font-mono">shall we?</strong>.<br><em>Example: Let's go for a walk, <strong>shall we?</strong></em></dd>
            </div>
            <div>
              <dt class="font-semibold">Statements with Negative Words</dt>
              <dd class="pl-4 text-muted-foreground">Words like <em class="font-mono">never, hardly, seldom, rarely, nobody, no one, nothing</em> make the statement negative, thus requiring a <strong>positive tag</strong>.<br><em>Example: He hardly ever speaks, <strong>does he?</strong></em><br><em>Example: Nobody called, <strong>did they?</strong></em></dd>
            </div>
            <div>
              <dt class="font-semibold">Indefinite Pronouns as Subject</dt>
              <dd class="pl-4 text-muted-foreground">Pronouns like <em class="font-mono">somebody, everyone, no one, anybody</em> use the pronoun <strong class="text-primary font-mono">they</strong> in the tag.<br><em>Example: Somebody wanted to see you, <strong>didn't they?</strong></em></dd>
            </div>
            <div>
              <dt class="font-semibold">Subjects 'this' or 'that'</dt>
              <dd class="pl-4 text-muted-foreground">These subjects use the pronoun <strong class="text-primary font-mono">it</strong> in the tag.<br><em>Example: That wasn't very clever, <strong>was it?</strong></em></dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercise</CardTitle>
          <CardDescription>Complete each sentence with the correct question tag. Punctuation is optional.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers" class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="flex items-center gap-2">
              <span class="text-sm font-medium text-muted-foreground">{{ index + 1 }}.</span>
              <div class="flex-1">
                <label :for="`q-${q.id}`" class="text-sm">
                  {{ q.sentence }}
                  <Input
                    :id="`q-${q.id}`"
                    v-model="q.userAnswer"
                    type="text"
                    placeholder="tag?"
                    class="inline-block w-[120px] ml-1 px-2 py-1 h-8"
                    :class="{
                      'border-green-500 focus-visible:ring-green-400': q.status === 'correct',
                      'border-red-500 focus-visible:ring-red-400': q.status === 'incorrect'
                    }"
                    :disabled="isSubmitted"
                  />
                </label>
              </div>
            </div>
            <div class="flex gap-4 pt-4 border-t">
              <Button type="submit" :disabled="isSubmitted">
                <Check class="mr-2 h-4 w-4" /> Check Answers
              </Button>
              <Button v-if="isSubmitted" type="button" variant="outline" @click="resetPractice">
                <RefreshCw class="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results & Detailed Feedback</CardTitle>
          <CardDescription>{{ feedbackMessage }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="font-bold text-lg">Score: {{ score }} / {{ totalQuestions }}</span>
            <Progress :model-value="scorePercentage" class="w-[60%]" />
            <span class="text-lg font-mono">{{ scorePercentage.toFixed(0) }}%</span>
          </div>
          
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem v-for="q in questions" :key="`result-${q.id}`" :value="`item-${q.id}`">
              <AccordionTrigger>
                <div class="flex items-center gap-3 text-left">
                  <span v-if="q.status === 'correct'"><CircleCheck class="h-5 w-5 text-green-600" /></span>
                  <span v-else><CircleX class="h-5 w-5 text-red-600" /></span>
                  <p>{{ q.sentence }} <strong>{{ q.correctAnswer }}</strong></p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Alert :variant="q.status === 'correct' ? 'default' : 'destructive'">
                  <AlertCircle class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    <p class="mb-2">{{ q.explanation }}</p>
                    <p v-if="q.status === 'incorrect'" class="border-t pt-2 mt-2">
                      <span class="font-semibold">Your Answer:</span>
                      <span class="italic ml-2 font-mono">{{ q.userAnswer || 'No answer' }}</span>
                    </p>
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Check, RefreshCw, CircleCheck, CircleX, AlertCircle } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const router = useRouter()

const questions = reactive([
  {
    id: 1,
    sentence: "You've been working on this all day,",
    correctAnswer: "haven't you?",
    userAnswer: "",
    status: "unchecked",
    explanation: "The statement uses the present perfect continuous ('have been working'). The auxiliary verb is 'have', so the negative tag is 'haven't you?'."
  },
  {
    id: 2,
    sentence: "Let's consider all the options before we decide,",
    correctAnswer: "shall we?",
    userAnswer: "",
    status: "unchecked",
    explanation: "For suggestions starting with 'Let's' (Let us), the question tag is always 'shall we?'."
  },
  {
    id: 3,
    sentence: "He hardly said a word when he came in,",
    correctAnswer: "did he?",
    userAnswer: "",
    status: "unchecked",
    explanation: "'Hardly' is a negative adverb, which makes the statement negative in meaning. Therefore, it requires a positive tag. The main verb is in the past simple ('said'), so we use 'did he?'."
  },
  {
    id: 4,
    sentence: "I am supposed to be the team leader,",
    correctAnswer: "aren't I?",
    userAnswer: "",
    status: "unchecked",
    explanation: "This is a key exception. Statements using 'I am' have the question tag 'aren't I?'. 'Am I not?' is grammatically correct but very formal and rarely used in modern conversation."
  },
  {
    id: 5,
    sentence: "Nobody has claimed the lost wallet,",
    correctAnswer: "have they?",
    userAnswer: "",
    status: "unchecked",
    explanation: "'Nobody' is a negative indefinite pronoun, requiring a positive tag. Pronouns like 'nobody', 'somebody', and 'everyone' use 'they' in the tag. The verb 'has' changes to 'have' to agree with 'they'."
  },
  {
    id: 6,
    sentence: "This couldn't possibly be the right address,",
    correctAnswer: "could it?",
    userAnswer: "",
    status: "unchecked",
    explanation: "The modal verb is 'couldn't' (negative). The subject 'This' becomes 'it' in the tag. Therefore, the positive tag is 'could it?'."
  },
  {
    id: 7,
    sentence: "Stop making so much noise down there,",
    correctAnswer: "will you?",
    userAnswer: "",
    status: "unchecked",
    explanation: "This is an imperative (a command). Imperatives are typically followed by 'will you?' to make them sound more like a request."
  },
  {
    id: 8,
    sentence: "Your brother has little patience for this kind of thing,",
    correctAnswer: "does he?",
    userAnswer: "",
    status: "unchecked",
    explanation: "The word 'little', when used in this context, has a negative meaning (implying 'not much'). Therefore, the statement is considered negative and needs a positive tag. The main verb 'has' here is not an auxiliary but the main verb (like 'possesses'), so we use 'does he?'."
  },
  {
    id: 9,
    sentence: "She'd rather not discuss it right now,",
    correctAnswer: "would she?",
    userAnswer: "",
    status: "unchecked",
    explanation: "The contraction 'd rather' stands for 'would rather'. The statement is negative ('rather not'), so the tag must be positive: 'would she?'."
  },
  {
    id: 10,
    sentence: "It's the third time he's been late this week,",
    correctAnswer: "isn't it?",
    userAnswer: "",
    status: "unchecked",
    explanation: "The main clause is 'It is the third time...'. The tag refers to this main clause, not the subordinate clause '...he's been late...'. The auxiliary verb is 'is', so the tag is 'isn't it?'."
  }
])

const isSubmitted = ref(false)

const normalizeAnswer = (answer: string) => {
  return answer.trim().toLowerCase().replace(/[?.!]/g, '')
}

const validateAnswers = () => {
  questions.forEach(q => {
    if (normalizeAnswer(q.userAnswer) === normalizeAnswer(q.correctAnswer)) {
      q.status = 'correct'
    } else {
      q.status = 'incorrect'
    }
  })
  isSubmitted.value = true
}

const resetPractice = () => {
  questions.forEach(q => {
    q.userAnswer = ''
    q.status = 'unchecked'
  })
  isSubmitted.value = false
}

const score = computed(() => {
  return questions.filter(q => q.status === 'correct').length
})

const totalQuestions = computed(() => questions.length)

const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0
})

const feedbackMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "Perfect score! You have an excellent command of question tags."
  if (percentage >= 80) return "Great job! You've mastered most of the rules, including the tricky ones."
  if (percentage >= 50) return "Good effort. Review the explanations for the questions you missed to solidify your understanding."
  return "It seems this unit was challenging. Please review the material and the explanations carefully before trying again."
})

function goToPreviousUnit() {
  router.push("/units/grammar/1")
}

function goToNextUnit() {
  router.push("/units/grammar/3")
}
</script>

<style scoped>
/* Scoped styles for fine-tuning if necessary */
</style>
