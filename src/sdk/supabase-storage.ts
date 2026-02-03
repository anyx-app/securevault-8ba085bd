/**
 * Supabase Storage Client (Direct Connection)
 * 
 * For storage operations (upload/download files).
 * Connects directly to shared Supabase instance.
 * 
 * Note: Database queries use the backend proxy (sdk/supabase.ts)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase-storage] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabaseStorage = createClient(supabaseUrl, supabaseAnonKey);

