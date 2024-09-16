<script setup>
import AuthRegisterCard from "src/auth/components/RegisterCard.vue";
</script>

<template>
  <div class="flex flex-center reg" padding>
    <div class="text-center">
      <h5 class="q-mb-md text-secondary">Register</h5>
      <AuthRegisterCard />
    </div>
  </div>
  <div class="absolute-top-right q-pa-md">
    <div class="text-gradient">Already have an account?</div>
    <q-btn
      no-caps
      label="login"
      flat
      class="full-width text-white"
      :to="{ name: 'auth.login' }"
    />
  </div>
</template>
<style lang="scss">
.reg {
  min-height: 100vh;
}
</style>
