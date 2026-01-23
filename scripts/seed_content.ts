import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 6 Pattern Archetypes from quiz_design.md
 * Aligned with the scoring engine in useQuizStore.ts
 */
const clusters = [
    {
        id: 'C1',
        name_internal: 'ANXIOUS_PURSUER',
        name_display: 'The Anxious Pursuer',
        reveal_summary: 'You move toward connection with an urgency that often accelerates the very distance you fear.',
        early_dive: 'Early on, you are magnetic and fully present: the kind of partner who notices everything and responds with extraordinary attunement. Your attention feels like a gift. You remember details others forget. You prioritize the relationship above all else.',
        mid_dive: 'As the relationship settles, your need for reassurance intensifies. A delayed text becomes a story. A quiet evening becomes withdrawal. Your partner\'s regularity feels like distance, and you find yourself working harder to bridge a gap that may not exist.',
        stress_dive: 'Under stress, your pursuit accelerates. You reach out more, analyze more, need more. The very efforts you make to secure connection often create the space your partner needs to breathe: which you experience as confirmation of your worst fears.',
        misreads: 'You often misread a partner\'s need for solitude as rejection. Silence feels like punishment. Calm feels like disconnection. You conflate intensity with love, and its absence feels like abandonment in slow motion.',
        protective_logic: 'Your pursuit protects you from sitting with the unbearable uncertainty of not knowing where you stand. Movement feels safer than stillness. Seeking feels safer than waiting.',
        phrasing_inside: 'If I can just get close enough, I\'ll finally feel safe.',
        phrasing_outside: 'I love you, but I need to breathe. Your need for closeness is suffocating me.'
    },
    {
        id: 'C2',
        name_internal: 'PROTECTIVE_WITHDRAWER',
        name_display: 'The Protective Withdrawer',
        reveal_summary: 'You create distance not because you don\'t want connection, but because closeness activates an ancient alarm system designed to protect your autonomy.',
        early_dive: 'Early on, you are intriguing: confident, self-contained, emotionally self-sufficient. You draw people in precisely because you don\'t seem to need them. There\'s a mystery about you that feels like depth.',
        mid_dive: 'As intimacy deepens, something in you starts to pull back. You may not even notice it at first: a slight preference for alone time, a subtle resistance to plans, a creeping sense of being "crowded" even when your partner is reasonable.',
        stress_dive: 'Under pressure, you retreat behind walls that feel like self-preservation. You shut down, go silent, or physically disappear. From the inside, this feels like survival. From the outside, it looks like abandonment.',
        misreads: 'You misread requests for closeness as demands. You experience your partner\'s emotional needs as overwhelming, even when they are normal. You conflate vulnerability with weakness and distance with strength.',
        protective_logic: 'Withdrawal protects you from being engulfed, controlled, or losing yourself in someone else\'s emotional landscape. Your walls were necessary once. Now they may be keeping out what you need most.',
        phrasing_inside: 'If I let them in, I\'ll disappear.',
        phrasing_outside: 'I never know when you\'re going to shut me out. It feels like loving a ghost.'
    },
    {
        id: 'C3',
        name_internal: 'DEVOTED_CARETAKER',
        name_display: 'The Devoted Caretaker',
        reveal_summary: 'You give until you\'re empty, then wonder why you feel invisible. Your devotion is real: but it may be obscuring a deeper need to be seen without having to earn it.',
        early_dive: 'Early on, you are the dream partner: attentive, generous, anticipating needs before they\'re spoken. You create a cocoon of care that feels like perfect love. You are the one who remembers, who plans, who shows up.',
        mid_dive: 'Over time, the giving becomes compulsive. You struggle to receive. You feel guilty resting. Your partner may not even notice how much you do: because you\'ve trained them to expect it. Resentment builds like sediment.',
        stress_dive: 'When stressed, you give harder. You interpret your exhaustion as evidence that you\'re not doing enough. You suppress your own needs so completely that you lose access to them. Then you wonder why you feel unseen.',
        misreads: 'You misread your own needs as burdens. You interpret receiving as weakness. You conflate usefulness with worthiness and confuse being needed with being loved.',
        protective_logic: 'Caretaking protects you from the terror of being unnecessary. If you\'re useful, you have a reason to exist in the relationship. If you stop, you fear you\'ll become invisible: or worse, disposable.',
        phrasing_inside: 'If I just give enough, they\'ll finally see me.',
        phrasing_outside: 'You do so much for me, but I never asked for it. I don\'t know what you actually want.'
    },
    {
        id: 'C4',
        name_internal: 'CHAOS_MAGNET',
        name_display: 'The Chaos Magnet',
        reveal_summary: 'You mistake intensity for intimacy, and stability feels like death. Your nervous system was calibrated by chaos: and now calm feels like a warning sign.',
        early_dive: 'Early on, you burn bright. The connection is electric, all-consuming, the most alive you\'ve ever felt. You and your partner exist in a private universe where every moment is heightened, every conflict is a doorway to deeper passion.',
        mid_dive: 'As the relationship stabilizes, something feels wrong. The absence of adrenaline registers as absence of love. You may find yourself creating conflict just to feel something: or seeking intensity outside the relationship.',
        stress_dive: 'Under stress, you escalate. Drama becomes connection. Fighting becomes foreplay. You push your partner to their edge just to know they\'re still there. The rupture-repair cycle becomes the only rhythm you trust.',
        misreads: 'You misread consistency as boredom. You interpret gentle love as lukewarm love. You conflate volatility with passion and peace with death of desire.',
        protective_logic: 'Chaos protects you from the vulnerability of depending on something stable. If it\'s always on fire, you never have to trust that it will last. Intensity is a distraction from the void underneath.',
        phrasing_inside: 'If it doesn\'t consume me, it isn\'t real.',
        phrasing_outside: 'I\'m exhausted. I can\'t keep having the same fight just so we can make up again.'
    },
    {
        id: 'C5',
        name_internal: 'INVISIBLE_PARTNER',
        name_display: 'The Invisible Partner',
        reveal_summary: 'You\'ve learned to need so quietly that no one can hear you. Your invisibility is a survival strategy that has become a prison.',
        early_dive: 'Early on, you are easy: low-maintenance, adaptable, never demanding. You seem to have no sharp edges, no inconvenient needs. You fit wherever you\'re placed. Your partner feels like they\'ve found someone uniquely compatible.',
        mid_dive: 'Over time, your absence of presence creates a curious void. Your partner may realize they don\'t really know you: because you\'ve never fully shown up. You meet their needs while yours wither in silence.',
        stress_dive: 'Under stress, you disappear. You minimize your pain, rationalize their neglect, convince yourself it\'s fine. The loneliness you feel is the loneliness of being unseen by someone who sleeps beside you.',
        misreads: 'You misread attention as scrutiny. You interpret genuine care as conditional. You conflate asking for needs with being a burden and visibility with vulnerability.',
        protective_logic: 'Invisibility protects you from the catastrophe of being seen and found wanting. If you never ask, you can never be refused. If you never show up, you can never be rejected. But you can never be truly loved either.',
        phrasing_inside: 'If I make myself small enough, maybe this will last.',
        phrasing_outside: 'I feel like I\'m in a relationship with an outline of a person. Where are you?'
    },
    {
        id: 'C6',
        name_internal: 'GUARDED_HEART',
        name_display: 'The Guarded Heart',
        reveal_summary: 'You scan for danger in every connection. Trust is not earned: it\'s tested, over and over, because betrayal taught you that love is not safe.',
        early_dive: 'Early on, you are cautiously optimistic. You want to believe this one is different. But part of you is always watching, waiting for the slip that reveals who they really are. Every inconsistency is a data point.',
        mid_dive: 'As the relationship deepens, your vigilance intensifies rather than relaxes. You may create tests your partner doesn\'t know they\'re taking. You hold back pieces of yourself: insurance against eventual betrayal.',
        stress_dive: 'Under stress, you wall off completely. The partner who was trusted yesterday becomes a potential threat today. You see evidence of betrayal even when none exists. Your partner feels like they\'re on trial.',
        misreads: 'You misread innocent behaviors as red flags. You interpret their past as a prophecy of your future. You conflate protection with wisdom and trust with naivety.',
        protective_logic: 'Your vigilance protects you from being caught off-guard again. If you see the betrayal coming, it won\'t break you. But watching for danger often creates it: and confirms the very distrust you started with.',
        phrasing_inside: 'If I stay ready, I\'ll never get hurt again.',
        phrasing_outside: 'I feel like I\'m constantly proving myself. Nothing I do is ever enough to make you trust me.'
    }
];

/**
 * Pairing interactions for primary-secondary combinations
 */
const pairings = [
    {
        primary_cluster_id: 'C1', // Anxious Pursuer
        secondary_cluster_id: 'C2', // Protective Withdrawer
        interaction_narrative: 'The classic "Pursuit-Withdraw" dance. The Pursuer chases for reassurance while the Withdrawer runs for autonomy, each confirming the other\'s worst fears.',
        timeline_sequence: 'Attraction (The Attentive meets the Mysterious) → Tension (Pursuit triggers withdrawal) → Escalation (Chase intensifies, walls rise) → Rupture (Abandonment meets Engulfment).',
        recognition_highlights: ['"Why can\'t you just talk to me?"', '"I need space to think."', '"The more I reach, the more you disappear."'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C1', // Anxious Pursuer
        secondary_cluster_id: 'C3', // Devoted Caretaker
        interaction_narrative: 'The "Mutual Depletion" pattern. Both give excessively, but in different currencies: attention vs. acts of service: leaving both exhausted and unmet.',
        timeline_sequence: 'Harmony (Both feel deeply needed) → Imbalance (One gives more visibly) → Resentment (Scorekeeping begins) → Collapse (Neither can receive).',
        recognition_highlights: ['"I do so much, but you never see it."', '"Why am I always the one holding us together?"'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C2', // Protective Withdrawer
        secondary_cluster_id: 'C4', // Chaos Magnet
        interaction_narrative: 'The "Intensity Paradox." The Withdrawer is drawn to the Chaos Magnet\'s passion but overwhelmed by it, creating a cycle of approach-avoidance.',
        timeline_sequence: 'Spark (The Reserved meets the Electric) → Overwhelm (Intensity triggers shutdown) → Provocation (Chaos creates conflict to reconnect) → Exit (Permanent retreat).',
        recognition_highlights: ['"I can\'t handle this much emotion."', '"Why do you always disappear when things get real?"'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C3', // Devoted Caretaker
        secondary_cluster_id: 'C5', // Invisible Partner
        interaction_narrative: 'The "Functional Void." A high-functioning relationship where both suppress needs: one through giving, the other through hiding.',
        timeline_sequence: 'Stability (The Helpful meets the Easy) → Routine (Needs go underground) → Hollowness (Emotional center goes missing) → Crisis (Something forces visibility).',
        recognition_highlights: ['"We never fight, but we don\'t really talk either."', '"I feel lonely together."'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C4', // Chaos Magnet
        secondary_cluster_id: 'C6', // Guarded Heart
        interaction_narrative: 'The "Confirmation Loop." The Chaos Magnet\'s volatility confirms the Guarded Heart\'s distrust, while the distrust triggers more volatility.',
        timeline_sequence: 'Intrigue (The Exciting meets the Watchful) → Testing (Intensity triggers vigilance) → Proof (Drama confirms danger) → Walls (Both retreat into protection).',
        recognition_highlights: ['"See? I knew you\'d do this eventually."', '"You never trusted me from the start."'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C5', // Invisible Partner
        secondary_cluster_id: 'C6', // Guarded Heart
        interaction_narrative: 'The "Silent Fortress." Both hide: one through invisibility, the other through vigilance: creating a relationship of two people who never fully show up.',
        timeline_sequence: 'Safety (The Undemanding meets the Self-Protective) → Distance (Neither initiates) → Drift (Parallel lives form) → Emptiness (Connection dies quietly).',
        recognition_highlights: ['"We\'re both here, but neither of us is really present."', '"I don\'t even know how to find you anymore."'],
        is_allowed: true
    }
];

async function seed() {
    console.log('🧹 Cleaning existing clusters and pairings...');
    await supabase.from('pairings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('clusters').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('📝 Seeding 6 archetype clusters...');
    for (const cluster of clusters) {
        const { error } = await supabase.from('clusters').upsert(cluster);
        if (error) console.error(`  ✗ ${cluster.id}:`, error.message);
        else console.log(`  ✓ ${cluster.name_display}`);
    }

    console.log('📝 Seeding pairings...');
    for (const pairing of pairings) {
        const { error } = await supabase.from('pairings').insert(pairing);
        if (error) console.error(`  ✗ ${pairing.primary_cluster_id}-${pairing.secondary_cluster_id}:`, error.message);
        else console.log(`  ✓ ${pairing.primary_cluster_id} + ${pairing.secondary_cluster_id}`);
    }

    console.log('✅ Seed complete.');
}

seed();
