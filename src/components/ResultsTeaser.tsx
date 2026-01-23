import React, { useEffect } from 'react';
import { useQuizStore, getRecommendedClusters, getPatternArchetype } from '../store/useQuizStore';
import { trackEvent } from '../lib/analytics';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock } from 'lucide-react';
import { useReportGenerator } from '../lib/reportGenerator/useReportGenerator';
import { supabase } from '../lib/supabase';

// Pattern-specific copy for the gaps (moved from FreeReport)
const PATTERN_SPECIFIC_GAPS: Record<string, string[]> = {
    ANXIOUS_PURSUER: [
        "why this pattern formed in the first place",
        "why different partners lead to similar endings",
        "the exact moment the loop usually locks in",
        "why awareness alone hasn't stopped it",
    ],
    PROTECTIVE_WITHDRAWER: [
        "why intimacy triggers your protective response",
        "why partners often feel shut out when you're just regulating",
        "the exact moment you start pulling away",
        "why more space never actually resolves the tension",
    ],
    DEVOTED_CARETAKER: [
        "why being needed became your way of earning love",
        "why asking for yourself feels dangerous",
        "the exact moment your needs became invisible",
        "why exhaustion doesn't make you stop giving",
    ],
    CHAOS_MAGNET: [
        "why peace feels more threatening than chaos",
        "why you're drawn to partners who keep you on edge",
        "the exact moment you start engineering disruption",
        "why self-sabotage feels like self-protection",
    ],
    INVISIBLE_PARTNER: [
        "why your needs became dangerous to express",
        "why partners feel you're 'fine' when you're not",
        "the exact moment you learned to disappear",
        "why being seen feels more terrifying than being alone",
    ],
    GUARDED_HEART: [
        "why you expect betrayal even from people who haven't earned it",
        "why trust feels like vulnerability, not connection",
        "the exact moment you start looking for evidence against them",
        "why walls keep you safe but also keep you alone",
    ],
};

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
    const { scores, flags, reflections, quizSessionId, primaryArchetype } = useQuizStore();
    const { reports } = useReportGenerator();
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
            price: '$9.99',
            product: 'Full Report',
            archetype: archetype?.primary.id
        });
        try {
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    priceId: 'price_1SsaAxGreyv23Im6pF4pJzyJ',
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
            ANXIOUS_PURSUER: `Your pattern centers on a core fear of abandonment. When connection feels uncertain, you move closer, often at the cost of yourself. The more you pursue, the more distance seems to grow. You likely find yourself monitoring their tone, response times, and micro-shifts in mood, seeking the reassurance that the bond is still secure. This drive isn't "clinging": it is your system's best attempt to prevent the pain of disconnection.`,
            PROTECTIVE_WITHDRAWER: `Your pattern reveals a core fear of losing yourself. When intimacy intensifies, something in you pulls back. This isn't because you don't want closeness; it is because closeness feels threatening. You might feel a physical sense of pressure or "suffocation" when a partner asks for more than you're ready to give. By retreating into silence or self-reliance, you maintain a sense of safety, but often at the expense of the connection you actually desire.`,
            DEVOTED_CARETAKER: `Your pattern is rooted in the belief that love must be earned through usefulness. You give until you're empty, then feel invisible when that giving goes unreciprocated. You are hyper-aware of your partner's needs while subtly suppressing your own: you believe that as long as you are "useful," you are safe from being left. This leads to a quiet, growing resentment that neither of you fully understands until the burnout becomes absolute.`,
            CHAOS_MAGNET: `Your pattern reveals an unconscious equation: intensity equals love. Stability feels suspicious, even boring. You may create conflict to feel connection, or seek partners who keep you on edge. Your system likely associates peace with abandonment or stagnation: it seeks out high-stakes emotional intensity to prove that you are seen and alive. This emotional turbulence is exhausting, yet it is the only baseline that feels familiar.`,
            INVISIBLE_PARTNER: `Your pattern shows a history of suppressed needs. You've learned that asking for too much drives people away, so you ask for nothing; you receive exactly that. You often fade into the background of your own life, prioritizing harmony over truth and "niceness" over intimacy. By never taking up space, you avoid conflict, but you also ensure that the person your partner loves isn't actually you.`,
            GUARDED_HEART: `Your pattern emerges from a core fear of betrayal. You've been hurt before, and your hypervigilance is designed to see it coming next time. You scan every interaction for signs of the "exit," waiting for the inevitable moment when the other person proves they aren't who they said they were. This protection keeps you from being blindsided, but it also creates the very distance that makes genuine trust impossible to build.`,
        };

        return descriptions[archetype.primary.id] || descriptions.ANXIOUS_PURSUER;
    };

    return (
        <div className="container teaser-view">
            <div className="mono text-secondary mb-4" style={{ letterSpacing: '0.15em' }}>PRELIMINARY REPORT: READY</div>

            <div style={{ marginBottom: '2rem' }}>
                <div className="mono" style={{
                    color: '#10b981',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span>✅</span> PART 1: SUMMARY (UNLOCKED)
                </div>

                {/* Pattern Name - Primary */}
                <h1 className="serif teaser-title" style={{ marginTop: 0 }}>{patternName}</h1>
                <div className="mono text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                    Core Fear: {coreFear}
                </div>
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

                {/* FULL FREE REPORT SUMMARY */}
                {reports?.free_report_markdown && (
                    <div className="report-content" style={{ marginTop: '2rem', padding: '0 1rem' }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ children }) => (
                                    <h2 className="serif report-section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="serif report-subsection-title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{children}</h3>
                                ),
                                p: ({ children }) => (
                                    <p className="report-paragraph" style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="report-list" style={{ marginBottom: '1.25rem' }}>{children}</ul>
                                ),
                                li: ({ children }) => (
                                    <li className="report-list-item" style={{ marginBottom: '0.5rem' }}>{children}</li>
                                ),
                                strong: ({ children }) => (
                                    <strong className="report-emphasis" style={{ fontWeight: 'bold' }}>{children}</strong>
                                ),
                                em: ({ children }) => (
                                    <em className="report-italic" style={{ fontStyle: 'italic' }}>{children}</em>
                                ),
                                hr: () => (
                                    <hr className="report-divider" style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />
                                )
                            }}
                        >
                            {reports.free_report_markdown}
                        </ReactMarkdown>
                    </div>
                )}

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
                            Your reflection
                        </cite>
                    </blockquote>
                )}

                {/* Cliffhanger / Bridge */}
                <div style={{
                    margin: '3rem 0',
                    padding: '1.5rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0,0,0,0.02)'
                }}>
                    <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        REPORT STATUS
                    </div>
                    <p className="serif" style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
                        <strong>Status:</strong> Your primary pattern is identified.<br />
                        <span style={{ opacity: 0.7 }}>
                            <strong>Missing Data:</strong>
                        </span>
                    </p>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        marginTop: '1rem',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        opacity: 0.6
                    }}>
                        {(PATTERN_SPECIFIC_GAPS[primaryArchetype || archetype?.primary.id || 'ANXIOUS_PURSUER'] || PATTERN_SPECIFIC_GAPS.ANXIOUS_PURSUER).map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                <Lock size={12} style={{ position: 'absolute', left: 0, top: '4px', opacity: 0.5 }} />
                                <span className="mono" style={{ fontSize: '0.7rem', marginRight: '8px', opacity: 0.8 }}>[LOCKED]</span>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>🔒</div>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>

                <div className="mono" style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                    opacity: 0.6
                }}>
                    PART 2: THE DEEP DIVE (LOCKED)
                </div>
            </div>

            {/* Paywall Card */}
            <div className="paywall-card" style={{
                background: 'var(--card-surface)',
                border: '1px solid var(--border-color)',
                padding: '2.5rem',
                textAlign: 'center',
                borderRadius: '4px'
            }}>
                <h2 className="serif" style={{ marginBottom: '0.5rem', fontSize: '1.6rem' }}>The Full 15-Page Deep Dive</h2>
                <p className="mono text-secondary mb-6" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    Instant Digital Download (PDF)
                </p>

                <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <p className="serif mb-4" style={{ fontSize: '1rem', opacity: 0.9 }}>
                        You have seen the <em>what</em> ({patternName}).<br />
                        The full report explains the <em>why</em>.
                    </p>

                    <ul className="paywall-features" style={{
                        listStyle: 'none',
                        padding: 0,
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                    }}>
                        <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-warm)' }}>✦</span>
                            <strong>The Origin Story:</strong> Why your system learned that "love requires vigilance".
                        </li>
                        <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-warm)' }}>✦</span>
                            <strong>The Trigger Map:</strong> The exact moment the loop locks in before you realize it.
                        </li>
                        <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-warm)' }}>✦</span>
                            <strong>The Blind Spot:</strong> Why you analyze the relationship instead of experiencing it.
                        </li>
                    </ul>

                    <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                        <p className="mono" style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                            0% FLUFF. 100% DIAGNOSIS.
                        </p>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <span className="mono text-secondary" style={{
                        textDecoration: 'line-through',
                        marginRight: '0.75rem',
                        fontSize: '1rem',
                        opacity: 0.6
                    }}>
                        $29
                    </span>
                    <span className="serif" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)'
                    }}>
                        $9.99
                    </span>
                </div>

                <button className="btn-next" onClick={handleUnlock} style={{ width: '100%', padding: '1.25rem' }}>
                    GET MY FULL REPORT
                </button>

                <p className="mono text-secondary mt-4" style={{ fontSize: '0.7rem' }}>
                    Secured by Stripe • Instant access
                </p>

                <div className="mt-8 pt-6" style={{ borderTop: '1px dotted var(--border-color)', opacity: 0.5 }}>
                    <p className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                        This isn't advice. It's an explanation of the mechanism.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultsTeaser;
