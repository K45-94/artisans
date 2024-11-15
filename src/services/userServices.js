// src/services/userServices.js
import supabase from "src/config/supabase";

export async function assignCurrentUserToShop(shopId) {
  try {
    const user = supabase.auth.user();
    if (!user) throw new Error("No authenticated user found");

    const { data, error } = await supabase
      .from("shop_employees")
      .insert({ shop_id: shopId, user_id: user.id });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error assigning user to shop:", error);
    return null;
  }
}
