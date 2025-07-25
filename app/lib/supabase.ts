import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Try multiple ways to get environment variables with iOS compatibility
const supabaseUrl = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://kpzpsljkpvalemxgzsis.supabase.co';

const supabaseAnonKey = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwenBzbGprcHZhbGVteGd6c2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzA0MjcsImV4cCI6MjA2ODMwNjQyN30.XdA0tKO6FiiY_4eztqkeCTA-kqAmIP0KILL_u79wts4';

// Debug logs only in development
if (__DEV__) {
  console.log('Supabase Config:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    constantsExtra: Constants.expoConfig?.extra
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

// Create Supabase client with iOS-compatible configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'remove-help-mobile',
    },
    // Use custom fetch that's iOS compatible
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
        },
      });
    },
  },
}); 