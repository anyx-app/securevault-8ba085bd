import { createClient } from '@supabase/supabase-js';

const authClient = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export async function validateUser(authHeader: string | undefined) {
  if (!authHeader) {
    return { user: null, error: 'Authorization header missing' };
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return { user: null, error: 'Token missing from Authorization header' };
  }

  const { data: { user }, error } = await authClient.auth.getUser(token);
  
  if (error || !user) {
    return { user: null, error: 'Invalid or expired token' };
  }

  return { user, error: null };
}

