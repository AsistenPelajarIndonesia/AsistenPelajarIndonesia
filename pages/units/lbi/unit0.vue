<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// Import komponen UI yang diperlukan dari library Anda (misal: shadcn-vue)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle } from 'lucide-vue-next'

// =======================================================================
// SETUP NAVIGASI & INFORMASI UNIT
// =======================================================================

const route = useRoute()
const router = useRouter()

// Ekstraksi nomor unit secara dinamis dari URL
const unitNumber = computed(() => {
  const match = route.path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : 1
})

// Fungsi untuk navigasi antar unit
function goToPreviousUnit() {
  if (unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  }
  // Bisa ditambahkan notifikasi jika sudah di unit pertama
}

function goToNextUnit() {
  router.push(`/units/lbi/unit${unitNumber.value + 1}`)
}

// =======================================================================
// DATA & STATE MANAGEMENT UNTUK LATIHAN
// =======================================================================

// --- Informasi Statis untuk Layout ---
const testTitle = 'SNBT: Literasi Bahasa Indonesia'
const testDescription = 'Subtes untuk mengukur kemampuan memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks.'
const unitTitle = computed(() => `Unit ${unitNumber.value}: Menentukan Ide Pokok & Ide Pendukung`)
const unitDescription = 'Keterampilan fundamental untuk memahami struktur dan esensi sebuah bacaan. Kuasai cara menemukan gagasan utama dan detail yang mendukungnya.'
const categories = ['Analisis Teks', 'Pemahaman Bacaan', 'Logika Berbahasa']

// --- State Reaktif untuk Latihan ---
const isSubmitted = ref(false)
const userAnswers = ref<Array<number | null>>([null, null, null])
const score = ref(0)
const results = ref<Array<{ isCorrect: boolean; userAnswer: string; correctAnswer: string; explanation: string }>>([])

// --- Konten Soal & Jawaban ---
const questions = ref([
  {
    id: 1,
    bacaan: `Fragmentasi ekosistem akibat pembangunan infrastruktur yang masif merupakan ancaman serius bagi keanekaragaman hayati. Koridor satwa liar, yaitu jalur vegetasi yang menghubungkan fragmen-fragmen habitat, diusulkan sebagai solusi mitigasi. Namun, efektivitas koridor ini seringkali diperdebatkan. Studi meta-analisis menunjukkan bahwa koridor memang meningkatkan pergerakan satwa antarfragmen sebesar 50% dibandingkan lanskap yang tidak terkoridor. Akan tetapi, keberhasilannya sangat bergantung pada kualitas intrinsik koridor itu sendiri, seperti lebar, tingkat tutupan vegetasi, dan tingkat gangguan manusia. Koridor yang sempit dan terdegradasi justru dapat berfungsi sebagai "perangkap ekologis" (ecological trap), yang menarik satwa untuk masuk namun meningkatkan risiko predasi atau kematian. Oleh karena itu, perancangan koridor tidak bisa disederhanakan sebagai penyambungan dua titik, melainkan harus menjadi sebuah intervensi ekologis yang terencana dan berbasis data spesifik lokasi.`,
    pertanyaan: 'Ide pokok paragraf di atas adalah...',
    pilihan: [
      'Pembangunan infrastruktur adalah penyebab utama fragmentasi ekosistem.',
      'Koridor satwa liar adalah solusi yang paling efektif untuk masalah fragmentasi habitat.',
      'Efektivitas koridor satwa liar sebagai solusi mitigasi bersifat kompleks dan bersyarat, tidak absolut.',
      'Koridor satwa liar yang berkualitas buruk dapat menjadi perangkap ekologis yang mematikan.',
      'Perancangan koridor satwa liar memerlukan data spesifik lokasi dan intervensi ekologis.'
    ],
    jawabanBenar: 2, // index ke-2
    penjelasan: 'Jawaban yang benar adalah (C). Paragraf ini tidak hanya menyatakan bahwa koridor satwa liar adalah solusi, tetapi secara kritis membahas kompleksitas dan syarat-syarat keberhasilannya. Kalimat awal memperkenalkan masalah dan solusi (koridor). Kalimat selanjutnya memberikan data pendukung efektivitasnya ("meningkatkan pergerakan... 50%"), namun langsung diikuti oleh sanggahan ("Akan tetapi, keberhasilannya sangat bergantung pada..."). Paragraf ditutup dengan kesimpulan bahwa perancangannya harus kompleks. Pilihan (A) hanya ide pendukung di kalimat pertama. Pilihan (B) terlalu menyederhanakan dan bertentangan dengan nada kritis paragraf. Pilihan (D) dan (E) adalah ide pendukung yang menjelaskan salah satu aspek kompleksitas, bukan gagasan utama yang merangkum keseluruhan argumen.'
  },
  {
    id: 2,
    bacaan: `Dalam diskursus ekonomi digital, "efek jaringan" (network effect) menjadi konsep sentral yang menjelaskan dominasi platform-platform raksasa. Efek ini terjadi ketika nilai suatu produk atau layanan bagi seorang pengguna meningkat seiring dengan bertambahnya jumlah pengguna lain. Media sosial adalah contoh klasik; platform menjadi lebih berharga ketika lebih banyak teman kita yang menggunakannya. Namun, ada sisi lain yang jarang dibahas: "efek kemacetan jaringan" (network congestion effect). Fenomena ini terjadi ketika penambahan pengguna justru menurunkan nilai layanan, baik karena degradasi teknis (server lambat) maupun degradasi sosial (peningkatan kebisingan informasi, polarisasi, dan hoaks). Regulasi yang hanya berfokus pada pencegahan monopoli berdasarkan efek jaringan klasik mungkin gagal mengatasi masalah kualitas layanan yang menurun akibat efek kemacetan ini. Oleh karena itu, kerangka regulasi masa depan harus mampu menyeimbangkan antara mendorong pertumbuhan pengguna dan menjaga kualitas ekosistem informasi di dalam platform.`,
    pertanyaan: 'Kalimat yang paling TIDAK mendukung ide pokok paragraf tersebut adalah...',
    pilihan: [
      'Media sosial adalah contoh klasik; platform menjadi lebih berharga ketika lebih banyak teman kita yang menggunakannya.',
      'Fenomena ini terjadi ketika penambahan pengguna justru menurunkan nilai layanan.',
      'Regulasi yang hanya berfokus pada pencegahan monopoli mungkin gagal mengatasi masalah kualitas.',
      'Efek jaringan terjadi ketika nilai suatu produk atau layanan bagi seorang pengguna meningkat seiring dengan bertambahnya jumlah pengguna lain.',
      'Platform-platform raksasa mendominasi ekonomi digital karena berbagai faktor strategis.'
    ],
    jawabanBenar: 4, // index ke-4
    penjelasan: 'Jawaban yang benar adalah (E). Ide pokok paragraf ini adalah memperkenalkan konsep "efek kemacetan jaringan" sebagai kontra-argumen atau sisi lain dari "efek jaringan" klasik, serta implikasinya terhadap regulasi. Pilihan (A), (B), (C), dan (D) semuanya secara langsung mendukung pengembangan argumen ini. Pilihan (A) dan (D) mendefinisikan dan mencontohkan efek jaringan klasik. Pilihan (B) mendefinisikan efek kemacetan jaringan. Pilihan (C) membahas implikasi regulasi dari kedua efek tersebut. Sebaliknya, Pilihan (E) adalah pernyataan yang terlalu umum ("berbagai faktor strategis") dan tidak secara spesifik mendukung argumen inti tentang dualisme efek jaringan dan efek kemacetan. Paragraf ini fokus pada satu mekanisme spesifik (efek jaringan), bukan "berbagai faktor" secara umum.'
  },
  {
    id: 3,
    bacaan: `Penelitian neurosains kognitif modern mulai menantang pandangan dualistik Cartesian yang secara tegas memisahkan antara emosi dan rasionalitas. Data pencitraan otak fungsional (fMRI) menunjukkan bahwa area otak yang secara tradisional diasosiasikan dengan emosi, seperti amigdala dan korteks prefrontal ventromedial (vmPFC), justru menunjukkan aktivasi yang signifikan selama proses pengambilan keputusan yang dianggap "rasional", misalnya dalam kalkulasi risiko finansial. Pasien dengan kerusakan pada vmPFC, meskipun memiliki intelegensi dan kemampuan logika yang utuh, menunjukkan defisit parah dalam membuat keputusan personal dan sosial yang menguntungkan. Hal ini mengindikasikan bahwa "sinyal emosional" atau "firasat" bukanlah gangguan bagi rasionalitas, melainkan komponen data krusial yang diintegrasikan oleh otak untuk memandu proses penalaran menuju pilihan yang adaptif. Rasionalitas murni, yang terlepas dari input emosional, tampaknya merupakan sebuah ilusi neurologis.`,
    pertanyaan: 'Gagasan utama yang ingin disampaikan oleh penulis dalam teks tersebut adalah...',
    pilihan: [
      'Pandangan dualisme Cartesian mengenai emosi dan rasionalitas tidak lagi relevan.',
      'Kerusakan pada area otak vmPFC menyebabkan defisit dalam pengambilan keputusan.',
      'Emosi bukanlah penghalang, melainkan komponen data esensial dalam proses pengambilan keputusan rasional.',
      'Teknologi fMRI telah merevolusi pemahaman kita tentang cara kerja otak manusia.',
      'Amigdala dan vmPFC adalah pusat emosi yang aktif selama pengambilan keputusan.'
    ],
    jawabanBenar: 2, // index ke-2
    penjelasan: 'Jawaban yang benar adalah (C). Ini adalah gagasan sentral yang dirangkai oleh seluruh argumen dalam paragraf. Pilihan (A) benar, tetapi fungsinya sebagai kalimat pembuka yang memperkenalkan masalah yang akan dibantah; gagasan utamanya adalah *apa bantahannya*. Pilihan (B) dan (E) adalah bukti atau data pendukung spesifik (contoh dari pasien dan hasil fMRI) yang digunakan untuk membangun argumen utama, bukan argumen utama itu sendiri. Pilihan (D) juga merupakan fakta pendukung yang memungkinkan penelitian ini terjadi, tetapi bukan kesimpulan dari penelitian yang dibahas. Pilihan (C) secara akurat menyintesiskan semua bukti yang disajikan (data fMRI, studi kasus pasien) menjadi sebuah kesimpulan baru: peran fungsional emosi di dalam rasionalitas.'
  }
])

// =======================================================================
// FUNGSI VALIDASI & LOGIKA APLIKASI
// =======================================================================

function validateAnswers() {
  let correctCount = 0
  const detailedResults = []

  questions.value.forEach((q, index) => {
    const userAnswerIndex = userAnswers.value[index]
    const isCorrect = userAnswerIndex === q.jawabanBenar

    if (isCorrect) {
      correctCount++
    }

    detailedResults.push({
      isCorrect,
      userAnswer: userAnswerIndex !== null ? q.pilihan[userAnswerIndex] : 'Tidak dijawab',
      correctAnswer: q.pilihan[q.jawabanBenar],
      explanation: q.penjelasan
    })
  })

  score.value = (correctCount / questions.value.length) * 100
  results.value = detailedResults
  isSubmitted.value = true
}
</script>

<template>
  <SNBTLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="isSubmitted"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Strategi Mengidentifikasi Ide Pokok & Pendukung</CardTitle>
          <CardDescription>Pahami konsepnya, bukan hanya menghafal.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <div>
            <h4 class="font-bold text-base mb-2">1. Apa itu Ide Pokok (Gagasan Utama)?</h4>
            <p class="text-muted-foreground">
              Ide pokok adalah jantung dari sebuah paragraf. Ia adalah gagasan sentral yang ingin disampaikan penulis kepada pembaca. Semua kalimat lain dalam paragraf tersebut bekerja untuk menjelaskan, membuktikan, atau menguraikan ide pokok ini. Anggap saja ide pokok adalah sebuah judul untuk paragraf tersebut.
            </p>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">2. Cara Menemukan Ide Pokok</h4>
            <ul class="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Cari Kalimat Utama:</strong> Seringkali, ide pokok terkandung dalam satu kalimat yang disebut kalimat utama. Posisinya bisa di:
                <ul class="list-disc pl-5 mt-1">
                  <li><strong>Awal Paragraf (Deduktif):</strong> Paling umum. Penulis menyampaikan ide utama, lalu menjelaskannya.</li>
                  <li><strong>Akhir Paragraf (Induktif):</strong> Penulis menyajikan data/fakta/contoh terlebih dahulu, lalu menarik kesimpulan di akhir.</li>
                  <li><strong>Awal dan Akhir (Campuran):</strong> Penegasan ulang ide pokok di akhir paragraf.</li>
                </ul>
              </li>
              <li>
                <strong>Tanyakan pada Diri Sendiri:</strong> Setelah membaca, tanyakan, "Secara keseluruhan, paragraf ini membahas tentang apa?". Jawaban singkat Anda kemungkinan besar adalah ide pokoknya.
              </li>
              <li>
                <strong>Waspadai Kata Kunci:</strong> Perhatikan kata-kata seperti <em>"oleh karena itu", "dengan demikian", "jadi", "pada intinya"</em>, yang seringkali menandakan sebuah kesimpulan atau ide utama.
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">3. Apa itu Ide Pendukung (Gagasan Penjelas)?</h4>
            <p class="text-muted-foreground">
              Jika ide pokok adalah fondasi rumah, maka ide pendukung adalah dinding, atap, dan perabotnya. Fungsinya adalah untuk memberikan detail, contoh, data, bukti, atau argumen yang memperkuat dan memperjelas ide pokok. Tanpa ide pendukung, ide pokok akan terasa abstrak dan tidak meyakinkan.
            </p>
          </div>
          <Separator />
          <div>
            <h4 class="font-bold text-base mb-2">Contoh Analisis</h4>
            <blockquote class="border-l-4 pl-4 italic text-muted-foreground my-2">
              "Kecerdasan buatan (AI) generatif memiliki potensi disruptif di berbagai sektor industri. Di bidang kreatif, AI mampu menghasilkan karya seni dan tulisan dalam hitungan detik. Sementara itu, dalam sektor layanan pelanggan, chatbot berbasis AI dapat melayani ribuan pertanyaan secara simultan tanpa lelah. Potensi efisiensi ini menjadikan AI generatif sebagai teknologi yang sangat menjanjikan."
            </blockquote>
            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Ide Pokok:</strong> Kecerdasan buatan (AI) generatif memiliki potensi disruptif di berbagai sektor industri. (Kalimat pertama, deduktif).</li>
              <li><strong>Ide Pendukung 1:</strong> Contoh di bidang kreatif (menghasilkan seni).</li>
              <li><strong>Ide Pendukung 2:</strong> Contoh di sektor layanan pelanggan (chatbot).</li>
              <li><strong>Ide Pendukung 3:</strong> Penegasan tentang potensi efisiensi.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL INTERAKTIF                                         -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-for="(question, qIndex) in questions" :key="question.id">
        <CardHeader>
          <CardTitle>Soal {{ qIndex + 1 }}</CardTitle>
          <CardDescription class="pt-4 whitespace-pre-line text-justify">{{ question.bacaan }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="font-semibold mb-4">{{ question.pertanyaan }}</p>
          <RadioGroup v-model="userAnswers[qIndex]" :disabled="isSubmitted">
            <div v-for="(option, oIndex) in question.pilihan" :key="oIndex" class="flex items-center space-x-2 mb-3">
              <RadioGroupItem :id="`q${qIndex}-o${oIndex}`" :value="oIndex" />
              <Label :for="`q${qIndex}-o${oIndex}`" class="leading-snug">{{ option }}</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Button v-if="!isSubmitted" @click="validateAnswers" class="w-full">
        Kumpulkan Jawaban
      </Button>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Hasil Latihan Anda</CardTitle>
          <CardDescription>Tinjau kembali jawabanmu untuk pemahaman yang lebih dalam.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Ringkasan Skor -->
          <div class="flex flex-col items-center gap-4 rounded-lg border p-6">
            <h3 class="text-xl font-bold">Skor Akhir</h3>
            <div class="text-5xl font-extrabold tracking-tighter">{{ score.toFixed(0) }} / 100</div>
            <Progress :model-value="score" class="w-full" />
            <p class="text-sm text-muted-foreground">
              {{ score > 80 ? 'Luar biasa! Pemahamanmu sangat tajam.' : score > 50 ? 'Bagus! Terus berlatih untuk menyempurnakan.' : 'Jangan menyerah! Cermati kembali penjelasannya.' }}
            </p>
          </div>

          <!-- Analisis Per Soal -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Rincian Jawaban:</h3>
            <Alert v-for="(result, index) in results" :key="index" :variant="result.isCorrect ? 'default' : 'destructive'" class="bg-opacity-10">
              <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5" />
              <AlertTitle class="text-base">Soal {{ index + 1 }}: {{ result.isCorrect ? 'BENAR' : 'SALAH' }}</AlertTitle>
              <AlertDescription class="space-y-2 mt-2">
                <p><strong>Jawaban Anda:</strong> <span :class="{'text-destructive': !result.isCorrect}">"{{ result.userAnswer }}"</span></p>
                <p v-if="!result.isCorrect"><strong>Jawaban Benar:</strong> <span class="text-green-700 dark:text-green-400 font-semibold">"{{ result.correctAnswer }}"</span></p>
                <Separator class="my-3"/>
                <div>
                  <h4 class="font-semibold mb-1">Penjelasan Mendalam:</h4>
                  <p class="text-xs md:text-sm leading-relaxed">{{ result.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </template>
  </SNBTLayout>
</template>