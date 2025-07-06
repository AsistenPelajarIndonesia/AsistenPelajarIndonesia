
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, BookOpenCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default layout
})

// --- Navigation ---
const router = useRouter()
const currentUnit = 9
function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}
function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- State Management for the Quiz ---
const isSubmitted = ref(false)
const showResult = ref(false)
const userAnswers = ref<Record<number, string>>({})

// --- Quiz Content ---
const questions = ref([
  {
    id: 1,
    text: "She's a very talented singer. She sings ______ an angel.",
    options: ['like', 'as'],
    correctAnswer: 'like',
    explanation: "Correct answer: 'like'. Here, 'like' is used as a preposition to mean 'similar to' or 'in the same way as'. We are making a direct comparison between her singing and the singing of an angel. 'As' would be incorrect because it is typically used to define a function or role, or as a conjunction followed by a clause (e.g., 'as she was taught').",
  },
  {
    id: 2,
    text: "I'm your friend, and ______ your friend, I feel I must warn you.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. We use 'as' + noun to talk about a function or a role. The speaker is not just 'similar to a friend'; they are acting *in the capacity of* a friend. This is a common structure for giving advice or stating a professional role (e.g., 'As your doctor, I advise...').",
  },
  {
    id: 3,
    text: "Don't move anything. You should leave the room exactly ______ you found it.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. In this sentence, 'as' functions as a conjunction connecting the main clause ('leave the room') to a subordinate clause ('you found it'). A conjunction is needed to link these two parts, and 'as' is the correct choice. 'Like' is a preposition and, in formal grammar, should not be followed by a subject-verb clause.",
  },
  {
    id: 4,
    text: "This perfume smells a bit ______ freshly cut grass.",
    options: ['like', 'as'],
    correctAnswer: 'like',
    explanation: "Correct answer: 'like'. With verbs of the senses (look, sound, feel, taste, smell), we use 'like' to make a comparison with a noun. The perfume has a smell that is *similar to* the smell of grass. 'As' is not used after these verbs for comparisons.",
  },
  {
    id: 5,
    text: "He's been working ______ a software developer since he graduated.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. This describes his job or profession. He isn't 'similar to a developer'; his actual job *is* a software developer. We always use 'as' to specify a person's profession or the function of an object.",
  },
  {
    id: 6,
    text: "My brother is nothing ______ me; we are complete opposites.",
    options: ['like', 'as'],
    correctAnswer: 'like',
    explanation: "Correct answer: 'like'. The expression 'nothing like' means 'not at all similar to'. 'Like' is the required preposition for this comparison. 'Nothing as me' is grammatically incorrect.",
  },
  {
    id: 7,
    text: "You can use this box ______ a chair, but it's not very comfortable.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. Here, we are describing the function of the box. It is being used *in the role of* a chair. 'Like a chair' would mean it resembles a chair, but 'as a chair' specifies its purpose in this context.",
  },
  {
    id: 8,
    text: "He talks to the dog ______ it were a human being.",
    options: ['like', 'as if'],
    correctAnswer: 'as if',
    explanation: "Correct answer: 'as if'. We use 'as if' (or 'as though') to talk about an imaginary or hypothetical situation. The dog is not a human, so the situation is unreal. 'Like' is often used informally in this way, but 'as if' is the grammatically precise and standard form, especially when followed by a clause.",
  },
  {
    id: 9,
    text: "I felt very tired, so I went to bed early, ______ I often do.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. Here, 'as' is a conjunction that introduces a comment clause ('as I often do'), referring back to the entire main clause ('I went to bed early'). This is a common structure used to add extra information or commentary. 'Like' is sometimes used in informal speech, but 'as' is standard.",
  },
  {
    id: 10,
    text: "In many countries, ______ in the UK, the traffic drives on the left.",
    options: ['like', 'as'],
    correctAnswer: 'as',
    explanation: "Correct answer: 'as'. 'As' is used here to mean 'in the way that it is' or to introduce an example that is a fact. 'As in the UK' means 'the same is true for the UK'. 'Like' would imply a more general similarity, but 'as' is used for factual parallels or examples of this nature.",
  },
])

// --- Computed Properties for Results ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

// --- Methods ---
function checkAnswers() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function getValidationClass(questionId: number) {
  if (!isSubmitted.value) return ''
  const userAnswer = userAnswers.value[questionId]
  const question = questions.value.find(q => q.id === questionId)
  if (!userAnswer || !question) return ''
  return userAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use Practice"
    test-description="Advanced exercises based on the book by Raymond Murphy."
    :unit-title="`Unit ${currentUnit}: Like and As`"
    unit-description="Mastering the crucial difference between comparison (like) and function/conjunction (as)."
    :categories="['Prepositions', 'Conjunctions', 'Common Usage']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Learning Material Slot                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpenCheck class="h-6 w-6 text-blue-600" />
            Core Principles
          </CardTitle>
          <CardDescription>The fundamental distinction between 'like' and 'as'.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">LIKE (Preposition) = 'similar to'</h4>
            <p class="text-muted-foreground">Use <code class="font-mono bg-muted px-1 py-0.5 rounded">'like'</code> to compare two different things. It is followed by a noun, pronoun, or -ing verb.</p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li>What a beautiful house! It's <strong class="text-primary">like</strong> a palace. (house is similar to a palace)</li>
              <li>He runs <strong class="text-primary">like</strong> the wind. (his running is similar to the wind)</li>
              <li>There's nothing <strong class="text-primary">like</strong> walking in the rain. (walking is being compared to other activities)</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold text-base">AS (Preposition) = 'in the capacity of'</h4>
            <p class="text-muted-foreground">Use <code class="font-mono bg-muted px-1 py-0.5 rounded">'as'</code> to talk about a job, role, or function.</p>
             <ul class="mt-2 ml-4 list-disc space-y-1">
              <li>She works <strong class="text-primary">as</strong> a teacher. (It *is* her job.)</li>
              <li>They used a stone <strong class="text-primary">as</strong> a hammer. (Its function was a hammer.)</li>
              <li><strong class="text-primary">As</strong> your manager, I have to approve this. (In my role as manager...)</li>
            </ul>
          </div>
           <Separator />
          <div>
            <h4 class="font-semibold text-base">AS (Conjunction)</h4>
            <p class="text-muted-foreground">Use <code class="font-mono bg-muted px-1 py-0.5 rounded">'as'</code> to connect a clause (subject + verb). It often means 'in the way that'.</p>
             <ul class="mt-2 ml-4 list-disc space-y-1">
              <li>Do it <strong class="text-primary">as</strong> I showed you. (as + subject 'I' + verb 'showed')</li>
              <li>He arrived late, <strong class="text-primary">as</strong> we expected. (...as + 'we' + 'expected')</li>
              <li>She's a talented actor, <strong class="text-primary">as</strong> is her brother.</li>
            </ul>
          </div>
          <div class="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-800">
            <h5 class="font-bold">The 'Informal Speech' Trap</h5>
            <p>In very informal (especially American) English, you'll hear 'like' used as a conjunction: "Do it <em class="line-through">like</em> I say". While common in speech, this is considered incorrect in formal writing and exams. The correct form is: "Do it <strong class="text-green-700">as</strong> I say."</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the correct word to complete each sentence. Think carefully about the grammar rule being tested.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="checkAnswers" class="space-y-8">
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-4">
              <div class="flex flex-col gap-2">
                <Label :for="`q${question.id}`" class="text-base font-medium">
                  {{ index + 1 }}. {{ question.text.split('______')[0] }}
                  <span class="inline-block w-20 border-b border-dashed align-middle mx-1"></span>
                  {{ question.text.split('______')[1] }}
                </Label>
                <RadioGroup v-model="userAnswers[question.id]" :id="`q${question.id}`" :disabled="isSubmitted">
                  <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                    <Label :for="`q${question.id}-${option}`" class="font-normal capitalize">{{ option }}</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator v-if="index < questions.length - 1" />
            </div>
            <Button v-if="!isSubmitted" type="submit" class="w-full">
              Check Answers
            </Button>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Results Slot                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle class="text-2xl">Your Results</CardTitle>
            <CardDescription>An analysis of your performance and detailed explanations to help you improve.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="flex flex-col sm:flex-row items-center gap-4 rounded-lg border bg-muted p-4">
                <div class="flex items-center gap-2">
                  <span class="text-4xl font-bold text-blue-600">{{ score }} / {{ questions.length }}</span>
                  <span class="text-muted-foreground">Correct</span>
                </div>
                <div class="w-full flex-1">
                  <Progress :model-value="scorePercentage" class="w-full" />
                </div>
            </div>
            
            <!-- Detailed Review -->
            <div class="space-y-6">
              <h3 class="text-xl font-semibold">Detailed Review</h3>
              <div v-for="(question, index) in questions" :key="`result-${question.id}`">
                <div class="rounded-lg border p-4" :class="[userAnswers[question.id] === question.correctAnswer ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10']">
                  <p class="font-medium">
                    {{ index + 1 }}. {{ question.text.replace('______', `...`) }}
                  </p>
                  <Separator class="my-3" />
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <!-- Your Answer -->
                    <div class="flex items-start gap-3">
                      <template v-if="userAnswers[question.id] === question.correctAnswer">
                        <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-500 mt-0.5" />
                      </template>
                      <template v-else>
                         <XCircle class="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                      </template>
                      <div>
                        <p class="font-semibold" :class="getValidationClass(question.id)">Your answer: <span class="capitalize font-bold">{{ userAnswers[question.id] || 'Not answered' }}</span></p>
                        <p v-if="userAnswers[question.id] !== question.correctAnswer" class="text-sm font-semibold text-gray-600 dark:text-gray-300">
                          Correct answer: <span class="capitalize font-bold text-green-700 dark:text-green-400">{{ question.correctAnswer }}</span>
                        </p>
                      </div>
                    </div>
                    <!-- Explanation -->
                    <div class="text-sm text-muted-foreground border-l-2 pl-4" :class="[userAnswers[question.id] === question.correctAnswer ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700']">
                      <p><strong class="text-foreground">Explanation:</strong> {{ question.explanation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
