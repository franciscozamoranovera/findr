import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

//ADDITIONAL CONFIGURATIONS
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        //Manage user sessions in browser
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        //Important for Astro: localStorage for persist Sessions
        storage: typeof window !== 'undefined' ? {
            getItem: (key) => window.localStorage.getItem(key),
            setItem: (key, value) => window.localStorage.setItem(key, value),
            removeItem: (key) => window.localStorage.removeItem(key)
        } : undefined,
        // Agregar storageKey específico para debugging
        storageKey: 'findr-supabase-auth',
        // Debug mode disabled to reduce GoTrueClient logs
        debug: false
    }
})

//HELPERS
export const auth = {
    //Get Actual Session
    async getSession() {
        const {data: {session}, error} = await supabase.auth.getSession()
        return { session, error}
    },

    //Get Actual User
    async getUser() {
        const { data: { user }, error} = await supabase.auth.getUser()
        return { user, error}
    },

    //Verify Authentication
    async isAutenticated() {
        const {session} = await this.getSession()
        return !!session
    }
}

//Middleware to use in Astro
export const checkAuth = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession()
        return session
    } catch (error) {
        console.error('Auth verification failed:', error)
        return null
    }
}