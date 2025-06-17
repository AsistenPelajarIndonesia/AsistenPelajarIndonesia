<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI Question Generator
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Generate custom multiple choice questions on any topic
        </p>
      </div>

      <!-- Generator Form -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form @submit.prevent="generateQuestions" class="space-y-6">
            <!-- Topic Input -->
            <div>
              <label for="topic" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic or Subject
              </label>
              <textarea
                id="topic"
                v-model="topic"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter the topic you want to generate questions about..."
                required
              ></textarea>
            </div>

            <!-- Language Selection -->
            <div>
              <label for="language" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                id="language"
                v-model="selectedLanguage"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a language</option>
                <option value="english">English</option>
                <option value="indonesian">Indonesian</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>

            <!-- Number of Questions -->
            <div>
              <label for="questionCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Questions
              </label>
              <select
                id="questionCount"
                v-model="questionCount"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>

            <!-- Generate Button -->
            <button
              type="submit"
              :disabled="isGenerating || !topic || !selectedLanguage"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
            >
              <svg v-if="isGenerating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isGenerating ? 'Generating...' : 'Create Questions' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Generated Questions -->
      <div v-if="questions.length > 0" class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Generated Questions
          </h2>
          
          <!-- Quiz Interface -->
          <div v-if="!showResults">
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
                </span>
                <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {{ questions[currentQuestionIndex]?.question }}
              </h3>
              
              <div class="space-y-3">
                <div 
                  v-for="(option, index) in questions[currentQuestionIndex]?.options" 
                  :key="index"
                  class="cursor-pointer"
                  @click="selectAnswer(index)"
                >
                  <div 
                    class="p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    :class="{
                      'border-blue-500 bg-blue-50 dark:bg-blue-900/20': userAnswers[currentQuestionIndex] === index,
                      'border-gray-300 dark:border-gray-600': userAnswers[currentQuestionIndex] !== index
                    }"
                  >
                    <div class="flex items-center">
                      <div 
                        class="w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center"
                        :class="{
                          'border-blue-500 bg-blue-500': userAnswers[currentQuestionIndex] === index,
                          'border-gray-400': userAnswers[currentQuestionIndex] !== index
                        }"
                      >
                        <div v-if="userAnswers[currentQuestionIndex] === index" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span class="text-gray-900 dark:text-white">{{ option }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <button
                @click="previousQuestion"
                :disabled="currentQuestionIndex === 0"
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 rounded-md transition duration-200"
              >
                Previous
              </button>
              
              <button
                v-if="currentQuestionIndex < questions.length - 1"
                @click="nextQuestion"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
              >
                Next
              </button>
              
              <button
                v-else
                @click="finishQuiz"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200"
              >
                Finish Quiz
              </button>
            </div>
          </div>

          <!-- Results -->
          <div v-else>
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h3>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                You scored {{ score }} out of {{ questions.length }} ({{ Math.round((score / questions.length) * 100) }}%)
              </p>
            </div>

            <!-- Detailed Results -->
            <div class="space-y-4">
              <div 
                v-for="(question, index) in questions" 
                :key="index"
                class="border rounded-lg p-4"
                :class="{
                  'border-green-300 bg-green-50 dark:bg-green-900/10': userAnswers[index] === question.correctAnswer,
                  'border-red-300 bg-red-50 dark:bg-red-900/10': userAnswers[index] !== question.correctAnswer
                }"
              >
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ index + 1 }}. {{ question.question }}</h4>
                  <div class="flex items-center">
                    <svg 
                      v-if="userAnswers[index] === question.correctAnswer" 
                      class="w-5 h-5 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <svg 
                      v-else 
                      class="w-5 h-5 text-red-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                </div>
                
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Your answer:</strong> {{ question.options[userAnswers[index]] || 'Not answered' }}</p>
                  <p><strong>Correct answer:</strong> {{ question.options[question.correctAnswer] }}</p>
                  <p v-if="question.explanation" class="mt-2"><strong>Explanation:</strong> {{ question.explanation }}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-center space-x-4 mt-8">
              <button
                @click="resetQuiz"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
              >
                Take Quiz Again
              </button>
              <button
                @click="generateNewQuestions"
                class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200"
              >
                Generate New Questions
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="max-w-2xl mx-auto mt-4">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 dark:text-red-300">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface GeneratedQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

const { chatCompletion } = useGroqClient()

// Form data
const topic = ref('')
const selectedLanguage = ref('')
const questionCount = ref('10')

// Quiz state
const questions = ref<GeneratedQuestion[]>([])
const currentQuestionIndex = ref(0)
const userAnswers = ref<number[]>([])
const showResults = ref(false)
const score = ref(0)

// UI state
const isGenerating = ref(false)
const errorMessage = ref('')

const generateQuestions = async () => {
  if (!topic.value || !selectedLanguage.value) return
  
  isGenerating.value = true
  errorMessage.value = ''
  
  try {
    const systemPrompt = `You are an expert question generator. Create ${questionCount.value} multiple choice questions about the given topic in ${selectedLanguage.value}. 
    
    Return a JSON object with this exact structure:
    {
      "questions": [
        {
          "id": "1",
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Brief explanation of why this is correct"
        }
      ]
    }
    
    Requirements:
    - Questions should be educational and appropriate
    - Each question must have exactly 4 options
    - correctAnswer should be the index (0-3) of the correct option
    - Include brief explanations
    - Questions should vary in difficulty
    - Use proper ${selectedLanguage.value} language`

    const userPrompt = `Generate ${questionCount.value} multiple choice questions about: ${topic.value}`

    const response = await chatCompletion(systemPrompt, userPrompt)
    const content = response.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('No content received from AI')
    }

    const parsedResponse = JSON.parse(content)
    
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error('Invalid response format from AI')
    }

    questions.value = parsedResponse.questions
    userAnswers.value = new Array(questions.value.length).fill(-1)
    currentQuestionIndex.value = 0
    showResults.value = false
    score.value = 0
    
  } catch (error) {
    console.error('Error generating questions:', error)
    errorMessage.value = 'Failed to generate questions. Please try again.'
  } finally {
    isGenerating.value = false
  }
}

const selectAnswer = (optionIndex: number) => {
  userAnswers.value[currentQuestionIndex.value] = optionIndex
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const finishQuiz = () => {
  // Calculate score
  score.value = 0
  for (let i = 0; i < questions.value.length; i++) {
    if (userAnswers.value[i] === questions.value[i].correctAnswer) {
      score.value++
    }
  }
  showResults.value = true
}

const resetQuiz = () => {
  userAnswers.value = new Array(questions.value.length).fill(-1)
  currentQuestionIndex.value = 0
  showResults.value = false
  score.value = 0
}

const generateNewQuestions = () => {
  questions.value = []
  userAnswers.value = []
  currentQuestionIndex.value = 0
  showResults.value = false
  score.value = 0
  topic.value = ''
  selectedLanguage.value = ''
}
</script>