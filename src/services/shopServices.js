// src/services/shopServices.js
import supabase from "src/config/supabase";

export async function fetchShops() {
  try {
    const { data, error } = await supabase.from("shops").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
}

export async function fetchShopById(shopId) {
  try {
    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("id", shopId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching shop by ID:", error);
    return null;
  }
}

export async function createShop(shop) {
  try {
    const { data, error } = await supabase.from("shops").insert(shop).single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error creating shop:", error);
    return null;
  }
}

export async function updateShop(shopId, shop) {
  try {
    const { data, error } = await supabase
      .from("shops")
      .update(shop)
      .eq("id", shopId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating shop:", error);
    return null;
  }
}

export async function deleteShop(shopId) {
  try {
    const { data, error } = await supabase
      .from("shops")
      .delete()
      .eq("id", shopId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error deleting shop:", error);
    return null;
  }
}
