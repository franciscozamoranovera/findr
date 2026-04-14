import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ehdwumyvvxjmzatwkrhu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHd1bXl2dnhqbXphdHdrcmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDkwNDQsImV4cCI6MjA1OTI4NTA0NH0.KB45j2HWqH9Ub63OFPXKi81FNU1qY6fq5wI8jWFBkiU";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    //Manage user sessions in browser
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    //Important for Astro: localStorage for persist Sessions
    storage: typeof window !== "undefined" ? {
      getItem: (key) => window.localStorage.getItem(key),
      setItem: (key, value) => window.localStorage.setItem(key, value),
      removeItem: (key) => window.localStorage.removeItem(key)
    } : void 0,
    // Agregar storageKey específico para debugging
    storageKey: "findr-supabase-auth",
    // Debug mode disabled to reduce GoTrueClient logs
    debug: false
  }
});
const checkAuth = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return null;
  }
};

export { checkAuth as c, supabase as s };
