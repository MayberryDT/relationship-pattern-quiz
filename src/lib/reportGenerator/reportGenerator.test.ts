/**
 * Report Generator Tests
 */

import { describe, it, expect } from 'vitest';
import { generateReports } from './index';
import { countWords, validateReportWordCounts, buildReportInputs } from './utils';
import type { ReportInputs } from './types';

describe('Report Generator', () => {
    const testInputs: ReportInputs = {
        user_first_name: 'Test',
        primary_archetype: 'The Anxious Pursuer',
        secondary_modifiers: ['Anxious Pursuit', 'Emotional Starvation'],
        key_flags: {
            f_abandon: true,
            d_pursue: true,
            pw_pursue: true,
            ea_fast: true,
            cn_resolve: true,
            rp_over_apologize: true,
            a_unavailable: true,
            e_too_much: true,
            ct_chosen_push: true,
            ff_vigilance: true,
            s_suspicious: true,
            ma_intense: true,
            mf_rarely: true
        },
        reflection_text: 'I always feel like I am walking on eggshells, waiting for them to leave.',
        relationship_context: 'recently ended'
    };

    it('should generate all three report types', () => {
        const reports = generateReports(testInputs);

        expect(reports.free_report_markdown).toBeDefined();
        expect(reports.paywall_preview_markdown).toBeDefined();
        expect(reports.paid_report_markdown).toBeDefined();
    });

    it('should meet minimum word counts', () => {
        const reports = generateReports(testInputs);
        const validation = validateReportWordCounts(
            reports.free_report_markdown,
            reports.paid_report_markdown
        );

        console.log('Free report word count:', validation.freeCount);
        console.log('Paid report word count:', validation.paidCount);

        expect(validation.freeCount).toBeGreaterThanOrEqual(400);
        expect(validation.paidCount).toBeGreaterThanOrEqual(2000);
    });

    it('should include required sections in free report', () => {
        const reports = generateReports(testInputs);

        expect(reports.free_report_markdown).toContain('## Your Pattern');
        expect(reports.free_report_markdown).toContain('## What Activates It');
        expect(reports.free_report_markdown).toContain('## The Loop You Get Stuck In');
        expect(reports.free_report_markdown).toContain('## Specific Tells');
        expect(reports.free_report_markdown).toContain('## The Tension Inside It');
    });

    it('should include required sections in paid report', () => {
        const reports = generateReports(testInputs);

        expect(reports.paid_report_markdown).toContain('## Executive Summary');
        expect(reports.paid_report_markdown).toContain('## Diagnostic Snapshot');
        expect(reports.paid_report_markdown).toContain('## The Mechanism');
        expect(reports.paid_report_markdown).toContain('## Trigger Profile');
        expect(reports.paid_report_markdown).toContain('## The Attraction Fingerprint');
        expect(reports.paid_report_markdown).toContain('## The Relationship Timeline');
        expect(reports.paid_report_markdown).toContain('## The Blind Spot');
        expect(reports.paid_report_markdown).toContain('## Your Modifiers');
        expect(reports.paid_report_markdown).toContain('## The Core Contradiction Resolved');
        expect(reports.paid_report_markdown).toContain('## What This Means Going Forward');
        expect(reports.paid_report_markdown).toContain('## Appendix: Evidence From Your Responses');
    });

    it('should include reflection text when provided', () => {
        const reports = generateReports(testInputs);

        expect(reports.free_report_markdown).toContain('walking on eggshells');
    });

    it('should handle missing reflection text gracefully', () => {
        const inputsNoReflection = { ...testInputs, reflection_text: undefined };
        const reports = generateReports(inputsNoReflection);

        // Should include the fallback section
        expect(reports.free_report_markdown).toContain('## A Moment That Often Fits');
    });

    it('should handle no secondary modifiers', () => {
        const inputsNoMods = { ...testInputs, secondary_modifiers: [] as any };
        const reports = generateReports(inputsNoMods);

        // Should include context variability section
        expect(reports.paid_report_markdown).toContain('## Context Variability');
    });

    it('should generate different reports for different archetypes', () => {
        const anxiousReports = generateReports(testInputs);
        const withdrawerInputs = { ...testInputs, primary_archetype: 'The Protective Withdrawer' as const };
        const withdrawerReports = generateReports(withdrawerInputs);

        expect(anxiousReports.free_report_markdown).not.toEqual(withdrawerReports.free_report_markdown);
        expect(anxiousReports.paid_report_markdown).not.toEqual(withdrawerReports.paid_report_markdown);
    });
});

describe('buildReportInputs', () => {
    it('should convert flags array to inputs object', () => {
        const flags = ['f_abandon', 'd_pursue', 'pw_pursue', 'ma_intense'];
        const reflections = { q1: 'My reflection text' };

        const inputs = buildReportInputs('ANXIOUS_PURSUER', flags, reflections);

        expect(inputs.primary_archetype).toBe('The Anxious Pursuer');
        expect(inputs.key_flags['f_abandon']).toBe(true);
        expect(inputs.reflection_text).toContain('My reflection text');
    });

    it('should derive secondary modifiers from flags', () => {
        const flags = ['d_pursue', 'pw_pursue', 'ma_intense', 'ma_shame']; // Anxious Pursuit signals
        const reflections = {};

        const inputs = buildReportInputs('ANXIOUS_PURSUER', flags, reflections);

        expect(inputs.secondary_modifiers).toContain('Anxious Pursuit');
    });
});

describe('countWords', () => {
    it('should count words correctly', () => {
        expect(countWords('hello world')).toBe(2);
        expect(countWords('The quick brown fox jumps.')).toBe(5);
        expect(countWords('')).toBe(0);
        expect(countWords('   multiple   spaces   ')).toBe(2);
    });
});
