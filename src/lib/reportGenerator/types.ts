/**
 * Report Generator Types
 * Based on the 2-tier report specification
 */

export type PrimaryArchetype =
    | 'The Anxious Pursuer'
    | 'The Protective Withdrawer'
    | 'The Devoted Caretaker'
    | 'The Chaos Magnet'
    | 'The Invisible Partner'
    | 'The Guarded Heart';

export type SecondaryModifier =
    | 'Anxious Pursuit'
    | 'Avoidant Shutdown'
    | 'Over-Functioning / Caretaker'
    | 'Control / Power Sensitivity'
    | 'Chaos Chemistry'
    | 'Emotional Starvation';

export type RelationshipContext =
    | 'single'
    | 'dating'
    | 'long-term'
    | 'recently ended';

export interface ReportInputs {
    user_first_name?: string;
    primary_archetype: PrimaryArchetype;
    secondary_modifiers: SecondaryModifier[];
    key_flags: Record<string, boolean | string>;
    reflection_text?: string;
    top_selections?: string[];
    relationship_context?: RelationshipContext;
}

export interface ReportOutputs {
    free_report_markdown: string;
    paywall_preview_markdown: string;
    paid_report_markdown: string;
}

// Core fear types derived from fear flags
export type CoreFear =
    | 'abandonment'
    | 'engulfment'
    | 'betrayal'
    | 'deprivation'
    | 'defectiveness';

// Loop behavior types
export type DistanceResponse = 'pursue' | 'withdraw' | 'appease' | 'escalate' | 'monitor';
export type ActivationSpeed = 'instant' | 'fast' | 'delayed' | 'suppressed' | 'regulated';
export type RepairStyle = 'process' | 'avoid' | 'over_apologize' | 'passive' | 'demonstrate';
export type ConflictStyle = 'resolve' | 'exit' | 'agree' | 'freeze' | 'fight';

// Attraction patterns
export type AttractionHook = 'unavailable' | 'wounded' | 'intensity' | 'safe' | 'mirror';
export type EndingTheme = 'betrayal' | 'fizzle' | 'overstayed' | 'too_much' | 'fled';

// Derived pattern data from flags
export interface DerivedPatternData {
    core_fear: CoreFear;
    distance_response: DistanceResponse;
    activation_speed: ActivationSpeed;
    repair_style: RepairStyle;
    conflict_style: ConflictStyle;
    attraction_hook: AttractionHook;
    ending_theme: EndingTheme;
    contradiction_type: string;
    contradiction_value: string;
    awareness_level: 'high' | 'moderate' | 'emerging' | 'low';
    loop_awareness: 'high' | 'moderate' | 'low';
}

// Template slots for content generation
export interface TemplateSlots {
    core_fear: string;
    core_fear_description: string;
    attraction_hook: string;
    attraction_hook_description: string;
    distance_response: string;
    distance_response_description: string;
    conflict_style: string;
    conflict_style_description: string;
    repair_style: string;
    repair_style_description: string;
    activation_speed: string;
    activation_speed_description: string;
    ending_theme: string;
    ending_theme_description: string;
    contradiction: string;
    contradiction_description: string;
    reflection_quote: string;
    reflection_interpretation: string;
}

// Diagnostic snapshot for premium report header
export interface DiagnosticSnapshot {
    core_fear: string;
    primary_trigger: string;
    primary_response: string;
    rupture_style: string;
    repair_style: string;
    aftermath: string;
    misread_risk: string;
}

// Checkpoint data for timeline phases
export interface TriggerCheckpoint {
    what_you_think: string;
    what_you_do: string;
    what_partner_experiences: string;
    what_this_reinforces: string;
}

// Evidence categories from user responses
export interface EvidenceFromResponses {
    triggers_endorsed: string[];
    behaviors_endorsed: string[];
    beliefs_endorsed: string[];
    conflict_repair_endorsed: string[];
}

