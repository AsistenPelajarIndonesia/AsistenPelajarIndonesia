<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useGroqClient, type SnbtPenalaranKuantitatifQuestion } from '~/composables/useGroqClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'vue-sonner';

const { generateSnbtPenalaranKuantitatifQuestions } = useGroqClient();

const questions = ref<SnbtPenalaranKuantitatifQuestion[]>([]);
const isLoading = ref(true);
const currentQuestionIndex = ref(0);
const userAnswers = ref<Record<string, string>>({}); // Store user answers { questionId: optionId }
const quizSubmitted = ref(false);
const score = ref(0);

const totalQuestions = 10;
const timeLimit = 10 * 60; // 10 minutes in seconds
const timeLeft = ref(timeLimit);
let timerInterval: any = null;

useHead({
  title: 'SNBT - Penalaran Kuantitatif | Akademi Pelajar',
  meta: [
    {
      name: 'description',
      content: 'Latihan soal SNBT Penalaran Umum subtes Penalaran Kuantitatif. Uji kemampuan numerik-logis Anda!',
    },
  ],
});

async function fetchQuestions() {
  isLoading.value = true;
  quizSubmitted.value = false;
  userAnswers.value = {};
  currentQuestionIndex.value = 0;
  timeLeft.value = timeLimit;
  try {
    const fetchedQuestions = await generateSnbtPenalaranKuantitatifQuestions();
    if (fetchedQuestions.length >= totalQuestions) {
      questions.value = fetchedQuestions.slice(0, totalQuestions);
    } else {
      questions.value = fetchedQuestions;
      toast.warning('Jumlah soal yang diterima kurang dari yang diharapkan.', {
        description: `Hanya menerima ${fetchedQuestions.length} soal. Menampilkan semua soal yang ada.`,
      });
    }
  } catch (error: any) {
    console.error('Error fetching Penalaran Kuantitatif questions:', error);
    toast.error('Gagal memuat soal.', {
      description: error.message || 'Terjadi kesalahan saat mengambil data soal. Silakan coba lagi nanti.',
    });
    questions.value = [];
  } finally {
    isLoading.value = false;
    if (questions.value.length > 0) {
      startTimer();
    }
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
      submitQuiz(true); // Auto-submit when time is up
      toast.info('Waktu habis!', {
        description: 'Jawaban Anda telah dikumpulkan secara otomatis.',
      });
    }
  }, 1000);
}

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

function selectAnswer(questionId: string, optionId: string) {
  if (!quizSubmitted.value) {
    userAnswers.value[questionId] = optionId;
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function calculateScore() {
  let correctAnswers = 0;
  questions.value.forEach((q) => {
    if (userAnswers.value[q.id] === q.correct_answer_id) {
      correctAnswers++;
    }
  });
  score.value = (correctAnswers / questions.value.length) * 100;
}

function submitQuiz(autoSubmitted = false) {
  if (!autoSubmitted && Object.keys(userAnswers.value).length < questions.value.length) {
     toast.warning('Harap jawab semua pertanyaan!', {
        description: 'Beberapa pertanyaan belum Anda jawab. Mohon lengkapi sebelum mengirim.',
    });
    return;
  }
  clearInterval(timerInterval);
  calculateScore();
  quizSubmitted.value = true;
  toast.success('Simulasi berhasil diselesaikan!', {
    description: `Skor Anda: ${score.value.toFixed(0)}%`,
  });
}

function restartQuiz() {
  fetchQuestions();
}

onMounted(() => {
  fetchQuestions();
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

const progressPercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
});

const allQuestionsAnswered = computed(() => {
    if (questions.value.length === 0) return false;
    return Object.keys(userAnswers.value).length === questions.value.length;
});

</script>

<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <Card class="shadow-lg">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center text-purple-600">Simulasi SNBT - Penalaran Kuantitatif</CardTitle>
        <CardDescription class="text-center">
          Uji kemampuan berpikir numerik-logis Anda dengan 10 soal dalam 10 menit.
          Fokus pada kuantitas, hubungan matematika, dan operasi aritmetika dasar.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div v-if="isLoading" class="space-y-6">
          <Skeleton class="h-8 w-3/4 mx-auto" />
          <Skeleton class="h-4 w-1/2 mx-auto" />
          <div class="space-y-4 mt-6">
            <Skeleton class="h-24 w-full" />
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div class="flex justify-between mt-6">
            <Skeleton class="h-10 w-24" />
            <Skeleton class="h-10 w-24" />
          </div>
        </div>

        <div v-else-if="!isLoading && questions.length === 0 && !quizSubmitted">
            <Alert variant="destructive">
                <AlertTitle>Gagal Memuat Soal</AlertTitle>
                <AlertDescription>
                Tidak dapat mengambil soal Penalaran Kuantitatif saat ini. Silakan coba lagi nanti atau hubungi dukungan jika masalah berlanjut.
                <Button @click="fetchQuestions" class="mt-4">Coba Lagi</Button>
                </AlertDescription>
            </Alert>
        </div>

        <div v-else-if="!quizSubmitted && currentQuestion">
          <div class="mb-4 p-3 bg-purple-50 rounded-lg shadow">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-600">
                Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
              </p>
              <p class="text-lg font-semibold text-red-500">Sisa Waktu: {{ formattedTimeLeft }}</p>
            </div>
            <Progress :model-value="progressPercentage" class="mt-2 h-2 bg-purple-200 [&>div]:bg-purple-600" />
          </div>

          <Card class="mb-6 bg-gray-50">
            <CardHeader>
              <CardTitle class="text-lg">{{ currentQuestion.question_text }}</CardTitle>
              <CardDescription class="text-sm italic">Topik: {{ currentQuestion.topic }}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                :model-value="userAnswers[currentQuestion.id]"
                @update:model-value="(value) => selectAnswer(currentQuestion.id, value as string)"
                class="space-y-3"
              >
                <div
                  v-for="option in currentQuestion.options"
                  :key="option.id"
                  class="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-100 transition-colors"
                >
                  <RadioGroupItem :id="`${currentQuestion.id}-${option.id}`" :value="option.id" />
                  <Label :for="`${currentQuestion.id}-${option.id}`" class="flex-1 cursor-pointer">{{ option.text }}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div class="flex justify-between items-center mt-6">
            <Button @click="prevQuestion" :disabled="currentQuestionIndex === 0" variant="outline">
              Sebelumnya
            </Button>
            <Button
              v-if="currentQuestionIndex < questions.length - 1"
              @click="nextQuestion"
              variant="default"
              class="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Selanjutnya
            </Button>
            <Button
              v-else
              @click="() => submitQuiz()"
              :disabled="!allQuestionsAnswered"
              variant="success"
              class="bg-green-500 hover:bg-green-600 text-white"
            >
              Kumpulkan Jawaban
            </Button>
          </div>
        </div>

        <div v-if="quizSubmitted" class="mt-6">
          <Alert :variant="score >= 60 ? 'success' : 'destructive'" class="mb-6">
            <AlertTitle class="text-xl font-semibold">
              {{ score >= 60 ? 'Selamat! Simulasi Selesai!' : 'Simulasi Selesai. Ayo Belajar Lagi!' }}
            </AlertTitle>
            <AlertDescription class="text-lg">
              Skor Anda: <span class="font-bold">{{ score.toFixed(0) }}%</span>
            </AlertDescription>
          </Alert>

          <h3 class="text-xl font-semibold mb-4 text-gray-700">Pembahasan Jawaban:</h3>
          <Accordion type="single" collapsible class="w-full space-y-3">
            <AccordionItem
              v-for="(q, index) in questions"
              :key="q.id"
              :value="`item-${index}`"
              class="border rounded-lg shadow-sm"
            >
              <AccordionTrigger
                :class="[
                  'p-4 hover:bg-gray-50 rounded-t-lg w-full text-left',
                  userAnswers[q.id] === q.correct_answer_id ? 'text-green-700' : 'text-red-700',
                ]"
              >
                Pertanyaan {{ index + 1 }}: {{ userAnswers[q.id] === q.correct_answer_id ? 'Benar' : 'Salah' }} ({{ q.topic }})
              </AccordionTrigger>
              <AccordionContent class="p-4 border-t bg-white rounded-b-lg">
                <p class="font-medium mb-2 text-gray-800">Pertanyaan: <span class="font-normal">{{ q.question_text }}</span></p>
                <p class="mb-1 text-gray-600">Jawaban Anda: <span :class="userAnswers[q.id] === q.correct_answer_id ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">{{ q.options.find(opt => opt.id === userAnswers[q.id])?.text || 'Tidak dijawab' }}</span></p>
                <p class="mb-3 text-gray-600">Jawaban Benar: <span class="text-green-600 font-semibold">{{ q.options.find(opt => opt.id === q.correct_answer_id)?.text }}</span></p>
                <p class="text-sm text-gray-700 bg-purple-50 p-3 rounded-md"><strong>Penjelasan:</strong> {{ q.explanation }}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button @click="restartQuiz" class="mt-8 w-full bg-purple-500 hover:bg-purple-600 text-white py-3">
            Coba Lagi Simulasi Ini
          </Button>
        </div>
      </CardContent>
      <CardFooter class="text-center text-xs text-gray-500 pt-6">
        <p>Pastikan Anda telah menginstal semua dependensi Shadcn Vue yang diperlukan (Card, RadioGroup, Button, Alert, Progress, Accordion, Skeleton, Toaster).</p>
        <p>Model AI yang digunakan: `llama-3.3-70b-versatile` via Groq.</p>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
.container {
  font-family: 'Inter', sans-serif; /* Example font */
}
</style>