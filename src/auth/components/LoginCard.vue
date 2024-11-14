<!--src/auth/components/LoginCard.vue-->
<script setup>
import AuthLoginForm from "src/auth/components/forms/LoginForm.vue";
import useLogin from "auth/composables/useLogin";
import AuthErrorsBanner from "./ErrorsBanner.vue";

const {
  onLoginClicked,
  form,
  loading,
  errors,
  hasErrors,
  validationErrors,
  hasValidationErrors,
} = useLogin();
</script>

<template>
  <q-card class="log-card">
    <q-card-section class="text-center text-gradient">
      <AuthLoginForm
        v-model:email="form.email"
        v-model:password="form.password"
        :validation-errors="validationErrors"
      />
      <div v-if="hasErrors">
        <AuthErrorsBanner :errors="errors" />
      </div>
    </q-card-section>
    <q-btn
      :loading="loading"
      class="full-width login-btn"
      color="secondary"
      label="Login"
      outline
      unelevated
      @click="onLoginClicked"
    />
  </q-card>
</template>

<style lang="scss">
.log-card {
  background: var(--primary-bg);
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.login-btn {
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: var(--q-color-secondary);
  color: white;
}
</style>
