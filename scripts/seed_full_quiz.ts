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
    { slug: 'q1_1', text: 'If you had to describe the "story" that defines your relationship history, which would you recognize first?', type: 'mc', phase: 'phase1', order_index: 110 },
    { slug: 'q1_2', text: 'Think back to your last three major endings. What is the common bridge between them?', type: 'mc', phase: 'phase1', order_index: 120 },
    { slug: 'q1_3', text: 'In the first ten minutes of meeting someone new, what is the specific energy that makes you think, "I have to know them"?', type: 'mc', phase: 'phase1', order_index: 130 },
    { slug: 'q1_4', text: 'Regardless of the partner, you tend to inhabit which role more often?', type: 'mc', phase: 'phase1', order_index: 140 },
    { slug: 'q1_5', text: 'Where does the machinery of your relationships usually fall apart?', type: 'mc', phase: 'phase1', order_index: 150 },
    { slug: 'q1_6', text: 'When a relationship truly starts to feel stable and secure, which sensation shows up?', type: 'mc', phase: 'phase1', order_index: 160 },
    { slug: 'q1_7', text: 'Before starting this diagnostic, how much did you recognize these repetitions?', type: 'mc', phase: 'phase1', order_index: 170 },
    { slug: 'q1_8', text: 'What is the most painful part of your relationship history?', type: 'mc', phase: 'phase1', order_index: 180 },

    // ============================================
    // PHASE 2: Core Vulnerability & Belief (7 questions)
    // ============================================
    { slug: 'q2_1', text: 'What is the worst-case scenario your system is trying to protect you from?', type: 'mc', phase: 'phase2', order_index: 210 },
    { slug: 'q2_2', text: 'When things feel uncertain, what is the first thought that enters your mind?', type: 'mc', phase: 'phase2', order_index: 220 },
    { slug: 'q2_3', text: 'Which aspect of deep emotional connection feels most dangerous to you?', type: 'mc', phase: 'phase2', order_index: 230 },
    { slug: 'q2_4', text: 'Which of these sentences has lived in the back of your mind for as long as you can remember?', type: 'mc', phase: 'phase2', order_index: 240 },
    { slug: 'q2_5', text: 'Beyond the surface, what is the one thing you are truly searching for in a partner?', type: 'mc', phase: 'phase2', order_index: 250 },
    { slug: 'q2_6', text: 'When you finally decide to open up emotionally, what do you assume will happen next?', type: 'mc', phase: 'phase2', order_index: 260 },
    { slug: 'q2_7', text: 'Which state feels most familiar, almost like a default setting, even though it hurts?', type: 'mc', phase: 'phase2', order_index: 270 },

    // ============================================
    // PHASE 3: Response Under Threat (7 questions)
    // ============================================
    { slug: 'q3_1', text: 'When you sense your partner is creating distance, what is your nervous system\'s first move?', type: 'mc', phase: 'phase3', order_index: 310 },
    { slug: 'q3_2', text: 'In the middle of a heated disagreement, you typically become which version of yourself?', type: 'mc', phase: 'phase3', order_index: 320 },
    { slug: 'q3_3', text: 'After the dust has settled, how do you attempt to bring the relationship back to life?', type: 'mc', phase: 'phase3', order_index: 330 },
    { slug: 'q3_4', text: 'How quickly do you travel from "something feels off" to "total emotional activation"?', type: 'mc', phase: 'phase3', order_index: 340 },
    { slug: 'q3_5', text: 'In moments of extreme stress, is your primary urge to close the gap or to widen it?', type: 'mc', phase: 'phase3', order_index: 350 },
    { slug: 'q3_6', text: 'When your partner has genuinely hurt you, what is your dominant instinct?', type: 'mc', phase: 'phase3', order_index: 360 },
    { slug: 'q3_7', text: 'During a repetitive fight, do you ever feel like you are just watching a play you\'ve already seen?', type: 'mc', phase: 'phase3', order_index: 370 },

    // ============================================
    // PHASE 4: Adaptive Deep Dive - Module A: Anxious Pursuit
    // ============================================
    { slug: 'q4a_1', text: 'When you feel a connection slipping, what is the furthest you\'ve gone to "win" it back?', type: 'mc', phase: 'phase4', order_index: 410, gating_logic: { required_flags: ['d_pursue', 'pw_pursue'] } },
    { slug: 'q4a_2', text: 'What is the primary "tax" you pay for your need for reassurance?', type: 'mc', phase: 'phase4', order_index: 411, gating_logic: { required_flags: ['d_pursue'] } },
    { slug: 'q4a_3', text: 'How long does it take for a "late text" to become a "they definitely hate me" conviction?', type: 'mc', phase: 'phase4', order_index: 412, gating_logic: { required_flags: ['f_abandon'] } },

    // Module B: Avoidant Shutdown
    { slug: 'q4b_1', text: 'What is the exact feeling that makes you want to disappear from a partner?', type: 'mc', phase: 'phase4', order_index: 420, gating_logic: { required_flags: ['d_withdraw', 'pw_withdraw'] } },
    { slug: 'q4b_2', text: 'When you have successfully created distance, what is happening inside your mind?', type: 'mc', phase: 'phase4', order_index: 421, gating_logic: { required_flags: ['d_withdraw'] } },
    { slug: 'q4b_3', text: 'After you\'ve pulled away, how do you try to return to the connection?', type: 'mc', phase: 'phase4', order_index: 422, gating_logic: { required_flags: ['pw_withdraw'] } },

    // Module C: Over-Functioning / Caretaker
    { slug: 'q4c_1', text: 'When you are "fixing" your partner\'s life, what is the hidden hope?', type: 'mc', phase: 'phase4', order_index: 430, gating_logic: { required_flags: ['p_over_giver', 'r_giver'] } },
    { slug: 'q4c_2', text: 'When someone actually tries to take care of YOU, what is your first reaction?', type: 'mc', phase: 'phase4', order_index: 431, gating_logic: { required_flags: ['r_giver'] } },
    { slug: 'q4c_3', text: 'How much "hidden invoice" energy do you carry for the things you\'ve done for others?', type: 'mc', phase: 'phase4', order_index: 432, gating_logic: { required_flags: ['ff_depleted'] } },
    { slug: 'q4c_4', text: 'If you couldn\'t be the caretaker, would you still feel valuable?', type: 'mc', phase: 'phase4', order_index: 433, gating_logic: { required_flags: ['d_appease'] } },

    // Module D: Control / Power Sensitivity (Text remains same but verify dashes)
    { slug: 'q4d_1', text: 'When you feel controlled or monitored in a relationship, you:', type: 'mc', phase: 'phase4', order_index: 440, gating_logic: { required_flags: ['c_control', 'f_enmesh'] } },
    { slug: 'q4d_2', text: 'In your relationships, who typically holds more power?', type: 'mc', phase: 'phase4', order_index: 441, gating_logic: { required_flags: ['c_control'] } },
    { slug: 'q4d_3', text: 'How important is maintaining independence in relationships?', type: 'mc', phase: 'phase4', order_index: 442, gating_logic: { required_flags: ['b_danger'] } },

    // Module E: Chaos Chemistry
    { slug: 'q4e_1', text: 'How do drama and conflict relate to feeling connected?', type: 'mc', phase: 'phase4', order_index: 450, gating_logic: { required_flags: ['p_intensity', 'a_intensity'] } },
    { slug: 'q4e_2', text: 'In a genuinely stable relationship, how long before you feel the urge to shake things up?', type: 'mc', phase: 'phase4', order_index: 451, gating_logic: { required_flags: ['s_bored'] } },
    { slug: 'q4e_3', text: 'Where did you learn that love equals intensity?', type: 'mc', phase: 'phase4', order_index: 452, gating_logic: { required_flags: ['p_intensity'] } },

    // Module F: Emotional Starvation
    { slug: 'q4f_1', text: 'How often have your emotional needs been genuinely met in relationships?', type: 'mc', phase: 'phase4', order_index: 460, gating_logic: { required_flags: ['f_deprivation', 'ff_lonely'] } },
    { slug: 'q4f_2', text: 'When you need emotional support, you typically:', type: 'mc', phase: 'phase4', order_index: 461, gating_logic: { required_flags: ['ff_invisible'] } },
    { slug: 'q4f_3', text: 'When you feel unseen in a relationship, you:', type: 'mc', phase: 'phase4', order_index: 462, gating_logic: { required_flags: ['b_secondary'] } },

    // ============================================
    // PHASE 5: Contradiction Surface (2 questions)
    // ============================================
    { slug: 'q5_1', text: 'Which pair of conflicting statements both feel deeply true for you?', type: 'mc', phase: 'phase5', order_index: 510 },
    { slug: 'q5_2', text: 'Where is the most painful distance between what you *say* you want and what you *do*?', type: 'mc', phase: 'phase5', order_index: 520 },

    // ============================================
    // PHASE 6: Single Reflection (1 question - optional text)
    // ============================================
    { slug: 'q6_1', text: 'Think about the exact moment you realized your current relationship dynamic was a repeat of an old story. What was happening?', type: 'text', phase: 'phase6', order_index: 610 }
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
