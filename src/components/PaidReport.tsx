/**
 * PaidReport Component
 * Displays the full paid report (2000-3500+ words)
 */

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useReportGenerator } from '../lib/reportGenerator/useReportGenerator';
import { useQuizStore } from '../store/useQuizStore';
import { trackEvent } from '../lib/analytics';

// Dynamic imports to avoid bundling heavy logic if not needed, 
// though for this component we likely need them.
import { generatePersonalizedAnalysis } from '../lib/gemini';
import { updatePaidReportWithAI } from '../lib/reportGenerator/index';
// We need to import buildReportInputs and types to reconstruct inputs
import { buildReportInputs } from '../lib/reportGenerator/utils';

const PaidReport: React.FC = () => {
    const { reports, archetypeName, modifiers, wordCounts } = useReportGenerator();
    const { quizSessionId, flags, primaryArchetype, answers, name } = useQuizStore();

    const [enhancedReport, setEnhancedReport] = useState<string | null>(null);
    const [isEnhancing, setIsEnhancing] = useState(true);

    useEffect(() => {
        trackEvent(quizSessionId, 'paid_report_view', {
            archetype: archetypeName,
            modifiers: modifiers,
            wordCount: wordCounts.paid
        });
    }, [quizSessionId, archetypeName, modifiers, wordCounts.paid]);

    // Enhanced Report with Gemini
    useEffect(() => {
        const enhanceReport = async () => {
            // Only run if we have a base report and haven't already enhanced it
            if (reports && isEnhancing && !enhancedReport && primaryArchetype) {
                try {
                    // Reconstruct inputs required for the AI prompt
                    // Flags from store are already active
                    const activeFlagKeys = flags || [];

                    const inputs = buildReportInputs(
                        primaryArchetype,
                        activeFlagKeys,
                        answers
                    );

                    if (name) {
                        inputs.user_first_name = name;
                    }

                    // Call backend proxy
                    const aiInsights = await generatePersonalizedAnalysis(inputs);

                    if (aiInsights) {
                        const newMarkdown = updatePaidReportWithAI(
                            reports.paid_report_markdown,
                            inputs,
                            aiInsights
                        );
                        setEnhancedReport(newMarkdown);
                    } else {
                        // Fallback: strictly use the template report if AI returns null
                        setEnhancedReport(reports.paid_report_markdown);
                    }
                } catch (e) {
                    console.error("Enhancement failed:", e);
                    // Fallback
                    setEnhancedReport(reports.paid_report_markdown);
                } finally {
                    setIsEnhancing(false);
                }
            } else if (reports && !isEnhancing && !enhancedReport) {
                // Ensure we show something if effect re-runs or logic skips
                // This covers cases where we decided not to enhance or finished without result
                if (!enhancedReport) setEnhancedReport(reports.paid_report_markdown);
            }
        };

        enhanceReport();
    }, [reports, isEnhancing, enhancedReport, primaryArchetype, flags, answers, name]);


    if (!reports) {
        return (
            <div className="container center-content">
                <div className="serif text-center py-24 animate-pulse">
                    <h2 className="text-2xl mb-4">Compiling Your Full Report...</h2>
                    <p className="text-secondary mono">Building personalized analysis...</p>
                </div>
            </div>
        );
    }

    const displayMarkdown = enhancedReport || reports.paid_report_markdown;

    // Calculate word count for the currently displayed text

    const handlePrint = () => {
        trackEvent(quizSessionId, 'report_download', { archetype: archetypeName });
        window.print();
    };

    return (
        <div className="container paid-report animate-in">
            <div className="report-content paid-report-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className="serif paid-report-main-title">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="serif paid-report-section-title">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="serif paid-report-subsection-title">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="paid-report-paragraph">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="paid-report-list">{children}</ul>
                        ),
                        li: ({ children }) => (
                            <li className="paid-report-list-item">{children}</li>
                        ),
                        strong: ({ children }) => (
                            <strong className="paid-report-emphasis">{children}</strong>
                        ),
                        em: ({ children }) => (
                            <em className="paid-report-italic">{children}</em>
                        ),
                        hr: () => (
                            <hr className="paid-report-divider" />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="paid-report-quote">{children}</blockquote>
                        ),
                        table: ({ children }) => (
                            <div className="diagnostic-table-wrapper">
                                <table className="diagnostic-table">{children}</table>
                            </div>
                        ),
                        thead: ({ children }) => (
                            <thead className="diagnostic-table-head">{children}</thead>
                        ),
                        tbody: ({ children }) => (
                            <tbody className="diagnostic-table-body">{children}</tbody>
                        ),
                        tr: ({ children }) => (
                            <tr className="diagnostic-table-row">{children}</tr>
                        ),
                        th: ({ children }) => (
                            <th className="diagnostic-table-header">{children}</th>
                        ),
                        td: ({ children }) => (
                            <td className="diagnostic-table-cell">{children}</td>
                        )
                    }}
                >
                    {displayMarkdown}
                </ReactMarkdown>
            </div>

            <footer className="report-footer no-print">
                <div className="footer-left">
                    <div className="mono text-secondary mb-4">Diagnostic Complete</div>
                    <p className="text-sm text-secondary max-w-xs">
                        This report represents a snapshot based on your responses at this time.
                        Patterns can shift and change with awareness and experience.
                    </p>
                </div>
                <div className="footer-right">
                    <button className="btn-next" onClick={handlePrint}>
                        Download as PDF
                    </button>
                </div>
            </footer>
        </div >
    );
};

export default PaidReport;
