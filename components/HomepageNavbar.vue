<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
const colorMode = useColorMode();

const isDarkMode = ref(colorMode.preference !== "dark");

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const components: {
  title: string;
  iconSVG: string;
  href: string;
  description: string;
}[] = [
  {
    title: "SNBT",
    iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    href: "/snbt",
    description: "Siap bersaing? Tes SNBT adalah kunci untuk perguruan tinggi!",
  },
  {
    title: "TOEFL®",
    iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-swatch-book"><path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"/><path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"/><path d="M 7 17h.01"/><path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"/></svg>`,
    href: "/toefl",
    description: "Tingkatkan kemampuan bahasa Inggrismu dan raih skor tinggi!",
  },
  {
    title: "IELTS®",
    iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`,
    href: "/ielts",
    description:
      "Membuka pintu menuju pendidikan dan peluang karier internasional!",
  },
];
</script>

<template>
  <header
    class="relative z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <!-- Logo -->
      <div class="mr-6 hidden md:flex">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <img class="h-6 w-6" src="/logo.svg" />
          <span class="hidden font-bold sm:inline-block">AkademiPelajar</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <NavigationMenu class="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Persiapan Tes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                >
                  <li v-for="component in components" :key="component.title">
                    <NavigationMenuLink as-child>
                      <a
                        :href="component.href"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div
                          class="text-sm font-medium leading-none flex items-center gap-1"
                        >
                          <i v-html="component.iconSVG"></i>
                          <p v-html="component.title"></p>
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          {{ component.description }}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <!-- Mobile Logo -->
      <div
        class="flex flex-1 items-center justify-between space-x-2 md:justify-end"
      >
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <NuxtLink to="/" class="flex items-center space-x-2 md:hidden">
            <img class="h-6 w-6" src="/logo.svg" />
            <span class="font-bold">AkademiPelajar</span>
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <nav class="flex items-center space-x-2">
          <!-- Dark Mode Toggle -->
          <Button
            variant="ghost"
            size="sm"
            class="h-9 w-9 px-0"
            @click="toggleDarkMode"
          >
            <svg
              v-if="!isDarkMode"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span class="sr-only">Toggle theme</span>
          </Button>

          <!-- Auth Buttons -->
          <ClientOnly>
            <div class="hidden md:flex items-center space-x-2">
              <SignedOut>
                <SignInButton>
                  <Button size="sm" class="p-4 text-bold" variant="secondary">
                    Masuk
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm" class="p-4 text-bold mr-1"> Daftar </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <section class="flex items-center justify-center gap-2">
                  <NuxtLink to="/dashboard">
                    <Button variant="secondary">
                      Dashboard
                      <LucideCircleChevronRight class="ml-1" :size="15" />
                    </Button>
                  </NuxtLink>
                </section>
              </SignedIn>
            </div>
          </ClientOnly>
          <!-- Mobile Menu -->
          <Sheet>
            <SheetTrigger as-child>
              <Button
                variant="ghost"
                class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span class="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="pr-0">
              <NuxtLink to="/" class="flex items-center space-x-2">
                <img class="h-6 w-6" src="/logo.svg" />
                <span class="font-bold">AkademiPelajar</span>
              </NuxtLink>
              <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div class="flex flex-col space-y-3">
                  <div
                    v-for="item in components"
                    :key="item.title"
                    class="flex flex-col space-y-3"
                  >
                    <NuxtLink :to="item.href">
                      <h4 class="font-medium">{{ item.title }}</h4>
                    </NuxtLink>
                  </div>
                  <ClientOnly>
                    <div class="flex items-center space-x-2">
                      <SignedOut>
                        <SignInButton>
                          <Button
                            size="sm"
                            class="p-4 text-bold"
                            variant="secondary"
                          >
                            Masuk
                          </Button>
                        </SignInButton>
                        <SignUpButton>
                          <Button size="sm" class="p-4 text-bold mr-1">
                            Daftar
                          </Button>
                        </SignUpButton>
                      </SignedOut>
                      <SignedIn>
                        <section class="flex items-center justify-center gap-2">
                          <NuxtLink to="/dashboard">
                            <Button variant="secondary">
                              Dashboard
                              <LucideCircleChevronRight
                                class="ml-1"
                                :size="15"
                              />
                            </Button>
                          </NuxtLink>
                        </section>
                      </SignedIn>
                    </div>
                  </ClientOnly>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Additional custom styles if needed */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
