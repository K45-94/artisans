// src/auth/composables/useLogin.js
import { useRouter } from "vue-router";
import { useIdentityPasswordLogin, useAuthState } from "@vueauth/core";
import { supabase } from "src/supabaseClient"; // Import your Supabase client

export default () => {
  const router = useRouter();
  const {
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    login,
    resetForm,
    resetErrors,
  } = useIdentityPasswordLogin();
  const { user } = useAuthState();

  async function onLoginClicked() {
    resetErrors();
    try {
      await login();
      if (!hasErrors.value) {
        router.push({ name: "artisans" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function onTwitterLogin() {
    resetErrors();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: "https://plum-cl.netlify.app/#/artisans", // This is the URL where the user will be redirected after successful login.
      },
    });
    if (error) {
      console.error("Twitter login error:", error);
    }
  }

  function onForgotPasswordClicked() {
    router.push({ name: "auth.requestPasswordReset" });
  }

  function attemptSetEmailOnForm() {
    if (typeof form.value.email === "string" && user.value?.email) {
      form.value.email = user.value.email;
    }
  }

  return {
    onLoginClicked,
    onForgotPasswordClicked,
    onTwitterLogin,
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    login,
    resetForm,
    attemptSetEmailOnForm,
  };
};
