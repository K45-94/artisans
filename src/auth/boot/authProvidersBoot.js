// src/auth/boot/authProvidersBoot.js
import { boot } from "quasar/wrappers";
import { AuthPlugin } from "src/auth/libs/vueauth/core";
import supabaseConfig from "app/config/supabase";
import {
  SupabasePlugin,
  useIdentityPasswordRegister,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useUnauthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors,
  useAuthState,
  useAuthenticatedRedirector,
  useFetchUser,
  usePasswordResetViaEmail,
  useUpdatePassword,
} from "src/auth/libs/vueauth/core";

export default boot(({ app }) => {
  app.use(SupabasePlugin, supabaseConfig);

  app.use(AuthPlugin, {
    default: "supabase",
    providers: {
      supabase: {
        features: {
          "identityPassword:register": useIdentityPasswordRegister,
          "identityPassword:login": useIdentityPasswordLogin,
          "identityPassword:logout": useIdentityPasswordLogout,
          unauthenticatedRedirector: useUnauthenticatedRedirector,
          authenticatedRedirector: useAuthenticatedRedirector,
          errorHandler: useHandlesErrors,
          fetchUser: useFetchUser,
          authState: useAuthState,
          authRedirector: useAuthRedirector,
          passwordResetViaEmail: usePasswordResetViaEmail,
          updatePassword: useUpdatePassword,
        },
      },
    },
  });
});
