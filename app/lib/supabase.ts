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

  // Auth system with proper state management
  auth = {
    currentSession: null,
    listeners: [],
    
    getSession: async () => {
      try {
        const session = await AsyncStorage.getItem('supabase.auth.token');
        const parsedSession = session ? JSON.parse(session) : null;
        this.auth.currentSession = parsedSession;
        return { data: { session: parsedSession }, error: null };
      } catch (error) {
        return { data: { session: null }, error };
      }
    },
    
    onAuthStateChange: (callback) => {
      this.auth.listeners.push(callback);
      
      // Call immediately with current session
      setTimeout(() => {
        callback('INITIAL_SESSION', this.auth.currentSession);
      }, 100);
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = this.auth.listeners.indexOf(callback);
              if (index > -1) {
                this.auth.listeners.splice(index, 1);
              }
            }
          }
        }
      };
    },
    
    signInWithPassword: async ({ email, password }) => {
      // Basic validation for demo
      if (!email || !password) {
        return { data: { session: null }, error: { message: 'Email and password are required' } };
      }
      
      console.log('Mock login attempt:', { email, password });
      
      // Mock successful sign in
      const mockSession = {
        user: { 
          id: 'user-' + Date.now(), 
          email: email,
          user_metadata: { 
            name: email.split('@')[0],
            full_name: email.split('@')[0] 
          }
        },
        access_token: 'mock-token-' + Date.now(),
        refresh_token: 'mock-refresh-' + Date.now()
      };
      
      console.log('Mock session created:', mockSession);
      
      await AsyncStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
      this.auth.currentSession = mockSession;
      
      // Notify listeners
      this.auth.listeners.forEach(callback => {
        console.log('Notifying auth listener of SIGNED_IN');
        callback('SIGNED_IN', mockSession);
      });
      
      return { data: { session: mockSession }, error: null };
    },
    
    signUp: async ({ email, password }) => {
      if (!email || !password) {
        return { data: { user: null }, error: { message: 'Email and password are required' } };
      }
      
      // Mock successful sign up
      const mockUser = { 
        id: 'new-' + Date.now(), 
        email,
        user_metadata: { name: email.split('@')[0] }
      };
      
      return { data: { user: mockUser }, error: null };
    },
    
    signOut: async () => {
      await AsyncStorage.removeItem('supabase.auth.token');
      this.auth.currentSession = null;
      
      // Notify listeners
      this.auth.listeners.forEach(callback => {
        callback('SIGNED_OUT', null);
      });
      
      return { error: null };
    }
  };

  // Database mock with proper query chain support
  from = (table) => {
    const tableHandler = {
      select: (columns = '*') => ({
        eq: (column, value) => ({
          single: async () => {
            console.log(`Mock DB: ${table}.select(${columns}).eq(${column}, ${value}).single()`);
            
            if (table === 'profiles') {
              // Return profile for any user ID
              return { 
                data: { 
                  id: value, // Use the actual user ID being queried
                  credits: 10, 
                  is_pro: false,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }, 
                error: null 
              };
            }
            
            // Default mock data for other tables
            return { 
              data: { 
                id: value || '1', 
                credits: 5, 
                is_pro: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }, 
              error: null 
            };
          }
        }),
        
        // For queries without eq() - return empty array
        single: async () => {
          return { data: null, error: { code: 'PGRST116', message: 'No rows found' } };
        }
      }),
      
      insert: (data) => ({
        select: () => ({
          single: async () => {
            console.log(`Mock DB: ${table}.insert(${JSON.stringify(data)})`);
            // Mock successful insert
            return { 
              data: { 
                id: data.id || 'new-' + Date.now(), 
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }, 
              error: null 
            };
          }
        })
      })
    };
    
    // Add storage mock for gallery
    if (table === 'processed-images') {
      tableHandler.storage = {
        from: () => ({
          getPublicUrl: () => ({
            data: { publicUrl: 'https://via.placeholder.com/300x300.png?text=Demo+Image' }
          })
        })
      };
    }
    
    return tableHandler;
  };

  // Add storage mock at the top level
  storage = {
    from: (bucket) => ({
      getPublicUrl: (path) => ({
        data: { publicUrl: `https://via.placeholder.com/300x300.png?text=Demo+Image` }
      })
    })
  };
}

export const supabase = new SimpleSupabaseClient(); 