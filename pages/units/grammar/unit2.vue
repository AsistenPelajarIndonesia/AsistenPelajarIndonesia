<!--
  File: @/pages/units/grammar/2.vue
  Description: A deep-dive practice module for Unit 2, based on Raymond Murphy's "English Grammar In Use".
  This page challenges students with nuanced scenarios distinguishing the Present Continuous and Present Simple,
  offering detailed, insightful feedback to foster a genuine understanding of English tense and aspect.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component UI (Assumed to be globally available or imported as needed) ---
// These are illustrative and would be your actual UI components e.g., from shadcn-vue.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-vue-next'

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigate to the preceding unit page
  router.push("/units/grammar/1")
}
function goToNextUnit() {
  // Navigate to the subsequent unit page
  router.push("/units/grammar/3")
}

// --- Page & Unit Metadata ---
const testTitle = "Core English Tenses: Foundation"
const testDescription = "Mastering the fundamental distinction between actions in progress and states of being."
const unitTitle = "Unit 2: Present continuous (I am doing) and Present simple (I do)"
const unitDescription = "An advanced exploration of the two most essential present tenses. This unit moves beyond basic rules to focus on context, perspective, and the speaker's intent."
const categories = ["Present Tense", "Aspect", "Continuous vs. Simple", "State Verbs", "Contextual Usage"]

// --- Reactive State Management ---
const isSubmitted = ref(false)
const userAnswers = ref<string[]>(['', '', '', '', '', '']) // Initialize based on number of inputs required

interface Question {
  id: number;
  type: 'fill-in' | 'correction' | 'dialogue';
  prompt: string;
  parts?: { verb: string; placeholder: string; }[];
  correctAnswers: string[];
}

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'dialogue',
    prompt: "Complete the conversation. The context shifts from an immediate activity to a general opinion.",
    parts: [
      { verb: 'think', placeholder: 'What you ______ about?' },
      { verb: 'think', placeholder: 'I just ______ you can\'t rely on it.' }
    ],
    correctAnswers: ['are you thinking', 'think'],
  },
  {
    id: 2,
    type: 'fill-in',
    prompt: "This paragraph describes a global trend versus a resulting factual state. Use the correct tense for each verb.",
    parts: [
      { verb: 'increase', placeholder: 'The world\'s population ______ rapidly.' },
      { verb: 'pose', placeholder: 'This trend ______ a significant challenge.' }
    ],
    correctAnswers: ['is increasing', 'poses'],
  },
  {
    id: 3,
    type: 'correction',
    prompt: "Correct the grammatical error in the student's sentence. Focus on the nature of the verb 'believe'.",
    parts: [
      { verb: 'I am not believing a word he says.', placeholder: 'Correct the first part of the sentence.' }
    ],
    correctAnswers: ['i do not believe', 'i don’t believe'],
  },
  {
    id: 4,
    type: 'fill-in',
    prompt: "This classic scenario tests the difference between a dynamic action (tasting) and an inherent quality (taste).",
    parts: [
      { verb: 'taste', placeholder: 'The chef ______ the soup right now.' },
      { verb: 'taste', placeholder: 'The soup ______ a bit too salty.' }
    ],
    correctAnswers: ['is tasting', 'tastes'],
  },
  {
    id: 5,
    type: 'dialogue',
    prompt: "Expressing annoyance about a frequent, irritating habit requires a special structure with the Present Continuous.",
    parts: [
      { verb: 'always / leave', placeholder: 'My roommate ______ his wet towel on the bed. It drives me crazy!' }
    ],
    correctAnswers: ['is always leaving'],
  },
]);

// --- Validation and Scoring Logic ---
interface Result {
  id: number;
  questionPrompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

const results = ref<Result[]>([])
const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / results.value.length) * 100)
})

function checkAnswers() {
  const newResults: Result[] = []
  let answerIndex = 0

  questions.value.forEach(question => {
    question.correctAnswers.forEach((correctAnswer, i) => {
      const userAnswer = userAnswers.value[answerIndex]?.trim().toLowerCase() || ''
      const isCorrect = correctAnswer.split(' / ').includes(userAnswer)
      
      let explanation = ''
      if (isCorrect) {
        explanation = getCorrectExplanation(question.id, i)
      } else {
        explanation = getIncorrectExplanation(question.id, i)
      }

      newResults.push({
        id: question.id,
        questionPrompt: question.parts ? question.parts[i].placeholder : question.prompt,
        userAnswer: userAnswers.value[answerIndex] || '[No Answer]',
        correctAnswer: correctAnswer.split(' / ')[0].charAt(0).toUpperCase() + correctAnswer.split(' / ')[0].slice(1),
        isCorrect: isCorrect,
        explanation: explanation,
      })
      answerIndex++
    })
  })
  
  results.value = newResults
  isSubmitted.value = true
  // Scroll to results section for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function getCorrectExplanation(questionId: number, partIndex: number): string {
  const explanations: { [key: number]: string[] } = {
    1: [
      "Perfect. 'Are you thinking' is used for the mental activity happening *right now*. You correctly identified the focus on an ongoing, temporary process.",
      "Excellent. 'I think' expresses a general, stable opinion or belief—a mental state, not an action in progress. You've mastered the state vs. action distinction for 'think'."
    ],
    2: [
      "Correct. 'Is increasing' perfectly captures the idea of a developing situation or a trend that is happening over a long period 'around now'. It's not finished.",
      "Spot on. 'Poses' is in the present simple because the trend, as a fact, presents a permanent or long-term challenge. It's a statement of truth about the situation."
    ],
    3: [
      "Precisely. 'Believe' is a stative verb. It describes a state of mind, not an action. Therefore, it's not typically used in the continuous form. 'I do not believe' is the correct way to express this state."
    ],
    4: [
      "Correct. 'Is tasting' describes the dynamic, physical action of the chef sampling the soup at this moment.",
      "Perfect. 'Tastes' describes the inherent, unchanging quality or characteristic of the soup itself. A key distinction for perception verbs."
    ],
    5: [
      "Exactly. The structure 'be + always + -ing' is used specifically to express annoyance at a repeated, irritating habit. You've correctly applied this special contextual rule."
    ]
  };
  return explanations[questionId][partIndex];
}

function getIncorrectExplanation(questionId: number, partIndex: number): string {
    const explanations: { [key: number]: string[] } = {
    1: [
      "Not quite. The question 'What are you thinking about?' asks about the specific thoughts inside someone's head *at this moment*. Using the simple form ('do you think') would ask about their general opinion-forming habits, which doesn't fit the context.",
      "This part requires the Present Simple. When 'think' means 'believe' or 'have an opinion', it's a state verb. The speaker is stating their fixed opinion about the bus service, not actively performing the process of thinking right now. The correct form is 'I think'."
    ],
    2: [
      "The better choice here is 'is increasing'. While 'increases' can be used for facts, the Present Continuous better emphasizes that this is an ongoing, developing trend happening around the present time. Think of it as a movie, not just a snapshot.",
      "Here, we need the Present Simple. The trend itself 'poses' a challenge—this is a fact resulting from the trend. 'Is posing' would imply it's a temporary action, but this challenge is a direct and continuous consequence, best described as a state."
    ],
    3: [
      "The verb 'believe' is a stative (state) verb, meaning it describes a state of being, not an action. We cannot 'be believing' something. The correct form to express this state is the Present Simple: 'I do not believe' or 'I don't believe'."
    ],
    4: [
      "In this context, we need to describe the *action* the chef is performing. The Present Continuous 'is tasting' shows this active process. 'Tastes' (Present Simple) would describe the soup's quality, not the chef's action.",
      "This blank describes the soup's inherent quality—its characteristic flavor. For this, we use the Present Simple: 'tastes'. 'Is tasting' would imply the soup itself is actively performing an action, which is illogical."
    ],
    5: [
      "While 'always leaves' is grammatically correct for a habit, it lacks the emotional color of annoyance. To complain about a repeated, irritating action, English speakers use a special construction: Present Continuous + always. So, 'is always leaving' is the most natural and contextually appropriate answer."
    ]
  };
  return explanations[questionId][partIndex];
}

function retryTest() {
  isSubmitted.value = false;
  userAnswers.value.fill('');
  results.value = [];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Material - The Core Concepts and Explanations                     -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Lightbulb class="h-6 w-6 text-yellow-500" />
            <span>The Teacher's Perspective: Lens Analogy</span>
          </CardTitle>
          <CardDescription>
            Forget rules. Think about what you want to show your listener. Are you zooming in on an action or zooming out to see the whole picture?
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 text-base">
          <div>
            <h4 class="font-semibold text-lg text-blue-600">Present Continuous: The 'Zoomed-In' Lens</h4>
            <p class="mt-1 text-muted-foreground">Use this when you put a frame around an action, event, or situation. You are highlighting that it is **in progress**, **temporary**, or **developing**.</p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li><strong>Actions happening now:</strong> "The chef <span class="font-bold">is chopping</span> vegetables." (We see the action unfolding).</li>
              <li><strong>Temporary situations:</strong> "I <span class="font-bold">am living</span> with my parents until my new flat is ready." (Not a permanent state).</li>
              <li><strong>Developing trends:</strong> "The climate <span class="font-bold">is getting</span> warmer." (A change in progress over a long time).</li>
              <li><strong>Annoying habits:</strong> "He <span class="font-bold">is always using</span> my mug!" (Highlights the emotional reaction to a repeated action).</li>
            </ul>
          </div>
          <hr/>
          <div>
            <h4 class="font-semibold text-lg text-purple-600">Present Simple: The 'Zoomed-Out' Lens</h4>
            <p class="mt-1 text-muted-foreground">Use this when you are stating a **fact**, a **habit**, a **universal truth**, or something that happens on a **schedule**. It's about existence, not progression.</p>
            <ul class="mt-2 ml-4 list-disc space-y-1">
              <li><strong>Habits & Routines:</strong> "I <span class="font-bold">drink</span> two coffees every morning." (A repeated, factual part of my life).</li>
              <li><strong>Permanent Truths:</strong> "Water <span class="font-bold">boils</span> at 100°C." (A scientific fact).</li>
              <li><strong>States (not actions):</strong> "She <span class="font-bold">seems</span> happy. I <span class="font-bold">believe</span> her." (Describes a state of being or mind with stative verbs: like, love, know, believe, seem, taste, etc.).</li>
              <li><strong>Schedules & Timetables:</strong> "The train <span class="font-bold">leaves</span> at 9 AM tomorrow." (A fixed, scheduled event).</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Practice - The Interactive Questions                              -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="shadow-md">
        <CardHeader>
          <CardTitle>Challenge Exercises</CardTitle>
          <CardDescription>Analyze the context carefully before answering. Precision is key.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, qIndex) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ qIndex + 1 }}. {{ question.prompt }}</p>
            <div v-if="question.type === 'dialogue'" class="ml-4 p-4 border-l-4 space-y-4">
              <div class="flex items-center gap-2">
                <span class="font-serif font-bold text-lg">A:</span>
                <Input v-model="userAnswers[qIndex * 2]" :placeholder="question.parts![0].placeholder" :disabled="isSubmitted" />
              </div>
              <div class="flex items-center gap-2">
                <span class="font-serif font-bold text-lg">B:</span>
                <Input v-model="userAnswers[qIndex * 2 + 1]" :placeholder="question.parts![1].placeholder" :disabled="isSubmitted" />
              </div>
            </div>
            <div v-else-if="question.type === 'correction'" class="ml-4">
               <p class="italic text-muted-foreground bg-red-50 border border-red-200 p-2 rounded">"{{ question.parts![0].verb }}"</p>
               <Input v-model="userAnswers[4]" class="mt-2" :placeholder="question.parts![0].placeholder" :disabled="isSubmitted" />
            </div>
             <div v-else-if="question.id === 5" class="ml-4">
                <Input v-model="userAnswers[5]" :placeholder="question.parts![0].placeholder" :disabled="isSubmitted" />
            </div>
            <div v-else class="space-y-3 ml-4">
              <Input v-for="(part, pIndex) in question.parts" :key="pIndex" v-model="userAnswers[(qIndex-1) * 2 + pIndex + (question.id === 4 ? 1 : 0)]" :placeholder="part.placeholder" :disabled="isSubmitted" />
            </div>
          </div>

          <Button v-if="!isSubmitted" @click="checkAnswers" size="lg" class="w-full">
            Check My Answers
          </Button>
          <Button v-else @click="retryTest" size="lg" variant="secondary" class="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: Result - Detailed Feedback and Score                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card class="shadow-lg animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>Review your results below. Understanding *why* is the path to mastery.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-center gap-4 rounded-lg bg-muted p-4">
              <div class="text-center">
                <p class="text-sm font-medium text-muted-foreground">Your Score</p>
                <p class="text-5xl font-bold tracking-tighter" :class="score > 70 ? 'text-green-600' : 'text-orange-500'">{{ score }}%</p>
              </div>
              <div class="w-full">
                 <Progress :model-value="score" />
                 <p class="text-xs text-muted-foreground mt-2">{{ results.filter(r => r.isCorrect).length }} out of {{ results.length }} correct</p>
              </div>
            </div>

            <div class="space-y-4">
              <Alert
                v-for="(result, index) in results"
                :key="index"
                :variant="result.isCorrect ? 'default' : 'destructive'"
                class="transition-all duration-300"
              >
                <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
                <div class="ml-2">
                  <AlertTitle class="font-bold">
                    Question: "{{ result.questionPrompt }}"
                  </AlertTitle>
                  <AlertDescription>
                    <p>Your answer: <span class="font-mono p-1 rounded bg-secondary">{{ result.userAnswer }}</span></p>
                    <p v-if="!result.isCorrect">Correct answer: <span class="font-mono p-1 rounded bg-green-100 dark:bg-green-900">{{ result.correctAnswer }}</span></p>
                    <hr class="my-2" />
                    <p class="text-sm"><strong>Explanation:</strong> {{ result.explanation }}</p>
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Simple fade transition for the results block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
