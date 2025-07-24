<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Import Layout & Komponen UI (Asumsi komponen ini ada di proyek Anda)
import SNBTLayout from '@/layouts/SNBTLayout.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit, BarChart } from 'lucide-vue-next'

// --- Navigasi ---
const router = useRouter()
const route = useRoute()
const unitNumber = ref(0)

onMounted(() => {
  const path = route.path
  const match = path.match(/unit(\d+)/)
  if (match && match[1]) {
    unitNumber.value = parseInt(match[1], 10)
  }
})

function goToPreviousUnit() {
  if (unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  }
}

function goToNextUnit() {
  // Anda bisa menambahkan batas atas jika tahu jumlah total unit
  router.push(`/units/lbi/unit${unitNumber.value + 1}`)
}

// --- Konten Latihan & State Manajemen ---
const practiceText = `
<h4 class="font-semibold text-lg mb-2">Paradoks Produktivitas Kecerdasan Buatan (AI)</h4>
<p class="text-justify indent-8">Euforia mengenai potensi kecerdasan buatan (AI) dalam merevolusi dunia kerja sering kali mengaburkan sebuah fenomena yang lebih kompleks: paradoks produktivitas. Sejak diperkenalkannya teknologi komputasi canggih, para ekonom telah mengantisipasi lonjakan produktivitas yang masif. Namun, data statistik makroekonomi secara konsisten gagal menunjukkan akselerasi pertumbuhan produktivitas yang diharapkan, bahkan di tengah adopsi AI yang semakin meluas. Fenomena ini, di mana investasi teknologi besar tidak segera berkorelasi dengan peningkatan output per jam kerja yang signifikan, memunculkan perdebatan sengit di kalangan analis.</p>
<p class="text-justify indent-8 mt-4">Sebagian kalangan berpendapat bahwa kita berada dalam fase jeda (lag phase). Mereka berargumen bahwa teknologi transformatif seperti AI memerlukan waktu untuk matang dan terintegrasi sepenuhnya ke dalam proses bisnis. Perusahaan tidak hanya perlu mengadopsi perangkat lunak, tetapi juga harus merestrukturisasi alur kerja, melatih kembali tenaga kerja, dan mengembangkan model bisnis baru. Proses adaptasi fundamental inilah yang memperlambat realisasi keuntungan produktivitas. Pandangan optimis ini menyiratkan bahwa ledakan produktivitas hanyalah masalah waktu.</p>
<p class="text-justify indent-8 mt-4">Di sisi lain, spektrum pesimis menyajikan pandangan yang lebih suram. Mereka menyoroti bahwa banyak aplikasi AI saat ini lebih difokuskan pada aktivitas 'zero-sum', seperti periklanan terprogram yang canggih atau perdagangan frekuensi tinggi, yang hanya menggeser keuntungan dari satu entitas ke entitas lain tanpa menciptakan nilai ekonomi baru yang substansial. Lebih jauh lagi, ada kekhawatiran bahwa AI dapat menghambat produktivitas melalui penciptaan distraksi digital yang masif dan pekerjaan administratif baru yang terkait dengan pengelolaan sistem AI itu sendiri. Dengan demikian, alih-alih menjadi pembebas, AI justru berisiko menjadi belenggu birokrasi digital yang baru.</p>
<p class="text-justify indent-8 mt-4">Pada akhirnya, narasi tunggal yang menggambarkan AI sebagai penyelamat atau perusak produktivitas agaknya terlalu menyederhanakan masalah. Realitasnya mungkin jauh lebih bernuansa. Dampak AI terhadap produktivitas kemungkinan besar akan sangat bervariasi antar industri dan bergantung pada bagaimana teknologi ini diimplementasikan—apakah untuk augmentasi (memperkuat) kemampuan manusia atau sekadar automasi (menggantikan) tugas-tugas yang ada. Kunci untuk membuka potensi AI tampaknya tidak terletak pada teknologinya semata, melainkan pada kebijaksanaan strategis dalam penerapannya.</p>
`

const questions = reactive([
  {
    id: 1,
    question: "Apakah tujuan utama penulis dalam menyajikan teks di atas?",
    options: [
      { key: 'A', text: 'Meyakinkan pembaca bahwa AI pada akhirnya akan meningkatkan produktivitas secara drastis.' },
      { key: 'B', text: 'Menunjukkan bukti-bukti kegagalan AI dalam memenuhi janjinya di dunia kerja.' },
      { key: 'C', text: 'Menjelaskan secara seimbang perdebatan kompleks mengenai dampak AI terhadap produktivitas yang belum terbukti.' },
      { key: 'D', text: 'Mengkritik perusahaan yang lamban dalam mengadopsi teknologi AI untuk efisiensi.' },
      { key: 'E', text: 'Mempromosikan penggunaan AI untuk augmentasi kemampuan manusia daripada automasi.' },
    ],
    correctAnswer: 'C',
    explanation: `
      <p><strong>Jawaban yang benar adalah C.</strong> Tujuan utama penulis adalah untuk menyajikan sebuah perdebatan yang kompleks dari dua sisi secara berimbang.</p>
      <ul>
        <li class="mt-2"><strong>Analisis Teks:</strong> Paragraf pertama memperkenalkan "paradoks produktivitas". Paragraf kedua menyajikan "pandangan optimis" (fase jeda). Paragraf ketiga menyajikan "spektrum pesimis" (aktivitas zero-sum). Paragraf terakhir menyimpulkan bahwa realitasnya "jauh lebih bernuansa" dan tidak sesederhana narasi tunggal. Struktur ini jelas menunjukkan tujuan untuk menjelaskan perdebatan, bukan memihak salah satu sisi.</li>
        <li class="mt-2"><strong>Mengapa Pilihan Lain Salah:</strong>
          <ul>
            <li><strong>A:</strong> Ini hanya mewakili satu sisi argumen (pandangan optimis di paragraf 2), bukan tujuan keseluruhan teks.</li>
            <li><strong>B:</strong> Ini hanya mewakili sisi argumen pesimis (paragraf 3), dan kata "kegagalan" terlalu kuat. Teks menyatakan "belum terbukti", bukan "gagal total".</li>
            <li><strong>D:</strong> Teks tidak mengkritik perusahaan, melainkan menjelaskan bahwa restrukturisasi di perusahaan adalah salah satu alasan jeda produktivitas, sebuah penjelasan netral.</li>
            <li><strong>E:</strong> Meskipun disebutkan di akhir sebagai kunci potensial, ini adalah simpulan atau pandangan penulis tentang jalan ke depan, bukan tujuan utama dari keseluruhan teks yang bersifat ekspositoris dan argumentatif-seimbang.</li>
          </ul>
        </li>
      </ul>
    `
  },
  {
    id: 2,
    question: "Bagaimana sikap penulis terhadap topik yang dibahas?",
    options: [
      { key: 'A', text: 'Optimistis dan pro-teknologi' },
      { key: 'B', text: 'Pesimistis dan skeptis' },
      { key: 'C', text: 'Antusias namun cemas' },
      { key: 'D', text: 'Analisitis, objektif, dan hati-hati' },
      { key: 'E', 'text': 'Sarkastis dan meremehkan' }
    ],
    correctAnswer: 'D',
    explanation: `
      <p><strong>Jawaban yang benar adalah D.</strong> Sikap penulis paling tepat dideskripsikan sebagai analitis, objektif, dan hati-hati.</p>
      <ul>
        <li class="mt-2"><strong>Analisis Pilihan Kata (Diksi):</strong> Penulis menggunakan frasa seperti "fenomena yang lebih kompleks", "memunculkan perdebatan sengit", "sebagian kalangan berpendapat", "di sisi lain", dan "realitasnya mungkin jauh lebih bernuansa". Pilihan kata ini menunjukkan upaya untuk melihat masalah dari berbagai sudut pandang tanpa emosi berlebih.</li>
        <li class="mt-2"><strong>Struktur Argumen:</strong> Penulis menyajikan dua pandangan yang berlawanan (optimis vs. pesimis) dengan porsi yang relatif seimbang sebelum memberikan sintesis di akhir. Ini adalah ciri khas tulisan analitis dan objektif.</li>
        <li class="mt-2"><strong>Mengapa Pilihan Lain Salah:</strong>
          <ul>
            <li><strong>A & B:</strong> Penulis menyajikan kedua pandangan ini, tetapi tidak mengadopsi salah satunya sebagai sikap pribadinya.</li>
            <li><strong>C:</strong> Tidak ada bukti kecemasan atau antusiasme yang kuat dalam teks. Nadanya cenderung akademis dan terkendali.</li>
            <li><strong>E:</strong> Sama sekali tidak ada jejak sarkasme atau peremehan. Teks memperlakukan semua argumen dengan serius.</li>
          </ul>
        </li>
      </ul>
    `
  },
  {
    id: 3,
    question: "Berdasarkan argumen yang disajikan, keberpihakan penulis paling condong kepada...",
    options: [
      { key: 'A', text: 'Para ekonom yang meyakini ledakan produktivitas akan segera terjadi.' },
      { key: 'B', text: 'Para analis pesimis yang khawatir AI menciptakan birokrasi digital baru.' },
      { key: 'C', text: 'Perusahaan teknologi yang mengembangkan dan menjual solusi AI.' },
      { key: 'D', text: 'Para pembuat kebijakan dan pemimpin bisnis yang harus membuat keputusan strategis.' },
      { key: 'E', text: 'Para pekerja yang terancam oleh automasi tugas.' },
    ],
    correctAnswer: 'D',
    explanation: `
      <p><strong>Jawaban yang benar adalah D.</strong> Meskipun teksnya objektif, simpulan akhirnya secara implisit berpihak atau ditujukan kepada para pengambil keputusan.</p>
      <ul>
        <li class="mt-2"><strong>Analisis Simpulan:</strong> Kalimat terakhir, "Kunci untuk membuka potensi AI tampaknya tidak terletak pada teknologinya semata, melainkan pada <strong>kebijaksanaan strategis dalam penerapannya</strong>," adalah sebuah nasihat atau arahan. Siapakah yang melakukan "penerapan" dan membuat "keputusan strategis"? Mereka adalah para pembuat kebijakan dan pemimpin bisnis. Penulis menekankan bahwa hasil akhir bergantung pada keputusan mereka.</li>
        <li class="mt-2"><strong>Fokus pada "Bagaimana":</strong> Penekanan teks bergeser dari "apakah AI bermanfaat" menjadi "bagaimana membuatnya bermanfaat". Ini adalah pergeseran dari perdebatan akademis ke implikasi praktis, yang relevan bagi para praktisi dan pengambil keputusan.</li>
        <li class="mt-2"><strong>Mengapa Pilihan Lain Salah:</strong>
          <ul>
            <li><strong>A & B:</strong> Penulis memaparkan pandangan mereka tetapi tidak serta merta setuju. Ia justru menyebut narasi mereka "terlalu menyederhanakan masalah".</li>
            <li><strong>C:</strong> Tidak ada dalam teks yang menunjukkan keberpihakan kepada perusahaan teknologi. Justru, aktivitas 'zero-sum' yang dilakukan beberapa teknologi AI (seperti periklanan) disorot secara kritis.</li>
            <li><strong>E:</strong> Isu pekerja hanya disentuh secara tidak langsung melalui konsep restrukturisasi dan pelatihan. Fokus utama teks bukanlah pada nasib pekerja, melainkan pada data produktivitas makroekonomi dan strategi implementasi.</li>
          </ul>
        </li>
      </ul>
    `
  }
])

const userAnswers = reactive<Record<number, string>>({})
const showResult = ref(false)

const score = computed(() => {
  if (!showResult.value) return 0
  const correctCount = questions.reduce((count, q) => {
    return userAnswers[q.id] === q.correctAnswer ? count + 1 : count
  }, 0)
  return (correctCount / questions.length) * 100
})

const allQuestionsAnswered = computed(() => {
  return Object.keys(userAnswers).length === questions.length;
})

function checkAnswers() {
  if (!allQuestionsAnswered.value) {
    alert('Harap jawab semua pertanyaan terlebih dahulu!');
    return;
  }
  showResult.value = true
  // Scroll to result section for better UX
  setTimeout(() => {
    const resultElement = document.getElementById('result-section');
    resultElement?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function getOptionText(questionId: number, key: string): string {
  const question = questions.find(q => q.id === questionId);
  const option = question?.options.find(o => o.key === key);
  return option?.text || 'Tidak terjawab';
}
</script>

<template>
  <SNBTLayout
    test-title="SNBT 2025 - Tes Potensi Skolastik (TPS)"
    test-description="Literasi Bahasa Indonesia"
    :unit-title="`Unit ${unitNumber}: Mengidentifikasi Tujuan dan Sikap Penulis`"
    unit-description="Materi ini melatih kemampuan Anda untuk menganalisis secara kritis bagaimana seorang penulis menyampaikan pesan, keberpihakan, dan pandangannya melalui tulisan."
    :categories="['Pemahaman Bacaan', 'Analisis Teks', 'Penalaran Kritis']"
    :show-result="showResult"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT MATERI PEMBELAJARAN                                                -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-blue-500" />
            <span>Materi Pembelajaran</span>
          </CardTitle>
          <CardDescription>Pahami konsep inti sebelum berlatih.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-gray-700">
          <p>
            Mengidentifikasi tujuan dan sikap penulis adalah keterampilan krusial dalam literasi. Anda tidak hanya membaca apa yang tertulis, tetapi juga memahami <strong>mengapa</strong> dan <strong>bagaimana</strong> teks itu ditulis.
          </p>

          <h4 class="font-semibold mt-4">1. Tujuan Penulis (Author's Purpose)</h4>
          <p>Tujuan adalah alasan utama penulis membuat sebuah tulisan. Secara umum, tujuan dapat dikategorikan menjadi:</p>
          <ul class="list-disc pl-5">
            <li><strong>Informatif/Ekspositoris:</strong> Memberikan informasi, menjelaskan, atau menguraikan suatu topik secara objektif. Contoh: berita, artikel ensiklopedia.</li>
            <li><strong>Persuasif:</strong> Mengajak atau meyakinkan pembaca untuk setuju dengan pandangan atau melakukan sesuatu. Contoh: iklan, editorial, pidato kampanye.</li>
            <li><strong>Argumentatif:</strong> Menyajikan argumen yang didukung bukti untuk membahas suatu isu, sering kali menyajikan pro dan kontra. Tujuannya adalah meyakinkan secara logis.</li>
            <li><strong>Naratif:</strong> Menceritakan sebuah kisah atau rangkaian peristiwa. Contoh: cerpen, novel.</li>
            <li><strong>Deskriptif:</strong> Menggambarkan sesuatu (orang, tempat, benda) secara detail agar pembaca dapat membayangkannya.</li>
          </ul>

          <h4 class="font-semibold mt-4">2. Sikap & Nada Penulis (Author's Attitude/Tone)</h4>
          <p>Sikap adalah perasaan atau pandangan penulis terhadap subjek yang dibahas. Ini tercermin melalui nada (tone) tulisan.</p>
          <ul class="list-disc pl-5">
            <li><strong>Objektif/Netral:</strong> Penulis tidak menunjukkan emosi atau keberpihakan. Fokus pada fakta.</li>
            <li><strong>Subjektif:</strong> Penulis melibatkan perasaan dan opini pribadi.</li>
            <li><strong>Simpatik:</strong> Menunjukkan rasa kasihan atau dukungan.</li>
            <li><strong>Kritis:</strong> Menilai atau menunjukkan kekurangan/kelemahan.</li>
            <li><strong>Optimis/Pesimis:</strong> Menunjukkan pandangan positif atau negatif terhadap masa depan.</li>
            <li><strong>Ironis/Sarkastis:</strong> Mengatakan sesuatu yang berlawanan dengan makna sebenarnya untuk menyindir.</li>
          </ul>

          <h4 class="font-semibold mt-4">3. Keberpihakan Penulis (Author's Bias)</h4>
          <p>Keberpihakan adalah kecenderungan penulis untuk memihak satu sisi dari suatu isu. Ini sering kali tersirat dan tidak dinyatakan secara langsung.</p>
          
          <Card class="mt-4 bg-blue-50 border-blue-200">
            <CardHeader class="pb-2">
              <CardTitle class="text-base flex items-center gap-2">
                <BrainCircuit class="h-5 w-5 text-blue-600" />
                Tips & Trik Menganalisis
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm">
              <ol class="list-decimal pl-5 space-y-2">
                <li><strong>Perhatikan Pilihan Kata (Diksi):</strong> Apakah penulis menggunakan kata-kata bermuatan emosi (misal: "bencana", "ancaman") atau kata-kata netral (misal: "dampak", "konsekuensi")?</li>
                <li><strong>Analisis Nada (Tone):</strong> Bacalah seolah-olah Anda mendengarnya. Apakah nadanya formal, santai, mendesak, atau meremehkan?</li>
                <li><strong>Cermati Sumber dan Data:</strong> Apakah penulis hanya mengutip sumber yang mendukung pandangannya? Apakah data disajikan secara utuh atau hanya sebagian?</li>
                <li><strong>Lihat Struktur Argumen:</strong> Apakah penulis menyajikan pandangan lain secara adil, atau hanya untuk kemudian menyanggahnya dengan lemah (strawman argument)?</li>
              </ol>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL                                                       -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BarChart class="h-6 w-6 text-green-500" />
            <span>Latihan Soal</span>
          </CardTitle>
          <CardDescription>Bacalah teks berikut dengan saksama, lalu jawab pertanyaannya.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="p-4 mb-6 rounded-lg bg-slate-50 border border-slate-200 prose prose-sm max-w-none text-gray-800" v-html="practiceText"></div>
          
          <div class="space-y-8">
            <div v-for="(q, index) in questions" :key="q.id">
              <p class="font-semibold mb-3">{{ index + 1 }}. {{ q.question }}</p>
              <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
                <div v-for="option in q.options" :key="option.key" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`q${q.id}-${option.key}`" :value="option.key" />
                  <Label :for="`q${q.id}-${option.key}`" class="leading-snug">{{ option.text }}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="checkAnswers" :disabled="!allQuestionsAnswered" class="w-full">
            <span v-if="allQuestionsAnswered">Koreksi Jawaban</span>
            <span v-else>Jawab Semua Soal untuk Koreksi</span>
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT HASIL & PEMBAHASAN                                                 -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle>Hasil dan Pembahasan</CardTitle>
            <CardDescription>
              Skor Anda: <strong class="text-2xl font-bold" :class="score > 70 ? 'text-green-600' : 'text-red-600'">{{ score.toFixed(0) }} / 100</strong>
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <Alert 
              v-for="(q, index) in questions" 
              :key="`res-${q.id}`"
              :variant="userAnswers[q.id] === q.correctAnswer ? 'default' : 'destructive'"
              class="border-l-4"
              :class="{
                'border-green-500 bg-green-50': userAnswers[q.id] === q.correctAnswer,
                'border-red-500 bg-red-50': userAnswers[q.id] !== q.correctAnswer
              }"
            >
              <component :is="userAnswers[q.id] === q.correctAnswer ? CheckCircle2 : XCircle" class="h-5 w-5" />
              <AlertTitle class="font-bold">
                Soal #{{ index + 1 }} - {{ userAnswers[q.id] === q.correctAnswer ? 'Benar' : 'Kurang Tepat' }}
              </AlertTitle>
              <AlertDescription class="prose prose-sm max-w-none">
                <p class="font-medium text-gray-800">{{ q.question }}</p>
                <div class="mt-2 text-xs">
                  <p>Jawaban Anda: <span class="font-semibold">{{ getOptionText(q.id, userAnswers[q.id]) }}</span></p>
                  <p>Jawaban Benar: <span class="font-semibold">{{ getOptionText(q.id, q.correctAnswer) }}</span></p>
                </div>
                <div class="mt-4 p-3 rounded-md bg-slate-100 border border-slate-200">
                  <h5 class="font-bold text-gray-900">Pembahasan Mendalam:</h5>
                  <div class="mt-1 text-gray-700" v-html="q.explanation"></div>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style>
/* Menambahkan styling untuk konten yang di-render dari v-html agar lebih rapi */
.prose ul {
  list-style-position: inside;
}
.prose ol {
  list-style-position: inside;
}
</style>