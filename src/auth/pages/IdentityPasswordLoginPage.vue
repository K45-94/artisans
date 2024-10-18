// src/auth/pages/IdentityPasswordLoginPage.vue
<script setup>
import AuthLoginCard from "src/auth/components/LoginCard.vue";
import { useAuthState } from "@vueauth/core";
import { onMounted } from "vue";
import useLogin from "src/auth/composables/useLogin";

// Destructure isAuthenticated and ensure it’s reactive
const { isAuthenticated } = useAuthState();
console.log("Auth State at LoginPage:", isAuthenticated.value); // Log auth state initially

const { onTwitterLogin } = useLogin(); // Use the Twitter login function from your composable

// Track onMounted usage (if needed)
onMounted(() => {
  console.log("LoginPage mounted!"); // Log when component is mounted
});
</script>

<template>
  <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg log constrain small-screen-only">
    <div class="text-center">
      <div class="q-mb-md text-h5 text-gradient">Sign In</div>
      <AuthLoginCard />
      <q-btn
        class="flex flex-center q-pa-md"
        color="grey-8"
        label="Forgot password"
        flat
        :to="{ name: 'auth.requestPasswordReset' }"
      ></q-btn>
      <!-- Show only if the user is not authenticated -->
      <div v-if="!isAuthenticated">
        <!-- Twitter Login Button -->
        <q-btn
          class="full-width q-ma-sm q-pb-sm"
          color="info"
          outline
          label="X Login"
          @click="onTwitterLogin"
        ></q-btn>
      </div>
      <div class="flex flex-center q-pa-md">
        <div class="text-gradient">Need an account?</div>
        <q-btn
          no-caps
          label="Register"
          color="secondary"
          outline
          class="full-width q-ma-sm q-pb-sm"
          :to="{ name: 'auth.register' }"
        ></q-btn>

        <q-btn
          no-caps
          label="No Login"
          color="negative"
          outline=""
          class="full-width q-ma-sm q-pt-sm"
          :to="{ name: 'artisans' }"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.log {
  min-height: 100vh;
}
</style>
