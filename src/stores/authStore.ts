
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isAuthenticated: false,
      loading: true,
      
      initialize: async () => {
        try {
          // Set up auth state listener
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            
            if (session?.user) {
              // For now, we'll create a basic profile from user metadata
              // Once we create the profiles table, we can fetch from there
              const profile: UserProfile | null = session.user.user_metadata ? {
                id: session.user.id,
                name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
                role: session.user.user_metadata.role || 'employee',
                department: session.user.user_metadata.department || 'General',
                avatar: session.user.user_metadata.avatar_url,
                created_at: session.user.created_at,
                updated_at: session.user.updated_at || session.user.created_at
              } : null;
              
              set({
                user: session.user,
                session,
                profile,
                isAuthenticated: true,
                loading: false
              });
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
            const profile: UserProfile | null = session.user.user_metadata ? {
              id: session.user.id,
              name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
              role: session.user.user_metadata.role || 'employee',
              department: session.user.user_metadata.department || 'General',
              avatar: session.user.user_metadata.avatar_url,
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at
            } : null;
            
            set({
              user: session.user,
              session,
              profile,
              isAuthenticated: true,
              loading: false
            });
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

        // Profile will be created from user metadata and loaded by auth state change listener
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
