<!--
  File: @/pages/units/grammar/15.vue
  Description: An advanced grammar practice page for Unit 15: Reflexive Pronouns.
  This page integrates learning material, challenging exercises, and a detailed results
  validator to provide an immersive and effective learning experience, in line with
  the principles of "English Grammar in Use".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, HelpCircle, Target } from 'lucide-vue-next'

// --- Component Imports ---
// We assume these UI components are available, following the Shadcn/ui convention.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// --- Page & Unit Metadata ---
const testTitle = 'English Grammar In Use: Practice'
const testDescription = 'Intermediate exercises based on the book by Raymond Murphy.'
const unitTitle = 'Unit 15: Myself/yourself/themselves etc. (Reflexive Pronouns)'
const unitDescription = 'Master the use of reflexive pronouns for actions where the subject and object are the same, for emphasis, and in idiomatic expressions.'
const categories = ['Pronouns', 'Syntax', 'Common Mistakes']

// --- Navigation ---
const router = useRouter()

function goToPreviousUnit() {
  // Navigates to the preceding unit.
  router.push("/units/grammar/14")
}

function goToNextUnit() {
  // Navigates to the subsequent unit.
  router.push("/units/grammar/16")
}

// --- Quiz State Management ---
const questions = ref([
  {
    id: 1,
    text: "The company director was so impressed with the new software that he decided to install it ______ on his personal laptop.",
    options: ["him", "himself", "itself", "by him"],
    correctAnswer: "himself",
    explanation: "The pronoun 'himself' is used here for emphasis. It stresses that the director, and not an assistant or an IT technician, performed the action. While 'him' would be grammatically incorrect as it's an object pronoun, 'himself' highlights the subject's personal involvement."
  },
  {
    id: 2,
    text: "Kate and Tom have been working on separate projects, but they often help ______ when they encounter difficult problems.",
    options: ["themselves", "each other", "theirselves", "them"],
    correctAnswer: "each other",
    explanation: "'Themselves' would mean Kate helps Kate and Tom helps Tom. The context implies a reciprocal action (Kate helps Tom, and Tom helps Kate), for which 'each other' is the correct choice. 'Theirselves' is not a standard English word."
  },
  {
    id: 3,
    text: "After the long hike, we were exhausted but proud. We had pushed ______ to the limit and conquered the mountain.",
    options: ["us", "ourself", "ourselves", "each other"],
    correctAnswer: "ourselves",
    explanation: "The subject of the verb 'pushed' is 'we'. When the subject and the object of a verb are the same, a reflexive pronoun is required. The correct reflexive pronoun for 'we' is 'ourselves'."
  },
  {
    id: 4,
    text: "My manager asked my colleague and ______ to lead the presentation, as we had done the most research.",
    options: ["I", "myself", "me", "ourselves"],
    correctAnswer: "me",
    explanation: "This is a classic point of confusion. The subject is 'My manager'. The objects of the verb 'asked' are 'my colleague' and the speaker. Therefore, the object pronoun 'me' is correct. To test this, remove 'my colleague and': 'My manager asked me'. Using 'myself' is incorrect because the subject ('My manager') and the object ('me') are different people."
  },
  {
    id: 5,
    text: "The new automated system is brilliant. It reboots ______ every night at 3 AM to clear its memory cache.",
    options: ["itself", "it", "by itself", "themself"],
    correctAnswer: "itself",
    explanation: "The subject is 'It' (referring to the system), and the action 'reboots' is performed on the same entity. Therefore, the reflexive pronoun 'itself' is necessary. 'Themself' is sometimes used as a singular, gender-neutral pronoun, but 'itself' is standard for inanimate objects."
  },
  {
    id: 6,
    text: "You don't need to pay for a guide. The city is easy to explore ______, and you'll discover more interesting places.",
    options: ["by you", "by yourself", "alone", "itself"],
    correctAnswer: "by yourself",
    explanation: "The phrase 'by + reflexive pronoun' means 'alone' or 'without help'. 'By yourself' directly corresponds to the subject 'You' and fits the context of exploring without a guide. While 'alone' has the same meaning, 'by yourself' is the most natural grammatical fit here."
  },
  {
    id: 7,
    text: "It is not always easy to be ______ in a world that is constantly trying to make you something else.",
    options: ["you", "yours", "yourself", "yourselves"],
    correctAnswer: "yourself",
    explanation: "This sentence uses a philosophical, abstract meaning. 'To be yourself' is an idiomatic expression meaning to behave in a natural and genuine way. The reflexive pronoun 'yourself' is a core part of this idiom."
  },
  {
    id: 8,
    text: "The children were very well-behaved at the party; they entertained ______ for hours with just a box of old costumes.",
    options: ["them", "each other", "themself", "themselves"],
    correctAnswer: "themselves",
    explanation: "The subject is 'they' (the children). The action of entertaining was performed by the children upon the children. Therefore, the reflexive pronoun 'themselves' is correct. 'Each other' would imply they were entertaining in pairs, while 'themselves' means they collectively kept the group entertained."
  }
])

const userAnswers = ref<Record<number, string>>({})
const showResult = ref(false)

const allQuestionsAnswered = computed(() => {
  return questions.value.length === Object.keys(userAnswers.value).length
})

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? correctCount + 1 : correctCount
  }, 0)
})

const progress = computed(() => {
  return (Object.keys(userAnswers.value).length / questions.value.length) * 100
})

function checkAnswers() {
  if (allQuestionsAnswered.value) {
    showResult.value = true
  }
}

function resetQuiz() {
  userAnswers.value = {}
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <!-- #material: The Core Learning Content                                    -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Target class="h-6 w-6 text-sky-600" />
            <span>Core Principle: Subject-Object Identity</span>
          </CardTitle>
          <CardDescription>
            The fundamental rule for reflexive pronouns is to use them when the subject (the one doing the action) and the object (the one receiving the action) are the same entity.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>Consider the difference:</p>
          <ul class="list-disc space-y-2 pl-6">
            <li>"He accidentally cut <span class="font-semibold text-red-600">him</span>." (He cut another male.)</li>
            <li>"He accidentally cut <span class="font-semibold text-green-700">himself</span>." (He suffered the cut.)</li>
          </ul>
          <p>The reflexive pronoun clarifies that the action "reflects" back onto the subject.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <HelpCircle class="h-6 w-6 text-amber-600" />
            <span>Advanced Applications & Common Pitfalls</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-semibold">1. For Emphasis (Emphatic Pronouns)</h4>
            <p class="text-muted-foreground">You can add a reflexive pronoun to emphasize that the subject, and no one else, performed the action.</p>
            <p class="mt-2 pl-4 border-l-2 border-slate-300">"The CEO <span class="font-semibold">herself</span> responded to my email."</p>
          </div>
          <div>
            <h4 class="font-semibold">2. 'By' + Reflexive = Alone</h4>
            <p class="text-muted-foreground">This construction specifically means 'unaccompanied' or 'without assistance'.</p>
            <p class="mt-2 pl-4 border-l-2 border-slate-300">"She learned to code entirely <span class="font-semibold">by herself</span>."</p>
          </div>
          <div>
            <h4 class="font-semibold text-red-700">3. The 'Me' vs. 'Myself' Trap</h4>
            <p class="text-muted-foreground">A very common error is using 'myself' as a formal substitute for 'me'. This is incorrect. Use 'myself' only if you are also the subject of the same verb.</p>
            <ul class="mt-2 list-disc space-y-2 pl-6">
              <li><span class="text-red-600">Incorrect:</span> "Please forward the invitation to John and <span class="font-semibold">myself</span>."</li>
              <li><span class="text-green-700">Correct:</span> "Please forward the invitation to John and <span class="font-semibold">me</span>."</li>
              <li class="text-xs italic text-muted-foreground">(Reason: The subject is an implied 'you'. 'You' and 'me' are different people.)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">4. Reflexive vs. Reciprocal (each other)</h4>
            <p class="text-muted-foreground">Do not confuse actions done to oneself with actions done between two or more people.</p>
             <ul class="list-disc space-y-2 pl-6">
              <li>"The team members blamed <span class="font-semibold">themselves</span> for the loss." (Each person blamed him/herself).</li>
              <li>"The team members blamed <span class="font-semibold">each other</span> for the loss." (They blamed different members of the group).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Quiz Section                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Select the best option to complete each sentence. Your progress is saved automatically.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div class="mb-4">
             <Progress :model-value="progress" class="w-full" />
             <p class="text-xs text-muted-foreground mt-2 text-center">{{ Math.round(progress) }}% Complete</p>
          </div>
          
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="userAnswers[question.id]" class="space-y-2">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button
            class="w-full"
            :disabled="!allQuestionsAnswered || showResult"
            @click="checkAnswers"
          >
            {{ showResult ? 'Results Below' : (allQuestionsAnswered ? 'Check Answers' : 'Answer All Questions to Continue') }}
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: The Detailed Feedback and Score                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-border/60">
        <CardHeader>
          <CardTitle>Quiz Results & Analysis</CardTitle>
          <CardDescription>Review your performance. Understanding why an answer is correct is the key to mastery.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <Alert :variant="score === questions.length ? 'default' : 'destructive'" class="bg-opacity-10">
            <AlertTitle class="text-lg font-bold">
              Your Score: {{ score }} / {{ questions.length }}
            </AlertTitle>
            <AlertDescription>
              {{ score === questions.length ? "Excellent work! You have a strong command of reflexive pronouns." : "Good effort. Review the explanations below to solidify your understanding." }}
            </AlertDescription>
          </Alert>
          
          <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="rounded-lg border p-4">
            <p class="mb-3 font-semibold">{{ index + 1 }}. {{ question.text.replace('______', `[${question.correctAnswer}]`) }}</p>

            <div class="flex flex-col gap-3">
              <!-- User's Answer -->
              <div
                class="flex items-start gap-3 rounded-md p-2"
                :class="userAnswers[question.id] === question.correctAnswer ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'"
              >
                <template v-if="userAnswers[question.id] === question.correctAnswer">
                  <CheckCircle2 class="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-500 mt-0.5" />
                  <div>
                    <p class="font-semibold text-green-800 dark:text-green-400">Your answer: <span class="font-bold">{{ userAnswers[question.id] }}</span></p>
                    <p class="text-xs text-green-700 dark:text-green-500">Correct!</p>
                  </div>
                </template>
                <template v-else>
                  <XCircle class="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                  <div>
                    <p class="font-semibold text-red-800 dark:text-red-400">Your answer: <span class="font-bold line-through">{{ userAnswers[question.id] }}</span></p>
                    <p class="text-xs font-semibold text-red-700 dark:text-red-500">Correct answer: {{ question.correctAnswer }}</p>
                  </div>
                </template>
              </div>

              <!-- Explanation -->
              <div class="flex items-start gap-3 rounded-md bg-sky-100/60 dark:bg-sky-900/20 p-3">
                <HelpCircle class="h-5 w-5 flex-shrink-0 text-sky-700 dark:text-sky-400 mt-0.5" />
                <div>
                  <h4 class="font-semibold text-sky-800 dark:text-sky-300">Explanation</h4>
                  <p class="text-sm text-sky-900/80 dark:text-sky-300/80">{{ question.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" class="w-full" @click="resetQuiz">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
