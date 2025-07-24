<template>
  <!-- 
    ================================================================================
    LAYOUT WRAPPER: CPNSLayout
    ================================================================================
    - Menggunakan komponen layout yang telah ditentukan untuk konsistensi tampilan.
    - Props dinamis seperti 'testTitle', 'unitTitle', dll., diisi dengan data dari <script setup>.
    - Properti ':show-result' dikaitkan dengan state 'quizSubmitted' untuk menampilkan/menyembunyikan
      blok hasil secara reaktif.
    - Event '@back' dan '@next' ditangani oleh fungsi 'handleNavigation'.
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
    <!-- 
      ================================================================================
      SLOT #material: Konten Pembelajaran
      ================================================================================
      - Slot ini diisi dengan materi ringkas mengenai UUD 1945.
      - Tujuannya adalah memberikan 'refreshment' atau dasar pengetahuan sebelum
        pengguna memulai latihan soal.
    -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-xl">Materi Ringkas: UUD 1945</CardTitle>
          <CardDescription>Pahami pilar-pilar utama konstitusi negara kita.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, atau disingkat UUD 1945, adalah hukum dasar tertulis (konstitusi) pemerintahan negara Republik Indonesia saat ini. Memahaminya adalah kunci untuk mengerti sistem ketatanegaraan Indonesia.
          </p>
          
          <h3 class="text-lg font-semibold mt-4">Sistematika UUD 1945 (Setelah Amandemen)</h3>
          <ul>
            <li>
              <strong>Pembukaan:</strong> Terdiri dari 4 alinea yang merupakan pokok kaidah negara yang fundamental. Alinea ke-4 memuat dasar negara Pancasila dan tujuan negara. Pembukaan UUD 1945 tidak dapat diubah.
            </li>
            <li>
              <strong>Pasal-pasal (Batang Tubuh):</strong> Terdiri dari 21 Bab, 73 Pasal, 170 ayat, serta 3 pasal Aturan Peralihan dan 2 pasal Aturan Tambahan. Bagian ini mengatur tentang bentuk negara, kedaulatan, lembaga negara, hak asasi manusia, dan lainnya.
            </li>
          </ul>

          <h3 class="text-lg font-semibold mt-4">Pokok Pikiran Penting</h3>
          <ol>
            <li><strong>Kedaulatan Rakyat:</strong> Pasal 1 Ayat (2) menegaskan bahwa "Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar." Ini adalah inti dari demokrasi Indonesia.</li>
            <li><strong>Negara Hukum:</strong> Pasal 1 Ayat (3) menyatakan "Negara Indonesia adalah negara hukum." Artinya, segala aspek kehidupan bernegara diatur oleh hukum yang berlaku.</li>
            <li><strong>Bentuk Negara Kesatuan:</strong> Pasal 1 Ayat (1) secara tegas menyatakan "Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik."</li>
            <li><strong>Hak Asasi Manusia (HAM):</strong> Diatur secara khusus dalam Bab XA (Pasal 28A-28J), menjamin hak hidup, hak berkeluarga, hak mengembangkan diri, dan hak-hak dasar lainnya bagi setiap warga negara.</li>
          </ol>

          <p class="mt-4 text-sm text-muted-foreground">
            Materi ini adalah ringkasan. Untuk pemahaman yang mendalam, sangat disarankan untuk membaca dan menelaah langsung naskah UUD 1945.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- 
      ================================================================================
      SLOT #practice: Latihan Soal Interaktif
      ================================================================================
      - Slot ini berisi komponen kuis interaktif.
      - 'v-if="!quizSubmitted"' memastikan kuis hanya tampil sebelum disubmit.
        Setelah submit, bagian ini akan hilang dan digantikan oleh slot #result.
    -->
    <template #practice>
      <Card v-if="!quizSubmitted" class="w-full">
        <CardHeader>
          <CardTitle class="text-xl">Latihan Soal: UUD 1945</CardTitle>
          <CardDescription>Uji pemahaman Anda. Pilih jawaban yang paling tepat.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <!-- Iterasi untuk setiap pertanyaan dalam 'questions' state -->
          <div v-for="(q, index) in questions" :key="q.id" class="border-t pt-6">
            <p class="font-semibold mb-3">
              {{ index + 1 }}. {{ q.question }}
            </p>
            <!-- Komponen RadioGroup untuk pilihan ganda -->
            <RadioGroup v-model="userAnswers[index]" class="gap-2">
              <div v-for="(option, optionIndex) in q.options" :key="optionIndex" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${index}-o${optionIndex}`" :value="optionIndex" />
                <Label :for="`q${index}-o${optionIndex}`" class="leading-normal">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <!-- Tombol 'Koreksi Jawaban' hanya aktif jika semua soal sudah dijawab -->
          <Button :disabled="!allQuestionsAnswered" @click="submitQuiz">
            Koreksi Jawaban
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- 
      ================================================================================
      SLOT #result: Tampilan Hasil dan Pembahasan
      ================================================================================
      - Slot ini akan ditampilkan oleh layout karena ':show-result' menjadi true
        setelah 'quizSubmitted' diubah.
      - Bagian ini adalah inti dari proses belajar, di mana pengguna melihat skor,
        jawaban yang benar, dan pembahasan detail.
    -->
    <template #result>
      <!-- Kartu Hasil Skor Keseluruhan -->
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>Analisis performa Anda dan pelajari pembahasannya.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="font-medium">Skor Anda:</span>
            <span class="text-2xl font-bold">{{ score }} / {{ questions.length }}</span>
          </div>
          <Progress :model-value="scorePercentage" class="w-full" />
          <div class="text-center text-muted-foreground">
            <p>{{ resultMessage }}</p>
          </div>
          <div class="flex justify-end">
            <Button variant="outline" @click="resetQuiz">
              <RotateCcw class="mr-2 h-4 w-4" />
              Ulangi Latihan
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Pembahasan Detail per Soal -->
      <div class="mt-6 space-y-4">
        <h3 class="text-lg font-semibold">Pembahasan Detail</h3>
        <Card v-for="(q, index) in questions" :key="`result-${q.id}`">
          <CardHeader>
            <p class="font-semibold">{{ index + 1 }}. {{ q.question }}</p>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="(option, optionIndex) in q.options"
                :key="`ans-${optionIndex}`"
                class="p-3 rounded-md border text-sm"
                :class="getAnswerClass(index, optionIndex)"
              >
                <!-- Menandai jawaban yang benar -->
                <span v-if="optionIndex === q.correctAnswer" class="font-bold">[Jawaban Benar]</span>
                <!-- Menandai jawaban pilihan pengguna -->
                <span v-if="optionIndex === userAnswers[index] && optionIndex !== q.correctAnswer" class="font-bold">[Pilihan Anda]</span>
                {{ option }}
              </div>
            </div>
            <!-- Bagian Pembahasan yang mendetail -->
            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-md">
              <h4 class="font-bold text-blue-800 dark:text-blue-300">Pembahasan:</h4>
              <p class="text-sm text-foreground/80 mt-1">{{ q.explanation }}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from '#app';
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { RotateCcw } from 'lucide-vue-next';

// --- Page Metadata (Nuxt 3) ---
// Mendefinisikan layout default untuk halaman ini.
// Nama 'CPNSLayout' harus cocok dengan nama file di direktori /layouts.
definePageMeta({
  layout: 'cpnslayout',
});

// --- Data Statis Halaman ---
// Menyimpan informasi judul dan deskripsi untuk dikirim ke komponen Layout.
const pageData = {
  testTitle: "Seleksi CPNS: Tes Wawasan Kebangsaan (TWK)",
  testDescription: "Persiapan Komprehensif untuk Menghadapi Ujian CPNS",
  unitTitle: "Unit 1: Undang-Undang Dasar 1945",
  unitDescription: "Mendalami konstitusi dan dasar negara Republik Indonesia, dari Pembukaan hingga pasal-pasal penting.",
  categories: ['TWK', 'Konstitusi', 'Dasar Negara', 'UUD 1945']
};

// --- Tipe Data untuk Pertanyaan ---
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index dari jawaban yang benar
  explanation: string;
}

// --- State Reaktif ---
// Menggunakan ref() dari Vue 3 untuk state yang akan berubah dan mempengaruhi tampilan.

// 1. Bank Soal UUD 1945
const questions = ref<Question[]>([
    {
        id: 1,
        question: "Berdasarkan UUD 1945 setelah amandemen, lembaga negara yang memiliki wewenang untuk mengubah dan menetapkan UUD adalah...",
        options: [
            "Presiden bersama Dewan Perwakilan Rakyat (DPR)",
            "Majelis Permusyawaratan Rakyat (MPR)",
            "Mahkamah Konstitusi (MK)",
            "Dewan Perwakilan Daerah (DPD)",
            "Mahkamah Agung (MA)"
        ],
        correctAnswer: 1,
        explanation: "Pasal 3 Ayat (1) UUD 1945 menyatakan bahwa 'Majelis Permusyawaratan Rakyat berwenang mengubah dan menetapkan Undang-Undang Dasar.' Ini adalah salah satu wewenang utama MPR setelah amandemen."
    },
    {
        id: 2,
        question: "Pokok kaidah negara yang fundamental (staatsfundamentalnorm) yang terkandung dalam Pembukaan UUD 1945 dan tidak dapat diubah adalah...",
        options: [
            "Alinea pertama",
            "Alinea kedua",
            "Alinea ketiga",
            "Alinea keempat",
            "Seluruh alinea dalam Pembukaan"
        ],
        correctAnswer: 4,
        explanation: "Seluruh Pembukaan UUD 1945 pada hakikatnya tidak dapat diubah. Namun, alinea keempat memiliki kedudukan paling fundamental karena memuat tujuan negara, bentuk negara (Republik), kedaulatan rakyat, dan dasar negara Pancasila. Mengubahnya sama dengan membubarkan negara."
    },
    {
        id: 3,
        question: "Pasal 1 Ayat (3) UUD 1945 menegaskan bahwa 'Negara Indonesia adalah negara hukum'. Makna dari pernyataan tersebut adalah...",
        options: [
            "Hukum memiliki kekuasaan tertinggi di atas pejabat negara.",
            "Semua tindakan pemerintah dan warga negara harus berdasarkan pada hukum yang berlaku.",
            "Setiap sengketa harus diselesaikan melalui pengadilan.",
            "Polisi memiliki wewenang penuh untuk menegakkan hukum.",
            "Hukum adat diakui sebagai sumber hukum utama."
        ],
        correctAnswer: 1,
        explanation: "Prinsip negara hukum (rechtsstaat) berarti bahwa penyelenggaraan kekuasaan pemerintahan didasarkan atas hukum, bukan kekuasaan belaka (machtsstaat). Semua warga negara, termasuk pemerintah, tunduk pada hukum yang sama."
    },
    {
        id: 4,
        question: "Hak imunitas yang dimiliki oleh anggota DPR, yang berarti mereka tidak dapat dituntut di depan pengadilan karena pernyataan yang disampaikan dalam sidang, diatur dalam UUD 1945 pada pasal...",
        options: [
            "Pasal 20",
            "Pasal 20A Ayat (3)",
            "Pasal 21",
            "Pasal 22B",
            "Pasal 23F"
        ],
        correctAnswer: 1,
        explanation: "Pasal 20A Ayat (3) UUD 1945 menyebutkan bahwa 'Selain hak yang diatur dalam pasal-pasal lain Undang-Undang Dasar ini, setiap anggota Dewan Perwakilan Rakyat mempunyai hak mengajukan pertanyaan, menyampaikan usul dan pendapat serta hak imunitas.' Hak imunitas ini melindungi kebebasan berbicara anggota dewan dalam menjalankan fungsi legislatifnya."
    },
    {
        id: 5,
        question: "Menurut UUD 1945, yang berhak mengajukan calon Hakim Agung adalah...",
        options: [
            "Presiden",
            "Mahkamah Agung",
            "Komisi Yudisial",
            "Dewan Perwakilan Rakyat",
            "Menteri Hukum dan HAM"
        ],
        correctAnswer: 2,
        explanation: "Pasal 24A Ayat (3) UUD 1945 menyatakan, 'Calon hakim agung diusulkan Komisi Yudisial kepada Dewan Perwakilan Rakyat untuk mendapatkan persetujuan dan selanjutnya ditetapkan sebagai hakim agung oleh Presiden.' Jadi, pihak yang mengusulkan adalah Komisi Yudisial (KY)."
    },
    {
        id: 6,
        question: "Amandemen UUD 1945 telah dilakukan sebanyak empat kali dalam kurun waktu...",
        options: [
            "1998 - 2001",
            "1999 - 2002",
            "2000 - 2003",
            "1999 - 2004",
            "1998 - 2002"
        ],
        correctAnswer: 1,
        explanation: "Proses amandemen UUD 1945 terjadi dalam empat tahap pada Sidang Umum/Tahunan MPR: Tahap I (1999), Tahap II (2000), Tahap III (2001), dan Tahap IV (2002). Ini adalah periode reformasi ketatanegaraan yang penting."
    },
    {
        id: 7,
        question: "Jaminan terhadap hak setiap orang untuk bebas dari penyiksaan atau perlakuan yang merendahkan martabat manusia diatur secara tegas dalam UUD 1945, yaitu pada...",
        options: [
            "Pasal 28A",
            "Pasal 28D Ayat (1)",
            "Pasal 28G Ayat (2)",
            "Pasal 28I Ayat (1)",
            "Pasal 29 Ayat (2)"
        ],
        correctAnswer: 2,
        explanation: "Pasal 28G Ayat (2) berbunyi, 'Setiap orang berhak untuk bebas dari penyiksaan atau perlakuan yang merendahkan derajat martabat manusia dan berhak memperoleh suaka politik dari negara lain.' Ini merupakan bagian dari hak asasi manusia yang dijamin konstitusi."
    },
    {
        id: 8,
        question: "Berdasarkan Pasal 7C UUD 1945, Presiden tidak dapat membekukan dan/atau membubarkan lembaga...",
        options: [
            "Kementerian Negara",
            "Lembaga Pemerintah Non-Kementerian",
            "Dewan Perwakilan Rakyat",
            "Komisi Pemberantasan Korupsi",
            "Badan Usaha Milik Negara"
        ],
        correctAnswer: 2,
        explanation: "Pasal 7C UUD 1945 secara eksplisit menyatakan 'Presiden tidak dapat membekukan dan/atau membubarkan Dewan Perwakilan Rakyat.' Pasal ini ditambahkan untuk memperkuat sistem presidensial dan mencegah penyalahgunaan kekuasaan oleh eksekutif terhadap legislatif."
    },
]);

// 2. Jawaban Pengguna
// Array yang panjangnya sama dengan jumlah soal, diisi dengan `null` pada awalnya.
// Akan diisi dengan index pilihan jawaban pengguna.
const userAnswers = ref<(number | null)[]>(Array(questions.value.length).fill(null));

// 3. Status Kuis
// Menandai apakah kuis sudah disubmit atau belum.
const quizSubmitted = ref(false);

// --- Computed Properties ---
// Properti yang nilainya dihitung berdasarkan state lain. Lebih efisien daripada method biasa.

// 1. Cek apakah semua soal sudah dijawab
const allQuestionsAnswered = computed(() => {
  return userAnswers.value.every(answer => answer !== null);
});

// 2. Hitung skor
const score = computed(() => {
  return questions.value.reduce((total, question, index) => {
    return total + (userAnswers.value[index] === question.correctAnswer ? 1 : 0);
  }, 0);
});

// 3. Hitung persentase skor
const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  return (score.value / questions.value.length) * 100;
});

// 4. Pesan hasil berdasarkan skor
const resultMessage = computed(() => {
    const percentage = scorePercentage.value;
    if (percentage === 100) return "Luar biasa! Pemahaman Anda tentang UUD 1945 sangat mendalam.";
    if (percentage >= 80) return "Sangat Baik! Anda sudah sangat siap. Terus pertahankan.";
    if (percentage >= 60) return "Bagus! Anda sudah paham konsep-konsep utama. Tingkatkan lagi detailnya.";
    if (percentage >= 40) return "Cukup. Masih ada beberapa materi yang perlu didalami lagi. Semangat!";
    return "Jangan menyerah! Pelajari kembali materi dan pembahasan untuk meningkatkan pemahaman Anda.";
});


// --- Methods ---
// Fungsi-fungsi untuk menangani interaksi pengguna.

// 1. Submit Kuis
function submitQuiz() {
  if (allQuestionsAnswered.value) {
    quizSubmitted.value = true;
    // Otomatis scroll ke atas untuk melihat hasil
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 2. Reset Kuis
function resetQuiz() {
  quizSubmitted.value = false;
  userAnswers.value = Array(questions.value.length).fill(null);
}

// 3. Menentukan style CSS untuk setiap pilihan jawaban setelah kuis disubmit
function getAnswerClass(questionIndex: number, optionIndex: number): string {
  const isCorrect = optionIndex === questions.value[questionIndex].correctAnswer;
  const isUserChoice = optionIndex === userAnswers.value[questionIndex];

  if (isCorrect) {
    return 'bg-green-100 dark:bg-green-900/40 border-green-500'; // Jawaban benar
  }
  if (isUserChoice && !isCorrect) {
    return 'bg-red-100 dark:bg-red-900/40 border-red-500'; // Jawaban pengguna yang salah
  }
  return 'bg-background'; // Opsi lain yang tidak dipilih
}

// 4. Navigasi (Placeholder)
const router = useRouter();
function handleNavigation(direction: 'back' | 'next') {
  if (direction === 'back') {
    // Logika untuk kembali ke halaman daftar unit TWK
    router.push('/cpns/twk');
    console.log("Navigating back...");
  } else {
    // Logika untuk lanjut ke unit selanjutnya, misal 'Pancasila'
    router.push('/cpns/twk/pancasila'); // Ganti dengan rute yang sesuai
    console.log("Navigating to next unit...");
  }
}
</script>

<style>
/* 
  Menambahkan sedikit style tambahan menggunakan @apply dari Tailwind CSS 
  untuk meningkatkan keterbacaan materi.
  'prose' dari plugin @tailwindcss/typography
*/
.prose h3 {
  @apply text-foreground;
}
.prose ul > li::before {
  @apply bg-foreground/50;
}
.prose ol > li::before {
  @apply text-foreground/80;
}
</style>