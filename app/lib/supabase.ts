// Temporarily disabled Supabase to fix iOS Node.js module issues
// import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

console.log('Supabase temporarily disabled for iOS compatibility');

// Create a mock supabase object to prevent crashes
const supabase = {
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

export { supabase }; 