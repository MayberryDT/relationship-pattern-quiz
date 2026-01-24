/**
 * TikTok Pixel Tracking Utility
 * Provides type-safe wrapper functions for TikTok conversion tracking
 * 
 * DUAL TRACKING: Events are sent to both:
 * 1. Browser-side TikTok Pixel (can be blocked by ad blockers)
 * 2. Server-side TikTok Events API (reliable, cannot be blocked)
 */

import { supabase } from './supabase';

// Declare global TikTok Pixel API
declare global {
    interface Window {
        ttq?: {
            track: (eventName: string, properties?: any) => void;
            identify: (properties?: any) => void;
            page: () => void;
        };
    }
}

/**
 * Send event to server-side TikTok Events API
 */
const trackServerSide = async (
    event: string,
    properties?: {
        content_id?: string;
        content_name?: string;
        content_type?: string;
        value?: number;
        currency?: string;
        description?: string;
    },
    testEventCode?: string
) => {
    try {
        const payload: any = {
            event,
            event_id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            properties,
            context: {
                page: {
                    url: window.location.href,
                    referrer: document.referrer,
                },
            },
        };

        // Add test event code if provided for TikTok testing
        if (testEventCode) {
            payload.test_event_code = testEventCode;
        }

        const { error } = await supabase.functions.invoke('tiktok-track', {
            body: payload,
        });

        if (error) {
            console.warn('[TikTok Server-Side] Failed to send event:', error);
        } else {
            console.log(`[TikTok Server-Side] ${event} tracked successfully${testEventCode ? ` (test: ${testEventCode})` : ''}`);
        }
    } catch (err) {
        console.warn('[TikTok Server-Side] Failed to track:', err);
    }
}

/**
 * Track ViewContent event - Landing page views, product views
 * Sends to both browser pixel and server API
 * @param testEventCode - Optional test event code for TikTok testing (e.g., 'TEST93032')
 */
export const trackViewContent = (contentId: string, contentName: string, value: number = 9.99, testEventCode?: string) => {
    // Browser-side tracking
    if (window.ttq) {
        window.ttq.track('ViewContent', {
            contents: [
                {
                    content_id: contentId,
                    content_type: 'product',
                    content_name: contentName,
                }
            ],
            value,
            currency: 'USD',
        });
        console.log(`[TikTok Pixel] ViewContent tracked: ${contentName}`);
    } else {
        console.warn('[TikTok Pixel] ttq not available');
    }

    // Server-side tracking (always runs, even if pixel is blocked)
    trackServerSide('ViewContent', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'USD',
    }, testEventCode);
};

/**
 * Track CompleteRegistration event - Quiz completion, lead capture
 * Sends to both browser pixel and server API
 * @param testEventCode - Optional test event code for TikTok testing (e.g., 'TEST93032')
 */
export const trackCompleteRegistration = (contentId: string, contentName: string, value: number = 9.99, testEventCode?: string) => {
    // Browser-side tracking
    if (window.ttq) {
        window.ttq.track('CompleteRegistration', {
            contents: [
                {
                    content_id: contentId,
                    content_type: 'product',
                    content_name: contentName,
                }
            ],
            value,
            currency: 'USD',
        });
        console.log(`[TikTok Pixel] CompleteRegistration tracked: ${contentName}`);
    } else {
        console.warn('[TikTok Pixel] ttq not available');
    }

    // Server-side tracking
    trackServerSide('CompleteRegistration', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'USD',
    }, testEventCode);
};

/**
 * Track InitiateCheckout event - User starts checkout process
 * Sends to both browser pixel and server API
 * @param testEventCode - Optional test event code for TikTok testing (e.g., 'TEST93032')
 */
export const trackInitiateCheckout = (contentId: string, contentName: string, value: number = 9.99, additionalData?: Record<string, any>, testEventCode?: string) => {
    // Browser-side tracking
    if (window.ttq) {
        window.ttq.track('InitiateCheckout', {
            contents: [
                {
                    content_id: contentId,
                    content_type: 'product',
                    content_name: contentName,
                }
            ],
            value,
            currency: 'USD',
            description: additionalData ? JSON.stringify(additionalData) : undefined,
        });
        console.log(`[TikTok Pixel] InitiateCheckout tracked: ${contentName}`, additionalData);
    } else {
        console.warn('[TikTok Pixel] ttq not available');
    }

    // Server-side tracking
    trackServerSide('InitiateCheckout', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'USD',
        description: additionalData ? JSON.stringify(additionalData) : undefined,
    }, testEventCode);
};

/**
 * Track Purchase event - Completed transaction
 * Sends to both browser pixel and server API
 * @param testEventCode - Optional test event code for TikTok testing (e.g., 'TEST93032')
 */
export const trackPurchase = (contentId: string, contentName: string, value: number = 9.99, additionalData?: Record<string, any>, testEventCode?: string) => {
    // Browser-side tracking
    if (window.ttq) {
        window.ttq.track('Purchase', {
            contents: [
                {
                    content_id: contentId,
                    content_type: 'product',
                    content_name: contentName,
                }
            ],
            value,
            currency: 'USD',
            description: additionalData ? JSON.stringify(additionalData) : undefined,
        });
        console.log(`[TikTok Pixel] Purchase tracked: ${contentName}`, additionalData);
    } else {
        console.warn('[TikTok Pixel] ttq not available');
    }

    // Server-side tracking
    trackServerSide('Purchase', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'USD',
        description: additionalData ? JSON.stringify(additionalData) : undefined,
    }, testEventCode);
};

/**
 * SHA-256 hash utility for future PII hashing (email, phone)
 * Note: Requires SubtleCrypto API (HTTPS only)
 */
export const sha256Hash = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};
