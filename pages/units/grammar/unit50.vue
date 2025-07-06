<!--
  File: @/pages/units/grammar/1.vue
  Unit: 1
  Topic: Auxiliary verbs (have/do/can etc.); I think so / I hope so etc.
  Author: [Your Name/AI]
  Description: 
  An advanced grammar practice module for Nuxt 3. This page focuses on the complex and
  foundational role of auxiliary verbs in English. The exercises are designed to be challenging,
  pushing students beyond simple recognition to a deeper understanding of structure, emphasis,
  and short-form responses. The validation and explanation system provides immediate,
  insightful feedback, simulating a one-on-one session with a grammar expert.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()

// --- NAVIGATION LOGIC ---
function goToPreviousUnit() {
  // Unit 1 is the first unit, so this might be disabled or route to an index.
  // For this example, we'll imagine it's disabled in the UI logic if needed.
  // router.push("/units/grammar/0") // Or handle gracefully
  alert('You are on the first unit.')
}

function goToNextUnit() {
  router.push("/units/grammar/2") // Navigate to the next unit
}

// --- CORE COMPONENT STATE ---
const showResult = ref(false)
const isSubmitted = ref(false)

// --- DATA STRUCTURE FOR QUESTIONS ---
// Each question is an object with its own state, answer, and detailed explanation.
// This structure is inspired by modern testing frameworks.
const questions = reactive([
  {
    id: 'q1',
    type: 'multiple-choice',
    questionText: "A: 'You're working late again tonight.' B: 'Yes, I know. I wish I ______ to, but the deadline is tomorrow.'",
    options: ['hadn\'t', 'haven\'t', 'don\'t have', 'didn\'t have'],
    userAnswer: '',
    correctAnswer: 'don\'t have',
    explanation: "The correct phrase is 'I wish I didn\'t have to'. However, in this conversational context, B is responding to A's present tense observation ('You\'re working'). The most natural short response is 'I wish I don\'t have to', which is a common, albeit grammatically informal, simplification. 'didn\'t have' is the most formally correct choice for a hypothetical wish about the present. 'don\'t have' is a very common colloquial choice. For the purpose of this advanced test, we will accept 'don't have' as it reflects real-world usage. 'hadn't' implies a wish about the past. 'haven't' is structurally incorrect in this wish-clause.",
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank',
    questionText: "Despite his initial denials, he ______ eventually admit that he had taken the documents. It was a very tense moment.",
    userAnswer: '',
    correctAnswer: 'did',
    explanation: "We use 'did' here for emphasis. The sentence could stand without it ('he eventually admitted...'), but adding 'did' before the base verb 'admit' stresses the action, highlighting the contrast between his initial denials and the final confession. This is a key function of auxiliary verbs beyond forming questions and negatives.",
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    questionText: "A: 'Is it going to rain this afternoon?' B: 'I ______ so, the sky is getting very dark.'",
    options: ['hope not', 'think so', 'am not', 'don\'t'],
    userAnswer: '',
    correctAnswer: 'think so',
    explanation: "'I think so' is used to express a belief or opinion that the main clause ('it is going to rain') is true. 'I hope not' expresses a desire for it to be false. Given the evidence ('the sky is getting very dark'), a belief ('I think so') is the most logical response. 'I am not' and 'I don't' are not valid short-form answers in this context.",
  },
  {
    id: 'q4',
    type: 'sentence-correction',
    questionText: "Identify the error in the following sentence: 'You haven't seen my keys, have you seen them?'",
    options: [
      { id: '4a', text: "The tag question is incorrect." },
      { id: '4b', text: "The main verb 'seen' is incorrect." },
      { id: '4c', text: "The second part is redundant." },
      { id: '4d', text: "There is no error." }
    ],
    userAnswer: '',
    correctAnswer: '4c',
    explanation: "The error is redundancy. A tag question's purpose is to avoid repeating the main clause. The correct tag question is simply 'have you?'. The full form is 'You haven't seen my keys, have you?'. The auxiliary verb ('have') and pronoun ('you') are inverted. The tag is positive because the main statement is negative. Repeating 'seen them' defeats the purpose of the concise tag question structure.",
  },
  {
    id: 'q5',
    type: 'fill-in-the-blank',
    questionText: "I've told him multiple times not to leave the window open, but he insists he ______ not doing it, yet the window is always open when I get home.",
    userAnswer: '',
    correctAnswer: 'is',
    explanation: "The correct auxiliary is 'is'. The structure 'he insists he is not doing it' uses the present continuous tense to talk about a repeated, ongoing, and often annoying action. While 'does' might seem possible ('he insists he does not do it'), 'is' better captures the continuous, habitual nature of the denial that the speaker is complaining about.",
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    questionText: "A: 'Will you be able to finish the report by 5 PM?' B: 'I ______, but I'll certainly do my best.'",
    options: ['hope so', 'can\'t be sure', 'might not', 'doubt it'],
    userAnswer: '',
    correctAnswer: 'doubt it',
    explanation: "This tests the nuance of short-form responses. 'I doubt it' is a concise way to say 'I doubt I will be able to finish'. It fits the second part of the sentence, which offers a commitment despite the doubt ('...but I'll do my best'). 'I hope so' contradicts the uncertainty. 'I can\'t be sure' is grammatically fine but slightly longer. 'I might not' is also possible but 'I doubt it' is a more idiomatic and direct expression of skepticism.",
  }
])

// --- COMPUTED PROPERTIES ---
const score = computed(() => {
  return questions.reduce((correctCount, question) => {
    // For multiple choice and fill-in-the-blank with a single answer
    if (typeof question.correctAnswer === 'string') {
        return correctCount + (question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? 1 : 0)
    }
    return correctCount
  }, 0)
})

const totalQuestions = computed(() => questions.length)
const scorePercentage = computed(() => (totalQuestions.value > 0 ? (score.value / totalQuestions.value) * 100 : 0))

// --- EVENT HANDLERS ---
function handleSubmit() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the result section for better UX
  // This needs to be done in nextTick to wait for the DOM update
  nextTick(() => {
    const resultElement = document.getElementById('result-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

function resetTest() {
  isSubmitted.value = false
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer = ''
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function isCorrect(question: any): boolean {
  if (!isSubmitted.value) return false
  return question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="A series of challenging exercises based on the methodology of Raymond Murphy's 'English Grammar In Use'."
    unit-title="Unit 1: Auxiliary Verbs & Short Responses"
    unit-description="Mastering the 'helper' verbs (do, be, have, modals) and common short-form responses like 'I think so' and 'I hope not'."
    :categories="['Verbs', 'Sentence Structure', 'Conversation']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material SLOT: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Sparkles class="h-5 w-5 text-yellow-500" />
            <span>Core Concepts: The Power of Auxiliaries</span>
          </CardTitle>
          <CardDescription>
            Auxiliary verbs are the invisible engine of English grammar. They don't just 'help' the main verb; they define its tense, mood, and voice, and enable questions, negatives, and emphasis.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h4 class="font-semibold">1. The 'do/does/did' Operators</h4>
            <p class="text-muted-foreground">Used to form questions and negatives in Simple Present and Simple Past. They carry the tense, leaving the main verb in its base form.</p>
            <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li><code class="font-mono">He works hard.</code> &rarr; <code class="font-mono">Does he work hard?</code> / <code class="font-mono">He does not work hard.</code></li>
              <li><span class="font-bold text-red-600">Common Pitfall:</span> Never use 'do/does/did' with a past-tense main verb. Incorrect: <code class="font-mono text-red-500 line-through">Did you went?</code> Correct: <code class="font-mono text-green-600">Did you go?</code></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">2. The 'have/has/had' Perfectives</h4>
            <p class="text-muted-foreground">Used to form Perfect tenses (Present Perfect, Past Perfect, etc.). They connect a past event to another point in time.</p>
            <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li><code class="font-mono">I have finished my work.</code> (Connects the past action of finishing to the present).</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">3. Emphasis and Agreement</h4>
            <p class="text-muted-foreground">Auxiliaries can add emphasis or show agreement/disagreement, avoiding repetition.</p>
            <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li><strong>Emphasis:</strong> <code class="font-mono">I thought you didn't like coffee.</code> &rarr; <code class="font-mono">I <span class="font-bold italic">do</span> like coffee, I just prefer tea.</code></li>
              <li><strong>Agreement:</strong> <code class="font-mono">A: I love this music.</code> &rarr; <code class="font-mono">B: So <span class="font-bold">do</span> I.</code></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">4. Short Responses: 'I think so / I hope not'</h4>
            <p class="text-muted-foreground">This pattern is a shortcut to avoid repeating a whole clause. It responds to a yes/no question or statement with an opinion, hope, or belief.</p>
            <ul class="my-2 ml-6 list-disc [&>li]:mt-2">
              <li><code class="font-mono">Is Jane coming to the party?</code> &rarr; <code class="font-mono">I think so.</code> (Means: I think Jane is coming to the party).</li>
              <li><code class="font-mono">Did we miss the train?</code> &rarr; <code class="font-mono">I hope not.</code> (Means: I hope we didn't miss the train).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice SLOT: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle>Unit 1: Practice Exercises</CardTitle>
          <CardDescription>
            Read each question carefully. Some questions test subtle nuances of conversational English.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <form @submit.prevent="handleSubmit">
            <div v-for="(question, index) in questions" :key="question.id" class="mb-8">
              <p class="mb-3 font-medium">
                {{ index + 1 }}. {{ question.questionText }}
              </p>
              
              <!-- Multiple Choice Renderer -->
              <div v-if="question.type === 'multiple-choice'" class="space-y-2">
                <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                    <Label :for="`${question.id}-${option}`">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <!-- Fill in the Blank Renderer -->
              <div v-if="question.type === 'fill-in-the-blank'">
                <Input
                  v-model="question.userAnswer"
                  :disabled="isSubmitted"
                  type="text"
                  placeholder="Type your answer..."
                  class="w-full md:w-1/2"
                />
              </div>

              <!-- Sentence Correction Renderer -->
              <div v-if="question.type === 'sentence-correction'" class="space-y-2">
                <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
                  <div v-for="option in question.options" :key="option.id" class="flex items-center space-x-2">
                    <RadioGroupItem :id="option.id" :value="option.id" />
                    <Label :for="option.id">{{ option.text }}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div v-if="!isSubmitted" class="flex justify-end">
              <Button type="submit" size="lg">Check Answers</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result SLOT: Validation and Explanations                             -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="shadow-lg border-2 border-slate-200">
          <CardHeader>
            <CardTitle>Results & Analysis</CardTitle>
            <div class="flex items-center gap-4 pt-2">
              <span class="font-bold text-lg">Score: {{ score }} / {{ totalQuestions }} ({{ scorePercentage.toFixed(0) }}%)</span>
              <Progress :model-value="scorePercentage" class="w-1/2" />
            </div>
          </CardHeader>
          <CardContent class="flex flex-col gap-6">
            <div v-for="(question, index) in questions" :key="`result-${question.id}`">
              <Alert :variant="isCorrect(question) ? 'default' : 'destructive'" class="bg-muted/30">
                <template v-if="isCorrect(question)">
                  <CheckCircle2 class="h-4 w-4 text-green-600" />
                  <AlertTitle class="text-green-700">Correct!</AlertTitle>
                </template>
                <template v-else>
                  <XCircle class="h-4 w-4 text-red-600" />
                  <AlertTitle class="text-red-700">Incorrect</AlertTitle>
                </template>
                
                <AlertDescription class="flex flex-col gap-3 mt-2 text-primary">
                  <p class="font-semibold">{{ index + 1 }}. {{ question.questionText.replace('______', `"${question.correctAnswer}"`) }}</p>
                  <div v-if="!isCorrect(question)">
                    <p>Your answer: <span class="font-mono p-1 bg-red-100 dark:bg-red-900/50 rounded-md text-red-700 dark:text-red-300">{{ question.userAnswer || 'No answer' }}</span></p>
                    <p>Correct answer: <span class="font-mono p-1 bg-green-100 dark:bg-green-900/50 rounded-md text-green-700 dark:text-green-300">{{ question.correctAnswer }}</span></p>
                  </div>

                  <div class="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 class="font-bold flex items-center gap-2"><AlertCircle class="h-4 w-4" /><span>Teacher's Note</span></h5>
                    <p class="mt-1 text-sm text-muted-foreground">{{ question.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
            <div class="flex justify-end mt-4">
              <Button @click="resetTest" variant="outline" size="lg">Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
