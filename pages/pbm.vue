<script lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { z } from 'zod';
import { useGroqClient } from '@/composables/useGroqClient'; // Import the composable

// Define interfaces for SNBT PBM (Pemahaman Bacaan dan Menulis)
interface PBMOption {
  id: string; // e.g., 'a', 'b', 'c', 'd', 'e'
  text: string;
}

interface PBMQuestion {
  id: string; // e.g., "pbm_q1"
  passage?: string; // Optional passage
  questionText: string;
  options: PBMOption[];
  answerKey: string; // The ID of the correct option, e.g., 'a'
  explanation?: string; // Optional explanation
}

interface Result extends PBMQuestion {
  userAnswerId: string;
  isCorrect: boolean;
}

export default {
  setup() {
    const { chatCompletion } = useGroqClient(); // Destructure chatCompletion
    const questions = ref<PBMQuestion[]>([]);
    const userAnswers = reactive<Record<string, string>>({}); // questionId: selectedOptionId
    const results = ref<Result[]>([]);
    const score = ref<number | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);
    const showResults = ref(false);

    const PBMQuestionSchema = z.object({
      id: z.string(),
      passage: z.string().optional(),
      questionText: z.string(),
      options: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      ),
      answerKey: z.string(),
      explanation: z.string().optional(),
    });

    const PBMTestSchema = z.object({
      questions: z.array(PBMQuestionSchema).length(20), // Expecting 20 questions
    });

    const fetchPBMQuestions = async () => {
      isLoading.value = true;
      error.value = null;
      showResults.value = false;
      results.value = [];
      score.value = null;
      Object.keys(userAnswers).forEach(key => delete userAnswers[key]);

      const systemPrompt = `You are an expert in creating highly challenging SNBT (Seleksi Nasional Berdasarkan Tes) questions, specifically for the "Pemahaman Bacaan dan Menulis" (PBM) section, targeting Higher-Order Thinking Skills (HOTS). Generate a JSON object containing a 'questions' array with exactly 20 PBM questions. Each question must have a unique 'id' (e.g., "pbm_q1", "pbm_q2", ...), an optional 'passage' (a dense, nuanced, and lexically rich text in Indonesian, max 150-200 words, if relevant to the question, potentially presenting multiple perspectives or complex arguments), a 'questionText' in Indonesian that requires deep analysis, inference, or evaluation. The 'options' array should contain 5 choices (each with 'id' like 'a', 'b', 'c', 'd', 'e' and 'text'), where distractors are plausible and require careful discrimination. The 'answerKey' (the 'id' of the correct option) must be accurate. Questions should rigorously test skills such as: identifying implicit main ideas, understanding complex text structures and author's subtle purpose/tone/bias, inferring meaning of sophisticated vocabulary or figurative language in context, evaluating argument strength, and synthesizing information. The output must be a valid JSON object. Focus on creating questions that demand critical reasoning and problem-solving rather than simple recall. Ensure passages and questions reflect the complexity expected in a university entrance exam.`;
      const userPrompt = "Generate 20 challenging PBM questions according to the enhanced HOTS system prompt."

      try {
        // const response = await groq.chat.completions.create({
        //   messages: [
        //     { role: 'system', content: systemPrompt },
        //     { role: 'user', content: userPrompt },
        //   ],
        //   model: 'llama3-70b-8192',
        //   temperature: 0.7,
        //   response_format: { type: "json_object" },
        // });
        const response = await chatCompletion(systemPrompt, userPrompt); // Use chatCompletion

        if (response.choices && response.choices[0].message?.content) {
            console.log(response.choices[0].message.content)
          const parsedContent = JSON.parse(response.choices[0].message.content);
          const validationResult = PBMTestSchema.safeParse(parsedContent);

          if (validationResult.success) {
            questions.value = validationResult.data.questions;
          } else {
            console.error('Validation Error:', validationResult.error.errors);
            error.value = `Failed to validate questions: ${validationResult.error.message}. Please check the console for details.`;
            questions.value = []; // Clear questions on validation failure
          }
        } else {
          throw new Error('No content in Groq API response or invalid response structure.');
        }
      } catch (e: any) {
        console.error('Error fetching PBM questions:', e);
        error.value = `Failed to fetch questions: ${e.message}. Please try again.`;
        questions.value = []; // Clear questions on fetch failure
      }
      isLoading.value = false;
    };

    const handleSubmit = async () => {
      if (Object.keys(userAnswers).length !== questions.value.length) {
        alert('Please answer all questions before submitting.');
        return;
      }

      isLoading.value = true;
      error.value = null;
      let correctAnswersCount = 0;
      const detailedResults: Result[] = [];

      // For PBM, answer keys are already fetched with the questions.
      // No need for a separate validation call to Groq unless explicitly required for other reasons.
      questions.value.forEach(q => {
        const userAnswerId = userAnswers[q.id];
        const isCorrect = userAnswerId === q.answerKey;
        if (isCorrect) {
          correctAnswersCount++;
        }
        detailedResults.push({
          ...q,
          userAnswerId,
          isCorrect,
        });
      });

      results.value = detailedResults;
      score.value = (correctAnswersCount / questions.value.length) * 100;
      showResults.value = true;
      isLoading.value = false;
    };

    onMounted(() => {
      fetchPBMQuestions();
    });

    return {
      questions,
      userAnswers,
      results,
      score,
      isLoading,
      error,
      showResults,
      fetchPBMQuestions, // Renamed from resetTest for clarity
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-8 font-sans">
    <div class="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-10 border border-slate-700">
      <header class="mb-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          SNBT: Pemahaman Bacaan & Menulis
        </h1>
        <p class="text-slate-400 mt-2 text-lg">Uji kemampuan pemahaman bacaan dan menulismu!</p>
      </header>

      <div v-if="isLoading && !showResults" class="flex flex-col items-center justify-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        <p class="mt-4 text-xl text-slate-300">Memuat soal...</p>
      </div>

      <div v-if="error" class="my-6 p-4 bg-red-500/20 border border-red-700 text-red-300 rounded-lg shadow-md">
        <h3 class="font-semibold text-lg mb-2">Terjadi Kesalahan</h3>
        <p>{{ error }}</p>
        <button 
          @click="fetchPBMQuestions"
          class="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
          Coba Lagi
        </button>
      </div>

      <form @submit.prevent="handleSubmit" v-if="!isLoading && !showResults && questions.length > 0">
        <div v-for="(question, index) in questions" :key="question.id" class="mb-8 p-6 bg-slate-700/40 rounded-xl shadow-lg border border-slate-600 transition-all duration-300 hover:shadow-purple-500/20">
          <p class="text-sm font-semibold text-purple-400 mb-1">Soal {{ index + 1 }} dari {{ questions.length }}</p>
          <div v-if="question.passage" class="mb-4 p-4 bg-slate-600/30 rounded-md border border-slate-500">
            <h4 class="font-semibold text-slate-300 mb-1">Bacalah teks berikut dengan saksama:</h4>
            <p class="text-slate-300 whitespace-pre-line text-sm leading-relaxed">{{ question.passage }}</p>
          </div>
          <p class="text-lg text-slate-200 mb-5 leading-relaxed">{{ question.questionText }}</p>
          
          <div class="space-y-3">
            <label 
              v-for="option in question.options" 
              :key="option.id" 
              :for="`${question.id}-${option.id}`"
              class="flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer text-slate-300 hover:bg-purple-500/20 hover:border-purple-500 focus-within:ring-2 focus-within:ring-purple-400"
              :class="{
                'bg-purple-600/30 border-purple-500 shadow-md': userAnswers[question.id] === option.id,
                'bg-slate-600/20 border-slate-500': userAnswers[question.id] !== option.id
              }">
              <input 
                type="radio" 
                :name="question.id" 
                :id="`${question.id}-${option.id}`" 
                :value="option.id" 
                v-model="userAnswers[question.id]" 
                class="sr-only peer">
              <span class="h-5 w-5 border-2 border-slate-400 rounded-full flex items-center justify-center mr-3 transition-all duration-200 peer-checked:bg-purple-500 peer-checked:border-purple-500">
                <span class="h-2 w-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></span>
              </span>
              <span class="flex-1 text-sm">{{ option.text }}</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="Object.keys(userAnswers).length !== questions.length || isLoading"
          class="w-full mt-8 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          Kumpulkan Jawaban
        </button>
      </form>

      <div v-if="showResults && results.length > 0" class="mt-10">
        <h2 class="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500">Hasil Tes</h2>
        <div class="text-center mb-8 p-6 bg-slate-700/50 rounded-xl shadow-lg border border-slate-600">
          <p class="text-2xl font-semibold text-slate-200">Skor Akhir Anda:</p>
          <p class="text-6xl font-bold my-3" 
             :class="{'text-green-400': (score || 0) >= 70, 'text-yellow-400': (score || 0) >= 50 && (score || 0) < 70, 'text-red-400': (score || 0) < 50}">
            {{ score?.toFixed(0) ?? '0' }} / 100
          </p>
        </div>

        <div v-for="(result, index) in results" :key="`result-${result.id}`" class="mb-6 p-5 rounded-xl shadow-lg border"
             :class="{
               'bg-green-500/10 border-green-700': result.isCorrect,
               'bg-red-500/10 border-red-700': !result.isCorrect
             }">
          <p class="text-sm font-semibold mb-1" :class="{'text-green-400': result.isCorrect, 'text-red-400': !result.isCorrect}">Soal {{ index + 1 }}</p>
          <div v-if="result.passage" class="mb-3 p-3 bg-slate-600/20 rounded-md border border-slate-500/50 text-xs">
            <h5 class="font-semibold text-slate-400 mb-1">Konteks Bacaan:</h5>
            <p class="text-slate-400 whitespace-pre-line leading-normal">{{ result.passage }}</p>
          </div>
          <p class="text-md text-slate-300 mb-2 leading-normal">{{ result.questionText }}</p>
          
          <div class="space-y-2 text-sm">
            <p :class="{'text-green-300': result.isCorrect, 'text-red-300': !result.isCorrect}">
              Jawaban Anda: <span class="font-semibold">{{ result.options.find(o => o.id === result.userAnswerId)?.text || 'Tidak terjawab' }}</span> 
              <span v-if="result.isCorrect" class="ml-2">✅ Benar</span>
              <span v-else class="ml-2">❌ Salah</span>
            </p>
            <p v-if="!result.isCorrect" class="text-slate-400">
              Kunci Jawaban: <span class="font-semibold text-green-400">{{ result.options.find(o => o.id === result.answerKey)?.text }}</span>
            </p>
            <p v-if="result.explanation" class="mt-2 pt-2 border-t border-slate-600/50 text-xs text-slate-400">
              <span class="font-semibold">Penjelasan:</span> {{ result.explanation }}
            </p>
          </div>
        </div>

        <button 
          @click="fetchPBMQuestions" 
          class="w-full mt-10 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
          Ulangi Tes
        </button>
      </div>

      <div v-if="!isLoading && !showResults && questions.length === 0 && !error" class="text-center py-10">
        <p class="text-xl text-slate-400">Tidak ada soal yang dapat ditampilkan saat ini.</p>
        <p class="text-slate-500">Silakan coba muat ulang atau periksa koneksi Anda.</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for WebKit browsers */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1e293b; /* slate-800 */
}
::-webkit-scrollbar-thumb {
  background: #4a5568; /* slate-600 */
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #718096; /* slate-500 */
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Enhanced focus visibility for accessibility */
input[type="radio"]:focus-visible + span {
  outline: 2px solid #8b5cf6; /* purple-500 */
  outline-offset: 2px;
}

/* Smooth transition for hover and active states on buttons and interactive elements */
button, label[for] {
  -webkit-tap-highlight-color: transparent; /* Removes tap highlight on mobile */
}
</style>