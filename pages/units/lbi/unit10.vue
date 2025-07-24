<!--
  File: @/pages/units/lbi/unit1.vue
  Unit: 1 - Memahami dan Menggunakan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI): Penulisan Kata (Kata Baku dan Tidak Baku)
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// --- Impor Komponen UI (Asumsi komponen ini ada di direktori Anda) ---
// Komponen-komponen ini, seperti yang ada di Shadcn-Vue, memberikan tampilan yang modern dan bersih.
// Jika Anda tidak memilikinya, Anda dapat menggantinya dengan elemen HTML standar.
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-vue-next'

// =======================================================================
// Navigasi & Metadata Halaman
// =======================================================================

const router = useRouter()
const route = useRoute()

// --- Ekstraksi Nomor Unit dari URL ---
// Secara dinamis mengambil nomor unit dari path, contoh: dari '/units/lbi/unit1', akan diambil '1'.
const unitNumber = computed(() => {
  const match = route.path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : null
})

// --- Fungsi Navigasi Antar Unit ---
function goToPreviousUnit() {
  if (unitNumber.value && unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  }
  else {
    // Aksi jika ini adalah unit pertama (contoh: kembali ke daftar unit)
    router.push('/latihan/literasi-bahasa-indonesia')
  }
}

function goToNextUnit() {
  if (unitNumber.value) {
    // Arahkan ke unit selanjutnya. Anda bisa menambahkan logika untuk menangani unit terakhir.
    router.push(`/units/lbi/unit${unitNumber.value + 1}`)
  }
}


// --- Metadata untuk SNBTLayout ---
// Informasi ini akan ditampilkan di header layout.
const pageMeta = {
  testTitle: 'SNBT: Literasi Bahasa Indonesia',
  testDescription: 'Subtes untuk mengukur kemampuan dalam memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks.',
  unitTitle: 'Unit 1: Penulisan Kata (Baku & Tidak Baku)',
  unitDescription: 'Fokus pada pemahaman dan penerapan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) terkait penulisan kata yang benar, termasuk kata serapan, kata berimbuhan, dan bentuk terikat.',
  categories: ['PUEBI', 'Ejaan', 'Kata Baku'],
}

// =======================================================================
// Data Soal Latihan
// =======================================================================
// Soal-soal dirancang dengan tingkat kesulitan tinggi, seringkali dalam konteks kalimat kompleks.
const practiceQuestions = ref([
  {
    id: 'q1',
    question: 'Analis sistem di perusahaan teknologi itu sedang melakukan analisa mendalam terhadap resiko keamanan siber yang mungkin timbul dari implementasi software baru. Ia harus memastikan semua aspek telah tercover sebelum proyek diresmikan.',
    instruction: 'Kalimat di atas akan menjadi baku jika perbaikan dilakukan pada kata-kata...',
    options: [
      { id: 'a', text: 'Analis, analisa, resiko, software' },
      { id: 'b', text: 'analisa, resiko, software, tercover' },
      { id: 'c', text: 'analisa, resiko, software' },
      { id: 'd', text: 'Analis, analisa, resiko' },
      { id: 'e', text: 'analisa, resiko' },
    ],
    correctAnswer: 'e',
    explanation: 'Kata yang tidak baku dalam kalimat tersebut adalah "analisa" dan "resiko". Menurut PUEBI, bentuk bakunya adalah **analisis** (serapan dari *analysis*) dan **risiko** (serapan dari *risk*). Kata "Analis" (pelaku) dan "software" (perangkat lunak) sudah sering dianggap baku dan diterima dalam konteks teknologi. Kata "tercover" bisa diganti dengan "tercakup" agar lebih Indonesia, namun "analisa" dan "resiko" adalah kesalahan ejaan yang lebih fundamental.'
  },
  {
    id: 'q2',
    question: 'Manajer apotik itu memberikan nasehat kepada para apoteker muda untuk selalu bertindak proaktif dalam melayani pasien, karena kepuasan pelanggan adalah azas utama dalam bisnis jasa kesehatan.',
    instruction: 'Identifikasilah kelompok kata yang seluruhnya ditulis secara tidak baku dalam kalimat di atas.',
    options: [
      { id: 'a', text: 'apotik, nasehat, proaktif' },
      { id: 'b', text: 'apotik, nasehat, azas' },
      { id: 'c', text: 'nasehat, proaktif, azas' },
      { id: 'd', text: 'apotik, proaktif, azas' },
      { id: 'e', text: 'semua kata sudah baku' },
    ],
    correctAnswer: 'b',
    explanation: 'Terdapat tiga kata tidak baku: **apotik** (seharusnya **apotek**), **nasehat** (seharusnya **nasihat**), dan **azas** (seharusnya **asas**). Kata "proaktif" sudah merupakan bentuk serapan yang baku.'
  },
  {
    id: 'q3',
    question: 'Dalam rangka merayakan HUT RI, pertandingan antar RW akan segera diselenggarakan. Kegiatan pasca-pandemi ini diharapkan dapat kembali mempererat silaturahmi antarwarga yang sempat merenggang.',
    instruction: 'Penulisan kata yang tidak sesuai dengan kaidah PUEBI pada paragraf di atas adalah...',
    options: [
      { id: 'a', text: 'HUT RI' },
      { id: 'b', text: 'antar RW' },
      { id: 'c', text: 'pasca-pandemi' },
      { id: 'd', text: 'silaturahmi' },
      { id: 'e', 'text': 'antarwarga' }
    ],
    correctAnswer: 'b',
    explanation: 'Bentuk terikat seperti "antar-" harus ditulis serangkai dengan kata yang mengikutinya. Jadi, penulisan yang benar adalah **antar-RW**. Penggunaan tanda hubung (-) diperlukan karena "RW" adalah singkatan yang ditulis dengan huruf kapital. Jika kata yang mengikuti bukan singkatan/nama, maka ditulis serangkai tanpa tanda hubung (contoh: **antarwarga** sudah benar). "Pasca-" juga bentuk terikat, dan **pascapandemi** (tanpa spasi) adalah penulisan yang lebih diutamakan, namun PUEBI memperbolehkan penggunaan tanda hubung jika diikuti kata berhuruf kapital atau untuk menegaskan, sehingga "pasca-pandemi" masih bisa diperdebatkan. Namun, "antar RW" jelas salah.'
  },
  {
    id: 'q4',
    question: 'Cermati kalimat-kalimat berikut:\n(1) Ia membeli karir barunya di perusahaan multi nasional.\n(2) Koordinasi sub-bagian personalia perlu ditingkatkan.\n(3) Atlit itu berlatih secara ekstrim untuk olimpiade.\n(4) Jadual keberangkatan kereta api telah diumumkan.\n(5) Kualitas produk kami sudah terjamin.',
    instruction: 'Kalimat yang menggunakan kata baku secara tepat ditunjukkan oleh nomor...',
    options: [
      { id: 'a', text: '(1)' },
      { id: 'b', text: '(2)' },
      { id: 'c', text: '(3)' },
      { id: 'd', text: '(4)' },
      { id: 'e', text: '(5)' },
    ],
    correctAnswer: 'e',
    explanation: 'Mari kita analisis setiap kalimat:\n(1) Tidak Baku: "karir" -> seharusnya **karier**; "multi nasional" -> seharusnya **multinasional** (bentuk terikat).\n(2) Tidak Baku: "sub-bagian" -> seharusnya **subbagian** (bentuk terikat).\n(3) Tidak Baku: "Atlit" -> seharusnya **atlet**; "ekstrim" -> seharusnya **ekstrem**.\n(4) Tidak Baku: "Jadual" -> seharusnya **jadwal**.\n(5) Baku: Semua kata dalam kalimat ini ("kualitas", "produk", "kami", "sudah", "terjamin") adalah kata baku.'
  },
  {
    id: 'q5',
    question: 'Pilihlah kalimat yang semua ejaannya ditulis dengan benar sesuai PUEBI.',
    instruction: '',
    options: [
      { id: 'a', text: 'Untuk aktifitas ekstrakurikuler, silahkan mendaftar ke sekertariat.' },
      { id: 'b', text: 'Frekwensi gempa susulan menurun secara signifikan setelah dua hari.' },
      { id: 'c', text: 'Kuitansi pembelian harus diserahkan kepada bagian keuangan secepatnya.' },
      { id: 'd', text: 'Ia memiliki kharisma yang kuat sehingga disegani oleh kawan maupun lawan.' },
      { id: 'e', text: 'Meskipun hanya menempati posisi nomer dua, team itu tetap bangga.' },
    ],
    correctAnswer: 'c',
    explanation: 'Analisis setiap pilihan:\n(a) Salah: "aktifitas" -> **aktivitas**; "ekstrakurikuler" -> **ekstrakurikuler** (sudah benar); "silahkan" -> **silakan**; "sekertariat" -> **sekretariat**.\n(b) Salah: "Frekwensi" -> **frekuensi**.\n(c) Benar: Kata "kuitansi" adalah bentuk baku.\n(d) Salah: "kharisma" -> **karisma**.\n(e) Salah: "nomer" -> **nomor**; "team" -> **tim**.'
  }
])

// =======================================================================
// State & Logic untuk Latihan Interaktif
// =======================================================================

// --- State Management ---
const userAnswers = ref<Record<string, string>>({})
const showResult = ref(false)
const quizSubmitted = ref(false)

// --- Computed Properties ---
const score = computed(() => {
  if (!quizSubmitted.value) return 0
  const correctCount = practiceQuestions.value.filter(q => userAnswers.value[q.id] === q.correctAnswer).length
  return Math.round((correctCount / practiceQuestions.value.length) * 100)
})

const allQuestionsAnswered = computed(() => {
    return Object.keys(userAnswers.value).length === practiceQuestions.value.length;
})

// --- Results Data ---
// Menggabungkan data soal dengan jawaban pengguna untuk ditampilkan di bagian hasil
const resultDetails = computed(() => {
  return practiceQuestions.value.map(q => ({
    ...q,
    userAnswer: userAnswers.value[q.id],
    isCorrect: userAnswers.value[q.id] === q.correctAnswer,
  }))
})


// --- Core Functions ---
function selectAnswer(questionId: string, optionId: string) {
  if (quizSubmitted.value) return // Mencegah perubahan jawaban setelah submit
  userAnswers.value[questionId] = optionId
}

function handleSubmit() {
  if (!allQuestionsAnswered.value) {
    alert("Harap jawab semua pertanyaan sebelum mengirimkan.")
    return;
  }
  quizSubmitted.value = true
  showResult.value = true
  // Scroll ke bagian hasil untuk UX yang lebih baik
  // setTimeout diperlukan untuk memberi waktu pada DOM untuk merender elemen hasil
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    resultElement?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function resetQuiz() {
  userAnswers.value = {}
  quizSubmitted.value = false
  showResult.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <SNBTLayout
    :test-title="pageMeta.testTitle"
    :test-description="pageMeta.testDescription"
    :unit-title="pageMeta.unitTitle"
    :unit-description="pageMeta.unitDescription"
    :categories="pageMeta.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Materi Inti: Kata Baku vs. Tidak Baku</CardTitle>
          <CardDescription>
            Kata baku adalah kata yang penulisannya sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI). Penggunaan kata baku bersifat wajib dalam tulisan formal, ilmiah, dan resmi. Memahami perbedaannya sangat penting untuk tes Literasi Bahasa Indonesia.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-base mb-2">1. Kaidah Kata Serapan</h4>
            <p class="mb-2">Banyak kata dalam Bahasa Indonesia merupakan serapan dari bahasa asing (Inggris, Arab, Belanda, dll.). Perhatikan perubahan ejaannya:</p>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li><span class="font-mono bg-muted px-1 rounded">analysis</span> (Inggris) &rarr; <strong>analisis</strong> (bukan <del>analisa</del>)</li>
              <li><span class="font-mono bg-muted px-1 rounded">system</span> (Inggris) &rarr; <strong>sistem</strong> (bukan <del>sistim</del>)</li>
              <li><span class="font-mono bg-muted px-1 rounded">pharmacy</span> (Inggris) &rarr; <strong>apotek</strong> (bukan <del>apotik</del>)</li>
              <li><span class="font-mono bg-muted px-1 rounded">risk</span> (Inggris) &rarr; <strong>risiko</strong> (bukan <del>resiko</del>)</li>
              <li><span class="font-mono bg-muted px-1 rounded">frequency</span> (Inggris) &rarr; <strong>frekuensi</strong> (bukan <del>frekwensi</del>)</li>
              <li><span class="font-mono bg-muted px-1 rounded">advice</span> (Inggris) / <span class="font-mono bg-muted px-1 rounded">نصيحة</span> (Arab) &rarr; <strong>nasihat</strong> (bukan <del>nasehat</del>)</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">2. Bentuk Terikat</h4>
            <p class="mb-2">Bentuk terikat (seperti: <span class="font-mono bg-muted px-1 rounded">antar-, pasca-, multi-, sub-, pra-</span>) ditulis serangkai (tanpa spasi) dengan kata yang mengikutinya.</p>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li><strong>antarkota</strong> (bukan <del>antar kota</del>)</li>
              <li><strong>multinasional</strong> (bukan <del>multi nasional</del>)</li>
              <li><strong>pascapanen</strong> (bukan <del>pasca panen</del>)</li>
              <li><strong>subbagian</strong> (bukan <del>sub bagian</del>)</li>
              <li><strong>Pengecualian:</strong> Gunakan tanda hubung (-) jika diikuti oleh kata yang berhuruf awal kapital atau singkatan. Contoh: <strong>antar-ASEAN</strong>, <strong>pasca-Orde Baru</strong>.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-base mb-2">3. Kata yang Sering Salah Eja</h4>
            <p class="mb-2">Beberapa kata sering keliru dalam penulisan sehari-hari. Hafalkan bentuk bakunya:</p>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li><strong>atlet</strong> (bukan <del>atlit</del>)</li>
              <li><strong>jadwal</strong> (bukan <del>jadual</del>)</li>
              <li><strong>kuitansi</strong> (bukan <del>kwitansi</del>)</li>
              <li><strong>kualitas</strong> (bukan <del>kwalitas</del>)</li>
              <li><strong>silakan</strong> (bukan <del>silahkan</del>)</li>
              <li><strong>teknik</strong> (bukan <del>tehnik</del>)</li>
              <li><strong>asas</strong> (bukan <del>azas</del>)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL                                                    -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Pemahaman</CardTitle>
          <CardDescription>Pilih jawaban yang paling tepat berdasarkan kaidah PUEBI. Bacalah setiap soal dengan teliti.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in practiceQuestions" :key="q.id" class="border-t pt-6">
            <p class="font-medium mb-1">Soal {{ index + 1 }}</p>
            <p class="text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">{{ q.question }}</p>
            <p v-if="q.instruction" class="text-sm text-muted-foreground italic mb-4">{{ q.instruction }}</p>
            
            <RadioGroup :value="userAnswers[q.id]" @update:model-value="val => selectAnswer(q.id, val)" :disabled="quizSubmitted">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-3 mb-3">
                <RadioGroupItem :id="`${q.id}-${option.id}`" :value="option.id" />
                <Label :for="`${q.id}-${option.id}`" class="cursor-pointer font-normal text-sm leading-snug">{{ option.text }}</Label>
              </div>
            </RadioGroup>
          </div>

          <div class="flex justify-end pt-4">
             <Button @click="handleSubmit" :disabled="quizSubmitted || !allQuestionsAnswered" size="lg">
              <span v-if="!quizSubmitted">Kirim Jawaban</span>
              <span v-else>Jawaban Terkirim</span>
            </Button>
          </div>
           <div v-if="!allQuestionsAnswered && !quizSubmitted" class="text-right text-sm text-yellow-600 mt-2 flex items-center justify-end">
                <AlertTriangle class="h-4 w-4 mr-2" />
                <span>Harap jawab semua pertanyaan untuk mengirim.</span>
            </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                              -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan</CardTitle>
            <CardDescription>Berikut adalah rincian hasil latihanmu. Pelajari pembahasannya untuk meningkatkan pemahaman.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Ringkasan Skor -->
            <div class="p-4 border rounded-lg bg-muted/50">
              <h3 class="font-semibold text-lg mb-2">Ringkasan Skor</h3>
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <p class="text-sm text-muted-foreground">Skor Akhir</p>
                  <p class="text-4xl font-bold">{{ score }}</p>
                </div>
                <div class="w-2/3">
                  <Progress :model-value="score" class="w-full" />
                   <p class="text-xs text-right mt-1">{{ resultDetails.filter(r => r.isCorrect).length }} dari {{ practiceQuestions.length }} jawaban benar</p>
                </div>
              </div>
            </div>

            <!-- Pembahasan Detail per Soal -->
            <div>
              <h3 class="font-semibold text-lg mb-4">Pembahasan Detail</h3>
              <div class="space-y-4">
                <div v-for="(result, index) in resultDetails" :key="result.id">
                  <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="border">
                     <component :is="result.isCorrect ? CheckCircle : XCircle" class="h-5 w-5" />
                    <AlertTitle>Soal {{ index + 1 }}: {{ result.isCorrect ? 'Benar' : 'Kurang Tepat' }}</AlertTitle>
                    <AlertDescription class="space-y-3 mt-2">
                      <p class="font-mono p-3 bg-background/50 rounded-md text-sm">{{ result.question }}</p>
                      
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-wider">Jawabanmu:</p>
                        <p :class="[result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400', 'font-medium']">
                          {{ result.options.find(o => o.id === result.userAnswer)?.text || 'Tidak dijawab' }}
                        </p>
                      </div>

                      <div v-if="!result.isCorrect">
                        <p class="text-xs font-semibold uppercase tracking-wider">Jawaban yang Benar:</p>
                        <p class="font-medium text-primary">
                          {{ result.options.find(o => o.id === result.correctAnswer)?.text }}
                        </p>
                      </div>

                      <div>
                         <p class="text-xs font-semibold uppercase tracking-wider mt-3">Pembahasan:</p>
                         <p class="text-sm leading-relaxed">{{ result.explanation }}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>

            <!-- Tombol Aksi -->
            <div class="flex justify-center pt-4">
              <Button @click="resetQuiz" variant="outline" size="lg">
                Coba Lagi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

  </SNBTLayout>
</template>

<style scoped>
/* Transisi untuk bagian hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>