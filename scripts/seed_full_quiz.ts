import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Full Quiz Design Implementation
 * Based on quiz_design.md - Cold Traffic V1
 * 31-33 questions across 6 phases
 * 
 * We use a deterministic UUID generation based on question slug
 * so that answer references are consistent
 */

// Helper to create deterministic UUID from a string seed
function slugToUUID(slug: string): string {
    // Create a hash-like UUID from the slug for consistency
    const hash = slug.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);

    // Format as UUID-like string (using random UUID base with slug hash)
    const base = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return base.replace('aaaaaaaa', hex.slice(0, 8));
}

// Export the mapping for use in answers script
export const questionIdMap: Record<string, string> = {};

const questionsData = [
    // ============================================
    // PHASE 1: Pattern Recognition (8 questions)
    // ============================================
    { slug: 'q1_1', text: 'If you had to describe the story that keeps repeating in your relationships, which sounds most familiar?', type: 'mc', phase: 'phase1', order_index: 110 },
    { slug: 'q1_2', text: 'Think about how your last 2-3 relationships ended. What\'s the common thread?', type: 'mc', phase: 'phase1', order_index: 120 },
    { slug: 'q1_3', text: 'When you first meet someone you\'re drawn to, what tends to hook you?', type: 'mc', phase: 'phase1', order_index: 130 },
    { slug: 'q1_4', text: 'In relationships, you tend to be:', type: 'mc', phase: 'phase1', order_index: 140 },
    { slug: 'q1_5', text: 'Where do your relationships tend to break down?', type: 'mc', phase: 'phase1', order_index: 150 },
    { slug: 'q1_6', text: 'When a relationship starts to feel stable and secure, you usually feel:', type: 'mc', phase: 'phase1', order_index: 160 },
    { slug: 'q1_7', text: 'Before today, how aware were you that you have a repeating relationship pattern?', type: 'mc', phase: 'phase1', order_index: 170 },
    { slug: 'q1_8', text: 'What frustrates you most about your relationship history?', type: 'mc', phase: 'phase1', order_index: 180 },

    // ============================================
    // PHASE 2: Core Vulnerability & Belief (7 questions)
    // ============================================
    { slug: 'q2_1', text: 'What do you fear will happen if you truly let someone in?', type: 'mc', phase: 'phase2', order_index: 210 },
    { slug: 'q2_2', text: 'When things feel uncertain in your relationship, which thought shows up first?', type: 'mc', phase: 'phase2', order_index: 220 },
    { slug: 'q2_3', text: 'What feels most threatening about emotional closeness?', type: 'mc', phase: 'phase2', order_index: 230 },
    { slug: 'q2_4', text: 'Which of these thoughts has quietly lived in the back of your mind?', type: 'mc', phase: 'phase2', order_index: 240 },
    { slug: 'q2_5', text: 'Deep down, what do you most wish a partner would give you?', type: 'mc', phase: 'phase2', order_index: 250 },
    { slug: 'q2_6', text: 'When you open up emotionally, what do you expect will happen?', type: 'mc', phase: 'phase2', order_index: 260 },
    { slug: 'q2_7', text: 'Which emotional state feels most "familiar"—almost like home, even when it hurts?', type: 'mc', phase: 'phase2', order_index: 270 },

    // ============================================
    // PHASE 3: Response Under Threat (7 questions)
    // ============================================
    { slug: 'q3_1', text: 'When you sense your partner pulling away, your first instinct is:', type: 'mc', phase: 'phase3', order_index: 310 },
    { slug: 'q3_2', text: 'During a disagreement, you typically:', type: 'mc', phase: 'phase3', order_index: 320 },
    { slug: 'q3_3', text: 'After conflict, how do you typically try to repair?', type: 'mc', phase: 'phase3', order_index: 330 },
    { slug: 'q3_4', text: 'How quickly do you go from "something\'s off" to "full emotional response"?', type: 'mc', phase: 'phase3', order_index: 340 },
    { slug: 'q3_5', text: 'In relationship stress, are you more likely to pursue connection or create distance?', type: 'mc', phase: 'phase3', order_index: 350 },
    { slug: 'q3_6', text: 'When your partner hurts you, your instinct is:', type: 'mc', phase: 'phase3', order_index: 360 },
    { slug: 'q3_7', text: 'When conflict repeats, do you feel like you\'re watching yourself make the same moves?', type: 'mc', phase: 'phase3', order_index: 370 },

    // ============================================
    // PHASE 4: Adaptive Deep Dive - Module A: Anxious Pursuit
    // ============================================
    { slug: 'q4a_1', text: 'When you feel someone slipping away, how far does your pursuit typically go?', type: 'mc', phase: 'phase4', order_index: 410, gating_logic: { required_flags: ['d_pursue', 'pw_pursue'] } },
    { slug: 'q4a_2', text: 'What does chasing reassurance cost you?', type: 'mc', phase: 'phase4', order_index: 411, gating_logic: { required_flags: ['d_pursue'] } },
    { slug: 'q4a_3', text: 'How quickly does "they haven\'t texted back" turn into "this is over"?', type: 'mc', phase: 'phase4', order_index: 412, gating_logic: { required_flags: ['f_abandon'] } },

    // Module B: Avoidant Shutdown
    { slug: 'q4b_1', text: 'What triggers your need to withdraw?', type: 'mc', phase: 'phase4', order_index: 420, gating_logic: { required_flags: ['d_withdraw', 'pw_withdraw'] } },
    { slug: 'q4b_2', text: 'When you\'ve pulled away, what\'s happening inside?', type: 'mc', phase: 'phase4', order_index: 421, gating_logic: { required_flags: ['d_withdraw'] } },
    { slug: 'q4b_3', text: 'After withdrawing, how do you typically come back?', type: 'mc', phase: 'phase4', order_index: 422, gating_logic: { required_flags: ['pw_withdraw'] } },

    // Module C: Over-Functioning / Caretaker
    { slug: 'q4c_1', text: 'When you give in relationships, what\'s really driving it?', type: 'mc', phase: 'phase4', order_index: 430, gating_logic: { required_flags: ['p_over_giver', 'r_giver'] } },
    { slug: 'q4c_2', text: 'When someone tries to care for you, you feel:', type: 'mc', phase: 'phase4', order_index: 431, gating_logic: { required_flags: ['r_giver'] } },
    { slug: 'q4c_3', text: 'How much hidden resentment do you carry from giving so much?', type: 'mc', phase: 'phase4', order_index: 432, gating_logic: { required_flags: ['ff_depleted'] } },
    { slug: 'q4c_4', text: 'If you couldn\'t be the caretaker, would you still feel valuable?', type: 'mc', phase: 'phase4', order_index: 433, gating_logic: { required_flags: ['d_appease'] } },

    // Module D: Control / Power Sensitivity
    { slug: 'q4d_1', text: 'When you feel controlled or monitored in a relationship, you:', type: 'mc', phase: 'phase4', order_index: 440, gating_logic: { required_flags: ['c_control', 'f_enmesh'] } },
    { slug: 'q4d_2', text: 'In your relationships, who typically holds more power?', type: 'mc', phase: 'phase4', order_index: 441, gating_logic: { required_flags: ['c_control'] } },
    { slug: 'q4d_3', text: 'How important is maintaining independence in relationships?', type: 'mc', phase: 'phase4', order_index: 442, gating_logic: { required_flags: ['b_danger'] } },

    // Module E: Chaos Chemistry
    { slug: 'q4e_1', text: 'How do drama and conflict relate to feeling connected?', type: 'mc', phase: 'phase4', order_index: 450, gating_logic: { required_flags: ['p_intensity', 'a_intensity'] } },
    { slug: 'q4e_2', text: 'In a genuinely stable relationship, how long before you feel the urge to shake things up?', type: 'mc', phase: 'phase4', order_index: 451, gating_logic: { required_flags: ['s_bored'] } },
    { slug: 'q4e_3', text: 'Where did you learn that love = intensity?', type: 'mc', phase: 'phase4', order_index: 452, gating_logic: { required_flags: ['p_intensity'] } },

    // Module F: Emotional Starvation
    { slug: 'q4f_1', text: 'How often have your emotional needs been genuinely met in relationships?', type: 'mc', phase: 'phase4', order_index: 460, gating_logic: { required_flags: ['f_deprivation', 'ff_lonely'] } },
    { slug: 'q4f_2', text: 'When you need emotional support, you typically:', type: 'mc', phase: 'phase4', order_index: 461, gating_logic: { required_flags: ['ff_invisible'] } },
    { slug: 'q4f_3', text: 'When you feel unseen in a relationship, you:', type: 'mc', phase: 'phase4', order_index: 462, gating_logic: { required_flags: ['b_secondary'] } },

    // ============================================
    // PHASE 5: Contradiction Surface (2 questions)
    // ============================================
    { slug: 'q5_1', text: 'Which pair of statements both feel true for you?', type: 'mc', phase: 'phase5', order_index: 510 },
    { slug: 'q5_2', text: 'Where is the biggest gap between what you *want* and what you *do*?', type: 'mc', phase: 'phase5', order_index: 520 },

    // ============================================
    // PHASE 6: Single Reflection (1 question - optional text)
    // ============================================
    { slug: 'q6_1', text: 'The moment you realized you weren\'t being met emotionally was…', type: 'text', phase: 'phase6', order_index: 610 }
];

// Build the questions array with UUIDs
const questions = questionsData.map(q => {
    const id = randomUUID();
    questionIdMap[q.slug] = id;
    return {
        id,
        text: q.text,
        type: q.type,
        phase: q.phase,
        order_index: q.order_index,
        gating_logic: (q as any).gating_logic || {},
        confidence_modifier: 1.0
    };
});

async function seed() {
    console.log('🧹 Cleaning existing questions/answers...');
    await supabase.from('answers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('questions').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('📝 Seeding questions...');
    for (const q of questions) {
        const { error } = await supabase.from('questions').insert(q);
        if (error) console.error(`  ✗ ${q.text.slice(0, 30)}:`, error.message);
        else console.log(`  ✓ ${q.text.slice(0, 50)}...`);
    }

    // Write the ID map to a JSON file for the answers script
    const fs = await import('fs');
    fs.writeFileSync('scripts/question_id_map.json', JSON.stringify(questionIdMap, null, 2));
    console.log('\n✅ Questions seeded. ID map saved to scripts/question_id_map.json');
    console.log('Run: npx tsx scripts/seed_full_quiz_answers.ts');
}

seed();
