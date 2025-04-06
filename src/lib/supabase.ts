
import { createClient } from '@supabase/supabase-js';

// Use default values only for development; in production, these will come from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://dimdaigehnbfigtydyrx.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbWRhaWdlaG5iZmlndHlkeXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzUwODAsImV4cCI6MjA1NzAxMTA4MH0.eWC-d8zw7VjrY-oCa5Da-dyOiCF2XIfKXDvaHKn_GXI';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage
  }
});
