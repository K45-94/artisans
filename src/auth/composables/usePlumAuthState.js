// src/auth/composables/usePlumAuthState.js
import { ref } from "vue";
import { useAuthState as vueAuthState } from "@vueauth/core";

export function usePlumAuthState() {
  const { isAuthenticated, user } = vueAuthState();
  const isShopOwner = ref(false);

  // Update the logic to determine if the user is a shop owner
  if (isAuthenticated.value && user.value) {
    // Assuming user has a role attribute to identify if they are a shop owner
    isShopOwner.value = user.value.role === "shop_owner";
  }

  return { isAuthenticated, isShopOwner };
}
