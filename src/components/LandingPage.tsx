import React, { useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { useQuizStore } from '../store/useQuizStore';

interface LandingPageProps {
    onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { quizSessionId } = useQuizStore();

    const handleStart = () => {
        trackEvent(quizSessionId, 'quiz_start', {});
        onStartQuiz();
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <div className="container">
                    <div className="mono text-secondary mb-4" style={{ letterSpacing: '0.2em' }}>
                        RELATIONSHIP PATTERN DIAGNOSTIC
                    </div>

                    <h1 className="serif landing-title">
                        The same relationship.<br />
                        <em>Different person.</em>
                    </h1>

                    <p className="landing-subtitle">
                        Discover the hidden pattern that keeps repeating—and finally understand why.
                    </p>

                    <button
                        className="btn-start"
                        onClick={handleStart}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{
                            transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
                        }}
                    >
                        Begin Your Diagnostic
                    </button>

                    <p className="landing-meta mono">
                        5 minutes • Psychologically grounded • Instant results
                    </p>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="landing-trust">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-item">
                            <div className="trust-number">31+</div>
                            <div className="trust-label">Targeted questions</div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-number">6</div>
                            <div className="trust-label">Pattern archetypes</div>
                        </div>
                        <div className="trust-item">
                            <div className="trust-number">12</div>
                            <div className="trust-label">Report sections</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="landing-learn">
                <div className="container">
                    <h2 className="serif section-title">What you'll discover</h2>

                    <div className="learn-grid">
                        <div className="learn-item">
                            <div className="learn-icon">◯</div>
                            <h3 className="serif">Your core pattern</h3>
                            <p>The unconscious blueprint that shapes how you connect, protect yourself, and ultimately why relationships unfold the way they do.</p>
                        </div>

                        <div className="learn-item">
                            <div className="learn-icon">◯</div>
                            <h3 className="serif">Your loop signature</h3>
                            <p>The predictable sequence from first attraction through eventual rupture—and why "knowing better" hasn't been enough to stop it.</p>
                        </div>

                        <div className="learn-item">
                            <div className="learn-icon">◯</div>
                            <h3 className="serif">The origin</h3>
                            <p>Where this pattern was formed, why it made sense then, and why it no longer serves you now.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote / Social Proof */}
            <section className="landing-quote">
                <div className="container">
                    <blockquote className="serif">
                        "This isn't about fixing you.<br />
                        It's about finally seeing yourself clearly."
                    </blockquote>
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-cta">
                <div className="container text-center">
                    <button
                        className="btn-start"
                        onClick={handleStart}
                    >
                        Start the Diagnostic
                    </button>
                    <p className="mono text-secondary mt-4" style={{ fontSize: '0.7rem' }}>
                        Free to start • No email required
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
