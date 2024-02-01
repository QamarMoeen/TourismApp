import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqthqxfxncqtepdzesxw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxdGhxeGZ4bmNxdGVwZHplc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NDMwNjksImV4cCI6MjAxOTMxOTA2OX0.gTy9jI_eXamloC7OBt71-FIQGC_vJjBmFpx5MjEpRao';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
