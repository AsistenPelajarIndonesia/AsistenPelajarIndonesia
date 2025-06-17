import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';

export interface MbtiQuestion {
  id: string;
  optionA: string;
  optionB: string;
  keyA: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  keyB: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface UserAnswer {
  questionId: string;
  selectedOption: 'a' | 'b';
}

export interface MbtiDimension {
  name: string;
  preference: string;
  score: number;
}

export interface MbtiResult {
  type: string;
  description: string;
  dimensions: MbtiDimension[];
}

export const useMbtiStore = () => {
  // Reactive state
  const questions = ref<MbtiQuestion[]>([]);
  const userAnswers = useStorage<UserAnswer[]>('mbti-user-answers', []);
  const result = useStorage<MbtiResult | null>('mbti-result', null);
  const testCompleted = useStorage<boolean>('mbti-test-completed', false);
  
  // Loading states
  const isLoadingQuestions = ref(false);
  const isCalculatingResult = ref(false);
  const errorLoadingQuestions = ref<string | null>(null);

  // Computed properties
  const answeredCount = computed(() => userAnswers.value.length);
  const allQuestionsAnswered = computed(() => 
    userAnswers.value.length === questions.value.length && questions.value.length > 0
  );

  // Methods
  const selectAnswer = (questionId: string, selectedOption: 'a' | 'b') => {
    const existingIndex = userAnswers.value.findIndex(a => a.questionId === questionId);
    if (existingIndex >= 0) {
      userAnswers.value[existingIndex].selectedOption = selectedOption;
    } else {
      userAnswers.value.push({ questionId, selectedOption });
    }
  };

  const calculateMbtiType = (): { type: string; dimensions: MbtiDimension[] } => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    userAnswers.value.forEach(answer => {
      const question = questions.value.find(q => q.id === answer.questionId);
      if (question) {
        const selectedKey = answer.selectedOption === 'a' ? question.keyA : question.keyB;
        scores[selectedKey]++;
      }
    });

    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.S > scores.N ? 'S' : 'N', 
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('');

    const dimensions: MbtiDimension[] = [
      {
        name: 'E vs I',
        preference: scores.E > scores.I ? 'Ekstrovert' : 'Introvert',
        score: Math.round((Math.max(scores.E, scores.I) / (scores.E + scores.I)) * 100)
      },
      {
        name: 'S vs N', 
        preference: scores.S > scores.N ? 'Sensing' : 'Intuition',
        score: Math.round((Math.max(scores.S, scores.N) / (scores.S + scores.N)) * 100)
      },
      {
        name: 'T vs F',
        preference: scores.T > scores.F ? 'Thinking' : 'Feeling', 
        score: Math.round((Math.max(scores.T, scores.F) / (scores.T + scores.F)) * 100)
      },
      {
        name: 'J vs P',
        preference: scores.J > scores.P ? 'Judging' : 'Perceiving',
        score: Math.round((Math.max(scores.J, scores.P) / (scores.J + scores.P)) * 100)
      }
    ];

    return { type, dimensions };
  };

  const fetchQuestions = async (
    generateFunc: () => Promise<MbtiQuestion[]>,
    getDescriptionFunc: (type: string) => Promise<string>
  ) => {
    isLoadingQuestions.value = true;
    errorLoadingQuestions.value = null;
    
    try {
      const newQuestions = await generateFunc();
      questions.value = newQuestions;
      
      // Reset state for new test
      userAnswers.value = [];
      result.value = null;
      testCompleted.value = false;
    } catch (error: any) {
      console.error('Error fetching MBTI questions:', error);
      errorLoadingQuestions.value = error.message || 'Terjadi kesalahan saat memuat pertanyaan.';
    } finally {
      isLoadingQuestions.value = false;
    }
  };

  const completeTest = async (getDescriptionFunc: (type: string) => Promise<string>) => {
    if (!allQuestionsAnswered.value) return;
    
    isCalculatingResult.value = true;
    
    try {
      const { type, dimensions } = calculateMbtiType();
      const description = await getDescriptionFunc(type);
      
      result.value = {
        type,
        description,
        dimensions
      };
      
      testCompleted.value = true;
    } catch (error: any) {
      console.error('Error calculating MBTI result:', error);
      errorLoadingQuestions.value = 'Terjadi kesalahan saat menghitung hasil.';
    } finally {
      isCalculatingResult.value = false;
    }
  };

  return {
    // State
    questions,
    userAnswers,
    result,
    testCompleted,
    isLoadingQuestions,
    isCalculatingResult,
    errorLoadingQuestions,
    
    // Computed
    answeredCount,
    allQuestionsAnswered,
    
    // Methods
    selectAnswer,
    fetchQuestions,
    completeTest: (getDescriptionFunc: (type: string) => Promise<string>) => completeTest(getDescriptionFunc)
  };
};