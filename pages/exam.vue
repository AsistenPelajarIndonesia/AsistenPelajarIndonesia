<template>
  <div class="exam-container">
    {{ answers }}
    <h1 class="title">Exam App</h1>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline"> Edit Profile </Button>
      </DialogTrigger>
      <DialogScrollContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modal title</DialogTitle>
          <DialogDescription>
            Here is modal with overlay scroll
          </DialogDescription>
        </DialogHeader>
        <div
          class="grid grid-cols-4 gap-2 p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
        >
          <div v-for="answer in answers" :key="answer.index">
            <DialogClose as-child>
              <Button
                variant="outline"
                v-if="!answer.answer && !answer.sure"
                class="p-2 min-w-10"
                @click="currentQuestionIndex = answer.index - 1"
              >
                {{ !answer.index - 1 && answer.index }}
              </Button>
            </DialogClose>

            <DialogClose as-child>
              <Button
                variant="destructive"
                v-if="answer.sure"
                class="p-2 min-w-10"
                @click="currentQuestionIndex = answer.index - 1"
              >
                {{ !answer.index - 1 && answer.index }}
              </Button>
            </DialogClose>

            <DialogClose as-child>
              <Button
                v-if="answer.answer && !answer.sure"
                class="p-2 min-w-10"
                @click="currentQuestionIndex = answer.index - 1"
              >
                {{ answer.index - 1 && answer.index }}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogScrollContent>
    </Dialog>
    <Card v-if="currentQuestion">
      <CardTitle>Question {{ currentQuestionIndex + 1 }}:</CardTitle>
      <CardDescription>{{ currentQuestion.pertanyaan }}</CardDescription>

      <div class="flex flex-col">
        <label
          v-for="(option, index) in currentQuestion.pilihan"
          :key="index"
          class="option"
        >
          <input
            type="radio"
            :name="'question-' + currentQuestionIndex"
            :value="option"
            v-model="answers[currentQuestionIndex].answer"
          />
          {{ option }}
        </label>
        <!-- Clear Selection Button -->
        <button @click="clearSelection" class="clear-button">
          Clear Selection
        </button>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <Button @click="prevQuestion" :disabled="currentQuestionIndex === 0">
          Previous
        </Button>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="terms"
            v-model:checked="answers[currentQuestionIndex].sure"
          />
          <label
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Ragu-ragu
          </label>
        </div>
        <Button
          @click="nextQuestion"
          :disabled="currentQuestionIndex === questions.length - 1"
        >
          Next
        </Button>
      </div>
      <!-- Submit Button -->
      <div class="submit" v-if="currentQuestionIndex === questions.length - 1">
        <button @click="submitExam">Submit Exam</button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
let checked = ref(null);
// Exam Questions
const questions = ref([
    {
        "pertanyaan": "Organ pencernaan yang menghasilkan hormon sekretin adalah?",
        "pilihan": [
            "A. Organ I",
            "B. Organ II",
            "C. Organ III",
            "D. Organ IV"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Organ Pencernaan", "Hormon"]
    },
    {
        "pertanyaan": "Jumlah zat yang dapat difiltrasi dan direabsorbsi oleh ginjal adalah?",
        "pilihan": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 6"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Ginjal", "Filtrasi", "Reabsorbsi"]
    },
    {
        "pertanyaan": "Stomata yang cenderung terbuka pada siang hari ditemukan pada tumbuhan?",
        "pilihan": [
            "A. C3",
            "B. C4",
            "C. CAM",
            "D. Conifera"
        ],
        "jawaban": "A",
        "label": ["Biologi", "Tumbuhan", "Stomata", "Photosintesis"]
    },
    {
        "pertanyaan": "Persentase tanaman yang mempunyai tanaman berubah manis dan kuning adalah?",
        "pilihan": [
            "A. 0%",
            "B. 25%",
            "C. 50%",
            "D. 100%"
        ],
        "jawaban": "B",
        "label": ["Biologi", "Genetika", "Tanaman", "Karakteristik"]
    },
    {
        "pertanyaan": "Ciri mamalia yang tidak ditemukan pada hewan lain adalah?",
        "pilihan": [
            "A. Berambut",
            "B. Berkaki du pasang",
            "C. Bernafas dengan paru-paru",
            "D. Homoterm"
        ],
        "jawaban": "A",
        "label": ["Biologi", "Mamalia", "Ciri Khas"]
    },
    {
        "pertanyaan": "Organisme yang apabila populasinya meningkat tajam menyebabkan populasi udang dan cumi meningkat adalah?",
        "pilihan": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Ekosistem", "Rantai Makanan"]
    },
    {
        "pertanyaan": "Interaksi antara 2 jenis tumbuhan dimana salah satu jenis diuntungkan termasuk jenis interaksi?",
        "pilihan": [
            "A. Amensalisme",
            "B. Kompetisi",
            "C. Mutualisme",
            "D. Parasitisme"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Ekosistem", "Interaksi Tumbuhan"]
    },
    {
        "pertanyaan": "Ciri-ciri mata hewan diurnal ditunjukkan oleh gambar?",
        "pilihan": [
            "A. I dan II",
            "B. III dan IV",
            "C. I dan III",
            "D. II dan IV"
        ],
        "jawaban": "A",
        "label": ["Biologi", "Anatomi", "Mata"]
    },
    {
        "pertanyaan": "Anak dari ayah dengan golongan darah B dan ibu dengan golongan darah A dapat memiliki golongan darah?",
        "pilihan": [
            "A. A jika ayahnya mempunyai genotip golongan darah homozigot",
            "B. A jika kedua orang tuanya mempunyai genotip golongan darah homozigot",
            "C. B jika kedua orang tuanya mempunyai genotip golongan darah homozigot",
            "D. AB jika kedua orang tuanya mempunyai genotip golongan darah homozigot"
        ],
        "jawaban": "D",
        "label": ["Biologi", "Genetika", "Golongan Darah"]
    },
    {
        "pertanyaan": "Yang tidak memiliki membran adalah?",
        "pilihan": [
            "A. i, ii, dan iii",
            "B. i, ii, dan iv",
            "C. i dan iv",
            "D. iv saja"
        ],
        "jawaban": "B",
        "label": ["Biologi", "Sel", "Membran"]
    },
    {
        "pertanyaan": "Organ ekskresi pada hewan Arthropoda adalah?",
        "pilihan": [
            "A. i saja",
            "B. i dan iv",
            "C. i, ii, dan iv",
            "D. i, ii, iii, dan iv"
        ],
        "jawaban": "D",
        "label": ["Biologi", "Hewan", "Ekskresi"]
    },
    {
        "pertanyaan": "Hewan yang sudah memiliki sistem pencernaan yang sempurna adalah?",
        "pilihan": [
            "A. i, ii, iii, iv, v, vi, dan vii",
            "B. i, ii, iii, iv, v, dan vi",
            "C. i, ii, v, vi, dan vii",
            "D. i, ii, iii, dan v"
        ],
        "jawaban": "B",
        "label": ["Biologi", "Hewan", "Sistem Pencernaan"]
    },
    {
        "pertanyaan": "Larutan yang bersifat hipotonis adalah?",
        "pilihan": [
            "A. I dan II",
            "B. II dan III",
            "C. III dan IV",
            "D. IV dan V"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Sel", "Osmosis"]
    },
    {
        "pertanyaan": "Metafase ditunjukkan oleh sel nomor?",
        "pilihan": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        "jawaban": "C",
        "label": ["Biologi", "Sel", "Pembelahan Sel"]
    },
    {
        "pertanyaan": "Perbedaan antara tanaman monokotil dan dikotil yang benar adalah?",
        "pilihan": [
            "A. Struktur akar",
            "B. Struktur batang",
            "C. Struktur daun",
            "D. Struktur bunga"
        ],
        "jawaban": "A",
        "label": ["Biologi", "Botani", "Tanaman"]
    },
    {
        "pertanyaan": "Suhu suatu ruangan terbaca oleh termometer X adalah?",
        "pilihan": [
            "A. 25°C",
            "B. 30°C",
            "C. 35°C",
            "D. 40°C"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Termometer", "Suhu"]
    },
    {
        "pertanyaan": "Pertambahan panjang batang besi B adalah?",
        "pilihan": [
            "A. 0,0005 m",
            "B. 0,0001 m",
            "C. 0,0015 m",
            "D. 0,00025 m"
        ],
        "jawaban": "D",
        "label": ["Fisika", "Panjang", "Pertambahan"]
    },
    {
        "pertanyaan": "Jumlah energi kinetik dan potensial gerobak adalah?",
        "pilihan": [
            "A. Bertambah",
            "B. Tetap",
            "C. Berkurang",
            "D. Tidak dapat ditentukan secara kualitatif"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Energi", "Gerobak"]
    },
    {
        "pertanyaan": "Ketinggian benda diukur dari titik setimbang pegas adalah?",
        "pilihan": [
            "A. 0,5 m",
            "B. 0,8 m",
            "C. 1,0 m",
            "D. 1,5 m"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Pegas", "Ketinggian"]
    },
    {
        "pertanyaan": "Perubahan yang dialami oleh benda yang bergerak melingkar beraturan adalah?",
        "pilihan": [
            "A. Jari-jari lingkaran",
            "B. Arah gerak partikel",
            "C. Besar kecepatan",
            "D. Kecepatan sudut"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Gerak Melingkar", "Perubahan"]
    },
    {
        "pertanyaan": "Bayangan diri Tono pada spion mobil adalah?",
        "pilihan": [
            "A. Maya, tegak, diperkecil",
            "B. Nyata, tegak, diperkecil",
            "C. Nyata, tegak, diperbesar",
            "D. Maya, terbalik, diperbesar"
        ],
        "jawaban": "A",
        "label": ["Fisika", "Cermin", "Bayangan"]
    },
    {
        "pertanyaan": "Waktu yang dibutuhkan balok untuk kembali ke titik A adalah?",
        "pilihan": [
            "A. 1 detik",
            "B. 2 detik",
            "C. 3 detik",
            "D. 4 detik"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Gerak Lurus", "Waktu"]
    },
    {
        "pertanyaan": "Massa jenis fluida adalah?",
        "pilihan": [
            "A. 1000 kg/m³",
            "B. 2000 kg/m³",
            "C. 3000 kg/m³",
            "D. 4000 kg/m³"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Fluida", "Massa Jenis"]
    },
        {
        "pertanyaan": "Tekanan hidrostatik pada ketinggian 5 cm dari dasar botol adalah?",
        "pilihan": [
            "A. 3,0 kPa",
            "B. 2,5 kPa",
            "C. 1,5 kPa",
            "D. 1,0 kPa"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Tekanan Hidrostatik", "Botol"]
    },
        {
        "pertanyaan": "Nada dasar yang terjadi pada pipa asal adalah?",
        "pilihan": [
            "A. 150 Hz",
            "B. 180 Hz",
            "C. 375 Hz",
            "D. 750 Hz"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Gelombang Bunyi", "Pipa"]
    },
        {
        "pertanyaan": "Frekuensi bandul setelah panjang tali diubah menjadi empat kali panjang awal adalah?",
        "pilihan": [
            "A. 0,1 Hz",
            "B. 0,25 Hz",
            "C. 0,5 Hz",
            "D. 0,75 Hz"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Bandul", "Frekuensi"]
    },
        {
        "pertanyaan": "Kecepatan aliran sungai adalah?",
        "pilihan": [
            "A. 9 m/s",
            "B. 10 m/s",
            "C. 11 m/s",
            "D. 12 m/s"
        ],
        "jawaban": "B",
        "label": ["Fisika", "Gerak Melingkar", "Kecepatan"]
    },
        {
        "pertanyaan": "Faktor yang tidak meningkatkan besar GGL adalah?",
        "pilihan": [
            "A. Menambah jumlah lilitan pada koil",
            "B. Membesar kuat medan magnet",
            "C. Mengganti bahan koil",
            "D. Mempercepat gerak koil"
        ],
        "jawaban": "C",
        "label": ["Fisika", "GGL", "Koil"]
    },
        {
        "pertanyaan": "Tinggi cermin yang dibutuhkan agar anak dapat melihat bayangan tubuhnya secara keseluruhan adalah?",
        "pilihan": [
            "A. 65 cm dan 65 cm",
            "B. 65 cm dan 70 cm",
            "C. 70 cm dan 65 cm",
            "D. 70 cm dan 70 cm"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Cermin", "Bayangan"]
    },
    {
        "pertanyaan": "Hambatan kabel B adalah?",
        "pilihan": [
            "A. 9 ohm",
            "B. 18 ohm",
            "C. 36 ohm",
            "D. 72 ohm"
        ],
        "jawaban": "C",
        "label": ["Fisika", "Hambatan", "Kabel"]
    }
]);

const currentQuestionIndex = ref(0); // Track the current question index
const answers = ref(
  questions.value.map((_, index) => ({
    index: index + 1, // 1-based question index
    answer: null,
    sure: false,
  }))
);

// Get the current question dynamically
const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

// Go to the next question
function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}
function clearSelection() {
  answers.value[currentQuestionIndex.value].answer = null;
}
// Go to the previous question
function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

// Submit the exam
function submitExam() {
  console.log("User's Answers:", answers.value);
  alert("Exam Submitted! Check the console for answers.");
}
</script>

<style scoped></style>
