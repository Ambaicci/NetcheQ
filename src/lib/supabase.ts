import { createClient } from '@supabase/supabase-js'

// Temporary values for development - we'll replace these later with real Supabase values
const supabaseUrl = 'https://example.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJpYXQiOjE2MTYyMzkwMjIsImV4cCI6MTkzMTgxNTAyMn0.fake_key_for_development'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)