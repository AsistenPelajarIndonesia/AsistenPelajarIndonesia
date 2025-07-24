<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// Komponen UI - asumsikan ini sudah ada di proyek Anda
// contoh dari shadcn-vue
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  layout: false, // Kita akan menggunakan komponen layout secara manual
})

// --- MANAJEMEN NAVIGASI ---
const route = useRoute()
const router = useRouter()

const currentUnitNumber = computed(() => {
  const match = route.path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : 0
})

function goToPreviousUnit() {
  if (currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  } else {
    // Mungkin bisa arahkan ke halaman utama LBI atau berikan notifikasi
    console.log("This is the first unit.")
    // Contoh: router.push('/lbi/dashboard')
  }
}

function goToNextUnit() {
  // Anda bisa menentukan batas maksimal unit di sini
  router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
}


// --- DATA & PROPS UNTUK LAYOUT ---
const layoutProps = {
  testTitle: 'SNBT: Literasi Bahasa Indonesia',
  testDescription: 'Subtes ini menguji kemampuan Anda untuk memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks.',
  unitTitle: `Unit ${currentUnitNumber.value}: Menyimpulkan Isi Teks (Implisit & Eksplisit)`,
  unitDescription: 'Fokus pada kemampuan menyarikan informasi kunci dari bacaan, baik yang dinyatakan secara langsung (eksplisit) maupun yang tersirat (implisit).',
  categories: ['Analisis Teks', 'Penalaran Kritis', 'Pemahaman Bacaan'],
}

// --- DATA & LOGIKA KUIS ---

// Tipe data untuk soal agar lebih terstruktur
interface Question {
  id: number
  text: string
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

const questions = ref<Question[]>([
  {
    id: 1,
    text: `Paradoks automasi modern menghadirkan dilema kompleks. Di satu sisi, penerapan robotika dan kecerdasan buatan (AI) secara masif berpotensi mendongkrak produktivitas secara eksponensial, menekan biaya produksi, dan menciptakan efisiensi yang belum pernah terjadi sebelumnya. Di sisi lain, disrupsi ini mengancam eksistensi jutaan pekerjaan, terutama yang bersifat repetitif dan manual. Sejarah revolusi industri mengajarkan bahwa teknologi pada akhirnya menciptakan lebih banyak pekerjaan baru daripada yang dihilangkannya. Namun, tantangan saat ini terletak pada kecepatan transisi dan jurang keterampilan (skills gap) yang kian melebar. Pekerjaan baru yang muncul menuntut keahlian kognitif tingkat tinggi, seperti kreativitas, pemecahan masalah kompleks, dan kecerdasan emosional—keterampilan yang sulit diajarkan secara massal dalam waktu singkat. Tanpa intervensi kebijakan yang terencana—melalui reformasi pendidikan vokasi, program reskilling berskala besar, dan jaring pengaman sosial yang adaptif—risiko pengangguran struktural dan ketimpangan sosial dapat meningkat secara drastis, mengancam stabilitas ekonomi jangka panjang.`,
    question: "Simpulan yang paling akurat untuk merangkum keseluruhan isi teks tersebut adalah...",
    options: [
      "Automasi selalu berdampak negatif bagi tenaga kerja karena pasti menyebabkan pengangguran massal.",
      "Pekerjaan di masa depan hanya akan tersedia bagi mereka yang memiliki kecerdasan emosional dan kreativitas.",
      "Kemajuan teknologi automasi, walau menjanjikan peningkatan produktivitas, memerlukan intervensi kebijakan yang proaktif untuk mengelola transisi tenaga kerja dan kesenjangan keterampilan.",
      "Fokus utama pemerintah seharusnya adalah memperlambat laju adopsi automasi untuk melindungi pekerjaan yang ada.",
      "Revolusi industri di masa lalu dan disrupsi teknologi saat ini memiliki dampak yang sama persis terhadap pasar tenaga kerja."
    ],
    correctAnswerIndex: 2,
    explanation: `Jawaban yang benar adalah **C**. Simpulan ini paling komprehensif karena mencakup semua elemen kunci dari teks: (1) **potensi positif automasi** (produktivitas), (2) **risiko negatifnya** (disrupsi tenaga kerja), dan (3) **solusi yang diusulkan** (intervensi kebijakan untuk mengatasi skills gap). <br/><br/> **Analisis Pilihan Lain:** <br/> A: Terlalu pesimistis dan menyederhanakan. Teks menyebutkan bahwa sejarah menunjukkan teknologi juga menciptakan pekerjaan baru. <br/> B: Terlalu menyempit. Teks menyebutkan keterampilan ini sebagai contoh, bukan satu-satunya kualifikasi. <br/> D: Bertentangan dengan semangat teks. Teks tidak menyarankan untuk memperlambat teknologi, melainkan beradaptasi melalu kebijakan. <br/> E: Salah. Teks secara eksplisit menyatakan tantangan saat ini berbeda karena 'kecepatan transisi dan jurang keterampilan yang kian melebar'.`
  },
  {
    id: 2,
    text: `Konsep 'disonansi kognitif', yang pertama kali dicetuskan oleh Leon Festinger, memegang peranan penting dalam psikologi perilaku konsumen. Teori ini menyatakan bahwa individu mengalami ketidaknyamanan mental (disonansi) ketika mereka memegang dua atau lebih keyakinan yang saling bertentangan, atau ketika perilaku mereka tidak sejalan dengan keyakinan mereka. Dalam konteks pemasaran, disonansi sering terjadi pasca-pembelian, terutama untuk produk yang mahal atau melibatkan komitmen tinggi. Misalnya, seorang konsumen yang percaya pada gaya hidup hemat (keyakinan) mungkin merasa cemas setelah membeli gawai keluaran terbaru yang harganya mahal (perilaku). Untuk meredakan ketegangan ini, ia mungkin secara aktif mencari ulasan positif tentang produk tersebut, meremehkan alternatif yang tidak ia pilih, atau meyakinkan diri bahwa fitur canggih produk itu 'penting' untuk produktivitasnya. Pemasar yang cerdik dapat memanfaatkan fenomena ini, baik dengan menyediakan afirmasi pasca-pembelian (seperti email ucapan selamat) untuk mengurangi disonansi, maupun dengan menciptakan disonansi secara sengaja (misalnya, menyoroti kekurangan produk pesaing) untuk mendorong peralihan merek.`,
    question: "Manakah pernyataan yang paling tepat yang dapat disiratkan (implisit) dari teks di atas mengenai perilaku konsumen?",
    options: [
      "Semua konsumen yang membeli barang mahal pasti akan mengalami disonansi kognitif yang parah.",
      "Pemasar selalu bertujuan untuk membantu konsumen merasa lebih baik setelah melakukan pembelian.",
      "Keputusan pembelian tidak murni didasarkan pada logika rasional, melainkan juga dipengaruhi oleh kebutuhan psikologis untuk menjaga konsistensi diri.",
      "Disonansi kognitif adalah fenomena negatif yang harus dihindari oleh semua konsumen dalam setiap transaksi.",
      "Satu-satunya cara mengatasi disonansi kognitif adalah dengan mencari ulasan positif produk yang telah dibeli."
    ],
    correctAnswerIndex: 2,
    explanation: `Jawaban yang benar adalah **C**. Pernyataan ini bersifat **implisit** atau tersirat. Teks tidak secara langsung mengatakan 'keputusan tidak rasional', tetapi deskripsi tentang bagaimana konsumen 'meyakinkan diri' atau 'meremehkan alternatif' setelah pembelian untuk meredakan ketidaknyamanan psikologis menunjukkan bahwa ada proses non-rasional yang bekerja untuk menjustifikasi tindakan agar selaras dengan keyakinan. Ini adalah inti dari menjaga 'konsistensi diri'. <br/><br/> **Analisis Pilihan Lain:** <br/> A: Terlalu menggeneralisasi dengan kata 'semua' dan 'pasti'. Teks hanya menyatakan disonansi 'sering terjadi'. <br/> B: Tidak akurat. Teks secara eksplisit menyebutkan bahwa pemasar bisa juga 'menciptakan disonansi secara sengaja'. <br/> D: Ini adalah sebuah penilaian (judgement), bukan simpulan dari teks. Teks hanya mendeskripsikan fenomena tersebut secara netral. <br/> E: Terlalu spesifik. Teks menyebutkan itu sebagai salah satu contoh ('misalnya'), bukan satu-satunya cara.`
  },
  {
    id: 3,
    text: `Bioakustik, sebuah disiplin ilmu interdisipliner yang menggabungkan biologi dan akustik, kini menjadi garda terdepan dalam upaya konservasi keanekaragaman hayati. Dengan menempatkan perekam audio sensitif di habitat-habitat kritis seperti hutan hujan Amazon atau terumbu karang, para ilmuwan dapat memonitor kesehatan ekosistem secara non-invasif dan berkesinambungan. Analisis spektogram—representasi visual dari suara—memungkinkan identifikasi spesies berdasarkan 'tanda tangan vokal' unik mereka, melacak pola migrasi, dan bahkan mendeteksi kehadiran spesies langka atau nokturnal yang sulit diamati secara visual. Lebih dari itu, perubahan dalam 'soundscape' atau lanskap suara ekosistem dapat menjadi indikator dini dari stres lingkungan. Misalnya, penurunan kompleksitas akustik di terumbu karang dapat menandakan adanya pemutihan karang (coral bleaching), sementara keheningan abnormal di hutan bisa mengindikasikan aktivitas penebangan liar atau perburuan. Data akustik ini memberikan lapisan informasi yang kaya, melengkapi data satelit dan survei lapangan tradisional, untuk pengambilan keputusan konservasi yang lebih cepat dan tepat sasaran.`,
    question: "Berdasarkan teks, simpulan utama yang dapat ditarik mengenai peran bioakustik dalam konservasi adalah...",
    options: [
      "Bioakustik adalah satu-satunya metode yang efektif untuk memantau kesehatan ekosistem secara global.",
      "Tujuan utama bioakustik adalah untuk merekam suara-suara indah dari alam untuk dinikmati manusia.",
      "Analisis suara hewan secara fundamental lebih unggul daripada pengamatan visual dalam semua aspek penelitian biologi.",
      "Bioakustik menawarkan metode pemantauan ekosistem yang kuat, non-invasif, dan berfungsi sebagai sistem peringatan dini terhadap degradasi lingkungan.",
      "Teknologi bioakustik hanya dapat diterapkan di ekosistem hutan hujan dan tidak relevan untuk lingkungan lain seperti gurun atau kutub."
    ],
    correctAnswerIndex: 3,
    explanation: `Jawaban yang benar adalah **D**. Simpulan ini secara akurat merangkum fungsi inti bioakustik seperti yang dijelaskan dalam teks: (1) sebagai **metode pemantauan** ('memonitor kesehatan ekosistem'), (2) sifatnya yang **non-invasif**, dan (3) perannya sebagai **sistem peringatan dini** ('indikator dini dari stres lingkungan'). <br/><br/> **Analisis Pilihan Lain:** <br/> A: Penggunaan kata 'satu-satunya' membuatnya tidak akurat. Teks justru menyatakan bahwa bioakustik 'melengkapi' metode lain. <br/> B: Ini adalah penyederhanaan yang salah. Tujuan utamanya adalah ilmiah dan konservasi, bukan estetika. <br/> C: Terlalu berlebihan. Teks tidak mengklaim superioritas absolut, melainkan menyebutnya sebagai pelengkap yang 'memberikan lapisan informasi yang kaya'. <br/> E: Secara langsung bertentangan dengan teks, yang secara eksplisit menyebutkan 'hutan hujan Amazon' dan 'terumbu karang' sebagai contoh habitat, mengindikasikan penerapannya yang luas.`
  },
])

const userAnswers = ref<Record<number, number | null>>({})
const submitted = ref(false)
const showResult = ref(false)

// Inisialisasi jawaban pengguna
onMounted(() => {
  questions.value.forEach(q => {
    userAnswers.value[q.id] = null
  })
})

const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    if (userAnswers.value[question.id] === question.correctAnswerIndex) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const progress = computed(() => {
  const answeredCount = Object.values(userAnswers.value).filter(a => a !== null).length
  return (answeredCount / questions.value.length) * 100
})

function validateAnswers() {
  submitted.value = true
  showResult.value = true
  // Scroll ke bagian hasil
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    if(resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

function resetQuiz() {
  submitted.value = false
  showResult.value = false
  questions.value.forEach(q => {
    userAnswers.value[q.id] = null
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Fungsi bantuan untuk styling
function getOptionClass(question: Question, optionIndex: number): string {
  if (!submitted.value) return 'border-border'

  const isCorrect = optionIndex === question.correctAnswerIndex
  const isSelected = userAnswers.value[question.id] === optionIndex

  if (isCorrect) return 'border-green-500 bg-green-100/50 dark:bg-green-900/30'
  if (isSelected && !isCorrect) return 'border-red-500 bg-red-100/50 dark:bg-red-900/30'
  
  return 'border-border'
}

</script>

<template>
  <SNBTLayout
    :test-title="layoutProps.testTitle"
    :test-description="layoutProps.testDescription"
    :unit-title="layoutProps.unitTitle"
    :unit-description="layoutProps.unitDescription"
    :categories="layoutProps.categories"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Konsep Inti: Menyimpulkan Teks</CardTitle>
          <CardDescription>Pahami fondasi untuk menarik simpulan yang tepat dan akurat.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-4">
          <p>
            <strong>Menyimpulkan</strong> berarti merumuskan proposisi akhir (kesimpulan) yang ditarik dari serangkaian premis (ide pokok atau informasi) yang disajikan dalam teks. Simpulan yang baik harus mencerminkan keseluruhan isi teks, bukan hanya sebagian, dan harus logis berdasarkan informasi yang tersedia.
          </p>
          <div class="space-y-2">
            <h4 class="font-semibold text-foreground">1. Informasi Eksplisit vs. Implisit</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Eksplisit (Tersurat):</strong> Informasi yang dinyatakan secara jelas, lugas, dan langsung dalam teks. Anda dapat menunjuk kalimat atau frasa yang menjadi buktinya.</li>
              <li><strong>Implisit (Tersirat):</strong> Informasi yang tidak dinyatakan secara langsung. Anda perlu melakukan inferensi atau penalaran dengan menghubungkan petunjuk-petunjuk yang ada di dalam teks untuk menemukannya. Ini menguji kemampuan penalaran kritis Anda.</li>
            </ul>
          </div>
           <div class="space-y-2">
            <h4 class="font-semibold text-foreground">2. Teknik Efektif Menyimpulkan</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Identifikasi Ide Pokok:</strong> Temukan gagasan utama di setiap paragraf.</li>
              <li><strong>Sintesiskan Ide:</strong> Gabungkan ide-ide pokok tersebut menjadi satu pernyataan utuh yang saling berhubungan. Jangan hanya mengambil satu ide pokok dari satu paragraf saja.</li>
              <li><strong>Cari Kata Kunci & Konjungsi Final:</strong> Perhatikan kata-kata seperti <i>'jadi', 'dengan demikian', 'oleh karena itu', 'maka dari itu'</i>, karena seringkali menandakan bagian simpulan dari penulis.</li>
              <li><strong>Pahami Tujuan Penulis:</strong> Tanyakan pada diri sendiri: "Apa pesan utama yang ingin disampaikan penulis melalui teks ini?"</li>
            </ul>
          </div>
           <div class="space-y-2">
            <h4 class="font-semibold text-foreground">3. Jebakan yang Harus Dihindari</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Terlalu Luas atau Sempit:</strong> Simpulan tidak boleh lebih umum atau lebih spesifik dari cakupan teks.</li>
              <li><strong>Opini Pribadi:</strong> Simpulan harus murni dari teks, bukan berdasarkan pendapat atau pengetahuan Anda di luar teks.</li>
              <li><strong>Hanya Mengulang Fakta:</strong> Simpulan bukan sekadar ringkasan yang membeo kalimat dari teks, melainkan sebuah sintesis yang memberikan pemahaman baru.</li>
              <li><strong>Menambah Informasi Baru:</strong> Pastikan simpulan Anda tidak mengandung asumsi atau informasi yang tidak didukung oleh teks.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Pemahaman</CardTitle>
          <CardDescription>Baca setiap teks dengan saksama dan pilih jawaban yang paling tepat.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Progress Bar -->
          <div class="space-y-2">
            <Label>Progress Pengerjaan</Label>
            <Progress :model-value="progress" />
          </div>

          <!-- Loop Pertanyaan -->
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-4">
            <p class="font-semibold">Soal {{ index + 1 }} dari {{ questions.length }}</p>
            <div class="p-4 border rounded-lg bg-muted/50 text-sm leading-relaxed">
              <p v-html="q.text"></p>
            </div>
            <p class="font-medium">{{ q.question }}</p>

            <RadioGroup v-model="userAnswers[q.id]" :disabled="submitted">
              <div v-for="(option, optIndex) in q.options" :key="optIndex" class="space-y-2">
                <div 
                  :class="getOptionClass(q, optIndex)"
                  class="flex items-center space-x-3 rounded-md border p-4 transition-all"
                >
                  <RadioGroupItem :id="`q${q.id}-opt${optIndex}`" :value="optIndex" />
                  <Label :for="`q${q.id}-opt${optIndex}`" class="flex-1 cursor-pointer">{{ option }}</Label>
                  <template v-if="submitted">
                     <CheckCircle2 v-if="optIndex === q.correctAnswerIndex" class="h-5 w-5 text-green-500"/>
                     <XCircle v-else-if="userAnswers[q.id] === optIndex" class="h-5 w-5 text-red-500"/>
                  </template>
                </div>
              </div>
            </RadioGroup>
            <hr v-if="index < questions.length - 1" class="mt-8" />
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!submitted" @click="validateAnswers" :disabled="progress < 100" class="w-full">
            Selesai & Cek Jawaban
          </Button>
           <Button v-else @click="resetQuiz" class="w-full" variant="outline">
            Ulangi Latihan
          </Button>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card>
          <CardHeader>
            <CardTitle>Hasil & Pembahasan</CardTitle>
            <CardDescription>Analisis jawaban Anda untuk memperdalam pemahaman.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Skor Akhir -->
            <Alert :variant="score === questions.length ? 'default' : 'destructive'" class="bg-opacity-10 dark:bg-opacity-20">
              <component :is="score === questions.length ? CheckCircle2 : AlertCircle" class="h-4 w-4" />
              <AlertTitle class="text-lg">Skor Anda: {{ score }} / {{ questions.length }}</AlertTitle>
              <AlertDescription>
                {{ score === questions.length ? "Luar biasa! Semua jawaban Anda benar." : `Terus berlatih! Tinjau pembahasan di bawah ini untuk memahami letak kesalahan.` }}
              </AlertDescription>
            </Alert>

            <!-- Pembahasan per Soal -->
            <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="space-y-3">
              <h4 class="font-semibold">Pembahasan Soal {{ index + 1 }}</h4>
              <Card class="bg-muted/30">
                <CardContent class="p-4 space-y-4">
                  <p><strong>Pertanyaan:</strong> {{ q.question }}</p>
                  <div class="space-y-2 text-sm">
                    <p>
                      <strong>Jawaban Anda:</strong>
                      <span v-if="userAnswers[q.id] !== null" :class="userAnswers[q.id] === q.correctAnswerIndex ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="font-semibold">
                         {{ q.options[userAnswers[q.id]!] }}
                      </span>
                      <span v-else class="text-muted-foreground italic">Tidak dijawab</span>
                    </p>
                     <p>
                      <strong>Jawaban Benar:</strong>
                      <span class="font-semibold text-green-600 dark:text-green-400">
                         {{ q.options[q.correctAnswerIndex] }}
                      </span>
                    </p>
                  </div>
                  <Alert variant="default" class="bg-background">
                    <AlertCircle class="h-4 w-4" />
                    <AlertTitle>Penjelasan</AlertTitle>
                    <AlertDescription class="prose prose-sm dark:prose-invert max-w-none" v-html="q.explanation">
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
            <Button @click="resetQuiz" class="w-full" variant="secondary">
              Kerjakan Ulang Latihan Ini
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Menambahkan styling untuk konten HTML dari v-html */
.prose :where(strong) {
  color: inherit;
}
.prose :where(br)::before {
  content: "";
  display: block;
  height: 0.5rem; /* Memberi jarak antar baris */
}
</style>