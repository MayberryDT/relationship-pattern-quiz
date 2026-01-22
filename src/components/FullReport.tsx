import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useQuizStore, getRecommendedClusters } from '../store/useQuizStore';
import type { Cluster } from '../types';

const FullReport: React.FC = () => {
    const { scores } = useQuizStore();
    const results = getRecommendedClusters(scores);
    const [primaryData, setPrimaryData] = useState<Cluster | null>(null);
    const [secondaryData, setSecondaryData] = useState<Cluster | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReportData = async () => {
            const clusterIds = [results.primary];
            if (results.secondary) clusterIds.push(results.secondary);

            const { data, error } = await supabase
                .from('results')
                .select('*')
                .in('cluster_id', clusterIds);

            if (error) {
                console.error('Error fetching report data:', error);
            } else {
                const primary = data?.find(c => c.cluster_id === results.primary);
                const secondary = data?.find(c => c.cluster_id === results.secondary);
                setPrimaryData(primary || null);
                setSecondaryData(secondary || null);
            }
            setLoading(false);
        };

        fetchReportData();
    }, [results.primary, results.secondary]);

    if (loading) {
        return <div className="container serif">Compiling your detailed report...</div>;
    }

    return (
        <div className="container full-report">
            <div className="mono text-secondary mb-8">Comprehensive Diagnostic Report</div>

            <section className="report-header mb-16">
                <h1 className="serif report-title">Your Relationship Architecture</h1>
                <p className="report-subtitle">A deep dive into the patterns, drivers, and reinforcements of your attachment style.</p>
            </section>

            {primaryData && (
                <section className="vulnerability-block primary mb-16">
                    <div className="mono text-secondary mb-4">Primary Pattern</div>
                    <h2 className="serif text-3xl mb-6">{primaryData.cluster_id}: The Core Vulnerability</h2>
                    <div className="report-body serif prose" dangerouslySetInnerHTML={{ __html: primaryData.content_markdown }} />
                </section>
            )}

            {secondaryData && (
                <section className="vulnerability-block secondary mb-16">
                    <div className="mono text-secondary mb-4">Secondary Manifestation</div>
                    <h2 className="serif text-3xl mb-6">{secondaryData.cluster_id}: The Interactive Layer</h2>
                    <div className="report-body serif prose" dangerouslySetInnerHTML={{ __html: secondaryData.content_markdown }} />
                </section>
            )}

            <section className="growth-strategies mt-16 p-8 border-t border-[var(--border-color)]">
                <h3 className="serif mb-4">Growth Integration</h3>
                <p>Based on the intersection of {results.primary} and {results.secondary || 'the observed drivers'}, your path forward involves...</p>
                <ul className="mono text-secondary space-y-2 mt-4">
                    <li>• De-escalating the pattern activation</li>
                    <li>• Recognizing the internal echo</li>
                    <li>• Practicing radical transparency</li>
                </ul>
            </section>

            <footer className="report-footer mt-24 pb-12 text-center border-t border-[var(--border-color)] pt-8">
                <p className="mono text-secondary">Relationship Pattern Diagnostic © 2026</p>
            </footer>
        </div>
    );
};

export default FullReport;
