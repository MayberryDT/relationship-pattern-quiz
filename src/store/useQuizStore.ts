import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizState, Answer } from '../types';
import { generateUUID } from '../lib/id';

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            scores: {
                pattern: 0,
                driver: 0,
                reinforcement: 0,
            },
            flags: [],
            answers: {},
            reflections: {},
            currentQuestionIndex: 0,
            isUnlocked: false,
            quizSessionId: generateUUID(),
            showQuiz: false,
            showTeaser: false,


            addAnswer: (questionId: string, answer: Answer) => set((state) => {
                const newFlags = [...state.flags];
                if (answer.flag_set) {
                    answer.flag_set.forEach(flag => {
                        if (!newFlags.includes(flag)) {
                            newFlags.push(flag);
                        }
                    });
                }

                return {
                    scores: {
                        pattern: state.scores.pattern + answer.weight_pattern,
                        driver: state.scores.driver + answer.weight_driver,
                        reinforcement: state.scores.reinforcement + answer.weight_reinforcement,
                    },
                    flags: newFlags,
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

            startQuiz: () => set({
                showQuiz: true,
                currentQuestionIndex: 0
            }),

            resetQuiz: () => set({
                scores: { pattern: 0, driver: 0, reinforcement: 0 },
                flags: [],
                answers: {},
                reflections: {},
                currentQuestionIndex: 0,
                isUnlocked: false,
                quizSessionId: generateUUID(),
                showQuiz: false,
                showTeaser: false,
            }),

            setUnlock: (status) => set({ isUnlocked: status }),
            setSessionId: (id) => set({ quizSessionId: id }),
            setShowTeaser: (show) => set({ showTeaser: show }),

            // Dev methods with comprehensive mock data for testing
            devSkipToPaywall: () => set({
                currentQuestionIndex: 999,
                flags: [
                    'p_abandonment', 'e_too_much', 'f_abandon', 'd_pursue',
                    'a_unavailable', 'r_pursuer', 't_pursuit', 'c_dependency',
                    'ff_dread', 'pw_pursue', 's_suspicious', 'ma_intense'
                ],
                answers: {
                    'q1': 'a1_anxious',
                    'q2': 'a2_pursue',
                    'q3': 'a3_fear',
                    'q4': 'a4_unavailable',
                    'q5': 'a5_intense'
                },
                reflections: {
                    'reflection_1': 'I always seem to fall for people who keep me at arm\'s length. The more distant they become, the more desperate I feel to close the gap.'
                },
                scores: { pattern: 15, driver: 12, reinforcement: 8 },
                isUnlocked: false,
                name: 'Alex',
                primaryArchetype: 'The Anxious Pursuer',
            }),

            devSkipToResults: () => set({
                currentQuestionIndex: 999,
                flags: [
                    'p_abandonment', 'e_too_much', 'f_abandon', 'd_pursue',
                    'a_unavailable', 'r_pursuer', 't_pursuit', 'c_dependency',
                    'ff_dread', 'pw_pursue', 's_suspicious', 'ma_intense',
                    'ma_shame', 'ct_chosen_push', 'b_toomuch'
                ],
                answers: {
                    'pattern_recognition': 'anxious_pursuit',
                    'ending_theme': 'too_much',
                    'attraction_pattern': 'unavailable',
                    'role_in_relationship': 'pursuer',
                    'fear_response': 'abandonment',
                    'threat_response': 'pursue_harder',
                    'core_fear': 'being_left',
                    'belief_about_love': 'too_much_for_people',
                    'familiar_feeling': 'dread_of_loss',
                    'distance_response': 'panic_and_pursue',
                    'stability_response': 'suspicious_testing',
                    'intensity_need': 'very_high',
                    'shame_after_pursuit': 'yes',
                    'contradiction': 'want_chosen_but_push_away'
                },
                reflections: {
                    'reflection_main': 'I know I can be too much. I feel it happening: the texts, the checking, the need for reassurance; and I can\'t stop. It\'s like watching myself drive someone away in slow motion.',
                    'reflection_origin': 'My father left when I was seven. No warning, no explanation. I think part of me is still that kid, waiting for everyone to leave.'
                },
                scores: { pattern: 18, driver: 14, reinforcement: 10 },
                isUnlocked: true,
                name: 'Alex',
                primaryArchetype: 'The Anxious Pursuer',
            }),

        }),
        {
            name: 'quiz-storage',
            partialize: (state) => ({
                scores: state.scores,
                flags: state.flags,
                answers: state.answers,
                reflections: state.reflections,
                currentQuestionIndex: state.currentQuestionIndex,
                isUnlocked: state.isUnlocked,
                quizSessionId: state.quizSessionId,
                showQuiz: state.showQuiz,
                showTeaser: state.showTeaser,
            }),
        }
    )
);

/**
 * Pattern Archetype Scoring Engine
 * Based on quiz_design.md - Cold Traffic V1
 * 
 * 6 Primary Pattern Archetypes:
 * 1. The Anxious Pursuer - Core Fear: Abandonment
 * 2. The Protective Withdrawer - Core Fear: Engulfment  
 * 3. The Devoted Caretaker - Core Fear: Being unneeded
 * 4. The Chaos Magnet - Core Fear: Boredom = Rejection
 * 5. The Invisible Partner - Core Fear: Deprivation
 * 6. The Guarded Heart - Core Fear: Betrayal
 */

export interface PatternArchetype {
    id: string;
    name: string;
    coreFear: string;
    loopSignature: string;
}

export const ARCHETYPES: Record<string, PatternArchetype> = {
    ANXIOUS_PURSUER: {
        id: 'ANXIOUS_PURSUER',
        name: 'The Anxious Pursuer',
        coreFear: 'Abandonment',
        loopSignature: 'Seek → Distance → Panic → Over-pursue → Confirm fear'
    },
    PROTECTIVE_WITHDRAWER: {
        id: 'PROTECTIVE_WITHDRAWER',
        name: 'The Protective Withdrawer',
        coreFear: 'Engulfment',
        loopSignature: 'Closeness → Overwhelm → Withdraw → Partner pursues → Confirm threat'
    },
    DEVOTED_CARETAKER: {
        id: 'DEVOTED_CARETAKER',
        name: 'The Devoted Caretaker',
        coreFear: 'Being unneeded',
        loopSignature: 'Give → Deplete → Resent → Invisible → Give harder'
    },
    CHAOS_MAGNET: {
        id: 'CHAOS_MAGNET',
        name: 'The Chaos Magnet',
        coreFear: 'Boredom = Rejection',
        loopSignature: 'Intensity → Calm → Create drama → Rupture → Seek intensity'
    },
    INVISIBLE_PARTNER: {
        id: 'INVISIBLE_PARTNER',
        name: 'The Invisible Partner',
        coreFear: 'Deprivation',
        loopSignature: 'Need → Suppress → Hint → Unmet → Confirm invisibility'
    },
    GUARDED_HEART: {
        id: 'GUARDED_HEART',
        name: 'The Guarded Heart',
        coreFear: 'Betrayal',
        loopSignature: 'Trust → Vulnerability → Hypervigilance → Wall → Confirm distrust'
    }
};

// Flag to Archetype weight mappings
// Each flag contributes weight to one or more archetypes
const FLAG_WEIGHTS: Record<string, Partial<Record<string, number>>> = {
    // Phase 1 - Pattern Recognition
    p_over_giver: { DEVOTED_CARETAKER: 2.0, INVISIBLE_PARTNER: 0.5 },
    p_abandonment: { ANXIOUS_PURSUER: 2.0, GUARDED_HEART: 0.5 },
    p_avoidant: { PROTECTIVE_WITHDRAWER: 2.0 },
    p_selection: { CHAOS_MAGNET: 1.0, ANXIOUS_PURSUER: 0.5 },
    p_intensity: { CHAOS_MAGNET: 2.0 },

    e_too_much: { ANXIOUS_PURSUER: 1.5 },
    e_fled: { PROTECTIVE_WITHDRAWER: 1.5 },
    e_fizzle: { INVISIBLE_PARTNER: 1.0, PROTECTIVE_WITHDRAWER: 0.5 },
    e_betrayal: { GUARDED_HEART: 2.0 },
    e_overstayed: { DEVOTED_CARETAKER: 1.5, INVISIBLE_PARTNER: 0.5 },

    a_unavailable: { ANXIOUS_PURSUER: 1.0, CHAOS_MAGNET: 0.5 },
    a_wounded: { DEVOTED_CARETAKER: 1.5 },
    a_intensity: { CHAOS_MAGNET: 1.5 },
    a_safe: { INVISIBLE_PARTNER: 0.5 },
    a_mirror: { GUARDED_HEART: 0.5 },

    r_giver: { DEVOTED_CARETAKER: 1.5 },
    r_distancer: { PROTECTIVE_WITHDRAWER: 1.5 },
    r_pursuer: { ANXIOUS_PURSUER: 1.5 },
    r_watcher: { GUARDED_HEART: 1.0, ANXIOUS_PURSUER: 0.5 },
    r_peacekeeper: { DEVOTED_CARETAKER: 1.0, INVISIBLE_PARTNER: 0.5 },

    // Phase 2 - Core Vulnerability
    f_abandon: { ANXIOUS_PURSUER: 2.5 },
    f_mistrust: { GUARDED_HEART: 2.0 },
    f_enmesh: { PROTECTIVE_WITHDRAWER: 2.5 },
    f_defective: { ANXIOUS_PURSUER: 1.0, INVISIBLE_PARTNER: 1.0 },
    f_deprivation: { INVISIBLE_PARTNER: 2.5 },

    t_pursuit: { ANXIOUS_PURSUER: 1.5 },
    t_cynicism: { GUARDED_HEART: 1.5 },
    t_preempt: { PROTECTIVE_WITHDRAWER: 1.5 },
    t_selfblame: { DEVOTED_CARETAKER: 1.0, ANXIOUS_PURSUER: 0.5 },
    t_flight: { PROTECTIVE_WITHDRAWER: 1.0 },

    c_dependency: { ANXIOUS_PURSUER: 1.5 },
    c_control: { PROTECTIVE_WITHDRAWER: 1.5, GUARDED_HEART: 0.5 },
    c_exposure: { INVISIBLE_PARTNER: 1.0, GUARDED_HEART: 0.5 },
    c_inadequacy: { DEVOTED_CARETAKER: 1.5, INVISIBLE_PARTNER: 0.5 },
    c_loss: { ANXIOUS_PURSUER: 1.0 },

    b_earned: { DEVOTED_CARETAKER: 1.5 },
    b_hidden: { INVISIBLE_PARTNER: 1.5, GUARDED_HEART: 0.5 },
    b_danger: { GUARDED_HEART: 2.0 },
    b_toomuch: { ANXIOUS_PURSUER: 1.0 },
    b_secondary: { INVISIBLE_PARTNER: 2.0 },

    ff_vigilance: { GUARDED_HEART: 1.5, ANXIOUS_PURSUER: 0.5 },
    ff_lonely: { INVISIBLE_PARTNER: 1.5 },
    ff_depleted: { DEVOTED_CARETAKER: 2.0 },
    ff_dread: { ANXIOUS_PURSUER: 1.0, GUARDED_HEART: 0.5 },
    ff_invisible: { INVISIBLE_PARTNER: 2.0 },

    // Phase 3 - Response Under Threat
    d_pursue: { ANXIOUS_PURSUER: 2.0 },
    d_withdraw: { PROTECTIVE_WITHDRAWER: 2.0 },
    d_appease: { DEVOTED_CARETAKER: 1.5 },
    d_escalate: { CHAOS_MAGNET: 1.5 },
    d_monitor: { GUARDED_HEART: 1.0 },

    pw_pursue: { ANXIOUS_PURSUER: 2.0 },
    pw_withdraw: { PROTECTIVE_WITHDRAWER: 2.0 },
    pw_mixed: { CHAOS_MAGNET: 0.5 },
    pw_frozen: { INVISIBLE_PARTNER: 1.0 },

    s_relief: { /* no strong signal */ },
    s_suspicious: { GUARDED_HEART: 1.0, ANXIOUS_PURSUER: 0.5 },
    s_bored: { CHAOS_MAGNET: 2.0 },
    s_trapped: { PROTECTIVE_WITHDRAWER: 1.5 },
    s_testing: { ANXIOUS_PURSUER: 1.0 },

    // Phase 4 Module flags (deep dive confirmations)
    ma_intense: { ANXIOUS_PURSUER: 2.0 },
    ma_shame: { ANXIOUS_PURSUER: 1.5 },
    ma_spiral_fast: { ANXIOUS_PURSUER: 1.5 },

    mb_demands: { PROTECTIVE_WITHDRAWER: 1.5 },
    mb_closeness: { PROTECTIVE_WITHDRAWER: 2.0 },
    mb_numb: { PROTECTIVE_WITHDRAWER: 1.5 },
    mb_incomplete: { PROTECTIVE_WITHDRAWER: 1.5 },

    mc_security: { DEVOTED_CARETAKER: 2.0 },
    mc_worth: { DEVOTED_CARETAKER: 1.5 },
    mc_high_resentment: { DEVOTED_CARETAKER: 1.5 },
    mc_identity_dependent: { DEVOTED_CARETAKER: 2.0 },

    md_resist: { PROTECTIVE_WITHDRAWER: 1.0, GUARDED_HEART: 0.5 },
    md_essential: { PROTECTIVE_WITHDRAWER: 1.5 },

    me_drama_passion: { CHAOS_MAGNET: 2.0 },
    me_calm_boring: { CHAOS_MAGNET: 2.0 },
    me_days: { CHAOS_MAGNET: 1.5 },
    me_origin_trauma: { CHAOS_MAGNET: 1.0, GUARDED_HEART: 0.5 },

    mf_rarely: { INVISIBLE_PARTNER: 1.5 },
    mf_unknown: { INVISIBLE_PARTNER: 1.5 },
    mf_dont_ask: { INVISIBLE_PARTNER: 2.0 },
    mf_accept: { INVISIBLE_PARTNER: 1.5 },

    // Phase 5 - Contradictions
    ct_connect_fear: { PROTECTIVE_WITHDRAWER: 1.0, ANXIOUS_PURSUER: 0.5 },
    ct_chosen_push: { ANXIOUS_PURSUER: 1.0, PROTECTIVE_WITHDRAWER: 0.5 },
    ct_trust_wait: { GUARDED_HEART: 1.5 },
    ct_stable_bored: { CHAOS_MAGNET: 1.5 },
    ct_loved_hide: { INVISIBLE_PARTNER: 1.0, GUARDED_HEART: 0.5 },

    cv_close_distance: { PROTECTIVE_WITHDRAWER: 1.5 },
    cv_peace_conflict: { CHAOS_MAGNET: 1.5 },
    cv_reciprocity_give: { DEVOTED_CARETAKER: 1.5 },
    cv_leave_stay: { ANXIOUS_PURSUER: 1.0, DEVOTED_CARETAKER: 0.5 },
    cv_stay_sabotage: { CHAOS_MAGNET: 1.0, PROTECTIVE_WITHDRAWER: 0.5 },
};

export interface ArchetypeResult {
    primary: PatternArchetype;
    secondary: PatternArchetype | null;
    scores: Record<string, number>;
    dominantFlags: string[];
}

/**
 * Calculate archetype scores from accumulated flags
 */
export const getPatternArchetype = (flags: string[]): ArchetypeResult => {
    // Initialize scores for all archetypes
    const scores: Record<string, number> = {
        ANXIOUS_PURSUER: 0,
        PROTECTIVE_WITHDRAWER: 0,
        DEVOTED_CARETAKER: 0,
        CHAOS_MAGNET: 0,
        INVISIBLE_PARTNER: 0,
        GUARDED_HEART: 0,
    };

    // Calculate scores based on flags
    for (const flag of flags) {
        const weights = FLAG_WEIGHTS[flag];
        if (weights) {
            for (const [archetype, weight] of Object.entries(weights)) {
                if (weight !== undefined) {
                    scores[archetype] += weight;
                }
            }
        }
    }

    // Sort archetypes by score
    const sortedArchetypes = Object.entries(scores)
        .sort(([, a], [, b]) => b - a);

    const primaryId = sortedArchetypes[0][0];
    const primaryScore = sortedArchetypes[0][1];
    const secondaryId = sortedArchetypes[1][0];
    const secondaryScore = sortedArchetypes[1][1];

    // Secondary only counts if it's at least 40% of primary score
    const hasSecondary = secondaryScore >= primaryScore * 0.4 && secondaryScore > 3;

    // Get dominant flags (flags that contributed to primary archetype)
    const dominantFlags = flags.filter(flag => {
        const weights = FLAG_WEIGHTS[flag];
        return weights && weights[primaryId];
    });

    return {
        primary: ARCHETYPES[primaryId],
        secondary: hasSecondary ? ARCHETYPES[secondaryId] : null,
        scores,
        dominantFlags,
    };
};

/**
 * Legacy function for backward compatibility
 * Maps to cluster IDs for existing report system
 */
export const getRecommendedClusters = (scores: QuizState['scores'], flags: string[] = []) => {
    // If we have flags, use the new archetype system
    if (flags.length > 0) {
        const result = getPatternArchetype(flags);

        // Map archetype IDs to cluster IDs for backward compatibility
        const archetypeToCluster: Record<string, string> = {
            ANXIOUS_PURSUER: 'C1',
            PROTECTIVE_WITHDRAWER: 'C2',
            DEVOTED_CARETAKER: 'C3',
            CHAOS_MAGNET: 'C4',
            INVISIBLE_PARTNER: 'C5',
            GUARDED_HEART: 'C6',
        };

        return {
            primary: archetypeToCluster[result.primary.id],
            secondary: result.secondary ? archetypeToCluster[result.secondary.id] : null,
            archetype: result,
        };
    }

    // Fallback to old axis-based scoring if no flags
    const { pattern, driver, reinforcement } = scores;
    const clusterScores = [
        { id: 'C1', score: pattern * 1.2 },
        { id: 'C2', score: driver * 1.1 },
        { id: 'C3', score: pattern * 0.8 + reinforcement * 0.4 },
        { id: 'C4', score: driver * 1.3 },
        { id: 'C5', score: reinforcement * 1.2 },
        { id: 'C6', score: reinforcement * 0.9 + driver * 0.3 },
    ];

    clusterScores.sort((a, b) => b.score - a.score);

    return {
        primary: clusterScores[0].id,
        secondary: clusterScores[1].score > 2 ? clusterScores[1].id : null,
        archetype: null,
    };
};

