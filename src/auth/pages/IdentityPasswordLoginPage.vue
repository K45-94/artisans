// src/auth/pages/IdentityPasswordLoginPage.vue
<script setup>
import AuthLoginCard from "src/auth/components/LoginCard.vue";
import { useAuthState } from "@vueauth/core";
import { onMounted } from "vue";
import useLogin from "src/auth/composables/useLogin";

const { isAuthenticated } = useAuthState();
console.log("Auth State at LoginPage:", isAuthenticated.value);

const { onTwitterLogin } = useLogin();

onMounted(() => {
  console.log("LoginPage mounted!");
});
</script>

<template>
  <div class="login-page">
    <div class="login-container q-pa-xl">
      <div class="login-header text-gradient">Sign In</div>
      <AuthLoginCard />
      <q-btn
        class="forgot-password-btn"
        color="grey-8"
        label="Forgot password"
        flat
        :to="{ name: 'auth.requestPasswordReset' }"
      />
      <div v-if="!isAuthenticated">
        <q-btn
          class="twitter-login-btn"
          color="info"
          outline
          label="X Login"
          @click="onTwitterLogin"
        />
      </div>
      <div class="login-footer">
        <div class="text-gradient">Need an account?</div>
        <q-btn
          no-caps
          label="Register"
          color="secondary"
          outline
          class="q-ma-md"
          :to="{ name: 'auth.register' }"
        />
        <q-btn
          no-caps
          label="No Login"
          color="negative"
          outline
          class="q-ma-md"
          :to="{ name: 'artisans' }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--secondary-bg);
}

.login-container {
  background: var(--primary-bg);
  border-radius: 18px;
  box-shadow: 0 4px 15px rgb(38, 211, 3);
  width: 99%;
}

.login-header {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.forgot-password-btn,
.twitter-login-btn {
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;
}

.forgot-password-btn:hover,
.twitter-login-btn:hover {
  background-color: var(--q-color-info);
  color: white;
}

.login-footer {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}
</style>
