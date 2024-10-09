<script setup>
import { QCard, QCardSection, QBtn } from "quasar";
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
  <q-card class="log-card" flat>
    <q-card-section class="text-center text-gradient">
      <!-- Login Form -->
      <AuthLoginForm
        v-model:email="form.email"
        v-model:password="form.password"
        :validation-errors="validationErrors"
      />

      <!-- Errors -->
      <div v-if="hasErrors">
        <AuthErrorsBanner :errors="errors" />
      </div>
    </q-card-section>

    <!-- Login Button -->
    <q-btn
      :loading="loading"
      class="full-width"
      color="secondary"
      label="login"
      outline=""
      unelevated
      @click="onTwitterLogin"
    />
  </q-card>
</template>

<style lang="scss">
.log-card {
  background: var(--primary-bg);
}
</style>
