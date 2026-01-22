export type Phase = 'early' | 'mid' | 'late';
export type QuestionType = 'mc' | 'text';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    phase: Phase;
    order_index: number;
}

export interface Answer {
    id: string;
    question_id: string;
    text: string;
    weight_pattern: number;
    weight_driver: number;
    weight_reinforcement: number;
}

export interface Cluster {
    id: string; // Internal UUID
    cluster_id: string; // C1, C2, C3, C4, C5
    title: string;
    content_markdown: string;
    type: 'primary' | 'secondary';
}

export interface QuizState {
    scores: {
        pattern: number;
        driver: number;
        reinforcement: number;
    };
    answers: Record<string, string>; // questionId -> answerId
    reflections: Record<string, string>; // questionId -> text
    currentQuestionIndex: number;
    isUnlocked: boolean;

    // Actions
    addAnswer: (questionId: string, answer: Answer) => void;
    addReflection: (questionId: string, text: string) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    resetQuiz: () => void;
    setUnlock: (status: boolean) => void;
}
