<template>
  <!-- 
    Menggunakan komponen CPNSLayout yang telah ditentukan.
    Props seperti judul, deskripsi, dan kategori diteruskan ke layout untuk konsistensi.
    Properti 'showResult' yang reaktif mengontrol visibilitas slot 'result' di layout.
    Event 'back' dan 'next' dari layout di-handle oleh fungsi di halaman ini.
  -->
  <CPNSLayout
    :test-title="pageInfo.testTitle"
    :test-description="pageInfo.testDescription"
    :unit-title="pageInfo.unitTitle"
    :unit-description="pageInfo.unitDescription"
    :categories="pageInfo.categories"
    :show-result="showResult"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- 
      SLOT #material:
      Bagian ini diisi dengan konten pembelajaran. Tujuannya adalah untuk memberikan pemahaman mendalam
      kepada pengguna sebelum mereka mencoba soal latihan. Materi disajikan dalam format yang mudah dibaca
      dengan poin-poin penting.
    -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Materi Pembelajaran: Nasionalisme</CardTitle>
          <CardDescription>Pahami konsep dasar dan sejarah nasionalisme di Indonesia.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-justify">
          <p>
            <strong>Nasionalisme</strong> secara fundamental adalah suatu paham yang menciptakan dan mempertahankan kedaulatan sebuah negara (dalam bahasa Inggris "nation") dengan mewujudkan satu konsep identitas bersama untuk sekelompok manusia yang mempunyai tujuan atau cita-cita yang sama dalam mewujudkan kepentingan nasional. Ini adalah rasa cinta, bangga, dan kesetiaan terhadap tanah air, tanpa memandang rendah bangsa lain.
          </p>
          
          <h4>Bentuk-Bentuk Nasionalisme di Indonesia</h4>
          <p>Nasionalisme di Indonesia tidak lahir dalam ruang hampa. Ia adalah buah dari perjuangan panjang melawan kolonialisme dan imperialisme. Beberapa pilar penting dalam sejarah nasionalisme Indonesia antara lain:</p>
          <ul>
            <li><strong>Kebangkitan Nasional (1908):</strong> Ditandai dengan berdirinya Boedi Oetomo, organisasi ini menjadi pelopor pergerakan nasional yang bertujuan untuk mencapai kemajuan bagi Hindia Belanda melalui pendidikan dan kebudayaan, bukan melalui politik. Ini adalah fase awal tumbuhnya kesadaran sebagai 'satu bangsa'.</li>
            <li><strong>Sumpah Pemuda (1928):</strong> Merupakan momen krusial di mana para pemuda dari berbagai suku, agama, dan daerah mengikrarkan satu tanah air, satu bangsa, dan satu bahasa: Indonesia. Sumpah Pemuda menjadi penegas identitas nasional yang melampaui batas-batas kedaerahan.</li>
            <li><strong>Proklamasi Kemerdekaan (1945):</strong> Puncak dari perjuangan nasionalisme Indonesia, di mana bangsa Indonesia secara de jure dan de facto menyatakan kemerdekaannya dan berdaulat penuh atas wilayahnya.</li>
            <li><strong>Nasionalisme dan Pancasila:</strong> Pancasila adalah dasar dan ideologi negara yang menjadi wujud konkret dari nasionalisme Indonesia. Sila ketiga, "Persatuan Indonesia", secara eksplisit menjadi landasan bagi semangat nasionalisme yang inklusif, menghargai keberagaman dalam bingkai Bhinneka Tunggal Ika.</li>
          </ul>

          <h4>Nasionalisme Positif vs. Chauvinisme</h4>
          <p>
            Penting untuk membedakan antara <strong>nasionalisme positif</strong> dengan <strong>chauvinisme</strong>. Nasionalisme yang dianut Indonesia adalah nasionalisme yang positif, yaitu rasa cinta tanah air yang disertai dengan menghormati kedaulatan dan martabat bangsa lain. Sebaliknya, chauvinisme adalah rasa cinta tanah air yang berlebihan hingga menganggap bangsa sendiri paling unggul dan merendahkan bangsa lain, yang dapat berujung pada konflik dan agresi.
          </p>
          
          <h4>Implementasi Nasionalisme di Era Modern</h4>
          <p>
            Di masa kini, semangat nasionalisme diwujudkan melalui berbagai tindakan, seperti:
          </p>
          <ul>
            <li>Menaati hukum dan peraturan yang berlaku.</li>
            <li>Menggunakan produk dalam negeri sebagai bentuk dukungan terhadap ekonomi nasional.</li>
            <li>Menjaga dan melestarikan budaya lokal sebagai bagian dari kekayaan identitas bangsa.</li>
            <li>Menjaga nama baik Indonesia di kancah internasional.</li>
            <li>Berpartisipasi aktif dalam pembangunan nasional sesuai dengan profesi masing-masing.</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- 
      SLOT #practice:
      Bagian interaktif di mana pengguna dapat menguji pemahaman mereka.
      Terdiri dari tampilan soal, pilihan jawaban, navigasi, dan progress bar.
      Menggunakan v-if="!showResult" untuk menyembunyikan bagian ini saat hasil ditampilkan.
    -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Latihan Soal: Nasionalisme</CardTitle>
              <CardDescription>Uji pemahaman Anda melalui soal pilihan ganda berikut.</CardDescription>
            </div>
            <div class="text-sm font-medium text-muted-foreground">
              Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
            </div>
          </div>
        </CardHeader>
        <CardContent v-if="!showResult">
          <!-- Progress Bar untuk menunjukkan kemajuan pengguna -->
          <div class="mb-6">
            <Progress :model-value="progress" class="w-full" />
            <p class="mt-2 text-xs text-center text-muted-foreground">{{ Math.round(progress) }}% Selesai</p>
          </div>
          
          <!-- Tampilan Soal Saat Ini -->
          <div v-if="currentQuestion" class="space-y-6">
            <p class="font-semibold text-base leading-relaxed">{{ currentQuestionIndex + 1 }}. {{ currentQuestion.question }}</p>
            
            <!-- Pilihan Jawaban menggunakan RadioGroup untuk memastikan hanya satu pilihan -->
            <RadioGroup v-model="selectedOption" class="space-y-3">
              <div v-for="(option, index) in currentQuestion.options" :key="index">
                <Label 
                  :for="`option-${index}`" 
                  class="flex items-center gap-3 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem :id="`option-${index}`" :value="index" />
                  <span>{{ option }}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Tombol Navigasi Latihan -->
          <div class="mt-8 flex justify-end gap-3">
            <Button 
              v-if="currentQuestionIndex < questions.length - 1" 
              @click="handleNextQuestion"
              :disabled="selectedOption === null"
            >
              Soal Berikutnya
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button 
              v-else
              @click="handleSubmitQuiz"
              :disabled="selectedOption === null"
              variant="default"
            >
              Selesaikan & Lihat Hasil
            </Button>
          </div>
        </CardContent>
        <!-- Tampilan setelah kuis selesai, sebelum hasil ditampilkan -->
        <CardContent v-else class="text-center py-12">
           <CircleCheck class="mx-auto h-16 w-16 text-green-500" />
           <h3 class="mt-4 text-2xl font-bold tracking-tight">Latihan Selesai!</h3>
           <p class="mt-2 text-muted-foreground">Hasil Anda sedang diproses dan akan ditampilkan di bawah.</p>
        </CardContent>
      </Card>
    </template>

    <!-- 
      SLOT #result:
      Bagian ini menampilkan hasil akhir dari latihan soal.
      Hanya muncul jika 'showResult' adalah true.
      Memberikan umpan balik yang konstruktif dengan menunjukkan skor, jawaban yang benar,
      dan penjelasan detail untuk setiap soal. Ini adalah bagian krusial untuk proses belajar.
    -->
    <template #result>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>Tinjau jawaban Anda untuk memperdalam pemahaman.</CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Ringkasan Skor -->
          <div class="mb-8 rounded-lg border bg-card p-6 text-center shadow-sm">
            <p class="text-lg text-muted-foreground">Skor Akhir Anda</p>
            <p class="text-5xl font-bold tracking-tighter text-primary">{{ score }} / {{ questions.length * 10 }}</p>
            <p class="mt-2 font-medium">Anda menjawab benar {{ correctAnswersCount }} dari {{ questions.length }} soal.</p>
             <Alert :variant="scoreMessage.variant" class="mt-4 text-left">
              <component :is="scoreMessage.icon" class="h-4 w-4" />
              <AlertTitle>{{ scoreMessage.title }}</AlertTitle>
              <AlertDescription>
                {{ scoreMessage.description }}
              </AlertDescription>
            </Alert>
          </div>
          
          <!-- Detail Jawaban per Soal -->
          <div class="space-y-6">
            <div 
              v-for="(question, index) in questions" 
              :key="`result-${index}`" 
              class="rounded-lg border p-4"
              :class="{
                'border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50': userAnswers[index] === question.correctAnswer,
                'border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50': userAnswers[index] !== question.correctAnswer
              }"
            >
              <p class="mb-3 font-semibold">{{ index + 1 }}. {{ question.question }}</p>
              <div class="space-y-2 text-sm">
                <p><strong>Jawaban Benar:</strong> <span class="text-green-600 dark:text-green-400 font-medium">{{ question.options[question.correctAnswer] }}</span></p>
                <p>
                  <strong>Jawaban Anda:</strong> 
                  <span 
                    :class="{
                      'text-green-600 dark:text-green-400 font-medium': userAnswers[index] === question.correctAnswer,
                      'text-red-600 dark:text-red-400 font-medium': userAnswers[index] !== question.correctAnswer
                    }"
                  >
                    {{ userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Tidak dijawab' }}
                    <CheckCircle2 v-if="userAnswers[index] === question.correctAnswer" class="inline-block ml-1 h-4 w-4 text-green-500" />
                    <XCircle v-else class="inline-block ml-1 h-4 w-4 text-red-500" />
                  </span>
                </p>
                <Alert class="mt-3">
                  <Info class="h-4 w-4" />
                  <AlertTitle>Penjelasan</AlertTitle>
                  <AlertDescription>
                    {{ question.explanation }}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
          
          <!-- Tombol Aksi setelah melihat hasil -->
          <div class="mt-8 flex justify-center">
            <Button @click="resetQuiz" size="lg">
              <RotateCw class="mr-2 h-4 w-4" />
              Ulangi Latihan
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, RotateCw, Info, CheckCircle2, XCircle, CircleCheck, Rocket, Trophy, BookOpen } from 'lucide-vue-next';
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Tipe Data untuk Soal ---
interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // index dari jawaban yang benar
  explanation: string;
}

// --- Metadata Halaman ---
// Informasi ini akan diteruskan sebagai props ke komponen Layout.
const pageInfo = reactive({
  testTitle: 'SKD CPNS',
  testDescription: 'Seleksi Kompetensi Dasar Calon Pegawai Negeri Sipil',
  unitTitle: 'Nasionalisme',
  unitDescription: 'Menguji kemampuan individu dalam mewujudkan kepentingan nasional melalui cita-cita dan tujuan yang sama dengan tetap mempertahankan identitas nasional.',
  categories: ['Tes Wawasan Kebangsaan (TWK)'],
});

// --- Bank Soal untuk Unit Nasionalisme ---
// Soal-soal dibuat untuk mencakup berbagai aspek nasionalisme, dari sejarah hingga implementasi.
const questions = ref<Question[]>([
  {
    question: "Organisasi pergerakan nasional pertama di Indonesia yang menandai era Kebangkitan Nasional dan berfokus pada bidang pendidikan dan kebudayaan adalah...",
    options: ["Sarekat Islam", "Indische Partij", "Boedi Oetomo", "Perhimpunan Indonesia"],
    correctAnswer: 2,
    explanation: "Boedi Oetomo, didirikan pada 20 Mei 1908, dianggap sebagai pelopor pergerakan nasional. Meskipun awalnya berfokus pada pendidikan dan kebudayaan bagi priyayi Jawa, kelahirannya memicu kesadaran nasional dan organisasi-organisasi lain yang lebih politis."
  },
  {
    question: "Sumpah Pemuda 1928 merupakan tonggak penting dalam sejarah nasionalisme Indonesia karena...",
    options: [
      "Menjadi awal perlawanan fisik melawan penjajah.",
      "Menegaskan identitas nasional 'Indonesia' yang melampaui perbedaan suku, agama, dan daerah.",
      "Berhasil mengusir penjajah dari bumi pertiwi.",
      "Menetapkan Pancasila sebagai dasar negara."
    ],
    correctAnswer: 1,
    explanation: "Ikrar Sumpah Pemuda untuk bertumpah darah satu, berbangsa satu, dan berbahasa satu yaitu Indonesia, adalah momen fundamental yang menyatukan berbagai elemen bangsa di bawah satu identitas nasional yang sama, mengatasi sentimen kedaerahan."
  },
  {
    question: "Sikap nasionalisme yang berlebihan dengan menganggap bangsa sendiri lebih unggul dan merendahkan bangsa lain disebut...",
    options: ["Patriotisme", "Chauvinisme", "Liberalisme", "Sukuisme"],
    correctAnswer: 1,
    explanation: "Chauvinisme adalah bentuk nasionalisme yang sempit dan negatif. Nasionalisme yang dianut Indonesia adalah nasionalisme positif yang menghormati bangsa lain, selaras dengan amanat Pembukaan UUD 1945 untuk ikut melaksanakan ketertiban dunia."
  },
  {
    question: "Dalam konteks Pancasila, semangat nasionalisme paling kuat tercermin dalam sila...",
    options: ["Ketuhanan Yang Maha Esa", "Kemanusiaan yang Adil dan Beradab", "Persatuan Indonesia", "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan"],
    correctAnswer: 2,
    explanation: "Sila ketiga, 'Persatuan Indonesia', adalah landasan utama bagi nasionalisme Indonesia. Sila ini menekankan pentingnya persatuan dan kesatuan bangsa di atas segala perbedaan (Bhinneka Tunggal Ika)."
  },
  {
    question: "Manakah dari tindakan berikut yang merupakan wujud implementasi nasionalisme di era digital bagi seorang Warga Negara Indonesia?",
    options: [
      "Hanya mengikuti akun-akun media sosial dari luar negeri.",
      "Menyebarkan berita bohong (hoax) tentang prestasi bangsa lain.",
      "Mempromosikan pariwisata dan produk lokal melalui media sosial dengan narasi yang positif.",
      "Mengabaikan isu-isu politik dalam negeri karena dianggap rumit."
    ],
    correctAnswer: 2,
    explanation: "Menggunakan teknologi dan media sosial untuk mempromosikan citra positif Indonesia, termasuk pariwisata dan produk dalam negeri, adalah bentuk kontribusi nyata dan relevan dari nasionalisme di era modern."
  },
  {
    question: "Tujuan utama nasionalisme Indonesia pada masa pergerakan kemerdekaan adalah...",
    options: [
      "Mendirikan negara berdasarkan satu agama tertentu.",
      "Mencapai kemerdekaan politik dan kedaulatan bangsa dari kolonialisme.",
      "Menguasai negara-negara tetangga di Asia Tenggara.",
      "Bekerja sama sepenuhnya dengan pemerintah kolonial Belanda."
    ],
    correctAnswer: 1,
    explanation: "Fokus utama dari seluruh perjuangan pergerakan nasional adalah untuk melepaskan diri dari belenggu penjajahan dan mendirikan sebuah negara-bangsa yang merdeka dan berdaulat."
  },
  {
    question: "Sikap 'bangga menggunakan produk dalam negeri' adalah perwujudan nasionalisme dalam bidang...",
    options: ["Politik", "Sosial Budaya", "Pertahanan dan Keamanan", "Ekonomi"],
    correctAnswer: 3,
    explanation: "Dengan membeli dan menggunakan produk dalam negeri, warga negara secara langsung mendukung pengusaha lokal, memperkuat industri nasional, dan membantu menjaga stabilitas ekonomi negara. Ini adalah bentuk nasionalisme ekonomi."
  },
  {
    question: "Sebagai seorang ASN, wujud nasionalisme yang paling fundamental adalah...",
    options: [
      "Selalu memakai baju batik setiap hari.",
      "Memberikan pelayanan publik yang adil, profesional, dan tidak diskriminatif kepada seluruh warga negara.",
      "Hanya mau berteman dengan rekan kerja yang berasal dari suku yang sama.",
      "Mengutamakan kepentingan pribadi di atas kepentingan pelayanan."
    ],
    correctAnswer: 1,
    explanation: "Bagi seorang Aparatur Sipil Negara (ASN), nasionalisme termanifestasi dalam tugas utamanya sebagai pelayan publik. Memberikan pelayanan yang prima dan adil kepada semua warga tanpa memandang latar belakang adalah inti dari pengabdian kepada negara."
  },
  {
    question: "Konsep 'Bhinneka Tunggal Ika' memperkuat nasionalisme Indonesia dengan cara...",
    options: [
        "Menyeragamkan semua budaya menjadi satu budaya nasional.",
        "Mengakui dan merangkul keberagaman sebagai kekuatan pemersatu bangsa.",
        "Menghapuskan identitas suku dan daerah.",
        "Mengutamakan budaya mayoritas di atas budaya minoritas."
    ],
    correctAnswer: 1,
    explanation: "Bhinneka Tunggal Ika berarti 'Berbeda-beda tetapi tetap satu'. Konsep ini mengajarkan bahwa keragaman suku, agama, ras, dan budaya bukanlah ancaman, melainkan kekayaan dan kekuatan yang membentuk identitas unik bangsa Indonesia."
  },
  {
      question: "Peran pers dalam menumbuhkan nasionalisme pada awal abad ke-20 adalah...",
      options: [
          "Sebagai media hiburan semata bagi masyarakat.",
          "Menjadi alat propaganda pemerintah kolonial.",
          "Menyebarkan gagasan kemajuan, kesadaran politik, dan kritik terhadap ketidakadilan kolonial.",
          "Fokus memberitakan kabar dari Eropa dan Amerika."
      ],
      correctAnswer: 2,
      explanation: "Media cetak atau pers pada masa pergerakan nasional, seperti koran Medan Prijaji, menjadi corong penting untuk menyebarkan ide-ide nasionalisme, membangkitkan kesadaran politik, dan mengkritik kebijakan pemerintah kolonial yang merugikan rakyat."
  }
]);

// --- State Management untuk Latihan ---
const currentQuestionIndex = ref(0); // Index soal yang sedang ditampilkan
const userAnswers = reactive<Array<number | null>>(Array(questions.value.length).fill(null)); // Menyimpan jawaban user
const selectedOption = ref<number | null>(null); // Pilihan user untuk soal saat ini
const showResult = ref(false); // Mengontrol tampilan hasil
const router = useRouter();

// --- Computed Properties ---
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const progress = computed(() => ((currentQuestionIndex.value) / questions.value.length) * 100);
const correctAnswersCount = computed(() => {
  return questions.value.reduce((count, question, index) => {
    return count + (userAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
});
const score = computed(() => correctAnswersCount.value * 10);

const scoreMessage = computed(() => {
  const percentage = (correctAnswersCount.value / questions.value.length) * 100;
  if (percentage >= 80) {
    return { variant: 'default', icon: Trophy, title: 'Luar Biasa!', description: 'Pemahaman Anda tentang Nasionalisme sangat baik. Pertahankan!' };
  } else if (percentage >= 60) {
    return { variant: 'default', icon: Rocket, title: 'Bagus!', description: 'Anda sudah memahami konsep-konsep utama. Tinjau kembali beberapa poin untuk lebih mantap.' };
  } else {
    return { variant: 'destructive', icon: BookOpen, title: 'Perlu Belajar Lagi', description: 'Jangan khawatir! Baca kembali materi dan tinjau penjelasan untuk meningkatkan pemahaman Anda.' };
  }
});

// --- Fungsi-fungsi Logika Latihan ---
const handleNextQuestion = () => {
  // Simpan jawaban untuk soal saat ini
  if (selectedOption.value !== null) {
    userAnswers[currentQuestionIndex.value] = selectedOption.value;
  }
  
  // Pindah ke soal berikutnya jika masih ada
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    // Reset pilihan untuk soal baru
    selectedOption.value = null;
  }
};

const handleSubmitQuiz = () => {
  // Simpan jawaban untuk soal terakhir
  if (selectedOption.value !== null) {
    userAnswers[currentQuestionIndex.value] = selectedOption.value;
  }
  showResult.value = true;
  // Scroll ke atas untuk melihat hasil
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.fill(null);
  selectedOption.value = null;
  showResult.value = false;
};

// --- Fungsi untuk Event dari Layout ---
const handleBack = () => {
  // Logika untuk kembali ke halaman daftar unit TWK, misalnya
  console.log('Navigasi "Back" dari layout ditekan.');
  router.push('/cpns/twk'); // Contoh navigasi
};

const handleNext = () => {
  // Logika untuk lanjut ke unit berikutnya, misalnya Integritas
  console.log('Navigasi "Next" dari layout ditekan.');
  router.push('/cpns/twk/integritas'); // Contoh navigasi
};

// --- Set definePageMeta untuk menggunakan layout kustom ---
definePageMeta({
  layout: 'cpnslayout',
});
</script>

<style scoped>
/* Menambahkan style khusus jika diperlukan, misalnya untuk transisi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 
  Styling untuk konten 'prose' dari @tailwindcss/typography 
  agar lebih mudah dibaca, bisa di-override di sini jika perlu.
*/
.prose h4 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}
</style>