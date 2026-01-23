import React from 'react';
import { useQuizStore } from '../store/useQuizStore';

const DevShortcuts: React.FC = () => {
    const { devSkipToPaywall, devSkipToResults, resetQuiz } = useQuizStore();

    // Only show in development
    if (import.meta.env.PROD) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid #eee',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dev Tools</div>
            <button
                onClick={devSkipToPaywall}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                }}
            >
                Skip to Free Report
            </button>
            <button
                onClick={devSkipToResults}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                }}
            >
                Skip to Paid Report
            </button>

            <button
                onClick={resetQuiz}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                }}
            >
                Reset Quiz
            </button>
        </div>
    );
};

export default DevShortcuts;
