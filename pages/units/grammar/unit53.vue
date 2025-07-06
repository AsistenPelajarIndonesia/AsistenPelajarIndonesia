<!--
  File: @/pages/units/grammar/4.vue
  Unit: 4
  Topic: Verb + to … (decide to … / forget to … etc.)
  Description: A deep-dive practice module on using the to-infinitive after specific verbs.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// Assuming these UI components are available from your project's UI library (e.g., shadcn-vue)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-vue-next'

definePageMeta({
  layout: false, // We are using our custom layout component directly
})

// --- NAVIGATION ---
const router = useRouter()
function goToPreviousUnit() {
  // Navigates to the preceding unit as requested.
  router.push("/units/grammar/3")
}
function goToNextUnit() {
  // Navigates to the subsequent unit as requested.
  router.push("/units/grammar/5")
}

// --- UNIT DATA & CONTENT ---
// A comprehensive, reactive object holding all content for this lesson.
// This structure is inspired by how a master teacher might organize a lesson plan.
const unitData = reactive({
  title: "Verb + to … (decide to … / forget to … etc.)",
  description: "Mastering the to-infinitive after verbs of intention, decision, and arrangement.",
  categories: ["Verbs", "Infinitive", "Sentence Structure", "Intermediate"],
  
  // The 'Material' section is the core teaching component, like a textbook page.
  material: [
    {
      title: "The Core Principle: Expressing Future Plans & Intentions",
      content: "Many English verbs, especially those related to thinking, planning, and communicating, are followed by the <strong>to-infinitive</strong> (to + base form of the verb). This structure typically points to an action or event that will happen <em>after</em> the action of the main verb.",
      examples: [
        "She <strong>decided to leave</strong> her job.",
        "We <strong>plan to travel</strong> to Japan next year.",
        "I <strong>expect to arrive</strong> around 7 p.m.",
      ],
    },
    {
      title: "Common Verbs Followed by 'to-infinitive'",
      content: "Memorizing this list isn't enough; you must understand the *context* in which they are used. We can group them by meaning:",
      verbGroups: [
        {
          category: "Thinking & Deciding",
          verbs: ["decide", "plan", "choose", "hope", "expect", "aim", "prepare"],
          example: "They have <strong>prepared to launch</strong> the new product."
        },
        {
          category: "Effort & Outcome",
          verbs: ["manage", "fail", "attempt", "try", "strive"],
          example: "He finally <strong>managed to fix</strong> the computer."
        },
        {
          category: "Communication & Promises",
          verbs: ["offer", "promise", "agree", "refuse", "threaten", "claim"],
          example: "The company <strong>refused to lower</strong> its prices."
        },
        {
          category: "Appearing & Seeming",
          verbs: ["seem", "appear", "tend", "pretend"],
          example: "She <strong>pretended not to see</strong> me."
        },
      ],
    },
    {
      title: "Teacher's Insight: The Negative Form",
      content: "A common point of confusion for students is forming the negative. The word <strong>'not'</strong> comes <em>before</em> the to-infinitive, not after the main verb.",
      examples: [
        "Correct: He <strong>promised not to be</strong> late.",
        "Incorrect: <del>He promised to not be late.</del> (Often heard, but formally incorrect)",
        "Incorrect: <del>He didn't promise to be late.</del> (This changes the meaning completely - it means he made no promise at all).",
      ],
    },
    {
      title: "Advanced Nuance: Verb + Object + to-infinitive",
      content: "Some verbs in this family can take an object before the infinitive, changing the subject of the second action. Key verbs include <strong>want, ask, expect, help, would like,</strong> and <strong>tell</strong>.",
      examples: [
        "I <strong>want to go</strong>. (I will go)",
        "I <strong>want <em>you</em> to go</strong>. (You will go)",
        "She <strong>asked to leave</strong>.",
        "She <strong>asked <em>me</em> to leave</strong>."
      ]
    }
  ],

  // The 'Practice' section contains challenging questions designed to test deep understanding.
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: "After weeks of deliberation, the board of directors finally _______ a new CEO from outside the company.",
      options: [
        { value: 'agreed to appoint', text: 'agreed to appoint' },
        { value: 'suggested appointing', text: 'suggested appointing' },
        { value: 'insisted to appoint', text: 'insisted to appoint' },
        { value: 'considered to appoint', text: 'considered to appoint' },
      ],
      correctAnswer: 'agreed to appoint',
      explanation: "'Agree' is one of the key verbs followed by a to-infinitive. 'Suggest' and 'consider' are followed by the gerund (-ing form), and 'insist' is followed by 'on + gerund' (insisted on appointing). This question tests your knowledge of verb patterns beyond the main list."
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: "Even though the path was treacherous, the experienced hiker _______ the summit before nightfall.",
      options: [
        { value: 'succeeded to reach', text: 'succeeded to reach' },
        { value: 'managed to reach', text: 'managed to reach' },
        { value: 'was able to reaching', text: 'was able to reaching' },
        { value: 'achieved to reach', text: 'achieved to reach' },
      ],
      correctAnswer: 'managed to reach',
      explanation: "'Manage to' specifically implies overcoming difficulty, which fits the context of a 'treacherous path'. 'Succeed' is followed by 'in + gerund' (succeeded in reaching). 'Achieve' is typically used with a noun (achieved his goal). 'Was able to' must be followed by the base form, not a gerund."
    },
    {
      id: 'q3',
      type: 'fill-in-the-blank',
      text: "The politician made a public statement, where he _______ any involvement in the scandal and threatened legal action against the newspaper.",
      prompt: "He _______ (claim) to have no knowledge and _______ (promise) to cooperate fully with the investigation.",
      correctAnswer: "claimed | promised",
      explanation: "This tests two verbs in context. 'Claim' and 'promise' are both followed by the to-infinitive. The prompt requires the past tense form of the verbs themselves: 'claimed' and 'promised'. The structure is 'claimed to have...' and 'promised to cooperate...'"
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      text: "My driving instructor warned me _______ the speed limit in residential areas, as the penalties are severe.",
      options: [
        { value: 'to not exceed', text: 'to not exceed' },
        { value: 'not to exceed', text: 'not to exceed' },
        { value: 'don\'t exceed', text: 'don\'t exceed' },
        { value: 'not exceeding', text: 'not exceeding' },
      ],
      correctAnswer: 'not to exceed',
      explanation: "This question directly tests the negative infinitive structure. The correct form is 'verb + (object) + not + to-infinitive'. 'Warned me not to exceed' is the grammatically sound construction. 'To not exceed' is a split infinitive, which is less formal and often considered incorrect in traditional grammar."
    },
    {
      id: 'q5',
      type: 'fill-in-the-blank',
      text: "Despite the market downturn, our company cannot afford _______ (delay) the launch of this critical project any longer.",
      correctAnswer: 'to delay',
      explanation: "The verb 'afford' is almost always followed by a to-infinitive, especially when discussing resources like time or money. The correct structure is 'afford to do something'."
    },
    {
      id: 'q6',
      type: 'multiple-choice',
      text: "The defendant _______ guilty, but the jury did not seem convinced by his testimony.",
      options: [
        { value: 'pretended to plead', text: 'pretended to plead' },
        { value: 'appeared to be', text: 'appeared to be' },
        { value: 'offered to plead', text: 'offered to plead' },
        { value: 'denied to plead', text: 'denied to plead' },
      ],
      correctAnswer: 'offered to plead',
      explanation: "In a legal context, a defendant makes a plea. 'Offered to plead' means he was willing to formally state his guilt, likely for a lesser sentence. 'Pretended' doesn't fit the legal formality. 'Appeared' needs a state of being (e.g., appeared to be guilty). 'Denied' must be followed by a gerund (denied pleading/doing)."
    },
  ]
})

// --- INTERACTIVITY & STATE MANAGEMENT ---
const userAnswers = ref<Record<string, string>>({})
const showResult = ref(false)

// Initialize user answers
unitData.questions.forEach(q => {
  if (q.type === 'fill-in-the-blank') {
    userAnswers.value[q.id] = ''
  } else {
    userAnswers.value[q.id] = ''
  }
})

function checkAnswers() {
  // Simple trigger to show the results pane. The magic happens in the computed properties.
  showResult.value = true
}

function resetTest() {
  showResult.value = false
  unitData.questions.forEach(q => {
    userAnswers.value[q.id] = ''
  })
  // Scroll to top of practice for a better UX
  const practiceElement = document.getElementById('practice-section')
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' })
  }
}

// --- COMPUTED PROPERTIES FOR DYNAMIC RESULTS ---
const score = computed(() => {
  return unitData.questions.reduce((correctCount, question) => {
    const userAnswer = userAnswers.value[question.id]?.trim().toLowerCase()
    const correctAnswer = (question.type === 'fill-in-the-blank') 
      ? question.correctAnswer.split('|').join(' ') 
      : question.correctAnswer
      
    const formattedUserAnswer = (question.type === 'fill-in-the-blank') 
      ? userAnswer.replace(/\s+/g, ' ').split(' ').join('|')
      : userAnswer

    if (formattedUserAnswer === question.correctAnswer.toLowerCase()) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const totalQuestions = computed(() => unitData.questions.length)
const scorePercentage = computed(() => (score.value / totalQuestions.value) * 100)

const results = computed(() => {
  return unitData.questions.map(question => {
    const userAnswer = userAnswers.value[question.id] || "No answer"
    
    let isCorrect
    if (question.type === 'fill-in-the-blank') {
      const formattedUserAnswer = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ').split(' ').join('|')
      isCorrect = formattedUserAnswer === question.correctAnswer.toLowerCase()
    } else {
      isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
    }
    
    return {
      ...question,
      userAnswer,
      isCorrect,
    }
  })
})
</script>

<template>
  <GrammarLayout
    test-title="English Grammar In Use: Practice"
    test-description="Interactive exercises based on the Raymond Murphy series."
    :unit-title="`Unit 4: ${unitData.title}`"
    :unit-description="unitData.description"
    :categories="unitData.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- Learning Material Slot -->
    <template #material>
      <Card v-for="(item, index) in unitData.material" :key="index">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-lg text-primary">
            <Sparkles class="h-5 w-5" />
            {{ item.title }}
          </CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p v-html="item.content"></p>
          <ul v-if="item.examples" class="mt-4 list-inside list-disc space-y-2">
            <li v-for="(example, exIndex) in item.examples" :key="exIndex" v-html="example"></li>
          </ul>
          <div v-if="item.verbGroups" class="mt-4 space-y-4">
            <div v-for="group in item.verbGroups" :key="group.category">
              <h4 class="font-semibold">{{ group.category }}</h4>
              <p class="text-muted-foreground">
                <span v-for="(verb, vIndex) in group.verbs" :key="verb">
                  <code>{{ verb }}</code>{{ v-Index < group.verbs.length - 1 ? ', ' : '' }}
                </span>
              </p>
              <p class="mt-1 border-l-2 border-primary pl-3 italic">e.g., {{ group.example }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- Practice Questions Slot -->
    <template #practice>
      <div id="practice-section" class="scroll-m-20">
        <Card>
          <CardHeader>
            <CardTitle>Practice Exercises</CardTitle>
            <CardDescription>
              Complete the sentences below. These questions require careful thought.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <div v-for="(question, index) in unitData.questions" :key="question.id" class="space-y-3">
              <p><strong>Question {{ index + 1 }}:</strong> {{ question.text }}</p>
              
              <!-- Multiple Choice Renderer -->
              <div v-if="question.type === 'multiple-choice'">
                <RadioGroup v-model="userAnswers[question.id]" :disabled="showResult" class="gap-3">
                  <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`${question.id}-${option.value}`" :value="option.value" />
                    <Label :for="`${question.id}-${option.value}`" class="font-normal">{{ option.text }}</Label>
                  </div>
                </RadioGroup>
              </div>

              <!-- Fill-in-the-blank Renderer -->
              <div v-if="question.type === 'fill-in-the-blank'">
                <p class="text-sm text-muted-foreground italic mb-2">{{ question.prompt }}</p>
                <Input
                  v-model="userAnswers[question.id]"
                  :disabled="showResult"
                  placeholder="Type your answer(s) here..."
                />
              </div>
            </div>

            <Button v-if="!showResult" class="w-full" size="lg" @click="checkAnswers">
              Validate My Answers
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- Results Slot -->
    <template #result>
       <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Review your performance below. Understanding your mistakes is the key to improvement.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Score Summary -->
          <div class="rounded-lg border bg-card text-card-foreground p-6">
            <div class="flex flex-col items-center gap-2 text-center">
              <p class="text-sm font-medium text-muted-foreground">Your Score</p>
              <p class="text-5xl font-bold tracking-tighter">{{ score }} / {{ totalQuestions }}</p>
              <div class="w-full px-4">
                 <Progress :model-value="scorePercentage" class="mt-2" />
              </div>
              <p v-if="scorePercentage === 100" class="mt-2 text-green-600 font-semibold">Excellent work! A perfect score!</p>
              <p v-else-if="scorePercentage >= 70" class="mt-2 text-blue-600 font-semibold">Great job! You have a solid understanding.</p>
              <p v-else class="mt-2 text-orange-600 font-semibold">Good effort! Review the explanations to master this topic.</p>
            </div>
          </div>
          
          <!-- Detailed Breakdown -->
          <div v-for="result in results" :key="`res-${result.id}`">
            <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
              <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
              <AlertTitle class="flex items-center justify-between">
                <span>Question: {{ result.text }}</span>
                <span :class="[result.isCorrect ? 'text-green-600' : 'text-red-600', 'font-bold text-sm']">
                  {{ result.isCorrect ? 'Correct' : 'Incorrect' }}
                </span>
              </AlertTitle>
              <AlertDescription class="mt-4 space-y-3 prose prose-sm max-w-none dark:prose-invert">
                <p><strong>Your Answer: </strong><code :class="{'bg-red-200 dark:bg-red-900/50 p-1 rounded': !result.isCorrect}">{{ result.userAnswer }}</code></p>
                <p v-if="!result.isCorrect"><strong>Correct Answer: </strong><code class="bg-green-200 dark:bg-green-900/50 p-1 rounded">{{ result.type === 'fill-in-the-blank' ? result.correctAnswer.split('|').join(' ... ') : result.correctAnswer }}</code></p>
                <div class="!mt-3 flex items-start gap-3 rounded-md border bg-muted/50 p-3">
                  <AlertCircle class="h-5 w-5 flex-shrink-0 text-muted-foreground mt-0.5" />
                  <div>
                    <h5 class="font-semibold">Explanation</h5>
                    <p class="text-muted-foreground" v-html="result.explanation"></p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          <Button class="w-full" variant="outline" @click="resetTest">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </template>
  </GrammarLayout>
</template>
