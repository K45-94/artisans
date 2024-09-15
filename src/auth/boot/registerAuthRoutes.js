import { boot } from "quasar/wrappers";

export default boot(({ router }) => {
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
