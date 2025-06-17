<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 dark:from-gray-900 dark:to-slate-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simulasi SNBT – Subtes Literasi Matematika
        </h1>
        
        <!-- Timer and Progress (Simplified: Quiz.vue will show its own timer/progress during exam) -->
        <div v-if="!showResults && !isLoading && questions.length > 0" class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6">
          <!-- This section can be further customized or removed if Quiz.vue's header is sufficient -->
           <p class="text-lg text-gray-700 dark:text-gray-300">Selesaikan semua soal sebelum waktu habis!</p>
        </div>
        
        <!-- Progress Bar (Removed as Quiz.vue handles its own progress indicators) -->
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-600 mx-auto mb-6"></div>
        <p class="text-xl text-gray-700 dark:text-gray-300">Memuat soal-soal Literasi Matematika yang menantang...</p>
      </div>

      <!-- Quiz Interface -->
      <div v-if="!isLoading && questions.length > 0 && !showResults && !error" class="max-w-3xl mx-auto">
        <Quiz 
          :questions="transformedQuestions" 
          :total-time="initialTotalTime"
          @quiz-completed="handleQuizCompletion"
          :key="quizKey"
        />
      </div>

      <!-- Results -->
      <div v-else-if="showResults" class="max-w-3xl mx-auto">
        <Card class="p-6 sm:p-8 shadow-xl">
          <CardHeader class="text-center mb-6">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Simulasi Selesai!
            </h2>
            <div class="text-5xl sm:text-6xl font-bold mb-4" :class="scorePercentage >= 75 ? 'text-green-600' : scorePercentage >= 50 ? 'text-yellow-500' : 'text-red-600'">
              {{ score }}/{{ questions.length }}
            </div>
            <p class="text-xl text-gray-700 dark:text-gray-300">
              Skor Anda: {{ scorePercentage.toFixed(2) }}%
            </p>
            <div class="mt-4">
              <Badge 
                :variant="scorePercentage >= 75 ? 'default' : scorePercentage >= 50 ? 'secondary' : 'destructive'"
                class="text-lg px-6 py-3 rounded-full"
                :class="{
                  'bg-green-500 text-white': scorePercentage >= 75,
                  'bg-yellow-500 text-white': scorePercentage >= 50 && scorePercentage < 75,
                  'bg-red-500 text-white': scorePercentage < 50
                }"
              >
                {{ scoreMessage }}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent class="space-y-6">
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
              Rincian Jawaban:
            </h3>
            
            <Accordion type="single" collapsible class="w-full">
              <AccordionItem v-for="(question, index) in questions" :key="question.id" :value="`item-${index}`">
                <AccordionTrigger 
                  class="flex justify-between items-center w-full text-left py-4 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                  :class="{
                    'text-green-700 dark:text-green-400': quizResultsData.find(r => r.questionId === question.id)?.isCorrect,
                    'text-red-700 dark:text-red-400': quizResultsData.find(r => r.questionId === question.id) && !quizResultsData.find(r => r.questionId === question.id)?.isCorrect,
                    'text-gray-600 dark:text-gray-400': !quizResultsData.find(r => r.questionId === question.id)?.selectedLabel
                  }"
                >
                  <span class="font-medium text-base sm:text-lg">Soal {{ index + 1 }}: <span v-html="question.questionText.substring(0, 50) + '...'"></span></span>
                  <Badge :variant="quizResultsData.find(r => r.questionId === question.id)?.isCorrect ? 'default' : (quizResultsData.find(r => r.questionId === question.id)?.selectedLabel ? 'destructive' : 'outline')">
                    {{ quizResultsData.find(r => r.questionId === question.id)?.isCorrect ? 'Benar' : (quizResultsData.find(r => r.questionId === question.id)?.selectedLabel ? 'Salah' : 'Tidak Dijawab') }}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent class="pt-2 pb-4 px-2 space-y-3 bg-gray-50 dark:bg-gray-800/30 rounded-b-md">
                  <p class="text-sm text-gray-700 dark:text-gray-300 font-semibold">Pertanyaan Lengkap:</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300"><span v-html="question.questionText"></span></p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p class="font-medium text-gray-600 dark:text-gray-400">Jawaban Anda:</p>
                      <p :class="quizResultsData.find(r => r.questionId === question.id)?.isCorrect ? 'text-green-600' : 'text-red-600'">
                        <span v-if="quizResultsData.find(r => r.questionId === question.id)?.selectedLabel">
                          {{ quizResultsData.find(r => r.questionId === question.id)?.selectedLabel?.toUpperCase() }}. 
                          <span v-html="question.options.find(opt => opt.id === quizResultsData.find(r => r.questionId === question.id)?.selectedLabel)?.text || ''"></span>
                        </span>
                        <span v-else>Tidak dijawab</span>
                      </p>
                    </div>
                    <div>
                      <p class="font-medium text-gray-600 dark:text-gray-400">Jawaban Benar:</p>
                      <p class="text-green-600">
                        {{ question.correctAnswerId.toUpperCase() }}. <span v-html="question.options.find(opt => opt.id === question.correctAnswerId)?.text || ''"></span>
                      </p>
                    </div>
                  </div>
                  
                  <div class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg mt-2">
                    <p class="text-sm font-medium text-cyan-800 dark:text-cyan-200 mb-1">Penjelasan:</p>
                    <p class="text-sm text-cyan-700 dark:text-cyan-300"><span v-html="question.explanation"></span></p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          
          <CardFooter class="text-center mt-8">
            <Button @click="retryQuiz" size="lg" class="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white">
              <RotateCcw class="w-5 h-5 mr-2" />
              Coba Lagi Simulasi
            </Button>
          </CardFooter>
        </Card>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 max-w-xl mx-auto">
        <Card class="p-8 bg-red-50 dark:bg-red-900/30 border-red-500 shadow-lg">
          <AlertCircle class="w-16 h-16 mx-auto mb-4 text-red-600 dark:text-red-400" />
          <h3 class="text-2xl font-semibold text-red-700 dark:text-red-300 mb-3">Gagal Memuat Soal</h3>
          <p class="text-red-600 dark:text-red-400 mb-6">{{ error }}</p>
          <Button @click="loadInitialQuestions" variant="destructive" class="px-6 py-3">
            <RefreshCw class="w-5 h-5 mr-2" />
            Coba Muat Ulang
          </Button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, RefreshCw, CheckCircle } from 'lucide-vue-next'; 
import { useGroqClient, type SnbtLiterasiMatematikaQuestion } from '@/composables/useGroqClient';
import Quiz from '@/components/Quiz.vue'; 
import type { QuizResult, Question as QuizQuestionType } from '@/components/Quiz.vue';

// Removed KaTeX import and CSS
// import katex from 'katex';
// import 'katex/dist/katex.min.css';

// SEO and Meta Tags
useHead({
  title: 'Simulasi SNBT - Literasi Matematika | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Uji kemampuan Literasi Matematika Anda untuk persiapan SNBT dengan soal-soal simulasi tingkat kesulitan tinggi. Dapatkan skor dan pembahasan lengkap.' },
    { name: 'keywords', content: 'SNBT, Literasi Matematika, Simulasi SNBT, Soal Matematika SNBT, Try Out SNBT, Akademi Pelajar, Ujian Masuk PTN' }
  ],
});

// Reactive state
const questions = ref<SnbtLiterasiMatematikaQuestion[]>([]);
// const currentIndex = ref(0); // Removed
// const userAnswers = ref<Record<number, string | undefined>>({}); // Removed
// const timeLeft = ref(42 * 60 + 30); // Removed
// const isTimeUp = ref(false); // Removed
const showResults = ref(false);
const isLoading = ref(true);
const error = ref('');

const initialTotalTime = ref(42 * 60 + 30); 
const quizResultsData = ref<QuizResult[]>([]); 
const quizKey = ref(0); 

const { generateSnbtLiterasiMatematikaQuestions } = useGroqClient();

// Removed renderKatex function

// Computed properties
const transformedQuestions = computed((): QuizQuestionType[] => {
  return questions.value.map(q => ({
    id: q.id,
    question: q.questionText, // Pass raw text, Quiz.vue's $md should handle KaTeX/Markdown
    choices: q.options.map(opt => ({
      label: opt.id,
      text: opt.text, // Pass raw text
      isCorrect: opt.id === q.correctAnswerId
    })),
    explanation: q.explanation // Pass raw text
  }));
});

const score = computed(() => {
  return quizResultsData.value.filter(r => r.isCorrect).length;
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return (score.value / questions.value.length) * 100;
});

const scoreMessage = computed(() => {
  if (scorePercentage.value >= 85) return 'Luar Biasa! Pemahaman Matematika Anda Sangat Baik!';
  if (scorePercentage.value >= 70) return 'Sangat Bagus! Terus Asah Kemampuan Anda!';
  if (scorePercentage.value >= 50) return 'Cukup Baik! Tingkatkan Lagi Latihan Soal Sulit!';
  if (scorePercentage.value >= 30) return 'Perlu Belajar Lebih Giat! Fokus Pada Konsep Dasar.';
  return 'Jangan Menyerah! Banyak Latihan Akan Membantu!';
});

// Methods
// const formatTime = (seconds: number): string => { ... }; // Removed, Quiz.vue handles its own time formatting

// const startTimer = () => { ... }; // Removed
// const stopTimer = () => { ... }; // Removed

// const selectAnswer = (optionId: string) => { ... }; // Removed
// const nextQuestion = () => { ... }; // Removed
// const previousQuestion = () => { ... }; // Removed
// const submitQuiz = () => { ... }; // Removed

const handleQuizCompletion = (results: QuizResult[]) => {
  quizResultsData.value = results;
  showResults.value = true;
};

const retryQuiz = () => {
  isLoading.value = true;
  showResults.value = false;
  quizResultsData.value = [];
  // timeLeft.value = 42 * 60 + 30; // Reset time if managed here, but Quiz.vue gets initialTotalTime
  error.value = '';
  if (questions.value.length > 0) {
     shuffleArray(questions.value); // Re-shuffle for a new attempt
  }
  quizKey.value++; // Increment key to force re-render Quiz component
  isLoading.value = false; 
  // startTimer(); // Removed, Quiz.vue will start its own timer on creation
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const loadInitialQuestions = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    const fetchedQuestions = await generateSnbtLiterasiMatematikaQuestions();
    if (fetchedQuestions && fetchedQuestions.length > 0) {
      questions.value = shuffleArray(fetchedQuestions);
    } else {
      throw new Error('Tidak ada soal yang diterima atau array soal kosong.');
    }
  } catch (err: any) {
    console.error('Error generating SNBT Literasi Matematika questions:', err);
    error.value = err.message || 'Gagal memuat soal. Silakan coba lagi.';
    questions.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hooks
onMounted(async () => { 
  await loadInitialQuestions();
});

onUnmounted(() => {
});

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

/* Removed custom KaTeX styling */
</style>