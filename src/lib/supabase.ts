import { createClient } from '@supabase/supabase-js';

// Hardcoded values to ensure production reliability
const supabaseUrl = 'https://bzsjivgykaclmmovugiz.supabase.co';
const supabaseAnonKey = 'sb_publishable_xtcjKKmSo03pCV97LFI3Dw_RYmj3ACG';

// Fallback to env vars if needed (though hardcoded ones above take precedence in this order)
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bzsjivgykaclmmovugiz.supabase.co';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing from environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
