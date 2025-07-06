<!--
  File: @/pages/units/grammar/25.vue
  Unit: 25 - Verb + preposition 2: About/for/of/after
  Description: An advanced grammar practice page based on Raymond Murphy's "English Grammar In Use".
  This page provides in-depth explanations and challenging exercises to master verb-preposition collocations.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports (Assuming they are globally available or in @/components/ui) ---
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page & Unit Metadata ---
const unitDetails = {
  testTitle: "English Grammar In Use: Intermediate Practice",
  testDescription: "Advanced exercises designed to perfect your understanding of English grammar.",
  unitNumber: 25,
  unitTitle: "Unit 25: Verb + preposition (2)",
  unitDescription: "Mastering common verbs followed by 'about', 'for', 'of', and 'after'. This unit focuses on understanding the subtle differences in meaning and context.",
  categories: ['Verbs', 'Prepositions', 'Collocations', 'Intermediate']
}

// --- Navigation ---
const router = useRouter()
const goToPreviousUnit = () => router.push(`/units/grammar/${unitDetails.unitNumber - 1}`)
const goToNextUnit = () => router.push(`/units/grammar/${unitDetails.unitNumber + 1}`)

// --- Question & Answer State ---
interface Question {
  id: number
  sentence: string[]
  options: string[]
  correctAnswer: string
  userAnswer: string | null
  verb: string
  explanation: string
  example: string
}

const questions = reactive<Question[]>([
  {
    id: 1,
    sentence: ["Don't worry,", "your application. We'll contact you soon."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'about',
    userAnswer: null,
    verb: 'worry about',
    explanation: "We use 'worry about' to express anxiety or concern over something or someone. 'Worry for' is less common and usually implies worrying on someone's behalf.",
    example: "She was worried about her final exam results."
  },
  {
    id: 2,
    sentence: ["Could you ask the waiter", "the bill, please?"],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'for',
    userAnswer: null,
    verb: 'ask for',
    explanation: "'Ask for' is used to request something directly. 'Ask about' is used to inquire and get information about a topic. Here, you are requesting the bill itself.",
    example: "If you're lost, you should ask a police officer for directions."
  },
  {
    id: 3,
    sentence: ["I've heard", "that new restaurant downtown, but I haven't heard", "its menu yet."],
    options: ['of / about', 'about / of', 'for / about', 'of / for'],
    correctAnswer: 'of / about',
    userAnswer: null,
    verb: 'hear of/about',
    explanation: "'Hear of' means to know that something or someone exists. 'Hear about' means to be told details or news about something. First, you know the restaurant exists, then you want details about the menu.",
    example: "I've heard of Shakespeare, of course, but I've never heard about his personal life."
  },
  {
    id: 4,
    sentence: ["The police detective is looking", "a man who escaped from prison last night."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'for',
    userAnswer: null,
    verb: 'look for',
    explanation: "'Look for' means to search or try to find someone or something. 'Look after' means to take care of someone or something.",
    example: "I'm looking for my keys; have you seen them anywhere?"
  },
  {
    id: 5,
    sentence: ["What did you think", "the film? I found it quite thought-provoking."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'of',
    userAnswer: null,
    verb: 'think of',
    explanation: "When asking for an opinion, 'What do/did you think of...?' is the standard structure. 'Think about' means to consider or concentrate on something. While you can 'think about a film,' the question 'What did you think...?' requires 'of'.",
    example: "What do you think of my new haircut?"
  },
  {
    id: 6,
    sentence: ["She really cares", "the environment and participates in local clean-up events."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'about',
    userAnswer: null,
    verb: 'care about',
    explanation: "'Care about' means to feel that something is important and be concerned about it. 'Care for' can mean 'to like' (e.g., I don't care for spicy food) or 'to look after'. In the context of a cause, 'care about' is the correct choice.",
    example: "He deeply cares about social justice."
  },
  {
    id: 7,
    sentence: ["The baby was named Jane", "her grandmother."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'after',
    userAnswer: null,
    verb: 'name after',
    explanation: "'To name someone after someone else' means to give them the same name in honor of that person. This is a fixed phrasal verb.",
    example: "They named their ship 'The Endeavour' after Captain Cook's famous vessel."
  },
  {
    id: 8,
    sentence: ["He applied", "a scholarship to help pay for his university tuition."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'for',
    userAnswer: null,
    verb: 'apply for',
    explanation: "You 'apply for' something you want to obtain, like a job, a passport, or a scholarship. You 'apply to' a place or institution, like a university.",
    example: "Over 500 people applied for the position."
  },
  {
    id: 9,
    sentence: ["This perfume reminds me", "a garden I visited in France."],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'of',
    userAnswer: null,
    verb: 'remind of',
    explanation: "'Remind someone of something/someone' is the structure used when a person or thing makes you think of another person or thing because of a similarity.",
    example: "That song always reminds me of our holiday in Spain."
  },
  {
    id: 10,
    sentence: ["Could you please look", "my cat while I'm away on holiday?"],
    options: ['about', 'for', 'of', 'after'],
    correctAnswer: 'after',
    userAnswer: null,
    verb: 'look after',
    explanation: "'Look after' means to take care of or be responsible for someone or something. It is different from 'look for', which means to search.",
    example: "It's hard work looking after three young children all day."
  },
]);

// --- UI & Validation Logic ---
const showResult = ref(false)
const submitted = ref(false)

const checkAnswers = () => {
  submitted.value = true
  // Check if all questions are answered before showing results
  if (questions.every(q => q.userAnswer !== null)) {
    showResult.value = true
  } else {
    // This is a simple alert, a more sophisticated UI could highlight unanswered questions
    alert('Please answer all questions before submitting.')
  }
}

const resetTest = () => {
  questions.forEach(q => q.userAnswer = null)
  showResult.value = false
  submitted.value = false
}

const score = computed(() => {
  return questions.reduce((count, q) => {
    return count + (q.userAnswer === q.correctAnswer ? 1 : 0)
  }, 0)
})

const scorePercentage = computed(() => {
  return Math.round((score.value / questions.length) * 100)
})

const scoreFeedback = computed(() => {
  if (scorePercentage.value >= 90) return { title: 'Excellent!', message: "You have a superb grasp of these prepositions. Keep up the great work!", variant: 'success' as const }
  if (scorePercentage.value >= 70) return { title: 'Very Good!', message: "A strong performance. Review the explanations for any mistakes to solidify your knowledge.", variant: 'default' as const }
  if (scorePercentage.value >= 50) return { title: 'Good Effort', message: "A solid attempt. Pay close attention to the explanations to understand the nuances.", variant: 'default' as const }
  return { title: 'Needs Review', message: "This is a tricky topic. Go over the material and the explanations carefully. Practice makes perfect!", variant: 'destructive' as const }
})
</script>

<template>
  <GrammarLayout
    :test-title="unitDetails.testTitle"
    :test-description="unitDetails.testDescription"
    :unit-title="unitDetails.unitTitle"
    :unit-description="unitDetails.unitDescription"
    :categories="unitDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- MATERIAL SLOT: Explanations and Examples                              -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Learning Focus: Verb + Preposition Meanings</CardTitle>
          <CardDescription>
            The preposition that follows a verb can drastically change its meaning. This section breaks down the specific uses of verbs with 'about', 'for', 'of', and 'after'. Pay close attention to the contextual examples.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6 text-sm">
          <!-- ABOUT -->
          <div>
            <h3 class="mb-2 text-base font-semibold">Verbs + ABOUT</h3>
            <ul class="space-y-2 pl-4 list-disc">
              <li><strong>worry/complain/read/know ABOUT:</strong> To express concern, dissatisfaction, or knowledge regarding a topic. <br><em>Example: He knew nothing <span class="font-bold text-primary">about</span> the new company policy.</em></li>
              <li><strong>hear ABOUT:</strong> To be told news or information about something. <br><em>Example: Have you heard <span class="font-bold text-primary">about</span> the train strike next week?</em></li>
              <li><strong>care ABOUT:</strong> To feel something is important. <br><em>Example: If you truly <span class="font-bold text-primary">care about</span> your future, you'll start studying.</em></li>
            </ul>
          </div>
          <!-- FOR -->
          <div>
            <h3 class="mb-2 text-base font-semibold">Verbs + FOR</h3>
            <ul class="space-y-2 pl-4 list-disc">
              <li><strong>ask FOR:</strong> To request something. <br><em>Example: She <span class="font-bold text-primary">asked for</span> a glass of water.</em></li>
              <li><strong>apply FOR:</strong> To make a formal request for something (a job, a loan). <br><em>Example: Did you <span class="font-bold text-primary">apply for</span> that marketing position?</em></li>
              <li><strong>look FOR:</strong> To search for something or someone. <br><em>Example: I'm <span class="font-bold text-primary">looking for</span> my wallet.</em></li>
               <li><strong>care FOR:</strong> To look after someone; OR to like something (usually in the negative). <br><em>Example 1: The nurse will <span class="font-bold text-primary">care for</span> the patient. <br>Example 2: I don't much <span class="font-bold text-primary">care for</span> modern art.</em></li>
            </ul>
          </div>
          <!-- OF -->
          <div>
            <h3 class="mb-2 text-base font-semibold">Verbs + OF</h3>
            <ul class="space-y-2 pl-4 list-disc">
              <li><strong>think OF / dream OF:</strong> To have an idea, opinion, or imagination. 'Think of' is often used for opinions. <br><em>Example: "What do you <span class="font-bold text-primary">think of</span> my idea?"</em></li>
              <li><strong>hear OF:</strong> To know that something or someone exists. <br><em>Example: I've never <span class="font-bold text-primary">heard of</span> a 'zonkey' before. What is it?</em></li>
              <li><strong>remind (someone) OF:</strong> To cause someone to remember something or someone. <br><em>Example: This place <span class="font-bold text-primary">reminds me of</span> my childhood home.</em></li>
            </ul>
          </div>
          <!-- AFTER -->
          <div>
            <h3 class="mb-2 text-base font-semibold">Verbs + AFTER</h3>
            <ul class="space-y-2 pl-4 list-disc">
              <li><strong>look AFTER:</strong> To take care of, to be responsible for. <br><em>Example: Can you <span class="font-bold text-primary">look after</span> my plants while I'm away?</em></li>
              <li><strong>name AFTER:</strong> To give someone the same name as another person. <br><em>Example: The city is named <span class="font-bold text-primary">after</span> a famous general.</em></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE SLOT: Interactive Questions                                  -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Choose the correct preposition to complete each sentence. Think carefully about the context provided.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium text-gray-800 dark:text-gray-200">
              {{ index + 1 }}. {{ question.sentence[0] }}
              <span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 text-transparent">...</span>
              {{ question.sentence[1] }}
            </p>
            <RadioGroup v-model="question.userAnswer" class="flex flex-wrap gap-4">
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${question.id}-${option}`" :value="option" />
                <Label :for="`q${question.id}-${option}`" class="cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="flex gap-4 pt-4">
            <Button @click="checkAnswers" :disabled="showResult">Check Answers</Button>
            <Button variant="outline" @click="resetTest">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULT SLOT: Detailed Feedback and Score                              -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance below. Understanding your mistakes is key to improvement.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 class="text-lg font-semibold">Overall Score: {{ score }} / {{ questions.length }} ({{ scorePercentage }}%)</h3>
            <Progress :model-value="scorePercentage" class="my-3" />
            <Alert :variant="scoreFeedback.variant">
              <HelpCircle v-if="scoreFeedback.variant !== 'success'" class="h-4 w-4" />
              <CheckCircle v-else class="h-4 w-4" />
              <AlertTitle>{{ scoreFeedback.title }}</AlertTitle>
              <AlertDescription>{{ scoreFeedback.message }}</AlertDescription>
            </Alert>
          </div>

          <!-- Detailed Breakdown -->
          <div class="space-y-6">
            <h3 class="text-md font-semibold">Detailed Question Analysis:</h3>
            <div
              v-for="(q, index) in questions"
              :key="`result-${q.id}`"
              class="p-4 rounded-md border"
              :class="{
                'border-green-500 bg-green-50 dark:bg-green-900/20': q.userAnswer === q.correctAnswer,
                'border-red-500 bg-red-50 dark:bg-red-900/20': q.userAnswer !== q.correctAnswer,
              }"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <CheckCircle v-if="q.userAnswer === q.correctAnswer" class="h-6 w-6 text-green-600" />
                  <XCircle v-else class="h-6 w-6 text-red-600" />
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-800 dark:text-gray-200">
                    {{ index + 1 }}. {{ q.sentence[0] }}
                    <span
                      class="font-bold"
                      :class="{
                        'text-green-700 dark:text-green-400': q.userAnswer === q.correctAnswer,
                        'text-red-700 dark:text-red-400 line-through': q.userAnswer !== q.correctAnswer,
                      }"
                    >{{ q.userAnswer }}</span>
                    <span v-if="q.userAnswer !== q.correctAnswer" class="ml-2 font-bold text-green-700 dark:text-green-400">
                      {{ q.correctAnswer }}
                    </span>
                    {{ q.sentence[1] }}
                  </p>
                  <div class="mt-3 p-3 rounded-md bg-background/50 text-sm">
                    <p class="font-semibold text-primary">Explanation ({{ q.verb }}):</p>
                    <p class="text-muted-foreground">{{ q.explanation }}</p>
                    <p class="mt-2 text-muted-foreground italic">e.g. "{{ q.example }}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
