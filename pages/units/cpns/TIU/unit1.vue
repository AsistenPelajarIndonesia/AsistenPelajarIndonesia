<template>
  <div>
    <NuxtLayout name="cpns-layout"
                :test-title="testTitle"
                :test-description="testDescription"
                :unit-title="unitTitle"
                :unit-description="unitDescription"
                :categories="categories"
                :show-result="showResult"
                @back="handleBack"
                @next="handleNext">

      <!-- ======================================================================= -->
      <!-- SLOT: MATERI PEMBELAJARAN                                             -->
      <!-- ======================================================================= -->
      <template #material>
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Pengantar Silogisme</CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-4">
            <p>
              <strong>Silogisme</strong> adalah suatu proses penarikan kesimpulan secara deduktif. Silogisme disusun dari dua proposisi (pernyataan) dan sebuah konklusi (kesimpulan). Dua proposisi tersebut disebut sebagai <strong>premis mayor</strong> (premis umum) dan <strong>premis minor</strong> (premis khusus).
            </p>
            <p>
              Kunci utama dalam menyelesaikan soal silogisme adalah memahami hubungan antar premis dan menarik kesimpulan yang logis dan pasti, bukan berdasarkan opini atau pengetahuan umum di luar premis yang diberikan.
            </p>
          </CardContent>
        </Card>

        <Card class="w-full">
          <CardHeader>
            <CardTitle>Aturan Dasar dan Rumus Silogisme</CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-6">
            <div>
              <h4 class="font-semibold text-foreground mb-2">1. Aturan Mengenai Term (Subjek/Predikat)</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Jumlah term tidak boleh lebih dari tiga: Term Mayor (P), Term Minor (S), dan Term Penengah (M).</li>
                <li>Term Penengah (M) tidak boleh ada dalam kesimpulan. Term ini berfungsi sebagai penghubung antara premis mayor dan minor.</li>
                <li>Term S dan P dalam kesimpulan tidak boleh lebih luas dari term S dan P dalam premis.</li>
              </ul>
            </div>

            <div>
              <h4 class="font-semibold text-foreground mb-2">2. Aturan Mengenai Proposisi (Kalimat Premis)</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Jika kedua premis bersifat afirmatif (positif), maka kesimpulannya juga harus afirmatif.</li>
                <li>Kedua premis tidak boleh bersifat negatif. Jika ya, maka tidak ada kesimpulan yang sah.</li>
                <li>Jika salah satu premis negatif, kesimpulan harus negatif.</li>
                <li>Jika kedua premis partikular (menggunakan kata 'beberapa', 'sebagian'), tidak ada kesimpulan yang sah.</li>
                <li>Jika salah satu premis partikular, kesimpulan harus partikular.</li>
              </ul>
            </div>

             <div>
              <h4 class="font-semibold text-foreground mb-2">3. Rumus Umum Silogisme Kategorik</h4>
              <p>Premis Mayor: Semua M adalah P</p>
              <p>Premis Minor: Semua S adalah M</p>
              <p>----------------------------------</p>
              <p>Kesimpulan: <strong>Semua S adalah P</strong></p>
              <p class="mt-2 text-xs italic">Contoh: Semua makhluk hidup (M) akan mati (P). Manusia (S) adalah makhluk hidup (M). Maka, Semua manusia (S) akan mati (P).</p>
            </div>
          </CardContent>
        </Card>

        <Card class="w-full">
          <CardHeader>
            <CardTitle>Tips dan Trik Mengerjakan Soal Silogisme</CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-4">
            <p>
              <strong>Fokus pada Kata Kunci:</strong> Perhatikan kata-kata seperti "semua", "setiap", "beberapa", "sebagian", "ada", "sementara", "tidak ada", dan "bukan". Kata-kata ini menentukan cakupan dari premis.
            </p>
            <p>
              <strong>Eliminasi Term Penengah (M):</strong> Identifikasi kata atau frasa yang muncul di kedua premis. 'Coret' kata tersebut untuk membantu melihat hubungan langsung antara subjek dan predikat yang tersisa.
            </p>
             <p>
              <strong>Jangan Terkecoh Pilihan Jawaban:</strong> Seringkali pilihan jawaban menyajikan kesimpulan yang "terdengar benar" menurut pengetahuan umum, tetapi tidak bisa ditarik secara logis dari premis yang ada. Selalu berpegang teguh pada informasi di dalam soal.
            </p>
            <p>
              <strong>Waspadai Kesimpulan yang Tidak Pasti:</strong> Jika premis tidak memberikan hubungan yang pasti, kesimpulan yang benar seringkali adalah "Tidak dapat ditarik kesimpulan" atau "Semua pilihan salah".
            </p>
             <p>
              <strong>Aturan "Beberapa/Sebagian":</strong> Jika salah satu premis menggunakan kata "beberapa" atau "sebagian", kesimpulannya TIDAK PERNAH menggunakan kata "semua". Kesimpulannya juga harus mengandung kata "beberapa" atau "sebagian".
            </p>
          </CardContent>
        </Card>
      </template>

      <!-- ======================================================================= -->
      <!-- SLOT: LATIHAN SOAL                                                      -->
      <!-- ======================================================================= -->
      <template #practice>
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Latihan Soal: Silogisme</CardTitle>
            <CardDescription>
              Pilih satu kesimpulan yang paling logis dan benar berdasarkan premis-premis yang diberikan.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <!-- Question Loop -->
            <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
              <p class="font-semibold text-foreground">{{ index + 1 }}. {{ q.question }}</p>
              <RadioGroup v-model="userAnswers[q.id]">
                <div v-for="(option, optIndex) in q.options" :key="optIndex" class="flex items-center space-x-2">
                   <RadioGroupItem :id="`${q.id}-${optIndex}`" :value="optIndex" />
                   <Label :for="`${q.id}-${optIndex}`">{{ option }}</Label>
                </div>
              </RadioGroup>
            </div>

             <!-- Submit Button -->
            <div class="flex justify-end mt-8">
              <Button @click="checkAnswers" :disabled="isQuizFinished">
                Selesai & Cek Jawaban
              </Button>
            </div>
          </CardContent>
        </Card>
      </template>
      
      <!-- ======================================================================= -->
      <!-- SLOT: HASIL DAN PEMBAHASAN                                              -->
      <!-- ======================================================================= -->
      <template #result>
        <Card class="w-full">
            <CardHeader>
              <CardTitle>Hasil dan Pembahasan Latihan</CardTitle>
              <CardDescription>
                Skor Anda: <span class="font-bold text-lg text-primary">{{ score }} / {{ questions.length }}</span>.
                Pelajari pembahasan di bawah ini untuk meningkatkan pemahaman Anda.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-8">
              <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="border p-4 rounded-md"
                   :class="getAnswerStatus(q.id) === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'">
                  
                  <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
                  
                  <div class="mt-4 space-y-2 text-sm">
                      <p>Jawaban Anda: 
                        <span class="font-semibold" :class="getAnswerStatus(q.id) === 'correct' ? 'text-green-700' : 'text-red-700'">
                          {{ userAnswers[q.id] !== undefined ? q.options[userAnswers[q.id]] : 'Tidak dijawab' }}
                        </span>
                        <span v-if="getAnswerStatus(q.id) === 'correct'" class="text-green-700 ml-2">✓ Benar</span>
                        <span v-if="getAnswerStatus(q.id) === 'incorrect'" class="text-red-700 ml-2">✗ Salah</span>
                      </p>
                      <p v-if="getAnswerStatus(q.id) !== 'correct'">
                        Jawaban yang Benar: <span class="font-semibold text-green-700">{{ q.options[q.correctAnswer] }}</span>
                      </p>
                  </div>

                  <div class="mt-4 pt-3 border-t border-dashed">
                      <p class="font-semibold text-foreground text-sm mb-2">Pembahasan:</p>
                      <div class="text-sm text-muted-foreground space-y-2" v-html="q.explanation"></div>
                  </div>
              </div>

               <!-- Reset Button -->
              <div class="flex justify-end mt-8">
                <Button @click="resetQuiz" variant="outline">
                  Ulangi Latihan
                </Button>
              </div>
            </CardContent>
        </Card>
      </template>

    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast' // Assuming a toast component exists for notifications
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group' // Assuming ShadCN-Vue components
import { Label } from '@/components/ui/label'

// --- Layout Configuration ---
const testTitle = 'Seleksi Kompetensi Dasar (SKD)'
const testDescription = 'Latihan Soal untuk Persiapan CPNS 2024'
const unitTitle = 'Kemampuan Verbal: Silogisme (Penarikan Kesimpulan)'
const unitDescription = 'Materi dan latihan soal untuk menguji kemampuan Anda dalam menarik kesimpulan logis dari dua atau lebih premis yang diberikan. Kemampuan ini sangat penting untuk menilai potensi penalaran deduktif Anda.'
const categories = ['TIU', 'Kemampuan Verbal', 'Penalaran Logis']

// --- Page State & Logic ---
const { toast } = useToast()
const router = useRouter()

const handleBack = () => {
  toast({ title: "Navigasi", description: "Kembali ke halaman sebelumnya." })
  // Example: router.push('/tiu/kemampuan-verbal');
}
const handleNext = () => {
  toast({ title: "Navigasi", description: "Lanjut ke unit berikutnya." })
  // Example: router.push('/tiu/kemampuan-numerik');
}

// --- Quiz Data & State ---
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation: string;
}

const questions = ref<Question[]>([
  {
    id: 1,
    question: "Semua karyawan harus memakai seragam. Sebagian karyawan memiliki rambut panjang.",
    options: [
      "Semua karyawan berambut panjang harus memakai seragam.",
      "Sebagian karyawan tidak memakai seragam.",
      "Karyawan yang tidak memakai seragam memiliki rambut pendek.",
      "Sebagian karyawan berambut panjang tidak memakai seragam.",
      "Tidak dapat ditarik kesimpulan."
    ],
    correctAnswer: 0,
    explanation: `
      <p><b>Premis 1 (Mayor):</b> Semua karyawan (P) harus memakai seragam (Q).</p>
      <p><b>Premis 2 (Minor):</b> Sebagian karyawan (P) memiliki rambut panjang (R).</p>
      <p>Kita dapat menyusun ulang premis minor menjadi: Sebagian yang berambut panjang (R) adalah karyawan (P).</p>
      <p>Dari kedua premis, kita bisa menarik kesimpulan bahwa 'Sebagian yang berambut panjang' yang juga merupakan 'karyawan' pasti 'harus memakai seragam'. Maka, kesimpulan yang paling tepat adalah <b>'Semua karyawan berambut panjang harus memakai seragam'</b>. Pilihan lain salah karena bertentangan dengan premis mayor (semua karyawan wajib berseragam).</p>
    `
  },
  {
    id: 2,
    question: "Jika Rina belajar, maka ia akan lulus ujian. Rina tidak lulus ujian.",
    options: [
      "Rina belajar.",
      "Rina tidak belajar.",
      "Rina belajar tetapi tidak lulus ujian.",
      "Rina adalah seorang pemalas.",
      "Tidak dapat ditarik kesimpulan."
    ],
    correctAnswer: 1,
    explanation: `
      <p>Ini adalah bentuk silogisme hipotetik jenis <b>Modus Tollens</b>.</p>
      <p><b>Rumus:</b> Jika P maka Q. Ternyata tidak Q. Kesimpulannya adalah tidak P.</p>
      <p><b>P:</b> Rina belajar.</p>
      <p><b>Q:</b> Ia akan lulus ujian.</p>
      <p><b>Premis 1:</b> Jika P maka Q (Jika Rina belajar, maka ia akan lulus ujian).</p>
      <p><b>Premis 2:</b> Tidak Q (Rina tidak lulus ujian).</p>
      <p><b>Kesimpulan:</b> Tidak P (Rina tidak belajar). Jadi, kesimpulan yang sah adalah <b>'Rina tidak belajar'</b>.</p>
    `
  },
  {
    id: 3,
    question: "Semua ikan bernapas dengan insang. Paus adalah mamalia.",
    options: [
      "Paus bernapas dengan insang.",
      "Paus bukan ikan.",
      "Semua mamalia bernapas dengan insang.",
      "Beberapa ikan adalah mamalia.",
      "Tidak dapat ditarik kesimpulan."
    ],
    correctAnswer: 4,
    explanation: `
      <p><b>Premis 1:</b> Semua ikan (A) bernapas dengan insang (B).</p>
      <p><b>Premis 2:</b> Paus (C) adalah mamalia (D).</p>
      <p>Di sini, tidak ada <b>Term Penengah (Middle Term)</b> yang menghubungkan kedua premis. Premis 1 membahas hubungan 'ikan' dan 'insang'. Premis 2 membahas hubungan 'paus' dan 'mamalia'. Karena tidak ada elemen yang sama yang bisa dieliminasi untuk menghubungkan kedua pernyataan tersebut, maka tidak ada kesimpulan logis yang bisa ditarik. Kesimpulan seperti 'Paus bukan ikan' mungkin benar menurut ilmu biologi, tetapi tidak bisa disimpulkan HANYA dari dua premis yang diberikan. Oleh karena itu, jawaban yang benar adalah <b>'Tidak dapat ditarik kesimpulan'</b>.</p>
    `
  },
  {
    id: 4,
    question: "Tidak ada pahlawan yang korupsi. Semua koruptor adalah pejabat.",
    options: [
      "Tidak ada pejabat yang pahlawan.",
      "Semua pahlawan adalah pejabat.",
      "Sebagian pejabat bukan pahlawan.",
      "Semua pejabat adalah koruptor.",
      "Semua pahlawan bukan pejabat."
    ],
    correctAnswer: 2,
    explanation: `
      <p><b>Premis 1:</b> Tidak ada pahlawan (P) yang korupsi (K).</p>
      <p><b>Premis 2:</b> Semua koruptor (K) adalah pejabat (J).</p>
      <p>Term penengahnya adalah 'korupsi/koruptor' (K). Mari kita analisis: Jika seseorang adalah koruptor, maka dia pasti seorang pejabat. Dan tidak ada pahlawan yang merupakan seorang koruptor. Ini berarti, dalam himpunan 'pejabat', ada sub-himpunan 'koruptor', dan himpunan 'pahlawan' sama sekali tidak beririsan dengan himpunan 'koruptor'.</p>
      <p>Dari sini, kita bisa simpulkan bahwa setidaknya ada sebagian dari pejabat (yaitu yang koruptor) yang sudah pasti bukan pahlawan. Maka kesimpulan yang paling aman dan logis adalah <b>'Sebagian pejabat bukan pahlawan'</b>. Pilihan 'Tidak ada pejabat yang pahlawan' terlalu kuat, karena bisa saja ada pejabat yang tidak korupsi dan merupakan pahlawan. Premis tidak melarang hal itu.</p>
    `
  },
  {
    id: 5,
    question: "Semua seniman kreatif. Sebagian ilmuwan adalah seniman.",
    options: [
      "Semua ilmuwan kreatif.",
      "Sebagian ilmuwan kreatif.",
      "Tidak ada ilmuwan yang kreatif.",
      "Sebagian seniman tidak kreatif.",
      "Ilmuwan dan seniman sama-sama kreatif."
    ],
    correctAnswer: 1,
    explanation: `
      <p><b>Premis 1 (Mayor):</b> Semua seniman (M) adalah kreatif (P).</p>
      <p><b>Premis 2 (Minor):</b> Sebagian ilmuwan (S) adalah seniman (M).</p>
      <p>Term penengah adalah 'seniman' (M). Kita eliminasi M untuk menghubungkan S dan P. Karena premis minor bersifat partikular ('sebagian'), maka kesimpulannya juga harus partikular. Jadi, dari 'sebagian ilmuwan' yang merupakan 'seniman', dan 'semua seniman' itu 'kreatif', maka dapat disimpulkan bahwa <b>'Sebagian ilmuwan kreatif'</b>.</p>
    `
  },
  {
    id: 6,
    question: "Jika harga BBM naik, maka harga kebutuhan pokok naik. Saat ini harga kebutuhan pokok tidak naik.",
    options: [
        "Harga BBM tidak naik.",
        "Harga BBM turun.",
        "Harga BBM stabil.",
        "Pemerintah memberikan subsidi.",
        "Harga BBM naik sedikit."
    ],
    correctAnswer: 0,
    explanation: `
      <p>Ini adalah contoh lain dari <b>Modus Tollens</b>.</p>
      <p><b>Struktur Logis:</b></p>
      <ul>
        <li><b>Premis 1:</b> Jika P (harga BBM naik), maka Q (harga kebutuhan pokok naik).</li>
        <li><b>Premis 2:</b> Ternyata ~Q (harga kebutuhan pokok tidak naik).</li>
      </ul>
      <p><b>Kesimpulan:</b> Maka ~P (harga BBM tidak naik).</p>
      <p>Kesimpulan yang ditarik haruslah negasi dari anteseden (pernyataan P). Oleh karena itu, jawaban yang paling tepat adalah <b>'Harga BBM tidak naik'</b>.</p>
    `
  },
  {
    id: 7,
    question: "Semua peserta CPNS mengerjakan tes SKD. Sebagian peserta CPNS membawa laptop.",
    options: [
        "Semua yang membawa laptop mengerjakan tes SKD.",
        "Sebagian peserta CPNS yang tidak membawa laptop tidak mengerjakan tes SKD.",
        "Semua peserta CPNS membawa laptop.",
        "Sebagian peserta tes SKD tidak membawa laptop.",
        "Tidak ada peserta yang tidak membawa laptop."
    ],
    correctAnswer: 0,
    explanation: `
      <p><b>Premis 1:</b> Semua peserta CPNS (A) mengerjakan tes SKD (B).</p>
      <p><b>Premis 2:</b> Sebagian peserta CPNS (A) membawa laptop (C).</p>
      <p>Fokus pada kelompok 'sebagian peserta CPNS yang membawa laptop'. Karena mereka adalah bagian dari 'semua peserta CPNS', maka mereka juga pasti 'mengerjakan tes SKD'. Dengan kata lain, kelompok 'yang membawa laptop' ini adalah sub-set dari kelompok 'yang mengerjakan tes SKD'. Maka kesimpulan yang paling tepat adalah <b>'Semua yang membawa laptop mengerjakan tes SKD'</b> (dalam konteks peserta CPNS). Pilihan ini secara logis sama dengan 'Sebagian yang mengerjakan tes SKD adalah yang membawa laptop'.</p>
    `
  }
]);

const userAnswers = ref<Record<number, number>>({});
const showResult = ref(false);
const score = ref(0);

const isQuizFinished = computed(() => Object.keys(userAnswers.value).length !== questions.value.length);

function checkAnswers() {
  if (isQuizFinished.value) {
    toast({
      title: 'Belum Selesai!',
      description: 'Harap jawab semua pertanyaan sebelum memeriksa hasil.',
      variant: 'destructive',
    })
    return;
  }
  
  let correctCount = 0;
  questions.value.forEach(q => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  score.value = correctCount;
  showResult.value = true;

  // Scroll to result view
  const resultElement = document.querySelector('[data-slot="result"]'); // You might need to add a data attribute to the result slot wrapper for this to work
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetQuiz() {
  userAnswers.value = {};
  score.value = 0;
  showResult.value = false;
}

function getAnswerStatus(questionId: number): 'correct' | 'incorrect' | 'unanswered' {
  const question = questions.value.find(q => q.id === questionId);
  const userAnswer = userAnswers.value[questionId];

  if (userAnswer === undefined) {
    return 'unanswered';
  }
  if (userAnswer === question?.correctAnswer) {
    return 'correct';
  }
  return 'incorrect';
}

// Set layout for this page
definePageMeta({
  layout: false // We are using our own layout component inside the template
})

</script>

<style scoped>
/* A simple fade transition for the result block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>