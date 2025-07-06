<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BarChart, CheckCircle, XCircle, ArrowLeft, ArrowRight, BrainCircuit } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import CPNSLayout from '@/layouts/CPNSLayout.vue';

const router = useRouter()

// ----------------------------------------------------------------
// Tipe Data untuk Soal Latihan
// ----------------------------------------------------------------
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

// ----------------------------------------------------------------
// State Management untuk Quiz Interaktif
// ----------------------------------------------------------------

// --- Bank Soal: Sejarah Perjuangan Bangsa ---
// Soal-soal ini dibuat untuk mencakup berbagai periode penting dalam sejarah Indonesia.
const questions = ref<Question[]>([
  {
    id: 1,
    question: 'Organisasi pergerakan nasional pertama di Indonesia yang bersifat modern, tidak memandang suku, agama, dan ras adalah...',
    options: ['Sarekat Islam', 'Budi Utomo', 'Indische Partij', 'Perhimpunan Indonesia'],
    correctAnswer: 'Budi Utomo',
    explanation: 'Budi Utomo, didirikan pada 20 Mei 1908, dianggap sebagai pelopor pergerakan nasional Indonesia karena merupakan organisasi pertama yang memiliki struktur modern dan keanggotaan yang terbuka, meskipun pada awalnya fokus pada kebudayaan dan pendidikan Jawa. Kelahirannya menandai dimulainya era Kebangkitan Nasional.',
  },
  {
    id: 2,
    question: 'Sumpah Pemuda yang diikrarkan pada 28 Oktober 1928 merupakan hasil dari Kongres Pemuda II. Apa butir ketiga dari ikrar Sumpah Pemuda?',
    options: [
      'Kami putra dan putri Indonesia, mengaku bertumpah darah yang satu, tanah air Indonesia.',
      'Kami putra dan putri Indonesia, mengaku berbangsa yang satu, bangsa Indonesia.',
      'Kami putra dan putri Indonesia, menjunjung bahasa persatuan, bahasa Indonesia.',
      'Kami putra dan putri Indonesia, berjuang untuk kemerdekaan Indonesia.',
    ],
    correctAnswer: 'Kami putra dan putri Indonesia, menjunjung bahasa persatuan, bahasa Indonesia.',
    explanation: 'Sumpah Pemuda memiliki tiga butir ikrar: (1) Bertumpah darah yang satu, tanah air Indonesia. (2) Berbangsa yang satu, bangsa Indonesia. (3) Menjunjung bahasa persatuan, bahasa Indonesia. Butir ketiga menekankan pentingnya Bahasa Indonesia sebagai alat pemersatu bangsa.',
  },
  {
    id: 3,
    question: 'Peristiwa Rengasdengklok terjadi sesaat sebelum proklamasi kemerdekaan. Apa tujuan utama dari peristiwa tersebut?',
    options: [
      'Menyusun teks proklamasi di tempat yang aman.',
      'Menjauhkan Soekarno dan Hatta dari pengaruh Jepang.',
      'Menunggu kedatangan pasukan Sekutu untuk menyerahkan kekuasaan.',
      'Mengadakan rapat besar dengan seluruh tokoh pergerakan.',
    ],
    correctAnswer: 'Menjauhkan Soekarno dan Hatta dari pengaruh Jepang.',
    explanation: 'Golongan muda (seperti Sukarni, Chaerul Saleh) menculik Soekarno dan Hatta ke Rengasdengklok untuk mendesak mereka agar segera memproklamasikan kemerdekaan tanpa campur tangan atau pengaruh dari Jepang, yang saat itu telah menyerah kepada Sekutu.',
  },
  {
    id: 4,
    question: 'Perjanjian Linggarjati yang ditandatangani pada tahun 1947 menghasilkan salah satu kesepakatan penting, yaitu...',
    options: [
      'Belanda mengakui kedaulatan penuh Indonesia tanpa syarat.',
      'Belanda hanya mengakui secara de facto wilayah RI meliputi Jawa, Madura, dan Sumatera.',
      'Akan dibentuk negara Uni Indonesia-Belanda dengan Ratu Belanda sebagai ketuanya.',
      'Gencatan senjata di seluruh wilayah Indonesia.',
    ],
    correctAnswer: 'Belanda hanya mengakui secara de facto wilayah RI meliputi Jawa, Madura, dan Sumatera.',
    explanation: 'Salah satu hasil utama Perjanjian Linggarjati adalah pengakuan de facto Belanda atas Republik Indonesia yang wilayahnya terbatas pada Jawa, Sumatera, dan Madura. Poin penting lainnya adalah kesepakatan untuk membentuk Republik Indonesia Serikat (RIS) dan Uni Indonesia-Belanda.',
  },
  {
    id: 5,
    question: 'Pemberontakan DI/TII di Jawa Barat dipimpin oleh...',
    options: ['Amir Fatah', 'Kahar Muzakkar', 'Daud Beureueh', 'Sekarmadji Maridjan Kartosoewirjo'],
    correctAnswer: 'Sekarmadji Maridjan Kartosoewirjo',
    explanation: 'Pemberontakan Darul Islam/Tentara Islam Indonesia (DI/TII) di Jawa Barat diproklamasikan dan dipimpin oleh Sekarmadji Maridjan Kartosoewirjo pada 7 Agustus 1949. Gerakan ini bertujuan untuk mendirikan Negara Islam Indonesia (NII).',
  },
  {
    id: 6,
    question: 'Istilah "Tiga Tuntutan Rakyat" atau TRITURA muncul pada masa transisi dari Orde Lama ke Orde Baru. Salah satu isi dari TRITURA adalah...',
    options: [
      'Turunkan Soekarno dari jabatan presiden.',
      'Bubarkan Partai Komunis Indonesia (PKI).',
      'Naikkan gaji pegawai negeri.',
      'Laksanakan pemilu secepatnya.',
    ],
    correctAnswer: 'Bubarkan Partai Komunis Indonesia (PKI).',
    explanation: 'TRITURA disuarakan oleh mahasiswa yang tergabung dalam KAMI dan KAPPI pada tahun 1966. Tiga tuntutan tersebut adalah: (1) Bubarkan PKI beserta ormas-ormasnya, (2) Rombak kabinet Dwikora, dan (3) Turunkan harga/perbaiki ekonomi.',
  },
  {
    id: 7,
    question: 'Pada masa Demokrasi Terpimpin, Presiden Soekarno mengeluarkan dekret yang dikenal sebagai Dekret Presiden 5 Juli 1959. Apa latar belakang utama dikeluarkannya dekret tersebut?',
    options: [
      'Kegagalan Badan Konstituante dalam menyusun UUD baru.',
      'Desakan dari pihak militer untuk mengambil alih kekuasaan.',
      'Ancaman pemberontakan dari daerah-daerah.',
      'Kemenangan PKI dalam pemilu 1955.',
    ],
    correctAnswer: 'Kegagalan Badan Konstituante dalam menyusun UUD baru.',
    explanation: 'Badan Konstituante yang dipilih melalui Pemilu 1955 tidak kunjung berhasil mencapai kesepakatan untuk merumuskan UUD baru pengganti UUDS 1950. Kebuntuan politik ini mengancam stabilitas nasional, sehingga Presiden Soekarno mengambil langkah mengeluarkan Dekret Presiden untuk kembali ke UUD 1945.',
  },
  {
    id: 8,
    question: 'Politik Etis atau Politik Balas Budi yang diterapkan oleh pemerintah kolonial Belanda terdiri dari tiga program utama, yang dikenal sebagai Trias Van Deventer. Program tersebut adalah...',
    options: [
      'Edukasi, Irigasi, Urbanisasi',
      'Irigasi, Emigrasi, Liberalisasi',
      'Edukasi, Irigasi, Emigrasi',
      'Urbanisasi, Modernisasi, Edukasi',
    ],
    correctAnswer: 'Edukasi, Irigasi, Emigrasi',
    explanation: 'Trias Van Deventer mencakup tiga bidang: 1) Edukasi (pendidikan) untuk meningkatkan kualitas sumber daya manusia, 2) Irigasi (pengairan) untuk mendukung pertanian, dan 3) Emigrasi (perpindahan penduduk) untuk mengurangi kepadatan di Pulau Jawa. Meskipun tujuannya untuk "membalas budi", pelaksanaannya seringkali masih menguntungkan pihak Belanda.',
  },
])

// --- State Kuis ---
const currentQuestionIndex = ref(0)
const userAnswers = ref<Record<number, string>>({})
const quizFinished = ref(false)
const score = ref(0)
const selectedOption = ref<string | null>(null)

// --- Variabel Terkomputasi (Computed Properties) ---
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const progress = computed(() => ((currentQuestionIndex.value + (quizFinished.value ? 1 : 0)) / questions.value.length) * 100)

// --- Fungsi-fungsi Logika Kuis ---

/** Mengawasi perubahan pilihan radio dan menyimpannya */
watch(selectedOption, (newVal) => {
  if (newVal) {
    userAnswers.value[currentQuestion.value.id] = newVal
  }
})

/** Pindah ke soal berikutnya atau selesaikan kuis */
const handleNextQuestion = () => {
  if (!selectedOption.value) {
    // Bisa tambahkan alert atau notifikasi jika diperlukan
    alert('Silakan pilih jawaban terlebih dahulu.')
    return
  }
  
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
    selectedOption.value = userAnswers.value[currentQuestion.value.id] || null
  } else {
    finishQuiz()
  }
}

/** Kembali ke soal sebelumnya */
const handlePreviousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedOption.value = userAnswers.value[currentQuestion.value.id] || null
  }
}

/** Menghitung skor dan menyelesaikan kuis */
const finishQuiz = () => {
  score.value = questions.value.reduce((acc, question) => {
    return acc + (userAnswers.value[question.id] === question.correctAnswer ? 1 : 0)
  }, 0)
  quizFinished.value = true
}

/** Mengulang kuis dari awal */
const resetQuiz = () => {
  currentQuestionIndex.value = 0
  userAnswers.value = {}
  quizFinished.value = false
  score.value = 0
  selectedOption.value = null
}

/** Memberikan kelas CSS berdasarkan status jawaban setelah kuis selesai */
const getResultClass = (question: Question, option: string): string => {
  const userAnswer = userAnswers.value[question.id]
  const isCorrect = option === question.correctAnswer
  const isUserChoice = option === userAnswer

  if (isCorrect) return 'bg-green-100 border-green-400 text-green-800'
  if (isUserChoice && !isCorrect) return 'bg-red-100 border-red-400 text-red-800'
  return 'bg-slate-50 border-slate-200'
}

/** Navigasi Layout */
const handleBack = () => {
  // Logika untuk kembali ke menu utama atau unit sebelumnya
  console.log('Navigasi: Kembali')
  router.push('/cpns-dashboard') // Contoh navigasi
}

const handleNext = () => {
  // Logika untuk lanjut ke unit berikutnya
  console.log('Navigasi: Lanjut')
  alert('Anda telah menyelesaikan unit ini. Silakan lanjut ke unit berikutnya (jika ada).')
}

</script>

<template>
  <CPNSLayout
    test-title="SKD - Tes Wawasan Kebangsaan (TWK)"
    test-description="Menguji penguasaan pengetahuan dan kemampuan mengimplementasikan nilai-nilai kebangsaan."
    unit-title="Unit 1: Sejarah Perjuangan Bangsa"
    unit-description="Materi ini mencakup titik-titik krusial dalam sejarah Indonesia, mulai dari era pergerakan nasional hingga mempertahankan kemerdekaan dan era reformasi."
    :categories="['Nasionalisme', 'Sejarah Indonesia', 'Pergerakan Nasional']"
    :show-result="quizFinished"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Materi Pembelajaran                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-blue-500" />
            <span>Materi Kunci & Rangkuman</span>
          </CardTitle>
          <CardDescription>
            Pelajari poin-poin penting berikut sebelum memulai latihan untuk memaksimalkan pemahaman Anda.
          </CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h4>1. Era Kebangkitan Nasional (Awal Abad ke-20)</h4>
          <ul>
            <li>
              <strong>Budi Utomo (1908):</strong> Dianggap sebagai organisasi pergerakan nasional modern pertama. Awalnya berfokus pada pendidikan dan budaya, namun menjadi pemicu kesadaran berorganisasi.
            </li>
            <li>
              <strong>Sarekat Islam (1911):</strong> Bermula dari Sarekat Dagang Islam, organisasi ini berkembang pesat karena menyentuh isu ekonomi dan agama yang dekat dengan rakyat.
            </li>
            <li>
              <strong>Indische Partij (1912):</strong> Didirikan oleh "Tiga Serangkai" (Douwes Dekker, Cipto Mangunkusumo, Suwardi Suryaningrat). Merupakan partai politik pertama yang secara tegas menyuarakan kemerdekaan Indonesia.
            </li>
            <li>
              <strong>Sumpah Pemuda (1928):</strong> Hasil Kongres Pemuda II, menjadi tonggak utama persatuan bangsa dengan ikrar satu nusa, satu bangsa, dan satu bahasa.
            </li>
          </ul>

          <h4>2. Proklamasi dan Perjuangan Fisik (1945-1949)</h4>
          <ul>
            <li>
              <strong>Kekosongan Kekuasaan (Vacuum of Power):</strong> Terjadi setelah Jepang menyerah pada Sekutu. Momen ini dimanfaatkan oleh golongan muda untuk mendesak proklamasi (Peristiwa Rengasdengklok).
            </li>
            <li>
              <strong>Perjuangan Diplomasi:</strong> Upaya mencari pengakuan kedaulatan melalui perundingan seperti Linggarjati, Renville, Roem-Royen, dan Konferensi Meja Bundar (KMB).
            </li>
            <li>
              <strong>Perjuangan Bersenjata:</strong> Pertempuran heroik di berbagai daerah seperti Pertempuran 10 November di Surabaya, Pertempuran Ambarawa, dan Bandung Lautan Api untuk mempertahankan kemerdekaan dari agresi militer Belanda.
            </li>
          </ul>
            
          <h4>3. Demokrasi Liberal & Terpimpin (1950-1965)</h4>
          <ul>
            <li>
              <strong>Demokrasi Liberal (1950-1959):</strong> Menggunakan UUDS 1950, ditandai dengan sistem parlementer dan seringnya pergantian kabinet. Pemilu 1955 menjadi salah satu pencapaiannya.
            </li>
             <li>
              <strong>Dekret Presiden 5 Juli 1959:</strong> Dikeluarkan karena kegagalan Konstituante, menandai akhir Demokrasi Liberal dan awal Demokrasi Terpimpin, serta kembalinya ke UUD 1945.
            </li>
          </ul>

          <h4>4. Orde Baru dan Reformasi (1966-Sekarang)</h4>
          <ul>
            <li>
              <strong>Lahirnya Orde Baru:</strong> Dipicu oleh peristiwa G30S/PKI, munculnya TRITURA, dan dikeluarkannya Supersemar. Fokus pada stabilitas politik dan pembangunan ekonomi.
            </li>
            <li>
              <strong>Era Reformasi (1998):</strong> Dimulai dengan mundurnya Presiden Soeharto, didorong oleh krisis moneter dan tuntutan demokrasi, kebebasan pers, serta pemberantasan KKN.
            </li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Latihan Interaktif                                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-if="!quizFinished" class="flex h-full flex-col">
        <CardHeader>
          <CardTitle>Latihan Soal Interaktif</CardTitle>
          <CardDescription>
            Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}. Pilih jawaban yang paling tepat.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex-1">
          <div class="mb-4">
            <p class="font-semibold leading-relaxed">{{ currentQuestion.question }}</p>
          </div>
          <RadioGroup v-model="selectedOption" class="grid gap-3">
            <div v-for="(option, index) in currentQuestion.options" :key="index">
              <RadioGroupItem :id="`opt-${index}`" :value="option" class="peer sr-only" />
              <Label
                :for="`opt-${index}`"
                class="flex cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {{ option }}
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter class="flex flex-col items-stretch gap-4 border-t px-6 py-4">
            <div class="mb-2">
                <Progress :model-value="progress" class="w-full" />
            </div>
            <div class="flex justify-between gap-2">
                <Button variant="outline" @click="handlePreviousQuestion" :disabled="currentQuestionIndex === 0">
                    <ArrowLeft class="mr-2 h-4 w-4" />
                    Kembali
                </Button>
                <Button @click="handleNextQuestion" :disabled="!selectedOption">
                    {{ isLastQuestion ? 'Selesaikan Kuis' : 'Lanjut' }}
                    <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
            </div>
        </CardFooter>
      </Card>
      
      <!-- Placeholder jika kuis sudah selesai, agar layout tidak bergeser -->
       <div v-else class="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
         <p class="text-muted-foreground">Hasil kuis ditampilkan di bawah. <br/> Silakan review jawaban Anda.</p>
       </div>

    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: Hasil & Pembahasan                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-3">
            <BarChart class="h-7 w-7 text-primary" />
            <span>Hasil dan Pembahasan Lengkap</span>
          </CardTitle>
          <CardDescription>
            Berikut adalah hasil dari latihan Anda. Pelajari pembahasan untuk meningkatkan pemahaman.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Ringkasan Skor -->
          <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div class="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h3 class="text-2xl font-bold tracking-tight">Skor Anda:</h3>
                <p class="text-5xl font-extrabold text-primary">{{ score }} / {{ questions.length }}</p>
                <p class="mt-2 text-muted-foreground">
                  {{ score > (questions.length / 2) ? 'Kerja bagus! Terus pertahankan.' : 'Jangan menyerah, coba pelajari lagi materinya!' }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <Button size="lg" @click="resetQuiz">
                  <ArrowLeft class="mr-2 h-5 w-5" />
                  Ulangi Latihan
                </Button>
              </div>
            </div>
          </div>

          <!-- Pembahasan Detail per Soal -->
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-4 border-t pt-6">
            <h4 class="font-semibold">{{ index + 1 }}. {{ question.question }}</h4>
            <div class="space-y-2">
              <div
                v-for="option in question.options"
                :key="option"
                class="flex items-start gap-3 rounded-md border p-3 text-sm transition-all"
                :class="getResultClass(question, option)"
              >
                <div class="mt-0.5">
                    <CheckCircle v-if="option === question.correctAnswer" class="h-5 w-5 flex-shrink-0 text-green-600" />
                    <XCircle v-else-if="option === userAnswers[question.id]" class="h-5 w-5 flex-shrink-0 text-red-600" />
                    <div v-else class="h-5 w-5 flex-shrink-0"></div>
                </div>
                <div class="flex-1">
                  <p>
                    {{ option }}
                  </p>
                  <p v-if="option === userAnswers[question.id] && userAnswers[question.id] !== question.correctAnswer" class="mt-1 text-xs font-semibold text-red-700">
                    (Jawaban Anda)
                  </p>
                   <p v-if="option === question.correctAnswer" class="mt-1 text-xs font-semibold text-green-700">
                    (Jawaban Benar)
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 rounded-lg bg-blue-50/50 p-4 border border-blue-200 dark:bg-slate-800 dark:border-slate-700">
              <p class="font-bold text-blue-800 dark:text-blue-300">Pembahasan:</p>
              <p class="mt-1 text-sm text-blue-700 dark:text-slate-300">{{ question.explanation }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>