import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Need service role for seeding usually

const supabase = createClient(supabaseUrl, supabaseKey);

const clusters = [
    {
        id: 'C1',
        name_internal: 'The perfectionist anchor',
        name_display: 'The Anchor',
        reveal_summary: 'You tend to provide stability through rigid standards, often at the cost of your own emotional needs.',
        early_dive: 'Early on, you feel like the reliable one, the person who "has it together" and handles the logistics of the connection perfectly.',
        mid_dive: 'As the relationship settles, your need for order becomes a shield against vulnerability, making it hard for your partner to truly reach you.',
        stress_dive: 'Under stress, you retreat into perfectionism, becoming hyper-critical of yourself and subtly demanding of your partner.',
        misreads: 'You often misread a partner\'s need for closeness as an intrusion on your carefully maintained systems.',
        protective_logic: 'Your rigidity protects you from the fear of being "not enough" or fundamentally flawed.',
        phrasing_inside: 'I just want things to be right so we can be safe.',
        phrasing_outside: 'It feels like walking on eggshells around your standards.'
    },
    {
        id: 'C2',
        name_internal: 'The anxious caretaker',
        name_display: 'The Caretaker',
        reveal_summary: 'Your focus on others\' needs often masks a deep fear of being unlovable or abandoned.',
        early_dive: 'In the beginning, you are the ultimate partner—attuned, giving, and incredibly perceptive of your partner\'s every mood.',
        mid_dive: 'Over time, your caretaking becomes a way to manage your own anxiety, leading to a feeling of being "on call" 24/7.',
        stress_dive: 'When stressed, you escalate your efforts to "help," which can feel like pressure or smothering to a partner.',
        misreads: 'You misread a partner\'s need for space as a definitive sign of upcoming abandonment.',
        protective_logic: 'Caretaking protects you from the void of your own unmet needs and the terror of being alone.',
        phrasing_inside: 'If I can just make them happy, they won\'t leave me.',
        phrasing_outside: 'I feel like I can\'t breathe because you\'re always checking in on me.'
    },
    {
        id: 'C3',
        name_internal: 'The avoidant independent',
        name_display: 'The Sovereign',
        reveal_summary: 'You value autonomy above all else, often seeing intimacy as a threat to your sense of self.',
        early_dive: 'Early on, you are charming and self-assured, drawing people in with your confident independence.',
        mid_dive: 'As closeness deepens, you start to feel "trapped," leading to subtle or overt distancing behaviors.',
        stress_dive: 'Under pressure, you shut down completely, creating a "wall of silence" to protect your inner autonomy.',
        misreads: 'You misread a partner\'s request for connection as a "demand" or an attempt to control you.',
        protective_logic: 'Your independence is a fortress protecting a highly sensitive core from being overwhelmed by others.',
        phrasing_inside: 'I need to know I can survive without anyone else.',
        phrasing_outside: 'It feels like you\'re always five steps away, even when we\'re in the same room.'
    },
    {
        id: 'C4',
        name_internal: 'The invisible observer',
        name_display: 'The Observer',
        reveal_summary: 'You navigate relationships by staying small and unnoticed, fearing that being "seen" will lead to shame.',
        early_dive: 'You are easy to be with initially because you have no "sharp edges" and ask for very little.',
        mid_dive: 'Eventually, your lack of presence creates a "hollow" feeling in the relationship, as your partner realizes they don\'t really know you.',
        stress_dive: 'When threatened, you disappear emotionally or physically, retreating into your inner world where it is safe.',
        misreads: 'You misread attention as "scrutiny" and affection as "transactional" or "conditional."',
        protective_logic: 'Invisibility is your primary safety mechanism against the perceived danger of judgment or exposure.',
        phrasing_inside: 'If they don\'t see the real me, they can\'t hurt me.',
        phrasing_outside: 'I feel like I\'m dating a ghost; I never know what you\'re actually thinking.'
    },
    {
        id: 'C5',
        name_internal: 'The intense seeker',
        name_display: 'The Seeker',
        reveal_summary: 'You crave high-intensity emotional connection, often oscillating between deep devotion and sudden withdrawal.',
        early_dive: 'The start of the relationship is a whirlwind of passion, shared secrets, and an almost psychic connection.',
        mid_dive: 'As the "high" fades, you may create conflict or drama just to feel the intensity of the reconnection.',
        stress_dive: 'Under stress, your emotions become a flood, overwhelming both you and your partner with their sheer volume.',
        misreads: 'You misread "stability" as "boredom" and "calm" as "disinterest."',
        protective_logic: 'Intensity serves as a distraction from a deep-seated sense of emptiness or lack of internal ground.',
        phrasing_inside: 'Love should feel like a lightning strike, every single day.',
        phrasing_outside: 'Everything is always a crisis with you; I just want a normal Tuesday.'
    }
];

const pairings = [
    {
        primary_cluster_id: 'C2', // Caretaker
        secondary_cluster_id: 'C3', // Sovereign
        interaction_narrative: 'The "Pursuit-Withdraw" dance. The Caretaker chases for reassurance while the Sovereign runs for autonomy.',
        timeline_sequence: 'Attraction (The Attuned meets the Confident) -> Tension (Requests for closeness feel like demands) -> Riptide (The chase intensifies, leading to a total Sovereign shutdown).',
        recognition_highlights: ['"Why can\'t you just talk to me?"', '"I need space to think."', '"You\'re never there when it counts."'],
        is_allowed: true
    },
    {
        primary_cluster_id: 'C1', // Anchor
        secondary_cluster_id: 'C4', // Observer
        interaction_narrative: 'The "Functional Void." A high-functioning household where everything is "perfect" but the emotional center is missing.',
        timeline_sequence: 'Stability (The Ordered meets the Quiet) -> The Routine (Life becomes a series of tasks) -> The Crisis (A stressor reveals the lack of a deep emotional bond).',
        recognition_highlights: ['"We never fight, but we don\'t really talk either."', '"Everything looks great on the outside."', '"I feel lonely together."'],
        is_allowed: true
    }
];

async function seed() {
    console.log('Seeding clusters...');
    for (const cluster of clusters) {
        const { error } = await supabase.from('clusters').upsert(cluster);
        if (error) console.error(`Error seeding cluster ${cluster.id}:`, error);
    }

    console.log('Seeding pairings...');
    for (const pairing of pairings) {
        const { error } = await supabase.from('pairings').upsert(pairing);
        if (error) console.error(`Error seeding pairing ${pairing.primary_cluster_id}-${pairing.secondary_cluster_id}:`, error);
    }

    console.log('Seed complete.');
}

seed();
