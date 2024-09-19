import { useRouter } from "vue-router";
import { useIdentityPasswordLogin, useAuthState } from "@vueauth/core";

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
    isReauthenticating,
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
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    login,
    resetForm,
    isReauthenticating,
    attemptSetEmailOnForm,
  };
};
