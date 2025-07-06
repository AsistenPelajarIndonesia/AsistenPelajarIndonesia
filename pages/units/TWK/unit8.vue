<template>
  <!-- 
    Halaman ini menggunakan layout kustom 'CPNSLayout'.
    Properti seperti judul, deskripsi, dan kategori diteruskan ke layout
    untuk menjaga konsistensi tampilan di seluruh modul latihan.
    Variabel 'quizFinished' digunakan untuk mengontrol visibilitas slot 'result' pada layout.
  -->
  <CPNSLayout
    :test-title="pageInfo.testTitle"
    :test-description="pageInfo.testDescription"
    :unit-title="pageInfo.unitTitle"
    :unit-description="pageInfo.unitDescription"
    :categories="pageInfo.categories"
    :show-result="quizFinished"
    @back="handleBackNavigation"
    @next="handleNextNavigation"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material : Materi Pembelajaran                                  -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Materi: Sistem Tata Negara Indonesia</CardTitle>
          <CardDescription>
            Pahami pilar-pilar utama yang menyusun pemerintahan Indonesia berdasarkan UUD 1945.
          </CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h4>Pendahuluan: Konsep Trias Politica di Indonesia</h4>
          <p>
            Sistem tata negara Indonesia menganut konsep pembagian kekuasaan (distribution of power) yang terinspirasi dari teori Trias Politica Montesquieu. Namun, Indonesia tidak menerapkan pemisahan kekuasaan murni, melainkan pembagian kekuasaan dengan mekanisme <em>checks and balances</em>. Artinya, setiap lembaga negara memiliki wewenang masing-masing namun juga saling mengawasi dan mengimbangi.
          </p>
          <p>
            Kekuasaan negara dibagi menjadi tiga cabang utama (legislatif, eksekutif, yudikatif) dan dilengkapi dengan lembaga negara independen lainnya.
          </p>

          <hr class="my-4">

          <h4>1. Lembaga Legislatif: Pembuat Undang-Undang</h4>
          <p>Bertugas untuk membentuk undang-undang dan mengawasi jalannya pemerintahan.</p>
          <ul>
            <li><strong>Majelis Permusyawaratan Rakyat (MPR):</strong> Terdiri dari anggota Dewan Perwakilan Rakyat (DPR) dan Dewan Perwakilan Daerah (DPD). Wewenang utamanya adalah mengubah dan menetapkan UUD, melantik Presiden dan/atau Wakil Presiden, serta memberhentikan Presiden dan/atau Wakil Presiden dalam masa jabatannya menurut UUD.</li>
            <li><strong>Dewan Perwakilan Rakyat (DPR):</strong> Memegang kekuasaan membentuk Undang-Undang (bersama Presiden). Memiliki fungsi legislasi, anggaran, dan pengawasan.</li>
            <li><strong>Dewan Perwakilan Daerah (DPD):</strong> Mengajukan usul rancangan undang-undang yang berkaitan dengan otonomi daerah, hubungan pusat dan daerah, serta mengawasi pelaksanaannya.</li>
          </ul>

          <hr class="my-4">

          <h4>2. Lembaga Eksekutif: Pelaksana Undang-Undang</h4>
          <p>Bertugas menjalankan pemerintahan dan melaksanakan undang-undang.</p>
          <ul>
            <li><strong>Presiden dan Wakil Presiden:</strong> Memegang kekuasaan pemerintahan menurut UUD. Presiden adalah kepala negara sekaligus kepala pemerintahan. Berhak mengajukan RUU kepada DPR, menetapkan Peraturan Pemerintah, memegang kekuasaan tertinggi atas Angkatan Darat, Laut, dan Udara.</li>
          </ul>
          
          <hr class="my-4">

          <h4>3. Lembaga Yudikatif: Penegak Hukum dan Keadilan</h4>
          <p>Menyelenggarakan peradilan guna menegakkan hukum dan keadilan.</p>
          <ul>
            <li><strong>Mahkamah Agung (MA):</strong> Memegang kekuasaan kehakiman tertinggi. Berwenang mengadili pada tingkat kasasi, menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang.</li>
            <li><strong>Mahkamah Konstitusi (MK):</strong> Berwenang mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final untuk menguji undang-undang terhadap UUD, memutus sengketa kewenangan lembaga negara, memutus pembubaran partai politik, dan memutus perselisihan tentang hasil pemilihan umum.</li>
            <li><strong>Komisi Yudisial (KY):</strong> Lembaga mandiri yang berwenang mengusulkan pengangkatan hakim agung dan mempunyai wewenang lain dalam rangka menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim.</li>
          </ul>
          
          <hr class="my-4">

          <h4>4. Lembaga Eksaminatif/Inspektif</h4>
          <p>Berkaitan dengan pemeriksaan pengelolaan dan tanggung jawab keuangan negara.</p>
          <ul>
            <li><strong>Badan Pemeriksa Keuangan (BPK):</strong> Lembaga yang bebas dan mandiri untuk memeriksa pengelolaan dan tanggung jawab keuangan negara. Hasil pemeriksaan BPK diserahkan kepada DPR, DPD, dan DPRD sesuai dengan kewenangannya.</li>
          </ul>
          
          <hr class="my-4">
          
          <h4>Hierarki Peraturan Perundang-undangan</h4>
          <p>Sesuai UU No. 12 Tahun 2011, urutan peraturan perundang-undangan di Indonesia adalah sebagai berikut:</p>
          <ol>
            <li>Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 (UUD 1945)</li>
            <li>Ketetapan Majelis Permusyawaratan Rakyat (TAP MPR)</li>
            <li>Undang-Undang (UU) / Peraturan Pemerintah Pengganti Undang-Undang (Perppu)</li>
            <li>Peraturan Pemerintah (PP)</li>
            <li>Peraturan Presiden (Perpres)</li>
            <li>Peraturan Daerah (Perda) Provinsi</li>
            <li>Peraturan Daerah (Perda) Kabupaten/Kota</li>
          </ol>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT #practice : Latihan Soal Interaktif                                -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Latihan Soal: Sistem Tata Negara</CardTitle>
          <CardDescription>
            Uji pemahaman Anda dengan menjawab pertanyaan-pertanyaan berikut.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="!quizFinished">
            <!-- Progress Bar -->
            <div class="mb-4">
              <p class="text-sm text-muted-foreground mb-1">
                Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
              </p>
              <Progress :model-value="progressPercentage" class="w-full h-2" />
            </div>

            <!-- Question Card -->
            <Card v-if="currentQuestion" :key="currentQuestion.id" class="border-l-4 border-primary">
              <CardHeader>
                <CardTitle class="text-base font-semibold leading-relaxed">
                  {{ currentQuestion.question }}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup v-model="userAnswers[currentQuestion.id]" class="grid gap-3">
                  <div v-for="(option, index) in currentQuestion.options" :key="index" class="flex items-center space-x-3">
                    <RadioGroupItem :id="`${currentQuestion.id}-${index}`" :value="option.value" />
                    <Label :for="`${currentQuestion.id}-${index}`" class="font-normal cursor-pointer">
                      {{ option.text }}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <!-- Navigation Buttons -->
            <div class="mt-6 flex justify-between items-center">
              <Button variant="outline" :disabled="currentQuestionIndex === 0" @click="previousQuestion">
                <ArrowLeft class="h-4 w-4 mr-2" />
                Sebelumnya
              </Button>
              <Button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">
                Berikutnya
                <ArrowRight class="h-4 w-4 ml-2" />
              </Button>
              <Button v-else variant="default" class="bg-green-600 hover:bg-green-700" @click="submitQuiz">
                Kumpulkan Jawaban
              </Button>
            </div>
          </div>

          <!-- Placeholder when quiz is finished -->
          <div v-else class="flex flex-col items-center justify-center text-center h-64">
            <h3 class="text-xl font-semibold">Latihan Selesai!</h3>
            <p class="text-muted-foreground mt-2">
              Hasil dan pembahasan lengkap ditampilkan di bawah.
            </p>
            <Button class="mt-4" @click="resetQuiz">
              Ulangi Latihan
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT #result : Hasil dan Pembahasan                                     -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Hasil dan Pembahasan</CardTitle>
          <CardDescription>
            Skor Anda adalah <strong>{{ score }}%</strong>. Pelajari pembahasan untuk meningkatkan pemahaman Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem v-for="(result, index) in detailedResults" :key="result.id" :value="`item-${index}`">
              <AccordionTrigger 
                :class="[
                  'text-left',
                  result.isCorrect ? 'text-green-600' : 'text-red-600'
                ]"
              >
                <div class="flex items-center gap-3">
                  <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-5 w-5 flex-shrink-0" />
                  <span>Soal {{ index + 1 }}: {{ result.isCorrect ? 'Benar' : 'Salah' }}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent class="pt-4">
                <p class="font-semibold mb-3">{{ result.question }}</p>
                <div class="space-y-2 text-sm">
                  <p>Jawaban Anda: <span :class="[result.isCorrect ? 'text-green-700' : 'text-red-700', 'font-bold']">{{ result.userAnswerText || 'Tidak dijawab' }}</span></p>
                  <p>Jawaban Benar: <span class="text-green-700 font-bold">{{ result.correctAnswerText }}</span></p>
                  <div class="mt-4 p-4 bg-muted/50 rounded-lg border">
                    <h4 class="font-bold mb-2">Pembahasan:</h4>
                    <p class="text-muted-foreground leading-relaxed">{{ result.explanation }}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-vue-next'

// Menggunakan komponen UI dari shadcn-vue atau library komponen serupa
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CPNSLayout from '@/layouts/CPNSLayout.vue';


// --- Data Halaman dan Kategori ---
// Informasi ini akan diteruskan sebagai props ke komponen layout.
const pageInfo = {
  testTitle: 'Tes Wawasan Kebangsaan (TWK)',
  testDescription: 'Persiapan Seleksi Kompetensi Dasar (SKD) CPNS',
  unitTitle: 'Unit 1: Sistem Tata Negara Indonesia',
  unitDescription: 'Materi dan latihan soal mengenai struktur, fungsi, dan hubungan antar lembaga negara, serta hierarki perundang-undangan sesuai UUD 1945.',
  categories: ['UUD 1945', 'Lembaga Negara', 'Pemerintahan', 'Hukum'],
}

// --- Tipe Data untuk Soal dan Jawaban ---
interface QuestionOption {
  value: string
  text: string
}

interface Question {
  id: number
  question: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
}

// --- Bank Soal ---
// Kumpulan soal Multiple Choice Questions (MCQ) untuk unit ini.
// Setiap soal memiliki penjelasan yang mendalam untuk membantu proses belajar.
const questions = ref<Question[]>([
  {
    id: 1,
    question: "Lembaga negara yang memiliki wewenang untuk mengubah dan menetapkan Undang-Undang Dasar adalah...",
    options: [
      { value: 'A', text: 'Dewan Perwakilan Rakyat (DPR)' },
      { value: 'B', text: 'Mahkamah Konstitusi (MK)' },
      { value: 'C', text: 'Majelis Permusyawaratan Rakyat (MPR)' },
      { value: 'D', text: 'Presiden' },
      { value: 'E', text: 'Dewan Perwakilan Daerah (DPD)' },
    ],
    correctAnswer: 'C',
    explanation: "Berdasarkan Pasal 3 Ayat (1) UUD 1945, Majelis Permusyawaratan Rakyat (MPR) berwenang mengubah dan menetapkan Undang-Undang Dasar. DPR bersama Presiden membentuk UU (bukan UUD), dan MK menguji UU terhadap UUD.",
  },
  {
    id: 2,
    question: "Menurut teori Trias Politica, kekuasaan untuk menjalankan undang-undang dan menyelenggarakan pemerintahan dipegang oleh lembaga...",
    options: [
      { value: 'A', text: 'Legislatif' },
      { value: 'B', text: 'Yudikatif' },
      { value: 'C', text: 'Eksaminatif' },
      { value: 'D', text: 'Eksekutif' },
      { value: 'E', text: 'Federatif' },
    ],
    correctAnswer: 'D',
    explanation: "Kekuasaan eksekutif adalah kekuasaan untuk melaksanakan undang-undang. Di Indonesia, kekuasaan ini dipegang oleh Presiden sebagai kepala negara dan kepala pemerintahan, sesuai dengan sistem presidensial.",
  },
  {
    id: 3,
    question: "Lembaga negara yang bertugas mengadili pada tingkat kasasi dan menguji peraturan perundang-undangan di bawah undang-undang adalah...",
    options: [
      { value: 'A', text: 'Mahkamah Konstitusi (MK)' },
      { value: 'B', text: 'Komisi Yudisial (KY)' },
      { value: 'C', text: 'Pengadilan Tinggi' },
      { value: 'D', text: 'Mahkamah Agung (MA)' },
      { value: 'E', text: 'Kejaksaan Agung' },
    ],
    correctAnswer: 'D',
    explanation: "Sesuai Pasal 24A UUD 1945, Mahkamah Agung (MA) berwenang mengadili pada tingkat kasasi, menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang, dan mempunyai wewenang lainnya yang diberikan oleh undang-undang.",
  },
  {
    id: 4,
    question: "Dalam hierarki peraturan perundang-undangan di Indonesia, tingkatan yang berada tepat di bawah Undang-Undang/Perppu adalah...",
    options: [
      { value: 'A', text: 'Peraturan Presiden (Perpres)' },
      { value: 'B', text: 'Peraturan Pemerintah (PP)' },
      { value: 'C', text: 'Ketetapan MPR (TAP MPR)' },
      { value: 'D', 'text': 'Peraturan Daerah (Perda) Provinsi' },
      { value: 'E', text: 'UUD 1945' },
    ],
    correctAnswer: 'B',
    explanation: "Berdasarkan UU No. 12 Tahun 2011, hierarki setelah UU/Perppu adalah Peraturan Pemerintah (PP). PP dibuat oleh Presiden untuk menjalankan undang-undang.",
  },
  {
    id: 5,
    question: "Presiden memberikan grasi dan rehabilitasi dengan memperhatikan pertimbangan dari...",
    options: [
      { value: 'A', text: 'Mahkamah Konstitusi' },
      { value: 'B', text: 'Dewan Perwakilan Rakyat' },
      { value: 'C', text: 'Mahkamah Agung' },
      { value: 'D', text: 'Komisi Yudisial' },
      { value: 'E', text: 'Menteri Hukum dan HAM' },
    ],
    correctAnswer: 'C',
    explanation: "Pasal 14 Ayat (1) UUD 1945 menyatakan bahwa Presiden memberi grasi dan rehabilitasi dengan memperhatikan pertimbangan Mahkamah Agung. Sedangkan untuk amnesti dan abolisi, Presiden memperhatikan pertimbangan DPR.",
  },
  {
    id: 6,
    question: "Lembaga negara independen yang berwenang mengusulkan pengangkatan hakim agung adalah...",
    options: [
      { value: 'A', text: 'Mahkamah Agung (MA)' },
      { value: 'B', text: 'Presiden' },
      { value: 'C', text: 'Komisi Yudisial (KY)' },
      { value: 'D', text: 'Dewan Perwakilan Rakyat (DPR)' },
      { value: 'E', text: 'Mahkamah Konstitusi (MK)' },
    ],
    correctAnswer: 'C',
    explanation: "Menurut Pasal 24B Ayat (1) UUD 1945, Komisi Yudisial bersifat mandiri yang berwenang mengusulkan pengangkatan hakim agung dan mempunyai wewenang lain dalam rangka menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim.",
  },
  {
    id: 7,
      question: "Siapakah yang memegang kekuasaan untuk membentuk Undang-Undang di Indonesia?",
      options: [
        { value: 'A', text: 'Presiden sepenuhnya' },
        { value: 'B', text: 'Dewan Perwakilan Rakyat (DPR) sepenuhnya' },
        { value: 'C', text: 'Dewan Perwakilan Rakyat (DPR) dengan persetujuan Presiden' },
        { value: 'D', text: 'Majelis Permusyawaratan Rakyat (MPR)' },
        { value: 'E', text: 'Mahkamah Konstitusi (MK)' },
      ],
      correctAnswer: 'C',
      explanation: "Pasal 20 Ayat (1) UUD 1945 menyatakan bahwa Dewan Perwakilan Rakyat memegang kekuasaan membentuk undang-undang. Namun, Ayat (2) menegaskan bahwa setiap rancangan undang-undang dibahas oleh DPR dan Presiden untuk mendapat persetujuan bersama. Jadi, kekuasaan membentuk UU adalah milik DPR dengan persetujuan Presiden."
  },
  {
      id: 8,
      question: "Lembaga negara yang memiliki fungsi untuk memeriksa pengelolaan dan tanggung jawab keuangan negara adalah...",
      options: [
        { value: 'A', text: 'Kementerian Keuangan' },
        { value: 'B', text: 'Bank Indonesia (BI)' },
        { value: 'C', text: 'Otoritas Jasa Keuangan (OJK)' },
        { value: 'D', text: 'Badan Pemeriksa Keuangan (BPK)' },
        { value: 'E', text: 'Komisi Pemberantasan Korupsi (KPK)' },
      ],
      correctAnswer: 'D',
      explanation: "Sesuai dengan Pasal 23E UUD 1945, untuk memeriksa pengelolaan dan tanggung jawab tentang keuangan negara diadakan satu Badan Pemeriksa Keuangan yang bebas dan mandiri. BPK merupakan lembaga eksaminatif/inspektif."
  },
]);

// --- State Management untuk Kuis ---
const currentQuestionIndex = ref(0)
const userAnswers = ref<Record<number, string>>({})
const quizFinished = ref(false)
const score = ref(0)
const detailedResults = ref<any[]>([])

// --- Computed Properties ---
// Menghitung progres pengerjaan kuis untuk ditampilkan di progress bar.
const progressPercentage = computed(() => {
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100
})

// Mendapatkan objek pertanyaan saat ini berdasarkan index.
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value]
})

// --- Methods ---
// Fungsi untuk pindah ke soal berikutnya.
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

// Fungsi untuk kembali ke soal sebelumnya.
const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// Fungsi untuk mengumpulkan jawaban, menghitung skor, dan menampilkan hasil.
const submitQuiz = () => {
  let correctCount = 0
  detailedResults.value = questions.value.map(q => {
    const userAnswer = userAnswers.value[q.id]
    const isCorrect = userAnswer === q.correctAnswer
    if (isCorrect) {
      correctCount++
    }
    const findOptionText = (options: QuestionOption[], value: string) => {
      const option = options.find(opt => opt.value === value)
      return option ? option.text : ''
    }
    
    return {
      id: q.id,
      question: q.question,
      userAnswerValue: userAnswer,
      userAnswerText: findOptionText(q.options, userAnswer),
      correctAnswerValue: q.correctAnswer,
      correctAnswerText: findOptionText(q.options, q.correctAnswer),
      isCorrect: isCorrect,
      explanation: q.explanation
    }
  })
  
  score.value = Math.round((correctCount / questions.value.length) * 100)
  quizFinished.value = true
  
  // Scroll ke bagian atas untuk melihat rangkuman hasil
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi untuk mereset kuis dan memulai dari awal.
const resetQuiz = () => {
  currentQuestionIndex.value = 0
  userAnswers.value = {}
  quizFinished.value = false
  score.value = 0
  detailedResults.value = []
  shuffleQuestions() // Acak kembali soal saat mengulang
}

// Fungsi untuk mengacak urutan soal
const shuffleQuestions = () => {
  for (let i = questions.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions.value[i], questions.value[j]] = [questions.value[j], questions.value[i]];
  }
}

// --- Lifecycle Hook ---
onMounted(() => {
  shuffleQuestions()
})

// --- Navigasi Layout ---
// Fungsi ini hanya sebagai contoh, bisa dihubungkan ke vue-router.
const handleBackNavigation = () => {
  alert('Navigasi ke unit sebelumnya.')
  // Contoh: router.push('/cpns/twk/unit-sebelumnya')
}
const handleNextNavigation = () => {
  alert('Navigasi ke unit berikutnya.')
  // Contoh: router.push('/cpns/twk/unit-berikutnya')
}
</script>

<style scoped>
/* Menambahkan gaya tambahan jika diperlukan */
.prose ul, .prose ol {
  padding-left: 1.5rem;
}

.prose h4 {
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}
</style>