<!--src/auth/pages/IdentityPasswordRegisterPage.vue-->
<script setup>
import AuthRegisterCard from "src/auth/components/RegisterCard.vue";
</script>

<template>
  <div class="q-pt-lg q-pb-md q-pl-lg q-pr-lg reg constrain small-screen-only">
    <div class="text-center">
      <h5 class="q-mb-md text-secondary">Register</h5>
      <AuthRegisterCard />
    </div>
    <div class="flex flex-center q-pa-md q-mb-lg">
      <div class="text-gradient">Already have an account?</div>
      <q-btn
        no-caps
        label="login"
        flat
        class="full-width text-secondary"
        :to="{ name: 'auth.login' }"
      />
    </div>
  </div>
</template>
<style lang="scss">
.reg {
  min-height: 100vh;
}
</style>
