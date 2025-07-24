<script setup lang="ts">
// =======================================================================
// SETUP & IMPORTS
// =======================================================================
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Layout dan Komponen UI
// Pastikan komponen-komponen ini sudah terinstal dan terkonfigurasi di proyek Nuxt Anda
// (misalnya melalui shadcn-vue)
import SNBTLayout from '@/layouts/SNBTLayout.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Info, Lightbulb } from 'lucide-vue-next'

// Tentukan metadata halaman untuk SEO dan kejelasan
definePageMeta({
  layout: false, // Kita akan menggunakan komponen layout secara manual
})

// =======================================================================
// STATE MANAGEMENT (REACTIVE DATA)
// =======================================================================

// --- Informasi Unit & Navigasi ---
const router = useRouter()
const route = useRoute()
const unitNumber = ref<number | null>(null)

// --- State Latihan ---
const showResult = ref(false)
const userAnswers = reactive<Record<string, string | null>>({
  q1: null,
  q2: null,
  q3: null,
  q4: null,
})

// --- Data Soal & Pembahasan ---
// Dibuat 'sulit' dengan kalimat kompleks dan pengecoh yang relevan.
const questions = reactive([
  {
    id: 'q1',
    passage: 'Peningkatan emisi karbon dioksida sebagai akibat dari industrialisasi masif telah menyebabkan percepatan penipisan lapisan ozon, yang mana melindungi bumi dari radiasi ultraviolet berlebih. Meskipun berbagai negara telah menyusun protokol untuk menekan emisi, implementasinya seringkali terhambat oleh kepentingan ekonomi jangka pendek sehingga para aktivis lingkungan hidup pesimis terhadap perbaikan kondisi atmosfer secara signifikan dalam waktu dekat.',
    question: 'Manakah kalimat perbaikan yang paling logis dan efektif untuk bagian yang dicetak tebal pada teks di atas?',
    options: [
      { id: 'q1a', label: 'A', text: '...sehingga lapisan ozon yang melindungi bumi dari radiasi ultraviolet berlebih semakin menipis.' },
      { id: 'q1b', label: 'B', text: '...yang menyebabkan lapisan ozon tertipis, padahal ia melindungi bumi dari radiasi ultraviolet berlebih.' },
      { id: 'q1c', label: 'C', text: '...akibatnya lapisan ozon menipis dan bumi tidak terlindungi dari radiasi ultraviolet berlebih.' },
      { id: 'q1d', label: 'D', text: '...yang mengakibatkan penipisan lapisan ozon, padahal lapisan tersebut berfungsi melindungi bumi dari radiasi ultraviolet berlebih.' },
      { id: 'q1e', label: 'E', text: '...maka dari itu lapisan ozon yang berfungsi sebagai pelindung bumi dari radiasi ultraviolet akan menipis.' },
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat soal "...menyebabkan percepatan penipisan lapisan ozon, yang mana melindungi bumi..." memiliki kerancuan. Kata "yang mana" seolah-olah merujuk pada "percepatan penipisan lapisan ozon", padahal yang dimaksud melindungi bumi adalah "lapisan ozon" itu sendiri. Pilihan A adalah yang paling logis karena secara jelas menyatakan bahwa **peningkatan emisi menyebabkan penipisan lapisan ozon**. Hubungan sebab-akibatnya jernih. Pilihan B menggunakan "padahal" yang kurang tepat konteksnya. Pilihan C terlalu menyederhanakan dan kurang formal. Pilihan D menggunakan "padahal" yang menciptakan kontras yang tidak perlu. Pilihan E menggunakan "maka dari itu" yang bersifat konklusif dan kurang pas sebagai klausa bawahan.',
  },
  {
    id: 'q2',
    passage: '(1) Dalam rangka meningkatkan mutu pendidikan nasional, pemerintah meluncurkan program digitalisasi sekolah. (2) Program ini mencakup pengadaan perangkat keras seperti komputer dan tablet bagi siswa-siswa dari keluarga prasejahtera. (3) Selain itu, pelatihan intensif bagi para pengajar juga menjadi prioritas agar mereka dapat mengintegrasikan teknologi dalam proses belajar-mengajar. (4) Diharapkan dengan adanya program ini, waktu dan tempat kami persilakan untuk memajukan pendidikan Indonesia. (5) Namun, tantangan utama terletak pada pemerataan akses internet yang belum menjangkau seluruh pelosok negeri.',
    question: 'Kalimat yang tidak logis dalam paragraf tersebut ditandai dengan nomor...',
    options: [
      { id: 'q2a', label: 'A', text: '(1)' },
      { id: 'q2b', label: 'B', text: '(2)' },
      { id: 'q2c', label: 'C', text: '(3)' },
      { id: 'q2d', label: 'D', text: '(4)' },
      { id: 'q2e', label: 'E', text: '(5)' },
    ],
    correctAnswer: 'D',
    explanation: 'Kalimat (4) mengandung ketidaklogisan yang umum terjadi dalam ragam lisan/formalitas yang kaku. Frasa "waktu dan tempat kami persilakan" adalah tidak logis karena "waktu" dan "tempat" merupakan benda mati (konsep abstrak) yang tidak dapat dipersilakan atau melakukan suatu tindakan. Ini adalah kerancuan nalar. Seharusnya kalimat tersebut dapat diperbaiki menjadi, misalnya, "Diharapkan program ini dapat memajukan pendidikan Indonesia." atau bentuk lain yang subjek dan predikatnya jelas dan logis.',
  },
  {
    id: 'q3',
    passage: 'Meskipun sudah diperingatkan berkali-kali tentang bahaya longsor di musim hujan, tetapi banyak warga yang masih bertahan di rumah mereka yang terletak di lereng curam.',
    question: 'Agar kalimat di atas menjadi logis dan efektif, perbaikan yang harus dilakukan adalah...',
    options: [
      { id: 'q3a', label: 'A', text: 'Menghilangkan kata "meskipun".' },
      { id: 'q3b', label: 'B', text: 'Menghilangkan kata "tetapi".' },
      { id: 'q3c', label: 'C', text: 'Mengganti kata "di musim hujan" dengan "saat musim hujan".' },
      { id: 'q3d', label: 'D', text: 'Mengganti kata "banyak warga" dengan "para warga".' },
      { id: 'q3e', label: 'E', text: 'Menambahkan tanda koma (,) sebelum kata "tetapi".' },
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat tersebut menggunakan dua konjungsi pertentangan (konsesif) secara bersamaan, yaitu "meskipun" dan "tetapi". Ini adalah bentuk pemborosan kata (pleonasme) dan membuat struktur kalimat tidak efektif. Dalam kaidah bahasa Indonesia, konjungsi subordinatif seperti "meskipun" di awal kalimat tidak boleh diikuti oleh konjungsi korelatif "tetapi" di tengah kalimat. Cukup salah satu saja. Dengan menghilangkan "tetapi", kalimat menjadi: "Meskipun sudah diperingatkan..., banyak warga yang masih bertahan...". Kalimat ini sudah logis dan efektif.',
  },
  {
    id: 'q4',
    passage: 'Para ilmuwan mengembangkan varietas padi baru yang tidak hanya tahan terhadap serangan hama wereng, melainkan juga memiliki produktivitas yang lebih tinggi per hektarenya.',
    question: 'Penggunaan konjungsi dalam kalimat di atas menjadi tidak logis karena...',
    options: [
      { id: 'q4a', label: 'A', text: 'Konjungsi "tidak hanya..., melainkan juga..." seharusnya digunakan untuk hal yang bertentangan.' },
      { id: 'q4b', label: 'B', text: 'Pasangan konjungsi yang tepat untuk "tidak hanya" adalah "tetapi juga".' },
      { id: 'q4c', label: 'C', text: 'Kata "melainkan" seharusnya didahului oleh tanda koma.' },
      { id: 'q4d', label: 'D', text: 'Konjungsi "melainkan juga" tidak dapat diikuti oleh klausa perbandingan "lebih tinggi".' },
      { id: 'q4e', label: 'E', text: 'Seharusnya menggunakan konjungsi "bukan hanya..., melainkan juga..." untuk subjek non-manusia.' },
    ],
    correctAnswer: 'B',
    explanation: 'Kelogisan dalam kalimat juga berkaitan dengan penggunaan pasangan konjungsi korelatif yang tepat. Konjungsi "melainkan" digunakan untuk menyatakan pertentangan yang didahului oleh negasi "bukan" (contoh: "Dia bukan seorang guru, melainkan seorang dokter"). Untuk menyatakan penambahan atau penguatan paralel yang didahului negasi "tidak", pasangan yang tepat adalah "tetapi juga". Jadi, kalimat yang logis dan benar secara kaidah adalah: "Para ilmuwan mengembangkan varietas padi baru yang tidak hanya tahan..., tetapi juga memiliki produktivitas...". Pilihan B secara akurat mengidentifikasi kesalahan logika berbahasa ini.',
  },
])

// =======================================================================
// COMPUTED PROPERTIES
// =======================================================================

// Menghitung skor total
const totalCorrect = computed(() => {
  return questions.reduce((count, question) => {
    return userAnswers[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
})

// Menghitung persentase skor untuk progress bar
const scorePercentage = computed(() => {
  return (totalCorrect.value / questions.length) * 100
})

// =======================================================================
// FUNCTIONS & LIFECYCLE HOOKS
// =======================================================================

// --- Navigasi Unit ---
onMounted(() => {
  // Ekstrak nomor unit dari URL saat komponen dimuat
  const match = route.path.match(/unit(\d+)/)
  if (match && match[1]) {
    unitNumber.value = parseInt(match[1], 10)
  }
})

function goToPreviousUnit() {
  if (unitNumber.value && unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  } else {
    // Bisa arahkan ke halaman utama unit atau berikan notifikasi
    console.log("This is the first unit.")
  }
}

function goToNextUnit() {
  if (unitNumber.value) {
    router.push(`/units/lbi/unit${unitNumber.value + 1}`)
  }
}

// --- Logika Latihan ---
function validateAnswers() {
  // Cek apakah semua soal sudah dijawab
  const allAnswered = Object.values(userAnswers).every(answer => answer !== null)
  if (!allAnswered) {
    alert('Harap jawab semua pertanyaan terlebih dahulu!')
    return
  }
  showResult.value = true
  // Scroll ke bagian hasil untuk pengalaman pengguna yang lebih baik
  setTimeout(() => {
     const resultElement = document.getElementById('result-section');
     if (resultElement) {
       resultElement.scrollIntoView({ behavior: 'smooth' });
     }
  }, 100);
}

function resetQuiz() {
  showResult.value = false
  for (const key in userAnswers) {
    userAnswers[key] = null
  }
   const mainContent = document.getElementById('main-content-start');
   if (mainContent) {
     mainContent.scrollIntoView({ behavior: 'smooth' });
   }
}
</script>

<template>
  <SNBTLayout
    testTitle="Literasi Bahasa Indonesia"
    testDescription="Kemampuan untuk memahami, menggunakan, mengevaluasi, merefleksikan berbagai jenis teks."
    :unitTitle="`Unit ${unitNumber || '1'}: Memahami dan Menggunakan Kalimat Efektif`"
    unitDescription="Fokus pada aspek Kelogisan: Memastikan kalimat memiliki nalar yang masuk akal, tidak ambigu, dan sesuai dengan kaidah berpikir logis."
    :categories="['Kalimat Efektif', 'Kelogisan', 'Nalar', 'Konjungsi']"
    :showResult="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERIAL PEMBELAJARAN                                           -->
    <!-- ======================================================================= -->
    <template #material>
      <Card id="main-content-start">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Lightbulb class="h-6 w-6 text-yellow-500" />
            <span>Konsep Inti Kelogisan Kalimat</span>
          </CardTitle>
          <CardDescription>
            Kalimat logis adalah kalimat yang idenya dapat diterima oleh akal sehat dan sesuai dengan kaidah penalaran. Penulisannya pun harus sesuai dengan ejaan yang berlaku.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>
            Sebuah kalimat mungkin benar secara tata bahasa (subjek, predikat, objek ada), tetapi bisa jadi tidak logis. Ketidaklogisan seringkali muncul akibat:
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li>
              <strong>Kerancuan Nalar:</strong> Ide yang disampaikan bertentangan dengan logika umum atau pengetahuan dasar.
              <Alert variant="destructive" class="mt-2">
                <AlertDescription>
                  <span class="font-bold">Contoh Tidak Logis:</span> <i>Untuk mempersingkat waktu, kita teruskan acara ini.</i>
                  <br>
                  <span class="font-bold text-green-600">Analisis:</span> Waktu adalah entitas yang tidak bisa dipersingkat atau diperpanjang. Yang bisa dilakukan adalah efisiensi penggunaan waktu.
                  <br>
                  <span class="font-bold text-green-600">Perbaikan Logis:</span> <i>Untuk menghemat waktu, kita teruskan acara ini.</i>
                </AlertDescription>
              </Alert>
            </li>
            <li>
              <strong>Pilihan Kata (Diksi) yang Tidak Tepat:</strong> Menggunakan kata yang maknanya tidak sesuai dengan konteks sehingga menimbulkan kejanggalan.
              <Alert variant="destructive" class="mt-2">
                 <AlertDescription>
                  <span class="font-bold">Contoh Tidak Logis:</span> <i>Jenazah wanita yang ditemukan itu sebelumnya sering mondar-mandir di sekitar lokasi.</i>
                  <br>
                  <span class="font-bold text-green-600">Analisis:</span> "Jenazah" adalah jasad orang yang sudah meninggal, sehingga tidak mungkin "mondar-mandir".
                  <br>
                  <span class="font-bold text-green-600">Perbaikan Logis:</span> <i>Wanita yang jenazahnya ditemukan itu sebelumnya sering...</i> atau <i>Sebelum meninggal, wanita yang ditemukan itu sering...</i>
                </AlertDescription>
              </Alert>
            </li>
            <li>
              <strong>Struktur Kalimat Ambigu:</strong> Susunan kalimat yang memungkinkan penafsiran ganda.
               <Alert variant="destructive" class="mt-2">
                 <AlertDescription>
                  <span class="font-bold">Contoh Tidak Logis:</span> <i>Pemberian penghargaan akan diberikan oleh dekan yang mendapatkan nilai tertinggi.</i>
                  <br>
                  <span class="font-bold text-green-600">Analisis:</span> Kalimat ini ambigu, apakah dekan yang mendapat nilai tertinggi, atau penghargaan diberikan kepada (seseorang) yang mendapat nilai tertinggi?
                  <br>
                  <span class="font-bold text-green-600">Perbaikan Logis:</span> <i>Penghargaan bagi (mahasiswa) yang mendapatkan nilai tertinggi akan diberikan oleh dekan.</i>
                </AlertDescription>
              </Alert>
            </li>
            <li>
              <strong>Penggunaan Konjungsi yang Salah:</strong> Hubungan antar klausa menjadi tidak logis karena penggunaan kata hubung yang tidak tepat. (Lihat contoh pada soal Q3 dan Q4).
            </li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL (PRACTICE)                                           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card v-if="!showResult">
        <CardHeader>
          <CardTitle>Latihan Soal: Uji Pemahaman</CardTitle>
          <CardDescription>Pilihlah jawaban yang paling tepat. Analisis setiap pilihan dengan cermat.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-4">
            <div>
              <p class="font-semibold text-base mb-2">Soal {{ index + 1 }}</p>
              <p v-if="q.passage" class="text-muted-foreground bg-slate-50 p-3 rounded-md mb-2 italic">
                <template v-if="q.id === 'q1'">
                  Peningkatan emisi karbon dioksida sebagai akibat dari industrialisasi masif telah <b>menyebabkan percepatan penipisan lapisan ozon, yang mana melindungi bumi dari radiasi ultraviolet berlebih</b>. Meskipun berbagai negara telah menyusun protokol untuk menekan emisi, implementasinya seringkali terhambat oleh kepentingan ekonomi jangka pendek sehingga para aktivis lingkungan hidup pesimis terhadap perbaikan kondisi atmosfer secara signifikan dalam waktu dekat.
                </template>
                <template v-else>
                  {{ q.passage }}
                </template>
              </p>
              <p class="font-medium">{{ q.question }}</p>
            </div>
            <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="option.id" :value="option.label" />
                <Label :for="option.id" class="flex-1">{{ option.label }}. {{ option.text }}</Label>
              </div>
            </RadioGroup>
            <Separator v-if="index < questions.length - 1" class="mt-6" />
          </div>
          <Button @click="validateAnswers" class="w-full" size="lg">
            Cek Jawaban
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card>
          <CardHeader>
            <CardTitle>Hasil dan Pembahasan</CardTitle>
            <CardDescription>
              Skor Anda: <span class="font-bold text-primary">{{ totalCorrect }} / {{ questions.length }}</span>. Mari kita pelajari pembahasannya untuk meningkatkan pemahaman!
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-sm font-medium">Skor Keseluruhan</span>
              <Progress :model-value="scorePercentage" class="flex-1" />
              <span class="text-sm font-bold">{{ scorePercentage.toFixed(0) }}%</span>
            </div>

            <Separator class="my-6" />

            <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="space-y-4">
              <p class="font-semibold text-base">Tinjauan Soal {{ index + 1 }}</p>
              <p class="font-medium">{{ q.question }}</p>

              <div class="flex items-center gap-4 rounded-md p-3" :class="userAnswers[q.id] === q.correctAnswer ? 'bg-green-50' : 'bg-red-50'">
                <div v-if="userAnswers[q.id] === q.correctAnswer" class="flex-shrink-0">
                  <CheckCircle class="h-8 w-8 text-green-600" />
                </div>
                <div v-else class="flex-shrink-0">
                  <XCircle class="h-8 w-8 text-red-600" />
                </div>
                <div class="flex-1 text-sm">
                  <p>
                    Jawaban Anda: <b :class="userAnswers[q.id] === q.correctAnswer ? 'text-green-700' : 'text-red-700'">{{ userAnswers[q.id] }}</b>
                    <span v-if="userAnswers[q.id] !== q.correctAnswer"> | Jawaban Benar: <b class="text-green-700">{{ q.correctAnswer }}</b></span>
                  </p>
                  <p class="text-muted-foreground mt-1">
                    {{ q.options.find(opt => opt.label === userAnswers[q.id])?.text }}
                  </p>
                </div>
              </div>

              <Alert class="border-blue-200 bg-blue-50">
                <Info class="h-4 w-4 !text-blue-600" />
                <AlertTitle class="text-blue-800">Pembahasan</AlertTitle>
                <AlertDescription class="text-blue-900">
                  {{ q.explanation }}
                </AlertDescription>
              </Alert>
              <Separator v-if="index < questions.length - 1" class="my-6" />
            </div>

            <Button @click="resetQuiz" variant="outline" class="w-full mt-6">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Transisi fade untuk elemen hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>