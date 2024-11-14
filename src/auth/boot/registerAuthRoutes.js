// src/auth/boot/registerAuthRoutes.js
import { boot } from "quasar/wrappers";

export default boot(({ router }) => {
  console.log("Registering auth routes");

  // Registering authentication routes
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
        path: "",
        redirect: "/artisans",
      },
      {
        path: "/artisans",
        name: "artisans",
        meta: { authOnly: true },
        component: () => import("src/pages/PageArtisans.vue"),
      },
      {
        path: "/artisan-dashboard",
        name: "artisan.dashboard",
        meta: { authOnly: true },
        component: () => import("src/pages/PageArtisanDashboard.vue"),
      },
      {
        path: "/shop-owner-dashboard",
        name: "shop.owner.dashboard",
        meta: { authOnly: true },
        component: () => import("src/pages/PageShopOwnerDashboard.vue"),
      },
      {
        path: "/create-job",
        name: "create.job",
        meta: { authOnly: true },
        component: () => import("src/pages/PageCreateJob.vue"),
      },
      {
        path: "/job/:id",
        name: "job.details",
        meta: { authOnly: true },
        component: () => import("src/pages/PageJobDetails.vue"),
      },
      {
        path: "/create-group",
        name: "create.group",
        meta: { authOnly: true },
        component: () => import("src/pages/PageCreateGroup.vue"),
      },
      {
        path: "/group/:id",
        name: "group.details",
        meta: { authOnly: true },
        component: () => import("src/pages/PageGroupDetails.vue"),
      },
      {
        path: "/profile",
        meta: { authOnly: true },
        component: () => import("src/pages/Profile/PageProfile.vue"),
        children: [
          {
            path: "settings",
            meta: { authOnly: true },
            component: () => import("src/pages/Profile/PageSettings.vue"),
            children: [
              {
                path: "themes",
                meta: { authOnly: true },
                component: () => import("src/pages/Profile/PageThemes.vue"),
              },
              {
                path: "supportplumartisans",
                meta: { authOnly: true },
                component: () =>
                  import("src/pages/Profile/PageSupportPlumArtisans.vue"),
                children: [
                  {
                    path: "create-shop",
                    meta: { authOnly: true },
                    component: () =>
                      import("src/pages/Profile/PageCreateShop.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "payments",
            meta: { authOnly: true },
            component: () =>
              import("src/pages/Profile/Payments/PagePayments.vue"),
            name: "Payments",
            children: [
              {
                path: "payment-history",
                meta: { authOnly: true },
                component: () =>
                  import("src/pages/Profile/Payments/PagePaymentHistory.vue"),
              },
              {
                path: "mpesawallet",
                meta: { authOnly: true },
                component: () => import("pages/Profile/Payments/PageMpesa.vue"),
                name: "mpesawallet",
                children: [
                  {
                    path: "sendmpesa",
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendMpesa.vue"),
                    name: "sendmpesa",
                  },
                  {
                    path: "lipanampesa",
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageLipaNaMpesa.vue"),
                    name: "lipanampesa",
                  },
                ],
              },
              {
                path: "airtelwallet",
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PageAirtelMoney.vue"),
                name: "airtelwallet",
                children: [
                  {
                    path: "sendairtelmoney",
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendAirtelMoney.vue"),
                    name: "sendairtelmoney",
                  },
                ],
              },
              {
                path: "telkomwallet",
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PageTelkomMoney.vue"),
                name: "telkomwallet",
                children: [
                  {
                    path: "sendtelkommoney",
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendTelkomMoney.vue"),
                    name: "sendtelkommoney",
                  },
                ],
              },
              {
                path: "paypalwallet",
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PagePayPalMoney.vue"),
                name: "paypalwallet",
                children: [
                  {
                    path: "sendpaypalmoney",
                    meta: { authOnly: true },
                    component: () =>
                      import("pages/Profile/Payments/PageSendPayPalMoney.vue"),
                    name: "sendpaypalmoney",
                  },
                ],
              },
              {
                path: "pesalinkwallet",
                meta: { authOnly: true },
                component: () =>
                  import("pages/Profile/Payments/PagePesalinkMoney.vue"),
                name: "pesalinkwallet",
                children: [
                  {
                    path: "sendpesalinkmoney",
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
