// src/auth/boot/authProvidersBoot.js
import { boot } from "quasar/wrappers";
import { AuthPlugin } from "@vueauth/core";
import supabaseConfig from "../../config/supabase";
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
} from "@vueauth/supabase";
console.log("Supabase Config:", supabaseConfig); // Log the config
export default boot(({ app }) => {
  console.log("Setting up Supabase Auth Plugin..."); // Log setup attempt
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
  console.log("Auth Plugin Setup complete with Supabase provider."); // Log success
});
