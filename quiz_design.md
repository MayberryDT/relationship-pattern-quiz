# Relationship Pattern Diagnostic Quiz — Cold Traffic V1

> Quiz → Paywall → Full Report  
> Target: <10 min completion | 31–33 questions

---

## Design Goal

- Produce a result that feels **specific, unsettling, and coherent**
- Create **incomplete psychological tension** that demands explanation
- Build emotional investment without overwhelming

---

## Quiz Architecture

```
PHASE 1: Pattern Recognition (8 questions) — All users
         ↓
PHASE 2: Core Vulnerability & Belief (7 questions) — All users
         ↓
PHASE 3: Response Under Threat (7 questions) — All users
         ↓
PHASE 4: Adaptive Deep Dive (6-8 questions) — BRANCHING: Max 2 modules
         ↓
PHASE 5: Contradiction Surface (2 questions) — All users
         ↓
PHASE 6: Single Reflection (1 question) — Optional text entry
```

**Total: 31–33 questions**

---

# PHASE 1: Pattern Recognition
**8 questions | All users | No branching**

**Purpose:**
- Establish "this keeps happening" recognition
- Low emotional risk, high relatability

---

### Q1.1: The Recurring Story
> **If you had to describe the story that keeps repeating in your relationships, which sounds most familiar?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) I give everything and end up feeling invisible or taken for granted. | Over-giver pattern | `p_over_giver` |
| B) Things start strong but I'm always waiting for them to leave or lose interest. | Abandonment pattern | `p_abandonment` |
| C) I feel trapped or suffocated once things get too close or serious. | Avoidant pattern | `p_avoidant` |
| D) I keep choosing people who can't meet me halfway—unavailable, chaotic, or withholding. | Selection pattern | `p_selection` |
| E) It's intense at the start, then burns out or explodes. | Intensity pattern | `p_intensity` |

---

### Q1.2: The Ending That Repeats
> **Think about how your last 2-3 relationships ended. What's the common thread?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) They said I was "too much"—too intense, too needy, too emotional. | Pursued → Left | `e_too_much` |
| B) I left because I felt suffocated, controlled, or bored. | Fled | `e_fled` |
| C) It fizzled—passion died and neither of us fought for it. | Fizzle | `e_fizzle` |
| D) There was betrayal—lies, cheating, or broken trust. | Betrayal | `e_betrayal` |
| E) I stayed too long even though I knew it wasn't right. | Overstayed | `e_overstayed` |

---

### Q1.3: First Attraction Signal
> **When you first meet someone you're drawn to, what tends to hook you?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) A sense that they're hard to read or slightly out of reach. | Unavailable attraction | `a_unavailable` |
| B) They seem wounded or complicated—I want to understand them. | Wounded-bird attraction | `a_wounded` |
| C) Immediate intensity—strong chemistry, almost electric. | Intensity attraction | `a_intensity` |
| D) They feel safe and stable—the opposite of past chaos. | Safe attraction | `a_safe` |
| E) We're alike in ways that feel familiar, almost uncanny. | Mirror attraction | `a_mirror` |

---

### Q1.4: The Role You Play
> **In relationships, you tend to be:**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) The one who gives more—emotionally, practically, or both. | Giver | `r_giver` |
| B) The one who keeps emotional distance—even when I don't want to. | Distancer | `r_distancer` |
| C) The one chasing connection—always wanting more closeness. | Pursuer | `r_pursuer` |
| D) The one watching for threats—hyperaware of shifts in mood or distance. | Watcher | `r_watcher` |
| E) The one keeping the peace—absorbing tension so others don't have to. | Peacekeeper | `r_peacekeeper` |

---

### Q1.5: What Goes Wrong
> **Where do your relationships tend to break down?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) When I need reassurance and they pull away. | Reassurance gap | `b_reassurance` |
| B) When they get too close and I feel myself shutting down. | Closeness intolerance | `b_closeness` |
| C) When I've given so much I have nothing left. | Depletion | `b_depletion` |
| D) When I realize they're not who I thought they were. | Disillusionment | `b_disillusion` |
| E) When the same fight happens for the hundredth time. | Loop conflict | `b_loop` |

---

### Q1.6: Relationship Stability Reaction
> **When a relationship starts to feel stable and secure, you usually feel:**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Relief—finally safe, I can relax. | Secure lean | `s_relief` |
| B) Suspicious—waiting for something to go wrong. | Anxious vigilance | `s_suspicious` |
| C) Bored—something is missing without the intensity. | Chaos-bonded | `s_bored` |
| D) Trapped—like I'm losing my freedom or edge. | Avoidant alarm | `s_trapped` |
| E) Disbelief—I keep testing to see if it's real. | Test impulse | `s_testing` |

---

### Q1.7: Pattern Awareness
> **Before today, how aware were you that you have a repeating relationship pattern?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Very—I've known for a while, I just can't stop it. | High awareness | `aw_high` |
| B) Somewhat—I've noticed things repeat but haven't fully understood why. | Moderate awareness | `aw_moderate` |
| C) Barely—I'm just starting to see it now. | Emerging | `aw_emerging` |
| D) None—I thought every relationship was unique until this quiz. | Low awareness | `aw_low` |

---

### Q1.8: Frustration Core
> **What frustrates you most about your relationship history?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) That I keep ending up with the wrong people. | Selection frustration | `fr_selection` |
| B) That I can't seem to change even when I know better. | Behavior frustration | `fr_behavior` |
| C) That I give so much and get so little back. | Reciprocity frustration | `fr_reciprocity` |
| D) That I push away the people who actually want to stay. | Sabotage frustration | `fr_sabotage` |
| E) That I don't know why this keeps happening. | Confusion frustration | `fr_confusion` |

---

# PHASE 2: Core Vulnerability & Belief
**7 questions | All users | No branching**

**Purpose:**
- Identify dominant fear/belief driving behavior
- Begin emotional specificity

---

### Q2.1: The Deep Fear
> **What do you fear will happen if you truly let someone in?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) They'll eventually leave—everyone does. | Abandonment | `f_abandon` |
| B) They'll use my vulnerability against me. | Mistrust | `f_mistrust` |
| C) I'll lose myself—my independence, my identity. | Enmeshment | `f_enmesh` |
| D) They'll realize I'm not worth staying for. | Defectiveness | `f_defective` |
| E) My needs will be too much and drive them away. | Deprivation | `f_deprivation` |

---

### Q2.2: The Uncertain Thought
> **When things feel uncertain in your relationship, which thought shows up first?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) "They're pulling away—I need to do something." | Pursuit activation | `t_pursuit` |
| B) "I knew this would happen—I shouldn't have trusted them." | Protective cynicism | `t_cynicism` |
| C) "Maybe I should create some distance before they do." | Preemptive withdrawal | `t_preempt` |
| D) "What did I do wrong? How do I fix this?" | Self-blame | `t_selfblame` |
| E) "I don't deserve this—I should leave." | Flight impulse | `t_flight` |

---

### Q2.3: Closeness Threat
> **What feels most threatening about emotional closeness?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) That I'll need them too much and they'll leave. | Dependency fear | `c_dependency` |
| B) That they'll control me or I'll lose my freedom. | Control fear | `c_control` |
| C) That I'll be truly seen—and rejected. | Exposure fear | `c_exposure` |
| D) That I'll give everything and still not be enough. | Inadequacy fear | `c_inadequacy` |
| E) That it will end and the loss will break me. | Loss fear | `c_loss` |

---

### Q2.4: The Unspoken Belief
> **Which of these thoughts has quietly lived in the back of your mind?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) "I have to earn love—it won't just be given." | Earned love belief | `b_earned` |
| B) "If they really knew me, they wouldn't stay." | Hidden self belief | `b_hidden` |
| C) "People who get close always hurt me eventually." | Close = danger | `b_danger` |
| D) "My feelings are too intense—I need to shrink them." | Too-much belief | `b_toomuch` |
| E) "I'll never be anyone's first priority." | Secondary belief | `b_secondary` |

---

### Q2.5: What You Long For
> **Deep down, what do you most wish a partner would give you?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Unwavering safety—the certainty they won't leave. | Permanence wish | `w_permanence` |
| B) True understanding—to be known at the deepest level. | Recognition wish | `w_recognition` |
| C) Freedom—support without monitoring or control. | Autonomy wish | `w_autonomy` |
| D) Priority—to be their most important person. | Specialness wish | `w_specialness` |
| E) Acceptance—to be loved without performing or proving. | Acceptance wish | `w_acceptance` |

---

### Q2.6: Expected Partner Response
> **When you open up emotionally, what do you expect will happen?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) They'll distance themselves or lose interest. | Distance expectation | `x_distance` |
| B) They'll see it as weakness or use it later. | Weaponization expectation | `x_weapon` |
| C) They'll try to fix me or become overwhelming. | Control expectation | `x_control` |
| D) They'll say the right things but not really understand. | Dismissal expectation | `x_dismiss` |
| E) They'll eventually leave anyway—why bother. | Futility expectation | `x_futility` |

---

### Q2.7: The Familiar Feeling
> **Which emotional state feels most "familiar"—almost like home, even when it hurts?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Walking on eggshells—constant vigilance. | Vigilance | `ff_vigilance` |
| B) Loneliness—even when I'm not alone. | Loneliness | `ff_lonely` |
| C) Exhaustion—from giving without receiving. | Depletion | `ff_depleted` |
| D) Dread—waiting for the other shoe to drop. | Dread | `ff_dread` |
| E) Invisibility—feeling unseen or unimportant. | Invisibility | `ff_invisible` |

---

# PHASE 3: Response Under Threat
**7 questions | All users | No branching**

**Purpose:**
- Map coping style and escalation behavior
- Set up loop logic for branching

---

### Q3.1: Distance Response
> **When you sense your partner pulling away, your first instinct is:**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Move closer—call, text, seek reassurance. | Pursue | `d_pursue` |
| B) Pull back—match their distance or create more. | Withdraw | `d_withdraw` |
| C) Appease—try to fix whatever I might have done wrong. | Appease | `d_appease` |
| D) Escalate—force the issue with intensity or confrontation. | Escalate | `d_escalate` |
| E) Watch and wait—analyze before reacting. | Monitor | `d_monitor` |

---

### Q3.2: Conflict Response
> **During a disagreement, you typically:**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Push to resolve it immediately—I can't rest with things unfinished. | Resolving | `cn_resolve` |
| B) Leave the room—I need space before I say something I regret. | Exiting | `cn_exit` |
| C) Agree to end the fight, even if I don't mean it. | Appeasing | `cn_agree` |
| D) Shut down—I go blank and can't access my thoughts. | Freezing | `cn_freeze` |
| E) Dig in—I won't stop until I'm heard. | Fighting | `cn_fight` |

---

### Q3.3: Repair Attempt Style
> **After conflict, how do you typically try to repair?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Apologize—even for things I didn't do. | Over-apologizing | `rp_over_apologize` |
| B) Show affection—acts of service, gifts, extra attention. | Demonstration | `rp_demonstrate` |
| C) Wait for them to come to me—I don't make the first move. | Passive | `rp_passive` |
| D) Talk it out—I need to understand what happened. | Processing | `rp_process` |
| E) Pretend it didn't happen—move on without addressing it. | Avoidance | `rp_avoid` |

---

### Q3.4: Emotional Activation Speed
> **How quickly do you go from "something's off" to "full emotional response"?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Instantly—0 to 100 in seconds. | Hair-trigger | `ea_instant` |
| B) Minutes—I try to stay calm but rarely succeed. | Fast | `ea_fast` |
| C) Hours—I stew before the reaction hits. | Delayed | `ea_delayed` |
| D) I mostly stay calm externally—but internally it's chaos. | Suppressed | `ea_suppressed` |
| E) I'm generally regulated—I can ride the wave. | Regulated | `ea_regulated` |

---

### Q3.5: Pursuit or Withdrawal
> **In relationship stress, are you more likely to pursue connection or create distance?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Pursue—I need to close the gap immediately. | Pursuer | `pw_pursue` |
| B) Withdraw—I need space to feel safe. | Withdrawer | `pw_withdraw` |
| C) It depends—sometimes I chase, sometimes I run. | Mixed | `pw_mixed` |
| D) Freeze—I can't do either, I just shut down. | Frozen | `pw_frozen` |

---

### Q3.6: When Hurt
> **When your partner hurts you, your instinct is:**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Tell them immediately—they need to know. | Direct | `h_direct` |
| B) Hint and wait for them to figure it out. | Indirect | `h_indirect` |
| C) Suppress it—bringing it up isn't worth the conflict. | Suppress | `h_suppress` |
| D) Punish subtly—cold shoulder, withdrawal, withholding. | Punish | `h_punish` |
| E) Question whether I have the right to feel hurt. | Self-doubt | `h_doubt` |

---

### Q3.7: Loop Awareness
> **When conflict repeats, do you feel like you're watching yourself make the same moves?**

| Option | Signal | Flag |
|:-------|:-------|:-----|
| A) Yes—it's like I'm stuck in a script I can't rewrite. | High loop awareness | `la_high` |
| B) Sometimes—I notice after it's over. | Moderate | `la_moderate` |
| C) Rarely—I'm too activated in the moment to observe. | Low | `la_low` |

---

# PHASE 4: Adaptive Deep Dive (BRANCHING)
**6–8 questions total | Max 2 modules | 3–4 questions each**

**Trigger Logic:**
Based on Phase 2 + Phase 3 scores. If >2 modules qualify, select top 2 by intensity.

**Micro-copy before each module:**
> *"Based on your earlier answers, we're looking closer at how you respond when closeness feels unsafe."*

---

## Module A: Anxious Pursuit
**Gate:** High scores on `d_pursue`, `pw_pursue`, `f_abandon`, `t_pursuit`

### QA.1: Pursuit Intensity
> **When you feel someone slipping away, how far does your pursuit typically go?**

| Option | Flag |
|:-------|:-----|
| A) Multiple texts, calls, showing up—whatever it takes. | `ma_intense` |
| B) Increased contact but I try to seem casual about it. | `ma_moderate` |
| C) I pursue internally but force myself to wait. | `ma_restrained` |

### QA.2: Pursuit Cost
> **What does chasing reassurance cost you?**

| Option | Flag |
|:-------|:-----|
| A) Self-respect—I've done things I'm not proud of. | `ma_shame` |
| B) The relationship—my pursuit pushes them away. | `ma_pushes` |
| C) Peace—I'm never fully at rest, always scanning. | `ma_peace` |

### QA.3: Spiral Speed
> **How quickly does "they haven't texted back" turn into "this is over"?**

| Option | Flag |
|:-------|:-----|
| A) Minutes. | `ma_spiral_fast` |
| B) Hours. | `ma_spiral_hours` |
| C) I can usually talk myself down. | `ma_spiral_managed` |

---

## Module B: Avoidant Shutdown
**Gate:** High scores on `d_withdraw`, `pw_withdraw`, `f_enmesh`, `s_trapped`

### QB.1: Withdrawal Trigger
> **What triggers your need to withdraw?**

| Option | Flag |
|:-------|:-----|
| A) Emotional demands—they want more than I can give. | `mb_demands` |
| B) Conflict—I need to escape before I explode. | `mb_conflict` |
| C) Closeness itself—too much intimacy feels suffocating. | `mb_closeness` |

### QB.2: Internal State During Withdrawal
> **When you've pulled away, what's happening inside?**

| Option | Flag |
|:-------|:-----|
| A) Overwhelm—I'm flooded and can't think. | `mb_overwhelm` |
| B) Numbness—I've shut everything down. | `mb_numb` |
| C) Relief—finally I can breathe. | `mb_relief` |

### QB.3: Return Pattern
> **After withdrawing, how do you typically come back?**

| Option | Flag |
|:-------|:-----|
| A) Pretend nothing happened. | `mb_pretend` |
| B) Give a short explanation but avoid the emotional part. | `mb_minimize` |
| C) Sometimes I don't fully come back. | `mb_incomplete` |

---

## Module C: Over-Functioning / Caretaker
**Gate:** High scores on `p_over_giver`, `r_giver`, `d_appease`, `ff_depleted`

### QC.1: Giving Motivation
> **When you give in relationships, what's really driving it?**

| Option | Flag |
|:-------|:-----|
| A) If I'm useful, they won't leave. | `mc_security` |
| B) Being needed is how I feel valuable. | `mc_worth` |
| C) Guilt—if I don't, I feel like a bad partner. | `mc_guilt` |

### QC.2: Receiving Ability
> **When someone tries to care for you, you feel:**

| Option | Flag |
|:-------|:-----|
| A) Uncomfortable—I don't know how to receive. | `mc_uncomfortable` |
| B) Suspicious—what do they want in return? | `mc_suspicious` |
| C) Guilty—I should be the one giving. | `mc_guilty_receive` |

### QC.3: Resentment Level
> **How much hidden resentment do you carry from giving so much?**

| Option | Flag |
|:-------|:-----|
| A) Significant—I'm exhausted and angry beneath the surface. | `mc_high_resentment` |
| B) Some—it builds until I explode or shut down. | `mc_moderate` |
| C) Not much—I genuinely don't expect anything back. | `mc_low` |

### QC.4: Identity Without Giving
> **If you couldn't be the caretaker, would you still feel valuable?**

| Option | Flag |
|:-------|:-----|
| A) No—that's my identity, my purpose. | `mc_identity_dependent` |
| B) I'd feel lost but could probably adjust. | `mc_moderate_dependent` |
| C) Yes—my value isn't just in what I do for others. | `mc_secure` |

---

## Module D: Control / Power Sensitivity
**Gate:** High scores on `c_control`, `x_control`, `f_enmesh`, `b_danger`

### QD.1: Control Response
> **When you feel controlled or monitored in a relationship, you:**

| Option | Flag |
|:-------|:-----|
| A) Shut down and comply to avoid conflict. | `md_comply` |
| B) Push back hard—I won't be controlled. | `md_resist` |
| C) Create secret distance while appearing present. | `md_covert` |

### QD.2: Power Balance
> **In your relationships, who typically holds more power?**

| Option | Flag |
|:-------|:-----|
| A) Them—I tend to defer or appease. | `md_them` |
| B) Me—I maintain the upper hand for safety. | `md_me` |
| C) It's a constant struggle—neither stable. | `md_struggle` |

### QD.3: Autonomy Priority
> **How important is maintaining independence in relationships?**

| Option | Flag |
|:-------|:-----|
| A) Essential—I'd rather be alone than lose myself. | `md_essential` |
| B) Very—I need clear boundaries and my own space. | `md_high` |
| C) Moderate—I want closeness but not at the cost of me. | `md_moderate` |

---

## Module E: Chaos Chemistry
**Gate:** High scores on `p_intensity`, `a_intensity`, `s_bored`, `e_fizzle`

### QE.1: Drama as Connection
> **How do drama and conflict relate to feeling connected?**

| Option | Flag |
|:-------|:-----|
| A) Conflict feels like passion—intensity = love. | `me_drama_passion` |
| B) Calm feels boring—I create problems to feel something. | `me_calm_boring` |
| C) I know it's unhealthy but stable feels fake or shallow. | `me_stable_fake` |

### QE.2: Calm Tolerance
> **In a genuinely stable relationship, how long before you feel the urge to shake things up?**

| Option | Flag |
|:-------|:-----|
| A) Days. | `me_days` |
| B) Weeks. | `me_weeks` |
| C) Months—I'm working on appreciating stability. | `me_months` |

### QE.3: Intensity Origin
> **Where did you learn that love = intensity?**

| Option | Flag |
|:-------|:-----|
| A) My parents' relationship—love was loud. | `me_origin_parents` |
| B) My first love—it was a rollercoaster and nothing since compares. | `me_origin_first` |
| C) Trauma—chaos feels familiar, almost safe. | `me_origin_trauma` |

---

## Module F: Emotional Starvation
**Gate:** High scores on `f_deprivation`, `ff_lonely`, `ff_invisible`, `b_secondary`

### QF.1: Unmet Need History
> **How often have your emotional needs been genuinely met in relationships?**

| Option | Flag |
|:-------|:-----|
| A) Rarely—I've learned not to expect it. | `mf_rarely` |
| B) Sometimes—in the beginning, then it fades. | `mf_sometimes` |
| C) I'm not even sure what my needs are. | `mf_unknown` |

### QF.2: Asking for Needs
> **When you need emotional support, you typically:**

| Option | Flag |
|:-------|:-----|
| A) Don't ask—my needs feel like a burden. | `mf_dont_ask` |
| B) Hint and hope they notice. | `mf_hint` |
| C) Ask, but feel guilty or apologize for needing. | `mf_apologetic` |

### QF.3: Invisibility Response
> **When you feel unseen in a relationship, you:**

| Option | Flag |
|:-------|:-----|
| A) Try harder to be noticed. | `mf_try_harder` |
| B) Withdraw into yourself. | `mf_withdraw` |
| C) Accept it as normal—this is just how it is. | `mf_accept` |

---

# PHASE 5: Contradiction Surface
**2 questions | All users**

**Purpose:**
- Expose internal paradox
- Create cognitive tension that demands resolution

---

### Q5.1: Desire vs. Fear
> **Which pair of statements both feel true for you?**

| Option | Flag |
|:-------|:-----|
| A) "I want deep connection" AND "Intimacy terrifies me." | `ct_connect_fear` |
| B) "I want to be chosen" AND "I push people away before they can choose me." | `ct_chosen_push` |
| C) "I want to trust fully" AND "I'm always waiting for betrayal." | `ct_trust_wait` |
| D) "I want stability" AND "I get bored without intensity." | `ct_stable_bored` |
| E) "I want to be loved as I am" AND "I hide who I really am." | `ct_loved_hide` |

---

### Q5.2: Want vs. Behavior
> **Where is the biggest gap between what you *want* and what you *do*?**

| Option | Flag |
|:-------|:-----|
| A) I want closeness but I create distance. | `cv_close_distance` |
| B) I want peace but I create conflict. | `cv_peace_conflict` |
| C) I want reciprocity but I over-give. | `cv_reciprocity_give` |
| D) I want to leave but I stay. | `cv_leave_stay` |
| E) I want to stay but I sabotage. | `cv_stay_sabotage` |

---

# PHASE 6: Single Reflection
**1 question | Optional | Text entry**

**Purpose:**
- Ownership + personalization
- Report mirroring later

---

### Q6.1: The Moment
> **The moment you realized you weren't being met emotionally was…**

*1–2 sentences. Skip if you'd prefer.*

---

# Scoring & Pattern Outcome

## Primary Pattern Archetypes

| Pattern | Core Fear | Loop Signature |
|:--------|:----------|:---------------|
| **The Anxious Pursuer** | Abandonment | Seek → Distance → Panic → Over-pursue → Confirm fear |
| **The Protective Withdrawer** | Engulfment | Closeness → Overwhelm → Withdraw → Partner pursues → Confirm threat |
| **The Devoted Caretaker** | Being unneeded | Give → Deplete → Resent → Invisible → Give harder |
| **The Chaos Magnet** | Boredom = Rejection | Intensity → Calm → Create drama → Rupture → Seek intensity |
| **The Invisible Partner** | Deprivation | Need → Suppress → Hint → Unmet → Confirm invisibility |
| **The Guarded Heart** | Betrayal | Trust → Vulnerability → Hypervigilance → Wall → Confirm distrust |

---

# Result Screen (Pre-Paywall)

## SHOW:
- Pattern name (primary)
- One-paragraph explanation:
  - Core fear
  - Typical partner dynamic
  - Repeating outcome
- One quoted line from their reflection (if provided)

## DO NOT SHOW:
- Origin explanation
- Full loop breakdown
- How to fix
- Secondary modifiers

---

# Paywall Copy Positioning

## Frame as:
- "See the full pattern narrative"
- "Why this pattern formed"
- "How it unfolds from attraction → rupture"
- "Why it keeps repeating even when you 'know better'"

## Language Rules:
- Explanation > help
- Understanding > fixing
- Completion > transformation

---

# Question Totals

| Phase | Questions |
|:------|:----------|
| Phase 1: Pattern Recognition | 8 |
| Phase 2: Core Vulnerability | 7 |
| Phase 3: Response Under Threat | 7 |
| Phase 4: Adaptive Deep Dive | 6–8 |
| Phase 5: Contradiction Surface | 2 |
| Phase 6: Reflection | 1 |
| **TOTAL** | **31–33** |
