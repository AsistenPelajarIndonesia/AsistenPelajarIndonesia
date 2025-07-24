<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Import Layout dan Komponen UI
import SNBTLayout from '@/layouts/SNBTLayout.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-vue-next'

// Tentukan metadata halaman untuk SEO dan kejelasan
definePageMeta({
  layout: false, // Kita akan menggunakan SNBTLayout secara manual di dalam template
})

// --- Navigasi ---
const router = useRouter()
const route = useRoute()

// Secara dinamis mengambil nomor unit dari URL
const currentUnitNumber = computed(() => {
  const match = route.path.match(/unit(\d+)/)
  return match ? parseInt(match[1], 10) : 0
})

// Fungsi untuk navigasi ke unit sebelumnya
function goToPreviousUnit() {
  if (currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  }
  else {
    // Mungkin arahkan ke halaman daftar unit jika ini unit pertama
    router.push('/units/lbi')
  }
}

// Fungsi untuk navigasi ke unit berikutnya
function goToNextUnit() {
  // Ganti `5` dengan jumlah total unit yang Anda miliki
  const totalUnits = 5 
  if (currentUnitNumber.value < totalUnits) {
    router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
  } else {
    // Mungkin arahkan ke halaman rangkuman jika ini unit terakhir
    router.push('/dashboard')
  }
}

// --- State Management untuk Latihan ---
const questions = reactive([
  {
    id: 'q1',
    passage: `(1) Inovasi dalam teknologi finansial (fintech) telah mengubah lanskap layanan perbankan secara fundamental. (2) Kehadiran dompet digital, platform pinjaman online (peer-to-peer lending), dan investasi robo-advisor memberikan kemudahan akses bagi masyarakat yang sebelumnya tidak tersentuh layanan perbankan konvensional. (3) Regulasi yang ketat dari Otoritas Jasa Keuangan (OJK) sering kali dianggap sebagai penghambat laju inovasi di sektor ini. (4) Model bisnis baru ini mendorong bank-bank tradisional untuk beradaptasi dengan melakukan digitalisasi layanan mereka agar tidak kehilangan nasabah. (5) Dengan demikian, persaingan yang sehat antara fintech dan bank konvensional pada akhirnya menguntungkan konsumen melalui layanan yang lebih efisien dan beragam.`,
    question: `Kalimat manakah yang mengganggu kepaduan paragraf di atas?`,
    options: [
      { id: 'q1a', value: 'a', label: 'Kalimat (1)' },
      { id: 'q1b', value: 'b', label: 'Kalimat (2)' },
      { id: 'q1c', value: 'c', label: 'Kalimat (3)' },
      { id: 'q1d', value: 'd', label: 'Kalimat (4)' },
      { id: 'q1e', value: 'e', label: 'Kalimat (5)' },
    ],
    correctAnswer: 'c',
    userAnswer: ref(null),
    explanation: `Paragraf ini secara konsisten membahas dampak positif dan dinamika persaingan yang diciptakan oleh fintech terhadap industri perbankan (kalimat 1, 2, 4, 5). Gagasan utamanya adalah tentang transformasi positif dan adaptasi. Kalimat (3) menyimpang dari gagasan utama tersebut dengan memperkenalkan topik negatif tentang regulasi yang menghambat inovasi. Topik ini tidak dikembangkan lebih lanjut dan memecah alur logika paragraf yang seharusnya fokus pada dampak dan persaingan yang menguntungkan konsumen. Oleh karena itu, kalimat (3) adalah kalimat sumbang yang merusak kepaduan teks.`
  },
  {
    id: 'q2',
    passage: `Letusan gunung berapi bawah laut di Tonga pada awal tahun 2022 tercatat sebagai salah satu yang terkuat dalam sejarah modern, melepaskan energi setara dengan ratusan bom atom Hiroshima. Dampak atmosferiknya terasa di seluruh dunia, menyebabkan gelombang kejut yang mengelilingi bumi beberapa kali dan memicu tsunami di berbagai pesisir Pasifik. [...] Selain itu, injeksi uap air dalam jumlah masif ke stratosfer berpotensi memengaruhi iklim global, meskipun sifat dan durasi pengaruhnya masih menjadi subjek penelitian intensif oleh para ilmuwan. Analisis data satelit dan pemodelan iklim menjadi kunci untuk memahami konsekuensi jangka panjang dari fenomena alam yang luar biasa ini.`,
    question: `Kalimat yang paling tepat untuk melengkapi bagian rumpang pada paragraf tersebut adalah...`,
    options: [
      { id: 'q2a', value: 'a', label: 'Masyarakat lokal di sekitar Tonga mengalami kerusakan infrastruktur yang parah dan membutuhkan bantuan kemanusiaan segera.' },
      { id: 'q2b', value: 'b', label: 'Letusan tersebut juga melontarkan volume abu vulkanik dan gas sulfur dioksida yang signifikan ke lapisan atmosfer atas.' },
      { id: 'q2c', value: 'c', label: 'Gunung berapi bawah laut sering kali tidak terdeteksi oleh sistem pemantauan seismik tradisional.' },
      { id: 'q2d', value: 'd', label: 'Tsunami yang diakibatkannya memiliki karakteristik yang berbeda dari tsunami yang disebabkan oleh gempa bumi.' },
      { id: 'q2e', value: 'e', label: 'Sejarah mencatat beberapa letusan dahsyat lainnya, seperti Krakatau pada tahun 1883 dan Pinatubo pada tahun 1991.' },
    ],
    correctAnswer: 'b',
    userAnswer: ref(null),
    explanation: `Paragraf tersebut membahas dampak atmosferik dan global dari letusan gunung Tonga. Kalimat sebelum bagian rumpang membahas "gelombang kejut" dan "tsunami" sebagai dampak. Kalimat sesudah bagian rumpang, yang diawali dengan "Selain itu,", membahas "injeksi uap air" sebagai dampak lain yang memengaruhi iklim. Untuk menjaga kelengkapan dan kepaduan, kalimat rumpang harus menjembatani kedua gagasan tersebut dengan memperkenalkan dampak atmosferik lainnya. Pilihan (b) adalah yang paling logis karena membahas "abu vulkanik dan gas sulfur dioksida", yang merupakan produk letusan yang relevan dengan dampak atmosfer dan iklim, sehingga menciptakan transisi yang mulus ke pembahasan tentang "uap air" dan "iklim global". Pilihan lain (a, c, d, e) membahas topik yang berbeda (dampak lokal, deteksi, karakteristik tsunami, perbandingan historis) dan tidak cocok dengan alur paragraf.`
  },
  {
    id: 'q3',
    passage: `Argumentasi utama dalam wacana diet modern sering kali berpusat pada pengurangan karbohidrat sebagai strategi efektif untuk menurunkan berat badan. Teori di baliknya menyatakan bahwa asupan karbohidrat yang rendah memaksa tubuh untuk beralih menggunakan cadangan lemak sebagai sumber energi utama, sebuah proses yang dikenal sebagai ketosis. Pendukung diet ini mengklaim bahwa selain penurunan berat badan, pola makan rendah karbohidrat juga dapat meningkatkan sensitivitas insulin dan mengurangi risiko penyakit metabolik. Mereka menunjuk pada berbagai studi jangka pendek yang menunjukkan hasil signifikan. Namun, para kritikus menyoroti bahwa banyak dari studi tersebut tidak mempertimbangkan keberlanjutan jangka panjang dan potensi efek samping, seperti kekurangan mikronutrien dan gangguan fungsi ginjal.`,
    question: `Manakah pernyataan di bawah ini yang, jika benar, akan PALING MELEMAHKAN argumen pendukung diet rendah karbohidrat yang dijelaskan dalam teks?`,
    options: [
      { id: 'q3a', value: 'a', label: 'Sebuah studi meta-analisis terbaru menemukan bahwa tidak ada perbedaan signifikan dalam penurunan berat badan jangka panjang (lebih dari 2 tahun) antara diet rendah karbohidrat dan diet seimbang rendah kalori.' },
      { id: 'q3b', value: 'b', label: 'Banyak atlet ketahanan melaporkan peningkatan performa setelah beradaptasi dengan diet ketogenik.' },
      { id: 'q3c', value: 'c', label: 'Sumber karbohidrat kompleks seperti biji-bijian utuh dan polong-polongan memiliki indeks glikemik yang rendah.' },
      { id: 'q3d', value: 'd', label: 'Proses ketosis dapat menimbulkan efek samping sementara seperti "keto flu" pada beberapa individu di awal diet.' },
      { id: 'q3e', value: 'e', label: 'Pemerintah di beberapa negara mulai merekomendasikan pembatasan asupan gula tambahan dalam pedoman diet nasional.' },
    ],
    correctAnswer: 'a',
    userAnswer: ref(null),
    explanation: `Argumen utama pendukung diet rendah karbohidrat adalah efektivitasnya untuk menurunkan berat badan (dan manfaat metabolik lainnya). Argumen ini didukung oleh "studi jangka pendek". Untuk melemahkan argumen ini secara fundamental, kita perlu bukti yang menantang klaim efektivitasnya, terutama dari perspektif yang lebih komprehensif. Pilihan (a) secara langsung menyerang klaim utama dengan menyajikan bukti dari "meta-analisis" (tingkat bukti ilmiah yang tinggi) yang menunjukkan bahwa keunggulan diet ini HILANG dalam jangka panjang. Ini secara efektif meruntuhkan klaim superioritas diet rendah karbohidrat. Pilihan (b) justru menguatkan. Pilihan (c) dan (e) relevan dengan nutrisi secara umum tetapi tidak secara langsung melemahkan argumen utama. Pilihan (d) hanya menyebutkan efek samping sementara yang sudah umum diketahui dan tidak menantang klaim efektivitas jangka panjang.`
  },
])

// State untuk menampilkan hasil dan skor
const isSubmitted = ref(false)
const showResult = ref(false)

// Menghitung skor berdasarkan jawaban yang benar
const score = computed(() => {
  const correctCount = questions.reduce((count, q) => {
    return q.userAnswer.value === q.correctAnswer ? count + 1 : count
  }, 0)
  return Math.round((correctCount / questions.length) * 100)
})

// Fungsi untuk memvalidasi jawaban
function validateAnswers() {
  isSubmitted.value = true
  showResult.value = true
  // Scroll ke bagian hasil untuk UX yang lebih baik
  setTimeout(() => {
    const resultElement = document.getElementById('result-section')
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

// Fungsi untuk mengulang latihan
function resetQuiz() {
  isSubmitted.value = false
  showResult.value = false
  questions.forEach(q => {
    q.userAnswer.value = null
  })
   // Scroll kembali ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <SNBTLayout
    test-title="Literasi Bahasa Indonesia"
    test-description="Subtes untuk mengukur kemampuan memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks."
    :unit-title="`Unit ${currentUnitNumber}: Mengevaluasi Kepaduan dan Kelengkapan Isi Teks`"
    unit-description="Kemampuan krusial untuk mengidentifikasi gagasan utama, mengenali hubungan logis antar kalimat, dan menilai apakah sebuah teks utuh dan tidak sumbang."
    :categories="['Analisis Teks', 'Logika Wacana', 'Penalaran Kritis']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT MATERI PEMBELAJARAN                                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Konsep Inti Kepaduan & Kelengkapan</CardTitle>
          <CardDescription>
            Pahami dua pilar utama yang membangun sebuah teks yang baik.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger class="text-base font-semibold">Apa itu Kepaduan (Kohesi)?</AccordionTrigger>
              <AccordionContent class="text-muted-foreground">
                <div class="space-y-3">
                  <p>
                    Kepaduan atau kohesi adalah hubungan antarkalimat di dalam sebuah paragraf yang terjalin secara logis dan gramatikal. Paragraf yang padu terasa mengalir lancar karena setiap kalimatnya saling terkait, membangun satu gagasan utama yang utuh.
                  </p>
                  <p>Elemen kunci kepaduan meliputi:</p>
                  <ul class="list-disc space-y-2 pl-5">
                    <li>
                      <strong>Pengacuan (Referensi):</strong> Penggunaan kata ganti (pronomina) seperti <em>ia, mereka, -nya</em>, atau kata petunjuk seperti <em>ini, itu, tersebut</em> untuk merujuk pada hal yang telah disebutkan sebelumnya.
                    </li>
                    <li>
                      <strong>Kata Hubung (Konjungsi):</strong> Penggunaan konjungsi antarkalimat seperti <em>oleh karena itu, dengan demikian, selain itu, namun, sebaliknya</em> untuk menunjukkan hubungan logis (sebab-akibat, penambahan, pertentangan).
                    </li>
                    <li>
                      <strong>Pengulangan (Repetisi):</strong> Pengulangan kata kunci untuk menjaga fokus pembicaraan.
                    </li>
                  </ul>
                  <Alert variant="destructive">
                    <HelpCircle class="h-4 w-4" />
                    <AlertTitle>Waspadai Kalimat Sumbang!</AlertTitle>
                    <AlertDescription>
                      Soal SNBT sering kali menguji kemampuan Anda menemukan kalimat yang TIDAK padu. Kalimat ini biasanya membahas topik yang berbeda atau bertentangan dengan gagasan utama paragraf.
                    </AlertDescription>
                  </Alert>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger class="text-base font-semibold">Apa itu Kelengkapan (Koherensi)?</AccordionTrigger>
              <AccordionContent class="text-muted-foreground">
                 <div class="space-y-3">
                    <p>
                      Kelengkapan atau koherensi berkaitan dengan isi atau substansi teks. Sebuah teks dianggap lengkap jika gagasan utamanya dikembangkan secara memadai oleh gagasan-gagasan penjelas. Tidak ada "lompatan logika" yang membuat pembaca bingung.
                    </p>
                    <p>Sebuah teks yang lengkap memiliki:</p>
                    <ul class="list-disc space-y-2 pl-5">
                      <li>
                        <strong>Gagasan Utama yang Jelas:</strong> Ada satu ide pokok yang menjadi fokus utama paragraf atau teks.
                      </li>
                      <li>
                        <strong>Gagasan Penjelas yang Relevan dan Cukup:</strong> Setiap kalimat penjelas harus mendukung dan mengelaborasi gagasan utama. Jumlahnya harus cukup untuk membuat gagasan utama menjadi jelas dan meyakinkan.
                      </li>
                    </ul>
                    <Alert>
                      <HelpCircle class="h-4 w-4" />
                      <AlertTitle>Perhatikan Bagian Rumpang!</AlertTitle>
                      <AlertDescription>
                        Soal SNBT sering meminta Anda melengkapi bagian teks yang hilang ([...]). Untuk menjawabnya, Anda harus memahami alur logika sebelum dan sesudah bagian rumpang tersebut agar kalimat pilihan Anda dapat menyambungkannya dengan sempurna.
                      </AlertDescription>
                    </Alert>
                 </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL (PRACTICE)                                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal Kritis</CardTitle>
          <CardDescription>
            Uji pemahaman Anda dengan soal-soal setingkat SNBT. Baca setiap teks dengan cermat.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <div class="mb-4">
              <h3 class="font-semibold mb-2">Teks untuk Soal Nomor {{ index + 1 }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{{ q.passage }}</p>
            </div>
            <p class="font-medium mb-4">{{ index + 1 }}. {{ q.question }}</p>
            <RadioGroup v-model="q.userAnswer.value" :disabled="isSubmitted">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2 mb-3">
                <RadioGroupItem :id="option.id" :value="option.value" />
                <Label :for="option.id" class="leading-snug">{{ option.label }}</Label>
              </div>
            </RadioGroup>
            <Separator v-if="index < questions.length - 1" class="mt-8" />
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="validateAnswers" :disabled="isSubmitted" class="w-full">
            Kumpulkan Jawaban & Lihat Pembahasan
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT HASIL DAN VALIDATOR                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gray-50/50 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle>Hasil & Pembahasan Lengkap</CardTitle>
            <CardDescription>
              Ini adalah bagian terpenting. Pelajari mengapa jawaban Anda benar atau salah untuk meningkatkan pemahaman.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Rangkuman Skor -->
            <div class="space-y-3">
              <h3 class="text-lg font-semibold">Skor Anda</h3>
              <div class="flex items-center gap-4">
                <span class="text-3xl font-bold">{{ score }} / 100</span>
                <Progress :model-value="score" class="w-[60%]" />
              </div>
              <p class="text-muted-foreground">
                {{ score === 100 ? 'Sempurna! Pemahaman Anda sangat solid.' : score >= 70 ? 'Bagus! Anda sudah di jalur yang benar.' : score >= 40 ? 'Cukup baik, tapi masih ada ruang untuk perbaikan.' : 'Jangan khawatir, mari pelajari pembahasannya untuk jadi lebih baik.' }}
              </p>
            </div>

            <Separator />

            <!-- Pembahasan Detail per Soal -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Analisis Jawaban</h3>
              <div v-for="(q, index) in questions" :key="`result-${q.id}`">
                <Alert :variant="q.userAnswer.value === q.correctAnswer ? 'default' : 'destructive'" class="border-l-4" :class="q.userAnswer.value === q.correctAnswer ? 'border-green-500' : 'border-red-500'">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <CheckCircle2 v-if="q.userAnswer.value === q.correctAnswer" class="h-6 w-6 text-green-500" />
                      <XCircle v-else class="h-6 w-6 text-red-500" />
                    </div>
                    <div class="flex-1 space-y-2">
                      <p class="font-semibold">Soal {{ index + 1 }}: {{ q.question }}</p>
                      <p class="text-sm">
                        Jawaban Anda:
                        <span class="font-bold" :class="q.userAnswer.value === q.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                          {{ q.options.find(opt => opt.value === q.userAnswer.value)?.label || 'Tidak dijawab' }}
                        </span>
                      </p>
                      <p class="text-sm">
                        Kunci Jawaban: <span class="font-bold text-primary">{{ q.options.find(opt => opt.value === q.correctAnswer)?.label }}</span>
                      </p>
                      <Accordion type="single" collapsible class="w-full">
                        <AccordionItem value="explanation">
                          <AccordionTrigger class="text-sm font-medium">Lihat Pembahasan Detail</AccordionTrigger>
                          <AccordionContent class="text-sm text-muted-foreground">
                            <p class="whitespace-pre-wrap leading-relaxed">{{ q.explanation }}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </Alert>
              </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button @click="resetQuiz" variant="outline" class="w-full">
              Coba Latihan Lagi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style>
/* Animasi fade untuk kemunculan hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>