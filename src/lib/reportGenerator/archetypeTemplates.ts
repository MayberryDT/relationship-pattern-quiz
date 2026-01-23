/**
 * Archetype Templates
 * Core content blocks for each primary archetype
 */

import type { PrimaryArchetype } from './types';

export interface ArchetypeTemplate {
        name: PrimaryArchetype;
        internal_id: string;
        core_fear_primary: string;
        loop_signature: string;

        // Free report content
        pattern_summary: string;
        activation_triggers: string[];
        loop_description: string;

        // Paid report content
        executive_summary: string;
        core_vulnerability_deep: string;
        protective_logic: string;

        // Timeline phases
        early_phase: string;
        middle_phase: string;
        stress_phase: string;
        breakdown_phase: string;

        // Blind spot
        blind_spot_description: string;

        // Going forward
        what_to_notice: string[];

        // NEW: Diagnostic snapshot defaults
        diagnostic_snapshot: {
                primary_trigger: string;
                primary_response: string;
                rupture_style: string;
                repair_style: string;
                aftermath: string;
                misread_risk: string;
        };

        // NEW: Trigger profile (ranked triggers with mind/body responses)
        trigger_profile: Array<{
                trigger: string;
                what_mind_says: string;
                what_body_does: string;
        }>;

        // NEW: Timeline checkpoints per phase
        timeline_checkpoints: {
                early: {
                        what_you_think: string;
                        what_you_do: string;
                        what_partner_experiences: string;
                        what_this_reinforces: string;
                };
                middle: {
                        what_you_think: string;
                        what_you_do: string;
                        what_partner_experiences: string;
                        what_this_reinforces: string;
                };
                stress: {
                        what_you_think: string;
                        what_you_do: string;
                        what_partner_experiences: string;
                        what_this_reinforces: string;
                };
                breakdown: {
                        what_you_think: string;
                        what_you_do: string;
                        what_partner_experiences: string;
                        what_this_reinforces: string;
                };
        };

        // NEW: Why advice typically fails
        why_advice_fails: string;
}

export const ARCHETYPE_TEMPLATES: Record<string, ArchetypeTemplate> = {
        'The Anxious Pursuer': {
                name: 'The Anxious Pursuer',
                internal_id: 'ANXIOUS_PURSUER',
                core_fear_primary: 'abandonment',
                loop_signature: 'Seek → Distance → Panic → Over-pursue → Confirm fear',

                pattern_summary: `Your pattern centers on a deep sensitivity to disconnection. When you sense distance, whether real or imagined, something in your system activates. You move toward connection with an urgency that often accelerates the very distance you fear. This is not neediness. It is a protective response that learned, somewhere along the way, that love requires vigilance, that safety requires proximity, and that silence often means danger.`,

                activation_triggers: [
                        'delayed responses or changes in communication patterns',
                        'a partner seeming distracted, distant, or emotionally unavailable',
                        'uncertainty about where you stand in the relationship',
                        'moments of calm that feel suspiciously quiet',
                        'any hint that your partner might be pulling away'
                ],

                loop_description: `The loop typically unfolds like this: you sense something is off, a slight withdrawal or shift in energy. Your system interprets this as threat. You reach out, seek reassurance, analyze their behavior for clues. The more you pursue, the more overwhelmed your partner may feel, creating the very distance you were trying to close. When they pull back further, your fear feels confirmed. You pursue harder. The cycle tightens.`,

                executive_summary: `Your primary pattern is The Anxious Pursuer, organized around a core fear of abandonment. Your system has learned to interpret distance as danger and responds by moving closer, often with an intensity that can inadvertently create the disconnection you most fear. This pattern likely includes elements of hypervigilance, reassurance-seeking, and difficulty tolerating uncertainty in relationships.`,

                core_vulnerability_deep: `At the center of this pattern is a belief that was installed early: that love is precarious, that people leave, and that your job is to prevent that. This is not irrational. It is a conclusion your system drew from experience. Perhaps you learned that attention had to be earned, that connection could vanish without warning, or that being "too much" was dangerous but being "too little" meant disappearing entirely.

The anxiety you feel is not about the current partner. It is about what the current partner represents: the possibility of being left again, of confirming the deep fear that you are not enough to make someone stay. Your nervous system still carries the imprint of earlier experiences where connection was unreliable, where you had to monitor carefully to stay safe.

This creates a painful bind. You want closeness, but closeness requires vulnerability. Vulnerability means risk. Risk means potential abandonment. So you stay alert, scanning for signs, trying to solve the relationship before it breaks.`,

                protective_logic: `The pursuit is not weakness. It is a form of protection that made sense once. If you could just get close enough, stay attuned enough, be responsive enough, maybe this time they would not leave. The hypervigilance served a purpose: it helped you detect threat early. The problem is that the threat detection system is now calibrated to a different time, a different relationship, a different set of circumstances. It sees danger where there may be none.`,

                early_phase: `In the beginning, you are often at your most magnetic. You are attentive, responsive, fully present. You remember details others forget. You prioritize the relationship, sometimes above everything else. Your partner feels seen, cherished, chosen. This is not manipulation. It is genuine. When you love, you love with your whole attention.

But even in this early phase, there are often subtle signs of what is to come. You may notice yourself tracking their responses, noting how quickly they text back, how enthusiastic they seem. You may feel a slight edge of anxiety even when things are going well, a sense that this could all disappear. The relationship feels precious, which also means it feels fragile.`,

                middle_phase: `As the relationship settles into routine, something shifts. The intensity of early connection naturally calms, as it does in all relationships. But for your pattern, this calming can feel like loss. A delayed text that would not have registered before now triggers a cascade of worry. A quiet evening feels like withdrawal. Your partner's regularity feels like distance.

You may find yourself working harder to bridge a gap that may not exist. You initiate more conversations about the relationship. You seek reassurance that things are okay. You analyze their behavior for clues. From your perspective, you are trying to maintain connection. From your partner's perspective, you may seem to be asking for something they thought they already gave.`,

                stress_phase: `Under stress, your pursuit accelerates. The more anxious you feel, the more you reach out. The more you reach out, the more your partner may need space. The more space they take, the more abandoned you feel. This is the grip of the loop.

You may find yourself doing things you later regret: checking their phone, asking the same question multiple times, showing up unannounced, sending multiple messages, cycling between reassurance-seeking and anger. These are not signs of dysfunction. They are signs of a nervous system in distress, trying to resolve unbearable uncertainty through action.

Conflict during this phase often follows a predictable script. You push to resolve things immediately because you cannot rest with things unfinished. Your partner may withdraw, needing space to process. Their withdrawal confirms your fear. Your pursuit intensifies. The rupture deepens.`,

                breakdown_phase: `Relationships with this pattern often end with a painful confirmation of the original fear. Whether your partner leaves because they feel overwhelmed, or you leave preemptively to avoid being left, the ending often feels like proof: you were right to be afraid.

What makes this particularly difficult is that your pursuit often played a role in the ending, but not in the way your inner critic suggests. It was not that you were "too much." It was that your nervous system's protective response created dynamics that were unsustainable. The pattern, not you, is what needs to change.

After the relationship ends, you may find yourself analyzing what went wrong, wondering if you could have done something differently, sometimes reaching out to the person even though it is over. The system is still trying to solve the problem of abandonment, even after the relationship has ended.`,

                blind_spot_description: `The hardest part of this pattern is that your awareness often does not stop the cycle. You may know, intellectually, that you are pursuing too hard, that your partner is not actually leaving, that your anxiety is out of proportion to the situation. But the knowing does not calm the feeling.

This is because the pattern operates below the level of conscious thought. By the time your prefrontal cortex catches up with a reasonable interpretation, your nervous system has already activated the pursuit response. You find yourself reaching for your phone before you have decided to do so. You hear yourself asking for reassurance again, even though you promised yourself you would not.

The loop feels right, even when you can see it is harmful. The vigilance feels necessary. The pursuit feels like the only option. Your system is not wrong for responding this way. It simply does not yet know another way.`,

                what_to_notice: [
                        'The moment you start scanning for signs of withdrawal, before you act on it',
                        'The physical sensation that precedes pursuit: the tightness in your chest, the urge to reach out',
                        'The difference between genuine connection-seeking and anxiety-driven reassurance-seeking',
                        'Moments when you interpret neutral signals as negative ones',
                        'The first 10% of the loop, before it has fully activated'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Distance or ambiguity in communication',
                        primary_response: 'Pursue, seek reassurance, analyze',
                        rupture_style: 'Urgent resolution pressure',
                        repair_style: 'Talk-through, process, seek closure',
                        aftermath: 'Rumination and re-contact impulse',
                        misread_risk: 'Neutral signals interpreted as abandonment'
                },

                trigger_profile: [
                        {
                                trigger: 'Distance or ambiguity',
                                what_mind_says: '"Something is wrong. They are pulling away. I need to fix this."',
                                what_body_does: 'Chest tightens, heart rate elevates, restless energy builds'
                        },
                        {
                                trigger: 'Delayed responses',
                                what_mind_says: '"They are thinking about leaving. This silence means something bad."',
                                what_body_does: 'Compulsive phone checking, difficulty concentrating'
                        },
                        {
                                trigger: 'Tone shifts',
                                what_mind_says: '"What did I do? They sound different. I need to know why."',
                                what_body_does: 'Hypervigilant scanning, jaw clenching, shallow breathing'
                        },
                        {
                                trigger: 'Partner needs space',
                                what_mind_says: '"Space means they are done with me. If I give space, they will leave."',
                                what_body_does: 'Urge to reach out, difficulty sitting still, sleep disruption'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"This feels right. I have finally found them."',
                                what_you_do: 'Prioritize them, track their responses, feel anxious even when things are good',
                                what_partner_experiences: 'Feeling deeply seen, perhaps unusually prioritized',
                                what_this_reinforces: 'The belief that vigilance keeps love alive'
                        },
                        middle: {
                                what_you_think: '"Something has changed. They seem distant. I need to close the gap."',
                                what_you_do: 'Initiate more conversations, seek reassurance, analyze their behavior',
                                what_partner_experiences: 'Feeling questioned, pressured to prove their feelings',
                                what_this_reinforces: 'The fear that normal calming equals rejection'
                        },
                        stress: {
                                what_you_think: '"I am losing them. I need to act now or it will be too late."',
                                what_you_do: 'Pursue harder, demand resolution, cycle between anger and desperation',
                                what_partner_experiences: 'Feeling overwhelmed, needing space, pulling back',
                                what_this_reinforces: 'The fear of abandonment feels confirmed'
                        },
                        breakdown: {
                                what_you_think: '"I was right. They left because I was too much."',
                                what_you_do: 'Analyze what went wrong, sometimes reach out even after ending',
                                what_partner_experiences: 'Relief from intensity, sometimes guilt',
                                what_this_reinforces: 'The belief that love is precarious and must be monitored'
                        }
                },

                why_advice_fails: 'Advice to "just relax" or "give them space" does not address the underlying nervous system activation. Your body interprets distance as danger before your mind can intervene. The problem is not insufficient willpower: it is that your threat detection system is calibrated to an earlier time when vigilance was necessary for survival.'
        },

        'The Protective Withdrawer': {
                name: 'The Protective Withdrawer',
                internal_id: 'PROTECTIVE_WITHDRAWER',
                core_fear_primary: 'engulfment',
                loop_signature: 'Closeness → Overwhelm → Withdraw → Partner pursues → Confirm threat',

                pattern_summary: `Your pattern centers on a deep need to preserve your sense of self. When intimacy intensifies or demands increase, something in your system signals danger. You create distance not because you do not want connection, but because closeness activates an ancient alarm designed to protect your autonomy. The walls you build were necessary once. Now they may be keeping out what you need most.`,

                activation_triggers: [
                        'emotional demands or expectations from a partner',
                        'feeling monitored, tracked, or accountable',
                        'conversations about the future or deepening commitment',
                        `a partner's visible distress that seems to require your response`,
                        'loss of alone time or personal space'
                ],

                loop_description: `The loop often unfolds like this: your partner moves closer, expressing need or seeking connection. Your system interprets this as pressure. You feel yourself contracting, pulling inward, needing space. You withdraw, sometimes physically, sometimes emotionally. Your partner senses the distance and pursues. Their pursuit feels like more pressure. You retreat further. The cycle tightens until rupture.`,

                executive_summary: `Your primary pattern is The Protective Withdrawer, organized around a core fear of losing yourself in relationship. Your system has learned to interpret closeness as potential engulfment and responds by creating distance, often at moments when your partner most needs connection. This pattern likely includes elements of emotional shutdown, difficulty with vulnerability, and a strong pull toward independence even within partnership.`,

                core_vulnerability_deep: `At the center of this pattern is a belief that intimacy is dangerous, that letting someone fully in means losing something essential about yourself. This is not avoidance of love. It is protection of self. Somewhere along the way, your system learned that closeness came with a cost: control, demands, the loss of your own emotional landscape.

Perhaps you grew up in an environment where emotional space was not respected, where your feelings were overridden by someone else's, where the price of connection was compliance. Or perhaps you learned that the people who loved you also overwhelmed you, that their love came with expectations you could never quite meet.

The walls you built were necessary. They allowed you to maintain a sense of who you are, separate from whoever was trying to merge with you. The problem is that those walls now rise automatically, even when the threat is not real, even when the person on the other side is not trying to consume you.`,

                protective_logic: `Withdrawal is not coldness. It is a form of protection that made sense once. If you could maintain enough distance, preserve enough autonomy, keep enough of yourself back, then you could stay intact. The shutting down served a purpose: it prevented you from being overwhelmed, from losing yourself in someone else's emotional demands.

The problem is that the protection system is now calibrated to a different time. It sees engulfment where there may be healthy closeness. It reads normal requests as excessive demands. It treats vulnerability as an existential threat.`,

                early_phase: `In the beginning, you are often intriguing to partners. There is something self-contained about you, a mystery, a sense that you do not need anyone too much. This can be attractive to people who have been in relationships where they felt overwhelmed by neediness.

You may be thoughtful, competent, emotionally self-sufficient. You show up for your partner in concrete ways. You are reliable. But even early on, there are signs of the pattern. You may avoid deep emotional conversations. You may prefer parallel activities to face-to-face intensity. You may need significant alone time that your partner does not quite understand.`,

                middle_phase: `As the relationship deepens, something in you starts to resist. It may be subtle at first: a slight preference for staying home instead of going to their family dinner, a resistance to merging friend groups, a creeping sense of being "crowded" even when your partner is being reasonable.

You may find yourself picking small fights as a way to create distance without having to name it. You may become irritable when your partner wants to discuss the relationship. You may start to feel that their emotional needs are excessive, even when they are quite normal.

From your perspective, you are trying to maintain balance. From your partner's perspective, you are becoming unreachable.`,

                stress_phase: `Under pressure, you retreat behind walls that feel like self-preservation. You go quiet. You become logistically present but emotionally absent. You may physically leave the room during conflict, needing to escape before you say something you regret or lose control of the interaction.

From the inside, this feels like survival. You are protecting yourself from being overwhelmed, from losing your center. From the outside, it looks like abandonment. Your partner is left reaching for someone who is no longer there.

Conflict during this phase often follows a predictable script. Your partner pursues, expressing hurt or frustration. You retreat, needing space. They pursue harder, interpreting your withdrawal as rejection. You feel more cornered. The rupture deepens.`,

                breakdown_phase: `Relationships with this pattern often end with your partner exhausted from trying to reach you, or with you leaving because you felt suffocated. Either way, the ending often confirms the original fear: closeness really is dangerous.

What makes this particularly painful is that you may genuinely love the person you are withdrawing from. You may want to give them what they need. But something in your system will not let you. By the time you realize you have pulled away too far, the distance may be too great to close.

After the relationship ends, you may feel relief, followed by a delayed grief. You may wonder if you could have tried harder, opened more. Or you may move quickly into a new relationship where you feel less pressure, less demand, less closeness.`,

                blind_spot_description: `The hardest part of this pattern is that your walls feel necessary in the moment. You are not choosing to withdraw as a strategy. You are responding to a genuine sense of threat. The overwhelm is real, even if the danger is not.

This is because the protective response operates faster than thought. By the time you recognize that your partner is not actually trying to control you, you have already retreated. By the time you understand that their request is reasonable, you have already shut down.

The loop feels right, even when you can see it is harmful. The distance feels necessary. The walls feel protective. Your system is not wrong for responding this way. It simply does not yet know that there is another way to stay intact while also staying close.`,

                what_to_notice: [
                        'The moment you start to feel "demanded upon," before you retreat',
                        'The physical sensation of overwhelm: the contracting, the urge to escape',
                        'The difference between genuine need for solitude and anxiety-driven withdrawal',
                        'Moments when you interpret normal closeness as engulfment',
                        'The first 10% of the shutdown, before it has fully activated'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Emotional demands or closeness pressure',
                        primary_response: 'Withdraw, shut down, create distance',
                        rupture_style: 'Silent retreat during conflict',
                        repair_style: 'Wait it out, avoid processing',
                        aftermath: 'Relief followed by delayed guilt',
                        misread_risk: 'Normal intimacy interpreted as engulfment'
                },

                trigger_profile: [
                        {
                                trigger: 'Emotional demands',
                                what_mind_says: '"This is too much. I need to get out of here."',
                                what_body_does: 'Chest tightens, feeling of suffocation, urge to leave'
                        },
                        {
                                trigger: 'Conversations about feelings',
                                what_mind_says: '"I do not have access to what they want from me right now."',
                                what_body_does: 'Going blank, dissociating, shutting down'
                        },
                        {
                                trigger: 'Partner pursuing closeness',
                                what_mind_says: '"They are trying to control me. I am losing myself."',
                                what_body_does: 'Contracting inward, becoming small, needing escape'
                        },
                        {
                                trigger: 'Loss of alone time',
                                what_mind_says: '"I cannot breathe. I need space to exist."',
                                what_body_does: 'Irritability, restlessness, picking small fights'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"This is nice. They respect my independence."',
                                what_you_do: 'Show up reliably but avoid deep emotional conversations',
                                what_partner_experiences: 'Intrigued by your self-containment, drawn to the mystery',
                                what_this_reinforces: 'The belief that distance keeps love manageable'
                        },
                        middle: {
                                what_you_think: '"They are getting too close. I am starting to feel crowded."',
                                what_you_do: 'Create subtle distance, resist merging, become irritable',
                                what_partner_experiences: 'Confusion about why you are pulling away',
                                what_this_reinforces: 'The fear that closeness leads to loss of self'
                        },
                        stress: {
                                what_you_think: '"I cannot do this right now. I need to escape."',
                                what_you_do: 'Go quiet, leave the room, become emotionally absent',
                                what_partner_experiences: 'Abandonment, reaching for someone who has vanished',
                                what_this_reinforces: 'The belief that emotional demands are overwhelming'
                        },
                        breakdown: {
                                what_you_think: '"They wanted too much. I could not give what they needed."',
                                what_you_do: 'Feel relief followed by grief, wonder if you could have tried harder',
                                what_partner_experiences: 'Exhaustion from trying to reach you',
                                what_this_reinforces: 'The belief that closeness is inherently dangerous'
                        }
                },

                why_advice_fails: 'Advice to "just open up" or "be more vulnerable" does not address the underlying nervous system response. Your body interprets closeness as threat before your mind can intervene. The problem is not insufficient effort: it is that your protection system was calibrated by experiences where intimacy came with a cost.'
        },

        'The Devoted Caretaker': {
                name: 'The Devoted Caretaker',
                internal_id: 'DEVOTED_CARETAKER',
                core_fear_primary: 'deprivation',
                loop_signature: 'Give → Deplete → Resent → Feel invisible → Give harder',

                pattern_summary: `Your pattern centers on the belief that love must be earned through usefulness. You give until you are empty, anticipate needs before they are spoken, and make yourself indispensable. Then you wonder why, despite everything you do, you feel invisible. The exhaustion you carry is not weakness. It is the weight of a role you were never meant to play alone.`,

                activation_triggers: [
                        'sensing that your partner needs something, even before they ask',
                        'feeling guilty when you rest or prioritize yourself',
                        'moments when your partner tries to care for you instead',
                        'any hint that you might not be needed',
                        'situations where you cannot fix or help'
                ],

                loop_description: `The loop often unfolds like this: you notice a need and move to fill it, often before anyone asks. You give time, energy, attention, labor. You track your partner's emotional state and adjust accordingly. Over time, you deplete yourself. Resentment builds, often unspoken. You feel unseen, taken for granted. Rather than voice your needs, you give harder, hoping they will finally notice what you are sacrificing. They often do not.`,

                executive_summary: `Your primary pattern is The Devoted Caretaker, organized around a core fear of being unneeded or invisible. Your system has learned that love is earned through service, that your value depends on your usefulness, and that receiving is far more dangerous than giving. This pattern likely includes elements of self-sacrifice, difficulty asking for needs, and a growing resentment that rarely gets expressed directly.`,

                core_vulnerability_deep: `At the center of this pattern is a belief that was installed early: that your needs are burdensome, that love is conditional on performance, and that the only safe position is to be the one giving more. This is not martyrdom. It is a survival strategy that made sense once.

Perhaps you grew up in an environment where your emotional needs were ignored unless you met someone else's first. Perhaps you learned that being helpful was the only reliable way to receive positive attention. Perhaps the only time you felt valued was when you were useful.

The giving is genuine. You truly want to care for the people you love. But underneath the giving is a desperate hope: that if you just do enough, they will finally see you, finally reciprocate, finally meet you the way you have been meeting them all along.`,

                protective_logic: `The caretaking is not weakness. It is a form of protection that made sense once. If you were useful, you had a reason to exist in the relationship. If you anticipated needs, you could prevent abandonment. If you gave without being asked, you could never be accused of being selfish or demanding.

The problem is that this strategy creates exactly what it fears. By never expressing needs, you train your partner not to notice them. By always giving, you establish a dynamic where receiving feels foreign. By making yourself indispensable, you become invisible as a person with desires of your own.`,

                early_phase: `In the beginning, you are often the dream partner. You are attentive, generous, anticipating needs before they are spoken. You create a cocoon of care around your partner. You remember what they like, surprise them with thoughtfulness, show up in ways that make them feel held.

This is not manipulation. It is genuine love expressed through service. But even early on, there are signs of the pattern. You may struggle to receive gifts or care. You may deflect compliments. You may already be tracking whether they are giving as much as you are, even as you tell yourself it does not matter.`,

                middle_phase: `As the relationship settles, the giving becomes compulsive. You cannot seem to stop, even when you are exhausted. Your partner may not even notice how much you do, because you have trained them to expect it. They ask for less, because you have already given before they could ask.

The resentment builds like sediment. You tell yourself you do not mind. You tell yourself love is selfless. But underneath, you are keeping score. You are waiting for them to notice, to reciprocate, to finally see all that you do. They often do not, because you have never taught them how.`,

                stress_phase: `Under stress, you give harder. When you are depleted, your response is often to deplete yourself further, as if more giving will finally solve the problem. You suppress your own needs so completely that you lose access to them. Then you wonder why you feel hollow.

The resentment may finally surface, often sideways: passive aggressive comments, unexplained coldness, sudden withdrawals. Or it may explode all at once, a flood of stored grievances that shocks your partner, who had no idea any of this was building.

Conflict during this phase often follows a predictable script. You either avoid conflict entirely, absorbing hurts to keep the peace, or you finally erupt with a list of everything you have sacrificed.`,

                breakdown_phase: `Relationships with this pattern often end with you depleted and bitter, wondering how you could give so much and receive so little. Or they end with your partner confused, not understanding what went wrong, because you never told them you were drowning.

What makes this particularly painful is that you often stay too long. You know you are unhappy, but you feel guilty leaving someone who depends on you. You may sacrifice years waiting for a reciprocity that never comes, hoping that this time they will finally see.

After the relationship ends, you may carry bitterness for a long time. Or you may move quickly into a new relationship and repeat the exact same pattern.`,

                blind_spot_description: `The hardest part of this pattern is that giving feels like love. You are not aware that you are depleting yourself because caretaking is so automatic it feels like breathing. You are not aware that you resent because you have suppressed resentment as unacceptable.

This is because the caretaking operates below conscious choice. By the time you notice you are exhausted, you have already given away your reserves. By the time you recognize resentment, it has been building for months.

The loop feels right, even when it is harming you. The giving feels like love. The self-sacrifice feels noble. Your system is not wrong for responding this way. It simply does not yet know that receiving is also love.`,

                what_to_notice: [
                        'The moment you move to give before checking if you have capacity',
                        'The physical sensation of depletion: the tiredness, the hollowness',
                        'The difference between genuine generosity and compulsive caretaking',
                        'Moments when you feel resentment but tell yourself you should not',
                        'The first 10% of the giving loop, before you have committed your energy'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Sensing a need you could fill',
                        primary_response: 'Give, anticipate, over-function',
                        rupture_style: 'Passive-aggressive eruption after long silence',
                        repair_style: 'Absorb blame, return to giving',
                        aftermath: 'Depletion, bitterness, repeat',
                        misread_risk: 'Partner independence interpreted as rejection'
                },

                trigger_profile: [
                        {
                                trigger: 'Partner has a need',
                                what_mind_says: '"I should handle this. They need me."',
                                what_body_does: 'Automatic movement toward helping, energy surge'
                        },
                        {
                                trigger: 'Opportunity to rest',
                                what_mind_says: '"I should not be idle. There is more I could be doing."',
                                what_body_does: 'Guilt, restlessness, compulsion to be useful'
                        },
                        {
                                trigger: 'Partner tries to care for you',
                                what_mind_says: '"This feels wrong. I do not know how to receive."',
                                what_body_does: 'Discomfort, deflection, urge to reciprocate immediately'
                        },
                        {
                                trigger: 'Feeling unseen despite effort',
                                what_mind_says: '"After everything I do, they still do not notice."',
                                what_body_does: 'Hollow chest, suppressed anger, exhaustion'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"I want to make them feel cared for."',
                                what_you_do: 'Anticipate needs, give generously, struggle to receive',
                                what_partner_experiences: 'Feeling cherished, cared for, perhaps a bit overwhelmed',
                                what_this_reinforces: 'The belief that giving equals being loved'
                        },
                        middle: {
                                what_you_think: '"I am doing so much. Why do I still feel empty?"',
                                what_you_do: 'Give harder, track the imbalance, suppress resentment',
                                what_partner_experiences: 'Expecting your giving, no longer noticing it',
                                what_this_reinforces: 'The fear that you are invisible without usefulness'
                        },
                        stress: {
                                what_you_think: '"I am exhausted but I cannot stop."',
                                what_you_do: 'Deplete yourself further, become passive-aggressive',
                                what_partner_experiences: 'Confusion about sudden coldness or eruptions',
                                what_this_reinforces: 'The belief that needs are burdensome and should be hidden'
                        },
                        breakdown: {
                                what_you_think: '"I gave everything and got nothing back."',
                                what_you_do: 'Leave bitter, or stay and repeat the pattern',
                                what_partner_experiences: 'Shock at grievances they never knew existed',
                                what_this_reinforces: 'The belief that love must be earned through sacrifice'
                        }
                },

                why_advice_fails: 'Advice to "just ask for what you need" does not address the underlying belief that your needs are burdensome. Your system learned that receiving is dangerous, that having needs makes you vulnerable. The problem is not insufficient communication: it is that asking feels like risking rejection.'
        },

        'The Chaos Magnet': {
                name: 'The Chaos Magnet',
                internal_id: 'CHAOS_MAGNET',
                core_fear_primary: 'abandonment',
                loop_signature: 'Intensity → Calm → Create drama → Rupture → Seek intensity',

                pattern_summary: `Your pattern centers on an unconscious equation: intensity equals love. Stability feels suspicious, even boring. When things calm, something in you wants to shake them up. You may create conflict to feel connection, or seek partners who keep you on edge. This is not self-sabotage. It is the only kind of love that felt real.`,

                activation_triggers: [
                        'extended periods of calm or routine in a relationship',
                        'a partner who is emotionally stable and predictable',
                        'moments when conflict has been resolved and nothing is happening',
                        'feeling like you know exactly what will happen next',
                        'boredom or a sense that the spark has died'
                ],

                loop_description: `The loop often unfolds like this: the relationship begins with intense attraction, all-consuming chemistry. Over time, it stabilizes. But stability feels wrong, like something is missing. You may pick a fight, create a crisis, push your partner to their edge. The drama surges, and suddenly you feel alive again. The rupture-repair cycle becomes the rhythm you trust, because consistency feels like absence.`,

                executive_summary: `Your primary pattern is The Chaos Magnet, organized around an equation learned early: that intensity is love and calm is abandonment in disguise. Your system has learned to seek volatility because predictability feels threatening, and to create conflict when connection seems too easy. This pattern likely includes elements of drama-seeking, difficulty with boredom, and a history of extremely passionate but ultimately unsustainable relationships.`,

                core_vulnerability_deep: `At the center of this pattern is a nervous system that was calibrated by chaos. Perhaps love in your early environment was loud, unpredictable, marked by high highs and low lows. Perhaps you learned that conflict was the prelude to connection, that making up was the only reliable intimacy. Perhaps calm felt like neglect.

The intensity you seek is not dysfunction. It is the only template for love your system recognizes. When things are quiet, your nervous system scans for danger. When things are stable, something in you does not trust it. The chemistry of chaos feels like home, even when it is destroying you.

This creates a painful bind. You want lasting love, but lasting love requires stability. Stability feels like death. So you oscillate between partners who offer the intensity you crave and the eventual burnout that intensity guarantees.`,

                protective_logic: `The chaos is not self-destruction. It is a form of protection that made sense once. If things were always in motion, you never had to depend on something stable. If you could create drama, you could control the timeline of rupture. Intensity is a distraction from the void underneath.

The problem is that this strategy prevents the very thing you want. By creating instability, you make lasting love impossible. By needing the high of reconciliation, you require repeated ruptures.`,

                early_phase: `In the beginning, you burn bright. The connection is electric, all-consuming. You and your partner exist in a private universe where every moment is heightened. You may talk for hours, stay up all night, feel more seen than you have ever felt.

This intensity is not fake. It is genuine chemistry, genuine connection. But even early on, there are signs of the pattern. You may move quickly toward commitment. You may feel bored when things settle. You may test your partner early, pushing to see if they can handle your fire.`,

                middle_phase: `As the relationship stabilizes, something feels wrong. The absence of adrenaline registers as absence of love. You may find yourself restless, irritable, picking at small grievances just to feel the charge of conflict.

You may not be aware that you are creating drama. From your perspective, the conflict is real. Your partner did something that upset you. But underneath, your system is seeking the intensity that makes love feel real. The fight is the point, even if you do not recognize it.`,

                stress_phase: `Under stress, you escalate. Drama becomes connection. Fighting becomes foreplay. You may push your partner to their edge just to see if they are still there, still engaged, still invested enough to fight for you.

The rupture-repair cycle becomes the only rhythm you trust. The reconciliation is always sweet. The reunion after conflict confirms that love still exists. But each cycle extracts a cost. Your partner becomes exhausted. The ruptures become harder to repair.

Conflict during this phase is often intense, passionate, and leaves destruction in its wake. Things may be said that cannot be unsaid. Lines may be crossed.`,

                breakdown_phase: `Relationships with this pattern often end in exhaustion or explosion. Either your partner can no longer sustain the volatility, or a rupture goes too far to repair. Either way, the ending is often dramatic, matching the intensity of the connection.

What makes this particularly painful is that the love was real. The passion was genuine. But the pattern made it unsustainable. You are left wondering if you are simply too much for anyone to love for long.

After the relationship ends, you may feel a profound emptiness. The intensity is gone, and you do not know how to exist in the quiet. You may quickly seek another intense connection, or withdraw into numbed isolation.`,

                blind_spot_description: `The hardest part of this pattern is that stability genuinely feels wrong. You are not choosing to create chaos. You are responding to a nervous system that was wired by chaos and does not recognize calm as safe.

This is because the pattern operates at the level of affect, not cognition. By the time you recognize you are creating drama, you are already in the middle of it. The boredom is real. The urge to escalate is real. Your system does not yet know how to feel connected without intensity.

The loop feels right, even when it is destroying your relationships. The intensity feels like love. The calm feels like death. Your system is not wrong for responding this way. It simply does not yet know another template.`,

                what_to_notice: [
                        'The moment boredom starts to feel like threat, before you act on it',
                        'The physical restlessness when things have been calm for a while',
                        'The difference between genuine grievance and manufactured conflict',
                        'Moments when you escalate and later cannot remember why',
                        'The first 10% of the drama-seeking impulse, before it fully activates'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Extended calm or stability',
                        primary_response: 'Create drama, escalate, test',
                        rupture_style: 'Intense, passionate, destructive',
                        repair_style: 'Reconciliation becomes intimacy',
                        aftermath: 'Emptiness, seeking next intensity',
                        misread_risk: 'Stability interpreted as absence of love'
                },

                trigger_profile: [
                        {
                                trigger: 'Extended calm',
                                what_mind_says: '"Something is wrong. Where is the connection?"',
                                what_body_does: 'Restlessness, irritability, urge to shake things up'
                        },
                        {
                                trigger: 'Predictable partner',
                                what_mind_says: '"This is boring. The spark is gone."',
                                what_body_does: 'Boredom, scanning for grievances, picking at small things'
                        },
                        {
                                trigger: 'Conflict resolution',
                                what_mind_says: '"Now what? The intensity is gone."',
                                what_body_does: 'Emptiness, searching for next charge'
                        },
                        {
                                trigger: 'Stable routine',
                                what_mind_says: '"This cannot be love. Real love feels different."',
                                what_body_does: 'Testing partner, pushing boundaries, starting fights'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"This is incredible. I have never felt anything like this."',
                                what_you_do: 'Burn bright, move fast, exist in heightened state',
                                what_partner_experiences: 'Electric chemistry, all-consuming attention',
                                what_this_reinforces: 'The belief that intensity equals love'
                        },
                        middle: {
                                what_you_think: '"Something is missing. They seem different now."',
                                what_you_do: 'Pick fights, create drama, test their investment',
                                what_partner_experiences: 'Confusion about sudden conflicts',
                                what_this_reinforces: 'The fear that calm means abandonment'
                        },
                        stress: {
                                what_you_think: '"I need to know they still care."',
                                what_you_do: 'Escalate, push to the edge, break and reconcile',
                                what_partner_experiences: 'Exhaustion, walking on eggshells, passionate reunions',
                                what_this_reinforces: 'The rupture-repair cycle as only reliable intimacy'
                        },
                        breakdown: {
                                what_you_think: '"I am too much. No one can love me for long."',
                                what_you_do: 'Seek next intensity or withdraw into emptiness',
                                what_partner_experiences: 'Relief mixed with grief at lost potential',
                                what_this_reinforces: 'The belief that love requires volatility'
                        }
                },

                why_advice_fails: 'Advice to "calm down" or "stop creating drama" does not address the underlying nervous system wiring. Your body equates stability with danger because it was calibrated by chaos. The problem is not insufficient self-control: it is that your system genuinely does not recognize calm as safe.'
        },

        'The Invisible Partner': {
                name: 'The Invisible Partner',
                internal_id: 'INVISIBLE_PARTNER',
                core_fear_primary: 'deprivation',
                loop_signature: 'Need → Suppress → Hint → Unmet → Confirm invisibility',

                pattern_summary: `Your pattern centers on a history of suppressed needs. You have learned that asking for too much drives people away, so you ask for nothing, and receive exactly that. The loneliness you feel in relationships is not about your partner. It is about the parts of you that never get to exist within the relationship.`,

                activation_triggers: [
                        'moments when you have a genuine emotional need',
                        'situations that would require you to ask for something directly',
                        'feeling overlooked, even in small ways',
                        'seeing your partner give attention to others that you want for yourself',
                        'recognizing that you have been accommodating at your own expense'
                ],

                loop_description: `The loop often unfolds like this: you have a need but immediately judge it as too much, too demanding, too likely to push them away. You suppress it, or hint at it so subtly that no one notices. The need goes unmet. You feel unseen, confirming your belief that your needs do not matter. Rather than voice the need more directly, you shrink further. The invisibility deepens.`,

                executive_summary: `Your primary pattern is The Invisible Partner, organized around a core fear of being too much or too burdensome. Your system has learned that needs should be hidden, that asking leads to rejection, and that the safest position is to want nothing at all. This pattern likely includes elements of self-erasure, chronic loneliness within relationships, and a silent resentment that rarely finds words.`,

                core_vulnerability_deep: `At the center of this pattern is a belief that was installed early: that your needs are illegitimate, that you take up too much space, that love depends on not requiring anything. This is not modesty. It is survival learned in an environment where having needs was punished or ignored.

Perhaps you grew up invisible, your emotional reality unwitnessed by caregivers who were too absorbed in their own lives. Perhaps you learned that the squeaky wheel gets silence, not grease. Perhaps the only way to maintain connection was to stop needing.

The invisibility is now automatic. You do not consciously hide. You simply do not occur to yourself as someone whose needs matter. By the time you recognize you are lonely, you may have been lonely for years.`,

                protective_logic: `The shrinking is not passivity. It is a form of protection that made sense once. If you never asked, you could never be refused. If you never showed up with demands, you could never be rejected for having them. If you made yourself small enough, maybe they would stay.

The problem is that this strategy guarantees the deprivation it fears. By never expressing needs, you train your partner not to meet them. By never being visible, you never get to be loved as you actually are.`,

                early_phase: `In the beginning, you are often easy to be with. Low-maintenance, adaptable, never demanding. You seem to have no sharp edges, no inconvenient needs. You fit wherever you are placed. Your partner feels like they have found someone remarkably compatible.

This is not fake. You genuinely are easy to be with, because you have trained yourself to want nothing that might create friction. But even early on, there are signs of the pattern. You may defer to your partner's preferences. You may struggle to name what you actually want. You may feel invisible even when you are being looked at.`,

                middle_phase: `As the relationship deepens, your absence of presence creates a curious void. Your partner may realize they do not really know you, because you have never fully shown up. They know what you do not want, because you accommodate around it. They do not know what you desire, because you have not told them.

You meet their needs while yours wither in silence. The loneliness grows. You may not even recognize it as loneliness, because you are technically not alone. But the parts of you that need, that want, that have preferences, those parts are alone.`,

                stress_phase: `Under stress, you disappear. You minimize your pain, rationalize their neglect, convince yourself it is fine. The loneliness you feel is the loneliness of being unseen by someone who sleeps beside you.

You may hint at your needs, hoping they will notice without you having to speak directly. They rarely do. Or you may finally voice a need, but so apologetically that it does not land. Either way, the need goes unmet, and you have more evidence that you are invisible.

Conflict during this phase is rare, because you avoid it. You absorb hurts rather than name them. When conflict does occur, you often capitulate to restore peace.`,

                breakdown_phase: `Relationships with this pattern often end quietly. The passion does not explode; it fizzles. You may realize one day that you have not been in a relationship so much as standing beside one. Or your partner may leave, never having known you were struggling, because you never told them.

What makes this particularly painful is that you may blame yourself for not speaking up, adding shame to the already-heavy burden. Or you may stay in relationships that do not nourish you, because you do not believe you deserve more.

After the relationship ends, you may feel a strange kind of relief, finally able to exist without arranging yourself around someone else. Or you may carry the loneliness into the next relationship unexamined.`,

                blind_spot_description: `The hardest part of this pattern is that your needs are invisible even to yourself. You are not consciously hiding. You have simply lost access to what you actually want, what you actually need, who you actually are beneath the accommodations.

This is because the suppression operates before conscious thought. By the time a need rises to awareness, it has already been filtered through a system that asks: is this acceptable? Will this be too much? Can I justify wanting this? Often the need never makes it through.

The loop feels right, even when it is leaving you starved. The shrinking feels safe. The invisibility feels protective. Your system is not wrong for responding this way. It simply does not yet know that visibility is survivable.`,

                what_to_notice: [
                        'The moment you dismiss a need before fully recognizing it',
                        'The physical sensation of shrinking: the holding back, the swallowing of words',
                        'The difference between genuine flexibility and compulsive accommodation',
                        'Moments when you feel lonely while physically with your partner',
                        'The first 10% of the suppression, before you have already hidden'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Having a genuine emotional need',
                        primary_response: 'Suppress, hint, accommodate',
                        rupture_style: 'Quiet withdrawal or capitulation',
                        repair_style: 'Avoid conflict, restore peace at any cost',
                        aftermath: 'Chronic loneliness, relief at endings',
                        misread_risk: 'Partner attention elsewhere interpreted as proof of worthlessness'
                },

                trigger_profile: [
                        {
                                trigger: 'Having a need',
                                what_mind_says: '"This is too much. They will leave if I ask for this."',
                                what_body_does: 'Swallowing words, shrinking, holding back'
                        },
                        {
                                trigger: 'Feeling overlooked',
                                what_mind_says: '"See? My needs do not matter. I should not have expected anything."',
                                what_body_does: 'Hollowness, resignation, quiet withdrawal'
                        },
                        {
                                trigger: 'Partner asks what you want',
                                what_mind_says: '"I do not know. I have not thought about what I want in so long."',
                                what_body_does: 'Blankness, discomfort, deferring to their preference'
                        },
                        {
                                trigger: 'Seeing partner attend to others',
                                what_mind_says: '"They give to everyone else what they never give to me."',
                                what_body_does: 'Silent resentment, feeling small, not voicing it'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"I do not want to be difficult. I want them to like me."',
                                what_you_do: 'Be easy, adaptable, defer to their preferences',
                                what_partner_experiences: 'Finding someone remarkably compatible and low-maintenance',
                                what_this_reinforces: 'The belief that invisibility keeps love stable'
                        },
                        middle: {
                                what_you_think: '"I am lonely but I cannot say why."',
                                what_you_do: 'Hint at needs, suppress them, feel unseen',
                                what_partner_experiences: 'Not really knowing you, sensing something is missing',
                                what_this_reinforces: 'The fear that expressing needs leads to rejection'
                        },
                        stress: {
                                what_you_think: '"It is fine. I should not expect more."',
                                what_you_do: 'Disappear further, rationalize neglect, avoid conflict',
                                what_partner_experiences: 'Confusion about your withdrawal, unaware of your pain',
                                what_this_reinforces: 'The belief that your needs are invisible and illegitimate'
                        },
                        breakdown: {
                                what_you_think: '"I was never really there to begin with."',
                                what_you_do: 'Leave quietly or stay invisible, carry loneliness forward',
                                what_partner_experiences: 'Shock that you were struggling, never having known',
                                what_this_reinforces: 'The belief that you are fundamentally alone even in relationship'
                        }
                },

                why_advice_fails: 'Advice to "just speak up" does not address the underlying belief that your needs are illegitimate. Your system suppresses needs before they even reach awareness. The problem is not insufficient courage: it is that you genuinely do not know what you need because the suppression is that deep.'
        },

        'The Guarded Heart': {
                name: 'The Guarded Heart',
                internal_id: 'GUARDED_HEART',
                core_fear_primary: 'betrayal',
                loop_signature: 'Trust → Vulnerability → Hypervigilance → Wall → Confirm distrust',

                pattern_summary: `Your pattern centers on a history of betrayal, either dramatic or accumulated. You have learned that trust is dangerous, that vulnerability invites harm, and that the only safety lies in never fully believing anyone. The hypervigilance that exhausts you now is the same vigilance that once protected you from worse.`,

                activation_triggers: [
                        `any inconsistency in your partner's story or behavior`,
                        'reminders of past betrayals',
                        'moments when trust is explicitly requested',
                        'your partner forming close relationships with others',
                        'situations that require you to rely on someone'
                ],

                loop_description: `The loop often unfolds like this: you begin to trust, perhaps against your better judgment. Vulnerability increases, and with it, vigilance. You start scanning for danger, for inconsistencies, for proof that this one will hurt you too. Often, you find something, or interpret something, as confirmation. The walls go up. Your partner, confused, either retreats or pushes, and either response confirms your distrust.`,

                executive_summary: `Your primary pattern is The Guarded Heart, organized around a core fear of betrayal. Your system has learned to scan constantly for danger, to test trust before extending it, and to maintain walls that protect but also isolate. This pattern likely includes elements of hypervigilance, difficulty forgiving, and a deep conviction that letting someone in will end in harm.`,

                core_vulnerability_deep: `At the center of this pattern is not paranoia but experience. You have been hurt before, perhaps profoundly. The vigilance is not irrational; it is a reasonable response to what you have been through. Your system learned that trust is dangerous because, for you, it was.

Perhaps you were betrayed by someone who was supposed to protect you. Perhaps you were cheated on, lied to, abandoned without warning. Perhaps you watched someone else be destroyed by misplaced trust and resolved never to make the same mistake.

The walls you built protected you from further harm. They helped you survive. The problem is that they now rise automatically, even when the person in front of you is not the person who hurt you. Your past is defending itself against a present that may not deserve the same defenses.`,

                protective_logic: `The hypervigilance is not cynicism. It is a form of protection that made sense once. If you could see the betrayal coming, it would not destroy you. If you never fully trusted, you could never be fully devastated. The watching was your shield.

The problem is that watching for danger often creates it. Your partner feels surveilled and becomes defensive. Your tests create the very dynamics you were trying to prevent. Your walls keep you safe but also keep you alone.`,

                early_phase: `In the beginning, you are often cautiously optimistic. You want to believe that this one is different. But even as you hope, part of you is watching, waiting for the slip that reveals who they really are. Every inconsistency is a data point.

You may move slowly, protecting yourself by controlling the pace. Or you may dive in, hoping to disprove your own expectations. Either way, the scanner is running in the background, looking for evidence of the betrayal you know is coming.`,

                middle_phase: `As the relationship deepens, your vigilance often intensifies rather than relaxes. The more you have to lose, the more carefully you watch. You may create tests your partner does not know they are taking. You may hold back pieces of yourself, insurance against eventual betrayal.

You may find yourself unable to forget small inconsistencies. A lie that was forgiven consciously stays stored in your body, adding to a case you are building without realizing it. Your partner may feel like they are constantly on trial, never quite passing your tests.`,

                stress_phase: `Under stress, the walls go up completely. Your partner, who may have been trusted yesterday, becomes a potential threat today. You may see evidence of betrayal even when none exists. You interpret through the lens of your history rather than through the reality of the present.

Your partner feels like they cannot win. No reassurance is enough. No consistency is trusted. The very efforts they make to prove themselves become suspicious. Why are they trying so hard? What are they hiding?

Conflict during this phase often involves accusations, proof-seeking, and an inability to accept explanations at face value.`,

                breakdown_phase: `Relationships with this pattern often end with your trust exhausted or with your partner leaving, worn out from trying to prove themselves. Either way, the ending often confirms the original fear: you were right not to trust.

What makes this particularly painful is that sometimes the betrayal you feared actually occurs, reinforcing the pattern. And sometimes it does not, but your vigilance drove them away anyway. It can be impossible to know which happened, leaving you with no closure.

After the relationship ends, you may feel validated and devastated at once. You may close further, vowing never again. Or you may recognize the pattern and not know how to escape it.`,

                blind_spot_description: `The hardest part of this pattern is that your vigilance feels like sanity. You are not being paranoid; you are being careful. You are not creating problems; you are identifying real risks. The watching feels necessary because it once was necessary.

This is because the scanner operates faster than trust can form. By the time you might relax into connection, your system has already logged seventeen reasons to stay alert. The past is actively interpreting the present, and it does not trust you to do so safely.

The loop feels right, even when it is isolating you. The walls feel protective. The hypervigilance feels wise. Your system is not wrong for responding this way. It simply does not yet know that some people can be trusted.`,

                what_to_notice: [
                        'The moment you start building a case against them, before it is fully formed',
                        'The physical sensation of vigilance: the tension, the scanning',
                        'The difference between reasonable discernment and hypervigilant monitoring',
                        'Moments when you interpret neutral information as threatening',
                        'The first 10% of the wall building, before you have fully retreated'
                ],

                diagnostic_snapshot: {
                        primary_trigger: 'Any perceived inconsistency or vulnerability',
                        primary_response: 'Scan, test, build walls',
                        rupture_style: 'Accusations and proof-seeking',
                        repair_style: 'Require extensive proof before trust returns',
                        aftermath: 'Validated and devastated, walls higher',
                        misread_risk: 'Neutral behavior interpreted as hidden threat'
                },

                trigger_profile: [
                        {
                                trigger: 'Inconsistency in partner behavior',
                                what_mind_says: '"What are they hiding? This does not add up."',
                                what_body_does: 'Tension, scanning, hypervigilance activates'
                        },
                        {
                                trigger: 'Partner close to others',
                                what_mind_says: '"They are going to betray me. This is how it starts."',
                                what_body_does: 'Chest tightening, urge to investigate, walls rising'
                        },
                        {
                                trigger: 'Being asked to trust',
                                what_mind_says: '"Trust is how you get hurt. I cannot afford to let my guard down."',
                                what_body_does: 'Resistance, creating tests, holding back'
                        },
                        {
                                trigger: 'Reminders of past betrayal',
                                what_mind_says: '"See? This is what happens when you trust people."',
                                what_body_does: 'Full wall activation, shutdown, defensive posture'
                        }
                ],

                timeline_checkpoints: {
                        early: {
                                what_you_think: '"Maybe this one is different. But I need to be careful."',
                                what_you_do: 'Hope cautiously, scan for danger, note inconsistencies',
                                what_partner_experiences: 'Sensing they are being watched, tested',
                                what_this_reinforces: 'The belief that vigilance prevents betrayal'
                        },
                        middle: {
                                what_you_think: '"The more I have to lose, the more dangerous this becomes."',
                                what_you_do: 'Intensify watching, create tests, hold back pieces of yourself',
                                what_partner_experiences: 'Feeling on trial, never quite passing',
                                what_this_reinforces: 'The fear that trust leads to destruction'
                        },
                        stress: {
                                what_you_think: '"I knew it. They are not safe. No one is safe."',
                                what_you_do: 'See betrayal evidence everywhere, accuse, demand proof',
                                what_partner_experiences: 'Exhaustion, feeling they cannot win',
                                what_this_reinforces: 'The belief that opening up invites harm'
                        },
                        breakdown: {
                                what_you_think: '"I was right not to trust. This proves it."',
                                what_you_do: 'Close further, vow never again, or recognize pattern',
                                what_partner_experiences: 'Worn out from proving themselves',
                                what_this_reinforces: 'The belief that walls are necessary for survival'
                        }
                },

                why_advice_fails: 'Advice to "just trust" does not address the underlying reality that for you, trust was dangerous. Your vigilance is not paranoia: it is learned protection. The problem is not insufficient faith: it is that your system was calibrated by experiences where trust led to harm.'
        }
};

export default ARCHETYPE_TEMPLATES;
