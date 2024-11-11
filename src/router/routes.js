// src/router/routes.js
const routes = [
  {
    path: "/",
    component: () => import("src/layouts/PlumLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/artisans",
      },
      {
        path: "artisans",
        component: () => import("src/pages/PageArtisans.vue"),
      },
      {
        path: "artisan-dashboard",
        component: () => import("src/pages/PageArtisanDashboard.vue"),
      },
      {
        path: "shop-owner-dashboard",
        component: () => import("src/pages/PageShopOwnerDashboard.vue"),
      },
      {
        path: "create-job",
        component: () => import("src/pages/PageCreateJob.vue"),
      },
      {
        path: "job/:id",
        component: () => import("src/pages/PageJobDetails.vue"),
      },
      {
        path: "create-group",
        component: () => import("src/pages/PageCreateGroup.vue"),
      },
      {
        path: "group/:id",
        component: () => import("src/pages/PageGroupDetails.vue"),
      },
      {
        path: "profile",
        component: () => import("src/pages/Profile/PageProfile.vue"),
        children: [
          {
            path: "settings",
            component: () => import("src/pages/Profile/PageSettings.vue"),
            children: [
              {
                path: "themes",
                component: () => import("src/pages/Profile/PageThemes.vue"),
              },
              {
                path: "supportplumartisans",
                component: () =>
                  import("src/pages/Profile/PageSupportPlumArtisans.vue"),
                children: [
                  {
                    path: "agentapp",
                    component: () =>
                      import("src/pages/Profile/PageAgentApplicationForm.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "payments",
            component: () =>
              import("src/pages/Profile/Payments/PagePayments.vue"),
            name: "Payments",
            children: [
              {
                path: "payment-history", // New route for payment history
                component: () =>
                  import("src/pages/Profile/Payments/PagePaymentHistory.vue"),
              },
              {
                path: "mpesawallet",
                component: () => import("pages/Profile/Payments/PageMpesa.vue"),
                name: "mpesawallet",
                children: [
                  {
                    path: "sendmpesa",
                    component: () =>
                      import("pages/Profile/Payments/PageSendMpesa.vue"),
                    name: "sendmpesa",
                  },
                  {
                    path: "lipanampesa",
                    component: () =>
                      import("pages/Profile/Payments/PageLipaNaMpesa.vue"),
                    name: "lipanampesa",
                  },
                ],
              },
              {
                path: "airtelwallet",
                component: () =>
                  import("pages/Profile/Payments/PageAirtelMoney.vue"),
                name: "airtelwallet",
                children: [
                  {
                    path: "sendairtelmoney",
                    component: () =>
                      import("pages/Profile/Payments/PageSendAirtelMoney.vue"),
                    name: "sendairtelmoney",
                  },
                ],
              },
              {
                path: "telkomwallet",
                component: () =>
                  import("pages/Profile/Payments/PageTelkomMoney.vue"),
                name: "telkomwallet",
                children: [
                  {
                    path: "sendtelkommoney",
                    component: () =>
                      import("pages/Profile/Payments/PageSendTelkomMoney.vue"),
                    name: "sendtelkommoney",
                  },
                ],
              },
              {
                path: "paypalwallet",
                component: () =>
                  import("pages/Profile/Payments/PagePayPalMoney.vue"),
                name: "paypalwallet",
                children: [
                  {
                    path: "sendpaypalmoney",
                    component: () =>
                      import("pages/Profile/Payments/PageSendPayPalMoney.vue"),
                    name: "sendpaypalmoney",
                  },
                ],
              },
              {
                path: "pesalinkwallet",
                component: () =>
                  import("pages/Profile/Payments/PagePesalinkMoney.vue"),
                name: "pesalinkwallet",
                children: [
                  {
                    path: "sendpesalinkmoney",
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
  },
  {
    path: "/:catchAll(.*)*", // Catch-all route for 404 errors
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
