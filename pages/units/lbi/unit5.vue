<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Layout dan Komponen UI (Asumsi dari shadcn-vue/ui)
import SNBTLayout from '@/layouts/SNBTLayout.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-vue-next'

// =======================================================================
// MANAJEMEN STATE NAVIGASI DAN UNIT
// =======================================================================
const router = useRouter()
const route = useRoute()
const unitNumber = ref<number>(0)
const totalUnits = 5 // Ganti dengan jumlah total unit yang Anda miliki

onMounted(() => {
  // Mengekstrak nomor unit dari URL secara dinamis
  const pathParts = route.path.split('/')
  const unitSegment = pathParts[pathParts.length - 1]
  const match = unitSegment.match(/unit(\d+)/)
  if (match && match[1]) {
    unitNumber.value = parseInt(match[1], 10)
  }
})

// Fungsi navigasi yang di-emit oleh layout
function goToPreviousUnit() {
  if (unitNumber.value > 1) {
    router.push(`/units/lbi/unit${unitNumber.value - 1}`)
  }
}

function goToNextUnit() {
  if (unitNumber.value < totalUnits) {
    router.push(`/units/lbi/unit${unitNumber.value + 1}`)
  }
}


// =======================================================================
// DATA LATIHAN SOAL (DIBUAT SULIT DAN KOMPLEKS)
// =======================================================================
const questions = ref([
  {
    id: 'q1',
    passage: `Fenomena 'flexing' atau pamer kekayaan di media sosial telah menjadi sorotan tajam, terutama di kalangan generasi muda urban. Riset yang dipublikasikan oleh Jurnal Psikologi Digital pada kuartal keempat 2023 menunjukkan bahwa 68% remaja usia 18-25 tahun di lima kota besar Indonesia mengaku pernah merasa tertekan secara psikologis setelah melihat konten flexing. Para ahli berpendapat bahwa fenomena ini, jika tidak disikapi dengan bijak, berpotensi mengikis nilai-nilai kesederhanaan dan kerja keras. Tampaknya, regulasi konten yang lebih ketat di platform media sosial adalah satu-satunya jalan keluar untuk melindungi kesehatan mental generasi penerus bangsa yang sangat berharga. Pemerintah seharusnya segera mengambil langkah tegas terkait hal ini.`,
    question: 'Manakah di antara pernyataan berikut yang merupakan OPINI berdasarkan teks di atas?',
    options: [
      { id: 'q1a', label: 'A', text: 'Riset dari Jurnal Psikologi Digital dipublikasikan pada kuartal keempat 2023.' },
      { id: 'q1b', label: 'B', 'text': 'Sebanyak 68% remaja usia 18-25 tahun di lima kota besar mengaku pernah tertekan akibat konten flexing.' },
      { id: 'q1c', label: 'C', 'text': 'Fenomena flexing berpotensi mengikis nilai-nilai kesederhanaan dan kerja keras jika tidak disikapi bijak.' },
      { id: 'q1d', label: 'D', 'text': 'Pemerintah seharusnya segera mengambil langkah tegas untuk meregulasi konten media sosial.' },
      { id: 'q1e', label: 'E', 'text': 'Fenomena pamer kekayaan di media sosial menjadi sorotan tajam di kalangan generasi muda urban.' },
    ],
    correctAnswer: 'D',
    explanation: `
      Pernyataan (D) adalah opini karena menggunakan frasa "seharusnya segera mengambil langkah tegas". Kata 'seharusnya' adalah kata kerja modal yang menunjukkan sebuah saran, anjuran, atau pendapat subjektif, bukan sebuah kenyataan yang telah terjadi atau dapat diverifikasi secara objektif. 
      <br/><br/>
      <b>Analisis Pilihan Lain:</b>
      <ul>
        <li><b>(A) Fakta:</b> Informasi waktu publikasi riset ("kuartal keempat 2023") adalah data spesifik yang dapat diverifikasi.</li>
        <li><b>(B) Fakta:</b> Menyajikan data kuantitatif dari hasil riset ("68% remaja..."), yang merupakan temuan objektif.</li>
        <li><b>(C) Opini Tersamar (Distraktor):</b> Meskipun mengandung kata 'berpotensi', pernyataan ini merujuk pada 'pendapat para ahli' yang dikutip dalam teks. Namun, dibandingkan (D), pernyataan ini lebih dekat ke kutipan hasil analisis. Pilihan (D) adalah murni seruan dari penulis teks, membuatnya opini yang paling jelas.</li>
        <li><b>(E) Fakta:</b> Kalimat ini adalah pernyataan pengamatan umum yang menjadi dasar pembahasan teks, dapat diverifikasi melalui pemberitaan dan diskusi publik.</li>
      </ul>
    `,
  },
  {
    id: 'q2',
    passage: `Transisi energi dari bahan bakar fosil ke energi baru terbarukan (EBT) merupakan sebuah keniscayaan global. Indonesia, dengan potensi energi surya lebih dari 207,8 gigawatt (GW) menurut data Kementerian ESDM, memiliki modal yang luar biasa untuk menjadi pemimpin dalam transisi ini. Sayangnya, pemanfaatan energi surya saat ini baru mencapai sekitar 0,2% dari total potensinya. Beberapa pengamat menilai bahwa lambatnya adopsi ini disebabkan oleh kerumitan birokrasi dan kurangnya insentif fiskal dari pemerintah. Padahal, investasi di sektor EBT, khususnya panel surya, adalah langkah paling strategis untuk mencapai kemandirian energi dan menekan emisi karbon secara signifikan.`,
    question: 'Kalimat yang mengandung FAKTA dalam teks di atas adalah...',
    options: [
      { id: 'q2a', label: 'A', text: 'Transisi energi dari bahan bakar fosil ke EBT merupakan sebuah keniscayaan global.' },
      { id: 'q2b', label: 'B', 'text': 'Pemanfaatan energi surya di Indonesia saat ini baru mencapai sekitar 0,2% dari total potensinya.' },
      { id: 'q2c', label: 'C', 'text': 'Lambatnya adopsi EBT disebabkan oleh kerumitan birokrasi dan kurangnya insentif fiskal.' },
      { id: 'q2d', label: 'D', 'text': 'Investasi di sektor EBT adalah langkah paling strategis untuk mencapai kemandirian energi.' },
      { id: 'q2e', label: 'E', 'text': 'Indonesia memiliki modal yang luar biasa untuk menjadi pemimpin dalam transisi energi.' },
    ],
    correctAnswer: 'B',
    explanation: `
      Pernyataan (B) adalah fakta karena menyajikan data kuantitatif yang spesifik ("sekitar 0,2%") dan dapat diverifikasi melalui laporan atau data resmi yang disebutkan secara implisit dari Kementerian ESDM. Ini adalah pernyataan yang objektif mengenai kondisi saat ini.
      <br/><br/>
      <b>Analisis Pilihan Lain:</b>
      <ul>
        <li><b>(A) Opini:</b> Kata 'keniscayaan' menyiratkan sebuah keyakinan atau pandangan tentang masa depan yang tidak terhindarkan, ini adalah interpretasi subjektif.</li>
        <li><b>(C) Opini:</b> Frasa "beberapa pengamat menilai" secara eksplisit menandakan bahwa ini adalah pendapat atau analisis dari sekelompok orang, bukan fakta yang terbukti secara universal.</li>
        <li><b>(D) Opini:</b> Penggunaan kata sifat superlatif "paling strategis" menunjukkan penilaian subjektif. Apa yang 'strategis' bagi satu pihak mungkin tidak bagi pihak lain.</li>
        <li><b>(E) Opini:</b> Frasa "modal yang luar biasa" adalah penilaian kualitatif dan subjektif. Meskipun didasarkan pada fakta potensi energi surya, penggambaran sebagai 'luar biasa' adalah opini.</li>
      </ul>
    `,
  },
  // Tambahkan soal-soal lain dengan tingkat kesulitan serupa di sini
])

// =======================================================================
// LOGIKA DAN STATE UNTUK KUIS
// =======================================================================
const userAnswers = ref<Record<string, string>>({})
const isSubmitted = ref(false)
const showResult = ref(false)

// Inisialisasi jawaban pengguna
questions.value.forEach(q => {
  userAnswers.value[q.id] = ''
})

function handleSubmit() {
  // Validasi jika semua soal sudah dijawab
  const allAnswered = Object.values(userAnswers.value).every(answer => answer !== '')
  if (!allAnswered) {
    alert('Harap jawab semua pertanyaan sebelum mengirimkan.')
    return
  }
  isSubmitted.value = true
  showResult.value = true
  // Scroll ke bagian hasil untuk UX yang lebih baik
  setTimeout(() => {
    document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

const score = computed(() => {
  if (!isSubmitted.value) return 0
  const correctCount = questions.value.reduce((count, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
  return Math.round((correctCount / questions.value.length) * 100)
})

const scoreMessage = computed(() => {
  if (score.value >= 80) return { text: "Luar Biasa! Pemahamanmu sangat tajam!", icon: Sparkles, color: 'text-green-500' }
  if (score.value >= 60) return { text: "Bagus! Terus asah kemampuan analisismu.", icon: CheckCircle2, color: 'text-blue-500' }
  return { text: "Jangan menyerah! Pelajari lagi materinya, kamu pasti bisa.", icon: AlertCircle, color: 'text-orange-500' }
})


// =======================================================================
// PROPS UNTUK KOMPONEN LAYOUT
// =======================================================================
const layoutProps = computed(() => ({
  testTitle: 'Persiapan Intensif SNBT',
  testDescription: 'Subtes: Literasi Bahasa Indonesia',
  unitTitle: `Unit ${unitNumber.value || '...'} | Membedakan Fakta dan Opini dalam Teks`,
  unitDescription: 'Mengasah kemampuan analisis untuk memilah pernyataan objektif dan subjektif dalam bacaan kompleks guna meningkatkan nalar kritis.',
  categories: ['Analisis Teks', 'Logika Berbahasa', 'Penalaran Kritis'],
  showResult: showResult.value,
}))

</script>

<template>
  <SNBTLayout
    v-bind="layoutProps"
    @back="goToPreviousUnit"
    @next="goToNextUnit"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material: Berisi Konten Pembelajaran                             -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="overflow-hidden">
        <CardHeader class="bg-muted/30">
          <CardTitle>Materi Konsep Kunci</CardTitle>
          <CardDescription>Pahami fondasi dasar untuk membedah setiap kalimat dalam bacaan.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-sm">
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-base mb-2">1. Definisi Fakta</h3>
              <p class="text-muted-foreground">
                Fakta adalah pernyataan yang menggambarkan keadaan atau peristiwa yang benar-benar terjadi dan dapat dibuktikan kebenarannya secara objektif. Kebenarannya tidak terbantahkan dan dapat diverifikasi melalui data, observasi, atau sumber yang kredibel.
              </p>
              <ul class="mt-2 list-disc list-inside space-y-1 pl-2">
                <li><b>Dapat Diverifikasi:</b> Bisa dicek kebenarannya.</li>
                <li><b>Objektif:</b> Tidak dipengaruhi perasaan atau selera pribadi.</li>
                <li><b>Data Akurat:</b> Seringkali menyertakan angka, tanggal, statistik, atau kutipan langsung.</li>
                <li><b>Contoh:</b> "Menurut data BPS tahun 2022, jumlah penduduk Indonesia mencapai 275,77 juta jiwa."</li>
              </ul>
            </div>
            
            <Separator />

            <div>
              <h3 class="font-semibold text-base mb-2">2. Definisi Opini</h3>
              <p class="text-muted-foreground">
                Opini adalah pernyataan yang berisi pendapat, pandangan, keyakinan, atau perasaan seseorang terhadap suatu hal. Kebenarannya bersifat subjektif dan relatif, sehingga bisa berbeda antara satu orang dengan yang lain.
              </p>
              <ul class="mt-2 list-disc list-inside space-y-1 pl-2">
                <li><b>Tidak Dapat Diverifikasi Mutlak:</b> Kebenarannya bergantung pada sudut pandang.</li>
                <li><b>Subjektif:</b> Dipengaruhi oleh emosi, nilai, dan keyakinan pribadi.</li>
                <li><b>Kata Kunci Relatif:</b> Sering menggunakan kata-kata seperti <i>menurut saya, seharusnya, sebaiknya, mungkin, tampaknya, sangat, lebih baik, paling.</i></li>
                <li><b>Contoh:</b> "Menurut saya, kebijakan tersebut kurang efektif untuk mengatasi kemacetan."</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Strategi Analisis Teks</CardTitle>
          <CardDescription>Cara cepat mengidentifikasi fakta dan opini di tengah tekanan waktu ujian.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 text-sm space-y-3">
          <div class="flex items-start gap-3">
            <CheckCircle2 class="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 class="font-semibold">Cari Data Kuantitatif</h4>
              <p class="text-muted-foreground">Angka, persentase, tanggal, dan statistik adalah indikator kuat sebuah fakta.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <XCircle class="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 class="font-semibold">Waspadai Kata Sifat dan Adverbia Penilaian</h4>
              <p class="text-muted-foreground">Kata seperti "indah", "buruk", "sangat", "luar biasa" hampir selalu menandakan opini.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <AlertCircle class="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 class="font-semibold">Identifikasi Sumber Pernyataan</h4>
              <p class="text-muted-foreground">Apakah kalimat tersebut merujuk pada "data riset" (cenderung fakta) atau "menurut pengamat" (cenderung opini)?</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice: Berisi Soal-soal Latihan Interaktif                     -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Pemahaman</CardTitle>
          <CardDescription>Uji kemampuan analisismu dengan soal-soal setara SNBT berikut ini.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(q, index) in questions" :key="q.id">
            <div class="mb-4">
              <h4 class="font-semibold mb-2">Teks Soal {{ index + 1 }}</h4>
              <p class="text-sm text-muted-foreground bg-slate-50 p-3 rounded-md border">
                {{ q.passage }}
              </p>
            </div>
            
            <p class="font-semibold text-sm mb-3">{{ q.question }}</p>

            <RadioGroup v-model="userAnswers[q.id]" :disabled="isSubmitted" class="grid gap-2">
              <div v-for="option in q.options" :key="option.id" 
                   class="flex items-center space-x-2 p-3 rounded-md border transition-colors"
                   :class="{
                     'border-slate-200': !isSubmitted,
                     'border-green-500 bg-green-50': isSubmitted && option.label === q.correctAnswer,
                     'border-red-500 bg-red-50': isSubmitted && userAnswers[q.id] === option.label && option.label !== q.correctAnswer,
                   }">
                <RadioGroupItem :id="option.id" :value="option.label" />
                <Label :for="option.id" class="flex-1 cursor-pointer">{{ option.text }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="handleSubmit" :disabled="isSubmitted" class="w-full">
            {{ isSubmitted ? 'Jawaban Terkirim' : 'Koreksi Jawaban Saya' }}
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result: Menampilkan Hasil dan Pembahasan Detail                   -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil dan Pembahasan</CardTitle>
            <CardDescription>Analisis jawabanmu untuk pemahaman yang lebih mendalam.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <!-- Ringkasan Skor -->
            <div class="p-6 rounded-lg border bg-background text-center">
              <p class="text-sm text-muted-foreground">SKOR ANDA</p>
              <p class="text-5xl font-bold tracking-tighter" :class="score >= 60 ? 'text-green-600' : 'text-red-600'">
                {{ score }}
              </p>
              <div class="mt-3 flex items-center justify-center gap-2">
                <component :is="scoreMessage.icon" class="h-5 w-5" :class="scoreMessage.color" />
                <p class="font-semibold" :class="scoreMessage.color">{{ scoreMessage.text }}</p>
              </div>
            </div>

            <!-- Pembahasan per Soal -->
            <div v-for="(q, index) in questions" :key="`result-${q.id}`">
              <Separator class="my-6"/>
              <h3 class="font-bold text-lg mb-4">Pembahasan Soal {{ index + 1 }}</h3>
              <div class="space-y-4">
                <p class="text-sm p-3 rounded-md border bg-slate-100/50">{{ q.question }}</p>

                <!-- Jawaban Kamu -->
                <Alert :variant="userAnswers[q.id] === q.correctAnswer ? 'default' : 'destructive'" class="bg-white">
                  <component :is="userAnswers[q.id] === q.correctAnswer ? CheckCircle2 : XCircle" class="h-4 w-4" />
                  <AlertTitle>Jawaban Kamu: ({{ userAnswers[q.id] }})</AlertTitle>
                  <AlertDescription>
                    {{ q.options.find(opt => opt.label === userAnswers[q.id])?.text }}
                  </AlertDescription>
                </Alert>

                <!-- Jawaban Benar & Penjelasan -->
                 <Alert v-if="userAnswers[q.id] !== q.correctAnswer" variant="default" class="bg-green-50 border-green-200">
                  <CheckCircle2 class="h-4 w-4 text-green-700" />
                  <AlertTitle class="text-green-800">Jawaban yang Benar: ({{ q.correctAnswer }})</AlertTitle>
                  <AlertDescription class="text-green-900">
                    {{ q.options.find(opt => opt.label === q.correctAnswer)?.text }}
                  </AlertDescription>
                </Alert>

                <!-- Penjelasan Detail -->
                <div class="p-4 rounded-md bg-sky-50 border border-sky-200">
                  <h4 class="font-semibold text-sky-800 mb-2">💡 Alasan dan Penjelasan</h4>
                  <div class="text-sm text-sky-900/80 prose prose-sm max-w-none" v-html="q.explanation"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style>
/* Menambahkan style untuk konten HTML dari v-html agar terlihat bagus */
.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}
.prose li {
  margin-bottom: 0.25rem;
}
.prose b {
  font-weight: 600;
}
</style>