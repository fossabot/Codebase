import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const getClient = (): SupabaseClient =>
  createClient(
    process.env['NX_SUPA_KEY'] as string,
    process.env['NX_SUPA_URL'] as string,
    {
      persistSession: true,
      autoRefreshToken: true,
    }
  );
