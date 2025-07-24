<template>
  <CPNSLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResult"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Materi Pembelajaran                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Materi Pembelajaran</CardTitle>
          <CardDescription>Pahami konsep dasar, rumus, dan tips untuk menyelesaikan soal.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            Kemampuan berhitung adalah salah satu pilar utama dalam Tes Intelegensia Umum (TIU). Unit ini akan mengasah kemampuan Anda dalam tiga area krusial: operasi aritmetika dasar, pecahan, dan persentase. Menguasai area ini akan memberikan Anda kecepatan dan ketepatan yang dibutuhkan saat ujian.
          </p>
          
          <hr />

          <h3>1. Operasi Aritmetika Dasar (KABATAKU)</h3>
          <p>
            Kunci dari operasi hitung campuran adalah mengingat urutan pengerjaan yang benar, yaitu <strong>KABATAKU</strong>:
          </p>
          <ul>
            <li><strong>KA</strong>: Kurung <code>()</code> - Kerjakan operasi di dalam tanda kurung terlebih dahulu.</li>
            <li><strong>BA</strong>: Bagi <code>:</code> atau <code>/</code></li>
            <li><strong>TA</strong>: Kali <code>x</code> atau <code>*</code></li>
            <li><strong>KU</strong>: Kurang <code>-</code> atau Tambah <code>+</code></li>
          </ul>
          <p>
            Operasi pembagian (Bagi) dan perkalian (Kali) setara, kerjakan dari kiri ke kanan. Begitu pula dengan penjumlahan (Tambah) dan pengurangan (Kurang).
          </p>
          <Alert variant="destructive">
             <AlertCircle class="h-4 w-4" />
            <AlertTitle>Contoh Soal</AlertTitle>
            <AlertDescription>
              Hitunglah: <code>15 + (20 x 5) - 100 : 4</code>
              <br/>
              <strong>Penyelesaian:</strong>
              <ol class="list-decimal pl-5 mt-2">
                <li>Kerjakan dalam kurung: <code>20 x 5 = 100</code>. Soal menjadi: <code>15 + 100 - 100 : 4</code></li>
                <li>Kerjakan pembagian: <code>100 : 4 = 25</code>. Soal menjadi: <code>15 + 100 - 25</code></li>
                <li>Kerjakan dari kiri ke kanan: <code>15 + 100 = 115</code>, kemudian <code>115 - 25 = 90</code>.</li>
                <li>Hasil akhirnya adalah <strong>90</strong>.</li>
              </ol>
            </AlertDescription>
          </Alert>
          
          <hr class="my-6"/>

          <h3>2. Pecahan (Fractions)</h3>
          <p>Pecahan digunakan untuk merepresentasikan bagian dari keseluruhan. Terdapat beberapa operasi dasar pada pecahan:</p>
          <ul>
            <li>
              <strong>Penjumlahan & Pengurangan:</strong> Samakan penyebut (angka di bawah) terlebih dahulu dengan mencari KPK (Kelipatan Persekutuan Terkecil), lalu jumlahkan/kurangkan pembilangnya (angka di atas).
              <br/>
              <em>Contoh:</em> <code>1/3 + 1/4 = 4/12 + 3/12 = 7/12</code>
            </li>
            <li>
              <strong>Perkalian:</strong> Langsung kalikan pembilang dengan pembilang, dan penyebut dengan penyebut.
              <br/>
              <em>Contoh:</em> <code>2/5 x 3/4 = (2x3) / (5x4) = 6/20 = 3/10</code> (sederhanakan jika bisa).
            </li>
            <li>
              <strong>Pembagian:</strong> Balik pecahan kedua (pembagi), lalu kalikan.
              <br/>
              <em>Contoh:</em> <code>1/2 : 3/5 = 1/2 x 5/3 = 5/6</code>
            </li>
          </ul>

          <hr class="my-6"/>

          <h3>3. Persentase (%)</h3>
          <p>Persentase adalah bentuk lain dari pecahan dengan penyebut 100. Simbol <code>%</code> berarti "per seratus".</p>
          <p><strong>Rumus Kunci:</strong></p>
          <ul>
            <li>Mengubah persen ke desimal: Bagi dengan 100. (Contoh: <code>75% = 75/100 = 0.75</code>)</li>
            <li>Mengubah desimal ke persen: Kalikan dengan 100. (Contoh: <code>0.4 = 0.4 x 100 = 40%</code>)</li>
            <li>Menghitung nilai persen: <code>Nilai = Persen (%) x Total</code>. (Contoh: 20% dari 150 adalah <code>0.20 x 150 = 30</code>)</li>
            <li>Mencari persentase: <code>Persen (%) = (Bagian / Total) x 100%</code>. (Contoh: Berapa persen 30 dari 200? <code>(30 / 200) x 100% = 15%</code>)</li>
          </ul>
           <Alert variant="destructive">
             <AlertCircle class="h-4 w-4" />
            <AlertTitle>Tips Cepat Persentase</AlertTitle>
            <AlertDescription>
              Hafalkan beberapa bentuk umum untuk mempercepat perhitungan:
              <ul class="list-disc pl-5 mt-2">
                <li><code>10%</code> = 1/10</li>
                <li><code>20%</code> = 1/5</li>
                <li><code>25%</code> = 1/4</li>
                <li><code>50%</code> = 1/2</li>
                <li><code>75%</code> = 3/4</li>
                <li><code>12.5%</code> = 1/8</li>
                <li><code>33.33%</code> = 1/3</li>
              </ul>
               <em>Contoh:</em> Hitung 25% dari 160. Daripada menghitung <code>0.25 x 160</code>, Anda bisa langsung menghitung <code>1/4 x 160 = 40</code>. Lebih cepat!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Latihan Soal                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-if="!showResult" class="w-full">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Latihan Soal Interaktif</CardTitle>
              <CardDescription>Kerjakan soal berikut untuk menguji pemahamanmu.</CardDescription>
            </div>
            <div class="text-sm text-muted-foreground font-medium">
              Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress :model-value="progressPercentage" class="mb-6" />
          
          <div v-if="currentQuestion" class="space-y-6">
            <p class="font-semibold text-lg leading-relaxed">{{ currentQuestion.text }}</p>

            <RadioGroup v-model="selectedOption" :disabled="isAnswerSubmitted">
              <div v-for="(option, index) in currentQuestion.options" :key="index" class="space-y-1">
                <div 
                  :class="[
                    'flex items-center p-3 rounded-md border transition-colors',
                    getOptionClass(index)
                  ]"
                >
                  <RadioGroupItem :id="`r${index}`" :value="index" />
                  <Label :for="`r${index}`" class="ml-3 cursor-pointer flex-1">{{ option }}</Label>
                </div>
              </div>
            </RadioGroup>

            <Transition name="fade" mode="out-in">
              <Alert v-if="isAnswerSubmitted" :variant="isCorrect ? 'default' : 'destructive'" class="bg-opacity-20">
                 <component :is="isCorrect ? CheckCircle2 : AlertTriangle" class="h-4 w-4" />
                <AlertTitle>{{ isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat' }}</AlertTitle>
                <AlertDescription class="prose prose-sm max-w-none">
                  <strong>Pembahasan:</strong>
                  <p v-html="currentQuestion.explanation"></p>
                </AlertDescription>
              </Alert>
            </Transition>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
            <Button v-if="!isAnswerSubmitted" :disabled="selectedOption === null" @click="submitAnswer">
              Cek Jawaban
            </Button>
            <Button v-else @click="nextQuestion">
              {{ currentQuestionIndex === questions.length - 1 ? 'Lihat Hasil' : 'Soal Berikutnya' }}
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: Hasil Latihan                                                     -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="w-full text-center">
          <CardHeader>
            <CardTitle class="text-2xl md:text-3xl">Hasil Latihan Selesai!</CardTitle>
            <CardDescription>Berikut adalah rekapitulasi dari sesi latihan Anda.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex justify-center items-center">
              <div class="relative h-40 w-40">
                 <svg class="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-gray-700" stroke-width="2"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600" stroke-width="2" :stroke-dasharray="`${scorePercentage} 100`" stroke-linecap="round" transform="rotate(-90 18 18)"></circle>
                </svg>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                  {{ scorePercentage }}%
                </div>
              </div>
            </div>
            
            <p class="text-xl">
              Anda menjawab dengan benar <strong>{{ score }}</strong> dari <strong>{{ questions.length }}</strong> soal.
            </p>
            
            <Alert :variant="scorePercentage >= 80 ? 'default' : 'destructive'" class="text-left">
              <Rocket v-if="scorePercentage >= 80" class="h-4 w-4" />
              <AlertCircle v-else class="h-4 w-4" />
              <AlertTitle>{{ resultMessage.title }}</AlertTitle>
              <AlertDescription>
                {{ resultMessage.description }}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter class="justify-center">
            <Button size="lg" @click="restartQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
          </CardFooter>
       </Card>
    </template>

  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import { ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, Rocket, RefreshCw } from 'lucide-vue-next'

// --- Layout and Page Meta ---
definePageMeta({
  layout: 'cpns-layout',
})

// --- Component Imports (assuming they are auto-imported or globally registered) ---
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// --- Type Definition for a Question ---
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

// --- Page & Layout Configuration ---
const testTitle = 'Tes Intelegensia Umum (TIU)'
const testDescription = 'Latihan soal untuk Seleksi Kompetensi Dasar (SKD) CPNS.'
const unitTitle = 'Kemampuan Numerik: Berhitung'
const unitDescription = 'Mengasah kemampuan dalam operasi aritmetika dasar, pecahan, dan persentase.'
const categories = ref(['Numerik', 'Aritmetika', 'Pecahan', 'Persentase'])

// --- Reactive State Management ---
const allQuestions = ref<Question[]>([
  {
    id: 1,
    text: "Hasil dari (15 x 4) + (30 : 5) - 12 adalah...",
    options: ["54", "66", "48", "58"],
    correctAnswerIndex: 0,
    explanation: "Sesuai aturan KABATAKU: <br>1. Kerjakan perkalian: 15 x 4 = 60. <br>2. Kerjakan pembagian: 30 : 5 = 6. <br>3. Soal menjadi: 60 + 6 - 12. <br>4. Kerjakan penjumlahan: 60 + 6 = 66. <br>5. Kerjakan pengurangan: 66 - 12 = 54."
  },
  {
    id: 2,
    text: "Jika 2/5 dari sebuah tangki berisi 20 liter air, berapa liter kapasitas penuh tangki tersebut?",
    options: ["40 liter", "50 liter", "60 liter", "8 liter"],
    correctAnswerIndex: 1,
    explanation: "Misal kapasitas penuh tangki adalah X. <br>Maka, (2/5) * X = 20. <br>Untuk mencari X, kita kalikan kedua sisi dengan 5/2: <br>X = 20 * (5/2) <br>X = 100 / 2 = 50 liter."
  },
  {
    id: 3,
    text: "Sebuah baju dijual dengan diskon 30%. Jika harga awal baju tersebut adalah Rp 250.000, berapakah harga yang harus dibayar?",
    options: ["Rp 75.000", "Rp 150.000", "Rp 175.000", "Rp 220.000"],
    correctAnswerIndex: 2,
    explanation: "Besar diskon = 30% dari Rp 250.000 <br>= (30/100) * 250.000 = Rp 75.000. <br>Harga yang harus dibayar = Harga awal - Diskon <br>= Rp 250.000 - Rp 75.000 = Rp 175.000."
  },
  {
    id: 4,
    text: "Urutkan pecahan berikut dari yang terkecil hingga terbesar: 3/4, 2/3, 5/6.",
    options: ["2/3, 3/4, 5/6", "3/4, 2/3, 5/6", "5/6, 3/4, 2/3", "2/3, 5/6, 3/4"],
    correctAnswerIndex: 0,
    explanation: "Untuk membandingkan, samakan penyebutnya. KPK dari 4, 3, dan 6 adalah 12. <br>3/4 = 9/12 <br>2/3 = 8/12 <br>5/6 = 10/12 <br>Jika diurutkan dari yang terkecil berdasarkan pembilangnya: 8/12, 9/12, 10/12. <br>Ini setara dengan 2/3, 3/4, 5/6."
  },
  {
    id: 5,
    text: "Hasil dari 1/2 + 3/4 : 1/4 adalah...",
    options: ["3 1/2", "2", "4", "2 1/4"],
    correctAnswerIndex: 0,
    explanation: "Kerjakan pembagian terlebih dahulu: <br>3/4 : 1/4 = 3/4 x 4/1 = 12/4 = 3. <br>Soal menjadi: 1/2 + 3. <br>Hasilnya adalah 3 1/2."
  },
  {
    id: 6,
    text: "Jika 15 adalah 25% dari x, maka nilai x adalah...",
    options: ["45", "50", "60", "75"],
    correctAnswerIndex: 2,
    explanation: "25% sama dengan 1/4. <br>Maka, 15 = (1/4) * x. <br>Untuk mencari x, kalikan kedua sisi dengan 4: <br>x = 15 * 4 = 60."
  },
   {
    id: 7,
    text: "Berapakah 62,5% dari 160?",
    options: ["80", "90", "100", "110"],
    correctAnswerIndex: 2,
    explanation: "Persentase 62,5% adalah bentuk lain dari pecahan 5/8. Menghafal ini akan sangat membantu. <br>Maka, perhitungannya menjadi: <br>(5/8) x 160 <br>= 5 x (160/8) <br>= 5 x 20 = 100."
  },
  {
    id: 8,
    text: "Hasil dari 2.5 x (1/5) - 0.25 adalah...",
    options: ["0.25", "0.50", "0.75", "1.00"],
    correctAnswerIndex: 0,
    explanation: "Ubah semua ke bentuk desimal atau pecahan. Mari kita gunakan desimal. <br>1/5 = 0.2. <br>Soal menjadi: 2.5 x 0.2 - 0.25. <br>Kerjakan perkalian: 2.5 x 0.2 = 0.5. <br>Soal menjadi: 0.5 - 0.25. <br>Hasilnya adalah 0.25."
  },
]);

const questions = ref<Question[]>([]);
const currentQuestionIndex = ref(0);
const selectedOption = ref<number | null>(null);
const userAnswers = ref<(number | null)[]>([]);
const isAnswerSubmitted = ref(false);
const showResult = ref(false);

// --- Computed Properties ---
const currentQuestion = computed<Question | undefined>(() => {
  return questions.value[currentQuestionIndex.value];
});

const progressPercentage = computed(() => {
  return ((currentQuestionIndex.value + (isAnswerSubmitted.value ? 1 : 0)) / questions.value.length) * 100;
});

const score = computed(() => {
  return userAnswers.value.reduce((total, answer, index) => {
    if (answer === questions.value[index].correctAnswerIndex) {
      return total + 1;
    }
    return total;
  }, 0);
});

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return Math.round((score.value / questions.value.length) * 100);
});

const isCorrect = computed(() => {
  if (currentQuestion.value === undefined || selectedOption.value === null) return false;
  return selectedOption.value === currentQuestion.value.correctAnswerIndex;
});

const resultMessage = computed(() => {
  const percentage = scorePercentage.value;
  if (percentage >= 80) {
    return { title: "Luar Biasa!", description: "Pemahaman Anda sangat baik. Pertahankan momentum ini dan terus berlatih untuk hasil yang lebih maksimal!" };
  } else if (percentage >= 60) {
    return { title: "Bagus!", description: "Anda sudah di jalur yang benar. Tinjau kembali materi dan soal yang salah untuk meningkatkan skor Anda." };
  } else {
    return { title: "Terus Berjuang!", description: "Jangan berkecil hati. Setiap kesalahan adalah kesempatan belajar. Pahami kembali konsep dasar dan coba lagi!" };
  }
});


// --- Functions / Methods ---
const shuffleQuestions = (array: Question[]) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const initializeQuiz = () => {
  questions.value = shuffleQuestions([...allQuestions.value]);
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  userAnswers.value = Array(questions.value.length).fill(null);
  isAnswerSubmitted.value = false;
  showResult.value = false;
};

const submitAnswer = () => {
  if (selectedOption.value === null) return;
  userAnswers.value[currentQuestionIndex.value] = selectedOption.value;
  isAnswerSubmitted.value = true;
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    selectedOption.value = null;
    isAnswerSubmitted.value = false;
  } else {
    showResult.value = true;
  }
};

const restartQuiz = () => {
  initializeQuiz();
};

const getOptionClass = (index: number) => {
  if (!isAnswerSubmitted.value) {
    return selectedOption.value === index 
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
      : 'cursor-pointer hover:bg-muted/50';
  }
  
  const isCorrectAnswer = index === currentQuestion.value?.correctAnswerIndex;
  const isSelectedAnswer = index === selectedOption.value;

  if (isCorrectAnswer) {
    return 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
  }
  if (isSelectedAnswer && !isCorrectAnswer) {
    return 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  }
  return 'border-muted';
};

// --- Layout Event Handlers ---
// In a real app, these would navigate to different pages/units.
// Here, we'll link 'next' to the quiz progression for convenience.
const handleBack = () => {
  if (currentQuestionIndex.value > 0 && !showResult.value) {
    currentQuestionIndex.value--;
    isAnswerSubmitted.value = false;
    selectedOption.value = userAnswers.value[currentQuestionIndex.value];
  } else {
    alert('Navigasi "Back" (Kembali ke menu utama/unit sebelumnya)');
  }
}

const handleNext = () => {
   if (!isAnswerSubmitted.value) {
     alert('Silakan cek jawaban Anda terlebih dahulu sebelum melanjutkan.');
     return;
   }
   if (!showResult.value) {
     nextQuestion();
   } else {
     alert('Navigasi "Next" (Lanjut ke unit berikutnya)');
   }
}

// --- Lifecycle Hook ---
onMounted(() => {
  initializeQuiz();
});
</script>

<style scoped>
/* Simple fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>