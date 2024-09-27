import { boot } from "quasar/wrappers";
import { AuthPlugin } from "@vueauth/core";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "src/config/supabase";
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

const { supabaseUrl, supabaseKey } = supabaseConfig;

console.log("Loaded Supabase Config:", { supabaseUrl, supabaseKey });

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

export default boot(({ app }) => {
  console.log("Initializing Supabase with:", { supabaseUrl, supabaseKey });

  app.use(SupabasePlugin, {
    supabaseUrl,
    supabaseKey,
  });

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
