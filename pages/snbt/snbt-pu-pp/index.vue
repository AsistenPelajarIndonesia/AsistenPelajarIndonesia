<template>
  <div class="container mx-auto p-4 md:p-8">
    <NuxtLayout name="default">
      <div class="max-w-3xl mx-auto">
        <Card class="mb-8">
          <CardHeader>
            <CardTitle class="text-2xl font-bold text-center">SNBT - Penalaran Umum (Pengetahuan & Pemahaman Umum)</CardTitle>
            <CardDescription class="text-center">
              Uji pengetahuan dan pemahaman umum Anda. Waktu pengerjaan: {{ formatTime(timeLeft) }}.
            </CardDescription>
          </CardHeader>
          <CardContent v-if="isLoading">
            <div class="space-y-4">
              <Skeleton class="h-8 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-5/6" />
              <Skeleton class="h-6 w-full mt-2" />
              <Skeleton class="h-6 w-full" />
              <Skeleton class="h-6 w-full" />
              <Skeleton class="h-10 w-1/4 mt-4" />
            </div>
          </CardContent>
          <CardContent v-else-if="quiz && !showResults">
            <div v-if="currentQuestion" class="space-y-6">
              <h2 class="text-lg font-semibold">Soal {{ currentQuestionIndex + 1 }} dari {{ quiz.questions.length }}</h2>
              <p class="text-sm text-muted-foreground">Topik: {{ currentQuestion.topic }}</p>
              <div v-if="currentQuestion.passage" class="p-3 border rounded-md bg-muted/30">
                <p class="text-sm whitespace-pre-wrap">{{ currentQuestion.passage }}</p>
              </div>
              <p class="text-base whitespace-pre-wrap">{{ currentQuestion.questionText }}</p>
              
              <RadioGroup v-model="selectedAnswers[currentQuestion.id]">
                <div v-for="option in currentQuestion.options" :key="option.id" class="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem :id="`${currentQuestion.id}-${option.id}`" :value="option.id" />
                  <Label :for="`${currentQuestion.id}-${option.id}`" class="cursor-pointer">{{ option.text }}</Label>
                </div>
              </RadioGroup>

              <div class="flex justify-between mt-6">
                <Button variant="outline" @click="prevQuestion" :disabled="currentQuestionIndex === 0">Soal Sebelumnya</Button>
                <Button v-if="currentQuestionIndex < quiz.questions.length - 1" @click="nextQuestion">Soal Berikutnya</Button>
                <Button v-else @click="submitQuiz">Selesai & Lihat Hasil</Button>
              </div>
            </div>
            <div v-else class="text-center">
              <p>Gagal memuat soal. Silakan coba lagi.</p>
              <Button @click="fetchQuizData">Coba Lagi</Button>
            </div>
          </CardContent>

          <CardContent v-if="showResults && quizResults">
            <h2 class="text-xl font-bold mb-4 text-center">Hasil Simulasi PPU</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
              <Card>
                <CardHeader><CardTitle>Skor Anda</CardTitle></CardHeader>
                <CardContent><p class="text-3xl font-bold">{{ quizResults.score }}/{{ quizResults.totalQuestions }}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Persentase Benar</CardTitle></CardHeader>
                <CardContent><p class="text-3xl font-bold">{{ quizResults.percentage.toFixed(2) }}%</p></CardContent>
              </Card>
            </div>
            
            <h3 class="text-lg font-semibold mb-3">Pembahasan:</h3>
            <Accordion type="single" collapsible class="w-full">
              <AccordionItem v-for="(question, index) in quiz?.questions" :key="question.id" :value="`item-${index}`">
                <AccordionTrigger :class="{'text-green-600': quizResults.answers[question.id]?.isCorrect, 'text-red-600': !quizResults.answers[question.id]?.isCorrect && quizResults.answers[question.id]?.selected}">
                  Soal {{ index + 1 }}: {{ question.topic }} - {{ quizResults.answers[question.id]?.isCorrect ? 'Benar' : (quizResults.answers[question.id]?.selected ? 'Salah' : 'Tidak Dijawab') }}
                </AccordionTrigger>
                <AccordionContent>
                  <p class="font-medium mb-1">Pertanyaan: {{ question.questionText }}</p>
                  <p v-if="question.passage" class="text-xs italic text-muted-foreground mb-2">Konteks: {{ question.passage.substring(0,100) }}...</p>
                  <p>Jawaban Anda: {{ getOptionText(question, quizResults.answers[question.id]?.selected) || 'Tidak dijawab' }}</p>
                  <p>Jawaban Benar: {{ getOptionText(question, question.correctAnswerId) }}</p>
                  <p v-if="question.explanation" class="mt-2 text-sm text-muted-foreground">Penjelasan: {{ question.explanation }}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div class="mt-6 text-center">
              <Button @click="restartQuiz">Ulangi Tes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useGroqClient, type SnbtPpuQuiz, type SnbtPpuQuestion, type SnbtPpuOption } from '@/composables/useGroqClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/toast/use-toast';

const { generateSnbtPengetahuanUmumQuestions } = useGroqClient();
const { toast } = useToast();

const quiz = ref<SnbtPpuQuiz | null>(null);
const isLoading = ref(true);
const currentQuestionIndex = ref(0);
const selectedAnswers = ref<Record<string, string>>({}); // { questionId: optionId }
const showResults = ref(false);
const quizResults = ref<{
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: Record<string, { selected?: string; correct: string; isCorrect: boolean }>;
} | null>(null);

const TOTAL_TIME = 15 * 60; // 15 minutes in seconds
const timeLeft = ref(TOTAL_TIME);
let timerInterval: NodeJS.Timeout | null = null;

useHead({
  title: 'SNBT Pengetahuan & Pemahaman Umum | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Latihan soal SNBT Penalaran Umum bagian Pengetahuan dan Pemahaman Umum dengan AI.' },
  ],
});

const currentQuestion = computed(() => {
  return quiz.value?.questions[currentQuestionIndex.value] || null;
});

async function fetchQuizData() {
  isLoading.value = true;
  showResults.value = false;
  quizResults.value = null;
  selectedAnswers.value = {};
  currentQuestionIndex.value = 0;
  try {
    // Menggunakan model llama-3.3-70b-versatile sesuai permintaan awal jika memungkinkan
    // Jika tidak, fallback ke model yang ada di useGroqClient
    const data = await generateSnbtPengetahuanUmumQuestions(); 
    if (data && data.questions.length > 0) {
      quiz.value = data;
      startTimer();
    } else {
      quiz.value = null;
      toast({
        title: 'Gagal Memuat Soal',
        description: 'Tidak dapat mengambil soal PPU dari server. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.error('Failed to fetch PPU quiz data:', error);
    toast({
        title: 'Error PPU',
        description: 'Terjadi kesalahan saat memuat soal PPU.',
        variant: 'destructive',
      });
  } finally {
    isLoading.value = false;
  }
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timeLeft.value = TOTAL_TIME;
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      if (timerInterval) clearInterval(timerInterval);
      submitQuiz(true); // Auto-submit when time is up
      toast({
        title: 'Waktu Habis!',
        description: 'Jawaban Anda telah otomatis dikumpulkan.',
      });
    }
  }, 1000);
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function nextQuestion() {
  if (quiz.value && currentQuestionIndex.value < quiz.value.questions.length - 1) {
    currentQuestionIndex.value++;
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function submitQuiz(autoSubmitted = false) {
  if (timerInterval) clearInterval(timerInterval);
  if (!quiz.value) return;

  let score = 0;
  const resultsBreakdown: Record<string, { selected?: string; correct: string; isCorrect: boolean }> = {};

  quiz.value.questions.forEach(q => {
    const selected = selectedAnswers.value[q.id];
    const correct = q.correctAnswerId;
    const isCorrect = selected === correct;
    if (isCorrect) score++;
    resultsBreakdown[q.id] = { selected, correct, isCorrect };
  });

  quizResults.value = {
    score,
    totalQuestions: quiz.value.questions.length,
    percentage: (score / quiz.value.questions.length) * 100,
    answers: resultsBreakdown,
  };
  showResults.value = true;

  if (!autoSubmitted) {
      toast({
        title: 'Simulasi PPU Selesai!',
        description: 'Hasil Anda telah ditampilkan.',
      });
  }
}

function getOptionText(question: SnbtPpuQuestion, optionId?: string): string {
  if (!optionId) return 'N/A';
  return question.options.find(opt => opt.id === optionId)?.text || 'N/A';
}

function restartQuiz() {
  fetchQuizData();
}

onMounted(() => {
  fetchQuizData();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

</script>

<style scoped>
/* Additional custom styles if needed */
</style>