<template>
  <GrammarLayout
    :test-title="pageDetails.testTitle"
    :test-description="pageDetails.testDescription"
    :unit-title="pageDetails.unitTitle"
    :unit-description="pageDetails.unitDescription"
    :categories="pageDetails.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material Slot: Explanations & Rules                                    -->
    <!-- This section breaks down the complex rules of article usage with names. -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Principle: Specificity vs. Generality</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p>The fundamental rule for using 'the' with names is to distinguish between unique, singular entities (usually without 'the') and names that are plural, descriptive, or part of a larger group (often with 'the'). Think of 'the' as a spotlight pointing to something specific or pre-defined.</p>
          <blockquote>
            "We met <strong>Jane Maxwell</strong> last week." (A specific person's name, treated as a unique identifier.)
            <br>
            "We are visiting <strong>the Maxwells</strong> this weekend." (Refers to the Maxwell family, a group.)
          </blockquote>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 1: People and Places (Continents, Countries, Cities)</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 prose prose-sm max-w-none dark:prose-invert">
          <h4>General Rule: No 'the'</h4>
          <p>Most singular names of people, continents, countries, states, islands, cities, mountains, and lakes do not use 'the'.</p>
          <ul>
            <li><strong>People:</strong> <code>Angela Merkel</code>, <code>William Shakespeare</code></li>
            <li><strong>Continents/Countries:</strong> <code>Asia</code>, <code>Brazil</code>, <code>California</code>, <code>Sicily</code></li>
            <li><strong>Cities:</strong> <code>Tokyo</code>, <code>Prague</code>, <code>New York City</code></li>
            <li><strong>Mountains/Lakes:</strong> <code>Mount Everest</code>, <code>Lake Superior</code></li>
          </ul>

          <h4>Key Exceptions: Use 'the'</h4>
          <p>Use 'the' for names that are plural or contain a common noun like 'Republic', 'Kingdom', 'States', 'Emirates'.</p>
          <ul>
            <li><strong>Plural Names:</strong> <code>the Netherlands</code>, <code>the Philippines</code>, <code>the Bahamas</code></li>
            <li><strong>Political/Descriptive Titles:</strong> <code>the United States</code>, <code>the United Kingdom</code>, <code>the Czech Republic</code>, <code>the United Arab Emirates</code></li>
            <li><strong>Geographical Groups:</strong> <code>the Alps</code> (mountain range), <code>the Great Lakes</code> (lake group), <code>the British Isles</code> (island group)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 2: Bodies of Water, Buildings, and Streets</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 prose prose-sm max-w-none dark:prose-invert">
          <h4>Use 'the' for Oceans, Seas, Rivers, Canals, and Deserts</h4>
          <ul>
            <li><code>the Atlantic Ocean</code>, <code>the Mediterranean Sea</code>, <code>the River Thames</code>, <code>the Suez Canal</code>, <code>the Sahara Desert</code></li>
          </ul>
          <h4>Use 'the' for most Hotels, Theatres, Museums, and specific Buildings</h4>
          <ul>
            <li><code>the Hilton Hotel</code>, <code>the Globe Theatre</code>, <code>the British Museum</code>, <code>the Empire State Building</code></li>
          </ul>
          <h4>No 'the' for most Streets, Squares, Parks, and key buildings named after people or places</h4>
          <ul>
            <li><code>Oxford Street</code>, <code>Times Square</code>, <code>Hyde Park</code>, <code>Heathrow Airport</code></li>
            <li><strong>Tricky Exception:</strong> <code>Buckingham Palace</code> (named after a place) vs. <code>the White House</code> (descriptive name).</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule 3: Organizations, Newspapers, and Companies</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 prose prose-sm max-w-none dark:prose-invert">
          <h4>Use 'the' for Newspapers and Organizations</h4>
          <ul>
            <li><code>the Washington Post</code>, <code>the Financial Times</code>, <code>the United Nations</code>, <code>the Red Cross</code></li>
          </ul>
          <h4>No 'the' for most Companies, Airlines, and Universities</h4>
          <ul>
            <li><code>Fiat</code>, <code>Singapore Airlines</code>, <code>Sony</code>, <code>Barclays Bank</code></li>
            <li><strong>University Exception:</strong> Often no 'the' (<code>Cambridge University</code>), but if the structure is 'the University of [Place]', you use 'the' (<code>the University of Cambridge</code>).</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #practice Slot: Interactive Questions                                   -->
    <!-- This section provides challenging questions to apply the learned rules. -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice Exercises</CardTitle>
          <CardDescription>
            Choose 'the' or '---' (no article) to complete the sentences. The questions are designed to be tricky.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-2">
            <p class="font-medium">
              {{ index + 1 }}.
              <span v-for="(part, pIndex) in question.sentence" :key="pIndex">
                {{ part }}
                <span v-if="pIndex < question.sentence.length - 1" class="font-bold text-primary">[...]</span>
              </span>
            </p>
            <RadioGroup v-model="userAnswers[index]" :disabled="isSubmitted" class="flex items-center gap-4">
              <div class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${index}-opt1`" value="the" />
                <Label :for="`q${index}-opt1`">the</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${index}-opt2`" value="---" />
                <Label :for="`q${index}-opt2`">--- (no article)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button v-if="!isSubmitted" @click="checkAnswers" :disabled="!allQuestionsAnswered">
            Check Answers
          </Button>
          <Button v-if="isSubmitted" variant="secondary" @click="resetTest">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- #result Slot: Detailed Feedback and Score                             -->
    <!-- This section appears after submission to provide comprehensive analysis.-->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>You scored {{ score }} out of {{ questions.length }}. Review the detailed explanations below.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="text-sm font-medium">{{ scorePercentage.toFixed(0) }}%</span>
            <Progress :model-value="scorePercentage" class="w-full" />
          </div>

          <div v-for="(question, index) in questions" :key="`res-${question.id}`" class="mt-4">
            <Alert :variant="userAnswers[index] === question.correctAnswer ? 'default' : 'destructive'">
              <AlertCircle v-if="userAnswers[index] !== question.correctAnswer" class="h-4 w-4" />
              <CheckCircle2 v-else class="h-4 w-4" />
              <AlertTitle>Question {{ index + 1 }}</AlertTitle>
              <AlertDescription>
                <p class="font-mono text-sm">
                  "...{{ question.sentence.join(` <strong>${question.correctAnswer}</strong> `) }}..."
                </p>
                <p class="my-2">
                  Your answer:
                  <Badge :variant="userAnswers[index] === question.correctAnswer ? 'secondary' : 'destructive'">
                    {{ userAnswers[index] }}
                  </Badge>
                  <span v-if="userAnswers[index] !== question.correctAnswer">
                    | Correct answer:
                    <Badge variant="secondary">{{ question.correctAnswer }}</Badge>
                  </span>
                </p>
                <p class="text-xs">{{ question.explanation }}</p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'

const router = useRouter()

function goToPreviousUnit() {
  router.push("/units/grammar/9")
}
function goToNextUnit() {
  router.push("/units/grammar/11")
}

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Advanced exercises based on the book by Raymond Murphy.',
  unitTitle: 'Unit 10: Names with and without \'the\'',
  unitDescription: 'A deep dive into the rules and exceptions for using the definite article with proper nouns.',
  categories: ['Articles', 'Nouns', 'Proper Nouns', 'Geography'],
}

const questions = ref([
  {
    id: 1,
    sentence: ['The highest mountain in', 'Alps is Mont Blanc, but the highest in the world is Mount Everest.'],
    correctAnswer: 'the',
    explanation: "We use 'the' with mountain ranges (the Alps, the Rockies) but not with single mountains (Mount Everest).",
  },
  {
    id: 2,
    sentence: ['He got a job with', 'IBM after graduating from the University of Manchester.'],
    correctAnswer: '---',
    explanation: "We generally don't use 'the' with the names of companies (IBM, Sony, Microsoft).",
  },
  {
    id: 3,
    sentence: ['They crossed', 'Atlantic Ocean in a small boat, which is an incredible feat.'],
    correctAnswer: 'the',
    explanation: "We always use 'the' with the names of oceans, seas, and rivers (the Atlantic, the Pacific, the Nile).",
  },
  {
    id: 4,
    sentence: ['Many tourists visit', 'Buckingham Palace but are not allowed inside.'],
    correctAnswer: '---',
    explanation: "Although we use 'the' for many famous buildings (the White House), we don't use it for key locations named after a person or place, like Buckingham Palace or Heathrow Airport.",
  },
  {
    id: 5,
    sentence: ['My flight to', 'Philippines was rerouted through Dubai.'],
    correctAnswer: 'the',
    explanation: "We use 'the' with country names that are in the plural form (the Philippines, the Netherlands, the Maldives).",
  },
  {
    id: 6,
    sentence: ["I read about the political situation in", "Financial Times this morning."],
    correctAnswer: 'the',
    explanation: "We always use 'the' with the names of newspapers (the Financial Times, the Guardian, the New York Times).",
  },
  {
    id: 7,
    sentence: ["We sailed from Lake Ontario into", "St. Lawrence River and headed for the ocean."],
    correctAnswer: 'the',
    explanation: "While singular lakes don't take 'the' (Lake Ontario), rivers always do (the St. Lawrence River).",
  },
  {
    id: 8,
    sentence: ["She lives on", "Main Street, just across from the National Theatre."],
    correctAnswer: '---',
    explanation: "We don't use 'the' with the names of streets (Main Street, Oxford Street), but we do use it with theatres (the National Theatre). This question tests both rules.",
  },
  {
    id: 9,
    sentence: ["The peace treaty was brokered by", "United Nations and signed in Geneva."],
    correctAnswer: 'the',
    explanation: "We use 'the' for the names of organizations (the United Nations, the Red Cross, the European Union).",
  },
  {
    id: 10,
    sentence: ["Is", "Czech Republic the same country as the former Czechoslovakia?"],
    correctAnswer: 'the',
    explanation: "We use 'the' with countries whose names include a political title like 'Republic', 'Kingdom', or 'States'.",
  },
])

const userAnswers = ref(Array(questions.value.length).fill(null))
const showResult = ref(false)
const score = ref(0)
const isSubmitted = ref(false)

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

const allQuestionsAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== null)
})

function checkAnswers() {
  let correctCount = 0
  questions.value.forEach((question, index) => {
    if (userAnswers.value[index] === question.correctAnswer) {
      correctCount++
    }
  })
  score.value = correctCount
  isSubmitted.value = true
  showResult.value = true

  // Scroll to the results section for better UX
  const resultElement = document.querySelector('[data-slot="result"]')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function resetTest() {
  userAnswers.value.fill(null)
  score.value = 0
  isSubmitted.value = false
  showResult.value = false
}
</script>
