import React from 'react';
import { useQuizStore, getRecommendedClusters } from '../store/useQuizStore';

const ResultsTeaser: React.FC = () => {
    const { scores, setUnlock } = useQuizStore();
    const results = getRecommendedClusters(scores);

    const handleUnlock = () => {
        // Simulate Stripe Success
        setUnlock(true);
    };

    return (
        <div className="container teaser-view">
            <div className="mono text-secondary mb-4">Diagnostic Result</div>
            <h1 className="serif teaser-title">Your Primary Vulnerability: {results.primary}</h1>

            <div className="teaser-content">
                <div className="teaser-blur-overlay">
                    <p className="serif">
                        Your pattern suggests a deep-rooted mechanism related to {results.primary === 'C1' ? 'Emotional Unavailability' : 'Complex Attachment'}.
                        This manifests as a tendency to...
                    </p>
                    <div className="blurred-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>

            <div className="paywall-card">
                <h2 className="serif">Unlock Your Full Report</h2>
                <p>Get the complete 12-page breakdown of your relationship dynamics, including your Secondary vulnerability ({results.secondary || 'None detected'}) and actionable growth strategies.</p>
                <button className="btn-next" onClick={handleUnlock}>
                    Unlock Full Report ($19)
                </button>
                <p className="mono text-secondary mt-4">Secured by Stripe</p>
            </div>
        </div>
    );
};

export default ResultsTeaser;
