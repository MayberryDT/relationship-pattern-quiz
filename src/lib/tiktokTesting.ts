/**
 * TikTok Server-Side Event Testing Utility
 * Use this in the browser console to test server-side tracking
 */

import { trackViewContent, trackCompleteRegistration, trackInitiateCheckout, trackPurchase } from './tiktokPixel';

// Test Event Code from TikTok (shown in their Events API test interface)
const TEST_EVENT_CODE = 'TEST93032';

/**
 * Test ViewContent event with server-side tracking
 */
export const testViewContent = () => {
    console.log('🧪 Testing ViewContent event...');
    trackViewContent('test-product', 'Test Product View', 4.95, TEST_EVENT_CODE);
};

/**
 * Test CompleteRegistration event
 */
export const testCompleteRegistration = () => {
    console.log('🧪 Testing CompleteRegistration event...');
    trackCompleteRegistration('test-quiz', 'Test Quiz Complete', 4.95, TEST_EVENT_CODE);
};

/**
 * Test InitiateCheckout event
 */
export const testInitiateCheckout = () => {
    console.log('🧪 Testing InitiateCheckout event...');
    trackInitiateCheckout('test-checkout', 'Test Checkout', 4.95, { test: true }, TEST_EVENT_CODE);
};

/**
 * Test Purchase event
 */
export const testPurchase = () => {
    console.log('🧪 Testing Purchase event...');
    trackPurchase('test-purchase', 'Test Purchase', 4.95, { test: true }, TEST_EVENT_CODE);
};

/**
 * Test all events in sequence
 */
export const testAllEvents = async () => {
    console.log('🧪 Testing all TikTok events...');

    testViewContent();
    await new Promise(r => setTimeout(r, 1000));

    testCompleteRegistration();
    await new Promise(r => setTimeout(r, 1000));

    testInitiateCheckout();
    await new Promise(r => setTimeout(r, 1000));

    testPurchase();

    console.log('✅ All test events sent! Check TikTok Events Manager.');
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
    (window as any).testTikTok = {
        testViewContent,
        testCompleteRegistration,
        testInitiateCheckout,
        testPurchase,
        testAllEvents,
    };
    console.log('🧪 TikTok test functions loaded! Use: window.testTikTok.testAllEvents()');
}
