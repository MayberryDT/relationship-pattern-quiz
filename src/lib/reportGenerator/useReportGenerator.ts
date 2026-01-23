/**
 * useReportGenerator Hook
 * React hook for generating reports from quiz state
 */

import { useMemo } from 'react';
import { useQuizStore, getPatternArchetype } from '../../store/useQuizStore';
import { generateReports } from './index';
import { buildReportInputs, validateReportWordCounts } from './utils';
import type { ReportOutputs } from './types';

export interface UseReportGeneratorResult {
    reports: ReportOutputs | null;
    isValid: boolean;
    wordCounts: {
        free: number;
        paid: number;
    };
    archetypeName: string;
    modifiers: string[];
}

export function useReportGenerator(): UseReportGeneratorResult {
    const { flags, reflections } = useQuizStore();

    return useMemo(() => {
        // Get archetype from flags
        const archetypeResult = getPatternArchetype(flags);
        const archetypeId = archetypeResult.primary.id;
        const archetypeName = archetypeResult.primary.name;

        // Build inputs
        const inputs = buildReportInputs(
            archetypeId,
            flags,
            reflections
        );

        // Generate reports
        const reports = generateReports(inputs);

        // Validate word counts
        const validation = validateReportWordCounts(
            reports.free_report_markdown,
            reports.paid_report_markdown
        );

        return {
            reports,
            isValid: validation.valid,
            wordCounts: {
                free: validation.freeCount,
                paid: validation.paidCount
            },
            archetypeName,
            modifiers: inputs.secondary_modifiers
        };
    }, [flags, reflections]);
}

export default useReportGenerator;
