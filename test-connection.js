import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zctaeqvigtunswnznkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGFlcXZpZ3R1bnN3d256bmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTkxMDYsImV4cCI6MjA3NTIzNTEwNn0.2V9NI51pZWE5Li5GygFRsCqfd-FSstb8j4wViK17A8Q'

async function testConnection() {
  console.log('Testing Supabase connection...')

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test basic connection
    const { data, error } = await supabase.from('test').select('*').limit(1)

    if (error) {
      console.error('Connection error:', error.message)
      return false
    }

    console.log('✅ Supabase connection successful!')
    return true

  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    return false
  }
}

testConnection()
