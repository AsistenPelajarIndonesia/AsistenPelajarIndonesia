<!--
  File: @/pages/units/grammar/3.vue
  Description: An advanced grammar practice page for Unit 3: "Verb + -ing".
  This page integrates learning material, challenging exercises, and a detailed results
  validator within the sophisticated GrammarLayout.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are globally available or imported from a UI library like shadcn-vue
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from 'lucide-vue-next'

definePageMeta({
  // This ensures the layout is applied to this page
  layout: false,
})

// --- Component State Management ---
const showResult = ref(false)
const hasBeenSubmitted = ref(false)

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/2")
}
function goToNextUnit() {
  router.push("/units/grammar/4")
}

// --- Question & Answer Data Structure ---
// A sophisticated structure to hold various question types, user answers, and validation logic.
const questions = ref([
  {
    id: 1,
    type: 'fill-in',
    prompt: "She's a fantastic musician. I could listen to her ______ (play) the piano for hours.",
    userAnswer: '',
    correctAnswer: 'playing',
    isCorrect: false,
    explanation: "The verb 'listen to' is often followed by an object and a gerund (-ing form) to describe an ongoing action that is perceived. 'Listen to her playing' emphasizes the continuous nature of the music."
  },
  {
    id: 2,
    type: 'fill-in',
    prompt: "He admitted ______ (steal) the documents, but he refused to say who helped him.",
    userAnswer: '',
    correctAnswer: 'stealing',
    isCorrect: false,
    explanation: "The verb 'admit' is a classic example of a verb that is followed by a gerund. The structure is 'admit + verb-ing'. The infinitive 'to steal' is a common error here."
  },
  {
    id: 3,
    type: 'error-correction',
    prompt: "I deeply regret to not study harder for my final exams; my grade was disappointing.",
    userAnswer: '',
    correctAnswer: 'regret not studying',
    isCorrect: false,
    explanation: "'Regret' is followed by a gerund (-ing) when talking about a past action you wish you hadn't done. The negative is formed by putting 'not' before the gerund: 'regret not studying'. 'Regret to inform/tell' is used for delivering bad news now."
  },
  {
    id: 4,
    type: 'transformation',
    prompt: "It's not a good idea to travel during rush hour. (Use 'avoid')",
    userAnswer: '',
    correctAnswer: 'You should avoid travelling during rush hour.',
    isCorrect: false,
    explanation: "The verb 'avoid' must be followed by a gerund. This question tests your ability to rephrase an idea using a specific verb-gerund structure. Notice the spelling of 'travelling' (UK) or 'traveling' (US) are both acceptable."
  },
  {
    id: 5,
    type: 'fill-in-complex',
    prompt: "Despite the risks involved, the entrepreneurs decided to go ahead with ______ (launch) the new app, having postponed ______ (do) it twice already.",
    userAnswer: { part1: '', part2: '' },
    correctAnswer: { part1: 'launching', part2: 'doing' },
    isCorrect: false,
    explanation: "Both parts require a gerund. 'Go ahead with' is a phrasal verb + preposition combination that takes a gerund. 'Postpone' is a verb that is always followed by a gerund. This tests consistency with two different patterns in one sentence."
  },
  {
    id: 6,
    type: 'fill-in',
    prompt: "I can't help ______ (feel) a little nervous before a big presentation. It's just natural.",
    userAnswer: '',
    correctAnswer: 'feeling',
    isCorrect: false,
    explanation: "The idiomatic expression 'can't help' means you cannot stop yourself from doing something. It is always followed by a gerund."
  },
  {
    id: 7,
    type: 'meaning-shift',
    prompt: "She was walking home when she stopped ______ (talk) to an old friend she hadn't seen in years.",
    userAnswer: '',
    correctAnswer: 'to talk',
    isCorrect: false,
    explanation: "This is a key distinction. 'Stop to do something' means you interrupt an activity to do something else. 'Stop doing something' means you cease the activity itself. Here, she stopped her walk *in order to* talk."
  },
  {
    id: 8,
    type: 'error-correction',
    prompt: "We are all very much looking forward to see you again next summer.",
    userAnswer: '',
    correctAnswer: 'looking forward to seeing',
    isCorrect: false,
    explanation: "This is a very common mistake. In the phrase 'look forward to', the word 'to' is a preposition, not part of an infinitive. Prepositions are followed by nouns or gerunds. Therefore, 'seeing' is correct."
  },
  {
    id: 9,
    type: 'fill-in-passive',
    prompt: "The celebrity resented ______ (be) photographed without his permission while on a private holiday.",
    userAnswer: '',
    correctAnswer: 'being',
    isCorrect: false,
    explanation: "This tests the passive gerund ('being + past participle'). The verb 'resent' is followed by a gerund. Since the celebrity is the object of the action (he is being photographed), the passive form is required: 'resented being photographed'."
  },
  {
    id: 10,
    type: 'transformation',
    prompt: "It's pointless to argue with him; he never changes his mind. (Use 'it's no use')",
    userAnswer: '',
    correctAnswer: "It's no use arguing with him.",
    isCorrect: false,
    explanation: "The expression 'It's no use' is a fixed structure that is always followed by a gerund to say that an action will not have any effect."
  },
])

// --- Validation and Scoring Logic ---
const correctAnswersCount = computed(() => {
  return questions.value.filter(q => q.isCorrect).length
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((correctAnswersCount.value / questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  const score = scorePercentage.value
  if (score === 100) return { message: "Perfect Score! Masterful!", mood: 'success' }
  if (score >= 80) return { message: "Excellent Work! You have a strong command of this topic.", mood: 'success' }
  if (score >= 60) return { message: "Good effort! Review the explanations to solidify your understanding.", mood: 'warning' }
  return { message: "Keep practicing! Every mistake is a learning opportunity. Review the material and try again.", mood: 'default' }
})

// The "Awesome Validator" function
function validateAnswers() {
  questions.value.forEach(q => {
    // Normalize answers for comparison
    const normalize = (val: string) => typeof val === 'string' ? val.trim().toLowerCase() : ''

    if (q.type === 'fill-in-complex') {
        const userAns1 = normalize(q.userAnswer.part1)
        const userAns2 = normalize(q.userAnswer.part2)
        q.isCorrect = userAns1 === q.correctAnswer.part1 && userAns2 === q.correctAnswer.part2
    } else if (q.type === 'error-correction' || q.type === 'transformation') {
        // For more flexible checking on transformation/correction tasks
        const normalizedUserAnswer = normalize(q.userAnswer)
        const normalizedCorrectAnswer = normalize(q.correctAnswer)
        // A simple check, could be enhanced with more complex string comparison
        q.isCorrect = normalizedUserAnswer.includes(normalizedCorrectAnswer)
    } else {
        q.isCorrect = normalize(q.userAnswer) === normalize(q.correctAnswer)
    }
  })
  showResult.value = true
  hasBeenSubmitted.value = true
}

// Function to allow the student to reset and try again
function resetPractice() {
  showResult.value = false
  hasBeenSubmitted.value = false
  questions.value.forEach(q => {
    if (q.type === 'fill-in-complex') {
      q.userAnswer = { part1: '', part2: '' }
    } else {
      q.userAnswer = ''
    }
    q.isCorrect = false
  })
  // Scroll to the top of the practice section for a better user experience
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar"
    test-description="Based on 'English Grammar in Use' by Raymond Murphy"
    unit-title="Unit 3: Verb + -ing (enjoy doing / stop doing etc.)"
    unit-description="Mastering the use of gerunds after specific verbs and expressions."
    :categories="['Verbs', 'Gerunds', 'Sentence Structure']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: The Learning Content                                       -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: The Gerund</CardTitle>
          <CardDescription>
            When one verb follows another, the second verb sometimes takes the <strong>-ing</strong> form (e.g., <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">I enjoy reading</code>). This <strong>-ing</strong> form is called a gerund and it functions like a noun.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <p>Imagine this conversation:</p>
          <div class="rounded-md border bg-muted/50 p-4 italic">
            <p><strong>Alex:</strong> "What a long week! I've finally <strong>finished writing</strong> my report."</p>
            <p><strong>Ben:</strong> "Congratulations! I <strong>suggest celebrating</strong>. Do you <strong>fancy going</strong> out for dinner?"</p>
            <p><strong>Alex:</strong> "Great idea! I can't <strong>postpone relaxing</strong> any longer. I'd really appreciate <strong>not thinking</strong> about work for a few hours."</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Common Verbs followed by -ing</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <p>Memorizing this list is helpful. These verbs are consistently followed by a gerund:</p>
          <ul class="grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-3">
            <li class="font-mono">admit</li>
            <li class="font-mono">avoid</li>
            <li class="font-mono">consider</li>
            <li class="font-mono">deny</li>
            <li class="font-mono">enjoy</li>
            <li class="font-mono">finish</li>
            <li class="font-mono">involve</li>
            <li class="font-mono">mention</li>
            <li class="font-mono">mind</li>
            <li class="font-mono">postpone</li>
            <li class="font-mono">risk</li>
            <li class="font-mono">suggest</li>
          </ul>
        </CardContent>
      </Card>
      <Card class="border-amber-500/50 bg-amber-50/20">
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><AlertTriangle class="h-5 w-5 text-amber-600" />Verbs with Meaning Shifts</CardTitle>
          <CardDescription>
            Some verbs can be followed by an -ing form OR a to-infinitive, but the meaning changes completely. This is a common area for advanced errors.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-semibold">Stop</h4>
            <ul class="ml-4 list-disc space-y-1">
              <li><strong>stop doing</strong> (gerund) = to end an action.<br><em class="text-muted-foreground">e.g., He stopped smoking last year.</em></li>
              <li><strong>stop to do</strong> (infinitive) = to interrupt an activity to do something else.<br><em class="text-muted-foreground">e.g., He was driving and stopped to smoke a cigarette.</em></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">Regret</h4>
            <ul class="ml-4 list-disc space-y-1">
              <li><strong>regret doing</strong> (gerund) = to be sorry about something you did in the past.<br><em class="text-muted-foreground">e.g., I regret saying that to her.</em></li>
              <li><strong>regret to do</strong> (infinitive) = to be sorry for bad news you are delivering now (formal).<br><em class="text-muted-foreground">e.g., We regret to inform you that your application was unsuccessful.</em></li>
            </ul>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Key Expressions + -ing</CardTitle>
          <CardDescription>Certain phrases, especially those ending in a preposition, require a gerund.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <p>A frequent trap is <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">look forward to</code>. The 'to' here is a preposition, not part of an infinitive!</p>
            <ul class="ml-4 list-disc space-y-2">
              <li><strong>It's no use / It's no good...</strong><br><em class="text-muted-foreground">e.g., It's no use complaining about the weather.</em></li>
              <li><strong>can't help...</strong><br><em class="text-muted-foreground">e.g., I can't help laughing at his jokes.</em></li>
               <li><strong>look forward to...</strong><br><em class="text-muted-foreground">e.g., We are looking forward to <strong class="text-destructive">seeing</strong> you, <span class="line-through">not to see you</span>.</em></li>
              <li><strong>be/get used to...</strong><br><em class="text-muted-foreground">e.g., He's not used to living in a big city.</em></li>
            </ul>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice: The Interactive Questions                                    -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-m-20">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>Complete the sentences. Your understanding will be tested on subtle points.</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-6">
            <div v-for="(q, index) in questions" :key="q.id" class="grid gap-2">
              <Label :for="`q${q.id}`" class="text-base">
                <span class="mr-2 font-bold text-primary">{{ index + 1 }}.</span>
                <span v-html="q.prompt"></span>
              </Label>
              
              <!-- Input for Fill-in -->
              <Input v-if="q.type === 'fill-in' || q.type === 'error-correction' || q.type === 'transformation' || q.type === 'meaning-shift'" :id="`q${q.id}`" type="text" v-model="q.userAnswer" :disabled="showResult" placeholder="Your answer..." />

              <!-- Input for Passive Fill-in -->
              <div v-if="q.type === 'fill-in-passive'" class="flex items-center gap-2">
                  <span>... resented</span>
                  <Input :id="`q${q.id}`" type="text" v-model="q.userAnswer" :disabled="showResult" class="w-24" />
                  <span>photographed ...</span>
              </div>

              <!-- Input for Complex Fill-in -->
              <div v-if="q.type === 'fill-in-complex'" class="flex flex-wrap items-center gap-2 text-sm">
                <span>... go ahead with</span>
                <Input :id="`q${q.id}-p1`" type="text" v-model="q.userAnswer.part1" :disabled="showResult" class="w-32" />
                <span>, having postponed</span>
                <Input :id="`q${q.id}-p2`" type="text" v-model="q.userAnswer.part2" :disabled="showResult" class="w-32" />
                <span>it...</span>
              </div>
            </div>

            <!-- Submission Button -->
            <div class="mt-4 flex gap-4">
              <Button v-if="!hasBeenSubmitted" @click="validateAnswers" size="lg" class="w-full">
                <Sparkles class="mr-2 h-4 w-4" /> Check My Answers
              </Button>
               <Button v-else @click="resetPractice" size="lg" variant="outline" class="w-full">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: The Awesome Validator                                        -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="bg-gradient-to-br from-background to-muted/50">
        <CardHeader>
          <CardTitle class="text-2xl">Your Results</CardTitle>
           <div class="flex items-center gap-4 pt-2">
              <Progress :model-value="scorePercentage" class="w-full" />
              <span class="font-bold text-lg text-primary">{{ scorePercentage }}%</span>
           </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
            <Alert :variant="scoreFeedback.mood">
              <component :is="scorePercentage >= 80 ? CheckCircle2 : AlertTriangle" class="h-4 w-4" />
              <AlertTitle class="font-bold">{{ scoreFeedback.message }}</AlertTitle>
            </Alert>
          
          <h3 class="text-lg font-semibold tracking-tight">Detailed Breakdown:</h3>
          <div v-for="(q, index) in questions" :key="`res-${q.id}`" class="rounded-lg border p-4" :class="q.isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'">
            <div class="flex items-start justify-between">
              <p class="mb-2 font-medium"><strong class="mr-2">{{ index + 1 }}.</strong><span v-html="q.prompt"></span></p>
              <component :is="q.isCorrect ? CheckCircle2 : XCircle" class="h-6 w-6 flex-shrink-0" :class="q.isCorrect ? 'text-green-600' : 'text-red-600'"/>
            </div>
            
            <div class="mt-2 pl-6 text-sm">
                <!-- Complex Answer Display -->
                <div v-if="q.type === 'fill-in-complex'">
                    <p :class="q.isCorrect ? 'text-green-700' : 'text-red-700'">
                        Your answer: <strong>{{ q.userAnswer.part1 }}, {{ q.userAnswer.part2 }}</strong>
                    </p>
                     <p v-if="!q.isCorrect" class="text-muted-foreground">
                        Correct answer: <strong>{{ q.correctAnswer.part1 }}, {{ q.correctAnswer.part2 }}</strong>
                    </p>
                </div>
                <!-- Standard Answer Display -->
                <div v-else>
                     <p :class="q.isCorrect ? 'text-green-700' : 'text-red-700'">
                        Your answer: <strong>{{ q.userAnswer || 'No answer' }}</strong>
                    </p>
                     <p v-if="!q.isCorrect" class="text-muted-foreground">
                        Correct answer: <strong>{{ q.correctAnswer }}</strong>
                    </p>
                </div>

                <div class="mt-3 rounded-md bg-muted/80 p-3">
                    <h4 class="font-semibold text-primary">Explanation</h4>
                    <p class="text-muted-foreground">{{ q.explanation }}</p>
                </div>
            </div>
          </div>
           <Button @click="resetPractice" size="lg" variant="secondary" class="w-full mt-4">
              Reset and Practice Again
            </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
