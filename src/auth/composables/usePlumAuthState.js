import { ref, computed, onMounted } from "vue";
import { useAuthState } from "@vueauth/core";
import store from "src/plumStore";
import { supabase } from "src/supabaseClient";

export function usePlumAuthState() {
  const { user, isAuthenticated } = useAuthState();

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      store.setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  onMounted(() => {
    if (isAuthenticated.value && user.value) {
      fetchUserProfile(user.value.id);
    }
  });

  return {
    user,
    isAuthenticated,
    fetchUserProfile,
  };
}
