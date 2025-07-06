<!--
  File: @/pages/units/grammar/21.vue
  Unit: 21 - All / all of; Most / most of; No / none of etc.
  Description: An advanced grammar practice module designed to master the use of determiners
  and pronouns of quantity with and without 'of'.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are available in your project
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-vue-next'

// --- Component State & Data ---

const isSubmitted = ref(false)
const showResult = ref(false)

// --- Navigation ---

const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/20")
}
function goToNextUnit() {
  router.push("/units/grammar/22")
}

// --- Question & Answer Data ---

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  explanation: string
  isCorrect?: boolean
}

const questions = ref<Question[]>([
  {
    id: 1,
    text: "_______ children enjoy playing, but not all of them have the opportunity.",
    options: ["Most", "Most of", "The most"],
    correctAnswer: "Most",
    userAnswer: null,
    explanation: "Here, 'children' is used in a general sense (children in general, not a specific group). Therefore, 'of' is not used. 'Most children' is the correct structure for making a general statement.",
  },
  {
    id: 2,
    text: "I haven't read many of the books on this shelf, but _______ I have read were excellent.",
    options: ["all that", "all of which", "all"],
    correctAnswer: "all",
    userAnswer: null,
    explanation: "'All' can be used by itself as a pronoun to mean 'everything' or 'everyone'. In this context, it refers to 'all the books' that the speaker has read from the shelf. The other options create grammatically incorrect clauses.",
  },
  {
    id: 3,
    text: "_______ my friends live in this city, so I see them often.",
    options: ["All", "All of", "Both 'All' and 'All of' are correct"],
    correctAnswer: "Both 'All' and 'All of' are correct",
    userAnswer: null,
    explanation: "When a possessive pronoun like 'my', 'your', 'his' follows, 'of' is optional. Both 'All my friends' and 'All of my friends' are grammatically correct and widely used. 'All of' is slightly more formal.",
  },
  {
    id: 4,
    text: "_______ information was given to us; we had to figure it out ourselves.",
    options: ["None", "No", "None of"],
    correctAnswer: "No",
    userAnswer: null,
    explanation: "'No' is a determiner used directly before a noun ('information'). 'None' is a pronoun and cannot be used this way ('None information' is incorrect). 'None of' requires a specific group, e.g., 'None of the information'. Since 'information' is general here, 'No' is correct.",
  },
  {
    id: 5,
    text: "She invited many guests to her party, but _______ them actually came.",
    options: ["none of", "no of", "not any"],
    correctAnswer: "none of",
    userAnswer: null,
    explanation: "Before a pronoun like 'them', 'us', or 'you', we must use 'none of'. 'No of' is never correct. 'Not any of them' would also be correct, but 'not any' is not an option.",
  },
  {
    id: 6,
    text: "I tried on three jackets in the shop. Unfortunately, _______ them fitted me perfectly.",
    options: ["None of", "Neither of", "No"],
    correctAnswer: "None of",
    userAnswer: null,
    explanation: "When referring to a group of three or more, 'none of' is used. 'Neither of' is specifically used for a group of two. Since there are three jackets, 'None of' is the correct choice.",
  },
  {
    id: 7,
    text: "_______ this advice has been helpful. I feel much more confident now.",
    options: ["All", "All of", "Every"],
    correctAnswer: "All of",
    userAnswer: null,
    explanation: "Before a determiner like 'this', 'that', 'the', or 'these', we must use 'of'. Therefore, 'All of this advice' is the only correct structure. 'All this advice' is sometimes used in informal speech but is less grammatically standard than 'All of'.",
  },
  {
    id: 8,
    text: "Is it true that _______ species of spiders are harmless to humans?",
    options: ["most", "most of", "most of the"],
    correctAnswer: "most",
    userAnswer: null,
    explanation: "This is another general statement about 'species of spiders' as a whole category, not a specific, defined group. Therefore, 'most' is used without 'of'. 'Most of the' would imply a specific group of spiders already mentioned.",
  },
  {
    id: 9,
    text: "The teacher gave us ten problems for homework, and I couldn't solve _______ them.",
    options: ["any of", "any", "no"],
    correctAnswer: "any of",
    userAnswer: null,
    explanation: "In a negative sentence ('couldn't solve'), we use 'any'. Because it's followed by the pronoun 'them', the structure must be 'any of'. 'I couldn't solve any of them.' is the correct negative form.",
  },
  {
    id: 10,
    text: "He spent _______ his life traveling and saw _______ the world.",
    options: ["most of / all", "most / all of", "most of / most of"],
    correctAnswer: "most of / most of",
    userAnswer: null,
    explanation: "In both parts of the sentence, we are referring to specific, defined nouns: 'his life' (a specific life) and 'the world' (a specific world). Therefore, 'of' is required in both cases: 'most of his life' and 'most of the world'.",
  },
])

// --- Computed Properties for Results ---

const score = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const percentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const resultMessage = computed(() => {
  const p = percentage.value
  if (p === 100) return { title: "Perfect Score!", text: "Outstanding! You have a masterful command of these quantifiers. Your precision is that of a professional editor." }
  if (p >= 80) return { title: "Excellent Work!", text: "You have a strong and nuanced understanding of these rules. A few tricky questions might have caught you, but your foundation is solid." }
  if (p >= 60) return { title: "Good Effort!", text: "A very respectable score. You understand the main concepts. Review the explanations for the questions you missed to master the finer points." }
  if (p >= 40) return { title: "You're Getting There!", text: "You've grasped some of the key ideas, but there are some important distinctions to review. Pay close attention to the explanations below." }
  return { title: "Needs Review", text: "This is a challenging topic. We recommend revisiting the learning material carefully and then trying the exercises again. Every mistake is a learning opportunity!" }
})

// --- Methods ---

function handleSubmit() {
  if (isSubmitted.value) return

  questions.value.forEach(q => {
    q.isCorrect = q.userAnswer === q.correctAnswer
  })
  isSubmitted.value = true

  // A slight delay to make the result appearance smoother
  setTimeout(() => {
    showResult.value = true
  }, 300)
}

function getBorderStyle(question: Question) {
  if (!isSubmitted.value) return 'border-border'
  return question.isCorrect ? 'border-green-500 bg-green-500/5' : 'border-red-500 bg-red-500/5'
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Advanced exercises based on the world's best-selling grammar book."
    unit-title="Unit 21: All / all of; Most / most of; No / none of etc."
    unit-description="Mastering quantifiers for general and specific statements."
    :categories="['Determiners', 'Pronouns', 'Quantifiers', 'Advanced']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Info class="h-6 w-6 text-blue-500" /> Core Concept: General vs. Specific</CardTitle>
          <CardDescription>
            The choice between using a quantifier (like <strong>All, Most, Some</strong>) with or without <strong>'of'</strong> hinges on one critical distinction: are you making a general statement or referring to a specific, defined group?
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">Rule 1: General Statements (No 'of')</h4>
            <p class="mb-2">Use <strong>All, Most, Some, Any, No</strong> directly before a plural or uncountable noun when speaking generally.</p>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li><code class="bg-muted px-1 py-0.5 rounded">Most cars</code> now have air conditioning. (Cars in general)</li>
              <li><code class="bg-muted px-1 py-0.5 rounded">No information</code> is more dangerous than wrong information. (Information in general)</li>
              <li>I love <code class="bg-muted px-1 py-0.5 rounded">all music</code>. (Music in general)</li>
            </ul>
          </div>
           <div>
            <h4 class="font-semibold text-base mb-2">Rule 2: Specific Groups (Use 'of')</h4>
            <p class="mb-2">Use <strong>All of, Most of, Some of, Any of, None of</strong> when you refer to a specific group. This group is usually identified by a determiner (<strong>the, this, that, these, those</strong>) or a possessive (<strong>my, your, his</strong>) or a pronoun (<strong>us, them, you</strong>).</p>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li><code class="bg-muted px-1 py-0.5 rounded">Most of the cars</code> in this lot are electric. (Specific cars in this lot)</li>
              <li><code class="bg-muted px-1 py-0.5 rounded">None of this advice</code> was useful. (Specific advice that was given)</li>
              <li>She has invited <code class="bg-muted px-1 py-0.5 rounded">all of her friends</code>. (Specific friends belonging to her)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
           <CardTitle class="flex items-center gap-2"><AlertTriangle class="h-6 w-6 text-amber-500" /> Important Nuances</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">No vs. None of</h4>
            <p class="mb-2"><strong>No</strong> is a determiner: it comes before a noun. <strong>None</strong> is a pronoun: it replaces a noun and is often followed by 'of'.</p>
             <ul class="list-disc list-inside space-y-1 pl-2">
              <li>Correct: <code class="bg-muted px-1 py-0.5 rounded">No students</code> failed.</li>
              <li>Correct: <code class="bg-muted px-1 py-0.5 rounded">None of the students</code> failed.</li>
              <li>Incorrect: <span class="line-through"><code class="bg-muted px-1 py-0.5 rounded">None students</code></span> failed.</li>
            </ul>
          </div>
           <div>
            <h4 class="font-semibold text-base mb-2">Optional 'of'</h4>
            <p class="mb-2">After <strong>'all'</strong> or <strong>'both'</strong>, the word 'of' is often optional before a noun with a determiner, but it is <strong>required</strong> before a pronoun.</p>
             <ul class="list-disc list-inside space-y-1 pl-2">
              <li><code class="bg-muted px-1 py-0.5 rounded">All (of) my colleagues</code> agree. ('of' is optional)</li>
              <li><code class="bg-muted px-1 py-0.5 rounded">All of us</code> agree. ('of' is mandatory)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Unit 21: Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence. Think carefully about general vs. specific contexts.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="font-semibold mb-3">{{ index + 1 }}. {{ question.text }}</p>
            <RadioGroup v-model="question.userAnswer" :disabled="isSubmitted">
              <div 
                v-for="option in question.options" 
                :key="option" 
                class="flex items-center space-x-2 p-3 rounded-md border transition-colors"
                :class="[
                  isSubmitted && question.userAnswer === option ? getBorderStyle(question) : 'border-border',
                  isSubmitted && question.correctAnswer === option && 'border-green-500 bg-green-500/5'
                ]"
              >
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="flex-1 cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="handleSubmit" :disabled="isSubmitted" class="w-full">
            {{ isSubmitted ? 'Answers Submitted' : 'Check Answers' }}
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here is a detailed breakdown of your performance.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="p-4 bg-muted rounded-lg space-y-3">
            <h3 class="text-lg font-semibold">{{ resultMessage.title }}</h3>
            <div class="flex items-center gap-4">
              <span class="text-2xl font-bold text-primary">{{ score }} / {{ questions.length }}</span>
              <Progress :model-value="percentage" class="w-full" />
              <span class="text-lg font-semibold">{{ percentage.toFixed(0) }}%</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ resultMessage.text }}</p>
          </div>
          
          <!-- Detailed Review -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Detailed Answer Review</h3>
            <div class="space-y-4">
              <div v-for="(q, index) in questions" :key="`result-${q.id}`">
                <p class="font-semibold mb-2">{{ index + 1 }}. {{ q.text }}</p>
                <div class="flex flex-col gap-2 text-sm">
                  <div class="flex items-center gap-2">
                    <template v-if="q.isCorrect">
                      <CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span class="text-green-700">Your answer: <strong>{{ q.userAnswer }}</strong></span>
                    </template>
                    <template v-else>
                      <XCircle class="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span class="text-red-700">Your answer: <strong class="line-through">{{ q.userAnswer || 'No answer' }}</strong></span>
                    </template>
                  </div>
                  <div v-if="!q.isCorrect" class="flex items-center gap-2">
                     <CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
                     <span class="text-green-700">Correct answer: <strong>{{ q.correctAnswer }}</strong></span>
                  </div>
                </div>
                <Alert :variant="q.isCorrect ? 'default' : 'destructive'" class="mt-3">
                  <AlertTriangle v-if="!q.isCorrect" class="h-4 w-4" />
                  <Info v-else class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    {{ q.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </GrammarLayout>
</template>

<style scoped>
/* A subtle fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
