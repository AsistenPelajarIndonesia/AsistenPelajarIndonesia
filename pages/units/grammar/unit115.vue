<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL                                                          -->
    <!-- This section provides the core learning content.                        -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>A. The Core Idea: Perfect Simultaneity</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            Think of <strong>as</strong> as a director's cue for two actions to happen in perfect sync. Its primary role is to link two events that are occurring at the very same time.
          </p>
          <p>
            You can use <strong>as</strong> with two simple past tense verbs to describe one short action that happens at the same moment as another short action.
          </p>
          <blockquote>
            <p><strong>As</strong> the bomb exploded, the windows shattered.</p>
            <footer>(The explosion and the shattering are simultaneous)</footer>
          </blockquote>
          <blockquote>
            <p>I waved to him <strong>as</strong> he passed.</p>
            <footer>(The wave and the passing happen at the same instant)</footer>
          </blockquote>
          <p>In these cases, <em>'when'</em> could also be used, but <em>'as'</em> often lends a slightly more dramatic or literary feel, emphasizing the concurrency.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>B. The Main Event: Background & Interruption</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            This is the most powerful use of <strong>as</strong>. We use it to set a "background scene" with a longer, ongoing action, during which a shorter, more specific action takes place. This is where the past continuous (was/were + -ing) shines.
          </p>
          <p>
            <strong>as + past continuous</strong> (the background)<strong>, simple past</strong> (the interruption)
          </p>
          <blockquote>
            <p><strong>As I was driving home</strong>, my car suddenly broke down.</p>
            <footer>The driving is the long backdrop; the breakdown is the key event that happens within that timeframe.</footer>
          </blockquote>
          <blockquote>
            <p>We had a lively discussion <strong>as we were waiting</strong> for our flight.</p>
            <footer>The waiting is the extended context for the discussion.</footer>
          </blockquote>
          <p>
            <strong>Teacher's Insight:</strong> Contrast this with 'when'. <em>'When I drove home...'</em> suggests the entire journey is a single event. <em>'As I was driving home...'</em> invites the listener into the experience of the journey itself, painting a more vivid picture.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>C. Parallel Development: Two Things Changing Together</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            <strong>As</strong> can also show two processes or situations that are developing or changing over the same period. Think of it like two lines on a graph moving in tandem.
          </p>
          <blockquote>
            <p><strong>As the day went on</strong>, the weather got progressively worse.</p>
            <footer>(The passage of the day and the worsening weather are parallel developments)</footer>
          </blockquote>
          <blockquote>
            <p><strong>As he got older</strong>, his memory began to fail.</p>
            <footer>(Aging and memory decline are linked, ongoing processes)</footer>
          </blockquote>
          <p>
            This usage creates a sense of cause and effect or logical progression over time.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: PRACTICE                                                          -->
    <!-- This section contains the interactive quiz.                             -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 8 Practice: Test Your Mastery</CardTitle>
          <CardDescription>
            Choose the best option to complete each sentence. Pay close attention to the nuance between simple past and past continuous.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, qIndex) in questions" :key="qIndex" class="space-y-4">
            <p class="font-semibold">{{ qIndex + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[qIndex]" :disabled="isSubmitted">
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${qIndex}o${oIndex}`" :value="option" />
                <Label :for="`q${qIndex}o${oIndex}`">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <Alert v-if="submissionError" variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Incomplete</AlertTitle>
            <AlertDescription>Please answer all questions before checking your results.</AlertDescription>
          </Alert>
          <div class="flex gap-2">
            <Button class="w-full" @click="validateAnswers" :disabled="isSubmitted">
              <Check class="mr-2 h-4 w-4" />
              Check Answers
            </Button>
            <Button class="w-full" variant="outline" @click="resetTest" v-if="isSubmitted">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: RESULT                                                            -->
    <!-- This section displays the detailed results and explanations.            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>Your Results</span>
            <Badge :variant="score > 2 ? 'default' : 'destructive'">
              Score: {{ score }} / {{ questions.length }}
            </Badge>
          </CardTitle>
          <CardDescription>
            Review the detailed explanations below to understand the nuances of 'as'. Learning from mistakes is key to mastery.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div
            v-for="(question, index) in questions"
            :key="`result-${index}`"
            class="rounded-md border p-4"
            :class="{
              'border-green-500 bg-green-500/10': userAnswers[index] === question.correctAnswer,
              'border-red-500 bg-red-500/10': userAnswers[index] !== question.correctAnswer,
            }"
          >
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            <p class="mt-2 text-sm">
              <span class="font-bold">Your answer:</span>
              <span :class="{'text-red-700 dark:text-red-400': userAnswers[index] !== question.correctAnswer}">
                {{ userAnswers[index] || "Not answered" }}
              </span>
              <CheckCircle2
                v-if="userAnswers[index] === question.correctAnswer"
                class="ml-2 inline h-4 w-4 text-green-600"
              />
              <XCircle v-else class="ml-2 inline h-4 w-4 text-red-600" />
            </p>
            <p v-if="userAnswers[index] !== question.correctAnswer" class="mt-1 text-sm">
              <span class="font-bold">Correct answer:</span>
              <span class="text-green-700 dark:text-green-400">{{ question.correctAnswer }}</span>
            </p>
            <Separator class="my-3" />
            <div class="prose prose-sm max-w-none text-foreground">
              <p class="font-bold">Explanation:</p>
              <p v-html="question.explanation"></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these components are globally available or imported from your UI library
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Check, CheckCircle2, RefreshCw, XCircle } from 'lucide-vue-next'

const router = useRouter()

const pageDetails = {
  testTitle: 'English Grammar in Use Practice',
  testDescription: 'Advanced exercises based on the Raymond Murphy series.',
  unitTitle: 'Unit 8: As (as I walked … / as I was … etc.)',
  unitDescription: 'Mastering the use of "as" to describe simultaneous actions and parallel developments.',
  categories: ['Conjunctions', 'Tenses', 'Complex Sentences', 'Advanced']
}

const questions = reactive([
  {
    text: "The thief snatched her handbag ______ she was getting on the train.",
    options: ["as", "so", "because"],
    correctAnswer: "as",
    explanation: "Correct. <strong>'As'</strong> is the perfect conjunction here to link the long 'background' action (<em>getting on the train</em>) with the short, sudden action that happened during it (<em>snatching the handbag</em>). 'Because' would imply causality, and 'so' would imply a result, neither of which fits the context of timing.",
  },
  {
    text: "______ I was tidying up the attic, I came across my grandfather's old war medals.",
    options: ["When", "As", "After"],
    correctAnswer: "As",
    explanation: "Correct. While 'When' is grammatically possible, <strong>'As'</strong> is superior here. It emphasizes that the discovery happened <em>during the process</em> of tidying up. It paints a better picture of you being immersed in the activity. 'As' excels at setting this kind of narrative scene.",
  },
  {
    text: "We need to choose the most natural-sounding sentence for parallel development. Which is best?",
    options: [
      "As the technology advanced, so the price came down.",
      "As the technology advanced, the price came down.",
      "Because the technology advanced, the price came down.",
    ],
    correctAnswer: "As the technology advanced, the price came down.",
    explanation: "Correct. This sentence structure perfectly captures two parallel trends. <strong>'As'</strong> is used to show these two things happening together over the same period. The version with 'so' is redundant and slightly archaic. 'Because' states a reason, but 'as' more elegantly describes the linked progression.",
  },
  {
    text: "A strange silence fell over the forest ______ the first snowflake began to drift down.",
    options: ["as", "while", "during"],
    correctAnswer: "as",
    explanation: "Correct. Here, 'as' is used to connect two very short actions or events that happen at precisely the same moment. The silence and the snowflake's descent are perfectly synchronized. 'While' typically implies a longer duration (e.g., while I was sleeping), and 'during' needs a noun phrase (e.g., during the storm).",
  },
  {
    text: "He turned and smiled at me ______ he left the room.",
    options: ["as", "when", "Both are equally good and natural."],
    correctAnswer: "Both are equally good and natural.",
    explanation: "This is a nuanced point. Both <strong>'as'</strong> and <strong>'when'</strong> are perfectly natural here for linking two short, consecutive actions. Some might feel 'as' implies a more seamless, simultaneous motion (smiling *while* turning and leaving), while 'when' could suggest a sequence (he left, and at that moment, he smiled). In common usage, they are interchangeable in this context, and neither is incorrect.",
  },
]);

const userAnswers = ref<string[]>(Array(questions.length).fill(''))
const isSubmitted = ref(false)
const submissionError = ref(false)

const score = computed(() => {
  return questions.reduce((correctCount, question, index) => {
    return userAnswers.value[index] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

function validateAnswers() {
  if (userAnswers.value.includes('')) {
    submissionError.value = true
    return
  }
  submissionError.value = false
  isSubmitted.value = true
}

function resetTest() {
  userAnswers.value = Array(questions.length).fill('')
  isSubmitted.value = false
  submissionError.value = false
}

function goToPreviousUnit() {
  router.push("/units/grammar/7")
}

function goToNextUnit() {
  router.push("/units/grammar/9")
}
</script>

<style scoped>
/* Scoped styles can be added here if needed, but we rely on Tailwind from the layout */
.prose {
  color: hsl(var(--foreground));
}
.prose blockquote {
  border-left-color: hsl(var(--border));
  color: hsl(var(--muted-foreground));
}
.prose blockquote footer {
  color: hsl(var(--muted-foreground));
  font-size: 0.8em;
  margin-top: 0.5em;
}
</style>
