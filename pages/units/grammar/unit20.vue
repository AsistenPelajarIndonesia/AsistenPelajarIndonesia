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
    <!--  LEARNING MATERIAL SLOT                                                 -->
    <!--  This section acts as the 'teacher', explaining the concepts.          -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Core Concept: Spontaneous Decisions</CardTitle>
          <CardDescription>We use <strong>will ('ll)</strong> when we decide to do something at the moment of speaking.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="rounded-lg border bg-card p-4">
            <p class="text-sm text-muted-foreground">The speaker has not decided this before. The decision is made now.</p>
            <p class="mt-2 font-semibold">Example:</p>
            <blockquote class="mt-1 border-l-2 pl-4 italic">
              "Oh, I've left the door open. I<strong>'ll go</strong> and shut it."
            </blockquote>
            <blockquote class="mt-2 border-l-2 pl-4 italic">
              "What would you like to drink?" "I<strong>'ll have</strong> an orange juice, please."
            </blockquote>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offers, Promises &amp; Requests</CardTitle>
          <CardDescription><strong>Will</strong> is also common in these situations.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-semibold">Offers</h4>
            <p class="text-sm text-muted-foreground">Offering to do something for someone.</p>
            <blockquote class="mt-1 border-l-2 pl-4 italic">
              "That bag looks heavy. I<strong>'ll help</strong> you with it."
            </blockquote>
          </div>
          <div>
            <h4 class="font-semibold">Promises</h4>
            <p class="text-sm text-muted-foreground">Stating a commitment.</p>
            <blockquote class="mt-1 border-l-2 pl-4 italic">
              "I <strong>won't</strong> (will not) <strong>tell</strong> anyone what happened. I promise."
            </blockquote>
          </div>
           <div>
            <h4 class="font-semibold">Requests</h4>
            <p class="text-sm text-muted-foreground">Asking someone to do something.</p>
            <blockquote class="mt-1 border-l-2 pl-4 italic">
              "<strong>Will</strong> you please <strong>be</strong> quiet? I'm trying to concentrate."
            </blockquote>
          </div>
        </CardContent>
      </Card>
      
      <Card class="border-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
        <CardHeader>
          <CardTitle class="text-amber-700 dark:text-amber-400">Crucial Distinction: `will` vs. `be going to`</CardTitle>
          <CardDescription>This is a common point of confusion. Mastering it is key.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div>
            <h4 class="font-semibold">Use `will` for Spontaneous Decisions</h4>
            <p class="text-sm text-muted-foreground">Decided at the moment of speaking.</p>
            <blockquote class="mt-1 border-l-2 pl-4 italic">
              A: "There's no milk." <br>
              B: "Really? In that case, I<strong>'ll go</strong> and get some."
            </blockquote>
          </div>
          <div>
            <h4 class="font-semibold">Use `be going to` for Prior Plans</h4>
            <p class="text-sm text-muted-foreground">A decision made *before* the moment of speaking.</p>
             <blockquote class="mt-1 border-l-2 pl-4 italic">
              A: "There's no milk." <br>
              B: "I know. I<strong>'m going to go</strong> and get some when this TV show finishes."
            </blockquote>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using `Shall I / we ... ?`</CardTitle>
          <CardDescription>In British English, <strong>shall</strong> is often used with <strong>I</strong> and <strong>we</strong> for offers and suggestions.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <p class="text-sm">We use `Shall I/we...?` to ask if it's okay to do something or to make a suggestion.</p>
          <blockquote class="mt-1 border-l-2 pl-4 italic">
            "<strong>Shall I</strong> open the window?" (= Do you want me to open it?)
          </blockquote>
          <blockquote class="mt-2 border-l-2 pl-4 italic">
            "It's a nice day. <strong>Shall we</strong> go for a walk?" (= Let's go for a walk, what do you think?)
          </blockquote>
           <p class="mt-2 text-sm">Do not confuse this with `Will you...?` which is a request to the other person.</p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!--  PRACTICE QUESTIONS SLOT                                                -->
    <!--  The interactive quiz where students apply their knowledge.            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Unit 14: Practice Exercises</CardTitle>
          <CardDescription>Choose the best option to complete the sentences. Pay close attention to the context.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers">
            <div class="grid grid-cols-1 gap-8">
              <div v-for="(q, index) in questions" :key="q.id">
                <fieldset>
                  <legend class="mb-2 text-base font-medium">
                    {{ index + 1 }}. {{ q.question }}
                  </legend>
                  <RadioGroup v-model="userAnswers[index]" class="gap-2">
                    <div v-for="(option, optionIndex) in q.options" :key="optionIndex" 
                         :class="[
                           'flex items-center space-x-3 rounded-md border p-4 transition-all',
                           getOptionClass(index, optionIndex)
                         ]">
                      <RadioGroupItem :id="`${q.id}-${optionIndex}`" :value="optionIndex" />
                      <Label :for="`${q.id}-${optionIndex}`" class="w-full cursor-pointer">{{ option }}</Label>
                    </div>
                  </RadioGroup>
                </fieldset>
              </div>
              <Button type="submit" size="lg" :disabled="isSubmitted">
                Check Answers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!--  RESULTS SLOT                                                           -->
    <!--  The detailed feedback and explanation section.                         -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="bg-card">
        <CardHeader>
          <CardTitle :class="resultTitle.class">{{ resultTitle.text }}</CardTitle>
          <CardDescription>{{ resultDescription }}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex items-center gap-4">
            <span class="text-lg font-bold">Your Score: {{ score }} / {{ questions.length }}</span>
            <Progress :model-value="scorePercentage" class="w-full" />
            <span class="text-lg font-bold">{{ scorePercentage }}%</span>
          </div>

          <Alert variant="default">
             <AlertCircle class="h-4 w-4" />
            <AlertTitle>Review Your Answers</AlertTitle>
            <AlertDescription>
              Read the explanations carefully to understand why an answer is correct. This is the most important part of learning!
            </AlertDescription>
          </Alert>
          
          <div class="space-y-8">
            <div v-for="(q, index) in questions" :key="`result-${q.id}`">
              <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
              <div class="mt-2 space-y-2">
                 <p><strong>Your answer:</strong> 
                   <span :class="userAnswers[index] === q.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                     {{ q.options[userAnswers[index]] ?? 'Not answered' }}
                   </span>
                   <span v-if="userAnswers[index] !== q.correctAnswer" class="ml-2 text-green-600 dark:text-green-400 font-bold">✓</span>
                 </p>
                 <p v-if="userAnswers[index] !== q.correctAnswer">
                   <strong>Correct answer:</strong> 
                   <span class="text-green-600 dark:text-green-400">{{ q.options[q.correctAnswer] }}</span>
                 </p>
              </div>
              <Alert variant="outline" class="mt-3 border-l-4" :class="userAnswers[index] === q.correctAnswer ? 'border-green-500' : 'border-amber-500'">
                <Info class="h-4 w-4" />
                <AlertTitle class="font-bold">Explanation</AlertTitle>
                <AlertDescription v-html="q.explanation" />
              </Alert>
            </div>
          </div>

          <Button @click="resetTest" size="lg" variant="outline" class="w-full">
            <RotateCw class="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, AlertCircle, RotateCw } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component, so disable the default
})

const router = useRouter()

const pageDetails = {
  testTitle: 'English Grammar In Use Practice',
  testDescription: 'Based on the book by Raymond Murphy',
  unitTitle: 'Unit 14: Will and shall 1',
  unitDescription: 'Focusing on spontaneous decisions, offers, promises, predictions, and the use of shall.',
  categories: ['Future Tense', 'Modal Verbs', 'Will', 'Shall', 'Spontaneous Decisions']
}

const questions = ref([
  {
    id: 'q1',
    question: "A: 'The phone is ringing.' B: 'OK, I ______ it.'",
    options: ["am going to answer", "answer", "will answer"],
    correctAnswer: 2,
    explanation: "This is a classic example of a <strong>spontaneous decision</strong>. Speaker B decides to answer the phone <em>at the moment of speaking</em>, prompted by Speaker A. Therefore, 'will answer' is the correct choice. 'Am going to answer' would imply they already had a plan to answer the phone before it even rang, which is illogical."
  },
  {
    id: 'q2',
    question: "I'm not sure which route to take. Oh, I know! I ______ the GPS on my phone.",
    options: ["am going to use", "will use", "use"],
    correctAnswer: 1,
    explanation: "The phrase 'Oh, I know!' signals a sudden idea or decision made at the time of speaking. This is the primary use case for <strong>'will'</strong> in the context of future actions. The decision wasn't pre-planned."
  },
  {
    id: 'q3',
    question: "A: 'It's getting cold in here.' B: 'You're right. ______ the window for you?'",
    options: ["Will I close", "Am I going to close", "Shall I close"],
    correctAnswer: 2,
    explanation: "Speaker B is making an <strong>offer</strong>. When making offers or suggestions with 'I' or 'we', it's idiomatic and correct to use <strong>'Shall I/we...?'</strong>. 'Will I...?' is not used for offers, and 'Am I going to...?' asks about a pre-existing plan, which doesn't fit the context of an offer."
  },
  {
    id: 'q4',
    question: "Thank you for lending me the money. I promise I ______ you back on Friday.",
    options: ["will pay", "am going to pay", "pay"],
    correctAnswer: 0,
    explanation: "The verb 'promise' explicitly signals a promise. We use <strong>'will'</strong> to make promises about the future. 'I'm going to pay' is also possible, but 'will' is stronger and more natural immediately following 'I promise'."
  },
  {
    id: 'q5',
    question: "A: 'I've decided to repaint this room.' B: 'That's a big job. What color ______ it?'",
    options: ["will you paint", "are you going to paint", "do you paint"],
    correctAnswer: 1,
    explanation: "This is a tricky one. Speaker A has already made a decision ('I've decided'). Speaker B is asking about that <strong>pre-existing plan or intention</strong>. When asking about a prior plan, we use <strong>'be going to'</strong>. 'Will you paint' would be asking them to make the decision now, which isn't the case."
  },
  {
    id: 'q6',
    question: "My car has broken down again, and it just ______ start, no matter how many times I turn the key.",
    options: ["isn't going to", "doesn't", "won't"],
    correctAnswer: 2,
    explanation: "We use <strong>'won't' (will not)</strong> to talk about refusal or a thing that 'refuses' to work. The car is personified as being stubborn and refusing to start. This is a specific idiomatic use of 'will not'."
  },
  {
    id: 'q7',
    question: "Look at those dark clouds! I'm sure it ______ soon.",
    options: ["is going to rain", "will rain", "rains"],
    correctAnswer: 0,
    explanation: "While both 'will' and 'be going to' can be used for predictions, we use <strong>'be going to'</strong> when there is present evidence for the prediction (in this case, the dark clouds). 'It will rain' is more of a general belief or prediction without immediate evidence."
  },
  {
    id: 'q8',
    question: "A: 'We're out of coffee.' B: 'Are we? I ______ to the shop later, so I ______ some then.'",
    options: ["am going / will get", "will go / will get", "am going / am going to get"],
    correctAnswer: 0,
    explanation: "This two-part question tests the core distinction. Speaker B already has a plan to go to the shop ('I <strong>am going</strong> to the shop later'). The decision to get coffee, however, is made spontaneously upon hearing the news. Therefore, the second part is an on-the-spot decision: '...so I <strong>will get</strong> some then.'"
  },
]);

const userAnswers = ref<(number | null)[]>(Array(questions.value.length).fill(null));
const isSubmitted = ref(false);
const showResult = ref(false);

const score = computed(() => {
  return userAnswers.value.filter((answer, index) => answer === questions.value[index].correctAnswer).length;
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return Math.round((score.value / questions.value.length) * 100);
});

const resultTitle = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return { text: 'Flawless Victory!', class: 'text-green-600 dark:text-green-400' }
  if (percentage >= 75) return { text: 'Excellent Work!', class: 'text-sky-600 dark:text-sky-400' }
  if (percentage >= 50) return { text: 'Good Effort! Let\'s Review.', class: 'text-amber-600 dark:text-amber-400' }
  return { text: 'Needs More Practice. Don\'t Give Up!', class: 'text-red-600 dark:text-red-400' }
})

const resultDescription = computed(() => {
  const percentage = scorePercentage.value
  if (percentage === 100) return "You have a perfect understanding of this unit's concepts. Well done!"
  if (percentage >= 75) return "You have a strong grasp of 'will' and 'shall'. Review the explanations for any questions you missed."
  if (percentage >= 50) return "A solid attempt. Focus on the explanations below, especially the difference between 'will' and 'be going to'."
  return "No problem. The best students learn from their mistakes. Read every explanation carefully to build a stronger foundation."
})

function validateAnswers() {
  if (userAnswers.value.includes(null)) {
    // Optionally, alert the user they need to answer all questions.
    // For this implementation, we'll allow partial submission.
  }
  isSubmitted.value = true;
  showResult.value = true;
  // Scroll to results
  setTimeout(() => {
      const resultEl = document.querySelector('[data-result-section]');
      if(resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100)
}

function resetTest() {
  userAnswers.value.fill(null);
  isSubmitted.value = false;
  showResult.value = false;
}

function getOptionClass(questionIndex: number, optionIndex: number) {
  if (!isSubmitted.value) {
    return 'cursor-pointer hover:bg-muted/50';
  }
  
  const question = questions.value[questionIndex];
  const isCorrect = optionIndex === question.correctAnswer;
  const isSelected = userAnswers.value[questionIndex] === optionIndex;

  if (isCorrect) {
    return 'border-green-500 bg-green-100/80 dark:bg-green-900/30 ring-2 ring-green-500';
  }
  if (isSelected && !isCorrect) {
    return 'border-red-500 bg-red-100/80 dark:bg-red-900/30 ring-2 ring-red-500';
  }
  
  return 'border-muted-foreground/30';
}

function goToPreviousUnit() {
  router.push("/units/grammar/13")
}
function goToNextUnit() {
  router.push("/units/grammar/15")
}
</script>
