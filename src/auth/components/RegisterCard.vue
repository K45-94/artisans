<!--src/auth/components/RegisterCard.vue-->
<script setup>
import useRegister from "auth/composables/useRegister";
import AuthRegisterForm from "src/auth/components/forms/RegisterForm.vue";
import AuthErrorsBanner from "./ErrorsBanner.vue";

const {
  form,
  loading,
  errors,
  onRegisterClicked,
  validationErrors,
  hasValidationErrors,
  registered,
} = useRegister();
</script>

<template>
  <q-card class="reg-card" flat>
    <q-card-section class="text-center">
      <!-- Register Form -->
      <AuthRegisterForm
        v-model:email="form.email"
        v-model:password="form.password"
        v-model:password-confirmation="form.password_confirmation"
        v-model:name="form.name"
        v-model:username="form.username"
        :validation-errors="validationErrors"
        @submit="onRegisterClicked"
        color="accent"
      />

      <!-- Errors -->
      <div v-if="!hasValidationErrors" class="q-mb-sm">
        <AuthErrorsBanner :errors="errors" />
      </div>
    </q-card-section>

    <!-- Register Button -->
    <q-card-section>
      <q-btn
        :loading="loading"
        class="full-width shadow-20"
        color="primary"
        label="Register"
        unelevated
        outline=""
        type="submit"
        @click="onRegisterClicked"
      />
    </q-card-section>

    <q-dialog :model-value="registered" persistent>
      <q-card class="reg-card" flat>
        <q-card-section>
          <h5 class="q-my-md">Account Created!</h5>
          <div class="q-my-md">
            Look for a confirmation email in your inbox to get started!
          </div>
        </q-card-section>
        <q-btn
          label="Login Page"
          color="primary"
          unelevated
          no-caps
          class="full-width"
          @click="$router.push({ name: 'auth.login' })"
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>

<style lang="scss">
.reg-card {
  background: var(--primary-bg);
}
</style>
