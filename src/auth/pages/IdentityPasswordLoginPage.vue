<script setup>
import AuthLoginCard from "src/auth/components/LoginCard.vue";
</script>

<template>
  <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg log">
    <div class="text-center">
      <div class="q-mb-md text-secondary text-h5">Sign In</div>
      <AuthLoginCard />
      <q-btn
        class="full-width q-mt-md"
        color="grey-8"
        label="forgot password"
        flat
        :to="{ name: 'auth.requestPasswordReset' }"
      />
    </div>
    <div class="flex flex-center q-pa-md">
      <div class="text-gradient">Need an account?</div>
      <q-btn
        no-caps
        label="register"
        color="secondary"
        flat
        class="full-width"
        :to="{ name: 'auth.register' }"
      />
    </div>
  </div>
</template>
<style lang="scss">
.log {
  min-height: 100vh;
}
</style>
