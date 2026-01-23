/**
 * FreeReport Component - Conversion-Optimized
 * 
 * Based on conversion feedback:
 * - Delay the sell (CTA after content earns authority)
 * - Clarify the knowledge gap (what this doesn't explain)
 * - Pattern-specific paid preview bullets
 * - Shift from "there's more" → "this is incomplete in exact ways"
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock } from 'lucide-react';
import { useReportGenerator } from '../lib/reportGenerator/useReportGenerator';
import { useQuizStore, getPatternArchetype } from '../store/useQuizStore';
import { trackEvent } from '../lib/analytics';

// Pattern-specific copy for the paid preview bullets
const PATTERN_SPECIFIC_BULLETS: Record<string, { reveals: string[]; gap: string[] }> = {
    ANXIOUS_PURSUER: {
        reveals: [
            "Why you're drawn to partners who feel slightly out of reach: and why that chemistry feels urgent",
            "The exact moment the loop locks in: when reassurance stops working and pursuit intensifies",
            "Why wanting to be chosen leads you to push harder: and how that pressure creates distance",
            "The blind spot that keeps you analyzing the relationship instead of experiencing it",
        ],
        gap: [
            "why this pattern formed in the first place",
            "why different partners lead to similar endings",
            "the exact moment the loop usually locks in",
            "why awareness alone hasn't stopped it",
        ]
    },
    PROTECTIVE_WITHDRAWER: {
        reveals: [
            "Why closeness feels like a threat to your autonomy: not because you don't want it",
            "The exact moment withdrawal becomes automatic: when connection starts to feel like obligation",
            "Why partners experience your need for space as rejection: even when it isn't",
            "The blind spot that makes you choose distance over discomfort, every time",
        ],
        gap: [
            "why intimacy triggers your protective response",
            "why partners often feel shut out when you're just regulating",
            "the exact moment you start pulling away",
            "why more space never actually resolves the tension",
        ]
    },
    DEVOTED_CARETAKER: {
        reveals: [
            "Why giving feels safer than receiving: and what you're protecting by staying useful",
            "The exact moment resentment builds: when care isn't reciprocated and you can't say so",
            "Why you attract partners who take more than they give: and why you stay",
            "The blind spot that keeps you invisible in your own relationships",
        ],
        gap: [
            "why being needed became your way of earning love",
            "why asking for yourself feels dangerous",
            "the exact moment your needs became invisible",
            "why exhaustion doesn't make you stop giving",
        ]
    },
    CHAOS_MAGNET: {
        reveals: [
            "Why stability feels suspicious: and why intensity feels like proof of connection",
            "The exact moment boredom becomes unbearable: when you create conflict to feel alive",
            "Why calm partners feel 'off': and why volatile ones feel like home",
            "The blind spot that mistakes drama for passion, every time",
        ],
        gap: [
            "why peace feels more threatening than chaos",
            "why you're drawn to partners who keep you on edge",
            "the exact moment you start engineering disruption",
            "why self-sabotage feels like self-protection",
        ]
    },
    INVISIBLE_PARTNER: {
        reveals: [
            "Why you've learned that asking for too much drives people away: so you ask for nothing",
            "The exact moment you disappear: when your needs get small to avoid being 'too much'",
            "Why partners don't see what you need: because you've become expert at hiding it",
            "The blind spot that keeps you lonely inside your own relationships",
        ],
        gap: [
            "why your needs became dangerous to express",
            "why partners feel you're 'fine' when you're not",
            "the exact moment you learned to disappear",
            "why being seen feels more terrifying than being alone",
        ]
    },
    GUARDED_HEART: {
        reveals: [
            "Why hypervigilance feels like protection: even when it creates what you fear",
            "The exact moment trust becomes a test: when you're watching for betrayal before it arrives",
            "Why partners feel they can never prove themselves: because the test never ends",
            "The blind spot that sees danger in safety and confirms suspicion as wisdom",
        ],
        gap: [
            "why you expect betrayal even from people who haven't earned it",
            "why trust feels like vulnerability, not connection",
            "the exact moment you start looking for evidence against them",
            "why walls keep you safe but also keep you alone",
        ]
    },
};

const FreeReport: React.FC = () => {
    const { reports, archetypeName, modifiers } = useReportGenerator();
    const { quizSessionId, flags, reflections, primaryArchetype, setShowTeaser } = useQuizStore();

    // Get archetype for core fear and pattern-specific copy
    const archetype = flags.length > 0 ? getPatternArchetype(flags) : null;
    const coreFear = archetype?.primary.coreFear || 'Unresolved Attachment';
    const patternId = primaryArchetype || archetype?.primary.id || 'ANXIOUS_PURSUER';

    // Get pattern-specific bullets
    const patternBullets = PATTERN_SPECIFIC_BULLETS[patternId] || PATTERN_SPECIFIC_BULLETS.ANXIOUS_PURSUER;

    // Get reflection quote if available
    const reflectionQuote = Object.values(reflections)[0] || null;

    const handleUnlock = () => {
        trackEvent(quizSessionId, 'free_report_continue', {
            archetype: archetypeName
        });
        setShowTeaser(true);
        window.scrollTo(0, 0);
    };

    if (!reports) {
        return (
            <div className="container center-content">
                <div className="serif text-center py-24 animate-pulse">
                    <h2 className="text-2xl mb-4">Generating Your Report...</h2>
                    <p className="text-secondary mono">Analyzing patterns...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container free-report animate-in">
            {/* Header - Pattern Name + Core Fear (Authority Hook) */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div className="mono text-secondary mb-4">DIAGNOSTIC COMPLETE</div>
                <h1 className="serif report-title" style={{ marginBottom: '0.75rem' }}>
                    {archetypeName}
                </h1>
                <div className="mono text-secondary" style={{
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    opacity: 0.7
                }}>
                    Core Fear: {coreFear}
                </div>
                {modifiers.length > 0 && (
                    <p className="mono text-secondary mt-2" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                        with {modifiers.join(' + ')}
                    </p>
                )}
            </div>

            {/* Status Frame (NOT a sales frame) */}
            <div style={{
                background: 'rgba(196, 164, 132, 0.08)',
                border: '1px solid var(--border-color)',
                padding: '1.25rem 1.5rem',
                textAlign: 'center',
                marginBottom: '2.5rem',
            }}>
                <p className="mono" style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    margin: 0,
                    color: 'var(--text-secondary)'
                }}>
                    YOUR PERSONALIZED ANALYSIS IS PARTIALLY UNLOCKED
                </p>
            </div>

            {/* FREE REPORT CONTENT */}
            <div style={{ marginBottom: '3rem' }}>
                <div className="mono text-secondary mb-4" style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em'
                }}>
                    YOUR FREE RESULTS
                </div>

                <div className="report-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ children }) => (
                                <h2 className="serif report-section-title">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="serif report-subsection-title">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <p className="report-paragraph">{children}</p>
                            ),
                            ul: ({ children }) => (
                                <ul className="report-list">{children}</ul>
                            ),
                            li: ({ children }) => (
                                <li className="report-list-item">{children}</li>
                            ),
                            strong: ({ children }) => (
                                <strong className="report-emphasis">{children}</strong>
                            ),
                            em: ({ children }) => (
                                <em className="report-italic">{children}</em>
                            ),
                            hr: () => (
                                <hr className="report-divider" />
                            )
                        }}
                    >
                        {reports.free_report_markdown}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Reflection Quote (if provided) - Mirroring builds trust */}
            {reflectionQuote && (
                <div style={{
                    maxWidth: '650px',
                    margin: '0 auto 3rem',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '2rem'
                }}>
                    <p className="mono text-secondary" style={{
                        fontSize: '0.75rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        IN YOUR OWN WORDS
                    </p>
                    <blockquote style={{
                        borderLeft: '3px solid var(--accent-warm)',
                        paddingLeft: '1.5rem',
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: '1.7',
                        opacity: 0.9
                    }}>
                        <p className="serif">"{reflectionQuote}"</p>
                    </blockquote>
                </div>
            )}

            {/* TRANSITION: What This Explains: and What It Doesn't */}
            <div style={{
                maxWidth: '700px',
                margin: '0 auto 3rem',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '3rem'
            }}>
                <h3 className="serif" style={{
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-warm)'
                }}>
                    MISSING FROM YOUR PROFILE
                </h3>

                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    This free report shows <em>what</em> your pattern looks like and <em>how</em> it plays out.<br />
                    It does not yet explain:
                </p>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    maxWidth: '500px',
                    margin: '0 auto',
                    opacity: 0.6
                }}>
                    {patternBullets.gap.map((item, i) => (
                        <li key={i} style={{
                            marginBottom: '0.75rem',
                            paddingLeft: '2rem',
                            position: 'relative',
                            filter: 'grayscale(100%)'
                        }}>
                            <Lock size={14} style={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                opacity: 0.5
                            }} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* PAID PREVIEW: Pattern-Specific Bullets */}
            <div style={{
                maxWidth: '700px',
                margin: '0 auto 3rem',
                background: 'var(--card-surface)',
                border: '1px solid var(--border-color)',
                padding: '2.5rem'
            }}>
                <h3 className="serif" style={{
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    The Full Diagnostic Reveals
                </h3>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.75'
                }}>
                    {patternBullets.reveals.map((item, i) => (
                        <li key={i} style={{ marginBottom: '1.25rem', paddingLeft: '1.75rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-warm)' }}>✦</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* SINGLE, CLEAN CTA */}
            <div style={{
                textAlign: 'center',
                padding: '3rem 0',
                borderTop: '1px solid var(--border-color)'
            }}>
                <h3 className="serif" style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    lineHeight: '1.3'
                }}>
                    Complete the Diagnostic
                </h3>
                <p style={{
                    maxWidth: '500px',
                    margin: '0 auto 2rem',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--text-secondary)'
                }}>
                    You've seen the outline. The full explanation: why this formed, why it repeats, why knowing hasn't been enough: is one click away.
                </p>

                <button
                    className="btn-next"
                    onClick={handleUnlock}
                    style={{
                        padding: '1.25rem 3rem',
                        fontSize: '1rem'
                    }}
                >
                    GET MY FULL REPORT
                </button>

                <p className="mono text-secondary" style={{
                    fontSize: '0.7rem',
                    marginTop: '1.5rem',
                    opacity: 0.6
                }}>
                    Secured by Stripe • Instant access • Full analysis included
                </p>
            </div>

            {/* Reassurance Line */}
            <div style={{
                textAlign: 'center',
                paddingBottom: '2rem',
                opacity: 0.7
            }}>
                <p className="serif" style={{
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)'
                }}>
                    This isn't advice. It's an explanation of the mechanism.
                </p>
            </div>
        </div>
    );
};

export default FreeReport;
