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
    pertanyaan: "Apa yang dimaksud dengan integritas?",
    pilihan: [
      "A. Kemampuan untuk melakukan tindakan yang benar",
      "B. Konsistensi dan keteguhan dalam menjunjung tinggi nilai-nilai moral dan etika",
      "C. Kemampuan untuk memimpin orang lain",
      "D. Kemampuan untuk mengambil keputusan yang cepat",
    ],
    jawaban: "B",
    label: ["Integritas", "Etika", "Moral"],
  },
  {
    pertanyaan: "Mengapa integritas penting dalam CPNS?",
    pilihan: [
      "A. Karena integritas dapat meningkatkan gaji",
      "B. Karena integritas dapat membangun kepercayaan publik dan mencegah korupsi",
      "C. Karena integritas dapat membuat pekerjaan lebih mudah",
      "D. Karena integritas dapat membuat orang lain takut",
    ],
    jawaban: "B",
    label: ["Integritas", "CPNS", "Kepercayaan Publik"],
  },
  {
    pertanyaan: "Apa ciri-ciri orang yang berintegritas?",
    pilihan: [
      "A. Jujur, konsisten, dan bertanggung jawab",
      "B. Pembohong, tidak konsisten, dan tidak bertanggung jawab",
      "C. Sombong, egois, dan tidak peduli",
      "D. Lemah, takut, dan tidak berani",
    ],
    jawaban: "A",
    label: ["Integritas", "Ciri-ciri", "Orang Berintegritas"],
  },
  {
    pertanyaan: "Bagaimana cara menerapkan integritas di tempat kerja?",
    pilihan: [
      "A. Dengan menyelesaikan tugas tepat waktu dan menolak suap",
      "B. Dengan memanipulasi data dan mengambil keuntungan pribadi",
      "C. Dengan mengabaikan tugas dan tidak peduli",
      "D. Dengan meminta bantuan orang lain untuk menyelesaikan tugas",
    ],
    jawaban: "A",
    label: ["Integritas", "Tempat Kerja", "Menerapkan Integritas"],
  },
  {
    pertanyaan:
      "Apa yang harus dilakukan jika menemukan uang di meja kerja rekan?",
    pilihan: [
      "A. Mengambil uang tersebut",
      "B. Membiarkan uang tersebut dan tidak peduli",
      "C. Menyimpan uang tersebut sementara dan memberikannya kepada rekan",
      "D. Melaporkan ke atasan tentang uang tersebut",
    ],
    jawaban: "C",
    label: ["Integritas", "Uang", "Meja Kerja"],
  },
  {
    pertanyaan:
      "Apa yang harus dilakukan jika diminta oleh atasan untuk memanipulasi data?",
    pilihan: [
      "A. Menolak dengan tegas karena hal tersebut melanggar integritas",
      "B. Melakukan permintaan atasan tanpa bertanya",
      "C. Meminta pendapat rekan kerja terlebih dahulu",
      "D. Melaporkan hal tersebut kepada pihak yang berwenang",
    ],
    jawaban: "A",
    label: ["Integritas", "Atasan", "Manipulasi Data"],
  },
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
