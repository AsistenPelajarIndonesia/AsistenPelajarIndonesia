<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <!-- Header -->
    <header class="bg-white shadow-lg border-b-4 border-indigo-500">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Grammar Mastery Hub</h1>
              <p class="text-sm text-gray-600">Chapter 1: Present Tenses Mastery</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Progress</p>
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  :style="`width: ${overallProgress}%`"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ Math.round(overallProgress) }}% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Learning Path Navigator -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Your Learning Journey</h2>
          <div class="flex space-x-2">
            <button 
              v-for="(section, index) in sections" 
              :key="index"
              @click="currentSection = index"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                currentSection === index 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              {{ section.title }}
            </button>
          </div>
        </div>

        <!-- Section Progress Bar -->
        <div class="bg-white rounded-lg p-4 shadow-md">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-800">{{ sections[currentSection].title }}</h3>
            <span class="text-sm text-gray-600">{{ sections[currentSection].completed }}/{{ sections[currentSection].total }} completed</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              :style="`width: ${(sections[currentSection].completed / sections[currentSection].total) * 100}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Theory & Examples Panel -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <span class="text-blue-600 text-sm">📚</span>
              </span>
              Grammar Guide
            </h3>
            
            <div class="space-y-4">
              <div v-if="currentSection === 0">
                <h4 class="font-medium text-gray-700 mb-2">Present Simple</h4>
                <div class="bg-blue-50 rounded-lg p-4 mb-3">
                  <p class="text-sm text-gray-700 mb-2"><strong>Form:</strong> Subject + base verb (+ s/es for he/she/it)</p>
                  <p class="text-sm text-gray-700 mb-2"><strong>Use:</strong> Regular actions, facts, habits</p>
                  <div class="mt-3">
                    <p class="text-xs text-gray-600 mb-1">✅ Examples:</p>
                    <ul class="text-xs text-gray-600 space-y-1">
                      <li>• "I work every day"</li>
                      <li>• "She speaks three languages"</li>
                      <li>• "The sun rises in the east"</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div v-if="currentSection === 1">
                <h4 class="font-medium text-gray-700 mb-2">Present Continuous</h4>
                <div class="bg-green-50 rounded-lg p-4 mb-3">
                  <p class="text-sm text-gray-700 mb-2"><strong>Form:</strong> am/is/are + verb-ing</p>
                  <p class="text-sm text-gray-700 mb-2"><strong>Use:</strong> Actions happening now, temporary situations</p>
                  <div class="mt-3">
                    <p class="text-xs text-gray-600 mb-1">✅ Examples:</p>
                    <ul class="text-xs text-gray-600 space-y-1">
                      <li>• "I am studying now"</li>
                      <li>• "They are working on a project"</li>
                      <li>• "It is raining outside"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="currentSection === 2">
                <h4 class="font-medium text-gray-700 mb-2">Present Perfect</h4>
                <div class="bg-purple-50 rounded-lg p-4 mb-3">
                  <p class="text-sm text-gray-700 mb-2"><strong>Form:</strong> have/has + past participle</p>
                  <p class="text-sm text-gray-700 mb-2"><strong>Use:</strong> Past actions with present relevance</p>
                  <div class="mt-3">
                    <p class="text-xs text-gray-600 mb-1">✅ Examples:</p>
                    <ul class="text-xs text-gray-600 space-y-1">
                      <li>• "I have finished my homework"</li>
                      <li>• "She has lived here for 5 years"</li>
                      <li>• "We have just arrived"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- AI Grammar Assistant -->
            <div class="mt-6 border-t pt-4">
              <h4 class="font-medium text-gray-700 mb-3">🤖 AI Grammar Assistant</h4>
              <div class="space-y-2">
                <input 
                  v-model="grammarQuestion"
                  @keyup.enter="askGrammarQuestion"
                  placeholder="Ask me anything about present tenses..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                <button 
                  @click="askGrammarQuestion"
                  :disabled="!grammarQuestion.trim() || isLoadingAI"
                  class="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isLoadingAI ? 'Thinking...' : 'Ask Assistant' }}
                </button>
              </div>
              
              <div v-if="aiResponse" class="mt-3 bg-gray-50 rounded-lg p-3">
                <p class="text-sm text-gray-700">{{ aiResponse }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Practice Area -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-800">Interactive Practice</h3>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Streak:</span>
                  <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">{{ streak }}🔥</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Score:</span>
                  <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">{{ score }}</span>
                </div>
              </div>
            </div>

            <!-- Exercise Area -->
            <div v-if="currentExercise" class="space-y-6">
              <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-gray-800">{{ currentExercise.type }}</h4>
                  <span class="text-sm text-gray-600">Question {{ currentExerciseIndex + 1 }} of {{ exercises.length }}</span>
                </div>
                
                <p class="text-gray-700 mb-4 text-lg">{{ currentExercise.question }}</p>
                
                <!-- Multiple Choice -->
                <div v-if="currentExercise.type === 'Multiple Choice'" class="space-y-3">
                  <button
                    v-for="(option, index) in currentExercise.options"
                    :key="index"
                    @click="selectAnswer(option)"
                    :class="[
                      'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
                      selectedAnswer === option 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    ]"
                  >
                    <span class="font-medium text-gray-700">{{ String.fromCharCode(65 + index) }}.</span>
                    <span class="ml-2 text-gray-700">{{ option }}</span>
                  </button>
                </div>

                <!-- Fill in the Blank -->
                <div v-if="currentExercise.type === 'Fill in the Blank'" class="space-y-4">
                  <div class="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <p class="text-gray-700 text-lg leading-relaxed">
                      <span v-for="(part, index) in currentExercise.questionParts" :key="index">
                        {{ part }}
                        <input 
                          v-if="index < currentExercise.questionParts.length - 1"
                          v-model="fillAnswers[index]"
                          @input="updateFillAnswer(index, $event.target.value)"
                          class="mx-2 px-3 py-1 border-b-2 border-indigo-300 bg-transparent focus:outline-none focus:border-indigo-500 text-indigo-600 font-medium min-w-[100px]"
                          :placeholder="`blank ${index + 1}`"
                        >
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Sentence Transformation -->
                <div v-if="currentExercise.type === 'Sentence Transformation'" class="space-y-4">
                  <div class="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                    <p class="text-sm text-yellow-800 mb-2">Transform this sentence:</p>
                    <p class="font-medium text-gray-800">{{ currentExercise.original }}</p>
                  </div>
                  <textarea
                    v-model="transformationAnswer"
                    placeholder="Write your transformed sentence here..."
                    class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows="3"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="flex items-center justify-between mt-6">
                  <button 
                    @click="checkAnswer"
                    :disabled="!canSubmit"
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Check Answer
                  </button>
                  
                  <button 
                    v-if="showNext"
                    @click="nextExercise"
                    class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
                  >
                    Next Question →
                  </button>
                </div>

                <!-- Feedback -->
                <div v-if="feedback" class="mt-4">
                  <div :class="[
                    'p-4 rounded-lg border-l-4',
                    feedback.isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                  ]">
                    <div class="flex items-center mb-2">
                      <span :class="feedback.isCorrect ? 'text-green-600' : 'text-red-600'" class="font-medium">
                        {{ feedback.isCorrect ? '✅ Correct!' : '❌ Not quite right' }}
                      </span>
                    </div>
                    <p class="text-gray-700 text-sm">{{ feedback.explanation }}</p>
                    <div v-if="!feedback.isCorrect && currentExercise.correctAnswer" class="mt-2">
                      <p class="text-sm text-gray-600">
                        <strong>Correct answer:</strong> {{ currentExercise.correctAnswer }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Practice Stats -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-blue-600">{{ stats.questionsAnswered }}</div>
                <div class="text-sm text-blue-800">Questions Answered</div>
              </div>
              <div class="bg-green-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-green-600">{{ Math.round(stats.accuracy) }}%</div>
                <div class="text-sm text-green-800">Accuracy Rate</div>
              </div>
              <div class="bg-purple-50 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-purple-600">{{ stats.timeSpent }}</div>
                <div class="text-sm text-purple-800">Minutes Practiced</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Motivational Footer -->
      <div class="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 class="text-xl font-semibold mb-2">{{ motivationalMessage }}</h3>
        <p class="text-indigo-100">Keep practicing! Every sentence you master makes you a better English speaker.</p>
        <div class="mt-4 flex items-center justify-center space-x-8">
          <div class="text-center">
            <div class="text-2xl font-bold">{{ streak }}</div>
            <div class="text-sm text-indigo-200">Day Streak</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ Math.round(overallProgress) }}%</div>
            <div class="text-sm text-indigo-200">Overall Progress</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.questionsAnswered }}</div>
            <div class="text-sm text-indigo-200">Total Questions</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Page metadata
useHead({
  title: 'Grammar Mastery Hub - Present Tenses',
  meta: [
    { name: 'description', content: 'Master English present tenses with interactive exercises inspired by Raymond Murphy\'s English Grammar in Use' }
  ]
})

// Reactive state
const currentSection = ref(0)
const currentExerciseIndex = ref(0)
const selectedAnswer = ref('')
const fillAnswers = ref([])
const transformationAnswer = ref('')
const feedback = ref(null)
const showNext = ref(false)
const score = ref(0)
const streak = ref(1)
const startTime = ref(Date.now())

// AI Assistant
const grammarQuestion = ref('')
const aiResponse = ref('')
const isLoadingAI = ref(false)

// Learning sections
const sections = ref([
  { title: 'Present Simple', completed: 0, total: 8 },
  { title: 'Present Continuous', completed: 0, total: 8 },
  { title: 'Present Perfect', completed: 0, total: 8 }
])

// Exercise database with various types
const exercises = ref([
  // Present Simple Exercises
  {
    type: 'Multiple Choice',
    section: 0,
    question: 'Choose the correct form: "She _____ to work every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: 'With third person singular (he/she/it), we add -s or -es to the base verb in present simple.'
  },
  {
    type: 'Fill in the Blank',
    section: 0,
    question: 'Complete the sentence with the correct form of the verb in brackets.',
    questionParts: ['I usually ', ' (drink) coffee in the morning, but today I ', ' (drink) tea.'],
    correctAnswers: ['drink', 'am drinking'],
    explanation: 'First blank uses present simple for habits, second uses present continuous for current action.'
  },
  {
    type: 'Sentence Transformation',
    section: 0,
    question: 'Transform this sentence to negative form:',
    original: 'He plays football every weekend.',
    correctAnswer: 'He doesn\'t play football every weekend.',
    explanation: 'For negative present simple with third person singular, use "doesn\'t" + base verb.'
  },
  
  // Present Continuous Exercises
  {
    type: 'Multiple Choice',
    section: 1,
    question: 'What is the correct present continuous form: "They _____ a movie right now."',
    options: ['watch', 'watches', 'are watching', 'watching'],
    correctAnswer: 'are watching',
    explanation: 'Present continuous uses am/is/are + verb-ing for actions happening now.'
  },
  {
    type: 'Fill in the Blank',
    section: 1,
    question: 'Complete with the correct present continuous form.',
    questionParts: ['Look! It ', ' (rain) heavily outside. We ', ' (stay) inside today.'],
    correctAnswers: ['is raining', 'are staying'],
    explanation: 'Use present continuous for actions happening right now or planned future actions.'
  },
  
  // Present Perfect Exercises
  {
    type: 'Multiple Choice',
    section: 2,
    question: 'Choose the correct present perfect form: "I _____ my homework already."',
    options: ['finished', 'have finished', 'finish', 'am finishing'],
    correctAnswer: 'have finished',
    explanation: 'Present perfect (have/has + past participle) shows completed actions with present relevance.'
  },
  {
    type: 'Sentence Transformation',
    section: 2,
    question: 'Transform to present perfect:',
    original: 'She lived in London for 5 years. (She still lives there)',
    correctAnswer: 'She has lived in London for 5 years.',
    explanation: 'Present perfect shows actions that started in the past and continue to the present.'
  }
])

// Computed properties
const currentExercise = computed(() => {
  const sectionExercises = exercises.value.filter(ex => ex.section === currentSection.value)
  return sectionExercises[currentExerciseIndex.value] || null
})

const canSubmit = computed(() => {
  if (!currentExercise.value) return false
  
  switch (currentExercise.value.type) {
    case 'Multiple Choice':
      return selectedAnswer.value !== ''
    case 'Fill in the Blank':
      return fillAnswers.value.some(answer => answer && answer.trim())
    case 'Sentence Transformation':
      return transformationAnswer.value.trim() !== ''
    default:
      return false
  }
})

const overallProgress = computed(() => {
  const totalCompleted = sections.value.reduce((sum, section) => sum + section.completed, 0)
  const totalQuestions = sections.value.reduce((sum, section) => sum + section.total, 0)
  return (totalCompleted / totalQuestions) * 100
})

const stats = computed(() => {
  const timeSpent = Math.floor((Date.now() - startTime.value) / 60000)
  const totalAnswered = sections.value.reduce((sum, section) => sum + section.completed, 0)
  const accuracy = totalAnswered > 0 ? (score.value / totalAnswered) * 100 : 0
  
  return {
    questionsAnswered: totalAnswered,
    accuracy,
    timeSpent: timeSpent || 1
  }
})

const motivationalMessage = computed(() => {
  const messages = [
    "You're making excellent progress!",
    "Grammar mastery is within your reach!",
    "Every question brings you closer to fluency!",
    "Your dedication to learning is inspiring!",
    "Keep up the fantastic work!",
    "You're becoming a grammar expert!"
  ]
  return messages[Math.floor(Math.random() * messages.length)]
})

// Methods
const selectAnswer = (answer) => {
  selectedAnswer.value = answer
}

const updateFillAnswer = (index, value) => {
  while (fillAnswers.value.length <= index) {
    fillAnswers.value.push('')
  }
  fillAnswers.value[index] = value
}

const checkAnswer = () => {
  if (!currentExercise.value) return
  
  let isCorrect = false
  let userAnswer = ''
  
  switch (currentExercise.value.type) {
    case 'Multiple Choice':
      isCorrect = selectedAnswer.value === currentExercise.value.correctAnswer
      userAnswer = selectedAnswer.value
      break
      
    case 'Fill in the Blank':
      const correctAnswers = currentExercise.value.correctAnswers || []
      isCorrect = fillAnswers.value.every((answer, index) => {
        if (!correctAnswers[index]) return true
        return answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
      })
      userAnswer = fillAnswers.value.join(', ')
      break
      
    case 'Sentence Transformation':
      const userTransform = transformationAnswer.value.trim().toLowerCase()
      const correctTransform = currentExercise.value.correctAnswer.toLowerCase()
      isCorrect = userTransform === correctTransform || 
                 userTransform.includes(correctTransform.replace(/[^\w\s]/g, ''))
      userAnswer = transformationAnswer.value
      break
  }
  
  // Update score and streak
  if (isCorrect) {
    score.value++
    streak.value++
  } else {
    streak.value = Math.max(0, streak.value - 1)
  }
  
  // Update section progress
  sections.value[currentSection.value].completed++
  
  feedback.value = {
    isCorrect,
    explanation: currentExercise.value.explanation,
    userAnswer
  }
  
  showNext.value = true
}

const nextExercise = () => {
  const sectionExercises = exercises.value.filter(ex => ex.section === currentSection.value)
  
  if (currentExerciseIndex.value < sectionExercises.length - 1) {
    currentExerciseIndex.value++
  } else {
    // Move to next section or show completion
    if (currentSection.value < sections.value.length - 1) {
      currentSection.value++
      currentExerciseIndex.value = 0
    } else {
      // All exercises completed
      alert('Congratulations! You\'ve completed all present tense exercises!')
    }
  }
  
  // Reset form state
  selectedAnswer.value = ''
  fillAnswers.value = []
  transformationAnswer.value = ''
  feedback.value = null
  showNext.value = false
}

// AI Grammar Assistant (Mock implementation - replace with actual Groq API)
const askGrammarQuestion = async () => {
  if (!grammarQuestion.value.trim()) return
  
  isLoadingAI.value = true
  
  try {
    // Mock AI response - replace with actual Groq API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const responses = [
      "Present simple is used for habits, facts, and regular actions. For example: 'I eat breakfast every morning.'",
      "Present continuous shows actions happening right now or temporary situations. Use am/is/are + verb-ing.",
      "Present perfect connects past actions to the present. It uses have/has + past participle.",
      "The key difference is timing: simple (general/habits), continuous (now), perfect (past→present connection).",
      "Remember: third person singular (he/she/it) adds -s in present simple, but not in continuous or perfect forms."
    ]
    
    aiResponse.value = responses[Math.floor(Math.random() * responses.length)]
  } catch (error) {
    aiResponse.value = "I'm having trouble connecting right now. Please try again later!"
  } finally {
    isLoadingAI.value = false
    grammarQuestion.value = ''
  }
}

// Watchers
watch(currentSection, () => {
  currentExerciseIndex.value = 0
  selectedAnswer.value = ''
  fillAnswers.value = []
  transformationAnswer.value = ''
  feedback.value = null
  showNext.value = false
})

// Lifecycle
onMounted(() => {
  // Initialize any needed data
  console.log('Grammar Mastery Hub initialized!')
})
</script>

<style scoped>
/* Custom animations and transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling for sticky elements */
html {
  scroll-behavior: smooth;
}

/* Custom gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Interactive button hover effects */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Progress bar animation */
.bg-indigo-600, .bg-green-400 {
  transition: width 0.5s ease-in-out;
}

/* Input focus effects */
input:focus, textarea:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
</style>