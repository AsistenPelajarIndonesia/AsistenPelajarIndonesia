<!--
File: @/pages/units/lbi/unit1.vue
Deskripsi: Halaman ini merupakan unit pembelajaran interaktif untuk persiapan SNBT, 
fokus pada subtes Literasi Bahasa Indonesia. Unit ini secara spesifik membahas 
"Memahami dan Menggunakan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI): Penggunaan Huruf Kapital dan Huruf Miring".
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// --- Component UI (Asumsi komponen ini ada di @/components/ui) ---
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, BookOpen, BrainCircuit, Target } from 'lucide-vue-next'

// =======================================================================
// KONFIGURASI NAVIGASI UNIT
// =======================================================================
const route = useRoute()
const router = useRouter()
const currentUnitNumber = ref(0)

// Ekstrak nomor unit dari URL saat komponen dimuat
onMounted(() => {
  const pathParts = route.path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  const match = lastPart.match(/unit(\d+)/)
  if (match && match[1]) {
    currentUnitNumber.value = parseInt(match[1], 10)
  }
})

// Fungsi untuk navigasi ke unit sebelumnya
function goToPreviousUnit() {
  if (currentUnitNumber.value > 1) {
    router.push(`/units/lbi/unit${currentUnitNumber.value - 1}`)
  }
  // Jika ingin, bisa tambahkan notifikasi atau disable tombol jika sudah di unit 1
}

// Fungsi untuk navigasi ke unit selanjutnya
function goToNextUnit() {
  // Asumsi ada unit selanjutnya
  router.push(`/units/lbi/unit${currentUnitNumber.value + 1}`)
}

// =======================================================================
// DATA STATIS UNTUK LAYOUT
// =======================================================================
const pageInfo = {
  testTitle: 'SNBT: Literasi Bahasa Indonesia',
  testDescription: 'Asah kemampuan literasi Anda untuk menaklukkan soal-soal SNBT.',
  unitTitle: 'Unit 1: PUEBI - Huruf Kapital dan Huruf Miring',
  unitDescription: 'Fokus pada pemahaman mendalam dan penerapan aturan penggunaan huruf kapital dan huruf miring sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) dalam konteks kalimat yang kompleks.',
  categories: ['PUEBI', 'Ejaan', 'Sintaksis', 'Analisis Teks']
}

// =======================================================================
// DATA INTERAKTIF UNTUK LATIHAN SOAL
// =======================================================================

// Tipe data untuk struktur soal
interface Question {
  id: number
  text: string
  question: string
  options: { key: string; text: string }[]
  correctAnswer: string
  explanation: string
}

// State untuk menyimpan jawaban pengguna
const userAnswers = ref<Record<number, string>>({})

// State untuk mengontrol tampilan hasil
const showResult = ref(false)

// State untuk menyimpan skor
const score = ref(0)

// Bank Soal yang didesain untuk tingkat kesulitan tinggi
const questions = ref<Question[]>([
  {
    id: 1,
    text: 'Dalam bukunya yang berjudul *Dari Ave Maria ke Jalan Lain ke Roma*, Idrus menyajikan kritik sosial yang tajam. Ayahnya, seorang haji yang dihormati di kampungnya, sering menasihatinya agar selalu berpegang pada ajaran Islam. Ia pernah belajar di Universitas Gadjah Mada dan bercita-cita menjadi duta besar Republik Indonesia untuk Kerajaan Belanda.',
    question: 'Manakah kalimat berikut yang menunjukkan KESALAHAN penggunaan huruf kapital dan huruf miring sesuai PUEBI?',
    options: [
      { key: 'A', text: 'Judul buku *Dari Ave Maria ke Jalan Lain ke Roma* sudah ditulis dengan benar.' },
      { key: 'B', text: 'Frasa "seorang haji" seharusnya ditulis "seorang Haji" karena merujuk pada sebutan keagamaan.' },
      { key: 'C', text: 'Penulisan "ajaran Islam" sudah tepat karena nama agama diawali huruf kapital.' },
      { key: 'D', text: 'Frasa "duta besar Republik Indonesia" seharusnya "Duta Besar Republik Indonesia" karena diikuti nama negara.' },
      { key: 'E', text: 'Penulisan "Kerajaan Belanda" sudah benar karena merujuk pada nama spesifik negara.' },
    ],
    correctAnswer: 'B',
    explanation: 'Jawaban yang benar adalah B. Menurut PUEBI, istilah keagamaan seperti *haji*, *imam*, atau *pendeta* yang tidak diikuti nama orang ditulis dengan huruf kecil. Contoh: "Tahun ini ia akan naik haji." Sebaliknya, jika menjadi bagian dari nama diri atau sapaan, barulah ditulis dengan huruf kapital. Contoh: "Terima kasih, Haji Budi." Pilihan A, C, dan E sudah benar. Pilihan D salah karena "duta besar" yang tidak diikuti nama orang ditulis dengan huruf kecil, kecuali jika itu adalah sapaan langsung. Namun, kesalahan yang paling jelas dan ditanyakan adalah pada opsi B.'
  },
  {
    id: 2,
    text: 'Prof. Dr. Andi Wijaya, S.H., M.Hum. akan memberikan kuliah umum tentang "Relevansi Hukum Adat di Era Digital" pada hari sabtu, 20 agustus 2023. Acara ini diselenggarakan oleh Suku Badui bekerja sama dengan kementerian pendidikan dan kebudayaan. Dalam presentasinya, beliau akan mengutip pepatah latin, *ad astra per aspera*, untuk memotivasi mahasiswa.',
    question: 'Perbaikan ejaan yang TEPAT untuk kalimat di atas adalah...',
    options: [
      { key: 'A', text: 'Penulisan "hari sabtu, 20 agustus 2023" seharusnya "hari Sabtu, 20 Agustus 2023".' },
      { key: 'B', text: 'Frasa "Suku Badui" seharusnya "suku Badui".' },
      { key: 'C', text: 'Frasa "kementerian pendidikan dan kebudayaan" seharusnya "Kementrian Pendidikan dan Kebudayaan".' },
      { key: 'D', text: 'Gelar "Prof. Dr. Andi Wijaya, S.H., M.Hum." seharusnya tidak memakai titik setelah Prof.' },
      { key: 'E', text: 'Ungkapan asing *ad astra per aspera* seharusnya tidak ditulis miring.' },
    ],
    correctAnswer: 'A',
    explanation: 'Jawaban yang benar adalah A. Menurut PUEBI, nama hari (Sabtu) dan nama bulan (Agustus) harus ditulis dengan huruf kapital. Pilihan B salah, nama suku bangsa seperti "suku Badui" ditulis dengan huruf kecil pada kata "suku" dan huruf kapital pada nama sukunya "Badui". Pilihan C salah, nama kementerian jika tidak merujuk pada nama spesifik kabinet tertentu ditulis dengan huruf kecil. Seharusnya "Kementerian Pendidikan dan Kebudayaan" jika merujuk pada nama lembaga resmi negara. Pilihan D salah, singkatan gelar seperti Prof. (Profesor) dan Dr. (Doktor) harus diakhiri dengan titik. Pilihan E salah, ungkapan asing yang belum terserap ke dalam Bahasa Indonesia ditulis dengan huruf miring.'
  },

  {
    id: 3,
    text: 'Perjalanan dari selat Bali menuju samudera Hindia ditempuh dengan kapal pesiar yang megah. Nahkoda kapal, seorang keturunan inggris, mengumumkan melalui pengeras suara, "saudara-saudara, kita akan segera menyaksikan keindahan matahari terbenam di ufuk barat." Banyak penumpang yang mengabadikan momen itu, termasuk seorang reporter dari surat kabar *Kompas*.',
    question: 'Kesalahan penggunaan huruf kapital terdapat pada frasa...',
    options: [
      { key: 'A', text: 'selat Bali' },
      { key: 'B', text: 'samudera Hindia' },
      { key: 'C', text: 'keturunan inggris' },
      { key: 'D', text: 'ufuk barat' },
      { key: 'E', text: 'surat kabar *Kompas*' },
    ],
    correctAnswer: 'C',
    explanation: 'Jawaban yang benar adalah C. Menurut PUEBI, nama bangsa atau suku bangsa yang digunakan sebagai bentuk dasar kata turunan tidak ditulis dengan huruf awal kapital. Contohnya: "mengindonesiakan", "keinggris-inggrisan". Namun, jika merujuk pada nama bangsa sebagai kata benda, harus ditulis kapital, seperti "bangsa Inggris". Dalam konteks "seorang keturunan inggris", kata "inggris" merujuk pada nama bangsa sehingga harus ditulis "Inggris". Pilihan A dan B benar karena nama geografi yang spesifik ditulis kapital. Pilihan D benar karena "barat" di sini berfungsi sebagai arah mata angin, bukan bagian dari nama geografi (seperti Jawa Barat). Pilihan E benar, nama media massa ditulis miring dan kapital pada setiap awal kata kecuali kata tugas.'
  },
  {
    id: 4,
    text: 'Pada Konferensi Asia Afrika di Bandung, perdana menteri Jawaharlal Nehru dari India menyampaikan pidato yang berapi-api. Beliau berkata, "atas nama Tuhan yang maha pengasih, mari kita wujudkan perdamaian dunia". Semangat *Bandung Spirit* ini kemudian menginspirasi banyak negara di benua Asia dan Afrika untuk merdeka.',
    question: 'Identifikasilah penggunaan huruf kapital dan miring yang TIDAK TEPAT dalam paragraf tersebut.',
    options: [
        { key: 'A', text: 'Konferensi Asia Afrika' },
        { key: 'B', text: 'perdana menteri' },
        { key: 'C', text: 'Tuhan yang maha pengasih' },
        { key: 'D', text: '*Bandung Spirit*' },
        { key: 'E', text: 'benua Asia dan Afrika' },
    ],
    correctAnswer: 'C',
    explanation: 'Jawaban yang benar adalah C. Kata ganti untuk Tuhan, seperti "Yang Maha Esa" atau "Yang Maha Kuasa", ditulis dengan huruf kapital. Namun, jika kata dasar "maha" diikuti oleh kata turunan (yang berimbuhan), maka penulisannya dirangkai dan tidak diawali huruf kapital, contoh: "Mahakuasa". Jika diikuti kata dasar, penulisannya dipisah dan setiap kata diawali huruf kapital, contoh: "Maha Pengasih", "Maha Bijaksana". Jadi, seharusnya "Tuhan Yang Maha Pengasih". Pilihan B sudah tepat, "perdana menteri" jika tidak diikuti nama orang atau negara ditulis dengan huruf kecil. Pilihan A, D, dan E sudah menggunakan ejaan yang tepat sesuai PUEBI.'
  }
])

// =======================================================================
// LOGIKA DAN FUNGSI VALIDATOR
// =======================================================================

// Computed property untuk mengecek apakah semua soal sudah dijawab
const isAllAnswered = computed(() => {
  return questions.value.length === Object.keys(userAnswers.value).length
})

// Fungsi utama untuk validasi jawaban
function validateAnswers() {
  if (!isAllAnswered.value) return

  let correctCount = 0
  questions.value.forEach(question => {
    if (userAnswers.value[question.id] === question.correctAnswer) {
      correctCount++
    }
  })

  score.value = Math.round((correctCount / questions.value.length) * 100)
  showResult.value = true
}

// Fungsi untuk mengulang latihan
function resetQuiz() {
  userAnswers.value = {}
  score.value = 0
  showResult.value = false
  // Scroll ke atas untuk memulai lagi
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Fungsi untuk menentukan kelas alert berdasarkan jawaban
const getAlertVariant = (question: Question) => {
  if (!userAnswers.value[question.id]) return 'secondary'
  return userAnswers.value[question.id] === question.correctAnswer ? 'default' : 'destructive'
}

// Fungsi untuk mendapatkan teks dari pilihan yang dipilih pengguna
const getUserAnswerText = (question: Question) => {
  const selectedOption = question.options.find(opt => opt.key === userAnswers.value[question.id])
  return selectedOption ? `(${selectedOption.key}) ${selectedOption.text}` : 'Tidak dijawab'
}
</script>

<template>
  <SNBTLayout
    :test-title="pageInfo.testTitle"
    :test-description="pageInfo.testDescription"
    :unit-title="pageInfo.unitTitle"
    :unit-description="pageInfo.unitDescription"
    :categories="pageInfo.categories"
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
          <CardTitle class="flex items-center gap-2">
            <BookOpen class="h-6 w-6 text-primary" />
            Konsep Kunci PUEBI
          </CardTitle>
          <CardDescription>
            Pahami aturan dasar penggunaan huruf kapital dan miring untuk menghindari kesalahan umum.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4 text-sm">
          <div class="space-y-2">
            <h4 class="font-semibold">A. Penggunaan Huruf Kapital</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><b>Awal kalimat:</b> Setiap awal kalimat, termasuk petikan langsung. Cth: <i>Dia bertanya, "Kapan kita berangkat?"</i></li>
              <li><b>Nama Diri & Gelar:</b> Nama orang, geografi (jika spesifik), badan, lembaga, dokumen resmi, hari, bulan, hari besar. Cth: <i>Presiden Joko Widodo, Selat Sunda, Proklamasi Kemerdekaan, hari Lebaran, bulan Agustus.</i></li>
              <li><b>Pengecualian Geografi:</b> Tidak dipakai jika nama geografi menjadi nama jenis. Cth: <i>gula jawa, kunci inggris, pisang ambon.</i></li>
              <li><b>Agama & Kitab Suci:</b> Nama agama, kitab suci, dan kata ganti untuk Tuhan. Cth: <i>Islam, Al-Qur'an, Kristen, Alkitab, Tuhan Yang Maha Esa, atas rahmat-Nya.</i></li>
              <li><b>Gelar & Jabatan:</b> Dipakai jika diikuti nama orang, instansi, atau tempat. Cth: <i>Gubernur Jawa Barat, Profesor Supomo.</i> Tidak dipakai jika sebaliknya: <i>Ia bercita-cita menjadi gubernur.</i></li>
              <li><b>Sapaan & Kekerabatan:</b> Dipakai sebagai kata sapaan atau pengacuan. Cth: <i>"Silakan duduk, Dik!"</i> atau <i>Surat Saudara sudah saya terima.</i> Tidak dipakai jika bukan sapaan. Cth: <i>Kita harus menghormati bapak dan ibu kita.</i></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold">B. Penggunaan Huruf Miring</h4>
            <ul class="list-disc space-y-1 pl-5">
              <li><b>Judul:</b> Judul buku, nama majalah, surat kabar yang dikutip dalam tulisan. Cth: <i>Saya membaca novel *Laskar Pelangi*.</i></li>
              <li><b>Penegasan:</b> Menegaskan atau mengkhususkan huruf, bagian kata, kata, atau kelompok kata. Cth: <i>Dia bukan menipu, tetapi *ditipu*.</i></li>
              <li><b>Istilah Asing:</b> Menuliskan kata atau ungkapan dalam bahasa daerah atau bahasa asing. Cth: Politik *divide et impera* pernah merajalela di negeri ini.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL INTERAKTIF                                            -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <BrainCircuit class="h-6 w-6 text-primary" />
            Latihan Soal Uji Pemahaman
          </CardTitle>
          <CardDescription>
            Pilih jawaban yang paling tepat berdasarkan analisis PUEBI. Perhatikan setiap detail kalimat.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
            <p class="font-semibold">Soal {{ index + 1 }}</p>
            <Alert variant="secondary">
              <AlertDescription class="italic leading-relaxed">
                "{{ question.text }}"
              </AlertDescription>
            </Alert>
            <p class="mt-2 text-base">{{ question.question }}</p>
            <RadioGroup v-model="userAnswers[question.id]" class="gap-2">
              <div v-for="option in question.options" :key="option.key" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${question.id}-opt${option.key}`" :value="option.key" />
                <Label :for="`q${question.id}-opt${option.key}`" class="flex-1 cursor-pointer">
                  {{ option.text }}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" @click="resetQuiz">
            Ulangi Latihan
          </Button>
          <Button @click="validateAnswers" :disabled="!isAllAnswered">
            <span v-if="!isAllAnswered">Jawab Semua Soal</span>
            <span v-else>Cek Jawaban</span>
          </Button>
        </CardFooter>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT HASIL DAN PEMBAHASAN                                               -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Target class="h-6 w-6 text-primary" />
            Hasil dan Pembahasan
          </CardTitle>
          <CardDescription>
            Berikut adalah hasil latihan Anda. Pelajari setiap pembahasan untuk meningkatkan pemahaman.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- Ringkasan Skor -->
          <div class="rounded-lg border bg-card text-card-foreground p-6 shadow">
            <div class="flex flex-col items-center space-y-2 text-center">
              <p class="text-sm font-medium text-muted-foreground">SKOR ANDA</p>
              <p class="text-5xl font-bold tracking-tighter">{{ score }}</p>
              <p v-if="score === 100" class="text-muted-foreground">Luar biasa! Pemahaman PUEBI Anda sangat baik.</p>
              <p v-else-if="score >= 75" class="text-muted-foreground">Bagus! Terus berlatih untuk hasil yang sempurna.</p>
              <p v-else-if="score >= 50" class="text-muted-foreground">Cukup baik. Perhatikan lagi detail aturan pada pembahasan.</p>
              <p v-else class="text-muted-foreground">Jangan menyerah! Ulas kembali materi dan coba lagi.</p>
              <Progress :model-value="score" class="mt-2 w-full" />
            </div>
          </div>

          <!-- Pembahasan Detail per Soal -->
          <div v-for="(question, index) in questions" :key="`result-${question.id}`" class="space-y-3">
            <h4 class="font-semibold">Pembahasan Soal {{ index + 1 }}</h4>
            <Alert :variant="getAlertVariant(question)">
              <component
                :is="userAnswers[question.id] === question.correctAnswer ? CheckCircle2 : XCircle"
                class="h-4 w-4"
              />
              <AlertTitle>
                {{ userAnswers[question.id] === question.correctAnswer ? 'Jawaban Anda Benar' : 'Jawaban Anda Kurang Tepat' }}
              </AlertTitle>
              <AlertDescription class="mt-2 space-y-2">
                <div>
                  <strong>Jawaban Anda:</strong> {{ getUserAnswerText(question) }}
                </div>
                <div>
                  <strong>Jawaban yang Benar:</strong> ({{ question.correctAnswer }}) {{ question.options.find(opt => opt.key === question.correctAnswer)?.text }}
                </div>
                <div class="mt-3 rounded-md border border-border bg-background/50 p-3">
                  <p class="font-semibold">Penjelasan Rinci:</p>
                  <p class="text-sm leading-relaxed">{{ question.explanation }}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter>
            <Button variant="secondary" @click="resetQuiz" class="w-full">
                Coba Latihan Lagi
            </Button>
        </CardFooter>
      </Card>
    </template>
  </SNBTLayout>
</template>

<style scoped>
/* Transisi untuk bagian hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>