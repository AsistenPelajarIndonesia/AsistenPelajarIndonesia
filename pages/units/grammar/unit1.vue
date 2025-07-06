<!--
  File: @/pages/units/grammar/1.vue
  Description: An advanced, interactive grammar practice page for Unit 1: Present Simple (I do).
  This page utilizes the GrammarLayout and provides in-depth learning material, challenging exercises,
  and a sophisticated validation system with detailed feedback, inspired by the pedagogical principles
  found in Raymond Murphy's "English Grammar In Use".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are globally registered or available for import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

const router = useRouter()

// --- Unit Navigation ---
function goToPreviousUnit() {
  // In a real application, this would navigate to a unit index or be disabled.
  // For this example, we'll just log it as there is no Unit 0.
  console.log("Attempted to go to previous unit from Unit 1.")
  // router.push("/units/grammar/index") 
}

function goToNextUnit() {
  router.push("/units/grammar/2")
}


// --- Unit Data & State Management ---
const unitData = {
  unitNumber: 1,
  title: "Present simple (I do)",
  description: "Understanding and using the present simple tense for habits, facts, states, and scheduled events.",
  categories: ["Tenses", "Present", "A1/A2 Level"],
  learningMaterial: [
    {
      title: "A. The Form of the Present Simple",
      content: [
        "The present simple is the base form of the verb. We add '-s' for the third person singular (he/she/it).",
        "**Positive:** I/you/we/they work. | He/she/it work**s**.",
        "**Negative:** I/you/we/they **do not** (don't) work. | He/she/it **does not** (doesn't) work.",
        "**Question:** **Do** I/you/we/they work? | **Does** he/she/it work?",
      ],
    },
    {
      title: "B. Use 1: Habits and Repeated Actions",
      content: [
        "We use the present simple to talk about things that happen repeatedly or are part of a routine. We often use adverbs of frequency (always, often, usually, sometimes, rarely, never) and expressions like 'every day' or 'twice a week'.",
        "Example: 'I **get up** at 7 AM every morning.'",
        "Example: 'She **usually calls** her parents on weekends.'",
        "Example: 'It **doesn't rain** very often in the desert.'",
      ],
    },
    {
      title: "C. Use 2: General Truths and Scientific Facts",
      content: [
        "This tense is used for things that are always or generally true.",
        "Example: 'The Earth **revolves** around the Sun.'",
        "Example: 'Water **boils** at 100 degrees Celsius.'",
        "Example: 'Lions **live** in Africa.'",
      ],
    },
    {
      title: "D. Use 3: States, Senses, and Feelings (Stative Verbs)",
      content: [
        "Some verbs describe states, not actions. These 'stative verbs' are generally not used in continuous tenses. Common stative verbs include: *like, love, hate, want, need, prefer, know, realize, suppose, mean, understand, believe, remember, seem, see, hear, taste, smell, own, belong to*.",
        "Correct: 'I **understand** the question.' (Not: 'I am understanding')",
        "Correct: 'This perfume **smells** wonderful.' (Not: 'is smelling')",
        "Tricky: Some verbs can be both stative and dynamic. 'I **think** this is a good idea' (opinion) vs. 'What are you **thinking** about?' (action of thinking).",
      ],
    },
     {
      title: "E. Use 4: Timetables and Schedules (Future Meaning)",
      content: [
        "We use the present simple to talk about future events that are part of an official schedule or timetable.",
        "Example: 'Our flight **leaves** at 9:00 tomorrow morning.'",
        "Example: 'The conference **starts** next Monday.'",
        "Example: 'What time **does** the film **begin** tonight?'",
      ],
    },
  ],
  questions: [
    {
      id: 1,
      type: 'fill-in-the-blank',
      questionText: "My colleague is very diligent. She always __________ (finish) her work before she __________ (go) home.",
      correctAnswer: ["finishes", "goes"],
      explanation: "For the third person singular ('she'), we add '-es' to verbs ending in '-sh' (finishes) and '-o' (goes). The sentence describes a habit, which is a key use of the present simple."
    },
    {
      id: 2,
      type: 'multiple-choice',
      questionText: "Look at the timetable. The express train to Manchester _______ at 10:30 AM from Platform 4.",
      options: ["is leaving", "will leave", "leaves"],
      correctAnswer: "leaves",
      explanation: "We use the present simple for future events that are part of a fixed schedule or timetable. 'is leaving' (present continuous) would be for a personal arrangement, and 'will leave' is a general prediction or decision."
    },
    {
      id: 3,
      type: 'sentence-correction',
      questionText: "Why he doesn't understand the instructions? They seem clear to me.",
      correctAnswer: "Why doesn't he understand",
      explanation: "In questions with 'wh-' words, the word order is: Wh-word + auxiliary verb (do/does) + subject + main verb. The correct structure is 'Why doesn't he understand...?'"
    },
    {
      id: 4,
      type: 'multiple-choice',
      questionText: "I'm sorry, I can't talk now. I _______ about a complex problem.",
      options: ["think", "am thinking", "thinks"],
      correctAnswer: "am thinking",
      explanation: "This is a tricky one! While 'think' is often a stative verb (e.g., 'I think it's a good idea'), here it describes the *action* or *process* of thinking happening right now. In this context, it's a dynamic verb and the present continuous is correct."
    },
    {
      id: 5,
      type: 'fill-in-the-blank',
      questionText: "Water is essential for life. It __________ (consist) of hydrogen and oxygen, and it __________ (not / have) any taste in its pure form.",
      correctAnswer: ["consists", "doesn't have"],
      explanation: "Both parts of this sentence describe general scientific facts. 'Consist' is a stative verb and takes '-s' for the third person singular ('it'). The negative form for 'it' is 'does not' or 'doesn't' + base verb ('have')."
    },
     {
      id: 6,
      type: 'sentence-correction',
      questionText: "My parents are living in London; they were born there and have never lived anywhere else.",
      correctAnswer: "My parents live in London",
      explanation: "Although 'are living' can be used for temporary situations, the context 'they were born there and have never lived anywhere else' indicates a permanent state. For permanent situations and facts, the present simple ('live') is the correct choice."
    },
  ]
}

// --- Reactive State ---
const userAnswers = ref(
  unitData.questions.reduce((acc, q) => {
    if (q.type === 'fill-in-the-blank') {
      acc[q.id] = Array(q.correctAnswer.length).fill('');
    } else {
      acc[q.id] = '';
    }
    return acc;
  }, {})
);

const showResult = ref(false)

// --- Computed Properties for Validation ---
const results = computed(() => {
  if (!showResult.value) return []
  return unitData.questions.map(q => {
    const userAnswer = userAnswers.value[q.id]
    let isCorrect = false;
    
    if (q.type === 'fill-in-the-blank') {
      isCorrect = Array.isArray(userAnswer) && Array.isArray(q.correctAnswer) &&
                  userAnswer.length === q.correctAnswer.length &&
                  userAnswer.every((ans, i) => ans.trim().toLowerCase() === q.correctAnswer[i].toLowerCase());
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.toLowerCase();
    }
    
    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })
})

const score = computed(() => {
  if (!results.value.length) return 0
  const correctCount = results.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / unitData.questions.length) * 100)
})

const scoreColor = computed(() => {
    if (score.value >= 80) return 'text-green-500';
    if (score.value >= 50) return 'text-yellow-500';
    return 'text-red-500';
});


// --- Methods ---
function checkAnswers() {
  showResult.value = true
  // Scroll to the results section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

function resetPractice() {
  userAnswers.value = unitData.questions.reduce((acc, q) => {
    if (q.type === 'fill-in-the-blank') {
      acc[q.id] = Array(q.correctAnswer.length).fill('');
    } else {
      acc[q.id] = '';
    }
    return acc;
  }, {});
  showResult.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <GrammarLayout
    :test-title="`English Grammar In Use - Practice`"
    :test-description="`Based on the methodology by Raymond Murphy`"
    :unit-title="`Unit ${unitData.unitNumber}: ${unitData.title}`"
    :unit-description="unitData.description"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Learning Material Slot                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(section, index) in unitData.learningMaterial" :key="`material-${index}`">
        <CardHeader>
          <CardTitle class="text-base font-semibold">{{ section.title }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm text-muted-foreground">
          <p v-for="(paragraph, pIndex) in section.content" :key="`p-${pIndex}`" v-html="paragraph"></p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Practice Questions Slot                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
          <CardDescription>
            Complete the exercises below. Your answers will be checked once you click 'Check Answers'.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in unitData.questions" :key="question.id" class="space-y-3">
            <Label :for="`q-${question.id}`" class="flex items-start gap-2">
              <span class="font-bold text-primary">{{ index + 1 }}.</span>
              <span v-html="question.questionText.replace(/__________/g, '...')"></span>
            </Label>
            
            <!-- Fill-in-the-blank Input -->
            <div v-if="question.type === 'fill-in-the-blank'" class="flex flex-wrap gap-4 pl-6">
              <div v-for="(_, i) in question.correctAnswer" :key="`input-${question.id}-${i}`">
                <Input
                  :id="`q-${question.id}-${i}`"
                  v-model="userAnswers[question.id][i]"
                  class="w-40"
                  :disabled="showResult"
                  @keyup.enter="checkAnswers"
                />
              </div>
            </div>

            <!-- Multiple-choice Input -->
            <RadioGroup 
              v-if="question.type === 'multiple-choice'"
              v-model="userAnswers[question.id]"
              :id="`q-${question.id}`"
              :disabled="showResult"
              class="space-y-2 pl-6"
            >
              <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                <Label :for="`${question.id}-${option}`" class="font-normal">{{ option }}</Label>
              </div>
            </RadioGroup>

            <!-- Sentence-correction Input -->
             <div v-if="question.type === 'sentence-correction'" class="pl-6">
              <Input
                :id="`q-${question.id}`"
                v-model="userAnswers[question.id]"
                placeholder="Type the corrected part here"
                class="w-full md:w-2/3"
                :disabled="showResult"
                @keyup.enter="checkAnswers"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" @click="checkAnswers" class="w-full md:w-auto">Check Answers</Button>
          <Button v-else @click="resetPractice" variant="secondary" class="w-full md:w-auto">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- Results Slot                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Review your performance and read the explanations to improve.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Score Summary -->
            <div class="flex flex-col items-center gap-4 rounded-lg border p-6">
              <h3 class="text-lg font-medium">Total Score</h3>
              <p class="text-5xl font-bold" :class="scoreColor">{{ score }}%</p>
              <Progress :model-value="score" class="w-full" />
              <p class="text-sm text-muted-foreground">
                You answered {{ results.filter(r => r.isCorrect).length }} out of {{ unitData.questions.length }} questions correctly.
              </p>
            </div>
            
            <!-- Detailed Feedback -->
            <div class="space-y-4">
               <h3 class="text-lg font-medium">Detailed Breakdown</h3>
              <div v-for="(result, index) in results" :key="`result-${result.id}`">
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="border-l-4" :class="result.isCorrect ? 'border-green-500' : 'border-red-500'">
                  <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" :class="result.isCorrect ? 'text-green-600' : 'text-red-600'" />
                  <AlertTitle class="flex items-center justify-between">
                     <span>Question {{ index + 1 }} - {{ result.isCorrect ? 'Correct' : 'Incorrect' }}</span>
                  </AlertTitle>
                  <AlertDescription class="mt-2 space-y-3">
                    <p class="font-mono text-sm rounded bg-muted p-3" v-html="result.questionText.replace(/__________/g, '...')"></p>
                    <div class="grid grid-cols-1 gap-2 text-xs md:grid-cols-2 md:text-sm">
                      <div v-if="result.type === 'fill-in-the-blank'">
                        <p><strong>Your Answer:</strong> <span class="font-semibold text-foreground">{{ result.userAnswer.join(', ') || '""' }}</span></p>
                        <p v-if="!result.isCorrect"><strong>Correct Answer:</strong> <span class="font-semibold text-green-600">{{ result.correctAnswer.join(', ') }}</span></p>
                      </div>
                      <div v-else>
                        <p><strong>Your Answer:</strong> <span class="font-semibold text-foreground">{{ result.userAnswer || '""' }}</span></p>
                         <p v-if="!result.isCorrect"><strong>Correct Answer:</strong> <span class="font-semibold text-green-600">{{ result.correctAnswer }}</span></p>
                      </div>
                    </div>
                    <div v-if="!result.isCorrect" class="mt-3 flex items-start gap-3 rounded-md border bg-background p-3">
                      <HelpCircle class="h-5 w-5 flex-shrink-0 text-sky-600" />
                      <div>
                        <h4 class="font-semibold">Explanation</h4>
                        <p class="text-muted-foreground">{{ result.explanation }}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <Button @click="resetPractice" variant="secondary" class="w-full md:w-auto">Practice Again</Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Add a subtle transition for the results appearing */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
