/**
 * LandingPage Component - Premium Edition
 * 
 * Ultra-premium dark theme with:
 * - Cinematic typography and spacing
 * - Gold accent highlights
 * - Subtle animations and micro-interactions
 * - Glassmorphism elements
 * - Editorial sophistication
 */

import React from 'react';

interface LandingPageProps {
    onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
    return (
        <div className="landing-page premium-dark">
            {/* Ambient Background Glow */}
            <div className="ambient-glow" aria-hidden="true" />

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <span className="hero-eyebrow">RELATIONSHIP PATTERN DIAGNOSTIC</span>

                    <h1 className="hero-headline">
                        <span className="headline-line">The same relationship.</span>
                        <span className="headline-line italic">Different person. Every single time.</span>
                    </h1>

                    <p className="hero-subtext">
                        You've been here before. The same loop, different face. There's a pattern
                        running beneath the surface: a blueprint you can't see but can't escape.
                    </p>

                    <p className="hero-hook">
                        This diagnostic reveals the <span className="text-gold">exact mechanism</span>:
                        your core fear, the loop signature, and the moment it locks in.
                    </p>
                    <p className="hero-personalization">
                        Generated from your answers. Written in full prose. No templates.
                    </p>

                    <div className="hero-cta-group">
                        <button className="btn-premium" onClick={onStartQuiz}>
                            <span className="btn-text">Reveal My Pattern</span>
                            <span className="btn-arrow">→</span>
                        </button>
                        <p className="cta-microcopy">Private • 5 minutes • Free results</p>
                    </div>

                    <div className="hero-meta">
                        <span className="meta-item">
                            <span className="meta-number">5</span>
                            <span className="meta-label">Minutes</span>
                        </span>
                        <span className="meta-divider" />
                        <span className="meta-item">
                            <span className="meta-number">31</span>
                            <span className="meta-label">Questions</span>
                        </span>
                        <span className="meta-divider" />
                        <span className="meta-item">
                            <span className="meta-number">4K+</span>
                            <span className="meta-label">Words</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <span className="scroll-line" />
            </div>

            {/* What You'll Discover */}
            <section className="landing-section reveals-section">
                <div className="section-header">
                    <h2 className="section-title">What the Diagnostic Reveals</h2>
                </div>

                <div className="reveals-grid">
                    {[
                        { num: '01', title: 'Your Core Pattern', desc: 'Why relationships follow the same emotional arc.' },
                        { num: '02', title: 'The Four-Phase Loop', desc: 'Where things start to go wrong and why it feels sudden.' },
                        { num: '03', title: 'Why It Keeps Repeating', desc: 'Why different partners don’t change the ending.' },
                        { num: '04', title: 'The Internal Contradiction', desc: 'Why wanting closeness often creates distance.' },
                        { num: '05', title: 'Shadow Mechanisms', desc: 'The protection strategies you don’t realize you’re using.' },
                        { num: '06', title: 'Deep Personalization', desc: '2,000 to 4,000 words written from your actual answers.' },
                    ].map((item) => (
                        <div key={item.num} className="reveal-card">
                            <span className="reveal-num">{item.num}</span>
                            <div className="reveal-body">
                                <h3 className="reveal-title">{item.title}</h3>
                                <p className="reveal-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Methodology Section - Moved Below Reveals */}
            <section className="landing-section methodology-section">
                <div className="section-header">
                    <span className="section-eyebrow">CLINICALLY INFORMED</span>
                    <h2 className="section-title">
                        Not pop psychology.<br />
                        <span className="title-emphasis">A methodology rooted in depth.</span>
                    </h2>
                </div>

                <div className="methodology-grid">
                    <div className="method-card">
                        <div className="card-accent" />
                        <h3 className="card-title">Schema Logic</h3>
                        <p className="card-text">
                            Identify the "tinted glasses" of childhood beliefs
                            that filter every relationship you enter.
                        </p>
                    </div>
                    <div className="method-card">
                        <div className="card-accent" />
                        <h3 className="card-title">CCRT Mapping</h3>
                        <p className="card-text">
                            Surface your Core Conflictual Relationship Themes: the hidden
                            scripts running beneath your connections.
                        </p>
                    </div>
                    <div className="method-card">
                        <div className="card-accent" />
                        <h3 className="card-title">Attachment Theory</h3>
                        <p className="card-text">
                            Decode your survival strategies: the impulse to pursue, withdraw,
                            or give until empty.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats & Quote Section */}
            <section className="landing-section stats-section">
                <div className="stats-grid">
                    <div className="stat-block">
                        <span className="stat-value">31+</span>
                        <span className="stat-label">Targeted Questions</span>
                    </div>
                    <div className="stat-block">
                        <span className="stat-value">6</span>
                        <span className="stat-label">Pattern Archetypes</span>
                    </div>
                    <div className="stat-block">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Report Sections</span>
                    </div>
                    <div className="stat-block">
                        <span className="stat-value">4K+</span>
                        <span className="stat-label">Words of Analysis</span>
                    </div>
                </div>

                <p className="stats-interpretation">
                    Enough depth to explain your pattern, not just describe it.
                </p>

                <blockquote className="featured-quote">
                    <span className="quote-mark">"</span>
                    <p>
                        You're not broken, you're patterned.<br />
                        And patterns can be changed once they're seen.
                    </p>
                </blockquote>
            </section>

            {/* Differentiation Section */}
            <section className="landing-section diff-section">
                <div className="section-header">
                    <span className="section-eyebrow">SCHEMA THERAPY FRAMEWORK</span>
                    <h2 className="section-title">What makes this different</h2>
                </div>

                <div className="diff-list">
                    <div className="diff-item">
                        <div className="diff-icon">
                            <span className="icon-line" />
                        </div>
                        <div className="diff-content">
                            <h3>It doesn't tell you what to do.</h3>
                            <p>
                                It tells you what’s actually happening before the loop runs.
                            </p>
                            <p>
                                Most advice focuses on fixing behavior. This focuses on catching the mechanism in
                                the first 10% of the loop, before it runs.
                            </p>
                        </div>
                    </div>
                    <div className="diff-item">
                        <div className="diff-icon">
                            <span className="icon-line" />
                        </div>
                        <div className="diff-content">
                            <h3>It's identity-safe.</h3>
                            <p>
                                No labels like "toxic" or "avoidant." Just your pattern's logic,
                                explained without judgment.
                            </p>
                        </div>
                    </div>
                    <div className="diff-item">
                        <div className="diff-icon">
                            <span className="icon-line" />
                        </div>
                        <div className="diff-content">
                            <h3>It's yours.</h3>
                            <p>
                                Not a template. A narrative written from your specific answers,
                                in full prose.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-section final-cta-section">
                <div className="cta-container">
                    <h2 className="cta-headline">Ready to see the pattern?</h2>
                    <p className="cta-subtext">
                        You've answered these questions before: in your head, in your journal,
                        or in a 3am spiral. But you've never seen them assembled into this.
                    </p>

                    <button className="btn-premium btn-large" onClick={onStartQuiz}>
                        <span className="btn-text">Begin the Diagnostic</span>
                        <span className="btn-arrow">→</span>
                    </button>
                    <p className="cta-urgency">Seeing the pattern changes how it operates.</p>

                    <div className="cta-trust">
                        <span>Private & Secure</span>
                        <span className="trust-dot">·</span>
                        <span>No Email Required</span>
                        <span className="trust-dot">·</span>
                        <span>5 Minutes</span>
                    </div>
                </div>

                {/* Decorative bottom gradient */}
                <div className="bottom-fade" aria-hidden="true" />
            </section>
        </div>
    );
};

export default LandingPage;
