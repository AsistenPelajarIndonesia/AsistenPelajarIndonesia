<!--
  File: @/pages/units/grammar/1.vue
  Unit: 1 (Book Ref: English Grammar in Use, Unit 35)
  Topic: I'd better...; It's time...
  Description: A deep-dive practice module focusing on expressing strong advice/urgency ('had better') 
  and indicating that something should be done now or in the near future ('it's time').
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GrammarLayout from '@/layouts/GrammarLayout.vue'

// --- Component & Page Configuration ---
definePageMeta({
  layout: false, // We are using our own layout component, so we disable the default Nuxt layout.
})

const testTitle = 'Intermediate Grammar Practice'
const testDescription = 'Based on "English Grammar In Use" by Raymond Murphy'
const unitTitle = "Unit 1: I'd better… It's time…"
const unitDescription = "Mastering expressions of urgent advice and overdue actions."
const categories = ['Advice', 'Suggestions', 'Hypothetical Structures', 'Modals & Semi-Modals']
const unitNumber = 1

// --- Navigation ---
const router = useRouter()
function goToPreviousUnit() {
  // This would ideally link to the last unit of a previous section or an index.
  // For this example, we'll navigate to a hypothetical previous unit (e.g., unit 0 or an intro page).
  // router.push(`/units/grammar/${unitNumber - 1}`)
  alert('Navigating to the previous unit or grammar index.')
}
function goToNextUnit() {
  router.push(`/units/grammar/${unitNumber + 1}`)
}

// --- Reactive State for the Quiz ---
const questions = ref([
  {
    id: 1,
    type: 'fill-in',
    text: "The movie starts in five minutes. We ______ leave now or we'll miss the beginning.",
    correctAnswer: "had better",
    userAnswer: '',
    explanation: "Use 'had better' (or 'd better') for strong advice in a specific, immediate situation. Missing the movie is the negative consequence. 'Should' is too general for this urgency."
  },
  {
    id: 2,
    type: 'fill-in-verb',
    text: "You've been coughing all day. It's high time you ______ a doctor.",
    correctAnswer: "saw",
    userAnswer: '',
    explanation: "The structure 'It's (high) time + subject' requires a past simple verb (saw) to refer to a present or future action that is overdue. 'It's time you see a doctor' is a common but grammatically incorrect simplification."
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "This is a dangerous neighbourhood. You ______ walk home alone so late at night.",
    options: ["'d better", "'d better not", "shouldn't have"],
    correctAnswer: "'d better not",
    userAnswer: '',
    explanation: "'d better not' is used for urgent warnings against doing something. 'Shouldn't have' refers to a past regret, but the situation described is present/future."
  },
  {
    id: 4,
    type: 'sentence-rewrite',
    prompt: "Rewrite the following sentence using the structure 'It's time for...': The children need to go to bed.",
    correctAnswer: "It's time for the children to go to bed.",
    userAnswer: '',
    explanation: "The structure 'It's time + for [object] + to [infinitive]' is a common way to express that the moment for an action has arrived. It's a slightly less direct alternative to 'It's time the children went to bed.'"
  },
  {
    id: 5,
    type: 'fill-in-complex',
    text: "You're still in your pajamas! It's almost noon. It's about time you ______ and ______ something productive.",
    correctAnswers: ["got dressed", "did"],
    userAnswers: ['', ''],
    explanation: "Both blanks follow 'It's about time you...', so both require the past simple tense. 'Got dressed' and 'did' fit the context of actions that are seriously overdue."
  },
  {
    id: 6,
    type: 'context-choice',
    text: "Manager to employee: 'That report was due yesterday. I need it on my desk this afternoon. You ______ it immediately.'",
    options: ["should finish", "had better finish", "could finish"],
    correctAnswer: "had better finish",
    userAnswer: '',
    explanation: "The manager's tone is urgent and implies consequences (e.g., getting into trouble). 'Had better' perfectly captures this high-stakes, specific advice. 'Should finish' is weaker and less authoritative in this context."
  },
  {
    id: 7,
    type: 'fill-in-verb',
    text: "I suppose it's time I ______ my parents I'm moving out. They're not going to be happy.",
    correctAnswer: "told",
    userAnswer: '',
    explanation: "Even with 'I suppose', the structure 'it's time + subject' must be followed by the past simple ('told') to express a present action that feels overdue or difficult to perform."
  },
  {
    id: 8,
    type: 'sentence-rewrite',
    prompt: "Give strong advice against touching the exhibit using 'had better': You must not touch that wire; it's live.",
    correctAnswer: "You'd better not touch that wire.",
    userAnswer: '',
    explanation: "The negative form is 'had better not + infinitive'. This transformation correctly converts a command into a strong, cautionary piece of advice with an implied severe consequence (electrocution)."
  },
])

const showResult = ref(false)
const results = ref<any[]>([])

// --- Validation Logic ---
// This function acts as the "awesome validator".
function validateAnswers() {
  const validationResults = questions.value.map(q => {
    let isCorrect = false;
    let formattedUserAnswer: string;

    if (q.type === 'fill-in-complex') {
      // Handle questions with multiple answers
      const userAns = q.userAnswers.map(a => a.trim().toLowerCase());
      const correctAns = q.correctAnswers.map(a => a.trim().toLowerCase());
      isCorrect = userAns.every((val, index) => val === correctAns[index]);
      formattedUserAnswer = q.userAnswers.join(', ');
    } else {
      // Handle single answer questions
      const userAns = q.userAnswer.trim().toLowerCase().replace(/\.$/, ''); // Normalize answer
      const correctAns = q.correctAnswer.trim().toLowerCase().replace(/\.$/, '');
      isCorrect = userAns === correctAns;
      formattedUserAnswer = q.userAnswer;
    }

    return {
      id: q.id,
      questionText: q.text,
      prompt: q.prompt,
      userAnswer: formattedUserAnswer,
      correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    }
  })
  
  results.value = validationResults
  showResult.value = true

  // Scroll to results for better UX
  const resultEl = document.getElementById('results-section');
  if (resultEl) {
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Computed Properties ---
const score = computed(() => {
  return results.value.filter(r => r.isCorrect).length
})
const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => {
  return totalQuestions.value > 0 ? Math.round((score.value / totalQuestions.value) * 100) : 0
})

function getScoreColor(percentage: number) {
  if (percentage >= 80) return 'text-green-600 dark:text-green-400'
  if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

</script>

<template>
  <GrammarLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- #material: Explanations & Examples                                      -->
    <!-- ======================================================================= -->
    <template #material>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-primary">Core Concept: I'd better...</h3>
          <p class="text-sm text-muted-foreground">
            We use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">had better</code> (or the more common contraction <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">'d better</code>) to give strong advice or to say what we think is the best action in a <strong class="font-semibold">specific, present situation</strong>. It implies that there will be a <strong class="font-semibold text-destructive">negative result or problem</strong> if the advice is not followed.
          </p>
        </div>
        
        <div class="space-y-4">
          <h4 class="font-medium">Structure</h4>
          <div class="p-4 bg-muted/50 rounded-md">
            <p class="font-mono text-sm">Subject + <span class="font-bold text-blue-600">'d better</span> + <span class="font-bold text-purple-600">infinitive (without 'to')</span></p>
            <p class="font-mono text-sm">Subject + <span class="font-bold text-blue-600">'d better not</span> + <span class="font-bold text-purple-600">infinitive (without 'to')</span></p>
          </div>
          <p class="text-xs text-muted-foreground italic">Common Error: Never use "to" after 'had better'. <span class="line-through">I'd better to go.</span></p>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">'had better' vs. 'should'</h4>
          <ul class="list-disc list-inside space-y-2 text-sm">
            <li><strong class="font-semibold">'should'</strong>: Used for general advice, opinions, or what is generally the right thing to do. <br><em>Example: "You should eat more vegetables." (General, good advice)</em></li>
            <li><strong class="font-semibold">'had better'</strong>: Used for specific, urgent situations. <br><em>Example: "You'd better eat your vegetables before they get cold." (Specific situation, implied negative result)</em></li>
          </ul>
        </div>
      </div>

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-primary">Core Concept: It's time...</h3>
          <p class="text-sm text-muted-foreground">
            We use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">It's time...</code> to say that something is <strong class="font-semibold">overdue</strong> and should be done now or soon. The structure can be critical or simply a statement of necessity. We often use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">It's high time</code> or <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">It's about time</code> for extra emphasis.
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Structure 1: With Past Simple</h4>
          <div class="p-4 bg-muted/50 rounded-md">
            <p class="font-mono text-sm"><span class="font-bold text-blue-600">It's time</span> + Subject + <span class="font-bold text-purple-600">past simple verb</span></p>
          </div>
          <p class="text-sm">This is a <strong class="font-semibold">hypothetical</strong> or <strong class="font-semibold">subjunctive</strong> use. The past tense doesn't refer to the past; it refers to an <strong class="font-semibold">unreal present</strong> (the action isn't happening, but it should be).</p>
          <p class="text-xs text-muted-foreground italic">Example: "It's 2 a.m. It's time we <span class="font-semibold">went</span> home." (We are not going home yet, but we should.)</p>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Structure 2: With Infinitive</h4>
          <div class="p-4 bg-muted/50 rounded-md">
            <p class="font-mono text-sm"><span class="font-bold text-blue-600">It's time</span> + (for + object) + <span class="font-bold text-purple-600">to-infinitive</span></p>
          </div>
          <p class="text-xs text-muted-foreground italic">Example: "It's time <span class="font-semibold">to go</span> home." or "It's time <span class="font-semibold">for us to go</span> home."</p>
        </div>
      </div>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #practice: Interactive Questions                                        -->
    <!-- ======================================================================= -->
    <template #practice>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-6">
          <h3 class="text-lg font-semibold">Practice Exercises</h3>
          <p class="text-sm text-muted-foreground">Complete the following tasks. Precision is key.</p>
        </div>
        <div class="p-6 pt-0 space-y-8">
          <!-- Render all questions -->
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-medium text-sm">
              <span class="font-bold mr-2">{{ index + 1 }}.</span>
              <span v-if="q.type !== 'sentence-rewrite'">{{ q.text }}</span>
              <span v-else>{{ q.prompt }}</span>
            </p>
            
            <!-- Input Type: Fill-in -->
            <input v-if="q.type === 'fill-in'" type="text" v-model="q.userAnswer" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Type your answer...">
            
            <!-- Input Type: Fill-in Verb -->
            <input v-if="q.type === 'fill-in-verb'" type="text" v-model="q.userAnswer" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Enter the correct verb form...">

            <!-- Input Type: Multiple Choice -->
            <div v-if="q.type === 'multiple-choice'" class="space-y-2">
              <label v-for="option in q.options" :key="option" class="flex items-center space-x-2 p-2 rounded-md border has-[:checked]:border-primary has-[:checked]:bg-muted">
                <input type="radio" :name="`q${q.id}`" :value="option" v-model="q.userAnswer" class="form-radio h-4 w-4 text-primary focus:ring-primary" />
                <span>{{ option }}</span>
              </label>
            </div>
            
            <!-- Input Type: Sentence Rewrite -->
            <textarea v-if="q.type === 'sentence-rewrite'" v-model="q.userAnswer" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Rewrite the sentence here..."></textarea>
            
            <!-- Input Type: Complex Fill-in -->
            <div v-if="q.type === 'fill-in-complex'" class="flex flex-col sm:flex-row gap-2">
              <input type="text" v-model="q.userAnswers[0]" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="First blank...">
              <input type="text" v-model="q.userAnswers[1]" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Second blank...">
            </div>

            <!-- Input Type: Context Choice -->
             <div v-if="q.type === 'context-choice'" class="space-y-2">
              <label v-for="option in q.options" :key="option" class="flex items-center space-x-2 p-2 rounded-md border has-[:checked]:border-primary has-[:checked]:bg-muted">
                <input type="radio" :name="`q${q.id}`" :value="option" v-model="q.userAnswer" class="form-radio h-4 w-4 text-primary focus:ring-primary" />
                <span>{{ option }}</span>
              </label>
            </div>

          </div>
        </div>
        <div class="flex items-center p-6 pt-0">
          <button @click="validateAnswers" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Check My Answers & Get Feedback
          </button>
        </div>
      </div>
    </template>
    
    <!-- ======================================================================= -->
    <!-- #result: Detailed Score & Explanations                                  -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="results-section" class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-2xl font-bold tracking-tight">Your Results</h3>
            <p class="text-sm text-muted-foreground">An analysis of your performance.</p>
          </div>
          <div class="text-right border-l-4 p-3 rounded-r-md" :class="[scorePercentage >= 80 ? 'border-green-500' : scorePercentage >= 50 ? 'border-yellow-500' : 'border-red-500']">
            <p class="text-sm font-medium text-muted-foreground">SCORE</p>
            <p class="text-3xl font-bold" :class="getScoreColor(scorePercentage)">
              {{ score }} / {{ totalQuestions }} ({{ scorePercentage }}%)
            </p>
          </div>
        </div>
        <div class="p-6 pt-0 space-y-6">
          <div v-for="(result, index) in results" :key="result.id" class="p-4 rounded-md" :class="result.isCorrect ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-red-500/10 border-l-4 border-red-500'">
            <p class="font-semibold text-sm mb-2">
              Question {{ index + 1 }} - 
              <span :class="result.isCorrect ? 'text-green-600' : 'text-red-600'">
                {{ result.isCorrect ? 'Correct' : 'Incorrect' }}
              </span>
            </p>
            <div class="space-y-3 text-sm">
              <p v-if="result.prompt" class="italic text-muted-foreground"><strong>Prompt:</strong> {{ result.prompt }}</p>
              <p v-else class="italic text-muted-foreground"><strong>Question:</strong> {{ result.questionText }}</p>

              <div class="p-2 bg-background/50 rounded-md">
                <p><strong>Your Answer:</strong> <span class="font-mono" :class="!result.isCorrect ? 'text-red-600 line-through' : 'text-green-600'">{{ result.userAnswer || 'No answer' }}</span></p>
                <p v-if="!result.isCorrect"><strong>Correct Answer:</strong> <span class="font-mono text-green-600">{{ result.correctAnswer }}</span></p>
              </div>

              <div>
                <strong class="font-medium text-primary">Teacher's Note:</strong>
                <p class="text-muted-foreground">{{ result.explanation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </GrammarLayout>
</template>

<style scoped>
/* Scoped styles for this page to simulate some of the UI library features if not present globally */
.has-[:checked]:border-primary {
  border-color: #1a73e8; /* A generic primary color */
}
.has-[:checked]:bg-muted {
  background-color: #f1f5f9;
}
.text-primary {
  color: #1a73e8;
}
.bg-primary {
  background-color: #1a73e8;
}
.text-primary-foreground {
  color: white;
}
.hover\:bg-primary\/90:hover {
  background-color: #1867cf;
}
.text-destructive {
  color: #d93025;
}
.border-input {
  border-color: #d1d5db;
}
.bg-background {
  background-color: #ffffff;
}
.bg-card {
  background-color: #ffffff;
}
.text-card-foreground {
  color: #0f172a;
}
.text-muted-foreground {
  color: #64748b;
}
.bg-muted {
  background-color: #f1f5f9;
}
.bg-muted\/50 {
  background-color: rgba(241, 245, 249, 0.5);
}
.form-radio {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}
.form-radio::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #1a73e8;
}
.form-radio:checked::before {
  transform: scale(1);
}

/* Dark mode basic compatibility */
@media (prefers-color-scheme: dark) {
  .bg-background, .bg-card { background-color: #0c0a09; }
  .text-card-foreground { color: #f2f2f2; }
  .border-input { border-color: #444; }
  .text-muted-foreground { color: #a1a1aa; }
  .bg-muted { background-color: #27272a; }
  .bg-muted\/50 { background-color: rgba(39, 39, 42, 0.5); }
  .has-[:checked]:bg-muted { background-color: #27272a; }
}
</style>
