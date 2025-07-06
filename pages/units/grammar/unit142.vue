<!--
  File: @/pages/units/grammar/35.vue
  Unit: 35 - Phrasal Verbs 7: Up (1)
  Description: An advanced practice module for English students focusing on the multifaceted phrasal verb particle 'up'.
  This page integrates learning materials and challenging exercises with an intelligent validation system.
-->
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

// --- Component Imports ---
// Layout
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// UI Components (assuming a library like shadcn-vue)
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page Meta Configuration ---
definePageMeta({
  layout: false, // We will use the GrammarLayout component directly
})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push('/units/grammar/34') // Navigate to the preceding unit
}
function goToNextUnit() {
  router.push('/units/grammar/36') // Navigate to the subsequent unit
}

// --- Unit Content & Data ---
// This object encapsulates all the pedagogical content for the unit.
const unitData = {
  testTitle: 'English Grammar In Use: Advanced Practice',
  testDescription: 'Based on the methodologies of Raymond Murphy',
  unit: 35,
  unitTitle: 'Phrasal Verbs 7: Up (1)',
  unitDescription: 'This unit explores the versatile particle \'up\' in phrasal verbs, focusing on its common meanings such as completion, destruction, improvement, and appearance. Mastery of these nuances is essential for fluent, natural-sounding English.',
  categories: ['Phrasal Verbs', 'Advanced Vocabulary', 'C1/C2 Level'],
  
  // --- Learning Material ---
  // Inspired by the clear, categorized approach of "English Grammar in Use".
  material: [
    {
      title: 'A. Meaning: Completion or Finality',
      explanation: 'The particle \'up\' is frequently used to add a sense of completeness or finality to an action. The action is not just performed, but performed to its conclusion.',
      examples: [
        { sentence: 'Could you drink up your coffee? We need to leave.', meaning: '(Finish your coffee completely)' },
        { sentence: 'She wrote a long report and used up three pens.', meaning: '(Used the pens until they had no more ink)' },
        { sentence: 'Please fill up the car with petrol before our trip.', meaning: '(Fill the tank completely)' },
        { sentence: 'He spent two hours tidying up his room.', meaning: '(Making it completely tidy)' },
      ],
    },
    {
      title: 'B. Meaning: Destruction, Division, or Damage',
      explanation: 'Another common use of \'up\' is to signify breaking something into smaller pieces, or causing significant damage.',
      examples: [
        { sentence: 'He got so angry he tore up the contract.', meaning: '(Tore it into many pieces)' },
        { sentence: 'The old factory is scheduled to be blown up next year.', meaning: '(Destroyed by an explosion)' },
        { sentence: 'She cut up the vegetables for the soup.', meaning: '(Cut them into small pieces)' },
        { sentence: 'Their marriage broke up after only six months.', meaning: '(Ended/separated permanently)' },
      ],
    },
    {
      title: 'C. Meaning: Improvement or Increase',
      explanation: '\'Up\' can also indicate an increase in volume, speed, or quality, or a general improvement in state.',
      examples: [
        { sentence: 'Could you speak up a little? I can\'t hear you at the back.', meaning: '(Speak more loudly)' },
        { sentence: 'The economy is finally looking up.', meaning: '(Improving)' },
        { sentence: 'We need to smarten up the proposal before presenting it.', meaning: '(Improve its quality/appearance)' },
        { sentence: 'Cheer up! Things will get better soon.', meaning: '(Become happier)' },
      ],
    },
    {
      title: 'D. Meaning: Appearance or Arrival',
      explanation: 'Finally, \'up\' is used in phrasal verbs related to someone or something arriving or appearing, often unexpectedly.',
      examples: [
        { sentence: 'We arranged to meet at 7:30, but he never turned up.', meaning: '(He never arrived/appeared)' },
        { sentence: 'A new problem has shown up that we need to address.', meaning: '(A new problem has appeared)' },
        { sentence: 'He showed up at the party without an invitation.', meaning: '(He arrived uninvited)' },
      ],
    },
  ],

  // --- Practice Questions ---
  // A mix of challenging question types to test deep understanding.
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      questionText: 'The new regulations have ______ a lot of unexpected bureaucracy, delaying the project significantly.',
      options: ['blown up', 'shown up', 'thrown up', 'looked up'],
      correctAnswer: 'thrown up',
      explanation: 'While "shown up" means to appear, "thrown up" specifically means to produce something new or unexpected, often a problem or a difficulty. It fits the context of "bureaucracy" perfectly. "Blown up" means to explode, and "looked up" means to improve.'
    },
    {
      id: 2,
      type: 'fill-in-the-blank',
      questionText: 'After hours of fruitless negotiations, the CEO angrily _______ the agreement in front of everyone.',
      prompt: 'Use a phrasal verb meaning "tore into pieces".',
      correctAnswer: 'tore up',
      explanation: 'The correct phrasal verb is "tore up", which means to rip something into pieces, often out of anger or frustration. Note the past tense "tore". "Torn up" would also be grammatically possible in a passive or perfect tense construction, but "tore up" is the most direct active past tense answer.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      questionText: 'I’ve been waiting for an hour. I don’t think Sarah is going to _______.',
      options: ['show up', 'turn up', 'cheer up', 'Both A and B are correct'],
      correctAnswer: 'Both A and B are correct',
      explanation: '"Show up" and "turn up" are largely synonymous in this context, both meaning "to arrive" or "to appear", especially when expected. This question tests the recognition of synonyms. "Cheer up" means to become happier.'
    },
    {
      id: 4,
      type: 'fill-in-the-blank',
      questionText: 'We need to _______ a convincing alibi before the police question us.',
      prompt: 'Use a phrasal verb meaning "to invent or create".',
      correctAnswer: 'cook up',
      explanation: '"Cook up" is an idiomatic phrasal verb meaning to invent a story, a plan, or an excuse, often a dishonest one. While not explicitly in the material, it tests the student\'s broader knowledge. "Make up" is a more common synonym, but "cook up" implies more elaborate invention.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      questionText: 'The artist spent a month _______ her small studio into a vibrant exhibition space.',
      options: ['doing up', 'breaking up', 'using up', 'speaking up'],
      correctAnswer: 'doing up',
      explanation: '"Doing up" means to renovate, redecorate, or improve a building or room. It fits the context of transforming a studio. "Breaking up" means to separate, "using up" means to consume completely, and "speaking up" means to talk louder.'
    },
    {
      id: 6,
      type: 'fill-in-the-blank',
      questionText: 'All the tickets for the concert were _______ within an hour of going on sale.',
      prompt: 'Use a phrasal verb meaning "bought completely".',
      correctAnswer: 'snapped up',
      explanation: '"Snapped up" is a very common and natural phrasal verb meaning to buy something quickly, usually because it\'s popular or a bargain. "Bought up" is also correct but "snapped up" conveys the speed and eagerness more effectively.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      questionText: 'After a long, cold winter, the city’s economy is finally starting to _______.',
      options: ['blow up', 'look up', 'end up', 'tear up'],
      correctAnswer: 'look up',
      explanation: '"Things are looking up" is a common idiom that means a situation is improving. "Blow up" (explode), "end up" (finish in a particular state), and "tear up" (rip into pieces) are all contextually incorrect.'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      questionText: 'The children were told to _______ their toys before they could have dessert.',
      prompt: 'Use a phrasal verb meaning "to tidy".',
      correctAnswer: 'tidy up',
      explanation: '"Tidy up" or "clear up" would be correct here. It means to make a place neat by putting things in their proper place. The particle "up" adds the sense of completion to the act of tidying.'
    }
  ]
}

// --- Reactive State & Logic ---
const showResult = ref(false)
const userAnswers = reactive<Record<number, string>>({})

// Initialize userAnswers
unitData.questions.forEach(q => {
  userAnswers[q.id] = ''
})

const isQuizComplete = computed(() => {
  return unitData.questions.every(q => userAnswers[q.id]?.trim() !== '')
})

const results = computed(() => {
  if (!showResult.value) return []
  return unitData.questions.map(question => {
    const userAnswer = userAnswers[question.id]?.trim().toLowerCase() || 'No answer'
    const correctAnswer = question.correctAnswer.toLowerCase()
    
    // For fill-in-the-blanks, sometimes there are multiple possibilities
    const isCorrect = correctAnswer.split(' or ').some(ans => ans.trim() === userAnswer)

    return {
      ...question,
      userAnswer: userAnswers[question.id] || 'No answer',
      isCorrect
    }
  })
})

const score = computed(() => {
  return results.value.filter(r => r.isCorrect).length
})

const scorePercentage = computed(() => {
  if (unitData.questions.length === 0) return 0
  return Math.round((score.value / unitData.questions.length) * 100)
})

function checkAnswers() {
  showResult.value = true
  // Scroll to results for better UX
  setTimeout(() => {
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  showResult.value = false
  unitData.questions.forEach(q => {
    userAnswers[q.id] = ''
  })
  // Scroll back to the top of the practice section
  setTimeout(() => {
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

</script>

<template>
  <GrammarLayout
    :test-title="unitData.testTitle"
    :test-description="unitData.testDescription"
    :unit-title="`Unit ${unitData.unit}: ${unitData.unitTitle}`"
    :unit-description="unitData.unitDescription"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- LEARNING MATERIAL SLOT                                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card v-for="(section, index) in unitData.material" :key="index">
        <CardHeader>
          <CardTitle class="text-base font-semibold text-primary">{{ section.title }}</CardTitle>
          <CardDescription class="pt-2">{{ section.explanation }}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3">
            <li v-for="(example, exIndex) in section.examples" :key="exIndex" class="text-sm">
              <p class="font-medium">"{{ example.sentence }}"</p>
              <p class="text-muted-foreground italic text-xs">{{ example.meaning }}</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>Test your understanding. Choose the best option or fill in the blank.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in unitData.questions" :key="question.id">
            <p class="mb-3 font-medium">
              {{ index + 1 }}. {{ question.questionText }}
            </p>
            
            <!-- Multiple Choice Question Type -->
            <div v-if="question.type === 'multiple-choice'">
              <RadioGroup v-model="userAnswers[question.id]" class="space-y-2">
                <div v-for="option in question.options" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${question.id}-${option}`" :value="option" />
                  <Label :for="`${question.id}-${option}`">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Fill in the Blank Question Type -->
            <div v-if="question.type === 'fill-in-the-blank'">
              <Input
                v-model="userAnswers[question.id]"
                :placeholder="question.prompt"
                class="max-w-sm"
                @keyup.enter="checkAnswers"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button @click="checkAnswers" :disabled="!isQuizComplete">
            Check Answers
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <Card id="results-section">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your answers and the explanations to improve your understanding.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Overall Score -->
          <div class="p-4 rounded-lg bg-muted">
            <div class="flex items-center justify-between">
              <div class="text-lg font-bold">
                Final Score: {{ score }} / {{ unitData.questions.length }}
              </div>
              <div class="font-mono text-2xl font-bold" :class="scorePercentage > 70 ? 'text-green-600' : 'text-amber-600'">
                {{ scorePercentage }}%
              </div>
            </div>
            <Progress :model-value="scorePercentage" class="mt-2" />
          </div>

          <!-- Detailed Breakdown -->
          <div v-for="result in results" :key="result.id" class="border-t pt-4">
            <div class="flex items-start gap-4">
              <div class="mt-1">
                <CheckCircle2 v-if="result.isCorrect" class="h-6 w-6 text-green-500" />
                <XCircle v-else class="h-6 w-6 text-red-500" />
              </div>
              <div class="flex-1">
                <p class="font-semibold">{{ result.questionText }}</p>
                <p class="text-sm mt-2" :class="[result.isCorrect ? 'text-green-700' : 'text-red-700']">
                  Your answer: <span class="font-bold">"{{ result.userAnswer }}"</span>
                </p>
                <p v-if="!result.isCorrect" class="text-sm mt-1 text-blue-700">
                  Correct answer: <span class="font-bold">"{{ result.correctAnswer }}"</span>
                </p>

                <Alert class="mt-3">
                  <HelpCircle class="h-4 w-4" />
                  <AlertTitle>Explanation</AlertTitle>
                  <AlertDescription>
                    {{ result.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button variant="outline" @click="resetQuiz">Try Again</Button>
        </CardFooter>
      </Card>
    </template>
  </GrammarLayout>
</template>
