<script setup>
import AuthLoginCard from "src/auth/components/LoginCard.vue";
import { useAuthState } from "src/auth/libs/vueauth/core";
import { onMounted } from "vue"; // This import looks inactive. are we good?
import useLogin from "src/auth/composables/useLogin"; // Import your login composable

// Destructure isAuthenticated and ensure it’s reactive
const { isAuthenticated } = useAuthState();
const { onTwitterLogin } = useLogin(); // Use the Twitter login function from your composable
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

      <!-- Show 'No Login' button only if the user is not authenticated -->
      <q-btn
        v-if="!isAuthenticated"
        no-caps
        label="No Login"
        color="primary"
        outline=""
        class="full-width q-ma-sm q-pt-sm"
        :to="{ name: 'artisans' }"
      ></q-btn>
    </div>
  </div>
</template>

<style lang="scss">
.log {
  min-height: 100vh;
}
</style>
