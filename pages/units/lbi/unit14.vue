<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CheckCircle2, XCircle, BookOpen, Target, BrainCircuit, BarChart2 } from 'lucide-vue-next'

// --- Komponen Layout dan UI ---
// Diasumsikan layout dan komponen UI sudah ada sesuai di deskripsi.
import SNBTLayout from '@/layouts/SNBTLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

// --- Definisi Tipe untuk Struktur Data yang Kuat ---
interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  questionText: string
  options: Option[]
  correctAnswerId: string
  explanation: string
}

interface ValidationResult {
  questionId: number
  isCorrect: boolean
  userAnswerId?: string
  correctAnswerId: string
  questionText: string
  explanation: string
  userAnswerText?: string
}

// =======================================================================
// Navigasi & Dinamika Unit
// =======================================================================
const router = useRouter()
const route = useRoute()
const currentUnitNumber = ref(0)

onMounted(() => {
  // Ekstrak nomor unit dari URL secara dinamis
  // Contoh: dari "/units/lbi/unit1" akan mendapatkan "1"
  const pathParts = route.path.split('unit')
  if (pathParts.length > 1) {
    const unitNum = parseInt(pathParts[pathParts.length - 1], 10)
    if (!isNaN(unitNum)) {
      currentUnitNumber.value = unitNum
    }
  }
})

function goToPreviousUnit() {
  if (currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  } else {
    // Mungkin bisa ditambahkan notifikasi atau disabled button
    console.log("Ini adalah unit pertama.")
  }
}

function goToNextUnit() {
  // Asumsikan ada unit selanjutnya
  router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
}


// =======================================================================
// Properti untuk SNBTLayout
// =======================================================================
const layoutProps = reactive({
  testTitle: 'SNBT: Tes Potensi Skolastik (TPS)',
  testDescription: 'Literasi Bahasa Indonesia',
  unitTitle: 'Memahami & Menggunakan Kalimat Efektif',
  unitDescription: 'Prinsip Kehematan Kata (Ekonomi Bahasa)',
  categories: ['Kaidah Kebahasaan', 'Logika Berbahasa', 'EBI'],
  showResult: ref(false), // showResult dibuat ref agar reaktif di dalam object reactive
})

// =======================================================================
// State Management untuk Latihan
// =======================================================================
const practiceSubmitted = ref(false)
const userAnswers = ref<Record<number, string>>({})
const validationResults = ref<ValidationResult[]>([])
const score = ref(0)

const isAllQuestionsAnswered = computed(() => {
  return questions.length === Object.keys(userAnswers.value).length
})

// =======================================================================
// Data Soal Latihan (Dibuat Menantang)
// =======================================================================
const questions = reactive<Question[]>([
  {
    id: 1,
    questionText: 'Manakah di antara kalimat berikut yang paling efektif dan hemat kata?',
    options: [
      { id: 'A', text: 'Demi untuk meningkatkan kedisiplinan, para siswa-siswi diwajibkan datang lebih awal sekali.' },
      { id: 'B', text: 'Banyak para ahli sepakat bahwa pemanasan global adalah merupakan masalah yang sangat serius.' },
      { id: 'C', text: 'Agar supaya terhindar dari disinformasi, kita harus saling mengingatkan satu sama lain.' },
      { id: 'D', text: 'Guna meningkatkan mutu pendidikan, pemerintah akan mengevaluasi kurikulum yang berlaku saat ini.' },
    ],
    correctAnswerId: 'D',
    explanation: `Kalimat D adalah yang paling efektif. Mari kita analisis keborosan pada pilihan lain:
    <ul>
      <li class="mt-2"><b>A:</b> Terdapat pleonasme (penggunaan kata berlebihan yang maknanya sama). "Demi" dan "untuk" memiliki fungsi serupa. "Para" sudah menunjukkan jamak, sehingga tidak perlu "siswa-siswi" (cukup "para siswa"). "Sekali" tidak diperlukan karena "lebih awal" sudah cukup. Perbaikan: <i>"Demi meningkatkan kedisiplinan, siswa diwajibkan datang lebih awal."</i></li>
      <li class="mt-2"><b>B:</b> Redundansi. "Banyak" dan "para" sama-sama menandakan jamak. "Adalah merupakan" adalah contoh pleonasme yang sangat umum; gunakan salah satunya saja. Perbaikan: <i>"Banyak ahli sepakat bahwa pemanasan global merupakan masalah serius."</i></li>
      <li class="mt-2"><b>C:</b> Pleonasme. "Agar" dan "supaya" memiliki makna yang sama. Frasa "saling mengingatkan" sudah mengandung makna resiprokal (timbal balik), sehingga "satu sama lain" tidak diperlukan. Perbaikan: <i>"Agar terhindar dari disinformasi, kita harus saling mengingatkan."</i></li>
    </ul>
    Kalimat D tidak mengandung pengulangan kata atau frasa yang tidak perlu dan langsung menyampaikan maksudnya dengan jelas.`
  },
  {
    id: 2,
    questionText: 'Perhatikan kalimat berikut: "Rapat itu dihadiri oleh beberapa dari banyak pejabat yang mana mereka membahas tentang masalah krisis energi." Perbaikan yang paling tepat untuk kalimat tersebut agar menjadi hemat kata adalah...',
    options: [
      { id: 'A', text: 'Rapat itu dihadiri beberapa pejabat yang membahas krisis energi.' },
      { id: 'B', text: 'Rapat itu dihadiri oleh banyak pejabat yang mana mereka membahas tentang krisis energi.' },
      { id: 'C', text: 'Rapat itu dihadiri oleh beberapa dari banyak pejabat untuk membahas tentang krisis energi.' },
      { id: 'D', text: 'Dalam rapat itu, para pejabat membahas tentang masalah krisis energi yang terjadi.' },
    ],
    correctAnswerId: 'A',
    explanation: `Kalimat A adalah perbaikan yang paling efisien dan efektif. Analisis kelemahan kalimat soal dan pilihan lainnya:
    <ul>
      <li class="mt-2"><b>Kalimat Soal:</b> Tidak hemat. "beberapa dari banyak" ambigu dan bertele-tele. "yang mana" adalah pengaruh bahasa asing dan sering kali bisa dihilangkan. "mereka" adalah pengulangan subjek (pejabat) yang tidak perlu. "tentang masalah" juga berlebihan, cukup "membahas krisis energi".</li>
      <li class="mt-2"><b>Pilihan B:</b> Masih menggunakan "yang mana" dan "mereka" serta "tentang" yang membuatnya tidak efisien.</li>
      <li class="mt-2"><b>Pilihan C:</b> "beberapa dari banyak" dan "tentang" masih dipertahankan, sehingga tidak efektif.</li>
      <li class="mt-2"><b>Pilihan D:</b> Meskipun gramatikal, pilihan A lebih ringkas dan langsung. Penggunaan "masalah... yang terjadi" juga sedikit bertele-tele.</li>
    </ul>
    Oleh karena itu, pilihan A menghilangkan semua unsur yang tidak perlu ("oleh beberapa dari banyak", "yang mana", "mereka", "tentang masalah") dan menghasilkan kalimat yang padat dan jelas.`
  },
  {
    id: 3,
    questionText: 'Identifikasilah kalimat yang mengandung keborosan kata akibat penggunaan hiponim dan hipernim secara bersamaan!',
    options: [
      { id: 'A', text: 'Ibu membeli berbagai macam sayuran, seperti bayam, kangkung, dan wortel di pasar.' },
      { id: 'B', text: 'Berbagai jenis unggas, misalnya seperti ayam dan bebek, diternakkan di desa itu.' },
      { id: 'C', text: 'Ia sangat menyukai bunga mawar merah yang harum itu.' },
      { id: 'D', text: 'Ayah sedang membaca surat kabar Kompas di teras rumah.' },
    ],
    correctAnswerId: 'B',
    explanation: `Jawaban yang benar adalah B. Konsep yang diuji adalah penggunaan hipernim (kata umum) dan hiponim (kata khusus).
    <ul>
      <li class="mt-2"><b>A:</b> Efektif. "Berbagai macam sayuran" (hipernim) diikuti contoh hiponimnya ("bayam, kangkung, wortel"). Penggunaan "seperti" tepat untuk merinci contoh.</li>
      <li class="mt-2"><b>B:</b> Tidak efektif. Terdapat pleonasme pada kata "misalnya seperti". Keduanya berfungsi untuk memberi contoh. Cukup gunakan salah satu. Perbaikan: <i>"Berbagai jenis unggas, misalnya ayam dan bebek, diternakkan di desa itu."</i> atau <i>"...seperti ayam dan bebek..."</i>.</li>
      <li class="mt-2"><b>C:</b> Efektif. "Mawar" adalah hiponim dari "bunga", dan "merah" adalah atributnya. Kalimat ini tidak boros karena memberikan informasi spesifik. Berbeda dengan "mawar adalah bunga", yang bisa jadi berlebihan dalam konteks tertentu.</li>
      <li class="mt-2"><b>D:</b> Efektif. "Kompas" adalah nama spesifik (hiponim) dari "surat kabar" (hipernim). Kalimat ini jelas dan tidak boros.</li>
    </ul>
    Kesalahan pada pilihan B adalah duplikasi fungsi kata "misalnya" dan "seperti".`
  },
  {
    id: 4,
    questionText: 'Kalimat "Para ilmuwan melakukan kegiatan penelitian untuk menemukan solusi atas permasalahan polusi udara yang semakin memburuk dari hari ke hari" dapat diefektifkan menjadi...',
    options: [
      { id: 'A', text: 'Para ilmuwan meneliti untuk menemukan solusi polusi udara yang semakin memburuk.' },
      { id: 'B', text: 'Ilmuwan meneliti solusi untuk polusi udara yang kian memburuk.' },
      { id: 'C', text: 'Para ilmuwan melakukan penelitian solusi atas polusi udara yang memburuk dari hari ke hari.' },
      { id: 'D', text: 'Ilmuwan meneliti untuk menemukan solusi atas masalah polusi udara yang semakin hari semakin memburuk.' },
    ],
    correctAnswerId: 'B',
    explanation: `Kalimat B adalah versi yang paling ringkas dan efektif.
    <ul>
      <li class="mt-2"><b>Analisis Kalimat Asli:</b>
        <ul>
          <li>"melakukan kegiatan penelitian" dapat diringkas menjadi "meneliti".</li>
          <li>"solusi atas permasalahan" bisa diringkas menjadi "solusi".</li>
          <li>"semakin memburuk dari hari ke hari" dapat diringkas menjadi "kian memburuk" atau "semakin memburuk".</li>
          <li>"Para ilmuwan" bisa disederhanakan menjadi "Ilmuwan" karena sudah menyiratkan makna jamak/generik.</li>
        </ul>
      </li>
      <li class="mt-2"><b>Pilihan A:</b> Lebih baik dari asli, tapi "meneliti untuk menemukan solusi" sedikit berulang. Meneliti sudah menyiratkan upaya menemukan sesuatu.</li>
      <li class="mt-2"><b>Pilihan B:</b> Paling efektif. "Ilmuwan" (ringkas), "meneliti solusi" (langsung ke tujuan), "kian memburuk" (padat). Kalimat ini menghilangkan semua kata yang tidak fungsional.</li>
      <li class="mt-2"><b>Pilihan C:</b> Masih menggunakan "melakukan penelitian" dan "dari hari ke hari" yang panjang.</li>
      <li class="mt-2"><b>Pilihan D:</b> Masih mempertahankan "meneliti untuk menemukan" dan "semakin hari semakin memburuk" yang kurang ringkas.</li>
    </ul>`
  }
])

// =======================================================================
// Fungsi Validasi Jawaban
// =======================================================================
function validateAnswers() {
  if (!isAllQuestionsAnswered.value) {
    // Bisa ditambahkan notifikasi/toast di sini
    alert('Harap jawab semua pertanyaan terlebih dahulu!')
    return
  }

  const results: ValidationResult[] = []
  let correctCount = 0

  for (const q of questions) {
    const userAnswerId = userAnswers.value[q.id]
    const isCorrect = userAnswerId === q.correctAnswerId
    
    if (isCorrect) {
      correctCount++
    }

    const userAnswerText = q.options.find(opt => opt.id === userAnswerId)?.text

    results.push({
      questionId: q.id,
      isCorrect: isCorrect,
      userAnswerId: userAnswerId,
      correctAnswerId: q.correctAnswerId,
      questionText: q.questionText,
      explanation: q.explanation,
      userAnswerText: userAnswerText
    })
  }
  
  score.value = Math.round((correctCount / questions.length) * 100)
  validationResults.value = results
  layoutProps.showResult = true
  practiceSubmitted.value = true

  // Scroll ke bagian hasil
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    if(resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

function resetPractice() {
  userAnswers.value = {}
  validationResults.value = []
  score.value = 0
  layoutProps.showResult = false
  practiceSubmitted.value = false
}
</script>

<template>
  <SNBTLayout
    :test-title="layoutProps.testTitle"
    :test-description="layoutProps.testDescription"
    :unit-title="layoutProps.unitTitle"
    :unit-description="layoutProps.unitDescription"
    :categories="layoutProps.categories"
    :show-result="layoutProps.showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Materi Pembelajaran                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader class="flex flex-row items-center gap-4">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Konsep Dasar Kehematan Kata</CardTitle>
            <CardDescription>Menciptakan kalimat yang ringkas, padat, dan tidak bertele-tele.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p>
            <strong>Kehematan Kata</strong> adalah salah satu pilar utama dari <strong>kalimat efektif</strong>. Prinsip ini menuntut kita untuk menghindari penggunaan kata, frasa, atau bentuk lain yang tidak diperlukan untuk menyampaikan gagasan. Kalimat yang hemat kata bukan berarti kalimat yang pendek, melainkan kalimat yang tidak memiliki unsur mubazir.
          </p>
          <p>
            Tujuan utamanya adalah efisiensi informasi, sehingga pembaca dapat memahami maksud penulis dengan cepat dan tepat tanpa terganggu oleh elemen yang berlebihan.
          </p>
          <Separator class="my-4" />
          <h4 class="font-semibold">Bentuk-Bentuk Pemborosan Kata yang Umum Terjadi:</h4>
          <ol>
            <li>
              <strong>Pleonasme/Tautologi:</strong> Penggunaan kata-kata berlebihan yang maknanya sudah terkandung dalam kata lain.
              <ul>
                <li><span class="text-red-500">Salah:</span> Para hadirin <span class="italic">dipersilakan maju ke depan</span>.</li>
                <li><span class="text-green-500">Benar:</span> Hadirin <span class="italic">dipersilakan maju</span>. (Maju pasti ke depan).</li>
                <li><span class="text-red-500">Salah:</span> Kita harus <span class="italic">saling tolong-menolong</span> satu sama lain.</li>
                <li><span class="text-green-500">Benar:</span> Kita harus <span class="italic">saling menolong</span>. (Saling sudah berarti timbal balik).</li>
              </ul>
            </li>
            <li>
              <strong>Pengulangan Subjek:</strong> Mengulang subjek yang sama dalam satu kalimat majemuk.
              <ul>
                <li><span class="text-red-500">Salah:</span> Karena <span class="italic">ia</span> sakit, <span class="italic">ia</span> tidak masuk sekolah.</li>
                <li><span class="text-green-500">Benar:</span> Karena sakit, <span class="italic">ia</span> tidak masuk sekolah.</li>
              </ul>
            </li>
            <li>
              <strong>Hiponim dan Hipernim:</strong> Menggunakan kata khusus (hiponim) bersama kata umumnya (hipernim) secara tidak perlu.
              <ul>
                <li><span class="text-red-500">Salah:</span> Ia suka warna <span class="italic">merah</span>, <span class="italic">kuning</span>, dan <span class="italic">hijau</span>.</li>
                <li><span class="text-green-500">Benar:</span> Ia suka warna <span class="italic">merah</span>, <span class="italic">kuning</span>, dan <span class="italic">hijau</span>. (Ini contoh yang benar, pemborosan terjadi jika konteksnya salah).</li>
                <li><span class="text-red-500">Salah:</span> Burung <span class="italic">merpati</span> itu terbang ke <span class="italic">angkasa</span> atas.</li>
                <li><span class="text-green-500">Benar:</span> Burung <span class="italic">merpati</span> itu terbang ke <span class="italic">angkasa</span>.</li>
              </ul>
            </li>
             <li>
              <strong>Penjamakan Ganda:</strong> Menggunakan dua penanda jamak sekaligus.
              <ul>
                <li><span class="text-red-500">Salah:</span> <span class="italic">Banyak siswa-siswa</span> yang mengikuti lomba.</li>
                <li><span class="text-green-500">Benar:</span> <span class="italic">Banyak siswa</span> yang mengikuti lomba. ATAU <span class="italic">Siswa-siswa</span> mengikuti lomba.</li>
              </ul>
            </li>
             <li>
              <strong>Penggunaan Bentuk Ringkas:</strong> Memadatkan frasa menjadi satu kata jika memungkinkan.
              <ul>
                <li><span class="text-red-500">Salah:</span> Dia <span class="italic">memberikan peringatan</span> kepada adiknya.</li>
                <li><span class="text-green-500">Benar:</span> Dia <span class="italic">memperingatkan</span> adiknya.</li>
              </ul>
            </li>
          </ol>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Latihan Soal Interaktif                                           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader class="flex flex-row items-center gap-4">
          <Target class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Uji Pemahaman</CardTitle>
            <CardDescription>Pilih jawaban yang paling tepat untuk mengasah kemampuan Anda.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="validateAnswers">
            <div class="space-y-8">
              <div v-for="(q, index) in questions" :key="q.id">
                <p class="font-semibold mb-4">{{ index + 1 }}. {{ q.questionText }}</p>
                <RadioGroup v-model="userAnswers[q.id]" class="space-y-2" :disabled="practiceSubmitted">
                  <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2">
                    <RadioGroupItem :id="`q${q.id}-opt${option.id}`" :value="option.id" />
                    <Label :for="`q${q.id}-opt${option.id}`" class="leading-tight">{{ option.text }}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
          <Button v-if="practiceSubmitted" variant="outline" @click="resetPractice">
            Coba Lagi
          </Button>
          <Button @click="validateAnswers" :disabled="practiceSubmitted || !isAllQuestionsAnswered">
            <span v-if="practiceSubmitted">Lihat Hasil</span>
            <span v-else>Selesai & Cek Jawaban</span>
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Hasil & Pembahasan                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="w-full">
          <CardHeader class="flex flex-row items-center gap-4">
            <BarChart2 class="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Analisis Hasil Latihan</CardTitle>
              <CardDescription>Berikut adalah rincian skor dan pembahasan dari latihan Anda.</CardDescription>
            </div>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Ringkasan Skor -->
            <div class="flex items-center justify-center gap-6 rounded-lg border p-6">
              <div class="flex flex-col items-center">
                <p class="text-sm font-medium text-muted-foreground">SKOR ANDA</p>
                <p class="text-5xl font-bold" :class="score >= 75 ? 'text-green-500' : 'text-orange-500'">{{ score }}</p>
              </div>
              <div class="flex-1">
                 <Progress :model-value="score" class="h-3" />
                 <p v-if="score === 100" class="mt-2 text-sm text-center text-green-600 font-medium">Sempurna! Pemahaman Anda sangat baik!</p>
                 <p v-else-if="score >= 75" class="mt-2 text-sm text-center text-green-600 font-medium">Bagus! Anda sudah memahami sebagian besar konsep.</p>
                 <p v-else-if="score >= 50" class="mt-2 text-sm text-center text-orange-600 font-medium">Cukup baik. Perhatikan kembali materi dan pembahasan.</p>
                 <p v-else class="mt-2 text-sm text-center text-red-600 font-medium">Jangan menyerah! Pelajari lagi pembahasan untuk meningkatkan pemahaman.</p>
              </div>
            </div>

            <!-- Pembahasan Detail per Soal -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold flex items-center gap-2"><BrainCircuit class="h-5 w-5"/>Pembahasan Detail</h3>
              <div v-for="(result, index) in validationResults" :key="result.questionId">
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="bg-card">
                  <div class="flex items-start gap-4">
                    <div class="mt-1">
                      <CheckCircle2 v-if="result.isCorrect" class="h-5 w-5 text-green-500" />
                      <XCircle v-else class="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <AlertTitle class="font-bold">Soal {{ index + 1 }}</AlertTitle>
                      <AlertDescription class="prose prose-sm max-w-none dark:prose-invert">
                        <p class="font-medium">{{ result.questionText }}</p>
                        <blockquote class="my-2 border-l-4 pl-4" :class="result.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'">
                           Jawaban Anda: <strong>{{ result.userAnswerText || "Tidak dijawab" }}</strong>.
                           <span v-if="!result.isCorrect">Jawaban yang benar adalah <strong>{{ questions.find(q=>q.id === result.questionId)?.options.find(o=>o.id === result.correctAnswerId)?.text }}</strong>.</span>
                        </blockquote>
                        <h5 class="font-semibold mt-3">Penjelasan:</h5>
                        <div v-html="result.explanation"></div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>
            
          </CardContent>
           <CardFooter class="flex justify-end">
            <Button @click="resetPractice">
              Kerjakan Ulang Latihan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>