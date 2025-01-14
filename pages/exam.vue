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
      <CardDescription>{{ currentQuestion.text }}</CardDescription>

      <div class="flex flex-col">
        <label
          v-for="(option, index) in currentQuestion.options"
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
  { text: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
  },
  { text: "What is 10 / 2?", options: ["3", "5", "10", "20"] },
  {
    text: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Hemingway", "Frost", "Poe"],
  },
  { text: "What is the square root of 64?", options: ["6", "7", "8", "9"] },
  {
    text: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
  },
  {
    text: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
  },
  {
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
  },
  { text: "What is 5 x 6?", options: ["30", "25", "20", "35"] },
  {
    text: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
  },
  {
    text: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
  },
  {
    text: "Who discovered gravity?",
    options: ["Newton", "Einstein", "Galileo", "Edison"],
  },
  { text: "What is the square of 9?", options: ["81", "72", "64", "90"] },
  {
    text: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
  },
  {
    text: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Tesla", "Ford"],
  },
  {
    text: "Which planet is closest to the sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
  },
  {
    text: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
  },
  { text: "What is 12 x 8?", options: ["96", "84", "72", "108"] },
  {
    text: "Who painted 'Starry Night'?",
    options: ["Da Vinci", "Van Gogh", "Picasso", "Rembrandt"],
  },
  {
    text: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
  },
  {
    text: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
  },
  {
    text: "Who was the first man to walk on the moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
  },
  { text: "What is 25 / 5?", options: ["3", "4", "5", "6"] },
  {
    text: "What language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
  },
  {
    text: "What is the currency of the United Kingdom?",
    options: ["Dollar", "Euro", "Pound", "Yen"],
  },
  {
    text: "What does H2O represent?",
    options: ["Oxygen", "Water", "Carbon Dioxide", "Hydrogen"],
  },
  {
    text: "Who discovered America?",
    options: ["Magellan", "Christopher Columbus", "Vespucci", "Cook"],
  },
  {
    text: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Cheetah"],
  },
  {
    text: "What is the freezing point of water?",
    options: ["0°C", "10°C", "32°C", "50°C"],
  },
  {
    text: "What is the main gas in the air we breathe?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
  },
  {
    text: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "400,000 km/s"],
  },
  {
    text: "Which country is famous for the Great Wall?",
    options: ["India", "China", "Egypt", "Mexico"],
  },
  {
    text: "What is the largest organ in the human body?",
    options: ["Brain", "Liver", "Skin", "Heart"],
  },
  {
    text: "Which ocean is the coldest?",
    options: ["Atlantic", "Pacific", "Arctic", "Indian"],
  },
  { text: "What is 7 x 7?", options: ["42", "49", "56", "63"] },
  {
    text: "Which fruit is known as the 'King of Fruits'?",
    options: ["Apple", "Mango", "Banana", "Grapes"],
  },
  {
    text: "What does DNA stand for?",
    options: [
      "Deoxyribonucleic Acid",
      "Dinucleic Acid",
      "Deoxyribonitro Acid",
      "None of the above",
    ],
  },
  {
    text: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
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
