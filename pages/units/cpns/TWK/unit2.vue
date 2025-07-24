<template>
  <CPNSLayout
    :test-title="pageInfo.testTitle"
    :test-description="pageInfo.testDescription"
    :unit-title="pageInfo.unitTitle"
    :unit-description="pageInfo.unitDescription"
    :categories="pageInfo.categories"
    :show-result="quizState.isFinished"
    @back="handleNavigation('back')"
    @next="handleNavigation('next')"
  >
    <!-- 
      SLOT #material: Berisi materi pembelajaran yang mendalam tentang Bela Negara.
      Materi ini disusun dalam beberapa kartu untuk memisahkan konsep-konsep utama
      agar mudah dipahami oleh pengguna.
    -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Pengantar Konsep Bela Negara</CardTitle>
          <CardDescription>Memahami esensi dan pentingnya Bela Negara bagi setiap warga negara Indonesia.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm space-y-4">
          <p>
            <strong>Bela Negara</strong> adalah sebuah konsep tentang patriotisme seseorang, suatu kelompok atau seluruh komponen dari suatu negara dalam kepentingan mempertahankan eksistensi negara tersebut. Secara fisik, hal ini dapat diartikan sebagai usaha pertahanan menghadapi serangan fisik atau agresi dari pihak yang mengancam keberadaan negara tersebut.
          </p>
          <p>
            Namun, secara non-fisik, konsep ini diartikan sebagai upaya untuk serta berperan aktif dalam memajukan bangsa dan negara, baik melalui pendidikan, moral, sosial maupun peningkatan kesejahteraan orang-orang yang menyusun bangsa tersebut. Bagi Calon Aparatur Sipil Negara (CASN), pemahaman dan implementasi Bela Negara adalah fondasi utama dalam menjalankan tugas pelayanan publik.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Dasar Hukum Bela Negara</CardTitle>
          <CardDescription>Landasan yuridis yang menjadi kewajiban konstitusional bagi warga negara.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>Kewajiban Bela Negara diatur dalam beberapa landasan hukum utama di Indonesia:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong>UUD 1945 Pasal 27 Ayat (3):</strong> Menyatakan bahwa "Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara." Pasal ini menegaskan bahwa bela negara bukan hanya hak, tetapi juga kewajiban bagi seluruh WNI tanpa terkecuali.
            </li>
            <li>
              <strong>UUD 1945 Pasal 30 Ayat (1):</strong> Menyatakan bahwa "Tiap-tiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara." Ini memperluas konteks dari 'pembelaan' menjadi 'pertahanan dan keamanan'.
            </li>
            <li>
              <strong>UU No. 3 Tahun 2002 tentang Pertahanan Negara:</strong> Penyelenggaraan bela negara diatur lebih lanjut dalam undang-undang ini, yang mencakup pendidikan kewarganegaraan, pelatihan dasar kemiliteran secara wajib, pengabdian sebagai prajurit TNI secara sukarela atau wajib, dan pengabdian sesuai dengan profesi.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lima Nilai Dasar Bela Negara</CardTitle>
          <CardDescription>Pilar-pilar utama yang menjadi pedoman dalam mengimplementasikan semangat Bela Negara.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm space-y-4">
          <p>Terdapat lima nilai fundamental yang menjadi inti dari kesadaran Bela Negara:</p>
          <ol class="list-decimal pl-5 space-y-3">
            <li>
              <strong>Cinta Tanah Air:</strong> Diwujudkan dengan mengenal dan mencintai wilayah nasional, menjaga kelestarian lingkungan, serta bangga menggunakan produk dalam negeri.
            </li>
            <li>
              <strong>Sadar Berbangsa dan Bernegara:</strong> Tercermin dari partisipasi aktif dalam organisasi kemasyarakatan, menjalankan hak dan kewajiban sebagai warga negara sesuai peraturan, serta berpikir dan bertindak yang terbaik bagi bangsa.
            </li>
            <li>
              <strong>Setia pada Pancasila sebagai Ideologi Negara:</strong> Memahami nilai-nilai Pancasila dan mengamalkannya dalam kehidupan sehari-hari, serta menjadikan Pancasila sebagai pemersatu bangsa.
            </li>
            <li>
              <strong>Rela Berkorban untuk Bangsa dan Negara:</strong> Bersedia mengorbankan waktu, tenaga, dan pikiran untuk kemajuan bangsa, serta siap membela bangsa dari berbagai macam ancaman.
            </li>
            <li>
              <strong>Kemampuan Awal Bela Negara:</strong> Meliputi kesiapan secara psikis (mental) dan fisik (jasmani) untuk melakukan bela negara, seperti menjaga kesehatan, memiliki kecerdasan emosional, dan senantiasa bersyukur.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementasi Bela Negara bagi ASN</CardTitle>
          <CardDescription>Contoh nyata penerapan nilai-nilai Bela Negara dalam konteks tugas seorang Aparatur Sipil Negara.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm space-y-4">
          <p>Sebagai abdi negara, ASN memiliki peran strategis dalam mengimplementasikan Bela Negara. Berikut contohnya:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Cinta Tanah Air:</strong> Mengabdi kepada negara dan rakyat Indonesia, serta menjaga nama baik instansi dan negara.</li>
            <li><strong>Sadar Berbangsa dan Bernegara:</strong> Menjalankan tugas secara profesional dan tidak berpihak, menciptakan lingkungan kerja yang non-diskriminatif.</li>
            <li><strong>Setia pada Pancasila:</strong> Memegang teguh ideologi Pancasila dalam setiap keputusan dan kebijakan yang dibuat.</li>
            <li><strong>Rela Berkorban:</strong> Memberikan pelayanan kepada publik secara jujur, tanggap, cepat, dan santun.</li>
            <li><strong>Kemampuan Awal Bela Negara:</strong> Senantiasa menjaga kesehatan jasmani dan rohani untuk dapat memberikan kinerja terbaik.</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- 
      SLOT #practice: Bagian kuis interaktif.
      Menggunakan v-if untuk menampilkan soal atau pesan ketika kuis selesai.
      Logika kuis dikelola oleh script di bawah.
    -->
    <template #practice>
      <Card class="relative">
        <CardHeader>
          <CardTitle>Latihan Soal: Bela Negara</CardTitle>
          <CardDescription>Uji pemahaman Anda melalui soal-soal pilihan ganda berikut. Pilih jawaban yang paling tepat.</CardDescription>
        </CardHeader>

        <CardContent v-if="!quizState.isFinished">
          <div v-if="currentQuestion" class="space-y-6">
            <!-- Question Text -->
            <div class="mb-4">
              <p class="font-semibold text-base leading-relaxed">
                Soal {{ quizState.currentQuestionIndex + 1 }} dari {{ questions.length }}
              </p>
              <p class="text-muted-foreground mt-2 text-justify">{{ currentQuestion.question }}</p>
            </div>

            <!-- Options -->
            <div class="space-y-3">
              <Button
                v-for="option in currentQuestion.options"
                :key="option.id"
                :variant="getOptionVariant(currentQuestion.id, option.id)"
                class="w-full h-auto justify-start text-left whitespace-normal"
                @click="selectOption(currentQuestion.id, option.id)"
              >
                <span class="font-bold mr-3">{{ option.id }}.</span>
                <span>{{ option.text }}</span>
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter class="flex justify-between items-center mt-6">
           <Button 
            variant="outline"
            @click="previousQuestion" 
            :disabled="quizState.currentQuestionIndex === 0 || quizState.isFinished"
          >
            Sebelumnya
          </Button>
          
          <div v-if="!quizState.isFinished">
            <Button v-if="quizState.currentQuestionIndex < questions.length - 1" @click="nextQuestion">
              Selanjutnya
            </Button>
            <Button v-else @click="submitQuiz" :disabled="!isAllAnswered">
              Selesaikan Kuis
            </Button>
          </div>
        </CardFooter>
        
        <!-- Indikator Kuis Selesai -->
        <div v-if="quizState.isFinished" class="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div class="text-center p-4">
            <h3 class="text-2xl font-bold text-primary">Kuis Telah Selesai!</h3>
            <p class="text-muted-foreground mt-2">Silakan lihat hasil dan pembahasan di bawah.</p>
          </div>
        </div>
      </Card>
    </template>

    <!-- 
      SLOT #result: Menampilkan hasil kuis setelah selesai.
      Termasuk skor, rekap jawaban, dan pembahasan mendalam untuk setiap soal.
    -->
    <template #result>
      <Card>
        <CardHeader>
          <CardTitle>Hasil dan Pembahasan</CardTitle>
          <CardDescription>Analisis jawaban Anda untuk memperkuat pemahaman konsep Bela Negara.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Score Summary -->
          <div class="p-6 bg-muted rounded-lg text-center">
            <h3 class="text-lg font-semibold">Skor Anda</h3>
            <p class="text-4xl font-bold text-primary my-2">{{ quizState.score }} / {{ questions.length }}</p>
            <p class="text-muted-foreground">
              {{ getScoreMessage() }}
            </p>
            <Button @click="resetQuiz" class="mt-4">
              Coba Lagi
            </Button>
          </div>
          
          <!-- Detailed Review -->
          <div>
            <h3 class="text-xl font-semibold mb-4 border-b pb-2">Rincian Jawaban</h3>
            <div class="space-y-6">
              <div v-for="(question, index) in questions" :key="question.id" class="border p-4 rounded-lg">
                <p class="font-semibold">{{ index + 1 }}. {{ question.question }}</p>
                <div class="mt-4 space-y-3">
                  <p><strong>Jawaban Anda:</strong> 
                    <span 
                      :class="quizState.userAnswers[question.id] === question.answer ? 'text-green-600 font-bold' : 'text-red-600 font-bold'"
                    >
                      {{ getAnswerText(question.id) }}
                    </span>
                    <span v-if="quizState.userAnswers[question.id] === question.answer"> (Benar)</span>
                    <span v-else> (Salah)</span>
                  </p>
                  <p><strong>Jawaban yang Benar:</strong> 
                    <span class="text-green-600 font-bold">{{ getCorrectAnswerText(question) }}</span>
                  </p>
                  <div class="mt-3 pt-3 border-t">
                    <p class="font-semibold mb-1">Pembahasan:</p>
                    <p class="text-sm text-muted-foreground text-justify">{{ question.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from '#app' // Menggunakan auto-import dari Nuxt
import { useToast } from '@/components/ui/toast/use-toast'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location

// --- Page & Layout Configuration ---
definePageMeta({
  layout: 'cpns-layout',
})

const { toast } = useToast()
const router = useRouter()

const pageInfo = reactive({
  testTitle: 'SKD - Seleksi Kompetensi Dasar',
  testDescription: 'Persiapan Menghadapi Tes Wawasan Kebangsaan (TWK)',
  unitTitle: 'Bela Negara',
  unitDescription: 'Materi dan latihan soal mengenai konsep, dasar hukum, dan implementasi kesadaran bela negara dalam kehidupan berbangsa dan bernegara, khususnya bagi ASN.',
  categories: ['TWK', 'Nasionalisme', 'Konstitusi', 'ASN']
})


// --- Bela Negara Questions Data ---
// Struktur data yang komprehensif untuk soal, pilihan, jawaban, dan penjelasan.
const questions = ref([
  {
    id: 1,
    question: "Kewajiban untuk ikut serta dalam upaya pembelaan negara bagi setiap warga negara Indonesia secara eksplisit diatur dalam UUD 1945, khususnya pada...",
    options: [
      { id: 'A', text: 'Pasal 27 Ayat (1)' },
      { id: 'B', text: 'Pasal 27 Ayat (3)' },
      { id: 'C', text: 'Pasal 30 Ayat (1)' },
      { id: 'D', text: 'Pasal 31 Ayat (1)' },
      { id: 'E', text: 'Pasal 28E Ayat (3)' }
    ],
    answer: 'B',
    explanation: "Pasal 27 Ayat (3) UUD 1945 secara tegas menyatakan bahwa 'Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara'. Pasal 30 Ayat (1) berkaitan dengan usaha pertahanan dan keamanan negara, yang merupakan bagian dari bela negara tetapi Pasal 27 Ayat (3) adalah landasan utama untuk 'pembelaan negara'."
  },
  {
    id: 2,
    question: "Seorang ASN yang selalu datang tepat waktu, mengerjakan tugas dengan penuh tanggung jawab, dan menolak segala bentuk gratifikasi merupakan cerminan dari implementasi nilai dasar bela negara, yaitu...",
    options: [
      { id: 'A', text: 'Cinta tanah air' },
      { id: 'B', text: 'Setia pada Pancasila sebagai ideologi negara' },
      { id: 'C', text: 'Sadar berbangsa dan bernegara' },
      { id: 'D', text: 'Rela berkorban untuk bangsa dan negara' },
      { id: 'E', text: 'Kemampuan awal bela negara' }
    ],
    answer: 'C',
    explanation: "Sikap disiplin, bertanggung jawab, dan berintegritas (menolak gratifikasi) adalah wujud kesadaran akan perannya sebagai warga negara dan abdi negara. Ini adalah indikator utama dari nilai 'Sadar Berbangsa dan Bernegara', di mana seseorang menjalankan hak dan kewajibannya sesuai dengan profesi dan peraturan yang berlaku."
  },
  {
    id: 3,
    question: "Di bawah ini, yang BUKAN merupakan bentuk penyelenggaraan usaha bela negara menurut UU No. 3 Tahun 2002 tentang Pertahanan Negara adalah...",
    options: [
      { id: 'A', text: 'Pendidikan Kewarganegaraan' },
      { id: 'B', text: 'Pengabdian sebagai prajurit Tentara Nasional Indonesia' },
      { id: 'C', text: 'Pelatihan dasar kemiliteran secara wajib' },
      { id: 'D', text: 'Menjadi anggota partai politik untuk menyuarakan aspirasi' },
      { id: 'E', text: 'Pengabdian sesuai dengan profesi' }
    ],
    answer: 'D',
    explanation: "Menurut UU No. 3 Tahun 2002, bentuk bela negara meliputi Pendidikan Kewarganegaraan, pelatihan dasar kemiliteran, pengabdian sebagai prajurit TNI, dan pengabdian sesuai profesi. Menjadi anggota partai politik adalah hak politik warga negara, namun tidak secara spesifik diatur sebagai bentuk penyelenggaraan usaha bela negara dalam undang-undang tersebut."
  },
  {
    id: 4,
    question: "Sikap lebih memilih menggunakan aplikasi buatan dalam negeri daripada aplikasi asing yang memiliki fungsi serupa, meskipun aplikasi asing tersebut lebih populer, merupakan perwujudan dari nilai...",
    options: [
      { id: 'A', text: 'Sadar berbangsa dan bernegara' },
      { id: 'B', text: 'Kemampuan awal bela negara' },
      { id: 'C', text: 'Setia pada Pancasila' },
      { id: 'D', text: 'Cinta tanah air' },
      { id: 'E', text: 'Rela berkorban' }
    ],
    answer: 'D',
    explanation: "Mendukung dan bangga menggunakan produk dalam negeri, termasuk produk digital seperti aplikasi, adalah salah satu indikator utama dari nilai 'Cinta Tanah Air'. Ini menunjukkan upaya untuk mendukung perekonomian dan kemandirian teknologi bangsa."
  },
    {
    id: 5,
    question: "Menjaga kesehatan jasmani dan rohani agar selalu prima dalam menjalankan aktivitas sehari-hari, termasuk dalam bekerja, adalah implementasi dari nilai dasar bela negara yaitu...",
    options: [
      { id: 'A', text: 'Kemampuan awal bela negara' },
      { id: 'B', text: 'Rela berkorban untuk bangsa dan negara' },
      { id: 'C', text: 'Sadar berbangsa dan bernegara' },
      { id: 'D', text: 'Cinta tanah air' },
      { id: 'E', text: 'Setia pada Pancasila' }
    ],
    answer: 'A',
    explanation: "Kemampuan awal bela negara mencakup kesiapan fisik (jasmani) dan mental (psikis). Dengan menjaga kesehatan, seseorang memastikan dirinya memiliki kapabilitas dasar untuk melakukan pembelaan negara dalam berbagai bentuk, termasuk memberikan kinerja terbaik dalam profesinya."
  },
  {
    id: 6,
    question: "Seorang warga negara yang aktif melaporkan potensi ancaman siber seperti penyebaran hoaks yang memecah belah persatuan kepada pihak berwenang menunjukkan sikap...",
    options: [
      { id: 'A', text: 'Partisipasi dalam keamanan lingkungan (siskamling)' },
      { id: 'B', text: 'Pengabdian sesuai profesi' },
      { id: 'C', text: 'Bela negara secara non-fisik' },
      { id: 'D', text: 'Pelatihan dasar kemiliteran' },
      { id: 'E', text: 'Hak untuk berserikat dan berkumpul' }
    ],
    answer: 'C',
    explanation: "Bela negara tidak hanya berarti mengangkat senjata (fisik). Melawan ancaman modern seperti hoaks, disinformasi, dan ujaran kebencian yang dapat merusak tatanan sosial adalah bentuk bela negara non-fisik yang sangat relevan di era digital. Ini adalah wujud menjaga kedaulatan ideologi dan persatuan bangsa."
  },
  {
    id: 7,
    question: "Pancasila sebagai dasar negara merupakan landasan fundamental. Sikap seorang ASN yang menolak ajakan untuk bergabung dalam sebuah gerakan yang ingin mengganti ideologi Pancasila adalah wujud dari nilai bela negara...",
    options: [
      { id: 'A', text: 'Cinta tanah air' },
      { id: 'B', text: 'Sadar berbangsa dan bernegara' },
      { id: 'C', text: 'Setia pada Pancasila sebagai ideologi negara' },
      { id: 'D', text: 'Rela berkorban untuk bangsa dan negara' },
      { id: 'E', text: 'Kemampuan awal bela negara' }
    ],
    answer: 'C',
    explanation: "Menolak ideologi lain yang bertentangan dengan Pancasila dan mempertahankan Pancasila sebagai satu-satunya dasar dan ideologi negara adalah esensi dari nilai 'Setia pada Pancasila sebagai ideologi negara'. Ini adalah komitmen untuk menjaga konsensus nasional yang telah diperjuangkan para pendiri bangsa."
  },
  {
    id: 8,
    question: "Seorang dokter yang memilih untuk mengabdi di daerah terpencil dan tertinggal meskipun mendapat tawaran karir yang lebih baik di kota besar, menunjukkan implementasi nilai bela negara yang paling menonjol, yaitu...",
    options: [
      { id: 'A', text: 'Kemampuan awal bela negara' },
      { id: 'B', text: 'Cinta tanah air' },
      { id: 'C', text: 'Sadar berbangsa dan bernegara' },
      { id: 'D', text: 'Rela berkorban untuk bangsa dan negara' },
      { id: 'E', text: 'Setia pada Pancasila' }
    ],
    answer: 'D',
    explanation: "Tindakan dokter tersebut menunjukkan kesediaan untuk mengorbankan kepentingan pribadi (karir yang lebih baik) demi kepentingan yang lebih besar, yaitu kemajuan bangsa dan negara melalui pemerataan layanan kesehatan. Ini adalah contoh nyata dari nilai 'Rela Berkorban untuk Bangsa dan Negara'."
  }
])

// --- Quiz Logic & State Management ---
const quizState = reactive({
  currentQuestionIndex: 0,
  userAnswers: {} as Record<number, string>,
  isFinished: false,
  score: 0,
})

const currentQuestion = computed(() => questions.value[quizState.currentQuestionIndex])

const isAllAnswered = computed(() => {
  return Object.keys(quizState.userAnswers).length === questions.value.length;
})

function selectOption(questionId: number, optionId: string) {
  if (quizState.isFinished) return;
  quizState.userAnswers[questionId] = optionId;
}

function nextQuestion() {
  if (quizState.currentQuestionIndex < questions.value.length - 1) {
    quizState.currentQuestionIndex++;
  }
}

function previousQuestion() {
  if (quizState.currentQuestionIndex > 0) {
    quizState.currentQuestionIndex--;
  }
}

function submitQuiz() {
  if (!isAllAnswered.value) {
    toast({
      title: 'Kuis Belum Selesai',
      description: 'Harap jawab semua pertanyaan sebelum menyelesaikan kuis.',
      variant: 'destructive',
    });
    return;
  }
  
  // Calculate score
  let correctAnswers = 0;
  questions.value.forEach(question => {
    if (quizState.userAnswers[question.id] === question.answer) {
      correctAnswers++;
    }
  });
  quizState.score = correctAnswers;
  quizState.isFinished = true;
  
  toast({
    title: 'Kuis Selesai!',
    description: `Anda berhasil menjawab ${quizState.score} dari ${questions.value.length} soal dengan benar.`,
  });
}

function resetQuiz() {
  quizState.currentQuestionIndex = 0;
  quizState.userAnswers = {};
  quizState.isFinished = false;
  quizState.score = 0;
}

// --- UI Helper Functions ---

function getOptionVariant(questionId: number, optionId: string): 'default' | 'outline' | 'secondary' {
  if (quizState.userAnswers[questionId] === optionId) {
    return 'default'; // Selected by user
  }
  return 'outline';
}

function getScoreMessage(): string {
  const percentage = (quizState.score / questions.value.length) * 100;
  if (percentage === 100) return "Luar biasa! Pemahaman Anda tentang Bela Negara sangat solid.";
  if (percentage >= 80) return "Sangat baik! Terus pertahankan dan tingkatkan pemahaman Anda.";
  if (percentage >= 60) return "Cukup baik. Perhatikan kembali pembahasan untuk soal yang salah.";
  if (percentage >= 40) return "Perlu belajar lebih giat. Fokus pada materi dan pembahasan yang disediakan.";
  return "Jangan menyerah! Pelajari kembali materi dan coba lagi. Anda pasti bisa!";
}

function getAnswerText(questionId: number): string {
  const answerId = quizState.userAnswers[questionId];
  if (!answerId) return "Tidak dijawab";
  
  const question = questions.value.find(q => q.id === questionId);
  const option = question?.options.find(o => o.id === answerId);
  return option ? `${option.id}. ${option.text}` : "Tidak dijawab";
}

function getCorrectAnswerText(question: typeof questions.value[0]): string {
  const correctOption = question.options.find(o => o.id === question.answer);
  return correctOption ? `${correctOption.id}. ${correctOption.text}` : "";
}

// --- Navigation ---
function handleNavigation(direction: 'back' | 'next') {
    // This is a placeholder for actual routing logic
    // In a real app, you would navigate to the previous or next unit page
    const route = direction === 'back' ? '/cpns/twk' : '/cpns/twk/nasionalisme'; // Example routes
    toast({
      title: 'Navigasi',
      description: `Ini adalah contoh navigasi. Anda akan diarahkan ke ${route}`,
    })
    // router.push(route); // Uncomment to enable actual navigation
}
</script>

<style scoped>
/* Transisi untuk bagian hasil kuis */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>