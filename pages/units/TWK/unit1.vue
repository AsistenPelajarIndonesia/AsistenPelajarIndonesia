<template>
  <CPNSLayout
    test-title="Seleksi Kompetensi Dasar (SKD)"
    test-description="Latihan soal untuk subtes Tes Wawasan Kebangsaan (TWK) CPNS."
    unit-title="Unit 1: Integritas"
    unit-description="Mendalami dan menguji pemahaman Anda mengenai pentingnya integritas bagi seorang Aparatur Sipil Negara (ASN) dalam menjalankan tugas dan fungsinya sebagai pelayan publik."
    :categories="['Integritas', 'ASN', 'Anti-Korupsi', 'Etika Publik']"
    :show-result="isSubmitted"
    @back="handleNavigation('back')"
    @next="handleNavigation('next')"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                              -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Materi Pembelajaran: Konsep Integritas ASN</CardTitle>
          <CardDescription>
            Pahami pilar-pilar integritas yang harus dimiliki oleh setiap ASN.
          </CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none text-foreground">
          <p>
            <strong>Integritas</strong> adalah salah satu dari empat pilar penting dalam seleksi CPNS, selain Nasionalisme, Bela Negara, dan Pilar Negara. Integritas secara fundamental adalah konsistensi dan keteguhan yang tak tergoyahkan dalam menjunjung tinggi nilai-nilai luhur dan keyakinan. Bagi seorang Aparatur Sipil Negara (ASN), integritas adalah mutu, sifat, atau keadaan yang menunjukkan kesatuan yang utuh sehingga memiliki potensi dan kemampuan yang memancarkan kewibawaan dan kejujuran.
          </p>
          <h4>Definisi dan Dimensi Integritas</h4>
          <p>
            Menurut Kamus Besar Bahasa Indonesia (KBBI), integritas adalah "mutu, sifat, atau keadaan yg menunjukkan kesatuan yg utuh sehingga memiliki potensi dan kemampuan yg memancarkan kewibawaan; kejujuran". Dalam konteks birokrasi, integritas mencakup beberapa dimensi kunci:
          </p>
          <ul>
            <li><strong>Kejujuran:</strong> Bertindak lurus, tidak berbohong, dan tidak curang. Seorang ASN harus transparan dalam setiap tindakannya.</li>
            <li><strong>Tanggung Jawab:</strong> Kesediaan untuk menanggung segala sesuatu dari perbuatan yang dilakukan. ASN bertanggung jawab atas tugasnya kepada negara dan masyarakat.</li>
            <li><strong>Disiplin:</strong> Ketaatan pada peraturan dan norma yang berlaku. Ini mencakup disiplin waktu, anggaran, dan pelaksanaan tugas.</li>
            <li><strong>Konsistensi:</strong> Kesesuaian antara perkataan dan perbuatan. Apa yang diucapkan harus selaras dengan tindakan yang diambil.</li>
            <li><strong>Anti-Korupsi:</strong> Secara aktif menolak segala bentuk praktik korupsi, kolusi, dan nepotisme (KKN). Ini adalah wujud tertinggi dari integritas seorang pelayan publik.</li>
          </ul>

          <h4>Pentingnya Integritas bagi ASN</h4>
          <p>
            ASN yang berintegritas adalah fondasi dari pemerintahan yang baik (<em>good governance</em>). Tanpa integritas, kepercayaan publik terhadap pemerintah akan runtuh. Berikut adalah beberapa alasan mengapa integritas sangat krusial:
          </p>
          <ol>
            <li><strong>Mencegah Korupsi:</strong> ASN yang berintegritas tinggi akan menolak suap, gratifikasi, dan penyalahgunaan wewenang.</li>
            <li><strong>Meningkatkan Kualitas Pelayanan Publik:</strong> Pelayanan yang diberikan akan lebih adil, transparan, dan tidak diskriminatif.</li>
            <li><strong>Membangun Kepercayaan Publik:</strong> Masyarakat akan lebih percaya dan mendukung program-program pemerintah jika dijalankan oleh birokrat yang jujur dan bertanggung jawab.</li>
            <li><strong>Menjaga Wibawa Pemerintah:</strong> Integritas individu ASN secara kolektif akan membangun citra dan kewibawaan institusi pemerintah.</li>
          </ol>
          <h4>Contoh Perilaku Berintegritas</h4>
          <ul>
              <li>Menolak hadiah atau gratifikasi yang berhubungan dengan jabatan.</li>
              <li>Melaporkan setiap tindakan penyelewengan yang diketahui kepada pihak yang berwenang.</li>
              <li>Menggunakan fasilitas kantor hanya untuk kepentingan dinas.</li>
              <li>Datang dan pulang kerja tepat waktu sesuai dengan aturan yang berlaku.</li>
              <li>Menyelesaikan pekerjaan sesuai dengan target dan standar kualitas yang ditetapkan tanpa memerlukan pengawasan ketat.</li>
          </ul>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Latihan Soal: Uji Pemahaman Integritas</CardTitle>
          <CardDescription>
            Pilih jawaban yang paling tepat. Setelah selesai, klik "Kumpulkan Jawaban" di bagian bawah untuk melihat hasil dan pembahasan.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <div v-for="(q, index) in questions" :key="q.id" class="border-t pt-4">
            <p class="font-semibold mb-3">{{ index + 1 }}. {{ q.question }}</p>
            <RadioGroup v-model="userAnswers[q.id]" :disabled="isSubmitted">
              <div v-for="(option, optIndex) in q.options" :key="optIndex" class="flex items-center space-x-2 mb-2">
                <RadioGroupItem :id="`${q.id}-${optIndex}`" :value="optIndex" />
                <Label :for="`${q.id}-${optIndex}`">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button v-if="!isSubmitted" class="w-full" @click="submitAnswers">
            Kumpulkan Jawaban
          </Button>
          <p v-else class="text-sm text-center w-full text-muted-foreground">
            Anda telah menyelesaikan latihan ini. Lihat hasil di bawah.
          </p>
        </CardFooter>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: HASIL DAN PEMBAHASAN                                              -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>
            Berikut adalah rincian jawaban Anda. Pelajari pembahasan untuk meningkatkan pemahaman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Score Summary -->
          <div class="mb-8 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div class="flex flex-col items-center gap-2">
              <h3 class="text-lg font-semibold tracking-tight">Skor Akhir</h3>
              <p class="text-5xl font-bold text-primary">{{ score.correct }} / {{ questions.length }}</p>
              <p class="text-muted-foreground">Persentase Ketepatan: {{ score.percentage.toFixed(2) }}%</p>
              <Progress :model-value="score.percentage" class="mt-4 w-full md:w-1/2" />
            </div>
          </div>
          
          <!-- Detailed Breakdown -->
          <div class="flex flex-col gap-6">
            <div 
              v-for="(q, index) in questions" 
              :key="`result-${q.id}`"
              :class="[
                'rounded-lg border p-4 transition-all',
                userAnswers[q.id] === q.answer ? 'border-green-500 bg-green-500/5' : 'border-red-500 bg-red-500/5'
              ]"
            >
              <p class="font-semibold mb-3">{{ index + 1 }}. {{ q.question }}</p>
              
              <!-- Options Breakdown -->
              <div class="flex flex-col gap-2 my-4">
                <div v-for="(option, optIndex) in q.options" :key="optIndex" :class="getOptionClass(q, optIndex)">
                  <template v-if="optIndex === q.answer">
                    <CheckCircle class="h-4 w-4 mr-2 inline-block" />
                    <span><strong>Jawaban Benar:</strong> {{ option }}</span>
                  </template>
                  <template v-else-if="optIndex === userAnswers[q.id]">
                    <XCircle class="h-4 w-4 mr-2 inline-block" />
                    <span><strong>Jawaban Anda:</strong> {{ option }}</span>
                  </template>
                  <template v-else>
                     <Circle class="h-4 w-4 mr-2 inline-block opacity-30" />
                    <span>{{ option }}</span>
                  </template>
                </div>
              </div>
              
              <!-- Explanation -->
              <Accordion type="single" collapsible class="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Lihat Pembahasan</AccordionTrigger>
                  <AccordionContent class="prose prose-sm max-w-none">
                    <p>{{ q.explanation }}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </div>
          </div>
        </CardContent>
       </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle, XCircle, Circle } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import CPNSLayout from '@/layouts/CPNSLayout.vue';


// --- Interfaces ---
interface Question {
  id: number
  question: string
  options: string[]
  answer: number // 0-based index
  explanation: string
}

interface UserAnswers {
  [key: number]: number | undefined
}

// --- Component State ---
const router = useRouter()
const isSubmitted = ref(false)
const userAnswers = reactive<UserAnswers>({})

// --- Data: Questions for 'Integritas' unit ---
const questions = ref<Question[]>([
  {
    id: 1,
    question: "Seorang ASN di bagian pengadaan barang dan jasa ditawari sejumlah uang oleh seorang kontraktor agar dimenangkan dalam tender proyek. Sikap yang paling mencerminkan integritas adalah...",
    options: [
      "Menerima uang tersebut karena merupakan 'uang lelah' yang wajar.",
      "Menolak secara halus dan melaporkan kejadian tersebut kepada atasan atau unit pengawas internal.",
      "Menerima uang tersebut, namun tetap memilih kontraktor yang paling berkualitas.",
      "Menolak tawaran tersebut namun tidak melaporkannya untuk menjaga hubungan baik.",
      "Meminta pertimbangan dari rekan kerja yang lebih senior sebelum mengambil keputusan."
    ],
    answer: 1,
    explanation: "Integritas menuntut penolakan tegas terhadap segala bentuk gratifikasi atau suap dan keberanian untuk melaporkannya. Opsi B menunjukkan komitmen penuh terhadap prinsip anti-korupsi dan transparansi, yang merupakan inti dari integritas seorang ASN."
  },
  {
    id: 2,
    question: "Konsistensi antara perkataan dan perbuatan merupakan salah satu pilar utama integritas. Manakah dari perilaku berikut yang paling menggambarkan prinsip tersebut?",
    options: [
      "Seorang pejabat publik yang sering berbicara tentang pentingnya hidup sederhana namun memiliki koleksi mobil mewah.",
      "Seorang kepala dinas yang mengeluarkan surat edaran larangan merokok di area kantor dan ia sendiri tidak pernah merokok di area tersebut.",
      "Seorang bendahara yang mengingatkan untuk hemat anggaran tetapi sering mengajukan perjalanan dinas yang tidak terlalu penting.",
      "Seorang atasan yang menuntut kedisiplinan dari bawahan tetapi sering datang terlambat.",
      "Seorang politisi yang berjanji akan memberantas korupsi saat kampanye, namun kemudian terbukti menerima gratifikasi."
    ],
    answer: 1,
    explanation: "Konsistensi adalah keselarasan antara apa yang dikatakan dengan apa yang dilakukan. Opsi B adalah contoh sempurna, di mana seorang pemimpin menerapkan aturan dan menjadi teladan pertama dalam mematuhinya. Ini membangun kepercayaan dan wibawa."
  },
  {
    id: 3,
    question: "Anda adalah seorang staf administrasi yang menemukan bahwa atasan Anda menggunakan mobil dinas untuk keperluan liburan keluarga di akhir pekan. Sebagai ASN yang menjunjung tinggi integritas, tindakan apa yang sebaiknya Anda lakukan?",
    options: [
      "Mengabaikannya karena itu bukan urusan Anda dan bisa membahayakan posisi Anda.",
      "Menegur atasan secara langsung di depan rekan-rekan kerja lainnya.",
      "Mengambil foto sebagai bukti lalu menyebarkannya di media sosial agar viral.",
      "Melaporkan temuan tersebut secara anonim melalui saluran pengaduan resmi yang tersedia (misalnya, Whistleblowing System).",
      "Mendiskusikan hal ini dengan rekan kerja lain dan memutuskan untuk diam bersama-sama."
    ],
    answer: 3,
    explanation: "Integritas menuntut keberanian untuk melawan penyalahgunaan wewenang. Namun, tindakan tersebut harus dilakukan melalui jalur yang benar dan profesional. Melaporkan melalui Whistleblowing System (WBS) adalah cara yang tepat, aman, dan konstruktif untuk menegakkan aturan tanpa menimbulkan konflik yang tidak perlu atau melanggar etika."
  },
  {
    id: 4,
    question: "Manakah dari definisi berikut yang paling tepat menggambarkan 'integritas' dalam konteks Aparatur Sipil Negara (ASN)?",
    options: [
      "Kemampuan untuk bekerja keras dan menyelesaikan semua tugas yang diberikan.",
      "Kesetiaan penuh kepada atasan tanpa mempertanyakan perintah.",
      "Bertindak secara konsisten sesuai dengan nilai, norma, dan etika yang berlaku, serta jujur dan bertanggung jawab.",
      "Memiliki pengetahuan yang luas mengenai peraturan perundang-undangan.",
      "Kemampuan untuk beradaptasi dengan berbagai lingkungan kerja yang berbeda."
    ],
    answer: 2,
    explanation: "Integritas lebih dari sekadar kerja keras atau pengetahuan. Opsi C mencakup esensi integritas: konsistensi (sesuai nilai), kejujuran, dan tanggung jawab. Ini adalah fondasi karakter seorang ASN yang profesional dan beretika."
  },
  {
    id: 5,
    question: "Seorang rekan kerja Anda sering pulang 1 jam lebih awal dari jam kerja yang seharusnya. Namun, pekerjaannya selalu selesai tepat waktu. Bagaimana Anda menyikapinya?",
    options: [
      "Meniru perilakunya karena yang terpenting adalah hasil kerja.",
      "Melaporkan langsung kepada atasan karena ia telah melanggar aturan disiplin pegawai.",
      "Mendiamkannya karena tidak merugikan Anda secara langsung.",
      "Mengingatkannya secara personal dan baik-baik bahwa perilakunya melanggar aturan jam kerja dan bisa menjadi contoh buruk.",
      "Menyindirnya di depan umum agar ia merasa malu dan mengubah perilakunya."
    ],
    answer: 3,
    explanation: "Integritas juga mencakup kepedulian terhadap penegakan aturan di lingkungan kerja. Opsi D menunjukkan sikap yang konstruktif dan empatik. Anda menunjukkan kepedulian pada aturan (disiplin) sekaligus menjaga hubungan baik dengan rekan kerja dengan cara menasihati secara personal, bukan dengan melaporkan atau mempermalukan."
  },
  {
    id: 6,
    question: "Penerapan e-budgeting dan e-procurement dalam sistem pemerintahan adalah salah satu upaya untuk meningkatkan integritas birokrasi, terutama dalam aspek...",
    options: [
      "Kedisiplinan pegawai.",
      "Kecepatan pelayanan publik.",
      "Transparansi dan akuntabilitas pengelolaan anggaran.",
      "Peningkatan kompetensi ASN.",
      "Efisiensi komunikasi antar lembaga."
    ],
    answer: 2,
    explanation: "Sistem elektronik seperti e-budgeting (penganggaran elektronik) dan e-procurement (pengadaan barang/jasa elektronik) dirancang untuk mengurangi interaksi tatap muka yang berpotensi menimbulkan KKN (Korupsi, Kolusi, Nepotisme). Sistem ini membuat proses lebih transparan (dapat dilihat publik) dan akuntabel (tercatat secara digital), yang merupakan pilar penting dalam integritas pengelolaan keuangan negara."
  },
  {
    id: 7,
    question: "Konflik kepentingan (conflict of interest) adalah situasi di mana seorang ASN memiliki kepentingan pribadi yang dapat mempengaruhi objektivitasnya dalam menjalankan tugas. Manakah contoh yang paling jelas dari konflik kepentingan?",
    options: [
      "Seorang guru yang memberikan les privat kepada murid dari sekolah lain di luar jam kerja.",
      "Seorang dokter di RSUD yang juga membuka praktik pribadi di rumahnya.",
      "Seorang pejabat pengadaan yang perusahaannya (milik keluarganya) ikut serta dalam tender yang ia kelola.",
      "Seorang polisi yang menerima ucapan terima kasih dari warga setelah berhasil menangkap pencuri.",
      "Seorang analis kebijakan yang memberikan masukan berdasarkan data riset yang valid."
    ],
    answer: 2,
    explanation: "Opsi C adalah contoh paling gamblang dari konflik kepentingan. Kepentingan pribadi (keuntungan perusahaan keluarga) berpotensi besar mempengaruhi keputusan profesionalnya sebagai pejabat pengadaan, sehingga ia tidak bisa lagi objektif. Ini adalah pelanggaran integritas yang serius."
  },
  {
    id: 8,
    question: "Seorang ASN harus menolak gratifikasi. Namun, dalam situasi tertentu seperti acara adat atau pernikahan, pemberian hadiah sulit dihindari. Menurut peraturan yang berlaku, apa yang harus dilakukan oleh ASN jika menerima gratifikasi yang tidak dapat ditolak?",
    options: [
      "Langsung menggunakannya karena dianggap rezeki.",
      "Menyimpannya secara diam-diam agar tidak ada yang tahu.",
      "Membagikannya kepada rekan-rekan kerja yang lain.",
      "Melaporkan penerimaan gratifikasi tersebut kepada Komisi Pemberantasan Korupsi (KPK) atau Unit Pengendali Gratifikasi (UPG) internal paling lambat 30 hari kerja.",
      "Mengembalikan hadiah tersebut kepada pemberi setelah acara selesai."
    ],
    answer: 3,
    explanation: "Peraturan perundangan di Indonesia (UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi) secara jelas mengatur bahwa setiap gratifikasi yang diterima oleh pegawai negeri atau penyelenggara negara wajib dilaporkan kepada KPK paling lambat 30 hari kerja. Ini adalah mekanisme untuk menjaga integritas dan memisahkan mana pemberian yang tulus dan mana yang berpotensi menjadi suap."
  }
]);

// --- Computed Properties ---
const score = computed(() => {
  if (!isSubmitted.value) {
    return { correct: 0, percentage: 0 };
  }
  
  const correctAnswers = questions.value.reduce((count, q) => {
    return userAnswers[q.id] === q.answer ? count + 1 : count;
  }, 0);
  
  return {
    correct: correctAnswers,
    percentage: (correctAnswers / questions.value.length) * 100
  };
});

// --- Methods ---
function submitAnswers() {
  // Ensure all questions are answered
  const unanswered = questions.value.some(q => userAnswers[q.id] === undefined)
  if (unanswered) {
    alert('Harap jawab semua pertanyaan sebelum mengumpulkan.')
    return
  }
  isSubmitted.value = true;
  // Scroll to result
  const resultElement = document.querySelector('#result');
  if (resultElement) {
    resultElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleNavigation(direction: 'back' | 'next') {
  // This is a placeholder for actual navigation logic
  // e.g., router.push('/twk/nasionalisme')
  alert(`Navigasi ke unit ${direction === 'next' ? 'selanjutnya' : 'sebelumnya'}. Fitur ini dapat diimplementasikan menggunakan Vue Router.`);
}

function getOptionClass(question: Question, optionIndex: number): string {
  const baseClass = 'flex items-center text-sm p-2 rounded';
  
  // If the option is the correct answer
  if (optionIndex === question.answer) {
    return `${baseClass} font-semibold text-green-800 dark:text-green-300 bg-green-500/10`;
  }
  
  // If the option is the user's (wrong) answer
  if (optionIndex === userAnswers[question.id]) {
    return `${baseClass} font-semibold text-red-800 dark:text-red-300 bg-red-500/10 line-through`;
  }

  // Other options
  return `${baseClass} text-muted-foreground`;
}
</script>

<style>
/* Add some subtle transitions for a smoother experience */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
