// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://jbagkxihpvngdwahkoub.supabase.co";
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYWdreGlocHZuZ2R3YWhrb3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNTA1NTgsImV4cCI6MTk3MzgyNjU1OH0.OgoRNT5BNvwameqXxspI2E8XH5vSb7K3JdT0gS024mI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);