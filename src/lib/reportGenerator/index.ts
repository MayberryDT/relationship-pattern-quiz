/**
 * Report Generator
 * Main generator functions for free, paywall preview, and paid reports
 */

import type {
    ReportInputs,
    ReportOutputs,
    PrimaryArchetype,
    SecondaryModifier,
    DerivedPatternData
} from './types';

import { ARCHETYPE_TEMPLATES } from './archetypeTemplates';
import { MODULE_TEMPLATES } from './moduleTemplates';
import {
    derivePatternData,
    getTellsFromFlags,
    CORE_FEAR_DESCRIPTIONS,
    DISTANCE_RESPONSE_DESCRIPTIONS,
    ACTIVATION_SPEED_DESCRIPTIONS,
    REPAIR_STYLE_DESCRIPTIONS,
    CONFLICT_STYLE_DESCRIPTIONS,
    ATTRACTION_HOOK_DESCRIPTIONS,
    ENDING_THEME_DESCRIPTIONS,
    FLAG_TELLS
} from './flagMappings';

/**
 * Main report generator function
 */
export function generateReports(inputs: ReportInputs): ReportOutputs {
    const archetype = ARCHETYPE_TEMPLATES[inputs.primary_archetype];
    const patternData = derivePatternData(inputs.key_flags);
    const tells = getTellsFromFlags(inputs.key_flags, 8);

    // Validate archetype consistency (anti-scam safeguard)
    const consistency = checkPatternConsistency(inputs.primary_archetype, inputs.key_flags);

    return {
        free_report_markdown: generateFreeReport(inputs, archetype, patternData, tells, consistency),
        paywall_preview_markdown: generatePaywallPreview(inputs, archetype, patternData),
        paid_report_markdown: generatePaidReport(inputs, archetype, patternData, tells, consistency)
    };
}

/**
 * Update the paid report with AI insights
 */
export function updatePaidReportWithAI(
    _currentReport: string,
    inputs: ReportInputs,
    aiInsights: any
): string {

    const archetype = ARCHETYPE_TEMPLATES[inputs.primary_archetype];
    const patternData = derivePatternData(inputs.key_flags);
    const tells = getTellsFromFlags(inputs.key_flags, 8);
    const consistency = checkPatternConsistency(inputs.primary_archetype, inputs.key_flags);

    return generatePaidReport(inputs, archetype, patternData, tells, consistency, aiInsights);
}


/**
 * Check pattern consistency between archetype and flags
 */
function checkPatternConsistency(
    archetype: PrimaryArchetype,
    flags: Record<string, boolean | string>
): { isConsistent: boolean; note: string } {
    const flagKeys = Object.keys(flags).filter(k => flags[k] === true);

    // Check for conflicting signals
    const hasPursue = flagKeys.some(f => f.includes('pursue') || f === 'd_pursue' || f === 'pw_pursue');
    const hasWithdraw = flagKeys.some(f => f.includes('withdraw') || f === 'd_withdraw' || f === 'pw_withdraw');

    if (archetype === 'The Anxious Pursuer' && hasWithdraw && !hasPursue) {
        return {
            isConsistent: false,
            note: 'Your responses show elements of both pursuit and withdrawal, suggesting a mixed pattern that may shift depending on the relationship.'
        };
    }

    if (archetype === 'The Protective Withdrawer' && hasPursue && !hasWithdraw) {
        return {
            isConsistent: false,
            note: 'Your responses show elements of both withdrawal and pursuit, suggesting a mixed pattern that may shift depending on the relationship.'
        };
    }

    return { isConsistent: true, note: '' };
}

/**
 * Generate the free report (400-700 words)
 */
function generateFreeReport(
    inputs: ReportInputs,
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData,
    tells: string[],
    consistency: { isConsistent: boolean; note: string }
): string {
    const sections: string[] = [];

    // 1. Your Pattern
    sections.push(`## Your Pattern\n\n**${archetype.name}**\n\n${archetype.pattern_summary}`);

    // Add consistency note if needed
    if (!consistency.isConsistent) {
        sections.push(`\n\n*${consistency.note}*`);
    }

    // 2. What Activates It
    const triggers = archetype.activation_triggers.slice(0, 4);
    const triggerText = triggers.map(t => `- ${t}`).join('\n');
    sections.push(`\n\n## What Activates It\n\nThis pattern tends to activate when you encounter:\n\n${triggerText}\n\nThe activation is not a choice. Your nervous system, calibrated by earlier experiences, responds before your conscious mind has a chance to intervene.`);

    // 3. The Loop You Get Stuck In
    sections.push(`\n\n## The Loop You Get Stuck In\n\n${archetype.loop_description}`);

    // 4. Specific Tells
    const tellBullets = tells.slice(0, 8).map(t => `- ${t}`).join('\n');
    sections.push(`\n\n## Specific Tells\n\nBased on your responses, you likely relate to:\n\n${tellBullets}`);

    // 5. The Tension Inside It
    let contradictionText = '';
    if (patternData.contradiction_value) {
        contradictionText = `There is a tension at the heart of this pattern: ${patternData.contradiction_value} This is not weakness or confusion. It is the sign of a system that wants something and has learned to protect against the very thing it wants.`;
    } else {
        contradictionText = `There is often a tension at the heart of this pattern: wanting connection while protecting against the vulnerability it requires. This is not weakness or confusion. It is the sign of a learned protection that has not yet caught up with your current reality.`;
    }
    sections.push(`\n\n## The Tension Inside It\n\n${contradictionText}`);

    // 6. Reflection Mirror
    if (inputs.reflection_text && inputs.reflection_text.trim()) {
        const quote = inputs.reflection_text.trim();
        sections.push(`\n\n## In Your Own Words\n\nYou wrote: *"${quote}"*\n\nThis reflection points toward the moment when the pattern's grip became visible, even if only briefly. That moment of recognition, painful as it may be, is also the beginning of seeing clearly.`);
    } else {
        sections.push(`\n\n## A Moment That Often Fits\n\nA moment that often marks this pattern: realizing, mid-conflict or mid-silence, that you have been here before. Different face, different name, same dynamic. The recognition can be disorienting, as if you have been following a script you did not know you had memorized.`);
    }

    // Closing hook
    sections.push(`\n\n---\n\n*The full report explains why this pattern formed, why different partners lead to similar endings, and the exact moment the loop usually locks in.*`);

    return sections.join('');
}

/**
 * Generate paywall preview (120-220 words)
 */
function generatePaywallPreview(
    inputs: ReportInputs,
    _archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData
): string {

    const coreFear = CORE_FEAR_DESCRIPTIONS[patternData.core_fear];
    const attractionHook = ATTRACTION_HOOK_DESCRIPTIONS[patternData.attraction_hook];
    const conflictStyle = CONFLICT_STYLE_DESCRIPTIONS[patternData.conflict_style];

    const items: string[] = [];

    // Core items based on pattern
    items.push(`- **The Hidden Driver:** Why the fear ${coreFear} runs deeper than logic can reach`);
    items.push(`- **Your Attraction Fingerprint:** Why ${attractionHook} tends to hook you`);
    items.push(`- **Your Conflict Script:** How ${conflictStyle} shapes the trajectory of ruptures`);
    items.push(`- **The Relationship Timeline:** How this pattern unfolds from first spark through eventual ending`);
    items.push(`- **Your Blind Spot:** Why self-awareness has not been enough to stop the loop`);

    // Add modifier-specific items
    if (inputs.secondary_modifiers.length > 0) {
        const modName = inputs.secondary_modifiers[0];
        items.push(`- **Your Modifier - ${modName}:** How this secondary pattern changes the dynamic`);
    }

    items.push(`- **Personalized Signals:** 10+ specific tells drawn from your responses`);

    const itemText = items.join('\n');

    return `## What the Full Report Covers\n\n${itemText}\n\n*This is not advice. It is an explanation of the mechanism.*`;
}

/**
 * Generate paid report (2000-3500+ words)
 * RESTRUCTURED: Diagnostic artifact format with evidence anchors
 */
function generatePaidReport(
    inputs: ReportInputs,
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData,
    tells: string[],
    consistency: { isConsistent: boolean; note: string },
    aiInsights?: any
): string {

    const sections: string[] = [];
    const name = inputs.user_first_name || 'you';

    // 1. Executive Summary (bullet format)
    sections.push(generateExecutiveSummary(inputs, archetype, patternData, consistency, name, aiInsights));

    // 2. Diagnostic Snapshot (NEW - boxed metrics)
    sections.push(generateDiagnosticSnapshot(archetype, patternData));

    // 3. Mechanism (merged Core Vulnerability + Protective Logic)
    sections.push(generateMechanism(archetype, patternData));

    // 4. Trigger Profile (NEW - ranked triggers with mind/body)
    sections.push(generateTriggerProfile(archetype));

    // 5. The Relationship Timeline (with checkpoints)
    sections.push(generateRelationshipTimeline(archetype, patternData, inputs.key_flags));

    // 6. The Blind Spot (merged with Why Knowing)
    sections.push(generateBlindSpot(archetype, patternData));

    // 7. The Attraction Fingerprint
    sections.push(generateAttractionFingerprint(archetype, patternData, inputs.key_flags));

    // 8. Your Modifiers
    sections.push(generateModifiersSection(inputs.secondary_modifiers, inputs.key_flags));

    // 9. Deep AI Analysis (if available)
    if (aiInsights?.deep_flag_analysis && aiInsights?.subconscious_commitments) {
        sections.push(generateDeepAnalysis(aiInsights));
    }

    // 10. The Core Contradiction Resolved
    sections.push(generateContradictionResolved(patternData, inputs.key_flags, aiInsights));

    // 11. The Shadow Mechanism (if available)
    if (aiInsights?.shadow_mechanism) {
        sections.push(`## The Shadow Mechanism\n\n${aiInsights.shadow_mechanism}`);
    }

    // 12. What This Means Going Forward
    sections.push(generateGoingForward(archetype, aiInsights));

    // 13. Letter to Future Self (if available)
    if (aiInsights?.future_self_letter) {
        sections.push(`## A Letter from Your Future Self\n\n${aiInsights.future_self_letter}`);
    }

    // 14. Appendix: Evidence From Your Responses (restructured)
    sections.push(generateEvidenceAppendix(inputs.key_flags, tells));

    return sections.join('\n\n');
}

/**
 * NEW: Generate Diagnostic Snapshot (boxed metrics)
 */
function generateDiagnosticSnapshot(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData
): string {
    const snapshot = archetype.diagnostic_snapshot;
    const fearDesc = CORE_FEAR_DESCRIPTIONS[patternData.core_fear];

    return `## Diagnostic Snapshot

| Metric | Your Pattern |
|--------|-------------|
| **Core Fear** | ${fearDesc} |
| **Primary Trigger** | ${snapshot.primary_trigger} |
| **Primary Response** | ${snapshot.primary_response} |
| **Rupture Style** | ${snapshot.rupture_style} |
| **Repair Style** | ${snapshot.repair_style} |
| **Aftermath** | ${snapshot.aftermath} |
| **Misread Risk** | ${snapshot.misread_risk} |

This snapshot summarizes how your pattern operates. Each row represents a dimension of your relationship dynamics that your responses revealed.`;
}

/**
 * NEW: Generate Trigger Profile (ranked triggers with mind/body responses)
 */
function generateTriggerProfile(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES]
): string {
    const triggers = archetype.trigger_profile;

    const triggerRows = triggers.map((t, i) =>
        `### ${i + 1}. ${t.trigger}

**What your mind says:** ${t.what_mind_says}

**What your body does:** ${t.what_body_does}`
    ).join('\n\n');

    return `## Trigger Profile

These are your primary triggers, ranked by intensity. Each trigger activates a predictable cascade of thoughts and physical responses.

${triggerRows}

Recognizing these triggers is not about avoiding them. It is about noticing when they are active, so you have a moment between stimulus and response.`;
}

/**
 * NEW: Generate Mechanism (merged Core Vulnerability + Protective Logic)
 */
function generateMechanism(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData
): string {
    const fearDesc = CORE_FEAR_DESCRIPTIONS[patternData.core_fear];

    return `## The Mechanism

### The Vulnerability

${archetype.core_vulnerability_deep}

### The Protection

${archetype.protective_logic}

The fear at the center of this pattern—the fear ${fearDesc}—is not irrational. It is a reasonable conclusion drawn from unreasonable circumstances. Your system learned to protect you in the only way it knew how. The challenge now is that the protection has outlived the original threat.`;
}

function generateExecutiveSummary(
    inputs: ReportInputs,
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData,
    consistency: { isConsistent: boolean; note: string },
    name: string,
    aiInsights?: any
): string {


    let modifierText = '';
    if (inputs.secondary_modifiers.length > 0) {
        const mods = inputs.secondary_modifiers.map(m => `*${m}*`).join(' and ');
        modifierText = ` This primary pattern is modified by ${mods}, which shapes how it manifests in different contexts.`;
    }

    let contradictionText = '';
    if (patternData.contradiction_value) {
        contradictionText = ` At the heart of this pattern lies a core tension: ${patternData.contradiction_value}`;
    }

    let consistencyText = '';
    if (!consistency.isConsistent) {
        consistencyText = `\n\n*${consistency.note}*`;
    }

    const summaryContent = aiInsights?.executive_summary_enhancement
        ? `${archetype.executive_summary}\n\n**Analyst Note:** ${aiInsights.executive_summary_enhancement}`
        : `${archetype.executive_summary}${modifierText}${contradictionText}`;

    return `# Your Relationship Pattern Diagnostic Report

Hi ${name === 'you' ? 'there' : name},

## Executive Summary


Your primary pattern is **${archetype.name}**, organized around a core fear of ${patternData.core_fear}. ${summaryContent}${consistencyText}

This report offers an explanation of the mechanism driving your relationship patterns. It is not a prescription or a diagnosis. It is a map of the territory you have been navigating, often without knowing the shape of the land.`;

}

function generateAttractionFingerprint(
    _archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData,
    flags: Record<string, boolean | string>
): string {

    const hookDesc = ATTRACTION_HOOK_DESCRIPTIONS[patternData.attraction_hook];

    let attractionSignals = '';
    if (flags['a_unavailable']) {
        attractionSignals += `\nThere is something compelling about someone who is not fully available. The slight distance creates a puzzle to solve, an uncertainty that keeps your attention engaged. This is not masochism; it is a nervous system that learned to equate challenge with value.`;
    }
    if (flags['a_wounded']) {
        attractionSignals += `\nYou often find yourself drawn to people who seem to carry complexity, who need understanding. This attraction connects to a deep belief that your role is to help, to heal, to see what others miss. It can create intense initial connection, but also an imbalanced dynamic.`;
    }
    if (flags['a_intensity']) {
        attractionSignals += `\nStrong immediate chemistry has significant pull for you. The electric feeling of intense connection can override other considerations. What feels like fate may be familiarity in disguise, your nervous system recognizing a pattern it knows.`;
    }
    if (flags['a_safe']) {
        attractionSignals += `\nAfter uncertainty or chaos, stability becomes attractive. Someone calm and predictable offers something your system craves. The challenge is that sometimes the attraction to safety alone does not provide the full picture of compatibility.`;
    }
    if (flags['a_mirror']) {
        attractionSignals += `\nThere is often something familiar about the people you are drawn to, as if you have met before. This mirroring can create rapid intimacy but may also mean you are recreating dynamics you know, including ones that do not serve you.`;
    }

    if (!attractionSignals) {
        attractionSignals = `\nYour responses suggest a pattern of being drawn to ${hookDesc}. This initial attraction often carries signals about the relationship that will follow, though these signals may only become clear in retrospect.`;
    }

    return `## The Attraction Fingerprint

What draws you to certain partners is not random. It is a fingerprint, a pattern of attraction shaped by what your system learned to seek, avoid, and recognize.

You tend to be drawn to ${hookDesc}. This attraction is not a flaw; it is information. It tells you something about what your nervous system has learned to value, even when that valuing creates complications.
${attractionSignals}

Understanding your attraction fingerprint does not require you to override it. It simply invites you to notice it, to bring awareness to what has been automatic, so that you can choose with more information rather than less.`;
}

function generateRelationshipTimeline(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData,
    _flags: Record<string, boolean | string>
): string {

    const distanceDesc = DISTANCE_RESPONSE_DESCRIPTIONS[patternData.distance_response];
    const conflictDesc = CONFLICT_STYLE_DESCRIPTIONS[patternData.conflict_style];
    const repairDesc = REPAIR_STYLE_DESCRIPTIONS[patternData.repair_style];
    const activationDesc = ACTIVATION_SPEED_DESCRIPTIONS[patternData.activation_speed];
    const endingDesc = ENDING_THEME_DESCRIPTIONS[patternData.ending_theme];
    const checkpoints = archetype.timeline_checkpoints;

    return `## The Relationship Timeline

Your pattern does not simply exist; it unfolds. It follows a predictable sequence, from the first spark of connection through the eventual ending. Understanding this timeline can help you recognize where you are in the pattern as it is happening, rather than only in retrospect.

### Early Phase: The Beginning

${archetype.early_phase}

> **Checkpoint:**
> - *What you think:* ${checkpoints.early.what_you_think}
> - *What you do:* ${checkpoints.early.what_you_do}
> - *What partner experiences:* ${checkpoints.early.what_partner_experiences}
> - *What this reinforces:* ${checkpoints.early.what_this_reinforces}

### Middle Phase: The Shift

${archetype.middle_phase}

This is where the pattern begins to grip. The dynamics that felt manageable early on start to intensify. Your responses become more automatic, your strategies more entrenched. When distance appears, your instinct is ${distanceDesc}. When ${activationDesc}, the pattern is fully active.

> **Checkpoint:**
> - *What you think:* ${checkpoints.middle.what_you_think}
> - *What you do:* ${checkpoints.middle.what_you_do}
> - *What partner experiences:* ${checkpoints.middle.what_partner_experiences}
> - *What this reinforces:* ${checkpoints.middle.what_this_reinforces}

### Stress Phase: The Escalation

${archetype.stress_phase}

Under pressure, the pattern reveals its full shape. During conflict, your default is ${conflictDesc}. After rupture, your approach to repair involves ${repairDesc}. These are not choices made from calm reflection; they are automatic responses, your system doing what it learned to do.

> **Checkpoint:**
> - *What you think:* ${checkpoints.stress.what_you_think}
> - *What you do:* ${checkpoints.stress.what_you_do}
> - *What partner experiences:* ${checkpoints.stress.what_partner_experiences}
> - *What this reinforces:* ${checkpoints.stress.what_this_reinforces}

The loop signature for your pattern is: **${archetype.loop_signature}**

### Breakdown Phase: The Ending

${archetype.breakdown_phase}

> **Checkpoint:**
> - *What you think:* ${checkpoints.breakdown.what_you_think}
> - *What you do:* ${checkpoints.breakdown.what_you_do}
> - *What partner experiences:* ${checkpoints.breakdown.what_partner_experiences}
> - *What this reinforces:* ${checkpoints.breakdown.what_this_reinforces}

Endings in this pattern often share a common theme: ${endingDesc}. This is not because you are destined to repeat, but because the same mechanism is running. Different partners, same underlying dynamic. The relationship changes; the pattern does not, until it is seen.`;
}

function generateBlindSpot(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    patternData: DerivedPatternData
): string {
    let awarenessText = '';
    switch (patternData.awareness_level) {
        case 'high':
            awarenessText = 'You have known for some time that this pattern exists. The frustration is not lack of awareness; it is the inability to stop what you can see coming.';
            break;
        case 'moderate':
            awarenessText = 'You have noticed the repetition, even if the full mechanism was not clear. There has been a sense that something keeps happening, though the "why" remained obscured.';
            break;
        case 'emerging':
            awarenessText = 'The pattern is becoming visible to you, perhaps for the first time. What seemed like isolated incidents may now be revealing a thread that connects them.';
            break;
        case 'low':
            awarenessText = 'Until now, each relationship may have felt unique. The pattern was operating, but it was invisible, like water to a fish. Seeing it for the first time can be disorienting.';
            break;
    }

    let loopAwarenessText = '';
    switch (patternData.loop_awareness) {
        case 'high':
            loopAwarenessText = 'You often feel like you are watching yourself make the same moves, unable to stop. The loop is visible even as it is happening.';
            break;
        case 'moderate':
            loopAwarenessText = 'You sometimes recognize, afterward, that you have been here before. The loop becomes visible in retrospect, even if it is hard to see in real-time.';
            break;
        case 'low':
            loopAwarenessText = 'In the moment, you are often too activated to observe the pattern. The awareness comes later, if at all, when the intensity has passed.';
            break;
    }

    return `## The Blind Spot

${archetype.blind_spot_description}

### Why Knowing Has Not Been Enough

${awarenessText}

${loopAwarenessText}

The blind spot is not stupidity or weakness. It is the nature of patterns: they feel right, even when they are harmful. The protective response was designed to keep you safe, and it does not easily admit that safety might look different now.

### Why Standard Advice Fails

${archetype.why_advice_fails}

What makes change possible is not simply knowing the pattern, but learning to catch it earlier, in the first 10% rather than the last 90%. This is not about stopping the feeling; it is about creating space between the feeling and the automatic response.`;
}

function generateModifiersSection(
    modifiers: SecondaryModifier[],
    _flags: Record<string, boolean | string>
): string {

    if (modifiers.length === 0) {
        return `## Context Variability

Your responses did not show strong activation of secondary modifiers. This means your pattern likely manifests consistently across different relationship contexts.

However, it is worth noting that the same core pattern can look different depending on the partner. With someone who pursues you, your pattern may manifest one way. With someone who withdraws, it may manifest another. The core fear and loop remain, but the specific behaviors can shift based on the relational dance.

This consistency can be both clarifying and challenging. Clarifying because you are not dealing with multiple overlapping patterns. Challenging because there is no "it depends" to hide behind. The pattern is the pattern, regardless of context.`;
    }

    const sections: string[] = [];
    sections.push(`## Your Modifiers`);

    for (const modName of modifiers.slice(0, 2)) {
        const mod = MODULE_TEMPLATES[modName];
        if (mod) {
            const tellBullets = mod.tells.map(t => `- ${t}`).join('\n');
            sections.push(`
### ${mod.name}

${mod.full_description}

**How It Shows Up:**

${mod.how_it_shows_up}

**Why It Makes Sense:**

${mod.why_it_makes_sense}

**Specific Tells:**

${tellBullets}`);
        }
    }

    return sections.join('\n');
}

function generateDeepAnalysis(aiInsights: any): string {
    return `## Deep Flag Analysis

${aiInsights.deep_flag_analysis}

## Subconscious Commitments

${aiInsights.subconscious_commitments}`;
}

function generateContradictionResolved(
    patternData: DerivedPatternData,
    _flags: Record<string, boolean | string>,
    aiInsights?: any
): string {


    let contradictionContent = '';

    if (patternData.contradiction_value) {
        contradictionContent = `The tension at the heart of your pattern is this: ${patternData.contradiction_value}

This is not hypocrisy. It is not confusion. It is the inevitable result of a system that learned to want something and fear it at the same time.

The wanting is real. You genuinely desire what you desire: connection, safety, trust, stability, love. These are not defensive claims; they are core needs.

The protection is also real. Your system learned that wanting these things was dangerous, that pursuing them led to harm, that having them meant risking their loss. So it built defenses. Smart, adaptive, context-appropriate defenses that kept you safe.

The contradiction is the meeting point of wanting and protecting. You want closeness and you keep distance. You want trust and you test it relentlessly. You want stability and you create disruption. Not because you are broken, but because two legitimate parts of you are pulling in different directions.

Resolution does not mean choosing one over the other. It means recognizing both, honoring what each is trying to do, and slowly teaching your system that it may be possible to want AND have, to need AND be met, to open AND survive.`;
    } else {
        contradictionContent = `Most patterns carry an internal contradiction: wanting something and protecting against it simultaneously.

You may want deep connection while creating distance. You may want trust while testing it constantly. You may want stability while unconsciously disrupting it. These are not signs of inconsistency; they are signs of a system doing two things at once.

The wanting is real. The protection is also real. Both are trying to keep you safe in their own way. The wanting reaches for what you need. The protecting defends against the danger of having it.

Understanding this can reduce self-blame. You are not working against yourself because you are flawed. You are managing competing directives from different parts of your experience. The challenge is integration, not elimination.`;
    }

    const resolutionContent = aiInsights?.contradiction_resolution
        ? `${contradictionContent}\n\n### Personalized Resolution\n\n${aiInsights.contradiction_resolution}`
        : contradictionContent;

    return `## The Core Contradiction Resolved

${resolutionContent}`;

}

function generateGoingForward(
    archetype: typeof ARCHETYPE_TEMPLATES[keyof typeof ARCHETYPE_TEMPLATES],
    aiInsights?: any
): string {

    const noticePoints = archetype.what_to_notice.map(p => `- ${p}`).join('\n');

    const adviceContent = aiInsights?.personalized_advice && typeof aiInsights.personalized_advice === 'string'
        ? `\n\n### Personalized Next Steps\n\n${aiInsights.personalized_advice}`
        : '';

    return `## What This Means Going Forward

This report is not a prescription. There are no steps to follow, no exercises to complete, no timeline for healing. What it offers instead is a map: a clearer picture of the territory you have been navigating.

What you might notice going forward:

${noticePoints}${adviceContent}

The goal is not to stop the pattern through force of will. It is to catch it earlier, to bring awareness to what has been automatic, to create a choice where there was only reaction.

Change happens not by fighting the pattern but by seeing it clearly, again and again, until the automatic becomes conscious and the conscious becomes optional.`;

}

/**
 * NEW: Generate Evidence Appendix (restructured from Personalized Signals)
 * Organizes user responses into categories: triggers, behaviors, beliefs, conflict style
 */
function generateEvidenceAppendix(
    flags: Record<string, boolean | string>,
    tells: string[]
): string {
    const flagKeys = Object.keys(flags).filter(k => flags[k] === true);

    // Categorize signals
    const triggers: string[] = [];
    const behaviors: string[] = [];
    const beliefs: string[] = [];
    const conflictStyles: string[] = [];
    const other: string[] = [];

    for (const key of flagKeys) {
        if (FLAG_TELLS[key]) {
            const tell = FLAG_TELLS[key];
            if (key.includes('t_') || key.includes('trigger')) {
                triggers.push(`- ${tell}`);
            } else if (key.includes('d_') || key.includes('pw_') || key.includes('behavior')) {
                behaviors.push(`- ${tell}`);
            } else if (key.includes('c_') || key.includes('conflict') || key.includes('r_')) {
                conflictStyles.push(`- ${tell}`);
            } else if (key.includes('belief') || key.includes('core_')) {
                beliefs.push(`- ${tell}`);
            } else {
                other.push(`- ${tell}`);
            }
        }
    }

    // Add from tells to fill gaps
    for (const tell of tells) {
        if (other.length < 10 && !other.includes(`- ${tell}`)) {
            other.push(`- ${tell}`);
        }
    }

    // Build sections
    const sections: string[] = [];

    if (triggers.length > 0) {
        sections.push(`### Triggers You Endorsed\n\n${triggers.slice(0, 6).join('\n')}`);
    }
    if (behaviors.length > 0) {
        sections.push(`### Behavioral Patterns\n\n${behaviors.slice(0, 6).join('\n')}`);
    }
    if (conflictStyles.length > 0) {
        sections.push(`### Conflict & Repair Styles\n\n${conflictStyles.slice(0, 6).join('\n')}`);
    }
    if (beliefs.length > 0 || other.length > 0) {
        const combined = [...beliefs, ...other].slice(0, 8);
        sections.push(`### Core Beliefs & Signals\n\n${combined.join('\n')}`);
    }

    // Ensure minimum content
    if (sections.length === 0) {
        sections.push(`### Signals From Your Responses\n\n- You notice patterns in your relationships that feel familiar
- Certain dynamics trigger stronger reactions than the situation warrants
- You sometimes feel like you are watching yourself repeat old scripts
- The same themes emerge across different relationships
- Your responses to relationship stress follow predictable paths`);
    }

    return `## Appendix: Evidence From Your Responses

This section summarizes what your quiz responses revealed. Each item below is something you endorsed or indicated through your answers.

${sections.join('\n\n')}

---

*This report was generated by the Relationship Pattern Diagnostic. It offers an explanation, not a prescription. Use it as a starting point for reflection, not as a final verdict.*`;
}

export default { generateReports };
