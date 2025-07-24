<!--
  File: @/pages/units/lbi/unit1.vue
  Description: Halaman pembelajaran dan latihan SNBT untuk subtes Literasi Bahasa Indonesia,
  Unit 1: Menginterpretasi Makna Kata, Frasa, dan Istilah dalam Konteks.
  Halaman ini dirancang untuk menjadi interaktif dan edukatif, dengan materi, soal latihan yang menantang,
  serta validator jawaban yang memberikan skor dan penjelasan mendalam.
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'nuxt/app'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// --- Component Imports (asumsi sudah terinstall dan dikonfigurasi di nuxt.config.ts) ---
// UI Components from shadcn-vue. This creates a modern and clean interface.
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// --- Page Meta & Navigation ---
// Menggunakan definePageMeta untuk konfigurasi spesifik halaman, seperti layout.
definePageMeta({
  layout: false, // Kita akan menggunakan komponen SNBTLayout secara manual
})

const router = useRouter()
const route = useRoute()
const currentUnitNumber = ref<number>(1)

// Fungsi untuk mengekstrak nomor unit dari URL saat komponen di-mount.
// Ini membuat navigasi antar unit menjadi dinamis.
onMounted(() => {
  const path = route.path
  const match = path.match(/unit(\d+)/)
  if (match && match[1]) {
    currentUnitNumber.value = parseInt(match[1], 10)
  }
})

// Fungsi navigasi yang akan di-trigger oleh event 'back' dan 'next' dari layout
function goToPreviousUnit() {
  if (currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  }
  // Di sini bisa ditambahkan notifikasi jika sudah di unit pertama
}

function goToNextUnit() {
  // Anggap saja ada unit selanjutnya
  router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
}

// --- Reactive State for the Quiz ---
// State untuk menyimpan data soal, jawaban pengguna, dan status kuis
const questions = ref([
  {
    id: 1,
    passage: `Fenomena gentrifikasi, sebuah proses transformasi sosio-ekonomi di kawasan perkotaan, sering kali menjadi pedang bermata dua. Di satu sisi, ia membawa revitalisasi fisik melalui perbaikan infrastruktur dan bangunan, serta suntikan modal yang menggerakkan ekonomi lokal. Namun, di sisi lain, proses ini secara inheren memicu eskalasi harga properti dan biaya hidup. Konsekuensinya, penduduk berpenghasilan rendah dan komunitas yang telah lama bermukim terpaksa mengalami dislokasi spasial, tergusur oleh arus penduduk baru yang lebih mapan secara ekonomi. Dinamika ini mengubah wajah demografis dan kultural sebuah lingkungan secara fundamental.`,
    question: `Berdasarkan bacaan di atas, makna esensial dari istilah "gentrifikasi" adalah...`,
    options: [
      'Pembangunan infrastruktur masif di pusat kota oleh pemerintah.',
      'Perubahan sosio-kultural sebuah area urban yang mengakibatkan pergeseran demografis akibat tekanan ekonomi.',
      'Program peremajaan kota yang bertujuan untuk meningkatkan kualitas hidup seluruh lapisan masyarakat.',
      'Arus urbanisasi penduduk dari desa ke kota untuk mencari pekerjaan.',
      'Penurunan kualitas lingkungan perkotaan akibat kepadatan penduduk.'
    ],
    correctAnswer: 1, // index 1 (B)
    explanation: `Istilah "gentrifikasi" dijelaskan dalam teks sebagai proses yang menyebabkan "dislokasi spasial" bagi penduduk lama akibat "eskalasi harga properti" yang dipicu oleh kedatangan penduduk baru yang lebih mapan. Ini secara akurat mendeskripsikan perubahan sosio-kultural dan pergeseran demografis karena tekanan ekonomi. Pilihan (A) terlalu sempit, (C) bertentangan dengan efek negatif yang disorot, (D) adalah urbanisasi umum, dan (E) adalah isu yang berbeda.`
  },
  {
    id: 2,
    passage: `Dalam bioteknologi modern, pemanfaatan mikroorganisme sebagai agen biokatalitik telah membuka horison baru dalam industri ramah lingkungan. Mikroba tertentu memiliki enzim yang mampu mendegradasi polimer kompleks, seperti plastik, menjadi senyawa yang lebih sederhana dan tidak berbahaya. Proses yang dikenal sebagai biodegradasi ini tidak hanya menawarkan solusi prospektif untuk masalah limbah plastik, tetapi juga beroperasi pada kondisi yang lebih lunak—suhu dan tekanan rendah—dibandingkan proses kimia konvensional. Efisiensi dan spesifisitas enzim mikroba menjadi kunci keberhasilan pendekatan ini.`,
    question: `Frasa "agen biokatalitik" dalam konteks bacaan tersebut merujuk pada...`,
    options: [
      'Senyawa kimia sintetis yang mempercepat reaksi.',
      'Organisme hidup atau komponennya yang berfungsi sebagai katalis dalam proses biologis.',
      'Plastik yang dirancang agar mudah terurai secara alami.',
      'Teknologi canggih untuk mengelola limbah industri.',
      'Produk akhir dari proses degradasi polimer.'
    ],
    correctAnswer: 1, // index 1 (B)
    explanation: `Teks secara eksplisit menyatakan "pemanfaatan mikroorganisme sebagai agen biokatalitik". Kata "bio" merujuk pada kehidupan (mikroorganisme) dan "katalitik" merujuk pada fungsi sebagai katalis (mempercepat reaksi). Dengan demikian, frasa ini berarti organisme hidup (mikroba) yang berfungsi sebagai katalis. Pilihan (A) salah karena menyebut "sintetis", bukan "bio". Pilihan (C), (D), dan (E) adalah konsep terkait dalam teks, tetapi bukan definisi dari frasa yang ditanyakan.`
  },
  {
    id: 3,
    passage: `Kebijakan Politik Etis yang dicanangkan pada awal abad ke-20 oleh pemerintah kolonial Belanda sering dianggap sebagai respons terhadap kritik atas sistem tanam paksa. Trias van Deventer, yang mencakup irigasi, edukasi, dan emigrasi, menjadi pilar utama kebijakan ini. Namun, para sejarawan kritis memandang kebijakan ini sebagai bentuk hegemoni yang lebih halus. Edukasi, misalnya, lebih ditujukan untuk menghasilkan tenaga administrasi rendahan yang loyal, bukan untuk mencerdaskan bangsa secara holistik. Dengan demikian, kebijakan yang seolah-olah didasari oleh "utang kehormatan" ini pada praktiknya tetap melayani kepentingan imperium.`,
    question: `Istilah "utang kehormatan" (ereschuld) dalam paragraf tersebut paling tepat diinterpretasikan sebagai...`,
    options: [
      'Kewajiban finansial pemerintah Belanda kepada para bangsawan lokal.',
      'Tanggung jawab moral pemerintah kolonial untuk meningkatkan kesejahteraan rakyat jajahan sebagai balas budi atas eksploitasi di masa lalu.',
      'Program pinjaman lunak untuk membiayai pendidikan kaum pribumi.',
      'Ganti rugi yang harus dibayarkan oleh rakyat Indonesia kepada Belanda setelah kemerdekaan.',
      'Sebuah perjanjian politik rahasia antara kaum elit pribumi dan pemerintah kolonial.'
    ],
    correctAnswer: 1, // index 1 (B)
    explanation: `Konteks kalimat "kebijakan yang seolah-olah didasari oleh 'utang kehormatan' ini" mengaitkannya dengan Politik Etis sebagai respons atas kritik eksploitasi (Tanam Paksa). Ini menunjukkan bahwa "utang kehormatan" adalah gagasan tentang tanggung jawab moral (kehormatan) untuk "membalas budi" atas keuntungan ekonomi yang telah diambil dari tanah jajahan. Pilihan (B) menangkap esensi ini dengan paling akurat. Pilihan lain tidak sesuai dengan konteks historis yang dijelaskan dalam teks.`
  },
  {
    id: 4,
    passage: `Konsep jejak karbon (carbon footprint) telah menjadi metrik krusial dalam mengukur dampak aktivitas manusia terhadap perubahan iklim. Ia merepresentasikan total emisi gas rumah kaca yang dihasilkan, baik secara langsung maupun tidak langsung, oleh seorang individu, organisasi, atau produk. Upaya mitigasi perubahan iklim kini berfokus pada strategi untuk mereduksi jejak karbon ini, mulai dari transisi ke energi terbarukan hingga praktik konsumsi yang lebih bertanggung jawab. Tanpa langkah-langkah mitigasi yang substansial dan terukur, pencapaian target iklim global akan tetap menjadi angan-angan.`,
    question: `Dalam kalimat terakhir, kata "mitigasi" memiliki makna yang paling dekat dengan...`,
    options: [
      'Adaptasi atau penyesuaian terhadap kondisi baru.',
      'Kalkulasi atau penghitungan dampak secara akurat.',
      'Eksploitasi sumber daya alam secara besar-besaran.',
      'Upaya untuk mengurangi atau meringankan keparahan suatu dampak negatif.',
      'Publikasi hasil penelitian ilmiah kepada masyarakat luas.'
    ],
    correctAnswer: 3, // index 3 (D)
    explanation: `Kalimat tersebut membahas "langkah-langkah mitigasi" sebagai cara untuk "mereduksi jejak karbon" guna "mencapai target iklim global". Konteks ini dengan jelas menunjukkan bahwa mitigasi adalah tindakan yang bertujuan untuk mengurangi atau memperkecil dampak buruk (perubahan iklim). Pilihan (D) adalah definisi yang paling tepat. Pilihan (A) adalah 'adaptasi', yang merupakan konsep berbeda dalam studi iklim (menyesuaikan diri dengan dampak, bukan mengurangi penyebabnya). Pilihan (B), (C), dan (E) sama sekali tidak sesuai dengan konteks kalimat.`
  }
])

const userAnswers = ref<Record<number, number | null>>({})
const showResult = ref(false)

// Inisialisasi jawaban pengguna menjadi null untuk setiap pertanyaan
questions.value.forEach(q => {
  userAnswers.value[q.id] = null
})

// --- Computed Properties for Dynamic UI ---
// Properti komputasi untuk menghitung skor dan status kuis
const score = computed(() => {
  return questions.value.reduce((correctCount, question) => {
    if (userAnswers.value[question.id] === question.correctAnswer) {
      return correctCount + 1
    }
    return correctCount
  }, 0)
})

const totalQuestions = computed(() => questions.value.length)
const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

// --- Methods ---
// Fungsi untuk menangani aksi pengguna, seperti memilih jawaban dan memeriksa hasil
function selectAnswer(questionId: number, optionIndex: number) {
  if (!showResult.value) {
    userAnswers.value[questionId] = optionIndex
  }
}

function checkAnswers() {
  // Cek apakah semua pertanyaan sudah dijawab
  const allAnswered = Object.values(userAnswers.value).every(answer => answer !== null);
  if (!allAnswered) {
    alert('Harap jawab semua pertanyaan sebelum memeriksa hasil.');
    return;
  }
  showResult.value = true
  // Scroll ke bagian hasil untuk pengalaman pengguna yang lebih baik
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

function resetQuiz() {
  showResult.value = false
  questions.value.forEach(q => {
    userAnswers.value[q.id] = null
  })
  // Scroll kembali ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Fungsi untuk menentukan warna/style berdasarkan jawaban
function getOptionClass(questionId: number, optionIndex: number) {
  if (!showResult.value) return ''
  
  const isCorrect = questions.value.find(q => q.id === questionId)?.correctAnswer === optionIndex;
  const isSelected = userAnswers.value[questionId] === optionIndex;

  if (isCorrect) return 'text-emerald-600 font-bold';
  if (isSelected && !isCorrect) return 'text-red-600 line-through';
  
  return 'text-muted-foreground';
}
</script>

<template>
  <SNBTLayout
    test-title="SNBT: Persiapan Intensif"
    test-description="Subtes Literasi Bahasa Indonesia"
    unit-title="Unit 1: Menginterpretasi Makna Kata, Frasa, dan Istilah dalam Konteks"
    unit-description="Kemampuan ini menguji pemahaman mendalam Anda terhadap makna sebuah kata atau frasa yang penggunaannya sangat terikat pada konteks kalimat dan keseluruhan bacaan. Anda harus mampu melampaui makna harfiah dan menangkap nuansa yang dimaksud penulis."
    :categories="['Literasi Bahasa Indonesia', 'Makna Kontekstual', 'SNBT']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: Materi Pembelajaran                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Strategi Jitu Menguasai Makna Kontekstual</CardTitle>
          <CardDescription>Pahami cara kerja makna dalam teks agar tidak terjebak.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <p>Dalam soal Literasi Bahasa Indonesia, makna sebuah kata tidak bisa hanya mengandalkan hafalan kamus. Anda harus menjadi detektif linguistik. Berikut adalah strategi utamanya:</p>
          <div class="space-y-3 pl-4 border-l-2">
            <div>
              <h4 class="font-bold">1. Manfaatkan Petunjuk Kontekstual (Context Clues)</h4>
              <p class="text-muted-foreground">Penulis sering memberikan petunjuk di sekitar kata sulit. Cari sinyal seperti:</p>
              <ul class="list-disc list-inside pl-4 mt-1 space-y-1">
                <li><strong class="text-primary/90">Definisi Langsung:</strong> Penggunaan kata "adalah", "yaitu", "yakni", atau tanda koma dan tanda kurung.</li>
                <li><strong class="text-primary/90">Sinonim/Antonim:</strong> Kehadiran kata lain yang bermakna mirip atau berlawanan dalam kalimat yang sama atau berdekatan.</li>
                <li><strong class="text-primary/90">Contoh Spesifik:</strong> Penulis memberikan contoh untuk menjelaskan sebuah istilah abstrak atau teknis.</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold">2. Bedakan Denotasi dan Konotasi</h4>
              <ul class="list-disc list-inside pl-4 mt-1 space-y-1">
                <li><strong class="text-primary/90">Denotasi:</strong> Makna harfiah, objektif, sesuai kamus. (Contoh: "kursi" adalah tempat duduk).</li>
                <li><strong class="text-primary/90">Konotasi:</strong> Makna kiasan atau asosiasi emosional yang melekat. (Contoh: "berebut kursi" berarti berebut jabatan). Soal SNBT sering menguji pemahaman konotatif.</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold">3. Waspadai Istilah Teknis dan Idiom</h4>
               <p class="text-muted-foreground">Teks SNBT sering diambil dari jurnal ilmiah, artikel berita, atau esai. Kenali:</p>
              <ul class="list-disc list-inside pl-4 mt-1 space-y-1">
                <li><strong class="text-primary/90">Istilah Teknis:</strong> Kata dengan makna spesifik di bidang ilmu tertentu (misal: "hegemoni" dalam sosiologi, "sublimasi" dalam psikologi).</li>
                <li><strong class="text-primary/90">Ungkapan Idiomatik:</strong> Gabungan kata yang maknanya berbeda dari makna kata-kata pembentuknya (misal: "kambing hitam", "tangan kanan").</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Latihan Soal Interaktif                                           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal</CardTitle>
          <CardDescription>Uji pemahaman Anda dengan soal-soal setara SNBT berikut. Baca teks dengan cermat!</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <p class="text-sm font-semibold mb-2 bg-muted p-3 rounded-md leading-relaxed whitespace-pre-wrap font-serif">{{ q.passage }}</p>
            <h4 class="font-semibold mb-4">{{ index + 1 }}. {{ q.question }}</h4>
            <RadioGroup :value="userAnswers[q.id]?.toString()" @update:model-value="(value) => selectAnswer(q.id, Number(value))" :disabled="showResult" class="space-y-2">
              <div v-for="(option, optIndex) in q.options" :key="optIndex" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${q.id}-opt${optIndex}`" :value="optIndex.toString()" />
                <Label :for="`q${q.id}-opt${optIndex}`" :class="getOptionClass(q.id, optIndex)" class="leading-tight transition-colors duration-300">
                  {{ option }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" @click="checkAnswers" class="w-full">Periksa Jawaban</Button>
          <Button v-else @click="resetQuiz" variant="outline" class="w-full">Coba Lagi</Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: Hasil & Pembahasan                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="border-t-4 border-primary">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
            <CardDescription>Analisis hasil pengerjaan Anda untuk pemahaman yang lebih dalam.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div class="flex-1 space-y-2">
                <p class="text-sm font-medium">Skor Total</p>
                <p class="text-3xl font-bold">{{ score }} / {{ totalQuestions }} Benar</p>
              </div>
              <div class="relative h-24 w-24">
                <svg class="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-gray-700" stroke-width="2"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-primary" stroke-width="2" stroke-dasharray="100" :stroke-dashoffset="100 - scorePercentage" stroke-linecap="round" transform="rotate(-90 18 18)"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">{{ scorePercentage }}%</div>
              </div>
            </div>

            <!-- Detailed Review Section -->
            <div class="space-y-2">
              <h3 class="font-semibold text-lg">Pembahasan Rinci</h3>
              <p class="text-sm text-muted-foreground">Perhatikan di mana letak kesalahan dan pahami logika di balik jawaban yang benar.</p>
            </div>

            <div v-for="(q, index) in questions" :key="`result-${q.id}`" class="border-t pt-4">
              <h4 class="font-semibold mb-2">{{ index + 1 }}. {{ q.question }}</h4>
              
              <div v-if="userAnswers[q.id] === q.correctAnswer">
                <Alert variant="default" class="bg-emerald-50 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-800">
                  <CheckCircle2 class="h-4 w-4 text-emerald-600" />
                  <AlertTitle class="text-emerald-700 dark:text-emerald-400">Jawaban Benar</AlertTitle>
                  <AlertDescription class="text-emerald-700 dark:text-emerald-500">
                    Pilihan Anda: "{{ q.options[userAnswers[q.id]!] }}"
                  </AlertDescription>
                </Alert>
              </div>
              <div v-else>
                <Alert variant="destructive">
                  <XCircle class="h-4 w-4" />
                  <AlertTitle>Jawaban Salah</AlertTitle>
                  <AlertDescription>
                    Pilihan Anda: "{{ q.options[userAnswers[q.id]!] }}"
                    <br>
                    Jawaban yang Benar: <strong class="font-semibold">"{{ q.options[q.correctAnswer] }}"</strong>
                  </AlertDescription>
                </Alert>
              </div>

              <Alert variant="outline" class="mt-3">
                <HelpCircle class="h-4 w-4" />
                <AlertTitle>Penjelasan</AlertTitle>
                <AlertDescription>
                  {{ q.explanation }}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="resetQuiz" class="w-full">Ulangi Latihan</Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Menambahkan transisi yang mulus untuk elemen hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>