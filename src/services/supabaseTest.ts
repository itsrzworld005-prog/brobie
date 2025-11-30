import { supabase } from "@/lib/supabase";

// Test Supabase connection without using any tables
export async function testSupabase() {
  // This requests metadata about your project
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return {
      connected: false,
      message: "❌ Supabase connection FAILED: " + error.message
    };
  }

  return {
    connected: true,
    message: "✅ Supabase is connected successfully!"
  };
}
