import { supabase } from './supabase';

export type EventType =
    | 'quiz_start'
    | 'phase_enter'
    | 'question_answered'
    | 'quiz_complete'
    | 'checkout_click'
    | 'report_view'
    | 'free_report_continue'
    | 'paid_report_view'
    | 'report_download';


export const trackEvent = async (sessionId: string, eventType: EventType, eventData: Record<string, any> = {}) => {
    try {
        const { error } = await supabase
            .from('events')
            .insert({
                session_id: sessionId,
                event_type: eventType,
                event_data: eventData
            });

        if (error) {
            console.error('Error tracking event:', error);
        }
    } catch (err) {
        console.error('Unexpected error tracking event:', err);
    }
};
