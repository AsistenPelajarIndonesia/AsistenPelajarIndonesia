<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle, XCircle, RefreshCw, BarChart2 } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import CPNSLayout from '@/layouts/CPNSLayout.vue';

// --- Tipe Data untuk Soal Latihan ---
interface QuestionOption {
  text: string
}

interface Question {
  id: number
  question: string
  passage?: string // Teks bacaan opsional
  options: QuestionOption[]
  correctAnswerIndex: number
  explanation: string
}

// --- Router ---
const router = useRouter()

const handleBack = () => {
  // Arahkan ke halaman utama persiapan CPNS atau halaman sebelumnya
  router.back()
}

const handleNext = () => {
  // Arahkan ke unit selanjutnya, misalnya "Pilar Negara"
  // Untuk contoh ini, kita hanya akan log ke konsol
  console.log("Navigasi ke unit selanjutnya...")
  alert("Anda akan diarahkan ke unit selanjutnya (fungsi demo).")
}

// =======================================================================
// KONTEN SOAL LATIHAN: TES WAWASAN KEBANGSAAN - BAHASA INDONESIA
// =======================================================================
const questions = ref<Question[]>([
  {
    id: 1,
    question: "Manakah penulisan judul karangan yang benar sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)?",
    options: [
      { text: "Dampak Teknologi Terhadap Gaya Hidup Remaja di Era Digital" },
      { text: "Dampak teknologi terhadap Gaya Hidup Remaja di Era Digital" },
      { text: "Dampak Teknologi terhadap Gaya Hidup Remaja di Era Digital" },
      { text: "Dampak Teknologi Terhadap Gaya Hidup Remaja Di Era Digital" },
      { text: "Dampak Teknologi Terhadap Gaya Hidup Remaja di era digital" },
    ],
    correctAnswerIndex: 0,
    explanation: "Menurut PUEBI, dalam penulisan judul, setiap kata diawali dengan huruf kapital, kecuali kata tugas (konjungsi, preposisi) seperti 'di', 'ke', 'dari', 'terhadap', 'yang', 'dan', 'dalam' yang tidak terletak di awal judul. Pilihan A adalah yang paling tepat karena 'Terhadap', 'Gaya', 'Hidup', 'Remaja', 'Era', dan 'Digital' diawali huruf kapital, sedangkan kata tugas 'di' ditulis dengan huruf kecil karena berada di tengah judul.",
  },
  {
    id: 2,
    question: "Kalimat manakah di bawah ini yang merupakan kalimat efektif?",
    options: [
      { text: "Bagi para peserta ujian diharapkan membawa kartu identitas." },
      { text: "Rumah di mana ia tinggal sekarang telah dijual oleh pemiliknya." },
      { text: "Rapat itu membahas tentang rencana pengembangan sumber daya manusia." },
      { text: "Gubernur meresmikan gedung baru yang sangat megah sekali itu." },
      { text: "Untuk meningkatkan kedisiplinan, mahasiswa wajib mematuhi peraturan kampus." },
    ],
    correctAnswerIndex: 4,
    explanation: "Kalimat efektif adalah kalimat yang ringkas, jelas, dan tidak ambigu. \n- A tidak efektif karena pemborosan kata ('Bagi' dan 'para'). Seharusnya: 'Para peserta ujian diharapkan membawa kartu identitas.' \n- B tidak efektif karena pengaruh bahasa asing ('di mana'). Seharusnya: 'Rumah tempat ia tinggal...' \n- C tidak efektif karena pleonasme ('membahas tentang'). Seharusnya: 'Rapat itu membahas rencana...' \n- D tidak efektif karena pleonasme ('sangat megah sekali'). Seharusnya: '...yang sangat megah' atau '...yang megah sekali'. \n- E adalah kalimat yang paling efektif karena strukturnya jelas, tidak ada pemborosan kata, dan maknanya lugas.",
  },
  {
    id: 3,
    passage: "Krisis iklim merupakan salah satu tantangan terbesar yang dihadapi umat manusia pada abad ke-21. Fenomena ini ditandai dengan peningkatan suhu rata-rata global, perubahan pola curah hujan, dan naiknya permukaan air laut. Dampaknya terasa di berbagai sektor, mulai dari pertanian, kesehatan, hingga stabilitas ekonomi. Upaya mitigasi dan adaptasi perlu dilakukan secara masif dan terstruktur oleh semua negara. Tanpa tindakan kolektif yang serius, masa depan peradaban manusia berada dalam ancaman.",
    question: "Apa ide pokok paragraf di atas?",
    options: [
      { text: "Dampak krisis iklim di sektor pertanian dan kesehatan." },
      { text: "Peningkatan suhu rata-rata global sebagai tanda krisis iklim." },
      { text: "Krisis iklim sebagai tantangan global yang memerlukan tindakan kolektif." },
      { text: "Ancaman terhadap masa depan peradaban manusia." },
      { text: "Pentingnya upaya mitigasi dan adaptasi." },
    ],
    correctAnswerIndex: 2,
    explanation: "Ide pokok adalah gagasan utama yang dibahas dalam suatu paragraf. Kalimat pertama paragraf ini ('Krisis iklim merupakan salah satu tantangan terbesar...') adalah kalimat utama yang mengandung ide pokok. Kalimat-kalimat selanjutnya adalah kalimat penjelas yang merinci tanda-tanda, dampak, dan solusi terkait krisis iklim. Oleh karena itu, ide pokok yang paling tepat adalah krisis iklim sebagai tantangan global yang membutuhkan tindakan bersama.",
  },
  {
    id: 4,
    question: "Penggunaan tanda koma (,) yang tidak tepat terdapat pada kalimat...",
    options: [
      { text: "Ayah membeli buku, pensil, dan penghapus di toko itu." },
      { text: "Dia sangat pandai bergaul, tetapi pendiam saat di rumah." },
      { text: "Oleh karena itu, kita harus bekerja lebih keras lagi." },
      { text: "Surat ini ditujukan kepada Yth. Bapak Manajer Personalia, PT. Jaya Abadi." },
      { text: "Jika hari tidak hujan, saya akan datang ke rumahmu." },
    ],
    correctAnswerIndex: 3,
    explanation: "Tanda koma tidak digunakan setelah sapaan 'Bapak/Ibu' yang diikuti oleh jabatan dan nama instansi dalam alamat surat. Penulisan yang benar adalah 'Yth. Manajer Personalia PT. Jaya Abadi' tanpa koma setelah 'Personalia'. Pilihan A, B, C, dan E menunjukkan penggunaan tanda koma yang sudah tepat: A (perincian), B (sebelum konjungsi pertentangan), C (setelah konjungsi antarkalimat), dan E (memisahkan anak kalimat dari induk kalimat).",
  },
  {
    id: 5,
    question: "Kata 'mitigasi' dalam konteks bencana alam memiliki makna...",
    options: [
      { text: "Tindakan evakuasi penduduk dari daerah rawan." },
      { text: "Upaya untuk mengurangi dampak atau risiko bencana." },
      { text: "Pemberian bantuan logistik setelah bencana terjadi." },
      { text: "Proses pemulihan kembali kondisi sosial dan ekonomi." },
      { text: "Peringatan dini yang dikeluarkan oleh otoritas." },
    ],
    correctAnswerIndex: 1,
    explanation: "Menurut Kamus Besar Bahasa Indonesia (KBBI), 'mitigasi' adalah tindakan atau serangkaian upaya untuk mengurangi risiko bencana, baik melalui pembangunan fisik maupun penyadaran dan peningkatan kemampuan menghadapi ancaman bencana. Jadi, makna yang paling tepat adalah upaya untuk mengurangi dampak atau risiko.",
  },
  {
    id: 6,
    question: "Penulisan gabungan kata yang benar terdapat pada kalimat...",
    options: [
      { text: "Program tangungjawab sosial perusahaan itu diapresiasi oleh masyarakat." },
      { text: "Setiap warga negara memiliki hak dan kewajiban yang sama." },
      { text: "Presiden menandatangani nota kesepahaman antar negara." },
      { text: "Atlet itu berhasil memecahkan rekor pada ajang olah raga tingkat nasional." },
      { text: "Kerja sama yang baik adalah kunci keberhasilan tim." },
    ],
    correctAnswerIndex: 4,
    explanation: "Gabungan kata yang penulisannya harus dipisah adalah 'tanggung jawab' dan 'olah raga'. Gabungan kata yang ditulis serangkai adalah 'warganegara' (jika merujuk pada keanggotaan negara) dan 'antarnegara'. 'Menandatangani' adalah kata dasar 'tanda tangan' yang mendapat awalan 'me-' dan akhiran '-i', sehingga harus ditulis serangkai. 'Kerja sama' adalah gabungan kata yang lazim ditulis terpisah. Dengan demikian, kalimat E adalah yang paling tepat.",
  },
   {
    id: 7,
    passage: "Pemerintah telah menetapkan kebijakan baru di sektor energi terbarukan. Kebijakan ini bertujuan untuk mengakselerasi transisi dari energi fosil ke sumber energi yang lebih ramah lingkungan. Salah satu insentif yang diberikan adalah kemudahan perizinan bagi investor yang ingin membangun pembangkit listrik tenaga surya dan angin. Diharapkan, pada tahun 2030, porsi energi terbarukan dalam bauran energi nasional dapat mencapai 23 persen. Langkah ini dianggap krusial untuk menekan laju emisi gas rumah kaca.",
    question: "Simpulan yang paling tepat berdasarkan paragraf di atas adalah...",
    options: [
      { text: "Investor akan banyak berinvestasi pada pembangkit listrik tenaga surya." },
      { text: "Pemerintah hanya fokus pada energi surya dan angin." },
      { text: "Kebijakan baru pemerintah bertujuan mempercepat penggunaan energi terbarukan untuk mengurangi emisi." },
      { text: "Target bauran energi nasional sebesar 23 persen sulit dicapai pada tahun 2030." },
      { text: "Emisi gas rumah kaca hanya dapat ditekan melalui kebijakan energi." },
    ],
    correctAnswerIndex: 2,
    explanation: "Simpulan adalah pernyataan yang merangkum keseluruhan isi bacaan. Paragraf tersebut membahas kebijakan baru pemerintah (poin utama), tujuannya untuk mempercepat transisi energi (akselerasi), dan alasan utamanya untuk menekan emisi. Pilihan C secara akurat merangkum ketiga elemen kunci ini. Pilihan lain terlalu spesifik (A, B), bersifat spekulatif (D), atau membuat klaim yang tidak didukung oleh teks (E).",
  },
  {
    id: 8,
    question: "Penulisan bilangan yang tepat sesuai PUEBI terdapat pada kalimat...",
    options: [
      { text: "Acara itu dihadiri oleh 1.250 orang tamu undangan." },
      { text: "Harga buku itu adalah Rp50.000,00." },
      { text: "Dia tinggal di Jalan Melati III, nomor 15." },
      { text: "Pada abad ke 21, teknologi berkembang sangat pesat." },
      { text: "Sebanyak dua puluh lima orang dinyatakan lulus seleksi." },
    ],
    correctAnswerIndex: 1,
    explanation: "Menurut PUEBI: \n- A salah: Bilangan dalam teks yang dapat dinyatakan dengan satu atau dua kata ditulis dengan huruf, kecuali jika dipakai secara perincian. Seharusnya 'seribu dua ratus lima puluh'. Namun, jika untuk perincian, angka boleh digunakan. \n- B benar: Penulisan nilai mata uang yang benar adalah 'Rp' tanpa spasi dan titik, diikuti angka, dan diakhiri dengan ',00'. \n- C salah: Angka Romawi untuk tingkatan tidak diikuti tanda titik. Seharusnya 'Jalan Melati III'. \n- D salah: Penulisan 'abad ke-21' harus menggunakan tanda hubung. \n- E salah: Bilangan yang ditulis dengan huruf harus ditulis serangkai jika merupakan satu kesatuan, 'dua puluh lima' benar, tetapi pilihan B adalah yang paling menunjukkan kaidah spesifik PUEBI yang sering diujikan.",
  },
])

// --- State Reaktif untuk Kuis ---
const currentQuestionIndex = ref(0)
const userAnswers = ref<Record<number, number | null>>({})
const selectedOption = ref<number | null>(null)
const showResult = ref(false)
const score = ref(0)
const quizProgress = ref(0)

// Inisialisasi jawaban pengguna
const initializeUserAnswers = () => {
  const initialAnswers: Record<number, number | null> = {}
  questions.value.forEach(q => {
    initialAnswers[q.id] = null
  })
  userAnswers.value = initialAnswers
}

onMounted(() => {
  initializeUserAnswers()
})

// --- Properti Terkomputasi (Computed Properties) ---
const currentQuestion = computed<Question>(() => {
  return questions.value[currentQuestionIndex.value]
})

const isLastQuestion = computed<boolean>(() => {
  return currentQuestionIndex.value === questions.value.length - 1
})

// --- Fungsi-fungsi Logika Kuis ---
const selectOption = (optionIndex: number) => {
  selectedOption.value = optionIndex
}

const nextQuestion = () => {
  if (selectedOption.value !== null) {
    userAnswers.value[currentQuestion.value.id] = selectedOption.value
    
    if (!isLastQuestion.value) {
      currentQuestionIndex.value++
      selectedOption.value = null
      quizProgress.value = (currentQuestionIndex.value / questions.value.length) * 100
    }
  } else {
    alert("Silakan pilih salah satu jawaban terlebih dahulu.")
  }
}

const submitQuiz = () => {
  if (selectedOption.value !== null) {
    userAnswers.value[currentQuestion.value.id] = selectedOption.value
    
    // Hitung Skor
    let correctAnswers = 0
    questions.value.forEach(q => {
      if (userAnswers.value[q.id] === q.correctAnswerIndex) {
        correctAnswers++
      }
    })
    score.value = (correctAnswers / questions.value.length) * 100
    quizProgress.value = 100
    showResult.value = true
  } else {
    alert("Silakan pilih jawaban untuk pertanyaan terakhir.")
  }
}

const resetQuiz = () => {
  currentQuestionIndex.value = 0
  initializeUserAnswers()
  selectedOption.value = null
  showResult.value = false
  score.value = 0
  quizProgress.value = 0
}

const getResultClass = (question: Question, optionIndex: number): string => {
  const userAnswer = userAnswers.value[question.id]
  const isCorrect = question.correctAnswerIndex === optionIndex
  const isSelected = userAnswer === optionIndex

  if (isCorrect) {
    return 'border-green-500 bg-green-100 dark:bg-green-900/50'
  }
  if (isSelected && !isCorrect) {
    return 'border-red-500 bg-red-100 dark:bg-red-900/50'
  }
  return 'border-border'
}
</script>

<template>
  <CPNSLayout
    test-title="Seleksi Kemampuan Dasar (SKD)"
    test-description="Persiapan Ujian CPNS - Tes Wawasan Kebangsaan (TWK)"
    unit-title="Unit 1: Bahasa Indonesia"
    unit-description="Materi dan latihan soal mencakup Ejaan (PUEBI), Kalimat Efektif, Ide Pokok, dan Penarikan Kesimpulan."
    :categories="['TWK', 'Bahasa Indonesia', 'PUEBI', 'Logika Verbal']"
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
          <CardTitle>Materi Kunci Bahasa Indonesia</CardTitle>
          <CardDescription>Pahami konsep-konsep dasar yang sering keluar dalam soal TWK CPNS.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold">1. Ejaan Yang Disempurnakan (PUEBI)</h4>
            <ul class="mt-1 list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              <li><strong>Huruf Kapital:</strong> Awal kalimat, nama orang, gelar, geografi, nama lembaga, dan judul (kecuali kata tugas di tengah).</li>
              <li><strong>Tanda Baca:</strong> Perhatikan penggunaan koma (,), titik (.), titik koma (;), dan tanda hubung (-). Koma sering diujikan pada perincian, pemisahan anak/induk kalimat, dan sebelum kata hubung pertentangan (tetapi, melainkan).</li>
              <li><strong>Kata Baku & Tidak Baku:</strong> Hafalkan kata-kata yang sering salah tulis (misal: apotek bukan apotik, analisis bukan analisa, praktik bukan praktek).</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">2. Kalimat Efektif</h4>
            <p class="mt-1 text-muted-foreground">
              Ciri kalimat efektif adalah <strong>logis, hemat kata (tidak pleonastis), tidak ambigu, dan memiliki struktur yang sejajar (paralelisme).</strong> Hindari pengulangan subjek, penggunaan kata depan yang tidak perlu, dan pengaruh bahasa asing yang berlebihan.
            </p>
          </div>
          <div>
            <h4 class="font-semibold">3. Paragraf</h4>
            <ul class="mt-1 list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              <li><strong>Ide Pokok/Gagasan Utama:</strong> Inti dari pembahasan dalam paragraf. Biasanya terdapat di awal (deduktif) atau di akhir (induktif) paragraf.</li>
              <li><strong>Simpulan:</strong> Pernyataan yang mencakup keseluruhan isi informasi dari teks atau paragraf yang diberikan. Simpulan harus berdasarkan fakta pada teks, bukan opini pribadi.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL INTERAKTIF                                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-if="!showResult">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Latihan Soal</CardTitle>
            <span class="text-sm font-medium text-muted-foreground">
              Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
            </span>
          </div>
          <CardDescription>Pilih jawaban yang menurut Anda paling tepat.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-2">
            <Progress :model-value="quizProgress" class="h-2" />
            <p v-if="currentQuestion.passage" class="mt-4 text-sm text-muted-foreground border-l-4 pl-4 italic">
              {{ currentQuestion.passage }}
            </p>
            <p class="pt-4 font-medium leading-relaxed">{{ currentQuestion.question }}</p>
          </div>
          <div class="space-y-3">
            <Button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              variant="outline"
              class="w-full justify-start h-auto py-3 text-left"
              :class="{ 'border-primary bg-muted': selectedOption === index }"
              @click="selectOption(index)"
            >
              <span class="mr-3 font-bold">{{ String.fromCharCode(65 + index) }}.</span>
              <span class="flex-1 whitespace-normal">{{ option.text }}</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isLastQuestion" class="w-full" @click="nextQuestion">
            Soal Berikutnya
          </Button>
          <Button v-else class="w-full bg-blue-600 hover:bg-blue-700" @click="submitQuiz">
            Selesai & Lihat Hasil
          </Button>
        </CardFooter>
      </Card>
       <Card v-else>
        <CardHeader>
          <CardTitle>Latihan Selesai!</CardTitle>
          <CardDescription>Anda telah menyelesaikan latihan. Silakan lihat hasil Anda di bawah dan pelajari pembahasannya.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col items-center justify-center text-center p-8">
            <BarChart2 class="w-16 h-16 text-primary mb-4"/>
            <p class="text-lg font-medium">Lihat Hasil Detail di Bawah</p>
            <p class="text-muted-foreground">Teruslah berlatih untuk hasil yang maksimal!</p>
        </CardContent>
       </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT HASIL & PEMBAHASAN                                                 -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Hasil Akhir & Pembahasan</CardTitle>
          <CardDescription>Evaluasi jawaban Anda untuk memahami letak kesalahan dan memperkuat pemahaman materi.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Ringkasan Skor -->
          <Alert class="border-2" :class="score >= 75 ? 'border-green-500' : 'border-amber-500'">
            <AlertTitle class="text-lg font-bold">Ringkasan Hasil</AlertTitle>
            <AlertDescription class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <div class="text-base">
                Skor Anda: <span class="text-2xl font-bold" :class="score >= 75 ? 'text-green-600' : 'text-amber-600'">{{ score.toFixed(0) }}</span> / 100
              </div>
              <p class="text-muted-foreground">
                Terjawab Benar: {{ (score / 100 * questions.length).toFixed(0) }} dari {{ questions.length }} soal.
              </p>
              <Button @click="resetQuiz">
                <RefreshCw class="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>

          <!-- Pembahasan Detail per Soal -->
          <div class="space-y-6">
            <div v-for="(q, index) in questions" :key="q.id">
              <h4 class="font-semibold">{{ index + 1 }}. {{ q.question }}</h4>
              <p v-if="q.passage" class="mt-2 text-sm text-muted-foreground border-l-4 pl-4 italic">
                {{ q.passage }}
              </p>
              <div class="mt-4 space-y-2">
                <div 
                  v-for="(opt, optIndex) in q.options" 
                  :key="optIndex" 
                  class="p-3 border rounded-md text-sm transition-all"
                  :class="getResultClass(q, optIndex)"
                >
                  <span class="font-bold">{{ String.fromCharCode(65 + optIndex) }}.</span> {{ opt.text }}
                  <span v-if="userAnswers[q.id] === optIndex" class="ml-2 font-semibold text-xs italic">
                    (Jawaban Anda)
                  </span>
                </div>
              </div>
              <Alert class="mt-4" :variant="userAnswers[q.id] === q.correctAnswerIndex ? 'default' : 'destructive'">
                <component 
                  :is="userAnswers[q.id] === q.correctAnswerIndex ? CheckCircle : XCircle" 
                  class="h-4 w-4"
                />
                <AlertTitle>
                  {{ userAnswers[q.id] === q.correctAnswerIndex ? 'Benar!' : 'Kurang Tepat' }}
                </AlertTitle>
                <AlertDescription class="mt-2 space-y-2">
                  <p>Jawaban yang benar adalah: <strong>{{ String.fromCharCode(65 + q.correctAnswerIndex) }}. {{ q.options[q.correctAnswerIndex].text }}</strong></p>
                  <div>
                    <h5 class="font-semibold">Pembahasan:</h5>
                    <p class="text-sm leading-relaxed">{{ q.explanation }}</p>
                  </div>
                </AlertDescription>
              </Alert>
              <hr v-if="index < questions.length - 1" class="my-6">
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<style scoped>
/* Scoped styles can be added here if needed */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>