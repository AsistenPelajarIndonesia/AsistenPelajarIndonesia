<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 flex flex-col items-center">
    <div class="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
      <header class="mb-6 text-center">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Simulasi SNBT – Subtes Pengetahuan Kuantitatif
        </h1>
      </header>

      <div v-if="isLoading" class="text-center py-10">
        <p class="text-lg text-gray-600 dark:text-gray-300">Memuat soal...</p>
        <!-- You can add a spinner component here -->
      </div>

      <div v-else-if="showResults" class="results-screen">
        <h2 class="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          Hasil Simulasi
        </h2>
        <p class="text-3xl font-bold mb-6 text-center" :class="scorePercentage >= 75 ? 'text-green-500' : scorePercentage >= 50 ? 'text-yellow-500' : 'text-red-500'">
          Skor Anda: {{ score }} / {{ questions.length }}
        </p>
        
        <div class="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
          <Card v-for="(question, index) in questions" :key="question.id" class="p-4 bg-gray-50 dark:bg-gray-700">
            <p class="font-semibold mb-1 text-gray-700 dark:text-gray-200">Soal {{ index + 1 }}: <span v-html="renderMarkdown(question.questionText)"></span></p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Jawaban Anda: 
              <span :class="userAnswers[index] === question.correctAnswerId ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'">
                {{ getOptionText(question, userAnswers[index]) || 'Tidak dijawab' }}
              </span>
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">Jawaban Benar: {{ getOptionText(question, question.correctAnswerId) }}</p>
            <Accordion type="single" collapsible class="w-full mt-2">
              <AccordionItem value="item-1">
                <AccordionTrigger class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat Pembahasan</AccordionTrigger>
                <AccordionContent class="text-sm text-gray-700 dark:text-gray-300 pt-2">
                  <span v-html="renderMarkdown(question.explanation)"></span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
        <div class="text-center">
          <Button @click="retryTest" size="lg" class="bg-blue-600 hover:bg-blue-700 text-white">
            Coba Lagi
          </Button>
        </div>
      </div>

      <div v-else-if="questions.length > 0" class="test-screen">
        <div class="flex justify-between items-center mb-4">
          <div class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ formattedTimeLeft }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Soal {{ currentIndex + 1 }} dari {{ questions.length }}
          </div>
        </div>
        <Progress :model-value="progressPercentage" class="mb-6 h-3" />

        <Card class="mb-6 p-6 bg-gray-50 dark:bg-gray-700">
          <CardHeader>
            <CardTitle class="text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-3">
              Pertanyaan {{ currentIndex + 1 }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="prose dark:prose-invert max-w-none mb-6" v-html="renderMarkdown(currentQuestion.questionText)"></div>
            <RadioGroup v-model="currentAnswer" :disabled="isSubmitted">
              <div v-for="option in currentQuestion.options" :key="option.id" class="flex items-center space-x-2 mb-3 p-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150">
                <RadioGroupItem :value="option.id" :id="`option-${option.id}`" />
                <Label :for="`option-${option.id}`" class="text-gray-700 dark:text-gray-200 cursor-pointer flex-1">
                  <span v-html="renderMarkdown(option.text)"></span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div class="flex justify-between mt-8">
          <Button 
            @click="prevQuestion" 
            :disabled="currentIndex === 0 || isSubmitted"
            variant="outline"
            class="px-6 py-2"
          >
            Sebelumnya
          </Button>
          <Button 
            @click="nextOrSubmitQuestion" 
            :disabled="isSubmitted && currentIndex === questions.length - 1"
            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {{ navigationButtonText }}
          </Button>
        </div>
      </div>
      <div v-else class="text-center py-10">
         <p class="text-lg text-red-600 dark:text-red-400">Gagal memuat soal. Silakan coba lagi nanti.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useGroqClient, type SnbtUltraKuantitatifQuestion } from '@/composables/useGroqClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { marked } from 'marked'; // For rendering Markdown in questions/explanations

const { generateSnbtUltraKuantitatifQuestions } = useGroqClient();

const questions = ref<SnbtUltraKuantitatifQuestion[]>([]);
const currentIndex = ref(0);
const userAnswers = ref<Array<string | null>>([]);
const timeLeft = ref(37 * 60 + 30); // 37 minutes 30 seconds
const timerId = ref<NodeJS.Timeout | null>(null);
const showResults = ref(false);
const isLoading = ref(true);
const isSubmitted = ref(false); // To disable inputs after submission or time up

const renderMarkdown = (text: string) => {
  if (!text) return '';
  // Basic configuration for marked - extend as needed
  return marked.parse(text, { breaks: true, gfm: true });
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const loadQuestions = async () => {
  isLoading.value = true;
  isSubmitted.value = false;
  showResults.value = false;
  try {
    const fetchedQuestions = await generateSnbtUltraKuantitatifQuestions();
    questions.value = shuffleArray(fetchedQuestions);
    userAnswers.value = Array(questions.value.length).fill(null);
    currentIndex.value = 0;
    timeLeft.value = 37 * 60 + 30;
    startTimer();
  } catch (error) {
    console.error('Failed to load quantitative questions:', error);
    questions.value = []; // Ensure questions array is empty on error
    // Handle error display to user if necessary
  } finally {
    isLoading.value = false;
  }
};

const currentQuestion = computed(() => questions.value[currentIndex.value]);

const currentAnswer = computed({
  get: () => userAnswers.value[currentIndex.value],
  set: (value) => {
    if (!isSubmitted.value) {
      userAnswers.value[currentIndex.value] = value;
    }
  },
});

const prevQuestion = () => {
  if (currentIndex.value > 0 && !isSubmitted.value) {
    currentIndex.value--;
  }
};

const nextOrSubmitQuestion = () => {
  if (isSubmitted.value) return; // Prevent action if already submitted

  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  } else {
    submitTest();
  }
};

const submitTest = () => {
  if (timerId.value) clearInterval(timerId.value);
  isSubmitted.value = true;
  showResults.value = true;
  // Score calculation is done in 'score' computed property
};

const score = computed(() => {
  if (!questions.value.length) return 0;
  return userAnswers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions.value[index].correctAnswerId ? 1 : 0);
  }, 0);
});

const scorePercentage = computed(() => {
  if (!questions.value.length) return 0;
  return (score.value / questions.value.length) * 100;
});

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const progressPercentage = computed(() => {
  if (!questions.value.length) return 0;
  return ((currentIndex.value + 1) / questions.value.length) * 100;
});

const navigationButtonText = computed(() => {
  if (currentIndex.value === questions.value.length - 1) {
    return 'Submit';
  }
  return 'Selanjutnya';
});

const startTimer = () => {
  if (timerId.value) clearInterval(timerId.value);
  timerId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      if (timerId.value) clearInterval(timerId.value);
      if (!showResults.value) { // Auto-submit if not already submitted
        submitTest();
      }
    }
  }, 1000);
};

const retryTest = () => {
  isLoading.value = true; // Show loading state while refetching/resetting
  showResults.value = false;
  isSubmitted.value = false;
  if (timerId.value) clearInterval(timerId.value);
  //currentIndex.value = 0; // Will be reset in loadQuestions
  //userAnswers.value = Array(questions.value.length).fill(null); // Will be reset
  //timeLeft.value = 37 * 60 + 30; // Will be reset
  loadQuestions(); // This will re-shuffle and restart everything
};

const getOptionText = (question: SnbtUltraKuantitatifQuestion, optionId: string | null) => {
  if (!optionId) return '';
  const option = question.options.find(opt => opt.id === optionId);
  return option ? option.text : '';
};

onMounted(() => {
  loadQuestions();
});

onUnmounted(() => {
  if (timerId.value) clearInterval(timerId.value);
});

// Define page meta for Nuxt
definePageMeta({
  // layout: 'default', // or your specific layout if needed
});

</script>

<style scoped>
/* Add any page-specific styles here if needed */
.prose :where(p):where(:not(:where([class~=\"not-prose\"] *))) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* Custom scrollbar for results - optional */
.max-h-96::-webkit-scrollbar {
  width: 8px;
}
.max-h-96::-webkit-scrollbar-track {
  background: transparent; 
}
.max-h-96::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>