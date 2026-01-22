import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuizStore, getRecommendedClusters } from '../store/useQuizStore';
import type { Cluster, Pairing } from '../types';
import { trackEvent } from '../lib/analytics';

const FullReport: React.FC = () => {
    const { scores, quizSessionId } = useQuizStore();
    const results = getRecommendedClusters(scores);
    const [primaryData, setPrimaryData] = useState<Cluster | null>(null);
    const [secondaryData, setSecondaryData] = useState<Cluster | null>(null);
    const [pairingData, setPairingData] = useState<Pairing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportData = async () => {
            // Fetch Primary and Secondary Cluster details
            const clusterIds = [results.primary];
            if (results.secondary) clusterIds.push(results.secondary);

            const { data: clusters, error: clusterError } = await supabase
                .from('clusters')
                .select('*')
                .in('id', clusterIds);

            if (clusterError) {
                console.error('Error fetching cluster data:', clusterError);
            } else {
                setPrimaryData(clusters?.find(c => c.id === results.primary) || null);
                setSecondaryData(clusters?.find(c => c.id === results.secondary) || null);
            }

            // Fetch Pairing details if both exist
            if (results.primary && results.secondary) {
                const { data: pairings, error: pairingError } = await supabase
                    .from('pairings')
                    .select('*')
                    .or(`primary_cluster_id.eq.${results.primary},secondary_cluster_id.eq.${results.primary},primary_cluster_id.eq.${results.secondary},secondary_cluster_id.eq.${results.secondary}`);

                if (pairingError) {
                    console.error('Error fetching pairing data:', pairingError);
                } else {
                    const match = pairings?.find(p =>
                        (p.primary_cluster_id === results.primary && p.secondary_cluster_id === results.secondary) ||
                        (p.primary_cluster_id === results.secondary && p.secondary_cluster_id === results.primary)
                    );
                    setPairingData(match || null);
                }
            }

            setLoading(false);
        };

        fetchReportData();
        trackEvent(quizSessionId, 'report_view', {
            primary: results.primary,
            secondary: results.secondary
        });
    }, [results.primary, results.secondary, quizSessionId]);

    if (loading) {
        return (
            <div className="container center-content">
                <div className="serif text-center py-24 animate-pulse">
                    <h2 className="text-2xl mb-4">Compiling Your Diagnostic Report</h2>
                    <p className="text-secondary mono">Analyzing {results.primary} architecture...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container full-report animate-in">
            <header className="report-hero border-b border-[var(--border-color)] pb-12 mb-16">
                <div className="mono text-secondary mb-4 tracking-widest">Diagnostic Outcome</div>
                <h1 className="report-title serif">{primaryData?.name_display} {secondaryData ? `with ${secondaryData.name_display} Sub-pattern` : ''}</h1>
                <p className="report-subtitle max-w-lg">{primaryData?.reveal_summary}</p>

                <div className="personalization-pill mt-8 inline-block bg-[var(--text-primary)] text-white px-6 py-3 rounded-full mono text-xs uppercase tracking-widest">
                    Score Profile: P{scores.pattern.toFixed(1)} / D{scores.driver.toFixed(1)} / R{scores.reinforcement.toFixed(1)}
                </div>
            </header>

            <section className="grid-sections">
                <div className="report-section mb-20 bg-[#FBF9F4] p-10 border border-[var(--border-color)]">
                    <div className="mono text-secondary mb-4">Personalization Layer</div>
                    <h3 className="serif text-2xl mb-6">Why this profile matches you</h3>
                    <p className="text-secondary leading-relaxed mb-6">
                        Your results show a particularly high {scores.pattern > scores.driver ? 'Pattern' : 'Driver'} density ({Math.max(scores.pattern, scores.driver).toFixed(1)}).
                        This suggests that your primary focus in relationships is {scores.pattern > scores.driver ? 'maintaining the external structure of safety' : 'protecting your internal sense of self'}.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="metric">
                            <div className="mono text-[10px] uppercase opacity-50 mb-2">Sensitivity</div>
                            <div className="h-1 bg-gray-200 w-full"><div className="h-full bg-[var(--accent-warm)]" style={{ width: `${Math.min(scores.pattern * 20, 100)}%` }}></div></div>
                        </div>
                        <div className="metric">
                            <div className="mono text-[10px] uppercase opacity-50 mb-2">Autonomy Need</div>
                            <div className="h-1 bg-gray-200 w-full"><div className="h-full bg-[var(--accent-warm)]" style={{ width: `${Math.min(scores.driver * 20, 100)}%` }}></div></div>
                        </div>
                        <div className="metric">
                            <div className="mono text-[10px] uppercase opacity-50 mb-2">Internal Echo</div>
                            <div className="h-1 bg-gray-200 w-full"><div className="h-full bg-[var(--accent-warm)]" style={{ width: `${Math.min(scores.reinforcement * 20, 100)}%` }}></div></div>
                        </div>
                    </div>
                </div>

                <div className="report-section mb-20">
                    <div className="mono text-secondary mb-6 border-l-2 border-[var(--accent-warm)] pl-4">I. The Deep Dive</div>
                    <div className="prose space-y-12">
                        <div className="dive-block">
                            <h3 className="serif text-xl mb-3 italic">Early Connection</h3>
                            <p className="text-secondary leading-relaxed">{primaryData?.early_dive}</p>
                        </div>
                        <div className="dive-block">
                            <h3 className="serif text-xl mb-3 italic">The Settling Pattern</h3>
                            <p className="text-secondary leading-relaxed">{primaryData?.mid_dive}</p>
                        </div>
                        <div className="dive-block bg-[rgba(196,164,132,0.05)] p-8 border-l-4 border-[var(--accent-warm)]">
                            <h3 className="serif text-xl mb-3 italic">Under Stress</h3>
                            <p className="text-secondary leading-relaxed">{primaryData?.stress_dive}</p>
                        </div>
                    </div>
                </div>

                {pairingData && (
                    <div className="report-section mb-20">
                        <div className="mono text-secondary mb-6 border-l-2 border-red-200 pl-4">II. The Interaction Dance</div>
                        <div className="bg-white p-10 border border-[var(--border-color)]">
                            <h3 className="serif text-2xl mb-6">Common Rhythms</h3>
                            <p className="serif text-lg mb-8 leading-relaxed italic">"{pairingData.interaction_narrative}"</p>

                            <div className="timeline-sequence">
                                <div className="mono text-secondary mb-4 text-xs">Typical Progression</div>
                                <p className="text-secondary leading-relaxed">{pairingData.timeline_sequence}</p>
                            </div>

                            <div className="recognition-points mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pairingData.recognition_highlights?.map((point, i) => (
                                    <div key={i} className="point p-4 bg-[#F9F7F2] border border-[var(--border-color)] serif italic">
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="report-section mb-20">
                    <div className="mono text-secondary mb-6 border-l-2 border-[var(--text-primary)] pl-4">III. The Internal Logic</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="logic-card">
                            <h4 className="mono text-xs uppercase tracking-tighter mb-4">Protective Mechanism</h4>
                            <p className="serif leading-relaxed text-lg">{primaryData?.protective_logic}</p>
                        </div>
                        <div className="phrasing-card bg-[var(--text-primary)] text-white p-8">
                            <h4 className="mono text-xs uppercase tracking-tighter mb-4 opacity-70">The Internal Script</h4>
                            <p className="serif text-xl italic">"{primaryData?.phrasing_inside}"</p>
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <h4 className="mono text-xs uppercase tracking-tighter mb-4 opacity-70">External Perception</h4>
                                <p className="serif text-lg opacity-90 italic">"{primaryData?.phrasing_outside}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="report-footer mt-24 pb-20 border-t border-[var(--border-color)] pt-12 flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="footer-left">
                    <div className="mono text-secondary mb-4">Diagnostic Verification</div>
                    <p className="text-sm text-secondary max-w-xs">Produced by the Relationship Pattern Diagnostic Engine. Based on weighted axis analysis of recurring emotional triggers.</p>
                </div>
                <div className="footer-right">
                    <button className="btn-next" onClick={() => window.print()}>Download as PDF</button>
                </div>
            </footer>
        </div>
    );
};

export default FullReport;
