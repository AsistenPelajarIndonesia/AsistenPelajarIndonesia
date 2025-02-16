import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// @ts-nocheck
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      publicSupabaseKey: process.env.PUBLIC_SUPABASE_KEY,
      supabaseURL: process.env.SUPABASE_URL,
    },
    privateRuntimeConfig: {
      groqApiKey: process.env.GROQ_API_KEY,
      privateSupabaseKey: process.env.PRIVATE_SUPABASE_KEY,
    },
  },

  modules: [
    "@clerk/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-lucide-icons",
    "@nuxt/image",
    "@nuxtjs/prismic",
  ],

  colorMode: {
    classSuffix: "",
  },

  ssr: true,
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  vite: {
    server: {
      allowedHosts: true,
    }, 
  },
  prismic: {
    endpoint: apiEndpoint || repositoryName,
  },
  clerk: {
    signInForceRedirectUrl: "/dashboard",
    signUpForceRedirectUrl: "/dashboard"
  },
});