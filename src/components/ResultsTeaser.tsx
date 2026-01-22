import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useQuizStore, getRecommendedClusters, getPatternArchetype } from '../store/useQuizStore';
import { trackEvent } from '../lib/analytics';

/**
 * Results Teaser - Pre-Paywall Screen
 * Based on quiz_design.md specifications:
 * 
 * SHOW:
 * - Pattern name (primary)
 * - One-paragraph explanation: core fear, typical partner dynamic, repeating outcome
 * - One quoted line from their reflection (if provided)
 * 
 * DO NOT SHOW:
 * - Origin explanation
 * - Full loop breakdown
 * - How to fix
 * - Secondary modifiers
 */

const ResultsTeaser: React.FC = () => {
    const { scores, flags, reflections, quizSessionId } = useQuizStore();
    const results = getRecommendedClusters(scores, flags);
    const archetype = flags.length > 0 ? getPatternArchetype(flags) : null;

    useEffect(() => {
        trackEvent(quizSessionId, 'quiz_complete', {
            primary: archetype?.primary.id || results.primary,
            secondary: archetype?.secondary?.id || results.secondary,
            scores: scores,
            flagCount: flags.length
        });
    }, [quizSessionId, archetype, results, scores, flags.length]);

    // Get reflection quote if available
    const reflectionQuote = Object.values(reflections)[0] || null;

    const handleUnlock = async () => {
        trackEvent(quizSessionId, 'checkout_click', {
            price: '$9',
            product: 'Full Report',
            archetype: archetype?.primary.id
        });
        try {
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    priceId: 'price_1SsQ1hGreyv23Im6tgUCrzw7',
                    quizSessionId: quizSessionId
                }
            });

            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Could not initialize checkout. Please try again.');
        }
    };

    // Use archetype data if available, fallback to cluster IDs
    const patternName = archetype?.primary.name || `Pattern ${results.primary}`;
    const coreFear = archetype?.primary.coreFear || 'Unresolved Attachment';

    // Generate dynamic teaser description based on archetype
    const getTeaserDescription = () => {
        if (!archetype) {
            return "Your responses reveal a deeply rooted pattern that shapes how you connect, protect yourself, and ultimately, why your relationships unfold the way they do.";
        }

        const descriptions: Record<string, string> = {
            ANXIOUS_PURSUER: `Your pattern centers on a core fear of abandonment. When connection feels uncertain, you move closer—often at the cost of yourself. The more you pursue, the more distance seems to grow. This isn't a flaw; it's a protection that no longer protects you.`,
            PROTECTIVE_WITHDRAWER: `Your pattern reveals a core fear of losing yourself. When intimacy intensifies, something in you pulls back—not because you don't want closeness, but because it feels threatening. The walls you've built were necessary once. Now they may be keeping out what you need most.`,
            DEVOTED_CARETAKER: `Your pattern is rooted in the belief that love must be earned through usefulness. You give until you're empty, then feel invisible when that giving goes unreciprocated. The exhaustion you carry isn't weakness—it's the weight of a role you were never meant to play alone.`,
            CHAOS_MAGNET: `Your pattern reveals an unconscious equation: intensity equals love. Stability feels suspicious, even boring. You may create conflict to feel connection, or seek partners who keep you on edge. This isn't self-sabotage—it's the only kind of love that feels real.`,
            INVISIBLE_PARTNER: `Your pattern shows a history of suppressed needs. You've learned that asking for too much drives people away, so you ask for nothing—and receive exactly that. The loneliness you feel in relationships isn't about the other person. It's about the parts of you that never get to exist.`,
            GUARDED_HEART: `Your pattern emerges from a core fear of betrayal. You've been hurt before, and your hypervigilance is designed to see it coming next time. But watching for danger often confirms its presence—even when it isn't there. Your walls keep you safe, but they also keep you alone.`,
        };

        return descriptions[archetype.primary.id] || descriptions.ANXIOUS_PURSUER;
    };

    return (
        <div className="container teaser-view">
            <div className="mono text-secondary mb-4">DIAGNOSTIC COMPLETE</div>

            {/* Pattern Name - Primary */}
            <h1 className="serif teaser-title">{patternName}</h1>
            <div className="mono text-secondary mb-6" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                Core Fear: {coreFear}
            </div>

            {/* Teaser Content - One paragraph explanation */}
            <div className="teaser-content">
                <p className="serif teaser-description" style={{
                    fontSize: '1.15rem',
                    lineHeight: '1.8',
                    marginBottom: '2rem',
                    opacity: 0.9
                }}>
                    {getTeaserDescription()}
                </p>

                {/* Reflection Quote (if provided) */}
                {reflectionQuote && (
                    <blockquote className="reflection-quote" style={{
                        borderLeft: '3px solid var(--color-accent, #666)',
                        paddingLeft: '1.5rem',
                        marginBottom: '2rem',
                        fontStyle: 'italic',
                        opacity: 0.85
                    }}>
                        <p className="serif">"{reflectionQuote}"</p>
                        <cite className="mono text-secondary" style={{ fontSize: '0.75rem' }}>
                            — Your reflection
                        </cite>
                    </blockquote>
                )}

                {/* Blurred Preview */}
                <div className="teaser-blur-overlay" style={{ marginTop: '1.5rem' }}>
                    <div className="blurred-text">
                        The full report reveals how this pattern formed, the specific triggers that activate it,
                        and the predictable sequence that unfolds from first attraction through eventual rupture.
                        Understanding the loop is the first step to interrupting it.
                    </div>
                </div>
            </div>

            {/* Paywall Card */}
            <div className="paywall-card">
                <h2 className="serif" style={{ marginBottom: '1rem' }}>See the Full Pattern</h2>

                <ul className="paywall-features" style={{
                    textAlign: 'left',
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                }}>
                    <li style={{ marginBottom: '0.5rem' }}>✦ Why this pattern formed</li>
                    <li style={{ marginBottom: '0.5rem' }}>✦ How it unfolds from attraction → rupture</li>
                    <li style={{ marginBottom: '0.5rem' }}>✦ Why it keeps repeating even when you "know better"</li>
                    <li style={{ marginBottom: '0.5rem' }}>✦ The complete 12-section editorial report</li>
                </ul>

                <button className="btn-next" onClick={handleUnlock}>
                    Unlock Full Report — $9
                </button>

                <p className="mono text-secondary mt-4" style={{ fontSize: '0.7rem' }}>
                    Secured by Stripe • Instant access
                </p>
            </div>
        </div>
    );
};

export default ResultsTeaser;
