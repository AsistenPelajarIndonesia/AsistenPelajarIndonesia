<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, RefreshCcw, BookOpenCheck, Trophy } from 'lucide-vue-next'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// Tentukan metadata halaman untuk menggunakan layout yang spesifik
definePageMeta({
  layout: 'CPNSLayout',
})

// --- DEFINISI TIPE DATA ---
// Mendefinisikan struktur data untuk setiap soal agar konsisten dan type-safe.
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

// Tipe untuk menyimpan jawaban pengguna, memetakan ID soal ke indeks jawaban yang dipilih.
type UserAnswers = Record<number, number | null>

// --- DATA SOAL ---
// Soal-soal disimpan dalam sebuah ref, memungkinkan reaktivitas jika soal-soal ini nantinya diambil dari API.
const questions = ref<Question[]>([
  {
    id: 1,
    question: 'Landasan fundamental dari politik luar negeri Indonesia yang "bebas aktif" adalah...',
    options: [
      'Kepentingan nasional untuk menjadi pemimpin di Asia Tenggara',
      'Pancasila dan UUD 1945, terutama pada bagian pembukaan alinea keempat',
      'Keinginan untuk membentuk aliansi militer dengan negara-negara besar',
      'Ketetapan MPR tentang Garis-Garis Besar Haluan Negara (GBHN)',
      'Perjanjian internasional yang telah diratifikasi oleh Presiden dan DPR',
    ],
    correctAnswerIndex: 1,
    explanation: 'Politik luar negeri Indonesia yang bebas aktif berlandaskan pada Pancasila sebagai dasar ideologi dan UUD 1945 sebagai dasar konstitusional. Secara spesifik, amanat untuk ikut serta dalam perdamaian dunia tercantum jelas dalam Pembukaan UUD 1945 alinea keempat: "...ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial..."',
  },
  {
    id: 2,
    question: 'Indonesia merupakan salah satu dari lima negara pemrakarsa berdirinya ASEAN. Siapakah tokoh dari Indonesia yang menandatangani Deklarasi Bangkok pada tahun 1967?',
    options: [
      'Soeharto',
      'Mohammad Hatta',
      'Adam Malik',
      'Ali Alatas',
      'Sutan Sjahrir',
    ],
    correctAnswerIndex: 2,
    explanation: 'Deklarasi Bangkok, yang menjadi cikal bakal berdirinya ASEAN, ditandatangani pada 8 Agustus 1967. Menteri Luar Negeri Indonesia saat itu, Adam Malik, adalah tokoh yang mewakili Indonesia dan menandatangani deklarasi tersebut bersama empat menteri luar negeri lainnya dari Thailand, Filipina, Malaysia, dan Singapura.',
  },
  {
    id: 3,
    question: 'Dalam konteks Gerakan Non-Blok (GNB), peran Indonesia sangat signifikan, terutama sebagai tuan rumah Konferensi Tingkat Tinggi (KTT) GNB yang ke-X pada tahun 1992 di Jakarta. Apa hasil utama dari KTT tersebut?',
    options: [
      'Membentuk pakta pertahanan militer negara-negara GNB',
      'Mengeluarkan "Jakarta Message" yang menekankan pada kerjasama ekonomi dan pembangunan',
      'Menyatakan perang terhadap blok Barat dan blok Timur',
      'Mendirikan markas besar GNB secara permanen di Jakarta',
      'Membubarkan GNB karena Perang Dingin telah usai',
    ],
    correctAnswerIndex: 1,
    explanation: 'KTT GNB ke-X di Jakarta menghasilkan "Jakarta Message" atau "Pesan Jakarta". Pesan ini menandai pergeseran fokus GNB dari isu-isu politik konfrontatif era Perang Dingin menjadi dialog dan kerjasama yang konstruktif, terutama dalam bidang ekonomi dan pembangunan untuk mengatasi tantangan global pasca-Perang Dingin.',
  },
  {
    id: 4,
    question: 'Indonesia secara aktif mengirimkan pasukan perdamaian di bawah bendera Perserikatan Bangsa-Bangsa (PBB). Pasukan ini dikenal dengan sebutan...',
    options: [
      'Legiun Garuda',
      'Satgas Merah Putih',
      'Misi Bhayangkara',
      'Kontingen Garuda',
      'Pasukan Cenderawasih',
    ],
    correctAnswerIndex: 3,
    explanation: 'Pasukan Tentara Nasional Indonesia (TNI) dan Kepolisian Republik Indonesia (POLRI) yang bertugas sebagai pasukan perdamaian PBB dikenal sebagai Kontingen Garuda (KONGA). Misi pertama Kontingen Garuda dikirim ke Mesir pada tahun 1957. Ini adalah wujud nyata komitmen Indonesia dalam menjaga perdamaian dunia.',
  },
  {
    id: 5,
    question: 'Sebagai negara dengan penduduk Muslim terbesar di dunia, Indonesia memiliki peran strategis dalam Organisasi Kerjasama Islam (OKI). Salah satu peran penting Indonesia dalam OKI adalah...',
    options: [
      'Memimpin upaya standardisasi produk halal di tingkat global',
      'Menjadi mediator aktif dalam penyelesaian konflik di negara-negara anggota seperti konflik Palestina-Israel',
      'Membentuk aliansi militer Islam untuk melawan intervensi asing',
      'Menjadi satu-satunya penentu kebijakan ekonomi di OKI',
      'Menolak semua bentuk kerjasama dengan negara non-anggota OKI',
    ],
    correctAnswerIndex: 1,
    explanation: 'Indonesia secara konsisten mendukung perjuangan kemerdekaan Palestina dan seringkali berperan sebagai mediator atau fasilitator dialog untuk mencari solusi damai atas konflik Palestina-Israel dalam forum OKI. Dukungan ini merupakan bagian dari implementasi amanat UUD 1945 untuk menghapuskan penjajahan di atas dunia.',
  },
  {
    id: 6,
    question: 'Konferensi Asia-Afrika (KAA) yang diselenggarakan di Bandung pada tahun 1955 merupakan tonggak sejarah penting bagi diplomasi Indonesia. Apa semangat utama yang dihasilkan dari KAA?',
    options: [
      'Pembentukan blok kekuatan ketiga untuk menandingi AS dan Uni Soviet',
      'Dasasila Bandung, yang berisi prinsip-prinsip hidup berdampingan secara damai',
      'Perjanjian perdagangan eksklusif antara negara-negara Asia dan Afrika',
      'Deklarasi perang terhadap segala bentuk kolonialisme dengan kekuatan militer',
      'Pembentukan PBB tandingan untuk negara-negara berkembang',
    ],
    correctAnswerIndex: 1,
    explanation: 'Hasil paling monumental dari KAA 1955 adalah "Dasasila Bandung". Sepuluh prinsip ini memuat semangat kerjasama, penghormatan terhadap kedaulatan, non-intervensi, dan penyelesaian sengketa secara damai. Prinsip-prinsip ini kemudian menjadi inspirasi utama bagi lahirnya Gerakan Non-Blok (GNB).',
  },
  {
    id: 7,
    question: 'Dalam forum kerja sama ekonomi APEC (Asia-Pacific Economic Cooperation), Indonesia pernah menjadi tuan rumah KTT APEC di Bogor pada tahun 1994. Apa hasil monumental dari KTT tersebut?',
    options: [
      'Bogor Goals',
      'Jakarta Consensus',
      'Bali Concord',
      'Bandung Spirit',
      'Surabaya Declaration',
    ],
    correctAnswerIndex: 0,
    explanation: 'KTT APEC 1994 di Bogor, Indonesia, menghasilkan "Bogor Goals". Ini adalah sebuah komitmen ambisius untuk mewujudkan perdagangan dan investasi yang bebas dan terbuka di kawasan Asia-Pasifik pada tahun 2010 untuk negara maju dan tahun 2020 untuk negara berkembang. Ini menunjukkan peran kepemimpinan Indonesia dalam liberalisasi ekonomi regional.',
  },
  {
    id: 8,
    question: 'Indonesia menolak untuk ikut serta dalam pakta pertahanan militer seperti SEATO (Southeast Asia Treaty Organization) pada masa Perang Dingin. Sikap ini merupakan cerminan dari prinsip politik luar negeri yang...',
    options: [
      'Pasif dan menunggu',
      'Isolasionis dan tertutup',
      'Bebas dan Aktif',
      'Agresif dan ekspansif',
      'Pro-Blok Timur',
    ],
    correctAnswerIndex: 2,
    explanation: 'Prinsip "Bebas" dalam politik luar negeri Indonesia berarti tidak memihak pada salah satu blok kekuatan dunia (Blok Barat pimpinan AS atau Blok Timur pimpinan Uni Soviet) dan tidak mengikatkan diri pada aliansi militer manapun. Penolakan terhadap SEATO adalah implementasi nyata dari prinsip "Bebas" ini. Sementara "Aktif" berarti Indonesia proaktif dalam upaya mewujudkan perdamaian dunia.',
  },
])

// --- STATE MANAGEMENT ---
// State untuk menyimpan jawaban pengguna. Diinisialisasi sebagai objek kosong.
const userAnswers = ref<UserAnswers>({})
// State untuk mengontrol visibilitas bagian hasil dan penjelasan.
const showResults = ref(false)
// State untuk melacak progress pengerjaan soal oleh pengguna
const progress = computed(() => {
    const answeredCount = Object.values(userAnswers.value).filter(val => val !== null).length;
    return (answeredCount / questions.value.length) * 100;
});

// --- FUNGSI-FUNGSI LOGIKA ---

// Fungsi untuk menginisialisasi atau mereset state jawaban pengguna.
const initializeAnswers = () => {
  const initialAnswers: UserAnswers = {}
  for (const q of questions.value) {
    initialAnswers[q.id] = null
  }
  userAnswers.value = initialAnswers
}

// Fungsi yang dipanggil ketika pengguna memilih sebuah jawaban.
const selectAnswer = (questionId: number, optionIndex: number) => {
  // Hanya izinkan perubahan jawaban jika hasil belum ditampilkan.
  if (!showResults.value) {
    userAnswers.value[questionId] = optionIndex
  }
}

// Computed property untuk mengecek apakah semua soal sudah dijawab.
const allQuestionsAnswered = computed(() => {
  return Object.values(userAnswers.value).every(answer => answer !== null)
})

// Fungsi untuk menghitung skor akhir.
const score = computed(() => {
  if (!showResults.value) return 0
  return questions.value.reduce((totalScore, question) => {
    if (userAnswers.value[question.id] === question.correctAnswerIndex) {
      return totalScore + 1
    }
    return totalScore
  }, 0)
})

// Pesan hasil berdasarkan skor yang didapat
const resultMessage = computed(() => {
    const percentage = (score.value / questions.value.length) * 100;
    if (percentage === 100) return { title: "Luar Biasa!", description: "Pemahaman Anda sempurna. Pertahankan!" };
    if (percentage >= 80) return { title: "Sangat Baik!", description: "Anda menguasai sebagian besar materi. Tingkatkan lagi!" };
    if (percentage >= 60) return { title: "Cukup Baik", description: "Anda sudah punya dasar yang baik. Pelajari lagi penjelasannya." };
    return { title: "Perlu Belajar Lagi", description: "Jangan menyerah! Baca kembali materi dan penjelasan untuk pemahaman yang lebih baik." };
});


// Fungsi yang dipanggil saat pengguna menekan tombol "Koreksi Jawaban".
const submitAnswers = () => {
  showResults.value = true
  // Scroll ke atas untuk melihat hasil
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi untuk mengulang latihan dari awal.
const resetTest = () => {
  showResults.value = false
  initializeAnswers()
}

// --- INISIALISASI ---
// Panggil fungsi inisialisasi saat komponen pertama kali dimuat.
initializeAnswers()
</script>

<template>
  <!-- 
    Komponen CPNSLayout digunakan sebagai pembungkus utama.
    Props dikirimkan ke layout untuk menampilkan judul, deskripsi, dan kategori yang sesuai.
    :show-result diikat ke state `showResults` untuk mengontrol visibilitas slot hasil.
  -->
  <CPNSLayout
    test-title="SKD - Seleksi Kompetensi Dasar CPNS"
    test-description="Latihan Soal Subtes Tes Wawasan Kebangsaan (TWK)"
    unit-title="Peranan Bangsa Indonesia dalam Tatanan Regional dan Global"
    unit-description="Materi dan latihan soal ini menguji pemahaman Anda mengenai peran aktif Indonesia dalam berbagai organisasi dan forum internasional, serta landasan politik luar negeri yang dianut."
    :categories="['TWK', 'Hubungan Internasional', 'Politik Luar Negeri', 'ASEAN', 'PBB', 'GNB']"
    :show-result="showResults"
  >
    <!-- 
      SLOT #material:
      Bagian ini berisi materi pembelajaran ringkas untuk dibaca pengguna sebelum mengerjakan soal.
      Ini membantu proses belajar dan tidak hanya sekedar menguji.
    -->
    <template #material>
      <Card class="transition-all duration-500" :class="{'opacity-30 pointer-events-none': showResults}">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpenCheck class="h-6 w-6 text-primary" />
            <span>Materi Pembelajaran Kunci</span>
          </CardTitle>
          <CardDescription>Pahami konsep-konsep penting berikut sebelum Anda memulai latihan soal.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h3>Politik Luar Negeri Bebas Aktif</h3>
          <p>
            Ini adalah jiwa dari diplomasi Indonesia.
            <ul>
              <li><strong>Bebas:</strong> Tidak memihak pada blok kekuatan mana pun di dunia dan tidak terikat pada pakta militer. Indonesia berhak menentukan jalannya sendiri dalam hubungan internasional.</li>
              <li><strong>Aktif:</strong> Indonesia tidak tinggal diam, melainkan proaktif dan berkontribusi dalam upaya menciptakan perdamaian dan ketertiban dunia, sesuai amanat Pembukaan UUD 1945.</li>
            </ul>
          </p>
          <h3>Peran di Organisasi Internasional</h3>
          <ul>
            <li><strong>PBB (Perserikatan Bangsa-Bangsa):</strong> Indonesia aktif mengirimkan <strong>Kontingen Garuda</strong> sebagai pasukan perdamaian dan pernah menjadi Anggota Tidak Tetap Dewan Keamanan PBB.</li>
            <li><strong>ASEAN (Association of Southeast Asian Nations):</strong> Indonesia adalah salah satu negara pemrakarsa. Berperan sentral dalam menjaga stabilitas dan memajukan kerja sama ekonomi di Asia Tenggara.</li>
            <li><strong>GNB (Gerakan Non-Blok):</strong> Menjadi tuan rumah KTT ke-10 di Jakarta (1992) yang menghasilkan <strong>"Jakarta Message"</strong>, menggeser fokus GNB ke kerja sama ekonomi.</li>
            <li><strong>OKI (Organisasi Kerjasama Islam):</strong> Secara konsisten mendukung perjuangan Palestina dan mempromosikan citra Islam sebagai <i>rahmatan lil'alamin</i>.</li>
            <li><strong>APEC (Asia-Pacific Economic Cooperation):</strong> Menjadi tuan rumah KTT di Bogor (1994) yang menghasilkan <strong>"Bogor Goals"</strong>, sebuah target liberalisasi perdagangan.</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- 
      SLOT #practice:
      Bagian ini menampilkan soal-soal latihan yang interaktif.
      Pengguna dapat memilih jawaban, dan progresnya akan terekam.
    -->
    <template #practice>
      <Card class="transition-all duration-500" :class="{'opacity-30 pointer-events-none': showResults}">
        <CardHeader>
          <CardTitle>Latihan Soal Interaktif</CardTitle>
          <CardDescription>Pilih jawaban yang paling tepat. Anda tidak dapat mengubah jawaban setelah menekan tombol koreksi.</CardDescription>
          <div class="mt-4">
            <Label class="text-xs text-muted-foreground">Progress Pengerjaan</Label>
            <Progress :model-value="progress" class="mt-1 h-2" />
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(question, index) in questions" :key="question.id" class="border-t pt-6 first:border-t-0 first:pt-0">
            <p class="font-semibold mb-4">{{ index + 1 }}. {{ question.question }}</p>
            <RadioGroup :value="userAnswers[question.id]?.toString()" @update:modelValue="selectAnswer(question.id, parseInt($event))">
              <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="flex items-center space-x-3 mb-3">
                <RadioGroupItem :id="`q${question.id}-o${optionIndex}`" :value="optionIndex.toString()" />
                <Label :for="`q${question.id}-o${optionIndex}`" class="flex-1 cursor-pointer">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="submitAnswers" :disabled="!allQuestionsAnswered" class="w-full md:w-auto">
            <Trophy class="mr-2 h-4 w-4" />
            Koreksi Jawaban Saya
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- 
      SLOT #result:
      Bagian ini baru akan muncul setelah pengguna selesai mengerjakan dan menekan tombol koreksi.
      Menampilkan skor, rekap jawaban, dan yang terpenting, penjelasan detail untuk setiap soal.
      Ini adalah inti dari proses pembelajaran.
    -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>Gunakan penjelasan di bawah ini untuk memperdalam pemahaman Anda.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
            <Alert :variant="score / questions.length >= 0.8 ? 'default' : 'destructive'" class="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" v-if="score / questions.length >= 0.8">
                <CheckCircle2 class="h-4 w-4 !text-green-600 dark:!text-green-400" />
                <AlertTitle class="text-green-800 dark:text-green-300">{{ resultMessage.title }}</AlertTitle>
                <AlertDescription class="text-green-700 dark:text-green-400">
                    Skor Anda: <strong>{{ score }} dari {{ questions.length }}</strong>. {{ resultMessage.description }}
                </AlertDescription>
            </Alert>
            <Alert :variant="score / questions.length < 0.6 ? 'destructive' : 'default'" v-else>
                <XCircle class="h-4 w-4" v-if="score / questions.length < 0.6" />
                <Trophy class="h-4 w-4" v-else />
                <AlertTitle>{{ resultMessage.title }}</AlertTitle>
                <AlertDescription>
                    Skor Anda: <strong>{{ score }} dari {{ questions.length }}</strong>. {{ resultMessage.description }}
                </AlertDescription>
            </Alert>

          <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="border-t pt-6 first:border-t-0 first:pt-0">
            <p class="font-semibold mb-4">{{ index + 1 }}. {{ question.question }}</p>
            <div class="flex flex-col gap-3">
              <div
                v-for="(option, optionIndex) in question.options"
                :key="`res-opt-${optionIndex}`"
                class="flex items-start gap-3 rounded-md border p-3 text-sm"
                :class="{
                  'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700': userAnswers[question.id] === optionIndex && userAnswers[question.id] !== question.correctAnswerIndex,
                  'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700': optionIndex === question.correctAnswerIndex,
                }"
              >
                <div class="mt-0.5">
                    <XCircle v-if="userAnswers[question.id] === optionIndex && userAnswers[question.id] !== question.correctAnswerIndex" class="h-5 w-5 text-red-500" />
                    <CheckCircle2 v-if="optionIndex === question.correctAnswerIndex" class="h-5 w-5 text-green-600" />
                </div>
                <div class="flex-1">
                    <p>{{ option }}</p>
                    <p v-if="userAnswers[question.id] === optionIndex && userAnswers[question.id] !== question.correctAnswerIndex" class="text-xs font-semibold text-red-600 dark:text-red-400 mt-1">(Jawaban Anda)</p>
                    <p v-if="optionIndex === question.correctAnswerIndex && userAnswers[question.id] !== question.correctAnswerIndex" class="text-xs font-semibold text-green-700 dark:text-green-400 mt-1">(Jawaban yang Benar)</p>
                    <p v-if="optionIndex === question.correctAnswerIndex && userAnswers[question.id] === question.correctAnswerIndex" class="text-xs font-semibold text-green-700 dark:text-green-400 mt-1">(Jawaban Anda Benar)</p>
                </div>
              </div>
            </div>
            <Alert class="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700">
              <BookOpenCheck class="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
              <AlertTitle class="text-blue-800 dark:text-blue-300">Penjelasan</AlertTitle>
              <AlertDescription class="text-blue-700 dark:text-blue-400">
                {{ question.explanation }}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter>
            <Button @click="resetTest" variant="outline">
              <RefreshCcw class="mr-2 h-4 w-4" />
              Ulangi Latihan
            </Button>
        </CardFooter>
      </Card>
    </template>
  </CPNSLayout>
</template>