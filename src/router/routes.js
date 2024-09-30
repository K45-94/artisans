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
        path: "/artisans",
        component: () => import("src/pages/PageArtisans.vue"),
      },
      {
        path: "profile", // Relative path without leading slash
        component: () => import("src/pages/Profile/PageProfile.vue"),
        children: [
          {
            path: "settings", // Relative path without leading slash
            component: () => import("src/pages/Profile/PageSettings.vue"),
            children: [
              {
                path: "themes", // Relative path without leading slash
                component: () => import("src/pages/Profile/PageThemes.vue"),
              },
              {
                path: "supportplumartisans", // Relative path without leading slash
                component: () =>
                  import("src/pages/Profile/PageSupportPlumArtisans.vue"),
                children: [
                  {
                    path: "agentapp", // Relative path without leading slash
                    component: () =>
                      import("src/pages/Profile/PageAgentApplicationForm.vue"),
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
