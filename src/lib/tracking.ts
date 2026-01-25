import { supabase } from './supabase';


export interface ClientMetadata {
    screenWidth: number;
    screenHeight: number;
    language: string;
    platform: string;
}

export const trackingService = {
    /**
     * Initialize a new quiz session
     */
    async initSession(sessionId: string, utmParams: Record<string, string> = {}) {
        try {
            const metadata: ClientMetadata = {
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                language: navigator.language,
                platform: navigator.platform
            };

            const { error } = await supabase
                .from('quiz_sessions')
                .upsert({
                    session_id: sessionId,
                    user_agent: navigator.userAgent,
                    referer: document.referrer,
                    utm_params: utmParams,
                    client_metadata: metadata
                }, { onConflict: 'session_id' });

            if (error) {
                console.error('Failed to init session:', error);
            }
        } catch (err) {
            console.error('Error in tracking init:', err);
        }
    },

    /**
     * Record a specific answer
     */
    async recordAnswer(
        sessionId: string,
        questionId: string,
        answerId: string,
        answerText: string = '',
        timeSpentMs: number = 0
    ) {
        try {
            const { error } = await supabase
                .from('quiz_responses')
                .insert({
                    session_id: sessionId,
                    question_id: questionId,
                    answer_id: answerId,
                    answer_text: answerText,
                    time_spent_ms: timeSpentMs
                });

            if (error) {
                console.error('Failed to record answer:', error);
            }
        } catch (err) {
            console.error('Error in answer recording:', err);
        }
    }
};
