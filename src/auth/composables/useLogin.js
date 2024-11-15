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

    console.log("Starting Twitter login..."); // Debugging statement
    try {
      const { error } = await supabase.auth.signIn({
        provider: "twitter",
        options: {
          redirectTo: "https://plum-cl.netlify.app/#/artisans", // Ensure this is correct
        },
      });

      if (error) {
        console.error("Twitter login error:", error);
      } else {
        console.log("Twitter login initiated successfully"); // Debugging statement
      }
    } catch (error) {
      console.error("Exception in Twitter login:", error);
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
