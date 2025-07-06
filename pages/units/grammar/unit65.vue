<!--
  File: @/pages/units/grammar/4.vue
  Description: An advanced grammar practice module for Unit 4, focusing on the nuanced differences
  between verb + to-infinitive and preposition + gerund constructions.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- UI Component Imports ---
// These are assumed to be part of your project's UI library (e.g., shadcn-vue)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, RefreshCw, BarChart2 } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our own layout component directly
})

// --- Component State & Data ---
const isSubmitted = ref(false)
const userAnswers = reactive<Record<string, number | null>>({})

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  router.push("/units/grammar/3")
}
function goToNextUnit() {
  router.push("/units/grammar/5")
}

// --- Quiz Content ---
// The questions are designed to be challenging, requiring a deep understanding
// of context and subtle meaning rather than simple pattern recognition.
const questions = ref([
  {
    id: 'q1',
    text: "After hours of fruitless negotiations, the union leader stopped ___ with management and stormed out of the room.",
    options: [
      { id: 'q1o1', text: 'to argue' },
      { id: 'q1o2', text: 'arguing' },
    ],
    correctAnswerIndex: 1,
    explanation: "The correct answer is 'arguing'. The structure 'stop + -ing' means to cease an activity. The leader stopped the activity of arguing. In contrast, 'stop + to-infinitive' means to pause one action in order to start another. For example: 'He stopped to argue with a colleague he met in the hallway' (He stopped walking in order to start arguing)."
  },
  {
    id: 'q2',
    text: "I regret ___ you that your application has been unsuccessful, but I also regret ___ so hastily in the first place.",
    options: [
      { id: 'q2o1', text: 'to inform / applying' },
      { id: 'q2o2', text: 'informing / to apply' },
    ],
    correctAnswerIndex: 0,
    explanation: "The correct structure is 'to inform / applying'. 'Regret + to-infinitive' is used to formally announce bad news (e.g., 'We regret to inform you...'). 'Regret + -ing' means feeling sorry about a past action. The speaker regrets the past action of applying."
  },
  {
    id: 'q3',
    text: "The old sailor was not afraid ___ into the storm; he had faced worse. However, he was afraid ___ his ship to the unforgiving sea.",
    options: [
      { id: 'q3o1', text: 'of sailing / to lose' },
      { id: 'q3o2', text: 'to sail / of losing' },
    ],
    correctAnswerIndex: 1,
    explanation: "The correct answer is 'to sail / of losing'. 'Afraid to do' often implies a specific decision or a moment of hesitation due to fear. He was not hesitant *to sail*. 'Afraid of doing' describes a more general, persistent fear or the possibility of something bad happening. He had a general fear *of losing* his ship."
  },
  {
    id: 'q4',
    text: "Please try ___ the machine by pressing the red button first. If that doesn't work, try ___ the manual for the troubleshooting section.",
    options: [
      { id: 'q4o1', text: 'to restart / to check' },
      { id: 'q4o2', text: 'restarting / checking' },
      { id: 'q4o3', text: 'restarting / to check' },
    ],
    correctAnswerIndex: 2,
    explanation: "The correct answer is 'restarting / to check'. 'Try + -ing' means to perform an experiment to see if it solves a problem ('try restarting'). 'Try + to-infinitive' means to make an effort to do something that might be difficult ('try to check' implies making an effort to find and read the manual)."
  },
  {
    id: 'q5',
    text: "Even after winning the championship, the coach went on ___ the importance of fundamentals for the next season.",
    options: [
      { id: 'q5o1', text: 'to stress' },
      { id: 'q5o2', text: 'stressing' },
    ],
    correctAnswerIndex: 1,
    explanation: "The correct choice is 'stressing'. 'Go on + -ing' means to continue doing the same action. The coach continued stressing the same point. 'Go on + to-infinitive' means to finish one action and start a new, different one. E.g., 'After his playing career, he went on to become a great coach'."
  },
  {
    id: 'q6',
    text: "I will never forget ___ the northern lights for the first time; it was a truly magical experience. I must not forget ___ my camera next time.",
    options: [
      { id: 'q6o1', text: 'seeing / to bring' },
      { id: 'q6o2', text: 'to see / bringing' },
    ],
    correctAnswerIndex: 0,
    explanation: "The correct choice is 'seeing / to bring'. 'Forget + -ing' refers to a memory (or lack thereof) of a past event. 'Forget + to-infinitive' refers to failing to perform a required task or duty."
  },
  {
    id: 'q7',
    text: "The CEO is interested ___ how the new marketing strategy is performing, as she is interested ___ in emerging markets.",
    options: [
      { id: 'q7o1', text: 'to learn / in investing' },
      { id: 'q7o2', text: 'in learning / to invest' },
    ],
    correctAnswerIndex: 0,
    explanation: "The correct answer is 'to learn / in investing'. 'Interested + to-infinitive' is often used to express a reaction or a desire to find out more about something new ('interested to learn'). 'Interested + in + -ing' describes a more general or existing interest in a subject or activity ('interested in investing')."
  },
  {
    id: 'q8',
    text: "He was sorry ___ the vase, but he was not sorry ___ that he was defending his sister from the bully.",
    options: [
      { id: 'q8o1', text: 'to break / for saying' },
      { id: 'q8o2', text: 'for breaking / to say' },
    ],
    correctAnswerIndex: 1,
    explanation: "The correct choice is 'for breaking / to say'. 'Sorry for + -ing' is used to apologize for a specific action ('sorry for breaking'). 'Sorry + to-infinitive' is often used to express regret about a piece of information or a situation ('sorry to say' is a common phrase for delivering unwelcome news or opinions)."
  },
])

// --- Computed Properties for Validation & Scoring ---
const score = computed(() => {
  return questions.value.reduce((correctCount, question, index) => {
    if (userAnswers[question.id] === question.correctAnswerIndex) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  return Math.round((score.value / questions.value.length) * 100)
})

// --- Control Functions ---
function submitQuiz() {
  // Check if all questions are answered
  if (Object.keys(userAnswers).length < questions.value.length) {
    alert("Please answer all questions before submitting.")
    return
  }
  isSubmitted.value = true
  // Scroll to the result section for better UX
  const resultEl = document.getElementById('result-section');
  if (resultEl) {
    resultEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetQuiz() {
  isSubmitted.value = false
  for (const key in userAnswers) {
    delete userAnswers[key]
  }
  // Scroll to the top of the practice section
  const practiceEl = document.getElementById('practice-section');
  if (practiceEl) {
    practiceEl.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Advanced Practice"
    test-description="Sharpen your skills with exercises inspired by Raymond Murphy's classic grammar guide."
    unit-title="Unit 4: To-Infinitive vs. Preposition + Gerund (-ing)"
    unit-description="Master the subtle but critical meaning shifts when using different verb patterns. This unit explores why we say 'afraid to do' in one context but 'afraid of doing' in another, expanding to other crucial verb pairs."
    :categories="['Verb Patterns', 'Gerunds', 'Infinitives', 'Advanced Grammar']"
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
          <CardTitle>Core Concept: Specific Action vs. General State</CardTitle>
          <CardDescription>
            The choice between a to-infinitive and a gerund (-ing form) after certain verbs and prepositions isn't random; it fundamentally changes the meaning of a sentence. Think of it as the difference between a specific, conscious decision and a general feeling or state.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
            <div class="p-4 border rounded-md bg-muted/50">
                <h4 class="font-semibold">Verb + to-infinitive (e.g., afraid <span class="text-blue-600">to do</span>)</h4>
                <p class="text-muted-foreground mt-1">This pattern often describes a <span class="font-bold">specific action</span> that someone decides to do or not to do, often because they are weighing the consequences. The focus is on the act itself.</p>
                <p class="mt-2 pl-4 border-l-2 border-blue-400"><em>"The water was freezing, so he was afraid <span class="text-blue-600">to jump</span> in."</em> (He made a conscious decision not to perform the action of jumping at that moment.)</p>
            </div>
             <div class="p-4 border rounded-md bg-muted/50">
                <h4 class="font-semibold">Preposition + -ing (e.g., afraid <span class="text-red-600">of doing</span>)</h4>
                <p class="text-muted-foreground mt-1">This pattern usually expresses a <span class="font-bold">general state of mind</span>, an ongoing fear, or the possibility of something happening. The focus is on the feeling or potential outcome.</p>
                <p class="mt-2 pl-4 border-l-2 border-red-400"><em>"He's a strong swimmer, but he's always been afraid <span class="text-red-600">of drowning</span>."</em> (This describes a persistent, general fear he has, not a decision in a specific moment.)</p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Crucial Pairs to Master</CardTitle>
            <CardDescription>This principle extends to many other important verb pairs. Understanding them is key to fluency.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3 text-sm">
            <p><strong>STOP:</strong> <br>• <span class="text-blue-600">stop to do</span> = pause to do something else. <em>(She stopped to tie her shoe.)</em> <br>• <span class="text-red-600">stop doing</span> = cease an activity. <em>(Please stop making that noise.)</em></p>
            <p><strong>REMEMBER / FORGET:</strong> <br>• <span class="text-blue-600">remember/forget to do</span> = a future task. <em>(Remember to lock the door.)</em> <br>• <span class="text-red-600">remember/forget doing</span> = a past memory. <em>(I'll never forget seeing her.)</em></p>
            <p><strong>TRY:</strong> <br>• <span class="text-blue-600">try to do</span> = make an effort, attempt a difficult task. <em>(I tried to lift the box, but it was too heavy.)</em> <br>• <span class="text-red-600">try doing</span> = experiment to see what happens. <em>(The computer is frozen. Try restarting it.)</em></p>
            <p><strong>REGRET:</strong> <br>• <span class="text-blue-600">regret to do</span> = announce bad news. <em>(We regret to inform you...)</em> <br>• <span class="text-red-600">regret doing</span> = feel sorry for a past action. <em>(I regret not studying harder.)</em></p>
            <p><strong>GO ON:</strong> <br>• <span class="text-blue-600">go on to do</span> = finish one thing and start another. <em>(After her speech, she went on to answer questions.)</em> <br>• <span class="text-red-600">go on doing</span> = continue the same activity. <em>(He went on talking for hours.)</em></p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE QUESTIONS SLOT                                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card id="practice-section">
        <CardHeader>
          <CardTitle>Unit 4 Practice Exercises</CardTitle>
          <CardDescription>Read each sentence carefully and choose the option that fits the context best.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-medium text-base">
              {{ index + 1 }}. {{ question.text }}
            </p>
            <RadioGroup v-model="userAnswers[question.id]" :disabled="isSubmitted">
              <div v-for="(option, optionIndex) in question.options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="option.id" :value="optionIndex" />
                <Label :for="option.id" class="cursor-pointer text-base">{{ option.text }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="flex justify-end pt-4">
            <Button v-if="!isSubmitted" size="lg" @click="submitQuiz">
              Check Answers
            </Button>
            <Button v-else size="lg" @click="resetQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULTS SLOT                                                            -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="border-2 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div class="flex items-center gap-4">
              <BarChart2 class="h-8 w-8 text-primary"/>
              <div>
                <CardTitle class="text-2xl">Your Results</CardTitle>
                <CardDescription>You scored {{ score }} out of {{ questions.length }} ({{ scorePercentage }}%). Review the explanations below to improve.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-for="(question, index) in questions" :key="`result-${question.id}`">
              <p class="font-medium">
                {{ index + 1 }}. {{ question.text }}
              </p>
              <div class="mt-3">
                <Alert :variant="userAnswers[question.id] === question.correctAnswerIndex ? 'default' : 'destructive'" class="border-2">
                   <div class="flex items-start gap-3">
                     <div class="mt-1">
                        <CheckCircle v-if="userAnswers[question.id] === question.correctAnswerIndex" class="h-5 w-5 text-green-600" />
                        <XCircle v-else class="h-5 w-5 text-red-600" />
                     </div>
                     <div>
                       <AlertTitle>
                          Your Answer: <span class="font-normal italic">"{{ questions[index].options[userAnswers[question.id]!].text }}"</span>
                       </AlertTitle>
                       <AlertDescription class="mt-2 space-y-2">
                         <p v-if="userAnswers[question.id] !== question.correctAnswerIndex" class="font-semibold">
                           Correct Answer: <span class="font-normal italic">"{{ questions[index].options[question.correctAnswerIndex].text }}"</span>
                         </p>
                         <p class="text-sm leading-relaxed text-foreground/80">
                           <span class="font-bold">Explanation:</span> {{ question.explanation }}
                         </p>
                       </AlertDescription>
                     </div>
                   </div>
                </Alert>
              </div>
            </div>
            <div class="flex justify-center pt-4">
              <Button size="lg" @click="resetQuiz">
                <RefreshCw class="mr-2 h-4 w-4" />
                Practice Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </GrammarLayout>
</template>
