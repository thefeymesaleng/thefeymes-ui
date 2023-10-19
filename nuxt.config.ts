// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@vueuse/nuxt"],
  // app: {
  //   baseURL: process.env.NODE_ENV === "production" ? "/thefeymes-ui/" : "/",
  //   buildAssetsDir: "assets",
  // },
  // vite: {
  //   build: {
  //     lib: {
  //       //
  //     },
  //     rollupOptions: {
  //       //
  //     },
  //   },
  // },
});
