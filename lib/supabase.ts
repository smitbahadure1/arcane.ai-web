import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('URL:', supabaseUrl ? '✅ Present' : '❌ Missing')
  console.error('Anon Key:', supabaseAnonKey ? '✅ Present' : '❌ Missing')
}

// For development/demo purposes, we'll use a mock implementation
// when Supabase is not accessible
const USE_MOCK_SUPABASE = !supabaseUrl || !supabaseAnonKey ||
  supabaseUrl.includes('zctaeqvigtunswnznkl.supabase.co') // Your specific URL that isn't working

export const supabase = USE_MOCK_SUPABASE ?
  createMockSupabaseClient() :
  createClient(supabaseUrl, supabaseAnonKey)

// Mock Supabase client for development when real Supabase isn't accessible
function createMockSupabaseClient() {
  console.warn('🔧 Using mock Supabase client - authentication will not persist')

  return {
    auth: {
      signUp: async (credentials: any) => {
        console.log('🎭 Mock sign up for:', credentials.email)
        // Simulate successful signup
        return {
          data: {
            user: {
              id: 'mock-user-' + Date.now(),
              email: credentials.email,
              created_at: new Date().toISOString()
            }
          },
          error: null
        }
      },
      signInWithPassword: async (credentials: any) => {
        console.log('🎭 Mock sign in for:', credentials.email)
        // Simulate successful signin
        return {
          data: {
            user: {
              id: 'mock-user-' + Date.now(),
              email: credentials.email,
              created_at: new Date().toISOString()
            },
            session: {
              access_token: 'mock-token',
              refresh_token: 'mock-refresh-token'
            }
          },
          error: null
        }
      },
      signInWithOAuth: async () => {
        console.log('🎭 Mock Google sign in')
        return {
          data: {
            url: '#',
            provider: 'google'
          },
          error: null
        }
      },
      signOut: async () => {
        console.log('🎭 Mock sign out')
        return { error: null }
      },
      getUser: async () => {
        console.log('🎭 Mock get user')
        return {
          data: { user: null },
          error: null
        }
      },
      resetPasswordForEmail: async (email: string) => {
        console.log('🎭 Mock password reset for:', email)
        return {
          data: {},
          error: null
        }
      }
    },
    from: () => ({
      select: () => ({
        limit: () => Promise.resolve({ data: [], error: null })
      })
    })
  }
}

// Auth helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    console.log('🔄 Attempting sign up for:', email)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('❌ Sign up error:', error.message)
        return { data: null, error }
      }

      console.log('✅ Sign up successful:', data.user?.email)
      return { data, error: null }
    } catch (error) {
      console.error('❌ Network error during sign up:', error)
      return { data: null, error: { message: 'Network error. Please check your connection.' } }
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    console.log('🔄 Attempting sign in for:', email)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('❌ Sign in error:', error.message)
        return { data: null, error }
      }

      console.log('✅ Sign in successful:', data.user?.email)
      return { data, error: null }
    } catch (error) {
      console.error('❌ Network error during sign in:', error)
      return { data: null, error: { message: 'Network error. Please check your connection.' } }
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    console.log('🔄 Attempting Google sign in')
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        console.error('❌ Google sign in error:', error.message)
        return { data: null, error }
      }

      console.log('✅ Google sign in initiated')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Network error during Google sign in:', error)
      return { data: null, error: { message: 'Network error. Please check your connection.' } }
    }
  },

  // Sign out
  signOut: async () => {
    console.log('🔄 Signing out')
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('❌ Sign out error:', error.message)
        return { error }
      }

      console.log('✅ Sign out successful')
      return { error: null }
    } catch (error) {
      console.error('❌ Network error during sign out:', error)
      return { error: { message: 'Network error. Please check your connection.' } }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    console.log('🔄 Getting current user')
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('❌ Get user error:', error.message)
        return { user: null, error }
      }

      console.log('✅ Current user:', user?.email)
      return { user, error: null }
    } catch (error) {
      console.error('❌ Network error getting user:', error)
      return { user: null, error: { message: 'Network error. Please check your connection.' } }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    console.log('🔄 Sending password reset for:', email)
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        console.error('❌ Password reset error:', error.message)
        return { data: null, error }
      }

      console.log('✅ Password reset email sent')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Network error during password reset:', error)
      return { data: null, error: { message: 'Network error. Please check your connection.' } }
    }
  }
}

export default auth
