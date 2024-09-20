// src/auth/composables/usePlumAuthState.js
import { ref, computed } from "vue";
import { useAuthState as vueAuthState } from "@vueauth/core";

export function usePlumAuthState() {
  const { isAuthenticated, user } = vueAuthState();

  const isShopOwner = computed(() => {
    return isAuthenticated.value && user.value?.role === "shop_owner";
  });

  console.log("isAuthenticated:", isAuthenticated.value);
  console.log("user:", user.value);
  console.log("isShopOwner:", isShopOwner.value);

  return { isAuthenticated, isShopOwner };
}
