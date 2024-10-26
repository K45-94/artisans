import supabase from "src/config/supabase";

export async function fetchArtisans() {
  try {
    const { data, error } = await supabase.from("artisans").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return [];
  }
}

export async function fetchArtisanById(artisanId) {
  try {
    const { data, error } = await supabase
      .from("artisans")
      .select("*")
      .eq("id", artisanId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching artisan by ID:", error);
    return null;
  }
}

export async function createArtisan(artisan) {
  try {
    const { data, error } = await supabase
      .from("artisans")
      .insert(artisan)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error creating artisan:", error);
    return null;
  }
}

export async function updateArtisan(artisanId, artisan) {
  try {
    const { data, error } = await supabase
      .from("artisans")
      .update(artisan)
      .eq("id", artisanId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating artisan:", error);
    return null;
  }
}

export async function deleteArtisan(artisanId) {
  try {
    const { data, error } = await supabase
      .from("artisans")
      .delete()
      .eq("id", artisanId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error deleting artisan:", error);
    return null;
  }
}
