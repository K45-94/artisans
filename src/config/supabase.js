// src/config/supabase.js
export default {
  supabaseUrl: process.env.VITE_SUPABASE_URL.replace(/['"]+/g, ""), // Remove extra quotes
  supabaseKey: process.env.VITE_SUPABASE_ANON_KEY.replace(/['"]+/g, ""), // Remove extra quotes
};
console.log("Supabase URL:", process.env.VITE_SUPABASE_URL);
console.log("Supabase Key:", process.env.VITE_SUPABASE_ANON_KEY);
