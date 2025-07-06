
<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckCircle2, XCircle, Undo2, Target, BookOpen, BrainCircuit } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import CPNSLayout from '@/layouts/CPNSLayout.vue';

// --- DEFINISI TIPE DATA ---
// Struktur untuk setiap soal latihan.
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  category: 'Pancasila' | 'UUD 1945' | 'NKRI' | 'Bhinneka Tunggal Ika'
}

// --- KONTEN SOAL LATIHAN (DATABASE) ---
// Kumpulan soal pilihan ganda untuk unit Pilar Negara.
// Soal-soal ini dibuat untuk menguji pemahaman konseptual dan historis.
const questions = ref<Question[]>([
  {
    id: 1,
    question: 'Pancasila sebagai ideologi terbuka memiliki tiga dimensi utama. Dimensi yang mengandung makna bahwa nilai-nilai dasar ideologi tersebut bersumber dari nilai-nilai riil yang hidup dalam masyarakat Indonesia adalah dimensi...',
    options: ['Normatif', 'Idealisme', 'Fleksibilitas', 'Realitas'],
    correctAnswerIndex: 3,
    explanation: 'Dimensi Realitas berarti nilai-nilai dasar yang terkandung dalam Pancasila (ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan) bersumber dari nilai-nilai nyata yang telah hidup, tumbuh, dan berkembang dalam masyarakat Indonesia. Ini menunjukkan bahwa Pancasila bukanlah ideologi impor, melainkan cerminan kepribadian bangsa.',
    category: 'Pancasila',
  },
  {
    id: 2,
    question: 'Amandemen UUD 1945 telah dilakukan sebanyak empat kali. Salah satu kesepakatan dasar dalam melakukan perubahan UUD 1945 adalah tidak mengubah Pembukaan UUD 1945. Alasan utamanya adalah...',
    options: [
      'Pembukaan UUD 1945 memiliki rumusan yang sudah sempurna dan indah.',
      'Mengubah Pembukaan UUD 1945 sama dengan membubarkan Negara Kesatuan Republik Indonesia.',
      'Pembukaan UUD 1945 berisi daftar hak asasi manusia yang fundamental.',
      'Proses perubahan Pembukaan UUD 1945 terlalu sulit secara prosedural.',
    ],
    correctAnswerIndex: 1,
    explanation: 'Pembukaan UUD 1945 mengandung staatsfundamentalnorm (pokok kaidah negara yang fundamental). Di dalamnya terdapat dasar falsafah negara (Pancasila) dan tujuan negara. Mengubah Pembukaan berarti mengubah dasar-dasar pendirian negara, yang pada hakikatnya sama dengan membubarkan NKRI yang diproklamasikan pada 17 Agustus 1945.',
    category: 'UUD 1945',
  },
  {
    id: 3,
    question: 'Wawasan Nusantara sebagai cara pandang bangsa Indonesia tentang diri dan lingkungannya merupakan penjabaran dari pilar negara, terutama...',
    options: [
      'Pancasila sila ketiga',
      'Bhinneka Tunggal Ika',
      'Konsep Negara Kesatuan Republik Indonesia (NKRI)',
      'Pasal 1 ayat 1 UUD 1945',
    ],
    correctAnswerIndex: 2,
    explanation: 'Wawasan Nusantara adalah cara pandang geopolitik Indonesia yang melihat bangsa dan tanah airnya sebagai satu kesatuan yang utuh (pulau, laut, dan udara di atasnya). Konsep ini merupakan penjabaran paling konkret dari bentuk Negara Kesatuan Republik Indonesia (NKRI) yang menyatukan seluruh wilayah dan keragaman dalam satu entitas negara.',
    category: 'NKRI',
  },
  {
    id: 4,
    question: 'Semboyan Bhinneka Tunggal Ika pertama kali diungkapkan dalam sebuah kakawin kuno pada zaman Kerajaan Majapahit. Kakawin yang dimaksud adalah...',
    options: ['Kakawin Arjunawiwaha', 'Kakawin Bharatayuddha', 'Kakawin Sutasoma', 'Kakawin Negarakertagama'],
    correctAnswerIndex: 2,
    explanation: 'Semboyan "Bhinneka Tunggal Ika Tan Hana Dharma Mangrwa" terdapat dalam Kakawin Sutasoma karangan Mpu Tantular pada masa Kerajaan Majapahit. Kalimat ini aslinya digunakan untuk menggambarkan toleransi antara umat Hindu Siwa dan Buddha, yang kemudian diadaptasi menjadi semboyan nasional untuk merepresentasikan persatuan dalam keragaman suku, agama, ras, dan budaya di Indonesia.',
    category: 'Bhinneka Tunggal Ika',
  },
  {
    id: 5,
    question: 'Menurut UUD 1945 setelah amandemen, lembaga negara yang memiliki kewenangan untuk memutus sengketa hasil pemilihan umum adalah...',
    options: ['Mahkamah Agung (MA)', 'Komisi Yudisial (KY)', 'Komisi Pemilihan Umum (KPU)', 'Mahkamah Konstitusi (MK)'],
    correctAnswerIndex: 3,
    explanation: 'Berdasarkan Pasal 24C ayat (1) UUD 1945, salah satu kewenangan Mahkamah Konstitusi (MK) adalah memutus perselisihan tentang hasil pemilihan umum. Ini adalah bagian dari mekanisme check and balances dalam sistem ketatanegaraan Indonesia pasca-reformasi.',
    category: 'UUD 1945',
  },
  {
    id: 6,
    question: 'Prinsip persatuan dalam pilar NKRI diwujudkan melalui pengakuan terhadap keberagaman, namun tetap menempatkan kepentingan nasional di atas kepentingan pribadi, golongan, atau daerah. Sikap yang mencerminkan prinsip ini adalah...',
    options: [
      'Mempelajari tarian dari daerah lain sebagai bentuk apresiasi budaya.',
      'Menggunakan produk dalam negeri untuk mendukung ekonomi nasional.',
      'Menolak pembangunan proyek strategis nasional karena melewati lahan milik pribadi.',
      'Semua jawaban A dan B benar.',
    ],
    correctAnswerIndex: 3,
    explanation: 'Sikap yang mencerminkan prinsip persatuan dalam NKRI adalah tindakan yang mendukung integrasi dan kepentingan nasional. Mempelajari budaya lain (A) memperkuat ikatan sosial, dan menggunakan produk dalam negeri (B) memperkuat kedaulatan ekonomi. Keduanya adalah wujud nyata menempatkan kepentingan nasional di atas yang lain. Menolak proyek strategis (C) justru bertentangan dengan prinsip ini.',
    category: 'NKRI',
  },
  {
    id: 7,
    question: 'Pancasila berfungsi sebagai sumber dari segala sumber hukum di Indonesia. Pernyataan ini secara yuridis formal tercantum dalam...',
    options: [
      'TAP MPR No. III/MPR/2000',
      'Undang-Undang No. 12 Tahun 2011',
      'Pembukaan UUD 1945 alinea keempat',
      'Pidato Soekarno 1 Juni 1945',
    ],
    correctAnswerIndex: 1,
    explanation: 'Penegasan Pancasila sebagai sumber dari segala sumber hukum negara secara eksplisit dinyatakan dalam Pasal 2 Undang-Undang Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan. Ketetapan ini menempatkan Pancasila pada posisi tertinggi dalam hierarki peraturan perundang-undangan di Indonesia, di mana semua hukum harus bersumber dan tidak boleh bertentangan dengannya.',
    category: 'Pancasila',
  },
   {
    id: 8,
    question: 'Konsep "Negara Hukum" (Rechtsstaat) ditegaskan dalam UUD 1945 setelah amandemen, yang secara eksplisit tercantum pada...',
    options: [
      'Pasal 1 Ayat (1)',
      'Pasal 1 Ayat (2)',
      'Pasal 1 Ayat (3)',
      'Pasal 27 Ayat (1)',
    ],
    correctAnswerIndex: 2,
    explanation: 'Penegasan bahwa "Negara Indonesia adalah negara hukum" secara eksplisit ditambahkan pada amandemen ketiga UUD 1945 dan tercantum dalam Pasal 1 Ayat (3). Ini memperkuat komitmen bahwa segala aspek kehidupan berbangsa dan bernegara harus didasarkan pada aturan hukum yang adil dan berkepastian, bukan atas kekuasaan belaka.',
    category: 'UUD 1945',
  },
])

// --- STATE MANAGEMENT UNTUK KUIS ---
const currentQuestionIndex = ref(0)
const userAnswers = ref<(number | null)[]>(Array(questions.value.length).fill(null))
const score = ref(0)
const quizFinished = ref(false)
const showResults = ref(false)

// --- PROPERTI COMPUTED UNTUK MEMUDAHKAN ---
// Mendapatkan objek pertanyaan saat ini berdasarkan index.
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

// Menghitung progres pengerjaan kuis.
const progressPercentage = computed(() => {
  const answeredCount = userAnswers.value.filter(answer => answer !== null).length
  return (answeredCount / questions.value.length) * 100
})

// --- FUNGSI-FUNGSI LOGIKA KUIS ---
/**
 * Memilih jawaban untuk pertanyaan saat ini.
 * @param optionIndex - Index dari opsi yang dipilih.
 */
function selectAnswer(optionIndex: number) {
  if (quizFinished.value) return // Mencegah perubahan jawaban setelah kuis selesai.
  userAnswers.value[currentQuestionIndex.value] = optionIndex
}

/**
 * Pindah ke soal berikutnya.
 */
function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

/**
 * Kembali ke soal sebelumnya.
 */
function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

/**
 * Menghitung skor, menyelesaikan kuis, dan menampilkan hasil.
 */
function handleSubmit() {
  let correctAnswers = 0
  for (let i = 0; i < questions.value.length; i++) {
    if (userAnswers.value[i] === questions.value[i].correctAnswerIndex) {
      correctAnswers++
    }
  }
  score.value = correctAnswers
  quizFinished.value = true
  showResults.value = true // Memicu tampilan slot #result via prop layout
}

/**
 * Mengulang kuis dari awal.
 */
function resetQuiz() {
  currentQuestionIndex.value = 0
  userAnswers.value.fill(null)
  score.value = 0
  quizFinished.value = false
  showResults.value = false
}
</script>

<template>
  <!-- Menggunakan CPNSLayout dan memberikan props yang sesuai -->
  <CPNSLayout
    test-title="Seleksi Kompetensi Dasar (SKD) - CPNS"
    test-description="Latihan Soal untuk Tes Wawasan Kebangsaan (TWK)"
    unit-title="Pilar Negara"
    unit-description="Penguatan pemahaman mengenai Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika sebagai fondasi berbangsa dan bernegara."
    :categories="['TWK', 'Pilar Negara', 'Pancasila', 'UUD 1945', 'NKRI', 'Bhinneka Tunggal Ika']"
    :show-result="showResults"
    @back="() => console.log('Navigasi kembali dari halaman unit')"
    @next="() => console.log('Navigasi lanjut dari halaman unit')"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material : KONTEN PEMBELAJARAN                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="shadow-sm">
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Materi Penguatan: 4 Pilar Negara</CardTitle>
            <CardDescription>Pahami konsep fundamental sebelum berlatih.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="space-y-6 text-sm">
          <div class="space-y-2">
            <h3 class="font-semibold text-base">1. Pancasila</h3>
            <p class="text-muted-foreground">
              Sebagai dasar negara (Philosophische Grondslag) dan ideologi bangsa. Pancasila adalah jiwa seluruh rakyat Indonesia, kepribadian bangsa, pandangan hidup (Weltanschauung), dan sumber dari segala sumber hukum. Nilai-nilainya (Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan) digali dari budaya dan realitas masyarakat Indonesia.
            </p>
          </div>
          <Separator />
          <div class="space-y-2">
            <h3 class="font-semibold text-base">2. Undang-Undang Dasar (UUD) 1945</h3>
            <p class="text-muted-foreground">
              Merupakan hukum dasar tertulis dan konstitusi negara. UUD 1945 menjadi landasan struktural penyelenggaraan pemerintahan, memuat norma dan aturan yang wajib ditaati. Pembukaannya mengandung pokok kaidah negara yang fundamental dan tidak dapat diubah, sementara Batang Tubuhnya telah mengalami empat kali amandemen untuk menyesuaikan dengan dinamika zaman.
            </p>
          </div>
           <Separator />
          <div class="space-y-2">
            <h3 class="font-semibold text-base">3. Negara Kesatuan Republik Indonesia (NKRI)</h3>
            <p class="text-muted-foreground">
              Adalah bentuk final negara bagi bangsa Indonesia, seperti yang tercantum dalam Pasal 1 Ayat 1 UUD 1945. Konsep negara kesatuan (unitarisme) menekankan bahwa kedaulatan adalah tunggal dan tidak terbagi, menyatukan seluruh wilayah nusantara dari Sabang sampai Merauke dalam satu pemerintahan pusat. Wawasan Nusantara adalah cara pandang geopolitiknya.
            </p>
          </div>
           <Separator />
          <div class="space-y-2">
            <h3 class="font-semibold text-base">4. Bhinneka Tunggal Ika</h3>
            <p class="text-muted-foreground">
              Semboyan yang berarti "Berbeda-beda tetapi tetap satu". Ini adalah pilar yang mengakui dan menghargai keragaman suku, agama, ras, dan antargolongan (SARA) sebagai kekayaan bangsa. Bhinneka Tunggal Ika menjadi perekat sosial yang menjaga persatuan dan kesatuan di tengah pluralitas masyarakat Indonesia.
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice : LATIHAN SOAL INTERAKTIF                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-if="!quizFinished" class="shadow-sm">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
               <BrainCircuit class="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Latihan Soal Interaktif</CardTitle>
                  <CardDescription>Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}</CardDescription>
                </div>
            </div>
             <Badge variant="secondary">{{ currentQuestion.category }}</Badge>
          </div>
          <Progress :model-value="progressPercentage" class="mt-4" />
        </CardHeader>
        <CardContent>
          <p class="mb-6 font-medium leading-relaxed">{{ currentQuestion.question }}</p>
          <div class="space-y-3">
            <Button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              :variant="userAnswers[currentQuestionIndex] === index ? 'default' : 'outline'"
              class="w-full h-auto justify-start text-left whitespace-normal"
              @click="selectAnswer(index)"
            >
              <span class="mr-3 font-bold">{{ String.fromCharCode(65 + index) }}.</span>
              {{ option }}
            </Button>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" @click="prevQuestion" :disabled="currentQuestionIndex === 0">
            Soal Sebelumnya
          </Button>
          <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">
            Soal Berikutnya
          </Button>
          <Button v-else @click="handleSubmit" variant="destructive" :disabled="userAnswers.includes(null)">
            Selesaikan Latihan
          </Button>
        </CardFooter>
      </Card>
      
      <!-- Tampilan setelah kuis selesai, sebelum melihat hasil -->
      <Card v-if="quizFinished" class="flex flex-col items-center justify-center text-center p-8 shadow-sm">
          <CardHeader>
            <Target class="h-16 w-16 text-green-500 mx-auto" />
            <CardTitle class="mt-4 text-2xl">Latihan Selesai!</CardTitle>
            <CardDescription class="mt-2">
              Anda telah menyelesaikan semua soal. Lihat hasil dan pembahasan untuk meningkatkan pemahaman Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button @click="resetQuiz">
              <Undo2 class="mr-2 h-4 w-4" /> Ulangi Latihan
            </Button>
          </CardContent>
        </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result : HASIL DAN PEMBAHASAN                                     -->
    <!-- ======================================================================= -->
    <template #result>
      <div v-if="quizFinished" class="space-y-6">
        <!-- Kartu Skor Total -->
        <Card class="shadow-md">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Akhir Latihan</CardTitle>
            <CardDescription>Berikut adalah rekapitulasi dan pembahasan dari latihan Anda.</CardDescription>
          </CardHeader>
          <CardContent class="text-center">
            <p class="text-lg text-muted-foreground">Skor Anda:</p>
            <p class="text-6xl font-bold text-primary">{{ score }} / {{ questions.length }}</p>
            <Progress :model-value="(score / questions.length) * 100" class="mt-4 max-w-sm mx-auto" />
             <Button @click="resetQuiz" class="mt-6">
              <Undo2 class="mr-2 h-4 w-4" /> Coba Lagi
            </Button>
          </CardContent>
        </Card>

        <!-- Pembahasan Detail per Soal -->
        <h3 class="text-xl font-bold mt-8">Pembahasan Detail</h3>
        <Card v-for="(question, index) in questions" :key="question.id" class="shadow-sm">
          <CardHeader>
            <CardTitle class="text-base">
              Soal {{ index + 1 }}: <span class="font-normal">{{ question.question }}</span>
            </CardTitle>
             <Badge variant="outline" class="w-fit mt-2">{{ question.category }}</Badge>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Jawaban Anda -->
            <div>
              <p class="text-sm font-semibold mb-2">Jawaban Anda:</p>
              <Alert :variant="userAnswers[index] === question.correctAnswerIndex ? 'default' : 'destructive'" class="border-2">
                <component 
                  :is="userAnswers[index] === question.correctAnswerIndex ? CheckCircle2 : XCircle" 
                  class="h-5 w-5" 
                />
                <AlertTitle>
                  {{ userAnswers[index] !== null ? String.fromCharCode(65 + userAnswers[index]!) + '. ' + question.options[userAnswers[index]!] : 'Tidak Dijawab' }}
                </AlertTitle>
                <AlertDescription>
                  {{ userAnswers[index] === question.correctAnswerIndex ? 'Jawaban Anda Benar!' : 'Jawaban Anda Kurang Tepat.' }}
                </AlertDescription>
              </Alert>
            </div>

             <!-- Jawaban yang Benar -->
            <div v-if="userAnswers[index] !== question.correctAnswerIndex">
              <p class="text-sm font-semibold mb-2">Jawaban yang Benar:</p>
               <Alert class="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <CheckCircle2 class="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertTitle class="text-green-800 dark:text-green-300">
                  {{ String.fromCharCode(65 + question.correctAnswerIndex) }}. {{ question.options[question.correctAnswerIndex] }}
                </AlertTitle>
              </Alert>
            </div>

            <!-- Penjelasan -->
             <div>
              <p class="text-sm font-semibold mb-2">Pembahasan:</p>
              <Alert variant="secondary">
                <AlertDescription class="leading-relaxed">
                  {{ question.explanation }}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </CPNSLayout>
</template>