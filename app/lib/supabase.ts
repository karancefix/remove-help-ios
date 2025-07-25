import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Try multiple ways to get environment variables
const supabaseUrl = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://kpzpsljkpvalemxgzsis.supabase.co'; // Fallback from eas.json

const supabaseAnonKey = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwenBzbGprcHZhbGVteGd6c2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzA0MjcsImV4cCI6MjA2ODMwNjQyN30.XdA0tKO6FiiY_4eztqkeCTA-kqAmIP0KILL_u79wts4'; // Fallback from eas.json

// Debug logs only in development
if (__DEV__) {
  console.log('Supabase Config:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    constantsExtra: Constants.expoConfig?.extra,
    constantsManifest: Constants.manifest?.extra || Constants.manifest2?.extra
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'Supabase configuration is missing. Check your environment variables.';
  if (__DEV__) {
    console.error('Missing Supabase configuration:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl,
      constants: Constants
    });
  }
  throw new Error(errorMessage);
}

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Ensure auth persistence works on iOS
      detectSessionInUrl: false,
      persistSession: true,
      storage: undefined, // Let Supabase choose the appropriate storage
    },
  });
} catch (error) {
  if (__DEV__) {
    console.error('Failed to initialize Supabase client:', error);
  }
  throw error;
}

export { supabase }; 