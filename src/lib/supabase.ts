
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocqjkvldthbruoczymls.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcWprdmxkdGhicnVvY3p5bWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MTE0ODksImV4cCI6MjA2MzA4NzQ4OX0.M5dQWw70jRHIMq-rXD0DSLY6QBG8f-R12UC6Oc-gztU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
