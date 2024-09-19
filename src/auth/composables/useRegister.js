import { ref } from "vue";
import { useRouter } from "vue-router";
import { useIdentityPasswordRegister, useAuthState } from "@vueauth/core";

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

  async function onRegisterClicked() {
    resetErrors();
    try {
      await register();
      if (!hasErrors.value) {
        registered.value = true;
      }
    } catch (error) {
      console.error("Registration error:", error);
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
