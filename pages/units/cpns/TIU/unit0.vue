<template>
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
    <!-- SLOT: Materi Pembelajaran                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>Apa itu Analogi Kata?</CardTitle>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-4">
          <p>
            Tes Analogi atau Padanan Hubungan Kata adalah salah satu bentuk soal dalam Tes Intelegensia Umum (TIU) yang bertujuan untuk mengukur kemampuan Anda dalam <strong>mengidentifikasi dan memahami hubungan logis antara dua kata atau lebih</strong>. Anda akan diberikan sepasang kata sebagai soal, dan tugas Anda adalah menemukan sepasang kata lain dari pilihan jawaban yang memiliki pola hubungan yang <strong>serupa atau identik</strong>.
          </p>
          <p>
            Kunci untuk berhasil dalam tes ini adalah kemampuan menalar, menganalisis, dan menemukan kata kunci yang menghubungkan pasangan kata tersebut. Misalnya, hubungan sebab-akibat, bagian-keseluruhan, fungsi, jenis, dan sebagainya.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Jenis-Jenis Hubungan Kata (dan Contohnya)</CardTitle>
          <CardDescription>Pahami pola hubungan ini untuk mempercepat pengerjaan soal.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div>
            <h3 class="font-semibold text-base mb-2">1. Sinonim (Persamaan Kata)</h3>
            <p class="text-sm text-muted-foreground">Hubungan dimana kedua kata memiliki arti yang sama atau mirip.</p>
            <p class="text-sm mt-1">Contoh: <strong>CANTIK : ELOK</strong> memiliki hubungan yang sama dengan <strong>PINTAR : PANDAI</strong>.</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">2. Antonim (Lawan Kata)</h3>
            <p class="text-sm text-muted-foreground">Hubungan dimana kedua kata memiliki arti yang berlawanan.</p>
            <p class="text-sm mt-1">Contoh: <strong>PANAS : DINGIN</strong> memiliki hubungan yang sama dengan <strong>TERANG : GELAP</strong>.</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">3. Sebab - Akibat</h3>
            <p class="text-sm text-muted-foreground">Kata pertama adalah penyebab dari kata kedua, atau sebaliknya.</p>
            <p class="text-sm mt-1">Contoh: <strong>HUJAN : BANJIR</strong> (hujan menyebabkan banjir) memiliki hubungan yang sama dengan <strong>API : KEBAKARAN</strong> (api menyebabkan kebakaran).</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">4. Bagian - Keseluruhan (Part-Whole)</h3>
            <p class="text-sm text-muted-foreground">Kata pertama adalah bagian dari kata kedua.</p>
            <p class="text-sm mt-1">Contoh: <strong>JARI : TANGAN</strong> (jari adalah bagian dari tangan) memiliki hubungan yang sama dengan <strong>KELOPAK : BUNGA</strong> (kelopak adalah bagian dari bunga).</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">5. Jenis - Kategori/Spesies (Genus-Species)</h3>
            <p class="text-sm text-muted-foreground">Kata pertama adalah jenis atau spesies dari kata kedua yang merupakan kategori umumnya.</p>
            <p class="text-sm mt-1">Contoh: <strong>MERPATI : BURUNG</strong> (merpati adalah jenis burung) memiliki hubungan yang sama dengan <strong>MUJAIR : IKAN</strong> (mujair adalah jenis ikan).</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">6. Alat - Fungsi</h3>
            <p class="text-sm text-muted-foreground">Kata pertama adalah alat dan kata kedua adalah fungsi dari alat tersebut.</p>
            <p class="text-sm mt-1">Contoh: <strong>PENA : MENULIS</strong> (pena berfungsi untuk menulis) memiliki hubungan yang sama dengan <strong>GUNTING : MEMOTONG</strong> (gunting berfungsi untuk memotong).</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">7. Urutan / Tingkatan</h3>
            <p class="text-sm text-muted-foreground">Hubungan yang menunjukkan sebuah urutan atau proses.</p>
            <p class="text-sm mt-1">Contoh: <strong>ULAT : KEPOMPONG : KUPU-KUPU</strong> memiliki hubungan yang sama dengan <strong>BAYI : ANAK-ANAK : REMAJA</strong>.</p>
          </div>
          <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">8. Ukuran / Intensitas</h3>
            <p class="text-sm text-muted-foreground">Hubungan yang menunjukkan perbedaan ukuran atau tingkatan intensitas.</p>
            <p class="text-sm mt-1">Contoh: <strong>GERIMIS : HUJAN</strong> (gerimis adalah hujan dengan intensitas rendah) memiliki hubungan yang sama dengan <strong>MENGETUK : MENGGEDOR</strong> (mengetuk adalah menggedor dengan intensitas rendah).</p>
          </div>
           <Separator />
          <div>
            <h3 class="font-semibold text-base mb-2">9. Tokoh - Tempat/Keahlian</h3>
            <p class="text-sm text-muted-foreground">Hubungan antara seseorang dengan tempat kerjanya atau bidang keahliannya.</p>
            <p class="text-sm mt-1">Contoh: <strong>KOKI : RESTORAN</strong> (koki bekerja di restoran) memiliki hubungan yang sama dengan <strong>DOKTER : RUMAH SAKIT</strong> (dokter bekerja di rumah sakit).</p>
          </div>
        </CardContent>
      </Card>
      
       <Card class="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle>Tips & Trik Mengerjakan Soal Analogi</CardTitle>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-3">
          <p><strong>1. Buat Kalimat:</strong> Ubah pasangan kata pada soal menjadi sebuah kalimat yang logis dan jelas untuk mendefinisikan hubungannya. Contoh: "ULAT akan menjadi KEPOMPONG".</p>
          <p><strong>2. Terapkan Kalimat:</strong> Gunakan kalimat yang sama pada setiap pilihan jawaban. Pilihan yang menghasilkan kalimat paling logis dan padu adalah jawabannya. Contoh: "BAYI akan menjadi ANAK-ANAK".</p>
          <p><strong>3. Perhatikan Urutan:</strong> Urutan kata sangat penting. Hubungan "Alat : Fungsi" (Pena : Menulis) berbeda dengan "Fungsi : Alat" (Menulis : Pena). Pastikan urutannya konsisten.</p>
          <p><strong>4. Cari Hubungan Paling Spesifik:</strong> Terkadang ada lebih dari satu pilihan yang tampak benar. Pilihlah yang memiliki hubungan paling spesifik dan identik dengan soal.</p>
          <p><strong>5. Eliminasi Jawaban:</strong> Jika bingung, eliminasi pilihan jawaban yang sudah pasti salah untuk memperbesar peluang memilih jawaban yang benar.</p>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: Latihan Soal                                                      -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Latihan Soal: Uji Pemahaman Anda</CardTitle>
          <CardDescription>Pilihlah jawaban yang memiliki padanan hubungan kata yang paling sesuai dengan soal.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Question Loop -->
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-3">
            <p class="font-semibold text-gray-800">{{ index + 1 }}. {{ q.question }}</p>
            <RadioGroup v-model="userAnswers[q.id]" :disabled="showResult">
              <div v-for="(option, optIndex) in q.options" :key="optIndex" class="flex items-center space-x-2">
                <RadioGroupItem :id="`${q.id}-${optIndex}`" :value="optIndex" />
                <Label :for="`${q.id}-${optIndex}`">{{ option }}</Label>
              </div>
            </RadioGroup>
          </div>
          <!-- End Question Loop -->
          
          <Separator />
          
          <div class="flex justify-end pt-4">
            <Button v-if="!showResult" size="lg" @click="calculateResult">
              Selesai & Cek Jawaban
            </Button>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- SLOT: Hasil & Pembahasan                                                -->
    <!-- ======================================================================= -->
    <template #result>
       <Card class="border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle class="text-2xl text-blue-800">Hasil Latihan Anda</CardTitle>
            <CardDescription>
              Skor Anda adalah: <span class="font-bold text-xl text-blue-700">{{ score }} / {{ questions.length }}</span>.
              <br />
              Tinjau kembali pembahasan di bawah ini untuk memahami kesalahan dan memperkuat konsep.
            </CardDescription>
          </CardHeader>
        </Card>
      
        <div class="mt-6 grid gap-6">
           <Card v-for="item in feedback" :key="item.questionId" :class="item.isCorrect ? 'border-green-300' : 'border-red-300'">
            <CardHeader>
              <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-muted-foreground">Pertanyaan #{{ item.questionNumber }}</p>
                    <CardTitle class="text-lg mt-1">{{ item.questionText }}</CardTitle>
                  </div>
                  <Badge :variant="item.isCorrect ? 'default' : 'destructive'">
                    {{ item.isCorrect ? 'BENAR' : 'SALAH' }}
                  </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div class="space-y-4 text-sm">
                <div>
                  <p>Jawaban Anda: <span :class="item.isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">{{ item.userAnswerText || 'Tidak dijawab' }}</span></p>
                  <p v-if="!item.isCorrect">Jawaban Benar: <span class="text-green-600 font-semibold">{{ item.correctAnswerText }}</span></p>
                </div>
                <Separator />
                <div>
                    <h4 class="font-semibold mb-2 text-gray-800">Pembahasan:</h4>
                    <p class="text-muted-foreground leading-relaxed">{{ item.explanation }}</p>
                </div>
              </div>
            </CardContent>
           </Card>
        </div>

        <div class="mt-8 flex justify-center">
            <Button size="lg" variant="secondary" @click="resetQuiz">
              Ulangi Latihan
            </Button>
        </div>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// --- Page Meta & Layout Definition ---
definePageMeta({
  layout: 'cpnslayout',
});

// --- Type Definitions for Better Code Quality ---
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of the correct option
  explanation: string;
}

interface Feedback {
  questionId: number;
  questionNumber: number;
  questionText: string;
  userAnswerText: string | null;
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
}

// --- Component State ---
const router = useRouter();
const showResult = ref(false);
const score = ref(0);
const userAnswers = reactive<Record<number, number>>({});
const feedback = ref<Feedback[]>([]);

// --- Static Page Data ---
// This could be fetched from an API in a real application
const pageData = {
  testTitle: 'SKD - Seleksi Kompetensi Dasar',
  testDescription: 'Persiapan Menghadapi Tes Intelegensia Umum (TIU) CPNS',
  unitTitle: 'Kemampuan Verbal: Analogi (Padanan Hubungan Kata)',
  unitDescription: 'Materi dan latihan soal untuk mengasah kemampuan menemukan padanan hubungan kata.',
  categories: ['TIU', 'SKD', 'CPNS', 'Kemampuan Verbal', 'Analogi'],
};

// --- Question Bank ---
// Generated and stored in a variable as requested.
const questions = ref<Question[]>([
  {
    id: 1,
    question: 'PESAWAT : AVTUR',
    options: [
      'A. Radio : Listrik',
      'B. Sapi : Rumput',
      'C. Proyektor : Lensa',
      'D. Penyakit : Virus',
      'E. Manusia : Pakaian'
    ],
    answer: 0,
    explanation: 'Hubungan kata adalah "alat : sumber energi". PESAWAT membutuhkan AVTUR sebagai sumber energinya. Hubungan yang paling sepadan adalah RADIO membutuhkan LISTRIK sebagai sumber energinya. Pilihan B (Sapi:Rumput) adalah "makhluk hidup : makanan", bukan sumber energi untuk alat.'
  },
  {
    id: 2,
    question: 'BELAJAR : PANDAI',
    options: [
      'A. Berpikir : Arif',
      'B. Cetak : Kertas',
      'C. Potret : Kamera',
      'D. Litografi : Batu',
      'E. Makan : Lapar'
    ],
    answer: 0,
    explanation: 'Hubungan kata adalah "proses : hasil". Dengan BELAJAR, seseorang menjadi PANDAI. Hubungan yang sepadan adalah dengan BERPIKIR, seseorang menjadi ARIF (bijaksana). Pilihan E terbalik (seharusnya Makan : Kenyang, bukan Lapar).'
  },
  {
    id: 3,
    question: 'MATAHARI : TERANG',
    options: [
      'A. Mendidih : Air',
      'B. Lampu : Sinar',
      'C. Air : Hujan',
      'D. Api : Panas',
      'E. Gelap : Malam'
    ],
    answer: 3,
    explanation: 'Hubungan kata adalah "sumber : efek/sifat yang dihasilkan". MATAHARI menghasilkan TERANG. Hubungan yang sepadan adalah API menghasilkan PANAS. Pilihan B (Lampu:Sinar) juga mirip, tetapi PANAS adalah sifat intrinsik dari API, sama seperti TERANG dari MATAHARI.'
  },
  {
    id: 4,
    question: 'SEMINAR : SARJANA',
    options: [
      'A. Akademi : Taruna',
      'B. Rumah Sakit : Pasien',
      'C. Ruang Pengadilan : Jaksa',
      'D. Perpustakaan : Peneliti',
      'E. Konservatori : Seniman'
    ],
    answer: 3,
    explanation: 'Hubungan kata adalah "tempat : orang yang memanfaatkannya untuk tujuan keilmuan/profesional". SEMINAR adalah forum bagi SARJANA untuk berdiskusi/presentasi. Hubungan yang paling sepadan adalah PERPUSTAKAAN adalah tempat bagi PENELITI untuk mencari referensi dan data.'
  },
  {
    id: 5,
    question: 'UMUR : TAHUN',
    options: [
      'A. Kecepatan : Jarak',
      'B. Kertas : Helai',
      'C. Ilmu : Nilai',
      'D. Jam : Detik',
      'E. Uang : Rupiah'
    ],
    answer: 1,
    explanation: 'Hubungan kata adalah "konsep : satuan ukur". UMUR diukur dalam satuan TAHUN. Hubungan yang sepadan adalah KERTAS diukur dalam satuan HELAI. Pilihan D (Jam:Detik) adalah hubungan keseluruhan-bagian. Pilihan E (Uang:Rupiah) adalah konsep-mata uang, sedikit berbeda.'
  },
  {
    id: 6,
    question: 'KULIT : SAPI',
    options: [
      'A. Duri : Bunga',
      'B. Atap : Rumah',
      'C. Keramik : Lantai',
      'D. Sisik : Ikan',
      'E. Tembok : Batu Bata'
    ],
    answer: 3,
    explanation: 'Hubungan kata adalah "lapisan terluar : makhluk hidup". KULIT adalah lapisan terluar dari SAPI. Hubungan yang sepadan adalah SISIK adalah lapisan terluar dari IKAN. Pilihan B (Atap:Rumah) juga lapisan terluar, tetapi Rumah bukan makhluk hidup. Pilihan E (Tembok:Batu Bata) hubungannya adalah keseluruhan:bahan penyusun.'
  },
  {
    id: 7,
    question: 'RAMALAN : ASTROLOGI',
    options: [
      'A. Nasib : Prediksi',
      'B. Peta : Geografi',
      'C. Penyakit : Patologi',
      'D. Bintang : Astronomi',
      'E. Masyarakat : Sosiologi'
    ],
    answer: 2,
    explanation: 'Hubungan kata adalah "objek kajian : ilmu yang mempelajari". ASTROLOGI (semu) adalah ilmu yang (konon) mempelajari RAMALAN nasib. Hubungan yang paling sepadan secara struktur adalah PATOLOGI adalah ilmu yang mempelajari PENYAKIT. Pilihan E (Masyarakat:Sosiologi) urutannya terbalik.'
  },
  {
    id: 8,
    question: 'PANGGUNG : AKTOR',
    options: [
      'A. Perpustakaan : Buku',
      'B. Teluk : Kapal',
      'C. Ring : Petinju',
      'D. Musik : Konduktor',
      'E. Sekolah : Guru'
    ],
    answer: 2,
    explanation: 'Hubungan kata adalah "arena/tempat : profesi yang beraksi di dalamnya". PANGGUNG adalah tempat bagi AKTOR untuk beraksi. Hubungan yang sepadan adalah RING adalah tempat bagi PETINJU untuk beraksi (bertanding).'
  },
  {
    id: 9,
    question: 'SUAP : POLITIK',
    options: [
      'A. Cabul : Susila',
      'B. Menyontek : Ujian',
      'C. Marah : Pribadi',
      'D. Plagiat : Tulisan',
      'E. Penelitian : Ilmiah'
    ],
    answer: 1,
    explanation: 'Hubungan kata adalah "tindakan negatif : konteks/bidang terjadinya". SUAP adalah tindakan negatif dalam dunia POLITIK. Hubungan yang sepadan adalah MENYONTEK adalah tindakan negatif dalam konteks UJIAN.'
  },
  {
    id: 10,
    question: 'METEOROLOGI : CUACA',
    options: [
      'A. Antropologi : Fosil',
      'B. Patologi : Peta',
      'C. Pedagogi : Sekolah',
      'D. Kardiologi : Jantung',
      'E. Farmakologi : Penyakit'
    ],
    answer: 3,
    explanation: 'Hubungan kata adalah "ilmu : objek studi". METEOROLOGI adalah ilmu yang mempelajari CUACA. Hubungan yang sepadan adalah KARDIOLOGI adalah ilmu yang mempelajari JANTUNG. Pilihan A (Antropologi:Fosil) kurang tepat; antropologi mempelajari manusia dan budayanya, sedangkan fosil lebih ke paleontologi.'
  }
]);

// --- Event Handlers & Logic ---

/**
 * Handles the "Back" button click. 
 * In a real app, this would navigate to the previous unit/page.
 */
function handleBack() {
  // Example: router.push('/dashboard/cpns/tiu');
  alert("Navigasi ke unit sebelumnya.");
}

/**
 * Handles the "Next" button click.
 * In a real app, this would navigate to the next unit/page.
 */
function handleNext() {
  // Example: router.push('/dashboard/cpns/tiu/unit-2');
  alert("Navigasi ke unit selanjutnya.");
}

/**
 * Calculates the user's score, generates detailed feedback for each question,
 * and displays the result section.
 */
function calculateResult() {
  let correctAnswers = 0;
  const newFeedback: Feedback[] = [];

  questions.value.forEach((q, index) => {
    const userAnswerIndex = userAnswers[q.id];
    const isCorrect = userAnswerIndex === q.answer;

    if (isCorrect) {
      correctAnswers++;
    }

    newFeedback.push({
      questionId: q.id,
      questionNumber: index + 1,
      questionText: q.question,
      userAnswerText: typeof userAnswerIndex !== 'undefined' ? q.options[userAnswerIndex] : null,
      correctAnswerText: q.options[q.answer],
      isCorrect: isCorrect,
      explanation: q.explanation,
    });
  });

  score.value = correctAnswers;
  feedback.value = newFeedback;
  showResult.value = true;

  // Scroll to top to see the score summary
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Resets the quiz state, allowing the user to try again.
 */
function resetQuiz() {
  showResult.value = false;
  score.value = 0;
  feedback.value = [];
  // Clear user answers by re-assigning to an empty object
  for (const key in userAnswers) {
    delete userAnswers[key];
  }
  
  // Optionally shuffle questions for better replayability
  // questions.value.sort(() => Math.random() - 0.5);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style>
/* Add a simple fade transition for the result section */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>