<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components exist based on your layout and common practice
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, BookOpen, BrainCircuit, Repeat } from 'lucide-vue-next'

const router = useRouter()

// --- Navigation ---
function goToPreviousUnit() {
  router.push("/units/grammar/26")
}
function goToNextUnit() {
  router.push("/units/grammar/28")
}

// --- Component State Management ---
const showResult = ref(false)

// --- Instructional Material Data ---
// Inspired by legendary teachers who emphasize patterns and context (e.g., Michael Swan).
// We group verbs by preposition to help students form mental schemas.
const learningMaterial = [
  {
    preposition: 'of',
    title: 'Verbs followed by "of"',
    description: 'Often used to connect a verb to its object, indicating belonging, cause, or reference.',
    verbs: [
      { verb: 'accuse (somebody) of (something)', example: 'The prosecution accused him of theft and fraud.' },
      { verb: 'suspect (somebody) of (something)', example: 'I suspect my colleague of taking my notes.' },
      { verb: 'approve / disapprove of', example: 'His parents don\'t approve of his new venture.' },
      { verb: 'consist of', example: 'A healthy diet consists of a variety of fruits and vegetables.' },
      { verb: 'die of / from', example: 'Sadly, the ancient tree died of a fungal disease.' },
      { verb: 'dream of', example: 'She dreams of becoming a world-renowned astrophysicist.' },
    ]
  },
  {
    preposition: 'for',
    title: 'Verbs followed by "for"',
    description: 'Typically indicates purpose, reason, or in exchange for something.',
    verbs: [
      { verb: 'apologise for', example: 'You must apologise for your unacceptable behaviour.' },
      { verb: 'blame (somebody) for', example: 'Don\'t blame me for the traffic; I didn\'t cause it.' },
      { verb: 'forgive (somebody) for', example: 'Can you ever forgive him for what he did?' },
      { verb: 'thank (somebody) for', example: 'I must thank you for your incredible generosity.' },
      { verb: 'search for', example: 'The rescue team is searching for the missing hikers.' },
      { verb: 'pay for', example: 'He offered to pay for the damage to the car.' },
    ]
  },
  {
    preposition: 'from',
    title: 'Verbs followed by "from"',
    description: 'Used to show separation, origin, prevention, or protection.',
    verbs: [
      { verb: 'suffer from', example: 'Many people in this region suffer from a lack of clean water.' },
      { verb: 'protect (somebody) from', example: 'This cream should protect your skin from the sun.' },
      { verb: 'recover from', example: 'It took her several months to fully recover from the surgery.' },
      { verb: 'prevent (somebody) from (doing something)', example: 'The lockdown was designed to prevent the virus from spreading.' },
      { verb: 'borrow (something) from (somebody)', example: 'Could I borrow a pen from you?' },
      { verb: 'differ from', example: 'The new model differs significantly from the previous one.' },
    ]
  },
  {
    preposition: 'on',
    title: 'Verbs followed by "on"',
    description: 'Often denotes focus, reliance, or the subject of an action/comment.',
    verbs: [
      { verb: 'concentrate on', example: 'Please be quiet, I need to concentrate on my work.' },
      { verb: 'insist on', example: 'She insisted on paying for everyone\'s meal.' },
      { verb: 'spend (money) on', example: 'He spends far too much money on expensive gadgets.' },
      { verb: 'rely on', example: 'In the wilderness, you can only rely on your survival skills.' },
      { verb: 'congratulate (somebody) on', example: 'I\'d like to congratulate you on your outstanding achievement.' },
      { verb: 'comment on', example: 'The director refused to comment on the recent allegations.' },
    ]
  }
]

// --- Practice Questions ---
// These are designed to be challenging, with plausible distractors and complex sentence structures.
const questions = reactive([
  { id: 1, sentence: "After a lengthy investigation, the board of directors cleared the CEO ___ all allegations of misconduct.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'of', userAnswer: '', explanation: "The verb 'clear' is used with 'of' to mean removing suspicion or guilt. We clear someone 'of' a charge or allegation." },
  { id: 2, sentence: "The new eco-friendly packaging is designed to protect the fragile contents ___ damage during shipping.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'from', userAnswer: '', explanation: "We use 'protect (something) from (something)' to indicate what is being guarded against. The damage is the threat we are protecting the item 'from'." },
  { id: 3, sentence: "I can't forgive my brother ___ forgetting my birthday, but I'll forgive him ___ not calling.", options: ['for / for', 'of / for', 'for / of', 'from / on'], correctAnswer: 'for / for', userAnswer: '', explanation: "The verb 'forgive' takes the preposition 'for' to specify the reason for forgiveness. This applies to both clauses: forgive 'for' forgetting and forgive 'for' not calling." },
  { id: 4, sentence: "The political commentator was heavily criticized ___ her controversial remarks made on live television.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'for', userAnswer: '', explanation: "We use 'criticize (somebody) for (something)' to provide the reason for the criticism. The remarks are the reason, so 'for' is correct." },
  { id: 5, sentence: "The startup's success will ultimately depend ___ its ability to adapt to changing market conditions.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'on', userAnswer: '', explanation: "The verb 'depend' is followed by 'on' (or 'upon') to indicate reliance or conditionality. Success is conditional 'on' the ability to adapt." },
  { id: 6, sentence: "After years of research, scientists have finally cured the patient ___ the rare genetic disorder.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'of', userAnswer: '', explanation: "The verb 'cure' is used with 'of' to specify the illness that has been eradicated. We cure a person 'of' a disease." },
  { id: 7, sentence: "The senator was forced to resign ___ his position after the scandal was exposed by the media.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'from', userAnswer: '', explanation: "The verb 'resign' is followed by 'from' to indicate the position or organization being left. One resigns 'from' a job." },
  { id: 8, sentence: "The team collaborated ___ the project for months, but they couldn't agree ___ a final strategy.", options: ['on / on', 'for / on', 'on / for', 'for / for'], correctAnswer: 'on / on', userAnswer: '', explanation: "We 'collaborate on' a project and 'agree on' a plan or topic. 'On' is used in both cases to specify the subject of the action." },
  { id: 9, sentence: "He prides himself ___ his ability to distinguish a genuine antique ___ a clever forgery.", options: ['on / from', 'for / from', 'on / of', 'of / from'], correctAnswer: 'on / from', userAnswer: '', explanation: "The phrasal verb is 'pride oneself on (something)'. The verb 'distinguish' is used with 'from' to separate two things: distinguish A 'from' B." },
  { id: 10, sentence: "The community is still suffering ___ the devastating effects of the recent hurricane.", options: ['of', 'for', 'from', 'on'], correctAnswer: 'from', userAnswer: '', explanation: "We use 'suffer from' to talk about experiencing something unpleasant, like an illness or a negative situation. The effects of the hurricane are the source of suffering." },
]);


// --- Computed Properties for Validation & UI ---
const allQuestionsAnswered = computed(() => {
  return questions.every(q => q.userAnswer !== '');
});

const score = computed(() => {
  if (!showResult.value) return 0;
  const correctCount = questions.filter(q => q.userAnswer === q.correctAnswer).length;
  return Math.round((correctCount / questions.length) * 100);
});

// --- Event Handlers ---
function handleSubmit() {
  if (!allQuestionsAnswered.value) {
    // Optionally, show an alert to the user
    alert("Please answer all questions before checking your results.");
    return;
  }
  showResult.value = true;
  // Scroll to results for better UX
  // This needs to wait for the DOM update
  nextTick(() => {
    const resultElement = document.getElementById('results-section');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function handleReset() {
  questions.forEach(q => q.userAnswer = '');
  showResult.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Data for Layout Props ---
const pageData = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 27: Verb + preposition 4',
  unitDescription: 'Mastering the use of `of`, `for`, `from`, and `on` after specific verbs. Study the material, then test your knowledge.',
  categories: ['Verbs', 'Prepositions', 'Collocations', 'Advanced']
}
</script>

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
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            <span>Study Zone: Verb Patterns</span>
          </CardTitle>
          <CardDescription>
            Focus on the patterns below. The preposition is not random; it's a fixed part of the verb's meaning and structure.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="material in learningMaterial" :key="material.preposition">
            <h3 class="mb-2 text-lg font-semibold tracking-tight">
              {{ material.title }}
            </h3>
            <p class="mb-3 text-sm text-muted-foreground">{{ material.description }}</p>
            <ul class="space-y-2 pl-4">
              <li v-for="verb in material.verbs" :key="verb.verb" class="text-sm">
                <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">{{ verb.verb }}</code>
                <p class="pl-2 italic text-muted-foreground">e.g., "{{ verb.example }}"</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-primary" />
            <span>Practice Zone: Test Your Knowledge</span>
          </CardTitle>
          <CardDescription>
            Choose the correct preposition to complete each sentence. Read carefully!
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="mb-3 font-medium">
              {{ index + 1 }}. {{ question.sentence.split('___')[0] }}
              <span class="inline-block h-5 w-16 rounded-md border-b-2 border-dashed border-primary align-middle"></span>
              {{ question.sentence.split('___')[1] }}
            </p>
            <RadioGroup v-model="question.userAnswer" :disabled="showResult" class="flex flex-wrap gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                <Label :for="`q${question.id}-${option}`" class="cursor-pointer font-mono text-base">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <Button v-if="!showResult" :disabled="!allQuestionsAnswered" @click="handleSubmit" size="lg" class="w-full">
            Check My Answers
          </Button>
          <p v-if="!allQuestionsAnswered && !showResult" class="text-center text-sm text-muted-foreground">
            Please answer all questions to enable the "Check" button.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS & EXPLANATIONS SLOT                                             -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-2 border-primary">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results & Analysis</CardTitle>
            <CardDescription>Review each question to understand the correct grammar and solidify your learning.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div>
              <div class="mb-2 flex justify-between">
                <span class="font-bold">Overall Score:</span>
                <span :class="['font-bold text-xl', score > 70 ? 'text-green-600' : 'text-orange-600']">{{ score }}%</span>
              </div>
              <Progress :model-value="score" />
            </div>

            <!-- Detailed Breakdown -->
            <div v-for="(question, index) in questions" :key="`result-${question.id}`">
              <div :class="['p-4 rounded-md', question.userAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200']">
                <div class="flex items-start gap-4">
                  <div>
                    <CheckCircle v-if="question.userAnswer === question.correctAnswer" class="h-6 w-6 text-green-600" />
                    <XCircle v-else class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold">{{ index + 1 }}. {{ question.sentence.replace('___', `[${question.userAnswer}]`) }}</p>
                    <div v-if="question.userAnswer !== question.correctAnswer" class="mt-2">
                      <p class="text-sm">
                        <span class="font-bold">Correct Answer:</span> 
                        <span class="font-mono bg-green-100 text-green-800 px-1 py-0.5 rounded">{{ question.correctAnswer }}</span>
                      </p>
                    </div>
                    <Alert class="mt-3 bg-blue-50 border-blue-200">
                      <AlertTitle class="text-blue-800">Grammar Explanation</AlertTitle>
                      <AlertDescription class="text-blue-900">
                        {{ question.explanation }}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <Button @click="handleReset" size="lg" variant="outline" class="w-full mt-6">
              <Repeat class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>

  </GrammarLayout>
</template>
