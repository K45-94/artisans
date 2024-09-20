<script setup>
import PasswordResetRequestCard from "src/auth/components/PasswordResetRequestCard.vue";
</script>

<template>
  <div
    class="q-pt-lg q-pb-md q-pl-lg q-pr-lg password-reset constrain small-screen-only"
  >
    <div class="text-center">
      <div class="q-mb-md text-gradient">Password Reset</div>
      <PasswordResetRequestCard />
      <q-btn
        class="full-width q-mt-md"
        color="secondary"
        label="back"
        flat
        :to="{ name: 'auth.login' }"
      />
    </div>
  </div>
</template>
<style lang="scss">
.password-reset {
  min-height: 100vh;
}
</style>
