<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const currentPage = ref(route.fullPath.split("/").at(2))

watch(route, _value => {
    currentPage.value = route.fullPath.split("/").at(2)
  }, 
  {
    deep: true, 
    immediate: true
  }
)
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NuxtLink
          to="/report-issue"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src="/logo.png" alt="icon" width="50" />
          <span class="sr-only">API Org</span>
        </NuxtLink>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
          >
            <LucideMenu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <NuxtLink
              to="#"
              class="flex items-center gap-2 text-lg font-semibold"
            >
                <img src="/logo.png" alt="icon" width="160" />
                <span class="sr-only">API Org</span>
            </NuxtLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DashboardCommand />
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    <LucideMoon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <LucideSun class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem @click="colorMode.preference = 'light'">
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'dark'">
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'system'">
                    System
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </DropdownMenu>
      </div>
    </header>
</template>
