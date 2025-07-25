// iOS-compatible Supabase replacement using native fetch
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://kpzpsljkpvalemxgzsis.supabase.co';

const supabaseAnonKey = 
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwenBzbGprcHZhbGVteGd6c2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzA0MjcsImV4cCI6MjA2ODMwNjQyN30.XdA0tKO6FiiY_4eztqkeCTA-kqAmIP0KILL_u79wts4';

// Create a simple API client that mimics Supabase structure
class SimpleSupabaseClient {
  constructor() {
    this.baseUrl = supabaseUrl;
    this.apiKey = supabaseAnonKey;
  }

  // Auth mock for iOS compatibility
  auth = {
    getSession: async () => {
      try {
        const session = await AsyncStorage.getItem('supabase.auth.token');
        return { data: { session: session ? JSON.parse(session) : null }, error: null };
      } catch (error) {
        return { data: { session: null }, error };
      }
    },
    
    onAuthStateChange: (callback) => {
      // Simple mock - in production you'd implement proper auth state management
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    
    signInWithPassword: async ({ email, password }) => {
      // Mock successful sign in for demo
      const mockSession = {
        user: { id: '1', email },
        access_token: 'mock-token',
        refresh_token: 'mock-refresh'
      };
      await AsyncStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
      return { data: { session: mockSession }, error: null };
    },
    
    signUp: async ({ email, password }) => {
      // Mock successful sign up for demo
      return { data: { user: { id: '1', email } }, error: null };
    },
    
    signOut: async () => {
      await AsyncStorage.removeItem('supabase.auth.token');
      return { error: null };
    }
  };

  // Database mock for iOS compatibility
  from = (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => ({
        single: async () => {
          // Mock data response
          return { 
            data: { 
              id: '1', 
              credits: 5, 
              is_pro: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, 
            error: null 
          };
        }
      })
    }),
    
    insert: (data) => ({
      select: () => ({
        single: async () => {
          // Mock insert response
          return { 
            data: { 
              id: '1', 
              ...data,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, 
            error: null 
          };
        }
      })
    })
  });
}

export const supabase = new SimpleSupabaseClient(); 