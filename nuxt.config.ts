import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@vueuse/nuxt"],
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/thefeymes-ui/" : "/",
    buildAssetsDir: "assets",
  },
  // vite: {
  //   build: {
  //     lib: {
  //       // Could also be a dictionary or array of multiple entry points
  //       entry: resolve(__dirname, "index.js"),
  //       name: "thefeymes-ui",
  //       // the proper extensions will be added
  //       fileName: (format) => `${format}.js`,
  //     },
  //     rollupOptions: {
  //       // make sure to externalize deps that shouldn't be bundled
  //       // into your library
  //       external: ["vue"],
  //       output: {
  //         // Provide global variables to use in the UMD build
  //         // for externalized deps
  //         globals: {
  //           vue: "Vue",
  //         },
  //       },
  //     },
  //   },
  //   // $client: {},
  // },
});
