export type Phase = 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5' | 'phase6';

// Phase display names for UI
export const PHASE_NAMES: Record<Phase, string> = {
    phase1: 'Pattern Recognition',
    phase2: 'Core Vulnerability',
    phase3: 'Response Under Threat',
    phase4: 'Deep Dive',
    phase5: 'Contradiction Surface',
    phase6: 'Reflection'
};
export type QuestionType = 'mc' | 'text';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    phase: Phase;
    order_index: number;
    gating_logic: Record<string, any>;
    confidence_modifier: number;
}

export interface Answer {
    id: string;
    question_id: string;
    text: string;
    weight_pattern: number;
    weight_driver: number;
    weight_reinforcement: number;
    flag_set: string[];
}

export interface Cluster {
    id: string; // 'C1', 'C2', etc.
    name_internal: string;
    name_display: string;
    reveal_summary: string;
    early_dive: string;
    mid_dive: string;
    stress_dive: string;
    misreads: string;
    protective_logic: string;
    phrasing_inside: string;
    phrasing_outside: string;
}

export interface Pairing {
    id: string;
    primary_cluster_id: string;
    secondary_cluster_id: string;
    interaction_narrative: string;
    timeline_sequence: string;
    recognition_highlights: string[];
    is_allowed: boolean;
    disallowed_rationale?: string;
}

export interface QuizState {
    scores: {
        pattern: number;
        driver: number;
        reinforcement: number;
    };
    flags: string[]; // Track custom flags set by answers
    answers: Record<string, string>; // questionId -> answerId
    reflections: Record<string, string>; // questionId -> text
    currentQuestionIndex: number;
    isUnlocked: boolean;
    quizSessionId: string;
    showQuiz: boolean;
    showTeaser: boolean;
    setShowTeaser: (show: boolean) => void;
    name?: string; // User's first name for personalization
    primaryArchetype?: string; // Calculated primary pattern archetype


    // Actions
    addAnswer: (questionId: string, answer: Answer) => void;
    addReflection: (questionId: string, text: string) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    startQuiz: () => void;
    resetQuiz: () => void;
    setUnlock: (status: boolean) => void;
    setSessionId: (id: string) => void;
    devSkipToPaywall: () => void;
    devSkipToResults: () => void;
}
