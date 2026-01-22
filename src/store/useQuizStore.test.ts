import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizStore, getRecommendedClusters } from './useQuizStore';

describe('QuizStore Logic', () => {
    beforeEach(() => {
        useQuizStore.getState().resetQuiz();
    });

    it('accumulates scores correctly', () => {
        const store = useQuizStore.getState();
        const mockAnswer = {
            id: 'a1',
            question_id: 'q1',
            text: 'Test',
            weight_pattern: 1.5,
            weight_driver: 0.5,
            weight_reinforcement: 0
        };

        store.addAnswer('q1', mockAnswer);

        const updated = useQuizStore.getState();
        expect(updated.scores.pattern).toBe(1.5);
        expect(updated.scores.driver).toBe(0.5);
        expect(updated.answers['q1']).toBe('a1');
    });

    it('calculates recommendations based on scores', () => {
        const scores = {
            pattern: 5.0,
            driver: 1.0,
            reinforcement: 0.5
        };

        const results = getRecommendedClusters(scores);

        // C1 is heavily weighted towards pattern (1.2x)
        expect(results.primary).toBe('C1');
    });

    it('determines secondary cluster if threshold met', () => {
        const scores = {
            pattern: 2.0,
            driver: 3.0,
            reinforcement: 0.5
        };

        const results = getRecommendedClusters(scores);

        // C3 is driver * 1.1 (3.3)
        // C2 is pattern * 0.8 + driver * 0.4 (1.6 + 1.2 = 2.8)
        expect(results.primary).toBe('C3');
        expect(results.secondary).toBe('C2');
    });
});
