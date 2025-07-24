<!--
  File: @/pages/units/lbi/unit1.vue
  Halaman ini merupakan implementasi unit pembelajaran pertama untuk subtes Literasi Bahasa Indonesia.
  Fokus: "Menemukan Informasi Spesifik (Fakta) dalam Teks"
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// --- Komponen UI (Asumsi komponen ini sudah ada dari library seperti shadcn-vue) ---
// Komponen-komponen ini diperlukan untuk membangun antarmuka.
// Jika belum ada, Anda perlu membuatnya atau menginstal library UI.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-vue-next'

// --- State Management & Navigasi ---

const route = useRoute()
const router = useRouter()

// Ekstrak nomor unit dari URL secara dinamis.
// Contoh: dari "/units/lbi/unit1", akan menghasilkan angka 1.
const unitNumber = computed(() => {
  const path = route.path
  const match = path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : null
})

// Fungsi untuk navigasi ke unit sebelumnya.
function goToPreviousUnit() {
  if (unitNumber.value && unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  }
  // Jika ini unit pertama, tombol "Back" secara logis tidak akan melakukan apa-apa.
  // Idealnya, tombol di layout bisa di-disable dari sini.
}

// Fungsi untuk navigasi ke unit selanjutnya.
function goToNextUnit() {
  if (unitNumber.value) {
    router.push(`/units/lbi/unit${unitNumber.value + 1}`)
  }
}

// --- Konten Latihan & Soal ---

// Tipe data untuk mendefinisikan struktur soal
interface Question {
  id: number
  passage: string
  question: string
  options: { id: string; text: string }[]
  correctAnswerId: string
  explanation: string
}

// Bank Soal: Dibuat dengan tingkat kesulitan tinggi dan pengecoh yang dirancang dengan cermat.
const questions = ref<Question[]>([
  {
    id: 1,
    passage: `Penambangan laut dalam (deep-sea mining) merupakan industri baru yang berpotensi mengekstraksi deposit mineral komersial seperti polimetalik nodul, sulfida masif, dan kerak kobalt dari dasar laut pada kedalaman lebih dari 200 meter. International Seabed Authority (ISA), sebuah badan otonom yang didirikan di bawah Konvensi PBB tentang Hukum Laut (UNCLOS) 1982, bertanggung jawab mengatur kegiatan di "Area", yaitu dasar laut di luar yurisdiksi nasional. Hingga saat ini, ISA telah memberikan 31 kontrak eksplorasi di Samudra Pasifik, Atlantik, dan Hindia, namun belum ada izin eksploitasi komersial yang dikeluarkan. Kekhawatiran utama yang muncul adalah dampak ekologis yang belum sepenuhnya dipahami. Sebuah studi yang dipublikasikan di jurnal *Current Biology* pada tahun 2023 menunjukkan bahwa kebisingan dari satu operasi penambangan dapat merambat hingga 500 kilometer di kolom air, berpotensi mengganggu komunikasi dan navigasi mamalia laut seperti paus dan lumba-lumba yang mengandalkan ekolokasi. Selain itu, pelepasan sedimen (sediment plumes) dapat menyebar ratusan kilometer persegi, menutupi dan mematikan organisme bentik serta melepaskan logam berat beracun ke dalam air.`,
    question: "Berdasarkan teks tersebut, lembaga apakah yang memiliki wewenang untuk mengatur aktivitas penambangan di dasar laut internasional?",
    options: [
      { id: 'A', text: 'Konvensi PBB tentang Hukum Laut (UNCLOS)' },
      { id: 'B', text: 'PBB (Perserikatan Bangsa-Bangsa) secara umum' },
      { id: 'C', text: 'International Seabed Authority (ISA)' },
      { id: 'D', text: 'Organisasi negara-negara penambang di Samudra Pasifik' },
      { id: 'E', text: 'Jurnal ilmiah *Current Biology*' },
    ],
    correctAnswerId: 'C',
    explanation: 'Jawaban yang benar adalah C. Teks secara eksplisit menyatakan pada kalimat kedua: "International Seabed Authority (ISA), sebuah badan otonom yang didirikan di bawah Konvensi PBB tentang Hukum Laut (UNCLOS) 1982, bertanggung jawab mengatur kegiatan di "Area", yaitu dasar laut di luar yurisdiksi nasional." Pilihan A (UNCLOS) adalah konvensi yang menjadi dasar pendirian ISA, bukan lembaga pengaturnya. Pilihan B terlalu umum. Pilihan D dan E jelas salah karena tidak disebutkan dalam konteks regulasi.'
  },
  {
    id: 2,
    passage: `Penambangan laut dalam (deep-sea mining) merupakan industri baru yang berpotensi mengekstraksi deposit mineral komersial seperti polimetalik nodul, sulfida masif, dan kerak kobalt dari dasar laut pada kedalaman lebih dari 200 meter. International Seabed Authority (ISA), sebuah badan otonom yang didirikan di bawah Konvensi PBB tentang Hukum Laut (UNCLOS) 1982, bertanggung jawab mengatur kegiatan di "Area", yaitu dasar laut di luar yurisdiksi nasional. Hingga saat ini, ISA telah memberikan 31 kontrak eksplorasi di Samudra Pasifik, Atlantik, dan Hindia, namun belum ada izin eksploitasi komersial yang dikeluarkan. Kekhawatiran utama yang muncul adalah dampak ekologis yang belum sepenuhnya dipahami. Sebuah studi yang dipublikasikan di jurnal *Current Biology* pada tahun 2023 menunjukkan bahwa kebisingan dari satu operasi penambangan dapat merambat hingga 500 kilometer di kolom air, berpotensi mengganggu komunikasi dan navigasi mamalia laut seperti paus dan lumba-lumba yang mengandalkan ekolokasi. Selain itu, pelepasan sedimen (sediment plumes) dapat menyebar ratusan kilometer persegi, menutupi dan mematikan organisme bentik serta melepaskan logam berat beracun ke dalam air.`,
    question: "Fakta spesifik manakah mengenai dampak kebisingan penambangan yang ditemukan dalam studi yang dikutip oleh teks?",
    options: [
      { id: 'A', text: 'Kebisingan dapat membunuh organisme bentik secara langsung.' },
      { id: 'B', text: 'Kebisingan menyebabkan pelepasan logam berat beracun ke air.' },
      { id: 'C', text: 'Kebisingan dapat merambat sejauh 200 kilometer dan mengganggu mamalia laut.' },
      { id: 'D', text: 'Kebisingan dari satu operasi dapat menjangkau jarak hingga 500 kilometer.' },
      { id: 'E', text: 'Kebisingan paling berdampak pada area di Samudra Pasifik dan Atlantik.' },
    ],
    correctAnswerId: 'D',
    explanation: 'Jawaban yang benar adalah D. Informasi ini ditemukan secara spesifik pada kalimat: "...studi yang dipublikasikan di jurnal *Current Biology* pada tahun 2023 menunjukkan bahwa kebisingan dari satu operasi penambangan dapat merambat hingga 500 kilometer di kolom air...". Pilihan A dan B adalah dampak dari pelepasan sedimen, bukan kebisingan. Pilihan C menyebutkan jarak yang salah (200 km adalah kedalaman minimum penambangan, bukan jangkauan suara). Pilihan E adalah lokasi kontrak eksplorasi, bukan dampak kebisingan.'
  },
  {
    id: 3,
    passage: `Sejarah standardisasi Bahasa Indonesia adalah proses panjang yang berakar dari Sumpah Pemuda pada 28 Oktober 1928, yang mengikrarkan "menjunjung bahasa persatuan, bahasa Indonesia". Bahasa Melayu Riau, yang telah lama menjadi *lingua franca*, dipilih sebagai dasar karena kesederhanaannya dan tidak menjadi bahasa ibu mayoritas suku besar sehingga dianggap lebih netral. Standardisasi ejaan dimulai dengan Ejaan van Ophuijsen pada tahun 1901. Ejaan ini kemudian digantikan oleh Ejaan Republik atau Ejaan Soewandi pada 19 Maret 1947, yang menyederhanakan beberapa aspek seperti mengubah 'oe' menjadi 'u'. Proses evolusi berlanjut hingga peresmian Ejaan Yang Disempurnakan (EYD) oleh Presiden Soeharto pada 16 Agustus 1972. EYD membawa perubahan signifikan, termasuk standardisasi penulisan gabungan kata, kata depan, dan penggunaan huruf kapital. Walaupun telah digantikan oleh Ejaan Bahasa Indonesia (EBI) pada tahun 2015, prinsip-prinsip dasar EYD masih sangat relevan dan membentuk fondasi tata tulis Bahasa Indonesia modern.`,
    question: "Kapan Ejaan Republik atau Ejaan Soewandi secara resmi mulai berlaku menggantikan Ejaan van Ophuijsen?",
    options: [
      { id: 'A', text: '28 Oktober 1928' },
      { id: 'B', text: 'Tahun 1901' },
      { id: 'C', text: '16 Agustus 1972' },
      { id: 'D', text: 'Tahun 2015' },
      { id: 'E', text: '19 Maret 1947' },
    ],
    correctAnswerId: 'E',
    explanation: 'Jawaban yang benar adalah E. Teks secara jelas menyebutkan tanggal spesifik pada kalimat: "Ejaan ini kemudian digantikan oleh Ejaan Republik atau Ejaan Soewandi pada 19 Maret 1947...". Pilihan A adalah tanggal Sumpah Pemuda. Pilihan B adalah tahun pemberlakuan Ejaan van Ophuijsen. Pilihan C adalah tanggal peresmian EYD. Pilihan D adalah tahun pemberlakuan EBI.'
  },
])

// --- State & Logika Validator ---
const userAnswers = ref<{ [key: number]: string }>({})
const showResult = ref(false)
const explanationVisibility = ref<{ [key: number]: boolean }>({})

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.correctAnswerId ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return (score.value / questions.value.length) * 100
})

function validateAnswers() {
  // Cek apakah semua soal sudah dijawab
  if (Object.keys(userAnswers.value).length !== questions.value.length) {
    alert('Harap jawab semua pertanyaan sebelum memeriksa jawaban.')
    return
  }
  showResult.value = true
  // Scroll ke bagian hasil setelah tombol ditekan
  onMounted(() => {
    const resultElement = document.getElementById('result-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

function resetLatihan() {
  userAnswers.value = {}
  showResult.value = false
  explanationVisibility.value = {}
}

function toggleExplanation(questionId: number) {
  explanationVisibility.value[questionId] = !explanationVisibility.value[questionId]
}

// Inisialisasi visibility penjelasan menjadi false
questions.value.forEach(q => {
  explanationVisibility.value[q.id] = false
})

</script>

<template>
  <SNBTLayout
    test-title="SNBT: Seleksi Nasional Berbasis Tes"
    test-description="Persiapan Subtes Literasi Bahasa Indonesia"
    :unit-title="`Unit ${unitNumber || 1}: Menemukan Informasi Spesifik (Fakta) dalam Teks`"
    unit-description="Mengasah kemampuan untuk menemukan informasi faktual yang tersurat (eksplisit) dalam sebuah bacaan kompleks dan padat."
    :categories="['Literasi Bahasa Indonesia', 'Pemahaman Bacaan', 'Fakta & Opini']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Slot Materi Pembelajaran                                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Strategi Menemukan Informasi Spesifik</CardTitle>
          <CardDescription>
            Keterampilan ini menguji kecepatan dan ketepatan Anda dalam melokalisasi data atau fakta yang tertulis secara jelas (tersurat/eksplisit) di dalam teks. Ini adalah fondasi dari pemahaman bacaan.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p class="font-semibold">Langkah-langkah Efektif:</p>
          <ol class="list-decimal list-inside space-y-2">
            <li>
              <strong>Pahami Pertanyaan Dahulu:</strong> Baca soal sebelum membaca teks secara detail. Ini memberi Anda tujuan yang jelas.
            </li>
            <li>
              <strong>Identifikasi Kata Kunci:</strong> Tentukan kata kunci dalam pertanyaan (nama, tanggal, lokasi, istilah, angka). Kata kunci adalah petunjuk utama Anda.
            </li>
            <li>
              <strong>Lakukan Teknik *Scanning* (Memindai):</strong> Gerakkan mata Anda dengan cepat ke seluruh teks untuk mencari kata kunci atau sinonimnya. Jangan membaca kata per kata.
            </li>
            <li>
              <strong>Verifikasi Konteks:</strong> Setelah menemukan kata kunci, baca kalimat tempat kata kunci itu berada, serta satu kalimat sebelum dan sesudahnya, untuk memastikan informasi tersebut benar-benar menjawab pertanyaan.
            </li>
            <li>
              <strong>Waspadai Pengecoh (*Distractors*):</strong> Pilihan jawaban yang salah seringkali dirancang untuk menipu. Waspadai informasi yang mirip, benar tetapi tidak relevan, atau kesimpulan yang tidak didukung oleh teks.
            </li>
          </ol>
          <Separator />
          <Alert>
             <AlertCircle class="h-4 w-4" />
            <AlertTitle>Tips Pro!</AlertTitle>
            <AlertDescription>
              Informasi spesifik seringkali berupa angka (tahun, jumlah, persentase), nama diri (orang, tempat, organisasi), atau istilah teknis. Mata Anda harus terlatih untuk menangkap elemen-elemen ini dengan cepat.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Slot Latihan Soal Interaktif                                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal</CardTitle>
          <CardDescription>
            Bacalah setiap teks dengan saksama dan jawablah pertanyaan yang mengikutinya. Terapkan strategi yang telah Anda pelajari.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <div class="mb-4">
              <h3 class="font-semibold mb-2">Teks untuk Soal {{ index + 1 }}</h3>
              <div class="text-sm p-4 bg-muted/50 rounded-md border text-justify leading-relaxed">
                {{ q.passage }}
              </div>
            </div>
            
            <p class="font-medium mb-4">{{ index + 1 }}. {{ q.question }}</p>
            
            <RadioGroup v-model="userAnswers[q.id]" class="space-y-2" :disabled="showResult">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${q.id}-opt${option.id}`" :value="option.id" />
                <Label :for="`q${q.id}-opt${option.id}`" class="leading-normal">{{ option.text }}</Label>
              </div>
            </RadioGroup>
            <Separator v-if="index < questions.length - 1" class="my-8"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="showResult" class="w-full">
            Periksa Jawaban
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- Slot Hasil & Pembahasan (Validator)                                     -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
            <CardDescription>Analisis performa Anda untuk unit ini.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Ringkasan Skor -->
            <div class="p-6 rounded-lg border text-center"
              :class="{
                'bg-green-100/50 dark:bg-green-900/20 border-green-300 dark:border-green-700': scorePercentage >= 75,
                'bg-yellow-100/50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700': scorePercentage > 40 && scorePercentage < 75,
                'bg-red-100/50 dark:bg-red-900/20 border-red-300 dark:border-red-700': scorePercentage <= 40
              }"
            >
              <p class="text-lg text-muted-foreground">Skor Anda</p>
              <p class="text-5xl font-bold my-2">
                {{ score }} <span class="text-2xl text-muted-foreground">/ {{ questions.length }}</span>
              </p>
              <p class="font-semibold text-lg">({{ scorePercentage.toFixed(0) }}%)</p>
               <p v-if="scorePercentage >= 75" class="mt-2 text-sm text-green-700 dark:text-green-300">Luar biasa! Pemahaman Anda sangat baik.</p>
               <p v-else-if="scorePercentage > 40" class="mt-2 text-sm text-yellow-700 dark:text-yellow-300">Bagus, tapi masih ada ruang untuk peningkatan. Perhatikan kembali pembahasannya.</p>
               <p v-else class="mt-2 text-sm text-red-700 dark:text-red-300">Jangan khawatir! Kunci dari skill ini adalah latihan. Cermati pembahasannya.</p>
            </div>
            
            <Separator />

            <!-- Pembahasan Detail per Soal -->
            <h3 class="text-xl font-semibold">Pembahasan Detail</h3>
            <div class="space-y-6">
              <div v-for="(q, index) in questions" :key="`result-${q.id}`">
                <Card class="overflow-hidden">
                  <CardHeader class="flex-row items-start justify-between bg-muted/50 p-4">
                    <div>
                      <p class="font-semibold">Soal {{ index + 1 }}</p>
                      <p class="text-sm text-muted-foreground line-clamp-2">{{ q.question }}</p>
                    </div>
                    <div v-if="userAnswers[q.id] === q.correctAnswerId" class="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 class="h-5 w-5" />
                      <span class="font-bold">Benar</span>
                    </div>
                    <div v-else class="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <XCircle class="h-5 w-5" />
                      <span class="font-bold">Salah</span>
                    </div>
                  </CardHeader>
                  <CardContent class="p-4 space-y-4">
                    <div class="space-y-2 text-sm">
                       <p class="font-medium mb-3">Pilihan jawaban:</p>
                       <div v-for="option in q.options" :key="`review-${option.id}`" 
                         class="p-3 rounded-md border flex items-center gap-3 transition-all"
                         :class="{
                           'bg-red-100/60 dark:bg-red-900/30 border-red-500/50': userAnswers[q.id] === option.id && userAnswers[q.id] !== q.correctAnswerId,
                           'bg-green-100/60 dark:bg-green-900/30 border-green-500/50': option.id === q.correctAnswerId
                         }"
                       >
                         <template v-if="option.id === q.correctAnswerId">
                           <CheckCircle2 class="h-5 w-5 text-green-600 flex-shrink-0" />
                         </template>
                         <template v-else-if="userAnswers[q.id] === option.id">
                            <XCircle class="h-5 w-5 text-red-600 flex-shrink-0" />
                         </template>
                         <template v-else>
                           <div class="w-5 h-5 flex-shrink-0"></div> <!-- Placeholder for alignment -->
                         </template>
                         <label>{{ option.id }}. {{ option.text }}</label>
                       </div>
                    </div>
                    
                    <div>
                       <Button variant="outline" size="sm" @click="toggleExplanation(q.id)" class="w-full">
                         <span>Lihat Pembahasan</span>
                         <ChevronUp v-if="explanationVisibility[q.id]" class="h-4 w-4 ml-2" />
                         <ChevronDown v-else class="h-4 w-4 ml-2" />
                       </Button>
                       <div v-if="explanationVisibility[q.id]" class="mt-3 text-sm p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md prose prose-sm max-w-none dark:prose-invert">
                         <p>{{ q.explanation }}</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <!-- Tombol Aksi Lanjutan -->
            <Separator />
            <div class="flex flex-col sm:flex-row gap-4">
               <Button @click="resetLatihan" variant="outline" class="w-full">
                 Coba Lagi Latihan Ini
               </Button>
               <Button @click="goToNextUnit" class="w-full">
                 Lanjut ke Unit Berikutnya
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Menambahkan gaya tambahan jika diperlukan */
.prose {
  line-height: 1.6;
}
</style>
