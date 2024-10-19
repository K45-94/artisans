// src/auth/composables/useRegister.js
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useIdentityPasswordRegister, useAuthState } from "@vueauth/core";
import { supabase } from "../../supabaseClient";

export default () => {
  const router = useRouter();
  const {
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    register,
    isReauthenticating,
    resetForm,
    resetErrors,
  } = useIdentityPasswordRegister();
  const { user } = useAuthState();

  const registered = ref(false);

  async function createProfile(userId) {
    // Create profile in the profiles table
    const { data, error } = await supabase.from("profiles").insert([
      {
        user_id: userId,
        username: form.username,
        name: form.name,
        email: form.email,
      },
    ]);
    if (error) {
      console.error("Profile creation error:", error);
      throw error;
    }
  }

  async function onRegisterClicked() {
    resetErrors();
    try {
      await register(); // Registers the user in auth.users
      if (!hasErrors.value) {
        // Get the registered user's ID from the auth state
        const userId = user.value.id;
        await createProfile(userId); // Call to create a profile
        registered.value = true;
      }
    } catch (error) {
      console.error("Registration or Profile creation error:", error);
    }
  }

  function onRegistrationComplete() {
    router.push({ name: "auth.login" });
  }

  return {
    onRegisterClicked,
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    register,
    resetForm,
    isReauthenticating,
    registered,
    onRegistrationComplete,
  };
};
