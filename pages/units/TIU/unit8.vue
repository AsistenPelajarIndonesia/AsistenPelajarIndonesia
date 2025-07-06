<template>
  <!-- 
    ======================================================================
    HALAMAN LATIHAN SOAL CPNS: TIU - KEMAMPUAN FIGURAL (KETIDAKSAMAAN)
    ======================================================================
    Halaman ini dirancang untuk membantu calon peserta CPNS berlatih mengerjakan
    salah satu subtes dalam Tes Intelegensia Umum (TIU), yaitu Kemampuan Figural
    dengan fokus pada materi Ketidaksamaan Gambar.

    Struktur Halaman:
    1.  Layout: Menggunakan komponen NuxtLayout 'CPNSLayout' yang telah disediakan.
    2.  Props: Mengirimkan data dinamis (judul, deskripsi, kategori) ke layout.
    3.  Event Handling: Menangani event 'back' dan 'next' dari layout.
    4.  Slot #material: Berisi penjelasan konsep, strategi, dan tips mengerjakan soal.
    5.  Slot #practice: Berisi daftar soal latihan interaktif dalam bentuk Pilihan Ganda.
    6.  Slot #result: Berisi rangkuman hasil, skor, dan pembahasan detail untuk setiap soal.
        Bagian ini hanya muncul setelah pengguna selesai mengerjakan.

    Logika Script:
    -   Manajemen State: Menggunakan ref dan reactive dari Vue 3 untuk mengelola
        jawaban pengguna, status pengerjaan (showResult), dan data soal.
    -   Data Soal: Soal dibuat secara statis dalam script, lengkap dengan opsi,
        jawaban benar, dan pembahasan mendalam. Untuk merepresentasikan 'gambar',
        digunakan ikon dari library 'lucide-vue-next' yang dinamis.
    -   Interaktivitas: Pengguna dapat memilih jawaban, men-submit, melihat hasil,
        dan mengulangi latihan.
    -   Computed Properties: Menghitung skor dan total jawaban benar/salah secara otomatis
        ketika hasil ditampilkan.
  -->
  <CPNSLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="showResult"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material: PENJELASAN KONSEP DAN STRATEGI                        -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Konsep Dasar Ketidaksamaan Gambar</CardTitle>
          <CardDescription>
            Pahami fondasi untuk menaklukkan soal jenis ini.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-4">
          <p>
            Soal <strong>Ketidaksamaan Gambar</strong> atau sering disebut "Mencari Gambar yang Berbeda" adalah bagian dari tes kemampuan figural yang bertujuan untuk mengukur kemampuan Anda dalam mengobservasi, menganalisis, dan menemukan pola logis dari sekumpulan gambar.
          </p>
          <p>
            Tugas Anda adalah mengidentifikasi satu gambar yang memiliki karakteristik atau pola yang <strong>tidak konsisten</strong> dengan gambar-gambar lainnya dalam kelompok tersebut. Kunci utamanya adalah kecepatan dan ketelitian dalam melihat detail.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Strategi Jitu Menyelesaikan Soal</CardTitle>
          <CardDescription>
            Terapkan pendekatan sistematis untuk menemukan jawaban dengan cepat dan akurat.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <div class="flex items-start gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</span>
            <div>
              <h4 class="font-semibold">Observasi Jumlah Elemen</h4>
              <p class="text-muted-foreground">Hitung jumlah objek, sisi, sudut, atau titik pada setiap gambar. Seringkali, gambar yang berbeda memiliki jumlah elemen yang ganjil dibandingkan yang lain.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</span>
            <div>
              <h4 class="font-semibold">Analisis Rotasi & Pencerminan</h4>
              <p class="text-muted-foreground">Perhatikan apakah gambar-gambar tersebut merupakan hasil rotasi (perputaran) atau pencerminan (refleksi) satu sama lain. Gambar yang tidak bisa didapatkan melalui rotasi/pencerminan adalah jawabannya.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</span>
            <div>
              <h4 class="font-semibold">Identifikasi Pola Unik</h4>
              <p class="text-muted-foreground">Cari pola hubungan antar elemen di dalam satu gambar (misal: bentuk besar selalu di kiri, bentuk kecil di kanan). Temukan gambar yang melanggar pola tersebut.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</span>
            <div>
              <h4 class="font-semibold">Klasifikasi Bentuk atau Jenis</h4>
              <p class="text-muted-foreground">Kelompokkan gambar berdasarkan jenisnya. Contoh: semua gambar adalah bangun datar, kecuali satu yang merupakan bangun ruang. Atau semua adalah huruf, kecuali satu yang merupakan angka.</p>
            </div>
          </div>
           <div class="flex items-start gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">5</span>
            <div>
              <h4 class="font-semibold">Perhatikan Keterisian (Fill) atau Garis</h4>
              <p class="text-muted-foreground">Amati apakah ada perbedaan dalam hal arsiran, warna (hitam/putih), atau jenis garis (lurus/lengkung) yang membuat satu gambar menonjol.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice: SOAL-SOAL LATIHAN INTERAKTIF                          -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal</CardTitle>
          <CardDescription>
            Pilih satu gambar yang menurut Anda berbeda dari yang lain pada setiap soal.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Looping melalui setiap soal -->
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-4">
            <p class="font-semibold">
              Soal #{{ index + 1 }}: {{ question.questionText }}
            </p>
            <!-- Komponen RadioGroup untuk opsi jawaban -->
            <RadioGroup
              :id="`q${question.id}`"
              v-model="userAnswers[question.id]"
              :disabled="showResult"
              class="grid grid-cols-3 gap-4 md:grid-cols-5"
            >
              <div v-for="option in question.options" :key="option.id">
                <RadioGroupItem :id="`q${question.id}-o${option.id}`" :value="option.id" class="peer sr-only" />
                <Label
                  :for="`q${question.id}-o${option.id}`"
                  class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <component :is="option.content" class="h-8 w-8 mb-2" />
                  {{ option.id }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Tombol untuk mengecek jawaban -->
          <Button v-if="!showResult" class="w-full" @click="handleCheckAnswers">
            Cek Jawaban & Lihat Pembahasan
          </Button>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result: HASIL & PEMBAHASAN SETELAH MENGERJAKAN                  -->
    <!-- ======================================================================= -->
    <template #result>
      <!-- Kartu Rangkuman Hasil -->
      <Card class="bg-gray-50 dark:bg-slate-800/50">
        <CardHeader>
          <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>
            Berikut adalah rangkuman performa dan pembahasan detail untuk setiap soal.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div class="rounded-lg border bg-card p-4">
              <h4 class="text-sm font-medium text-muted-foreground">Skor Akhir</h4>
              <p class="text-3xl font-bold">{{ score }}%</p>
            </div>
            <div class="rounded-lg border bg-card p-4">
              <h4 class="text-sm font-medium text-muted-foreground">Jawaban Benar</h4>
              <p class="text-3xl font-bold text-green-600">{{ totalCorrect }}</p>
            </div>
            <div class="rounded-lg border bg-card p-4">
              <h4 class="text-sm font-medium text-muted-foreground">Jawaban Salah</h4>
              <p class="text-3xl font-bold text-red-600">{{ totalIncorrect }}</p>
            </div>
          </div>
          <Button class="w-full" variant="outline" @click="resetQuiz">
            <RefreshCw class="mr-2 h-4 w-4" />
            Ulangi Latihan
          </Button>
        </CardContent>
      </Card>

      <!-- Pembahasan Detail per Soal -->
      <div class="mt-6 space-y-6">
        <h3 class="text-xl font-bold tracking-tight">
          Pembahasan Detail
        </h3>
        <Card v-for="(question, index) in questions" :key="`result-${question.id}`">
          <CardHeader 
            :class="userAnswers[question.id] === question.correctAnswerId ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'"
            class="rounded-t-lg"
          >
            <CardTitle class="flex items-center justify-between">
              <span>Soal #{{ index + 1 }}</span>
              <Badge :variant="userAnswers[question.id] === question.correctAnswerId ? 'default' : 'destructive'">
                {{ userAnswers[question.id] === question.correctAnswerId ? 'Benar' : 'Salah' }}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <p class="mb-4 font-medium">{{ question.questionText }}</p>
            <div class="grid grid-cols-3 gap-4 md:grid-cols-5 mb-6">
              <div v-for="option in question.options" :key="`result-opt-${option.id}`" 
                   class="flex flex-col items-center justify-center rounded-md border-2 p-4"
                   :class="{
                     'border-green-500 bg-green-50 dark:bg-green-900/20': option.id === question.correctAnswerId,
                     'border-red-500 bg-red-50 dark:bg-red-900/20': option.id === userAnswers[question.id] && userAnswers[question.id] !== question.correctAnswerId,
                     'border-muted': option.id !== question.correctAnswerId && option.id !== userAnswers[question.id]
                   }"
              >
                <component :is="option.content" class="h-8 w-8 mb-2" />
                <span class="font-bold">{{ option.id }}</span>
                <span v-if="option.id === question.correctAnswerId" class="text-xs text-green-600 dark:text-green-400 font-semibold">(Jawaban Benar)</span>
                <span v-if="option.id === userAnswers[question.id] && userAnswers[question.id] !== question.correctAnswerId" class="text-xs text-red-600 dark:text-red-400 font-semibold">(Jawaban Anda)</span>
                 <span v-if="!userAnswers[question.id] && option.id === question.correctAnswerId" class="text-xs text-muted-foreground">(Tidak Dijawab)</span>
              </div>
            </div>
            
            <div class="rounded-lg border bg-muted/50 p-4">
                <h4 class="font-semibold text-base mb-2">💡 Pembahasan:</h4>
                <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent } from 'vue'
import { useRouter } from '#app'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
// Asumsi ada komponen RadioGroup di UI library Anda (seperti di shadcn-vue)
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  ArrowUp, ArrowRight, ArrowDown, ArrowLeft, ArrowUpRight,
  Triangle, Square, Pentagon, Hexagon, Circle,
  Box, Archive, Package, Gift, Laptop,
  Grape, Cherry, Carrot, Banana, Apple,
  RefreshCw, Star, Shield, Heart, Diamond, ShieldCheck,
} from 'lucide-vue-next'
import CPNSLayout from '@/layouts/CPNSLayout.vue' 


// --- DATA UNTUK PROPS LAYOUT ---
// Data ini akan dikirim ke komponen CPNSLayout untuk ditampilkan di header.
const pageData = reactive({
  testTitle: 'Persiapan SKD CPNS 2024',
  testDescription: 'Tes Intelegensia Umum (TIU)',
  unitTitle: 'Kemampuan Figural: Ketidaksamaan Gambar',
  unitDescription: 'Latihan untuk mengidentifikasi pola dan menemukan satu gambar yang berbeda dari kelompoknya.',
  categories: ['CPNS', 'SKD', 'TIU', 'Figural', 'Ketidaksamaan'],
})

// --- DATA SOAL LATIHAN ---
// Kumpulan soal dalam bentuk array of objects.
// Setiap 'gambar' direpresentasikan oleh komponen ikon dari lucide-vue-next.
// Penggunaan defineAsyncComponent adalah praktik yang baik untuk komponen dinamis.
const questions = ref([
  {
    id: 1,
    questionText: 'Manakah dari gambar berikut yang polanya tidak sama dengan yang lain?',
    options: [
      { id: 'A', content: defineAsyncComponent(() => Promise.resolve(ArrowUp)) },
      { id: 'B', content: defineAsyncComponent(() => Promise.resolve(ArrowRight)) },
      { id: 'C', content: defineAsyncComponent(() => Promise.resolve(ArrowDown)) },
      { id: 'D', content: defineAsyncComponent(() => Promise.resolve(ArrowUpRight)) },
      { id: 'E', content: defineAsyncComponent(() => Promise.resolve(ArrowLeft)) },
    ],
    correctAnswerId: 'D',
    explanation: 'Pola yang terbentuk adalah rotasi 90 derajat. Gambar A, B, C, dan E adalah panah yang menunjuk ke arah mata angin utama (Utara, Timur, Selatan, Barat) dan dapat diperoleh dengan merotasi satu sama lain sebesar 90 derajat. Gambar D (panah ke arah timur laut) tidak termasuk dalam pola rotasi 90 derajat ini.',
  },
  {
    id: 2,
    questionText: 'Identifikasi gambar yang memiliki karakteristik berbeda.',
    options: [
      { id: 'A', content: defineAsyncComponent(() => Promise.resolve(Triangle)) },
      { id: 'B', content: defineAsyncComponent(() => Promise.resolve(Square)) },
      { id: 'C', content: defineAsyncComponent(() => Promise.resolve(Circle)) },
      { id: 'D', content: defineAsyncComponent(() => Promise.resolve(Pentagon)) },
      { id: 'E', content: defineAsyncComponent(() => Promise.resolve(Hexagon)) },
    ],
    correctAnswerId: 'C',
    explanation: 'Pola yang terbentuk adalah bangun datar (poligon) yang memiliki sisi dan sudut lurus. Gambar A (3 sisi), B (4 sisi), D (5 sisi), dan E (6 sisi) semuanya adalah poligon. Gambar C (Lingkaran) adalah satu-satunya bangun yang tidak memiliki sisi lurus dan sudut, melainkan terdiri dari garis lengkung.',
  },
  {
    id: 3,
    questionText: 'Manakah dari gambar berikut yang tidak termasuk dalam kelompok yang sama?',
    options: [
      { id: 'A', content: defineAsyncComponent(() => Promise.resolve(Apple)) },
      { id: 'B', content: defineAsyncComponent(() => Promise.resolve(Grape)) },
      { id: 'C', content: defineAsyncComponent(() => Promise.resolve(Cherry)) },
      { id: 'D', content: defineAsyncComponent(() => Promise.resolve(Banana)) },
      { id: 'E', content: defineAsyncComponent(() => Promise.resolve(Carrot)) },
    ],
    correctAnswerId: 'E',
    explanation: 'Pola yang terbentuk adalah klasifikasi berdasarkan kategori. Gambar A, B, C, dan D semuanya adalah buah-buahan. Gambar E (Wortel) adalah satu-satunya sayuran dalam kelompok tersebut.',
  },
  {
    id: 4,
    questionText: 'Temukan gambar yang tidak konsisten dengan yang lainnya.',
    options: [
      { id: 'A', content: defineAsyncComponent(() => Promise.resolve(Box)) },
      { id: 'B', content: defineAsyncComponent(() => Promise.resolve(Package)) },
      { id: 'C', content: defineAsyncComponent(() => Promise.resolve(Laptop)) },
      { id: 'D', content: defineAsyncComponent(() => Promise.resolve(Gift)) },
      { id: 'E', content: defineAsyncComponent(() => Promise.resolve(Archive)) },
    ],
    correctAnswerId: 'C',
    explanation: 'Pola yang terbentuk adalah objek yang berfungsi sebagai wadah atau kontainer untuk menyimpan barang. Gambar A (Kotak), B (Paket), D (Kado), dan E (Arsip) semuanya adalah jenis wadah. Gambar C (Laptop) adalah perangkat elektronik dan bukan merupakan wadah.',
  },
  {
    id: 5,
    questionText: 'Pilihlah satu gambar yang berbeda dari kelima pilihan.',
    options: [
      { id: 'A', content: defineAsyncComponent(() => Promise.resolve(Star)) },
      { id: 'B', content: defineAsyncComponent(() => Promise.resolve(Shield)) },
      { id: 'C', content: defineAsyncComponent(() => Promise.resolve(Heart)) },
      { id: 'D', content: defineAsyncComponent(() => Promise.resolve(ShieldCheck)) },
      { id: 'E', content: defineAsyncComponent(() => Promise.resolve(Diamond)) },
    ],
    correctAnswerId: 'D',
    explanation: 'Pola yang terbentuk adalah gambar yang terdiri dari satu bentuk tunggal yang utuh (outline). Gambar A, B, C, dan E adalah bentuk tunggal. Gambar D (ShieldCheck) adalah satu-satunya gambar yang merupakan gabungan dari dua elemen yang berbeda, yaitu perisai (shield) dan tanda centang (check).',
  },
])

// --- STATE MANAGEMENT ---
// `userAnswers` menyimpan jawaban yang dipilih pengguna, dengan key berupa id soal.
const userAnswers = reactive<Record<number, string | null>>({})
// `showResult` mengontrol visibilitas bagian hasil dan pembahasan.
const showResult = ref(false)

// Inisialisasi jawaban pengguna menjadi null untuk setiap soal.
const initializeAnswers = () => {
  questions.value.forEach(q => {
    userAnswers[q.id] = null
  })
}
initializeAnswers()

// --- COMPUTED PROPERTIES ---
// Properti komputasi untuk menghitung hasil secara dinamis.
const totalCorrect = computed(() => {
  if (!showResult.value) return 0
  return questions.value.filter(q => userAnswers[q.id] === q.correctAnswerId).length
})

const totalIncorrect = computed(() => {
  if (!showResult.value) return 0
  // Soal yang dijawab tapi salah
  const answeredIncorrectly = questions.value.filter(q => userAnswers[q.id] !== null && userAnswers[q.id] !== q.correctAnswerId).length
  // Soal yang tidak dijawab
  const notAnswered = questions.value.filter(q => userAnswers[q.id] === null).length
  return answeredIncorrectly + notAnswered
})

const score = computed(() => {
  if (!showResult.value || questions.value.length === 0) return 0
  const percentage = (totalCorrect.value / questions.value.length) * 100
  return Math.round(percentage)
})

// --- METHODS ---
// Fungsi yang dipanggil saat tombol "Cek Jawaban" diklik.
function handleCheckAnswers() {
  showResult.value = true
  // Scroll ke atas halaman untuk melihat hasil
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Fungsi untuk mereset latihan ke kondisi awal.
function resetQuiz() {
  showResult.value = false
  initializeAnswers()
}

// Handler untuk event 'back' dan 'next' dari layout.
// Di halaman ini, kita hanya akan log ke konsol atau navigasi.
const router = useRouter()
function handleBack() {
  console.log('Navigasi "Back" ditekan.')
  // Contoh navigasi: router.push('/cpns/tiu')
  // Untuk saat ini, kita bisa arahkan ke halaman utama CPNS misalnya.
  router.push('/cpns')
}
function handleNext() {
  console.log('Navigasi "Next" ditekan.')
  // Contoh navigasi: router.push('/cpns/tiu/figural-analogi')
  alert("Anda akan diarahkan ke unit selanjutnya (fitur ini dalam pengembangan).")
}
</script>

<style scoped>
/* Transisi fade untuk memunculkan blok hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>