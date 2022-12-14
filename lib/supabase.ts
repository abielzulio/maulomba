import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL?.toString() || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY?.toString() || ""
)

export const SUPABASE_BUCKET_BASE_URL = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.in/storage/v1/object/public`
