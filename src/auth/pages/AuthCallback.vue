// src/auth/pages/AuthCallback.vue
<template>
  <div>
    <h1>Handling authentication...</h1>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../../supabaseClient";

const router = useRouter();

const handleCallback = async () => {
  const { error } = await supabase.auth.getSessionFromUrl({
    storeSession: true,
  });

  if (error) {
    console.error("Error handling callback:", error);
  }

  router.push("/artisans");
};

handleCallback();
</script>
