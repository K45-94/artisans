// src/services/profileServices.js

import { supabase } from "../supabaseClient";

// Fetch user profile
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error("Error fetching user profile: " + error.message);
  }

  return data;
}

// Update user profile
export async function updateUserProfile(userId, profile) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", userId);

  if (error) {
    throw new Error("Error updating user profile: " + error.message);
  }

  return data;
}
