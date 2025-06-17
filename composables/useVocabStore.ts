import { ref, computed } from 'vue';
import type { VocabularyQuestion } from './useGroqClient'; // Asumsi path benar

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string | null;
}

export interface QuestionResult extends VocabularyQuestion {
  userAnswerId: string | null;
  isCorrect: boolean | null;
}

export function useVocabStore() {
  const questions = ref<VocabularyQuestion[]>([]);
  const userAnswers = ref<UserAnswer[]>([]);
  const isLoadingQuestions = ref(false);
  const errorLoadingQuestions = ref<string | null>(null);
  const submissionDone = ref(false);

  function initializeAnswers() {
    userAnswers.value = questions.value.map(q => ({ questionId: q.id, selectedOptionId: null }));
    submissionDone.value = false;
  }

  async function fetchQuestions(generateFunc: () => Promise<VocabularyQuestion[]>) {
    isLoadingQuestions.value = true;
    errorLoadingQuestions.value = null;
    submissionDone.value = false;
    try {
      const fetchedQuestions = await generateFunc();
      questions.value = fetchedQuestions;
      initializeAnswers();
    } catch (err: any) {
      errorLoadingQuestions.value = err.message || 'Gagal memuat soal.';
      questions.value = []; // Kosongkan soal jika gagal
    } finally {
      isLoadingQuestions.value = false;
    }
  }

  function selectAnswer(questionId: string, optionId: string) {
    if (submissionDone.value) return; // Jangan biarkan mengubah jawaban setelah submit
    const answer = userAnswers.value.find(a => a.questionId === questionId);
    if (answer) {
      answer.selectedOptionId = optionId;
    }
  }

  const results = computed<QuestionResult[]>(() => {
    return questions.value.map(q => {
      const userAnswer = userAnswers.value.find(a => a.questionId === q.id);
      const isCorrect = userAnswer ? userAnswer.selectedOptionId === q.correctAnswerId : null;
      return {
        ...q,
        userAnswerId: userAnswer ? userAnswer.selectedOptionId : null,
        isCorrect,
      };
    });
  });

  const score = computed(() => {
    if (!submissionDone.value) return { correct: 0, total: questions.value.length };
    const correctAnswers = results.value.filter(r => r.isCorrect).length;
    return { correct: correctAnswers, total: questions.value.length };
  });

  const improvementSummary = computed(() => {
    if (!submissionDone.value) return [];
    return results.value
      .filter(r => !r.isCorrect && r.userAnswerId !== null) // Hanya yang salah dijawab
      .map(r => `Untuk soal tipe '${r.type}' (${r.questionText.substring(0,30)}...), jawaban yang benar adalah '${r.options.find(opt => opt.id === r.correctAnswerId)?.text}'. Penjelasan: ${r.explanation}`);
  });

  function handleSubmit() {
    submissionDone.value = true;
    // Logika tambahan jika ada, misal kirim hasil ke backend
  }
  
  function resetQuiz() {
    questions.value = [];
    userAnswers.value = [];
    submissionDone.value = false;
    isLoadingQuestions.value = false;
    errorLoadingQuestions.value = null;
    // Idealnya panggil fetchQuestions lagi atau biarkan user yang memicu
  }

  return {
    questions,
    userAnswers,
    isLoadingQuestions,
    errorLoadingQuestions,
    fetchQuestions,
    selectAnswer,
    results, // Untuk menampilkan feedback per soal
    score,
    improvementSummary,
    submissionDone,
    handleSubmit,
    resetQuiz,
    initializeAnswers // expose jika perlu re-init manual
  };
}