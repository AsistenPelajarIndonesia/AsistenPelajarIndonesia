<!--
  File: @/pages/units/grammar/96.vue
  Unit: 96 - Relative clauses 5: Extra information clauses (2)
  Description: An advanced practice module based on Raymond Murphy's "English Grammar in Use".
  This page focuses on complex relative clauses involving prepositions (to whom, in which)
  and quantifiers (most of whom, some of which), providing a rigorous test with detailed feedback.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming a 'shadcn-vue' or similar setup for UI components.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const testTitle = 'English Grammar In Use: Practice'
const testDescription = 'Advanced exercises inspired by the works of Raymond Murphy and other grammar experts.'
const unitTitle = 'Unit 96: Relative clauses 5 (Extra information clauses, Part 2)'
const unitDescription = "This unit covers two advanced structures in non-defining relative clauses: using prepositions before 'whom' and 'which' (formal style), and using quantifiers like 'most of', 'some of', etc., with 'whom' and 'which'."
const categories = ['Grammar', 'Relative Clauses', 'Advanced', 'Formal English']

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Corresponds to Unit 95: Relative clauses 4
  router.push("/units/grammar/95")
}
function goToNextUnit() {
  // Corresponds to Unit 97: -ing and -ed clauses
  router.push("/units/grammar/97")
}

// --- Reactive State Management for the Quiz ---
const showResult = ref(false)
const userAnswers = ref<string[]>([])

// --- The Core Educational Content: Questions and Explanations ---
// These questions are designed to be challenging, requiring students to synthesize two sentences
// into one, using the target grammar structures. This is a more demanding task than simple gap-fills.
const questions = ref([
  {
    type: 'combine',
    sentences: ["My new office has a wonderful view.", "I am very pleased with it."],
    instruction: "Combine these sentences into one using 'which'. The new sentence must begin with 'My new office...'",
    correctAnswer: "My new office, with which I am very pleased, has a wonderful view.",
    explanation: "This is a formal structure using 'preposition + which' (with which). The clause adds extra information about the office, so it is set off by commas. Note the formal structure; in informal speech, you might say '...which I'm very pleased with.'",
    hint: "Think about the preposition associated with 'pleased'.",
  },
  {
    type: 'combine',
    sentences: ["The company hired ten new software developers.", "Only two of them were women."],
    instruction: "Combine these sentences using 'whom'. The new sentence must begin with 'The company hired...'",
    correctAnswer: "The company hired ten new software developers, only two of whom were women.",
    explanation: "Here, we use a quantifier phrase 'only two of' with 'whom' to add extra information about the developers. 'Whom' is used because it refers to people and is the object of the preposition 'of'. This structure is excellent for providing statistical or numerical follow-up information.",
    hint: "Use the quantifier 'only two of' followed by the correct relative pronoun.",
  },
  {
    type: 'combine',
    sentences: ["The conference was attended by 500 delegates.", "The majority of them came from Asia."],
    instruction: "Combine these sentences using 'whom'. The new sentence must begin with 'The conference was attended...'",
    correctAnswer: "The conference was attended by 500 delegates, the majority of whom came from Asia.",
    explanation: "'The majority of' acts as a quantifier. Since 'delegates' are people, we use 'whom'. This structure avoids starting a new, short sentence and creates a more fluid, academic style.",
    hint: "Connect the sentences using the phrase 'the majority of' and a relative pronoun.",
  },
  {
    type: 'combine',
    sentences: ["The government is proposing new environmental laws.", "I do not agree with many of them."],
    instruction: "Combine these sentences using 'which'. The new sentence must begin with 'The government is proposing...'",
    correctAnswer: "The government is proposing new environmental laws, with many of which I do not agree.",
    explanation: "This is another example of a formal 'preposition + quantifier + which' structure. The preposition 'with' comes from 'agree with'. The full phrase is 'with many of which'. In a less formal style, one might say '...laws, many of which I don't agree with.' The formal structure places the preposition first.",
    hint: "What preposition follows 'agree'? Place it at the beginning of the relative clause.",
  },
  {
    type: 'combine',
    sentences: ["Professor Evans wrote a controversial paper on genetics.", "I had a long debate with him about it yesterday."],
    instruction: "Combine these sentences using 'whom'. The new sentence must begin with 'Professor Evans...' and must include the preposition from the second sentence.",
    correctAnswer: "Professor Evans, with whom I had a long debate yesterday, wrote a controversial paper on genetics.",
    explanation: "The extra information is about Professor Evans. The preposition 'with' is taken from 'had a debate with him' and is placed before 'whom' in this formal construction. Commas are essential to separate the non-defining clause.",
    hint: "The extra information is about the professor. What was your interaction 'with' him?",
  },
])

// --- Dynamic Score Calculation ---
const score = computed(() => {
  if (!showResult.value) return 0
  return questions.value.reduce((correctCount, question, index) => {
    // A more lenient check for correctness: ignore case and extra spaces.
    const isCorrect = userAnswers.value[index]?.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
    return isCorrect ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return (score.value / questions.value.length) * 100
})

// --- Control Functions ---
function validateAnswers() {
  if (userAnswers.value.some(answer => !answer || answer.trim() === '')) {
    alert('Please attempt all questions before checking your answers.')
    return
  }
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetTest() {
  showResult.value = false
  userAnswers.value = []
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Helper function for result styling ---
const isCorrect = (index: number) => {
  return userAnswers.value[index]?.trim().toLowerCase() === questions.value[index].correctAnswer.trim().toLowerCase()
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
    <!-- MATERIAL SLOT: Explanations and Examples                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Rule 1: Preposition + whom/which</CardTitle>
          <CardDescription>
            In formal English, a preposition can be placed before the relative pronoun
            ('whom' for people, 'which' for things) in an extra information clause.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">Structure:</p>
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            ... Noun, [preposition] + [whom/which] ... , ...
          </code>
          <p class="text-sm text-muted-foreground">This is common in academic and official writing. In conversation, the preposition usually stays at the end of the clause.</p>
          <div>
            <p><span class="font-bold text-green-600">Formal:</span> The manager, <span class="underline">to whom I sent the report</span>, has not replied yet.</p>
            <p><span class="font-bold text-blue-600">Informal:</span> The manager, <span class="underline">who I sent the report to</span>, has not replied yet.</p>
          </div>
          <div>
            <p><span class="font-bold text-green-600">Formal:</span> This is the theory, <span class="underline">on which the entire study is based</span>.</p>
            <p><span class="font-bold text-blue-600">Informal:</span> This is the theory, <span class="underline">which the entire study is based on</span>.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 2: Quantifier + of + whom/which</CardTitle>
          <CardDescription>
            We can use quantifiers (e.g., some, many, most, none, both, half, a number) with 'of whom' and 'of which'.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="font-semibold">Structure:</p>
          <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            ... Noun, [quantifier] of [whom/which] ... , ...
          </code>
          <p class="text-sm text-muted-foreground">This structure elegantly connects a main statement with a detail about the quantity or number of the noun mentioned.</p>
          <div>
            <p><span class="font-bold">Example (People):</span> The team has 20 members, <span class="underline">most of whom</span> are from our London office.</p>
            <p><span class="font-bold">Example (Things):</span> He showed me several paintings, <span class="underline">none of which</span> I liked.</p>
            <p><span class="font-bold">Example (Specific Number):</span> The Prime Minister met two officials, <span class="underline">both of whom</span> expressed their concerns.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE SLOT: Interactive Exercises                                    -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Combine the two sentences into one complex sentence using the grammar from this unit.
            Pay close attention to commas and formal structure.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="index" class="space-y-2">
            <Label :for="`question-${index}`" class="text-base">Question {{ index + 1 }}</Label>
            <p class="text-sm text-muted-foreground">
              "{{ question.sentences[0] }}" + "{{ question.sentences[1] }}"
            </p>
            <p class="text-sm italic">{{ question.instruction }}</p>
            <Input
              :id="`question-${index}`"
              v-model="userAnswers[index]"
              type="text"
              :placeholder="question.hint"
              :disabled="showResult"
              class="text-base"
            />
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button v-if="!showResult" size="lg" @click="validateAnswers">Check My Answers</Button>
          <Button v-else size="lg" variant="secondary" @click="resetTest">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULT SLOT: Detailed Validation and Feedback                           -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
          <CardDescription>
            Review your answers below. Understanding the explanation for each question is key to improvement.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Score: {{ score }} / {{ questions.length }}</h3>
            <Progress :model-value="scorePercentage" />
            <p class="text-sm text-muted-foreground text-center">{{ Math.round(scorePercentage) }}% Correct</p>
          </div>

          <!-- Detailed Breakdown -->
          <div v-for="(question, index) in questions" :key="`result-${index}`" class="space-y-3 rounded-md border p-4">
            <h4 class="font-semibold">Question {{ index + 1 }}</h4>
            <p class="text-sm text-muted-foreground italic">
              "{{ question.sentences[0] }}" + "{{ question.sentences[1] }}"
            </p>
            
            <!-- User's Answer with Validation Icon -->
            <div class="space-y-2">
              <Label class="font-medium">Your Answer:</Label>
              <div class="flex items-center gap-x-3">
                <component :is="isCorrect(index) ? CheckCircle2 : XCircle" :class="isCorrect(index) ? 'text-green-500' : 'text-red-500'" class="h-5 w-5 flex-shrink-0" />
                <p :class="[isCorrect(index) ? 'text-green-700' : 'text-red-700', 'flex-1 rounded-md bg-muted p-2 text-sm']">
                  {{ userAnswers[index] || 'No answer provided' }}
                </p>
              </div>
            </div>

            <!-- Correct Answer and Explanation -->
            <div v-if="!isCorrect(index)" class="space-y-2">
              <Label class="font-medium">Correct Answer:</Label>
              <p class="flex-1 rounded-md border border-green-300 bg-green-50 p-2 text-sm text-green-900">
                {{ question.correctAnswer }}
              </p>
            </div>
            
            <Alert class="border-blue-300 bg-blue-50">
              <Lightbulb class="h-4 w-4 !text-blue-600" />
              <AlertTitle class="text-blue-800">Explanation</AlertTitle>
              <AlertDescription class="text-blue-900">
                {{ question.explanation }}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
         <CardFooter class="flex justify-end">
          <Button size="lg" variant="secondary" @click="resetTest">Practice Again</Button>
        </CardFooter>
      </Card>
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
