// src/boot/registerAuthRoutes.js
import { boot } from "quasar/wrappers";

export default boot(({ router }) => {
  console.log("Registering auth routes");
  router.addRoute({
    path: "/register",
    name: "auth.register",
    meta: { unauthOnly: true },
    component: () => import("src/auth/pages/IdentityPasswordRegisterPage.vue"),
  });

  router.addRoute({
    path: "/login",
    name: "auth.login",
    meta: { unauthOnly: true },
    component: () => import("src/auth/pages/IdentityPasswordLoginPage.vue"),
  });

  router.addRoute({
    path: "/forgot-password",
    name: "auth.requestPasswordReset",
    meta: { unauthOnly: true },
    component: () =>
      import("src/auth/pages/PasswordResetRequestViaEmailPage.vue"),
  });

  router.addRoute({
    path: "/password-reset",
    name: "auth.resetPassword",
    meta: { unauthOnly: true },
    component: () => import("src/auth/pages/PasswordResetViaEmailPage.vue"),
  });

  // Main layout route with children
  router.addRoute({
    path: "/",
    component: () => import("src/layouts/PlumLayout.vue"),
    children: [
      {
        path: "/artisans",
        name: "artisans",
        meta: { authOnly: true },
        component: () => import("src/pages/PageArtisans.vue"),
      },
      {
        path: "/profile",
        meta: { authOnly: true },
        component: () => import("src/pages/Profile/PageProfile.vue"),
        children: [
          {
            path: "/profile/settings",
            meta: { authOnly: true },
            component: () => import("src/pages/Profile/PageSettings.vue"),
            children: [
              {
                path: "/profile/settings/themes",
                meta: { authOnly: true },
                component: () => import("src/pages/Profile/PageThemes.vue"),
              },
              {
                path: "/profile/settings/supportplumartisans",
                meta: { authOnly: true },
                component: () =>
                  import("src/pages/Profile/PageSupportPlumArtisans.vue"),
                children: [
                  {
                    path: "/profile/settings/agentapp",
                    meta: { authOnly: true },
                    component: () =>
                      import("src/pages/Profile/PageAgentApplicationForm.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "payments", // Relative path without leading slash
            meta: { authOnly: true },
            component: () =>
              import("src/pages/Profile/Payments/PagePayments.vue"),
            name: "Payments",
            children: [
              {
                path: "mpesawallet", // Relative path without leading slash
                meta: { authOnly: true },
                component: () => import("pages/Profile/Payments/PageMpesa.vue"),
                name: "mpesawallet",
                children: [
                  {
                    path: "sendmpesa", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendMpesa.vue"),
                    name: "sendmpesa",
                  },
                  {
                    path: "lipanampesa", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageLipaNaMpesa.vue"),
                    name: "lipanampesa",
                  },
                ],
              },
              {
                path: "airtelwallet", // Relative path without leading slash
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PageAirtelMoney.vue"),
                name: "airtelwallet",
                children: [
                  {
                    path: "sendairtelmoney", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendAirtelMoney.vue"),
                    name: "sendairtelmoney",
                  },
                ],
              },
              {
                path: "telkomwallet", // Relative path without leading slash
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PageTelkomMoney.vue"),
                name: "telkomwallet",
                children: [
                  {
                    path: "sendtelkommoney", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendTelkomMoney.vue"),
                    name: "sendtelkommoney",
                  },
                ],
              },
              {
                path: "paypalwallet", // Relative path without leading slash
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PagePayPalMoney.vue"),
                name: "paypalwallet",
                children: [
                  {
                    path: "sendpaypalmoney", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendPayPalMoney.vue"),
                    name: "sendpaypalmoney",
                  },
                ],
              },
              {
                path: "pesalinkwallet", // Relative path without leading slash
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PagePesalinkMoney.vue"),
                name: "pesalinkwallet",
                children: [
                  {
                    path: "sendpesalinkmoney", // Relative path without leading slash
                    meta: { authOnly: true },
                    component: () =>
                      import(
                        "pages/Profile/Payments/PageSendPesalinkMoney.vue"
                      ),
                    name: "sendpesalinkmoney",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  // Catch-all route for 404
  router.addRoute({
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  });
});
