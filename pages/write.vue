<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
    <!-- Navigation Header -->
    <nav class="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <BookOpen class="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span class="ml-2 text-xl font-bold text-slate-900 dark:text-white">TOEFL Writing Master</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <Button
              @click="toggleTheme"
              variant="ghost"
              size="sm"
              class="p-2"
            >
              <Sun v-if="isDark" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
            </Button>
            <Badge variant="secondary" class="text-sm">
              {{ formatTime(timeRemaining) }}
            </Badge>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Test Selection Phase -->
      <div v-if="currentPhase === 'selection'" class="space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            TOEFL Writing Practice
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Master the TOEFL Writing section with AI-generated practice tests. Choose your task type and difficulty level to get started.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Task 1: Integrated Writing -->
          <Card class="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300 dark:hover:border-blue-600">
            <div class="text-center space-y-4">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <FileText class="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Integrated Writing</h3>
              <p class="text-slate-600 dark:text-slate-300">
                Read a passage, listen to a lecture, and write a response summarizing the relationship between them.
              </p>
              <div class="space-y-2">
                <p class="text-sm text-slate-500 dark:text-slate-400">⏱️ 20 minutes • 📝 150-225 words</p>
              </div>
              <Button 
                @click="enhancedStartTest('integrated')" 
                class="w-full"
                :disabled="isGenerating"
              >
                <Loader2 v-if="isGenerating && selectedTask === 'integrated'" class="h-4 w-4 mr-2 animate-spin" />
                Start Integrated Writing
              </Button>
            </div>
          </Card>

          <!-- Task 2: Independent Writing -->
          <Card class="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300 dark:hover:border-green-600">
            <div class="text-center space-y-4">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <PenTool class="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Independent Writing</h3>
              <p class="text-slate-600 dark:text-slate-300">
                Express your opinion on a given topic with supporting reasons and examples.
              </p>
              <div class="space-y-2">
                <p class="text-sm text-slate-500 dark:text-slate-400">⏱️ 30 minutes • 📝 300+ words</p>
              </div>
              <Button 
                @click="enhancedStartTest('independent')" 
                variant="secondary"
                class="w-full"
                :disabled="isGenerating"
              >
                <Loader2 v-if="isGenerating && selectedTask === 'independent'" class="h-4 w-4 mr-2 animate-spin" />
                Start Independent Writing
              </Button>
            </div>
          </Card>
        </div>

        <!-- Difficulty Selection -->
        <div class="max-w-2xl mx-auto">
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4 text-center">Select Difficulty Level</h3>
          <div class="grid grid-cols-3 gap-4">
            <Button
              v-for="level in difficultyLevels"
              :key="level.value"
              @click="selectedDifficulty = level.value"
              :variant="selectedDifficulty === level.value ? 'default' : 'outline'"
              class="p-4 h-auto flex flex-col items-center space-y-2"
            >
              <component :is="level.icon" class="h-6 w-6" />
              <span class="font-medium">{{ level.label }}</span>
              <span class="text-xs opacity-75">{{ level.description }}</span>
            </Button>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card class="p-4 text-center">
            <Trophy class="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h4 class="font-semibold text-slate-900 dark:text-white">Tests Completed</h4>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.testsCompleted }}</p>
          </Card>
          <Card class="p-4 text-center">
            <Target class="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 class="font-semibold text-slate-900 dark:text-white">Average Score</h4>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.averageScore }}/30</p>
          </Card>
          <Card class="p-4 text-center">
            <Clock class="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 class="font-semibold text-slate-900 dark:text-white">Practice Time</h4>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.totalTime }}h</p>
          </Card>
        </div>
      </div>

      <!-- Test Phase -->
      <div v-if="currentPhase === 'test'" class="space-y-6">
        <!-- Progress Bar -->
        <div class="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ currentTask?.type === 'integrated' ? 'Integrated Writing Task' : 'Independent Writing Task' }}
            </span>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
              Time Remaining: {{ formatTime(timeRemaining) }}
            </span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Left Panel: Instructions and Reading -->
          <div class="space-y-6">
            <!-- Instructions -->
            <Card class="p-6">
              <div class="flex items-center space-x-2 mb-4">
                <Info class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Instructions</h3>
              </div>
              <div class="prose dark:prose-invert max-w-none">
                <p class="text-slate-700 dark:text-slate-300">{{ currentTask?.instructions }}</p>
              </div>
            </Card>

            <!-- Reading Passage (for Integrated Writing) -->
            <Card v-if="currentTask?.type === 'integrated' && currentTask?.readingPassage" class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Reading Passage</h3>
                <Badge variant="outline">{{ Math.ceil(currentTask.readingPassage.split(' ').length / 200) }} min read</Badge>
              </div>
              <div class="prose dark:prose-invert max-w-none">
                <div class="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {{ currentTask.readingPassage }}
                </div>
              </div>
            </Card>

            <!-- Lecture Notes (for Integrated Writing) -->
            <Card v-if="currentTask?.type === 'integrated' && currentTask?.lectureNotes" class="p-6">
              <div class="flex items-center space-x-2 mb-4">
                <Volume2 class="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Lecture Summary</h3>
              </div>
              <div class="prose dark:prose-invert max-w-none">
                <div class="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {{ currentTask.lectureNotes }}
                </div>
              </div>
            </Card>

            <!-- Writing Prompt -->
            <Card class="p-6 border-l-4 border-l-blue-500">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3">Writing Prompt</h3>
              <div class="prose dark:prose-invert max-w-none">
                <p class="text-slate-700 dark:text-slate-300 font-medium">{{ currentTask?.prompt }}</p>
              </div>
            </Card>
          </div>

          <!-- Right Panel: Writing Area -->
          <div class="space-y-6">
            <!-- Writing Tools -->
            <Card class="p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Your Response</h3>
                <div class="flex items-center space-x-4">
                  <Badge :variant="wordCount < (currentTask?.type === 'integrated' ? 150 : 300) ? 'destructive' : 'default'">
                    {{ wordCount }} words
                  </Badge>
                  <Button @click="clearEssay" variant="ghost" size="sm">
                    <Trash2 class="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
              
              <!-- Essay Editor -->
              <div class="relative">
                <textarea
                  v-model="essay"
                  @input="updateWordCount"
                  :placeholder="currentTask?.type === 'integrated' 
                    ? 'Summarize the points made in the lecture and explain how they cast doubt on the specific points made in the reading passage...' 
                    : 'Do you agree or disagree with the following statement? Use specific reasons and examples to support your answer...'"
                  class="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                  :class="{ 'border-red-300 dark:border-red-600': wordCount < (currentTask?.type === 'integrated' ? 150 : 300) }"
                ></textarea>
                
                <!-- Word Count Indicator -->
                <div class="absolute bottom-2 right-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded">
                  {{ wordCount }} / {{ currentTask?.type === 'integrated' ? '150-225' : '300+' }} words
                </div>
              </div>

              <!-- Writing Tips -->
              <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-start space-x-2">
                  <Lightbulb class="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div class="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Tip:</strong> {{ getCurrentTip() }}
                  </div>
                </div>
              </div>
            </Card>

            <!-- Submit Button -->
            <Card class="p-4">
              <Button 
                @click="submitEssay" 
                class="w-full"
                :disabled="wordCount < (currentTask?.type === 'integrated' ? 150 : 300) || isSubmitting"
                size="lg"
              >
                <Loader2 v-if="isSubmitting" class="h-4 w-4 mr-2 animate-spin" />
                <Send v-else class="h-4 w-4 mr-2" />
                Submit Essay
              </Button>
              <p class="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                Minimum {{ currentTask?.type === 'integrated' ? '150' : '300' }} words required
              </p>
            </Card>
          </div>
        </div>
      </div>

      <!-- Results Phase -->
      <div v-if="currentPhase === 'results'" class="space-y-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Essay Submitted!</h2>
          <p class="text-lg text-slate-600 dark:text-slate-300">Your TOEFL writing task has been completed and analyzed.</p>
        </div>

        <!-- Score Overview -->
        <div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card class="p-6 text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ results.overallScore }}/30</div>
            <h4 class="font-semibold text-slate-900 dark:text-white">Overall Score</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ getScoreDescription(results.overallScore) }}</p>
          </Card>
          <Card class="p-6 text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{{ results.organization }}/5</div>
            <h4 class="font-semibold text-slate-900 dark:text-white">Organization</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">Structure & Flow</p>
          </Card>
          <Card class="p-6 text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ results.language }}/5</div>
            <h4 class="font-semibold text-slate-900 dark:text-white">Language Use</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">Grammar & Vocabulary</p>
          </Card>
          <Card class="p-6 text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">{{ results.development }}/5</div>
            <h4 class="font-semibold text-slate-900 dark:text-white">Development</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">Ideas & Examples</p>
          </Card>
        </div>

        <!-- Detailed Feedback -->
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card class="p-6">
            <div class="flex items-center space-x-2 mb-4">
              <ThumbsUp class="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Strengths</h3>
            </div>
            <ul class="space-y-2">
              <li v-for="strength in results.strengths" :key="strength" class="flex items-start space-x-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-slate-700 dark:text-slate-300">{{ strength }}</span>
              </li>
            </ul>
          </Card>

          <Card class="p-6">
            <div class="flex items-center space-x-2 mb-4">
              <AlertTriangle class="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Areas for Improvement</h3>
            </div>
            <ul class="space-y-2">
              <li v-for="improvement in results.improvements" :key="improvement" class="flex items-start space-x-2">
                <div class="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-slate-700 dark:text-slate-300">{{ improvement }}</span>
              </li>
            </ul>
          </Card>
        </div>

        <!-- Essay Review -->
        <Card class="max-w-4xl mx-auto p-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Essay</h3>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre class="whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-sans">{{ essay }}</pre>
          </div>
        </Card>

        <!-- Action Buttons -->
        <div class="flex flex-wrap justify-center gap-4">
          <Button @click="resetTest" variant="outline">
            <RotateCcw class="h-4 w-4 mr-2" />
            Try Another Test
          </Button>
          <Button @click="viewDetailedAnalysis">
            <BarChart3 class="h-4 w-4 mr-2" />
            Detailed Analysis
          </Button>
          <Button @click="generatePracticePlan" variant="secondary">
            <Target class="h-4 w-4 mr-2" />
            Study Plan
          </Button>
          <Button @click="exportResults" variant="outline">
            <FileText class="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button @click="shareResults" variant="ghost">
            <Send class="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  BookOpen, Sun, Moon, FileText, PenTool, Trophy, Target, Clock, 
  Info, Volume2, Lightbulb, Send, Trash2, CheckCircle, ThumbsUp, 
  AlertTriangle, RotateCcw, BarChart3, Loader2, Zap, Shield, Star
} from 'lucide-vue-next'


// Reactive state
const currentPhase = ref('selection') // 'selection', 'test', 'results'
const selectedTask = ref(null)
const selectedDifficulty = ref('intermediate')
const isDark = ref(false)
const isGenerating = ref(false)
const isSubmitting = ref(false)
const timeRemaining = ref(0)
const essay = ref('')
const wordCount = ref(0)
const currentTask = ref(null)
const timer = ref(null)

// Mock stats (in real app, would come from API/database)
const stats = ref({
  testsCompleted: 12,
  averageScore: 24,
  totalTime: 8.5
})

// Mock results (in real app, would come from AI analysis)
const results = ref({
  overallScore: 0,
  organization: 0,
  language: 0,
  development: 0,
  strengths: [],
  improvements: []
})

// Configuration
const difficultyLevels = ref([
  { value: 'beginner', label: 'Beginner', description: 'Basic topics', icon: Shield },
  { value: 'intermediate', label: 'Intermediate', description: 'Standard TOEFL', icon: Target },
  { value: 'advanced', label: 'Advanced', description: 'Challenging topics', icon: Star }
])

// Computed properties
const progressPercentage = computed(() => {
  if (!currentTask.value) return 0
  const totalTime = currentTask.value.type === 'integrated' ? 1200 : 1800 // 20 or 30 minutes in seconds
  return ((totalTime - timeRemaining.value) / totalTime) * 100
})

// Methods
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startTest = async (taskType) => {
  selectedTask.value = taskType
  isGenerating.value = true
  
  try {
    // Simulate AI generation (replace with actual Groq API call)
    await generateTestContent(taskType, selectedDifficulty.value)
    currentPhase.value = 'test'
    startTimer()
  } catch (error) {
    console.error('Error generating test:', error)
    // Handle error appropriately
  } finally {
    isGenerating.value = false
  }
}

const generateTestContent = async (taskType, difficulty) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  if (taskType === 'integrated') {
    currentTask.value = {
      type: 'integrated',
      instructions: `You have 20 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and how well your response presents the points in the lecture and their relationship to the reading passage. Typically, an effective response will be 150 to 225 words.`,
      readingPassage: `The Benefits of Remote Work

The concept of remote work has gained significant traction in recent years, with many companies embracing flexible work arrangements. Proponents of remote work argue that it offers numerous advantages for both employees and employers.

First, remote work significantly increases productivity. Without the distractions of a traditional office environment, employees can focus better on their tasks. Studies have shown that remote workers are 13% more productive than their office-based counterparts. The elimination of office interruptions, unnecessary meetings, and water cooler conversations allows workers to maintain deeper concentration periods.

Second, remote work reduces operational costs for companies. Businesses can save substantial amounts on office rent, utilities, office supplies, and maintenance. These savings can be redirected toward employee benefits, technology improvements, or business expansion. Some companies have reported cost reductions of up to 30% after implementing remote work policies.

Third, remote work improves employee satisfaction and work-life balance. Employees appreciate the flexibility to manage their personal responsibilities while maintaining professional commitments. This flexibility leads to reduced stress levels, better mental health, and increased job satisfaction. As a result, companies experience lower turnover rates and higher employee retention.`,
      lectureNotes: `Professor's Lecture Summary:

While remote work may seem beneficial in theory, the reality presents several significant challenges that advocates often overlook.

Regarding productivity, the professor argues that while some studies show increased productivity, they fail to account for the quality of work and collaboration. Remote workers often struggle with isolation and lack of immediate feedback, which can lead to mistakes going unnoticed for longer periods. The absence of spontaneous brainstorming sessions and collaborative problem-solving actually reduces innovation and creative output.

Concerning cost savings, the professor points out that companies may save on office expenses, but these savings are often offset by increased spending on technology infrastructure, cybersecurity measures, and home office stipends for employees. Additionally, the hidden costs of reduced team cohesion and training difficulties for new employees can be substantial and difficult to quantify.

As for employee satisfaction, while some workers appreciate flexibility, many struggle with the blurred boundaries between work and personal life. The professor cites research showing increased rates of burnout among remote workers who find it difficult to "switch off" from work. Furthermore, career advancement opportunities may be limited for remote workers who lack visibility and informal networking opportunities that come with office presence.`,
      prompt: `Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage.`
    }
    timeRemaining.value = 1200 // 20 minutes
  } else {
    currentTask.value = {
      type: 'independent',
      instructions: `You have 30 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and how well your response presents and develops your ideas. An effective response is typically 300 or more words.`,
      prompt: `Do you agree or disagree with the following statement?

"Social media has had a more positive than negative impact on society."

Use specific reasons and examples to support your answer.`
    }
    timeRemaining.value = 1800 // 30 minutes
  }
}

const startTimer = () => {
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      submitEssay()
    }
  }, 1000)
}

const updateWordCount = () => {
  wordCount.value = essay.value.trim().split(/\s+/).filter(word => word.length > 0).length
}

const clearEssay = () => {
  essay.value = ''
  wordCount.value = 0
}

const getCurrentTip = () => {
  const tips = {
    integrated: [
      "Start by clearly identifying the main points from both the reading and lecture.",
      "Use transition words to show relationships between ideas (however, in contrast, on the other hand).",
      "Don't express your personal opinion - focus on summarizing and comparing the sources.",
      "Make sure to explain HOW the lecture challenges the reading, not just WHAT it says.",
      "Use specific examples from both sources to support your summary."
    ],
    independent: [
      "Start with a clear thesis statement that directly answers the question.",
      "Use specific examples from your personal experience, observations, or knowledge.",
      "Organize your essay with clear paragraphs: introduction, 2-3 body paragraphs, conclusion.",
      "Use varied sentence structures and advanced vocabulary when possible.",
      "Make sure each body paragraph has a clear topic sentence and supporting details."
    ]
  }
  
  const currentTips = tips[currentTask.value?.type] || tips.independent
  return currentTips[Math.floor(Math.random() * currentTips.length)]
}

const submitEssay = async () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate AI analysis (replace with actual Groq API call)
    await analyzeEssay()
    currentPhase.value = 'results'
    updateStats()
  } catch (error) {
    console.error('Error analyzing essay:', error)
  } finally {
    isSubmitting.value = false
  }
}

const analyzeEssay = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Mock analysis based on essay content and task type
  const essayLength = wordCount.value
  const taskType = currentTask.value.type
  
  // Calculate scores based on various factors
  let organizationScore = Math.min(5, Math.floor(essayLength / 60) + 2)
  let languageScore = Math.min(5, Math.floor(essayLength / 80) + 2)
  let developmentScore = Math.min(5, Math.floor(essayLength / 70) + 2)
  
  // Adjust for task type
  if (taskType === 'integrated') {
    organizationScore = Math.min(5, organizationScore + (essayLength >= 150 ? 1 : -1))
    developmentScore = Math.min(5, developmentScore + (essay.value.includes('lecture') && essay.value.includes('reading') ? 1 : -1))
  } else {
    developmentScore = Math.min(5, developmentScore + (essayLength >= 300 ? 1 : -1))
  }
  
  const overallScore = Math.round(((organizationScore + languageScore + developmentScore) / 15) * 30)
  
  results.value = {
    overallScore,
    organization: organizationScore,
    language: languageScore,
    development: developmentScore,
    strengths: generateStrengths(organizationScore, languageScore, developmentScore),
    improvements: generateImprovements(organizationScore, languageScore, developmentScore, taskType)
  }
}

const generateStrengths = (org, lang, dev) => {
  const allStrengths = [
    "Clear essay structure with logical flow between paragraphs",
    "Good use of transitional phrases and connecting words",
    "Appropriate vocabulary for academic writing",
    "Varied sentence structures demonstrate language proficiency",
    "Strong examples that support your main points",
    "Clear thesis statement that addresses the prompt directly",
    "Good paragraph development with supporting details",
    "Effective use of specific examples and evidence",
    "Maintains consistent point of view throughout",
    "Demonstrates understanding of the task requirements"
  ]
  
  const numStrengths = Math.max(2, Math.floor((org + lang + dev) / 3))
  return allStrengths.slice(0, numStrengths)
}

const generateImprovements = (org, lang, dev, taskType) => {
  const improvements = []
  
  if (org < 4) {
    improvements.push("Work on essay organization - use clearer topic sentences and transitions")
    improvements.push("Develop stronger paragraph structure with better logical flow")
  }
  
  if (lang < 4) {
    improvements.push("Expand vocabulary range and use more precise word choices")
    improvements.push("Practice using more complex grammatical structures")
  }
  
  if (dev < 4) {
    improvements.push("Provide more specific examples to support your points")
    improvements.push("Develop ideas more thoroughly with additional details and explanations")
  }
  
  if (taskType === 'integrated') {
    improvements.push("Better integrate information from both reading and lecture sources")
  } else {
    improvements.push("Strengthen your argument with more convincing evidence and examples")
  }
  
  return improvements.slice(0, 4)
}

const getScoreDescription = (score) => {
  if (score >= 25) return "Excellent"
  if (score >= 20) return "Good"
  if (score >= 15) return "Fair"
  return "Needs Improvement"
}

const updateStats = () => {
  stats.value.testsCompleted++
  stats.value.averageScore = Math.round(
    (stats.value.averageScore * (stats.value.testsCompleted - 1) + results.value.overallScore) / stats.value.testsCompleted
  )
}

const resetTest = () => {
  currentPhase.value = 'selection'
  currentTask.value = null
  essay.value = ''
  wordCount.value = 0
  timeRemaining.value = 0
  if (timer.value) {
    clearInterval(timer.value)
  }
}

const viewDetailedAnalysis = () => {
  // In a real app, this would open a detailed analysis modal or page
  alert('Detailed analysis feature would open here with comprehensive feedback, grammar suggestions, and improvement recommendations.')
}

// Real Groq API integration function (replace the mock functions above)
const callGroqAPI = async (prompt, systemMessage) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Set your API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })
    
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Groq API Error:', error)
    throw error
  }
}

// Enhanced AI content generation with Groq
const generateTestContentWithAI = async (taskType, difficulty) => {
  try {
    if (taskType === 'integrated') {
      // Generate reading passage
      const readingPrompt = `Generate a TOEFL integrated writing reading passage about a ${difficulty} level topic. The passage should be 250-300 words, academic in tone, and present a clear argument with 3 main supporting points. Format it with a clear title and well-structured paragraphs.`
      
      const readingSystemMessage = "You are a TOEFL test content creator. Create high-quality, authentic academic reading passages that match real TOEFL standards. Focus on topics like technology, environment, education, business, or social issues."
      
      const readingPassage = await callGroqAPI(readingPrompt, readingSystemMessage)
      
      // Generate lecture notes that contradict the reading
      const lecturePrompt = `Based on this reading passage, create lecture notes that challenge or contradict the main points. The lecture should present counter-arguments to each main point in the reading:

${readingPassage}

Format as "Professor's Lecture Summary:" followed by detailed notes that systematically address each point from the reading with opposing viewpoints.`
      
      const lectureSystemMessage = "You are creating TOEFL lecture content that contradicts reading passages. Provide well-reasoned counter-arguments with specific examples and evidence."
      
      const lectureNotes = await callGroqAPI(lecturePrompt, lectureSystemMessage)
      
      currentTask.value = {
        type: 'integrated',
        instructions: `You have 20 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and how well your response presents the points in the lecture and their relationship to the reading passage. Typically, an effective response will be 150 to 225 words.`,
        readingPassage,
        lectureNotes,
        prompt: `Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage.`
      }
      timeRemaining.value = 1200 // 20 minutes
    } else {
      // Generate independent writing prompt
      const promptRequest = `Generate a TOEFL independent writing prompt at ${difficulty} level. The prompt should:
      1. Present a clear statement or question for students to agree/disagree with
      2. Be thought-provoking and allow for multiple perspectives
      3. Be appropriate for academic discussion
      4. Follow the format: "Do you agree or disagree with the following statement? [STATEMENT] Use specific reasons and examples to support your answer."
      
      Topics can include: technology and society, education, work and career, environment, culture, personal development, or social issues.`
      
      const promptSystemMessage = "You are a TOEFL test creator specializing in independent writing prompts. Create engaging, balanced prompts that allow students to demonstrate critical thinking and writing skills."
      
      const generatedPrompt = await callGroqAPI(promptRequest, promptSystemMessage)
      
      currentTask.value = {
        type: 'independent',
        instructions: `You have 30 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and how well your response presents and develops your ideas. An effective response is typically 300 or more words.`,
        prompt: generatedPrompt
      }
      timeRemaining.value = 1800 // 30 minutes
    }
  } catch (error) {
    console.error('Error generating AI content:', error)
    // Fallback to mock content if AI fails
    await generateTestContent(taskType, difficulty)
  }
}

// Enhanced AI essay analysis
const analyzeEssayWithAI = async () => {
  try {
    const analysisPrompt = `Analyze this TOEFL ${currentTask.value.type} writing response and provide detailed feedback:

Task Type: ${currentTask.value.type}
Word Count: ${wordCount.value}
Essay: ${essay.value}

Provide analysis in this JSON format:
{
  "overallScore": [0-30],
  "organization": [1-5],
  "language": [1-5], 
  "development": [1-5],
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "detailedFeedback": "Comprehensive paragraph of feedback"
}`
    
    const analysisSystemMessage = `You are an expert TOEFL writing evaluator. Score essays based on official TOEFL rubrics:
    - Organization: Clear structure, logical flow, appropriate transitions
    - Language Use: Grammar accuracy, vocabulary range, sentence variety
    - Development: Idea elaboration, specific examples, task fulfillment
    
    For integrated tasks, also evaluate how well the response summarizes and connects reading and lecture content.
    For independent tasks, evaluate argument development and supporting evidence.`
    
    const analysisResult = await callGroqAPI(analysisPrompt, analysisSystemMessage)
    
    // Parse the JSON response
    const analysis = JSON.parse(analysisResult)
    results.value = {
      overallScore: analysis.overallScore,
      organization: analysis.organization,
      language: analysis.language,
      development: analysis.development,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      detailedFeedback: analysis.detailedFeedback
    }
  } catch (error) {
    console.error('Error with AI analysis:', error)
    // Fallback to mock analysis
    await analyzeEssay()
  }
}

// Lifecycle hooks
onMounted(() => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// Watch for theme changes
watch(isDark, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
}, { deep: true })

// Additional utility functions for enhanced functionality
const exportResults = () => {
  const resultsData = {
    taskType: currentTask.value.type,
    score: results.value.overallScore,
    date: new Date().toISOString(),
    essay: essay.value,
    feedback: results.value
  }
  
  const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `toefl-writing-results-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const shareResults = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My TOEFL Writing Practice Results',
        text: `I scored ${results.value.overallScore}/30 on my TOEFL writing practice! 🎉`,
        url: window.location.href
      })
    } catch (error) {
      console.log('Error sharing:', error)
    }
  } else {
    // Fallback: copy to clipboard
    const shareText = `I scored ${results.value.overallScore}/30 on my TOEFL writing practice! Check out TOEFL Writing Master for practice tests.`
    navigator.clipboard.writeText(shareText)
    alert('Results copied to clipboard!')
  }
}

const generatePracticePlan = async () => {
  try {
    const planPrompt = `Based on these TOEFL writing assessment results, create a personalized 2-week study plan:
    
    Overall Score: ${results.value.overallScore}/30
    Organization: ${results.value.organization}/5
    Language Use: ${results.value.language}/5  
    Development: ${results.value.development}/5
    
    Strengths: ${results.value.strengths.join(', ')}
    Areas for Improvement: ${results.value.improvements.join(', ')}
    
    Provide a day-by-day study plan with specific activities, practice exercises, and goals.`
    
    const planSystemMessage = "You are a TOEFL preparation expert. Create detailed, actionable study plans that address specific weaknesses while building on strengths. Include daily activities, time allocations, and specific resources."
    
    const studyPlan = await callGroqAPI(planPrompt, planSystemMessage)
    
    // Display the study plan in a modal or new section
    alert(`Your Personalized Study Plan:\n\n${studyPlan}`)
  } catch (error) {
    console.error('Error generating study plan:', error)
    alert('Unable to generate study plan at this time. Please try again later.')
  }
}

// Performance tracking
const trackPerformance = () => {
  const performanceData = {
    taskType: currentTask.value.type,
    difficulty: selectedDifficulty.value,
    score: results.value.overallScore,
    timeUsed: (currentTask.value.type === 'integrated' ? 1200 : 1800) - timeRemaining.value,
    wordCount: wordCount.value,
    date: new Date().toISOString()
  }
  
  // Store in localStorage for now (in real app, would send to backend)
  const existingData = JSON.parse(localStorage.getItem('toeflPerformance') || '[]')
  existingData.push(performanceData)
  localStorage.setItem('toeflPerformance', JSON.stringify(existingData))
}

// Auto-save essay progress
const autoSaveEssay = () => {
  if (essay.value && currentTask.value) {
    const saveData = {
      essay: essay.value,
      task: currentTask.value,
      timeRemaining: timeRemaining.value,
      timestamp: Date.now()
    }
    localStorage.setItem('toeflDraft', JSON.stringify(saveData))
  }
}

// Set up auto-save interval
let autoSaveInterval = null

const startAutoSave = () => {
  autoSaveInterval = setInterval(autoSaveEssay, 30000) // Save every 30 seconds
}

const stopAutoSave = () => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
    autoSaveInterval = null
  }
  localStorage.removeItem('toeflDraft')
}

// Load saved draft
const loadDraft = () => {
  const savedDraft = localStorage.getItem('toeflDraft')
  if (savedDraft) {
    const draftData = JSON.parse(savedDraft)
    // Check if draft is less than 24 hours old
    if (Date.now() - draftData.timestamp < 24 * 60 * 60 * 1000) {
      const shouldLoad = confirm('Found a saved draft from a previous session. Would you like to continue where you left off?')
      if (shouldLoad) {
        essay.value = draftData.essay
        currentTask.value = draftData.task
        timeRemaining.value = draftData.timeRemaining
        currentPhase.value = 'test'
        updateWordCount()
        startTimer()
        startAutoSave()
        return true
      }
    }
    localStorage.removeItem('toeflDraft')
  }
  return false
}

// Enhanced test start with auto-save
const enhancedStartTest = async (taskType) => {
  selectedTask.value = taskType
  isGenerating.value = true
  
  try {
    await generateTestContentWithAI(taskType, selectedDifficulty.value)
    currentPhase.value = 'test'
    startTimer()
    startAutoSave()
  } catch (error) {
    console.error('Error generating test:', error)
  } finally {
    isGenerating.value = false
  }
}

// Enhanced submit with tracking
const enhancedSubmitEssay = async () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  stopAutoSave()
  
  isSubmitting.value = true
  
  try {
    await analyzeEssayWithAI()
    trackPerformance()
    currentPhase.value = 'results'
    updateStats()
  } catch (error) {
    console.error('Error analyzing essay:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Check for drafts on component mount
onMounted(() => {
  loadDraft()
})
</script>