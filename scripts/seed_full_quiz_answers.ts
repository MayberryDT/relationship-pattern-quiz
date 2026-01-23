import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Load the question ID map from the questions seed
const questionIdMap: Record<string, string> = JSON.parse(
    fs.readFileSync('scripts/question_id_map.json', 'utf-8')
);

function getQuestionId(slug: string): string {
    const id = questionIdMap[slug];
    if (!id) throw new Error(`No UUID found for question slug: ${slug}`);
    return id;
}

/**
 * Full Quiz Answers - Based on quiz_design.md
 */
const answersData = [
    // ============ PHASE 1 ============
    // Q1.1
    { slug: 'q1_1', text: 'I pour everything into people, yet I consistently end up feeling invisible or exploited.', weight_pattern: 1.5, weight_driver: 0.3, weight_reinforcement: 0.5, flag_set: ['p_over_giver'] },
    { slug: 'q1_1', text: 'Things begin with intense promise, but I am always bracing for the inevitable moment they leave.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['p_abandonment'] },
    { slug: 'q1_1', text: 'As soon as the connection becomes truly serious, I feel a biological urge to pull back and protect my space.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.2, flag_set: ['p_avoidant'] },
    { slug: 'q1_1', text: 'I have a "magnet" for people who are incapable of meeting me halfway: the chaotic, the unavailable, or the withholding.', weight_pattern: 1.0, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['p_selection'] },
    { slug: 'q1_1', text: 'The relationship starts like a wildfire. It burns bright and fast, then inevitably turns to ash.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.8, flag_set: ['p_intensity'] },

    // Q1.2
    { slug: 'q1_2', text: 'I was told I was "too much": too intense, too needy, or too emotionally demanding.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.3, flag_set: ['e_too_much'] },
    { slug: 'q1_2', text: 'I was the one who fled. I felt the walls closing in and had to leave to regain my breath.', weight_pattern: 0.2, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['e_fled'] },
    { slug: 'q1_2', text: 'It didn\'t end with a bang, but a slow fizzle. The passion died and neither of us fought to save it.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['e_fizzle'] },
    { slug: 'q1_2', text: 'There was a fundamental break in trust: lies, betrayal, or a total collapse of integrity.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 1.2, flag_set: ['e_betrayal'] },
    { slug: 'q1_2', text: 'I stayed long after I knew it was over, clinging to a memory of who they used to be.', weight_pattern: 1.0, weight_driver: 0.3, weight_reinforcement: 0.8, flag_set: ['e_overstayed'] },

    // Q1.3
    { slug: 'q1_3', text: 'A sense that they are slightly out of reach or difficult to read.', weight_pattern: 0.8, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['a_unavailable'] },
    { slug: 'q1_3', text: 'They seem wounded or complicated. I feel an immediate desire to "solve" them.', weight_pattern: 1.3, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['a_wounded'] },
    { slug: 'q1_3', text: 'Pure, unadulterated intensity: a chemistry that feels almost electric.', weight_pattern: 0.5, weight_driver: 1.4, weight_reinforcement: 0.6, flag_set: ['a_intensity'] },
    { slug: 'q1_3', text: 'They feel like a harbor: safe, stable, and the opposite of my past chaos.', weight_pattern: 0.4, weight_driver: 0.3, weight_reinforcement: 1.3, flag_set: ['a_safe'] },
    { slug: 'q1_3', text: 'We are alike in ways that feel uncanny. It feels like finding a mirror.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['a_mirror'] },

    // Q1.4
    { slug: 'q1_4', text: 'The Anchor: I am the one who gives more, whether it is emotional or practical.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.5, flag_set: ['r_giver'] },
    { slug: 'q1_4', text: 'The Island: I keep my emotional distance even when I long for closeness.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['r_distancer'] },
    { slug: 'q1_4', text: 'The Hunter: I am always the one chasing the connection, wanting more depth.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['r_pursuer'] },
    { slug: 'q1_4', text: 'The Watcher: I am hyper-aware of shifts in their tone or mood, looking for the "off" signal.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['r_watcher'] },
    { slug: 'q1_4', text: 'The Peacekeeper: I absorb the tension to prevent an explosion, often losing my own voice.', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.8, flag_set: ['r_peacekeeper'] },

    // Q1.5
    { slug: 'q1_5', text: 'At the moment I need reassurance and they choose to pull away.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['b_reassurance'] },
    { slug: 'q1_5', text: 'At the moment they get too close and I feel my system shutting down.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['b_closeness'] },
    { slug: 'q1_5', text: 'When I realize I have given so much that I have literally nothing left for myself.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['b_depletion'] },
    { slug: 'q1_5', text: 'When the pedestal breaks and I realize they aren\'t who I thought they were.', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.2, flag_set: ['b_disillusion'] },
    { slug: 'q1_5', text: 'When the same argument happens for the hundredth time and I realize we are stuck.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['b_loop'] },

    // Q1.6
    { slug: 'q1_6', text: 'Relief. I can finally exhale because the threat is gone.', weight_pattern: 0.4, weight_driver: 0.2, weight_reinforcement: 1.2, flag_set: ['s_relief'] },
    { slug: 'q1_6', text: 'Suspicion. I am waiting for the other shoe to drop, because this can\'t be real.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['s_suspicious'] },
    { slug: 'q1_6', text: 'Boredom. Without the drama or intensity, I wonder if the connection is even there.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.5, flag_set: ['s_bored'] },
    { slug: 'q1_6', text: 'Claustrophobia. I feel like I am losing my edge or my freedom.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['s_trapped'] },
    { slug: 'q1_6', text: 'A testing impulse. I find myself starting small fights just to see if they\'ll stay.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['s_testing'] },

    // Q1.7
    { slug: 'q1_7', text: 'High awareness. I\'ve known for years. I just can\'t seem to stop it.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['aw_high'] },
    { slug: 'q1_7', text: 'Moderate awareness. I noticed the pattern, but I didn\'t understand the "why."', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['aw_moderate'] },
    { slug: 'q1_7', text: 'Emerging awareness. I am just starting to connect the dots now.', weight_pattern: 0.4, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['aw_emerging'] },
    { slug: 'q1_7', text: 'Minimal awareness. I believed every relationship was just "bad luck" until now.', weight_pattern: 0.3, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['aw_low'] },

    // Q1.8
    { slug: 'q1_8', text: 'That I keep choosing people who cannot love me back.', weight_pattern: 0.8, weight_driver: 0.9, weight_reinforcement: 0.8, flag_set: ['fr_selection'] },
    { slug: 'q1_8', text: 'That I can see exactly what I\'m doing and still can\'t stop doing it.', weight_pattern: 0.9, weight_driver: 0.7, weight_reinforcement: 1.0, flag_set: ['fr_behavior'] },
    { slug: 'q1_8', text: 'That I am the only one ever doing the work of the relationship.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['fr_reciprocity'] },
    { slug: 'q1_8', text: 'That I push away the only people who actually wanted to stay.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.6, flag_set: ['fr_sabotage'] },
    { slug: 'q1_8', text: 'That I don\'t feel in control of my own romantic fate.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['fr_confusion'] },

    // ============ PHASE 2 ============
    // Q2.1
    { slug: 'q2_1', text: 'Being eventually discarded. I assume everyone leaves eventually.', weight_pattern: 1.4, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['f_abandon'] },
    { slug: 'q2_1', text: 'Being exploited. I fear that my vulnerability will be used as a weapon.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 1.2, flag_set: ['f_mistrust'] },
    { slug: 'q2_1', text: 'Being erased. I fear that being "all in" means losing my identity.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['f_enmesh'] },
    { slug: 'q2_1', text: 'Being seen for who I really am. I fear I am inherently not enough.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['f_defective'] },
    { slug: 'q2_1', text: 'Being hungry. I fear my needs will never be met, no matter how much I ask.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['f_deprivation'] },

    // Q2.2
    { slug: 'q2_2', text: '"They\'re pulling away. I need to fix it right now."', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.4, flag_set: ['t_pursuit'] },
    { slug: 'q2_2', text: '"I knew I shouldn\'t have trusted them. I should have kept my guard up."', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.2, flag_set: ['t_cynicism'] },
    { slug: 'q2_2', text: '"I should probably distance myself before they can hurt me."', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['t_preempt'] },
    { slug: 'q2_2', text: '"What is wrong with me? Why am I like this?"', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['t_selfblame'] },
    { slug: 'q2_2', text: '"I don\'t deserve this treatment. I am done."', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['t_flight'] },

    // Q2.3
    { slug: 'q2_3', text: 'The dependency. If I need them this much, they have complete power to destroy me.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['c_dependency'] },
    { slug: 'q2_3', text: 'The monitoring. I feel like my freedom is being slowly suffocated.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['c_control'] },
    { slug: 'q2_3', text: 'The exposure. If they see all of me, they will realize I am a mistake.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['c_exposure'] },
    { slug: 'q2_3', text: 'The inadequacy. I fear I will give my all and it will still be insufficient.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['c_inadequacy'] },
    { slug: 'q2_3', text: 'The loss. The better it feels, the more devastating it will be when it ends.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.9, flag_set: ['c_loss'] },

    // Q2.4
    { slug: 'q2_4', text: '"Love is something I have to earn by being useful."', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['b_earned'] },
    { slug: 'q2_4', text: '"If people truly knew my interior world, they would be repulsed."', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['b_hidden'] },
    { slug: 'q2_4', text: '"The people I let get close are the only ones who can truly hurt me."', weight_pattern: 0.5, weight_driver: 0.9, weight_reinforcement: 1.1, flag_set: ['b_danger'] },
    { slug: 'q2_4', text: '"My emotions are too loud and too much for most people to handle."', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.7, flag_set: ['b_toomuch'] },
    { slug: 'q2_4', text: '"I will always be the second choice, never the priority."', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['b_secondary'] },

    // Q2.5
    { slug: 'q2_5', text: 'Total permanence: the certainty that they are never going anywhere.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['w_permanence'] },
    { slug: 'q2_5', text: 'Being "known": to have my interior world fully seen and accepted.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.9, flag_set: ['w_recognition'] },
    { slug: 'q2_5', text: 'Safe freedom: to be loved without being managed or monitored.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['w_autonomy'] },
    { slug: 'q2_5', text: 'Absolute priority: to be the most important thing in their universe.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['w_specialness'] },
    { slug: 'q2_5', text: 'Quiet acceptance: to be loved without having to perform or prove anything.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.9, flag_set: ['w_acceptance'] },

    // Q2.6
    { slug: 'q2_6', text: 'They will find me less attractive or pull away.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['x_distance'] },
    { slug: 'q2_6', text: 'They will use what I said against me in a future fight.', weight_pattern: 0.5, weight_driver: 0.8, weight_reinforcement: 1.1, flag_set: ['x_weapon'] },
    { slug: 'q2_6', text: 'They will try to "fix" me or become parent-like.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['x_control'] },
    { slug: 'q2_6', text: 'They will nod and say the right things, but they won\'t actually feel me.', weight_pattern: 0.8, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['x_dismiss'] },
    { slug: 'q2_6', text: 'It won\'t matter. The relationship is already doomed.', weight_pattern: 1.1, weight_driver: 0.6, weight_reinforcement: 0.7, flag_set: ['x_futility'] },

    // Q2.7
    { slug: 'q2_7', text: 'Hyper-vigilance: walking on eggshells to prevent an explosion.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ff_vigilance'] },
    { slug: 'q2_7', text: 'A quiet, hollow loneliness even when someone is right next to me.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 1.1, flag_set: ['ff_lonely'] },
    { slug: 'q2_7', text: 'Persistent exhaustion from giving without any return.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['ff_depleted'] },
    { slug: 'q2_7', text: 'A low-level dread: waiting for the moment it all goes wrong.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['ff_dread'] },
    { slug: 'q2_7', text: 'Invisibility: the feeling that my presence doesn\'t truly matter to them.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['ff_invisible'] },

    // ============ PHASE 3 ============
    // Q3.1
    { slug: 'q3_1', text: 'Proximity Seek: move closer, text more, demand an explanation.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['d_pursue'] },
    { slug: 'q3_1', text: 'Match and Exceed: pull back twice as far as they did.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['d_withdraw'] },
    { slug: 'q3_1', text: 'Chameleon: try to become exactly what they want to make them stay.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['d_appease'] },
    { slug: 'q3_1', text: 'Provoke: start a fight to force them to look at me.', weight_pattern: 0.8, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['d_escalate'] },
    { slug: 'q3_1', text: 'Freeze: watch them silently, analyzing every move for data.', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.1, flag_set: ['d_monitor'] },

    // Q3.2
    { slug: 'q3_2', text: 'The Resolver: I cannot rest until it is fixed and settled.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.5, flag_set: ['cn_resolve'] },
    { slug: 'q3_2', text: 'The Evader: I need to exit the room or the house to feel safe.', weight_pattern: 0.3, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['cn_exit'] },
    { slug: 'q3_2', text: 'The Accommodator: I will agree to anything just to make the yelling stop.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.7, flag_set: ['cn_agree'] },
    { slug: 'q3_2', text: 'The Statuesque: I go blank and literally cannot find my words.', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['cn_freeze'] },
    { slug: 'q3_2', text: 'The Gladiator: I won\'t stop until my point is validated and heard.', weight_pattern: 0.8, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['cn_fight'] },

    // Q3.3
    { slug: 'q3_3', text: 'I apologize immediately, even if I wasn\'t the one in the wrong.', weight_pattern: 1.3, weight_driver: 0.2, weight_reinforcement: 0.5, flag_set: ['rp_over_apologize'] },
    { slug: 'q3_3', text: 'I perform "acts of service" or buy gifts to show I\'m still there.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.7, flag_set: ['rp_demonstrate'] },
    { slug: 'q3_3', text: 'I sit in silence and wait for them to come to me.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['rp_passive'] },
    { slug: 'q3_3', text: 'I demand a long, detailed "processing" conversation about what happened.', weight_pattern: 0.7, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['rp_process'] },
    { slug: 'q3_3', text: 'I act as though it never happened and try to move on.', weight_pattern: 0.3, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['rp_avoid'] },

    // Q3.4
    { slug: 'q3_4', text: 'Instantaneous. I am at a 10 before I even realize I\'m upset.', weight_pattern: 1.2, weight_driver: 0.8, weight_reinforcement: 0.4, flag_set: ['ea_instant'] },
    { slug: 'q3_4', text: 'Rapid. I try to hold it together, but within minutes I\'m flooded.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['ea_fast'] },
    { slug: 'q3_4', text: 'Slow-burn. I stew for hours or days before the reaction hits.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['ea_delayed'] },
    { slug: 'q3_4', text: 'Internalized. I look perfectly calm, but inside I am absolute chaos.', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['ea_suppressed'] },
    { slug: 'q3_4', text: 'Regulated. I feel the surge, but I can usually ride the wave.', weight_pattern: 0.3, weight_driver: 0.4, weight_reinforcement: 1.2, flag_set: ['ea_regulated'] },

    // Q3.5
    { slug: 'q3_5', text: 'Close the gap. I need to be touching or talking to feel okay.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['pw_pursue'] },
    { slug: 'q3_5', text: 'Widen the gap. I need distance and silence to even breathe.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['pw_withdraw'] },
    { slug: 'q3_5', text: 'The Seesaw. I chase until they turn around, then I run.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 0.8, flag_set: ['pw_mixed'] },
    { slug: 'q3_5', text: 'The Wall. I don\'t move. I just shut down where I stand.', weight_pattern: 0.5, weight_driver: 0.9, weight_reinforcement: 0.9, flag_set: ['pw_frozen'] },

    // Q3.6
    { slug: 'q3_6', text: 'Let them know immediately and clearly.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['h_direct'] },
    { slug: 'q3_6', text: 'Be quiet and wait to see if they are intuitive enough to notice.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['h_indirect'] },
    { slug: 'q3_6', text: 'Swallow it. Bringing it up will just create more problems.', weight_pattern: 0.7, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['h_suppress'] },
    { slug: 'q3_6', text: 'Punish them subtly: the cold shoulder or withholding affection.', weight_pattern: 0.5, weight_driver: 1.1, weight_reinforcement: 0.7, flag_set: ['h_punish'] },
    { slug: 'q3_6', text: 'Question if I was actually hurt, or if I\'m just being sensitive.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['h_doubt'] },

    // Q3.7
    { slug: 'q3_7', text: 'Yes. I can see the lines coming before we even say them.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['la_high'] },
    { slug: 'q3_7', text: 'Sometimes. I realize it about halfway through the argument.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['la_moderate'] },
    { slug: 'q3_7', text: 'Never. I am too far inside the emotion to see the script.', weight_pattern: 1.0, weight_driver: 0.7, weight_reinforcement: 0.5, flag_set: ['la_low'] },

    // ============ PHASE 4 MODULES ============
    // Module A
    { slug: 'q4a_1', text: 'I become a detective: scanning their socials, checking their location, or showing up.', weight_pattern: 1.5, weight_driver: 0.3, weight_reinforcement: 0.2, flag_set: ['ma_intense'] },
    { slug: 'q4a_1', text: 'I become "extra": more helpful, more available, more sexual.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.5, flag_set: ['ma_moderate'] },
    { slug: 'q4a_1', text: 'I suffer in complete silence while obsessively checking my phone.', weight_pattern: 0.8, weight_driver: 0.7, weight_reinforcement: 0.8, flag_set: ['ma_restrained'] },

    { slug: 'q4a_2', text: 'Self-respect. I have compromised my dignity to keep them from leaving.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.4, flag_set: ['ma_shame'] },
    { slug: 'q4a_2', text: 'The Relationship. My very attempts to save it are what ultimately push them away.', weight_pattern: 1.1, weight_driver: 0.6, weight_reinforcement: 0.5, flag_set: ['ma_pushes'] },
    { slug: 'q4a_2', text: 'My Peace. I am never fully at rest, even when they are right there.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['ma_peace'] },

    { slug: 'q4a_3', text: 'Seconds to minutes.', weight_pattern: 1.4, weight_driver: 0.4, weight_reinforcement: 0.3, flag_set: ['ma_spiral_fast'] },
    { slug: 'q4a_3', text: 'An hour or two of silence.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['ma_spiral_hours'] },
    { slug: 'q4a_3', text: 'I can usually rationalize it for a day before I panic.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ma_spiral_managed'] },

    // Module B
    { slug: 'q4b_1', text: 'The weight of their expectations. It feels like an unpaid debt.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['mb_demands'] },
    { slug: 'q4b_1', text: 'The volume of the conflict. I just want the noise to stop.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['mb_conflict'] },
    { slug: 'q4b_1', text: 'The "nakedness" of the intimacy. Being seen feels like being exposed.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['mb_closeness'] },

    { slug: 'q4b_2', text: 'A mental fog. I am flooded and literally cannot think.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['mb_overwhelm'] },
    { slug: 'q4b_2', text: 'A deadening. I have turned my emotions off to survive.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.4, flag_set: ['mb_numb'] },
    { slug: 'q4b_2', text: 'A pure, cold relief. I finally have my "self" back.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['mb_relief'] },

    { slug: 'q4b_3', text: 'I just start "acting normal" and hope they don\'t bring it up.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.4, flag_set: ['mb_pretend'] },
    { slug: 'q4b_3', text: 'I give a logical explanation while keeping the emotion at arm\'s length.', weight_pattern: 0.5, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['mb_minimize'] },
    { slug: 'q4b_3', text: 'I rarely fully return. I stay slightly guarded from then on.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['mb_incomplete'] },

    // Module C
    { slug: 'q4c_1', text: 'Security: "If I am indispensable, they can\'t afford to leave me."', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['mc_security'] },
    { slug: 'q4c_1', text: 'Worth: "Being the strong one is the only way I feel valuable."', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['mc_worth'] },
    { slug: 'q4c_1', text: 'Debt: "I am repaying a guilt I can\'t quite name."', weight_pattern: 1.1, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['mc_guilt'] },

    { slug: 'q4c_2', text: 'Discomfort. I don\'t know where to put my hands or my mind.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['mc_uncomfortable'] },
    { slug: 'q4c_2', text: 'Suspicion. I\'m wondering what they\'re going to want in return later.', weight_pattern: 0.7, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['mc_suspicious'] },
    { slug: 'q4c_2', text: 'Guilt. I feel like I\'m failing my "job" as the giver.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['mc_guilty_receive'] },

    { slug: 'q4c_3', text: 'A massive amount. I am quietly seething under the surface.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['mc_high_resentment'] },
    { slug: 'q4c_3', text: 'A moderate amount. It builds up until I have a sudden explosion.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['mc_moderate'] },
    { slug: 'q4c_3', text: 'Almost none. I genuinely enjoy being the one who does it all.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['mc_low'] },

    { slug: 'q4c_4', text: 'No: that\'s my identity, my purpose.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['mc_identity_dependent'] },
    { slug: 'q4c_4', text: 'I would feel lost, but I could probably adjust.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.7, flag_set: ['mc_moderate_dependent'] },
    { slug: 'q4c_4', text: 'Yes: my value is not just in what I do for others.', weight_pattern: 0.5, weight_driver: 0.6, weight_reinforcement: 1.1, flag_set: ['mc_secure'] },

    // Module D
    { slug: 'q4d_1', text: 'Shut down and comply to avoid conflict.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 0.6, flag_set: ['md_comply'] },
    { slug: 'q4d_1', text: 'Push back hard: I won\'t be controlled.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['md_resist'] },
    { slug: 'q4d_1', text: 'Create secret distance while appearing present.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['md_covert'] },

    { slug: 'q4d_2', text: 'Them: I tend to defer or appease.', weight_pattern: 1.1, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['md_them'] },
    { slug: 'q4d_2', text: 'Me: I maintain the upper hand for safety.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['md_me'] },
    { slug: 'q4d_2', text: 'It is a constant struggle: neither feels stable.', weight_pattern: 0.7, weight_driver: 0.9, weight_reinforcement: 0.7, flag_set: ['md_struggle'] },

    { slug: 'q4d_3', text: 'Essential: I would rather be alone than lose myself.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['md_essential'] },
    { slug: 'q4d_3', text: 'Very: I need clear boundaries and my own space.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['md_high'] },
    { slug: 'q4d_3', text: 'Moderate: I want closeness but not at the cost of me.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.8, flag_set: ['md_moderate'] },

    // Module E
    { slug: 'q4e_1', text: 'Conflict feels like passion. Intensity equals love.', weight_pattern: 0.5, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['me_drama_passion'] },
    { slug: 'q4e_1', text: 'Calm feels boring: I create problems just to feel something.', weight_pattern: 0.4, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['me_calm_boring'] },
    { slug: 'q4e_1', text: 'I know it is unhealthy but stable feels fake or shallow.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_stable_fake'] },

    { slug: 'q4e_2', text: 'Days.', weight_pattern: 0.4, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['me_days'] },
    { slug: 'q4e_2', text: 'Weeks.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_weeks'] },
    { slug: 'q4e_2', text: 'Months: I am working on appreciating stability.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['me_months'] },

    { slug: 'q4e_3', text: 'My parents\' relationship: love was loud.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['me_origin_parents'] },
    { slug: 'q4e_3', text: 'My first love: it was a rollercoaster and nothing since compares.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_origin_first'] },
    { slug: 'q4e_3', text: 'Trauma: chaos feels familiar, almost safe.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['me_origin_trauma'] },

    // Module F
    { slug: 'q4f_1', text: 'Rarely: I have learned not to expect it.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['mf_rarely'] },
    { slug: 'q4f_1', text: 'Sometimes: in the beginning, then it fades.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['mf_sometimes'] },
    { slug: 'q4f_1', text: 'I am not even sure what my needs are.', weight_pattern: 0.8, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['mf_unknown'] },

    { slug: 'q4f_2', text: 'Don\'t ask: my needs feel like a burden.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['mf_dont_ask'] },
    { slug: 'q4f_2', text: 'Hint and hope they notice.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['mf_hint'] },
    { slug: 'q4f_2', text: 'Ask, but feel guilty or apologize for needing.', weight_pattern: 1.1, weight_driver: 0.4, weight_reinforcement: 0.7, flag_set: ['mf_apologetic'] },

    { slug: 'q4f_3', text: 'Try harder to be noticed.', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['mf_try_harder'] },
    { slug: 'q4f_3', text: 'Withdraw into yourself.', weight_pattern: 0.6, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['mf_withdraw'] },
    { slug: 'q4f_3', text: 'Accept it as normal: this is just how it is.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 1.0, flag_set: ['mf_accept'] },

    // ============ PHASE 5 ============
    { slug: 'q5_1', text: '"I want deep connection" AND "Intimacy terrifies me."', weight_pattern: 0.8, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['ct_connect_fear'] },
    { slug: 'q5_1', text: '"I want to be chosen" AND "I push people away before they can choose me."', weight_pattern: 1.0, weight_driver: 0.9, weight_reinforcement: 0.5, flag_set: ['ct_chosen_push'] },
    { slug: 'q5_1', text: '"I want to trust fully" AND "I\'m always waiting for betrayal."', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ct_trust_wait'] },
    { slug: 'q5_1', text: '"I want stability" AND "I get bored without intensity."', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.6, flag_set: ['ct_stable_bored'] },
    { slug: 'q5_1', text: '"I want to be loved as I am" AND "I hide who I really am."', weight_pattern: 1.0, weight_driver: 0.7, weight_reinforcement: 0.8, flag_set: ['ct_loved_hide'] },

    { slug: 'q5_2', text: 'I say I want closeness, but I build walls.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['cv_close_distance'] },
    { slug: 'q5_2', text: 'I say I want peace, but I find reasons to fight.', weight_pattern: 0.6, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['cv_peace_conflict'] },
    { slug: 'q5_2', text: 'I say I want a partner, but I keep people at the level of a project.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['cv_reciprocity_give'] },
    { slug: 'q5_2', text: 'I say I am happy, but I am looking for the exit.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['cv_leave_stay'] },
    { slug: 'q5_2', text: 'I say I am all in, but I\'m keeping one foot out the door.', weight_pattern: 0.7, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['cv_stay_sabotage'] }
];

// Build answers with proper UUIDs
const answers = answersData.map(a => ({
    question_id: getQuestionId(a.slug),
    text: a.text,
    weight_pattern: a.weight_pattern,
    weight_driver: a.weight_driver,
    weight_reinforcement: a.weight_reinforcement,
    flag_set: a.flag_set
}));

async function seedAnswers() {
    console.log('📝 Seeding answers...');

    let successCount = 0;
    let errorCount = 0;

    for (const a of answers) {
        const { error } = await supabase.from('answers').insert(a);
        if (error) {
            console.error(`  ✗ Error:`, error.message);
            errorCount++;
        } else {
            successCount++;
        }
    }

    console.log(`\n✅ Answers seeded: ${successCount} success, ${errorCount} errors`);
}

seedAnswers();
