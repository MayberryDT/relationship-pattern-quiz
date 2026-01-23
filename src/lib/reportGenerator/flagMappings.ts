/**
 * Flag Mappings
 * Converts quiz flags to human-readable interpretations and derived pattern data
 */

import type {
    CoreFear,
    DistanceResponse,
    ActivationSpeed,
    RepairStyle,
    ConflictStyle,
    AttractionHook,
    EndingTheme,
    DerivedPatternData
} from './types';

// Core fear mappings from f_* flags
export const FEAR_FLAG_MAP: Record<string, CoreFear> = {
    'f_abandon': 'abandonment',
    'f_enmesh': 'engulfment',
    'f_mistrust': 'betrayal',
    'f_deprivation': 'deprivation',
    'f_defective': 'defectiveness'
};

// Distance response mappings from d_* flags
export const DISTANCE_RESPONSE_MAP: Record<string, DistanceResponse> = {
    'd_pursue': 'pursue',
    'd_withdraw': 'withdraw',
    'd_appease': 'appease',
    'd_escalate': 'escalate',
    'd_monitor': 'monitor'
};

// Activation speed mappings from ea_* flags
export const ACTIVATION_SPEED_MAP: Record<string, ActivationSpeed> = {
    'ea_instant': 'instant',
    'ea_fast': 'fast',
    'ea_delayed': 'delayed',
    'ea_suppressed': 'suppressed',
    'ea_regulated': 'regulated'
};

// Repair style mappings from rp_* flags
export const REPAIR_STYLE_MAP: Record<string, RepairStyle> = {
    'rp_process': 'process',
    'rp_avoid': 'avoid',
    'rp_over_apologize': 'over_apologize',
    'rp_passive': 'passive',
    'rp_demonstrate': 'demonstrate'
};

// Conflict style mappings from cn_* flags
export const CONFLICT_STYLE_MAP: Record<string, ConflictStyle> = {
    'cn_resolve': 'resolve',
    'cn_exit': 'exit',
    'cn_agree': 'agree',
    'cn_freeze': 'freeze',
    'cn_fight': 'fight'
};

// Attraction hook mappings from a_* flags
export const ATTRACTION_HOOK_MAP: Record<string, AttractionHook> = {
    'a_unavailable': 'unavailable',
    'a_wounded': 'wounded',
    'a_intensity': 'intensity',
    'a_safe': 'safe',
    'a_mirror': 'mirror'
};

// Ending theme mappings from e_* flags
export const ENDING_THEME_MAP: Record<string, EndingTheme> = {
    'e_betrayal': 'betrayal',
    'e_fizzle': 'fizzle',
    'e_overstayed': 'overstayed',
    'e_too_much': 'too_much',
    'e_fled': 'fled'
};

// Contradiction mappings from ct_* and cv_* flags
export const CONTRADICTION_MAP: Record<string, { type: string; description: string }> = {
    'ct_connect_fear': {
        type: 'connection-fear',
        description: 'You want deep connection, and intimacy terrifies you.'
    },
    'ct_chosen_push': {
        type: 'chosen-push',
        description: 'You want to be chosen, and you push people away before they can choose you.'
    },
    'ct_trust_wait': {
        type: 'trust-vigilance',
        description: 'You want to trust fully, and you are always waiting for betrayal.'
    },
    'ct_stable_bored': {
        type: 'stability-boredom',
        description: 'You want stability, and you get bored without intensity.'
    },
    'ct_loved_hide': {
        type: 'loved-hidden',
        description: 'You want to be loved as you are, and you hide who you really are.'
    },
    'cv_close_distance': {
        type: 'closeness-distance',
        description: 'You want closeness, but you create distance.'
    },
    'cv_peace_conflict': {
        type: 'peace-conflict',
        description: 'You want peace, but you create conflict.'
    },
    'cv_reciprocity_give': {
        type: 'reciprocity-overgiving',
        description: 'You want reciprocity, but you over-give.'
    },
    'cv_leave_stay': {
        type: 'leave-stay',
        description: 'You want to leave, but you stay.'
    },
    'cv_stay_sabotage': {
        type: 'stay-sabotage',
        description: 'You want to stay, but you sabotage.'
    }
};

// Human-readable descriptions for derived values
export const CORE_FEAR_DESCRIPTIONS: Record<CoreFear, string> = {
    'abandonment': 'that they will eventually leave, that love is precarious and must be constantly monitored',
    'engulfment': 'that closeness will consume you, that intimacy means losing yourself',
    'betrayal': 'that trust will be violated, that vulnerability invites harm',
    'deprivation': 'that your needs will never be met, that asking is futile',
    'defectiveness': 'that you are fundamentally flawed and unlovable as you are'
};

export const DISTANCE_RESPONSE_DESCRIPTIONS: Record<DistanceResponse, string> = {
    'pursue': 'moving closer, seeking reassurance, intensifying contact',
    'withdraw': 'pulling back, creating space, retreating behind walls',
    'appease': 'trying to fix whatever might be wrong, taking responsibility',
    'escalate': 'forcing the issue, creating conflict to feel connected',
    'monitor': 'watching and analyzing before acting, gathering data'
};

export const ACTIVATION_SPEED_DESCRIPTIONS: Record<ActivationSpeed, string> = {
    'instant': 'you often go from calm to activated within seconds',
    'fast': 'you try to stay calm but rarely succeed for long',
    'delayed': 'you stew before the full emotional response hits',
    'suppressed': 'you appear calm externally while experiencing internal chaos',
    'regulated': 'you can generally observe and ride the emotional wave'
};

export const REPAIR_STYLE_DESCRIPTIONS: Record<RepairStyle, string> = {
    'process': 'talking it through, needing to understand what happened',
    'avoid': 'pretending it did not happen, moving on without addressing',
    'over_apologize': 'apologizing even for things you did not do',
    'passive': 'waiting for them to come to you, not making the first move',
    'demonstrate': 'showing affection through acts of service and attention'
};

export const CONFLICT_STYLE_DESCRIPTIONS: Record<ConflictStyle, string> = {
    'resolve': 'pushing to resolve immediately, unable to rest with things unfinished',
    'exit': 'needing to leave the room, requiring space before responding',
    'agree': 'agreeing to end the fight even when you do not mean it',
    'freeze': 'shutting down, going blank, unable to access thoughts',
    'fight': 'digging in, not stopping until you are heard'
};

export const ATTRACTION_HOOK_DESCRIPTIONS: Record<AttractionHook, string> = {
    'unavailable': 'someone hard to read, slightly out of reach, who does not fully commit',
    'wounded': 'someone complicated, needing understanding, who you want to help',
    'intensity': 'immediate strong chemistry, electric connection, passion from the start',
    'safe': 'someone stable and predictable, the opposite of past chaos',
    'mirror': 'someone familiar, alike in ways that feel almost uncanny'
};

export const ENDING_THEME_DESCRIPTIONS: Record<EndingTheme, string> = {
    'betrayal': 'broken trust, lies, or infidelity',
    'fizzle': 'passion dying without either person fighting for it',
    'overstayed': 'staying too long even when you knew it was not right',
    'too_much': 'being told you were too intense, too emotional, too needy',
    'fled': 'leaving because you felt suffocated, controlled, or bored'
};

// Flag to human-readable "tell" mappings for Specific Tells section
export const FLAG_TELLS: Record<string, string> = {
    // Pattern recognition flags
    'p_over_giver': 'You tend to give more than you receive, sometimes at your own expense',
    'p_abandonment': 'You often sense when someone might be pulling away, sometimes before it happens',
    'p_avoidant': 'You can feel trapped or suffocated when things get too serious',
    'p_selection': 'You notice a pattern of choosing partners who cannot fully meet you',
    'p_intensity': 'Your relationships often start with intense passion that eventually burns out',

    // Ending flags
    'e_too_much': 'You have been told you are "too much" in ways that felt unfair',
    'e_fled': 'You have left relationships because you felt controlled or suffocated',
    'e_fizzle': 'Your relationships have ended not with a bang but with a slow fade',
    'e_betrayal': 'You carry the weight of trust that was broken',
    'e_overstayed': 'You have stayed in relationships longer than you should have',

    // Attraction flags
    'a_unavailable': 'You are often drawn to people who seem slightly out of reach',
    'a_wounded': 'You tend to be attracted to people who seem like they need understanding',
    'a_intensity': 'Strong chemistry hooks you quickly, sometimes overriding red flags',
    'a_safe': 'You have been drawn to partners who offer stability after chaos',
    'a_mirror': 'You often find yourself with partners who mirror something familiar',

    // Role flags
    'r_giver': 'In relationships, you are usually the one who gives more',
    'r_distancer': 'You often create emotional distance, even when you do not want to',
    'r_pursuer': 'You tend to be the one chasing closeness and connection',
    'r_watcher': 'You are often hyperaware of shifts in mood or distance',
    'r_peacekeeper': 'You absorb tension so others do not have to deal with it',

    // Fear flags
    'f_abandon': 'You carry a deep fear that people you love will eventually leave',
    'f_mistrust': 'Trusting fully feels dangerous, like an invitation to be hurt',
    'f_enmesh': 'Closeness sometimes feels like a threat to your independence',
    'f_defective': 'A part of you worries you are not worth staying for',
    'f_deprivation': 'You have learned not to expect your emotional needs to be met',

    // Thought pattern flags
    't_pursuit': 'When uncertain, your instinct is to pursue reassurance',
    't_cynicism': 'You often expect the worst, bracing for disappointment',
    't_preempt': 'Sometimes you create distance before they can',
    't_selfblame': 'When things go wrong, you assume it was your fault',
    't_flight': 'Under pressure, your instinct is to leave',

    // Closeness threat flags
    'c_dependency': 'Needing someone feels dangerous, like it gives them power over you',
    'c_control': 'You are sensitive to feeling controlled or monitored',
    'c_exposure': 'Being truly seen feels risky, like you might be rejected',
    'c_inadequacy': 'You worry that even giving everything will not be enough',
    'c_loss': 'The possibility of losing someone you love feels unbearable',

    // Belief flags
    'b_earned': 'You believe love must be earned through effort or usefulness',
    'b_hidden': 'You hide parts of yourself, fearing they would drive people away',
    'b_danger': 'You have learned that people who get close eventually hurt you',
    'b_toomuch': 'You sometimes feel your feelings are too intense to share',
    'b_secondary': 'You have felt like an afterthought in relationships',

    // Familiar feeling flags
    'ff_vigilance': 'Constant scanning for signs of trouble feels familiar',
    'ff_lonely': 'Loneliness, even within relationships, is a familiar feeling',
    'ff_depleted': 'The exhaustion of giving without receiving is something you know well',
    'ff_dread': 'Waiting for the other shoe to drop is a chronic experience',
    'ff_invisible': 'Feeling unseen or unimportant in relationships is familiar',

    // Stability response flags
    's_relief': 'Stability brings you genuine relief and safety',
    's_suspicious': 'When things are going well, you wait for something to go wrong',
    's_bored': 'Stability can feel boring, like something important is missing',
    's_trapped': 'Security sometimes feels like losing your freedom',
    's_testing': 'You test relationships to see if the good will last',

    // Distance response flags (d_*)
    'd_pursue': 'When distance opens, you move closer to close it',
    'd_withdraw': 'When tension builds, you pull back to protect yourself',
    'd_appease': 'Your instinct is to fix whatever might be wrong',
    'd_escalate': 'You sometimes force issues through intensity or confrontation',
    'd_monitor': 'You watch and analyze before deciding how to respond',

    // Pursue/withdraw pattern flags
    'pw_pursue': 'Under stress, you pursue connection rather than space',
    'pw_withdraw': 'Under stress, you need distance to feel safe',
    'pw_mixed': 'Your response shifts between pursuing and withdrawing',
    'pw_frozen': 'Sometimes you can do neither, and you simply shut down',

    // Emotional activation flags
    'ea_instant': 'Your emotions can go from calm to activated in seconds',
    'ea_fast': 'You try to stay calm but often activated quickly',
    'ea_delayed': 'Your emotional response often comes after a delay',
    'ea_suppressed': 'You appear calm while chaos happens internally',
    'ea_regulated': 'You can generally observe your emotions without being overtaken',

    // Module-specific flags
    'ma_intense': 'Your pursuit of connection can become quite intense',
    'ma_shame': 'The pursuit sometimes costs you self-respect',
    'ma_spiral_fast': 'You can spiral from a delayed text to "this is over" very quickly',

    'mb_demands': 'Emotional demands trigger your need to withdraw',
    'mb_closeness': 'Too much intimacy itself feels suffocating',
    'mb_numb': 'When you withdraw, you sometimes feel nothing at all',
    'mb_incomplete': 'After withdrawing, you often do not fully come back',

    'mc_security': 'Being useful feels like the most reliable way to be wanted',
    'mc_worth': 'Your sense of value is tied to what you do for others',
    'mc_high_resentment': 'You carry resentment about the imbalance in giving',
    'mc_identity_dependent': 'Without caretaking, you would not know who you are',

    'md_resist': 'You push back hard against any perceived attempt to control you',
    'md_essential': 'Maintaining independence feels essential, even at cost to partnership',

    'me_drama_passion': 'Conflict and drama feel connected to passion for you',
    'me_calm_boring': 'A genuinely stable relationship feels boring',
    'me_days': 'After a few days of calm, you feel the urge to shake things up',
    'me_origin_trauma': 'Your attraction to intensity has roots in earlier experiences',

    'mf_rarely': 'Your emotional needs have rarely been genuinely met',
    'mf_unknown': 'You are sometimes not even sure what your needs are',
    'mf_dont_ask': 'You have learned not to ask because asking felt futile',
    'mf_accept': 'You have come to accept ongoing unmet needs as normal'
};

/**
 * Derive pattern data from flags
 */
export function derivePatternData(flags: Record<string, boolean | string>): DerivedPatternData {
    const flagKeys = Object.keys(flags).filter(k => flags[k] === true);

    // Helper to find first matching flag
    const findMatch = <T>(map: Record<string, T>, defaultValue: T): T => {
        for (const key of flagKeys) {
            if (map[key]) return map[key];
        }
        return defaultValue;
    };

    // Find contradiction
    let contradiction_type = '';
    let contradiction_value = '';
    for (const key of flagKeys) {
        if (CONTRADICTION_MAP[key]) {
            contradiction_type = CONTRADICTION_MAP[key].type;
            contradiction_value = CONTRADICTION_MAP[key].description;
            break;
        }
    }

    // Determine awareness level
    let awareness_level: 'high' | 'moderate' | 'emerging' | 'low' = 'moderate';
    if (flags['aw_high']) awareness_level = 'high';
    if (flags['aw_moderate']) awareness_level = 'moderate';
    if (flags['aw_emerging']) awareness_level = 'emerging';
    if (flags['aw_low']) awareness_level = 'low';

    // Determine loop awareness
    let loop_awareness: 'high' | 'moderate' | 'low' = 'moderate';
    if (flags['la_high']) loop_awareness = 'high';
    if (flags['la_moderate']) loop_awareness = 'moderate';
    if (flags['la_low']) loop_awareness = 'low';

    return {
        core_fear: findMatch(FEAR_FLAG_MAP, 'abandonment'),
        distance_response: findMatch(DISTANCE_RESPONSE_MAP, 'pursue'),
        activation_speed: findMatch(ACTIVATION_SPEED_MAP, 'fast'),
        repair_style: findMatch(REPAIR_STYLE_MAP, 'process'),
        conflict_style: findMatch(CONFLICT_STYLE_MAP, 'resolve'),
        attraction_hook: findMatch(ATTRACTION_HOOK_MAP, 'unavailable'),
        ending_theme: findMatch(ENDING_THEME_MAP, 'fizzle'),
        contradiction_type,
        contradiction_value,
        awareness_level,
        loop_awareness
    };
}

/**
 * Get specific tells from flags
 */
export function getTellsFromFlags(flags: Record<string, boolean | string>, maxTells: number = 8): string[] {
    const tells: string[] = [];
    const flagKeys = Object.keys(flags).filter(k => flags[k] === true);

    for (const key of flagKeys) {
        if (FLAG_TELLS[key] && tells.length < maxTells) {
            tells.push(FLAG_TELLS[key]);
        }
    }

    return tells;
}

export default {
    FEAR_FLAG_MAP,
    DISTANCE_RESPONSE_MAP,
    ACTIVATION_SPEED_MAP,
    REPAIR_STYLE_MAP,
    CONFLICT_STYLE_MAP,
    ATTRACTION_HOOK_MAP,
    ENDING_THEME_MAP,
    CONTRADICTION_MAP,
    CORE_FEAR_DESCRIPTIONS,
    FLAG_TELLS,
    derivePatternData,
    getTellsFromFlags
};
