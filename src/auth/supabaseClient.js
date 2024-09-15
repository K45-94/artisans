// src/auth/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import config from "../config/supabase"; // Correct relative path

console.log("Supabase Config:", config);

const supabaseUrl = config.credentials.supabaseUrl;
const supabaseKey = config.credentials.supabaseKey;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL and Key must be provided");
  throw new Error("Supabase URL and Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
