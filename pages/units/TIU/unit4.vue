<template>
  <!-- 
    ==================================================================================
    HALAMAN PERSIAPAN CPNS: TES INTELEGENSIA UMUM (TIU)
    Unit: Kemampuan Numerik - Deret Angka dan Huruf
    ==================================================================================
    Halaman ini dirancang sebagai platform latihan interaktif untuk calon peserta CPNS.
    Struktur halaman ini menggunakan layout kustom 'CPNSLayout' dan dibagi menjadi tiga bagian utama
    menggunakan slot:
    1. #material: Berisi materi pembelajaran mendalam tentang pola deret.
    2. #practice: Berisi soal-soal latihan Multiple Choice Questions (MCQ) yang interaktif.
    3. #result: Menampilkan hasil latihan, skor, dan pembahasan mendetail setelah pengguna selesai.

    Tujuan utama halaman ini adalah untuk meningkatkan pemahaman dan kecepatan pengguna dalam 
    mengenali berbagai macam pola deret angka dan huruf yang sering muncul dalam tes CPNS.
  -->
  <CPNSLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="quizSubmitted"
    @back="handleNavigation('back')"
    @next="handleNavigation('next')"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material: MATERI PEMBELAJARAN                                     -->
    <!-- ======================================================================= -->
    <!-- 
      Bagian ini berfungsi sebagai buku panduan mini. Isinya menjelaskan konsep dasar 
      dan berbagai jenis pola deret yang ada, lengkap dengan contoh dan cara penyelesaiannya.
      Penjelasan dibuat terstruktur agar mudah dipahami oleh pengguna dari berbagai tingkat kemampuan.
    -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-base font-semibold md:text-lg">
            Materi Pembelajaran: Menguasai Pola Deret Angka dan Huruf
          </CardTitle>
        </CardHeader>
        <div class="p-6 pt-0 text-sm text-muted-foreground">
          <p class="mb-4">
            Tes deret angka dan huruf menguji kemampuan Anda dalam menganalisis dan menemukan pola yang tersembunyi dari suatu barisan angka atau huruf. Kunci untuk menyelesaikan soal jenis ini adalah ketenangan, ketelitian, dan pemahaman terhadap berbagai jenis pola yang mungkin muncul.
          </p>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-foreground">1. Pola Aritmetika (Pola Tunggal)</h4>
              <p>Pola paling dasar di mana setiap suku berikutnya didapat dari penambahan atau pengurangan dengan bilangan yang sama (konstan).</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 5, 10, 15, 20, ... (Setiap suku ditambah 5)</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 100, 97, 94, 91, ... (Setiap suku dikurangi 3)</p>
            </div>
            
            <div>
              <h4 class="font-semibold text-foreground">2. Pola Geometri (Pola Tunggal)</h4>
              <p>Setiap suku berikutnya didapat dari perkalian atau pembagian dengan bilangan yang sama (rasio konstan).</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 3, 9, 27, 81, ... (Setiap suku dikali 3)</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 160, 80, 40, 20, ... (Setiap suku dibagi 2)</p>
            </div>

            <div>
              <h4 class="font-semibold text-foreground">3. Pola Bertingkat</h4>
              <p>Pola di mana selisih antar suku membentuk sebuah deret baru yang memiliki pola teratur. Anda mungkin perlu mencari selisih dari selisihnya.</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 2, 3, 5, 8, 12, ...</p>
              <p class="mt-1 pl-4 text-xs">Selisihnya: +1, +2, +3, +4, ... (Membentuk deret aritmetika)</p>
            </div>
            
            <div>
              <h4 class="font-semibold text-foreground">4. Pola Larik / Loncat</h4>
              <p>Deret ini memiliki dua atau lebih pola yang berjalan secara bersamaan dengan melompati satu atau beberapa suku.</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 10, 30, 12, 40, 14, 50, ...</p>
              <p class="mt-1 pl-4 text-xs">Pola 1 (suku ganjil): 10, 12, 14, ... (ditambah 2)</p>
              <p class="mt-1 pl-4 text-xs">Pola 2 (suku genap): 30, 40, 50, ... (ditambah 10)</p>
            </div>

            <div>
              <h4 class="font-semibold text-foreground">5. Pola Fibonacci</h4>
              <p>Setiap suku merupakan hasil penjumlahan dari dua suku sebelumnya.</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: 1, 1, 2, 3, 5, 8, ... (2=1+1, 3=1+2, 5=2+3, dst.)</p>
            </div>

            <div>
              <h4 class="font-semibold text-foreground">6. Pola Deret Huruf</h4>
              <p>Prinsipnya sama dengan deret angka, namun menggunakan urutan alfabet. Hafalkan urutan alfabet (A=1, B=2, ..., Z=26) untuk mempermudah.</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: A, C, E, G, ... (Pola loncat satu huruf)</p>
              <p class="mt-1 rounded-md border bg-muted p-2 font-mono text-xs">Contoh: A, B, D, G, K, ... (Pola penambahan bertingkat: +1 huruf, +2 huruf, +3 huruf, dst.)</p>
            </div>

            <div class="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
              <h4 class="font-semibold text-yellow-800">Tips Pro!</h4>
              <ul class="list-inside list-disc text-yellow-700">
                <li>Jangan panik. Lihat deret secara keseluruhan untuk mendapat gambaran umum.</li>
                <li>Coba operasi sederhana terlebih dahulu: tambah, kurang, kali, bagi.</li>
                <li>Jika tidak berhasil, cari pola loncat atau pola bertingkat.</li>
                <li>Untuk deret huruf, coba ubah menjadi angka untuk melihat polanya lebih jelas.</li>
                <li>Latihan secara konsisten akan meningkatkan kecepatan dan intuisi Anda.</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice: LATIHAN SOAL INTERAKTIF                                 -->
    <!-- ======================================================================= -->
    <!-- 
      Di sinilah pengguna dapat mengaplikasikan pengetahuan yang baru didapat.
      Soal-soal ditampilkan dalam format kartu. Pengguna memilih jawaban, dan setelah
      semua dijawab, menekan tombol "Lihat Hasil" akan memicu evaluasi.
      Bagian ini disembunyikan saat hasil ditampilkan untuk fokus pada pembahasan.
    -->
    <template #practice>
      <Card v-if="!quizSubmitted" class="w-full">
        <CardHeader>
          <CardTitle class="text-base font-semibold md:text-lg">Latihan Soal</CardTitle>
          <CardDescription>
            Pilih jawaban yang paling tepat untuk melanjutkan deret berikut.
          </CardDescription>
        </CardHeader>
        <div class="p-6 pt-0">
          <div class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id" class="rounded-lg border p-4">
              <p class="font-medium text-foreground">
                Soal {{ index + 1 }}: <span class="font-mono">{{ q.text }}</span>
              </p>
              <div class="mt-3 space-y-2">
                <label 
                  v-for="option in q.options" :key="option" 
                  class="flex cursor-pointer items-center rounded-md border p-3 text-sm transition-colors hover:bg-muted"
                  :class="{'bg-blue-100 border-blue-400': userAnswers[q.id] === option}"
                >
                  <input
                    type="radio"
                    :name="`question-${q.id}`"
                    :value="option"
                    class="mr-3 h-4 w-4"
                    @change="() => handleAnswerSelect(q.id, option)"
                  >
                  {{ option }}
                </label>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <Button size="lg" @click="submitQuiz" :disabled="!allQuestionsAnswered">
              Lihat Hasil & Pembahasan
            </Button>
          </div>
        </div>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result: HASIL & PEMBAHASAN                                        -->
    <!-- ======================================================================= -->
    <!-- 
      Bagian ini hanya muncul setelah kuis disubmit.
      Menyajikan ringkasan performa (skor) dan yang terpenting, pembahasan detail
      untuk setiap soal. Pembahasan ini adalah inti dari proses belajar, di mana pengguna
      bisa mengerti letak kesalahannya dan cara berpikir yang benar.
    -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-lg font-bold md:text-xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>
            Berikut adalah rincian jawaban Anda. Pelajari pembahasannya untuk meningkatkan pemahaman.
          </CardDescription>
        </CardHeader>
        <div class="p-6 pt-0">
          <!-- Ringkasan Skor -->
          <div class="mb-6 rounded-lg bg-muted p-4">
            <h3 class="text-center text-lg font-semibold text-foreground">Ringkasan</h3>
            <div class="mt-2 flex justify-around text-center">
              <div>
                <p class="text-sm text-muted-foreground">Skor Anda</p>
                <p class="text-2xl font-bold text-blue-600">{{ score.percentage }}%</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Jawaban Benar</p>
                <p class="text-2xl font-bold text-green-600">{{ score.correct }} / {{ questions.length }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Jawaban Salah</p>
                <p class="text-2xl font-bold text-red-600">{{ score.incorrect }} / {{ questions.length }}</p>
              </div>
            </div>
          </div>

          <!-- Detail Pembahasan per Soal -->
          <h3 class="mb-4 text-lg font-semibold text-foreground">Pembahasan Detail</h3>
          <div class="space-y-4">
            <div v-for="res in detailedResults" :key="res.id" class="rounded-lg border p-4">
              <p class="font-medium text-foreground">
                <span class="font-bold">Soal:</span> <span class="font-mono">{{ res.text }}</span>
              </p>
              <div class="mt-3 space-y-2 text-sm">
                <p>Jawaban Anda: 
                  <span class="font-semibold" :class="res.isCorrect ? 'text-green-600' : 'text-red-600'">
                    {{ res.userAnswer || 'Tidak dijawab' }}
                  </span>
                  <span v-if="res.isCorrect" class="text-green-600">(Benar)</span>
                  <span v-else class="text-red-600">(Salah)</span>
                </p>
                <p>Jawaban yang Benar: <span class="font-semibold text-green-600">{{ res.correctAnswer }}</span></p>
                <div class="mt-2 rounded-md bg-gray-50 p-3">
                  <p class="font-semibold text-gray-800">Analisis Pola:</p>
                  <p class="text-gray-700">{{ res.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 flex justify-center">
            <Button size="lg" variant="outline" @click="resetQuiz">
              Ulangi Latihan
            </Button>
          </div>
        </div>
      </Card>
    </template>

  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

// Mengimpor komponen UI dari layout yang disediakan
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CPNSLayout from '@/layouts/CPNSLayout.vue' 

// --- Interface & Type Definitions ---
// Mendefinisikan struktur data untuk soal dan jawaban pengguna agar kode lebih aman dan terstruktur.
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

type UserAnswers = Record<number, string>;

// --- Page Static Data ---
// Menyimpan data statis untuk judul dan deskripsi halaman.
const pageData = {
  testTitle: 'Persiapan CPNS: Tes Intelegensia Umum (TIU)',
  testDescription: 'Latihan soal untuk mempertajam kemampuan Anda.',
  unitTitle: 'Kemampuan Numerik: Deret Angka dan Huruf',
  unitDescription: 'Unit ini fokus pada kemampuan mengenali dan melanjutkan pola dari suatu barisan angka atau huruf.',
  categories: ['TIU', 'Kemampuan Numerik', 'Deret Pola'],
};

// --- Reactive State Management ---
// Menggunakan Vue 3 Composition API (ref, reactive, computed) untuk state management.
// Ini membuat state menjadi reaktif, artinya UI akan otomatis diperbarui saat data berubah.

// `questions`: Menyimpan seluruh data soal latihan. Dibuat sebagai `ref` agar bisa dimodifikasi (misal: di-randomize).
const questions = ref<Question[]>([
  {
    id: 1,
    text: "5, 10, 15, 20, 25, ...",
    options: ["28", "30", "32", "35"],
    correctAnswer: "30",
    explanation: "Ini adalah deret aritmetika sederhana dengan pola penambahan 5 pada setiap suku berikutnya (5+5=10, 10+5=15, dst.). Maka suku selanjutnya adalah 25 + 5 = 30."
  },
  {
    id: 2,
    text: "3, 9, 27, 81, ...",
    options: ["162", "225", "243", "256"],
    correctAnswer: "243",
    explanation: "Ini adalah deret geometri dengan pola perkalian 3 pada setiap suku berikutnya (3*3=9, 9*3=27, dst.). Maka suku selanjutnya adalah 81 * 3 = 243."
  },
  {
    id: 3,
    text: "2, 3, 5, 8, 12, ...",
    options: ["15", "16", "17", "18"],
    correctAnswer: "17",
    explanation: "Ini adalah deret aritmetika bertingkat. Selisih antar suku adalah +1, +2, +3, +4. Pola selisih ini adalah penambahan 1. Maka, selisih berikutnya adalah +5. Suku selanjutnya adalah 12 + 5 = 17."
  },
  {
    id: 4,
    text: "1, 1, 2, 3, 5, 8, ...",
    options: ["11", "12", "13", "14"],
    correctAnswer: "13",
    explanation: "Ini adalah deret Fibonacci, di mana setiap suku adalah hasil penjumlahan dari dua suku sebelumnya (1+1=2, 1+2=3, 2+3=5, 3+5=8). Maka suku selanjutnya adalah 5 + 8 = 13."
  },
  {
    id: 5,
    text: "10, 30, 12, 40, 14, 50, ...",
    options: ["16", "60", "15", "70"],
    correctAnswer: "16",
    explanation: "Ini adalah deret dengan pola larik (loncat satu). Pola pertama (suku ganjil): 10, 12, 14, ... (pola +2). Pola kedua (suku genap): 30, 40, 50, ... (pola +10). Suku yang dicari adalah suku ke-7 (ganjil), sehingga melanjutkan pola pertama: 14 + 2 = 16."
  },
  {
    id: 6,
    text: "A, C, E, G, ...",
    options: ["H", "I", "J", "K"],
    correctAnswer: "I",
    explanation: "Ini adalah deret huruf dengan pola loncat satu huruf. Setelah G, kita loncati H, maka huruf berikutnya adalah I."
  },
  {
    id: 7,
    text: "A, B, D, G, K, ...",
    options: ["N", "O", "P", "Q"],
    correctAnswer: "P",
    explanation: "Ini adalah deret huruf dengan pola penambahan bertingkat. A ke B (+1), B ke D (+2), D ke G (+3), G ke K (+4). Maka, pola selanjutnya adalah +5. Lima huruf setelah K adalah L, M, N, O, P. Jadi, jawabannya adalah P."
  },
  {
    id: 8,
    text: "99, 96, 93, 90, ...",
    options: ["88", "87", "86", "85"],
    correctAnswer: "87",
    explanation: "Ini adalah deret aritmetika menurun dengan pola pengurangan 3 pada setiap suku. Maka suku selanjutnya adalah 90 - 3 = 87."
  },
  {
    id: 9,
    text: "A, 5, B, 10, C, 15, ...",
    options: ["D", "20", "E", "25"],
    correctAnswer: "D",
    explanation: "Ini adalah deret kombinasi dengan dua pola larik. Pola huruf (suku ganjil): A, B, C, ... (urutan alfabet). Pola angka (suku genap): 5, 10, 15, ... (pola +5). Suku yang dicari adalah suku ke-7 (ganjil), melanjutkan pola huruf, yaitu D."
  },
  {
    id: 10,
    text: "4, 5, 7, 11, 19, ...",
    options: ["28", "32", "35", "38"],
    correctAnswer: "35",
    explanation: "Ini adalah deret dengan penambahan yang polanya adalah perkalian. Selisihnya adalah +1, +2, +4, +8. Dapat dilihat bahwa bilangan penambahnya selalu dikali 2 (1*2=2, 2*2=4, 4*2=8). Maka penambah berikutnya adalah 8*2 = 16. Jadi, suku selanjutnya adalah 19 + 16 = 35."
  },
  {
    id: 11,
    text: "Z, A, Y, B, X, C, ...",
    options: ["D", "W", "V", "E"],
    correctAnswer: "W",
    explanation: "Ini adalah deret dengan dua pola larik yang berlawanan. Pola pertama (suku ganjil): Z, Y, X, ... (mundur satu alfabet). Pola kedua (suku genap): A, B, C, ... (maju satu alfabet). Suku yang dicari adalah suku ke-7 (ganjil), melanjutkan pola pertama, yaitu satu huruf sebelum X, adalah W."
  },
  {
    id: 12,
    text: "800, 400, 200, 100, ... , 25",
    options: ["75", "60", "50", "40"],
    correctAnswer: "50",
    explanation: "Ini adalah deret geometri dengan pola pembagian 2 pada setiap suku berikutnya. Maka suku yang kosong adalah 100 / 2 = 50. Ini konsisten dengan suku berikutnya, karena 50 / 2 = 25."
  }
]);

// `userAnswers`: Menyimpan jawaban yang dipilih oleh pengguna. Menggunakan `reactive` untuk objek.
const userAnswers = reactive<UserAnswers>({});

// `quizSubmitted`: Flag boolean untuk menandakan apakah kuis sudah selesai dan hasilnya harus ditampilkan.
const quizSubmitted = ref(false);

// --- Computed Properties ---
// Properti yang nilainya dihitung berdasarkan state lain. Sangat efisien karena hanya dihitung ulang saat dependensinya berubah.

// `allQuestionsAnswered`: Mengecek apakah semua soal sudah dijawab. Digunakan untuk meng-enable tombol submit.
const allQuestionsAnswered = computed(() => {
  return Object.keys(userAnswers).length === questions.value.length;
});

// `score`: Menghitung skor pengguna setelah kuis disubmit.
const score = computed(() => {
  if (!quizSubmitted.value) return { correct: 0, incorrect: 0, percentage: 0 };
  
  const correct = questions.value.reduce((count, q) => {
    return userAnswers[q.id] === q.correctAnswer ? count + 1 : count;
  }, 0);
  
  const total = questions.value.length;
  const incorrect = total - correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return { correct, incorrect, percentage };
});

// `detailedResults`: Mempersiapkan data lengkap untuk ditampilkan di bagian pembahasan.
const detailedResults = computed(() => {
  return questions.value.map(q => ({
    ...q,
    userAnswer: userAnswers[q.id],
    isCorrect: userAnswers[q.id] === q.correctAnswer,
  }));
});

// --- Methods ---
// Fungsi-fungsi yang menangani interaksi pengguna.

// `handleAnswerSelect`: Dipanggil setiap kali pengguna memilih sebuah jawaban.
const handleAnswerSelect = (questionId: number, selectedOption: string) => {
  userAnswers[questionId] = selectedOption;
};

// `submitQuiz`: Mengubah status kuis menjadi 'selesai', yang akan memicu penampilan hasil.
const submitQuiz = () => {
  if (allQuestionsAnswered.value) {
    quizSubmitted.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas untuk melihat hasil
  } else {
    // Bisa ditambahkan alert atau notifikasi jika ada soal yang belum dijawab
    alert("Harap jawab semua pertanyaan sebelum melihat hasil.");
  }
};

// `resetQuiz`: Mengembalikan semua state ke kondisi awal untuk memungkinkan pengguna mencoba lagi.
const resetQuiz = () => {
  for (const key in userAnswers) {
    delete userAnswers[key];
  }
  quizSubmitted.value = false;
};

// `handleNavigation`: Placeholder untuk menangani navigasi jika halaman ini bagian dari seri.
const handleNavigation = (direction: 'back' | 'next') => {
  alert(`Navigasi ${direction} diklik. Implementasi logika navigasi di sini.`);
  // Contoh: router.push('/halaman-sebelumnya') atau router.push('/halaman-berikutnya')
};
</script>

<style scoped>
/* Transisi untuk menampilkan blok hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>