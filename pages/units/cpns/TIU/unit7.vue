<template>
  <CPNSLayout
    test-title="Seleksi Kompetensi Dasar (SKD) - CPNS"
    test-description="Latihan Soal Tes Intelegensia Umum (TIU)"
    unit-title="Kemampuan Figural: Analogi Gambar (Padanan Hubungan Gambar)"
    unit-description="Tes ini mengukur kemampuan individu dalam menalar melalui perbandingan dua gambar yang memiliki hubungan tertentu, kemudian menggunakan konsep hubungan tersebut pada situasi yang lain."
    :categories="['TIU', 'Penalaran', 'Logika', 'Figural']"
    :show-result="isSubmitted"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- 
      SLOT #material:
      Berisi materi pembelajaran, definisi, tipe-tipe analogi, dan tips & trik.
      Tujuannya adalah untuk membekali pengguna dengan pengetahuan dasar sebelum berlatih.
    -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Mengenal Analogi Gambar</CardTitle>
          <CardDescription>Pahami konsep dasar sebelum memulai latihan.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm space-y-4">
          <p>
            Analogi gambar adalah jenis soal yang meminta Anda untuk mengidentifikasi pola hubungan logis antara sepasang gambar (Gambar A dan Gambar B), lalu menerapkan pola hubungan yang sama untuk menemukan pasangan dari gambar ketiga (Gambar C). Kunci untuk menyelesaikan soal ini adalah kemampuan observasi yang cermat dan penalaran yang sistematis.
          </p>
          <div class="space-y-2">
            <h4 class="font-semibold">Tipe-tipe Hubungan Logis yang Umum:</h4>
            <ul class="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Rotasi (Perputaran):</strong> Objek diputar searah atau berlawanan arah jarum jam (misal: 45°, 90°, 180°).</li>
              <li><strong>Refleksi (Pencerminan):</strong> Objek dicerminkan secara horizontal (kiri-kanan) atau vertikal (atas-bawah).</li>
              <li><strong>Penambahan/Pengurangan Elemen:</strong> Ada elemen gambar yang ditambah, dihilangkan, atau digabungkan.</li>
              <li><strong>Perubahan Ukuran:</strong> Objek menjadi lebih besar atau lebih kecil.</li>
              <li><strong>Perubahan Bentuk/Transformasi:</strong> Objek berubah bentuk menjadi bentuk lain yang masih berhubungan.</li>
              <li><strong>Perubahan Posisi:</strong> Elemen-elemen di dalam objek bertukar posisi.</li>
              <li><strong>Perubahan Atribut:</strong> Perubahan pada arsiran, warna (hitam/putih), atau ketebalan garis.</li>
              <li><strong>Kombinasi:</strong> Gabungan dari dua atau lebih pola di atas (misal: rotasi dan penambahan elemen).</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold">Tips & Trik Mengerjakan Soal:</h4>
            <ul class="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Fokus pada Perubahan:</strong> Identifikasi apa saja yang berubah dari Gambar A ke Gambar B. Apakah ada yang berputar? Bertambah? Berubah warna?</li>
              <li><strong>Satu Per Satu:</strong> Jika ada banyak elemen, analisis perubahannya satu per satu. Jangan mencoba melihat semuanya sekaligus.</li>
              <li><strong>Eliminasi Jawaban:</strong> Coret pilihan jawaban yang jelas-jelas tidak mengikuti pola hubungan yang telah Anda temukan.</li>
              <li><strong>Perhatikan Detail Kecil:</strong> Terkadang perubahan yang terjadi sangat halus, seperti pergeseran kecil atau perubahan pada satu garis saja.</li>
              <li><strong>Latihan Rutin:</strong> Semakin sering Anda berlatih, semakin cepat Anda akan mengenali berbagai macam pola analogi.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- 
      SLOT #practice:
      Area latihan interaktif di mana pengguna menjawab soal-soal pilihan ganda.
      State dikelola secara reaktif untuk memberikan umpan balik langsung.
    -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal Interaktif</CardTitle>
          <CardDescription>Pilih jawaban yang paling tepat untuk melengkapi analogi gambar berikut.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <div v-for="(question, index) in questions" :key="question.id" class="border-b pb-8 last:border-b-0 last:pb-0">
            <p class="mb-4 font-semibold">Soal Nomor {{ index + 1 }}</p>
            
            <!-- Analogy Premise -->
            <div class="flex items-center justify-center gap-4 md:gap-8 mb-4 p-4 bg-muted rounded-lg">
              <div class="flex flex-col items-center gap-2">
                <div class="h-16 w-16 md:h-20 md:w-20" v-html="question.analogy.a"></div>
                <span class="text-xs text-muted-foreground">Gambar A</span>
              </div>
              <span class="text-2xl font-bold">:</span>
              <div class="flex flex-col items-center gap-2">
                <div class="h-16 w-16 md:h-20 md:w-20" v-html="question.analogy.b"></div>
                <span class="text-xs text-muted-foreground">Gambar B</span>
              </div>
              <span class="text-2xl font-bold hidden md:inline">||</span>
              <div class="flex flex-col items-center gap-2">
                 <div class="h-16 w-16 md:h-20 md:w-20" v-html="question.questionImage"></div>
                <span class="text-xs text-muted-foreground">Gambar C</span>
              </div>
               <span class="text-2xl font-bold">:</span>
               <div class="flex flex-col items-center gap-2">
                 <div class="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center border-2 border-dashed rounded-md">
                   <span class="text-3xl font-bold text-muted-foreground">?</span>
                 </div>
                <span class="text-xs text-muted-foreground">Jawaban</span>
              </div>
            </div>

            <!-- Options -->
            <div class="grid grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              <div 
                v-for="(option, optionIndex) in question.options" 
                :key="optionIndex"
                :class="getOptionClass(question, optionIndex)"
                @click="!isSubmitted && handleSelectAnswer(question.id, optionIndex)"
                class="flex flex-col items-center p-2 rounded-lg border-2 transition-all duration-200"
              >
                <div class="h-16 w-16" v-html="option.svg"></div>
                <div class="font-bold mt-2">{{ String.fromCharCode(65 + optionIndex) }}</div>
              </div>
            </div>

            <!-- Explanation (shown after submission) -->
            <Transition name="fade">
              <div v-if="isSubmitted" class="mt-6 p-4 rounded-lg" :class="userAnswers[question.id] === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
                <h4 class="font-bold text-sm mb-2" :class="userAnswers[question.id] === question.correctAnswer ? 'text-green-800' : 'text-red-800'">
                  {{ userAnswers[question.id] === question.correctAnswer ? 'BENAR' : 'SALAH' }}. Jawaban yang Tepat: {{ String.fromCharCode(65 + question.correctAnswer) }}
                </h4>
                <p class="text-sm text-muted-foreground">{{ question.explanation }}</p>
              </div>
            </Transition>
          </div>

          <div v-if="!isSubmitted" class="flex justify-end mt-6">
            <Button @click="submitPractice" size="lg">Kirim Jawaban</Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- 
      SLOT #result:
      Menampilkan hasil akhir setelah pengguna mengirimkan jawaban.
      Memberikan skor, persentase, dan pesan motivasi.
    -->
    <template #result>
      <Card class="w-full animate-in fade-in-50 duration-500">
        <CardHeader>
          <CardTitle>Hasil Latihan Anda</CardTitle>
          <CardDescription>Berikut adalah rekapitulasi hasil pengerjaan soal Anda.</CardDescription>
        </CardHeader>
        <CardContent class="text-center space-y-4">
          <p class="text-6xl font-bold">{{ scorePercentage }}<span class="text-2xl text-muted-foreground">%</span></p>
          <p class="text-lg">
            Anda menjawab dengan benar 
            <span class="font-bold text-primary">{{ score }}</span> dari 
            <span class="font-bold">{{ questions.length }}</span> soal.
          </p>
          <p class="text-md text-muted-foreground px-6">{{ getScoreMessage() }}</p>
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button @click="resetPractice" variant="default" size="lg">
            Ulangi Latihan
          </Button>
        </CardFooter>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from '#app' // or 'vue-router' in a standard Vue app
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// --- Page Meta ---
definePageMeta({
  layout: 'cpnslayout',
})

const router = useRouter()

// --- Navigation Handlers ---
// Placeholder functions for layout buttons
const handleBack = () => {
  // Logic to navigate to the previous unit, e.g., router.push('/cpns/tiu/overview')
  console.log('Navigating back...')
}

const handleNext = () => {
  // Logic to navigate to the next unit, e.g., router.push('/cpns/tiu/serial-gambar')
  console.log('Navigating next...')
}

// --- Type Definition ---
interface QuestionOption {
  svg: string;
}

interface Question {
  id: number;
  analogy: { a: string; b: string };
  questionImage: string;
  options: QuestionOption[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

// --- Reactive State ---
const isSubmitted = ref(false)
const userAnswers = ref<Record<number, number | null>>({})

// --- Question Data ---
// All images are represented as inline SVG for maximum control and no external dependencies.
const questions = ref<Question[]>([
  {
    id: 1,
    analogy: {
      a: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 50 10 L 50 90 M 50 10 L 40 20 M 50 10 L 60 20" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`, // Arrow up
      b: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 90 50 L 10 50 M 90 50 L 80 40 M 90 50 L 80 60" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`, // Arrow right
    },
    questionImage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 80 L 20 20 L 80 20" stroke="black" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, // L shape
    options: [
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 80 80 L 20 80 L 20 20" stroke="black" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` }, // Correct: Rotated L
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 80 L 20 20 L 80 20" stroke="black" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` }, // Same as question
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 20 L 80 20 L 80 80" stroke="black" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` }, // Rotated wrong way
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 80 20 L 80 80 L 20 80" stroke="black" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` }, // Mirrored L
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" stroke="black" stroke-width="8" fill="none"/></svg>` }, // Unrelated shape
    ],
    correctAnswer: 0,
    explanation: "Pola hubungannya adalah rotasi 90° searah jarum jam. Gambar A (panah ke atas) menjadi Gambar B (panah ke kanan). Maka, Gambar C (bentuk L) jika diputar 90° searah jarum jam akan menghasilkan gambar pada pilihan A.",
  },
  {
    id: 2,
    analogy: {
      a: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/></svg>`, // Square
      b: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/><circle cx="50" cy="50" r="15" fill="black"/></svg>`, // Square with dot
    },
    questionImage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,85 15,85" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round"/></svg>`, // Triangle
    options: [
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,85 15,85" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round"/><rect x="42" y="46" width="16" height="16" fill="black"/></svg>` }, // Triangle with square
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,85 15,85" stroke="black" stroke-width="8" fill="black" stroke-linejoin="round"/></svg>` }, // Filled Triangle
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,85 15,85" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round"/><circle cx="50" cy="60" r="15" fill="black"/></svg>` }, // Correct: Triangle with dot
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="8" fill="none"/><circle cx="50" cy="50" r="15" fill="black"/></svg>` }, // Circle with dot
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,85 15,85" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round"/></svg>` }, // Same as question
    ],
    correctAnswer: 2,
    explanation: "Pola hubungannya adalah penambahan elemen, yaitu sebuah lingkaran hitam kecil di tengah gambar. Gambar A (kotak) menjadi Gambar B (kotak dengan lingkaran di tengah). Maka, Gambar C (segitiga) harus menjadi segitiga dengan lingkaran hitam di tengah, seperti pada pilihan C.",
  },
  {
    id: 3,
    analogy: {
      a: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 30 20 L 30 80 M 30 20 L 60 20 L 70 30 L 70 40 L 60 50 L 30 50" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round" stroke-linecap="round"/></svg>`, // P shape
      b: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 70 20 L 70 80 M 70 20 L 40 20 L 30 30 L 30 40 L 40 50 L 70 50" stroke="black" stroke-width="8" fill="none" stroke-linejoin="round" stroke-linecap="round"/></svg>`, // Mirrored P shape
    },
    questionImage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 30 20 L 30 80 M 30 20 L 80 20 M 30 50 L 70 50" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`, // F shape
    options: [
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 70 20 L 70 80 M 70 20 L 20 20 M 70 50 L 30 50" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>` }, // Correct: Mirrored F
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 30 80 L 30 20 M 30 80 L 80 80 M 30 50 L 70 50" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>` }, // F upside down
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 30 20 L 30 80" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>` }, // Element removed
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 20 30 L 80 30 M 50 30 L 50 80 M 20 80 L 80 80" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>` }, // Unrelated E shape
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 30 20 L 30 80 M 30 20 L 80 20 M 30 50 L 70 50" stroke="black" stroke-width="8" fill="none" stroke-linecap="round"/></svg>` }, // Same as question
    ],
    correctAnswer: 0,
    explanation: "Pola hubungannya adalah refleksi atau pencerminan secara horizontal (kiri-kanan). Gambar A (bentuk 'P') dicerminkan menjadi Gambar B. Maka, Gambar C (bentuk 'F') jika dicerminkan secara horizontal akan menjadi gambar pada pilihan A.",
  },
  {
    id: 4,
    analogy: {
      a: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" fill="black"/></svg>`, // Filled circle
      b: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" stroke="black" stroke-width="8" fill="none"/></svg>`, // Outlined circle
    },
    questionImage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="black"/></svg>`, // Filled square
    options: [
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" stroke="black" stroke-width="8" fill="none"/></svg>` }, // Outlined circle
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/></svg>` }, // Correct: Outlined square
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="none" stroke="black" stroke-width="8" rx="15"/></svg>` }, // Rounded outlined square
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="black"/><circle cx="50" cy="50" r="15" fill="white"/></svg>` }, // Square with white dot
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" fill="black"/></svg>` }, // Same as question
    ],
    correctAnswer: 1,
    explanation: "Pola hubungannya adalah perubahan atribut, yaitu dari gambar yang terisi penuh (filled) menjadi gambar yang hanya berupa garis tepi (outlined). Gambar A (lingkaran penuh) menjadi Gambar B (garis tepi lingkaran). Maka, Gambar C (kotak penuh) harus menjadi gambar garis tepi kotak, seperti pada pilihan B.",
  },
  {
    id: 5,
    analogy: {
      a: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 50 20 L 80 80 L 20 80 Z" stroke="black" stroke-width="8" fill="none"/><circle cx="35" cy="70" r="8" fill="black"/><circle cx="65" cy="70" r="8" fill="black"/></svg>`, // Triangle with 2 dots at bottom
      b: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 80 50 L 20 20 L 20 80 Z" stroke="black" stroke-width="8" fill="none"/><circle cx="35" cy="35" r="8" fill="black"/></svg>`, // Rotated 90deg left, one dot removed
    },
    questionImage: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/><circle cx="35" cy="35" r="8" fill="black"/><circle cx="65" cy="65" r="8" fill="black"/></svg>`, // Square with 2 dots diagonal
    options: [
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none" transform="rotate(45 50 50)"/><circle cx="35" cy="65" r="8" fill="black"/></svg>` }, // Diamond, one dot
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/><circle cx="65" cy="35" r="8" fill="black"/></svg>` }, // Square, one dot moved
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none" transform="rotate(45 50 50)"/><circle cx="65" cy="35" r="8" fill="black"/></svg>` }, // Correct: Diamond, one dot moved/kept
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none" transform="rotate(45 50 50)"/><circle cx="35" cy="35" r="8" fill="black"/><circle cx="65" cy="65" r="8" fill="black"/></svg>` }, // Diamond, two dots
      { svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" stroke="black" stroke-width="8" fill="none"/><circle cx="35" cy="35" r="8" fill="black"/></svg>` }, // Square, one dot removed
    ],
    correctAnswer: 2,
    explanation: "Pola hubungannya adalah kombinasi: 1) Rotasi 45° searah jarum jam, dan 2) Salah satu titik dihilangkan. Gambar A (segitiga) menjadi Gambar B (segitiga yang diputar dan kehilangan satu titik). Maka, Gambar C (kotak dengan dua titik diagonal) jika diputar 45° akan menjadi belah ketupat, dan salah satu titiknya dihilangkan. Pilihan C paling tepat mengikuti pola ini.",
  }
])

// --- Computed Properties ---
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    return userAnswers.value[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

// --- Methods ---
const getScoreMessage = (): string => {
  const percentage = scorePercentage.value;
  if (percentage === 100) return "Luar biasa! Pemahaman Anda sangat solid. Pertahankan!"
  if (percentage >= 80) return "Hasil yang sangat baik! Anda sudah menguasai sebagian besar pola. Terus asah ketajaman Anda."
  if (percentage >= 60) return "Bagus! Anda sudah di jalur yang benar. Perhatikan kembali penjelasan pada soal yang salah untuk meningkatkan skor."
  if (percentage >= 40) return "Cukup baik sebagai permulaan. Jangan menyerah, pelajari lagi materi dan pola-pola yang ada."
  return "Jangan khawatir! Setiap ahli pernah menjadi pemula. Ulangi latihan dan fokus pada penjelasan untuk memahami polanya."
}

const initializeAnswers = () => {
  const answers: Record<number, number | null> = {}
  questions.value.forEach(q => {
    answers[q.id] = null
  })
  userAnswers.value = answers
}

const handleSelectAnswer = (questionId: number, optionIndex: number) => {
  userAnswers.value[questionId] = optionIndex
}

const submitPractice = () => {
  isSubmitted.value = true
  // Scroll to the result card for better UX on mobile
  setTimeout(() => {
    const resultCard = document.querySelector('[data-result-card]')
    resultCard?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const resetPractice = () => {
  isSubmitted.value = false
  initializeAnswers()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getOptionClass = (question: Question, optionIndex: number): (string | Record<string, boolean>)[] => {
  const baseClasses = ['cursor-pointer']
  const selectedAnswer = userAnswers.value[question.id]

  if (isSubmitted.value) {
    const isCorrect = optionIndex === question.correctAnswer
    const isSelected = selectedAnswer === optionIndex

    return [
      ...baseClasses,
      'cursor-not-allowed',
      {
        'bg-green-100 border-green-500 ring-2 ring-green-500/50 text-green-900': isCorrect,
        'bg-red-100 border-red-500 text-red-900': isSelected && !isCorrect,
        'bg-slate-50 border-slate-200 opacity-70': !isCorrect && !isSelected,
      },
    ]
  }

  return [
    ...baseClasses,
    {
      'border-primary ring-2 ring-primary/50 bg-primary/5': selectedAnswer === optionIndex,
      'border-muted-foreground/30 hover:border-primary/70': selectedAnswer !== optionIndex,
    },
  ]
}

// Initialize answers when component is mounted
initializeAnswers()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>