<!--
  File: @/pages/units/grammar/24.vue
  Description: A comprehensive grammar practice unit on "must" vs "have to".
  This page provides in-depth learning material, challenging contextual questions,
  and an intelligent validator with detailed explanations, designed to significantly
  improve a student's understanding of these modal verbs.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component UI Imports ---
// These are necessary for rendering the practice and results sections.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = 'Intermediate English Grammar Practice'
const testDescription = 'Based on "English Grammar in Use" by Raymond Murphy'
const unitTitle = 'Unit 24: Have to and Must'
const unitDescription = "A deep dive into the nuances of obligation and necessity. This unit explores the subtle but critical differences between expressing internal feelings of obligation ('must') and external requirements ('have to')."
const categories = ['Modals', 'Obligation', 'Necessity', 'Prohibition']

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push("/units/grammar/23")
const goToNextUnit = () => router.push("/units/grammar/25")

// --- Question & State Management ---
// This reactive structure holds the state of the practice session.
const showResult = ref(false)
const userAnswers = ref<Record<number, string>>({})

// The core data for the practice session. Each question is crafted to test a specific
// nuance, with explanations that act as a mini-lesson, emulating a teacher's feedback.
const questions = ref([
  {
    id: 1,
    question: "You want to emphasize that it is your own personal, strong feeling that you need to visit your grandparents more often. Which sentence is most appropriate?",
    options: [
      { value: 'A', text: "I have to visit my grandparents more often." },
      { value: 'B', text: "I must visit my grandparents more often." },
      { value: 'C', text: "I should visit my grandparents more often." },
    ],
    correctAnswer: 'B',
    explanation: "'Must' is used to express a strong personal feeling or a self-imposed obligation. The speaker feels it is important. 'Have to' suggests an external obligation (e.g., a family rule), and 'should' is weaker, more like advice."
  },
  {
    id: 2,
    question: "A sign in a hospital reads: 'All visitors ___ report to the reception desk.' What is the correct word for this formal, written rule?",
    options: [
      { value: 'A', text: "have to" },
      { value: 'B', text: "must" },
      { value: 'C', text: "are obliged to" },
    ],
    correctAnswer: 'B',
    explanation: "'Must' is very common and natural for formal written rules, notices, and instructions. While 'have to' is not grammatically wrong, 'must' is the standard choice for this context."
  },
  {
    id: 3,
    question: "Your friend offers you a ticket to a concert tonight, but you have a deadline for a major project at work tomorrow. You say: 'I can't. I ___ finish this report.'",
    options: [
      { value: 'A', text: "must" },
      { value: 'B', text: "have to" },
      { value: 'C', text: "must have to" },
    ],
    correctAnswer: 'B',
    explanation: "The obligation comes from an external source (your job/boss). 'Have to' is the natural choice to describe obligations imposed by rules, laws, or other people."
  },
  {
    id: 4,
    question: "Which sentence correctly expresses that something is NOT necessary, but is possible if one chooses?",
    options: [
      { value: 'A', text: "You mustn't pay to enter the museum; it's forbidden." },
      { value: 'B', text: "You don't have to pay to enter the museum; it's free." },
      { value: 'C', text: "You can't pay to enter the museum; they don't accept money." },
    ],
    correctAnswer: 'B',
    explanation: "This is a critical distinction. 'Don't have to' means there is no obligation. 'Mustn't' means there is a prohibition (it's important NOT to do it). 'You don't have to pay' means you can if you want (e.g., a donation), but it is not required."
  },
  {
    id: 5,
    question: "Reflecting on your difficult day yesterday, you say: 'The meeting was a disaster. I ___ stay late to fix the presentation.'",
    options: [
      { value: 'A', text: "musted" },
      { value: 'B', text: "must have stayed" },
      { value: 'C', text: "had to" },
    ],
    correctAnswer: 'C',
    explanation: "'Must' has no past tense form for obligation. To talk about past obligations, we always use 'had to'. 'Musted' is not a word, and 'must have stayed' is a modal of deduction about the past, not obligation."
  },
  {
    id: 6,
    question: "A doctor tells a patient with a serious allergy: 'You ___ eat peanuts. It could be fatal.'",
    options: [
      { value: 'A', text: "don't have to" },
      { value: 'B', text: "mustn't" },
      { value: 'C', text: "shouldn't" },
    ],
    correctAnswer: 'B',
    explanation: "'Mustn't' signifies a strong prohibition, often due to danger or a strict rule. It means it is essential that you DO NOT do something. 'Don't have to' would incorrectly imply it's optional, and 'shouldn't' is not strong enough for a life-threatening situation."
  },
  {
    id: 7,
    question: "In the UK, drivers ___ drive on the left side of the road. This is a law.",
    options: [
      { value: 'A', text: "must" },
      { value: 'B', text: "have to" },
      { value: 'C', text: "Both A and B are correct and natural here." },
    ],
    correctAnswer: 'B',
    explanation: "While both can be used to talk about laws, 'have to' is far more common and natural in general conversation when referring to an external rule or law that applies to everyone. 'Must' can sound very formal or emphatic, as if stating the rule itself rather than just discussing it."
  },
  {
    id: 8,
    question: "You're reminding yourself about a promise. 'I ___ forget to call Sarah, I promised her I would.' What's the best choice?",
    options: [
      { value: 'A', text: "mustn't" },
      { value: 'B', text: "don't have to" },
    ],
    correctAnswer: 'A',
    explanation: "The speaker is emphasizing the importance of NOT forgetting. This is a negative obligation or prohibition, which is the core meaning of 'mustn't'. 'I don't have to forget' would be a very unnatural and illogical sentence."
  }
])

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

const scoreFeedback = computed(() => {
    const percentage = scorePercentage.value
    if (percentage === 100) return "Perfect! You have an excellent command of these modals."
    if (percentage >= 75) return "Great job! You have a strong understanding of the key differences."
    if (percentage >= 50) return "Good effort. Review the explanations to clarify the trickier points."
    return "This is a tough topic. Review the material and the explanations carefully to build your confidence."
})

// --- Methods ---
function checkAnswers() {
  // Check if all questions have been answered before showing results
  if (Object.keys(userAnswers.value).length !== questions.value.length) {
    alert('Please answer all questions before checking your score.')
    return
  }
  showResult.value = true
  // Scroll to the results section for better UX
  const resultElement = document.getElementById('results-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Learning Material Slot                                                  -->
    <!-- This section provides the core teaching content.                        -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Obligation from Where?</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The key to mastering <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">'must'</code> and <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">'have to'</code> is identifying the <strong>source of the obligation</strong>.</p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-lg border bg-card p-4">
              <h4 class="font-bold">Must: The Speaker's Authority</h4>
              <p class="text-muted-foreground">Used for obligations you impose on yourself or others. It comes from <strong>your personal feelings</strong>.</p>
              <ul class="mt-2 list-inside list-disc space-y-1">
                <li><strong class="text-primary">I must</strong> finish this book. (My own decision)</li>
                <li><strong class="text-primary">You must</strong> try this cake! (My strong recommendation)</li>
                <li>Used for <strong>formal, written rules</strong> (e.g., on a sign):<br><em>Staff must wash hands.</em></li>
              </ul>
            </div>
            <div class="rounded-lg border bg-card p-4">
              <h4 class="font-bold">Have to: The External Rule</h4>
              <p class="text-muted-foreground">Used for obligations from an <strong>external source</strong> like a law, a rule, or another person's order.</p>
              <ul class="mt-2 list-inside list-disc space-y-1">
                <li><strong class="text-primary">I have to</strong> wear a suit to work. (Company policy)</li>
                <li><strong class="text-primary">She has to</strong> get a visa for the USA. (The law)</li>
                <li>Much more common in general conversation than 'must'.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle>Crucial Distinction: Negatives</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>The negative forms have completely different meanings and are a common source of error.</p>
          <div>
            <h4 class="font-bold">Mustn't = Prohibition (Don't do it!)</h4>
            <p class="text-muted-foreground">It is very important that you <strong>do not</strong> do something. It's forbidden or dangerous.</p>
            <p class="mt-1 font-mono text-destructive-foreground bg-destructive/80 rounded-md p-2">Example: "You <strong>mustn't</strong> touch that wire, it's live."</p>
          </div>
           <div>
            <h4 class="font-bold">Don't have to = No Obligation (Not necessary)</h4>
            <p class="text-muted-foreground">You are not required to do something, but you can if you want to. There is a choice.</p>
            <p class="mt-1 font-mono text-primary-foreground bg-primary/80 rounded-md p-2">Example: "You <strong>don't have to</strong> come to the party if you're busy."</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Forms & Tenses</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
           <p><strong class="text-primary">Past Tense:</strong> 'Must' has no past tense for obligation. Always use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">'had to'</code>.</p>
           <p class="pl-4 text-muted-foreground">Yesterday, I <strong class="text-primary">had to</strong> work late. (NOT <s class="text-destructive">I musted work</s>)</p>
           <p><strong class="text-primary">Questions:</strong> It is much more common to use 'Do you have to...?' in questions.</p>
           <p class="pl-4 text-muted-foreground"><strong class="text-primary">Do you have to</strong> get up early tomorrow? (More natural than 'Must you...?')</p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- This section contains the interactive quiz.                             -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <p class="text-sm text-muted-foreground">Choose the most appropriate option for each context.</p>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="q.id">
            <fieldset class="space-y-3">
              <legend class="font-semibold">{{ index + 1 }}. {{ q.question }}</legend>
              <RadioGroup v-model="userAnswers[q.id]" class="space-y-2 pl-2">
                <div v-for="option in q.options" :key="option.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${q.id}-${option.value}`" :value="option.value" />
                  <Label :for="`q${q.id}-${option.value}`">{{ option.text }}</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" @click="checkAnswers">Check My Answers</Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- Results Slot                                                            -->
    <!-- This section is conditionally rendered to show the results.             -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <p class="text-muted-foreground">{{ scoreFeedback }}</p>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <span class="font-bold text-lg">Score: {{ score }} / {{ questions.length }}</span>
              <Progress :model-value="scorePercentage" class="flex-1" />
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Detailed Breakdown:</h3>
              <div v-for="q in questions" :key="q.id">
                <Alert :variant="userAnswers[q.id] === q.correctAnswer ? 'default' : 'destructive'">
                  <template v-if="userAnswers[q.id] === q.correctAnswer">
                    <CheckCircle2 class="h-4 w-4" />
                    <AlertTitle class="text-green-700">Correct!</AlertTitle>
                  </template>
                  <template v-else>
                     <XCircle class="h-4 w-4" />
                    <AlertTitle class="text-destructive">Incorrect</AlertTitle>
                  </template>
                  
                  <AlertDescription class="space-y-2">
                    <p class="font-semibold">{{ q.question }}</p>
                    <p>Your answer: <span :class="{'font-bold': true, 'text-green-700': userAnswers[q.id] === q.correctAnswer, 'text-destructive': userAnswers[q.id] !== q.correctAnswer}">{{ q.options.find(opt => opt.value === userAnswers[q.id])?.text }}</span></p>
                    <p v-if="userAnswers[q.id] !== q.correctAnswer">Correct answer: <span class="font-bold text-green-700">{{ q.options.find(opt => opt.value === q.correctAnswer)?.text }}</span></p>
                    
                    <div class="mt-2 flex items-start gap-2 rounded-md border bg-muted p-3 text-sm">
                      <Lightbulb class="h-4 w-4 flex-shrink-0 text-yellow-500 mt-1" />
                      <div>
                        <p class="font-bold">Explanation:</p>
                        <p class="text-muted-foreground">{{ q.explanation }}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
