# Relationship Pattern Diagnostic: Design Blueprint

This document outlines the architecture, questions, and patterns for the Relationship Pattern Diagnostic.

> Flow: Discovery → Initial Results → Paywall → Comprehensive Personal Narrative

---

## Design Objectives

- Deliver a high-specificity result that feels unsettlingly accurate.
- Build "loops" of psychological tension that demand the full report to resolve.
- Create deep emotional investment through personalized feedback.

---

## Quiz Architecture

The diagnostic is structured into six layers of deepening psychological inquiry:

1.  **Layer 1: The Surface Pattern (8 questions)**
    Establish recognition of "the loop." Relatability and pattern identification.
2.  **Layer 2: Core Vulnerabilities (7 questions)**
    Identify the underlying fears and beliefs driving behaviors.
3.  **Layer 3: Biological Safeguards (7 questions)**
    Map how your system responds when closeness feels like a threat.
4.  **Layer 4: Deep Dive Modules (Adaptive)**
    Branching logic based on earlier signals. Focuses on your specific "blind spots."
5.  **Layer 5: Internal Contradiction (2 questions)**
    Expose the paradox: what you want vs. what you actually do.
6.  **Layer 6: Moment of Recognition (1 reflection)**
    Consolidate awareness and personal ownership.

---

# LAYER 1: The Surface Pattern
**Establishing the "this keeps happening" recognition.**

### Q1.1: The Recurring Narrative
> **If you had to describe the "story" that defines your relationship history, which would you recognize first?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) I pour everything into people, yet I consistently end up feeling invisible or exploited. | Self-erasure pattern | `p_over_giver` |
| B) Things begin with intense promise, but I am always bracing for the inevitable moment they leave. | Precarious bonding | `p_abandonment` |
| C) As soon as the connection becomes truly serious, I feel a biological urge to pull back and protect my space. | Autonomy defense | `p_avoidant` |
| D) I have a "magnet" for people who are incapable of meeting me halfway: the chaotic, the unavailable, or the withholding. | Selection glitch | `p_selection` |
| E) The relationship starts like a wildfire. It burns bright and fast, then inevitably turns to ash. | Intensity loop | `p_intensity` |

---

### Q1.2: The Invisible Thread
> **Think back to your last three major endings. What is the common bridge between them?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) I was told I was "too much": too intense, too needy, or too emotionally demanding. | Pursued → Left | `e_too_much` |
| B) I was the one who fled. I felt the walls closing in and had to leave to regain my breath. | The Flight | `e_fled` |
| C) It didn't end with a bang, but a slow fizzle. The passion died and neither of us fought to save it. | The Fade | `e_fizzle` |
| D) There was a fundamental break in trust: lies, betrayal, or a total collapse of integrity. | Betrayal | `e_betrayal` |
| E) I stayed long after I knew it was over, clinging to a memory of who they used to be. | Overstayed | `e_overstayed` |

---

### Q1.3: The Initial Hook
> **In the first ten minutes of meeting someone new, what is the specific energy that makes you think, "I have to know them"?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) A sense that they are slightly out of reach or difficult to read. | Challenge attraction | `a_unavailable` |
| B) They seem wounded or complicated. I feel an immediate desire to "solve" them. | Caretaker hook | `a_wounded` |
| C) Pure, unadulterated intensity: a chemistry that feels almost electric. | Chemical hook | `a_intensity` |
| D) They feel like a harbor: safe, stable, and the opposite of my past chaos. | Safety hook | `a_safe` |
| E) We are alike in ways that feel uncanny. It feels like finding a mirror. | Mirror attraction | `a_mirror` |

---

### Q1.4: The Role You Play
> **Regardless of the partner, you tend to inhabit which role more often?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) The Anchor: I am the one who gives more, whether it is emotional or practical. | The Giver | `r_giver` |
| B) The Island: I keep my emotional distance even when I long for closeness. | The Distancer | `r_distancer` |
| C) The Hunter: I am always the one chasing the connection, wanting more depth. | The Pursuer | `r_pursuer` |
| D) The Watcher: I am hyper-aware of shifts in their tone or mood, looking for the "off" signal. | The Vigilant | `r_watcher` |
| E) The Peacekeeper: I absorb the tension to prevent an explosion, often losing my own voice. | The Appeaser | `r_peacekeeper` |

---

### Q1.5: The Breakdown Point
> **Where does the machinery of your relationships usually fall apart?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) At the moment I need reassurance and they choose to pull away. | The Reassurance Gap | `b_reassurance` |
| B) At the moment they get too close and I feel my system shutting down. | Closeness Intolerance | `b_closeness` |
| C) When I realize I have given so much that I have literally nothing left for myself. | Total Depletion | `b_depletion` |
| D) When the pedestal breaks and I realize they aren't who I thought they were. | Disillusionment | `b_disillusion` |
| E) When the same argument happens for the thousandth time and I realize we are stuck. | The Loop Conflict | `b_loop` |

---

### Q1.6: The Reaction to Stability
> **When a relationship truly starts to feel secure and stable, which sensation shows up?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Relief. I can finally exhale because the threat is gone. | Secure Lean | `s_relief` |
| B) Suspicion. I am waiting for the other shoe to drop, because this can't be real. | Anxious Vigilance | `s_suspicious` |
| C) Boredom. Without the drama or intensity, I wonder if the connection is even there. | Chaos-Bonded | `s_bored` |
| D) Claustrophobia. I feel like I am losing my edge or my freedom. | Avoidant Alarm | `s_trapped` |
| E) A testing impulse. I find myself starting small fights just to see if they'll stay. | The Test | `s_testing` |

---

### Q1.7: The Level of Awareness
> **Before starting this diagnostic, how much did you recognize these repetitions?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) High awareness. I've known for years. I just can't seem to stop it. | High | `aw_high` |
| B) Moderate awareness. I noticed the pattern, but I didn't understand the "why." | Moderate | `aw_moderate` |
| C) Emerging awareness. I am just starting to connect the dots now. | Emerging | `aw_emerging` |
| D) Minimal awareness. I believed every relationship was just "bad luck" until now. | Minimal | `aw_low` |

---

### Q1.8: The Core Frustration
> **What is the most painful part of your relationship history?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) That I keep choosing people who cannot love me back. | Selection pain | `fr_selection` |
| B) That I can see exactly what I'm doing and still can't stop doing it. | Behavioral pain | `fr_behavior` |
| C) That I am the only one ever doing the work of the relationship. | Reciprocity pain | `fr_reciprocity` |
| D) That I push away the only people who actually wanted to stay. | Sabotage pain | `fr_sabotage` |
| E) That I don't feel in control of my own romantic fate. | Confusion pain | `fr_confusion` |

---

# LAYER 2: Core Vulnerabilities
**Identifying the "submerged" belief system.**

### Q2.1: The Primal Fear
> **What is the worst-case scenario your system is trying to protect you from?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Being eventually discarded. I assume everyone leaves eventually. | Abandonment | `f_abandon` |
| B) Being exploited. I fear that my vulnerability will be used as a weapon. | Mistrust | `f_mistrust` |
| C) Being erased. I fear that being "all in" means losing my identity. | Enmeshment | `f_enmesh` |
| D) Being seen for who I really am. I fear I am inherently not enough. | Defectiveness | `f_defective` |
| E) Being hungry. I fear my needs will never be met, no matter how much I ask. | Deprivation | `f_deprivation` |

---

### Q2.2: The Default Thought
> **When things feel uncertain, what is the first thought that enters your mind?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) "They're pulling away. I need to fix it right now." | Pursuit reflex | `t_pursuit` |
| B) "I knew I shouldn't have trusted them. I should have kept my guard up." | Protective armor | `t_cynicism` |
| C) "I should probably distance myself before they can hurt me." | Preemptive exit | `t_preempt` |
| D) "What is wrong with me? Why am I like this?" | Self-attack | `t_selfblame` |
| E) "I don't deserve this treatment. I am done." | Flight impulsivity | `t_flight` |

---

### Q2.3: The Threat and the Close
> **Which aspect of deep emotional connection feels most dangerous to you?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) The dependency. If I need them this much, they have complete power to destroy me. | Dependency | `c_dependency` |
| B) The monitoring. I feel like my freedom is being slowly suffocated. | Control | `c_control` |
| C) The exposure. If they see all of me, they will realize I am a mistake. | Exposure | `c_exposure` |
| D) The inadequacy. I fear I will give my all and it will still be insufficient. | Inadequacy | `c_inadequacy` |
| E) The loss. The better it feels, the more devastating it will be when it ends. | Loss | `c_loss` |

---

### Q2.4: The Quiet Belief
> **Which of these sentences has lived in the back of your mind for as long as you can remember?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) "Love is something I have to earn by being useful." | Earning love | `b_earned` |
| B) "If people truly knew my interior world, they would be repulsed." | The hidden self | `b_hidden` |
| C) "The people I let get close are the only ones who can truly hurt me." | Danger of proximity | `b_danger` |
| D) "My emotions are too loud and too much for most people to handle." | Emotional excess | `b_toomuch` |
| E) "I will always be the second choice, never the priority." | Secondary status | `b_secondary` |

---

### Q2.5: The Deep Longing
> **Beyond the surface, what is the one thing you are truly searching for in a partner?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Total permanence: the certainty that they are never going anywhere. | Permanence | `w_permanence` |
| B) Being "known": to have my interior world fully seen and accepted. | Recognition | `w_recognition` |
| C) Safe freedom: to be loved without being managed or monitored. | Autonomy | `w_autonomy` |
| D) Absolute priority: to be the most important thing in their universe. | Specialness | `w_specialness` |
| E) Quiet acceptance: to be loved without having to perform or prove anything. | Acceptance | `w_acceptance` |

---

### Q2.6: The Anticipated Blow
> **When you finally decide to open up emotionally, what do you assume will happen next?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) They will find me less attractive or pull away. | Distance expectation | `x_distance` |
| B) They will use what I said against me in a future fight. | Weaponization | `x_weapon` |
| C) They will try to "fix" me or become parent-like. | Management | `x_control` |
| D) they will nod and say the right things, but they won't actually feel me. | Dismissal | `x_dismiss` |
| E) It won't matter. The relationship is already doomed. | Futility | `x_futility` |

---

### Q2.7: The Emotional "Home"
> **Which state feels most familiar, almost like a default setting, even though it hurts?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Hyper-vigilance: walking on eggshells to prevent an explosion. | Vigilance | `ff_vigilance` |
| B) A quiet, hollow loneliness even when someone is right next to me. | Solitude | `ff_lonely` |
| C) Persistent exhaustion from giving without any return. | Depletion | `ff_depleted` |
| D) A low-level dread: waiting for the moment it all goes wrong. | Dread | `ff_dread` |
| E) Invisibility: the feeling that my presence doesn't truly matter to them. | Invisibility | `ff_invisible` |

---

# LAYER 3: Biological Safeguards
**Mapping your system's response to threat.**

### Q3.1: The Pull-Away Response
> **When you sense your partner is creating distance, what is your nervous system's first move?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Proximity Seek: move closer, text more, demand an explanation. | Pursue | `d_pursue` |
| B) Match and Exceed: pull back twice as far as they did. | Withdraw | `d_withdraw` |
| C) Chameleon: try to become exactly what they want to make them stay. | Appease | `d_appease` |
| D) Provoke: start a fight to force them to look at me. | Escalate | `d_escalate` |
| E) Freeze: watch them silently, analyzing every move for data. | Monitor | `d_monitor` |

---

### Q3.2: The Conflict Style
> **In the middle of a heated disagreement, you typically become which version of yourself?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) The Resolver: I cannot rest until it is fixed and settled. | Resolving | `cn_resolve` |
| B) The Evader: I need to exit the room or the house to feel safe. | Exiting | `cn_exit` |
| C) The Accommodator: I will agree to anything just to make the yelling stop. | Appeasing | `cn_agree` |
| D) The Statuesque: I go blank and literally cannot find my words. | Freezing | `cn_freeze` |
| E) The Gladiator: I won't stop until my point is validated and heard. | Fighting | `cn_fight` |

---

### Q3.3: The Repair Methodology
> **After the dust has settled, how do you attempt to bring the relationship back to life?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) I apologize immediately, even if I wasn't the one in the wrong. | Over-apology | `rp_over_apologize` |
| B) I perform "acts of service" or buy gifts to show I'm still there. | Demonstration | `rp_demonstrate` |
| C) I sit in silence and wait for them to come to me. | Passive | `rp_passive` |
| D) I demand a long, detailed "processing" conversation about what happened. | Processing | `rp_process` |
| E) I act as though it never happened and try to move on. | Denial | `rp_avoid` |

---

### Q3.4: Activation Speed
> **How quickly do you travel from "something feels off" to "total emotional activation"?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Instantaneous. I am at a 10 before I even realize I'm upset. | Hair-trigger | `ea_instant` |
| B) Rapid. I try to hold it together, but within minutes I'm flooded. | Fast | `ea_fast` |
| C) Slow-burn. I stew for hours or days before the reaction hits. | Delayed | `ea_delayed` |
| D) Internalized. I look perfectly calm, but inside I am absolute chaos. | Suppressed | `ea_suppressed` |
| E) Regulated. I feel the surge, but I can usually ride the wave. | Regulated | `ea_regulated` |

---

### Q3.5: The Chaser or the Runner
> **In moments of extreme stress, is your primary urge to close the gap or to widen it?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Close the gap. I need to be touching or talking to feel okay. | Pursuer | `pw_pursue` |
| B) Widen the gap. I need distance and silence to even breathe. | Withdrawer | `pw_withdraw` |
| C) The Seesaw. I chase until they turn around, then I run. | Mixed | `pw_mixed` |
| D) The Wall. I don't move. I just shut down where I stand. | Frozen | `pw_frozen` |

---

### Q3.6: The Response to Injury
> **When your partner has genuinely hurt you, what is your dominant instinct?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Let them know immediately and clearly. | Direct | `h_direct` |
| B) Be quiet and wait to see if they are intuitive enough to notice. | Indirect | `h_indirect` |
| C) Swallow it. Bringing it up will just create more problems. | Suppress | `h_suppress` |
| D) Punish them subtly: the cold shoulder or withholding affection. | Punish | `h_punish` |
| E) Question if I was actually hurt, or if I'm just being sensitive. | Self-doubt | `h_doubt` |

---

### Q3.7: The Script Awareness
> **During a repetitive fight, do you ever feel like you are just watching a play you've already seen?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Yes. I can see the lines coming before we even say them. | High awareness | `la_high` |
| B) Sometimes. I realize it about halfway through the argument. | Moderate | `la_moderate` |
| C) Never. I am too far inside the emotion to see the script. | Minimal | `la_low` |

---

# LAYER 4: Adaptive Deep Dives
**Specific inquiries based on your primary signals.**

## Module A: The Chasing Heart
**Activated by: High pursuit and abandonment signals.**

### QA.1: The Chasing Threshold
> **When you feel a connection slipping, what is the furthest you've gone to "win" it back?**

| Option | Flag |
|:-------|:-----|
| A) I become a detective: scanning their socials, checking their location, or showing up. | `ma_intense` |
| B) I become "extra": more helpful, more available, more sexual. | `ma_moderate` |
| C) I suffer in complete silence while obsessively checking my phone. | `ma_restrained` |

### QA.2: The Chaser's Toll
> **What is the primary "tax" you pay for your need for reassurance?**

| Option | Flag |
|:-------|:-----|
| A) Self-respect. I have compromised my dignity to keep them from leaving. | `ma_shame` |
| B) The Relationship. My very attempts to save it are what ultimately push them away. | `ma_pushes` |
| C) My Peace. I am never fully at rest, even when they are right there. | `ma_peace` |

### QA.3: The Spiral Velocity
> **How long does it take for a "late text" to become a "they definitely hate me" conviction?**

| Option | Flag |
|:-------|:-----|
| A) Seconds to minutes. | `ma_spiral_fast` |
| B) An hour or two of silence. | `ma_spiral_hours` |
| C) I can usually rationalize it for a day before I panic. | `ma_spiral_managed` |

---

## Module B: The Invisible Fortress
**Activated by: High withdrawal and enmeshment signals.**

### QB.1: The Shutdown Trigger
> **What is the exact feeling that makes you want to disappear from a partner?**

| Option | Flag |
|:-------|:-----|
| A) The weight of their expectations. It feels like an unpaid debt. | `mb_demands` |
| B) The volume of the conflict. I just want the noise to stop. | `mb_conflict` |
| C) The "nakedness" of the intimacy. Being seen feels like being exposed. | `mb_closeness` |

### QB.2: The Internal Void
> **When you have successfully created distance, what is happening inside your mind?**

| Option | Flag |
|:-------|:-----|
| A) A mental fog. I am flooded and literally cannot think. | `mb_overwhelm` |
| B) A deadening. I have turned my emotions off to survive. | `mb_numb` |
| C) A pure, cold relief. I finally have my "self" back. | `mb_relief` |

### QB.3: The Re-entry Pattern
> **After you've pulled away, how do you try to return to the connection?**

| Option | Flag |
|:-------|:-----|
| A) I just start "acting normal" and hope they don't bring it up. | `mb_pretend` |
| B) I give a logical explanation while keeping the emotion at arm's length. | `mb_minimize` |
| C) I rarely fully return. I stay slightly guarded from then on. | `mb_incomplete` |

---

## Module C: The Exhausted Giver
**Activated by: High caretaking and depletion signals.**

### QC.1: The Motive for Utility
> **When you are "fixing" your partner's life, what is the hidden hope?**

| Option | Flag |
|:-------|:-----|
| A) Security: "If I am indispensable, they can't afford to leave me." | `mc_security` |
| B) Worth: "Being the strong one is the only way I feel valuable." | `mc_worth` |
| C) Debt: "I am repaying a guilt I can't quite name." | `mc_guilt` |

### QC.2: The Receiving Barrier
> **When someone actually tries to take care of YOU, what is your first reaction?**

| Option | Flag |
|:-------|:-----|
| A) Discomfort. I don't know where to put my hands or my mind. | `mc_uncomfortable` |
| B) Suspicion. I'm wondering what they're going to want in return later. | `mc_suspicious` |
| C) Guilt. I feel like I'm failing my "job" as the giver. | `mc_guilty_receive` |

### QC.3: The Resentment Reservoir
> **How much "hidden invoice" energy do you carry for the things you've done for others?**

| Option | Flag |
|:-------|:-----|
| A) A massive amount. I am quietly seething under the surface. | `mc_high_resentment` |
| B) A moderate amount. It builds up until I have a sudden explosion. | `mc_moderate` |
| C) Almost none. I genuinely enjoy being the one who does it all. | `mc_low` |

---

# LAYER 5: Internal Contradiction
**Exposing the fundamental paradox.**

### Q5.1: The Paradox of Desire
> **Which pair of conflicting statements both feel deeply true for you?**

| Option | Flag |
|:-------|:-----|
| A) "I want a soulmate" AND "I am terrified of being truly known." | `ct_connect_fear` |
| B) "I want to be chosen" AND "I reject everyone before they can reject me." | `ct_chosen_push` |
| C) "I want a safe haven" AND "I feel suspicious as soon as things get peaceful." | `ct_trust_wait` |
| D) "I want a stable life" AND "I am bored without the adrenaline of conflict." | `ct_stable_bored` |
| E) "I want to be loved for me" AND "I perform a version of me to be loved." | `ct_loved_hide` |

---

### Q5.2: The Gap
> **Where is the most painful distance between what you *say* you want and what you *do*?**

| Option | Flag |
|:-------|:-----|
| A) I say I want closeness, but I build walls. | `cv_close_distance` |
| B) I say I want peace, but I find reasons to fight. | `cv_peace_conflict` |
| C) I say I want a partner, but I keep people at the level of a project. | `cv_reciprocity_give` |
| D) I say I am happy, but I am looking for the exit. | `cv_leave_stay` |
| E) I say I am all in, but I'm keeping one foot out the door. | `cv_stay_sabotage` |

---

# LAYER 6: Moment of Recognition
**A single, optional reflection.**

### Q6.1: The Recognition moment
> **Think about the exact moment you realized your current relationship dynamic was a repeat of an old story. What was happening?**

*Write 1 or 2 sentences. This will be integrated into your narrative. You can skip if you prefer.*

---

# Scoring & Archetypes

The diagnostic identifies one of six primary patterns of connection and protection:

| Pattern | Core Fear | The Mechanism |
|:--------|:----------|:--------------|
| **The Anxious Pursuer** | Abandonment | Seeking proximity to manage the fear of being discard. |
| **The Protective Withdrawer** | Disappearance | Creating distance to manage the fear of being erased by intimacy. |
| **The Devoted Caretaker** | Worthlessness | Earning a right to exist by being indispensable to others. |
| **The Chaos Magnet** | Stagnation | Using intensity to manage the fear that a quiet love is a dead love. |
| **The Invisible Partner** | Displacement | Shrinking the self to manage the fear that needs lead to rejection. |
| **The Guarded Heart** | Betrayal | Using hyper-vigilance to manage the fear of being blindsided by pain. |

---

# Language Guidelines

- **No Em Dashes.** Use colons, semicolons, or separate sentences for a cleaner, more modern editorial feel.
- **Evocative Phrasing.** Avoid "medical" or "test-like" language. Use "biological urge," "invisible thread," and "machistory."
- **Focus on Mechanism.** Shift from "what you are" (labels) to "how your system works" (logic).
