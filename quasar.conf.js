/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
const ESLintPlugin = require("eslint-webpack-plugin");
const { config } = require("dotenv");
const { configure } = require("quasar/wrappers");
const { join } = require("path");

// Load environment variables from .env file
config({ path: join(__dirname, ".env") });

module.exports = configure(function (ctx) {
  return {
    supportTS: false,

    boot: ["i18n", "axios", "plum-components", "router"],

    css: ["app.scss"],
    extras: ["eva-icons", "material-icons"],

    build: {
      vueRouterMode: "hash",
      env: {
        VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: JSON.stringify(
          process.env.VITE_SUPABASE_ANON_KEY,
        ),
      },

      chainWebpack(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
      },

      extendWebpack(cfg) {
        // Enable tree shaking
        cfg.optimization = {
          splitChunks: {
            chunks: "all",
          },
        };
      },
    },

    devServer: {
      server: {
        type: "http",
      },
      port: 8080,
    },

    framework: {
      config: {},

      plugins: [],
    },

    animations: ["slideInRight", "slideOutRight", "fadeIn", "fadeOut"],

    ssr: {
      pwa: false,

      prodPort: 3000,

      maxAge: 1000 * 60 * 60 * 24 * 1,

      chainWebpackWebserver(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js"] }]);
      },

      middlewares: [ctx.prod ? "compression" : "", "render"],
    },

    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      chainWebpackCustomSW(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js"] }]);
      },

      manifest: {
        name: `plumV3`,
        short_name: `plumV3`,
        description: `Building Plum with vue 3`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#000000",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      bundler: "packager",

      packager: {},

      builder: {
        appId: "plum",
      },

      chainWebpackMain(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js"] }]);
      },

      chainWebpackPreload(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js"] }]);
      },
    },
  };
});
