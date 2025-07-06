
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components exist in your project, following the shadcn-vue pattern
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpenCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/33")
}
function goToNextUnit() {
  router.push("/units/grammar/35")
}

// --- Page & Unit Metadata ---
const pageDetails = {
  testTitle: "Advanced English Grammar Practice",
  testDescription: "Exercises inspired by Raymond Murphy's 'English Grammar in Use'",
  unitTitle: "Unit 34: Phrasal Verbs 6 (up/down)",
  unitDescription: "An in-depth exploration of phrasal verbs using 'up' and 'down'. Focus on completion, creation, increase, decrease, and figurative meanings.",
  categories: ['Phrasal Verbs', 'Advanced Vocabulary', 'Idiomatic Expressions', 'C1/C2 Level'],
}

// --- Reactive State Management ---
const showResult = ref(false)
const userAnswers = ref<string[]>(['', '', '', '', '', '', '', '', '', ''])

interface Question {
  id: number
  sentence: string
  correctAnswer: string[]
  explanation: string
  teacherTip?: string
}

interface Result {
  id: number
  question: string
  userAnswer: string
  correctAnswer: string[]
  isCorrect: boolean
  explanation: string
  teacherTip?: string
}

// --- Content & Questions ---
// Word bank for the student to use. It forces understanding of meaning over pure guessing.
const phrasalVerbBank = [
  'break down', 'bring up', 'calm down', 'cut down on', 'do up', 
  'fix up', 'set up', 'show up', 'tear down', 'turn down', 
  'turn up', 'write down'
]

// The questions are designed to be contextually challenging.
const questions = ref<Question[]>([
  {
    id: 1,
    sentence: "Despite numerous attempts to repair the antique clock, its complex mechanism would invariably ______ within a few hours.",
    correctAnswer: ['break down'],
    explanation: "'break down' is used here to mean 'stop functioning', typically for machinery or systems. The context of a 'complex mechanism' failing fits this phrasal verb perfectly.",
    teacherTip: "Note the difference: 'The car broke down' (stopped working), but 'Let's break down the problem' (analyse in parts)."
  },
  {
    id: 2,
    sentence: "The developer's proposal to ______ the historic theatre was met with fierce opposition from local residents who valued its cultural significance.",
    correctAnswer: ['tear down', 'pull down'],
    explanation: "'tear down' or 'pull down' both mean to demolish or destroy a building. 'Tear down' often implies a more forceful or complete destruction.",
  },
  {
    id: 3,
    sentence: "During the board meeting, she decided to ______ the controversial issue of budget cuts, knowing it would spark a heated debate.",
    correctAnswer: ['bring up'],
    explanation: "'bring up' means to introduce a topic for discussion. The context of a 'controversial issue' in a 'meeting' is a classic scenario for this verb.",
  },
  {
    id: 4,
    sentence: "They bought a dilapidated cottage in the countryside and spent the entire summer trying to ______ it ______ for the holiday season.",
    correctAnswer: ['fix up', 'do up'],
    explanation: "'fix up' and 'do up' both mean to repair, redecorate, or renovate a building. They are often used interchangeably in this context. Note that they are separable.",
    teacherTip: "Both 'fix it up' and 'do it up' are correct. When the object is a pronoun (like 'it'), it MUST go between the verb and the particle."
  },
  {
    id: 5,
    sentence: "The management was forced to ______ a very lucrative but ethically questionable offer from a rival corporation.",
    correctAnswer: ['turn down'],
    explanation: "'turn down' means to refuse or reject an offer, request, or proposal. The context of a 'lucrative offer' clearly points to a decision of acceptance or rejection.",
  },
  {
    id: 6,
    sentence: "Could you please ______ the volume? The neighbours have a newborn and I don't want to disturb them.",
    correctAnswer: ['turn down'],
    explanation: "While 'turn up' means to increase volume, 'turn down' means to decrease it. The context of not disturbing neighbours with a baby clearly indicates a need for reduction.",
  },
  {
    id: 7,
    sentence: "After a frantic search for the missing document, it finally ______ in a folder she had already checked three times.",
    correctAnswer: ['turned up', 'showed up'],
    explanation: "'turn up' or 'show up' can mean to appear unexpectedly, referring to either a person or an object. 'Turned up' is slightly more common for objects.",
  },
  {
    id: 8,
    sentence: "The entrepreneur managed to ______ a new company with minimal initial investment, relying on her extensive network and innovative ideas.",
    correctAnswer: ['set up'],
    explanation: "'set up' means to establish or create a business, organization, or system. It implies a formal and structured beginning.",
  },
  {
    id: 9,
    sentence: "The witness was asked to ______ everything he remembered about the incident, providing as much detail as possible for the official record.",
    correctAnswer: ['write down', 'take down', 'note down'],
    explanation: "'write down', 'take down', or 'note down' all mean to record information on paper. 'Write down' is the most general and fitting here for a detailed account.",
    teacherTip: "'Take down' is often used when one person is dictating to another (e.g., a police officer taking down a statement)."
  },
  {
    id: 10,
    sentence: "To improve his health, he made a resolution to ______ sugary drinks and processed foods, which was challenging at first.",
    correctAnswer: ['cut down on'],
    explanation: "'cut down on' is a three-part phrasal verb meaning to reduce the consumption or use of something. It is specifically used for habits or consumption (food, spending, etc.).",
  },
])

const results = ref<Result[]>([])
const score = computed(() => {
  if (results.value.length === 0) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.value.length) * 100)
})

// --- Validation Logic ---
function validateAnswers() {
  const newResults: Result[] = []
  questions.value.forEach((q, index) => {
    const userAnswer = userAnswers.value[index].trim().toLowerCase()
    
    // Some questions have separable phrasal verbs, so we need to handle that.
    // e.g., "fix up it" -> "fix it up"
    let processedUserAnswer = userAnswer
    const parts = userAnswer.split(' ')
    if (parts.length === 3 && (parts[0] === 'fix' || parts[0] === 'do') && (parts[2] === 'up')) {
      processedUserAnswer = `${parts[0]} ${parts[2]} ${parts[1]}`
    } else if (parts.length === 2) {
      // Handles answers like 'fix up', 'do up' when separated in sentence
      processedUserAnswer = `${parts[0]} ${parts[1]}`
    }
    
    const correctAnswers = q.correctAnswer.map(ans => ans.toLowerCase())
    
    // Check if user answer is one of the possible correct phrasal verbs
    let isCorrect = correctAnswers.some(ans => {
        // Direct match: 'turn down'
        if(processedUserAnswer === ans) return true
        // Separated match: 'turn it down' vs 'turn down'
        if(ans.includes(' ') && processedUserAnswer.startsWith(ans.split(' ')[0]) && processedUserAnswer.endsWith(ans.split(' ')[1])) return true
        return false
    });

    // Special handling for the separable question #4
    if (q.id === 4) {
      isCorrect = correctAnswers.some(ans => {
        const verb = ans.split(' ')[0]; // 'fix' or 'do'
        const particle = ans.split(' ')[1]; // 'up'
        const expectedPattern = new RegExp(`^${verb}\\s+it\\s+${particle}$`);
        return expectedPattern.test(userAnswer);
      });
    }

    newResults.push({
      id: q.id,
      question: q.sentence,
      userAnswer: userAnswers.value[index] || '(No answer)',
      correctAnswer: q.correctAnswer,
      isCorrect: isCorrect,
      explanation: q.explanation,
      teacherTip: q.teacherTip
    })
  })
  results.value = newResults
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    const resultEl = document.getElementById('results-section');
    if(resultEl) resultEl.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function tryAgain() {
  userAnswers.value.fill('')
  results.value = []
  showResult.value = false
}
</script>

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
    <!-- ======================================================================= -->
    <!-- MATERIAL SLOT: THE LESSON                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpenCheck class="h-6 w-6 text-primary" /> Core Concepts: UP vs. DOWN</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The particles 'up' and 'down' add significant, often abstract, meaning to verbs. Mastering them requires moving beyond their literal meanings of direction. Think of them as conceptual operators:</p>
          <ul class="list-disc space-y-2 pl-5">
            <li>
              <strong>UP</strong> often signifies <strong>completion, creation, or increase</strong>. Imagine something being built 'up' to a final state, or a value going 'up'.
              <br><span class="text-xs text-muted-foreground">Examples: <strong>set up</strong> a business (create), <strong>write up</strong> a report (complete), <strong>turn up</strong> the heat (increase).</span>
            </li>
            <li>
              <strong>DOWN</strong> frequently implies <strong>reduction, cessation, or recording</strong>. Picture a volume being turned 'down', an entity being taken 'down', or notes being written 'down'.
              <br><span class="text-xs text-muted-foreground">Examples: <strong>calm down</strong> (reduce agitation), <strong>break down</strong> (cease function), <strong>write down</strong> notes (record).</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Phrasal Verb Word Bank</CardTitle>
          <CardDescription>Use the base form of these verbs to complete the exercises. Conjugate them correctly in your answers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-2">
            <code v-for="verb in phrasalVerbBank" :key="verb" class="rounded-md bg-muted px-2 py-1 text-sm font-semibold">{{ verb }}</code>
          </div>
          <Separator class="my-4" />
          <Alert>
            <AlertTitle class="font-bold">Teacher's Insight: Separability</AlertTitle>
            <AlertDescription>
              Some of these verbs are 'separable'. This means an object can come between the verb and the particle.
              <br>Example: "They <strong class="text-primary">tore</strong> the building <strong class="text-primary">down</strong>." vs "They <strong class="text-primary">tore down</strong> the building."
              <br><strong>Crucial Rule:</strong> If the object is a pronoun (it, them, him), it MUST be separated: "They <strong class="text-primary">tore it down</strong>." (Correct) / <s class="text-destructive">"They tore down it."</s> (Incorrect)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE SLOT: THE QUESTIONS                                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Complete the sentences. You may need to change the verb tense. For separable verbs, place the object correctly.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="grid gap-2">
            <Label :for="`q${question.id}`">
              <span class="font-bold mr-2">{{ question.id }}.</span>{{ question.sentence.split('______')[0] }}
              <Input
                :id="`q${question.id}`"
                v-model="userAnswers[index]"
                type="text"
                class="inline-block w-auto mx-2 px-2 h-8 border-b-2 border-primary border-0 rounded-none focus:ring-0 focus:border-b-2 focus:border-ring"
                placeholder="your answer"
              />{{ question.sentence.split('______')[1] }}
            </Label>
          </div>
          <Separator />
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="tryAgain">Reset</Button>
            <Button @click="validateAnswers">Check Answers</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULT SLOT: THE VALIDATOR & EXPLANATIONS                               -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-border">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review the detailed explanations to enhance your understanding.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="text-lg font-bold">Score: {{ score }}%</div>
              <Progress :model-value="score" class="w-[60%]" />
            </div>
            <Separator />
            <div v-for="result in results" :key="result.id" class="space-y-2">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                  <XCircle v-else class="h-5 w-5 text-red-500" />
                </div>
                <div class="flex-grow">
                  <p class="text-sm">
                    <strong>{{ result.id }}.</strong>
                    <span v-html="result.question.replace('______', `<strong class='${result.isCorrect ? 'text-green-600' : 'text-red-600'}'>${result.userAnswer}</strong>`)"></span>
                  </p>
                  <p v-if="!result.isCorrect" class="text-sm text-muted-foreground">
                    <span class="font-semibold">Correct answer(s):</span>
                    <span class="font-mono text-green-700 ml-1">{{ result.correctAnswer.join(' / ') }}</span>
                  </p>
                </div>
              </div>
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="mt-2 bg-muted/50">
                <AlertTitle class="font-bold">Explanation</AlertTitle>
                <AlertDescription>
                  {{ result.explanation }}
                  <template v-if="result.teacherTip">
                    <Separator class="my-2" />
                    <p class="text-xs italic"><strong class="font-semibold not-italic">Teacher's Tip:</strong> {{ result.teacherTip }}</p>
                  </template>
                </AlertDescription>
              </Alert>
            </div>
             <Separator />
            <div class="flex justify-end">
              <Button @click="tryAgain">Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles for this page only */
input:focus {
  outline: none;
  box-shadow: none;
}
</style>
