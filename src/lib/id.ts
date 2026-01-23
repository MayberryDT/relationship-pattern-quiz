/**
 * ID Generation Utilities
 */

/**
 * Generates a robust UUID v4.
 * 
 * Provides a triple-layer fallback strategy:
 * 1. crypto.randomUUID() (Modern, secure contexts only)
 * 2. crypto.getRandomValues() (Legacy, secure contexts)
 * 3. Math.random() + Date.now() (Ultimate fallback for non-secure/very old environments)
 */
export function generateUUID(): string {
    // Layer 1: Modern crypto.randomUUID
    try {
        if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
            return window.crypto.randomUUID();
        }
    } catch (e) {
        // Fall through
    }

    // Layer 2: Legacy crypto.getRandomValues
    try {
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
                (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
    } catch (e) {
        // Fall through
    }

    // Layer 3: Math.random() fallback (RFC4122-compliant but less entropy)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
