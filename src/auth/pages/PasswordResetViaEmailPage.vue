<!--src/auth/pages/PasswordResetViaEmailPage.vue-->
<script setup>
import PasswordResetCard from "src/auth/components/PasswordResetCard.vue";
</script>

<template>
  <div
    class="q-pt-lg q-pb-md q-pl-lg q-pr-lg password-reset constrain small-screen-only"
  >
    <div class="text-center">
      <h5 class="q-mb-md">Password Reset</h5>
      <PasswordResetCard />
    </div>
  </div>
</template>
<style lang="scss">
.password-reset {
  min-height: 100vh;
}
</style>
