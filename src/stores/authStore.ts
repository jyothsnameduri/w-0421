import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  role: 'employee' | 'agent' | 'admin';
  department: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'employee' | 'agent' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isAuthenticated: false,
      loading: true,
      
      fetchProfile: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }

          // Type assertion to ensure proper typing
          const profile: UserProfile = {
            ...data,
            role: data.role as 'employee' | 'agent' | 'admin'
          };

          set({ profile });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      },

      initialize: async () => {
        try {
          // Set up auth state listener
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            
            if (session?.user) {
              set({
                user: session.user,
                session,
                isAuthenticated: true,
                loading: false
              });

              // Fetch the user's profile from the database
              setTimeout(() => {
                get().fetchProfile(session.user.id);
              }, 0);
            } else {
              set({
                user: null,
                session: null,
                profile: null,
                isAuthenticated: false,
                loading: false
              });
            }
          });

          // Check for existing session
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            set({
              user: session.user,
              session,
              isAuthenticated: true,
              loading: false
            });
            
            await get().fetchProfile(session.user.id);
          } else {
            set({ loading: false });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ loading: false });
        }
      },

      login: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // Profile will be loaded by the auth state change listener
      },

      signUp: async (email: string, password: string, name: string, role: 'employee' | 'agent' | 'admin') => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role,
              department: 'General'
            },
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });

        if (error) {
          throw error;
        }

        // Profile will be created by the database trigger and loaded by auth state change listener
      },

      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
        // Auth state change listener will handle clearing the state
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Only persist basic auth state, not the full objects
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize auth when the store is created
useAuthStore.getState().initialize();
