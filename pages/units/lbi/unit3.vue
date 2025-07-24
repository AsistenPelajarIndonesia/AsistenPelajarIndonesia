<!--
  File: @/pages/units/lbi/unit1.vue
  Description: Halaman pembelajaran dan latihan SNBT untuk subtes Literasi Bahasa Indonesia,
  Unit 1: Menganalisis Hubungan Logis Antarparagraf dan Antarkalimat (Kohesi dan Koherensi).
  Halaman ini dirancang untuk menjadi sangat mendalam, dengan materi yang komprehensif,
  soal-soal yang menantang (HOTS), dan validator jawaban yang canggih dengan penjelasan detail.
-->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// --- Component Imports from shadcn-vue & lucide ---
// We import a comprehensive set of components to build a rich UI.
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit, Target, Repeat } from 'lucide-vue-next'

// --- Page Metadata and Layout Configuration ---
const layoutProps = {
  testTitle: 'SNBT - Literasi Bahasa Indonesia',
  testDescription: 'Kumpulan materi dan soal latihan untuk persiapan Ujian Tulis Berbasis Komputer (UTBK).',
  unitTitle: 'Unit 1: Kohesi dan Koherensi',
  unitDescription: 'Menganalisis Hubungan Logis Antarparagraf dan Antarkalimat. Fokus pada kepaduan bentuk (kohesi) dan kepaduan makna (koherensi) dalam wacana.',
  categories: ['Literasi Bahasa Indonesia', 'Penalaran Bacaan', 'Logika Wacana'],
}

// --- Dynamic Navigation Logic ---
// This section handles the dynamic routing based on the current URL.
const route = useRoute()
const router = useRouter()

const currentUnitNumber = computed(() => {
  // Regex to safely extract number from a filename like "unit1", "unit-1", "unit_1"
  const match = route.path.match(/unit(\d+)/i)
  return match ? parseInt(match[1], 10) : null
})

function goToPreviousUnit() {
  if (currentUnitNumber.value && currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  }
  else {
    // In a real app, you might navigate to the main unit list or show a notification.
    alert('Ini adalah unit pertama!')
  }
}

function goToNextUnit() {
  if (currentUnitNumber.value) {
    // This assumes there is a next unit.
    router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
  }
}


// --- Quiz State Management ---
// Reactive variables to manage the quiz lifecycle.
const questions = reactive([
  {
    id: 1,
    text: "Bacalah paragraf berikut dengan saksama.\n(1) Inovasi teknologi dalam bidang pertanian, yang sering disebut sebagai agritech, telah membawa perubahan revolusioner. (2) Petani kini dapat menggunakan drone untuk memantau kondisi tanaman dari udara, sensor tanah untuk mengukur kelembapan dan nutrisi, serta aplikasi manajemen pertanian untuk merencanakan penanaman dan panen secara presisi. (3) Keuntungan utama dari teknologi ini adalah peningkatan efisiensi dan produktivitas yang signifikan. (4) Namun, biaya awal untuk implementasi teknologi canggih ini masih menjadi kendala besar bagi sebagian besar petani kecil di Indonesia. (5) Banyak petani lebih memilih metode tradisional karena dianggap lebih hemat biaya dan tidak memerlukan pelatihan khusus. (6) Oleh karena itu, diperlukan skema pembiayaan yang terjangkau dan program pelatihan dari pemerintah agar adopsi agritech dapat merata dan memberikan dampak positif yang lebih luas bagi ketahanan pangan nasional.\n\nKalimat yang paling tepat untuk disisipkan di antara kalimat (3) dan (4) agar paragraf menjadi lebih padu adalah...",
    options: [
      "Teknologi ini juga terbukti ramah lingkungan karena mengurangi penggunaan pestisida.",
      "Meskipun demikian, tantangan dalam adopsi teknologi ini tidak dapat diabaikan.",
      "Pemerintah telah meluncurkan berbagai program untuk mendukung petani lokal.",
      "Hasil panen yang melimpah membuat harga di tingkat petani justru menurun.",
      "Sebagai contoh, penggunaan drone dapat mengurangi waktu pemantauan lahan hingga 75%."
    ],
    correctAnswerIndex: 1,
    explanation: "Penjelasan: Kalimat (3) membahas 'keuntungan' agritech, sementara kalimat (4) memperkenalkan 'kendala' atau tantangan. Untuk menciptakan transisi yang logis dan koheren, diperlukan sebuah kalimat jembatan yang mengakui adanya keuntungan namun mulai mengisyaratkan adanya sisi lain (tantangan). Pilihan (B) 'Meskipun demikian, tantangan dalam adopsi teknologi ini tidak dapat diabaikan' berfungsi sempurna sebagai jembatan tersebut. Kata 'Meskipun demikian' adalah konjungsi antarkalimat yang menunjukkan pertentangan, secara efektif menghubungkan ide positif di kalimat (3) dengan ide negatif di kalimat (4). Pilihan (A) dan (E) hanya menambah detail keuntungan, tidak menjembatani ke kendala. Pilihan (C) dan (D) memperkenalkan ide baru yang tidak relevan dengan alur paragraf."
  },
  {
    id: 2,
    text: "Perhatikan kedua paragraf berikut.\n\nParagraf 1:\nKrisis iklim global menuntut transisi energi dari sumber fosil ke energi baru terbarukan (EBT). Indonesia, dengan potensi surya, angin, dan panas bumi yang melimpah, memiliki peluang besar untuk menjadi pemimpin dalam sektor EBT di Asia Tenggara. Pengembangan EBT tidak hanya berkontribusi pada pengurangan emisi karbon, tetapi juga dapat menciptakan lapangan kerja baru dan meningkatkan kemandirian energi bangsa.\n\nParagraf 2:\nImplementasi proyek-proyek EBT berskala besar memerlukan investasi finansial yang masif, teknologi yang mutakhir, dan kerangka regulasi yang mendukung. Stabilitas politik dan kepastian hukum menjadi faktor krusial bagi investor asing maupun domestik. Tanpa jaminan ini, minat untuk menanamkan modal di sektor EBT Indonesia akan tetap rendah, menghambat laju transisi energi.\n\nKalimat yang paling efektif untuk menghubungkan Paragraf 1 dan Paragraf 2 adalah...",
    options: [
      "Oleh karena itu, potensi besar yang dimiliki Indonesia harus segera dimanfaatkan secara optimal.",
      "Dengan demikian, pemerintah perlu fokus pada pengembangan teknologi EBT dalam negeri.",
      "Namun, untuk merealisasikan potensi besar tersebut, Indonesia dihadapkan pada serangkaian tantangan yang kompleks dan multidimensional.",
      "Di sisi lain, masyarakat juga perlu diedukasi mengenai pentingnya energi baru terbarukan.",
      "Sebagai hasilnya, banyak negara maju telah berhasil melakukan transisi energi."
    ],
    correctAnswerIndex: 2,
    explanation: "Penjelasan: Paragraf 1 memaparkan 'potensi' dan 'peluang' Indonesia dalam pengembangan EBT. Paragraf 2 membahas 'tantangan' dan 'hambatan' dalam implementasinya (investasi, teknologi, regulasi). Kalimat penghubung yang ideal harus mampu menjembatani kedua ide yang kontras ini. Pilihan (C) adalah yang terbaik karena secara eksplisit menyebut 'potensi besar' (merujuk ke Paragraf 1) dan kemudian menggunakan konjungsi pertentangan 'Namun' untuk memperkenalkan 'serangkaian tantangan' (yang akan dibahas di Paragraf 2). Pilihan (A) dan (B) hanya melanjutkan ide dari Paragraf 1 dan tidak mempersiapkan pembaca untuk tantangan di Paragraf 2. Pilihan (D) dan (E) mengalihkan fokus ke topik lain (edukasi masyarakat, negara maju) yang kurang relevan sebagai penghubung."
  },
  {
    id: 3,
    text: "Perhatikan kalimat-kalimat acak berikut:\n(1) Akibatnya, terjadi penurunan drastis dalam keanekaragaman hayati laut, mengancam ekosistem terumbu karang yang rapuh.\n(2) Fenomena pemutihan karang (coral bleaching) ini disebabkan oleh kenaikan suhu air laut yang berkelanjutan.\n(3) Salah satu dampak paling nyata dari pemanasan global adalah meningkatnya suhu permukaan laut di seluruh dunia.\n(4) Ketika suhu air laut melebihi ambang batas toleransi, karang akan melepaskan alga simbiotik (zooxanthellae) yang hidup di jaringannya, yang membuat karang menjadi putih.\n(5) Peristiwa ini bukan hanya masalah estetika, tetapi juga indikator kritis dari kesehatan ekosistem laut yang sedang terancam.\n\nUrutan kalimat yang logis dan koheren agar membentuk paragraf yang padu adalah...",
    options: [
      "(3)-(4)-(1)-(2)-(5)",
      "(3)-(2)-(4)-(1)-(5)",
      "(2)-(4)-(1)-(5)-(3)",
      "(5)-(3)-(2)-(4)-(1)",
      "(3)-(5)-(2)-(1)-(4)"
    ],
    correctAnswerIndex: 1,
    explanation: "Penjelasan: Paragraf yang logis harus dimulai dari ide yang paling umum menuju ke yang spesifik, mengikuti alur sebab-akibat. Urutan yang benar adalah (3)-(2)-(4)-(1)-(5).\n(3) Menyajikan ide utama/penyebab umum: pemanasan global meningkatkan suhu laut.\n(2) Menghubungkan sebab umum (suhu laut naik) dengan akibat spesifik: fenomena pemutihan karang.\n(4) Menjelaskan mekanisme ilmiah dari pemutihan karang yang disebut di kalimat (2).\n(1) Menjelaskan dampak/akibat lebih lanjut dari mekanisme di kalimat (4): penurunan keanekaragaman hayati.\n(5) Memberikan kesimpulan/penegasan atas seluruh rangkaian peristiwa yang telah dijelaskan. Pilihan (B) menyajikan alur sebab-akibat yang paling runtut dan koheren."
  },
  {
    id: 4,
    text: "Cermati paragraf berikut!\nUrbanisasi yang tidak terkendali di kota-kota besar Indonesia telah menciptakan tekanan hebat pada infrastruktur dan lingkungan. Pertumbuhan populasi yang pesat tidak diimbangi dengan penyediaan perumahan yang layak, fasilitas sanitasi, dan transportasi publik yang memadai. [...] Akumulasi masalah ini pada akhirnya menurunkan kualitas hidup warga kota dan menciptakan kesenjangan sosial yang semakin lebar. Pemerintah kota dituntut untuk merumuskan kebijakan tata ruang yang komprehensif dan berkelanjutan untuk mengatasi persoalan ini.\n\nKalimat manakah yang paling logis untuk melengkapi bagian rumpang pada paragraf tersebut?",
    options: [
      "Banyak pendatang baru yang berhasil meningkatkan taraf hidup mereka di kota.",
      "Selain itu, kota-kota besar juga menjadi pusat pertumbuhan ekonomi nasional.",
      "Kondisi ini diperparah oleh minimnya ruang terbuka hijau dan meningkatnya polusi udara serta air.",
      "Pembangunan gedung-gedung pencakar langit menjadi simbol kemajuan sebuah kota.",
      "Oleh karena itu, program transmigrasi perlu digalakkan kembali oleh pemerintah pusat."
    ],
    correctAnswerIndex: 2,
    explanation: "Penjelasan: Kalimat sebelum bagian rumpang membahas masalah infrastruktur (perumahan, sanitasi, transportasi). Kalimat setelah rumpang menyimpulkan akumulasi masalah tersebut. Bagian rumpang harus diisi dengan kalimat yang menambahkan contoh masalah lain yang relevan dengan konteks 'tekanan pada lingkungan'. Pilihan (C) 'Kondisi ini diperparah oleh minimnya ruang terbuka hijau dan meningkatnya polusi udara serta air' secara sempurna melanjutkan daftar masalah lingkungan dan infrastruktur, menjaga koherensi paragraf. Pilihan (A), (B), dan (D) menyajikan ide positif yang bertentangan dengan alur negatif paragraf. Pilihan (E) menawarkan solusi yang terlalu dini, karena paragraf masih dalam tahap pemaparan masalah."
  },
]);

const userAnswers = ref<Array<number | null>>(Array(questions.length).fill(null))
const showResult = ref(false)
const score = ref(0)

interface ResultDetail {
  id: number;
  questionText: string;
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}
const results = ref<ResultDetail[]>([])

// --- Quiz Logic Functions ---
function validateAnswers() {
  let correctCount = 0
  const tempResults: ResultDetail[] = []

  questions.forEach((q, index) => {
    const userAnswerIndex = userAnswers.value[index]
    const isCorrect = userAnswerIndex === q.correctAnswerIndex

    if (isCorrect) {
      correctCount++
    }

    tempResults.push({
      id: q.id,
      questionText: q.text,
      userAnswer: userAnswerIndex !== null ? q.options[userAnswerIndex] : 'Tidak dijawab',
      correctAnswer: q.options[q.correctAnswerIndex],
      isCorrect: isCorrect,
      explanation: q.explanation
    })
  })

  score.value = Math.round((correctCount / questions.length) * 100)
  results.value = tempResults
  showResult.value = true

  // Scroll to result section for better UX
  const resultElement = document.getElementById('result-section');
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetQuiz() {
  userAnswers.value.fill(null)
  showResult.value = false
  score.value = 0
  results.value = []
   // Scroll to top of practice for better UX
  const practiceElement = document.getElementById('practice-section');
  if (practiceElement) {
    practiceElement.scrollIntoView({ behavior: 'smooth' });
  }
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
        <CardHeader class="flex flex-row items-center gap-3">
          <BookOpen class="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Konsep Fundamental: Kohesi & Koherensi</CardTitle>
            <CardDescription>Memahami fondasi paragraf yang baik dan benar.</CardDescription>
          </div>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Dalam Literasi Bahasa Indonesia, kemampuan menganalisis hubungan logis antarbagian teks adalah kunci. Dua konsep utama yang harus Anda kuasai adalah <strong>kohesi</strong> (kepaduan bentuk) dan <strong>koherensi</strong> (kepaduan makna).
          </p>
          
          <Separator class="my-4" />
          
          <h4>1. Kohesi (Kepaduan Bentuk)</h4>
          <p>
            Kohesi adalah hubungan antarunsur dalam wacana yang ditandai secara gramatikal dan leksikal. Ini adalah 'lem' yang mengikat kalimat-kalimat secara struktural.
          </p>
          <ul>
            <li>
              <strong>Kohesi Gramatikal:</strong>
              <ul>
                <li><strong>Pengacuan (Referensi):</strong> Penggunaan kata ganti seperti <em>ia, mereka, -nya, ini, itu, di sana</em> untuk merujuk pada hal yang sudah disebutkan. Contoh: "Budi adalah siswa teladan. <u>Ia</u> selalu mendapat peringkat pertama."</li>
                <li><strong>Penyulihan (Substitusi):</strong> Penggantian suatu unsur dengan unsur lain. Contoh: "Kamu mau lihat gedung itu? Saya juga mau lihat <u>yang itu</u>."</li>
                <li><strong>Pelepasan (Elipsis):</strong> Penghilangan unsur kalimat yang sudah jelas dari konteks. Contoh: "Ani membeli buku. Budi juga [membeli buku]."</li>
                <li><strong>Konjungsi (Kata Hubung):</strong> Penggunaan kata hubung antarkalimat seperti <em>oleh karena itu, dengan demikian, selain itu, namun, meskipun demikian</em>.</li>
              </ul>
            </li>
            <li>
              <strong>Kohesi Leksikal:</strong>
              <ul>
                <li><strong>Repetisi:</strong> Pengulangan kata kunci untuk menjaga fokus.</li>
                <li><strong>Sinonim/Antonim:</strong> Penggunaan kata yang bermakna sama atau berlawanan.</li>
                <li><strong>Hiponim/Hipernim:</strong> Hubungan kata khusus dan umum (misal: <em>mawar</em> adalah hiponim dari <em>bunga</em>).</li>
              </ul>
            </li>
          </ul>

          <Separator class="my-4" />

          <h4>2. Koherensi (Kepaduan Makna)</h4>
          <p>
            Koherensi adalah keterkaitan makna atau hubungan logis antarkalimat atau antarparagraf. Meskipun sebuah teks bisa jadi kohesif, ia belum tentu koheren jika tidak ada alur pikiran yang logis.
          </p>
          <p>Hubungan logis yang sering diuji meliputi:</p>
          <ul>
            <li><strong>Sebab-Akibat:</strong> Satu kalimat menjadi penyebab bagi kalimat lainnya.</li>
            <li><strong>Penambahan:</strong> Memberikan informasi tambahan yang mendukung ide sebelumnya.</li>
            <li><strong>Pertentangan/Kontras:</strong> Menghubungkan dua ide yang berlawanan.</li>
            <li><strong>Urutan Waktu (Kronologis):</strong> Menyajikan peristiwa sesuai urutan kejadiannya.</li>
            <li><strong>Contoh/Ilustrasi:</strong> Memberikan contoh konkret dari sebuah pernyataan umum.</li>
            <li><strong>Kesimpulan/Ringkasan:</strong> Menyimpulkan gagasan yang telah dipaparkan.</li>
          </ul>
          <Alert variant="default" class="mt-4">
            <BrainCircuit class="h-4 w-4" />
            <AlertTitle>Tips Pro!</AlertTitle>
            <AlertDescription>
              Soal SNBT sering kali menguji kemampuan Anda untuk menemukan "kalimat sumbang" (yang merusak koherensi), menyisipkan kalimat, atau mengurutkan kalimat. Kuncinya adalah mengidentifikasi <strong>alur logika utama</strong> paragraf tersebut.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <div id="practice-section" class="scroll-mt-20">
        <Card>
          <CardHeader class="flex flex-row items-center gap-3">
            <Target class="h-8 w-8 text-destructive" />
            <div>
              <CardTitle>Uji Kemampuan: Soal Latihan HOTS</CardTitle>
              <CardDescription>Analisis setiap soal dengan teliti. Perhatikan jebakan yang ada!</CardDescription>
            </div>
          </CardHeader>
          <CardContent class="flex flex-col gap-8">
            <div v-for="(question, qIndex) in questions" :key="question.id">
              <p class="mb-4 whitespace-pre-wrap font-medium leading-relaxed">{{ qIndex + 1 }}. {{ question.text }}</p>
              <RadioGroup v-model="userAnswers[qIndex]" :disabled="showResult">
                <div v-for="(option, oIndex) in question.options" :key="oIndex" class="flex items-center space-x-3 mb-3">
                  <RadioGroupItem :id="`q${question.id}-o${oIndex}`" :value="oIndex" />
                  <Label :for="`q${question.id}-o${oIndex}`" class="leading-snug">{{ option }}</Label>
                </div>
              </RadioGroup>
              <Separator v-if="qIndex < questions.length - 1" class="mt-8" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="validateAnswers" :disabled="showResult" class="w-full">
              Kirim Jawaban & Lihat Hasil
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: HASIL DAN PEMBAHASAN                                              -->
    <!-- ======================================================================= -->
    <template #result>
       <div id="result-section" class="scroll-mt-20">
        <Card>
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Analisis Jawaban</CardTitle>
            <CardDescription>Berikut adalah evaluasi lengkap dari jawaban Anda. Pelajari pembahasannya untuk meningkatkan pemahaman.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mb-6 flex items-center gap-4">
              <div class="flex flex-col w-full">
                <div class="flex justify-between mb-1">
                  <span class="text-base font-medium text-primary">Skor Akhir Anda</span>
                  <span class="text-sm font-medium text-primary">{{ score }}%</span>
                </div>
                <Progress :model-value="score" class="w-full" />
              </div>
              <Button @click="resetQuiz" variant="outline" size="sm">
                <Repeat class="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </div>
            
            <Separator class="my-6" />

            <div class="space-y-6">
              <div v-for="(result, index) in results" :key="result.id">
                <h4 class="font-semibold mb-2">Soal {{ index + 1 }}</h4>
                <p class="text-sm text-muted-foreground whitespace-pre-wrap mb-4">{{ result.questionText }}</p>
                
                <Alert :variant="result.isCorrect ? 'default' : 'destructive'">
                  <component :is="result.isCorrect ? CheckCircle2 : XCircle" class="h-4 w-4" />
                  <AlertTitle>
                    {{ result.isCorrect ? 'Jawaban Anda Benar!' : 'Jawaban Anda Kurang Tepat' }}
                  </AlertTitle>
                  <AlertDescription class="mt-2 space-y-2">
                    <p><strong>Jawaban Anda:</strong> {{ result.userAnswer }}</p>
                    <p v-if="!result.isCorrect"><strong>Jawaban yang Benar:</strong> {{ result.correctAnswer }}</p>
                    
                    <div class="mt-4 pt-4 border-t border-border/50">
                      <h5 class="font-bold mb-2">🧠 Pembahasan Logis:</h5>
                      <p class="text-xs md:text-sm leading-relaxed">{{ result.explanation }}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style>
/* Optional: Add some global styles if needed, e.g., for prose */
.prose ul ul {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose ul > li > p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>