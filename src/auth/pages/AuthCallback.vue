<!--src/auth/pages/AuthCallback.vue-->
<template>
  <div>
    <h1>Handling authentication...</h1>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../../supabaseClient";
import { onMounted } from "vue";

const router = useRouter();

const handleCallback = async () => {
  console.log("Handling callback..."); // Debug
  const { error, data } = await supabase.auth.getSessionFromUrl({
    storeSession: true,
  });

  if (error) {
    console.error("Error handling callback:", error);
    router.push({ name: "auth.login" }); // Redirect to login if error
  } else {
    console.log("Callback handled successfully, user data:", data.user); // Debug
    router.push({ name: "artisans" }); // Redirect to home or dashboard
  }
};

onMounted(handleCallback);
</script>
