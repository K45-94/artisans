// src/auth/composables/usePlumAuthState.js
import { ref, computed } from "vue";
import { useAuthState as vueAuthState } from "src/auth/libs/vueauth/core";

export function usePlumAuthState() {
  const { isAuthenticated, user } = vueAuthState();

  const isShopOwner = computed(() => {
    return isAuthenticated.value && user.value?.role === "shop_owner";
  });

  return { isAuthenticated, isShopOwner };
}
