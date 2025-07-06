<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these shadcn-vue components are globally available or imported from a components library
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, CheckCircle2, Award, BookOpen } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so we disable the default
})

// --- NAVIGATION ---
const router = useRouter()
const currentUnit = 10
function goToPreviousUnit() {
  if (currentUnit > 1) {
    router.push(`/units/grammar/${currentUnit - 1}`)
  }
}
function goToNextUnit() {
  router.push(`/units/grammar/${currentUnit + 1}`)
}

// --- STATE MANAGEMENT ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string>>({})

// --- QUESTION DATA STRUCTURE ---
// Inspired by Raymond Murphy's "English Grammar in Use", the questions target common pitfalls and subtle distinctions.
const questions = ref([
  {
    id: 'q1',
    type: 'multiple-choice',
    text: "Sarah couldn't call you because she ______ her phone at home.",
    options: ['hadn\'t got', 'didn\'t have', 'hasn\'t got'],
    correctAnswer: 'didn\'t have',
    explanation: 'For past actions or states, we use the simple past "had" or "didn\'t have". "Have got" is primarily used for the present tense. "Hadn\'t got" is grammatically awkward and rarely used in this context.',
  },
  {
    id: 'q2',
    type: 'fill-in-the-blank',
    text: "Excuse me, ______ you ______ a pen I could borrow?",
    correctAnswer: 'have you got', // Accepts 'do you have' as well in validation logic
    explanation: 'For questions about possession in the present, both "Have you got...?" (BrE) and "Do you have...?" (AmE/BrE) are correct. The structure "Have you got" uses "have" as the auxiliary verb.',
  },
  {
    id: 'q3',
    type: 'sentence-transformation',
    instruction: "Rewrite the following sentence using the 'have got' form. Keep the meaning the same.",
    text: "She doesn't have much free time.",
    correctAnswer: "she hasn't got much free time",
    explanation: 'The negative form "doesn\'t have" is equivalent to "hasn\'t got". Both are used to express a lack of possession or state in the present.',
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    text: "We usually ______ a big family dinner on Sundays. It's a tradition.",
    options: ['have got', 'have', 'are having'],
    correctAnswer: 'have',
    explanation: 'For repeated actions, habits, or routines (like having dinner), we use the simple present "have". "Have got" is incorrect for actions and refers to possession. "Are having" would imply a specific, ongoing event, not a general habit.',
  },
  {
    id: 'q5',
    type: 'spot-the-mistake',
    text: "I've got a shower every morning before I go to work.",
    correctAnswer: 'i have a shower',
    explanation: 'The mistake is using "I\'ve got" for a habitual action. "To have a shower" is an activity, not a possession. The correct form for routines is the simple present: "I have a shower".',
  },
  {
    id: 'q6',
    type: 'fill-in-the-blank',
    text: "Look at my new bike! It ______ ten gears and a very comfortable seat.",
    correctAnswer: 'has got', // Accepts 'has' as well
    explanation: 'To describe the features of something (a form of possession), both "has" and "has got" are perfectly acceptable and common.',
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    text: "A: 'What's wrong?' B: 'I ______ a terrible headache.'",
    options: ['have', 'have got', 'Both are correct'],
    correctAnswer: 'Both are correct',
    explanation: 'For illnesses, both "have" and "have got" are interchangeable and widely used. "I have a headache" and "I\'ve got a headache" mean the same thing.',
  },
  {
    id: 'q8',
    type: 'sentence-transformation',
    instruction: "Transform the question to use the 'do/does' form.",
    text: "Has he got any siblings?",
    correctAnswer: "does he have any siblings?",
    explanation: 'The question "Has he got...?" uses "have" as an auxiliary. The equivalent structure uses the auxiliary "do/does" with the base verb "have". Since the subject is "he", we use "does".'
  }
])

// --- VALIDATION & RESULTS LOGIC ---
const detailedResults = computed(() => {
  return questions.value.map(q => {
    const userAnswer = (userAnswers[q.id] || '').trim().toLowerCase().replace(/\s+/g, ' ')
    let isCorrect = false

    // Flexible validation for certain questions
    if (q.id === 'q2') {
      isCorrect = userAnswer === 'have you got' || userAnswer === 'do you have'
    } else if (q.id === 'q6') {
        isCorrect = userAnswer === 'has got' || userAnswer === 'has'
    } else if (q.id === 'q5') {
        isCorrect = userAnswer === 'i have a shower' || userAnswer === 'have a shower'
    } else {
      const correctAnswer = q.correctAnswer.toLowerCase().replace(/\s+/g, ' ')
      isCorrect = userAnswer === correctAnswer
    }

    return {
      ...q,
      userAnswer: userAnswers[q.id] || '— No answer —',
      isCorrect
    }
  })
})

const score = computed(() => {
  const correctCount = detailedResults.value.filter(r => r.isCorrect).length
  return Math.round((correctCount / questions.value.length) * 100)
})

const scoreFeedback = computed(() => {
  if (score.value === 100) return { title: "Perfect Score!", message: "Outstanding! You have a complete mastery of 'have' and 'have got'.", icon: Award, color: 'text-green-500' };
  if (score.value >= 75) return { title: "Excellent Work!", message: "You have a strong understanding of the nuances. Review the explanations for any missed questions to perfect your knowledge.", icon: CheckCircle2, color: 'text-green-500' };
  if (score.value >= 50) return { title: "Good Effort!", message: "A solid attempt. The distinction between possession and action can be tricky. Pay close attention to the explanations below.", icon: BookOpen, color: 'text-yellow-500' };
  return { title: "Needs Review", message: "This is a challenging topic. Go through the learning material and the explanations carefully. Practice makes perfect!", icon: AlertCircle, color: 'text-red-500' };
});

function checkAnswers() {
  showResult.value = true
  // Scroll to results for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('results-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

function retryTest() {
  showResult.value = false
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <GrammarLayout
    test-title="Intermediate English Grammar Practice"
    test-description="Based on 'English Grammar In Use' by Raymond Murphy"
    unit-title="Unit 10: Have and have got"
    unit-description="Understanding the use of 'have' and 'have got' for possession, relationships, illnesses, and actions."
    :categories="['Possession', 'Present Tense', 'Question Forms', 'Common Verbs']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: Learning Content                                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><BookOpen class="h-6 w-6 text-blue-500" /> Core Concepts: Possession & States</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p><strong class="font-semibold text-gray-800">'Have'</strong> and <strong class="font-semibold text-gray-800">'have got'</strong> are often interchangeable when talking about possession, relationships, or illnesses in the <strong class="text-blue-600">present tense</strong>.</p>
          <ul class="list-disc space-y-2 pl-5">
            <li>She <strong class="text-green-600">has</strong> a new car. <span class="text-muted-foreground">=</span> She<strong class="text-green-600">'s got</strong> a new car.</li>
            <li>They <strong class="text-green-600">have</strong> two children. <span class="text-muted-foreground">=</span> They<strong class="text-green-600">'ve got</strong> two children.</li>
            <li>I <strong class="text-green-600">have</strong> a headache. <span class="text-muted-foreground">=</span> I<strong class="text-green-600">'ve got</strong> a headache.</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><AlertCircle class="h-6 w-6 text-red-500" /> Critical Distinction: Actions vs. States</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>We use <strong class="font-semibold text-gray-800">'have' (but NOT 'have got')</strong> for actions and experiences.</p>
          <ul class="list-disc space-y-2 pl-5">
            <li><strong class="text-green-600">Correct:</strong> I <strong class="font-semibold">have breakfast</strong> at 7 am. (<em class="text-muted-foreground">Action</em>)</li>
            <li><strong class="text-red-600">Incorrect:</strong> <span class="line-through">I've got breakfast at 7 am.</span></li>
            <li><strong class="text-green-600">Correct:</strong> We <strong class="font-semibold">had a good time</strong> at the party. (<em class="text-muted-foreground">Experience</em>)</li>
            <li><strong class="text-red-600">Incorrect:</strong> <span class="line-through">We had got a good time...</span></li>
          </ul>
           <p class="pt-2 text-muted-foreground">Common 'have' expressions: <strong>have a bath/shower, have a rest, have lunch, have a dream, have a look.</strong></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2"><CheckCircle2 class="h-6 w-6 text-purple-500" /> Grammar Deep Dive: Tenses, Questions, and Negatives</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold">Past Tense</h4>
            <p>In the past, we only use <strong class="text-purple-600">had</strong>. 'Have got' is a present form.</p>
            <p class="mt-1"><strong class="text-green-600">Correct:</strong> When I was a child, I <strong class="font-semibold">had</strong> a dog.</p>
          </div>
          <Separator />
          <div>
            <h4 class="font-semibold">Questions & Negatives</h4>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <strong class="text-gray-800">'Have got' form:</strong>
                <ul class="mt-1 list-disc space-y-1 pl-5">
                  <li><strong class="text-green-600">Have you got</strong> a car?</li>
                  <li>He <strong class="text-red-600">hasn't got</strong> any money.</li>
                </ul>
              </div>
              <div>
                <strong class="text-gray-800">'Have' form (with do/does):</strong>
                <ul class="mt-1 list-disc space-y-1 pl-5">
                  <li><strong class="text-green-600">Do you have</strong> a car?</li>
                  <li>He <strong class="text-red-600">doesn't have</strong> any money.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice: Interactive Questions                                        -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Choose or type the most appropriate answer.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">{{ index + 1 }}. {{ question.text }}</p>
            
            <div v-if="question.type === 'multiple-choice'">
              <RadioGroup v-model="userAnswers[question.id]" :disabled="showResult">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <div v-if="question.type === 'fill-in-the-blank'">
                <Input 
                  v-model="userAnswers[question.id]" 
                  placeholder="Type your answer here..."
                  :disabled="showResult"
                />
            </div>
            
            <div v-if="question.type === 'sentence-transformation'">
              <p class="text-sm text-muted-foreground italic">"{{ question.instruction }}"</p>
              <Input
                v-model="userAnswers[question.id]"
                placeholder="Rewrite the sentence..."
                :disabled="showResult"
              />
            </div>

             <div v-if="question.type === 'spot-the-mistake'">
              <p class="text-sm text-muted-foreground italic">"Find the mistake and write the correct phrase."</p>
              <Input
                v-model="userAnswers[question.id]"
                placeholder="Type the correction..."
                :disabled="showResult"
              />
            </div>

          </div>

          <div class="flex justify-end pt-4">
            <Button v-if="!showResult" size="lg" @click="checkAnswers">Check Answers</Button>
            <Button v-else size="lg" variant="outline" @click="retryTest">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result: Detailed Feedback and Score                                    -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <div class="flex items-center gap-4 pt-4">
            <div class="w-full">
              <div class="flex justify-between">
                  <div class="flex items-center gap-2" :class="scoreFeedback.color">
                      <component :is="scoreFeedback.icon" class="h-6 w-6" />
                      <p class="font-bold">{{ scoreFeedback.title }}</p>
                  </div>
                  <p class="font-bold text-lg">{{ score }}%</p>
              </div>
              <Progress :model-value="score" class="mt-2" />
              <p class="text-sm text-muted-foreground mt-1">{{ scoreFeedback.message }}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent class="space-y-6">
          <Separator />
          <div v-for="(result, index) in detailedResults" :key="result.id">
            <div class="flex items-start gap-4">
              <span class="text-lg font-bold" :class="result.isCorrect ? 'text-green-500' : 'text-red-500'">{{ index + 1 }}</span>
              <div class="flex-1">
                <p class="font-semibold">{{ result.text }}</p>
                <div class="mt-2 space-y-1 rounded-md border p-3 text-sm">
                  <div class="flex items-center gap-2">
                    <strong class="w-[110px] shrink-0">Your Answer:</strong>
                    <span :class="result.isCorrect ? 'text-green-700' : 'text-red-700 font-medium'">{{ result.userAnswer }}</span>
                    <component :is="result.isCorrect ? CheckCircle2 : AlertCircle" class="ml-auto h-5 w-5" :class="result.isCorrect ? 'text-green-500' : 'text-red-500'" />
                  </div>
                  <div v-if="!result.isCorrect" class="flex items-center gap-2">
                    <strong class="w-[110px] shrink-0">Correct Answer:</strong>
                    <span class="font-medium text-blue-700">{{ result.correctAnswer }}</span>
                  </div>
                </div>
                <div class="mt-2 rounded-md bg-muted/50 p-3 text-sm">
                  <p><strong class="font-semibold text-blue-800">Explanation:</strong> {{ result.explanation }}</p>
                </div>
              </div>
            </div>
             <Separator v-if="index < detailedResults.length - 1" class="mt-6" />
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
