<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Using 'Whose'</CardTitle>
          <CardDescription>The possessive relative pronoun for people, animals, and things.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            <strong class="text-primary">'Whose'</strong> is used to indicate possession. It can replace 'his', 'her', 'its', or 'their'. It connects a noun to another noun that belongs to it.
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>For people:</strong> "I met a woman <strong class="text-indigo-500">whose</strong> husband is a famous director." (Her husband)</li>
            <li><strong>For things:</strong> "This is the book <strong class="text-indigo-500">whose</strong> cover is torn." (Its cover)</li>
          </ul>
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Common Error</AlertTitle>
            <AlertDescription>
              Do not confuse 'whose' (possessive) with 'who's' (contraction for 'who is' or 'who has').<br>
              <em>Example:</em> "The man <strong class="text-indigo-500">who's</strong> at the door..." (who is) vs. "The man <strong class="text-indigo-500">whose</strong> car is at the door..." (his car).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Using 'Whom'</CardTitle>
          <CardDescription>The object relative pronoun, primarily used in formal contexts.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            <strong class="text-primary">'Whom'</strong> is the object form of 'who'. You use it when the person you are referring to is the object of the verb or a preposition in the relative clause.
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>Object of a verb:</strong> "The candidate <strong class="text-indigo-500">whom</strong> we interviewed was exceptional." (We interviewed <em>him/her</em>).</li>
            <li><strong>Object of a preposition:</strong> "The professor <strong class="text-red-500">to whom</strong> I spoke was very helpful." (I spoke <em>to him/her</em>).</li>
          </ul>
           <Alert>
            <Rocket class="h-4 w-4" />
            <AlertTitle>Modern Usage Tip</AlertTitle>
            <AlertDescription>
              In modern, informal English, 'who' is often used instead of 'whom', and the preposition is moved to the end of the clause. <br>
              <em>Formal:</em> "The person <strong class="text-red-500">to whom</strong> I am indebted." <br>
              <em>Informal:</em> "The person <strong class="text-indigo-500">who</strong> I am indebted <strong class="text-red-500">to</strong>."
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using 'Where'</CardTitle>
          <CardDescription>The relative adverb used to refer to a place.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            <strong class="text-primary">'Where'</strong> introduces a relative clause that modifies a noun of place (e.g., city, house, room, street).
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong>Example:</strong> "That's the café <strong class="text-indigo-500">where</strong> we had our first date."</li>
          </ul>
          <Alert>
            <Rocket class="h-4 w-4" />
            <AlertTitle>Grammar Deep Dive</AlertTitle>
            <AlertDescription>
              'Where' can be replaced by <strong class="text-indigo-500">'in which'</strong> or <strong class="text-indigo-500">'at which'</strong>. If a preposition like 'in' or 'at' is already present before the relative pronoun, you must use <strong class="text-primary">'which'</strong>, not 'where'.<br>
              <em>Correct:</em> "The building <strong class="text-indigo-500">in which</strong> he works..."<br>
              <em>Incorrect:</em> "The building <strong class="text-destructive">in where</strong> he works..."
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the correct word to complete each sentence. Pay close attention to formal structures and prepositions.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium text-sm">
              {{ index + 1 }}. {{ question.prompt.start }}
              <span class="inline-block bg-muted rounded-md w-24 h-6 mx-1">&nbsp;</span>
              {{ question.prompt.end }}
            </p>
            <RadioGroup v-model="userAnswers[question.id]" class="flex flex-wrap gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers">
            <CheckCircle class="mr-2 h-4 w-4" />
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <template #result>
       <Card class="bg-card">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <div class="flex items-center gap-2">
              <span class="text-4xl font-bold">{{ score.toFixed(0) }}%</span>
              <span class="text-sm text-muted-foreground">({{ correctCount }} / {{ questions.length }} correct)</span>
            </div>
          </div>
           <Progress :model-value="score" class="w-full mt-2" />
        </CardHeader>
        <CardContent class="space-y-4">
          <Alert
            v-for="result in results"
            :key="result.id"
            :variant="result.isCorrect ? 'default' : 'destructive'"
          >
            <component :is="result.isCorrect ? Check : AlertTriangle" class="h-4 w-4" />
            <AlertTitle class="font-bold flex items-center justify-between">
              <span>Question {{ result.id }}</span>
              <Badge :variant="result.isCorrect ? 'default' : 'destructive'">
                {{ result.isCorrect ? 'Correct' : 'Incorrect' }}
              </Badge>
            </AlertTitle>
            <AlertDescription class="mt-2 space-y-2">
              <p class="italic">
                {{ result.questionPrompt.start }} <strong class="underline">{{ result.userAnswer }}</strong> {{ result.questionPrompt.end }}
              </p>
              <template v-if="!result.isCorrect">
                <p><strong>Your answer:</strong> {{ result.userAnswer }}</p>
                <p><strong>Correct answer:</strong> {{ result.correctAnswer }}</p>
              </template>
              <Separator class="my-2" />
              <p><strong>Explanation:</strong> {{ result.explanation }}</p>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
            <Button variant="outline" @click="resetTest">
                <RefreshCw class="mr-2 h-4 w-4" />
                Try Again
            </Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { AlertCircle, Rocket, CheckCircle, Check, AlertTriangle, RefreshCw } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  layout: false, 
})

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/26")
}
function goToNextUnit() {
  router.push("/units/grammar/28")
}

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 27: Relative clauses 3',
  unitDescription: 'Mastering the use of whose, whom, and where in complex sentences.',
  categories: ['Grammar', 'Relative Clauses', 'Advanced'],
}

interface Question {
  id: number;
  prompt: { start: string; end: string };
  options: string[];
  correctAnswer: string;
  explanation: string;
}
interface Result {
  id: number;
  questionPrompt: { start: string; end: string };
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

const questions = ref<Question[]>([
  {
    id: 1,
    prompt: { start: "The physicist,", end: "theories revolutionized our understanding of space-time, received the Nobel Prize." },
    options: ["who's", "whose", "whom"],
    correctAnswer: "whose",
    explanation: "'Whose' is the correct possessive pronoun here, indicating that the theories belong to the physicist. 'Who's' is a contraction for 'who is' and would be grammatically incorrect."
  },
  {
    id: 2,
    prompt: { start: "This is the historical site", end: "the decisive battle of the war was fought." },
    options: ["which", "where", "that"],
    correctAnswer: "where",
    explanation: "'Where' is used to refer to a location or place. The sentence describes the place the battle was fought. 'Which' would be used if we were describing the site itself, e.g., 'the site, which is now a park...'"
  },
  {
    id: 3,
    prompt: { start: "The diplomat, to", end: "the formal complaint was addressed, has not yet responded." },
    options: ["who", "whom", "whose"],
    correctAnswer: "whom",
    explanation: "'Whom' is required here because it is the object of the preposition 'to'. In formal English, when a pronoun follows a preposition, 'whom' is the correct choice for people."
  },
  {
    id: 4,
    prompt: { start: "I'm looking for a programmer", end: "I can trust with this confidential project." },
    options: ["who", "whom", "where"],
    correctAnswer: "whom",
    explanation: "Although 'who' is common in informal speech, 'whom' is the grammatically correct object of the verb 'trust' (I can trust him/her). This tests the formal object case."
  },
  {
    id: 5,
    prompt: { start: "We visited the town in", end: "the famous author was born." },
    options: ["where", "that", "which"],
    correctAnswer: "which",
    explanation: "This is a tricky case. Because the preposition 'in' is present, we must use 'which'. The phrase 'in which' is equivalent to 'where'. You cannot say 'in where'."
  },
  {
    id: 6,
    prompt: { start: "The company hired an auditor", end: "reputation for thoroughness was well-known." },
    options: ["who's", "whom", "whose"],
    correctAnswer: "whose",
    explanation: "'Whose' indicates possession ('his/her reputation'). It connects 'auditor' to 'reputation'. 'Who's' means 'who is' and does not fit the sentence's meaning."
  },
  {
    id: 7,
    prompt: { start: "The board of directors, the members of", end: "are all internationally recognized, approved the merger." },
    options: ["who", "whom", "which"],
    correctAnswer: "whom",
    explanation: "This is a highly formal structure. 'Whom' is the object of the preposition 'of'. The phrase is 'the members of whom' (referring to the board of directors)."
  },
  {
    id: 8,
    prompt: { start: "Can you show me the exact spot", end: "the treasure was buried?" },
    options: ["which", "where", "whose"],
    correctAnswer: "where",
    explanation: "'Where' refers to the location, 'the exact spot'. 'Which' would be incorrect unless a preposition was used, as in 'the spot at which...'"
  }
])

const userAnswers = reactive<Record<number, string>>({})
const showResult = ref(false)
const results = ref<Result[]>([])

const score = computed(() => {
  if (results.value.length === 0) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return (correctCount / questions.value.length) * 100
})

const correctCount = computed(() => {
    return results.value.filter(r => r.isCorrect).length
})

function checkAnswers() {
  const newResults: Result[] = []
  for (const question of questions.value) {
    const userAnswer = userAnswers[question.id] || "Not answered"
    const isCorrect = userAnswer === question.correctAnswer
    newResults.push({
      id: question.id,
      questionPrompt: question.prompt,
      userAnswer: userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
      explanation: question.explanation
    })
  }
  results.value = newResults
  showResult.value = true
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function resetTest() {
    showResult.value = false;
    results.value = [];
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
