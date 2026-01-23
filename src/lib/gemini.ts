/**
 * Gemini AI Service
 * Client-side service to communicate with the local backend proxy for AI report generation
 */

import type { ReportInputs } from './reportGenerator/types';
import { FLAG_TELLS } from './reportGenerator/flagMappings';

const API_URL = 'http://localhost:3000/api/generate-report';

export interface AIReportInsights {
    executive_summary_enhancement: string;
    contradiction_resolution: string;
    personalized_advice: string;
    // New Sections for Deep Analysis (2k+ words total target)
    deep_flag_analysis: string;        // ~500 words
    subconscious_commitments: string;  // ~400 words
    shadow_mechanism: string;          // ~400 words
    future_self_letter: string;        // ~500 words
}

/**
 * Generate personalized analysis using Gemini 2.0 Flash
 */
export async function generatePersonalizedAnalysis(inputs: ReportInputs): Promise<AIReportInsights | null> {
    try {
        const prompt = constructPrompt(inputs);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Validate critical fields. We check a simplified set but expect all.
        if (data.executive_summary_enhancement && data.deep_flag_analysis) {
            return data as AIReportInsights;
        }

        console.warn('AI response missing required fields:', data);
        return null;

    } catch (error) {
        console.error('AI Generation Failed:', error);
        return null;
    }
}

/**
 * Construct the prompt for Gemini
 */
function constructPrompt(inputs: ReportInputs): string {
    // Map raw flags to human-readable descriptions
    const flags = Object.keys(inputs.key_flags)
        .filter(k => inputs.key_flags[k] === true)
        .map(k => {
            // Use the detailed tell if available, otherwise cleaner fallback
            if (FLAG_TELLS[k]) return FLAG_TELLS[k];
            // Fallback: "p_abandonment" -> "abandonment"
            return k.split('_').slice(1).join(' ');
        })
        .join('\n- ');

    const modifiers = inputs.secondary_modifiers.join(', ');

    return `
You are an expert relationship psychologist analyzing a user's quiz results.
Your goal is to generate a MASSIVE, deep-dive psychological analysis (approx 2,000 words total) that feels hyper-personalized.

CRITICAL INSTRUCTION:
Write completely in natural language. DO NOT use technical identifiers, codes, or parentheses to cite sources.
Use the behavioral indicators below to form a narrative, but do not quote them mechanistically.
For example, if an indicator says "You often sense when someone is pulling away", you might write: "Your intuition for distance is highly tuned..."

User Profile:
- Name: ${inputs.user_first_name || 'Client'}
- Primary Archetype: ${inputs.primary_archetype}
- Secondary Modifiers: ${modifiers || 'None'}
- Key Behavioral Indicators:
- ${flags}

- User's Reflection: "${inputs.reflection_text || 'No reflection provided'}"
- Relationship Context: ${inputs.relationship_context || 'Unknown'}

Task:
Generate a JSON object with 7 deeply detailed sections.
Write in a warm, direct, sophisticated clinical tone. Avoid cliches. Use specific flags to anchor your insights.

JSON Structure:
{
  "executive_summary_enhancement": "2-3 sentences weaving their specific modifiers and reflection into the archetype summary.",
  
  "contradiction_resolution": "A paragraph resolving the specific tension between their desire for connection and their protective behaviors.",
  
  "personalized_advice": "5 specific, actionable micro-steps based strictly on their behavioral flags.",
  
  "deep_flag_analysis": "A 500-word deep dive into their specific combination of indicators. How does 'Flag X' interact with 'Flag Y'? What specific texture does this give their pattern? Be granular.",
  
  "subconscious_commitments": "A 400-word analysis of what they are subconsciously committed to maintaining (e.g. 'You are committed to being misunderstood because it confirms your safety strategy'). Use the 'Hidden Drivers' concept.",
  
  "shadow_mechanism": "A 400-word explanation of the darkest part of their loop: the part they most want to look away from. Be gentle but surgical. Mirror their reflection back to them.",
  
  "future_self_letter": "A 500-word narrative letter from their 'healed future self' to their current self, acknowledging the pain of the current pattern and offering a vision of the specific freedom that comes from breaking this specific loop."
}

Ensure the output is valid JSON.
`;
}
