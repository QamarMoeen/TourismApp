import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjcsafwlippubxzkxujb.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqY3NhZndsaXBwdWJ4emt4dWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NTU5NDMsImV4cCI6MjAyMjQzMTk0M30.lkyJx70iqqSh7skzclRvlDaYN6vJ-roWNjHJQ9R63yE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})