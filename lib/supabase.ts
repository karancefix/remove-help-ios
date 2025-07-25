// Temporarily disabled Supabase to fix iOS Node.js module issues
// import { createClient } from '@supabase/supabase-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-url-polyfill/auto';

// Get environment variables with fallbacks
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate required environment variables
if (!supabaseUrl) {
  console.error('EXPO_PUBLIC_SUPABASE_URL is required');
  throw new Error('Missing Supabase URL configuration');
}

if (!supabaseAnonKey) {
  console.error('EXPO_PUBLIC_SUPABASE_ANON_KEY is required');
  throw new Error('Missing Supabase Anon Key configuration');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid Supabase URL configuration');
}

// Only log in development
if (__DEV__) {
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');
} else {
  // In production, only validate without logging
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration in production build');
  }
}

// Mock supabase export for iOS compatibility
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: new Error('Supabase disabled') }),
    signUp: () => Promise.resolve({ error: new Error('Supabase disabled') }),
    signOut: () => Promise.resolve({ error: new Error('Supabase disabled') }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: new Error('Supabase disabled') })
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: new Error('Supabase disabled') })
      })
    })
  })
};