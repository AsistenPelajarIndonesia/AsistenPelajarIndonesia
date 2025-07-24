<script setup lang="ts">
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'

// Mengimpor komponen UI kustom. Diasumsikan komponen ini ada di '@/components/ui'.
// Jika tidak ada, komponen ini perlu dibuat atau diganti dengan elemen HTML standar.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, RefreshCw, BookOpen } from 'lucide-vue-next'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// Konfigurasi Metadata Halaman
// Menetapkan layout kustom yang akan digunakan oleh halaman ini.
definePageMeta({
  layout: 'cpnslayout',
})

// =======================================================================
// DEFINISI DATA & STATE KOMPONEN
// =======================================================================

// --- Tipe Data untuk Soal Latihan ---
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

// --- Bank Soal untuk Unit NKRI ---
// Soal-soal ini dibuat untuk menguji pemahaman mendalam tentang konsep NKRI,
// dari sejarah, landasan hukum, hingga tantangan kontemporer.
const questions = ref<Question[]>([
  {
    id: 1,
    question: "Deklarasi Djuanda yang dicetuskan pada 13 Desember 1957 memiliki dampak fundamental bagi keutuhan wilayah NKRI, yaitu...",
    options: [
      "Menetapkan Jakarta sebagai ibu kota negara.",
      "Mengintegrasikan seluruh perairan di antara dan di sekitar pulau-pulau Indonesia sebagai bagian tak terpisahkan dari wilayah kedaulatan RI.",
      "Membentuk aliansi militer dengan negara-negara tetangga.",
      "Menasionalisasi seluruh perusahaan asing di Indonesia.",
    ],
    correctAnswerIndex: 1,
    explanation: "Deklarasi Djuanda secara fundamental mengubah konsep wilayah laut Indonesia. Sebelum deklarasi ini, Indonesia masih menggunakan warisan hukum kolonial (Territoriale Zee en Maritieme Kringen Ordonnantie 1939) yang menetapkan laut teritorial hanya sejauh 3 mil dari garis pantai. Hal ini menyebabkan adanya laut bebas di antara pulau-pulau Indonesia. Deklarasi Djuanda menyatakan bahwa segala perairan di sekitar, di antara, dan yang menghubungkan pulau-pulau Indonesia adalah bagian dari kedaulatan mutlak NKRI. Konsep ini kemudian diakui secara internasional melalui UNCLOS 1982 dan dikenal sebagai Wawasan Nusantara.",
  },
  {
    id: 2,
    question: "Konsep Negara Kesatuan Republik Indonesia (NKRI) secara eksplisit ditegaskan dalam UUD 1945 pada pasal...",
    options: [
      "Pasal 1 Ayat 1",
      "Pasal 27 Ayat 3",
      "Pasal 30 Ayat 1",
      "Pasal 36A",
    ],
    correctAnswerIndex: 0,
    explanation: "Pasal 1 Ayat 1 UUD 1945 berbunyi, 'Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik.' Pasal ini merupakan landasan yuridis utama yang menegaskan bentuk negara Indonesia sebagai negara kesatuan (unitaris) dan bukan negara serikat (federal). Ini adalah fondasi dari seluruh struktur ketatanegaraan Indonesia.",
  },
  {
    id: 3,
    question: "Salah satu fungsi negara dalam konteks menjaga keutuhan NKRI adalah fungsi pertahanan. Fungsi ini diwujudkan melalui...",
    options: [
      "Membangun hubungan diplomatik dengan semua negara.",
      "Menyelenggarakan pemilihan umum yang adil dan jujur.",
      "Mempersenjatai rakyat sipil untuk pertahanan mandiri.",
      "Menjaga kedaulatan negara, keutuhan wilayah, dan keselamatan segenap bangsa dari ancaman dan gangguan.",
    ],
    correctAnswerIndex: 3,
    explanation: "Fungsi pertahanan negara (sesuai amanat UUD 1945 Pasal 30) adalah untuk melindungi kedaulatan negara, mempertahankan keutuhan wilayah NKRI, serta menjamin keselamatan seluruh bangsa dari segala bentuk ancaman, baik militer maupun non-militer, dari dalam maupun luar negeri. Ini merupakan tugas utama TNI sebagai alat pertahanan negara.",
  },
  {
    id: 4,
    question: "Ancaman non-militer yang dapat membahayakan keutuhan NKRI di era globalisasi antara lain adalah...",
    options: [
      "Agresi militer dari negara lain.",
      "Spionase untuk mencuri data pertahanan.",
      "Masuknya ideologi radikal dan berita bohong (hoax) melalui media sosial.",
      "Pelanggaran wilayah oleh kapal perang asing.",
    ],
    correctAnswerIndex: 2,
    explanation: "Ancaman non-militer tidak menggunakan kekuatan bersenjata tetapi berpotensi membahayakan kedaulatan dan keutuhan bangsa. Di era digital, penyebaran ideologi yang bertentangan dengan Pancasila, radikalisme, separatisme, serta disinformasi dan hoax melalui internet dan media sosial menjadi ancaman serius karena dapat memecah belah persatuan, mengikis kepercayaan pada pemerintah, dan menimbulkan konflik sosial.",
  },
  {
    id: 5,
    question: "Prinsip 'Bhinneka Tunggal Ika' memiliki peran krusial dalam menjaga keutuhan NKRI karena...",
    options: [
      "Mewajibkan semua warga negara untuk memiliki budaya yang sama.",
      "Mengakui dan menghargai keberagaman suku, agama, ras, dan antargolongan sebagai kekayaan bangsa yang harus dipersatukan.",
      "Memberikan otonomi seluas-luasnya kepada setiap daerah untuk mengelola budayanya sendiri tanpa campur tangan pusat.",
      "Menjadi dasar untuk membentuk negara federal yang terdiri dari berbagai entitas budaya.",
    ],
    correctAnswerIndex: 1,
    explanation: "Bhinneka Tunggal Ika, yang berarti 'Berbeda-beda tetapi tetap satu jua', adalah semboyan bangsa yang mengakui realitas kemajemukan Indonesia. Prinsip ini bukan untuk menyeragamkan, melainkan untuk mengelola keberagaman sebagai sumber kekuatan. Dengan menghargai perbedaan dalam bingkai persatuan, potensi konflik akibat SARA (Suku, Agama, Ras, Antargolongan) dapat diredam, sehingga memperkuat keutuhan NKRI.",
  },
  {
    id: 6,
    question: "Otonomi daerah di Indonesia diselenggarakan dengan tujuan utama untuk...",
    options: [
      "Memberikan kemerdekaan penuh kepada daerah untuk lepas dari negara pusat.",
      "Meningkatkan daya saing antar daerah dalam segala bidang.",
      "Mempercepat terwujudnya kesejahteraan masyarakat melalui peningkatan pelayanan, pemberdayaan, dan peran serta masyarakat.",
      "Mengurangi beban anggaran pemerintah pusat.",
    ],
    correctAnswerIndex: 2,
    explanation: "Tujuan utama otonomi daerah adalah untuk mendekatkan pelayanan publik kepada masyarakat, memberdayakan potensi lokal, dan meningkatkan partisipasi masyarakat dalam pembangunan. Prinsipnya adalah 'kesatuan dalam keragaman', di mana daerah diberi kewenangan untuk mengurus urusan rumah tangganya sendiri dalam bingkai NKRI, sehingga pembangunan lebih merata dan kesejahteraan masyarakat meningkat.",
  },
  {
    id: 7,
    question: "Wawasan Nusantara sebagai cara pandang bangsa Indonesia terhadap diri dan lingkungannya mengutamakan...",
    options: [
      "Kepentingan individu dan golongan.",
      "Persatuan dan kesatuan bangsa serta kesatuan wilayah.",
      "Pembangunan ekonomi di Pulau Jawa.",
      "Kekuatan militer sebagai satu-satunya penjamin keutuhan.",
    ],
    correctAnswerIndex: 1,
    explanation: "Wawasan Nusantara adalah cara pandang geopolitik Indonesia. Intinya adalah memandang Indonesia sebagai satu kesatuan yang utuh dan tidak terpisahkan, meliputi kesatuan politik, ekonomi, sosial budaya, dan pertahanan keamanan. Oleh karena itu, kepentingan nasional (persatuan dan kesatuan) selalu diletakkan di atas kepentingan pribadi, kelompok, atau daerah.",
  },
  {
    id: 8,
    question: "Sistem Pemerintahan Daerah di Indonesia yang berlaku saat ini didasarkan pada prinsip...",
    options: [
      "Sentralisasi, di mana semua keputusan diambil oleh pemerintah pusat.",
      "Federalisme, di mana negara bagian memiliki kedaulatan sendiri.",
      "Desentralisasi, Dekonsentrasi, dan Tugas Pembantuan.",
      "Monarki absolut, di mana kekuasaan dipegang oleh seorang raja.",
    ],
    correctAnswerIndex: 2,
    explanation: "Penyelenggaraan pemerintahan daerah di Indonesia menganut asas desentralisasi (penyerahan wewenang pemerintahan oleh Pemerintah Pusat kepada daerah otonom), dekonsentrasi (pelimpahan wewenang dari Pemerintah Pusat kepada Gubernur sebagai wakil pemerintah pusat), dan tugas pembantuan (penugasan dari Pemerintah Pusat kepada daerah untuk melaksanakan tugas tertentu).",
  },
]);

// --- State untuk Latihan Interaktif ---
const currentQuestionIndex = ref(0) // Indeks soal yang sedang ditampilkan
const userAnswers = ref<Record<number, number | null>>({}) // Menyimpan jawaban user {soalId: optionIndex}
const quizCompleted = ref(false) // Status apakah kuis sudah selesai
const score = ref(0) // Skor akhir

// Inisialisasi jawaban user dengan null
const initializeAnswers = () => {
  questions.value.forEach(q => {
    userAnswers.value[q.id] = null
  })
}
initializeAnswers() // Panggil saat komponen dimuat

// =======================================================================
// PROPERTI TERKOMPUTASI (COMPUTED PROPERTIES)
// =======================================================================

// Soal yang sedang aktif berdasarkan `currentQuestionIndex`
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

// Progres pengerjaan kuis dalam persentase
const progressPercentage = computed(() => {
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100
})

// Judul dan deskripsi yang akan dikirim ke layout
const layoutProps = {
  testTitle: "SKD CPNS: Tes Wawasan Kebangsaan",
  testDescription: "Latihan soal untuk meningkatkan pemahaman kebangsaan Anda.",
  unitTitle: "Negara Kesatuan Republik Indonesia (NKRI)",
  unitDescription: "Materi ini menguji pemahaman Anda tentang konsep, sejarah, dan tantangan dalam menjaga keutuhan NKRI.",
  categories: ["Sejarah", "UUD 1945", "Pemerintahan", "Geopolitik"],
}

// =======================================================================
// FUNGSI-FUNGSI LOGIKA (METHODS)
// =======================================================================

// Fungsi untuk memilih jawaban
const selectAnswer = (questionId: number, optionIndex: number) => {
  userAnswers.value[questionId] = optionIndex
}

// Fungsi untuk pindah ke soal berikutnya
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

// Fungsi untuk kembali ke soal sebelumnya
const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// Fungsi untuk menghitung skor dan menyelesaikan kuis
const submitQuiz = () => {
  let correctAnswers = 0
  questions.value.forEach(q => {
    if (userAnswers.value[q.id] === q.correctAnswerIndex) {
      correctAnswers++
    }
  })
  score.value = (correctAnswers / questions.value.length) * 100
  quizCompleted.value = true
}

// Fungsi untuk mengulang kuis dari awal
const restartQuiz = () => {
  currentQuestionIndex.value = 0
  initializeAnswers()
  score.value = 0
  quizCompleted.value = false
}

// Fungsi untuk event 'back' dan 'next' dari layout
const handleBack = () => {
  // Logika bisa ditambahkan, misal pindah ke unit sebelumnya
  console.log("Navigasi 'Back' dari layout")
}
const handleNext = () => {
  // Logika bisa ditambahkan, misal pindah ke unit berikutnya
  console.log("Navigasi 'Next' dari layout")
}
</script>

<template>
  <!-- 
    Menggunakan komponen layout 'CPNSLayout' dan memberikan props yang dibutuhkan.
    Komponen ini akan menyediakan struktur header dan main content area.
    Kita juga menangani event 'back' dan 'next' yang di-emit oleh layout.
  -->
  <CPNSLayout
    :test-title="layoutProps.testTitle"
    :test-description="layoutProps.testDescription"
    :unit-title="layoutProps.unitTitle"
    :unit-description="layoutProps.unitDescription"
    :categories="layoutProps.categories"
    :show-result="quizCompleted"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- 
      Slot #material: Berisi konten pembelajaran / materi.
      Disajikan sebelum pengguna memulai latihan.
    -->
    <template #material>
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Materi Pengantar NKRI</CardTitle>
            <CardDescription>Pahami konsep fundamental sebelum berlatih.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong>Negara Kesatuan Republik Indonesia (NKRI)</strong> adalah sebuah konsep final dan harga mati bagi bangsa Indonesia. Konsep ini tidak hanya sekadar bentuk negara, tetapi juga sebuah pandangan hidup yang menyatukan ribuan pulau, ratusan suku bangsa, dan beragam budaya dalam satu wadah kebangsaan.
          </p>
          <h4>Pilar Utama Penopang NKRI:</h4>
          <ul>
            <li><strong>Pancasila:</strong> Sebagai dasar negara dan ideologi bangsa, Pancasila menjadi perekat utama yang mempersatukan segala perbedaan.</li>
            <li><strong>UUD 1945:</strong> Sebagai landasan konstitusional, UUD 1945 secara tegas menyatakan dalam Pasal 1 Ayat 1 bahwa "Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik."</li>
            <li><strong>Bhinneka Tunggal Ika:</strong> Semboyan ini menjadi jiwa bangsa, mengakui dan menghargai keragaman sebagai kekuatan, bukan sebagai pemecah belah.</li>
            <li><strong>Wawasan Nusantara:</strong> Cara pandang geopolitik yang melihat Indonesia sebagai satu kesatuan utuh (pulau, laut, dan udara) dalam aspek politik, ekonomi, sosial budaya, dan pertahanan keamanan.</li>
          </ul>
          <h4>Tantangan Keutuhan NKRI:</h4>
          <p>
            Di era modern, NKRI menghadapi berbagai tantangan, baik yang bersifat militer maupun non-militer. Ancaman seperti separatisme, terorisme, radikalisme, berita bohong (hoax), dan intervensi asing menuntut kewaspadaan dan partisipasi seluruh komponen bangsa untuk menjaga keutuhan negara. Memahami konsep NKRI secara mendalam adalah bentuk bela negara bagi setiap warga negara.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- 
      Slot #practice: Berisi soal-soal latihan interaktif.
      Hanya ditampilkan jika kuis belum selesai (quizCompleted === false).
    -->
    <template #practice>
      <div v-if="!quizCompleted">
        <Card>
          <CardHeader>
            <CardTitle>Latihan Soal: Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}</CardTitle>
            <CardDescription>Pilih salah satu jawaban yang menurut Anda paling tepat.</CardDescription>
            <Progress :model-value="progressPercentage" class="mt-4" />
          </CardHeader>
          <CardContent>
            <!-- Menampilkan Teks Pertanyaan -->
            <p class="mb-6 font-semibold text-base leading-relaxed">{{ currentQuestion.question }}</p>

            <!-- Menampilkan Pilihan Jawaban (Radio Group) -->
            <RadioGroup 
              :model-value="userAnswers[currentQuestion.id]"
              @update:model-value="(value) => selectAnswer(currentQuestion.id, value as number)"
              class="flex flex-col gap-4"
            >
              <div 
                v-for="(option, index) in currentQuestion.options" 
                :key="index"
                class="flex items-center space-x-3"
              >
                <RadioGroupItem :id="`q${currentQuestion.id}-opt${index}`" :value="index" />
                <Label :for="`q${currentQuestion.id}-opt${index}`" class="text-sm leading-normal">
                  {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button variant="outline" @click="prevQuestion" :disabled="currentQuestionIndex === 0">
              Sebelumnya
            </Button>
            <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">
              Selanjutnya
            </Button>
            <Button v-else @click="submitQuiz" variant="default" class="bg-green-600 hover:bg-green-700">
              Selesaikan Latihan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- 
      Slot #result: Berisi hasil dan pembahasan kuis.
      Ditampilkan setelah kuis selesai (saat 'showResult' dari layout menjadi true).
    -->
    <template #result>
      <div>
        <!-- Kartu Skor Akhir -->
        <Card class="mb-6 bg-secondary">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan Selesai!</CardTitle>
            <CardDescription>Berikut adalah rekapitulasi hasil pengerjaan Anda.</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col items-center gap-4 sm:flex-row">
            <div class="flex flex-col items-center">
              <p class="text-sm font-medium text-muted-foreground">SKOR ANDA</p>
              <p class="text-5xl font-bold text-primary">{{ score.toFixed(0) }}</p>
            </div>
            <div class="flex-1 text-center sm:text-left">
              <p v-if="score >= 80" class="text-lg">
                Luar biasa! Pemahaman Anda tentang NKRI sangat baik. Pertahankan!
              </p>
              <p v-else-if="score >= 60" class="text-lg">
                Bagus! Anda sudah memahami sebagian besar konsep. Pelajari kembali poin-poin yang masih salah.
              </p>
              <p v-else class="text-lg">
                Jangan berkecil hati. Kegagalan adalah awal dari keberhasilan. Mari pelajari pembahasannya untuk meningkatkan pemahaman Anda.
              </p>
            </div>
            <Button @click="restartQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
        
        <!-- Pembahasan Jawaban -->
        <h3 class="mb-4 text-xl font-bold">Pembahasan Jawaban</h3>
        <div class="space-y-4">
          <Card v-for="(question, index) in questions" :key="question.id">
            <CardHeader>
              <CardTitle class="text-base">Pertanyaan {{ index + 1 }}</CardTitle>
              <p class="text-sm text-muted-foreground">{{ question.question }}</p>
            </CardHeader>
            <CardContent>
              <div class="space-y-2">
                <p class="text-sm">Jawaban Anda: 
                  <span v-if="userAnswers[question.id] !== null" :class="[userAnswers[question.id] === question.correctAnswerIndex ? 'text-green-600' : 'text-red-600', 'font-bold']">
                    {{ question.options[userAnswers[question.id]!] }}
                  </span>
                  <span v-else class="font-bold text-gray-500">Tidak dijawab</span>
                </p>
                <p class="text-sm">Jawaban Benar: <span class="font-bold text-blue-600">{{ question.options[question.correctAnswerIndex] }}</span></p>
              </div>
            </CardContent>
            <CardFooter>
              <Alert :variant="userAnswers[question.id] === question.correctAnswerIndex ? 'default' : 'destructive'">
                 <component :is="userAnswers[question.id] === question.correctAnswerIndex ? CheckCircle : XCircle" class="h-4 w-4" />
                <AlertTitle>Pembahasan</AlertTitle>
                <AlertDescription class="prose prose-sm max-w-none">
                  {{ question.explanation }}
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </div>
      </div>
    </template>
  </CPNSLayout>
</template>