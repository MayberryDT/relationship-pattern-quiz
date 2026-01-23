/**
 * Report Generator Utility Functions
 */

import type { PrimaryArchetype, SecondaryModifier, ReportInputs } from './types';

/**
 * Map internal archetype IDs to display names
 */
export const ARCHETYPE_ID_TO_NAME: Record<string, PrimaryArchetype> = {
    'ANXIOUS_PURSUER': 'The Anxious Pursuer',
    'PROTECTIVE_WITHDRAWER': 'The Protective Withdrawer',
    'DEVOTED_CARETAKER': 'The Devoted Caretaker',
    'CHAOS_MAGNET': 'The Chaos Magnet',
    'INVISIBLE_PARTNER': 'The Invisible Partner',
    'GUARDED_HEART': 'The Guarded Heart'
};

/**
 * Map flag patterns to secondary modifiers
 */
export function deriveSecondaryModifiers(flags: Record<string, boolean | string>): SecondaryModifier[] {
    const modifiers: SecondaryModifier[] = [];
    const flagKeys = Object.keys(flags).filter(k => flags[k] === true);

    // Check for Anxious Pursuit signals
    const anxiousPursuitFlags = ['ma_intense', 'ma_shame', 'ma_spiral_fast', 'd_pursue', 'pw_pursue'];
    const anxiousPursuitCount = flagKeys.filter(f => anxiousPursuitFlags.includes(f)).length;
    if (anxiousPursuitCount >= 2) {
        modifiers.push('Anxious Pursuit');
    }

    // Check for Avoidant Shutdown signals
    const avoidantFlags = ['mb_demands', 'mb_closeness', 'mb_numb', 'mb_incomplete', 'd_withdraw', 'pw_withdraw'];
    const avoidantCount = flagKeys.filter(f => avoidantFlags.includes(f)).length;
    if (avoidantCount >= 2) {
        modifiers.push('Avoidant Shutdown');
    }

    // Check for Caretaker signals
    const caretakerFlags = ['mc_security', 'mc_worth', 'mc_high_resentment', 'mc_identity_dependent', 'p_over_giver', 'r_giver'];
    const caretakerCount = flagKeys.filter(f => caretakerFlags.includes(f)).length;
    if (caretakerCount >= 2) {
        modifiers.push('Over-Functioning / Caretaker');
    }

    // Check for Control/Power sensitivity signals
    const controlFlags = ['md_resist', 'md_essential', 'c_control', 'f_enmesh'];
    const controlCount = flagKeys.filter(f => controlFlags.includes(f)).length;
    if (controlCount >= 2) {
        modifiers.push('Control / Power Sensitivity');
    }

    // Check for Chaos Chemistry signals
    const chaosFlags = ['me_drama_passion', 'me_calm_boring', 'me_days', 'p_intensity', 'a_intensity', 's_bored'];
    const chaosCount = flagKeys.filter(f => chaosFlags.includes(f)).length;
    if (chaosCount >= 2) {
        modifiers.push('Chaos Chemistry');
    }

    // Check for Emotional Starvation signals
    const starvationFlags = ['mf_rarely', 'mf_unknown', 'mf_dont_ask', 'mf_accept', 'f_deprivation', 'ff_invisible', 'b_secondary'];
    const starvationCount = flagKeys.filter(f => starvationFlags.includes(f)).length;
    if (starvationCount >= 2) {
        modifiers.push('Emotional Starvation');
    }

    // Return top 2 modifiers
    return modifiers.slice(0, 2);
}

/**
 * Build report inputs from quiz state
 */
export function buildReportInputs(
    archetypeId: string,
    flags: string[],
    reflections: Record<string, string>,
    topSelections?: string[],
    firstName?: string
): ReportInputs {
    // Convert flags array to record
    const flagsRecord: Record<string, boolean> = {};
    for (const flag of flags) {
        flagsRecord[flag] = true;
    }

    // Get archetype name
    const archetypeName = ARCHETYPE_ID_TO_NAME[archetypeId] || 'The Anxious Pursuer';

    // Derive secondary modifiers
    const modifiers = deriveSecondaryModifiers(flagsRecord);

    // Get reflection text (combine all reflections)
    const reflectionText = Object.values(reflections).filter(r => r.trim()).join(' ');

    return {
        user_first_name: firstName,
        primary_archetype: archetypeName,
        secondary_modifiers: modifiers,
        key_flags: flagsRecord,
        reflection_text: reflectionText || undefined,
        top_selections: topSelections
    };
}

/**
 * Word count utility
 */
export function countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Validate report meets minimum word counts
 */
export function validateReportWordCounts(
    freeReport: string,
    paidReport: string
): { valid: boolean; freeCount: number; paidCount: number; errors: string[] } {
    const freeCount = countWords(freeReport);
    const paidCount = countWords(paidReport);
    const errors: string[] = [];

    if (freeCount < 400) {
        errors.push(`Free report is ${freeCount} words, minimum is 400`);
    }
    if (freeCount > 800) {
        errors.push(`Free report is ${freeCount} words, should be under 700`);
    }
    if (paidCount < 2000) {
        errors.push(`Paid report is ${paidCount} words, minimum is 2000`);
    }

    return {
        valid: errors.length === 0,
        freeCount,
        paidCount,
        errors
    };
}

export default {
    ARCHETYPE_ID_TO_NAME,
    deriveSecondaryModifiers,
    buildReportInputs,
    countWords,
    validateReportWordCounts
};
