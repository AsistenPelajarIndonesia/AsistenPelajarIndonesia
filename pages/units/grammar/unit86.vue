<!--
  File: @/pages/units/grammar/20.vue
  Description: An advanced grammar practice page for Unit 20, focusing on the nuanced use of
  quantifiers: "Much, many, little, few, a lot, plenty". This page leverages the GrammarLayout
  to provide a structured learning experience with in-depth material, challenging exercises,
  and an intelligent result validator.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-vue-next'

// Local component imports. Assuming these are correctly set up in the project.
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  router.push('/units/grammar/19')
}
function goToNextUnit() {
  router.push('/units/grammar/21')
}

// --- COMPONENT STATE ---
const showResult = ref(false)
const userAnswers = reactive<{ [key: string]: string }>({})

// --- DATA: QUESTIONS & ANSWERS ---
// These questions are designed to be challenging, testing subtle distinctions and common pitfalls.
const questions = ref([
  {
    id: 'q1',
    text: 'Despite the storm warning, there were surprisingly ___ people on the beach; it felt almost deserted.',
    options: ['a few', 'few', 'a little', 'little'],
    correctAnswer: 'few',
    explanation: 'The context "it felt almost deserted" indicates a negative, almost-zero quantity. "Few" is used for countable nouns (people) with this negative connotation, meaning "not many" or "hardly any". "A few" would imply a small but positive number, which contradicts the context.'
  },
  {
    id: 'q2',
    text: "I'm sorry, I can't help you. I have very ___ knowledge of advanced astrophysics.",
    options: ['few', 'a few', 'little', 'a lot of'],
    correctAnswer: 'little',
    explanation: '"Knowledge" is an uncountable noun. The phrase "very ___" emphasizes a near-absence of it. "Little" is the correct quantifier for uncountable nouns to express a negative quantity ("almost no knowledge"). "Few" is for countable nouns.'
  },
  {
    id: 'q3',
    text: "We don't have ___ time before the presentation starts, so let's focus on the main points.",
    options: ['many', 'much', 'a few', 'plenty'],
    correctAnswer: 'much',
    explanation: "\"Time\" (in this general sense) is uncountable. In negative sentences, \"much\" is the standard and most idiomatic choice for uncountable nouns. While \"a lot of\" is possible, \"much\" is more common and formal in this structure (\"don't have much...\")."
  },
  {
    id: 'q4',
    text: "Don't worry about bringing drinks; I've bought ___. There's more than enough for everyone.",
    options: ['plenty', 'many', 'much', 'a few'],
    correctAnswer: 'plenty',
    explanation: "'Plenty' is ideal here because it signifies not just 'a lot,' but 'enough or more than enough,' which perfectly matches the context 'There's more than enough for everyone.'' It can be used without a noun if the context is clear."
  },
  {
    id: 'q5',
    text: 'He made ___ mistakes in his essay, but his overall argument was compelling.',
    options: ['a little', 'little', 'a few', 'few'],
    correctAnswer: 'a few',
    explanation: "\"Mistakes\" is a plural, countable noun. The conjunction \"but\" suggests a contrast. He made some mistakes (a small, definite number), yet the essay was good. \"A few\" has this positive/neutral connotation. \"Few\" would imply he made almost no mistakes, which wouldn't fit the contrast with \"but\"."
  },
  {
    id: 'q6',
    text: 'How ___ luggage are you allowed to check in for this flight?',
    options: ['many', 'much', 'a lot of', 'plenty of'],
    correctAnswer: 'much',
    explanation: '"Luggage" is a classic uncountable noun. In questions with "how", "how much" is used for uncountable nouns and "how many" for countable nouns. Therefore, "how much luggage" is the only correct structure.'
  },
  {
    id: 'q7',
    text: "There isn't ___ information available on this topic, so your research may be difficult.",
    options: ['many', 'a lot', 'much', 'a few'],
    correctAnswer: 'much',
    explanation: "\"Information\" is uncountable. Similar to question 3, \"much\" is the standard quantifier for uncountable nouns in negative sentences (\"isn't much...\"). \"A lot of\" could work, but \"isn't a lot of\" is slightly less formal than \"isn't much\"."
  },
  {
    id: 'q8',
    text: 'She has ___ of experience in project management, which is why she was chosen to lead the team.',
    options: ['a lot', 'many', 'much', 'little'],
    correctAnswer: 'a lot',
    explanation: '"A lot of" is the correct phrase here. "Experience" is uncountable. In positive statements, "a lot of" is much more common and natural than "much". The phrase is "a lot of", not just "a lot".'
  }
])

// --- VALIDATOR & RESULTS LOGIC ---
const isQuizComplete = computed(() => Object.keys(userAnswers).length === questions.value.length)

const score = computed(() => {
  if (!showResult.value) return 0
  const correctCount = questions.value.filter(q => userAnswers[q.id] === q.correctAnswer).length
  return Math.round((correctCount / questions.value.length) * 100)
})

const detailedResults = computed(() => {
  return questions.value.map(q => {
    const userAnswer = userAnswers[q.id]
    const isCorrect = userAnswer === q.correctAnswer
    return { ...q, userAnswer, isCorrect }
  })
})

function checkAnswers() {
  if (!isQuizComplete.value) {
    alert('Please answer all questions before checking your results.')
    return
  }
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
     document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate Grammar In Use"
    test-description="Based on the works of Raymond Murphy"
    unit-title="Unit 20: Much, many, little, few, a lot, plenty"
    unit-description="Mastering quantifiers for countable and uncountable nouns in various contexts."
    :categories="['Quantifiers', 'Nouns', 'Common Mistakes', 'Intermediate']"
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
          <CardTitle>Core Concepts: The Quantifier Matrix</CardTitle>
          <CardDescription>Understanding which word to use depends on two things: the noun (countable/uncountable) and the context (positive/negative/question).</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div>
            <h4 class="font-bold text-base mb-2">1. The Basics: Countable vs. Uncountable</h4>
            <p class="text-muted-foreground">
              <strong class="text-primary">Countable Nouns</strong> are things you can count individually (e.g., <em class="italic">one book, two cars, three ideas</em>). They have plural forms.
            </p>
            <p class="text-muted-foreground mt-1">
              <strong class="text-primary">Uncountable Nouns</strong> are things you can't count as individual units (e.g., <em class="italic">water, information, luggage, advice</em>). They are treated as a whole and usually have no plural form.
            </p>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">2. For Large Quantities</h4>
            <ul class="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Many / Much:</strong>
                <ul class="list-['-_'] list-inside pl-4 mt-1 space-y-1">
                  <li>Use <strong class="text-primary">many</strong> with <strong class="text-primary">countable</strong> nouns: <em class="italic">"How many emails did you get?"</em></li>
                  <li>Use <strong class="text-primary">much</strong> with <strong class="text-primary">uncountable</strong> nouns: <em class="italic">"I don't have much time."</em></li>
                  <li class="font-semibold text-amber-700 dark:text-amber-400">Teacher's Insight: In modern, informal positive sentences, "much" and "many" are less common. We prefer "a lot of". Compare: <em class="italic">"I have much work"</em> (unnatural) vs. <em class="italic">"I have a lot of work"</em> (natural).</li>
                </ul>
              </li>
              <li>
                <strong>A lot of / Lots of / Plenty of:</strong>
                <ul class="list-['-_'] list-inside pl-4 mt-1 space-y-1">
                  <li>These are flexible and used with <strong class="text-primary">both countable and uncountable</strong> nouns. They are very common in positive statements.</li>
                  <li><em class="italic">"She has a lot of friends."</em> (countable)</li>
                  <li><em class="italic">"There's a lot of sugar in this."</em> (uncountable)</li>
                  <li><strong class="text-primary">Plenty of</strong> implies an abundance—enough, or even more than enough. <em class="italic">"No need to rush, we have plenty of time."</em></li>
                </ul>
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">3. The Crucial Distinction: For Small Quantities</h4>
             <p class="text-muted-foreground mb-2">This is where most students make mistakes. The presence or absence of 'a' completely changes the meaning.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-md border p-4">
                <h5 class="font-semibold">Positive Idea: "A Little" & "A Few"</h5>
                <p class="text-muted-foreground text-xs mt-1">Meaning: A small amount/number, but some exist.</p>
                <hr class="my-2">
                <p class="text-muted-foreground"><strong class="text-primary">A Little</strong> + Uncountable: <em class="italic">"I have a little money left, enough for a coffee."</em> (Positive)</p>
                <p class="text-muted-foreground mt-1"><strong class="text-primary">A Few</strong> + Countable: <em class="italic">"She spoke to a few people at the party."</em> (Positive)</p>
              </div>
              <div class="rounded-md border p-4 bg-destructive/10 border-destructive/30">
                <h5 class="font-semibold">Negative Idea: "Little" & "Few"</h5>
                 <p class="text-muted-foreground text-xs mt-1">Meaning: Almost none, not much/many.</p>
                 <hr class="my-2">
                <p class="text-muted-foreground"><strong class="text-destructive">Little</strong> + Uncountable: <em class="italic">"There is little hope of survival."</em> (Negative, almost no hope)</p>
                 <p class="text-muted-foreground mt-1"><strong class="text-destructive">Few</strong> + Countable: <em class="italic">"Few politicians are truly honest."</em> (Negative, implies almost none are)</p>
              </div>
            </div>
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
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete each sentence. Consider the context carefully.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. <span class="font-normal">{{ q.text.split('___')[0] }}<span class="inline-block w-24 border-b-2 border-dashed border-primary/50 align-bottom mx-1"></span>{{ q.text.split('___')[1] }}</span></p>
            <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
              <div v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${q.id}-${option}`" :value="option" />
                <Label :for="`${q.id}-${option}`" class="font-normal cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <Button @click="checkAnswers" :disabled="!isQuizComplete" size="lg" class="w-full">
            <span v-if="!isQuizComplete">Answer All Questions to See Results</span>
            <span v-else>Check My Answers</span>
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS VALIDATOR SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Your Results & Explanations</CardTitle>
            <CardDescription>Your score is {{ score }}%. Review the detailed explanations below to understand any mistakes.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
             <div class="flex items-center gap-4">
                <span class="text-sm font-medium">Progress</span>
                <Progress :model-value="score" class="w-[60%]" />
                <span class="text-sm font-bold">{{ score }}%</span>
             </div>
             <Separator />

            <div v-for="(result, index) in detailedResults" :key="result.id">
              <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="mb-4">
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                <AlertTitle class="flex justify-between items-center">
                  <span>Question {{ index + 1 }}: {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}</span>
                </AlertTitle>
                <AlertDescription class="mt-2 space-y-3">
                   <p class="text-foreground italic">"{{ result.text.replace('___', `[${result.correctAnswer}]`) }}"</p>
                   <div v-if="!result.isCorrect" class="text-sm">
                    Your answer: <span class="font-semibold line-through">{{ result.userAnswer }}</span>. Correct answer: <span class="font-semibold">{{ result.correctAnswer }}</span>
                   </div>
                   <div class="p-3 rounded-md bg-background/50 border">
                      <h5 class="font-bold flex items-center gap-2"><ChevronRight class="w-4 h-4" /> Explanation</h5>
                      <p class="mt-1 text-sm text-foreground/80">{{ result.explanation }}</p>
                   </div>
                </AlertDescription>
              </Alert>
            </div>

            <Button @click="resetQuiz" variant="outline" size="lg" class="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
