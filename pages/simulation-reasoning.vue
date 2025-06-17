<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 lg:p-8 dark">
    <div class="w-full max-w-4xl">
      <!-- Header -->
      <header class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-primary">Simulasi SNBT - Penalaran Matematika (Ultra Sulit)</h1>
        <Button variant="outline" @click="navigateTo('/dashboard/practice')">Kembali</Button>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64">
        <LoadingBar class="w-1/2" />
        <p class="mt-4 text-lg">Mempersiapkan soal-soal terbaik untukmu...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-64 bg-destructive/10 p-6 rounded-lg">
        <p class="text-destructive text-lg font-semibold">Gagal memuat soal!</p>
        <p class="text-sm text-muted-foreground mb-4">Terjadi kesalahan saat mengambil soal. Silakan coba lagi.</p>
        <Button @click="fetchQuestions">Coba Lagi</Button>
      </div>

      <!-- Main Test UI -->
      <div v-else-if="!showResults && questions.length > 0" class="space-y-6">
        <!-- Timer and Progress -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-card rounded-lg shadow">
          <div class="text-xl font-semibold">
            Sisa Waktu: <span :class="timerColor">{{ formattedTime }}</span>
          </div>
          <div class="w-full sm:w-1/2">
            <Progress :model-value="progressPercentage" class="h-3" />
            <p class="text-sm text-muted-foreground mt-1 text-center sm:text-right">{{ currentQuestionIndex + 1 }} / {{ questions.length }} Soal</p>
          </div>
        </div>

        <!-- Question Card -->
        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle>Soal Nomor {{ currentQuestionIndex + 1 }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="questions[currentQuestionIndex]" :v-html="renderMarkdown(questions[currentQuestionIndex].question)" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-6"></div>
            <RadioGroup v-model="userAnswers[currentQuestionIndex]" class="space-y-3">
              <div v-for="(option, oIndex) in questions[currentQuestionIndex].options" :key="oIndex" class="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                <RadioGroupItem :id="`q${currentQuestionIndex}-o${oIndex}`" :value="option.text" />
                <Label :for="`q${currentQuestionIndex}-o${oIndex}`" v-html="renderMarkdown(option.text)" class="flex-1 cursor-pointer"></Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <!-- Navigation -->
        <div class="flex justify-between items-center mt-6">
          <Button @click="prevQuestion" :disabled="currentQuestionIndex === 0" variant="outline">Sebelumnya</Button>
          <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">Selanjutnya</Button>
          <Button v-else @click="submitTest" variant="destructive">Selesaikan Tes</Button>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-else-if="showResults" class="space-y-6">
        <Card class="shadow-lg">
          <CardHeader class="text-center">
            <CardTitle class="text-3xl">Hasil Simulasi</CardTitle>
          </CardHeader>
          <CardContent class="text-center space-y-4">
            <p class="text-xl">Skor Akhir Anda:</p>
            <p :class="scoreColor" class="text-5xl font-bold">{{ scorePercentage.toFixed(2) }}%</p>
            <p class="text-muted-foreground">({{ correctAnswersCount }} dari {{ questions.length }} soal benar)</p>
            <div class="flex justify-center gap-4 mt-6">
              <Button @click="retryTest" variant="outline">Ulangi Tes</Button>
              <Button @click="navigateTo('/dashboard/practice')">Kembali ke Dashboard</Button>
            </div>
          </CardContent>
        </Card>

        <h2 class="text-2xl font-semibold mt-8 mb-4 text-center">Pembahasan Soal</h2>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem v-for="(question, index) in questions" :key="index" :value="`item-${index}`">
            <AccordionTrigger :class="getAnswerStatusClass(index)">
              Soal {{ index + 1 }}: {{ isCorrect(index) ? 'Benar' : 'Salah' }}
            </AccordionTrigger>
            <AccordionContent class="p-4 bg-card rounded-b-md">
              <strong class="block mb-2">Soal:</strong>
              <div v-html="renderMarkdown(question.question)" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-4"></div>
              <strong class="block mb-1">Jawaban Anda:</strong>
              <p :class="userAnswers[index] === question.correct_answer ? 'text-green-500' : 'text-red-500'" v-html="renderMarkdown(userAnswers[index] || 'Tidak dijawab')" class="mb-3"></p>
              <strong class="block mb-1">Jawaban Benar:</strong>
              <p class="text-blue-500" v-html="renderMarkdown(question.correct_answer)"></p>
              <strong class="block mt-3 mb-1">Penjelasan:</strong>
              <div v-html="renderMarkdown(question.explanation)" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none"></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { navigateTo, useHead } from '#app'
import { marked } from 'marked'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LoadingBar from '@/components/LoadingBar.vue';
import { useGroqClient, type SnbtPenalaranMatematikaQuestion } from '@/composables/useGroqClient'

useHead({
  title: 'Simulasi SNBT - Penalaran Matematika (Ultra Sulit) | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Uji kemampuan penalaran matematika Anda dengan soal-soal SNBT tingkat kesulitan tertinggi.' }
  ]
})

const isLoading = ref(true)
const error = ref<string | null>(null)
const questions = ref<SnbtPenalaranMatematikaQuestion[]>([])
const currentQuestionIndex = ref(0)
const userAnswers = ref<string[]>([])
const showResults = ref(false)
const timer = ref(30 * 60) // 30 minutes in seconds
let intervalId: NodeJS.Timeout | null = null

const { generateSnbtPenalaranMatematikaQuestions } = useGroqClient()

const renderMarkdown = (text: string) => {
  if (!text) return '';
  // Basic configuration for marked - extend as needed
  return marked.parse(text, { breaks: true, gfm: true });
};

const fetchQuestions = async () => {
  isLoading.value = true
  error.value = null
  try {
    const fetchedQuestions = await generateSnbtPenalaranMatematikaQuestions()
    if (fetchedQuestions && fetchedQuestions.length > 0) {
      // Shuffle questions for variety (optional)
      // questions.value = fetchedQuestions.sort(() => Math.random() - 0.5);
      questions.value = fetchedQuestions;
      userAnswers.value = Array(questions.value.length).fill('')
    } else {
      throw new Error('No questions returned from API or empty array.')
    }
  } catch (e: any) {
    console.error('Error fetching SNBT Penalaran Matematika questions:', e)
    error.value = e.message || 'Gagal memuat soal. Silakan coba lagi nanti.'
    questions.value = [] // Clear questions on error
  } finally {
    isLoading.value = false
  }
}

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const timerColor = computed(() => {
  if (timer.value <= 60) return 'text-red-500 font-bold animate-pulse'
  if (timer.value <= 300) return 'text-yellow-500'
  return 'text-green-500'
})

const startTimer = () => {
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      submitTest() // Auto-submit when timer runs out
    }
  }, 1000)
}

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(async () => {
  await fetchQuestions()
  if (questions.value.length > 0 && !error.value) {
    startTimer()
  }
})

onUnmounted(() => {
  stopTimer()
})

const progressPercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100
})

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const submitTest = () => {
  stopTimer()
  showResults.value = true
  // Score calculation is done in 'score' computed property
}

const correctAnswersCount = computed(() => {
  return questions.value.reduce((count, question, index) => {
    return count + (userAnswers.value[index] === question.correct_answer ? 1 : 0)
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (correctAnswersCount.value / questions.value.length) * 100
})

const scoreColor = computed(() => {
  if (scorePercentage.value >= 75) return 'text-green-500'
  if (scorePercentage.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})

const retryTest = async () => {
  currentQuestionIndex.value = 0
  userAnswers.value = Array(questions.value.length).fill('')
  showResults.value = false
  timer.value = 30 * 60 // Reset timer
  isLoading.value = true; // Show loading while refetching
  await fetchQuestions() // Refetch questions for a new attempt
  if (questions.value.length > 0 && !error.value) {
    startTimer()
  }
  isLoading.value = false;
}


const isCorrect = (index: number) => {
  return userAnswers.value[index] === questions.value[index].correct_answer
}

const getAnswerStatusClass = (index: number) => {
  if (!userAnswers.value[index] && showResults.value) return 'text-orange-500' // Not answered
  return isCorrect(index) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
}

</script>

<style scoped>
/* Custom scrollbar for results, if needed */
.prose :where(code):not(:where([class~="not-prose"] *))::before,
.prose :where(code):not(:where([class~="not-prose"] *))::after {
  content: "";
}

/* Ensure KaTeX or other math renderers display correctly if used */
:deep(.katex-display) {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5em 0;
}

/* Dark mode prose adjustments */
.dark .prose-invert {
  --tw-prose-body: theme(colors.slate.300);
  --tw-prose-headings: theme(colors.slate.100);
  --tw-prose-lead: theme(colors.slate.400);
  --tw-prose-links: theme(colors.sky.400);
  --tw-prose-bold: theme(colors.slate.100);
  --tw-prose-counters: theme(colors.slate.400);
  --tw-prose-bullets: theme(colors.slate.600);
  --tw-prose-hr: theme(colors.slate.700);
  --tw-prose-quotes: theme(colors.slate.100);
  --tw-prose-quote-borders: theme(colors.slate.700);
  --tw-prose-captions: theme(colors.slate.400);
  --tw-prose-code: theme(colors.sky.300); /* Brighter code text */
  --tw-prose-pre-code: theme(colors.slate.300);
  --tw-prose-pre-bg: theme(colors.slate.800); /* Darker code block bg */
  --tw-prose-th-borders: theme(colors.slate.600);
  --tw-prose-td-borders: theme(colors.slate.700);
}

.prose code {
  background-color: theme(colors.slate.100);
  color: theme(colors.slate.800);
  padding: 0.1em 0.3em;
  border-radius: 0.25em;
  font-size: 0.9em;
}

.dark .prose-invert code {
  background-color: theme(colors.slate.700);
  color: theme(colors.sky.300);
}
</style>