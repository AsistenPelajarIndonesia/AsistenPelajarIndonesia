<template>
  <CPNSLayout
    :test-title="pageInfo.testTitle"
    :test-description="pageInfo.testDescription"
    :unit-title="pageInfo.unitTitle"
    :unit-description="pageInfo.unitDescription"
    :categories="pageInfo.categories"
    :show-result="showResult"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Konsep Dasar Perbandingan Kuantitatif</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Perbandingan Kuantitatif adalah salah satu jenis soal dalam Tes Intelegensia Umum (TIU) yang menguji kemampuan Anda untuk menganalisis dan membandingkan dua buah nilai atau kuantitas, yang biasanya diberi label <strong>P</strong> dan <strong>Q</strong>.
          </p>
          <p>
            Tugas Anda adalah menentukan hubungan antara P dan Q berdasarkan informasi yang diberikan. Terdapat empat kemungkinan jawaban yang harus Anda pilih:
          </p>
          <ul>
            <li><strong>P > Q</strong> : Nilai P lebih besar dari nilai Q.</li>
            <li><strong>P < Q</strong> : Nilai P lebih kecil dari nilai Q.</li>
            <li><strong>P = Q</strong> : Nilai P sama dengan nilai Q.</li>
            <li><strong>Informasi tidak cukup</strong>: Data yang diberikan tidak memadai untuk menentukan hubungan antara P dan Q.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategi dan Tips Mengerjakan Soal</CardTitle>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none space-y-4 text-muted-foreground">
          <div>
            <h4>1. Jangan Terburu-buru Menghitung</h4>
            <p>Seringkali, soal dirancang untuk diselesaikan dengan logika atau penyederhanaan, bukan dengan perhitungan yang rumit. Carilah cara untuk menyederhanakan kedua kuantitas sebelum melakukan kalkulasi penuh.</p>
            <p><strong>Contoh:</strong> Jika P = 25% dari 800 dan Q = 80% dari 250. Anda bisa melihat bahwa 0.25 * 800 = 200 dan 0.8 * 250 = 200. Jadi, P = Q. Anda tidak perlu kalkulator.</p>
          </div>
          <div>
            <h4>2. Perhatikan Variabel dan Batasannya</h4>
            <p>Jika soal melibatkan variabel (seperti x, y, a, b), perhatikan baik-baik batasan yang diberikan. Apakah variabel tersebut bilangan positif, negatif, nol, bulat, atau pecahan? Jawaban bisa berubah drastis tergantung pada batasan ini.</p>
            <p><strong>Contoh:</strong> Jika P = x² dan Q = x. Jika x > 1, maka P > Q. Tapi jika 0 < x < 1, maka P < Q. Jika tidak ada batasan untuk x, maka hubungan tidak dapat ditentukan.</p>
          </div>
          <div>
            <h4>3. Gunakan Metode Substitusi atau Uji Kasus</h4>
            <p>Untuk soal dengan variabel, cobalah substitusikan beberapa nilai yang memenuhi syarat untuk menguji hubungan antara P dan Q. Uji dengan nilai positif, negatif, nol, pecahan, dan bilangan bulat jika memungkinkan.</p>
            <p><strong>Contoh:</strong> Jika a > 0 dan b < 0. P = a - b dan Q = a + b.
              <br>Uji kasus: a=2, b=-3. Maka P = 2 - (-3) = 5 dan Q = 2 + (-3) = -1. Disini P > Q.
              <br>Karena 'a' selalu positif dan '-b' juga menjadi positif, maka P pasti positif. Sedangkan 'a+b' bisa positif atau negatif. Namun, karena P = a + |b| dan Q = a - |b|, maka P akan selalu lebih besar dari Q.
            </p>
          </div>
           <div>
            <h4>4. Waspadai Jawaban "Informasi Tidak Cukup"</h4>
            <p>Pilihan ini seringkali menjadi jawaban yang benar ketika informasi yang diberikan bersifat ambigu atau tidak lengkap, sehingga memungkinkan beberapa hubungan yang berbeda antara P dan Q. Jika Anda bisa menemukan satu skenario di mana P > Q dan skenario lain di mana P < Q (dengan informasi yang sama), maka jawabannya pasti ini.</p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL INTERAKTIF                                         -->
    <!-- ======================================================================= -->
    <template #practice>
        <Card class="sticky top-[160px]">
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Latihan Soal {{ currentQuestionIndex + 1 }} / {{ questions.length }}</CardTitle>
              <div class="text-sm font-medium text-muted-foreground">
                Sisa Waktu: <span class="font-bold text-primary">--:--</span>
              </div>
            </div>
            <CardDescription>Pilih salah satu jawaban yang paling tepat untuk menentukan hubungan antara P dan Q.</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="!practiceFinished">
                <!-- Informasi Tambahan -->
                <div v-if="currentQuestion.information" class="mb-4 rounded-md border border-l-4 border-blue-500 bg-blue-50 p-4">
                  <p class="font-semibold text-blue-800">Informasi:</p>
                  <p class="text-sm text-blue-700" v-html="currentQuestion.information"></p>
                </div>
                
                <!-- Kuantitas P dan Q -->
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="rounded-lg border bg-card p-4">
                        <p class="mb-2 text-center font-bold text-primary">Kuantitas P</p>
                        <p class="text-center text-sm text-muted-foreground" v-html="currentQuestion.p_description"></p>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <p class="mb-2 text-center font-bold text-primary">Kuantitas Q</p>
                        <p class="text-center text-sm text-muted-foreground" v-html="currentQuestion.q_description"></p>
                    </div>
                </div>

                <!-- Pilihan Jawaban -->
                <div class="mt-6 space-y-3">
                    <Button 
                        v-for="option in currentQuestion.options" 
                        :key="option.id"
                        :variant="userAnswers[currentQuestion.id] === option.id ? 'default' : 'outline'"
                        class="w-full justify-start text-left h-auto py-3"
                        @click="selectAnswer(currentQuestion.id, option.id)"
                    >
                        <span class="mr-4 flex h-6 w-6 items-center justify-center rounded-full border font-bold">{{ option.id }}</span>
                        <span class="flex-1 whitespace-normal">{{ option.text }}</span>
                    </Button>
                </div>
            </div>
            <div v-else class="text-center py-8">
              <h3 class="text-xl font-semibold">Latihan Selesai!</h3>
              <p class="text-muted-foreground mt-2">Klik tombol "Lihat Hasil" di bawah untuk meninjau jawaban Anda.</p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between">
              <Button variant="outline" @click="prevQuestion" :disabled="currentQuestionIndex === 0">
                <ArrowLeft class="h-4 w-4 mr-2"/>
                Sebelumnya
              </Button>
              <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">
                Selanjutnya
                <ArrowRight class="h-4 w-4 ml-2"/>
              </Button>
              <Button v-else-if="!practiceFinished" @click="finishPractice" class="bg-green-600 hover:bg-green-700">
                Kumpulkan Jawaban
              </Button>
               <Button v-if="practiceFinished" @click="showResult = true">
                Lihat Hasil
              </Button>
          </CardFooter>
        </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Hasil dan Pembahasan</CardTitle>
          <CardDescription>Tinjau kembali jawaban Anda untuk memahami konsep lebih dalam. Kesalahan adalah guru terbaik!</CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Ringkasan Skor -->
          <div class="mb-8 rounded-lg border bg-muted p-6 text-center">
            <h3 class="text-lg font-semibold text-muted-foreground">Skor Akhir Anda</h3>
            <p class="text-5xl font-bold tracking-tight text-primary">{{ score.correct }} / {{ score.total }}</p>
            <p class="mt-2 text-muted-foreground">{{ getPerformanceMessage(score.correct / score.total) }}</p>
            <Button @click="resetPractice" class="mt-4">
              Ulangi Latihan
            </Button>
          </div>

          <!-- Detail Pembahasan per Soal -->
          <div class="space-y-6">
            <div v-for="(result, index) in results" :key="result.id">
              <h4 class="font-semibold">Soal {{ index + 1 }}</h4>
              
              <!-- Informasi Tambahan (jika ada) -->
              <div v-if="result.information" class="my-2 rounded-md border-l-4 border-gray-300 bg-gray-50 p-3">
                  <p class="text-xs text-gray-600" v-html="result.information"></p>
              </div>

              <!-- Perbandingan P dan Q -->
              <div class="my-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                <div class="rounded-md border p-3 text-center text-sm"><strong>P:</strong> <span v-html="result.p_description"></span></div>
                <div class="rounded-md border p-3 text-center text-sm"><strong>Q:</strong> <span v-html="result.q_description"></span></div>
              </div>

              <!-- Status Jawaban -->
              <div class="flex flex-wrap gap-2 text-sm">
                <Badge :variant="result.isCorrect ? 'default' : 'destructive'" class="bg-green-600">
                  Jawaban Anda: {{ result.userAnswer }} ({{ result.isCorrect ? 'Benar' : 'Salah' }})
                </Badge>
                <Badge variant="secondary">
                  Jawaban Benar: {{ result.correctAnswer }}
                </Badge>
              </div>

              <!-- Penjelasan -->
              <div class="mt-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 prose prose-sm max-w-none">
                <h5 class="font-bold text-yellow-900">Pembahasan:</h5>
                <div class="text-yellow-800" v-html="result.explanation"></div>
              </div>
              <Separator class="mt-6"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-vue-next';

// Impor komponen UI secara eksplisit (best practice di Nuxt)
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CPNSLayout from '@/layouts/CPNSLayout.vue' 


// --- DATA & STATE MANAGEMENT ---

// Informasi Halaman untuk Layout
const pageInfo = reactive({
  testTitle: 'Tes Intelegensia Umum (TIU)',
  testDescription: 'Latihan Soal CPNS Berbasis Kategori',
  unitTitle: 'Kemampuan Numerik: Perbandingan Kuantitatif',
  unitDescription: 'Menganalisis dan membandingkan dua nilai kuantitatif (P dan Q) untuk menentukan hubungannya.',
  categories: ['CPNS', 'TIU', 'SKD', 'Numerik', 'Perbandingan Kuantitatif'],
});

interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

interface Question {
  id: number;
  information?: string;
  p_description: string;
  q_description: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

// Bank Soal
const questions = ref<Question[]>([
    {
    id: 1,
    information: "x adalah bilangan bulat positif.",
    p_description: "Diskon 20% dari Rp x",
    q_description: "Rp 20.000",
    options: [
      { id: 'A', text: 'P > Q' },
      { id: 'B', text: 'P < Q' },
      { id: 'C', text: 'P = Q' },
      { id: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan.' },
    ],
    correctAnswer: 'D',
    explanation: `
      <p>P = 20% dari x = 0.2 * x</p>
      <p>Q = 20.000</p>
      <p>Hubungan P dan Q bergantung pada nilai x. x adalah bilangan bulat positif, tetapi tidak ada batas atasnya.</p>
      <ul>
        <li>Jika x = 50.000, maka P = 0.2 * 50.000 = 10.000. Jadi, <strong>P < Q</strong>.</li>
        <li>Jika x = 100.000, maka P = 0.2 * 100.000 = 20.000. Jadi, <strong>P = Q</strong>.</li>
        <li>Jika x = 200.000, maka P = 0.2 * 200.000 = 40.000. Jadi, <strong>P > Q</strong>.</li>
      </ul>
      <p>Karena kita bisa mendapatkan semua kemungkinan hubungan (P < Q, P = Q, P > Q), maka informasi yang diberikan tidak cukup untuk membuat keputusan.</p>
    `,
  },
  {
    id: 2,
    information: "y adalah bilangan negatif.",
    p_description: "y<sup>3</sup>",
    q_description: "y<sup>2</sup>",
    options: [
      { id: 'A', text: 'P > Q' },
      { id: 'B', text: 'P < Q' },
      { id: 'C', text: 'P = Q' },
      { id: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan.' },
    ],
    correctAnswer: 'B',
    explanation: `
      <p>Diketahui <strong>y</strong> adalah bilangan negatif.</p>
      <p><strong>P = y<sup>3</sup></strong>. Bilangan negatif yang dipangkatkan dengan bilangan ganjil (3) akan selalu menghasilkan bilangan negatif.</p>
      <p><strong>Q = y<sup>2</sup></strong>. Bilangan negatif yang dipangkatkan dengan bilangan genap (2) akan selalu menghasilkan bilangan positif.</p>
      <p>Setiap bilangan negatif pasti lebih kecil dari bilangan positif. Oleh karena itu, <strong>P < Q</strong>.</p>
      <p>Contoh: jika y = -2, maka P = (-2)³ = -8 dan Q = (-2)² = 4. Jelas -8 < 4.</p>
    `,
  },
  {
    id: 3,
    p_description: "17.5% dari 400",
    q_description: "40% dari 175",
    options: [
      { id: 'A', text: 'P > Q' },
      { id: 'B', text: 'P < Q' },
      { id: 'C', text: 'P = Q' },
      { id: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan.' },
    ],
    correctAnswer: 'C',
    explanation: `
      <p>Ini adalah contoh soal di mana Anda tidak perlu menghitung secara penuh jika jeli.</p>
      <p>P = 17.5% dari 400 = (17.5 / 100) * 400</p>
      <p>Q = 40% dari 175 = (40 / 100) * 175</p>
      <p>Lihat strukturnya:</p>
      <p>P = (17.5 * 400) / 100</p>
      <p>Q = (40 * 175) / 100</p>
      <p>Kita hanya perlu membandingkan pembilangnya: 17.5 * 400 dengan 40 * 175.</p>
      <p>17.5 * 400 = 17.5 * 4 * 100 = 70 * 100 = 7000</p>
      <p>40 * 175 = 4 * 10 * 175 = 4 * 1750 = 7000</p>
      <p>Karena kedua hasilnya sama, maka <strong>P = Q</strong>.</p>
      <p>Atau dengan perhitungan langsung: P = 0.175 * 400 = 70. Q = 0.40 * 175 = 70.</p>
    `,
  },
  {
    id: 4,
    information: "Sebuah persegi memiliki sisi sepanjang x cm. Sebuah lingkaran memiliki jari-jari y cm. Luas persegi sama dengan luas lingkaran.",
    p_description: "Keliling persegi",
    q_description: "Keliling lingkaran",
    options: [
      { id: 'A', text: 'P > Q' },
      { id: 'B', text: 'P < Q' },
      { id: 'C', text: 'P = Q' },
      { id: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan.' },
    ],
    correctAnswer: 'A',
    explanation: `
      <p>Diketahui Luas Persegi = Luas Lingkaran.</p>
      <p>Luas Persegi = s² = x²</p>
      <p>Luas Lingkaran = πr² = πy²</p>
      <p>Maka, x² = πy²  =>  x = y√π</p>
      <br>
      <p>Sekarang kita bandingkan kelilingnya.</p>
      <p><strong>P = Keliling Persegi</strong> = 4s = 4x</p>
      <p><strong>Q = Keliling Lingkaran</strong> = 2πr = 2πy</p>
      <p>Kita substitusikan nilai x dari persamaan luas: P = 4(y√π)</p>
      <p>Sekarang bandingkan P = 4y√π dengan Q = 2πy.</p>
      <p>Kita bisa membagi kedua sisi dengan 2y (karena y pasti positif, tidak mungkin jari-jari negatif atau nol):</p>
      <p>P' = 2√π</p>
      <p>Q' = π</p>
      <p>Kita tahu π ≈ 3.14 dan √π ≈ 1.77. Jadi:</p>
      <p>P' = 2 * 1.77 = 3.54</p>
      <p>Q' = 3.14</p>
      <p>Karena P' > Q', maka <strong>P > Q</strong>.</p>
      <p>Cara lain: bandingkan (2√π)² dengan (π)². (2√π)² = 4π. (π)² = π². Karena π > 1, maka π² > 4π adalah salah. Sebaliknya, π < 4, jadi π² > 4π tidak selalu benar. Mari bandingkan 2√π dan π. Kuadratkan keduanya: 4π dan π². Bagi dengan π (karena π > 0): 4 dan π. Karena 4 > π, maka 2√π > π. Sehingga P > Q.</p>
    `,
  },
    {
    id: 5,
    information: "0 < a < 1",
    p_description: "1 / a",
    q_description: "a",
    options: [
      { id: 'A', text: 'P > Q' },
      { id: 'B', text: 'P < Q' },
      { id: 'C', text: 'P = Q' },
      { id: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan.' },
    ],
    correctAnswer: 'A',
    explanation: `
      <p>Diketahui <strong>a</strong> adalah bilangan pecahan antara 0 dan 1.</p>
      <p>Mari kita uji dengan sebuah nilai. Misal, a = 1/2 (atau 0.5).</p>
      <p><strong>P = 1 / a</strong> = 1 / (1/2) = 2.</p>
      <p><strong>Q = a</strong> = 1/2.</p>
      <p>Dalam kasus ini, P = 2 dan Q = 1/2. Jelas bahwa 2 > 1/2, sehingga <strong>P > Q</strong>.</p>
      <p>Ini berlaku untuk setiap bilangan pecahan antara 0 dan 1. Kebalikan dari sebuah pecahan positif yang lebih kecil dari 1 akan selalu menghasilkan bilangan yang lebih besar dari 1.</p>
    `,
  },
]);

// State Interaktif
const currentQuestionIndex = ref(0);
const userAnswers = reactive<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
const showResult = ref(false);
const practiceFinished = ref(false);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

interface Result extends Question {
    userAnswer: string | null;
    isCorrect: boolean;
}
const results = ref<Result[]>([]);
const score = reactive({ correct: 0, total: 0 });

// --- FUNGSI & LOGIKA ---

const router = useRouter();

function handleBack() {
  // Logika untuk tombol "Back" di header
  router.push('/cpns/tiu'); // kembali ke halaman list materi TIU
}

function handleNext() {
  // Logika untuk tombol "Next" di header
  // Mungkin bisa ke unit selanjutnya
  alert('Navigasi ke unit selanjutnya belum diimplementasikan.');
}

function selectAnswer(questionId: number, optionId: 'A' | 'B' | 'C' | 'D') {
    userAnswers[questionId] = optionId;
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

function finishPractice() {
    practiceFinished.value = true;
    calculateResults();
}

function calculateResults() {
    let correctCount = 0;
    const detailedResults: Result[] = [];
    
    questions.value.forEach(q => {
        const userAnswer = userAnswers[q.id] || null;
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) {
            correctCount++;
        }
        detailedResults.push({
            ...q,
            userAnswer,
            isCorrect
        });
    });

    score.correct = correctCount;
    score.total = questions.value.length;
    results.value = detailedResults;
}

function getPerformanceMessage(ratio: number): string {
    if (ratio === 1) return "Luar Biasa! Anda menjawab semua soal dengan benar. Pertahankan!";
    if (ratio >= 0.8) return "Sangat Baik! Anda sudah sangat menguasai materi ini.";
    if (ratio >= 0.6) return "Bagus! Pemahaman Anda sudah cukup baik, tinggal perbanyak latihan.";
    if (ratio >= 0.4) return "Cukup. Anda perlu meninjau kembali materi dan pembahasan untuk meningkatkan pemahaman.";
    return "Terus Belajar! Jangan menyerah, pelajari lagi pembahasan di bawah dan coba lagi.";
}

function resetPractice() {
    currentQuestionIndex.value = 0;
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    showResult.value = false;
    practiceFinished.value = false;
    results.value = [];
    score.correct = 0;
    score.total = 0;
    // Scroll to top of practice section
    const practiceElement = document.querySelector('#practice');
    if (practiceElement) {
        practiceElement.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<style scoped>
/* Menambahkan style untuk transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Style untuk konten yang di-render dari v-html agar terlihat lebih baik */
.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
.prose ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
}
.prose strong {
  font-weight: 600;
}
</style>