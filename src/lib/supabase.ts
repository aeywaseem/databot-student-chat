
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocqjkvldthbruoczymls.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcWprdmxkdGhicnVvY3p5bWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTE0ODksImV4cCI6MjA2MzA4NzQ4OX0.Jr63785j6dbzgAOlFX1eM95dyuCBnp2zinomX-op88Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
