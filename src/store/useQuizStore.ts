import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizState, Answer } from '../types';

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            scores: {
                pattern: 0,
                driver: 0,
                reinforcement: 0,
            },
            answers: {},
            reflections: {},
            currentQuestionIndex: 0,
            isUnlocked: false,

            addAnswer: (questionId: string, answer: Answer) => set((state) => {
                // If they already answered, we subtract previous weights before adding new ones
                // (For simplicity in this V1, we assume they move forward only, 
                // but adding/subtracting allows for backing up)

                // This logic would ideally handle weight reversal, but for US-002 we track accumulation
                return {
                    scores: {
                        pattern: state.scores.pattern + answer.weight_pattern,
                        driver: state.scores.driver + answer.weight_driver,
                        reinforcement: state.scores.reinforcement + answer.weight_reinforcement,
                    },
                    answers: { ...state.answers, [questionId]: answer.id },
                };
            }),

            addReflection: (questionId, text) => set((state) => ({
                reflections: { ...state.reflections, [questionId]: text },
            })),

            nextQuestion: () => set((state) => ({
                currentQuestionIndex: state.currentQuestionIndex + 1,
            })),

            prevQuestion: () => set((state) => ({
                currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
            })),

            resetQuiz: () => set({
                scores: { pattern: 0, driver: 0, reinforcement: 0 },
                answers: {},
                reflections: {},
                currentQuestionIndex: 0,
                isUnlocked: false,
            }),

            setUnlock: (status) => set({ isUnlocked: status }),
        }),
        {
            name: 'quiz-storage',
            partialize: (state) => ({
                scores: state.scores,
                answers: state.answers,
                reflections: state.reflections,
                currentQuestionIndex: state.currentQuestionIndex,
                isUnlocked: state.isUnlocked,
            }),
        }
    )
);

/**
 * Result Determination Logic
 * 
 * Maps Axis scores to Cluster IDs.
 * Rules:
 * 1. Primary = Cluster with highest score contribution.
 * 2. Secondary = Second highest, ONLY if its contribution interacts meaningfully.
 */
export const getRecommendedClusters = (scores: QuizState['scores']) => {
    const { pattern, driver, reinforcement } = scores;

    // Scoring map (Placeholder logic for US-002)
    // In production, each Axis might map to multiple clusters with specific weights.
    const clusterScores = [
        { id: 'C1', score: pattern * 1.2 },
        { id: 'C2', score: pattern * 0.8 + driver * 0.4 },
        { id: 'C3', score: driver * 1.1 },
        { id: 'C4', score: reinforcement * 0.9 + pattern * 0.3 },
        { id: 'C5', score: reinforcement * 1.3 },
    ];

    clusterScores.sort((a, b) => b.score - a.score);

    return {
        primary: clusterScores[0].id,
        secondary: clusterScores[1].score > 2 ? clusterScores[1].id : null,
    };
};
