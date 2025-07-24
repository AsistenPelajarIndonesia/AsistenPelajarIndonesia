<template>
  <CPNSLayout
    :test-title="testTitle"
    :test-description="testDescription"
    :unit-title="unitTitle"
    :unit-description="unitDescription"
    :categories="categories"
    :show-result="showResults"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                              -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Materi Pokok: Pancasila</CardTitle>
          <CardDescription>
            Pahami konsep-konsep kunci Pancasila sebelum memulai latihan.
          </CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h4>Pengertian dan Fungsi Pancasila</h4>
          <p>
            Pancasila adalah pilar ideologis negara Indonesia. Namanya berasal dari bahasa Sansekerta: <em>pañca</em> (lima) dan <em>śīla</em> (prinsip/dasar). Pancasila merupakan rumusan dan pedoman kehidupan berbangsa dan bernegara bagi seluruh rakyat Indonesia.
          </p>
          <p>Fungsi utama Pancasila meliputi:</p>
          <ul>
            <li><strong>Dasar Negara (Philosophische Grondslag):</strong> Fondasi dalam mengatur pemerintahan dan penyelenggaraan negara.</li>
            <li><strong>Pandangan Hidup Bangsa (Weltanschauung):</strong> Kristalisasi nilai-nilai luhur yang diyakini kebenarannya dan menjadi pedoman dalam kehidupan.</li>
            <li><strong>Ideologi Bangsa:</strong> Cita-cita dan gagasan yang ingin dicapai oleh bangsa Indonesia.</li>
            <li><strong>Sumber dari Segala Sumber Hukum:</strong> Semua peraturan perundang-undangan di Indonesia harus bersumber dan tidak boleh bertentangan dengan Pancasila.</li>
            <li><strong>Perjanjian Luhur Bangsa:</strong> Kesepakatan para pendiri bangsa saat mendirikan Negara Kesatuan Republik Indonesia.</li>
          </ul>

          <h4>Sejarah Perumusan Pancasila</h4>
          <p>
            Istilah Pancasila pertama kali diperkenalkan oleh Ir. Soekarno dalam pidatonya pada tanggal <strong>1 Juni 1945</strong> di sidang Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan (BPUPKI). Tanggal ini kemudian diperingati sebagai Hari Lahir Pancasila. Rumusan final Pancasila disahkan pada <strong>18 Agustus 1945</strong> oleh Panitia Persiapan Kemerdekaan Indonesia (PPKI) dan tercantum dalam Pembukaan UUD 1945.
          </p>
          
          <h4>Butir-Butir Pancasila dan Lambangnya</h4>
          <ol>
            <li><strong>Ketuhanan Yang Maha Esa (Lambang: Bintang):</strong> Mengakui adanya Tuhan dan menjalankan perintah serta menjauhi larangan-Nya sesuai dengan kepercayaan masing-masing.</li>
            <li><strong>Kemanusiaan yang Adil dan Beradab (Lambang: Rantai):</strong> Mengakui persamaan derajat, hak, dan kewajiban antar sesama manusia tanpa membedakan suku, agama, dan ras.</li>
            <li><strong>Persatuan Indonesia (Lambang: Pohon Beringin):</strong> Mengutamakan kepentingan dan keselamatan bangsa dan negara di atas kepentingan pribadi atau golongan.</li>
            <li><strong>Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan (Lambang: Kepala Banteng):</strong> Mengutamakan musyawarah untuk mufakat dalam pengambilan keputusan untuk kepentingan bersama.</li>
            <li><strong>Keadilan Sosial bagi Seluruh Rakyat Indonesia (Lambang: Padi dan Kapas):</strong> Mengembangkan perbuatan luhur yang mencerminkan sikap dan suasana kekeluargaan dan gotong royong.</li>
          </ol>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal: Pemahaman Pancasila</CardTitle>
          <CardDescription>
            Pilih satu jawaban yang paling tepat. Jawaban Anda akan direview setelah Anda menekan tombol "Lihat Hasil".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitQuiz">
            <div class="space-y-8">
              <!-- Loop Soal -->
              <div v-for="(question, index) in questions" :key="question.id">
                <p class="font-semibold mb-3">{{ index + 1 }}. {{ question.soal }}</p>
                <div class="space-y-2">
                  <div v-for="option in question.pilihan" :key="option.id" class="flex items-center space-x-2">
                    <input
                      :id="`q${question.id}-${option.id}`"
                      v-model="userAnswers[question.id]"
                      type="radio"
                      :name="`question-${question.id}`"
                      :value="option.id"
                      class="form-radio h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      :disabled="showResults"
                    >
                    <label :for="`q${question.id}-${option.id}`" class="text-sm">
                      {{ option.id }}. {{ option.teks }}
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Tombol Aksi -->
              <div class="flex justify-end gap-4 pt-4">
                <Button v-if="showResults" type="button" variant="outline" @click="resetQuiz">
                  Ulangi Latihan
                </Button>
                <Button v-else type="submit">
                  Lihat Hasil
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Hasil dan Pembahasan</CardTitle>
          <CardDescription>
            Berikut adalah hasil latihan Anda. Perhatikan pembahasan untuk memahami konsep lebih dalam.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Ringkasan Skor -->
          <div class="mb-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h3 class="text-lg font-bold">Skor Anda: {{ scorePercentage }}%</h3>
            <p class="text-muted-foreground">
              Anda menjawab benar {{ score }} dari {{ questions.length }} soal.
            </p>
            <div class="mt-2 h-2.5 w-full rounded-full bg-secondary">
              <div class="h-2.5 rounded-full bg-green-500" :style="{ width: `${scorePercentage}%` }" />
            </div>
          </div>

          <!-- Pembahasan Detail per Soal -->
          <div class="space-y-6">
            <div
              v-for="(question, index) in questions"
              :key="`result-${question.id}`"
              class="rounded-md border p-4"
              :class="{
                'border-green-500 bg-green-50 dark:bg-green-900/20': userAnswers[question.id] === question.jawaban_benar,
                'border-red-500 bg-red-50 dark:bg-red-900/20': userAnswers[question.id] !== question.jawaban_benar && userAnswers[question.id]
              }"
            >
              <p class="font-semibold">{{ index + 1 }}. {{ question.soal }}</p>
              
              <div class="mt-4 space-y-2">
                <p class="text-sm">Jawaban Anda: 
                  <span v-if="userAnswers[question.id]" class="font-bold">
                    {{ getOptionText(question, userAnswers[question.id]) }}
                  </span>
                  <span v-else class="italic text-muted-foreground">Tidak dijawab</span>
                </p>
                <p class="text-sm">Jawaban Benar: 
                  <span class="font-bold text-green-700 dark:text-green-400">
                    {{ getOptionText(question, question.jawaban_benar) }}
                  </span>
                </p>
              </div>

              <div class="mt-4 border-t pt-4">
                <h4 class="font-semibold text-sm">Pembahasan:</h4>
                <p class="text-sm text-muted-foreground">{{ question.pembahasan }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// --- Definisi Layout dan Navigasi ---
definePageMeta({
  layout: false, // Kita menggunakan NuxtLayout secara manual di template
})

const testTitle = 'SKD - Seleksi Kompetensi Dasar CPNS'
const testDescription = 'Latihan Soal untuk mempersiapkan diri menghadapi Seleksi Kompetensi Dasar Calon Pegawai Negeri Sipil.'
const unitTitle = 'Unit 1: Pancasila'
const unitDescription = 'Materi dan Latihan Soal Tes Wawasan Kebangsaan (TWK) yang berfokus pada pemahaman, pengamalan, dan sejarah Pancasila sebagai ideologi dan dasar negara Indonesia.'
const categories = ['TWK', 'Pancasila', 'Ideologi Negara']

function handleBack() {
  // Logika untuk kembali ke halaman/unit sebelumnya
  alert('Navigasi ke unit sebelumnya.')
}

function handleNext() {
  // Logika untuk lanjut ke halaman/unit berikutnya
  alert('Navigasi ke unit berikutnya.')
}

// --- Data Soal (MCQ) ---
const questions = ref([
  {
    id: 1,
    soal: "Pancasila secara resmi disahkan sebagai dasar negara Indonesia oleh Panitia Persiapan Kemerdekaan Indonesia (PPKI) pada tanggal...",
    pilihan: [
      { id: 'A', teks: '1 Juni 1945' },
      { id: 'B', teks: '17 Agustus 1945' },
      { id: 'C', teks: '18 Agustus 1945' },
      { id: 'D', teks: '22 Juni 1945' },
      { id: 'E', teks: '29 Mei 1945' },
    ],
    jawaban_benar: 'C',
    pembahasan: 'Pancasila disahkan sebagai dasar negara pada 18 Agustus 1945, satu hari setelah proklamasi kemerdekaan. Tanggal 1 Juni 1945 adalah hari lahirnya istilah Pancasila yang diusulkan oleh Ir. Soekarno. Tanggal 22 Juni 1945 adalah tanggal ditandatanganinya Piagam Jakarta.',
  },
  {
    id: 2,
    soal: "Menjunjung tinggi hak asasi manusia, mengakui persamaan derajat, serta mengembangkan sikap tenggang rasa adalah bentuk pengamalan Pancasila, terutama sila...",
    pilihan: [
      { id: 'A', teks: 'Ketuhanan Yang Maha Esa' },
      { id: 'B', teks: 'Kemanusiaan yang Adil dan Beradab' },
      { id: 'C', teks: 'Persatuan Indonesia' },
      { id: 'D', teks: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan' },
      { id: 'E', teks: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia' },
    ],
    jawaban_benar: 'B',
    pembahasan: "Sila kedua, 'Kemanusiaan yang Adil dan Beradab', mengandung nilai-nilai universal tentang martabat manusia. Mengakui persamaan derajat, hak, dan kewajiban, serta mengembangkan sikap saling mencintai dan tenggang rasa adalah implementasi langsung dari sila yang dilambangkan dengan rantai emas ini.",
  },
  {
    id: 3,
    soal: "Dalam sistem ketatanegaraan Indonesia, Pancasila berkedudukan sebagai 'Staatsfundamentalnorm' atau norma fundamental negara, yang artinya...",
    pilihan: [
      { id: 'A', teks: 'Pancasila dapat diubah melalui amandemen konstitusi.' },
      { id: 'B', teks: 'Pancasila berfungsi sebagai pedoman hidup sehari-hari saja.' },
      { id: 'C', teks: 'Pancasila merupakan sumber dari segala sumber hukum di Indonesia.' },
      { id: 'D', teks: 'Pancasila hanya berlaku bagi aparat sipil negara.' },
      { id: 'E', teks: 'Pancasila setara dengan Undang-Undang Dasar.' },
    ],
    jawaban_benar: 'C',
    pembahasan: "Sebagai 'Staatsfundamentalnorm', Pancasila adalah kaidah negara yang fundamental dan menjadi sumber bagi pembentukan norma hukum di bawahnya, termasuk UUD 1945. Semua produk hukum tidak boleh bertentangan dengan nilai-nilai Pancasila. Kedudukannya berada di atas UUD 1945 sebagai sumber hukum tertinggi.",
  },
  {
    id: 4,
    soal: "Musyawarah untuk mencapai mufakat merupakan salah satu nilai luhur bangsa Indonesia yang sangat relevan dengan pengamalan sila keempat Pancasila. Jika dalam suatu musyawarah tidak tercapai mufakat, maka langkah selanjutnya yang sesuai dengan prinsip demokrasi Pancasila adalah...",
    pilihan: [
      { id: 'A', teks: 'Keputusan diserahkan kepada pemimpin rapat secara mutlak.' },
      { id: 'B', teks: 'Melakukan pemungutan suara (voting) dan menerima hasilnya dengan lapang dada.' },
      { id: 'C', teks: 'Membubarkan musyawarah dan menyerahkan keputusan kepada pemerintah pusat.' },
      { id: 'D', teks: 'Mencari pendapat dari tokoh masyarakat yang paling dihormati.' },
      { id: 'E', teks: 'Menunda keputusan hingga semua pihak setuju tanpa kecuali.' },
    ],
    jawaban_benar: 'B',
    pembahasan: "Sila keempat mengutamakan musyawarah mufakat. Namun, jika mufakat tidak tercapai setelah diupayakan, mekanisme demokrasi selanjutnya adalah pemungutan suara (voting). Hasil voting harus diterima dan dilaksanakan dengan penuh tanggung jawab oleh semua peserta, sebagai cerminan dari semangat kebersamaan.",
  },
  {
    id: 5,
    soal: "Sikap yang mencerminkan pengamalan sila kelima Pancasila dalam kehidupan ekonomi adalah...",
    pilihan: [
      { id: 'A', teks: 'Menghindari persaingan usaha dan memonopoli pasar.' },
      { id: 'B', teks: 'Mengembangkan sikap hidup boros dan suka pamer kemewahan.' },
      { id: 'C', teks: 'Tidak memberikan pertolongan kepada orang lain yang membutuhkan.' },
      { id: 'D', teks: 'Bekerja keras, menghargai hasil karya orang lain, dan tidak melakukan pemerasan.' },
      { id: 'E', teks: 'Fokus menumpuk kekayaan pribadi tanpa peduli kesenjangan sosial.' },
    ],
    jawaban_benar: 'D',
    pembahasan: "Sila kelima, 'Keadilan Sosial bagi Seluruh Rakyat Indonesia', menekankan keseimbangan antara hak dan kewajiban serta kerja keras untuk kemajuan bersama. Sikap bekerja keras, menghargai karya orang lain, menjauhi pemerasan, dan mengembangkan sikap adil merupakan cerminan dari upaya mewujudkan keadilan sosial dalam bidang ekonomi.",
  },
  {
    id: 6,
    soal: "Pancasila sebagai ideologi terbuka memiliki tiga dimensi, yaitu dimensi realitas, idealisme, dan fleksibilitas. Dimensi fleksibilitas memiliki makna bahwa...",
    pilihan: [
        { id: 'A', teks: 'Nilai-nilai dasar Pancasila bersumber dari budaya dan pengalaman nyata masyarakat Indonesia.' },
        { id: 'B', teks: 'Pancasila mengandung cita-cita yang ingin dicapai dalam berbagai bidang kehidupan.' },
        { id: 'C', teks: 'Pancasila memiliki keluwesan yang memungkinkan pengembangan pemikiran baru tanpa mengubah nilai dasarnya.' },
        { id: 'D', teks: 'Nilai-nilai Pancasila bersifat kaku dan tidak dapat ditafsirkan ulang.' },
        { id: 'E', teks: 'Pancasila harus diganti setiap periode pemerintahan untuk menyesuaikan zaman.' },
    ],
    jawaban_benar: 'C',
    pembahasan: "Dimensi fleksibilitas menunjukkan bahwa Pancasila bukanlah ideologi yang kaku dan tertutup. Ia memiliki keluwesan yang memungkinkan adanya pengembangan pemikiran-pemikiran baru yang relevan dengan perkembangan zaman, namun tanpa mengingkari atau mengubah hakikat dan nilai-nilai dasar yang terkandung di dalamnya. Dimensi realitas terkait dengan pilihan A, dan dimensi idealisme terkait dengan pilihan B.",
  }
])

// --- State Management untuk Kuis ---
const userAnswers = ref<Record<number, string | null>>({})
const showResults = ref(false)

// Inisialisasi jawaban pengguna
function initializeAnswers() {
  questions.value.forEach(q => {
    userAnswers.value[q.id] = null
  })
}
initializeAnswers()

// --- Logika Perhitungan Skor ---
const score = computed(() => {
  return questions.value.reduce((count, question) => {
    return userAnswers.value[question.id] === question.jawaban_benar ? count + 1 : count
  }, 0)
})

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

// --- Fungsi untuk Mengelola Kuis ---
function submitQuiz() {
  // Validasi: pastikan semua soal dijawab (opsional, bisa dihilangkan)
  const allAnswered = questions.value.every(q => userAnswers.value[q.id] !== null);
  if (!allAnswered) {
    if (!confirm('Beberapa soal belum dijawab. Apakah Anda yakin ingin melihat hasil?')) {
        return;
    }
  }
  showResults.value = true
  // Scroll ke atas agar pengguna melihat ringkasan skor
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetQuiz() {
  showResults.value = false
  initializeAnswers()
}

// --- Fungsi Helper ---
function getOptionText(question: typeof questions.value[0], optionId: string | null) {
  if (!optionId) return ''
  const option = question.pilihan.find(p => p.id === optionId)
  return option ? `${option.id}. ${option.teks}` : ''
}
</script>

<style scoped>
/* Styling tambahan jika diperlukan, misalnya untuk radio button kustom */
.prose {
  line-height: 1.7;
}
.prose ol > li::marker {
  font-weight: bold;
}
</style>