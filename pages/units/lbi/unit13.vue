<!--
  File: @/pages/units/lbi/unit5.vue
  Unit: Memahami dan Menggunakan Kalimat Efektif: Keparalelan
  SNBT Subtest: Literasi Bahasa Indonesia
-->
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// Asumsi komponen UI ini ada di @/components/ui
// Jika Anda menggunakan pustaka UI yang berbeda, sesuaikan impor ini.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, FileText, BrainCircuit, BarChart2 } from 'lucide-vue-next'

definePageMeta({
  // Anda bisa menggunakan layout default jika sudah diatur di nuxt.config.ts,
  // atau biarkan seperti ini untuk kejelasan.
  // layout: false, 
})

// --- Navigasi Dinamis ---
const route = useRoute()
const router = useRouter()

const currentUnitNumber = computed(() => {
  const pathParts = route.path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  // Mencari angka di akhir nama file (cth: 'unit5' -> 5)
  const match = lastPart.match(/(\d+)$/)
  return match ? parseInt(match[1], 10) : null
})

function goToPreviousUnit() {
  if (currentUnitNumber.value && currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  } else {
    // Mungkin arahkan ke halaman daftar unit jika ini unit pertama
    router.push('/units/lbi')
  }
}

function goToNextUnit() {
  if (currentUnitNumber.value) {
    // Ganti '10' dengan jumlah total unit Anda
    router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
  }
}

// --- Konten & Logika Kuis ---
const isSubmitted = ref(false)
const userAnswers = reactive<Array<string | null>>([])

const questions = ref([
  {
    question: "Perhatikan kalimat berikut.\n\nUpaya perbaikan ekonomi negara tidak hanya berfokus pada peningkatan investasi asing, tetapi juga bagaimana menciptakan lapangan kerja baru, dan melakukan pemberdayaan UMKM secara masif.\n\nAgar kalimat tersebut menjadi efektif dengan menerapkan prinsip keparalelan, perbaikan yang tepat adalah...",
    options: [
      "Mengganti frasa 'bagaimana menciptakan' menjadi 'penciptaan'.",
      "Mengganti kata 'melakukan' menjadi 'pemberdayaan'.",
      "Mengganti frasa 'peningkatan investasi asing' menjadi 'meningkatkan investasi asing'.",
      "Menghilangkan konjungsi 'dan' sebelum 'melakukan pemberdayaan'.",
      "Mengganti frasa 'secara masif' menjadi 'yang masif'.",
    ],
    correctAnswerIndex: 0,
    explanation: "Prinsip keparalelan menuntut kesetaraan bentuk pada unsur-unsur yang setara. Dalam kalimat soal, terdapat tiga unsur yang dirinci: (1) **peningkatan** investasi asing (nomina/kata benda), (2) **bagaimana menciptakan** lapangan kerja baru (klausa/anak kalimat), dan (3) **melakukan pemberdayaan** UMKM (frasa verbal/kata kerja). Terlihat adanya ketidakparalelan bentuk. Untuk menyetarakannya, semua unsur harus diubah ke dalam bentuk yang sama. Pilihan A mengubah unsur kedua menjadi 'penciptaan' (nomina), sehingga semua unsur menjadi nomina: **peningkatan**, **penciptaan**, dan **pemberdayaan**. Ini menciptakan struktur yang paralel dan efektif. Pilihan C juga bisa benar jika semua unsur diubah menjadi verba ('meningkatkan', 'menciptakan', 'memberdayakan'), tetapi pilihan A menawarkan solusi yang paling sesuai dengan struktur awal kalimat."
  },
  {
    question: "Pilih kalimat yang memiliki struktur paralel paling baik dan logis.",
    options: [
      "Kegiatan lokakarya ini mencakup tiga sesi utama: penyampaian materi oleh ahli, diskusi kelompok untuk memecahkan studi kasus, dan para peserta akan mempresentasikan hasilnya.",
      "Tugas seorang manajer proyek adalah merencanakan jadwal, mengalokasikan sumber daya, memantau kemajuan, dan penjaminan kualitas hasil akhir.",
      "Pemerintah berkomitmen untuk melindungi warga negaranya, menjaga stabilitas nasional, dan memajukan kesejahteraan umum.",
      "Untuk menjadi sehat, kita harus memperhatikan pola makan, rutin berolahraga, dan cukup istirahat.",
      "Tahapan dalam penelitian ini adalah pengumpulan data, data dianalisis, dan penarikan kesimpulan.",
    ],
    correctAnswerIndex: 2,
    explanation: "Kalimat pada pilihan C menunjukkan keparalelan yang sempurna. Ketiga unsur rincian tugas pemerintah menggunakan verba (kata kerja) dalam bentuk yang sama: **melindungi**, **menjaga**, dan **memajukan**. Ini menciptakan alur yang logis dan mudah dipahami. Mari kita analisis pilihan lain: (A) tidak paralel ('penyampaian' (nomina), 'diskusi' (nomina), 'para peserta akan mempresentasikan' (klausa)). (B) tidak paralel ('merencanakan' (verba), 'mengalokasikan' (verba), 'memantau' (verba), 'penjaminan' (nomina)). (D) nyaris paralel, tetapi 'cukup istirahat' adalah frasa adjektiva+nomina, sementara dua lainnya adalah frasa verba+nomina. Pilihan C adalah yang paling konsisten. (E) tidak paralel ('pengumpulan' (nomina), 'data dianalisis' (klausa pasif), 'penarikan' (nomina))."
  },
  {
    question: "Kalimat 'Proses pembuatan batik tulis meliputi pencantingan malam pada kain, melakukan pewarnaan dengan zat alami, dan tahap terakhir adalah pelorodan untuk menghilangkan malam' menjadi tidak efektif karena ketidakparalelan. Manakah perbaikan yang paling tepat?",
    options: [
      "Proses pembuatan batik tulis meliputi pencantingan malam, pewarnaan kain, dan melorotkan malam.",
      "Proses pembuatan batik tulis adalah mencantingkan malam, mewarnai kain, dan melorodkan malam.",
      "Proses pembuatan batik tulis meliputi pencantingan, pewarnaan, dan pelorodan.",
      "Proses pembuatan batik tulis meliputi tahap mencanting, tahap mewarnai, dan tahap melorod.",
      "Proses pembuatan batik tulis dilakukan dengan pencantingan, pewarnaan, serta pelorodan.",
    ],
    correctAnswerIndex: 2,
    explanation: "Kalimat asli tidak paralel karena mencampurkan bentuk frasa nomina ('pencantingan malam'), frasa verba ('melakukan pewarnaan'), dan klausa ('tahap terakhir adalah pelorodan'). Pilihan C adalah perbaikan terbaik karena menyajikan semua tahapan dalam bentuk nomina (kata benda) yang konsisten: **pencantingan**, **pewarnaan**, dan **pelorodan**. Pilihan B juga paralel (menggunakan verba), tetapi penggunaan kata 'adalah' kurang tepat dibandingkan 'meliputi' untuk merinci proses. Pilihan A dan D juga mencoba paralelisme, tetapi pilihan C adalah yang paling ringkas dan formal, menjadikannya perbaikan yang paling efektif."
  },
  {
    question: "Ketidakparalelan sering terjadi dalam perincian yang menggunakan tanda baca titik dua (:). Manakah kalimat di bawah ini yang paling baik dalam menerapkan keparalelan setelah tanda titik dua?",
    options: [
      "Pelamar harus melampirkan beberapa dokumen: fotokopi ijazah, daftar riwayat hidup, dan pasfoto ukuran 4x6 harus diserahkan.",
      "Faktor penyebab inflasi antara lain: tingginya permintaan barang, biaya produksi meningkat, dan peredaran uang yang terlalu banyak.",
      "Ada tiga hal yang perlu kita perhatikan: kebersihan lingkungan, menjaga kesehatan tubuh, dan hubungan sosial yang baik.",
      "Semua peserta diwajibkan membawa peralatan berikut: laptop dengan spesifikasi minimum, buku catatan untuk mencatat, dan alat tulis lengkap.",
      "Tujuan dari program ini adalah: meningkatkan literasi digital masyarakat, memberdayakan ekonomi kreatif, dan penciptaan ekosistem startup yang kondusif.",
    ],
    correctAnswerIndex: 3,
    explanation: "Pilihan D menunjukkan keparalelan yang konsisten dalam bentuk frasa nomina. Semua item yang dirinci adalah objek/benda: **laptop**, **buku catatan**, dan **alat tulis**. Ini adalah penggunaan keparalelan yang jelas dan tepat. Mari analisis pilihan lain: (A) tidak paralel ('fotokopi ijazah' (frasa nomina), 'daftar riwayat hidup' (frasa nomina), 'pasfoto ... harus diserahkan' (klausa)). (B) tidak paralel ('tingginya permintaan' (frasa nomina), 'biaya produksi meningkat' (klausa), 'peredaran uang' (frasa nomina)). (C) tidak paralel ('kebersihan' (nomina), 'menjaga' (verba), 'hubungan' (nomina)). (E) tidak paralel ('meningkatkan' (verba), 'memberdayakan' (verba), 'penciptaan' (nomina))."
  },
]);

// Inisialisasi userAnswers saat komponen dimuat
onMounted(() => {
  userAnswers.splice(0, userAnswers.length, ...Array(questions.value.length).fill(null))
})

const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.reduce((correctCount, question, index) => {
    return userAnswers[index] === question.options[question.correctAnswerIndex] ? correctCount + 1 : correctCount
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

function submitQuiz() {
  isSubmitted.value = true
  // Scroll ke bagian hasil untuk UX yang lebih baik
  const resultElement = document.getElementById('result-section')
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetQuiz() {
  isSubmitted.value = false
  userAnswers.splice(0, userAnswers.length, ...Array(questions.value.length).fill(null))
  // Scroll kembali ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <SNBTLayout
    test-title="SNBT: Literasi Bahasa Indonesia"
    test-description="Kumpulan Latihan Soal dan Materi Berbasis Subtes SNBT"
    unit-title="Memahami dan Menggunakan Kalimat Efektif: Keparalelan"
    unit-description="Materi ini mengupas tuntas tentang konsistensi bentuk dalam kalimat (paralelisme) untuk menciptakan struktur yang logis, jelas, dan mudah dipahami."
    :categories="['Literasi Bahasa Indonesia', 'Kalimat Efektif', 'Struktur Sintaksis', 'PUEBI']"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- Slot Konten Utama (Materi & Latihan)                                    -->
    <!-- ======================================================================= -->
    <template #default>
      <div class="grid flex-1 items-start gap-6 lg:grid-cols-2">
        <!-- Kolom Materi -->
        <div class="grid auto-rows-max items-start gap-6">
          <slot name="material">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <FileText class="h-6 w-6" />
                  <span>Materi Pembelajaran: Keparalelan</span>
                </CardTitle>
                <CardDescription>
                  Pahami konsep dasar keparalelan sebelum memulai latihan.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-4 text-sm text-justify">
                <div>
                  <h3 class="font-bold text-base mb-1">1. Definisi Keparalelan (Kesejajaran)</h3>
                  <p>
                    Keparalelan atau kesejajaran adalah kesamaan atau konsistensi bentuk gramatikal yang digunakan dalam unsur-unsur kalimat yang setara. Jika unsur pertama dalam sebuah perincian menggunakan kata benda (nomina), maka unsur kedua, ketiga, dan seterusnya juga harus menggunakan kata benda. Begitu pula jika menggunakan kata kerja (verba), frasa, atau klausa.
                  </p>
                </div>
                <div>
                  <h3 class="font-bold text-base mb-1">2. Pentingnya Keparalelan</h3>
                  <p>
                    Struktur yang paralel membuat kalimat lebih mudah dipahami, lebih logis, dan secara estetika lebih enak dibaca. Ketidakparalelan dapat menyebabkan kalimat menjadi ambigu, janggal, dan sulit dicerna maknanya, yang sering menjadi jebakan dalam soal-soal SNBT.
                  </p>
                </div>
                <div>
                  <h3 class="font-bold text-base mb-1">3. Contoh Analisis (Benar vs. Salah)</h3>
                  <p class="font-semibold text-red-600">❌ Tidak Paralel:</p>
                  <p class="pl-4 border-l-2 border-red-500 ml-2 mb-2">
                    Tahap penyelesaian proyek meliputi survei lokasi, <span class="font-bold">pembuatan desain</span>, <span class="font-bold">membangun prototipe</span>, dan <span class="font-bold">melakukan evaluasi</span>.
                    <br>
                    <em class="text-xs text-muted-foreground">(Bentuk: Nomina, Verba, Verba)</em>
                  </p>
                  <p class="font-semibold text-green-600">✅ Paralel (diubah ke Nomina):</p>
                  <p class="pl-4 border-l-2 border-green-500 ml-2 mb-2">
                    Tahap penyelesaian proyek meliputi survei lokasi, <span class="font-bold">pembuatan desain</span>, <span class="font-bold">pembangunan prototipe</span>, dan <span class="font-bold">evaluasi</span>.
                    <br>
                    <em class="text-xs text-muted-foreground">(Bentuk: Nomina, Nomina, Nomina, Nomina)</em>
                  </p>
                  <p class="font-semibold text-green-600">✅ Paralel (diubah ke Verba):</p>
                  <p class="pl-4 border-l-2 border-green-500 ml-2 mb-2">
                    Tahap penyelesaian proyek meliputi menyurvei lokasi, <span class="font-bold">membuat desain</span>, <span class="font-bold">membangun prototipe</span>, dan <span class="font-bold">mengevaluasi</span>.
                    <br>
                    <em class="text-xs text-muted-foreground">(Bentuk: Verba, Verba, Verba, Verba)</em>
                  </p>
                </div>
                 <div>
                  <h3 class="font-bold text-base mb-1">4. Tips & Trik</h3>
                  <ul class="list-disc list-inside space-y-1">
                    <li>Perhatikan kata hubung seperti 'dan', 'atau', 'tetapi', 'melainkan', serta tanda baca koma (,) dalam perincian dan titik dua (:).</li>
                    <li>Identifikasi 'jenis kata' (verba, nomina, adjektiva) atau 'jenis struktur' (frasa, klausa) pada setiap unsur dalam perincian.</li>
                    <li>Pastikan semua unsur dalam perincian tersebut memiliki 'jenis' yang sama.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </slot>
        </div>

        <!-- Kolom Latihan -->
        <div class="grid auto-rows-max items-start gap-6">
          <slot name="practice">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <BrainCircuit class="h-6 w-6" />
                  <span>Latihan Soal Interaktif</span>
                </CardTitle>
                <CardDescription>
                  Pilih satu jawaban yang paling tepat. Analisis struktur kalimat dengan cermat!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-8">
                  <div v-for="(q, index) in questions" :key="index" class="space-y-4">
                    <p class="font-semibold leading-relaxed whitespace-pre-wrap">{{ index + 1 }}. {{ q.question }}</p>
                    <RadioGroup
                      :id="`question-${index}`"
                      v-model="userAnswers[index]"
                      :disabled="isSubmitted"
                      class="space-y-2"
                    >
                      <div v-for="(option, optIndex) in q.options" :key="optIndex" class="flex items-center space-x-2">
                        <RadioGroupItem :id="`q${index}-opt${optIndex}`" :value="option" />
                        <Label :for="`q${index}-opt${optIndex}`" class="leading-relaxed">{{ option }}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button v-if="!isSubmitted" class="w-full" @click="submitQuiz">
                  Kumpulkan Jawaban
                </Button>
                <Button v-else class="w-full" variant="secondary" @click="resetQuiz">
                  Coba Lagi
                </Button>
              </CardFooter>
            </Card>
          </slot>
        </div>
      </div>
    </template>
    
    <!-- ======================================================================= -->
    <!-- Slot Hasil & Penjelasan (Validator)                                     -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <BarChart2 class="h-6 w-6" />
              Hasil dan Pembahasan
            </CardTitle>
            <CardDescription>
              Berikut adalah analisis lengkap dari jawabanmu. Pelajari penjelasannya untuk pemahaman yang lebih dalam.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Ringkasan Skor -->
            <div class="space-y-2 rounded-lg border bg-card p-4">
              <h3 class="font-bold text-lg">Ringkasan Skormu</h3>
              <div class="flex items-center justify-between gap-4">
                <span class="text-2xl font-bold">{{ score }} / {{ questions.length }} Benar</span>
                <span class="text-3xl font-bold text-primary">{{ scorePercentage }}%</span>
              </div>
              <Progress :model-value="scorePercentage" />
               <p v-if="scorePercentage === 100" class="text-sm text-green-600 font-medium">
                Luar biasa! Pemahamanmu tentang keparalelan sangat baik.
              </p>
              <p v-else-if="scorePercentage >= 60" class="text-sm text-yellow-600 font-medium">
                Hasil yang bagus! Terus asah kemampuanmu dengan memperhatikan detail pada pembahasan.
              </p>
              <p v-else class="text-sm text-red-600 font-medium">
                Tidak apa-apa! Mari pelajari kembali setiap soal. Kunci sukses adalah memahami kesalahan.
              </p>
            </div>
            
            <!-- Pembahasan Detail per Soal -->
            <div class="space-y-8">
              <div v-for="(q, index) in questions" :key="`result-${index}`">
                <p class="font-semibold leading-relaxed whitespace-pre-wrap">{{ index + 1 }}. {{ q.question }}</p>
                <div class="mt-4 space-y-4 rounded-lg border p-4">
                  <div>
                    <h4 class="font-semibold mb-2">Analisis Jawabanmu:</h4>
                    <div v-if="userAnswers[index] === q.options[q.correctAnswerIndex]" class="flex items-start gap-2 text-green-600">
                      <CheckCircle2 class="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p class="font-bold">Jawabanmu Benar!</p>
                        <p>{{ userAnswers[index] }}</p>
                      </div>
                    </div>
                    <div v-else class="space-y-3">
                      <div class="flex items-start gap-2 text-red-600">
                        <XCircle class="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                           <p class="font-bold">Jawabanmu:</p>
                           <p>{{ userAnswers[index] || "Tidak dijawab" }}</p>
                        </div>
                      </div>
                       <div class="flex items-start gap-2 text-green-600">
                        <CheckCircle2 class="h-5 w-5 flex-shrink-0 mt-0.5" />
                         <div>
                          <p class="font-bold">Jawaban yang Benar:</p>
                          <p>{{ q.options[q.correctAnswerIndex] }}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  <Alert variant="default" class="bg-muted/50">
                    <AlertTitle class="font-bold">Penjelasan Rinci</AlertTitle>
                    <AlertDescription class="text-foreground leading-relaxed">
                      {{ q.explanation }}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full" variant="secondary" @click="resetQuiz">
              Ulangi Latihan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Styling tambahan jika diperlukan */
.whitespace-pre-wrap {
  white-space: pre-wrap; /* Memastikan format teks soal dengan baris baru tetap terjaga */
}
</style>