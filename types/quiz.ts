export interface Choice {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  explanation: string;
}

export interface QuizResult {
  questionId: number;
  selectedLabel: string | null;
  isCorrect: boolean;
}