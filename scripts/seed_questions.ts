import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const questions = [
    // Phase 1: Segmentation (Early)
    {
        id: 'q1',
        text: 'When a relationship starts to feel stable, your first instinct is usually:',
        type: 'mc',
        phase: 'early',
        order_index: 10,
        gating_logic: {},
        confidence_modifier: 1.0
    },
    {
        id: 'q2',
        text: 'In moments of conflict, which role do you naturally fall into?',
        type: 'mc',
        phase: 'early',
        order_index: 20,
        gating_logic: {},
        confidence_modifier: 1.0
    },
    // Phase 2: Differentiation (Mid)
    {
        id: 'q3',
        text: 'You mentioned a need for space. Is this space for *recovery* or for *protection*?',
        type: 'mc',
        phase: 'mid',
        order_index: 30,
        gating_logic: { required_flags: ['f_space_seeker'] },
        confidence_modifier: 1.2
    },
    {
        id: 'q4',
        text: 'When you care for others, do you feel *exhausted* or *indispensable*?',
        type: 'mc',
        phase: 'mid',
        order_index: 40,
        gating_logic: { required_flags: ['f_caretaker'] },
        confidence_modifier: 1.2
    },
    // Phase 3: Reinforcement (Mid)
    {
        id: 'q5',
        text: 'Your scores suggest a high degree of *Sovereignty*. How much of this independence was "forced" on you early in life?',
        type: 'mc',
        phase: 'mid',
        order_index: 50,
        gating_logic: { min_scores: { driver: 2.0 } },
        confidence_modifier: 1.5
    },
    // Phase 4: Reflection (Late)
    {
        id: 'q6',
        text: 'Describe a moment where you felt *truly seen* in a relationship. What was happening?',
        type: 'text',
        phase: 'late',
        order_index: 100,
        gating_logic: {},
        confidence_modifier: 1.0
    }
];

const answers = [
    // Q1 Answers
    {
        question_id: 'q1',
        text: 'Relief: I can finally relax and be myself.',
        weight_pattern: 0.5,
        weight_driver: 0.2,
        weight_reinforcement: 0.8,
        flag_set: ['f_relieved']
    },
    {
        question_id: 'q1',
        text: 'Anxiety: I wonder when the "other shoe" will drop.',
        weight_pattern: 1.2,
        weight_driver: 0.5,
        weight_reinforcement: 0.1,
        flag_set: ['f_anxious_start']
    },
    {
        question_id: 'q1',
        text: 'Boredom: I miss the intensity of the early chase.',
        weight_pattern: 0.3,
        weight_driver: 1.5,
        weight_reinforcement: 0.5,
        flag_set: ['f_intensity_seeker']
    },
    {
        question_id: 'q1',
        text: 'Watchfulness: I look for signs of the dynamic changing.',
        weight_pattern: 0.8,
        weight_driver: 0.8,
        weight_reinforcement: 1.2,
        flag_set: ['f_watcher']
    },
    // Q2 Answers
    {
        question_id: 'q2',
        text: 'The Fixer: I try to resolve it immediately, even if I have to apologize for things I didn\'t do.',
        weight_pattern: 1.5,
        weight_driver: 0.3,
        weight_reinforcement: 0.2,
        flag_set: ['f_caretaker']
    },
    {
        question_id: 'q2',
        text: 'The Runner: I need to get away to process, or I might say things I regret.',
        weight_pattern: 0.2,
        weight_driver: 1.2,
        weight_reinforcement: 0.5,
        flag_set: ['f_space_seeker']
    },
    {
        question_id: 'q2',
        text: 'The Wall: I stay present physically but shut down emotionally until it passes.',
        weight_pattern: 0.5,
        weight_driver: 0.5,
        weight_reinforcement: 1.5,
        flag_set: ['f_observer']
    },
    {
        question_id: 'q1',
        text: 'The Anchor: I stand my ground and expect others to meet my standards of behavior.',
        weight_pattern: 1.0,
        weight_driver: 1.0,
        weight_reinforcement: 1.0,
        flag_set: ['f_anchor']
    },
    // Q3 Answers (Gated by f_space_seeker)
    {
        question_id: 'q3',
        text: 'Recovery: I am overwhelmed and need to find my center again.',
        weight_pattern: 0.5,
        weight_driver: 0.5,
        weight_reinforcement: 0.8,
        flag_set: []
    },
    {
        question_id: 'q3',
        text: 'Protection: Closeness feels like an intrusion or a threat to my autonomy.',
        weight_pattern: 0.2,
        weight_driver: 1.5,
        weight_reinforcement: 0.2,
        flag_set: ['f_sovereign_core']
    },
    // Q4 Answers (Gated by f_caretaker)
    {
        question_id: 'q4',
        text: 'Exhausted: I feel like a vessel being emptied without being refilled.',
        weight_pattern: 1.0,
        weight_driver: 0.2,
        weight_reinforcement: 0.5,
        flag_set: []
    },
    {
        question_id: 'q4',
        text: 'Indispensable: Providing value is the only way I feel safe and needed.',
        weight_pattern: 0.5,
        weight_driver: 1.2,
        weight_reinforcement: 0.5,
        flag_set: ['f_indispensable']
    },
    // Q5 Answers (Gated by driver >= 2.0)
    {
        question_id: 'q5',
        text: 'Mostly forced: I had to grow up fast and rely only on myself.',
        weight_pattern: 0.2,
        weight_driver: 1.5,
        weight_reinforcement: 0.8,
        flag_set: ['f_parentified']
    },
    {
        question_id: 'q5',
        text: 'A mix: I value my freedom, but I also learned that others can be unreliable.',
        weight_pattern: 0.8,
        weight_driver: 1.0,
        weight_reinforcement: 1.2,
        flag_set: []
    }
];

async function seed() {
    console.log('Cleaning existing questions/answers...');
    await supabase.from('answers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('questions').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('Seeding questions...');
    for (const q of questions) {
        const { error } = await supabase.from('questions').upsert(q);
        if (error) console.error(`Error q ${q.id}:`, error);
    }

    console.log('Seeding answers...');
    for (const a of answers) {
        const { error } = await supabase.from('answers').insert(a);
        if (error) console.error(`Error answer for ${a.question_id}:`, error);
    }

    console.log('Seed complete.');
}

seed();
