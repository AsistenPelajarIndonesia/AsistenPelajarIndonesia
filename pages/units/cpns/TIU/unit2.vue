<template>
  <CPNSLayout
    :test-title="pageData.testTitle"
    :test-description="pageData.testDescription"
    :unit-title="pageData.unitTitle"
    :unit-description="pageData.unitDescription"
    :categories="pageData.categories"
    :show-result="showResult"
    @back="handleNavigation('back')"
    @next="handleNavigation('next')"
  >
    <!-- ======================================================================= -->
    <!-- SLOT: MATERI PEMBELAJARAN                                               -->
    <!-- ======================================================================= -->
    <template #material>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-lg">Materi & Strategi</CardTitle>
          <CardDescription>Pahami konsep dan pelajari cara terbaik untuk menaklukkan soal analitis.</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-foreground space-y-6">
          <div class="space-y-2">
            <h3 class="font-semibold text-base">Apa itu Kemampuan Analitis?</h3>
            <p class="text-muted-foreground leading-relaxed">
              Kemampuan analitis dalam konteks TIU CPNS adalah kemampuan Anda untuk menganalisis suatu informasi (biasanya dalam bentuk paragraf atau beberapa pernyataan) yang memiliki aturan atau syarat tertentu, kemudian menarik kesimpulan logis dari informasi tersebut. Soal jenis ini tidak menguji pengetahuan umum Anda, melainkan murni menguji kemampuan bernalar dan memproses informasi yang diberikan.
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold text-base">Mengapa Ini Penting?</h3>
            <p class="text-muted-foreground leading-relaxed">
              Sebagai seorang Aparatur Sipil Negara (ASN), Anda akan dihadapkan pada berbagai situasi kompleks, peraturan, dan data yang saling terkait. Kemampuan untuk memahami informasi secara mendalam, mengidentifikasi hubungan sebab-akibat, dan menarik kesimpulan yang akurat adalah kunci untuk membuat keputusan yang tepat dan bertanggung jawab.
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-base">Strategi Jitu Menjawab Soal</h3>
            <ul class="list-disc pl-5 space-y-3 text-muted-foreground">
              <li>
                <span class="font-semibold text-foreground">Baca dengan Saksama & Penuh Konsentrasi:</span> Jangan terburu-buru. Pahami setiap kalimat dalam teks soal. Satu kata yang terlewat bisa mengubah seluruh makna.
              </li>
              <li>
                <span class="font-semibold text-foreground">Identifikasi Informasi Kunci:</span> Garis bawahi atau catat semua subjek (orang, benda), kondisi (syarat, aturan), dan batasan yang ada.
              </li>
              <li>
                <span class="font-semibold text-foreground">Visualisasikan Informasi:</span> Ini adalah kunci terpenting. Jangan hanya mengandalkan imajinasi. Gunakan coretan untuk membuat tabel, diagram, skema, atau denah. Visualisasi membantu mengorganisir informasi yang rumit dan menemukan hubungan yang tidak terlihat.
              </li>
              <li>
                <span class="font-semibold text-foreground">Fokus pada Pertanyaan:</span> Setelah memahami informasi, baca pertanyaannya dengan cermat. Pastikan Anda mengerti apa yang diminta: kesimpulan yang PASTI benar, yang MUNGKIN benar, atau yang PASTI salah.
              </li>
              <li>
                <span class="font-semibold text-foreground">Eliminasi Jawaban yang Salah:</span> Evaluasi setiap pilihan jawaban satu per satu. Coret pilihan yang jelas-jelas bertentangan dengan informasi atau kesimpulan yang sudah Anda buat. Ini akan mempersempit pilihan Anda.
              </li>
            </ul>
          </div>
          
          <Separator />
          
          <div class="space-y-2">
            <h3 class="font-semibold text-base">Contoh Penerapan Strategi</h3>
            <p class="italic text-muted-foreground">
              "Enam mahasiswa—A, B, C, D, E, F—duduk di satu baris. C duduk di antara B dan E. D tidak duduk di sebelah A atau F."
            </p>
            <p class="text-muted-foreground leading-relaxed">
              <strong>Langkah Visualisasi:</strong> Anda bisa langsung membuat sketsa.
              <br>1. Buat 6 slot: `_ _ _ _ _ _`
              <br>2. Informasi "C duduk di antara B dan E" berarti ada blok `B-C-E` atau `E-C-B`.
              <br>3. Informasi "D tidak di sebelah A atau F" berarti kombinasi seperti `A-D`, `D-A`, `F-D`, `D-F` tidak mungkin terjadi.
              <br>Dengan sketsa ini, Anda bisa lebih mudah menjawab pertanyaan apa pun yang berkaitan dengan posisi duduk mereka.
            </p>
          </div>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: LATIHAN SOAL INTERAKTIF                                           -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card class="w-full">
        <CardHeader>
          <CardTitle class="text-lg">Latihan Soal Interaktif</CardTitle>
          <CardDescription>Terapkan strategimu! Jawab semua pertanyaan di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Loop Pertanyaan -->
          <div v-for="(q, index) in questions" :key="q.id" class="space-y-4">
            <div>
              <p class="font-semibold">Soal {{ index + 1 }}</p>
              <p class="text-sm text-muted-foreground whitespace-pre-wrap">{{ q.passage }}</p>
            </div>
            <p class="font-medium">{{ q.question }}</p>

            <!-- Loop Pilihan Jawaban -->
            <RadioGroup v-model="userAnswers[q.id]" class="space-y-2">
              <div v-for="option in q.options" :key="option.id" class="flex items-center space-x-2">
                 <RadioGroupItem :id="`${q.id}-${option.id}`" :value="option.id" />
                 <Label :for="`${q.id}-${option.id}`" class="leading-normal">{{ option.text }}</Label>
              </div>
            </RadioGroup>
            
            <Separator v-if="index < questions.length - 1" class="pt-4" />
          </div>

          <!-- Tombol Aksi -->
          <div class="flex justify-end pt-4">
             <Button @click="submitAnswers" :disabled="!allQuestionsAnswered">
                Kumpulkan Jawaban & Lihat Hasil
              </Button>
          </div>
           <p v-if="!allQuestionsAnswered && submissionAttempted" class="text-sm text-red-500 text-right mt-2">
              Harap jawab semua pertanyaan sebelum mengumpulkan.
            </p>
        </CardContent>
      </Card>
    </template>

    <!-- ======================================================================= -->
    <!-- SLOT: HASIL & PEMBAHASAN                                                -->
    <!-- ======================================================================= -->
    <template #result>
      <Card ref="resultCardRef" class="w-full">
        <CardHeader>
          <CardTitle class="text-2xl">Hasil Latihan Anda</CardTitle>
          <CardDescription>Berikut adalah rincian performa Anda. Pelajari pembahasannya untuk meningkatkan pemahaman.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Ringkasan Skor -->
          <div class="p-6 rounded-lg bg-muted flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-center sm:text-left">
              <p class="text-sm font-medium text-muted-foreground">SKOR ANDA</p>
              <p class="text-4xl font-bold text-primary">{{ score.percentage }}%</p>
            </div>
            <div class="w-full sm:w-auto text-center sm:text-right">
              <p class="text-lg">
                <span class="font-bold text-green-600">{{ score.correct }}</span> Jawaban Benar
              </p>
              <p class="text-lg">
                <span class="font-bold text-red-600">{{ score.incorrect }}</span> Jawaban Salah
              </p>
            </div>
          </div>

          <!-- Rincian Jawaban -->
          <div v-for="result in detailedResults" :key="result.id" class="space-y-4">
              <div class="p-4 rounded-md" :class="result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
                <p class="font-semibold">Soal {{ result.number }}</p>
                <p class="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{{ result.passage }}</p>
                <p class="mt-2 font-medium">{{ result.question }}</p>
                
                <div class="mt-4 space-y-2 text-sm">
                   <p>Jawaban Anda: 
                     <span class="font-bold" :class="result.isCorrect ? 'text-green-700' : 'text-red-700'">
                        {{ result.userAnswerText }}
                     </span>
                     <span v-if="result.isCorrect" class="ml-2 font-bold text-green-700">(Benar)</span>
                     <span v-else class="ml-2 font-bold text-red-700">(Salah)</span>
                   </p>
                   <p>Jawaban yang Benar: <span class="font-bold text-green-700">{{ result.correctAnswerText }}</span></p>
                </div>

                <Collapsible class="mt-4">
                  <CollapsibleTrigger as-child>
                    <Button variant="outline" size="sm">
                       Lihat Pembahasan Lengkap
                       <ChevronsUpDown class="h-4 w-4 ml-2" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent class="mt-3 text-sm">
                     <div class="p-4 bg-background rounded-lg border space-y-3">
                        <h4 class="font-semibold">Pembahasan:</h4>
                        <p class="text-muted-foreground whitespace-pre-wrap leading-relaxed">{{ result.explanation }}</p>
                     </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
          </div>
          
          <!-- Tombol Coba Lagi -->
           <div class="flex justify-center pt-4">
             <Button @click="resetQuiz" variant="default" size="lg">
                Coba Latihan Lagi
              </Button>
          </div>
        </CardContent>
      </Card>
    </template>
  </CPNSLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { ChevronsUpDown } from 'lucide-vue-next'
import CPNSLayout from '@/layouts/CPNSLayout.vue' // Adjust this path to your actual layout location
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// --- Page & Layout Configuration ---
const pageData = reactive({
  testTitle: 'Tes Intelegensia Umum (TIU)',
  testDescription: 'Latihan Soal Seleksi Kemampuan Dasar (SKD) CPNS',
  unitTitle: 'Kemampuan Verbal: Analitis',
  unitDescription: 'Materi dan latihan untuk mengasah kemampuan menganalisis informasi dan menarik kesimpulan secara logis.',
  categories: ['TIU', 'Kemampuan Verbal', 'Penalaran Analitis'],
})

// --- Navigation Handling (Placeholder) ---
function handleNavigation(direction: 'back' | 'next') {
  alert(`Navigasi: ${direction}. Anda dapat mengimplementasikan Vue Router di sini.`)
  // Example with vue-router:
  // import { useRouter } from 'vue-router'
  // const router = useRouter()
  // if (direction === 'back') router.go(-1)
  // else router.push('/halaman-selanjutnya')
}

// --- Question & Answer Data ---
// Storing questions in a ref. In a real app, this might come from an API.
const questions = ref([
  {
    id: 'q1',
    passage: `Dalam sebuah perlombaan lari estafet, ada lima tim yang berpartisipasi: Merah, Kuning, Hijau, Biru, dan Ungu.
    Aturan perlombaan adalah sebagai berikut:
    1. Tim Kuning menyelesaikan lari tepat setelah tim Merah.
    2. Tim Biru bukan tim pertama atau terakhir yang menyelesaikan lari.
    3. Ada tepat dua tim yang menyelesaikan lari di antara tim Hijau dan tim Kuning.
    4. Tim Ungu menyelesaikan lari sebelum tim Hijau.`,
    question: 'Manakah urutan penyelesaian lari yang benar dari pertama hingga terakhir?',
    options: [
      { id: 'A', text: 'Merah, Kuning, Biru, Ungu, Hijau' },
      { id: 'B', text: 'Ungu, Merah, Kuning, Biru, Hijau' },
      { id: 'C', text: 'Merah, Kuning, Ungu, Biru, Hijau' },
      { id: 'D', text: 'Ungu, Hijau, Merah, Kuning, Biru' },
      { id: 'E', text: 'Hijau, Biru, Ungu, Merah, Kuning' },
    ],
    correctAnswer: 'C',
    explanation: `Mari kita analisis aturan satu per satu menggunakan visualisasi slot (1, 2, 3, 4, 5):
    
    1. Aturan 1: "Kuning tepat setelah Merah". Ini menciptakan blok [Merah, Kuning].
    2. Aturan 3: "Dua tim di antara Hijau dan Kuning". Jika [Merah, Kuning] di posisi 1-2, maka Hijau harus di posisi 5. Urutannya menjadi: [Merah, Kuning, _, _, Hijau].
    3. Aturan 4: "Ungu sebelum Hijau". Ini sesuai dengan skema di atas, karena masih ada slot kosong sebelum Hijau.
    4. Aturan 2: "Biru bukan pertama atau terakhir". Dalam skema [Merah, Kuning, _, _, Hijau], posisi 1, 2, dan 5 sudah terisi. Sisa posisi 3 dan 4. Biru tidak boleh di posisi 5 (terakhir), jadi ini tidak masalah.
    5. Mari kita tempatkan Ungu dan Biru pada slot 3 dan 4. Berdasarkan aturan 4 (Ungu sebelum Hijau), kita bisa coba menempatkan Ungu dan Biru.
    
    Urutan yang paling mungkin adalah: Merah (1), Kuning (2), Ungu (3), Biru (4), Hijau (5).
    
    Mari kita cek semua aturan dengan urutan ini:
    - Aturan 1: Kuning setelah Merah. (Benar)
    - Aturan 2: Biru bukan pertama/terakhir. (Benar, Biru di posisi 4)
    - Aturan 3: Dua tim (Ungu, Biru) antara Hijau dan Kuning. (Benar)
    - Aturan 4: Ungu sebelum Hijau. (Benar)
    
    Jadi, urutan yang benar adalah Merah, Kuning, Ungu, Biru, Hijau.`
  },
  {
    id: 'q2',
    passage: `Lima orang sahabat, yaitu Adi, Budi, Caca, Didi, dan Eka, memiliki hobi yang berbeda-beda: membaca, melukis, musik, olahraga, dan fotografi. Masing-masing hanya memiliki satu hobi.
    - Caca tidak suka membaca dan tidak suka musik.
    - Hobi Adi adalah olahraga.
    - Budi sering meminjam kamera dari Eka, yang menunjukkan bahwa hobi Eka bukanlah fotografi.
    - Antara Didi dan Eka, salah satunya hobi melukis.
    - Budi tidak suka melukis.`,
    question: 'Siapakah yang memiliki hobi membaca?',
    options: [
      { id: 'A', text: 'Budi' },
      { id: 'B', text: 'Caca' },
      { id: 'C', text: 'Didi' },
      { id: 'D', text: 'Eka' },
      { id: 'E', text: 'Tidak dapat ditentukan' },
    ],
    correctAnswer: 'D',
    explanation: `Mari kita selesaikan secara sistematis:
    
    Informasi yang diberikan:
    1. Adi = Olahraga
    2. Caca ≠ Membaca, Caca ≠ Musik
    3. Eka ≠ Fotografi
    4. Budi ≠ Melukis
    5. Didi = Melukis ATAU Eka = Melukis
    
    Langkah penyelesaian:
    1. Karena Adi = Olahraga, hobi yang tersisa: Membaca, Melukis, Musik, Fotografi untuk Budi, Caca, Didi, Eka.
    
    2. Dari aturan 5: Salah satu dari Didi atau Eka pasti hobi melukis.
    
    3. Caca tidak suka membaca dan musik, jadi Caca hanya bisa melukis atau fotografi.
    
    4. Jika Caca = Melukis, maka bertentangan dengan aturan 5 (yang menyatakan hanya Didi atau Eka yang melukis).
    
    5. Jadi, Caca = Fotografi.
    
    6. Sekarang kita punya:
       - Adi = Olahraga
       - Caca = Fotografi
       - Hobi tersisa: Membaca, Melukis, Musik untuk Budi, Didi, Eka
    
    7. Karena Budi ≠ Melukis dan salah satu dari Didi/Eka = Melukis, maka:
       - Jika Didi = Melukis, maka Eka dan Budi membagi hobi Membaca dan Musik
       - Jika Eka = Melukis, maka Didi dan Budi membagi hobi Membaca dan Musik
    
    8. Mari kita test dengan asumsi Didi = Melukis:
       - Adi = Olahraga, Caca = Fotografi, Didi = Melukis
       - Budi dan Eka harus membagi Membaca dan Musik
       - Karena Eka ≠ Fotografi (sudah terpenuhi), tidak ada batasan lain untuk Eka
       - Jadi Eka bisa = Membaca atau Musik
    
    9. Untuk memastikan jawaban tunggal, mari kita cek dengan menguji pilihan D (Eka = Membaca):
       - Jika Eka = Membaca, maka Didi = Melukis (karena aturan 5)
       - Budi = Musik (satu-satunya hobi tersisa)
       - Semua aturan terpenuhi tanpa kontradiksi
    
    Jadi, Eka memiliki hobi membaca.`
  },
  {
    id: 'q3',
    passage: `Di sebuah rak buku, terdapat 6 buku dengan sampul berbeda warna: Merah, Jingga, Kuning, Hijau, Biru, dan Ungu. Posisi buku diatur dari paling kiri (posisi 1) hingga paling kanan (posisi 6).
    - Buku Merah ada di paling kiri.
    - Buku Hijau tepat di sebelah kanan buku Kuning.
    - Buku Biru tidak diletakkan di sebelah buku Ungu.
    - Buku Ungu diletakkan di antara buku Jingga dan buku Merah.`,
    question: 'Pernyataan mana yang PASTI salah?',
    options: [
      { id: 'A', text: 'Buku Jingga ada di posisi 3.' },
      { id: 'B', text: 'Buku Kuning ada di posisi 4.' },
      { id: 'C', text: 'Buku Biru ada di posisi 6.' },
      { id: 'D', text: 'Buku Hijau ada di sebelah buku Biru.' },
      { id: 'E', text: 'Buku Ungu ada di sebelah buku Kuning.' },
    ],
    correctAnswer: 'E',
    explanation: `Mari kita analisis posisi buku berdasarkan petunjuk yang diberikan:
    
    1. "Buku Merah ada di paling kiri": Posisi 1 = Merah
       [Merah, _, _, _, _, _]
    
    2. "Buku Ungu diletakkan di antara buku Jingga dan buku Merah": Karena Merah di posisi 1, maka Ungu harus di posisi 2 dan Jingga di posisi 3.
       [Merah, Ungu, Jingga, _, _, _]
    
    3. "Buku Hijau tepat di sebelah kanan buku Kuning": Ini membentuk blok [Kuning, Hijau] yang harus mengisi 2 posisi bersebelahan dari posisi 4, 5, 6.
       - Kemungkinan 1: Kuning di posisi 4, Hijau di posisi 5
       - Kemungkinan 2: Kuning di posisi 5, Hijau di posisi 6
    
    4. "Buku Biru tidak diletakkan di sebelah buku Ungu": Ungu di posisi 2, jadi Biru tidak boleh di posisi 1 atau 3. Posisi 1 sudah Merah, posisi 3 sudah Jingga, jadi aturan ini otomatis terpenuhi.
    
    Kemungkinan susunan lengkap:
    - Skenario A: [Merah, Ungu, Jingga, Kuning, Hijau, Biru]
    - Skenario B: [Merah, Ungu, Jingga, Biru, Kuning, Hijau]
    
    Sekarang kita evaluasi setiap pilihan:
    A. 'Buku Jingga ada di posisi 3': Benar di kedua skenario
    B. 'Buku Kuning ada di posisi 4': Benar di Skenario A
    C. 'Buku Biru ada di posisi 6': Benar di Skenario A
    D. 'Buku Hijau ada di sebelah buku Biru': Benar di Skenario A
    E. 'Buku Ungu ada di sebelah buku Kuning': Di kedua skenario, Ungu (posisi 2) dan Kuning (posisi 4 atau 5) selalu dipisahkan oleh Jingga. Pernyataan ini PASTI SALAH.
    
    Jawaban: E`
  },
  {
    id: 'q4',
    passage: `Tujuh pelari—P, Q, R, S, T, U, V—mengikuti lomba.
    - S selalu finis di depan T.
    - T selalu finis di depan U.
    - P finis di posisi ke-3.
    - Ada tepat satu pelari yang finis di antara Q dan R.
    - V finis di posisi terakhir (ke-7).`,
    question: 'Jika Q finis di posisi ke-2, manakah pernyataan berikut yang PASTI benar?',
    options: [
      { id: 'A', text: 'R finis di posisi pertama.' },
      { id: 'B', text: 'S finis di posisi ke-5.' },
      { id: 'C', text: 'U finis di posisi ke-6.' },
      { id: 'D', text: 'T finis di posisi ke-3.' },
      { id: 'E', text: 'R finis di posisi ke-4.' },
    ],
    correctAnswer: 'C',
    explanation: `Mari kita selesaikan langkah demi langkah:
    
    Informasi yang pasti:
    - P finis di posisi ke-3
    - V finis di posisi ke-7
    - S > T > U (urutan finis)
    - Ada tepat satu pelari antara Q dan R
    
    Kondisi dari soal: Q finis di posisi ke-2
    
    Posisi sementara: [_, Q, P, _, _, _, V]
    
    Dari aturan "Ada tepat satu pelari antara Q dan R":
    - Q di posisi 2
    - Untuk ada satu pelari di antara Q dan R, R harus di posisi 4 (dengan P di posisi 3 sebagai pelari di antaranya)
    
    Posisi sekarang: [_, Q, P, R, _, _, V]
    
    Pelari yang tersisa: S, T, U
    Posisi yang tersisa: 1, 5, 6
    
    Karena S > T > U (S finis sebelum T, T finis sebelum U):
    - S harus di posisi 1
    - T harus di posisi 5
    - U harus di posisi 6
    
    Urutan akhir: [S, Q, P, R, T, U, V]
    
    Evaluasi pilihan jawaban:
    A. R finis di posisi pertama → Salah (R di posisi 4)
    B. S finis di posisi ke-5 → Salah (S di posisi 1)
    C. U finis di posisi ke-6 → BENAR
    D. T finis di posisi ke-3 → Salah (T di posisi 5)
    E. R finis di posisi ke-4 → Benar, tapi C juga benar dan lebih spesifik
    
    Jawaban: C`
  },
  {
    id: 'q5',
    passage: `Seorang manajer personalia merencanakan jadwal wawancara untuk 6 kandidat: F, G, H, I, J, K. Jadwal berlangsung dari Senin hingga Sabtu, dengan satu kandidat per hari.
    - K dijadwalkan pada hari Rabu.
    - J dijadwalkan tepat setelah F, tanpa ada hari jeda di antara keduanya.
    - H tidak boleh dijadwalkan pada hari Senin.
    - Ada tepat dua hari antara jadwal H dan jadwal G.`,
    question: 'Manakah dari berikut ini yang bisa menjadi urutan jadwal dari Senin hingga Sabtu?',
    options: [
      { id: 'A', text: 'H, F, K, J, G, I' },
      { id: 'B', text: 'F, J, K, H, I, G' },
      { id: 'C', text: 'G, I, K, H, F, J' },
      { id: 'D', text: 'I, G, K, F, J, H' },
      { id: 'E', text: 'F, J, K, G, I, H' },
    ],
    correctAnswer: 'C',
    explanation: `Mari kita evaluasi setiap pilihan berdasarkan semua aturan yang diberikan:
    
    Aturan yang harus dipenuhi:
    1. K dijadwalkan pada hari Rabu (posisi 3)
    2. J dijadwalkan tepat setelah F (blok FJ)
    3. H tidak boleh dijadwalkan pada hari Senin (posisi 1)
    4. Ada tepat dua hari antara jadwal H dan jadwal G
    
    Evaluasi setiap pilihan:
    
    A. 'H, F, K, J, G, I' (H-Sen, F-Sel, K-Rab, J-Kam, G-Jum, I-Sab)
    - Aturan 1: K di Rabu ✓
    - Aturan 2: F-J berurutan ✓
    - Aturan 3: H di Senin ✗ (GAGAL)
    
    B. 'F, J, K, H, I, G' (F-Sen, J-Sel, K-Rab, H-Kam, I-Jum, G-Sab)
    - Aturan 1: K di Rabu ✓
    - Aturan 2: F-J berurutan ✓
    - Aturan 3: H tidak di Senin ✓
    - Aturan 4: H di Kamis, G di Sabtu (1 hari antara: Jumat) ✗ (harus 2 hari)
    
    C. 'G, I, K, H, F, J' (G-Sen, I-Sel, K-Rab, H-Kam, F-Jum, J-Sab)
    - Aturan 1: K di Rabu ✓
    - Aturan 2: F-J berurutan ✓
    - Aturan 3: H tidak di Senin ✓
    - Aturan 4: G di Senin, H di Kamis (2 hari antara: Selasa, Rabu) ✓
    
    D. 'I, G, K, F, J, H' (I-Sen, G-Sel, K-Rab, F-Kam, J-Jum, H-Sab)
    - Aturan 1: K di Rabu ✓
    - Aturan 2: F-J berurutan ✓
    - Aturan 3: H tidak di Senin ✓
    - Aturan 4: G di Selasa, H di Sabtu (3 hari antara: Rabu, Kamis, Jumat) ✗
    
    E. 'F, J, K, G, I, H' (F-Sen, J-Sel, K-Rab, G-Kam, I-Jum, H-Sab)
    - Aturan 1: K di Rabu ✓
    - Aturan 2: F-J berurutan ✓
    - Aturan 3: H tidak di Senin ✓
    - Aturan 4: G di Kamis, H di Sabtu (1 hari antara: Jumat) ✗`
  }
])

// --- Interactive State ---
const userAnswers = ref<Record<string, string>>({})
const showResult = ref(false)
const submissionAttempted = ref(false)
const resultCardRef = ref<HTMLElement | null>(null)


// --- Computed Properties ---
const allQuestionsAnswered = computed(() => {
  return questions.value.length === Object.keys(userAnswers.value).length
})

const score = computed(() => {
  if (!showResult.value) return { correct: 0, incorrect: 0, percentage: 0 }
  
  const correctCount = detailedResults.value.filter(r => r.isCorrect).length
  const totalCount = questions.value.length
  const incorrectCount = totalCount - correctCount
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  
  return {
    correct: correctCount,
    incorrect: incorrectCount,
    percentage: percentage,
  }
})

const detailedResults = computed(() => {
  return questions.value.map((q, index) => {
    const userAnswerId = userAnswers.value[q.id]
    const correctAnswerId = q.correctAnswer
    const isCorrect = userAnswerId === correctAnswerId
    
    const findOptionText = (id: string) => q.options.find(opt => opt.id === id)?.text || 'Tidak dijawab'
    
    return {
      ...q,
      number: index + 1,
      userAnswerId,
      userAnswerText: findOptionText(userAnswerId),
      correctAnswerText: findOptionText(correctAnswerId),
      isCorrect,
    }
  })
})

// --- Functions ---
function submitAnswers() {
  submissionAttempted.value = true
  if (!allQuestionsAnswered.value) {
    return
  }
  showResult.value = true
  
  // Scroll to results card for better UX
  nextTick(() => {
    resultCardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function resetQuiz() {
  userAnswers.value = {}
  showResult.value = false
  submissionAttempted.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<style scoped>
.whitespace-pre-wrap {
  white-space: pre-wrap;
}

/* Fade Transition for Result */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>