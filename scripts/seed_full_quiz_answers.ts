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
    { slug: 'q1_1', text: 'I give everything and end up feeling invisible or taken for granted.', weight_pattern: 1.5, weight_driver: 0.3, weight_reinforcement: 0.5, flag_set: ['p_over_giver'] },
    { slug: 'q1_1', text: 'Things start strong but I\'m always waiting for them to leave or lose interest.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['p_abandonment'] },
    { slug: 'q1_1', text: 'I feel trapped or suffocated once things get too close or serious.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.2, flag_set: ['p_avoidant'] },
    { slug: 'q1_1', text: 'I keep choosing people who can\'t meet me halfway—unavailable, chaotic, or withholding.', weight_pattern: 1.0, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['p_selection'] },
    { slug: 'q1_1', text: 'It\'s intense at the start, then burns out or explodes.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.8, flag_set: ['p_intensity'] },

    // Q1.2
    { slug: 'q1_2', text: 'They said I was "too much"—too intense, too needy, too emotional.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.3, flag_set: ['e_too_much'] },
    { slug: 'q1_2', text: 'I left because I felt suffocated, controlled, or bored.', weight_pattern: 0.2, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['e_fled'] },
    { slug: 'q1_2', text: 'It fizzled—passion died and neither of us fought for it.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['e_fizzle'] },
    { slug: 'q1_2', text: 'There was betrayal—lies, cheating, or broken trust.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 1.2, flag_set: ['e_betrayal'] },
    { slug: 'q1_2', text: 'I stayed too long even though I knew it wasn\'t right.', weight_pattern: 1.0, weight_driver: 0.3, weight_reinforcement: 0.8, flag_set: ['e_overstayed'] },

    // Q1.3
    { slug: 'q1_3', text: 'A sense that they\'re hard to read or slightly out of reach.', weight_pattern: 0.8, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['a_unavailable'] },
    { slug: 'q1_3', text: 'They seem wounded or complicated—I want to understand them.', weight_pattern: 1.3, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['a_wounded'] },
    { slug: 'q1_3', text: 'Immediate intensity—strong chemistry, almost electric.', weight_pattern: 0.5, weight_driver: 1.4, weight_reinforcement: 0.6, flag_set: ['a_intensity'] },
    { slug: 'q1_3', text: 'They feel safe and stable—the opposite of past chaos.', weight_pattern: 0.4, weight_driver: 0.3, weight_reinforcement: 1.3, flag_set: ['a_safe'] },
    { slug: 'q1_3', text: 'We\'re alike in ways that feel familiar, almost uncanny.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['a_mirror'] },

    // Q1.4
    { slug: 'q1_4', text: 'The one who gives more—emotionally, practically, or both.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.5, flag_set: ['r_giver'] },
    { slug: 'q1_4', text: 'The one who keeps emotional distance—even when I don\'t want to.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['r_distancer'] },
    { slug: 'q1_4', text: 'The one chasing connection—always wanting more closeness.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['r_pursuer'] },
    { slug: 'q1_4', text: 'The one watching for threats—hyperaware of shifts in mood or distance.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['r_watcher'] },
    { slug: 'q1_4', text: 'The one keeping the peace—absorbing tension so others don\'t have to.', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.8, flag_set: ['r_peacekeeper'] },

    // Q1.5
    { slug: 'q1_5', text: 'When I need reassurance and they pull away.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['b_reassurance'] },
    { slug: 'q1_5', text: 'When they get too close and I feel myself shutting down.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['b_closeness'] },
    { slug: 'q1_5', text: 'When I\'ve given so much I have nothing left.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['b_depletion'] },
    { slug: 'q1_5', text: 'When I realize they\'re not who I thought they were.', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.2, flag_set: ['b_disillusion'] },
    { slug: 'q1_5', text: 'When the same fight happens for the hundredth time.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['b_loop'] },

    // Q1.6
    { slug: 'q1_6', text: 'Relief—finally safe, I can relax.', weight_pattern: 0.4, weight_driver: 0.2, weight_reinforcement: 1.2, flag_set: ['s_relief'] },
    { slug: 'q1_6', text: 'Suspicious—waiting for something to go wrong.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['s_suspicious'] },
    { slug: 'q1_6', text: 'Bored—something is missing without the intensity.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.5, flag_set: ['s_bored'] },
    { slug: 'q1_6', text: 'Trapped—like I\'m losing my freedom or edge.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['s_trapped'] },
    { slug: 'q1_6', text: 'Disbelief—I keep testing to see if it\'s real.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['s_testing'] },

    // Q1.7
    { slug: 'q1_7', text: 'Very—I\'ve known for a while, I just can\'t stop it.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['aw_high'] },
    { slug: 'q1_7', text: 'Somewhat—I\'ve noticed things repeat but haven\'t fully understood why.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['aw_moderate'] },
    { slug: 'q1_7', text: 'Barely—I\'m just starting to see it now.', weight_pattern: 0.4, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['aw_emerging'] },
    { slug: 'q1_7', text: 'None—I thought every relationship was unique until this quiz.', weight_pattern: 0.3, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['aw_low'] },

    // Q1.8
    { slug: 'q1_8', text: 'That I keep ending up with the wrong people.', weight_pattern: 0.8, weight_driver: 0.9, weight_reinforcement: 0.8, flag_set: ['fr_selection'] },
    { slug: 'q1_8', text: 'That I can\'t seem to change even when I know better.', weight_pattern: 0.9, weight_driver: 0.7, weight_reinforcement: 1.0, flag_set: ['fr_behavior'] },
    { slug: 'q1_8', text: 'That I give so much and get so little back.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['fr_reciprocity'] },
    { slug: 'q1_8', text: 'That I push away the people who actually want to stay.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.6, flag_set: ['fr_sabotage'] },
    { slug: 'q1_8', text: 'That I don\'t know why this keeps happening.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['fr_confusion'] },

    // ============ PHASE 2 ============
    // Q2.1
    { slug: 'q2_1', text: 'They\'ll eventually leave—everyone does.', weight_pattern: 1.4, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['f_abandon'] },
    { slug: 'q2_1', text: 'They\'ll use my vulnerability against me.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 1.2, flag_set: ['f_mistrust'] },
    { slug: 'q2_1', text: 'I\'ll lose myself—my independence, my identity.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['f_enmesh'] },
    { slug: 'q2_1', text: 'They\'ll realize I\'m not worth staying for.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['f_defective'] },
    { slug: 'q2_1', text: 'My needs will be too much and drive them away.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['f_deprivation'] },

    // Q2.2
    { slug: 'q2_2', text: '"They\'re pulling away—I need to do something."', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.4, flag_set: ['t_pursuit'] },
    { slug: 'q2_2', text: '"I knew this would happen—I shouldn\'t have trusted them."', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.2, flag_set: ['t_cynicism'] },
    { slug: 'q2_2', text: '"Maybe I should create some distance before they do."', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['t_preempt'] },
    { slug: 'q2_2', text: '"What did I do wrong? How do I fix this?"', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['t_selfblame'] },
    { slug: 'q2_2', text: '"I don\'t deserve this—I should leave."', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['t_flight'] },

    // Q2.3
    { slug: 'q2_3', text: 'That I\'ll need them too much and they\'ll leave.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['c_dependency'] },
    { slug: 'q2_3', text: 'That they\'ll control me or I\'ll lose my freedom.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['c_control'] },
    { slug: 'q2_3', text: 'That I\'ll be truly seen—and rejected.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['c_exposure'] },
    { slug: 'q2_3', text: 'That I\'ll give everything and still not be enough.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['c_inadequacy'] },
    { slug: 'q2_3', text: 'That it will end and the loss will break me.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.9, flag_set: ['c_loss'] },

    // Q2.4
    { slug: 'q2_4', text: '"I have to earn love—it won\'t just be given."', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['b_earned'] },
    { slug: 'q2_4', text: '"If they really knew me, they wouldn\'t stay."', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['b_hidden'] },
    { slug: 'q2_4', text: '"People who get close always hurt me eventually."', weight_pattern: 0.5, weight_driver: 0.9, weight_reinforcement: 1.1, flag_set: ['b_danger'] },
    { slug: 'q2_4', text: '"My feelings are too intense—I need to shrink them."', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.7, flag_set: ['b_toomuch'] },
    { slug: 'q2_4', text: '"I\'ll never be anyone\'s first priority."', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['b_secondary'] },

    // Q2.5
    { slug: 'q2_5', text: 'Unwavering safety—the certainty they won\'t leave.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['w_permanence'] },
    { slug: 'q2_5', text: 'True understanding—to be known at the deepest level.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.9, flag_set: ['w_recognition'] },
    { slug: 'q2_5', text: 'Freedom—support without monitoring or control.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['w_autonomy'] },
    { slug: 'q2_5', text: 'Priority—to be their most important person.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['w_specialness'] },
    { slug: 'q2_5', text: 'Acceptance—to be loved without performing or proving.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.9, flag_set: ['w_acceptance'] },

    // Q2.6
    { slug: 'q2_6', text: 'They\'ll distance themselves or lose interest.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['x_distance'] },
    { slug: 'q2_6', text: 'They\'ll see it as weakness or use it later.', weight_pattern: 0.5, weight_driver: 0.8, weight_reinforcement: 1.1, flag_set: ['x_weapon'] },
    { slug: 'q2_6', text: 'They\'ll try to fix me or become overwhelming.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['x_control'] },
    { slug: 'q2_6', text: 'They\'ll say the right things but not really understand.', weight_pattern: 0.8, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['x_dismiss'] },
    { slug: 'q2_6', text: 'They\'ll eventually leave anyway—why bother.', weight_pattern: 1.1, weight_driver: 0.6, weight_reinforcement: 0.7, flag_set: ['x_futility'] },

    // Q2.7
    { slug: 'q2_7', text: 'Walking on eggshells—constant vigilance.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ff_vigilance'] },
    { slug: 'q2_7', text: 'Loneliness—even when I\'m not alone.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 1.1, flag_set: ['ff_lonely'] },
    { slug: 'q2_7', text: 'Exhaustion—from giving without receiving.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['ff_depleted'] },
    { slug: 'q2_7', text: 'Dread—waiting for the other shoe to drop.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['ff_dread'] },
    { slug: 'q2_7', text: 'Invisibility—feeling unseen or unimportant.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['ff_invisible'] },

    // ============ PHASE 3 ============
    // Q3.1
    { slug: 'q3_1', text: 'Move closer—call, text, seek reassurance.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['d_pursue'] },
    { slug: 'q3_1', text: 'Pull back—match their distance or create more.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['d_withdraw'] },
    { slug: 'q3_1', text: 'Appease—try to fix whatever I might have done wrong.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['d_appease'] },
    { slug: 'q3_1', text: 'Escalate—force the issue with intensity or confrontation.', weight_pattern: 0.8, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['d_escalate'] },
    { slug: 'q3_1', text: 'Watch and wait—analyze before reacting.', weight_pattern: 0.6, weight_driver: 0.7, weight_reinforcement: 1.1, flag_set: ['d_monitor'] },

    // Q3.2
    { slug: 'q3_2', text: 'Push to resolve it immediately—I can\'t rest with things unfinished.', weight_pattern: 1.2, weight_driver: 0.5, weight_reinforcement: 0.5, flag_set: ['cn_resolve'] },
    { slug: 'q3_2', text: 'Leave the room—I need space before I say something I regret.', weight_pattern: 0.3, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['cn_exit'] },
    { slug: 'q3_2', text: 'Agree to end the fight, even if I don\'t mean it.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 0.7, flag_set: ['cn_agree'] },
    { slug: 'q3_2', text: 'Shut down—I go blank and can\'t access my thoughts.', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['cn_freeze'] },
    { slug: 'q3_2', text: 'Dig in—I won\'t stop until I\'m heard.', weight_pattern: 0.8, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['cn_fight'] },

    // Q3.3
    { slug: 'q3_3', text: 'Apologize—even for things I didn\'t do.', weight_pattern: 1.3, weight_driver: 0.2, weight_reinforcement: 0.5, flag_set: ['rp_over_apologize'] },
    { slug: 'q3_3', text: 'Show affection—acts of service, gifts, extra attention.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.7, flag_set: ['rp_demonstrate'] },
    { slug: 'q3_3', text: 'Wait for them to come to me—I don\'t make the first move.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['rp_passive'] },
    { slug: 'q3_3', text: 'Talk it out—I need to understand what happened.', weight_pattern: 0.7, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['rp_process'] },
    { slug: 'q3_3', text: 'Pretend it didn\'t happen—move on without addressing it.', weight_pattern: 0.3, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['rp_avoid'] },

    // Q3.4
    { slug: 'q3_4', text: 'Instantly—0 to 100 in seconds.', weight_pattern: 1.2, weight_driver: 0.8, weight_reinforcement: 0.4, flag_set: ['ea_instant'] },
    { slug: 'q3_4', text: 'Minutes—I try to stay calm but rarely succeed.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['ea_fast'] },
    { slug: 'q3_4', text: 'Hours—I stew before the reaction hits.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['ea_delayed'] },
    { slug: 'q3_4', text: 'I mostly stay calm externally—but internally it\'s chaos.', weight_pattern: 0.5, weight_driver: 1.0, weight_reinforcement: 0.8, flag_set: ['ea_suppressed'] },
    { slug: 'q3_4', text: 'I\'m generally regulated—I can ride the wave.', weight_pattern: 0.3, weight_driver: 0.4, weight_reinforcement: 1.2, flag_set: ['ea_regulated'] },

    // Q3.5
    { slug: 'q3_5', text: 'Pursue—I need to close the gap immediately.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['pw_pursue'] },
    { slug: 'q3_5', text: 'Withdraw—I need space to feel safe.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['pw_withdraw'] },
    { slug: 'q3_5', text: 'It depends—sometimes I chase, sometimes I run.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 0.8, flag_set: ['pw_mixed'] },
    { slug: 'q3_5', text: 'Freeze—I can\'t do either, I just shut down.', weight_pattern: 0.5, weight_driver: 0.9, weight_reinforcement: 0.9, flag_set: ['pw_frozen'] },

    // Q3.6
    { slug: 'q3_6', text: 'Tell them immediately—they need to know.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['h_direct'] },
    { slug: 'q3_6', text: 'Hint and wait for them to figure it out.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['h_indirect'] },
    { slug: 'q3_6', text: 'Suppress it—bringing it up isn\'t worth the conflict.', weight_pattern: 0.7, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['h_suppress'] },
    { slug: 'q3_6', text: 'Punish subtly—cold shoulder, withdrawal, withholding.', weight_pattern: 0.5, weight_driver: 1.1, weight_reinforcement: 0.7, flag_set: ['h_punish'] },
    { slug: 'q3_6', text: 'Question whether I have the right to feel hurt.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['h_doubt'] },

    // Q3.7
    { slug: 'q3_7', text: 'Yes—it\'s like I\'m stuck in a script I can\'t rewrite.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 1.0, flag_set: ['la_high'] },
    { slug: 'q3_7', text: 'Sometimes—I notice after it\'s over.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 0.8, flag_set: ['la_moderate'] },
    { slug: 'q3_7', text: 'Rarely—I\'m too activated in the moment to observe.', weight_pattern: 1.0, weight_driver: 0.7, weight_reinforcement: 0.5, flag_set: ['la_low'] },

    // ============ PHASE 4 MODULES ============
    // Module A
    { slug: 'q4a_1', text: 'Multiple texts, calls, showing up—whatever it takes.', weight_pattern: 1.5, weight_driver: 0.3, weight_reinforcement: 0.2, flag_set: ['ma_intense'] },
    { slug: 'q4a_1', text: 'Increased contact but I try to seem casual about it.', weight_pattern: 1.1, weight_driver: 0.5, weight_reinforcement: 0.5, flag_set: ['ma_moderate'] },
    { slug: 'q4a_1', text: 'I pursue internally but force myself to wait.', weight_pattern: 0.8, weight_driver: 0.7, weight_reinforcement: 0.8, flag_set: ['ma_restrained'] },

    { slug: 'q4a_2', text: 'Self-respect—I\'ve done things I\'m not proud of.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.4, flag_set: ['ma_shame'] },
    { slug: 'q4a_2', text: 'The relationship—my pursuit pushes them away.', weight_pattern: 1.1, weight_driver: 0.6, weight_reinforcement: 0.5, flag_set: ['ma_pushes'] },
    { slug: 'q4a_2', text: 'Peace—I\'m never fully at rest, always scanning.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['ma_peace'] },

    { slug: 'q4a_3', text: 'Minutes.', weight_pattern: 1.4, weight_driver: 0.4, weight_reinforcement: 0.3, flag_set: ['ma_spiral_fast'] },
    { slug: 'q4a_3', text: 'Hours.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.6, flag_set: ['ma_spiral_hours'] },
    { slug: 'q4a_3', text: 'I can usually talk myself down.', weight_pattern: 0.6, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ma_spiral_managed'] },

    // Module B
    { slug: 'q4b_1', text: 'Emotional demands—they want more than I can give.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['mb_demands'] },
    { slug: 'q4b_1', text: 'Conflict—I need to escape before I explode.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['mb_conflict'] },
    { slug: 'q4b_1', text: 'Closeness itself—too much intimacy feels suffocating.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['mb_closeness'] },

    { slug: 'q4b_2', text: 'Overwhelm—I\'m flooded and can\'t think.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['mb_overwhelm'] },
    { slug: 'q4b_2', text: 'Numbness—I\'ve shut everything down.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.4, flag_set: ['mb_numb'] },
    { slug: 'q4b_2', text: 'Relief—finally I can breathe.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['mb_relief'] },

    { slug: 'q4b_3', text: 'Pretend nothing happened.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.4, flag_set: ['mb_pretend'] },
    { slug: 'q4b_3', text: 'Give a short explanation but avoid the emotional part.', weight_pattern: 0.5, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['mb_minimize'] },
    { slug: 'q4b_3', text: 'Sometimes I don\'t fully come back.', weight_pattern: 0.3, weight_driver: 1.4, weight_reinforcement: 0.3, flag_set: ['mb_incomplete'] },

    // Module C
    { slug: 'q4c_1', text: 'If I\'m useful, they won\'t leave.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['mc_security'] },
    { slug: 'q4c_1', text: 'Being needed is how I feel valuable.', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['mc_worth'] },
    { slug: 'q4c_1', text: 'Guilt—if I don\'t, I feel like a bad partner.', weight_pattern: 1.1, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['mc_guilt'] },

    { slug: 'q4c_2', text: 'Uncomfortable—I don\'t know how to receive.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['mc_uncomfortable'] },
    { slug: 'q4c_2', text: 'Suspicious—what do they want in return?', weight_pattern: 0.7, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['mc_suspicious'] },
    { slug: 'q4c_2', text: 'Guilty—I should be the one giving.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['mc_guilty_receive'] },

    { slug: 'q4c_3', text: 'Significant—I\'m exhausted and angry beneath the surface.', weight_pattern: 1.3, weight_driver: 0.4, weight_reinforcement: 0.5, flag_set: ['mc_high_resentment'] },
    { slug: 'q4c_3', text: 'Some—it builds until I explode or shut down.', weight_pattern: 1.0, weight_driver: 0.6, weight_reinforcement: 0.6, flag_set: ['mc_moderate'] },
    { slug: 'q4c_3', text: 'Not much—I genuinely don\'t expect anything back.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['mc_low'] },

    { slug: 'q4c_4', text: 'No—that\'s my identity, my purpose.', weight_pattern: 1.4, weight_driver: 0.3, weight_reinforcement: 0.4, flag_set: ['mc_identity_dependent'] },
    { slug: 'q4c_4', text: 'I\'d feel lost but could probably adjust.', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 0.7, flag_set: ['mc_moderate_dependent'] },
    { slug: 'q4c_4', text: 'Yes—my value isn\'t just in what I do for others.', weight_pattern: 0.5, weight_driver: 0.6, weight_reinforcement: 1.1, flag_set: ['mc_secure'] },

    // Module D
    { slug: 'q4d_1', text: 'Shut down and comply to avoid conflict.', weight_pattern: 0.8, weight_driver: 0.8, weight_reinforcement: 0.6, flag_set: ['md_comply'] },
    { slug: 'q4d_1', text: 'Push back hard—I won\'t be controlled.', weight_pattern: 0.4, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['md_resist'] },
    { slug: 'q4d_1', text: 'Create secret distance while appearing present.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['md_covert'] },

    { slug: 'q4d_2', text: 'Them—I tend to defer or appease.', weight_pattern: 1.1, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['md_them'] },
    { slug: 'q4d_2', text: 'Me—I maintain the upper hand for safety.', weight_pattern: 0.4, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['md_me'] },
    { slug: 'q4d_2', text: 'It\'s a constant struggle—neither stable.', weight_pattern: 0.7, weight_driver: 0.9, weight_reinforcement: 0.7, flag_set: ['md_struggle'] },

    { slug: 'q4d_3', text: 'Essential—I\'d rather be alone than lose myself.', weight_pattern: 0.3, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['md_essential'] },
    { slug: 'q4d_3', text: 'Very—I need clear boundaries and my own space.', weight_pattern: 0.4, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['md_high'] },
    { slug: 'q4d_3', text: 'Moderate—I want closeness but not at the cost of me.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.8, flag_set: ['md_moderate'] },

    // Module E
    { slug: 'q4e_1', text: 'Conflict feels like passion—intensity = love.', weight_pattern: 0.5, weight_driver: 1.4, weight_reinforcement: 0.4, flag_set: ['me_drama_passion'] },
    { slug: 'q4e_1', text: 'Calm feels boring—I create problems to feel something.', weight_pattern: 0.4, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['me_calm_boring'] },
    { slug: 'q4e_1', text: 'I know it\'s unhealthy but stable feels fake or shallow.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_stable_fake'] },

    { slug: 'q4e_2', text: 'Days.', weight_pattern: 0.4, weight_driver: 1.5, weight_reinforcement: 0.3, flag_set: ['me_days'] },
    { slug: 'q4e_2', text: 'Weeks.', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_weeks'] },
    { slug: 'q4e_2', text: 'Months—I\'m working on appreciating stability.', weight_pattern: 0.6, weight_driver: 0.8, weight_reinforcement: 0.9, flag_set: ['me_months'] },

    { slug: 'q4e_3', text: 'My parents\' relationship—love was loud.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['me_origin_parents'] },
    { slug: 'q4e_3', text: 'My first love—it was a rollercoaster and nothing since compares.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['me_origin_first'] },
    { slug: 'q4e_3', text: 'Trauma—chaos feels familiar, almost safe.', weight_pattern: 0.5, weight_driver: 1.3, weight_reinforcement: 0.5, flag_set: ['me_origin_trauma'] },

    // Module F
    { slug: 'q4f_1', text: 'Rarely—I\'ve learned not to expect it.', weight_pattern: 1.0, weight_driver: 0.4, weight_reinforcement: 1.0, flag_set: ['mf_rarely'] },
    { slug: 'q4f_1', text: 'Sometimes—in the beginning, then it fades.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['mf_sometimes'] },
    { slug: 'q4f_1', text: 'I\'m not even sure what my needs are.', weight_pattern: 0.8, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['mf_unknown'] },

    { slug: 'q4f_2', text: 'Don\'t ask—my needs feel like a burden.', weight_pattern: 1.2, weight_driver: 0.3, weight_reinforcement: 0.7, flag_set: ['mf_dont_ask'] },
    { slug: 'q4f_2', text: 'Hint and hope they notice.', weight_pattern: 1.0, weight_driver: 0.5, weight_reinforcement: 0.8, flag_set: ['mf_hint'] },
    { slug: 'q4f_2', text: 'Ask, but feel guilty or apologize for needing.', weight_pattern: 1.1, weight_driver: 0.4, weight_reinforcement: 0.7, flag_set: ['mf_apologetic'] },

    { slug: 'q4f_3', text: 'Try harder to be noticed.', weight_pattern: 1.2, weight_driver: 0.4, weight_reinforcement: 0.6, flag_set: ['mf_try_harder'] },
    { slug: 'q4f_3', text: 'Withdraw into yourself.', weight_pattern: 0.6, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['mf_withdraw'] },
    { slug: 'q4f_3', text: 'Accept it as normal—this is just how it is.', weight_pattern: 0.8, weight_driver: 0.5, weight_reinforcement: 1.0, flag_set: ['mf_accept'] },

    // ============ PHASE 5 ============
    { slug: 'q5_1', text: '"I want deep connection" AND "Intimacy terrifies me."', weight_pattern: 0.8, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['ct_connect_fear'] },
    { slug: 'q5_1', text: '"I want to be chosen" AND "I push people away before they can choose me."', weight_pattern: 1.0, weight_driver: 0.9, weight_reinforcement: 0.5, flag_set: ['ct_chosen_push'] },
    { slug: 'q5_1', text: '"I want to trust fully" AND "I\'m always waiting for betrayal."', weight_pattern: 0.9, weight_driver: 0.6, weight_reinforcement: 1.0, flag_set: ['ct_trust_wait'] },
    { slug: 'q5_1', text: '"I want stability" AND "I get bored without intensity."', weight_pattern: 0.5, weight_driver: 1.2, weight_reinforcement: 0.6, flag_set: ['ct_stable_bored'] },
    { slug: 'q5_1', text: '"I want to be loved as I am" AND "I hide who I really am."', weight_pattern: 1.0, weight_driver: 0.7, weight_reinforcement: 0.8, flag_set: ['ct_loved_hide'] },

    { slug: 'q5_2', text: 'I want closeness but I create distance.', weight_pattern: 0.6, weight_driver: 1.2, weight_reinforcement: 0.5, flag_set: ['cv_close_distance'] },
    { slug: 'q5_2', text: 'I want peace but I create conflict.', weight_pattern: 0.6, weight_driver: 1.1, weight_reinforcement: 0.6, flag_set: ['cv_peace_conflict'] },
    { slug: 'q5_2', text: 'I want reciprocity but I over-give.', weight_pattern: 1.3, weight_driver: 0.3, weight_reinforcement: 0.6, flag_set: ['cv_reciprocity_give'] },
    { slug: 'q5_2', text: 'I want to leave but I stay.', weight_pattern: 0.9, weight_driver: 0.5, weight_reinforcement: 0.9, flag_set: ['cv_leave_stay'] },
    { slug: 'q5_2', text: 'I want to stay but I sabotage.', weight_pattern: 0.7, weight_driver: 1.0, weight_reinforcement: 0.6, flag_set: ['cv_stay_sabotage'] }
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
