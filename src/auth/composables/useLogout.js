import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthState } from "@vueauth/core";
import store from "src/plumStore";
import { supabase } from "src/supabaseClient";

export default function useLogout() {
  const loading = ref(false);
  const { logout } = useAuthState();
  const router = useRouter();

  const onLogoutClicked = async () => {
    loading.value = true;
    try {
      await supabase.auth.signOut();
      store.clearUserDetails();
      await logout();
      router.push("/artisans");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    onLogoutClicked,
  };
}
