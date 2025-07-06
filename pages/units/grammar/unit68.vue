<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are globally available or auto-imported
// We will use them in the template.
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { Progress } from '@/components/ui/progress'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { CheckCircle2, XCircle, BookOpenCheck } from 'lucide-vue-next'

// --- Page & Navigation Logic ---
definePageMeta({
  layout: false, // We are using our own layout component directly
})

const router = useRouter()
const currentUnit = 2

function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}

function goToNextUnit() {
  // In a real app, you might check against a max unit number
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- Quiz State Management ---
// Using a reactive object to hold the entire state of the quiz.
// This is more organized than multiple refs for related data.
const quizState = reactive({
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: "I need to buy new ______ for the living room. The old one is very uncomfortable.",
      options: ['a furniture', 'furnitures', 'furniture'],
      userAnswer: '',
      correctAnswer: 'furniture',
      status: 'unanswered',
      explanation: "The word 'furniture' is a classic uncountable noun. It refers to a collection of items (chairs, tables, beds) as a single concept. You cannot make it plural ('furnitures') or use 'a/an' with it. To specify a single item, you would say 'a piece of furniture'."
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: "Could you give me ______ on how to use this software? I'm completely lost.",
      options: ['an advice', 'some advice', 'advices'],
      userAnswer: '',
      correctAnswer: 'some advice',
      status: 'unanswered',
      explanation: "'Advice' is an uncountable noun. Therefore, 'advices' is incorrect. We also cannot use the indefinite article 'an'. To express an unspecified amount, we use 'some'. To talk about a single instance, you would say 'a piece of advice'."
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      text: "The recent storm caused ______ to the coastal towns, and the ______ was all over the news.",
      options: ['a lot of damage / news', 'many damages / news', 'a lot of damages / a news'],
      userAnswer: '',
      correctAnswer: 'a lot of damage / news',
      status: 'unanswered',
      explanation: "Both 'damage' (harm) and 'news' are uncountable. 'Damages' (plural) refers to money paid in a legal case. 'News' is always singular in form but uncountable in meaning (e.g., 'The news is good'). 'A lot of' can be used with both uncountable and plural countable nouns, making it the correct choice here."
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      text: "She has beautiful, long, dark ______. Oh wait, I think I just found ______ in my soup!",
      options: ['hair / a hair', 'hairs / a hair', 'hair / hair'],
      userAnswer: '',
      correctAnswer: 'hair / a hair',
      status: 'unanswered',
      explanation: "This question highlights nouns that can be both countable and uncountable. When referring to all the hair on someone's head, it's uncountable ('hair'). When referring to a single, individual strand, it becomes countable ('a hair')."
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      text: "We had ______ during our trip to the mountains. The fresh air and beautiful scenery were incredible.",
      options: ['a wonderful weather', 'wonderful weather', 'wonderful weathers'],
      userAnswer: '',
      correctAnswer: 'wonderful weather',
      status: 'unanswered',
      explanation: "'Weather' is an uncountable noun. It describes the general atmospheric conditions. We don't use 'a/an' with it or make it plural. You can describe it with adjectives, but its form remains uncountable."
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      text: "To bake this cake, you'll need ______, two ______, and a little ______.",
      options: ['flour / eggs / salt', 'a flour / egg / a salt', 'flours / eggs / salt'],
      userAnswer: '',
      correctAnswer: 'flour / eggs / salt',
      status: 'unanswered',
      explanation: "This tests a mix. 'Flour' and 'salt' are uncountable mass nouns. 'Eggs' are countable, and here we need the plural form. The sentence structure implies the base, uncountable form for the mass nouns and the plural for the countable one."
    },
    {
      id: 'q7',
      type: 'multiple-choice',
      text: "The professor's lecture contained so much ______ that my notebook is full. I need to do more ______ before the exam.",
      options: ['informations / researches', 'information / research', 'information / a research'],
      userAnswer: '',
      correctAnswer: 'information / research',
      status: 'unanswered',
      explanation: "Both 'information' and 'research' are uncountable nouns in English. Even if you gather many facts or conduct many studies, these words remain in their base form. Common mistakes are pluralizing them ('informations', 'researches')."
    },
     {
      id: 'q8',
      type: 'multiple-choice',
      text: "My flight was cancelled, and I have too much ______ to carry on the train. I only have two small ______.",
      options: ['luggages / bag', 'luggage / bags', 'luggage / baggages'],
      userAnswer: '',
      correctAnswer: 'luggage / bags',
      status: 'unanswered',
      explanation: "'Luggage' (and its synonym 'baggage') is uncountable. It refers to your bags collectively. However, the individual items, 'bags' (or 'suitcases'), are countable. This is a key distinction between a category noun (uncountable) and the items within it (countable)."
    },
     {
      id: 'q9',
      type: 'multiple-choice',
      text: "This gallery features ______ from the 17th century, including ______ that is considered a masterpiece.",
      options: ['many works of art / a work of art', 'much work of art / work of art', 'many work of arts / a work of art'],
      userAnswer: '',
      correctAnswer: 'many works of art / a work of art',
      status: 'unanswered',
      explanation: "While 'work' (meaning employment/effort) is uncountable, 'work' can be countable when it means a creation, like a book, painting, or sculpture. In this context, we use the countable form: 'a work of art' (singular) and 'works of art' (plural). 'Many' is used with plural countable nouns."
    },
     {
      id: 'q10',
      type: 'multiple-choice',
      text: "I didn't have ______ with the new project because I had too much ______ to do for my other clients.",
      options: ['many luck / works', 'any luck / work', 'a luck / work'],
      userAnswer: '',
      correctAnswer: 'any luck / work',
      status: 'unanswered',
      explanation: "'Luck' and 'work' (in the sense of tasks/employment) are both uncountable. We use 'any' in negative sentences with uncountable nouns (I didn't have any luck). We use 'much', not 'many', with uncountable nouns to express a large quantity (too much work)."
    }
  ],
  showResult: false
})

// --- Computed Properties for Dynamic UI ---
const score = computed(() => {
  const correctAnswers = quizState.questions.filter(q => q.status === 'correct').length
  return Math.round((correctAnswers / quizState.questions.length) * 100)
})

const allQuestionsAnswered = computed(() => {
  return quizState.questions.every(q => q.userAnswer !== '')
})

const progress = computed(() => {
  const answeredCount = quizState.questions.filter(q => q.userAnswer !== '').length
  return (answeredCount / quizState.questions.length) * 100
})

const scoreFeedback = computed(() => {
  if (score.value === 100) return { title: "Perfect Score! A True Grammar Master!", variant: "success" }
  if (score.value >= 80) return { title: "Excellent Work! You have a strong grasp of this topic.", variant: "success" }
  if (score.value >= 60) return { title: "Good Effort! Review the explanations to solidify your knowledge.", variant: "default" }
  return { title: "Keep Practicing. Repetition is the key to success.", variant: "destructive" }
})

// --- Core Functions ---
function checkAnswers() {
  if (!allQuestionsAnswered.value) {
    alert("Please answer all questions before submitting.")
    return
  }

  quizState.questions.forEach(question => {
    if (question.userAnswer === question.correctAnswer) {
      question.status = 'correct'
    } else {
      question.status = 'incorrect'
    }
  })
  quizState.showResult = true
}

function resetQuiz() {
  quizState.questions.forEach(q => {
    q.userAnswer = ''
    q.status = 'unanswered'
  })
  quizState.showResult = false
  // Scroll to the top of the practice section for a better user experience
  document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout 
    test-title="English Grammar In Use Practice"
    test-description="Interactive exercises based on the book by Raymond Murphy."
    unit-title="Unit 2: Countable and Uncountable Nouns 1"
    unit-description="Mastering the fundamental difference between countable and uncountable nouns, including common pitfalls and special cases."
    :categories="['Nouns', 'Quantifiers', 'Articles']"
    :show-result="quizState.showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: Learning Content                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div class="flex items-center gap-3">
            <BookOpenCheck class="h-8 w-8 text-blue-500" />
            <CardTitle class="text-blue-900 dark:text-blue-200">Core Concepts</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-4 text-sm md:text-base">
          <div>
            <h4 class="font-bold">Countable Nouns</h4>
            <p class="text-muted-foreground">These are for things we can count using numbers. They have a singular and a plural form. The singular form can use the article 'a' or 'an'.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Singular: <span class="font-semibold">one book</span>, <span class="font-semibold">a chair</span></li>
              <li>Plural: <span class="font-semibold">two books</span>, <span class="font-semibold">some chairs</span></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold">Uncountable Nouns</h4>
            <p class="text-muted-foreground">These are for things we cannot count with numbers. They are often abstract ideas, liquids, or materials. They have no plural form and you cannot use 'a/an' with them.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Examples: <span class="font-semibold">music</span>, <span class="font-semibold">advice</span>, <span class="font-semibold">water</span>, <span class="font-semibold">furniture</span>, <span class="font-semibold">research</span></li>
              <li>Usage: <span class="font-semibold">some water</span> (not <s class="text-red-500">a water</s> or <s class="text-red-500">waters</s>)</li>
            </ul>
          </div>
          <Alert variant="default" class="border-amber-400 bg-amber-50 dark:bg-amber-900/20">
            <AlertTitle class="font-bold text-amber-800 dark:text-amber-300">Teacher's Tip: The 'Container' Trick</AlertTitle>
            <AlertDescription class="text-amber-700 dark:text-amber-400">
              You can't count an uncountable noun itself, but you can count its <span class="font-semibold">container or unit</span>.
              <br>- You can't count 'information', but you can count <span class="font-semibold">'pieces of information'</span>.
              <br>- You can't count 'bread', but you can count <span class="font-semibold">'loaves of bread'</span>.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive" class="border-red-400 bg-red-50 dark:bg-red-900/20">
            <AlertTitle class="font-bold text-red-800 dark:text-red-300">Common Pitfalls</AlertTitle>
            <AlertDescription class="text-red-700 dark:text-red-400">
              Many nouns that are countable in other languages are uncountable in English. Be careful with: <span class="font-semibold">accommodation, baggage, equipment, homework, knowledge, money, traffic, travel.</span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive Questions                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section">
        <Card>
          <CardHeader>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Practice Exercises</CardTitle>
                <CardDescription>Select the best option for each sentence.</CardDescription>
              </div>
              <div class="w-full sm:w-48">
                <Progress :model-value="progress" class="h-2" />
                <p class="text-xs text-muted-foreground text-right mt-1">{{ Math.round(progress) }}% Complete</p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(question, index) in quizState.questions" :key="question.id" class="space-y-3">
              <p class="font-medium">{{ index + 1 }}. {{ question.text }}</p>
              <RadioGroup
                v-model="question.userAnswer"
                :disabled="quizState.showResult"
                class="space-y-2"
              >
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`" class="cursor-pointer">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>
            <div class="flex justify-end gap-3 pt-4 border-t">
              <Button v-if="quizState.showResult" variant="outline" @click="resetQuiz">
                Try Again
              </Button>
              <Button @click="checkAnswers" :disabled="!allQuestionsAnswered || quizState.showResult">
                Check Answers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: Detailed Feedback & Score                               -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="border-2" :class="{
        'border-green-500': scoreFeedback.variant === 'success',
        'border-red-500': scoreFeedback.variant === 'destructive',
        'border-gray-300': scoreFeedback.variant === 'default'
      }">
        <CardHeader>
          <CardTitle class="text-2xl">{{ scoreFeedback.title }}</CardTitle>
          <div class="flex items-center gap-4 pt-2">
            <h3 class="text-4xl font-bold tracking-tighter">{{ score }}%</h3>
            <div class="w-full">
              <Progress :model-value="score" class="h-3" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 class="text-xl font-semibold mb-4 border-b pb-2">Detailed Review</h3>
          <div class="space-y-6">
            <div 
              v-for="(question, index) in quizState.questions" 
              :key="`result-${question.id}`"
              class="rounded-lg p-4"
              :class="{
                'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500': question.status === 'correct',
                'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500': question.status === 'incorrect'
              }"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <CheckCircle2 v-if="question.status === 'correct'" class="h-6 w-6 text-green-600" />
                  <XCircle v-else class="h-6 w-6 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-base">{{ index + 1 }}. {{ question.text }}</p>
                  <p class="mt-1 text-sm" :class="{ 'text-green-700 dark:text-green-300': question.status === 'correct', 'text-red-700 dark:text-red-400': question.status === 'incorrect' }">
                    <span v-if="question.status === 'incorrect'">
                      Your answer: <s class="font-medium">{{ question.userAnswer }}</s>
                    </span>
                    <span v-else>Your answer: <span class="font-medium">{{ question.userAnswer }}</span></span>
                  </p>
                  <p class="mt-1 text-sm text-green-800 dark:text-green-200">
                    Correct answer: <span class="font-medium">{{ question.correctAnswer }}</span>
                  </p>
                  <Alert class="mt-3 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <AlertTitle class="font-bold text-sm">Explanation</AlertTitle>
                    <AlertDescription class="text-sm text-muted-foreground">
                      {{ question.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
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
