import supabase from "src/config/supabase";

export async function fetchGroups() {
  try {
    const { data, error } = await supabase.from("groups").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}

export async function fetchGroupById(groupId) {
  try {
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    return null;
  }
}

export async function createGroup(group) {
  try {
    const { data, error } = await supabase
      .from("groups")
      .insert(group)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
}

export async function updateGroup(groupId, group) {
  try {
    const { data, error } = await supabase
      .from("groups")
      .update(group)
      .eq("id", groupId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating group:", error);
    return null;
  }
}

export async function deleteGroup(groupId) {
  try {
    const { data, error } = await supabase
      .from("groups")
      .delete()
      .eq("id", groupId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error deleting group:", error);
    return null;
  }
}
