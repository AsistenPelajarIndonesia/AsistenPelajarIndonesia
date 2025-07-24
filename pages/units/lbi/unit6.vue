<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import SNBTLayout from '@/layouts/SNBTLayout.vue'

// Import komponen UI yang diperlukan (diasumsikan dari shadcn-vue)
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

// --- 1. PENGELOLAAN STATE DAN DATA ---

// State untuk mengelola kuis
const userAnswers = ref<string[]>([]);
const showResult = ref(false);
const score = computed(() => {
  if (!showResult.value) return 0;
  const correctAnswers = questions.value.reduce((count, question, index) => {
    return userAnswers.value[index] === question.correctAnswer ? count + 1 : count;
  }, 0);
  return Math.round((correctAnswers / questions.value.length) * 100);
});

// State untuk navigasi
const route = useRoute();
const router = useRouter();
const currentUnit = ref<number>(1);

onMounted(() => {
  // Ekstrak nomor unit dari URL, contoh: /units/lbi/unit1 -> 1
  const match = route.path.match(/unit(\d+)/);
  if (match && match[1]) {
    currentUnit.value = parseInt(match[1], 10);
  }
  // Inisialisasi jawaban pengguna
  userAnswers.value = Array(questions.value.length).fill(null);
});

// --- 2. DATA KONTEN: SOAL DAN MATERI ---

// Data soal yang dibuat dengan tingkat kesulitan tinggi
const questions = ref([
  {
    text: `Perhatikan kutipan teks berikut:

"Revolusi digital, yang digembar-gemborkan sebagai fajar era baru kemakmuran, secara paradoksal justru menabur benih-benih ketidakpastian ekonomi bagi sebagian besar angkatan kerja. (1) Otomatisasi dan kecerdasan buatan (AI), yang awalnya dirancang sebagai alat bantu manusia, kini berevolusi menjadi substitusi, mengancam jutaan pekerjaan kerah biru dan putih. (2) Sebuah studi dari Oxford Economics memproyeksikan bahwa hingga 20 juta pekerjaan manufaktur global dapat digantikan oleh robot pada tahun 2030. (3) Meskipun para teknokrat berargumen bahwa inovasi akan menciptakan jenis pekerjaan baru, transisi ini tidak akan mulus dan berpotensi memperlebar jurang ketimpangan. (4) Tanpa intervensi kebijakan yang radikal dalam pendidikan dan jaring pengaman sosial, kita tidak sedang menuju utopia teknologi, melainkan distopia di mana efisiensi mesin mengalahkan nilai kemanusiaan. (5)"

Fungsi utama kalimat (4) dalam struktur argumentasi teks di atas adalah sebagai...`,
    options: [
      { id: 'A', text: 'Tesis utama yang ingin dibuktikan oleh penulis.' },
      { id: 'B', text: 'Data pendukung untuk memperkuat klaim pada kalimat (2).' },
      { id: 'C', text: 'Antitesis atau sanggahan terhadap pandangan para teknokrat di kalimat (3).' },
      { id: 'D', text: 'Penegasan ulang (kesimpulan) yang merangkum keseluruhan argumen.' },
    ],
    correctAnswer: 'D',
    explanation: 'Kalimat (4) berfungsi sebagai penegasan ulang atau kesimpulan. Kalimat ini tidak memperkenalkan ide baru, melainkan merangkum dan memberikan pandangan akhir penulis berdasarkan argumen yang telah dibangun sebelumnya (paradoks revolusi digital, ancaman AI, dan kritik terhadap pandangan teknokrat). Pilihan A salah karena tesis utama lebih tersirat pada kalimat (1). Pilihan B salah karena kalimat (4) tidak menyajikan data. Pilihan C salah karena kalimat (4) bukan sanggahan langsung terhadap kalimat (3), melainkan konsekuensi dari keseluruhan diskusi, termasuk kritik pada kalimat (3). Kalimat ini menyimpulkan posisi penulis secara menyeluruh.'
  },
  {
    text: `Bacalah teks berikut dengan saksama:

"Proses fotosintesis pada tumbuhan tingkat tinggi adalah mekanisme biokimia yang kompleks dan fundamental bagi kehidupan di Bumi. Proses ini secara umum dapat dibagi menjadi dua tahap utama: reaksi terang dan reaksi gelap. Reaksi terang, yang bergantung pada cahaya matahari, terjadi di dalam membran tilakoid kloroplas. Pada tahap ini, energi foton dari cahaya matahari digunakan untuk memecah molekul air (fotolisis), menghasilkan oksigen, proton (H+), dan elektron. Energi yang ditangkap kemudian disimpan dalam bentuk molekul berenergi tinggi, yaitu ATP dan NADPH. Selanjutnya, pada reaksi gelap atau Siklus Calvin, yang tidak memerlukan cahaya secara langsung, ATP dan NADPH yang dihasilkan pada reaksi terang digunakan untuk mengubah karbon dioksida (CO2) menjadi glukosa (C6H12O6), sumber energi utama bagi tumbuhan. Dengan demikian, melalui serangkaian reaksi yang terkoordinasi ini, energi cahaya dikonversi menjadi energi kimia yang tersimpan dalam ikatan molekul organik."

Manakah dari pernyataan berikut yang paling akurat mendeskripsikan struktur teks di atas?`,
    options: [
      { id: 'A', text: 'Teks deskriptif yang menggambarkan bentuk fisik kloroplas.' },
      { id: 'B', text: 'Teks eksposisi proses yang menjelaskan tahapan fotosintesis secara kronologis dan kausal.' },
      { id: 'C', text: 'Teks argumentasi yang bertujuan meyakinkan pembaca tentang pentingnya fotosintesis.' },
      { id: 'D', text: 'Teks narasi yang menceritakan penemuan proses fotosintesis oleh ilmuwan.' },
    ],
    correctAnswer: 'B',
    explanation: 'Struktur teks ini adalah **Eksposisi Proses**. Tujuannya adalah untuk memberikan informasi dan menjelaskan bagaimana sesuatu terjadi, dalam hal ini proses fotosintesis. Ciri utamanya adalah penjelasan langkah-demi-langkah atau tahapan (reaksi terang, lalu reaksi gelap) yang dihubungkan secara logis dan kausal. Teks ini tidak bertujuan meyakinkan (argumentasi), tidak menceritakan sebuah kisah (narasi), dan tidak fokus pada penggambaran visual objek (deskripsi fisik), melainkan pada urutan mekanisme.'
  },
  {
    text: `Perhatikan penggalan teks berikut:

"Pasar terapung di delta Sungai Barito bukanlah sekadar tempat transaksi. (1) Ia adalah panggung kehidupan yang riuh, di mana fajar tidak menyingsing dengan cahaya, melainkan dengan riak air yang diciptakan oleh ratusan jukung yang saling bersahutan. (2) Aroma tajam dari tumpukan jeruk, diselingi wangi manis dari kue-kue basah, menari-nari di udara lembap, berebut perhatian dengan bau sangit kopi yang baru diseduh di atas perahu kelotok. (3) Para pedagang, dengan wajah yang diukir oleh terik matahari dan waktu, melemparkan senyum dan tawar-menawar dalam simfoni dialek lokal yang merdu. (4) Berdasarkan data Dinas Pariwisata, kunjungan wisatawan meningkat 15% setiap tahunnya. (5)"

Kalimat manakah yang paling lemah dalam mendukung struktur dominan teks sebagai sebuah **teks deskripsi**?`,
    options: [
      { id: 'A', text: 'Kalimat (1)' },
      { id: 'B', text: 'Kalimat (2)' },
      { id: 'C', text: 'Kalimat (3)' },
      { id: 'D', text: 'Kalimat (5)' },
    ],
    correctAnswer: 'D',
    explanation: 'Teks ini secara dominan berstruktur **Deskripsi**, yang bertujuan untuk menggambarkan suasana dan pengalaman indrawi (penglihatan, penciuman, pendengaran) di pasar terapung. Kalimat (1), (2), dan (3) sangat efektif dalam mencapai tujuan ini dengan menggunakan citraan dan majas ("menari-nari di udara", "simfoni dialek"). Sebaliknya, kalimat (5) menyajikan data statistik ("kunjungan wisatawan meningkat 15%"). Informasi ini bersifat faktual dan informatif, yang merupakan ciri khas **teks eksposisi**. Kalimat ini menyimpang dari tujuan utama teks untuk melukiskan gambaran yang hidup bagi pembaca, sehingga menjadi elemen yang paling lemah dalam struktur deskriptifnya.'
  },
]);

// --- 3. FUNGSI DAN LOGIKA ---

/**
 * Fungsi untuk memeriksa jawaban, menghitung skor, dan menampilkan hasil.
 */
function validateAnswers() {
  // Validasi sederhana untuk memastikan semua soal dijawab
  if (userAnswers.value.includes(null)) {
    alert('Harap jawab semua pertanyaan sebelum memeriksa hasil.');
    return;
  }
  showResult.value = true;
  // Scroll ke bagian hasil untuk UX yang lebih baik
  const resultElement = document.getElementById('result-section');
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Fungsi untuk navigasi ke unit sebelumnya.
 */
function goToPreviousUnit() {
  if (currentUnit.value > 1) {
    router.push(`/units/lbi/unit${currentUnit.value - 1}`);
  } else {
    // Bisa arahkan ke halaman daftar unit atau beri notifikasi
    alert("Ini adalah unit pertama.");
  }
}

/**
 * Fungsi untuk navigasi ke unit selanjutnya.
 */
function goToNextUnit() {
  // Asumsikan ada unit selanjutnya
  router.push(`/units/lbi/unit${currentUnit.value + 1}`);
}
</script>

<template>
  <SNBTLayout
    test-title="Literasi Bahasa Indonesia"
    test-description="Subtes untuk mengukur kemampuan memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks."
    :unit-title="`Unit ${currentUnit}: Menganalisis Struktur Teks`"
    unit-description="Mempelajari cara mengidentifikasi dan menganalisis kerangka dasar berbagai jenis wacana seperti Argumentasi, Eksposisi, Deskripsi, dan lainnya."
    :categories="['Analisis Teks', 'Struktur Wacana', 'Logika Berbahasa']"
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
          <CardTitle>Peta Konsep Struktur Teks</CardTitle>
          <CardDescription>
            Setiap teks ditulis dengan tujuan tertentu, dan tujuan itu menentukan strukturnya. Memahami struktur adalah kunci untuk membongkar makna dan maksud penulis.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <!-- Materi Teks Argumentasi -->
          <div class="rounded-lg border p-4">
            <h3 class="font-bold text-base mb-2">1. Teks Argumentasi</h3>
            <p class="text-sm text-muted-foreground mb-3">
              Bertujuan untuk <strong>meyakinkan</strong> atau <strong>memengaruhi</strong> pembaca agar setuju dengan pendapat penulis. Isinya berupa pendapat (klaim/tesis) yang didukung oleh data, fakta, dan alasan logis.
            </p>
            <div class="text-xs">
              <p><strong>Struktur Umum:</strong></p>
              <ul class="list-disc list-inside ml-2 space-y-1">
                <li><strong>Pendahuluan (Tesis):</strong> Pengenalan isu dan penyampaian klaim/posisi penulis.</li>
                <li><strong>Tubuh Argumen:</strong> Penyajian serangkaian argumen (alasan, bukti, data, contoh) untuk memperkuat tesis. Seringkali juga menyajikan antitesis (argumen lawan) untuk kemudian dipatahkan.</li>
                <li><strong>Kesimpulan (Penegasan Ulang):</strong> Merangkum argumen dan mempertegas kembali posisi penulis.</li>
              </ul>
            </div>
          </div>

          <!-- Materi Teks Eksposisi -->
          <div class="rounded-lg border p-4">
            <h3 class="font-bold text-base mb-2">2. Teks Eksposisi</h3>
            <p class="text-sm text-muted-foreground mb-3">
              Bertujuan untuk <strong>menjelaskan</strong> atau <strong>memaparkan</strong> informasi mengenai suatu topik secara objektif dan logis, tanpa niat memengaruhi. Tujuannya adalah menambah wawasan pembaca.
            </p>
            <div class="text-xs">
              <p><strong>Struktur Umum:</strong></p>
              <ul class="list-disc list-inside ml-2 space-y-1">
                <li><strong>Tesis (Pernyataan Pendapat):</strong> Pengenalan topik yang akan dipaparkan.</li>
                <li><strong>Argumentasi (Rangkaian Argumen):</strong> Penjelasan mendalam berupa fakta, data, atau pernyataan para ahli yang mendukung tesis. Berbeda dengan teks argumentasi, bagian ini fokus untuk 'menjelaskan', bukan 'membuktikan'.</li>
                <li><strong>Penegasan Ulang:</strong> Rangkuman atau simpulan dari paparan yang telah disajikan.</li>
              </ul>
            </div>
          </div>
          
          <!-- Materi Teks Deskripsi -->
          <div class="rounded-lg border p-4">
            <h3 class="font-bold text-base mb-2">3. Teks Deskripsi</h3>
            <p class="text-sm text-muted-foreground mb-3">
              Bertujuan untuk <strong>menggambarkan</strong> atau <strong>melukiskan</strong> suatu objek, tempat, atau suasana secara detail sehingga pembaca seolah-olah dapat melihat, mendengar, atau merasakannya sendiri (menggunakan pancaindra).
            </p>
            <div class="text-xs">
              <p><strong>Struktur Umum:</strong></p>
              <ul class="list-disc list-inside ml-2 space-y-1">
                <li><strong>Identifikasi/Pernyataan Umum:</strong> Pengenalan objek yang akan dideskripsikan.</li>
                <li><strong>Deskripsi Bagian:</strong> Perincian bagian-bagian objek atau suasana berdasarkan pengamatan penulis (misal: deskripsi fisik, suasana hati, dll).</li>
                <li><strong>Simpulan/Kesan (Opsional):</strong> Kesan umum penulis terhadap objek tersebut.</li>
              </ul>
            </div>
          </div>

        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT LATIHAN SOAL                                                       -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal Uji Pemahaman</CardTitle>
          <CardDescription>
            Analisis setiap kutipan teks dengan teliti. Perhatikan tujuan penulis dan bagaimana kalimat-kalimat disusun untuk mencapai tujuan tersebut.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div v-for="(q, index) in questions" :key="index" class="space-y-4">
            <p class="font-medium leading-relaxed">{{ `${index + 1}. ${q.text}` }}</p>
            <RadioGroup v-model="userAnswers[index]" :disabled="showResult">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2">
                <RadioGroupItem :id="`q${index}-${option.id}`" :value="option.id" />
                <Label :for="`q${index}-${option.id}`" class="leading-normal">{{ option.text }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!showResult" class="w-full" @click="validateAnswers">
            Selesai & Periksa Jawaban
          </Button>
          <Alert v-else variant="default" class="w-full border-green-500 bg-green-50">
            <CheckCircle2 class="h-4 w-4 text-green-600" />
            <AlertTitle class="text-green-700">Hasil Telah Tersedia</AlertTitle>
            <AlertDescription class="text-green-600">
              Silakan gulir ke bawah untuk melihat skor dan pembahasan lengkap.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT HASIL DAN PEMBAHASAN                                               -->
    <!-- ======================================================================= -->
    <template #result>
      <div id="result-section">
        <Card class="bg-gray-50">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Akhir dan Pembahasan</CardTitle>
            <CardDescription>
              Evaluasi jawaban Anda dan pahami logika di balik setiap pertanyaan untuk mempertajam analisis Anda.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-8">
            <!-- Score Display -->
            <div class="text-center p-6 rounded-lg" :class="score >= 70 ? 'bg-green-100' : 'bg-red-100'">
              <p class="text-lg font-medium" :class="score >= 70 ? 'text-green-800' : 'text-red-800'">Skor Anda</p>
              <p class="text-6xl font-bold" :class="score >= 70 ? 'text-green-600' : 'text-red-600'">{{ score }}</p>
              <p class="mt-2 text-sm" :class="score >= 70 ? 'text-green-700' : 'text-red-700'">
                {{ score >= 70 ? 'Luar biasa! Pemahaman Anda tentang struktur teks sudah sangat baik.' : 'Jangan khawatir, mari kita pelajari pembahasannya untuk jadi lebih baik!' }}
              </p>
            </div>

            <Separator />

            <!-- Detailed Explanation per Question -->
            <div v-for="(q, index) in questions" :key="`result-${index}`" class="space-y-4">
              <p class="font-semibold text-base">Pembahasan Soal {{ index + 1 }}</p>
              <p class="text-sm text-muted-foreground whitespace-pre-wrap">{{ q.text }}</p>
              
              <div v-for="option in q.options" :key="`res-opt-${option.id}`" 
                class="p-3 rounded-md text-sm"
                :class="{
                  'bg-green-100 border border-green-300 text-green-900': option.id === q.correctAnswer,
                  'bg-red-100 border border-red-300 text-red-900': userAnswers[index] === option.id && option.id !== q.correctAnswer,
                  'bg-gray-50': userAnswers[index] !== option.id && option.id !== q.correctAnswer
                }"
              >
                <div class="flex items-start gap-3">
                   <div class="flex-shrink-0 pt-0.5">
                     <CheckCircle2 v-if="option.id === q.correctAnswer" class="h-4 w-4 text-green-600" />
                     <XCircle v-else-if="userAnswers[index] === option.id" class="h-4 w-4 text-red-600" />
                     <AlertCircle v-else class="h-4 w-4 text-gray-400" />
                   </div>
                   <div>
                     {{ option.text }}
                     <span v-if="option.id === q.correctAnswer" class="font-bold"> (Jawaban Benar)</span>
                     <span v-if="userAnswers[index] === option.id && option.id !== q.correctAnswer" class="font-bold"> (Jawaban Anda)</span>
                   </div>
                </div>
              </div>

              <Alert variant="default" class="mt-4 bg-blue-50 border-blue-200">
                <AlertCircle class="h-4 w-4 text-blue-600" />
                <AlertTitle class="text-blue-800 font-bold">Penjelasan Rinci</AlertTitle>
                <AlertDescription class="text-blue-700 leading-relaxed">
                  {{ q.explanation }}
                </AlertDescription>
              </Alert>
              <Separator v-if="index < questions.length - 1" class="mt-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </SNBTLayout>
</template>

<style>
/* Animasi fade untuk memunculkan hasil */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>