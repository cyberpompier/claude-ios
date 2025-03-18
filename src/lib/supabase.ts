import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymsqeeajnudxavxveyif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3FlZWFqbnVkeGF2eHZleWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTk2MjEsImV4cCI6MjA1NjkzNTYyMX0.66q6S9rbCuic_9d6uO1fECrJ2Fw3HeXzVTb_49c0C8U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
