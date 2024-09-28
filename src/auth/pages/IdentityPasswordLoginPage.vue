<script setup>
import AuthLoginCard from "src/auth/components/LoginCard.vue";
</script>

<template>
  <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg log constrain small-screen-only">
    <div class="text-center">
      <div class="q-mb-md text-h5">Sign In</div>
      <AuthLoginCard />
      <q-btn
        class="flex flex-center q-pa-md"
        color="grey-8"
        label="forgot password"
        flat
        :to="{ name: 'auth.requestPasswordReset' }"
      ></q-btn>
    </div>
    <div class="flex flex-center q-pa-md">
      <div class="text-gradient">Need an account?</div>
      <q-btn
        no-caps
        label="register"
        color="secondary"
        outline
        class="full-width q-ma-sm q-pb-sm"
        :to="{ name: 'auth.register' }"
      ></q-btn>
      <q-btn
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
