<template>
  <CPNSLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="isSubmitted"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #material: Materi Pembelajaran                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Memahami Pola Serial Gambar</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 text-sm text-muted-foreground">
          <p>
            Tes Serial Gambar menguji kemampuan Anda dalam melihat dan memahami pola perubahan yang konsisten dari serangkaian gambar. Kunci untuk menyelesaikan soal tipe ini adalah dengan mengidentifikasi logika perubahan dari satu gambar ke gambar berikutnya.
          </p>
          <p class="font-semibold text-foreground">
            Beberapa jenis pola perubahan yang umum ditemukan adalah:
          </p>
          <ul class="list-disc space-y-2 pl-5">
            <li>
              <strong>Pola Rotasi (Perputaran):</strong> Objek atau elemen di dalam gambar berputar searah atau berlawanan arah jarum jam dengan sudut yang konsisten (misalnya, 45°, 90°, 180°).
            </li>
            <li>
              <strong>Pola Translasi (Pergeseran):</strong> Objek atau elemen berpindah posisi secara teratur, misalnya dari sudut ke sudut, dari sisi ke sisi, atau bergerak melingkar.
            </li>
            <li>
              <strong>Pola Penambahan/Pengurangan:</strong> Jumlah objek atau elemen di dalam gambar bertambah atau berkurang secara konsisten pada setiap langkahnya.
            </li>
            <li>
              <strong>Pola Perubahan Ukuran (Skala):</strong> Objek membesar atau mengecil secara bertahap.
            </li>
            <li>
              <strong>Pola Perubahan Bentuk:</strong> Objek berubah bentuk menjadi bentuk lain dengan aturan yang logis.
            </li>
            <li>
              <strong>Pola Kombinasi:</strong> Ini adalah pola yang paling kompleks, di mana dua atau lebih jenis pola (misalnya rotasi dan penambahan) terjadi secara bersamaan.
            </li>
          </ul>
          <div class="mt-4 rounded-lg border bg-muted p-4">
            <h4 class="font-bold text-foreground">
              Strategi Mengerjakan Soal:
            </h4>
            <ol class="list-decimal space-y-2 pl-5">
              <li>
                <strong>Fokus pada Satu Elemen:</strong> Jika gambar kompleks, pilih satu elemen dan amati perubahannya dari awal hingga akhir.
              </li>
              <li>
                <strong>Identifikasi Jenis Pola:</strong> Tentukan apakah polanya adalah rotasi, pergeseran, penambahan, atau kombinasi.
              </li>
              <li>
                <strong>Prediksi Gambar Berikutnya:</strong> Berdasarkan pola yang telah Anda temukan, bayangkan bagaimana seharusnya bentuk gambar selanjutnya.
              </li>
              <li>
                <strong>Eliminasi Jawaban:</strong> Coret pilihan jawaban yang jelas-jelas tidak sesuai dengan pola yang Anda prediksi. Ini akan membantu mempersempit pilihan.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #practice: Latihan Soal Interaktif                                 -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal</CardTitle>
          <CardDescription>Pilih gambar yang paling tepat untuk melanjutkan serial gambar berikut.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Looping untuk setiap pertanyaan -->
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-4">
            <p class="font-semibold">
              Soal {{ index + 1 }}
            </p>
            <!-- Menampilkan serial gambar pertanyaan -->
            <div class="flex items-center justify-center space-x-2 rounded-md border p-4">
              <div v-for="(svg, i) in q.series" :key="i" class="h-20 w-20" v-html="svg" />
              <div class="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed text-3xl font-bold text-muted-foreground">
                ?
              </div>
            </div>

            <!-- Menampilkan Pilihan Jawaban -->
            <RadioGroup :id="`q${q.id}`" v-model="userAnswers[q.id]" :disabled="isSubmitted" class="grid grid-cols-3 gap-4 md:grid-cols-5">
              <div v-for="option in q.options" :key="option.id">
                <RadioGroupItem :id="`q${q.id}-${option.id}`" :value="option.id" class="peer sr-only" />
                <Label
                  :for="`q${q.id}-${option.id}`"
                  :class="[
                    'flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 bg-popover p-2 hover:bg-accent hover:text-accent-foreground',
                    { 'border-primary ring-2 ring-primary': userAnswers[q.id] === option.id },
                    { 'cursor-not-allowed opacity-60': isSubmitted },
                  ]"
                >
                  <span class="mb-2 font-bold">{{ option.id }}</span>
                  <div class="h-16 w-16" v-html="option.svg" />
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Tombol Aksi -->
          <div class="flex justify-end gap-4 pt-4">
            <Button v-if="isSubmitted" variant="outline" @click="resetQuiz">
              Ulangi Latihan
            </Button>
            <Button :disabled="!allAnswered" @click="submitAnswers">
              {{ isSubmitted ? 'Lihat Hasil' : 'Kumpulkan Jawaban' }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #result: Hasil dan Pembahasan                                      -->
    <!-- ======================================================================= -->
    <template #result>
      <Card class="bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-950 dark:to-cyan-950">
        <CardHeader>
          <CardTitle class="text-2xl">
            Hasil Latihan Anda
          </CardTitle>
          <CardDescription>
            Skor Anda: <span class="font-bold text-foreground">{{ score }} dari {{ totalQuestions }}</span> ({{ ((score / totalQuestions) * 100).toFixed(0) }}%)
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(q, index) in questions" :key="`result-${q.id}`">
            <Card :class="userAnswers[q.id] === q.correctAnswer ? 'border-green-500' : 'border-red-500'">
              <CardHeader>
                <div class="flex items-center justify-between">
                  <CardTitle class="text-lg">
                    Pembahasan Soal {{ index + 1 }}
                  </CardTitle>
                  <Badge :variant="userAnswers[q.id] === q.correctAnswer ? 'default' : 'destructive'">
                    {{ userAnswers[q.id] === q.correctAnswer ? 'Benar' : 'Salah' }}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent class="space-y-4">
                <!-- Jawaban Pengguna vs Jawaban Benar -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="rounded-md border p-3">
                    <p class="text-sm font-medium">
                      Jawaban Anda: {{ userAnswers[q.id] || 'Tidak dijawab' }}
                    </p>
                    <div class="mt-2 flex h-24 w-24 items-center justify-center" v-html="getOptionSvg(q.id, userAnswers[q.id])" />
                  </div>
                  <div class="rounded-md border-2 border-green-500 bg-green-50/50 p-3 dark:bg-green-950/30">
                    <p class="text-sm font-medium text-green-700 dark:text-green-400">
                      Jawaban Benar: {{ q.correctAnswer }}
                    </p>
                    <div class="mt-2 flex h-24 w-24 items-center justify-center" v-html="getOptionSvg(q.id, q.correctAnswer)" />
                  </div>
                </div>
                <!-- Penjelasan Detil -->
                <div class="rounded-md bg-muted p-4">
                  <h4 class="font-semibold">
                    Penjelasan:
                  </h4>
                  <p class="mt-1 text-sm text-muted-foreground" v-html="q.explanation" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from '#app' // Menggunakan useRouter dari Nuxt
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// Mendefinisikan layout yang akan digunakan oleh halaman ini
definePageMeta({
  layout: false, // Kita nonaktifkan layout default karena kita panggil secara manual di template
})

// --- DATA HALAMAN ---
// Data ini akan di-pass sebagai props ke komponen layout
const pageData = {
  testTitle: 'Tes Intelegensia Umum (TIU)',
  testDescription: 'Latihan Soal CPNS Berbasis Keterampilan',
  unitTitle: 'Kemampuan Figural: Serial Gambar',
  unitDescription: 'Menganalisis dan melanjutkan pola dari serangkaian gambar yang berurutan.',
  categories: ['CPNS', 'TIU', 'Kemampuan Figural', 'Logika Gambar'],
}

// --- DATA SOAL ---
// SVGs dibuat sebagai string untuk portabilitas. Ini adalah pendekatan yang baik
// untuk menghindari file eksternal dan menjaga komponen tetap mandiri.
const questions = ref([
  {
    id: 1,
    series: [
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>',
      '<svg viewBox="0 0 24 24" style="transform: rotate(45deg);"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>',
      '<svg viewBox="0 0 24 24" style="transform: rotate(90deg);"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>',
    ],
    options: [
      { id: 'A', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(120deg);"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>' },
      { id: 'B', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(135deg);"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>' },
      { id: 'C', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(90deg);"><path fill="currentColor" d="M3 11h8V3H3v8zm2-6h4v4H5V5z"/></svg>' },
      { id: 'D', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 11h8V3h-8v8zm2-6h4v4h-4V5z"/></svg>' },
      { id: 'E', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 21h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>' },
    ],
    correctAnswer: 'B',
    explanation: 'Pola pada soal ini adalah <b>rotasi (perputaran)</b>. Setiap gambar berputar sebesar <b>45 derajat searah jarum jam</b>. Gambar pertama 0°, gambar kedua 45°, gambar ketiga 90°. Maka, gambar selanjutnya harus berputar 90° + 45° = <b>135°</b>.',
  },
  {
    id: 2,
    series: [
      '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="6" r="2" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="2" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="2" fill="currentColor"/></svg>',
    ],
    options: [
      { id: 'A', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="6" r="2" fill="currentColor"/></svg>' },
      { id: 'B', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>' },
      { id: 'C', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="2" fill="currentColor"/></svg>' },
      { id: 'D', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="2" fill="currentColor"/></svg>' },
      { id: 'E', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
    ],
    correctAnswer: 'C',
    explanation: 'Pola pada soal ini adalah <b>translasi (pergeseran)</b>. Lingkaran hitam kecil bergerak di dalam kotak searah jarum jam dari satu sudut ke sudut berikutnya. Posisi lingkaran: kiri-atas -> kanan-atas -> kanan-bawah. Maka, posisi selanjutnya adalah <b>kiri-bawah</b>.',
  },
  {
    id: 3,
    series: [
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path></svg>',
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/></svg>',
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/><circle cx="8" cy="19" r="1.5" fill="white"/></svg>',
    ],
    options: [
      { id: 'A', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/><circle cx="8" cy="19" r="1.5" fill="white"/><circle cx="16" cy="19" r="1.5" fill="white"/></svg>' },
      { id: 'B', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/><circle cx="12" cy="10" r="1.5" fill="white"/></svg>' },
      { id: 'C', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/><circle cx="8" cy="19" r="1.5" fill="white"/><circle cx="12" cy="19" r="1.5" fill="white"/></svg>' },
      { id: 'D', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="8" cy="19" r="1.5" fill="white"/></svg>' },
      { id: 'E', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 L22 22 L2 22 Z"></path><circle cx="12" cy="16" r="1.5" fill="white"/><circle cx="16" cy="19" r="1.5" fill="white"/></svg>' },
    ],
    correctAnswer: 'A',
    explanation: 'Pola pada soal ini adalah <b>penambahan elemen</b>. Setiap langkah, satu lingkaran putih ditambahkan pada sudut segitiga. Urutan penambahannya adalah tengah-bawah, lalu kiri-bawah. Maka, langkah selanjutnya adalah menambahkan lingkaran di sudut <b>kanan-bawah</b> sambil mempertahankan lingkaran yang sudah ada.',
  },
  {
    id: 4,
    series: [
      '<svg viewBox="0 0 24 24"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 24 24" style="transform: rotate(90deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 24 24" style="transform: rotate(180deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>',
    ],
    options: [
      { id: 'A', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(225deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>' },
      { id: 'B', svg: '<svg viewBox="0 0 24 24"><path d="M12,1L9,9h6Z" fill="currentColor" style="transform: scaleX(-1); transform-origin: center;"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>' },
      { id: 'C', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(180deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>' },
      { id: 'D', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(270deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>' },
      { id: 'E', svg: '<svg viewBox="0 0 24 24" style="transform: rotate(360deg);"><path d="M12,1L9,9h6Z" fill="currentColor"/><rect x="4" y="14" width="16" height="6" fill="currentColor"/></svg>' },
    ],
    correctAnswer: 'D',
    explanation: 'Ini adalah pola <b>rotasi sederhana</b>. Seluruh objek gabungan (segitiga dan persegi panjang) berputar sebesar <b>90 derajat searah jarum jam</b> pada setiap langkah. Gambar pertama 0°, kedua 90°, ketiga 180°. Maka, gambar selanjutnya harus berputar pada <b>270°</b>.',
  },
  {
    id: 5,
    series: [
      '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/><path d="M4 20 l8 -8" stroke="currentColor" stroke-width="1.5"/></svg>',
    ],
    options: [
      { id: 'A', svg: '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/><path d="M4 20 l8 -8" stroke="currentColor" stroke-width="1.5"/><path d="M12 4 L12 20" stroke="currentColor" stroke-width="1.5"/></svg>' },
      { id: 'B', svg: '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/><path d="M4 20 l8 -8" stroke="currentColor" stroke-width="1.5"/><path d="M20 20 l-8 -8" stroke="currentColor" stroke-width="1.5"/></svg>' },
      { id: 'C', svg: '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/><path d="M4 20 l8 -8" stroke="currentColor" stroke-width="1.5"/><path d="M4 12 L20 12" stroke="currentColor" stroke-width="1.5"/></svg>' },
      { id: 'D', svg: '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-8 8" stroke="currentColor" stroke-width="1.5"/><path d="M4 20 l8 -8" stroke="currentColor" stroke-width="1.5"/><path d="M20 20 l-8 -8" stroke="currentColor" stroke-width="1.5"/></svg>' },
      { id: 'E', svg: '<svg viewBox="0 0 24 24"><path d="M4 4 h16 v16 h-16 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4 l16 16" stroke="currentColor" stroke-width="1.5"/><path d="M20 4 l-16 16" stroke="currentColor" stroke-width="1.5"/></svg>' },
    ],
    correctAnswer: 'B',
    explanation: 'Ini adalah pola <b>penambahan elemen</b> yang dikombinasikan dengan <b>rotasi titik awal</b>. Sebuah garis diagonal digambar dari setiap sudut menuju ke tengah kotak. Urutan penambahannya adalah: kiri-atas -> kanan-atas -> kiri-bawah. Maka, garis selanjutnya harus ditarik dari sudut <b>kanan-bawah</b> ke tengah.',
  },
])

// --- STATE MANAGEMENT ---
// Reactive state untuk menyimpan jawaban pengguna
const userAnswers = ref<Record<number, string | null>>(
  questions.value.reduce((acc, q) => {
    acc[q.id] = null
    return acc
  }, {} as Record<number, string | null>),
)
// Reactive state untuk menandai apakah kuis sudah disubmit
const isSubmitted = ref(false)

// --- COMPUTED PROPERTIES ---
// Menghitung jumlah pertanyaan
const totalQuestions = computed(() => questions.value.length)
// Menghitung skor pengguna
const score = computed(() => {
  if (!isSubmitted.value) return 0
  return questions.value.reduce((count, q) => {
    return count + (userAnswers.value[q.id] === q.correctAnswer ? 1 : 0)
  }, 0)
})
// Mengecek apakah semua pertanyaan sudah dijawab
const allAnswered = computed(() => {
  return Object.values(userAnswers.value).every(answer => answer !== null)
})

// --- METHODS ---
// Fungsi untuk submit jawaban
function submitAnswers() {
  isSubmitted.value = true
  // Di aplikasi nyata, Anda bisa scroll ke bagian hasil
  // document.getElementById('result-card')?.scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk mengulang kuis
function resetQuiz() {
  isSubmitted.value = false
  for (const qId in userAnswers.value) {
    userAnswers.value[qId] = null
  }
}

// Helper untuk mendapatkan SVG dari sebuah pilihan jawaban
function getOptionSvg(questionId: number, optionId: string | null): string {
  if (!optionId) return '<div class="text-sm text-muted-foreground">?</div>'
  const question = questions.value.find(q => q.id === questionId)
  const option = question?.options.find(o => o.id === optionId)
  return option?.svg || ''
}

// Navigasi (contoh)
const router = useRouter()
function handleBack() {
  // Arahkan ke halaman daftar unit TIU
  router.push('/cpns/tiu')
}
function handleNext() {
  // Arahkan ke unit selanjutnya, misalnya "Analogi Gambar"
  router.push('/cpns/tiu/kemampuan-figural-analogi')
}
</script>

<style scoped>
/* Transisi untuk menampilkan kartu hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>