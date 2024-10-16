// src/auth/composables/usePlumAuthState.js
import { ref, computed } from "vue";
import { useAuthState as vueAuthState } from "@vueauth/core";

export function usePlumAuthState() {
  const { isAuthenticated, user } = vueAuthState();

  console.log("Auth State:", isAuthenticated.value); // Log auth state
  console.log("User State:", user.value); // Log user info

  const isShopOwner = computed(() => {
    const shopOwnerStatus =
      isAuthenticated.value && user.value?.role === "shop_owner";
    console.log("Shop Owner Status:", shopOwnerStatus); // Log role check
    return shopOwnerStatus;
  });

  return { isAuthenticated, isShopOwner };
}
