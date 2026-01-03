import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.SUPABASE_URL
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Supabase env vars:", {
    supabaseUrl,
    serviceRoleKey
  })
  throw new Error("Missing Supabase server environment variables")
}

export const supabaseServer = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false
    }
  }
)
