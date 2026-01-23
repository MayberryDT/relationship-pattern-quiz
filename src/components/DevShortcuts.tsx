import React from 'react';
import { useQuizStore, ARCHETYPES } from '../store/useQuizStore';

const DevShortcuts: React.FC = () => {
    const { devSkipToPaywall, devSkipToResults, devSkipToReport, resetQuiz } = useQuizStore();

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
            backdropFilter: 'blur(5px)',
            maxHeight: '90vh',
            overflowY: 'auto'
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

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '5px 0' }} />

            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>View Report As:</div>

            {Object.values(ARCHETYPES).map(archetype => (
                <div key={archetype.id} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>
                        {archetype.name}
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                            onClick={() => devSkipToReport(archetype.id, 'free')}
                            style={{
                                flex: 1,
                                padding: '4px 8px',
                                backgroundColor: '#e2e8f0',
                                color: '#475569',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: '500'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#cbd5e1'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
                        >
                            Free
                        </button>
                        <button
                            onClick={() => devSkipToReport(archetype.id, 'paid')}
                            style={{
                                flex: 1,
                                padding: '4px 8px',
                                backgroundColor: '#cbd5e1',
                                color: '#1e293b',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#94a3b8'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#cbd5e1'; e.currentTarget.style.color = '#1e293b'; }}
                        >
                            Paid
                        </button>
                    </div>
                </div>
            ))}

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '5px 0' }} />

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
