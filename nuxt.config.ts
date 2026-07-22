// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxtjs/turnstile",
    "@phojie/nuxt-build-info"
  ],
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  css: ["~/assets/css/main.css"],
  i18n: {
    locales: [
      { code: "en", language: "en-GB", file: "en-GB.json", name: "English" },
      {
        code: "pt",
        language: "pt-BR",
        file: "pt-BR.json",
        name: "Português (BR)",
      },
      { code: "es", language: "es-ES", file: "es.json", name: "Español" },
      { code: "it", language: "it-IT", file: "it.json", name: "Italiano" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  runtimeConfig: {
    discordWebhookUrl: process.env.NUXT_DISCORD_WEBHOOK_URL,
    turnstileSecretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
  },
});
