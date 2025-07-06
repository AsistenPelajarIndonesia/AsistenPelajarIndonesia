<template>
  <!--
    This page is designed to integrate seamlessly with the 'CPNSLayout'.
    It passes configuration props like titles and descriptions to the layout,
    and then populates the layout's slots (#material, #practice, #result)
    with the specific content for the "Bhinneka Tunggal Ika" unit.
  -->
  <CPNSLayout
    test-title="Seleksi Kompetensi Dasar (SKD) - CPNS"
    test-description="Latihan Soal untuk Persiapan Ujian Calon Pegawai Negeri Sipil Indonesia."
    unit-title="Unit 1: Bhinneka Tunggal Ika"
    unit-description="Memahami dan mengamalkan makna Bhinneka Tunggal Ika sebagai semboyan pemersatu bangsa dalam bingkai Negara Kesatuan Republik Indonesia (NKRI)."
    :categories="['Tes Wawasan Kebangsaan', 'Pilar Negara', 'Nasionalisme']"
    :show-result="quizState.quizFinished"
    @back="handleBackNavigation"
    @next="handleNextNavigation"
  >
    <!-- ======================================================================= -->
    <!-- SLOT #1: MATERIAL PEMBELAJARAN                                          -->
    <!-- ======================================================================= -->
    <!--
      This slot provides foundational knowledge. Before attempting the practice
      questions, the user is encouraged to read through this material to
      reinforce their understanding, thus directly contributing to skill improvement.
    -->
    <template #material>
      <Card class="shadow-md">
        <CardHeader>
          <CardTitle class="text-xl text-primary">Materi Bhinneka Tunggal Ika</CardTitle>
          <CardDescription>Pahami konsep, sejarah, dan implementasi semboyan negara kita.</CardDescription>
        </CardHeader>
        <CardContent class="prose prose-sm max-w-none dark:prose-invert">
          <h4>1. Pengertian dan Makna</h4>
          <p>
            <strong>Bhinneka Tunggal Ika</strong> adalah semboyan bangsa Indonesia yang tertulis pada lambang negara, Garuda Pancasila. Frasa ini berasal dari bahasa Jawa Kuno yang artinya adalah "Berbeda-beda tetapi tetap satu". Maknanya, meskipun bangsa Indonesia terdiri atas beraneka ragam suku bangsa, adat-istiadat, ras, dan agama, keseluruhannya merupakan satu kesatuan yang utuh, yaitu bangsa dan negara Indonesia.
          </p>

          <h4>2. Sejarah dan Landasan Hukum</h4>
          <ul>
            <li><strong>Asal Usul:</strong> Kutipan ini berasal dari Kakawin Sutasoma, karangan Mpu Tantular pada masa Kerajaan Majapahit (sekitar abad ke-14). Dalam kakawin tersebut, semboyan ini digunakan untuk menunjukkan semangat toleransi antar umat beragama (Hindu Siwa dan Buddha).</li>
            <li><strong>Landasan Hukum:</strong> Semboyan Bhinneka Tunggal Ika secara resmi menjadi bagian dari lambang negara berdasarkan <strong>Pasal 36A UUD 1945</strong> dan diatur lebih lanjut dalam <strong>UU No. 24 Tahun 2009</strong> tentang Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan.</li>
          </ul>

          <h4>3. Implementasi dalam Kehidupan Berbangsa dan Bernegara</h4>
          <p>
            Implementasi Bhinneka Tunggal Ika tercermin dalam berbagai aspek kehidupan:
          </p>
          <ul>
            <li><strong>Sikap Inklusif:</strong> Menerima dan menghargai perbedaan sebagai sebuah kekayaan, bukan sebagai sumber perpecahan.</li>
            <li><strong>Toleransi:</strong> Menghormati keyakinan dan praktik keagamaan orang lain, serta adat istiadat suku yang berbeda.</li>
            <li><strong>Gotong Royong:</strong> Bekerja sama tanpa memandang latar belakang untuk mencapai tujuan bersama.</li>
            <li><strong>Musyawarah Mufakat:</strong> Mencari solusi atas permasalahan bersama dengan mengedepankan dialog dan kompromi.</li>
          </ul>

          <h4>4. Tantangan Kontemporer</h4>
          <p>
            Di era modern, Bhinneka Tunggal Ika menghadapi tantangan seperti polarisasi politik, berita bohong (hoax) yang menyasar sentimen SARA, radikalisme, dan pengaruh globalisasi yang dapat mengikis nilai-nilai lokal. Oleh karena itu, pemahaman dan pengamalan semboyan ini menjadi semakin relevan dan krusial.
          </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #2: LATIHAN SOAL INTERAKTIF                                        -->
    <!-- ======================================================================= -->
    <!--
      The practice slot contains the interactive quiz. It's hidden once the quiz is
      finished to make way for the result slot. This provides the active recall
      and testing part of the learning process.
    -->
    <template #practice>
      <div v-if="!quizState.quizFinished" class="grid auto-rows-max items-start gap-6">
        <Card class="shadow-md">
          <CardHeader>
            <CardTitle>Latihan Soal: Bhinneka Tunggal Ika</CardTitle>
            <CardDescription>
              Uji pemahaman Anda. Pilih jawaban yang paling tepat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <!-- Progress Indicator -->
            <div class="mb-4 flex items-center gap-4">
              <span class="text-sm font-medium text-muted-foreground">
                Soal {{ quizState.currentQuestionIndex + 1 }} dari {{ questions.length }}
              </span>
              <Progress :model-value="progress" class="flex-1" />
            </div>

            <!-- Question Area -->
            <div class="mt-6 rounded-lg border bg-muted/20 p-4">
              <p class="font-semibold leading-relaxed">
                {{ currentQuestion.questionText }}
              </p>
            </div>

            <!-- Options Area -->
            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                variant="outline"
                size="lg"
                class="h-auto justify-start whitespace-normal py-3 text-left"
                :class="{
                  'border-primary bg-primary/10': quizState.userAnswers[currentQuestion.id] === index
                }"
                @click="selectAnswer(currentQuestion.id, index)"
              >
                <span class="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-primary font-bold">
                  {{ String.fromCharCode(65 + index) }}
                </span>
                {{ option.text }}
              </Button>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between border-t px-6 py-4">
            <Button variant="outline" :disabled="quizState.currentQuestionIndex === 0" @click="previousQuestion">
              Sebelumnya
            </Button>
            <Button v-if="!isLastQuestion" @click="nextQuestion">
              Selanjutnya
            </Button>
            <Button v-else variant="default" class="bg-green-600 hover:bg-green-700" @click="submitQuiz">
              Selesaikan Latihan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT #3: HASIL & PEMBAHASAN                                             -->
    <!-- ======================================================================= -->
    <!--
      This slot is the most critical for learning from mistakes. It doesn't just
      show the score but provides a detailed, question-by-question review with
      clear explanations for the correct answers. This feedback loop is designed
      to ensure the user's skills are demonstrably better after the session.
      Its visibility is controlled by the layout via the `showResult` prop.
    -->
    <template #result>
      <div class="grid auto-rows-max items-start gap-6">
        <!-- Result Summary Card -->
        <Card class="bg-gradient-to-br from-background to-muted/50 shadow-lg">
          <CardHeader>
            <CardTitle class="text-2xl">Hasil Latihan Selesai!</CardTitle>
            <CardDescription>Berikut adalah rekapitulasi dan pembahasan dari latihan Anda.</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col items-center justify-center gap-4 text-center">
            <p class="text-lg font-medium text-muted-foreground">Skor Anda:</p>
            <p class="text-6xl font-bold text-primary">
              {{ totalCorrectAnswers }} <span class="text-2xl font-normal text-muted-foreground">/ {{ questions.length }}</span>
            </p>
            <p v-if="totalCorrectAnswers / questions.length >= 0.8" class="mt-2 text-green-600">
              Luar biasa! Pemahaman Anda tentang Bhinneka Tunggal Ika sangat baik.
            </p>
            <p v-else-if="totalCorrectAnswers / questions.length >= 0.5" class="mt-2 text-yellow-600">
              Bagus! Terus tingkatkan dengan mempelajari kembali pembahasan di bawah ini.
            </p>
            <p v-else class="mt-2 text-red-600">
              Jangan menyerah! Pelajari pembahasan soal untuk meningkatkan pemahaman Anda.
            </p>
          </CardContent>
          <CardFooter class="flex justify-center border-t px-6 py-4">
            <Button @click="resetQuiz">
              <RefreshCw class="mr-2 h-4 w-4" />
              Ulangi Latihan
            </Button>
          </CardFooter>
        </Card>

        <!-- Detailed Review Section -->
        <h3 class="text-xl font-semibold">
          Pembahasan Detail
        </h3>
        <Card v-for="(question, index) in questions" :key="question.id" class="overflow-hidden">
          <CardHeader class="bg-muted/30">
            <p class="font-semibold">
              <span class="font-bold">Soal {{ index + 1 }}:</span> {{ question.questionText }}
            </p>
          </CardHeader>
          <CardContent class="p-4">
            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="flex items-start gap-3 rounded-md border p-3 text-sm"
                :class="getAnswerStatusClass(question, optIndex)"
              >
                <!-- Icon Indicator -->
                <div class="flex-shrink-0">
                  <CheckCircle2 v-if="optIndex === question.correctAnswerIndex" class="h-5 w-5 text-green-600" />
                  <XCircle v-else-if="quizState.userAnswers[question.id] === optIndex" class="h-5 w-5 text-red-600" />
                  <div v-else class="h-5 w-5" /> <!-- Placeholder for alignment -->
                </div>
                <!-- Option Text -->
                <div>
                  <p class="font-medium">
                    {{ option.text }}
                  </p>
                  <!-- Feedback Text -->
                  <p v-if="optIndex === question.correctAnswerIndex" class="text-xs font-semibold text-green-700">
                    (Jawaban Benar)
                  </p>
                  <p v-if="quizState.userAnswers[question.id] === optIndex && optIndex !== question.correctAnswerIndex" class="text-xs font-semibold text-red-700">
                    (Jawaban Anda)
                  </p>
                </div>
              </div>
            </div>
            <!-- Explanation Alert -->
            <Alert class="mt-4 border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
              <MessageSquareQuote class="h-5 w-5 !text-blue-600" />
              <AlertTitle class="font-bold text-blue-800 dark:text-blue-300">Pembahasan</AlertTitle>
              <AlertDescription>
                {{ question.explanation }}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from '#imports' // Using explicit import from Nuxt

// UI Component Imports
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, RefreshCw, MessageSquareQuote } from 'lucide-vue-next'
import CPNSLayout from '@/layouts/CPNSLayout.vue';


const router = useRouter()

// Placeholder navigation handlers for the layout buttons
const handleBackNavigation = () => {
  // In a real app, this would navigate to the main TWK category page
  router.push('/cpns/twk')
  console.log('Navigating back to TWK overview...')
}

const handleNextNavigation = () => {
  // In a real app, this would navigate to the next unit, e.g., Pancasila
  router.push('/cpns/twk/pancasila')
  console.log('Navigating to the next unit...')
}

// =======================================================================
// DATA STRUCTURES & TYPES
// =======================================================================
interface QuestionOption {
  text: string
}

interface Question {
  id: number
  questionText: string
  options: QuestionOption[]
  correctAnswerIndex: number
  explanation: string
}

// =======================================================================
// QUIZ DATA
// =======================================================================
// This ref holds all questions for the unit. In a larger application,
// this could be fetched from an API.
const questions = ref<Question[]>([
  {
    id: 1,
    questionText: 'Frasa "Bhinneka Tunggal Ika" pertama kali ditemukan dalam sebuah kitab kuno karangan Mpu Tantular. Kitab tersebut adalah...',
    options: [
      { text: 'Kitab Negarakertagama' },
      { text: 'Kitab Sutasoma' },
      { text: 'Kitab Arjunawiwaha' },
      { text: 'Kitab Pararaton' },
      { text: 'Kitab Bharatayuddha' },
    ],
    correctAnswerIndex: 1,
    explanation: 'Bhinneka Tunggal Ika berasal dari Kakawin Sutasoma karangan Mpu Tantular pada zaman Majapahit. Kutipan ini menggarisbawahi semangat toleransi beragama yang sudah ada sejak dahulu kala.',
  },
  {
    id: 2,
    questionText: 'Secara konstitusional, Bhinneka Tunggal Ika sebagai semboyan negara diatur dalam...',
    options: [
      { text: 'Pasal 1 Ayat 1 UUD 1945' },
      { text: 'Pasal 29 UUD 1945' },
      { text: 'Pembukaan UUD 1945 alinea keempat' },
      { text: 'Pasal 36A UUD 1945' },
      { text: 'GBHN (Garis-Garis Besar Haluan Negara)' },
    ],
    correctAnswerIndex: 3,
    explanation: 'Pasal 36A UUD 1945 menyatakan bahwa "Lambang Negara ialah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika." Ini adalah landasan hukum utama yang mengukuhkan posisi semboyan tersebut.',
  },
  {
    id: 3,
    questionText: 'Sikap yang paling mencerminkan pengamalan Bhinneka Tunggal Ika dalam kehidupan masyarakat adalah...',
    options: [
      { text: 'Hanya mau bergaul dengan teman satu suku.' },
      { text: 'Mempelajari budaya daerah lain untuk mencari kelemahannya.' },
      { text: 'Menganggap budaya sendiri sebagai yang paling unggul.' },
      { text: 'Menghadiri perayaan hari besar agama teman yang berbeda keyakinan sebagai bentuk penghormatan.' },
      { text: 'Menolak bekerja sama dengan orang yang berbeda pandangan politik.' },
    ],
    correctAnswerIndex: 3,
    explanation: 'Menghadiri perayaan sebagai bentuk penghormatan (bukan mengikuti ritualnya) adalah wujud nyata dari toleransi dan sikap inklusif, yang merupakan inti dari Bhinneka Tunggal Ika.',
  },
  {
    id: 4,
    questionText: 'Konsep Bhinneka Tunggal Ika menjadi perekat persatuan bangsa karena menekankan pada...',
    options: [
      { text: 'Penyeragaman seluruh budaya menjadi satu budaya nasional.' },
      { text: 'Penghapusan identitas-identitas lokal yang ada.' },
      { text: 'Adanya satu bahasa daerah yang diwajibkan untuk semua.' },
      { text: 'Pengakuan dan penghargaan terhadap keberagaman sebagai modal sosial.' },
      { text: 'Dominasi kelompok mayoritas atas minoritas.' },
    ],
    correctAnswerIndex: 3,
    explanation: 'Inti dari Bhinneka Tunggal Ika bukanlah penyeragaman, melainkan persatuan dalam keberagaman. Ini berarti setiap perbedaan diakui, dihargai, dan dipandang sebagai kekayaan atau modal untuk membangun bangsa yang lebih kuat.',
  },
  {
    id: 5,
    questionText: 'Berikut ini yang merupakan tantangan terbesar dalam menjaga keutuhan Bhinneka Tunggal Ika di era digital adalah...',
    options: [
      { text: 'Minat masyarakat pada budaya tradisional yang menurun.' },
      { text: 'Pembangunan infrastruktur yang tidak merata.' },
      { text: 'Cepatnya penyebaran berita bohong (hoax) dan ujaran kebencian bernuansa SARA.' },
      { text: 'Persaingan ekonomi dengan negara-negara lain.' },
      { text: 'Tingginya angka urbanisasi dari desa ke kota.' },
    ],
    correctAnswerIndex: 2,
    explanation: 'Era digital memungkinkan hoax dan ujaran kebencian menyebar dengan sangat cepat melalui media sosial, yang dapat memprovokasi konflik antar-kelompok dan mengancam persatuan. Ini adalah tantangan kontemporer yang sangat serius bagi Bhinneka Tunggal Ika.',
  },
  {
    id: 6,
    questionText: 'Implementasi Bhinneka Tunggal Ika dalam konteks kebijakan pemerintah dapat diwujudkan melalui...',
    options: [
      { text: 'Program transmigrasi yang tidak memperhatikan adat lokal.' },
      { text: 'Pemberian otonomi khusus kepada daerah-daerah tertentu untuk mengelola keunikannya.' },
      { text: 'Mewajibkan satu jenis pakaian adat sebagai seragam nasional.' },
      { text: 'Melarang penggunaan bahasa daerah di sekolah.' },
      { text: 'Memusatkan seluruh pembangunan ekonomi hanya di Pulau Jawa.' },
    ],
    correctAnswerIndex: 1,
    explanation: 'Pemberian otonomi khusus (misalnya di Aceh, Papua, atau Yogyakarta) adalah contoh bagaimana pemerintah mengakui dan menghormati keunikan serta keberagaman daerah, sejalan dengan semangat Bhinneka Tunggal Ika untuk mempersatukan tanpa menyeragamkan.',
  },
  {
    id: 7,
    questionText: 'Prinsip "persatuan dalam perbedaan" yang terkandung dalam Bhinneka Tunggal Ika memiliki kesamaan dengan konsep...',
    options: [
      { text: 'E Pluribus Unum (Dari yang banyak, menjadi satu) milik Amerika Serikat.' },
      { text: 'Liberte, Egalite, Fraternite (Kebebasan, Kesetaraan, Persaudaraan) milik Perancis.' },
      { text: 'Einigkeit und Recht und Freiheit (Persatuan dan Keadilan dan Kebebasan) milik Jerman.' },
      { text: 'Juche (Berdikari) milik Korea Utara.' },
      { text: 'Satyameva Jayate (Hanya kebenaran yang berjaya) milik India.' },
    ],
    correctAnswerIndex: 0,
    explanation: 'Semboyan Amerika Serikat "E Pluribus Unum" memiliki makna yang sangat mirip dengan "Bhinneka Tunggal Ika", yaitu konsep membentuk satu kesatuan (bangsa) dari banyak elemen yang berbeda (negara bagian, etnis, budaya).',
  },
  {
    id: 8,
    questionText: 'Dalam lambang negara Garuda Pancasila, pita yang mencengkeram tulisan Bhinneka Tunggal Ika melambangkan...',
    options: [
      { text: 'Kekuatan bangsa untuk berperang.' },
      { text: 'Keterikatan yang kaku dan tidak bisa diubah.' },
      { text: 'Ikatan persatuan dan kesatuan yang kokoh dan tidak mudah tercerai-berai.' },
      { text: 'Batas-batas yang jelas antar suku bangsa.' },
      { text: 'Kekayaan alam Indonesia yang melimpah.' },
    ],
    correctAnswerIndex: 2,
    explanation: 'Cengkeraman kaki Garuda pada pita melambangkan bahwa persatuan dan kesatuan yang terjalin dari keberagaman (Bhinneka Tunggal Ika) adalah pegangan yang kokoh bagi bangsa Indonesia.',
  },
]);

// =======================================================================
// REACTIVE STATE & COMPUTED PROPERTIES
// =======================================================================
// A single reactive object to manage the entire state of the quiz.
const quizState = reactive({
  currentQuestionIndex: 0,
  userAnswers: {} as Record<number, number | null>,
  quizFinished: false,
});

// Computed property to derive the score from the state.
const totalCorrectAnswers = computed(() => {
  if (!quizState.quizFinished) return 0;
  return questions.value.reduce((count, question) => {
    return quizState.userAnswers[question.id] === question.correctAnswerIndex ? count + 1 : count;
  }, 0);
});

// Computed property to derive the current question object.
const currentQuestion = computed(() => questions.value[quizState.currentQuestionIndex]);

// Computed property for the progress bar.
const progress = computed(() => ((quizState.currentQuestionIndex + 1) / questions.value.length) * 100);

// Computed flag to check if it's the last question.
const isLastQuestion = computed(() => quizState.currentQuestionIndex === questions.value.length - 1);

// Initialize the userAnswers object when the component mounts.
onMounted(() => {
  questions.value.forEach(q => {
    quizState.userAnswers[q.id] = null;
  });
});

// =======================================================================
// QUIZ LOGIC & METHODS
// =======================================================================

/**
 * Records the user's selected answer for a given question.
 * @param questionId The ID of the question being answered.
 * @param optionIndex The index of the selected option.
 */
function selectAnswer(questionId: number, optionIndex: number) {
  if (quizState.quizFinished) return;
  quizState.userAnswers[questionId] = optionIndex;
}

/**
 * Moves to the next question if not on the last one.
 */
function nextQuestion() {
  if (quizState.currentQuestionIndex < questions.value.length - 1) {
    quizState.currentQuestionIndex++;
  }
}

/**
 * Moves to the previous question if not on the first one.
 */
function previousQuestion() {
  if (quizState.currentQuestionIndex > 0) {
    quizState.currentQuestionIndex--;
  }
}

/**
 * Finalizes the quiz, calculates the score, and sets the state to show results.
 */
function submitQuiz() {
  quizState.quizFinished = true;
  // Scroll to top to see the result summary
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Resets the entire quiz state to allow the user to try again.
 */
function resetQuiz() {
  quizState.currentQuestionIndex = 0;
  questions.value.forEach(q => {
    quizState.userAnswers[q.id] = null;
  });
  quizState.quizFinished = false;
}

/**
 * Determines the CSS class for a given answer option in the review section.
 * This provides visual feedback (correct, incorrect, user's wrong choice).
 * @param question The question object.
 * @param optionIndex The index of the option to check.
 * @returns A string of Tailwind CSS classes.
 */
function getAnswerStatusClass(question: Question, optionIndex: number): string {
  const isCorrect = optionIndex === question.correctAnswerIndex;
  const userAnswer = quizState.userAnswers[question.id];
  const isUserAnswer = userAnswer === optionIndex;

  if (isCorrect) {
    return 'border-green-500 bg-green-50 dark:bg-green-950/50';
  }
  if (isUserAnswer && !isCorrect) {
    return 'border-red-500 bg-red-50 dark:bg-red-950/50';
  }
  return 'border-muted';
}
</script>