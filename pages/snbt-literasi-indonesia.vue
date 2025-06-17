<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simulasi SNBT – Subtes Literasi Bahasa Indonesia
        </h1>
        
        <!-- Timer and Progress -->
        <div class="flex justify-center items-center gap-8 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
            <div class="text-2xl font-mono font-bold" :class="timeLeft <= 300 ? 'text-red-600' : 'text-teal-600'">
              {{ formatTime(timeLeft) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Waktu Tersisa</div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
            <div class="text-2xl font-bold text-green-600">
              {{ currentIndex + 1 }} / 30
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Soal</div>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="max-w-md mx-auto">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-teal-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${((currentIndex + 1) / 30) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">Membuat soal Literasi Bahasa Indonesia yang menantang...</p>
      </div>

      <!-- Quiz Interface -->
      <div v-else-if="questions.length > 0 && !showResults" class="max-w-4xl mx-auto">
        <Transition name="fade" mode="out-in">
          <Card :key="currentIndex" class="p-8">
            <div class="mb-6">
              <Badge variant="outline" class="mb-4">
                {{ questions[currentIndex].topic }}
              </Badge>
              
              <!-- Passage (if exists) -->
              <div v-if="questions[currentIndex].passage" class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">Teks Bacaan:</h3>
                <div class="prose dark:prose-invert max-w-none">
                  <p class="whitespace-pre-line">{{ questions[currentIndex].passage }}</p>
                </div>
              </div>
              
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {{ questions[currentIndex].questionText }}
              </h2>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="option in questions[currentIndex].options" 
                :key="option.id"
                class="cursor-pointer transition-all duration-200"
                @click="!isTimeUp && selectAnswer(option.id)"
              >
                <div 
                  class="p-4 border-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20"
                  :class="{
                    'border-teal-500 bg-teal-50 dark:bg-teal-900/20': userAnswers[currentIndex] === option.id,
                    'border-gray-200 dark:border-gray-700': userAnswers[currentIndex] !== option.id,
                    'cursor-not-allowed opacity-50': isTimeUp
                  }"
                >
                  <div class="flex items-center">
                    <span class="font-semibold text-teal-600 mr-3">{{ option.id.toUpperCase() }}.</span>
                    <span class="text-gray-900 dark:text-white">{{ option.text }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Navigation -->
            <div class="flex justify-between mt-8">
              <Button 
                variant="outline" 
                @click="previousQuestion"
                :disabled="currentIndex === 0 || isTimeUp"
              >
                <ChevronLeft class="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>
              
              <Button 
                v-if="currentIndex < 29"
                @click="nextQuestion"
                :disabled="isTimeUp"
              >
                Berikutnya
                <ChevronRight class="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                v-else
                @click="submitQuiz"
                class="bg-green-600 hover:bg-green-700"
                :disabled="isTimeUp"
              >
                Kumpulkan Tes
              </Button>
            </div>
          </Card>
        </Transition>
      </div>

      <!-- Results -->
      <div v-else-if="showResults" class="max-w-4xl mx-auto">
        <Card class="p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tes Selesai!
            </h2>
            <div class="text-6xl font-bold mb-4" :class="score >= 21 ? 'text-green-600' : score >= 15 ? 'text-yellow-600' : 'text-red-600'">
              {{ score }}/30
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Skor Anda: {{ Math.round((score / 30) * 100) }}%
            </p>
            <div class="mt-4">
              <Badge 
                :variant="score >= 21 ? 'default' : score >= 15 ? 'secondary' : 'destructive'"
                class="text-lg px-4 py-2"
              >
                {{ score >= 21 ? 'Luar Biasa!' : score >= 15 ? 'Bagus!' : 'Terus Berlatih!' }}
              </Badge>
            </div>
          </div>
          
          <!-- Detailed Results -->
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tinjauan Rinci:
            </h3>
            
            <div 
              v-for="(question, index) in questions" 
              :key="question.id"
              class="border rounded-lg p-6"
              :class="{
                'border-green-200 bg-green-50 dark:bg-green-900/20': userAnswers[index] === question.correctAnswerId,
                'border-red-200 bg-red-50 dark:bg-red-900/20': userAnswers[index] && userAnswers[index] !== question.correctAnswerId,
                'border-gray-200 bg-gray-50 dark:bg-gray-800': !userAnswers[index]
              }"
            >
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  Soal {{ index + 1 }}: {{ question.topic }}
                </h4>
                <Badge 
                  :variant="userAnswers[index] === question.correctAnswerId ? 'default' : userAnswers[index] ? 'destructive' : 'secondary'"
                >
                  {{ userAnswers[index] === question.correctAnswerId ? 'Benar' : userAnswers[index] ? 'Salah' : 'Tidak Dijawab' }}
                </Badge>
              </div>
              
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ question.questionText }}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div class="space-y-2">
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Jawaban Anda:</p>
                  <p class="text-sm" :class="userAnswers[index] === question.correctAnswerId ? 'text-green-600' : 'text-red-600'">
                    {{ userAnswers[index] ? `${userAnswers[index].toUpperCase()}. ${question.options.find(opt => opt.id === userAnswers[index])?.text}` : 'Tidak dijawab' }}
                  </p>
                </div>
                
                <div class="space-y-2">
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Jawaban Benar:</p>
                  <p class="text-sm text-green-600">
                    {{ question.correctAnswerId.toUpperCase() }}. {{ question.options.find(opt => opt.id === question.correctAnswerId)?.text }}
                  </p>
                </div>
              </div>
              
              <div class="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                <p class="text-sm font-medium text-teal-800 dark:text-teal-200 mb-2">Penjelasan:</p>
                <p class="text-sm text-teal-700 dark:text-teal-300">{{ question.explanation }}</p>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <Button @click="retryQuiz" size="lg">
              <RotateCcw class="w-4 h-4 mr-2" />
              Coba Lagi
            </Button>
          </div>
        </Card>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <AlertCircle class="w-12 h-12 mx-auto mb-2" />
          <p class="text-lg font-semibold">Gagal Memuat Soal</p>
          <p class="text-sm">{{ error }}</p>
        </div>
        <Button @click="generateQuestions">
          <RefreshCw class="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, RefreshCw } from 'lucide-vue-next'
import { useGroqClient } from '@/composables/useGroqClient'

// Define the Indonesian Literacy Question interface (can be removed if also defined and exported from useGroqClient.ts and imported here)
interface IndonesianLiteracyQuestion {
  id: string
  questionText: string
  topic: 'Pemahaman Bacaan' | 'Struktur Kalimat' | 'Idiom & Peribahasa' | 'Sinonim & Antonim'
  passage?: string 
  options: { id: string; text: string }[]
  correctAnswerId: string
  explanation: string
}

// Reactive state
const questions = ref<IndonesianLiteracyQuestion[]>([])
const currentIndex = ref(0)
const userAnswers = ref<Record<number, string>>({})
const timeLeft = ref(42 * 60 + 30) // 42 minutes 30 seconds
const isTimeUp = ref(false)
const showResults = ref(false)
const isLoading = ref(true)
const error = ref('')

let timer: NodeJS.Timeout | null = null


const { generateSnbtLiterasiIndonesiaQuestions } = useGroqClient() // 
// Computed properties
const score = computed(() => {
  return questions.value.reduce((total, question, index) => {
    return total + (userAnswers.value[index] === question.correctAnswerId ? 1 : 0)
  }, 0)
})

// Methods
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      isTimeUp.value = true
      submitQuiz()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const selectAnswer = (optionId: string) => {
  userAnswers.value[currentIndex.value] = optionId
}

const nextQuestion = () => {
  if (currentIndex.value < 29) { // 30 questions, so index up to 29
    currentIndex.value++
  }
}

const previousQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const submitQuiz = () => {
  stopTimer()
  showResults.value = true
}

const retryQuiz = () => {
  // Reset state
  currentIndex.value = 0
  userAnswers.value = {}
  timeLeft.value = 42 * 60 + 30
  isTimeUp.value = false
  showResults.value = false
  
  // Shuffle questions and restart
  shuffleQuestions()
  startTimer()
}

const shuffleQuestions = () => {
  const shuffled = [...questions.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  questions.value = shuffled
}

const generateQuestions = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    // Call the new dedicated function
    const fetchedQuestions = await generateSnbtLiterasiIndonesiaQuestions()

    questions.value = fetchedQuestions
    shuffleQuestions()
    startTimer()
    
  } catch (err) {
    console.error('Error saat membuat soal:', err)
    error.value = err instanceof Error ? err.message : 'Gagal membuat soal'
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  generateQuestions()
})

onUnmounted(() => {
  stopTimer()
})

// Set page meta
useHead({
  title: 'SNBT Literasi Bahasa Indonesia - Simulasi | AkademiPelajar',
  meta: [
    { name: 'description', content: 'Latihan soal SNBT Literasi Bahasa Indonesia dengan simulasi tes komprehensif kami.' }
  ]
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.prose {
  line-height: 1.7;
  text-align: justify;
}

.prose p {
  margin-bottom: 1.25rem;
}
</style>