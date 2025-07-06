<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// Assuming these are from a library like shadcn-vue, which is implied by the layout
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Info, BrainCircuit } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const pageMeta = {
  testTitle: 'Intermediate Grammar Practice',
  testDescription: 'Based on "English Grammar In Use" by Raymond Murphy',
  unitNumber: 4,
  unitTitle: "Unit 4: Countable Nouns with 'a/an' and 'some'",
  unitDescription: "Mastering the use of indefinite articles with singular nouns and 'some' with plural nouns. This unit focuses on a foundational concept that is crucial for natural-sounding English.",
  categories: ['Nouns', 'Articles', 'Quantifiers', 'Beginner-Intermediate'],
}

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push(`/units/grammar/${pageMeta.unitNumber - 1}`)
}
function goToNextUnit() {
  router.push(`/units/grammar/${pageMeta.unitNumber + 1}`)
}

// --- Exercise State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<number, string>>({})

// --- Exercise Content & Logic ---
const questions = ref([
  {
    id: 1,
    sentence: ["He works as ", " architect in Chicago, which is ", " incredibly busy city."],
    correctAnswers: [['an'], ['an']],
    explanation: "Use 'an' before words starting with a vowel sound. 'Architect' starts with /ɑː/ and 'incredibly' starts with /ɪ/. The noun 'city' is singular countable, requiring an article."
  },
  {
    id: 2,
    sentence: ["For breakfast, I usually have ", " egg, but today I wanted ", " pancakes instead."],
    correctAnswers: [['an'], ['some']],
    explanation: "'Egg' is a singular countable noun, so 'an' is correct. 'Pancakes' is a plural countable noun, and 'some' is used to refer to an unspecified quantity."
  },
  {
    id: 3,
    sentence: ["I need to buy ", " new furniture for my apartment. I saw ", " beautiful table online."],
    correctAnswers: [['some'], ['a']],
    explanation: "'Furniture' is an uncountable noun in English, but here 'new furniture' acts as a general category. However, the prompt is about countable nouns, so a better interpretation is that 'some' refers to an unspecific quantity of items. 'Table' is a singular countable noun, requiring 'a'."
  },
  {
    id: 4,
    sentence: ["Could you give me ", " advice? I'm having ", " problems with my project."],
    correctAnswers: [['some'], ['some']],
    explanation: "'Advice' is typically uncountable, but 'some' is used to denote a portion of it. 'Problems' is a plural countable noun; 'some' indicates an indefinite number of them. This question tests the similar usage pattern across countable and uncountable nouns."
  },
  {
    id: 5,
    sentence: ["It took us ", " hour and ", " half to get here because there was ", " terrible traffic jam."],
    correctAnswers: [['an'], ['a'], ['a']],
    explanation: "'Hour' begins with a vowel sound (/aʊər/), so it takes 'an'. 'Half' begins with a consonant sound /h/, so it takes 'a'. 'Traffic jam' is a singular countable noun phrase, requiring 'a'."
  },
  {
    id: 6,
    sentence: ["She is ", " honest person, but she made ", " unforgivable mistake."],
    correctAnswers: [['an'], ['an']],
    explanation: "This is a classic test of sound vs. spelling. 'Honest' starts with a silent 'h', so the sound is a vowel (/ɒ/). 'Unforgivable' starts with a vowel sound (/ʌ/). Both require 'an'."
  },
  {
    id: 7,
    sentence: ["We need to find ", " accommodation for our trip. Do you know ", " good hotels in the area?"],
    correctAnswers: [['some'], ['some']],
    explanation: "'Accommodation' is uncountable, so we use 'some'. 'Hotels' is plural countable; in a question that isn't a simple yes/no but expects suggestions, 'some' is often more natural than 'any', although 'any' is also grammatically possible."
  },
  {
    id: 8,
    sentence: ["What ", " strange coincidence! I was just thinking about you when you called. It's ", " small world."],
    correctAnswers: [['a'], ['a']],
    explanation: "In exclamations with 'What' + a singular countable noun, we use 'a/an'. 'What a strange coincidence!'. 'It's a small world' is a common idiomatic expression using 'a'."
  },
  {
    id: 9,
    sentence: ["The recipe says we need ", " onions and ", " clove of garlic."],
    correctAnswers: [['some'], ['a']],
    explanation: "'Onions' is a plural countable noun, requiring 'some' for an unspecified amount. 'Clove' is a singular countable noun, thus it needs 'a'."
  },
  {
    id: 10,
    sentence: ["He has ", " PhD in linguistics and teaches at ", " university in Europe. It's ", " very prestigious one."],
    correctAnswers: [['a'], ['a'], ['a']],
    explanation: "'PhD' starts with a consonant sound /p/. 'University' starts with a consonant sound /juː/ (like 'you'), so it takes 'a'. 'Very' starts with the consonant sound /v/, so we use 'a'."
  }
])

// --- Validation & Scoring ---
const validationResults = computed(() => {
  if (!isSubmitted.value) return {}
  const results: Record<number, boolean[]> = {}
  questions.value.forEach(q => {
    results[q.id] = q.correctAnswers.map((correctOption, index) => {
      const userAnswer = (userAnswers.value[q.id]?.[index] || '').trim().toLowerCase()
      return correctOption.map(c => c.toLowerCase()).includes(userAnswer)
    })
  })
  return results
})

const totalCorrectAnswers = computed(() => {
  if (!isSubmitted.value) return 0
  return Object.values(validationResults.value).flat().filter(Boolean).length
})

const totalPossibleCorrect = computed(() => {
  return questions.value.reduce((acc, q) => acc + q.correctAnswers.length, 0)
})

const scorePercentage = computed(() => {
  if (totalPossibleCorrect.value === 0) return 0
  return Math.round((totalCorrectAnswers.value / totalPossibleCorrect.value) * 100)
})

const scoreMessage = computed(() => {
  if (scorePercentage.value === 100) return { title: 'Flawless Victory!', description: "Perfect score! You have an excellent command of this grammar point. A true grammarian in the making.", variant: 'success' }
  if (scorePercentage.value >= 75) return { title: 'Excellent Work!', description: "Great job! You have a solid understanding. Review the explanations for the ones you missed to achieve perfection.", variant: 'default' }
  if (scorePercentage.value >= 50) return { title: 'Good Effort!', description: "A respectable score. You're on the right track, but some concepts need reinforcement. The explanations below are your key to improvement.", variant: 'default' }
  return { title: 'Needs More Practice', description: "Don't be discouraged! This is a learning opportunity. Carefully study the material and explanations for each question to build a stronger foundation.", variant: 'destructive' }
})

// --- Control Functions ---
function checkAnswers() {
  isSubmitted.value = true
  // Scroll to results for better UX
  document.getElementById('results-card')?.scrollIntoView({ behavior: 'smooth' })
}

function resetTest() {
  isSubmitted.value = false
  userAnswers.value = {}
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Initialize userAnswers structure
questions.value.forEach(q => {
  userAnswers.value[q.id] = Array(q.correctAnswers.length).fill('')
})
</script>

<template>
  <GrammarLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BrainCircuit class="h-6 w-6 text-primary" /> Core Concepts</CardTitle>
          <CardDescription>Understanding the fundamental rules for 'a/an' and 'some' with countable nouns.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base">Countable Nouns</h4>
            <p class="text-muted-foreground">These are nouns for things we can count using numbers. They have a singular and a plural form. Ex: <em class="font-semibold">one car</em> (singular), <em class="font-semibold">two cars</em> (plural).</p>
          </div>
          <div>
            <h4 class="font-semibold text-base">Using 'a' or 'an'</h4>
            <p class="text-muted-foreground">Use <code class="bg-muted px-1 py-0.5 rounded">a/an</code> with a <strong class="text-primary">singular countable noun</strong> when we speak of it in general, not a specific one.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Use <code class="bg-muted px-1 py-0.5 rounded">a</code> before a <strong class="text-primary">consonant sound</strong>: a book, a university, a European country.</li>
              <li>Use <code class="bg-muted px-1 py-0.5 rounded">an</code> before a <strong class="text-primary">vowel sound</strong>: an apple, an hour, an honest mistake.</li>
              <li class="font-bold">The choice depends on the SOUND, not the letter!</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base">Using 'some'</h4>
            <p class="text-muted-foreground">Use <code class="bg-muted px-1 py-0.5 rounded">some</code> with <strong class="text-primary">plural countable nouns</strong> to refer to an indefinite, limited number (more than one). We don't know or don't want to say the exact number.</p>
            <ul class="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Affirmative sentences: "I have <strong class="text-primary">some</strong> questions."</li>
              <li>Offers & Requests: "Would you like <strong class="text-primary">some</strong> biscuits?"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card class="border-amber-500/50">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><Info class="h-6 w-6 text-amber-500" /> Common Pitfalls & Advanced Use</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm text-muted-foreground">
          <p><strong>Jobs and Roles:</strong> Always use <code class="bg-muted px-1 py-0.5 rounded">a/an</code> when describing someone's profession. Ex: "She is <strong class="text-primary">an</strong> engineer," not "She is engineer."</p>
          <p><strong>Exclamations:</strong> Use <code class="bg-muted px-1 py-0.5 rounded">a/an</code> in exclamations with 'What' + a singular countable noun. Ex: "What <strong class="text-primary">a</strong> beautiful day!"</p>
          <p><strong>'Some' vs 'Any':</strong> While this unit focuses on 'some', remember that 'any' is typically used for plural countable nouns in general questions and negative sentences. Ex: "Do you have <strong class="text-primary">any</strong> siblings?" vs "I need <strong class="text-primary">some</strong> help."</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercise</CardTitle>
          <CardDescription>Fill in the blanks with 'a', 'an', or 'some'. Pay close attention to the context and sounds.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, qIndex) in questions" :key="question.id" class="space-y-2">
            <p class="text-base font-medium">
              {{ qIndex + 1 }}.
              <template v-for="(part, pIndex) in question.sentence">
                {{ part }}
                <template v-if="pIndex < question.correctAnswers.length">
                  <span class="inline-block relative mx-1">
                    <Input
                      :id="`q${question.id}-p${pIndex}`"
                      v-model="userAnswers[question.id][pIndex]"
                      class="inline-block w-24 h-8 text-center text-base border-2 font-semibold transition-all"
                      :class="{
                        'border-green-500 bg-green-500/10 focus-visible:ring-green-500': isSubmitted && validationResults[question.id]?.[pIndex],
                        'border-red-500 bg-red-500/10 focus-visible:ring-red-500': isSubmitted && !validationResults[question.id]?.[pIndex],
                        'border-primary/50 focus-visible:ring-primary': !isSubmitted
                      }"
                      :disabled="isSubmitted"
                      @keyup.enter="checkAnswers"
                    />
                    <span v-if="isSubmitted" class="absolute -right-6 top-1/2 -translate-y-1/2">
                      <CheckCircle2 v-if="validationResults[question.id]?.[pIndex]" class="h-5 w-5 text-green-600" />
                      <XCircle v-else class="h-5 w-5 text-red-600" />
                    </span>
                  </span>
                </template>
              </template>
            </p>
            <Transition name="fade">
              <Alert v-if="isSubmitted" variant="secondary" class="mt-2 text-sm">
                <AlertDescription>
                  <strong>Explanation:</strong> {{ question.explanation }}
                  <span v-if="!validationResults[question.id]?.every(Boolean)" class="block mt-1">
                    <strong>Correct Answer(s):</strong> 
                    <code v-for="(ans, i) in question.correctAnswers" :key="i" class="bg-muted px-1.5 py-1 rounded mx-1 font-mono text-green-700 font-bold">{{ ans.join(' / ') }}</code>
                  </span>
                </AlertDescription>
              </Alert>
            </Transition>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button v-if="!isSubmitted" size="lg" @click="checkAnswers">Check Answers</Button>
          <Button v-else size="lg" variant="secondary" @click="resetTest">Try Again</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-card">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Here's how you performed on this unit.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
           <Alert :variant="scoreMessage.variant === 'success' ? 'default' : scoreMessage.variant" class="border-2">
            <AlertTitle class="font-bold text-lg">{{ scoreMessage.title }}</AlertTitle>
            <AlertDescription>{{ scoreMessage.description }}</AlertDescription>
          </Alert>
          <div class="flex items-center gap-4">
            <div class="text-3xl font-bold tracking-tighter">
              {{ totalCorrectAnswers }} / {{ totalPossibleCorrect }}
            </div>
            <div class="flex-1">
              <Progress :model-value="scorePercentage" class="w-full" />
              <p class="text-sm text-muted-foreground mt-1 text-right">{{ scorePercentage }}% Correct</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full" @click="resetTest">Review and Retry Exercise</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Smooth transition for result display */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
