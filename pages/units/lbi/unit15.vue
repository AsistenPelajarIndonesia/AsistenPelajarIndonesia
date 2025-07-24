<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// Impor komponen UI yang dibutuhkan (asumsi dari shadcn-vue atau pustaka serupa)
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-vue-next'

// --- State Management & Data ---

// Tipe data untuk struktur pertanyaan
interface Question {
  id: number
  questionText: string
  passage?: string
  options: {
    value: string
    label: string
  }[]
  correctAnswer: string
  explanation: string
  userAnswer: string | null
}

// State untuk menampilkan hasil
const showResult = ref(false)

// Router dan Route untuk navigasi dinamis
const router = useRouter()
const route = useRoute()

// Ekstraksi nomor unit dari URL secara dinamis
const unitNumber = computed(() => {
  const match = route.path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : 0
})

// Data Soal Latihan (Dibuat sulit dan berkonteks)
const questions = ref<Question[]>([
  {
    id: 1,
    passage: "Perkembangan teknologi kecerdasan buatan (AI) yang pesat telah memunculkan berbagai inovasi, namun di sisi lain juga menimbulkan kekhawatiran baru di tengah masyarakat. Salah satu kekhawatiran utama adalah potensi disrupsi pasar tenaga kerja. Banyak ahli memprediksi bahwa pekerjaan-pekerjaan repetitif akan digantikan oleh sistem otomasi. Namun, narasi tersebut sering kali mengabaikan fakta bahwa AI juga menciptakan peluang kerja baru yang membutuhkan keahlian spesifik. Oleh karena itu, bagi pemerintah perlu segera merumuskan kebijakan adaptif untuk mempersiapkan sumber daya manusia dalam menghadapi era baru ini.",
    questionText: "Manakah dari kalimat berikut yang BUKAN merupakan kalimat efektif karena memiliki kerancuan struktur subjek?",
    options: [
      { value: 'A', label: "Perkembangan teknologi AI yang pesat telah memunculkan berbagai inovasi." },
      { value: 'B', label: "Banyak ahli memprediksi bahwa pekerjaan repetitif akan digantikan oleh sistem otomasi." },
      { value: 'C', label: "Narasi tersebut sering kali mengabaikan fakta bahwa AI juga menciptakan peluang kerja baru." },
      { value: 'D', label: "Bagi pemerintah perlu segera merumuskan kebijakan adaptif untuk mempersiapkan SDM." },
      { value: 'E', label: "Kekhawatiran utama adalah potensi disrupsi pasar tenaga kerja." },
    ],
    correctAnswer: 'D',
    explanation: "Kalimat 'Bagi pemerintah perlu segera merumuskan kebijakan adaptif...' tidak efektif karena subjeknya tidak jelas. Penggunaan preposisi 'Bagi' di awal kalimat menghilangkan 'pemerintah' sebagai subjek. Seharusnya, kalimat ini ditulis: 'Pemerintah perlu segera merumuskan kebijakan adaptif...'. Pada versi perbaikan ini, **Subjek (S)** adalah 'Pemerintah', **Predikat (P)** adalah 'perlu merumuskan', **Objek (O)** adalah 'kebijakan adaptif', dan **Keterangan (K)** adalah 'untuk mempersiapkan SDM'. Kalimat lain memiliki struktur S-P-O-K yang jelas.",
    userAnswer: null,
  },
  {
    id: 2,
    passage: "Dalam upaya meningkatkan mutu pendidikan nasional, pemerintah meluncurkan program Merdeka Belajar yang memberikan otonomi lebih besar kepada satuan pendidikan. Program ini dirancang untuk melepaskan belenggu administratif yang selama ini dianggap menghambat inovasi di tingkat sekolah. Dengan adanya keleluasaan ini, diharapkan para pendidik dapat lebih kreatif dalam mengembangkan metode pengajaran yang sesuai dengan konteks lokal dan kebutuhan siswa. Implementasi program ini, yang mana memerlukan kolaborasi antara semua pemangku kepentingan, menjadi kunci keberhasilan transformasi pendidikan di Indonesia.",
    questionText: "Kalimat manakah yang paling efektif untuk memperbaiki kalimat bercetak miring: 'Implementasi program ini, yang mana memerlukan kolaborasi antara semua pemangku kepentingan, menjadi kunci keberhasilan transformasi pendidikan di Indonesia.'?",
    options: [
      { value: 'A', label: "Implementasi program ini, yang memerlukan kolaborasi, menjadi kunci keberhasilan." },
      { value: 'B', label: "Implementasi program ini memerlukan kolaborasi antara semua pemangku kepentingan dan menjadi kunci keberhasilan transformasi pendidikan." },
      { value: 'C', label: "Implementasi program ini menjadi kunci keberhasilan transformasi pendidikan yang mana memerlukan kolaborasi." },
      { value: 'D', label: "Untuk mengimplementasikan program ini, memerlukan kolaborasi antara semua pemangku kepentingan sebagai kunci keberhasilan." },
      { value: 'E', label: "Implementasi program ini, yang memerlukan kolaborasi antara semua pemangku kepentingan, adalah kunci keberhasilan transformasi pendidikan di Indonesia." },
    ],
    correctAnswer: 'B',
    explanation: "Kalimat asli tidak efektif karena penggunaan 'yang mana' dan struktur anak kalimat yang terlalu panjang sehingga membuat predikat utama ('menjadi kunci keberhasilan') terasa jauh dari subjeknya ('Implementasi program ini').\n\n- **Opsi B** adalah perbaikan terbaik. Kalimat ini memiliki struktur majemuk setara yang jelas: [Implementasi program ini (S) memerlukan (P) kolaborasi... (O)] **dan** [menjadi (P) kunci keberhasilan... (Pelengkap)]. Struktur ini lugas dan mudah dipahami.\n- Opsi A menghilangkan informasi penting. \n- Opsi C memindahkan 'yang mana' ke posisi yang salah. \n- Opsi D menghilangkan subjek kalimat.\n- Opsi E menggunakan predikat 'adalah' yang meskipun gramatikal, namun opsi B lebih lugas dan efisien dalam menyampaikan dua aksi (memerlukan dan menjadi).",
    userAnswer: null,
  },
  {
    id: 3,
    passage: "Fenomena 'hujan meteor' sebenarnya adalah istilah yang kurang tepat. Peristiwa yang kita saksikan sebenarnya bukan bintang atau meteor yang jatuh, melainkan serpihan debu dan batuan dari komet atau asteroid yang terbakar saat memasuki atmosfer Bumi. Ketika Bumi dalam orbitnya melintasi jalur bekas lintasan sebuah komet, gravitasi planet kita akan menarik sisa-sisa material tersebut. Partikel-partikel ini, yang sering kali hanya seukuran sebutir pasir, melesat dengan kecepatan sangat tinggi dan menghasilkan jejak cahaya terang akibat gesekan dengan udara.",
    questionText: "Pada kalimat 'Ketika Bumi dalam orbitnya melintasi jalur bekas lintasan sebuah komet, gravitasi planet kita akan menarik sisa-sisa material tersebut.', apakah unsur yang berfungsi sebagai Subjek (S) pada klausa utama?",
    options: [
      { value: 'A', label: "Bumi" },
      { value: 'B', label: "gravitasi planet kita" },
      { value: 'C', label: "sisa-sisa material tersebut" },
      { value: 'D', label: "sebuah komet" },
      { value: 'E', label: "jalur bekas lintasan" },
    ],
    correctAnswer: 'B',
    explanation: "Kalimat tersebut adalah kalimat majemuk bertingkat. Mari kita pecah strukturnya:\n\n1.  **Anak Kalimat (Keterangan Waktu):** 'Ketika Bumi dalam orbitnya melintasi jalur bekas lintasan sebuah komet'\n    - Konjungsi: Ketika\n    - Subjek: Bumi\n    - Predikat: melintasi\n    - Objek: jalur bekas lintasan sebuah komet\n    - Keterangan: dalam orbitnya\n\n2.  **Induk/Klausa Utama:** 'gravitasi planet kita akan menarik sisa-sisa material tersebut'\n    - **Subjek (S):** gravitasi planet kita (pokok yang melakukan pekerjaan)\n    - **Predikat (P):** akan menarik (tindakan yang dilakukan subjek)\n    - **Objek (O):** sisa-sisa material tersebut (yang dikenai tindakan)\n\nOleh karena itu, subjek pada klausa utama adalah 'gravitasi planet kita'.",
    userAnswer: null,
  }
])

// --- Computed Properties ---

// Cek apakah semua pertanyaan sudah dijawab untuk mengaktifkan tombol submit
const allQuestionsAnswered = computed(() => {
  return questions.value.every(q => q.userAnswer !== null)
})

// Hitung skor total
const score = computed(() => {
  return questions.value.filter(q => q.userAnswer === q.correctAnswer).length
})

// Hitung skor dalam persentase
const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

// Path untuk navigasi unit
const previousUnitPath = computed(() => unitNumber.value > 1 ? `/units/lbi/unit${unitNumber.value - 1}` : '#')
const nextUnitPath = computed(() => `/units/lbi/unit${unitNumber.value + 1}`) // Asumsi selalu ada unit selanjutnya

// --- Methods / Functions ---

// Fungsi untuk submit jawaban
function handleSubmit() {
  if (!allQuestionsAnswered.value) {
    alert("Harap jawab semua pertanyaan terlebih dahulu.")
    return
  }
  showResult.value = true
  // Scroll ke bagian hasil untuk user experience yang lebih baik
  setTimeout(() => {
      const resultElement = document.getElementById('result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
  }, 100);
}

// Fungsi untuk mengulang kuis
function resetQuiz() {
  showResult.value = false
  questions.value.forEach(q => {
    q.userAnswer = null
  })
    // Scroll kembali ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi navigasi yang dipanggil oleh emit dari layout
function handleBack() {
  if (unitNumber.value > 1) {
    router.push(previousUnitPath.value)
  } else {
    // Mungkin bisa arahkan ke halaman daftar unit
    router.push('/units/lbi') 
  }
}

function handleNext() {
  router.push(nextUnitPath.value)
}
</script>

<template>
  <SNBTLayout
    test-title="SNBT: Literasi Bahasa Indonesia"
    test-description="Subtes untuk menguji kemampuan memahami, mengevaluasi, dan merefleksikan beragam jenis teks."
    :unit-title="`Unit ${unitNumber}: Kalimat Efektif - Ketepatan Struktur`"
    unit-description="Menganalisis dan memperbaiki kalimat berdasarkan kelengkapan dan kejelasan unsur S-P-O-K (Subjek, Predikat, Objek, Keterangan)."
    :categories="['Analisis Teks', 'Kaidah Kebahasaan', 'Logika Berbahasa']"
    :show-result="showResult"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT MATERI PEMBELAJARAN                                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Konsep Fundamental Kalimat Efektif</CardTitle>
          <CardDescription>
            Memahami fondasi dari sebuah kalimat yang baik dan benar.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-slate-700 dark:text-slate-300 space-y-4">
          <p>
            <strong>Kalimat efektif</strong> adalah kalimat yang dapat menyampaikan gagasan, pesan, atau informasi dari penulis kepada pembaca secara jelas, tepat, dan tidak menimbulkan salah tafsir. Salah satu pilar utama kalimat efektif adalah <strong>ketepatan struktur</strong>.
          </p>
          <p>
            Struktur dasar kalimat dalam Bahasa Indonesia umumnya mengikuti pola **S-P** (Subjek-Predikat), **S-P-O** (Subjek-Predikat-Objek), atau **S-P-O-K** (Subjek-Predikat-Objek-Keterangan).
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Anatomi Struktur Kalimat: S-P-O-K</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-md">
            <h4 class="font-bold text-blue-800 dark:text-blue-300">1. Subjek (S)</h4>
            <p class="text-sm mt-1">Pokok pembicaraan dalam kalimat; bagian yang melakukan tindakan atau yang dijelaskan. Biasanya berupa kata benda (nomina). <br> <strong>Kesalahan umum:</strong> Subjek tidak jelas karena didahului preposisi (kata depan) seperti <em>di, ke, dari, bagi, untuk</em>.</p>
            <div class="mt-2 text-xs space-y-1">
              <p><span class="text-red-600 font-semibold">❌ Salah:</span> Bagi mahasiswa wajib mengikuti seminar.</p>
              <p><span class="text-green-600 font-semibold">✅ Benar:</span> Mahasiswa (S) wajib mengikuti (P) seminar (O).</p>
            </div>
          </div>
          
          <div class="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md">
            <h4 class="font-bold text-green-800 dark:text-green-300">2. Predikat (P)</h4>
            <p class="text-sm mt-1">Tindakan atau keadaan yang dijelaskan mengenai subjek. Biasanya berupa kata kerja (verba) atau kata sifat (adjektiva). <br> <strong>Kesalahan umum:</strong> Penggunaan kata 'yang' di depan predikat, mengubahnya menjadi perluasan subjek.</p>
             <div class="mt-2 text-xs space-y-1">
              <p><span class="text-red-600 font-semibold">❌ Salah:</span> Sekolah kami yang terletak di depan balai kota.</p>
              <p><span class="text-green-600 font-semibold">✅ Benar:</span> Sekolah kami (S) terletak (P) di depan balai kota (K).</p>
            </div>
          </div>

          <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-md">
            <h4 class="font-bold text-yellow-800 dark:text-yellow-300">3. Objek (O) & Pelengkap (Pel)</h4>
            <p class="text-sm mt-1"><strong>Objek:</strong> Hal yang dikenai tindakan oleh subjek. Kehadirannya bergantung pada predikat transitif (membutuhkan objek). Dapat dijadikan subjek dalam kalimat pasif. <br> <strong>Pelengkap:</strong> Melengkapi predikat. Tidak dapat dijadikan subjek dalam kalimat pasif.</p>
             <div class="mt-2 text-xs space-y-1">
              <p><span class="font-semibold">Objek:</span> Ibu (S) memasak (P) <span class="underline">nasi goreng</span> (O).  → <span class="underline">Nasi goreng</span> (S) dimasak (P) oleh Ibu (K).</p>
              <p><span class="font-semibold">Pelengkap:</span> Anak itu (S) bermain (P) <span class="underline">bola</span> (Pel). → <span class="text-red-500">*Bola dimain oleh anak itu (tidak gramatikal)*</span></p>
            </div>
          </div>

           <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-md">
            <h4 class="font-bold text-purple-800 dark:text-purple-300">4. Keterangan (K)</h4>
            <p class="text-sm mt-1">Unsur yang memberikan informasi tambahan tentang waktu, tempat, cara, sebab, dll. Posisinya fleksibel, bisa di awal, tengah, atau akhir kalimat.</p>
             <div class="mt-2 text-xs">
               <p><span class="font-semibold">Contoh:</span> <span class="underline">Kemarin sore</span> (K. Waktu), Ayah (S) membaca (P) koran (O) <span class="underline">di teras</span> (K. Tempat).</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL                                                       -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card :class="{'opacity-50 pointer-events-none': showResult}">
        <CardHeader>
          <CardTitle>Latihan Pemahaman Struktur</CardTitle>
          <CardDescription>
            Analisis teks dan kalimat berikut, lalu pilih jawaban yang paling tepat.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id">
            <p class="mb-2 text-sm font-semibold">Soal {{ index + 1 }}</p>
            <div v-if="question.passage" class="mb-4 p-3 text-sm bg-muted/50 rounded-md border text-slate-600 dark:text-slate-400">
              {{ question.passage }}
            </div>
            <p class="mb-4 font-medium text-slate-800 dark:text-slate-200" v-html="question.questionText"></p>
            
            <RadioGroup v-model="question.userAnswer" class="space-y-2">
              <div v-for="option in question.options" :key="option.value" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${question.id}-o${option.value}`" :value="option.value" />
                <Label :for="`q${question.id}-o${option.value}`" class="leading-snug">{{ option.label }}. {{ option.text }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button @click="handleSubmit" :disabled="!allQuestionsAnswered">
             Kirim Jawaban
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT HASIL & PEMBAHASAN                                                 -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan</CardTitle>
            <CardDescription>Berikut adalah analisis dari jawaban Anda.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-center gap-6 p-6 bg-muted/50 rounded-lg">
              <div class="text-center">
                <p class="text-sm text-muted-foreground">Skor Anda</p>
                <p class="text-4xl font-bold">{{ score }}<span class="text-xl text-muted-foreground">/{{ questions.length }}</span></p>
              </div>
              <div class="w-full">
                <div class="flex justify-between mb-1">
                   <span class="text-base font-medium text-blue-700 dark:text-white">Tingkat Penguasaan</span>
                   <span class="text-sm font-medium text-blue-700 dark:text-white">{{ scorePercentage }}%</span>
                </div>
                <Progress :model-value="scorePercentage" />
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Pembahasan Detail</h3>
              <div class="space-y-6">
                <div v-for="(question, index) in questions" :key="`res-${question.id}`">
                  <Alert :variant="question.userAnswer === question.correctAnswer ? 'default' : 'destructive'" class="border-2">
                     <component :is="question.userAnswer === question.correctAnswer ? CheckCircle : XCircle" class="h-5 w-5" />
                    <AlertTitle class="font-bold">Soal {{ index + 1 }}: {{ question.userAnswer === question.correctAnswer ? 'Jawaban Benar' : 'Jawaban Kurang Tepat' }}</AlertTitle>
                    <AlertDescription class="mt-2 space-y-4">
                      <p class="italic text-sm text-slate-600 dark:text-slate-400">"{{ question.questionText }}"</p>
                      <div class="text-sm">
                        <p>Jawaban Anda: <span class="font-bold">{{ question.userAnswer }}. {{ questions[index].options.find(o => o.value === question.userAnswer)?.text }}</span></p>
                        <p>Jawaban Benar: <span class="font-bold text-green-600 dark:text-green-400">{{ question.correctAnswer }}. {{ questions[index].options.find(o => o.value === question.correctAnswer)?.text }}</span></p>
                      </div>
                      <div class="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                        <h5 class="font-semibold text-slate-800 dark:text-slate-200">Penjelasan:</h5>
                        <p class="mt-1 text-sm whitespace-pre-line leading-relaxed">{{ question.explanation }}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-center">
             <Button @click="resetQuiz" variant="outline">
               <RefreshCw class="mr-2 h-4 w-4"/> Coba Lagi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Styling tambahan jika diperlukan */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>