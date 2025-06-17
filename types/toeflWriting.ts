export interface AIFeedbackCriterion {
  criterion: string;
  score: number; // Score out of 100 for this criterion, or a sub-score
  feedback: string;
  suggestions?: string[];
}

export interface AIToeflIntegratedFeedback {
  overallScore: number; // Overall score, e.g., on a 5-point TOEFL scale or 0-100
  summary: string; // General overview of performance
  taskFulfillment: AIFeedbackCriterion;
  organizationAndDevelopment: AIFeedbackCriterion;
  languageUse: AIFeedbackCriterion; // Grammar, vocabulary, sentence structure
  cohesionAndCoherence: AIFeedbackCriterion;
  readingLectureIntegration: AIFeedbackCriterion; // How well points are connected
}

export interface ToeflIntegratedContent {
  readingPassageTitle: string;
  readingPassageText: string;
  lectureAudioSrc: string; // URL or path to a dummy audio file for now
  lectureTranscript: string;
  writingPrompt: string;
}

// Example of a more detailed scoring breakdown if needed
// export interface AIFeedbackCriterionDetailed {
//   name: string; // e.g., "Grammar", "Vocabulary Usage"
//   score: number; // e.g., 0-30
//   comments: string;
//   examples?: Array<{ good?: string; bad?: string; correction?: string }>;
// }

// export interface AILanguageUseFeedback {
//   criterion: "Language Use";
//   overallScore: number; // e.g., 0-100 for language use
//   feedback: string;
//   grammar: AIFeedbackCriterionDetailed;
//   vocabulary: AIFeedbackCriterionDetailed;
//   sentenceStructure: AIFeedbackCriterionDetailed;
// }

export type IndependentPromptStyle = 
  | "Agree/Disagree"
  | "Preference"
  | "Problem-Solution"
  | "Advantage-Disadvantage"
  | "Describe & Explain";

export interface IndependentWritingPrompt {
  id: string;
  style: IndependentPromptStyle;
  title: string; // A short title for the dropdown
  question: string; // The full prompt text
}

export interface AIToeflIndependentFeedback {
  overallScore: number; // e.g., 0-100 or TOEFL band 0-5
  summary: string;
  taskResponse: AIFeedbackCriterion; // How well the prompt was addressed
  organizationAndDevelopment: AIFeedbackCriterion;
  languageUse: AIFeedbackCriterion; // Grammar, vocabulary, sentence variety
  cohesionAndCoherence: AIFeedbackCriterion;
}

// Structure for localStorage
export interface IndependentWritingDraft {
  selectedPromptId: string;
  essayText: string;
  timestamp: number;
}