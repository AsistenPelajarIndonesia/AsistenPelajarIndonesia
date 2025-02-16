<template>
  <footer
    class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
  >
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Akademi Pelajar</h3>
          <p class="text-sm text-muted-foreground">
            Platform bimbingan belajar online untuk persiapan SNBT, CPNS, OSN,
            TOEFL, dan IELTS.
          </p>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Tautan Cepat</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/pricing"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Harga
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terms"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Syarat dan Ketentuan
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/privacy"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Kebijakan Privasi
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Program</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/snbt"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                SNBT
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cpns"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                CPNS
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/osn"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                OSN
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/toefl"
                class="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                TOEFL
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Hubungi Kami</h3>
          <div class="flex space-x-4">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Button>
          </div>
          <p class="text-sm text-muted-foreground">
            Email: info@akademipelajar.com
          </p>
        </div>
      </div>

      <div class="mt-8 border-t pt-8">
        <p class="text-center text-sm text-muted-foreground">
          © {{ new Date().getFullYear() }} Akademi Pelajar. Hak Cipta
          Dilindungi.
        </p>
      </div>
    </div>
  </footer>
</template>
